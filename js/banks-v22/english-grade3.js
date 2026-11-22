/* =====================================================================
   v22 · Age 8 · English: two new topics (Verbs That Agree, Quotation Marks)
   plus more questions for every existing age-8 English topic.
   Tag: EN8V_. Every new question stashes its wrong-option reasons in q.v22.r
   so the why-rules below can say exactly why a pick is wrong.
   ===================================================================== */
const EN8V_Q = s => "“" + s + "”";
const EN8V_C = s => s.charAt(0).toUpperCase() + s.slice(1);
const EN8V_RULE = (q, p) => (q && q.v22 && q.v22.r && Object.prototype.hasOwnProperty.call(q.v22.r, p)) ? q.v22.r[p] : null;
const EN8V_mid = s => /^(The|A|An|My|Our|His|Her)\b/.test(s) ? s.charAt(0).toLowerCase() + s.slice(1) : s;

/* =====================================================================
   NEW TOPIC 1: Verbs That Agree (subject-verb agreement, CCSS L.3.1f)
   ===================================================================== */
// [subject, number: 1 = one, 2 = more than one, "I", "you", kind: p = person, a = animal]
const EN8V_SUBJ = [
  ["Grandpa", 1, "p"], ["My sister", 1, "p"], ["The teacher", 1, "p"], ["Mom", 1, "p"], ["Dad", 1, "p"], ["He", 1, "p"], ["She", 1, "p"],
  ["The boy", 1, "p"], ["The girl", 1, "p"], ["Our coach", 1, "p"], ["Ms. Lee", 1, "p"], ["My friend", 1, "p"],
  ["The kids", 2, "p"], ["My cousins", 2, "p"], ["We", 2, "p"], ["They", 2, "p"], ["Mom and Dad", 2, "p"], ["The girls", 2, "p"],
  ["Our neighbors", 2, "p"], ["The students", 2, "p"], ["I", "I", "p"], ["You", "you", "p"],
  ["The dog", 1, "a"], ["The cat", 1, "a"], ["My puppy", 1, "a"], ["The kitten", 1, "a"],
  ["The dogs", 2, "a"], ["The cats", 2, "a"], ["The puppies", 2, "a"], ["The kittens", 2, "a"],
];
// [base verb, -s form, rest of sentence, kind]
const EN8V_PRED = [
  ["walk", "walks", "to school every day", "p"], ["read", "reads", "a book before bed", "p"], ["play", "plays", "outside after lunch", "p"],
  ["wash", "washes", "the dishes after dinner", "p"], ["fix", "fixes", "the broken chair", "p"], ["carry", "carries", "the heavy bags", "p"],
  ["watch", "watches", "the fireworks", "p"], ["catch", "catches", "the bus at eight", "p"], ["go", "goes", "to the library on Mondays", "p"],
  ["do", "does", "a puzzle at the kitchen table", "p"], ["try", "tries", "new foods", "p"], ["sing", "sings", "in the choir", "p"],
  ["bake", "bakes", "bread on Sundays", "p"], ["ride", "rides", "the bus home", "p"], ["mix", "mixes", "the paint colors", "p"],
  ["sleep", "sleeps", "in the sun", "a"], ["chase", "chases", "a ball", "a"], ["drink", "drinks", "water from a bowl", "a"],
  ["nap", "naps", "on the couch", "a"], ["hide", "hides", "under the bed", "a"], ["jump", "jumps", "on the couch", "a"], ["eat", "eats", "breakfast early", "a"],
];
// be / have: [label, one, more-than-one, I, you, rest, kind]
const EN8V_BE = [
  ["is", "is", "are", "am", "are", "happy today", "p"], ["is", "is", "are", "am", "are", "ready for the trip", "p"], ["is", "is", "are", "am", "are", "hungry", "a"],
  ["is", "is", "are", "am", "are", "in the backyard", "a"], ["is", "is", "are", "am", "are", "good at chess", "p"],
  ["was", "was", "were", "was", "were", "at the park yesterday", "p"], ["was", "was", "were", "was", "were", "sleepy after lunch", "a"], ["was", "was", "were", "was", "were", "late for the bus", "p"],
  ["was", "was", "were", "was", "were", "muddy after the walk", "a"],
  ["has", "has", "have", "have", "have", "a new red bike", "p"], ["has", "has", "have", "have", "have", "soft fur", "a"], ["has", "has", "have", "have", "have", "a cold today", "p"],
  ["has", "has", "have", "have", "have", "a spot on its nose", "a1"],
];
function EN8V_agrReason(S, n, picked, kind) {
  const s = EN8V_Q(S);
  if (kind === "be") {
    if (n === "I") return picked === "were" ? "With “I”, we say “was”, not “were”." : picked === "is" || picked === "are" ? `${EN8V_Q(picked)} doesn't go with “I”. We say “I am”.` : null;
    if (n === "you") return picked === "is" ? "“is” is for one person or thing, but with “you” we always use “are”." : picked === "am" ? "“am” only goes with “I”." : picked === "was" ? "With “you”, we always use “were”, even for one person." : null;
    if (picked === "am") return "“am” only goes with “I”.";
    if (n === 1) return picked === "are" ? `“are” is for more than one, but ${s} is only one.` : picked === "were" ? `“were” is for more than one, but ${s} is only one.` : null;
    return picked === "is" ? `“is” is for just one, but ${s} is more than one.` : picked === "was" ? `“was” is for just one, but ${s} is more than one.` : null;
  }
  if (kind === "have") {
    if (picked === "has") return n === "I" ? "With “I”, we say “have”, not “has”." : n === "you" ? "With “you”, we say “have”, not “has”." : `“has” is for just one, but ${s} is more than one.`;
    return `“have” is for more than one, but ${s} is only one, so we use “has”.`;
  }
  // plain verbs: picked is the -s form or the base form
  if (kind === "s") return n === "I" ? "With “I”, the verb has no -s ending." : n === "you" ? "With “you”, the verb has no -s ending." : `${s} is more than one, so the verb has no -s ending.`;
  return `${s} is only one, so the verb needs an -s or -es ending.`;
}
topic(8, "english", {
  id: "agree", title: "Verbs That Agree", icon: "🔗", blurb: "The dog runs. The dogs run.",
  lesson: [
    { t: "One or more than one?", say: "When the subject is just one, the action word usually ends in s. The dog runs. When there is more than one, there is no s. The dogs run.", html: table([["🐶 The dog", `run<b class="hl">s</b>`], ["🐶🐶 The dogs", "run"], ["👧 The girl", `read<b class="hl">s</b>`], ["👧👦 The kids", "read"]], ["Who?", "Verb"]) },
    { t: "I and you", say: "I and you never take that s. I run. You run. But he runs and she runs.", html: table([["I", "run"], ["You", "run"], ["He / She", `run<b class="hl">s</b>`], ["We / They", "run"]], ["Who?", "Verb"]) },
    { t: "Is or are?", say: "Use is and was for one. Use are and were for more than one. Use has for one, and have for more than one.", html: table([["The cat <b class='hl'>is</b>", "The cats <b class='hl'>are</b>"], ["The cat <b class='hl'>was</b>", "The cats <b class='hl'>were</b>"], ["The cat <b class='hl'>has</b>", "The cats <b class='hl'>have</b>"]], ["One", "More than one"]) + note("With <b>I</b>, say <b>I am</b> and <b>I was</b>.") },
  ],
  gen() {
    const k = Math.random();
    if (k < 0.45) {
      const [b, s3, rest, kind] = pick(EN8V_PRED), [S, n] = pick(EN8V_SUBJ.filter(x => x[2] === kind)), one = n === 1, ans = one ? s3 : b, wrong = one ? b : s3;
      const r = {}; r[wrong] = EN8V_agrReason(S, n, wrong, one ? "base" : "s");
      return { q: `Which verb fits?<div class="sentence">${S} <span class="blank">___</span> ${rest}.</div>`, say: `Which verb fits? ${S} blank ${rest}.`, opts: shuffle([ans, wrong]), ans, big: 1, why: `${S} ${ans} ${rest}.`, key: "f" + S + b, v22: { r } };
    }
    if (k < 0.75) {
      const [lab, o1, o2, oI, oY, rest, kind] = pick(EN8V_BE), pool = EN8V_SUBJ.filter(x => kind === "a1" ? x[2] === "a" && x[1] === 1 : x[2] === kind), [S, n] = pick(pool);
      const ans = n === 1 ? o1 : n === "I" ? oI : n === "you" ? oY : o2, kind2 = lab === "has" ? "have" : "be";
      const opts = lab === "is" ? ["am", "is", "are"] : lab === "was" ? ["was", "were"] : ["has", "have"], r = {};
      opts.filter(o => o !== ans).forEach(o => { r[o] = EN8V_agrReason(S, n, o, kind2); });
      return { q: `Which word fits?<div class="sentence">${S} <span class="blank">___</span> ${rest}.</div>`, say: `Which word fits? ${S} blank ${rest}.`, opts, ans, big: 1, why: `${S} ${ans} ${rest}.`, key: "b" + S + rest, v22: { r } };
    }
    const [b, s3, rest, kind] = pick(EN8V_PRED), [S, n] = pick(EN8V_SUBJ.filter(x => x[2] === kind)), one = n === 1, good = one ? s3 : b, bad = one ? b : s3;
    const A = `${S} ${good} ${rest}.`, W = `${S} ${bad} ${rest}.`, r = {}; r[W] = EN8V_agrReason(S, n, bad, one ? "base" : "s");
    return { q: "Which sentence is <b>correct</b>?", say: "Which sentence is correct?", opts: shuffle([A, W]), ans: A, why: `${S} goes with ${EN8V_Q(good)}.`, key: "c" + S + b, v22: { r } };
  },
});
TRICK_ADD(8, "english", "agree", "Ask: is the subject one, or more than one? One gets the -s (runs, is, has). More than one, I, or you get no -s (run, are, have).");
whyRule(8, "english", "agree", EN8V_RULE);

/* =====================================================================
   NEW TOPIC 2: Quotation Marks (commas and quotation marks in dialogue, CCSS L.3.2c)
   ===================================================================== */
// [speaker, talking word, exact words, someone/something named in the words, a retelling that is NOT the exact words]
const EN8V_DLG = [
  ["Mia", "asked", "Can Leo come over to play?", "Leo", "Mia wants to play with Leo."],
  ["Grandpa", "said", "Let's feed the ducks at the pond.", "the ducks", "Grandpa wants to visit the pond."],
  ["Ms. Lee", "said", "Ravi, please pass out the papers.", "Ravi", "Ms. Lee needs help with papers."],
  ["Ben", "shouted", "Look out for the puddle, Sam!", "Sam", "Ben warned Sam about water."],
  ["Ava", "whispered", "The baby is sleeping.", "the baby", "Ava wants everyone to be quiet."],
  ["Dad", "asked", "Did Nora finish her lunch?", "Nora", "Dad wonders about Nora's lunch."],
  ["Kai", "said", "My dog Rex can do tricks.", "Rex", "Kai is proud of his dog."],
  ["Zoe", "asked", "Where did Grandma put the cookies?", "Grandma", "Zoe is looking for cookies."],
  ["The coach", "shouted", "Run to the fence, Omar!", "Omar", "The coach wants Omar to run."],
  ["Lily", "said", "I made a card for Mom.", "Mom", "Lily has a gift for her mom."],
  ["Mr. Diaz", "said", "Emma, you may feed the fish.", "Emma", "Emma gets to feed the fish."],
  ["Leo", "asked", "Can the puppy sleep in my room?", "the puppy", "Leo wants the puppy nearby."],
  ["Grandma", "said", "Jamal planted these tomatoes.", "Jamal", "The tomatoes came from Jamal."],
  ["Priya", "shouted", "Hooray, Aunt Rosa is here!", "Aunt Rosa", "Priya is happy to see her aunt."],
  ["Noah", "said", "The kitten is hiding under the bed.", "the kitten", "Noah found the kitten."],
  ["Mom", "asked", "Should Dad make pancakes today?", "Dad", "Mom has an idea for breakfast."],
  ["Hana", "said", "My brother Ken loves to draw.", "Ken", "Hana's brother likes art."],
  ["The librarian", "whispered", "Sofia, your book is ready.", "Sofia", "Sofia's book is here."],
  ["Uncle Joe", "said", "The horses need fresh water.", "the horses", "The horses are thirsty."],
  ["Ella", "asked", "May Kofi sit with us?", "Kofi", "Ella wants Kofi to join them."],
  ["Ravi", "shouted", "Catch the ball, Mia!", "Mia", "Ravi threw the ball to Mia."],
  ["Dad", "whispered", "Let's surprise Grandpa with a cake.", "Grandpa", "Dad has a plan for Grandpa."],
  ["Ana", "said", "The bird built a nest in our tree.", "the bird", "There is a nest in Ana's tree."],
  ["The nurse", "said", "Lucas, you are all done.", "Lucas", "Lucas can go now."],
  ["Sam", "asked", "Is Ms. Park our new teacher?", "Ms. Park", "Sam wonders about a new teacher."],
  ["Grace", "said", "Biscuit loves his squeaky toy.", "Biscuit", "Grace's pet has a favorite toy."],
  ["Omar", "shouted", "Wait for me, Ella!", "Ella", "Omar wants Ella to stop."],
  ["Mom", "said", "Your cousin Maya called today.", "Maya", "Maya talked to Mom on the phone."],
  ["Kenji", "asked", "Can the twins come to my party?", "the twins", "Kenji is inviting friends."],
  ["Aisha", "said", "Grandpa taught me to fish.", "Grandpa", "Aisha learned a new skill."],
  ["Zara", "said", "My hamster Nibbles runs on a wheel.", "Nibbles", "Zara has a busy pet."],
  ["Coach Kim", "shouted", "Great kick, Leo!", "Leo", "Coach Kim liked the kick."],
  ["Max", "asked", "Did the mail carrier bring a box?", "the mail carrier", "Max is waiting for a package."],
  ["Nora", "whispered", "Look, a deer is in the yard!", "a deer", "Nora sees an animal outside."],
  ["Grandma", "asked", "Would Rosa like some soup?", "Rosa", "Grandma is offering soup."],
  ["Eli", "said", "The baker gave me a free muffin.", "the baker", "Eli got a treat."],
  ["Mia", "shouted", "Happy birthday, Dad!", "Dad", "Mia is celebrating."],
  ["Mr. Brown", "said", "Jada, please water the plants.", "Jada", "Jada has a job to do."],
  ["Kofi", "asked", "Where is Mom's red umbrella?", "Mom", "Kofi needs an umbrella."],
  ["Lucy", "said", "The firefighter let me sit in the truck.", "the firefighter", "Lucy had a fun visit."],
  ["Dev", "asked", "Can Aunt Lin help with my kite?", "Aunt Lin", "Dev needs help with a kite."],
  ["Ruby", "said", "The goats at the farm ate my hat.", "the goats", "Ruby lost her hat at the farm."],
];
const EN8V_NAMES = ["Tomas", "Ivy", "Mateo", "Jun", "Layla", "Owen", "Rosa", "Ayla", "Felix", "Nia", "Chloe", "Hugo"];
function EN8V_dlg(D, first) {
  const [S, T, W] = D, s = first ? S : EN8V_mid(S), end = W.slice(-1), W2 = end === "." ? W.slice(0, -1) + "," : W;
  return first ? `${S} ${T}, “${W}”` : `“${W2}” ${s} ${T}.`;
}
topic(8, "english", {
  id: "quotes", title: "Quotation Marks", icon: "💬", blurb: "Show the exact words someone says.",
  lesson: [
    { t: "Talking marks", say: "Quotation marks go around the exact words someone says. They hug the talking words, like little sixes and nines.", html: `<div class="sentence big-sentence">Mia said, <b class="hl">“</b>Let's play tag.<b class="hl">”</b></div>` + note("Only <b>Let's play tag.</b> is inside, because those are Mia's words.") },
    { t: "Where the comma goes", say: "If the talking word comes first, put a comma after said. If it comes last, put the comma inside the marks.", html: `<div class="sentence">Mia said<b class="hl">,</b> “Let's play tag.”</div><div class="sentence">“Let's play tag<b class="hl">,</b>” Mia said.</div>` },
    { t: "Who is talking?", say: "Words like said, asked and shouted tell who is talking. The speaker's name stays outside the marks.", html: `<div class="sentence big-sentence">“Can Leo come over?” <b class="noun">asked Mia</b>.</div>` + note("<b>Mia</b> is talking. <b>Leo</b> is just named in her words.") },
  ],
  gen() {
    const i = R(0, EN8V_DLG.length - 1), D = EN8V_DLG[i], [S, T, W, O, P] = D, first = Math.random() < 0.5, k = Math.random();
    const sent = EN8V_dlg(D, first), s = first ? S : EN8V_mid(S), who = EN8V_mid(S);
    if (k < 0.4) {
      const ws = W.split(" "), last = ws.pop(), W2 = W.slice(-1) === "." ? W.slice(0, -1) + "," : W, l2 = W2.split(" ").pop();
      const whole = first ? `“${S} ${T}, ${W}”` : `“${W2} ${s} ${T}.”`, none = first ? `${S} ${T}, ${W}` : `${W2} ${s} ${T}.`;
      const one = first ? `${S} ${T}, ${ws.join(" ")} “${last}”` : `${W2.split(" ").slice(0, -1).join(" ")} “${l2}” ${s} ${T}.`;
      const r = {}; r[whole] = `The words ${EN8V_Q(`${who} ${T}`)} aren't part of what was said, so they go outside the marks.`;
      r[none] = `This sentence has no quotation marks around the words ${who} said.`;
      r[one] = `Only one word is inside the marks, but all the words ${who} said belong inside.`;
      return { q: "Which sentence uses <b>quotation marks</b> correctly?", say: "Which sentence uses quotation marks correctly?", opts: shuffle([sent, whole, none, one]), ans: sent, why: `The marks go around only the words ${who} said: ${W}`, key: "m" + i + first, v22: { r } };
    }
    if (k < 0.7) {
      const tag = first ? `${S} ${T}` : `${s} ${T}`, r = {};
      r[EN8V_C(tag)] = `${EN8V_Q(EN8V_C(tag))} tells who is talking. Those words are outside the marks.`;
      r[P] = "That tells what it means, but those aren't the words inside the marks.";
      return { q: `What are the <b>exact words</b> ${who} said?<div class="sentence">${sent}</div>`, say: `${sent.replace(/[“”]/g, "")} What are the exact words ${who} said?`, opts: shuffle([W, EN8V_C(tag), P]), ans: W, why: `The words inside the quotation marks are what ${who} said.`, key: "w" + i + first, v22: { r } };
    }
    const other = pick(EN8V_NAMES.filter(n => !W.includes(n) && n !== S)), Oc = EN8V_C(O), r = {};
    const many = /^the .*s$/.test(O); r[Oc] = many ? `${Oc} are named inside the talking words, but they aren't the ones talking.` : `${Oc} is named inside the talking words, but ${O} isn't the one talking.`;
    r[other] = `${other} isn't in this sentence at all.`;
    return { q: `Who is <b>talking</b>?<div class="sentence">${sent}</div>`, say: `${sent.replace(/[“”]/g, "")} Who is talking?`, opts: shuffle([S, Oc, other]), ans: S, big: 1, why: `The word “${T}” goes with ${who}, so ${who} is talking.`, key: "t" + i + first, v22: { r } };
  },
});
TRICK_ADD(8, "english", "quotes", "Point to the words the person really says out loud. Only those words go inside the quotation marks. The name and said stay outside.");
whyRule(8, "english", "quotes", EN8V_RULE);

/* =====================================================================
   PART B: more questions for the existing age-8 English topics
   ===================================================================== */

/* ---------- ABC order: "second" questions + same-first-two-letters groups ---------- */
const EN8V_ABC3 = [["chair", "chalk", "cheese", "chin", "chop"], ["black", "blend", "blink", "block", "blue"], ["brain", "bread", "brick", "broom", "brush"],
  ["crab", "crib", "crow", "crumb", "crew"], ["drag", "dress", "drip", "drop", "drum"], ["flag", "flea", "flip", "flower", "flute"],
  ["frame", "fresh", "friend", "frog", "fruit"], ["glad", "glue", "glow", "glitter", "glass"], ["grape", "green", "grin", "grow", "grumpy"],
  ["plan", "plum", "plate", "please", "plot"], ["shark", "sheep", "ship", "shop", "shut"], ["skate", "sky", "skip", "skunk", "sketch"],
  ["snack", "snail", "snow", "sniff", "snug"], ["spoon", "spider", "space", "spell", "spot"], ["stamp", "step", "stick", "stone", "stuck"],
  ["swan", "sweep", "swim", "swing", "swoop"], ["thank", "thick", "thumb", "think", "throw"], ["track", "tree", "trick", "truck", "trophy"],
  ["wheat", "wheel", "whip", "whale", "whisper"]];
const EN8V_NTH = ["first", "second", "third", "fourth", "fifth", "sixth"];
function EN8V_abcWhy(w, a, place) {
  let i = 0; while (i < w.length && i < a.length && w[i] === a[i]) i++;
  const after = w > a, rel = after ? "after" : "before", where = i === 0 ? `its first letter, ${w[i]}, comes ${rel} ${a[i]}` : `its ${EN8V_NTH[i]} letter, ${w[i]}, comes ${rel} ${a[i]}`;
  return place ? `${EN8V_Q(w)} comes ${place}, because ${where}.` : `${EN8V_Q(w)} goes ${rel} ${EN8V_Q(a)}, because ${where}.`;
}
addBank(8, "english", "abc", 0.4, function () {
  const pref = (x, y) => x.startsWith(y) || y.startsWith(x);
  if (Math.random() < 0.5) {
    let words; do { words = shuffle(ABCW).slice(0, 4); } while (words.some((x, i) => words.some((y, j) => i !== j && pref(x, y))));
    const sorted = [...words].sort(), ans = sorted[1], r = {};
    words.forEach(w => { if (w !== ans) r[w] = w === sorted[0] ? EN8V_abcWhy(w, ans, "first") : EN8V_abcWhy(w, ans); });
    return { q: "Which word comes <b>second</b> in ABC order?", say: "Which word comes second in A B C order?", opts: words, ans, big: 1, why: `In ABC order: ${sorted.join(", ")}.`, key: "v22s" + words.join(), v22: { r } };
  }
  const words = shuffle(pick(EN8V_ABC3)).slice(0, 4), first = Math.random() < 0.6, sorted = [...words].sort(), ans = first ? sorted[0] : sorted[3], r = {};
  words.forEach(w => { if (w !== ans) r[w] = EN8V_abcWhy(w, ans); });
  return { q: `These words start with the same two letters. Which comes <b>${first ? "first" : "last"}</b> in ABC order?`, say: `These words start with the same two letters. Which comes ${first ? "first" : "last"} in A B C order?`, opts: words, ans, big: 1, why: `Look past the matching letters. In ABC order: ${sorted.join(", ")}.`, key: "v22t" + words.join(), v22: { r } };
});
whyRule(8, "english", "abc", EN8V_RULE);

/* ---------- Adjectives ---------- */
// [sentence, adjective, noun, verb, optional 4th word, its type]
const EN8V_ADJ1 = [
  ["A playful otter splashed in the river.", "playful", "otter", "splashed", "river", "n"], ["Grandma knitted a cozy sweater.", "cozy", "sweater", "knitted"],
  ["The brave firefighter climbed the ladder.", "brave", "firefighter", "climbed", "ladder", "n"], ["We picked ripe peaches.", "ripe", "peaches", "picked"],
  ["A gentle breeze cooled us.", "gentle", "breeze", "cooled"], ["The curious puppy sniffed the box.", "curious", "puppy", "sniffed", "box", "n"],
  ["Dad baked a huge pizza.", "huge", "pizza", "baked"], ["The muddy boots sat by the door.", "muddy", "boots", "sat", "door", "n"],
  ["Kenji drew a purple dragon.", "purple", "dragon", "drew"], ["A loud thunderstorm woke me.", "loud", "thunderstorm", "woke"],
  ["The sleepy baby yawned.", "sleepy", "baby", "yawned"], ["We slurped the tasty noodles.", "tasty", "noodles", "slurped"],
  ["The friendly neighbor waved.", "friendly", "neighbor", "waved"], ["Mia carried an empty basket.", "empty", "basket", "carried"],
  ["The bumpy toad hopped away.", "bumpy", "toad", "hopped"], ["Leo wore his lucky socks.", "lucky", "socks", "wore"],
  ["A wise owl hooted.", "wise", "owl", "hooted"], ["The crowded bus stopped.", "crowded", "bus", "stopped"],
  ["We fed a spotted giraffe.", "spotted", "giraffe", "fed"], ["The squeaky door opened slowly.", "squeaky", "door", "opened", "slowly", "adv"],
  ["Ava hummed a happy tune.", "happy", "tune", "hummed"], ["The prickly cactus needs sun.", "prickly", "cactus", "needs", "sun", "n"],
  ["The silver van rattled down the road.", "silver", "van", "rattled", "road", "n"], ["A hungry squirrel buried nuts.", "hungry", "squirrel", "buried", "nuts", "n"],
  ["The chilly wind blew.", "chilly", "wind", "blew"], ["Omar opened a mysterious box.", "mysterious", "box", "opened"],
  ["We built a gigantic sandcastle.", "gigantic", "sandcastle", "built"], ["The fuzzy caterpillar crawled.", "fuzzy", "caterpillar", "crawled"],
  ["My little sister giggled.", "little", "sister", "giggled"], ["The calm lake sparkled.", "calm", "lake", "sparkled"],
  ["The juicy plum dripped.", "juicy", "plum", "dripped"], ["A long shadow moved.", "long", "shadow", "moved"],
  ["Nora planted yellow daisies.", "yellow", "daisies", "planted"], ["The polite boy said thanks.", "polite", "boy", "said"],
  ["We heard a sweet melody.", "sweet", "melody", "heard"],
];
// [sentence, adj1, noun1, adj2, noun2, verb]
const EN8V_ADJ2 = [
  ["The tall girl walked a tiny dog.", "tall", "girl", "tiny", "dog", "walked"], ["A fluffy cat chased a red ball.", "fluffy", "cat", "red", "ball", "chased"],
  ["The hungry bear found sweet berries.", "hungry", "bear", "sweet", "berries", "found"], ["My kind teacher read a funny book.", "kind", "teacher", "funny", "book", "read"],
  ["A loud bell woke the sleepy kids.", "loud", "bell", "sleepy", "kids", "woke"], ["The brown horse ate crunchy carrots.", "brown", "horse", "crunchy", "carrots", "ate"],
  ["A little bird sat on a thin branch.", "little", "bird", "thin", "branch", "sat"], ["The happy baby held a soft blanket.", "happy", "baby", "soft", "blanket", "held"],
  ["Dad cooked hot pancakes on a cold morning.", "hot", "pancakes", "cold", "morning", "cooked"], ["The busy chef chopped fresh carrots.", "busy", "chef", "fresh", "carrots", "chopped"],
  ["A green frog jumped into the muddy pond.", "green", "frog", "muddy", "pond", "jumped"], ["The young boy flew a colorful kite.", "young", "boy", "colorful", "kite", "flew"],
  ["A quiet mouse nibbled stale bread.", "quiet", "mouse", "stale", "bread", "nibbled"], ["The strong farmer lifted a heavy box.", "strong", "farmer", "heavy", "box", "lifted"],
  ["My big brother has a shiny bike.", "big", "brother", "shiny", "bike", "has"], ["The proud artist painted a giant picture.", "proud", "artist", "giant", "picture", "painted"],
  ["A gray whale swam in the deep ocean.", "gray", "whale", "deep", "ocean", "swam"], ["The silly clown wore floppy shoes.", "silly", "clown", "floppy", "shoes", "wore"],
  ["Our new neighbor has a fuzzy puppy.", "new", "neighbor", "fuzzy", "puppy", "has"], ["The tired hiker drank cool water.", "tired", "hiker", "cool", "water", "drank"],
  ["A clever fox crossed the wide river.", "clever", "fox", "wide", "river", "crossed"], ["The wet dog shook on the clean rug.", "wet", "dog", "clean", "rug", "shook"],
];
const EN8V_nounWhy = w => `${EN8V_Q(w)} is a noun, a naming word. It doesn't describe anything.`;
const EN8V_verbWhy = w => `${EN8V_Q(w)} is a verb, an action word. It doesn't describe a noun.`;
addBank(8, "english", "adjectives", 0.42, function () {
  if (Math.random() < 0.45) {
    const [s, a, n, v, x, t] = pick(EN8V_ADJ1), r = {}; r[n] = EN8V_nounWhy(n); r[v] = EN8V_verbWhy(v);
    if (x) r[x] = t === "adv" ? `${EN8V_Q(x)} tells how something happened, not what a noun is like.` : EN8V_nounWhy(x);
    return { q: `Which word is the <b>adjective</b>?<div class="sentence">${s}</div>`, say: `Which word is the adjective? ${s}`, opts: shuffle([a, n, v].concat(x ? [x] : [])), ans: a, big: 1, why: `${EN8V_C(a)} describes the ${n}.`, key: "v22a" + s, v22: { r } };
  }
  const [s, a1, n1, a2, n2, v] = pick(EN8V_ADJ2), second = Math.random() < 0.5, [a, n, oa, on] = second ? [a2, n2, a1, n1] : [a1, n1, a2, n2], r = {};
  r[oa] = `${EN8V_Q(oa)} describes the ${on}, not the ${n}.`; r[v] = EN8V_verbWhy(v); r[on] = EN8V_nounWhy(on);
  return { q: `Which adjective describes the <b>${n}</b>?<div class="sentence">${s}</div>`, say: `${s} Which adjective describes the ${n}?`, opts: shuffle([a, oa, v, on]), ans: a, big: 1, why: `${EN8V_C(a)} tells what the ${n} ${/s$/.test(n) && !/ss$/.test(n) ? "are" : "is"} like: the ${a} ${n}.`, key: "v22b" + s + n, v22: { r } };
});
whyRule(8, "english", "adjectives", EN8V_RULE);

/* ---------- Capital letters ---------- */
const EN8V_CAPT = { name: "is a person's name", pet: "is a pet's name", place: "is the name of a place", day: "is a day of the week", month: "is a month" };
const EN8V_CAPS1 = [
  ["My friend *jada* plays chess.", "name"], ["We drove to *oregon* last summer.", "place"], ["The parade is on *tuesday*.", "day"],
  ["My uncle *raj* plays the drums.", "name"], ["Our cat *mittens* sleeps a lot.", "pet"], ["Grandma lives in *florida*.", "place"],
  ["The pumpkin patch opens in *october*.", "month"], ["Can *i* have a turn?", "i"], ["My best friend is *tomas*.", "name"],
  ["The pool opens on *saturday*.", "day"], ["We flew to *mexico* for a wedding.", "place"], ["Our goat *pickles* eats everything.", "pet"],
  ["We play in the snow in *january*.", "month"], ["Mom and *i* made muffins.", "i"], ["My teacher is from *vermont*.", "place"],
  ["The new boy is named *felix*.", "name"], ["Our dog *bruno* likes the park.", "pet"], ["We go camping in *august*.", "month"],
  ["We get pizza every *friday*.", "day"], ["My aunt lives in *toronto*.", "place"], ["My cousin *nia* is very tall.", "name"],
  ["The library has story time on *wednesday*.", "day"], ["Our bunny *snowball* has long ears.", "pet"], ["We plant seeds in *april*.", "month"],
  ["Dad and *i* fixed the fence.", "i"], ["My pen pal lives in *ghana*.", "place"], ["The bake sale is on *monday*.", "day"],
  ["My grandpa *luis* grows peppers.", "name"], ["Our fish *bubbles* swims in circles.", "pet"], ["We went sledding in *december*.", "month"],
  ["My family visited *utah* last year.", "place"], ["May *i* borrow a pencil?", "i"], ["The fair starts in *september*.", "month"],
  ["My classmate *diego* draws comics.", "name"], ["Our parrot *sunny* says hello.", "pet"], ["Swim class is on *thursday*.", "day"],
  ["My grandma grew up in *korea*.", "place"], ["We see fireflies in *june*.", "month"], ["Our class wrote letters to *aiden*.", "name"],
  ["We visited a cave in *kentucky*.", "place"],
];
const EN8V_CAPS2 = [
  "On *monday*, *leo* went to the ^dentist.", "My friend *ava* moved to *ohio* in the ^spring.", "My ^sister *maya* was born in *march*.",
  "Every *friday*, *omar* walks his ^dog.", "We sent a ^card to *rosa* in *mexico*.", "Last *july*, *kai* visited the ^beach.",
  "My pen pal *hiro* ^lives in *japan*.", "On *saturday*, *nora* will bake ^bread.", "Our ^dog *daisy* was born in *april*.",
  "In *october*, we ^drove to *maine*.", "My ^friend *sam* lives in *denver*.", "The ^fair in *texas* starts on *sunday*.",
  "Next *tuesday*, *ella* has a ^recital.", "My ^cousin *jamal* lives in *chicago*.", "In *august*, *zoe* learned to ^swim.",
  "Our ^hamster *coco* came home in *november*.", "On *wednesday*, *ravi* lost a ^tooth.", "My aunt *lina* ^works in *boston*.",
  "We ^visited *canada* in *february*.", "Last *thursday*, *hana* read a ^book.", "My friend *mateo* ^moved to *arizona*.",
  "Every *sunday*, *grace* plays ^soccer.", "In *january*, *noah* built a ^snowman.", "My uncle *ben* drives a ^truck in *iowa*.",
];
const EN8V_SEASON = ["summer", "winter", "spring", "fall"];
addBank(8, "english", "capitals", 0.36, function () {
  if (Math.random() < 0.6) {
    const [raw, t] = pick(EN8V_CAPS1), a = raw.match(/\*(.+?)\*/)[1], s = raw.replace(/\*/g, "");
    const words = [...new Set(s.replace(/[.,!?]/g, "").split(" ").slice(1).filter(w => w !== a && w === w.toLowerCase() && w.length > 1))];
    const opts = uniq(a, shuffle(words)), r = {};
    opts.forEach(w => { if (w !== a) r[w] = EN8V_SEASON.includes(w) ? `Seasons like ${EN8V_Q(w)} aren't special names, so they start with a small letter.` : `${EN8V_Q(w)} is an everyday word, not a special name, so it starts with a small letter.`; });
    const A = a === "i" ? "I" : EN8V_C(a);
    return { q: `Which word needs a <b>capital letter</b>?<div class="sentence">${s}</div>`, say: `Which word needs a capital letter? ${s}`, opts, ans: a, big: 1, why: a === "i" ? `When you mean yourself, I is always a capital: ${s.replace(/\bi\b/, "I")}` : `${A} ${EN8V_CAPT[t]}, so it starts with a capital: ${s.replace(new RegExp(`\\b${a}\\b`), A)}`, key: "v22c" + s, v22: { r } };
  }
  const raw = pick(EN8V_CAPS2), stars = [...raw.matchAll(/\*(.+?)\*/g)].map(m => m[1]), common = raw.match(/\^(\w+)/)[1];
  const base = raw.replace(/\^/g, ""), make = up => base.replace(/\*(.+?)\*/g, (m, w) => up.includes(w) ? EN8V_C(w) : w);
  const A = make(stars), low = make([]), j = R(0, 1), oneLow = make([stars[1 - j]]), extra = A.replace(new RegExp(`\\b${common}\\b`), EN8V_C(common)), r = {};
  r[low] = `${EN8V_Q(EN8V_C(stars[0]))} and ${EN8V_Q(EN8V_C(stars[1]))} are special names, so both need capital letters.`;
  r[oneLow] = `${EN8V_Q(EN8V_C(stars[j]))} is a special name, so it needs a capital letter too.`;
  r[extra] = `${EN8V_Q(EN8V_C(common))} is an everyday word here, so it shouldn't have a capital letter.`;
  return { q: "Which sentence uses <b>capital letters</b> correctly?", say: "Which sentence uses capital letters correctly?", opts: shuffle([A, low, oneLow, extra]), ans: A, why: `${EN8V_C(stars[0])} and ${EN8V_C(stars[1])} are special names. Everyday words stay small.`, key: "v22d" + base, v22: { r } };
});
whyRule(8, "english", "capitals", EN8V_RULE);

/* ---------- -er and -est ---------- */
// [base, -er, -est, [emoji, sentence comparing two], [emoji, sentence comparing three or more]]
const EN8V_CMP = [
  ["fast", "faster", "fastest", ["🚗", "A car is ___ than a bike."], ["🏃", "Of the four runners, Mia was the ___."]],
  ["tall", "taller", "tallest", ["🦒", "A giraffe is ___ than a zebra."], ["🌲", "That pine is the ___ tree in the whole park."]],
  ["small", "smaller", "smallest", ["🐭", "A mouse is ___ than a cat."], ["📦", "Of the three boxes, the red one is the ___."]],
  ["warm", "warmer", "warmest", ["☀️", "Summer is ___ than winter."], ["🧤", "These are the ___ mittens I own."]],
  ["loud", "louder", "loudest", ["🦁", "A lion's roar is ___ than a cat's meow."], ["🥁", "Ben has the ___ drum in the band."]],
  ["soft", "softer", "softest", ["🧸", "A pillow is ___ than a rock."], ["🐰", "Of all the bunnies, Snow has the ___ fur."]],
  ["long", "longer", "longest", ["🐍", "A snake is ___ than a worm."], ["🚂", "This is the ___ train I have ever seen."]],
  ["short", "shorter", "shortest", ["✏️", "My pencil is ___ than my ruler."], ["📅", "February is the ___ month of the year."]],
  ["cold", "colder", "coldest", ["🧊", "An ice cube is ___ than warm milk."], ["❄️", "January was the ___ month of the year in our town."]],
  ["deep", "deeper", "deepest", ["🌊", "The ocean is ___ than a pond."], ["🏊", "This is the ___ part of the pool."]],
  ["big", "bigger", "biggest", ["🐘", "An elephant is ___ than a horse."], ["🎈", "Lily picked the ___ balloon of all."]],
  ["hot", "hotter", "hottest", ["🍲", "The soup is ___ than the ice cream."], ["🌞", "That was the ___ day of the whole summer."]],
  ["thin", "thinner", "thinnest", ["📄", "Paper is ___ than cardboard."], ["🍝", "Of the three noodles, this one is the ___."]],
  ["happy", "happier", "happiest", ["😄", "Ava is ___ today than she was yesterday."], ["🎉", "My birthday was the ___ day of my year."]],
  ["funny", "funnier", "funniest", ["🤡", "This joke is ___ than that one."], ["😂", "Kai told the ___ joke in the class."]],
  ["busy", "busier", "busiest", ["🐝", "The bakery is ___ on Saturday than on Sunday."], ["🛒", "The store is the ___ on the day before a holiday."]],
  ["easy", "easier", "easiest", ["📝", "This puzzle is ___ than that one."], ["🧩", "Of all the puzzles, this one is the ___."]],
  ["heavy", "heavier", "heaviest", ["🧱", "A brick is ___ than a feather."], ["🎒", "Omar has the ___ backpack in his class."]],
  ["good", "better", "best", ["🍪", "This cookie is ___ than the last one."], ["🏆", "Our team had the ___ score of all."]],
  ["bad", "worse", "worst", ["🌧️", "Today's storm is ___ than yesterday's."], ["🤧", "This is the ___ cold I have ever had."]],
  ["bright", "brighter", "brightest", ["🔦", "A flashlight is ___ than a candle."], ["⭐", "That is the ___ star in the sky tonight."]],
  ["sharp", "sharper", "sharpest", ["✏️", "My new pencil is ___ than my old one."], ["📐", "Of the three pencils, this one is the ___."]],
  ["wide", "wider", "widest", ["🛣️", "A highway is ___ than a sidewalk."], ["🌉", "This is the ___ bridge in our city."]],
  ["nice", "nicer", "nicest", ["🌤️", "Today's weather is ___ than yesterday's."], ["🌸", "Our garden has the ___ flowers on the street."]],
  ["early", "earlier", "earliest", ["⏰", "I woke up ___ than my brother."], ["🌅", "Grandpa is the ___ riser in our family."]],
  ["strong", "stronger", "strongest", ["🦍", "A gorilla is ___ than a monkey."], ["💪", "Of the four kids, Rosa is the ___."]],
  ["noisy", "noisier", "noisiest", ["🦜", "The parrot is ___ than the fish."], ["🎺", "Our band room is the ___ room in the school."]],
  ["slow", "slower", "slowest", ["🐌", "A snail is ___ than a rabbit."], ["🐢", "Of all the racers, the turtle was the ___."]],
];
const EN8V_DBL = ["big", "hot", "thin"];
addBank(8, "english", "comparing", 0.3, function () {
  const [b, er, est, T2, T3] = pick(EN8V_CMP), two = Math.random() < 0.5, [e, s] = two ? T2 : T3, ans = two ? er : est, end = two ? "-er" : "-est", other = two ? est : er, r = {};
  r[b] = b === "good" || b === "bad" ? `${EN8V_Q(b)} alone doesn't compare anything.` : `${EN8V_Q(b)} alone doesn't compare anything. ${two ? "Comparing two needs -er." : "Comparing three or more needs -est."}`;
  r[other] = two ? `${EN8V_Q(est)} is for three or more, but this compares just two things.` : `${EN8V_Q(er)} compares just two, but this compares three or more.`;
  let third;
  if (b === "good") { third = two ? "gooder" : "goodest"; r[third] = `We don't say ${EN8V_Q(third)}. Good changes to better and best.`; }
  else if (b === "bad") { third = two ? "badder" : "baddest"; r[third] = `We don't say ${EN8V_Q(third)}. Bad changes to worse and worst.`; }
  else if (/y$/.test(b)) { third = b + (two ? "er" : "est"); r[third] = `${EN8V_Q(third)} is spelled wrong. Change the y to i before adding ${end}.`; }
  else if (EN8V_DBL.includes(b)) { third = b + (two ? "er" : "est"); r[third] = `${EN8V_Q(third)} is spelled wrong. Double the last letter first.`; }
  else { third = (two ? "more " : "most ") + b; r[third] = `We don't say ${EN8V_Q(third)}. For a short word like ${EN8V_Q(b)}, we change the ending instead.`; }
  const show = s.replace("___", '<span class="blank">___</span>');
  return { q: `<span class="emo">${e}</span> ${show}`, say: `${s.replace("___", "blank")} Which word fits?`, opts: shuffle([ans, b, other, third]), ans, big: 1, why: two ? `This compares two things, so use ${er}.` : `This compares three or more, so use ${est}.`, key: "v22" + b + two, v22: { r } };
});
whyRule(8, "english", "comparing", EN8V_RULE);

/* ---------- Compound words: find the compound word in a sentence ---------- */
// [sentence, compound, part 1, part 2, other words from the sentence]
const EN8V_CMPD = [
  ["The tall lighthouse glows at night.", "lighthouse", "light", "house", ["tall", "glows", "night"]],
  ["We saw a tiny seahorse at the aquarium.", "seahorse", "sea", "horse", ["tiny", "saw", "aquarium"]],
  ["Dad fixed the loose doorknob.", "doorknob", "door", "knob", ["fixed", "loose"]],
  ["Ava wore fuzzy earmuffs in the snow.", "earmuffs", "ear", "muffs", ["wore", "fuzzy", "snow"]],
  ["A scarecrow stood in the field.", "scarecrow", "scare", "crow", ["stood", "field"]],
  ["We sang songs by the campfire.", "campfire", "camp", "fire", ["sang", "songs"]],
  ["My sister read a storybook to me.", "storybook", "story", "book", ["sister", "read"]],
  ["The puppy chewed my shoelace.", "shoelace", "shoe", "lace", ["puppy", "chewed"]],
  ["Kai drank milk from a teacup.", "teacup", "tea", "cup", ["drank", "milk"]],
  ["A bright sunbeam warmed the room.", "sunbeam", "sun", "beam", ["bright", "warmed", "room"]],
  ["The mailbox was full of letters.", "mailbox", "mail", "box", ["full", "letters"]],
  ["Rosa planted seeds in the flowerpot.", "flowerpot", "flower", "pot", ["planted", "seeds"]],
  ["A ladybug landed on my hand.", "ladybug", "lady", "bug", ["landed", "hand"]],
  ["The goldfish swam in circles.", "goldfish", "gold", "fish", ["swam", "circles"]],
  ["Our cat sleeps on the windowsill.", "windowsill", "window", "sill", ["cat", "sleeps"]],
  ["Dad put the groceries in the backseat.", "backseat", "back", "seat", ["put", "groceries"]],
  ["My brother lost his toothbrush.", "toothbrush", "tooth", "brush", ["brother", "lost"]],
  ["The cowboy rode a brown horse.", "cowboy", "cow", "boy", ["rode", "brown", "horse"]],
  ["Nora wrote her name in the notebook.", "notebook", "note", "book", ["wrote", "name"]],
  ["Snowflakes fell on the roof.", "snowflakes", "snow", "flakes", ["fell", "roof"]],
  ["We saw a jellyfish at the beach.", "jellyfish", "jelly", "fish", ["saw", "beach"]],
  ["A firefly blinked in the dark.", "firefly", "fire", "fly", ["blinked", "dark"]],
  ["Mia rode her skateboard to the park.", "skateboard", "skate", "board", ["rode", "park"]],
  ["The bookshelf is full of comics.", "bookshelf", "book", "shelf", ["full", "comics"]],
  ["Leo took a bath in the bathtub.", "bathtub", "bath", "tub", ["took", "bath"]],
  ["The wind blew the sailboat across the lake.", "sailboat", "sail", "boat", ["wind", "blew", "lake"]],
  ["I keep my crayons in a shoebox.", "shoebox", "shoe", "box", ["keep", "crayons"]],
  ["A woodpecker tapped on the tree.", "woodpecker", "wood", "pecker", ["tapped", "tree"]],
  ["The farmer milked the cow in the barnyard.", "barnyard", "barn", "yard", ["farmer", "milked", "cow"]],
  ["Kofi kicked the football high.", "football", "foot", "ball", ["kicked", "high"]],
  ["The bluebird sang a song.", "bluebird", "blue", "bird", ["sang", "song"]],
  ["We swam near the waterfall.", "waterfall", "water", "fall", ["swam", "near"]],
  ["Put the dishes in the dishwasher.", "dishwasher", "dish", "washer", ["dishes", "put"]],
  ["The doghouse needs new paint.", "doghouse", "dog", "house", ["needs", "new", "paint"]],
];
addBank(8, "english", "compound", 0.2, function () {
  const [s, w, a, b, others] = pick(EN8V_CMPD), opts = shuffle([w, ...shuffle(others).slice(0, 3)]), r = {};
  opts.forEach(o => { if (o !== w) r[o] = `${EN8V_Q(o)} is just one word. You can't split it into two smaller words.`; });
  return { q: `Which word in this sentence is a <b>compound word</b>?<div class="sentence">${s}</div>`, say: `Which word in this sentence is a compound word? ${s}`, opts, ans: w, big: 1, why: `${EN8V_C(w)} is made of ${a} and ${b}.`, key: "v22" + s, v22: { r } };
});
whyRule(8, "english", "compound", EN8V_RULE);

/* ---------- Fact or opinion ---------- */
const EN8V_FACT = [["A dime is worth ten cents.", "you can check it with real coins"], ["Cats have whiskers.", "you can look at a cat and see them"],
  ["Ice melts when it gets warm.", "you can watch an ice cube melt"], ["There are twenty-four hours in a day.", "you can count the hours on a clock"],
  ["A hexagon has six sides.", "you can count a hexagon's sides"], ["Zebras have stripes.", "you can see the stripes in a picture"],
  ["Butterflies have wings.", "you can look at a butterfly and see them"], ["A nickel is worth five cents.", "you can check it with real coins"],
  ["Chicks hatch from eggs.", "farmers and animal books can show it"], ["Rain falls from clouds.", "you can watch rain fall from the sky"],
  ["An inch is shorter than a foot.", "you can measure with a ruler"], ["Elephants have trunks.", "you can see an elephant's trunk at the zoo"],
  ["February is the shortest month.", "you can count the days on a calendar"], ["Snakes do not have legs.", "you can look at a snake and check"],
  ["A quarter is worth twenty-five cents.", "you can check it with real coins"], ["Frogs can jump.", "you can watch a frog jump"],
  ["The letter A is a vowel.", "you can look it up in a book about letters"], ["Owls have feathers.", "you can see an owl's feathers"],
  ["Mother kangaroos carry babies in a pouch.", "animal books and zoo signs can show it"], ["The sun rises in the morning.", "you can watch it rise each morning"],
  ["A magnet can pick up a paper clip.", "you can test it with a magnet"], ["Ripe lemons are yellow.", "you can look at a lemon"]];
const EN8V_OPIN = [["Tacos are the best lunch.", "best"], ["Green is the prettiest color.", "prettiest"], ["Recess is the most fun part of the day.", "most fun"],
  ["Ladybugs are the cutest bugs.", "cutest"], ["Fall is the coziest season.", "coziest"], ["Puzzles are boring.", "boring"],
  ["Painting is more fun than singing.", "more fun"], ["Owls are the coolest birds.", "coolest"], ["Pancakes taste better than waffles.", "better"],
  ["The beach is more fun than the pool.", "more fun"], ["Thunder is scary.", "scary"], ["Basketball is the most exciting sport.", "most exciting"],
  ["Camping is the best kind of trip.", "best"], ["Long books are boring.", "boring"], ["Bananas are delicious.", "delicious"],
  ["Snow days are the best days.", "best"], ["Peas are the worst vegetable.", "worst"], ["Robots are awesome.", "awesome"],
  ["Red sneakers look cool.", "cool"], ["Math is more fun than art.", "more fun"], ["Kittens are the sweetest pets.", "sweetest"],
  ["Rainbows are beautiful.", "beautiful"]];
addBank(8, "english", "factopinion", 0.4, function () {
  if (Math.random() < 0.5) {
    const f = Math.random() < 0.5, [s, x] = pick(f ? EN8V_FACT : EN8V_OPIN), ans = f ? "Fact 🔬" : "Opinion 💭", r = {};
    if (f) r["Opinion 💭"] = `This can be proven: ${x}.`; else r["Fact 🔬"] = `${EN8V_Q(EN8V_C(x))} shows what someone thinks, and other people could disagree.`;
    return { q: "Is this a fact or an opinion?", say: `Is this a fact or an opinion? ${s}`, vis: `<div class="quote">${s}</div>`, opts: ["Fact 🔬", "Opinion 💭"], ans, big: 1, why: f ? "You can check it and prove it's true." : "It's what someone thinks. Others might disagree.", key: "v22a" + s, v22: { r } };
  }
  const wantFact = Math.random() < 0.5, [a, ax] = pick(wantFact ? EN8V_FACT : EN8V_OPIN), others = shuffle(wantFact ? EN8V_OPIN : EN8V_FACT).slice(0, 3), r = {};
  others.forEach(([s, x]) => { r[s] = wantFact ? `${EN8V_Q(EN8V_C(x))} shows what someone thinks, so that one is an opinion.` : `That one is a fact: ${x}.`; });
  return { q: `Which one is ${wantFact ? "a <b>fact</b>" : "an <b>opinion</b>"}?`, opts: shuffle([a, ...others.map(o => o[0])]), ans: a, why: wantFact ? `"${a}" can be proven: ${ax}.` : `"${a}" is what someone thinks. The clue word is "${ax}".`, key: "v22b" + a + others.map(o => o[0]).join(), v22: { r } };
});
whyRule(8, "english", "factopinion", EN8V_RULE);

/* ---------- Past tense: "What is the past tense of …?" ---------- */
// [base, past, wrong past]; kind: i = irregular, d = double the last letter, y = change y to i, e = ends in e
const EN8V_PT = [
  ["catch", "caught", "catched", "i"], ["think", "thought", "thinked", "i"], ["sleep", "slept", "sleeped", "i"], ["break", "broke", "breaked", "i"],
  ["bite", "bit", "bited", "i"], ["drive", "drove", "drived", "i"], ["forget", "forgot", "forgetted", "i"], ["get", "got", "getted", "i"],
  ["give", "gave", "gived", "i"], ["hurt", "hurt", "hurted", "i"], ["put", "put", "putted", "i"], ["ring", "rang", "ringed", "i"],
  ["shut", "shut", "shutted", "i"], ["sit", "sat", "sitted", "i"], ["swim", "swam", "swimmed", "i"], ["take", "took", "taked", "i"],
  ["tell", "told", "telled", "i"], ["throw", "threw", "throwed", "i"], ["wear", "wore", "weared", "i"], ["win", "won", "winned", "i"],
  ["write", "wrote", "writed", "i"], ["eat", "ate", "eated", "i"], ["go", "went", "goed", "i"], ["see", "saw", "seed", "i"],
  ["run", "ran", "runned", "i"], ["buy", "bought", "buyed", "i"], ["bring", "brought", "bringed", "i"], ["fly", "flew", "flied", "i"],
  ["grow", "grew", "growed", "i"], ["draw", "drew", "drawed", "i"], ["know", "knew", "knowed", "i"], ["begin", "began", "beginned", "i"],
  ["speak", "spoke", "speaked", "i"], ["freeze", "froze", "freezed", "i"], ["dig", "dug", "digged", "i"], ["feed", "fed", "feeded", "i"],
  ["hold", "held", "holded", "i"], ["make", "made", "maked", "i"], ["come", "came", "comed", "i"], ["fall", "fell", "falled", "i"],
  ["find", "found", "finded", "i"], ["lose", "lost", "losed", "i"], ["ride", "rode", "rided", "i"], ["sell", "sold", "selled", "i"],
  ["teach", "taught", "teached", "i"], ["blow", "blew", "blowed", "i"], ["build", "built", "builded", "i"], ["hide", "hid", "hided", "i"],
  ["leave", "left", "leaved", "i"], ["meet", "met", "meeted", "i"], ["feel", "felt", "feeled", "i"], ["keep", "kept", "keeped", "i"],
  ["spend", "spent", "spended", "i"], ["stand", "stood", "standed", "i"],
  ["stop", "stopped", "stoped", "d"], ["clap", "clapped", "claped", "d"], ["drop", "dropped", "droped", "d"], ["shop", "shopped", "shoped", "d"],
  ["skip", "skipped", "skiped", "d"], ["hug", "hugged", "huged", "d"], ["grab", "grabbed", "grabed", "d"],
  ["carry", "carried", "carryed", "y"], ["study", "studied", "studyed", "y"], ["hurry", "hurried", "hurryed", "y"], ["copy", "copied", "copyed", "y"],
  ["bake", "baked", "bakeed", "e"], ["dance", "danced", "danceed", "e"], ["smile", "smiled", "smileed", "e"],
];
const EN8V_DBLING = ["sit", "swim", "run", "put", "begin", "get", "shut", "stop", "clap", "drop", "shop", "skip", "hug", "grab", "dig", "forget", "win"];
const EN8V_s3 = b => b === "go" ? "goes" : /[^aeiou]y$/.test(b) ? b.slice(0, -1) + "ies" : /(s|sh|ch|x|z)$/.test(b) ? b + "es" : b + "s";
const EN8V_ing = b => EN8V_DBLING.includes(b) ? b + b.slice(-1) + "ing" : /[^e]e$/.test(b) ? b.slice(0, -1) + "ing" : b + "ing";
addBank(8, "english", "past", 0.35, function () {
  const [b, p, w, k] = pick(EN8V_PT), s = EN8V_s3(b), g = EN8V_ing(b), r = {};
  r[w] = k === "i" ? `${EN8V_Q(b)} is a tricky verb. We don't just add -ed to it.` : k === "d" ? `${EN8V_Q(w)} is missing a letter. Double the last letter before adding -ed.` : k === "y" ? `${EN8V_Q(w)} is spelled wrong. Change the y to i, then add -ed.` : `${EN8V_Q(w)} has too many e's. For a word that ends in e, just add -d.`;
  r[s] = `${EN8V_Q(s)} tells about now, not the past.`;
  r[g] = `${EN8V_Q(g)} tells about something going on, not something already done.`;
  return { q: `What is the <b>past tense</b> of <b>${b}</b>?`, say: `What is the past tense of ${b}?`, vis: hw(b), opts: shuffle([p, w, s, g]), ans: p, big: 1, why: k === "i" ? `${EN8V_C(b)} changes to ${p}. Today I ${b}; yesterday I ${p}.` : `Today I ${b}; yesterday I ${p}.`, key: "v22" + b, v22: { r } };
});
whyRule(8, "english", "past", EN8V_RULE);

/* ---------- Possessives: one owner ('s) or more than one owner (s') ---------- */
// [context, noun, plural, frame]  one owner
const EN8V_PS1 = [
  ["One rabbit sat in the grass.", "rabbit", "rabbits", "The ___ ears were long."], ["Our puppy ran to the door.", "puppy", "puppies", "The ___ tail wagged fast."],
  ["A girl stood by the swings.", "girl", "girls", "The ___ jacket was red."], ["One bird sang in the tree.", "bird", "birds", "The ___ song was sweet."],
  ["A farmer drove up the hill.", "farmer", "farmers", "The ___ tractor was green."], ["Our teacher came in early.", "teacher", "teachers", "The ___ coffee was hot."],
  ["A fox ran into the woods.", "fox", "foxes", "The ___ fur was orange."], ["One baby woke up from a nap.", "baby", "babies", "The ___ bottle was full."],
  ["A boy kicked the ball.", "boy", "boys", "The ___ shoe flew off."], ["Our cat sat on the rug.", "cat", "cats", "The ___ whiskers twitched."],
  ["One horse ate some hay.", "horse", "horses", "The ___ mane was brown."], ["A pilot waved to us.", "pilot", "pilots", "The ___ hat had wings on it."],
  ["One frog sat on a lily pad.", "frog", "frogs", "The ___ legs were strong."], ["A chef cooked soup.", "chef", "chefs", "The ___ apron was white."],
  ["One bee flew past.", "bee", "bees", "The ___ wings buzzed."], ["A clown waved at the kids.", "clown", "clowns", "The ___ nose was red."],
  ["Our dog dug in the yard.", "dog", "dogs", "The ___ paws were muddy."], ["One student raised a hand.", "student", "students", "The ___ question was smart."],
  ["A king sat on a throne.", "king", "kings", "The ___ crown was gold."], ["One owl hooted at night.", "owl", "owls", "The ___ eyes were big."],
];
// more than one owner
const EN8V_PS2 = [
  ["Three ducks swam in the pond.", "duck", "ducks", "The ___ feet were orange."], ["Two girls ran a race.", "girl", "girls", "The ___ shoes were new."],
  ["Four puppies played in the yard.", "puppy", "puppies", "The ___ ears flopped."], ["Two boys built a fort.", "boy", "boys", "The ___ fort was tall."],
  ["Five birds sat on the fence.", "bird", "birds", "The ___ feathers were blue."], ["Two cats napped in the sun.", "cat", "cats", "The ___ fur was warm."],
  ["Three farmers sold apples.", "farmer", "farmers", "The ___ apples were red."], ["Two horses ran in the field.", "horse", "horses", "The ___ tails swished."],
  ["Many students visited the zoo.", "student", "students", "The ___ bus was yellow."], ["Two babies sat in the cart.", "baby", "babies", "The ___ hats were tiny."],
  ["Three foxes hid in the den.", "fox", "foxes", "The ___ tails were fluffy."], ["Four frogs sang by the pond.", "frog", "frogs", "The ___ songs were loud."],
  ["Two teachers planned a party.", "teacher", "teachers", "The ___ party was fun."], ["Three bees flew to the hive.", "bee", "bees", "The ___ honey was sweet."],
  ["Two dogs chased a ball.", "dog", "dogs", "The ___ ball was yellow."], ["Five clowns rode tiny bikes.", "clown", "clowns", "The ___ bikes had horns."],
  ["Two owls lived in the barn.", "owl", "owls", "The ___ nest was high up."], ["Three kings rode horses.", "king", "kings", "The ___ capes were purple."],
  ["Two pilots flew the plane.", "pilot", "pilots", "The ___ seats were up front."], ["Four rabbits hopped by.", "rabbit", "rabbits", "The ___ noses wiggled."],
];
addBank(8, "english", "possessive", 0.3, function () {
  const one = Math.random() < 0.5, [c, n, pl, f] = pick(one ? EN8V_PS1 : EN8V_PS2), s1 = n + "'s", s2 = pl + "'", ans = one ? s1 : s2, r = {};
  if (one) { r[pl] = `${EN8V_Q(pl)} has no apostrophe, so it just means more than one ${n}.`; r[s2] = `${EN8V_Q(s2)} is for more than one ${n}, but there is only one.`; }
  else { r[s1] = `${EN8V_Q(s1)} is for just one ${n}, but there is more than one.`; r[pl] = `${EN8V_Q(pl)} has no apostrophe, so it doesn't show who owns something.`; }
  return { q: `Which word fits?<div class="sentence">${c} ${f.replace("___", '<span class="blank">___</span>')}</div>`, say: `${c} ${f.replace("___", "blank")} Which word fits?`, opts: shuffle([s1, s2, pl]), ans, big: 1, why: one ? `There is one ${n}, so add apostrophe s: ${s1}.` : `There is more than one ${n}, and ${pl} already ends in s, so just add an apostrophe: ${s2}.`, key: "v22" + c, v22: { r } };
});
whyRule(8, "english", "possessive", EN8V_RULE);

/* ---------- Prefixes: "Which word means …?" ---------- */
const EN8V_PRE = [
  ...["ripe", "ready", "real", "selfish", "helpful", "careful", "pleasant", "wrapped", "locked", "wanted", "hurt", "happy", "fair", "safe"].map(b => ["un", b]),
  ...["tie", "wrap", "load", "plant", "wash", "think", "arrange", "fold", "glue", "draw", "stack", "fill", "build", "play"].map(b => ["re", b]),
  ...["heat", "wash", "cut", "pay", "order", "soak", "cook", "view"].map(b => ["pre", b]),
  ...["like", "agree", "obey", "honest", "trust", "approve", "loyal"].map(b => ["dis", b]),
];
const EN8V_PM = { un: "not", dis: "not", re: "again", pre: "before" };
addBank(8, "english", "prefixes", 0.27, function () {
  const [p, b] = pick(EN8V_PRE), m = PMEAN[p](b), w = p + b, set = p === "un" ? ["un", "re", "pre"] : p === "dis" ? ["dis", "re", "pre"] : ["re", "pre", "un", "dis"], r = {};
  set.filter(x => x !== p).forEach(x => { r[x + b] = `${EN8V_Q(x + b)} starts with ${x}-, which means “${EN8V_PM[x]}”.`; });
  return { q: `Which word means <b>${m}</b>?`, say: `Which word means ${m}?`, opts: shuffle(set.map(x => x + b)), ans: w, big: 1, why: `${p}- means "${EN8V_PM[p]}", so ${w} means ${m}.`, key: "v22" + w, v22: { r } };
});
whyRule(8, "english", "prefixes", EN8V_RULE);

/* ---------- Pronouns: who or what does the pronoun mean? ---------- */
const EN8V_PRD = { she: "a girl or woman", he: "a boy or man", it: "one thing or animal", they: "more than one", we: "a group that includes me" };
// [text with {P}, pronoun, answer, [[wrong, "is …" description], …]]
const EN8V_PRN = [
  ["Grandpa handed my sister the cookies. {She} ate two of them.", "She", "my sister", [["Grandpa", "is a man"], ["the cookies", "are things"]]],
  ["Mom and Uncle Ray fixed the old car. {He} changed the tire.", "He", "Uncle Ray", [["Mom", "is a woman"], ["the car", "is a thing"]]],
  ["Dad and the boys found a kitten. {It} was very hungry.", "It", "the kitten", [["Dad", "is a person"], ["the boys", "are people"]]],
  ["Aunt Rosa took the twins to the zoo. {They} saw a tiger.", "They", "the twins", [["Aunt Rosa", "is just one person"], ["the zoo", "is one place"]]],
  ["My brother gave Mom a flower. {She} put it in a vase.", "She", "Mom", [["my brother", "is a boy"], ["the flower", "is a thing"]]],
  ["The queen gave the king a map. {He} studied it carefully.", "He", "the king", [["the queen", "is a woman"], ["the map", "is a thing"]]],
  ["Ms. Park read the kids a story. {They} laughed at the end.", "They", "the kids", [["Ms. Park", "is just one person"], ["the story", "is one thing"]]],
  ["Grandma bought Dad a new hat. {It} was bright green.", "It", "the hat", [["Grandma", "is a woman"], ["Dad", "is a man"]]],
  ["My sister and I baked muffins for Grandpa. {We} used blueberries.", "We", "my sister and I", [["Grandpa", "is one man, not me"], ["the muffins", "are things"]]],
  ["The farmer chased the geese out of the garden. {They} flew over the fence.", "They", "the geese", [["the farmer", "is just one person"], ["the garden", "is one place"]]],
  ["Uncle Joe called Mom on the phone. {He} told her a joke.", "He", "Uncle Joe", [["Mom", "is a woman"], ["the phone", "is a thing"]]],
  ["My mom picked up the girls from school. {They} were tired.", "They", "the girls", [["my mom", "is just one person"], ["school", "is one place"]]],
  ["The man and his daughter walked the dog to the lake. {It} jumped into the water.", "It", "the dog", [["the man", "is a person"], ["his daughter", "is a person"]]],
  ["Dad asked my sisters to carry the box. {They} lifted it together.", "They", "my sisters", [["Dad", "is just one person"], ["the box", "is one thing"]]],
  ["Mom gave my brother a sticker. {He} put it on his shirt.", "He", "my brother", [["Mom", "is a woman"], ["the sticker", "is a thing"]]],
  ["Grandpa showed Ana and me his garden. {We} picked ripe tomatoes.", "We", "Ana and me", [["Grandpa", "is one man, not me"], ["the garden", "is a place"]]],
  ["The girls gave Mr. Diaz a card. {He} smiled and said thank you.", "He", "Mr. Diaz", [["the girls", "are more than one girl"], ["the card", "is a thing"]]],
  ["Grandma sent my brother a letter. {It} came in a blue envelope.", "It", "the letter", [["Grandma", "is a person"], ["my brother", "is a person"]]],
  ["The coach gave the players water. {They} drank it all.", "They", "the players", [["the coach", "is just one person"], ["the water", "is one thing"]]],
  ["My uncle took my cousin and me out on the boat. {We} caught three fish.", "We", "my cousin and me", [["my uncle", "is one man, not me"], ["the boat", "is a thing"]]],
  ["Dad handed the baby a rattle. {She} shook it and giggled.", "She", "the baby", [["Dad", "is a man"], ["the rattle", "is a thing"]]],
  ["Mom read a book to my brothers. {They} fell asleep.", "They", "my brothers", [["Mom", "is just one person"], ["the book", "is one thing"]]],
  ["The king gave the princess a horse. {She} rode it to the castle.", "She", "the princess", [["the king", "is a man"], ["the horse", "is an animal"]]],
  ["Dad and my sister walked our dog. {It} chased a squirrel.", "It", "our dog", [["Dad", "is a person"], ["my sister", "is a person"]]],
  ["Grandma gave Leo and Max a hug. {They} hugged her back.", "They", "Leo and Max", [["Grandma", "is just one person"]]],
  ["Mrs. Lee gave us a quiz. {It} had ten questions.", "It", "the quiz", [["Mrs. Lee", "is a person"]]],
  ["Dad made pancakes for Mia and me. {We} ate them all.", "We", "Mia and me", [["Dad", "is one man, not me"], ["the pancakes", "are things"]]],
  ["The firefighter showed the kids the truck. {They} climbed inside.", "They", "the kids", [["the firefighter", "is just one person"], ["the truck", "is one thing"]]],
  ["Mom bought my sister new boots. {They} were bright red.", "They", "the boots", [["Mom", "is just one person"], ["my sister", "is just one person"]]],
  ["Uncle Ben gave Grandma some roses. {She} put them in water.", "She", "Grandma", [["Uncle Ben", "is a man"], ["the roses", "are things"]]],
  ["Mr. Diaz helped my sister with her bike. {He} fixed the chain.", "He", "Mr. Diaz", [["my sister", "is a girl"], ["the bike", "is a thing"]]],
  ["Aunt Maya gave the boys a puzzle. {It} had 100 pieces.", "It", "the puzzle", [["Aunt Maya", "is a person"], ["the boys", "are people"]]],
  ["Dad called my brother and me inside. {We} washed our hands.", "We", "my brother and me", [["Dad", "is one man, not me"]]],
  ["Grandpa taught my sisters a song. {They} sang it at dinner.", "They", "my sisters", [["Grandpa", "is just one person"], ["the song", "is one thing"]]],
  ["The queen showed the prince a painting. {He} liked the colors.", "He", "the prince", [["the queen", "is a woman"], ["the painting", "is a thing"]]],
];
addBank(8, "english", "pronouns", 0.25, function () {
  const i = R(0, EN8V_PRN.length - 1), [t, P, a, ws] = EN8V_PRN[i], pl = P.toLowerCase(), show = t.replace(`{${P}}`, `<b>${P}</b>`), plain = t.replace(`{${P}}`, P), r = {};
  ws.forEach(([w, d]) => { r[w] = `${EN8V_C(w)} ${d}, but ${EN8V_Q(pl)} is for ${EN8V_PRD[pl]}.`; });
  return { q: `Who or what does <b>${P}</b> mean?<div class="sentence">${show}</div>`, say: `${plain} Who or what does ${pl} mean?`, opts: shuffle([a, ...ws.map(w => w[0])]), ans: a, big: 1, why: `${EN8V_Q(P)} stands for ${a}.`, key: "v22" + i, v22: { r } };
});
whyRule(8, "english", "pronouns", EN8V_RULE);

/* ---------- Reading stories: new original passages, each wrong option has its own reason ---------- */
// qs: [question, answer, [[wrong, reason] ×3], index of the sentence that proves the answer]
const EN8V_PASS = [
  { p: "Tess and her dad made a bird feeder from an old milk carton. They cut a window in each side and filled it with seeds. Tess hung it on a low branch by the kitchen window. The next morning, three red cardinals came to eat.", qs: [
    ["What did they use to make the bird feeder?", "an old milk carton", [["a paper plate", "The story never mentions a paper plate."], ["a wooden box", "The story says a milk carton, not a wooden box."], ["a glass jar", "The story never mentions a glass jar."]], 0],
    ["What did they fill the feeder with?", "seeds", [["bread crumbs", "The story says seeds, not bread crumbs."], ["water", "The story never says they put water in it."], ["berries", "The story never mentions berries."]], 1],
    ["Where did Tess hang the feeder?", "on a low branch", [["on the front door", "The story says a branch, not a door."], ["on the roof", "The story never mentions a roof."], ["inside the kitchen", "The story says it hung on a branch, not inside the kitchen."]], 2],
    ["How many cardinals came to eat?", "three", [["one", "The story says three cardinals, not one."], ["two", "The story says three cardinals, not two."], ["five", "The story says three cardinals, not five."]], 3]] },
  { p: "Jun's grandma grows herbs in pots on her balcony. She has basil, mint, and parsley. Every Sunday, Jun helps her water the pots. Then they pick a few mint leaves to put in their lemonade.", qs: [
    ["Where does Grandma grow herbs?", "on her balcony", [["in a big field", "The story never mentions a field."], ["at the school garden", "The story never mentions a school."], ["in the backyard", "The story says on her balcony, not in the backyard."]], 0],
    ["When does Jun help water the pots?", "every Sunday", [["every Monday", "The story says Sunday, not Monday."], ["every Friday", "The story says Sunday, not Friday."], ["every Saturday", "The story says Sunday, not Saturday."]], 2],
    ["What do they put in their lemonade?", "mint leaves", [["basil leaves", "Grandma grows basil, but the mint goes in the lemonade."], ["sugar cubes", "The story never mentions sugar."], ["parsley", "Grandma grows parsley, but the mint goes in the lemonade."]], 3],
    ["Who helps Grandma water the pots?", "Jun", [["Jun's mom", "The story never mentions Jun's mom."], ["a neighbor", "The story never mentions a neighbor."], ["Jun's sister", "The story never mentions a sister."]], 2]] },
  { p: "Bats sleep during the day and fly at night. Many bats hang upside down in caves or under bridges. Some bats eat bugs, and others eat fruit. One small bat can eat hundreds of bugs in one night!", qs: [
    ["When do bats sleep?", "during the day", [["at night", "The story says bats fly at night, not sleep."], ["only in winter", "The story never mentions winter."], ["after dinner", "The story never mentions dinner."]], 0],
    ["Where do many bats hang?", "in caves or under bridges", [["in nests on the ground", "The story never mentions nests."], ["in the ocean", "The story never mentions the ocean."], ["on rooftops", "The story never mentions rooftops."]], 1],
    ["How do many bats hang?", "upside down", [["sideways", "The story says upside down, not sideways."], ["from their tails", "The story never mentions tails."], ["right side up", "The story says upside down."]], 1],
    ["How many bugs can one small bat eat in a night?", "hundreds", [["two", "The story says hundreds, much more than two."], ["ten", "The story says hundreds, much more than ten."], ["only one", "The story says hundreds, not just one."]], 3]] },
  { p: "Marco wanted to win the art contest at the library. He painted a picture of his town with the river and the old red bridge. He worked on it for three days. Marco did not win first place, but the librarian hung his painting by the front door.", qs: [
    ["What contest did Marco enter?", "the art contest", [["a spelling contest", "The story says an art contest, not spelling."], ["a running race", "The story never mentions a race."], ["a baking contest", "The story never mentions baking."]], 0],
    ["What did Marco paint?", "his town", [["his dog", "The story never mentions a dog."], ["the ocean", "He painted a river, not the ocean."], ["a castle", "The story never mentions a castle."]], 1],
    ["How long did Marco work on his painting?", "three days", [["one hour", "The story says three days, not one hour."], ["two weeks", "The story says three days, not two weeks."], ["one day", "The story says three days, not one day."]], 2],
    ["Where was the painting hung?", "by the front door", [["in Marco's bedroom", "The story says the librarian hung it by the front door."], ["on the old red bridge", "The bridge was in the painting, not where it was hung."], ["in the classroom", "The story never mentions a classroom."]], 3]] },
  { p: "A seed needs three things to sprout: water, air, and warmth. When a seed gets wet, it swells up. Soon a tiny root pokes out and grows down into the soil. Then a green shoot grows up toward the light.", qs: [
    ["How many things does a seed need to sprout?", "three", [["two", "The story says three things, not two."], ["five", "The story says three things, not five."], ["ten", "The story says three things, not ten."]], 0],
    ["What happens when a seed gets wet?", "It swells up.", [["It turns blue.", "The story never says the seed changes color."], ["It shrinks.", "The story says it swells up, which means it gets bigger."], ["It falls apart.", "The story never says the seed falls apart."]], 1],
    ["Which way does the root grow?", "down into the soil", [["up toward the light", "The shoot grows up. The root grows down."], ["out of the pot", "The story never mentions a pot."], ["around the seed", "The story says the root grows down, not around."]], 2],
    ["What grows up toward the light?", "a green shoot", [["a tiny root", "The root grows down, not up."], ["a red flower", "The story never mentions a flower."], ["a brown leaf", "The story says a green shoot, not a brown leaf."]], 3]] },
  { p: "On the first day of school, Amira felt shy. She did not know anyone in her new class. At lunch, a girl named Bea asked Amira to sit with her. By the end of the day, Amira and Bea were laughing like old friends.", qs: [
    ["How did Amira feel on the first day?", "shy", [["angry", "The story says Amira felt shy, not angry."], ["sleepy", "The story never says she felt sleepy."], ["bored", "The story never says she was bored."]], 0],
    ["Why did Amira feel that way?", "She did not know anyone.", [["She lost her lunch.", "The story never says she lost her lunch."], ["She was late.", "The story never says she was late."], ["Her shoes were wet.", "The story never mentions her shoes."]], 1],
    ["Who asked Amira to sit with her?", "Bea", [["the teacher", "The story says Bea asked, not the teacher."], ["Amira's mom", "The story never mentions Amira's mom."], ["a boy named Ben", "The story never mentions anyone named Ben."]], 2],
    ["When did Bea ask Amira to sit with her?", "at lunch", [["at recess", "The story says at lunch, not at recess."], ["on the bus", "The story never mentions a bus."], ["after school", "The story says at lunch, not after school."]], 2]] },
  { p: "Sloths live in the treetops of rainforests. They move so slowly that tiny green plants grow on their fur. The green color helps them hide in the leaves. Sloths come down from their trees only about once a week.", qs: [
    ["Where do sloths live?", "in the treetops of rainforests", [["in desert caves", "The story never mentions deserts or caves."], ["in snowy mountains", "The story never mentions snow or mountains."], ["under the sea", "The story never mentions the sea."]], 0],
    ["What grows on a sloth's fur?", "tiny green plants", [["long feathers", "The story never mentions feathers."], ["red flowers", "The story says green plants, not red flowers."], ["sharp spikes", "The story never mentions spikes."]], 1],
    ["How does the green color help sloths?", "It helps them hide.", [["It keeps them warm.", "The story says the green helps them hide, not stay warm."], ["It helps them swim.", "The story never mentions swimming."], ["It makes them fast.", "The story says sloths move slowly."]], 2],
    ["How often do sloths come down from their trees?", "about once a week", [["every hour", "The story says about once a week, not every hour."], ["three times a day", "The story says about once a week, not three times a day."], ["never", "The story says they do come down, about once a week."]], 3]] },
  { p: "Leo and his mom took the train to the city to visit the science museum. Leo's favorite part was the giant dinosaur skeleton. It was taller than a school bus! Before they left, Mom bought Leo a small toy dinosaur at the gift shop.", qs: [
    ["How did Leo and his mom get to the city?", "by train", [["by car", "The story says they took the train, not a car."], ["by boat", "The story never mentions a boat."], ["by bike", "The story never mentions bikes."]], 0],
    ["What was Leo's favorite part?", "the dinosaur skeleton", [["the gift shop", "Mom bought a toy there, but his favorite part was the skeleton."], ["the train ride", "The story never says the train ride was his favorite."], ["the space room", "The story never mentions a space room."]], 1],
    ["How tall was the skeleton?", "taller than a school bus", [["as small as a cat", "The story says it was taller than a school bus."], ["as tall as a chair", "The story says it was taller than a school bus."], ["shorter than Leo", "The story says it was taller than a school bus."]], 2],
    ["What did Mom buy Leo?", "a small toy dinosaur", [["a big book", "The story never mentions a book."], ["a cookie", "The story never mentions food."], ["a train ticket", "The story says Mom bought a toy dinosaur at the gift shop."]], 3]] },
  { p: "Every winter, Nadia's town has a snow sculpture contest. This year, Nadia and her brother built a giant snow turtle. They used pine cones for its eyes and a red scarf for its smile. The judges gave them a blue ribbon for the most creative sculpture.", qs: [
    ["When is the snow sculpture contest?", "every winter", [["every summer", "The story says every winter, not summer."], ["every spring", "The story says every winter, not spring."], ["on Nadia's birthday", "The story never mentions a birthday."]], 0],
    ["What did Nadia and her brother build?", "a snow turtle", [["a snowman", "They built a snow turtle, not a snowman."], ["a snow castle", "The story never mentions a castle."], ["a snow dog", "The story says a turtle, not a dog."]], 1],
    ["What did they use for the turtle's eyes?", "pine cones", [["buttons", "The story never mentions buttons."], ["rocks", "The story never mentions rocks."], ["a red scarf", "The scarf was used for the smile, not the eyes."]], 2],
    ["What did the judges give them?", "a blue ribbon", [["a gold cup", "The story never mentions a cup."], ["a red scarf", "The scarf was part of the turtle, not a prize."], ["a medal", "The story says a blue ribbon, not a medal."]], 3]] },
  { p: "The moon does not make its own light. It shines because sunlight bounces off it. As the moon travels around Earth, we see different amounts of its lit side. That is why the moon seems to change shape during the month.", qs: [
    ["Why does the moon shine?", "Sunlight bounces off it.", [["It is on fire.", "The story says the moon doesn't make its own light."], ["It has lamps.", "The story never mentions lamps."], ["It glows like a bulb.", "The story says the moon doesn't make its own light."]], 1],
    ["What does the moon travel around?", "Earth", [["Mars", "The story never mentions Mars."], ["Jupiter", "The story never mentions Jupiter."], ["the stars", "The story never mentions stars."]], 2],
    ["Why does the moon seem to change shape?", "We see different amounts of its lit side.", [["It melts in the sun.", "The story never says the moon melts."], ["Birds fly in front of it.", "The story never mentions birds."], ["Clouds cover it.", "The story never mentions clouds."]], 2],
    ["Where does the moon's light come from?", "the sun", [["the moon itself", "The story says the moon doesn't make its own light."], ["street lamps", "The story never mentions lamps."], ["the ocean", "The story never mentions the ocean."]], 1]] },
];
addBank(8, "english", "reading8", 0.27, function () {
  const i = R(0, EN8V_PASS.length - 1), P = EN8V_PASS[i], j = R(0, P.qs.length - 1), [q, a, ws, pi] = P.qs[j], sents = P.p.match(/[^.!?]+[.!?]+/g), r = {};
  ws.forEach(([w, why]) => { r[w] = why; });
  return { q, vis: passage(P.p), say: `${P.p} ${q}`, opts: shuffle([a, ...ws.map(w => w[0])]), ans: a, why: `The story says: "${sents[pi].trim()}"`, extra: 20, key: "v22-" + i + "-" + j, v22: { r } };
});
whyRule(8, "english", "reading8", EN8V_RULE);

/* ---------- Story elements: new stories (character, setting, problem, solution) ---------- */
// wc entries starting with "+" are in the story but are not the main character.
const EN8V_STORY = [
  { p: "On a foggy morning at the harbor, a little tugboat named Tug could not find the big ship he was supposed to help. The fog was too thick to see. Tug listened carefully and followed the ship's deep horn until he found it.", c: "Tug the tugboat", s: "the harbor on a foggy morning", pr: "He could not find the big ship.", so: "He followed the sound of the ship's horn.", wc: ["+the big ship", "a seagull", "a captain"], ws: ["a sunny beach", "a city park", "a farm"], wp: ["He ran out of fuel.", "His horn was broken.", "He got stuck in the sand."], wo: ["He waited for the sun.", "A seagull showed him the way.", "He went back home."] },
  { p: "In Mrs. Ortiz's kitchen on Thanksgiving Day, her oven suddenly stopped working. The turkey was only half cooked. Her neighbor Mr. Chen invited her to finish cooking in his oven next door.", c: "Mrs. Ortiz", s: "a kitchen on Thanksgiving Day", pr: "Her oven stopped working.", so: "Her neighbor let her use his oven.", wc: ["+Mr. Chen", "a chef", "a waiter"], ws: ["a school cafeteria", "a pizza shop", "a campsite"], wp: ["The turkey was too big.", "The family was late.", "She burned the pie."], wo: ["She ordered pizza.", "She bought a new oven.", "They ate the turkey half cooked."] },
  { p: "At the edge of a pond, a young frog named Fern wanted to sing in the evening frog choir. But every time she opened her mouth, only a tiny squeak came out. Fern practiced every night, and by the end of summer her croak was the loudest in the pond.", c: "Fern the frog", s: "the edge of a pond", pr: "Only a tiny squeak came out when she sang.", so: "She practiced every night.", wc: ["a duck", "a turtle", "a fish"], ws: ["a busy road", "a snowy forest", "a city zoo"], wp: ["She lost her voice in a storm.", "The choir would not let her in.", "She was afraid of the water."], wo: ["A bird taught her a song.", "She quit the choir.", "She moved to a new pond."] },
  { p: "During the school play, Ian was supposed to be a tree. Right before the show, his costume ripped down the back. His friend Ruby grabbed tape from the art room and fixed the rip in two minutes.", c: "Ian", s: "the school play", pr: "His costume ripped.", so: "Ruby fixed it with tape.", wc: ["+Ruby", "the principal", "his dad"], ws: ["a real forest", "a soccer field", "a grocery store"], wp: ["He forgot his lines.", "He got sick.", "The stage lights broke."], wo: ["He wore a new costume.", "He went home.", "The teacher sewed it."] },
  { p: "Deep in a snowy forest, a red fox named Rusty could not find any food. The snow had covered everything. Rusty climbed a hill, spotted some berry bushes poking out of the snow, and ate until he was full.", c: "Rusty the fox", s: "a snowy forest", pr: "He could not find any food.", so: "He spotted berry bushes from a hill.", wc: ["a bear", "a rabbit", "an owl"], ws: ["a sunny beach", "a busy town", "a hot desert"], wp: ["He was lost.", "His paw was hurt.", "He was too cold to sleep."], wo: ["A bear shared its food.", "He went to a farm.", "He slept until spring."] },
  { p: "At the town pool on the hottest day of summer, Theo dropped his toy boat into the deep end. He could not swim that far yet. The lifeguard dove in and brought the boat back to him.", c: "Theo", s: "the town pool on a hot summer day", pr: "His toy boat fell into the deep end.", so: "The lifeguard got the boat for him.", wc: ["+the lifeguard", "his teacher", "a duck"], ws: ["a frozen lake", "a library", "a toy store"], wp: ["He forgot his towel.", "The pool was closed.", "He lost his shoes."], wo: ["He bought a new boat.", "He swam to the deep end.", "He left the boat there."] },
  { p: "On a windy fall day, Kim raked a huge pile of leaves in her yard. Just as she finished, a gust of wind blew the leaves everywhere! Kim had an idea. She raked the leaves again and put them straight into bags.", c: "Kim", s: "her yard on a windy fall day", pr: "The wind blew her leaf pile everywhere.", so: "She raked again and put the leaves in bags.", wc: ["her neighbor", "a squirrel", "a farmer"], ws: ["a snowy hill", "a school gym", "a beach"], wp: ["Her rake broke.", "It started to snow.", "She lost her gloves."], wo: ["She left the leaves there.", "She went inside to read.", "A neighbor raked for her."] },
  { p: "On a busy street in the city, Lin's balloon slipped out of her hand. It floated up and got caught on a lamppost. A worker on a ladder, who was fixing the light, untangled the string and handed the balloon back to Lin.", c: "Lin", s: "a busy city street", pr: "Her balloon got caught on a lamppost.", so: "A worker on a ladder untangled it.", wc: ["+the worker on the ladder", "a police officer", "her teacher"], ws: ["a quiet farm", "a sandy beach", "a forest"], wp: ["Her balloon popped.", "She got lost.", "She dropped her ice cream."], wo: ["She bought a new balloon.", "She climbed the lamppost.", "The wind blew it free."] },
  { p: "In a small classroom aquarium, a shy fish named Finn always hid behind a rock. The other fish wanted to play, but Finn was too nervous. One day, a snail slowly crawled over and said hello, and soon Finn was swimming with everyone.", c: "Finn the fish", s: "a classroom aquarium", pr: "He was too nervous to play.", so: "A friendly snail said hello to him.", wc: ["+the snail", "a shark", "the teacher"], ws: ["the deep ocean", "a river", "a pet store"], wp: ["He was too hungry.", "The water was too cold.", "His rock was gone."], wo: ["He moved to a bigger tank.", "He hid forever.", "The teacher moved the rock."] },
  { p: "On the night of the big storm, the lights went out at the family's cabin in the woods. Little Rosa was afraid of the dark. Her big sister Elena made shadow puppets on the wall with a flashlight until Rosa was smiling.", c: "Rosa", s: "a cabin in the woods on a stormy night", pr: "Rosa was afraid of the dark.", so: "Her sister made shadow puppets with a flashlight.", wc: ["+Elena", "a bear", "a firefighter"], ws: ["a city apartment", "a sunny beach", "a school bus"], wp: ["The cabin had a leak.", "Rosa lost her teddy bear.", "They ran out of food."], wo: ["They drove home.", "Rosa went to sleep right away.", "Dad fixed the lights."] },
];
const EN8V_lc = s => /^(He|She|It|They|The|His|Her|A|An|Their)\b/.test(s) ? s.charAt(0).toLowerCase() + s.slice(1) : s;
addBank(8, "english", "storyparts", 0.25, function () {
  const i = R(0, EN8V_STORY.length - 1), S = EN8V_STORY[i], k = R(0, 3), r = {};
  const rows = [
    ["Who is the <b>main character</b>?", S.c, S.wc, "The story is mostly about this character."],
    ["What is the <b>setting</b>?", S.s, S.ws, "That's where the story happens."],
    ["What is the <b>problem</b>?", S.pr, S.wp, "That's what goes wrong before it gets fixed."],
    ["How is the problem <b>solved</b>?", S.so, S.wo, "That's how the problem gets fixed at the end."],
  ], [q, a, w0, why] = rows[k];
  const w = w0.map(x => x.replace(/^\+/, ""));
  w0.forEach((x, j) => {
    const o = w[j];
    r[o] = k === 0 ? (x[0] === "+" ? `${EN8V_C(o)} is in the story, but the story is mostly about ${S.c}.` : `The story never mentions ${o}.`)
      : k === 1 ? `The story never mentions ${o}.` : `The story never says that ${EN8V_lc(o.replace(/[.!]$/, ""))}.`;
  });
  return { q, say: `${S.p} ${clean(q)}`, vis: passage(S.p), opts: shuffle([a, ...w]), ans: a, why, extra: 20, key: "v22-" + i + "-" + k, v22: { r } };
});
whyRule(8, "english", "storyparts", EN8V_RULE);

/* ---------- Synonyms: new word pairs ---------- */
const EN8V_SYN = [["giant", "huge"], ["cheerful", "jolly"], ["silly", "goofy"], ["wet", "damp"], ["sniff", "smell"], ["center", "middle"], ["cap", "hat"],
  ["sack", "bag"], ["seat", "chair"], ["discover", "find"], ["reply", "answer"], ["finish", "end"], ["grumpy", "cranky"], ["bucket", "pail"],
  ["tummy", "belly"], ["kid", "child"], ["sound", "noise"], ["shove", "push"], ["glow", "shine"], ["dash", "sprint"], ["stay", "remain"],
  ["stop", "halt"], ["cash", "money"]];
// pairs in the same group are never used as each other's wrong options (their meanings are too close)
const EN8V_SYNG = { finish: 1, end: 1, stop: 1, halt: 1, stay: 1, remain: 1, cheerful: 2, jolly: 2, silly: 2, goofy: 2 };
addBank(8, "english", "synonyms", 0.28, function () {
  const i = R(0, EN8V_SYN.length - 1), flip = Math.random() < 0.5, [a, b] = flip ? [EN8V_SYN[i][1], EN8V_SYN[i][0]] : EN8V_SYN[i], g = EN8V_SYNG[a], r = {};
  const others = shuffle(EN8V_SYN.filter((p, j) => j !== i && !(g && EN8V_SYNG[p[0]] === g))).slice(0, 3).map(p => { const k = R(0, 1), w = p[k]; r[w] = `${EN8V_Q(w)} means the same as ${EN8V_Q(p[1 - k])}, not ${EN8V_Q(a)}.`; return w; });
  return { q: `Which word means the same as <b>${a}</b>?`, say: `Which word means the same as ${a}?`, vis: hw(a), opts: shuffle([b, ...others]), ans: b, big: 1, why: `${EN8V_C(a)} and ${b} are synonyms.`, key: "v22" + a, v22: { r } };
});
whyRule(8, "english", "synonyms", EN8V_RULE);

