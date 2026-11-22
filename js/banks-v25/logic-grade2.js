/* =====================================================================
   v25 · Age 7 · Logical Thinking (tag V25LG7)
   More questions for every age-7 logic topic. Every new question carries q.v25,
   and q.v25.w holds a true reason for each wrong option (also copied to q.whyNot).
   ===================================================================== */
const V25LG7_pl = (n, w, p) => `${n} ${n === 1 ? w : (p || w + "s")}`;
const V25LG7_art = w => (/^[aeiou]/i.test(w) ? "an " : "a ") + w;
const V25LG7_Q = s => `“${s}”`;
const V25LG7_and = a => a.length < 2 ? a.join("") : a.slice(0, -1).join(", ") + " and " + a[a.length - 1];
const V25LG7_emo = (e, n) => `<span class="emo" title="${n}">${e}</span>`;
/* store a reason for every wrong option */
function V25LG7_fin(q, fn, data) {
  const w = {};
  q.opts.forEach(o => { if (o !== q.ans) { const r = fn(o); if (r) w[o] = r; } });
  q.v25 = Object.assign({ w }, data || {});
  q.whyNot = Object.assign({}, w);
  return q;
}
const V25LG7_rule = (q, picked) => (q && q.v25 && q.v25.w && q.v25.w[picked]) || null;

/* =====================================================================
   1 · Odd One Out Pro: rhyming words and new word groups
   ===================================================================== */
const V25LG7_RHY = {
  at: ["cat", "hat", "bat", "mat", "rat", "sat"], ig: ["pig", "wig", "dig", "big", "fig"], un: ["sun", "run", "bun", "fun"],
  op: ["top", "hop", "mop", "pop", "stop"], ake: ["cake", "lake", "bake", "rake", "snake"], ing: ["king", "ring", "sing", "wing", "swing"],
  ell: ["bell", "shell", "well", "smell"], ock: ["sock", "rock", "clock", "block", "lock"], ug: ["bug", "rug", "mug", "hug", "jug"],
  ed: ["bed", "red", "sled", "fed"], ish: ["fish", "dish", "wish"], ail: ["mail", "tail", "snail", "pail", "nail"],
};
const V25LG7_OW = {
  "baby animals": ["puppy", "kitten", "calf", "lamb", "cub", "foal"],
  drinks: ["milk", "juice", "water", "lemonade", "tea"],
  jobs: ["doctor", "teacher", "farmer", "baker", "pilot", "nurse"],
  sports: ["soccer", "tennis", "baseball", "hockey", "golf", "basketball"],
  "rooms in a house": ["kitchen", "bedroom", "bathroom", "attic", "basement", "hallway"],
  "musical instruments": ["drum", "flute", "piano", "violin", "guitar", "trumpet"],
  vegetables: ["carrot", "pea", "corn", "onion", "potato", "celery"],
  birds: ["robin", "owl", "duck", "eagle", "parrot", "crow"],
  "pieces of furniture": ["bed", "chair", "table", "sofa", "desk", "shelf"],
  "parts of a plant": ["root", "stem", "leaf", "petal", "seed"],
};
const V25LG7_OW_BAD = ["vegetables|parts of a plant", "rooms in a house|pieces of furniture", "musical instruments|pieces of furniture", "baby animals|birds"];
const V25LG7_owOk = (a, b) => a !== b && !V25LG7_OW_BAD.includes(a + "|" + b) && !V25LG7_OW_BAD.includes(b + "|" + a);
addBank(7, "logic", "oddword", 0.3, function () {
  if (Math.random() < 0.5) {
    const fams = Object.keys(V25LG7_RHY), [f, g] = shuffle(fams).slice(0, 2), same = shuffle(V25LG7_RHY[f]).slice(0, 3), odd = pick(V25LG7_RHY[g]);
    const q = { q: "Which word does <b>not</b> rhyme with the others?", say: `${same.join(", ")}, ${odd}. Which word does not rhyme with the others?`, opts: shuffle([...same, odd]), ans: odd, big: 1, why: `${cap(V25LG7_and(same))} all end in “${f}”, so they rhyme. ${cap(odd)} does not.`, key: "v25r" + same.slice().sort().join() + odd };
    return V25LG7_fin(q, p => { const o = same.filter(x => x !== p); return `${cap(p)} rhymes with ${o[0]} and ${o[1]}: they all end in “${f}”.`; }, { t: "rhyme" });
  }
  const K = Object.keys(V25LG7_OW); let a, b; do { [a, b] = shuffle(K).slice(0, 2); } while (!V25LG7_owOk(a, b));
  const same = shuffle(V25LG7_OW[a]).slice(0, 3), odd = pick(V25LG7_OW[b]);
  const q = { q: "Which word does <b>not</b> belong?", say: "Which word does not belong?", opts: shuffle([...same, odd]), ans: odd, big: 1, why: `${cap(V25LG7_and(same))} are all ${a}. ${cap(odd)} is not.`, key: "v25c" + same.slice().sort().join() + odd };
  return V25LG7_fin(q, p => { const o = same.filter(x => x !== p); return `${cap(p)} belongs: it is one of the ${a}, like ${o[0]} and ${o[1]}.`; }, { t: "cat" });
});
whyRule(7, "logic", "oddword", V25LG7_rule);

/* =====================================================================
   2 · First, Next, Last: new step stories, "just before" and "which is second?"
   ===================================================================== */
const V25LG7_SEQ = [
  [["🌽", "put corn kernels in a pot"], ["🔥", "heat the pot"], ["🍿", "the kernels pop"], ["😋", "eat the popcorn"]],
  [["🥣", "mix the cookie dough"], ["🔥", "bake the cookies"], ["⏳", "let the cookies cool"], ["🍪", "eat a cookie"]],
  [["🕯️", "light the candles"], ["💨", "blow out the candles"], ["🔪", "cut the cake"], ["🍰", "eat a slice of cake"]],
  [["📄", "get a clean sheet of paper"], ["🖌️", "paint a picture"], ["⏳", "let the paint dry"], ["🖼️", "hang the picture on the wall"]],
  [["🧺", "put dirty clothes in the washer"], ["💦", "the washer cleans the clothes"], ["☀️", "hang the clothes up to dry"], ["👕", "fold the clean clothes"]],
  [["🎫", "buy a train ticket"], ["🚉", "wait at the station"], ["🚆", "ride the train"], ["👋", "get off at your stop"]],
  [["🧃", "pour juice into a mold"], ["❄️", "put it in the freezer"], ["⏳", "wait for it to freeze"], ["😋", "eat the ice pop"]],
  [["🥚", "crack the eggs into a bowl"], ["🥄", "stir the eggs"], ["🍳", "cook the eggs in a pan"], ["🍽️", "put the eggs on a plate"]],
  [["📝", "write a shopping list"], ["🛒", "fill the cart at the store"], ["💵", "pay for the food"], ["🏠", "put the food away at home"]],
  [["🚗", "the car gets muddy"], ["🧽", "scrub the car with soap"], ["💦", "rinse off the soap"], ["✨", "the car is shiny and clean"]],
  [["🥣", "stir the pancake batter"], ["🍳", "pour batter into a hot pan"], ["🥞", "flip the pancake"], ["😋", "eat the pancakes"]],
  [["🎁", "wrap the present"], ["🎀", "tie a bow on top"], ["🎉", "bring it to the party"], ["😃", "your friend opens it"]],
  [["🏖️", "go to the beach"], ["🏰", "build a sand castle"], ["🌊", "a wave knocks it down"]],
  [["🧊", "put an ice cube in the sun"], ["💧", "it melts into water"], ["☀️", "the water dries up"]],
  [["🌧️", "rain falls"], ["⛅", "the sun peeks out"], ["🌈", "a rainbow shows up"]],
  [["🐶", "the dog rolls in mud"], ["🛁", "give the dog a bath"], ["🐕", "the dog is clean again"]],
];
const V25LG7_sOpt = ([e, t]) => `<span class="emo">${e}</span> ${t}`;
const V25LG7_ORD = ["first", "second", "third", "fourth"];
addBank(7, "logic", "sequence", 0.3, function () {
  const si = R(0, V25LG7_SEQ.length - 1), S = V25LG7_SEQ[si], n = S.length, order = `The order is: ${S.map(s => s[1]).join(", then ")}.`;
  const ordOf = j => j === n - 1 ? "last" : V25LG7_ORD[j];
  if (Math.random() < 0.5) {
    const i = R(1, n - 1), cand = S.filter((_, j) => j !== i);
    let extra = null; if (cand.length < 3) { const o = pick(V25LG7_SEQ.filter(x => x !== S)); extra = pick(o); cand.push(extra); }
    const q = { q: `What happens just <b>before</b>: ${V25LG7_sOpt(S[i])}?`, say: `What happens just before this: ${S[i][1]}?`, opts: shuffle(cand).map(V25LG7_sOpt), ans: V25LG7_sOpt(S[i - 1]), sayAns: S[i - 1][1], why: `Just before ${V25LG7_Q(S[i][1])} comes ${V25LG7_Q(S[i - 1][1])}. ${order}`, key: "v25b" + si + "-" + i + (extra ? extra[1] : "") };
    return V25LG7_fin(q, o => {
      const t = xPlain(o), j = S.findIndex(s => s[1] === t);
      if (j < 0) return `${V25LG7_Q(cap(t))} is not one of these steps.`;
      if (j > i) return `${V25LG7_Q(cap(t))} happens after ${V25LG7_Q(S[i][1])}, not before it.`;
      return `${V25LG7_Q(cap(t))} happens earlier. ${V25LG7_Q(cap(S[i - 1][1]))} comes right before ${V25LG7_Q(S[i][1])}.`;
    }, { t: "before", si, i });
  }
  const i = R(0, n - 1), word = ordOf(i);
  const q = { q: `Think of the steps in order. Which step comes <b>${word}</b>?`, say: `Think of the steps in order. Which step comes ${word}?`, vis: `<div class="chips">${shuffle(S).map(s => `<span class="emo xl">${s[0]}</span>`).join("")}</div>`, opts: shuffle(S).map(V25LG7_sOpt), ans: V25LG7_sOpt(S[i]), sayAns: S[i][1], why: order, key: "v25o" + si + "-" + i };
  return V25LG7_fin(q, o => { const t = xPlain(o), j = S.findIndex(s => s[1] === t); return j < 0 ? null : `${V25LG7_Q(cap(t))} comes ${ordOf(j)}, not ${word}.`; }, { t: "ord", si, i });
});
whyRule(7, "logic", "sequence", V25LG7_rule);

/* =====================================================================
   3 · Goes With: new kinds of links
   ===================================================================== */
// each pair: [a, b, sentence]
const V25LG7_PAN = [
  [["teacher", "school", "A teacher works at a school"], ["doctor", "hospital", "A doctor works at a hospital"], ["farmer", "farm", "A farmer works on a farm"], ["baker", "bakery", "A baker works at a bakery"], ["firefighter", "fire station", "A firefighter works at a fire station"], ["librarian", "library", "A librarian works at a library"], ["zookeeper", "zoo", "A zookeeper works at a zoo"]],
  [["petal", "flower", "A petal is part of a flower"], ["page", "book", "A page is part of a book"], ["feather", "bird", "A feather is part of a bird"], ["toe", "foot", "A toe is part of a foot"], ["finger", "hand", "A finger is part of a hand"], ["leaf", "tree", "A leaf is part of a tree"], ["wheel", "car", "A wheel is part of a car"]],
  [["ice", "water", "Ice is made from water"], ["cheese", "milk", "Cheese is made from milk"], ["paper", "wood", "Paper is made from wood"], ["fries", "potatoes", "Fries are made from potatoes"], ["popcorn", "corn", "Popcorn is made from corn"], ["sweater", "yarn", "A sweater is made from yarn"], ["orange juice", "oranges", "Orange juice is made from oranges"]],
  [["bird", "feathers", "A bird is covered in feathers"], ["fish", "scales", "A fish is covered in scales"], ["sheep", "wool", "A sheep is covered in wool"], ["hedgehog", "spines", "A hedgehog is covered in spines"]],
  [["bike", "2 wheels", "A bike has 2 wheels"], ["tricycle", "3 wheels", "A tricycle has 3 wheels"], ["car", "4 wheels", "A car has 4 wheels"], ["unicycle", "1 wheel", "A unicycle has 1 wheel"]],
];
addBank(7, "logic", "panalogy", 0.3, function () {
  const gi = R(0, V25LG7_PAN.length - 1), G = V25LG7_PAN[gi], [p, c] = shuffle(G).slice(0, 2);
  const others = shuffle(G.filter(x => x !== p && x !== c)).slice(0, 2);
  const lc = s => s[0].toLowerCase() + s.slice(1);
  const q = { q: `Which one fits?<div class="analogy"><span>${p[0]}</span><i>→</i><span>${p[1]}</span><b>as</b><span>${c[0]}</span><i>→</i><span class="blank">?</span></div>`, say: `${p[0]} goes with ${p[1]}. So ${c[0]} goes with what?`, opts: shuffle([c[1], p[1], ...others.map(x => x[1])]), ans: c[1], big: 1, why: `${p[2]}, and ${lc(c[2])}.`, key: "v25" + gi + p[0] + "|" + c[0] };
  return V25LG7_fin(q, o => {
    if (o === p[1]) return `${V25LG7_Q(o)} goes with ${p[0]}, not with ${c[0]}.`;
    const x = G.find(x => x[1] === o); return x ? `${x[2]}, so ${V25LG7_Q(o)} goes with ${x[0]}, not ${c[0]}.` : null;
  }, { g: gi });
});
whyRule(7, "logic", "panalogy", V25LG7_rule);

/* =====================================================================
   4 · What's the Same?: new links, plus "which one goes with these three?"
   ===================================================================== */
// rules 0-7 are offered as answers; 8-12 are hidden kinds used only to keep "which one goes with them?" fair
const V25LG7_CR = ["are yellow", "are green", "have tails", "are farm animals", "tell time", "are tools for eating", "are boats", "go on your feet"];
const V25LG7_CN = (i, nm, pl) => {
  const S = "The " + nm;
  return [`${S} ${pl ? "are" : "is"} not yellow`, `${S} ${pl ? "are" : "is"} not green`, `${S} ${pl ? "have no tails" : "has no tail"}`, `${S} ${pl ? "are not farm animals" : "is not a farm animal"}`,
    `${S} can't tell time`, `${S} ${pl ? "are not tools" : "is not a tool"} for eating`, `${S} ${pl ? "are not boats" : "is not a boat"}`, `${S} ${pl ? "do" : "does"} not go on your feet`][i];
};
const V25LG7_CRY = ["is yellow", "is green", "has a tail", "is a farm animal", "tells time", "is a tool for eating", "is a boat", "goes on your feet"];
// emoji: [name, plural, sure rules, maybe rules]   hidden: 8 animal, 9 food, 10 plant, 11 vehicle, 12 made object
const V25LG7_CI = {
  "🍌": ["banana", 0, [0, 9, 10], [1]], "🍋": ["lemon", 0, [0, 9, 10], [1]], "🐥": ["chick", 0, [0, 8], [2, 3]], "🌽": ["corn", 0, [0, 9, 10], [1]], "🚕": ["taxi", 0, [0, 11, 12]], "🌻": ["sunflower", 0, [0, 10], [1]],
  "🥦": ["broccoli", 0, [1, 9, 10]], "🐸": ["frog", 0, [1, 8]], "🥒": ["cucumber", 0, [1, 9, 10]], "🍀": ["clover", 0, [1, 10]], "🌲": ["pine tree", 0, [1, 10]], "🍏": ["green apple", 0, [1, 9, 10], [0]],
  "🐒": ["monkey", 0, [2, 8]], "🐁": ["mouse", 0, [2, 8]], "🐿️": ["squirrel", 0, [2, 8]], "🐈": ["cat", 0, [2, 8], [0]], "🐕": ["dog", 0, [2, 8], [0, 3]], "🦎": ["lizard", 0, [1, 2, 8]],
  "🐄": ["cow", 0, [2, 3, 8]], "🐖": ["pig", 0, [2, 3, 8]], "🐑": ["sheep", 0, [2, 3, 8]], "🐐": ["goat", 0, [2, 3, 8]], "🐎": ["horse", 0, [2, 3, 8]], "🐔": ["hen", 0, [3, 8], [2]],
  "⏰": ["alarm clock", 0, [4, 12], [0, 1]], "⌚": ["watch", 0, [4, 12], [0, 1]], "⏳": ["hourglass", 0, [4, 12], [0, 1]], "🕰️": ["clock", 0, [4, 12], [0, 1]],
  "🍴": ["fork and knife", 1, [5, 12], [0, 1]], "🥄": ["spoon", 0, [5, 12], [0, 1]], "🥢": ["chopsticks", 1, [5, 12], [0, 1]],
  "⛵": ["sailboat", 0, [6, 11, 12], [0, 1]], "🚤": ["speedboat", 0, [6, 11, 12], [0, 1]], "🛶": ["canoe", 0, [6, 11, 12], [0, 1]], "🚢": ["ship", 0, [6, 11, 12], [0, 1]],
  "👟": ["sneaker", 0, [7, 12], [0, 1]], "🧦": ["socks", 1, [7, 12], [0, 1]], "👢": ["boot", 0, [7, 12], [0, 1]], "👞": ["shoe", 0, [7, 12], [0, 1]],
};
const V25LG7_cMay = (e, r) => { const d = V25LG7_CI[e]; return d[2].includes(r) || (d[3] || []).includes(r); };
const V25LG7_cSure = (e, r) => V25LG7_CI[e][2].includes(r);
addBank(7, "logic", "common", 0.3, function () {
  const E = Object.keys(V25LG7_CI), all = range(0, 12);
  if (Math.random() < 0.5) {
    const i = R(0, V25LG7_CR.length - 1), pool = E.filter(e => V25LG7_cSure(e, i));
    const shown = shuffle(pool).slice(0, 3);
    const others = shuffle(range(0, 7).filter(j => j !== i && shown.some(e => !V25LG7_cMay(e, j)))).slice(0, 3);
    const q = { q: "What do these have in common?", say: `${shown.map(e => V25LG7_CI[e][0]).join(", ")}. What do these have in common?`, vis: `<div class="chips">${shown.map(e => `<span class="emo xl">${e}</span>`).join("")}</div>`, opts: shuffle([i, ...others]).map(j => `They ${V25LG7_CR[j]}`), ans: `They ${V25LG7_CR[i]}`, why: `All three ${V25LG7_CR[i]}: the ${V25LG7_and(shown.map(e => V25LG7_CI[e][0]))}.`, key: "v25a" + i + shown.slice().sort().join() };
    return V25LG7_fin(q, o => { const j = V25LG7_CR.indexOf(o.replace(/^They /, "")); const e = shown.find(e => !V25LG7_cMay(e, j)); return e ? `${V25LG7_CN(j, V25LG7_CI[e][0], V25LG7_CI[e][1])}, so not all three ${V25LG7_CR[j]}.` : null; }, { t: "link" });
  }
  // which one goes with these three?
  const i = pick([0, 1, 2, 3, 4, 6, 7]), pool = E.filter(e => V25LG7_cSure(e, i));
  for (let t = 0; t < 40; t++) {
    const s = shuffle(pool), shown = s.slice(0, 3), ansE = s[3]; if (!ansE) return null;
    const shared = all.filter(r => shown.every(e => V25LG7_cMay(e, r)));
    const dis = shuffle(E.filter(e => !shown.includes(e) && e !== ansE && shared.every(r => !V25LG7_cMay(e, r)))).slice(0, 3);
    if (dis.length < 3) continue;
    const nm = e => V25LG7_CI[e][0];
    const q = { q: `These three are alike. Which one goes with them?`, say: `${shown.map(e => nm(e)).join(", ")}. These three are alike. Which one goes with them?`, vis: `<div class="chips">${shown.map(e => `<span class="emo xl">${e}</span>`).join("")}</div>`, opts: shuffle([ansE, ...dis]).map(e => V25LG7_emo(e, nm(e))), ans: V25LG7_emo(ansE, nm(ansE)), sayAns: `the ${nm(ansE)}`, why: `All three ${V25LG7_CR[i]}, and the ${nm(ansE)} ${V25LG7_CI[ansE][1] ? V25LG7_CR[i] : V25LG7_CRY[i]} too.`, key: "v25g" + i + shown.slice().sort().join() + ansE + dis.slice().sort().join() };
    return V25LG7_fin(q, o => { const m = o.match(/title="([^"]+)"/), e = m && E.find(x => V25LG7_CI[x][0] === m[1]); return e ? `${V25LG7_CN(i, nm(e), V25LG7_CI[e][1])}, but the other three ${V25LG7_CR[i].replace(/^(are|have|tell|go) /, (m, v) => v === "are" ? "are all " : "all " + v + " ")}.` : null; }, { t: "goes" });
  }
  return null;
});
whyRule(7, "logic", "common", V25LG7_rule);

/* =====================================================================
   5 · Balance Scales: trading on a level scale, and "which sentence is true?"
   ===================================================================== */
const V25LG7_BIG = [["🍍", "pineapple", "pineapples"], ["🥥", "coconut", "coconuts"], ["🍈", "melon", "melons"], ["🍉", "watermelon", "watermelons"]];
const V25LG7_SMALL = [["🍎", "apple", "apples"], ["🍊", "orange", "oranges"], ["🍋", "lemon", "lemons"], ["🍐", "pear", "pears"], ["🥔", "potato", "potatoes"], ["🥕", "carrot", "carrots"]];
const V25LG7_SAME = [["🎁", "present"], ["📦", "box"], ["🧸", "teddy bear"], ["⚽", "soccer ball"], ["🏀", "basketball"], ["🎒", "backpack"], ["🥥", "coconut"], ["🍍", "pineapple"], ["📚", "stack of books"]];
addBank(7, "logic", "balance", 0.3, function () {
  if (Math.random() < 0.5) {
    const A = pick(V25LG7_BIG), B = pick(V25LG7_SMALL), m = R(2, 4), n = R(2, 3), ans = n * m, rep = Array(n).fill(m).join(" + ") + " = " + ans;
    const vis = col(row(grp(1, A[0]), `<span class="sym">=</span>`, grp(m, B[0])), note(`1 ${A[1]} weighs the same as ${m} ${B[2]}.`));
    const q = { q: `1 ${A[1]} balances ${m} ${B[2]}. How many ${B[2]} balance <b>${n} ${A[2]}</b>?`, say: `1 ${A[1]} balances ${m} ${B[2]}. How many ${B[2]} balance ${n} ${A[2]}?`, vis, opts: numU(ans, shuffle([n + m, m, ans + m, ans - m, ans + 1]), 2, 1), ans: String(ans), big: 1, why: `Each ${A[1]} needs ${m} ${B[2]}, so ${rep}.`, key: "v25t" + A[1] + B[1] + m + n };
    return V25LG7_fin(q, o => {
      const p = +o;
      if (p === n + m) return `${p} is ${n} + ${m}, but each ${A[1]} needs ${m} ${B[2]}: ${rep}.`;
      if (p === m) return `${m} ${B[2]} balance just 1 ${A[1]}, not ${n}.`;
      if (p % m === 0) return `${p} ${B[2]} would balance ${V25LG7_pl(p / m, A[1], A[2])}, not ${n}.`;
      return `${p} ${B[2]} can't be split into groups of ${m}, and ${rep}.`;
    }, { t: "trade", n, m });
  }
  const [X, Y] = shuffle(V25LG7_SAME).slice(0, 2), mode = pick(["left", "right", "none"]), w = Math.random() < 0.5 ? "heavier" : "lighter";
  const sX = `The ${X[1]} is ${w} than the ${Y[1]}.`, sY = `The ${Y[1]} is ${w} than the ${X[1]}.`, sS = `They weigh the same.`;
  const heavy = mode === "left" ? X : mode === "right" ? Y : null, ans = !heavy ? sS : (w === "heavier") === (heavy === X) ? sX : sY;
  const q = { q: "Look at the scale. Which sentence is <b>true</b>?", say: `The ${X[1]} is on the left. The ${Y[1]} is on the right. Which sentence is true?`, vis: seesaw(X[0], Y[0], mode), opts: [sX, sY, sS], ans, why: !heavy ? "The scale is level, so they weigh the same." : `The ${heavy[1]} side goes down, so the ${heavy[1]} is heavier.`, key: "v25s" + X[1] + Y[1] + mode + w };
  return V25LG7_fin(q, o => {
    if (o === sS) return "The scale tips to one side, so they do not weigh the same.";
    if (!heavy) return `The scale is level, so neither one is ${w}.`;
    const subj = o === sX ? X : Y;
    return subj === heavy ? `The ${subj[1]} side goes down, so the ${subj[1]} is heavier, not lighter.` : `The ${subj[1]} side goes up, so the ${subj[1]} is lighter, not heavier.`;
  }, { t: "true" });
});
whyRule(7, "logic", "balance", V25LG7_rule);

/* =====================================================================
   6 · Robot Paths: fewest moves, counted codes, and where did it start?
   ===================================================================== */
const V25LG7_RB = [["🍎", "apple"], ["⭐", "star"], ["🎈", "balloon"], ["🍌", "banana"], ["🧁", "cupcake"], ["⚽", "soccer ball"], ["🌼", "flower"], ["🍓", "strawberry"], ["🐟", "fish"], ["🍪", "cookie"], ["🔑", "key"], ["🎁", "present"], ["🍩", "donut"], ["🐞", "ladybug"], ["🌙", "moon"]];
const V25LG7_rbName = e => (V25LG7_RB.find(x => x[0] === e) || [])[1] || "picture";
const V25LG7_sq = n => V25LG7_pl(n, "square");
const V25LG7_off = (dr, dc) => { const b = []; if (dr) b.push(`${V25LG7_sq(Math.abs(dr))} ${dr < 0 ? "up" : "down"}`); if (dc) b.push(`${V25LG7_sq(Math.abs(dc))} ${dc < 0 ? "left" : "right"}`); return b.join(" and "); };
const V25LG7_cells = (n, avoid, k) => { const f = []; for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) { const s = i + "," + j; if (!avoid.includes(s)) f.push(s); } return shuffle(f).slice(0, k); };
addBank(7, "logic", "robot", 0.3, function () {
  const n = 4, mode = R(0, 2), items = shuffle(V25LG7_RB).slice(0, 5), o = e => V25LG7_emo(e, V25LG7_rbName(e));
  if (mode === 0) { // fewest moves
    const r = R(0, 3), c = R(0, 3); let tr, tc; do { tr = R(0, 3); tc = R(0, 3); } while (tr === r && tc === c);
    const cells = {}; cells[tr + "," + tc] = items[0][0];
    V25LG7_cells(n, [r + "," + c, tr + "," + tc], 2).forEach((k, i) => cells[k] = items[i + 1][0]);
    const dr = tr - r, dc = tc - c, ans = Math.abs(dr) + Math.abs(dc), nm = items[0][1], desc = V25LG7_off(dr, dc);
    const calc = dr && dc ? `${Math.abs(dr)} + ${Math.abs(dc)} = ${ans} moves` : V25LG7_pl(ans, "move");
    const q = { q: `What is the <b>fewest</b> number of moves the robot needs to reach the <span class="emo">${items[0][0]}</span>?`, say: `What is the fewest number of moves the robot needs to reach the ${nm}?`, vis: board(n, cells, [r, c]) + note("One move = one square up, down, left or right."), opts: numU(ans, shuffle([Math.abs(dr), Math.abs(dc), ans + 1, ans - 1, ans + 2]), 2, 1), ans: String(ans), big: 1, why: `The ${nm} is ${desc} from the robot, so it takes ${calc}.`, extra: 10, key: "v25f" + r + c + tr + tc };
    return V25LG7_fin(q, x => { const p = +x; return p < ans ? `${p} is too few. The ${nm} is ${desc}, so it takes ${calc}.` : `${p} is too many. The ${nm} is ${desc}, so it takes only ${calc}.`; }, { t: "fewest" });
  }
  // a path made of two straight runs
  const D = shuffle(["up", "down", "left", "right"]), d1 = D[0], d2 = D.slice(1).find(d => DIRS[d][0] !== 0 && DIRS[d1][0] === 0 || DIRS[d][1] !== 0 && DIRS[d1][1] === 0);
  let r, c, k1, k2, e = null;
  for (let t = 0; t < 80 && !e; t++) { r = R(0, 3); c = R(0, 3); k1 = R(1, 3); k2 = R(1, 2); const er = r + DIRS[d1][0] * k1 + DIRS[d2][0] * k2, ec = c + DIRS[d1][1] * k1 + DIRS[d2][1] * k2; if (er >= 0 && er < n && ec >= 0 && ec < n) e = [er, ec]; }
  if (!e) return null;
  const path = [...Array(k1).fill(d1), ...Array(k2).fill(d2)], seen = []; { let pr = r, pc = c; for (const d of path) { pr += DIRS[d][0]; pc += DIRS[d][1]; seen.push(pr + "," + pc); } }
  if (mode === 1) { // counted code
    const cells = {}; cells[e.join()] = items[0][0];
    V25LG7_cells(n, [r + "," + c, e.join()], 3).forEach((k, i) => cells[k] = items[i + 1][0]);
    const nm = items[0][1], code = `Move <b>${k1}</b> ${DIRS[d1][2]} then <b>${k2}</b> ${DIRS[d2][2]}`;
    const q = { q: `The robot follows this code. Where does it stop?<div class="sentence">${code}</div>`, say: `The robot moves ${V25LG7_sq(k1)} ${d1}, then ${V25LG7_sq(k2)} ${d2}. Where does it stop?`, vis: board(n, cells, [r, c]), opts: shuffle(items.slice(0, 4)).map(x => o(x[0])), ans: o(items[0][0]), sayAns: `the ${nm}`, why: `Move ${V25LG7_sq(k1)} ${d1}, then ${V25LG7_sq(k2)} ${d2}. The robot stops on the ${nm}.`, extra: 10, key: "v25c" + r + c + d1 + k1 + d2 + k2 + Object.keys(cells).sort().join("|") };
    return V25LG7_fin(q, x => {
      const em = (x.match(/>([^<]+)<\/span>$/) || [])[1], at = Object.keys(cells).find(k => cells[k] === em); if (!at) return null;
      const nm2 = V25LG7_rbName(em); if (seen.includes(at)) return `The robot goes past the ${nm2}, but it keeps moving and doesn't stop there.`;
      const [pr, pc] = at.split(",").map(Number);
      return `The ${nm2} is ${V25LG7_off(pr - e[0], pc - e[1])} from where the robot stops.`;
    }, { t: "code" });
  }
  // where did it start? (no robot on the board)
  const cells = {}; cells[r + "," + c] = items[0][0]; cells[e.join()] = items[1][0];
  V25LG7_cells(n, [r + "," + c, e.join(), ...seen], 3).forEach((k, i) => cells[k] = items[i + 2][0]);
  const code = path.map(d => DIRS[d][2]).join(" "), endNm = items[1][1];
  const q = { q: `The robot followed these arrows and stopped on the <span class="emo">${items[1][0]}</span>. Which picture did it <b>start</b> on?`, say: `The robot moved ${path.join(", ")}, and stopped on the ${endNm}. Which picture did it start on?`, vis: board(n, cells, null) + `<div class="arrows">${code}</div>`, opts: shuffle([items[0], ...items.slice(2)]).map(x => o(x[0])), ans: o(items[0][0]), sayAns: `the ${items[0][1]}`, why: `Go backward from the ${endNm}: it started on the ${items[0][1]}. Check: ${path.join(", ")} lands on the ${endNm}.`, extra: 10, key: "v25s" + Object.keys(cells).sort().map(k => k + cells[k]).join("|") + path.join() };
  return V25LG7_fin(q, x => {
    const em = (x.match(/>([^<]+)<\/span>$/) || [])[1], at = Object.keys(cells).find(k => cells[k] === em); if (!at) return null;
    let [pr, pc] = at.split(",").map(Number); for (const d of path) { pr += DIRS[d][0]; pc += DIRS[d][1]; }
    const nm2 = V25LG7_rbName(em);
    if (pr < 0 || pc < 0 || pr >= n || pc >= n) return `From the ${nm2}, those arrows would go off the board.`;
    const there = cells[pr + "," + pc];
    return `From the ${nm2}, those arrows end on ${there ? "the " + V25LG7_rbName(there) : "an empty square"}, not the ${endNm}.`;
  }, { t: "start" });
});
whyRule(7, "logic", "robot", V25LG7_rule);

/* =====================================================================
   7 · Turning Arrows: a kid turns to face things around them
   ===================================================================== */
// four things around the kid, clockwise from the top: [front, right, back, left] when facing the top
const V25LG7_SCN = [
  [["🌳", "tree"], ["🏠", "house"], ["🚗", "car"], ["🐶", "dog"]],
  [["🏫", "school"], ["🚌", "bus"], ["🌻", "sunflower"], ["⛲", "fountain"]],
  [["🍕", "pizza"], ["🍰", "cake"], ["🥛", "milk"], ["🍌", "banana"]],
  [["⛵", "sailboat"], ["🦀", "crab"], ["🐚", "shell"], ["☂️", "umbrella"]],
  [["🐮", "cow"], ["🐷", "pig"], ["🐔", "hen"], ["🐴", "horse"]],
  [["🦁", "lion"], ["🐘", "elephant"], ["🦒", "giraffe"], ["🐒", "monkey"]],
  [["🧸", "teddy bear"], ["⚽", "soccer ball"], ["🎈", "balloon"], ["🚂", "toy train"]],
];
const V25LG7_TN = [[1, "a quarter turn to the right"], [-1, "a quarter turn to the left"], [2, "a half turn"], [4, "a full turn"]];
const V25LG7_tName = d => ({ 0: "no turn at all", 1: "a quarter turn to the right", 2: "a half turn", 3: "a quarter turn to the left" })[((d % 4) + 4) % 4];
const V25LG7_spot = ["0,1", "1,2", "2,1", "1,0"];
addBank(7, "logic", "turns", 0.3, function () {
  const si = R(0, V25LG7_SCN.length - 1), S = V25LG7_SCN[si], K = pick(KIDS), f = R(0, 3), cells = { "1,1": "🧒" };
  S.forEach((x, i) => cells[V25LG7_spot[i]] = x[0]);
  const vis = board(3, cells, null) + note(`${K} is in the middle, looking at the ${S[f][1]}.`), o = x => V25LG7_emo(x[0], x[1]);
  if (Math.random() < 0.6) {
    const [k, words] = pick(V25LG7_TN), a = S[(f + k + 8) % 4];
    const q = { q: `${K} stands in the middle and faces the <b>${S[f][1]}</b>. ${K} makes <b>${words}</b>. What does ${K} face now?`, say: `${K} stands in the middle and faces the ${S[f][1]}. ${K} makes ${words}. What does ${K} face now?`, vis, opts: S.map(o), ans: o(a), sayAns: `the ${a[1]}`, why: k === 4 ? `A full turn goes all the way around, so ${K} faces the ${a[1]} again.` : `From the ${S[f][1]}, ${words} turns ${K} to face the ${a[1]}.`, key: "v25f" + si + f + k + K };
    return V25LG7_fin(q, x => {
      const j = S.findIndex(s => o(s) === x); if (j < 0) return null;
      const d = (j - f + 4) % 4;
      if (d === 0) return `The ${S[j][1]} is where ${K} started, and ${words} turns away from it.`;
      return `Turning from the ${S[f][1]} to the ${S[j][1]} is ${V25LG7_tName(d)}, not ${words}.`;
    }, { t: "face" });
  }
  const d = R(1, 3), a = S[(f + d) % 4], names = ["a quarter turn to the right", "a quarter turn to the left", "a half turn", "a full turn"];
  const ans = V25LG7_tName(d);
  const q = { q: `${K} faced the <b>${S[f][1]}</b>. Now ${K} faces the <b>${a[1]}</b>. What turn did ${K} make?`, say: `${K} faced the ${S[f][1]}. Now ${K} faces the ${a[1]}. What turn did ${K} make?`, vis, opts: shuffle(names), ans, why: `Going from the ${S[f][1]} to the ${a[1]} is ${ans}.`, key: "v25w" + si + f + d + K };
  return V25LG7_fin(q, x => {
    const k = { "a quarter turn to the right": 1, "a quarter turn to the left": -1, "a half turn": 2, "a full turn": 4 }[x]; if (k == null) return null;
    if (k === 4) return `A full turn would bring ${K} back to the ${S[f][1]}, not the ${a[1]}.`;
    return `${cap(x)} from the ${S[f][1]} would face the ${S[(f + k + 8) % 4][1]}, not the ${a[1]}.`;
  }, { t: "which" });
});
whyRule(7, "logic", "turns", V25LG7_rule);

/* =====================================================================
   8 · Picture Riddles: "I am ..., but I am not ..." riddles
   ===================================================================== */
// t: clues, a: possible answers [e, name], g: groups of traps (one from each) [e, name, reason], f: fillers [e, name, reason]
const V25LG7_RD = [
  { t: "I have wings. I am not a bird.", a: [["🦋", "butterfly"], ["🐝", "bee"]], g: [[["🦆", "duck", "A duck is a bird, and I am not a bird."], ["🦉", "owl", "An owl is a bird, and I am not a bird."], ["🦅", "eagle", "An eagle is a bird, and I am not a bird."], ["🐧", "penguin", "A penguin is a bird, and I am not a bird."]]], f: [["🐢", "turtle", "A turtle has no wings."], ["🐱", "cat", "A cat has no wings."], ["🐟", "fish", "A fish has no wings."], ["🐶", "dog", "A dog has no wings."], ["🐍", "snake", "A snake has no wings."]] },
  { t: "I live in the sea. I am not a fish.", a: [["🦀", "crab"], ["🐙", "octopus"], ["🐳", "whale"], ["🐬", "dolphin"]], g: [[["🐟", "fish", "The riddle says I am not a fish."], ["🐠", "tropical fish", "A tropical fish is a fish, and I am not a fish."], ["🦈", "shark", "A shark is a fish, and I am not a fish."]]], f: [["🐴", "horse", "A horse does not live in the sea."], ["🐔", "hen", "A hen does not live in the sea."], ["🐒", "monkey", "A monkey does not live in the sea."], ["🐫", "camel", "A camel does not live in the sea."], ["🦁", "lion", "A lion does not live in the sea."]] },
  { t: "I can fly. I am not a bird. I am not a bug.", a: [["✈️", "airplane"], ["🚁", "helicopter"], ["🦇", "bat"]], g: [[["🦅", "eagle", "An eagle is a bird, and I am not a bird."], ["🦉", "owl", "An owl is a bird, and I am not a bird."], ["🦆", "duck", "A duck is a bird, and I am not a bird."]], [["🐝", "bee", "A bee is a bug, and I am not a bug."], ["🦋", "butterfly", "A butterfly is a bug, and I am not a bug."], ["🐞", "ladybug", "A ladybug is a bug, and I am not a bug."]]], f: [["🐢", "turtle", "A turtle can't fly."], ["🐘", "elephant", "An elephant can't fly."], ["🚗", "car", "A car can't fly."], ["🐟", "fish", "A fish can't fly."]] },
  { t: "I have wheels. I have no motor. I am not a bike.", a: [["🛴", "scooter"], ["🛒", "shopping cart"]], g: [[["🚲", "bike", "A bike has wheels and no motor, but I am not a bike."]], [["🚗", "car", "A car has a motor."], ["🚌", "bus", "A bus has a motor."], ["🏍️", "motorcycle", "A motorcycle has a motor."]]], f: [["🍎", "apple", "An apple has no wheels."], ["🐶", "dog", "A dog has no wheels."], ["🌳", "tree", "A tree has no wheels."]] },
  { t: "I am a red fruit. I am not an apple.", a: [["🍓", "strawberry"]], g: [[["🍎", "apple", "The riddle says I am not an apple."]]], f: [["🍌", "banana", "A banana is yellow, not red."], ["🍋", "lemon", "A lemon is yellow, not red."], ["🍊", "orange", "An orange is orange, not red."], ["🥦", "broccoli", "Broccoli is green, and it is not a fruit."], ["🥝", "kiwi", "A kiwi is green inside and brown outside, not red."]] },
  { t: "I am a green vegetable. I am not broccoli.", a: [["🥒", "cucumber"]], g: [[["🥦", "broccoli", "The riddle says I am not broccoli."]]], f: [["🥕", "carrot", "A carrot is orange, not green."], ["🌽", "corn", "Corn is yellow, not green."], ["🍆", "eggplant", "An eggplant is purple, not green."], ["🥔", "potato", "A potato is brown, not green."]] },
  { t: "I have a shell. I am not a turtle.", a: [["🐌", "snail"], ["🦀", "crab"]], g: [[["🐢", "turtle", "The riddle says I am not a turtle."]]], f: [["🐰", "rabbit", "A rabbit has no shell."], ["🐒", "monkey", "A monkey has no shell."], ["🐶", "dog", "A dog has no shell."], ["🐸", "frog", "A frog has no shell."]] },
  { t: "I give off light. I am not the sun.", a: [["🕯️", "candle"], ["💡", "lightbulb"], ["🔦", "flashlight"]], g: [[["☀️", "sun", "The riddle says I am not the sun."]]], f: [["🍎", "apple", "An apple does not give off light."], ["🧦", "socks", "Socks do not give off light."], ["🐻", "bear", "A bear does not give off light."], ["📚", "books", "Books do not give off light."]] },
  { t: "I live on a farm. I am not a cow.", a: [["🐷", "pig"], ["🐑", "sheep"], ["🐔", "hen"], ["🐴", "horse"], ["🐐", "goat"]], g: [[["🐮", "cow", "The riddle says I am not a cow."]]], f: [["🦁", "lion", "A lion does not live on a farm."], ["🐧", "penguin", "A penguin does not live on a farm."], ["🐙", "octopus", "An octopus does not live on a farm."], ["🦒", "giraffe", "A giraffe does not live on a farm."], ["🐳", "whale", "A whale does not live on a farm."]] },
  { t: "I am a pet. I am not a dog.", a: [["🐱", "cat"], ["🐹", "hamster"], ["🐟", "fish"]], g: [[["🐶", "dog", "The riddle says I am not a dog."]]], f: [["🦁", "lion", "A lion is a wild animal, not a pet."], ["🐊", "crocodile", "A crocodile is a wild animal, not a pet."], ["🦈", "shark", "A shark is a wild animal, not a pet."], ["🐘", "elephant", "An elephant is a wild animal, not a pet."], ["🐻", "bear", "A bear is a wild animal, not a pet."]] },
  { t: "You wear me. I do not go on your feet.", a: [["🧢", "cap"], ["🧣", "scarf"], ["👕", "shirt"], ["👗", "dress"]], g: [[["👟", "sneaker", "A sneaker goes on your feet."], ["🧦", "socks", "Socks go on your feet."], ["👢", "boot", "A boot goes on your feet."]]], f: [["🍕", "pizza", "You eat pizza. You don't wear it."], ["🚗", "car", "You ride in a car. You don't wear it."], ["🌳", "tree", "You can't wear a tree."], ["🐟", "fish", "You can't wear a fish."]] },
  { t: "I am in the sky at night. I am not the moon.", a: [["⭐", "star"]], g: [[["🌙", "moon", "The riddle says I am not the moon."]]], f: [["☀️", "sun", "The sun is in the sky in the day, not at night."], ["🍎", "apple", "An apple is not up in the sky."], ["🐟", "fish", "A fish lives in water, not in the sky."], ["🌳", "tree", "A tree grows in the ground, not in the sky."]] },
  { t: "I make music. I have no strings.", a: [["🥁", "drum"], ["🎺", "trumpet"]], g: [[["🎸", "guitar", "A guitar has strings."], ["🎻", "violin", "A violin has strings."]]], f: [["🍩", "donut", "A donut can't make music."], ["🧸", "teddy bear", "A teddy bear can't make music."], ["🍌", "banana", "A banana can't make music."], ["🧦", "socks", "Socks can't make music."]] },
  { t: "I can fly. I have no wings.", a: [["🚁", "helicopter"]], g: [[["✈️", "airplane", "An airplane has wings."], ["🦅", "eagle", "An eagle has wings."], ["🦋", "butterfly", "A butterfly has wings."]]], f: [["🚗", "car", "A car can't fly."], ["🐢", "turtle", "A turtle can't fly."], ["🐘", "elephant", "An elephant can't fly."], ["🚢", "ship", "A ship can't fly."]] },
  { t: "I float on water. I am not a boat.", a: [["🦆", "duck"]], g: [[["⛵", "sailboat", "A sailboat is a boat."], ["🚤", "speedboat", "A speedboat is a boat."], ["🛶", "canoe", "A canoe is a boat."]]], f: [["🔑", "key", "A key sinks in water."], ["⚓", "anchor", "An anchor sinks in water."], ["🚌", "bus", "A bus does not float on water."], ["🚗", "car", "A car does not float on water."]] },
  { t: "I am a bug. I can't fly.", a: [["🐛", "caterpillar"], ["🐜", "ant"]], g: [[["🐝", "bee", "A bee can fly."], ["🦋", "butterfly", "A butterfly can fly."], ["🐞", "ladybug", "A ladybug can fly."]]], f: [["🐸", "frog", "A frog is not a bug."], ["🐟", "fish", "A fish is not a bug."], ["🐭", "mouse", "A mouse is not a bug."], ["🐢", "turtle", "A turtle is not a bug."]] },
  { t: "I am a sweet treat. I am cold.", a: [["🍦", "ice cream"]], g: [[["🍪", "cookie", "A cookie is sweet, but it is not cold."], ["🍩", "donut", "A donut is sweet, but it is not cold."], ["🧁", "cupcake", "A cupcake is sweet, but it is not cold."]]], f: [["🍕", "pizza", "Pizza is not a sweet treat."], ["🥦", "broccoli", "Broccoli is not a sweet treat."], ["🧀", "cheese", "Cheese is not a sweet treat."], ["🥕", "carrot", "A carrot is a vegetable, not a sweet treat."]] },
  { t: "I have a trunk. I am not an animal.", a: [["🌳", "tree"], ["🌴", "palm tree"]], g: [[["🐘", "elephant", "An elephant is an animal."]]], f: [["⭐", "star", "A star has no trunk."], ["🍰", "cake", "A cake has no trunk."], ["🎈", "balloon", "A balloon has no trunk."], ["🧦", "socks", "Socks have no trunk."]] },
  { t: "I have hands. I am not a person.", a: [["⏰", "alarm clock"], ["🕰️", "clock"]], g: [[["🧒", "child", "A child is a person."]]], f: [["🌳", "tree", "A tree has no hands."], ["🐟", "fish", "A fish has no hands."], ["🍎", "apple", "An apple has no hands."], ["🚗", "car", "A car has no hands."]] },
  { t: "I have keys. I am not a piano.", a: [["⌨️", "keyboard"]], g: [[["🎹", "piano", "The riddle says I am not a piano."]]], f: [["🥕", "carrot", "A carrot has no keys."], ["🐱", "cat", "A cat has no keys."], ["🌼", "flower", "A flower has no keys."], ["🍪", "cookie", "A cookie has no keys."]] },
  { t: "I have bark. I am not a dog.", a: [["🌳", "tree"], ["🌲", "pine tree"]], g: [[["🐶", "dog", "The riddle says I am not a dog."]]], f: [["🐟", "fish", "A fish has no bark."], ["⭐", "star", "A star has no bark."], ["🍦", "ice cream", "Ice cream has no bark."], ["🎈", "balloon", "A balloon has no bark."]] },
  { t: "I have stripes. I am not a zebra.", a: [["🐯", "tiger"], ["🐝", "bee"]], g: [[["🦓", "zebra", "The riddle says I am not a zebra."]]], f: [["🐷", "pig", "A pig has no stripes."], ["🐘", "elephant", "An elephant has no stripes."], ["🐸", "frog", "A frog has no stripes."], ["🐔", "hen", "A hen has no stripes."]] },
];
const V25LG7_rArt = n => /^(socks|books|broccoli|corn|pizza|cheese|ice cream)$/.test(n) ? n : V25LG7_art(n);
addBank(7, "logic", "riddles", 0.3, function () {
  const ri = R(0, V25LG7_RD.length - 1), D = V25LG7_RD[ri], a = pick(D.a), traps = D.g.map(g => pick(g)), fill = shuffle(D.f).slice(0, 3 - traps.length);
  const wrong = [...traps, ...fill], o = x => V25LG7_emo(x[0], x[1]);
  const q = { q: `<div class="sentence">${D.t}</div>What am I?`, say: `${D.t} What am I?`, opts: shuffle([a, ...wrong]).map(o), ans: o(a), sayAns: V25LG7_rArt(a[1]), why: `${cap(V25LG7_rArt(a[1]))} fits every clue.`, key: "v25" + ri + a[1] + "|" + wrong.map(x => x[1]).sort().join() };
  return V25LG7_fin(q, x => { const w = wrong.find(y => o(y) === x); return w ? w[2] : null; }, { r: ri });
});
whyRule(7, "logic", "riddles", V25LG7_rule);

/* =====================================================================
   9 · True or False?: places in a line, and "none of these"
   ===================================================================== */
const V25LG7_TFA = [["🐶", "dog"], ["🐱", "cat"], ["🐰", "rabbit"], ["🐸", "frog"], ["🐷", "pig"], ["🐮", "cow"], ["🦊", "fox"], ["🐻", "bear"], ["🐵", "monkey"], ["🐔", "hen"], ["🦁", "lion"], ["🐼", "panda"]];
const V25LG7_NONE_BAD = ["fruits|vegetables", "furry animals|bugs", "sweets|fruits"];
addBank(7, "logic", "truefalse", 0.3, function () {
  const TF = ["True ✔", "False ✘"];
  if (Math.random() < 0.6) {
    const L = shuffle(V25LG7_TFA).slice(0, 4), nm = i => L[i][1], vis = `<div class="chips">${L.map(x => `<span class="emo xl">${x[0]}</span>`).join("")}</div>`, k = R(0, 2);
    let txt, truth, rTrue, rFalse, key;
    if (k === 0) { // next to
      const a = R(0, 3); let b; do { b = R(0, 3); } while (b === a); truth = Math.abs(a - b) === 1;
      txt = `The ${nm(a)} is <b>next to</b> the ${nm(b)}.`; key = "n" + a + b;
      const gap = Math.abs(a - b) - 1, mid = L.slice(Math.min(a, b) + 1, Math.max(a, b)).map(x => "the " + x[1]);
      rTrue = `${cap(V25LG7_and(mid))} ${gap === 1 ? "is" : "are"} between them, so they are not next to each other.`;
      rFalse = `The ${nm(a)} and the ${nm(b)} really are side by side, so it is true.`;
    } else if (k === 1) { // between
      const s = R(0, 1), m = s + 1, e = s + 2, real = Math.random() < 0.5, a = real ? m : pick([0, 1, 2, 3].filter(i => i !== s && i !== m && i !== e));
      truth = real; txt = `The ${nm(a)} is <b>between</b> the ${nm(s)} and the ${nm(e)}.`; key = "b" + a + s + e;
      rTrue = `The ${nm(m)} is between the ${nm(s)} and the ${nm(e)}, not the ${nm(a)}.`;
      rFalse = `The ${nm(a)} really is between the ${nm(s)} and the ${nm(e)}, so it is true.`;
    } else { // just left / just right
      const left = Math.random() < 0.5, b = left ? R(1, 3) : R(0, 2), real = Math.random() < 0.5, nb = left ? b - 1 : b + 1;
      const a = real ? nb : pick([0, 1, 2, 3].filter(i => i !== b && i !== nb));
      truth = real; txt = `The ${nm(a)} is <b>just to the ${left ? "left" : "right"}</b> of the ${nm(b)}.`; key = "l" + left + a + b;
      rTrue = `The ${nm(nb)} is just to the ${left ? "left" : "right"} of the ${nm(b)}, not the ${nm(a)}.`;
      rFalse = `The ${nm(a)} really is right beside the ${nm(b)} on that side, so it is true.`;
    }
    const q = { q: `True or false? ${txt}`, say: `${L.map(x => x[1]).join(", ")}. True or false? ${xPlain(txt)}`, vis, opts: TF, ans: TF[truth ? 0 : 1], big: 1, why: `The line goes: ${L.map(x => x[1]).join(", ")}.`, key: "v25p" + key + L.map(x => x[1]).join() };
    return V25LG7_fin(q, x => /^True/.test(x) ? rTrue : rFalse, { t: "line" });
  }
  let ca, cb; do { [ca, cb] = shuffle(LCAT_KEYS).slice(0, 2); } while (V25LG7_NONE_BAD.includes(ca + "|" + cb) || V25LG7_NONE_BAD.includes(cb + "|" + ca));
  const none = Math.random() < 0.5, others = shuffle(LCAT_KEYS.filter(k => k !== ca && !V25LG7_NONE_BAD.includes(ca + "|" + k) && !V25LG7_NONE_BAD.includes(k + "|" + ca)));
  const items = shuffle([...(none ? [] : [pick(LCATS[ca])]), ...others.slice(0, none ? 4 : 3).map(k => pick(LCATS[k]))]);
  const odd = none ? null : items.find(x => LCATS[ca].includes(x));
  const q = { q: `True or false? <b>None</b> of these are ${ca}.`, say: `${items.map(x => x[1]).join(", ")}. True or false? None of these are ${ca}.`, vis: `<div class="chips">${items.map(x => `<span class="emo xl">${x[0]}</span>`).join("")}</div>`, opts: TF, ans: TF[none ? 0 : 1], big: 1, why: none ? `Not one of them is in the ${ca} group.` : `The ${odd[1]} is one of the ${ca}.`, key: "v25n" + ca + items.map(x => x[0]).join() };
  return V25LG7_fin(q, x => /^True/.test(x) ? `The ${odd[1]} is one of the ${ca}, so “none” is not right.` : `Not one of them is in the ${ca} group, so the sentence is true.`, { t: "none" });
});
whyRule(7, "logic", "truefalse", V25LG7_rule);

/* =====================================================================
   10 · If-Then Rules: two rules in a chain, and rules with two choices
   ===================================================================== */
// [rule 1, rule 2, fact, answer, wrong answers]   X = the child's name
const V25LG7_CH = [
  ["If it snows, school is closed.", "If school is closed, X builds a snowman.", "It snowed.", "X builds a snowman.", ["X goes to school.", "X goes to the beach.", "X rakes the leaves."]],
  ["If the dog is hungry, it barks.", "If the dog barks, X fills its bowl.", "The dog is hungry.", "X fills the dog's bowl.", ["X takes a nap.", "X empties the bowl.", "X walks the cat."]],
  ["If the sun goes down, it gets dark.", "If it gets dark, X turns on the light.", "The sun went down.", "X turns on the light.", ["X turns off the light.", "X puts on sunglasses.", "X goes to the beach."]],
  ["If the bell rings, recess starts.", "If recess starts, X plays tag.", "The bell rang.", "X plays tag.", ["X takes a spelling test.", "X eats dinner.", "X goes to bed."]],
  ["If the plant gets water, it grows tall.", "If the plant grows tall, X needs a bigger pot.", "X waters the plant every day.", "X needs a bigger pot.", ["X needs a smaller pot.", "The plant shrinks.", "X throws the plant away."]],
  ["If X cleans up the toys, X gets a story.", "If X gets a story, X falls asleep fast.", "X cleaned up the toys.", "X falls asleep fast.", ["X stays up all night.", "X gets no story.", "X makes a big mess."]],
  ["If the milk spills, the floor gets wet.", "If the floor is wet, X gets a towel.", "The milk spilled.", "X gets a towel.", ["X gets a cookie.", "X spills more milk.", "X goes outside to play."]],
  ["If it is hot outside, X goes to the pool.", "If X goes to the pool, X wears sunscreen.", "It is hot outside.", "X wears sunscreen.", ["X wears a winter coat.", "X builds a snowman.", "X stays in bed."]],
  ["If it is windy, the kite flies.", "If the kite flies, X holds the string tight.", "It is windy.", "X holds the string tight.", ["X lets go of the string.", "The kite stays on the ground.", "X goes inside."]],
  ["If the bread is toasted, the toaster pops.", "If the toaster pops, X spreads jam on the toast.", "The bread is toasted.", "X spreads jam on the toast.", ["X puts the bread back in the bag.", "X eats soup.", "X takes a bath."]],
  ["If the bus comes, X gets on.", "If X gets on the bus, X rides to school.", "The bus came.", "X rides to school.", ["X walks home.", "X misses the bus.", "X rides to the zoo."]],
  ["If the cat sees a mouse, it runs.", "If the cat runs, it knocks over the plant.", "The cat saw a mouse.", "The cat knocks over the plant.", ["The cat takes a nap.", "The cat eats its dinner.", "The cat stays still."]],
  ["If the hen lays an egg, X collects it.", "If X collects an egg, X puts it in the basket.", "The hen laid an egg.", "X puts the egg in the basket.", ["X throws the egg.", "X puts the egg in the mailbox.", "The hen lays a rock."]],
  ["If X is sick, X stays home.", "If X stays home, X rests on the couch.", "X is sick.", "X rests on the couch.", ["X goes to school.", "X runs a race.", "X goes to a party."]],
  ["If the team wins, they get a trophy.", "If they get a trophy, they put it on a shelf.", "The team won.", "They put a trophy on a shelf.", ["They get no trophy.", "They lose the game.", "They throw the trophy away."]],
  ["If the paint is wet, X waits.", "If X waits, X reads a book.", "The paint is wet.", "X reads a book.", ["X touches the wet paint.", "X paints the dog.", "X goes swimming."]],
];
// two-choice rules: [rule A, rule B, facts [[text, branch]], question, [answer A, answer B, third], [why A wrong when B, why B wrong when A], third reason]
const V25LG7_TWO = [
  { r: ["If your ticket is red, sit in the front.", "If your ticket is blue, sit in the back."], f: [["X has a red ticket.", 0], ["X has a blue ticket.", 1]], q: "Where does X sit?", o: ["In the front", "In the back", "In the middle"], w: ["The front is for red tickets, but X has a blue ticket.", "The back is for blue tickets, but X has a red ticket."], n: "Neither rule says to sit in the middle." },
  { r: ["If it is sunny, we eat lunch outside.", "If it is rainy, we eat lunch in the gym."], f: [["Today it is sunny.", 0], ["Today it is rainy.", 1]], q: "Where do we eat lunch?", o: ["Outside", "In the gym", "In the library"], w: ["Outside is for sunny days, but today it is rainy.", "The gym is for rainy days, but today it is sunny."], n: "Neither rule says to eat in the library." },
  { r: ["If a book is about animals, put it on the top shelf.", "If a book is about space, put it on the bottom shelf."], f: [["X's book is about lions and tigers.", 0], ["X's book is about puppies.", 0], ["X's book is about whales.", 0], ["X's book is about frogs.", 0], ["X's book is about the moon.", 1], ["X's book is about rockets and planets.", 1], ["X's book is about the stars.", 1], ["X's book is about astronauts.", 1]], q: "Where does X's book go?", o: ["On the top shelf", "On the bottom shelf", "On the middle shelf"], w: ["The top shelf is for animal books, but X's book is about space.", "The bottom shelf is for space books, but X's book is about animals."], n: "Neither rule says to use the middle shelf." },
  { r: ["If you roll an even number, hop.", "If you roll an odd number, clap."], f: [2, 4, 6].map(d => [`X rolls a ${d}.`, 0]).concat([1, 3, 5].map(d => [`X rolls a ${d}.`, 1])), q: "What does X do?", o: ["Hop", "Clap", "Stomp"], w: ["Hopping is for even numbers, but X rolled an odd number.", "Clapping is for odd numbers, but X rolled an even number."], n: "Neither rule says to stomp." },
  { r: ["If it is a school day, X rides the bus.", "If it is the weekend, X rides a bike."], f: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(d => [`Today is ${d}.`, 0]).concat([["Today is Saturday.", 1], ["Today is Sunday.", 1]]), q: "What does X ride today?", o: ["The bus", "A bike", "A horse"], w: ["The bus is for school days, but today is the weekend.", "The bike is for the weekend, but today is a school day."], n: "Neither rule says anything about a horse." },
  { r: ["If an animal has feathers, put it in box A.", "If an animal has fur, put it in box B."], f: [["🦉", "owl"], ["🦆", "duck"], ["🐔", "hen"], ["🐧", "penguin"], ["🦅", "eagle"], ["🐦", "bird"]].map(x => [x, 0]).concat([["🐶", "dog"], ["🐱", "cat"], ["🐰", "rabbit"], ["🐻", "bear"], ["🦊", "fox"], ["🐭", "mouse"]].map(x => [x, 1])), q: "Where does the animal go?", o: ["Box A", "Box B", "Box C"], w: ["Box A is for animals with feathers, but this one has fur.", "Box B is for animals with fur, but this one has feathers."], n: "Neither rule says to use box C." },
  { r: ["If the light is green, run.", "If the light is red, freeze."], f: [["The light turns green.", 0], ["The light turns red.", 1]], q: "What do the players do?", o: ["Run", "Freeze", "Sit down"], w: ["Running is for a green light, but the light is red.", "Freezing is for a red light, but the light is green."], n: "Neither rule says to sit down." },
];
addBank(7, "logic", "ifthen", 0.3, function () {
  const K = pick(KIDS), X = s => s.replace(/X/g, K);
  if (Math.random() < 0.5) {
    const ci = R(0, V25LG7_CH.length - 1), [r1, r2, f, a, d] = V25LG7_CH[ci].map(x => Array.isArray(x) ? x.map(X) : X(x));
    const q = { q: "Use <b>both</b> rules. What happens?", say: `Rule 1: ${r1} Rule 2: ${r2} Fact: ${f} What happens?`, vis: passage(`<b>Rule 1:</b> ${r1}<br><b>Rule 2:</b> ${r2}<br><b>Fact:</b> ${f}`), opts: shuffle([a, ...d]), ans: a, why: `${f} Follow rule 1, then rule 2: ${a}`, key: "v25c" + ci + K };
    return V25LG7_fin(q, o => `The rules never say “${o.replace(/\.$/, "")}”. They lead to “${a.replace(/\.$/, "")}”.`, { t: "chain" });
  }
  const ti = R(0, V25LG7_TWO.length - 1), T = V25LG7_TWO[ti], [fact, br] = pick(T.f), animal = Array.isArray(fact);
  const factTxt = animal ? `Here is a ${fact[1]}.` : X(fact), opts = T.o, ans = opts[br];
  const q = { q: `${T.r.map(X).join(" ")} ${animal ? `Where does the <span class="emo">${fact[0]}</span> go?` : X(T.q)}`, say: `${T.r.map(X).join(" ")} ${animal ? `Where does the ${fact[1]} go?` : `${factTxt} ${X(T.q)}`}`, vis: animal ? bigEmo(fact[0]) : passage(`<b>Fact:</b> ${factTxt}`), opts: opts.slice(), ans, why: `${animal ? `The ${fact[1]} has ${br ? "fur" : "feathers"}.` : factTxt} So the answer is “${ans}”.`, key: "v25t" + ti + (animal ? fact[1] : fact) + K };
  return V25LG7_fin(q, o => o === opts[2] ? T.n : X(T.w[1 - br]).replace(/^./, c => c.toUpperCase()), { t: "two" });
});
whyRule(7, "logic", "ifthen", V25LG7_rule);

/* =====================================================================
   11 · Days of the Week: reading a month calendar, and "a week later"
   ===================================================================== */
const V25LG7_ord = n => n + (n % 100 >= 11 && n % 100 <= 13 ? "th" : ["th", "st", "nd", "rd"][n % 10] || "th");
addBank(7, "logic", "calendar", 0.3, function () {
  if (Math.random() < 0.5) {
    const s = R(0, 6), len = pick([30, 31]), d = R(1, len), cells = [];
    for (let i = 0; i < s; i++) cells.push("");
    for (let i = 1; i <= len; i++) cells.push(i === d ? `<b>${i}</b>` : String(i));
    while (cells.length % 7) cells.push("");
    const rows = []; for (let i = 0; i < cells.length; i += 7) rows.push(cells.slice(i, i + 7));
    const ai = (s + d - 1) % 7, ans = DAYS[ai], rowI = Math.floor((s + d - 1) / 7);
    const q = { q: `Look at the calendar. What day of the week is the <b>${V25LG7_ord(d)}</b>?`, say: `Look at the calendar. What day of the week is the ${V25LG7_ord(d)}?`, vis: table(rows, DAYS.map(x => x.slice(0, 3))), opts: uniq(ans, shuffle([DAYS[(ai + 1) % 7], DAYS[(ai + 6) % 7], DAYS[(ai + 2) % 7], DAYS[(ai + 5) % 7]])), ans, big: 1, why: `Find ${d} on the calendar, then look up to the top of its column: ${ans}.`, key: "v25g" + s + len + d };
    return V25LG7_fin(q, o => {
      const pi = DAYS.indexOf(o); if (pi < 0) return null;
      const x = rowI * 7 + pi - s + 1;
      return x >= 1 && x <= len ? `In that row, the ${V25LG7_ord(x)} is under ${o.slice(0, 3)}, not the ${V25LG7_ord(d)}.` : `In that row there is no date under ${o.slice(0, 3)}. The ${V25LG7_ord(d)} is under ${ans.slice(0, 3)}.`;
    }, { t: "grid" });
  }
  const off = pick([7, 7, 14, 8, 6]), a = R(1, 31 - off), b = a + off, di = R(0, 6), dA = DAYS[di], ans = DAYS[(di + off) % 7];
  const why = off === 7 || off === 14 ? `The ${V25LG7_ord(b)} is ${off} days after the ${V25LG7_ord(a)}. That is exactly ${off === 7 ? "one week" : "two weeks"}, so it is a ${dA} too.` : `The ${V25LG7_ord(b)} is ${off} days after the ${V25LG7_ord(a)}. 7 days after it is a ${dA} again, and ${off === 8 ? "1 day after that" : "1 day before that"} is a ${ans}.`;
  const q = { q: `The <b>${V25LG7_ord(a)}</b> is a <b>${dA}</b>. What day of the week is the <b>${V25LG7_ord(b)}</b>?`, say: `The ${V25LG7_ord(a)} is a ${dA}. What day of the week is the ${V25LG7_ord(b)}?`, opts: uniq(ans, shuffle([dA, DAYS[(di + 1) % 7], DAYS[(di + 6) % 7], DAYS[(di + off + 1) % 7], DAYS[(di + off + 6) % 7]].filter(x => x !== ans))), ans, big: 1, why, key: "v25w" + a + off + di };
  return V25LG7_fin(q, o => {
    if (DAYS.indexOf(o) < 0) return null;
    if (off % 7 === 0) return `${off} days is exactly ${off === 7 ? "one week" : "two weeks"}, so the ${V25LG7_ord(b)} is a ${dA}, not a ${o}.`;
    if (o === dA) return `The ${V25LG7_ord(b)} is ${off} days after the ${V25LG7_ord(a)}, not 7, so it is not a ${dA}.`;
    return `${off} days after a ${dA} is a ${ans}, not a ${o}.`;
  }, { t: "week" });
});
whyRule(7, "logic", "calendar", V25LG7_rule);

/* =====================================================================
   12 · Number Riddles: digit clues and skip-counting clues
   ===================================================================== */
addBank(7, "logic", "numriddles", 0.3, function () {
  const f = R(0, 2);
  if (f === 0) { // range + ones digit
    const t = R(2, 8); let o; do { o = R(1, 9); } while (o === t);
    const ans = 10 * t + o, lo = 10 * t, hi = lo + 10, txt = `I am more than ${lo} and less than ${hi}. My ones digit is ${o}.`;
    const q = { q: `<div class="sentence">${txt}</div>Who am I?`, say: `${txt} Who am I?`, opts: numU(ans, shuffle([10 * o + t, ans + 10, ans - 10, ans + 1, ans - 1]), 3, 10), ans: String(ans), big: 1, why: `The numbers between ${lo} and ${hi} have ${t} tens. With ${o} in the ones place, that makes ${ans}.`, key: "v25r" + ans };
    return V25LG7_fin(q, x => { const p = +x; return p > lo && p < hi ? `${p} has ${p % 10} in the ones place, not ${o}.` : `${p} is not between ${lo} and ${hi}.`; }, { f });
  }
  if (f === 1) { // tens digit + "ones is k more"
    const t = R(1, 6), k = R(1, 9 - t), o = t + k, ans = 10 * t + o, txt = `My tens digit is ${t}. My ones digit is ${k} more than my tens digit.`;
    const q = { q: `<div class="sentence">${txt}</div>Who am I?`, say: `${txt} Who am I?`, opts: numU(ans, shuffle([10 * o + t, 10 * t + k, ans + 1, ans - 1, ans + 10]), 3, 10), ans: String(ans), big: 1, why: `The ones digit is ${t} + ${k} = ${o}. So the number is ${ans}.`, key: "v25t" + t + k };
    return V25LG7_fin(q, x => { const p = +x, pt = Math.floor(p / 10); return pt !== t ? `${p} has a tens digit of ${pt}, not ${t}.` : `The ones digit must be ${t} + ${k} = ${o}, but ${p} has ${p % 10} in the ones place.`; }, { f });
  }
  const s = pick([5, 5, 10]); let m, lo, hi;
  if (s === 5) { m = 5 * R(3, 19); lo = m - R(1, 4); hi = lo + 5; } else { m = 10 * R(2, 9); lo = m - 10; hi = m + 10; }
  const txt = `I am a number you say when you count by ${s}s. I am more than ${lo} and less than ${hi}.`;
  const inR = range(lo + 1, hi - 1).filter(x => x !== m);
  const q = { q: `<div class="sentence">${txt}</div>Who am I?`, say: `${txt} Who am I?`, opts: uniq(m, shuffle([m - s, m + s, ...shuffle(inR).slice(0, 2)]).filter(x => x > 0)), ans: String(m), big: 1, why: `Count by ${s}s: ${m - s}, ${m}, ${m + s}. Only ${m} is more than ${lo} and less than ${hi}.`, key: "v25s" + s + m + lo };
  return V25LG7_fin(q, x => { const p = +x; return p % s ? `${p} is not a number you say when counting by ${s}s.` : `${p} is not between ${lo} and ${hi}.`; }, { f });
});
whyRule(7, "logic", "numriddles", V25LG7_rule);

/* =====================================================================
   13 · Grid Spots: moving on the grid, and counting a row or column
   ===================================================================== */
const V25LG7_GP = [["🍎", "apple"], ["⭐", "star"], ["🐶", "dog"], ["🚗", "car"], ["🌼", "flower"], ["🎈", "balloon"], ["🐟", "fish"], ["⚽", "soccer ball"], ["🍦", "ice cream"], ["🏠", "house"], ["🐱", "cat"], ["🌙", "moon"], ["🐸", "frog"], ["🍪", "cookie"]];
addBank(7, "logic", "coords", 0.3, function () {
  const C = "ABCD";
  if (Math.random() < 0.55) {
    const dirs = { right: [1, 0], left: [-1, 0], up: [0, -1], down: [0, 1] }, dn = pick(Object.keys(dirs)), [dx, dy] = dirs[dn], k = R(1, 3);
    let ci, ri; do { ci = R(0, 3); ri = R(1, 4); } while (ci + dx * k < 0 || ci + dx * k > 3 || ri + dy * k < 1 || ri + dy * k > 4);
    const start = C[ci] + ri, ans = C[ci + dx * k] + (ri + dy * k), P = pick(V25LG7_GP), cells = {}; cells[start] = P[0];
    const ok = s => /^[A-D][1-4]$/.test(s);
    const cand = [C[ci - dx * k] + (ri - dy * k), C[ci + dy * k] + (ri + dx * k), C[ci + dx * (k + 1)] + (ri + dy * (k + 1)), C[ci + dx * (k - 1)] + (ri + dy * (k - 1)), C[ci - dy * k] + (ri - dx * k), (ri + dy * k) + C[ci + dx * k]].filter(s => s && ok(s) && s !== ans);
    const q = { q: `The <span class="emo">${P[0]}</span> is at <b>${start}</b>. It moves <b>${V25LG7_sq(k)} ${dn}</b>. Where is it now?`, say: `The ${P[1]} is at ${start.split("").join(" ")}. It moves ${V25LG7_sq(k)} ${dn}. Where is it now?`, vis: coordGrid(cells), opts: uniq(ans, cand, () => pick(C.split("")) + R(1, 4)), ans, big: 1, why: `Start at ${start} and move ${V25LG7_sq(k)} ${dn}: you land on ${ans}.`, key: "v25m" + start + dn + k + P[1] };
    return V25LG7_fin(q, x => {
      if (!ok(x)) return null; const xc = C.indexOf(x[0]) - ci, xr = +x[1] - ri;
      if (!xc && !xr) return `${x} is where the ${P[1]} starts, but it has to move.`;
      return `${x} is ${V25LG7_off(xr, xc)} from ${start}, not ${V25LG7_sq(k)} ${dn}.`;
    }, { t: "move" });
  }
  const pics = shuffle(V25LG7_GP).slice(0, R(5, 7)), spots = shuffle(C.split("").flatMap(c => [1, 2, 3, 4].map(r => c + r))).slice(0, pics.length), cells = {};
  spots.forEach((s, i) => cells[s] = pics[i][0]);
  const byRow = Math.random() < 0.5, line = byRow ? String(R(1, 4)) : pick(C.split("")), inLine = spots.filter(s => byRow ? s[1] === line : s[0] === line);
  if (!inLine.length) return null;
  const ans = inLine.length, names = inLine.sort().map(s => "the " + pics[spots.indexOf(s)][1]), lab = byRow ? `row ${line}` : `column ${line}`;
  const q = { q: `How many pictures are in <b>${lab}</b>?`, say: `How many pictures are in ${lab}?`, vis: coordGrid(cells), opts: numU(ans, shuffle([ans + 1, ans - 1, ans + 2, 0]), 2, 0), ans: String(ans), big: 1, why: `${cap(lab)} has ${V25LG7_and(names)}. That is ${ans}.`, key: "v25n" + spots.join() + pics.map(p => p[0]).join() + lab };
  return V25LG7_fin(q, x => { const p = +x; return `${cap(lab)} has ${V25LG7_pl(ans, "picture")}: ${V25LG7_and(names)}. ${p} is too ${p < ans ? "few" : "many"}.`; }, { t: "count" });
});
whyRule(7, "logic", "coords", V25LG7_rule);

/* =====================================================================
   14 · Number Patterns: repeating patterns, growing jumps, and a wrong number
   ===================================================================== */
addBank(7, "logic", "numpat", 0.3, function () {
  const mode = R(0, 2);
  if (mode === 0) { // repeating
    const L = pick([2, 3, 3]), unit = Math.random() < 0.3 ? shuffle([10, 20, 30, 40, 50]).slice(0, L) : shuffle(range(1, 9)).slice(0, L);
    const len = R(L * 2 + 1, L * 2 + 3), seq = range(0, len - 1).map(i => unit[i % L]), ans = unit[len % L], prev = seq[len - 1];
    const step = unit[1] - unit[0], near = [prev + step, prev + 1, prev - 1, Math.max(...unit) + (unit[0] >= 10 ? 10 : 1)];
    const q = { q: "This pattern repeats. What number comes <b>next</b>?", say: `${seq.join(", ")}. This pattern repeats. What number comes next?`, vis: train([...seq, "?"]), opts: uniq(ans, shuffle([...unit.filter(x => x !== ans), ...near]).filter(x => x >= 0)), ans: String(ans), big: 1, why: `The part that repeats is ${unit.join(", ")}. After ${prev} comes ${ans}.`, key: "v25r" + unit.join() + len };
    return V25LG7_fin(q, x => { const p = +x; return unit.includes(p) ? `${p} is in the pattern, but after ${prev} always comes ${ans}.` : `${p} is not in the part that repeats: ${unit.join(", ")}.`; }, { t: "rep" });
  }
  if (mode === 1) { // growing jumps
    const a = R(1, 10), j0 = R(1, 2), seq = [a]; for (let i = 0; i < 4; i++) seq.push(seq[i] + j0 + i);
    const last = seq[4], jn = j0 + 4, ans = last + jn, jumps = range(0, 3).map(i => "+" + (j0 + i));
    const q = { q: "Each jump is <b>1 bigger</b> than the jump before. What number comes <b>next</b>?", say: `${seq.join(", ")}. Each jump is 1 bigger than the jump before. What number comes next?`, vis: train([...seq, "?"]), opts: numU(ans, shuffle([last + jn - 1, last + jn + 1, last + j0, ans + 2]), 3, 0), ans: String(ans), big: 1, why: `The jumps are ${jumps.join(", ")}, so the next jump is +${jn}: ${last} + ${jn} = ${ans}.`, key: "v25g" + a + j0 };
    return V25LG7_fin(q, x => { const p = +x, d = p - last; return d === jn - 1 ? `${p} uses a jump of ${jn - 1} again, but the next jump is ${jn}: ${last} + ${jn} = ${ans}.` : `${p} is ${last} + ${d}, but the next jump is ${jn}: ${last} + ${jn} = ${ans}.`; }, { t: "grow" });
  }
  const k = pick([2, 3, 5, 10]), a = k * R(0, 4) + (k === 10 ? R(0, 9) : R(0, k - 1)), seq = range(0, 4).map(i => a + i * k), w = R(1, 3), bad = seq[w] + pick([-1, 1]);
  const shown = seq.map((x, i) => i === w ? bad : x), good = shuffle(seq.filter((_, i) => i !== w)).slice(0, 3);
  const q = { q: "One number does <b>not</b> fit the pattern. Which one?", say: `${shown.join(", ")}. One number does not fit the pattern. Which one?`, vis: train(shown), opts: shuffle([bad, ...good]).map(String), ans: String(bad), big: 1, why: `The pattern adds ${k} each time: ${seq.join(", ")}. It should be ${seq[w]}, not ${bad}.`, key: "v25x" + a + k + w + bad };
  return V25LG7_fin(q, x => `${x} fits: the pattern adds ${k} each time, ${seq.join(", ")}.`, { t: "bad" });
});
whyRule(7, "logic", "numpat", V25LG7_rule);

/* =====================================================================
   15 · Clue Detective: animal clues
   ===================================================================== */
// [emoji, name, legs (null = not a clear answer), fur, feathers, wings, lives in water, shell]  (null = not clear)
const V25LG7_AN = [
  ["🐶", "dog", 4, 1, 0, 0, 0, 0], ["🐱", "cat", 4, 1, 0, 0, 0, 0], ["🐰", "rabbit", 4, 1, 0, 0, 0, 0], ["🐻", "bear", 4, 1, 0, 0, 0, 0], ["🐭", "mouse", 4, 1, 0, 0, 0, 0], ["🦁", "lion", 4, 1, 0, 0, 0, 0],
  ["🐔", "hen", 2, 0, 1, 1, 0, 0], ["🦉", "owl", 2, 0, 1, 1, 0, 0], ["🦆", "duck", 2, 0, 1, 1, null, 0], ["🐧", "penguin", 2, 0, 1, 1, null, 0],
  ["🐟", "fish", 0, 0, 0, 0, 1, 0], ["🦈", "shark", 0, 0, 0, 0, 1, 0], ["🐳", "whale", 0, 0, 0, 0, 1, 0], ["🐙", "octopus", null, 0, 0, 0, 1, 0], ["🦀", "crab", null, 0, 0, 0, null, 1],
  ["🐢", "turtle", 4, 0, 0, 0, null, 1], ["🐌", "snail", 0, 0, 0, 0, null, 1], ["🐍", "snake", 0, 0, 0, 0, null, 0], ["🕷️", "spider", 8, null, 0, 0, 0, 0],
  ["🦋", "butterfly", 6, null, 0, 1, 0, 0], ["🐜", "ant", 6, 0, 0, 0, 0, 0], ["🐸", "frog", 4, 0, 0, 0, null, 0], ["🐝", "bee", 6, null, 0, 1, 0, 0],
];
const V25LG7_FT = [["fur", "It has fur.", "It has no fur."], ["feathers", "It has feathers.", "It does not have feathers."], ["wings", "It has wings.", "It has no wings."], ["water", "It lives in water.", "It does not live in water."], ["shell", "It has a shell.", "It has no shell."]];
// clue: [kind, value, text, isNot]  kind: "L" legs equal, "NL" legs not equal, "F" feature index (value 1/0)
const V25LG7_ct = (c, x) => { // true / false / null
  const [k, v] = c;
  if (k === "L") return x[2] == null ? null : x[2] === v;
  if (k === "NL") return x[2] == null ? null : x[2] !== v;
  const y = x[3 + v[0]]; return y == null ? null : y === v[1];
};
const V25LG7_legTxt = n => n ? V25LG7_pl(n, "leg") : "no legs";
const V25LG7_cf = (c, x) => {
  const [k, v] = c, S = `The ${x[1]}`;
  if (k === "L") return `${S} has ${V25LG7_legTxt(x[2])}, but a clue says it has ${V25LG7_legTxt(v)}.`;
  if (k === "NL") return `${S} has ${V25LG7_legTxt(v)}, but a clue says it does not have ${V25LG7_legTxt(v)}.`;
  const [fi, want] = v, F = V25LG7_FT[fi][0];
  if (F === "water") return want ? `${S} does not live in water, but a clue says it does.` : `${S} lives in water, but a clue says it does not.`;
  const has = { fur: "fur", feathers: "feathers", wings: "wings", shell: "a shell" }[F];
  return want ? `${S} has no ${F === "shell" ? "shell" : F}, but a clue says it has ${has}.` : `${S} has ${has}, but a clue says it has no ${F === "shell" ? "shell" : F}.`;
};
function V25LG7_clues(A) {
  const out = [];
  if (A[2] != null) out.push(["L", A[2], A[2] ? `It has ${A[2]} legs.` : "It has no legs.", 0]);
  for (const n of [0, 2, 4, 6]) if (A[2] != null && A[2] !== n) out.push(["NL", n, n ? `It does not have ${n} legs.` : "It does not have zero legs.", 1]);
  V25LG7_FT.forEach((f, i) => { const y = A[3 + i]; if (y != null) out.push(["F", [i, y], y ? f[1] : f[2], y ? 0 : 1]); });
  return out.filter(c => c[2] !== "It does not have zero legs.");
}
addBank(7, "logic", "detective", 0.3, function () {
  for (let t = 0; t < 60; t++) {
    const all = shuffle(V25LG7_AN), A = all[0], dis = all.slice(1, 4), pool = V25LG7_clues(A);
    let cs = null;
    for (let u = 0; u < 120 && !cs; u++) {
      const n = Math.random() < 0.6 ? 2 : 3, c = shuffle(pool).slice(0, n);
      if (!c.some(x => x[3])) continue;
      if (!c.every(x => V25LG7_ct(x, A) === true)) continue;
      if (!dis.every(d => c.some(x => V25LG7_ct(x, d) === false))) continue;
      if (!c.every((x, i) => dis.some(d => V25LG7_ct(x, d) === false && c.every((y, j) => j === i || V25LG7_ct(y, d) === true)))) continue;
      cs = c;
    }
    if (!cs) continue;
    const opts = shuffle([A, ...dis]), o = x => V25LG7_emo(x[0], x[1]);
    const q = { q: "Read the clues. Which animal is it?", say: `${cs.map(c => c[2]).join(" ")} Which animal is it?`, vis: passage(cs.map(c => "🔎 " + c[2]).join("<br>")), opts: opts.map(o), ans: o(A), sayAns: `the ${A[1]}`, why: `Only the ${A[1]} fits every clue.`, key: "v25" + cs.map(c => c[2]).join("") + A[1] + "|" + dis.map(d => d[1]).sort().join() };
    return V25LG7_fin(q, x => { const d = dis.find(d => o(d) === x); if (!d) return null; const c = cs.find(c => V25LG7_ct(c, d) === false); return c ? V25LG7_cf(c, d) : null; }, { t: "animal" });
  }
  return null;
});
whyRule(7, "logic", "detective", V25LG7_rule);

