/* =====================================================================
   Question bank: Age 7 English (more questions for 13 topics).
   ===================================================================== */
/* Real words that a wrong letter team would accidentally spell (kept out of the options). */
const EN7_REAL = new Set(["aits","barn","blain","blame","blate","bleak","bless","bloke","bloom","blow","blower","blown","blush","bly","born","bosh","brant","brass","brasses","break","breed","breeze","bride","bries","brim","broad","broke","broth","brow","brower","brown","bry","burn","carl","cercus","cert","chat","ched","chert","chick","chin","chine","chink","chip","chop","chower","chunder","chy","clack","class","classes","click","clipper","clop","cloth","clove","clown","cluck","clue","clunk","cly","cord","couth","crack","crap","crass","crasses","crate","creak","cress","crick","crim","crop","crouse","crow","crower","crown","cruck","crumpet","crush","cry","curd","curt","dart","dirk","dirt","dork","drain","dripper","drop","drove","drown","drug","drunk","dry","eek","ert","far","farty","fer","fir","flack","flagon","flap","fleet","flick","flight","flipper","float","flop","flow","flown","flue","flunk","flush","fly","for","frack","frame","frap","freak","freeze","fridge","froth","frow","frower","frown","frug","fry","glass","glide","glider","glim","gloom","glop","glow","glower","glue","gly","grain","grant","grass","grasses","grate","gree","gride","grider","grim","gripper","groan","groom","grouse","grove","grow","grower","grown","grue","gry","hard","hart","hay","hor","hort","laid","leed","mach","mash","mosh","ort","parch","pash","pee","peel","perch","perty","plain","plate","plop","plow","plower","plowman","pluck","plunk","plush","ply","porch","porty","prate","preen","press","prick","pricket","pride","prim","prop","proud","prove","prow","prower","pry","raid","reed","reel","said","scant","sci","scies","scop","scow","scower","scurf","scy","see","seel","serf","shank","sheer","shess","shew","shin","ship","shirt","shoat","shop","shy","sigh","skate","skider","skies","skim","skipper","sky","slack","slain","slant","slap","slate","slick","slider","slim","slop","slow","slower","slue","slug","slunk","slush","sly","smack","smug","snack","snap","snare","snarf","sneak","snick","snide","snooter","snower","snug","spate","speak","spile","spoke","spouse","spree","spue","spunk","spurt","spy","stack","stain","star","stark","state","ster","stick","stile","stirk","stoa","stoke","stop","stor","stove","stow","stower","strait","stuck","stunk","sty","swain","swap","tarn","teed","tern","that","thed","thee","theer","then","there","thew","thicken","thin","thine","thy","torn","track","train","trap","trass","trasses","tree","treen","tress","trick","trim","tripper","troth","trove","trow","trower","true","trug","trunk","try","wee","whew","whin","whine","whip","whop","wight","woad"]);
const EN7_vis = (e, h) => e ? col(bigEmo(e), hw(h)) : hw(h);
const EN7_pos = (pre, suf) => !pre ? "starts" : !suf ? "finishes" : "completes";
const EN7_blank = (pre, n, suf) => `${pre}<span class="blank">${"_".repeat(n)}</span>${suf}`;
/* pick up to n wrong teams that do NOT spell a real word in pre+X+suf */
const EN7_teamOpts = (pre, t, suf, pool, n = 3) => shuffle([t, ...shuffle(pool.filter(x => x !== t && !EN7_REAL.has(pre + x + suf))).slice(0, n)]);

/* ---------------- Bossy R ---------------- */
const EN7_BOSSY = [
  ["", "ar", "m", "💪"], ["y", "ar", "n", "🧶"], ["c", "ar", "d", "🃏"], ["c", "ar", "t", "🛒"], ["sc", "ar", "f", "🧣"], ["guit", "ar", "", "🎸"], ["g", "ar", "den", "🏡"], ["", "ar", "t", "🎨"], ["d", "ar", "t", "🎯"], ["sp", "ar", "k", "✨"], ["d", "ar", "k", "🌑"], ["y", "ar", "d", ""], ["ch", "ar", "t", "📊"], ["p", "ar", "ty", "🎉"], ["sh", "ar", "p", ""], ["m", "ar", "ket", ""], ["sm", "ar", "t", ""],
  ["sp", "or", "t", ""], ["sh", "or", "t", ""], ["n", "or", "th", "🧭"], ["p", "or", "ch", ""], ["c", "or", "ner", ""], ["m", "or", "ning", "🌅"], ["popc", "or", "n", "🍿"], ["ac", "or", "n", "🌰"], ["st", "or", "k", ""], ["t", "or", "nado", "🌪️"], ["f", "or", "ty", ""], ["b", "or", "n", ""], ["", "or", "ange", "🍊"], ["", "or", "der", ""], ["sn", "or", "e", "😴"],
  ["f", "ir", "st", "🥇"], ["d", "ir", "t", ""], ["sk", "ir", "t", ""], ["th", "ir", "d", "🥉"], ["st", "ir", "", "🥄"], ["tw", "ir", "l", ""], ["c", "ir", "cle", "⭕"], ["b", "ir", "thday", "🎂"], ["ch", "ir", "p", ""], ["c", "ir", "cus", "🎪"], ["th", "ir", "sty", ""], ["sw", "ir", "l", "🌀"],
  ["b", "ur", "n", ""], ["c", "ur", "l", ""], ["h", "ur", "t", ""], ["t", "ur", "n", ""], ["f", "ur", "", ""], ["ch", "ur", "ch", "⛪"], ["p", "ur", "ple", "🟣"], ["s", "ur", "f", "🏄"], ["b", "ur", "st", ""], ["t", "ur", "key", "🦃"], ["c", "ur", "b", ""], ["hamb", "ur", "ger", "🍔"], ["t", "ur", "nip", ""],
  ["h", "er", "", ""], ["h", "er", "d", ""], ["p", "er", "ch", ""], ["g", "er", "m", ""], ["sist", "er", "", ""], ["wint", "er", "", "⛄"], ["butt", "er", "", "🧈"], ["ladd", "er", "", "🪜"], ["dinn", "er", "", ""], ["hamm", "er", "", "🔨"], ["pap", "er", "", "📄"], ["wat", "er", "", "💧"], ["riv", "er", "", ""], ["spid", "er", "", "🕷️"], ["teach", "er", "", "🧑‍🏫"], ["m", "er", "maid", "🧜‍♀️"], ["numb", "er", "", "🔢"], ["summ", "er", "", "☀️"],
];
const EN7_BREF = { ar: "car", or: "corn", ir: "bird", ur: "nurse", er: "fern" };
addBank(7, "english", "bossyr", 0.8, function () {
  const [pre, t, suf, e] = pick(EN7_BOSSY), w = pre + t + suf;
  const bo = EN7_teamOpts(pre, t, suf, ["ar", "or", "er", "ir", "ur"]);
  if (bo.length >= 3 && Math.random() < 0.5) return { q: `Which Bossy R team ${EN7_pos(pre, suf)} the word?`, say: `Which bossy R team ${EN7_pos(pre, suf)} the word ${w}?`, vis: EN7_vis(e, EN7_blank(pre, 2, suf)), opts: bo, ans: t, big: 1, why: `${cap(w)} is spelled with ${t}: ${pre}${t.toUpperCase()}${suf}.`, key: "n" + w };
  const others = shuffle(EN7_BOSSY.map(x => x.join("").replace(/[^a-z]/g, "")).filter(x => !x.includes(t))).slice(0, 3), ref = EN7_BREF[t], snd = t === "ar" || t === "or";
  const q = snd ? `Which word has the <b>${t}</b> sound, like in <b>${ref}</b>?` : `Which word is spelled with <b>${t}</b>, like <b>${ref}</b>?`;
  return { q, say: snd ? `Which word has the ${t} sound, like in ${ref}?` : `Which word is spelled with ${t}, like ${ref}?`, opts: shuffle([w, ...others]), ans: w, big: 1, why: snd ? `${cap(w)} has ${t} in it, just like ${ref}.` : `${cap(w)} is spelled with ${t}, just like ${ref}.`, key: "w" + w };
});

/* ---------------- Plurals ---------------- */
const EN7_PLUR = [["bee", "🐝"], ["boat", "⛵"], ["car", "🚗"], ["cake", "🎂"], ["cow", "🐄"], ["drum", "🥁"], ["duck", "🦆"], ["egg", "🥚"], ["frog", "🐸"], ["kite", "🪁"], ["pig", "🐷"], ["ring", "💍"], ["sock", "🧦"], ["star", "⭐"], ["tree", "🌳"], ["apple", "🍎"], ["banana", "🍌"], ["pear", "🍐"], ["bell", "🔔"], ["key", "🔑"], ["shell", "🐚"], ["snake", "🐍"], ["train", "🚂"], ["truck", "🚚"], ["bike", "🚲"], ["cookie", "🍪"], ["carrot", "🥕"], ["crayon", "🖍️"], ["rocket", "🚀"], ["robot", "🤖"], ["horse", "🐴"], ["lemon", "🍋"], ["ant", "🐜"], ["crab", "🦀"], ["snail", "🐌"], ["shoe", "👟"], ["gift", "🎁"], ["balloon", "🎈"], ["pencil", "✏️"], ["owl", "🦉"], ["bear", "🐻"], ["flower", "🌸"], ["sheep", "", 1],
  ["dress", "👗"], ["sandwich", "🥪"], ["beach", "🏖️"], ["couch", "🛋️"], ["wrench", "🔧"], ["compass", "🧭"], ["toothbrush", "🪥"], ["mailbox", "📫"], ["bush", "🌳"], ["class", "🏫"], ["lunch", "🍱"], ["splash", "💦"], ["kiss", "💋"], ["branch", "🌿"]].filter(x => !x[2]);
const EN7_pl = b => /(s|x|sh|ch)$/.test(b) ? b + "es" : b + "s";
addBank(7, "english", "plurals", 0.82, function () {
  const [b, e] = pick(EN7_PLUR), p = EN7_pl(b), es = p !== b + "s", end = es ? b.match(/(sh|ch|s|x)$/)[0] : "";
  const why = es ? `${cap(b)} ends in ${end}, so we add es: ${p}.` : `Just add s: ${p}.`, k = R(0, 2);
  if (k === 0) return { q: `One ${b}, two ___.`, say: `One ${b}, two what?`, vis: `<span class="emo xxl">${e}${e}</span>`, opts: uniq(p, es ? [b + "s", b, b + "ies"] : [b + "es", b, b + "ss"]), ans: p, big: 1, why, key: "a" + b };
  if (k === 1) return { q: `Do we add <b>s</b> or <b>es</b> to make more than one <b>${b}</b>?`, say: `Do we add s, or e s, to make more than one ${b}?`, vis: `<span class="emo xxl">${e}${e}</span>`, opts: ["s", "es"], ans: es ? "es" : "s", sayAns: es ? "e s" : "s", big: 1, why, key: "b" + b };
  const others = shuffle(EN7_PLUR.filter(x => x[0] !== b)).slice(0, 2).map(x => x[0]);
  return { q: "Which word means <b>more than one</b>?", say: "Which word means more than one?", opts: shuffle([p, b, ...others]), ans: p, big: 1, why: `${cap(p)} means more than one ${b}.`, key: "c" + b };
});

/* ---------------- Adding -ing ---------------- */
const EN7_ING = {
  add: ["walk", "talk", "help", "look", "cook", "kick", "paint", "pick", "push", "pull", "sleep", "dream", "rain", "wash", "brush", "laugh", "climb", "work", "rest", "spell", "yell", "fill", "call", "think", "drink", "bring", "catch", "count", "stand", "float", "shout", "hunt", "melt", "build", "plant", "smell", "sweep", "feed", "wait", "boil"],
  dbl: ["dig", "hug", "nap", "shop", "skip", "stop", "jog", "hit", "chop", "drip", "grab", "step", "wag", "rub", "spin", "trot", "drop", "flap", "get", "set", "put", "beg", "nod", "slip", "trip", "scrub", "zip", "dip", "pop"],
  dropE: ["hike", "smile", "skate", "wave", "hide", "slide", "bite", "dive", "drive", "close", "share", "rake", "joke", "race", "chase", "come", "give", "taste", "wipe", "poke", "bounce", "sneeze", "care"],
};
const EN7_INGL = [...EN7_ING.add.map(w => [w, "add"]), ...EN7_ING.dbl.map(w => [w, "dbl"]), ...EN7_ING.dropE.map(w => [w, "dropE"])];
const EN7_RULE = { add: "Just add -ing", dbl: "Double the last letter", dropE: "Drop the silent e" };
addBank(7, "english", "ing", 0.82, function () {
  const [b, r] = pick(EN7_INGL), L = b.slice(-1);
  const ing = r === "add" ? b + "ing" : r === "dbl" ? b + L + "ing" : b.slice(0, -1) + "ing";
  const why = r === "dropE" ? `Drop the silent e, then add ing: ${ing}.` : r === "dbl" ? `Double the last letter, then add ing: ${ing}.` : `Just add ing: ${ing}.`;
  if (Math.random() < 0.5) {
    const wrong = r === "add" ? [b + L + "ing", b + "eing"] : r === "dbl" ? [b + "ing", b + "eing", b + L + L + "ing"] : [b + "ing", b.slice(0, -1) + b.slice(-2, -1) + "ing", b + "eing"];
    return { q: `Add <b>-ing</b> to <b>${b}</b>.`, say: `Add i n g to ${b}. Which spelling is right?`, vis: hw(`${b} + ing`), opts: uniq(ing, wrong), ans: ing, big: 1, why, key: "a" + b };
  }
  return { q: `What do we do to <b>${b}</b> before adding <b>-ing</b>?`, say: `What do we do to ${b} before adding i n g?`, vis: hw(`${b} → ${ing}`), opts: ["Just add -ing", "Double the last letter", "Drop the silent e"], ans: EN7_RULE[r], why, key: "r" + b };
});

/* ---------------- Silent letters ---------------- */
const EN7_SIL = [["know", "k", ["n", "o"]], ["knit", "k", ["n", "i", "t"]], ["knob", "k", ["n", "o", "b"]], ["kneel", "k", ["n", "l"]], ["knelt", "k", ["n", "e", "l"]], ["known", "k", ["n", "o"]],
  ["wrong", "w", ["r", "o", "n"]], ["wrote", "w", ["r", "o", "t"]], ["wrench", "w", ["r", "e", "n"]], ["wrinkle", "w", ["r", "i", "n"]], ["answer", "w", ["a", "n", "s"]], ["sword", "w", ["s", "o", "d"]], ["two", "w", ["t", "o"]], ["who", "w", ["h", "o"]],
  ["crumb", "b", ["c", "r", "u"]], ["limb", "b", ["l", "i", "m"]], ["plumber", "b", ["p", "l", "u"]], ["numb", "b", ["n", "u", "m"]], ["debt", "b", ["d", "e", "t"]], ["doubt", "b", ["d", "t"]],
  ["honest", "h", ["o", "n", "s"]], ["honor", "h", ["o", "n", "r"]], ["rhino", "h", ["r", "i", "n"]], ["rhyme", "h", ["r", "y", "m"]],
  ["listen", "t", ["l", "i", "s"]], ["fasten", "t", ["f", "a", "s"]], ["gnat", "g", ["n", "a", "t"]], ["gnaw", "g", ["n", "a"]],
  ["scissors", "c", ["s", "i", "r"]], ["scent", "c", ["s", "e", "n"]], ["muscle", "c", ["m", "u", "s"]],
  ["half", "l", ["h", "a", "f"]], ["calf", "l", ["c", "a", "f"]], ["walk", "l", ["w", "a", "k"]], ["talk", "l", ["t", "a", "k"]], ["chalk", "l", ["a", "k"]], ["could", "l", ["c", "d"]], ["would", "l", ["w", "d"]], ["salmon", "l", ["s", "a", "m"]],
  ["autumn", "n", ["a", "t", "m"]], ["column", "n", ["c", "o", "l"]], ["guess", "u", ["g", "e", "s"]], ["guitar", "u", ["g", "t", "r"]], ["guard", "u", ["g", "a", "d"]], ["build", "u", ["b", "i", "d"]], ["island", "s", ["i", "l", "n"]]];
/* old words (for the new kinds of question only) */
const EN7_SILOLD = [["knife", "k"], ["knee", "k"], ["knot", "k"], ["knock", "k"], ["write", "w"], ["wrist", "w"], ["wrap", "w"], ["wren", "w"], ["lamb", "b"], ["thumb", "b"], ["comb", "b"], ["climb", "b"], ["ghost", "h"], ["hour", "h"], ["castle", "t"], ["whistle", "t"], ["sign", "g"], ["gnome", "g"]];
const EN7_SILD = { k: ["kite", "kid", "milk", "desk", "skunk"], w: ["wet", "web", "swim", "wig", "twin", "wagon"], b: ["bat", "bed", "tub", "crib", "bug"], h: ["hat", "hen", "hop", "hill", "horse"], t: ["top", "tent", "cat", "toast", "tiger"], g: ["goat", "frog", "dog", "gum", "wig"], c: ["cat", "cup", "cab", "cub", "cap"], l: ["lip", "leg", "lamp", "bell", "doll"], n: ["net", "nap", "pin", "ten", "sun"], u: ["bug", "cup", "sun", "nut", "bus"], s: ["sun", "sit", "bus", "mask", "nest"] };
const EN7_START = { kn: ["n", "k", "nest", "kite"], wr: ["r", "w", "red", "web"], gn: ["n", "g", "nest", "goat"], ho: ["o", "h", "octopus", "hat"], wh: ["h", "w", "hat", "web"] };
const EN7_STARTW = ["know", "knit", "knob", "kneel", "knelt", "known", "knife", "knee", "knot", "knock", "wrong", "wrote", "wrench", "wrinkle", "write", "wrist", "wrap", "wren", "gnat", "gnaw", "gnome", "honest", "honor", "who"];
addBank(7, "english", "silent", 0.83, function () {
  const k = Math.random();
  if (k < 0.4) {
    const [w, l, d] = pick(EN7_SIL);
    return { q: `Which letter is <b>silent</b> in <b>${w}</b>?`, say: `Which letter is silent in ${w}?`, vis: hw(w), opts: shuffle([l, ...d]), ans: l, big: 1, why: `In ${w}, you don't hear the ${l}.`, key: "a" + w };
  }
  if (k < 0.8) {
    const [w, l] = pick([...EN7_SIL, ...EN7_SILOLD]);
    return { q: `Which word has a <b>silent ${l}</b>?`, say: `Which word has a silent ${l}?`, opts: shuffle([w, ...shuffle(EN7_SILD[l]).slice(0, 3)]), ans: w, big: 1, why: `In ${w}, you don't hear the ${l}. In the other words you can hear it.`, key: "b" + w };
  }
  const w = pick(EN7_STARTW), [snd, sil, ex1, ex2] = EN7_START[w.slice(0, 2)];
  const o1 = `/${snd}/ like ${ex1}`, o2 = `/${sil}/ like ${ex2}`;
  return { q: `Say <b>${w}</b> out loud. What sound does it start with?`, say: `Say ${w} out loud. What sound does it start with?`, vis: hw(w), opts: shuffle([o1, o2]), ans: o1, why: `The ${sil} in ${w} is silent, so ${w} starts with the ${snd} sound.`, key: "c" + w };
});

/* ---------------- Vowel teams ---------------- */
const EN7_VT = [
  ["t", "ai", "l", "", 1], ["n", "ai", "l", "💅", 1], ["m", "ai", "l", "📬", 1], ["s", "ai", "l", "", 1], ["p", "ai", "l", "🪣", 1], ["ch", "ai", "n", "⛓️", 1], ["br", "ai", "n", "🧠", 1], ["w", "ai", "t", "", 1], ["br", "ai", "d", "", 1], ["dr", "ai", "n", "", 1], ["st", "ai", "n", "", 1], ["r", "ai", "l", "🛤️", 1],
  ["s", "ee", "d", "🌱", 1], ["f", "ee", "d", "", 1], ["w", "ee", "d", "", 1], ["sl", "ee", "p", "😴", 1], ["sh", "ee", "t", "", 1], ["str", "ee", "t", "", 1], ["gr", "ee", "n", "🟩", 1], ["qu", "ee", "n", "👑", 1], ["wh", "ee", "l", "🛞", 1], ["b", "ee", "f", "", 1], ["t", "ee", "th", "🦷", 1], ["w", "ee", "k", "", 1], ["thr", "ee", "", "", 1], ["ch", "ee", "k", "", 1], ["sw", "ee", "t", "🍬", 1], ["k", "ee", "p", "", 1], ["n", "ee", "d", "", 1],
  ["r", "oa", "d", "🛣️", 1], ["t", "oa", "d", "", 1], ["l", "oa", "f", "", 1], ["f", "oa", "m", "", 1], ["c", "oa", "ch", "", 1], ["t", "oa", "st", "🍞", 1], ["fl", "oa", "t", "", 1], ["", "oa", "k", "", 1], ["", "oa", "ts", "", 1], ["g", "oa", "l", "🥅", 1], ["thr", "oa", "t", "", 1], ["c", "oa", "l", "", 1], ["l", "oa", "d", "", 1], ["rainc", "oa", "t", "", 0], ["sailb", "oa", "t", "", 0],
  ["h", "igh", "", "", 1], ["br", "igh", "t", "", 1], ["fl", "igh", "t", "✈️", 1], ["r", "igh", "t", "", 1], ["s", "igh", "t", "", 1], ["t", "igh", "t", "", 1], ["th", "igh", "", "", 1], ["midn", "igh", "t", "🕛", 1], ["flashl", "igh", "t", "🔦", 1], ["h", "igh", "way", "", 0], ["sunl", "igh", "t", "🌞", 1], ["moonl", "igh", "t", "🌙", 1], ["ton", "igh", "t", "", 1],
  ["d", "ay", "", "", 1], ["s", "ay", "", "", 1], ["w", "ay", "", "", 1], ["p", "ay", "", "", 1], ["tr", "ay", "", "", 1], ["st", "ay", "", "", 1], ["cl", "ay", "", "", 1], ["gr", "ay", "", "", 1], ["spr", "ay", "", "", 1], ["cr", "ay", "on", "🖍️", 1], ["birthd", "ay", "", "🎂", 0], ["tod", "ay", "", "", 1], ["aw", "ay", "", "", 1], ["pl", "ay", "ground", "🛝", 0], ["hoor", "ay", "", "🎉", 1],
];
const EN7_VSND = { ai: "A", ay: "A", ee: "E", oa: "O", igh: "I" }, EN7_VREF = { A: "rain", E: "bee", O: "boat", I: "night" }, EN7_VNAME = { A: "long a", E: "long e", O: "long o", I: "long i" };
addBank(7, "english", "vteams", 0.8, function () {
  const [pre, t, suf, e, single] = pick(EN7_VT), w = pre + t + suf;
  const vo = EN7_teamOpts(pre, t, suf, ["ai", "ee", "oa", "igh", "ay"]);
  if (vo.length >= 3 && (!single || Math.random() < 0.5)) return { q: `Which vowel team ${EN7_pos(pre, suf)} the word?`, say: `Which vowel team ${EN7_pos(pre, suf)} the word ${w}?`, vis: EN7_vis(e, EN7_blank(pre, 2, suf)), opts: vo, ans: t, big: 1, why: `${cap(w)} is spelled with ${t}.`, key: "n" + w };
  const S = EN7_VSND[t], ref = EN7_VREF[S];
  const others = shuffle(EN7_VT.filter(x => x[4] && EN7_VSND[x[1]] !== S).map(x => x[0] + x[1] + x[2])).slice(0, 3);
  return { q: `Which word has the same vowel sound as <b>${ref}</b>?`, say: `Which word has the same vowel sound as ${ref}?`, opts: shuffle([w, ...others]), ans: w, big: 1, why: `${cap(w)} and ${ref} both have the ${EN7_VNAME[S]} sound.`, key: "s" + w };
});

/* ---------------- Digraphs ---------------- */
const EN7_DG = [
  ["", "sh", "op", ""], ["", "sh", "ed", ""], ["", "sh", "ark", "🦈"], ["", "sh", "irt", "👕"], ["bru", "sh", "", "🖌️"], ["di", "sh", "", "🍽️"], ["wa", "sh", "", ""], ["tra", "sh", "", "🗑️"], ["cra", "sh", "", ""], ["fla", "sh", "", ""], ["", "sh", "adow", ""], ["", "sh", "elf", ""], ["", "sh", "ine", ""], ["", "sh", "ut", ""], ["", "sh", "ake", ""], ["spla", "sh", "", "💦"], ["", "sh", "ovel", ""], ["", "sh", "ower", "🚿"], ["mu", "sh", "room", "🍄"],
  ["", "ch", "in", ""], ["", "ch", "ip", ""], ["", "ch", "op", ""], ["", "ch", "ess", "♟️"], ["", "ch", "eek", ""], ["", "ch", "alk", ""], ["lun", "ch", "", ""], ["ben", "ch", "", ""], ["bea", "ch", "", "🏖️"], ["cou", "ch", "", "🛋️"], ["", "ch", "ild", ""], ["", "ch", "ew", ""], ["", "ch", "ain", "⛓️"], ["", "ch", "eer", ""], ["", "ch", "icken", "🐔"], ["", "ch", "ocolate", "🍫"], ["", "ch", "eetah", "🐆"], ["sandwi", "ch", "", "🥪"], ["bran", "ch", "", ""],
  ["", "th", "in", ""], ["", "th", "ick", ""], ["", "th", "ink", ""], ["", "th", "ank", ""], ["", "th", "orn", "🌹"], ["", "th", "row", ""], ["mo", "th", "", ""], ["ma", "th", "", ""], ["pa", "th", "", ""], ["mou", "th", "", "👄"], ["bo", "th", "", ""], ["clo", "th", "", ""], ["ear", "th", "", "🌍"], ["", "th", "ird", "🥉"], ["", "th", "under", ""], ["tee", "th", "", "🦷"], ["", "th", "ermometer", "🌡️"], ["", "th", "irteen", ""],
  ["", "wh", "eel", "🛞"], ["", "wh", "en", ""], ["", "wh", "ere", ""], ["", "wh", "at", ""], ["", "wh", "ich", ""], ["", "wh", "y", ""], ["", "wh", "ip", ""], ["", "wh", "isk", ""], ["", "wh", "isper", ""], ["", "wh", "iskers", ""], ["", "wh", "ile", ""],
];
const EN7_DREF = { sh: "ship", ch: "cheese", th: "thumb", wh: "whale" };
addBank(7, "english", "digraphs", 0.8, function () {
  const [pre, t, suf, e] = pick(EN7_DG), w = pre + t + suf;
  if (Math.random() < 0.5) {
    const opts = EN7_teamOpts(pre, t, suf, ["sh", "ch", "th", "wh"]);
    if (opts.length >= 3) return { q: `Which letter team ${EN7_pos(pre, suf)} the word?`, say: `Which letter team ${EN7_pos(pre, suf)} the word ${w}?`, vis: EN7_vis(e, EN7_blank(pre, 2, suf)), opts, ans: t, big: 1, why: `${cap(w)} is spelled ${pre}${t.toUpperCase()}${suf}.`, key: "n" + w };
  }
  const others = shuffle(EN7_DG.map(x => x[0] + x[1] + x[2]).filter(x => !x.includes(t) && !(t === "wh" && x.includes("w")))).slice(0, 3);
  const ref = EN7_DREF[t];
  return { q: `Which word has the <b>${t}</b> sound, like in <b>${ref}</b>?`, say: `Which word has the ${t} sound, like in ${ref}?`, opts: shuffle([w, ...others]), ans: w, big: 1, why: `${cap(w)} has ${t} in it, just like ${ref}.`, key: "s" + w };
});

/* ---------------- Magic E ---------------- */
const EN7_MAGIC = [["mad", "made"], ["rat", "rate"], ["mat", "mate"], ["plan", "plane"], ["slid", "slide"], ["rip", "ripe"], ["dim", "dime"], ["fin", "fine"], ["shin", "shine"], ["spin", "spine"], ["hid", "hide"], ["cod", "code"], ["slop", "slope"], ["glob", "globe"], ["cut", "cute"], ["us", "use"], ["hug", "huge"], ["pal", "pale"], ["at", "ate"], ["scrap", "scrape"], ["strip", "stripe"], ["quit", "quite"], ["rod", "rode"], ["sit", "site"], ["wag", "wage"], ["rag", "rage"], ["twin", "twine"]];
addBank(7, "english", "magice", 0.78, function () {
  const k = Math.random();
  if (k < 0.33) {
    const [s, l] = pick(EN7_MAGIC), other = pick(EN7_MAGIC.filter(m => m[0] !== s))[1];
    return { q: `Add a magic E to <b>${s}</b>. What word do you get?`, say: `Add a magic E to ${s}. What word do you get?`, vis: hw(`${s} + <b class="hl">e</b>`), opts: uniq(l, [s, s + s.slice(-1), other]), ans: l, big: 1, why: `${s} + e = ${l}. The vowel now says its name.`, key: "a" + s };
  }
  if (k < 0.6) {
    const [s, l] = pick(EN7_MAGIC), shorts = shuffle(EN7_MAGIC.filter(m => m[0] !== s)).slice(0, 3).map(m => m[0]);
    return { q: "Which word has a <b>long</b> vowel sound?", say: "Which word has a long vowel sound?", opts: shuffle([l, ...shorts]), ans: l, big: 1, why: `${cap(l)} ends with a magic E, so the vowel is long.`, key: "b" + l };
  }
  const all = [...EN7_MAGIC, ...MAGIC], [s, l] = pick(all), other = pick(all.filter(m => m[0] !== s))[0];
  return { q: `Take the magic E off <b>${l}</b>. What word is left?`, say: `Take the magic E off ${l}. What word is left?`, vis: hw(`${l.slice(0, -1)}<span class="silent-l">e</span>`), opts: uniq(s, [l, other, s + s.slice(-1)]), ans: s, big: 1, why: `Without the e, ${l} becomes ${s} and the vowel is short again.`, key: "c" + l };
});

/* ---------------- Opposites ---------------- */
/* [word, opposite, emoji, emoji, group]: options never mix words from the same group */
const EN7_OPP = [["push", "pull", "", "", "a"], ["give", "take", "🎁", "", "b"], ["buy", "sell", "", "", "b"], ["throw", "catch", "", "", "b"], ["win", "lose", "🏆", "", "c"], ["lost", "found", "", "", "c"], ["yes", "no", "✅", "❌", "d"], ["true", "false", "", "", "d"], ["left", "right", "⬅️", "➡️", "d"], ["on", "off", "", "", "g"], ["top", "bottom", "", "", "g"], ["high", "low", "", "", "g"], ["over", "under", "", "", "g"], ["deep", "shallow", "", "", "g"], ["early", "late", "", "", "h"], ["first", "last", "🥇", "", "h"], ["before", "after", "", "", "h"], ["near", "far", "", "", "i"], ["laugh", "cry", "😂", "😢", "j"], ["sweet", "sour", "🍬", "🍋", "k"], ["clean", "dirty", "🧼", "", "l"], ["thick", "thin", "", "", "m"], ["wide", "narrow", "", "", "m"], ["heavy", "light", "🏋️", "🪶", "t"], ["few", "many", "", "", "o"], ["more", "less", "", "", "o"], ["plus", "minus", "➕", "➖", "o"], ["front", "back", "", "", "p"], ["enter", "exit", "", "", "p"], ["hello", "goodbye", "👋", "", "p"], ["sit", "stand", "🪑", "", "q"], ["always", "never", "", "", "r"], ["summer", "winter", "🏖️", "⛄", "s"], ["sunrise", "sunset", "🌅", "🌇", "s"], ["east", "west", "", "", "s"], ["north", "south", "", "", "s"], ["black", "white", "⬛", "⬜", "t"], ["strong", "weak", "💪", "", "u"], ["good", "bad", "👍", "👎", "v"], ["polite", "rude", "", "", "v"], ["question", "answer", "❓", "", "w"], ["asleep", "awake", "😴", "", "x"], ["remember", "forget", "", "", "y"], ["same", "different", "", "", "z"], ["wild", "tame", "", "", "A"], ["safe", "dangerous", "", "", "A"], ["float", "sink", "", "", "B"], ["sharp", "dull", "", "", "C"], ["child", "adult", "🧒", "🧑", "D"], ["stop", "go", "🛑", "🟢", "E"]];
addBank(7, "english", "opposites", 0.78, function () {
  const i = R(0, EN7_OPP.length - 1), [a, b, e1, e2, g] = EN7_OPP[i], flip = Math.random() < 0.5;
  const w = flip ? b : a, ans = flip ? a : b, e = flip ? e2 : e1;
  const others = shuffle(EN7_OPP.filter(o => o[4] !== g)).slice(0, 3).map(o => pick([o[0], o[1]]));
  return { q: `What is the opposite of <b>${w}</b>?`, say: `What is the opposite of ${w}?`, vis: EN7_vis(e, w), opts: shuffle([ans, ...others]), ans, big: 1, why: `${cap(w)} and ${ans} are opposites.`, key: "o" + w };
});

/* ---------------- Ending marks ---------------- */
const EN7_PUNC = {
  "?": ["Where did you put the glue", "What time is lunch", "Can you help me tie my shoe", "Do you have a pet", "Who is your teacher", "When does the bus come", "Is it going to rain today", "Why did the puppy bark", "How many cookies are left", "Are you ready for school", "What is your favorite color", "Will you play tag with me", "Where do penguins live", "Did you finish your snack", "Which book do you like best", "Can I sit next to you", "Is the soup too hot", "How do you spell cat", "What did you eat for breakfast", "Who wants to read first", "Do bears sleep all winter", "Where is the library", "Have you seen my blue pencil", "When is your birthday", "Why is the baby crying", "How far is the beach", "Are those your boots", "May I have some water", "What makes thunder so loud", "Does your cat like to play"],
  ".": ["I have two brothers", "The cat is on the mat", "We go to school on Monday", "My shoes are blue", "Grandma made a warm pie", "The bus is yellow", "Ducks swim in the pond", "I brush my teeth every night", "Leo has a red kite", "The moon is round tonight", "We planted seeds in the garden", "My friend lives next door", "The store closes at six", "Frogs can jump far", "I put my books in my backpack", "Mia drew a picture of a horse", "The leaves turn orange in fall", "Our class has a fish tank", "Dad reads me a story at bedtime", "It is cold outside today", "Cows give us milk", "The baby has five teeth", "I like to ride my bike", "My lunch box is green", "Bees make honey", "Omar walks his dog after school", "The flowers need water", "We sang a song in music class", "Zoe has a new puppy", "The clock is on the wall"],
  "!": ["Wow, look at that rainbow", "Hooray, school is out", "Oh no, I spilled my milk", "Yay, we are going to the zoo", "Ouch, I bumped my knee", "Hurry, the bus is here", "Wow, you did it", "Yikes, a big spider", "Oh no, the ice cream is melting", "Yay, I lost my first tooth", "Wow, this cake is huge", "Hooray, we found the lost kitten", "Help, my kite is stuck in the tree", "Oh wow, it is snowing", "Yay, my team scored a goal", "Look out, the floor is wet", "Wow, that frog jumped so high", "Hooray, Grandma is here", "Ouch, that bee stung me", "Oh no, my balloon popped", "Wow, I can see the ocean", "Yippee, it is my birthday", "Watch out, the ball is coming", "Hooray, we get a new puppy", "Oh no, the milk is spilling", "Wow, what a big pumpkin", "Help, the dog took my sock", "Yay, we won the game", "Ouch, my toe hurts", "Hurry, the show is starting"],
};
const EN7_PUNCL = Object.entries(EN7_PUNC).flatMap(([p, l]) => l.map(s => [s, p]));
addBank(7, "english", "punct", 0.77, function () {
  const [s, p] = pick(EN7_PUNCL);
  return { q: `Which mark ends this sentence?<div class="sentence">${s}<span class="blank">_</span></div>`, say: `Which mark ends this sentence? ${s}`, opts: [".", "?", "!"].map(pOpt), ans: pOpt(p), sayAns: PNAME[p], why: p === "?" ? "It asks something, so it needs a question mark." : p === "!" ? "It shows a strong feeling, so it needs an exclamation mark." : "It tells something, so it needs a period.", key: "e" + s };
});

/* ---------------- Blends ---------------- */
const EN7_BL = [["bl", "ue", "🔵"], ["bl", "ack", "⬛"], ["bl", "ouse", "👚"], ["bl", "ueberry", "🫐"], ["br", "ush", "🖌️"], ["br", "oom", "🧹"], ["br", "idge", "🌉"], ["br", "ick", "🧱"], ["br", "occoli", "🥦"], ["br", "ain", "🧠"], ["cl", "oud", "☁️"], ["cl", "own", "🤡"], ["cl", "ap", "👏"], ["cr", "own", "👑"], ["cr", "ayon", "🖍️"], ["cr", "ocodile", "🐊"], ["cr", "icket", "🦗"], ["cr", "y", "😢"], ["dr", "ess", "👗"], ["dr", "agon", "🐉"], ["dr", "op", "💧"], ["fl", "ower", "🌸"], ["fl", "y", "🪰"], ["fl", "ame", "🔥"], ["fl", "amingo", "🦩"], ["fr", "ies", "🍟"], ["fr", "own", "☹️"], ["gl", "ove", "🧤"], ["gl", "asses", "👓"], ["gl", "ass", "🥛"], ["gr", "ass", "🌱"], ["gr", "een", "🟩"], ["gr", "andma", "👵"], ["pl", "ate", "🍽️"], ["pl", "ant", "🪴"], ["pl", "ug", "🔌"], ["pl", "anet", "🪐"], ["pr", "esent", "🎁"], ["pr", "ince", "🤴"], ["pr", "incess", "👸"], ["pr", "etzel", "🥨"], ["sk", "unk", "🦨"], ["sk", "ate", "⛸️"], ["sk", "i", "🎿"], ["sk", "ateboard", "🛹"], ["sl", "ide", "🛝"], ["sl", "oth", "🦥"], ["sl", "ipper", "🥿"], ["sm", "ile", "😊"], ["sm", "oke", "💨"], ["sn", "ow", "❄️"], ["sn", "owman", "⛄"], ["sn", "eeze", "🤧"], ["sp", "ider", "🕷️"], ["sp", "onge", "🧽"], ["sp", "aghetti", "🍝"], ["st", "op", "🛑"], ["st", "eak", "🥩"], ["sw", "im", "🏊"], ["tr", "uck", "🚚"], ["tr", "umpet", "🎺"], ["tr", "ophy", "🏆"], ["tr", "actor", "🚜"], ["tr", "iangle", "🔺"], ["sc", "arf", "🧣"], ["sc", "ooter", "🛴"]];
const EN7_BLPOOL = [...new Set(EN7_BL.map(x => x[0]))];
const EN7_BLX = { bl: ["blink", "blanket", "blow"], br: ["brown", "brave"], cl: ["clean", "class", "climb"], cr: ["crab", "crib", "cracker"], dr: ["drink", "drive", "dream"], fl: ["flag", "flat", "flip"], fr: ["frog", "friend", "fruit", "free"], gl: ["glad", "globe", "glue"], gr: ["grapes", "grin", "grow"], pl: ["plane", "play", "please"], pr: ["prize", "press"], sk: ["sky", "skip"], sl: ["sled", "sleep", "slow"], sm: ["small", "smell"], sn: ["snake", "snail", "snack"], sp: ["spoon", "spin", "spot"], st: ["star", "stamp", "stone", "stool"], sw: ["swan", "sweet", "swing"], tr: ["tree", "train", "trip"], sc: ["scale", "scoop"] };
const EN7_SAMEB = (a, b) => a === b || (a + b === "sksc") || (a + b === "scsk");
const EN7_BLW = EN7_BL.map(x => [x[0], x[0] + x[1]]).concat(Object.entries(EN7_BLX).flatMap(([b, l]) => l.map(w => [b, w])));
addBank(7, "english", "blends", 0.8, function () {
  if (Math.random() < 0.5) {
    const [b, rest, e] = pick(EN7_BL), w = b + rest;
    return { q: "Which blend starts the word?", say: `Which blend starts the word ${w}?`, vis: col(bigEmo(e), hw(`<span class="blank">__</span>${rest}`)), opts: EN7_teamOpts("", b, rest, EN7_BLPOOL.filter(x => x === b || !EN7_SAMEB(x, b))), ans: b, big: 1, why: `${cap(w)} starts with ${b}: ${b}-${rest}.`, key: "n" + w };
  }
  const [b, w] = pick(EN7_BLW), ref = EN7_BLW.find(x => x[0] === b && x[1] !== w)[1];
  const others = shuffle(EN7_BLW.filter(x => !EN7_SAMEB(x[0], b))).slice(0, 3).map(x => x[1]);
  return { q: `Which word starts with the same blend as <b>${ref}</b>?`, say: `Which word starts with the same blend as ${ref}?`, opts: shuffle([w, ...others]), ans: w, big: 1, why: `${cap(w)} and ${ref} both start with ${b}.`, key: "s" + w + ref };
});

/* ---------------- Syllables ---------------- */
const EN7_SYL = [["fish", "fish", "🐟"], ["duck", "duck", "🦆"], ["hat", "hat", "🎩"], ["bed", "bed", "🛏️"], ["ball", "ball", "⚽"], ["tree", "tree", "🌳"], ["book", "book", "📘"], ["bird", "bird", "🐦"], ["cake", "cake", "🎂"], ["house", "house", "🏠"], ["horse", "horse", "🐴"], ["star", "star", "⭐"], ["moon", "moon", "🌙"], ["boat", "boat", "⛵"], ["shoe", "shoe", "👟"], ["sock", "sock", "🧦"], ["milk", "milk", "🥛"], ["bread", "bread", "🍞"], ["drum", "drum", "🥁"], ["cloud", "cloud", "☁️"], ["snake", "snake", "🐍"], ["train", "train", "🚂"], ["sheep", "sheep", "🐑"], ["cheese", "cheese", "🧀"], ["clock", "clock", "🕰️"], ["kite", "kite", "🪁"], ["mouse", "mouse", "🐭"],
  ["table", "ta-ble", ""], ["window", "win-dow", "🪟"], ["kitten", "kit-ten", "🐱"], ["puppy", "pup-py", "🐶"], ["garden", "gar-den", "🏡"], ["pumpkin", "pump-kin", "🎃"], ["carrot", "car-rot", "🥕"], ["button", "but-ton", ""], ["basket", "bas-ket", "🧺"], ["rainbow", "rain-bow", "🌈"], ["cupcake", "cup-cake", "🧁"], ["turtle", "tur-tle", "🐢"], ["pillow", "pil-low", ""], ["lemon", "lem-on", "🍋"], ["zebra", "ze-bra", "🦓"], ["panda", "pan-da", "🐼"], ["robot", "ro-bot", "🤖"], ["rocket", "rock-et", "🚀"], ["candle", "can-dle", "🕯️"], ["cookie", "cook-ie", "🍪"], ["muffin", "muf-fin", ""], ["pretzel", "pret-zel", "🥨"], ["hammer", "ham-mer", "🔨"], ["doctor", "doc-tor", ""], ["sister", "sis-ter", ""], ["chicken", "chick-en", "🐔"], ["jacket", "jack-et", "🧥"], ["mitten", "mit-ten", "🧤"], ["popcorn", "pop-corn", "🍿"], ["bucket", "buck-et", "🪣"], ["wagon", "wag-on", ""], ["dragon", "drag-on", "🐉"], ["spider", "spi-der", "🕷️"], ["yellow", "yel-low", "💛"], ["purple", "pur-ple", "💜"], ["igloo", "ig-loo", ""], ["lion", "li-on", "🦁"],
  ["kangaroo", "kan-ga-roo", "🦘"], ["tomato", "to-ma-to", "🍅"], ["potato", "po-ta-to", "🥔"], ["umbrella", "um-brel-la", "☂️"], ["bicycle", "bi-cy-cle", "🚲"], ["telephone", "tel-e-phone", "☎️"], ["hamburger", "ham-bur-ger", "🍔"], ["gorilla", "go-ril-la", "🦍"], ["octopus", "oc-to-pus", "🐙"], ["piano", "pi-an-o", "🎹"], ["violin", "vi-o-lin", "🎻"], ["crocodile", "croc-o-dile", "🐊"], ["buffalo", "buf-fa-lo", "🦬"], ["lollipop", "lol-li-pop", "🍭"], ["pajamas", "pa-ja-mas", ""], ["cucumber", "cu-cum-ber", "🥒"], ["tornado", "tor-na-do", "🌪️"], ["volcano", "vol-ca-no", "🌋"], ["animal", "an-i-mal", ""], ["tricycle", "tri-cy-cle", ""], ["yesterday", "yes-ter-day", ""], ["Saturday", "Sat-ur-day", ""], ["November", "No-vem-ber", ""], ["hospital", "hos-pi-tal", "🏥"], ["astronaut", "as-tro-naut", "🧑‍🚀"], ["ladybug", "la-dy-bug", "🐞"], ["bumblebee", "bum-ble-bee", "🐝"], ["cinnamon", "cin-na-mon", ""],
  ["alligator", "al-li-ga-tor", ""], ["macaroni", "mac-a-ro-ni", ""], ["avocado", "av-o-ca-do", "🥑"], ["calculator", "cal-cu-la-tor", "🧮"], ["thermometer", "ther-mom-e-ter", "🌡️"], ["harmonica", "har-mon-i-ca", ""], ["salamander", "sal-a-man-der", ""], ["escalator", "es-ca-la-tor", ""], ["motorcycle", "mo-tor-cy-cle", "🏍️"], ["kindergarten", "kin-der-gar-ten", ""], ["television", "tel-e-vi-sion", "📺"], ["elevator", "el-e-va-tor", "🛗"], ["pepperoni", "pep-per-o-ni", "🍕"], ["armadillo", "ar-ma-dil-lo", ""], ["supermarket", "su-per-mar-ket", "🛒"], ["January", "Jan-u-ar-y", "📅"], ["invisible", "in-vis-i-ble", ""]];
const EN7_nsyl = sp => sp.split("-").length;
addBank(7, "english", "syllables", 0.8, function () {
  const [w, sp, e] = pick(EN7_SYL), n = EN7_nsyl(sp);
  if (Math.random() < 0.5) return { q: `How many syllables (claps) are in <b>${w}</b>?`, say: `How many syllables are in ${w}? Clap it out!`, vis: col(e ? bigEmo(e) : "", hw(w), `<button class="btn btn-sm btn-sun" data-say="${sp.split("-").join(", ")}">👏 Hear the claps</button>`), opts: ["1", "2", "3", "4"], ans: String(n), big: 1, why: `${sp}: ${n} ${n === 1 ? "clap" : "claps"}.`, key: "n" + w };
  const others = shuffle([1, 2, 3, 4].filter(x => x !== n)).map(c => pick(EN7_SYL.filter(x => EN7_nsyl(x[1]) === c))[0]);
  return { q: `Which word has <b>${n}</b> ${n === 1 ? "syllable" : "syllables"} (${n === 1 ? "clap" : "claps"})?`, say: `Which word has ${n} ${n === 1 ? "syllable" : "syllables"}? Clap them out!`, opts: shuffle([w, ...others]), ans: w, big: 1, why: `${sp}: ${n} ${n === 1 ? "clap" : "claps"}.`, key: "w" + w };
});

/* ---------------- Sentence or not? (the topic reads these arrays every time) ---------------- */
SENT_OK.push("The cat sat on the mat.", "Leo kicked the ball.", "My mom drives a blue car.", "The bees buzzed around the flowers.", "We built a sandcastle.", "Grandpa grows tomatoes.", "The bus stopped at the corner.", "Mia painted a rainbow.", "The puppy chewed my sock.", "I can tie my shoes.", "The rain fell all night.", "Our teacher read us a story.", "The kitten chased a string.", "Ravi plays the piano.", "The leaves are falling.", "My brother likes trucks.", "The ducks swam across the pond.", "We sang a happy song.", "The moon is bright tonight.", "Zoe found a shiny rock.", "The farmer feeds the pigs.", "A snail moves slowly.", "I drank a glass of milk.", "The children played tag.", "Noah rode his scooter.", "The baby giggled.", "Lily wrote a letter to her aunt.", "The wind blew my hat away.", "We planted a tree.", "The owl hoots at night.", "My dad made pancakes.", "The fish swim in the tank.", "Emma hugged her puppy.", "The train is very long.", "Kai jumped into the pool.");
SENT_NO.push("The little red wagon.", "Ran down the hill.", "On top of the box.", "My grandma and grandpa.", "Ate all the cookies.", "Next to the door.", "A big yellow bus.", "Before lunch.", "Because I was tired.", "The fluffy white cat.", "Splashing in the puddles.", "With a big smile.", "Played outside all day.", "Behind the couch.", "Three tiny ducks.", "When the bell rang.", "The shiny new bike.", "Laughing at the clown.", "Over the rainbow.", "My friend Omar.", "Climbed up the tree.", "At the beach.", "If it rains.", "The tall glass of milk.", "Sang a funny song.", "Up the stairs.", "Two happy puppies.", "Barking at the cat.", "After dinner.", "Under my bed.");

/* ---------------- Nouns & verbs ---------------- */
const EN7_NOUNS = ["lion", "tiger", "chair", "window", "kitchen", "baby", "banana", "ocean", "mountain", "river", "city", "zoo", "beach", "library", "sister", "brother", "grandma", "farmer", "rabbit", "pizza", "moon", "desk", "island", "castle", "robot", "kitten", "puppy", "crayon", "carrot", "lake", "sandwich", "giraffe", "pillow", "cookie", "boy", "door", "hat"];
const EN7_VERBS = ["hop", "skip", "giggle", "shout", "catch", "wiggle", "munch", "crawl", "sneeze", "yawn", "whisper", "chew", "build", "sew", "dig", "bake", "bounce", "stir", "pour", "wash", "sweep", "gallop", "buy", "bring", "carry", "fix", "chase", "grab", "tickle", "scribble", "tiptoe", "stomp", "nibble", "gobble", "hum", "sit", "think", "listen", "explore", "mix"];
/* verbs that are hardly ever used as nouns (safe wrong answers for "which is a noun?") */
const EN7_PUREV = ["build", "sew", "dig", "bake", "stir", "pour", "bring", "carry", "grab", "scribble", "nibble", "gobble", "sit", "think", "listen", "explore", "wiggle", "crawl", "chew", "munch", "tiptoe"];
const EN7_ADJS = ["happy", "big", "red", "soft", "tall", "funny", "cold", "slow", "green", "tiny", "shiny", "loud", "sleepy", "sticky", "fluffy"];
const EN7_NVS = [["The puppy barks loudly.", "puppy", "barks"], ["A tiny kitten naps.", "kitten", "naps"], ["The happy baby giggles.", "baby", "giggles"], ["Grandma sings softly.", "Grandma", "sings"], ["The little frog hops.", "frog", "hops"], ["My sister laughs.", "sister", "laughs"], ["The silly clown juggles.", "clown", "juggles"], ["A big lion roars.", "lion", "roars"], ["The sleepy owl hoots.", "owl", "hoots"], ["The busy bee buzzes.", "bee", "buzzes"], ["The red ball bounces.", "ball", "bounces"], ["Our teacher smiles.", "teacher", "smiles"], ["The fluffy rabbit hops quickly.", "rabbit", "hops"], ["A cold wind blows.", "wind", "blows"], ["The tired boy yawns.", "boy", "yawns"], ["The noisy duck quacks.", "duck", "quacks"], ["The shiny robot beeps.", "robot", "beeps"], ["A small mouse squeaks.", "mouse", "squeaks"], ["The yellow bus stops.", "bus", "stops"], ["My brother snores.", "brother", "snores"], ["The old clock ticks.", "clock", "ticks"], ["A gray whale swims.", "whale", "swims"], ["The bright sun shines.", "sun", "shines"], ["The playful kitten pounces.", "kitten", "pounces"], ["The fast horse gallops.", "horse", "gallops"], ["The quiet girl reads.", "girl", "reads"], ["The proud chef cooks.", "chef", "cooks"], ["A cute pig oinks.", "pig", "oinks"], ["The hungry bear growls.", "bear", "growls"]];
addBank(7, "english", "nounverb", 0.78, function () {
  const k = R(0, 3);
  if (k === 0) { const a = pick(EN7_NOUNS); return { q: "Which word is a <b>noun</b> (a person, place or thing)?", say: "Which word is a noun? A person, place or thing.", opts: shuffle([a, ...shuffle(EN7_PUREV).slice(0, 2), pick(EN7_ADJS)]), ans: a, big: 1, why: `${cap(a)} names a person, place or thing.`, key: "n7" + a }; }
  if (k === 1) { const a = pick(EN7_VERBS); return { q: "Which word is a <b>verb</b> (an action)?", say: "Which word is a verb? An action word.", opts: shuffle([a, ...shuffle(EN7_NOUNS).slice(0, 2), pick(EN7_ADJS)]), ans: a, big: 1, why: `${cap(a)} is something you can do.`, key: "v7" + a }; }
  const [s, n, v] = pick(EN7_NVS);
  if (k === 2) return { q: `Which word is the <b>verb</b>?<div class="sentence">${s}</div>`, say: `Which word is the verb? ${s}`, opts: sentOpts(s, v, ["table", "red", "happy"]), ans: v, big: 1, why: `${cap(v)} is the action in the sentence.`, key: "sv" + s };
  return { q: `Which word is the <b>noun</b>?<div class="sentence">${s}</div>`, say: `Which word is the noun? ${s}`, opts: sentOpts(s, n, ["quickly", "jumped", "happy"]), ans: n, big: 1, why: `${cap(n)} names who or what the sentence is about.`, key: "sn" + s };
});

