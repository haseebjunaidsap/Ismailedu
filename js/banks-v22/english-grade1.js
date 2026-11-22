/* =====================================================================
   v22 · Age 6 · English (EN6V_)
   Part A: two new topics: Word Groups (L.1.5a) and Word Order (L.1.1j / RF.1.1a).
   Part B: more questions for every existing age-6 English topic.
   ===================================================================== */

/* =========================== PART A =========================== */

/* ---------- New topic: Word Groups ---------- */
/* [key, group name (option), "is ___" phrase, emoji, words] — no word may fit two groups */
const EN6V_GROUPS = [
  ["animal", "Animals", "an animal", "🐾", ["cat", "dog", "pig", "cow", "horse", "sheep", "goat", "duck", "lion", "bear", "mouse", "owl", "zebra", "tiger", "rabbit", "monkey", "fox", "frog"]],
  ["food", "Food", "a food", "🍎", ["apple", "bread", "cake", "egg", "rice", "soup", "pizza", "banana", "grapes", "carrot", "corn", "cheese", "pie", "cookie", "peas", "jam"]],
  ["clothes", "Clothes", "something you wear", "👕", ["hat", "sock", "shirt", "coat", "dress", "shoe", "boot", "pants", "scarf", "mitten", "skirt", "jacket"]],
  ["body", "Body parts", "a body part", "👃", ["nose", "ear", "hand", "foot", "leg", "arm", "eye", "knee", "toe", "chin", "mouth", "neck", "finger", "elbow"]],
  ["ride", "Things to ride", "something you ride", "🚗", ["car", "bus", "bike", "truck", "train", "boat", "plane", "van", "jet", "ship", "wagon", "scooter", "taxi", "tractor"]],
  ["color", "Colors", "a color", "🎨", ["red", "blue", "green", "yellow", "pink", "purple", "brown", "black", "white", "gray"]],
  ["number", "Numbers", "a number", "🔢", ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"]],
];
const EN6V_grpOf = w => EN6V_GROUPS.find(g => g[4].includes(w));
const EN6V_grpByName = n => EN6V_GROUPS.find(g => g[1] === n);
topic(6, "english", {
  id: "wordgroups", title: "Word Groups", icon: "🗂️", blurb: "Sort words into groups like animals and food.",
  lesson: [
    { t: "Words that go together", say: "Some words belong in the same group. Cat, dog and pig are all animals.", html: `<div class="card-grid">${[["🐱", "cat"], ["🐶", "dog"], ["🐷", "pig"]].map(([e, w]) => picCard(e, w, w)).join("")}</div>` + note("They are all <b>animals</b>.") },
    { t: "Lots of groups", say: "There are many groups. Apple is a food. Hat is something you wear. Bus is something you ride.", html: table([["🐾 Animals", "cat, cow, duck"], ["🍎 Food", "apple, bread, corn"], ["👕 Clothes", "hat, sock, coat"], ["🚗 Things to ride", "bus, bike, train"]], ["Group", "Words"]) },
    { t: "Which one does not belong?", say: "Red, blue, green and dog. Red, blue and green are colors. Dog is an animal, so dog does not belong.", html: `<div class="chips">${["red", "blue", "green"].map(w => chip(w, w, "lg")).join("")}${chip("dog ✘", "dog", "lg")}</div>` + note("Ask: what group are most of the words in?") },
  ],
  gen() {
    const k = R(0, 2), g = pick(EN6V_GROUPS), w = pick(g[4]), others = shuffle(EN6V_GROUPS.filter(x => x !== g));
    if (k === 0) {
      const opts = shuffle([w, ...others.slice(0, 3).map(x => pick(x[4]))]);
      return { q: `Which word is <b>${g[2]}</b>?`, say: `Which word is ${g[2]}?`, vis: bigEmo(g[3]), opts, ans: w, big: 1, why: `${cap(w)} is ${g[2]}.`, key: "g" + g[0] + w, x: { f: "pick", g: g[0] } };
    }
    if (k === 1) {
      const opts = shuffle([g[1], ...others.slice(0, 3).map(x => x[1])]);
      return { q: `Which group does <b>${w}</b> belong in?`, say: `Which group does ${w} belong in?`, vis: hw(w, "big"), opts, ans: g[1], big: 1, why: `${cap(w)} is ${g[2]}, so it goes in ${g[1]}.`, key: "b" + w, x: { f: "group", w } };
    }
    const three = shuffle(g[4]).slice(0, 3), odd = pick(others[0][4]);
    return { q: "Which word does <b>not</b> belong?", say: "Which word does not belong?", opts: shuffle([...three, odd]), ans: odd, big: 1, why: `${cap(three[0])}, ${three[1]} and ${three[2]} are ${g[1].toLowerCase()}. ${cap(odd)} is ${others[0][2]}.`, key: "o" + odd + g[0], x: { f: "odd", g: g[0] } };
  },
});
TRICK_ADD(6, "english", "wordgroups", "Say “Is it an animal? Is it a food?” Find the group that fits the word.");
whyRule(6, "english", "wordgroups", (q, picked) => {
  if (!q.x) return null;
  const p = xPlain(picked);
  if (p === q.ans) return null;
  if (q.x.f === "pick") {
    const pg = EN6V_grpOf(p), tg = EN6V_GROUPS.find(g => g[0] === q.x.g);
    if (!pg || !tg || pg === tg) return null;
    return `${xQ(cap(p))} is ${pg[2]}, not ${tg[2]}.`;
  }
  if (q.x.f === "group") {
    const wg = EN6V_grpOf(q.x.w), pg = EN6V_grpByName(p);
    if (!wg || !pg || wg === pg) return null;
    return `${xQ(cap(q.x.w))} is ${wg[2]}, not ${pg[2]}.`;
  }
  if (q.x.f === "odd") {
    const pg = EN6V_grpOf(p);
    if (!pg || pg[0] !== q.x.g) return null;
    return `${xQ(cap(p))} is ${pg[2]}, just like two of the other words.`;
  }
  return null;
});

/* ---------- New topic: Word Order ---------- */
/* Each sentence: only the first word has a big letter, no word is used twice, ends with a period. */
const EN6V_SENTS = ["The dog can run.", "The cat is big.", "We like to play.", "My hat is red.", "The sun is hot.", "A frog can hop.",
  "The bird can fly.", "We go to school.", "The fish can swim.", "My mom is here.", "Dad has a car.", "The cow eats grass.",
  "We sing a song.", "The duck is wet.", "My dog likes bones.", "The bus is yellow.", "She has a kite.", "He can jump high.",
  "The moon is up.", "We play with blocks.", "The pig is pink.", "My cat naps a lot.", "The ball is round.", "They ride the bus.",
  "The tree is tall.", "Mom made a cake.", "The bee can buzz.", "We read a book.", "The cup is full.", "My bike is blue.",
  "The fox has a tail.", "Birds sing in trees.", "The baby is happy.", "We eat lunch.", "The snow is cold.", "My shoes are new.",
  "The horse runs fast.", "She likes red apples.", "He reads to me.", "The lamp is on.", "We swim in a lake.", "The cake is yummy.",
  "Ducks can swim.", "The owl is awake.", "My sister is six.", "The van is big.", "We pet the goat.", "The milk is cold."];
const EN6V_words = s => s.replace(/\.$/, "").split(" ");
const EN6V_sorted = ws => ws.slice().sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
function EN6V_scramble(ws) {
  for (let g = 0; g < 60; g++) {
    const s = shuffle(ws);
    if (s[0] !== ws[0] && s.join(" ") !== ws.join(" ")) return s.join(" ") + ".";
  }
  return null;
}
const EN6V_NEED = ["a big first letter", "a period at the end"];
topic(6, "english", {
  id: "wordorder", title: "Word Order", icon: "🧱", blurb: "Put words in order to make a sentence.",
  lesson: [
    { t: "Words go in order", say: "A sentence has its words in an order that makes sense. The dog can run.", html: `<div class="sentence big-sentence">The dog can run.</div>` + note("Mixed up: <b>run dog The can.</b> That does not make sense!") },
    { t: "Big letter first", say: "The first word of a sentence starts with a big letter. Look for it to find the first word.", html: `<div class="chips">${["can", "The", "run", "dog"].map(w => chip(w === "The" ? `<b class="hl">T</b>he` : w, w, "lg")).join("")}</div>` + note("<b>The</b> has a big letter, so it goes first.") },
    { t: "Period at the end", say: "A sentence ends with a period. The word with the period goes last.", html: `<div class="sentence big-sentence">The cat is big<b class="hl">.</b></div>` + note("Big letter at the start, period at the end.") },
  ],
  gen() {
    const s = pick(EN6V_SENTS), ws = EN6V_words(s), k = R(0, 4);
    if (k === 0) {
      const wrong = [];
      for (let g = 0; g < 20 && wrong.length < 2; g++) { const x = EN6V_scramble(ws); if (x && !wrong.includes(x)) wrong.push(x); }
      return { q: "Which sentence has the words in the <b>right order</b>?", say: "Which sentence has the words in the right order?", opts: shuffle([s, ...wrong]), ans: s, why: `"${s}" starts with a big letter and makes sense.`, key: "r" + s, x: { f: "order", s } };
    }
    if (k === 1) {
      const sw = EN6V_sorted(ws);
      const opts = uniq(ws[0], shuffle(ws.slice(1)));
      return { q: "These words are mixed up. Which word comes <b>first</b>?", say: `These words are mixed up: ${sw.join(", ")}. Which word comes first?`, vis: `<div class="chips">${sw.map(w => chip(w, w, "lg")).join("")}</div>`, opts, ans: ws[0], big: 1, why: `${ws[0]} has a big letter, so it starts the sentence: ${s}`, key: "f" + s, x: { f: "first", s } };
    }
    if (k === 2) {
      const last = ws[ws.length - 1] + ".", shown = ws.slice(0, -1).concat([last]), sw = EN6V_sorted(shown);
      const opts = uniq(last, shuffle(ws.slice(0, -1)));
      return { q: "These words are mixed up. Which word comes <b>last</b>?", say: `These words are mixed up: ${sw.map(w => w.replace(".", "")).join(", ")}. Which word comes last?`, vis: `<div class="chips">${sw.map(w => chip(w, w.replace(".", ""), "lg")).join("")}</div>`, opts, ans: last, big: 1, why: `The period shows the end, so ${EN6V_last(last)} goes last: ${s}`, key: "l" + s, x: { f: "last", s } };
    }
    const noCap = k === 3, shown = noCap ? s[0].toLowerCase() + s.slice(1) : s.slice(0, -1), ans = EN6V_NEED[noCap ? 0 : 1];
    return { q: `What does this sentence need?<div class="sentence big-sentence">${shown}</div>`, say: `What does this sentence need? ${shown}`, opts: EN6V_NEED.slice(), ans, why: noCap ? `A sentence starts with a big letter: ${s}` : `A sentence ends with a period: ${s}`, key: (noCap ? "c" : "p") + s, x: { f: "need", noCap } };
  },
});
function EN6V_last(w) { return `“${w.replace(".", "")}”`; }
TRICK_ADD(6, "english", "wordorder", "Find the word with the big letter. It goes first. The word with the period goes last.");
whyRule(6, "english", "wordorder", (q, picked) => {
  if (!q.x) return null;
  const p = xPlain(picked);
  if (p === xPlain(q.ans)) return null;
  if (q.x.f === "order") {
    if (!/^[a-z]/.test(p)) return null;
    return "This one starts with a small letter, so its words are mixed up.";
  }
  if (q.x.f === "first") {
    if (!/^[a-z]/.test(p)) return null;
    return `${xQ(p)} starts with a small letter, so it does not go first.`;
  }
  if (q.x.f === "last") {
    if (/\.$/.test(p)) return null;
    return `${xQ(p)} has no period after it, so it does not go last.`;
  }
  if (q.x.f === "need") {
    if (p === EN6V_NEED[0] && !q.x.noCap) return "This sentence already starts with a big letter.";
    if (p === EN6V_NEED[1] && q.x.noCap) return "This sentence already ends with a period.";
    return null;
  }
  return null;
});

/* =========================== PART B =========================== */

/* ---------- Sight Words: more fill-in sentences ---------- */
SIGHT_S.push(
  ["I have a lot ___ toys.", "of", ["is", "we", "the"], "🧸"],
  ["___ like to play.", "They", ["Is", "The", "Of"], "👫"],
  ["The cat ___ sad.", "was", ["the", "and", "of"], "😿"],
  ["___ is your name?", "What", ["And", "The", "Of"], "📛"],
  ["The ball is over ___.", "there", ["the", "and", "of"], "🏐"],
  ["This gift is ___ Mom.", "from", ["is", "the", "and"], "🎁"],
  ["We ___ at the zoo.", "were", ["the", "and", "of"], "🦒"],
  ["I ___ see the moon.", "could", ["the", "and", "of"], "🌙"],
  ["___ can we go?", "When", ["The", "And", "Of"], "🗓️"],
  ["I see ___ stars.", "many", ["is", "of", "and"], "✨"],
  ["Can I have ___ juice?", "some", ["is", "of", "and"], "🧃"],
  ["Please ___ it on the table.", "put", ["the", "is", "of"], "🍽️"],
  ["They ate ___ lunch.", "their", ["is", "and", "of"], "🥪"],
  ["I ___ like a cookie.", "would", ["the", "is", "of"], "🍪"],
  ["Dad ___ home.", "came", ["the", "of", "and"], "🏡"],
  ["The bird ___ away.", "flew", ["the", "of", "and"], "🐦"],
  ["___ are my books.", "These", ["The", "Of", "And"], "📚"],
  ["I am ___ tall.", "very", ["the", "of", "and"], "🦒"],
  ["The dog is ___ the bed.", "under", ["the", "of", "we"], "🐕"],
  ["We ___ our hands.", "wash", ["the", "of", "and"], "🧼"],
  ["I ___ a song.", "sing", ["the", "of", "and"], "🎤"],
  ["Look ___ at the sky!", "up", ["of", "and", "the"], "☁️"],
  ["Sit ___ me.", "by", ["the", "of", "is"], "🪑"],
  ["I ___ my mom.", "help", ["the", "of", "and"], "🧺"],
  ["___ you like it?", "Do", ["The", "Of", "And"], "🤔"],
  ["How ___ are you?", "old", ["the", "of", "and"], "🎂"],
  ["I ___ to the store.", "walk", ["the", "of", "and"], "🛒"],
  ["Please ___ the door.", "close", ["the", "of", "and"], "🚪"],
  ["It is ___ cold.", "too", ["the", "of", "and"], "🥶"],
  ["___ me the ball.", "Give", ["The", "Of", "And"], "⚽"],
  ["I ___ you!", "love", ["the", "of", "is"], "❤️"],
  ["Where ___ the cat go?", "did", ["the", "of", "and"], "🐈"],
  ["We ___ ready to go.", "are", ["the", "of", "is"], "🎒"],
  ["___ is the bus?", "Where", ["The", "Of", "And"], "🚌"],
);

/* ---------- Question Words: more answers ---------- */
QW_ITEMS.push(
  ["the pilot", "Who"], ["a police officer", "Who"], ["my aunt", "Who"], ["the librarian", "Who"], ["Grandpa Joe", "Who"], ["my dad", "Who"], ["the zookeeper", "Who"], ["my neighbor", "Who"],
  ["a ladder", "What"], ["a robot", "What"], ["a pillow", "What"], ["a toothbrush", "What"], ["a backpack", "What"], ["a rocket", "What"], ["a kitten", "What"],
  ["in the forest", "Where"], ["at the lake", "Where"], ["in the classroom", "Where"], ["at the bakery", "Where"], ["on the boat", "Where"], ["at the doctor's office", "Where"], ["in the barn", "Where"],
  ["at dinnertime", "When"], ["in the evening", "When"], ["on Tuesday", "When"], ["on Thursday", "When"], ["on Wednesday", "When"], ["at nine o'clock", "When"], ["next week", "When"], ["last night", "When"], ["after breakfast", "When"],
);

/* ---------- Picture Sentences: a fresh pool with its own pictures ---------- */
const EN6V_PICS = [["The kangaroo can jump.", "🦘", "kangaroo"], ["The koala is in a tree.", "🐨", "koala"], ["The panda eats plants.", "🐼", "panda"], ["The sloth is slow.", "🦥", "sloth"],
  ["The seal can swim.", "🦭", "seal"], ["The otter floats on its back.", "🦦", "otter"], ["The squirrel has a nut.", "🐿️", "squirrel"], ["The turkey has big feathers.", "🦃", "turkey"],
  ["The peacock is blue and green.", "🦚", "peacock"], ["The skunk has a white stripe.", "🦨", "skunk"], ["The crocodile has big teeth.", "🐊", "crocodile"], ["The lobster is red.", "🦞", "lobster"],
  ["The hedgehog is small.", "🦔", "hedgehog"], ["The unicorn has a horn.", "🦄", "unicorn"], ["Dad made pancakes.", "🥞", "pancakes"], ["I eat a taco.", "🌮", "taco"],
  ["The donut has sprinkles.", "🍩", "donut"], ["I like a pretzel.", "🥨", "pretzel"], ["The peach is soft.", "🍑", "peach"], ["Mom made a waffle.", "🧇", "waffle"],
  ["I play the trumpet.", "🎺", "trumpet"], ["She plays the violin.", "🎻", "violin"], ["The sled goes down the hill.", "🛷", "sled"], ["I ride my scooter.", "🛴", "scooter"],
  ["The helicopter is loud.", "🚁", "helicopter"], ["The canoe is on the river.", "🛶", "canoe"], ["The castle is big.", "🏰", "castle"], ["We do a puzzle.", "🧩", "puzzle"],
  ["I cut with scissors.", "✂️", "scissors"], ["I wear gloves.", "🧤", "gloves"], ["Grandpa has glasses.", "👓", "glasses"], ["The magnet is strong.", "🧲", "magnet"],
  ["My alarm clock rings.", "⏰", "alarm clock"], ["The yo-yo goes up and down.", "🪀", "yo-yo"], ["The cat has a ball of yarn.", "🧶", "yarn"], ["The map shows the way.", "🗺️", "map"]];
const EN6V_stem = t => t.length > 4 ? t.slice(0, 4) : t.replace(/s$/, "");
const EN6V_mentions = (s, name) => name.toLowerCase().split(/\s+/).some(t => s.toLowerCase().includes(EN6V_stem(t)));
addBank(6, "english", "picsent", 0.3, function () {
  const it = pick(EN6V_PICS), others = shuffle(EN6V_PICS.filter(x => x !== it && !EN6V_mentions(it[0], x[2]) && !EN6V_mentions(x[0], it[2]))).slice(0, 3);
  return { q: `<div class="sentence big-sentence">${it[0]}</div>Which picture matches?`, say: `${it[0]} Which picture matches?`, opts: shuffle([it, ...others]).map(psOpt), ans: psOpt(it), why: `"${it[0]}" is about the ${it[2]}.`, key: "v" + it[0] };
});

/* ---------- Color Words: more colorful things ---------- */
if (typeof EN6_CTHINGS !== "undefined") EN6_CTHINGS.push(["🚒", "a fire truck", "red"], ["🐞", "a ladybug", "red"], ["🛑", "a stop sign", "red"],
  ["🏀", "a basketball", "orange"], ["🐅", "a tiger", "orange"],
  ["🌻", "a sunflower", "yellow"], ["🧈", "butter", "yellow"],
  ["🥑", "an avocado", "green"], ["🌊", "a wave", "blue"],
  ["🍫", "chocolate", "brown"], ["🦔", "a hedgehog", "brown"],
  ["🎩", "a top hat", "black"],
  ["🐑", "a sheep", "white"], ["⛄", "a snowman", "white"]);

/* ---------- Ending Sounds: more words ---------- */
ENDW.push(
  ["hut", "🛖"], ["net", "🥅"], ["coat", "🧥"], ["rabbit", "🐰"], ["parrot", "🦜"],
  ["gift", "🎁"], ["road", "🛣️"], ["seed", "🌱"], ["squid", "🦑"],
  ["bag", "👜"], ["hug", "🤗"], ["plug", "🔌"],
  ["arm", "💪"], ["storm", "⛈️"], ["swim", "🏊"],
  ["magnet", "🧲"], ["rain", "🌧️"], ["crown", "👑"], ["dragon", "🐉"], ["lemon", "🍋"],
  ["helmet", "⛑️"], ["tulip", "🌷"], ["shrimp", "🦐"],
  ["clock", "🕰️"], ["mask", "🎭"], ["skunk", "🦨"], ["chick", "🐥"], ["brick", "🧱"],
  ["wheel", "🛞"], ["squirrel", "🐿️"],
  ["cab", "🚕"], ["tractor", "🚜"], ["hammer", "🔨"], ["ladder", "🪜"],
);

/* ---------- Short Vowels: more CVC words with pictures ---------- */
if (typeof EN6_CVC !== "undefined") EN6_CVC.push(["rat", "🐀"], ["nut", "🥜"], ["net", "🥅"], ["pan", "🍳"], ["cap", "🧢"],
  ["lip", "👄"], ["kid", "🧒"], ["mad", "😠"], ["wet", "💦"], ["hot", "🥵"], ["jet", "🛩️"]);

/* ---------- Action Words: more pictures + which action word fits? ---------- */
ACTIONS.push(["🥱", "yawn"], ["🤹", "juggle"], ["🙇", "bow"], ["🤷", "shrug"], ["😊", "smile"], ["👉", "point"], ["🧎", "kneel"], ["🧍", "stand"], ["🎧", "listen"]);
const EN6V_FRAMES = [["The bird can ___.", "fly", "🐦"], ["The fish can ___.", "swim", "🐟"], ["A frog can ___.", "hop", "🐸"], ["I can ___ a song.", "sing", "🎤"],
  ["I ___ my teeth.", "brush", "🪥"], ["I ___ the ball.", "kick", "⚽"], ["The dog likes to ___.", "dig", "🐕"], ["We ___ in the pool.", "splash", "💦"],
  ["I ___ my hands.", "wash", "🧼"], ["Mom will ___ dinner.", "cook", "🍳"], ["The baby can ___.", "crawl", "👶"], ["I ___ a book.", "read", "📖"],
  ["We ___ to music.", "dance", "💃"], ["The cow will ___ the grass.", "eat", "🐄"], ["I ___ my name.", "write", "✍️"], ["The kids ___ up the hill.", "run", "⛰️"],
  ["Please ___ the door.", "shut", "🚪"], ["I ___ a picture.", "draw", "🖍️"], ["We ___ our hands.", "clap", "👏"], ["The cat likes to ___.", "nap", "🐱"],
  ["Dad can ___ the car.", "drive", "🚗"], ["I ___ on my bike.", "ride", "🚲"], ["The bee can ___.", "buzz", "🐝"], ["We ___ goodbye.", "wave", "👋"],
  ["I ___ up the tree.", "climb", "🌳"], ["The duck can ___.", "quack", "🦆"], ["I ___ the cake.", "bake", "🎂"], ["We ___ a snowman.", "build", "⛄"],
  ["The lion can ___.", "roar", "🦁"], ["I ___ my milk.", "drink", "🥛"], ["Let's ___ a game.", "play", "🎲"], ["I ___ in my bed.", "sleep", "🛏️"],
  ["The horse can ___ fast.", "gallop", "🐴"], ["I ___ the bell.", "ring", "🔔"]];
addBank(6, "english", "actionwords", 0.3, function () {
  const [s, v, e] = pick(EN6V_FRAMES), lw = s.toLowerCase();
  const things = shuffle(THINGWORDS.filter(t => !new RegExp(`\\b${t}\\b`).test(lw))).slice(0, 3);
  const full = s.replace("___", v);
  return { q: `Which <b>action word</b> fits?<div class="sentence big-sentence"><span class="emo">${e}</span> ${s.replace("___", '<span class="blank">___</span>')}</div>`, say: `Which action word fits? ${s.replace("___", "blank")}`, opts: shuffle([v, ...things]), ans: v, big: 1, why: `${full} ${cap(v)} is the action.`, key: "v22" + s, v22: { f: "frame", s } };
});
whyRule(6, "english", "actionwords", (q, picked) => {
  if (!q.v22) return null;
  const p = xPlain(picked);
  if (p === q.ans || !THINGWORDS.includes(p)) return null;
  return `${xQ(cap(p))} names a thing, not an action, so it does not fit.`;
});

/* ---------- Letter Sounds: more first-sound pictures ---------- */
if (typeof EN6_FIRST !== "undefined") EN6_FIRST.push(["b", "butterfly", "🦋", ""], ["b", "basket", "🧺", ""], ["c", "camel", "🐫", ""], ["d", "dinosaur", "🦕", "b"],
  ["f", "fork", "🍴", ""], ["g", "gift", "🎁", "pb"], ["h", "heart", "❤️", "l"], ["j", "juice", "🧃", "b"],
  ["l", "ladder", "🪜", ""], ["m", "mitten", "🧤", "g"], ["n", "nut", "🥜", "p"], ["p", "parrot", "🦜", "b"],
  ["r", "rose", "🌹", "f"], ["t", "tractor", "🚜", ""], ["w", "whale", "🐋", "t"], ["z", "zero", "0️⃣", "n"]);

/* ---------- Big & Small Letters: which word needs a big letter? ---------- */
const EN6V_PROPER = [["mia", "name"], ["leo", "name"], ["sam", "name"], ["ava", "name"], ["omar", "name"], ["zoe", "name"], ["kai", "name"], ["nora", "name"],
  ["ravi", "name"], ["emma", "name"], ["ben", "name"], ["rosa", "name"], ["jin", "name"], ["maya", "name"], ["luis", "name"], ["ana", "name"],
  ["eli", "name"], ["owen", "name"], ["diego", "name"], ["kofi", "name"], ["priya", "name"], ["hana", "name"],
  ["monday", "day"], ["tuesday", "day"], ["wednesday", "day"], ["thursday", "day"], ["friday", "day"], ["saturday", "day"], ["sunday", "day"],
  ["january", "month"], ["february", "month"], ["april", "month"], ["june", "month"], ["july", "month"], ["september", "month"], ["october", "month"], ["november", "month"], ["december", "month"]];
const EN6V_COMMON = ["cat", "dog", "cup", "hat", "sun", "bed", "ball", "tree", "box", "pen", "run", "big", "red", "cake", "fish", "sock", "book", "milk"];
const EN6V_KIND = { name: "a name", day: "a day of the week", month: "a month" };
addBank(6, "english", "case", 0.22, function () {
  const [w, kind] = pick(EN6V_PROPER), W = cap(w);
  return { q: "Which word should start with a <b>big letter</b>?", say: "Which word should start with a big letter?", opts: shuffle([w, ...shuffle(EN6V_COMMON).slice(0, 3)]), ans: w, big: 1, why: `${W} is ${EN6V_KIND[kind]}, so it starts with a big ${W[0]}: ${W}.`, key: "v22" + w, v22: { f: "proper" } };
});
whyRule(6, "english", "case", (q, picked) => {
  if (!q.v22) return null;
  const p = xPlain(picked);
  if (p === q.ans || !EN6V_COMMON.includes(p)) return null;
  return `${xQ(p)} is not a name, a day or a month, so it starts with a small letter.`;
});

/* ---------- Word Families: new families (read by gen() each call) ---------- */
Object.assign(FAMS, {
  ag: ["bag", "tag", "rag", "wag", "flag"],
  og: ["dog", "log", "fog", "jog", "frog"],
  ut: ["nut", "hut", "cut", "shut"],
  ock: ["sock", "rock", "lock", "clock"],
  ub: ["tub", "cub", "rub", "sub"],
});
Object.assign(FAM_PIC, { bag: "👜", flag: "🚩", dog: "🐶", log: "🪵", fog: "🌫️", frog: "🐸", nut: "🥜", hut: "🛖", sock: "🧦", rock: "🪨", lock: "🔒", clock: "🕰️", tub: "🛁" });

/* ---------- Rhyming Words: more rhyme families (read by gen() each call) ---------- */
RHYMES.push(
  [["rice", "🍚"], ["dice", "🎲"], ["ice", "🧊"]],
  [["train", "🚆"], ["rain", "🌧️"], ["chain", "⛓️"]],
  [["book", "📖"], ["hook", "🪝"], ["cook", "🧑‍🍳"]],
  [["nose", "👃"], ["rose", "🌹"], ["hose", ""]],
  [["ship", "🚢"], ["lip", "👄"], ["zip", ""]],
  [["ball", "⚽"], ["wall", "🧱"], ["tall", ""]],
);

/* ---------- ABC Neighbors: which letter is missing from the line? ---------- */
addBank(6, "english", "abcnext", 0.4, function () {
  const s = R(0, 22), pos = R(0, 3), low = Math.random() < 0.4, f = c => low ? c.toLowerCase() : c;
  const line = [0, 1, 2, 3].map(j => f(ALPHA[s + j])), ans = line[pos];
  const cands = [ALPHA[s + 4], ALPHA[s - 1], ALPHA[s + pos + 2], ALPHA[s + pos - 2], ALPHA[(s + pos + 9) % 26]].filter(Boolean).map(f).filter(c => !line.includes(c));
  const shown = line.map((c, j) => j === pos ? "?" : c);
  return { q: "Which letter is <b>missing</b>?", say: `Which letter is missing? ${shown.map(c => c === "?" ? "blank" : c.toUpperCase()).join(", ")}.`, vis: train(shown), opts: uniq(ans, shuffle(cands)), ans, big: 1, why: `${line.join(", ")}. ${line.indexOf(ans) === line.length - 1 ? `${ans} comes next in ABC order.` : `${ans} fills the gap in ABC order.`}`, key: "v22" + s + pos + low, v22: { line, pos } };
});
whyRule(6, "english", "abcnext", (q, picked) => {
  if (!q.v22) return null;
  const p = xPlain(picked), { line, pos } = q.v22;
  if (p === q.ans || p.length !== 1) return null;
  if (pos > 0) return `Right after ${line[pos - 1]} comes ${line[pos]}, not ${p}.`;
  return `Right before ${line[1]} comes ${line[0]}, not ${p}.`;
});

