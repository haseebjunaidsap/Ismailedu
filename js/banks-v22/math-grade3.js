/* =====================================================================
   v22 · Age 8 (grade 3) Math — tag MA8V_
   Part A: two new topics: add1000 (3.NBT.2) and fracline (3.NF.2)
   Part B: more questions for every existing age-8 math topic.
   Every new question carries q.v22 = { t: format, ... } and the why-rules
   below only speak for questions that carry it.
   ===================================================================== */
const MA8V_N = ["Mia", "Leo", "Ava", "Omar", "Zoe", "Ravi", "Lily", "Kai", "Nora", "Sam", "Priya", "Mateo", "Aisha", "Ben", "Hana", "Diego", "Grace", "Yusuf"];
const MA8V_who = () => pick(MA8V_N);
const MA8V_pl = (n, one, many) => `${n} ${n === 1 ? one : many}`;
const MA8V_mo = d => d > 0 ? "more" : "less";
const MA8V_r10 = n => Math.round(n / 10) * 10;
const MA8V_r100 = n => Math.round(n / 100) * 100;
const MA8V_hr = h => ((h - 1 + 120) % 12) + 1;
const MA8V_DENS = [2, 3, 4, 6, 8];
const MA8V_eqv = (a, b, c, d) => a * d === b * c;

/* ---------- regrouping helpers ---------- */
function MA8V_noCarry(a, b) { let r = 0, m = 1; while (a || b) { r += ((a % 10 + b % 10) % 10) * m; a = Math.floor(a / 10); b = Math.floor(b / 10); m *= 10; } return r; }
function MA8V_noBorrow(a, b) { let r = 0, m = 1; while (a || b) { r += Math.abs(a % 10 - b % 10) * m; a = Math.floor(a / 10); b = Math.floor(b / 10); m *= 10; } return r; }

/* ---------- fraction number line (SVG) ---------- */
function MA8V_line(d, W, o = {}) {
  const Wd = 340, pad = 30, y = o.pts || o.lab ? 60 : 46, H = y + 40, n = d * W, sx = i => pad + i * (Wd - 2 * pad) / n;
  let s = svgOpen(Wd, H, `number line from 0 to ${W}`);
  s += `<line x1="${pad - 12}" y1="${y}" x2="${Wd - pad + 12}" y2="${y}" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`;
  for (let i = 0; i <= n; i++) {
    const x = f1(sx(i)), whole = i % d === 0;
    s += `<line x1="${x}" y1="${y - (whole ? 12 : 8)}" x2="${x}" y2="${y + (whole ? 12 : 8)}" stroke="${INK}" stroke-width="${whole ? 3 : 2}"/>`;
    if (whole) s += `<text x="${x}" y="${y + 32}" text-anchor="middle" font-size="18" font-family="${FONT}" font-weight="700" fill="${INK}">${i / d}</text>`;
    if (o.lab && i > 0) s += `<text x="${x}" y="${y - 20}" text-anchor="middle" font-size="13" font-family="${FONT}" font-weight="600" fill="#3D7BFF">${i}/${d}</text>`;
  }
  if (o.dot != null) s += `<circle cx="${f1(sx(o.dot))}" cy="${y}" r="9" fill="#FF7A59" stroke="#fff" stroke-width="2.5"/>`;
  if (o.pts) for (const [i, L] of o.pts) s += `<circle cx="${f1(sx(i))}" cy="${y}" r="7" fill="#9B5DE5" stroke="#fff" stroke-width="2"/><text x="${f1(sx(i))}" y="${y - 18}" text-anchor="middle" font-size="17" font-family="${FONT}" font-weight="700" fill="#6A3CC0">${L}</text>`;
  return s + "</svg>";
}

/* =====================================================================
   PART A · NEW TOPIC 1 · Add & Subtract to 1,000
   ===================================================================== */
const MA8V_AS = [
  ["+", "📚", (w, a, b) => `The school library had ${a} books. It got ${b} new books. How many books does it have now?`],
  ["+", "🚗", (w, a, b) => `${w} counted ${a} cars on Monday and ${b} cars on Tuesday. How many cars is that in all?`],
  ["+", "📖", (w, a, b) => `${w} read ${a} pages in May and ${b} pages in June. How many pages is that in all?`],
  ["+", "🎟️", (w, a, b) => `The fair sold ${a} tickets in the morning and ${b} tickets in the afternoon. How many tickets in all?`],
  ["+", "🌱", (w, a, b) => `A garden club planted ${a} seeds last week and ${b} seeds this week. How many seeds in all?`],
  ["−", "🍎", (w, a, b) => `A farm stand had ${a} apples. It sold ${b} of them. How many apples are left?`],
  ["−", "🧩", (w, a, b) => `A puzzle has ${a} pieces. ${w} has put ${b} pieces in place. How many pieces are still left to place?`],
  ["−", "💺", (w, a, b) => `A theater has ${a} seats. ${b} seats are filled. How many seats are empty?`],
  ["−", "🦁", (w, a, b) => `The zoo had ${a} visitors on Saturday and ${b} visitors on Sunday. How many more visitors came on Saturday?`],
  ["−", "🎈", (w, a, b) => `A shop had ${a} balloons. It sold ${b} balloons. How many balloons are left?`],
];
function MA8V_addPair(regroup) {
  let a, b, g = 0;
  do { a = R(120, 780); b = Math.random() < 0.3 ? R(12, 99) : R(101, 999 - a); g++; } while (g < 40 && (a + b > 999 || (regroup && MA8V_noCarry(a, b) === a + b)));
  return [a, b];
}
function MA8V_subPair(regroup) {
  let a, b, g = 0;
  do { a = R(210, 999); b = Math.random() < 0.3 ? R(12, 99) : R(101, a - 20); g++; } while (g < 40 && (b >= a || (regroup && MA8V_noBorrow(a, b) === a - b)));
  return [a, b];
}
topic(8, "math", {
  id: "add1000", title: "Add & Subtract to 1,000", icon: "➕", blurb: "Regroup with hundreds, tens and ones.",
  lesson: [
    { t: "Line up the places", say: "To add big numbers, line up the hundreds, tens and ones. Add the ones first, then the tens, then the hundreds.", html: stack(254, 132, "+", { result: 386 }) + note("ones → tens → hundreds") },
    { t: "Regroup", say: "7 ones plus 5 ones is 12 ones. That is too many for one spot! Trade 10 ones for 1 ten. Write 2 and carry the 1 ten.", html: stack(347, 125, "+", { result: 472, carry: "1 " }) + eq("7 + 5 = 12 → 1 ten and 2 ones") },
    { t: "Subtract and check", say: "To subtract, trade 1 ten for 10 ones when you need more ones. Then check by adding. 472 minus 125 is 347, and 347 plus 125 is 472.", html: stack(472, 125, "−", { result: 347 }) + eq("347 + 125 = 472 ✔") },
  ],
  gen() {
    const k = R(0, 5), re = Math.random() < 0.75;
    if (k <= 1) {
      const [a, b] = MA8V_addPair(re), s = a + b, nc = MA8V_noCarry(a, b);
      return { q: `What is <b>${a} + ${b}</b>?`, say: `What is ${a} plus ${b}?`, vis: stack(a, b, "+"), opts: numU(s, [nc, s + 10, s - 10, s + 100, s - 100], 10, 0), ans: String(s), big: 1, why: `${a} + ${b} = ${s}. Check: ${s} − ${b} = ${a}.`, key: "a" + a + "+" + b, v22: { t: "as", op: "+", a, b } };
    }
    if (k <= 3) {
      const [a, b] = MA8V_subPair(re), d = a - b, nb = MA8V_noBorrow(a, b);
      return { q: `What is <b>${a} − ${b}</b>?`, say: `What is ${a} minus ${b}?`, vis: stack(a, b, "−"), opts: numU(d, [nb, d + 10, d - 10, d + 100, d - 100], 10, 0), ans: String(d), big: 1, why: `${a} − ${b} = ${d}. Check: ${d} + ${b} = ${a}.`, key: "s" + a + "-" + b, v22: { t: "as", op: "−", a, b } };
    }
    if (k === 4) {
      const [op, e, f] = pick(MA8V_AS), w = MA8V_who();
      if (op === "+") {
        const [a, b] = MA8V_addPair(re), s = a + b;
        return { q: f(w, a, b), vis: bigEmo(e), opts: numU(s, [Math.abs(a - b), MA8V_noCarry(a, b), s + 10, s - 10, s + 100], 10, 0), ans: String(s), big: 1, why: `Put the groups together: ${a} + ${b} = ${s}.`, key: "w" + e + a + "+" + b, v22: { t: "as", op, a, b, story: 1 } };
      }
      const [a, b] = MA8V_subPair(re), d = a - b;
      return { q: f(w, a, b), vis: bigEmo(e), opts: numU(d, [a + b, MA8V_noBorrow(a, b), d + 10, d - 10, d + 100], 10, 0), ans: String(d), big: 1, why: `Take away: ${a} − ${b} = ${d}.`, key: "w" + e + a + "-" + b, v22: { t: "as", op, a, b, story: 1 } };
    }
    if (Math.random() < 0.5) {
      const a = R(110, 650), b = R(101, 999 - a), s = a + b;
      return { q: "What number is missing?", say: `${a} plus what equals ${s}?`, vis: eq(`${a} + ${blank()} = ${s}`), opts: numU(b, [s, b + 10, b - 10, b + 100, b - 100], 10, 0), ans: String(b), big: 1, why: `${s} − ${a} = ${b}, so ${a} + ${b} = ${s}.`, key: "m" + a + "+" + s, v22: { t: "miss", op: "+", a, s } };
    }
    const b = R(101, 600), d = R(101, 999 - b), a = b + d;
    return { q: "What number is missing?", say: `What number minus ${b} equals ${d}?`, vis: eq(`${blank()} − ${b} = ${d}`), opts: numU(a, [Math.abs(d - b), a + 10, a - 10, a + 100, a - 100], 10, 0), ans: String(a), big: 1, why: `Add back: ${d} + ${b} = ${a}, so ${a} − ${b} = ${d}.`, key: "n" + b + "-" + d, v22: { t: "miss", op: "−", b, d } };
  },
});
TRICK_ADD(8, "math", "add1000", "Line up the places and start with the ones. 10 ones make a ten, 10 tens make a hundred. Check subtraction by adding back.");

whyRule(8, "math", "add1000", (q, picked) => {
  const x = q.v22, p = xNum(picked); if (!x || p == null || p === +q.ans) return null;
  if (x.t === "miss") {
    if (x.op === "+") return p === x.s ? `${p} is the total. The missing part is smaller than the total.` : `${x.a} + ${p} = ${x.a + p}, not ${x.s}.`;
    if (p < x.b) return `${p} is smaller than ${x.b}, so taking away ${x.b} can't leave ${x.d}.`;
    return `${p} − ${x.b} = ${p - x.b}, not ${x.d}.`;
  }
  const { op, a, b } = x, ans = op === "+" ? a + b : a - b, d = p - ans;
  if (op === "+" && p === MA8V_noCarry(a, b)) {
    const oa = a % 10, ob = b % 10, ta = Math.floor(a / 10) % 10, tb = Math.floor(b / 10) % 10;
    if (oa + ob >= 10) return `${p} forgets to regroup: ${oa} + ${ob} = ${oa + ob} ones, which makes 1 new ten.`;
    return `${p} forgets to regroup: ${ta} + ${tb} = ${ta + tb} tens, which makes 1 new hundred.`;
  }
  if (op === "−" && p === MA8V_noBorrow(a, b)) {
    const oa = a % 10, ob = b % 10, ta = Math.floor(a / 10) % 10, tb = Math.floor(b / 10) % 10;
    if (oa < ob) return `${p} takes the small digit from the big one. You can't take ${ob} ones from ${oa}, so trade 1 ten first.`;
    if (ta < tb) return `${p} takes the small digit from the big one. You can't take ${tb} tens from ${ta}, so trade 1 hundred first.`;
  }
  if (x.story && op === "+" && p === Math.abs(a - b)) return `${p} is what you get by subtracting, but this story puts two groups together.`;
  if (x.story && op === "−" && p === a + b) return `${p} is ${a} + ${b}, but this story needs taking away.`;
  if (Math.abs(d) === 10) return `${p} is 10 ${MA8V_mo(d)} than ${a} ${op} ${b}. Check the tens.`;
  if (Math.abs(d) === 100) return `${p} is 100 ${MA8V_mo(d)} than ${a} ${op} ${b}. Check the hundreds.`;
  return `${p} is ${Math.abs(d)} ${MA8V_mo(d)} than ${a} ${op} ${b}.`;
});

/* =====================================================================
   PART A · NEW TOPIC 2 · Fractions on a Number Line
   ===================================================================== */
topic(8, "math", {
  id: "fracline", title: "Fractions on a Number Line", icon: "📍", blurb: "Find fractions between 0 and 1, and past 1.",
  lesson: [
    { t: "A whole on a line", say: "The space from 0 to 1 on a number line is one whole. We can cut it into equal parts, just like a pizza.", html: MA8V_line(4, 1) + note("0 to 1 = <b>1 whole</b>, cut into 4 equal parts") },
    { t: "Count the jumps", say: "Each part here is one fourth. Start at 0 and count the jumps to the dot: 1, 2, 3. The dot is at three fourths.", html: MA8V_line(4, 1, { dot: 3 }) + eq(`3 jumps of ${frac(1, 4)} = ${frac(3, 4)}`) },
    { t: "Spaces, not marks", say: "Count the spaces between the marks, not the marks. 4 fourths take you all the way to 1, so 4 fourths equals 1 whole.", html: MA8V_line(4, 1, { lab: 1 }) + eq(`${frac(4, 4)} = 1`) },
  ],
  gen() {
    const k = R(0, 9), d = pick(MA8V_DENS);
    if (k <= 1) {
      const n = R(1, d - 1);
      return { q: "What fraction does the dot show?", say: "What fraction does the dot show on the number line?", vis: MA8V_line(d, 1, { dot: n }), opts: uniq(frac(n, d), [frac(n, d + 1), n + 1 <= d ? frac(n + 1, d) : null, n > 1 ? frac(n - 1, d) : null, n !== d ? frac(d, n) : null], () => frac(R(1, d), d)), ans: frac(n, d), big: 1, why: `From 0 to 1 there are ${d} equal parts. The dot is ${MA8V_pl(n, "jump", "jumps")} from 0, so it shows ${n}/${d}.`, key: "a" + n + "/" + d, v22: { t: "dot", d, n, W: 1 } };
    }
    if (k <= 3) {
      let n; do { n = R(1, 2 * d - 1); } while (n === d);
      return { q: "What fraction does the dot show?", say: "What fraction does the dot show on the number line?", vis: MA8V_line(d, 2, { dot: n }), opts: uniq(frac(n, d), [n > d ? frac(n - d, d) : frac(n, 2 * d), frac(n, d + 1), frac(n + 1, d), n > 1 ? frac(n - 1, d) : null], () => frac(R(1, 2 * d), d)), ans: frac(n, d), big: 1, why: `Each whole has ${d} equal parts. The dot is ${MA8V_pl(n, "jump", "jumps")} from 0, so it shows ${n}/${d}.`, key: "b" + n + "/" + d, v22: { t: "dot", d, n, W: 2 } };
    }
    if (k <= 6) {
      const W = d >= 6 ? 1 : 2, all = range(1, d * W - 1).filter(i => i % d), ps = shuffle(all).slice(0, 4).sort((x, y) => x - y), L = "ABCD".slice(0, ps.length).split("");
      const ti = R(0, ps.length - 1), n = ps[ti], pts = ps.map((p, i) => [p, L[i]]);
      return { q: `Which point shows ${frac(n, d)}?`, say: `Which point shows ${n} over ${d}?`, vis: MA8V_line(d, W, { pts }), opts: L.slice(), ans: L[ti], big: 1, why: `Count ${MA8V_pl(n, "jump", "jumps")} of ${frac(1, d)} from 0. Point ${L[ti]} is there.`, key: "c" + d + W + ps.join() + ti, v22: { t: "pts", d, n, pts } };
    }
    if (k === 7) {
      const W = Math.random() < 0.5 ? 1 : 2, at = W === 2 && Math.random() < 0.5 ? 2 : 1, n = at * d;
      return { q: `What fraction is at <b>${at}</b> on this number line?`, say: `What fraction is at ${at} on this number line?`, vis: MA8V_line(d, W), opts: uniq(frac(n, d), at === 1 ? [frac(1, d), frac(d - 1, d), frac(d + 1, d)] : [frac(2, d), frac(d, d), frac(2 * d - 1, d)]), ans: frac(n, d), big: 1, why: at === 1 ? `It takes all ${d} parts of ${frac(1, d)} to reach 1, so 1 = ${n}/${d}.` : `Each whole has ${d} parts, so 2 wholes have ${n} parts: 2 = ${n}/${d}.`, key: "w" + W + at + d, v22: { t: "whole", d, at } };
    }
    if (k === 8) {
      const W = Math.random() < 0.5 ? 1 : 2;
      return { q: "How many equal parts is each whole cut into on this number line?", vis: MA8V_line(d, W), opts: numU(d, [d + 1, d - 1, W === 2 ? 2 * d : d + 2], 2, 1), ans: String(d), big: 1, why: `Count the spaces from 0 to 1. There are ${d} equal parts.`, key: "p" + W + d, v22: { t: "parts", d, W } };
    }
    const n = R(1, d - 1);
    return { q: `The dot is at ${frac(n, d)}. How many more jumps of ${frac(1, d)} does it take to reach 1?`, say: `The dot is at ${n} over ${d}. How many more jumps of 1 over ${d} does it take to reach 1?`, vis: MA8V_line(d, 1, { dot: n }), opts: numU(d - n, [n, d, d - n + 1, d - n - 1], 2, 1), ans: String(d - n), big: 1, why: `1 is ${d}/${d}. From ${n}/${d}, it takes ${d} − ${n} = ${d - n} more ${d - n === 1 ? "jump" : "jumps"}.`, key: "j" + n + "/" + d, v22: { t: "jumps", d, n } };
  },
});
TRICK_ADD(8, "math", "fracline", "The bottom number is how many equal spaces fit between 0 and 1. Count jumps (spaces), not tick marks.");

whyRule(8, "math", "fracline", (q, picked) => {
  const x = q.v22; if (!x || picked === q.ans) return null;
  const { d } = x;
  if (x.t === "pts") { const pt = x.pts.find(p => p[1] === xPlain(picked)); return pt ? `Point ${pt[1]} is ${MA8V_pl(pt[0], "jump", "jumps")} from 0, so it shows ${pt[0]}/${d}, not ${x.n}/${d}.` : null; }
  if (x.t === "parts") {
    const p = xNum(picked); if (p == null) return null;
    if (p === d + 1) return `${p} counts the tick marks. Count the spaces between them instead.`;
    if (p === 2 * d) return `${p} is the parts in both wholes. Count only from 0 to 1.`;
    return `Count the spaces from 0 to 1: there are ${d}, not ${p}.`;
  }
  if (x.t === "jumps") {
    const p = xNum(picked); if (p == null) return null;
    if (p === x.n) return `${p} is the jumps from 0 to the dot. Count from the dot to 1.`;
    if (p === d) return `${d} jumps of 1/${d} go from 0 all the way to 1, not from the dot.`;
    return `${p} more jumps from ${x.n}/${d} would land on ${x.n + p}/${d}, not on 1.`;
  }
  const f = xFrac(picked); if (!f) return null;
  const [pn, pd] = f;
  if (x.t === "whole") {
    if (pd !== d) return null;
    return `${pn}/${d} is ${MA8V_pl(pn, "jump", "jumps")} from 0, so it is ${pn < x.at * d ? "before" : "past"} ${x.at}.`;
  }
  if (x.t === "dot") {
    if (pd === d + 1) return `${pn}/${pd} counts the tick marks. Count the spaces: each whole has ${d} parts.`;
    if (pn === d && pd === x.n) return `${pn}/${pd} has the numbers flipped. The bottom is the parts in one whole.`;
    if (pd === 2 * d) return `${pn}/${pd} cuts both wholes together. Each whole here has ${d} parts.`;
    if (pd === d && x.n > d && pn === x.n - d) return `${pn}/${pd} forgets the first whole. Count every jump from 0.`;
    if (pd === d) return `${pn}/${d} would be ${MA8V_pl(pn, "jump", "jumps")} from 0, but the dot is ${MA8V_pl(x.n, "jump", "jumps")} from 0.`;
    return `Each whole on this line has ${d} equal parts, not ${pd}.`;
  }
  return null;
});

/* =====================================================================
   PART B · more questions for existing topics
   ===================================================================== */

/* ---------- Multiplication ---------- */
const MA8V_GRP = [["🚲", n => `How many wheels are on ${n} bikes?`, 2, "bike", "bikes"], ["🚗", n => `How many wheels are on ${n} cars?`, 4, "car", "cars"], ["🐶", n => `How many legs do ${n} dogs have?`, 4, "dog", "dogs"],
  ["🕷️", n => `A spider has 8 legs. How many legs do ${n} spiders have?`, 8, "spider", "spiders"], ["🐙", n => `An octopus has 8 arms. How many arms do ${n} octopuses have?`, 8, "octopus", "octopuses"],
  ["🖐️", n => `How many fingers are on ${n} hands?`, 5, "hand", "hands"], ["🥚", n => `Each carton holds 6 eggs. How many eggs are in ${n} cartons?`, 6, "carton", "cartons"],
  ["🌼", n => `Each flower has 5 petals. How many petals are on ${n} flowers?`, 5, "flower", "flowers"], ["🍀", n => `Each clover has 3 leaves. How many leaves are on ${n} clovers?`, 3, "clover", "clovers"],
  ["🔺", n => `How many sides do ${n} triangles have in all?`, 3, "triangle", "triangles"], ["🧦", n => `How many socks are in ${n} pairs?`, 2, "pair", "pairs"],
  ["📅", n => `How many days are in ${n} weeks?`, 7, "week", "weeks"], ["🐞", n => `A ladybug has 6 legs. How many legs do ${n} ladybugs have?`, 6, "ladybug", "ladybugs"]];
addBank(8, "math", "mult", 0.26, () => {
  const k = R(0, 9);
  if (k <= 3) {
    const a = R(2, 9), t = 10 * R(2, 9), p = a * t, f = Math.random() < 0.5, ex = f ? `${a} × ${t}` : `${t} × ${a}`;
    return { q: `What is <b>${ex}</b>?`, say: `What is ${ex.replace("×", "times")}?`, vis: eq(`${ex} = ${blank()}`), opts: numU(p, [p / 10, p * 10, a + t, p + 10, p - 10], 10, 1), ans: String(p), big: 1, why: `${a} × ${t / 10} = ${p / 10}, so ${ex} = ${p} (${p / 10} tens).`, key: "x" + ex, v22: { t: "m10", a, b: t } };
  }
  if (k <= 6) {
    const [e, f, per, one, many] = pick(MA8V_GRP), n = R(2, 10), p = n * per;
    return { q: f(n), vis: bigEmo(e), opts: numU(p, [n + per, p + per, p - per, p + 1], 3, 1), ans: String(p), big: 1, why: `${n} groups of ${per}: ${n} × ${per} = ${p}.`, key: "g" + e + n, v22: { t: "grp", n, per, one, many } };
  }
  if (k <= 8) {
    let a, b; do { a = R(3, 9); b = R(3, 9); } while (a === b);
    const o = [`${b} × ${a}`, `${a} + ${b}`, `${a} × ${b + 1}`, `${a - 1} × ${b}`];
    return { q: `Which has the same answer as <b>${a} × ${b}</b>?`, say: `Which has the same answer as ${a} times ${b}?`, opts: shuffle(o), ans: o[0], big: 1, why: `Switching the order doesn't change the answer: ${b} × ${a} = ${a * b}, and ${a} × ${b} = ${a * b}.`, key: "c" + a + "," + b, v22: { t: "same", a, b } };
  }
  const n = R(2, 12), z = Math.random() < 0.5, f = Math.random() < 0.5, ex = z ? (f ? `${n} × 0` : `0 × ${n}`) : (f ? `${n} × 1` : `1 × ${n}`);
  return { q: `What is <b>${ex}</b>?`, say: `What is ${ex.replace("×", "times")}?`, vis: eq(`${ex} = ${blank()}`), opts: uniq(z ? 0 : n, z ? [n, 1, n + 1] : [1, 0, n + 1]), ans: String(z ? 0 : n), big: 1, why: z ? "Any number times 0 is 0." : `Any number times 1 stays the same, so ${ex} = ${n}.`, key: "z" + ex, v22: { t: "zero", n, z: z ? 1 : 0 } };
});
whyRule(8, "math", "mult", (q, picked) => {
  const x = q.v22; if (!x || picked === q.ans) return null;
  if (x.t === "same") {
    const m = xPlain(picked).match(/^(\d+) ([×+]) (\d+)$/); if (!m) return null;
    const v = m[2] === "×" ? +m[1] * +m[3] : +m[1] + +m[3];
    return `${m[1]} ${m[2]} ${m[3]} makes ${v}, but ${x.a} × ${x.b} makes ${x.a * x.b}.`;
  }
  const p = xNum(picked); if (p == null) return null;
  if (x.t === "m10") {
    const { a, b } = x;
    if (p === a * b / 10) return `${p} is ${a} × ${b / 10}. ${a} × ${b} is 10 times as much.`;
    if (p === a * b * 10) return `${p} is 10 times too big: ${a} × ${b} is ${a * b / 10} tens, not ${p / 10} tens.`;
    if (p === a + b) return `${p} is ${a} + ${b}. This needs multiplying.`;
    return `${p} is ${Math.abs(p - a * b)} ${MA8V_mo(p - a * b)} than ${a} × ${b}.`;
  }
  if (x.t === "grp") {
    const { n, per } = x;
    if (p === n + per) return `${p} is ${n} + ${per}. Each ${x.one} has ${per}, so multiply ${n} × ${per}.`;
    if (p % per === 0 && p / per > 0) return `${p} would be ${MA8V_pl(p / per, x.one, x.many)}, not ${n}.`;
    return `${p} is ${Math.abs(p - n * per)} ${MA8V_mo(p - n * per)} than ${n} × ${per}.`;
  }
  if (x.t === "zero") {
    if (x.z) return p === x.n ? `${x.n} × 0 means ${x.n} groups of nothing, so there is nothing at all.` : `Times 0 always makes 0, not ${p}.`;
    if (p === 1) return `${x.n} × 1 means ${x.n} groups of 1, which is more than 1.`;
    if (p === 0) return `Only times 0 makes 0. Times 1 keeps the number the same.`;
    return `Times 1 doesn't add anything, so the number can't change to ${p}.`;
  }
  return null;
});

/* ---------- Division ---------- */
const MA8V_DIVW = [["⚽", (n, k) => `${n} kids make teams of ${k}. How many teams are there?`], ["🧁", (n, k) => `${n} muffins go into boxes of ${k}. How many boxes are filled?`],
  ["🌟", (n, k) => `${n} stickers are shared equally on ${k} pages. How many stickers go on each page?`], ["🥕", (n, k) => `${n} carrots are tied in bunches of ${k}. How many bunches are there?`],
  ["🚣", (n, k) => `${n} campers ride in boats. Each boat holds ${k} campers. How many boats are needed?`], ["🖍️", (n, k, w) => `${w} puts ${n} crayons equally into ${k} cups. How many crayons go in each cup?`],
  ["🐠", (n, k) => `${n} fish swim equally in ${k} tanks. How many fish are in each tank?`]];
addBank(8, "math", "div", 0.5, () => {
  const k = R(2, 9), qq = R(2, 10), n = k * qq, f = R(0, 7);
  if (f <= 1) {
    const o = [`${k} × ${qq} = ${n}`, `${k} × ${qq + 1} = ${k * (qq + 1)}`, `${k} × ${qq - 1} = ${k * (qq - 1)}`, `${n} × ${k} = ${n * k}`];
    return { q: `Which multiplication fact helps you solve <b>${n} ÷ ${k}</b>?`, say: `Which multiplication fact helps you solve ${n} divided by ${k}?`, opts: shuffle(o), ans: o[0], why: `${k} × ${qq} = ${n}, so ${n} ÷ ${k} = ${qq}.`, key: "f" + n + "/" + k, v22: { t: "fact", n, k } };
  }
  if (f <= 3) return { q: "What number is missing?", say: `${n} divided by what equals ${qq}?`, vis: eq(`${n} ÷ ${blank()} = ${qq}`), opts: numU(k, [qq, k + 1, k - 1, n - qq], 2, 1), ans: String(k), big: 1, why: `${n} ÷ ${k} = ${qq}, because ${k} × ${qq} = ${n}.`, key: "d" + n + "/" + qq, v22: { t: "divisor", n, qq } };
  if (f <= 6) {
    const [e, fn] = pick(MA8V_DIVW);
    return { q: fn(n, k, MA8V_who()), vis: bigEmo(e), opts: numU(qq, [qq + 1, qq - 1, k, n - k], 2, 1), ans: String(qq), big: 1, why: `${n} ÷ ${k} = ${qq}, because ${qq} × ${k} = ${n}.`, key: "w" + e + n + "/" + k, v22: { t: "word", n, k } };
  }
  const m = R(2, 50), one = Math.random() < 0.5;
  if (one) return { q: `What is <b>${m} ÷ 1</b>?`, say: `What is ${m} divided by 1?`, vis: eq(`${m} ÷ 1 = ${blank()}`), opts: uniq(m, [1, 0, m + 1, m - 1]), ans: String(m), big: 1, why: `Sharing ${m} into 1 group puts all ${m} in that group.`, key: "o" + m, v22: { t: "one", m } };
  return { q: `What is <b>${m} ÷ ${m}</b>?`, say: `What is ${m} divided by ${m}?`, vis: eq(`${m} ÷ ${m} = ${blank()}`), opts: uniq(1, [0, m, 2]), ans: "1", big: 1, why: `Sharing ${m} things among ${m} friends gives each friend 1.`, key: "s" + m, v22: { t: "self", m } };
});
whyRule(8, "math", "div", (q, picked) => {
  const x = q.v22; if (!x || picked === q.ans) return null;
  if (x.t === "fact") { const m = xPlain(picked).match(/= (\d+)$/); return m ? `That fact makes ${m[1]}, not ${x.n}, so it doesn't help with ${x.n} ÷ ${x.k}.` : null; }
  const p = xNum(picked); if (p == null) return null;
  if (x.t === "divisor") return x.n % p === 0 ? `${x.n} ÷ ${p} = ${x.n / p}, not ${x.qq}.` : `${p} doesn't go into ${x.n} evenly.`;
  if (x.t === "word") return p === x.n - x.k ? `${p} only takes away ${x.k} once. Divide ${x.n} by ${x.k} instead.` : `${p} × ${x.k} = ${p * x.k}, not ${x.n}.`;
  if (x.t === "one") return p === 1 ? `${x.m} ÷ 1 puts all ${x.m} in one group, so the group has more than 1.` : p === 0 ? `Nothing is taken away when you share into 1 group, so it isn't 0.` : `Dividing by 1 keeps the number the same, so it can't be ${p}.`;
  if (x.t === "self") return p === 0 ? `Each friend gets some, so the answer isn't 0.` : p === x.m ? `${x.m} is how many there are to share, not how many each friend gets.` : `${x.m} ÷ ${x.m} means ${x.m} shared by ${x.m}, and each gets just 1, not ${p}.`;
  return null;
});

/* ---------- Fractions ---------- */
const MA8V_SETS = [["🍎", "🍏", "apples", "red"], ["🟦", "⬜", "squares", "blue"], ["🟢", "⚪", "dots", "green"], ["⭐", "⚫", "shapes", "stars"]];
addBank(8, "math", "fractions", 0.5, () => {
  const f = R(0, 7);
  if (f <= 3) {
    const d = R(2, 8), k = R(1, d - 1), si = R(0, MA8V_SETS.length - 1), [e1, e2, things, col] = MA8V_SETS[si], not = Math.random() < 0.35, top = not ? d - k : k;
    const vis = `<span class="grp">${Array.from({ length: d }, (_, i) => `<span>${i < k ? e1 : e2}</span>`).join("")}</span>`;
    const qText = si === 3 ? `What fraction of the shapes are ${not ? "<b>not</b> stars" : "stars"}?` : `What fraction of the ${things} are ${not ? `<b>not</b> ${col}` : col}?`;
    const cands = [[d - top, d], [top, d - top], [d, top], [top, d + 1], [top + 1, d]].filter(([a, b]) => a > 0 && b > 0 && !MA8V_eqv(a, b, top, d)).map(([a, b]) => frac(a, b));
    return { q: qText, say: qText.replace(/<[^>]+>/g, ""), vis, opts: uniq(frac(top, d), cands), ans: frac(top, d), big: 1, why: `${top} of the ${d} ${things} ${not ? `${top === 1 ? "is" : "are"} not ${si === 3 ? "stars" : col}` : `${top === 1 ? "is" : "are"} ${si === 3 ? "stars" : col}`}, so the fraction is ${top}/${d}.`, key: "s" + si + k + d + not, v22: { t: "set", d, top, things, what: si === 3 ? "stars" : col, not: not ? 1 : 0 } };
  }
  if (f <= 5) {
    const d = pick([2, 3, 4, 5, 6, 8]), k = R(1, d - 1), cands = [[d, k], [k, d + 1], [d - k, d], [k + 1, d], [k, d - 1]].filter(([a, b]) => a > 0 && b > 0 && !MA8V_eqv(a, b, k, d)).map(([a, b]) => frac(a, b));
    return { q: `Write <b>${fracWords(k, d)}</b> as a fraction.`, say: `Write ${fracWords(k, d)} as a fraction.`, opts: uniq(frac(k, d), cands), ans: frac(k, d), big: 1, why: `${cap(fracWords(k, d))} means ${k} of ${d} equal parts: ${k}/${d}.`, key: "w" + k + d, v22: { t: "words", k, d } };
  }
  if (f === 6) {
    const d = pick([2, 3, 4, 6, 8]), k = R(1, d - 1), bot = Math.random() < 0.5;
    const A = ["how many equal parts make the whole", "how many parts we are counting", "how big the whole is", "how many wholes there are"];
    const ans = bot ? A[0] : A[1];
    return { q: `In the fraction ${frac(k, d)}, what does the <b>${bot ? "bottom" : "top"}</b> number tell you?`, say: `In the fraction ${k} over ${d}, what does the ${bot ? "bottom" : "top"} number tell you?`, opts: shuffle(A.slice(0, 3)), ans, why: bot ? `The ${d} on the bottom says the whole is cut into ${d} equal parts.` : `The ${k} on top says we are counting ${MA8V_pl(k, "part", "parts")}.`, key: "n" + k + d + bot, v22: { t: "role", k, d, bot: bot ? 1 : 0 } };
  }
  const d = pick([2, 3, 4, 6, 8]), food = pick(["pizza", "pie", "cake", "sandwich", "pan of cornbread"]);
  return { q: `A ${food} is cut into ${d} equal pieces. What fraction of the ${food} is <b>one</b> piece?`, say: `A ${food} is cut into ${d} equal pieces. What fraction of the ${food} is one piece?`, vis: pie(d, 1, 140, "#FFC93C"), opts: uniq(frac(1, d), [frac(d, 1), frac(1, d + 1), d > 2 ? frac(1, d - 1) : frac(1, 4), frac(2, d)]), ans: frac(1, d), big: 1, why: `One of ${d} equal pieces is 1/${d}.`, key: "u" + d + food, v22: { t: "unit", d } };
});
whyRule(8, "math", "fractions", (q, picked) => {
  const x = q.v22; if (!x || picked === q.ans) return null;
  if (x.t === "role") {
    const p = xPlain(picked);
    if (/equal parts make/.test(p)) return `That is what the bottom number tells, not the top.`;
    if (/counting/.test(p)) return `That is what the top number tells, not the bottom.`;
    if (/how big/.test(p)) return `A fraction doesn't tell how big the whole is, only how it is cut and counted.`;
    return null;
  }
  const f = xFrac(picked); if (!f) return null;
  const [pn, pd] = f, P = `${pn}/${pd}`;
  if (x.t === "set") {
    const { d, top } = x;
    if (pd === d && pn === d - top) return `${P} counts the ${x.not ? "" : "other "}ones that ${x.not ? "are" : "are not"} ${x.what}.`;
    if (pn === top && pd === d - top) return `${P} compares the two groups. The bottom should be all ${d} ${x.things}.`;
    if (pn === d && pd === top) return `${P} has the numbers flipped. The bottom is how many ${x.things} in all.`;
    if (pd !== d) return `There are ${d} ${x.things} in all, so the bottom number is ${d}, not ${pd}.`;
    return `${P} would mean ${pn} of the ${d} ${x.things}, but ${top} are.`;
  }
  if (x.t === "words") {
    const { k, d } = x;
    if (pn === d && pd === k) return `${P} has the numbers flipped. The ${FNAME[d][1]} tell the bottom number.`;
    if (pd !== d) return `${cap(FNAME[d][1])} means ${d} equal parts, so the bottom should be ${d}, not ${pd}.`;
    return `${P} means ${fracWords(pn, d)}, not ${fracWords(k, d)}.`;
  }
  if (x.t === "unit") {
    const { d } = x;
    if (pd === 1) return `${P} has the numbers flipped. The bottom is the ${d} pieces.`;
    if (pn === 2) return `${P} is 2 pieces, but this asks for one piece.`;
    return `The ${d} equal pieces make the bottom number ${d}, not ${pd}.`;
  }
  return null;
});

/* ---------- Rounding ---------- */
const MA8V_RW = [["🏫", "A school has %n students."], ["🐔", "A farm has %n chickens."], ["📀", "The town library has %n movies."], ["🏟️", "%n people came to the game."], ["🫙", "A jar holds %n beads."], ["🌳", "A park has %n trees."], ["✉️", "The mail carrier brought %n letters this week."]];
addBank(8, "math", "rounding", 0.3, () => {
  const f = R(0, 5);
  if (f <= 2) {
    let n; do { n = R(101, 989); } while (n % 10 === 0);
    const lo = n - n % 10, ans = n % 10 >= 5 ? lo + 10 : lo, other = ans === lo ? lo + 10 : lo;
    return { q: `Round <b>${n}</b> to the nearest ten.`, say: `Round ${n} to the nearest ten.`, vis: numberLine(lo, lo + 10, { labelEvery: 5, mark: n }), opts: uniq(ans, [other, MA8V_r100(n) !== ans ? MA8V_r100(n) : null, n, ans + 10 !== other ? ans + 10 : ans - 10 !== other ? ans - 10 : null]), ans: String(ans), big: 1, why: n % 10 >= 5 ? `The ones digit is ${n % 10}. That is 5 or more, so round up to ${ans}.` : `The ones digit is ${n % 10}. That is less than 5, so round down to ${ans}.`, key: "T" + n, v22: { t: "r10", n } };
  }
  if (f <= 4) {
    const t = 10 * R(2, 98); let a; do { a = R(t - 5, t + 4); } while (a === t);
    const up = shuffle(range(t + 5, t + 9)), dn = shuffle(range(t - 9, t - 6)), o = [String(a), String(up[0]), String(dn[0]), String(Math.random() < 0.5 ? up[1] : dn[1])];
    return { q: `Which number rounds to <b>${t}</b> when you round to the nearest ten?`, say: `Which number rounds to ${t} when you round to the nearest ten?`, opts: shuffle(o), ans: String(a), big: 1, why: `${a} is between ${t - 5} and ${t + 4}, so it rounds to ${t}.`, key: "w" + t + "_" + a, v22: { t: "which", t10: t } };
  }
  const [e, s] = pick(MA8V_RW); let n; do { n = R(112, 987); } while (n % 10 === 0 || n % 100 === 50);
  const ans = MA8V_r100(n), lo = n - n % 100, other = ans === lo ? lo + 100 : lo;
  return { q: `${s.replace("%n", n)} About how many is that, rounded to the nearest hundred?`, vis: bigEmo(e), opts: uniq(ans, [other, MA8V_r10(n) !== ans ? MA8V_r10(n) : null, ans === lo ? lo - 100 : lo + 200, n].filter(v => v !== 0)), ans: String(ans), big: 1, why: `The tens digit of ${n} is ${Math.floor(n / 10) % 10}, so ${n} rounds ${ans > n ? "up" : "down"} to ${ans}.`, key: "h" + e + n, v22: { t: "r100", n } };
});
whyRule(8, "math", "rounding", (q, picked) => {
  const x = q.v22, p = xNum(picked); if (!x || p == null || String(p) === q.ans) return null;
  if (x.t === "which") return `${p} rounds to ${MA8V_r10(p)}, not ${x.t10}.`;
  const n = x.n, ans = +q.ans;
  if (p === n) return `${p} is the number itself. Rounding changes it to a nearby ${x.t === "r10" ? "ten" : "hundred"}.`;
  if (x.t === "r100" && p === MA8V_r10(n)) return `${p} is ${n} rounded to the nearest ten, not the nearest hundred.`;
  if (x.t === "r10" && p % 100 === 0 && p === MA8V_r100(n)) return `${p} is ${n} rounded to the nearest hundred, not the nearest ten.`;
  if (x.t === "r10" && n % 10 === 5 && Math.abs(p - n) === 5) return `${n} ends in 5, and 5 rounds up, so it goes to ${ans}, not down.`;
  return `${n} is closer to ${ans} than to ${p}.`;
});

/* ---------- Perimeter ---------- */
const MA8V_PCTX = [["🌻", "garden", "m"], ["🐐", "goat pen", "m"], ["🧸", "play mat", "ft"], ["🏞️", "pond fence", "m"], ["🪁", "kite", "in"], ["🖼️", "art frame", "in"]];
const MA8V_PN = { 3: "triangle", 4: "four-sided shape", 5: "pentagon", 6: "hexagon" };
function MA8V_sides(n, lo, hi) { let s; do { s = Array.from({ length: n }, () => R(lo, hi)); } while (Math.max(...s) * 2 >= s.reduce((a, b) => a + b, 0)); return s; }
const MA8V_list = (a, u) => a.length === 1 ? `${a[0]} ${u}` : a.slice(0, -1).map(v => `${v} ${u}`).join(", ") + ` and ${a[a.length - 1]} ${u}`;
addBank(8, "math", "perimeter", 0.3, () => {
  const f = R(0, 7);
  if (f <= 1) {
    const n = R(3, 6), [e, thing, u] = pick(MA8V_PCTX), s = MA8V_sides(n, 2, 12), P = s.reduce((a, b) => a + b, 0);
    return { q: `A ${thing} has ${n} sides. They are ${MA8V_list(s, u)} long. What is its perimeter?`, vis: bigEmo(e), opts: numU(P, [P - s[n - 1], P + s[0], P + 1, P - 2], 3, 1).map(v => v + " " + u), ans: P + " " + u, big: 1, why: `Add all ${n} sides: ${s.join(" + ")} = ${P} ${u}.`, key: "l" + thing + s.join(), v22: { t: "list", s, u } };
  }
  if (f <= 3) {
    const n = R(3, 6), s = MA8V_sides(n, 2, 12), P = s.reduce((a, b) => a + b, 0), known = s.slice(0, -1), K = P - s[n - 1], ans = s[n - 1];
    return { q: `A ${MA8V_PN[n]} has a perimeter of ${P} cm. ${n === 3 ? "Two" : n - 1} of its sides are ${MA8V_list(known, "cm")}. How long is the last side?`, vis: eq(`${known.join(" + ")} + ${blank()} = ${P}`), opts: numU(ans, [K, P, ans + 1, ans - 1, ans + 2], 2, 1).map(v => v + " cm"), ans: ans + " cm", big: 1, why: `The known sides add to ${K} cm. ${P} − ${K} = ${ans} cm.`, key: "m" + n + s.join(), v22: { t: "miss", P, K, u: "cm" } };
  }
  if (f <= 5) {
    const u = pick(["cm", "m", "in", "ft"]), s = R(2, 15), P = 4 * s;
    return { q: `A square has a perimeter of ${P} ${u}. How long is each side?`, vis: shape("square", pick(SHAPE_COLS), 110), opts: numU(s, [P / 2, P - 4, 2 * s, s + 1, s - 1], 2, 1).map(v => v + " " + u), ans: s + " " + u, big: 1, why: `A square has 4 equal sides: ${P} ÷ 4 = ${s} ${u}.`, key: "q" + P + u, v22: { t: "sq", P, u } };
  }
  let L1, W1, L2, W2;
  do { L1 = R(3, 12); W1 = R(2, L1 - 1); L2 = R(3, 12); W2 = R(2, L2 - 1); } while (L1 + W1 === L2 + W2 || (L1 === L2 && W1 === W2));
  const P1 = 2 * (L1 + W1), P2 = 2 * (L2 + W2), big = Math.random() < 0.5, A = (big ? P1 > P2 : P1 < P2);
  return { q: `Rectangle A is ${L1} cm long and ${W1} cm wide. Rectangle B is ${L2} cm long and ${W2} cm wide. Which has the <b>${big ? "greater" : "smaller"}</b> perimeter?`, opts: ["Rectangle A", "Rectangle B"], ans: A ? "Rectangle A" : "Rectangle B", big: 1, why: `A: ${L1} + ${W1} + ${L1} + ${W1} = ${P1} cm. B: ${L2} + ${W2} + ${L2} + ${W2} = ${P2} cm.`, key: "c" + [L1, W1, L2, W2].join() + big, v22: { t: "cmp", P1, P2, big: big ? 1 : 0 } };
});
whyRule(8, "math", "perimeter", (q, picked) => {
  const x = q.v22; if (!x || picked === q.ans) return null;
  if (x.t === "cmp") {
    const isA = /A$/.test(xPlain(picked)), mine = isA ? x.P1 : x.P2, theirs = isA ? x.P2 : x.P1, me = isA ? "A" : "B", them = isA ? "B" : "A";
    return `Rectangle ${me} has a perimeter of ${mine} cm, which is ${mine < theirs ? "less" : "more"} than ${them}'s ${theirs} cm.`;
  }
  const p = xNum(picked); if (p == null) return null;
  const u = x.u;
  if (x.t === "list") {
    const P = x.s.reduce((a, b) => a + b, 0);
    if (p === P - x.s[x.s.length - 1]) return `${p} ${u} leaves out one side. Add all ${x.s.length} sides.`;
    if (p === P + x.s[0]) return `${p} ${u} adds the ${x.s[0]} ${u} side twice.`;
    return `${p} ${u} is ${Math.abs(p - P)} ${MA8V_mo(p - P)} than the sum of all the sides.`;
  }
  if (x.t === "miss") {
    if (p === x.K) return `${p} cm is the sides you already know. Take that away from ${x.P} cm.`;
    if (p === x.P) return `${p} cm is the whole perimeter, not one side.`;
    return `With a ${p} cm side, the perimeter would be ${x.K + p} cm, not ${x.P} cm.`;
  }
  if (x.t === "sq") return p * 4 === x.P ? null : `A square with ${p} ${u} sides has a perimeter of ${4 * p} ${u}, not ${x.P} ${u}.`;
  return null;
});

/* ---------- Time to 5 minutes ---------- */
function MA8V_tadd(h, m, d) { const t = ((h % 12) * 60 + m + d + 7200) % 720; return `${MA8V_hr(Math.floor(t / 60) || 12)}:${pad2(t % 60)}`; }
function MA8V_twords(s) { const [h, m] = s.split(":").map(Number); return m === 0 ? `${h} o'clock` : m === 15 ? `quarter past ${h}` : m === 30 ? `half past ${h}` : m === 45 ? `quarter to ${MA8V_hr(h + 1)}` : `${m} minutes after ${h}`; }
addBank(8, "math", "time5", 0.6, () => {
  const h = R(1, 12), m = 5 * R(0, 11), t = `${h}:${pad2(m)}`, f = R(0, 7);
  if (f <= 2) {
    const mh = m / 5 === 0 ? 12 : m / 5, cands = [[h, (m + 5) % 60], [h, (m + 55) % 60], [MA8V_hr(h + 1), m], [mh, (h * 5) % 60], [MA8V_hr(h - 1), m]];
    const seen = new Set([t]), opts = [clock(h, m, 110)];
    for (const [a, b] of shuffle(cands)) { const s = `${a}:${pad2(b)}`; if (!seen.has(s) && opts.length < 4) { seen.add(s); opts.push(clock(a, b, 110)); } }
    return { q: `Which clock shows <b>${t}</b>?`, say: `Which clock shows ${t}?`, opts: shuffle(opts), ans: clock(h, m, 110), sayAns: t, why: `At ${t} the short hand is ${m ? "past" : "on"} the ${h} and the long hand is on the ${mh}${mh === 12 ? "" : `, which means ${m} minutes`}.`, key: "c" + t, v22: { t: "pick", time: t } };
  }
  if (f <= 3) {
    const w = R(0, 2), H = R(1, 12), [phrase, ans] = [[`quarter past ${H}`, `${H}:15`], [`half past ${H}`, `${H}:30`], [`quarter to ${H}`, `${MA8V_hr(H - 1)}:45`]][w];
    const cands = w === 0 ? [`${H}:45`, `${H}:25`, `${MA8V_hr(H - 1)}:15`, `${H}:30`] : w === 1 ? [`${H}:50`, `${H}:15`, `${MA8V_hr(H + 1)}:30`, `${MA8V_hr(H - 1)}:30`] : [`${H}:45`, `${H}:15`, `${MA8V_hr(H - 1)}:15`, `${H}:40`];
    return { q: `What time is <b>${phrase}</b>?`, say: `What time is ${phrase}?`, opts: uniq(ans, cands), ans, big: 1, why: w === 0 ? `Quarter past means 15 minutes after the hour, so it is ${ans}.` : w === 1 ? `Half past means 30 minutes after the hour, so it is ${ans}.` : `Quarter to ${H} means 15 minutes before ${H}, which is ${ans}.`, key: "p" + phrase, v22: { t: "words", phrase } };
  }
  if (f === 4) {
    const n = R(1, 11), hh = R(1, 12);
    return { q: `The long hand points to the <b>${n}</b>. How many minutes after the hour is it?`, say: `The long hand points to the ${n}. How many minutes after the hour is it?`, vis: clock(hh, 5 * n, 170, true), opts: numU(5 * n, [n, 5 * n + 5, 5 * n - 5, n + 5], 5, 1), ans: String(5 * n), big: 1, why: `Count by 5s to the ${n}: ${n} × 5 = ${5 * n} minutes.`, key: "m" + n, v22: { t: "long", n } };
  }
  const d = pick([5, 10, 15, 20]), ans = MA8V_tadd(h, m, d);
  return { q: `The clock shows ${t}. What time will it be <b>${d} minutes later</b>?`, say: `The clock shows ${t}. What time will it be ${d} minutes later?`, vis: clock(h, m), opts: uniq(ans, [MA8V_tadd(h, m, d + 5), MA8V_tadd(h, m, d - 5), t, MA8V_tadd(h, m, d + 60), MA8V_tadd(h, m, d - 60)]), ans, big: 1, why: `Count on ${d} minutes from ${t} by 5s. It will be ${ans}.`, key: "l" + t + "+" + d, v22: { t: "later", h, m, d, time: t } };
});
whyRule(8, "math", "time5", (q, picked) => {
  const x = q.v22; if (!x || picked === q.ans) return null;
  if (x.t === "pick") {
    const m = String(picked).match(/clock showing (\d+):(\d+)/); if (!m) return null;
    const [h0, m0] = x.time.split(":").map(Number), ph = +m[1], pm = +m[2];
    if (ph === h0) return `That clock's long hand is on the ${pm / 5 || 12}, which means ${pm} minutes, not ${m0}.`;
    if (pm === m0) return `That clock's short hand is ${pm ? "past" : "on"} the ${ph}, so it shows ${ph}:${pad2(pm)}.`;
    return `That clock shows ${ph}:${pad2(pm)}, not ${x.time}.`;
  }
  if (x.t === "words") { const p = xPlain(picked); return /^\d{1,2}:\d{2}$/.test(p) ? `${p} is ${MA8V_twords(p)}, not ${x.phrase}.` : null; }
  if (x.t === "long") {
    const p = xNum(picked); if (p == null) return null;
    if (p === x.n) return `${p} is the number the hand points to. Each number means 5 minutes, so count by 5s.`;
    if (p % 5 === 0 && p / 5 >= 1 && p / 5 <= 11) return `${p} minutes would put the long hand on the ${p / 5}, not the ${x.n}.`;
    return `Count by 5s to the ${x.n}; that doesn't give ${p}.`;
  }
  if (x.t === "later") {
    const p = xPlain(picked).match(/^(\d+):(\d+)$/); if (!p) return null;
    const dm = (((+p[1] % 12) * 60 + +p[2]) - ((x.h % 12) * 60 + x.m) + 720) % 720;
    if (dm === 0) return `${xPlain(picked)} is the time now, before any minutes pass.`;
    if (dm >= 360) return `${xPlain(picked)} is earlier than ${x.time}, but time moves forward.`;
    if (dm >= 60) return `${xPlain(picked)} is more than an hour later, but only ${x.d} minutes pass.`;
    return `${xPlain(picked)} is ${dm} minutes after ${x.time}, not ${x.d}.`;
  }
  return null;
});

/* ---------- Place value to 1,000 ---------- */
function MA8V_pvDesc(p) {
  if (p >= 1000) return `${p} is more than 999, so it has a thousands place.`;
  const h = Math.floor(p / 100), t = Math.floor(p / 10) % 10, o = p % 10;
  if (p < 100) return `${p} has no hundreds. It is ${MA8V_pl(t, "ten", "tens")} and ${MA8V_pl(o, "one", "ones")}.`;
  return `${p} has ${MA8V_pl(h, "hundred", "hundreds")}, ${MA8V_pl(t, "ten", "tens")} and ${MA8V_pl(o, "one", "ones")}.`;
}
addBank(8, "math", "place1000", 0.2, () => {
  const f = R(0, 6);
  if (f <= 2) {
    const h = R(1, 9); let t = R(0, 9), o = R(0, 9); if (Math.random() < 0.5) { if (Math.random() < 0.5) t = 0; else o = 0; }
    const n = 100 * h + 10 * t + o, squash = +(`${h}${t || ""}${o || ""}`);
    const cands = [squash !== n ? squash : null, 100 * h + 10 * o + t, t ? 100 * t + 10 * h + o : null, o ? 100 * o + 10 * t + h : null, n + 100 <= 999 ? n + 100 : n - 100];
    return { q: `Which number has <b>${h}</b> hundreds, <b>${t}</b> tens and <b>${o}</b> ones?`, say: `Which number has ${h} hundreds, ${t} tens and ${o} ones?`, vis: table([[h, t, o]], ["Hundreds", "Tens", "Ones"]), opts: uniq(n, cands, () => n + pick([10, -10, 1, -1])), ans: String(n), big: 1, why: `${h * 100} + ${t * 10} + ${o} = ${n}.${t === 0 || o === 0 ? " The 0 holds an empty place." : ""}`, key: "b" + n, v22: { t: "build" } };
  }
  if (f <= 4) {
    const n = R(110, 889), d = pick([10, 100]), more = Math.random() < 0.5, ans = more ? n + d : n - d, other = d === 10 ? 100 : 10, s = more ? 1 : -1;
    return { q: `What is <b>${d} ${more ? "more" : "less"}</b> than ${n}?`, say: `What is ${d} ${more ? "more" : "less"} than ${n}?`, vis: eq(String(n)), opts: uniq(ans, [n + s, n + s * other, n - s * d], () => ans + pick([1, -1, 2, -2])), ans: String(ans), big: 1, why: `${d} ${more ? "more" : "less"} changes the ${d === 10 ? "tens" : "hundreds"} digit by 1: ${n} → ${ans}.`, key: "c" + n + (more ? "+" : "-") + d, v22: { t: "shift", n, d, more: more ? 1 : 0 } };
  }
  const h = R(1, 9), x = R(1, 9), tensZero = Math.random() < 0.5, n = tensZero ? 100 * h + x : 100 * h + 10 * x, ex = tensZero ? `${h * 100} + ${x}` : `${h * 100} + ${x * 10}`;
  const cands = tensZero ? [+(`${h}${x}`), 100 * h + 10 * x, 1000 * h + x] : [+(`${h}${x}`), 100 * h + x, 1000 * h + 10 * x];
  return { q: `Write <b>${ex}</b> as one number.`, say: `Write ${ex.replace("+", "plus")} as one number.`, opts: uniq(n, cands), ans: String(n), big: 1, why: `${ex} is ${MA8V_pl(h, "hundred", "hundreds")}, ${tensZero ? "0 tens" : MA8V_pl(x, "ten", "tens")} and ${tensZero ? MA8V_pl(x, "one", "ones") : "0 ones"}: ${n}.`, key: "z" + ex, v22: { t: "zero" } };
});
whyRule(8, "math", "place1000", (q, picked) => {
  const x = q.v22, p = xNum(picked); if (!x || p == null || String(p) === q.ans) return null;
  if (x.t === "build" || x.t === "zero") return MA8V_pvDesc(p);
  if (x.t === "shift") { const df = p - x.n; return `${p} is ${Math.abs(df)} ${MA8V_mo(df)} than ${x.n}, not ${x.d} ${x.more ? "more" : "less"}.`; }
  return null;
});

/* ---------- Bar graphs (scaled) ---------- */
const MA8V_GR = [
  ["Snacks sold", ["🍿", "🥨", "🍎", "🧀"], ["popcorn bags", "pretzels", "apples", "cheese sticks"], n => `How many ${n} were sold?`, (a, b) => `How many more ${a} than ${b} were sold?`, (a, b) => `How many ${a} and ${b} were sold in all?`, w => `Which snack sold the ${w}?`],
  ["Animals at the pond", ["🐸", "🦆", "🐢", "🐟"], ["frogs", "ducks", "turtles", "fish"], n => `How many ${n} were seen?`, (a, b) => `How many more ${a} than ${b} were seen?`, (a, b) => `How many ${a} and ${b} were seen in all?`, w => `Which animal was seen the ${w}?`],
  ["Votes for a class trip", ["🏖️", "⛰️", "🎡", "🦁"], ["beach", "mountains", "fair", "zoo"], n => `How many votes did the ${n} get?`, (a, b) => `How many more votes did the ${a} get than the ${b}?`, (a, b) => `How many votes did the ${a} and the ${b} get in all?`, w => `Which trip got the ${w === "most" ? "most" : "fewest"} votes?`],
  ["Books read by each team", ["📕", "📗", "📘", "📙"], ["red team", "green team", "blue team", "orange team"], n => `How many books did the ${n} read?`, (a, b) => `How many more books did the ${a} read than the ${b}?`, (a, b) => `How many books did the ${a} and the ${b} read in all?`, w => `Which team read the ${w === "most" ? "most" : "fewest"} books?`],
  ["Favorite season", ["🌸", "☀️", "🍂", "⛄"], ["spring", "summer", "fall", "winter"], n => `How many kids chose ${n}?`, (a, b) => `How many more kids chose ${a} than ${b}?`, (a, b) => `How many kids chose ${a} or ${b} in all?`, w => `Which season was chosen the ${w}?`],
];
function MA8V_graph(title, es, vals, sc) {
  const W = 340, H = 262, left = 40, bottom = 206, top = 34, bw = 44, n = es.length, gap = (W - left - 10 - n * bw) / n, max = sc * 10, y = v => bottom - v / max * (bottom - top);
  let s = svgOpen(W, H, `${title}, scaled bar graph`);
  for (let v = 0; v <= max; v += sc) { const lab = v % (2 * sc) === 0; s += `<line x1="${left}" y1="${f1(y(v))}" x2="${W - 8}" y2="${f1(y(v))}" stroke="${lab ? "#C5D3EC" : "#E4EBF7"}" stroke-width="1"/>`; if (lab) s += `<text x="${left - 8}" y="${f1(y(v))}" text-anchor="end" dominant-baseline="central" font-size="12" font-family="${FONT}" fill="${INK}">${v}</text>`; }
  const cols = ["#FF7A59", "#3D7BFF", "#1FAF6E", "#9B5DE5"];
  vals.forEach((v, i) => { const x = left + gap / 2 + i * (bw + gap); s += `<rect x="${f1(x)}" y="${f1(y(v))}" width="${bw}" height="${f1(bottom - y(v))}" rx="4" fill="${cols[i % 4]}"/><text x="${f1(x + bw / 2)}" y="${bottom + 26}" text-anchor="middle" font-size="24" font-family="'Apple Color Emoji','Segoe UI Emoji','Noto Color Emoji',sans-serif">${es[i]}</text>`; });
  s += `<line x1="${left}" y1="${bottom}" x2="${W - 8}" y2="${bottom}" stroke="${INK}" stroke-width="2.5"/><line x1="${left}" y1="${top - 8}" x2="${left}" y2="${bottom}" stroke="${INK}" stroke-width="2.5"/>`;
  return s + `<text x="${W / 2}" y="16" text-anchor="middle" font-size="14" font-weight="600" font-family="${FONT}" fill="${INK}">${title}</text><text x="${W / 2}" y="${H - 6}" text-anchor="middle" font-size="12" font-family="${FONT}" fill="${INK}">Each line counts by ${sc}</text></svg>`;
}
addBank(8, "math", "graphs", 0.12, () => {
  const gi = R(0, MA8V_GR.length - 1), [title, es, names, fc, fm, fa, fw] = MA8V_GR[gi], sc = pick([2, 5]), vals = shuffle(range(1, 10)).slice(0, 4).map(v => v * sc), vis = MA8V_graph(title, es, vals, sc), k = R(0, 3), key = gi + "|" + sc + "|" + vals.join();
  const base = { t: "g", vals, names, sc };
  if (k === 0) { const i = R(0, 3), v = vals[i]; return { q: fc(names[i]), vis, opts: numU(v, [v + sc, v - sc, v / sc, v + 2 * sc], sc, 0), ans: String(v), big: 1, why: `The ${names[i]} bar stops at ${v}. Each line counts by ${sc}.`, key: "c" + key + i, v22: { ...base, f: "c", i } }; }
  let a = R(0, 3), b = R(0, 3); while (b === a) b = R(0, 3); if (vals[a] < vals[b]) [a, b] = [b, a];
  if (k === 1) { const d = vals[a] - vals[b]; return { q: fm(names[a], names[b]), vis, opts: numU(d, [vals[a] + vals[b], vals[a], d + sc, d - sc], sc, 0), ans: String(d), big: 1, why: `${vals[a]} − ${vals[b]} = ${d}.`, key: "m" + key + a + b, v22: { ...base, f: "m", a, b } }; }
  if (k === 2) { const s = vals[a] + vals[b]; return { q: fa(names[a], names[b]), vis, opts: numU(s, [vals[a] - vals[b], s + sc, s - sc, vals[a]], sc, 0), ans: String(s), big: 1, why: `${vals[a]} + ${vals[b]} = ${s}.`, key: "a" + key + a + b, v22: { ...base, f: "a", a, b } }; }
  const most = Math.random() < 0.5, i = vals.indexOf(most ? Math.max(...vals) : Math.min(...vals));
  return { q: fw(most ? "most" : "least"), vis, opts: names.slice(), ans: names[i], big: 1, why: `The ${names[i]} bar is the ${most ? "tallest" : "shortest"}, at ${vals[i]}.`, key: "w" + key + most, v22: { ...base, f: "w", most: most ? 1 : 0 } };
});
whyRule(8, "math", "graphs", (q, picked) => {
  const x = q.v22; if (!x || picked === q.ans) return null;
  const { vals, names, sc } = x;
  if (x.f === "w") { const i = names.indexOf(xPlain(picked)), j = names.indexOf(q.ans); if (i < 0 || j < 0) return null; return `The ${names[i]} bar is at ${vals[i]}, but the ${names[j]} bar is ${x.most ? "taller" : "shorter"} at ${vals[j]}.`; }
  const p = xNum(picked); if (p == null) return null;
  if (x.f === "c") {
    const v = vals[x.i], other = names.find((n, k) => k !== x.i && vals[k] === p);
    if (sc > 1 && p === v / sc) return `${p} counts the steps up the bar, but each step is worth ${sc}.`;
    if (other) return `${p} is where the ${other} bar stops, not the ${names[x.i]} bar.`;
    return `The ${names[x.i]} bar ${p > v ? "doesn't reach" : "goes past"} ${p}.`;
  }
  const A = vals[x.a], B = vals[x.b];
  if (x.f === "m") {
    if (p === A + B) return `${p} is ${A} + ${B}. "How many more" means subtract.`;
    if (p === A) return `${p} is just the ${names[x.a]} bar. Take away the ${names[x.b]} bar.`;
    return `The bars are ${A} and ${B}, and ${A} − ${B} isn't ${p}.`;
  }
  if (x.f === "a") {
    if (p === A - B) return `${p} is ${A} − ${B}. "In all" means add.`;
    if (p === A) return `${p} is just the ${names[x.a]} bar. Add the ${names[x.b]} bar too.`;
    return `The bars are ${A} and ${B}, and ${A} + ${B} isn't ${p}.`;
  }
  return null;
});

/* ---------- Word problems (two steps) ---------- */
addBank(8, "math", "wordprob", 0.15, () => {
  const w = MA8V_who(), k = R(0, 5);
  if (k === 0) {
    const p = R(2, 6), c = R(4, 10), g = R(2, p * c - 2), first = p * c, ans = first - g;
    return { q: `${w} buys ${p} packs of pencils with ${c} pencils in each pack. ${w} gives ${g} pencils to friends. How many pencils does ${w} have now?`, vis: bigEmo("✏️"), opts: numU(ans, [first, first + g, ans + 1, ans - 1], 3, 0), ans: String(ans), big: 1, why: `${p} × ${c} = ${first}, then ${first} − ${g} = ${ans}.`, key: "p" + p + c + "_" + g, v22: { t: "wp", k, first, nums: [p, c, g] } };
  }
  if (k === 1) {
    const n2 = R(2, 5), c = R(2, 9), cost = n2 * c, n = cost + R(1, 20), ans = n - cost;
    return { q: `${w} has $${n}. ${w} buys ${n2} books that cost $${c} each. How much money is left?`, vis: bigEmo("📚"), opts: uniq("$" + ans, ["$" + cost, "$" + (n - c), "$" + (ans + 1), ans > 1 ? "$" + (ans - 1) : "$" + (ans + 2)]), ans: "$" + ans, big: 1, why: `${n2} × $${c} = $${cost}, then $${n} − $${cost} = $${ans}.`, key: "m" + n + "_" + n2 + "_" + c, v22: { t: "wp", k, first: cost, nums: [n, n2, c] } };
  }
  if (k === 2) {
    const qq = R(3, 10), pl = R(2, 6), n = qq * pl, e = R(1, qq - 1), ans = qq - e;
    return { q: `${w} puts ${n} cookies equally on ${pl} plates. Then ${w} eats ${e} ${e === 1 ? "cookie" : "cookies"} from one plate. How many cookies are left on that plate?`, vis: bigEmo("🍪"), opts: numU(ans, [qq, n - e, ans + 1, ans + 2], 2, 0), ans: String(ans), big: 1, why: `${n} ÷ ${pl} = ${qq} on each plate, then ${qq} − ${e} = ${ans}.`, key: "c" + n + "_" + pl + "_" + e, v22: { t: "wp", k, first: qq, nums: [n, pl, e] } };
  }
  if (k === 3) {
    const r = R(3, 9), c = R(2, 4), tot = r * c, t = R(1, tot - 1), ans = tot - t;
    return { q: `A bus has ${r} rows of seats with ${c} seats in each row. ${t} seats are taken. How many seats are empty?`, vis: bigEmo("🚌"), opts: numU(ans, [tot, t, ans + 1, ans - 1], 2, 0), ans: String(ans), big: 1, why: `${r} × ${c} = ${tot} seats, then ${tot} − ${t} = ${ans} empty.`, key: "b" + r + c + "_" + t, v22: { t: "wp", k, first: tot, nums: [r, c, t] } };
  }
  if (k === 4) {
    const bg = R(2, 6), tot = bg * R(3, 10), a = R(1, tot - 1), b = tot - a, ans = tot / bg;
    return { q: `${w} has ${a} red marbles and ${b} blue marbles. ${w} puts all of them in bags of ${bg}. How many bags does ${w} fill?`, vis: bigEmo("🔵"), opts: numU(ans, [tot, tot - bg, ans + 1, ans - 1], 2, 1), ans: String(ans), big: 1, why: `${a} + ${b} = ${tot} marbles, then ${tot} ÷ ${bg} = ${ans} bags.`, key: "g" + a + "_" + b + "_" + bg, v22: { t: "wp", k, first: tot, nums: [a, b, bg] } };
  }
  const a = R(3, 20), b = R(2, 9), d = R(2, 7), first = b * d, ans = a + first;
  return { q: `${w} has ${a} stickers. ${w} gets ${b} more stickers each day for ${d} days. How many stickers does ${w} have now?`, vis: bigEmo("⭐"), opts: numU(ans, [first, (a + b) * d, a + b + d, ans + 1], 3, 0), ans: String(ans), big: 1, why: `${b} × ${d} = ${first} new stickers, then ${a} + ${first} = ${ans}.`, key: "s" + a + "_" + b + "_" + d, v22: { t: "wp", k, first, nums: [a, b, d] } };
});
whyRule(8, "math", "wordprob", (q, picked) => {
  const x = q.v22, p = xNum(picked); if (!x || p == null || xPlain(picked) === xPlain(q.ans)) return null;
  const [A, B, C] = x.nums, ans = xNum(q.ans), $ = x.k === 1 ? "$" : "", P = $ + p;
  const step2 = ["take away the pencils given to friends", "take that cost away from the money", "take away the cookies eaten", "take away the taken seats", "share them into bags", "add the stickers from the start"][x.k];
  if (p === x.first) return `${P} is only step 1. Then ${step2}.`;
  if (x.k === 0 && p === x.first + C) return `${P} adds the ${C} pencils, but they were given away.`;
  if (x.k === 1 && p === A - C) return `${P} pays for only 1 book, but ${B} books were bought.`;
  if (x.k === 2 && p === A - C) return `${P} takes from all ${A} cookies, but the question is about one plate.`;
  if (x.k === 3 && p === C) return `${P} is the seats that are taken, not the empty ones.`;
  if (x.k === 4 && p === x.first - C) return `${P} takes away one bag of ${C}. Divide to find how many bags.`;
  if (x.k === 5 && p === (A + B) * C) return `${P} multiplies the ${A} starting stickers too, but they came only once.`;
  if (x.k === 5 && p === A + B + C) return `${P} adds every number. ${B} each day for ${C} days means multiply.`;
  return `${P} is ${$}${Math.abs(p - ans)} ${MA8V_mo(p - ans)} than the right answer.`;
});

/* ---------- Comparing fractions ---------- */
addBank(8, "math", "comparefrac", 0.5, () => {
  const f = R(0, 6);
  if (f <= 2) {
    let a, b, c, d;
    if (Math.random() < 0.55) { b = d = pick([3, 4, 5, 6, 8]); a = R(1, b - 1); do { c = R(1, b - 1); } while (c === a); }
    else { a = c = R(1, 3); const ds = [2, 3, 4, 5, 6, 8].filter(x => x > a); b = pick(ds); do { d = pick(ds); } while (d === b); }
    const more = Math.random() < 0.5, A = MA8V_N[(a * 5 + b * 3 + c) % MA8V_N.length]; let B = MA8V_N[(c * 7 + d * 2 + a + 3) % MA8V_N.length]; if (B === A) B = MA8V_N[(MA8V_N.indexOf(A) + 4) % MA8V_N.length];
    const aBig = a * d > c * b, ans = (more ? aBig : !aBig) ? A : B;
    return { q: `${A} ate ${frac(a, b)} of a pizza. ${B} ate ${frac(c, d)} of a same-size pizza. Who ate <b>${more ? "more" : "less"}</b>?`, say: `${A} ate ${fracWords(a, b)} of a pizza. ${B} ate ${fracWords(c, d)} of a same-size pizza. Who ate ${more ? "more" : "less"}?`, vis: row(pie(b, a, 110, "#FF7A59"), pie(d, c, 110, "#3D7BFF")), opts: [A, B], ans, big: 1, why: b === d ? `Same size pieces: ${Math.max(a, c)} pieces is more than ${Math.min(a, c)}, so ${ans} ate ${more ? "more" : "less"}.` : `Same number of pieces, but ${Math.min(b, d)} parts make bigger pieces than ${Math.max(b, d)} parts, so ${ans} ate ${more ? "more" : "less"}.`, key: "w" + [a, b, c, d].join() + more, v22: { t: "who", A, B, a, b, c, d } };
  }
  if (f <= 4) {
    const big = Math.random() < 0.5; let fr;
    if (Math.random() < 0.5) { const d = pick([4, 5, 6, 8]); fr = shuffle(range(1, d - 1)).slice(0, 3).map(n => [n, d]); }
    else { const n = R(1, 2); fr = shuffle([2, 3, 4, 5, 6, 8].filter(x => x > n)).slice(0, 3).map(d => [n, d]); }
    const best = fr.reduce((m, x) => (big ? x[0] / x[1] > m[0] / m[1] : x[0] / x[1] < m[0] / m[1]) ? x : m);
    return { q: `Which fraction is the <b>${big ? "greatest" : "least"}</b>?`, say: `Which fraction is the ${big ? "greatest" : "least"}: ${fr.map(([n, d]) => fracWords(n, d)).join(", ")}?`, opts: shuffle(fr.map(([n, d]) => frac(n, d))), ans: frac(...best), big: 1, why: fr[0][1] === fr[1][1] ? `All are ${FNAME[best[1]][1]}, so the one with the ${big ? "most" : "fewest"} parts, ${best[0]}/${best[1]}, is the ${big ? "greatest" : "least"}.` : `All have ${best[0]} on top. ${big ? "Fewer" : "More"} parts make ${big ? "bigger" : "smaller"} pieces, so ${best[0]}/${best[1]} is the ${big ? "greatest" : "least"}.`, key: "g" + big + fr.map(x => x.join("/")).sort().join(), v22: { t: "three", big: big ? 1 : 0 } };
  }
  const d = pick([2, 3, 4, 6, 8]), k = R(1, 2 * d), o = ["less than 1", "equal to 1", "more than 1"], ans = k < d ? o[0] : k === d ? o[1] : o[2];
  return { q: `Is ${frac(k, d)} less than, equal to, or more than <b>1 whole</b>?`, say: `Is ${k} over ${d} less than, equal to, or more than 1 whole?`, vis: MA8V_line(d, 2, { dot: k }), opts: o.slice(), ans, big: 1, why: k < d ? `${d}/${d} make 1 whole, and ${k} part${k === 1 ? " is" : "s are"} fewer than ${d}.` : k === d ? `${d} parts of ${frac(1, d)} make exactly 1 whole.` : `${d}/${d} make 1 whole, and ${k} parts are more than ${d}.`, key: "o" + k + "/" + d, v22: { t: "one", k, d } };
});
whyRule(8, "math", "comparefrac", (q, picked) => {
  const x = q.v22; if (!x || picked === q.ans) return null;
  if (x.t === "who") {
    const { a, b, c, d } = x, me = xPlain(picked) === x.A ? [a, b] : [c, d], them = me[0] === a && me[1] === b ? [c, d] : [a, b], other = xPlain(picked) === x.A ? x.B : x.A;
    const cmp = me[0] * them[1] < them[0] * me[1] ? "less" : "more";
    return `${xPlain(picked)} ate ${me[0]}/${me[1]}, which is ${cmp} than ${other}'s ${them[0]}/${them[1]}.`;
  }
  if (x.t === "three") {
    const p = xFrac(picked), A = xFrac(q.ans); if (!p || !A) return null;
    const less = p[0] * A[1] < A[0] * p[1];
    if (p[1] === A[1]) return `${p[0]}/${p[1]} has ${p[0] < A[0] ? "fewer" : "more"} parts than ${A[0]}/${A[1]}, so it is ${less ? "smaller" : "bigger"}.`;
    return `${p[0]}/${p[1]} has ${p[1] > A[1] ? "smaller" : "bigger"} pieces than ${A[0]}/${A[1]}, so it is ${less ? "smaller" : "bigger"}.`;
  }
  if (x.t === "one") {
    const { k, d } = x, F = `${k}/${d}`;
    return k < d ? `${F} has only ${k} of the ${d} parts that make 1 whole, so it is less than 1.` : k === d ? `${F} has all ${d} parts of 1 whole, so it is exactly 1.` : `${F} has ${k} parts, more than the ${d} that make 1 whole.`;
  }
  return null;
});

/* ---------- Dollars & cents ---------- */
const MA8V_SHOP = [["✏️", "pencil", "pencils", 35], ["📏", "ruler", "rulers", 89], ["🍩", "donut", "donuts", 110], ["🥤", "cup of lemonade", "cups of lemonade", 125], ["🧦", "pair of socks", "pairs of socks", 275], ["📕", "book", "books", 450],
  ["🎨", "paint set", "paint sets", 360], ["🪁", "kite", "kites", 515], ["🧢", "cap", "caps", 640], ["🍦", "ice cream cone", "ice cream cones", 185], ["🖊️", "pen", "pens", 60], ["🧩", "puzzle", "puzzles", 730]];
addBank(8, "math", "dollars", 0.7, () => {
  const f = R(0, 7), [x, y] = shuffle(MA8V_SHOP).slice(0, 2);
  if (f <= 1) {
    const t = x[3] + y[3];
    return { q: `A ${x[1]} costs <b>${$f(x[3])}</b> and a ${y[1]} costs <b>${$f(y[3])}</b>. How much for both?`, say: `A ${x[1]} costs ${$f(x[3])} and a ${y[1]} costs ${$f(y[3])}. How much for both?`, vis: row(bigEmo(x[0]), bigEmo(y[0])), opts: uniq($f(t), [$f(Math.abs(x[3] - y[3])), $f(t + 10), $f(t - 10), $f(t + 100)]), ans: $f(t), big: 1, why: `${$f(x[3])} + ${$f(y[3])} = ${$f(t)}.`, key: "t" + [x[1], y[1]].sort().join(), v22: { t: "both", a: x[3], b: y[3] } };
  }
  if (f <= 3) {
    const pays = [100, 500, 1000, 2000].filter(p => p > x[3]).slice(0, 2), pay = pick(pays), ch = pay - x[3];
    return { q: `A ${x[1]} costs <b>${$f(x[3])}</b>. You pay with <b>${$f(pay)}</b>. How much change do you get back?`, say: `A ${x[1]} costs ${$f(x[3])}. You pay with ${$f(pay)}. How much change do you get back?`, vis: bigEmo(x[0]), opts: uniq($f(ch), [$f(x[3]), $f(ch + 10), ch > 10 ? $f(ch - 10) : $f(ch + 5), $f(ch + 100)]), ans: $f(ch), big: 1, why: `${$f(pay)} − ${$f(x[3])} = ${$f(ch)}.`, key: "c" + x[1] + pay, v22: { t: "change", price: x[3], pay } };
  }
  if (f <= 5) {
    const m = R(2, 4), t = m * x[3];
    return { q: `One ${x[1]} costs <b>${$f(x[3])}</b>. How much do <b>${m} ${x[2]}</b> cost?`, say: `One ${x[1]} costs ${$f(x[3])}. How much do ${m} ${x[2]} cost?`, vis: bigEmo(x[0]), opts: uniq($f(t), [$f(x[3] * (m - 1)), $f(x[3] * (m + 1)), $f(x[3]), $f(t + 10)]), ans: $f(t), big: 1, why: `${m} × ${$f(x[3])} = ${$f(t)}.`, key: "m" + x[1] + m, v22: { t: "many", price: x[3], m } };
  }
  const t = x[3] + y[3], dl = pick([-75, -50, -25, -10, -5, 5, 10, 25, 50, 75]), have = t + dl, yes = have >= t;
  return { q: `You have <b>${$f(have)}</b>. Is that enough to buy a ${x[1]} for ${$f(x[3])} and a ${y[1]} for ${$f(y[3])}?`, say: `You have ${$f(have)}. Is that enough to buy a ${x[1]} for ${$f(x[3])} and a ${y[1]} for ${$f(y[3])}?`, vis: row(bigEmo(x[0]), bigEmo(y[0])), opts: ["Yes", "No"], ans: yes ? "Yes" : "No", big: 1, why: `${$f(x[3])} + ${$f(y[3])} = ${$f(t)}. ${$f(have)} is ${yes ? "more" : "less"} than that.`, key: "e" + [x[1], y[1]].sort().join() + have, v22: { t: "enough", have, tot: t } };
});
whyRule(8, "math", "dollars", (q, picked) => {
  const x = q.v22; if (!x || picked === q.ans) return null;
  if (x.t === "enough") return xPlain(picked) === "Yes" ? `${$f(x.have)} is less than the ${$f(x.tot)} you need for both.` : `${$f(x.have)} is more than the ${$f(x.tot)} total, so there is enough.`;
  const pv = xNum(picked); if (pv == null) return null;
  const p = Math.round(pv * 100), P = $f(p), ans = Math.round(xNum(q.ans) * 100), diff = Math.abs(p - ans), dtx = diff >= 100 ? $f(diff) : diff + " cents";
  if (x.t === "both" && p === Math.abs(x.a - x.b)) return `${P} is the difference. To find the cost of both, add the prices.`;
  if (x.t === "change" && p === x.price) return `${P} is the price, not the change you get back.`;
  if (x.t === "many") {
    if (p === x.price) return `${P} is the price of just 1, but you need ${x.m}.`;
    if (p === x.price * (x.m - 1)) return `${P} pays for only ${x.m - 1}, but you need ${x.m}.`;
    if (p === x.price * (x.m + 1)) return `${P} pays for ${x.m + 1}, one too many.`;
  }
  return `${P} is ${dtx} ${p > ans ? "more" : "less"} than the right amount.`;
});

/* ---------- Missing factors ---------- */
const MA8V_MFW = [["🪑", (n, c) => `How many rows of ${c} chairs make ${n} chairs?`, "rows"], ["🍎", (n, c) => `How many bags of ${c} apples make ${n} apples?`, "bags"], ["🃏", (n, c) => `How many packs of ${c} cards make ${n} cards?`, "packs"], ["🥚", (n, c) => `How many cartons of ${c} eggs hold ${n} eggs?`, "cartons"], ["🌷", (n, c) => `How many pots with ${c} tulips each make ${n} tulips?`, "pots"]];
addBank(8, "math", "missingfactor", 0.5, () => {
  const f = R(0, 5), k = R(2, 9), qq = R(2, 10), n = k * qq;
  if (f <= 1) return { q: "What number is missing?", say: `What number divided by ${k} equals ${qq}?`, vis: eq(`${blank()} ÷ ${k} = ${qq}`), opts: numU(n, [k + qq, n + k, n - qq, qq], 3, 1), ans: String(n), big: 1, why: `${k} × ${qq} = ${n}, so ${n} ÷ ${k} = ${qq}.`, key: "d" + k + "_" + qq, v22: { t: "dvd", k, qq } };
  if (f <= 3) {
    let a, b, c, g = 0; do { b = R(2, 9); c = R(2, 9); a = R(2, 9); g++; } while (g < 200 && (a === b || a === c || (b * c) % a || b * c / a > 10 || b * c / a < 2));
    if (g >= 200) { a = 3; b = 2; c = 6; }
    const P = b * c, ans = P / a;
    return { q: "What number makes this true?", say: `${a} times what equals ${b} times ${c}?`, vis: eq(`${a} × ${blank()} = ${b} × ${c}`), opts: numU(ans, [c, b, P, ans + 1, ans - 1], 2, 1), ans: String(ans), big: 1, why: `${b} × ${c} = ${P}, and ${a} × ${ans} = ${P} too.`, key: "e" + a + "_" + b + "_" + c, v22: { t: "bal", a, P, b, c } };
  }
  const [e, fn, unit] = pick(MA8V_MFW);
  return { q: fn(n, k), vis: bigEmo(e), opts: numU(qq, [qq + 1, qq - 1, k, n - k], 2, 1), ans: String(qq), big: 1, why: `${qq} × ${k} = ${n}, so it takes ${qq} ${unit}.`, key: "w" + e + n + "_" + k, v22: { t: "word", n, k, unit } };
});
whyRule(8, "math", "missingfactor", (q, picked) => {
  const x = q.v22, p = xNum(picked); if (!x || p == null || String(p) === q.ans) return null;
  if (x.t === "dvd") return p % x.k === 0 ? `${p} ÷ ${x.k} = ${p / x.k}, not ${x.qq}.` : `${p} can't be shared into ${x.k} equal groups with none left over.`;
  if (x.t === "bal") return p === x.P ? `${p} is ${x.b} × ${x.c}. You need the number that goes with ${x.a} to make ${x.P}.` : `${x.a} × ${p} = ${x.a * p}, but ${x.b} × ${x.c} = ${x.P}.`;
  if (x.t === "word") return `${p} ${x.unit} of ${x.k} make ${p * x.k}, not ${x.n}.`;
  return null;
});

/* ---------- Estimating ---------- */
const MA8V_EW = [["+", "⭐", (w, a, b) => `${w} has ${a} stickers and gets ${b} more.`, "stickers"], ["+", "🐚", (w, a, b) => `${w} found ${a} shells on Saturday and ${b} shells on Sunday.`, "shells"], ["+", "🍓", (w, a, b) => `A farm picked ${a} strawberries in the morning and ${b} in the afternoon.`, "strawberries"],
  ["−", "🚌", (w, a, b) => `A bus has ${a} people on it. ${b} people get off.`, "people are still on the bus"], ["−", "🎈", (w, a, b) => `A party store has ${a} balloons. It sells ${b}.`, "balloons are left"], ["−", "📘", (w, a, b) => `A book has ${a} pages. ${w} has read ${b} pages.`, "pages are left to read"]];
function MA8V_two(op) { let a, b; do { a = R(21, 98); b = R(11, 89); if (op === "−" && b > a) [a, b] = [b, a]; } while (a % 10 === 5 || b % 10 === 5 || a % 10 === 0 || b % 10 === 0 || a === b || (op === "−" && MA8V_r10(a) <= MA8V_r10(b))); return [a, b]; }
addBank(8, "math", "estimate", 0.2, () => {
  const f = R(0, 6), w = MA8V_who();
  if (f <= 2) {
    const op = Math.random() < 0.6 ? "+" : "−"; let a, b;
    do { a = R(110, 890); b = R(110, 890); if (op === "−" && b > a) [a, b] = [b, a]; } while (Math.floor(a / 10) % 10 === 5 || Math.floor(b / 10) % 10 === 5 || (op === "−" && MA8V_r100(a) <= MA8V_r100(b)));
    const ra = MA8V_r100(a), rb = MA8V_r100(b), est = op === "+" ? ra + rb : ra - rb, ex = op === "+" ? a + b : a - b, ten = op === "+" ? MA8V_r10(a) + MA8V_r10(b) : MA8V_r10(a) - MA8V_r10(b);
    return { q: `Round to the nearest hundred to <b>estimate</b>: ${a} ${op} ${b}`, say: `Round to the nearest hundred to estimate ${a} ${op === "+" ? "plus" : "minus"} ${b}.`, vis: eq(`${a} ${op} ${b} ≈ ${blank()}`), opts: uniq(est, [ex, ten !== est ? ten : null, est + 100, est - 100 > 0 ? est - 100 : est + 200], () => { const v = est + 100 * R(-3, 3); return v > 0 ? v : null; }), ans: String(est), big: 1, why: `${a} rounds to ${ra} and ${b} rounds to ${rb}. ${ra} ${op} ${rb} = ${est}.`, key: "h" + a + op + b, v22: { t: "e100", a, b, op, ex, ten } };
  }
  if (f <= 4) {
    const [op, e, fn, tail] = pick(MA8V_EW), [a, b] = MA8V_two(op), ra = MA8V_r10(a), rb = MA8V_r10(b), est = op === "+" ? ra + rb : ra - rb, ex = op === "+" ? a + b : a - b;
    const qtail = op === "+" ? `About how many ${tail} in all? Round each number to the nearest ten.` : `About how many ${tail}? Round each number to the nearest ten.`;
    return { q: `${fn(w, a, b)} ${qtail}`, vis: bigEmo(e), opts: uniq(est, [ex, est + 10, est - 10 > 0 ? est - 10 : est + 20, op === "+" ? Math.abs(ra - rb) : ra + rb]), ans: String(est), big: 1, why: `${a} rounds to ${ra} and ${b} rounds to ${rb}. ${ra} ${op} ${rb} = ${est}.`, key: "w" + e + a + op + b, v22: { t: "e10", a, b, op, ex } };
  }
  const [a, b] = MA8V_two("+"), ra = MA8V_r10(a), rb = MA8V_r10(b), est = ra + rb, ex = a + b, ok = Math.random() < 0.45, claim = ok ? ex : ex + pick([100, 90, 110, 200]);
  return { q: `${w} says ${a} + ${b} = ${claim}. Use an estimate to check. Does ${w}'s answer make sense?`, opts: ["Yes", "No"], ans: ok ? "Yes" : "No", big: 1, why: `${a} + ${b} is about ${ra} + ${rb} = ${est}. ${claim} is ${ok ? "close to" : "far from"} ${est}.`, key: "r" + a + "+" + b + "=" + claim, v22: { t: "sense", est, claim } };
});
whyRule(8, "math", "estimate", (q, picked) => {
  const x = q.v22; if (!x || picked === q.ans) return null;
  if (x.t === "sense") return xPlain(picked) === "Yes" ? `${x.claim} is far from the estimate of about ${x.est}.` : `${x.claim} is close to the estimate of about ${x.est}, so it makes sense.`;
  const p = xNum(picked); if (p == null) return null;
  const big = x.t === "e100", rr = big ? MA8V_r100 : MA8V_r10, ra = rr(x.a), rb = rr(x.b);
  if (p === x.ex) return `${p} is the exact answer. To estimate, round each number first.`;
  if (big && p === x.ten) return `${p} rounds to the nearest ten. This asks for the nearest hundred.`;
  if (!big && x.op === "+" && p === Math.abs(ra - rb)) return `${p} subtracts the rounded numbers, but this story adds.`;
  if (!big && x.op === "−" && p === ra + rb) return `${p} adds the rounded numbers, but this story takes away.`;
  return `${x.a} rounds to ${ra} and ${x.b} rounds to ${rb}, so the estimate isn't ${p}.`;
});

