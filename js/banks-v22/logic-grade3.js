/* =====================================================================
   v22 · Logical Thinking, age 8 (tag LG8V)
   Part A: two new topics: Sorting Rules (sortrule), Shape Detective (shapeclues)
   Part B: more questions for every existing age 8 logic topic
   ===================================================================== */

/* ---------- shared bits ---------- */
const LG8V_ORD = ["first", "second", "third", "fourth", "fifth"];
const LG8V_SIDES = { circle: 0, triangle: 3, square: 4, hexagon: 6 };
const LG8V_PL = { circle: "circles", triangle: "triangles", square: "squares", hexagon: "hexagons" };
const LG8V_COLS = Object.keys(COLNAME);
const LG8V_AN = w => (/^[aeiou]/.test(w) ? "an " : "a ") + w;

/* =====================================================================
   NEW TOPIC 1 · Sorting Rules
   ===================================================================== */
const LG8V_NRULES = (() => {
  const L = [
    { id: "even", lab: "Even numbers", t: n => n % 2 === 0, yes: "is even", no: "is not even" },
    { id: "odd", lab: "Odd numbers", t: n => n % 2 === 1, yes: "is odd", no: "is not odd" },
    { id: "e05", lab: "Ends in 0 or 5", t: n => n % 5 === 0, yes: "ends in 0 or 5", no: "does not end in 0 or 5" },
    { id: "e0", lab: "Ends in 0", t: n => n % 10 === 0, yes: "ends in 0", no: "does not end in 0" },
    { id: "d2", lab: "Has 2 digits", t: n => n >= 10, yes: "has 2 digits", no: "has only 1 digit" },
    { id: "d1", lab: "Has only 1 digit", t: n => n < 10, yes: "has only 1 digit", no: "has 2 digits" },
    { id: "same", lab: "Both digits the same", t: n => n >= 10 && n % 11 === 0, yes: "has two digits that are the same", no: "does not have two matching digits" },
  ];
  for (const k of [10, 20, 25, 30, 40]) L.push({ id: "gt" + k, lab: `Bigger than ${k}`, t: n => n > k, yes: `is bigger than ${k}`, no: `is not bigger than ${k}`, avoid: k });
  for (const k of [10, 20, 30]) L.push({ id: "lt" + k, lab: `Smaller than ${k}`, t: n => n < k, yes: `is smaller than ${k}`, no: `is not smaller than ${k}`, avoid: k });
  for (const d of [1, 2, 3, 4, 5, 6, 7, 8, 9]) L.push({ id: "has" + d, lab: `Has a ${d} in it`, t: n => String(n).includes(String(d)), yes: `has a ${d} in it`, no: `has no ${d} in it` });
  for (const d of [1, 2, 3, 4]) L.push({ id: "ten" + d, lab: `${d} in the tens place`, t: n => n >= 10 && Math.floor(n / 10) === d, yes: `has ${d} in the tens place`, no: `does not have ${d} in the tens place` });
  return L;
})();
const LG8V_SRULES = (() => {
  const L = [];
  for (const c of LG8V_COLS) L.push({ id: "c" + COLNAME[c], lab: `${cap(COLNAME[c])} shapes`, t: x => x.c === c, yes: `is ${COLNAME[c]}`, no: `is not ${COLNAME[c]}` });
  for (const s of LSHAPES) L.push({ id: "s" + s, lab: cap(LG8V_PL[s]), t: x => x.s === s, yes: `is ${LG8V_AN(s)}`, no: `is not ${LG8V_AN(s)}` });
  L.push({ id: "m3", lab: "More than 3 sides", t: x => LG8V_SIDES[x.s] > 3, yes: "has more than 3 sides", no: "does not have more than 3 sides" });
  L.push({ id: "corn", lab: "Shapes with corners", t: x => x.s !== "circle", yes: "has corners", no: "has no corners" });
  return L;
})();
const LG8V_NUMS = range(1, 50);
const LG8V_SHAPES = LSHAPES.flatMap(s => LG8V_COLS.map(c => ({ s, c })));
const LG8V_SNAME = x => `${COLNAME[x.c]} ${x.s}`;
const LG8V_GTABLE = (A, B) => table(range(0, Math.max(A.length, B.length) - 1).map(i => [A[i] != null ? A[i] : "", B[i] != null ? B[i] : ""]), ["Group A", "Group B"]);
/* does this rule put every A item in and every B item out? */
const LG8V_SEP = (r, A, B) => A.every(r.t) && !B.some(r.t);

function LG8V_sortWhich() {
  for (let tries = 0; tries < 80; tries++) {
    const r = pick(LG8V_NRULES), pool = LG8V_NUMS.filter(n => n !== r.avoid);
    const yes = pool.filter(r.t), no = pool.filter(n => !r.t(n));
    if (yes.length < 4 || no.length < 4) continue;
    const A = shuffle(yes).slice(0, 4).sort((x, y) => x - y), B = shuffle(no).slice(0, 4).sort((x, y) => x - y);
    const bad = LG8V_NRULES.filter(x => x.lab !== r.lab && !LG8V_SEP(x, A, B));
    const tempting = shuffle(bad.filter(x => A.every(x.t) || !B.some(x.t))), rest = shuffle(bad.filter(x => !tempting.includes(x)));
    const dis = [...tempting.slice(0, 2), ...rest].slice(0, 3);
    if (dis.length < 3) continue;
    const opts = shuffle([r, ...dis]);
    return { q: "Every number in <b>Group A</b> follows one rule. No number in Group B does. What is the rule?", say: `Group A has ${A.join(", ")}. Group B has ${B.join(", ")}. Every number in group A follows one rule, and no number in group B does. What is the rule?`, vis: LG8V_GTABLE(A, B), opts: opts.map(x => x.lab), ans: r.lab, why: `Every number in Group A ${r.yes}, but no number in Group B follows that rule.`, key: "w" + r.id + A.join() + "|" + B.join(), v22: { k: "which", A, B, rules: opts } };
  }
  return null;
}
function LG8V_sortWrong() {
  for (let tries = 0; tries < 80; tries++) {
    const r = pick(LG8V_NRULES), pool = LG8V_NUMS.filter(n => n !== r.avoid);
    const yes = shuffle(pool.filter(r.t)), no = shuffle(pool.filter(n => !r.t(n)));
    if (yes.length < 5 || no.length < 5) continue;
    const intoA = Math.random() < 0.5, A = yes.slice(0, intoA ? 3 : 4), B = no.slice(0, intoA ? 4 : 3), odd = intoA ? no[4] : yes[4];
    (intoA ? A : B).push(odd); A.sort((x, y) => x - y); B.sort((x, y) => x - y);
    const others = shuffle([...A, ...B].filter(n => n !== odd)).slice(0, 3), opts = shuffle([odd, ...others]);
    return { q: `The rule for <b>Group A</b> is <b>${r.lab}</b>. All other numbers go in Group B. One number is in the <b>wrong</b> group. Which one?`, say: `The rule for group A is ${r.lab}. All other numbers go in group B. Group A has ${A.join(", ")}. Group B has ${B.join(", ")}. One number is in the wrong group. Which one?`, vis: LG8V_GTABLE(A, B), opts: opts.map(String), ans: String(odd), big: 1, why: intoA ? `${odd} ${r.no}, so it belongs in Group B, not Group A.` : `${odd} ${r.yes}, so it belongs in Group A, not Group B.`, key: "x" + r.id + A.join() + "|" + B.join(), v22: { k: "wrong", r, A, B } };
  }
  return null;
}
function LG8V_sortShapes() {
  for (let tries = 0; tries < 80; tries++) {
    const r = pick(LG8V_SRULES), yes = shuffle(LG8V_SHAPES.filter(r.t)), no = shuffle(LG8V_SHAPES.filter(x => !r.t(x)));
    const A = yes.slice(0, 3), B = no.slice(0, 3);
    const bad = LG8V_SRULES.filter(x => x.lab !== r.lab && !LG8V_SEP(x, A, B));
    const tempting = shuffle(bad.filter(x => A.every(x.t) || !B.some(x.t) || A.some(x.t))), rest = shuffle(bad.filter(x => !tempting.includes(x)));
    const dis = [...tempting.slice(0, 2), ...rest].slice(0, 3);
    if (dis.length < 3) continue;
    const opts = shuffle([r, ...dis]), cell = x => shp(x.s, x.c, 46);
    const ord = a => a.slice().sort((x, y) => LG8V_SNAME(x) < LG8V_SNAME(y) ? -1 : 1);
    return { q: "Every shape in <b>Group A</b> follows one rule. No shape in Group B does. What is the rule?", say: `Group A has: ${A.map(LG8V_SNAME).join(", ")}. Group B has: ${B.map(LG8V_SNAME).join(", ")}. What is the rule for group A?`, vis: LG8V_GTABLE(A.map(cell), B.map(cell)), opts: opts.map(x => x.lab), ans: r.lab, why: `Every shape in Group A ${r.yes}, but no shape in Group B follows that rule.`, key: "s" + r.id + ord(A).map(LG8V_SNAME).join() + "|" + ord(B).map(LG8V_SNAME).join(), v22: { k: "shapes", A, B, rules: opts } };
  }
  return null;
}
topic(8, "logic", {
  id: "sortrule", title: "Sorting Rules", icon: "🗂️", blurb: "Find the secret rule that sorted the groups.",
  lesson: [
    { t: "A secret rule", say: "Someone sorted these numbers with a secret rule. Every number in Group A follows the rule. No number in Group B does.", html: LG8V_GTABLE([2, 8, 14, 20], [3, 7, 11, 15]) },
    { t: "Test the rule", say: "Is the rule even numbers? 2, 8, 14 and 20 are all even. 3, 7, 11 and 15 are all odd. Yes, the rule works!", html: LG8V_GTABLE([2, 8, 14, 20], [3, 7, 11, 15]) + note("Rule: <b>Even numbers</b> ✔") },
    { t: "Check both groups", say: "A good rule fits every thing in Group A, and nothing in Group B. If even one thing breaks it, try another rule.", html: note("Group A: <b>all</b> fit ✔ · Group B: <b>none</b> fit ✔") },
  ],
  gen() {
    const k = Math.random();
    return (k < 0.45 ? LG8V_sortWhich() : k < 0.75 ? LG8V_sortWrong() : LG8V_sortShapes()) || LG8V_sortWhich();
  },
});
whyRule(8, "logic", "sortrule", (q, picked) => {
  const v = q.v22; if (!v || !v.k) return null;
  if (v.k === "wrong") {
    const x = Number(xPlain(picked)); if (isNaN(x) || picked === q.ans) return null;
    if (v.A.includes(x)) return `${x} ${v.r.yes}, so it is in the right group: Group A.`;
    if (v.B.includes(x)) return `${x} ${v.r.no}, so it is in the right group: Group B.`;
    return null;
  }
  const r0 = v.rules.find(x => x.lab === picked); if (!r0 || picked === q.ans) return null;
  const r = typeof r0.t === "function" ? r0 : (v.k === "shapes" ? LG8V_SRULES : LG8V_NRULES).find(z => z.id === r0.id); if (!r || typeof r.t !== "function") return null;
  const nm = v.k === "shapes" ? x => `The ${LG8V_SNAME(x)}` : x => String(x);
  const a = v.A.find(x => !r.t(x)); if (a != null) return `${nm(a)} is in Group A, but it ${r.no}.`;
  const b = v.B.find(x => r.t(x)); if (b != null) return `${nm(b)} is in Group B, but it ${r.yes} too.`;
  return null;
});
TRICK_ADD(8, "logic", "sortrule", "Test each rule on every member of Group A, then make sure nothing in Group B fits it too.");

/* =====================================================================
   NEW TOPIC 2 · Shape Detective
   ===================================================================== */
const LG8V_SZ = x => x.z === "small" ? 40 : 72;
const LG8V_SD = x => `${x.z} ${COLNAME[x.c]} ${x.s}`;
const LG8V_SO = x => shp(x.s, x.c, LG8V_SZ(x)).replace(/aria-label="([^"]+)"/, `aria-label="${x.z} $1"`);
function LG8V_shapeClues(T, others) {
  const P = [], sd = LG8V_SIDES[T.s];
  P.push([x => x.c === T.c, `I am ${COLNAME[T.c]}.`]);
  for (const c of [...new Set(others.map(o => o.c))]) if (c !== T.c) P.push([x => x.c !== c, `I am not ${COLNAME[c]}.`]);
  if (sd === 0) P.push([x => LG8V_SIDES[x.s] === 0, "I have no corners."]);
  else { P.push([x => LG8V_SIDES[x.s] === sd, `I have ${sd} sides.`]); P.push([x => LG8V_SIDES[x.s] > 0, "I have corners."]); }
  for (const k of [3, 4]) if (sd > k) P.push([x => LG8V_SIDES[x.s] > k, `I have more than ${k} sides.`]);
  for (const s of [...new Set(others.map(o => o.s))]) if (s !== T.s) P.push([x => x.s !== s, `I am not ${LG8V_AN(s)}.`]);
  P.push([x => x.z === T.z, `I am ${T.z}.`]);
  return P;
}
function LG8V_shapeGen() {
  for (let tries = 0; tries < 200; tries++) {
    const items = [];
    while (items.length < 4) { const x = { s: pick(LSHAPES), c: pick(LG8V_COLS), z: pick(["small", "big"]) }; if (!items.some(y => LG8V_SD(y) === LG8V_SD(x))) items.push(x); }
    const T = items[0], others = items.slice(1), clues = [];
    let cand = items.slice();
    for (const [test, txt] of shuffle(LG8V_shapeClues(T, others))) { const next = cand.filter(test); if (next.length < cand.length) { cand = next; clues.push({ t: test, x: txt }); } if (cand.length === 1) break; }
    if (cand.length !== 1 || clues.length < 2 || clues.length > 3) continue;
    const opts = shuffle(items), txts = clues.map(c => c.x);
    return { q: "Read the clues. <b>Which shape am I?</b>", say: `${txts.join(" ")} Which shape am I?`, vis: passage(txts.map((c, i) => `${i + 1}. ${c}`).join("<br>")), opts: opts.map(LG8V_SO), ans: LG8V_SO(T), sayAns: `the ${LG8V_SD(T)}`, why: `Only the ${LG8V_SD(T)} fits every clue.`, key: txts.join() + "|" + items.map(LG8V_SD).sort().join() + "|" + LG8V_SD(T), v22: { items: opts, clues } };
  }
  return null;
}
topic(8, "logic", {
  id: "shapeclues", title: "Shape Detective", icon: "🔷", blurb: "Use clues to find the mystery shape.",
  lesson: [
    { t: "Shape clues", say: "A mystery shape gives you clues. Each clue tells you something true about it, like its color, its size, or how many sides it has.", html: passage("1. I am not blue.<br>2. I have 4 sides.") + row(LG8V_SO({ s: "square", c: "#3D7BFF", z: "big" }), LG8V_SO({ s: "square", c: "#FF7A59", z: "small" }), LG8V_SO({ s: "circle", c: "#FF7A59", z: "big" })) },
    { t: "Cross shapes out", say: "Clue 1 says I am not blue, so cross out the blue square. Clue 2 says I have 4 sides, so cross out the circle.", html: note("✘ blue square · ✘ circle") },
    { t: "One is left", say: "Only the small orange square is left. Check it with every clue. It is not blue, and it has 4 sides. Yes!", html: row(LG8V_SO({ s: "square", c: "#FF7A59", z: "small" })) + note("✔ not blue · ✔ 4 sides") },
  ],
  gen() { return LG8V_shapeGen() || LG8V_shapeGen(); },
});
whyRule(8, "logic", "shapeclues", (q, picked) => {
  const v = q.v22; if (!v || !v.items) return null;
  const i = q.opts.indexOf(picked); if (i < 0 || picked === q.ans) return null;
  if (!v.clues.every(cl => typeof cl.t === "function")) return null; /* saved copy: the clue tests can't be stored */
  const P = v.items[i], c = v.clues.findIndex(cl => !cl.t(P)); if (c < 0) return null;
  return `Clue ${c + 1} says ${xQ(v.clues[c].x)}, but the ${LG8V_SD(P)} doesn't fit that.`;
});
TRICK_ADD(8, "logic", "shapeclues", "Take one clue at a time and cross out every shape that breaks it. The shape still standing is the answer.");

/* =====================================================================
   PART B · more questions for existing topics
   ===================================================================== */

/* ---------- analogies: more pairs (links the why rule already knows) ---------- */
(() => {
  const ADD = [
    ["wet", "dry", "loud", "quiet", ["noisy", "sound", "music"], "opposites"],
    ["thick", "thin", "strong", "weak", ["muscle", "tough", "hard"], "opposites"],
    ["near", "far", "front", "back", ["side", "face", "forward"], "opposites"],
    ["lost", "found", "always", "never", ["often", "forever", "sometimes"], "opposites"],
    ["start", "finish", "forget", "remember", ["lose", "think", "brain"], "opposites"],
    ["tall", "short", "heavy", "light", ["big", "strong", "weigh"], "opposites"],
    ["first", "last", "asleep", "awake", ["tired", "dream", "bed"], "opposites"],
    ["cub", "bear", "kitten", "cat", ["mouse", "milk", "yarn"], "baby and grown-up"],
    ["piglet", "pig", "puppy", "dog", ["cat", "bone", "bark"], "baby and grown-up"],
    ["calf", "cow", "duckling", "duck", ["goose", "pond", "egg"], "baby and grown-up"],
    ["wolf", "pack", "cow", "herd", ["calf", "milk", "barn"], "group name"],
    ["bird", "flock", "bee", "swarm", ["honey", "sting", "flower"], "group name"],
    ["good", "great", "bad", "terrible", ["sad", "mean", "okay"], "stronger word"],
    ["wet", "soaked", "hungry", "starving", ["thirsty", "full", "lunch"], "stronger word"],
    ["pretty", "beautiful", "smart", "brilliant", ["silly", "school", "kind"], "stronger word"],
    ["run", "ran", "sing", "sang", ["singing", "song", "sings"], "now and past"],
    ["eat", "ate", "drink", "drank", ["drinked", "drinks", "cup"], "now and past"],
    ["go", "went", "see", "saw", ["seed", "seeing", "eyes"], "now and past"],
    ["foot", "feet", "man", "men", ["mans", "boy", "hat"], "one and many"],
    ["mouse", "mice", "goose", "geese", ["gooses", "duck", "feather"], "one and many"],
    ["dog", "bark", "duck", "quack", ["pond", "feather", "tweet"], "sound it makes"],
    ["cow", "moo", "pig", "oink", ["mud", "farm", "baa"], "sound it makes"],
    ["2", "4", "7", "14", ["9", "21", "13"], "double it"],
    ["5", "10", "8", "16", ["13", "24", "15"], "double it"],
    ["12", "6", "16", "8", ["32", "10", "15"], "half of it"],
  ];
  const have = new Set(WANAL.map(w => w[0] + "|" + w[2]));
  for (const w of ADD) if (!have.has(w[0] + "|" + w[2])) { WANAL.push(w); have.add(w[0] + "|" + w[2]); }
})();

/* ---------- codes: more 3-letter words ---------- */
(() => {
  const ADD = ["BUN", "DEN", "DOT", "FIN", "GEM", "HUG", "HUT", "JUG", "KIT", "LID", "MAT", "NAP", "PAW", "PEA", "TOE", "VET", "WAX", "YAM", "LIP", "SIP", "RUN", "SIT", "TAG", "HAM"];
  for (const w of ADD) if (!CODEWORDS.includes(w)) CODEWORDS.push(w);
})();

/* ---------- venn: more sorting sets ---------- */
VENNS.push(
  ["Has wheels", "Can fly", { both: ["✈️"], a: ["🚗", "🚲", "🚌", "🛴"], b: ["🦋", "🐦", "🐝"], out: ["🐟", "🌳", "🏠", "🐢"] }],
  ["An animal", "Found on a farm", { both: ["🐄", "🐖", "🐑", "🐔"], a: ["🦁", "🐘", "🦒", "🐧"], b: ["🚜", "🌽", "🌾"], out: ["🚀", "🎸", "🌋"] }],
  ["In the 5 times table", "Even", { both: ["10", "20", "30", "40", "50"], a: ["5", "15", "25", "35", "45"], b: ["2", "4", "6", "8", "12", "14"], out: ["1", "3", "7", "9", "11", "13"] }]
);

/* ---------- matrix: transposed grids and size-goes-down grids ---------- */
const LG8V_MSZ = { 40: "small", 60: "", 76: "big" };
const LG8V_MD = x => `${LG8V_MSZ[x[2]] ? LG8V_MSZ[x[2]] + " " : ""}${COLNAME[x[1]]} ${x[0]}`;
addBank(8, "logic", "matrix", 0.35, function () {
  const [s1, s2, s3] = shuffle(LSHAPES), [c1, c2, c3] = shuffle(LG8V_COLS), mode = R(0, 1);
  let cells, ans, wrong;
  if (mode === 0) { cells = [[s1, c1, 60], [s2, c1, 60], [s1, c2, 60]]; ans = [s2, c2, 60]; wrong = shuffle([[s1, c2, 60], [s2, c1, 60], [s2, c3, 60], [s3, c2, 60]]).slice(0, 3); }
  else { cells = [[s1, c1, 40], [s2, c2, 40], [s1, c1, 76]]; ans = [s2, c2, 76]; wrong = shuffle([[s2, c2, 40], [s1, c1, 76], [s2, c3, 76], [s3, c2, 76]]).slice(0, 3); }
  const sized = (x, svg) => x[2] === 60 ? svg : svg.replace(/aria-label="([^"]+)"/, `aria-label="${x[2] === 40 ? "small" : "big"} $1"`);
  const d = x => sized(x, shp(x[0], x[1], x[2])), o = x => sized(x, shp(x[0], x[1], x[2] === 40 ? 40 : x[2] === 76 ? 72 : 60));
  const all = shuffle([ans, ...wrong]);
  return { q: "Which piece is missing?", say: "Look at the grid. Which piece is missing?", vis: grid2([...cells.map(d), "?"]), opts: all.map(o), ans: o(ans), sayAns: `the ${LG8V_MD(ans)}`, why: mode === 0 ? "Across, the shape changes. Down, the color changes." : "Across, the shape and color change. Down, small turns big.", key: "v22" + s1 + s2 + c1 + c2 + mode, v22: { mode, items: all, s1, s2, c1, c2 } };
});
whyRule(8, "logic", "matrix", (q, picked) => {
  const v = q.v22; if (!v || v.mode == null) return null;
  const i = q.opts.indexOf(picked); if (i < 0) return null;
  const [ps, pc, pz] = v.items[i];
  if (ps !== v.s2) return ps === v.s1 ? `Going across, each ${v.s1} turns into ${LG8V_AN(v.s2)}, so the right column needs ${LG8V_AN(v.s2)}.` : `There are no ${LG8V_PL[ps]} in this grid. The right column has ${LG8V_PL[v.s2]}.`;
  if (pc !== v.c2) return v.mode === 0 ? `Going down, the color changes from ${COLNAME[v.c1]} to ${COLNAME[v.c2]}, so the bottom row is ${COLNAME[v.c2]}, not ${COLNAME[pc]}.` : `The ${v.s2} in the top row is ${COLNAME[v.c2]}, so the ${v.s2} below it must be ${COLNAME[v.c2]} too, not ${COLNAME[pc]}.`;
  if (v.mode === 1 && pz === 40) return "This is the small one. Going down, small turns big, so the bottom row needs the big one.";
  return null;
});

/* ---------- symmetry: count matching letters in a word / find the letter that doesn't match ---------- */
const LG8V_SWORDS = ["TOY", "HAT", "MOM", "WAX", "YOU", "MATH", "MOUTH", "TOOTH", "WHAT", "CAT", "DOG", "SUN", "FISH", "BIRD", "TIME", "HOME", "BOAT", "COAT", "GOAT", "MAP", "MATCH", "TRUCK", "PLANE", "SNOW", "JUMP", "FROG", "BEAR", "LION", "DUCK", "ZEBRA", "OWL", "TOWEL", "YAWN", "HIVE", "MOVE", "TAXI", "MINT", "HUT", "TUB", "BUS", "CUP", "SKY", "EGG", "PIG", "KEY", "WATCH", "TOAST", "MITTEN", "PIANO", "TULIP"];
const LG8V_SONE = LG8V_SWORDS.filter(w => [...new Set(w)].length >= 3 && [...new Set(w)].filter(c => NOSYM.includes(c)).length === 1);
const LG8V_LIST = a => a.length <= 1 ? a.join("") : a.slice(0, -1).join(", ") + " and " + a[a.length - 1];
addBank(8, "logic", "symmetry", 0.13, function () {
  if (Math.random() < 0.6) {
    const w = pick(LG8V_SWORDS), L = w.split(""), sym = L.filter(c => SYM.includes(c)), n = sym.length;
    const opts = uniq(String(n), [n + 1, n - 1, n + 2, n - 2, L.length, 0].filter(x => x >= 0 && x <= L.length).map(String));
    return { q: `How many letters in <b>${w}</b> have matching left and right sides?`, say: `How many letters in the word ${w.split("").join(" ")} have matching left and right sides?`, opts, ans: String(n), big: 1, why: n ? `${LG8V_LIST(sym)} ${n === 1 ? "has" : "have"} matching sides, so the answer is ${n}.` : `None of the letters in ${w} have matching left and right sides.`, key: "v22c" + w, v22: { k: "count", w, n, sym: [...new Set(sym)], non: [...new Set(L.filter(c => !SYM.includes(c)))] } };
  }
  const w = pick(LG8V_SONE), U = [...new Set(w)], odd = U.find(c => NOSYM.includes(c));
  return { q: `Which letter in <b>${w}</b> does <b>not</b> have matching left and right sides?`, say: `Which letter in the word ${w.split("").join(" ")} does not have matching left and right sides?`, opts: shuffle([odd, ...shuffle(U.filter(c => c !== odd)).slice(0, 3)]), ans: odd, big: 1, why: `Draw a line straight down the middle of ${odd}: its left and right sides don't match.`, key: "v22o" + w, v22: { k: "odd" } };
});
whyRule(8, "logic", "symmetry", (q, picked) => {
  const v = q.v22; if (!v || !v.k) return null;
  const p = xPlain(picked);
  if (v.k === "odd") return SYM.includes(p) ? `Draw a line straight down the middle of ${p}: its left and right sides match.` : null;
  const pn = Number(p); if (isNaN(pn) || pn === v.n) return null;
  if (pn > v.n) return `That's too many. The left and right sides of ${LG8V_LIST(v.non)} don't match.`;
  return `That's too few. ${LG8V_LIST(v.sym)} ${v.sym.length === 1 ? "has" : "all have"} matching left and right sides.`;
});

/* ---------- whichop: bigger numbers ---------- */
addBank(8, "logic", "whichop", 0.25, function () {
  const ops = ["+", "−", "×", "÷"];
  for (let tries = 0; tries < 50; tries++) {
    const op = pick(ops); let a, b, c;
    if (op === "+") { a = R(21, 60); b = R(11, 39); c = a + b; }
    else if (op === "−") { a = R(40, 90); b = R(11, 39); c = a - b; }
    else if (op === "×") { a = R(2, 9) * 10; b = R(2, 5); c = a * b; }
    else { b = R(2, 5); c = R(2, 9) * 10; a = b * c; }
    const f = { "+": a + b, "−": a - b, "×": a * b, "÷": a / b };
    if (ops.filter(o => f[o] === c).length > 1) continue;
    return { q: "Which sign makes this true?", say: `${a}, blank, ${b}, equals ${c}. Which sign makes this true?`, vis: eq(`${a} ${blank("?")} ${b} = ${c}`), opts: ops.slice(), ans: op, big: 1, why: `${a} ${op} ${b} = ${c}.`, key: "v" + a + op + b };
  }
  return null;
});

/* ---------- ordering: second tallest / second shortest ---------- */
addBank(8, "logic", "ordering", 0.25, function () {
  const ppl = shuffle(PEOPLE).slice(0, 4), [cmp, most, least] = pick(COMPS);
  const clues = shuffle(range(0, 2).map(i => `${ppl[i]} is ${cmp} than ${ppl[i + 1]}.`));
  const askMost = Math.random() < 0.5, ans = askMost ? ppl[1] : ppl[2], word = askMost ? most : least;
  return { q: `Who is the <b>second ${word}</b>?`, say: `${clues.join(" ")} Who is the second ${word}?`, vis: passage(clues.join("<br>")), opts: shuffle(ppl), ans, big: 1, why: `In order: ${ppl.join(", then ")}. So ${ans} is the second ${word}.`, extra: 10, key: "v22" + ppl.join() + cmp + askMost, v22: { ppl, most, least, word } };
});
whyRule(8, "logic", "ordering", (q, picked) => {
  const v = q.v22; if (!v || !v.ppl) return null;
  const p = xPlain(picked), r = v.ppl.indexOf(p); if (r < 0 || p === q.ans) return null;
  const desc = r === 0 ? v.most : r === 3 ? v.least : r === 1 ? "second " + v.most : "second " + v.least;
  return `${p} is the ${desc}, not the second ${v.word}.`;
});

/* ---------- lineup: where is the animal? ---------- */
const LG8V_SPOTS = ["left end", "middle", "right end"];
const LG8V_PERMS = [[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]];
addBank(8, "logic", "lineup", 0.25, function () {
  for (let tries = 0; tries < 100; tries++) {
    const an = shuffle(LINE_ANIMALS).slice(0, 3), sol = pick(LG8V_PERMS), posOf = (p, a) => p.indexOf(a), P = [];
    for (let a = 0; a < 3; a++) {
      const pa = posOf(sol, a);
      if (pa === 0) P.push([p => posOf(p, a) === 0, `The ${an[a][1]} is on the left end.`]);
      if (pa === 2) P.push([p => posOf(p, a) === 2, `The ${an[a][1]} is on the right end.`]);
      if (pa !== 1) P.push([p => posOf(p, a) !== 1, `The ${an[a][1]} is not in the middle.`]);
      for (let b = 0; b < 3; b++) if (a !== b) {
        if (posOf(sol, a) < posOf(sol, b)) P.push([p => posOf(p, a) < posOf(p, b), `The ${an[a][1]} is somewhere to the left of the ${an[b][1]}.`]);
        if (Math.abs(posOf(sol, a) - posOf(sol, b)) === 1 && a < b) P.push([p => Math.abs(posOf(p, a) - posOf(p, b)) === 1, `The ${an[a][1]} is next to the ${an[b][1]}.`]);
      }
    }
    const clues = []; let cands = LG8V_PERMS.slice();
    for (const [test, txt] of shuffle(P)) { const next = cands.filter(test); if (next.length < cands.length) { cands = next; clues.push({ t: test, x: txt }); } if (cands.length === 1) break; }
    if (cands.length !== 1 || clues.length < 2 || clues.length > 3) continue;
    const who = R(0, 2), spot = sol.indexOf(who), txt = clues.map(c => c.x), ansSpot = LG8V_SPOTS[spot];
    return { q: `Where is the <b>${an[who][1]}</b> ${an[who][0]}?`, say: `${txt.join(" ")} Where is the ${an[who][1]}?`, vis: passage(txt.map((c, i) => `${i + 1}. ${c}`).join("<br>")) + `<div class="spots"><span>left</span><span>middle</span><span>right</span></div>`, opts: LG8V_SPOTS.slice(), ans: ansSpot, big: 1, why: `The line is: ${sol.map(i => an[i][1]).join(", ")}. So the ${an[who][1]} is ${spot === 1 ? "in the middle" : "on the " + ansSpot}.`, extra: 20, key: "v22" + sol.join() + an.map(x => x[0]).join() + who, v22: { who, name: an[who][1], clues } };
  }
  return null;
});
whyRule(8, "logic", "lineup", (q, picked) => {
  const v = q.v22; if (!v || v.who == null) return null;
  const s = LG8V_SPOTS.indexOf(xPlain(picked)); if (s < 0 || picked === q.ans) return null;
  const lines = LG8V_PERMS.filter(p => p[s] === v.who), where = s === 1 ? "in the middle" : `on the ${LG8V_SPOTS[s]}`;
  if (!v.clues.every(cl => typeof cl.t === "function")) return `If the ${v.name} were ${where}, the clues couldn't all be true at once.`;
  const i = v.clues.findIndex(cl => lines.every(L => !cl.t(L)));
  if (i >= 0) { const c = v.clues[i].x; return `Clue ${i + 1} says ${c[0].toLowerCase() + c.slice(1, -1)}, so the ${v.name} can't be ${where}.`; }
  return `If the ${v.name} were ${where}, the clues couldn't all be true at once.`;
});

/* ---------- machines: what went in? ---------- */
addBank(8, "logic", "machines", 0.25, function () {
  const type = pick(["add", "sub", "mul"]), k = type === "mul" ? R(2, 5) : R(2, 9), f = x => type === "add" ? x + k : type === "sub" ? x - k : x * k, rule = (type === "add" ? "+" : type === "sub" ? "−" : "×") + k;
  const ins = shuffle(range(type === "sub" ? k + 1 : 1, type === "sub" ? k + 15 : 12)).slice(0, 4);
  const rows = ins.slice(0, 3).map(x => [x, f(x)]), last = ins[3], out = f(last);
  const cands = [last + 1, last - 1, last + 2, last - 2, out, type === "mul" ? out - k : out + k].filter(x => x > 0 && x !== last);
  return { q: "Find the rule. What number went <b>in</b>?", say: `Find the rule, then work backward. ${out} came out. What number went in?`, vis: machine([...rows, ["?", out]], "?"), opts: numU(last, cands, 3, 1), ans: String(last), big: 1, why: `The rule is ${rule}, and ${last} ${rule[0]} ${k} = ${out}.`, key: "v22i" + rule + ins.join(), v22: { type, k, rule, out } };
});
whyRule(8, "logic", "machines", (q, picked) => {
  const v = q.v22; if (!v || !v.rule) return null;
  const p = Number(xPlain(picked)); if (isNaN(p) || p === Number(q.ans)) return null;
  if (v.type === "sub" && p < v.k) return `${p} is smaller than ${v.k}, so ${p} − ${v.k} can't make ${v.out}.`;
  const r = v.type === "add" ? p + v.k : v.type === "sub" ? p - v.k : p * v.k;
  return `If ${p} went in, ${p} ${v.rule[0]} ${v.k} = ${r} would come out, not ${v.out}.`;
});

/* ---------- numdetective: which clue does NOT fit? ---------- */
addBank(8, "logic", "numdetective", 0.25, function () {
  const N = R(11, 59), t = Math.floor(N / 10), o = N % 10, s = t + o;
  const T = [
    () => { const ev = N % 2 === 0; return [ev ? "I am even." : "I am odd.", ev ? "I am odd." : "I am even.", `${N} is ${ev ? "even" : "odd"}, so that clue fits.`, `${N} is ${ev ? "even" : "odd"}, not ${ev ? "odd" : "even"}.`]; },
    () => { const f = t === 1 ? 2 : t === 5 ? 4 : t + pick([-1, 1]); return [`My tens digit is ${t}.`, `My tens digit is ${f}.`, `${N} has ${t} in the tens place, so that clue fits.`, `${N} has ${t} in the tens place, not ${f}.`]; },
    () => { const f = s + pick([-1, 1]); return [`My digits add up to ${s}.`, `My digits add up to ${f}.`, `${t} + ${o} = ${s}, so that clue fits.`, `${t} + ${o} = ${s}, not ${f}.`]; },
    () => { const m = o % 5 === 0; return [m ? "I am a multiple of 5." : "I am not a multiple of 5.", m ? "I am not a multiple of 5." : "I am a multiple of 5.", `${N} ends in ${o}, so it ${m ? "is" : "is not"} a multiple of 5.`, `${N} ends in ${o}, so it ${m ? "is" : "is not"} a multiple of 5.`]; },
    () => { if (o === 0) return null; const k = Math.max(0, o - R(1, 3)), f = Math.min(9, o + R(0, 1)); return [`My ones digit is bigger than ${k}.`, `My ones digit is bigger than ${f}.`, `The ones digit is ${o}, which is bigger than ${k}.`, `The ones digit is ${o}, which is not bigger than ${f}.`]; },
    () => { const lo = N - R(1, 6), hi = lo + 10, flo = N > 16 && Math.random() < 0.5 ? N - R(12, 15) : N + R(1, 5); return [`I am between ${lo} and ${hi}.`, `I am between ${flo} and ${flo + 10}.`, `${N} is between ${lo} and ${hi}.`, `${N} is not between ${flo} and ${flo + 10}.`]; },
  ];
  const made = shuffle(T).map(fn => fn()).filter(Boolean).slice(0, 4), fi = R(0, 3), expl = {};
  const opts = made.map((m, i) => { const txt = i === fi ? m[1] : m[0]; expl[txt] = m[2]; return txt; });
  const F = made[fi];
  return { q: `The secret number is <b>${N}</b>. Which clue does <b>not</b> fit it?`, say: `The secret number is ${N}. Which clue does not fit it?`, opts: shuffle(opts), ans: F[1], why: F[3], key: "v22" + N + F[1], v22: { expl } };
});
whyRule(8, "logic", "numdetective", (q, picked) => {
  const v = q.v22; if (!v || !v.expl) return null;
  return picked !== q.ans && v.expl[picked] ? v.expl[picked] : null;
});

/* ---------- pyramids: bigger two-row pyramids ---------- */
addBank(8, "logic", "pyramids", 0.3, function () {
  const a = R(11, 49), b = R(11, 49), t = a + b, rows = [[t], [a, b]], cells = [[0, 0], [1, 0], [1, 1]], [hr, hc] = pick(cells), ans = rows[hr][hc];
  const why = hr === 0 ? `${a} + ${b} = ${t}.` : `${t} − ${hc === 0 ? b : a} = ${ans}.`;
  return { q: "Each block is the sum of the two blocks below it. What is the missing number?", say: "Each block is the sum of the two blocks below it. What is the missing number?", vis: pyramid(rows, hr, hc), opts: numU(ans, [ans + 1, ans - 1, ans + 10, ans - 10, hr === 0 ? Math.abs(a - b) : t + (hc === 0 ? b : a)].filter(x => x > 0), 3, 1), ans: String(ans), big: 1, why, key: "v22" + a + "," + b + hr + hc, v22: { a, b, t, hr, hc } };
});
whyRule(8, "logic", "pyramids", (q, picked) => {
  const v = q.v22; if (!v || v.hr == null) return null;
  const p = Number(xPlain(picked)); if (isNaN(p) || p === Number(q.ans)) return null;
  if (v.hr === 0) return `${v.a} + ${v.b} is not ${p}. The top block must be the sum of the two below.`;
  const other = v.hc === 0 ? v.b : v.a;
  return `${p} + ${other} = ${p + other}, but the top block is ${v.t}.`;
});

/* ---------- compass: which way is it? ---------- */
const LG8V_PLACE = { "🌳": "tree", "🏫": "school", "🏪": "shop", "⛲": "fountain", "🏥": "hospital", "🎡": "Ferris wheel", "🐄": "cow", "🏰": "castle" };
const LG8V_DPOS = { north: "above", south: "below", east: "to the right of", west: "to the left of" };
const LG8V_DMOVE = { north: "up", south: "down", east: "to the right", west: "to the left" };
addBank(8, "logic", "compass", 0.2, function () {
  const n = 4, things = shuffle(Object.keys(LG8V_PLACE));
  for (let tries = 0; tries < 60; tries++) {
    const r = R(0, n - 1), c = R(0, n - 1), d = pick(Object.keys(COMPASS)), k = R(1, 3), p = [r + COMPASS[d][0] * k, c + COMPASS[d][1] * k];
    if (p[0] < 0 || p[0] >= n || p[1] < 0 || p[1] >= n) continue;
    const cells = { [r + "," + c]: "🏠", [p.join()]: things[0] }, free = [];
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) if (!cells[i + "," + j]) free.push(i + "," + j);
    shuffle(free).slice(0, 2).forEach((key, i) => cells[key] = things[i + 1]);
    const name = LG8V_PLACE[things[0]];
    return { q: `Which way is the <span class="emo">${things[0]}</span> from the 🏠?`, say: `Which way is the ${name} from the house?`, vis: board(n, cells, null) + `<div class="compass mini"><span class="n">N</span><span class="w">W</span><span class="c">🧭</span><span class="e">E</span><span class="s">S</span></div>`, opts: ["north", "south", "east", "west"], ans: d, big: 1, why: `The ${name} is ${LG8V_DPOS[d]} the house, and that way is ${d} on a map.`, key: "v22" + r + c + d + k + things[0], v22: { name, d } };
  }
  return null;
});
whyRule(8, "logic", "compass", (q, picked) => {
  const v = q.v22; if (!v || !v.d) return null;
  const p = xPlain(picked); if (!LG8V_DMOVE[p] || p === v.d) return null;
  return `${cap(p)} is ${LG8V_DMOVE[p]} on a map, but the ${v.name} is ${LG8V_DPOS[v.d]} the house.`;
});

/* ---------- venncount: only one circle, just one circle, how many more ---------- */
const LG8V_VP = A => A.replace(/^Likes /, "like ").replace(/^Plays /, "play ").replace(/^Has /, "have ").replace(/^Can /, "can ");
addBank(8, "logic", "venncount", 0.25, function () {
  const [A, B] = pick(VPAIRS), a = R(1, 9), both = R(1, 6), b = R(1, 9), vis = vennCount(A, B, a, both, b);
  let k = R(0, 3); if (k === 3 && a === b) k = 2;
  const big = a > b, QA = `“${A}”`, QB = `“${B}”`;
  const Q4 = [
    [`How many kids are <b>only</b> in the ${QA} circle?`, a, `The ${QA} part outside the middle shows ${a}.`],
    [`How many kids are <b>only</b> in the ${QB} circle?`, b, `The ${QB} part outside the middle shows ${b}.`],
    ["How many kids are in <b>just one</b> circle?", a + b, `${a} + ${b} = ${a + b}. Kids in the middle are in both circles.`],
    [`How many <b>more</b> kids ${LG8V_VP(big ? A : B)} than ${LG8V_VP(big ? B : A)}?`, Math.abs(a - b), `${(big ? a : b) + both} − ${(big ? b : a) + both} = ${Math.abs(a - b)}.`],
  ][k];
  const ans = Q4[1], cands = [a, b, both, a + both, b + both, a + b, a + b + both, ans + 1, ans - 1].filter(x => x !== ans && x >= 0);
  const M = [[a, `only in the ${QA} circle`], [b, `only in the ${QB} circle`], [both, "in the middle, in both circles"], [a + both, `in the whole ${QA} circle`], [b + both, `in the whole ${QB} circle`], [a + b, "in just one circle"], [a + b + both, "in the diagram altogether"]];
  return { q: Q4[0], vis, opts: numU(ans, cands, 3, 0), ans: String(ans), big: 1, why: Q4[2], key: "v22" + A + a + both + b + k, v22: { M } };
});
whyRule(8, "logic", "venncount", (q, picked) => {
  const v = q.v22; if (!v || !v.M) return null;
  const p = Number(xPlain(picked)); if (isNaN(p) || p === Number(q.ans)) return null;
  const m = v.M.find(x => x[0] === p);
  return m ? `${p} is how many kids are ${m[1]}.` : `${p} isn't the number for any part of this diagram.`;
});

