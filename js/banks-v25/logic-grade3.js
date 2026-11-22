/* =====================================================================
   v25_lg8.js · Age 8 Logic (tag V25LG8)
   New formats for every age-8 logic topic. Every new question carries
   q.v25 = { r: { "<wrong option>": "<why it is wrong>" }, ... } and one shared
   whyRule per topic reads those precomputed reasons (null for anything else).
   ===================================================================== */
const V25LG8_L = a => a.length <= 1 ? a.join("") : a.slice(0, -1).join(", ") + " and " + a[a.length - 1];
const V25LG8_ORD = ["1st", "2nd", "3rd", "4th", "5th"];
const V25LG8_ORDW = ["first", "second", "third", "fourth", "fifth"];
const V25LG8_ROSE = `<div class="compass mini"><span class="n">N</span><span class="w">W</span><span class="c">🧭</span><span class="e">E</span><span class="s">S</span></div>`;
const V25LG8_QT = s => `“${String(s).replace(/[.]$/, "")}”`;
const xPlainLite = h => String(h).replace(/<[^>]+>/g, "");
const V25LG8_AN = w => (/^[aeiou]/i.test(w) ? "an " : "a ") + w;
/* attach reasons for every wrong option; returns null if any wrong option has no reason */
function V25LG8_FIN(o, why, extra) {
  const r = {};
  for (const op of o.opts) if (op !== o.ans) { const t = why(op); if (!t) return null; r[op] = t; }
  if (!o.opts.includes(o.ans) || new Set(o.opts).size !== o.opts.length) return null;
  o.v25 = Object.assign({ r }, extra || {});
  return o;
}
const V25LG8_RULE = (q, picked) => { if (!q || !q.v25 || !q.v25.r) return null; return q.v25.r[picked] || null; };
const V25LG8_TRY = fn => function () { for (let i = 0; i < 60; i++) { const q = fn.call(this); if (q) return q; } return null; };

/* =====================================================================
   1 · analogies: new analogy sets + "which pair is linked the same way?"
   ===================================================================== */
const V25LG8_AN1 = [
  ["bird", "nest", "bear", "den", ["cub", "honey", "paw"], "where it lives"],
  ["fish", "swim", "bird", "fly", ["nest", "feather", "beak"], "how it moves"],
  ["frog", "hop", "snake", "slither", ["hiss", "scales", "egg"], "how it moves"],
  ["sock", "foot", "mitten", "hand", ["warm", "snow", "wool"], "what it covers"],
  ["bus driver", "bus", "pilot", "plane", ["sky", "wings", "airport"], "what they drive"],
  ["ear", "hear", "nose", "smell", ["face", "tissue", "eye"], "what it is used for"],
  ["eye", "see", "tongue", "taste", ["mouth", "pink", "teeth"], "what it is used for"],
  ["broom", "sweep", "shovel", "dig", ["dirt", "garden", "handle"], "what it is used for"],
  ["wolf", "howl", "lion", "roar", ["mane", "cub", "claws"], "sound it makes"],
  ["cat", "meow", "sheep", "baa", ["wool", "lamb", "moo"], "sound it makes"],
  ["lamb", "sheep", "foal", "horse", ["hay", "saddle", "barn"], "baby and grown-up"],
  ["caterpillar", "butterfly", "tadpole", "frog", ["fish", "pond", "lily pad"], "baby and grown-up"],
  ["hot", "cold", "open", "closed", ["door", "key", "window"], "opposites"],
  ["full", "empty", "early", "late", ["soon", "clock", "morning"], "opposites"],
  ["happy", "sad", "win", "lose", ["game", "prize", "play"], "opposites"],
  ["cold", "freezing", "warm", "hot", ["cool", "sun", "summer"], "stronger word"],
  ["tired", "exhausted", "scared", "terrified", ["brave", "spooky", "dark"], "stronger word"],
  ["4", "8", "6", "12", ["10", "3", "18"], "double it"],
  ["20", "10", "14", "7", ["28", "12", "6"], "half of it"],
  ["2", "20", "3", "30", ["13", "33", "6"], "times 10"],
  ["page", "book", "brick", "wall", ["red", "heavy", "cement"], "part of"],
  ["petal", "flower", "leaf", "tree", ["green", "fall", "grow"], "part of"],
  ["cake", "baker", "house", "builder", ["home", "hammer", "roof"], "who makes it"],
  ["mouse", "cheese", "rabbit", "carrot", ["ears", "hop", "garden"], "food it likes"],
  ["kitten", "kittens", "child", "children", ["childs", "childrens", "baby"], "one and many"],
  ["write", "wrote", "drive", "drove", ["drived", "driving", "car"], "now and past"],
  ["sit", "sat", "swim", "swam", ["swimmed", "swimming", "pool"], "now and past"],
];
addBank(8, "logic", "analogies", 0.3, V25LG8_TRY(function () {
  if (Math.random() < 0.4) {
    const [a, b, c, d, dis, link] = pick(V25LG8_AN1);
    return V25LG8_FIN({ q: `<div class="analogy"><span>${a}</span><i>:</i><span>${b}</span><b>::</b><span>${c}</span><i>:</i><span class="blank">?</span></div>`, say: `${a} is to ${b}, as ${c} is to what?`, opts: shuffle([d, ...dis]), ans: d, big: 1, why: `The link is "${link}": ${a} → ${b}, so ${c} → ${d}.`, key: "v25a" + a + "|" + c }, x => `“${x}” doesn't link to “${c}” the same way. The link is “${link}”: ${c} → ${d}.`, { k: "an" });
  }
  return V25LG8_anPair();
}));
const V25LG8_PAIRS = {
  opp: { fam: "A", d: (a, b) => `${a} and ${b} are opposites`, p: [["hot", "cold"], ["up", "down"], ["open", "closed"], ["early", "late"], ["win", "lose"], ["full", "empty"], ["fast", "slow"]] },
  baby: { fam: "B", d: (a, b) => `${V25LG8_AN(a)} is a baby ${b}`, p: [["puppy", "dog"], ["calf", "cow"], ["lamb", "sheep"], ["foal", "horse"], ["chick", "hen"], ["cub", "bear"]] },
  home: { fam: "C", d: (a, b) => `${V25LG8_AN(a)} lives in ${V25LG8_AN(b)}`, p: [["bird", "nest"], ["bear", "den"], ["bee", "hive"], ["spider", "web"]] },
  move: { fam: "D", d: (a, b) => `${V25LG8_AN(a)} can ${b}`, p: [["fish", "swim"], ["bird", "fly"], ["frog", "hop"], ["snake", "slither"]] },
  sound: { fam: "D", d: (a, b) => `${V25LG8_AN(a)} says “${b}”`, p: [["dog", "woof"], ["cat", "meow"], ["cow", "moo"], ["sheep", "baa"], ["duck", "quack"]] },
  use: { fam: "D", d: (a, b) => `you use ${a === "scissors" ? "scissors" : V25LG8_AN(a)} to ${b}`, p: [["broom", "sweep"], ["shovel", "dig"], ["scissors", "cut"], ["pen", "write"]] },
  cover: { fam: "E", d: (a, b) => `${V25LG8_AN(a)} covers your ${b}`, p: [["sock", "foot"], ["hat", "head"], ["scarf", "neck"], ["glove", "hand"]] },
  part: { fam: "E", d: (a, b) => `${V25LG8_AN(a)} is part of ${V25LG8_AN(b)}`, p: [["petal", "flower"], ["page", "book"], ["wheel", "bike"], ["toe", "foot"]] },
  dbl: { fam: "F", d: (a, b) => `${b} is double ${a}`, p: [["3", "6"], ["5", "10"], ["7", "14"], ["9", "18"]] },
};
function V25LG8_anPair() {
  const keys = Object.keys(V25LG8_PAIRS), L = pick(keys), fams = new Set([V25LG8_PAIRS[L].fam]), others = [];
  for (const k of shuffle(keys)) { if (others.length === 3) break; const f = V25LG8_PAIRS[k].fam; if (!fams.has(f)) { fams.add(f); others.push(k); } }
  if (others.length < 3) return null;
  const [base, ans] = shuffle(V25LG8_PAIRS[L].p).slice(0, 2), used = new Set([...base, ...ans]), wrong = [];
  for (const k of others) { const c = shuffle(V25LG8_PAIRS[k].p).find(p => !used.has(p[0]) && !used.has(p[1])); if (!c) return null; used.add(c[0]); used.add(c[1]); wrong.push([k, c]); }
  const fmt = p => `${p[0]} : ${p[1]}`, D = (k, p) => V25LG8_PAIRS[k].d(p[0], p[1]), info = {};
  wrong.forEach(([k, p]) => info[fmt(p)] = [k, p]);
  const opts = shuffle([fmt(ans), ...wrong.map(w => fmt(w[1]))]);
  return V25LG8_FIN({ q: `Which pair is linked the <b>same way</b> as <b>${fmt(base)}</b>?`, say: `Which pair is linked the same way as ${base[0]} and ${base[1]}?`, opts, ans: fmt(ans), big: 1, why: `${cap(D(L, base))}. In the same way, ${D(L, ans)}.`, key: "v25p" + fmt(base) + "|" + opts.slice().sort().join("|") }, op => { const [k, p] = info[op]; return `${cap(D(k, p))}, but ${D(L, base)}. That's a different link.`; }, { k: "pair" });
}
whyRule(8, "logic", "analogies", V25LG8_RULE);

/* =====================================================================
   2 · ordering: clues that use both words (taller / shorter), new settings,
       and "which list is in order?"
   ===================================================================== */
const V25LG8_ONAMES = ["Maya", "Jon", "Priya", "Tomas", "Lena", "Omar", "Rosa", "Kenji", "Ivy", "Sami", "Nia", "Theo", "Aiyana", "Luca", "Zara", "Felix"];
const V25LG8_OCOL = ["red", "blue", "green", "yellow", "purple", "orange"];
const V25LG8_OCTX = [
  { more: "taller", less: "shorter", most: "tallest", least: "shortest" },
  { more: "older", less: "younger", most: "oldest", least: "youngest" },
  { more: "faster", less: "slower", most: "fastest", least: "slowest" },
  { more: "heavier", less: "lighter", most: "heaviest", least: "lightest", names: ["Rex", "Bo", "Daisy", "Pepper", "Coco", "Biscuit"], noun: "dog" },
  { more: "longer", less: "shorter", most: "longest", least: "shortest", obj: "ribbon" },
  { more: "longer", less: "shorter", most: "longest", least: "shortest", obj: "snake" },
  { more: "longer", less: "shorter", most: "longest", least: "shortest", obj: "pencil" },
  { more: "earlier", less: "later", most: "earliest", least: "latest", verb: "got to school" },
];
const V25LG8_ON = (cx, x) => cx.obj ? `the ${x} ${cx.obj}` : x; /* in a sentence */
const V25LG8_OLAB = (cx, x) => cx.obj ? `${x} ${cx.obj}` : x; /* as an option */
const V25LG8_OS = (cx, x, cmp, y) => cx.verb ? `${V25LG8_ON(cx, x)} ${cx.verb} ${cmp} than ${V25LG8_ON(cx, y)}` : `${V25LG8_ON(cx, x)} is ${cmp} than ${V25LG8_ON(cx, y)}`;
addBank(8, "logic", "ordering", 0.3, V25LG8_TRY(function () {
  const ci = R(0, V25LG8_OCTX.length - 1), cx = V25LG8_OCTX[ci], list = Math.random() < 0.3;
  const n = list ? 4 : pick([3, 4, 4, 5]), pool = cx.obj ? V25LG8_OCOL : cx.names || V25LG8_ONAMES, ppl = shuffle(pool).slice(0, n);
  const dirs = range(0, n - 2).map(() => Math.random() < 0.5); if (dirs.every(x => x)) dirs[R(0, n - 2)] = false; if (dirs.every(x => !x)) dirs[R(0, n - 2)] = true;
  const clueOf = i => dirs[i] ? cap(V25LG8_OS(cx, ppl[i], cx.more, ppl[i + 1])) + "." : cap(V25LG8_OS(cx, ppl[i + 1], cx.less, ppl[i])) + ".";
  const order = shuffle(range(0, n - 2)), clues = order.map(clueOf), vis = passage(clues.join("<br>"));
  const who = cx.verb ? null : cx.obj ? `Which ${cx.obj} is` : cx.noun ? `Which ${cx.noun} is` : "Who is";
  const inOrder = `In order from ${cx.most} to ${cx.least}: ${ppl.map(x => V25LG8_OLAB(cx, x)).join(", ")}.`;
  if (list) {
    const up = Math.random() < 0.5, seq = up ? ppl.slice() : ppl.slice().reverse(), from = up ? cx.most : cx.least, to = up ? cx.least : cx.most;
    const sw = (a, i) => { const b = a.slice(); [b[i], b[i + 1]] = [b[i + 1], b[i]]; return b; };
    const cands = shuffle([sw(seq, 0), sw(seq, 1), sw(seq, 2), seq.slice().reverse()]).slice(0, 3), fmt = a => a.join(", ");
    const opts = shuffle([fmt(seq), ...cands.map(fmt)]), rank = x => ppl.indexOf(x);
    return V25LG8_FIN({ q: `Which list goes from <b>${from}</b> to <b>${to}</b>?`, say: `${clues.join(" ")} Which list goes from ${from} to ${to}?`, vis, opts, ans: fmt(seq), why: `In order from ${from} to ${to}: ${seq.map(x => V25LG8_OLAB(cx, x)).join(", ")}.`, extra: 10, key: "v25l" + ci + ppl.join() + dirs.join() + up }, op => {
      const a = op.split(", ");
      for (let i = 0; i < a.length - 1; i++) { const x = a[i], y = a[i + 1], bad = up ? rank(x) > rank(y) : rank(x) < rank(y); if (bad) return `That list puts ${V25LG8_ON(cx, x)} before ${V25LG8_ON(cx, y)}, but ${V25LG8_OS(cx, y, up ? cx.more : cx.less, x)}.`; }
      return null;
    }, { k: "list" });
  }
  const kinds = ["most", "least"]; if (n >= 4 && !cx.verb) kinds.push("2most", "2least");
  const kind = pick(kinds), ai = kind === "most" ? 0 : kind === "least" ? n - 1 : kind === "2most" ? 1 : n - 2;
  const word = kind === "most" || kind === "2most" ? cx.most : cx.least, w2 = kind[0] === "2" ? `2nd ${word}` : word;
  const qtxt = cx.verb ? `Who ${cx.verb} <b>${w2}</b>?` : `${who} the <b>${w2}</b>?`;
  let others = ppl.filter((_, i) => i !== ai); if (others.length > 3) others = shuffle(others).slice(0, 3);
  const opts = shuffle([ppl[ai], ...others]).map(x => V25LG8_OLAB(cx, x)), ans = V25LG8_OLAB(cx, ppl[ai]), byLab = {};
  ppl.forEach((x, i) => byLab[V25LG8_OLAB(cx, x)] = i);
  const desc = r => { const fromTop = kind === "most" || kind === "2most"; const k = fromTop ? r : n - 1 - r, top = fromTop ? cx.most : cx.least, bot = fromTop ? cx.least : cx.most; return k === 0 ? `the ${top}` : k === n - 1 ? `the ${bot}` : `${V25LG8_ORD[k]} ${top}`; };
  return V25LG8_FIN({ q: qtxt, say: `${clues.join(" ")} ${xPlainLite(qtxt)}`, vis, opts, ans, big: 1, why: `${inOrder} So ${V25LG8_ON(cx, ppl[ai])} is ${desc(ai)}.`, extra: 10, key: "v25o" + ci + ppl.join() + dirs.join() + kind }, op => {
    const r = byLab[op]; if (r == null) return null; const P = cap(V25LG8_ON(cx, ppl[r]));
    if (kind === "most") return `${clueOf(r - 1)} So ${V25LG8_ON(cx, ppl[r])} can't be the ${cx.most}.`;
    if (kind === "least") return `${clueOf(r)} So ${V25LG8_ON(cx, ppl[r])} can't be the ${cx.least}.`;
    return `${P} is ${desc(r)}, not the 2nd ${word}.`;
  }, { k: "ord" });
}));
whyRule(8, "logic", "ordering", V25LG8_RULE);

/* =====================================================================
   3 · venn: number Venns, letter Venns, "which number goes in the middle?"
   ===================================================================== */
const V25LG8_NP = [
  { id: "even", lab: "Even", t: n => n % 2 === 0, y: n => `${n} is even`, n: n => `${n} is odd` },
  { id: "odd", lab: "Odd", t: n => n % 2 === 1, y: n => `${n} is odd`, n: n => `${n} is even` },
  ...[3, 4, 5].map(k => ({ id: "m" + k, lab: `${k} times table`, t: n => n % k === 0, y: n => `${n} is in the ${k} times table`, n: n => `${n} is not in the ${k} times table` })),
  { id: "gt20", lab: "More than 20", t: n => n > 20, y: n => `${n} is more than 20`, n: n => `${n} is not more than 20` },
  { id: "lt10", lab: "Less than 10", t: n => n < 10, y: n => `${n} is less than 10`, n: n => `${n} is not less than 10` },
  { id: "h1", lab: "Has a 1 in it", t: n => String(n).includes("1"), y: n => `${n} has a 1 in it`, n: n => `${n} has no 1 in it` },
  { id: "h2", lab: "Has a 2 in it", t: n => String(n).includes("2"), y: n => `${n} has a 2 in it`, n: n => `${n} has no 2 in it` },
];
const V25LG8_VPOOL = range(1, 30);
function V25LG8_vpair() {
  for (let i = 0; i < 50; i++) {
    const [A, B] = shuffle(V25LG8_NP).slice(0, 2);
    if ((A.id === "even" && B.id === "odd") || (A.id === "odd" && B.id === "even")) continue;
    const Z = { a: [], b: [], both: [], out: [] };
    for (const n of V25LG8_VPOOL) Z[A.t(n) ? (B.t(n) ? "both" : "a") : (B.t(n) ? "b" : "out")].push(n);
    if (Object.values(Z).every(z => z.length >= 2)) return [A, B, Z];
  }
  return null;
}
const V25LG8_VZ = { a: A => `Only in "${A}"`, b: (A, B) => `Only in "${B}"`, both: () => "In the middle (both)", out: () => "Outside both circles" };
addBank(8, "logic", "venn", 0.3, V25LG8_TRY(function () {
  const k = Math.random();
  if (k < 0.4) {
    const P = V25LG8_vpair(); if (!P) return null;
    const [A, B, Z] = P, zone = pick(["a", "b", "both", "out"]), n = pick(Z[zone]), inA = A.t(n), inB = B.t(n);
    const sA = inA ? A.y(n) : A.n(n), sB = inB ? B.y(n) : B.n(n), opts = ["a", "b", "both", "out"].map(z => V25LG8_VZ[z](A.lab, B.lab)), ans = V25LG8_VZ[zone](A.lab, B.lab);
    const why = zone === "both" ? `${cap(sA)}, and ${sB}. So it goes in the middle.` : zone === "out" ? `${cap(sA)}, and ${sB}. So it goes outside both circles.` : `${cap(zone === "a" ? sA : sB)}, but ${zone === "a" ? sB : sA}. So it goes only in that circle.`;
    return V25LG8_FIN({ q: `Where does the number <b>${n}</b> go?`, say: `Where does the number ${n} go in the Venn diagram?`, vis: row(`<div class="eq">${n}</div>`, venn(A.lab, B.lab)), opts, ans, why, key: "v25n" + A.id + B.id + n }, op => {
      const pz = ["a", "b", "both", "out"].find(z => V25LG8_VZ[z](A.lab, B.lab) === op);
      if (pz === "a") return !inA ? `${cap(sA)}, so it can't go in the "${A.lab}" circle.` : `${cap(sB)} too, so it goes in the middle, not only in "${A.lab}".`;
      if (pz === "b") return !inB ? `${cap(sB)}, so it can't go in the "${B.lab}" circle.` : `${cap(sA)} too, so it goes in the middle, not only in "${B.lab}".`;
      if (pz === "both") return `${cap(!inA ? sA : sB)}, so it can't go in the middle.`;
      if (pz === "out") return `${cap(inA ? sA : sB)}, so it goes inside a circle.`;
      return null;
    }, { k: "vz" });
  }
  if (k < 0.7) {
    const [W1, W2] = pick(V25LG8_VW), s1 = new Set(W1), s2 = new Set(W2);
    const Z = { a: [...s1].filter(c => !s2.has(c)), b: [...s2].filter(c => !s1.has(c)), both: [...s1].filter(c => s2.has(c)), out: ALPHA.split("").filter(c => !s1.has(c) && !s2.has(c)) };
    const zone = pick(["a", "b", "both", "out"]), Lt = pick(Z[zone]), in1 = s1.has(Lt), in2 = s2.has(Lt);
    const N = { a: `Only in ${W1}`, b: `Only in ${W2}`, both: "In both words", out: "In neither word" }, opts = ["a", "b", "both", "out"].map(z => N[z]);
    const why = zone === "both" ? `${Lt} is in ${W1} and in ${W2}, so it goes in the middle.` : zone === "out" ? `${Lt} is not in ${W1} or ${W2}, so it goes outside both circles.` : `${Lt} is in ${zone === "a" ? W1 : W2} but not in ${zone === "a" ? W2 : W1}.`;
    return V25LG8_FIN({ q: `The circles show the letters in <b>${W1}</b> and <b>${W2}</b>. Where does the letter <b>${Lt}</b> go?`, say: `The circles show the letters in ${W1.split("").join(" ")} and ${W2.split("").join(" ")}. Where does the letter ${Lt} go?`, vis: venn(W1, W2), opts, ans: N[zone], why, key: "v25w" + W1 + W2 + Lt }, op => {
      if (op === N.a) return !in1 ? `${Lt} is not in ${W1}, so it can't go in that circle.` : `${Lt} is in ${W2} too, so it goes in the middle.`;
      if (op === N.b) return !in2 ? `${Lt} is not in ${W2}, so it can't go in that circle.` : `${Lt} is in ${W1} too, so it goes in the middle.`;
      if (op === N.both) return `${Lt} is not in ${!in1 ? W1 : W2}, so it can't go in the middle.`;
      if (op === N.out) return `${Lt} is in ${in1 ? W1 : W2}, so it goes inside a circle.`;
      return null;
    }, { k: "vw" });
  }
  const P = V25LG8_vpair(); if (!P) return null;
  const [A, B, Z] = P, tz = pick(["both", "out", "a", "b"]), picks = {};
  for (const z of ["a", "b", "both", "out"]) picks[z] = pick(Z[z]);
  const ans = String(picks[tz]), opts = shuffle(Object.values(picks).map(String));
  const ask = tz === "both" ? "goes in the <b>middle</b> (both circles)" : tz === "out" ? "goes <b>outside both circles</b>" : `goes <b>only</b> in the "${tz === "a" ? A.lab : B.lab}" circle`;
  const st = n => [A.t(n) ? A.y(n) : A.n(n), B.t(n) ? B.y(n) : B.n(n)], [wa, wb] = st(picks[tz]);
  return V25LG8_FIN({ q: `Which number ${ask}?`, say: `Look at the Venn diagram. Which number ${xPlainLite(ask)}?`, vis: venn(A.lab, B.lab), opts, ans, why: `${cap(wa)}, and ${wb}.`, key: "v25m" + A.id + B.id + tz + opts.slice().sort().join() }, op => {
    const n = +op, iA = A.t(n), iB = B.t(n), [x, y] = st(n);
    if (tz === "both") return `${cap(!iA ? x : y)}, so it can't go in the middle.`;
    if (tz === "out") return `${cap(iA ? x : y)}, so it goes inside a circle.`;
    const mine = tz === "a" ? iA : iB, other = tz === "a" ? iB : iA, ms = tz === "a" ? x : y, os = tz === "a" ? y : x;
    if (!mine) return `${cap(ms)}, so it isn't in that circle.`;
    if (other) return `${cap(os)} too, so it goes in the middle.`;
    return null;
  }, { k: "vm" });
}));
const V25LG8_VW = [["APPLE", "GRAPE"], ["PLANT", "TRAIN"], ["TIGER", "ZEBRA"], ["CAMEL", "HORSE"], ["RIVER", "OCEAN"], ["MOUSE", "HOUSE"], ["CLOUD", "STORM"], ["PIZZA", "PASTA"], ["ROBOT", "ROCKET"], ["SPOON", "FORK"], ["CANDY", "CAKE"], ["BEACH", "SAND"], ["LION", "WOLF"], ["SHIRT", "SOCKS"], ["DRUM", "FLUTE"], ["TRUCK", "TRAIN"], ["MAPLE", "PINE"], ["BREAD", "TOAST"]].filter(([a, b]) => { const s1 = new Set(a), s2 = new Set(b); return [...s1].some(c => s2.has(c)) && [...s1].some(c => !s2.has(c)) && [...s2].some(c => !s1.has(c)); });
whyRule(8, "logic", "venn", V25LG8_RULE);

/* =====================================================================
   4 · codes: 4-letter words, letter sums, next-letter code
   ===================================================================== */
const V25LG8_W4 = ["FISH", "FROG", "BOAT", "CAKE", "DUCK", "GIFT", "KITE", "LAMP", "MILK", "NEST", "RAIN", "SHIP", "SNOW", "STAR", "TREE", "WIND", "BELL", "DRUM", "LEAF", "MOON", "SOCK", "BIKE", "CORN", "GOAT"];
const V25LG8_W3 = ["BAD", "CAB", "DAD", "BEE", "FED", "ACE", "BIG", "HAM", "JAM", "LEG", "MAD", "BAG", "EGG", "HID", "KID", "LID", "FIG", "GEM", "DIG", "FAN", "HEN", "ICE", "JET", "MEN"];
const V25LG8_WS = ["CAT", "DOG", "SUN", "HAT", "PIG", "BUS", "CUP", "FOX", "BED", "MAP", "OWL", "HEN", "JAM", "RUG", "VAN", "WEB", "NUT", "BOX", "ANT", "KEY"];
const V25LG8_LN = c => ALPHA.indexOf(c) + 1;
const V25LG8_SH = (w, k) => w.split("").map(c => ALPHA[(ALPHA.indexOf(c) + k + 26) % 26]).join("");
const V25LG8_CHART = () => `<details class="code-help"><summary>Show the code chart</summary>${codeRow(ALPHA.slice(0, 13).split("").map((c, i) => [c, i + 1]))}${codeRow(ALPHA.slice(13).split("").map((c, i) => [c, i + 14]))}</details>`;
const V25LG8_ABC = `<details class="code-help"><summary>Show the alphabet</summary><div class="tip">A B C D E F G H I J K L M<br>N O P Q R S T U V W X Y Z</div></details>`;
addBank(8, "logic", "codes", 0.3, V25LG8_TRY(function () {
  const k = Math.random();
  if (k < 0.35) {
    const w = pick(V25LG8_W4), nums = w.split("").map(V25LG8_LN), same = V25LG8_W4.filter(x => x !== w && x[0] === w[0]);
    const others = shuffle([...shuffle(same).slice(0, 1), ...shuffle(V25LG8_W4.filter(x => x !== w && !same.includes(x))).slice(0, 3)]).slice(0, 3);
    return V25LG8_FIN({ q: "Crack the code! A = 1, B = 2, C = 3 …", say: `Crack the code. ${nums.join(", ")}. What word is it?`, vis: eq(nums.join("-")) + V25LG8_CHART(), opts: shuffle([w, ...others]), ans: w, big: 1, why: `${nums.join("-")} → ${w.split("").join(", ")} = ${w}.`, extra: 15, key: "v25d" + w }, p => {
      const i = p.split("").findIndex((c, j) => V25LG8_LN(c) !== nums[j]); if (i < 0) return null;
      return `${p} is ${numCode(p)}. Its ${V25LG8_ORDW[i]} letter, ${p[i]}, is ${V25LG8_LN(p[i])}, not ${nums[i]}.`;
    }, { k: "d4" });
  }
  if (k < 0.65) {
    const w = pick(V25LG8_W3), n = w.split("").map(V25LG8_LN), s = n[0] + n[1] + n[2], two = n[0] + n[1];
    const opts = numU(s, [s + 1, s - 1, two, s + 2, s + n[2]], 3, 1), list = w.split("").map((c, i) => `${c} = ${n[i]}`).join(", ");
    return V25LG8_FIN({ q: `In the code A = 1, B = 2, C = 3 …, add up the numbers for <b>${w}</b>. What is the total?`, say: `In the code A is 1, B is 2, C is 3, and so on. Add up the numbers for the letters ${w.split("").join(" ")}. What is the total?`, vis: V25LG8_CHART(), opts, ans: String(s), big: 1, why: `${list}, so ${n[0]} + ${n[1]} + ${n[2]} = ${s}.`, key: "v25s" + w }, p => {
      if (+p === two) return `That only adds the first two letters. Add ${w[2]} = ${n[2]} too.`;
      return `${list}, and ${n[0]} + ${n[1]} + ${n[2]} = ${s}, not ${p}.`;
    }, { k: "sum" });
  }
  const w = pick(V25LG8_WS), code = V25LG8_SH(w, 1), intro = `In this code, each letter becomes the <b>next</b> letter in the alphabet (A → B, B → C …).`;
  if (Math.random() < 0.55) {
    const opts = shuffle([w, ...shuffle(V25LG8_WS.filter(x => x !== w)).slice(0, 3)]);
    return V25LG8_FIN({ q: `${intro} What does <b>${code}</b> mean?`, say: `In this code, each letter becomes the next letter in the alphabet. What does ${code.split("").join(" ")} mean?`, vis: V25LG8_ABC, opts, ans: w, big: 1, why: `Go back one letter each time: ${code.split("").map((c, i) => `${c} → ${w[i]}`).join(", ")}. It spells ${w}.`, extra: 15, key: "v25x" + w }, p => `${p} would be written ${V25LG8_SH(p, 1)}, not ${code}.`, { k: "shd" });
  }
  const partial = V25LG8_SH(w[0], 1) + w.slice(1), back = V25LG8_SH(w, -1), two = V25LG8_SH(w, 2);
  const opts = uniq(code, [back, two, partial]);
  return V25LG8_FIN({ q: `${intro} How do you write <b>${w}</b> in this code?`, say: `In this code, each letter becomes the next letter in the alphabet. How do you write ${w.split("").join(" ")} in this code?`, vis: V25LG8_ABC, opts, ans: code, big: 1, why: `${w.split("").map((c, i) => `${c} → ${code[i]}`).join(", ")}, so ${w} is written ${code}.`, extra: 15, key: "v25y" + w }, p => {
    if (p === back) return "That moves each letter back one. This code moves each letter forward to the next letter.";
    if (p === two) return "That moves each letter forward two. Move each letter forward just one.";
    const i = p.split("").findIndex((c, j) => c !== code[j]); if (i < 0) return null;
    return `${w[i]} becomes ${code[i]}, the next letter, not ${p[i]}.`;
  }, { k: "she" });
}));
whyRule(8, "logic", "codes", V25LG8_RULE);

/* =====================================================================
   5 · matrix: 3 × 3 picture grids (one of each in every row and column)
       and 3 × 3 number grids that count up
   ===================================================================== */
const V25LG8_MT = [
  parseSet("🍎:apple,🍌:banana,🍇:bunch of grapes,🍊:orange,🍓:strawberry,🍒:pair of cherries,🍉:watermelon,🍋:lemon,🍐:pear"),
  parseSet("🐶:dog,🐱:cat,🐰:rabbit,🐸:frog,🐻:bear,🦊:fox,🐵:monkey,🐷:pig,🐮:cow"),
  parseSet("🚗:car,🚌:bus,🚲:bike,🚂:train,✈️:plane,⛵:sailboat,🚀:rocket,🚁:helicopter"),
  parseSet("⚽:soccer ball,🏀:basketball,🏈:football,⚾:baseball,🎾:tennis ball"),
  parseSet("☀️:sun,🌙:moon,⭐:star,☁️:cloud,🌈:rainbow"),
];
const V25LG8_G3 = cells => `<div class="lgrid" style="grid-template-columns:repeat(3,72px)">${cells.map(c => `<div class="lcell${c === "?" ? " q" : ""}" style="width:72px;height:72px">${c}</div>`).join("")}</div>`;
addBank(8, "logic", "matrix", 0.3, V25LG8_TRY(function () {
  if (Math.random() < 0.55) {
    const th = pick(V25LG8_MT), syms = shuffle(th).slice(0, 4), P = shuffle([0, 1, 2]), Q = shuffle([0, 1, 2]);
    const V = (r, c) => (P[r] + Q[c]) % 3, tr = R(0, 2), tc = R(0, 2), hid = new Set([tr + "," + tc]);
    const others = shuffle(range(0, 8).map(i => [Math.floor(i / 3), i % 3]).filter(([r, c]) => !(r === tr && c === tc))).slice(0, R(1, 3));
    others.forEach(([r, c]) => hid.add(r + "," + c));
    const rowSeen = [0, 1, 2].filter(c => c !== tc && !hid.has(tr + "," + c)).map(c => V(tr, c)), colSeen = [0, 1, 2].filter(r => r !== tr && !hid.has(r + "," + tc)).map(r => V(r, tc));
    const ai = V(tr, tc); if (new Set([...rowSeen, ...colSeen]).size !== 2) return null;
    const cells = []; for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) cells.push(r === tr && c === tc ? "?" : hid.has(r + "," + c) ? "" : `<span class="emo" style="font-size:40px">${syms[V(r, c)][0]}</span>`);
    const ans = eOpt(syms[ai]), opts = shuffle(syms).map(eOpt), seen = [...new Set([...rowSeen, ...colSeen])].map(i => V25LG8_AN(syms[i][1]));
    return V25LG8_FIN({ q: "Every row and every column has one of each picture. What goes in the <b>?</b> box?", say: "Every row and every column has one of each picture. What goes in the question mark box?", vis: V25LG8_G3(cells), opts, ans, sayAns: `the ${syms[ai][1]}`, why: `The row and column of the ? box already have ${V25LG8_L(seen)}, so the missing picture is ${V25LG8_AN(syms[ai][1])}.`, key: "v25g" + syms.map(s => s[0]).join("") + P.join("") + Q.join("") + [...hid].sort().join("|") + tr + tc }, op => {
      const i = syms.findIndex(s => eOpt(s) === op); if (i < 0) return null;
      if (i === 3) return `There is no ${syms[i][1]} anywhere in this grid, so it can't be the answer.`;
      if (rowSeen.includes(i)) return `There is already ${V25LG8_AN(syms[i][1])} in that row.`;
      if (colSeen.includes(i)) return `There is already ${V25LG8_AN(syms[i][1])} in that column.`;
      return null;
    }, { k: "latin" });
  }
  const s = R(1, 9), a = R(2, 5), b = pick(range(2, 10).filter(x => x !== a)), V = (r, c) => s + a * c + b * r, tr = R(0, 2), tc = R(0, 2), ans = V(tr, tc);
  const cells = []; for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) cells.push(r === tr && c === tc ? "?" : `<b style="font-size:28px">${V(r, c)}</b>`);
  const ex = tc > 0 ? `${V(tr, tc - 1)} + ${a} = ${ans}` : `${V(tr, 1)} − ${a} = ${ans}`;
  const opts = numU(ans, [ans + a, ans - a, ans + b, ans - b, ans + 1, ans - 1].filter(x => x > 0 && x !== ans), 3, 1);
  return V25LG8_FIN({ q: "Each row counts up by the same jump, and each column counts up by the same jump. What is the missing number?", say: "Each row counts up by the same jump, and each column counts up by the same jump. What is the missing number?", vis: V25LG8_G3(cells), opts, ans: String(ans), big: 1, why: `Each row goes up by ${a}, and each column goes up by ${b}. ${ex}.`, key: "v25k" + s + "," + a + "," + b + tr + tc }, p => `That breaks the pattern. Each row goes up by ${a}, so ${ex}, not ${p}.`, { k: "ngrid" });
}));
whyRule(8, "logic", "matrix", V25LG8_RULE);

/* =====================================================================
   6 · machines: ÷ machines and two-step machines
   ===================================================================== */
const V25LG8_AP = (op, n, x) => op === "+" ? x + n : op === "−" ? x - n : op === "×" ? x * n : x / n;
addBank(8, "logic", "machines", 0.3, V25LG8_TRY(function () {
  if (Math.random() < 0.5) {
    const k = pick([2, 3, 4, 5, 10]), ms = shuffle(range(1, 10)).slice(0, 4), rows = ms.slice(0, 3).map(m => [k * m, m]), x = k * ms[3], m = ms[3];
    if (Math.random() < 0.55) {
      const opts = numU(m, [m + 1, m - 1, x - k, m + 2].filter(v => v > 0 && v !== m), 3, 1);
      return V25LG8_FIN({ q: "What number comes <b>out</b>?", say: `Find the rule, then use it. ${x} goes in. What comes out?`, vis: machine([...rows, [x, "?"]], "?"), opts, ans: String(m), big: 1, why: `The rule is ÷${k}: ${x} ÷ ${k} = ${m}.`, key: "v25do" + k + ms.join() }, p => +p === x - k ? `${x} − ${k} = ${p}, but the rule is ÷${k}: ${x} ÷ ${k} = ${m}.` : `The rule is ÷${k}: ${x} ÷ ${k} = ${m}, not ${p}.`, { k: "divout" });
    }
    const rule = `÷${k}`, d0 = rows[0][0] - rows[0][1], alts = shuffle([`÷${k + 1}`, `−${d0}`, `×${k}`, k > 2 ? `÷${k - 1}` : `+${k}`, `−${k}`]);
    const fails = r => rows.find(([i, o]) => V25LG8_AP(r[0], +r.slice(1), i) !== o);
    const wrong = alts.filter(r => r !== rule && fails(r)).slice(0, 3); if (wrong.length < 3) return null;
    return V25LG8_FIN({ q: "What is the <b>rule</b>?", vis: machine(rows, "?"), opts: shuffle([rule, ...wrong]), ans: rule, big: 1, why: `Every number is divided by ${k}: ${rows[0][0]} ÷ ${k} = ${rows[0][1]}.`, key: "v25dr" + k + ms.slice(0, 3).join() }, p => {
      const bad = fails(p); if (!bad) return null; const n = +p.slice(1), v = V25LG8_AP(p[0], n, bad[0]);
      if (v < 0) return `${p} doesn't work: you can't take ${n} away from ${bad[0]}, and ${bad[1]} came out.`;
      if (p[0] === "÷" && !Number.isInteger(v)) return `${p} doesn't work: ${bad[0]} ÷ ${n} is not a whole number, but ${bad[1]} came out.`;
      return `${p} doesn't work: ${bad[0]} ${p[0]} ${n} = ${v}, but ${bad[1]} came out.`;
    }, { k: "divrule" });
  }
  const form = pick(["x+", "x−", "+x"]), k = R(2, 5), c = form === "+x" ? R(1, 5) : R(1, 9);
  const s1 = form === "+x" ? ["+", c] : ["×", k], s2 = form === "+x" ? ["×", k] : [form === "x+" ? "+" : "−", c];
  const f = x => V25LG8_AP(s2[0], s2[1], V25LG8_AP(s1[0], s1[1], x)), rev = x => V25LG8_AP(s1[0], s1[1], V25LG8_AP(s2[0], s2[1], x));
  const lab = `${s1[0]}${s1[1]}, then ${s2[0]}${s2[1]}`, xs = shuffle(range(form === "x−" ? Math.ceil((c + 1) / k) : 1, 10)).slice(0, 3);
  if (xs.length < 3 || xs.some(x => f(x) < 0)) return null;
  const st = (op, x) => `${x} ${op[0]} ${op[1]} = ${V25LG8_AP(op[0], op[1], x)}`;
  const x = xs[2], mid = V25LG8_AP(s1[0], s1[1], x), out = f(x), ex = [xs[0], f(xs[0])];
  if (Math.random() < 0.55) {
    const ro = rev(x), opts = numU(out, [mid, V25LG8_AP(s2[0], s2[1], x), ro, out + 1, out - 1].filter(v => v >= 0 && v !== out), 3, 0);
    return V25LG8_FIN({ q: `This machine does <b>two</b> steps: <b>${lab}</b>. What comes <b>out</b>?`, say: `This machine does two steps: ${lab.replace("×", "times ").replace("−", "minus ").replace("+", "plus ")}. ${x} goes in. What comes out?`, vis: machine([ex, [x, "?"]], lab), opts, ans: String(out), big: 1, why: `${st(s1, x)}, then ${st(s2, mid)}.`, key: "v25to" + lab + x }, p => {
      const v = +p;
      if (v === mid) return `${st(s1, x)} is only the first step. Then ${st(s2, mid)}.`;
      if (v === ro && ro !== out) return `That does the steps in the wrong order. Do ${s1[0]}${s1[1]} first, then ${s2[0]}${s2[1]}.`;
      return `${st(s1, x)}, then ${st(s2, mid)}, not ${p}.`;
    }, { k: "twoout" });
  }
  const opts = numU(x, [x + 1, x - 1, x + 2, out, x - 2].filter(v => v >= 0 && v !== x), 2, 0);
  return V25LG8_FIN({ q: `This machine does <b>two</b> steps: <b>${lab}</b>. What number went <b>in</b>?`, say: `This machine does two steps: ${lab.replace("×", "times ").replace("−", "minus ").replace("+", "plus ")}. ${out} came out. What number went in?`, vis: machine([ex, ["?", out]], lab), opts, ans: String(x), big: 1, why: `${st(s1, x)}, then ${st(s2, mid)}. So ${x} went in.`, key: "v25ti" + lab + x }, p => {
    const v = +p; if (v === out) return `${out} is the number that came out. Work backward to find what went in.`;
    const m1 = V25LG8_AP(s1[0], s1[1], v), r = V25LG8_AP(s2[0], s2[1], m1);
    if (r < 0) return `If ${v} went in: ${st(s1, v)}, and you can't take ${s2[1]} away from ${m1}.`;
    return `If ${v} went in: ${st(s1, v)}, then ${st(s2, m1)}, not ${out}.`;
  }, { k: "twoin" });
}));
whyRule(8, "logic", "machines", V25LG8_RULE);

/* =====================================================================
   7 · numdetective: real-life mystery numbers with new kinds of clues;
       every wrong option breaks exactly one clue
   ===================================================================== */
const V25LG8_NCTX = ["Pip's jersey number", "Mia's locker number", "the page Leo is reading", "Ava's house number", "the bus number", "Omar's raffle ticket number", "the room number", "Zoe's seat number", "Kai's game score", "the number on the mailbox", "Nora's lucky number", "the number on the race car", "the number of marbles in the jar", "the number on the door", "Lily's team number", "the number of the parking spot"];
const V25LG8_T = x => Math.floor(x / 10), V25LG8_O = x => x % 10;
function V25LG8_nclues(N) {
  const T = V25LG8_T, O = V25LG8_O, t = T(N), o = O(N), s = t + o, C = [], odd = d => d % 2 === 1;
  C.push(N % 2 ? { x: "It is odd.", t: v => v % 2 === 1, f: v => `${v} is even` } : { x: "It is even.", t: v => v % 2 === 0, f: v => `${v} is odd` });
  for (const K of [20, 30, 40, 50, 60, 70, 80, 90]) {
    if (N < K && K - N <= 25) C.push({ x: `It is less than ${K}.`, t: v => v < K, f: v => `${v} is not less than ${K}` });
    if (N > K && N - K <= 25) C.push({ x: `It is more than ${K}.`, t: v => v > K, f: v => `${v} is not more than ${K}` });
  }
  if (t > o) C.push({ x: "Its tens digit is bigger than its ones digit.", t: v => T(v) > O(v), f: v => `in ${v}, ${T(v)} is not bigger than ${O(v)}` });
  if (t < o) C.push({ x: "Its tens digit is smaller than its ones digit.", t: v => T(v) < O(v), f: v => `in ${v}, ${T(v)} is not smaller than ${O(v)}` });
  if (t === o) C.push({ x: "Its two digits are the same.", t: v => T(v) === O(v), f: v => `${v} has two different digits` });
  C.push({ x: `Its digits add up to ${s}.`, t: v => T(v) + O(v) === s, f: v => `${T(v)} + ${O(v)} = ${T(v) + O(v)}, not ${s}` });
  C.push(N % 5 === 0 ? { x: "It is in the 5 times table.", t: v => v % 5 === 0, f: v => `${v} does not end in 0 or 5` } : { x: "It is not in the 5 times table.", t: v => v % 5 !== 0, f: v => `${v} ends in ${O(v)}, so it is in the 5 times table` });
  if (o === 2 * t) C.push({ x: "Its ones digit is double its tens digit.", t: v => O(v) === 2 * T(v), f: v => `double ${T(v)} is ${2 * T(v)}, not ${O(v)}` });
  if (odd(t) && odd(o)) C.push({ x: "Both of its digits are odd.", t: v => odd(T(v)) && odd(O(v)), f: v => `${v} has an even digit` });
  if (!odd(t) && !odd(o)) C.push({ x: "Both of its digits are even.", t: v => !odd(T(v)) && !odd(O(v)), f: v => `${v} has an odd digit` });
  return C;
}
addBank(8, "logic", "numdetective", 0.3, V25LG8_TRY(function () {
  const N = R(10, 99), C = shuffle(V25LG8_nclues(N)), all = range(10, 99);
  for (let i = 0; i < C.length; i++) for (let j = i + 1; j < C.length; j++) for (let k = j + 1; k < C.length; k++) {
    const cl = [C[i], C[j], C[k]], sol = all.filter(v => cl.every(c => c.t(v)));
    if (sol.length !== 1 || sol[0] !== N) continue;
    if ([0, 1, 2].some(d => all.filter(v => cl.every((c, e) => e === d || c.t(v))).length < 2)) continue;
    const near = [0, 1, 2].map(d => shuffle(all.filter(v => cl.every((c, e) => e === d ? !c.t(v) : c.t(v)))));
    const wrong = []; for (const d of shuffle([0, 1, 2])) if (near[d].length) wrong.push(near[d][0]);
    for (const d of [0, 1, 2]) for (const v of near[d]) if (wrong.length < 3 && !wrong.includes(v)) wrong.push(v);
    if (wrong.length < 3) continue;
    const ctx = pick(V25LG8_NCTX), txt = cl.map(c => c.x), opts = shuffle([N, ...wrong.slice(0, 3)]).map(String);
    return V25LG8_FIN({ q: `Find <b>${ctx}</b>. It is a 2-digit number. Read the clues!`, say: `Find ${ctx}. It is a 2-digit number. ${txt.join(" ")} What is the number?`, vis: passage(txt.map((c, e) => `${e + 1}. ${c}`).join("<br>")), opts, ans: String(N), big: 1, why: `${N} fits all three clues, and it is the only 2-digit number that does.`, extra: 15, key: "v25c" + N + txt.join("|") + opts.slice().sort().join() }, p => {
      const v = +p, d = cl.findIndex(c => !c.t(v)); if (d < 0) return null;
      return `${v} doesn't fit clue ${d + 1}: ${cl[d].f(v)}.`;
    }, { k: "nd" });
  }
  return null;
}));
whyRule(8, "logic", "numdetective", V25LG8_RULE);

/* =====================================================================
   8 · lineup: four kids waiting in a line (front to back)
   ===================================================================== */
const V25LG8_LNAMES = ["Ada", "Ben", "Cleo", "Dan", "Ella", "Finn", "Gia", "Hugo", "Iris", "Jay", "Kira", "Leon", "Mila", "Nico", "Opal", "Pablo"];
const V25LG8_LCTX = ["the lunch line", "the line for the slide", "the line at the water fountain", "the line to get on the bus", "the line for the art table", "the line at the library desk", "the line for the swings", "the line for the bake sale", "the line at the ice cream truck", "the line for face painting", "the line at the ticket booth", "the line for the class photo", "the line at the pencil sharpener", "the line for the bounce house", "the line at the snack table"];
const V25LG8_PERM4 = (() => { const out = [], go = (a, rest) => { if (!rest.length) return out.push(a); rest.forEach((x, i) => go([...a, x], rest.filter((_, j) => j !== i))); }; go([], [0, 1, 2, 3]); return out; })();
const V25LG8_LT = (c, L) => { const p = x => L.indexOf(x), a = p(c.a), b = c.b == null ? null : p(c.b); return c.k === "first" ? a === 0 : c.k === "last" ? a === 3 : c.k === "behind" ? a === b + 1 : c.k === "front" ? a < b : c.k === "next" ? Math.abs(a - b) === 1 : c.k === "notnext" ? Math.abs(a - b) !== 1 : c.k === "notfirst" ? a !== 0 : a !== 3; };
const V25LG8_LX = (c, nm) => { const A = nm[c.a], B = c.b == null ? "" : nm[c.b]; return { first: `${A} is first in line.`, last: `${A} is last in line.`, behind: `${A} is right behind ${B}.`, front: `${A} is somewhere in front of ${B}.`, next: `${A} is next to ${B}.`, notnext: `${A} is not next to ${B}.`, notfirst: `${A} is not first.`, notlast: `${A} is not last.` }[c.k]; };
addBank(8, "logic", "lineup", 0.3, V25LG8_TRY(function () {
  const nm = shuffle(V25LG8_LNAMES).slice(0, 4), sol = pick(V25LG8_PERM4), P = [];
  for (let a = 0; a < 4; a++) {
    for (const k of ["first", "last", "notfirst", "notlast"]) P.push({ k, a });
    for (let b = 0; b < 4; b++) if (a !== b) { for (const k of ["behind", "front"]) P.push({ k, a, b }); if (a < b) for (const k of ["next", "notnext"]) P.push({ k, a, b }); }
  }
  const ok = P.filter(c => V25LG8_LT(c, sol)), clues = []; let cands = V25LG8_PERM4.slice();
  for (const c of shuffle(ok)) { const next = cands.filter(L => V25LG8_LT(c, L)); if (next.length < cands.length) { cands = next; clues.push(c); } if (cands.length === 1) break; }
  if (cands.length !== 1 || clues.length < 3 || clues.length > 4) return null;
  const txt = clues.map(c => V25LG8_LX(c, nm)), ctx = pick(V25LG8_LCTX), order = sol.map(i => nm[i]).join(", ");
  const vis = passage(txt.map((c, i) => `${i + 1}. ${c}`).join("<br>")) + `<div class="spots"><span>1st (front)</span><span>2nd</span><span>3rd</span><span>4th</span></div>`;
  const reason = (who, s) => {
    const lines = V25LG8_PERM4.filter(L => L[s] === who), i = clues.findIndex(c => lines.every(L => !V25LG8_LT(c, L)));
    if (i >= 0) return `Clue ${i + 1} says ${txt[i].slice(0, -1)}, so ${nm[who]} can't be ${V25LG8_ORD[s]}.`;
    return `If ${nm[who]} were ${V25LG8_ORD[s]}, the clues couldn't all be true together.`;
  };
  const intro = `${nm[0]}, ${nm[1]}, ${nm[2]} and ${nm[3]} wait in ${ctx}. The 1st kid is at the front.`;
  if (Math.random() < 0.5) {
    const s = R(0, 3), ans = nm[sol[s]], opts = shuffle(nm.slice());
    return V25LG8_FIN({ q: `${intro} Who is <b>${V25LG8_ORD[s]}</b> in line?`, say: `${intro} ${txt.join(" ")} Who is ${V25LG8_ORD[s]} in line?`, vis, opts, ans, big: 1, why: `From front to back, the line is: ${order}.`, extra: 20, key: "v25q" + nm.join() + sol.join() + txt.join("|") + "s" + s }, op => reason(nm.indexOf(op), s), { k: "who" });
  }
  const w = R(0, 3), s = sol.indexOf(w);
  return V25LG8_FIN({ q: `${intro} Where is <b>${nm[w]}</b> in line?`, say: `${intro} ${txt.join(" ")} Where is ${nm[w]} in line?`, vis, opts: V25LG8_ORD.slice(0, 4), ans: V25LG8_ORD[s], big: 1, why: `From front to back, the line is: ${order}. So ${nm[w]} is ${V25LG8_ORD[s]}.`, extra: 20, key: "v25q" + nm.join() + sol.join() + txt.join("|") + "w" + w }, op => reason(w, V25LG8_ORD.indexOf(op)), { k: "where" });
}));
whyRule(8, "logic", "lineup", V25LG8_RULE);

/* =====================================================================
   9 · symmetry: fold across the middle, letters with two mirror lines,
       2-row mirror pictures
   ===================================================================== */
const V25LG8_HY = "CDEHIOX".split(""), V25LG8_HN = "AFGJLMNPQRSTUVWYZ".split("");
const V25LG8_BOTH = "HIOX".split(""), V25LG8_VONLY = "AMTUVWY".split(""), V25LG8_HONLY = "CDE".split("");
const V25LG8_DOTS = ["🔴", "🟠", "🟡", "🟢", "🔵", "🟣"];
addBank(8, "logic", "symmetry", 0.25, V25LG8_TRY(function () {
  const k = Math.random();
  if (k < 0.4) {
    const match = Math.random() < 0.65, ans = pick(match ? V25LG8_HY : V25LG8_HN), opts = shuffle([ans, ...shuffle(match ? V25LG8_HN : V25LG8_HY).slice(0, 3)]);
    return V25LG8_FIN({ q: match ? "Fold each letter along a line going <b>across</b> its middle. Which letter's <b>top and bottom halves match</b>?" : "Fold each letter along a line going <b>across</b> its middle. Which letter's top and bottom halves do <b>not</b> match?", say: match ? "Fold each letter along a line going across its middle. Which letter's top and bottom halves match?" : "Fold each letter along a line going across its middle. Which letter's top and bottom halves do not match?", opts, ans, big: 1, why: match ? `Fold ${ans} across the middle: its top half and bottom half match.` : `Fold ${ans} across the middle: its top and bottom halves don't match.`, key: "v25h" + match + ans + opts.slice().sort().join("") }, p => match ? `Fold ${p} across the middle: its top and bottom halves don't match.` : `Fold ${p} across the middle: its top and bottom halves match.`, { k: "hfold" });
  }
  if (k < 0.7) {
    const ans = pick(V25LG8_BOTH), wrong = shuffle([pick(V25LG8_HONLY), ...shuffle(V25LG8_VONLY).slice(0, 2), ...shuffle(V25LG8_HONLY)]).filter((x, i, a) => a.indexOf(x) === i).slice(0, 3);
    return V25LG8_FIN({ q: "Which letter has <b>two</b> mirror lines: one going <b>down</b> the middle and one going <b>across</b> the middle?", say: "Which letter has two mirror lines: one going down the middle, and one going across the middle?", opts: shuffle([ans, ...wrong]), ans, big: 1, why: `${ans} matches left and right, and it also matches top and bottom.`, key: "v25b" + ans + wrong.slice().sort().join("") }, p => V25LG8_VONLY.includes(p) ? `${p}'s left and right sides match, but its top and bottom halves don't.` : V25LG8_HONLY.includes(p) ? `${p}'s top and bottom halves match, but its left and right sides don't.` : null, { k: "both" });
  }
  const [x0, y0, x1, y1] = shuffle(V25LG8_DOTS).slice(0, 4), g = (a, b, c, d) => `${a}${b}<br>${c}${d}`;
  const ans = g(y0, x0, y1, x1), copy = g(x0, y0, x1, y1), vflip = g(y1, x1, y0, x0), rot = g(x1, y1, x0, y0), bar = `<b style="color:#999">┃</b>`;
  return V25LG8_FIN({ q: "The line going straight <b>down</b> the middle is a mirror. Which picture finishes the <b>right</b> side?", say: "The line going straight down the middle is a mirror. Which picture finishes the right side?", vis: `<div class="eq">${x0}${y0} ${bar} ❓❓<br>${x1}${y1} ${bar} ❓❓</div>`, opts: shuffle([ans, copy, vflip, rot]), ans, sayAns: "each row flipped", why: "A mirror flips each row: the dot next to the line stays next to the line, and the top row stays on top.", key: "v25g" + x0 + y0 + x1 + y1 }, p => p === copy ? "That's the same as the left side. A mirror flips the order in each row." : p === vflip ? "That swaps the top and bottom rows. This mirror only flips left and right." : p === rot ? "That swaps the top and bottom rows and doesn't flip them. The top row should stay on top." : null, { k: "grid" });
}));
whyRule(8, "logic", "symmetry", V25LG8_RULE);

/* =====================================================================
   10 · pyramids: 4-row pyramids and two-step (work down twice) pyramids
   ===================================================================== */
function V25LG8_PYR(rows, hide, tgt) { return `<div class="pyr">${rows.map((r, ri) => `<div class="pyr-row">${r.map((v, ci) => { const k = ri + "," + ci; return k === tgt ? `<span class="q">?</span>` : hide.includes(k) ? `<span style="background:#EEF1F7"></span>` : `<span>${v}</span>`; }).join("")}</div>`).join("")}</div>`; }
const V25LG8_PQ = "Each block is the sum of the two blocks below it. What is the missing number?";
addBank(8, "logic", "pyramids", 0.3, V25LG8_TRY(function () {
  if (Math.random() < 0.55) {
    const b = [R(1, 6), R(1, 6), R(1, 6), R(1, 6)], rows = [b];
    while (rows[0].length > 1) { const r = rows[0]; rows.unshift(r.slice(1).map((v, i) => r[i] + v)); }
    const hr = R(0, 3), hc = R(0, hr), ans = rows[hr][hc];
    let why, rsn;
    if (hr < 3) { const x = rows[hr + 1][hc], y = rows[hr + 1][hc + 1]; why = `${x} + ${y} = ${ans}.`; rsn = p => `The two blocks below add up to ${x} + ${y} = ${ans}, not ${p}.`; }
    else { const pc = hc > 0 ? hc - 1 : 0, nb = hc > 0 ? rows[3][hc - 1] : rows[3][1], above = rows[2][pc]; why = `${above} − ${nb} = ${ans}.`; rsn = p => `${p} + ${nb} = ${+p + nb}, but the block above is ${above}.`; }
    const opts = numU(ans, [ans + 1, ans - 1, ans + 2, ans - 2, ans + 10].filter(v => v > 0), 3, 1);
    return V25LG8_FIN({ q: V25LG8_PQ, say: V25LG8_PQ, vis: V25LG8_PYR(rows, [], hr + "," + hc), opts, ans: String(ans), big: 1, why, key: "v25f" + b.join() + hr + hc }, rsn, { k: "p4" });
  }
  const b = [R(2, 12), R(2, 12), R(2, 12)], m = [b[0] + b[1], b[1] + b[2]], t = m[0] + m[1], rows = [[t], m, b], left = Math.random() < 0.5;
  const shownM = left ? 1 : 0, hidM = 1 - shownM, tb = left ? 0 : 2, ans = b[tb], mid = m[hidM];
  const hide = [`1,${hidM}`, `2,${left ? 2 : 0}`], why = `${t} − ${m[shownM]} = ${mid}, then ${mid} − ${b[1]} = ${ans}.`;
  const opts = numU(ans, [mid, ans + 1, ans - 1, t - b[1], ans + 2].filter(v => v > 0 && v !== ans), 3, 1);
  return V25LG8_FIN({ q: "Each block is the sum of the two blocks below it. Find the number in the <b>?</b> block. Tip: find the empty middle block first!", say: "Each block is the sum of the two blocks below it. Find the number in the question mark block. Tip: find the empty middle block first!", vis: V25LG8_PYR(rows, hide, `2,${tb}`), opts, ans: String(ans), big: 1, why, key: "v25t" + b.join() + left }, p => {
    const v = +p;
    if (v === mid) return `${mid} is the empty middle block (${t} − ${m[shownM]}). Now subtract ${b[1]} to reach the bottom.`;
    return `${v} + ${b[1]} = ${v + b[1]}, but the middle block above it must be ${t} − ${m[shownM]} = ${mid}.`;
  }, { k: "p2" });
}));
whyRule(8, "logic", "pyramids", V25LG8_RULE);

/* =====================================================================
   11 · compass: turning, northeast/northwest…, which steps lead there?
   ===================================================================== */
const V25LG8_DIR = ["north", "east", "south", "west"];
const V25LG8_TURN = { R: [1, "turns right", "turning right"], L: [3, "turns left", "turning left"], A: [2, "turns to face the opposite way", "turning to face the opposite way"] };
const V25LG8_CN = ["Pip", "Mia", "Leo", "Ava", "Omar", "Zoe", "Kai", "Nora", "Ravi", "Lily"];
const V25LG8_PL = { "🌳": "tree", "🏫": "school", "🏪": "shop", "⛲": "fountain", "🏥": "hospital", "🎡": "Ferris wheel", "🐄": "cow", "🏰": "castle", "⛺": "tent" };
function V25LG8_map(n, need) {
  for (let i = 0; i < 80; i++) {
    const h = [R(0, n - 1), R(0, n - 1)], t = [R(0, n - 1), R(0, n - 1)], dr = t[0] - h[0], dc = t[1] - h[1];
    if (!need(dr, dc)) continue;
    const things = shuffle(Object.keys(V25LG8_PL)), cells = { [h.join()]: "🏠", [t.join()]: things[0] }, free = [];
    for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (!cells[r + "," + c]) free.push(r + "," + c);
    shuffle(free).slice(0, 2).forEach((k, j) => cells[k] = things[j + 1]);
    return { h, t, dr, dc, e: things[0], name: V25LG8_PL[things[0]], vis: board(n, cells, null) + V25LG8_ROSE, key: h.join() + t.join() + Object.keys(cells).sort().map(k => k + cells[k]).join() };
  }
  return null;
}
addBank(8, "logic", "compass", 0.3, V25LG8_TRY(function () {
  const k = Math.random();
  if (k < 0.4) {
    const who = pick(V25LG8_CN), s = R(0, 3), acts = Math.random() < 0.45 ? [pick("RLA")] : [pick("RLA"), pick("RLA")];
    const mid = (s + V25LG8_TURN[acts[0]][0]) % 4, end = acts.reduce((d, a) => (d + V25LG8_TURN[a][0]) % 4, s), D = V25LG8_DIR;
    const t2 = acts.length > 1 ? `, then ${V25LG8_TURN[acts[1]][1]}${acts[1] === acts[0] ? " again" : ""}` : "";
    const story = `${who} is facing <b>${D[s]}</b>. ${who} ${V25LG8_TURN[acts[0]][1]}${t2}. Which way is ${who} facing now?`;
    const why = acts.length === 1 ? `${cap(V25LG8_TURN[acts[0]][2])} from ${D[s]} makes you face ${D[end]}.` : `${cap(V25LG8_TURN[acts[0]][2])} from ${D[s]} makes you face ${D[mid]}. Then ${V25LG8_TURN[acts[1]][2]} makes you face ${D[end]}.`;
    return V25LG8_FIN({ q: story, say: xPlainLite(story), vis: V25LG8_ROSE + note("Right turns go around like a clock: north → east → south → west."), opts: D.slice(), ans: D[end], big: 1, why, key: "v25r" + who + s + acts.join("") }, p => acts.length === 1 ? `${cap(V25LG8_TURN[acts[0]][2])} from ${D[s]} makes you face ${D[end]}, not ${p}.` : `After the first turn you face ${D[mid]}. ${cap(V25LG8_TURN[acts[1]][2])} from there makes you face ${D[end]}, not ${p}.`, { k: "turn" });
  }
  if (k < 0.7) {
    const M = V25LG8_map(5, (dr, dc) => dr !== 0 && dc !== 0); if (!M) return null;
    const ud = M.dr < 0 ? "up" : "down", lr = M.dc > 0 ? "right" : "left", ans = (M.dr < 0 ? "north" : "south") + (M.dc > 0 ? "east" : "west");
    const opts = ["northeast", "northwest", "southeast", "southwest"], UD = p => /^north/.test(p) ? "up" : "down", LR = p => /east$/.test(p) ? "right" : "left";
    return V25LG8_FIN({ q: `Which way is the <span class="emo">${M.e}</span> from the 🏠?`, say: `Which way is the ${M.name} from the house?`, vis: M.vis + note("North + east = <b>northeast</b>: up and to the right."), opts, ans, big: 1, why: `The ${M.name} is ${ud} and to the ${lr} of the house, so it is ${ans}.`, key: "v25e" + M.key }, p => `${cap(p)} is ${UD(p)} and to the ${LR(p)}, but the ${M.name} is ${ud} and to the ${lr}.`, { k: "diag" });
  }
  const M = V25LG8_map(5, (dr, dc) => dr !== 0 && dc !== 0 && Math.abs(dr) !== Math.abs(dc)); if (!M) return null;
  const sq = n => `${n} ${n === 1 ? "square" : "squares"}`, ns = M.dr < 0 ? "north" : "south", ew = M.dc > 0 ? "east" : "west", fl = { north: "south", south: "north", east: "west", west: "east" };
  const P = (a, d1, b, d2) => `${sq(a)} ${d1}, then ${sq(b)} ${d2}`, A = Math.abs(M.dr), B = Math.abs(M.dc);
  const ans = P(A, ns, B, ew), fNS = P(A, fl[ns], B, ew), fEW = P(A, ns, B, fl[ew]), sw = P(B, ns, A, ew);
  return V25LG8_FIN({ q: `Which directions lead from the 🏠 to the <span class="emo">${M.e}</span>?`, say: `Which directions lead from the house to the ${M.name}?`, vis: M.vis, opts: shuffle([ans, fNS, fEW, sw]), ans, why: `The ${M.name} is ${sq(A)} ${ns} and ${sq(B)} ${ew} of the house.`, key: "v25s" + M.key }, p => p === fNS ? "That mixes up north and south. North is up and south is down." : p === fEW ? "That mixes up east and west. East is right and west is left." : p === sw ? `The numbers are swapped. The ${M.name} is ${sq(A)} ${ns} and ${sq(B)} ${ew}.` : null, { k: "path" });
}));
whyRule(8, "logic", "compass", V25LG8_RULE);

/* =====================================================================
   12 · venncount: missing parts, kids in neither circle, how many do NOT…
   ===================================================================== */
const V25LG8_VC = [
  ["Likes apples", "like apples", "Likes grapes", "like grapes"], ["Plays chess", "play chess", "Plays drums", "play drums"],
  ["Has a cat", "have a cat", "Has a dog", "have a dog"], ["Likes rain", "like rain", "Likes snow", "like snow"],
  ["Reads comics", "read comics", "Reads poems", "read poems"], ["In the choir", "are in the choir", "In the band", "are in the band"],
  ["Has a bike", "have a bike", "Has a scooter", "have a scooter"], ["Likes math", "like math", "Likes art", "like art"],
  ["Plays tennis", "play tennis", "Plays baseball", "play baseball"], ["Likes carrots", "like carrots", "Likes peas", "like peas"],
  ["Has a pet fish", "have a pet fish", "Has a pet bird", "have a pet bird"], ["Likes summer", "like summer", "Likes winter", "like winter"],
  ["In art club", "are in art club", "In chess club", "are in chess club"], ["Plays violin", "play violin", "Plays flute", "play flute"],
  ["Likes hiking", "like hiking", "Likes camping", "like camping"], ["Likes popcorn", "like popcorn", "Likes pretzels", "like pretzels"],
];
const V25LG8_NEG = vp => /^are /.test(vp) ? vp.replace(/^are /, "are not ") : `do not ${vp}`;
addBank(8, "logic", "venncount", 0.3, V25LG8_TRY(function () {
  const [A, vA, B, vB] = pick(V25LG8_VC), a = R(2, 9), both = R(1, 7), b = R(2, 9), k = Math.random(), sideA = Math.random() < 0.5;
  const own = sideA ? a : b, oth = sideA ? b : a, lab = sideA ? A : B, vp = sideA ? vA : vB, ovp = sideA ? vB : vA, olab = sideA ? B : A, tot = own + both;
  if (k < 0.4) {
    const askMid = Math.random() < 0.5, ans = askMid ? both : own, known = askMid ? own : both;
    const vis = sideA ? vennCount(A, B, askMid ? a : "?", askMid ? "?" : both, b) : vennCount(A, B, a, askMid ? "?" : both, askMid ? b : "?");
    const qq = askMid ? "How many kids are in <b>both</b> circles?" : `How many kids are in <b>only</b> the “${lab}” circle?`;
    const opts = numU(ans, [tot, tot + known, oth, ans + 1, ans - 1].filter(v => v >= 0 && v !== ans), 3, 0);
    return V25LG8_FIN({ q: `In all, <b>${tot}</b> kids ${vp}. ${qq}`, say: `In all, ${tot} kids ${vp}. ${xPlainLite(qq)}`, vis, opts, ans: String(ans), big: 1, why: `The whole “${lab}” circle is ${tot}. ${tot} − ${known} = ${ans}.`, key: "v25v" + A + a + both + b + sideA + askMid }, p => {
      const v = +p;
      if (v === tot) return `${tot} is the whole “${lab}” circle. Take away the ${known} you can already see.`;
      if (v === tot + known) return `Don't add the ${known}. Subtract it: ${tot} − ${known} = ${ans}.`;
      if (v === known) return `${known} is already in the picture. ${tot} − ${known} = ${ans}.`;
      if (v === oth && v !== ans) return `${oth} is the number of kids in only the “${olab}” circle.`;
      return `${v} + ${known} = ${v + known}, but ${tot} kids ${vp} in all.`;
    }, { k: "miss" });
  }
  const o = R(1, 6), S = a + both + b, T = S + o, vis = vennCount(A, B, a, both, b);
  if (k < 0.7) {
    const opts = numU(o, [S, o + both, o + 1, o - 1, T].filter(v => v >= 0 && v !== o), 3, 0);
    return V25LG8_FIN({ q: `There are <b>${T}</b> kids in the class. The diagram shows everyone except the kids in neither circle. How many kids are in <b>neither</b> circle?`, say: `There are ${T} kids in the class. The diagram shows everyone except the kids in neither circle. How many kids are in neither circle?`, vis, opts, ans: String(o), big: 1, why: `${a} + ${both} + ${b} = ${S} kids are in the circles. ${T} − ${S} = ${o}.`, key: "v25u" + A + a + both + b + o }, p => {
      const v = +p;
      if (v === S) return `${S} is how many kids are inside the circles, not outside them.`;
      if (v === T) return `${T} is the whole class. Take away the ${S} kids inside the circles.`;
      if (v === o + both) return `Don't forget the ${both} ${both === 1 ? "kid" : "kids"} in the middle. ${T} − ${S} = ${o}.`;
      return `${a} + ${both} + ${b} = ${S}, and ${T} − ${S} = ${o}, not ${v}.`;
    }, { k: "out" });
  }
  const ans = oth + o, neg = V25LG8_NEG(vp);
  const opts = numU(ans, [oth, o, tot, oth + both + o, ans + 1].filter(v => v >= 0 && v !== ans), 3, 0);
  return V25LG8_FIN({ q: `${o} ${o === 1 ? "kid is" : "kids are"} in neither circle. How many kids <b>${neg}</b>?`, say: `${o} ${o === 1 ? "kid is" : "kids are"} in neither circle. How many kids ${neg}?`, vis, opts, ans: String(ans), big: 1, why: `Count everyone outside the “${lab}” circle: ${oth} + ${o} = ${ans}.`, key: "v25n" + A + a + both + b + o + sideA }, p => {
    const v = +p;
    if (v === oth && oth !== ans) return `That leaves out the ${o} ${o === 1 ? "kid" : "kids"} in neither circle.`;
    if (v === o && o !== ans) return `That leaves out the ${oth} kids in only the “${olab}” circle.`;
    if (v === tot) return `${tot} kids ${vp}. The question asks about kids who ${neg.replace(/^do not /, "don't ").replace(/^are not /, "aren't ")}.`;
    if (v === oth + both + o) return `The ${both} ${both === 1 ? "kid" : "kids"} in the middle ${both === 1 ? vp.replace(/^are /, "is ").replace(/^(like|play|have|read)\b/, m => m === "have" ? "has" : m + "s") : vp}, so don't count them.`;
    return `${oth} + ${o} = ${ans}, not ${v}.`;
  }, { k: "not" });
}));
whyRule(8, "logic", "venncount", V25LG8_RULE);

/* =====================================================================
   13 · whichop: story problems (which number sentence?) and signs that
        make both sides equal
   ===================================================================== */
const V25LG8_OPM = { "+": "Adding puts amounts together", "−": "Subtracting takes some away or finds a difference", "×": "Multiplying finds the total of equal groups", "÷": "Dividing splits a total into equal groups" };
const V25LG8_OPV = { "+": "add", "−": "subtract", "×": "multiply", "÷": "divide" };
const V25LG8_ST = [
  ["÷", (N, k) => `${N} stickers are shared equally among ${k} friends. How many stickers does each friend get?`],
  ["÷", (N, k) => `${N} chairs are set up in ${k} equal rows. How many chairs are in each row?`],
  ["÷", (N, k) => `${N} muffins are packed in boxes, with ${k} muffins in each box. How many boxes are filled?`],
  ["÷", (N, k) => `A ribbon ${N} inches long is cut into ${k} equal pieces. How long is each piece?`],
  ["×", (k, m) => `There are ${k} bags with ${m} apples in each bag. How many apples are there in all?`],
  ["×", (k, m) => `Leo reads ${m} pages every day for ${k} days. How many pages does he read in all?`],
  ["×", (k, m) => `A garden has ${k} rows with ${m} carrots in each row. How many carrots are there?`],
  ["×", (k, m) => `Each box holds ${m} crayons. How many crayons are in ${k} boxes?`],
  ["+", (a, b) => `Mia has ${a} shells. She finds ${b} more shells. How many shells does she have now?`],
  ["+", (a, b) => `There are ${a} red birds and ${b} blue birds on a fence. How many birds are there in all?`],
  ["+", (a, b) => `Ben scored ${a} points in the first game and ${b} points in the second game. How many points did he score in all?`],
  ["+", (a, b) => `A library had ${a} books. It got ${b} new books. How many books does it have now?`],
  ["−", (a, b) => `There were ${a} muffins on a tray. The class ate ${b}. How many muffins are left?`],
  ["−", (a, b) => `Zoe had ${a} beads. She gave ${b} beads to her sister. How many beads does Zoe have now?`],
  ["−", (a, b) => `A bus had ${a} people on it. Then ${b} people got off. How many people are still on the bus?`],
  ["−", (a, b) => `Sam has ${a} cards. Ivy has ${b} cards. How many more cards does Sam have than Ivy?`, 1],
];
addBank(8, "logic", "whichop", 0.3, V25LG8_TRY(function () {
  if (Math.random() < 0.55) {
    const si = R(0, V25LG8_ST.length - 1), [op, fn, cmp] = V25LG8_ST[si]; let x, y, text, need, P, Qn;
    if (op === "÷") { const k = R(2, 6), m = R(2, 9); if (k === m) return null; x = k * m; y = k; text = fn(x, y); need = `a total of ${x} is split into equal groups`; }
    else if (op === "×") { const k = R(2, 5), m = R(3, 9); if (k === m) return null; x = k; y = m; text = fn(k, m); need = `you need the total of ${k} equal groups of ${m}`; }
    else if (op === "+") { x = R(12, 40); y = R(5, 20); text = fn(x, y); need = "two amounts are put together"; }
    else { x = R(20, 50); y = R(5, x - 5); text = fn(x, y); need = cmp ? "you compare two amounts to find the difference" : `some are taken away from ${x}`; }
    P = Math.max(x, y); Qn = Math.min(x, y); if (P === Qn) return null;
    const sent = o => `${P} ${o} ${Qn}`, val = { "+": P + Qn, "−": P - Qn, "×": P * Qn, "÷": P / Qn }[op];
    const opts = ["+", "−", "×", "÷"].map(sent);
    return V25LG8_FIN({ q: "Which number sentence solves this problem?", say: `${text} Which number sentence solves this problem?`, vis: passage(text), opts, ans: sent(op), why: `${cap(need)}, so ${V25LG8_OPV[op]}: ${sent(op)} = ${val}.`, key: "v25w" + si + x + "," + y }, p => { const po = p.split(" ")[1]; return `${V25LG8_OPM[po]}, but here ${need}.`; }, { k: "story" });
  }
  const ops = ["+", "−", "×", "÷"], op = pick(ops); let L, c, d;
  if (op === "+") { L = R(8, 30); d = R(2, L - 2); c = L - d; }
  else if (op === "−") { L = R(3, 20); d = R(2, 15); c = L + d; }
  else if (op === "×") { const f = [[2, 3], [2, 4], [2, 5], [3, 3], [2, 6], [3, 4], [2, 8], [3, 5], [4, 4], [3, 6], [4, 5], [3, 7], [4, 6], [5, 5], [3, 9], [4, 7], [5, 6]]; [d, c] = pick(f); L = c * d; }
  else { L = R(2, 10); d = R(2, 5); c = L * d; }
  if (c < d) [c, d] = [d, c];
  const val = o => o === "+" ? c + d : o === "−" ? c - d : o === "×" ? c * d : c / d;
  if (ops.filter(o => val(o) === L).length !== 1) return null;
  const lf = pick(["+", "×", "−"]); let lx, ly;
  if (lf === "+") { if (L < 4) return null; ly = R(1, L - 2); lx = L - ly; }
  else if (lf === "−") { ly = R(1, 9); lx = L + ly; }
  else { const fs = range(2, L - 1).filter(f => L % f === 0 && L / f >= 2); if (!fs.length) return null; ly = pick(fs); lx = L / ly; }
  const left = `${lx} ${lf} ${ly}`;
  if (left === `${c} ${op} ${d}` || left === `${d} ${op} ${c}`) return null;
  return V25LG8_FIN({ q: "Which sign makes <b>both sides equal</b>?", say: `${lx} ${lf === "×" ? "times" : lf === "+" ? "plus" : "minus"} ${ly} equals ${c}, blank, ${d}. Which sign makes both sides equal?`, vis: eq(`${left} = ${c} ${blank("?")} ${d}`), opts: ops.slice(), ans: op, big: 1, why: `${left} = ${L}, and ${c} ${op} ${d} = ${L} too.`, key: "v25e" + left + "=" + c + op + d }, p => {
    const v = val(p);
    if (p === "÷" && !Number.isInteger(v)) return `${c} ÷ ${d} doesn't split evenly, so it can't equal ${L}.`;
    return `${c} ${p} ${d} = ${v}, but ${left} = ${L}.`;
  }, { k: "both" });
}));
whyRule(8, "logic", "whichop", V25LG8_RULE);

/* =====================================================================
   14 · sortrule: word rules, new number rules (3s/4s tables, two-part rules),
        and "which word is in the wrong group?"
   ===================================================================== */
const V25LG8_WORDS = ["cat", "dog", "sun", "bus", "hat", "pig", "bee", "egg", "owl", "ant", "ice", "box", "cup", "bed", "zoo", "arm", "ink", "oak", "fish", "book", "tree", "moon", "frog", "duck", "kite", "lamp", "ball", "ship", "cake", "snow", "boat", "bell", "seed", "sock", "bike", "door", "star", "apple", "tiger", "house", "plant", "cloud", "zebra", "bread", "sheep", "grass", "train", "ocean", "eagle", "igloo", "spoon", "horse", "smile", "bunny", "snake", "beach"];
const V25LG8_WR = [
  ...[3, 4, 5].map(n => ({ id: "l" + n, lab: `Has ${n} letters`, t: w => w.length === n, yes: `has ${n} letters`, no: `does not have ${n} letters` })),
  { id: "vow", lab: "Starts with a vowel", t: w => "aeiou".includes(w[0]), yes: "starts with a vowel", no: "does not start with a vowel" },
  { id: "dbl", lab: "Has a double letter", t: w => /(.)\1/.test(w), yes: "has a double letter", no: "has no double letter" },
  { id: "ende", lab: "Ends with e", t: w => w.endsWith("e"), yes: "ends with e", no: "does not end with e" },
  { id: "hasa", lab: "Has the letter a", t: w => w.includes("a"), yes: "has the letter a", no: "does not have the letter a" },
  { id: "haso", lab: "Has the letter o", t: w => w.includes("o"), yes: "has the letter o", no: "does not have the letter o" },
  { id: "sts", lab: "Starts with s", t: w => w[0] === "s", yes: "starts with s", no: "does not start with s" },
  { id: "stb", lab: "Starts with b", t: w => w[0] === "b", yes: "starts with b", no: "does not start with b" },
];
const V25LG8_NR = [
  { id: "ev", lab: "Even numbers", t: n => n % 2 === 0, yes: "is even", no: "is odd" },
  { id: "od", lab: "Odd numbers", t: n => n % 2 === 1, yes: "is odd", no: "is even" },
  ...[3, 4, 5].map(k => ({ id: "m" + k, lab: `In the ${k} times table`, t: n => n % k === 0, yes: `is in the ${k} times table`, no: `is not in the ${k} times table`, nw: k < 5 })),
  { id: "lt15", lab: "Smaller than 15", t: n => n < 15, yes: "is smaller than 15", no: "is not smaller than 15", avoid: 15, nw: 1 },
  { id: "gt15", lab: "Bigger than 15", t: n => n > 15, yes: "is bigger than 15", no: "is not bigger than 15", avoid: 15, nw: 1 },
  { id: "evlt20", lab: "Even and smaller than 20", t: n => n % 2 === 0 && n < 20, yes: "is even and smaller than 20", no: "is not both even and smaller than 20", avoid: 20, nw: 1 },
  { id: "odgt10", lab: "Odd and bigger than 10", t: n => n % 2 === 1 && n > 10, yes: "is odd and bigger than 10", no: "is not both odd and bigger than 10", avoid: 10, nw: 1 },
  { id: "h1", lab: "Has a 1 in it", t: n => String(n).includes("1"), yes: "has a 1 in it", no: "has no 1 in it" },
  { id: "h2", lab: "Has a 2 in it", t: n => String(n).includes("2"), yes: "has a 2 in it", no: "has no 2 in it" },
];
const V25LG8_SEP = (r, A, B) => A.every(r.t) && !B.some(r.t);
function V25LG8_which(rules, pool, words) {
  const ansPool = words ? rules : rules.filter(r => r.nw);
  for (let i = 0; i < 80; i++) {
    const r = pick(ansPool), P = pool.filter(x => x !== r.avoid), yes = P.filter(r.t), no = P.filter(x => !r.t(x));
    if (yes.length < 4 || no.length < 4) continue;
    const srt = words ? a => a : a => a.sort((x, y) => x - y), A = srt(shuffle(yes).slice(0, 4)), B = srt(shuffle(no).slice(0, 4));
    const bad = rules.filter(x => x.id !== r.id && !V25LG8_SEP(x, A, B)), tempt = shuffle(bad.filter(x => A.every(x.t) || !B.some(x.t))), rest = shuffle(bad.filter(x => !tempt.includes(x)));
    const dis = [...tempt.slice(0, 2), ...rest].slice(0, 3); if (dis.length < 3) continue;
    const opts = shuffle([r, ...dis]), nm = x => words ? `“${x}”` : String(x), thing = words ? "word" : "number";
    return V25LG8_FIN({ q: `Every ${thing} in <b>Group A</b> follows one rule. No ${thing} in Group B does. What is the rule?`, say: `Group A has ${A.join(", ")}. Group B has ${B.join(", ")}. Every ${thing} in group A follows one rule, and no ${thing} in group B does. What is the rule?`, vis: LG8V_GTABLE(A, B), opts: opts.map(x => x.lab), ans: r.lab, why: `Every ${thing} in Group A ${r.yes}, but no ${thing} in Group B follows that rule.`, key: "v25" + (words ? "W" : "N") + r.id + A.join() + "|" + B.join() }, lab => {
      const x = opts.find(o => o.lab === lab); if (!x) return null;
      const a = A.find(v => !x.t(v)); if (a != null) return `${nm(a)} is in Group A, but it ${x.no}.`;
      const b = B.find(v => x.t(v)); if (b != null) return `${nm(b)} is in Group B, but it ${x.yes} too.`;
      return null;
    }, { k: words ? "wwhich" : "nwhich" });
  }
  return null;
}
addBank(8, "logic", "sortrule", 0.3, V25LG8_TRY(function () {
  const k = Math.random();
  if (k < 0.4) return V25LG8_which(V25LG8_WR, V25LG8_WORDS, true);
  if (k < 0.7) return V25LG8_which(V25LG8_NR, range(1, 30), false);
  const r = pick(V25LG8_WR), yes = shuffle(V25LG8_WORDS.filter(r.t)), no = shuffle(V25LG8_WORDS.filter(w => !r.t(w)));
  if (yes.length < 5 || no.length < 5) return null;
  const intoA = Math.random() < 0.5, A = yes.slice(0, intoA ? 3 : 4), B = no.slice(0, intoA ? 4 : 3), odd = intoA ? no[4] : yes[4];
  (intoA ? A : B).push(odd); const As = shuffle(A), Bs = shuffle(B);
  const opts = shuffle([odd, ...shuffle([...A, ...B].filter(w => w !== odd)).slice(0, 3)]);
  return V25LG8_FIN({ q: `The rule for <b>Group A</b> is <b>${r.lab}</b>. All other words go in Group B. One word is in the <b>wrong</b> group. Which one?`, say: `The rule for group A is: ${r.lab}. All other words go in group B. Group A has ${As.join(", ")}. Group B has ${Bs.join(", ")}. One word is in the wrong group. Which one?`, vis: LG8V_GTABLE(As, Bs), opts, ans: odd, big: 1, why: intoA ? `“${odd}” ${r.no}, so it belongs in Group B, not Group A.` : `“${odd}” ${r.yes}, so it belongs in Group A, not Group B.`, key: "v25X" + r.id + As.slice().sort().join() + "|" + Bs.slice().sort().join() }, w => A.includes(w) ? `“${w}” ${r.yes}, so it is in the right group: Group A.` : B.includes(w) ? `“${w}” ${r.no}, so it is in the right group: Group B.` : null, { k: "wwrong" });
}));
whyRule(8, "logic", "sortrule", V25LG8_RULE);

/* =====================================================================
   15 · shapeclues: mystery solid shapes (3D) and flat shapes that include
        pentagons and rectangles
   ===================================================================== */
const V25LG8_SOL = [
  { n: "cube", f: 6, c: 8, roll: 0, curve: 0, tip: 0, sq: 1, tri: 0, nsq: 0 },
  { n: "rectangular prism", f: 6, c: 8, roll: 0, curve: 0, tip: 0, sq: 0, tri: 0, nsq: 1 },
  { n: "square pyramid", f: 5, c: 5, roll: 0, curve: 0, tip: 1, sq: 0, tri: 1, nsq: 1 },
  { n: "sphere", f: 0, c: 0, roll: 1, curve: 1, tip: 0, sq: 0, tri: 0, nsq: 0 },
  { n: "cylinder", f: 2, c: 0, roll: 1, curve: 1, tip: 0, sq: 0, tri: 0, nsq: 1 },
  { n: "cone", f: 1, c: null, roll: 1, curve: 1, tip: 1, sq: 0, tri: 0, nsq: 1 },
];
const V25LG8_FF = n => n === 0 ? "no flat faces" : n === 1 ? "1 flat face" : `${n} flat faces`;
function V25LG8_solClues(T) {
  const P = [], A = s => V25LG8_AN(s.n);
  P.push({ x: `I have ${V25LG8_FF(T.f)}.`, t: s => s.f === T.f, fa: s => `${A(s)} has ${V25LG8_FF(s.f)}` });
  if (T.c === 8 || T.c === 5) P.push({ x: `I have ${T.c} corners.`, t: s => s.c === T.c, fa: s => `${A(s)} doesn't have ${T.c} corners` });
  P.push(T.roll ? { x: "I can roll.", t: s => s.roll, fa: s => `${A(s)} can't roll` } : { x: "I can't roll.", t: s => !s.roll, fa: s => `${A(s)} can roll` });
  P.push(T.curve ? { x: "I have a curved surface.", t: s => s.curve, fa: s => `${A(s)} has no curved surface` } : { x: "All my faces are flat.", t: s => !s.curve, fa: s => `${A(s)} has a curved surface` });
  P.push(T.tip ? { x: "I have a pointy tip.", t: s => s.tip, fa: s => `${A(s)} has no pointy tip` } : { x: "I don't have a pointy tip.", t: s => !s.tip, fa: s => `${A(s)} has a pointy tip` });
  if (T.sq) P.push({ x: "All my faces are squares.", t: s => s.sq, fa: s => `${A(s)} doesn't have all square faces` });
  if (T.nsq && !T.curve) P.push({ x: "Some of my faces are not squares.", t: s => s.nsq, fa: s => s.f === 0 ? `${A(s)} has no flat faces` : `all of the ${s.n}'s faces are squares` });
  if (T.tri) P.push({ x: "Some of my faces are triangles.", t: s => s.tri, fa: s => `${A(s)} has no triangle faces` });
  return P;
}
const V25LG8_SIDES = { circle: 0, triangle: 3, square: 4, rectangle: 4, pentagon: 5, hexagon: 6 };
const V25LG8_SHAPES = Object.keys(V25LG8_SIDES);
const V25LG8_SD = x => `${x.z} ${COLNAME[x.c]} ${x.s}`;
const V25LG8_SO = x => shp(x.s, x.c, x.z === "small" ? 40 : 72).replace(/aria-label="([^"]+)"/, `aria-label="${x.z} $1"`);
const V25LG8_SIDEF = x => V25LG8_SIDES[x.s] ? `has ${V25LG8_SIDES[x.s]} sides` : "has no straight sides";
function V25LG8_flatClues(T, items) {
  const P = [], sd = V25LG8_SIDES[T.s], others = items.filter(x => x !== T), D = x => `the ${V25LG8_SD(x)}`, hasCircle = items.some(x => x.s === "circle");
  P.push({ x: `I am ${COLNAME[T.c]}.`, t: x => x.c === T.c, fa: x => `${D(x)} is ${COLNAME[x.c]}` });
  for (const c of [...new Set(others.map(o => o.c))]) if (c !== T.c) P.push({ x: `I am not ${COLNAME[c]}.`, t: x => x.c !== c, fa: x => `${D(x)} is ${COLNAME[c]}` });
  if (sd === 0) P.push({ x: "I have no corners.", t: x => V25LG8_SIDES[x.s] === 0, fa: x => `${D(x)} has corners` });
  else {
    P.push({ x: `I have ${sd} sides.`, t: x => V25LG8_SIDES[x.s] === sd, fa: x => `${D(x)} ${V25LG8_SIDEF(x)}` });
    P.push({ x: "I have corners.", t: x => V25LG8_SIDES[x.s] > 0, fa: x => `${D(x)} has no corners` });
    for (const k of [3, 4, 5]) if (sd > k) P.push({ x: `I have more than ${k} sides.`, t: x => V25LG8_SIDES[x.s] > k, fa: x => `${D(x)} ${V25LG8_SIDEF(x)}` });
    if (!hasCircle) for (const k of [4, 5, 6]) if (sd < k) P.push({ x: `I have fewer than ${k} sides.`, t: x => V25LG8_SIDES[x.s] < k, fa: x => `${D(x)} ${V25LG8_SIDEF(x)}` });
  }
  for (const s of [...new Set(others.map(o => o.s))]) if (s !== T.s && !(s === "rectangle" && T.s === "square")) P.push({ x: `I am not ${V25LG8_AN(s)}.`, t: x => x.s !== s, fa: x => `that one is ${V25LG8_AN(s)}` });
  P.push({ x: `I am ${T.z}.`, t: x => x.z === T.z, fa: x => `${D(x)} is ${x.z}` });
  return P;
}
addBank(8, "logic", "shapeclues", 0.3, V25LG8_TRY(function () {
  if (Math.random() < 0.5) {
    const T = pick(V25LG8_SOL), clues = []; let cand = V25LG8_SOL.slice();
    for (const c of shuffle(V25LG8_solClues(T))) { const next = cand.filter(c.t); if (next.length < cand.length) { cand = next; clues.push(c); } if (cand.length === 1) break; }
    if (cand.length !== 1 || clues.length < 2 || clues.length > 3) return null;
    const near = shuffle(V25LG8_SOL.filter(s => s !== T)).sort((a, b) => clues.filter(c => !c.t(a)).length - clues.filter(c => !c.t(b)).length);
    const opts = shuffle([T, ...near.slice(0, 3)]), txt = clues.map(c => c.x);
    return V25LG8_FIN({ q: "Read the clues. <b>Which solid shape am I?</b>", say: `${txt.join(" ")} Which solid shape am I?`, vis: passage(txt.map((c, i) => `${i + 1}. ${c}`).join("<br>")), opts: opts.map(s => s.n), ans: T.n, big: 1, why: `Only ${V25LG8_AN(T.n)} fits every clue.`, key: "v25o" + T.n + txt.join("|") + opts.map(s => s.n).sort().join() }, n => {
      const s = V25LG8_SOL.find(x => x.n === n); if (!s) return null; const i = clues.findIndex(c => !c.t(s)); if (i < 0) return null;
      return `Clue ${i + 1} says ${V25LG8_QT(txt[i])}, but ${clues[i].fa(s)}.`;
    }, { k: "solid" });
  }
  const items = [];
  while (items.length < 4) { const x = { s: pick(V25LG8_SHAPES), c: pick(LG8V_COLS), z: pick(["small", "big"]) }; if (!items.some(y => V25LG8_SD(y) === V25LG8_SD(x))) items.push(x); }
  if (!items.some(x => x.s === "pentagon" || x.s === "rectangle")) return null;
  const T = pick(items), clues = []; let cand = items.slice();
  for (const c of shuffle(V25LG8_flatClues(T, items))) { const next = cand.filter(c.t); if (next.length < cand.length) { cand = next; clues.push(c); } if (cand.length === 1) break; }
  if (cand.length !== 1 || clues.length < 2 || clues.length > 3) return null;
  const opts = shuffle(items), txt = clues.map(c => c.x), map = {};
  opts.forEach(x => map[V25LG8_SO(x)] = x);
  return V25LG8_FIN({ q: "Read the clues. <b>Which shape am I?</b>", say: `${txt.join(" ")} Which shape am I?`, vis: passage(txt.map((c, i) => `${i + 1}. ${c}`).join("<br>")), opts: opts.map(V25LG8_SO), ans: V25LG8_SO(T), sayAns: `the ${V25LG8_SD(T)}`, why: `Only the ${V25LG8_SD(T)} fits every clue.`, key: "v25f" + txt.join("|") + items.map(V25LG8_SD).sort().join() + V25LG8_SD(T) }, op => {
    const x = map[op]; if (!x) return null; const i = clues.findIndex(c => !c.t(x)); if (i < 0) return null;
    return `Clue ${i + 1} says ${V25LG8_QT(txt[i])}, but ${clues[i].fa(x)}.`;
  }, { k: "flat" });
}));
whyRule(8, "logic", "shapeclues", V25LG8_RULE);

