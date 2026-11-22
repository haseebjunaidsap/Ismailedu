/* =====================================================================
   Why a wrong answer is wrong: math topics (tag MTHW_)
   6: shapes, compare, oclock, patterns, numwords, ordinal, tally, cubes
   7: halfhour, money, evenodd, symbols, solids, pictograph
   8: fractions, graphs, comparefrac
   9: divrem, equivfrac, area, angles, elapsed, numpatterns, mixednum, volume
   Each rule re-reads the question's own data and returns null when unsure.
   ===================================================================== */
const MTHW_norm = s => xPlain(s).replace(/\s+([?.!,:])/g, "$1");
const MTHW_qt = q => MTHW_norm(q.say || q.q);
const MTHW_q2 = q => MTHW_norm(q.q);
const MTHW_int = s => { const m = xPlain(s).match(/^-?\d+/); return m ? +m[0] : null; };
const MTHW_pl = (n, one, many) => `${n} ${n === 1 ? one : (many || one + "s")}`;
const MTHW_an = w => (/^[aeiou]/i.test(w) ? "an " : "a ") + w;
const MTHW_gcd = (a, b) => b ? MTHW_gcd(b, a % b) : a;
const MTHW_hr = h => ((h - 1 + 1200) % 12) + 1;
const MTHW_mins = s => { const m = xPlain(s).match(/^(\d{1,2}):(\d{2})$/); return m ? (+m[1] % 12) * 60 + +m[2] : null; };
const MTHW_fmt = mins => { mins = ((mins % 720) + 720) % 720; const h = Math.floor(mins / 60) || 12; return `${h}:${String(mins % 60).padStart(2, "0")}`; };
const MTHW_dur = m => { const h = Math.floor(m / 60), r = m % 60; return [h ? `${h} hour${h > 1 ? "s" : ""}` : "", r ? `${r} minutes` : ""].filter(Boolean).join(" ") || "0 minutes"; };
const MTHW_pdur = s => { const t = xPlain(s); if (!/^(\d+ hours?)?\s*(\d+ minutes)?$/.test(t) || !t) return null; const h = t.match(/(\d+) hours?/), m = t.match(/(\d+) minutes/); return (h ? +h[1] * 60 : 0) + (m ? +m[1] : 0); };
/* the clock's own label, e.g. "clock showing 3:30" → [3, 30] */
const MTHW_clk = h => { const m = String(h).match(/aria-label="clock showing (\d+):(\d+)"/); return m ? [+m[1], +m[2]] : null; };
/* pie/bar label: "circle cut into 4 equal parts, 3 shaded" → [parts, shaded, kind] */
const MTHW_cut = h => { const m = String(h || "").match(/aria-label="(circle|bar) cut into (\d+) equal parts, (\d+) shaded"/); return m ? [+m[2], +m[3], m[1]] : null; };
const MTHW_fr = s => { const m = xPlain(s).match(/^(\d+)\s*\/\s*(\d+)$/); return m ? [+m[1], +m[2]] : null; };
const MTHW_mix = s => { const m = xPlain(s).match(/^(\d+)\s+(\d+)\s*\/\s*(\d+)$/); return m ? [+m[1], +m[2], +m[3]] : null; };
const MTHW_cmpw = (x, y, a, b) => x * b > a * y ? "bigger" : x * b < a * y ? "smaller" : "equal";
const MTHW_emo = h => { const m = String(h).match(/<span class="emo"[^>]*>(.*?)<\/span>/); return m ? m[1] : null; };

/* ---------------- 6 · Shapes ---------------- */
const MTHW_SIDES = { circle: 0, triangle: 3, square: 4, rectangle: 4, pentagon: 5, hexagon: 6 };
const MTHW_SW = n => MTHW_SIDES[n] ? `${MTHW_SIDES[n]} sides` : "no sides";
const MTHW_SIDENAME = { 0: "a round shape like a circle", 3: "a triangle", 4: "a square or a rectangle", 5: "a pentagon", 6: "a hexagon" };
function MTHW_shapeVs(p, a, what) {
  const ps = MTHW_SIDES[p], as = MTHW_SIDES[a]; if (ps == null || as == null) return null;
  if (p === "rectangle" && a === "square") return `A rectangle has 2 long sides and 2 short sides, but ${what} has 4 sides all the same length.`;
  if (p === "square" && a === "rectangle") return `A square has 4 sides all the same length, but ${what} has 2 long sides and 2 short sides.`;
  if (!ps) return `A circle is round with no sides, but ${what} has ${as} straight sides.`;
  if (!as) return `A ${p} has ${ps} straight sides, but ${what} is round with no sides.`;
  return `A ${p} has ${ps} sides, but ${what} has ${as} sides.`;
}
whyRule(6, "math", "shapes", (q, picked) => {
  const t = MTHW_qt(q), p = xPlain(picked).toLowerCase(), a = xPlain(q.ans).toLowerCase();
  let m;
  if (/^What shape is this\?/.test(t)) return MTHW_shapeVs(p, a, "this shape");
  if ((m = t.match(/^What shape is (.+)\?$/))) return MTHW_shapeVs(p, a, m[1]);
  if ((m = t.match(/^How many sides does a (\w+) have\?/))) { const n = +p; if (!(n in MTHW_SIDENAME) || n === MTHW_SIDES[m[1]]) return null; return `${MTHW_pl(n, "side")} would make ${MTHW_SIDENAME[n]}, not a ${m[1]}.`; }
  if ((m = t.match(/^Which has (more|fewer) sides: a (\w+) or a (\w+)\?/))) { const o = p === m[2] ? m[3] : m[2]; if (MTHW_SIDES[p] == null) return null; return `A ${p} has ${MTHW_SW(p)}, but a ${o} has ${MTHW_SW(o)}.`; }
  if ((m = t.match(/^Which one is not a (\w+)\?/))) { const lab = (String(picked).match(/aria-label="([^"]+)"/) || [])[1] || ""; if (!new RegExp(`\\b${m[1]}$`).test(lab)) return null; return `That one is a ${m[1]} too, just like the others.`; }
  if ((m = t.match(/^How many corners does a (\w+) have\?/))) { const n = +p; if (!(n in MTHW_SIDENAME) || n === MTHW_SIDES[m[1]]) return null; return n ? `${MTHW_pl(n, "corner")} would make ${MTHW_SIDENAME[n]}, not a ${m[1]}.` : `A shape with no corners is round, like a circle, not a ${m[1]}.`; }
  if (/^Which shape has \d+ sides\?/.test(t) && /<svg/.test(picked)) { const n = ((String(picked).match(/aria-label="([^"]+)"/) || [])[1] || "").split(" ").pop(); if (MTHW_SIDES[n] == null) return null; return MTHW_SIDES[n] ? `That is a ${n}, and it has ${MTHW_SIDES[n]} sides.` : "That is a circle, and it is round with no sides."; }
  if (/^Which shape (has|is)/.test(t)) { if (MTHW_SIDES[p] == null) return null; return MTHW_SIDES[p] ? `A ${p} has ${MTHW_SIDES[p]} sides and ${MTHW_SIDES[p]} corners.` : "A circle is round, so it has no sides and no corners."; }
  if ((m = t.match(/^How many (\w+)s do you see\?/))) {
    const labs = [...String(q.vis).matchAll(/aria-label="([^"]+)"/g)].map(x => x[1]), n = labs.filter(l => new RegExp(`\\b${m[1]}$`).test(l)).length, pn = +p;
    if (!labs.length || n !== +q.ans || !(pn >= 0)) return null;
    return pn > n ? `${pn} is too many. Count only the ${m[1]}s and skip the other shapes.` : `${pn} is too few. Some ${m[1]}s were missed, so look at every shape.`;
  }
  return null;
});

/* ---------------- 6 · More or less ---------------- */
whyRule(6, "math", "compare", (q, picked) => {
  const t = MTHW_qt(q), p = xPlain(picked);
  let m;
  if ((m = t.match(/^Which is (less|more): (\d+) or (\d+)\?/))) { const pn = +p, o = pn === +m[2] ? +m[3] : +m[2]; if (pn === o) return null; return m[1] === "less" ? `${pn} is bigger than ${o}, so it is not less.` : `${pn} is smaller than ${o}, so it is not more.`; }
  if ((m = t.match(/^Which number is the (biggest|smallest)\?/))) { const pn = +p, an = +xPlain(q.ans); if (isNaN(pn)) return null; return m[1] === "biggest" ? `${pn} is smaller than ${an}.` : `${pn} is bigger than ${an}.`; }
  if ((m = t.match(/^Which group has (more|fewer)\?/))) {
    const w = String(q.why).match(/^There are (\d+) (.+?) and (\d+) (.+)\.$/); if (!w) return null;
    const pl = p.toLowerCase(), [x, nx, y, ny] = pl === w[2] ? [+w[1], w[2], +w[3], w[4]] : pl === w[4] ? [+w[3], w[4], +w[1], w[2]] : [];
    if (nx == null) return null;
    const one = n => (THINGS.find(th => th[1] === n) || [])[2]; const nm = (c, n) => c === 1 ? one(n) : n; if (!nm(x, nx) || !nm(y, ny)) return null;
    return `There ${x === 1 ? "is" : "are"} ${x} ${nm(x, nx)}, and that is ${x < y ? "fewer" : "more"} than ${y} ${nm(y, ny)}.`;
  }
  return null;
});

/* ---------------- 6 · O'clock ---------------- */
const MTHW_rel = (p, h) => { const f = ((p - h) % 12 + 12) % 12; return f === 0 ? null : f <= 6 ? `${MTHW_pl(f, "hour")} after` : `${MTHW_pl(12 - f, "hour")} before`; };
whyRule(6, "math", "oclock", (q, picked) => {
  const t = MTHW_qt(q), p = xPlain(picked);
  let m;
  const pc = MTHW_clk(picked);
  if (pc) return `That clock shows ${pc[0]} o'clock: its short hand points to the ${pc[0]}.`;
  if ((m = t.match(/^It is (\d+) o'clock\. What time (?:will it be|was it) (\d+ hours? (?:later|earlier))\?/))) {
    const pm = p.match(/^(\d+) o'clock$/); if (!pm) return null; const h = +m[1], r = MTHW_rel(+pm[1], h);
    if (!r) return `${h} o'clock is the time right now, not ${m[2]}.`;
    return `${p} is ${r} ${h} o'clock, not ${m[2]}.`;
  }
  if ((m = t.match(/^Which time is the same as (\d+) o'clock\?/))) { const pm = p.match(/^(\d+):00$/); return pm ? `${p} is ${pm[1]} o'clock, not ${m[1]} o'clock.` : null; }
  if ((m = t.match(/^At (\d+) o'clock, which number does the short hand point to\?/))) { const n = +p; if (!(n >= 1 && n <= 12)) return null; return `The short hand points to the ${n} at ${n} o'clock, not ${m[1]} o'clock.`; }
  if (/^At \d+ o'clock, which number does the long hand point to\?/.test(t)) { const n = +p; if (!(n >= 1 && n < 12)) return null; return n === 6 ? "When the long hand points to the 6, it is half past, not o'clock." : `When the long hand points to the ${n}, it is ${n * 5} minutes past the hour, not o'clock.`; }
  const vc = MTHW_clk(q.vis), pm = p.match(/^(\d+)(?::00| o'clock)$/);
  if (vc && pm && /^What time is it\?/.test(t)) return `At ${p}, the short hand would point to the ${pm[1]}, but here it points to the ${vc[0]}.`;
  return null;
});

/* ---------------- 6 · Patterns ---------------- */
const MTHW_cells = vis => [...String(vis).matchAll(/<span class="car( q)?">(.*?)<\/span>/g)].map(x => x[1] ? "?" : x[2]);
function MTHW_period(cells) {
  for (let p = 1; p < cells.length; p++) {
    let ok = true;
    for (let i = 0; i < cells.length && ok; i++) for (let j = i + p; j < cells.length; j += p) if (cells[i] !== "?" && cells[j] !== "?" && cells[i] !== cells[j]) { ok = false; break; }
    if (ok) return p;
  }
  return null;
}
whyRule(6, "math", "patterns", (q, picked) => {
  const cells = MTHW_cells(q.vis), pe = MTHW_emo(picked), ae = MTHW_emo(q.ans); if (!cells.length || !pe || !ae) return null;
  const qi = cells.indexOf("?"); if (qi < 0) return null;
  const p = MTHW_period(cells); if (!p || cells.length - 1 < p + 2) return null;
  let exp = null; for (let j = qi % p; j < cells.length; j += p) if (cells[j] !== "?") { exp = cells[j]; break; }
  if (exp !== ae) return null;
  const unit = Array.from({ length: p }, (_, j) => { for (let i = j; i < cells.length; i += p) if (cells[i] !== "?") return cells[i]; return "?"; }); if (unit.includes("?")) return null;
  if (!cells.includes(pe)) return `${pe} isn't in this pattern at all.`;
  const U = unit.join(" ");
  if (qi === cells.length - 1) { const r = qi % p; return r === 0 ? `The pattern is ${U}. It just ended, so it starts again with ${exp}, not ${pe}.` : `The pattern is ${U}. After ${cells.slice(qi - r, qi).join(" ")} comes ${exp}, not ${pe}.`; }
  return `The pattern is ${U}, so this spot needs ${exp}, not ${pe}.`;
});

/* ---------------- 6 · Number words ---------------- */
function MTHW_spell(w, c, n) {
  if (w.length === c.length) {
    const d = [...w].map((x, i) => x !== c[i] ? i : -1).filter(i => i >= 0);
    if (d.length === 1) return `${xQ(w)} has “${w[d[0]]}” where ${n} needs “${c[d[0]]}”.`;
    if (d.length === 2 && d[1] === d[0] + 1 && w[d[0]] === c[d[1]] && w[d[1]] === c[d[0]]) return `${xQ(w)} has two letters swapped around.`;
  }
  if (w.length === c.length - 1) for (let i = 0; i < c.length; i++) if (c.slice(0, i) + c.slice(i + 1) === w) return `${xQ(w)} is missing a letter “${c[i]}”.`;
  if (w.length === c.length + 1) for (let i = 0; i < w.length; i++) if (w.slice(0, i) + w.slice(i + 1) === c) return `${xQ(w)} has an extra letter “${w[i]}”.`;
  return `${xQ(w)} isn't how ${n} is spelled.`;
}
whyRule(6, "math", "numwords", (q, picked) => {
  const t = MTHW_qt(q), p = xPlain(picked).toLowerCase(), W = NUMWORDS, pv = W.indexOf(p);
  let m;
  if ((m = t.match(/^Which number is (\w+)\?/))) { const n = +p; if (!(n >= 0 && n <= 20)) return null; return `${n} is ${xQ(W[n])}, not ${xQ(m[1])}.`; }
  if ((m = t.match(/^Which word means (\d+)\?/))) { if (pv < 0) return null; return `${xQ(p)} is ${pv}, not ${m[1]}.`; }
  if ((m = t.match(/^What number comes (after|before) (\w+)\?/))) {
    const n = W.indexOf(m[2]); if (pv < 0 || n < 0) return null;
    if (pv === n) return `${cap(p)} is the same number, not the one ${m[1]} it.`;
    if ((pv > n) !== (m[1] === "after")) return `${cap(p)} is ${pv}, which comes ${pv > n ? "after" : "before"} ${m[2]}.`;
    const d = Math.abs(pv - n); return `${cap(p)} is ${pv}. That is ${d} ${pv > n ? "more" : "less"} than ${m[2]}, not just 1.`;
  }
  if ((m = t.match(/^Which word for (\d+) is spelled right\?/))) return MTHW_spell(p, W[+m[1]], m[1]);
  if ((m = t.match(/^How many (.+)\? Pick the word\./))) { const c = W.indexOf(xPlain(q.ans)); if (pv < 0 || c < 0) return null; return `${xQ(p)} is ${pv}, which is ${Math.abs(pv - c)} ${pv > c ? "more" : "fewer"} than the ${m[1]} in the picture.`; }
  if ((m = t.match(/^Which number is bigger: (\w+) or (\w+)\?/))) { const o = p === m[1] ? m[2] : m[1], ov = W.indexOf(o); if (pv < 0 || ov < 0) return null; return `${cap(p)} is ${pv} and ${o} is ${ov}, so ${p} is smaller.`; }
  return null;
});

/* ---------------- 6 · Ordinal ---------------- */
const MTHW_ORDW = ["first", "second", "third", "fourth", "fifth", "sixth"];
whyRule(6, "math", "ordinal", (q, picked) => {
  const items = [...String(q.vis).matchAll(/<span class="emo xl">(.*?)<\/span>/g)].map(x => x[1]); if (!items.length) return null;
  const t = MTHW_q2(q);
  if (/^Who is \d/.test(t)) { const e = MTHW_emo(picked), j = items.indexOf(e); if (j < 0) return null; return `Counting from the flag, ${e} is ${MTHW_ORDW[j]} in line.`; }
  const pm = xPlain(picked).match(/^(\d)(st|nd|rd|th)$/), ae = (String(q.q).match(/What place is <span class="emo">(.*?)<\/span>/) || [])[1];
  if (pm && ae) { const j = +pm[1] - 1; if (j >= items.length || items[j] === ae) return null; return `The ${MTHW_ORDW[j]} one from the flag is ${items[j]}, a different animal.`; }
  return null;
});

/* ---------------- 6 · Tally marks ---------------- */
const MTHW_tdesc = n => { const b = Math.floor(n / 5), s = n % 5; return [b ? MTHW_pl(b, "bundle") + " of 5" : "", s ? MTHW_pl(s, "single stick") : ""].filter(Boolean).join(" and ") || "no marks"; };
whyRule(6, "math", "tally", (q, picked) => {
  const t = MTHW_qt(q);
  if (/^How many do the tally marks show\?/.test(t)) { const p = +xPlain(picked), n = +xPlain(q.ans); if (!(p >= 0) || p === n) return null; return `${p} would be ${MTHW_tdesc(p)}, but the picture shows ${MTHW_tdesc(n)}.`; }
  const lm = String(picked).match(/aria-label="(\d+) tally marks"/), m = t.match(/^Which tally marks show (\d+)\?/);
  if (lm && m) { const x = +lm[1]; if (x === +m[1]) return null; return `Those marks show ${x}: ${MTHW_tdesc(x)}.`; }
  return null;
});

/* ---------------- 6 · Measure with cubes ---------------- */
whyRule(6, "math", "cubes", (q, picked) => {
  const t = MTHW_qt(q);
  let m;
  if ((m = t.match(/^How many cubes long is the (\w+)\?/))) {
    const cm = String(q.vis).match(/<div class="cm-cubes">(.*?)<\/div>/), n = cm ? (cm[1].match(/<span><\/span>/g) || []).length : 0, p = +xPlain(picked);
    if (!n || n !== +xPlain(q.ans) || !(p >= 0) || p === n) return null;
    const d = Math.abs(p - n);
    return p > n ? `${p} is ${d} too many. The ${m[1]} is not that long.` : `${p} is ${d} too few. Count every cube under the ${m[1]}, end to end.`;
  }
  if ((m = t.match(/^Which is (longer|shorter)\?/))) {
    const w = String(q.why).match(/^The (\w+) is (\d+) cubes and the (\w+) is (\d+) cubes\.$/), pn = (String(picked).match(/title="([^"]+)"/) || [])[1];
    if (!w || !pn) return null;
    const [x, o, y] = pn === w[1] ? [+w[2], w[3], +w[4]] : pn === w[3] ? [+w[4], w[1], +w[2]] : [];
    if (o == null) return null;
    return `The ${pn} is ${x < y ? "only " : ""}${x} cubes, ${x < y ? "shorter" : "longer"} than the ${o} at ${y} cubes.`;
  }
  return null;
});

/* ---------------- 7 · Half past ---------------- */
const MTHW_hands = (h, m) => m === 30 ? `the long hand is on the 6 and the short hand is between the ${h} and the ${MTHW_hr(h + 1)}` : m === 0 ? `the long hand is on the 12 and the short hand is on the ${h}` : null;
const MTHW_words = s => { const x = xPlain(s).match(/^(\d+):(\d{2})$/); return !x ? null : x[2] === "30" ? `half past ${+x[1]}` : x[2] === "00" ? `${+x[1]} o'clock` : null; };
whyRule(7, "math", "halfhour", (q, picked) => {
  const t = MTHW_qt(q), p = xPlain(picked);
  let m;
  const pc = MTHW_clk(picked);
  if (pc) { const hd = MTHW_hands(pc[0], pc[1]); return hd ? `That clock shows ${pc[0]}:${String(pc[1]).padStart(2, "0")}: ${hd}.` : null; }
  if ((m = t.match(/^The clock shows (\d+:\d{2})\. What time will it be (30 minutes|1 hour) later\?/))) {
    const s = MTHW_mins(m[1]), pm = MTHW_mins(p); if (s == null || pm == null) return null;
    const d = ((pm - s) % 720 + 720) % 720;
    if (d === 0) return `${p} is the same time the clock shows now, not ${m[2]} later.`;
    if (d <= 360) return `${p} is ${MTHW_dur(d)} after ${m[1]}, not ${m[2]}.`;
    return `${p} is ${MTHW_dur(720 - d)} before ${m[1]}, not later.`;
  }
  if (/^How do we say \d+:\d{2}\?/.test(t)) { let x; if ((x = p.match(/^half past (\d+)$/))) return `${cap(p)} is written ${x[1]}:30.`; if ((x = p.match(/^(\d+) o'clock$/))) return `${cap(p)} is written ${x[1]}:00.`; return null; }
  if (/^Which time means /.test(t)) { const w = MTHW_words(p); return w ? `${p} means ${w}.` : null; }
  if ((m = t.match(/^At half past (\d+), where does the short hand point\?/))) {
    const h = +m[1]; let x;
    if ((x = p.match(/^between (\d+) and (\d+)$/))) return `Between the ${x[1]} and the ${x[2]} is where it points at half past ${x[1]}.`;
    if ((x = p.match(/^right on the (\d+)$/))) return `The short hand is right on the ${x[1]} at ${x[1]} o'clock, not at half past ${h}.`;
    return null;
  }
  const vc = MTHW_clk(q.vis), pt = p.match(/^(\d+):(\d{2})$/);
  if (vc && pt && /^What time does the clock show\?/.test(t)) {
    const ph = +pt[1], pmn = +pt[2];
    if (vc[1] === 30 && ph === 6 && pmn === (vc[0] * 5) % 60 && pmn !== 30) return `${p} mixes up the hands. The short hand tells the hour, and the long hand tells the minutes.`;
    const hd = MTHW_hands(ph, pmn); return hd ? `At ${p}, ${hd}.` : null;
  }
  return null;
});

/* ---------------- 7 · Counting coins ---------------- */
const MTHW_CV = { quarter: 25, dime: 10, nickel: 5, penny: 1 };
const MTHW_CBY = { 1: "penny", 5: "nickel", 10: "dime", 25: "quarter" };
whyRule(7, "math", "money", (q, picked) => {
  const t = MTHW_qt(q);
  let m;
  if ((m = t.match(/^Which coin is worth (\d+) cents?\?/))) { const c = xPlain(picked).toLowerCase(); if (!(c in MTHW_CV)) return null; return `A ${c} is worth ${MTHW_CV[c]}¢, not ${m[1]}¢.`; }
  if (/^How much money is this\?/.test(t)) {
    const coins = [...String(q.vis).matchAll(/aria-label="(quarter|dime|nickel|penny)"/g)].map(x => x[1]), tot = coins.reduce((s, c) => s + MTHW_CV[c], 0);
    const p = MTHW_int(picked); if (!coins.length || p == null || tot !== MTHW_int(q.ans) || p === tot) return null;
    const d = Math.abs(p - tot), c = MTHW_CBY[d];
    if (c && p > tot) return `${p}¢ is ${d}¢ more than these coins make, as if you counted an extra ${c}.`;
    if (c && p < tot && coins.includes(c)) return `${p}¢ is ${d}¢ less than these coins make, as if you skipped a ${c}.`;
    return `${p}¢ is ${d}¢ ${p > tot ? "more" : "less"} than these coins make.`;
  }
  return null;
});

/* ---------------- 7 · Even and odd ---------------- */
whyRule(7, "math", "evenodd", (q, picked) => {
  const t = MTHW_qt(q), p = xPlain(picked);
  let m;
  if ((m = t.match(/^Is (\d+) even or odd\?/))) {
    const n = +m[1], ev = n % 2 === 0; if (p !== "even" && p !== "odd") return null;
    if (/class="pdots"/.test(q.vis || "")) return ev ? `If you pair up the ${n} dots, none are left over, so it isn't odd.` : `If you pair up the ${n} dots, 1 is left without a partner, so it can't be even.`;
    return ev ? `Odd numbers end in 1, 3, 5, 7 or 9, but ${n} ends in ${n % 10}.` : `Even numbers end in 0, 2, 4, 6 or 8, but ${n} ends in ${n % 10}.`;
  }
  if ((m = t.match(/has (\d+) \w+\. Can they all go in pairs with none left over\?/))) {
    const n = +m[1], h = Math.floor(n / 2);
    if (p === "Yes" && n % 2) return `${n} makes ${MTHW_pl(h, "pair")} and 1 more, so one is left over.`;
    if (p === "No" && !(n % 2)) return `${n} makes exactly ${MTHW_pl(h, "pair")}, with none left over.`;
    return null;
  }
  if ((m = t.match(/^What is the next (even|odd) number after (\d+)\?/))) {
    const w = m[1], n = +m[2], pn = +p; if (isNaN(pn)) return null;
    if (pn === n) return `${pn} is the number we start from, not one after it.`;
    if ((pn % 2 === 0) !== (w === "even")) return `${pn} is ${w === "even" ? "odd" : "even"}: it ends in ${pn % 10}.`;
    if (pn < n) return `${pn} comes before ${n}, not after it.`;
    return `${pn} is ${w}, but it skips over a nearer ${w} number.`;
  }
  if ((m = t.match(/^(\d+) is even\. Which double makes \d+\?/))) { const x = p.match(/^(\d+) \+ (\d+)$/); if (!x) return null; const s = +x[1] + +x[2]; if (s === +m[1]) return null; return `${p} = ${s}, not ${m[1]}${x[1] !== x[2] ? ", and it isn't a double" : ""}.`; }
  return null;
});

/* ---------------- 7 · Greater, less, equal ---------------- */
whyRule(7, "math", "symbols", (q, picked) => {
  const m = String(q.say || "").match(/^(\d+), blank, (\d+)\./), p = xPlain(picked); if (!m) return null;
  const a = +m[1], b = +m[2];
  if (p === "=") return a === b ? null : `= means both are the same, but ${a} and ${b} are different numbers.`;
  if (p === ">") return a > b ? null : a === b ? `> says ${a} is bigger, but both numbers are the same.` : `${a} > ${b} says ${a} is greater, but ${a} is less than ${b}.`;
  if (p === "<") return a < b ? null : a === b ? `< says ${a} is smaller, but both numbers are the same.` : `${a} < ${b} says ${a} is less, but ${a} is greater than ${b}.`;
  return null;
});

/* ---------------- 7 · 3D shapes ---------------- */
const MTHW_SFEAT = { sphere: "is round all over, with no flat faces", cube: "has 6 square faces, like a die", cone: "has one flat circle face and one pointy tip", cylinder: "has 2 flat circles and a curved side, like a can", "rectangular prism": "is a box shape with 6 flat faces" };
const MTHW_SLOOK = { sphere: "is round all over", cube: "has 6 square faces", cone: "has a pointy tip", cylinder: "has round ends and a curved side", "rectangular prism": "is longer one way, so not all of its faces are squares" };
const MTHW_SFACT = {
  "How many flat faces does a cube have?": { 4: "4 faces would leave out the top and bottom of the cube.", 8: "8 is how many corners a cube has, not faces.", 12: "12 is how many edges a cube has, not faces." },
  "How many corners (vertices) does a cube have?": { 4: "4 is only the corners on top. The bottom has 4 more.", 6: "6 is how many faces a cube has, not corners.", 12: "12 is how many edges a cube has, not corners." },
  "How many edges does a cube have?": { 6: "6 is how many faces a cube has, not edges.", 8: "8 is how many corners a cube has, not edges.", 10: "10 is too few. Count the edges on the top, the bottom and up the sides." },
  "How many flat faces does a sphere have?": { 1: "A sphere has no flat part at all, so it can't have 1 flat face.", 2: "A sphere has no flat part at all, so it can't have 2 flat faces.", 6: "6 flat faces is a cube, not a sphere." },
  "How many flat faces does a cylinder have?": { 0: "0 flat faces is a sphere. A cylinder has flat ends.", 1: "1 flat face is a cone. A cylinder is flat on the top and the bottom.", 4: "Only the top and bottom of a cylinder are flat. Its side is curved." },
  "Which solid can roll and stack?": { cube: "A cube can stack, but it can't roll.", sphere: "A sphere can roll, but it can't stack.", "rectangular prism": "A rectangular prism can stack, but it can't roll." },
  "How many flat faces does a rectangular prism have?": { 4: "4 faces would leave out the top and bottom of the box.", 8: "8 is how many corners a box has, not faces.", 12: "12 is how many edges a box has, not faces." },
  "How many edges does a rectangular prism have?": { 6: "6 is how many faces a box has, not edges.", 8: "8 is how many corners a box has, not edges.", 4: "4 is only the edges on the top of the box." },
  "How many vertices (corners) does a rectangular prism have?": { 4: "4 is only the corners on top. The bottom has 4 more.", 6: "6 is how many faces a box has, not corners.", 12: "12 is how many edges a box has, not corners." },
  "How many flat faces does a cone have?": { 0: "0 flat faces is a sphere. A cone has one flat circle face.", 2: "2 flat faces is a cylinder. A cone has a pointy tip instead of a second flat face.", 3: "A cone's side is curved, so it can't have 3 flat faces." },
  "How many pointy vertices does a cone have?": { 0: "A cone has a sharp pointy tip, so it isn't 0.", 2: "The edge of a cone's circle face is round, so the tip is its only point.", 4: "The edge of a cone's circle face is round, so the tip is its only point." },
  "How many vertices (corners) does a cylinder have?": { 1: "1 point is a cone. A cylinder's edges are round circles.", 2: "A cylinder's edges are round circles, so they have no pointy corners.", 4: "A cylinder's edges are round circles, so they have no pointy corners." },
  "How many vertices (corners) does a sphere have?": { 1: "1 point is a cone, not a sphere.", 2: "A sphere has no points anywhere, so it can't have 2.", 8: "8 corners is a cube or a box, not a sphere." },
  "What shape is each face of a cube?": { circle: "A circle is round, but a cube's faces have 4 straight sides.", triangle: "A triangle has 3 sides, but a cube's faces have 4 equal sides.", hexagon: "A hexagon has 6 sides, but a cube's faces have 4 equal sides." },
  "What shape are the two flat faces of a cylinder?": { square: "A square has straight sides and corners, but the ends of a can are round.", triangle: "A triangle has straight sides and corners, but the ends of a can are round.", hexagon: "A hexagon has straight sides and corners, but the ends of a can are round." },
  "What shape is the flat face of a cone?": { square: "A square has straight sides and corners, but the flat face of a cone is round.", triangle: "A triangle has straight sides and corners, but the flat face of a cone is round.", hexagon: "A hexagon has straight sides and corners, but the flat face of a cone is round." },
  "Which 3D shape has 1 flat face and 1 point?": { cylinder: "A cylinder has 2 flat faces and no point.", sphere: "A sphere has no flat faces and no point.", cube: "A cube has 6 flat faces and 8 corners." },
  "Which 3D shape has no flat faces?": { cube: "A cube has 6 flat faces.", cylinder: "A cylinder has 2 flat faces, on the top and bottom.", cone: "A cone has 1 flat face on the bottom." },
  "Which 3D shape has 6 square faces?": { sphere: "A sphere has no flat faces at all.", cylinder: "A cylinder has 2 flat faces, and they are circles.", cone: "A cone has just 1 flat face, and it is a circle." },
  "Which 3D shape has 2 flat circle faces?": { cone: "A cone has only 1 flat circle face.", sphere: "A sphere has no flat faces at all.", cube: "A cube's 6 flat faces are squares, not circles." },
  "Which 3D shape can roll but cannot stack?": { cube: "A cube can stack, and it can't roll.", cylinder: "A cylinder can roll, but it can also stack on its flat ends.", "rectangular prism": "A box can stack, and it can't roll." },
  "Which of these can NOT roll?": { sphere: "A sphere rolls in every direction.", cylinder: "A cylinder rolls on its curved side." },
};
const MTHW_SOLIDOF = o => { for (const [n, list] of Object.entries(MTH_SOBJ)) if (list.includes(o)) return n; return null; };
whyRule(7, "math", "solids", (q, picked) => {
  const t = MTHW_q2(q), p = xPlain(picked), a = xPlain(q.ans);
  let m;
  if (MTHW_SFACT[t]) return MTHW_SFACT[t][p] || null;
  if (/^What 3D shape is this\?/.test(t)) return MTHW_SFEAT[p] && MTHW_SLOOK[a] ? `${cap(MTHW_an(p))} ${MTHW_SFEAT[p]}, but this one ${MTHW_SLOOK[a]}.` : null;
  if ((m = t.match(/^What 3D shape is (.+) shaped like\?/))) return MTHW_SFEAT[p] && MTHW_SLOOK[a] ? `${cap(MTHW_an(p))} ${MTHW_SFEAT[p]}, but ${m[1]} ${MTHW_SLOOK[a]}.` : null;
  if ((m = t.match(/^Which one is shaped like a (.+)\?/))) { const s = MTHW_SOLIDOF(p); return s && s !== m[1] ? `${cap(p)} is shaped like ${MTHW_an(s)}, not ${MTHW_an(m[1])}.` : null; }
  return null;
});

/* ---------------- 7 · Picture graphs ---------------- */
function MTHW_picto(vis) {
  const key = +((String(vis).match(/<div class="picto-key"><span class="emo">.*?<\/span> = (\d+)<\/div>/) || [])[1]);
  const rows = [...String(vis).matchAll(/<div class="picto-row"><b>(.*?)<\/b><span>(.*?)<\/span><\/div>/g)].map(x => [x[1], (x[2].match(/<span class="emo">/g) || []).length]);
  return key && rows.length ? { key, rows: Object.fromEntries(rows.map(([n, c]) => [n, { c, v: c * key }])) } : null;
}
whyRule(7, "math", "pictograph", (q, picked) => {
  const g = MTHW_picto(q.vis), t = MTHW_qt(q), p = xPlain(picked); if (!g) return null;
  let m;
  if ((m = t.match(/^How many more for (\w+) than (\w+)\?/))) {
    const A = g.rows[m[1]], B = g.rows[m[2]], pn = +p; if (!A || !B || isNaN(pn) || pn === A.v - B.v) return null;
    if (pn === A.v) return `${pn} is all of ${m[1]}'s row. Take away ${m[2]}'s ${B.v} to find how many more.`;
    if (g.key > 1 && pn === A.c - B.c) return `${pn} is how many more pictures, but each picture stands for ${g.key}.`;
    return `${m[1]} has ${A.v} and ${m[2]} has ${B.v}, and ${A.v} − ${B.v} isn't ${pn}.`;
  }
  if ((m = t.match(/^How many for (\w+)\?/))) {
    const r = g.rows[m[1]], pn = +p; if (!r || isNaN(pn) || pn === r.v) return null;
    if (g.key > 1 && pn === r.c) return `${pn} is how many pictures there are, but each picture stands for ${g.key}.`;
    if (pn % g.key === 0) return `${pn} would need ${MTHW_pl(pn / g.key, "picture")} in ${m[1]}'s row, but there ${r.c === 1 ? "is" : "are"} ${r.c}.`;
    return `${m[1]}'s row has ${MTHW_pl(r.c, "picture")} worth ${g.key} each, and that doesn't make ${pn}.`;
  }
  if (/^Which row has the most\?/.test(t)) { const r = g.rows[p], A = g.rows[xPlain(q.ans)]; if (!r || !A || r.v >= A.v) return null; return `${p}'s row shows only ${r.v}, less than ${xPlain(q.ans)}'s ${A.v}.`; }
  return null;
});

/* ---------------- 8 · Fractions ---------------- */
whyRule(8, "math", "fractions", (q, picked) => {
  const t = MTHW_qt(q), pf = MTHW_fr(picked), af = MTHW_fr(q.ans);
  let m;
  const pc = MTHW_cut(picked);
  if (pc && (m = t.match(/^Which picture shows (\w+) (\w+)\?/))) return `That ${pc[2]} has ${pc[0]} equal parts with ${pc[1]} shaded, so it shows ${pc[1]}/${pc[0]}.`;
  if (!pf || !af) return null;
  const [pn, pd] = pf, P = `${pn}/${pd}`;
  if (pd === af[0] && pn === af[1] && pn !== pd) return `${P} has the numbers flipped. The bottom number tells how many equal parts make the whole.`;
  const vc = MTHW_cut(q.vis);
  if (vc && /^What fraction is (not )?shaded\?/.test(t)) {
    const [n, k, kind] = vc, not = /not shaded/.test(t), want = not ? n - k : k;
    if (pd !== n) return `${P} has ${pd} on the bottom, but this ${kind} has ${n} equal parts.`;
    if (!not && pn === n - k) return `${P} counts the parts that are not shaded. Count the shaded parts.`;
    if (not && pn === k) return `${P} counts the shaded parts, but this asks for the parts that are not shaded.`;
    if (pn !== want) return `${P} would need ${pn} ${not ? "white" : "shaded"} ${pn === 1 ? "part" : "parts"}.`;
    return null;
  }
  if ((m = t.match(/into (\d+) equal pieces and eats (\d+)\. What fraction of the (\w+) is (left|eaten)\?/))) {
    const d = +m[1], e = +m[2], left = m[4] === "left", want = left ? d - e : e;
    if (pd === d - e && pn === e && pd !== d) return `${P} compares the eaten pieces to the left ones. The bottom should be all ${d} pieces.`;
    if (pd !== d) return `The ${m[3]} has ${d} pieces in all, so ${P} has the wrong bottom number.`;
    if (left && pn === e && e !== want) return `${P} is the part that was eaten, not the part left.`;
    if (!left && pn === d - e && d - e !== want) return `${P} is the part that is left, not the part eaten.`;
    if (pn !== want) return `${P} would mean ${pn} ${pn === 1 ? "piece" : "pieces"} ${left ? (pn === 1 ? "is" : "are") + " left" : (pn === 1 ? "was" : "were") + " eaten"}.`;
    return null;
  }
  if ((m = t.match(/^Which fraction is (bigger|smaller|greater|less)\b/))) {
    const big = /bigger|greater/.test(m[1]), c = MTHW_cmpw(pn, pd, af[0], af[1]); if (c === "equal") return null;
    if (pn === 1 && af[0] === 1) return `${P} is 1 of ${pd} parts, so its piece is ${pd > af[1] ? "smaller" : "bigger"} than 1/${af[1]}.`;
    if (pd === af[1]) return `${P} is ${pn} of the ${pd} parts. That's ${pn < af[0] ? "fewer" : "more"} than ${MTHW_pl(af[0], "part")}, so ${P} is ${pn < af[0] ? "smaller" : "bigger"}.`;
    return `${P} is ${c} than ${af[0]}/${af[1]}.`;
  }
  return null;
});

/* ---------------- 8 · Bar graphs ---------------- */
function MTHW_bars(q) {
  const g = GRAPHS.find(x => String(q.vis).includes(`aria-label="${x[0]}"`)); if (!g) return null;
  const hs = [...String(q.vis).matchAll(/<rect x="[\d.]+" y="[\d.]+" width="44" height="([\d.]+)" rx="4"/g)].map(x => Math.round(+x[1] / 17));
  return hs.length === 4 ? Object.fromEntries(g[2].map((n, i) => [n, hs[i]])) : null;
}
whyRule(8, "math", "graphs", (q, picked) => {
  const b = MTHW_bars(q), t = MTHW_qt(q); if (!b) return null;
  let m;
  if ((m = t.match(/^How many more chose (\w+) than (\w+)\?/))) {
    const A = b[m[1]], B = b[m[2]], p = +xPlain(picked); if (A == null || B == null || isNaN(p) || p === A - B) return null;
    if (p === A + B) return `${p} is ${A} + ${B}. That adds the bars, but "how many more" means take away.`;
    if (p === A) return `${p} is just the ${m[1]} bar. Take away the ${m[2]} bar to find how many more.`;
    return `The ${m[1]} bar is ${A} and the ${m[2]} bar is ${B}, and ${A} − ${B} isn't ${p}.`;
  }
  if ((m = t.match(/^How many chose (\w+)\?/))) {
    const v = b[m[1]], p = +xPlain(picked); if (v == null || isNaN(p) || p === v) return null;
    const other = Object.keys(b).find(n => n !== m[1] && b[n] === p);
    if (other) return `${p} is where the ${other} bar stops, not the ${m[1]} bar.`;
    return `The ${m[1]} bar doesn't stop at ${p}. It goes ${v > p ? "higher" : "lower"} than that.`;
  }
  if ((m = t.match(/^Which was chosen the (most|least)\?/))) {
    const pn = xLabel(picked), an = xLabel(q.ans), v = b[pn], av = b[an]; if (v == null || av == null || v === av) return null;
    return m[1] === "most" ? `The ${pn} bar goes up to only ${v}, but the ${an} bar goes up to ${av}.` : `The ${pn} bar goes up to ${v}, but the ${an} bar is shorter at ${av}.`;
  }
  return null;
});

/* ---------------- 8 · Comparing fractions ---------------- */
whyRule(8, "math", "comparefrac", (q, picked) => {
  const m = String(q.say || "").match(/^(\d+) over (\d+), blank, (\d+) over (\d+)\./), p = xPlain(picked); if (!m) return null;
  const [a, b, c, d] = m.slice(1).map(Number), L = `${a}/${b}`, R = `${c}/${d}`, cmp = Math.sign(a * d - c * b);
  const why = cmp === 0 ? "" : b === d ? `: ${MTHW_pl(Math.min(a, c), "piece")} ${Math.min(a, c) === 1 ? "is" : "are"} fewer than ${Math.max(a, c)} pieces of the same size` : a === c ? `: ${Math.max(b, d)} parts make smaller pieces than ${Math.min(b, d)} parts` : "";
  const smaller = cmp < 0 ? L : R, bigger = cmp < 0 ? R : L;
  if (p === "=") return cmp === 0 ? null : `= means the same amount, but ${smaller} is less than ${bigger}${why}.`;
  if (p === ">") return cmp > 0 ? null : cmp === 0 ? `> says ${L} is bigger, but both are the same amount.` : `> says ${L} is bigger, but ${L} is less than ${R}${why}.`;
  if (p === "<") return cmp < 0 ? null : cmp === 0 ? `< says ${L} is smaller, but both are the same amount.` : `< says ${L} is smaller, but ${L} is more than ${R}${why}.`;
  return null;
});

/* ---------------- 9 · Division with remainders ---------------- */
whyRule(9, "math", "divrem", (q, picked) => {
  const e = xPlain(q.vis).match(/(\d+) ÷ (\d+)/), p = xPlain(picked).match(/^(\d+) R (\d+)$/); if (!e || !p) return null;
  const n = +e[1], b = +e[2], pq = +p[1], pr = +p[2];
  if (pq * b + pr === n && pr < b) return null;
  if (pr >= b) return `The remainder ${pr} isn't less than ${b}, so another group of ${b} could still be made.`;
  if (pq * b > n) return `${pq} × ${b} = ${pq * b}, which is already more than ${n}.`;
  return `Check it: ${pq} × ${b} + ${pr} = ${pq * b + pr}, not ${n}.`;
});

/* ---------------- 9 · Equivalent fractions ---------------- */
whyRule(9, "math", "equivfrac", (q, picked) => {
  const t = MTHW_qt(q), pv = xPlain(picked);
  let m;
  if ((m = t.match(/^(\d+) over (\d+) equals what over (\d+)\?/))) {
    const a = +m[1], b = +m[2], bot = +m[3], k = bot / b, x = +pv; if (isNaN(x) || x * b === a * bot) return null;
    if (Number.isInteger(k) && x === a + k && k !== a * k - a) return `${x} adds ${k} to the top, but the bottom was multiplied by ${k}. Multiply the top too.`;
    if (x === a) return `${x} keeps the top the same, but the bottom got ${k} times bigger.`;
    return `${x}/${bot} is ${MTHW_cmpw(x, bot, a, b)} than ${a}/${b}, so they aren't equal.`;
  }
  if ((m = t.match(/^(\d+) over (\d+) equals (\d+) over what\?/))) {
    const a = +m[1], b = +m[2], top = +m[3], k = top / a, y = +pv; if (isNaN(y) || top * b === a * y) return null;
    if (Number.isInteger(k) && y === b + k) return `${y} adds ${k} to the bottom, but the top was multiplied by ${k}. Multiply the bottom too.`;
    return `${top}/${y} is ${MTHW_cmpw(top, y, a, b)} than ${a}/${b}, so they aren't equal.`;
  }
  if ((m = t.match(/^Which fraction is equal to (\d+) over (\d+)\?/))) {
    const a = +m[1], b = +m[2], f = MTHW_fr(picked); if (!f) return null; const c = MTHW_cmpw(f[0], f[1], a, b); if (c === "equal") return null;
    return `${f[0]}/${f[1]} is ${c} than ${a}/${b}, so it isn't the same amount.`;
  }
  if ((m = t.match(/^Write (\d+) over (\d+) in simplest form\./))) {
    const top = +m[1], bot = +m[2], f = MTHW_fr(picked); if (!f) return null; const [x, y] = f, c = MTHW_cmpw(x, y, top, bot); if (c === "equal") return null;
    if (x === top && bot % y === 0) return `${x}/${y} divides only the bottom. Divide the top and bottom by the same number.`;
    if (y === bot && top % x === 0) return `${x}/${y} divides only the top. Divide the top and bottom by the same number.`;
    return `${x}/${y} is ${c} than ${top}/${bot}, so it isn't the same amount.`;
  }
  if ((m = t.match(/^Are (\d+) over (\d+) and (\d+) over (\d+) equivalent\?/))) {
    const [a, b, x, y] = m.slice(1).map(Number), eqv = a * y === x * b;
    if (pv === "Yes" && !eqv) return `${x}/${y} is ${MTHW_cmpw(x, y, a, b)} than ${a}/${b}, so they are different amounts.`;
    if (pv === "No" && eqv) { const k = x / a; return Number.isInteger(k) && y === b * k ? `Divide ${x} and ${y} by ${k} and you get ${a}/${b}, so they are the same amount.` : null; }
    return null;
  }
  return null;
});

/* ---------------- 9 · Area ---------------- */
whyRule(9, "math", "area", (q, picked) => {
  const p = MTHW_int(picked), A = MTHW_int(q.ans); if (p == null || A == null || p === A) return null;
  let w, h, garden = false, m;
  if ((m = String(q.q).match(/^A garden is (\d+) m long and (\d+) m wide\./))) { w = +m[1]; h = +m[2]; garden = true; }
  else if ((m = String(q.vis).match(/aria-label="rectangle (\d+) by (\d+)"/))) { w = +m[1]; h = +m[2]; }
  else return null;
  if (w * h !== A) return null;
  const u = garden ? "square meters" : "square units";
  if (p === 2 * (w + h)) return `${p} is the perimeter, the distance around the edge. Area counts the squares inside.`;
  if (p === w + h) return `${p} is ${w} + ${h}. To find area, multiply the length by the width.`;
  if (p === w * (h + 1)) return garden ? `${p} square meters would be a garden ${w} m long and ${h + 1} m wide.` : `${p} would be the area of a ${w} by ${h + 1} rectangle.`;
  if (p === (w - 1) * h) return garden ? `${p} square meters would be a garden ${w - 1} m long and ${h} m wide.` : `${p} would be the area of a ${w - 1} by ${h} rectangle.`;
  return `${p} ${u} is ${Math.abs(p - A)} ${p > A ? "more" : "less"} than ${w} × ${h}.`;
});

/* ---------------- 9 · Angles ---------------- */
const MTHW_ATYPE = d => d < 90 ? "acute" : d === 90 ? "right" : d < 180 ? "obtuse" : d === 180 ? "straight" : null;
const MTHW_ARANGE = { acute: "less than 90°", right: "exactly 90°, a square corner", obtuse: "between 90° and 180°", straight: "exactly 180°, a straight line" };
const MTHW_ALOOK = { acute: "narrower than a square corner", right: "a square corner", obtuse: "wider than a square corner", straight: "a flat, straight line" };
const MTHW_svgDeg = h => { const ls = [...String(h).matchAll(/<line x1="115" y1="118" x2="([\d.-]+)" y2="([\d.-]+)"/g)]; if (ls.length < 2) return null; const l = ls[ls.length - 1]; return Math.round(Math.atan2(118 - +l[2], +l[1] - 115) * 180 / Math.PI / 5) * 5; };
const MTHW_degS = d => { const ty = MTHW_ATYPE(d); return ty ? `${d}° is ${MTHW_an(ty)} angle: ${MTHW_ARANGE[ty]}.` : d === 360 ? "360° is a full turn, all the way around." : null; };
const MTHW_AFACT = {
  "Two right angles put together make what kind of angle?": { acute: "An acute angle is less than 90°, smaller than even one right angle.", obtuse: "An obtuse angle is less than 180°, but two right angles make exactly 180°.", right: "One right angle is 90°. Two together make twice as much." },
  "How many right angles does a square have?": "A square has 4 corners, and every one is a square corner, so {p} is too few.",
  "How many right angles does a rectangle have?": "A rectangle has 4 corners, and every one is a square corner, so not {p}.",
  "Which capital letter has a right angle?": "{p} is made of curves, so it has no corners at all.",
  "What is the point where the two sides of an angle meet called?": { edge: "An edge is where two faces of a solid shape meet.", face: "A face is a flat side of a solid shape.", ray: "A ray is one of the straight sides of the angle, not the point where they meet." },
};
whyRule(9, "math", "angles", (q, picked) => {
  const t = MTHW_qt(q), qq = MTHW_q2(q), p = xPlain(picked);
  let m;
  if (MTHW_AFACT[qq] != null) { const f = MTHW_AFACT[qq]; return typeof f === "string" ? f.replace("{p}", p) : f[p] || null; }
  if (/class="vis-svg"[^>]*aria-label="an angle"/.test(picked)) { const d = MTHW_svgDeg(picked), ty = MTHW_ATYPE(d); return ty ? `That one is ${MTHW_an(ty)} angle: ${MTHW_ARANGE[ty]}.` : null; }
  const pd = p.match(/^(\d+)°$/);
  if (pd) return MTHW_degS(+pd[1]);
  if (!MTHW_ARANGE[p]) return null;
  const A = `${cap(MTHW_an(p))} angle is ${MTHW_ARANGE[p]}`;
  if ((m = t.match(/^An angle measures (\d+) degrees\./))) return `${A}, but ${m[1]}° is not.`;
  if ((m = t.match(/clock hands make at (\d+) o'clock\?/))) { const h = +m[1], d = Math.min(h, 12 - h) * 30; return `At ${h}:00 the hands make ${d}°, and ${A.charAt(0).toLowerCase() + A.slice(1)}.`; }
  if (/^What kind of angle is this\?/.test(t)) { const d = +((String(q.key).match(/(\d+)$/) || [])[1]), ty = MTHW_ATYPE(d); if (!ty || ty === p) return null; return `${A}, but this one is ${MTHW_ALOOK[ty]}.`; }
  if (/^What kind of angle is the corner of a sheet of paper\?/.test(t)) return `${A}, but paper corners are square corners.`;
  if (/^Half of a right angle is 45°/.test(t)) return `${A}, but 45° is less than 90°.`;
  if (/smaller than a right angle\?/.test(t)) return `${A}, so it is not smaller than a right angle.`;
  if (/bigger than a right angle but less than a straight angle\?/.test(t)) return `${A}.`;
  if (/^Which angle is the biggest\?/.test(t)) return `${A}, which is less than a straight angle's 180°.`;
  return null;
});

/* ---------------- 9 · Elapsed time ---------------- */
whyRule(9, "math", "elapsed", (q, picked) => {
  const t = MTHW_qt(q);
  let m;
  if ((m = t.match(/starts at (\d+:\d{2}) and lasts (.+)\. What time does it end\?/))) {
    const s = MTHW_mins(m[1]), d = MTHW_pdur(m[2]), pm = MTHW_mins(picked); if (s == null || d == null || pm == null) return null;
    const g = ((pm - s) % 720 + 720) % 720; if (g === d % 720) return null;
    if (d % 60 && g === Math.floor(d / 60) * 60 && g) return `${xPlain(picked)} adds only the ${MTHW_dur(g)} and forgets the ${d % 60} minutes.`;
    if (g === 0) return `${xPlain(picked)} is the start time, so no time has passed.`;
    if (g > 360) return `${xPlain(picked)} is before the start time of ${m[1]}.`;
    return `${xPlain(picked)} is ${g < d ? "only " : ""}${MTHW_dur(g)} after ${m[1]}, not ${m[2]}.`;
  }
  if ((m = t.match(/starts at (\d+:\d{2}) and ends at (\d+:\d{2})\. How long is it\?/))) {
    const s = MTHW_mins(m[1]), pd = MTHW_pdur(picked); if (s == null || pd == null) return null;
    const e = MTHW_fmt(s + pd); if (e === m[2]) return null;
    return `${m[1]} + ${xPlain(picked)} = ${e}, not ${m[2]}.`;
  }
  return null;
});

/* ---------------- 9 · Number patterns ---------------- */
const MTHW_apply = (r, x) => { const m = r.match(/^([+−×])(\d+)$/); if (!m) return null; const k = +m[2]; return m[1] === "+" ? x + k : m[1] === "−" ? x - k : x * k; };
whyRule(9, "math", "numpatterns", (q, picked) => {
  const seq = MTHW_cells(q.vis).filter(c => c !== "?").map(Number); if (seq.length < 2 || seq.some(isNaN)) return null;
  const t = MTHW_q2(q), p = xPlain(picked);
  if (/^What is the rule\?/.test(t)) {
    for (let i = 0; i + 1 < seq.length; i++) { const x = MTHW_apply(p, seq[i]); if (x == null) return null; if (x !== seq[i + 1]) return `With ${p}, ${seq[i]} would go to ${x}, but the next number is ${seq[i + 1]}.`; }
    return null;
  }
  if (/^What number comes next\?/.test(t)) {
    const pn = +p, last = seq[seq.length - 1], ans = +xPlain(q.ans); if (isNaN(pn) || pn === ans) return null;
    const d1 = seq[1] - seq[0], add = seq.every((v, i) => !i || v - seq[i - 1] === d1), r1 = seq[1] / seq[0], mul = !add && Number.isInteger(r1) && seq.every((v, i) => !i || v === seq[i - 1] * r1);
    const rule = add ? (d1 >= 0 ? `+${d1}` : `−${-d1}`) : mul ? `×${r1}` : null; if (!rule || MTHW_apply(rule, last) !== ans) return null;
    const g = pn - last;
    return `Going from ${last} to ${pn} is ${g >= 0 ? "+" + g : "−" + -g}, but each step is ${rule}.`;
  }
  return null;
});

/* ---------------- 9 · Mixed numbers ---------------- */
whyRule(9, "math", "mixednum", (q, picked) => {
  const t = MTHW_qt(q);
  let m;
  if ((m = t.match(/^Write (\d+) over (\d+) as a mixed number\./))) {
    const top = +m[1], d = +m[2], x = MTHW_mix(picked); if (!x) return null; const v = x[0] * x[2] + x[1];
    if (x[2] !== d) return null; if (v === top) return null;
    return `${x[0]} ${x[1]}/${x[2]} = ${v}/${d}, not ${top}/${d}.`;
  }
  if ((m = t.match(/^Write (\d+) and (\d+) over (\d+) as an improper fraction\./))) {
    const w = +m[1], n = +m[2], d = +m[3], f = MTHW_fr(picked); if (!f || f[1] !== d) return null; const x = f[0];
    if (x === w * d + n) return null;
    const pw = Math.floor(x / d), pr = x % d, as = pr ? `${pw} ${pr}/${d}` : `${pw}`;
    if (x < d) return `${x}/${d} is less than 1 whole, but ${w} ${n}/${d} is more than ${w}.`;
    return `${x}/${d} is ${as}, not ${w} ${n}/${d}.`;
  }
  return null;
});

/* ---------------- 9 · Volume ---------------- */
whyRule(9, "math", "volume", (q, picked) => {
  const p = MTHW_int(picked), V = MTHW_int(q.ans); if (p == null || V == null || p === V) return null;
  let l, w, h, cm = false, m;
  if ((m = String(q.q).match(/^A box is (\d+) cm long, (\d+) cm wide and (\d+) cm tall\./))) { [l, w, h] = [+m[1], +m[2], +m[3]]; cm = true; }
  else if ((m = String(q.vis).match(/aria-label="box (\d+) by (\d+) by (\d+) cubes"/))) [l, w, h] = [+m[1], +m[2], +m[3]];
  else return null;
  if (l * w * h !== V) return null;
  if (p === l + w + h) return `${p} is ${l} + ${w} + ${h}. Volume multiplies them: ${l} × ${w} × ${h}.`;
  if (cm && p === 2 * (l * w + w * h + l * h)) return `${p} is the surface area, the squares covering the outside, not the cubes that fill it.`;
  if (p === l * w && h > 1) return `${p} is just one layer of ${l} × ${w}. There are ${h} layers.`;
  return cm ? `${p} cubic cm is ${Math.abs(p - V)} ${p > V ? "more" : "less"} than ${l} × ${w} × ${h}.` : `${p} is ${Math.abs(p - V)} ${p > V ? "more" : "fewer"} cubes than fill this box.`;
});

/* ---------------- 7 · Measuring length (ruler) ---------------- */
whyRule(7, "math", "measure", (q, picked) => {
  const r = String(q.vis).match(/aria-label="ruler, object from (\d+) to (\d+) centimeters"/), n = (MTHW_qt(q).match(/^How long is the (\w+)\?/) || [])[1], p = MTHW_int(picked);
  if (!r || !n || p == null) return null;
  const s = +r[1], e = +r[2], len = e - s; if (p === len || MTHW_int(q.ans) !== len) return null;
  if (s > 0 && p === e) return `${e} is where the ${n} ends, but it starts at ${s}. Count from ${s} to ${e}.`;
  if (s > 0 && p === s) return `${s} is where the ${n} starts, not how long it is. Count from ${s} to ${e}.`;
  return `${/^(8|11|18)$|^8\d$/.test(String(p)) ? "An" : "A"} ${p} cm ${n} starting at ${s} would end at ${s + p}, but this one ends at ${e}.`;
});

/* Extra "why is this wrong" rules found in review. */
whyRule(9, "logic", "sudoku", (q, picked) => {
  const line = /column/.test(q.why) ? "column" : "row";
  return `${xPlain(picked)} is already in this ${line}. Each number can be used only once in a ${line}.`;
});
whyRule(8, "english", "past", (q, picked) => {
  const p = xPlain(picked), a = xPlain(q.ans);
  if (/(ing|s)$/.test(p) && !/(ing|s)$/.test(a)) return `${xQ(p)} is not past tense. The sentence tells about something that already happened.`;
  if (/ed$/.test(p) && !/ed$/.test(a)) return `${xQ(p)} isn't a real word. This verb changes in a special way for the past.`;
  if (/ed$/.test(p) && /ed$/.test(a)) return `${xQ(p)} isn't the right spelling of the past tense.`;
  return null;
});

