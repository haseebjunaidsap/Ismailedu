/* =====================================================================
   Why a wrong answer is wrong: Age 8 English
   (adjectives, compound, prefixes, reading8, abc, pronouns, capitals,
    factopinion, possessive, storyparts)
   ===================================================================== */

/* ---------- adjectives ---------- */
const EN8W_NAMES = ["ava", "dad", "grandpa", "kai", "leo", "mia", "mom", "nora", "zoe"];
const EN8W_NOUNS = "apple baby ball bear beard bed bees berries birdhouse blanket book boy braid bridge brother car cat cheeks chips cookies crow crowd day dog dress food fox frog gate giraffe girl grapes hill horse joke kitten leaves library log mitten morning mouse noise pebble pie plant pond puppy rainbow ring road rock runner shirt shoes skies snack song soup stone trophy tulips water wave train table knight whale hair peach thunder sister flower breeze".split(" ");
const EN8W_VERBS = "ate bit bounced built buzzed camped cheered climbed cooked crashed creaked crept crunched drank drooped found frown giggled got heard held hissed hugged lost made move napped opened painted planted played ran read rode sat shared shook sleeps squeaked told wore jumped yawned scared drew blew saw".split(" ");
const EN8W_OTHER = {
  away: "“away” tells where something went, not what a noun is like.",
  past: "“past” tells where something went, not what a noun is like.",
  by: "“by” tells where the fox went, not what the fox is like.",
  down: "“down” tells where the runner sat, not what the runner is like.",
  off: "“off” tells where the water went, not what anything is like.",
  under: "“under” tells where something is. It doesn't describe a noun.",
  quickly: "“quickly” tells how something is done, not what a noun is like.",
  not: "“not” just means no. It doesn't describe a noun.",
  me: "“me” is a word that stands for a person. It doesn't describe anything.",
  us: "“us” is a word that stands for people. It doesn't describe anything.",
  has: "“has” is a verb that tells what someone owns. It doesn't describe a noun.",
  were: "“were” is a verb that links words together. It doesn't describe a noun.",
  would: "“would” is a helping verb. It doesn't describe a noun.",
};
const EN8W_ADJT = {
  "a lemon": { loud: "A lemon makes no sound, so it can't be loud.", furry: "A lemon has smooth skin, not fur.", square: "A lemon is an oval shape, not square." },
  "snow": { hot: "Snow melts when it gets hot, so snow isn't hot.", noisy: "Snow falls quietly. It isn't noisy.", hairy: "Snow has no hair at all." },
  "a cloud": { sharp: "A cloud is soft and puffy, with no sharp points.", heavy: "A cloud floats high in the sky, so it doesn't look heavy.", sour: "You can't taste a cloud, so sour doesn't describe it." },
  "fire": { wet: "Water puts fire out, so fire isn't wet.", frozen: "Fire is the opposite of frozen. It melts ice.", quiet: "Fire can crackle and roar, so quiet isn't a good word for it." },
  "a turtle": { speedy: "Turtles move slowly, so speedy doesn't fit.", fluffy: "A turtle has a hard shell, not soft fluff.", tall: "A turtle is low to the ground, not tall." },
  "an elephant": { tiny: "An elephant is one of the biggest animals, not tiny.", light: "An elephant weighs a lot, so it isn't light.", shiny: "An elephant's skin is gray and wrinkly, not shiny." },
  "the sun": { dark: "The sun gives us light, so it isn't dark.", furry: "The sun is a ball of hot gas. It has no fur." },
  "chocolate": { sour: "Chocolate doesn't taste sour like a lemon.", sharp: "Chocolate isn't sharp. It melts in your mouth.", loud: "Chocolate makes no sound, so it isn't loud." },
  "a bunny": { prickly: "A bunny has soft fur, not prickles.", scaly: "A bunny has fur, not scales.", sticky: "A bunny's fur is soft, not sticky." },
  "a hedgehog": { smooth: "A hedgehog is covered in spines, so it isn't smooth.", slimy: "A hedgehog is dry and spiny, not slimy.", fluffy: "A hedgehog's back has sharp spines, not fluff." },
  "a snail": { fluffy: "A snail has a hard shell and no fluff.", speedy: "Snails move very slowly, so speedy doesn't fit.", loud: "Snails make no sound, so they aren't loud." },
  "an ice cube": { hot: "An ice cube melts if it gets hot.", fuzzy: "An ice cube is smooth, not fuzzy.", soft: "An ice cube is hard, not soft." },
  "a rainbow": { gray: "A rainbow is full of colors, not gray.", noisy: "A rainbow makes no sound, so it isn't noisy.", furry: "A rainbow is made of light. It has no fur." },
  "a rock": { soft: "A rock is hard, not soft.", juicy: "A rock has no juice inside.", fluffy: "A rock is hard, not fluffy." },
  "a mouse": { huge: "A mouse is very little, not huge.", tall: "A mouse is low to the ground, not tall.", heavy: "A mouse weighs very little, so it isn't heavy." },
  "a whale": { tiny: "A whale is giant, not tiny.", light: "A whale weighs a lot, so it isn't light.", fluffy: "A whale has smooth skin, not fluff." },
  "a parrot": { dull: "A parrot has bright feathers, so it isn't dull.", slimy: "A parrot has dry feathers, not slime.", cold: "A parrot has a warm body, so cold doesn't fit." },
  "a watermelon": { dry: "A watermelon is full of juice, so it isn't dry.", fuzzy: "A watermelon has smooth skin, not fuzz.", sharp: "A watermelon is round and smooth, not sharp." },
  "a feather": { heavy: "A feather weighs almost nothing, so it isn't heavy.", sharp: "A feather is soft, not sharp.", sticky: "A feather is soft and dry, not sticky." },
  "a pretzel": { sour: "A pretzel tastes salty, not sour.", juicy: "A pretzel is baked bread, so it isn't juicy." },
  "a bell": { silent: "A bell rings when you shake it, so silent doesn't fit.", furry: "A bell is made of metal, with no fur.", soft: "A bell is hard metal, not soft." },
  "ice cream": { hot: "Ice cream melts if it gets hot.", crunchy: "Ice cream is smooth and creamy, not crunchy.", spicy: "Ice cream tastes sweet, not spicy." },
  "the night sky": { sunny: "The sun isn't out at night, so the night sky isn't sunny.", sandy: "The sky has no sand in it." },
  "a cheetah": { slow: "A cheetah is the fastest land animal, not slow.", slimy: "A cheetah has dry fur, not slime.", tiny: "A cheetah is a big cat, not tiny." },
  "salt": { sweet: "Salt doesn't taste sweet like sugar.", fluffy: "Salt is made of tiny hard grains, not fluff.", loud: "Salt makes no sound, so it isn't loud." },
  "a skunk": { sweet: "A skunk's spray smells bad, not sweet.", slimy: "A skunk has fur, not slime.", tiny: "A skunk is about as big as a cat, not tiny." },
  "a mountain": { flat: "A mountain rises up high, so it isn't flat.", tiny: "A mountain is huge, not tiny.", short: "A mountain is very high, not short." },
  "candy": { salty: "Candy tastes sweet, not salty.", furry: "Candy has no fur.", loud: "Candy makes no sound by itself, so it isn't loud." },
  "a sponge": { hard: "You can squeeze a sponge, so it isn't hard.", sharp: "A sponge is soft, with no sharp edges.", spiky: "A sponge has no spikes." },
  "the ocean": { shallow: "The ocean goes very far down, so it isn't shallow.", dry: "The ocean is full of water, so it isn't dry.", fuzzy: "The ocean is water, and water isn't fuzzy." },
  "a snake": { furry: "A snake has scales, not fur.", fluffy: "A snake has smooth scales, not fluff.", feathery: "A snake has no feathers." },
  "an owl": { scaly: "An owl's body is covered in feathers, not scales.", slimy: "An owl has dry feathers, not slime.", prickly: "An owl has soft feathers, not prickles." },
  "a bear": { scaly: "A bear has fur, not scales.", slimy: "A bear has dry fur, not slime.", feathery: "A bear has fur, not feathers." },
  "a cactus": { soft: "A cactus is covered in sharp spines, so it isn't soft.", fluffy: "A cactus has spines, not fluff.", wet: "A cactus grows in dry places, so wet doesn't fit." },
  "a teddy bear": { sharp: "A teddy bear is cuddly, with nothing sharp.", spicy: "You don't eat a teddy bear, so spicy doesn't fit.", loud: "A teddy bear is usually quiet, not loud." },
  "a chili pepper": { sweet: "A chili pepper tastes hot, not sweet.", cold: "A chili pepper makes your mouth feel hot, not cold.", furry: "A chili pepper has smooth skin, not fur." },
  "honey": { crunchy: "Honey is a thick, runny liquid, not crunchy.", square: "Honey is runny, so it doesn't have a square shape.", noisy: "Honey makes no sound, so it isn't noisy." },
  "a giraffe": { short: "A giraffe is the tallest animal, not short.", tiny: "A giraffe is very big, not tiny.", flat: "A giraffe stands up very high, not flat." },
  "cake": { salty: "Cake tastes sweet, not salty.", sour: "Cake tastes sweet, not sour.", spicy: "Cake is usually sweet, not spicy." },
};
whyRule(8, "english", "adjectives", (q, picked) => {
  const p = xPlain(picked), lw = p.toLowerCase(), qt = xPlain(q.q);
  if (/^Which word is the\s*adjective\s*\?/.test(qt)) {
    if (EN8W_NAMES.includes(lw)) return `${xQ(p)} names a person, so it's a noun. It doesn't describe anything.`;
    if (EN8W_NOUNS.includes(lw)) return `${xQ(lw)} is a noun, a naming word. It doesn't describe anything.`;
    if (EN8W_VERBS.includes(lw)) return `${xQ(lw)} is a verb, an action word. It doesn't describe a noun.`;
    if (EN8W_OTHER[lw]) return EN8W_OTHER[lw];
    return null;
  }
  const m = qt.match(/^Which adjective best describes (.+)\?$/);
  if (m && EN8W_ADJT[m[1]]) return EN8W_ADJT[m[1]][lw] || null;
  return null;
});

/* ---------- compound ---------- */
whyRule(8, "english", "compound", (q, picked) => {
  const p = xPlain(picked).toLowerCase();
  if (/^j/.test(q.key || "")) {
    const m = String(q.q).match(/<b>(\w+)<\/b> \+ <b>(\w+)<\/b>/); if (!m) return null;
    const [, a, b] = m;
    if (p === b + a) return `${xQ(p)} puts the two words in the wrong order. ${cap(a)} comes first.`;
    if (p.startsWith(a) && p !== a + b) return `${xQ(p)} ends with ${xQ(p.slice(a.length))}, but the second word here is ${xQ(b)}.`;
    if (p.endsWith(b) && p !== a + b) return `${xQ(p)} starts with ${xQ(p.slice(0, p.length - b.length))}, but the first word here is ${xQ(a)}.`;
    return null;
  }
  if (/^p/.test(q.key || "") && NOT_COMP.includes(p)) return `${xQ(p)} is just one word. It isn't made by joining two words together.`;
  return null;
});

/* ---------- prefixes ---------- */
const EN8W_PM = { un: "not", dis: "not", re: "again", pre: "before" };
whyRule(8, "english", "prefixes", (q, picked) => {
  const k = q.key || "", p = xPlain(picked);
  if (/^m/.test(k)) {
    const e = PREF.find(([x, b]) => "m" + x + b === k); if (!e) return null;
    const [x, b] = e, w = x + b;
    if (p === `not ${b}`) return `${xQ(p)} would need un- or dis-, but ${xQ(w)} starts with ${x}-.`;
    if (p === `${b} again`) return `${xQ(p)} would need re-, but ${xQ(w)} starts with ${x}-.`;
    if (p === `${b} before`) return `${xQ(p)} would need pre-, but ${xQ(w)} starts with ${x}-.`;
    if (p === `very ${b}`) return `The prefix ${x}- doesn't mean “very”. It means “${EN8W_PM[x]}”.`;
    return null;
  }
  if (/^p/.test(k)) {
    const e = PREF.find(([x, b]) => "p" + x + b === k); if (!e) return null;
    const x = p.replace(/-$/, "");
    if (!EN8W_PM[x] || x === e[0]) return null;
    return `${x}- means “${EN8W_PM[x]}”. It doesn't mean “${EN8W_PM[e[0]]}”.`;
  }
  return null;
});

/* ---------- reading8 ---------- */
const EN8W_R8 = {
  "What is the puppy's name?": { "Max": "Max is the boy who owns the puppy, not the puppy.", "Brownie": "The story never uses the name Brownie.", "Duke": "The story never uses the name Duke." },
  "Where do Max and Biscuit walk?": { "to school": "The story never says they walk to school.", "to the beach": "The story never mentions a beach.", "to the store": "The story never mentions a store." },
  "What does Biscuit like to chase?": { "cats": "The story never mentions cats.", "cars": "The story never mentions cars.", "squirrels": "The story never mentions squirrels." },
  "What did Lena plant?": { "a tomato": "The story never mentions a tomato.", "a tree": "The story never mentions a tree.", "a rose": "The story never mentions a rose." },
  "Where did she put the pot?": { "in the closet": "The story never mentions a closet.", "under the bed": "The story never mentions a bed.", "in the garage": "The story never mentions a garage." },
  "What happened by summer?": { "The sunflower died.": "The sunflower didn't die. It kept growing.", "Lena moved away.": "The story never says Lena moved away.", "The pot broke.": "The story never says the pot broke." },
  "Why couldn't Omar play soccer?": { "He was sick.": "The story never says Omar was sick.", "It was night.": "The story never says it was night.", "His ball was lost.": "The story never says his ball was lost." },
  "How did Omar feel at first?": { "excited": "The story never says Omar felt excited.", "sleepy": "The story never says Omar felt sleepy.", "scared": "The story never says Omar felt scared." },
  "What did they build?": { "a snowman": "The story never mentions a snowman. It was raining, not snowing.", "a sandcastle": "The story never mentions a sandcastle.", "a robot": "The story never mentions a robot." },
  "What did Grace want to build?": { "a sandcastle": "The story never mentions a sandcastle.", "a birdhouse": "The story never mentions a birdhouse.", "a paper plane": "The story never mentions a paper plane." },
  "Where did she put the big blocks?": { "on the top": "The small blocks went on the top, not the big ones.", "on the bookshelf": "The tower only reached up to the bookshelf. No blocks went on it.", "in a box": "The story never mentions a box." },
  "What did she do when the tower wobbled?": { "knocked it down": "Grace never knocked the tower down. She kept building.", "cried for help": "The story never says Grace cried or asked for help.", "added more small blocks": "The story doesn't say she added blocks when it wobbled. She moved them." },
  "Where do monarch butterflies fly in the fall?": { "to Canada": "The story never mentions Canada.", "to the moon": "The story never mentions the moon.", "to the ocean": "The story never mentions the ocean." },
  "Where do they rest in winter?": { "in caves": "The story never mentions caves.", "under water": "The story never mentions water.", "in houses": "The story never mentions houses." },
  "When do they fly back north?": { "in fall": "In fall the butterflies fly south, not north.", "at night": "The story never mentions night.", "in winter": "In winter they rest on trees. They don't fly north yet." },
  "Who lays the eggs?": { "the worker bees": "Worker bees collect nectar. The story doesn't say they lay eggs.", "the flowers": "Flowers give nectar. They don't lay bee eggs.", "the beekeeper": "The story never mentions a beekeeper." },
  "What do worker bees make from nectar?": { "milk": "The story never mentions milk.", "juice": "The story never mentions juice.", "bread": "The story never mentions bread." },
  "How do bees help flowers?": { "They water them.": "The story never says bees water flowers.", "They pick them.": "The story never says bees pick flowers.", "They eat the leaves.": "The story never says bees eat leaves." },
};
const EN8W_R8B = {
  "Where did Leo find the map?": { "in the garden": "The map showed the garden, but Leo found the map in the attic." },
  "What was drawn next to the rose bush?": { "a star": "The story says an X was drawn there, not a star.", "a tree": "The oak tree was on the map, but an X was drawn by the rose bush." },
  "What can't penguins do?": { "swim": "The story says penguins are amazing swimmers, so they can swim.", "walk": "Penguins can walk. The story only says they can't fly.", "eat fish": "Penguins can eat fish. The story only says they can't fly." },
  "How do penguins use their wings?": { "to fly short trips": "The story says penguins cannot fly at all." },
  "Who showed them how to pick apples?": { "Nia's mom": "The story never mentions Nia's mom." },
  "How many red apples did Nia pick?": { "one": "Nia picked one green apple, not one red apple.", "two": "The story says six red apples, not two.", "ten": "The story says six red apples, not ten." },
  "What did the class make at school?": { "apple pie": "The story never mentions pie.", "apple juice": "The story never mentions juice.", "caramel apples": "The story never mentions caramel." },
  "Where does the mother lay her eggs?": { "under the water": "The mother crawls out onto the beach to lay her eggs, not under the water." },
  "What did Mateo and Grandpa build?": { "a treehouse": "The story never mentions a treehouse. They hung their birdhouse on a tree." },
  "How many arms does an octopus have?": { "six": "The story says eight arms, not six.", "four": "The story says eight arms, not four.", "ten": "The story says eight arms, not ten." },
  "What was growing tall?": { "the tomatoes": "The story says the tomatoes turned red, not that they grew tall." },
  "How did she play her song?": { "very slowly": "The story never says Ella played slowly.", "with many mistakes": "The story says she made no mistakes at all.", "only halfway": "The story says she played her song, not that she stopped halfway." },
  "What size is a hummingbird?": { "the biggest bird": "The story says it's one of the smallest birds, not the biggest.", "as big as a dog": "The story says it's one of the smallest birds, so it's much smaller than a dog." },
  "What sound do its wings make?": { "a quacking sound": "The story never mentions quacking. Ducks quack.", "a barking sound": "The story never mentions barking. Dogs bark.", "a hooting sound": "The story never mentions hooting. Owls hoot." },
  "How many lemons did they squeeze?": { "two": "The story says ten lemons, not two.", "five": "The story says ten lemons, not five.", "twenty": "The story says ten lemons, not twenty." },
  "How much was each cup?": { "one dollar": "The story says fifty cents, not one dollar.", "ten cents": "The story says fifty cents, not ten cents.", "five dollars": "The story says fifty cents, not five dollars." },
  "What is the tallest mountain on Earth?": { "Mount Fuji": "The story is about Mount Everest. It never mentions Mount Fuji.", "Mount Rainier": "The story is about Mount Everest. It never mentions Mount Rainier." },
  "When do they look at the moon?": { "every morning": "The story says they look every night, not every morning.", "only on weekends": "The story says they look every night, not only on weekends.", "once a year": "The story says they look every night, not once a year." },
  "What does a camel's hump store?": { "water": "The story says the hump stores fat, not water." },
  "How long can camels walk without drinking?": { "for one minute": "The story says camels can walk for days, much longer than one minute.", "for one hour": "The story says camels can walk for days, much longer than one hour.", "for ten years": "The story says for days, not ten years." },
  "What does the fat give the camel?": { "water": "The story says the fat gives energy, not water." },
  "Where did Socks hide on her first night?": { "under the bed": "The story says Socks hid under the couch, not the bed." },
  "Where was she sleeping by the next week?": { "under the couch": "Socks hid under the couch on her first night. By the next week, she slept somewhere else." },
  "When can a rainbow appear?": { "only when it snows": "The story says rainbows come when it rains, not when it snows.", "only on cloudy nights": "The story says the sun has to shine, so not at night." },
  "What color is on the outside of a rainbow?": { "violet": "The story says violet is on the inside, not the outside." },
  "Where does maple syrup come from?": { "apple trees": "The story says maple trees, not apple trees." },
  "What does the sap look like at first?": { "thick and brown": "At first the sap is clear and watery. It only gets thick after boiling." },
  "Who were partners?": { "Aiden and Max": "Aiden's partner was Sofia. The story never mentions Max.", "Sofia and Mia": "Sofia's partner was Aiden. The story never mentions Mia." },
  "What did they want to find out?": { "which ball was heaviest": "They tested how high the balls bounced, not how heavy they were.", "which ball was bluest": "They tested how high the balls bounced, not their colors.", "which ball could float": "They tested how high the balls bounced, not if they could float." },
  "How did they drop the balls?": { "from different heights": "The story says they used the same height, not different ones." },
  "What keeps them warm?": { "warm sunshine": "The story never mentions sunshine." },
  "How do they use their tails?": { "like a ladder": "The story says they use their tails like a blanket, not a ladder.", "like a broom": "The story says they use their tails like a blanket, not a broom.", "like a spoon": "The story says they use their tails like a blanket, not a spoon." },
};
const EN8W_VB = "eat make turn freeze paint mix keep dig look stay find go catch walk swim skate fly throw give sleep".split(" ");
const EN8W_MASS = "school home grass sand juice water milk fur sand soccer tag snow hide-and-seek spring summer winter fall midnight water red green yellow blue".split(" ");
const EN8W_PREP = /^(?:out of|to|in|on|at|under|into|onto|over|from|with|by|behind|near|inside)\s+/i;
whyRule(8, "english", "reading8", (q, picked) => {
  const qt = xPlain(q.q), p = xPlain(picked), e = EN8W_R8[qt], e2 = EN8W_R8B[qt];
  if (e2 && e2[p]) return e2[p];
  if (e && e[p]) return e[p];
  if (e && Object.keys(e).length) return null;
  const pass = xPlain(q.vis), P = EN8W_toks(pass);
  if (!P.length || !p) return null;
  const cw = EN8W_toks(p).filter(w => !EN8W_STOP.has(w) && w.length > 2 && !EN8W_NUMW.includes(w));
  if (!cw.length || EN8W_toks(p).some(w => EN8W_NUMW.includes(w))) return null;
  if (/^[A-Z].*[.!]$/.test(p)) {
    if (cw.some(w => !EN8W_hit(w, P))) return `The story never says that ${EN8W_lc(p.replace(/[.!]$/, ""), pass)}.`;
    return null;
  }
  if (!cw.some(w => EN8W_hit(w, P)) && !/^(only|every|once|for|very|like|as|so|without|which)\b/i.test(p)) {
    const x = p.replace(EN8W_PREP, "");
    const xw = x.split(" "), pl = w => /^[a-z]+s$/.test(w) && !/ss$/.test(w);
    if (/\bit\b/.test(x) || EN8W_VB.includes(xw[0])) return "The story doesn't say that.";
    if (/^[a-z]+ and [a-z]+$/.test(x)) return `The story never says it was ${x}.`;
    return /^(a|an|the|his|her|its|their|my|our)\s/i.test(x) || /^[A-Z]/.test(x) || pl(xw[0]) || pl(xw[xw.length - 1]) || EN8W_MASS.includes(xw[xw.length - 1]) ? `The story never mentions ${x}.` : "The story doesn't say that.";
  }
  return null;
});
const EN8W_NUMW = "one two three four five six seven eight nine ten eleven twelve twenty fifty hundred".split(" ");

/* ---------- abc ---------- */
whyRule(8, "english", "abc", (q, picked) => {
  const p = xPlain(picked).toLowerCase(), a = xPlain(q.ans).toLowerCase(), first = /\bfirst\b/.test(xPlain(q.q));
  if (!/^[a-z]+$/.test(p) || !/^[a-z]+$/.test(a) || p === a) return null;
  let i = 0; while (i < p.length && i < a.length && p[i] === a[i]) i++;
  if (i >= p.length || i >= a.length) return null;
  const pc = p[i], ac = a[i], after = pc > ac;
  if (first !== after) return null; // sanity: the pick must really be on the wrong side
  const rel = after ? "after" : "before";
  if (i === 0) return `${xQ(p)} starts with ${pc}, and ${pc} comes ${rel} ${ac} in the alphabet.`;
  const nth = ["first", "second", "third", "fourth", "fifth"][i] || `number ${i + 1}`;
  return `${xQ(p)} and ${xQ(a)} match at the start, but look at the ${nth} letter: ${pc} comes ${rel} ${ac}.`;
});

/* ---------- pronouns ---------- */
const EN8W_PCAT = { he: ["boy", 1], him: ["boy", 0], she: ["girl", 1], her: ["girl", 0], it: ["thing", 2], we: ["me", 1], us: ["me", 0], they: ["group", 1], them: ["group", 0] };
const EN8W_PDESC = { boy: "one boy or man", girl: "one girl or woman", thing: "one thing or animal" };
whyRule(8, "english", "pronouns", (q, picked) => {
  const s = String(q.key || ""), um = s.match(/<u>(.*?)<\/u>/); if (!um) return null;
  const N = xPlain(um[1]), X = xPlain(picked), A = xPlain(q.ans), px = EN8W_PCAT[X.toLowerCase()], pa = EN8W_PCAT[A.toLowerCase()];
  if (!px || !pa || X === A) return null;
  const [cx, kx] = px, [ca] = pa, subj = s.startsWith("<u>"), qx = xQ(X), qn = xQ(N);
  if (cx === ca) {
    if (kx === 1 && !subj) return `${qx} is for the one doing the action, like “${X.toLowerCase()} ran”. The underlined words aren't doing the action here.`;
    if (kx === 0 && subj) return `${qx} doesn't go before the action. It comes after, like “saw ${X.toLowerCase()}”.`;
    return null;
  }
  if (cx === "me") return `${qx} includes me, but ${qn} doesn't.`;
  if (ca === "me") return cx === "group" ? `${qx} leaves me out, but ${qn} includes me.` : `${qx} is for just one, but ${qn} is more than one person.`;
  if (cx === "group") return `${qx} is for more than one, but ${qn} is just one.`;
  if (ca === "group") return `${qx} is for just one, but ${qn} means more than one.`;
  const nl = N.toLowerCase().replace(/^(the|my|our|your)\s+/, "");
  const nd = ca === "thing" ? "is a thing or animal"
    : /^(mrs|ms|miss|mom|grandma|aunt|queen|mother|lady|woman)\b/.test(nl) ? "is a woman"
    : /^(mr|dad|grandpa|uncle|king|father|man)\b/.test(nl) ? "is a man"
    : nl === "girl" ? "is a girl" : nl === "boy" ? "is a boy"
    : /^[A-Z][a-z]+$/.test(N) ? (ca === "boy" ? "is a boy's name" : "is a girl's name")
    : ca === "boy" ? "is a boy or man" : "is a girl or woman";
  return `${qx} is for ${EN8W_PDESC[cx]}, but ${qn} ${nd}.`;
});

/* ---------- capitals ---------- */
const EN8W_PROPER = () => new Set(CAPS.map(c => c[1]).concat("january february march april may june july august september october november december monday tuesday wednesday thursday friday saturday sunday i".split(" ")));
whyRule(8, "english", "capitals", (q, picked) => {
  const e = CAPS.find(c => c[0] === q.key); if (!e) return null;
  const p = xPlain(picked);
  if (p === e[1] || !e[0].replace(/[.,!?]/g, "").split(" ").includes(p)) return null;
  if (EN8W_PROPER().has(p)) return null; // e.g. "march" in a sentence whose answer is "florida"
  return `${xQ(p)} is an everyday word, not a name, place, day or month, so it starts small.`;
});

/* ---------- factopinion ---------- */
const EN8W_OPCLUE = { "Dogs are the best pets.": "best", "Pizza is the yummiest food.": "yummiest", "Summer is the most fun season.": "most fun", "Math is easy.": "easy", "Blue is the prettiest color.": "prettiest", "Cats are cuter than rabbits.": "cuter", "Rainy days are boring.": "boring", "Soccer is the best sport.": "best", "Broccoli tastes gross.": "gross", "Our school has the nicest playground.": "nicest", "Reading is more fun than TV.": "more fun", "Spiders are scary.": "scary",
  "Winter is the best season.": "best", "Cupcakes are better than cookies.": "better", "Homework is boring.": "boring", "Purple is the nicest color.": "nicest", "Puppies are the cutest animals.": "cutest", "Swimming is more fun than biking.": "more fun", "Carrots taste better than peas.": "better", "Drawing is the most fun hobby.": "most fun", "Snakes are creepy.": "creepy", "Spring is prettier than fall.": "prettier", "Chocolate is the yummiest flavor.": "yummiest", "Board games are more fun than puzzles.": "more fun", "Mondays are the worst day of the week.": "worst", "Strawberries are the best fruit.": "best", "Hats look silly.": "silly", "Kittens are funnier than puppies.": "funnier", "Rainy days are cozy.": "cozy", "Science is the most interesting subject.": "most interesting" };
const EN8W_FCHECK = { "Dogs have four legs.": "you can count a dog's legs to check it", "The sun is a star.": "scientists have proven it, and you can look it up", "Water freezes when it gets very cold.": "you can test it by putting water in a freezer", "There are seven days in a week.": "you can count the days on a calendar", "Fish live in water.": "you can see fish living in water and check it in a book", "Bees make honey.": "beekeepers collect honey from bees, so it can be checked", "A triangle has three sides.": "you can count a triangle's sides", "Plants need sunlight to grow.": "you can test it by keeping a plant in the dark", "Snow is cold.": "you can touch snow to check it", "Spiders have eight legs.": "you can count a spider's legs", "The moon goes around the Earth.": "scientists have measured it, and you can look it up", "Cows give milk.": "farmers milk cows every day, so it can be checked",
  "A year has twelve months.": "you can count the months on a calendar", "Ice is frozen water.": "you can watch ice melt back into water", "Birds have feathers.": "you can look at birds and see their feathers", "A square has four sides.": "you can count a square's sides", "The Earth goes around the sun.": "scientists have measured it, and you can look it up", "An octopus has eight arms.": "you can count an octopus's arms in a picture", "There are sixty minutes in an hour.": "you can count the minutes on a clock", "A baby cat is called a kitten.": "you can look it up in a dictionary", "Penguins are birds.": "you can look it up in an animal book", "Whales live in the ocean.": "you can check it in an animal book", "Ten is more than five.": "you can count to check it", "Bats can fly.": "you can watch bats fly or check a book", "Fire is hot.": "a thermometer can show it", "Thanksgiving is in November.": "you can check it on a calendar", "Apples grow on trees.": "you can see apples growing on trees", "Ducks can swim.": "you can watch ducks swim in a pond", "People need water to live.": "doctors and science books can prove it", "The Pacific is the biggest ocean on Earth.": "you can check it on a map or in a book" };
whyRule(8, "english", "factopinion", (q, picked) => {
  const p = xPlain(picked), qt = xPlain(q.q);
  if (/^Is this a fact or an opinion\?/.test(qt)) {
    const s = xPlain(q.vis);
    if (/^Fact/.test(p) && EN8W_OPCLUE[s]) return `${xQ(cap(EN8W_OPCLUE[s]))} shows what someone thinks, and other people could disagree.`;
    if (/^Opinion/.test(p) && EN8W_FCHECK[s]) return `This can be proven: ${EN8W_FCHECK[s]}.`;
    return null;
  }
  if (/\ba fact\s*\?$/.test(qt) && EN8W_OPCLUE[p]) return `${xQ(cap(EN8W_OPCLUE[p]))} shows what someone thinks, so that one is an opinion.`;
  if (/\ban opinion\s*\?$/.test(qt) && EN8W_FCHECK[p]) return `That one is a fact: ${EN8W_FCHECK[p]}.`;
  return null;
});

/* ---------- possessive ---------- */
whyRule(8, "english", "possessive", (q, picked) => {
  const k = q.key || "", p = xPlain(picked);
  if (/^a/.test(k)) {
    const e = POSS.find(x => "a" + x[0] === k); if (!e) return null;
    const [, n, a] = e, thing = a.split(" ").pop(), pre = a.slice(0, a.indexOf(n)), who = n === cap(n) ? n : "the " + n;
    if (p === `${pre}${n}s ${thing}`) return `${xQ(n + "s")} has no apostrophe, so it doesn't show that the ${thing} belongs to ${who}.`;
    if (p === `${pre}${n}s' ${thing}`) return `An apostrophe after the s is for more than one owner, but only one ${n === cap(n) ? "person" : n} owns this ${thing}.`;
    if (p === `${pre}${n} ${thing}s`) return `${xQ(p)} has no apostrophe s, so it doesn't show who owns the ${thing}.`;
    return null;
  }
  if (/^b/.test(k)) {
    if (/'s$/.test(p)) return `${xQ(p)} has an apostrophe, so it shows something belongs to one ${p.slice(0, -2)}. It doesn't mean more than one.`;
    const bw = (xPlain(q.q).match(/belongs to (.+?)\s*\?$/) || [])[1];
    if (/s$/.test(p)) return `${xQ(p)} has no apostrophe, so it doesn't show that something belongs to ${bw || "anyone"}.`;
  }
  return null;
});

/* ---------- storyparts ---------- */
const EN8W_STOP = new Set("a an the her his my their our its he she it they we i you was were is are to of and in on at for with from by up out too not no could couldn't wouldn't did didn't had has have be been very all one so off into over just".split(" "));
const EN8W_SETGEN = new Set("day days morning afternoon evening night today long ago time summer winter spring fall saturday tuesday big small busy".split(" "));
const EN8W_toks = s => String(s).toLowerCase().replace(/[^a-z'\s-]/g, " ").replace(/'s\b/g, "").split(/[\s-]+/).filter(Boolean);
const EN8W_hit = (w, P) => P.some(t => t === w || (w.length >= 4 && t.startsWith(w.slice(0, Math.max(4, w.length - 2)))) || (t.length >= 4 && w.startsWith(t.slice(0, Math.max(4, t.length - 2)))));
const EN8W_lc = (s, pass) => { const w = (s.match(/^[A-Za-z]+/) || [""])[0]; return w && !new RegExp(`\\b${w}\\b`).test(pass) || /^(He|She|It|They|We|His|Her|The|A|An|Everyone|Nobody|Their)$/.test(w) ? s.charAt(0).toLowerCase() + s.slice(1) : s; };
whyRule(8, "english", "storyparts", (q, picked) => {
  const P = EN8W_toks(xPlain(q.vis)), p = xPlain(picked), a = xPlain(q.ans), qt = xPlain(q.q);
  if (!P.length || !p) return null;
  const cw = EN8W_toks(p).filter(w => !EN8W_STOP.has(w) && w.length > 1);
  if (!cw.length) return null;
  if (/main character/.test(qt)) {
    if (!cw.some(w => EN8W_hit(w, P))) return `The story never mentions ${p}.`;
    return `The story is mostly about ${a}, not ${p}.`;
  }
  if (/setting/.test(qt)) {
    const key = cw.filter(w => !EN8W_SETGEN.has(w));
    if (key.length && !key.some(w => EN8W_hit(w, P))) return /^(under|in|on|at|inside|deep|high|near|by)\b/i.test(p) ? `The story never says it happens ${p}.` : `The story never mentions ${p}.`;
    return `The setting is ${a}, not ${p}.`;
  }
  if (/problem/.test(qt)) {
    const miss = cw.filter(w => w.length > 2 && !EN8W_hit(w, P));
    if (miss.length) return `The story never says that ${EN8W_lc(p.replace(/[.!]$/, ""), xPlain(q.vis))}.`;
    return null;
  }
  return null;
});

/* ---------- comparing (-er / -est) ---------- */
const EN8W_LONGW = b => /y$/.test(b) && b !== "dry" || b === "quiet";
whyRule(8, "english", "comparing", (q, picked) => {
  const p = xPlain(picked), a = xPlain(q.ans), t = xPlain(q.q);
  const e = CMPADJ.find(c => c[1] === a || c[2] === a); if (!e) return null;
  const [b, er, est] = e, two = /\bthan\b/.test(t), all = /of them all/.test(t);
  if (two === all) return null;
  const need = two ? er : est, end = two ? "-er" : "-est", grp = two ? "To compare two" : "To compare three or more";
  if (p === b) return `${xQ(b)} alone doesn't compare anything. ${grp}, use ${need}.`;
  if (p === "gooder") return "We don't say “gooder”. Good changes to better and best.";
  if (p === `more ${b}` || p === `most ${b}`) {
    if (b === "good") return `We don't say ${xQ(p)}. Good changes to better and best.`;
    if (EN8W_LONGW(b)) return `For ${b}, we usually change the ending instead of using “${p.split(" ")[0]}”: ${need}.`;
    return `We don't say ${xQ(p)}. For a short word like ${b}, add ${end}: ${need}.`;
  }
  if (two && p === est) return `${xQ(est)} is for three or more, but “than” compares just two.`;
  if (all && p === er) return `${xQ(er)} compares just two, but “of them all” means three or more.`;
  return null;
});

