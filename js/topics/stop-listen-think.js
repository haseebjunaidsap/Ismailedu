/* =====================================================================
   v27: "Stop, Listen & Think" — one topic per age (Manners & Behavior).
   Builds patience (wait for the green light), listening (some questions are
   heard, not read) and careful thinking (NOT / ONLY / opposite / color traps).
   Flags on a question (all plain data, safe to save as JSON):
     q.v27   {f: format, xo?}         marks these questions
     q.wait  seconds of red light before answers count (patience)
     q.listen  the question is spoken, not shown, until it is answered
     q.calm  no countdown clock for this question
   ===================================================================== */
const V27_E = (e, n) => `<span class="emo" title="${n}">${e}</span>`;
const V27_O = (e, n) => `${V27_E(e, n)} ${n}`;
const V27_ITEMS = [
  ["🍎", "apple"], ["🍌", "banana"], ["🍇", "grapes"], ["🥕", "carrot"], ["⚽", "ball"], ["🧢", "hat"], ["📕", "book"], ["🐱", "cat"],
  ["🐶", "dog"], ["🐟", "fish"], ["🐸", "frog"], ["🦆", "duck"], ["🚗", "car"], ["🚲", "bike"], ["🚌", "bus"], ["⭐", "star"],
  ["🌙", "moon"], ["🎂", "cake"], ["👟", "shoe"], ["🔑", "key"], ["🔔", "bell"], ["🥁", "drum"], ["☂️", "umbrella"], ["🌳", "tree"],
  ["🏠", "house"], ["🍕", "pizza"], ["🎸", "guitar"], ["🚀", "rocket"], ["👑", "crown"], ["🎁", "present"], ["🧸", "teddy bear"],
  ["🎈", "balloon"], ["✏️", "pencil"], ["🍪", "cookie"], ["🐢", "turtle"], ["🦋", "butterfly"],
];
const V27_an = w => (/^[aeiou]/i.test(w) ? "an " : "a ") + w;
const V27_list = a => a.length <= 2 ? a.join(" and ") : `${a.slice(0, -1).join(", ")}, and ${a[a.length - 1]}`;
const V27_ORD = ["first", "second", "third", "fourth", "fifth"];
const V27_NUMW = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen"];
const V27_wait = age => R(2, age >= 8 ? 4 : 3);
const V27_q = (age, o) => Object.assign({ wait: V27_wait(age), calm: 1, big: 1 }, o);

/* A. listen to a list: which one was not said / which came first / which came after */
function V27_listenList(age) {
  const n = age <= 6 ? 3 : age === 7 ? pick([3, 4]) : age === 8 ? 4 : pick([4, 5]);
  const pool = shuffle(V27_ITEMS.slice()), said = pool.slice(0, n), not = pool.slice(n, n + 3);
  const ctx = pick(["Pip put these in his backpack:", "Pip saw these on his walk:", "Pip drew these pictures:", "Pip packed these for a picnic:", "Pip found these in the toy box:"]);
  const spoken = `${ctx} ${V27_list(said.map(x => V27_an(x[1])))}.`;
  const modes = age <= 6 ? ["not", "not", "said"] : age === 7 ? ["not", "first", "last", "said"] : ["not", "first", "last", "after", "second"];
  const m = pick(modes);
  let ask, ans, opts, why, whyNot = {};
  const label = x => V27_O(x[0], x[1]);
  if (m === "not") {
    const odd = not[0]; ans = label(odd); opts = shuffle([odd, ...shuffle(said).slice(0, 3)]).map(label);
    ask = "Which one did Pip NOT say?"; why = `Pip said ${V27_list(said.map(x => x[1]))}. He never said ${odd[1]}.`;
    said.forEach(x => { whyNot[label(x)] = `Pip did say ${x[1]}. Listen for the one he never said.`; });
  } else if (m === "said") {
    const yes = pick(said); ans = label(yes); opts = shuffle([yes, ...not]).map(label);
    ask = "Which one DID Pip say?"; why = `Pip said ${V27_list(said.map(x => x[1]))}, so ${yes[1]} is the one.`;
    not.forEach(x => { whyNot[label(x)] = `Pip never said ${x[1]}. He said ${V27_list(said.map(y => y[1]))}.`; });
  } else {
    const idx = m === "first" ? 0 : m === "last" ? n - 1 : m === "second" ? 1 : R(0, n - 2) + 1;
    const tgt = said[idx];
    ask = m === "after" ? `What did Pip say right AFTER the ${said[idx - 1][1]}?` : `Which one did Pip say ${m === "last" ? "LAST" : m === "first" ? "FIRST" : "SECOND"}?`;
    ans = label(tgt);
    const others = said.filter(x => x !== tgt);
    opts = shuffle([tgt, ...shuffle(others).slice(0, Math.min(3, others.length)), ...(others.length < 3 ? not.slice(0, 3 - others.length) : [])]).map(label);
    why = `Pip said ${V27_list(said.map(x => x[1]))}. The ${m === "after" ? `one right after the ${said[idx - 1][1]}` : `${m === "first" ? "first" : m === "last" ? "last" : "second"} one`} was ${V27_an(tgt[1])}.`;
    said.forEach((x, i) => { if (x !== tgt) whyNot[label(x)] = `The ${x[1]} was the ${V27_ORD[i]} thing Pip said.`; });
    not.forEach(x => { whyNot[label(x)] = `Pip never said ${x[1]}.`; });
  }
  return V27_q(age, {
    q: `👂 ${spoken} <b>${ask}</b>`, say: `Listen carefully! ${spoken} ${ask}`, listen: 1,
    vis: `<div class="v27-ear">👂</div>`, opts, ans, why, whyNot, key: `v27L${m}${said.map(x => x[1]).join()}|${ans}`, v27: { f: "list" },
  });
}

/* B. "Pip says" (like Simon says): only do it when Pip says "Pip says" */
function V27_pipSays(age) {
  const acts = shuffle([["⭐", "star"], ["🌙", "moon"], ["🍎", "apple"], ["🐟", "fish"], ["🎈", "balloon"], ["🔔", "bell"], ["🚗", "car"], ["🐸", "frog"]]);
  const NONE = "✋ Nothing! Pip didn't say “Pip says.”";
  const label = x => V27_O(x[0], x[1]);
  const k = age <= 6 ? 1 : age === 7 ? pick([1, 2]) : pick([2, 3]);
  const cmds = acts.slice(0, k);
  let withPS = -1;
  if (k === 1) withPS = Math.random() < 0.55 ? 0 : -1; else withPS = Math.random() < 0.8 ? R(0, k - 1) : -1;
  const spoken = cmds.map((c, i) => `${i === withPS ? "Pip says, tap the " : "Tap the "}${c[1]}.`).join(" ");
  const shownOpts = acts.slice(0, 3);
  const opts = shuffle(shownOpts.map(label)).concat([NONE]);
  const ans = withPS >= 0 ? label(cmds[withPS]) : NONE;
  const why = withPS >= 0 ? `Only “Pip says, tap the ${cmds[withPS][1]}” had the magic words “Pip says.”` : `Pip never said the magic words “Pip says,” so you don't tap anything.`;
  const whyNot = {};
  shownOpts.forEach((x) => {
    const lb = label(x); if (lb === ans) return;
    const ci = cmds.indexOf(x);
    whyNot[lb] = ci >= 0 ? `Pip said “Tap the ${x[1]}” without the magic words “Pip says.”` : `Pip didn't say anything about the ${x[1]}.`;
  });
  if (ans !== NONE) whyNot[NONE] = `Pip did say “Pip says, tap the ${cmds[withPS][1]}.” Listen for the magic words.`;
  return V27_q(age, {
    q: `👂 Pip says game! ${spoken} <b>What should you tap?</b>`, say: `Pip says game! Only do it if I say, Pip says. Ready? ${spoken} What should you tap?`, listen: 1,
    vis: `<div class="v27-ear">👂</div>`, opts, ans, why, whyNot, key: `v27P${spoken}`, v27: { f: "says" },
  });
}

/* C. color trap: say the COLOR of the letters, not the word (and, for older kids, sometimes the word) */
const V27_COL = [["red", "#E03131"], ["blue", "#1C64D8"], ["green", "#1E9E50"], ["purple", "#8E44AD"], ["orange", "#E8690B"]];
function V27_color(age) {
  const cs = shuffle(V27_COL.slice()), word = cs[0], ink = cs[1];
  const askWord = age >= 8 && Math.random() < 0.35;
  const dot = c => `<span class="v27-dot" style="background:${c[1]}"></span> ${cap(c[0])}`;
  const opts = shuffle([word, ink, cs[2], cs[3]]).map(dot), ans = dot(askWord ? word : ink);
  const big = `<div class="v27-stroop" style="color:${ink[1]}">${word[0].toUpperCase()}</div>`;
  const q = askWord ? `Look at the big word. What does the word <b>SAY</b>? (Don't look at the color!)` : `Look at the big word. What <b>COLOR</b> are the letters? (Don't read the word!)`;
  const say = askWord ? "Look at the big word. Careful! This time, what does the word say? Don't look at the color." : "Look at the big word. What color are the letters? Don't read the word. Look at the color!";
  const whyNot = {};
  if (askWord) { whyNot[dot(ink)] = `That's the color of the letters. This time the question asks what the word says.`; }
  else { whyNot[dot(word)] = `That's what the word says. The letters are colored ${ink[0]}.`; }
  [cs[2], cs[3]].forEach(c => { whyNot[dot(c)] = askWord ? `The word doesn't say ${c[0]}. It says ${word[0]}.` : `The letters are ${ink[0]}, not ${c[0]}.`; });
  const why = askWord ? `The word says ${word[0].toUpperCase()}, even though the letters are ${ink[0]}.` : `The letters are colored ${ink[0]}. The word says ${word[0]}, but that's a trick!`;
  return V27_q(age, { q, say, vis: big, opts, ans, why, whyNot, key: `v27C${askWord ? "w" : "c"}${word[0]}${ink[0]}`, v27: { f: "color" } });
}

/* D. opposite game */
const V27_OPP = [["⬆️", "up", "⬇️", "down"], ["⬅️", "left", "➡️", "right"], ["☀️", "day", "🌙", "night"], ["🔥", "hot", "🧊", "cold"], ["😀", "happy", "😢", "sad"], ["🐢", "slow", "🚀", "fast"]];
function V27_opposite(age) {
  const p = pick(V27_OPP), flip = Math.random() < 0.5, show = flip ? [p[2], p[3]] : [p[0], p[1]], opp = flip ? [p[0], p[1]] : [p[2], p[3]];
  const same = age >= 8 && Math.random() < 0.3;
  const others = shuffle(V27_OPP.filter(x => x !== p)).slice(0, 2).map(x => Math.random() < 0.5 ? [x[0], x[1]] : [x[2], x[3]]);
  const label = x => V27_O(x[0], x[1]);
  const tgt = same ? show : opp;
  const opts = shuffle([show, opp, ...others]).map(label), ans = label(tgt);
  const whyNot = {};
  if (same) whyNot[label(opp)] = `That's the opposite. This time Pip asked for the SAME one.`;
  else whyNot[label(show)] = `That's the same as Pip's picture. The opposite of ${show[1]} is ${opp[1]}.`;
  others.forEach(x => { whyNot[label(x)] = same ? `Pip's picture is ${show[1]}, not ${x[1]}.` : `${cap(x[1])} isn't the opposite of ${show[1]}. The opposite is ${opp[1]}.`; });
  const q = same ? `Careful! Tap the one that means the <b>SAME</b> as Pip's picture.` : `Opposite game! Tap the <b>OPPOSITE</b> of Pip's picture.`;
  const say = same ? `Careful, this one is tricky! Tap the one that means the same as Pip's picture: ${show[1]}.` : `Opposite game! Pip shows ${show[1]}. Tap the opposite!`;
  const why = same ? `Pip's picture shows ${show[1]}, so the same one is ${show[1]}.` : `Pip's picture shows ${show[1]}. The opposite of ${show[1]} is ${opp[1]}.`;
  return V27_q(age, { q, say, vis: `<div class="v27-show">${V27_E(show[0], show[1])}</div>`, opts, ans, why, whyNot, key: `v27O${same ? "s" : "o"}${show[1]}`, v27: { f: "opp" } });
}

/* E1. read every word: NOT / IS in a group */
const V27_GROUPS = {
  fruit: [["🍎", "apple"], ["🍌", "banana"], ["🍇", "grapes"], ["🍓", "strawberry"], ["🍐", "pear"], ["🍒", "cherries"], ["🍉", "watermelon"], ["🍊", "orange"]],
  animal: [["🐱", "cat"], ["🐶", "dog"], ["🐄", "cow"], ["🐴", "horse"], ["🐷", "pig"], ["🦁", "lion"], ["🐸", "frog"], ["🦆", "duck"]],
  vehicle: [["🚗", "car"], ["🚌", "bus"], ["🚲", "bike"], ["🚆", "train"], ["✈️", "airplane"], ["⛵", "sailboat"], ["🚚", "truck"]],
  clothes: [["🧢", "cap"], ["👟", "sneaker"], ["🧦", "socks"], ["👕", "T-shirt"], ["🧤", "gloves"], ["👖", "jeans"], ["🧣", "scarf"]],
};
const V27_GNAME = { fruit: ["a fruit", "fruits"], animal: ["an animal", "animals"], vehicle: ["something you ride in", "things you ride in"], clothes: ["something you wear", "things you wear"] };
function V27_notGroup(age) {
  const keys = Object.keys(V27_GROUPS), g = pick(keys), h = pick(keys.filter(k => k !== g));
  const isAsk = Math.random() < 0.35;
  const label = x => V27_O(x[0], x[1]);
  let opts, ans, q, why; const whyNot = {};
  if (!isAsk) {
    const three = shuffle(V27_GROUPS[g].slice()).slice(0, 3), odd = pick(V27_GROUPS[h]);
    opts = shuffle([...three, odd]).map(label); ans = label(odd);
    q = `Which one is <b>NOT</b> ${V27_GNAME[g][0]}?`; why = `${cap(V27_list(three.map(x => x[1])))} are all ${V27_GNAME[g][1]}. ${cap(V27_an(odd[1]))} is not.`;
    if (odd[1] === "socks" || odd[1] === "jeans" || odd[1] === "gloves" || odd[1] === "cherries" || odd[1] === "grapes") why = `${cap(V27_list(three.map(x => x[1])))} are all ${V27_GNAME[g][1]}. The ${odd[1]} are not.`;
    three.forEach(x => { whyNot[label(x)] = `The ${x[1]} IS ${V27_GNAME[g][0]}. The question says NOT.`; });
  } else {
    const one = pick(V27_GROUPS[g]), three = shuffle(V27_GROUPS[h].slice()).slice(0, 3);
    opts = shuffle([one, ...three]).map(label); ans = label(one);
    q = `Which one <b>IS</b> ${V27_GNAME[g][0]}?`; why = `The ${one[1]} is ${V27_GNAME[g][0]}. The others are ${V27_GNAME[h][1]}.`;
    three.forEach(x => { whyNot[label(x)] = `The ${x[1]} is not ${V27_GNAME[g][0]}. Read every word!`; });
  }
  return V27_q(age, { q, say: q.replace(/<[^>]+>/g, ""), vis: `<div class="v27-show sm">🧐</div>`, opts, ans, why, whyNot, key: `v27G${q}${ans}`, v27: { f: "group" } });
}

/* E2. count ONLY one kind */
function V27_countOnly(age) {
  const kinds = shuffle([["🐶", "dog"], ["🐱", "cat"], ["🐰", "bunny"], ["🐥", "chick"], ["⭐", "star"], ["🍎", "apple"], ["⚽", "ball"]]);
  const nk = age <= 7 ? 2 : 3, total = age <= 6 ? R(5, 8) : age === 7 ? R(7, 10) : age === 8 ? R(9, 12) : R(11, 14);
  const use = kinds.slice(0, nk), tgt = use[0];
  const nT = R(2, Math.min(total - nk + 1, age <= 6 ? 5 : 8));
  const row = [...Array(nT).fill(tgt)];
  while (row.length < total) row.push(pick(use.slice(1)));
  const line = shuffle(row);
  const ans = String(nT);
  const opts = numU(nT, [total, nT + 1, nT - 1, total - nT], 2, 1);
  const whyNot = {}; opts.forEach(o => { if (o === ans) return; const v = +o; whyNot[o] = v === total ? `${total} counts every picture. Count ONLY the ${tgt[1]}s.` : v === total - nT ? `${v} is how many are NOT ${tgt[1]}s.` : `Count again, slowly: there ${nT === 1 ? "is" : "are"} ${nT} ${tgt[1]}${nT === 1 ? "" : "s"}.`; });
  const q = `Count <b>ONLY</b> the ${tgt[1]}s ${V27_E(tgt[0], tgt[1])}. How many are there?`;
  return V27_q(age, { q, say: `Count only the ${tgt[1]}s. How many are there? Take your time.`, vis: `<div class="v27-row">${line.map(x => V27_E(x[0], x[1])).join("")}</div>`, opts, ans, why: `There ${nT === 1 ? "is" : "are"} ${nT} ${tgt[1]}${nT === 1 ? "" : "s"}. The other pictures don't count.`, whyNot, key: `v27N${line.map(x => x[1][0]).join("")}`, v27: { f: "count" } });
}

/* E3. number traps: NOT bigger, smallest, second biggest */
function V27_numTrap(age) {
  const hi = age <= 6 ? 20 : age === 7 ? 100 : 1000;
  const m = pick(age <= 6 ? ["notbig", "small"] : age === 7 ? ["notbig", "small", "notsmall"] : ["notbig", "second", "notsmall", "small"]);
  let ns, ans, q; const whyNot = {};
  if (m === "notbig" || m === "notsmall") {
    const n = R(Math.round(hi * 0.2), Math.round(hi * 0.8));
    const above = shuffle(range(n + 1, Math.min(hi, n + Math.max(9, Math.round(hi / 5))))).slice(0, 3), below = shuffle(range(Math.max(1, n - Math.max(9, Math.round(hi / 5))), n - 1)).slice(0, 3);
    if (m === "notbig") { ns = [...above, pick(below)]; ans = ns[3]; q = `Which number is <b>NOT</b> bigger than ${n}?`; above.forEach(a => { whyNot[String(a)] = `${a} IS bigger than ${n}. Look for the one that is not.`; }); }
    else { ns = [...below, pick(above)]; ans = ns[3]; q = `Which number is <b>NOT</b> smaller than ${n}?`; below.forEach(a => { whyNot[String(a)] = `${a} IS smaller than ${n}. Look for the one that is not.`; }); }
  } else {
    ns = shuffle(range(age <= 6 ? 1 : 10, hi)).slice(0, 4); const s = ns.slice().sort((a, b) => a - b);
    if (m === "small") { ans = s[0]; q = `Which number is the <b>SMALLEST</b>?`; s.slice(1).forEach(a => { whyNot[String(a)] = `${a} is bigger than ${s[0]}. Find the smallest.`; }); whyNot[String(s[3])] = `${s[3]} is the biggest, but the question asks for the smallest.`; }
    else { ans = s[2]; q = `Which number is the <b>SECOND</b> biggest?`; whyNot[String(s[3])] = `${s[3]} is the biggest. The question asks for the SECOND biggest.`; [s[0], s[1]].forEach(a => { whyNot[String(a)] = `${a} is smaller than ${s[2]}, so it isn't second biggest.`; }); }
  }
  const opts = shuffle(ns.map(String));
  const why = m === "notbig" ? `${ans} is not bigger: it is smaller. The others are all bigger.` : m === "notsmall" ? `${ans} is not smaller: it is bigger. The others are all smaller.` : m === "small" ? `${ans} is the smallest of ${V27_list(ns.slice().sort((a, b) => a - b).map(String))}.` : `In order: ${ns.slice().sort((a, b) => b - a).join(", ")}. The second biggest is ${ans}.`;
  return V27_q(age, { q, say: q.replace(/<[^>]+>/g, ""), vis: `<div class="v27-show sm">🔢</div>`, opts, ans: String(ans), why, whyNot, key: `v27T${m}${ns}`, v27: { f: "num" } });
}

/* E4. trick stories: read every word (ages 8–9; easy ones at 7) */
function V27_trick(age) {
  const nm = pick(KIDS);
  const T = [
    () => { const a = R(3, 9); return [`${nm} has ${a} apples. ${nm} gives away 0 apples. How many apples does ${nm} have now?`, a, [[a - 1, `Giving away 0 means nothing changed.`], [0, `0 is how many were given away, not how many are left.`], [a + 1, `Nothing was added. ${nm} still has ${a}.`]], `Giving away 0 apples changes nothing, so ${nm} still has ${a}.`]; },
    () => { const a = R(4, 9), b = R(2, 5); return [`${nm} has ${a} pencils. ${nm} buys ${b} erasers. How many PENCILS does ${nm} have?`, a, [[a + b, `${a} + ${b} adds the erasers too. Erasers aren't pencils.`], [b, `${b} is the number of erasers.`], [a - b, `Nothing was taken away.`]], `The new things are erasers, not pencils, so ${nm} still has ${a} pencils.`]; },
    () => { const a = R(5, 9), b = R(2, a - 2); return [`There are ${a} birds on a fence. ${b} more birds land on a tree. How many birds are on the FENCE?`, a, [[a + b, `The ${b} birds landed on the tree, not the fence.`], [b, `${b} birds are on the tree.`], [a - b, `No birds left the fence.`]], `The new birds went to the tree, so the fence still has ${a}.`]; },
    () => { const a = R(6, 12), b = R(2, 4); return [`A farmer has ${a} sheep. All but ${b} run away. How many sheep are left?`, b, [[a - b, `${a} − ${b} is how many ran away. “All but ${b}” means ${b} stay.`], [a, `Some sheep ran away, so it's not ${a}.`], [a + b, `Sheep ran away; none were added.`]], `“All but ${b} run away” means ${b} sheep did NOT run away, so ${b} are left.`]; },
    () => { const a = R(3, 6); return [`${nm} has ${a} red balloons and ${a} blue balloons. How many GREEN balloons does ${nm} have?`, 0, [[a * 2, `${a} + ${a} counts red and blue. There are no green ones.`], [a, `${a} is the red ones (or the blue ones).`], [1, `No green balloons were named at all.`]], `${nm} has red and blue balloons only, so there are 0 green balloons.`]; },
    () => { const a = R(2, 5); return [`A spider has 8 legs. ${nm} has ${a} spiders in a picture book and 1 cat. How many CATS are in the book?`, 1, [[a, `${a} is the number of spiders.`], [8, `8 is how many legs one spider has.`], [a + 1, `That counts the spiders too.`]], `The question asks only about cats. There is 1 cat.`]; },
  ];
  const fns = age <= 7 ? T.slice(0, 3) : T;
  const [q, ans, wrongs, why] = pick(fns)();
  const whyNot = {}, cand = [];
  wrongs.forEach(([v, r]) => { if (v >= 0 && v !== ans && !cand.includes(v)) { cand.push(v); whyNot[String(v)] = r; } });
  let fill = ans + 2; while (cand.length < 3) { if (fill !== ans && !cand.includes(fill)) { cand.push(fill); whyNot[String(fill)] = `Read every word, then count again.`; } fill++; }
  const opts = shuffle([ans, ...cand.slice(0, 3)].map(String));
  return V27_q(age, { q: q.replace(/\b([A-Z]{3,})\b/g, "<b>$1</b>"), say: q.replace(/\b([A-Z]{3,})\b/g, w => w.toLowerCase()), vis: `<div class="v27-show sm">🕵️</div>`, opts, ans: String(ans), why, whyNot, key: `v27K${q}`, v27: { f: "trick" } });
}

/* F. listen to a short story, then answer one question */
const V27_PLACES = ["the park", "the beach", "the library", "the zoo", "the farm", "the pool", "the museum"];
/* things that make sense at each place: [thing, past-tense verb] */
const V27_PT = {
  "the park": [["kite", "flew"], ["ball", "kicked"], ["wagon", "pulled"]], "the beach": [["bucket", "filled"], ["kite", "flew"], ["blanket", "sat on"]],
  "the library": [["book", "read"], ["bookmark", "made"]], "the zoo": [["map", "followed"], ["wagon", "pulled"]], "the farm": [["bucket", "filled"], ["wagon", "pulled"]],
  "the pool": [["ball", "tossed"], ["towel", "sat on"]], "the museum": [["map", "followed"], ["sticker", "got"]],
};
const V27_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const V27_PEOPLE = ["Grandma", "Grandpa", "Mom", "Dad", "Aunt Rosa", "Uncle Ben"];
const V27_COLW = ["red", "blue", "green", "yellow", "purple", "orange"];
const V27_FOODS = ["sandwiches", "apples", "popcorn", "pretzels", "grapes", "muffins"];
function V27_story(age) {
  const nm = pick(KIDS), pl = pick(V27_PLACES), dy = pick(V27_DAYS), who = pick(V27_PEOPLE), th = pick(V27_PT[pl]), col = pick(V27_COLW), fd = pick(V27_FOODS);
  const long = age >= 8;
  const text = long
    ? `On ${dy}, ${nm} went to ${pl} with ${who}. First, they ate ${fd}. Then ${nm} ${th[1]} ${V27_an(col)} ${th[0]}. At the end, they waved goodbye and walked home.`
    : `On ${dy}, ${nm} went to ${pl} with ${who}. ${nm} ${th[1]} ${V27_an(col)} ${th[0]}.`;
  const asks = long ? ["who", "where", "when", "color", "food", "first"] : ["who", "where", "when", "color"];
  const a = pick(asks);
  let q, ans, pool, why;
  if (a === "who") { q = `Who went with ${nm}?`; ans = who; pool = V27_PEOPLE; why = `The story says ${nm} went with ${who}.`; }
  else if (a === "where") { q = `Where did ${nm} go?`; ans = pl; pool = V27_PLACES; why = `The story says ${nm} went to ${pl}.`; }
  else if (a === "when") { q = `On which day did ${nm} go?`; ans = dy; pool = V27_DAYS; why = `The story starts with “On ${dy}.”`; }
  else if (a === "color") { q = `What color was the ${th[0]}?`; ans = col; pool = V27_COLW; why = `The story says it was ${V27_an(col)} ${th[0]}.`; }
  else if (a === "food") { q = `What did they eat?`; ans = fd; pool = V27_FOODS; why = `The story says they ate ${fd}.`; }
  else { q = `What did they do FIRST?`; ans = `ate ${fd}`; pool = null; why = `The story says “First, they ate ${fd}.”`; }
  let opts;
  if (pool) opts = shuffle([ans, ...shuffle(pool.filter(x => x !== ans)).slice(0, 3)]);
  else opts = shuffle([ans, `${th[1]} the ${th[0]}`, "waved goodbye", "walked home"]);
  const whyNot = {};
  opts.forEach(o => { if (o === ans) return; whyNot[o] = a === "first" ? `That happened later in the story. First, they ate ${fd}.` : `The story didn't say ${o}. Listen again: it said ${ans}.`; });
  const optsC = opts.map(o => cap(o));
  const capMap = {}; opts.forEach((o, i) => { capMap[optsC[i]] = whyNot[o]; });
  const qq = q.replace(/\bFIRST\b/, "<b>FIRST</b>");
  return V27_q(age, {
    q: `👂 ${text} <b>${qq.replace(/<\/?b>/g, "")}</b>`, say: `Listen to the story. ${text} Now listen to the question. ${q.replace("FIRST", "first")}`, listen: 1,
    vis: `<div class="v27-ear">👂📖</div>`, opts: optsC, ans: cap(ans), why, whyNot: capMap, key: `v27S${text}|${a}`, v27: { f: "story" }, big: 0,
  });
}

/* G. if-then directions (listen at 7+) */
const V27_FACTS = [["a fish can swim", 1], ["a cat can fly", 0], ["snow is cold", 1], ["ice is hot", 0], ["a car has wheels", 1], ["a pig can talk", 0], ["a bird has feathers", 1], ["a dog says moo", 0], ["10 is more than 3", 1], ["2 is more than 5", 0], ["the sun is hot", 1], ["a frog is a kind of fruit", 0]];
function V27_ifThen(age) {
  const tg = shuffle([["⭐", "star"], ["🌙", "moon"], ["❤️", "heart"], ["🔷", "diamond"]]);
  const label = x => V27_O(x[0], x[1]);
  let spoken, ans, why; const whyNot = {};
  if (age <= 7) {
    const f = pick(V27_FACTS);
    spoken = `If ${f[0]}, tap the ${tg[0][1]}. If not, tap the ${tg[1][1]}.`;
    const right = f[1] ? tg[0] : tg[1], wrong = f[1] ? tg[1] : tg[0];
    ans = label(right); why = `It is ${f[1] ? "true" : "not true"} that ${f[0]}, so you tap the ${right[1]}.`;
    whyNot[label(wrong)] = f[1] ? `That's for when it is not true. But it IS true that ${f[0]}.` : `That's for when it is true. But it is NOT true that ${f[0]}.`;
    tg.slice(2).forEach(x => { whyNot[label(x)] = `Pip never said to tap the ${x[1]}.`; });
  } else {
    const f1 = pick(V27_FACTS), f2 = pick(V27_FACTS.filter(x => x !== f1)), both = f1[1] && f2[1];
    spoken = `If ${f1[0]} AND ${f2[0]}, tap the ${tg[0][1]}. If not, tap the ${tg[1][1]}.`;
    const right = both ? tg[0] : tg[1], wrong = both ? tg[1] : tg[0];
    ans = label(right);
    const bad = !f1[1] ? f1[0] : !f2[1] ? f2[0] : null;
    why = both ? `Both are true: ${f1[0]}, and ${f2[0]}. So you tap the ${right[1]}.` : `“AND” needs both to be true, but it is not true that ${bad}. So you tap the ${right[1]}.`;
    whyNot[label(wrong)] = both ? `Both parts are true, so it's the ${right[1]}.` : `Not both parts are true: it is not true that ${bad}.`;
    tg.slice(2).forEach(x => { whyNot[label(x)] = `Pip never said to tap the ${x[1]}.`; });
  }
  const listen = age >= 7;
  return V27_q(age, {
    q: `${listen ? "👂 " : ""}${spoken.replace(/\bAND\b/, "<b>AND</b>")} <b>What do you tap?</b>`, say: `Listen carefully. ${spoken.replace("AND", "and")} What do you tap?`, listen: listen ? 1 : 0,
    vis: listen ? `<div class="v27-ear">👂</div>` : `<div class="v27-show sm">🤔</div>`, opts: shuffle(tg.map(label)), ans, why, whyNot, key: `v27I${spoken}`, v27: { f: "ifthen" },
  });
}

/* H. Stop, Think, Do: what to do when you want to rush */
const V27_STRAT = {
  6: [
    ["Pip is still reading the answers, but you want to tap one now.", "Wait and listen to every answer.", ["Tap the first one fast.", "Tap all of them.", "Cover your ears."], "Listening to every answer helps you pick the right one.", "👂", ["The first one might not be right.", "Tapping everything isn't choosing.", "Then you can't hear Pip."]],
    ["The light is red, but you know the answer.", "Wait for the green light, then tap.", ["Tap again and again.", "Shout the answer.", "Skip the question."], "Waiting for green is good patience practice.", "🚦", ["Tapping on red doesn't count.", "Shouting doesn't answer.", "You know it, so wait and answer!"]],
    ["You don't understand the question.", "Ask Pip to read it again.", ["Guess fast.", "Cry and give up.", "Tap any answer."], "Hearing it again helps you understand.", "🔊", ["Fast guesses are often wrong.", "You can figure it out with help.", "Any answer is just a guess."]],
    ["You got a question wrong.", "Take a deep breath and listen to Pip explain.", ["Bang the table.", "Say “This is dumb.”", "Close the game."], "Mistakes help your brain grow when you listen.", "🌬️", ["That doesn't help you learn.", "It's not dumb; it's learning.", "Then you miss the fun of learning."]],
    ["A friend is telling you a story.", "Look at your friend and listen to the end.", ["Start talking about your story.", "Walk away.", "Play with a toy."], "Good listeners wait until the story is done.", "🧒", ["Wait for your turn to talk.", "That's not listening.", "Toys can wait."]],
    ["You want to finish your puzzle fast.", "Look carefully at each piece.", ["Push pieces in hard.", "Throw the hard pieces away.", "Quit."], "Slow and careful finishes the puzzle.", "🧩", ["Pushing can bend them.", "You need every piece.", "Keep trying slowly."]],
    ["Your teacher is giving directions.", "Stop, look at the teacher and listen.", ["Start before she finishes.", "Talk to a friend.", "Draw on your desk."], "Listening first helps you do it right.", "👩‍🏫", ["You might miss a step.", "Then you can't hear.", "That's not listening."]],
    ["You feel wiggly and can't wait.", "Take 3 slow breaths and count to 5.", ["Run around the room.", "Yell “Hurry!”", "Push to the front."], "Slow breaths help your body wait.", "🌬️", ["Running makes it harder to wait.", "Yelling doesn't make it faster.", "Pushing isn't fair."]],
  ],
  7: [
    ["A question looks easy, so you want to tap right away.", "Read every word first. Look for NOT or ONLY.", ["Tap the first answer you see.", "Pick the longest answer.", "Ask a friend to tap."], "Little words like NOT can change the answer.", "🧐", ["The first one might be a trick.", "Long doesn't mean right.", "You can do it yourself."]],
    ["You're stuck on a hard question.", "Stop, think, and try one step at a time.", ["Tap random answers until one works.", "Give up.", "Say “I can't.”"], "Small steps help solve hard problems.", "🪜", ["Random taps don't teach you anything.", "You can solve it with steps.", "Try “I can't YET.”"]],
    ["Your little brother is slow putting his shoes on.", "Wait kindly or offer to help.", ["Yell “Hurry up!”", "Leave without him.", "Pull his shoes on hard."], "Patience and help make things go better.", "👟", ["Yelling makes people upset.", "That's not kind or safe.", "That could hurt him."]],
    ["Your teacher says, “When I say go, get your markers.”", "Wait for “go,” then get the markers.", ["Get them now.", "Get scissors instead.", "Ask what she said 5 times."], "Waiting for the signal is good listening.", "🖍️", ["She said to wait for “go.”", "She said markers.", "Listen the first time."]],
    ["Two friends are talking and you want to say something.", "Wait for a pause, then say “Excuse me.”", ["Talk louder than them.", "Tap them again and again.", "Walk away mad."], "Waiting for a pause is patient and polite.", "💬", ["That interrupts them.", "That's not patient.", "They'll listen when they pause."]],
    ["Your cookies are baking and they smell good.", "Wait for the timer and let them cool.", ["Open the oven every minute.", "Eat them hot right away.", "Turn the oven way up."], "Some good things take time.", "🍪", ["The heat gets out.", "They could burn your mouth.", "That could burn them."]],
    ["You finish your work before everyone else.", "Check your work again carefully.", ["Talk to people still working.", "Hand it in without looking.", "Make noise."], "Checking catches mistakes.", "✅", ["That bothers them.", "You might miss a mistake.", "Others need quiet."]],
    ["You hear only part of the directions.", "Ask, “Can you say that again, please?”", ["Guess what to do.", "Copy a friend.", "Do nothing."], "Asking again is smart when you missed something.", "🙋", ["Guessing can go wrong.", "Your friend might be wrong too.", "Then nothing gets done."]],
  ],
  8: [
    ["You see an answer that looks right, but there are 3 more choices.", "Read all the choices before you pick.", ["Pick it right away.", "Skip the others.", "Pick the one in the middle."], "A better answer might be hiding below.", "🔍", ["Another choice might be better.", "You might miss the best one.", "Where it is doesn't matter."]],
    ["A word problem has lots of numbers.", "Read it twice and find what the question asks.", ["Add all the numbers.", "Use the biggest number.", "Write any answer."], "Not every number is needed. Find the real question.", "📝", ["Some numbers may not belong.", "Big isn't always right.", "Think first."]],
    ["You're waiting in a long line for a ride.", "Talk with your family or play a quiet game while you wait.", ["Sneak to the front.", "Complain the whole time.", "Push the people in front."], "Fun ideas make waiting easier.", "🎢", ["That isn't fair.", "That makes it feel longer.", "Pushing is unsafe."]],
    ["You feel frustrated by a tricky puzzle.", "Take a break, breathe, then try again.", ["Rip it up.", "Say you hate puzzles.", "Make someone else finish it."], "A calm brain thinks better.", "😌", ["Then it's gone.", "Frustration passes.", "You'd miss the win."]],
    ["Your friend is explaining a game's rules.", "Listen to all the rules before you start.", ["Start playing right away.", "Make up your own rules.", "Say “I know, I know.”"], "Knowing the rules makes the game fair and fun.", "🎲", ["You'll break rules you didn't hear.", "That's not their game.", "Let them finish."]],
    ["You're saving money for a toy.", "Save a little each week until you have enough.", ["Spend it on candy now.", "Ask for it every day.", "Give up saving."], "Saving takes patience but you reach your goal.", "🐷", ["Then you won't have enough.", "Nagging won't help.", "Keep going!"]],
    ["A test question uses the word EXCEPT.", "Slow down: find the one that does NOT fit.", ["Pick one that fits.", "Ignore that word.", "Skip it."], "EXCEPT means you look for the one that doesn't fit.", "⚠️", ["EXCEPT flips it.", "Little words matter.", "You can figure it out."]],
    ["You want to answer the teacher's question.", "Raise your hand and wait to be called.", ["Shout it out.", "Wave and say “Me! Me!”", "Answer for a classmate."], "Waiting your turn lets everyone think.", "✋", ["Others need time.", "That's not patient.", "Let them try."]],
  ],
  9: [
    ["You finished a test early.", "Go back and check each answer.", ["Turn it in right away.", "Doodle on it.", "Ask a friend what they got."], "Checking can catch silly mistakes.", "📄", ["You could miss mistakes.", "That doesn't help.", "That's not allowed."]],
    ["Someone gives you directions with 3 steps.", "Repeat the steps in your head, in order.", ["Do just the first step.", "Do them in any order.", "Wait for someone to do it."], "Saying steps to yourself helps you remember.", "🧠", ["You'd miss two steps.", "Order matters.", "It's your job."]],
    ["You want to reply quickly in an argument.", "Pause, breathe, and think about what to say.", ["Say the first mean thing you think.", "Yell louder.", "Walk off slamming the door."], "Pausing helps you say what you really mean.", "🧘", ["Mean words are hard to take back.", "Loud doesn't solve it.", "Talk when calm."]],
    ["A math problem says “How many MORE?”", "Find the difference, not the total.", ["Add the numbers.", "Pick the bigger number.", "Guess."], "“How many more” asks you to compare.", "➖", ["Adding finds the total.", "That's not the difference.", "Think it through."]],
    ["You're learning a new skill and it's slow.", "Practice a little each day and notice progress.", ["Quit after one try.", "Say you're bad at it.", "Only do it when someone pushes you."], "Patient practice builds skill.", "📈", ["Skills take time.", "You're still learning.", "You can push yourself."]],
    ["Your friend is upset and talking a lot.", "Listen without interrupting, then ask how you can help.", ["Change the subject.", "Tell them to calm down.", "Look at your tablet."], "Listening shows you care.", "🤝", ["They need to be heard.", "That can feel dismissive.", "That's not listening."]],
    ["Two answers both look right.", "Reread the question and pick the BEST one.", ["Pick either one.", "Pick neither.", "Pick the shorter one."], "Rereading helps find the best match.", "⚖️", ["One fits better.", "One of them is right.", "Length doesn't matter."]],
    ["A game asks you to wait 3 seconds before tapping.", "Count “1, 2, 3” in your head, then tap.", ["Tap right away.", "Tap many times.", "Close the game."], "Counting helps you wait.", "⏳", ["It won't count.", "That's not waiting.", "You can do it!"]],
  ],
};
function V27_strategy(age) {
  const [sit, best, wrong, why, e, nots] = pick(V27_STRAT[age]);
  const whyNot = {}; wrong.forEach((w, i) => { whyNot[w] = nots[i]; });
  return V27_q(age, {
    q: "What is the <b>best</b> thing to do?", say: `${sit} What is the best thing to do?`, vis: `<span class="emo xxl">${e}</span><div class="passage scene">${sit}</div>`,
    opts: shuffle([best, ...wrong]), ans: best, why, whyNot, key: `v27H${sit}`, big: 0, v27: { f: "strat", xo: "manners" },
  });
}

const V27_MIX = {
  6: [[V27_listenList, 3], [V27_pipSays, 2.5], [V27_color, 2], [V27_opposite, 1.5], [V27_notGroup, 1.5], [V27_countOnly, 1.5], [V27_numTrap, 1], [V27_story, 1], [V27_ifThen, 1], [V27_strategy, 1.5]],
  7: [[V27_listenList, 2.5], [V27_pipSays, 1.5], [V27_color, 1.5], [V27_opposite, 1], [V27_notGroup, 1], [V27_countOnly, 1.5], [V27_numTrap, 1], [V27_trick, 1], [V27_story, 2], [V27_ifThen, 1.5], [V27_strategy, 1.5]],
  8: [[V27_listenList, 2], [V27_pipSays, 1], [V27_color, 1.5], [V27_opposite, 1], [V27_notGroup, 0.5], [V27_countOnly, 1], [V27_numTrap, 1.5], [V27_trick, 2], [V27_story, 2.5], [V27_ifThen, 1.5], [V27_strategy, 1.5]],
  9: [[V27_listenList, 2], [V27_pipSays, 0.5], [V27_color, 1.5], [V27_opposite, 1], [V27_countOnly, 1], [V27_numTrap, 1.5], [V27_trick, 2], [V27_story, 2.5], [V27_ifThen, 2], [V27_strategy, 1.5]],
};
function V27_gen(age) {
  const mix = V27_MIX[age], tot = mix.reduce((s, x) => s + x[1], 0);
  let r = Math.random() * tot;
  for (const [fn, w] of mix) { r -= w; if (r <= 0) return fn(age); }
  return mix[0][0](age);
}
const V27_LESSON = age => [
  L3("🛑 Stop: wait for green", `${age <= 7 ? "In this game, a little traffic light shows up. " : "Each question has a traffic light. "}Red means wait. Green means go. If you wait for green, you win a Patient star!`,
    `<div class="v27-light demo"><i class="r on"></i><i class="y"></i><i class="g"></i></div><div class="sentence big-sentence">🔴 Wait… 🟡 Get ready… 🟢 Go!</div>`),
  L3("👂 Listen: hear every word", "Some questions have no words on the screen. Pip says them out loud, so listen with your whole body: eyes on Pip, body still, ears ready. You can tap the speaker to hear it again.",
    pics(["👀", "Eyes", "look at Pip"], ["🧍", "Body", "stay still"], ["👂", "Ears", "hear every word"], ["🔊", "Again", "tap to hear it again"])),
  L3("🧠 Think: watch for tricky words", "Little words can change the answer. Look for NOT, ONLY, FIRST, and SAME. Read or hear every choice before you tap.",
    `<div class="sentence big-sentence">Which one is <b class="hl">NOT</b> a fruit?</div><div class="sentence big-sentence">Count <b class="hl">ONLY</b> the dogs.</div>`),
];
for (const age of [6, 7, 8, 9]) {
  MANNER_TRICKS[age].stopthink = "Stop: wait for the green light. Listen: hear every word. Think: look for little words like NOT, ONLY and FIRST, and check every choice.";
  topic(age, "manners", {
    id: "stopthink", title: "Stop, Listen & Think", icon: "🚦",
    blurb: age <= 7 ? "Wait for green, listen to Pip, and spot the tricks." : "Patience, careful listening, and tricky-word puzzles.",
    lesson: V27_LESSON(age), gen: () => V27_gen(age),
  });
  const arr = C[age].manners, ti = arr.findIndex(t => t.id === "stopthink");
  if (ti > 0) arr.unshift(arr.splice(ti, 1)[0]);   /* show it first in the list */
}

