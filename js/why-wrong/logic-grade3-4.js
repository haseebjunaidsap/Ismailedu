/* =====================================================================
   Why a wrong answer is wrong: age 8 and 9 logic topics.
   8: analogies, ordering, venn, codes, matrix, machines, lineup, symmetry, compass, whichop
   9: deduce, statements, letterseq, cipher, chance
   ===================================================================== */

/* ---------- helpers ---------- */
const LG89W_TITLE = h => { const m = String(h).match(/title="([^"]+)"/); return m ? m[1] : null; };
const LG89W_EMO = h => { const m = String(h).match(/<span class="emo[^"]*"[^>]*>([\s\S]*?)<\/span>/); return m ? m[1].trim() : xStrip(h).trim(); };
const LG89W_ORD = ["first", "second", "third", "fourth", "fifth", "sixth"];
const LG89W_LI = c => ALPHA.indexOf(c);
const LG89W_SQ = n => `${n} ${n === 1 ? "square" : "squares"}`;
const LG89W_BOLD = h => [...String(h).matchAll(/<b>([\s\S]*?)<\/b>/g)].map(m => xPlain(m[1]));
const LG89W_PASS = h => { const m = String(h || "").match(/<div class="passage">([\s\S]*?)<\/div>/); return m ? m[1].split("<br>").map(x => xPlain(x)) : []; };

/* ---------- Word Analogies ---------- */
const LG89W_GROUP = { fish: "fish", wolf: "wolves", sheep: "sheep", bird: "birds", cow: "cows", bee: "bees" };
const LG89W_AN = (link, a, b, c, d, x) => {
  const X = xQ(x), n = Number(x), cn = Number(c);
  if (/^\d+$/.test(x) && link === "number of sides") return `A ${c} doesn't have ${x} sides.`;
  if (/^\d+$/.test(x) && link === "number of legs") return `${/^[aeiou]/.test(c) ? "An" : "A"} ${c} doesn't have ${x} legs.`;
  if (/^\d+$/.test(x) && /^\d+$/.test(c)) {
    if (link === "double it") return n === cn + Number(a) ? `${x} is ${c} + ${a}, but the link is doubling: ${c} + ${c}.` : n === 3 * cn ? `${x} is three times ${c}, not double ${c}.` : `${x} is not double ${c}.`;
    if (link === "half of it") return n === 2 * cn ? `${x} is double ${c}, but the link is half.` : n > cn ? `${x} is bigger than ${c}, so it can't be half of ${c}.` : `${x} is not half of ${c}.`;
    if (link === "add 10") return `${c} + 10 is not ${x}.`;
    return null;
  }
  switch (link) {
    case "opposites": return `${X} is not the opposite of ${xQ(c)}.`;
    case "baby and grown-up": return `A ${c} doesn't grow up into ${X}.`;
    case "grown-up and baby": return `${X} is not the name for a baby ${c}.`;
    case "who makes what": return `${X} isn't the thing a ${c} makes.`;
    case "sound it makes": return `${X} isn't the sound a ${c} makes.`;
    case "how it moves": return `${X} isn't the way a ${c} moves.`;
    case "now and past": return x === "swimmed" || x === "eated" ? `${X} isn't a real word. The past of ${xQ(c)} is a special word.` : `${X} isn't the past of ${xQ(c)}.`;
    case "one and many": return x === "mouses" || x === "tooths" ? `${X} isn't a real word. More than one ${c} has a special word.` : `${X} doesn't mean more than one ${c}.`;
    case "stronger word": return `${X} isn't a stronger word for ${xQ(c)}.`;
    case "group name": return LG89W_GROUP[c] ? `A group of ${LG89W_GROUP[c]} isn't called ${X}.` : null;
  }
  if (x === "draw a line" || (c === "pilot" && x === "sky") || (c === "carrot" && x === "root") || (c === "sheep" && x === "lamb")) return null;
  return `${X} doesn't link to ${xQ(c)} the same way. The link is ${xQ(link)}.`;
};
whyRule(8, "logic", "analogies", (q, picked) => {
  const sp = [...String(q.q).matchAll(/<span>([^<]*)<\/span>/g)].map(m => m[1]);
  if (sp.length < 3) return null;
  const [a, b, c] = sp, x = xPlain(picked), e = WANAL.find(w => w[0] === a && w[1] === b && w[2] === c && w[3] === q.ans);
  if (!e || x === e[3] || !e[4].map(String).includes(x)) return null;
  return LG89W_AN(e[5], a, b, c, e[3], x);
});

/* ---------- Who's the Tallest? ---------- */
whyRule(8, "logic", "ordering", (q, picked) => {
  const clues = LG89W_PASS(q.vis), ask = (LG89W_BOLD(q.q)[0] || "").toLowerCase(), p = xPlain(picked);
  const cmp = COMPS.find(c => c[1] === ask || c[2] === ask); if (!cmp) return null;
  const pairs = clues.map(s => s.match(/^(\w+) is (\w+) than (\w+)\.$/)).filter(Boolean).filter(m => m[2] === cmp[0]).map(m => [m[1], m[3]]);
  if (!pairs.length) return null;
  if (ask === cmp[1]) { const c = pairs.find(([, y]) => y === p); return c ? `${c[0]} is ${cmp[0]} than ${p}, so ${p} can't be the ${ask}.` : null; }
  const c = pairs.find(([x]) => x === p); return c ? `${p} is ${cmp[0]} than ${c[1]}, so ${p} can't be the ${ask}.` : null;
});

/* ---------- Venn Diagrams ---------- */
whyRule(8, "logic", "venn", (q, picked) => {
  const item = LG89W_EMO(q.q), set = VENNS.find(v => q.opts.includes(VNAMES.a(v[0], v[1])) && q.opts.includes(VNAMES.b(v[0], v[1])) && Object.values(v[2]).some(z => z.includes(item)));
  if (!set) return null;
  const [A, B, sets] = set, zone = Object.keys(sets).find(z => sets[z].includes(item)), pz = ["a", "b", "both", "out"].find(z => VNAMES[z](A, B) === picked);
  if (!zone || !pz || zone !== ["a", "b", "both", "out"].find(z => VNAMES[z](A, B) === q.ans) || pz === zone) return null;
  const inA = zone === "a" || zone === "both", inB = zone === "b" || zone === "both", QA = xQ(A), QB = xQ(B);
  if (pz === "a") return !inA ? `It doesn't fit ${QA}, so it can't go in that circle.` : `It fits ${QB} too, so it can't be only in ${QA}.`;
  if (pz === "b") return !inB ? `It doesn't fit ${QB}, so it can't go in that circle.` : `It fits ${QA} too, so it can't be only in ${QB}.`;
  if (pz === "both") return !inA && !inB ? `It doesn't fit ${QA} or ${QB}, so it can't go in the middle.` : `It doesn't fit ${inA ? QB : QA}, so it can't go in the middle.`;
  return `It fits ${inA && inB ? `${QA} and ${QB}` : inA ? QA : QB}, so it goes inside a circle, not outside.`;
});

/* ---------- Secret Number Codes ---------- */
whyRule(8, "logic", "codes", (q, picked) => {
  const p = xPlain(picked);
  if (/^Crack/.test(xPlain(q.q))) {
    const code = xPlain(q.vis).match(/^(\d+(?:-\d+)+)/); if (!code || !/^[A-Z]+$/.test(p)) return null;
    const nums = code[1].split("-").map(Number); if (nums.length !== p.length) return null;
    const i = p.split("").findIndex((c, j) => LG89W_LI(c) + 1 !== nums[j]); if (i < 0) return null;
    return `${p} is ${numCode(p)}. Its ${LG89W_ORD[i]} letter, ${p[i]}, is ${LG89W_LI(p[i]) + 1}, not ${nums[i]}.`;
  }
  const w = LG89W_BOLD(q.q)[0]; if (!w || !/^\d+(-\d+)+$/.test(p)) return null;
  const nums = p.split("-").map(Number); if (nums.some(n => n < 1 || n > 26)) return null;
  const word = nums.map(n => ALPHA[n - 1]).join("");
  if (word === w) return null;
  if (word === w.split("").reverse().join("")) return `${p} spells ${word}. That's ${w} backwards.`;
  return `${p} spells ${word}, not ${w}.`;
});

/* ---------- Grid Puzzles ---------- */
const LG89W_CELL = h => { const l = String(h).match(/aria-label="(?:small |big )?(\w+) (\w+)"/), w = String(h).match(/width="(\d+)"/); return l && w ? { col: l[1], shape: l[2], size: +w[1] <= 40 ? "small" : +w[1] >= 72 ? "big" : "mid" } : null; };
whyRule(8, "logic", "matrix", (q, picked) => {
  const cells = String(q.vis).split('<div class="lcell').slice(1).map(LG89W_CELL);
  if (cells.length !== 4 || cells.slice(0, 3).some(c => !c)) return null;
  const [A, B, Cc] = cells, P = LG89W_CELL(picked), D = LG89W_CELL(q.ans); if (!P || !D) return null;
  const pl = s => s + "s";
  if (P.shape !== D.shape) return P.shape === A.shape ? `The ${pl(P.shape)} are in the top row. The bottom row has ${pl(Cc.shape)}.` : `There are no ${pl(P.shape)} in this grid. The bottom row has ${pl(Cc.shape)}.`;
  if (P.col !== D.col) return A.col !== B.col ? `Going across, the color changes from ${A.col} to ${B.col}, so it can't stay ${P.col}.` : `Each row keeps one color, and the bottom row is ${Cc.col}, not ${P.col}.`;
  if (P.size !== D.size && A.size !== B.size && P.size !== "mid" && B.size !== "mid") return `This is the ${P.size} ${P.col} ${P.shape}. Going across, ${A.size} turns ${B.size}, so the missing piece must be the ${B.size} one.`;
  return null;
});

/* ---------- Function Machines ---------- */
const LG89W_ROWS = h => [...String(h).matchAll(/<tr><td>(\d+)<\/td><td>(\d+|\?)<\/td><\/tr>/g)].map(m => [+m[1], m[2] === "?" ? null : +m[2]]);
const LG89W_APPLY = (r, x) => { const k = +r.slice(1); return r[0] === "+" ? x + k : r[0] === "−" ? x - k : r[0] === "×" ? x * k : null; };
whyRule(8, "logic", "machines", (q, picked) => {
  const rows = LG89W_ROWS(q.vis), p = xPlain(picked);
  if (!rows.length) return null;
  const known = rows.filter(r => r[1] != null);
  if (/rule/i.test(xPlain(q.q))) {
    if (!/^[+−×]\d+$/.test(p)) return null;
    const bad = known.find(([x, y]) => LG89W_APPLY(p, x) !== y); if (!bad) return null;
    const v = LG89W_APPLY(p, bad[0]);
    return v >= 0 ? `${p} doesn't work: ${bad[0]} ${p[0]} ${p.slice(1)} = ${v}, but ${bad[1]} came out.` : `${p} doesn't work: ${bad[0]} went in and ${bad[1]} came out.`;
  }
  const last = rows.find(r => r[1] == null), pn = Number(p); if (!last || !/^\d+$/.test(p) || !known.length) return null;
  const x = last[0], d = pn - x, cand = [];
  if (d > 0) cand.push([`+${d}`, `adding ${d}`]);
  if (d < 0) cand.push([`−${-d}`, `taking away ${-d}`]);
  if (x > 0 && pn % x === 0 && pn / x > 1) cand.push([`×${pn / x}`, `multiplying by ${pn / x}`]);
  for (const [r, desc] of cand) { const bad = known.find(([a, b]) => LG89W_APPLY(r, a) !== b); if (bad) return `${p} means ${desc}, but that doesn't turn ${bad[0]} into ${bad[1]}.`; }
  return null;
});

/* ---------- Line-Up Puzzles ---------- */
const LG89W_SPOT = { "left end": 0, middle: 1, "right end": 2 };
const LG89W_PERMS = [[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]];
const LG89W_CLUE = s => {
  let m;
  if ((m = s.match(/^The (\w+) is on the left end\.$/))) return L => L.indexOf(m[1]) === 0;
  if ((m = s.match(/^The (\w+) is on the right end\.$/))) return L => L.indexOf(m[1]) === 2;
  if ((m = s.match(/^The (\w+) is not in the middle\.$/))) return L => L.indexOf(m[1]) !== 1;
  if ((m = s.match(/^The (\w+) is somewhere to the left of the (\w+)\.$/))) return L => L.indexOf(m[1]) < L.indexOf(m[2]);
  if ((m = s.match(/^The (\w+) is next to the (\w+)\.$/))) return L => Math.abs(L.indexOf(m[1]) - L.indexOf(m[2])) === 1;
  return null;
};
whyRule(8, "logic", "lineup", (q, picked) => {
  const name = LG89W_BOLD(q.q)[0], spot = LG89W_SPOT[name], x = LG89W_TITLE(picked);
  const clues = LG89W_PASS(q.vis).map(s => s.replace(/^\d+\.\s*/, "")), animals = q.opts.map(LG89W_TITLE);
  if (spot == null || !x || animals.some(a => !a) || !clues.length) return null;
  const tests = clues.map(LG89W_CLUE); if (tests.some(t => !t)) return null;
  const lines = LG89W_PERMS.map(p => p.map(i => animals[i])), withX = lines.filter(L => L[spot] === x);
  if (withX.some(L => tests.every(t => t(L)))) return null;
  const where = spot === 1 ? "in the middle" : `on the ${name}`;
  const i = tests.findIndex(t => withX.every(L => !t(L)));
  if (i >= 0) return `Clue ${i + 1} says ${clues[i][0].toLowerCase() + clues[i].slice(1, -1)}, so the ${x} can't be ${where}.`;
  return `If the ${x} were ${where}, the clues couldn't all be true at once.`;
});

/* ---------- Mirror Symmetry ---------- */
const LG89W_DOT = { "🔴": "red", "🟠": "orange", "🟡": "yellow", "🟢": "green", "🔵": "blue", "🟣": "purple" };
whyRule(8, "logic", "symmetry", (q, picked) => {
  const p = xStrip(picked), qt = xPlain(q.q);
  if (/┃/.test(String(q.vis || "")) && /mirror/i.test(qt)) {
    const m = xStrip(q.vis).match(/^(.*?)┃/); if (!m) return null;
    const left = m[1].trim().split(/\s+/), want = left.slice().reverse(), got = p.split(/\s+/);
    if (got.length !== want.length || got.some(g => !LG89W_DOT[g])) return null;
    if (got.join() === left.join()) return "That's the same order as the left side, but a mirror flips the order.";
    const i = want.findIndex((w, j) => got[j] !== w); if (i < 0) return null;
    return `The ${LG89W_ORD[i]} dot from the line must match the ${LG89W_ORD[i]} dot on the left, which is ${LG89W_DOT[want[i]]}, not ${LG89W_DOT[got[i]]}.`;
  }
  if (/mirror/i.test(qt) && /\bword\b/i.test(qt) && /same/i.test(qt)) {
    if (!/^[A-Z]+$/.test(p)) return null;
    const bad = p.split("").find(c => NOSYM.includes(c));
    return bad ? `The left and right sides of ${bad} don't match, so ${p} looks different in a mirror.` : null;
  }
  if (/lines of symmetry/.test(qt)) {
    const nm = (LG89W_BOLD(q.q)[0] || "").replace(/\s*❤️?$/, "").trim(), n = Number(xPlain(q.ans)), pn = Number(p);
    if (!nm || isNaN(n) || isNaN(pn) || n === pn) return null;
    if (pn === 0) return `${cap(nm)} can be folded so both halves match, so it has more than 0.`;
    if (pn > n) return `There aren't ${pn} different ways to fold ${nm} so both halves match.`;
    return `${cap(nm)} has more than ${pn}. There are more ways to fold it so the halves match.`;
  }
  if (/^[A-Z]$/.test(p)) {
    if (/\bnot\b|don't match/.test(qt)) return SYM.includes(p) ? `${p}'s left and right sides match: draw a line straight down its middle and both halves are the same.` : null;
    return NOSYM.includes(p) ? `Draw a line straight down the middle of ${p}: the left and right sides don't match.` : null;
  }
  return null;
});

/* ---------- Map Directions ---------- */
const LG89W_PLACE = { "🌳": "tree", "🏫": "school", "🏪": "shop", "⛲": "fountain", "🏥": "hospital", "🎡": "Ferris wheel", "🐄": "cow", "🏰": "castle", "🏠": "house" };
const LG89W_MOVE = (start, steps) => steps.reduce((p, [d, k]) => [p[0] + COMPASS[d][0] * k, p[1] + COMPASS[d][1] * k], start);
whyRule(8, "logic", "compass", (q, picked) => {
  const cells = [...String(q.vis).matchAll(/<span class="bcell">(?:<span class="emo">([\s\S]*?)<\/span>)?<\/span>/g)].map(m => m[1] || "");
  const n = Math.round(Math.sqrt(cells.length)); if (n * n !== cells.length || n < 2) return null;
  const pos = e => { const i = cells.indexOf(e); return i < 0 ? null : [Math.floor(i / n), i % n]; };
  const home = pos("🏠"), e = LG89W_EMO(picked), X = pos(e), name = LG89W_PLACE[e];
  const steps = [...(LG89W_BOLD(q.q)[0] || "").matchAll(/(\d+) squares? (north|south|east|west)/g)].map(m => [m[2], +m[1]]);
  if (!home || !X || !name || !steps.length) return null;
  const end = LG89W_MOVE(home, steps), same = (a, b) => a[0] === b[0] && a[1] === b[1];
  if (same(end, X)) return null;
  const flip = { north: "south", south: "north", east: "west", west: "east" };
  const hasEW = steps.some(s => /east|west/.test(s[0])), hasNS = steps.some(s => /north|south/.test(s[0]));
  if (hasEW && same(LG89W_MOVE(home, steps.map(([d, k]) => [/east|west/.test(d) ? flip[d] : d, k])), X)) return `The ${name} is where you'd be if you mixed up east and west. East is right, west is left.`;
  if (hasNS && same(LG89W_MOVE(home, steps.map(([d, k]) => [/north|south/.test(d) ? flip[d] : d, k])), X)) return `The ${name} is where you'd be if you mixed up north and south. North is up, south is down.`;
  if (steps.length > 1 && same(LG89W_MOVE(home, steps.slice(0, 1)), X)) return `The ${name} is where the first move ends. You still need to go ${LG89W_SQ(steps[1][1])} ${steps[1][0]}.`;
  const dr = X[0] - home[0], dc = X[1] - home[1], parts = [];
  if (dr) parts.push(`${LG89W_SQ(Math.abs(dr))} ${dr < 0 ? "north" : "south"}`);
  if (dc) parts.push(`${LG89W_SQ(Math.abs(dc))} ${dc > 0 ? "east" : "west"}`);
  if (!parts.length) return null;
  return `The ${name} is ${parts.join(" and ")} of the house. The directions don't lead there.`;
});

/* ---------- Missing Operation ---------- */
whyRule(8, "logic", "whichop", (q, picked) => {
  const m = String(q.say || "").match(/^(\d+), blank, (\d+), equals (\d+)\./), op = xPlain(picked); if (!m) return null;
  const a = +m[1], b = +m[2], c = +m[3];
  if (op === "+") return a + b === c ? null : `${a} + ${b} = ${a + b}, not ${c}.`;
  if (op === "×") return a * b === c ? null : `${a} × ${b} = ${a * b}, not ${c}.`;
  if (op === "−") return a - b === c ? null : a - b < 0 ? `${b} is bigger than ${a}, so ${a} − ${b} can't make ${c}.` : `${a} − ${b} = ${a - b}, not ${c}.`;
  if (op === "÷") return a / b === c ? null : a % b ? `${a} can't be shared equally into ${b} groups, so ÷ doesn't give ${c}.` : `${a} ÷ ${b} = ${a / b}, not ${c}.`;
  return null;
});

/* ---------- Detective Puzzles ---------- */
whyRule(9, "logic", "deduce", (q, picked) => {
  const s = String(q.say || ""), c1 = s.match(/Clue 1: (\w+) has the (\w+)\./), c2 = s.match(/Clue 2: (\w+) does not have the (\w+)\./);
  if (!c1 || !c2) return null;
  const qt = xPlain(q.q), p = xPlain(picked);
  let m;
  if ((m = qt.match(/^Who has the (\w+)\s*\?$/))) {
    const pet = m[1];
    if (p === c1[1] && c1[2] !== pet) return `Clue 1 says ${p} has the ${c1[2]}, so ${p} can't have the ${pet} too.`;
    if (p === c2[1] && c2[2] === pet) return `Clue 2 says ${p} does not have the ${pet}.`;
    return null;
  }
  if ((m = qt.match(/^Which pet does (\w+)\s*have\?$/))) {
    const kid = m[1];
    if (p === c1[2] && c1[1] !== kid) return `Clue 1 says ${c1[1]} has the ${p}, so ${kid} can't have it.`;
    if (p === c2[2] && c2[1] === kid) return `Clue 2 says ${kid} does not have the ${p}.`;
  }
  return null;
});

/* ---------- Yes, No or Can't Tell ---------- */
const LG89W_NP = s => s.replace(/\.$/, "");
const LG89W_LC = s => /^(The|This|A|An|It|Today|Every|All|No|Some|Someone|Something|Everyone|If|Whenever)\b/.test(s) ? s[0].toLowerCase() + s.slice(1) : s;
const LG89W_SUBJ = s => { const m = s.match(/^(\w+) has a (\w+) that is not/); if (m) return `${m[1]}'s ${m[2]}`; const k = s.match(/^(.+?) (?:is|was|has|have|got|can|cannot|does|did|plays|are)\b/); return k ? LG89W_LC(k[1]) : null; };
const LG89W_PLV = { has: "have", is: "are", plays: "play" };
/* "All the dogs at the park have red collars." -> { group: "dogs at the park", pred: "have red collars" } */
const LG89W_ALLF = s1 => {
  const m = s1.match(/^(Everyone|All|Every)\b(?: of)?( the)? ?(.*?) (have|has|are|is|can|got|plays)\b(.*)\.$/); if (!m) return null;
  let group = m[3]; const pred = (LG89W_PLV[m[4]] || m[4]) + m[5], the = m[1] === "All" && !m[2] ? "" : "the ";
  if (m[1] === "Everyone") group = "people " + group;
  else if (m[1] === "Every") { const w = group.split(" "); let i = w.findIndex((x, j) => j > 0 && (/^(in|on|at|from|who|that)$/.test(x) || /^[A-Z]/.test(x))); if (i < 0) i = w.length; w[i - 1] += "s"; group = w.join(" "); }
  return group ? { group, pred, the } : null;
};
/* "Does Ali wear glasses?" -> ["Ali", "wear glasses"] in a form that fits after "might" / "might not" */
const LG89W_QVP = qq => {
  const m = qq.match(/^(Is|Does|Can|Did) ((?:[A-Z]\w+(?:'s \w+)?)|(?:the \w+)) (.+)\?$/); if (!m) return null;
  const rest = m[3];
  if (m[1] === "Is") return [m[2], "be " + rest];
  if (m[1] === "Does") return [m[2], rest];
  if (m[1] === "Can") return [m[2], "be able to " + rest];
  if (m[1] === "Did" && /^have /.test(rest)) return [m[2], "have had " + rest.slice(5)];
  return null;
};
whyRule(9, "logic", "statements", (q, picked) => {
  const sents = (LG89W_PASS(q.vis).join(" ").replace(/\bMr\./g, "Mr§").match(/[^.]+\./g) || []).map(x => x.replace(/Mr§/g, "Mr.")), a = q.ans, p = xPlain(picked), qq = xPlain(q.q);
  const Y = "Yes, for sure", N = "No, for sure", T = "We can't tell";
  if (sents.length < 2 || p === a || ![Y, N, T].includes(p)) return null;
  const facts = sents.map(x => x.trim()).join(" "), s1 = sents[0].trim(), s2 = sents.slice(1).join(" ").trim(), w = (s1.match(/^(\w+)/) || [])[1] || "";
  /* comparison chains */
  const ch = facts.match(/^(\w+) is (\w+) than (\w+)\. (\w+) is \2 than (\w+)\.$/), qm = qq.match(/^Is (\w+) (\w+) than (\w+)\?$/);
  if (ch && qm && qm[2] === ch[2]) {
    const [, A, X, B, D, E] = ch;
    if (B === D && a === Y && qm[1] === A && qm[3] === E) return `${A} is ${X} than ${B}, and ${B} is ${X} than ${E}, so ${A} must be ${X} than ${E}.`;
    if (B === D && a === N && qm[1] === E && qm[3] === A) return `${A} is ${X} than ${B}, who is ${X} than ${E}, so ${E} can't be ${X} than ${A}.`;
    if (A === D && a === T) return `We only know ${A} is ${X} than both of them. ${B} and ${E} are never compared.`;
    return null;
  }
  const rb = facts.match(/are (\w+) or (\w+)\..* It is not \1\.$/);
  if (rb && a === Y) return `The marble has to be ${rb[1]} or ${rb[2]}, and it isn't ${rb[1]}, so it must be ${rb[2]}.`;
  if (/^The shop is open every day except Sunday\. Today is \w+day\.$/.test(facts) && a === Y && !/Sunday\.$/.test(facts)) return `Today isn't Sunday, and the shop is open every other day.`;
  if (/^The shop is closed on Sundays\. Today the shop is closed\.$/.test(facts) && a === T) return p === Y ? `The shop might be closed on other days too, so we can't be sure it's Sunday.` : `It could be Sunday, so we can't say no.`;
  if (/ or /.test(facts)) return null;
  /* All / Every / Everyone */
  if (/^(Everyone|All|Every)$/.test(w)) {
    const f = LG89W_ALLF(s1); if (!f) return null;
    if (a === Y) return `${LG89W_NP(s2)}, and all ${f.the}${f.group} ${f.pred}, so it must be true.`;
    const sj = LG89W_SUBJ(s2); if (!sj) return null;
    if (a === N) return `${LG89W_NP(s2)}, but all ${f.the}${f.group} ${f.pred}, so ${sj} can't be one of them.`;
    if (a === T) return p === Y ? `${LG89W_NP(s2)}, but the facts never say that only ${f.group} ${f.pred}.` : `${LG89W_NP(s2)}, just like ${f.the}${f.group}, so ${sj} might be one of them.`;
    return null;
  }
  /* If / Whenever */
  const ifm = s1.match(/^(If|Whenever) (.+?), (.+)\.$/);
  if (ifm) {
    const P = ifm[2], Q = ifm[3], when = ifm[1] === "If" ? "if" : "whenever";
    if (a === Y) return `${LG89W_NP(s2)}, so the rule says ${Q}.`;
    if (a === N) return `${LG89W_NP(s2)}, but ${when} ${P}, ${Q}. So the answer to ${xQ(qq)} is no.`;
    if (a === T && /\bnot\b/.test(s2)) return `${LG89W_NP(s2)}, but the rule only tells us what happens when ${P}.`;
    if (a === T) return p === Y ? `${LG89W_NP(s2)}, but the rule never says that only happens when ${P}.` : `${LG89W_NP(s2)}, and that does happen when ${P}, so we can't say no.`;
    return null;
  }
  if (w === "No") {
    if (a === N) return `${LG89W_NP(s2)}, and ${LG89W_LC(LG89W_NP(s1))}, so the answer to ${xQ(qq)} is no.`;
    if (a === T) { const sj = LG89W_SUBJ(s2); return sj ? `${LG89W_NP(s2)}, so ${xQ(LG89W_NP(s1))} doesn't tell us anything about ${sj}.` : null; }
    return null;
  }
  if (w === "Some" && a === T) {
    const v = LG89W_QVP(qq); if (!v) return null;
    return p === Y ? `“Some” doesn't mean all of them, so ${v[0]} might not ${v[1]}.` : `“Some” means at least a few, so ${v[0]} might ${v[1]}.`;
  }
  if (w === "Only" && a === Y) return `${xQ(LG89W_NP(s1))} means no one else could have done it, so we can be sure.`;
  return null;
});

/* ---------- Letter Sequences ---------- */
const LG89W_JUMP = (d) => `${Math.abs(d)} ${Math.abs(d) === 1 ? "letter" : "letters"} ${d > 0 ? "forward" : "back"}`;
whyRule(9, "logic", "letterseq", (q, picked) => {
  const cars = [...String(q.vis).matchAll(/<span class="car[^"]*">([^<]*)<\/span>/g)].map(m => m[1]).filter(c => c !== "?"), p = xPlain(picked);
  if (cars.length < 3 || !/^[A-Z]+$/.test(p) || p === q.ans) return null;
  if (cars.every(c => c.length === 2)) {
    const last = cars[cars.length - 1];
    if (p.length !== 2) return null;
    if (LG89W_LI(p[1]) !== LG89W_LI(p[0]) + 1) return `${p} isn't two letters in a row, like ${cars[0]} is.`;
    return `${p} doesn't start right after ${last[1]}. Each group starts where the last one stopped.`;
  }
  if (p.length !== 1 || cars.some(c => c.length !== 1)) return null;
  const ix = cars.map(LG89W_LI), d = ix.slice(1).map((v, i) => v - ix[i]), lastL = cars[cars.length - 1], jump = LG89W_LI(p) - ix[ix.length - 1];
  if (d.includes(0)) {
    const lastCount = cars.filter(c => c === lastL).length;
    if (lastCount === 1) return `${lastL} has only shown once, and each letter comes twice.`;
    if (p === lastL) return `${lastL} already came twice, and each letter comes just twice.`;
    return `${p} isn't the letter right after ${lastL}.`;
  }
  if (d.every(x => x === d[0])) {
    if (jump === 0) return `${p} is the same as the last letter, but the pattern keeps moving.`;
    if (Math.sign(jump) !== Math.sign(d[0])) return `${p} goes ${d[0] > 0 ? "back" : "forward"}, but the pattern moves ${d[0] > 0 ? "forward" : "back"}.`;
    return `From ${lastL} to ${p} is ${LG89W_JUMP(jump)}, but each step is ${LG89W_JUMP(d[0])}.`;
  }
  if (d.every((x, i) => x === i + 1)) {
    const nx = d.length + 1;
    if (jump <= 0) return `${p} doesn't move forward from ${lastL}, but the jumps keep going forward.`;
    return `From ${lastL} to ${p} is a jump of ${jump}, but the jumps grow by 1, so the next one is ${nx}.`;
  }
  return null;
});

/* ---------- Spy Codes ---------- */
const LG89W_DIFF = (from, to) => { if (from.length !== to.length) return null; const ds = from.split("").map((c, i) => (LG89W_LI(to[i]) - LG89W_LI(c) + 26) % 26); return ds.every(x => x === ds[0]) ? ds[0] : null; };
const LG89W_MOVED = d => d === 0 ? "doesn't move the letters at all" : d <= 13 ? `moves each letter ${d} forward` : `moves each letter ${26 - d} back`;
whyRule(9, "logic", "cipher", (q, picked) => {
  const b = LG89W_BOLD(q.q), p = xPlain(picked), qt = xPlain(q.q);
  if (!/^[A-Z]+$/.test(p)) return null;
  if (/^Secret code/.test(qt)) {
    const k = +b[0], enc = b[1], w = q.ans; if (!enc || !k) return null;
    if (p === enc) return `${p} is the secret code itself. You still need to move each letter back ${k}.`;
    const d = LG89W_DIFF(enc, p);
    if (d != null) return `Going from ${enc} to ${p} ${LG89W_MOVED(d)}, but you need to move each letter back ${k}.`;
    if (p.length !== enc.length) return `${p} doesn't have the same number of letters as ${enc}.`;
    const i = p.split("").findIndex((c, j) => c !== w[j]); if (i < 0) return null;
    return `Move ${enc[i]} back ${k} and you get ${shift(enc[i], -k)}, not ${p[i]}.`;
  }
  if (/^Code/.test(qt)) {
    const w = b[0], k = +b[1]; if (!w || !k) return null;
    const d = LG89W_DIFF(w, p);
    if (d != null) return d === 26 - k ? `${p} moves each letter back ${k}, not forward.` : `${p} ${LG89W_MOVED(d)}, not ${k} forward.`;
    if (p.length === w.length) return `${p} is the code for ${shift(p, -k)}, not ${w}.`;
  }
  return null;
});

/* ---------- Chance & Likely ---------- */
const LG89W_MCOL = Object.fromEntries(MARBLE_COLS);
const LG89W_MCOLE = Object.fromEntries(MARBLE_COLS.map(([e, n]) => [n, e]));
whyRule(9, "logic", "chance", (q, picked) => {
  const bag = [...String(q.vis).matchAll(/<span class="emo">([^<]+)<\/span>/g)].map(m => m[1].trim()), tot = bag.length;
  const cnt = e => bag.filter(x => x === e).length, qt = xPlain(q.q), p = xPlain(picked);
  if (!tot) return null;
  let m;
  if ((m = qt.match(/\b(most|least) likely/))) {
    const pe = LG89W_EMO(picked), ae = LG89W_EMO(q.ans), pc = cnt(pe), ac = cnt(ae), nm = LG89W_MCOL[pe]; if (!nm) return null;
    if (m[1] === "most" && pc < ac) return `There ${pc === 1 ? "is" : "are"} only ${pc} ${nm}, and another color has more.`;
    if (m[1] === "least" && pc > ac) return `There ${pc === 1 ? "is" : "are"} ${pc} ${nm}, and another color has fewer.`;
    return null;
  }
  const col = LG89W_BOLD(q.q)[0], e = LG89W_MCOLE[col]; if (!e || !LIKELY.includes(p)) return null;
  const n = cnt(e), are = n === 1 ? "is" : "are";
  if (p === "impossible" && n > 0) return `There ${are} ${n} ${col} in the bag, so it can happen.`;
  if (p === "certain" && n < tot) return n === 0 ? `There are no ${col} marbles at all, so it can't be certain.` : `Not every marble is ${col}, so it isn't certain.`;
  if (n === 0) return `There are no ${col} marbles, so it can't happen at all.`;
  if (n === tot) return `Every marble is ${col}, so it will happen for sure.`;
  if (p === "likely" && 2 * n < tot) return `Only ${n} of the ${tot} marbles ${are} ${col}. That's less than half.`;
  if (p === "unlikely" && 2 * n > tot) return `${n} of the ${tot} marbles are ${col}. That's more than half.`;
  return null;
});

