/* =====================================================================
   v25 · Age 8 English (tag V25EN8_): new questions for every age-8 English topic.
   Every new question carries q.v25.r = { wrong option: reason } for the why-rule.
   ===================================================================== */
const V25EN8_Q = s => "“" + s + "”";
const V25EN8_C = s => s.charAt(0).toUpperCase() + s.slice(1);
const V25EN8_RULE = (q, p) => (q && q.v25 && q.v25.r && Object.prototype.hasOwnProperty.call(q.v25.r, p)) ? q.v25.r[p] : null;
const V25EN8_BL = s => s.replace("___", '<span class="blank">___</span>');
const V25EN8_SB = s => s.replace("___", "blank");
const V25EN8_an = w => (/^[aeiou]/i.test(w) ? "an " : "a ") + w;
const V25EN8_lc = s => /^(He|She|It|They|The|His|Her|A|An|Their|Its|We|Our|No)\b/.test(s) ? s.charAt(0).toLowerCase() + s.slice(1) : s;
const V25EN8_TAGS = s => String(s).replace(/<[^>]+>/g, "");

/* ---------- Adjectives ---------- */
// [sentence, answer, wrong adjectives, context clue]
const V25EN8_ADJF = [
  ["The ___ lemon made my lips pucker.", "sour", ["sweet", "fluffy", "loud"], "the lemon made my lips pucker"],
  ["We wore mittens because it was a ___ day.", "freezing", ["hot", "sandy", "juicy"], "we needed mittens"],
  ["I had to whisper because the baby was asleep in the ___ room.", "quiet", ["loud", "noisy", "windy"], "a baby was sleeping there"],
  ["The ___ turtle took a long time to cross the road.", "slow", ["fast", "speedy", "quick"], "the turtle took a long time"],
  ["My soup was too ___ to eat, so I blew on it.", "hot", ["cold", "icy", "frozen"], "I had to blow on the soup"],
  ["The ___ elephant could not fit through the little door.", "huge", ["tiny", "small", "skinny"], "the elephant could not fit through the door"],
  ["After rolling in the mud, my dog was very ___.", "dirty", ["clean", "neat", "shiny"], "the dog rolled in the mud"],
  ["The ___ knife cut the bread easily.", "sharp", ["dull", "soft", "round"], "the knife cut easily"],
  ["The ___ pillow felt nice on my cheek.", "soft", ["hard", "prickly", "rough"], "the pillow felt nice on my cheek"],
  ["Everyone covered their ears at the ___ fireworks.", "loud", ["quiet", "silent", "gentle"], "everyone covered their ears"],
  ["The ___ desert had no rain for months.", "dry", ["wet", "rainy", "soggy"], "there was no rain for months"],
  ["We could not see anything in the ___ cave.", "dark", ["bright", "sunny", "shiny"], "we could not see anything"],
  ["We could not see the boats on the ___ morning.", "foggy", ["clear", "sunny", "bright"], "the boats were hard to see"],
  ["The ___ ladder reached all the way to the roof.", "tall", ["short", "tiny", "little"], "the ladder reached the roof"],
  ["Grandpa smiled because he was so ___ to see us.", "glad", ["sad", "grumpy", "angry"], "Grandpa smiled"],
  ["We held the rail on the ___ steps covered with ice.", "slippery", ["dry", "rough", "warm"], "the steps were covered with ice"],
  ["My feet hurt after the ___ walk up the mountain.", "long", ["short", "quick", "easy"], "my feet hurt after the walk"],
  ["Nobody sat in the ___ chair because it had a broken leg.", "wobbly", ["steady", "sturdy", "strong"], "the chair had a broken leg"],
  ["The ___ kitten wanted to explore every box in the room.", "curious", ["bored", "sleepy", "lazy"], "the kitten wanted to explore"],
  ["My shoes are so ___ that my toes squeeze together.", "tight", ["loose", "big", "wide"], "my toes squeeze together"],
  ["The bath water was too ___, so I added hot water.", "cold", ["hot", "warm", "steamy"], "I had to add hot water"],
  ["Lily was ___ after she ran three laps.", "tired", ["rested", "fresh", "bored"], "Lily had just run three laps"],
  ["The ___ clown made everyone laugh.", "funny", ["serious", "grumpy", "boring"], "the clown made everyone laugh"],
  ["My backpack was so ___ that I could hardly lift it.", "heavy", ["light", "empty", "tiny"], "I could hardly lift it"],
  ["The ___ road made our bike ride bumpy.", "rocky", ["smooth", "flat", "paved"], "the bike ride was bumpy"],
  ["Dad said the stove was ___, so we did not touch it.", "hot", ["cold", "cool", "frozen"], "we did not touch the stove"],
];
// [sentence, how-many adjective, other adjective, noun, verb]
const V25EN8_ADJN = [
  ["Three hungry goats ate the grass.", "three", "hungry", "goats", "ate"], ["Two shiny coins fell out of my pocket.", "two", "shiny", "coins", "fell"],
  ["Many small fish swam near the rocks.", "many", "small", "fish", "swam"], ["Five red apples sat in the bowl.", "five", "red", "apples", "sat"],
  ["Several brave kids climbed the hill.", "several", "brave", "kids", "climbed"], ["Four noisy geese flew over the barn.", "four", "noisy", "geese", "flew"],
  ["Ten tiny ants carried a crumb.", "ten", "tiny", "ants", "carried"], ["Six striped socks hung on the line.", "six", "striped", "socks", "hung"],
  ["Nine purple grapes rolled off the plate.", "nine", "purple", "grapes", "rolled"], ["Some fresh muffins cooled on the rack.", "some", "fresh", "muffins", "cooled"],
  ["Eight sleepy puppies napped in a pile.", "eight", "sleepy", "puppies", "napped"], ["Seven yellow ducks waddled to the pond.", "seven", "yellow", "ducks", "waddled"],
  ["Twelve wooden chairs stood in a row.", "twelve", "wooden", "chairs", "stood"], ["Three tall trees shaded the yard.", "three", "tall", "trees", "shaded"],
  ["Many bright stars twinkled in the sky.", "many", "bright", "stars", "twinkled"], ["Two fluffy clouds drifted by.", "two", "fluffy", "clouds", "drifted"],
  ["Several sticky notes covered the fridge.", "several", "sticky", "notes", "covered"], ["Four round pumpkins sat on the porch.", "four", "round", "pumpkins", "sat"],
  ["Twenty busy bees buzzed around the hive.", "twenty", "busy", "bees", "buzzed"], ["Five muddy kids came inside.", "five", "muddy", "kids", "came"],
];
// [sentence, adjective, the noun it describes, other nouns, verb]
const V25EN8_ADJW = [
  ["The kids climbed the steep hill.", "steep", "hill", ["kids"], "climbed"], ["Mom poured cold milk into my cup.", "cold", "milk", ["Mom", "cup"], "poured"],
  ["The farmer fed the hungry pigs.", "hungry", "pigs", ["farmer"], "fed"], ["A bird built a cozy nest in the tree.", "cozy", "nest", ["bird", "tree"], "built"],
  ["Leo found a smooth rock by the river.", "smooth", "rock", ["Leo", "river"], "found"], ["The girl hugged her fuzzy blanket.", "fuzzy", "blanket", ["girl"], "hugged"],
  ["Dad hung a bright lamp over the table.", "bright", "lamp", ["Dad", "table"], "hung"], ["The tired hikers rested under a tree.", "tired", "hikers", ["tree"], "rested"],
  ["Grandma baked a giant pie for the party.", "giant", "pie", ["Grandma", "party"], "baked"], ["The puppy chewed my new shoe.", "new", "shoe", ["puppy"], "chewed"],
  ["A noisy truck drove past our house.", "noisy", "truck", ["house"], "drove"], ["Rosa wore a striped shirt to school.", "striped", "shirt", ["Rosa", "school"], "wore"],
  ["The wind knocked over the empty bucket.", "empty", "bucket", ["wind"], "knocked"], ["Our teacher read a silly story at the campfire.", "silly", "story", ["teacher", "campfire"], "read"],
  ["The baby grabbed a squeaky toy from the basket.", "squeaky", "toy", ["baby", "basket"], "grabbed"], ["Kai painted the old fence in the yard.", "old", "fence", ["Kai", "yard"], "painted"],
  ["The chef chopped crunchy carrots for the soup.", "crunchy", "carrots", ["chef", "soup"], "chopped"], ["A sleepy owl blinked at the moon.", "sleepy", "owl", ["moon"], "blinked"],
  ["The cat napped on the warm windowsill.", "warm", "windowsill", ["cat"], "napped"], ["Nora carried a heavy box up the stairs.", "heavy", "box", ["Nora", "stairs"], "carried"],
  ["The bus stopped at the busy corner.", "busy", "corner", ["bus"], "stopped"],
];
addBank(8, "english", "adjectives", 0.3, function () {
  const Q = V25EN8_Q, k = Math.random(), r = {};
  if (k < 0.4) {
    const i = R(0, V25EN8_ADJF.length - 1), [s, a, ws, clue] = V25EN8_ADJF[i];
    ws.forEach(w => { r[w] = `${Q(w)} doesn't fit, because ${clue}.`; });
    return { q: `Which adjective fits best?<div class="sentence">${V25EN8_BL(s)}</div>`, say: `Which adjective fits best? ${V25EN8_SB(s)}`, opts: shuffle([a, ...ws]), ans: a, big: 1, why: `${s.replace("___", a)} It fits, because ${clue}.`, key: "v25f" + i, v25: { r } };
  }
  if (k < 0.7) {
    const i = R(0, V25EN8_ADJN.length - 1), [s, n, o, nn, v] = V25EN8_ADJN[i];
    r[o] = `${Q(o)} is an adjective too, but it tells what kind, not how many.`;
    r[nn] = `${Q(nn)} is a noun, a naming word. It doesn't describe anything.`;
    r[v] = `${Q(v)} is a verb, an action word. It doesn't describe a noun.`;
    return { q: `Which adjective tells <b>how many</b>?<div class="sentence">${s}</div>`, say: `Which adjective tells how many? ${s}`, opts: shuffle([n, o, nn, v]), ans: n, big: 1, why: `${V25EN8_C(n)} tells how many ${nn} there are.`, key: "v25n" + i, v25: { r } };
  }
  const i = R(0, V25EN8_ADJW.length - 1), [s, a, n, others, v] = V25EN8_ADJW[i];
  others.forEach(o => { r[o] = `${Q(a)} tells about the ${n}, not about ${Q(o)}.`; });
  r[v] = `${Q(v)} is an action word. Adjectives describe nouns, not actions.`;
  return { q: `Which noun does <b>${a}</b> describe?<div class="sentence">${s}</div>`, say: `${s} Which noun does ${a} describe?`, opts: shuffle([n, ...others, v]), ans: n, big: 1, why: `It is the ${a} ${n}, so ${Q(a)} tells about the ${n}.`, key: "v25w" + i, v25: { r } };
});
whyRule(8, "english", "adjectives", V25EN8_RULE);

/* ---------- Synonyms ---------- */
// [word 1, word 2, opposite (or null), sentence with word 1, sentence with word 2]
const V25EN8_SYP = [
  ["quiet", "silent", "loud", "The library was <u>quiet</u> all morning.", "The forest was <u>silent</u> after the snow fell."],
  ["gift", "present", null, "Mia wrapped a <u>gift</u> for her cousin.", "Dad opened his birthday <u>present</u>."],
  ["toss", "throw", "catch", "<u>Toss</u> the ball to your brother.", "Can you <u>throw</u> the flying disc to me?"],
  ["rock", "stone", null, "I skipped a flat <u>rock</u> across the pond.", "A <u>stone</u> was stuck in my shoe."],
  ["fix", "repair", "break", "Grandpa can <u>fix</u> the broken gate.", "A worker came to <u>repair</u> our sink."],
  ["grin", "smile", "frown", "Leo had a big <u>grin</u> on his face.", "Her <u>smile</u> lit up the room."],
  ["hurry", "rush", null, "We had to <u>hurry</u> to catch the bus.", "Don't <u>rush</u> through your homework."],
  ["speak", "talk", null, "Please <u>speak</u> clearly into the microphone.", "I like to <u>talk</u> with my grandma on the phone."],
  ["choose", "pick", null, "You may <u>choose</u> one book from the shelf.", "Let's <u>pick</u> a game to play."],
  ["gather", "collect", null, "We <u>gather</u> leaves for our art project.", "Omar likes to <u>collect</u> shells at the beach."],
  ["road", "street", null, "A long <u>road</u> led to the farm.", "Our <u>street</u> has tall trees."],
  ["correct", "right", "wrong", "Ava gave the <u>correct</u> answer.", "You picked the <u>right</u> answer!"],
  ["neat", "tidy", "messy", "Kai keeps his desk <u>neat</u>.", "Please keep your room <u>tidy</u>."],
  ["brave", "fearless", "scared", "The <u>brave</u> kitten jumped down from the tree.", "The <u>fearless</u> girl climbed to the top of the rope."],
  ["tale", "story", null, "Grandpa told us a funny <u>tale</u>.", "Mom read me a bedtime <u>story</u>."],
  ["sad", "unhappy", "happy", "Rosa felt <u>sad</u> when her friend moved away.", "The <u>unhappy</u> puppy whined at the door."],
  ["below", "under", "above", "The cat hid <u>below</u> the table.", "My shoes are <u>under</u> the bed."],
  ["noisy", "loud", "quiet", "The <u>noisy</u> crowd cheered for the team.", "The music was too <u>loud</u>."],
  ["sob", "cry", "laugh", "The baby began to <u>sob</u> when her toy broke.", "Did the movie make you <u>cry</u>?"],
  ["shop", "store", null, "We bought bread at the corner <u>shop</u>.", "Dad went to the <u>store</u> for milk."],
  ["hard", "difficult", "easy", "This puzzle is really <u>hard</u>.", "The math test was <u>difficult</u>."],
  ["thin", "skinny", "thick", "The <u>thin</u> branch bent in the wind.", "A <u>skinny</u> worm wiggled in the dirt."],
  ["kind", "nice", "mean", "Our <u>kind</u> neighbor brought us soup.", "The bus driver is very <u>nice</u>."],
  ["dirty", "filthy", "clean", "My <u>dirty</u> socks went in the wash.", "After the game, his uniform was <u>filthy</u>."],
  ["awful", "terrible", "wonderful", "The storm made an <u>awful</u> mess.", "I had a <u>terrible</u> cold last week."],
];
// words in the same group are close in meaning, so they are never used as each other's wrong options
const V25EN8_SYG = { choose: 1, pick: 1, gather: 1, collect: 1, quiet: 2, silent: 2, sad: 3, unhappy: 3, awful: 4, terrible: 4, dirty: 5, filthy: 5, hard: 6, difficult: 6 };
const V25EN8_ANT = [["hot", "cold"], ["up", "down"], ["early", "late"], ["wet", "dry"], ["full", "empty"], ["light", "dark"], ["fast", "slow"], ["win", "lose"],
  ["push", "pull"], ["buy", "sell"], ["sweet", "sour"], ["tall", "short"], ["first", "last"], ["day", "night"], ["top", "bottom"], ["float", "sink"], ["whisper", "shout"]];
addBank(8, "english", "synonyms", 0.3, function () {
  const Q = V25EN8_Q, L = V25EN8_SYP, i = R(0, L.length - 1), P = L[i], r = {};
  const g = V25EN8_SYG[P[0]], ok = (p, j) => j !== i && !(g && (V25EN8_SYG[p[0]] === g || V25EN8_SYG[p[1]] === g));
  if (Math.random() < 0.65) {
    const d = R(0, 1), w = P[d], a = P[1 - d], s = P[3 + d], opts = [a];
    if (P[2]) { opts.push(P[2]); r[P[2]] = `${Q(P[2])} means the opposite of ${Q(w)}.`; }
    for (const p of shuffle(L.filter(ok))) {
      if (opts.length >= 4) break;
      const k = R(0, 1), x = p[k];
      if (opts.includes(x)) continue;
      opts.push(x); r[x] = `${Q(x)} means the same as ${Q(p[1 - k])}, not ${Q(w)}.`;
    }
    const plain = V25EN8_TAGS(s);
    return { q: `Which word means the same as the <u>underlined</u> word?<div class="sentence">${s}</div>`, say: `${plain} Which word means the same as ${w}?`, opts: shuffle(opts), ans: a, big: 1, why: `${V25EN8_C(w)} and ${a} are synonyms. They mean almost the same thing.`, key: "v25u" + i + d, v25: { r } };
  }
  const ans = `${P[0]} and ${P[1]}`, opts = [ans];
  shuffle(V25EN8_ANT).slice(0, 2).forEach(([a, b]) => { const o = `${a} and ${b}`; opts.push(o); r[o] = `${Q(a)} and ${Q(b)} are opposites, not synonyms.`; });
  const pool = shuffle(L.filter(ok)), g0 = V25EN8_SYG[pool[0][0]], two = [pool[0], pool.slice(1).find(p => !g0 || V25EN8_SYG[p[0]] !== g0)], x = two[0][R(0, 1)], y = two[1][R(0, 1)], o = `${x} and ${y}`;
  opts.push(o); r[o] = `${Q(x)} and ${Q(y)} don't mean the same thing.`;
  return { q: "Which pair of words are <b>synonyms</b>?", say: "Which pair of words are synonyms?", opts: shuffle(opts), ans, why: `${V25EN8_C(P[0])} and ${P[1]} mean almost the same thing.`, key: "v25p" + i, v25: { r } };
});
whyRule(8, "english", "synonyms", V25EN8_RULE);

/* ---------- Compound words ---------- */
// [compound, clue, article]
const V25EN8_CPR = [
  ["tablecloth", "a cloth that covers a table", "a"], ["raincoat", "a coat you wear in the rain", "a"], ["sunglasses", "dark glasses that shade your eyes from the sun", "pl"],
  ["bedtime", "the time when you go to bed", ""], ["birdhouse", "a little house for birds", "a"], ["snowball", "a ball made of snow", "a"],
  ["doorbell", "a bell you ring at the door", "a"], ["headband", "a band you wear on your head", "a"], ["playground", "a place outside where kids play", "a"],
  ["homework", "school work you do at home", ""], ["seashell", "a shell you find by the sea", "a"], ["bookmark", "a strip that marks your page in a book", "a"],
  ["wristwatch", "a watch you wear on your wrist", "a"], ["sandbox", "a box filled with sand to play in", "a"], ["teapot", "a pot for making tea", "a"],
  ["moonlight", "the light that comes from the moon", ""], ["paintbrush", "a brush you use to paint", "a"], ["hairbrush", "a brush for your hair", "a"],
  ["earring", "a ring you wear on your ear", "an"], ["lunchbox", "a box that carries your lunch", "a"], ["treehouse", "a house built up in a tree", "a"],
  ["weekend", "Saturday and Sunday, the end of the week", "a"], ["pigpen", "a fenced place where pigs live", "a"], ["horseshoe", "a curved shoe made for a horse's hoof", "a"],
  ["fishbowl", "a glass bowl where a pet fish lives", "a"], ["keyhole", "the hole where a key goes", "a"], ["sunrise", "the time when the sun comes up", ""],
  ["fingernail", "the hard nail at the tip of a finger", "a"], ["bathrobe", "a soft robe you wear after a bath", "a"], ["haircut", "what you get when someone cuts your hair", "a"],
];
// [answer, three endings, [[wrong word, an ending it can't join], ...]]
const V25EN8_CPF = [
  ["snow", ["flake", "man", "storm"], [["rain", "flake"], ["sun", "flake"], ["fire", "flake"]]],
  ["rain", ["coat", "drop", "bow"], [["snow", "coat"], ["sun", "coat"], ["sea", "coat"]]],
  ["sun", ["flower", "set", "shine"], [["rain", "set"], ["star", "set"], ["snow", "set"]]],
  ["foot", ["ball", "print", "step"], [["hand", "step"], ["base", "print"], ["basket", "print"]]],
  ["book", ["shelf", "worm", "case"], [["note", "shelf"], ["story", "worm"], ["cook", "worm"]]],
  ["tooth", ["brush", "paste", "ache"], [["hair", "paste"], ["ear", "paste"], ["paint", "ache"]]],
  ["sea", ["shell", "weed", "horse"], [["egg", "weed"], ["sand", "weed"], ["sun", "weed"]]],
  ["bed", ["room", "time", "spread"], [["bath", "spread"], ["class", "spread"], ["play", "spread"]]],
  ["fire", ["fly", "place", "works"], [["camp", "fly"], ["butter", "place"], ["work", "fly"]]],
  ["head", ["band", "ache", "light"], [["tooth", "band"], ["arm", "ache"], ["flash", "band"]]],
  ["door", ["bell", "knob", "mat"], [["bath", "bell"], ["car", "bell"], ["school", "knob"]]],
  ["water", ["fall", "melon", "proof"], [["snow", "melon"], ["rain", "melon"], ["sun", "melon"]]],
  ["butter", ["fly", "cup", "milk"], [["fire", "cup"], ["tea", "fly"], ["dragon", "cup"]]],
  ["hand", ["shake", "bag", "stand"], [["foot", "shake"], ["back", "shake"], ["head", "bag"]]],
  ["day", ["light", "dream", "time"], [["night", "dream"], ["sun", "dream"], ["moon", "dream"]]],
  ["class", ["room", "mate", "work"], [["bed", "work"], ["home", "mate"], ["team", "room"]]],
];
// [compound, first part, last part, right meaning, swapped meaning]
const V25EN8_CPM = [
  ["birdhouse", "bird", "house", "a house for birds", "a bird that lives in a house"], ["dollhouse", "doll", "house", "a small house for dolls", "a doll that lives in a house"],
  ["fishbowl", "fish", "bowl", "a bowl for a pet fish", "a fish shaped like a bowl"], ["raincoat", "rain", "coat", "a coat to wear in the rain", "rain that falls on a coat"],
  ["snowball", "snow", "ball", "a ball made of snow", "snow that falls on a ball"], ["sandcastle", "sand", "castle", "a castle made of sand", "sand found inside a castle"],
  ["lunchbox", "lunch", "box", "a box to carry lunch in", "a lunch shaped like a box"], ["horseshoe", "horse", "shoe", "a shoe for a horse", "a horse that wears shoes"],
  ["farmhouse", "farm", "house", "a house on a farm", "a farm next to a house"], ["houseboat", "house", "boat", "a boat that people live in", "a house for keeping boats"],
  ["boathouse", "boat", "house", "a building for keeping boats", "a boat that people live in"], ["handbag", "hand", "bag", "a bag you carry in your hand", "a hand that holds a bag"],
  ["eggshell", "egg", "shell", "the shell around an egg", "an egg shaped like a shell"], ["nightlight", "night", "light", "a small light for nighttime", "a night with lots of light"],
  ["hairbrush", "hair", "brush", "a brush for your hair", "hair shaped like a brush"], ["cowbell", "cow", "bell", "a bell worn by a cow", "a cow that wears a bell"],
  ["dogsled", "dog", "sled", "a sled pulled by dogs", "a dog that rides on a sled"], ["mailbox", "mail", "box", "a box for mail", "mail shaped like a box"],
];
addBank(8, "english", "compound", 0.3, function () {
  const Q = V25EN8_Q, k = Math.random(), r = {};
  if (k < 0.45) {
    const L = V25EN8_CPR, i = R(0, L.length - 1), [w, clue] = L[i], others = shuffle(L.filter((_, j) => j !== i)).slice(0, 3);
    const D = (o, c, art) => `${V25EN8_C(art && art !== "pl" ? art + " " + o : o)} ${art === "pl" ? "are" : "is"} ${c}.`;
    others.forEach(([o, c, art]) => { r[o] = D(o, c, art); });
    return { q: `Which compound word means <b>${clue}</b>?`, say: `Which compound word means ${clue}?`, opts: shuffle([w, ...others.map(o => o[0])]), ans: w, big: 1, why: D(w, clue, L[i][2]), key: "v25r" + i, v25: { r } };
  }
  if (k < 0.75) {
    const L = V25EN8_CPF, i = R(0, L.length - 1), [a, ends, ws] = L[i];
    ws.forEach(([w, e]) => { r[w] = `${Q(w + e)} is not a word, so ${Q(w)} can't go with all three.`; });
    const vis = `<div class="chips">${ends.map(e => chip("___" + e, "blank " + e, "lg")).join("")}</div>`;
    return { q: "Which word can go in front of <b>all three</b> to make compound words?", say: `Which word can go in front of all three to make compound words? ${ends.join(", ")}.`, vis, opts: shuffle([a, ...ws.map(x => x[0])]), ans: a, big: 1, why: `${ends.map(e => a + e).join(", ")}: ${a} makes a word with all three.`, key: "v25f" + i, v25: { r } };
  }
  const L = V25EN8_CPM, i = R(0, L.length - 1), [w, , b, m, sw] = L[i], o = pick(L.filter((x, j) => j !== i && x[3] !== sw && x[3] !== m));
  r[sw] = `In ${Q(w)}, the last part, ${Q(b)}, names the thing. It's a kind of ${b}.`;
  r[o[3]] = `That describes ${V25EN8_an(o[0])}, not ${V25EN8_an(w)}.`;
  return { q: `What does the compound word <b>${w}</b> mean?`, say: `What does the compound word ${w} mean?`, vis: hw(w), opts: shuffle([m, sw, o[3]]), ans: m, why: `The last part of ${w} is ${b}, so ${V25EN8_an(w)} is ${m}.`, key: "v25m" + i, v25: { r } };
});
whyRule(8, "english", "compound", V25EN8_RULE);

/* ---------- Prefixes ---------- */
const V25EN8_PRM = {
  preheat: "heat before", reheat: "heat again", unlock: "open a lock", unpack: "take things out of a bag", repack: "pack again", prepay: "pay before",
  rewrite: "write again", unwrap: "take the wrapping off", disagree: "not agree", disappear: "go out of sight", reappear: "show up again", reread: "read again",
  dislike: "not like", dishonest: "not honest", honest: "truthful", unsafe: "not safe", safe: "not in danger", refill: "fill again", preview: "see before",
  unplug: "pull out the plug", replay: "play again", unfair: "not fair", fair: "the same for everyone", rebuild: "build again", untie: "undo a knot",
  retie: "tie again", unbuckle: "open a buckle", rewind: "wind back", unhappy: "not happy", happy: "glad", reopen: "open again", uncover: "take the cover off",
  unload: "take a load off", reload: "load again", unlucky: "not lucky", lucky: "having good luck", unkind: "not kind", kind: "nice to others",
  unfold: "open something folded", refold: "fold again", dislikes: "does not like", likes: "enjoys", untidy: "not tidy", tidy: "neat", retell: "tell again",
  rewrap: "wrap again", agree: "think the same",
};
// [sentence, answer, wrong options]
const V25EN8_PRS = [
  ["Before we bake the cookies, we ___ the oven.", "preheat", ["reheat", "unlock"]],
  ["My pizza got cold, so Dad will ___ it.", "reheat", ["preheat", "unwrap"]],
  ["When we got home from camp, I had to ___ my suitcase.", "unpack", ["repack", "prepay"]],
  ["The door was locked, so Mom used a key to ___ it.", "unlock", ["reread", "unplug"]],
  ["Ella's note was too messy to read, so she had to ___ it.", "rewrite", ["unwrap", "preheat"]],
  ["The magician waved her wand, and the coin seemed to ___. Where did it go?", "disappear", ["reappear", "dislike"]],
  ["The coin was gone, but then it seemed to ___ behind my ear!", "reappear", ["disappear", "unpack"]],
  ["Ava loved the book so much that she wants to ___ it.", "reread", ["dislike", "unlock"]],
  ["Copying a friend's answers on a test is ___.", "dishonest", ["honest", "unpack"]],
  ["Riding a bike without a helmet is ___.", "unsafe", ["safe", "reread"]],
  ["My water bottle is empty, so I will ___ it.", "refill", ["unplug", "preview"]],
  ["The knot in my shoelace was so tight that I could not ___ it.", "untie", ["rebuild", "prepay"]],
  ["My shoelace came untied, so I stopped to ___ it.", "retie", ["untie", "reheat"]],
  ["Before you clean the toaster, ___ it from the wall.", "unplug", ["replay", "prepay"]],
  ["That song was so fun. Let's ___ it!", "replay", ["preview", "unpack"]],
  ["It is ___ when one player gets three turns and the others get one.", "unfair", ["fair", "reopen"]],
  ["The wave knocked down our sandcastle, so we will ___ it.", "rebuild", ["unwrap", "preheat"]],
  ["When the car stops at our house, I ___ my seat belt.", "unbuckle", ["reread", "dislike"]],
  ["Leo couldn't wait to ___ his birthday gift.", "unwrap", ["rewrap", "preheat"]],
  ["Sam thinks cats are the best pets, but I think dogs are. We ___.", "disagree", ["agree", "reread"]],
  ["The puppy was ___ when it was left out in the cold rain.", "unhappy", ["happy", "refill"]],
  ["The pool was closed for a week, but it will ___ on Monday.", "reopen", ["unpack", "dislike"]],
  ["Dig in the sand to ___ the hidden shell.", "uncover", ["reheat", "replay"]],
  ["The truck is full of boxes, so the workers will ___ it.", "unload", ["reload", "prepay"]],
  ["Kai felt ___ when it rained on the day of his picnic.", "unlucky", ["lucky", "rewrite"]],
  ["Laughing at someone who trips is ___.", "unkind", ["kind", "reopen"]],
  ["Please ___ the map so we can see the whole town.", "unfold", ["refold", "preheat"]],
  ["Rosa will not eat beets because she ___ them.", "dislikes", ["likes", "refill"]],
  ["Toys and socks were all over the floor. Max's room was very ___.", "untidy", ["tidy", "replay"]],
  ["After reading the story, our teacher asked us to ___ it in our own words.", "retell", ["unpack", "dislike"]],
  ["Please ___ the lamp before you change the bulb.", "unplug", ["replay", "reheat"]],
  ["The video stopped, so we had to ___ it to the start.", "rewind", ["unpack", "dislike"]],
  ["After the flood, the town worked hard to ___ the bridge.", "rebuild", ["unwrap", "prepay"]],
];
// [prefix, base]
const V25EN8_PRW = [["un", "buckle"], ["un", "pack"], ["un", "zip"], ["un", "plug"], ["un", "lucky"], ["un", "tidy"], ["un", "cover"], ["un", "fold"], ["un", "load"],
  ["re", "heat"], ["re", "wind"], ["re", "check"], ["re", "open"], ["re", "tell"], ["re", "write"], ["re", "fill"], ["re", "build"], ["pre", "heat"], ["pre", "school"],
  ["pre", "test"], ["pre", "cut"], ["dis", "appear"], ["dis", "connect"], ["dis", "honest"], ["dis", "agree"], ["dis", "like"], ["un", "safe"], ["un", "kind"],
  ["re", "play"], ["re", "read"]];
// [word, letters it starts with, the rest (not a word)]
const V25EN8_PRX = [["uncle", "un", "cle"], ["under", "un", "der"], ["reach", "re", "ach"], ["ready", "re", "ady"], ["recess", "re", "cess"], ["recipe", "re", "cipe"],
  ["reason", "re", "ason"], ["rescue", "re", "scue"], ["pretty", "pre", "tty"], ["press", "pre", "ss"], ["pretzel", "pre", "tzel"], ["precious", "pre", "cious"],
  ["dish", "dis", "h"], ["distance", "dis", "tance"]];
const V25EN8_PRMEAN = { un: "not, or the opposite of", re: "again", pre: "before", dis: "not, or the opposite of" };
addBank(8, "english", "prefixes", 0.3, function () {
  const Q = V25EN8_Q, r = {};
  if (Math.random() < 0.55) {
    const i = R(0, V25EN8_PRS.length - 1), [s, a, ws] = V25EN8_PRS[i];
    ws.forEach(w => { r[w] = `${Q(w)} means “${V25EN8_PRM[w]}”, which doesn't fit this sentence.`; });
    return { q: `Which word fits the sentence?<div class="sentence">${V25EN8_BL(s)}</div>`, say: `Which word fits? ${V25EN8_SB(s)}`, opts: shuffle([a, ...ws]), ans: a, big: 1, why: `${V25EN8_C(a)} means “${V25EN8_PRM[a]}”: ${s.replace("___", a)}`, key: "v25s" + i, v25: { r } };
  }
  const i = R(0, V25EN8_PRW.length - 1), [p, b] = V25EN8_PRW[i], w = p + b;
  const same = shuffle(V25EN8_PRX.filter(x => x[1] === p)), rest = shuffle(V25EN8_PRX.filter(x => x[1] !== p)), fakes = same.slice(0, 2).concat(rest).slice(0, 3);
  fakes.forEach(([f, st, re]) => { r[f] = `${Q(f)} starts with ${Q(st)}, but ${Q(re)} isn't a word, so there's no prefix.`; });
  return { q: "Which word has a <b>prefix</b>?", say: "Which word has a prefix?", opts: shuffle([w, ...fakes.map(f => f[0])]), ans: w, big: 1, why: `${p}- is a prefix that means “${V25EN8_PRMEAN[p]}”: ${p} + ${b} = ${w}.`, key: "v25w" + w, v25: { r } };
});
whyRule(8, "english", "prefixes", V25EN8_RULE);

/* ---------- Past tense ---------- */
const V25EN8_PTY = {
  n: w => `${V25EN8_Q(w)} is a noun, a naming word, not a verb.`,
  a: w => `${V25EN8_Q(w)} is an adjective. It describes; it isn't an action.`,
  now: w => `${V25EN8_Q(w)} is an action happening now, not in the past.`,
  will: w => `${V25EN8_Q(w)} goes with “will”, so it tells about the future.`,
  ing: w => `${V25EN8_Q(w)} tells about something going on, not something done.`,
  t: w => `${V25EN8_Q(w)} is a time word, not an action word.`,
};
// [sentence, past-tense verb, [[other word, type], ...]]
const V25EN8_PTF = [
  ["Last night the strong wind blew our kite away.", "blew", [["strong", "a"], ["wind", "n"], ["kite", "n"]]],
  ["Now Mia rides the bus, but last year she walked to school.", "walked", [["rides", "now"], ["bus", "n"], ["school", "n"]]],
  ["Grandpa caught a big fish at the lake.", "caught", [["big", "a"], ["fish", "n"], ["lake", "n"]]],
  ["This morning, Leo spilled orange juice on the floor.", "spilled", [["morning", "t"], ["juice", "n"], ["floor", "n"]]],
  ["We will swim tomorrow, but today we stayed home.", "stayed", [["swim", "will"], ["tomorrow", "t"]]],
  ["The kitten climbed up the tall curtains.", "climbed", [["kitten", "n"], ["tall", "a"], ["curtains", "n"]]],
  ["Every day I feed the fish, but yesterday Dad fed them.", "fed", [["feed", "now"], ["fish", "n"], ["yesterday", "t"]]],
  ["The happy crowd cheered for the team.", "cheered", [["happy", "a"], ["crowd", "n"], ["team", "n"]]],
  ["Last summer, our family visited a big farm.", "visited", [["family", "n"], ["big", "a"], ["farm", "n"]]],
  ["Kai lost a tooth while eating an apple.", "lost", [["eating", "ing"], ["tooth", "n"], ["apple", "n"]]],
  ["The little mouse hid behind the box.", "hid", [["little", "a"], ["mouse", "n"], ["box", "n"]]],
  ["Rosa usually walks, but today she rode her bike.", "rode", [["walks", "now"], ["bike", "n"], ["today", "t"]]],
  ["Our class planted seeds in tiny cups.", "planted", [["class", "n"], ["seeds", "n"], ["tiny", "a"]]],
  ["Dad will cook tonight, because Mom cooked yesterday.", "cooked", [["cook", "will"], ["tonight", "t"], ["Dad", "n"]]],
  ["The baby giggled at the silly puppet.", "giggled", [["baby", "n"], ["silly", "a"], ["puppet", "n"]]],
  ["Last week, Omar found a shiny coin.", "found", [["week", "t"], ["shiny", "a"], ["coin", "n"]]],
  ["The frog jumped into the cool pond.", "jumped", [["frog", "n"], ["cool", "a"], ["pond", "n"]]],
  ["I am reading now, but earlier I wrote a letter.", "wrote", [["reading", "ing"], ["letter", "n"], ["now", "t"]]],
  ["The farmer carried two buckets of milk.", "carried", [["farmer", "n"], ["buckets", "n"], ["milk", "n"]]],
  ["Yesterday, we sang songs on the bus.", "sang", [["songs", "n"], ["bus", "n"], ["Yesterday", "t"]]],
  ["Nora knew the answer to every question.", "knew", [["Nora", "n"], ["answer", "n"], ["question", "n"]]],
  ["The wind is blowing now, but this morning it was calm.", "was", [["blowing", "ing"], ["calm", "a"], ["morning", "t"]]],
  ["My brother broke his arm, but now it feels better.", "broke", [["feels", "now"], ["arm", "n"], ["brother", "n"]]],
  ["Grandma taught me a new card game.", "taught", [["Grandma", "n"], ["new", "a"], ["game", "n"]]],
  ["The children built a snowman after school.", "built", [["children", "n"], ["snowman", "n"], ["school", "n"]]],
];
// [base, -s form, -ing form, past, rest of sentence]
const V25EN8_PTV = [
  ["jump", "jumps", "jumping", "jumped", "rope at recess"], ["bake", "bakes", "baking", "baked", "muffins with Grandma"], ["paint", "paints", "painting", "painted", "a picture of the sea"],
  ["swim", "swims", "swimming", "swam", "in the lake"], ["ride", "rides", "riding", "rode", "a bike to the park"], ["build", "builds", "building", "built", "a fort with blankets"],
  ["sing", "sings", "singing", "sang", "a song for Grandpa"], ["plant", "plants", "planting", "planted", "beans in the garden"], ["write", "writes", "writing", "wrote", "a letter to a friend"],
  ["feed", "feeds", "feeding", "fed", "the ducks at the pond"], ["catch", "catches", "catching", "caught", "a fish at the lake"], ["fly", "flies", "flying", "flew", "a kite on the hill"],
  ["carry", "carries", "carrying", "carried", "the groceries inside"], ["make", "makes", "making", "made", "pancakes for breakfast"], ["draw", "draws", "drawing", "drew", "a map of the town"],
  ["wash", "washes", "washing", "washed", "the dog in the yard"], ["climb", "climbs", "climbing", "climbed", "the big oak tree"], ["throw", "throws", "throwing", "threw", "the ball to Max"],
  ["eat", "eats", "eating", "ate", "lunch in the park"], ["visit", "visits", "visiting", "visited", "the science museum"], ["hop", "hops", "hopping", "hopped", "across the stones"],
];
const V25EN8_PTS = [["I", "am", 0], ["We", "are", 0], ["They", "are", 0], ["Mia", "is", 1], ["Leo", "is", 1], ["My brother", "is", 1]];
addBank(8, "english", "past", 0.3, function () {
  const Q = V25EN8_Q, r = {};
  if (Math.random() < 0.5) {
    const i = R(0, V25EN8_PTF.length - 1), [s, a, ws] = V25EN8_PTF[i];
    ws.forEach(([w, t]) => { r[w] = V25EN8_PTY[t](w); });
    return { q: `Which word is a <b>past tense</b> verb?<div class="sentence">${s}</div>`, say: `Which word is a past tense verb? ${s}`, opts: shuffle([a, ...ws.map(w => w[0])]), ans: a, big: 1, why: `${V25EN8_C(a)} is an action that already happened.`, key: "v25f" + i, v25: { r } };
  }
  const v = pick(V25EN8_PTV), [S, be, one] = pick(V25EN8_PTS), [b, s3, ing, past, rest] = v;
  const A = `${S} ${past} ${rest}.`, now = `${S} ${one ? s3 : b} ${rest}.`, fut = `${S} will ${b} ${rest}.`, go = `${S} ${be} ${ing} ${rest}.`;
  r[now] = "This sentence tells about something that happens now, not in the past.";
  r[fut] = "“will” tells about something that has not happened yet.";
  r[go] = `${Q(be + " " + ing)} tells about something happening right now.`;
  return { q: "Which sentence tells about something that <b>already happened</b>?", say: "Which sentence tells about something that already happened?", opts: shuffle([A, now, fut, go]), ans: A, why: `${V25EN8_C(past)} is the past tense of ${b}.`, key: "v25s" + b + S, v25: { r } };
});
whyRule(8, "english", "past", V25EN8_RULE);

/* ---------- Reading stories: new original passages ---------- */
// p: sentences; qs: [question, answer, [[wrong, reason] x3], index of the proof sentence]
const V25EN8_RD = [
  { p: ["Every Saturday, Priya and her grandpa ride the early bus to the farmers market.", "Grandpa buys honey from a woman with a striped umbrella.", "Priya always picks out one peach for the ride home.", "This week, the peaches were gone, so she chose a plum instead.", "She decided the plum was just as sweet."], qs: [
    ["When do Priya and her grandpa go to the market?", "every Saturday", [["every Sunday", "The story says they go every Saturday, not Sunday."], ["every evening", "The story says they ride the early bus on Saturdays."], ["once a year", "The story says they go every Saturday, not once a year."]], 0],
    ["How do they get to the market?", "by bus", [["by car", "The story says they ride the bus, not a car."], ["on bikes", "The story never says they ride bikes there."], ["on foot", "The story says they ride the bus, not walk."]], 0],
    ["What does Grandpa buy?", "honey", [["peaches", "Priya picks the peaches, but Grandpa buys honey."], ["bread", "The story never says that Grandpa buys bread."], ["an umbrella", "The umbrella belongs to the woman who sells honey."]], 1],
    ["Why did Priya choose a plum this week?", "The peaches were gone.", [["She did not like peaches.", "The story says she always picks a peach, so she likes them."], ["Grandpa told her to.", "The story never says that Grandpa chose the fruit."], ["Plums were cheaper.", "The story never talks about what the fruit cost."]], 3],
    ["What did Priya think of the plum?", "It was just as sweet.", [["It was too sour.", "The story says she decided it was just as sweet."], ["It was too small.", "The story never says anything about the plum's size."], ["It was not ripe.", "The story says she found the plum just as sweet."]], 4]] },
  { p: ["Penguins are birds, but they cannot fly.", "Instead, they use their wings like flippers to swim fast under the water.", "Penguins catch fish and other small sea animals to eat.", "Their thick feathers and a layer of fat help keep them warm in icy water."], qs: [
    ["What kind of animal is a penguin?", "a bird", [["a fish", "Penguins eat fish, but the passage says penguins are birds."], ["a seal", "The passage says penguins are birds, not seals."], ["an insect", "The passage says penguins are birds, not insects."]], 0],
    ["How do penguins use their wings?", "like flippers to swim", [["to fly high in the sky", "The passage says penguins cannot fly at all."], ["to dig holes in the snow", "The passage never says penguins dig holes."], ["to carry their food", "The passage never says they carry food with their wings."]], 1],
    ["What do penguins eat?", "fish and small sea animals", [["leaves and grass", "The passage says they eat fish and small sea animals."], ["seeds and nuts", "The passage says they eat fish and small sea animals."], ["ice and snow", "The passage says they eat fish, not ice."]], 2],
    ["What helps keep penguins warm?", "thick feathers and fat", [["warm, sunny weather", "The passage says they swim in icy water."], ["swimming very fast", "Swimming fast is how they move, not how they stay warm."], ["sleeping in nests", "The passage never mentions nests at all."]], 3],
    ["How do penguins swim?", "fast", [["slowly", "The passage says penguins swim fast under the water."], ["only at night", "The passage never says when penguins swim."], ["on their backs", "The passage never says they swim on their backs."]], 1]] },
  { p: ["Dev wanted to surprise his mom on her birthday.", "He woke up early and tiptoed into the kitchen.", "He made toast with strawberry jam and poured a glass of orange juice.", "When Mom came downstairs, she found breakfast waiting with a card Dev had drawn.", "She gave Dev a big hug."], qs: [
    ["Why did Dev wake up early?", "to surprise his mom", [["to catch the bus", "The story never mentions a bus at all."], ["to walk the dog", "The story never mentions a dog at all."], ["to finish his homework", "The story never mentions any homework."]], 0],
    ["Where did Dev make breakfast?", "in the kitchen", [["in his bedroom", "The story says he tiptoed into the kitchen."], ["at school", "The story says he made breakfast in the kitchen."], ["outside", "The story says he made breakfast in the kitchen."]], 1],
    ["What did Dev put on the toast?", "strawberry jam", [["butter", "The story says strawberry jam, not butter."], ["honey", "The story says strawberry jam, not honey."], ["orange juice", "He poured the juice into a glass, not on the toast."]], 2],
    ["What did Mom find with her breakfast?", "a card Dev had drawn", [["a bunch of flowers", "The story never mentions any flowers."], ["a new book", "The story never mentions a book."], ["a birthday cake", "The story never mentions a cake."]], 3],
    ["What did Mom do at the end?", "She gave Dev a big hug.", [["She went back to bed.", "The story never says that Mom went back to bed."], ["She made pancakes.", "The story never says that Mom made pancakes."], ["She called Grandma.", "The story never says that Mom called anyone."]], 4]] },
  { p: ["A caterpillar hatches from a tiny egg.", "It eats leaves and grows bigger and bigger.", "Then it makes a hard case around itself called a chrysalis.", "Inside, the caterpillar slowly changes.", "After about two weeks, a butterfly comes out and dries its wings."], qs: [
    ["What does a caterpillar hatch from?", "a tiny egg", [["a seed", "The passage says it hatches from a tiny egg."], ["a flower", "The passage says it hatches from a tiny egg."], ["a chrysalis", "A butterfly comes out of the chrysalis, not a caterpillar."]], 0],
    ["What does a caterpillar eat?", "leaves", [["bugs", "The passage says caterpillars eat leaves, not bugs."], ["seeds", "The passage says caterpillars eat leaves, not seeds."], ["nectar", "The passage says caterpillars eat leaves."]], 1],
    ["What is the hard case called?", "a chrysalis", [["a cocoon", "The passage calls the hard case a chrysalis."], ["a nest", "The passage calls the hard case a chrysalis."], ["a shell", "The passage calls the hard case a chrysalis."]], 2],
    ["What comes out of the chrysalis?", "a butterfly", [["a caterpillar", "The caterpillar goes in, and a butterfly comes out."], ["a bird", "The passage says a butterfly comes out."], ["a bee", "The passage says a butterfly comes out."]], 4],
    ["What happens first?", "The caterpillar hatches.", [["The butterfly dries its wings.", "That happens last, after the butterfly comes out."], ["The caterpillar makes a chrysalis.", "That happens after it eats and grows bigger."], ["The caterpillar changes inside.", "That happens after it makes the chrysalis."]], 0]] },
  { p: ["Rain tapped on the window all afternoon.", "Ben and his little sister Lulu were stuck inside.", "Lulu found an old shoebox, and Ben had an idea.", "They cut a door and windows into the box and turned it into a house for Lulu's toy mice.", "By dinnertime, the mice had a kitchen and two bedrooms."], qs: [
    ["What was the weather like?", "rainy", [["sunny", "The story says rain tapped on the window all afternoon."], ["snowy", "The story says it was rain, not snow."], ["windy", "The story never says that it was windy."]], 0],
    ["What did Lulu find?", "an old shoebox", [["a toy car", "The story says Lulu found an old shoebox."], ["a cereal box", "The story says it was a shoebox."], ["a paper bag", "The story says Lulu found an old shoebox."]], 2],
    ["What did they make from the box?", "a house for toy mice", [["a car for a doll", "The story says they made a house for toy mice."], ["a boat", "The story says they made a house for toy mice."], ["a robot", "The story says they made a house for toy mice."]], 3],
    ["Who had the idea?", "Ben", [["Lulu", "Lulu found the box, but Ben had the idea."], ["Mom", "The story never mentions Mom at all."], ["Dad", "The story never mentions Dad at all."]], 2],
    ["What did the mouse house have by dinnertime?", "a kitchen and two bedrooms", [["a pool and a garden", "The story says a kitchen and two bedrooms."], ["just one big room", "The story says it had a kitchen and two bedrooms."], ["a garage", "The story says a kitchen and two bedrooms."]], 4]] },
  { p: ["Beavers are great builders.", "They use their strong front teeth to cut down small trees.", "Then they pile up sticks, rocks, and mud to make a dam across a stream.", "The dam makes a pond where the beavers build their home, called a lodge."], qs: [
    ["What do beavers use to cut down trees?", "their strong front teeth", [["their flat tails", "The passage says they use their strong front teeth."], ["their claws", "The passage says they use their strong front teeth."], ["sharp rocks", "Rocks go into the dam. They don't cut trees."]], 1],
    ["What do beavers use to build a dam?", "sticks, rocks, and mud", [["bricks and glue", "The passage says sticks, rocks, and mud."], ["sand and shells", "The passage says sticks, rocks, and mud."], ["only leaves", "The passage says sticks, rocks, and mud."]], 2],
    ["What is a beaver's home called?", "a lodge", [["a nest", "The passage says a beaver's home is called a lodge."], ["a den", "The passage says a beaver's home is called a lodge."], ["a dam", "The dam makes the pond. The home is the lodge."]], 3],
    ["What does the dam make?", "a pond", [["a waterfall", "The passage says the dam makes a pond."], ["a mountain", "The passage says the dam makes a pond."], ["a river", "The dam goes across a stream and makes a pond."]], 3],
    ["What is the main idea?", "Beavers are great builders.", [["Beavers are fast swimmers.", "The passage never talks about how beavers swim."], ["Beavers eat lots of fish.", "The passage never talks about what beavers eat."], ["Ponds are very cold.", "The passage is mostly about beavers building things."]], 0]] },
  { p: ["Hana's class grew a sunflower by the school fence.", "Each Friday, they measured it with a long ruler.", "In May, it was as tall as Hana's knee.", "By June, it was taller than the teacher!", "Hana took a picture so she could show her family."], qs: [
    ["Where did the class grow the sunflower?", "by the school fence", [["in the classroom", "The story says the sunflower grew by the school fence."], ["at Hana's house", "The story says the sunflower grew by the school fence."], ["in the park", "The story says the sunflower grew by the school fence."]], 0],
    ["When did they measure it?", "each Friday", [["each Monday", "The story says they measured it each Friday."], ["every hour", "The story says they measured it each Friday."], ["only once", "The story says they measured it every Friday."]], 1],
    ["How tall was it in May?", "as tall as Hana's knee", [["taller than the teacher", "That was in June, not in May."], ["as tall as the fence", "The story says it was as tall as Hana's knee."], ["as tall as a house", "The story says it was as tall as Hana's knee."]], 2],
    ["Why did Hana take a picture?", "to show her family", [["to enter a contest", "The story says she wanted to show her family."], ["to give to the teacher", "The story says she wanted to show her family."], ["to put in a book", "The story says she wanted to show her family."]], 4],
    ["What did they use to measure it?", "a long ruler", [["a piece of string", "The story says they used a long ruler."], ["their hands", "The story says they used a long ruler."], ["a measuring cup", "The story says they used a long ruler."]], 1]] },
  { p: ["Your heart is a muscle about the size of your fist.", "It pumps blood all through your body.", "When you run or jump, your heart beats faster.", "When you sleep, it slows down.", "You can feel your heartbeat by putting two fingers on your wrist."], qs: [
    ["How big is your heart?", "about the size of your fist", [["as big as your head", "The passage says it is about the size of your fist."], ["as small as a pea", "The passage says it is about the size of your fist."], ["as big as a basketball", "The passage says it is about the size of your fist."]], 0],
    ["What does your heart pump?", "blood", [["air", "The passage says your heart pumps blood, not air."], ["water", "The passage says your heart pumps blood, not water."], ["food", "The passage says your heart pumps blood, not food."]], 1],
    ["What happens to your heart when you run?", "It beats faster.", [["It slows down.", "It slows down when you sleep, not when you run."], ["It stops.", "The passage says it beats faster when you run."], ["It gets smaller.", "The passage says it beats faster when you run."]], 2],
    ["When does your heart slow down?", "when you sleep", [["when you jump", "Jumping makes your heart beat faster, not slower."], ["when you run", "Running makes your heart beat faster, not slower."], ["when you eat", "The passage says it slows down when you sleep."]], 3],
    ["Where can you feel your heartbeat?", "on your wrist", [["on your knee", "The passage says to put two fingers on your wrist."], ["on your nose", "The passage says to put two fingers on your wrist."], ["on your elbow", "The passage says to put two fingers on your wrist."]], 4]] },
  { p: ["Carlos was nervous about his first swim lesson.", "The water looked deep and cold.", "His teacher, Ms. Kemp, showed him how to blow bubbles and float on his back.", "By the end of the lesson, Carlos was splashing and laughing.", "He asked Dad if he could come back the next day."], qs: [
    ["How did Carlos feel before the lesson?", "nervous", [["excited", "The story says Carlos was nervous about the lesson."], ["angry", "The story says Carlos was nervous, not angry."], ["sleepy", "The story says Carlos was nervous, not sleepy."]], 0],
    ["Who is Carlos's swim teacher?", "Ms. Kemp", [["Dad", "Dad is in the story, but the teacher is Ms. Kemp."], ["Mrs. Lee", "The story says his teacher is Ms. Kemp."], ["his sister", "The story says his teacher is Ms. Kemp."]], 2],
    ["What did Ms. Kemp teach Carlos?", "to blow bubbles and float", [["to dive off a board", "The story says she taught him to blow bubbles and float."], ["to swim fast laps", "The story says she taught him to blow bubbles and float."], ["to ride a bike", "The story says she taught him to blow bubbles and float."]], 2],
    ["How did Carlos feel at the end?", "happy", [["nervous", "He was nervous at first, but at the end he was laughing."], ["bored", "The story says he was splashing and laughing."], ["angry", "The story says he was splashing and laughing."]], 3],
    ["What did Carlos ask Dad?", "if he could come back the next day", [["if they could get ice cream", "The story says he asked to come back the next day."], ["if he could stop the lessons", "The story says he wanted to come back the next day."], ["if Ms. Kemp could visit", "The story says he asked to come back the next day."]], 4]] },
  { p: ["Some deserts are hot and dry, with very little rain.", "Cactus plants grow well there.", "A cactus stores water inside its thick stem.", "Its sharp spines help keep thirsty animals from taking a bite.", "Some cactus plants can live for more than one hundred years."], qs: [
    ["What is the weather like in some deserts?", "hot and dry", [["cold and snowy", "The passage says some deserts are hot and dry."], ["wet and rainy", "The passage says deserts get very little rain."], ["cool and foggy", "The passage says some deserts are hot and dry."]], 0],
    ["Where does a cactus store water?", "inside its thick stem", [["in its flowers", "The passage says the water is inside its thick stem."], ["in a pond nearby", "The passage says the water is inside its thick stem."], ["in its spines", "The spines protect it. The water is in the stem."]], 2],
    ["How do the spines help a cactus?", "They keep animals from biting it.", [["They hold water.", "The passage says the water is in the stem."], ["They help it grow fast.", "The passage says spines keep animals from taking a bite."], ["They make it pretty.", "The passage says spines keep animals from taking a bite."]], 3],
    ["How long can some cactus plants live?", "more than one hundred years", [["one week", "The passage says more than one hundred years."], ["ten days", "The passage says more than one hundred years."], ["one summer", "The passage says more than one hundred years."]], 4],
    ["Why does a cactus need to store water?", "Deserts get very little rain.", [["Cactus plants are too heavy.", "The passage says deserts get very little rain."], ["Animals bring it water.", "The passage never says animals bring water to a cactus."], ["It snows every day.", "The passage says some deserts are hot and dry."]], 0]] },
  { p: ["Mr. Patel's garden had a problem.", "Every night, something nibbled his lettuce.", "One morning, he spotted tiny footprints in the dirt and a fluffy white tail hopping away.", "Mr. Patel laughed and planted an extra row of lettuce just for the rabbit."], qs: [
    ["What was the problem in the garden?", "Something nibbled the lettuce.", [["The plants needed water.", "The story says something nibbled the lettuce."], ["Birds ate the seeds.", "The story never mentions any birds."], ["The fence fell down.", "The story never mentions a fence."]], 1],
    ["When did the nibbling happen?", "every night", [["every morning", "He found clues in the morning, but the nibbling was at night."], ["at lunchtime", "The story says the nibbling happened every night."], ["on Sundays", "The story says the nibbling happened every night."]], 1],
    ["What clues did Mr. Patel find?", "tiny footprints and a white tail", [["a feather and an egg", "The story says he found footprints and a white tail."], ["a muddy boot", "The story says he found footprints and a white tail."], ["a bird's nest", "The story says he found footprints and a white tail."]], 2],
    ["Who was eating the lettuce?", "a rabbit", [["a deer", "The story says the lettuce was for the rabbit."], ["a goat", "The story says the lettuce was for the rabbit."], ["a squirrel", "The story says the lettuce was for the rabbit."]], 3],
    ["What did Mr. Patel do at the end?", "planted extra lettuce for the rabbit", [["built a tall fence", "The story says he planted extra lettuce for the rabbit."], ["chased the rabbit away", "He laughed and planted more lettuce for it."], ["pulled up all the lettuce", "The story says he planted an extra row of lettuce."]], 3]] },
  { p: ["Long ago, people did not have refrigerators.", "To keep food cold, some families used an icebox.", "An icebox was a wooden cabinet with a big block of ice inside.", "A worker called the iceman brought a new block of ice to homes every few days."], qs: [
    ["What did some families use long ago to keep food cold?", "an icebox", [["a refrigerator", "The passage says people did not have refrigerators long ago."], ["a freezer", "The passage says some families used an icebox."], ["an oven", "An oven makes food hot, and the passage says icebox."]], 1],
    ["What was an icebox made of?", "wood", [["glass", "The passage says an icebox was a wooden cabinet."], ["metal", "The passage says an icebox was a wooden cabinet."], ["plastic", "The passage says an icebox was a wooden cabinet."]], 2],
    ["What was inside an icebox?", "a big block of ice", [["a fan", "The passage says there was a big block of ice."], ["a light", "The passage says there was a big block of ice."], ["snow", "The passage says there was a big block of ice."]], 2],
    ["Who brought the ice?", "the iceman", [["the mail carrier", "The passage says a worker called the iceman brought it."], ["a farmer", "The passage says a worker called the iceman brought it."], ["the family's kids", "The passage says a worker called the iceman brought it."]], 3],
    ["How often did the iceman come?", "every few days", [["once a year", "The passage says the iceman came every few days."], ["every hour", "The passage says the iceman came every few days."], ["only in winter", "The passage says the iceman came every few days."]], 3]] },
  { p: ["Zoe and her friend Malik set up a lemonade stand on a hot afternoon.", "At first, no one stopped.", "Then Malik painted a bright sign with a smiling sun on it.", "Soon, neighbors lined up for a cup.", "The kids gave half of the money they earned to the animal shelter."], qs: [
    ["What did Zoe and Malik sell?", "lemonade", [["cookies", "The story says they set up a lemonade stand."], ["ice cream", "The story says they set up a lemonade stand."], ["flowers", "The story says they set up a lemonade stand."]], 0],
    ["What happened at first?", "No one stopped.", [["Neighbors lined up.", "That happened later, after Malik made the sign."], ["It started to rain.", "The story says it was a hot afternoon."], ["They ran out of cups.", "The story never says they ran out of cups."]], 1],
    ["What did Malik paint on the sign?", "a smiling sun", [["a big lemon", "The story says he painted a smiling sun."], ["a dog", "The story says he painted a smiling sun."], ["a rainbow", "The story says he painted a smiling sun."]], 2],
    ["What did the kids do with half of the money?", "gave it to the animal shelter", [["bought toys", "The story says they gave half to the animal shelter."], ["saved it in a bank", "The story says they gave half to the animal shelter."], ["bought more lemons", "The story says they gave half to the animal shelter."]], 4],
    ["What happened right after Malik painted the sign?", "Neighbors lined up for a cup.", [["The lemonade was free.", "The story never says the lemonade was free."], ["It started to snow.", "The story says it was a hot afternoon."], ["Zoe sang a song.", "The story never says that Zoe sang anything."]], 3]] },
  { p: ["Owls hunt mostly at night.", "Their big eyes help them see in the dark.", "Owls also have very good hearing, so they can find a mouse moving under leaves.", "Their soft feathers let them fly almost without a sound."], qs: [
    ["When do owls mostly hunt?", "at night", [["at noon", "The passage says owls hunt mostly at night."], ["in the morning", "The passage says owls hunt mostly at night."], ["only in summer", "The passage says owls hunt mostly at night."]], 0],
    ["What helps owls see in the dark?", "their big eyes", [["their soft feathers", "Soft feathers help them fly quietly, not see."], ["their sharp beaks", "The passage says their big eyes help them see."], ["their long tails", "The passage says their big eyes help them see."]], 1],
    ["How can an owl find a mouse under leaves?", "It has very good hearing.", [["It can smell very well.", "The passage says owls have very good hearing."], ["It digs in the dirt.", "The passage says owls find mice by hearing them."], ["It waits for the sun.", "The passage says owls hunt mostly at night."]], 2],
    ["Why can owls fly almost without a sound?", "They have soft feathers.", [["They have big eyes.", "Big eyes help owls see, not fly quietly."], ["They fly very slowly.", "The passage says soft feathers make them quiet."], ["They fly only in daytime.", "The passage says owls hunt mostly at night."]], 3],
    ["What is the passage mostly about?", "how owls hunt", [["how owls build nests", "The passage never talks about nests at all."], ["what mice like to eat", "The passage is mostly about owls, not mice."], ["how leaves fall", "The passage is mostly about how owls hunt."]], 0]] },
];
addBank(8, "english", "reading8", 0.3, function () {
  const i = R(0, V25EN8_RD.length - 1), P = V25EN8_RD[i], j = R(0, P.qs.length - 1), [q, a, ws, pi] = P.qs[j], text = P.p.join(" "), r = {};
  ws.forEach(([w, why]) => { r[w] = why; });
  return { q, vis: passage(text), say: `${text} ${q}`, opts: shuffle([a, ...ws.map(w => w[0])]), ans: a, why: `The ${i % 2 ? "passage" : "story"} says: "${P.p[pi]}"`, extra: 20, key: "v25-" + i + "-" + j, v25: { r } };
});
whyRule(8, "english", "reading8", V25EN8_RULE);

/* ---------- ABC order: between, guide words, whole lists ---------- */
const V25EN8_ABW = ["acorn", "badge", "bacon", "beetle", "bubble", "canoe", "candle", "cobweb", "daisy", "dolphin", "eagle", "feather", "fossil", "goose", "gravel",
  "hammock", "helmet", "island", "jacket", "kettle", "ladder", "lantern", "marble", "meadow", "napkin", "noodle", "otter", "pebble", "pepper", "pickle", "puddle",
  "quilt", "robin", "rocket", "saddle", "salmon", "tulip", "turnip", "valley", "walrus", "wagon", "yogurt", "zipper"];
const V25EN8_NTH = ["first", "second", "third", "fourth", "fifth", "sixth"];
function V25EN8_ab(a, b) {
  let i = 0; while (a[i] === b[i]) i++;
  const rel = a < b ? "before" : "after";
  return i === 0 ? `${a[0]} comes ${rel} ${b[0]}` : `the ${V25EN8_NTH[i]} letter ${a[i]} comes ${rel} ${b[i]}`;
}
addBank(8, "english", "abc", 0.3, function () {
  const Q = V25EN8_Q, k = Math.random(), r = {};
  if (k < 0.65) {
    const w = shuffle(V25EN8_ABW).slice(0, 6).sort(), [w0, X, a, Y, w4, w5] = w, guide = k < 0.32;
    [w0].forEach(x => { r[x] = guide ? `${Q(x)} comes before ${Q(X)}, so it's on an earlier page.` : `${Q(x)} comes before ${Q(X)}, because ${V25EN8_ab(x, X)}.`; });
    [w4, w5].forEach(x => { r[x] = guide ? `${Q(x)} comes after ${Q(Y)}, so it's on a later page.` : `${Q(x)} comes after ${Q(Y)}, because ${V25EN8_ab(x, Y)}.`; });
    const opts = shuffle([a, w0, w4, w5]), why = `In ABC order, ${a} comes after ${X} and before ${Y}.`;
    if (guide) return { q: `A dictionary page has the guide words <b>${X}</b> and <b>${Y}</b>. Which word is on that page?`, say: `A dictionary page has the guide words ${X} and ${Y}. Which word is on that page?`, opts, ans: a, big: 1, why, key: "v25g" + X + a + Y, v25: { r } };
    return { q: `Which word comes <b>between</b> ${X} and ${Y} in ABC order?`, say: `Which word comes between ${X} and ${Y} in A B C order?`, opts, ans: a, big: 1, why, key: "v25b" + X + a + Y, v25: { r } };
  }
  const w = shuffle(V25EN8_ABW).slice(0, 3).sort(), [x, y, z] = w, ans = w.join(", ");
  const perms = shuffle([[y, x, z], [x, z, y], [z, y, x], [y, z, x], [z, x, y]]).slice(0, 3), opts = [ans];
  perms.forEach(p => { const s = p.join(", "), i = p[0] > p[1] ? 0 : 1; opts.push(s); r[s] = `${Q(p[i + 1])} should come before ${Q(p[i])}, because ${V25EN8_ab(p[i + 1], p[i])}.`; });
  return { q: "Which list is in <b>ABC order</b>?", say: "Which list is in A B C order?", opts: shuffle(opts), ans, why: `In ABC order: ${ans}.`, key: "v25l" + ans, v25: { r } };
});
whyRule(8, "english", "abc", V25EN8_RULE);

/* ---------- Pronouns ---------- */
const V25EN8_PNU = { his: "is for a boy or man", her: "is for a girl or woman", its: "is for one thing or animal", their: "is for more than one",
  my: "is for just the person talking", our: "is for a group that includes the speaker",
  himself: "is for a boy or man", herself: "is for a girl or woman", itself: "is for one thing or animal", themselves: "is for more than one",
  myself: "is for just the person talking", ourselves: "is for a group that includes the speaker" };
// [sentence, answer, who it means, wrongs]
const V25EN8_PNP = [
  ["Grandpa rubbed ___ sleepy eyes.", "his", "Grandpa", ["her", "their", "its"]], ["My sister brushed ___ teeth.", "her", "my sister", ["his", "their", "its"]],
  ["The tree dropped all of ___ leaves.", "its", "the tree", ["their", "his", "our"]], ["The twins blew out ___ birthday candles.", "their", "the twins", ["his", "her", "its"]],
  ["The king scratched ___ beard.", "his", "the king", ["her", "its", "their"]], ["The queen waved ___ hand at the crowd.", "her", "the queen", ["his", "its", "their"]],
  ["The puppies wagged ___ tails.", "their", "the puppies", ["its", "his", "our"]], ["The dog wagged ___ tail.", "its", "the dog", ["their", "it's", "our"]],
  ["The baby girl grabbed ___ toes.", "her", "the baby girl", ["his", "its", "their"]], ["Dad shaved ___ chin.", "his", "Dad", ["her", "its", "their"]],
  ["My brother hurt ___ knee.", "his", "my brother", ["her", "its", "their"]], ["The cat licked ___ paw.", "its", "the cat", ["it's", "their", "our"]],
  ["The geese flapped ___ wings.", "their", "the geese", ["its", "his", "our"]], ["I wash ___ hands before lunch.", "my", "the speaker", ["his", "their", "its"]],
  ["We put on ___ coats and went outside.", "our", "us", ["my", "his", "its"]], ["The car flashed ___ lights.", "its", "the car", ["it's", "their", "his"]],
  ["The girls tied ___ shoes.", "their", "the girls", ["her", "its", "his"]], ["My friends and I opened ___ lunch boxes.", "our", "my friends and me", ["my", "his", "its"]],
  ["The snowman lost ___ carrot nose.", "its", "the snowman", ["it's", "their", "our"]], ["Ms. Diaz cleared ___ throat.", "her", "Ms. Diaz", ["his", "its", "their"]],
  ["The giraffe stretched ___ long neck.", "its", "the giraffe", ["it's", "their", "our"]],
];
// [sentence, partner]: the blank is I or me
const V25EN8_PNI = [
  ["Rosa and ___ built a fort.", "Rosa"], ["Grandpa and ___ went fishing.", "Grandpa"], ["Dad drove Leo and ___ to school.", "Leo"], ["Mom made pancakes for Kai and ___.", "Kai"],
  ["My cousin and ___ fed the ducks.", "My cousin"], ["The coach cheered for Omar and ___.", "Omar"], ["Ms. Lee asked Zoe and ___ to help.", "Zoe"],
  ["Dad and ___ washed the car.", "Dad"], ["Grandma sent a letter to Mia and ___.", "Mia"], ["My brother and ___ shared the popcorn.", "My brother"],
  ["The puppy followed Sam and ___ home.", "Sam"], ["Ava and ___ planted tulips.", "Ava"], ["Mom took Kofi and ___ to the library.", "Kofi"],
  ["Lily and ___ made a card for Grandpa.", "Lily"], ["The teacher read to Ben and ___.", "Ben"], ["Aunt Rosa and ___ baked bread.", "Aunt Rosa"],
  ["Uncle Joe showed Ella and ___ his garden.", "Ella"], ["The new kid and ___ played tag.", "The new kid"], ["Dad bought ice cream for Nora and ___.", "Nora"],
  ["Kai and ___ cleaned up the toys.", "Kai"], ["A butterfly landed near Omar and ___.", "Omar"], ["Our neighbor and ___ raked the leaves.", "Our neighbor"],
];
// [sentence, answer, who it means, wrongs]
const V25EN8_PNR = [
  ["Leo built the model plane all by ___.", "himself", "Leo", ["herself", "themselves", "myself"]], ["Grandma taught ___ to play the guitar.", "herself", "Grandma", ["himself", "itself", "themselves"]],
  ["The cat washed ___ with its tongue.", "itself", "the cat", ["themselves", "myself", "ourselves"]], ["The kids cleaned up the room by ___.", "themselves", "the kids", ["himself", "herself", "itself"]],
  ["I tied my shoes by ___.", "myself", "the speaker", ["himself", "herself", "themselves"]], ["We made dinner all by ___.", "ourselves", "us", ["myself", "himself", "itself"]],
  ["My sister drew a picture of ___.", "herself", "my sister", ["himself", "itself", "themselves"]], ["Dad bumped ___ on the door.", "himself", "Dad", ["herself", "itself", "themselves"]],
  ["The puppies tired ___ out.", "themselves", "the puppies", ["itself", "himself", "herself"]], ["The door closed by ___.", "itself", "the door", ["himself", "herself", "themselves"]],
  ["Ava poured ___ a glass of milk.", "herself", "Ava", ["himself", "itself", "themselves"]], ["My brother and I washed the dog by ___.", "ourselves", "my brother and me", ["myself", "himself", "itself"]],
  ["Uncle Ray fixed the sink by ___.", "himself", "Uncle Ray", ["herself", "itself", "themselves"]], ["The girls served ___ some salad.", "themselves", "the girls", ["herself", "himself", "itself"]],
  ["I taught ___ a new card trick.", "myself", "the speaker", ["himself", "herself", "themselves"]], ["The baby boy looked at ___ in the mirror.", "himself", "the baby boy", ["herself", "itself", "themselves"]],
  ["The queen made ___ a cup of tea.", "herself", "the queen", ["himself", "itself", "themselves"]], ["The robot turned ___ off.", "itself", "the robot", ["himself", "themselves", "myself"]],
  ["We enjoyed ___ at the fair.", "ourselves", "us", ["myself", "himself", "itself"]], ["Kai wrapped the gift by ___.", "himself", "Kai", ["herself", "itself", "themselves"]],
];
addBank(8, "english", "pronouns", 0.3, function () {
  const Q = V25EN8_Q, k = Math.random(), r = {};
  if (k < 0.34) {
    const i = R(0, V25EN8_PNP.length - 1), [s, a, who, ws] = V25EN8_PNP[i];
    ws.forEach(w => { r[w] = w === "it's" ? "“it's” means “it is”. To show owning, use “its”." : `${Q(w)} ${V25EN8_PNU[w]}, but here it means ${who}.`; });
    return { q: `Which pronoun fits?<div class="sentence">${V25EN8_BL(s)}</div>`, say: `Which pronoun fits? ${V25EN8_SB(s)}`, opts: shuffle([a, ...ws]), ans: a, big: 1, why: `${s.replace("___", a)} ${V25EN8_C(a)} means ${who}.`, key: "v25p" + i, v25: { r } };
  }
  if (k < 0.67) {
    const i = R(0, V25EN8_PNI.length - 1), [s, partner] = V25EN8_PNI[i], subj = s.startsWith(partner), a = subj ? "I" : "me", w = subj ? "me" : "I";
    const alone = x => { const t = s.replace(partner + " and ", "").replace("___", x).replace(/\.$/, ""); return V25EN8_C(t); };
    r[w] = `Try it alone: we say ${Q(alone(a))}, not ${Q(alone(w))}.`;
    return { q: `Which word fits?<div class="sentence">${V25EN8_BL(s)}</div>`, say: `Which word fits? ${V25EN8_SB(s)}`, opts: shuffle(["I", "me"]), ans: a, big: 1, why: `${s.replace("___", a)} Take away ${V25EN8_lc(partner.replace(/^(My|Our)\b/, m => m.toLowerCase()))} to check: ${alone(a)}.`, key: "v25i" + i, v25: { r } };
  }
  const i = R(0, V25EN8_PNR.length - 1), [s, a, who, ws] = V25EN8_PNR[i];
  ws.forEach(w => { r[w] = `${Q(w)} ${V25EN8_PNU[w]}, but here it means ${who}.`; });
  return { q: `Which pronoun fits?<div class="sentence">${V25EN8_BL(s)}</div>`, say: `Which pronoun fits? ${V25EN8_SB(s)}`, opts: shuffle([a, ...ws]), ans: a, big: 1, why: `${s.replace("___", a)} ${V25EN8_C(a)} means ${who}.`, key: "v25r" + i, v25: { r } };
});
whyRule(8, "english", "pronouns", V25EN8_RULE);

/* ---------- Capital letters: titles, names of places and holidays, extra capitals ---------- */
const V25EN8_SMALL = ["a", "an", "the", "and", "of", "in", "on", "at", "for", "to", "with"];
const V25EN8_TITLES = ["the fox and the moon", "a day at the lake", "the secret of the old barn", "a home for a hedgehog", "the big race in the park", "lost in the snow",
  "a gift for grandma", "the girl who loved bugs", "pancakes on a rainy day", "the dragon and the kite", "a trip to the moon", "the mystery of the missing mitten",
  "a song for the stars", "the tiny turtle and the tall tree", "camping with uncle joe", "the best day of summer", "a hat for a cat", "planting seeds with dad",
  "the robot in the garden", "how bees make honey", "the bear who could not sleep", "a picnic on the hill", "the lost key", "my best friend and me"];
const V25EN8_cw = (w, i) => i === 0 || !V25EN8_SMALL.includes(w);
addBank(8, "english", "capitals", 0.3, function () {
  const Q = V25EN8_Q, C = V25EN8_C, k = Math.random(), r = {};
  if (k < 0.36) {
    const i = R(0, V25EN8_TITLES.length - 1), ws = V25EN8_TITLES[i].split(" "), T = f => ws.map((w, j) => f(w, j) ? C(w) : w).join(" ");
    const A = T(V25EN8_cw), opts = [A], add = (s, why) => { if (!opts.includes(s) && opts.length < 4) { opts.push(s); r[s] = why; } };
    const imp = ws.map((w, j) => j).filter(j => j > 0 && !V25EN8_SMALL.includes(ws[j])), sm = ws.findIndex((w, j) => j > 0 && V25EN8_SMALL.includes(w));
    if (sm > 0) add(T(() => true), `Small words like ${Q(ws[sm])} stay lowercase unless they come first.`);
    if (imp.length) { const j = pick(imp); add(T((w, x) => V25EN8_cw(w, x) && x !== j), `${Q(C(ws[j]))} is an important word, so it needs a capital letter.`); }
    if (imp.length) add(T((w, x) => x === 0), `Important words like ${Q(C(ws[imp[imp.length - 1]]))} need capital letters too.`);
    add(T((w, x) => V25EN8_cw(w, x) && x !== 0), "The first word of a title always gets a capital letter.");
    if (imp.length > 1) { const j = imp[0]; add(T((w, x) => V25EN8_cw(w, x) && x !== j), `${Q(C(ws[j]))} is an important word, so it needs a capital letter.`); }
    return { q: "Which book title uses <b>capital letters</b> correctly?", say: "Which book title uses capital letters correctly?", opts: shuffle(opts), ans: A, why: "Capitalize the first word and every important word. Small words like a, the, and, of stay lowercase.", key: "v25t" + i, v25: { r } };
  }
  if (k < 0.68) {
    const L = V25EN8_CAPN, i = R(0, L.length - 1), [raw, kind] = L[i], ph = raw.match(/\{(.+?)\}/)[1], ws = ph.split(" ");
    const A = ws.map(C).join(" "), low = ph, opts = [A, low]; r[low] = `${Q(A)} is ${kind}, so each word needs a capital letter.`;
    shuffle(ws.map((w, j) => j)).forEach(j => { if (opts.length >= 4) return; const s = ws.map((w, x) => x === j ? w : C(w)).join(" "); if (!opts.includes(s)) { opts.push(s); r[s] = `${Q(C(ws[j]))} is part of the name, so it needs a capital too.`; } });
    const s = raw.replace(/\{.+?\}/, "___");
    return { q: `Which words fill the blank correctly?<div class="sentence">${V25EN8_BL(s)}</div>`, say: `Which words fill the blank correctly? ${V25EN8_SB(s)}`, opts: shuffle(opts), ans: A, big: 1, why: `${A} is ${kind}, so every word in it starts with a capital letter.`, key: "v25n" + i, v25: { r } };
  }
  const L = V25EN8_CAPX, i = R(0, L.length - 1), [s, bad, oks, badWhy] = L[i];
  oks.forEach(([w, t]) => { r[w] = `${Q(w)} ${V25EN8_CAPT[t]}`; });
  return { q: `Which word should <b>not</b> have a capital letter?<div class="sentence">${s}</div>`, say: `Which word should not have a capital letter? ${s}`, opts: shuffle([bad, ...oks.map(o => o[0])]), ans: bad, big: 1, why: badWhy || `${Q(bad)} is an everyday word here, so it should start with a small letter.`, key: "v25x" + i, v25: { r } };
});
// [sentence with {name}, what kind of name]
const V25EN8_CAPN = [
  ["We live on {maple street}.", "the name of a street"], ["The bus goes down {river road}.", "the name of a road"], ["Our new library is on {elm avenue}.", "the name of a street"],
  ["We had a picnic at {oak park}.", "the name of a park"], ["We swam in {willow lake} last summer.", "the name of a lake"], ["We hiked in the {rocky mountains}.", "the name of a mountain range"],
  ["Whales swim in the {pacific ocean}.", "the name of an ocean"], ["We saw the {grand canyon} on our trip.", "the name of a place"], ["Our boat sailed on {lake michigan}.", "the name of a lake"],
  ["My aunt lives in {new york}.", "the name of a place"], ["Many penguins live near the {south pole}.", "the name of a place"], ["My cousin moved to {south dakota}.", "the name of a state"],
  ["We plant a tree every year on {earth day}.", "the name of a holiday"], ["I made Mom a card for {mother's day}.", "the name of a holiday"], ["We hang our flag on {flag day}.", "the name of a holiday"],
  ["We give cards to friends on {valentine's day}.", "the name of a holiday"], ["School is closed on {labor day}.", "the name of a holiday"], ["Our family eats turkey on {thanksgiving day}.", "the name of a holiday"],
  ["We went to a parade on {new year's day}.", "the name of a holiday"], ["My school is {pine hill school}.", "the name of a school"], ["We borrowed books from {oak park library}.", "the name of a library"],
  ["The {mississippi river} is very long.", "the name of a river"],
];
const V25EN8_CAPT = { s: "starts the sentence, so it needs a capital letter.", n: "is a name, so it needs a capital letter.", d: "is a day of the week, so it needs a capital letter.",
  m: "is a month, so it needs a capital letter.", p: "is the name of a place, so it needs a capital letter.", i: "is always written as a capital letter.", h: "is part of a holiday's name, so it needs a capital letter." };
// [sentence, wrongly capitalized word, [[correct capital word, type], ...], optional why]
const V25EN8_CAPX = [
  ["On Friday, my Dog chased Max's ball.", "Dog", [["On", "s"], ["Friday", "d"], ["Max's", "n"]]],
  ["Mia and I went to the Park in June.", "Park", [["Mia", "n"], ["I", "i"], ["June", "m"]]],
  ["Last Tuesday, Leo saw a Rainbow.", "Rainbow", [["Last", "s"], ["Tuesday", "d"], ["Leo", "n"]]],
  ["My Teacher, Ms. Green, lives in Texas.", "Teacher", [["My", "s"], ["Green", "n"], ["Texas", "p"]]],
  ["In July, Grandma grows big Tomatoes.", "Tomatoes", [["In", "s"], ["July", "m"], ["Grandma", "n"]]],
  ["Can Omar and I play Soccer on Sunday?", "Soccer", [["Omar", "n"], ["I", "i"], ["Sunday", "d"]]],
  ["We visited Florida in March to see the Ocean.", "Ocean", [["We", "s"], ["Florida", "p"], ["March", "m"]]],
  ["Every Monday, Nora's Cat sleeps on the porch.", "Cat", [["Every", "s"], ["Monday", "d"], ["Nora's", "n"]]],
  ["On Thanksgiving, we ate Pie with Aunt Rosa.", "Pie", [["On", "s"], ["Thanksgiving", "h"], ["Rosa", "n"]]],
  ["Every Saturday, Kai walks his Puppy.", "Puppy", [["Every", "s"], ["Saturday", "d"], ["Kai", "n"]]],
  ["My friend Ava moved to Canada in the Winter.", "Winter", [["My", "s"], ["Ava", "n"], ["Canada", "p"]], "Seasons like “winter” are not special names, so they start with a small letter."],
  ["Dad and I baked Bread on Wednesday.", "Bread", [["Dad", "s"], ["I", "i"], ["Wednesday", "d"]]],
  ["In October, Ravi carved a Pumpkin.", "Pumpkin", [["In", "s"], ["October", "m"], ["Ravi", "n"]]],
  ["Grandpa took Ella to the Zoo in Chicago.", "Zoo", [["Grandpa", "s"], ["Ella", "n"], ["Chicago", "p"]]],
  ["We sang Songs at Zoe's party on Friday.", "Songs", [["We", "s"], ["Zoe's", "n"], ["Friday", "d"]]],
  ["This Summer, Noah will visit Maine.", "Summer", [["This", "s"], ["Noah", "n"], ["Maine", "p"]], "Seasons like “summer” are not special names, so they start with a small letter."],
  ["On Thursday, our Library opens late.", "Library", [["On", "s"], ["Thursday", "d"]]],
  ["Lily wrote a Letter to her pen pal in Mexico.", "Letter", [["Lily", "n"], ["Mexico", "p"]]],
  ["In January, Hana and I built a Snowman.", "Snowman", [["In", "s"], ["January", "m"], ["Hana", "n"], ["I", "i"]].slice(0, 3)],
  ["Mom said the Mail comes at noon on Monday.", "Mail", [["Mom", "s"], ["Monday", "d"]]],
  ["On Earth Day, our Class picked up trash.", "Class", [["On", "s"], ["Earth", "h"], ["Day", "h"]]],
];
whyRule(8, "english", "capitals", V25EN8_RULE);

/* ---------- -er and -est: more / most with long words, and spotting the correct sentence ---------- */
// [adjective, sentence comparing two, sentence comparing three or more]
const V25EN8_CML = [
  ["beautiful", "This sunset is ___ than last night's.", "That was the ___ sunset of the whole trip."],
  ["colorful", "My new kite is ___ than my old one.", "Rosa painted the ___ picture in the class."],
  ["delicious", "Grandma's soup is ___ than the soup at the cafe.", "These are the ___ cookies I have ever eaten."],
  ["careful", "Leo is ___ with scissors than his little brother.", "Ava is the ___ painter in our art club."],
  ["exciting", "The roller coaster is ___ than the merry-go-round.", "The last game was the ___ game of the season."],
  ["comfortable", "The couch is ___ than the wooden chair.", "This is the ___ bed in the house."],
  ["wonderful", "Today was even ___ than yesterday.", "It was the ___ party of the whole year."],
  ["important", "Being kind is ___ than winning.", "Safety is the ___ rule at the pool."],
  ["famous", "This painting is ___ than that one.", "This is the ___ statue in the city."],
  ["helpful", "This map is ___ than that one.", "Mr. Kim is the ___ neighbor on our street."],
  ["interesting", "This book is ___ than the last one I read.", "Of all the museums, the space museum is the ___."],
  ["difficult", "Today's spelling test was ___ than last week's.", "That was the ___ hike we have ever done."],
  ["expensive", "The bike is ___ than the scooter.", "This is the ___ toy in the store."],
  ["curious", "Our kitten is ___ than our old cat.", "Of all the puppies, the spotted one is the ___."],
  ["peaceful", "The lake is ___ in the morning than at noon.", "The garden is the ___ place in our town."],
  ["powerful", "A lion is ___ than a house cat.", "That was the ___ storm of the year."],
  ["playful", "The puppy is ___ than the old dog.", "Of all the otters, the little one is the ___."],
  ["cheerful", "Sunflowers look ___ than weeds.", "Our class has the ___ helper in the school."],
  ["patient", "Grandpa is ___ than I am when we fish.", "Ms. Lee is the ___ teacher I know."],
  ["crowded", "The beach is ___ on Saturday than on Monday.", "The fair was the ___ place in town."],
];
// [first thing, second thing, base, -er, -est]
const V25EN8_CMS = [
  ["A cheetah", "a horse", "fast", "faster", "fastest"], ["My dog", "my cat", "big", "bigger", "biggest"], ["Summer", "spring", "hot", "hotter", "hottest"],
  ["A whale", "a shark", "large", "larger", "largest"], ["My backpack", "my lunchbox", "heavy", "heavier", "heaviest"], ["A lake", "a puddle", "deep", "deeper", "deepest"],
  ["A mountain", "a hill", "high", "higher", "highest"], ["Grandpa", "Dad", "old", "older", "oldest"], ["A turtle", "a rabbit", "slow", "slower", "slowest"],
  ["My sister", "my brother", "tall", "taller", "tallest"], ["An ant", "a dog", "small", "smaller", "smallest"], ["A rock", "a sponge", "hard", "harder", "hardest"],
  ["Ice cream", "hot soup", "cold", "colder", "coldest"], ["A feather", "a brick", "light", "lighter", "lightest"], ["A bus", "a car", "long", "longer", "longest"],
  ["Sandpaper", "a pillow", "rough", "rougher", "roughest"], ["A lemon", "an apple", "sour", "sourer", "sourest"], ["A kitten", "a lion", "tiny", "tinier", "tiniest"],
  ["My room", "my brother's room", "neat", "neater", "neatest"], ["Night", "day", "dark", "darker", "darkest"], ["A puppy", "a grown dog", "small", "smaller", "smallest"],
  ["The sun", "the moon", "bright", "brighter", "brightest"], ["My bed", "the floor", "soft", "softer", "softest"],
];
addBank(8, "english", "comparing", 0.3, function () {
  const Q = V25EN8_Q, r = {};
  if (Math.random() < 0.6) {
    const i = R(0, V25EN8_CML.length - 1), [a, s2, s3] = V25EN8_CML[i], two = Math.random() < 0.5, s = two ? s2 : s3;
    const ans = (two ? "more " : "most ") + a, other = (two ? "most " : "more ") + a, bad = a + (two ? "er" : "est");
    r[other] = two ? "“most” is for three or more, but this compares just two." : "“more” compares just two, but this compares three or more.";
    r[bad] = `Long words like ${Q(a)} use “more” or “most”, not ${two ? "-er" : "-est"}.`;
    r[a] = `${Q(a)} alone doesn't compare anything. Add ${two ? "“more”" : "“most”"}.`;
    return { q: `Which words fit?<div class="sentence">${V25EN8_BL(s)}</div>`, say: `Which words fit? ${V25EN8_SB(s)}`, opts: shuffle([ans, other, bad, a]), ans, big: 1, why: two ? `This compares two things, so use “more ${a}”.` : `This compares three or more, so use “most ${a}”.`, key: "v25l" + i + two, v25: { r } };
  }
  const i = R(0, V25EN8_CMS.length - 1), [A, B, b, er, est] = V25EN8_CMS[i], ok = `${A} is ${er} than ${B}.`;
  const w1 = `${A} is ${est} than ${B}.`, w2 = `${A} is more ${er} than ${B}.`, w3 = `${A} is ${b} than ${B}.`;
  r[w1] = `${Q(est)} is for three or more. With “than”, use ${Q(er)}.`;
  r[w2] = `Don't use “more” with ${Q(er)}. Just say ${Q(er)}.`;
  r[w3] = `${Q(b)} alone can't compare. With “than”, use ${Q(er)}.`;
  return { q: "Which sentence is <b>correct</b>?", say: "Which sentence is correct?", opts: shuffle([ok, w1, w2, w3]), ans: ok, why: `“Than” compares two things, so use ${Q(er)}.`, key: "v25s" + i, v25: { r } };
});
whyRule(8, "english", "comparing", V25EN8_RULE);

/* ---------- Fact or opinion: clue words and topic sets ---------- */
// [sentence, opinion clue word, other words from the sentence]
const V25EN8_FOC = [
  ["Strawberry ice cream is the tastiest flavor.", "tastiest", ["strawberry", "cream", "flavor"]], ["Our new playground slide is awesome.", "awesome", ["new", "playground", "slide"]],
  ["Rainy days are the gloomiest days of the year.", "gloomiest", ["rainy", "days", "year"]], ["Mr. Lopez tells the funniest jokes.", "funniest", ["tells", "jokes"]],
  ["Soccer is more exciting than baseball.", "exciting", ["soccer", "baseball"]], ["Purple flowers are the loveliest flowers.", "loveliest", ["purple", "flowers"]],
  ["Our town has a wonderful library.", "wonderful", ["town", "library", "has"]], ["Science is the most fun subject.", "fun", ["science", "subject"]],
  ["Cold pizza tastes gross.", "gross", ["cold", "pizza", "tastes"]], ["The new movie was boring.", "boring", ["new", "movie"]],
  ["Kittens are the most adorable animals.", "adorable", ["kittens", "animals"]], ["Hiking in the mountains is the best way to spend a Saturday.", "best", ["hiking", "mountains", "Saturday"]],
  ["That red car is ugly.", "ugly", ["red", "car"]], ["Board games are better than video games.", "better", ["board", "video", "games"]],
  ["Snowy mornings are magical.", "magical", ["snowy", "mornings"]], ["Grandma's apple pie is perfect.", "perfect", ["Grandma's", "apple", "pie"]],
  ["Spring is the nicest season.", "nicest", ["spring", "season"]], ["Our class hamster is the cutest pet in school.", "cutest", ["class", "hamster", "school"]],
  ["Playing the drums is easy.", "easy", ["playing", "drums"]], ["The museum trip was amazing.", "amazing", ["museum", "trip"]],
  ["Thunderstorms are exciting to watch.", "exciting", ["thunderstorms", "watch"]],
];
// [topic, facts [sentence, how to check], opinions [sentence, clue]]
const V25EN8_FOT = [
  ["apples", [["Apples grow on trees.", "you can see them growing in an orchard"], ["Apples have seeds inside.", "you can cut one open and look"], ["Some apples are green.", "you can see green apples at a store"]],
    [["Green apples taste the best.", "best"], ["Apple pie is the most delicious dessert.", "most delicious"], ["Apples are more fun to eat than pears.", "more fun"]]],
  ["dogs", [["Dogs have a strong sense of smell.", "scientists have tested it"], ["Puppies are baby dogs.", "a dictionary can tell you"], ["Dogs can bark.", "you can hear a dog bark"]],
    [["Poodles are the cutest dogs.", "cutest"], ["Dogs are more fun than cats.", "more fun"], ["Small dogs are annoying.", "annoying"]]],
  ["the ocean", [["Ocean water is salty.", "you can test it"], ["Whales live in the ocean.", "books about sea animals show it"], ["The ocean has waves.", "you can see waves at the beach"]],
    [["The ocean is the prettiest place on Earth.", "prettiest"], ["Swimming in the ocean is more fun than swimming in a pool.", "more fun"], ["Seaweed feels gross.", "gross"]]],
  ["winter", [["Winter comes after fall.", "you can check a calendar"], ["In many places, it snows in winter.", "weather reports show it"], ["Puddles can freeze in winter.", "you can watch a puddle turn to ice"]],
    [["Winter is the best season.", "best"], ["Snowball fights are the most fun.", "most fun"], ["Cold weather is awful.", "awful"]]],
  ["the moon", [["Astronauts have walked on the moon.", "history books tell about it"], ["The moon looks different during the month.", "you can watch it each night"], ["The moon has no air to breathe.", "scientists have checked it"]],
    [["The full moon is the most beautiful sight.", "most beautiful"], ["Looking at the moon is boring.", "boring"], ["A trip to the moon would be awesome.", "awesome"]]],
  ["bikes", [["Most bikes have two wheels.", "you can count the wheels"], ["A bike has pedals.", "you can look at a bike"], ["A bike bell makes a ringing sound.", "you can ring one and listen"]],
    [["Red bikes are the coolest.", "coolest"], ["Riding a bike is more fun than walking.", "more fun"], ["Bike rides are boring.", "boring"]]],
  ["butterflies", [["Butterflies have six legs.", "you can count them in a picture"], ["Butterflies start life as caterpillars.", "science books show it"], ["Many butterflies drink nectar from flowers.", "you can watch them at flowers"]],
    [["Butterflies are the prettiest insects.", "prettiest"], ["Orange butterflies are better than blue ones.", "better"], ["Watching butterflies is relaxing.", "relaxing"]]],
  ["pizza", [["Pizza is often baked in an oven.", "you can watch a cook make it"], ["Cheese is made from milk.", "a cookbook can tell you"], ["Pizza is often cut into slices.", "you can see the slices"]],
    [["Pineapple on pizza is gross.", "gross"], ["Cheese pizza is the best kind.", "best"], ["Pizza tastes better cold.", "better"]]],
  ["trees", [["Trees have roots.", "you can dig and see them"], ["Leaves on many trees change color in fall.", "you can watch them change"], ["Some trees grow fruit.", "you can pick fruit from a tree"]],
    [["Oak trees are the most beautiful trees.", "most beautiful"], ["Climbing trees is the best thing to do.", "best"], ["Pine trees smell wonderful.", "wonderful"]]],
  ["music", [["A piano has keys.", "you can look at a piano"], ["A drum makes a sound when you hit it.", "you can tap one and listen"], ["A guitar has strings.", "you can look at a guitar"]],
    [["The piano is the loveliest instrument.", "loveliest"], ["Drums are too loud.", "too loud"], ["Guitar music is more fun than piano music.", "more fun"]]],
];
addBank(8, "english", "factopinion", 0.3, function () {
  const Q = V25EN8_Q, r = {};
  if (Math.random() < 0.3) {
    const i = R(0, V25EN8_FOC.length - 1), [s, c, ws] = V25EN8_FOC[i];
    ws.forEach(w => { r[w] = `${Q(w)} doesn't show a feeling or what someone thinks.`; });
    return { q: `Which word shows this is an <b>opinion</b>?<div class="quote">${s}</div>`, say: `${s} Which word shows this is an opinion?`, opts: shuffle([c, ...ws]), ans: c, big: 1, why: `${Q(c)} tells what someone thinks. Other people might disagree.`, key: "v25c" + i, v25: { r } };
  }
  const i = R(0, V25EN8_FOT.length - 1), [t, F, O] = V25EN8_FOT[i], wantFact = Math.random() < 0.5, j = R(0, 2);
  const [a, ax] = (wantFact ? F : O)[j], others = wantFact ? O : F;
  others.forEach(([s, x]) => { r[s] = wantFact ? `${Q(V25EN8_C(x))} shows what someone thinks, so that one is an opinion.` : `That one is a fact: ${x}.`; });
  return { q: `Which sentence is ${wantFact ? "a <b>fact</b>" : "an <b>opinion</b>"} about ${t}?`, say: `Which sentence is ${wantFact ? "a fact" : "an opinion"} about ${t}?`, opts: shuffle([a, ...others.map(o => o[0])]), ans: a, why: wantFact ? `"${a}" can be proven: ${ax}.` : `"${a}" is what someone thinks. The clue is "${ax}".`, key: "v25t" + i + wantFact + j, v25: { r } };
});
whyRule(8, "english", "factopinion", V25EN8_RULE);

/* ---------- Possessives: irregular plurals, writing a possessive, what it means ---------- */
// [one, more than one, context, frame]
const V25EN8_PSI = [
  ["child", "children", "Three children played in the den.", "The ___ toys covered the floor."], ["child", "children", "The children came in from the snow.", "The ___ coats hung in a row."],
  ["man", "men", "Two men fixed the roof.", "The ___ ladders leaned on the house."], ["man", "men", "Three men worked in the garden.", "The ___ boots were muddy."],
  ["woman", "women", "Four women ran a race.", "The ___ shoes were bright pink."], ["woman", "women", "The women played soccer in the park.", "The ___ team won the game."],
  ["mouse", "mice", "Some mice lived in the barn.", "The ___ nest was full of straw."], ["mouse", "mice", "Two mice ran across the floor.", "The ___ tails were long and thin."],
  ["goose", "geese", "Five geese swam in the pond.", "The ___ feathers were gray."], ["goose", "geese", "A flock of geese flew over our house.", "The ___ honking woke us up."],
  ["person", "people", "Many people came to the fair.", "The ___ cheers were loud."], ["person", "people", "Lots of people waited for the bus in the rain.", "The ___ umbrellas kept them dry."],
  ["ox", "oxen", "Two oxen pulled the cart.", "The ___ hooves were muddy."], ["ox", "oxen", "The farmer has two oxen.", "The ___ hay was in the barn."],
];
// [owner, owners, thing]: one owner
const V25EN8_PS1 = [["dog", "dogs", "leash"], ["clown", "clowns", "wig"], ["fox", "foxes", "den"], ["coach", "coaches", "whistle"], ["queen", "queens", "crown"],
  ["horse", "horses", "saddle"], ["boy", "boys", "sled"], ["girl", "girls", "scooter"], ["farmer", "farmers", "barn"], ["kitten", "kittens", "toy mouse"],
  ["chef", "chefs", "hat"], ["pirate", "pirates", "map"], ["doctor", "doctors", "bag"], ["puppy", "puppies", "bed"], ["turtle", "turtles", "shell"],
  ["baker", "bakers", "oven"], ["student", "students", "backpack"]];
// [owner, owners, things]: more than one owner
const V25EN8_PS2 = [["bird", "birds", "nests"], ["cat", "cats", "bowls"], ["kid", "kids", "coats"], ["girl", "girls", "bikes"], ["boy", "boys", "helmets"],
  ["horse", "horses", "tails"], ["duck", "ducks", "feet"], ["farmer", "farmers", "hats"], ["player", "players", "shirts"], ["dog", "dogs", "collars"],
  ["teacher", "teachers", "desks"], ["bee", "bees", "wings"], ["puppy", "puppies", "toys"], ["clown", "clowns", "noses"], ["fox", "foxes", "tails"]];
addBank(8, "english", "possessive", 0.3, function () {
  const Q = V25EN8_Q, k = Math.random(), r = {};
  if (k < 0.25) {
    const i = R(0, V25EN8_PSI.length - 1), [sg, pl, c, f] = V25EN8_PSI[i], a = pl + "'s", w1 = pl + "s'", w2 = sg + "'s";
    r[w1] = `${Q(pl)} doesn't end in s, so just add 's: ${Q(a)}.`;
    r[w2] = `${Q(w2)} is for one ${sg}, but there is more than one.`;
    r[pl] = `${Q(pl)} has no apostrophe, so it doesn't show owning.`;
    return { q: `Which word fits?<div class="sentence">${c} ${V25EN8_BL(f)}</div>`, say: `${c} ${V25EN8_SB(f)} Which word fits?`, opts: shuffle([a, w1, w2, pl]), ans: a, big: 1, why: `${V25EN8_C(pl)} means more than one ${sg}, and it doesn't end in s, so add 's: ${a}.`, key: "v25i" + i, v25: { r } };
  }
  const one = Math.random() < 0.5, L = one ? V25EN8_PS1 : V25EN8_PS2, i = R(0, L.length - 1), [sg, pl, th] = L[i];
  const A = one ? `the ${sg}'s ${th}` : `the ${pl}' ${th}`;
  if (k < 0.65) {
    const phrase = `the ${th} that ${one ? "belongs" : "belong"} to the ${one ? sg : pl}`;
    let o;
    if (one) {
      const a = `the ${pl}' ${th}`, b = `the ${pl} ${th}`, c = `the ${sg} ${th}'s`; o = [a, b, c];
      r[a] = `${Q(pl + "'")} is for more than one ${sg}, but there is just one.`;
      r[b] = `${Q(pl)} has no apostrophe, so it doesn't show owning.`;
      r[c] = `The 's goes on the owner, the ${sg}, not on the ${th}.`;
    } else {
      const a = `the ${sg}'s ${th}`, b = `the ${pl} ${th}`, c = `the ${pl}'s ${th}`; o = [a, b, c];
      r[a] = `${Q(sg + "'s")} is for one ${sg}, but there is more than one ${sg}.`;
      r[b] = `Without an apostrophe, ${Q(pl)} doesn't show owning.`;
      r[c] = `${Q(pl)} already ends in s, so just add an apostrophe.`;
    }
    return { q: `Which is the short way to write <b>${phrase}</b>?`, say: `Which is the short way to write ${phrase}?`, opts: shuffle([A, ...o]), ans: A, why: one ? `There is one ${sg}, so add 's: ${A}.` : `There is more than one ${sg}, and ${pl} ends in s, so add just an apostrophe: ${A}.`, key: "v25w" + one + i, v25: { r } };
  }
  const thing = one ? V25EN8_an(th) : th, verb = one ? "belongs" : "belong", ans = `${thing} that ${verb} to ${one ? "one" : "more than one"} ${sg}`, w = `${thing} that ${verb} to ${one ? "more than one" : "just one"} ${sg}`;
  r[w] = one ? `In ${Q(sg + "'s")}, the 's comes right after ${sg}, so there is one ${sg}.` : `In ${Q(pl + "'")}, the apostrophe comes after the s, so there are many.`;
  return { q: `What does <b>${A}</b> mean?`, say: `What does ${A} mean?`, opts: shuffle([ans, w]), ans, why: one ? `${V25EN8_C(sg)}'s with 's means one ${sg} owns it.` : `${V25EN8_C(pl)}' with the apostrophe after the s means more than one ${sg} owns them.`, key: "v25m" + one + i, v25: { r } };
});
whyRule(8, "english", "possessive", V25EN8_RULE);

/* ---------- Story elements: new stories ---------- */
// wc entries starting with "+" are in the story but are not the main character. q5: [question, answer, [[wrong, reason] x3], proof sentence index]
const V25EN8_ST = [
  { p: ["On a chilly fall afternoon at the pumpkin farm, Ivy wanted the biggest pumpkin in the patch.", "But it was too heavy for her to lift.", "Ivy's brother found a red wagon, and together they rolled the pumpkin all the way to the car.", "Ivy grinned the whole ride home."],
    c: "Ivy", wc: ["+Ivy's brother", "a farmer", "a scarecrow"], s: "a pumpkin farm in the fall", ws: ["a snowy park", "a school library", "a sandy beach"],
    pr: "The pumpkin was too heavy to lift.", wp: ["The pumpkins were all gone.", "Ivy got lost in the patch.", "It started to rain."], so: "They rolled it in a wagon.", wo: ["Ivy picked a tiny pumpkin.", "A farmer carried it.", "They left it at the farm."],
    q5: ["How does Ivy feel at the end?", "happy", [["angry", "The story says Ivy grinned, so she was not angry."], ["bored", "The story says Ivy grinned the whole ride home."], ["lonely", "Ivy was with her brother, and she grinned the whole way."]], 3] },
  { p: ["In the middle of the night, a baby owl named Hoot fell out of his nest in an old maple tree.", "He could not fly yet, and he felt scared on the dark ground.", "A kind raccoon heard him and helped him climb back up the tree, branch by branch.", "Hoot snuggled safely next to his mother."],
    c: "Hoot the owl", wc: ["+the raccoon", "a fox", "a farmer"], s: "an old maple tree at night", ws: ["a sunny beach", "a busy city", "a school gym"],
    pr: "He fell out of his nest.", wp: ["He lost his feathers.", "His mother flew away.", "A storm broke the tree."], so: "A raccoon helped him climb back up.", wo: ["He flew back up.", "His mother carried him.", "He slept on the ground."],
    q5: ["How does Hoot feel on the dark ground?", "scared", [["happy", "The story says he felt scared on the ground."], ["sleepy", "The story says he felt scared, not sleepy."], ["silly", "The story says he felt scared on the dark ground."]], 1] },
  { p: ["On the first morning of summer camp, Jada could not find her cabin.", "All the cabins by the lake looked the same!", "Then she remembered that her cabin had a green door with a frog painted on it.", "She walked along the path until she spotted the frog, and she felt proud of herself."],
    c: "Jada", wc: ["a camp counselor", "a lifeguard", "her mom"], s: "summer camp by a lake", ws: ["a city apartment", "a snowy mountain", "a grocery store"],
    pr: "She could not find her cabin.", wp: ["She lost her backpack.", "She was afraid of the lake.", "Her cabin door was broken."], so: "She looked for the frog on the door.", wo: ["A counselor walked her there.", "She called her mom.", "She slept in another cabin."],
    q5: ["How does Jada feel at the end?", "proud", [["sleepy", "The story says she felt proud, not sleepy."], ["grumpy", "The story says she felt proud of herself."], ["bored", "The story says she felt proud of herself."]], 3] },
  { p: ["On a busy Saturday at the city zoo, Eli and his dad wanted to see the giraffes.", "But their zoo map had blown away in the wind.", "Eli noticed that the signs on the path had pictures of animals.", "They followed the giraffe signs and found the giraffes eating leaves from a tall feeder."],
    c: "Eli", wc: ["+Eli's dad", "a zookeeper", "a lion"], s: "the city zoo on a Saturday", ws: ["a farm", "a beach", "a museum"],
    pr: "Their zoo map blew away.", wp: ["The giraffes were sleeping.", "The zoo was closed.", "Eli lost his hat."], so: "They followed the giraffe signs.", wo: ["They asked a zookeeper.", "They bought a new map.", "They went home."],
    q5: ["When does the story happen?", "on a busy Saturday", [["on a rainy Monday", "The story says it is a busy Saturday."], ["late at night", "The story says it is a busy Saturday, not night."], ["on a snowy morning", "The story never says that it was snowing."]], 0] },
  { p: ["Max was staying at Grandma's apartment on a snowy evening when the power went out.", "The stove would not work, so they could not cook dinner.", "Max found crackers, cheese, and apples in the pantry.", "He and Grandma had a picnic on the living room floor by flashlight."],
    c: "Max", wc: ["+Grandma", "a firefighter", "a neighbor"], s: "Grandma's apartment on a snowy evening", ws: ["a sunny beach", "a school cafeteria", "a campground"],
    pr: "The power went out, so they could not cook.", wp: ["Grandma was sick.", "They ran out of apples.", "Max lost his flashlight."], so: "They had a picnic with crackers, cheese, and apples.", wo: ["They went to a restaurant.", "A neighbor brought pizza.", "They went to bed hungry."],
    q5: ["What did they use for light?", "a flashlight", [["candles", "The story says they had their picnic by flashlight."], ["a lamp", "The power was out, so a lamp would not work."], ["the moon", "The story says they had their picnic by flashlight."]], 3] },
  { p: ["During recess on a windy spring day, Noor's kite got stuck in a tall bush by the fence.", "She tugged on the string, but the kite would not come loose.", "Noor asked a teacher for help, and the teacher used a long broom to gently free the kite.", "Noor thanked her and flew the kite again."],
    c: "Noor", wc: ["+the teacher", "the principal", "a bird"], s: "school recess on a windy spring day", ws: ["a quiet library", "a movie theater", "a snowy hill"],
    pr: "Her kite got stuck in a bush.", wp: ["Her kite string broke.", "There was no wind.", "She lost her kite at home."], so: "A teacher freed it with a broom.", wo: ["Noor climbed the bush.", "She bought a new kite.", "The wind blew it free."],
    q5: ["What did Noor try first?", "She tugged on the string.", [["She climbed the fence.", "The story never says that she climbed the fence."], ["She threw a ball at it.", "The story says she tugged on the string first."], ["She went inside.", "The story never says that she went inside."]], 1] },
  { p: ["In a pond at the edge of the woods, a young turtle named Shelly wanted to sun herself on the big flat rock.", "But the rock was always crowded with other turtles.", "One morning, Shelly woke up extra early and swam to the rock before anyone else.", "She had the warm rock all to herself."],
    c: "Shelly the turtle", wc: ["+the other turtles", "a frog", "a fisherman"], s: "a pond at the edge of the woods", ws: ["a city fountain", "a desert", "a pet store"],
    pr: "The rock was always crowded.", wp: ["The rock was too cold.", "She could not swim.", "A storm washed the rock away."], so: "She woke up early and got there first.", wo: ["She found a new rock.", "She pushed the others off.", "She stayed in the water."],
    q5: ["When did Shelly go to the rock?", "early in the morning", [["late at night", "The story says she woke up extra early."], ["at lunchtime", "The story says she went extra early in the morning."], ["after everyone else", "The story says she got there before anyone else."]], 2] },
  { p: ["At the school spelling bee, Omar got the word giraffe.", "His mind went blank, and his hands started to shake.", "Then Omar remembered his trick: picture the word on a card.", "He took a deep breath, pictured the card, and spelled the word correctly."],
    c: "Omar", wc: ["the judge", "his teacher", "his coach"], s: "the school spelling bee", ws: ["a soccer game", "a zoo", "a birthday party"],
    pr: "His mind went blank on a hard word.", wp: ["He forgot to come.", "He lost his notes.", "The microphone broke."], so: "He pictured the word on a card.", wo: ["He asked for a new word.", "He looked in a book.", "His friend whispered the answer."],
    q5: ["How did Omar feel when his mind went blank?", "nervous", [["proud", "His hands were shaking, which shows he was nervous."], ["sleepy", "His hands were shaking, which shows he was nervous."], ["silly", "His hands were shaking, which shows he was nervous."]], 1] },
  { p: ["On a sunny morning at the beach, Rosa and her cousin built a sandcastle with four towers.", "Then the tide started coming in, and the waves crept closer and closer.", "Rosa had an idea.", "They dug a deep moat around the castle, and the water flowed into the moat instead of knocking down the towers."],
    c: "Rosa", wc: ["+Rosa's cousin", "a lifeguard", "a crab"], s: "the beach on a sunny morning", ws: ["a playground", "a snowy yard", "a swimming pool"],
    pr: "The waves were coming close to the sandcastle.", wp: ["They had no buckets.", "Rosa got a sunburn.", "A dog stepped on the castle."], so: "They dug a moat around the castle.", wo: ["They built a wall of rocks.", "They moved the castle.", "They let the waves knock it down."],
    q5: ["How many towers did the sandcastle have?", "four", [["two", "The story says the sandcastle had four towers."], ["three", "The story says the sandcastle had four towers."], ["six", "The story says the sandcastle had four towers."]], 0] },
  { p: ["In the busy kitchen of a small restaurant, Chef Bruno was making pancakes for the breakfast crowd.", "Suddenly he saw that the flour jar was empty!", "Chef Bruno called the bakery next door, and the baker ran over with a big bag of flour.", "Soon the pancakes were stacked high."],
    c: "Chef Bruno", wc: ["+the baker", "a waiter", "a farmer"], s: "the kitchen of a small restaurant", ws: ["a farm", "a school bus", "a library"],
    pr: "The flour jar was empty.", wp: ["The stove was broken.", "He burned the pancakes.", "No one came to eat."], so: "The baker next door brought flour.", wo: ["He made eggs instead.", "He closed the restaurant.", "He drove to the store."],
    q5: ["What was Chef Bruno making?", "pancakes", [["waffles", "The story says he was making pancakes, not waffles."], ["pizza", "The story says he was making pancakes, not pizza."], ["bread", "The baker brought flour, but Bruno was making pancakes."]], 0] },
  { p: ["On the night before the big school trip, Lena could not find her lucky blue hat.", "She looked under her bed and in her closet, but it was not there.", "Then her dog, Pepper, trotted in with the hat in his mouth!", "Lena laughed, washed the hat, and packed it in her bag."],
    c: "Lena", wc: ["+Pepper the dog", "her teacher", "her brother"], s: "Lena's house the night before a trip", ws: ["a school bus", "a museum", "a beach"],
    pr: "She could not find her lucky hat.", wp: ["She missed the bus.", "Her bag was too small.", "She was sick."], so: "Her dog brought the hat to her.", wo: ["She bought a new hat.", "She found it in the closet.", "Her mom knit a new one."],
    q5: ["What color is Lena's lucky hat?", "blue", [["red", "The story says it is her lucky blue hat."], ["green", "The story says it is her lucky blue hat."], ["yellow", "The story says it is her lucky blue hat."]], 0] },
  { p: ["Deep in the ocean, a little octopus named Inky wanted to explore a sunken ship.", "But a big eel was sleeping in the doorway.", "Inky did not want to wake him.", "So Inky squeezed his soft body through a tiny porthole on the side of the ship.", "Inside, he found a room full of shiny shells."],
    c: "Inky the octopus", wc: ["+the eel", "a shark", "a diver"], s: "a sunken ship deep in the ocean", ws: ["a river in the jungle", "a fish tank", "a sandy desert"],
    pr: "An eel was sleeping in the doorway.", wp: ["The ship was too dark.", "Inky lost his way home.", "A shark chased him."], so: "He squeezed through a tiny porthole.", wo: ["He woke up the eel.", "He gave up and swam home.", "He waited for the eel to leave."],
    q5: ["What did Inky find inside the ship?", "a room full of shiny shells", [["a treasure chest", "The story says shiny shells, not a treasure chest."], ["another octopus", "The story says he found a room full of shiny shells."], ["a sleeping shark", "The story says he found a room full of shiny shells."]], 4] },
  { p: ["On the last day before winter break, Theo wanted to make a giant paper snowflake for his classroom door.", "But after he folded the paper many times, it was too thick to cut.", "Theo got thinner paper and folded it fewer times.", "This time, the scissors cut through easily, and his snowflake looked beautiful."],
    c: "Theo", wc: ["his teacher", "the principal", "his sister"], s: "school on the last day before winter break", ws: ["a summer camp", "a beach", "a farm"],
    pr: "The folded paper was too thick to cut.", wp: ["He lost his scissors.", "The paper was wet.", "The door was locked."], so: "He used thinner paper and fewer folds.", wo: ["He asked his teacher to cut it.", "He used tape.", "He gave up."],
    q5: ["How did the snowflake look at the end?", "beautiful", [["torn", "The story says his snowflake looked beautiful."], ["messy", "The story says his snowflake looked beautiful."], ["crooked", "The story says his snowflake looked beautiful."]], 3] },
  { p: ["On a hot afternoon in the backyard, Kofi wanted to cool off in the sprinkler.", "But the hose had a big hole, and water sprayed everywhere except the sprinkler.", "Kofi wrapped the hole tightly with tape.", "Soon the sprinkler was spinning, and Kofi and his little brother ran through the cool water."],
    c: "Kofi", wc: ["+Kofi's little brother", "their dad", "a neighbor"], s: "a backyard on a hot afternoon", ws: ["a snowy park", "a swimming pool", "a classroom"],
    pr: "The hose had a big hole.", wp: ["The water was too cold.", "The sprinkler was lost.", "It started to rain."], so: "Kofi wrapped the hole with tape.", wo: ["He bought a new hose.", "Dad fixed it.", "They went to the pool."],
    q5: ["Why did Kofi want to use the sprinkler?", "to cool off on a hot day", [["to wash the car", "The story says he wanted to cool off."], ["to water the flowers", "The story says he wanted to cool off."], ["to fill a pool", "The story says he wanted to cool off."]], 0] },
];
addBank(8, "english", "storyparts", 0.3, function () {
  const i = R(0, V25EN8_ST.length - 1), S = V25EN8_ST[i], k = R(0, 4), text = S.p.join(" "), r = {};
  let q, a, opts, why;
  if (k === 4) {
    const [q5, a5, ws, pi] = S.q5; q = q5; a = a5; ws.forEach(([w, x]) => { r[w] = x; }); opts = [a, ...ws.map(w => w[0])]; why = `The story says: "${S.p[pi]}"`;
  } else {
    const rows = [["Who is the <b>main character</b>?", S.c, S.wc, `The story is mostly about ${S.c}.`], ["What is the <b>setting</b>?", S.s, S.ws, "That's where and when the story happens."],
      ["What is the <b>problem</b>?", S.pr, S.wp, "That's what goes wrong in the story."], ["How is the problem <b>solved</b>?", S.so, S.wo, "That's how the problem gets fixed at the end."]];
    const [q0, a0, w0, y] = rows[k]; q = q0; a = a0; why = y;
    const w = w0.map(x => x.replace(/^\+/, ""));
    w0.forEach((x, j) => {
      const o = w[j];
      r[o] = k === 0 ? (x[0] === "+" ? `${V25EN8_C(o)} ${/s$/.test(o) ? "are" : "is"} in the story, but the story is mostly about ${S.c}.` : `The story never mentions ${o} at all.`)
        : k === 1 ? `The story never mentions ${o} at all.` : `The story never says that ${V25EN8_lc(o.replace(/[.!]$/, ""))}.`;
    });
    opts = [a, ...w];
  }
  return { q, say: `${text} ${V25EN8_TAGS(q)}`, vis: passage(text), opts: shuffle(opts), ans: a, why, extra: 20, key: "v25-" + i + "-" + k, v25: { r } };
});
whyRule(8, "english", "storyparts", V25EN8_RULE);

/* ---------- Verbs that agree: pick the subject, doesn't / don't ---------- */
// [one, more than one, verb for one, verb for more than one, rest]
const V25EN8_AGS = [
  ["The duck", "The ducks", "swims", "swim", "in the pond"], ["The baby", "The babies", "naps", "nap", "after lunch"], ["My uncle", "My uncles", "drives", "drive", "a big truck"],
  ["The bird", "The birds", "sings", "sing", "at sunrise"], ["The bus", "The buses", "stops", "stop", "at the corner"], ["The fox", "The foxes", "hides", "hide", "in the bushes"],
  ["Our neighbor", "Our neighbors", "waves", "wave", "from the porch"], ["The frog", "The frogs", "hops", "hop", "onto the log"], ["The clock", "The clocks", "ticks", "tick", "all night"],
  ["The bee", "The bees", "buzzes", "buzz", "around the flowers"], ["My friend", "My friends", "plays", "play", "the drums"], ["The pony", "The ponies", "eats", "eat", "fresh hay"],
  ["The firefighter", "The firefighters", "climbs", "climb", "the ladder"], ["The bell", "The bells", "rings", "ring", "at noon"], ["The child", "The children", "laughs", "laugh", "at the puppet show"],
  ["The mouse", "The mice", "squeaks", "squeak", "in the barn"], ["The goose", "The geese", "honks", "honk", "at the dog"], ["The tree", "The trees", "sways", "sway", "in the wind"],
  ["The farmer", "The farmers", "grows", "grow", "corn and beans"], ["My aunt", "My aunts", "bakes", "bake", "pies for the fair"], ["The wave", "The waves", "crashes", "crash", "on the rocks"],
  ["The puppy", "The puppies", "chews", "chew", "on a bone"], ["The baker", "The bakers", "makes", "make", "fresh rolls"], ["The man", "The men", "fixes", "fix", "the roof"],
];
// [subject, 1 = one, 2 = more than one, "I", "you"; rest]
const V25EN8_AGD = [
  ["The puppy", 1, "like baths"], ["My cousins", 2, "like spicy food"], ["I", "I", "want to be late"], ["Grandpa", 1, "drink coffee"], ["You", "you", "need a coat today"],
  ["The kittens", 2, "know their names yet"], ["Our car", 1, "fit in the small space"], ["We", 2, "have school on Saturday"], ["Ms. Lee", 1, "give homework on Fridays"],
  ["The twins", 2, "look the same"], ["My brother", 1, "eat mushrooms"], ["They", 2, "live near the lake"], ["The store", 1, "open until noon"], ["These shoes", 2, "fit me anymore"],
  ["The baby", 1, "have any teeth yet"], ["My parents", 2, "watch scary movies"], ["It", 1, "snow much here"], ["The bus", 1, "stop on our street"], ["My friends", 2, "ride the bus"],
  ["He", 1, "play the piano"], ["She", 1, "like loud music"], ["You", "you", "have to shout"],
];
addBank(8, "english", "agree", 0.3, function () {
  const Q = V25EN8_Q, r = {};
  if (Math.random() < 0.65) {
    const i = R(0, V25EN8_AGS.length - 1), [o, m, s3, b, rest] = V25EN8_AGS[i], one = Math.random() < 0.5, v = one ? s3 : b;
    const ans = one ? o : m, wrong = one ? m : o, pr = one ? pick(["I", "You", "We", "They"]) : pick(["He", "She"]);
    r[wrong] = one ? `${Q(m)} is more than one, so the verb would be ${Q(b)}.` : `${Q(o)} is just one, so the verb would be ${Q(s3)}.`;
    r[pr] = `With ${Q(pr)}, the verb would be ${Q(one ? b : s3)}, not ${Q(v)}.`;
    const s = `___ ${v} ${rest}.`;
    return { q: `Which words fit?<div class="sentence">${V25EN8_BL(s)}</div>`, say: `Which words fit? ${V25EN8_SB(s)}`, opts: shuffle([ans, wrong, pr]), ans, big: 1, why: `${ans} ${v} ${rest}. ${one ? `${Q(v)} ends in -s, so the subject is just one.` : `${Q(v)} has no -s, so the subject is more than one.`}`, key: "v25s" + i + one, v25: { r } };
  }
  const i = R(0, V25EN8_AGD.length - 1), [S, n, rest] = V25EN8_AGD[i], ans = n === 1 ? "doesn't" : "don't", w = n === 1 ? "don't" : "doesn't";
  r[w] = n === 1 ? `${Q(S)} is just one, so use “doesn't”.` : n === 2 ? `${Q(S)} is more than one, so use “don't”.` : `With ${Q(S)}, we say “don't”, not “doesn't”.`;
  const s = `${S} ___ ${rest}.`;
  return { q: `Which word fits?<div class="sentence">${V25EN8_BL(s)}</div>`, say: `Which word fits? ${V25EN8_SB(s)}`, opts: ["doesn't", "don't"], ans, big: 1, why: `${S} ${ans} ${rest}.`, key: "v25d" + i, v25: { r } };
});
whyRule(8, "english", "agree", V25EN8_RULE);

/* ---------- Quotation marks: commas and end marks, and turning a report into exact words ---------- */
// [speaker, talking word, exact words]
const V25EN8_QD = [
  ["Ava", "said", "I found a shiny shell."], ["Leo", "asked", "Can we go to the pool?"], ["Grandma", "said", "The cookies are ready."], ["Kai", "shouted", "Watch out for the ball!"],
  ["Mom", "asked", "Where are your shoes?"], ["The coach", "said", "Everyone did a great job."], ["Rosa", "whispered", "The puppy is asleep."], ["Dad", "said", "Let's plant the seeds today."],
  ["Omar", "asked", "May I have a turn?"], ["Nora", "shouted", "I see a rainbow!"], ["Ms. Green", "said", "Please line up at the door."], ["Ben", "asked", "What time is lunch?"],
  ["The baker", "said", "These muffins are still warm."], ["Lily", "shouted", "We won the game!"], ["Grandpa", "asked", "Who wants to go fishing?"], ["Zoe", "said", "My kite is stuck in the tree."],
  ["Ravi", "asked", "Is it going to snow?"], ["The librarian", "whispered", "Your book is on the cart."], ["Ella", "shouted", "Happy birthday, Kofi!"], ["Hana", "said", "I can tie my shoes now."],
  ["Uncle Joe", "asked", "Did you feed the fish?"], ["Max", "said", "The bus is here."], ["Aunt Rosa", "shouted", "Come see the fireworks!"], ["Mia", "asked", "Can I help you carry that?"],
  ["Noah", "said", "I lost my mitten."],
];
// [speaker, reported sentence, exact words, pronoun-mistake words, word the speaker would use, himself/herself]
const V25EN8_QR = [
  ["Leo", "Leo said that he was hungry.", "I am hungry.", "He is hungry.", "I", "himself"], ["Mia", "Mia said that she liked the song.", "I like the song.", "She likes the song.", "I", "herself"],
  ["Kai", "Kai said that his tooth was loose.", "My tooth is loose.", "His tooth is loose.", "my", "himself"], ["Ava", "Ava said that she could swim.", "I can swim.", "She can swim.", "I", "herself"],
  ["Omar", "Omar said that he was ready.", "I am ready.", "He is ready.", "I", "himself"], ["Nora", "Nora said that her cat was sick.", "My cat is sick.", "Her cat is sick.", "my", "herself"],
  ["Ben", "Ben said that he had a new bike.", "I have a new bike.", "He has a new bike.", "I", "himself"], ["Zoe", "Zoe said that she was cold.", "I am cold.", "She is cold.", "I", "herself"],
  ["Ravi", "Ravi said that his team won.", "My team won.", "His team won.", "my", "himself"], ["Lily", "Lily said that she needed a pencil.", "I need a pencil.", "She needs a pencil.", "I", "herself"],
  ["Dad", "Dad said that he would cook dinner.", "I will cook dinner.", "He will cook dinner.", "I", "himself"], ["Grandma", "Grandma said that she loved the card.", "I love the card.", "She loves the card.", "I", "herself"],
  ["Hana", "Hana said that her shoes were wet.", "My shoes are wet.", "Her shoes are wet.", "my", "herself"], ["Max", "Max said that he saw a deer.", "I saw a deer.", "He saw a deer.", "I", "himself"],
  ["Ella", "Ella said that she was done.", "I am done.", "She is done.", "I", "herself"], ["Kofi", "Kofi said that his dog could sit.", "My dog can sit.", "His dog can sit.", "my", "himself"],
];
addBank(8, "english", "quotes", 0.3, function () {
  const Q = V25EN8_Q, r = {};
  if (Math.random() < 0.75) {
    const i = R(0, V25EN8_QD.length - 1), [S, T, W] = V25EN8_QD[i], first = Math.random() < 0.5, end = W.slice(-1), base = W.slice(0, -1), s = /^(The)\b/.test(S) ? "t" + S.slice(1) : S;
    let ans, ws, why;
    if (first) {
      ans = `${S} ${T}, “${W}”`;
      ws = [[`${S} ${T} “${W}”`, `Put a comma after ${Q(T)}, before the quotation marks.`],
        [`${S} ${T}, “${base}”${end}`, "The end mark goes inside the closing quotation mark."],
        [`${S} ${T}, “${W}`, "The quotation marks need to close at the end of the words."]];
      why = `Put a comma after “${T}”, and keep the end mark inside the quotation marks.`;
    } else if (end === ".") {
      ans = `“${base},” ${s} ${T}.`;
      ws = [[`“${W}” ${s} ${T}.`, "Use a comma, not a period, when the sentence keeps going."],
        [`“${base}”, ${s} ${T}.`, "The comma goes inside the quotation marks."],
        [`“${base}” ${s} ${T}.`, "Add a comma inside the quotation marks after the spoken words."]];
      why = `Put a comma inside the marks, then end with a period after “${T}”.`;
    } else {
      const nm = end === "?" ? "question mark" : "exclamation point";
      ans = `“${W}” ${s} ${T}.`;
      ws = [[`“${base},” ${s} ${T}.`, end === "?" ? "This is a question, so it needs a question mark, not a comma." : "This is a shout, so it needs an exclamation point, not a comma."],
        [`“${base}”${end} ${s} ${T}.`, `The ${nm} goes inside the quotation marks.`],
        [`“${W},” ${s} ${T}.`, `Use only the ${nm}. Don't add a comma too.`]];
      why = `Keep the ${nm} inside the marks, and end with a period after “${T}”.`;
    }
    ws.forEach(([w, x]) => { r[w] = x; });
    return { q: "Which sentence is <b>punctuated</b> correctly?", say: "Which sentence is punctuated correctly?", opts: shuffle([ans, ...ws.map(w => w[0])]), ans, why, key: "v25p" + i + first, v25: { r } };
  }
  const i = R(0, V25EN8_QR.length - 1), [S, rep, W, bad, word, self] = V25EN8_QR[i];
  const ans = `${S} said, “${W}”`, w1 = `${S} said, “${bad}”`, w2 = `“${S} said, ${W}”`, w3 = `${S} said, ${W}`;
  r[w1] = `${S} is talking about ${self}, so ${S} would say ${Q(word)}.`;
  r[w2] = `${Q(S + " said")} is not part of what was said, so it goes outside.`;
  r[w3] = `The words ${S} said need quotation marks around them.`;
  return { q: `Which sentence shows ${S}'s <b>exact words</b>?<div class="sentence">${rep}</div>`, say: `${rep} Which sentence shows ${S}'s exact words?`, opts: shuffle([ans, w1, w2, w3]), ans, why: `${S} would really say, “${W}” The marks go around those words.`, key: "v25r" + i, v25: { r } };
});
whyRule(8, "english", "quotes", V25EN8_RULE);

