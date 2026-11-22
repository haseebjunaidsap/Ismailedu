/* =====================================================================
   Question bank LGB: more questions for age 8–9 logic topics
   (analogies, statements, symmetry, combos, codes, venn, cipher, letterseq)
   ===================================================================== */

/* ---------- 8 · analogies: more word pairs + number pairs ---------- */
WANAL.push(
  ["happy", "sad", "fast", "slow", ["quick", "run", "speedy"], "opposites"],
  ["open", "close", "push", "pull", ["shove", "door", "press"], "opposites"],
  ["full", "empty", "awake", "asleep", ["tired", "bed", "alert"], "opposites"],
  ["early", "late", "first", "last", ["second", "winner", "begin"], "opposites"],
  ["win", "lose", "laugh", "cry", ["smile", "giggle", "joke"], "opposites"],
  ["above", "below", "inside", "outside", ["within", "box", "under"], "opposites"],
  ["rough", "smooth", "sharp", "dull", ["pointy", "knife", "cut"], "opposites"],
  ["up", "down", "left", "right", ["side", "turn", "straight"], "opposites"],
  ["give", "take", "buy", "sell", ["pay", "shop", "store"], "opposites"],
  ["lamb", "sheep", "foal", "horse", ["cow", "saddle", "barn"], "baby and grown-up"],
  ["duckling", "duck", "tadpole", "frog", ["fish", "pond", "lily pad"], "baby and grown-up"],
  ["calf", "cow", "piglet", "pig", ["mud", "farm", "lamb"], "baby and grown-up"],
  ["chick", "hen", "fawn", "deer", ["fox", "forest", "antler"], "baby and grown-up"],
  ["cat", "kitten", "dog", "puppy", ["cub", "bone", "bark"], "grown-up and baby"],
  ["hen", "chick", "cow", "calf", ["milk", "bull", "moo"], "grown-up and baby"],
  ["baker", "bread", "farmer", "crops", ["tractor", "barn", "boots"], "who makes what"],
  ["poet", "poem", "singer", "song", ["microphone", "stage", "voice"], "who makes what"],
  ["bee", "honey", "cow", "milk", ["grass", "barn", "moo"], "what it gives us"],
  ["chicken", "egg", "sheep", "wool", ["lamb", "grass", "farm"], "what it gives us"],
  ["chef", "kitchen", "pilot", "airplane", ["sky", "suitcase", "wing"], "where they work"],
  ["chef", "kitchen", "librarian", "library", ["books", "reading", "quiet"], "where they work"],
  ["firefighter", "fire truck", "farmer", "tractor", ["barn", "hay", "cow"], "what they drive"],
  ["bird", "nest", "dog", "doghouse", ["bone", "leash", "puppy"], "where it lives"],
  ["horse", "stable", "pig", "pen", ["mud", "oink", "corn"], "where it lives"],
  ["bear", "den", "bat", "cave", ["night", "wing", "fly"], "where it lives"],
  ["fish", "fin", "bird", "wing", ["nest", "beak", "egg"], "what it moves with"],
  ["car", "road", "boat", "water", ["sail", "fish", "anchor"], "where it goes"],
  ["train", "track", "plane", "sky", ["pilot", "wing", "ticket"], "where it goes"],
  ["eye", "see", "ear", "hear", ["sound", "head", "loud"], "what it does"],
  ["nose", "smell", "tongue", "taste", ["mouth", "teeth", "food"], "what it does"],
  ["knife", "cut", "broom", "sweep", ["dust", "floor", "mop"], "what it is used for"],
  ["oven", "bake", "fridge", "cool", ["food", "warm", "door"], "what it is used for"],
  ["shovel", "dig", "needle", "sew", ["thread", "sharp", "pin"], "what it is used for"],
  ["hand", "glove", "foot", "sock", ["toe", "leg", "heel"], "what covers it"],
  ["finger", "ring", "wrist", "watch", ["arm", "hand", "clock"], "what you wear on it"],
  ["wheel", "bike", "petal", "flower", ["bee", "garden", "vase"], "part of"],
  ["leaf", "tree", "feather", "bird", ["nest", "fly", "sky"], "part of"],
  ["kitten", "meow", "duck", "quack", ["swim", "pond", "feather"], "sound it makes"],
  ["lion", "roar", "snake", "hiss", ["slither", "scale", "bite"], "sound it makes"],
  ["sheep", "baa", "horse", "neigh", ["gallop", "hay", "saddle"], "sound it makes"],
  ["warm", "hot", "cool", "cold", ["warm", "wet", "sunny"], "stronger word"],
  ["good", "great", "bad", "terrible", ["nice", "okay", "fine"], "stronger word"],
  ["wet", "soaked", "hungry", "starving", ["full", "snack", "thirsty"], "stronger word"],
  ["tired", "exhausted", "happy", "thrilled", ["sad", "smile", "okay"], "stronger word"],
  ["pretty", "beautiful", "scared", "terrified", ["brave", "calm", "worried"], "stronger word"],
  ["whisper", "shout", "walk", "run", ["skip", "feet", "step"], "stronger word"],
  ["cow", "herd", "wolf", "pack", ["den", "howl", "cub"], "group name"],
  ["bee", "swarm", "sheep", "flock", ["wool", "farm", "lamb"], "group name"],
  ["star", "sky", "fish", "sea", ["fin", "net", "boat"], "where you find it"],
  ["Monday", "Tuesday", "January", "February", ["March", "December", "month"], "what comes next"],
  ["morning", "breakfast", "evening", "dinner", ["lunch", "night", "snack"], "meal at that time"],
  ["ice", "cold", "fire", "hot", ["smoke", "wood", "red"], "how it feels"],
  ["sugar", "sweet", "lemon", "sour", ["yellow", "juice", "fruit"], "how it tastes"],
  ["snow", "winter", "flowers", "spring", ["garden", "petal", "rain"], "season"],
  ["book", "read", "song", "sing", ["music", "radio", "note"], "what you do with it"],
  ["water", "drink", "bread", "eat", ["butter", "wheat", "slice"], "what you do with it"],
  ["clock", "time", "thermometer", "temperature", ["hot", "weather", "hours"], "what it measures"],
  ["ruler", "length", "scale", "weight", ["fish", "heavy", "inch"], "what it measures"],
  ["dentist", "teeth", "vet", "animals", ["doctor", "nurse", "medicine"], "who they help"],
  ["teacher", "students", "coach", "players", ["ball", "whistle", "field"], "who they help"],
  ["owl", "night", "rooster", "morning", ["barn", "egg", "feather"], "when it calls"],
  ["seed", "plant", "egg", "chick", ["nest", "shell", "yolk"], "what it grows into"],
  ["tooth", "toothbrush", "hair", "comb", ["head", "curl", "hat"], "tool you use on it"],
  ["painter", "brush", "writer", "pen", ["book", "story", "paper"], "tool they use"],
  ["sun", "day", "moon", "night", ["star", "sky", "dark"], "when you see it"],
  ["thirsty", "drink", "hungry", "eat", ["food", "full", "tummy"], "what you do about it"],
  ["Earth", "planet", "Sun", "star", ["moon", "hot", "sky"], "what kind of thing it is"],
  ["apple", "fruit", "carrot", "vegetable", ["orange", "root", "rabbit"], "what kind of thing it is"],
  ["rose", "flower", "oak", "tree", ["acorn", "leaf", "wood"], "what kind of thing it is"],
  ["robin", "bird", "salmon", "fish", ["river", "pink", "swim"], "what kind of thing it is"],
  ["square", "4", "triangle", "3", ["5", "6", "2"], "number of sides"],
  ["spider", "8", "ant", "6", ["4", "2", "10"], "number of legs"],
  ["inch", "foot", "minute", "hour", ["second", "clock", "watch"], "small unit and bigger unit"],
  ["zebra", "stripes", "leopard", "spots", ["tail", "fur", "claws"], "its pattern"],
  ["frog", "hop", "snake", "slither", ["hiss", "scales", "jump"], "how it moves"],
  ["kangaroo", "hop", "fish", "swim", ["fin", "water", "gill"], "how it moves"],
  ["boy", "girl", "king", "queen", ["prince", "crown", "castle"], "boy and girl version"],
  ["paw", "dog", "hoof", "horse", ["shoe", "hay", "tail"], "whose foot it is"],
  ["child", "children", "mouse", "mice", ["mouses", "cheese", "rat"], "one and many"],
  ["foot", "feet", "tooth", "teeth", ["tooths", "mouth", "smile"], "one and many"],
  ["run", "ran", "swim", "swam", ["swimmed", "swimming", "pool"], "now and past"],
  ["sing", "sang", "eat", "ate", ["eated", "eats", "food"], "now and past"],
  ["big", "bigger", "small", "smaller", ["smallest", "tiny", "short"], "add -er"]
);
(() => {
  const add = (a, b, c, d, alt, extra, link) => {
    const dis = extra.filter(x => x !== d && x !== alt && x > 0).filter((x, i, arr) => arr.indexOf(x) === i).slice(0, 3);
    WANAL.push([String(a), String(b), String(c), String(d), dis.map(String), link]);
  };
  [[4, 6], [5, 8], [6, 3], [7, 4], [8, 5], [9, 6], [3, 9], [10, 7]].forEach(([a, c]) => add(a, 2 * a, c, 2 * c, c + a, [c + 1, 2 * c + 1, 2 * c - 1, 3 * c, c + 2], "double it"));
  [[8, 12], [6, 10], [14, 4], [12, 18], [10, 16], [20, 8], [16, 6], [18, 14]].forEach(([a, c]) => add(a, a / 2, c, c / 2, c - a / 2, [c * 2, c / 2 + 1, c / 2 - 1, c - 1, c + 2], "half of it"));
  [[4, 7], [2, 9], [5, 8], [7, 3], [1, 6], [8, 11]].forEach(([a, c]) => add(a, a + 10, c, c + 10, -1, [c + 1, c * 2, c + 11, c + 9, c + 20], "add 10"));
})();

/* ---------- 9 · statements: Yes / No / Can't tell ---------- */
(() => {
  const Y = "Yes, for sure", N = "No, for sure", T = "We can't tell";
  /* "All" facts: [all-fact, member, has-it, lacks-it, question about the property, question about membership]
     member → property: Yes. has property → member?: Can't tell. lacks property → member?: No. */
  const ALL = [
    ["All the dogs at the park have red collars.", "Rex is a dog at the park.", "Rex has a red collar.", "Rex does not have a red collar.", "Does Rex have a red collar?", "Is Rex a dog at the park?"],
    ["Every student in Mr. Lee's class has a library card.", "Ava is in Mr. Lee's class.", "Ava has a library card.", "Ava does not have a library card.", "Does Ava have a library card?", "Is Ava in Mr. Lee's class?"],
    ["All the cookies in the jar are chocolate chip.", "Ben's cookie came from the jar.", "Ben's cookie is chocolate chip.", "Ben's cookie is not chocolate chip.", "Is Ben's cookie chocolate chip?", "Did Ben's cookie come from the jar?"],
    ["All the books on the top shelf are about animals.", "This book is from the top shelf.", "This book is about animals.", "This book is not about animals.", "Is this book about animals?", "Is this book from the top shelf?"],
    ["Every bike in the rack is blue.", "Nora's bike is in the rack.", "Nora's bike is blue.", "Nora's bike is not blue.", "Is Nora's bike blue?", "Is Nora's bike in the rack?"],
    ["All the players on the Tigers team have green shirts.", "Omar plays on the Tigers team.", "Omar has a green shirt.", "Omar does not have a green shirt.", "Does Omar have a green shirt?", "Does Omar play on the Tigers team?"],
    ["All the fish in Lily's tank are goldfish.", "Bubbles lives in Lily's tank.", "Bubbles is a goldfish.", "Bubbles is not a goldfish.", "Is Bubbles a goldfish?", "Does Bubbles live in Lily's tank?"],
    ["Every flower in Grandma's garden is yellow.", "This flower is from Grandma's garden.", "This flower is yellow.", "This flower is not yellow.", "Is this flower yellow?", "Is this flower from Grandma's garden?"],
    ["All the kids on the bus have a lunch box.", "Kai is on the bus.", "Kai has a lunch box.", "Kai does not have a lunch box.", "Does Kai have a lunch box?", "Is Kai on the bus?"],
    ["All the cars in the lot are electric.", "Dad's car is in the lot.", "Dad's car is electric.", "Dad's car is not electric.", "Is Dad's car electric?", "Is Dad's car in the lot?"],
    ["Every crayon in the red box is broken.", "Zoe's crayon is from the red box.", "Zoe's crayon is broken.", "Zoe's crayon is not broken.", "Is Zoe's crayon broken?", "Is Zoe's crayon from the red box?"],
    ["All the apples in this basket are green.", "Leo's apple is from this basket.", "Leo's apple is green.", "Leo's apple is not green.", "Is Leo's apple green?", "Is Leo's apple from this basket?"],
    ["All the singers in the choir can read music.", "Hana sings in the choir.", "Hana can read music.", "Hana cannot read music.", "Can Hana read music?", "Does Hana sing in the choir?"],
    ["All the houses on Elm Street have a porch.", "Ravi's house is on Elm Street.", "Ravi's house has a porch.", "Ravi's house does not have a porch.", "Does Ravi's house have a porch?", "Is Ravi's house on Elm Street?"],
    ["Every shell Mia found today is white.", "Mia found this shell today.", "This shell is white.", "This shell is not white.", "Is this shell white?", "Did Mia find this shell today?"],
    ["All the puppies at the shelter have had a bath.", "Biscuit is a puppy at the shelter.", "Biscuit has had a bath.", "Biscuit has not had a bath.", "Has Biscuit had a bath?", "Is Biscuit a puppy at the shelter?"],
    ["All the pencils in Eli's case are sharp.", "This pencil is from Eli's case.", "This pencil is sharp.", "This pencil is not sharp.", "Is this pencil sharp?", "Is this pencil from Eli's case?"],
    ["Every kid at the party got a balloon.", "Fay was a kid at the party.", "Fay got a balloon.", "Fay did not get a balloon.", "Did Fay get a balloon?", "Was Fay a kid at the party?"],
    ["All the rooms in the museum are quiet.", "The art room is in the museum.", "The art room is quiet.", "The art room is not quiet.", "Is the art room quiet?", "Is the art room in the museum?"],
    ["All the boxes in the closet are full of toys.", "This box is from the closet.", "This box is full of toys.", "This box is not full of toys.", "Is this box full of toys?", "Is this box from the closet?"],
  ];
  for (const [all, mem, has, lacks, qp, qm] of ALL) STATEMENTS.push([`${all} ${mem}`, qp, Y], [`${all} ${has}`, qm, T], [`${all} ${lacks}`, qm, N]);
  /* "If" rules: [rule, P, Q, not P, not Q, question Q?, question P?]
     P → Q?: Yes. Q → P?: Can't tell. not Q → P?: No. not P → Q?: Can't tell. */
  const IF = [
    ["Whenever the bell rings, recess starts.", "Today the bell rang.", "Today recess started.", "Today the bell did not ring.", "Today recess did not start.", "Did recess start today?", "Did the bell ring today?"],
    ["If it snows, the school is closed.", "It is snowing today.", "The school is closed today.", "It is not snowing today.", "The school is open today.", "Is the school closed today?", "Is it snowing today?"],
    ["If you press the red button, the light turns on.", "Ava pressed the red button.", "The light turned on.", "Ava did not press the red button.", "The light did not turn on.", "Did the light turn on?", "Did Ava press the red button?"],
    ["If a number ends in 0, it is even.", "Leo's number ends in 0.", "Leo's number is even.", "Leo's number does not end in 0.", "Leo's number is odd.", "Is Leo's number even?", "Does Leo's number end in 0?"],
    ["If the dog hears the doorbell, it barks.", "The dog heard the doorbell.", "The dog barked.", "The dog did not hear the doorbell.", "The dog did not bark.", "Did the dog bark?", "Did the dog hear the doorbell?"],
    ["If Mom bakes bread, the kitchen smells nice.", "Mom baked bread today.", "The kitchen smells nice today.", "Mom did not bake bread today.", "The kitchen does not smell nice today.", "Does the kitchen smell nice today?", "Did Mom bake bread today?"],
    ["If a shape is a square, it has 4 corners.", "Nora's shape is a square.", "Nora's shape has 4 corners.", "Nora's shape is not a square.", "Nora's shape does not have 4 corners.", "Does Nora's shape have 4 corners?", "Is Nora's shape a square?"],
    ["If the team wins, they get a trophy.", "The team won.", "The team got a trophy.", "The team did not win.", "The team did not get a trophy.", "Did the team get a trophy?", "Did the team win?"],
    ["If the cat is hungry, it meows.", "The cat is hungry.", "The cat is meowing.", "The cat is not hungry.", "The cat is not meowing.", "Is the cat meowing?", "Is the cat hungry?"],
    ["If it is Saturday, Kai goes swimming.", "Today is Saturday.", "Kai went swimming today.", "Today is not Saturday.", "Kai did not go swimming today.", "Does Kai go swimming today?", "Is today Saturday?"],
  ];
  for (const [rule, p, q, np, nq, qq, qp] of IF) STATEMENTS.push([`${rule} ${p}`, qq, Y], [`${rule} ${q}`, qp, T], [`${rule} ${nq}`, qp, N], [`${rule} ${np}`, qq, T]);
  STATEMENTS.push(
    ["No penguins can fly. Pebble is a penguin.", "Can Pebble fly?", N],
    ["No one on the soccer team is older than 10. Jada is on the soccer team.", "Is Jada older than 10?", N],
    ["No cats in the shelter are black. Shadow is a black cat.", "Is Shadow in the shelter?", N],
    ["No cats in the shelter are black. Mittens is a cat who is not in the shelter.", "Is Mittens black?", T],
    ["Some birds can talk. Kiwi is a bird.", "Can Kiwi talk?", T],
    ["Some kids in the class have a sister. Dev is in the class.", "Does Dev have a sister?", T],
    ["Some of the cupcakes have sprinkles. Ella ate one of the cupcakes.", "Did Ella's cupcake have sprinkles?", T],
    ["Only Mia has a key to the shed. Someone opened the shed with a key.", "Was it Mia's key?", Y],
    ["Every star sticker is gold. Ben has a sticker that is not gold.", "Is Ben's sticker a star sticker?", N],
    ["Lin is taller than Max. Max is taller than Ivy.", "Is Lin taller than Ivy?", Y],
    ["Lin is taller than Max. Lin is taller than Ivy.", "Is Max taller than Ivy?", T],
    ["Ana is older than Ben. Ben is older than Cy.", "Is Cy older than Ana?", N],
    ["All the marbles in the bag are red or blue. Gus took a marble from the bag. It is not red.", "Is Gus's marble blue?", Y],
    ["The shop is open every day except Sunday. Today is Tuesday.", "Is the shop open today?", Y],
    ["The shop is closed on Sundays. Today the shop is closed.", "Is today Sunday?", T],
    ["Every even number can be split into two equal groups. 14 is an even number.", "Can 14 be split into two equal groups?", Y],
    ["Everyone who rode the roller coaster is over 4 feet tall. Ivy rode the roller coaster.", "Is Ivy over 4 feet tall?", Y],
    ["Everyone who rode the roller coaster is over 4 feet tall. Ivy is over 4 feet tall.", "Did Ivy ride the roller coaster?", T],
    ["Everyone who rode the roller coaster is over 4 feet tall. Sam is not over 4 feet tall.", "Did Sam ride the roller coaster?", N]
  );
})();

/* ---------- 8 · symmetry: finish the mirror picture, mirror words, lines of symmetry ---------- */
const LGB_DOTS = ["🔴", "🟠", "🟡", "🟢", "🔵", "🟣"];
const LGB_MWORDS = [["MOM", ["DAD", "POP", "BOB"]], ["WOW", ["NAN", "SIS", "DID"]], ["TOT", ["PEP", "GAG", "EVE"]], ["TOOT", ["NOON", "DEED", "PEEP"]], ["OTTO", ["ANNA", "ELLE", "SEES"]], ["AHA", ["ERE", "BIB", "DUD"]], ["YAY", ["NUN", "GIG", "PUP"]], ["HAH", ["SOS", "EYE", "PIP"]]];
const LGB_LINES = [["a square", 4], ["a rectangle that is not a square", 2], ["a triangle with 3 equal sides", 3], ["a regular hexagon (6 equal sides)", 6], ["a regular pentagon (5 equal sides)", 5], ["a heart shape ❤️", 1]];
addBank(8, "logic", "symmetry", 0.6, function () {
  const k = Math.random();
  if (k < 0.45) {
    const n = Math.random() < 0.5 ? 3 : 4, left = shuffle(LGB_DOTS).slice(0, n), ansArr = left.slice().reverse(), ans = ansArr.join(" ");
    const cands = [left.join(" "), [...left.slice(1), left[0]].join(" "), [ansArr[1], ansArr[0], ...ansArr.slice(2)].join(" "), [...ansArr.slice(0, n - 2), ansArr[n - 1], ansArr[n - 2]].join(" ")];
    return { q: "The line going straight down the middle is a mirror. Which colors finish the right side?", say: "The line going straight down the middle is a mirror. Which colors finish the mirror picture on the right side?", vis: eq(`${left.join(" ")} <b style="color:#999">┃</b> ${Array(n).fill("❓").join(" ")}`), opts: uniq(ans, cands, () => shuffle(left).join(" ")), ans, sayAns: "the colors in flipped order", why: `A mirror flips the order: the color next to the line stays next to the line, so the right side is ${ans}.`, key: "m" + left.join("") };
  }
  if (k < 0.75) {
    const [w, dis] = pick(LGB_MWORDS);
    return { q: "Stand a mirror <b>beside</b> each word, so left and right swap. Which word looks exactly the <b>same</b>?", say: "Stand a mirror beside each word, so the left and right sides swap. Which word looks exactly the same in the mirror?", opts: shuffle([w, ...dis]), ans: w, big: 1, why: `${w} reads the same both ways, and every letter in it (${[...new Set(w)].join(", ")}) has matching left and right sides, so the mirror picture matches.`, key: "w" + w };
  }
  const [name, n] = pick(LGB_LINES);
  return { q: `How many lines of symmetry does <b>${name}</b> have?`, say: `How many lines of symmetry does ${name.replace(" ❤️", "")} have?`, opts: uniq(String(n), [n + 1, n - 1, n * 2, 0].filter(x => x >= 0)), ans: String(n), big: 1, why: `There ${n === 1 ? "is 1 line" : `are ${n} different lines`} you can fold ${name.replace(" ❤️", "")} along so the two halves match exactly.`, key: "l" + n };
});

/* ---------- 9 · combos: more stories ---------- */
const LGB_COMBO = [
  ["A pizza shop", "crusts", "toppings", "pizzas", "crust", "topping"],
  ["A smoothie stand", "fruits", "yogurts", "smoothies", "fruit", "yogurt"],
  ["An ice cream stand", "flavors", "toppings", "treats", "flavor", "topping"],
  ["A costume box", "masks", "capes", "costumes", "mask", "cape"],
  ["A lunch menu", "sandwiches", "drinks", "lunches", "sandwich", "drink"],
  ["A pet shop", "collars", "leashes", "collar-and-leash sets", "collar", "leash"],
  ["A craft table", "colors of card", "stickers", "cards", "color of card", "sticker"],
  ["A breakfast menu", "cereals", "fruits", "breakfasts", "cereal", "fruit"],
];
addBank(9, "logic", "combos", 0.75, function () {
  if (Math.random() < 0.9) {
    const i = R(0, LGB_COMBO.length - 1), [who, A, B, T, a1, b1] = LGB_COMBO[i], a = R(2, 6), b = R(2, 6), ans = a * b;
    return { q: `${who} has <b>${a} ${A}</b> and <b>${b} ${B}</b>. How many different ${T} can you make with one ${a1} and one ${b1}?`, opts: numU(ans, [a + b, ans + a, ans - 1, ans + 1], 2, 1), ans: String(ans), big: 1, why: `Each of the ${a} ${A} goes with each of the ${b} ${B}: ${a} × ${b} = ${ans}.`, key: "c" + i + "-" + a + "-" + b };
  }
  const n = R(3, 7), ans = n * (n - 1) / 2, steps = range(1, n - 1).reverse();
  return { q: `<b>${n} friends</b> meet. Each pair of friends gives one high five. How many high fives are there in all?`, opts: numU(ans, [n * (n - 1), n * n, ans + 1, ans - 1], 2, 1), ans: String(ans), big: 1, why: `The first friend high-fives the ${n - 1} others. Each next friend has one fewer new friend to high-five: ${steps.join(" + ")} = ${ans}.`, key: "h" + n };
});

/* ---------- 8 · codes: more 3-letter words ---------- */
CODEWORDS.push("ARM", "BAG", "BAT", "BOX", "BUG", "CAN", "COW", "CAR", "DAY", "EAR", "ELF", "FAN", "FIG", "FUN", "GUM", "HEN", "HOP", "INK", "JET", "JOY", "KEY", "LEG", "LOG", "MOP", "MUD", "NET", "NUT", "OAK", "PAN", "PEN", "POT", "RUG", "SKY", "TAP", "TEN", "VAN", "WEB", "YAK", "ZIP", "WIG", "TUB");

/* ---------- 8 · venn: more sorting sets ---------- */
VENNS.push(
  ["Bigger than 10", "Even", { both: ["12", "14", "16", "18", "20"], a: ["11", "13", "15", "17", "19"], b: ["2", "4", "6", "8", "10"], out: ["1", "3", "5", "7", "9"] }],
  ["A teen number", "Odd", { both: ["13", "15", "17", "19"], a: ["14", "16", "18"], b: ["1", "3", "5", "7", "9", "21", "23"], out: ["2", "4", "6", "8", "10", "20", "22"] }],
  ["Less than 10", "Odd", { both: ["1", "3", "5", "7", "9"], a: ["2", "4", "6", "8"], b: ["11", "13", "15", "17"], out: ["10", "12", "14", "16"] }],
  ["Blue", "Round", { both: ["🔵"], a: ["🟦", "🔷"], b: ["🔴", "🟢", "🟡", "🟠", "🟣"], out: ["🟥", "🟩", "🟧", "🔺", "⬛"] }],
  ["Green", "A vegetable", { both: ["🥦", "🥬"], a: ["🐸", "🍀", "🌲", "🍏"], b: ["🥕", "🥔", "🧅"], out: ["🍌", "⚽", "🎈"] }],
  ["Yellow", "A fruit", { both: ["🍌", "🍋"], a: ["🌻", "🐤", "⭐", "🧀"], b: ["🍇", "🍉", "🍓", "🫐"], out: ["🐸", "🥦", "🎈"] }],
  ["Cold", "A dessert", { both: ["🍦", "🍨", "🍧"], a: ["⛄", "🧊", "❄️"], b: ["🍰", "🍪", "🧁", "🥧"], out: ["🔥", "🌭", "🚲"] }],
  ["A vowel", "In the word APPLE", { both: ["A", "E"], a: ["I", "O", "U"], b: ["P", "L"], out: ["B", "C", "D", "F", "G", "K", "M"] }]
);

/* ---------- 9 · cipher: more words ---------- */
SHIFTWORDS.push("BELL", "DUCK", "LAMP", "MILK", "NEST", "PARK", "SEED", "SNOW", "WIND", "BEAR", "GOAT", "FARM", "JUMP", "LEAF", "POND", "RING", "SOCK", "BOAT", "DRUM", "CORN", "BUG", "OWL", "PEN", "BOX", "JAR");

/* ---------- 9 · letterseq: new kinds of letter patterns ---------- */
addBank(9, "logic", "letterseq", 0.5, function () {
  const L = i => ALPHA[i], k = pick(["b3", "f4", "grow", "pairs", "rep"]);
  const near = (a, extra) => [a + 1, a - 1, a + 2, a - 2, ...extra].filter(i => i >= 0 && i <= 25).map(L);
  const fill = () => pick(ALPHA.split(""));
  if (k === "b3" || k === "f4") {
    const step = k === "b3" ? -3 : 4, s = k === "b3" ? R(12, 25) : R(0, 9), seq = range(0, 4).map(i => s + step * i), ans = L(seq[4]);
    return { q: "What letter comes next?", vis: train([...seq.slice(0, 4).map(L), "?"]), opts: uniq(ans, near(seq[4], [seq[3]]), fill), ans, big: 1, why: `Each step ${step > 0 ? "moves forward" : "moves back"} ${Math.abs(step)} letters: ${seq.map(L).join(", ")}.`, key: "n" + seq.map(L).join("") };
  }
  if (k === "grow") {
    const s = R(0, 15), seq = [s, s + 1, s + 3, s + 6, s + 10], ans = L(seq[4]);
    return { q: "What letter comes next?", vis: train([...seq.slice(0, 4).map(L), "?"]), opts: uniq(ans, near(seq[4], [s + 9, s + 8]), fill), ans, big: 1, why: `The jumps get bigger: +1, +2, +3, then +4. So ${seq.slice(0, 4).map(L).join(", ")}, ${ans}.`, key: "g" + L(s) };
  }
  if (k === "pairs") {
    const s = R(0, 18), g = i => L(s + i) + L(s + i + 1), ans = g(6);
    const cands = [[6, 8], [7, 8], [5, 6], [7, 6], [8, 9], [6, 9]].filter(([x, y]) => s + x <= 25 && s + y <= 25).map(([x, y]) => L(s + x) + L(s + y));
    return { q: "What comes next?", say: `What comes next? ${g(0)}, ${g(2)}, ${g(4)}, then what?`, vis: train([g(0), g(2), g(4), "?"]), opts: uniq(ans, cands, () => { const i = R(0, 24); return L(i) + L(i + 1); }), ans, big: 1, why: `Each group is the next two letters: ${g(0)}, ${g(2)}, ${g(4)}, ${ans}.`, key: "p" + L(s) };
  }
  const s = R(0, 22), six = Math.random() < 0.5, shown = six ? [s, s, s + 1, s + 1, s + 2, s + 2] : [s, s, s + 1, s + 1, s + 2], ai = six ? s + 3 : s + 2, ans = L(ai);
  return { q: "What letter comes next?", vis: train([...shown.map(L), "?"]), opts: uniq(ans, near(ai, [ai + 1]), fill), ans, big: 1, why: `Each letter comes twice: ${shown.map(L).join(", ")}, so next is ${ans}.`, key: "r" + L(s) + six };
});

