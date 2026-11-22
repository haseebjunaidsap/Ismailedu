/* =====================================================================
   v25 · Age 9 · English (tag V25EN9_)
   New formats and fresh data for every age-9 English topic.
   Every new question carries q.v25.r = { wrong option: reason it's wrong }.
   ===================================================================== */
const V25EN9_mk = o => {
  const r = {}; o.w.forEach(([t, why]) => { r[t] = why; });
  const q = { q: o.q, opts: shuffle([o.a, ...o.w.map(x => x[0])]), ans: o.a, why: o.why, key: "v25en9" + o.k, v25: { r } };
  if (o.say) q.say = o.say; if (o.vis) q.vis = o.vis; if (o.big) q.big = 1; if (o.extra) q.extra = o.extra;
  return q;
};
const V25EN9_rule = (q, p) => {
  if (!q || !q.v25 || !q.v25.r) return null;
  const r = q.v25.r; if (r[p] != null) return r[p];
  const x = xPlain(p); return r[x] != null ? r[x] : null;
};
["homophones", "suffixes", "figurative", "adverbs", "contractions", "reading9", "context", "idioms", "prepositions", "causeeffect", "partsofspeech", "roots", "linking", "pov", "fragments"]
  .forEach(id => whyRule(9, "english", id, V25EN9_rule));
const V25EN9_bl = s => s.replace("___", '<span class="blank">___</span>');
const V25EN9_sb = s => s.replace("___", "blank");
const V25EN9_nd = s => String(s).replace(/[.!?]$/, "");

/* ---------- Homophones: [word A, meaning A, sentence for A, word B, meaning B, sentence for B] ---------- */
const V25EN9_HP = [
  ["steal", "take something without asking", "A raccoon tried to ___ the apples from our picnic basket.", "steel", "a strong metal", "The bridge is held up by thick ___ beams."],
  ["some", "a few, or a little", "Can I have ___ grapes with my lunch?", "sum", "the answer to an addition problem", "The ___ of four and five is nine."],
  ["seem", "look like or appear to be", "You ___ tired after that long soccer game.", "seam", "the line where cloth is sewn together", "The ___ on my jacket sleeve came apart."],
  ["doe", "a female deer", "A ___ and her fawn drank from the stream.", "dough", "a soft mix used to make bread or cookies", "We rolled out the cookie ___ on the counter."],
  ["fir", "a kind of evergreen tree", "A tall ___ tree stood beside the cabin.", "fur", "the soft hair on an animal", "The kitten has soft gray ___ on its belly."],
  ["flea", "a tiny jumping bug", "The vet found a ___ hiding in our dog's coat.", "flee", "run away from danger", "Deer ___ quickly when they hear a loud noise."],
  ["guessed", "the past of guess", "Nobody ___ the answer to my riddle.", "guest", "a visitor", "Our ___ slept in the spare room last weekend."],
  ["herd", "a big group of animals", "A ___ of cows grazed in the green field.", "heard", "the past of hear", "I ___ the birds singing outside my window."],
  ["knead", "press and fold dough with your hands", "Dad showed me how to ___ the bread dough.", "need", "must have", "Plants ___ water and sunlight to grow."],
  ["mane", "the long hair on a horse's or lion's neck", "The lion shook its shaggy ___ in the wind.", "main", "most important", "The ___ idea of the story is friendship."],
  ["miner", "a person who digs for coal or gold", "The ___ wore a helmet with a bright light.", "minor", "small or not very important", "It was only a ___ mistake, so it was easy to fix."],
  ["whale", "a huge sea animal", "A ___ splashed its giant tail in the ocean.", "wail", "a long, loud cry", "The tired baby let out a loud ___ at bedtime."],
  ["chilly", "a little cold", "Bring a sweater because it is ___ outside.", "chili", "a spicy dish often made with beans", "Mom made a big pot of ___ with beans and corn."],
  ["wring", "twist something to squeeze out water", "Please ___ out your wet swimsuit before you hang it up.", "ring", "the sound a bell or phone makes", "Did you hear the phone ___ in the kitchen?"],
  ["tea", "a hot drink made from leaves", "Grandma sipped her ___ with a spoonful of honey.", "tee", "a small peg that holds a golf ball", "Coach set the golf ball on a wooden ___."],
  ["toad", "an animal like a frog with bumpy skin", "A bumpy brown ___ hopped across the garden path.", "towed", "pulled along behind something", "A truck ___ the broken car to the repair shop."],
  ["beet", "a dark red root vegetable", "The sliced ___ turned my salad bright red.", "beat", "a steady rhythm in music", "Tap your foot to the ___ of the drum."],
  ["cheap", "costing very little money", "The yo-yo was ___, only one dollar.", "cheep", "the tiny sound a baby bird makes", "We heard the baby birds ___ in their nest."],
  ["pole", "a long, thin stick", "The flag waved at the top of the ___.", "poll", "a survey that asks people questions", "Our class took a ___ to find everyone's favorite fruit."],
  ["hall", "a long passage inside a building", "Walk quietly down the ___ to the library.", "haul", "pull or carry something heavy", "We had to ___ the heavy boxes up the stairs."],
  ["prince", "the son of a king or queen", "The ___ rode his horse to the castle gate.", "prints", "marks left by pressing", "The puppy left muddy paw ___ on the floor."],
  ["wrap", "cover something with paper or cloth", "Let's ___ the present in shiny paper.", "rap", "a quick, sharp knock", "We heard a ___ on the front door."],
  ["rows", "lines of things side by side", "The farmer planted corn in long, straight ___.", "rose", "a flower with thorns", "She smelled the red ___ in the garden."],
  ["peek", "take a quick look", "Don't ___ at your birthday present before the party!", "peak", "the pointed top of a mountain", "Snow covered the mountain's highest ___."],
  ["boulder", "a very large rock", "A huge ___ blocked the hiking trail.", "bolder", "braver", "The shy kitten grew ___ and began to explore."],
  ["pane", "a sheet of glass in a window", "A baseball cracked the window ___.", "pain", "a feeling of hurting", "The ice pack eased the ___ in my sore ankle."],
  ["sight", "something you see", "The sunset over the lake was a beautiful ___.", "site", "a place where something is built", "Workers in hard hats met at the building ___."],
  ["shoo", "a word that tells an animal to go away", "Farmer Ruiz waved her arms to ___ the crows away from the corn.", "shoe", "something you wear on your foot", "I lost my left ___ at the beach."],
  ["steak", "a thick slice of meat", "Dad grilled ___ and corn for dinner.", "stake", "a pointed stick pushed into the ground", "We tied the tomato plant to a wooden ___."],
  ["coarse", "rough to touch", "The ___ sand scratched my bare feet.", "course", "the path for a race", "The runners followed the ___ around the lake."],
  ["feet", "more than one foot", "My ___ were cold after the snowball fight.", "feat", "an amazing deed", "Climbing the tallest mountain was a great ___."],
  ["medal", "a prize like a metal disk on a ribbon", "She won a gold ___ in the swim race.", "meddle", "get into other people's business", "Please don't ___ in your sister's private things."],
  ["raise", "lift up", "Please ___ your hand if you have a question.", "rays", "beams of light", "The sun's warm ___ heated the sand."],
  ["cellar", "a room under a house", "Grandpa keeps jars of jam in the ___.", "seller", "a person who sells things", "The flower ___ gave us a free daisy."],
  ["tents", "cloth shelters for camping", "We set up our ___ by the lake.", "tense", "tight and nervous", "My shoulders felt ___ before the big test."],
  ["higher", "more high", "The kite flew ___ than the treetops.", "hire", "pay someone to do a job", "We will ___ a painter to paint the house."],
  ["knew", "the past of know", "I ___ the answer right away.", "new", "not old", "Lena got ___ sneakers for the first day of school."],
];
addBank(9, "english", "homophones", 0.3, function () {
  const i = R(0, V25EN9_HP.length - 1), row = V25EN9_HP[i], flip = Math.random() < 0.5, k = Math.random();
  const [w, m, s, o, om, os] = flip ? row.slice(3).concat(row.slice(0, 3)) : row;
  const fill = (t, x) => t.replace("___", x);
  if (k < 0.34) return V25EN9_mk({ q: `Which word means <b>${m}</b>?`, say: `Which word means ${m}?`, a: w, w: [[o, `“${o}” sounds the same, but it means ${om}.`]], why: `“${w}” means ${m}.`, k: "hm" + w, big: 1 });
  if (k < 0.67) return V25EN9_mk({ q: `Which sentence uses <b>${w}</b> correctly?`, say: `Which sentence uses ${w} correctly?`, a: fill(s, w), w: [[fill(os, w), `That sentence needs “${o}”, which means ${om}.`]], why: `“${w}” means ${m}, so it fits here.`, k: "hu" + w });
  const bad = fill(s, o), others = shuffle([...new Set(s.replace("___", " ").match(/[A-Za-z]+/g).filter(x => x.length >= 4 && x.toLowerCase() !== o.toLowerCase() && x.toLowerCase() !== w.toLowerCase()))]).slice(0, 2);
  return V25EN9_mk({ q: `One word in this sentence is the wrong sound-alike. Which one?<div class="sentence">${bad}</div>`, say: `${bad} One word in this sentence is the wrong sound-alike. Which one?`, a: o, w: others.map(x => [x, `“${x}” is the right word in this sentence.`]), why: `It should be “${w}”, which means ${m}. “${o}” means ${om}.`, k: "hf" + w, big: 1 });
});

/* ---------- Suffixes ---------- */
/* spelling: [base, suffix, result, rule, [[wrong, reason code or text]]] */
const V25EN9_SR = {
  Y: (b, s, a) => `Change the y to i before adding -${s}: ${a}.`,
  DBL: (b, s, a) => `${cap(b)} has one short vowel, so double the last letter: ${a}.`,
  NODBL: (b, s, a) => `Only double the last letter when the suffix starts with a vowel: ${a}.`,
  DROPE: (b, s, a) => `Drop the silent e before a suffix that starts with a vowel: ${a}.`,
  KEEPE: (b, s, a) => `Keep the e when the suffix starts with a consonant: ${a}.`,
  KEEPY: (b, s, a) => `Keep the y when a vowel comes right before it: ${a}.`,
  LE: (b, s, a) => `For words ending in -le, just change the e to y: ${a}.`,
  DROPY: (b, s, a) => `Don't drop the y; change it to i and keep it: ${a}.`,
  L: (b, s, a) => `The suffix -ful has only one l, so it's ${a}.`,
  SS: (b, s, a) => `The suffix -${s} ends with two s's: ${a}.`,
  ER: (b, s, a) => `The suffix that means “a person who” is spelled -er: ${a}.`,
  MENT: (b, s, a) => `The suffix is spelled -ment, with an e: ${a}.`,
  ABLE: (b, s, a) => `The suffix is spelled -able, ending in -le: ${a}.`,
  LY: (b, s, a) => `The suffix is spelled -ly, with no e: ${a}.`,
  NN: (b, s, a) => `Keep both n's: one from ${b} and one from -ness.`,
};
const V25EN9_SWHY = { Y: "Change y to i, then add the suffix.", DBL: "Double the last letter, then add the suffix.", NONE: "Just add the suffix; the base word doesn't change.", DROPE: "Drop the silent e, then add the suffix.", KEEPE: "Keep the e, because the suffix starts with a consonant.", KEEPY: "Keep the y, because a vowel comes before it.", LE: "Change the -le ending to -ly.", TRUE: "True drops its e: truly." };
const V25EN9_SP = [
  ["lazy", "ness", "laziness", "Y", [["lazyness", "Y"], ["lazines", "SS"]]],
  ["beauty", "ful", "beautiful", "Y", [["beautyful", "Y"], ["beautifull", "L"]]],
  ["plenty", "ful", "plentiful", "Y", [["plentyful", "Y"], ["plentifull", "L"]]],
  ["easy", "ly", "easily", "Y", [["easyly", "Y"], ["easly", "DROPY"]]],
  ["angry", "ly", "angrily", "Y", [["angryly", "Y"], ["angrly", "DROPY"]]],
  ["penny", "less", "penniless", "Y", [["pennyless", "Y"], ["penniles", "SS"]]],
  ["merry", "ment", "merriment", "Y", [["merryment", "Y"], ["merrimant", "MENT"]]],
  ["hungry", "ly", "hungrily", "Y", [["hungryly", "Y"], ["hungrly", "DROPY"]]],
  ["silly", "ness", "silliness", "Y", [["sillyness", "Y"], ["sillines", "SS"]]],
  ["pity", "ful", "pitiful", "Y", [["pityful", "Y"], ["pitifull", "L"]]],
  ["rely", "able", "reliable", "Y", [["relyable", "Y"], ["reliabel", "ABLE"]]],
  ["busy", "ly", "busily", "Y", [["busyly", "Y"], ["busly", "DROPY"]]],
  ["heavy", "ness", "heaviness", "Y", [["heavyness", "Y"], ["heavines", "SS"]]],
  ["run", "er", "runner", "DBL", [["runer", "DBL"], ["runnor", "ER"]]],
  ["swim", "er", "swimmer", "DBL", [["swimer", "DBL"], ["swimmor", "ER"]]],
  ["shop", "er", "shopper", "DBL", [["shoper", "DBL"], ["shoppor", "ER"]]],
  ["drum", "er", "drummer", "DBL", [["drumer", "DBL"], ["drummor", "ER"]]],
  ["win", "er", "winner", "DBL", [["winer", "DBL"], ["winnor", "ER"]]],
  ["sad", "ness", "sadness", "NONE", [["saddness", "NODBL"], ["sadnes", "SS"]]],
  ["glad", "ly", "gladly", "NONE", [["gladdly", "NODBL"], ["gladley", "LY"]]],
  ["fit", "ness", "fitness", "NONE", [["fittness", "NODBL"], ["fitnes", "SS"]]],
  ["thin", "ness", "thinness", "NONE", [["thiness", "NN"], ["thinnes", "SS"]]],
  ["value", "able", "valuable", "DROPE", [["valueable", "DROPE"], ["valuabel", "ABLE"]]],
  ["bake", "er", "baker", "DROPE", [["bakeer", "DROPE"], ["bakor", "ER"]]],
  ["dance", "er", "dancer", "DROPE", [["danceer", "DROPE"], ["dancor", "ER"]]],
  ["hope", "ful", "hopeful", "KEEPE", [["hopful", "KEEPE"], ["hopefull", "L"]]],
  ["use", "less", "useless", "KEEPE", [["usless", "KEEPE"], ["useles", "SS"]]],
  ["safe", "ly", "safely", "KEEPE", [["safly", "KEEPE"], ["safeley", "LY"]]],
  ["amaze", "ment", "amazement", "KEEPE", [["amazment", "KEEPE"], ["amazemant", "MENT"]]],
  ["excite", "ment", "excitement", "KEEPE", [["excitment", "KEEPE"], ["excitemant", "MENT"]]],
  ["gentle", "ly", "gently", "LE", [["gentlely", "LE"], ["gentley", "LE"]]],
  ["simple", "ly", "simply", "LE", [["simplely", "LE"], ["simpley", "LE"]]],
  ["enjoy", "ment", "enjoyment", "KEEPY", [["enjoiment", "KEEPY"], ["enjoymant", "MENT"]]],
  ["play", "ful", "playful", "KEEPY", [["plaiful", "KEEPY"], ["playfull", "L"]]],
  ["true", "ly", "truly", "TRUE", [["truely", "True is a rule breaker: it drops its e to make truly."], ["trully", "Don't double the l; truly has just one l."]]],
];
/* meaning in a sentence: [sentence, answer, [wrong words]] (meanings in V25EN9_SM) */
const V25EN9_SM = { helpful: "ready to help", helpless: "not able to help yourself", helper: "a person who helps", careful: "full of care", careless: "without care", fearless: "without fear", fearful: "full of fear", hopeful: "full of hope", hopeless: "without hope", useful: "able to help or be used", useless: "without a use", user: "a person who uses something", colorful: "full of color", colorless: "without color", harmful: "able to cause harm", harmless: "without harm", restful: "calm and full of rest", restless: "unable to rest or stay still", thankful: "full of thanks", thankless: "without thanks", powerful: "full of power", powerless: "without power", kindness: "being kind", kindly: "in a kind way", sadly: "in a sad way", sadness: "the feeling of being sad", mover: "a person who moves things", movable: "able to be moved", movement: "the act of moving", washable: "able to be washed", washer: "a machine that washes", breakable: "able to be broken", unbreakable: "not able to be broken", painful: "full of pain", painless: "without pain", loudly: "in a loud way", loudness: "how loud something is" };
const V25EN9_SS = [
  ["Jada was ___ and carried the heavy bags for her neighbor.", "helpful", ["helpless", "helper"]],
  ["The tiny baby bird was ___ without its mother.", "helpless", ["helpful", "helper"]],
  ["Each week, a different student gets to be the teacher's ___.", "helper", ["helpful", "helpless"]],
  ["Be ___ when you carry the hot soup.", "careful", ["careless"]],
  ["Leo made a ___ mistake and spilled paint all over the floor.", "careless", ["careful"]],
  ["The ___ puppy hid under the bed during the thunderstorm.", "fearful", ["fearless"]],
  ["The ___ diver jumped from the highest board without a pause.", "fearless", ["fearful"]],
  ["We were ___ that the rain would stop before the picnic.", "hopeful", ["hopeless"]],
  ["A flashlight is ___ when the power goes out.", "useful", ["useless", "user"]],
  ["A bucket with a big hole is ___ for carrying water.", "useless", ["useful", "user"]],
  ["The parade was ___ with red, yellow, and blue floats.", "colorful", ["colorless"]],
  ["Clean water is ___, so you can see right through it.", "colorless", ["colorful"]],
  ["Too much sun can be ___ to your skin.", "harmful", ["harmless"]],
  ["The ___ puppy paced back and forth all night.", "restless", ["restful"]],
  ["We were ___ for the warm soup on such a cold day.", "thankful", ["thankless"]],
  ["The ___ engine pulled the long train up the steep hill.", "powerful", ["powerless"]],
  ["Thank you for your ___ when I fell off my bike.", "kindness", ["kindly"]],
  ["The nurse spoke ___ to the scared little boy.", "kindly", ["kindness"]],
  ["The dog looked ___ at its empty food bowl.", "sadly", ["sadness"]],
  ["Her ___ faded when her best friend called.", "sadness", ["sadly"]],
  ["The ___ carried our heavy couch onto the truck.", "mover", ["movable", "movement"]],
  ["Our desks are ___, so we can push them into a circle.", "movable", ["mover", "movement"]],
  ["These markers are ___, so the ink comes out of clothes.", "washable", ["washer"]],
  ["Wrap the ___ glasses in soft paper before the move.", "breakable", ["unbreakable"]],
  ["Stepping on a sharp tack is very ___.", "painful", ["painless"]],
  ["The band played so ___ that the windows shook.", "loudly", ["loudness"]],
];
/* base word: [word, base, base + first suffix, last suffix] */
const V25EN9_SB = [["carefully", "care", "careful", "ly"], ["hopelessly", "hope", "hopeless", "ly"], ["thankfulness", "thank", "thankful", "ness"], ["helplessness", "help", "helpless", "ness"], ["fearlessly", "fear", "fearless", "ly"], ["playfulness", "play", "playful", "ness"], ["powerfully", "power", "powerful", "ly"], ["peacefully", "peace", "peaceful", "ly"], ["cheerfully", "cheer", "cheerful", "ly"], ["restlessly", "rest", "restless", "ly"], ["colorfully", "color", "colorful", "ly"], ["painlessly", "pain", "painless", "ly"], ["harmlessly", "harm", "harmless", "ly"], ["usefulness", "use", "useful", "ness"], ["joyfully", "joy", "joyful", "ly"], ["thoughtfulness", "thought", "thoughtful", "ness"], ["carelessness", "care", "careless", "ness"], ["fearfully", "fear", "fearful", "ly"]];
addBank(9, "english", "suffixes", 0.3, function () {
  const k = Math.random();
  if (k < 0.45) {
    const [b, s, a, rule, ws] = pick(V25EN9_SP);
    return V25EN9_mk({ q: `Add the suffix. Which spelling is correct?<div class="sentence">${b} + -${s} = ?</div>`, say: `Add the suffix. ${b} plus ${s.split("").join(" ")}. Which spelling is correct?`, a, w: ws.map(([x, c]) => [x, V25EN9_SR[c] ? V25EN9_SR[c](b, s, a) : c]), why: `${V25EN9_SWHY[rule]} ${b} + -${s} = ${a}.`, k: "ss" + a, big: 1 });
  }
  if (k < 0.8) {
    const [s, a, ws] = pick(V25EN9_SS);
    return V25EN9_mk({ q: `Which word best completes the sentence?<div class="sentence">${V25EN9_bl(s)}</div>`, say: `Which word best completes the sentence? ${V25EN9_sb(s)}`, a, w: ws.map(x => [x, `“${x}” means ${V25EN9_SM[x]}, which doesn't fit this sentence.`]), why: `“${a}” means ${V25EN9_SM[a]}, which fits: ${s.replace("___", a)}`, k: "sm" + a, big: 1 });
  }
  const [w, b, b1, s2] = pick(V25EN9_SB), s1 = b1.slice(b.length);
  return V25EN9_mk({ q: `What is the <b>base word</b> in <b>${w}</b>?`, say: `What is the base word in ${w}?`, a: b, w: [[b1, `“${b1}” still has the suffix -${s1} on it.`], ["-" + s2, `-${s2} is a suffix at the end, not the base word.`], ["-" + s1, `-${s1} is a suffix, not the base word.`]], why: `${w} = ${b} + -${s1} + -${s2}. The base word is ${b}.`, k: "sb" + w, big: 1 });
});

/* ---------- Figurative Language ---------- */
/* [sentence, type, thing, compared to (or null), extra noun (or null), real meaning, [[wrong meaning, code]]] */
const V25EN9_FC = { lit: "That reads the words literally, but the writer isn't being literal.", opp: "That's the opposite of what the sentence is really saying.", off: "That isn't what the figurative language is telling you." };
const V25EN9_FG = [
  ["The gym floor was as shiny as a mirror after the cleaning crew left.", "simile", "the gym floor", "a mirror", "the cleaning crew", "The gym floor was very shiny and clean.", [["The gym had a mirror on the floor.", "lit"], ["The gym floor was dirty and dull.", "opp"], ["The cleaning crew left early.", "off"]]],
  ["Mia's backpack was as heavy as a sack of bricks.", "simile", "Mia's backpack", "a sack of bricks", "Mia", "Mia's backpack was very heavy.", [["Mia carried bricks in her backpack.", "lit"], ["Mia's backpack was light and easy to carry.", "opp"], ["Mia needs a new backpack.", "off"]]],
  ["The new kitten was as curious as a detective, sniffing every corner of the house.", "simile", "the new kitten", "a detective", "the house", "The kitten wanted to explore and check everything.", [["The kitten solved a mystery.", "lit"], ["The kitten did not care about anything.", "opp"], ["The house had many corners.", "off"]]],
  ["After the long hike, my legs felt like wet noodles.", "simile", "my legs", "wet noodles", "the hike", "My legs felt weak and wobbly.", [["My legs turned into noodles.", "lit"], ["My legs felt strong and ready to run.", "opp"], ["We ate noodles after the hike.", "off"]]],
  ["The fog rolled in like a thick gray blanket over the town.", "simile", "the fog", "a blanket", "the town", "The fog covered the town thickly.", [["Someone spread a blanket over the town.", "lit"], ["The sky over the town was clear.", "opp"], ["The town had many gray houses.", "off"]]],
  ["Our teacher's voice was as calm as a quiet lake.", "simile", "our teacher's voice", "a quiet lake", null, "Our teacher spoke in a calm, gentle way.", [["Our teacher talked while standing in a lake.", "lit"], ["Our teacher's voice was loud and wild.", "opp"], ["Our teacher likes to swim.", "off"]]],
  ["The marbles scattered across the floor like startled mice.", "simile", "the marbles", "startled mice", "the floor", "The marbles rolled away quickly in every direction.", [["Mice ran across the floor.", "lit"], ["The marbles stayed in one neat pile.", "opp"], ["The floor needed to be swept.", "off"]]],
  ["Dad's snoring rumbled like distant thunder.", "simile", "Dad's snoring", "distant thunder", null, "Dad's snoring was loud and deep.", [["A storm was coming.", "lit"], ["Dad's snoring was soft and quiet.", "opp"], ["Dad was very tired.", "off"]]],
  ["Ben's room was as neat as a pin after he cleaned it.", "simile", "Ben's room", "a pin", null, "Ben's room was very neat.", [["Ben's room was full of pins.", "lit"], ["Ben's room was messy.", "opp"], ["Ben's room was very small.", "off"]]],
  ["The classroom was a beehive of activity during the science fair.", "metaphor", "the classroom", "a beehive", "the science fair", "The classroom was very busy.", [["Bees lived in the classroom.", "lit"], ["The classroom was empty and still.", "opp"], ["The science fair had a bee project.", "off"]]],
  ["Grandpa's hands were sandpaper after years of farm work.", "metaphor", "Grandpa's hands", "sandpaper", "farm work", "Grandpa's hands were rough.", [["Grandpa's hands were made of sandpaper.", "lit"], ["Grandpa's hands were soft and smooth.", "opp"], ["Grandpa likes to build things.", "off"]]],
  ["The full moon was a bright lamp hanging over the field.", "metaphor", "the full moon", "a bright lamp", "the field", "The moon gave off lots of light.", [["Someone hung a lamp over the field.", "lit"], ["The night was very dark.", "opp"], ["The field was full of flowers.", "off"]]],
  ["My sister is a bookworm who reads every night.", "metaphor", "my sister", "a bookworm", null, "My sister loves to read.", [["My sister is a worm.", "lit"], ["My sister never reads.", "opp"], ["My sister goes to bed early.", "off"]]],
  ["The traffic jam was a long, slow snake on the highway.", "metaphor", "the traffic jam", "a snake", "the highway", "The line of cars was long and moved slowly.", [["A snake was on the highway.", "lit"], ["The cars zoomed by fast.", "opp"], ["The highway was new.", "off"]]],
  ["Her kind words were a warm hug when I felt sad.", "metaphor", "her kind words", "a warm hug", null, "Her kind words made me feel better.", [["She hugged me with her arms.", "lit"], ["Her words made me feel worse.", "opp"], ["She talks very loudly.", "off"]]],
  ["The hot sand was a frying pan under my bare feet.", "metaphor", "the hot sand", "a frying pan", "my bare feet", "The sand was very hot.", [["Someone was cooking on the beach.", "lit"], ["The sand felt cool.", "opp"], ["My feet were dirty.", "off"]]],
  ["The thunder grumbled across the valley.", "personification", "the thunder", null, null, "The thunder made a low, rumbling sound.", [["The thunder was in a bad mood.", "lit"], ["The valley was silent.", "opp"], ["The valley was full of grass.", "off"]]],
  ["The flowers bowed their heads in the heavy rain.", "personification", "the flowers", null, null, "The flowers drooped down in the rain.", [["The flowers were being polite.", "lit"], ["The flowers stood up tall.", "opp"], ["The rain stopped quickly.", "off"]]],
  ["My alarm clock nagged me to get out of bed.", "personification", "my alarm clock", null, null, "My alarm clock kept ringing to wake me up.", [["My alarm clock talked and told me to get up.", "lit"], ["My alarm clock was silent.", "opp"], ["I like my bed.", "off"]]],
  ["The hungry fire gobbled up the dry logs.", "personification", "the fire", null, null, "The fire burned the dry logs quickly.", [["The fire ate the logs like food.", "lit"], ["The fire went out right away.", "opp"], ["The logs were from a pine tree.", "off"]]],
  ["My little brother asked “Why?” about ten thousand times today.", "hyperbole", null, null, null, "My brother asked “Why?” a lot of times.", [["My brother asked exactly ten thousand questions.", "lit"], ["My brother asked only once.", "opp"], ["My brother likes to count.", "off"]]],
  ["The line for the roller coaster stretched all the way to the next town.", "hyperbole", null, null, null, "The line for the ride was very long.", [["The line really reached the next town.", "lit"], ["There was no line at all.", "opp"], ["The roller coaster was new.", "off"]]],
  ["This puzzle has so many pieces that I'll be a grandpa before I finish it.", "hyperbole", null, null, null, "The puzzle will take a very long time.", [["I will finish the puzzle when I'm very old.", "lit"], ["The puzzle will be quick and easy.", "opp"], ["My grandpa likes puzzles.", "off"]]],
  ["The baby cried so loudly that the whole planet heard her.", "hyperbole", null, null, null, "The baby cried very loudly.", [["People everywhere on Earth heard the baby.", "lit"], ["The baby cried very softly.", "opp"], ["The baby was hungry.", "off"]]],
  ["My puppy's tail wags so fast it could power a fan.", "hyperbole", null, null, null, "My puppy's tail wags very fast.", [["My puppy's tail runs a fan.", "lit"], ["My puppy's tail stays still.", "opp"], ["My puppy likes cool air.", "off"]]],
  ["I have so much homework that the pile reaches the ceiling.", "hyperbole", null, null, null, "I have a lot of homework.", [["My homework is stacked up to the ceiling.", "lit"], ["I have no homework.", "opp"], ["My ceiling is very high.", "off"]]],
];
/* personification: [sentence, thing, human action word, [[other word, reason]]] */
const V25EN9_PF = [
  ["The thunder grumbled across the valley.", "thunder", "grumbled", [["valley", "“valley” is a place, not an action."], ["across", "“across” tells where; it isn't an action."]]],
  ["The flowers bowed their heads in the heavy rain.", "flowers", "bowed", [["heavy", "“heavy” describes the rain; it isn't an action."], ["rain", "“rain” is the weather, not a human action."]]],
  ["My alarm clock nagged me to get out of bed.", "alarm clock", "nagged", [["bed", "“bed” is a thing, not an action."], ["out", "“out” tells where; it isn't an action."]]],
  ["The hungry fire gobbled up the dry logs.", "fire", "gobbled", [["dry", "“dry” describes the logs; logs really can be dry."], ["logs", "“logs” are things, not an action."]]],
  ["The shy moon hid behind a cloud.", "moon", "hid", [["cloud", "“cloud” is a thing, not an action."], ["behind", "“behind” tells where; it isn't an action."]]],
  ["The lazy river strolled through the sleepy town.", "river", "strolled", [["town", "“town” is a place, not an action."], ["through", "“through” tells where; it isn't an action."]]],
  ["The snowflakes tiptoed onto the window.", "snowflakes", "tiptoed", [["window", "“window” is a thing, not an action."], ["onto", "“onto” tells where; it isn't an action."]]],
  ["The oven breathed hot air into the kitchen.", "oven", "breathed", [["hot", "“hot” describes the air; air really can be hot."], ["kitchen", "“kitchen” is a place, not an action."]]],
  ["The weeds marched across the garden.", "weeds", "marched", [["garden", "“garden” is a place, not an action."], ["across", "“across” tells where; it isn't an action."]]],
  ["The vacuum swallowed every crumb on the rug.", "vacuum", "swallowed", [["crumb", "“crumb” is a thing, not an action."], ["rug", "“rug” is a thing, not an action."]]],
  ["The old bridge shivered as the train crossed it.", "bridge", "shivered", [["old", "“old” describes the bridge; bridges really can be old."], ["train", "“train” is a thing, not an action."]]],
];
const V25EN9_FT = { simile: "a simile: it compares two things using like or as", metaphor: "a metaphor: it says one thing is another thing", personification: "personification: it gives human actions to something that isn't human", hyperbole: "hyperbole: it is a huge exaggeration" };
addBank(9, "english", "figurative", 0.3, function () {
  const k = Math.random();
  if (k < 0.35) {
    const [s, t, , , , m, ws] = pick(V25EN9_FG);
    return V25EN9_mk({ q: "What does this sentence <b>really</b> mean?", say: `What does this sentence really mean? ${s}`, vis: `<div class="quote">${s}</div>`, a: m, w: ws.map(([x, c]) => [x, V25EN9_FC[c]]), why: `This is ${V25EN9_FT[t].split(":")[0]}. It really means: ${m}`, k: "fm" + s });
  }
  if (k < 0.55) {
    const [s, , A, B, C] = pick(V25EN9_FG.filter(x => x[4])), a = `${A} and ${B}`;
    return V25EN9_mk({ q: "Which two things are being <b>compared</b>?", say: `Which two things are being compared? ${s}`, vis: `<div class="quote">${s}</div>`, a, w: [[`${A} and ${C}`, `${cap(C)} isn't part of the comparison; ${A} is compared to ${B}.`], [`${C} and ${B}`, `${cap(C)} isn't part of the comparison; ${A} is compared to ${B}.`]], why: `The sentence compares ${A} to ${B}.`, k: "fc" + s });
  }
  if (k < 0.75) {
    const [s, th, a, ws] = pick(V25EN9_PF);
    return V25EN9_mk({ q: `Which word gives the <b>${th}</b> a human action?<div class="sentence">${s}</div>`, say: `Which word gives the ${th} a human action? ${s}`, a, w: ws, why: `“${a}” is something people do, so it gives the ${th} a human action.`, k: "fp" + s, big: 1 });
  }
  const types = ["simile", "metaphor", "personification", "hyperbole"], t = pick(types), a = pick(V25EN9_FG.filter(x => x[1] === t))[0];
  const w = types.filter(x => x !== t).map(x => { const o = pick(V25EN9_FG.filter(y => y[1] === x))[0]; return [o, `That one is ${V25EN9_FT[x]}.`]; });
  const tt = (/^(simile|metaphor)$/.test(t) ? "a " : "") + t;
  return V25EN9_mk({ q: `Which sentence uses <b>${tt}</b>?`, say: `Which sentence uses ${tt}?`, a, w, why: `“${V25EN9_nd(a)}” is ${V25EN9_FT[t]}.`, k: "ft" + t + a });
});

/* ---------- Adverbs ---------- */
/* make the adverb: [sentence, adjective, adverb, [[wrong, code]]] */
const V25EN9_AR = {
  ADJ: (w, a) => `“${w}” is an adjective; the blank needs an adverb that tells how.`,
  CMP: (w, a) => `“${w}” is for comparing; the blank needs a word that tells how.`,
  Y: (w, a) => `Change the y to i before adding -ly: ${a}.`,
  LE: (w, a) => `For words ending in -le, drop the e and add y: ${a}.`,
  NOUN: (w, a) => `“${w}” is a noun; the blank needs a word that tells how.`,
};
const V25EN9_AM = [
  ["The puppy wagged its tail ___.", "happy", "happily", [["happy", "ADJ"], ["happyly", "Y"], ["happier", "CMP"]]],
  ["Grandma wrapped the glass ornament ___.", "gentle", "gently", [["gentle", "ADJ"], ["gentlely", "LE"], ["gentler", "CMP"]]],
  ["The kids waited ___ for the show to start.", "patient", "patiently", [["patient", "ADJ"], ["patience", "NOUN"]]],
  ["The hikers crossed the icy bridge ___.", "careful", "carefully", [["careful", "ADJ"], ["more careful", "CMP"]]],
  ["The fox crept ___ toward the henhouse.", "silent", "silently", [["silent", "ADJ"], ["silence", "NOUN"]]],
  ["Ana answered every question ___.", "correct", "correctly", [["correct", "ADJ"], ["correctness", "NOUN"]]],
  ["The baby slept ___ through the night.", "peaceful", "peacefully", [["peaceful", "ADJ"], ["peace", "NOUN"]]],
  ["Leo shared his snack ___ with his sister.", "generous", "generously", [["generous", "ADJ"], ["more generous", "CMP"]]],
  ["The geese honked ___ at the barking dog.", "angry", "angrily", [["angry", "ADJ"], ["angryly", "Y"], ["anger", "NOUN"]]],
  ["The tired runner breathed ___.", "heavy", "heavily", [["heavy", "ADJ"], ["heavyly", "Y"], ["heavier", "CMP"]]],
  ["The magician pulled a scarf from his hat ___.", "sudden", "suddenly", [["sudden", "ADJ"], ["more sudden", "CMP"]]],
  ["The puppy raced ___ around the yard.", "wild", "wildly", [["wild", "ADJ"], ["wilder", "CMP"]]],
  ["Ella spoke ___ so the baby would not wake up.", "quiet", "quietly", [["quiet", "ADJ"], ["quietness", "NOUN"]]],
  ["The artist painted the tiny bird ___.", "perfect", "perfectly", [["perfect", "ADJ"], ["more perfect", "CMP"]]],
  ["The hamster ran ___ on its wheel.", "busy", "busily", [["busy", "ADJ"], ["busyly", "Y"], ["busier", "CMP"]]],
  ["The clown bowed ___ to the crowd.", "polite", "politely", [["polite", "ADJ"], ["politeness", "NOUN"]]],
  ["The kite rose ___ into the sky.", "easy", "easily", [["easy", "ADJ"], ["easyly", "Y"], ["easier", "CMP"]]],
  ["The singer sang ___ on stage.", "beautiful", "beautifully", [["beautiful", "ADJ"], ["beauty", "NOUN"]]],
  ["Dad laughed ___ at my silly joke.", "cheerful", "cheerfully", [["cheerful", "ADJ"], ["cheer", "NOUN"]]],
  ["The dancer spun ___ across the stage.", "graceful", "gracefully", [["graceful", "ADJ"], ["grace", "NOUN"]]],
  ["The scientist measured the water ___.", "exact", "exactly", [["exact", "ADJ"], ["more exact", "CMP"]]],
  ["The goalie blocked the ball ___.", "brave", "bravely", [["brave", "ADJ"], ["braver", "CMP"], ["bravery", "NOUN"]]],
  ["The baker decorated the cake ___.", "skillful", "skillfully", [["skillful", "ADJ"], ["skill", "NOUN"]]],
  ["The cat stretched ___ in the sun.", "lazy", "lazily", [["lazy", "ADJ"], ["lazyly", "Y"], ["lazier", "CMP"]]],
  ["Kai crossed the finish line ___.", "proud", "proudly", [["proud", "ADJ"], ["prouder", "CMP"], ["pride", "NOUN"]]],
  ["Our team played ___ and won the game.", "good", "well", [["good", "“good” is an adjective; the adverb that goes with good is well."], ["better", "CMP"], ["goodly", "Good is a rule breaker: its adverb is well, not goodly."]]],
  ["The ballet class bent ___ to touch their toes.", "slow", "slowly", [["slowness", "NOUN"], ["slower", "CMP"]]],
];
/* best adverb from clues: [sentence, answer, [wrongs], clue] */
const V25EN9_AC = [
  ["The library is a quiet place, so we whispered ___.", "softly", ["loudly", "angrily"], "a quiet place"],
  ["The sidewalk was slippery, so we walked ___.", "carefully", ["carelessly", "wildly"], "slippery"],
  ["Lena was late for the bus, so she ran ___.", "quickly", ["slowly", "lazily"], "late for the bus"],
  ["The baby is sleeping, so close the door ___.", "gently", ["loudly", "roughly"], "the baby is sleeping"],
  ["Omar knew every answer, so he finished the test ___.", "easily", ["painfully", "badly"], "knew every answer"],
  ["The puppy was so excited that it barked ___.", "happily", ["sadly", "sleepily"], "so excited"],
  ["We missed the bus because we left the house ___.", "late", ["early"], "missed the bus"],
  ["It was raining hard, so the kids played ___.", "indoors", ["outdoors", "outside"], "raining hard"],
  ["The glass vase was fragile, so Dad packed it ___.", "carefully", ["roughly", "carelessly"], "fragile"],
  ["The sun had just come up when we started our hike ___.", "early", ["late", "tonight"], "the sun had just come up"],
  ["The mouse did not want the cat to hear, so it crept ___.", "quietly", ["noisily", "loudly"], "did not want the cat to hear"],
  ["Ruby practiced every day, so she played the song ___.", "perfectly", ["badly", "sloppily"], "practiced every day"],
  ["Owen was grumpy, so he answered ___.", "grumpily", ["cheerfully", "happily"], "was grumpy"],
  ["A turtle is a slow animal, so it moves ___.", "slowly", ["quickly", "swiftly"], "a slow animal"],
  ["The stars come out at night, so we will look for them ___.", "tonight", ["yesterday"], "at night"],
  ["Maya was sure of her answer, so she raised her hand ___.", "confidently", ["shyly", "nervously"], "sure of her answer"],
  ["The door was heavy, so Zoe pushed it ___.", "firmly", ["gently", "lightly"], "the door was heavy"],
  ["The kitten was tired, so it yawned ___.", "sleepily", ["angrily", "eagerly"], "the kitten was tired"],
  ["The bus driver was kind, so she smiled ___ at us.", "warmly", ["coldly", "rudely"], "was kind"],
  ["The puppy was muddy, so we washed it ___ before it came inside.", "outside", ["inside", "upstairs"], "before it came inside"],
  ["Nico was proud of his drawing, so he showed it ___ to everyone.", "proudly", ["shyly", "sadly"], "proud of his drawing"],
  ["The snail was in no hurry, so it crawled ___ along the leaf.", "slowly", ["quickly", "rapidly"], "in no hurry"],
  ["The movie starts in two minutes, so we must leave ___.", "now", ["later", "tomorrow"], "starts in two minutes"],
];
/* sentences without an adverb [sentence, adjective in it] and with one [sentence, adverb] */
const V25EN9_AN = [["The fluffy cat chased a red ball.", "fluffy"], ["My little sister drew a purple dragon.", "little"], ["A huge truck blocked the road.", "huge"], ["The hungry goat ate the green grass.", "hungry"], ["Our new teacher has a friendly smile.", "friendly"], ["The tall tree has thick branches.", "thick"], ["Ten noisy geese crossed the pond.", "noisy"], ["A lovely rainbow appeared after the storm.", "lovely"], ["The brave puppy found a shiny key.", "shiny"], ["Jada wore a warm, fuzzy hat.", "fuzzy"]];
const V25EN9_AY = [["The cat crept silently across the porch.", "silently"], ["We will bake cookies tomorrow.", "tomorrow"], ["The children played upstairs.", "upstairs"], ["The owl hooted softly in the dark.", "softly"], ["Grandpa often tells funny stories.", "often"], ["The goat chewed slowly on the hay.", "slowly"], ["The kids ran outside after lunch.", "outside"], ["Dana always feeds the fish.", "always"], ["The red balloon floated away.", "away"], ["Leo finished his chores early.", "early"], ["The puppy barked excitedly at the mail carrier.", "excitedly"], ["The crowd clapped loudly.", "loudly"], ["We visited the aquarium yesterday.", "yesterday"], ["Mom gently tucked in the baby.", "gently"], ["The robin sang sweetly.", "sweetly"]];
addBank(9, "english", "adverbs", 0.3, function () {
  const k = Math.random();
  if (k < 0.45) {
    const [s, adj, a, ws] = pick(V25EN9_AM);
    return V25EN9_mk({ q: `Change <b>${adj}</b> into an adverb. Which word completes the sentence?<div class="sentence">${V25EN9_bl(s)}</div>`, say: `Change ${adj} into an adverb. Which word completes the sentence? ${V25EN9_sb(s)}`, a, w: ws.map(([x, c]) => [x, V25EN9_AR[c] ? V25EN9_AR[c](x, a) : c]), why: a === "well" ? "The adverb for good is well: our team played well." : `${cap(adj)} becomes ${a}, which tells how: ${s.replace("___", a)}`, k: "am" + s, big: 1 });
  }
  if (k < 0.8) {
    const [s, a, ws, clue] = pick(V25EN9_AC);
    return V25EN9_mk({ q: `Which adverb fits best?<div class="sentence">${V25EN9_bl(s)}</div>`, say: `Which adverb fits best? ${V25EN9_sb(s)}`, a, w: ws.map(x => [x, `“${x}” doesn't fit the clue “${clue}”.`]), why: `The clue “${clue}” shows that “${a}” fits best.`, k: "ac" + s, big: 1 });
  }
  const [s, a] = pick(V25EN9_AY), w = shuffle(V25EN9_AN).slice(0, 3).map(([x, adj]) => [x, `It has no adverb; “${adj}” is an adjective that describes a noun.`]);
  return V25EN9_mk({ q: "Which sentence has an <b>adverb</b>?", say: "Which sentence has an adverb?", a: s, w, why: `“${a}” is an adverb; it tells ${/ly$/.test(a) ? "how" : ["upstairs", "outside", "away"].includes(a) ? "where" : ["often", "always"].includes(a) ? "how often" : "when"} something happens.`, k: "ay" + s });
});

/* ---------- Contractions ---------- */
const V25EN9_CL = [["is not", "isn't"], ["are not", "aren't"], ["was not", "wasn't"], ["were not", "weren't"], ["has not", "hasn't"], ["have not", "haven't"], ["had not", "hadn't"], ["does not", "doesn't"], ["do not", "don't"], ["did not", "didn't"], ["could not", "couldn't"], ["would not", "wouldn't"], ["should not", "shouldn't"], ["must not", "mustn't"], ["cannot", "can't"], ["I am", "I'm"], ["you are", "you're"], ["we are", "we're"], ["they are", "they're"], ["I will", "I'll"], ["you will", "you'll"], ["he will", "he'll"], ["she will", "she'll"], ["we will", "we'll"], ["they will", "they'll"], ["it will", "it'll"], ["that will", "that'll"], ["I have", "I've"], ["you have", "you've"], ["we have", "we've"], ["they have", "they've"], ["could have", "could've"], ["would have", "would've"], ["should have", "should've"], ["he is", "he's"], ["she is", "she's"], ["it is", "it's"], ["that is", "that's"], ["what is", "what's"], ["there is", "there's"], ["where is", "where's"], ["who is", "who's"], ["let us", "let's"], ["here is", "here's"], ["I would", "I'd"], ["you would", "you'd"], ["we would", "we'd"], ["they would", "they'd"]];
const V25EN9_cut = (L, a, b) => L.slice(0, a) + "'" + L.slice(b);
/* ’s and ’d: [sentence, contraction, subject, right long word, [wrong long words]] */
const V25EN9_CS = [
  ["She's eaten all the grapes.", "She's", "She", "has", ["is", "was"]],
  ["It's been raining since lunch.", "It's", "It", "has", ["is", "was"]],
  ["He's taken my seat by mistake.", "He's", "He", "has", ["is", "was"]],
  ["She's written three stories this week.", "She's", "She", "has", ["is", "was"]],
  ["Dad's lost his car keys again.", "Dad's", "Dad", "has", ["is", "was"]],
  ["He's grown two inches since summer.", "He's", "He", "has", ["is", "was"]],
  ["Who's eaten the last cookie?", "Who's", "Who", "has", ["is", "was"]],
  ["It's snowing on the mountain.", "It's", "It", "is", ["has", "was"]],
  ["She's taller than her big brother.", "She's", "She", "is", ["has", "was"]],
  ["He's reading a book about sharks.", "He's", "He", "is", ["has", "was"]],
  ["The soup's too hot to eat.", "soup's", "The soup", "is", ["has", "was"]],
  ["It's my turn to pick a game.", "It's", "It", "is", ["has", "was"]],
  ["She's going to the dentist today.", "She's", "She", "is", ["has", "was"]],
  ["There's a frog in the pool.", "There's", "There", "is", ["has", "was"]],
  ["Who's knocking at the door?", "Who's", "Who", "is", ["has", "was"]],
  ["I'd like a glass of water, please.", "I'd", "I", "would", ["had", "could"]],
  ["She'd love to come to the party.", "She'd", "She", "would", ["had", "could"]],
  ["We'd go swimming if it were warmer.", "We'd", "We", "would", ["had", "could"]],
  ["He'd make a great class president.", "He'd", "He", "would", ["had", "could"]],
  ["They'd already eaten when we arrived.", "They'd", "They", "had", ["would", "could"]],
  ["He'd forgotten his lunch at home.", "He'd", "He", "had", ["would", "could"]],
  ["She'd never seen snow before that trip.", "She'd", "She", "had", ["would", "could"]],
  ["We'd finished our snack before the bell rang.", "We'd", "We", "had", ["would", "could"]],
  ["I'd seen that movie twice already.", "I'd", "I", "had", ["would", "could"]],
  ["You'd better wear a coat today.", "You'd", "You", "had", ["would", "could"]],
];
addBank(9, "english", "contractions", 0.3, function () {
  if (Math.random() < 0.6) {
    const [l, c] = pick(V25EN9_CL), L = l.replace(" ", ""), k = c.indexOf("'"), Cn = c.replace("'", ""), s = Cn.length - k, b = L.length - s, rem = L.slice(k, b);
    const cands = [[k, b - 1], [k + 1, b + 1], [k - 1, b - 1], [k, b + 1], [k + 1, b]].filter(([x, y]) => x >= 1 && y <= L.length && y > x && !(x === k && y === b));
    const seen = new Set([rem]), w = [];
    shuffle(cands).forEach(([x, y]) => { const t = L.slice(x, y), res = V25EN9_cut(L, x, y); if (w.length < 3 && !seen.has(t) && res.toLowerCase() !== c.toLowerCase()) { seen.add(t); w.push([t, `${l} loses “${rem}” to make ${c}, not “${t}”.`]); } });
    return V25EN9_mk({ q: `In <b>${c}</b>, which letters does the apostrophe take the place of?`, say: `${l} becomes ${c}. Which letters does the apostrophe take the place of?`, vis: eq(`${l} → ${c}`), a: rem, w, why: `${l} → ${c}: the apostrophe stands for the missing “${rem}”.`, k: "cl" + c, big: 1 });
  }
  const [s, c, , a, ws] = pick(V25EN9_CS), base = c.split("'")[0], long = x => `${["I", "Dad"].includes(base) ? base : base.toLowerCase()} ${x}`, put = x => s.replace(c, base + " " + x);
  const why = x => (x === "was" ? "The ’s ending never stands for “was”; it means is or has." : x === "could" ? "The ’d ending never stands for “could”; it means would or had." : `Try it: “${put(x)}” doesn't make sense.`);
  return V25EN9_mk({ q: `What does <b>${c}</b> mean in this sentence?<div class="sentence">${s.replace(c, `<b class="hl">${c}</b>`)}</div>`, say: `${s} What does ${c} mean in this sentence?`, a: long(a), w: ws.map(x => [long(x), why(x)]), why: `“${put(a)}” makes sense, so ${c} means ${long(a)}.`, k: "cs" + s });
});

/* ---------- Main Idea & Inference: original passages; every wrong choice has a checked reason ---------- */
const V25EN9_RD = [
  { p: "On warm summer nights, fireflies blink tiny lights in the dark. A firefly makes its glow inside its own body, and the light gives off almost no heat. Each kind of firefly flashes in its own pattern, like a secret code. Fireflies use these flashes to find other fireflies of the same kind.", qs: [
    ["What is the main idea?", "Fireflies make light to signal each other.", [["Summer nights are warm.", "That's a small detail, not what the whole passage is about."], ["Fireflies are hot to touch.", "The passage says the light gives off almost no heat."], ["All fireflies flash the same way.", "The passage says each kind flashes in its own pattern."]], "The passage explains how and why fireflies flash their lights."],
    ["Where does a firefly's light come from?", "inside its own body", [["the moon", "The passage says fireflies make the glow inside their bodies."], ["tiny flames", "The light gives off almost no heat, so it isn't fire."], ["the stars", "The passage says the glow comes from inside the firefly."]], "The passage says, “A firefly makes its glow inside its own body.”"],
    ["Why does each kind of firefly need its own flash pattern?", "so fireflies can find their own kind", [["so they can light up houses", "The passage never says anything about houses."], ["to scare away the sun", "The passage never says anything like that."], ["to stay warm at night", "The passage says the light gives off almost no heat."]], "They use flashes “to find other fireflies of the same kind.”"],
    ["Which sentence shows that firefly light is not hot?", "A firefly makes its glow inside its own body, and the light gives off almost no heat.", [["On warm summer nights, fireflies blink tiny lights in the dark.", "This says when fireflies blink, not how hot the light is."], ["Fireflies use these flashes to find other fireflies of the same kind.", "This tells why they flash, not how hot the light is."]], "It says the light “gives off almost no heat.”"],
    ["Which is the best title for this passage?", "The Secret Code of Fireflies", [["How to Build a Lamp", "The passage never says anything about building lamps."], ["Animals of the Desert", "The passage never says anything about deserts."], ["Winter Snowstorms", "The passage is about warm summer nights, not winter."]], "The passage is about fireflies flashing patterns like a code."]] },
  { p: "Andre carried the heavy watering can to the community garden every morning before school. Some days his arms ached, and other kids were still asleep. By August, his row was full of fat red tomatoes and bright yellow squash. Mrs. Lin, who ran the garden, gave him a blue ribbon that said Hardest Worker.", qs: [
    ["What is this story mostly about?", "Andre worked hard, and his garden grew.", [["Mrs. Lin likes ribbons.", "Mrs. Lin gives a ribbon, but the story is mostly about Andre's work."], ["Kids sleep late in summer.", "That's a small detail, not what the whole story is about."], ["Tomatoes are better than squash.", "The story never compares tomatoes and squash."]], "The story tells about Andre's daily work and what it led to."],
    ["Which word best describes Andre?", "hardworking", [["lazy", "He carried water every morning, even when his arms ached."], ["forgetful", "He went to the garden every single morning."], ["bossy", "The story never shows him telling others what to do."]], "He kept watering every morning, even when it was hard."],
    ["Which sentence shows that Andre kept going even when it was hard?", "Some days his arms ached, and other kids were still asleep.", [["By August, his row was full of fat red tomatoes and bright yellow squash.", "This shows the result, not that the work was hard."], ["Mrs. Lin, who ran the garden, gave him a blue ribbon that said Hardest Worker.", "This tells about his reward, not about the hard days."]], "Aching arms show the work was hard, but he still did it."],
    ["Why did Mrs. Lin give Andre the ribbon?", "She saw how hard he worked all summer.", [["He was the fastest runner.", "The story never says anything about running."], ["He grew the biggest pumpkin.", "He grew tomatoes and squash, not pumpkins."], ["He woke up the other kids.", "The other kids were asleep; he didn't wake them."]], "The ribbon said Hardest Worker, which matches his daily effort."],
    ["Which is the best title for this story?", "Andre's Summer of Hard Work", [["The Lost Watering Can", "The watering can is never lost in the story."], ["A Trip to the Beach", "The story takes place in a garden, not at a beach."], ["How to Cook Squash", "The story never talks about cooking."]], "The story is about Andre's hard work in the garden all summer."]] },
  { p: "Sea otters spend almost their whole lives in the ocean. To stay warm in the cold water, they rely on their thick fur instead of a layer of fat. Otters spend hours cleaning and fluffing their fur so it traps tiny air bubbles. When they rest, otters often float on their backs and hold paws so they don't drift apart.", qs: [
    ["What is the main idea?", "Sea otters have special ways to live in the cold ocean.", [["Otters hate cold water.", "The passage never says that; otters live in the water."], ["Otters hold paws.", "That's one detail, not the main idea of the whole passage."], ["Fish live in the ocean.", "The passage is about otters, not fish."]], "Each detail shows how otters live in the cold ocean."],
    ["What keeps a sea otter warm?", "its thick fur", [["a layer of fat", "The passage says otters use fur instead of a layer of fat."], ["warm ocean water", "The passage says the water is cold."], ["holding paws", "Holding paws keeps them from drifting apart, not warm."]], "The passage says they “rely on their thick fur” to stay warm."],
    ["Why do otters spend so much time cleaning their fur?", "Clean, fluffy fur helps keep them warm.", [["They want to look nice for photos.", "The passage ties cleaning fur to trapping air and staying warm."], ["Their fur is too short.", "The passage says their fur is thick."], ["They are bored.", "The passage gives a reason: fluffy fur traps air bubbles."]], "Fluffing the fur traps air bubbles, and the fur is what keeps them warm."],
    ["Which sentence explains why otters hold paws?", "When they rest, otters often float on their backs and hold paws so they don't drift apart.", [["Sea otters spend almost their whole lives in the ocean.", "This tells where otters live, not why they hold paws."], ["Otters spend hours cleaning and fluffing their fur so it traps tiny air bubbles.", "This is about their fur, not holding paws."]], "It says they hold paws “so they don't drift apart.”"],
    ["Which is the best title for this passage?", "How Sea Otters Stay Warm and Safe", [["Life on a Desert Island", "The passage is about otters in the ocean, not an island."], ["Otters That Live in Trees", "Sea otters live in the ocean, not in trees."], ["The Biggest Fish in the Sea", "The passage never talks about big fish."]], "The passage tells how otters stay warm and stay together."]] },
  { p: "When the lights went out, Hana's little brother grabbed her sleeve. Rain hammered the roof. Hana found the flashlight in the kitchen drawer, made a tent out of blankets, and began telling a silly story about a dancing pickle. Soon her brother was giggling so hard that he forgot about the storm.", qs: [
    ["How did Hana's brother feel when the lights went out?", "scared", [["proud", "Grabbing her sleeve in the dark shows fear, not pride."], ["bored", "He grabbed her sleeve, which shows he was frightened."], ["angry", "Nothing shows anger; he held on to her for comfort."]], "He grabbed her sleeve in the dark, which shows he was scared."],
    ["Why did Hana tell a silly story?", "to help her brother stop being afraid", [["to practice for a test", "The story never mentions a test."], ["because she was hungry", "Hunger is never mentioned; she was helping her brother."], ["to make the rain stop", "A story can't stop rain; it helped her brother feel better."]], "Her brother was scared, and the silly story made him forget the storm."],
    ["Which word best describes Hana?", "caring", [["selfish", "She spent her time making her brother feel safe."], ["careless", "She calmly found the flashlight and made a cozy tent."], ["grumpy", "She told a silly story, which isn't grumpy."]], "She took care of her scared brother."],
    ["Which sentence shows that Hana's plan worked?", "Soon her brother was giggling so hard that he forgot about the storm.", [["Rain hammered the roof.", "This describes the storm, not the plan working."], ["When the lights went out, Hana's little brother grabbed her sleeve.", "This happens before Hana's plan even starts."]], "Her brother giggled and forgot the storm, so the plan worked."],
    ["What is this story mostly about?", "Hana helps her brother during a storm.", [["A pickle learns to dance.", "That's the silly story Hana told, not what this story is about."], ["The family buys a new flashlight.", "Hana found a flashlight in a drawer; nobody bought one."], ["The roof gets fixed.", "The story never mentions fixing the roof."]], "The whole story is about Hana comforting her brother in the storm."]] },
  { p: "When the ocean tide goes out, small pools of water are left behind in the rocks. These tide pools are home to sea stars, crabs, and snails. Twice a day, the creatures are pounded by waves, and then they sit in the hot sun. To survive, many of them cling tightly to rocks or hide in cracks.", qs: [
    ["What is the main idea?", "Tide pool animals live in a place that keeps changing.", [["Crabs are the biggest sea animals.", "The passage never compares the sizes of sea animals."], ["The ocean is always calm.", "The passage says the creatures are pounded by waves."], ["Snails are slow.", "The passage never says anything about how fast snails move."]], "The passage shows how tide pool animals handle waves and hot sun."],
    ["When are tide pools left behind?", "when the tide goes out", [["when it snows", "The passage never says anything about snow."], ["when the sun sets", "The passage says tide pools form when the tide goes out."], ["when a storm comes", "The passage says the tide going out leaves the pools."]], "The first sentence says pools are left “when the ocean tide goes out.”"],
    ["Why do many tide pool animals cling to rocks?", "so the waves don't wash them away", [["because they are sleepy", "The passage links clinging to surviving the pounding waves."], ["to get a better view", "The passage never says anything like that."], ["because the rocks are warm", "The passage says clinging helps them survive, not stay warm."]], "They are pounded by waves, and clinging helps them survive."],
    ["Which sentence shows that a tide pool can be a hard place to live?", "Twice a day, the creatures are pounded by waves, and then they sit in the hot sun.", [["These tide pools are home to sea stars, crabs, and snails.", "This tells who lives there, not why it's hard."], ["When the ocean tide goes out, small pools of water are left behind in the rocks.", "This tells how pools form, not why it's hard."]], "Pounding waves and hot sun make life hard."],
    ["Which is the best title for this passage?", "Life in a Tide Pool", [["How Snow Is Made", "The passage never says anything about snow."], ["My Pet Goldfish", "The passage is about wild ocean animals, not a pet."], ["Desert Plants", "The passage is about the ocean, not the desert."]], "The passage is about the animals living in tide pools."]] },
  { p: "Keisha had practiced her cartwheel all week, but every time she tried, she tumbled sideways into the grass. On Saturday, her cousin showed her a trick: keep your eyes on your hands. Keisha took a deep breath, tried again, and landed on both feet. She threw her arms up and whooped.", qs: [
    ["How did Keisha feel at the end?", "proud and excited", [["sad and tired", "She threw her arms up and whooped, which shows joy."], ["scared and shy", "Whooping and throwing her arms up isn't shy."], ["bored", "Whooping shows she was celebrating, not bored."]], "Throwing her arms up and whooping shows she was proud and excited."],
    ["What helped Keisha finally do the cartwheel?", "her cousin's tip", [["new sneakers", "Sneakers are never mentioned in the story."], ["a softer patch of grass", "The story points to the tip, not the grass."], ["giving up", "She didn't give up; she tried again."]], "Right after the cousin's trick, Keisha landed on both feet."],
    ["What is this story mostly about?", "Keisha keeps trying and learns to do a cartwheel.", [["Keisha's cousin is a famous gymnast.", "The story never says her cousin is famous."], ["Grass is soft to land on.", "That's a small detail, not what the story is about."], ["Saturday is the best day.", "The story never says anything like that."]], "The story follows Keisha's practice until she succeeds."],
    ["Which sentence shows that Keisha struggled at first?", "Keisha had practiced her cartwheel all week, but every time she tried, she tumbled sideways into the grass.", [["She threw her arms up and whooped.", "This shows her success, not her struggle."], ["Keisha took a deep breath, tried again, and landed on both feet.", "This shows her success, not her struggle."]], "Tumbling sideways every time shows she struggled."],
    ["What lesson does this story teach?", "Keep trying, and ask for help when you need it.", [["Never play outside on Saturday.", "Nothing in the story teaches that."], ["Cartwheels are too hard to learn.", "Keisha did learn the cartwheel in the end."], ["Always do things by yourself.", "Keisha needed her cousin's help to succeed."]], "Keisha kept practicing, and her cousin's help made the difference."]] },
  { p: "Some birds travel thousands of miles each year. In the fall, they fly south to warmer places where food is easier to find. In the spring, they return north to build nests and raise their chicks. This long trip is called migration. Scientists think birds use the sun, the stars, and even Earth's magnetic pull to find their way.", qs: [
    ["What is the main idea?", "Many birds make long trips each year called migration.", [["Birds build nests in the fall.", "The passage says they build nests in the spring."], ["Scientists love the stars.", "Stars are mentioned only as one way birds find their way."], ["Winter is the coldest season.", "The passage is about birds traveling, not seasons."]], "The whole passage describes the long trip called migration."],
    ["Why might birds leave the north in the fall?", "Food gets harder to find there.", [["They want to see the ocean.", "The passage says they go where food is easier to find."], ["Their nests are too big.", "The passage never says anything like that."], ["They are lost.", "The passage says birds can find their way."]], "They fly to places “where food is easier to find.”"],
    ["What is migration?", "a long trip animals make each year", [["a kind of nest", "The passage says migration is the long trip, not a nest."], ["a bird's song", "The passage never says anything about songs."], ["a kind of food", "The passage says migration is a trip."]], "The passage says, “This long trip is called migration.”"],
    ["Which sentence tells how birds might find their way?", "Scientists think birds use the sun, the stars, and even Earth's magnetic pull to find their way.", [["Some birds travel thousands of miles each year.", "This tells how far they go, not how they find the way."], ["In the spring, they return north to build nests and raise their chicks.", "This tells why they return, not how they find the way."]], "It names the sun, the stars, and Earth's magnetic pull."],
    ["Which is the best title for this passage?", "Birds on the Move", [["How to Build a Birdhouse", "The passage never explains building a birdhouse."], ["Why Fish Swim", "The passage is about birds, not fish."], ["A Day at the Zoo", "The passage never mentions a zoo."]], "The passage is about birds traveling each year."]] },
  { p: "Every afternoon, Mr. Okafor sat alone on the bench outside his apartment. One day, Leo and his sister drew a giant sunflower in chalk right in front of the bench. They added the words HELLO, NEIGHBOR! The next afternoon, Mr. Okafor came out with a box of chalk of his own and drew a bright blue bird beside their flower.", qs: [
    ["How did Mr. Okafor most likely feel about the drawing?", "happy and thankful", [["angry and upset", "He came back and added his own drawing, which shows he liked it."], ["bored", "He joined in with his own chalk, so he wasn't bored."], ["scared", "Nothing in the story shows he was afraid."]], "He answered their drawing with a drawing of his own."],
    ["Why did Leo and his sister draw the sunflower?", "to cheer up their lonely neighbor", [["to win an art contest", "The story never says anything about a contest."], ["because their teacher told them to", "The story never mentions a teacher."], ["to cover up a crack", "The story never mentions a crack."]], "Mr. Okafor sat alone, and they wrote HELLO, NEIGHBOR! for him."],
    ["What is this story mostly about?", "A kind drawing helps neighbors become friends.", [["Chalk washes away in the rain.", "The passage never says anything about rain."], ["Sunflowers are tall.", "The sunflower is a drawing; its height isn't the point."], ["Mr. Okafor moves away.", "He stays and draws with the kids."]], "The kids' drawing led Mr. Okafor to join in."],
    ["Which sentence shows that Mr. Okafor wanted to join in?", "The next afternoon, Mr. Okafor came out with a box of chalk of his own and drew a bright blue bird beside their flower.", [["Every afternoon, Mr. Okafor sat alone on the bench outside his apartment.", "This shows him alone, before the kids' drawing."], ["They added the words HELLO, NEIGHBOR!", "This is what the kids did, not Mr. Okafor."]], "He brought his own chalk and drew beside their flower."],
    ["Which is the best title for this story?", "Hello, Neighbor!", [["The Lost Box of Chalk", "No chalk gets lost in the story."], ["A Trip to the Farm", "The story happens outside an apartment, not on a farm."], ["How Birds Fly", "The blue bird is only a chalk drawing."]], "The story is about greeting and befriending a neighbor."]] },
  { p: "Many people think chameleons change color to hide, but that is only part of the story. A chameleon's skin often changes when its mood or temperature changes. A calm chameleon may be green or brown, while an excited or angry one can turn bright colors. Some chameleons also turn darker to soak up more warmth from the sun.", qs: [
    ["What is the main idea?", "Chameleons change color for more reasons than hiding.", [["Chameleons only change color to hide.", "The passage says hiding is only part of the story."], ["Chameleons are always green.", "The passage says they can turn many colors."], ["The sun is warm.", "That's a small detail, not the main idea."]], "The passage says hiding is “only part of the story” and gives other reasons."],
    ["A chameleon suddenly turns bright colors. What might be happening?", "It is excited or upset.", [["It is fast asleep.", "The passage says calm chameleons are green or brown, not bright."], ["It wants to be warmer.", "The passage says they turn darker, not brighter, to warm up."], ["It is very calm.", "The passage says a calm chameleon is green or brown."]], "An excited or angry chameleon “can turn bright colors.”"],
    ["Why might a chameleon turn darker?", "to soak up more warmth from the sun", [["to show it is calm", "The passage says calm chameleons are green or brown."], ["to find food", "The passage never says anything about food."], ["to go to sleep", "The passage never says anything about sleeping."]], "The passage says some turn darker “to soak up more warmth from the sun.”"],
    ["Which sentence shows that mood can change a chameleon's color?", "A calm chameleon may be green or brown, while an excited or angry one can turn bright colors.", [["Some chameleons also turn darker to soak up more warmth from the sun.", "This is about temperature, not mood."], ["Many people think chameleons change color to hide, but that is only part of the story.", "This introduces the topic but doesn't explain mood."]], "Calm, excited, and angry are moods, and each shows a color."],
    ["Which is the best title for this passage?", "Why Chameleons Change Color", [["The Fastest Animals", "The passage never says anything about speed."], ["How to Paint a Rainbow", "The passage is about chameleons, not painting."], ["Life Under the Sea", "The passage never says anything about the sea."]], "The passage explains the reasons chameleons change color."]] },
  { p: "Talia's class was planning a bake sale, and everyone had a job. Talia wanted to bake, but her name was next to SIGNS. She sighed. Then she grabbed markers and made posters with cupcakes that seemed to jump off the paper. On sale day, the line stretched down the hall, and three people asked who made the signs.", qs: [
    ["How did Talia feel when she saw her job?", "disappointed", [["thrilled", "She sighed, which shows she wasn't thrilled."], ["frightened", "Nothing shows fear; she sighed because she wanted to bake."], ["sleepy", "She sighed because she wanted a different job."]], "She wanted to bake, so she sighed when she got signs."],
    ["Why did the line stretch down the hall?", "Talia's posters caught people's attention.", [["The sale was giving away free bikes.", "The passage never says anything about bikes."], ["The hall was very short.", "The story gives no clue about the hall's size."], ["Talia baked all the cupcakes.", "Talia's job was signs, not baking."]], "People asked who made the signs, so the signs drew them in."],
    ["What is this story mostly about?", "Talia does her best at a job she didn't choose.", [["Talia learns how to bake cupcakes.", "Talia's job was making signs, not baking cupcakes."], ["The class sells cars.", "The class held a bake sale."], ["Markers are better than crayons.", "The story never compares markers and crayons."]], "Talia wanted another job but worked hard on the signs anyway."],
    ["Which sentence shows that people liked Talia's signs?", "On sale day, the line stretched down the hall, and three people asked who made the signs.", [["She sighed.", "This shows how she felt about the job, not what people thought."], ["Talia wanted to bake, but her name was next to SIGNS.", "This shows her job, not what people thought of the signs."]], "People asking who made the signs shows they liked them."],
    ["What lesson does this story teach?", "Any job can matter if you do your best.", [["Never sign up for a bake sale.", "The bake sale went well, so that's not the lesson."], ["Only bakers are important.", "Talia's signs helped a lot, so that's not true."], ["Always complain about your job.", "Talia sighed once, then worked hard."]], "Talia's best effort on signs helped the sale succeed."]] },
  { p: "A glacier is a giant river of ice that moves very slowly over land. It forms where more snow falls each winter than melts each summer. Over many years, the snow gets packed down into thick ice. As a glacier slides downhill, it scrapes the ground and carries rocks along with it, carving out deep valleys.", qs: [
    ["What is the main idea?", "Glaciers are huge, slow rivers of ice that shape the land.", [["Snow always melts in summer.", "The passage says glaciers form where the snow doesn't all melt."], ["Rocks are heavy.", "The passage never says anything about how heavy rocks are."], ["Rivers move fast.", "The passage says a glacier moves very slowly."]], "The passage tells what glaciers are, how they form, and how they shape land."],
    ["How does a glacier form?", "Snow piles up and gets packed into ice.", [["Rain freezes on a sunny day.", "The passage says packed-down snow forms the ice."], ["A river turns cold overnight.", "The passage says it takes many years of snow."], ["Rocks melt into water.", "The passage never says that rocks melt."]], "Snow that doesn't melt “gets packed down into thick ice.”"],
    ["Where would you most likely find a glacier?", "in a very cold, snowy place", [["in a hot desert", "Glaciers need more snow than melts, so a hot desert won't work."], ["on a sandy beach in summer", "Glaciers form where snow stays year after year."], ["in a warm rain forest", "Glaciers need lots of snow that doesn't melt."]], "Glaciers form where more snow falls than melts."],
    ["Which sentence tells how glaciers change the land?", "As a glacier slides downhill, it scrapes the ground and carries rocks along with it, carving out deep valleys.", [["It forms where more snow falls each winter than melts each summer.", "This tells where glaciers form, not how they change land."], ["Over many years, the snow gets packed down into thick ice.", "This tells how the ice forms, not how land changes."]], "Scraping the ground and carving valleys changes the land."],
    ["Why does the passage call a glacier a “river of ice”?", "It is a long body of ice that slowly flows downhill.", [["It is full of fish.", "The passage never says anything about fish."], ["It is made of warm water.", "The passage says a glacier is made of thick ice."], ["Boats sail on it.", "The passage never says anything about boats."]], "Like a river, a glacier moves downhill, but it is made of ice."]] },
  { p: "Ollie stared up at the tall diving board. His friends were already splashing below. He climbed two steps, then stopped and gripped the rail. “You can climb down if you want,” the lifeguard said kindly. Ollie looked at the water, took a breath, and kept climbing.", qs: [
    ["How did Ollie feel when he gripped the rail?", "nervous", [["silly", "Stopping and gripping the rail shows worry, not silliness."], ["angry", "Nothing shows anger; he was unsure."], ["sleepy", "He was focused on the board, not sleepy."]], "He stopped and held on tight, which shows he was nervous."],
    ["What will Ollie most likely do next?", "jump off the diving board", [["go home to sleep", "He kept climbing, so he isn't leaving."], ["climb back down", "The story says he kept climbing."], ["become a lifeguard", "Nothing in the story points to that."]], "He kept climbing toward the top of the board."],
    ["Which word best describes the lifeguard?", "kind", [["mean", "The story says the lifeguard spoke kindly."], ["bossy", "The lifeguard gave Ollie a choice, not an order."], ["silly", "The lifeguard spoke kindly, not in a silly way."]], "The story says the lifeguard “said kindly.”"],
    ["Which sentence shows that Ollie decided to be brave?", "Ollie looked at the water, took a breath, and kept climbing.", [["His friends were already splashing below.", "This is about his friends, not Ollie's choice."], ["He climbed two steps, then stopped and gripped the rail.", "This shows him stopping, not deciding to be brave."]], "He kept climbing even though he was nervous."],
    ["What is this story mostly about?", "Ollie faces his fear of the high diving board.", [["Ollie's friends learn to swim.", "His friends were already swimming; the story is about Ollie."], ["The pool is closing.", "The story never says anything like that."], ["The lifeguard falls in the water.", "That never happens in the story."]], "The story is about Ollie being nervous but climbing anyway."]] },
  { p: "A dandelion starts as a bright yellow flower. After a few days, the flower closes up. When it opens again, it has turned into a fluffy white ball. Each tiny piece of fluff is attached to a seed. When the wind blows, the seeds float away like tiny parachutes and land in new places, where they can grow into new dandelions.", qs: [
    ["What is the main idea?", "A dandelion changes and spreads its seeds with the wind.", [["Dandelions are always yellow.", "The passage says the flower turns into a fluffy white ball."], ["Parachutes are fun to use.", "Parachutes are only used to describe the seeds."], ["Wind is strong in spring.", "The passage never says anything about spring wind."]], "The passage follows a dandelion from flower to floating seeds."],
    ["What happens after the yellow flower closes up?", "It opens again as a fluffy white ball.", [["It grows new yellow petals.", "The passage says it opens as a white ball, not yellow petals."], ["It sinks into the ground.", "The passage never says anything like that."], ["The seeds start growing right away.", "The seeds must blow away first, then grow."]], "The passage says, “When it opens again, it has turned into a fluffy white ball.”"],
    ["Why do dandelions grow in so many different places?", "The wind carries their seeds far away.", [["People plant them everywhere.", "The passage says the wind spreads the seeds."], ["They walk to new places.", "Plants can't walk; the wind carries the seeds."], ["Birds paint them yellow.", "The passage never says anything about birds."]], "The seeds float away and “land in new places.”"],
    ["Which sentence tells how dandelion seeds travel?", "When the wind blows, the seeds float away like tiny parachutes and land in new places, where they can grow into new dandelions.", [["A dandelion starts as a bright yellow flower.", "This tells how a dandelion starts, not how seeds travel."], ["Each tiny piece of fluff is attached to a seed.", "This tells what is on the fluff, not how it travels."]], "It says the seeds float away on the wind."],
    ["Which is the best title for this passage?", "A Dandelion's Journey", [["How to Bake Bread", "The passage never says anything about baking."], ["The Biggest Tree", "The passage is about a small flower, not a big tree."], ["Snow Days", "The fluffy ball is full of seeds, not snow."]], "The passage follows a dandelion as it changes and travels."]] },
];
addBank(9, "english", "reading9", 0.3, function () {
  const i = R(0, V25EN9_RD.length - 1), P = V25EN9_RD[i], j = R(0, P.qs.length - 1), [q, a, w, why] = P.qs[j];
  return V25EN9_mk({ q, vis: passage(P.p), say: `${P.p} ${q}`, a, w, why, extra: 25, k: "rd" + i + "_" + j });
});

/* ---------- Context Clues ---------- */
/* multiple-meaning words: [word, sentence, right meaning, [wrong meanings], clue] */
const V25EN9_MM = [
  ["bat", "The bat hung upside down in the dark cave.", "a small flying animal", ["a wooden stick used to hit a ball"], "hung upside down in the dark cave"],
  ["bat", "Kai swung the bat and hit the ball over the fence.", "a wooden stick used to hit a ball", ["a small flying animal"], "swung … and hit the ball"],
  ["bark", "The dog's loud bark woke up the whole house.", "the sound a dog makes", ["the rough outside of a tree"], "The dog's loud … woke up the whole house"],
  ["bark", "We rubbed the rough bark of the old oak tree.", "the rough outside of a tree", ["the sound a dog makes"], "of the old oak tree"],
  ["trunk", "The elephant sprayed water with its trunk.", "an elephant's long nose", ["the main stem of a tree", "a big box for storing things"], "elephant sprayed water"],
  ["trunk", "Grandma keeps old photos in a trunk in the attic.", "a big box for storing things", ["an elephant's long nose", "the main stem of a tree"], "keeps old photos"],
  ["trunk", "A woodpecker tapped holes in the tree's trunk.", "the main stem of a tree", ["an elephant's long nose", "a big box for storing things"], "tree's"],
  ["ruler", "Use a ruler to draw a straight line.", "a tool for measuring and drawing lines", ["a person who leads a country"], "draw a straight line"],
  ["ruler", "The wise ruler made fair laws for the whole kingdom.", "a person who leads a country", ["a tool for measuring and drawing lines"], "made fair laws for the whole kingdom"],
  ["scale", "The nurse used a scale to see how much I weigh.", "a tool for weighing things", ["a thin, flat plate on a fish's skin"], "how much I weigh"],
  ["scale", "A shiny scale fell off the fish.", "a thin, flat plate on a fish's skin", ["a tool for weighing things"], "fell off the fish"],
  ["spring", "Tulips bloom in the spring.", "the season after winter", ["a coil of metal that bounces back"], "Tulips bloom"],
  ["spring", "The toy frog jumped because of the spring inside it.", "a coil of metal that bounces back", ["the season after winter"], "toy frog jumped"],
  ["palm", "Sand stuck to the palm of my hand.", "the inside of your hand", ["a tall tree with big leaves at the top"], "of my hand"],
  ["palm", "Coconuts hung from the tall palm by the beach.", "a tall tree with big leaves at the top", ["the inside of your hand"], "Coconuts hung from the tall"],
  ["pitcher", "Dad poured lemonade from the pitcher.", "a jug for pouring drinks", ["the player who throws the ball in baseball"], "poured lemonade"],
  ["pitcher", "The pitcher threw the ball to the batter.", "the player who throws the ball in baseball", ["a jug for pouring drinks"], "threw the ball to the batter"],
  ["seal", "A seal barked and slid off the rock into the sea.", "a sea animal with flippers", ["to close something tightly"], "slid off the rock into the sea"],
  ["seal", "Seal the jar so the cookies stay fresh.", "to close something tightly", ["a sea animal with flippers"], "so the cookies stay fresh"],
  ["fan", "Turn on the fan to cool off the room.", "a machine that blows air", ["a person who cheers for a team"], "cool off the room"],
  ["fan", "Every fan in the stadium cheered for the home team.", "a person who cheers for a team", ["a machine that blows air"], "cheered for the home team"],
  ["pupil", "Bright light makes the pupil of your eye get smaller.", "the dark center of your eye", ["a student"], "of your eye"],
  ["pupil", "Each pupil in Ms. Ortiz's class wrote a poem.", "a student", ["the dark center of your eye"], "class wrote a poem"],
  ["jam", "I spread strawberry jam on my toast.", "a sweet fruit spread", ["a crowd of cars stuck in traffic"], "strawberry … on my toast"],
  ["jam", "A jam on the highway made us late for the game.", "a crowd of cars stuck in traffic", ["a sweet fruit spread"], "on the highway made us late"],
  ["match", "Our soccer team won the match on Saturday.", "a game between two teams", ["a small stick that makes a flame"], "soccer team won"],
  ["present", "Ava wrapped a present for her friend's birthday.", "a gift", ["here, not absent"], "wrapped … for her friend's birthday"],
  ["present", "Every student was present for the class photo.", "here, not absent", ["a gift"], "for the class photo"],
  ["kind", "What kind of sandwich would you like?", "a type or sort", ["nice and caring"], "of sandwich would you like"],
  ["kind", "It was kind of you to share your crayons.", "nice and caring", ["a type or sort"], "to share your crayons"],
  ["nail", "Dad hammered a nail into the board.", "a thin metal spike", ["the hard tip covering a finger"], "hammered … into the board"],
  ["nail", "Rosa painted the nail on her pinky finger.", "the hard tip covering a finger", ["a thin metal spike"], "on her pinky finger"],
  ["light", "The box was so light that I lifted it with one finger.", "not heavy", ["something that helps you see in the dark"], "lifted it with one finger"],
  ["row", "We sat in the front row at the school play.", "a line of seats", ["to move a boat with oars"], "sat in the front"],
  ["row", "We took turns to row the boat across the lake.", "to move a boat with oars", ["a line of seats"], "the boat across the lake"],
  ["watch", "Grandpa checked his watch to see the time.", "a small clock you wear", ["to look at something for a while"], "to see the time"],
  ["leaves", "The bus leaves at eight o'clock sharp.", "goes away", ["flat green parts of a plant"], "The bus … at eight o'clock"],
  ["star", "Lily was the star of the school play.", "the most important performer", ["a ball of burning gas in the sky"], "of the school play"],
  ["park", "Dad had to park the car far from the store.", "to stop a car and leave it", ["a green space for playing"], "the car far from the store"],
  ["wave", "Wave goodbye to Grandma from the window!", "to move your hand to say hello or goodbye", ["a moving bump of water in the ocean"], "goodbye to Grandma"],
  ["wave", "A big wave knocked over our sandcastle.", "a moving bump of water in the ocean", ["to move your hand to say hello or goodbye"], "knocked over our sandcastle"],
  ["duck", "Duck! That tree branch is very low.", "to bend down quickly", ["a bird that swims"], "That tree branch is very low"],
  ["duck", "A duck paddled across the pond with her ducklings.", "a bird that swims", ["to bend down quickly"], "paddled across the pond"],
];
/* word that fits: [sentence, word, [wrong words]] (meanings in V25EN9_CM) */
const V25EN9_CM = { jagged: "sharp and uneven", glossy: "smooth and shiny", hollow: "empty inside", vacant: "empty, with no one in it", rowdy: "loud and wild", tangled: "twisted together in knots", stubborn: "not willing to change or give in", humid: "warm and damp", dim: "not bright", steep: "rising sharply, like a tall hill", loyal: "always faithful to a friend", tidy: "neat and in order", delicate: "easily broken", chilly: "a little cold", stale: "old and not fresh", sparse: "thin and spread out", drab: "dull and plain", nibble: "take small bites", clutch: "hold tightly", glimmer: "shine faintly" };
const V25EN9_CW = [
  ["The ___ rocks were sharp and uneven, so we wore thick shoes.", "jagged", ["glossy", "hollow"]],
  ["The seat next to me was ___, so my friend sat there.", "vacant", ["rowdy", "tangled"]],
  ["The ___ goat would not move, no matter how hard we pulled its rope.", "stubborn", ["glossy", "humid"]],
  ["The lamp was so ___ that we could hardly read our books.", "dim", ["steep", "loyal"]],
  ["After we put every toy away, our room looked ___.", "tidy", ["tangled", "jagged"]],
  ["Grandma's teacups are ___, so we hold them with care.", "delicate", ["stubborn", "rowdy"]],
  ["It was ___ this morning, so we grabbed our jackets.", "chilly", ["humid", "stale"]],
  ["The air was so ___ that my shirt felt damp and sticky.", "humid", ["chilly", "vacant"]],
  ["The grass was so ___ that we could see bare dirt between the clumps.", "sparse", ["glossy", "loyal"]],
  ["The ___ crowd yelled, stomped, and jumped around after the goal.", "rowdy", ["delicate", "vacant"]],
  ["The old log was ___, so a rabbit could hide inside it.", "hollow", ["humid", "tidy"]],
  ["The hill was so ___ that we had to climb it slowly, step by step.", "steep", ["dim", "stale"]],
  ["Fresh wax made the red car look ___ in the sunlight.", "glossy", ["sparse", "drab"]],
  ["The bread sat out for days and became hard and ___.", "stale", ["glossy", "rowdy"]],
  ["My dog is so ___ that she waits by the door for me every day.", "loyal", ["humid", "hollow"]],
  ["The old gray coat looked ___ next to the bright new one.", "drab", ["glossy", "rowdy"]],
  ["My kite string got ___ in a big knot.", "tangled", ["tidy", "steep"]],
  ["The bunny likes to ___ on carrot sticks, taking tiny bites.", "nibble", ["clutch", "glimmer"]],
  ["We watched the town lights ___ far across the dark lake.", "glimmer", ["nibble", "clutch"]],
  ["During the storm, the toddler would ___ her teddy bear and not let go.", "clutch", ["nibble", "glimmer"]],
];
addBank(9, "english", "context", 0.3, function () {
  if (Math.random() < 0.65) {
    const [w, s, m, d, clue] = pick(V25EN9_MM);
    return V25EN9_mk({ q: `What does <b>${w}</b> mean in this sentence?<div class="sentence">${s.replace(new RegExp(`\\b${cap(w)}\\b|\\b${w}\\b`), x => `<b class="hl">${x}</b>`)}</div>`, say: `${s} What does ${w} mean in this sentence?`, a: m, w: d.map(x => [x, `That meaning doesn't fit the clue “${clue}”.`]), why: `The clue “${clue}” shows that ${w} means ${m} here.`, k: "cm" + s });
  }
  const [s, a, d] = pick(V25EN9_CW);
  return V25EN9_mk({ q: `Use the clues. Which word fits best?<div class="sentence">${V25EN9_bl(s)}</div>`, say: `Use the clues. Which word fits best? ${V25EN9_sb(s)}`, a, w: d.map(x => [x, `“${x}” means ${V25EN9_CM[x]}, which doesn't fit the clues.`]), why: `“${a}” means ${V25EN9_CM[a]}, which matches the clues: ${s.replace("___", a)}`, k: "cw" + a, big: 1 });
});

/* ---------- Idioms ---------- */
/* situation → idiom: [idiom, meaning, situation, [categories]] */
const V25EN9_IS = [
  ["in hot water", "in trouble", "Sam drew on the living room wall with markers, and now his parents are upset with him.", ["trouble"]],
  ["on thin ice", "close to getting in trouble", "Jake forgot his chores twice, and his parents warned him that one more time would mean no video games.", ["trouble", "mistake"]],
  ["in a pickle", "in a tricky situation", "The family's car got a flat tire on a quiet road, and the spare tire was flat too.", ["trouble"]],
  ["in the doghouse", "in trouble with someone", "Ty left his bike out in the rain again, and now Mom isn't happy with him.", ["trouble", "mistake"]],
  ["a frog in your throat", "a scratchy, croaky voice", "Mia's voice was so croaky that she kept clearing her throat.", ["voice"]],
  ["cat got your tongue", "asking why someone is so quiet", "Grandma asked Ben why he was suddenly so quiet at dinner.", ["voice"]],
  ["toot your own horn", "brag about yourself", "Owen kept telling everyone how great he was at soccer.", ["brag", "talk"]],
  ["two peas in a pod", "very much alike", "The twins dress the same, like the same foods, and laugh at the same jokes.", ["alike"]],
  ["on the same page", "agreeing and understanding each other", "Before the game, the team made sure everyone knew and agreed on the plan.", ["alike"]],
  ["your eyes are bigger than your stomach", "taking more food than you can eat", "Max piled five tacos on his plate but could only finish one.", ["food"]],
  ["a needle in a haystack", "something very hard to find", "Ava dropped a tiny earring somewhere on the big sandy beach.", ["find"]],
  ["miss the boat", "miss a chance", "By the time Leo tried to sign up for soccer, every spot was already taken.", ["chance", "late"]],
  ["cut it close", "barely make it in time", "Nora reached the bus stop just as the bus doors were closing.", ["late"]],
  ["go bananas", "get very excited or wild", "When the clown came out, the little kids at the party jumped and screamed with excitement.", ["happy"]],
  ["over the moon", "very, very happy", "Lea couldn't stop smiling after she found out she was getting a puppy.", ["happy"]],
  ["rain on my parade", "spoil my fun or excitement", "Kai was excited about his plan, but his brother kept saying it would never work.", ["spoil"]],
  ["a chip off the old block", "just like a parent", "Nia loves fixing things, just like her mom, who is a mechanic.", ["parent", "alike"]],
  ["jump the gun", "start too early", "Ella started eating before everyone sat down and Grandpa said the blessing.", ["early"]],
  ["drop the ball", "forget or mess up a job", "Tim was supposed to feed the class fish this week, but he forgot every day.", ["mistake", "trouble"]],
  ["shake a leg", "hurry up", "Mom called, “We leave in two minutes, so please move faster!”", ["hurry"]],
  ["throw in the towel", "give up", "After losing ten games in a row, the chess club almost quit.", ["quit"]],
  ["keep your eyes peeled", "watch carefully", "The park ranger told us to watch closely for deer near the trail.", ["watch"]],
  ["bend over backwards", "try very hard to help", "The hotel worker did everything he could to help us find our lost suitcase.", ["help", "rescue"]],
  ["know it like the back of your hand", "know it very well", "Grandpa has walked this trail so many times that he never needs a map.", ["know"]],
  ["have your hands full", "be very busy", "Ms. Diaz is taking care of three new puppies and a baby this week.", ["busy"]],
  ["save the day", "fix a problem just in time", "The birthday cake fell, but Aunt Rosa showed up with cupcakes just in time.", ["rescue", "help"]],
  ["start from scratch", "start over from the very beginning", "The wind blew away all of Sam's drawings, so he had to begin all over again.", ["restart"]],
  ["talk your ear off", "talk to you for a very long time", "My neighbor told me stories for two hours without stopping.", ["talk"]],
  ["not my cup of tea", "not something I enjoy", "Lily tried scary movies, but she found out she just doesn't like them.", ["like"]],
  ["stick out like a sore thumb", "be very easy to notice", "Ben wore a bright orange costume to a party where everyone else wore black.", ["notice"]],
  ["give the cold shoulder", "ignore someone on purpose", "After their argument, Maya turned away and wouldn't talk to her friend.", ["ignore"]],
  ["a slam dunk", "something sure to succeed", "Ivan practiced his speech so many times that he knew it would go perfectly.", ["sure", "know"]],
];
/* literal or idiom: [sentence, is it an idiom?, why the other choice is wrong] */
const V25EN9_IL = [
  ["The pasta cooked in hot water for ten minutes.", false, "The pasta really was in hot water, so these words mean just what they say."],
  ["Sam was in hot water after he broke the rule.", true, "Sam wasn't in real water; it means he was in trouble."],
  ["Lily tooted her own horn in the school band.", false, "Lily really played her own horn, so the words mean just what they say."],
  ["Leo likes to toot his own horn about his test scores.", true, "Leo has no real horn; it means he brags."],
  ["Mom snapped open the shell and found two peas in a pod.", false, "Mom really found peas in a pod, so the words mean just what they say."],
  ["Those best friends are like two peas in a pod.", true, "The friends aren't peas; it means they are very alike."],
  ["The farmer dropped a needle in a haystack and never found it.", false, "There really was a needle in the hay, so the words mean just what they say."],
  ["Finding my lost ring at the beach was like finding a needle in a haystack.", true, "There's no real needle or hay; it means very hard to find."],
  ["We reached the dock late and missed the boat to the island.", false, "A real boat left without them, so the words mean just what they say."],
  ["I waited too long to sign up for art class and missed the boat.", true, "There's no real boat; it means missing a chance."],
  ["The duck stood on thin ice near the edge of the frozen pond.", false, "The duck was really standing on ice, so the words mean just what they say."],
  ["After breaking two rules, Jake was on thin ice with his coach.", true, "Jake wasn't on real ice; it means close to trouble."],
  ["Our dog Rufus sleeps in the doghouse in the backyard.", false, "Rufus really sleeps in a doghouse, so the words mean just what they say."],
  ["I'm in the doghouse for leaving my bike in the rain.", true, "A kid isn't really in a doghouse; it means in trouble."],
  ["The juggler dropped the ball and then laughed.", false, "A real ball fell, so the words mean just what they say."],
  ["Tim dropped the ball and forgot to feed the class fish.", true, "No real ball fell; it means Tim forgot his job."],
  ["The spaceship flew high over the moon.", false, "The spaceship really flew over the moon, so the words mean just what they say."],
  ["Lea was over the moon when she got a puppy.", true, "Lea didn't fly over the moon; it means very happy."],
  ["Dad's hands were full of grocery bags, so I opened the door.", false, "Dad's hands really held bags, so the words mean just what they say."],
  ["With three new puppies, Ms. Diaz has her hands full.", true, "It doesn't mean her hands are holding things; it means very busy."],
  ["This isn't my cup of tea; mine has lemon in it.", false, "It really is about a cup of tea, so the words mean just what they say."],
  ["Scary movies are not my cup of tea.", true, "Movies aren't tea; it means not something I enjoy."],
  ["A chip fell off the old block of wood when Dad cut it.", false, "A real chip of wood fell, so the words mean just what they say."],
  ["Nia fixes things just like her mom; she's a chip off the old block.", true, "Nia isn't wood; it means she's just like her parent."],
  ["It rained on our parade, and the marching band got soaked.", false, "Real rain fell on the parade, so the words mean just what they say."],
  ["Please don't rain on my parade; I'm excited about my idea!", true, "There's no real rain or parade; it means don't spoil my fun."],
  ["A ladybug landed on the back of my hand.", false, "The ladybug really landed on a hand, so the words mean just what they say."],
  ["Grandpa knows this trail like the back of his hand.", true, "It's not about a real hand; it means he knows the trail very well."],
  ["Our class was on the same page of our reading books.", false, "They were really on the same book page, so the words mean just what they say."],
  ["The players talked first so everyone was on the same page.", true, "There's no real page; it means everyone understood and agreed."],
];
const V25EN9_IO = ["literal (it means just what it says)", "idiom (a saying with a different meaning)"];
addBank(9, "english", "idioms", 0.3, function () {
  if (Math.random() < 0.55) {
    const i = R(0, V25EN9_IS.length - 1), [id, m, sit, cats] = V25EN9_IS[i];
    const w = shuffle(V25EN9_IS.filter((x, j) => j !== i && !x[3].some(c => cats.includes(c)))).slice(0, 3).map(x => [x[0], `“${x[0]}” means ${x[1]}; that doesn't fit.`]);
    return V25EN9_mk({ q: "Which idiom fits this situation?", say: `Which idiom fits this situation? ${sit}`, vis: `<div class="quote">${sit}</div>`, a: id, w, why: `“${id}” means ${m}, and that is what happened.`, k: "is" + i });
  }
  const i = R(0, V25EN9_IL.length - 1), [s, idi, r] = V25EN9_IL[i], a = V25EN9_IO[idi ? 1 : 0], o = V25EN9_IO[idi ? 0 : 1];
  return V25EN9_mk({ q: "Are these words used <b>literally</b> or as an <b>idiom</b>?", say: `${s} Are these words used literally or as an idiom?`, vis: `<div class="quote">${s}</div>`, a, w: [[o, r]], why: idi ? `It's an idiom. ${r.split("; ")[1] ? cap(r.split("; ")[1]) : ""}` : "It's literal: it really happened just as the words say.", k: "il" + i });
});

/* ---------- Prepositions ---------- */
/* in / on / at for time: [sentence, answer, kind] */
const V25EN9_PU = { at: "an exact time, like 7:30 or noon", on: "days and dates", in: "months, years, seasons, and parts of the day like the morning" };
const V25EN9_PT = [
  ["The movie starts ___ 7:30.", "at"], ["My birthday is ___ June.", "in"], ["We have art class ___ Tuesday.", "on"], ["The town pool opens ___ summer.", "in"],
  ["Grandpa was born ___ 1958.", "in"], ["The fireworks begin ___ the Fourth of July.", "on"], ["We eat lunch ___ noon.", "at"], ["School starts ___ 8:15.", "at"],
  ["I walk my dog ___ the morning.", "in"], ["The library is closed ___ Sundays.", "on"], ["Our field trip is ___ May 12.", "on"], ["The leaves turn orange ___ the fall.", "in"],
  ["The bus comes ___ 8 o'clock.", "at"], ["We visit our cousins ___ Thanksgiving Day.", "on"], ["It snows a lot here ___ January.", "in"], ["I read a chapter of my book ___ the evening.", "in"],
  ["The bakery opens ___ 6:00.", "at"], ["My sister's party is ___ Saturday afternoon.", "on"], ["The new school opened ___ 2019.", "in"], ["We go camping ___ the weekend.", "on"],
  ["Our class picture is ___ Friday morning.", "on"], ["We set our clocks back ___ November.", "in"], ["The game ends ___ 4:15.", "at"],
];
/* prepositional phrase: [sentence, phrase, [[chunk, "N" no preposition | "C" cut short]]] */
const V25EN9_PP = [
  ["The squirrel ran up the tall oak tree.", "up the tall oak tree", [["The squirrel ran", "N"], ["ran up", "C"], ["up the tall", "C"]]],
  ["A tiny frog sat on a lily pad.", "on a lily pad", [["A tiny frog sat", "N"], ["sat on", "C"], ["A tiny frog", "N"]]],
  ["After lunch, we played tag.", "After lunch", [["we played tag", "N"], ["we played", "N"], ["After", "C"]]],
  ["The kite got stuck in the branches.", "in the branches", [["The kite got stuck", "N"], ["stuck in", "C"], ["got stuck", "N"]]],
  ["My cat sleeps under the warm blanket.", "under the warm blanket", [["My cat sleeps", "N"], ["sleeps under", "C"], ["under the warm", "C"]]],
  ["The children walked across the wooden bridge.", "across the wooden bridge", [["The children walked", "N"], ["walked across", "C"], ["the wooden", "N"]]],
  ["Dad hung the picture above the couch.", "above the couch", [["Dad hung the picture", "N"], ["hung the", "N"], ["above the", "C"]]],
  ["We went sledding during winter break.", "during winter break", [["We went sledding", "N"], ["sledding during", "C"], ["went sledding", "N"]]],
  ["The puppy hid behind the big blue couch.", "behind the big blue couch", [["The puppy hid", "N"], ["hid behind", "C"], ["behind the big", "C"]]],
  ["A bird built a nest near our window.", "near our window", [["A bird built a nest", "N"], ["built a nest", "N"], ["nest near", "C"]]],
  ["The ball rolled into the deep puddle.", "into the deep puddle", [["The ball rolled", "N"], ["rolled into", "C"], ["into the deep", "C"]]],
  ["Before dinner, Mia washed her hands.", "Before dinner", [["Mia washed her hands", "N"], ["washed her", "N"], ["Before", "C"]]],
  ["The fish swam through the colorful coral.", "through the colorful coral", [["The fish swam", "N"], ["swam through", "C"], ["the colorful", "N"]]],
  ["Grandma sat beside the fireplace.", "beside the fireplace", [["Grandma sat", "N"], ["sat beside", "C"], ["Grandma", "N"]]],
  ["The parade marched down Main Street.", "down Main Street", [["The parade marched", "N"], ["marched down", "C"], ["The parade", "N"]]],
  ["The rocket zoomed toward the moon.", "toward the moon", [["The rocket zoomed", "N"], ["zoomed toward", "C"], ["The rocket", "N"]]],
  ["Tia found her shoe beneath the bed.", "beneath the bed", [["Tia found her shoe", "N"], ["found her", "N"], ["shoe beneath", "C"]]],
  ["The ducks swam around the little island.", "around the little island", [["The ducks swam", "N"], ["swam around", "C"], ["around the little", "C"]]],
  ["Since breakfast, Leo has read three chapters.", "Since breakfast", [["Leo has read three chapters", "N"], ["has read", "N"], ["Since", "C"]]],
  ["The cat jumped onto the kitchen counter.", "onto the kitchen counter", [["The cat jumped", "N"], ["jumped onto", "C"], ["onto the kitchen", "C"]]],
];
/* opposites */
const V25EN9_PO = [["above", "below"], ["inside", "outside"], ["before", "after"], ["over", "under"], ["up", "down"], ["into", "out of"], ["on", "off"], ["in front of", "behind"], ["with", "without"], ["toward", "away from"]];
const V25EN9_PM = { above: "higher than", below: "lower than", inside: "within something", outside: "not within something", before: "earlier than", after: "later than", over: "higher than or across", under: "lower than", up: "toward a higher place", down: "toward a lower place", into: "going inside", "out of": "going from inside", on: "resting on top of", off: "away from the top of", "in front of": "ahead of", behind: "at the back of", with: "together with", without: "not having", toward: "moving closer to", "away from": "moving farther from", beside: "next to", across: "from one side to the other", between: "in the middle of two things", through: "in one side and out the other", around: "in a circle about", near: "close to", along: "following the length of" };
const V25EN9_PN = ["beside", "across", "between", "through", "around", "near", "along"];
addBank(9, "english", "prepositions", 0.3, function () {
  const k = Math.random();
  if (k < 0.37) {
    const [s, a] = pick(V25EN9_PT);
    return V25EN9_mk({ q: `Which preposition fits?<div class="sentence">${V25EN9_bl(s)}</div>`, say: `Which preposition fits? ${V25EN9_sb(s)}`, a, w: ["in", "on", "at"].filter(x => x !== a).map(x => [x, `Use “${a}” here; “${x}” is for ${V25EN9_PU[x]}.`]), why: `Use “${a}” for ${V25EN9_PU[a]}: ${s.replace("___", a)}`, k: "pt" + s, big: 1 });
  }
  if (k < 0.7) {
    const [s, ph, ws] = pick(V25EN9_PP);
    return V25EN9_mk({ q: `Which group of words is the <b>prepositional phrase</b>?<div class="sentence">${s}</div>`, say: `Which group of words is the prepositional phrase? ${s}`, a: ph, w: ws.map(([x, c]) => [x, c === "N" ? `“${x}” has no preposition in it.` : `“${x}” stops too soon; the phrase is “${ph}”.`]), why: `“${ph}” starts with a preposition and ends with a noun.`, k: "pp" + s });
  }
  const [x, y] = pick(V25EN9_PO), flip = Math.random() < 0.5, w0 = flip ? y : x, a = flip ? x : y;
  const w = shuffle(V25EN9_PN).slice(0, 3).map(p => [p, `“${p}” means ${V25EN9_PM[p]}; the opposite of “${w0}” is “${a}”.`]);
  return V25EN9_mk({ q: `Which preposition means the <b>opposite</b> of <b>${w0}</b>?`, say: `Which preposition means the opposite of ${w0}?`, a, w, why: `“${w0}” means ${V25EN9_PM[w0]}, and “${a}” means ${V25EN9_PM[a]}.`, k: "po" + w0, big: 1 });
});

/* ---------- Cause & Effect: [sentence, cause, effect, detail the sentence never gives] ---------- */
const V25EN9_CE = [
  ["Because the river flooded, the bridge was closed.", "the river flooded", "the bridge was closed", "the bridge was old"],
  ["The cookies burned since the oven was too hot.", "the oven was too hot", "the cookies burned", "the cookies were chocolate chip"],
  ["Lila forgot to water her fern, so its leaves turned brown.", "Lila forgot to water her fern", "its leaves turned brown", "the fern got too much sun"],
  ["The power went out during the storm. As a result, we used flashlights.", "the power went out", "we used flashlights", "the flashlights were new"],
  ["Our team practiced every afternoon; therefore, we won the tournament.", "our team practiced every afternoon", "we won the tournament", "the other team was late"],
  ["The road was covered in ice, so the buses ran late.", "the road was covered in ice", "the buses ran late", "the bus drivers were sick"],
  ["Max sneezed all day because he played with a dusty old rug.", "he played with a dusty old rug", "Max sneezed all day", "Max had a cold"],
  ["Since the store ran out of milk, we bought juice instead.", "the store ran out of milk", "we bought juice instead", "we wanted to try a new juice"],
  ["The baby woke up because the dog barked loudly.", "the dog barked loudly", "the baby woke up", "the baby was hungry"],
  ["Due to the heavy rain, the soccer field turned into mud.", "the heavy rain", "the soccer field turned into mud", "the soccer game was fun"],
  ["Ivy wore her heavy coat because it was freezing outside.", "it was freezing outside", "Ivy wore her heavy coat", "Ivy's coat was new"],
  ["The tomatoes grew huge, since they got plenty of sun and water.", "they got plenty of sun and water", "the tomatoes grew huge", "the tomatoes were picked early"],
  ["Zane left the gate open, so the goats wandered into the garden.", "Zane left the gate open", "the goats wandered into the garden", "the goats were hungry"],
  ["The library got new computers. As a result, more kids came to visit.", "the library got new computers", "more kids came to visit", "the library was painted"],
  ["Because Nora read the directions carefully, her model volcano worked.", "Nora read the directions carefully", "her model volcano worked", "Nora's volcano was very big"],
  ["The balloon popped because it touched a sharp branch.", "it touched a sharp branch", "the balloon popped", "the balloon was red"],
  ["Theo stayed up very late, so he yawned all through class.", "Theo stayed up very late", "he yawned all through class", "class was boring"],
  ["Since the wind was strong, our sailboat moved fast.", "the wind was strong", "our sailboat moved fast", "the sailboat was new"],
  ["The puppy's paws were muddy, so there were prints all over the floor.", "the puppy's paws were muddy", "there were prints all over the floor", "the floor was just cleaned"],
  ["We could not see the stars because clouds covered the sky.", "clouds covered the sky", "we could not see the stars", "the stars were too far away"],
  ["Rosa saved her allowance for months; as a result, she bought a new scooter.", "Rosa saved her allowance for months", "she bought a new scooter", "Rosa's old scooter broke"],
  ["The ice cream dripped down my arm because the sun was so hot.", "the sun was so hot", "the ice cream dripped down my arm", "I ate the ice cream too slowly"],
  ["The class cheered because the principal announced an extra recess.", "the principal announced an extra recess", "the class cheered", "the class finished a test"],
  ["The bridge was too low, so the tall truck had to turn around.", "the bridge was too low", "the tall truck had to turn around", "the truck driver was lost"],
  ["Since Jada studied her spelling words, she got every word right.", "Jada studied her spelling words", "she got every word right", "the words were easy"],
  ["Our car got a flat tire because it ran over a nail.", "it ran over a nail", "our car got a flat tire", "the tire was old"],
  ["The milk smelled sour, so Dad poured it down the sink.", "the milk smelled sour", "Dad poured it down the sink", "Dad does not like milk"],
  ["Because it snowed all night, we built a snowman in the morning.", "it snowed all night", "we built a snowman in the morning", "we got new mittens"],
  ["The toddler was cranky because she skipped her nap.", "she skipped her nap", "the toddler was cranky", "the toddler was hungry"],
  ["The kids got soaked since they forgot their umbrellas.", "they forgot their umbrellas", "the kids got soaked", "the kids jumped in a pool"],
  ["A tree fell across the road, so we took a different way home.", "a tree fell across the road", "we took a different way home", "we were late for dinner"],
];
addBank(9, "english", "causeeffect", 0.3, function () {
  const i = R(0, V25EN9_CE.length - 1), [s, c, e, x] = V25EN9_CE[i], askC = Math.random() < 0.5, C = cap(c), E = cap(e), X = cap(x);
  const w = askC ? [[E, "That part is what happened, the effect. The cause is why it happened."], [X, `The sentence never says that ${x}.`]]
    : [[C, "That part tells why it happened, so it's the cause, not the effect."], [X, `The sentence never says that ${x}.`]];
  return V25EN9_mk({ q: `<div class="quote">${s}</div>Which part is the <b>${askC ? "cause" : "effect"}</b>?`, say: `${s} Which part is the ${askC ? "cause" : "effect"}?`, a: askC ? C : E, w, why: askC ? `“${C}” is why it happened. It caused this: ${e}.` : `“${E}” is what happened because ${c}.`, k: (askC ? "cc" : "ce") + i });
});

/* ---------- Parts of Speech ---------- */
/* same word, two jobs: [word, [verb sentences], [noun sentences]] */
const V25EN9_PS = [
  ["paint", ["We paint the fence every spring.", "Let's paint a rainbow on the poster."], ["The paint is still wet.", "Mia spilled blue paint on her shirt."]],
  ["jump", ["Frogs jump from lily pad to lily pad.", "I can jump over the puddle."], ["That was a huge jump!", "The horse cleared the last jump."]],
  ["plant", ["We plant beans in the garden.", "Let's plant a tree for Earth Day."], ["The plant needs more water.", "A tall plant grows by the window."]],
  ["fish", ["Grandpa likes to fish at the lake.", "We fish off the dock in summer."], ["The fish swam in circles.", "I drew a fish with orange fins."]],
  ["smell", ["I smell fresh bread!", "Dogs smell everything on a walk."], ["The smell of popcorn filled the room.", "Skunks have a strong smell."]],
  ["dance", ["We dance in the kitchen on Fridays.", "The kids dance to the music."], ["The dance had a fun ending.", "Our class learned a new dance."]],
  ["kick", ["Kick the ball to Ellie!", "Ducks kick their feet to swim."], ["Her kick sent the ball flying.", "That was a great kick."]],
  ["rain", ["It will rain all weekend.", "Those dark clouds tell me it might rain soon."], ["The rain tapped on the roof.", "We splashed in the rain."]],
  ["watch", ["We watch birds from the porch.", "Please watch the baby while I cook."], ["Dad's watch has a blue band.", "My watch says it is noon."]],
  ["ride", ["I ride my bike to the park.", "We ride the bus to school."], ["The ride was bumpy.", "The roller coaster ride was fast."]],
  ["brush", ["Brush your teeth before bed.", "I brush the horse's mane."], ["The brush is full of hair.", "Pass me the small brush."]],
  ["drink", ["Cats drink water from a bowl.", "We drink cocoa when it snows."], ["Can I have a drink of water?", "Lemonade is my favorite drink."]],
  ["hug", ["I hug my grandma when she visits.", "Let's hug before you go."], ["Mom gave me a big hug.", "A hug can cheer up a friend."]],
  ["call", ["Call me when you get home.", "We call our dog Biscuit."], ["I got a call from Aunt Rosa.", "The owl's call echoed in the woods."]],
  ["race", ["Let's race to the big oak tree!", "The kids race their toy cars."], ["Maya won the race.", "The race starts at noon."]],
  ["visit", ["We visit the zoo every fall.", "Our cousins visit in July."], ["The visit was short but fun.", "Grandpa enjoyed our visit."]],
];
const V25EN9_PW = {
  noun: ["elephant", "kitchen", "pencil", "mountain", "library", "banana", "ocean", "village", "teacher", "giraffe", "kitten", "sandwich", "airport", "island", "pillow"],
  verb: ["arrive", "borrow", "decide", "explore", "choose", "carry", "bring", "forgive", "explain", "listen", "imagine", "wander", "describe", "collect", "invent"],
  adjective: ["gigantic", "fuzzy", "noisy", "tiny", "gentle", "hungry", "sticky", "shiny", "curious", "fierce", "grumpy", "delicious", "chilly", "enormous", "polite"],
  adverb: ["quickly", "softly", "loudly", "never", "often", "always", "carefully", "rarely", "happily", "sometimes", "bravely", "quietly", "neatly", "soon", "gladly"],
};
const V25EN9_PJ = { noun: "names a person, place, or thing", verb: "shows an action", adjective: "describes a noun", adverb: "tells how, when, or how often" };
const V25EN9_an = p => (/^[aeiou]/.test(p) ? "an " : "a ") + p;
addBank(9, "english", "partsofspeech", 0.3, function () {
  if (Math.random() < 0.5) {
    const [wd, V, N] = pick(V25EN9_PS), askV = Math.random() < 0.5, a = pick(askV ? V : N), w = (askV ? N : V).map(x => [x, askV ? `Here “${wd}” names a thing, so it's a noun.` : `Here “${wd}” is an action someone does, so it's a verb.`]);
    return V25EN9_mk({ q: `In which sentence is <b>${wd}</b> used as a <b>${askV ? "verb" : "noun"}</b>?`, say: `In which sentence is ${wd} used as a ${askV ? "verb" : "noun"}?`, a, w, why: askV ? `In “${V25EN9_nd(a)}”, ${wd} is an action, so it's a verb.` : `In “${V25EN9_nd(a)}”, ${wd} names a thing, so it's a noun.`, k: "ps" + a });
  }
  const pos = pick(Object.keys(V25EN9_PW)), a = pick(V25EN9_PW[pos]);
  const w = shuffle(Object.keys(V25EN9_PW).filter(x => x !== pos)).map(p => { const x = pick(V25EN9_PW[p]); return [x, `“${x}” is ${V25EN9_an(p)}; it ${V25EN9_PJ[p]}.`]; });
  return V25EN9_mk({ q: `Which word is ${/^a/.test(pos) ? "an" : "a"} <b>${pos}</b>?`, say: `Which word is ${V25EN9_an(pos)}?`, a, w, why: `“${a}” is ${V25EN9_an(pos)}; it ${V25EN9_PJ[pos]}.`, k: "pw" + pos + a, big: 1 });
});

/* ---------- Word Roots ---------- */
/* [word, root, root meaning, word meaning, [wrong meanings]] */
const V25EN9_RT = [
  ["hydrant", "hydr", "water", "a pipe that gives water for putting out fires", ["a tool for cutting wood", "a kind of warm hat"]],
  ["dehydrated", "hydr", "water", "needing water", ["very sleepy", "much too loud"]],
  ["monorail", "mono", "one", "a train that runs on one rail", ["a fence made of rails", "a rail that is very old"]],
  ["monotone", "mono", "one", "a voice that stays on one note", ["a song with loud drums", "a very fast voice"]],
  ["chronological", "chron", "time", "in time order", ["in size order", "in color order"]],
  ["chronometer", "chron", "time", "a very exact clock", ["a ruler for measuring length", "a scale for weighing things"]],
  ["terrain", "terr", "land", "the shape of the land in an area", ["a kind of storm cloud", "the noise a train makes"]],
  ["territory", "terr", "land", "an area of land that belongs to someone", ["a group of singers", "a kind of fruit"]],
  ["inscribe", "scrib", "write", "to write or carve words on something", ["to break into pieces", "to swim underwater"]],
  ["scribble", "scrib", "write", "to write or draw messily", ["to jump up and down", "to sleep lightly"]],
  ["transform", "form", "shape", "to change shape", ["to carry across a river", "to sing loudly"]],
  ["formation", "form", "shape", "a shape or pattern made by things", ["a long sleep", "a kind of drink"]],
  ["credible", "cred", "believe", "able to be believed", ["able to be eaten", "able to fly"]],
  ["incredible", "cred", "believe", "hard to believe", ["very easy to see", "very quiet"]],
  ["conductor", "duct", "lead", "a person who leads a band or orchestra", ["a person who builds houses", "a person who grows food"]],
  ["transmit", "mit", "send", "to send from one place to another", ["to fix something broken", "to paint a picture"]],
  ["mission", "miss", "send", "a job someone is sent to do", ["a loud party", "a soft blanket"]],
  ["deposit", "pos", "put", "to put something down or in", ["to run quickly", "to laugh loudly"]],
  ["signature", "sign", "mark", "your name written as your mark", ["a kind of song", "a type of shoe"]],
  ["quadruple", "quad", "four", "four times as many", ["half as many", "ten times as many"]],
  ["pentagon", "pent", "five", "a shape with five sides", ["a shape with eight sides", "a round shape"]],
  ["semicircle", "semi", "half", "half of a circle", ["a circle inside a square", "two circles side by side"]],
  ["megaphone", "mega", "large", "a cone that makes your voice much louder", ["a tiny phone you wear", "a quiet whisper"]],
  ["zoology", "zoo", "animal", "the study of animals", ["the study of rocks", "the study of stars"]],
  ["anniversary", "ann", "year", "a special date remembered every year", ["something that happens every week", "a surprise for no reason"]],
  ["reverse", "vers", "turn", "to turn back the other way", ["to go faster", "to stop and rest"]],
  ["final", "fin", "end", "the last one, at the end", ["the very first one", "the middle one"]],
  ["gradual", "grad", "step", "happening step by step, little by little", ["happening all at once", "never happening"]],
];
/* shared root: [root, meaning, three words] */
const V25EN9_RS = [
  ["hydr", "water", ["hydrant", "dehydrated", "hydroplane"]], ["mono", "one", ["monorail", "monotone", "monologue"]], ["chron", "time", ["chronological", "chronometer", "synchronize"]],
  ["terr", "land", ["terrain", "territory", "terrarium"]], ["scrib", "write", ["scribble", "inscribe", "describe"]], ["form", "shape", ["transform", "formation", "uniform"]],
  ["cred", "believe", ["credible", "incredible", "credit"]], ["duct", "lead", ["conductor", "aqueduct", "product"]], ["mit", "send", ["transmit", "submit", "admit"]],
  ["pos", "put", ["deposit", "position", "compose"]], ["sign", "mark", ["signature", "signal", "design"]], ["quad", "four", ["quadruple", "quadrilateral", "quadrant"]],
  ["semi", "half", ["semicircle", "semifinal", "semicolon"]], ["zoo", "animal", ["zoology", "zookeeper", "zoologist"]], ["fin", "end", ["final", "finish", "infinite"]],
  ["grad", "step", ["gradual", "graduate", "grade"]],
];
addBank(9, "english", "roots", 0.3, function () {
  const k = Math.random();
  if (k < 0.4) {
    const [w, r, rm, m, d] = pick(V25EN9_RT);
    return V25EN9_mk({ q: `The root <b>${r}</b> means “${rm}.” What does <b>${w}</b> most likely mean?`, say: `The root ${r.split("").join(" ")} means ${rm}. What does ${w} most likely mean?`, vis: hw(w.replace(r, `<b class="hl">${r}</b>`)), a: m, w: d.map(x => [x, `That doesn't match “${rm},” the meaning of ${r}.`]), why: `${r} means ${rm}, so ${w} means ${m}.`, k: "rm" + w });
  }
  if (k < 0.7) {
    const i = R(0, V25EN9_RT.length - 1), [w, r, rm, m] = V25EN9_RT[i];
    const others = shuffle(V25EN9_RT.filter((x, j) => j !== i && x[1] !== r && x[2] !== rm)).slice(0, 3).map(x => [x[0], `“${x[0]}” means ${x[3]}, which is something else.`]);
    return V25EN9_mk({ q: `Which word means <b>${m}</b>?`, say: `Which word means ${m}?`, a: w, w: others, why: `${w} has ${r}, which means ${rm}. It means ${m}.`, k: "rw" + w, big: 1 });
  }
  const i = R(0, V25EN9_RS.length - 1), [r, rm, ws] = V25EN9_RS[i];
  const cand = shuffle(V25EN9_RS.filter((x, j) => j !== i).map(x => x[0])).filter(x => !ws.every(y => y.includes(x))).slice(0, 3);
  const w = cand.map(x => { const has = ws.filter(y => y.includes(x)); return [x, has.length ? `“${x}” is in ${has.join(" and ")}, but not in all three words.` : `None of these words has “${x}” in it.`]; });
  return V25EN9_mk({ q: `Which root do all three words share?<div class="sentence">${ws.join(", ")}</div>`, say: `Which root do all three words share? ${ws.join(", ")}`, a: r, w, why: `${ws.join(", ")} all have ${r}, which means ${rm}.`, k: "rs" + r, big: 1 });
});

/* ---------- Linking Words: [first idea, second idea (lowercase), link, [wrong links]] ---------- */
const V25EN9_LK = [
  ["The puppy was tired", "it curled up on its bed", "so", ["because", "or"]],
  ["The library was closed", "we went to the park instead", "so", ["because", "or"]],
  ["Ella's shoes were muddy", "she left them by the door", "so", ["because", "or"]],
  ["The soup was too hot", "Grandpa blew on it", "so", ["because", "or"]],
  ["We missed the bus", "Mom drove us to school", "so", ["because", "or"]],
  ["The glue was still wet", "we waited before touching the poster", "so", ["because", "or"]],
  ["Our classroom was cold", "Mr. Park turned on the heater", "so", ["because", "or"]],
  ["The rain stopped", "we went outside to play", "so", ["because", "or"]],
  ["Sara's kite got stuck in a tree", "her dad got it down", "so", ["because", "or"]],
  ["Theo wore sunglasses", "the sun was very bright", "because", ["so", "but", "or"]],
  ["The plant drooped", "nobody had watered it", "because", ["so", "but", "or"]],
  ["We cheered loudly", "our team scored a goal", "because", ["so", "but", "or"]],
  ["Ana couldn't open the jar", "the lid was stuck", "because", ["so", "but", "or"]],
  ["The streets were wet", "it had rained all night", "because", ["so", "but", "or"]],
  ["Kai took a nap", "he was sleepy after the long trip", "because", ["so", "but", "or"]],
  ["The baby giggled", "the puppy licked her toes", "because", ["so", "but", "or"]],
  ["The puzzle was hard", "Noah finished it anyway", "but", ["so", "because", "or"]],
  ["The cake looked burnt", "it tasted delicious", "but", ["so", "because", "or"]],
  ["Jen is small", "she can lift heavy boxes", "but", ["so", "because", "or"]],
  ["I wanted to swim", "the pool was closed", "but", ["so", "because", "or"]],
  ["Max studied hard", "he still missed one word", "but", ["so", "because", "or"]],
  ["The movie was long", "it never felt boring", "but", ["so", "because", "or"]],
  ["You can read a book", "you can draw a picture", "or", ["so", "because"]],
  ["We can walk to the park", "we can ride our bikes", "or", ["so", "because"]],
  ["You can use a red marker", "you can use a blue one", "or", ["so", "because"]],
  ["We could bake cookies", "we could make muffins", "or", ["so", "because"]],
  ["Leo fed the cat", "Mia walked the dog", "and", ["so", "because", "or"]],
  ["Grandma knitted a scarf", "she made a matching hat", "and", ["because", "or"]],
  ["The zoo has lions", "it has penguins too", "and", ["so", "because", "or"]],
  ["We packed sandwiches", "we filled our water bottles", "and", ["because", "or"]],
  ["The bread smelled delicious", "we each ate a slice", "so", ["because", "or"]],
  ["The bike tire was flat", "it had a nail in it", "because", ["so", "but", "or"]],
  ["The test was long", "Ava finished early", "but", ["so", "because", "or"]],
];
const V25EN9_LJ = { so: "shows a result", because: "gives a reason", but: "shows a contrast", and: "adds another idea", or: "gives a choice" };
const V25EN9_LN = { so: "show a result", because: "give a reason", but: "show a contrast", and: "add another idea", or: "give a choice" };
const V25EN9_lc = A => /^(The|Our|We)\b/.test(A) ? A.charAt(0).toLowerCase() + A.slice(1) : A;
const V25EN9_join = (A, b, l) => l === "because" ? `${A} because ${b}.` : `${A}, ${l} ${b}.`;
const V25EN9_lwhy = (A, b, l, w) => w === "because" && l === "so" ? `That's backward: “${V25EN9_lc(A)}” is what caused “${b}”.`
  : w === "so" && l === "because" ? `That's backward: “${b}” is what caused “${V25EN9_lc(A)}”.`
  : w === "so" ? `“so” would mean the first idea caused the second, and it didn't.`
  : w === "because" ? `“because” would mean the second idea caused the first, and it didn't.`
  : w === "but" ? "“but” shows a contrast or surprise, and these ideas don't contrast."
  : w === "or" ? "“or” gives a choice, and these ideas aren't choices." : null;
addBank(9, "english", "linking", 0.3, function () {
  const i = R(0, V25EN9_LK.length - 1), [A, b, l, ws] = V25EN9_LK[i], two = `${A}. ${cap(b)}.`, a = V25EN9_join(A, b, l);
  if (Math.random() < 0.5) {
    const w = shuffle(ws).slice(0, 3).map(x => [V25EN9_join(A, b, x), V25EN9_lwhy(A, b, l, x)]);
    return V25EN9_mk({ q: "Which sentence joins these two ideas <b>best</b>?", say: `${two} Which sentence joins these two ideas best?`, vis: `<div class="quote">${two}</div>`, a, w, why: `“${l}” ${V25EN9_LJ[l]}: ${a}`, k: "lj" + i });
  }
  const w = shuffle(Object.keys(V25EN9_LJ).filter(x => x !== l)).slice(0, 3).map(x => [V25EN9_LJ[x], `Here “${l}” ${V25EN9_LJ[l]}; it doesn't ${V25EN9_LN[x]}.`]);
  return V25EN9_mk({ q: `What job does <b>${l}</b> do in this sentence?<div class="sentence">${a.replace(new RegExp(`\\b${l}\\b`), `<b class="hl">${l}</b>`)}</div>`, say: `${a} What job does ${l} do in this sentence?`, a: V25EN9_LJ[l], w, why: `“${l}” ${V25EN9_LJ[l]} in this sentence.`, k: "lb" + i });
});

/* ---------- Point of View ---------- */
/* who is telling it: [first-person passage, narrator, [[wrong narrator, reason]]] */
const V25EN9_NR = [
  ["I waited by the front door all afternoon, my tail thumping on the floor. When I heard the car, I barked twice and spun in a circle. My girl was finally home from school!", "a dog", [["a cat", "The narrator barked twice, and cats don't bark."], ["the girl's teacher", "The narrator has a tail, so it isn't a person."], ["the girl", "The girl is coming home; the narrator was waiting for her."]]],
  ["Every morning, I stretch my roots deep into the soil and lift my leaves toward the sun. Birds build nests in my branches. I have stood in this park for one hundred years.", "an old tree", [["a bird", "Birds build nests in the narrator's branches, so the narrator isn't a bird."], ["a park worker", "The narrator has roots and leaves, so it isn't a person."], ["a little flower", "The narrator has branches and has stood for one hundred years."]]],
  ["I blew my whistle, and the players froze. “Foul on number seven,” I called. Then I handed the ball to the other team.", "a referee", [["player number seven", "The narrator called a foul on number seven, so it's someone else."], ["a fan in the stands", "Fans don't blow whistles and call fouls in a game."], ["the school nurse", "The narrator is running the game, not helping sick kids."]]],
  ["I checked Rex's ears and listened to his heartbeat. Then I gave him a treat for being so calm. His owner smiled and clipped on his leash.", "an animal doctor", [["Rex", "The narrator gave Rex a treat, so the narrator isn't Rex."], ["Rex's owner", "The owner is someone else who clipped on the leash."], ["a mail carrier", "The narrator checked Rex's ears and heartbeat, like a vet."]]],
  ["I stood at the front of the bus and waved as each child climbed the steps. Once everyone was seated, I checked my mirrors and pulled away from the curb.", "a bus driver", [["a student", "The narrator checked the mirrors and pulled away, so they drive the bus."], ["a crossing guard", "A crossing guard doesn't drive; the narrator pulled the bus away."], ["a parent at the bus stop", "The narrator was on the bus, not waiting at the stop."]]],
  ["I hatched from a tiny egg on a milkweed leaf. I munched and munched until I was fat and striped. Soon I will wrap myself in a chrysalis.", "a caterpillar", [["a bird", "Birds don't make a chrysalis; caterpillars do."], ["a gardener", "The narrator hatched from an egg on a leaf, so it isn't a person."], ["a milkweed leaf", "The narrator munched on the leaf, so it isn't the leaf."]]],
  ["I rolled the dough flat and sprinkled flour on the counter. When the timer beeped, I pulled forty warm loaves from the big oven and set them in the shop window.", "a baker", [["a customer", "The narrator made the bread, not just bought it."], ["a farmer", "The narrator baked loaves in an oven for a shop window."], ["a painter", "The narrator rolled dough and baked bread, not painted."]]],
  ["I sat on the shelf for years, collecting dust. Then a girl pulled me down, opened my cover, and read my pages until the moon came up.", "a book", [["the girl", "The girl pulled the narrator down, so the narrator is something else."], ["the shelf", "The narrator sat on the shelf, so it isn't the shelf."], ["a lamp", "The narrator has a cover and pages, like a book."]]],
  ["I climbed the ladder with the hose over my shoulder. Smoke poured from the window, but my helmet and mask kept me safe. Soon the flames were out.", "a firefighter", [["a neighbor watching", "The narrator climbed the ladder with the hose, not just watched."], ["a builder", "The narrator put out flames with a hose."], ["a doctor", "The narrator sprayed a hose at flames, which is a firefighter's job."]]],
  ["I spun my web between two branches, then waited very still. When a fly buzzed into the sticky threads, I hurried across to check my catch.", "a spider", [["the fly", "The fly got caught in the narrator's web."], ["a bird", "Birds don't spin sticky webs to catch flies."], ["a branch", "The web was between two branches, so the narrator isn't a branch."]]],
  ["I tapped my baton, and the room went quiet. Then I raised my arms, and the violins began to play the first song of the concert.", "an orchestra conductor", [["a violin player", "The violins started when the narrator raised their arms."], ["someone in the audience", "The narrator tapped a baton and led the music."], ["a singer", "The narrator led the players with a baton, not sang."]]],
  ["I paddled across the pond with my ducklings in a line behind me. When a dog barked on the shore, I quacked loudly so they would stay close.", "a mother duck", [["a duckling", "The ducklings followed behind the narrator."], ["the dog", "The dog barked on the shore; the narrator quacked."], ["a frog", "Frogs don't quack or lead ducklings."]]],
  ["I poured water into tiny cups, and the runners grabbed them as they raced past my table. Some shouted thank you between breaths.", "a helper at a race", [["a runner", "The runners raced past the narrator's table."], ["a lifeguard", "The narrator handed out water at a race, not at a pool."], ["a waiter at a restaurant", "The cups went to runners racing past, not diners."]]],
  ["I gathered the class on the rug and opened a big picture book. “Today we will learn about volcanoes,” I said, as twenty faces looked up at me.", "a teacher", [["a student", "The narrator is teaching the class, so they aren't a student."], ["a volcano", "The narrator is reading a book about volcanoes to a class."], ["a bus driver", "The narrator is teaching a class on the rug."]]],
  ["I hid acorns under the leaves and dirt all fall. Now that snow covers the ground, I sniff around, trying to remember where I put them.", "a squirrel", [["a fish", "Fish can't hide acorns under leaves on land."], ["a farmer", "The narrator hid acorns in the dirt and sniffs for them, like a squirrel."], ["the snow", "The snow covers the ground; the narrator is looking for acorns."]]],
];
/* first person → third person templates: {N} first mention, {s} later subject, {P} possessive, {O} object */
const V25EN9_PV = [
  "{N} packed {P} lunch and walked to the bus stop.", "{N} found a shiny shell and put it in {P} pocket.", "{N} lost {P} mitten in the snow, so Dad helped {O} look for it.",
  "{N} tripped on the stairs, but {P} brother helped {O} up.", "{N} laughed when the puppy licked {P} face.", "{N} carried {P} science project carefully into the gym.",
  "{N} pulled {P} hood over {P} head when the rain started.", "{N} baked muffins with {P} aunt and gave one to {P} teacher.", "{N} kept reading past bedtime because {s} loved the book.",
  "{N} planted sunflower seeds, and {s} watered them every day.", "{N} waved to {P} best friend from the top of the slide.", "{N} cleaned {P} room before {P} cousins came over.",
  "{N} practiced {P} lines so {s} would be ready for the play.", "{N} built a snowman and gave it {P} old scarf.", "{N} heard the timer beep, so {s} took the cookies out with Mom.",
  "{N} spilled juice on {P} homework and had to copy it again.", "{N} fed {P} goldfish and checked {P} plant before school.", "{N} drew a map of {P} neighborhood for class.",
  "{N} learned to ride {P} bike when {s} was six.", "{N} shared {P} umbrella with a friend on the walk home.", "{N} hung {P} painting on the fridge so everyone could see it.",
  "{N} wrote a letter to {P} grandma and added a drawing.", "{N} tied {P} shoes tightly before the big race.", "{N} found {P} lost puppy hiding under the porch.",
  "{N} sang {P} favorite song while {s} washed the dishes.", "{N} counted {P} coins and bought a kite with them.",
];
const V25EN9_PF1 = { N: "I", s: "I", P: "my", O: "me" }, V25EN9_PYOU = { N: "you", s: "you", P: "your", O: "you" };
const V25EN9_PWHO = [["Mia", "she", "her", "her"], ["Ava", "she", "her", "her"], ["Rosa", "she", "her", "her"], ["Leo", "he", "his", "him"], ["Sam", "he", "his", "him"], ["Omar", "he", "his", "him"]];
const V25EN9_pf = (t, w) => { const s = t.replace(/\{(\w)\}/g, (_, k) => w[k]); return s.charAt(0).toUpperCase() + s.slice(1); };
addBank(9, "english", "pov", 0.3, function () {
  const k = Math.random();
  if (k < 0.35) {
    const [p, a, w] = pick(V25EN9_NR);
    return V25EN9_mk({ q: "This story is told in first person. Who is most likely telling it?", say: `${p} This story is told in first person. Who is most likely telling it?`, vis: passage(p), a, w, why: `The clues in the story fit ${a}, the “I” who is telling it.`, k: "pn" + a });
  }
  const i = R(0, V25EN9_PV.length - 1), T = V25EN9_PV[i], [nm, s3, p3, o3] = pick(V25EN9_PWHO), third = { N: nm, s: s3, P: p3, O: o3 };
  const first = V25EN9_pf(T, V25EN9_PF1), ans3 = V25EN9_pf(T, third);
  if (k < 0.7) {
    const mix1 = V25EN9_pf(T, { N: nm, s: "I", P: "my", O: "me" }), mix2 = V25EN9_pf(T, { N: "I", s: s3, P: p3, O: o3 }), you = V25EN9_pf(T, V25EN9_PYOU);
    const fw = /\{P\}/.test(T) ? "my" : /\{O\}/.test(T) ? "me" : "I";
    return V25EN9_mk({ q: `Which sentence retells this in <b>third person</b>, about ${nm}?`, say: `${first} Which sentence retells this in third person, about ${nm}?`, vis: `<div class="quote">${first}</div>`, a: ans3, w: [[mix1, `It still uses “${fw}”, so it mixes in first person.`], [mix2, "It still starts with “I”, so the narrator is still in the story."], [you, "“You” talks to the reader; that is second person, not third."]], why: `It tells about ${nm} using ${[...new Set([/\{s\}/.test(T) ? s3 : "", /\{P\}/.test(T) ? p3 : "", /\{O\}/.test(T) ? o3 : ""].filter(Boolean))].map(x => `“${x}”`).join(" and ")}, so it's third person.`, k: "pt" + i + nm });
  }
  const askFirst = Math.random() < 0.5, others = shuffle(V25EN9_PV.filter((_, j) => j !== i)).slice(0, 3);
  const a = askFirst ? first : ans3, w = others.map(t => askFirst ? [V25EN9_pf(t, third), `It has no “I”, “me”, or “my”; it tells about ${nm}, so it's third person.`] : [V25EN9_pf(t, V25EN9_PF1), "It uses “I”, so the storyteller is in the story: first person."]);
  return V25EN9_mk({ q: `Which sentence is told in <b>${askFirst ? "first" : "third"} person</b>?`, say: `Which sentence is told in ${askFirst ? "first" : "third"} person?`, a, w, why: askFirst ? "It uses “I”, so the person telling it is in the story." : `It tells about ${nm} with no “I”, so it's third person.`, k: "pc" + (askFirst ? "1" : "3") + i + nm });
});

/* ---------- Fragments & Run-ons ---------- */
/* fix a fragment: [fragment, fixed, [[wrong fix, reason]]] */
const V25EN9_FF = [
  ["Running down the hall.", "Lily was running down the hall.", [["Running down the long hall.", "It still doesn't say who was running."], ["Because Lily was running down the hall.", "Starting with “Because” leaves the thought unfinished."]]],
  ["The big brown bear.", "The big brown bear caught a fish.", [["The big brown bear in the river.", "It still has no verb telling what the bear did."], ["The big brown bear, hungry and wet.", "It describes the bear but never says what it did."]]],
  ["After the game ended.", "After the game ended, we got ice cream.", [["After the long game ended.", "It still starts with “After”, so the thought is unfinished."], ["After the game ended and the fans left.", "It still starts with “After” and never finishes the thought."]]],
  ["Jumped into the cold lake.", "My cousin jumped into the cold lake.", [["Jumped into the very cold lake.", "It still doesn't say who jumped."], ["Jumped and splashed into the cold lake.", "It still doesn't say who jumped and splashed."]]],
  ["A box of crayons on the floor.", "A box of crayons was on the floor.", [["A box of new crayons on the floor.", "It still has no verb telling what happened."], ["On the floor, a box of crayons.", "Moving the words around doesn't add a verb."]]],
  ["When the recess bell rang.", "When the recess bell rang, everyone lined up.", [["When the loud recess bell rang.", "It still starts with “When”, so the thought is unfinished."], ["When the recess bell rang at noon.", "Adding a time doesn't finish the thought that “When” starts."]]],
  ["Because it was pouring rain.", "We stayed inside because it was pouring rain.", [["Because it was pouring rain outside.", "It still starts with “Because” and never says what happened."], ["Because it was pouring rain all day long.", "It still never says what happened because of the rain."]]],
  ["Sat on the porch swing.", "Grandma sat on the porch swing.", [["Sat on the old porch swing.", "It still doesn't say who sat there."], ["Sat quietly on the porch swing.", "It still doesn't say who sat there."]]],
  ["The tiny kitten with white paws.", "The tiny kitten with white paws chased a string.", [["The tiny kitten with soft white paws.", "It still never says what the kitten did."], ["With white paws, the tiny kitten.", "It still has no verb telling what the kitten did."]]],
  ["Until the sun went down.", "We played catch until the sun went down.", [["Until the bright sun went down.", "It starts with “Until” and still leaves the thought unfinished."], ["Until the sun went down behind the hills.", "It still never says what happened until sunset."]]],
  ["Flew over the rooftops.", "A flock of geese flew over the rooftops.", [["Flew high over the rooftops.", "It still doesn't say what flew."], ["Flew over the rooftops and trees.", "It still doesn't say what flew."]]],
  ["If you finish your chores.", "If you finish your chores, we can go to the park.", [["If you finish all your chores.", "It starts with “If” and never says what will happen."], ["If you finish your chores today.", "It still never says what will happen."]]],
  ["The long line at the fair.", "The long line at the fair moved slowly.", [["The long, long line at the fair.", "It still has no verb telling what happened."], ["At the fair, the long line.", "Moving the words around doesn't add a verb."]]],
  ["Since Ben forgot his lunch.", "Since Ben forgot his lunch, Ava shared hers.", [["Since Ben forgot his whole lunch.", "It starts with “Since” and never finishes the thought."], ["Since Ben forgot his lunch at home.", "It still never says what happened next."]]],
  ["Splashing in the muddy puddles.", "The twins were splashing in the muddy puddles.", [["Splashing and laughing in the muddy puddles.", "It still doesn't say who was splashing."], ["Splashing in the big muddy puddles.", "It still doesn't say who was splashing."]]],
  ["My favorite red sweater.", "My favorite red sweater has a hole in it.", [["My favorite soft red sweater.", "It still has no verb telling what happened."], ["My favorite red sweater from Grandma.", "It tells about the sweater but has no verb."]]],
  ["While Dad cooked dinner.", "While Dad cooked dinner, I set the table.", [["While Dad cooked a big dinner.", "It starts with “While” and never finishes the thought."], ["While Dad cooked dinner on the stove.", "It still never says what else happened."]]],
  ["Swam to the bottom of the tank.", "The turtle swam to the bottom of the tank.", [["Swam slowly to the bottom of the tank.", "It still doesn't say who swam."], ["Swam to the very bottom of the tank.", "It still doesn't say who swam."]]],
  ["Under the kitchen table.", "The cat napped under the kitchen table.", [["Under the old kitchen table.", "It still has no subject and no verb."], ["Under the kitchen table all day.", "It still has no subject and no verb."]]],
  ["Climbed to the top of the hill.", "Our class climbed to the top of the hill.", [["Climbed all the way to the top of the hill.", "It still doesn't say who climbed."], ["Climbed to the top of the steep hill.", "It still doesn't say who climbed."]]],
];
/* run-on → joining word: [first part, second part (lowercase), joining word] */
const V25EN9_RJ = [
  ["The bell rang", "we lined up for lunch", "so"], ["Ava loves to draw", "she brings a sketchbook everywhere", "so"], ["Our car wouldn't start", "we walked to the store", "so"],
  ["Leo wanted to play outside", "it was raining too hard", "but"], ["The movie was funny", "we laughed the whole time", "so"], ["I like peaches", "my brother likes plums", "and"],
  ["The kitten was hungry", "it meowed at its bowl", "so"], ["Maya studied her notes", "she still felt nervous", "but"], ["The lights went out", "we turned on a flashlight", "so"],
  ["Sam tried to catch the ball", "it bounced off his glove", "but"], ["The lake was calm", "we went for a canoe ride", "so"], ["My shoes were wet", "I left them on the porch", "so"],
  ["Grandma knits scarves", "Grandpa makes wooden toys", "and"], ["The puzzle had a thousand pieces", "we finished it in one weekend", "but"], ["The garden needed water", "Jin filled the watering can", "so"],
  ["It was my turn to pick", "I chose the board game", "so"], ["We heard thunder", "we hurried inside", "so"], ["The wind was strong", "our kite stayed up for an hour", "so"],
  ["Rosa looked everywhere for her hat", "it was on her head the whole time", "but"], ["Dad made pancakes", "Mom made fresh juice", "and"], ["The baby yawned", "she was ready for her nap", "so"],
  ["Pete ran fast", "he missed the bus anyway", "but"], ["The museum was closed", "we went to the zoo", "so"], ["Ivy plays the drums", "her sister plays the flute", "and"],
  ["The pie smelled great", "it was too hot to eat", "but"],
];
/* find the fragment: [sentences, index of the fragment] */
const V25EN9_FP = [
  [["Our class went to the aquarium.", "We saw sharks and sea turtles.", "A giant tank full of jellyfish.", "It was the best field trip ever."], 2],
  [["Mom made pancakes for breakfast.", "Topped with berries and syrup.", "We ate every single bite.", "Then we washed the dishes."], 1],
  [["The storm lasted all night.", "Thunder shook the windows.", "Because the wind was so strong.", "By morning, the sky was clear."], 2],
  [["Jamal found a lost puppy.", "He checked its collar for a tag.", "Called the number on the tag.", "The owner was so happy."], 2],
  [["Our garden grew huge pumpkins.", "The biggest one weighed fifty pounds.", "We entered it in the county fair.", "Won a blue ribbon."], 3],
  [["Before the race started.", "The runners stretched their legs.", "Then the whistle blew.", "Everyone took off running."], 0],
  [["Nina loves to read.", "She visits the library every week.", "Her favorite books about space.", "She wants to be an astronaut."], 2],
  [["The little boat bobbed on the waves.", "Seagulls circled overhead.", "The salty wind in our faces.", "We waved to people on the shore."], 2],
  [["Dad fixed my bike chain.", "Now it works like new.", "I rode it to the park.", "Faster than ever before."], 3],
  [["When the snow finally melted.", "Little green shoots poked up.", "Birds returned to the trees.", "Spring had arrived."], 0],
  [["Kim built a tall tower of blocks.", "Her baby brother crawled over.", "Knocked it down with one swipe.", "Kim just laughed and built it again."], 2],
  [["We went camping at the lake.", "At night, we roasted marshmallows.", "The stars sparkling above us.", "I didn't want to go home."], 2],
  [["The school play was on Friday.", "Ella played the queen.", "Her shiny gold crown and long cape.", "Everyone clapped at the end."], 2],
  [["The squirrel gathered acorns.", "It hid them under a pile of leaves.", "Saving food for the winter.", "Squirrels are smart planners."], 2],
  [["Our neighbor has a vegetable stand.", "She sells corn and tomatoes.", "Every Saturday morning.", "We always buy something."], 2],
  [["Leah wanted a pet fish.", "She saved her allowance for weeks.", "Finally bought a goldfish.", "She named it Bubbles."], 2],
  [["The fire alarm beeped during class.", "We lined up quietly.", "Walked outside to the field.", "It was only a practice drill."], 2],
  [["Grandpa grows tomatoes in his yard.", "Big, red, and juicy.", "He shares them with the neighbors.", "They make salsa together."], 1],
];
addBank(9, "english", "fragments", 0.3, function () {
  const k = Math.random();
  if (k < 0.35) {
    const [f, a, w] = pick(V25EN9_FF);
    return V25EN9_mk({ q: "This is a fragment. Which choice fixes it into a complete sentence?", say: `${f} This is a fragment. Which choice fixes it into a complete sentence?`, vis: `<div class="quote">${f}</div>`, a, w, why: `“${V25EN9_nd(a)}” has a subject and a verb and shows a complete thought.`, k: "ff" + f });
  }
  if (k < 0.7) {
    const i = R(0, V25EN9_RJ.length - 1), [A, b, l] = V25EN9_RJ[i], ro = `${A} ${b}.`, a = `${A}, ${l} ${b}.`;
    return V25EN9_mk({ q: "Which is the best way to fix this <b>run-on</b> with a joining word?", say: `${ro} Which is the best way to fix this run-on with a joining word?`, vis: `<div class="quote">${ro}</div>`, a, w: [[`${A}, ${b}.`, "A comma alone can't join two complete sentences."], [ro, "Nothing changed, so it's still a run-on."]].concat(/^[a-z]/.test(b) ? [[`${A}. ${b}.`, "The second sentence needs a capital letter at the start."]] : []), why: `A comma plus the joining word “${l}” connects the two complete thoughts.`, k: "fr" + i });
  }
  const i = R(0, V25EN9_FP.length - 1), [ss, fi] = V25EN9_FP[i];
  return V25EN9_mk({ q: "Which group of words in this paragraph is a <b>fragment</b>?", say: `${ss.join(" ")} Which group of words in this paragraph is a fragment?`, vis: passage(ss.join(" ")), a: ss[fi], w: ss.filter((_, j) => j !== fi).map(x => [x, "That one has a subject and a verb and is a complete thought."]), why: `“${V25EN9_nd(ss[fi])}” is missing a part, so it isn't a complete thought.`, k: "fp" + i });
});

