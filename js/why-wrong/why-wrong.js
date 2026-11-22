/* =====================================================================
   Why a wrong answer is wrong.
   When a child picks a wrong answer, Pip says what they picked, why it
   doesn't fit, then the right answer and why it is right. Each rule below
   only speaks when it can check its claim against the question's own data;
   otherwise a plain, honest fallback is used.
   ===================================================================== */
const xStrip = h => String(h == null ? "" : h)
  .replace(/<svg[\s\S]*?<\/svg>/g, " ")
  .replace(/<span class="frac"><span>(.*?)<\/span><span>(.*?)<\/span><\/span>/g, " $1/$2 ")
  .replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ").replace(/\s+([.,!?;:])/g, "$1").trim();
const xPlain = h => xStrip(h).replace(/[\p{Extended_Pictographic}️‍]/gu, "").replace(/\s+/g, " ").trim();
const xLabel = h => { const t = xPlain(h); if (t) return t; const m = String(h).match(/(?:aria-label|title)="([^"]+)"/); return m ? m[1].replace(/^the /i, "") : ""; };
const xQ = s => `“${String(s).trim().replace(/[“”"]/g, "‘").replace(/‘([^‘]*)‘/g, "‘$1’").replace(/[.]$/, "").replace(/[.]’$/, "’")}”`;
const xNum = s => { const t = xPlain(s).replace(/[$¢,°]/g, "").replace(/\b(cm|mm|m|km|kg|g|in|ft|yd|cents?|dollars?|sq units|square units|units|years old|years|minutes|min|hours|days|weeks|cups|ml|l)\b\.?/gi, "").trim(); return /^-?\d+(\.\d+)?$/.test(t) ? parseFloat(t) : null; };
const xFrac = s => { const m = xPlain(s).match(/^(\d+)\s*\/\s*(\d+)$/); return m ? [+m[1], +m[2]] : null; };
const xTime = s => { const t = xPlain(s); let m = t.match(/^(\d{1,2}):(\d{2})(\s*[ap]\.?m\.?)?$/i); if (m) return [+m[1], +m[2]]; m = t.match(/^(\d{1,2}) o'clock$/i); return m ? [+m[1], 0] : null; };
const xFmt = n => String(Math.round(n * 100) / 100);
const xNums = s => (xPlain(s).match(/\d+(\.\d+)?/g) || []).map(Number);
const MANNER_PHRASE = { kind: ["is kind", "is unkind"], safe: ["is safe", "is not safe"], polite: ["is polite", "is rude"], good: ["is a good choice", "is not a good choice"], tell: ["is something to tell a grown-up about", "is a happy surprise that's okay to keep"], call: ["is an emergency, so you call 911", "is not an emergency for 911"], share: ["is okay to share", "should be kept private"], fact: ["is true", "is false"] };
const SHAPE_SIDES = { circle: 0, oval: 0, triangle: 3, square: 4, rectangle: 4, rhombus: 4, trapezoid: 4, pentagon: 5, hexagon: 6, octagon: 8 };


/* returns { pick: text to show/say, reason: sentence } — or null when there is nothing to explain (time ran out) */
function wrongReason(q, k, kres, t) {
  const qt = xPlain(q.say || q.q), ql = qt.toLowerCase();
  if (q.kind === "order" && KS && KS.picks) {
    const bad = KS.picks.findIndex((x, i) => x !== i); if (bad < 0) return null;
    return { pick: KS.picks.map(i => xLabel(q.items[i])).join(", "), reason: `Spot ${bad + 1} should be ${xQ(xLabel(q.items[bad]))}, not ${xQ(xLabel(q.items[KS.picks[bad]]))}.` };
  }
  if (q.kind === "sort" && KS && KS.sel) {
    const wrong = q.items.map((it, i) => [it, i]).filter(([, i]) => KS.sel[i] !== q.correct[i]);
    if (!wrong.length) return null;
    const parts = wrong.slice(0, 2).map(([it, i]) => `${xQ(xLabel(it))} goes in ${xPlain(q.bins[q.correct[i]])}, not ${xPlain(q.bins[KS.sel[i]])}`);
    return { pick: `${wrong.length} in the wrong group`, reason: parts.join(". ") + (wrong.length > 2 ? `, and ${wrong.length - 2} more.` : ".") };
  }
  if (q.kind === "multi" && KS && KS.sel) {
    const extra = q.opts.filter((_, i) => KS.sel[i] && !q.correct.includes(i)).map(xLabel), missed = q.opts.filter((_, i) => !KS.sel[i] && q.correct.includes(i)).map(xLabel);
    const bits = []; if (extra.length) bits.push(`${extra.map(xQ).join(" and ")} ${extra.length > 1 ? "don't" : "doesn't"} belong`); if (missed.length) bits.push(`you missed ${missed.map(xQ).join(" and ")}`);
    return { pick: q.opts.filter((_, i) => KS.sel[i]).map(xLabel).join(", ") || "nothing", reason: cap(bits.join(", and ")) + "." };
  }
  const raw = q.kind === "type" ? (KS && KS.val) : (k != null ? q.opts[k] : null);
  if (raw == null || raw === "") return null;
  const p = xLabel(raw), a = xLabel(q.ans);
  const R1 = r => ({ pick: p, reason: r });

  /* 1. hand-written reason for this exact choice */
  if (q.whyNot && q.whyNot[raw]) return R1(q.whyNot[raw]);
  /* 2. topic-specific rule (why_*.js) */
  const src = q._src || (t && !t.special ? t : null), rule = src && WHY_RULES[`${src.age}-${src.subj}-${src.id}`];
  if (rule && q.kind !== "type") { try { const r = rule(q, raw); if (r) return R1(r); } catch (e) { } }

  /* 2. Manners & Behavior statements: each statement carries its own label */
  if (t && t._J && t._lk && MANNER_PHRASE[t._lk]) {
    const ph = MANNER_PHRASE[t._lk], st = t._J.find(j => j[0] === raw);
    if (st) return R1(`${xQ(st[0])} ${ph[st[1]]}.${st[2] && st[2] !== q.why ? " " + st[2] : ""}`);
    const li = t._labels.indexOf(raw), ai = t._labels.indexOf(q.ans);
    if (li >= 0 && ai >= 0) { const v = xPlain(q.vis), j = t._J.find(x => xPlain(x[0]) === v); return R1(`${v ? xQ(v) : "This one"} ${ph[ai]}.${j && j[2] && j[2] !== q.why ? " " + j[2] : ""}`); }
  }

  if (/does not belong|doesn't belong|odd one out|not like the others/.test(ql)) return R1(`${/^\d/.test(p) ? p : /\p{Extended_Pictographic}|<svg/u.test(raw) ? "The " + p.toLowerCase() : xQ(p)} goes with the others.`);
  /* 3. numbers */
  const pn = xNum(raw), an = xNum(q.ans);
  if (pn != null && an != null && pn !== an) {
    const nums = xNums(q.say || q.q).filter(x => x !== an);
    if (/\bmultiple of (\d+)/.test(ql)) { const m = +ql.match(/\bmultiple of (\d+)/)[1]; if (pn % m) return R1(`${p} is not in the ${m} times table: it can't be shared into groups of ${m} with none left.`); }
    if (/\bfactor of (\d+)/.test(ql)) { const m = +ql.match(/\bfactor of (\d+)/)[1]; if (m % pn) return R1(`${p} doesn't go into ${m} evenly: ${m} ÷ ${p} leaves a remainder.`); }
    if (/\b(an?|the) even\b|which .*\beven\b/.test(ql) && pn % 2) return R1(`${p} is odd: it ends in ${String(pn).slice(-1)}.`);
    if (/\b(an?|the) odd\b|which .*\bodd\b/.test(ql) && pn % 2 === 0) return R1(`${p} is even: it ends in ${String(pn).slice(-1)}.`);
    if (/\b(biggest|greatest|largest|most|highest|tallest|longest|heaviest)\b/.test(ql) && /\bwhich\b/.test(ql)) return R1(`${p} is ${pn < an ? "smaller" : "bigger"} than ${a}.`);
    if (/\b(smallest|least|fewest|lowest|shortest|lightest)\b/.test(ql) && /\bwhich\b/.test(ql)) return R1(`${p} is ${pn > an ? "bigger" : "smaller"} than ${a}.`);
    let m2;
    if ((m2 = qt.match(/\b(\d{2,4})\b/)) && /\b(ones|tens|hundreds) (digit|place)\b|\bhow many (ones|tens|hundreds)\b/i.test(qt) && /^\d$/.test(String(pn))) {
      const N = m2[1], names = ["ones", "tens", "hundreds", "thousands"], at = N.lastIndexOf(String(pn));
      if (at >= 0) return R1(`${p} is the ${names[N.length - 1 - at]} digit in ${N}.`);
    }
    if ((m2 = qt.match(/value of the (\d) in ([\d,]+)/i))) {
      const digs = m2[2].replace(/,/g, ""), pos = digs.lastIndexOf(m2[1]), place = digs.length - 1 - pos, names = ["ones", "tens", "hundreds", "thousands", "ten thousands", "hundred thousands"];
      if (pos >= 0 && names[place]) return R1(`The ${m2[1]} is in the ${names[place]} place, so it's worth ${(+m2[1] * Math.pow(10, place)).toLocaleString("en-US")}, not ${p}.`);
    }
    if ((m2 = qt.match(/round ([\d,]+) to the nearest (ten|hundred|thousand)/i))) {
      const n = +m2[1].replace(/,/g, ""), unit = { ten: 10, hundred: 100, thousand: 1000 }[m2[2].toLowerCase()];
      if (pn % unit) return R1(`${p} isn't a whole ${m2[2].toLowerCase()}. Rounded numbers end in ${unit === 10 ? "0" : unit === 100 ? "00" : "000"}.`);
      if (Math.abs(n - an) < Math.abs(n - pn)) return R1(`${n} is closer to ${a} than to ${p}.`);
    }
    if (/\bestimat|\babout how/.test(ql) && nums.length >= 2 && (pn === nums[0] + nums[1] || pn === Math.abs(nums[0] - nums[1]))) return R1(`${p} is the exact answer. To estimate, round each number first, then add or subtract.`);
    if (/[$¢]|\bcents?\b/.test(xPlain(q.ans))) { const c = Math.round(Math.abs(pn - an) * (/\$/.test(xPlain(q.ans)) ? 100 : 1)); return R1(`${p} is ${c >= 100 ? "$" + (c / 100).toFixed(2) : c + " cent" + (c === 1 ? "" : "s")} ${pn > an ? "more" : "less"} than the right amount.`); }
    if (!Number.isInteger(an) && Math.abs(an) < 1 && Math.abs(pn) >= 1) return R1(`${p} is 1 whole or more, but the answer is less than 1 whole.`);
    if (nums.length >= 2) {
      const [x, y] = nums, loop = /\brepeat\b/i.test(qt), mult = !loop && /×|times|\beach\b|\brows? of\b|\bgroups? of\b|\bbags?\b.*\beach\b/.test(qt), div = /÷|divided|\bshare|\bequal(ly)? (groups|parts|teams)|\bsplit/.test(qt), add = /\+|\bplus\b|altogether|in all|total|\bmore\b/.test(ql), sub = /−|-|\bminus\b|\bleft\b|take away|fewer|\bgave away\b|\bate\b/.test(ql);
      if ((mult || div) && pn === x + y && an !== x + y) return R1(`${p} is what you get if you add ${x} and ${y}. This one needs ${div ? "dividing" : "multiplying"}.`);
      if (div && pn === x * y) return R1(`${p} is what you get if you multiply. This one needs dividing.`);
      if (mult && pn === Math.abs(x - y)) return R1(`${p} is what you get if you subtract. This one needs multiplying.`);
      if (sub && !add && pn === x + y) return R1(`${p} is what you get if you add ${x} and ${y}. This one needs taking away.`);
      if (add && !sub && !mult && pn === Math.abs(x - y)) return R1(`${p} is what you get if you take away. This one needs adding.`);
    }
    const d = pn - an, ad = Math.abs(d), more = d > 0 ? "more" : "less";
    if (Math.abs(an) >= 1000) return R1(`${p} is ${d > 0 ? "bigger" : "smaller"} than the right answer.`);
    if (ad === 1 && /\bhow many\b|\bcount/.test(ql)) return R1(`${p} is just 1 ${more} than the right answer. Count again carefully.`);
    return R1(`${p} is ${xFmt(ad)} ${more} than the right answer.`);
  }

  /* 4. fractions */
  const pf = xFrac(raw), af = xFrac(q.ans);
  if (pf && af) {
    if (pf[0] === af[1] && pf[1] === af[0]) return R1(`The top and bottom are switched. The bottom number is how many equal parts in all; the top is how many we count.`);
    if (pf[1] === 0) return R1(`A fraction can't have 0 on the bottom.`);
    if (/\b(greater|bigger|larger|more|less|smaller)\b/.test(ql) && pf[0] / pf[1] !== af[0] / af[1]) return R1(`${p} is ${pf[0] / pf[1] < af[0] / af[1] ? "smaller" : "bigger"} than ${a}.`);
    return R1(`${p} means ${pf[0]} out of ${pf[1]} equal parts${pf[1] !== af[1] && af[1] && !/equivalent|same as|equal to|simplest/.test(ql) ? `, but here the whole has ${af[1]} equal parts` : ""}.`);
  }

  /* 5. clock times */
  const pt = xTime(raw), at = xTime(q.ans);
  if (pt && at) {
    let diff = ((at[0] % 12) * 60 + at[1]) - ((pt[0] % 12) * 60 + pt[1]); if (diff > 360) diff -= 720; if (diff <= -360) diff += 720;
    const dm = Math.abs(diff), dtxt = dm >= 60 ? `${Math.floor(dm / 60)} hour${dm >= 120 ? "s" : ""}${dm % 60 ? ` and ${dm % 60} minutes` : ""}` : `${dm} minutes`;
    if (t && /oclock|halfhour|time5/.test(t.id)) return R1(`At ${p}, the short hand points ${pt[1] > 0 ? `between the ${pt[0]} and the ${pt[0] % 12 + 1}` : `to the ${pt[0]}`} and the long hand points to the ${pt[1] ? pt[1] / 5 : 12}.`);
    return R1(`${p} is ${dtxt} ${diff > 0 ? "too early" : "too late"}.`);
  }

  /* 6. word questions */
  if (p && !/<svg/.test(raw)) {
    const blank = (xStrip(q.q).match(/[^.!?]*_{2,}[^.!?]*[.!?]?/) || [])[0], tid = src && src.id;
    if (blank && tid === "homophones") return R1(`${xQ(p)} sounds the same, but it means something different, so it doesn't fit here.`);
    if (blank && tid === "linking") return R1(`${xQ(p)} doesn't join these two ideas the right way.`);
    if (blank && blank.length < 140 && !/\b(prefix|suffix|letter team|vowel team|blend|bossy|digraph)\b/i.test(qt)) { let f = blank.trim().replace(/_{2,}/, p); if (!/[.!?]$/.test(f)) f += "."; return R1(`Read it with ${xQ(p)}: “${f.replace(/[“”"]/g, "‘")}” That doesn't make sense.`); }
    const lw = p.toLowerCase();
    if (/\bnoun\b|\bverb\b|\badjective\b/.test(ql) && typeof NOUNS !== "undefined") {
      const isN = NOUNS.includes(lw), isV = VERBS.includes(lw), isA = typeof ADJS !== "undefined" && ADJS.includes(lw);
      if (isV && !/\bverb\b.*\?$/.test(ql) && /\bnoun\b/.test(ql)) return R1(`${xQ(p)} is a verb, an action word, not a noun.`);
      if (isN && /\bverb\b/.test(ql)) return R1(`${xQ(p)} is a noun, a naming word, not a verb.`);
      if (isA && /\b(noun|verb)\b/.test(ql)) return R1(`${xQ(p)} is an adjective, a describing word.`);
    }
    if (typeof FACTS !== "undefined" && /\bfact\b|\bopinion\b/.test(ql)) {
      if (FACTS.includes(raw)) return R1(`${xQ(p)} is a fact: you can check that it's true.`);
      if (OPINIONS.includes(raw)) return R1(`${xQ(p)} is an opinion: other people might disagree.`);
    }
    let m;
    if ((m = ql.match(/rhymes? with (\w+)/))) { const w = lw.split(" ").pop(), rime = x => (x.slice(1).match(/[aeiouy].*$/) || [x])[0]; return R1(rime(w) !== rime(m[1]) ? `${xQ(w)} ends with -${rime(w)}, but ${xQ(m[1])} ends with -${rime(m[1])}, so they don't rhyme.` : `${xQ(w)} doesn't rhyme with ${xQ(m[1])}.`); }
    if ((m = ql.match(/(?:means?|is) (?:almost |about )?the same as (\w+)/)) || (m = ql.match(/synonym (?:for|of) (\w+)/))) return R1(`${xQ(p)} doesn't mean the same as ${xQ(m[1])}.`);
    if ((m = ql.match(/opposite of (\w+)/))) return R1(`${xQ(p)} isn't the opposite of ${xQ(m[1])}.`);
    if (/\babc order|alphabetical/.test(ql) && /\bfirst\b/.test(ql) && lw > a.toLowerCase()) return R1(`${xQ(p)} comes after ${xQ(a)} in ABC order.`);
    if (/\babc order|alphabetical/.test(ql) && /\blast\b/.test(ql) && lw < a.toLowerCase()) return R1(`${xQ(p)} comes before ${xQ(a)} in ABC order.`);
    if (/\bspell|\bspelled\b/.test(ql)) return R1(`${xQ(p)} isn't the right spelling.`);
    const sh = SHAPE_SIDES[lw], ash = SHAPE_SIDES[a.toLowerCase()];
    if (sh != null && ash != null && sh !== ash) return R1(sh ? `A ${lw} has ${sh} sides, but this shape has ${ash ? ash + " sides" : "no sides: it's round"}.` : `A ${lw} is round with no sides, but this shape has ${ash} sides.`);
    if ((m = ql.match(/what does (?:the word )?(\w+(?:-\w+)?) mean/))) return R1(`That's not what ${xQ(m[1])} means.`);
  }
  if (/\b(next|missing|pattern|comes? after|comes? before)\b/.test(ql)) return R1(`${p ? xQ(p) : "That one"} doesn't follow the pattern.`);
  const passage = /class="passage(?! scene)|class="quote/.test(q.vis || "") || (t && (/reading|storyparts|causeeffect|context/.test(t.id) || t.special === "story"));
  if (passage) return R1(`Look back at the story: it doesn't point to ${p ? xQ(p) : "that one"}.`);
  return R1(p ? `${xQ(p)} doesn't fit this question.` : `That one doesn't match.`);
}

