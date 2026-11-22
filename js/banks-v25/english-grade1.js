/* =====================================================================
   v25 · Age 6 · Reading & English (V25EN6_)
   New formats and fresh word lists for all 14 age-6 English topics.
   Every new question carries q.v25 so wrong picks get a true reason.
   ===================================================================== */
const V25EN6_BAN = /^(sex|sux|fux|fuk|fak|fuc|hag|fag|tit|cum|dik|dic|kok|ass|nig|jap|wop|pis|gyp|god|gad|cock|hell|fat|crap|slut|shit|butt|damn|dam|fart|hoe|poo|pee|bum|kum|gun|pus|nit)$/;
const V25EN6_spell = w => String(w).split("").join("-");
const V25EN6_art = w => (/^[aeiou]/i.test(w) ? "an " : "a ") + w;
const V25EN6_q = s => `‘${s}’`;

/* ---------------- Letter Sounds: same first sound / different first sound ---------------- */
const V25EN6_SW = {
  b: ["bat", "bed", "box", "bus", "bell", "bike", "book", "boat", "bag", "bun"],
  d: ["dog", "desk", "duck", "door", "doll", "dish", "dot", "dig"],
  f: ["fan", "fox", "fish", "farm", "fork", "feet", "fin", "fun"],
  g: ["gum", "goat", "girl", "game", "gate", "gift", "goose", "gold"],
  h: ["hat", "hen", "hill", "hop", "horn", "house", "hug", "hand"],
  j: ["jam", "jet", "jug", "jar", "juice", "jump", "jog"],
  l: ["lamp", "leg", "lid", "log", "lake", "leaf", "lock", "lip"],
  m: ["map", "mop", "milk", "mud", "moon", "mitt", "man", "mat"],
  n: ["net", "nest", "nut", "nap", "nose", "nail", "nine", "neck"],
  p: ["pan", "pen", "pig", "pot", "pie", "pup", "park", "pear"],
  r: ["rat", "red", "rug", "rock", "rain", "ring", "rose", "road"],
  s: ["sun", "sock", "sand", "seal", "soap", "sink", "sit", "six"],
  t: ["top", "tub", "tent", "toe", "tag", "tail", "ten", "toy"],
  v: ["van", "vet", "vest", "vase", "vine"],
  w: ["web", "wig", "wet", "wing", "worm", "wall", "wave", "well"],
  y: ["yak", "yam", "yell", "yard", "yarn", "yes"],
  z: ["zip", "zoo", "zero", "zap"],
};
const V25EN6_SL = Object.keys(V25EN6_SW);
addBank(6, "english", "sounds", 0.3, function () {
  const L = pick(V25EN6_SL);
  if (Math.random() < 0.55) {
    const [x, a] = shuffle(V25EN6_SW[L]).slice(0, 2);
    const others = shuffle(V25EN6_SL.filter(y => y !== L)).slice(0, 3).map(y => pick(V25EN6_SW[y]));
    return { q: `Which word starts with the same sound as <b>${x}</b>?`, say: `Which word starts with the same sound as ${x}?`, vis: hw(`<b class="hl">${x[0]}</b>${x.slice(1)}`, "big"), opts: shuffle([a, ...others]), ans: a, big: 1, why: `${cap(x)} and ${a} both start with the ${L.toUpperCase()} sound.`, key: `v25s${x}-${a}`, v25: { f: "same", x } };
  }
  const three = shuffle(V25EN6_SW[L]).slice(0, 3), M = pick(V25EN6_SL.filter(y => y !== L)), odd = pick(V25EN6_SW[M]);
  return { q: "Which word starts with a <b>different</b> sound?", say: "Which word starts with a different sound from the others?", opts: shuffle([...three, odd]), ans: odd, big: 1, why: `${cap(three[0])}, ${three[1]} and ${three[2]} start with the ${L.toUpperCase()} sound. ${cap(odd)} starts with ${M.toUpperCase()}.`, key: `v25d${three.slice().sort().join("")}-${odd}`, v25: { f: "diff", L } };
});
whyRule(6, "english", "sounds", (q, picked) => {
  if (!q.v25) return null;
  const p = xPlain(picked);
  if (!p || p === q.ans) return null;
  if (q.v25.f === "same") { const x = q.v25.x; if (p[0] === x[0]) return null; return `${xQ(p)} starts with the ${p[0].toUpperCase()} sound, but ${xQ(x)} starts with the ${x[0].toUpperCase()} sound.`; }
  if (q.v25.f === "diff") { if (p[0] !== q.v25.L) return null; return `${xQ(p)} starts with the ${q.v25.L.toUpperCase()} sound, just like two of the other words.`; }
  return null;
});

/* ---------------- Short Vowels: change the vowel, fill the sentence, odd vowel out ---------------- */
const V25EN6_VSWAP = [["cap", "u"], ["cat", "u"], ["cat", "o"], ["bag", "i"], ["bag", "u"], ["bed", "a"], ["bed", "i"], ["bed", "u"], ["pen", "i"], ["pen", "a"], ["pig", "e"],
  ["hat", "o"], ["hat", "u"], ["hit", "o"], ["hit", "a"], ["ten", "a"], ["ten", "i"], ["sit", "a"], ["sit", "e"], ["dog", "i"], ["dog", "u"], ["mop", "a"], ["top", "i"], ["top", "a"],
  ["fun", "a"], ["fan", "i"], ["nut", "e"], ["nut", "o"], ["cup", "a"], ["bug", "a"], ["bug", "i"], ["pot", "i"], ["pot", "e"], ["log", "e"], ["lip", "a"], ["wig", "a"], ["rug", "a"],
  ["pin", "a"], ["pin", "e"], ["mad", "u"], ["map", "o"]];
/* [sentence, answer, wrong vowel swaps, emoji] — each wrong word makes the sentence silly */
const V25EN6_VSENT = [["I sleep in my ___.", "bed", ["bad", "bid", "bud"], "🛏️"], ["The ___ says oink.", "pig", ["peg", "pag", "pog"], "🐷"], ["We ride the ___ to school.", "bus", ["bas", "bis", "bos"], "🚌"],
  ["I drink milk from a ___.", "cup", ["cap", "cip", "cep"], "🥛"], ["Mom cooks eggs in a ___.", "pan", ["pin", "pon", "pun"], "🍳"], ["The dog digs in the ___.", "mud", ["mad", "med", "mod"], "🐶"],
  ["I put on my ___ to keep my head warm.", "hat", ["hot", "hit", "hut"], "🎩"], ["The ___ barks at the cat.", "dog", ["dig", "dug", "deg"], "🐕"], ["The baby sleeps in a ___.", "crib", ["crab", "crub", "creb"], "👶"],
  ["We hit the ball with a ___.", "bat", ["bet", "but"], "⚾"], ["Please put the ___ on the jar.", "lid", ["lad", "led", "lud"], ""], ["The ___ wags its tail.", "pup", ["pip", "pap", "pep"], "🐶"],
  ["Write your name with a ___.", "pen", ["pan", "pon", "pun"], "✍️"], ["Throw the trash in the ___.", "bin", ["ban", "bun", "ben"], "🗑️"], ["A cow gives us ___.", "milk", ["malk", "melk", "mulk"], "🐄"],
  ["I wear a ___ on my head.", "cap", ["cep", "cip", "cop"], "🧢"], ["My dog likes to ___ in the yard.", "dig", ["dog", "dug", "deg"], "🦴"], ["Mom will ___ the cake.", "cut", ["cat", "cot", "cit"], "🎂"],
  ["Catch the fish with a ___.", "net", ["nut", "not", "nat"], "🎣"], ["Put the soup in a ___.", "pot", ["pet", "pat", "put"], "🍲"], ["I see a ___ in the web.", "bug", ["bag", "big", "beg"], "🕸️"],
  ["Give the baby a ___.", "hug", ["hig", "heg"], "🤗"]];
const V25EN6_VG = { a: ["cab", "gas", "lap", "ham", "ram", "tag", "rag", "nap", "pat", "wax", "jab"], e: ["beg", "den", "fed", "hem", "jet", "let", "men", "peg", "vet", "wed", "yet"],
  i: ["bib", "dip", "fin", "hid", "jig", "kit", "mix", "rib", "tip", "zip", "lip", "fix"], o: ["cob", "fog", "hog", "jog", "lot", "mom", "nod", "pop", "rod", "hop", "box"],
  u: ["bud", "cub", "dug", "gum", "hum", "jug", "pup", "rub", "sum", "tub", "yum", "bun"] };
const V25EN6_vow = w => (String(w).match(/[aeiou]/) || [""])[0];
addBank(6, "english", "vowels", 0.3, function () {
  const k = R(0, 2);
  if (k === 0) {
    const [w, n] = pick(V25EN6_VSWAP), v = w[1], ans = w[0] + n + w[2];
    const extra = shuffle("aeiou".split("").filter(x => x !== v && x !== n).map(x => w[0] + x + w[2]).filter(x => !V25EN6_BAN.test(x) && !CVC_BLOCK.test(x))).slice(0, 2);
    return { q: `Change the <b>${v}</b> in <b>${w}</b> to <b>${n}</b>. What word do you get?`, say: `Change the letter ${v} in ${w} to the letter ${n}. What word do you get?`, vis: hw(`${w[0]}<b class="hl">${v}</b>${w[2]}`, "big"), opts: shuffle([ans, w, ...extra]), ans, big: 1, why: `Swap the ${v} for ${n}: ${w} becomes ${ans}.`, key: `v25c${w}${n}`, v25: { f: "swap", w, n } };
  }
  if (k === 1) {
    const [s, a, wr, e] = pick(V25EN6_VSENT);
    return { q: `Which word fits?<div class="sentence big-sentence">${e ? `<span class="emo">${e}</span> ` : ""}${s.replace("___", '<span class="blank">___</span>')}</div>`, say: `Which word fits? ${s.replace("___", "blank")}`, opts: shuffle([a, ...wr]), ans: a, big: 1, why: `${s.replace("___", a)} ${cap(a)} has the short ${V25EN6_vow(a)} sound.`, key: `v25f${s}`, v25: { f: "sent", s } };
  }
  const vs = "aeiou".split(""), v = pick(vs), v2 = pick(vs.filter(x => x !== v)), three = shuffle(V25EN6_VG[v]).slice(0, 3), odd = pick(V25EN6_VG[v2]);
  return { q: "Which word has a <b>different</b> vowel sound?", say: "Which word has a different short vowel sound?", opts: shuffle([...three, odd]), ans: odd, big: 1, why: `${cap(three[0])}, ${three[1]} and ${three[2]} have the short ${v} sound. ${cap(odd)} has the short ${v2} sound.`, key: `v25o${three.slice().sort().join("")}-${odd}`, v25: { f: "odd", v } };
});
whyRule(6, "english", "vowels", (q, picked) => {
  if (!q.v25) return null;
  const p = xPlain(picked);
  if (!p || p === q.ans) return null;
  const d = q.v25;
  if (d.f === "swap") {
    if (p === d.w) return `${xQ(p)} is the word we started with. The ${d.w[1]} still needs to change to ${d.n}.`;
    if (p.length === 3 && p[0] === d.w[0] && p[2] === d.w[2]) return `${xQ(p)} has ${p[1]} in the middle, but we need ${d.n}.`;
    return null;
  }
  if (d.f === "sent") return `With ${xQ(p)} the sentence does not make sense. We need ${xQ(q.ans)}, with the short ${V25EN6_vow(q.ans)} sound.`;
  if (d.f === "odd") { if (V25EN6_vow(p) !== d.v) return null; return `${xQ(p)} has the short ${d.v} sound, just like two of the other words.`; }
  return null;
});

/* ---------------- Rhyming Words: rhyme or not?, odd one out, finish the poem ---------------- */
const V25EN6_RF = { op: ["hop", "mop", "top", "stop", "pop", "shop"], ig: ["pig", "wig", "dig", "big", "fig"], et: ["net", "jet", "wet", "pet", "vet", "get"],
  ay: ["day", "play", "say", "hay", "tray", "gray"], ink: ["pink", "sink", "drink", "wink", "think"], ump: ["jump", "bump", "lump", "pump", "stump"], ub: ["tub", "cub", "rub", "sub"],
  ack: ["back", "sack", "black", "snack", "track"], est: ["nest", "best", "rest", "test", "vest"], and: ["hand", "sand", "band", "land", "stand"], ame: ["game", "name", "same", "came", "flame"],
  ill: ["hill", "fill", "spill", "still", "grill"], ot: ["hot", "pot", "dot", "not", "spot"], ap: ["cap", "map", "nap", "tap", "clap"], ide: ["ride", "slide", "hide", "wide", "side"] };
const V25EN6_RK = Object.keys(V25EN6_RF);
const V25EN6_rf = w => V25EN6_RK.find(f => V25EN6_RF[f].includes(w));
/* [line 1, line 2 with ___, answer, wrong words, word it must rhyme with] */
const V25EN6_POEMS = [["I see a frog", "that sits on a ___.", "log", ["rock", "leaf", "tree"], "frog"], ["Look at the cat", "in a big red ___.", "hat", ["coat", "box", "car"], "cat"],
  ["I like to play", "outside all ___.", "day", ["night", "week", "morning"], "play"], ["The sun is hot,", "and I like it a ___.", "lot", ["bit", "ton", "much"], "hot"],
  ["A bug on a ___", "gave me a hug.", "rug", ["mat", "bed", "box"], "hug"], ["The little red hen", "counted to ___.", "ten", ["six", "five", "nine"], "hen"],
  ["I have a pet.", "He is very ___.", "wet", ["big", "small", "soft"], "pet"], ["I like to jump", "over the ___.", "bump", ["box", "log", "rock"], "jump"],
  ["I sit very still", "on top of the ___.", "hill", ["rock", "bed", "chair"], "still"], ["Ring, ring, ring!", "Now let's all ___.", "sing", ["dance", "clap", "play"], "ring"],
  ["The snow is white.", "The stars are ___.", "bright", ["big", "far", "small"], "white"], ["I hug my bear", "and sit in my ___.", "chair", ["bed", "room", "car"], "bear"],
  ["Look up at the sky", "and watch the birds ___.", "fly", ["sing", "go", "play"], "sky"], ["Splish, splash, scrub!", "I am in the ___.", "tub", ["bath", "pool", "sink"], "scrub"],
  ["I like the cake", "that my mom will ___.", "bake", ["cook", "cut", "bring"], "cake"], ["A little fox", "sat in a ___.", "box", ["bag", "house", "hole"], "fox"],
  ["I am a bee.", "Come buzz with ___!", "me", ["us", "them", "him"], "bee"], ["The cat sat", "on a soft ___.", "mat", ["bed", "rug", "chair"], "cat"],
  ["I saw a goat", "sail in a ___.", "boat", ["ship", "tub", "car"], "goat"], ["We had fun", "out in the ___.", "sun", ["rain", "park", "snow"], "fun"],
  ["My dog can dig", "next to the ___.", "pig", ["cow", "hen", "duck"], "dig"], ["The mouse ran out", "of the little ___.", "house", ["barn", "hole", "box"], "mouse"]];
addBank(6, "english", "rhyme", 0.3, function () {
  const k = R(0, 2);
  if (k === 0) {
    const f = pick(V25EN6_RK), a = pick(V25EN6_RF[f]), yes = Math.random() < 0.5;
    let b;
    if (yes) b = pick(V25EN6_RF[f].filter(x => x !== a));
    else { const pool = V25EN6_RK.filter(g => g !== f).flatMap(g => V25EN6_RF[g]), same = pool.filter(x => x[0] === a[0]); b = same.length && Math.random() < 0.6 ? pick(same) : pick(pool); }
    return { q: `Do <b>${a}</b> and <b>${b}</b> rhyme?`, say: `Do ${a} and ${b} rhyme?`, vis: row(hw(a), hw(b)), opts: ["Yes", "No"], ans: yes ? "Yes" : "No", big: 1, why: yes ? `${cap(a)} and ${b} both end with -${f}, so they rhyme.` : `${cap(a)} ends with -${f}, but ${b} ends with -${V25EN6_rf(b)}, so they do not rhyme.`, key: `v25y${a}-${b}`, v25: { f: "yn", a, b } };
  }
  if (k === 1) {
    const f = pick(V25EN6_RK), three = shuffle(V25EN6_RF[f]).slice(0, 3);
    const others = V25EN6_RK.filter(g => g !== f), near = others.filter(g => g[0] === f[0]), g = near.length && Math.random() < 0.6 ? pick(near) : pick(others), odd = pick(V25EN6_RF[g]);
    return { q: "Which word does <b>not</b> rhyme with the others?", say: "Which word does not rhyme with the others?", opts: shuffle([...three, odd]), ans: odd, big: 1, why: `${cap(three[0])}, ${three[1]} and ${three[2]} all end with -${f}. ${cap(odd)} ends with -${g}.`, key: `v25n${three.slice().sort().join("")}-${odd}`, v25: { f: "odd", fam: f } };
  }
  const [l1, l2, a, wr, t] = pick(V25EN6_POEMS);
  return { q: `Which word rhymes and finishes the poem?${passage(`${l1.replace("___", '<span class="blank">___</span>')}<br>${l2.replace("___", '<span class="blank">___</span>')}`)}`, say: `Which word rhymes and finishes the poem? ${l1.replace("___", "blank")} ${l2.replace("___", "blank")}`, opts: shuffle([a, ...wr]), ans: a, big: 1, why: `${cap(a)} rhymes with ${t}. ${(l1 + " " + l2).replace("___", a)}`, key: `v25p${l1}`, v25: { f: "poem", t } };
});
whyRule(6, "english", "rhyme", (q, picked) => {
  if (!q.v25) return null;
  const p = xPlain(picked), d = q.v25;
  if (!p || p === q.ans) return null;
  if (d.f === "yn") {
    const fa = V25EN6_rf(d.a), fb = V25EN6_rf(d.b);
    if (p === "Yes" && fa !== fb) return `${xQ(d.a)} ends with -${fa}, but ${xQ(d.b)} ends with -${fb}, so they do not rhyme.`;
    if (p === "No" && fa === fb) return `${xQ(d.a)} and ${xQ(d.b)} both end with -${fa}, so they do rhyme.`;
    return null;
  }
  if (d.f === "odd") { if (V25EN6_rf(p) !== d.fam) return null; return `${xQ(p)} ends with -${d.fam}, so it rhymes with two of the other words.`; }
  if (d.f === "poem") return `${xQ(p)} does not rhyme with ${xQ(d.t)}. ${cap(d.t)} rhymes with ${q.ans}.`;
  return null;
});

/* ---------------- Sight Words: right spelling, look-alike words, mixed-up letters ---------------- */
const V25EN6_SPS = [["Mom ___ it is time to eat.", "said", ["sed", "siad", "sayd"]], ["The dog ___ wet.", "was", ["wuz", "waz", "wsa"]], ["___ are my friends.", "They", ["Thay", "Tey", "Thae"]],
  ["I ___ a red bike.", "have", ["hav", "haev", "hafe"]], ["Please ___ here.", "come", ["kom", "coom", "comm"]], ["___ is your name?", "What", ["Wat", "Whut", "Wht"]],
  ["___ is my hat?", "Where", ["Wher", "Whare", "Wehre"]], ["Put it over ___.", "there", ["thare", "ther", "thear"]], ["This card is ___ Dad.", "from", ["frum", "form", "fom"]],
  ["Can I have ___ juice?", "some", ["som", "sume", "soem"]], ["Do ___ like cats?", "you", ["yu", "yoo", "uoy"]], ["We ___ happy.", "are", ["ar", "aer", "arr"]],
  ["I have ___ dog.", "one", ["wun", "oen", "wone"]], ["___ she like to swim?", "Does", ["Duz", "Dus", "Dose"]], ["I want a cup ___ milk.", "of", ["uv", "ov", "fo"]],
  ["Let's ___ at the book.", "look", ["lok", "luk", "loko"]], ["Come ___!", "here", ["heer", "hir", "hre"]], ["We ___ at the park.", "were", ["wer", "whre", "wure"]],
  ["I ___ to go to the zoo.", "want", ["wnat", "whant", "wnt"]], ["My ___ is Sam.", "friend", ["frend", "freind", "frind"]], ["I ___ my mom.", "love", ["luv", "lov", "loev"]],
  ["___ dog is big.", "This", ["Tis", "Thsi", "Dis"]], ["Look at ___ cat!", "that", ["taht", "tat", "thet"]], ["It is ___ big.", "very", ["verry", "vere", "vurry"]],
  ["Sit ___ me.", "with", ["wiht", "whith", "wih"]], ["We ___ to bed.", "went", ["whent", "wnet", "wint"]], ["The bug is ___.", "little", ["littel", "litle", "lettle"]],
  ["Can you ___ me?", "help", ["hlep", "halp", "hepl"]], ["The kids ___ fun.", "had", ["hed", "hda", "hadd"]], ["___ you go to the park?", "Did", ["Ded", "Dd", "Dbi"]],
  ["We ___ at home.", "play", ["plai", "paly", "pley"]], ["___ can we eat?", "When", ["Wen", "Whne", "Whan"]], ["I like ___ book.", "your", ["yor", "yuor", "yer"]],
  ["The cat sat ___ the mat.", "on", ["no", "onn", "un"]], ["I see ___ cats.", "two", ["tuw", "twoo", "tuo"]]];
const V25EN6_LOOK = [["was", ["saw", "wsa", "as"]], ["on", ["no", "one", "an"]], ["saw", ["was", "sow", "aws"]], ["no", ["on", "now", "not"]], ["it", ["ti", "is", "at"]],
  ["of", ["for", "off", "fo"]], ["top", ["pot", "tap", "opt"]], ["dog", ["bog", "dig", "gdo"]], ["big", ["dig", "bag", "gib"]], ["pot", ["top", "pit", "opt"]],
  ["net", ["ten", "nut", "not"]], ["who", ["how", "two", "ohw"]], ["how", ["who", "now", "hwo"]], ["got", ["tog", "get", "go"]], ["but", ["tub", "bat", "put"]],
  ["pan", ["nap", "pen", "nab"]], ["ten", ["net", "tan", "tin"]], ["stop", ["spot", "pots", "tops"]], ["are", ["ear", "era", "ate"]], ["and", ["an", "nad", "end"]],
  ["the", ["hte", "teh", "then"]], ["for", ["of", "fro", "four"]], ["said", ["sad", "siad", "side"]], ["they", ["then", "tehy", "them"]], ["from", ["form", "forn", "frmo"]]];
const V25EN6_MIX = ["said", "they", "have", "come", "what", "from", "some", "your", "look", "here", "were", "want", "when", "this", "that", "with", "play", "like", "went", "help", "jump", "down", "ride", "make", "blue", "good"];
addBank(6, "english", "sight", 0.3, function () {
  const k = R(0, 2);
  if (k === 0) {
    const [s, a, wr] = pick(V25EN6_SPS);
    return { q: `Which word is spelled the right way?<div class="sentence big-sentence">${s.replace("___", '<span class="blank">___</span>')}</div>`, say: `Which word is spelled the right way? ${s.replace("___", a)}`, opts: shuffle([a, ...wr]), ans: a, big: 1, why: `${cap(a)} is spelled ${V25EN6_spell(a)}. ${s.replace("___", a)}`, key: `v25w${s}`, v25: { f: "spell" } };
  }
  if (k === 1) {
    const [w, wr] = pick(V25EN6_LOOK);
    return { q: `Look closely! Find the word <b>${w}</b>.`, say: `Look closely! Find the word ${w}.`, opts: shuffle([w, ...wr]), ans: w, big: 1, why: `${cap(w)} is spelled ${V25EN6_spell(w)}.`, key: `v25l${w}`, v25: { f: "look", w } };
  }
  const w = pick(V25EN6_MIX);
  let mix = w;
  for (let g = 0; g < 30 && mix === w; g++) mix = shuffle(w.split("")).join("");
  if (mix === w) mix = w.split("").reverse().join("");
  const others = shuffle(V25EN6_MIX.filter(x => x !== w && x.length === w.length)).slice(0, 3);
  return { q: "These letters are mixed up. Which word do they make?", say: `These letters are mixed up: ${mix.split("").join(", ")}. Which word do they make?`, vis: `<div class="chips">${mix.split("").map(c => chip(c, c, "lg")).join("")}</div>`, opts: shuffle([w, ...others]), ans: w, big: 1, why: `The letters ${mix.split("").join(", ")} make ${w}: ${V25EN6_spell(w)}.`, key: `v25m${w}`, v25: { f: "mix", letters: mix.split("") } };
});
whyRule(6, "english", "sight", (q, picked) => {
  if (!q.v25) return null;
  const p = xPlain(picked), d = q.v25;
  if (!p || p === q.ans) return null;
  if (d.f === "spell") return `${xQ(p)} is not spelled right. We spell it ${V25EN6_spell(q.ans)}.`;
  if (d.f === "look") {
    if (p.split("").sort().join("") === d.w.split("").sort().join("")) return `${xQ(p)} has the same letters as ${xQ(d.w)}, but in a different order.`;
    return `${xQ(p)} is spelled ${V25EN6_spell(p)}, but ${xQ(d.w)} is spelled ${V25EN6_spell(d.w)}.`;
  }
  if (d.f === "mix") {
    const left = d.letters.slice();
    for (const c of p) { const i = left.indexOf(c); if (i < 0) return `${xQ(p)} needs the letter ${c}, but there is no ${c} in the mixed-up letters.`; left.splice(i, 1); }
    return null;
  }
  return null;
});

/* ---------------- Big & Small Letters: whole words in big/small letters, which word needs a capital ---------------- */
const V25EN6_CW = ["cat", "dog", "sun", "hat", "pig", "cup", "bed", "map", "fox", "bug", "jam", "net", "box", "van", "web", "rug", "ten", "lip", "mop", "hen", "bus", "fan", "gum", "kid", "yak", "zip", "owl", "egg"];
function V25EN6_near(w) {
  const out = [];
  for (let i = 0; i < w.length; i++) for (const c of (CONF[w[i]] || "")) { const v = w.slice(0, i) + c + w.slice(i + 1); if (v !== w && !V25EN6_BAN.test(v) && !CVC_BLOCK.test(v) && !out.includes(v)) out.push(v); }
  return shuffle(out);
}
/* [sentence with one word that needs a capital, that word, reason] */
const V25EN6_CAPS = [["my dog is big.", "my", "first"], ["the sun is hot.", "the", "first"], ["we like to swim.", "we", "first"], ["is it time to eat?", "is", "first"],
  ["can we play outside?", "can", "first"], ["look at the big moon!", "look", "first"], ["her hat is red.", "her", "first"], ["it is cold today.", "it", "first"],
  ["sam has a red ball.", "sam", "first"], ["ava can ride a bike.", "ava", "first"],
  ["Today I played with omar.", "omar", "name"], ["My friend leo has a cat.", "leo", "name"], ["Our dog is named rex.", "rex", "name"], ["The cat sat with nora.", "nora", "name"],
  ["The teacher said hi to kai.", "kai", "name"], ["Our cat ziggy naps a lot.", "ziggy", "name"], ["This is my friend ravi.", "ravi", "name"], ["I can see emma.", "emma", "name"],
  ["Can you help diego?", "diego", "name"],
  ["Can i come too?", "i", "I"], ["Mom and i read a book.", "i", "I"], ["Dad and i made pancakes.", "i", "I"], ["Zoe and i like to sing.", "i", "I"], ["Jin and i went home.", "i", "I"],
  ["We go to the park on saturday.", "saturday", "day"], ["School starts on monday.", "monday", "day"], ["The bus came on friday.", "friday", "day"],
  ["My birthday is in june.", "june", "month"], ["Snow fell in january.", "january", "month"], ["We pick apples in october.", "october", "month"]];
const V25EN6_CWHY = { first: "is the first word in the sentence", name: "is a name", I: "is the word I, which is always big", day: "is a day of the week", month: "is a month" };
addBank(6, "english", "case", 0.3, function () {
  const k = R(0, 2);
  if (k < 2) {
    const w = pick(V25EN6_CW), W = w.toUpperCase(), up = k === 1, near = V25EN6_near(w).slice(0, 3);
    if (!up) return { q: `Which word is <b>${W}</b> written in small letters?`, say: `Which word is ${w} written in small letters?`, vis: hw(W, "big"), opts: shuffle([w, ...near]), ans: w, big: 1, why: `In small letters, ${W} is ${w}. Each big letter has a small partner.`, key: `v25a${w}`, v25: { f: "word", shown: W } };
    return { q: `Which word is <b>${w}</b> written in big letters?`, say: `Which word is ${w} written in big letters?`, vis: hw(w, "big"), opts: shuffle([W, ...near.map(x => x.toUpperCase())]), ans: W, big: 1, why: `In big letters, ${w} is ${W}. Each small letter has a big partner.`, key: `v25b${w}`, v25: { f: "word", shown: w } };
  }
  const [s, a, why] = pick(V25EN6_CAPS);
  const words = [...new Set(s.replace(/[.?!]/g, "").split(" ").filter(x => /^[a-z]+$/.test(x) && x !== a))];
  const fixed = a === "i" ? s.replace(/\bi\b/, "I") : s.replace(new RegExp(`\\b${a}\\b`), cap(a));
  return { q: `Which word in this sentence needs a <b>big letter</b>?<div class="sentence big-sentence">${s}</div>`, say: `Which word in this sentence needs a big letter? ${s}`, opts: shuffle([a, ...shuffle(words).slice(0, 3)]), ans: a, big: 1, why: a === "i" ? `The word I is always a big letter: ${fixed}` : `${cap(a)} ${V25EN6_CWHY[why]}, so it starts with a big letter: ${fixed}`, key: `v25k${s}`, v25: { f: "cap" } };
});
whyRule(6, "english", "case", (q, picked) => {
  if (!q.v25) return null;
  const p = xPlain(picked), d = q.v25;
  if (!p || p === q.ans) return null;
  if (d.f === "word") {
    const S = d.shown;
    if (p.length !== S.length) return null;
    for (let i = 0; i < S.length; i++) {
      if (p[i].toLowerCase() !== S[i].toLowerCase()) {
        const toSmall = S[i] === S[i].toUpperCase();
        return `${xQ(p)} has ${p[i]} where ${xQ(S)} has ${S[i]}. ${toSmall ? `Small ${S[i].toLowerCase()} goes with big ${S[i]}` : `Big ${S[i].toUpperCase()} goes with small ${S[i]}`}.`;
      }
    }
    return null;
  }
  if (d.f === "cap") return `${xQ(p)} is not the first word, a name or I, so it starts with a small letter.`;
  return null;
});

/* ---------------- Ending Sounds: same ending sound, change the last letter ---------------- */
const V25EN6_EG = { t: ["cat", "hat", "net", "pot", "nut", "kit", "boat", "coat", "foot", "bat"], d: ["bed", "red", "mud", "lid", "road", "bird", "sad", "kid", "seed"],
  g: ["dog", "bag", "pig", "rug", "log", "egg", "mug", "jog", "flag"], n: ["sun", "hen", "pin", "van", "man", "ten", "fan", "run", "moon"],
  p: ["cup", "map", "top", "mop", "lip", "ship", "cap", "jump", "soap"], m: ["jam", "ham", "drum", "gum", "swim", "arm", "room", "broom"],
  b: ["cab", "web", "tub", "crab", "bib", "rub", "cub", "sub"], s: ["bus", "gas", "yes", "dress", "glass", "kiss", "mess", "plus"],
  k: ["duck", "sock", "back", "kick", "rock", "book", "milk", "desk"], l: ["bell", "doll", "hill", "ball", "seal", "bowl", "fill", "nail", "pool"] };
const V25EN6_EK = Object.keys(V25EN6_EG);
const V25EN6_eg = w => V25EN6_EK.find(k => V25EN6_EG[k].includes(w));
const V25EN6_ESWAP = [["cat", "p"], ["cat", "n"], ["cat", "b"], ["bed", "g"], ["bed", "t"], ["pig", "n"], ["pig", "t"], ["dog", "t"], ["bug", "n"], ["bug", "s"], ["map", "t"], ["map", "n"],
  ["map", "d"], ["bat", "g"], ["bat", "d"], ["pen", "t"], ["pen", "g"], ["hug", "t"], ["hug", "m"], ["rat", "m"], ["rat", "n"], ["rat", "g"], ["tap", "n"], ["tap", "g"],
  ["lip", "d"], ["pot", "d"], ["cub", "p"], ["web", "t"], ["sun", "b"], ["ham", "t"], ["hen", "m"], ["cot", "p"], ["log", "t"], ["cap", "t"], ["cap", "n"], ["mat", "p"],
  ["hit", "m"], ["bus", "d"], ["tub", "g"], ["rug", "n"], ["pin", "t"], ["man", "p"]];
addBank(6, "english", "endsound", 0.3, function () {
  if (Math.random() < 0.5) {
    const G = pick(V25EN6_EK), [x, a] = shuffle(V25EN6_EG[G]).slice(0, 2);
    const others = shuffle(V25EN6_EK.filter(k => k !== G)).slice(0, 3).map(k => pick(V25EN6_EG[k]));
    return { q: `Which word ends with the same sound as <b>${x}</b>?`, say: `Which word ends with the same sound as ${x}?`, vis: hw(x, "big"), opts: shuffle([a, ...others]), ans: a, big: 1, why: `${cap(x)} and ${a} both end with the ${G} sound.`, key: `v25e${x}-${a}`, v25: { f: "same", x } };
  }
  const [w, n] = pick(V25EN6_ESWAP), last = w.slice(-1), ans = w.slice(0, -1) + n, first = n + w.slice(1);
  const opts = uniq(ans, [w, V25EN6_BAN.test(first) || CVC_BLOCK.test(first) ? null : first]);
  return { q: `Change the last letter of <b>${w}</b> to <b>${n}</b>. What new word do you get?`, say: `Change the last letter of ${w} to the letter ${n}. What new word do you get?`, vis: hw(`${w.slice(0, -1)}<b class="hl">${last}</b>`, "big"), opts, ans, big: 1, why: `Keep ${w.slice(0, -1)} and change the ${last} to ${n}: ${ans}.`, key: `v25c${w}${n}`, v25: { f: "swap", w, n } };
});
whyRule(6, "english", "endsound", (q, picked) => {
  if (!q.v25) return null;
  const p = xPlain(picked), d = q.v25;
  if (!p || p === q.ans) return null;
  if (d.f === "same") { const gp = V25EN6_eg(p), gx = V25EN6_eg(d.x); if (!gp || !gx || gp === gx) return null; return `${xQ(p)} ends with the ${gp} sound, but ${xQ(d.x)} ends with the ${gx} sound.`; }
  if (d.f === "swap") {
    if (p === d.w) return `${xQ(p)} is the word we started with. It still ends with ${d.w.slice(-1)}.`;
    if (p === d.n + d.w.slice(1)) return `${xQ(p)} changes the first letter, not the last letter.`;
    return null;
  }
  return null;
});

/* ---------------- Color Words: color clues, spell the color, mixing paint ---------------- */
const V25EN6_CLUE = [["grass", "green"], ["snow", "white"], ["a fire truck", "red"], ["a lemon", "yellow"], ["a ripe banana", "yellow"], ["coal", "black"], ["mud", "brown"],
  ["chocolate", "brown"], ["a pumpkin", "orange"], ["a carrot", "orange"], ["an eggplant", "purple"], ["milk", "white"], ["a fluffy cloud", "white"], ["a crow", "black"],
  ["a strawberry", "red"], ["a ripe tomato", "red"], ["a lime", "green"], ["a tree trunk", "brown"], ["a blueberry", "blue"], ["a polar bear", "white"], ["an orange", "orange"],
  ["a cherry", "red"], ["an acorn", "brown"], ["broccoli", "green"], ["peas", "green", 1], ["a clear sky on a sunny day", "blue"], ["a stop sign", "red"], ["a school bus", "yellow"], ["a baby chick", "yellow"]];
const V25EN6_CN = ["red", "orange", "yellow", "green", "blue", "purple", "brown", "black", "white"];
const V25EN6_SWATCH = [["🔴", "🟠", "🟡", "🟢", "🔵", "🟣", "🟤", "⚫", "⚪"], ["🟥", "🟧", "🟨", "🟩", "🟦", "🟪", "🟫", "⬛", "⬜"], ["❤️", "🧡", "💛", "💚", "💙", "💜", "🤎", "🖤", "🤍"]];
const V25EN6_CBAD = { red: ["rad", "redd", "rde"], orange: ["orang", "ornge", "orenge"], yellow: ["yelow", "yello", "yallow"], green: ["grene", "gren", "greem"], blue: ["bloo", "blu", "bule"],
  purple: ["purpel", "perple", "purpl"], brown: ["broun", "brwon", "bron"], black: ["blak", "blac", "balck"], white: ["wite", "whte", "wihte"] };
const V25EN6_MIXC = [["red", "yellow", "orange"], ["yellow", "blue", "green"], ["red", "blue", "purple"], ["red", "white", "pink"], ["black", "white", "gray"]];
addBank(6, "english", "colors", 0.3, function () {
  const k = R(0, 2);
  if (k === 0) {
    const [t, c, pl] = pick(V25EN6_CLUE);
    return { q: `Read the clue. Which color is it?<div class="sentence big-sentence">It is the color of ${t}.</div>`, say: `Read the clue. It is the color of ${t}. Which color is it?`, opts: shuffle([c, ...shuffle(V25EN6_CN.filter(x => x !== c)).slice(0, 3)]), ans: c, big: 1, why: `${cap(t)} ${pl ? "are" : "is"} ${c}.`, key: `v25l${t}`, v25: { f: "clue", t, pl: pl ? 1 : 0 } };
  }
  if (k === 1) {
    const si = R(0, 2), ci = R(0, 8), c = V25EN6_CN[ci];
    return { q: "Which word names this color?", say: "Which word names this color? Pick the right spelling.", vis: `<span class="emo" style="font-size:96px">${V25EN6_SWATCH[si][ci]}</span>`, opts: shuffle([c, ...V25EN6_CBAD[c]]), ans: c, big: 1, why: `This color is ${c}, spelled ${V25EN6_spell(c)}.`, key: `v25s${c}${si}`, v25: { f: "spell" } };
  }
  const [a0, b0, c] = pick(V25EN6_MIXC), sw = Math.random() < 0.5, a = sw ? b0 : a0, b = sw ? a0 : b0;
  return { q: `If you mix <b>${a}</b> paint and <b>${b}</b> paint, what color do you get?`, say: `If you mix ${a} paint and ${b} paint, what color do you get?`, opts: shuffle([c, ...shuffle(["orange", "green", "purple", "pink", "gray", "brown"].filter(x => x !== c)).slice(0, 3)]), ans: c, big: 1, why: `${cap(a)} and ${b} mixed together make ${c}.`, key: `v25m${a}${b}`, v25: { f: "mix", a, b } };
});
whyRule(6, "english", "colors", (q, picked) => {
  if (!q.v25) return null;
  const p = xPlain(picked), d = q.v25;
  if (!p || p === q.ans) return null;
  if (d.f === "clue") return `${cap(d.t)} ${d.pl ? "are" : "is"} ${q.ans}, not ${p}.`;
  if (d.f === "spell") return `${xQ(p)} is not spelled right. ${cap(q.ans)} is spelled ${V25EN6_spell(q.ans)}.`;
  if (d.f === "mix") return `${cap(d.a)} and ${d.b} make ${q.ans}, not ${p}.`;
  return null;
});

/* ---------------- Picture Sentences: pick the sentence for a picture, read every word ---------------- */
const V25EN6_PS = [["🐄", "cow", "The cow eats grass."], ["🐴", "horse", "The horse runs fast."], ["🐢", "turtle", "The turtle is slow."], ["🐘", "elephant", "The elephant has a long trunk."],
  ["🦒", "giraffe", "The giraffe has a long neck."], ["🐧", "penguin", "The penguin lives where it is cold."], ["🐌", "snail", "The snail has a shell on its back."],
  ["🦋", "butterfly", "The butterfly has pretty wings."], ["🐙", "octopus", "The octopus has eight arms."], ["🦀", "crab", "The crab walks on the sand."],
  ["🐞", "ladybug", "The ladybug has black spots."], ["🐳", "whale", "The whale swims in the sea."], ["🍉", "watermelon", "The watermelon is juicy."],
  ["🍦", "ice cream", "I lick my ice cream.", "ice cream"], ["🍕", "pizza", "We eat pizza for lunch.", "pizza"], ["🚀", "rocket", "The rocket goes up to space."],
  ["🚒", "fire truck", "The fire truck has a loud siren."], ["🌈", "rainbow", "I see a rainbow in the sky."], ["☔", "umbrella", "I hold an umbrella in the rain."],
  ["🎸", "guitar", "He plays the guitar."], ["🚲", "bike", "I ride my bike."], ["⛵", "boat", "The boat sails on the lake."], ["🦉", "owl", "The owl hoots at night."],
  ["🌵", "cactus", "The cactus has sharp spines."], ["🧦", "socks", "I put on my socks.", "socks"], ["🦷", "tooth", "I lost a tooth."], ["🎒", "backpack", "My backpack is full of books."],
  ["🍔", "hamburger", "Dad grills a hamburger."]];
const V25EN6_psName = it => it[3] || V25EN6_art(it[1]);
const V25EN6_SUBJ = [["🐱", "cat"], ["🐶", "dog"], ["🐸", "frog"], ["🐻", "bear"], ["🐷", "pig"], ["🦆", "duck"], ["🐭", "mouse"], ["🐰", "rabbit"], ["🦊", "fox"], ["🦁", "lion"]];
const V25EN6_OBJ = [["⚽", "ball"], ["🎩", "hat"], ["🎂", "cake"], ["📖", "book"], ["🥁", "drum"], ["🎈", "balloon"], ["🍎", "apple"], ["🎁", "gift"], ["⭐", "star"], ["🍌", "banana"]];
const V25EN6_has = (s, o) => `The ${s} has ${V25EN6_art(o)}.`;
addBank(6, "english", "picsent", 0.3, function () {
  if (Math.random() < 0.5) {
    const it = pick(V25EN6_PS), others = shuffle(V25EN6_PS.filter(x => x !== it)).slice(0, 3), names = {};
    [it, ...others].forEach(x => { names[x[2]] = V25EN6_psName(x); });
    return { q: "Which sentence matches the picture?", say: "Look at the picture. Which sentence matches it?", vis: `<span class="emo" style="font-size:96px" title="${it[1]}">${it[0]}</span>`, opts: shuffle([it[2], ...others.map(x => x[2])]), ans: it[2], why: `The picture shows ${V25EN6_psName(it)}, and "${it[2]}" is about ${V25EN6_psName(it)}.`, key: `v25p${it[1]}`, v25: { f: "p2s", names, show: V25EN6_psName(it) } };
  }
  const [S, O] = [pick(V25EN6_SUBJ), pick(V25EN6_OBJ)], S2 = pick(V25EN6_SUBJ.filter(x => x !== S)), O2 = pick(V25EN6_OBJ.filter(x => x !== O));
  const ans = V25EN6_has(S[1], O[1]);
  return { q: "Which sentence matches the picture?", say: "Look at the picture. Read each sentence carefully. Which one matches?", vis: row(`<span class="emo xl" title="${S[1]}">${S[0]}</span>`, `<span class="emo xl" title="${O[1]}">${O[0]}</span>`), opts: shuffle([ans, V25EN6_has(S2[1], O[1]), V25EN6_has(S[1], O2[1]), V25EN6_has(S2[1], O2[1])]), ans, why: `The picture shows ${V25EN6_art(S[1])} with ${V25EN6_art(O[1])}: ${ans}`, key: `v25h${S[1]}-${O[1]}`, v25: { f: "has", s: S[1], o: O[1] } };
});
whyRule(6, "english", "picsent", (q, picked) => {
  if (!q.v25) return null;
  const p = xPlain(picked), d = q.v25;
  if (!p || p === q.ans) return null;
  if (d.f === "p2s") { const n = d.names[p]; if (!n) return null; return `That sentence is about ${n}, but the picture shows ${d.show}.`; }
  if (d.f === "has") {
    const m = p.match(/^The (\w+) has an? (\w+)\.$/); if (!m) return null;
    const bs = m[1] !== d.s, bo = m[2] !== d.o;
    if (bs && bo) return `The picture shows ${V25EN6_art(d.s)} and ${V25EN6_art(d.o)}, not ${V25EN6_art(m[1])} and ${V25EN6_art(m[2])}.`;
    if (bs) return `The picture shows ${V25EN6_art(d.s)}, not ${V25EN6_art(m[1])}.`;
    if (bo) return `The picture shows ${V25EN6_art(d.o)}, not ${V25EN6_art(m[2])}.`;
    return null;
  }
  return null;
});

/* ---------------- Word Families: build the picture word, not in the family ---------------- */
const V25EN6_FPIC = [["c", "at", "🐱"], ["h", "at", "🎩"], ["b", "at", "🦇"], ["r", "at", "🐀"], ["v", "an", "🚐"], ["m", "an", "👨"], ["p", "ig", "🐷"], ["b", "ug", "🐛"], ["h", "en", "🐔"],
  ["p", "en", "🖊️"], ["t", "en", "🔟"], ["m", "ap", "🗺️"], ["c", "ap", "🧢"], ["b", "ed", "🛏️"], ["sl", "ed", "🛷"], ["b", "ell", "🔔"], ["sh", "ell", "🐚"], ["s", "ock", "🧦"],
  ["l", "ock", "🔒"], ["d", "og", "🐶"], ["fr", "og", "🐸"], ["n", "ut", "🥜"], ["s", "un", "☀️"], ["b", "ox", "📦"], ["f", "ox", "🦊"], ["p", "in", "📌"], ["r", "ing", "💍"],
  ["c", "ake", "🎂"], ["sn", "ake", "🐍"], ["b", "ee", "🐝"], ["tr", "ee", "🌳"], ["st", "ar", "⭐"], ["c", "ar", "🚗"], ["g", "oat", "🐐"], ["c", "oat", "🧥"], ["m", "oon", "🌙"],
  ["sp", "oon", "🥄"], ["tr", "ain", "🚆"], ["sn", "ail", "🐌"], ["h", "and", "✋"], ["dr", "um", "🥁"]];
const V25EN6_ON1 = "bcdfghlmnprstw".split(""), V25EN6_ON2 = ["sl", "sh", "fr", "sn", "tr", "st", "sp", "dr", "cl", "bl", "gr", "pl"];
const V25EN6_FAMS = { at: ["cat", "hat", "bat", "mat", "rat", "sat"], an: ["can", "fan", "man", "pan", "van", "ran", "tan"], ap: ["cap", "map", "nap", "tap", "lap", "clap"],
  ag: ["bag", "tag", "wag", "rag", "flag"], ig: ["big", "dig", "pig", "wig", "fig", "jig"], ip: ["lip", "hip", "zip", "tip", "dip", "ship"], in: ["bin", "fin", "pin", "win", "tin", "spin"],
  op: ["hop", "mop", "top", "pop", "stop", "shop"], ot: ["hot", "pot", "dot", "cot", "not", "spot"], og: ["dog", "log", "fog", "jog", "frog"], ug: ["bug", "hug", "mug", "rug", "jug", "tug"],
  un: ["bun", "fun", "run", "sun"], ut: ["nut", "hut", "cut", "shut"], et: ["jet", "net", "pet", "wet", "vet", "get"], en: ["hen", "pen", "ten", "men", "den"], ed: ["bed", "red", "fed", "sled"],
  ell: ["bell", "well", "shell", "tell", "yell"], ill: ["hill", "fill", "will", "spill", "still"], ack: ["back", "sack", "pack", "snack", "black"], ock: ["sock", "rock", "lock", "clock"] };
const V25EN6_FK = Object.keys(V25EN6_FAMS);
addBank(6, "english", "wordfam", 0.3, function () {
  if (Math.random() < 0.5) {
    const [on, rime, e] = pick(V25EN6_FPIC), word = on + rime;
    const ok = x => x !== on && !V25EN6_BAN.test(x + rime) && !CVC_BLOCK.test(x + rime);
    const pool = on.length > 1 ? shuffle(V25EN6_ON2.filter(ok)).slice(0, 2).concat(shuffle(V25EN6_ON1.filter(ok)).slice(0, 1)) : shuffle(V25EN6_ON1.filter(ok)).slice(0, 3);
    return { q: "What goes in the blank to name the picture?", say: `What goes in the blank to make the word ${word}?`, vis: col(bigEmo(e), hw(`<span class="blank">?</span>${rime}`)), opts: shuffle([on, ...pool]), ans: on, big: 1, why: `${on} + ${rime} makes ${word}, in the -${rime} family.`, key: `v25b${word}`, v25: { f: "build", rime, word } };
  }
  const f = pick(V25EN6_FK), three = shuffle(V25EN6_FAMS[f]).slice(0, 3);
  const others = V25EN6_FK.filter(g => g !== f), near = others.filter(g => g[0] === f[0]), g = near.length && Math.random() < 0.7 ? pick(near) : pick(others);
  const odd = pick(V25EN6_FAMS[g].filter(w => !w.endsWith(f)));
  return { q: "Which word is <b>not</b> in the same word family?", say: "Which word is not in the same word family as the others?", opts: shuffle([...three, odd]), ans: odd, big: 1, why: `${cap(three[0])}, ${three[1]} and ${three[2]} end with -${f}. ${cap(odd)} ends with -${g}.`, key: `v25o${three.slice().sort().join("")}-${odd}`, v25: { f: "odd", fam: f } };
});
whyRule(6, "english", "wordfam", (q, picked) => {
  if (!q.v25) return null;
  const p = xPlain(picked), d = q.v25;
  if (!p || p === q.ans) return null;
  if (d.f === "build") return `${xQ(p)} would make ${xQ(p + d.rime)}, not ${xQ(d.word)}.`;
  if (d.f === "odd") { if (!p.endsWith(d.fam)) return null; return `${xQ(p)} ends with -${d.fam}, just like two of the other words.`; }
  return null;
});

/* ---------------- Action Words: what you do with things, what animals do, runs or run? ---------------- */
const V25EN6_ING = { read: "reading", eat: "eating", swim: "swimming", drink: "drinking", kick: "kicking", sing: "singing", draw: "drawing", sweep: "sweeping", wash: "washing", sleep: "sleeping",
  paint: "painting", cut: "cutting", ring: "ringing", fly: "flying", dig: "digging", write: "writing", ride: "riding", open: "opening", play: "playing", blow: "blowing", dry: "drying", sit: "sitting", jump: "jumping" };
/* [thing, action, wrong actions] */
const V25EN6_TOOL = [["a book", "read", ["eat", "swim", "drink"]], ["a cup of milk", "drink", ["read", "kick", "sing"]], ["a bike", "ride", ["eat", "read", "sing"]],
  ["a crayon", "draw", ["drink", "kick", "swim"]], ["a broom", "sweep", ["eat", "read", "sing"]], ["soap", "wash", ["eat", "kick", "read"]], ["a bed", "sleep", ["eat", "kick", "paint"]],
  ["a song", "sing", ["eat", "kick", "sweep"]], ["scissors", "cut", ["drink", "sing", "sleep"]], ["a bell", "ring", ["eat", "swim", "read"]], ["a kite", "fly", ["eat", "read", "drink"]],
  ["a shovel", "dig", ["drink", "sing", "read"]], ["a pencil", "write", ["eat", "swim", "sleep"]], ["a swimming pool", "swim", ["read", "sweep", "write"]], ["a soccer ball", "kick", ["read", "drink", "sleep"]],
  ["a jump rope", "jump", ["read", "eat", "drink"]], ["a bowl of soup", "eat", ["kick", "ride", "sleep"]], ["a gift", "open", ["drink", "sweep", "swim"]], ["a drum", "play", ["eat", "read", "sleep"]],
  ["a whistle", "blow", ["eat", "read", "sleep"]], ["a towel", "dry", ["eat", "read", "kick"]], ["a chair", "sit", ["drink", "kick", "swim"]], ["a paintbrush", "paint", ["drink", "kick", "sleep"]]];
/* [animal, what it does, wrong actions] */
const V25EN6_ANI = [["bird", "fly", ["bark", "moo", "oink"]], ["fish", "swim", ["bark", "moo", "roar"]], ["dog", "bark", ["quack", "moo", "oink"]], ["cow", "moo", ["bark", "quack", "roar"]],
  ["duck", "quack", ["moo", "bark", "roar"]], ["lion", "roar", ["quack", "moo", "oink"]], ["bee", "buzz", ["bark", "moo", "swim"]], ["frog", "hop", ["moo", "fly", "bark"]],
  ["horse", "gallop", ["quack", "fly", "buzz"]], ["cat", "purr", ["quack", "moo", "buzz"]], ["owl", "hoot", ["bark", "moo", "oink"]], ["pig", "oink", ["quack", "roar", "moo"]],
  ["monkey", "climb", ["quack", "moo", "buzz"]], ["worm", "wiggle", ["fly", "bark", "roar"]], ["snake", "slither", ["bark", "fly", "gallop"]], ["kangaroo", "hop", ["quack", "fly", "moo"]]];
/* [one, more than one, verb, verb + s, rest of sentence] */
const V25EN6_AGR = [["The dog", "The dogs", "run", "runs", "fast."], ["Leo", "Leo and Mia", "sing", "sings", "a song."], ["The cat", "The cats", "sleep", "sleeps", "on the bed."],
  ["The bird", "The birds", "fly", "flies", "up high."], ["Mom", "Mom and Dad", "cook", "cooks", "dinner."], ["The frog", "The frogs", "hop", "hops", "into the pond."],
  ["The baby", "The kids", "clap", "claps", "to the music."], ["Ava", "Ava and Kai", "read", "reads", "a book."], ["The cow", "The cows", "eat", "eats", "grass."],
  ["The duck", "The ducks", "swim", "swims", "in the lake."], ["Sam", "Sam and Zoe", "jump", "jumps", "over the puddle."], ["The horse", "The horses", "gallop", "gallops", "in the field."],
  ["The bee", "The bees", "buzz", "buzzes", "by the flower."], ["Nora", "Nora and Omar", "paint", "paints", "a picture."], ["The bear", "The bears", "climb", "climbs", "the tree."],
  ["My friend", "My friends", "play", "plays", "tag."], ["Dad", "Dad and I", "walk", "walks", "to the store."], ["The puppy", "The puppies", "dig", "digs", "a hole."],
  ["The teacher", "The teachers", "smile", "smiles", "at us."], ["Grandma", "Grandma and Grandpa", "bake", "bakes", "cookies."]];
addBank(6, "english", "actionwords", 0.3, function () {
  const k = R(0, 3);
  if (k === 0) {
    const [t, a, wr] = pick(V25EN6_TOOL);
    return { q: `Which action word goes with <b>${t}</b>?`, say: `Which action word goes with ${t}?`, opts: shuffle([a, ...wr]), ans: a, big: 1, why: `${cap(a)} goes with ${t}. ${cap(a)} is the action.`, key: `v25t${t}`, v25: { f: "tool", t } };
  }
  if (k === 1) {
    const [n, a, wr] = pick(V25EN6_ANI);
    return { q: `What does ${V25EN6_art(n)} do? Pick the <b>action word</b>.`, say: `What does ${V25EN6_art(n)} do? Pick the action word.`, opts: shuffle([a, ...wr]), ans: a, big: 1, why: `${cap(V25EN6_art(n))} can ${a}.`, key: `v25a${n}`, v25: { f: "ani", n } };
  }
  const [one, many, v, vs, rest] = pick(V25EN6_AGR), pl = Math.random() < 0.5, subj = pl ? many : one, ans = pl ? v : vs;
  return { q: `Which action word fits?<div class="sentence big-sentence">${subj} <span class="blank">___</span> ${rest}</div>`, say: `Which action word fits? ${subj} blank ${rest}`, opts: shuffle([v, vs]), ans, big: 1, why: `${subj} ${ans} ${rest} ${pl ? `“${subj}” means more than one, so there is no s.` : `“${subj}” means just one, so we use ${vs}.`}`, key: `v25g${subj}${v}`, v25: { f: "agr", subj, pl: pl ? 1 : 0 } };
});
whyRule(6, "english", "actionwords", (q, picked) => {
  if (!q.v25) return null;
  const p = xPlain(picked), d = q.v25;
  if (!p || p === q.ans) return null;
  if (d.f === "tool") { const ing = V25EN6_ING[p]; return ing ? `${cap(d.t)} ${/^(scissors)$/.test(d.t) ? "are" : "is"} not for ${ing}.` : null; }
  if (d.f === "ani") return `${cap(V25EN6_art(d.n))} does not ${p}.`;
  if (d.f === "agr") return d.pl ? `${xQ(d.subj)} means more than one, so we say ‘${d.subj} ${q.ans}’ with no s.` : `${xQ(d.subj)} means just one, so we say ‘${d.subj} ${q.ans}’.`;
  return null;
});

/* ---------------- Question Words: answer from a tiny story, why and how ---------------- */
const V25EN6_DO = [["ate", "eat", "a pear"], ["read", "read", "a book"], ["found", "find", "a shell"], ["saw", "see", "a frog"], ["drew", "draw", "a bird"], ["flew", "fly", "a kite"],
  ["found", "find", "a coin"], ["picked", "pick", "a flower"], ["kicked", "kick", "a ball"], ["built", "build", "a fort"]];
const V25EN6_WHERE = ["at the park", "in the yard", "at the beach", "at Grandma's house", "by the lake"];
const V25EN6_WHEN = ["on Sunday", "after lunch", "in the morning", "after school", "on Saturday", "before dinner"];
const V25EN6_KIND = { Who: "who, a person", What: "what, a thing", Where: "where, a place", When: "when, a time" };
const V25EN6_QWB = [["because it was raining", "Why"], ["because I was sleepy", "Why"], ["because the dog was hungry", "Why"], ["because it is my birthday", "Why"], ["because he was cold", "Why"],
  ["because she lost her mitten", "Why"], ["by bus", "How"], ["by bike", "How"], ["by train", "How"], ["by boat", "How"], ["very carefully", "How"], ["with a spoon", "How"],
  ["on foot", "How"], ["very slowly", "How"], ["the mail carrier", "Who"], ["a blue kite", "What"], ["at the pool", "Where"], ["at bedtime", "When"]];
const V25EN6_QWK = { Who: "a person", What: "a thing", Where: "a place", When: "a time", Why: "a reason", How: "the way something is done" };
addBank(6, "english", "qwords", 0.3, function () {
  if (Math.random() < 0.65) {
    const who = pick(KIDS), [past, base, thing] = pick(V25EN6_DO), where = pick(V25EN6_WHERE), when = pick(V25EN6_WHEN), story = `${who} ${past} ${thing} ${where} ${when}.`;
    const kind = pick(["Who", "What", "Where", "When"]);
    const qs = { Who: `Who ${past} ${thing}?`, What: `What did ${who} ${base}?`, Where: `Where did ${who} ${base} ${thing}?`, When: `When did ${who} ${base} ${thing}?` }[kind];
    const parts = { Who: who, What: thing, Where: where, When: when }, ans = parts[kind];
    return { q: `${passage(story)}<b>${qs}</b>`, say: `${story} ${qs}`, opts: shuffle(Object.values(parts)), ans, why: `${kind} asks about ${V25EN6_KIND[kind].split(", ")[1]}. The story says ${who} ${past} ${thing} ${where} ${when}, so the answer is ${ans}.`, key: `v25s${story}${kind}`, v25: { f: "story", kind, parts } };
  }
  const [a, w] = pick(V25EN6_QWB), opts = shuffle([w, ...shuffle(["Who", "What", "Where", "When", "Why", "How"].filter(x => x !== w)).slice(0, 3)]);
  return { q: `The answer is “<b>${a}</b>.” Which question word fits best?`, say: `The answer is ${a}. Which question word fits best?`, opts, ans: w, big: 1, why: `“${cap(a)}” tells ${V25EN6_QWK[w]}, so the question starts with ${w}.`, key: `v25w${a}`, v25: { f: "word", a } };
});
whyRule(6, "english", "qwords", (q, picked) => {
  if (!q.v25) return null;
  const p = xPlain(picked), d = q.v25;
  if (!p || p === q.ans) return null;
  if (d.f === "story") { const pk = Object.keys(d.parts).find(k => d.parts[k] === p); if (!pk) return null; return `${xQ(p)} tells ${pk.toLowerCase()}, but the question asks ${d.kind.toLowerCase()}.`; }
  if (d.f === "word") { const pk = V25EN6_QWK[p]; if (!pk) return null; return `${p} asks about ${pk}, but ${xQ(d.a)} tells ${V25EN6_QWK[q.ans]}.`; }
  return null;
});

/* ---------------- ABC Neighbors: ABC order of words, letters in ABC order ---------------- */
const V25EN6_AW = ["apple", "ant", "bus", "bed", "cat", "cup", "dog", "duck", "egg", "elf", "fish", "fan", "goat", "gum", "hat", "hen", "igloo", "ink", "jam", "jet", "kite", "kid", "lion", "lamp",
  "moon", "mop", "nest", "nut", "owl", "ox", "pig", "pen", "queen", "quilt", "rug", "rat", "sun", "sock", "top", "tent", "umbrella", "up", "van", "vest", "web", "wig", "yak", "yarn", "zoo", "zip"];
addBank(6, "english", "abcnext", 0.3, function () {
  if (Math.random() < 0.5) {
    const n = R(3, 4), ws = [];
    for (const w of shuffle(V25EN6_AW)) { if (!ws.some(x => x[0] === w[0])) ws.push(w); if (ws.length === n) break; }
    const first = Math.random() < 0.65, sorted = ws.slice().sort(), ans = first ? sorted[0] : sorted[n - 1];
    return { q: `Which word comes <b>${first ? "first" : "last"}</b> in ABC order?`, say: `Which word comes ${first ? "first" : "last"} in ABC order?`, opts: shuffle(ws), ans, big: 1, why: `Look at the first letters: ${sorted.map(w => w[0]).join(", ")}. ${cap(ans)} starts with ${ans[0]}, which comes ${first ? "first" : "last"}.`, key: `v25w${sorted.join("")}${first}`, v25: { f: "word", first: first ? 1 : 0 } };
  }
  const low = Math.random() < 0.5, idx = shuffle(range(0, 25)).slice(0, 3).sort((a, b) => a - b), L = idx.map(i => low ? ALPHA[i].toLowerCase() : ALPHA[i]);
  const perms = [[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]].map(p => p.map(i => L[i]).join(", "));
  const ans = perms[0];
  return { q: "Which letters are in <b>ABC order</b>?", say: "Which group of letters is in ABC order?", opts: shuffle([ans, ...shuffle(perms.slice(1)).slice(0, 3)]), ans, big: 1, why: `In the ABC, ${L[0]} comes before ${L[1]}, and ${L[1]} comes before ${L[2]}: ${ans}.`, key: `v25l${L.join("")}`, v25: { f: "letters" } };
});
whyRule(6, "english", "abcnext", (q, picked) => {
  if (!q.v25) return null;
  const p = xPlain(picked), d = q.v25;
  if (!p || p === q.ans) return null;
  if (d.f === "word") {
    const a = String(q.ans);
    if (d.first) return `${xQ(p)} starts with ${p[0]}, and ${p[0]} comes after ${a[0]} in the ABC.`;
    return `${xQ(p)} starts with ${p[0]}, and ${p[0]} comes before ${a[0]} in the ABC.`;
  }
  if (d.f === "letters") {
    const L = p.split(", ");
    for (let i = 0; i + 1 < L.length; i++) if (L[i].toUpperCase() > L[i + 1].toUpperCase()) return `${L[i + 1]} comes before ${L[i]} in the ABC, so ${L[i]}, ${L[i + 1]} is out of order.`;
    return null;
  }
  return null;
});

/* ---------------- Word Groups: new groups, finish the group, name the group ---------------- */
/* [group name (option), "is ___" phrase, plural phrase, words] — no word fits two groups */
const V25EN6_GR = [["Toys", "a toy", "toys", ["doll", "kite", "yo-yo", "puzzle", "blocks", "teddy bear", "jump rope", "marbles"]],
  ["Kitchen things", "a kitchen thing", "kitchen things", ["pot", "pan", "spoon", "fork", "plate", "bowl", "oven", "whisk"]],
  ["Places", "a place", "places", ["park", "school", "zoo", "farm", "beach", "store", "library", "pond"]],
  ["Weather", "a kind of weather", "kinds of weather", ["rain", "snow", "wind", "fog", "storm", "hail", "sunshine"]],
  ["Feelings", "a feeling", "feelings", ["happy", "sad", "mad", "glad", "proud", "calm", "silly", "scared"]],
  ["Family", "a family member", "family members", ["mom", "dad", "sister", "brother", "grandma", "grandpa", "aunt", "uncle", "cousin"]],
  ["Jobs", "a job", "jobs", ["doctor", "teacher", "chef", "farmer", "pilot", "nurse", "baker", "vet"]],
  ["Plants", "a plant", "plants", ["tree", "flower", "grass", "bush", "cactus", "vine", "moss", "fern"]],
  ["Shapes", "a shape", "shapes", ["circle", "square", "triangle", "oval", "rectangle", "diamond"]],
  ["Bugs", "a bug", "bugs", ["ant", "bee", "moth", "ladybug", "beetle", "cricket", "flea"]]];
const V25EN6_grOf = w => V25EN6_GR.find(g => g[3].includes(w));
addBank(6, "english", "wordgroups", 0.3, function () {
  const g = pick(V25EN6_GR), others = shuffle(V25EN6_GR.filter(x => x !== g)), [a, b, c, d] = shuffle(g[3]);
  if (Math.random() < 0.55) {
    return { q: `Which word goes with <b>${a}</b>, <b>${b}</b> and <b>${c}</b>?`, say: `Which word goes with ${a}, ${b} and ${c}?`, opts: shuffle([d, ...others.slice(0, 3).map(x => pick(x[3]))]), ans: d, big: 1, why: `${cap(a)}, ${b}, ${c} and ${d} are all ${g[2]}.`, key: `v25g${[a, b, c].sort().join("")}-${d}`, v25: { f: "fit", g: g[0], shown: [a, b, c] } };
  }
  return { q: `<b>${a}</b>, <b>${b}</b>, <b>${c}</b>: what group are these words in?`, say: `${a}, ${b}, ${c}. What group are these words in?`, opts: shuffle([g[0], ...others.slice(0, 3).map(x => x[0])]), ans: g[0], big: 1, why: `${cap(a)}, ${b} and ${c} are all ${g[2]}.`, key: `v25n${[a, b, c].sort().join("")}`, v25: { f: "name", w: a } };
});
whyRule(6, "english", "wordgroups", (q, picked) => {
  if (!q.v25) return null;
  const p = xPlain(picked), d = q.v25;
  if (!p || p === q.ans) return null;
  if (d.f === "fit") { const pg = V25EN6_grOf(p), g = V25EN6_GR.find(x => x[0] === d.g); if (!pg || !g || pg === g) return null; return `${xQ(p)} is ${pg[1]}, but ${d.shown.join(", ")} are ${g[2]}.`; }
  if (d.f === "name") { const pg = V25EN6_GR.find(x => x[0] === p), wg = V25EN6_grOf(d.w); if (!pg || !wg || pg === wg) return null; return `These words are not ${pg[2]}. ${cap(d.w)} is ${wg[1]}.`; }
  return null;
});

/* ---------------- Word Order: which sentence makes sense, which sentence uses the word cards ---------------- */
/* [sentence, [[word, swap-in word], [word, swap-in word]]] — every two-word swap after the first word makes no sense */
const V25EN6_WO = [["The cat sleeps on the bed.", [["cat", "dog"], ["bed", "rug"]]], ["My dog likes to dig.", [["dog", "cat"], ["dig", "run"]]], ["We ate lunch at noon.", [["lunch", "dinner"], ["noon", "home"]]],
  ["A bird sat in the tree.", [["bird", "cat"], ["tree", "nest"]]], ["The fish swim in the pond.", [["fish", "ducks"], ["pond", "lake"]]], ["Mom reads me a story.", [["Mom", "Dad"], ["story", "book"]]],
  ["The kids play in the snow.", [["kids", "dogs"], ["snow", "sand"]]], ["I put on my coat.", [["coat", "hat"], ["coat", "boots"]]], ["The baby drinks her milk.", [["baby", "kitten"], ["milk", "juice"]]],
  ["We go to the zoo.", [["zoo", "park"], ["go", "went"]]], ["Ben has a big kite.", [["kite", "ball"], ["big", "red"]]], ["The frog jumps into the pond.", [["frog", "duck"], ["pond", "lake"]]],
  ["Dad washes the car.", [["car", "dog"], ["car", "bike"]]], ["The moon is very bright.", [["moon", "sun"], ["bright", "big"]]], ["Zoe can tie her shoes.", [["Zoe", "Mia"], ["shoes", "boots"]]],
  ["The bus stops at the corner.", [["bus", "car"], ["corner", "store"]]], ["We plant seeds in spring.", [["seeds", "trees"], ["spring", "May"]]], ["My cat has soft fur.", [["cat", "dog"], ["soft", "white"]]],
  ["Owls hunt at night.", [["Owls", "Bats"], ["Owls", "Cats"]]], ["Lily gave me a hug.", [["hug", "pen"], ["hug", "sticker"]]], ["The rain made a puddle.", [["puddle", "mess"], ["puddle", "pond"]]],
  ["I brush my teeth at night.", [["teeth", "hair"], ["night", "noon"]]], ["Sam drew a funny dog.", [["dog", "cat"], ["funny", "big"]]], ["The ducks swim in a row.", [["ducks", "geese"], ["row", "line"]]],
  ["Kai rides his bike to school.", [["bike", "scooter"], ["school", "class"]]], ["We clap our hands.", [["clap", "wash"], ["clap", "raise"]]], ["The pig rolls in the mud.", [["pig", "dog"], ["mud", "grass"]]],
  ["My sister reads a book.", [["sister", "brother"], ["book", "poem"]]], ["The dog ran after the ball.", [["dog", "cat"], ["ball", "stick"]]], ["Ants carry food to the hill.", [["hill", "nest"], ["food", "leaves"]]],
  ["The wind blew my hat off.", [["hat", "scarf"], ["hat", "cap"]]], ["We sing songs in class.", [["class", "school"], ["songs", "poems"]]], ["The chick came out of the egg.", [["egg", "shell"], ["chick", "bird"]]]];
const V25EN6_ws = s => s.replace(/[.?!]$/, "").split(" ");
addBank(6, "english", "wordorder", 0.3, function () {
  const [s, subs] = pick(V25EN6_WO), ws = V25EN6_ws(s), end = s.slice(-1);
  if (Math.random() < 0.5) {
    const swaps = [];
    for (let i = 1; i + 1 < ws.length; i++) { const t = ws.slice(); [t[i], t[i + 1]] = [t[i + 1], t[i]]; swaps.push(t.join(" ") + end); }
    return { q: "Which sentence makes sense?", say: "Read each one. Which sentence makes sense?", opts: shuffle([s, ...shuffle(swaps).slice(0, 3)]), ans: s, why: `"${s}" has its words in an order that makes sense.`, key: `v25m${s}`, v25: { f: "swap", s } };
  }
  const tiles = shuffle(ws);
  const alt = subs.map(([a, b]) => ws.map(w => w === a ? b : w).join(" ") + end);
  return { q: "Which sentence uses all of these word cards and no others?", say: `Which sentence uses all of these word cards and no others? ${tiles.join(", ")}.`, vis: `<div class="chips">${tiles.map(w => chip(w, w, "lg")).join("")}</div>`, opts: shuffle([s, ...alt]), ans: s, why: `Put the cards in order: ${s}`, key: `v25c${s}`, v25: { f: "cards", s } };
});
whyRule(6, "english", "wordorder", (q, picked) => {
  if (!q.v25) return null;
  const p = xPlain(picked), d = q.v25;
  if (!p || p === xPlain(q.ans)) return null;
  const A = V25EN6_ws(d.s), P = V25EN6_ws(p);
  if (d.f === "swap") {
    for (let i = 0; i + 1 < A.length; i++) if (A[i] !== P[i]) { if (P[i] === A[i + 1] && P[i + 1] === A[i]) return `Here ${xQ(P[i])} and ${xQ(P[i + 1])} are in the wrong order, so it does not make sense.`; return null; }
    return null;
  }
  if (d.f === "cards") {
    const left = A.slice();
    for (const w of P) { const i = left.indexOf(w); if (i < 0) return `This one uses ${xQ(w)}, but there is no ${xQ(w)} card.`; left.splice(i, 1); }
    return null;
  }
  return null;
});

