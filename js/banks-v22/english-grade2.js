/* =====================================================================
   v22 (EN7V): Age 7 English. Two new topics (Tricky Plurals, Self Words)
   and more questions for every existing age-7 English topic.
   ===================================================================== */

/* ============ Part A1: Tricky Plurals (CCSS L.2.1b) ============ */
/* [one, many, emoji, kind, [wrong forms]]  kind: change | same | f | y | o */
const EN7V_IRR = [
  ["man", "men", "👨", "change", ["mans", "mens"]], ["woman", "women", "👩", "change", ["womans", "womens"]],
  ["child", "children", "🧒", "change", ["childs", "childrens"]], ["foot", "feet", "🦶", "change", ["foots", "feets"]],
  ["tooth", "teeth", "🦷", "change", ["tooths", "teeths"]], ["goose", "geese", "🪿", "change", ["gooses", "geeses"]],
  ["mouse", "mice", "🐭", "change", ["mouses", "mices"]], ["ox", "oxen", "🐂", "change", ["oxes", "oxens"]],
  ["sheep", "sheep", "🐑", "same", ["sheeps", "sheepes"]], ["deer", "deer", "🦌", "same", ["deers", "deeres"]],
  ["moose", "moose", "🫎", "same", ["mooses", "meese"]], ["bison", "bison", "🦬", "same", ["bisons", "bisones"]],
  ["leaf", "leaves", "🍃", "f", ["leafs", "leafes"]], ["wolf", "wolves", "🐺", "f", ["wolfs", "wolfes"]],
  ["knife", "knives", "🔪", "f", ["knifes", "knifves"]], ["half", "halves", "🌗", "f", ["halfs", "halfes"]],
  ["calf", "calves", "🐄", "f", ["calfs", "calfes"]], ["loaf", "loaves", "🍞", "f", ["loafes", "loavs"]],
  ["shelf", "shelves", "📚", "f", ["shelfs", "shelfes"]], ["elf", "elves", "🧝", "f", ["elfs", "elfes"]],
  ["baby", "babies", "👶", "y", ["babys", "babyes"]], ["puppy", "puppies", "🐶", "y", ["puppys", "puppyes"]],
  ["bunny", "bunnies", "🐰", "y", ["bunnys", "bunnyes"]], ["berry", "berries", "🫐", "y", ["berrys", "berryes"]],
  ["city", "cities", "🏙️", "y", ["citys", "cityes"]], ["pony", "ponies", "🐴", "y", ["ponys", "ponyes"]],
  ["story", "stories", "📖", "y", ["storys", "storyes"]], ["party", "parties", "🎉", "y", ["partys", "partyes"]],
  ["fly", "flies", "🪰", "y", ["flys", "flyes"]], ["cherry", "cherries", "🍒", "y", ["cherrys", "cherryes"]],
  ["penny", "pennies", "🪙", "y", ["pennys", "pennyes"]], ["butterfly", "butterflies", "🦋", "y", ["butterflys", "butterflyes"]],
  ["daisy", "daisies", "🌼", "y", ["daisys", "daisyes"]],
  ["potato", "potatoes", "🥔", "o", ["potatos", "potatoess"]], ["tomato", "tomatoes", "🍅", "o", ["tomatos", "tomatoess"]],
  ["hero", "heroes", "🦸", "o", ["heros", "heroess"]],
];
/* sentences that clearly need more than one */
const EN7V_IRRS = {
  man: ["Two ___ carried the heavy couch."], woman: ["Three ___ sang in the choir."],
  child: ["All the ___ played on the swings.", "Ten ___ are in my reading group."], foot: ["I jumped with both ___.", "My ___ are cold and wet."],
  tooth: ["I brush all my ___ every night.", "The baby has two new ___."], goose: ["Five ___ swam across the lake.", "The ___ are honking loudly."],
  mouse: ["Two little ___ ate the cheese.", "Three ___ ran into the hole."], ox: ["Two strong ___ pulled the cart."],
  sheep: ["The farmer has twenty ___.", "Many ___ eat grass on the hill."], deer: ["We saw three ___ in the woods."],
  moose: ["Two ___ walked by the river."], bison: ["A big herd of ___ ran across the field."],
  leaf: ["Many ___ fell from the tree.", "I raked a big pile of ___."], wolf: ["Three ___ howled at the moon."],
  knife: ["Put the forks and ___ on the table."], half: ["I cut the apple into two ___."],
  calf: ["The farm has four new baby ___."], loaf: ["Grandma baked two ___ of bread."],
  shelf: ["Our classroom has three ___ full of books."], elf: ["In the story, three little ___ made shoes."],
  baby: ["Two ___ are napping in the room."], puppy: ["Our dog had four ___.", "The ___ are chasing their tails."],
  bunny: ["Three ___ hopped in the grass."], berry: ["I picked a whole bowl of ___."],
  city: ["We drove through two big ___."], pony: ["Two ___ trotted around the ring."],
  story: ["Dad read me three ___ at bedtime."], party: ["I went to two birthday ___ this week."],
  fly: ["Three ___ buzzed by the window."], cherry: ["There are five ___ on my cake."],
  penny: ["I have ten ___ in my piggy bank."], butterfly: ["Many ___ landed on the flowers."],
  daisy: ["We picked six ___ in the yard."], potato: ["Mom mashed four ___ for dinner."],
  tomato: ["We grew ten red ___ in the garden."], hero: ["The story has two brave ___."],
};
const EN7V_IRRSL = EN7V_IRR.flatMap(r => (EN7V_IRRS[r[0]] || []).map(s => [r, s]));
const EN7V_RULE = { y: "Change y to i, add es", f: "Change f to v, add es", same: "Keep the same word", s: "Just add s", o: "Add es" };
const EN7V_irrWhy = (one, many, kind) => kind === "same" ? `${cap(one)} stays the same: one ${one}, two ${many}.` : kind === "f" ? (one.endsWith("fe") ? `The f changes to v, then add s: ${many}.` : `The f changes to v, then add es: ${many}.`) : kind === "y" ? `The y changes to i, then add es: ${many}.` : kind === "o" ? `${cap(one)} ends in o, so we add es: ${many}.` : `${cap(one)} changes to a new word: one ${one}, two ${many}.`;
const EN7V_pair = e => `<span class="emo xxl">${e}${e}</span>`;
topic(7, "english", {
  id: "irregplural", title: "Tricky Plurals", icon: "🐭", blurb: "Mouse → mice, leaf → leaves, sheep → sheep.",
  lesson: [
    { t: "Words that change", say: "Most words just add s to mean more than one. But some words change! One mouse, two mice. One foot, two feet.", html: table([["mouse 🐭", "<b class='hl'>mice</b>"], ["foot 🦶", "<b class='hl'>feet</b>"], ["child 🧒", "<b class='hl'>children</b>"], ["tooth 🦷", "<b class='hl'>teeth</b>"]], ["One", "More than one"]) },
    { t: "Words that stay the same", say: "Some words do not change at all. One sheep, two sheep. One deer, three deer.", html: row(col(bigEmo("🐑"), "one <b>sheep</b>"), col(EN7V_pair("🐑"), "two <b class='hl'>sheep</b>")) + note("No s! <b>sheep</b> and <b>deer</b> stay the same.") },
    { t: "Spelling changes", say: "Baby ends in y, so change the y to i and add e s: babies. Leaf ends in f, so change the f to v and add e s: leaves.", html: table([["baby", "bab<b class='hl'>ies</b>", "y → i, add es"], ["leaf", "lea<b class='hl'>ves</b>", "f → v, add es"]], ["One", "More", "Rule"]) },
  ],
  gen() {
    const k = Math.random();
    if (k < 0.24) {
      const [one, many, e, kind, wr] = pick(EN7V_IRR);
      const opts = uniq(many, kind === "same" ? wr : [one + "s", one, ...wr]);
      return { q: `One ${one}, two ___.`, say: `One ${one}, two what?`, vis: EN7V_pair(e), opts, ans: many, big: 1, why: EN7V_irrWhy(one, many, kind), key: "a" + one, x: { f: "one", one, many, kind } };
    }
    if (k < 0.44) {
      const [one, many, e, kind, wr] = pick(EN7V_IRR);
      const opts = uniq(one, kind === "same" ? wr : [many, ...wr]);
      return { q: `Two ${many}, one ___.`, say: `Two ${many}, one what?`, vis: bigEmo(e), opts, ans: one, big: 1, why: kind === "same" ? `${cap(one)} stays the same: two ${many}, one ${one}.` : `One is ${one} and more than one is ${many}.`, key: "b" + one, x: { f: "two", one, many, kind } };
    }
    if (k < 0.68) {
      const [[one, many, e, kind, wr], s] = pick(EN7V_IRRSL);
      const opts = uniq(many, kind === "same" ? wr : [one, one + "s", ...wr]);
      return { q: `Which word fits?<div class="sentence">${s.replace("___", '<span class="blank">___</span>')}</div>`, say: `Which word fits? ${s.replace("___", "blank")}`, opts, ans: many, big: 1, why: EN7V_irrWhy(one, many, kind), key: "c" + s, x: { f: "sent", one, many, kind } };
    }
    if (k < 0.85) {
      const [one, many, e, kind] = pick(EN7V_IRR.filter(r => r[3] !== "change" && r[0] !== "knife"));
      const opts = kind === "o" ? [EN7V_RULE.s, EN7V_RULE.o, EN7V_RULE.y, EN7V_RULE.same] : [EN7V_RULE.s, EN7V_RULE.y, EN7V_RULE.f, EN7V_RULE.same];
      return { q: `How do we make more than one <b>${one}</b>?`, say: `How do we make more than one ${one}?`, vis: col(bigEmo(e), hw(`${one} → ${many}`)), opts, ans: EN7V_RULE[kind], why: EN7V_irrWhy(one, many, kind), key: "d" + one, x: { f: "rule", one, many, kind } };
    }
    const [one, many, e, kind] = pick(EN7V_IRR.filter(r => r[3] !== "same"));
    const others = shuffle(EN7V_IRR.filter(r => r[0] !== one && r[3] !== "same")).slice(0, 3).map(r => r[0]);
    return { q: "Which word means <b>more than one</b>?", say: "Which word means more than one?", opts: shuffle([many, ...others]), ans: many, big: 1, why: `${cap(many)} means more than one ${one}.`, key: "e" + one, x: { f: "which", one, many, kind } };
  },
});
TRICK_ADD(7, "english", "irregplural", "Say it out loud: one mouse, two mice. If adding s sounds silly, the word probably changes!");

const EN7V_irrRow = w => EN7V_IRR.find(r => r[0] === w || r[1] === w);
whyRule(7, "english", "irregplural", (q, picked) => {
  const x = q.x; if (!x) return null;
  const p = xPlain(picked).trim(), { one, many, kind } = x;
  if (p === xPlain(q.ans).trim()) return null;
  if (x.f === "rule") {
    if (p === EN7V_RULE.s) return kind === "same" ? `We don't say “${one}s”; ${one} stays the same for more than one.` : `Just adding s would make “${one}s”, and that isn't how we spell it.`;
    if (p === EN7V_RULE.y) return `“${one}” doesn't end in y, so there's no y to change.`;
    if (p === EN7V_RULE.f) return `“${one}” doesn't end in f, so there's no f to change.`;
    if (p === EN7V_RULE.same) return `${cap(one)} does change: one ${one} isn't spelled the same as two ${many}.`;
    if (p === EN7V_RULE.o) return null;
    return null;
  }
  if (x.f === "which") {
    const r = EN7V_irrRow(p);
    return r && r[0] === p ? `“${p}” means just one; more than one is ${r[1]}.` : null;
  }
  if (x.f === "two") {
    if (p === many) return `“${many}” means more than one, but we need the word for just one.`;
    if (kind === "same") return `“${p}” isn't a real word; one ${one} is just ${one}.`;
    if (/s$/.test(p)) return `“${p}” ends in s, but the word for just one has no s.`;
    return null;
  }
  /* one / sent: the answer is the plural */
  if (p === one) return x.f === "sent" ? `“${one}” means just one, but the sentence needs more than one.` : `“${one}” means just one, but there are two.`;
  if (p === many + "s") return `“${p}” adds an extra s, but ${many} already means more than one.`;
  if (kind === "same") return `We don't say “${p}”; ${one} stays the same for more than one.`;
  if (kind === "change") return p === one + "s" || p === one + "es" ? `We don't say “${p}”; ${one} changes to a new word instead of adding s.` : null;
  if (kind === "f") return p.includes("f") ? `“${p}” keeps the f, but the f should change to v.` : p === "loavs" ? `“loavs” is missing the e before the s.` : null;
  if (kind === "y") return p.endsWith("ys") || p.endsWith("yes") ? `“${p}” keeps the y, but the y should change to i.` : null;
  if (kind === "o") return p === one + "s" ? `“${p}” needs an e: words like ${one} add es.` : p === one + "ess" ? `“${p}” has one s too many.` : null;
  return null;
});

/* ============ Part A2: Self Words / reflexive pronouns (CCSS L.2.1c) ============ */
const EN7V_SELF = { I: "myself", you: "yourself", he: "himself", she: "herself", it: "itself", we: "ourselves", they: "themselves" };
const EN7V_POS = { I: "my", you: "your", he: "his", she: "her", it: "its", we: "our", they: "their" };
const EN7V_SELFWHO = { myself: "goes with I", yourself: "goes with you", himself: "is for a boy or a man", herself: "is for a girl or a woman", itself: "is for an animal or a thing", ourselves: "goes with we", themselves: "goes with they" };
const EN7V_SUBJ = [
  ["I", "I"], ["You", "you"],
  ["Leo", "he"], ["Omar", "he"], ["Ben", "he"], ["Diego", "he"], ["Jamal", "he"], ["Dad", "he"], ["Grandpa", "he"], ["My brother", "he"], ["The boy", "he"], ["My uncle", "he"],
  ["Mia", "she"], ["Ava", "she"], ["Lily", "she"], ["Rosa", "she"], ["Aisha", "she"], ["Mom", "she"], ["Grandma", "she"], ["My sister", "she"], ["The girl", "she"], ["My aunt", "she"],
  ["We", "we"], ["My friends and I", "we"], ["Mom and I", "we"],
  ["They", "they"], ["The kids", "they"], ["The twins", "they"], ["Leo and Mia", "they"], ["My cousins", "they"],
];
const EN7V_PRED = ["made a sandwich all by ___.", "tied {pos} shoes by ___.", "looked at ___ in the mirror.", "drew a picture of ___.", "taught ___ to whistle.", "poured ___ a glass of water.", "built a tall tower by ___.", "made ___ a snack.", "cleaned up {pos} room by ___.", "got dressed all by ___.", "read the whole book by ___.", "wrapped the gift by ___.", "planted the seeds by ___.", "gave ___ a big pat on the back."];
const EN7V_ITSUBJ = ["The cat", "The puppy", "The kitten", "The bird", "The robot", "The little dog"];
const EN7V_ITPRED = { "The cat": ["licked ___ clean.", "washed ___ with {pos} paw."], "The puppy": ["scratched ___ behind the ear.", "saw ___ in the puddle."], "The kitten": ["licked ___ clean.", "saw ___ in the mirror."], "The bird": ["cleaned ___ in the birdbath.", "fluffed ___ up in the cold."], "The robot": ["turned ___ off.", "charged ___ at night."], "The little dog": ["shook ___ dry.", "scratched ___ behind the ear."] };
const EN7V_selfRows = () => [...EN7V_SUBJ.flatMap(([s, t]) => EN7V_PRED.map(p => [s, t, p])), ...EN7V_ITSUBJ.flatMap(s => EN7V_ITPRED[s].map(p => [s, "it", p]))];
const EN7V_SELFL = EN7V_selfRows();
const EN7V_selfSent = (s, t, p, w) => `${s} ${p.replace("{pos}", EN7V_POS[t]).replace("___", w)}`;
const EN7V_selfDist = (t, ans) => {
  const all = Object.values(EN7V_SELF).filter(w => w !== ans && !(t === "it" && (w === "himself" || w === "herself")));
  const near = t === "he" ? ["herself"] : t === "she" ? ["himself"] : t === "we" ? ["themselves", "myself"] : t === "they" ? ["ourselves"] : t === "I" ? ["ourselves"] : t === "it" ? ["themselves"] : ["myself"];
  return [...near, ...shuffle(all)];
};
topic(7, "english", {
  id: "reflexive", title: "Self Words", icon: "🪞", blurb: "Myself, herself, ourselves: words that point back.",
  lesson: [
    { t: "Pointing back", say: "Self words point back to who the sentence is about. I made it by myself. Mia looked at herself in the mirror.", html: `<div class="sentence big-sentence">I made it by <b class="hl">myself</b>. 🥪</div><div class="sentence big-sentence">Mia looked at <b class="hl">herself</b>. 🪞</div>` },
    { t: "Match the self word", say: "I goes with myself. You goes with yourself. He goes with himself. She goes with herself. It goes with itself.", html: table([["I", "my<b class='hl'>self</b>"], ["you", "your<b class='hl'>self</b>"], ["he", "him<b class='hl'>self</b>"], ["she", "her<b class='hl'>self</b>"], ["it", "it<b class='hl'>self</b>"]], ["Who", "Self word"]) },
    { t: "More than one", say: "For more than one, self changes to selves. We goes with ourselves. They goes with themselves.", html: table([["we", "our<b class='hl'>selves</b>"], ["they", "them<b class='hl'>selves</b>"]], ["Who", "Self word"]) + note("Say <b>himself</b> and <b>themselves</b>, never hisself or theirselves.") },
  ],
  gen() {
    const k = Math.random();
    if (k < 0.12) {
      const t = pick(Object.keys(EN7V_SELF)), ans = EN7V_SELF[t];
      const opts = uniq(ans, EN7V_selfDist(t, ans));
      return { q: `Which self word goes with <b>${t}</b>?`, say: `Which self word goes with ${t}?`, opts, ans, big: 1, why: `${cap(t)} goes with ${ans}.`, key: "m" + t, x: { f: "match", t, s: t } };
    }
    const [s, t, p] = pick(EN7V_SELFL), ans = EN7V_SELF[t];
    const sent = EN7V_selfSent(s, t, p, "___"), full = EN7V_selfSent(s, t, p, ans);
    const why = `${full} ${cap(ans)} ${EN7V_SELFWHO[ans]}${t === "he" || t === "she" || t === "it" ? `, like ${s.replace(/^The /, "the ").replace(/^My /, "my ")}` : ""}.`;
    if (k < 0.62) {
      let d = EN7V_selfDist(t, ans);
      if ((t === "he" || t === "they") && Math.random() < 0.35) d = [t === "he" ? "hisself" : "theirselves", ...d];
      return { q: `Which word fits?<div class="sentence">${sent.replace("___", '<span class="blank">___</span>')}</div>`, say: `Which word fits? ${sent.replace("___", "blank")}`, opts: uniq(ans, d), ans, big: 1, why, key: "f" + sent, x: { f: "fill", t, s } };
    }
    const ws = uniq(ans, EN7V_selfDist(t, ans), null, 3), o = {};
    ws.forEach(w => o[EN7V_selfSent(s, t, p, w)] = w);
    return { q: "Which sentence is <b>right</b>?", say: "Which sentence is right?", opts: Object.keys(o), ans: full, why, key: "s" + sent, x: { f: "sent", t, s, o } };
  },
});
TRICK_ADD(7, "english", "reflexive", "Find who the sentence is about. I → myself, he → himself, she → herself, we → ourselves, they → themselves.");

whyRule(7, "english", "reflexive", (q, picked) => {
  const x = q.x; if (!x) return null;
  const w = x.f === "sent" ? (x.o || {})[picked] : xPlain(picked).trim();
  if (!w || w === EN7V_SELF[x.t]) return null;
  if (w === "hisself") return "“Hisself” isn't a real word; for a boy we say himself.";
  if (w === "theirselves") return "“Theirselves” isn't a real word; for they we say themselves.";
  if (!EN7V_SELFWHO[w]) return null;
  const pr = Object.keys(EN7V_SELF).find(k => EN7V_SELF[k] === w);
  if (x.f === "match") return `“${w}” goes with ${pr}, not ${x.t}.`;
  if ((x.t === "we" || x.t === "they") && !/selves$/.test(w)) return `“${w}” is for just one, but ${["We", "They"].includes(x.s) ? `“${x.s.toLowerCase()}” means` : `${x.s.replace(/^The /, "the ").replace(/^My /, "my ")} are`} more than one.`;
  const who = ["I", "You", "We", "They"].includes(x.s) ? `the sentence starts with ${x.s === "I" ? "I" : x.s.toLowerCase()}` : `this sentence is about ${x.s.replace(/^The /, "the ").replace(/^My /, "my ")}`;
  return `“${w}” ${EN7V_SELFWHO[w]}, but ${who}.`;
});

/* ============ Part B: more questions for existing topics ============ */
/* The EN7_* arrays come from bank_en7.js. Each push runs once, as soon as its array exists
   (now, or on the first question if bank_en7.js happens to load after this file). */
const EN7V_B = [];
const EN7V_runB = () => { for (let i = 0; i < EN7V_B.length; i++) { const f = EN7V_B[i]; if (!f) continue; try { f(); EN7V_B[i] = null; } catch (e) { if (!(e instanceof ReferenceError)) { EN7V_B[i] = null; throw e; } } } };
/* Most generators (bank_en7.js) pick from these arrays at call time, and their why-rules read them too. */

/* Blends: [blend, word] for "same blend as ..." */
EN7V_B.push(() => EN7_BLW.push(["bl", "blast"], ["bl", "bloom"], ["br", "bring"], ["br", "branch"], ["cl", "clay"], ["cl", "cliff"], ["cr", "cream"], ["cr", "crunch"], ["dr", "drip"], ["dr", "drill"], ["fl", "flute"], ["fr", "fresh"], ["gl", "glow"], ["gl", "glitter"], ["gr", "grill"], ["pl", "plum"], ["pr", "print"], ["pr", "proud"], ["sk", "skin"], ["sl", "slug"], ["sm", "smooth"], ["sn", "sniff"], ["sp", "spill"], ["st", "stick"], ["sw", "sweater"], ["tr", "track"]));

/* Bossy R: [before, team, after, emoji] (checked: swapping in another team never spells a real word) */
EN7V_B.push(() => EN7_BOSSY.push(["st", "ar", "t", ""], ["c", "ar", "pet", ""], ["l", "ar", "ge", ""], ["", "ar", "tist", "🧑‍🎨"], ["m", "ar", "ble", ""],
  ["t", "or", "ch", ""], ["h", "or", "net", ""], ["sn", "or", "kel", "🤿"], ["", "or", "bit", ""],
  ["th", "ir", "teen", ""], ["b", "ir", "ch", ""], ["th", "ir", "ty", ""],
  ["b", "ur", "p", ""], ["sl", "ur", "p", ""], ["p", "ur", "r", ""], ["b", "ur", "ger", "🍔"],
  ["moth", "er", "", ""], ["fath", "er", "", ""], ["monst", "er", "", ""], ["flow", "er", "", "🌸"], ["bak", "er", "", ""], ["silv", "er", "", ""]));

/* Letter teams (digraphs) */
EN7V_B.push(() => EN7_DG.push(["pu", "sh", "", ""], ["", "sh", "out", ""], ["fre", "sh", "", ""], ["", "sh", "ampoo", ""],
  ["", "ch", "ase", ""], ["pin", "ch", "", ""], ["", "ch", "eck", ""], ["rea", "ch", "", ""],
  ["", "th", "ing", ""], ["sou", "th", "", ""], ["", "th", "ousand", ""], ["", "wh", "irl", ""]));

/* Adding -ing: [base, rule] */
EN7V_B.push(() => EN7_INGL.push(...["fish", "mix", "snow", "spray", "camp", "hold", "send", "lift", "sniff", "learn", "peel", "cheer"].map(w => [w, "add"]),
  ...["pat", "mop", "hum", "win", "plan", "fan", "tug", "sip", "tip", "shut"].map(w => [w, "dbl"]),
  ...["shine", "glide", "save", "hope", "tape", "move", "wake", "shake", "vote"].map(w => [w, "dropE"])));

/* Magic E: [short, long] */
EN7V_B.push(() => EN7_MAGIC.push(["pan", "pane"], ["past", "paste"], ["bath", "bathe"], ["slim", "slime"], ["mop", "mope"], ["tot", "tote"], ["van", "vane"], ["cloth", "clothe"], ["plum", "plume"]));

/* Nouns & verbs (new nouns are all things, never actions) */
EN7V_B.push(() => EN7_NOUNS.push("ladder", "wagon", "mitten", "umbrella", "bucket", "helmet", "candle", "jacket", "pumpkin", "teapot", "sofa", "necklace", "envelope", "lamp", "apron", "tulip", "pebble", "acorn", "sandal"));
EN7V_B.push(() => EN7_VERBS.push("sprint", "squeeze", "twirl", "juggle", "paddle", "gargle", "scrub", "shiver", "wobble", "slurp", "sneak", "stretch", "knit", "wander", "peek", "toss", "splash", "march", "skate"));

/* Opposites: [word, opposite, emoji, emoji, group] (same group = never shown together) */
EN7V_B.push(() => EN7_OPP.push(["rough", "smooth", "", "", "F"], ["tight", "loose", "", "", "G"], ["together", "apart", "", "", "H"], ["whisper", "shout", "🤫", "📢", "I"], ["brave", "afraid", "", "", "J"], ["inside", "outside", "", "", "K"], ["upstairs", "downstairs", "", "", "g"], ["start", "finish", "", "", "E"], ["morning", "evening", "🌅", "🌆", "s"], ["young", "old", "", "", "D"], ["lend", "borrow", "", "", "b"], ["arrive", "leave", "", "", "p"], ["bright", "dark", "", "", "t"], ["crooked", "straight", "", "", "L"], ["messy", "neat", "", "", "l"], ["huge", "tiny", "", "", "M"]));

/* Plurals: [word, emoji] */
EN7V_B.push(() => EN7_PLUR.push(["lion", "🦁"], ["cloud", "☁️"], ["spoon", "🥄"], ["chair", "🪑"], ["glove", "🧤"], ["tent", "⛺"], ["magnet", "🧲"], ["penguin", "🐧"], ["circus", "🎪"], ["hourglass", "⌛"], ["ax", "🪓"], ["stopwatch", "⏱️"], ["princess", "👸"], ["toolbox", "🧰"]));

/* Ending marks: [sentence, mark] */
EN7V_B.push(() => EN7_PUNCL.push(
  ...["Where did the kitten go", "Can you pass the crayons", "Do you want to build a fort", "What is in the box", "Who left the door open", "How many legs does a spider have", "Is the library open today", "Why do leaves change color", "When will the cookies be ready", "Does your dog like to swim", "Which shoes should I wear"].map(s => [s, "?"]),
  ...["My hat has a red stripe", "We walk to school together", "The fish swims in the bowl", "I read a book about whales", "Our garden has three pumpkins", "Ben feeds the cat every morning", "The sky is gray today", "My aunt lives in the city", "We play soccer after school", "Ana has a purple backpack", "The ice melted in the sun"].map(s => [s, "."]),
  ...["Wow, we won the game", "Hooray, the snow day is here", "Yikes, the milk is spilling", "Ouch, I stubbed my toe", "Yay, Dad made pancakes", "Wow, look at all the stars", "Oh no, I missed the bus", "Hooray, we finished the puzzle", "Watch out, the paint is wet", "Wow, that is a giant pumpkin", "Yay, my best friend is here"].map(s => [s, "!"])));

/* Sentence or not? (the topic reads SENT_OK / SENT_NO every time) */
const EN7V_OK = { "The dog dug a hole.": "The dog|dug", "Ella rides her scooter.": "Ella|rides", "The children planted a tree.": "The children|planted", "My dad bakes bread.": "My dad|bakes", "The owl hooted at night.": "The owl|hooted", "We visited the farm.": "We|visited", "Grandpa fed the ducks.": "Grandpa|fed", "Jake tied his shoes.": "Jake|tied", "The baby clapped her hands.": "The baby|clapped", "Our cat sleeps in the sun.": "Our cat|sleeps", "Mom washed the dishes.": "Mom|washed" };
/* d = no do, w = no who, b = neither, c = starts with a joining word */
const EN7V_NO = { "The tall brown horse.": "d", "Ran across the yard.": "w", "In the garden.": "b", "Jumped into the pool.": "w", "My little brother and sister.": "d", "Under the big tree.": "b", "Because it was raining.": "c", "A bowl of hot soup.": "d", "Eating a red apple.": "w", "Near the window.": "b", "When the sun came up.": "c" };
SENT_OK.push(...Object.keys(EN7V_OK));
SENT_NO.push(...Object.keys(EN7V_NO));
const EN7V_frag = s => {
  const t = EN7V_NO[s], body = s.replace(/\.$/, ""), first = body.split(" ")[0];
  if (t === "d") return `“${body}” names who or what, but never says what they do.`;
  if (t === "w") return `“${first}” is the do part, but it never says who did it.`;
  if (t === "b") return `“${body}” has no who and no do in it.`;
  if (t === "c") return `It starts with “${first}”, so the thought isn't finished.`;
  return null;
};
whyRule(7, "english", "sentences", (q, picked) => {
  const p = xPlain(picked).trim(), qt = q.q || "";
  if (/^Is this a <b>complete sentence<\/b>/.test(qt)) {
    const s = xPlain(q.vis || "").trim();
    if (/^Yes/.test(p) && EN7V_NO[s]) return EN7V_frag(s);
    if (/^No/.test(p) && EN7V_OK[s]) { const [who, d] = EN7V_OK[s].split("|"); return `“${who}” is the who and “${d}” is the do, so nothing is missing.`; }
    return null;
  }
  if (/^Which one is a <b>complete sentence<\/b>/.test(qt)) return EN7V_NO[p] ? EN7V_frag(p) : null;
  return null;
});

/* Silent letters: [word, silent letter, letters you DO hear] */
EN7V_B.push(() => EN7_SIL.push(["knuckle", "k", ["n", "u", "l"]], ["knapsack", "k", ["n", "a", "p"]], ["wreck", "w", ["r", "e"]], ["wrapper", "w", ["r", "a", "p"]], ["climber", "b", ["c", "l", "i"]], ["soften", "t", ["s", "o", "f"]], ["glisten", "t", ["g", "l", "s"]], ["yolk", "l", ["y", "o", "k"]], ["folk", "l", ["f", "o", "k"]], ["guest", "u", ["g", "e", "s"]], ["science", "c", ["s", "i", "n"]]));
EN7V_B.push(() => EN7_STARTW.push("knuckle", "knapsack", "wreck", "wrapper"));

/* Syllables: [word, split, emoji] */
EN7V_B.push(() => EN7_SYL.push(["dolphin", "dol-phin", "🐬"], ["snowman", "snow-man", "⛄"], ["pancake", "pan-cake", "🥞"], ["peanut", "pea-nut", "🥜"], ["shark", "shark", "🦈"], ["skunk", "skunk", "🦨"], ["magnet", "mag-net", "🧲"], ["broccoli", "broc-co-li", "🥦"], ["pineapple", "pine-ap-ple", "🍍"], ["spaghetti", "spa-ghet-ti", "🍝"], ["jellyfish", "jel-ly-fish", "🪼"], ["strawberry", "straw-ber-ry", "🍓"], ["ambulance", "am-bu-lance", "🚑"], ["rhinoceros", "rhi-noc-er-os", "🦏"]));

/* Vowel teams: [before, team, after, emoji, single-sound word?] */
EN7V_B.push(() => EN7_VT.push(["pl", "ai", "n", "", 1], ["tr", "ai", "l", "", 1], ["afr", "ai", "d", "", 0], ["sl", "ee", "ve", "", 1], ["g", "ee", "se", "", 1], ["p", "ee", "k", "", 1], ["sw", "ee", "p", "🧹", 1], ["b", "ee", "tle", "🪲", 0],
  ["r", "oa", "st", "", 1], ["c", "oa", "st", "", 1], ["t", "oa", "ster", "", 0], ["spotl", "igh", "t", "", 0], ["l", "igh", "tning", "⚡", 0],
  ["sw", "ay", "", "", 1], ["subw", "ay", "", "🚇", 0], ["hallw", "ay", "", "", 0], ["holid", "ay", "", "", 0]));

EN7V_runB();
["blends", "bossyr", "digraphs", "ing", "magice", "nounverb", "opposites", "plurals", "punct", "silent", "syllables", "vteams"].forEach(id => {
  const t = TP(7, "english", id); if (!t) return;
  const old = t.gen; t.gen = function () { if (EN7V_B.some(Boolean)) EN7V_runB(); return old.call(this); };
});

