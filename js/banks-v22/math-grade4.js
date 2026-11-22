/* =====================================================================
   bank_v22_ma9.js — Age 9 (grade 4) Math. Tag MA9V_
   Part A: two new topics — addfrac (4.NF.3), roundbig (4.NBT.3)
   Part B: more questions for every existing age-9 math topic.
   Every new question carries q.v22 = {...} so the wrong-answer rules below
   only speak about questions they built (and return null otherwise).
   ===================================================================== */
const MA9V_FN = { 2: ["half", "halves"], 3: ["third", "thirds"], 4: ["fourth", "fourths"], 5: ["fifth", "fifths"], 6: ["sixth", "sixths"], 8: ["eighth", "eighths"], 10: ["tenth", "tenths"], 12: ["twelfth", "twelfths"] };
const MA9V_fw = (n, d) => `${n} ${n === 1 ? MA9V_FN[d][0] : MA9V_FN[d][1]}`;
const MA9V_pl = (n, one, many) => `${n} ${n === 1 ? one : (many || one + "s")}`;
const MA9V_an = s => (["8", "11", "18"].includes(String(s)) ? "an " : "a ") + s;
const MA9V_num = s => { const m = xPlain(s).replace(/,/g, "").match(/^-?\d+(\.\d+)?/); return m ? +m[0] : null; };
const MA9V_fr = s => { const m = xPlain(s).match(/^(\d+)\s*\/\s*(\d+)$/); return m ? [+m[1], +m[2]] : null; };
const MA9V_ORD = n => n + (n % 100 >= 11 && n % 100 <= 13 ? "th" : ["th", "st", "nd", "rd"][n % 10] || "th");
const MA9V_PLACES = ["ones", "tens", "hundreds", "thousands", "ten thousands", "hundred thousands"];
/* fraction options: answer [n,d] + candidate [x,y] pairs, never one equal in value to the answer */
function MA9V_fopts(an, ad, cands, fillDen) {
  const ok = ([x, y]) => x >= 1 && y >= 1 && x * ad !== an * y;
  return uniq(frac(an, ad), cands.filter(ok).map(([x, y]) => frac(x, y)), () => { const x = R(1, fillDen + 2); return ok([x, fillDen]) ? frac(x, fillDen) : null; });
}

/* =====================================================================
   PART A · NEW TOPIC 1 — Adding & Subtracting Fractions (4.NF.3)
   ===================================================================== */
const MA9V_FD = [3, 4, 5, 6, 8, 10, 12];
const MA9V_FADD = [
  [[6, 8, 10, 12], (n1, n2, A, B) => `${n1} ate ${A} of a pizza and ${n2} ate ${B} of it. How much of the pizza did they eat in all?`, "🍕"],
  [[4, 5, 8, 10], (n1, n2, A, B) => `${n1} walked ${A} of a mile to the park, then ${B} of a mile to the library. How far did ${n1} walk in all?`, "🚶"],
  [[3, 4, 5, 6, 8], (n1, n2, A, B) => `${n1} painted ${A} of a fence in the morning. ${n2} painted ${B} of it after lunch. How much of the fence is painted now?`, "🎨"],
  [[4, 6, 8, 10, 12], (n1, n2, A, B) => `${n1} read ${A} of a book on Monday and ${B} of it on Tuesday. How much of the book has ${n1} read?`, "📖"],
];
const MA9V_FSUB = [
  [[4, 6, 8, 10, 12], (n1, A, B) => `A ribbon is ${A} of a yard long. ${n1} cuts off ${B} of a yard. How much ribbon is left?`, "🎀"],
  [[4, 5, 8, 10], (n1, A, B) => `A trail is ${A} of a mile long. ${n1} has walked ${B} of a mile so far. How much farther is it to the end?`, "🥾"],
  [[3, 4, 6, 8], (n1, A, B) => `A pan holds ${A} of a cake. ${n1} serves ${B} of the cake to friends. How much of the cake is still in the pan?`, "🍰"],
  [[5, 6, 8, 10, 12], (n1, A, B) => `A jug is ${A} full of water. ${n1} pours out ${B} of the jug to water plants. How full is the jug now?`, "🫗"],
];
const MA9V_say = s => s.replace(/<span class="frac"><span>(\d+)<\/span><span>(\d+)<\/span><\/span>/g, (_, n, d) => MA9V_fw(+n, +d)).replace(/<[^>]+>/g, "");
topic(9, "math", {
  id: "addfrac", title: "Adding Fractions", icon: "➕", blurb: "Add and subtract fractions with the same bottom number.",
  lesson: [
    { t: "Same-size pieces", say: "When the bottom numbers match, the pieces are the same size. 2 eighths plus 3 eighths makes 5 eighths.", html: bar(8, 2, 280, 40, "#9B5DE5") + bar(8, 3, 280, 40, "#1FAF6E") + eq(`${frac(2, 8)} + ${frac(3, 8)} = ${frac(5, 8)}`) },
    { t: "The bottom stays the same", say: "Add only the top numbers. The bottom number tells the size of the pieces, and adding does not change the size.", html: eq(`${frac(2, 8)} + ${frac(3, 8)} = ${frac("2 + 3", 8)} = ${frac(5, 8)}`) + note(`Not ${frac(5, 16)}! The pieces are still <b>eighths</b>.`) },
    { t: "Taking away", say: "Subtracting works the same way. 7 tenths take away 4 tenths leaves 3 tenths.", html: bar(10, 7, 300, 40, "#3D7BFF") + eq(`${frac(7, 10)} − ${frac(4, 10)} = ${frac("7 − 4", 10)} = ${frac(3, 10)}`) },
  ],
  gen() {
    const k = R(0, 5), nm = shuffle(KIDS).slice(0, 2);
    if (k === 0 || k === 1) { /* add (plain or story) */
      const ctx = k === 1 ? pick(MA9V_FADD) : null, d = ctx ? pick(ctx[0]) : pick(MA9V_FD), a = R(1, d - 2), b = R(1, d - 1 - a), s = a + b;
      const opts = MA9V_fopts(s, d, [[s, 2 * d], [s + 1, d], [s - 1, d], [Math.abs(a - b), d], [s, d + 1]], d);
      const why = `Add the tops: ${a} + ${b} = ${s}. The pieces are still ${MA9V_FN[d][1]}, so the bottom stays ${d}.`;
      if (ctx) { const q = ctx[1](nm[0], nm[1], frac(a, d), frac(b, d)); return { q, say: MA9V_say(q), vis: bigEmo(ctx[2]), opts, ans: frac(s, d), big: 1, why, key: "wa" + MA9V_FADD.indexOf(ctx) + ":" + a + "/" + b + "/" + d, v22: { t: "add", a, b, d } }; }
      return { q: `What is ${frac(a, d)} + ${frac(b, d)}?`, say: `What is ${MA9V_fw(a, d)} plus ${MA9V_fw(b, d)}?`, vis: bar(d, a, 280, 40, "#9B5DE5") + bar(d, b, 280, 40, "#1FAF6E"), opts, ans: frac(s, d), big: 1, why, key: "a" + a + "/" + b + "/" + d, v22: { t: "add", a, b, d } };
    }
    if (k === 2 || k === 3) { /* subtract (plain or story) */
      const ctx = k === 3 ? pick(MA9V_FSUB) : null, d = ctx ? pick(ctx[0]) : pick(MA9V_FD), a = R(2, d - 1), b = R(1, a - 1), s = a - b;
      const opts = MA9V_fopts(s, d, [[a + b, d], [s + 1, d], [s - 1, d], [b, d], [s, 2 * d]], d);
      const why = `Take away the tops: ${a} − ${b} = ${s}. The pieces are still ${MA9V_FN[d][1]}, so the bottom stays ${d}.`;
      if (ctx) { const q = ctx[1](nm[0], frac(a, d), frac(b, d)); return { q, say: MA9V_say(q), vis: bigEmo(ctx[2]), opts, ans: frac(s, d), big: 1, why, key: "ws" + MA9V_FSUB.indexOf(ctx) + ":" + a + "/" + b + "/" + d, v22: { t: "sub", a, b, d, story: 1 } }; }
      return { q: `What is ${frac(a, d)} − ${frac(b, d)}?`, say: `What is ${MA9V_fw(a, d)} minus ${MA9V_fw(b, d)}?`, vis: bar(d, a, 280, 40, "#3D7BFF"), opts, ans: frac(s, d), big: 1, why, key: "s" + a + "/" + b + "/" + d, v22: { t: "sub", a, b, d } };
    }
    const d = pick(MA9V_FD), n = R(2, d - 1), x = R(1, n - 1);
    if (k === 4) { /* which sum makes n/d */
      const S = (p, q2, r) => `${frac(p, q2)} + ${frac(r, q2)}`, ans = S(x, d, n - x);
      const c = [S(x, d, n - x + 1), n - x - 1 >= 1 ? S(x, d, n - x - 1) : S(x + 1, d, n - x + 1), d % 2 === 0 ? S(x, d / 2, n - x) : S(x, d, n)];
      return { q: `Which sum is equal to ${frac(n, d)}?`, say: `Which sum is equal to ${MA9V_fw(n, d)}?`, vis: bar(d, n, 280, 40, "#9B5DE5"), opts: uniq(ans, c), ans, big: 1, why: `${x} + ${n - x} = ${n}, and the pieces are all ${MA9V_FN[d][1]}, so the sum is ${n}/${d}.`, key: "m" + n + "/" + d + ":" + x, v22: { t: "sum", n, d } };
    }
    const m = n - x;
    return { q: `What is the missing part? ${frac(n, d)} = ${frac(x, d)} + ${blank()}`, say: `${MA9V_fw(n, d)} equals ${MA9V_fw(x, d)} plus what?`, vis: bar(d, n, 280, 40, "#1FAF6E"), opts: MA9V_fopts(m, d, [[m + 1, d], [m - 1, d], [n, d], [n + x, d], [m, 2 * d]], d), ans: frac(m, d), big: 1, why: `${n} − ${x} = ${m}, so ${x}/${d} + ${m}/${d} = ${n}/${d}.`, key: "p" + n + "/" + d + ":" + x, v22: { t: "miss", n, x, d } };
  },
});
TRICK_ADD(9, "math", "addfrac", "Same bottom number? Add or subtract only the tops. The bottom number stays the same because the pieces don't change size.");
whyRule(9, "math", "addfrac", (q, picked) => {
  const v = q.v22; if (!v) return null;
  const P = xPlain(picked), F = MA9V_FN[v.d];
  if (v.t === "sum") {
    const m = P.match(/^(\d+)\/(\d+) \+ (\d+)\/(\d+)$/); if (!m) return null;
    const [p, a, r, b] = m.slice(1).map(Number); if (a !== b) return null;
    if (a === v.d) return p + r === v.n ? null : `${p}/${a} + ${r}/${a} = ${p + r}/${a}, not ${v.n}/${v.d}.`;
    return `${p}/${a} + ${r}/${a} makes ${p + r}/${a}. The bottoms don't add, so it isn't ${v.n}/${v.d}.`;
  }
  const f = MA9V_fr(picked); if (!f) return null; const [x, y] = f;
  if (v.t === "add") {
    if (y !== v.d) return x === v.a + v.b && y === 2 * v.d ? `${x}/${y} adds the bottoms too, but the pieces are still ${F[1]}, so the bottom stays ${v.d}.` : `${x}/${y} has ${y} on the bottom, but these pieces are ${F[1]}, so the bottom stays ${v.d}.`;
    if (x === v.a + v.b) return null;
    if (x === Math.abs(v.a - v.b)) return `${x}/${y} is what you get by taking away, but this one needs adding.`;
    return `${v.a} + ${v.b} is ${v.a + v.b}, not ${x}, so ${x}/${y} is too ${x > v.a + v.b ? "much" : "little"}.`;
  }
  if (v.t === "sub") {
    if (y !== v.d) return `${x}/${y} changes the bottom, but the pieces are still ${F[1]}, so the bottom stays ${v.d}.`;
    if (x === v.a - v.b) return null;
    if (x === v.a + v.b) return `${x}/${y} adds the fractions, but this one needs taking away.`;
    if (x === v.b) return `${x}/${y} is the part taken away, not the part that is left.`;
    return `${v.a} − ${v.b} is ${v.a - v.b}, not ${x}, so ${x}/${y} is too ${x > v.a - v.b ? "much" : "little"}.`;
  }
  if (v.t === "miss") {
    if (y !== v.d) return `${x}/${y} has a different bottom. The missing part must be in ${F[1]} too.`;
    if (x + v.x === v.n) return null;
    if (x === v.n) return `${x}/${y} is the whole amount. Adding it to ${v.x}/${v.d} would make ${v.n + v.x}/${v.d}.`;
    return `${v.x}/${v.d} + ${x}/${y} = ${v.x + x}/${v.d}, not ${v.n}/${v.d}.`;
  }
  return null;
});

/* =====================================================================
   PART A · NEW TOPIC 2 — Rounding Big Numbers (4.NBT.3)
   ===================================================================== */
const MA9V_UN = { 10: ["ten", "tens"], 100: ["hundred", "hundreds"], 1000: ["thousand", "thousands"], 10000: ["ten thousand", "ten thousands"], 100000: ["hundred thousand", "hundred thousands"], 1000000: ["million", "millions"] };
const MA9V_rnd = (n, u) => Math.floor((n + u / 2) / u) * u;
const MA9V_zeros = u => String(u).slice(1);
const MA9V_RCTX = [
  ["🏟️", (N, P) => `A stadium has <b>${N}</b> seats. What is that rounded to the nearest ${P}?`],
  ["🎡", (N, P) => `This year, <b>${N}</b> people visited the fair. Round that to the nearest ${P}.`],
  ["📚", (N, P) => `The city library has <b>${N}</b> books. What is that rounded to the nearest ${P}?`],
  ["🚚", (N, P) => `A delivery truck has driven <b>${N}</b> miles. Round that to the nearest ${P}.`],
  ["👟", (N, P) => `A walking club walked <b>${N}</b> steps this month. Round that to the nearest ${P}.`],
  ["🥫", (N, P) => `The school collected <b>${N}</b> cans for the food drive. Round that to the nearest ${P}.`],
  ["🐦", (N, P) => `Bird watchers counted <b>${N}</b> birds this year. What is that rounded to the nearest ${P}?`],
];
topic(9, "math", {
  id: "roundbig", title: "Rounding Big Numbers", icon: "📍", blurb: "Round to the nearest hundred, thousand or ten thousand.",
  lesson: [
    { t: "Find the two neighbors", say: "To round 4,682 to the nearest thousand, find the two thousands it sits between. 4,682 is between 4,000 and 5,000.", html: numberLine(4000, 5000, { step: 100, labelEvery: 500, mark: 4682, markLabel: "4,682", fmt: fmtN, pad: 40 }) },
    { t: "Look one place to the right", say: "Look at the digit just to the right of the rounding place. 5 or more rounds up. 4 or less rounds down. In 4,682 the hundreds digit is 6, so it rounds up to 5,000.", html: eq("4,<b>6</b>82 → 6 is 5 or more → <b>5,000</b>") + table([["0, 1, 2, 3, 4", "round down ⬇️"], ["5, 6, 7, 8, 9", "round up ⬆️"]], ["Digit to the right", "What to do"]) },
    { t: "Same rule, bigger places", say: "It works for ten thousands too. 73,500 has a 3 in the thousands place, so it rounds down to 70,000.", html: eq("7<b>3</b>,500 → 3 is 4 or less → <b>70,000</b>") + note("A rounded number ends in zeros.") },
  ],
  gen() {
    const k = R(0, 3);
    if (k <= 2 && k !== 1) {
      const u = pick([100, 1000, 1000, 10000, 10000, 100000]), lo0 = u === 100 ? 1001 : u + 1, hi0 = u === 100 ? 99999 : u === 100000 ? 949999 : 999999;
      let N = R(lo0, hi0); while (N % u === 0) N = R(lo0, hi0);
      const ans = MA9V_rnd(N, u), lo = Math.floor(N / u) * u, other = ans === lo ? lo + u : lo, dg = Math.floor(N / (u / 10)) % 10, P = MA9V_UN[u][0];
      const cands = [other, u >= 1000 ? MA9V_rnd(N, u / 10) : null, u * 10 <= 1000000 ? MA9V_rnd(N, u * 10) : null, ans + u, ans - u > 0 ? ans - u : null].filter(x => x != null && x > 0);
      const opts = uniq(fmtN(ans), cands.map(fmtN), () => { const x = ans + u * R(-3, 3); return x > 0 ? fmtN(x) : null; });
      const why = `The ${MA9V_UN[u / 10][0]}s digit is ${dg}. That is ${dg >= 5 ? "5 or more, so round up" : "4 or less, so round down"} to ${fmtN(ans)}.`;
      const v22 = { t: "r", N, u };
      if (k === 2) { const c = pick(MA9V_RCTX), q = c[1](fmtN(N), P); return { q, say: q.replace(/<[^>]+>/g, ""), vis: bigEmo(c[0]), opts, ans: fmtN(ans), big: 1, why, key: "c" + MA9V_RCTX.indexOf(c) + ":" + N + ":" + u, v22 }; }
      return { q: `Round <b>${fmtN(N)}</b> to the nearest <b>${P}</b>.`, say: `Round ${fmtN(N)} to the nearest ${P}.`, vis: numberLine(lo, lo + u, { step: u / 10, labelEvery: u / 2, mark: N, markLabel: fmtN(N), fmt: fmtN, pad: 46, fs: 13 }), opts, ans: fmtN(ans), big: 1, why, key: "r" + N + ":" + u, v22 };
    }
    /* which number rounds to T? */
    const u = pick([100, 1000, 10000]), T = u === 100 ? 100 * R(11, 99) : u * R(2, 99), h = u / 2;
    let N = T - h + 1 + R(0, u - 2); if (N === T) N = T + 1;
    const below = () => T - h - R(1, h), above = () => T + h + R(0, h - 1), ds = new Set();
    while (ds.size < 3) { const x = ds.size === 0 ? below() : ds.size === 1 ? above() : (Math.random() < 0.5 ? below() : above()); if (x > 0) ds.add(x); }
    const P = MA9V_UN[u][0], other = N < T ? T - u : T + u;
    return { q: `Which number rounds to <b>${fmtN(T)}</b> when rounded to the nearest ${P}?`, say: `Which number rounds to ${fmtN(T)} when rounded to the nearest ${P}?`, opts: shuffle([N, ...ds].map(fmtN)), ans: fmtN(N), big: 1, why: `${fmtN(N)} is closer to ${fmtN(T)} than to ${fmtN(other)}.`, key: "w" + T + ":" + u + ":" + N, v22: { t: "w", T, u } };
  },
});
TRICK_ADD(9, "math", "roundbig", "Underline the rounding place, then look at the digit just to its right: 5 or more, round up; 4 or less, round down. Everything after becomes zeros.");
whyRule(9, "math", "roundbig", (q, picked) => {
  const v = q.v22, p = MA9V_num(picked); if (!v || p == null) return null;
  const P = MA9V_UN[v.u][0];
  if (v.t === "w") { const r = MA9V_rnd(p, v.u); return r === v.T ? null : `${fmtN(p)} rounds to ${fmtN(r)}, not ${fmtN(v.T)}.`; }
  const ans = MA9V_rnd(v.N, v.u), N = v.N; if (p === ans) return null;
  if (v.u >= 1000 && p === MA9V_rnd(N, v.u / 10) && p % v.u) return `${fmtN(p)} is rounded to the nearest ${MA9V_UN[v.u / 10][0]}, not the nearest ${P}.`;
  if (p % v.u) return `${fmtN(p)} isn't a whole number of ${MA9V_UN[v.u][1]}. It should end in ${MA9V_zeros(v.u)}.`;
  const lo = Math.floor(N / v.u) * v.u;
  if (p === lo || p === lo + v.u) {
    if (N - lo === v.u / 2) return `${fmtN(N)} is exactly halfway, and halfway numbers round up, not down.`;
    return `${fmtN(N)} is ${fmtN(Math.abs(N - p))} away from ${fmtN(p)}, but only ${fmtN(Math.abs(N - ans))} away from ${fmtN(ans)}.`;
  }
  if (v.u * 10 <= 1000000 && p === MA9V_rnd(N, v.u * 10)) return `${fmtN(p)} is rounded to the nearest ${MA9V_UN[v.u * 10][0]}, not the nearest ${P}.`;
  return `${fmtN(p)} is not one of the two ${MA9V_UN[v.u][1]} next to ${fmtN(N)}: those are ${fmtN(lo)} and ${fmtN(lo + v.u)}.`;
});

/* =====================================================================
   PART B · more questions for every existing age-9 math topic
   ===================================================================== */

/* ---------- mult2: 3-digit × 1-digit, word problems, 2-digit × 2-digit ---------- */
const MA9V_MCTX = [
  ["🖍️", (a, b) => `A box holds ${a} crayons. How many crayons are in ${b} boxes?`],
  ["🚌", (a, b) => `Each bus carries ${a} students. How many students ride on ${b} buses?`],
  ["📕", (a, b) => `A book has ${a} pages. How many pages are in ${b} copies of the book?`],
  ["🌱", (a, b) => `A garden has ${b} rows with ${a} plants in each row. How many plants are there?`],
  ["⭐", (a, b) => `A sticker sheet has ${a} stickers. How many stickers are on ${b} sheets?`],
  ["🪑", (a, b) => `A hall has ${b} rows of chairs with ${a} chairs in each row. How many chairs is that?`],
];
addBank(9, "math", "mult2", 0.4, () => {
  const k = R(0, 3);
  if (k <= 1) {
    const a = R(102, 989), b = R(2, 9), p = a * b;
    const opts = numU(p, [p + b, p - b, p + 10, p - 10, p + 100], 20, 1);
    const pts = [a - a % 100, a % 100 - a % 10, a % 10].filter(x => x), why = `Break ${a} into ${pts.join(" + ")}. Multiply each part by ${b} and add: ${pts.map(x => x * b).join(" + ")} = ${p}.`;
    if (k === 1) { const c = pick(MA9V_MCTX), q = c[1](a, b); return { q, vis: bigEmo(c[0]), opts: numU(p, [a + b, p + b, p - b, p + 100], 20, 1), ans: String(p), big: 1, why, key: "w" + MA9V_MCTX.indexOf(c) + ":" + a + "x" + b, v22: { t: "m", a, b } }; }
    return { q: `What is ${a} × ${b}?`, vis: eq(`${a} × ${b} = ${blank()}`), opts, ans: String(p), big: 1, why, key: "t" + a + "x" + b, v22: { t: "m", a, b } };
  }
  if (k === 2) {
    const c = pick(MA9V_MCTX); let a = R(12, 99); while (a % 10 === 0) a = R(12, 99); const b = R(3, 9), p = a * b, q = c[1](a, b);
    return { q, vis: bigEmo(c[0]), opts: numU(p, [a + b, p + b, p - b, p + 10], 6, 1), ans: String(p), big: 1, why: `${a} × ${b}: ${a - a % 10} × ${b} = ${(a - a % 10) * b} and ${a % 10} × ${b} = ${(a % 10) * b}, so ${p}.`, key: "s" + MA9V_MCTX.indexOf(c) + ":" + a + "x" + b, v22: { t: "m", a, b } };
  }
  const a = R(11, 39), b = R(11, 19), bt = b - b % 10, bo = b % 10, p = a * b;
  return { q: `What is ${a} × ${b}?`, vis: eq(`${a} × ${b} = (${a} × ${bt}) + (${a} × ${bo})`), opts: numU(p, [a * bt, p + a, p - a, p + 10], 10, 1), ans: String(p), big: 1, why: `${a} × ${bt} = ${a * bt} and ${a} × ${bo} = ${a * bo}. ${a * bt} + ${a * bo} = ${p}.`, key: "d" + a + "x" + b, v22: { t: "m2", a, b } };
});
whyRule(9, "math", "mult2", (q, picked) => {
  const v = q.v22, p = MA9V_num(picked); if (!v || p == null) return null;
  const { a, b } = v, P = a * b; if (p === P) return null;
  if (v.t === "m2") {
    const bt = b - b % 10;
    if (p === a * bt) return `${p} is only ${a} × ${bt}. You still need to add ${a} × ${b % 10}.`;
    if (p === P + a || p === P - a) return `${p} is ${a} × ${p === P + a ? b + 1 : b - 1}, one ${p === P + a ? "too many" : "too few"} groups of ${a}.`;
  }
  if (p === a + b) return `${p} is ${a} + ${b}. Equal groups need multiplying, not adding.`;
  if (p === P + b || p === P - b) return `${p} is ${p === P + b ? a + 1 : a - 1} × ${b}, which is ${b} ${p === P + b ? "more" : "less"} than ${a} × ${b}.`;
  const d = Math.abs(p - P);
  if (d === 10 || d === 100) return `${p} is ${d} ${p > P ? "more" : "less"} than ${a} × ${b}. Check how you added the parts.`;
  return `${p} is ${d} ${p > P ? "more" : "less"} than ${a} × ${b}.`;
});

/* ---------- divrem: what to do with the remainder (4.OA.3) ---------- */
const MA9V_DCTX = [
  ["up", "🚗", (n, b) => `${n} students are going on a trip. Each car holds ${b} students. How many cars are needed so everyone gets a ride?`, "cars", "students"],
  ["up", "📚", (n, b) => `${n} books need to go on shelves. Each shelf holds ${b} books. How many shelves are needed for all the books?`, "shelves", "books"],
  ["up", "🛶", (n, b) => `${n} campers want to paddle. Each canoe holds ${b} campers. How many canoes are needed so every camper gets a seat?`, "canoes", "campers"],
  ["down", "💐", (n, b) => `There are ${n} flowers. Each vase holds ${b} flowers. How many vases can be filled all the way?`, "vases", "flowers"],
  ["down", "📿", (n, b) => `Each bracelet needs ${b} beads. Mia has ${n} beads. How many bracelets can she finish?`, "bracelets", "beads"],
  ["down", "🧺", (n, b) => `${n} apples are packed in baskets of ${b}. How many full baskets are there?`, "baskets", "apples"],
  ["left", "🍪", (n, b) => `${n} cookies are shared equally by ${b} friends. How many cookies are left over?`, "friends", "cookies"],
  ["left", "🃏", (n, b) => `${n} cards are dealt out equally to ${b} players. How many cards are left over?`, "players", "cards"],
  ["left", "🖍️", (n, b) => `${n} crayons go into packs of ${b}. How many crayons are left over?`, "packs", "crayons"],
];
addBank(9, "math", "divrem", 0.3, () => {
  const c = pick(MA9V_DCTX), [mode, e, f, grpW, itemW] = c, b = R(3, 9), qq = R(2, 12), r = R(1, b - 1), n = b * qq + r;
  const ans = mode === "up" ? qq + 1 : mode === "down" ? qq : r;
  const cands = mode === "left" ? [qq, b - r, r + 1, b] : [mode === "up" ? qq : qq + 1, r, b, qq + 2];
  const why = mode === "up" ? `${n} ÷ ${b} = ${qq} R ${r}. ${qq} ${grpW} hold ${qq * b}, so 1 more is needed for the last ${r}.` : mode === "down" ? `${n} ÷ ${b} = ${qq} R ${r}. Only ${qq} ${grpW} can be full; the ${r} left over aren't enough for another.` : `${n} ÷ ${b} = ${qq} R ${r}. The remainder, ${r}, is what is left over.`;
  return { q: f(n, b), vis: row(bigEmo(e), eq(`${n} ÷ ${b} = ${blank()}`)), opts: numU(ans, cands, 2, 1), ans: String(ans), big: 1, why, key: "i" + MA9V_DCTX.indexOf(c) + ":" + n + "/" + b, v22: { mode, n, b, q: qq, r, grpW, itemW } };
});
whyRule(9, "math", "divrem", (q, picked) => {
  const v = q.v22, p = MA9V_num(picked); if (!v || p == null) return null;
  const { mode, n, b, r, grpW, itemW } = v, Q = v.q;
  if (mode === "up") {
    if (p === Q + 1) return null;
    if (p === Q) return `With only ${Q} ${grpW}, ${MA9V_pl(r, itemW.replace(/s$/, ""), itemW)} would be left without a spot.`;
    if (p < Q) return `${p} ${grpW} hold only ${p * b}, not enough for all ${n}.`;
    if (p > Q + 1) return `${p - 1} ${grpW} already hold ${(p - 1) * b}, enough for all ${n}, so ${p} is more than needed.`;
  }
  if (mode === "down") {
    if (p === Q) return null;
    if (p === Q + 1) return `The last one would get only ${r}, not a full ${b}.`;
    if (p > Q + 1) return `${p} full ${grpW} would need ${p * b} ${itemW}, but there are only ${n}.`;
    return `${p} full ${grpW} use ${p * b} ${itemW}, and ${n - p * b} are left, enough for more.`;
  }
  if (mode === "left") {
    if (p === r) return null;
    if (p === Q && grpW !== "packs") return `${Q} is how many each one gets, not how many are left over.`;
    if (p === Q) return `${Q} is how many full packs there are, not how many are left over.`;
    if (p >= b) return `${p} is ${b} or more, so another group of ${b} could still be made.`;
    return `If ${p} were left over, ${n - p} would be shared out, but ${n - p} can't be split into groups of ${b}.`;
  }
  return null;
});

/* ---------- equivfrac: tenths & hundredths (4.NF.5), which is NOT equal ---------- */
const MA9V_EQB = [[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [4, 5], [1, 6], [5, 6]];
addBank(9, "math", "equivfrac", 0.35, () => {
  const k = R(0, 3);
  if (k === 0) { const a = R(1, 9), x = 10 * a; return { q: `Find the missing number: ${frac(a, 10)} = ${frac("?", 100)}`, say: `${a} over 10 equals what over 100?`, vis: bar(10, a, 300, 40, "#9B5DE5"), opts: numU(x, [a, x + 10, x - 10, a + 10, 100 - x].filter(y => y > 0 && y !== x), 5, 1), ans: String(x), big: 1, why: `Multiply the top and bottom by 10: ${a} × 10 = ${x} and 10 × 10 = 100.`, key: "th" + a, v22: { t: "h", a } }; }
  if (k === 1) { const a = R(1, 9), x = 10 * a; return { q: `Find the missing number: ${frac("?", 10)} = ${frac(x, 100)}`, say: `What over 10 equals ${x} over 100?`, vis: decGrid(x), opts: numU(a, [x, a + 1, a - 1, 10 - a, a * 100].filter(y => y > 0 && y !== a), 3, 1), ans: String(a), big: 1, why: `Divide the top and bottom by 10: ${x} ÷ 10 = ${a} and 100 ÷ 10 = 10.`, key: "tt" + a, v22: { t: "t", a } }; }
  const [a, b] = pick(MA9V_EQB), ms = shuffle([2, 3, 4, 5]).slice(0, 3), m = pick([2, 3, 4]);
  const bad = pick([[a * m + 1, b * m], [a * m, b * m + 1], [a + 1, b + 1], [a * m - 1 > 0 ? a * m - 1 : a * m + 2, b * m]]);
  const ans = frac(bad[0], bad[1]);
  return { q: `Which fraction is <b>not</b> equal to ${frac(a, b)}?`, say: `Which fraction is not equal to ${a} over ${b}?`, vis: bar(b, a, 280, 40, "#9B5DE5"), opts: shuffle([ans, ...ms.map(x => frac(a * x, b * x))]), ans, big: 1, why: `You can't multiply the top and bottom of ${a}/${b} by the same number to get ${bad[0]}/${bad[1]}, so ${bad[0]}/${bad[1]} is a different amount.`, key: "n" + a + "/" + b + ":" + bad.join("/") + ":" + ms.sort().join(), v22: { t: "not", a, b } };
});
whyRule(9, "math", "equivfrac", (q, picked) => {
  const v = q.v22; if (!v) return null;
  const cmp = (x, y, a, b) => x * b > a * y ? "bigger" : "smaller";
  if (v.t === "h") { const x = MA9V_num(picked); if (x == null || x === 10 * v.a) return null; return x % 10 === 0 ? `${x}/100 is the same as ${x / 10}/10, not ${v.a}/10.` : `${x}/100 is ${cmp(x, 100, v.a, 10)} than ${v.a}/10, so they aren't equal.`; }
  if (v.t === "t") { const x = MA9V_num(picked); if (x == null || x === v.a) return null; return `${x}/10 is the same as ${x * 10}/100, not ${10 * v.a}/100.`; }
  if (v.t === "not") {
    const f = MA9V_fr(picked); if (!f) return null; const [x, y] = f;
    if (x * v.b !== v.a * y) return null; const k = x / v.a;
    return Number.isInteger(k) && y === v.b * k ? `${x}/${y} is equal: ${v.a} × ${k} = ${x} and ${v.b} × ${k} = ${y}.` : `${x}/${y} is the same amount as ${v.a}/${v.b}.`;
  }
  return null;
});

/* ---------- decimals: fractions ↔ decimals (4.NF.6), compare hundredths ---------- */
const MA9V_h0 = t => /^\d+(\.\d{1,2})?$/.test(t) ? Math.round(parseFloat(t) * 100) : null;
const MA9V_hund = s => { const t = xPlain(s); if (!/^\d+(\.\d{1,2})?$/.test(t)) return null; return Math.round(parseFloat(t) * 100); };
addBank(9, "math", "decimals", 0.4, () => {
  const k = R(0, 3);
  if (k === 0) { const a = R(1, 9), ans = `0.${a}`; return { q: `Write ${frac(a, 10)} as a decimal.`, say: `Write ${a} tenths as a decimal.`, vis: bar(10, a, 300, 44, "#9B5DE5"), opts: shuffle([ans, `0.0${a}`, `${a}.0`, `1.${a}`]), ans, big: 1, why: `${a} tenths means ${a} in the tenths place: ${ans}.`, key: "ft" + a, v22: { t: "d", h: 10 * a } }; }
  let n = R(1, 99); while (n % 10 === 0) n = R(1, 99);
  const ans = `0.${pad2(n)}`;
  if (k === 1) { const c = [n < 10 ? `0.${n}` : `${Math.floor(n / 10)}.${n % 10}`, `0.${pad2(100 - n)}`, String(n), `0.${n % 10}${Math.floor(n / 10)}`]; return { q: `Write ${frac(n, 100)} as a decimal.`, say: `Write ${n} hundredths as a decimal.`, vis: decGrid(n), opts: uniq(ans, c.filter(x => MA9V_h0(x) !== n)), ans, big: 1, why: `${n} hundredths fills the tenths and hundredths places: ${ans}.`, key: "fh" + n, v22: { t: "d", h: n } }; }
  if (k === 2) { const c = [[n, 10], [100 - n, 100], [n, 1000], [n % 10 * 10 + Math.floor(n / 10), 100]]; return { q: `Write <b>${ans}</b> as a fraction.`, say: `Write ${ans} as a fraction.`, opts: MA9V_fopts(n, 100, c, 100), ans: frac(n, 100), big: 1, why: `${ans} is ${n} hundredths, so it is ${n} over 100.`, key: "df" + n, v22: { t: "f", h: n } }; }
  let m = R(1, 99); while (m % 10 === 0 || m === n) m = R(1, 99);
  if (Math.random() < 0.5 && n % 10 && Math.floor(n / 10) && n % 10 !== Math.floor(n / 10)) m = (n % 10) * 10 + Math.floor(n / 10);
  const A = `0.${pad2(n)}`, B = `0.${pad2(m)}`, big = Math.random() < 0.5, hi = n > m ? A : B, lo = n > m ? B : A;
  return { q: `Which is <b>${big ? "greater" : "less"}</b>?`, say: `Which is ${big ? "greater" : "less"}: ${A} or ${B}?`, opts: shuffle([A, B]), ans: big ? hi : lo, big: 1, why: `${hi} is ${Math.max(n, m)} hundredths and ${lo} is ${Math.min(n, m)} hundredths.`, key: "c" + [n, m].sort().join() + big, v22: { t: "c", big } };
});
whyRule(9, "math", "decimals", (q, picked) => {
  const v = q.v22; if (!v) return null;
  if (v.t === "f") { const f = MA9V_fr(picked); if (!f) return null; const [x, y] = f; if (x * 100 === v.h * y) return null; return x > y ? `${x}/${y} is more than 1 whole, but ${xPlain(q.q).match(/0\.\d+/)[0]} is less than 1.` : `${x}/${y} means ${x} ${y === 10 ? "tenths" : y === 100 ? "hundredths" : "thousandths"}, not ${v.h} hundredths.`; }
  const h = MA9V_hund(picked); if (h == null) return null;
  if (v.t === "d") { if (h === v.h) return null; const t = xPlain(picked); if (h >= 100) return `${t} is ${Math.floor(h / 100)} whole${h >= 200 ? "s" : ""} or more, but this fraction is less than 1.`; return `${t} is ${h} hundredths, not ${v.h} hundredths.`; }
  if (v.t === "c") { const o = q.opts.find(x => x !== picked), oh = MA9V_hund(o); if (oh == null) return null; return v.big ? (h < oh ? `${xPlain(picked)} is ${h} hundredths, less than ${oh} hundredths.` : null) : (h > oh ? `${xPlain(picked)} is ${h} hundredths, more than ${oh} hundredths.` : null); }
  return null;
});

/* ---------- area: missing side, which rectangle, compare ---------- */
addBank(9, "math", "area", 0.45, () => {
  const k = R(0, 2);
  if (k === 0) {
    const L = R(3, 12); let W = R(2, 9); while (W === L) W = R(2, 9); const A = L * W;
    return { q: `A rectangle has an area of ${A} square units. It is ${L} units long. How wide is it?`, vis: eq(`${L} × ${blank()} = ${A}`), opts: numU(W, [A - L, L, W + 1, W - 1, A / 2].filter(x => Number.isInteger(x) && x !== W), 3, 1).map(x => x + " units"), ans: W + " units", big: 1, why: `${L} × ${W} = ${A}, so the width is ${W} units.`, key: "s" + A + ":" + L, v22: { t: "side", L, A } };
  }
  if (k === 1) {
    const w = R(2, 9), h = R(2, 9), N = w * h, dims = shuffle([[w + 1, h], [w, h + 1], [w - 1, h + 1], [w + 2, h - 1], [w - 1, h]]).filter(([x, y]) => x * y !== N && x >= 1 && y >= 1);
    const S = ([x, y]) => `${x} by ${y}`;
    return { q: `Which rectangle has an area of <b>${N} square units</b>?`, say: `Which rectangle has an area of ${N} square units?`, opts: uniq(S([w, h]), dims.map(S)), ans: S([w, h]), big: 1, why: `${w} × ${h} = ${N} square units.`, key: "w" + N + ":" + w + "x" + h, v22: { t: "which" } };
  }
  let a, b, c, d; do { a = R(2, 9); b = R(2, 9); c = R(2, 9); d = R(2, 9); } while (a * b === c * d || (a === c && b === d) || (a === d && b === c));
  const big = Math.random() < 0.5, ansA = big ? a * b > c * d : a * b < c * d;
  return { q: `Rectangle A is ${a} by ${b}. Rectangle B is ${c} by ${d}. Which has the <b>${big ? "bigger" : "smaller"}</b> area?`, say: `Rectangle A is ${a} by ${b}. Rectangle B is ${c} by ${d}. Which has the ${big ? "bigger" : "smaller"} area?`, vis: row(col(rectDims(a, b, { grid: true }), "<b>A</b>"), col(rectDims(c, d, { grid: true }), "<b>B</b>")), opts: ["Rectangle A", "Rectangle B"], ans: ansA ? "Rectangle A" : "Rectangle B", big: 1, why: `A is ${a} × ${b} = ${a * b} and B is ${c} × ${d} = ${c * d} square units.`, key: "c" + a + "x" + b + ":" + c + "x" + d + big, v22: { t: "cmp", A: [a, b], B: [c, d], big } };
});
whyRule(9, "math", "area", (q, picked) => {
  const v = q.v22; if (!v) return null;
  if (v.t === "side") { const p = MA9V_num(picked); if (p == null || p * v.L === v.A) return null; if (p === v.A - v.L) return `${p} is ${v.A} − ${v.L}. Area comes from multiplying, so divide ${v.A} by ${v.L}.`; if (p === v.L) return `${p} units is the length. The width times ${v.L} has to make ${v.A}.`; return `${v.L} × ${p} = ${v.L * p}, not ${v.A}.`; }
  if (v.t === "which") { const m = xPlain(picked).match(/^(\d+) by (\d+)$/); if (!m) return null; const x = +m[1], y = +m[2], N = MA9V_num(xPlain(q.q).match(/area of (\d+)/)[1]); if (x * y === N) return null; return `${x} by ${y} has an area of ${x} × ${y} = ${x * y} square units.`; }
  if (v.t === "cmp") { const me = xPlain(picked) === "Rectangle A" ? v.A : v.B, ot = me === v.A ? v.B : v.A, ma = me[0] * me[1], oa = ot[0] * ot[1]; if (v.big ? ma > oa : ma < oa) return null; return `${xPlain(picked)} is ${me[0]} × ${me[1]} = ${ma} square units, ${ma < oa ? "less" : "more"} than ${oa}.`; }
  return null;
});

/* ---------- angles: adding angles and missing angles (4.MD.7) ---------- */
addBank(9, "math", "angles", 0.3, () => {
  const k = R(0, 2), D = x => x + "°";
  if (k === 0) {
    const x = 5 * R(2, 18), y = 5 * R(2, 18), s = x + y;
    return { q: `An angle is split into two parts: <b>${x}°</b> and <b>${y}°</b>. How big is the whole angle?`, say: `An angle is split into two parts: ${x} degrees and ${y} degrees. How big is the whole angle?`, opts: numU(s, [s + 10, s - 10, Math.abs(x - y), s + 5].filter(z => z > 0 && z !== s), 10, 5).map(D), ans: D(s), big: 1, why: `The parts join to make the whole: ${x}° + ${y}° = ${s}°.`, key: "j" + [x, y].sort().join(), v22: { t: "sum", x, y } };
  }
  const W = k === 1 ? 90 : 180, x = k === 1 ? 5 * R(1, 17) : 5 * R(2, 34), m = W - x;
  if (x * 2 === W) return null;
  const cands = k === 1 ? [180 - x, x, m + 10, m - 10] : [90 - x > 0 ? 90 - x : 360 - x, x, m + 10, m - 10];
  return { q: `A ${k === 1 ? "right" : "straight"} angle (${W}°) is split into two parts. One part is <b>${x}°</b>. How big is the other part?`, say: `A ${k === 1 ? "right" : "straight"} angle, ${W} degrees, is split into two parts. One part is ${x} degrees. How big is the other part?`, opts: numU(m, cands.filter(z => z > 0 && z !== m), 10, 5).map(D), ans: D(m), big: 1, why: `${W}° − ${x}° = ${m}°, and ${x}° + ${m}° = ${W}°.`, key: "m" + W + ":" + x, v22: { t: "miss", W, x } };
});
whyRule(9, "math", "angles", (q, picked) => {
  const v = q.v22, p = MA9V_num(picked); if (!v || p == null) return null;
  if (v.t === "sum") { const s = v.x + v.y; if (p === s) return null; if (p === Math.abs(v.x - v.y)) return `${p}° is the difference of the parts. The parts join, so add them.`; return `${v.x}° and ${v.y}° together make ${p > s ? "less" : "more"} than ${p}°.`; }
  if (v.t === "miss") {
    if (p + v.x === v.W) return null;
    if (p === v.x) return `${p}° is the part you already know, not the other part.`;
    if (v.W === 90 && p === 180 - v.x) return `${p}° would finish a straight angle, but a right angle is only 90°.`;
    if (v.W === 180 && p === 90 - v.x) return `${p}° would finish a right angle, but this is a straight angle, 180°.`;
    if (v.W === 180 && p === 360 - v.x) return `${p}° would finish a full turn, but this is a straight angle, 180°.`;
    return `${v.x}° + ${p}° = ${v.x + p}°, not ${v.W}°.`;
  }
  return null;
});

/* ---------- factors: prime & composite (4.OA.4), not a factor ---------- */
const MA9V_isP = n => n > 1 && range(2, Math.floor(Math.sqrt(n))).every(d => n % d);
const MA9V_sf = n => range(2, n - 1).find(d => n % d === 0);
const MA9V_ODDC = [9, 15, 21, 25, 27, 33, 35, 39, 45, 49, 51, 55, 57];
addBank(9, "math", "factors", 0.5, () => {
  const k = R(0, 2);
  if (k === 0) {
    const n = R(2, 60), pr = MA9V_isP(n), f = MA9V_sf(n);
    return { q: `Is <b>${n}</b> prime or composite?`, say: `Is ${n} prime or composite?`, vis: note("<b>prime</b>: only 2 factors (1 and itself) · <b>composite</b>: more than 2 factors"), opts: ["prime", "composite"], ans: pr ? "prime" : "composite", big: 1, why: pr ? `${n} has only two factors: 1 and ${n}.` : `${f} × ${n / f} = ${n}, so ${n} has more factors than just 1 and ${n}.`, key: "pc" + n, v22: { t: "pc", n } };
  }
  if (k === 1) {
    const p = pick(range(11, 59).filter(MA9V_isP)), c = shuffle(MA9V_ODDC).slice(0, 3);
    return { q: "Which number is <b>prime</b>?", say: "Which number is prime?", opts: shuffle([p, ...c]).map(String), ans: String(p), big: 1, why: `${p} can only be made as 1 × ${p}, so it is prime.`, key: "p" + p + ":" + c.sort().join(), v22: { t: "pr" } };
  }
  const n = pick([12, 16, 18, 20, 24, 28, 30, 32, 36, 40, 42, 45, 48, 54, 60]), fs = range(2, n - 1).filter(x => n % x === 0), nf = range(2, Math.min(n - 1, 15)).filter(x => n % x), a = pick(nf);
  return { q: `Which number is <b>not</b> a factor of ${n}?`, say: `Which number is not a factor of ${n}?`, opts: shuffle([a, ...shuffle(fs).slice(0, 3)]).map(String), ans: String(a), big: 1, why: `${n} ÷ ${a} leaves a remainder, so ${a} is not a factor of ${n}.`, key: "nf" + n + ":" + a, v22: { t: "nf", n } };
});
whyRule(9, "math", "factors", (q, picked) => {
  const v = q.v22; if (!v) return null;
  if (v.t === "pc") { const n = v.n, pr = MA9V_isP(n), f = MA9V_sf(n), p = xPlain(picked); if (p === "prime" && !pr) return `${n} = ${f} × ${n / f}, so it has factors besides 1 and ${n}.`; if (p === "composite" && pr) return `Only 1 × ${n} makes ${n}, so it has just two factors.`; return null; }
  const p = MA9V_num(picked); if (p == null) return null;
  if (v.t === "pr") { if (MA9V_isP(p)) return null; const f = MA9V_sf(p); return `${p} = ${f} × ${p / f}, so it is composite, not prime.`; }
  if (v.t === "nf") { if (v.n % p) return null; return `${p} × ${v.n / p} = ${v.n}, so ${p} is a factor of ${v.n}.`; }
  return null;
});

/* ---------- elapsed: find the start time, any-minute durations ---------- */
const MA9V_EV = ["The play", "A soccer game", "The bike ride", "Piano practice", "The science fair", "A family picnic", "The art class", "The baking class"];
const MA9V_tm = s => { const m = xPlain(s).match(/^(\d{1,2}):(\d{2})$/); return m ? (+m[1] % 12) * 60 + +m[2] : null; };
const MA9V_pdur = s => { const t = xPlain(s); if (!t || !/^(\d+ hours?)?\s*(\d+ minutes)?$/.test(t)) return null; const h = t.match(/(\d+) hours?/), m = t.match(/(\d+) minutes/); return (h ? +h[1] * 60 : 0) + (m ? +m[1] : 0); };
addBank(9, "math", "elapsed", 0.35, () => {
  if (Math.random() < 0.5) {
    const eh = R(2, 12), em = 5 * R(0, 11), end = eh * 60 + em, d = pick(DURS), start = end - d, ev = pick(MA9V_EV);
    return { q: `${ev} ended at <b>${fmtTime(end)}</b>. It lasted <b>${durText(d)}</b>. What time did it start?`, say: `${ev} ended at ${fmtTime(end)}. It lasted ${durText(d)}. What time did it start?`, vis: clock(eh, em, 150), opts: uniq(fmtTime(start), [fmtTime(end + d), fmtTime(start + 15), fmtTime(start - 15), fmtTime(start + 60), fmtTime(start - 60)]), ans: fmtTime(start), big: 1, why: `Count back ${durText(d)} from ${fmtTime(end)} to get ${fmtTime(start)}.`, key: "st" + MA9V_EV.indexOf(ev) + ":" + end + ":" + d, v22: { t: "start", end, d } };
  }
  const h = R(1, 10), m = 5 * R(0, 11), s = h * 60 + m, d = 5 * R(2, 35), e = s + d, who = pick(KIDS);
  const c = [d + 5, d - 5, d + 10, d - 10, d + 60, d - 60].filter(x => x > 0 && x !== d).map(durText);
  return { q: `${who} read from <b>${fmtTime(s)}</b> to <b>${fmtTime(e)}</b>. How long did ${who} read?`, say: `${who} read from ${fmtTime(s)} to ${fmtTime(e)}. How long did ${who} read?`, opts: uniq(durText(d), shuffle(c)), ans: durText(d), why: `From ${fmtTime(s)} to ${fmtTime(e)} is ${durText(d)}.`, key: "rd" + who + s + ":" + d, v22: { t: "dur", s, e } };
});
whyRule(9, "math", "elapsed", (q, picked) => {
  const v = q.v22; if (!v) return null;
  if (v.t === "start") {
    const pm = MA9V_tm(picked); if (pm == null) return null; const end = v.end % 720, g = ((end - pm) % 720 + 720) % 720; if (g === v.d) return null;
    const P = xPlain(picked), E = fmtTime(v.end);
    if (g > 360) return `${P} is after the end time of ${E}, but a start comes before the end.`;
    if (g === 0) return `${P} is the end time, not the start.`;
    return `From ${P} to ${E} is ${durText(g)}, not ${durText(v.d)}.`;
  }
  if (v.t === "dur") { const pd = MA9V_pdur(picked); if (pd == null || pd === v.e - v.s) return null; return `${fmtTime(v.s)} + ${xPlain(picked)} = ${fmtTime(v.s + pd)}, not ${fmtTime(v.e)}.`; }
  return null;
});

/* ---------- bignums: expanded form, number names, compare with symbols, 10,000 more ---------- */
const MA9V_ONES = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
const MA9V_TENS = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
const MA9V_w99 = n => n < 20 ? MA9V_ONES[n] : MA9V_TENS[Math.floor(n / 10)] + (n % 10 ? "-" + MA9V_ONES[n % 10] : "");
const MA9V_w999 = n => [Math.floor(n / 100) ? MA9V_ONES[Math.floor(n / 100)] + " hundred" : "", n % 100 ? MA9V_w99(n % 100) : ""].filter(Boolean).join(" ");
const MA9V_words = n => [Math.floor(n / 1000) ? MA9V_w999(Math.floor(n / 1000)) + " thousand" : "", n % 1000 ? MA9V_w999(n % 1000) : ""].filter(Boolean).join(", ");
const MA9V_six = () => { const d = [R(1, 9), ...range(1, 5).map(() => R(1, 9))]; shuffle([1, 2, 3, 4, 5]).slice(0, R(1, 2)).forEach(i => { d[i] = 0; }); return d; };
function MA9V_digOpts(d) {
  const n = +d.join(""), out = [];
  out.push(+d.filter(x => x).join(""));
  const i = R(0, 4), s = d.slice(); [s[i], s[i + 1]] = [s[i + 1], s[i]]; if (s[0]) out.push(+s.join(""));
  for (const p of shuffle([1, 2, 3, 4])) { const x = n + 10 ** p * (Math.floor(n / 10 ** p) % 10 < 9 ? 1 : -1); out.push(x); }
  const zi = d.findIndex((x, j) => j && !x); if (zi > 0) { const t = d.slice(); t[zi] = t[zi - 1]; t[zi - 1] = 0; if (t[0]) out.push(+t.join("")); }
  return uniq(fmtN(n), out.filter(x => x !== n && x > 0).map(fmtN));
}
addBank(9, "math", "bignums", 0.3, () => {
  const k = R(0, 3);
  if (k <= 1) {
    const d = MA9V_six(), n = +d.join("");
    if (k === 0) { const parts = d.map((x, i) => x * 10 ** (5 - i)).filter(x => x), ex = parts.map(fmtN).join(" + "); return { q: `Which number is <b>${ex}</b>?`, say: `Which number is ${parts.map(fmtN).join(" plus ")}?`, opts: MA9V_digOpts(d), ans: fmtN(n), big: 1, why: `Put each digit in its place, with 0 in any empty place: ${fmtN(n)}.`, key: "x" + n, v22: { t: "dig", n } }; }
    const w = MA9V_words(n); return { q: `Which number is <b>${w}</b>?`, say: `Which number is ${w}?`, opts: MA9V_digOpts(d), ans: fmtN(n), big: 1, why: `${cap(MA9V_w999(Math.floor(n / 1000)))} thousand is ${fmtN(Math.floor(n / 1000) * 1000)}${n % 1000 ? `, and ${n % 1000} more makes ${fmtN(n)}` : ""}.`, key: "wd" + n, v22: { t: "dig", n } };
  }
  if (k === 2) {
    const A = R(100000, 999999), p = R(0, 5), da = Math.floor(A / 10 ** p) % 10; let db = R(0, 9); while (db === da || (p === 5 && db === 0)) db = R(0, 9);
    const B = A + (db - da) * 10 ** p, ans = A > B ? ">" : "<";
    return { q: `Which symbol goes in the blank?`, say: `Which symbol goes between ${fmtN(A)} and ${fmtN(B)}?`, vis: eq(`${fmtN(A)} ${blank()} ${fmtN(B)}`), opts: [">", "<", "="], ans, big: 1, why: `Compare from the left. The first different digit is in the ${MA9V_PLACES[p]} place: ${da} is ${da > db ? "more" : "less"} than ${db}.`, key: "y" + A + ":" + B, v22: { t: "sym", A, B } };
  }
  const st = pick([100, 1000, 10000, 100000]), n = R(100000, 999999 - st), a = n + st;
  return { q: `What number is <b>${fmtN(st)} more</b> than ${fmtN(n)}?`, say: `What number is ${fmtN(st)} more than ${fmtN(n)}?`, opts: uniq(fmtN(a), shuffle([100, 1000, 10000, 100000].filter(x => x !== st && n + x < 1000000)).map(x => fmtN(n + x)).concat([fmtN(n + 10 * st)].filter(() => n + 10 * st < 1000000))), ans: fmtN(a), big: 1, why: `Add 1 to the ${MA9V_UN[st][1]} digit: ${fmtN(n)} + ${fmtN(st)} = ${fmtN(a)}.`, key: "mo" + n + ":" + st, v22: { t: "more", n, st } };
});
whyRule(9, "math", "bignums", (q, picked) => {
  const v = q.v22; if (!v) return null;
  if (v.t === "sym") {
    const p = xPlain(picked), A = fmtN(v.A), B = fmtN(v.B);
    if (p === "=") return `= means the same amount, but ${A} and ${B} are different numbers.`;
    if (p === ">" && v.A < v.B) return `> says the first number is bigger, but ${A} is less than ${B}.`;
    if (p === "<" && v.A > v.B) return `< says the first number is smaller, but ${A} is more than ${B}.`;
    return null;
  }
  const p = MA9V_num(picked); if (p == null) return null;
  if (v.t === "more") { if (p === v.n + v.st) return null; const d = p - v.n; return d > 0 ? `${fmtN(p)} is ${fmtN(d)} more than ${fmtN(v.n)}, not ${fmtN(v.st)} more.` : null; }
  if (v.t === "dig") {
    if (p === v.n) return null; const s1 = String(v.n), s2 = String(p);
    if (s2.length < s1.length) return `${fmtN(p)} has only ${s2.length} digits, but this number reaches the ${MA9V_PLACES[s1.length - 1]} place.`;
    if (s2.length !== s1.length) return null;
    const i = [...s1].findIndex((c, j) => c !== s2[j]), pl = MA9V_PLACES[s1.length - 1 - i];
    return `${fmtN(p)} has ${MA9V_an(s2[i])} in the ${pl} place, but the number needs ${MA9V_an(s1[i])} there.`;
  }
  return null;
});

/* ---------- numpatterns: missing term, the nth number ---------- */
addBank(9, "math", "numpatterns", 0.3, () => {
  if (Math.random() < 0.55) {
    const up = Math.random() < 0.6, K = pick([...range(3, 25), 25, 50, 100]), S = up ? R(1, 300) : R(5 * K, 5 * K + 300), seq = range(0, 4).map(i => S + (up ? i : -i) * K), mi = R(1, 3), ans = seq[mi], rule = (up ? "+" : "−") + K;
    return { q: "What number is missing?", vis: train(seq.map((x, i) => i === mi ? "?" : x)), opts: numU(ans, [ans + 1, ans - 1, seq[mi + 1], ans + (up ? 2 : -2) * K, ans + 10].filter(x => x !== ans), 5, 0), ans: String(ans), big: 1, why: `The rule is ${rule}: ${seq[mi - 1]} ${rule} = ${ans}.`, key: "g" + seq.join() + ":" + mi, v22: { t: "gap", seq, mi, rule } };
  }
  const S = R(1, 30), K = R(2, 12), pos = R(4, 6), ans = S + (pos - 1) * K;
  return { q: `A pattern starts at <b>${S}</b> and the rule is <b>add ${K}</b>. What is the <b>${MA9V_ORD(pos)}</b> number?`, say: `A pattern starts at ${S} and the rule is add ${K}. What is the ${MA9V_ORD(pos)} number?`, vis: train([S, "…"]), opts: numU(ans, [S + pos * K, S + (pos - 2) * K, pos * K, ans + 1].filter(x => x !== ans), 4, 1), ans: String(ans), big: 1, why: `${S} is the 1st number. Add ${K} ${pos - 1} times: ${S} + ${pos - 1} × ${K} = ${ans}.`, key: "n" + S + ":" + K + ":" + pos, v22: { t: "nth", S, K, pos } };
});
whyRule(9, "math", "numpatterns", (q, picked) => {
  const v = q.v22, p = MA9V_num(picked); if (!v || p == null) return null;
  if (v.t === "gap") {
    const { seq, mi, rule } = v; if (p === seq[mi]) return null;
    if (p === seq[mi + 1]) return `${p} is already in the pattern, right after the gap.`;
    if (p === seq[mi - 1]) return `${p} is the number just before the gap.`;
    const g = p - seq[mi - 1];
    return `Going from ${seq[mi - 1]} to ${p} is ${g >= 0 ? "+" + g : "−" + -g}, but each step is ${rule}.`;
  }
  if (v.t === "nth") {
    const { S, K, pos } = v; if (p === S + (pos - 1) * K) return null;
    if (p >= S && (p - S) % K === 0) return `${p} is the ${MA9V_ORD((p - S) / K + 1)} number in the pattern, not the ${MA9V_ORD(pos)}.${(p - S) / K + 1 === pos + 1 ? " The start counts as the 1st." : ""}`;
    return `${p} is not in this pattern, which goes ${S}, ${S + K}, ${S + 2 * K}, and so on.`;
  }
  return null;
});

/* ---------- convert: mixed units, which is more ---------- */
const MA9V_CV = CONV.filter(c => c[0] !== "dozen");
addBank(9, "math", "convert", 0.35, () => {
  const [big, small, n] = pick(MA9V_CV);
  if (Math.random() < 0.55) {
    const k = R(1, n >= 100 ? 5 : 6), r = n === 1000 ? 50 * R(1, 19) : n === 100 ? R(1, 99) : R(1, n - 1), ans = k * n + r, bw = k === 1 ? unit1(big) : big, sw = r === 1 ? unit1(small) : small;
    return { q: `<b>${k} ${bw} ${r} ${sw}</b> = how many ${small}?`, say: `${k} ${bw} and ${r} ${sw} equals how many ${small}?`, vis: note(`1 ${unit1(big)} = ${n} ${small}`), opts: numU(ans, [k * n, k + r, ans + n, ans - n, k * 10 + r].filter(x => x > 0 && x !== ans), n > 10 ? 5 : 2, 1), ans: String(ans), big: 1, why: `${k} × ${n} = ${k * n} ${small}, plus ${r} more makes ${ans}.`, key: "mx" + big + k + ":" + r, v22: { t: "mix", k, r, n, big, small } };
  }
  const k = R(2, n >= 100 ? 5 : 8); let m = k * n + pick([-1, 1]) * R(1, Math.max(1, Math.min(n - 1, 30))) * (n >= 100 ? 10 : 1); if (m <= 0) m = k * n + 1;
  const A = `${k} ${big}`, B = `${m} ${small}`, ans = k * n > m ? A : B;
  return { q: "Which is <b>more</b>?", say: `Which is more: ${A} or ${B}?`, vis: note(`1 ${unit1(big)} = ${n} ${small}`), opts: shuffle([A, B]), ans, big: 1, why: `${A} is ${k} × ${n} = ${k * n} ${small}, which is ${k * n > m ? "more" : "less"} than ${m} ${small}.`, key: "cm" + big + k + ":" + m, v22: { t: "cmp", k, m, n, big, small } };
});
whyRule(9, "math", "convert", (q, picked) => {
  const v = q.v22; if (!v) return null;
  if (v.t === "cmp") { const isA = xPlain(picked) === `${v.k} ${v.big}`, kn = v.k * v.n; if (isA ? kn > v.m : v.m > kn) return null; return isA ? `${v.k} ${v.big} is only ${kn} ${v.small}, less than ${v.m}.` : `${v.m} ${v.small} is less than ${v.k} ${v.big}, which is ${kn} ${v.small}.`; }
  const p = MA9V_num(picked); if (p == null) return null; const { k, r, n, big, small } = v, ans = k * n + r; if (p === ans) return null;
  if (p === k * n) return `${p} is just the ${k} ${k === 1 ? unit1(big) : big}. Add the ${r} extra ${small} too.`;
  if (p === k + r) return `${p} is ${k} + ${r}. Change the ${big} into ${small} first.`;
  if (p === ans + n || p === ans - n) return `${p} would be ${p > ans ? k + 1 : k - 1} ${big} and ${r} ${small}.`;
  if (p === k * 10 + r && n !== 10) return `${p} counts 10 ${small} in each ${unit1(big)}, but there are ${n}.`;
  return `${p} is ${Math.abs(p - ans)} ${p > ans ? "more" : "less"} than ${k} ${big} and ${r} ${small}.`;
});

/* ---------- fracof: word problems, bigger totals ---------- */
const MA9V_ITEMS = ["stickers", "marbles", "beads", "crayons", "shells", "trading cards", "stamps"];
addBank(9, "math", "fracof", 0.3, () => {
  const d = pick([2, 3, 4, 5, 6, 8, 10]), n = R(1, d - 1), k = R(0, 2);
  if (k === 0) { const g = R(9, 12), total = d * g, ans = n * g; return { q: `What is ${frac(n, d)} of <b>${total}</b>?`, say: `What is ${n} over ${d} of ${total}?`, opts: numU(ans, [g, total - ans, ans + g, ans - g].filter(x => x > 0 && x !== ans), 3, 1), ans: String(ans), big: 1, why: `${total} ÷ ${d} = ${g}, and ${g} × ${n} = ${ans}.`, key: "b" + n + "/" + d + ":" + total, v22: { t: "of", n, d, total, left: 0 } }; }
  const g = R(2, 10), total = d * g, part = n * g, who = pick(KIDS), it = pick(MA9V_ITEMS), left = k === 2, ans = left ? total - part : part;
  return { q: `${who} has ${total} ${it} and gives away ${frac(n, d)} of them. How many ${it} ${left ? `does ${who} have left` : `does ${who} give away`}?`, say: `${who} has ${total} ${it} and gives away ${n} over ${d} of them. How many ${it} ${left ? `does ${who} have left` : `does ${who} give away`}?`, opts: numU(ans, [g, left ? part : total - part, ans + g, total].filter(x => x > 0 && x !== ans), 3, 1), ans: String(ans), big: 1, why: left ? `${total} ÷ ${d} = ${g}, so ${n} × ${g} = ${part} are given away. ${total} − ${part} = ${ans} are left.` : `${total} ÷ ${d} = ${g}, and ${n} × ${g} = ${part}.`, key: "s" + (left ? "l" : "g") + who + it + n + "/" + d + ":" + total, v22: { t: "of", n, d, total, left: left ? 1 : 0, story: 1 } };
});
whyRule(9, "math", "fracof", (q, picked) => {
  const v = q.v22, p = MA9V_num(picked); if (!v || p == null) return null;
  const { n, d, total, left } = v, g = total / d, part = n * g, ans = left ? total - part : part; if (p === ans) return null;
  if (p === total) return `${p} is all of them. ${left ? "Some were given away" : "Only part of them is asked about"}.`;
  if (p === g && n > 1) return `${g} is just one ${d === 2 ? "half" : MA9V_FN[d] ? MA9V_FN[d][0] : "part"}. ${n} of those parts are needed.`;
  if (v.story && p === (left ? part : total - part)) return left ? `${p} is how many were given away, not how many are left.` : `${p} is how many are left, not how many were given away.`;
  if (!v.story && p === total - part) return `${p} is the other ${d - n}/${d} of ${total}, not ${n}/${d}.`;
  return `${p} is not ${left ? `${total} minus ${n}/${d} of ${total}` : `${n} equal parts of ${g}`}; it is ${Math.abs(p - ans)} ${p > ans ? "too many" : "too few"}.`;
});

/* ---------- mixednum: wholes into parts, between which wholes, compare ---------- */
const MA9V_MD = [2, 3, 4, 5, 6, 8, 10, 12];
addBank(9, "math", "mixednum", 0.4, () => {
  const k = R(0, 2), d = pick(MA9V_MD);
  if (k === 0) { const w = R(2, 6), ans = w * d; return { q: `How many <b>${MA9V_FN[d][1]}</b> are in <b>${w} wholes</b>?`, say: `How many ${MA9V_FN[d][1]} are in ${w} wholes?`, vis: row(...Array.from({ length: Math.min(w, 4) }, () => pie(d, d, 60, "#9B5DE5"))) + (w > 4 ? note(`…and ${w - 4} more`) : ""), opts: numU(ans, [w + d, d, ans + d, ans - d, ans + 1].filter(x => x > 0 && x !== ans), 3, 1), ans: String(ans), big: 1, why: `Each whole has ${d} ${MA9V_FN[d][1]}: ${w} × ${d} = ${ans}.`, key: "h" + w + ":" + d, v22: { t: "parts", w, d } }; }
  if (k === 1) {
    let top = R(d + 1, 5 * d); while (top % d === 0) top = R(d + 1, 5 * d);
    const w = Math.floor(top / d), S = a => `${a} and ${a + 1}`;
    return { q: `${frac(top, d)} is between which two whole numbers?`, say: `${top} over ${d} is between which two whole numbers?`, opts: uniq(S(w), [w - 1, w + 1, w + 2, w - 2].filter(x => x >= 0).map(S)), ans: S(w), big: 1, why: `${w} wholes is ${w * d}/${d} and ${w + 1} wholes is ${(w + 1) * d}/${d}. ${top}/${d} is in between.`, key: "b" + top + "/" + d, v22: { t: "btw", top, d } };
  }
  let a = R(1, 3), n1 = R(1, d - 1), b = R(1, 3), n2 = R(1, d - 1); if (a === b && d === 2) b = a + 1; let g = 0; while (a * d + n1 === b * d + n2 && g++ < 50) n2 = R(1, d - 1); if (a * d + n1 === b * d + n2) return null;
  const A = `${a} ${frac(n1, d)}`, B = `${b} ${frac(n2, d)}`, va = a * d + n1, vb = b * d + n2, big = Math.random() < 0.5, ans = (big ? va > vb : va < vb) ? A : B;
  if (A === B) return null;
  return { q: `Which is <b>${big ? "greater" : "less"}</b>?`, say: `Which is ${big ? "greater" : "less"}: ${a} and ${n1} over ${d}, or ${b} and ${n2} over ${d}?`, opts: shuffle([A, B]), ans, big: 1, why: a !== b ? `Compare the wholes first: ${Math.max(a, b)} is more than ${Math.min(a, b)}.` : `The wholes are the same, so compare the parts: ${Math.max(n1, n2)}/${d} is more than ${Math.min(n1, n2)}/${d}.`, key: "c" + [va, vb].sort().join() + ":" + d + big, v22: { t: "cmp", big } };
});
whyRule(9, "math", "mixednum", (q, picked) => {
  const v = q.v22; if (!v) return null;
  if (v.t === "parts") { const p = MA9V_num(picked); if (p == null || p === v.w * v.d) return null; const F = MA9V_FN[v.d][1]; if (p === v.w + v.d) return `${p} is ${v.w} + ${v.d}. Each whole has ${v.d} ${F}, so multiply.`; if (p === v.d) return `${v.d} ${F} make just 1 whole, not ${v.w}.`; return p % v.d === 0 ? `${p} ${F} make ${p / v.d} wholes, not ${v.w}.` : `${p} ${F} isn't a whole number of wholes.`; }
  if (v.t === "btw") { const m = xPlain(picked).match(/^(\d+) and (\d+)$/); if (!m) return null; const a = +m[1], b = +m[2], w = Math.floor(v.top / v.d); if (a === w) return null; return b <= w ? `${v.top}/${v.d} is more than ${b}, because ${b} whole${b === 1 ? "" : "s"} is only ${b * v.d}/${v.d}.` : `${v.top}/${v.d} is less than ${a}, because ${a} whole${a === 1 ? "" : "s"} is ${a * v.d}/${v.d}.`; }
  if (v.t === "cmp") {
    const mx = s => { const m = xPlain(s).match(/^(\d+) (\d+)\/(\d+)$/); return m ? [+m[1], +m[2], +m[3]] : null; };
    const p = mx(picked), o = mx(q.opts.find(x => x !== picked)); if (!p || !o) return null;
    const vp = p[0] * p[2] + p[1], vo = o[0] * o[2] + o[1]; if (v.big ? vp > vo : vp < vo) return null;
    const P = `${p[0]} ${p[1]}/${p[2]}`, O = `${o[0]} ${o[1]}/${o[2]}`;
    if (p[0] !== o[0]) return `${P} has ${p[0]} whole${p[0] > 1 ? "s" : ""}, ${p[0] < o[0] ? "fewer" : "more"} than the ${o[0]} in ${O}.`;
    return `Both have ${p[0]} whole${p[0] > 1 ? "s" : ""}, and ${p[1]}/${p[2]} is ${p[1] < o[1] ? "less" : "more"} than ${o[1]}/${o[2]}.`;
  }
  return null;
});

/* ---------- volume: missing height, layers, compare boxes ---------- */
addBank(9, "math", "volume", 0.35, () => {
  const k = R(0, 2);
  if (k === 0) { const l = R(2, 9), w = R(2, 6), h = R(2, 6), V = l * w * h; return { q: `A box has a volume of ${V} cubic cm. Its bottom is ${l} cm by ${w} cm. How tall is it?`, vis: eq(`${l} × ${w} × ${blank()} = ${V}`), opts: numU(h, [V - l * w, l * w, h + 1, h - 1, V / l].filter(x => Number.isInteger(x) && x > 0 && x !== h), 2, 1).map(x => x + " cm"), ans: h + " cm", big: 1, why: `One layer is ${l} × ${w} = ${l * w} cubes, and ${V} ÷ ${l * w} = ${h} layers tall.`, key: "h" + l + "x" + w + "x" + h, v22: { t: "h", l, w, V } }; }
  if (k === 1) { const L = R(4, 30), h = R(2, 6), V = L * h; return { q: `One layer of a box holds ${L} cubes. The box is ${h} layers tall. How many cubes fill the box?`, vis: `<span class="emo xxl">🧊</span>`, opts: numU(V, [L + h, L * (h + 1), L * (h - 1), V + 10].filter(x => x > 0 && x !== V), 4, 1), ans: String(V), big: 1, why: `${L} cubes in each layer × ${h} layers = ${V} cubes.`, key: "l" + L + "x" + h, v22: { t: "lay", L, h } }; }
  let a, b; do { a = [R(2, 5), R(1, 4), R(1, 4)]; b = [R(2, 5), R(1, 4), R(1, 4)]; } while (a[0] * a[1] * a[2] === b[0] * b[1] * b[2]);
  const va = a[0] * a[1] * a[2], vb = b[0] * b[1] * b[2], ans = va > vb ? "Box A" : "Box B";
  return { q: "Which box holds <b>more</b> cubes?", say: "Which box holds more cubes?", vis: row(col(cuboid(...a), `<b>A</b>: ${a.join(" × ")}`), col(cuboid(...b), `<b>B</b>: ${b.join(" × ")}`)), opts: ["Box A", "Box B"], ans, big: 1, why: `Box A holds ${a.join(" × ")} = ${va} cubes and Box B holds ${b.join(" × ")} = ${vb}.`, key: "c" + a.join("") + ":" + b.join(""), v22: { t: "cmp", va, vb } };
});
whyRule(9, "math", "volume", (q, picked) => {
  const v = q.v22; if (!v) return null;
  if (v.t === "cmp") { const isA = xPlain(picked) === "Box A", me = isA ? v.va : v.vb, ot = isA ? v.vb : v.va; return me > ot ? null : `${xPlain(picked)} holds only ${me} cubes, fewer than ${ot}.`; }
  const p = MA9V_num(picked); if (p == null) return null;
  if (v.t === "h") { const { l, w, V } = v; if (l * w * p === V) return null; if (p === V - l * w) return `${p} is ${V} − ${l * w}. Divide the volume by one layer, ${l * w}, instead.`; if (p === l * w) return `${p} is how many cubes are in one layer, not how many layers tall.`; return `${l} × ${w} × ${p} = ${l * w * p} cubic cm, not ${V}.`; }
  if (v.t === "lay") { const { L, h } = v; if (p === L * h) return null; if (p === L + h) return `${p} is ${L} + ${h}. Each layer has ${L} cubes, so multiply by ${h}.`; if (p % L === 0) return `${p} would be ${p / L} layers of ${L}, but the box has ${h} layers.`; return `${p} is ${Math.abs(p - L * h)} ${p > L * h ? "more" : "fewer"} cubes than ${h} layers of ${L}.`; }
  return null;
});

