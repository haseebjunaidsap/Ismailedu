/* =====================================================================
   bank_v22_lg9.js · Age 9 Logic (tag LG9V)
   Part A: two new topics: "backwards" (Work Backwards), "parity" (Odd & Even Rules)
   Part B: more questions for every age-9 logic topic, each new format tagged q.v22
   with a matching whyRule that returns null for anything else.
   ===================================================================== */

const LG9V_PEOPLE = [["Mia", "she"], ["Leo", "he"], ["Ava", "she"], ["Omar", "he"], ["Lily", "she"], ["Ravi", "he"], ["Zoe", "she"], ["Kai", "he"], ["Nora", "she"], ["Jada", "she"], ["Diego", "he"], ["Hana", "she"], ["Ben", "he"], ["Priya", "she"], ["Eli", "he"], ["Rosa", "she"], ["Sam", "he"], ["Amir", "he"], ["Lucy", "she"], ["Theo", "he"], ["Maya", "she"], ["Jamal", "he"], ["Ivy", "she"], ["Mateo", "he"]];
const LG9V_NAMES = LG9V_PEOPLE.map(p => p[0]);
const LG9V_HIS = pr => pr === "she" ? "her" : "his";
const LG9V_PL = (n, one, many) => `${n} ${n === 1 ? one : many}`;
const LG9V_PAR = n => n % 2 ? "odd" : "even";
const LG9V_TIME = m => `${Math.floor(m / 60)}:${String(m % 60).padStart(2, "0")}`;
const LG9V_DUR = m => m === 30 ? "30 minutes" : m % 60 ? `${Math.floor(m / 60)} and a half ${m < 120 ? "hours" : "hours"}` : LG9V_PL(m / 60, "hour", "hours");
const LG9V_PTIME = s => { const m = String(s).match(/^(\d{1,2}):(\d\d)$/); return m ? +m[1] * 60 + +m[2] : null; };

/* ====================== PART A · NEW TOPIC 1: Work Backwards ====================== */
const LG9V_SYM = { add: "+", sub: "−", mul: "×", div: "÷" };
const LG9V_DO = (t, n, a) => t === "add" ? n + a : t === "sub" ? n - a : t === "mul" ? n * a : n / a;
const LG9V_INV = { add: "sub", sub: "add", mul: "div", div: "mul" };
const LG9V_OPTXT = ([t, a]) => t === "add" ? `adds ${a}` : t === "sub" ? `takes away ${a}` : t === "mul" ? (a === 2 ? "doubles it" : a === 3 ? "triples it" : `multiplies by ${a}`) : (a === 2 ? "cuts it in half" : `divides by ${a}`);
const LG9V_STEP = ([t, a]) => t === "add" ? `add ${a}` : t === "sub" ? `subtract ${a}` : t === "mul" ? `multiply by ${a}` : `divide by ${a}`;
/* Run steps forward from p and describe it; stops with a true note if a step can't be done with whole numbers. */
function LG9V_CHAIN(p, ops) {
  let n = p; const bits = [];
  for (const [t, a] of ops) {
    if (t === "sub" && n - a < 0) return { ok: false, txt: `${bits.length ? bits.join(", ") + ", and then you" : "you"} can't take ${a} away from ${n}` };
    if (t === "div" && n % a) return { ok: false, txt: `${bits.length ? bits.join(", ") + ", and " : ""}${n} can't be split into ${a} equal whole parts` };
    const m = LG9V_DO(t, n, a); bits.push(`${n} ${LG9V_SYM[t]} ${a} = ${m}`); n = m;
  }
  return { ok: true, end: n, txt: bits.join(", ") };
}
const LG9V_THINGS = ["stickers", "marbles", "shells", "baseball cards", "crayons", "stamps", "beads", "seashells"];
const LG9V_ACTS = ["Soccer practice", "The movie", "The birthday party", "Swim class", "The art fair", "The baking class", "The school play", "The piano lesson"];

topic(9, "logic", {
  id: "backwards", title: "Work Backwards", icon: "⏪", blurb: "Start at the end and undo each step.",
  lesson: [
    { t: "Start at the end", say: "Nora thinks of a number. She adds 5, then doubles it, and gets 30. To find her number, start at 30 and go backwards.", html: train(["?", "+ 5", "× 2", "30"]) + note("Start at the <b>end</b> and undo each step") },
    { t: "Opposites undo", say: "Each step has an opposite that undoes it. Doubling is undone by halving, and adding 5 is undone by taking away 5. So 30 halved is 15, and 15 take away 5 is 10.", html: table([["add", "subtract"], ["subtract", "add"], ["multiply", "divide"], ["divide", "multiply"]], ["Step", "Undo it with"]) + eq("30 ÷ 2 = 15 → 15 − 5 = <b>10</b>") },
    { t: "Check going forward", say: "Always check! Start with 10. Add 5 to get 15. Double it to get 30. It works!", html: eq("10 + 5 = 15 → 15 × 2 = <b>30</b> ✔") },
  ],
  gen() {
    const k = R(0, 9);
    if (k <= 3) { /* think of a number */
      for (let tries = 0; tries < 200; tries++) {
        const s = R(2, 15), nOps = Math.random() < 0.75 ? 2 : 3, ops = []; let n = s, ok = true;
        for (let i = 0; i < nOps; i++) {
          const prevT = ops.length ? ops[ops.length - 1][0] : null;
          const choices = ["add", "sub", "mul", "div"].filter(t => t !== prevT && !(t === "div" && n % 2) && !(t === "sub" && n < 3) && !(t === "mul" && n > 30));
          const t = pick(choices), a = t === "add" ? R(2, 9) : t === "sub" ? R(1, Math.min(9, n - 1)) : t === "mul" ? pick([2, 2, 3]) : 2;
          ops.push([t, a]); n = LG9V_DO(t, n, a);
        }
        if (!ops.some(o => o[0] === "mul" || o[0] === "div") || n < 1 || n > 100 || n === s) { ok = false; }
        if (!ok) continue;
        const [who, pr] = pick(LG9V_PEOPLE), P = cap(pr);
        const stepsTxt = ops.map(LG9V_OPTXT), joined = stepsTxt.length === 2 ? `${stepsTxt[0]}, then ${stepsTxt[1]}` : `${stepsTxt[0]}, then ${stepsTxt[1]}, then ${stepsTxt[2]}`;
        const back = [...ops].reverse().map(([t, a]) => [LG9V_INV[t], a]);
        const undoTxt = []; let m = n; for (const [t, a] of back) { const v = LG9V_DO(t, m, a); undoTxt.push(`${m} ${LG9V_SYM[t]} ${a} = ${v}`); m = v; }
        /* wrong ideas: undo in the wrong order, undo only the last step, go forward again */
        const wrongOrder = (() => { let v = n; for (const [t, a] of ops) { v = LG9V_DO(LG9V_INV[t], v, a); if (!Number.isInteger(v) || v < 0) return null; } return v; })();
        const lastOnly = LG9V_DO(back[0][0], n, back[0][1]);
        const cands = [wrongOrder, Number.isInteger(lastOnly) ? lastOnly : null, s + 1, s - 1, s + 2].filter(v => v != null && Number.isInteger(v) && v >= 0 && v !== s);
        const q = { q: `${who} thinks of a number. ${P} ${joined}. ${P} gets <b>${n}</b>. What was ${LG9V_HIS(pr)} number?`, say: `${who} thinks of a number. ${P} ${joined}. ${P} gets ${n}. What was ${LG9V_HIS(pr)} number?`, vis: train(["?", ...ops.map(([t, a]) => `${LG9V_SYM[t]} ${a}`), String(n)]), opts: numU(s, cands, 3, 0), ans: String(s), big: 1, why: `Work backwards from ${n}: ${undoTxt.join(", then ")}.`, key: "t" + s + ops.flat().join() };
        q.v22 = { kind: "chain", ops, target: n };
        return q;
      }
    }
    if (k <= 6) { /* story */
      for (let tries = 0; tries < 200; tries++) {
        const [who, pr] = pick(LG9V_PEOPLE), P = cap(pr), th = pick(LG9V_THINGS), s = R(5, 30), nSt = Math.random() < 0.7 ? 2 : 3, ops = []; let n = s;
        for (let i = 0; i < nSt; i++) { const t = i === 0 ? pick(["add", "sub"]) : LG9V_INV[ops[i - 1][0]]; const a = t === "add" ? R(2, 12) : R(2, Math.min(12, n - 1)); if (t === "sub" && n < 3) break; ops.push([t, a]); n = LG9V_DO(t, n, a); }
        if (ops.length < nSt || n < 1 || n === s) continue;
        const verb = ([t, a], i) => t === "add" ? `${pick(["got", "found", "was given"])} ${a} more` : `${pick(["gave away", "lost", "traded away"])} ${a}`;
        const parts = ops.map(verb), story = parts.length === 2 ? `${P} ${parts[0]}, then ${parts[1]}.` : `${P} ${parts[0]}, then ${parts[1]}, and then ${parts[2]}.`;
        const back = [...ops].reverse().map(([t, a]) => [LG9V_INV[t], a]); const undoTxt = []; let m = n; for (const [t, a] of back) { const v = LG9V_DO(t, m, a); undoTxt.push(`${m} ${LG9V_SYM[t]} ${a} = ${v}`); m = v; }
        const fwd = (() => { let v = n; for (const [t, a] of ops) v = LG9V_DO(t, v, a); return v; })();
        const cands = [fwd, LG9V_DO(back[0][0], n, back[0][1]), s + 1, s - 1, s + 2, s - 2].filter(v => v >= 0 && v !== s);
        const q = { q: `${who} had some ${th}. ${story} Now ${pr} has <b>${n}</b>. How many ${th} did ${who} have at the start?`, say: `${who} had some ${th}. ${story} Now ${pr} has ${n}. How many ${th} did ${who} have at the start?`, opts: numU(s, cands, 3, 0), ans: String(s), big: 1, why: `Undo each step from the end: ${undoTxt.join(", then ")}.`, key: "s" + who + th + s + ops.flat().join() };
        q.v22 = { kind: "chain", ops, target: n };
        return q;
      }
    }
    if (k <= 8) { /* what time did it start */
      const durs = [30, 60, 90, 120, 150, 180], dur = pick(durs), start = R(2, 18) * 30 + 30, end = start + dur;
      if (end > 690) return this.gen();
      const act = pick(LG9V_ACTS), ans = LG9V_TIME(start);
      const cands = [end + dur, start - 30, start + 30, start - 60, start + 60].filter(v => v >= 60 && v <= 750 && v !== start && v !== end).map(LG9V_TIME);
      const q = { q: `${act} ended at <b>${LG9V_TIME(end)}</b>. It lasted <b>${LG9V_DUR(dur)}</b>. What time did it start?`, say: `${act} ended at ${LG9V_TIME(end)}. It lasted ${LG9V_DUR(dur)}. What time did it start?`, opts: uniq(ans, cands), ans, big: 1, why: `Count back ${LG9V_DUR(dur)} from ${LG9V_TIME(end)} to get ${ans}.`, key: "c" + act + end + dur };
      q.v22 = { kind: "time", end, dur };
      return q;
    }
    /* which step undoes it */
    const t = pick(["add", "sub", "mul", "div"]), a = R(2, 10), ans = LG9V_STEP([LG9V_INV[t], a]);
    const q = { q: `Which step <b>undoes</b> “${LG9V_STEP([t, a])}”?`, say: `Which step undoes ${LG9V_STEP([t, a])}?`, opts: shuffle(["add", "sub", "mul", "div"].map(x => LG9V_STEP([x, a]))), ans, why: t === "add" || t === "sub" ? "Adding and subtracting the same number undo each other." : "Multiplying and dividing by the same number undo each other.", key: "u" + t + a };
    q.v22 = { kind: "undo", t, a };
    return q;
  },
});
TRICK_ADD(9, "logic", "backwards", "Start at the end. Undo the last step first, using its opposite, then check by going forward.");

whyRule(9, "logic", "backwards", (q, picked) => {
  const x = q.v22; if (!x) return null;
  const p = xPlain(picked).trim();
  if (x.kind === "chain") {
    if (!/^\d+$/.test(p)) return null;
    const c = LG9V_CHAIN(+p, x.ops);
    if (!c.ok) return `Start with ${p}: ${c.txt}.`;
    if (c.end === x.target) return null;
    return `Start with ${p}: ${c.txt}. That's not ${x.target}.`;
  }
  if (x.kind === "time") {
    const m = LG9V_PTIME(p); if (m == null) return null;
    if (m === x.end + x.dur) return `${p} is ${LG9V_DUR(x.dur)} after it ended. Count back from ${LG9V_TIME(x.end)}, not forward.`;
    if (m >= x.end) return `${p} is not before ${LG9V_TIME(x.end)}, so it can't be when it started.`;
    return `Starting at ${p}, ${LG9V_DUR(x.dur)} later is ${LG9V_TIME(m + x.dur)}, not ${LG9V_TIME(x.end)}.`;
  }
  if (x.kind === "undo") {
    const m = p.match(/^(add|subtract|multiply by|divide by) (\d+)$/); if (!m) return null;
    const pt = { add: "add", subtract: "sub", "multiply by": "mul", "divide by": "div" }[m[1]], a = x.a;
    if (pt === x.t) return `Doing “${p}” again moves the number even further away, not back.`;
    if (x.t === "add") return `Multiplying or dividing by ${a} doesn't take back the ${a} you added.`;
    if (x.t === "sub") return `Multiplying or dividing by ${a} doesn't give back the ${a} you took away.`;
    if (x.t === "mul") return `Adding or taking away ${a} doesn't undo multiplying by ${a}.`;
    return `Adding or taking away ${a} doesn't undo dividing by ${a}.`;
  }
  return null;
});

/* ====================== PART A · NEW TOPIC 2: Odd & Even Rules ====================== */
const LG9V_ODD = (lo, hi) => { let n; do { n = R(lo, hi); } while (n % 2 === 0); return n; };
const LG9V_EVEN = (lo, hi) => { let n; do { n = R(lo, hi); } while (n % 2); return n; };
const LG9V_OF = (par, lo, hi) => par === "odd" ? LG9V_ODD(lo, hi) : LG9V_EVEN(lo, hi);
const LG9V_RES = (op, pa, pb) => op === "×" ? (pa === "odd" && pb === "odd" ? "odd" : "even") : (pa === pb ? "even" : "odd");
const LG9V_KINDS = [["two odd numbers", "odd", "odd"], ["two even numbers", "even", "even"], ["an odd number and an even number", "odd", "even"]];

topic(9, "logic", {
  id: "parity", title: "Odd & Even Rules", icon: "⚖️", blurb: "Know if an answer is odd or even without working it out.",
  lesson: [
    { t: "Pairs and leftovers", say: "An odd number has one left over when you make pairs. Two odd numbers have two leftovers, and those make a new pair! So odd plus odd is even.", html: table([["even + even", "even"], ["odd + odd", "even"], ["odd + even", "odd"]], ["Add", "Answer is"]) },
    { t: "Times rules", say: "When you multiply, one even number makes the whole answer even. Only odd times odd is odd.", html: table([["even × even", "even"], ["odd × even", "even"], ["odd × odd", "odd"]], ["Multiply", "Answer is"]) },
    { t: "Just look at the end", say: "Is 347 plus 528 odd or even? Only the last digits matter. 7 is odd and 8 is even, and odd plus even is odd.", html: eq("34<b>7</b> + 52<b>8</b> → odd + even = <b>odd</b>") },
  ],
  gen() {
    const k = R(0, 9);
    if (k <= 3) { /* is a ⊕ b odd or even */
      const op = pick(["+", "+", "−", "×"]); let a, b;
      if (op === "×") { a = R(11, 99); b = R(11, 99); } else { a = R(100, 999); b = R(100, 999); if (op === "−" && a < b) [a, b] = [b, a]; if (a === b) b -= 1; }
      const pa = LG9V_PAR(a), pb = LG9V_PAR(b), ans = LG9V_RES(op, pa, pb);
      const q = { q: `Without working it out, is <b>${a} ${op} ${b}</b> odd or even?`, say: `Without working it out, is ${a} ${op === "+" ? "plus" : op === "−" ? "minus" : "times"} ${b} odd or even?`, opts: ["odd", "even"], ans, big: 1, why: `${a} is ${pa} and ${b} is ${pb}, and ${pa} ${op} ${pb} = ${ans}.`, key: "e" + a + op + b };
      q.v22 = { kind: "one", op, pa, pb };
      return q;
    }
    if (k <= 5) { /* which one is odd / even */
      const op = pick(["+", "×"]), want = pick(["odd", "even"]);
      const okPairs = [["odd", "odd"], ["even", "even"], ["odd", "even"], ["even", "odd"]].filter(([x, y]) => LG9V_RES(op, x, y) === want), badPairs = [["odd", "odd"], ["even", "even"], ["odd", "even"], ["even", "odd"]].filter(([x, y]) => LG9V_RES(op, x, y) !== want);
      const lo = op === "×" ? 3 : 11, hi = op === "×" ? 12 : 49, mk = ([x, y]) => `${LG9V_OF(x, lo, hi)} ${op} ${LG9V_OF(y, lo, hi)}`;
      const ans = mk(pick(okPairs)), wr = new Set(); let guard = 0;
      while (wr.size < 3 && guard++ < 50) { const w = mk(pick(badPairs)); if (w !== ans) wr.add(w); }
      if (wr.size < 3) return this.gen();
      const [ea, eb] = ans.split(` ${op} `).map(Number);
      const q = { q: `Which ${op === "+" ? "sum" : "product"} is <b>${want}</b>?`, say: `Which ${op === "+" ? "sum" : "product"} is ${want}?`, opts: shuffle([ans, ...wr]), ans, big: 1, why: `${ea} is ${LG9V_PAR(ea)} and ${eb} is ${LG9V_PAR(eb)}, and ${LG9V_PAR(ea)} ${op} ${LG9V_PAR(eb)} = ${want}.`, key: "w" + ans + want };
      q.v22 = { kind: "which", op };
      return q;
    }
    if (k <= 7) { /* a list of numbers */
      const len = R(4, 6), nums = range(0, len - 1).map(() => R(1, 39)), odds = nums.filter(n => n % 2), ans = odds.length % 2 ? "odd" : "even";
      const list = nums.slice(0, -1).join(", ") + " and " + nums[len - 1];
      const q = { q: `Without adding, is the total of <b>${list}</b> odd or even?`, say: `Without adding, is the total of ${list} odd or even?`, opts: ["odd", "even"], ans, big: 1, why: `There ${odds.length === 1 ? "is" : "are"} ${odds.length} odd ${odds.length === 1 ? "number" : "numbers"}. ${odds.length % 2 ? "One odd is left without a partner, so the total is odd." : "The odd numbers pair up, so the total is even."}`, key: "l" + nums.join() };
      q.v22 = { kind: "list", odds };
      return q;
    }
    /* which could be the sum of ... */
    const [kind, x, y] = pick(LG9V_KINDS), par = LG9V_RES("+", x, y), other = par === "odd" ? "even" : "odd";
    const ans = String(LG9V_OF(par, 10, 99)), wr = new Set(); while (wr.size < 3) { const w = String(LG9V_OF(other, 10, 99)); wr.add(w); }
    const q = { q: `Which number could be the sum of <b>${kind}</b>?`, say: `Which number could be the sum of ${kind}?`, opts: shuffle([ans, ...wr]), ans, big: 1, why: `${cap(kind)} always add up to an ${par} number, and ${ans} is the only ${par} one.`, key: "c" + kind + ans + [...wr].sort().join() };
    q.v22 = { kind: "could", k: kind, par };
    return q;
  },
});
TRICK_ADD(9, "logic", "parity", "Look only at the last digits. Same kinds added make even; one odd and one even make odd.");

whyRule(9, "logic", "parity", (q, picked) => {
  const x = q.v22; if (!x) return null;
  const p = xPlain(picked).trim();
  if (x.kind === "one") return /^(odd|even)$/.test(p) ? `${cap(x.pa)} ${x.op} ${x.pb} can never be ${p}.` : null;
  if (x.kind === "which") {
    const m = p.match(/^(\d+) [+×] (\d+)$/); if (!m) return null;
    const pa = LG9V_PAR(+m[1]), pb = LG9V_PAR(+m[2]);
    return `${p}: ${pa} ${x.op} ${pb} makes ${LG9V_RES(x.op, pa, pb)}.`;
  }
  if (x.kind === "list") {
    const n = x.odds.length;
    if (!n) return `There are no odd numbers here. Even numbers always add up to even.`;
    return `The odd ${n === 1 ? "number here is" : "numbers here are"} ${x.odds.join(", ")}. That's ${n}, so ${n % 2 ? "one is left without a partner" : "they all pair up"}.`;
  }
  if (x.kind === "could") {
    if (!/^\d+$/.test(p)) return null;
    return `${p} is ${LG9V_PAR(+p)}, but ${x.k} always add up to an ${x.par} number.`;
  }
  return null;
});

/* ====================== PART B · existing topics ====================== */

/* ---------- deduce: new categories and clue shapes ---------- */
const LG9V_DCATS = [
  ["toy", [["🪁", "kite"], ["⚽", "ball"], ["🧸", "teddy bear"], ["🪀", "yo-yo"], ["🚂", "toy train"], ["🧩", "puzzle"]]],
  ["instrument", [["🥁", "drum"], ["🎸", "guitar"], ["🎻", "violin"], ["🎺", "trumpet"], ["🎹", "piano"]]],
  ["snack", [["🍎", "apple"], ["🍌", "banana"], ["🥕", "carrot"], ["🍐", "pear"], ["🍪", "cookie"], ["🧀", "cheese stick"]]],
  ["book", [["🚀", "space book"], ["🦖", "dinosaur book"], ["🐙", "ocean book"], ["🌋", "volcano book"], ["🐝", "bug book"]]],
];
addBank(9, "logic", "deduce", 0.25, function () {
  const [cat, items] = pick(LG9V_DCATS), kids = shuffle(LG9V_NAMES).slice(0, 3), it = shuffle(items).slice(0, 3);
  /* kids[0] has it[2] (clue 1 rules out it[0] and it[1]); kids[1] has it[1] (clue 2 rules out it[0]); kids[2] has it[0] */
  const own = { [kids[0]]: 2, [kids[1]]: 1, [kids[2]]: 0 }, listed = shuffle(it.slice()), introKids = shuffle(kids.slice());
  const intro = `${introKids[0]}, ${introKids[1]} and ${introKids[2]} each picked a different ${cat}: the ${listed.map(x => x[1]).slice(0, 2).join(", the ")} and the ${listed[2][1]}.`;
  const c1 = `${kids[0]} did not pick the ${it[0][1]} or the ${it[1][1]}.`, c2 = `${kids[1]} did not pick the ${it[0][1]}.`;
  const vis = passage(`${listed.map(x => x[0]).join(" ")}<br>${intro}<br>1. ${c1}<br>2. ${c2}`);
  const why = `Clue 1 leaves ${kids[0]} only the ${it[2][1]}. Then ${kids[1]} can't have the ${it[0][1]}, so ${kids[1]} has the ${it[1][1]}, and ${kids[2]} has the ${it[0][1]}.`;
  const x = { kids, it: it.map(i => i[1]), own };
  if (Math.random() < 0.5) {
    const ti = R(0, 2), whoHas = kids.find(k => own[k] === ti);
    const q = { q: `Who picked the <b>${it[ti][1]}</b>?`, say: `${intro} Clue 1. ${c1} Clue 2. ${c2} Who picked the ${it[ti][1]}?`, vis, opts: shuffle(kids.slice()), ans: whoHas, big: 1, why, extra: 25, key: "v22w" + kids.join() + it.map(i => i[1]).join() + ti };
    q.v22 = { ...x, ask: "who", item: ti }; return q;
  }
  const kk = R(0, 2), kid = kids[kk], o = i => `<span class="emo" title="${i[1]}">${i[0]}</span> ${i[1]}`;
  const q = { q: `Which ${cat} did <b>${kid}</b> pick?`, say: `${intro} Clue 1. ${c1} Clue 2. ${c2} Which ${cat} did ${kid} pick?`, vis, opts: listed.map(o), ans: o(it[own[kid]]), sayAns: `the ${it[own[kid]][1]}`, why, extra: 25, key: "v22p" + kids.join() + it.map(i => i[1]).join() + kk };
  q.v22 = { ...x, ask: "what", kid }; return q;
});
whyRule(9, "logic", "deduce", (q, picked) => {
  const x = q.v22; if (!x || !x.own) return null;
  const p = xPlain(picked).trim(), [k0, k1] = x.kids;
  if (x.ask === "who") {
    if (!(p in x.own)) return null;
    const item = x.it[x.item];
    if (p === k0 && x.item !== 2) return `Clue 1 says ${p} did not pick the ${item}.`;
    if (p === k1 && x.item === 0) return `Clue 2 says ${p} did not pick the ${item}.`;
    return `${p} ends up with the ${x.it[x.own[p]]}, so ${p} can't have the ${item} too.`;
  }
  const pi = x.it.indexOf(p); if (pi < 0) return null;
  const kid = x.kid, owner = x.kids.find(k => x.own[k] === pi);
  if (kid === k0 && pi !== 2) return `Clue 1 says ${kid} did not pick the ${p}.`;
  if (kid === k1 && pi === 0) return `Clue 2 says ${kid} did not pick the ${p}.`;
  return `The ${p} goes to ${owner}, so ${kid} can't have it.`;
});

/* ---------- statements: more "All", "Every", "If" facts (same shape the topic's rule already reads) ---------- */
(() => {
  const Y = "Yes, for sure", N = "No, for sure", T = "We can't tell";
  const ALL = [
    ["All the kites in the shop are red.", "This kite is from the shop.", "This kite is red.", "This kite is not red.", "Is this kite red?", "Is this kite from the shop?"],
    ["All the apples in the basket are green.", "This apple is from the basket.", "This apple is green.", "This apple is not green.", "Is this apple green?", "Is this apple from the basket?"],
    ["All the kids in the band can play the drums.", "Omar is in the band.", "Omar can play the drums.", "Omar cannot play the drums.", "Can Omar play the drums?", "Is Omar in the band?"],
    ["All the cookies on this plate have raisins.", "Lily's cookie is from this plate.", "Lily's cookie has raisins.", "Lily's cookie does not have raisins.", "Does Lily's cookie have raisins?", "Is Lily's cookie from this plate?"],
    ["All the fish in this tank are striped.", "Splash is a fish in this tank.", "Splash is striped.", "Splash is not striped.", "Is Splash striped?", "Is Splash a fish in this tank?"],
    ["Every player on the blue team got a medal.", "Jada is a player on the blue team.", "Jada got a medal.", "Jada did not get a medal.", "Did Jada get a medal?", "Is Jada a player on the blue team?"],
    ["All the books on the top shelf are about animals.", "This book is from the top shelf.", "This book is about animals.", "This book is not about animals.", "Is this book about animals?", "Is this book from the top shelf?"],
    ["Everyone in the art club has a paintbrush.", "Priya is in the art club.", "Priya has a paintbrush.", "Priya does not have a paintbrush.", "Does Priya have a paintbrush?", "Is Priya in the art club?"],
  ];
  for (const [all, mem, has, lacks, qp, qm] of ALL) STATEMENTS.push([`${all} ${mem}`, qp, Y], [`${all} ${has}`, qm, T], [`${all} ${lacks}`, qm, N]);
  const IF = [
    ["If it is windy, Ravi flies his kite.", "It is windy today.", "Ravi is flying his kite today.", "It is not windy today.", "Ravi is not flying his kite today.", "Is Ravi flying his kite today?", "Is it windy today?"],
    ["If the oven timer beeps, the muffins are done.", "The oven timer beeped.", "The muffins are done.", "The oven timer did not beep.", "The muffins are not done.", "Are the muffins done?", "Did the oven timer beep?"],
    ["If a number ends in 5, it is odd.", "Mia's number ends in 5.", "Mia's number is odd.", "Mia's number does not end in 5.", "Mia's number is even.", "Is Mia's number odd?", "Does Mia's number end in 5?"],
    ["If the baby is sleepy, she yawns.", "The baby is sleepy.", "The baby is yawning.", "The baby is not sleepy.", "The baby is not yawning.", "Is the baby yawning?", "Is the baby sleepy?"],
    ["If Theo finishes his chores, he gets to play outside.", "Theo finished his chores.", "Theo got to play outside.", "Theo did not finish his chores.", "Theo did not get to play outside.", "Did Theo get to play outside?", "Did Theo finish his chores?"],
  ];
  for (const [rule, p, q, np, nq, qq, qp] of IF) STATEMENTS.push([`${rule} ${p}`, qq, Y], [`${rule} ${q}`, qp, T], [`${rule} ${nq}`, qp, N], [`${rule} ${np}`, qq, T]);
})();

/* ---------- letterseq: taking-turns jumps, two lines at once, letter-number pairs ---------- */
addBank(9, "logic", "letterseq", 0.3, function () {
  const L = i => ALPHA[i], k = R(0, 2), fill = () => pick(ALPHA.split(""));
  if (k === 0) {
    const [a, b] = pick([[1, 2], [2, 1], [1, 3], [3, 1], [2, 3]]), s = R(0, 25 - (3 * a + 2 * b));
    const seq = [s, s + a, s + a + b, s + 2 * a + b, s + 2 * a + 2 * b], ai = s + 3 * a + 2 * b, ans = L(ai);
    const cands = [ai + 1, ai - 1, seq[4] + b, ai + 2].filter(i => i >= 0 && i <= 25 && i !== ai).map(L);
    const q = { q: "What letter comes next?", vis: train([...seq.map(L), "?"]), opts: uniq(ans, cands, fill), ans, big: 1, why: `The jumps take turns: +${a}, +${b}, +${a}, +${b}, so next is +${a}: ${ans}.`, key: "v22t" + seq.map(L).join("") };
    q.v22 = { kind: "turns", last: seq[4], next: a, a, b }; return q;
  }
  if (k === 1) {
    const f = R(0, 5), bk = R(20, 25), six = Math.random() < 0.5;
    const all = [f, bk, f + 1, bk - 1, f + 2, bk - 2, f + 3], shown = all.slice(0, six ? 6 : 5), ai = all[shown.length], ans = L(ai);
    const fwdTurn = shown.length % 2 === 0;
    const cands = [ai + 1, ai - 1, fwdTurn ? bk - 3 : f + 3, shown[shown.length - 1] + (fwdTurn ? -1 : 1)].filter(i => i >= 0 && i <= 25 && i !== ai).map(L);
    const line = shown.filter((_, i) => i % 2 === (fwdTurn ? 0 : 1)).map(L);
    const q = { q: "What letter comes next?", say: `What letter comes next? ${shown.map(L).join(", ")}, then what?`, vis: train([...shown.map(L), "?"]), opts: uniq(ans, cands, fill), ans, big: 1, why: `Two patterns take turns: one goes forward from ${L(f)}, the other goes back from ${L(bk)}. The next letter continues ${line.join(", ")}: ${ans}.`, key: "v22i" + shown.map(L).join("") };
    q.v22 = { kind: "inter", line, dir: fwdTurn ? 1 : -1 }; return q;
  }
  const step = pick([1, 2, 3]), s = R(0, 25 - 4 * step), seq = range(0, 2).map(i => s + step * i), ai = s + 3 * step, g = i => L(i) + (i + 1);
  const ans = g(ai), cands = [L(ai) + ai, L(ai) + (ai + 2), L(ai + 1) + (ai + 2), L(ai - 1) + (ai + 1)].filter(c => c !== ans && /^[A-Z]\d+$/.test(c));
  const q = { q: "What comes next?", say: `What comes next? ${seq.map(g).join(", ")}, then what?`, vis: train([...seq.map(g), "?"]), opts: uniq(ans, cands, () => { const i = R(0, 25); return g(i); }), ans, big: 1, why: `Each letter moves ${step} forward, and each number shows that letter's spot in the alphabet: ${L(ai)} is letter ${ai + 1}.`, key: "v22n" + seq.map(g).join("") };
  q.v22 = { kind: "num", last: seq[seq.length - 1], step }; return q;
});
whyRule(9, "logic", "letterseq", (q, picked) => {
  const x = q.v22; if (!x || !x.kind) return null;
  const p = xPlain(picked).trim(), I = c => ALPHA.indexOf(c);
  if (x.kind === "turns") {
    if (!/^[A-Z]$/.test(p)) return null;
    const j = I(p) - x.last;
    if (j <= 0) return `${p} doesn't move forward from ${ALPHA[x.last]}, but every jump goes forward.`;
    return `From ${ALPHA[x.last]} to ${p} is a jump of ${j}, but the jumps take turns +${x.a}, +${x.b}, so the next jump is +${x.next}.`;
  }
  if (x.kind === "inter") {
    if (!/^[A-Z]$/.test(p)) return null;
    return `The letters in every other spot go ${x.line.join(", ")}, and ${p} doesn't come next in that line.`;
  }
  if (x.kind === "num") {
    const m = p.match(/^([A-Z])(\d+)$/); if (!m) return null;
    const li = I(m[1]), want = x.last + x.step;
    if (li !== want) { const d = li - x.last; return d === 0 ? `${m[1]} is the same letter as before, but each letter moves ${x.step} forward.` : `From ${ALPHA[x.last]} to ${m[1]} is ${Math.abs(d)} ${d > 0 ? "forward" : "back"}, but each letter moves ${x.step} forward.`; }
    return `${m[1]} is letter ${li + 1} of the alphabet, not ${m[2]}.`;
  }
  return null;
});

/* ---------- cipher: mirror code (A↔Z) and single-letter shifts ---------- */
const LG9V_MIR = w => w.split("").map(c => ALPHA[25 - ALPHA.indexOf(c)]).join("");
const LG9V_MIRVIS = () => codeRow(range(0, 12).map(i => [ALPHA[i], ALPHA[25 - i]]));
addBank(9, "logic", "cipher", 0.35, function () {
  const k = R(0, 2);
  if (k <= 1) {
    const w = pick(SHIFTWORDS), enc = LG9V_MIR(w), others = shuffle(SHIFTWORDS.filter(x => x !== w && x.length === w.length));
    if (others.length < 2) return null;
    if (k === 0) {
      const q = { q: `Mirror code: A↔Z, B↔Y, C↔X and so on. Decode <b>${enc}</b>!`, say: `In the mirror code, A swaps with Z, B with Y, C with X, and so on. Decode ${enc.split("").join(" ")}.`, vis: eq(enc) + LG9V_MIRVIS(), opts: uniq(w, [enc, others[0], others[1], others[2]].filter(Boolean)), ans: w, big: 1, why: `Swap each letter with its mirror letter: ${enc.split("").map(c => `${c}→${LG9V_MIR(c)}`).join(", ")}.`, extra: 20, key: "v22md" + w };
      q.v22 = { kind: "mirdec", enc, w }; return q;
    }
    const q = { q: `Write <b>${w}</b> in the mirror code (A↔Z, B↔Y, C↔X…).`, say: `Write ${w.split("").join(" ")} in the mirror code. A swaps with Z, B with Y, and so on.`, vis: LG9V_MIRVIS(), opts: uniq(enc, [shift(w, 1), LG9V_MIR(others[0]), LG9V_MIR(others[1]), shift(enc, 1)]), ans: enc, big: 1, sayAns: enc.split("").join(" "), why: `${w.split("").map(c => `${c}→${LG9V_MIR(c)}`).join(", ")}.`, extra: 20, key: "v22me" + w };
    q.v22 = { kind: "mirenc", w }; return q;
  }
  const kk = pick([1, 2, 3, 4, 5]), back = Math.random() < 0.4, c = pick(ALPHA.split("")), ans = shift(c, back ? -kk : kk);
  const cands = [shift(c, back ? -kk + 1 : kk + 1), shift(c, back ? -kk - 1 : kk - 1), shift(c, back ? kk : -kk), c].filter(x => x !== ans);
  const q = back
    ? { q: `In a code, each letter moved <b>${kk}</b> forward. The code letter is <b>${c}</b>. What was the real letter?`, say: `In a code, each letter moved ${kk} forward. The code letter is ${c}. What was the real letter?`, vis: `<div class="abc-strip">${ALPHA.split("").map(l => `<span>${l}</span>`).join("")}</div>`, opts: uniq(ans, cands, () => pick(ALPHA.split(""))), ans, big: 1, why: `Move ${c} back ${kk} to undo the code: ${ans}.`, key: "v22lb" + c + kk }
    : { q: `In a code, each letter moves <b>${kk}</b> forward. What does <b>${c}</b> become?`, say: `In a code, each letter moves ${kk} forward. What does ${c} become?`, vis: `<div class="abc-strip">${ALPHA.split("").map(l => `<span>${l}</span>`).join("")}</div>`, opts: uniq(ans, cands, () => pick(ALPHA.split(""))), ans, big: 1, why: `Count ${kk} forward from ${c}${(ALPHA.indexOf(c) + kk) > 25 ? ", wrapping from Z back to A" : ""}: ${ans}.`, key: "v22lf" + c + kk };
  q.v22 = { kind: "letter", c, kk, back }; return q;
});
whyRule(9, "logic", "cipher", (q, picked) => {
  const x = q.v22; if (!x || !x.kind) return null;
  const p = xPlain(picked).trim(); if (!/^[A-Z]+$/.test(p)) return null;
  if (x.kind === "mirdec") {
    if (p === x.enc) return `${p} is the secret code itself. You still need to swap each letter.`;
    return `In the mirror code, ${p} would be written ${LG9V_MIR(p)}, not ${x.enc}.`;
  }
  if (x.kind === "mirenc") return `${p} is the mirror code for ${LG9V_MIR(p)}, not ${x.w}.`;
  if (x.kind === "letter") {
    if (p.length !== 1) return null;
    const from = x.back ? p : x.c, to = x.back ? x.c : p, d = (ALPHA.indexOf(to) - ALPHA.indexOf(from) + 26) % 26;
    const moved = d === 0 ? "doesn't move at all" : d <= 13 ? `moves ${d} forward` : `moves ${26 - d} back`;
    return x.back ? `Going from ${p} to ${x.c} ${moved}, but the code moves ${x.kk} forward.` : `Going from ${x.c} to ${p} ${moved}, but the code moves ${x.kk} forward.`;
  }
  return null;
});

/* ---------- sudoku: you need the row AND the column ---------- */
addBank(9, "logic", "sudoku", 0.2, function () {
  const g = latin4(), tr = R(0, 3), tc = R(0, 3), ans = g[tr][tc];
  const rowO = [0, 1, 2, 3].filter(c => c !== tc), colO = [0, 1, 2, 3].filter(r => r !== tr);
  const rs = shuffle(rowO).slice(0, R(1, 2)), rowVals = rs.map(c => g[tr][c]);
  const need = [1, 2, 3, 4].filter(v => v !== ans && !rowVals.includes(v));
  const cs = need.map(v => colO.find(r => g[r][tc] === v));
  if (cs.length < 2 && Math.random() < 0.6) { const extra = colO.find(r => !cs.includes(r) && rowVals.includes(g[r][tc])); if (extra != null) cs.push(extra); }
  if (cs.length > 2) return null;
  const shown = g.map(r => r.map(() => 0));
  rs.forEach(c => shown[tr][c] = g[tr][c]); cs.forEach(r => shown[r][tc] = g[r][tc]);
  for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) if (r !== tr && c !== tc && Math.random() < 0.5) shown[r][c] = g[r][c];
  const colVals = cs.map(r => g[r][tc]);
  const q = { q: "Check the row <b>and</b> the column. Which number goes in the <b>?</b> box?", say: "Every row and column needs 1, 2, 3 and 4. Check the row and the column. Which number goes in the question mark box?", vis: sudoku(shown, [tr, tc]), opts: ["1", "2", "3", "4"], ans: String(ans), big: 1, why: `The row has ${rowVals.join(" and ")}, and the column has ${colVals.join(" and ")}. The only number left is ${ans}.`, extra: 15, key: "v22" + shown.flat().join("") + tr + tc };
  q.v22 = { row: rowVals, col: colVals }; return q;
});
whyRule(9, "logic", "sudoku", (q, picked) => {
  const x = q.v22; if (!x || !x.row) return null;
  const p = +xPlain(picked);
  if (x.row.includes(p)) return `There is already a ${p} in this row.`;
  if (x.col.includes(p)) return `There is already a ${p} in this column.`;
  return null;
});

/* ---------- chance: compare two colors, "out of" chances, number cubes ---------- */
const LG9V_DIE = [["a 7", 0], ["a number bigger than 6", 0], ["a 0", 0], ["a number from 1 to 6", 6], ["a number less than 7", 6], ["a number bigger than 0", 6], ["a 6", 1], ["a 3", 1], ["a 1", 1], ["a 5 or a 6", 2], ["a number less than 3", 2], ["a 2 or a 3", 2], ["a number bigger than 1", 5], ["a number less than 6", 5], ["a number bigger than 2", 4], ["any number except 4", 5], ["a number less than 5", 4]];
addBank(9, "logic", "chance", 0.3, function () {
  const k = R(0, 9);
  if (k <= 4) {
    const cols = shuffle(MARBLE_COLS).slice(0, R(2, 3)), na = R(1, 7), nb = Math.random() < 0.3 ? na : R(1, 7), counts = [na, nb, R(1, 5)].slice(0, cols.length);
    const bag = cols.map((c, i) => [c[0], counts[i]]), [A, B] = [cols[0][1], cols[1][1]];
    const ans = na > nb ? "more likely" : na < nb ? "less likely" : "just as likely";
    const q = { q: `You pick one marble without looking. Compared with picking <b>${B}</b>, picking <b>${A}</b> is…`, say: `You pick one marble without looking. Compared with picking ${B}, picking ${A} is what?`, vis: marbles(shuffle(bag)), opts: ["more likely", "less likely", "just as likely"], ans, big: 1, why: `There ${na === 1 ? "is" : "are"} ${na} ${A} and ${nb} ${B}.`, key: "v22c" + bag.map(b => b[0] + b[1]).join() };
    q.v22 = { kind: "cmp", A, B, na, nb }; return q;
  }
  if (k <= 7) {
    const cols = shuffle(MARBLE_COLS).slice(0, R(2, 3)), counts = cols.map(() => R(1, 6)), bag = cols.map((c, i) => [c[0], counts[i]]), tot = counts.reduce((s, v) => s + v, 0);
    const ci = R(0, cols.length - 1), n = counts[ci], col = cols[ci][1], f = (a, b) => `${a} out of ${b}`, ans = f(n, tot);
    const cands = [tot - n > 0 && tot - n !== tot ? f(n, tot - n) : null, tot - n !== n ? f(tot - n, tot) : null, f(n + 1, tot), f(n, tot + 1)].filter(c => c && c !== ans);
    const q = { q: `You pick one marble without looking. What is the chance of picking <b>${col}</b>?`, say: `You pick one marble without looking. What is the chance of picking ${col}?`, vis: marbles(bag), opts: uniq(ans, cands), ans, why: `${n} of the ${tot} marbles ${n === 1 ? "is" : "are"} ${col}.`, key: "v22o" + bag.map(b => b[0] + b[1]).join() + ci };
    q.v22 = { kind: "outof", n, tot, col }; return q;
  }
  const [ev, c] = pick(LG9V_DIE), ans = c === 0 ? "impossible" : c === 6 ? "certain" : c > 3 ? "likely" : "unlikely";
  const q = { q: `You roll a number cube with sides 1 to 6. Rolling <b>${ev}</b> is…`, say: `You roll a number cube with sides 1 to 6. Rolling ${ev} is what?`, vis: bigEmo("🎲"), opts: LIKELY, ans, big: 1, why: c === 0 ? "No side of the cube shows that." : c === 6 ? "Every side of the cube works." : `${c} of the 6 sides ${c === 1 ? "works" : "work"}.`, key: "v22d" + ev };
  q.v22 = { kind: "die", c }; return q;
});
whyRule(9, "logic", "chance", (q, picked) => {
  const x = q.v22; if (!x || !x.kind) return null;
  const p = xPlain(picked).trim();
  if (x.kind === "cmp") {
    const { A, B, na, nb } = x;
    if (p === "just as likely") return `There ${na === 1 ? "is" : "are"} ${na} ${A} but ${nb} ${B}, so they aren't equally likely.`;
    if (na === nb) return `There ${na === 1 ? "is" : "are"} ${na} of each color, so neither one is ${p === "more likely" ? "more" : "less"} likely.`;
    if (p === "more likely") return `There are fewer ${A} (${na}) than ${B} (${nb}), so ${A} can't be more likely.`;
    if (p === "less likely") return `There are more ${A} (${na}) than ${B} (${nb}), so ${A} isn't less likely.`;
    return null;
  }
  if (x.kind === "outof") {
    const m = p.match(/^(\d+) out of (\d+)$/); if (!m) return null;
    const a = +m[1], b = +m[2];
    if (b !== x.tot) return b === x.tot - x.n ? `${b} counts only the marbles that aren't ${x.col}. There are ${x.tot} marbles in all.` : `There are ${x.tot} marbles in all, not ${b}.`;
    if (a === x.tot - x.n) return `${a} is how many marbles are not ${x.col}.`;
    if (a !== x.n) return `There ${x.n === 1 ? "is" : "are"} ${x.n} ${x.col} ${x.n === 1 ? "marble" : "marbles"}, not ${a}.`;
    return null;
  }
  if (x.kind === "die") {
    const c = x.c;
    if (!LIKELY.includes(p)) return null;
    if (c === 0) return "No side of the cube shows that, so it can't happen at all.";
    if (c === 6) return "Every side of the cube works, so it will happen for sure.";
    if (p === "impossible") return `${c} of the 6 sides ${c === 1 ? "works" : "work"}, so it can happen.`;
    if (p === "certain") return `Only ${c} of the 6 sides ${c === 1 ? "works" : "work"}, so it isn't certain.`;
    if (p === "likely") return `Only ${c} of the 6 sides ${c === 1 ? "works" : "work"}. That's less than half.`;
    if (p === "unlikely") return `${c} of the 6 sides work. That's more than half.`;
  }
  return null;
});

/* ---------- loops: doubling loops, two-line loops, "how many times?" ---------- */
addBank(9, "logic", "loops", 0.35, function () {
  const k = R(0, 9);
  if (k <= 1) {
    const s = R(1, 6), n = R(2, 4), path = range(0, n).map(i => s * 2 ** i), end = path[n];
    const lines = [`start at ${s}`, `repeat ${n} times:`, `    double it`];
    const q = { q: "Run the code. What number do you end on?", say: `Start at ${s}. Repeat ${n} times, double it. What number do you end on?`, vis: codeBlock(lines), opts: numU(end, [path[n - 1], s * 2 ** (n + 1), s + 2 * n, s * 2 * n].filter(v => v !== end), 3, 1), ans: String(end), big: 1, why: `${path.join(" → ")}.`, extra: 10, key: "v22d" + lines.join() };
    q.v22 = { kind: "dbl", s, n, path }; return q;
  }
  if (k <= 6) {
    const s = R(0, 12), n = R(2, 4), a = R(3, 8), b = R(1, a - 1), end = s + n * (a - b);
    const lines = [`start at ${s}`, `repeat ${n} times:`, `    add ${a}`, `    subtract ${b}`];
    const q = { q: "Run the code. What number do you end on?", say: `Start at ${s}. Repeat ${n} times: add ${a}, then subtract ${b}. What number do you end on?`, vis: codeBlock(lines), opts: numU(end, [s + n * a, s + n * a - b, end + (a - b), s + a - b], 3, 0), ans: String(end), big: 1, why: `Each pass adds ${a} and takes away ${b}, so it goes up ${a - b}. ${s} + ${n} × ${a - b} = ${end}.`, extra: 10, key: "v22t" + lines.join() };
    q.v22 = { kind: "two", s, n, a, b }; return q;
  }
  const s = R(0, 10), n = R(2, 6), a = R(2, 7), E = s + n * a;
  const q = { q: `The code starts at <b>${s}</b> and ends at <b>${E}</b>. How many times did the loop repeat?`, say: `Start at ${s}. Repeat some times, add ${a}. The code ends at ${E}. How many times did the loop repeat?`, vis: codeBlock([`start at ${s}`, `repeat ? times:`, `    add ${a}`]), opts: numU(n, [n + 1, n - 1, n + 2, a], 2, 1), ans: String(n), big: 1, why: `It went up ${E} − ${s} = ${E - s}, and ${E - s} ÷ ${a} = ${n}.`, extra: 10, key: "v22h" + s + a + E };
  q.v22 = { kind: "times", s, a, E }; return q;
});
whyRule(9, "logic", "loops", (q, picked) => {
  const x = q.v22; if (!x || !x.kind) return null;
  const p = +xPlain(picked); if (!Number.isFinite(p)) return null;
  const passes = k => `${k} ${k === 1 ? "pass" : "passes"}`;
  if (x.kind === "dbl") {
    const k = x.path.indexOf(p);
    if (k >= 0) return `${p} is where you are after ${passes(k)}, but the loop runs ${x.n} times.`;
    if (p === x.s * 2 ** (x.n + 1)) return `${p} doubles one time too many. The loop runs ${x.n} times.`;
    if (p === x.s + 2 * x.n) return `${p} adds 2 each time, but the loop doubles the number.`;
    if (p === x.s * 2 * x.n) return `${p} is ${x.s} × ${2 * x.n}. Doubling ${x.n} times means × 2, then × 2 again, ${x.n} times in all.`;
    return null;
  }
  if (x.kind === "two") {
    const { s, n, a, b } = x;
    if (p === s + n * a) return `${p} forgets the “subtract ${b}” line, which runs every pass too.`;
    if (p === s + n * a - b) return `${p} only subtracts ${b} once, but it is inside the loop, so it happens ${n} times.`;
    for (let k = 0; k <= n + 2; k++) if (k !== n && p === s + k * (a - b)) return `${p} is where you are after ${passes(k)}, but the loop runs ${n} times.`;
    if (p < s) return `Each pass goes up ${a - b} in all, so you can't end below ${s}.`;
    return `Each pass goes up ${a - b}, so ${n} passes go up ${n * (a - b)}, not ${p - s}.`;
  }
  if (x.kind === "times") {
    if (p < 0) return null;
    return `Repeating ${p} ${p === 1 ? "time" : "times"} ends at ${x.s} + ${p} × ${x.a} = ${x.s + p * x.a}, not ${x.E}.`;
  }
  return null;
});

/* ---------- balancemath: sharing out and taking away ---------- */
const LG9V_FR = [["🍉", "watermelon", "watermelons"], ["🍍", "pineapple", "pineapples"], ["🥥", "coconut", "coconuts"], ["🍎", "apple", "apples"], ["🍋", "lemon", "lemons"], ["🍓", "strawberry", "strawberries"]];
addBank(9, "logic", "balancemath", 0.35, function () {
  const idx = shuffle(range(0, LG9V_FR.length - 1)).slice(0, 3).sort((u, v) => u - v);
  if (Math.random() < 0.5) {
    const [A, B] = [LG9V_FR[idx[0]], LG9V_FR[idx[1]]], x = R(2, 4), kk = R(2, 5), y = x * kk;
    const q = { q: `${x} ${A[0]} balance ${y} ${B[0]}. How many ${B[0]} balance <b>1</b> ${A[0]}?`, say: `${x} ${A[2]} balance ${y} ${B[2]}. How many ${B[2]} balance 1 ${A[1]}?`, vis: eq(`${x} ${A[0]} = ${y} ${B[0]}`), opts: numU(kk, [y, y - x, x, kk + 1, kk - 1].filter(v => v !== kk), 2, 1), ans: String(kk), big: 1, why: `Share ${y} ${B[2]} equally among ${x} ${A[2]}: ${y} ÷ ${x} = ${kk}.`, key: "v22s" + A[0] + B[0] + x + y };
    q.v22 = { kind: "div", A, B, x, y }; return q;
  }
  const C3 = LG9V_FR[idx[2]], [A, B] = shuffle([LG9V_FR[idx[0]], LG9V_FR[idx[1]]]), a = R(3, 8), b = R(2, 7), t = a + b;
  const q = { q: `1 ${A[0]} and 1 ${B[0]} together balance ${t} ${C3[0]}. 1 ${A[0]} balances ${a} ${C3[0]}. How many ${C3[0]} balance <b>1</b> ${B[0]}?`, say: `1 ${A[1]} and 1 ${B[1]} together balance ${t} ${C3[2]}. 1 ${A[1]} balances ${a} ${C3[2]}. How many ${C3[2]} balance 1 ${B[1]}?`, vis: eq(`${A[0]} + ${B[0]} = ${t} ${C3[0]}`) + eq(`${A[0]} = ${a} ${C3[0]}`), opts: numU(b, [t, a, t + a, b + 1, b - 1].filter(v => v !== b), 2, 1), ans: String(b), big: 1, why: `Take the ${A[1]}'s ${a} ${C3[2]} away from ${t}: ${t} − ${a} = ${b}.`, key: "v22m" + A[0] + B[0] + C3[0] + a + b };
  q.v22 = { kind: "sub", A, B, C: C3, a, t }; return q;
});
whyRule(9, "logic", "balancemath", (q, picked) => {
  const x = q.v22; if (!x || !x.kind) return null;
  const p = +xPlain(picked); if (!Number.isFinite(p)) return null;
  if (x.kind === "div") return `If 1 ${x.A[1]} were ${p} ${p === 1 ? x.B[1] : x.B[2]}, then ${x.x} ${x.A[2]} would be ${x.x * p} ${x.B[2]}, not ${x.y}.`;
  if (x.kind === "sub") return `If 1 ${x.B[1]} were ${p} ${p === 1 ? x.C[1] : x.C[2]}, the two together would be ${x.a} + ${p} = ${x.a + p}, not ${x.t}.`;
  return null;
});

/* ---------- magicsq: find the magic total; bigger magic squares ---------- */
addBank(9, "logic", "magicsq", 0.35, function () {
  const v = magicVariant();
  if (Math.random() < 0.45) {
    const { g, total } = v, d = R(0, 2), cells = [[0, d], [1, (d + 1) % 3]];
    const fullRow = [0, 1, 2].find(r => !cells.some(c => c[0] === r)), part = g[0].filter((_, c) => c !== d).reduce((s, n) => s + n, 0);
    const q = { q: "Every row and column adds up to the same number. What is that number?", vis: magicGrid(g, [[-1, -1], ...cells]), opts: numU(total, [part, total + 1, total - 1, total + 3], 3, 1), ans: String(total), big: 1, why: `Add a full row: ${g[fullRow].join(" + ")} = ${total}.`, extra: 10, key: "v22t" + g.flat().join() + d };
    q.v22 = { kind: "total", part, row: g[fullRow] }; return q;
  }
  const kk = R(0, 3), g = v.g.map(r => r.map(n => (n - (v.total - 15) / 3) * 2 + kk)), total = 30 + 3 * kk, tr = R(0, 2), tc = R(0, 2), ans = g[tr][tc];
  const r2 = (tr + 1 + R(0, 1)) % 3, c2 = (tc + 1 + R(0, 1)) % 3;
  const q = { q: `Every row and column adds up to <b>${total}</b>. What number goes in the <b>?</b> box?`, say: `Every row and column adds up to ${total}. What number goes in the question mark box?`, vis: magicGrid(g, [[tr, tc], [r2, c2]]), opts: numU(ans, [ans + 1, ans - 1, ans + 2, total - ans], 3, 0), ans: String(ans), big: 1, why: `The row adds to ${total}: ${total} − ${g[tr].filter((_, c) => c !== tc).join(" − ")} = ${ans}.`, extra: 15, key: "v22m" + g.flat().join() + tr + tc + r2 + c2 };
  q.v22 = { kind: "miss", have: g[tr].filter((_, c) => c !== tc), total }; return q;
});
whyRule(9, "logic", "magicsq", (q, picked) => {
  const x = q.v22; if (!x || !x.kind) return null;
  const p = +xPlain(picked); if (!Number.isFinite(p)) return null;
  if (x.kind === "total") {
    if (p === x.part) return `${p} only adds the numbers you can see in a row with a gap.`;
    return `Check a full row: ${x.row.join(" + ")} doesn't make ${p}.`;
  }
  if (x.kind === "miss") return `With ${p}, that row would add up to ${x.have.join(" + ")} + ${p} = ${x.have[0] + x.have[1] + p}, not ${x.total}.`;
  return null;
});

/* ---------- ages: backwards in time, when someone was born, twice as old later, twins ---------- */
addBank(9, "logic", "ages", 0.3, function () {
  const [p1, p2] = shuffle(LG9V_NAMES).slice(0, 2), k = R(0, 3);
  if (k === 0) {
    const now = R(4, 11), y = R(2, 7), N = now + y;
    const q = { q: `In ${y} years, ${p1} will be ${N}. How old is ${p1} now?`, opts: numU(now, [N + y, N, now + 1, now - 1].filter(v => v !== now), 2, 1), ans: String(now), big: 1, why: `Go back ${y} years: ${N} − ${y} = ${now}.`, key: "v22a" + p1 + N + y };
    q.v22 = { kind: "back", who: p1, y, N }; return q;
  }
  if (k === 1) {
    const a = R(3, 10), d = R(2, 9);
    const q = { q: `${p1} is ${a}. ${p2} is ${d} years older than ${p1}. How old was ${p2} when ${p1} was born?`, opts: numU(d, [a + d, a, d + 1, d - 1].filter(v => v !== d), 2, 1), ans: String(d), big: 1, why: `When ${p1} was born, ${p1} was 0, and ${p2} is always ${d} years older.`, key: "v22b" + p1 + p2 + a + d };
    q.v22 = { kind: "born", p1, p2, a, d }; return q;
  }
  if (k === 2) {
    const a = R(3, 9), y = R(2, 6), ans = 2 * a + y;
    const q = { q: `${p2} is twice as old as ${p1}. ${p1} is ${a}. How old will ${p2} be in ${y} years?`, opts: numU(ans, [2 * (a + y), 2 * a, a + y, ans + 1].filter(v => v !== ans), 2, 1), ans: String(ans), big: 1, why: `${p2} is ${a} × 2 = ${2 * a} now, and ${2 * a} + ${y} = ${ans}.`, key: "v22c" + p1 + p2 + a + y };
    q.v22 = { kind: "twice", p1, p2, a, y }; return q;
  }
  const each = R(4, 12), S = 2 * each;
  const q = { q: `${p1} and ${p2} are twins. Their ages add up to ${S}. How old is each twin?`, opts: numU(each, [S, S - 2, each + 1, each - 1, each + 2].filter(v => v !== each), 2, 1), ans: String(each), big: 1, why: `Twins are the same age, so split ${S} in half: ${S} ÷ 2 = ${each}.`, key: "v22d" + p1 + p2 + S };
  q.v22 = { kind: "twins", S }; return q;
});
whyRule(9, "logic", "ages", (q, picked) => {
  const x = q.v22; if (!x || !x.kind) return null;
  const p = +xPlain(picked); if (!Number.isFinite(p)) return null;
  if (x.kind === "back") return p === x.N ? `${p} is how old ${x.who} will be in ${x.y} years, not now.` : `If ${x.who} were ${p} now, ${x.who} would be ${p + x.y} in ${x.y} years, not ${x.N}.`;
  if (x.kind === "born") {
    if (p === x.a + x.d) return `${p} is how old ${x.p2} is now. When ${x.p1} was born, ${x.p1} was 0.`;
    if (p === x.a) return `${p} is ${x.p1}'s age now, not ${x.p2}'s age back then.`;
    return `${x.p2} is always ${x.d} years older, so when ${x.p1} was 0, ${x.p2} wasn't ${p}.`;
  }
  if (x.kind === "twice") {
    if (p === 2 * (x.a + x.y)) return `${p} doubles ${x.p1}'s future age. In ${x.y} years, ${x.p2} just adds ${x.y} like everyone.`;
    if (p === 2 * x.a) return `${p} is ${x.p2}'s age now, not in ${x.y} years.`;
    if (p === x.a + x.y) return `${p} is ${x.p1}'s age in ${x.y} years, not ${x.p2}'s.`;
    return `${x.p2} is ${2 * x.a} now, so in ${x.y} years ${x.p2} won't be ${p}.`;
  }
  if (x.kind === "twins") return p === x.S ? `${p} is both twins' ages added together, not one twin's age.` : `If each twin were ${p}, their ages would add up to ${2 * p}, not ${x.S}.`;
  return null;
});

/* ---------- twostep: growing jumps, ×2 then +, taking turns adding ---------- */
addBank(9, "logic", "twostep", 0.4, function () {
  const k = R(0, 2); let seq, why, nextTxt, x;
  if (k === 0) {
    const s = R(1, 10), d0 = R(1, 3), inc = pick([1, 2]); seq = [s]; for (let i = 0; i < 5; i++) seq.push(seq[i] + d0 + inc * i);
    const nj = d0 + inc * 4; why = `The jumps grow by ${inc} each time: ${range(0, 3).map(i => "+" + (d0 + inc * i)).join(", ")}, so next is +${nj}.`; x = { kind: "add", next: nj, txt: `the jumps grow by ${inc}, so the next jump is +${nj}` };
  } else if (k === 1) {
    const s = R(1, 4), c = R(1, 3); seq = [s]; for (let i = 0; i < 5; i++) seq.push(i % 2 ? seq[i] + c : seq[i] * 2);
    why = `The rule takes turns: ×2, then +${c}.`; x = { kind: "mul", c };
  } else {
    let a = R(1, 6), b = R(1, 6); if (a === b) b = a === 6 ? 1 : a + 1; const s = R(1, 12); seq = [s]; for (let i = 0; i < 6; i++) seq.push(seq[i] + (i % 2 ? b : a));
    why = `The jumps take turns: +${a}, +${b}, +${a}, +${b}…`; x = { kind: "add", next: a, txt: `the jumps take turns +${a}, +${b}, so the next jump is +${a}` };
  }
  const show = seq.slice(0, -1), ans = seq[seq.length - 1], prev = show[show.length - 1];
  x.prev = prev; x.ans = ans;
  const q = { q: "What number comes next?", vis: train([...show, "?"]), opts: numU(ans, [ans + 1, ans - 1, prev + (prev - show[show.length - 2]), ans + 2], 4, 0), ans: String(ans), big: 1, why, key: "v22" + k + seq.join() };
  q.v22 = x; return q;
});
whyRule(9, "logic", "twostep", (q, picked) => {
  const x = q.v22; if (!x || !x.kind) return null;
  const p = +xPlain(picked); if (!Number.isFinite(p)) return null;
  const j = p - x.prev, jt = j > 0 ? `a jump of +${j}` : j < 0 ? `going down ${-j}` : "no jump at all";
  if (x.kind === "add") return `From ${x.prev} to ${p} is ${jt}, but ${x.txt}.`;
  /* mul: the last shown step was +c, so the next step is ×2 */
  return `The next step is ×2, and ${x.prev} × 2 isn't ${p}.`;
});

/* ---------- combos: three groups, line-ups, working out a missing group ---------- */
const LG9V_C3 = [["A pizza shop", "crusts", "cheeses", "toppings", "pizzas"], ["A taco truck", "shells", "fillings", "salsas", "tacos"], ["A smoothie stand", "fruits", "milks", "toppings", "smoothies"], ["A dress-up box", "hats", "capes", "masks", "costumes"], ["A sundae bar", "ice cream flavors", "sauces", "sprinkles", "sundaes"]];
const LG9V_C2 = [["shirts", "pants", "outfits"], ["bread kinds", "fillings", "sandwiches"], ["cup colors", "drinks", "cups of juice"], ["kite shapes", "tail colors", "kites"]];
addBank(9, "logic", "combos", 0.3, function () {
  const k = R(0, 2);
  if (k === 0) {
    const [who, A, B, Cc, T] = pick(LG9V_C3), a = R(2, 4), b = R(2, 4), c = R(2, 4), ans = a * b * c;
    const q = { q: `${who} has <b>${a} ${A}</b>, <b>${b} ${B}</b> and <b>${c} ${Cc}</b>. How many different ${T} can you make with one of each?`, opts: numU(ans, [a + b + c, a * b, a * c, b * c, ans + 1].filter(v => v !== ans), 3, 1), ans: String(ans), big: 1, why: `Every choice goes with every other choice: ${a} × ${b} × ${c} = ${ans}.`, key: "v22a" + who + a + b + c };
    q.v22 = { kind: "three", a, b, c, A, B, Cc }; return q;
  }
  if (k === 1) {
    const n = Math.random() < 0.6 ? 3 : 4, names = shuffle(LG9V_NAMES).slice(0, n), ans = n === 3 ? 6 : 24;
    const list = names.slice(0, -1).join(", ") + " and " + names[n - 1];
    const q = { q: `${list} line up for a photo. In how many different orders can they stand?`, opts: numU(ans, [n, n * n, n * (n - 1), ans + 1, 2 * n].filter(v => v !== ans), 2, 1), ans: String(ans), big: 1, why: `${n} kids can go first, then ${n - 1} are left for the next spot, and so on: ${range(1, n).reverse().join(" × ")} = ${ans}.`, key: "v22l" + names.join() };
    q.v22 = { kind: "line", n }; return q;
  }
  const [A, B, T] = pick(LG9V_C2), a = R(2, 6), b = R(2, 6), N = a * b;
  const q = { q: `There are <b>${a} ${A}</b> and some ${B}. Picking one of each makes <b>${N}</b> different ${T}. How many ${B} are there?`, opts: numU(b, [N - a, N, a, b + 1, b - 1].filter(v => v !== b), 2, 2), ans: String(b), big: 1, why: `${a} × ${b} = ${N}, so ${N} ÷ ${a} = ${b}.`, key: "v22m" + A + a + N };
  q.v22 = { kind: "miss", a, N, A, B, T }; return q;
});
whyRule(9, "logic", "combos", (q, picked) => {
  const x = q.v22; if (!x || !x.kind) return null;
  const p = +xPlain(picked); if (!Number.isFinite(p)) return null;
  if (x.kind === "three") {
    const { a, b, c } = x;
    if (p === a + b + c) return `${p} adds the choices. For one of each, multiply, because every choice goes with every other.`;
    if (p === a * b) return `${p} is just ${a} × ${b}. It forgets the ${c} ${x.Cc}.`;
    if (p === a * c) return `${p} is just ${a} × ${c}. It forgets the ${b} ${x.B}.`;
    if (p === b * c) return `${p} is just ${b} × ${c}. It forgets the ${a} ${x.A}.`;
    return `${a} × ${b} × ${c} doesn't make ${p}.`;
  }
  if (x.kind === "line") {
    const n = x.n, prod = range(1, n).reverse().join(" × ");
    if (p === n) return `${p} is just how many kids there are. Count the orders: ${prod}.`;
    if (p === n * n) return `${p} is ${n} × ${n}, but once someone stands in a spot, one fewer kid is left for the next spot.`;
    if (p === n * (n - 1)) return `${p} only fills the first two spots. Keep going: ${prod}.`;
    return `The number of orders is ${prod}, which doesn't make ${p}.`;
  }
  if (x.kind === "miss") return `With ${p} ${x.B}, there would be ${x.a} × ${p} = ${x.a * p} ${x.T}, not ${x.N}.`;
  return null;
});
/* older two-group combos questions: adding the two groups is a common slip (the shared rule can misread a hyphen as "take away") */
whyRule(9, "logic", "combos", (q, picked) => {
  if (q.v22) return null;
  const b = [...String(q.q).matchAll(/<b>(\d+) ([^<]+)<\/b>/g)], p = +xPlain(picked);
  if (b.length !== 2 || !/one of each|with one /.test(String(q.q)) || !Number.isFinite(p)) return null;
  const a1 = +b[0][1], a2 = +b[1][1];
  if (p === a1 + a2) return `${p} adds ${a1} and ${a2}. Each one of the ${b[0][2]} goes with each of the ${b[1][2]}, so multiply.`;
  return null;
});

/* ---------- symbols: sum and difference, times clues ---------- */
const LG9V_SYMS = [["🍎", "🍌"], ["⭐", "🌙"], ["🐶", "🐱"], ["🔺", "🟦"], ["🚗", "🚲"], ["🐸", "🐢"], ["🎈", "🎁"], ["🌸", "🍀"]];
addBank(9, "logic", "symbols", 0.35, function () {
  const [A, B] = pick(LG9V_SYMS);
  if (Math.random() < 0.5) {
    const b = R(1, 9), a = b + R(1, 9), S = a + b, D = a - b;
    const q = { q: `What number is <span class="emo">${A}</span>?`, say: `The first picture plus the second picture make ${S}. The first picture minus the second picture make ${D}. What number is the first picture?`, vis: eq(`${A} + ${B} = ${S}`) + eq(`${A} − ${B} = ${D}`), opts: numU(a, [b, S, D, a + 1, a - 1].filter(v => v !== a), 2, 0), ans: String(a), big: 1, why: `${A} = ${a} and ${B} = ${b} work for both lines: ${a} + ${b} = ${S} and ${a} − ${b} = ${D}.`, extra: 15, key: "v22s" + A + S + D };
    q.v22 = { kind: "sd", A, B, S, D }; return q;
  }
  const a = R(2, 9), b = R(1, 9), m = R(2, 4);
  const q = { q: `What number is <span class="emo">${B}</span>?`, say: `${m} of the first picture make ${m * a}. The first picture plus the second picture make ${a + b}. What number is the second picture?`, vis: eq(`${Array(m).fill(A).join(" + ")} = ${m * a}`) + eq(`${A} + ${B} = ${a + b}`), opts: numU(b, [a, a + b, m * a - (a + b) > 0 ? m * a - (a + b) : b + 2, b + 1].filter(v => v !== b), 2, 0), ans: String(b), big: 1, why: `${A} = ${m * a} ÷ ${m} = ${a}, so ${B} = ${a + b} − ${a} = ${b}.`, extra: 15, key: "v22m" + A + m + a + b };
  q.v22 = { kind: "m", A, B, a, m, T: a + b }; return q;
});
whyRule(9, "logic", "symbols", (q, picked) => {
  const x = q.v22; if (!x || !x.kind) return null;
  const p = +xPlain(picked); if (!Number.isFinite(p)) return null;
  if (x.kind === "sd") {
    if (p > x.S) return `If ${x.A} were ${p}, ${x.A} + ${x.B} would already be more than ${x.S}.`;
    const other = x.S - p;
    return `If ${x.A} were ${p}, ${x.B} would be ${other}, and ${p} − ${other} = ${p - other}, not ${x.D}.`;
  }
  if (x.kind === "m") {
    if (p === x.a) return `${p} is the number for ${x.A}, not ${x.B}.`;
    return `${x.A} is ${x.m * x.a} ÷ ${x.m} = ${x.a}, and ${x.a} + ${p} = ${x.a + p}, not ${x.T}.`;
  }
  return null;
});

