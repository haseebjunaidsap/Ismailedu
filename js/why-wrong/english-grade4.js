/* =====================================================================
   Age 9 English: why a wrong pick is wrong (tag EN9W_)
   Each rule only speaks when it can check its claim against the data.
   ===================================================================== */
const EN9W_low = s => String(s).toLowerCase();
const EN9W_noDot = s => String(s).replace(/[.!?]+$/, "");
const EN9W_qt = q => xPlain(q.q).replace(/\s+([?!.,])/g, "$1");
const EN9W_lc = s => /^(I|I'm|I'll|I've)\b/.test(s) ? s : s.charAt(0).toLowerCase() + s.slice(1);

/* ---------- Suffixes ---------- */
const EN9W_SUFFALL = () => SUFF.concat(EN9_SUFF);
const EN9W_SM = s => EN9_SMEAN[s] ? EN9_SMEAN[s].replace("___", "certain") : null;
whyRule(9, "english", "suffixes", (q, picked) => {
  const qt = EN9W_qt(q), p = xPlain(picked);
  let m = qt.match(/^What does (\w+) mean\?$/);
  if (m) {
    const w = m[1], me = EN9W_SUFFALL().find(x => x[0] === w), hit = EN9W_SUFFALL().filter(x => x[3] === p);
    if (!me || !hit.length || hit.some(x => x[2] !== hit[0][2]) || hit[0][2] === me[2]) return null;
    return `${cap(p)} would be ${hit[0][0]}, with -${hit[0][2]}; ${w} ends in -${me[2]}.`;
  }
  const ps = p.replace(/^-/, ""), psm = EN9W_SM(ps);
  if (!psm) return null;
  m = qt.match(/^Which suffix means "(.+)"\?$/);
  if (m) { const want = m[1].replace("___", "certain"); if (psm === want) return null; return `-${ps} means "${psm}", not "${want}".`; }
  m = qt.match(/^Which suffix turns (\w+) into a word that means "(.+)"\?$/);
  if (m) { const e = EN9W_SUFFALL().find(x => x[1] === m[1] && x[3] === m[2]); if (!e || e[2] === ps) return null; return `-${ps} means "${psm}", which doesn't match "${m[2]}".`; }
  return null;
});

/* ---------- Figurative language ---------- */
const EN9W_FIGTYPE = s => Object.keys(FIG).find(t => FIG[t].includes(s));
const EN9W_FIGDEF = { Simile: "A simile compares two things using “like” or “as”", Metaphor: "A metaphor says one thing IS something else", Personification: "Personification gives human actions to something not human", Hyperbole: "Hyperbole is a huge exaggeration" };
const EN9W_FIGHAS = { Simile: "this compares with “like” or “as”", Metaphor: "this says one thing IS something else", Personification: "this gives a thing a human action", Hyperbole: "this is a huge, silly exaggeration" };
whyRule(9, "english", "figurative", (q, picked) => {
  const s = q.key, t = EN9W_FIGTYPE(s), p = xPlain(picked);
  if (!t || t !== q.ans || !EN9W_FIGDEF[p] || p === t) return null;
  const lk = s.match(/\b(like|as)\b/i);
  if (p === "Simile" && !lk) return "A simile uses “like” or “as” to compare, and this sentence has neither word.";
  if (p === "Metaphor" && t === "Simile" && lk) return `It uses “${lk[1].toLowerCase()}” to compare, and a metaphor doesn't use “like” or “as”.`;
  if (t === "Simile" && !lk) return null;
  return `${EN9W_FIGDEF[p]}, but ${EN9W_FIGHAS[t]}.`;
});

/* ---------- word jobs used by adverbs and prepositions ---------- */
const EN9W_JOB = {};
const EN9W_tag = (job, list) => list.split(" ").forEach(w => { EN9W_JOB[w] = job; });
EN9W_tag("noun", "Saturday Friday July September Aunt baby balloon beach bird birds book boots carrots cat chef children class clothes concert cousin crib dinner dog door eggs fence field fish friend friends garden guests hill hills homework horse juice keys kids ladder leaf leaves lunch museum parade park picnic plane puppy question rabbit rainbow room snail snow squirrel stars show swimmers team town trees tree turtle wind yard table bag ball barn bed bedtime birthday blanket boat bridge clouds coins color cookies cornfield couch curtain cushions dawn diver dock drawer farmer fireplace fireworks flowers forest fridge frog games geese house kite kitten lake lamp lessons library log midnight milk mountain mouse movie noon piano plate pond pool popcorn recess river road rocket roof school School soccer space spider spring store street sunset teeth wall waves shoes");
EN9W_tag("name", "Ava Ben Ella Grandma Grandpa Jin Kai Lena Lisa Maria Mia Noah Omar Ruby Tom Ethan Lily Max Owen Pedro Zoe");
EN9W_tag("verb", "Call Leave Put answered arrived asked ate barked blew carried cheered chopped clean climbed closed coming crawled dove drove finished flew floated folded galloped giggled go going goes hiding hopped lives looked moved painted planted played raced ran reached read sang saw sleeps slept smiled snowed speak starts start swam visit visited waited watch waved whispered jumped appeared bloom brush change closes fell hid hiked laughed marched naps opens practiced rained rolled sailed sat sing stands stood walked zoomed");
EN9W_tag("being", "is are");
EN9W_tag("adjective", "muddy tall red happy sleepy");
EN9W_tag("number", "two nine");
EN9W_tag("preposition", "across along through for");
EN9W_tag("pronoun", "us");
EN9W_tag("owner", "their your");
const EN9W_JOBTXT = {
  noun: w => `“${w}” is a noun; it names a person, place, or thing.`,
  name: w => `“${w}” is a name, so it is a noun.`,
  verb: w => `“${w}” is a verb; it shows the action.`,
  being: w => `“${w}” is a verb, a being word.`,
  adjective: w => `“${w}” is an adjective; it describes a noun.`,
  number: w => `“${w}” is a number word.`,
  preposition: w => `“${w}” is a preposition; it starts a phrase like “${w} the …”.`,
  pronoun: w => `“${w}” is a pronoun; it stands for people.`,
  owner: w => `“${w}” shows who something belongs to.`,
};
/* the sentence inside "Which word is the ___?<div class=sentence>…</div>" */
const EN9W_sent = q => { const m = String(q.q).match(/<div class="sentence">(.*?)<\/div>/); return m ? xPlain(m[1]) : null; };
const EN9W_inSent = (s, w) => new RegExp(`(^|[^A-Za-z'])${w}([^A-Za-z']|$)`).test(s);

/* ---------- Adverbs ---------- */
const EN9W_TELL = { how: "the way something is done", when: "a time", where: "a place" };
whyRule(9, "english", "adverbs", (q, picked) => {
  const p = xPlain(picked), qt = EN9W_qt(q);
  if (/^Which word is the adverb\?/.test(qt)) {
    const s = EN9W_sent(q), j = EN9W_JOB[p];
    if (!s || !j) return null;
    if (!EN9W_inSent(s, p) && !["table", "garden", "jumped", "red"].includes(p)) return null;
    if (j === "preposition") return `“${p}” is a preposition, not an adverb; it starts a phrase about a place.`;
    return EN9W_JOBTXT[j](p);
  }
  const m = qt.match(/^Does (\S+) tell how, when, or where\?/);
  if (m && EN9W_TELL[p] && p !== q.ans) return `“${m[1]}” doesn't tell ${EN9W_TELL[p]} here.`;
  return null;
});

/* ---------- Contractions ---------- */
const EN9W_CON = () => CONTR.concat(EN9_CALL);
const EN9W_long = c => { const e = EN9W_CON().find(x => EN9W_low(x[1]) === EN9W_low(c)); return e ? e[0] : null; };
const EN9W_short = l => { const e = EN9W_CON().find(x => EN9W_low(x[0]) === EN9W_low(l)); return e ? e[1] : null; };
whyRule(9, "english", "contractions", (q, picked) => {
  const p = xPlain(picked), qt = EN9W_qt(q);
  let m = qt.match(/^What is the contraction for (.+)\?$/);
  if (m) {
    const l = EN9W_long(p);
    if (l) return EN9W_low(l) === EN9W_low(m[1]) ? null : `“${p}” is short for “${l}”, not “${m[1]}”.`;
    if (!p.includes("'")) return `“${p}” has no apostrophe to show where letters were taken out.`;
    if (p.replace("'", "") === q.ans.replace("'", "")) return `In “${p}” the apostrophe is in the wrong spot; it goes where the letters were taken out.`;
    return null;
  }
  m = qt.match(/^What two words make (.+)\?$/);
  if (m) { const c = EN9W_short(p); if (!c || EN9W_low(c) === EN9W_low(m[1])) return null; return `“${p}” squeezes into “${c}”, not “${m[1]}”.`; }
  if (/^Which contraction can replace the underlined words\?/.test(qt)) {
    const u = String(q.q).match(/<u>(.*?)<\/u>/), l = EN9W_long(p);
    if (!u || !l || EN9W_low(l) === EN9W_low(u[1])) return null;
    return `“${p}” is short for “${l}”, not “${u[1]}”.`;
  }
  return null;
});

/* ---------- Idioms ---------- */
const EN9W_IDALL = () => IDIOMS.map(x => [x[0], x[1]]).concat(EN9_IDI.map(x => [x[0], x[1]]));
const EN9W_meanTxt = m => /^(Grandpa|Grandma|Dad|Mom)\b/.test(m) ? EN9W_noDot(m) : EN9W_lc(EN9W_noDot(m));
/* wrong choices that say the opposite of the idiom's meaning (checked by hand) */
const EN9W_IDOPP = new Set(["Let's take a break.", "Let me forget about it.", "Time to stay home.", "Time stops completely.", "Fun is very slow.", "That name is brand new to me.", "We argue a lot.", "Talk louder.", "Open your mouth.", "It took years to think of.", "He is paying close attention.", "Our coach is always bossy.", "It helps us stay still.", "She barely passed.", "They are very rare.", "I felt right at home.", "Give up hope.", "It is best to sleep late.", "It will happen soon.", "It will happen every day.", "We can say anything we want.", "I found it right away.", "I'm going to keep my bad habits.", "It's better to work alone.", "Grandpa dislikes my jokes.", "Leave right now.", "Dad is very cheerful.", "Always try to do everything.", "It's very difficult.", "I feel calm and relaxed.", "It can make people feel shy.", "Can we do it right now?", "Someone else will decide.", "The party was calm.", "It's easy to do.", "Words are always enough.", "Bad things are always bad.", "Covers tell you the whole story.", "You'll never learn it.", "We are almost done.", "She does not like the puppy.", "She does as little as she can."]);
/* wrong choices that picture the idiom's words literally, with the word they take literally (checked by hand) */
const EN9W_IDLIT = {"Let's play a ball game.": "ball", "Let's roll down a hill.": "rolling", "Hold on to a rope.": "hang", "Hang up your coat.": "hang", "It's time to feed the horses.": "hay", "It's time to clean the barn.": "hay", "Let me take a nap on it.": "sleep", "Let me lie down on the floor.": "sleep", "Time to fix the road.": "road", "Time to play in the street.": "road", "Clocks can fly.": "flies", "That name is very loud.": "rings", "That name is a bell.": "bell", "We stare at each other.": "eye to eye", "We have the same eyes.": "eye", "Can you give me your hand?": "hand", "Can you clap your hands?": "hand", "Please put your eye on it.": "eye", "Close your jacket.": "zip", "It came from the sky.": "blue", "It was colored blue.": "blue", "He is very tall.": "head in the clouds", "He is flying a plane.": "clouds", "Our coach likes to dig.": "earth", "Our coach is very short.": "down", "It helps us cook food.": "steam", "It helps us fix a train.": "steam", "She painted the test.": "colors", "She threw her test in the air.": "flying", "They cost exactly ten cents.": "dime", "They come in boxes of twelve.": "dozen", "I felt thirsty.": "out of water", "I felt like swimming.": "fish", "Don't use your hands.": "fingers", "Your fingers are tangled.": "crossed", "Birds wake up hungry.": "bird", "Worms come out at night.": "worm", "It will happen on the farm.": "pigs", "We must step on eggs.": "eggshells", "We must walk very fast.": "walk", "They were thick and thin.": "thick and thin", "I chased a goose.": "goose", "It was a fun race.": "chase", "I'm going to rake the leaves.": "leaf", "I'm going to read a new page.": "leaf", "Monsters have two heads.": "heads", "Grandpa kicks a ball.": "kick", "Grandpa gets hurt by my jokes.": "kick", "Don't read old books.": "book", "Only read books with nice covers.": "cover", "I'm sitting on a fence.": "fence", "I'm painting a fence.": "fence", "Sit in a tiny chair.": "sit", "Squeeze into your seat.": "tight", "Dad fell out of bed.": "bed", "Dad's bed is broken.": "bed", "Take smaller bites of food.": "bite", "Don't eat too fast.": "chew", "It's about space travel.": "rocket", "It's a science project.": "science", "I ate a butterfly.": "butterflies", "My stomach hurts from food.": "stomach", "Don't be afraid of wolves.": "wolf", "Don't howl at the moon.": "wolf", "Don't cry when you're sad.": "cry", "It can crack the ice on a pond.": "ice", "It can make a room cold.": "ice", "The movie was inside a nut.": "nutshell", "The movie was about squirrels.": "nutshell", "Can I check if it's raining?": "rain", "Can I bring an umbrella?": "rain", "Are you tugging my foot?": "leg", "Are you helping me walk?": "leg", "You have the ball now.": "ball", "We are playing tennis.": "court", "Don't use scissors on it.": "cut", "Don't fold the paper.": "corners", "Someone dropped the party.": "hand", "Actions make noise.": "louder", "Shouting is best.": "louder", "Clouds are made of silver.": "silver", "It will rain soon.": "cloud", "You'll hang it on the wall.": "hang", "You'll hang upside down.": "hang", "We have to draw a square.": "square", "We are in first place.": "one", "The puppy eats apples.": "apple", "The puppy has red eyes.": "eye", "She runs an extra mile.": "mile", "She lives far away.": "mile", "Stop hitting the bushes.": "bush", "Stop gardening.": "bush"};
whyRule(9, "english", "idioms", (q, picked) => {
  const p = xPlain(picked), qt = EN9W_qt(q);
  if (qt === "What does this idiom mean?") {
    const s = xPlain(q.vis), me = EN9W_IDALL().find(x => x[0] === s); if (!me || p === me[1]) return null;
    const other = EN9W_IDALL().find(x => x[1] === p && x[0] !== s);
    if (other) return `That is what “${EN9W_noDot(other[0])}” means.`;
    const bank = EN9_IDI.find(x => x[0] === s);
    if (!bank || !bank[2].includes(p)) return null;
    if (EN9W_IDOPP.has(p)) return "That is the opposite of what this saying means.";
    if (EN9W_IDLIT[p]) return `That takes “${EN9W_IDLIT[p]}” literally, but an idiom's words don't mean exactly what they say.`;
    return null;
  }
  const m = qt.match(/^Which idiom means "(.+)"\?$/);
  if (m) { const o = EN9W_IDALL().find(x => x[0] === p); if (!o || o[1] === m[1]) return null; return `“${EN9W_noDot(o[0])}” means ${EN9W_meanTxt(o[1])}.`; }
  return null;
});

/* ---------- Prepositions ---------- */
const EN9W_EMO = { "⚽": "ball", "🐱": "cat", "🎈": "balloon", "🍎": "apple" };
const EN9W_NOTPOS = { above: "higher than the box", below: "lower than the box", "next to": "beside the box", between: "in the middle of two boxes" };
whyRule(9, "english", "prepositions", (q, picked) => {
  const p = xPlain(picked), qt = EN9W_qt(q);
  if (qt === "Where is it?") {
    const k = String(q.key || ""), pos = POS.find(x => xPlain(q.ans).startsWith(x)), pp = POS.find(x => p.startsWith(x));
    const e = Object.keys(EN9W_EMO).find(x => k.endsWith(x));
    if (!pos || !pp || pp === pos || !e) return null;
    if (pos === "between") return pp === "next to" ? `There are two boxes, and the ${EN9W_EMO[e]} is in the middle of both, not just next to one.` : `The ${EN9W_EMO[e]} is not ${pp === "above" ? "higher" : "lower"} than the boxes; it is level with them.`;
    if (pp === "between") return `There is only one box, so the ${EN9W_EMO[e]} can't be between boxes.`;
    return `The ${EN9W_EMO[e]} is not ${EN9W_NOTPOS[pp]}.`;
  }
  if (/^Which word is the preposition\?/.test(qt)) {
    const s = EN9W_sent(q), j = EN9W_JOB[p];
    if (!s || !j || j === "preposition") return null;
    if (!EN9W_inSent(s, p) && !["happy", "jumped", "table"].includes(p)) return null;
    return EN9W_JOBTXT[j](p);
  }
  const m = qt.match(/^Does the preposition (\S+) tell where or when\?/);
  if (m && (p === "where" || p === "when") && p !== q.ans) {
    const s = EN9W_sent(q), mm = s && s.match(new RegExp(`\\b${m[1]}\\b([^.!?]*)`));
    if (!mm) return null;
    const ph = (m[1] + mm[1]).trim();
    return p === "when" ? `“${ph}” is about a place, not a time.` : `“${ph}” is about a time, not a place.`;
  }
  return null;
});

/* ---------- Cause & effect ---------- */
/* cross pairs from the original list where the wrong cause could still plausibly lead to the effect: no reason given */
const EN9W_CEPLAUS = new Set(["It rained all day.|She got wet.", "It rained all day.|The plant grew tall.", "It rained all day.|School was closed.", "It rained all day.|Sam was late for school.", "The wind blew hard.|The soccer game was canceled.", "The wind blew hard.|It broke into pieces.", "The wind blew hard.|The dog ran out.", "It snowed a lot.|The soccer game was canceled.", "It snowed a lot.|She got wet.", "It snowed a lot.|Sam was late for school.", "Leo practiced every day.|He did well on the test.", "Kai studied his math facts.|He won the spelling bee.", "The puppy chewed the shoe.|It broke into pieces.", "It snowed a lot.|It broke into pieces."]);
whyRule(9, "english", "causeeffect", (q, picked) => {
  const p = xPlain(picked), qt = EN9W_qt(q), cause = /What was the cause\?/.test(qt), eff = /What was the effect\?/.test(qt);
  if (!cause && !eff) return null;
  const shown = xPlain((String(q.q).match(/<div class="quote">(.*?)<\/div>/) || [])[1] || "");
  const base = CAUSES.find(x => (cause ? x[0] : x[1]) === p) && CAUSES.some(x => (cause ? x[1] : x[0]) === shown);
  const bank = EN9_CE.find(x => cause ? x[1] === shown : x[0] === shown), inBank = bank && (cause ? bank[2] : bank[3]).includes(p);
  if (!inBank && !base) return null;
  if (base && EN9W_CEPLAUS.has(cause ? p + "|" + shown : shown + "|" + p)) return null;
  return cause ? `${xQ(EN9W_noDot(p))} would not cause that.` : `${xQ(EN9W_noDot(shown))} would not make that happen.`;
  return null;
});

/* ---------- Parts of speech ---------- */
const EN9W_NOTJOB = { noun: "doesn't name a person, place, or thing", verb: "isn't the action in this sentence", adjective: "doesn't describe a noun here", adverb: "doesn't tell how, when, or where" };
whyRule(9, "english", "partsofspeech", (q, picked) => {
  const m = EN9W_qt(q).match(/^What part of speech is (\S+)\?/), p = xPlain(picked);
  if (!m || !EN9W_NOTJOB[p] || p === q.ans) return null;
  return `“${m[1]}” ${EN9W_NOTJOB[p]}.`;
});

/* ---------- Word roots ---------- */
whyRule(9, "english", "roots", (q, picked) => {
  const p = xPlain(picked), qt = EN9W_qt(q);
  let m = qt.match(/^The root (\S+) means/);
  if (m) { const L = ROOTS.some(x => x[0] === m[1] && x[1] === q.ans) ? ROOTS : EN9_ROOTS; const o = L.find(x => x[1] === p); if (!o || o[0] === m[1]) return null; return `“${p}” is what ${o[0]} means, like in ${o[2].find(w => !w.includes(m[1])) || o[2][0]}.`; }
  m = qt.match(/^Which word has the root meaning (.+)\?$/);
  if (m) {
    const L = ROOTS.some(x => x[1] === m[1] && x[2].includes(q.ans)) ? ROOTS : EN9_ROOTS;
    const want = L.find(x => x[1] === m[1]), o = L.filter(x => x[2].includes(p));
    if (!want || !o.length || p.includes(want[0]) || o.some(x => x[1] === m[1])) return null;
    return `“${p}” has ${o[0][0]}, which means ${o[0][1]}, not ${m[1]}.`;
  }
  return null;
});

/* ---------- Main idea & inference (reading9) ---------- */
const EN9W_RSTOP = new Set("the a an to of is it in on and you your i me my we us our that this be are was were for with do not can will he she they their his her at up out very so than have has had get got go its by from what when about all as or but one some only just them there then like more most how why who did does been being after before because always make makes give gets too stay stays new place long big best likes love full should helps help keeps keep turns turn many where middle top different apart never needed important wants want lost really thing things way ways day days time year good well much little last first next could would went made".split(" "));
const EN9W_rwords = s => EN9W_low(s).replace(/[^a-z ]/g, " ").split(/\s+/).filter(w => w.length > 2 && !EN9W_RSTOP.has(w));
const EN9W_rstem = w => w.replace(/ies$/, "y").replace(/(ing|est|ed|er|es|s|ly)$/, "").replace(/(.)\1$/, "$1").replace(/e$/, "").slice(0, 6);
/* hand-checked reasons for picks a word check can't explain (or would explain badly) */
const EN9W_RHAND = { "The mayor's favorite books.": "The passage never talks about the mayor's favorite books.", "Ms. Kim likes jars.": "The passage never says Ms. Kim likes jars; the jar just holds the seed.", "Notebooks are important.": "The notebooks are only where the students drew; the passage never calls them important.", "Friday is the best day.": "The passage never calls Friday the best day.", "Grandma likes to sew dresses.": "The passage never says Grandma sews dresses.", "Dad lost his blue coat.": "A button fell off Dad's coat; the passage never says he lost the coat.", "Nina wants a new jar.": "The passage never says Nina wants a new jar.", "Dad's baby coat": "The tiny blue button came from Dad's coat, not the shiny gold one.", "sew a new coat": "The passage never says Nina sews anything.", "new leaves": "Worms eat dead leaves; the passage never says they make new leaves.", "Worms eat the garden plants.": "Worms eat dead leaves, not the garden plants.", "closed all the windows": "Ellie closed the windows, not her dad.", "gathered the flashlights": "Ellie's little brother gathered the flashlights, not her dad.", "The plant needed more water.": "Kenji watered it every day, sometimes twice, so it had plenty of water.", "The teacher watered the plant.": "Kenji did the watering; the teacher only explained.", "Foxes like summer best.": "The passage never says which season foxes like.", "Rocks can be brown or gray.": "That is only one small detail; the passage is about the fox.", "buy the art set": "Aisha handed her savings to the shelter, so she didn't buy the art set.", "She was lost.": "She was on her way to the store, so she knew where she was going.", "in the morning": "In the morning the shadow was long, not short.", "in the afternoon": "In the afternoon the shadow grew long again.", "The shadow gets too long.": "The passage never says a shadow gets too long.", "The sidewalk is long.": "The line on the sidewalk is only one detail, not the main idea.", "to open the bakery": "Mr. Alvarez opens the bakery, not the customers.", "seven in the morning": "By seven, a line has already formed, so the bakery opened earlier.", "nine in the morning": "By nine the rolls are usually gone, so the bakery opened long before.", "Look up at your friends.": "The coach said “don't look up” until she touched the wall.", "Feathers are soft.": "Soft feathers are one detail; the passage is about all the ways owls hunt at night.", "bigger cups": "They made a bigger sign, not bigger cups.", "The park is very big.": "The passage never says how big the park is.", "It makes the trees taller.": "The passage never says fire makes sequoias taller.", "It keeps insects in the bark.": "The passage never says fire does anything to insects.", "They live for just one year.": "The passage says some are thousands of years old.", "He finished her speech for her.": "Maya finished her own speech after Theo whispered.", "because he forgot his lines": "Maya forgot her lines, not Theo.", "The town had too many parks.": "The town had no place for kids to play, so it had no parks.", "The kids did not like soccer.": "The kids asked for a soccer field, so they liked soccer.", "They are made of different dust.": "The passage never says the dust is different.", "Singing helps you score.": "They sang on the bus after the game, and they still lost.", "Sailors like bright lights.": "The passage never says sailors like bright lights.", "Rocks are dangerous.": "Dangerous rocks are only one detail; the passage is about lighthouses.", "Computers are new.": "The passage never says computers are new.", "on top of ships": "Lighthouses stand near rocks or shores, not on ships.", "Deserts are full of sand.": "Sand is only one detail; the passage is about camels.", "Camels love to drink water.": "Camels can go many days without drinking water.", "Eyelashes are long.": "Long eyelashes are one detail; the passage is about the camel's whole body.", "water": "The passage never says the hump stores water.", "sand": "The passage talks about keeping sand out, not storing it.", "a blank page": "Priya stared at the blank page because she didn't know what to draw yet.", "Animals are always thirsty.": "Thirsty animals are only one detail; the passage is about cactuses.", "It has no rocks.": "Hawaii was built from lava that hardened into new rock.", "Basketball games are long.": "The passage never says how long the game is.", "Snow is cold and white.": "That is about snow, but the passage is about the Arctic fox.", "Forest fires are very hot.": "That is about fires, but the passage is about sequoia trees.", "why snow is cold": "The passage explains how snowflakes grow, not why snow is cold.", "scared and upset": "Sam smiled when he saw the stars, so he wasn't scared then." };
/* the clue sentence for inference questions in the original passages (they carry no quote of their own) */
const EN9W_RCLUE = { "Why was the North Star useful to sailors?": "The North Star stays in almost the same spot in the sky", "What will Omar most likely do next?": "he could make seven out of ten", "Why did the birds finally come?": "she added sunflower seeds instead of bread crumbs", "Why might some cactuses bloom at night?": "Some cactuses only bloom at night, when it is cooler", "How did Jonah feel before he played?": "Jonah's hands shook", "How did the audience feel about his playing?": "the whole room stood up and clapped", "How did Priya feel at the start?": "she still had no idea what to draw", "What will Priya most likely draw?": "saw her grandfather in the garden", "Which word best describes the students?": "Together they raised over two thousand dollars", "Why do you think the octopuses return before morning?": "sneak out of their tanks at night", "How did Rosa feel at the end?": "Rosa grinned", "What can you infer about Hawaii?": "Some islands, like Hawaii, were built this way" };
whyRule(9, "english", "reading9", (q, picked) => {
  const text = xPlain(q.vis), P = PASS9.concat(EN9_PASS).find(x => xPlain(x.p) === text);
  if (!P) return null;
  const row = P.qs.find(x => x[0] === q.q), p = xPlain(picked);
  if (!row || p === row[1] || !row[2].includes(p)) return null;
  if (P.qs.some(x => x !== row && x[1] === p)) return "That answers a different question about this passage, not this one.";
  const deep = /main idea|mostly about|most likely|infer|think|\bwhy\b|lesson|\bfeel|\bfelt|describe/i.test(q.q);
  if (EN9W_RHAND[p] && !(deep && /\bnever\b/.test(EN9W_RHAND[p]))) return EN9W_RHAND[p];
  const pstems = EN9W_rwords(p).map(EN9W_rstem);
  if (deep && /main idea|mostly about/i.test(q.q)) {
    /* main idea: count the passage sentences that touch the picked idea at all */
    const sents = P.p.match(/[^.!?]+[.!?]+["”]?/g) || [P.p];
    const n = sents.filter(x => EN9W_rwords(x).some(w => pstems.includes(EN9W_rstem(w)))).length;
    if (n === 0) return "No sentence in the passage is about that, so it can't be the main idea.";
    if (n === 1) return "Only one sentence touches on that, so it's a small detail, not the main idea.";
    return null;
  }
  if (deep) {
    /* inference: name the clue that supports the right answer, if it doesn't also fit the pick */
    let clue = row[3] ? (row[3].match(/"([^"]+)"/) || [])[1] : EN9W_RCLUE[row[0]];
    if (!clue || clue.split(" ").length < 3 || !P.p.includes(clue.replace(/[.,!?]+$/, ""))) return null;
    clue = clue.replace(/[.,!?]+$/, "");
    if (clue.length > 80 || EN9W_rwords(clue).some(w => pstems.includes(EN9W_rstem(w)))) return null;
    return `The clue “${clue}” doesn't fit “${EN9W_noDot(p)}”.`;
  }
  const pw = new Set(EN9W_rwords(P.p).map(EN9W_rstem)), miss = EN9W_rwords(p).filter(w => !pw.has(EN9W_rstem(w)));
  if (!miss.length) return null;
  const f = p.split(" ")[0].replace(/[^A-Za-z']/g, ""), fb = f.replace(/'s$/, ""), name = new RegExp(`\\b${fb}\\b`).test(P.p) && !new RegExp(`\\b${fb.toLowerCase()}\\b`).test(P.p);
  if (/\.$/.test(p) && !/^(How|Why|Where|What|Because|To|So|Yes|No|Leave|Give|Forget|Swim|Stop)$/.test(f)) return `The passage never says that ${name ? EN9W_noDot(p) : p.charAt(0).toLowerCase() + EN9W_noDot(p).slice(1)}.`;
  return `Nothing in the passage says “${EN9W_noDot(p)}”.`;
});

