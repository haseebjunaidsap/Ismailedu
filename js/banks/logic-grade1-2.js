/* =====================================================================
   Question bank: Logic A (ages 6–7)
   shadows, sizes, panalogy, riddles, growing, beforeafter, together,
   turns, ifthen, oddone, balance, calendar
   ===================================================================== */

/* ---------- 6 · Shadow Match ---------- */
const LGA_SHADOWS = parseSet("🦘:kangaroo,🐊:crocodile,🐬:dolphin,🐎:horse,🐁:mouse,🦇:bat,🦢:swan,✂️:scissors,🔑:key,☂️:umbrella,🎸:guitar,✈️:airplane,🚲:bike,⚓:anchor,🔨:hammer,🦷:tooth,🍐:pear,🍄:mushroom,🌵:cactus,🌴:palm tree,🏠:house,🎩:top hat,👟:shoe,🪑:chair,🚗:car,🚁:helicopter,⛵:sailboat,🐝:bee,🐍:snake,🦖:dinosaur,🦚:peacock,🦜:parrot,🐧:penguin,🦉:owl,🦭:seal,🦥:sloth,🦏:rhino,🌙:moon,⭐:star,❤️:heart,✋:hand,🎺:trumpet,🪁:kite,🧸:teddy bear,🥕:carrot,🍕:pizza slice,🍦:ice cream cone");
addBank(6, "logic", "shadows", 0.88, function () {
  if (Math.random() < 0.45) {
    const [t, ...rest] = shuffle(LGA_SHADOWS), others = rest.slice(0, 3);
    return { q: "Which shadow belongs to this picture?", vis: `<span class="emo" style="font-size:96px">${t[0]}</span>`, opts: shuffle([t, ...others]).map(shadowOpt), ans: shadowOpt(t), why: `The ${t[1]}'s shadow has the same shape.`, key: "LGA" + t[0] };
  }
  const pool = Math.random() < 0.45 ? SHADOWS : LGA_SHADOWS, [t, ...rest] = shuffle(pool), others = rest.slice(0, 3);
  return { q: "Which picture made this shadow?", vis: `<span class="emo shadow" style="font-size:96px">${t[0]}</span>`, opts: shuffle([t, ...others]).map(eOpt), ans: eOpt(t), sayAns: `the ${t[1]}`, why: `The shadow has the same shape as the ${t[1]}.`, key: "LGAr" + t[0] };
});

/* ---------- 6 · Biggest & Smallest ---------- */
// Tiers of real-life size; only items from different tiers are compared.
const LGA_SIZE_TIERS = [
  parseSet("🐜:ant,🐞:ladybug,🐝:bee"),
  parseSet("🐭:mouse,🍎:apple,🐸:frog"),
  parseSet("🐱:cat,🐰:rabbit,🐔:chicken"),
  parseSet("🐴:horse,🐮:cow,🐻:bear"),
  parseSet("🐘:elephant,🦒:giraffe"),
  parseSet("🐳:whale,✈️:airplane"),
];
const LGA_SIZE_ALL = LGA_SIZE_TIERS.flatMap((t, i) => t.map(x => [...x, i]));
addBank(6, "logic", "sizes", 0.85, function () {
  let a, b; do { [a, b] = shuffle(LGA_SIZE_ALL).slice(0, 2); } while (a[2] === b[2]);
  const [p, q] = LGA_SIZE_ALL.indexOf(a) < LGA_SIZE_ALL.indexOf(b) ? [a, b] : [b, a];
  const big = Math.random() < 0.5, ans = big ? (p[2] > q[2] ? p : q) : (p[2] < q[2] ? p : q), other = ans === p ? q : p;
  const w = big ? "bigger" : "smaller";
  return { q: `Which is <b>${w}</b> in real life?`, say: `Which is ${w} in real life, the ${p[1]} or the ${q[1]}?`, opts: shuffle([p, q]).map(eOpt), ans: eOpt(ans), sayAns: `the ${ans[1]}`, why: `In real life, a${/^[aeiou]/.test(ans[1]) ? "n" : ""} ${ans[1]} is ${w} than a${/^[aeiou]/.test(other[1]) ? "n" : ""} ${other[1]}.`, key: "LGA" + p[0] + q[0] + big };
});

/* ---------- 7 · Goes With (analogies) ---------- */
// Each group: pairs [a, b, emojiA, emojiB, sentence]. Any two pairs in a group make an analogy.
const LGA_PANAL = [
  [["cat", "kitten", "🐱", "", "A kitten is a baby cat"], ["dog", "puppy", "🐶", "", "A puppy is a baby dog"], ["cow", "calf", "🐮", "", "A calf is a baby cow"], ["sheep", "lamb", "🐑", "", "A lamb is a baby sheep"], ["duck", "duckling", "🦆", "", "A duckling is a baby duck"], ["bear", "cub", "🐻", "", "A cub is a baby bear"], ["frog", "tadpole", "🐸", "", "A tadpole is a baby frog"], ["hen", "chick", "🐔", "🐥", "A chick is a baby hen"]],
  [["bird", "nest", "🐦", "🪺", "A bird lives in a nest"], ["bee", "hive", "🐝", "", "A bee lives in a hive"], ["spider", "web", "🕷️", "🕸️", "A spider lives in a web"], ["dog", "doghouse", "🐶", "", "A dog lives in a doghouse"], ["bear", "cave", "🐻", "", "A bear lives in a cave"], ["ant", "anthill", "🐜", "", "An ant lives in an anthill"], ["fish", "pond", "🐟", "", "A fish lives in a pond"]],
  [["hand", "glove", "✋", "🧤", "You wear a glove on your hand"], ["foot", "shoe", "🦶", "👟", "You wear a shoe on your foot"], ["head", "hat", "", "🧢", "You wear a hat on your head"], ["eyes", "glasses", "👀", "👓", "You wear glasses on your eyes"], ["neck", "scarf", "", "🧣", "You wear a scarf on your neck"], ["wrist", "watch", "", "⌚", "You wear a watch on your wrist"]],
  [["pencil", "write", "✏️", "", "You use a pencil to write"], ["scissors", "cut", "✂️", "", "You use scissors to cut"], ["broom", "sweep", "🧹", "", "You use a broom to sweep"], ["bed", "sleep", "🛏️", "", "You use a bed to sleep"], ["cup", "drink", "🥤", "", "You use a cup to drink"], ["key", "unlock", "🔑", "", "You use a key to unlock"], ["sponge", "wash", "🧽", "", "You use a sponge to wash"]],
  [["hot", "cold", "", "", "Hot is the opposite of cold"], ["up", "down", "", "", "Up is the opposite of down"], ["big", "small", "", "", "Big is the opposite of small"], ["day", "night", "", "", "Day is the opposite of night"], ["happy", "sad", "", "", "Happy is the opposite of sad"], ["fast", "slow", "", "", "Fast is the opposite of slow"], ["open", "closed", "", "", "Open is the opposite of closed"], ["wet", "dry", "", "", "Wet is the opposite of dry"], ["in", "out", "", "", "In is the opposite of out"], ["loud", "quiet", "", "", "Loud is the opposite of quiet"]],
  [["dog", "woof", "🐶", "", "A dog says woof"], ["cat", "meow", "🐱", "", "A cat says meow"], ["cow", "moo", "🐮", "", "A cow says moo"], ["sheep", "baa", "🐑", "", "A sheep says baa"], ["duck", "quack", "🦆", "", "A duck says quack"], ["pig", "oink", "🐷", "", "A pig says oink"], ["lion", "roar", "🦁", "", "A lion says roar"], ["owl", "hoot", "🦉", "", "An owl says hoot"], ["horse", "neigh", "🐴", "", "A horse says neigh"], ["bee", "buzz", "🐝", "", "A bee says buzz"], ["frog", "ribbit", "🐸", "", "A frog says ribbit"], ["mouse", "squeak", "🐭", "", "A mouse says squeak"]],
  [["banana", "yellow", "🍌", "", "A banana is yellow"], ["strawberry", "red", "🍓", "", "A strawberry is red"], ["broccoli", "green", "🥦", "", "Broccoli is green"], ["carrot", "orange", "🥕", "", "A carrot is orange"], ["eggplant", "purple", "🍆", "", "An eggplant is purple"], ["snow", "white", "❄️", "", "Snow is white"], ["sky", "blue", "", "", "The sky is blue"]],
];
const LGA_lc = s => s[0].toLowerCase() + s.slice(1);
addBank(7, "logic", "panalogy", 0.92, function () {
  const G = pick(LGA_PANAL), [p, q] = shuffle(G).slice(0, 2);
  const others = shuffle(G.filter(x => x !== p && x !== q)).slice(0, 2).map(x => x[1]);
  const e = x => `<span class="emo xl">${x}</span>`;
  const vis = p[2] && q[2] ? row(e(p[2]), p[3] ? e(p[3]) : "", `<span class="sym">·</span>`, e(q[2]), `<span class="car q">?</span>`) : "";
  return { q: `Which one fits?<div class="analogy"><span>${p[0]}</span><i>→</i><span>${p[1]}</span><b>as</b><span>${q[0]}</span><i>→</i><span class="blank">?</span></div>`, say: `${p[0]} goes with ${p[1]}. So ${q[0]} goes with what?`, vis, opts: shuffle([q[1], p[1], ...others]), ans: q[1], big: 1, why: `${p[4]}, and ${LGA_lc(q[4])}.`, key: "LGA" + p[0] + p[1] + q[0] };
});

/* ---------- 7 · Picture Riddles ---------- */
// [text, emoji, name, article, category]
const LGA_RIDDLES = [
  ["I am a farm animal and I say moo.", "🐮", "cow", "a", "A"], ["I say oink and I love to roll in the mud.", "🐷", "pig", "a", "A"], ["I have a woolly coat and I say baa.", "🐑", "sheep", "a", "A"], ["I say quack and I swim in ponds.", "🦆", "duck", "a", "A"], ["I have black and white fur and I eat bamboo.", "🐼", "panda", "a", "A"], ["I am a pink bird and I stand on one leg.", "🦩", "flamingo", "a", "A"], ["I have a hump on my back and I live in the desert.", "🐫", "camel", "a", "A"], ["I am a bird that can't fly, and I swim in icy water.", "🐧", "penguin", "a", "A"], ["I hop on lily pads and say ribbit.", "🐸", "frog", "a", "A"], ["I swing in trees and love to eat bananas.", "🐒", "monkey", "a", "A"], ["I am tiny, I squeak, and I love cheese.", "🐭", "mouse", "a", "A"], ["I have eight legs and I spin a web.", "🕷️", "spider", "a", "A"], ["I am a little red bug with black spots.", "🐞", "ladybug", "a", "A"], ["I was a caterpillar, and now I have bright wings.", "🦋", "butterfly", "a", "A"], ["I am the biggest animal in the sea, and I spray water from my top.", "🐳", "whale", "a", "A"], ["I have a horn on my nose and thick gray skin.", "🦏", "rhino", "a", "A"], ["I sleep upside down and fly at night.", "🦇", "bat", "a", "A"], ["I have a red comb on my head, and I crow in the morning.", "🐓", "rooster", "a", "A"], ["I carry my shell on my back and leave a slimy trail.", "🐌", "snail", "a", "A"], ["I have pinchy claws and walk sideways on the beach.", "🦀", "crab", "a", "A"], ["I have no legs. I slither and hiss.", "🐍", "snake", "a", "A"], ["I am a big wild cat with orange fur and black stripes.", "🐯", "tiger", "a", "A"], ["I have bumpy green skin and a long snout, and I swim in rivers.", "🐊", "crocodile", "a", "A"], ["I have a big fluffy tail and I hide acorns.", "🐿️", "squirrel", "a", "A"], ["I am a big brown animal and I sleep all winter.", "🐻", "bear", "a", "A"], ["I live in a fish bowl and I swim with my fins.", "🐟", "fish", "a", "A"], ["I have long ears and a fluffy cotton tail.", "🐰", "rabbit", "a", "A"], ["I purr when you pet me.", "🐱", "cat", "a", "A"], ["I am small and covered in prickly spines.", "🦔", "hedgehog", "a", "A"], ["I am a tiny bug, and I live in a hill with lots of friends.", "🐜", "ant", "an", "A"], ["I am a smart sea animal. I jump out of the waves and click.", "🐬", "dolphin", "a", "A"], ["I am a make-believe horse with one horn.", "🦄", "unicorn", "a", "A"],
  ["I am yellow with petals, and I turn to face the sun.", "🌻", "sunflower", "a", "N"], ["I am green and prickly, and I grow in the desert.", "🌵", "cactus", "a", "N"], ["I have a trunk, branches and lots of leaves.", "🌳", "tree", "a", "N"], ["I shine at night, and I change from round to thin.", "🌙", "moon", "the", "N"], ["I have many colors, and I show up after the rain.", "🌈", "rainbow", "a", "N"], ["I am white and fluffy, and I float in the sky.", "☁️", "cloud", "a", "N"], ["I am hot and bright, and I crackle in a campfire.", "🔥", "fire", "", "N"], ["I fall from the clouds and make puddles.", "🌧️", "rain", "", "N"], ["I am made of snow and I have a carrot nose.", "⛄", "snowman", "a", "N"],
  ["I need wind to fly, and you hold my long string.", "🪁", "kite", "a", "T"], ["You blow me up for a party, and I pop with a bang!", "🎈", "balloon", "a", "T"], ["I am soft and cuddly. You hug me at bedtime.", "🧸", "teddy bear", "a", "T"], ["I am orange and bouncy. You shoot me into a hoop.", "🏀", "basketball", "a", "T"], ["You hit me over a net with a racket.", "🎾", "tennis ball", "a", "T"], ["I have strings, and you strum me to make music.", "🎸", "guitar", "a", "T"], ["You bang on me with sticks. Boom, boom!", "🥁", "drum", "a", "T"], ["You blow into me and I go toot! I am shiny gold.", "🎺", "trumpet", "a", "T"], ["I have a long handle, and I sweep the floor.", "🧹", "broom", "a", "T"], ["I have two blades, and I cut paper.", "✂️", "scissors", "pl", "T"], ["You write with me, and I have an eraser on my end.", "✏️", "pencil", "a", "T"], ["I have a seat, four legs and a back. You sit on me.", "🪑", "chair", "a", "T"], ["You sleep on me every night with a pillow.", "🛏️", "bed", "a", "T"], ["You wear me on your head to keep the sun out of your eyes.", "🧢", "cap", "a", "T"], ["You wear us on your hands to keep them warm.", "🧤", "gloves", "pl", "T"], ["You wrap me around your neck when it's cold.", "🧣", "scarf", "a", "T"], ["I help people see better. I sit on your nose.", "👓", "glasses", "pl", "T"], ["You talk to people far away with me.", "📞", "phone", "a", "T"], ["I am small and metal, and I open locks.", "🔑", "key", "a", "T"], ["I have tall towers, and kings and queens live in me in stories.", "🏰", "castle", "a", "T"], ["I run on batteries and shine a bright light in the dark.", "🔦", "flashlight", "a", "T"], ["I have a little flame on top, and I melt as I burn.", "🕯️", "candle", "a", "T"], ["You put me in an envelope and send me in the mail.", "✉️", "letter", "a", "T"], ["You wear me on your wrist to tell the time.", "⌚", "watch", "a", "T"], ["I make bubbles and wash dirt off your hands.", "🧼", "soap", "", "T"], ["I am wrapped in paper with a bow, and I hide a surprise.", "🎁", "present", "a", "T"],
  ["I am big and yellow, and I take kids to school.", "🚌", "school bus", "a", "V"], ["I zoom up into space with a big blast.", "🚀", "rocket", "a", "V"], ["I chug along on tracks and pull many cars.", "🚂", "train", "a", "V"], ["I have spinning blades on top, and I can fly straight up.", "🚁", "helicopter", "a", "V"], ["I float on water, and the wind pushes my sail.", "⛵", "sailboat", "a", "V"], ["I have a loud siren, and I carry firefighters.", "🚒", "fire truck", "a", "V"], ["I have two wheels and pedals, and you ride me.", "🚲", "bike", "a", "V"],
  ["I am a red fruit with tiny seeds on my skin.", "🍓", "strawberry", "a", "F"], ["I am green outside and red inside, with black seeds.", "🍉", "watermelon", "a", "F"], ["I grow in bunches, and I can be purple or green.", "🍇", "grapes", "pl", "F"], ["I am a sour yellow fruit.", "🍋", "lemon", "a", "F"], ["I pop in a pan, and you eat me at the movies.", "🍿", "popcorn", "", "F"], ["I am round and flat, with cheese and sauce on top.", "🍕", "pizza", "", "F"], ["I have a hole in the middle and sprinkles on top.", "🍩", "donut", "a", "F"], ["I am round and sweet, with chocolate chips inside.", "🍪", "cookie", "a", "F"], ["I have yellow kernels on a cob.", "🌽", "corn", "", "F"], ["I look like a tiny green tree, and I am a vegetable.", "🥦", "broccoli", "", "F"], ["A hen lays me, and I have a shell.", "🥚", "egg", "an", "F"], ["I have candles on top on your birthday.", "🎂", "cake", "a", "F"], ["Bees make me. I am sweet and sticky.", "🍯", "honey", "", "F"], ["I am white and cold, and I come from cows.", "🥛", "milk", "", "F"], ["I am a round fruit with the same name as my color.", "🍊", "orange", "an", "F"], ["I am a vegetable that can make you cry when you cut me.", "🧅", "onion", "an", "F"],
];
addBank(7, "logic", "riddles", 0.78, function () {
  const r = pick(LGA_RIDDLES), [txt, e, n, art, cat] = r, others = shuffle(LGA_RIDDLES.filter(x => x !== r && x[4] === cat)).slice(0, 3);
  const nm = (art && art !== "pl" ? art + " " : "") + n;
  return { q: `<div class="sentence">${txt}</div>What am I?`, say: `${txt} What am I?`, opts: shuffle([[e, n], ...others.map(x => [x[1], x[2]])]).map(eOpt), ans: eOpt([e, n]), sayAns: nm, why: `${art === "pl" ? "They're" : "It's"} ${nm}!`, key: "LGA" + txt };
});

/* ---------- 6 · Growing Patterns ---------- */
const LGA_GROW_NEW = ["🍓", "🐞", "🎈", "🍪", "🦆", "🧁", "🌸", "⚽"];
const LGA_GROW_ALL = ["⭐", "🍎", "🌼", "🐟", "🔴", ...LGA_GROW_NEW];
addBank(6, "logic", "growing", 0.85, function () {
  const step = pick([1, 2]), start = R(1, 3);
  if (Math.random() < 0.3) {
    const e = pick(LGA_GROW_NEW), seq = [0, 1, 2].map(i => start + i * step), ans = start + 3 * step;
    return { q: "How many come <b>next</b>?", say: "The pattern grows. How many come next?", vis: `<div class="grow-row">${seq.map(n => grp(n, e)).join("")}<span class="car q">?</span></div>`, opts: numU(ans, [ans + 1, ans - 1, seq[2], ans + step], 2, 1), ans: String(ans), big: 1, why: `It grows by ${step} each time: ${seq.join(", ")}, ${ans}.`, key: "LGA" + e + start + step };
  }
  const e = pick(LGA_GROW_ALL), seq = [0, 1, 2, 3].map(i => start + i * step), h = R(1, 2), ans = seq[h];
  return { q: "How many go in the <b>empty spot</b>?", say: "The pattern grows. How many go in the empty spot?", vis: `<div class="grow-row">${seq.map((n, i) => i === h ? `<span class="car q">?</span>` : grp(n, e)).join("")}</div>`, opts: numU(ans, [ans + 1, ans - 1, seq[h - 1], seq[h + 1]], 2, 1), ans: String(ans), big: 1, why: `It grows by ${step} each time: ${seq.join(", ")}.`, key: "LGAm" + e + start + step + h };
});

/* ---------- 6 · Before & After ---------- */
// [before, after, beforeName, afterName, tag]; items with the same tag are never used as each other's wrong answers.
const LGA_BA = [["☁️", "🌧️", "clouds", "rain", "sky", "Clouds fill up with water, and then rain falls."], ["🍊", "🧃", "oranges", "juice", "plant", "Oranges are squeezed to make juice."], ["🌾", "🍞", "wheat", "bread", "bake plant", "Wheat is made into flour, and flour is baked into bread."], ["🐑", "🧶", "sheep", "yarn", "wool", "Wool from a sheep is spun into yarn."], ["🧶", "🧦", "yarn", "socks", "wool", "Yarn can be knitted into socks."], ["💧", "🧊", "water", "ice", "sky", "Water freezes into ice when it gets very cold."], ["🌳", "🍎", "apple tree", "apples", "plant build", "Apples grow on an apple tree."], ["✉️", "📬", "letter", "mailbox", "", "First you write a letter, then you put it in the mailbox."], ["❄️", "⛄", "snow", "snowman", "sky", "Snow is rolled up to make a snowman."], ["🍃", "🍂", "green leaf", "fall leaf", "plant", "A green leaf turns orange in the fall."], ["🧱", "🏠", "bricks", "house", "build", "Bricks are stacked up to build a house."], ["🪵", "🪑", "wood", "chair", "build", "Wood is cut and built into a chair."], ["🐮", "🥛", "cow", "milk", "", "A cow gives us milk."], ["🎂", "🍰", "cake", "slice of cake", "bake", "A cake is cut into slices."], ["🐶", "🐕", "puppy", "dog", "grow", "A puppy grows up into a dog."], ["🐱", "🐈", "kitten", "cat", "grow", "A kitten grows up into a cat."], ["🐔", "🥚", "hen", "egg", "", "A hen lays an egg."], ["🫘", "🌱", "bean", "sprout", "plant", "A bean seed grows into a sprout."], ["🎨", "🖼️", "paint", "painting", "", "Paint is used to make a painting."], ["🥣", "🥞", "batter", "pancakes", "bake", "Batter is cooked into pancakes."], ["🌅", "🌇", "sunrise", "sunset", "sky", "The sun rises in the morning and sets in the evening."], ["🐝", "🍯", "bee", "honey", "plant", "A bee makes honey."], ["🏗️", "🏢", "building site", "building", "build", "Builders work at the building site until the building is done."], ["🧒", "🧑", "child", "grown-up", "grow", "A child grows up into a grown-up."], ["🌸", "🍒", "cherry blossom", "cherries", "plant", "Cherry blossoms turn into cherries."]];
const LGA_CHAINS = [[["🌰", "seed"], ["🌱", "sprout"], ["🌳", "tree"], "plant"], [["🥚", "egg"], ["🐣", "chick"], ["🐔", "hen"], "grow"], [["👶", "baby"], ["🧒", "child"], ["🧑", "grown-up"], "grow"], [["☁️", "clouds"], ["🌧️", "rain"], ["🌈", "rainbow"], "sky"], [["🌾", "wheat"], ["🍞", "bread"], ["🥪", "sandwich"], "food"], [["🐮", "cow"], ["🥛", "milk"], ["🧀", "cheese"], "food"], [["🐑", "sheep"], ["🧶", "yarn"], ["🧣", "scarf"]], [["❄️", "snow"], ["⛄", "snowman"], ["💦", "puddle"], "sky"], [["🌑", "new moon"], ["🌓", "half moon"], ["🌕", "full moon"]], [["🌲", "tree"], ["🪵", "wood"], ["🪑", "chair"], "plant"]];
addBank(6, "logic", "beforeafter", 0.75, function () {
  const o = (e, n) => `<span class="emo" title="${n}">${e}</span>`, big = e => `<span class="emo" style="font-size:72px">${e}</span>`, Q = `<span class="car q">?</span>`;
  if (Math.random() < 0.6) {
    const P = pick(LGA_BA), [a, b, an, bn, tag, bw] = P, others = shuffle(LGA_BA.filter(x => x !== P && !(tag && x[4].split(" ").some(t => tag.split(" ").includes(t))))).slice(0, 3);
    if (Math.random() < 0.5) return { q: "What comes <b>next</b>?", say: `What comes next after the ${an}?`, vis: row(big(a), arrow(), Q), opts: shuffle([o(b, bn), ...others.map(x => o(x[1], x[3]))]), ans: o(b, bn), sayAns: `the ${bn}`, why: bw, key: "LGAn" + a };
    return { q: "What came <b>before</b>?", say: `What came before the ${bn}?`, vis: row(Q, arrow(), big(b)), opts: shuffle([o(a, an), ...others.map(x => o(x[0], x[2]))]), ans: o(a, an), sayAns: `the ${an}`, why: bw, key: "LGAb" + b };
  }
  const C3 = pick(LGA_CHAINS), k = R(0, 2), ans = C3[k], others = shuffle(LGA_CHAINS.filter(x => x !== C3 && !(C3[3] && x[3] === C3[3]))).slice(0, 3).map(x => x[k]);
  const vis = row(...C3.slice(0, 3).map((x, i) => i === k ? Q : big(x[0])).flatMap((x, i) => i ? [arrow(), x] : [x]));
  const story = `First the ${C3[0][1]}, then the ${C3[1][1]}, then the ${C3[2][1]}.`;
  const q = k === 0 ? "What came <b>first</b>?" : k === 1 ? "What goes in the <b>middle</b>?" : "What comes <b>last</b>?";
  const say = k === 0 ? `What came before the ${C3[1][1]} and the ${C3[2][1]}?` : k === 1 ? `What comes between the ${C3[0][1]} and the ${C3[2][1]}?` : `First the ${C3[0][1]}, then the ${C3[1][1]}. What comes last?`;
  return { q, say, vis, opts: shuffle([ans, ...others]).map(x => o(x[0], x[1])), ans: o(ans[0], ans[1]), sayAns: `the ${ans[1]}`, why: story, key: "LGAc" + C3[0][0] + k };
});

/* ---------- 6 · Goes Together ---------- */
const LGA_PAIRS = [["🐒", "🍌", "monkey", "banana"], ["🐔", "🥚", "hen", "egg"], ["🐭", "🧀", "mouse", "cheese"], ["🐿️", "🌰", "squirrel", "acorn"], ["🐼", "🎋", "panda", "bamboo"], ["🕷️", "🕸️", "spider", "web"], ["🐻", "🍯", "bear", "honey"], ["🍔", "🍟", "burger", "fries"], ["🎨", "🖌️", "paint", "paintbrush"], ["📬", "✉️", "mailbox", "letter"], ["🚗", "⛽", "car", "gas pump"], ["🪁", "🌬️", "kite", "wind"], ["🎁", "🎀", "present", "bow"], ["🧵", "🪡", "thread", "needle"], ["🛁", "🧼", "bathtub", "soap"], ["👂", "🎧", "ears", "headphones"], ["☀️", "🕶️", "sun", "sunglasses"], ["🐌", "🐚", "snail", "shell"], ["🐧", "🧊", "penguin", "ice"], ["🐫", "🏜️", "camel", "desert"], ["🍿", "🎬", "popcorn", "movie"], ["🚂", "🛤️", "train", "tracks"], ["🥢", "🍜", "chopsticks", "noodles"], ["🍵", "🫖", "tea", "teapot"], ["🎿", "🏔️", "skis", "mountain"], ["🧑‍🚒", "🚒", "firefighter", "fire truck"], ["🧑‍⚕️", "🩺", "doctor", "stethoscope"], ["🧑‍🏫", "🏫", "teacher", "school"], ["🔋", "🔦", "battery", "flashlight"], ["🧑‍🔧", "🔧", "mechanic", "wrench"], ["🧑‍🎤", "🎤", "singer", "microphone"], ["🧑‍🚀", "🚀", "astronaut", "rocket"], ["⚓", "🚢", "anchor", "ship"], ["🧲", "📎", "magnet", "paper clip"], ["🦫", "🪵", "beaver", "log"], ["🦋", "🌸", "butterfly", "flower"], ["🛒", "🏪", "cart", "store"], ["👷", "🧱", "builder", "bricks"]];
addBank(6, "logic", "together", 0.7, function () {
  const i = R(0, LGA_PAIRS.length - 1), [a, b, an, bn] = LGA_PAIRS[i], flip = Math.random() < 0.5;
  const [x, xn, y, yn] = flip ? [b, bn, a, an] : [a, an, b, bn];
  const others = shuffle(LGA_PAIRS.filter((_, j) => j !== i)).slice(0, 3).map(p => flip ? [p[0], p[2]] : [p[1], p[3]]);
  const ar = w => /^[aeiou]/.test(w) ? "an" : "a", plural = /s$/.test(xn) && xn !== "glass";
  return { q: `Which one goes with <span class="emo">${x}</span>?`, say: `Which one goes with the ${xn}?`, vis: `<span class="emo" style="font-size:88px">${x}</span>`, opts: shuffle([[y, yn], ...others]).map(eOpt), ans: eOpt([y, yn]), sayAns: `the ${yn}`, why: `The ${xn} ${plural ? "go" : "goes"} with the ${yn}.`, key: "LGA" + x + flip };
});

/* ---------- 7 · Turning Arrows ---------- */
const LGA_DIAG = [["↗️", "up and to the right"], ["↘️", "down and to the right"], ["↙️", "down and to the left"], ["↖️", "up and to the left"]];
const LGA_STEPS = [[1, "a quarter turn to the right"], [-1, "a quarter turn to the left"], [2, "a half turn"]];
addBank(7, "logic", "turns", 0.72, function () {
  const o = ([em, n]) => `<span class="emo" title="pointing ${n}">${em}</span>`, bigA = em => `<span class="emo" style="font-size:96px">${em}</span>`;
  const m = R(0, 3);
  if (m === 0) { // diagonal arrows
    const s = R(0, 3), [k, words] = pick(TURNS), D = LGA_DIAG;
    if (Math.random() < 0.35) { const e2 = D[(s - k + 8) % 4]; return { q: `After <b>${words}</b>, the arrow points <b>${D[s][1]}</b>. Where was it pointing <b>before</b>?`, say: `After ${words}, the arrow points ${D[s][1]}. Where was it pointing before?`, vis: bigA(D[s][0]), opts: D.map(o), ans: o(e2), sayAns: e2[1], why: `Turn it back the other way: it was pointing ${e2[1]}.`, key: "LGAdb" + s + k }; }
    const e = D[(s + k + 8) % 4];
    return { q: `The arrow points <b>${D[s][1]}</b>. It makes <b>${words}</b>. Where does it point now?`, say: `The arrow points ${D[s][1]}. It makes ${words}. Where does it point now?`, vis: bigA(D[s][0]), opts: D.map(o), ans: o(e), sayAns: e[1], why: `${cap(D[s][1])} with ${words} is ${e[1]}.`, key: "LGAd" + s + k };
  }
  if (m === 1) { // two turns in a row
    const s = R(0, 3), [k1, w1] = pick(LGA_STEPS), [k2, w2] = pick(LGA_STEPS), mid = ARROWS[(s + k1 + 4) % 4], e = ARROWS[(s + k1 + k2 + 8) % 4];
    return { q: `The arrow points <b>${ARROWS[s][1]}</b>. It makes <b>${w1}</b>, then <b>${w2}</b>. Where does it point now?`, say: `The arrow points ${ARROWS[s][1]}. It makes ${w1}, then ${w2}. Where does it point now?`, vis: bigA(ARROWS[s][0]), opts: ARROWS.map(o), ans: o(e), sayAns: e[1], why: `After the first turn it points ${mid[1]}, and after the second turn it points ${e[1]}.`, key: "LGA2" + s + k1 + k2 };
  }
  // which turn was it?
  const diag = m === 3, D = diag ? LGA_DIAG : ARROWS, s = R(0, 3), d = R(1, 3), e = D[(s + d) % 4];
  const names = { 1: "a quarter turn to the right", 3: "a quarter turn to the left", 2: "a half turn" }, opts = [names[1], names[3], names[2], "a full turn"];
  return { q: `The arrow pointed <b>${D[s][1]}</b>. Now it points <b>${e[1]}</b>. What turn did it make?`, say: `The arrow pointed ${D[s][1]}. Now it points ${e[1]}. What turn did it make?`, vis: row(bigA(D[s][0]), arrow(), bigA(e[0])), opts: shuffle(opts), ans: names[d], why: `Going from ${D[s][1]} to ${e[1]} is ${names[d]}.`, key: "LGAw" + diag + s + d };
});

/* ---------- 7 · If-Then Rules ---------- */
const LGA_IF = [["If it is snowing, we wear boots.", "It is snowing.", "We wear boots.", ["We wear sandals.", "We go barefoot.", "We wear flip-flops."]], ["If the cat is hungry, it meows.", "The cat is hungry.", "The cat meows.", ["The cat barks.", "The cat is quiet.", "The cat moos."]], ["If the lights are off, the room is dark.", "The lights are off.", "The room is dark.", ["The room is bright.", "The room is sunny.", "The lights are on."]], ["If it is night, the stars come out.", "It is night.", "The stars come out.", ["The sun comes out.", "It is lunchtime.", "The stars go away."]], ["If ice cream sits in the sun, it melts.", "The ice cream sat in the sun.", "The ice cream melts.", ["The ice cream gets colder.", "The ice cream gets bigger.", "The ice cream freezes."]], ["If Sam wins the race, he gets a ribbon.", "Sam won the race.", "Sam gets a ribbon.", ["Sam gets no ribbon.", "Sam lost the race.", "Sam did not run."]], ["If you mix red and yellow paint, you get orange.", "Zoe mixed red and yellow paint.", "Zoe gets orange paint.", ["Zoe gets blue paint.", "Zoe gets green paint.", "Zoe gets purple paint."]], ["If you mix blue and yellow paint, you get green.", "Omar mixed blue and yellow paint.", "Omar gets green paint.", ["Omar gets red paint.", "Omar gets orange paint.", "Omar gets pink paint."]], ["If the baby is tired, she takes a nap.", "The baby is tired.", "The baby takes a nap.", ["The baby runs a race.", "The baby stays awake all day.", "The baby goes to school."]], ["If the music stops, everyone freezes.", "The music stopped.", "Everyone freezes.", ["Everyone keeps dancing.", "Everyone runs around.", "The music gets louder."]], ["If the dog is wet, it shakes.", "The dog is wet.", "The dog shakes.", ["The dog is dry.", "The dog flies away.", "The dog meows."]], ["If Grandma visits, we bake cookies.", "Grandma is visiting.", "We bake cookies.", ["We bake no cookies.", "Grandma stays home.", "We have no oven."]], ["If the sign says STOP, the car stops.", "The sign says STOP.", "The car stops.", ["The car goes faster.", "The car keeps going.", "The car flies."]], ["If you are sick, you stay home.", "Ava is sick.", "Ava stays home.", ["Ava goes to school.", "Ava runs a race.", "Ava goes to a party."]], ["If it is your birthday, you get a cake.", "It is Kai's birthday.", "Kai gets a cake.", ["Kai gets no cake.", "It is not Kai's birthday.", "Kai's birthday is over."]], ["If the room is messy, we clean up.", "The room is messy.", "We clean up.", ["We leave the mess.", "We make a bigger mess.", "We throw toys around."]], ["If the bus is late, we wait at the stop.", "The bus is late.", "We wait at the stop.", ["The bus came early.", "We are already at school.", "We fly to school."]], ["If water is boiling, it is very hot.", "The water is boiling.", "The water is very hot.", ["The water is cold.", "The water is frozen.", "The water is ice."]], ["If the flower gets sun, it opens.", "The flower is in the sun.", "The flower opens.", ["The flower closes.", "The flower turns into a tree.", "The flower walks away."]], ["If you clap your hands, it makes a sound.", "Ben claps his hands.", "It makes a sound.", ["It makes no sound.", "It makes a light.", "It makes it rain."]], ["If the library is open, we can get books.", "The library is open.", "We can get books.", ["We can't get books.", "The library is closed.", "The books are gone."]], ["If you are thirsty, you drink water.", "Lily is thirsty.", "Lily drinks water.", ["Lily drinks nothing.", "Lily eats salty chips.", "Lily runs in the hot sun."]], ["If the clock says 8, it is time for bed.", "The clock says 8.", "It is time for bed.", ["It is time for lunch.", "It is time to wake up.", "It is time for school."]], ["If the phone rings, Dad answers it.", "The phone is ringing.", "Dad answers it.", ["Dad lets it ring.", "The phone is quiet.", "Dad turns it off."]], ["If the car has no gas, it can't go.", "The car has no gas.", "The car can't go.", ["The car goes fast.", "The car flies.", "The car drives to the beach."]], ["If you wear a warm jacket, you stay warm.", "Noah wears a warm jacket.", "Noah stays warm.", ["Noah gets very cold.", "Noah shivers all day.", "Noah freezes."]], ["If the cookie jar is empty, there are no cookies.", "The cookie jar is empty.", "There are no cookies.", ["There are lots of cookies.", "There are 10 cookies.", "The jar is full."]], ["If a shape has 3 sides, it is a triangle.", "This shape has 3 sides.", "It is a triangle.", ["It is a circle.", "It is a square.", "It is a star."]], ["If it is windy, the kite flies high.", "It is windy.", "The kite flies high.", ["The kite stays on the ground.", "The kite falls down.", "There is no wind."]], ["If you feed the fish, it swims to the top.", "Maya feeds the fish.", "The fish swims to the top.", ["The fish hides at the bottom.", "The fish flies away.", "The fish barks."]], ["If you smile at Pip, Pip smiles back.", "You smile at Pip.", "Pip smiles back.", ["Pip frowns.", "Pip runs away.", "Pip cries."]], ["If you add 1 to a number, it gets bigger.", "Jay adds 1 to 5.", "The number gets bigger.", ["The number gets smaller.", "The number stays the same.", "The number goes away."]], ["If the light is red, cars stop.", "The light is red.", "Cars stop.", ["Cars go.", "Cars go faster.", "Cars honk and go."]], ["If the stove is hot, we don't touch it.", "The stove is hot.", "We don't touch it.", ["We touch it.", "We put our hands on it.", "We lean on it."]], ["If the soup is too hot, we blow on it.", "The soup is too hot.", "We blow on it.", ["We heat it up more.", "We gulp it down fast.", "We add hot water."]]];
addBank(7, "logic", "ifthen", 0.78, function () {
  if (Math.random() < 0.35) { const [r, f, a, d] = pick(LGA_IF); return { q: "Use the rule. What happens?", say: `Rule: ${r} Fact: ${f} What happens?`, vis: passage(`<b>Rule:</b> ${r}<br><b>Fact:</b> ${f}`), opts: shuffle([a, ...d]), ans: a, why: `The rule says so: ${r}`, key: "LGA" + r }; }
  // Which one does NOT follow the rule?
  const cols = shuffle(Object.keys(COLNAME)), target = cols[0], byShape = Math.random() < 0.5;
  let good, odd;
  if (byShape) {
    const tShape = pick(LSHAPES), cs = shuffle(Object.keys(COLNAME)).slice(0, 3);
    good = cs.map(c => [tShape, c]); odd = [pick(LSHAPES.filter(s => s !== tShape)), pick(Object.keys(COLNAME))];
    var rule = `If it is a <b>${tShape}</b>, it goes in the box.`, why = `It is not a ${tShape}, so it stays out.`, rk = tShape;
  } else {
    good = shuffle(LSHAPES).slice(0, 3).map(s => [s, target]); odd = [pick(LSHAPES), pick(cols.slice(1))];
    var rule = `If it is <b>${COLNAME[target]}</b>, it goes in the box.`, why = `It is not ${COLNAME[target]}, so it stays out.`, rk = target;
  }
  return { q: `${rule} Which one does <b>not</b> go in the box?`, say: `${clean(rule)} Which one does not go in the box?`, opts: shuffle([odd, ...good]).map(([n, c]) => shp(n, c, 64)), ans: shp(odd[0], odd[1], 64), sayAns: shpName(odd[0], odd[1]), why, key: "LGAnot" + rk + odd.join() };
});

/* ---------- 6 · Odd One Out ---------- */
const LGA_CATS = {
  birds: parseSet("🐦:bird,🦆:duck,🦉:owl,🦅:eagle,🦜:parrot,🐧:penguin,🦩:flamingo,🐓:rooster"),
  flowers: parseSet("🌹:rose,🌻:sunflower,🌷:tulip,🌼:daisy,🌸:blossom,🌺:hibiscus"),
  weather: parseSet("🌧️:rain,❄️:snow,⛈️:storm,🌈:rainbow,☁️:cloud"),
  tools: parseSet("🔨:hammer,🔧:wrench,🪚:saw,🪛:screwdriver,⛏️:pickax"),
  drinks: parseSet("🥛:milk,🧃:juice box,☕:hot cocoa,🍵:tea,🥤:cup with a straw"),
  "school things": parseSet("✏️:pencil,🖍️:crayon,📎:paper clip,📚:books,🎒:backpack"),
  "body parts": parseSet("👀:eyes,👂:ear,👃:nose,👄:mouth,✋:hand,🦶:foot"),
  toys: parseSet("🧸:teddy bear,🪀:yo-yo,🪁:kite,🎲:dice,🧩:puzzle piece"),
  buildings: parseSet("🏠:house,🏫:school,🏥:hospital,🏰:castle,🏢:office building,🏪:store"),
  "things in space": parseSet("🌙:moon,⭐:star,🪐:planet,☄️:comet"),
  trees: parseSet("🌲:pine tree,🌳:tree,🌴:palm tree"),
};
const LGA_CAT_KEYS = Object.keys(LGA_CATS);
addBank(6, "logic", "oddone", 0.45, function () {
  const [a, b] = shuffle(LGA_CAT_KEYS).slice(0, 2), same = shuffle(LGA_CATS[a]).slice(0, 3), odd = pick(LGA_CATS[b]);
  return { q: "Which one does <b>not</b> belong?", say: "Which one does not belong?", opts: shuffle([...same, odd]).map(eOpt), ans: eOpt(odd), sayAns: `the ${odd[1]}`, why: `The others are all ${a}. The ${odd[1]} is not.`, key: "LGA" + odd[0] + same.join() };
});

/* ---------- 7 · Balance Scales ---------- */
const LGA_W_TIERS = [
  parseSet("🍃:leaf,🎈:balloon,🦋:butterfly"),
  parseSet("🥚:egg,🍪:cookie,🧁:cupcake"),
  parseSet("🍊:orange,🍌:banana,🥔:potato"),
  parseSet("🍍:pineapple,🥥:coconut,🧱:brick"),
  parseSet("🧒:child,🚲:bike"),
  parseSet("🐴:horse,🐄:cow,🚗:car"),
  parseSet("🐳:whale,🚌:bus,🚂:train"),
];
const LGA_W_ALL = LGA_W_TIERS.flatMap((t, i) => t.map(x => [...x, i]));
addBank(7, "logic", "balance", 0.75, function () {
  let a, b; do { [a, b] = shuffle(LGA_W_ALL).slice(0, 2); } while (a[2] === b[2]);
  const heavy = a[2] > b[2] ? a : b, light = heavy === a ? b : a, heavyLeft = Math.random() < 0.5;
  const [L, Rr] = heavyLeft ? [heavy, light] : [light, heavy], askHeavy = Math.random() < 0.5, ans = askHeavy ? heavy : light;
  return { q: `Which is <b>${askHeavy ? "heavier" : "lighter"}</b>?`, say: `Look at the scale. Which is ${askHeavy ? "heavier" : "lighter"}?`, vis: seesaw(L[0], Rr[0], heavyLeft ? "left" : "right"), opts: [L, Rr].map(eOpt), ans: eOpt(ans), sayAns: `the ${ans[1]}`, why: askHeavy ? `The ${heavy[1]} side goes down, so the ${heavy[1]} is heavier.` : `The ${light[1]} side goes up, so the ${light[1]} is lighter.`, key: "LGA" + L[0] + Rr[0] + askHeavy };
});

/* ---------- 7 · Days of the Week ---------- */
addBank(7, "logic", "calendar", 0.55, function () {
  const t = R(0, 6), D = i => DAYS[(i + 70) % 7], k = R(0, 8);
  const dayOpts = a => uniq(a, shuffle(DAYS.filter(d => d !== a)));
  const F = [
    [`If <b>tomorrow</b> is ${DAYS[t]}, what day is <b>today</b>?`, -1, `Today is the day before tomorrow. The day before ${DAYS[t]} is ${D(t - 1)}.`],
    [`If <b>yesterday</b> was ${DAYS[t]}, what day is <b>today</b>?`, 1, `Today is the day after yesterday. The day after ${DAYS[t]} is ${D(t + 1)}.`],
    [`If <b>yesterday</b> was ${DAYS[t]}, what day is <b>tomorrow</b>?`, 2, `Count forward 2 days from ${DAYS[t]}: ${D(t + 1)}, then ${D(t + 2)}.`],
    [`If <b>tomorrow</b> is ${DAYS[t]}, what day was <b>yesterday</b>?`, -2, `Count back 2 days from ${DAYS[t]}: ${D(t - 1)}, then ${D(t - 2)}.`],
    [`If today is <b>${DAYS[t]}</b>, what day is the <b>day after tomorrow</b>?`, 2, `Tomorrow is ${D(t + 1)}, and the day after that is ${D(t + 2)}.`],
    [`If today is <b>${DAYS[t]}</b>, what day was the <b>day before yesterday</b>?`, -2, `Yesterday was ${D(t - 1)}, and the day before that was ${D(t - 2)}.`],
    [`What day comes <b>between</b> ${DAYS[t]} and ${D(t + 2)}?`, 1, `The order is ${DAYS[t]}, ${D(t + 1)}, ${D(t + 2)}.`],
  ];
  if (k < 7) { const [q, off, why] = F[k], a = D(t + off); return { q, opts: dayOpts(a), ans: a, big: 1, why, key: "LGA" + k + t }; }
  const n = R(1, 6), e = D(t + n);
  return { q: `How many days <b>after</b> ${DAYS[t]} is the next <b>${e}</b>?`, vis: `<div class="week">${DAYS.map((d, i) => `<span class="${i === t ? "today" : ""}">${d.slice(0, 3)}</span>`).join("")}</div>`, opts: numU(n, [n + 1, n - 1, 7 - n], 2, 1), ans: String(n), big: 1, why: `Count forward from ${DAYS[t]}: ${range(1, n).map(i => D(t + i)).join(", ")}. That is ${n} day${n > 1 ? "s" : ""}.`, key: "LGAh" + t + n };
});

