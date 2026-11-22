/* =====================================================================
   v25 · Age 7 · English (grade 2): new kinds of questions for every topic.
   Tag: V25EN7_. Every new question carries q.v25.r = { "wrong option": "reason" },
   so a wrong pick always gets a true, specific reason.
   ===================================================================== */
const V25EN7_sent = s => `<div class="sentence">${s.replace("___", '<span class="blank">___</span>')}</div>`;
const V25EN7_say = s => s.replace("___", "blank");
const V25EN7_rule = id => whyRule(7, "english", id, (q, p) => (q && q.v25 && q.v25.r && q.v25.r[p]) || null);
/* build a question: opts = [answer, ...wrong], r = reasons for each wrong option (same order) */
const V25EN7_Q = (o, ans, wrong, reasons) => {
  const r = {}; wrong.forEach((w, i) => { r[w] = reasons[i]; });
  return Object.assign(o, { opts: shuffle([ans, ...wrong]), ans, v25: { r } });
};
const V25EN7_W = (id, weight, fns) => { addBank(7, "english", id, weight, function () { return pick(fns)(); }); V25EN7_rule(id); };

/* ---------------- Letter teams (digraphs) ---------------- */
/* A: swap one letter team for another to make a new word */
const V25EN7_DSWAP = [["chip", "ch", "sh"], ["ship", "sh", "wh"], ["whip", "wh", "ch"], ["chop", "ch", "sh"], ["shop", "sh", "ch"], ["chin", "ch", "th"], ["thin", "th", "sh"], ["shin", "sh", "ch"], ["then", "th", "wh"], ["when", "wh", "th"], ["what", "wh", "th"], ["that", "th", "wh"], ["chick", "ch", "th"], ["thick", "th", "ch"], ["chore", "ch", "sh"], ["shore", "sh", "ch"], ["with", "th", "sh"], ["wish", "sh", "th"], ["mash", "sh", "th"], ["math", "th", "sh"], ["much", "ch", "sh"], ["mush", "sh", "ch"], ["chat", "ch", "th"], ["chat", "ch", "wh"], ["what", "wh", "ch"], ["ship", "sh", "ch"], ["chip", "ch", "wh"], ["chin", "ch", "sh"], ["thin", "th", "ch"], ["shin", "sh", "th"], ["whine", "wh", "sh"], ["shine", "sh", "wh"]];
const V25EN7_DBAD = new Set(["shat", "whin", "whop", "shick", "whick", "whore", "thore", "whash", "whatch", "chen", "thine", "chine"]);
const V25EN7_swapT = (w, from, to) => w.startsWith(from) ? to + w.slice(from.length) : w.slice(0, -from.length) + to;
/* B: one team that ends both words (wh never ends a word, so the choices are sh, ch, th) */
const V25EN7_DBOTH = [["sh", "bru", "fla"], ["sh", "spla", "cru"], ["sh", "fre", "pu"], ["sh", "sma", "cra"], ["sh", "ca", "wi"], ["sh", "di", "fi"], ["ch", "lun", "pin"], ["ch", "bea", "tea"], ["ch", "rea", "mu"], ["ch", "por", "tor"], ["ch", "ben", "bun"], ["ch", "pou", "pea"], ["th", "ba", "pa"], ["th", "mou", "sou"], ["th", "tee", "too"], ["th", "clo", "ear"], ["th", "nor", "nin"]];
const V25EN7_DREAL = new Set(["with", "mush", "bash"]);
const V25EN7_DHAS = ["ship", "shop", "chip", "chin", "thin", "that", "whip", "when", "fish", "bath", "much", "peach", "moth", "wish", "lunch", "cloth", "whale", "shell"];
const V25EN7_DNO = ["plum", "clam", "frost", "trap", "sled", "snap", "spill", "grab", "drip", "stem", "top", "map", "run", "bed", "sun", "mop", "dog", "hat", "pig", "net"];
V25EN7_W("digraphs", 0.3, [
  () => {
    const ans = pick(V25EN7_DHAS), t = ans.match(/sh|ch|th|wh/)[0], wrong = shuffle(V25EN7_DNO).slice(0, 3);
    return V25EN7_Q({ q: "Which word has the letter team <b>sh</b>, <b>ch</b>, <b>th</b> or <b>wh</b>?", say: "Which word has a letter team: s h, c h, t h, or w h?", big: 1, why: `${cap(ans)} has ${t}, two letters that make one sound.`, key: "v25dC" + ans + wrong.join() }, ans, wrong, wrong.map(w => `“${w}” has no sh, ch, th or wh in it.`));
  },
  () => {
    const [w, from, to] = pick(V25EN7_DSWAP), ans = V25EN7_swapT(w, from, to), start = w.startsWith(from);
    const others = shuffle(["sh", "ch", "th", "wh"].filter(t => t !== from && t !== to && (start || t !== "wh") && !V25EN7_DBAD.has(V25EN7_swapT(w, from, t)))).slice(0, 2);
    const wrong = [w, ...others.map(t => V25EN7_swapT(w, from, t))];
    const reasons = [`“${w}” still has ${from}; the job was to change it to ${to}.`, ...others.map((t, i) => `“${wrong[i + 1]}” uses ${t}, but we were asked to put in ${to}.`)];
    return V25EN7_Q({ q: `Change the <b>${from}</b> in <b>${w}</b> to <b>${to}</b>. What new word do you get?`, say: `Change the ${from} in ${w} to ${to}. What new word do you get?`, vis: hw(`${w} → ?`), big: 1, why: `Take away ${from} and put in ${to}: ${w} becomes ${ans}.`, key: "v25dA" + w + to }, ans, wrong, reasons);
  },
  () => {
    const [t, a, b] = pick(V25EN7_DBOTH), wrong = ["sh", "ch", "th"].filter(x => x !== t);
    const reasons = wrong.map(x => {
      const ra = V25EN7_DREAL.has(a + x), rb = V25EN7_DREAL.has(b + x);
      if (ra && !rb) return `${x} makes “${a}${x}”, but “${b}${x}” is not a real word.`;
      if (rb && !ra) return `${x} makes “${b}${x}”, but “${a}${x}” is not a real word.`;
      return `With ${x}, “${a}${x}” and “${b}${x}” are not real words.`;
    });
    return V25EN7_Q({ q: "Which letter team finishes <b>both</b> words?", say: "Which letter team finishes both words?", vis: row(hw(EN7_blank(a, 2, "")), hw(EN7_blank(b, 2, ""))), big: 1, why: `${t} makes ${a}${t} and ${b}${t}.`, key: "v25dB" + a + b }, t, wrong, reasons);
  },
]);

/* ---------------- Magic E ---------------- */
/* A: rhymes. [word, rhyme, three words that don't rhyme] */
const V25EN7_MRHY = [["cake", "lake", ["lack", "like", "luck"]], ["bike", "hike", ["hack", "hope", "hum"]], ["rope", "hope", ["hop", "hide", "home"]], ["cube", "tube", ["tub", "tab", "tile"]], ["game", "name", ["nap", "nine", "note"]], ["time", "dime", ["dim", "dome", "dam"]], ["nose", "rose", ["rod", "rise", "rake"]], ["bone", "cone", ["can", "cane", "cube"]], ["kite", "bite", ["bit", "bat", "bike"]], ["ride", "hide", ["hid", "had", "hike"]], ["lane", "cane", ["can", "cone", "cape"]], ["note", "vote", ["vet", "vine", "van"]], ["rule", "mule", ["mug", "mile", "mole"]], ["gate", "late", ["lot", "let", "lake"]], ["hole", "pole", ["pal", "pile", "pale"]], ["wide", "side", ["sad", "sit", "safe"]], ["shape", "tape", ["tap", "top", "tube"]], ["fine", "pine", ["pin", "pane", "pen"]]];
const V25EN7_rime = w => w.replace(/^qu/, "q").slice(w.replace(/^qu/, "q").search(/[aeiou]/));
/* B: which word fits? [sentence, answer, wrong, why the wrong word doesn't fit] */
const V25EN7_MSENT = [
  ["I flew my ___ at the park.", "kite", "kit", "A kit is a set of parts; you fly a kite, with a magic E."],
  ["Put some ___ on the box so it stays shut.", "tape", "tap", "Tap has no magic E; it means a light touch, not sticky tape."],
  ["Water drips from the ___ in the sink.", "tap", "tape", "Tape is sticky; water comes out of a tap, with a short a."],
  ["The dog naps on the ___ by the door.", "mat", "mate", "Mate means a friend or partner; a dog naps on a mat."],
  ["I put an ice ___ in my drink.", "cube", "cub", "A cub is a baby bear; ice comes in a cube."],
  ["The bear ___ played with its mother.", "cub", "cube", "A cube is a block shape; a baby bear is a cub."],
  ["The ___ took off into the sky.", "plane", "plan", "A plan is an idea for what to do; a plane flies."],
  ["Our ___ is to go to the park first.", "plan", "plane", "A plane flies in the sky; here we need plan, an idea."],
  ["A ___ is a tall tree with needles.", "pine", "pin", "A pin is small and sharp; a tree with needles is a pine."],
  ["Use a ___ to hold the papers together.", "pin", "pine", "A pine is a tree; a pin holds papers together."],
  ["I ___ you can come to my party.", "hope", "hop", "Hop means to jump; here we need hope, to wish for something."],
  ["Frogs ___ from one lily pad to the next.", "hop", "hope", "Hope means to wish for something; frogs hop, with a short o."],
  ["I ___ my apple at lunch.", "ate", "at", "At tells where, like at school; here we need ate, from eat."],
  ["The lion has a big, furry ___.", "mane", "man", "A man is a grown-up person; a lion's furry hair is a mane."],
  ["The ___ fixed our leaky sink.", "man", "mane", "A mane is a lion's or horse's hair; a man fixed the sink."],
  ["The little kitten is so ___!", "cute", "cut", "Cut is what scissors do; a sweet kitten is cute."],
  ["I ___ the paper with scissors.", "cut", "cute", "Cute means sweet to look at; scissors cut paper."],
  ["Grandpa walks with a ___.", "cane", "can", "A can holds soup or juice; a walking stick is a cane."],
  ["Mom opened a ___ of soup.", "can", "cane", "A cane is a walking stick; soup comes in a can."],
  ["A ___ is a coin worth ten cents.", "dime", "dim", "Dim means not very bright; the ten-cent coin is a dime."],
  ["The room got ___ when the sun went down.", "dim", "dime", "A dime is a coin; a room with little light is dim."],
  ["I wrote a ___ to my friend.", "note", "not", "Not is a no word, like not hungry; you write a note."],
  ["Mice like to ___ in small holes.", "hide", "hid", "Hid already happened; after “like to” we need hide."],
];
const V25EN7_MYES = ["cake", "bike", "rope", "cube", "game", "dime", "rose", "bone", "kite", "hide", "cane", "note", "mule", "gate", "pole", "side", "tape", "pine", "plane", "flute"];
const V25EN7_MNO = ["tub", "cap", "hop", "pin", "cut", "rod", "man", "bit", "kit", "mat", "hug", "dim", "not", "fin", "rat"];
V25EN7_W("magice", 0.3, [
  () => {
    const ans = pick(V25EN7_MYES), wrong = shuffle(V25EN7_MNO).slice(0, 3);
    return V25EN7_Q({ q: "Which word has a <b>magic E</b>?", say: "Which word has a magic E?", big: 1, why: `${cap(ans)} ends with a silent e that makes the vowel say its name.`, key: "v25mC" + ans + wrong.join() }, ans, wrong, wrong.map(w => `“${w}” has no e at the end, so its ${w.match(/[aeiou]/)[0]} is short.`));
  },
  () => {
    const [t, ans, ds] = pick(V25EN7_MRHY), rt = V25EN7_rime(t);
    return V25EN7_Q({ q: `Which word rhymes with <b>${t}</b>?`, say: `Which word rhymes with ${t}?`, vis: hw(t), big: 1, why: `${cap(ans)} and ${t} both end in -${rt}.`, key: "v25mA" + t }, ans, ds, ds.map(d => `“${d}” ends in -${V25EN7_rime(d)}, but “${t}” ends in -${rt}, so they don't rhyme.`));
  },
  () => {
    const [s, ans, w, r] = pick(V25EN7_MSENT), magic = ans.endsWith("e");
    return V25EN7_Q({ q: `Which word fits the sentence?${V25EN7_sent(s)}`, say: `Which word fits the sentence? ${V25EN7_say(s)}`, big: 1, why: magic ? `${cap(ans)} has a magic E, so the vowel says its name.` : `${cap(ans)} has no magic E, so the vowel is short.`, key: "v25mB" + s }, ans, [w], [r]);
  },
]);

/* ---------------- Nouns & verbs ---------------- */
const V25EN7_NP = { person: ["baker", "nurse", "pilot", "dentist", "uncle", "cousin", "firefighter", "neighbor", "painter", "king", "queen", "artist", "student", "librarian", "plumber"], place: ["park", "garden", "bakery", "museum", "airport", "playground", "forest", "desert", "classroom", "barn", "pool", "hospital", "town", "camp", "beach"], thing: ["spoon", "blanket", "clock", "mug", "backpack", "kite", "marble", "scarf", "button", "crayon", "sock", "toothbrush", "puzzle", "balloon", "pencil"] };
const V25EN7_NV = ["borrow", "invent", "explain", "choose", "forget", "arrive", "describe", "imagine", "gather"];
const V25EN7_NN = ["carrot", "banana", "kitten", "giraffe", "mitten", "window", "rainbow", "cookie", "sandwich", "teacup"];
const V25EN7_NA = ["tiny", "shiny", "sleepy", "purple", "loud", "soft", "brave", "fuzzy"];
/* blank sentences: [sentence, answer, "n" = needs a noun / "v" = needs a verb] */
const V25EN7_NS = [["The ___ sat in its nest.", "bird", "n"], ["I drank a cup of ___.", "milk", "n"], ["My ___ reads me a story at night.", "grandpa", "n"], ["We swam in the ___ all afternoon.", "pool", "n"], ["The ___ barked at the cat.", "dog", "n"], ["Please pass me the ___.", "salt", "n"], ["A tall ___ grew in our garden.", "sunflower", "n"], ["The ___ flew over the clouds.", "airplane", "n"], ["I put my books in my ___.", "backpack", "n"], ["The ___ helped me find a book.", "librarian", "n"], ["We bought bread at the ___.", "bakery", "n"], ["The ___ is full of tall trees.", "forest", "n"], ["My red ___ has four wheels.", "wagon", "n"], ["The ___ hopped across the grass.", "rabbit", "n"], ["Our ___ planted tomatoes.", "neighbor", "n"], ["The ___ swam around the tank.", "goldfish", "n"],
  ["Ben ___ the ball over the fence.", "kicked", "v"], ["The baby ___ in her crib.", "naps", "v"], ["We ___ our hands after recess.", "wash", "v"], ["Ana ___ a picture of her cat.", "drew", "v"], ["The frogs ___ into the pond.", "jumped", "v"], ["Dad ___ pancakes every Sunday.", "flips", "v"], ["I ___ my teeth before bed.", "brush", "v"], ["The school bell ___ at noon.", "rings", "v"], ["Birds ___ south for the winter.", "fly", "v"], ["My cat ___ under the bed.", "hides", "v"], ["The children ___ songs in music class.", "sing", "v"], ["Grandma ___ me a warm scarf.", "knitted", "v"], ["The wind ___ the leaves away.", "blew", "v"], ["Leo ___ his milk on the table.", "spilled", "v"], ["We ___ to the top of the hill.", "climbed", "v"], ["The happy puppy ___ its tail.", "wags", "v"]];
V25EN7_W("nounverb", 0.3, [
  () => {
    const cats = ["person", "place", "thing"], want = pick(cats), ans = pick(V25EN7_NP[want]);
    const others = cats.filter(c => c !== want).map(c => [pick(V25EN7_NP[c]), c]), v = pick(V25EN7_NV);
    const wrong = [...others.map(o => o[0]), v];
    const reasons = [...others.map(([w, c]) => `“${w}” names a ${c}, not a ${want}.`), `“${v}” is an action word, so it isn't a noun at all.`];
    return V25EN7_Q({ q: `Which noun names a <b>${want}</b>?`, say: `Which noun names a ${want}?`, big: 1, why: `${cap(ans)} is a noun that names a ${want}.`, key: "v25nA" + want + ans + wrong.join() }, ans, wrong, reasons);
  },
  () => {
    const [s, ans, need] = pick(V25EN7_NS), adj = pick(V25EN7_NA);
    const ws = need === "n" ? shuffle(V25EN7_NV).slice(0, 2) : shuffle(V25EN7_NN).slice(0, 2), wrong = [...ws, adj];
    const reasons = need === "n" ? [...ws.map(w => `“${w}” is an action word, but this blank needs a naming word.`), `“${adj}” is a describing word, but this blank needs a naming word.`]
      : [...ws.map(w => `“${w}” is a naming word, but this blank needs an action word.`), `“${adj}” is a describing word, but this blank needs an action word.`];
    return V25EN7_Q({ q: `Which <b>${need === "n" ? "noun" : "verb"}</b> fits in the blank?${V25EN7_sent(s)}`, say: `Which ${need === "n" ? "noun" : "verb"} fits in the blank? ${V25EN7_say(s)}`, big: 1, why: need === "n" ? `${cap(ans)} is a noun, a naming word, so it fits.` : `${cap(ans)} is a verb, an action word, so it fits.`, key: "v25nB" + s }, ans, wrong, reasons);
  },
]);

/* ---------------- Plurals (s or es) ---------------- */
const V25EN7_PES = ["wish", "match", "inch", "torch", "leash", "sketch", "paintbrush", "lunchbox", "ostrich", "walrus", "eyelash", "sandbox", "switch"];
const V25EN7_PS = ["map", "sled", "nest", "lamp", "cup", "desk", "button", "rabbit", "tiger", "flag", "window", "ladder", "jar", "rock", "bug", "hen", "mitten", "kitten"];
const V25EN7_end = w => w.match(/(sh|ch|s|x)$/)[0];
V25EN7_W("plurals", 0.3, [
  () => {
    const es = Math.random() < 0.5, b = es ? pick(V25EN7_PES) : pick(V25EN7_PS), ans = es ? b + "es" : b + "s";
    const pool = [...V25EN7_PES.map(w => [w, 1]), ...V25EN7_PS.map(w => [w, 0])].filter(x => x[0] !== b);
    const picks = shuffle(pool).slice(0, 3), wrong = picks.map(([w, e]) => e ? w + "s" : w + "es");
    const reasons = picks.map(([w, e]) => e ? `“${w}” ends in ${V25EN7_end(w)}, so it needs es: ${w}es.` : `“${w}” doesn't end in s, x, sh or ch, so just add s: ${w}s.`);
    return V25EN7_Q({ q: "Which plural is spelled <b>right</b>?", say: "Which plural is spelled right?", big: 1, why: es ? `${cap(b)} ends in ${V25EN7_end(b)}, so we add es: ${ans}.` : `${cap(b)} just needs s: ${ans}.`, key: "v25pA" + ans + wrong.join() }, ans, wrong, reasons);
  },
  () => {
    const es = Math.random() < 0.5, ans = es ? pick(V25EN7_PES) : pick(V25EN7_PS), wrong = shuffle(es ? V25EN7_PS : V25EN7_PES).slice(0, 3);
    const reasons = wrong.map(w => es ? `“${w}” doesn't end in s, x, sh or ch, so it just takes s.` : `“${w}” ends in ${V25EN7_end(w)}, so it needs es, not just s.`);
    return V25EN7_Q({ q: es ? "Which word needs <b>es</b> to mean more than one?" : "Which word needs just <b>s</b> to mean more than one?", say: es ? "Which word needs e s to mean more than one?" : "Which word needs just s to mean more than one?", big: 1, why: es ? `${cap(ans)} ends in ${V25EN7_end(ans)}, so it needs es: ${ans}es.` : `${cap(ans)} doesn't end in s, x, sh or ch, so just add s: ${ans}s.`, key: "v25pB" + es + ans + wrong.join() }, ans, wrong, reasons);
  },
]);

/* ---------------- Opposites ---------------- */
const V25EN7_OPPP = [["smile", "frown"], ["sunny", "cloudy"], ["add", "subtract"], ["lead", "follow"], ["begin", "end"], ["hungry", "full"], ["noisy", "quiet"], ["fresh", "stale"], ["freeze", "melt"], ["easy", "hard"], ["kind", "mean"], ["save", "spend"], ["cool", "warm"], ["sick", "healthy"], ["fix", "break"], ["raise", "lower"], ["most", "least"]];
const V25EN7_SYNP = [["big", "large"], ["happy", "glad"], ["small", "little"], ["fast", "quick"], ["shout", "yell"], ["jump", "leap"], ["close", "shut"], ["smart", "clever"], ["cold", "chilly"], ["tired", "sleepy"], ["giant", "huge"], ["mad", "angry"], ["rock", "stone"], ["gift", "present"], ["scared", "afraid"], ["silly", "goofy"]];
const V25EN7_UNRP = [["run", "sing"], ["apple", "chair"], ["blue", "tall"], ["cat", "loud"], ["hop", "green"], ["sock", "funny"], ["book", "wet"], ["tree", "round"], ["spoon", "brave"], ["duck", "purple"], ["drum", "sleep"]];
const V25EN7_pr = p => `${p[0]} – ${p[1]}`;
/* [sentence, word, opposite, [two words that mean about the same as word]] */
const V25EN7_OSENT = [["An elephant is big, but a mouse is ___.", "big", "small", ["large", "huge"]], ["Ice is cold, but soup is ___.", "cold", "hot", ["chilly", "icy"]], ["Mia felt happy when she won, but ___ when her kite broke.", "happy", "sad", ["glad", "cheerful"]], ["My towel was wet, but now it is ___.", "wet", "dry", ["soggy", "damp"]], ["My cup was full, but now it is ___.", "full", "empty", ["filled", "packed"]], ["A cheetah is fast, but a snail is ___.", "fast", "slow", ["quick", "speedy"]], ["A rock is hard, but a pillow is ___.", "hard", "soft", ["firm", "solid"]], ["My old shoes were too small, so I got ___ ones.", "old", "new", ["used", "worn"]], ["Dad was angry at first, but then he was ___.", "angry", "calm", ["mad", "upset"]], ["The lion was brave, but the mouse was ___.", "brave", "scared", ["bold", "fearless"]], ["A pebble is smooth, but tree bark is ___.", "smooth", "rough", ["silky", "sleek"]], ["The night was dark, but the morning was ___.", "dark", "bright", ["gloomy", "shadowy"]], ["The library is quiet, but the playground is ___.", "quiet", "loud", ["silent", "hushed"]], ["The park is near, but the beach is ___.", "near", "far", ["close", "nearby"]], ["This book is thin, but that one is ___.", "thin", "thick", ["skinny", "slim"]]];
V25EN7_W("opposites", 0.3, [
  () => {
    const o = pick(V25EN7_OPPP), used = new Set(o), syn = shuffle(V25EN7_SYNP.filter(p => !used.has(p[0]) && !used.has(p[1]))).slice(0, 2), un = pick(V25EN7_UNRP.filter(p => !used.has(p[0]) && !used.has(p[1])));
    const wrong = [...syn.map(V25EN7_pr), V25EN7_pr(un)];
    const reasons = [...syn.map(p => `“${p[0]}” and “${p[1]}” mean almost the same thing, not opposite things.`), `“${un[0]}” and “${un[1]}” are just different words; they aren't opposites.`];
    return V25EN7_Q({ q: "Which pair of words are <b>opposites</b>?", say: "Which pair of words are opposites?", why: `${cap(o[0])} and ${o[1]} mean opposite things.`, key: "v25oA" + o[0] + wrong.join() }, V25EN7_pr(o), wrong, reasons);
  },
  () => {
    const [s, w, ans, syn] = pick(V25EN7_OSENT);
    return V25EN7_Q({ q: `Which word is the <b>opposite</b> of <b>${w}</b> and finishes the sentence?${V25EN7_sent(s)}`, say: `Which word is the opposite of ${w} and finishes the sentence? ${V25EN7_say(s)}`, big: 1, why: `${cap(w)} and ${ans} are opposites.`, key: "v25oB" + s }, ans, [w, ...syn], [`“${w}” is the same word from the sentence; we need its opposite.`, ...syn.map(x => `“${x}” means about the same as ${w}, not the opposite.`)]);
  },
]);

/* ---------------- Ending marks ---------------- */
const V25EN7_TELL = ["The frog sat on a log", "My cat has white paws", "We eat lunch at noon", "The pond froze last night", "Sara likes to draw dogs", "The bus driver waved to us", "I have a loose tooth", "The tulips are red", "Our class has a pet hamster", "Dad fixed the leaky sink", "My kite has a long tail", "The bread is still warm", "Owls sleep during the day", "Ben ties his own shoes", "We saw a rainbow after the rain"];
const V25EN7_ASK = ["Where are my mittens", "Can you hop on one foot", "What is that noise", "Who drew this picture", "Is it time for recess", "How many apples are in the bag", "Do you like pickles", "Why is the dog wet", "When does the game start", "Will you read with me", "Which cup is mine", "Are the cookies ready", "Did you feed the fish", "May I use your eraser", "Where does the owl sleep"];
const V25EN7_EXC = ["Wow, the fireworks are so bright", "Hooray, we won the race", "Oh no, my ice cream fell", "Yikes, that thunder is loud", "Ouch, I stepped on a block", "Yay, it is pizza day", "Wow, look at that huge whale", "Hooray, Grandpa is visiting", "Oh no, the cat got out", "Yippee, we are going camping", "Wow, you built a tall tower", "Yay, I can ride my bike", "Oh wow, a baby deer", "Hooray, the sun came out", "Wow, that kite is so high"];
const V25EN7_KIND = { ".": "a telling sentence", "?": "an asking sentence", "!": "a strong feeling sentence" };
V25EN7_W("punct", 0.3, [
  () => {
    const k = pick([".", "?", "!"]), s = pick(k === "." ? V25EN7_TELL : k === "?" ? V25EN7_ASK : V25EN7_EXC), ans = s + k;
    const kinds = shuffle([["t", V25EN7_TELL], ["a", V25EN7_ASK], ["e", V25EN7_EXC]]), wrong = [], reasons = [];
    for (const [t, list] of [...kinds, ...kinds]) {
      if (wrong.length >= 3) break;
      const x = pick(list.filter(y => y !== s && !wrong.some(w => w.startsWith(y))));
      if (t === "t") { wrong.push(x + "?"); reasons.push("It tells something, so it needs a period, not a question mark."); }
      else if (t === "a") { wrong.push(x + "."); reasons.push("It asks something, so it needs a question mark, not a period."); }
      else { wrong.push(x + "?"); reasons.push(`It doesn't ask anything; “${x.split(",")[0]}” shows a strong feeling, so it needs an exclamation mark.`); }
    }
    return V25EN7_Q({ q: "Which sentence has the <b>right</b> end mark?", say: "Which sentence has the right end mark?", why: k === "?" ? "It asks something, so it ends with a question mark." : k === "!" ? "It shows a strong feeling, so it ends with an exclamation mark." : "It tells something, so it ends with a period.", key: "v25uA" + ans + wrong.join() }, ans, wrong, reasons);
  },
  () => {
    const k = pick([".", "?", "!"]), s = pick(k === "." ? V25EN7_TELL : k === "?" ? V25EN7_ASK : V25EN7_EXC), ans = V25EN7_KIND[k];
    const R = { ".": { "?": "It doesn't ask anything, and it ends with a period, not a question mark.", "!": "It just tells something calmly, and it ends with a period, not an exclamation mark." },
      "?": { ".": "It asks something and ends with a question mark, so it isn't telling.", "!": "It asks something and ends with a question mark, not an exclamation mark." },
      "!": { ".": `“${s.split(",")[0]}” shows a big feeling, and it ends with an exclamation mark.`, "?": "It doesn't ask anything; it ends with an exclamation mark, not a question mark." } };
    const wk = [".", "?", "!"].filter(x => x !== k);
    return V25EN7_Q({ q: `What kind of sentence is this?<div class="sentence">${s}<b class="hl">${k}</b></div>`, say: `What kind of sentence is this? ${s}`, why: k === "?" ? "It asks something and ends with a question mark." : k === "!" ? "It shows a strong feeling and ends with an exclamation mark." : "It tells something and ends with a period.", key: "v25uB" + s }, ans, wk.map(x => V25EN7_KIND[x]), wk.map(x => R[k][x]));
  },
]);

/* ---------------- Blends ---------------- */
/* A: blends at the END. [start, blend, emoji, wrong blends that do NOT spell a real word] */
const V25EN7_BEND = [["ne", "st", "", ["nd", "mp", "nt", "sk"]], ["ha", "nd", "✋", ["mp", "nt", "sk"]], ["de", "sk", "", ["st", "mp", "nd"]], ["ju", "mp", "", ["nd", "nt", "sk"]], ["ma", "sk", "", ["nd", "mp", "nt"]], ["po", "nd", "", ["nt", "sk", "ft"]], ["pla", "nt", "", ["st", "nd", "mp", "sk"]], ["gi", "ft", "🎁", ["nt", "nd", "sk"]], ["sa", "nd", "", ["nt", "mp", "sk", "st"]], ["fi", "st", "✊", ["nt", "mp", "sk"]], ["wi", "nd", "", ["nt", "ft"]], ["stu", "mp", "", ["nd", "sk", "st"]], ["pai", "nt", "🎨", ["st", "nd", "mp", "sk"]], ["li", "st", "", ["nd", "sk"]], ["du", "sk", "", ["nd", "ft"]], ["fro", "st", "", ["mp", "sk"]], ["che", "st", "", ["nd", "mp", "nt", "sk"]], ["toa", "st", "", ["nd", "mp", "nt"]], ["cru", "st", "", ["nt", "nd"]]];
/* B: blend or not? */
const V25EN7_BSTART = ["plum", "clam", "frost", "trap", "sled", "snap", "spill", "grab", "drip", "stem", "blob", "crab", "flute", "glow", "skate", "brush", "swing", "prize"];
const V25EN7_BDG = ["ship", "shop", "chip", "chin", "thin", "that", "whip", "when", "shell", "chest", "thick", "shut"];
const V25EN7_B1 = ["top", "map", "run", "bed", "sun", "kit", "mop", "dog", "hat", "pig", "log", "net"];
V25EN7_W("blends", 0.3, [
  () => {
    const [a, b, e, ws] = pick(V25EN7_BEND), w = a + b, wrong = shuffle(ws).slice(0, 3);
    return V25EN7_Q({ q: "Which blend ends the word?", say: `Which blend ends the word ${w}?`, vis: EN7_vis(e, EN7_blank(a, 2, "")), big: 1, why: `${cap(w)} ends with ${b}: you hear both ${b[0]} and ${b[1]}.`, key: "v25bA" + w }, b, wrong, wrong.map(x => `“${a}${x}” isn't a word; “${w}” ends with ${b}.`));
  },
  () => {
    const ans = pick(V25EN7_BSTART), nd = R(1, 2), dg = shuffle(V25EN7_BDG).slice(0, nd), one = shuffle(V25EN7_B1).slice(0, 3 - nd), wrong = [...dg, ...one];
    const reasons = [...dg.map(w => `“${w}” starts with ${w.slice(0, 2)}, a letter team that makes one sound, not a blend.`), ...one.map(w => `“${w}” starts with just one consonant, ${w[0]}, then a vowel.`)];
    return V25EN7_Q({ q: "Which word starts with a <b>blend</b>?", say: "Which word starts with a blend? In a blend, you hear both sounds.", big: 1, why: `${cap(ans)} starts with ${ans.slice(0, 2)}: you can hear both ${ans[0]} and ${ans[1]}.`, key: "v25bB" + ans + wrong.join() }, ans, wrong, reasons);
  },
]);

/* ---------------- Vowel teams ---------------- */
const V25EN7_VTW = [["grain", "ai"], ["paid", "ai"], ["bait", "ai"], ["faint", "ai"], ["peel", "ee"], ["beep", "ee"], ["deep", "ee"], ["free", "ee"], ["jeep", "ee"], ["moat", "oa"], ["croak", "oa"], ["groan", "oa"], ["foal", "oa"], ["fight", "igh"], ["might", "igh"], ["fright", "igh"], ["jay", "ay"], ["stray", "ay"]];
const V25EN7_V1 = ["ran", "red", "hop", "cut", "fix", "map", "pen", "sock", "bug", "lid", "tent", "frog", "drum", "clap", "milk"];
const V25EN7_VRHY = [["boat", "coat", ["bait", "beet", "bite"]], ["rain", "chain", ["ran", "reed", "road"]], ["seed", "weed", ["sail", "soap", "sight"]], ["night", "fight", ["feet", "float", "fit"]], ["day", "stay", ["stop", "steep", "stain"]], ["train", "brain", ["bran", "bright", "brick"]], ["feet", "sheet", ["shoot", "shot", "shake"]], ["toad", "road", ["red", "rid", "raid"]], ["light", "might", ["mat", "meet", "moat"]], ["sail", "nail", ["nap", "need", "night"]], ["green", "queen", ["quit", "quilt", "quail"]], ["goat", "float", ["flat", "fleet", "flight"]], ["tray", "clay", ["claw", "clip", "clean"]], ["sleep", "keep", ["kept", "kit", "kid"]], ["tail", "snail", ["snap", "sniff", "snow"]], ["pay", "hay", ["hat", "heat", "high"]], ["right", "bright", ["bring", "brick", "bread"]], ["week", "cheek", ["chick", "chalk", "check"]]];
V25EN7_W("vteams", 0.3, [
  () => {
    const [ans, t] = pick(V25EN7_VTW), wrong = shuffle(V25EN7_V1).slice(0, 3);
    return V25EN7_Q({ q: "Which word has a <b>vowel team</b>?", say: "Which word has a vowel team?", big: 1, why: `${cap(ans)} has the vowel team ${t}.`, key: "v25vA" + ans + wrong.join() }, ans, wrong, wrong.map(w => `“${w}” has only one vowel, ${w.match(/[aeiou]/)[0]}, so it has no vowel team.`));
  },
  () => {
    const [t, ans, ds] = pick(V25EN7_VRHY), rt = V25EN7_rime(t);
    return V25EN7_Q({ q: `Which word rhymes with <b>${t}</b>?`, say: `Which word rhymes with ${t}?`, vis: hw(t), big: 1, why: `${cap(ans)} and ${t} both end with -${rt}.`, key: "v25vB" + t }, ans, ds, ds.map(d => `“${d}” ends with -${V25EN7_rime(d)}, but “${t}” ends with -${rt}, so they don't rhyme.`));
  },
]);

/* ---------------- Syllables ---------------- */
const V25EN7_SY = [["fox", "fox"], ["nest", "nest"], ["plant", "plant"], ["bell", "bell"], ["lamp", "lamp"], ["crab", "crab"], ["sled", "sled"], ["chair", "chair"], ["glove", "glove"], ["rope", "rope"],
  ["picnic", "pic-nic"], ["napkin", "nap-kin"], ["sandal", "san-dal"], ["giggle", "gig-gle"], ["blanket", "blan-ket"], ["ladder", "lad-der"], ["helmet", "hel-met"], ["cactus", "cac-tus"], ["puzzle", "puz-zle"], ["pirate", "pi-rate"], ["zipper", "zip-per"], ["candy", "can-dy"], ["pickle", "pick-le"], ["sandwich", "sand-wich"],
  ["volleyball", "vol-ley-ball"], ["skeleton", "skel-e-ton"], ["telescope", "tel-e-scope"], ["grasshopper", "grass-hop-per"], ["basketball", "bas-ket-ball"], ["afternoon", "af-ter-noon"], ["wonderful", "won-der-ful"], ["fantastic", "fan-tas-tic"], ["together", "to-geth-er"], ["triangle", "tri-an-gle"], ["detective", "de-tec-tive"], ["dominoes", "dom-i-noes"],
  ["invitation", "in-vi-ta-tion"], ["celebration", "cel-e-bra-tion"], ["dictionary", "dic-tion-ar-y"], ["ukulele", "u-ku-le-le"], ["activity", "ac-tiv-i-ty"], ["information", "in-for-ma-tion"], ["binoculars", "bi-noc-u-lars"], ["experiment", "ex-per-i-ment"], ["accordion", "ac-cor-di-on"]];
const V25EN7_SYN = [["Max", "Max"], ["Ben", "Ben"], ["Jake", "Jake"], ["Rose", "Rose"], ["Kate", "Kate"], ["Grace", "Grace"], ["Luke", "Luke"], ["June", "June"],
  ["Lily", "Lil-y"], ["Omar", "O-mar"], ["Nora", "No-ra"], ["Leo", "Le-o"], ["Maya", "Ma-ya"], ["Ethan", "E-than"], ["Ruby", "Ru-by"], ["Kenji", "Ken-ji"],
  ["Amanda", "A-man-da"], ["Elijah", "E-li-jah"], ["Jonathan", "Jon-a-than"], ["Mateo", "Ma-te-o"], ["Sofia", "So-fi-a"], ["Natalie", "Nat-a-lie"], ["Benjamin", "Ben-ja-min"],
  ["Isabella", "Is-a-bel-la"], ["Olivia", "O-liv-i-a"], ["Victoria", "Vic-to-ri-a"], ["Elizabeth", "E-liz-a-beth"], ["Alexander", "Al-ex-an-der"], ["Penelope", "Pe-nel-o-pe"]];
const V25EN7_ns = sp => sp.split("-").length;
const V25EN7_syl = (n, sp) => n === 1 ? "just 1 syllable" : `${n} syllables (${sp})`;
V25EN7_W("syllables", 0.3, [
  () => {
    const most = Math.random() < 0.5, counts = shuffle([1, 2, 3, 4]).slice(0, 3), ws = counts.map(c => pick(V25EN7_SY.filter(x => V25EN7_ns(x[1]) === c)));
    const best = ws.reduce((a, b) => (most ? V25EN7_ns(b[1]) > V25EN7_ns(a[1]) : V25EN7_ns(b[1]) < V25EN7_ns(a[1])) ? b : a), n = V25EN7_ns(best[1]);
    const wrong = ws.filter(x => x !== best);
    return V25EN7_Q({ q: `Which word has the <b>${most ? "most" : "fewest"}</b> syllables?`, say: `Which word has the ${most ? "most" : "fewest"} syllables? Clap them out!`, big: 1, why: `${best[1]}: ${n} ${n === 1 ? "clap" : "claps"}, ${most ? "more" : "fewer"} than the others.`, key: "v25sA" + most + ws.map(x => x[0]).join() }, best[0], wrong.map(x => x[0]), wrong.map(([w, sp]) => `“${w}” has ${V25EN7_syl(V25EN7_ns(sp), sp)}, but “${best[0]}” has ${n === 1 ? "just 1" : n}.`));
  },
  () => {
    const [w, sp] = pick(V25EN7_SYN), n = V25EN7_ns(sp), wrong = ["1", "2", "3", "4"].filter(x => +x !== n);
    return V25EN7_Q({ q: `How many syllables are in the name <b>${w}</b>?`, say: `How many syllables are in the name ${w}? Clap it out!`, vis: col(hw(w), `<button class="btn btn-sm btn-sun" data-say="${sp.split("-").join(", ")}">👏 Hear the claps</button>`), big: 1, why: `${sp}: ${n} ${n === 1 ? "clap" : "claps"}.`, key: "v25sB" + w }, String(n), wrong, wrong.map(k => `${k} ${+k === 1 ? "clap is" : "claps are"} too ${+k > n ? "many" : "few"}; ${w} has ${n === 1 ? "just one beat" : n + " beats"}: ${sp}.`));
  },
]);
/* the option order 1, 2, 3, 4 reads better for counting questions */
const V25EN7_sylGen = TP(7, "english", "syllables").gen;
TP(7, "english", "syllables").gen = function () { const q = V25EN7_sylGen.call(this); if (q && q.v25 && /name <b>/.test(q.q)) q.opts = ["1", "2", "3", "4"]; return q; };

/* ---------------- Sentence or not? ---------------- */
/* A: pick the ending. [who part, do part, three endings that still have no do] */
const V25EN7_SEND = [["The little puppy", "wagged its tail.", ["in the yard.", "with a red collar.", "and the kitten."]], ["My grandpa", "fixed the fence.", ["in his garden.", "with a big smile.", "and my grandma."]], ["The yellow bus", "stopped at the corner.", ["on the road.", "full of kids.", "and the red truck."]], ["Three ducks", "swam in the pond.", ["by the pond.", "with orange feet.", "and a goose."]], ["Our teacher", "rang the bell.", ["at the front of the room.", "with her glasses on.", "and the helper."]], ["The tall giraffe", "ate some leaves.", ["at the zoo.", "with long legs.", "and the zebra."]], ["Maya", "built a snowman.", ["in the snow.", "with a warm hat.", "and her brother."]], ["The baby", "laughed at the bubbles.", ["in the high chair.", "with a rattle.", "and the puppy."]], ["A big wave", "crashed on the sand.", ["at the beach.", "with white foam.", "and the wind."]], ["My best friend", "sent me a letter.", ["at school.", "with curly hair.", "and his sister."]], ["The hungry bear", "found some berries.", ["in the woods.", "with brown fur.", "and her cubs."]], ["The kids", "played tag at recess.", ["on the playground.", "with their friends.", "and the teacher."]], ["The old clock", "ticked all night.", ["on the wall.", "with a gold face.", "and the lamp."]], ["A tiny ant", "carried a crumb.", ["on the picnic table.", "with six legs.", "and a beetle."]], ["Dad", "washed the car.", ["in the driveway.", "with a sponge.", "and Uncle Jay."]], ["The red kite", "flew over the trees.", ["in the sky.", "with a long tail.", "and the blue one."]], ["The fire truck", "raced down the street.", ["with its lights on.", "near the school.", "and the police car."]], ["My little brother", "spilled his juice.", ["at the table.", "with a blue cup.", "and my sister."]], ["The brown owl", "hooted in the dark.", ["in the tall tree.", "with big eyes.", "and the bat."]], ["Our class", "went on a field trip.", ["at school.", "with our backpacks.", "and Ms. Diaz."]]];
const V25EN7_low = s => /^(The|My|Our|A|Three) /.test(s) ? s.charAt(0).toLowerCase() + s.slice(1) : s;
/* B: what is missing? d = no do, w = no who, ok = complete [text, type, who, do] */
const V25EN7_SMISS = [["The fuzzy orange cat.", "d"], ["My cousin from Texas.", "d"], ["A box of crayons.", "d"], ["The noisy crowd at the game.", "d"], ["Two red apples.", "d"], ["The girl with the blue hat.", "d"], ["Our new neighbor.", "d"], ["A long, long train.", "d"],
  ["Hopped over the log.", "w"], ["Baked a cherry pie.", "w"], ["Waved goodbye to us.", "w"], ["Fell asleep on the couch.", "w"], ["Painted the fence white.", "w"], ["Splashed in the bathtub.", "w"], ["Found a lost mitten.", "w"], ["Raced down the hall.", "w"],
  ["The fuzzy cat purred.", "ok", "The fuzzy cat", "purred"], ["Aunt Lucy baked a pie.", "ok", "Aunt Lucy", "baked"], ["The frog hopped over the log.", "ok", "The frog", "hopped"], ["We waved goodbye.", "ok", "We", "waved"], ["My cousin fell asleep.", "ok", "My cousin", "fell asleep"], ["The crowd cheered loudly.", "ok", "The crowd", "cheered"], ["Sam found a lost mitten.", "ok", "Sam", "found"], ["The long train rolled by.", "ok", "The long train", "rolled"], ["The big box of toys.", "d"], ["Five little monkeys.", "d"], ["The bright full moon.", "d"], ["Jumped on the bed.", "w"], ["Ate a bowl of cereal.", "w"], ["Built a sandcastle.", "w"], ["The monkeys jumped on the bed.", "ok", "The monkeys", "jumped"], ["Five ducks swam away.", "ok", "Five ducks", "swam"], ["The full moon glowed.", "ok", "The full moon", "glowed"]];
const V25EN7_MO = { who: "The who (who or what it is about)", do: "The do (what they do)", none: "Nothing, it is a complete sentence" };
/* C: capital letter and period */
const V25EN7_SCAP = ["The fox ran into the woods.", "My dog likes to dig.", "We ate soup for dinner.", "Our garden has big sunflowers.", "The kitten chased a leaf.", "A bee landed on a flower.", "The snow melted in the sun.", "My aunt plays the violin.", "We read a book about bats.", "The turtle hid in its shell.", "Our class planted beans.", "The boat sailed across the lake.", "My brother can whistle.", "The pancakes smell so good.", "We fed the ducks at the park.", "The wind blew the door shut.", "The rabbit hopped away.", "My mom drives a van.", "We built a tall tower.", "The sun set behind the hills.", "Our dog sleeps on a mat.", "The leaves fell off the tree.", "My friend has a pet snake.", "We like to play tag.", "The clock ticked loudly.", "A frog sat on the log."];
V25EN7_W("sentences", 0.3, [
  () => {
    const [who, d, fr] = pick(V25EN7_SEND), w = V25EN7_low(who);
    return V25EN7_Q({ q: `Which ending makes a <b>complete sentence</b>?<div class="sentence">${who} <span class="blank">___</span></div>`, say: `Which ending makes a complete sentence? ${who}, blank.`, why: `“${who} ${d}” tells who and what they did.`, key: "v25cA" + who }, d, fr, fr.map(f => `With “${f.replace(/\.$/, "")}”, it still never says what ${w} did.`));
  },
  () => {
    const [s, t, who, d] = pick(V25EN7_SMISS), first = s.split(" ")[0];
    const ans = t === "d" ? V25EN7_MO.do : t === "w" ? V25EN7_MO.who : V25EN7_MO.none;
    const R = t === "d" ? { [V25EN7_MO.who]: "The words already name who; they never say what happens.", [V25EN7_MO.none]: "It names who, but never says what they do." }
      : t === "w" ? { [V25EN7_MO.do]: `“${first}” is already the action; nobody says who did it.`, [V25EN7_MO.none]: "It tells what happened, but never says who did it." }
      : { [V25EN7_MO.who]: `“${who}” is the who, so the who isn't missing.`, [V25EN7_MO.do]: `“${d}” is the do, so the do isn't missing.` };
    const wrong = Object.keys(R);
    return V25EN7_Q({ q: "What is <b>missing</b> from these words?", say: `What is missing from these words? ${s}`, vis: `<div class="quote">${s}</div>`, why: t === "d" ? "It tells who, but not what they do." : t === "w" ? "It tells what was done, but not who did it." : `“${who}” is the who and “${d}” is the do.`, key: "v25cB" + s }, ans, wrong, wrong.map(w => R[w]));
  },
  () => {
    const s = pick(V25EN7_SCAP), low = s.charAt(0).toLowerCase() + s.slice(1), np = s.slice(0, -1), lnp = low.slice(0, -1), c = s.charAt(0).toLowerCase();
    return V25EN7_Q({ q: "Which sentence is written <b>correctly</b>?", say: "Which sentence is written correctly? Look at the first letter and the end.", why: "It starts with a capital letter and ends with a period.", key: "v25cC" + s }, s, [low, np, lnp], [`It starts with a small “${c}”; a sentence starts with a capital letter.`, "It is missing the period at the end.", "It needs a capital letter at the start and a period at the end."]);
  },
]);

/* ---------------- Bossy R ---------------- */
const V25EN7_RRHY = [["car", "jar", ["fur", "for", "her"]], ["park", "dark", ["fork", "dirt", "horn"]], ["corn", "horn", ["barn", "burn", "fern"]], ["fork", "stork", ["park", "dirt", "card"]], ["bird", "third", ["hard", "cord", "barn"]], ["nurse", "purse", ["horse", "farm", "porch"]], ["girl", "swirl", ["star", "storm", "scarf"]], ["turn", "burn", ["barn", "born", "corn"]], ["farm", "charm", ["storm", "firm", "corn"]], ["shirt", "dirt", ["dart", "short", "sport"]], ["storm", "form", ["farm", "firm", "fern"]], ["star", "far", ["fur", "for", "fork"]], ["sport", "short", ["shirt", "shark", "sharp"]], ["cart", "smart", ["skirt", "sort", "short"]], ["sharp", "harp", ["horn", "hurt", "fork"]], ["born", "torn", ["barn", "burn", "yarn"]]];
const V25EN7_rrime = w => w.slice(w.search(/[aeiou]r/));
const V25EN7_RGL = { star: "is a light that shines in the night sky", storm: "is wild weather with rain and wind", born: "means came into the world as a baby", burn: "means to hurt with heat or fire", barn: "is a big farm building for animals", far: "means a long way away", for: "is a small word, like in “a gift for you”", fur: "is the soft hair on an animal", form: "is a paper you fill in", firm: "means hard, not soft", farm: "is a place where crops and animals grow", cord: "is a thin rope or wire", curl: "is a twisty shape, like curly hair", fern: "is a leafy green plant", bird: "is an animal with feathers and wings", horse: "is a big animal that people ride", purse: "is a small bag for money and keys", porch: "is a covered spot by a front door", nurse: "is a person who helps sick people", perch: "is a spot where a bird sits", stir: "means to mix with a spoon", shirt: "is something you wear on top", short: "means not long or not tall", shark: "is a big fish with sharp teeth", stork: "is a tall bird with long legs", bark: "is the sound a dog makes" };
const V25EN7_RSENT = [["Please ___ the soup with a spoon.", "stir", ["star", "storm"]], ["The cows sleep in the red ___.", "barn", ["born", "burn"]], ["My cat has soft orange ___.", "fur", ["far", "for"]], ["We grow corn on our ___.", "farm", ["form", "firm"]], ["Be careful, a hot stove can ___ you.", "burn", ["barn", "born"]], ["I made a birthday ___ for Grandma.", "card", ["cord", "curl"]], ["Our house is not ___ from school.", "far", ["fur", "for"]], ["Use a ___ to eat your salad.", "fork", ["fern", "farm"]], ["The dog likes to ___ at squirrels.", "bark", ["bird", "burn"]], ["A ___ helps sick people feel better.", "nurse", ["horse", "purse"]], ["Mom keeps her keys in her ___.", "purse", ["porch", "nurse"]], ["We sat on the front ___ and ate ice pops.", "porch", ["perch", "purse"]], ["We heard thunder during the ___.", "storm", ["stir", "star"]], ["The ___ swam fast to catch a fish.", "shark", ["shirt", "short"]], ["Please button your ___.", "shirt", ["short", "shark"]], ["The baby horse was ___ in the spring.", "born", ["barn", "burn"]], ["A ___ has feathers and a beak.", "bird", ["bark", "burn"]]];
const V25EN7_RYES = ["car", "star", "park", "farm", "corn", "fork", "storm", "horse", "bird", "girl", "shirt", "nurse", "turtle", "fern", "herd", "purple", "burn", "jar", "sport", "dirt"];
const V25EN7_RNO = ["frog", "tree", "drum", "grab", "crab", "red", "rug", "brick", "trip", "dress", "rope", "rock", "ring", "brush"];
V25EN7_W("bossyr", 0.3, [
  () => {
    const ans = pick(V25EN7_RYES), t = ans.match(/[aeiou]r/)[0], wrong = shuffle(V25EN7_RNO).slice(0, 3);
    return V25EN7_Q({ q: "Which word has a <b>Bossy R</b> team?", say: "Which word has a bossy R team?", big: 1, why: `${cap(ans)} has ${t}: the r comes right after the vowel and bosses it.`, key: "v25rC" + ans + wrong.join() }, ans, wrong, wrong.map(w => `In “${w}”, the r comes before the vowel, so it isn't bossy.`));
  },
  () => {
    const [t, ans, ds] = pick(V25EN7_RRHY), rt = V25EN7_rrime(t);
    return V25EN7_Q({ q: `Which word rhymes with <b>${t}</b>?`, say: `Which word rhymes with ${t}?`, vis: hw(t), big: 1, why: `${cap(ans)} and ${t} both end with -${rt}.`, key: "v25rA" + t }, ans, ds, ds.map(d => `“${d}” ends with -${V25EN7_rrime(d)}, but “${t}” ends with -${rt}, so they don't rhyme.`));
  },
  () => {
    const [s, ans, ds] = pick(V25EN7_RSENT);
    return V25EN7_Q({ q: `Which word fits the sentence?${V25EN7_sent(s)}`, say: `Which word fits the sentence? ${V25EN7_say(s)}`, big: 1, why: `${cap(ans)} fits: ${s.replace("___", ans)}`, key: "v25rB" + s }, ans, ds, ds.map(d => `“${d}” ${V25EN7_RGL[d]}, so it doesn't fit here.`));
  },
]);

/* ---------------- Adding -ing ---------------- */
/* A: sentences. [sentence, base word, rule] rule: add / dbl / drop */
const V25EN7_ISENT = [["Mom is ___ a cake for my birthday.", "frost", "add"], ["The kids are ___ in the pool.", "splash", "add"], ["Look, the puppy is ___ its tail!", "wag", "dbl"], ["Dad is ___ the grass.", "mow", "add"], ["The snowman is ___ in the sun.", "melt", "add"], ["We are ___ a fort out of blankets.", "build", "add"], ["The frog is ___ onto a lily pad.", "hop", "dbl"], ["Grandma is ___ a scarf for me.", "knit", "dbl"], ["The kids are ___ their hands on paper.", "trace", "drop"], ["Leo is ___ his wagon up the hill.", "tug", "dbl"], ["The baby is ___ at the clown.", "giggle", "drop"], ["My sister is ___ a picture of a horse.", "paint", "add"], ["The cat is ___ on the windowsill.", "nap", "dbl"], ["We are ___ to the top of the hill.", "hike", "drop"], ["Everyone is ___ for the team.", "cheer", "add"], ["The chef is ___ the onions.", "chop", "dbl"], ["The kids are ___ on the ice.", "skate", "drop"], ["The bus is ___ at the corner.", "stop", "dbl"], ["Ben is ___ the dishes with a towel.", "dry", "add"], ["We are ___ our friends to the party.", "invite", "drop"], ["The wind is ___ the leaves around.", "blow", "add"], ["Nora is ___ water on the plants.", "pour", "add"], ["The squirrel is ___ a nut.", "hide", "drop"], ["The dog is ___ a big hole.", "dig", "dbl"], ["The kids are ___ the ball back and forth.", "toss", "add"], ["Sam is ___ the bell.", "ring", "add"], ["We are ___ in line for lunch.", "wait", "add"], ["The kitten is ___ with a ball of yarn.", "play", "add"], ["Dad is ___ the car into the garage.", "drive", "drop"], ["The kids are ___ each other.", "tickle", "drop"], ["The hose is ___ water on the flowers.", "spray", "add"], ["Mia is ___ a song.", "sing", "add"], ["The cook is ___ the soup.", "stir", "dbl"], ["The baby is ___ her blocks.", "stack", "add"], ["The kids are ___ rope.", "jump", "add"], ["Dad is ___ the window.", "close", "drop"], ["We are ___ the cookies.", "share", "drop"], ["The dog is ___ at the door.", "scratch", "add"]];
const V25EN7_V = c => "aeiou".includes(c);
const V25EN7_ingOf = (b, r) => r === "add" ? b + "ing" : r === "dbl" ? b + b.slice(-1) + "ing" : b.slice(0, -1) + "ing";
const V25EN7_noDbl = b => {
  const L = b.slice(-1);
  if (/[wxy]$/.test(b)) return `we don't double a ${L} at the end.`;
  if (!V25EN7_V(b.slice(-2, -1)) && !V25EN7_V(L)) return `${b} already ends in two consonants, ${b.slice(-2)}.`;
  return `${b} has two vowels together, ${b.slice(-3, -1)}.`;
};
/* B: take off -ing. [base, rule]; PAIR = real short words that would double */
const V25EN7_IBASE = [["swim", "dbl"], ["hop", "dbl"], ["tap", "dbl"], ["scrap", "dbl"], ["stop", "dbl"], ["clap", "dbl"], ["drum", "dbl"], ["shop", "dbl"], ["chat", "dbl"], ["grab", "dbl"], ["flip", "dbl"], ["slam", "dbl"], ["jog", "dbl"], ["dig", "dbl"], ["skip", "dbl"], ["trot", "dbl"],
  ["hope", "drop"], ["tape", "drop"], ["scrape", "drop"], ["ride", "drop"], ["hide", "drop"], ["slide", "drop"], ["shine", "drop"], ["smile", "drop"], ["bake", "drop"], ["dance", "drop"], ["wave", "drop"], ["joke", "drop"], ["close", "drop"]];
const V25EN7_IPAIR = new Set(["hope", "tape", "scrape", "hop", "tap", "scrap", "rid", "hid", "slid", "shin", "bit"]);
V25EN7_W("ing", 0.3, [
  () => {
    const [s, b, r] = pick(V25EN7_ISENT), L = b.slice(-1), ans = V25EN7_ingOf(b, r);
    let wrong, reasons;
    if (r === "add") { wrong = [b + L + "ing", b + "eing"]; reasons = [`“${b + L}ing” has an extra ${L}; ${V25EN7_noDbl(b)}`, `“${b}eing” adds an e that isn't in ${b}.`]; }
    else if (r === "dbl") { wrong = [b + "ing", b + L + L + "ing"]; reasons = [`“${b}ing” has just one ${L}; ${b} needs a second ${L} before -ing.`, `“${b + L + L}ing” has three ${L}s; two is enough.`]; }
    else { const st = b.slice(0, -1), c = st.slice(-1); wrong = [b + "ing", st + c + "ing"]; reasons = [`“${b}ing” keeps the silent e; drop the e before adding -ing.`, `“${st + c}ing” doubles the ${c}; just drop the e and add -ing.`]; }
    return V25EN7_Q({ q: `Add -ing to <b>${b}</b>. Which word finishes the sentence?${V25EN7_sent(s)}`, say: `Add i n g to ${b}. Which word finishes the sentence? ${V25EN7_say(s)}`, big: 1, why: r === "drop" ? `Drop the silent e, then add ing: ${ans}.` : r === "dbl" ? `Double the last letter, then add ing: ${ans}.` : `Just add ing: ${ans}.`, key: "v25iA" + s }, ans, wrong, reasons);
  },
  () => {
    const [b, r] = pick(V25EN7_IBASE), ing = V25EN7_ingOf(b, r), L = b.slice(-1);
    let wrong, reasons;
    if (r === "dbl") {
      wrong = [b + L, b + "e"];
      reasons = [`“${b + L}” isn't a word; the second ${L} was added for -ing.`, V25EN7_IPAIR.has(b + "e") ? `“${b}e” + ing would be ${b}ing, with just one ${L}.` : `“${b}e” isn't a word; ${ing} doubled the ${L}, it didn't drop an e.`];
    } else {
      const st = b.slice(0, -1), c = st.slice(-1);
      wrong = [st, st + c];
      reasons = [V25EN7_IPAIR.has(st) ? `“${st}” + ing would double the ${c}: ${st + c}ing.` : `“${st}” isn't a word; it is missing the e from the end.`, `“${st + c}” isn't a word; ${ing} has only one ${c}.`];
    }
    return V25EN7_Q({ q: `Take off the <b>-ing</b>. What is the base word of <b>${ing}</b>?`, say: `Take off the i n g. What is the base word of ${ing}?`, vis: hw(`${ing} → ?`), big: 1, why: r === "dbl" ? `${cap(b)} doubled its ${L} to make ${ing}.` : `${cap(b)} dropped its e to make ${ing}.`, key: "v25iB" + b }, b, wrong, reasons);
  },
]);

/* ---------------- Silent letters ---------------- */
/* A: sound-alike words. [sentence, answer, wrong] */
const V25EN7_HGL = { no: "is the opposite of yes", know: "means to have learned something", knot: "is a tie in a rope or string", not: "is a no word, like in “not sleepy”", write: "means to put words on paper", right: "means correct, or the opposite of left", knew: "means you already learned it", new: "means not old", knight: "is a soldier in armor from long ago", night: "is the dark time when we sleep", hour: "is sixty minutes of time", our: "means it belongs to us", whole: "means all of something", hole: "is an empty space, like one you dig", knows: "means has learned", nose: "is what you smell with", wrap: "means to cover something, like a gift", rap: "is a quick tap or knock", two: "is the number 2", to: "is a small word, like in “go to bed”", need: "means you must have it", knead: "means to press and fold dough" };
const V25EN7_HSENT = [["Do you ___ my name?", "know", "no"], ["___, thank you. I am full.", "No", "Know"], ["I tied a ___ in my shoelace.", "knot", "not"], ["My cat is ___ hungry yet.", "not", "knot"], ["Please ___ your name at the top.", "write", "right"], ["Turn ___ at the big tree.", "right", "write"], ["I ___ the answer right away.", "knew", "new"], ["I got ___ shoes for school.", "new", "knew"], ["The ___ rode a horse to the castle.", "knight", "night"], ["The stars come out at ___.", "night", "knight"], ["We waited one ___ for the bus.", "hour", "our"], ["This is ___ classroom.", "our", "hour"], ["I ate the ___ apple.", "whole", "hole"], ["The dog dug a ___ in the yard.", "hole", "whole"], ["Mia ___ how to swim.", "knows", "nose"], ["I smell cookies with my ___.", "nose", "knows"], ["Let's ___ the gift in shiny paper.", "wrap", "rap"], ["I have ___ eyes and one mouth.", "two", "to"], ["You ___ to wear a coat today.", "need", "knead"], ["Help me ___ the bread dough.", "knead", "need"]];
/* B: which word has a silent letter? [word, a silent letter] */
const V25EN7_SILW = [["knight", "k"], ["kneecap", "k"], ["doorknob", "k"], ["knitting", "k"], ["wreath", "w"], ["writer", "w"], ["wristband", "w"], ["Wednesday", "d"], ["hourglass", "h"], ["crumbs", "b"], ["thumbs", "b"], ["honestly", "h"], ["walking", "l"], ["talking", "l"], ["wrinkly", "w"], ["plumbing", "b"], ["listening", "t"], ["knocking", "k"]];
const V25EN7_SIL0 = ["nest", "frog", "drum", "stamp", "milk", "jump", "plant", "crab", "list", "sand", "belt", "twin", "gift", "mask", "pond"];
/* C: which spelling is right? [sentence, right, wrong spelling, missing silent letter] */
const V25EN7_SSPELL = [["I scraped my ___ on the sidewalk.", "knee", "nee", "k"], ["Dad cut the bread with a ___.", "knife", "nife", "k"], ["I wear a watch on my ___.", "wrist", "rist", "w"], ["I gave her two ___ up.", "thumbs", "thums", "b"], ["Please ___ to the story.", "listen", "lisen", "t"], ["The queen lives in a ___.", "castle", "casle", "t"], ["She used a ___ to fix her hair.", "comb", "com", "b"], ["We ___ up the tall hill.", "climb", "clim", "b"], ["Oops, that answer is ___.", "wrong", "rong", "w"], ["Raise your hand to ___ the question.", "answer", "anser", "w"], ["I ate ___ of the sandwich.", "half", "haf", "l"], ["We ___ our dog every day.", "walk", "wak", "l"], ["We took a boat to the ___.", "island", "iland", "s"], ["Art class is on ___.", "Wednesday", "Wenesday", "d"], ["Turn the ___ to open the door.", "doorknob", "doornob", "k"], ["We hung a ___ on the front door.", "wreath", "reath", "w"], ["Cut the paper with ___.", "scissors", "sissors", "c"], ["The ___ in the story was friendly.", "ghost", "gost", "h"], ["Tell the truth and be ___.", "honest", "onest", "h"], ["I ___ on the door before I go in.", "knock", "nock", "k"]];
V25EN7_W("silent", 0.3, [
  () => {
    const [s, ans, w] = pick(V25EN7_HSENT);
    return V25EN7_Q({ q: `Which word fits the sentence?${V25EN7_sent(s)}`, say: `Which word fits the sentence? ${V25EN7_say(s)}`, big: 1, why: `${cap(ans)} ${V25EN7_HGL[ans.toLowerCase()]}, so it fits here.`, key: "v25lA" + s }, ans, [w], [`“${w}” ${V25EN7_HGL[w.toLowerCase()]}, so it doesn't fit here.`]);
  },
  () => {
    const [ans, l] = pick(V25EN7_SILW), wrong = shuffle(V25EN7_SIL0).slice(0, 3);
    return V25EN7_Q({ q: "Which word has a <b>silent letter</b>?", say: "Which word has a silent letter?", big: 1, why: `In ${ans}, you don't hear the ${l}.`, key: "v25lB" + ans + wrong.join() }, ans, wrong, wrong.map(w => `You can hear every letter in “${w}”, so it has no silent letter.`));
  },
  () => {
    const [s, ans, w, l] = pick(V25EN7_SSPELL);
    return V25EN7_Q({ q: `Which spelling is right?${V25EN7_sent(s)}`, say: `Which spelling is right? ${V25EN7_say(s)}`, big: 1, why: `${cap(ans)} has a silent ${l}: we write it, but we don't say it.`, key: "v25lC" + s }, ans, [w], [`“${w}” is missing the silent ${l}; we write the ${l} but don't say it.`]);
  },
]);

/* ---------------- Tricky plurals ---------------- */
/* A: fix the mistake. [sentence, wrong word, right word, one, kind, extra wrong option] */
const V25EN7_IFIX = [["Two mouses ran under the porch.", "mouses", "mice", "mouse", "change", "mices"], ["The childs played on the slide.", "childs", "children", "child", "change", "childrens"], ["I brushed all my tooths.", "tooths", "teeth", "tooth", "change", "teeths"], ["My foots are cold.", "foots", "feet", "foot", "change", "feets"], ["The farmer has ten sheeps.", "sheeps", "sheep", "sheep", "same", "sheepes"], ["We saw three deers in the field.", "deers", "deer", "deer", "same", "deeres"], ["The leafs fell from the tree.", "leafs", "leaves", "leaf", "f", "leafes"], ["Mom cut the apple into two halfs.", "halfs", "halves", "half", "f", "halfes"], ["Three wolfs howled at the moon.", "wolfs", "wolves", "wolf", "f", "wolfes"], ["The babys are sleeping.", "babys", "babies", "baby", "y", "babyes"], ["Dad read us three storys.", "storys", "stories", "story", "y", "storyes"], ["The ladys sang a song.", "ladys", "ladies", "lady", "y", "ladyes"], ["Our town has two librarys.", "librarys", "libraries", "library", "y", "libraryes"], ["The gooses swam in the lake.", "gooses", "geese", "goose", "change", "geeses"], ["The mans lifted the big box.", "mans", "men", "man", "change", "mens"], ["The womans waved at us.", "womans", "women", "woman", "change", "womens"], ["Three elfs made toys.", "elfs", "elves", "elf", "f", "elfes"], ["We picked a bowl of cherrys.", "cherrys", "cherries", "cherry", "y", "cherryes"], ["The shelfs are full of books.", "shelfs", "shelves", "shelf", "f", "shelfes"], ["Dad baked two loafs of bread.", "loafs", "loaves", "loaf", "f", "loafes"], ["Our cat had three kittys.", "kittys", "kitties", "kitty", "y", "kittyes"], ["Two mooses walked by the lake.", "mooses", "moose", "moose", "same", "meese"], ["Six familys came to the picnic.", "familys", "families", "family", "y", "familyes"]];
const V25EN7_IFIXR = (x, kind, one, right) => kind === "same" ? (x === "meese" ? `“meese” isn't a word; ${one} stays the same for more than one.` : `${cap(one)} stays the same for more than one, so we don't add ${x.endsWith("es") ? "es" : "s"}.`)
  : kind === "f" ? `“${x}” keeps the f, but the f should change to v.` : kind === "y" ? `“${x}” keeps the y, but the y should change to i.`
  : x === right + "s" || x === right + "es" ? `“${x}” adds an extra s, but ${right} already means more than one.` : `We don't say “${x}”; ${one} changes to a new word: ${right}.`;
/* B: which word stays the same? */
const V25EN7_ISAME = ["sheep", "deer", "moose", "fish", "bison", "trout", "salmon"];
const V25EN7_IREG = [["goat", "goats"], ["cow", "cows"], ["horse", "horses"], ["duck", "ducks"], ["pig", "pigs"], ["fox", "foxes"], ["hen", "hens"], ["frog", "frogs"], ["mouse", "mice", 1], ["goose", "geese", 1], ["wolf", "wolves", 1], ["puppy", "puppies", 1]];
V25EN7_W("irregplural", 0.3, [
  () => {
    const [s, wr, right, one, kind, ex] = pick(V25EN7_IFIX);
    return V25EN7_Q({ q: `Find the mistake. Which word should take the place of <b>${wr}</b>?${`<div class="sentence">${s.replace(wr, `<u>${wr}</u>`)}</div>`}`, say: `Find the mistake. ${s} Which word should take the place of ${wr}?`, big: 1, why: kind === "same" ? `${cap(one)} stays the same: ${s.replace(wr, right)}` : `More than one ${one} is ${right}: ${s.replace(wr, right)}`, key: "v25gA" + s }, right, [wr, ex], [V25EN7_IFIXR(wr, kind, one, right), V25EN7_IFIXR(ex, kind, one, right)]);
  },
  () => {
    const ans = pick(V25EN7_ISAME), wrong = shuffle(V25EN7_IREG).slice(0, 3);
    return V25EN7_Q({ q: "Which word <b>stays the same</b> when there is more than one?", say: "Which word stays the same when there is more than one?", big: 1, why: `One ${ans}, two ${ans}: it doesn't change.`, key: "v25gB" + ans + wrong.map(x => x[0]).join() }, ans, wrong.map(x => x[0]), wrong.map(([o, m, ch]) => ch ? `One ${o}, two ${m}: “${o}” changes for more than one.` : `One ${o}, two ${m}: “${o}” adds ${m.endsWith("es") ? "es" : "s"} for more than one.`));
  },
]);

/* ---------------- Self words (reflexive pronouns) ---------------- */
const V25EN7_SW = { I: "myself", you: "yourself", he: "himself", she: "herself", it: "itself", we: "ourselves", they: "themselves" };
const V25EN7_SWHO = { myself: "goes with I", yourself: "goes with you", himself: "is for a boy or a man", herself: "is for a girl or a woman", itself: "is for an animal or a thing", ourselves: "goes with we", themselves: "is for more than one other person or thing" };
/* A: who does it point back to? [sentence, self word, answer, [other choices]] */
const V25EN7_SPT = [["Grandpa made himself a cup of tea.", "himself", "Grandpa", ["the cup", "the tea"]], ["The kitten saw itself in the shiny pot.", "itself", "the kitten", ["the pot"]], ["Rosa taught herself to ride a bike.", "herself", "Rosa", ["the bike"]], ["The boys built themselves a snow fort.", "themselves", "the boys", ["the snow fort"]], ["Ben wrote himself a note.", "himself", "Ben", ["the note"]], ["Mom and I made ourselves sandwiches.", "ourselves", "Mom and I", ["the sandwiches"]], ["The robot turned itself off at night.", "itself", "the robot", ["the night"]], ["Aunt May bought herself a new hat.", "herself", "Aunt May", ["the hat"]], ["The puppy dried itself on the rug.", "itself", "the puppy", ["the rug"]], ["The girls painted themselves a sign.", "themselves", "the girls", ["the sign"]], ["I gave myself a gold star.", "myself", "I", ["the gold star"]], ["Leo saw himself in the window.", "himself", "Leo", ["the window"]], ["The twins poured themselves some juice.", "themselves", "the twins", ["the juice"]], ["The bird cleaned itself in the pond.", "itself", "the bird", ["the pond"]], ["Nina made herself a paper crown.", "herself", "Nina", ["the paper crown"]], ["Maya helped Sam, and then she helped herself.", "herself", "Maya", ["Sam"]], ["Ana watched Leo dress himself.", "himself", "Leo", ["Ana"]], ["Jack saw Mia hide herself behind a tree.", "herself", "Mia", ["Jack", "the tree"]], ["The dog watched the cat clean itself.", "itself", "the cat", ["the dog"]], ["Omar and I made ourselves a fort.", "ourselves", "Omar and I", ["the fort"]]];
/* B / C: new people, animals and things */
const V25EN7_SSUB = [["Aunt Rosa", "she"], ["Uncle Raj", "he"], ["my cousins", "they"], ["the puppy", "it"], ["the queen", "she"], ["the king", "he"], ["Grandma and I", "we"], ["the goldfish", "it"], ["my sister and I", "we"], ["the firefighters", "they"], ["the little robot", "it"], ["Mr. Lee", "he"], ["Ms. Diaz", "she"], ["the players", "they"], ["my dad", "he"], ["the baby birds", "they"], ["the girl in the red coat", "she"], ["the boy next door", "he"], ["my friends and I", "we"], ["the kitten", "it"]];
const V25EN7_SPRED = ["made ___ a paper hat.", "wrote ___ a note.", "bought ___ a new book.", "taught ___ to juggle.", "found ___ a good seat.", "saw ___ in the window.", "kept ___ warm by the fire.", "cheered for ___ at the end.", "poured ___ some water."];
const V25EN7_SPREDIT = { "the puppy": ["scratched ___ behind the ear.", "rolled ___ in the grass."], "the goldfish": ["saw ___ in the glass.", "hid ___ behind a rock."], "the little robot": ["turned ___ on.", "fixed ___ with a tiny tool."], "the kitten": ["licked ___ clean.", "curled ___ into a ball."] };
const V25EN7_sdist = (t, ans) => {
  const near = t === "he" ? ["herself"] : t === "she" ? ["himself"] : t === "we" ? ["themselves", "myself"] : t === "they" ? ["ourselves", "himself"] : t === "it" ? ["themselves"] : ["ourselves"];
  const all = Object.values(V25EN7_SW).filter(w => w !== ans && !(t === "it" && (w === "himself" || w === "herself")));
  return uniq(ans, [...near, ...shuffle(all)]).filter(w => w !== ans).slice(0, 3);
};
const V25EN7_sreason = (w, s) => `“${w}” ${V25EN7_SWHO[w]}, but this is about ${s.replace(/ and I$/, " and me")}.`;
V25EN7_W("reflexive", 0.3, [
  () => {
    const [s, self, ans, others] = pick(V25EN7_SPT);
    return V25EN7_Q({ q: `Who or what does <b>${self}</b> point back to?<div class="sentence">${s.replace(self, `<b class="hl">${self}</b>`)}</div>`, say: `${s} Who or what does ${self} point back to?`, big: 1, why: `${cap(self)} points back to ${ans}.`, key: "v25fA" + s }, ans, others, others.map(o => `${cap(self)} points back to ${ans}, not to ${o}.`));
  },
  () => {
    const [s, t] = pick(V25EN7_SSUB), ans = V25EN7_SW[t], wrong = V25EN7_sdist(t, ans);
    return V25EN7_Q({ q: `Pick the self word for <b>${s}</b>.`, say: `Pick the self word for ${s}.`, big: 1, why: `${cap(s)} → ${t}, and ${t} goes with ${ans}.`, key: "v25fB" + s }, ans, wrong, wrong.map(w => V25EN7_sreason(w, s)));
  },
  () => {
    const [s, t] = pick(V25EN7_SSUB), ans = V25EN7_SW[t], p = pick(V25EN7_SPREDIT[s] || V25EN7_SPRED), sent = `${cap(s)} ${p}`, wrong = V25EN7_sdist(t, ans);
    return V25EN7_Q({ q: `Which self word finishes the sentence?${V25EN7_sent(sent)}`, say: `Which self word finishes the sentence? ${V25EN7_say(sent)}`, big: 1, why: `${sent.replace("___", ans)} ${cap(ans)} ${V25EN7_SWHO[ans]}.`, key: "v25fC" + sent }, ans, wrong, wrong.map(w => V25EN7_sreason(w, s)));
  },
]);

