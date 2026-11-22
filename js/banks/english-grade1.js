/* =====================================================================
   Question bank: Age 6 · English (EN6_)
   Adds more questions to: sight, qwords, picsent, colors, endsound, vowels,
   actionwords, sounds, case, wordfam, rhyme, abcnext.
   ===================================================================== */

/* ---------- Sight Words: more fill-in sentences (read by gen() each call) ---------- */
SIGHT_S.push(
  ["I ___ a red ball.", "have", ["the", "is", "and"], "🔴"],
  ["Look ___ the bird!", "at", ["is", "we", "my"], "🐦"],
  ["The dog is ___ the box.", "in", ["see", "we", "and"], "📦"],
  ["I can ___ up high.", "jump", ["the", "is", "my"], "🤸"],
  ["We ___ to the park.", "went", ["the", "is", "my"], "🌳"],
  ["___ is my mom.", "She", ["We", "Go", "The"], "👩"],
  ["___ is my dad.", "He", ["We", "Is", "To"], "👨"],
  ["The cat is ___ the bed.", "on", ["see", "we", "and"], "🛏️"],
  ["I ___ my cat.", "love", ["the", "is", "to"], "🐈"],
  ["Can you ___ me?", "help", ["the", "and", "is"], "🙋"],
  ["It is ___ to go.", "time", ["the", "and", "my"], "⏰"],
  ["We ___ friends.", "are", ["is", "the", "to"], "🤝"],
  ["The ball is ___.", "red", ["the", "and", "to"], "⚽"],
  ["I see ___ cats.", "two", ["is", "and", "go"], "🐱"],
  ["I have ___ dog.", "one", ["is", "and", "go"], "🐶"],
  ["Come and ___ with me.", "play", ["the", "is", "my"], "🧸"],
  ["___ are you?", "Where", ["The", "And", "My"], "🔍"],
  ["I ___ not like rain.", "do", ["the", "is", "my"], "🌧️"],
  ["The fish can ___.", "swim", ["the", "and", "my"], "🐟"],
  ["I ___ a cookie.", "want", ["the", "is", "and"], "🍪"],
  ["Mom and ___ go home.", "I", ["the", "is", "my"], "🏠"],
  ["This is ___ hat.", "my", ["is", "and", "go"], "🎩"],
  ["She ___ a big hat.", "has", ["the", "and", "to"], "👒"],
  ["He can ___ fast.", "run", ["the", "is", "my"], "🏃"],
  ["Put it ___.", "down", ["the", "and", "is"], "⬇️"],
  ["Go ___ the hill.", "up", ["is", "the", "my"], "⛰️"],
  ["I am ___.", "six", ["the", "and", "to"], "6️⃣"],
  ["We ___ a dog.", "have", ["is", "the", "to"], "🐕"],
  ["Is ___ a cat?", "it", ["the", "and", "to"], "🐱"],
  ["___ you see me?", "Can", ["The", "And", "Is"], "👀"],
  ["I like ___ dog.", "your", ["is", "and", "go"], "🐩"],
  ["Come ___ me.", "with", ["the", "is", "my"], "👫"],
  ["___ is that?", "Who", ["And", "The", "To"], "🚪"],
  ["Run ___ the door.", "to", ["is", "we", "and"], "🏃"],
  ["I can ___ a book.", "read", ["the", "is", "and"], "📖"],
  ["The bus is ___.", "yellow", ["the", "and", "to"], "🚌"],
  ["The sky is ___.", "blue", ["the", "and", "to"], "🌤️"],
  ["The grass is ___.", "green", ["the", "and", "to"], "🌱"],
  ["Look, a ___ bug!", "little", ["the", "and", "is"], "🐞"],
  ["___ me a story.", "Tell", ["The", "And", "Is"], "📚"],
  ["Please ___ down.", "sit", ["the", "is", "and"], "🪑"],
  ["Jump ___ and down!", "up", ["the", "is", "my"], "🦘"],
  ["We ___ eat now.", "will", ["the", "and", "to"], "🍽️"],
  ["The dog ___ wet.", "is", ["see", "and", "the"], "💦"],
  ["___ the door, please.", "Open", ["The", "And", "Is"], "🚪"],
  ["I ___ at the stars.", "look", ["the", "is", "and"], "⭐"],
  ["___ go to the zoo.", "We", ["The", "Is", "And"], "🦁"],
  ["A frog can ___.", "jump", ["the", "is", "and"], "🐸"],
  ["They ___ my friends.", "are", ["is", "the", "to"], "👭"],
  ["Where ___ my shoes?", "are", ["the", "and", "to"], "👟"],
  ["I kick ___ ball.", "the", ["is", "and", "we"], "⚽"],
  ["Mom ___ me a hug.", "gave", ["the", "is", "and"], "🤗"],
  ["I ___ my teeth.", "brush", ["the", "is", "and"], "🪥"],
  ["Dad ___ a car.", "has", ["the", "and", "to"], "🚗"],
  ["The cake is ___ you.", "for", ["is", "and", "the"], "🎂"],
  ["Let me ___ you.", "help", ["the", "is", "and"], "🙌"],
  ["___ dog is big.", "The", ["Is", "And", "To"], "🐕"],
  ["Can I ___ too?", "come", ["the", "is", "my"], "🙋"],
  ["We sat ___ the tree.", "under", ["is", "and", "we"], "🌳"],
  ["I go ___ bed at eight.", "to", ["is", "we", "and"], "🛏️"],
  ["Yes, I ___!", "can", ["the", "is", "and"], "👍"],
  ["___ at me!", "Look", ["The", "And", "Is"], "👀"],
  ["A cat can ___ a mouse.", "see", ["the", "is", "and"], "🐭"],
  ["What is ___ name?", "your", ["is", "and", "go"], "📛"],
  ["The dog ran ___.", "away", ["the", "is", "my"], "🐕"],
  ["Here ___ a cat.", "is", ["the", "and", "my"], "🐈"],
  ["I ___ to play.", "like", ["the", "is", "and"], "🪀"],
  ["Stop and ___!", "look", ["the", "is", "my"], "🛑"],
  ["We ___ a cake.", "made", ["the", "is", "to"], "🧁"],
  ["I ___ my dog.", "walk", ["the", "is", "and"], "🦮"],
  ["The bee is ___ the flower.", "on", ["see", "we", "and"], "🐝"],
  ["The ___ is hot.", "sun", ["is", "and", "to"], "☀️"],
  ["I see a ___ bear.", "brown", ["the", "and", "is"], "🐻"],
  ["The milk is ___.", "white", ["the", "and", "to"], "🥛"],
  ["I can ___ my name.", "write", ["the", "is", "and"], "✍️"],
  ["I am ___ big!", "so", ["the", "and", "to"], "🐘"],
  ["Can we go ___?", "now", ["the", "and", "is"], "🚶"],
  ["The bird can ___ high.", "fly", ["the", "is", "and"], "🕊️"],
  ["Look at the ___ car.", "blue", ["the", "and", "is"], "🚙"],
  ["I can ___ to ten.", "count", ["the", "is", "and"], "🔟"],
  ["Is ___ your cat?", "this", ["the", "and", "is"], "😺"],
  ["Who ___ you?", "are", ["the", "and", "to"], "🧑"],
  ["We ___ in the pool.", "swim", ["the", "is", "and"], "🏊"],
  ["I sleep ___ my bed.", "in", ["is", "and", "we"], "😴"],
  ["Mom said, \"___ here!\"", "Come", ["The", "Is", "And"], "👋"],
  ["I ___ a new kite.", "got", ["the", "is", "and"], "🪁"],
  ["The pig is ___.", "pink", ["the", "and", "to"], "🐷"],
  ["Thank ___!", "you", ["the", "is", "my"], "🎁"],
  ["It is ___ fun!", "so", ["the", "and", "is"], "🎉"],
  ["We ___ up the hill.", "ran", ["the", "is", "my"], "⛰️"],
  ["I ___ a cat and a dog.", "have", ["the", "is", "to"], "🐾"],
  ["The duck is ___ the pond.", "in", ["see", "we", "and"], "🦆"],
  ["It is ___ big tree.", "a", ["is", "and", "we"], "🌲"],
);

/* ---------- Question Words: more answers and more questions ---------- */
QW_ITEMS.push(
  ["my mom", "Who"], ["Dad", "Who"], ["the teacher", "Who"], ["my friend Sam", "Who"], ["the baker", "Who"], ["a nurse", "Who"],
  ["Grandpa", "Who"], ["my sister", "Who"], ["the coach", "Who"], ["the mail carrier", "Who"], ["a farmer", "Who"], ["Aunt Rosa", "Who"],
  ["the cook", "Who"], ["my best friend", "Who"], ["Uncle Kofi", "Who"], ["the dentist", "Who"], ["my baby brother", "Who"], ["Mia", "Who"],
  ["a cup", "What"], ["a red hat", "What"], ["an apple", "What"], ["a teddy bear", "What"], ["a cookie", "What"], ["a toy car", "What"],
  ["a spoon", "What"], ["a box", "What"], ["a blue crayon", "What"], ["a pizza", "What"], ["a sock", "What"], ["a drum", "What"],
  ["a cake", "What"], ["a balloon", "What"], ["a pencil", "What"], ["a banana", "What"], ["a shoe", "What"], ["a puzzle", "What"],
  ["at the zoo", "Where"], ["in the yard", "Where"], ["at home", "Where"], ["on the bus", "Where"], ["at the store", "Where"], ["in the pool", "Where"],
  ["at the library", "Where"], ["in the garden", "Where"], ["on the farm", "Where"], ["at Grandma's house", "Where"], ["in the car", "Where"], ["on the playground", "Where"],
  ["in the bathtub", "Where"], ["at the pond", "Where"], ["in my room", "Where"], ["at the park", "Where"], ["on the sofa", "Where"], ["at the beach house", "Where"],
  ["at night", "When"], ["on Monday", "When"], ["at noon", "When"], ["in the summer", "When"], ["before lunch", "When"], ["at bedtime", "When"],
  ["in winter", "When"], ["on Sunday", "When"], ["after dinner", "When"], ["at six o'clock", "When"], ["today", "When"], ["tomorrow", "When"],
  ["in the fall", "When"], ["at snack time", "When"], ["after the game", "When"], ["yesterday", "When"], ["on Friday", "When"], ["before bed", "When"],
  ["the vet", "Who"], ["Grandma Lee", "Who"], ["my cousin", "Who"], ["the principal", "Who"],
  ["a hat", "What"], ["a bike", "What"], ["a fork", "What"], ["a lamp", "What"],
  ["at the museum", "Where"], ["at the airport", "Where"], ["under the table", "Where"], ["in the tent", "Where"],
  ["on my birthday", "When"], ["in the spring", "When"], ["after recess", "When"], ["this morning", "When"],
);
(function () {
  /* Only questions where no other question word also makes a sensible question. */
  const add = (w, list) => { const row = QWORDS.find(x => x[0] === w); if (row) row.push(...list); };
  add("What", [["🍌", "What is long and yellow?", "a banana"], ["⏰", "What tells the time?", "a clock"], ["🌧️", "What falls from the clouds?", "rain"]]);
  add("Where", [["🐟", "Where do fish live?", "in water"], ["🐮", "Where does a cow live?", "on a farm"]]);
})();

/* ---------- Picture Sentences: a new pool with its own pictures ---------- */
const EN6_PICS = [["The horse can run fast.", "🐴", "horse"], ["The lion is big.", "🦁", "lion"], ["The monkey can climb.", "🐒", "monkey"], ["The owl is awake at night.", "🦉", "owl"], ["I see a pink flamingo.", "🦩", "flamingo"],
  ["The turtle is slow.", "🐢", "turtle"], ["A snail has a shell.", "🐌", "snail"], ["The rabbit hops.", "🐇", "rabbit"], ["I have a red balloon.", "🎈", "balloon"], ["The baby has a bottle.", "🍼", "bottle"],
  ["The train goes choo choo.", "🚂", "train"], ["The plane is in the sky.", "✈️", "plane"], ["The boat is on the lake.", "⛵", "boat"], ["I ride my bike.", "🚲", "bike"], ["The rocket goes up.", "🚀", "rocket"],
  ["I eat a green apple.", "🍏", "green apple"], ["I like grapes.", "🍇", "grapes"], ["The lemon is sour.", "🍋", "lemon"], ["I eat a slice of watermelon.", "🍉", "watermelon"], ["The carrot is orange.", "🥕", "carrot"],
  ["I drink milk.", "🥛", "milk"], ["I like to eat corn.", "🌽", "corn"], ["Mom made soup.", "🍲", "soup"], ["I have a cupcake.", "🧁", "cupcake"], ["The ice cream is cold.", "🍦", "ice cream"],
  ["I see a rainbow.", "🌈", "rainbow"], ["It is raining.", "🌧️", "rain cloud"], ["The star is bright.", "⭐", "star"], ["The flower is pretty.", "🌷", "flower"], ["The cactus is sharp.", "🌵", "cactus"],
  ["We have a tent.", "⛺", "tent"], ["I read a book.", "📚", "books"], ["I put on my shoes.", "👟", "shoe"], ["My sock is long.", "🧦", "socks"], ["The key is gold.", "🔑", "key"],
  ["The bell rings.", "🔔", "bell"], ["I hit the drum.", "🥁", "drum"], ["Dad plays the guitar.", "🎸", "guitar"], ["The robot can dance.", "🤖", "robot"], ["I have a teddy bear.", "🧸", "teddy bear"],
  ["The crab is on the sand.", "🦀", "crab"], ["The whale is in the sea.", "🐳", "whale"], ["The octopus has eight arms.", "🐙", "octopus"], ["A shark has sharp teeth.", "🦈", "shark"], ["The bee makes honey.", "🐝", "bee"],
  ["The ladybug has spots.", "🐞", "ladybug"], ["The butterfly is pretty.", "🦋", "butterfly"], ["The spider made a web.", "🕷️", "spider"], ["The snake is long.", "🐍", "snake"], ["The frog is green.", "🐸", "frog"],
  ["The pig rolls in mud.", "🐖", "pig"], ["The sheep says baa.", "🐑", "sheep"], ["The chick is little.", "🐥", "chick"], ["The penguin can swim.", "🐧", "penguin"], ["The giraffe is tall.", "🦒", "giraffe"],
  ["The elephant has a trunk.", "🐘", "elephant"], ["The zebra has stripes.", "🦓", "zebra"], ["The fox has a red tail.", "🦊", "fox"], ["The bear is brown.", "🐻", "bear"], ["The mouse is small.", "🐭", "mouse"],
  ["The dinosaur is huge.", "🦖", "dinosaur"], ["The tractor is on the farm.", "🚜", "tractor"], ["The fire truck is red.", "🚒", "fire truck"], ["I have an umbrella.", "☂️", "umbrella"], ["I wear a crown.", "👑", "crown"],
  ["I have a gift for you.", "🎁", "gift"], ["The candle is lit.", "🕯️", "candle"], ["I brush my teeth.", "🪥", "toothbrush"], ["I wash with soap.", "🧼", "soap"], ["I eat a hot dog.", "🌭", "hot dog"],
  ["I like popcorn.", "🍿", "popcorn"], ["I see a tiger.", "🐅", "tiger"], ["Mom made cookies.", "🍪", "cookie"], ["The hen laid an egg.", "🥚", "egg"], ["This is my house.", "🏠", "house"],
  ["The snowman is cold.", "⛄", "snowman"], ["The volcano is hot.", "🌋", "volcano"], ["The leaves fall down.", "🍂", "leaves"], ["I sit on a chair.", "🪑", "chair"], ["I sleep in my bed.", "🛏️", "bed"],
  ["The light is on.", "💡", "light bulb"], ["I see a dolphin.", "🐬", "dolphin"], ["The parrot can talk.", "🦜", "parrot"], ["The rooster says cock-a-doodle-doo.", "🐓", "rooster"], ["The swan is white.", "🦢", "swan"],
  ["The camel has a hump.", "🐫", "camel"], ["The bat flies at night.", "🦇", "bat"], ["The worm is in the dirt.", "🪱", "worm"], ["The cherries are red.", "🍒", "cherries"], ["The banana is yellow.", "🍌", "banana"],
  ["I eat bread.", "🍞", "bread"], ["The cheese has holes.", "🧀", "cheese"], ["The pear is green.", "🍐", "pear"]];
addBank(6, "english", "picsent", 0.78, function () {
  const it = pick(EN6_PICS), others = shuffle(EN6_PICS.filter(x => x !== it)).slice(0, 3);
  return { q: `<div class="sentence big-sentence">${it[0]}</div>Which picture matches?`, say: `${it[0]} Which picture matches?`, opts: shuffle([it, ...others]).map(psOpt), ans: psOpt(it), why: `"${it[0]}" is about the ${it[2]}.`, key: "n" + it[0] };
});

/* ---------- Color Words: squares, hearts and more colorful things ---------- */
const EN6_SHAPES = [
  [["red", "🟥"], ["orange", "🟧"], ["yellow", "🟨"], ["green", "🟩"], ["blue", "🟦"], ["purple", "🟪"], ["brown", "🟫"], ["black", "⬛"], ["white", "⬜"]],
  [["red", "❤️"], ["orange", "🧡"], ["yellow", "💛"], ["green", "💚"], ["blue", "💙"], ["purple", "💜"], ["brown", "🤎"], ["black", "🖤"], ["white", "🤍"]],
];
/* [emoji, name, color, plural?] */
const EN6_CTHINGS = [["🍅", "a tomato", "red"], ["🍒", "cherries", "red", 1], ["🦀", "a crab", "red"], ["🌶️", "a chili pepper", "red"],
  ["🍊", "an orange", "orange"], ["🎃", "a pumpkin", "orange"],
  ["🍋", "a lemon", "yellow"], ["🐥", "a baby chick", "yellow"], ["🧀", "cheese", "yellow"], ["🚕", "a taxi", "yellow"], ["⭐", "a star", "yellow"],
  ["🥒", "a cucumber", "green"], ["🐊", "a crocodile", "green"], ["🌵", "a cactus", "green"], ["🍀", "a clover", "green"], ["🥬", "lettuce", "green"], ["🌲", "a pine tree", "green"],
  ["🫐", "blueberries", "blue", 1], ["💧", "a water drop", "blue"], ["👖", "jeans", "blue", 1],
  ["🍆", "an eggplant", "purple"],
  ["🥔", "a potato", "brown"], ["🌰", "a chestnut", "brown"], ["🪵", "a log", "brown"], ["🍪", "a cookie", "brown"], ["🧸", "a teddy bear", "brown"], ["🐴", "a horse", "brown"],
  ["🕷️", "a spider", "black"], ["🕶️", "sunglasses", "black", 1],
  ["🥛", "milk", "white"], ["☁️", "a cloud", "white"], ["🦢", "a swan", "white"], ["🦷", "a tooth", "white"], ["🐻‍❄️", "a polar bear", "white"]];
const EN6_CNAMES = ["red", "orange", "yellow", "green", "blue", "purple", "brown", "black", "white"];
addBank(6, "english", "colors", 0.82, function () {
  const k = R(0, 3);
  if (k === 0) { const set = pick(EN6_SHAPES), c = pick(set); return { q: "What color is this?", vis: `<span class="emo" style="font-size:96px">${c[1]}</span>`, opts: shuffle([c[0], ...shuffle(set.filter(x => x !== c)).slice(0, 3).map(x => x[0])]), ans: c[0], big: 1, why: `That color is ${c[0]}.`, key: "s" + c[1] }; }
  if (k === 1) { const set = pick(EN6_SHAPES), c = pick(set); return { q: `Find the color <b>${c[0]}</b>`, say: `Find the color ${c[0]}`, vis: hw(c[0]), opts: shuffle([c, ...shuffle(set.filter(x => x !== c)).slice(0, 3)]).map(cOpt), ans: cOpt(c), why: `This is ${c[0]}.`, key: "f" + c[1] }; }
  const t = pick(EN6_CTHINGS), [e, n, c, p] = t;
  if (k === 2) return { q: `What color ${p ? "are" : "is"} ${n}?`, vis: bigEmo(e), opts: shuffle([c, ...shuffle(EN6_CNAMES.filter(x => x !== c)).slice(0, 3)]), ans: c, big: 1, why: `${cap(n)} ${p ? "are" : "is"} ${c}.`, key: "t" + n };
  const o = x => `<span class="emo" title="${x[1].replace(/^(a|an) /, "")}">${x[0]}</span>`;
  const others = shuffle(EN6_CTHINGS.filter(x => x[2] !== c)).slice(0, 3);
  return { q: `Which one is <b>${c}</b>?`, say: `Which one is ${c}?`, opts: shuffle([t, ...others]).map(o), ans: o(t), why: `${cap(n)} ${p ? "are" : "is"} ${c}.`, key: "w" + n };
});

/* ---------- Ending Sounds: more words (read by gen() each call) ---------- */
ENDW.push(
  ["bat", "🦇"], ["ant", "🐜"], ["nest", "🪺"], ["boat", "⛵"], ["goat", "🐐"], ["robot", "🤖"], ["carrot", "🥕"],
  ["rocket", "🚀"], ["basket", "🧺"], ["shirt", "👕"], ["foot", "🦶"], ["boot", "👢"], ["tent", "⛺"], ["plant", "🪴"], ["elephant", "🐘"],
  ["hand", "✋"], ["bird", "🐦"], ["bread", "🍞"], ["sled", "🛷"], ["cloud", "☁️"], ["salad", "🥗"], ["lizard", "🦎"],
  ["crab", "🦀"], ["tub", "🛁"],
  ["corn", "🌽"], ["moon", "🌙"], ["lion", "🦁"], ["fan", "🪭"], ["can", "🥫"], ["spoon", "🥄"], ["train", "🚆"], ["man", "👨"],
  ["pumpkin", "🎃"], ["penguin", "🐧"], ["ten", "🔟"], ["queen", "👸"],
  ["ship", "🚢"], ["soap", "🧼"], ["sheep", "🐑"], ["clip", "📎"],
  ["flag", "🚩"], ["frog", "🐸"], ["egg", "🥚"], ["leg", "🦵"],
  ["worm", "🪱"], ["broom", "🧹"],
  ["dress", "👗"], ["octopus", "🐙"], ["cactus", "🌵"],
  ["six", "6️⃣"], ["ax", "🪓"],
  ["duck", "🦆"], ["sock", "🧦"], ["book", "📖"], ["rock", "🪨"], ["truck", "🚚"], ["milk", "🥛"], ["fork", "🍴"], ["shark", "🦈"], ["lock", "🔒"], ["hook", "🪝"],
  ["bowl", "🥣"], ["ball", "⚽"], ["snail", "🐌"], ["pencil", "✏️"], ["camel", "🐫"], ["seal", "🦭"], ["shell", "🐚"], ["girl", "👧"],
  ["star", "⭐"], ["bear", "🐻"], ["chair", "🪑"], ["door", "🚪"], ["tiger", "🐅"], ["deer", "🦌"], ["pear", "🍐"], ["guitar", "🎸"], ["ear", "👂"], ["four", "4️⃣"], ["jar", "🫙"],
  ["elf", "🧝"], ["scarf", "🧣"], ["wolf", "🐺"], ["chef", "🧑‍🍳"],
);

/* ---------- Short Vowels: more CVC words ---------- */
const EN6_CVC = [["bat", "🦇"], ["map", "🗺️"], ["can", "🥫"], ["fan", "🪭"], ["man", "👨"], ["sad", "😢"],
  ["pen", "🖊️"], ["leg", "🦵"], ["red", "🔴"], ["log", "🪵"], ["hut", "🛖"], ["tub", "🛁"], ["run", "🏃"], ["hug", "🤗"]];
/* short-vowel words for "which word has the short _ sound?" (no picture needed) */
const EN6_SHORT = { a: ["bat", "map", "can", "fan", "man", "sad", "hat", "cat", "bag", "van", "jam", "dad", "nap", "tap", "wag"],
  e: ["pen", "leg", "red", "bed", "hen", "web", "ten", "jet", "net", "wet", "pet", "men", "yes"],
  i: ["pig", "pin", "six", "big", "dig", "fit", "hit", "lid", "lip", "sit", "win", "zip", "kid"],
  o: ["log", "dog", "fox", "box", "hot", "pot", "mop", "top", "dot", "cot", "not"],
  u: ["hut", "tub", "run", "hug", "bus", "cup", "bug", "sun", "mud", "cut", "fun", "pup", "rug", "nut"] };
const EN6_VKEY = { a: "apple", e: "egg", i: "insect", o: "octopus", u: "umbrella" };
addBank(6, "english", "vowels", 0.7, function () {
  if (Math.random() < 0.45) {
    const v = pick("aeiou".split("")), w = pick(EN6_SHORT[v]);
    const others = shuffle("aeiou".replace(v, "").split("")).slice(0, 3).map(x => pick(EN6_SHORT[x]));
    return { q: `Which word has the short <b>${v}</b> sound, like in <b>${EN6_VKEY[v]}</b>?`, say: `Which word has the short ${v} sound, like in ${EN6_VKEY[v]}?`, opts: shuffle([w, ...others]), ans: w, big: 1, why: `${cap(w)} has the short ${v} sound in the middle: ${w[0]}-${v}-${w[2]}.`, key: "ns" + w };
  }
  const [w, e] = pick(EN6_CVC), v = w[1];
  const others = shuffle("aeiou".replace(v, "").split("")).slice(0, 3);
  if (Math.random() < 0.5) return { q: "Which vowel is missing?", say: `Which vowel is missing in ${w}?`, vis: col(bigEmo(e), hw(`${w[0]}<span class="blank">_</span>${w[2]}`)), opts: shuffle([v, ...others]), ans: v, big: 1, why: `${cap(w)} has the short ${v} sound: ${w[0]}-${v}-${w[2]}.`, key: "nv" + w };
  return { q: "Which word matches the picture?", vis: bigEmo(e), opts: shuffle([w, ...others.map(x => w[0] + x + w[2])]), ans: w, big: 1, why: `Say it slowly: ${w[0]}, ${v}, ${w[2]}. That spells ${w}.`, key: "nw" + w };
});

/* ---------- Action Words: more pictures + find the action in a sentence ---------- */
ACTIONS.push(["🚶", "walk"], ["😂", "laugh"], ["😭", "cry"], ["🤧", "sneeze"], ["🤔", "think"], ["🏋️", "lift"], ["⛷️", "ski"],
  ["🪥", "brush"], ["👀", "look"], ["🤗", "hug"], ["🤾", "throw"], ["🧑‍🏫", "teach"]);
const EN6_ACTS = [["Mia kicks the red ball.", "kicks"], ["The dog digs a hole.", "digs"], ["Leo eats a green apple.", "eats"], ["The bird sings a song.", "sings"], ["Ava jumps on the bed.", "jumps"],
  ["The cat naps in the sun.", "naps"], ["Sam reads a funny book.", "reads"], ["Dad cooks the eggs.", "cooks"], ["The frog hops to the pond.", "hops"], ["Zoe paints a big tree.", "paints"],
  ["Omar throws the ball far.", "throws"], ["The happy baby claps.", "claps"], ["The fish swims fast.", "swims"], ["Mom drives the blue car.", "drives"], ["Kai climbs the tall tree.", "climbs"],
  ["The horse runs in the field.", "runs"], ["Lily waves to her friend.", "waves"], ["The boy rides his bike.", "rides"], ["Nora draws a pretty cat.", "draws"], ["The little puppy barks.", "barks"],
  ["Grandpa bakes a cake.", "bakes"], ["The cow chews the grass.", "chews"], ["Ravi hugs his mom.", "hugs"], ["The kids dance together.", "dance"], ["Emma writes a letter.", "writes"],
  ["The busy bee buzzes.", "buzzes"], ["Noah sweeps the floor.", "sweeps"], ["The silly monkey jumps.", "jumps"], ["Mia washes the dishes.", "washes"], ["The brown bunny sleeps.", "sleeps"],
  ["Leo drinks cold milk.", "drinks"], ["Ava builds a tall tower.", "builds"], ["The cold wind blows.", "blows"], ["Sam pushes the cart.", "pushes"], ["The kitten plays with yarn.", "plays"],
  ["Dad fixes the old chair.", "fixes"], ["Zoe laughs at the clown.", "laughs"], ["The ducks swim in the pond.", "swim"], ["Omar opens the door.", "opens"], ["The owl hoots at night.", "hoots"],
  ["Mom picks red flowers.", "picks"], ["Kai catches the ball.", "catches"], ["The teacher smiles.", "smiles"], ["Lily brushes her hair.", "brushes"], ["The big lion roars.", "roars"],
  ["Nora skips to school.", "skips"], ["Ben kicks the can.", "kicks"], ["The goat eats hay.", "eats"], ["Ana sings to her baby.", "sings"],
  ["The dog wags its tail.", "wags"], ["Max rides the bus.", "rides"], ["The duck swims away.", "swims"], ["Ivy reads to her dad.", "reads"], ["The red fox runs.", "runs"]];
const EN6_ASTOP = new Set(["the", "a", "an", "her", "his", "my", "to", "in", "on", "at", "with", "of", "and"]);
addBank(6, "english", "actionwords", 0.4, function () {
  const [s, v] = pick(EN6_ACTS);
  const ws = s.replace(/[.,!?]/g, "").split(" ").filter(w => !EN6_ASTOP.has(w.toLowerCase()) && w !== v);
  return { q: `<div class="sentence big-sentence">${s}</div>Which word is the <b>action</b>?`, say: `${s} Which word is the action?`, opts: uniq(v, shuffle(ws)), ans: v, big: 1, why: `"${v}" tells what is happening. It is the action word.`, key: "s" + s };
});

/* ---------- Letter Sounds: more first-sound words ---------- */
/* [letter, word, emoji, other first letters a child might call this picture] */
const EN6_FIRST = [["a", "ant", "🐜", "b"], ["a", "ax", "🪓", "h"],
  ["b", "bear", "🐻", "t"], ["b", "bee", "🐝", ""], ["b", "bus", "🚌", ""], ["b", "banana", "🍌", ""], ["b", "bed", "🛏️", ""], ["b", "bell", "🔔", ""], ["b", "book", "📖", ""],
  ["c", "car", "🚗", ""], ["c", "cake", "🎂", ""], ["c", "cow", "🐄", ""], ["c", "corn", "🌽", ""], ["c", "carrot", "🥕", ""], ["c", "cookie", "🍪", "b"],
  ["d", "duck", "🦆", "b"], ["d", "drum", "🥁", ""], ["d", "door", "🚪", ""], ["d", "deer", "🦌", "rm"], ["d", "dolphin", "🐬", "fw"],
  ["e", "elephant", "🐘", ""],
  ["f", "fox", "🦊", "d"], ["f", "frog", "🐸", "t"], ["f", "fire", "🔥", ""], ["f", "feather", "🪶", ""],
  ["g", "guitar", "🎸", ""], ["g", "grapes", "🍇", ""], ["g", "ghost", "👻", ""], ["g", "gorilla", "🦍", "am"],
  ["h", "horse", "🐴", "p"], ["h", "house", "🏠", ""], ["h", "hippo", "🦛", ""], ["h", "hammer", "🔨", "t"],
  ["k", "kite", "🪁", ""], ["k", "kangaroo", "🦘", ""], ["k", "koala", "🐨", "b"], ["k", "king", "🤴", "p"],
  ["l", "leaf", "🍃", ""], ["l", "lemon", "🍋", ""], ["l", "lizard", "🦎", "g"], ["l", "lock", "🔒", "p"], ["l", "llama", "🦙", "a"],
  ["m", "monkey", "🐒", "a"], ["m", "mouse", "🐭", "r"], ["m", "mushroom", "🍄", "t"], ["m", "map", "🗺️", ""],
  ["n", "nest", "🪺", ""], ["n", "nine", "9️⃣", ""],
  ["p", "pizza", "🍕", ""], ["p", "pear", "🍐", ""], ["p", "penguin", "🐧", "b"], ["p", "pencil", "✏️", ""], ["p", "popcorn", "🍿", ""], ["p", "pumpkin", "🎃", "j"],
  ["r", "rainbow", "🌈", ""], ["r", "robot", "🤖", ""], ["r", "rocket", "🚀", "s"], ["r", "ring", "💍", "d"],
  ["s", "sock", "🧦", ""], ["s", "snake", "🐍", ""], ["s", "star", "⭐", ""], ["s", "seal", "🦭", ""], ["s", "sandwich", "🥪", ""], ["s", "snail", "🐌", ""], ["s", "spider", "🕷️", "b"], ["s", "spoon", "🥄", ""],
  ["t", "tiger", "🐅", "c"], ["t", "turtle", "🐢", ""], ["t", "tent", "⛺", ""], ["t", "tomato", "🍅", ""], ["t", "train", "🚆", ""], ["t", "tooth", "🦷", ""], ["t", "truck", "🚚", "v"],
  ["v", "violin", "🎻", "f"], ["v", "volcano", "🌋", "m"],
  ["w", "watermelon", "🍉", ""], ["w", "worm", "🪱", ""], ["w", "window", "🪟", ""], ["w", "wolf", "🐺", "d"],
  ["y", "yo-yo", "🪀", "t"]];
addBank(6, "english", "sounds", 0.77, function () {
  const it = pick(EN6_FIRST), x = it[0], ban = { c: "k", k: "c" }[x] || "";
  if (Math.random() < 0.5) {
    const pool = LETTERS.map(l => l[0]).filter(y => y !== x && y !== ban);
    return { q: "What letter does this word start with?", say: `What letter does ${it[1]} start with?`, vis: col(bigEmo(it[2]), hw(`<span class="blank">?</span>${it[1].slice(1)}`)), opts: shuffle([x, ...shuffle(pool).slice(0, 3)]), ans: x, big: 1, why: `${cap(it[1])} starts with the ${x.toUpperCase()} sound.`, key: "na" + it[1] };
  }
  const others = shuffle(EN6_FIRST.filter(o => o[0] !== x && o[0] !== ban && !o[3].includes(x))).filter((o, i, a) => a.findIndex(z => z[0] === o[0]) === i).slice(0, 3);
  const o = y => `<span class="emo" title="${y[1]}">${y[2]}</span>`;
  return { q: `Which picture starts with <b>${x.toUpperCase()}</b>?`, say: `Which picture starts with the letter ${x.toUpperCase()}?`, vis: hw(x.toUpperCase() + x, "big"), opts: shuffle([it, ...others]).map(o), ans: o(it), why: `${cap(it[1])} starts with ${x.toUpperCase()}.`, key: "nb" + it[1] };
});

/* ---------- Big & Small Letters: partner pairs, big or small?, names ---------- */
const EN6_BIGSMALL = "abdefghjmnpqrty".split("");
const EN6_NAMES = [["Mia", "has a cat."], ["Leo", "can run fast."], ["Ava", "likes red."], ["Omar", "sees a bug."], ["Zoe", "has a hat."], ["Sam", "can jump."], ["Nora", "likes cake."], ["Kai", "has a kite."],
  ["Lily", "can swim."], ["Ravi", "sees the moon."], ["Emma", "has a dog."], ["Noah", "likes milk."], ["Ben", "can hop."], ["Rosa", "has a pen."], ["Jin", "sees a bird."], ["Maya", "likes to sing."],
  ["Luis", "has a ball."], ["Ana", "can read."], ["Theo", "sees a frog."], ["Priya", "likes rain."], ["Eli", "has a drum."], ["Grace", "can skip."], ["Max", "sees a star."], ["Hana", "likes pie."],
  ["Owen", "has a box."], ["Ivy", "can clap."], ["Amir", "sees a cow."], ["Ella", "likes fish."], ["Diego", "has a bike."], ["Kofi", "can draw."]];
addBank(6, "english", "case", 0.62, function () {
  const k = R(0, 2);
  if (k === 0) {
    const x = pick(ABC);
    let pool = shuffle((CONF[x] || "").split(""));
    while (pool.length < 3) { const r = pick(ABC); if (r !== x && !pool.includes(r)) pool.push(r); }
    const X = x.toUpperCase();
    return { q: `Which pair is a big letter and its small partner?`, opts: shuffle([X + x, ...pool.slice(0, 3).map(c => X + c)]), ans: X + x, big: 1, why: `Big ${X} and small ${x} are partners.`, key: "p" + x };
  }
  if (k === 1) {
    const x = pick(EN6_BIGSMALL), up = Math.random() < 0.5, ch = up ? x.toUpperCase() : x;
    return { q: "Is this a big letter or a small letter?", vis: hw(ch, "big"), opts: ["big letter", "small letter"], ans: up ? "big letter" : "small letter", big: 1, why: up ? `${ch} is big ${x.toUpperCase()}. Its small partner is ${x}.` : `${ch} is small ${x}. Its big partner is ${x.toUpperCase()}.`, key: "z" + ch };
  }
  const [n, rest] = pick(EN6_NAMES), good = `${n} ${rest}`, ws = rest.split(" "), last = ws.length - 1;
  const bad2 = `${n} ${ws.map((w, i) => i === last ? cap(w) : w).join(" ")}`;
  return { q: "Which sentence is written the right way?", opts: shuffle([good, `${n.toLowerCase()} ${rest}`, bad2]), ans: good, why: `${n} is a name, so it starts with a big letter. The other words are small.`, key: "n" + n };
});

/* ---------- Word Families: more words and new families (read by gen() each call) ---------- */
FAMS.et.push("get", "let", "set");
FAMS.ug.push("tug", "dug");
FAMS.in.push("spin", "twin", "chin");
Object.assign(FAMS, {
  en: ["hen", "pen", "ten", "men", "den"],
  ot: ["hot", "pot", "dot", "cot", "not"],
  ap: ["cap", "map", "nap", "tap", "lap"],
  ed: ["bed", "red", "fed", "sled"],
  ip: ["lip", "hip", "zip", "tip", "dip", "ship"],
  un: ["bun", "fun", "run", "sun"],
  ell: ["bell", "well", "shell", "tell", "yell"],
});
Object.assign(FAM_PIC, { hen: "🐔", pen: "🖊️", ten: "🔟", cap: "🧢", map: "🗺️", bed: "🛏️", sled: "🛷", ship: "🚢", sun: "☀️", run: "🏃", bell: "🔔", shell: "🐚" });

/* ---------- Rhyming Words: more rhyme families (read by gen() each call) ---------- */
RHYMES.push(
  [["hen", "🐔"], ["ten", "🔟"], ["pen", "🖊️"]],
  [["sock", "🧦"], ["clock", "🕰️"], ["rock", "🪨"], ["lock", "🔒"]],
  [["fan", "🪭"], ["van", "🚐"], ["pan", ""], ["man", "👨"]],
  [["bell", "🔔"], ["shell", "🐚"], ["well", ""]],
  [["fox", "🦊"], ["box", "📦"]],
  [["snail", "🐌"], ["nail", "💅"], ["mail", ""], ["whale", "🐳"]],
  [["bed", "🛏️"], ["sled", "🛷"], ["red", "🔴"]],
  [["sun", "☀️"], ["bun", ""], ["run", "🏃"]],
);

/* ---------- ABC Neighbors: which letter is in between? ---------- */
addBank(6, "english", "abcnext", 0.33, function () {
  const i = R(1, 24), low = Math.random() < 0.4, f = c => low ? c.toLowerCase() : c, ans = f(ALPHA[i]);
  const cands = [ALPHA[i - 1], ALPHA[i + 1], ALPHA[i + 2], ALPHA[i - 2], ALPHA[(i + 7) % 26]].filter(Boolean).map(f);
  return { q: `Which letter comes <b>between</b> <b>${f(ALPHA[i - 1])}</b> and <b>${f(ALPHA[i + 1])}</b>?`, say: `Which letter comes between ${ALPHA[i - 1]} and ${ALPHA[i + 1]}?`, vis: train([f(ALPHA[i - 1]), "?", f(ALPHA[i + 1])]), opts: uniq(ans, cands), ans, big: 1, why: `${f(ALPHA[i - 1])}, ${ans}, ${f(ALPHA[i + 1])}. Sing the alphabet song to check!`, key: "m" + i + low };
});

