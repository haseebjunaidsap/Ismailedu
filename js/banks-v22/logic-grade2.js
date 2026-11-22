/* =====================================================================
   v22 · Age 7 · Logical Thinking (tag LG7V)
   Part A: two new topics: numpat (Number Patterns), detective (Clue Detective)
   Part B: more questions for every existing age-7 logic topic
   ===================================================================== */

const LG7V_art = n => (/^[aeiou]/i.test(n) ? "an " : "a ") + n;
const LG7V_s = (n, w) => `${n} ${w}${n === 1 ? "" : "s"}`;

/* =====================================================================
   PART A · 1 · Number Patterns
   ===================================================================== */
const LG7V_STEPS = [2, 2, 3, 4, 5, 5, 10, 10, -1, -2, -5, -10, 100];
const LG7V_rw = k => (k > 0 ? "add " : "take away ") + Math.abs(k);
function LG7V_patStart(k) {
  if (k === 100) return R(1, 5) * 100 + (Math.random() < 0.5 ? 0 : R(1, 9) * 10);
  if (k === 5) return Math.random() < 0.6 ? 5 * R(0, 8) : R(1, 20);
  if (k === 10) return R(1, 50);
  if (k > 0) return R(0, 30);
  if (k === -1) return R(10, 40);
  if (k === -2) return R(12, 40);
  if (k === -5) return Math.random() < 0.6 ? 5 * R(5, 12) : R(25, 60);
  return R(45, 99);
}
topic(7, "logic", {
  id: "numpat", title: "Number Patterns", icon: "🔢", blurb: "Find the jump and keep the pattern going.",
  lesson: [
    { t: "Find the jump", say: "In a number pattern, the numbers change by the same amount each time. 2, 4, 6, 8. Each time it adds 2, so 10 comes next.", html: train([2, 4, 6, 8, "?"]) + note("+2 each time → <b>10</b>") },
    { t: "Patterns can go down", say: "Some patterns get smaller. 20, 15, 10. Each time it takes away 5. Next comes 5.", html: train([20, 15, 10, "?"]) + note("−5 each time → <b>5</b>") },
    { t: "Big jumps", say: "You can count by tens and by hundreds too. 100, 200, 300. Next comes 400!", html: train([100, 200, 300, "?"]) + note("+100 each time → <b>400</b>") },
  ],
  gen() {
    const k = pick(LG7V_STEPS), a = LG7V_patStart(k), seq = range(0, 4).map(i => a + i * k), mode = R(0, 2);
    const list = seq.join(", "), rule = LG7V_rw(k);
    if (mode === 2) {
      const shown = seq.slice(0, 4), mags = [2, 3, 4, 5, 10, 100].filter(m => m !== Math.abs(k));
      const near = shuffle(mags).slice(0, 2).map(m => LG7V_rw(Math.sign(k) * m));
      const opts = shuffle([rule, LG7V_rw(-k), ...near]);
      const q = { q: "What is the rule?", say: `${shown.join(", ")}. What is the rule?`, vis: train(shown), opts, ans: rule, big: 1, why: `Each number is ${Math.abs(k)} ${k > 0 ? "more" : "less"} than the one before: ${shown.join(", ")}.`, key: "Vr" + a + "," + k };
      q.v22 = { t: "rule", seq: shown, k };
      return q;
    }
    const hide = mode === 0 ? 4 : R(1, 3), ans = seq[hide], prev = seq[hide - 1];
    const cells = seq.map((x, i) => i === hide ? "?" : x);
    const opts = numU(ans, shuffle([ans + 1, ans - 1, ans + k, ans - 2 * k, prev + 2 * k + (k > 0 ? 1 : -1), ans + 10, ans - 10]).filter(x => x !== prev && !seq.some((y, i) => i !== hide && y === x)), 3, 0);
    const q = { q: mode === 0 ? "What number comes <b>next</b>?" : "What number is <b>missing</b>?", say: `${cells.map(c => c === "?" ? "blank" : c).join(", ")}. ${mode === 0 ? "What number comes next?" : "What number is missing?"}`, vis: train(cells), opts, ans: String(ans), big: 1, why: `The pattern is ${rule} each time: ${list}.`, key: "V" + mode + a + "," + k + "," + hide };
    q.v22 = { t: "num", prev, k, seq, hide };
    return q;
  },
});
TRICK_ADD(7, "logic", "numpat", "Find how much it changes from one number to the next, then make the same jump again.");
whyRule(7, "logic", "numpat", (q, picked) => {
  const v = q.v22; if (!v) return null;
  if (v.t === "rule") {
    const m = xPlain(picked).match(/^(add|take away) (\d+)$/); if (!m) return null;
    const j = (m[1] === "add" ? 1 : -1) * +m[2], [a, b] = v.seq;
    if (Math.sign(j) !== Math.sign(v.k)) return v.k > 0 ? "The numbers get bigger each time, so the rule can't be take away." : "The numbers get smaller each time, so the rule can't be add.";
    return `${a} ${m[1]} ${m[2]} makes ${a + j}, not ${b}.`;
  }
  const p = +xPlain(picked); if (!Number.isInteger(p)) return null;
  const d = p - v.prev;
  if (d === 0) return `${p} is the number just before the gap, so it can't come again.`;
  if (Math.sign(d) !== Math.sign(v.k)) return `Going from ${v.prev} to ${p} gets ${d > 0 ? "bigger" : "smaller"}, but this pattern gets ${v.k > 0 ? "bigger" : "smaller"}.`;
  return `${p} is ${Math.abs(d)} ${d > 0 ? "more" : "less"} than ${v.prev}, but each jump is ${Math.abs(v.k)}.`;
});

/* =====================================================================
   PART A · 2 · Clue Detective (not-clues and elimination)
   ===================================================================== */
const LG7V_SIDES = { circle: 0, triangle: 3, square: 4, hexagon: 6 };
const LG7V_sideTxt = s => LG7V_SIDES[s] ? LG7V_s(LG7V_SIDES[s], "side") : "no sides";
// A clue is plain data [kind, value, text, isNotClue]. Shapes are [shape, color]; numbers are integers.
function LG7V_ct(cl, x) {
  const [k, v] = cl;
  switch (k) {
    case "ns": return x[0] !== v; case "nc": return x[1] !== v; case "c": return x[1] === v;
    case "nocorn": return x[0] === "circle"; case "corn": return x[0] !== "circle";
    case "gt3": return LG7V_SIDES[x[0]] > 3; case "s3": return x[0] === "triangle";
    case "nodd": case "even": return x % 2 === 0; case "neven": case "odd": return x % 2 === 1;
    case "neq": return x !== v; case "gt": return x > v; case "lt": return x < v;
    case "end": return x % 10 === v; case "nend": return x % 10 !== v; case "two": return x >= 10; case "one": return x < 10;
  }
  return true;
}
function LG7V_cf(cl, x) {
  const [k, v] = cl, nm = Array.isArray(x) ? `${COLNAME[x[1]]} ${x[0]}` : "";
  switch (k) {
    case "ns": return `The ${nm} is a ${v}, but a clue says it is not a ${v}.`;
    case "nc": return `The ${nm} is ${COLNAME[v]}, but a clue says it is not ${COLNAME[v]}.`;
    case "c": return `The ${nm} is ${COLNAME[x[1]]}, not ${COLNAME[v]}.`;
    case "nocorn": return `The ${nm} has corners, but a clue says it has no corners.`;
    case "corn": return `The ${nm} has no corners, but a clue says it has corners.`;
    case "gt3": return `The ${nm} has ${LG7V_sideTxt(x[0])}, but a clue says more than 3 sides.`;
    case "s3": return `The ${nm} has ${LG7V_sideTxt(x[0])}, not 3 sides.`;
    case "nodd": return `${x} is odd, but a clue says it is not odd.`;
    case "neven": return `${x} is even, but a clue says it is not even.`;
    case "even": return `${x} is odd, but a clue says it is even.`;
    case "odd": return `${x} is even, but a clue says it is odd.`;
    case "neq": return `A clue says the number is not ${x}.`;
    case "gt": return `${x} is less than ${v}, but a clue says more than ${v}.`;
    case "lt": return `${x} is more than ${v}, but a clue says less than ${v}.`;
    case "end": return `${x} ends in ${x % 10}, not ${v}.`;
    case "nend": return `${x} ends in ${v}, but a clue says it does not.`;
    case "two": return `${x} has only one digit, but a clue says two digits.`;
    case "one": return `${x} has two digits, but a clue says one digit.`;
  }
  return null;
}
function LG7V_shapeClues(A) {
  const out = [], [as, ac] = A;
  for (const s of LSHAPES) if (s !== as) out.push(["ns", s, `It is not a ${s}.`, 1]);
  for (const c of Object.keys(COLNAME)) if (c !== ac) out.push(["nc", c, `It is not ${COLNAME[c]}.`, 1]);
  out.push(["c", ac, `It is ${COLNAME[ac]}.`, 0]);
  out.push(as === "circle" ? ["nocorn", 0, "It has no corners.", 0] : ["corn", 0, "It has corners.", 0]);
  if (LG7V_SIDES[as] > 3) out.push(["gt3", 0, "It has more than 3 sides.", 0]);
  if (as === "triangle") out.push(["s3", 0, "It has 3 sides.", 0]);
  return out;
}
function LG7V_numClues(A, opts) {
  const out = [], ev = A % 2 === 0;
  out.push(ev ? ["nodd", 0, "It is not odd.", 1] : ["neven", 0, "It is not even.", 1]);
  out.push(ev ? ["even", 0, "It is even.", 0] : ["odd", 0, "It is odd.", 0]);
  for (const o of opts) if (o !== A) out.push(["neq", o, `It is not ${o}.`, 1]);
  for (let i = 0; i < 3; i++) {
    const N = A - R(1, 12); if (N >= 1 && !opts.includes(N)) out.push(["gt", N, `It is more than ${N}.`, 0]);
    const M = A + R(1, 12); if (M <= 60 && !opts.includes(M)) out.push(["lt", M, `It is less than ${M}.`, 0]);
  }
  out.push(["end", A % 10, `It ends in ${A % 10}.`, 0]);
  for (const o of opts) if (o % 10 !== A % 10) out.push(["nend", o % 10, `It does not end in ${o % 10}.`, 1]);
  out.push(A >= 10 ? ["two", 0, "It has two digits.", 0] : ["one", 0, "It has one digit.", 0]);
  return out;
}
// choose 2-3 clues: all true for the answer, every distractor breaks one, each clue is needed, at least one "not" clue
function LG7V_pickClues(pool, dis) {
  for (let t = 0; t < 120; t++) {
    const n = Math.random() < 0.65 ? 2 : 3, cs = shuffle(pool).slice(0, n);
    if (!cs.some(c => c[3])) continue;
    if (!dis.every(d => cs.some(c => !LG7V_ct(c, d)))) continue;
    if (!cs.every((c, i) => dis.some(d => !LG7V_ct(c, d) && cs.every((c2, j) => j === i || LG7V_ct(c2, d))))) continue;
    return cs;
  }
  return null;
}
topic(7, "logic", {
  id: "detective", title: "Clue Detective", icon: "🕵️", blurb: "Cross out what the clues say it is not.",
  lesson: [
    { t: "A not clue", say: "A not clue tells you what it is not. It is not orange. So cross out every orange one!", html: row(shp("circle", "#FF7A59", 56), shp("square", "#3D7BFF", 56), shp("triangle", "#FF7A59", 56), shp("hexagon", "#1FAF6E", 56)) + note("It is <b>not orange</b> → cross out the orange ones ✘") },
    { t: "Use the next clue", say: "Now use the next clue on what is left. The blue square and the green hexagon are left. It is not green. So it is the blue square!", html: row(shp("square", "#3D7BFF", 64), shp("hexagon", "#1FAF6E", 56)) + note("It is <b>not green</b> → the <b>blue square</b> 🎉") },
    { t: "Numbers too", say: "My number is not even. It is more than 10. From 8, 12 and 15, cross out 8 and 12. The number is 15!", html: train([8, 12, 15]) + note("Not even ✘ 8 and 12 → it is <b>15</b>") },
  ],
  gen() {
    for (let tries = 0; tries < 50; tries++) {
      if (Math.random() < 0.5) {
        const all = shuffle(LSHAPES.flatMap(s => Object.keys(COLNAME).map(c => [s, c]))), A = all[0], dis = all.slice(1, 4);
        const cs = LG7V_pickClues(LG7V_shapeClues(A), dis); if (!cs) continue;
        const opts = shuffle([A, ...dis]), html = x => shp(x[0], x[1], 64);
        const q = { q: "Read the clues. Which one is it?", say: `${cs.map(c => c[2]).join(" ")} Which one is it?`, vis: passage(cs.map(c => "🔎 " + c[2]).join("<br>")), opts: opts.map(html), ans: html(A), sayAns: shpName(A[0], A[1]), why: `Only the ${COLNAME[A[1]]} ${A[0]} fits every clue.`, key: "Vs" + cs.map(c => c[2]).join("") + A.join() + opts.map(x => x.join()).sort().join("|") };
        q.v22 = { shapes: opts, cs };
        return q;
      }
      const A = R(1, 50), set = new Set([A]); while (set.size < 4) set.add(R(1, 50));
      const nums = [...set], dis = nums.slice(1), cs = LG7V_pickClues(LG7V_numClues(A, nums), dis); if (!cs) continue;
      const q = { q: "Read the clues. Which number is it?", say: `${cs.map(c => c[2]).join(" ")} Which number is it?`, vis: passage(cs.map(c => "🔎 " + c[2]).join("<br>")), opts: shuffle(nums).map(String), ans: String(A), big: 1, why: `Only ${A} fits every clue.`, key: "Vn" + cs.map(c => c[2]).join("") + A + "|" + nums.slice().sort((x, y) => x - y).join() };
      q.v22 = { num: 1, cs };
      return q;
    }
    const q = { q: "Read the clues. Which number is it?", say: "It is not even. It is more than 10. Which number is it?", vis: passage("🔎 It is not even.<br>🔎 It is more than 10."), opts: ["8", "12", "15", "4"], ans: "15", big: 1, why: "Only 15 fits every clue.", key: "Vfix" };
    q.v22 = { num: 1, cs: [["neven", 0, "It is not even.", 1], ["gt", 10, "It is more than 10.", 0]] };
    return q;
  },
});
TRICK_ADD(7, "logic", "detective", "Read one clue and cross out every one that breaks it. Then use the next clue. The one left is the answer.");
whyRule(7, "logic", "detective", (q, picked) => {
  const v = q.v22; if (!v) return null;
  let x;
  if (v.num) { x = +xPlain(picked); if (!Number.isInteger(x)) return null; }
  else { x = (v.shapes || []).find(s => shp(s[0], s[1], 64) === picked); if (!x) return null; }
  const c = v.cs.find(c => !LG7V_ct(c, x)); return c ? LG7V_cf(c, x) : null;
});

/* =====================================================================
   PART B · existing topics
   ===================================================================== */

/* ---------- oddword: new word groups (the odd word always comes from a new group) ---------- */
const LG7V_WS = {
  shapes: ["circle", "square", "triangle", "oval", "rectangle", "hexagon"],
  "kinds of weather": ["rainy", "snowy", "windy", "sunny", "foggy", "stormy"],
  feelings: ["happy", "sad", "mad", "proud", "calm", "silly"],
  toys: ["doll", "kite", "yo-yo", "puzzle", "teddy bear", "jump rope"],
  vehicles: ["car", "bus", "truck", "van", "taxi", "tractor"],
  "number words": ["one", "two", "three", "five", "eight", "ten"],
  "zoo animals": ["lion", "tiger", "zebra", "monkey", "giraffe", "hippo"],
  fruits: ["apple", "banana", "grape", "pear", "mango", "kiwi"],
  months: ["January", "March", "May", "July", "October", "December"],
  clothes: ["shirt", "sock", "coat", "hat", "dress", "pants"],
  "school supplies": ["pencil", "crayon", "eraser", "ruler", "notebook", "glue"],
  bugs: ["ant", "bee", "beetle", "moth", "ladybug", "cricket"],
};
const LG7V_WS_BAD = ["toys|vehicles", "toys|things in the sky", "feelings|kinds of weather", "fruits|zoo animals", "fruits|farm animals", "colors|feelings", "shapes|things in the sky", "zoo animals|farm animals", "bugs|zoo animals", "bugs|farm animals"];
const LG7V_wsOk = (a, b) => a !== b && !LG7V_WS_BAD.includes(a + "|" + b) && !LG7V_WS_BAD.includes(b + "|" + a);
const LG7V_WSALL = () => Object.assign({}, WORDSETS, LG7V_WS);
addBank(7, "logic", "oddword", 0.4, function () {
  const ALL = LG7V_WSALL(), b = pick(Object.keys(LG7V_WS));
  let a; do { a = pick(Object.keys(ALL)); } while (!LG7V_wsOk(a, b));
  const same = shuffle(ALL[a]).slice(0, 3), odd = pick(LG7V_WS[b]);
  const q = { q: "Which word does <b>not</b> belong?", say: "Which word does not belong?", opts: shuffle([...same, odd]), ans: odd, big: 1, why: `${same.join(", ")} are all ${a}. ${cap(odd)} is not.`, key: "V" + odd + same.join() };
  q.v22 = { a, b };
  return q;
});
whyRule(7, "logic", "oddword", (q, picked) => {
  const v = q.v22; if (!v) return null;
  const p = xPlain(picked), ALL = LG7V_WSALL(); if (!ALL[v.a] || !ALL[v.a].includes(p)) return null;
  return `${cap(p)} belongs: it is one of the ${v.a}, like two of the others.`;
});

/* ---------- riddles: new riddles ---------- */
// [text, emoji, name, subject, plural, category, key clue (verb phrase), names never used as wrong options]
const LG7V_RID = [
  ["I have a long mane, you can ride on my back, and I say neigh.", "🐴", "horse", "A horse", 0, "A", "say neigh"],
  ["I have a little beard and horns, and I love to climb rocks.", "🐐", "goat", "A goat", 0, "A", "have a little beard", ["turkey"]],
  ["I am a bird that opens a giant fan of colorful tail feathers.", "🦚", "peacock", "A peacock", 0, "A", "have a giant fan of tail feathers", ["turkey", "parrot"]],
  ["I am a bright, colorful bird, and I can copy words you say.", "🦜", "parrot", "A parrot", 0, "A", "copy words people say"],
  ["I am black with a white stripe, and I can make a big stink.", "🦨", "skunk", "A skunk", 0, "A", "make a big stink"],
  ["I chew down trees with my big teeth and build a dam.", "🦫", "beaver", "A beaver", 0, "A", "build dams"],
  ["I hang upside down in trees and move very, very slowly.", "🦥", "sloth", "A sloth", 0, "A", "hang upside down in trees"],
  ["I have flippers, I bark, and I swim in cold water.", "🦭", "seal", "A seal", 0, "A", "have flippers"],
  ["I am a big bird and I say gobble, gobble.", "🦃", "turkey", "A turkey", 0, "A", "say gobble"],
  ["I am huge and gray, I have a giant mouth, and I love to sit in rivers.", "🦛", "hippo", "A hippo", 0, "A", "have a giant mouth"],
  ["I have no legs, and I wiggle through the dirt.", "🪱", "worm", "A worm", 0, "A", "wiggle through the dirt"],
  ["I have orange fur, pointy ears, and a big bushy tail.", "🦊", "fox", "A fox", 0, "A", "have orange fur", ["deer"]],
  ["I have antlers on my head, and I live in the forest.", "🦌", "deer", "A deer", 0, "A", "have antlers"],
  ["I am a mountain that can spill out hot lava.", "🌋", "volcano", "A volcano", 0, "N", "spill out hot lava", ["mountain"]],
  ["I flash bright across the sky in a storm.", "⚡", "lightning", "Lightning", 0, "N", "flash across the sky in a storm"],
  ["I have a round cap on a short stem, and I pop up after rain.", "🍄", "mushroom", "A mushroom", 0, "N", "have a round cap on a stem"],
  ["I am a leaf from a maple tree, and I turn red in the fall.", "🍁", "maple leaf", "A maple leaf", 0, "N", "come from a maple tree"],
  ["I am water that rolls in and crashes onto the beach.", "🌊", "wave", "A wave", 0, "N", "crash onto the beach"],
  ["I am a red flower with sharp thorns on my stem.", "🌹", "rose", "A rose", 0, "N", "have thorns"],
  ["I am hard and curly, and you can find me on the beach.", "🐚", "seashell", "A seashell", 0, "N", "be hard and curly"],
  ["I am very tall and made of rock, and people climb to my top.", "⛰️", "mountain", "A mountain", 0, "N", "be a tall pile of rock", ["volcano"]],
  ["I am the big round planet where we all live.", "🌍", "Earth", "Earth", 0, "N", "be the planet we live on"],
  ["I am a tall tree with big leaves at the top, and coconuts grow on me.", "🌴", "palm tree", "A palm tree", 0, "N", "grow coconuts"],
  ["I zoom through space with a long, glowing tail.", "☄️", "comet", "A comet", 0, "N", "zoom through space with a glowing tail"],
  ["I am a stick of colored wax, and you color with me.", "🖍️", "crayon", "A crayon", 0, "T", "be made of colored wax"],
  ["I am long and flat with numbers on me, and I measure things.", "📏", "ruler", "A ruler", 0, "T", "measure how long things are"],
  ["I pull paper clips toward me and stick to the fridge.", "🧲", "magnet", "A magnet", 0, "T", "pull paper clips toward it"],
  ["I glow when you flip the switch on.", "💡", "lightbulb", "A lightbulb", 0, "T", "glow when you flip a switch"],
  ["You wear me on your back to carry books to school.", "🎒", "backpack", "A backpack", 0, "T", "go on your back"],
  ["I bang nails into wood.", "🔨", "hammer", "A hammer", 0, "T", "bang nails into wood"],
  ["Ring me and I go ding-dong!", "🔔", "bell", "A bell", 0, "T", "go ding-dong"],
  ["I have soft bristles, and you dip me in paint.", "🖌️", "paintbrush", "A paintbrush", 0, "T", "get dipped in paint"],
  ["I keep things shut, and you need a key to open me.", "🔒", "lock", "A lock", 0, "T", "need a key to open"],
  ["You look through me to see faraway stars.", "🔭", "telescope", "A telescope", 0, "T", "help you see faraway stars"],
  ["You sleep in me when you go camping.", "⛺", "tent", "A tent", 0, "T", "be a shelter for camping"],
  ["I have many pieces that fit together to make a picture.", "🧩", "puzzle", "A puzzle", 0, "T", "be a picture made of pieces"],
  ["I am baked in a loaf, and you slice me to make a sandwich.", "🍞", "bread", "Bread", 0, "F", "come in a loaf", ["cheese"]],
  ["I am made from milk, and mice in stories love to nibble me.", "🧀", "cheese", "Cheese", 0, "F", "be made from milk", ["pancakes", "bread", "pretzel", "taco"]],
  ["I am a fruit with spiky skin and a leafy crown on top.", "🍍", "pineapple", "A pineapple", 0, "F", "have a leafy crown"],
  ["I am hairy and brown outside, with white food and juice inside.", "🥥", "coconut", "A coconut", 0, "F", "be hairy and brown outside"],
  ["We are small and red, and we come in pairs on stems.", "🍒", "cherries", "Cherries", 1, "F", "come in pairs on stems"],
  ["We are flat and round, and you pour syrup on top of us.", "🥞", "pancakes", "Pancakes", 1, "F", "get syrup poured on top"],
  ["I grow under the ground, and you can mash me or make fries.", "🥔", "potato", "A potato", 0, "F", "get made into fries"],
  ["I grow under the ground in a shell, and I can be made into a creamy butter.", "🥜", "peanut", "A peanut", 0, "F", "grow in a shell under the ground", ["coconut"]],
  ["I am a salty snack, twisted into a loop shape.", "🥨", "pretzel", "A pretzel", 0, "F", "be twisted into a loop"],
  ["I am a folded shell with tasty fillings inside.", "🌮", "taco", "A taco", 0, "F", "be a folded shell with fillings"],
  ["I have a siren, and I rush people who are hurt to the hospital.", "🚑", "ambulance", "An ambulance", 0, "V", "rush hurt people to the hospital", ["police car", "taxi"]],
  ["I have flashing lights, and police officers drive me.", "🚓", "police car", "A police car", 0, "V", "carry police officers"],
  ["I have giant back wheels, and I pull a plow on a farm.", "🚜", "tractor", "A tractor", 0, "V", "pull a plow"],
  ["I am a yellow car, and people pay me for a ride.", "🚕", "taxi", "A taxi", 0, "V", "be a car people pay to ride in"],
  ["I am a giant boat that carries lots of people across the ocean.", "🚢", "ship", "A ship", 0, "V", "be a giant boat"],
  ["I am a small, skinny boat, and you paddle me.", "🛶", "canoe", "A canoe", 0, "V", "get paddled"],
  ["I have two small wheels and a handle, and you push me with one foot.", "🛴", "scooter", "A scooter", 0, "V", "get pushed along with one foot", ["skateboard"]],
  ["I am a board with four wheels, and you ride me standing up.", "🛹", "skateboard", "A skateboard", 0, "V", "be a board with four wheels"],
  ["I have two wheels and a loud motor.", "🏍️", "motorcycle", "A motorcycle", 0, "V", "have two wheels and a motor"],
];
const LG7V_lcSubj = s => /^(A|An) /.test(s) ? s[0].toLowerCase() + s.slice(1) : s === "Earth" ? s : s.toLowerCase();
addBank(7, "logic", "riddles", 0.32, function () {
  const r = pick(LG7V_RID), [txt, e, n, subj, pl, cat, clue, skip] = r;
  const others = shuffle(LG7V_RID.filter(x => x !== r && x[5] === cat && !(skip || []).includes(x[2]))).slice(0, 3);
  const q = { q: `<div class="sentence">${txt}</div>What am I?`, say: `${txt} What am I?`, opts: shuffle([[e, n], ...others.map(x => [x[1], x[2]])]).map(eOpt), ans: eOpt([e, n]), sayAns: LG7V_lcSubj(subj), why: `${pl ? "They're" : "It's"} ${LG7V_lcSubj(subj)}!`, key: "V" + txt };
  q.v22 = { clue };
  return q;
});
whyRule(7, "logic", "riddles", (q, picked) => {
  const v = q.v22; if (!v) return null;
  const m = String(picked).match(/title="([^"]+)"/), x = m && LG7V_RID.find(r => r[2] === m[1]); if (!x) return null;
  const [, , , subj, pl] = x, cm = v.clue.match(/^be (.*)$/);
  return cm ? `${subj} ${pl ? "are" : "is"} not ${cm[1]}.` : `${subj} ${pl ? "do" : "does"} not ${v.clue}.`;
});

/* ---------- turns: how many quarter turns? ---------- */
const LG7V_DIAG = typeof LGA_DIAG !== "undefined" ? LGA_DIAG : [["↗️", "up and to the right"], ["↘️", "down and to the right"], ["↙️", "down and to the left"], ["↖️", "up and to the left"]];
addBank(7, "logic", "turns", 0.25, function () {
  const D = Math.random() < 0.5 ? ARROWS : LG7V_DIAG, s = R(0, 3), d = R(1, 3), e = D[(s + d) % 4], right = Math.random() < 0.5;
  const n = right ? d : 4 - d, bigA = em => `<span class="emo" style="font-size:80px">${em}</span>`;
  const path = range(1, n).map(i => D[(s + (right ? i : -i) + 8) % 4][1]);
  const q = { q: `How many <b>quarter turns to the ${right ? "right" : "left"}</b> turn the arrow from pointing <b>${D[s][1]}</b> to pointing <b>${e[1]}</b>?`, say: `How many quarter turns to the ${right ? "right" : "left"} turn the arrow from pointing ${D[s][1]} to pointing ${e[1]}?`, vis: row(bigA(D[s][0]), arrow(), bigA(e[0])), opts: ["1", "2", "3", "4"], ans: String(n), big: 1, why: `Turn one quarter at a time to the ${right ? "right" : "left"}: ${path.join(", then ")}. That is ${LG7V_s(n, "quarter turn")}.`, key: "Vq" + (D === ARROWS) + s + d + right };
  q.v22 = { D: D.map(x => x[1]), s, right, e: e[1] };
  return q;
});
whyRule(7, "logic", "turns", (q, picked) => {
  const v = q.v22; if (!v) return null;
  const k = +xPlain(picked); if (!(k >= 1 && k <= 4)) return null;
  if (k === 4) return `4 quarter turns make a full turn, so it would point ${v.D[v.s]} again.`;
  const to = v.D[(v.s + (v.right ? k : -k) + 8) % 4];
  return `${LG7V_s(k, "quarter turn")} to the ${v.right ? "right" : "left"} would point it ${to}, not ${v.e}.`;
});

/* ---------- ifthen: number rules ---------- */
// number rules as data: [kind, N]
const LG7V_nrLab = (t, N) => [`more than ${N}`, `less than ${N}`, "even", "odd", "a number that ends in 0", "a number that ends in 5"][t];
const LG7V_nrFit = (t, N, x) => [x > N, x < N, x % 2 === 0, x % 2 === 1, x % 10 === 0, x % 10 === 5][t];
const LG7V_nrSay = (t, N, x) => [`${x} is ${x > N ? "" : "not "}more than ${N}`, `${x} is ${x < N ? "" : "not "}less than ${N}`, `${x} is ${x % 2 ? "odd" : "even"}`, `${x} is ${x % 2 ? "odd" : "even"}`, `${x} ${x % 10 === 0 ? "ends" : "does not end"} in 0`, `${x} ${x % 10 === 5 ? "ends" : "does not end"} in 5`][t];
addBank(7, "logic", "ifthen", 0.3, function () {
  const t = R(0, 5), N = R(10, 20), lab = LG7V_nrLab(t, N), not = Math.random() < 0.4, pool = shuffle(range(1, 40).filter(x => t > 1 || x !== N));
  const yes = pool.filter(x => LG7V_nrFit(t, N, x)), no = pool.filter(x => !LG7V_nrFit(t, N, x)); if (yes.length < 3 || no.length < 3) return null;
  const ans = not ? no[0] : yes[0], others = not ? yes.slice(0, 3) : no.slice(0, 3);
  const rule = `If it is <b>${lab}</b>, it goes in the box.`;
  const q = { q: `${rule} Which number ${not ? "does <b>not</b> go" : "goes"} in the box?`, say: `If it is ${lab}, it goes in the box. Which number ${not ? "does not go" : "goes"} in the box?`, opts: shuffle([ans, ...others]).map(String), ans: String(ans), big: 1, why: `${LG7V_nrSay(t, N, ans)}, so it ${not ? "stays out" : "goes in the box"}.`, key: "Vn" + lab + not + ans };
  q.v22 = { t, N, not };
  return q;
});
whyRule(7, "logic", "ifthen", (q, picked) => {
  const v = q.v22; if (!v) return null;
  const p = +xPlain(picked); if (!Number.isInteger(p)) return null;
  const fit = LG7V_nrFit(v.t, v.N, p), say = LG7V_nrSay(v.t, v.N, p);
  if (v.not) return fit ? `${say}, so it does go in the box.` : null;
  return fit ? null : `${say}, so it stays out of the box.`;
});

/* ---------- calendar: months and weekends ---------- */
const LG7V_MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const LG7V_M = i => LG7V_MONTHS[(i + 120) % 12];
addBank(7, "logic", "calendar", 0.3, function () {
  const t = R(0, 11), k = R(0, 4);
  if (k === 4) {
    const wk = Math.random() < 0.5, wd = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    if (wk) { const a = pick(["Saturday", "Sunday"]), opts = shuffle([a, ...shuffle(wd).slice(0, 3)]); const q = { q: "Which day is part of the <b>weekend</b>?", opts, ans: a, big: 1, why: "Saturday and Sunday are the weekend days.", key: "Vw" + a }; q.v22 = { t: "wk" }; return q; }
    const a = pick(wd), q = { q: "Which day is a <b>weekday</b>?", opts: shuffle([a, "Saturday", "Sunday"]), ans: a, big: 1, why: "Monday, Tuesday, Wednesday, Thursday and Friday are weekdays.", key: "Vd" + a };
    q.v22 = { t: "wd" }; return q;
  }
  const F = [
    [`If this month is <b>${LG7V_M(t)}</b>, what month comes <b>next</b>?`, 1, `The month after ${LG7V_M(t)} is ${LG7V_M(t + 1)}.`],
    [`If this month is <b>${LG7V_M(t)}</b>, what month was <b>last month</b>?`, -1, `The month before ${LG7V_M(t)} is ${LG7V_M(t - 1)}.`],
    [`If this month is <b>${LG7V_M(t)}</b>, what month will it be <b>in 2 months</b>?`, 2, `Count forward 2 months: ${LG7V_M(t + 1)}, then ${LG7V_M(t + 2)}.`],
    [`What month comes <b>between</b> ${LG7V_M(t)} and ${LG7V_M(t + 2)}?`, 1, `The months go ${LG7V_M(t)}, ${LG7V_M(t + 1)}, ${LG7V_M(t + 2)}.`],
  ];
  const [qt, off, why] = F[k], a = LG7V_M(t + off);
  const opts = uniq(a, shuffle([LG7V_M(t), LG7V_M(t + off + 1), LG7V_M(t + off - 1), LG7V_M(t - off), LG7V_M(t + 6), LG7V_M(t + off + 2), LG7V_M(t + 3)]).filter(x => x !== a));
  const q = { q: qt, opts, ans: a, big: 1, why, key: "Vm" + k + t };
  q.v22 = { t: "m", ref: LG7V_M(t), off, k, end: LG7V_M(t + 2) };
  return q;
});
whyRule(7, "logic", "calendar", (q, picked) => {
  const v = q.v22; if (!v) return null;
  const p = xPlain(picked);
  if (v.t === "wk") return /^(Mon|Tues|Wednes|Thurs|Fri)day$/.test(p) ? `${p} is a weekday, a school day, not a weekend day.` : null;
  if (v.t === "wd") return /^(Satur|Sun)day$/.test(p) ? `${p} is part of the weekend, not a weekday.` : null;
  const pi = LG7V_MONTHS.indexOf(p), ri = LG7V_MONTHS.indexOf(v.ref); if (pi < 0 || ri < 0) return null;
  if (v.k === 3) return p === v.ref || p === v.end ? `${p} is one of the two months named, not the one between them.` : `${p} is not between ${v.ref} and ${v.end}.`;
  if (pi === ri) return `${p} is this month; you need to count ${LG7V_s(Math.abs(v.off), "month")} ${v.off > 0 ? "forward" : "back"}.`;
  const f = v.off > 0 ? (pi - ri + 12) % 12 : (ri - pi + 12) % 12;
  if (f > 6) return `${p} comes ${LG7V_s(12 - f, "month")} ${v.off > 0 ? "before" : "after"} ${v.ref}, not ${v.off > 0 ? "after" : "before"} it.`;
  return `${p} is ${LG7V_s(f, "month")} ${v.off > 0 ? "after" : "before"} ${v.ref}, not ${Math.abs(v.off)}.`;
});

/* ---------- numriddles: new clue types ---------- */
const LG7V_NR = [
  n => [`I am 10 less than ${n + 10}.`, `${n} is 10 less than ${n + 10}.`, [n + 20, n + 9, n + 11]],
  n => [`I am half of ${2 * n}.`, `${n} + ${n} = ${2 * n}, so ${n} is half of ${2 * n}.`, [2 * n, n + 2, n - 2]],
  n => [`If you take away 4 from me, you get ${n - 4}.`, `${n} take away 4 is ${n - 4}.`, [n - 8, n - 3, n + 4]],
  n => [`I come right after ${n - 1}.`, `${n} comes right after ${n - 1}.`, [n - 1, n - 2, n + 1]],
  n => [`I am 5 more than ${n - 5}.`, `${n} is 5 more than ${n - 5}.`, [n - 5, n + 5, n - 4]],
  n => [`I am ${n % 2 ? "odd" : "even"} and between ${n - 1} and ${n + 3}, but not ${n + 2}.`, `${n} is between ${n - 1} and ${n + 3}, it is ${n % 2 ? "odd" : "even"}, and it is not ${n + 2}.`, [n + 1, n + 2, n - 1]],
];
addBank(7, "logic", "numriddles", 0.42, function () {
  const f = R(0, LG7V_NR.length - 1), n = R(12, 40), [t, chk, traps] = LG7V_NR[f](n);
  const q = { q: `<div class="sentence">${t}</div>Who am I?`, say: `${t} Who am I?`, opts: numU(n, [...shuffle(traps).slice(0, 2), n + 1, n - 1, n + 2], 3, 0), ans: String(n), big: 1, why: `${n} fits the clue. Check it: ${chk}`, key: "V" + f + "-" + n };
  q.v22 = { f, n };
  return q;
});
const LG7V_rel = (p, x) => p > x ? `${p} is ${p - x} more than ${x}` : `${p} is ${x - p} less than ${x}`;
whyRule(7, "logic", "numriddles", (q, picked) => {
  const v = q.v22; if (!v) return null;
  const p = +xPlain(picked), n = v.n; if (!Number.isInteger(p) || p === n) return null;
  if (v.f === 0) return p === n + 10 ? `${p} is the number in the clue; you need 10 less than it.` : `${LG7V_rel(p, n + 10)}, but the riddle says 10 less.`;
  if (v.f === 1) return `Half of ${2 * n} is not ${p}, because ${p} + ${p} = ${2 * p}.`;
  if (v.f === 2) return `${p} take away 4 is ${p - 4}, not ${n - 4}.`;
  if (v.f === 3) { const x = n - 1; return p === x ? `${p} is ${x} itself, not the number after it.` : p < x ? `${p} comes before ${x}, not after it.` : `${p} is ${p - x} more than ${x}, not just 1 more.`; }
  if (v.f === 4) return p === n - 5 ? `${p} is the number in the clue; you need 5 more than it.` : `${LG7V_rel(p, n - 5)}, but the riddle says 5 more.`;
  const par = n % 2 ? "odd" : "even", pp = p % 2 ? "odd" : "even";
  if (p === n + 2) return `The riddle says the number is not ${n + 2}.`;
  if (pp !== par) return `${p} is ${pp}, but the riddle says ${par}.`;
  return `${p} is not between ${n - 1} and ${n + 3}.`;
});

/* ---------- sequence: more step-by-step stories (same shape as SEQS) ---------- */
SEQS.push(
  [["🍞", "get two slices of bread"], ["🥜", "spread the peanut butter"], ["🥪", "put the slices together"], ["😋", "eat the sandwich"]],
  [["🚰", "turn on the water"], ["🧼", "scrub with soap"], ["👐", "rinse off the soap"], ["🧻", "dry your hands"]],
  [["❄️", "snow falls"], ["⚪", "roll a big snowball"], ["⛄", "stack the snowballs"], ["🥕", "add a carrot nose"]],
  [["✏️", "write a letter"], ["✉️", "put it in an envelope"], ["📮", "drop it in the mailbox"], ["📬", "a friend gets the letter"]],
  [["🌸", "the apple tree blooms"], ["🍏", "a small green apple grows"], ["🍎", "the apple turns red"], ["🧺", "pick the apple"]],
);

/* ---------- panalogy: new pairs (same shape as LGA_PANAL) ---------- */
if (typeof LGA_PANAL !== "undefined") LGA_PANAL.push([["eyes", "see", "👀", "", "You use your eyes to see"], ["ears", "hear", "👂", "", "You use your ears to hear"], ["nose", "smell", "👃", "", "You use your nose to smell"], ["tongue", "taste", "👅", "", "You use your tongue to taste"], ["teeth", "chew", "🦷", "", "You use your teeth to chew"], ["legs", "walk", "🦵", "", "You use your legs to walk"]]);
if (typeof LGA_PANAL !== "undefined") { const G = LGA_PANAL.find(g => g.some(x => x[0] === "pig" && x[1] === "oink")); if (G) G.push(["turkey", "gobble", "🦃", "", "A turkey says gobble"], ["snake", "hiss", "🐍", "", "A snake says hiss"]); }

/* ---------- common: new links ---------- */
const LG7V_CR = ["have stripes", "have shells", "give off light", "have wings", "have holes", "are prickly", "are tools"];
const LG7V_CNEG = ["has no stripes", "has no shell", "does not give off light", "has no wings", "has no holes", "is not prickly", "is not a tool"];
// emoji: [name, rules it surely has, rules it might have]
const LG7V_CI = {
  "🦓": ["zebra", [0]], "🐯": ["tiger", [0]], "🐝": ["bee", [0, 3], [5]], "🦨": ["skunk", [0]], "🚧": ["road barrier", [0], [2]],
  "🐢": ["turtle", [1]], "🐌": ["snail", [1], [0]], "🦀": ["crab", [1], [5]], "🥚": ["egg", [1]], "🥜": ["peanut", [1]], "🥥": ["coconut", [1], [4]],
  "💡": ["lightbulb", [2]], "🔦": ["flashlight", [2]], "🕯️": ["candle", [2]], "⭐": ["star", [2]], "🚦": ["traffic light", [2]],
  "🦇": ["bat", [3]], "🦆": ["duck", [3]], "🐞": ["ladybug", [3], [1]], "🦉": ["owl", [3], [0]],
  "🍩": ["donut", [4]], "🧽": ["sponge", [4]], "🥯": ["bagel", [4]], "🧀": ["cheese", [4]],
  "🌵": ["cactus", [5]], "🦔": ["hedgehog", [5]], "🍍": ["pineapple", [5]], "🐡": ["blowfish", [5]],
  "🔨": ["hammer", [6]], "🔧": ["wrench", [6], [4]], "🪛": ["screwdriver", [6]], "🪚": ["saw", [6], [4, 5]], "⛏️": ["pickax", [6]],
};
const LG7V_cNot = (e, i) => { const d = LG7V_CI[e]; return d && !d[1].includes(i) && !(d[2] || []).includes(i); };
addBank(7, "logic", "common", 0.3, function () {
  const i = R(0, LG7V_CR.length - 1), items = Object.keys(LG7V_CI).filter(e => LG7V_CI[e][1].includes(i)), shown = shuffle(items).slice(0, 3);
  const others = shuffle(LG7V_CR.map((r, j) => j).filter(j => j !== i && shown.some(e => LG7V_cNot(e, j)))).slice(0, 3);
  const q = { q: "What do these have in common?", vis: `<div class="chips">${shown.map(e => `<span class="emo xl">${e}</span>`).join("")}</div>`, opts: shuffle([i, ...others]).map(j => `They ${LG7V_CR[j]}`), ans: `They ${LG7V_CR[i]}`, why: `All three ${LG7V_CR[i]}.`, key: "V" + i + shown.join() };
  q.v22 = { shown };
  return q;
});
whyRule(7, "logic", "common", (q, picked) => {
  const v = q.v22; if (!v) return null;
  const j = LG7V_CR.indexOf(xPlain(picked).replace(/^They /, "")); if (j < 0) return null;
  const e = v.shown.find(e => LG7V_cNot(e, j)); if (!e) return null;
  return `The ${LG7V_CI[e][0]} ${LG7V_CNEG[j]}, so not all three ${LG7V_CR[j]}.`;
});

/* ---------- balance: two scales, three balls ---------- */
const LG7V_BALLS = [["🔴", "red ball"], ["🔵", "blue ball"], ["🟢", "green ball"], ["🟡", "yellow ball"], ["🟣", "purple ball"]];
addBank(7, "logic", "balance", 0.3, function () {
  const [H, M, L] = shuffle(LG7V_BALLS).slice(0, 3), f1 = Math.random() < 0.5, f2 = Math.random() < 0.5, swap = Math.random() < 0.5, askHeavy = Math.random() < 0.5;
  const sc1 = f1 ? seesaw(H[0], M[0], "left", 0.8) : seesaw(M[0], H[0], "right", 0.8), sc2 = f2 ? seesaw(M[0], L[0], "left", 0.8) : seesaw(L[0], M[0], "right", 0.8);
  const ans = askHeavy ? H : L;
  const q = { q: `Look at both scales. Which ball is the <b>${askHeavy ? "heaviest" : "lightest"}</b>?`, say: `Look at both scales. Which ball is the ${askHeavy ? "heaviest" : "lightest"}?`, vis: swap ? row(sc2, sc1) : row(sc1, sc2), opts: shuffle([H, M, L]).map(eOpt), ans: eOpt(ans), sayAns: `the ${ans[1]}`, why: `The ${H[1]} is heavier than the ${M[1]}, and the ${M[1]} is heavier than the ${L[1]}. So the ${ans[1]} is the ${askHeavy ? "heaviest" : "lightest"}.`, key: "V" + H[0] + M[0] + L[0] + f1 + f2 + swap + askHeavy };
  q.v22 = { H: H[1], M: M[1], L: L[1], askHeavy };
  return q;
});
whyRule(7, "logic", "balance", (q, picked) => {
  const v = q.v22; if (!v) return null;
  const m = String(picked).match(/title="([^"]+)"/), p = m && m[1]; if (!p) return null;
  if (v.askHeavy) { if (p === v.M) return `The ${v.M} goes up next to the ${v.H}, so the ${v.M} is lighter.`; if (p === v.L) return `The ${v.L} goes up next to the ${v.M}, so it can't be the heaviest.`; return null; }
  if (p === v.M) return `The ${v.M} goes down next to the ${v.L}, so the ${v.M} is heavier.`;
  if (p === v.H) return `The ${v.H} goes down next to the ${v.M}, so it can't be the lightest.`;
  return null;
});

/* ---------- robot: which arrows lead there? ---------- */
const LG7V_BN = { "🍎": "apple", "⭐": "star", "🎈": "balloon", "🍌": "banana", "🧁": "cupcake", "⚽": "soccer ball", "🌼": "flower", "🍓": "strawberry" };
const LG7V_walk = (r, c, path, n) => { for (const d of path) { r += DIRS[d][0]; c += DIRS[d][1]; if (r < 0 || c < 0 || r >= n || c >= n) return null; } return [r, c]; };
addBank(7, "logic", "robot", 0.2, function () {
  const n = 4, K = Object.keys(DIRS), r = R(0, n - 1), c = R(0, n - 1), len = R(2, 4);
  let path = null, end = null;
  for (let t = 0; t < 60 && !end; t++) { const p = range(1, len).map(() => pick(K)), e = LG7V_walk(r, c, p, n); if (e && !(e[0] === r && e[1] === c)) { path = p; end = e; } }
  if (!end) return null;
  const items = shuffle(BOARD_ITEMS).slice(0, 4), cells = {}; cells[end.join()] = items[0];
  const free = []; for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) { const k = i + "," + j; if (k !== end.join() && !(i === r && j === c)) free.push(k); }
  shuffle(free).slice(0, 3).forEach((k, i) => cells[k] = items[i + 1]);
  const code = p => p.map(d => DIRS[d][2]).join(" "), wrong = [];
  for (let t = 0; t < 200 && wrong.length < 3; t++) {
    const w = path.slice(); if (Math.random() < 0.7) w[R(0, len - 1)] = pick(K); else w.splice(0, len, ...range(1, len).map(() => pick(K)));
    const e = LG7V_walk(r, c, w, n); if (!e || range(1, len).some(k => { const m = LG7V_walk(r, c, w.slice(0, k), n); return m[0] === end[0] && m[1] === end[1]; })) continue;
    if (!wrong.some(x => code(x) === code(w)) && code(w) !== code(path)) wrong.push(w);
  }
  if (wrong.length < 3) return null;
  const nm = LG7V_BN[items[0]];
  const q = { q: `Which arrows take the robot to the <span class="emo">${items[0]}</span>?`, say: `Which arrows take the robot to the ${nm}?`, vis: board(n, cells, [r, c]), opts: shuffle([path, ...wrong]).map(code), ans: code(path), sayAns: path.join(", "), why: `Start at the robot and move one square for each arrow: ${path.join(", ")}. That lands on the ${nm}.`, extra: 10, key: "V" + r + c + path.join() };
  q.v22 = { r, c, n, cells, nm };
  return q;
});
whyRule(7, "logic", "robot", (q, picked) => {
  const v = q.v22; if (!v) return null;
  const toD = {}; for (const d in DIRS) toD[DIRS[d][2]] = d;
  const path = String(picked).split(" ").map(x => toD[x]); if (path.some(x => !x)) return null;
  const e = LG7V_walk(v.r, v.c, path, v.n); if (!e) return null;
  if (e[0] === v.r && e[1] === v.c) return "Those arrows bring the robot back to where it started.";
  const it = v.cells[e.join()];
  return it ? `Those arrows land on the ${LG7V_BN[it] || "other picture"}, not the ${v.nm}.` : `Those arrows stop on an empty square, not on the ${v.nm}.`;
});

/* ---------- truefalse: comparing two-digit numbers ---------- */
addBank(7, "logic", "truefalse", 0.2, function () {
  const TF = ["True ✔", "False ✘"], a = R(10, 99); let b = R(10, 99); while (b === a) b = R(10, 99);
  if (Math.random() < 0.35) b = (a % 10) * 10 + Math.floor(a / 10); // swap the digits
  if (b === a || b < 10) b = a + pick([1, 10, -1, -10].filter(x => a + x >= 10 && a + x <= 99));
  const more = Math.random() < 0.5, truth = more ? a > b : a < b, big = a > b ? "more" : "less";
  const ta = Math.floor(a / 10), tb = Math.floor(b / 10);
  const why = ta !== tb ? `Compare the tens first: ${ta} tens is ${big} than ${tb} tens, so ${a} is ${big} than ${b}.` : `The tens are the same, so compare the ones: ${a} is ${big} than ${b}.`;
  const q = { q: `True or false? <b>${a}</b> is <b>${more ? "more" : "less"}</b> than <b>${b}</b>.`, say: `True or false? ${a} is ${more ? "more" : "less"} than ${b}.`, opts: TF, ans: TF[truth ? 0 : 1], big: 1, why, key: "V" + a + (more ? ">" : "<") + b };
  q.v22 = { a, b, big };
  return q;
});
whyRule(7, "logic", "truefalse", (q, picked) => {
  const v = q.v22; if (!v) return null;
  return /^True/.test(xPlain(picked)) ? `${v.a} is really ${v.big} than ${v.b}, so the sentence is wrong.` : `${v.a} really is ${v.big} than ${v.b}, so the sentence is right.`;
});

/* ---------- coords: neighbors on the grid ---------- */
const LG7V_GP = { "🍎": "apple", "⭐": "star", "🐶": "dog", "🚗": "car", "🌼": "flower", "🎈": "balloon", "🐟": "fish", "⚽": "soccer ball", "🍦": "ice cream", "🏠": "house", "🐱": "cat", "🌙": "moon" };
const LG7V_ND = [["above", -1, 0, "just <b>above</b>"], ["below", 1, 0, "just <b>below</b>"], ["left", 0, -1, "just to the <b>left</b> of"], ["right", 0, 1, "just to the <b>right</b> of"]];
addBank(7, "logic", "coords", 0.2, function () {
  const cols = "ABCD", [dn, dr, dc, words] = pick(LG7V_ND);
  const ci = R(Math.max(0, -dc), 3 - Math.max(0, dc)), ri = R(1 + Math.max(0, -dr), 4 - Math.max(0, dr));
  const sX = cols[ci] + ri, sY = cols[ci + dc] + (ri + dr);
  const rest = shuffle(cols.split("").flatMap(c => [1, 2, 3, 4].map(r => c + r)).filter(s => s !== sX && s !== sY)).slice(0, 3);
  const pics = shuffle(GRIDPICS).slice(0, 5), spots = [sX, sY, ...rest], cells = {};
  spots.forEach((s, i) => cells[s] = pics[i]);
  const o = e => `<span class="emo">${e}</span>`, X = pics[0], Y = pics[1];
  const q = { q: `What is ${words} the <span class="emo">${X}</span>?`, say: `What is ${clean(words)} the ${LG7V_GP[X]}?`, vis: coordGrid(cells), opts: shuffle(pics.slice(1)).map(o), ans: o(Y), sayAns: `the ${LG7V_GP[Y]}`, why: `The ${LG7V_GP[X]} is at ${sX}, and the square ${dn === "above" || dn === "below" ? dn : "to the " + dn} is ${sY}.`, key: "V" + spots.join() + pics.join() + dn };
  q.v22 = { cells, sY, dn };
  return q;
});
whyRule(7, "logic", "coords", (q, picked) => {
  const v = q.v22; if (!v) return null;
  const m = String(picked).match(/<span class="emo">(.*?)<\/span>/), e = m && m[1], at = e && Object.keys(v.cells).find(k => v.cells[k] === e);
  if (!at || at === v.sY) return null;
  return `The ${LG7V_GP[e] || "picture"} is at ${at}, not ${v.sY}.`;
});

