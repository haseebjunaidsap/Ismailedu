/* =====================================================================
   CURRICULUM
   ===================================================================== */
const C = { 6: { english: [], math: [] }, 7: { english: [], math: [] }, 8: { english: [], math: [] }, 9: { english: [], math: [] } };
function topic(age, subj, o) { o.age = age; o.subj = subj; C[age][subj].push(o); }

/* ====================== AGE 6 · ENGLISH ====================== */
const LETTERS = [["a", "apple", "🍎"], ["b", "ball", "⚽"], ["c", "cat", "🐱"], ["d", "dog", "🐶"], ["e", "egg", "🥚"], ["f", "fish", "🐟"], ["g", "goat", "🐐"], ["h", "hat", "🎩"], ["j", "jeans", "👖"], ["k", "key", "🔑"], ["l", "lion", "🦁"], ["m", "moon", "🌙"], ["n", "nose", "👃"], ["o", "octopus", "🐙"], ["p", "pig", "🐷"], ["q", "queen", "👸"], ["r", "rabbit", "🐰"], ["s", "sun", "☀️"], ["t", "tree", "🌳"], ["u", "umbrella", "☂️"], ["v", "van", "🚐"], ["w", "whale", "🐳"], ["y", "yarn", "🧶"], ["z", "zebra", "🦓"]];
const L = x => LETTERS.find(l => l[0] === x);
/* made-up wrong options must never spell a rude or unkind word */
const CVC_BLOCK = /^(sex|sux|fux|fuk|fak|fuc|hag|fag|tit|cum|dik|dic|kok|ass|nig|jap|wop|pis|gyp)$/;

topic(6, "english", {
  id: "sounds", title: "Letter Sounds", icon: "🔤", blurb: "Hear the first sound in a word.",
  lesson: [
    { t: "Letters make sounds", say: "Every letter makes a sound. The letter B says buh, like in ball. Tap the ball to hear it.", html: row(hw("Bb", "big"), picCard("⚽", hlFirst("ball"), "B says buh. Ball.")) },
    { t: "Listen for the first sound", say: "Say sun slowly. Sss, uh, nnn. The first sound is sss. So sun starts with the letter S.", html: row(bigEmo("☀️"), `<div class="sound-boxes"><span class="sb on">s</span><span class="sb">u</span><span class="sb">n</span></div>`) + note("The <b>first</b> box is the first sound.") },
    { t: "Tap and listen", say: "Tap each picture. Listen for the first sound, then look at the first letter.", html: `<div class="card-grid">${["b", "m", "s", "t", "d", "p", "f", "l"].map(x => { const it = L(x); return picCard(it[2], hlFirst(it[1]), `${x.toUpperCase()}. ${it[1]}`); }).join("")}</div>` },
  ],
  gen() {
    const it = pick(LETTERS);
    const ban = { c: "k", k: "c" }[it[0]];
    if (Math.random() < 0.5) {
      const pool = LETTERS.map(l => l[0]).filter(x => x !== it[0] && x !== ban);
      return { q: "What letter does this word start with?", say: `What letter does ${it[1]} start with?`, vis: col(bigEmo(it[2]), hw(`<span class="blank">?</span>${it[1].slice(1)}`)), opts: shuffle([it[0], ...shuffle(pool).slice(0, 3)]), ans: it[0], big: 1, why: `${cap(it[1])} starts with the ${it[0].toUpperCase()} sound.`, key: "a" + it[0] };
    }
    const others = shuffle(LETTERS.filter(l => l[0] !== it[0] && l[0] !== ban)).slice(0, 3);
    const o = x => `<span class="emo" title="${x[1]}">${x[2]}</span>`;
    return { q: `Which picture starts with <b>${it[0].toUpperCase()}</b>?`, say: `Which picture starts with the letter ${it[0].toUpperCase()}?`, vis: hw(it[0].toUpperCase() + it[0], "big"), opts: shuffle([it, ...others]).map(o), ans: o(it), why: `${cap(it[1])} starts with ${it[0].toUpperCase()}.`, key: "b" + it[0] };
  },
});

const CVC = [["cat", "🐱"], ["hat", "🎩"], ["bag", "👜"], ["van", "🚐"], ["bed", "🛏️"], ["hen", "🐔"], ["web", "🕸️"], ["ten", "🔟"], ["pig", "🐷"], ["six", "6️⃣"], ["pin", "📌"], ["dog", "🐶"], ["fox", "🦊"], ["box", "📦"], ["sun", "☀️"], ["bus", "🚌"], ["cup", "☕"], ["bug", "🐛"]];
topic(6, "english", {
  id: "vowels", title: "Short Vowels", icon: "🐱", blurb: "Sound out words like cat, pig and sun.",
  lesson: [
    { t: "Meet the vowels", say: "A, E, I, O and U are vowels. Each one makes a short sound. Tap them to hear!", html: `<div class="card-grid five">${[["a", "🍎", "apple"], ["e", "🥚", "egg"], ["i", "🐜", "insect"], ["o", "🐙", "octopus"], ["u", "☂️", "umbrella"]].map(([v, e, w]) => picCard(e, `<b class="hl">${v}</b>${w.slice(1)}`, `${v}, as in ${w}`)).join("")}</div>` },
    { t: "Sound it out", say: "Say each sound, then push them together. C, a, t. Cat!", html: row(`<div class="sound-boxes"><span class="sb">c</span><span class="sb on">a</span><span class="sb">t</span></div>`, arrow(), picCard("🐱", "cat", "c, a, t. Cat!")) + note("The vowel sits in the middle.") },
    { t: "Change the vowel", say: "Change the middle vowel and you get a new word. Pat, pet, pit, pot. Tap each one.", html: `<div class="chips">${["pat", "pet", "pit", "pot"].map(w => chip(`p<b class="hl">${w[1]}</b>t`, w, "lg")).join("")}</div>` },
  ],
  gen() {
    const [w, e] = pick(CVC), v = w[1];
    const others = shuffle("aeiou".replace(v, "").split("").filter(x => !CVC_BLOCK.test(w[0] + x + w[2]))).slice(0, 3);
    if (Math.random() < 0.55) return { q: "Which vowel is missing?", say: `Which vowel is missing in ${w}?`, vis: col(bigEmo(e), hw(`${w[0]}<span class="blank">_</span>${w[2]}`)), opts: shuffle([v, ...others]), ans: v, big: 1, why: `${cap(w)} has the short ${v} sound: ${w[0]}-${v}-${w[2]}.`, key: "v" + w };
    return { q: "Which word matches the picture?", vis: bigEmo(e), opts: shuffle([w, ...others.map(x => w[0] + x + w[2])]), ans: w, big: 1, why: `It is a ${w}. Say it slowly: ${w[0]}, ${v}, ${w[2]}.`, key: "w" + w };
  },
});

const RHYMES = [[["cat", "🐱"], ["hat", "🎩"], ["bat", "🦇"], ["rat", "🐀"]], [["dog", "🐶"], ["frog", "🐸"], ["log", ""]], [["cake", "🎂"], ["snake", "🐍"], ["lake", ""], ["rake", ""]], [["bee", "🐝"], ["tree", "🌳"], ["three", "3️⃣"], ["key", "🔑"]], [["star", "⭐"], ["car", "🚗"], ["jar", ""]], [["mouse", "🐭"], ["house", "🏠"]], [["moon", "🌙"], ["spoon", "🥄"], ["balloon", "🎈"]], [["bug", "🐛"], ["mug", "☕"], ["rug", ""]], [["fish", "🐟"], ["dish", "🍽️"]], [["goat", "🐐"], ["boat", "⛵"], ["coat", "🧥"]], [["bear", "🐻"], ["chair", "🪑"], ["pear", "🍐"]], [["king", "🤴"], ["ring", "💍"], ["swing", ""]]];
const wl = ([w, e]) => e ? `<span class="emo">${e}</span> ${w}` : w;
topic(6, "english", {
  id: "rhyme", title: "Rhyming Words", icon: "🎵", blurb: "Find words that sound the same at the end.",
  lesson: [
    { t: "Words that rhyme", say: "Rhyming words sound the same at the end. Cat, hat and bat all end with at.", html: `<div class="card-grid">${[["🐱", "cat"], ["🎩", "hat"], ["🦇", "bat"]].map(([e, w]) => picCard(e, `${w[0]}<b class="hl">at</b>`, w)).join("")}</div>` },
    { t: "Listen for the ending", say: "Moon, spoon, balloon. They all end with oon. They rhyme!", html: `<div class="card-grid">${[["🌙", "moon", "m"], ["🥄", "spoon", "sp"], ["🎈", "balloon", "ball"]].map(([e, w, s]) => picCard(e, `${s}<b class="hl">oon</b>`, w)).join("")}</div>` },
    { t: "Rhyme or not?", say: "Fish and dish rhyme, because they both end with ish. Cat and dog do not rhyme.", html: `<div class="pairs"><div class="pair yes">${chip("🐟 fish", "fish")}${chip("🍽️ dish", "dish")}<span class="tag good">Rhyme ✔</span></div><div class="pair no">${chip("🐱 cat", "cat")}${chip("🐶 dog", "dog")}<span class="tag bad">No rhyme ✘</span></div></div>` },
  ],
  gen() {
    const fi = R(0, RHYMES.length - 1), fam = shuffle(RHYMES[fi]), [t, m] = fam;
    const others = shuffle(RHYMES.filter((_, i) => i !== fi)).slice(0, 3).map(f => pick(f));
    return { q: `Which word rhymes with <b>${t[0]}</b>?`, say: `Which word rhymes with ${t[0]}?`, vis: t[1] ? col(bigEmo(t[1]), hw(t[0])) : hw(t[0], "big"), opts: shuffle([m, ...others]).map(wl), ans: wl(m), why: `${cap(t[0])} and ${m[0]} both end with the same sound.`, key: t[0] + m[0] };
  },
});

const SIGHT = ["the", "and", "is", "see", "can", "you", "we", "it", "go", "look", "my", "play", "said", "to", "big", "little", "like", "here", "come", "in"];
const SIGHT_S = [["I ___ a big dog.", "see", ["the", "is", "and"], "🐶"], ["The cat ___ on the mat.", "is", ["see", "and", "my"], "🐱"], ["We ___ run fast.", "can", ["the", "is", "my"], "🏃"], ["Look at ___ red ball.", "my", ["is", "can", "see"], "🔴"], ["I ___ to school.", "go", ["the", "my", "and"], "🏫"], ["Mom ___, \"Time for bed!\"", "said", ["the", "is", "to"], "🛏️"], ["I have a cat ___ a dog.", "and", ["is", "can", "go"], "🐱"], ["Can ___ help me?", "you", ["the", "and", "is"], "🙋"], ["I ___ ice cream.", "like", ["the", "and", "to"], "🍦"], ["It is a ___ elephant.", "big", ["and", "to", "see"], "🐘"], ["A mouse is ___.", "little", ["go", "and", "the"], "🐭"], ["Come ___!", "here", ["the", "and", "is"], "👋"], ["I went ___ the park.", "to", ["is", "my", "can"], "🌳"], ["___ is a cat.", "It", ["See", "And", "Go"], "🐱"], ["We go ___ the car.", "in", ["is", "my", "see"], "🚗"], ["Let's ___ a game!", "play", ["the", "is", "and"], "🎲"]];
topic(6, "english", {
  id: "sight", title: "Sight Words", icon: "👀", blurb: "Read the words you see the most.",
  lesson: [
    { t: "Words we just know", say: "Sight words are words we see all the time. We learn them by heart, so we can read them fast. Tap a word to hear it.", html: `<div class="chips">${SIGHT.slice(0, 10).map(w => chip(w, w, "lg")).join("")}</div>` },
    { t: "Find them in a sentence", say: "Read this sentence. I can see the cat. I, can, see and the are all sight words!", html: col(bigEmo("🐱"), `<div class="sentence">${["I", "can", "see", "the", "cat."].map((w, i) => chip(w, w.replace(".", ""), i < 4 ? "lg hl-chip" : "lg")).join(" ")}</div>`) },
    { t: "Practice", say: "Tap each word, listen, and say it out loud with me.", html: `<div class="chips">${SIGHT.slice(10).map(w => chip(w, w, "lg")).join("")}</div>` },
  ],
  gen() {
    if (window.voiceOn && window.voiceOn() && Math.random() < 0.35) {
      const w = pick(SIGHT);
      return { q: "Listen. Tap the word you hear!", say: `Find the word: ${w}`, vis: `<button class="btn btn-go hear" data-say="${w}">🔊 Hear it again</button>`, opts: shuffle([w, ...shuffle(SIGHT.filter(x => x !== w)).slice(0, 3)]), ans: w, big: 1, why: `The word was "${w}".`, key: "l" + w };
    }
    const [s, a, d, e] = pick(SIGHT_S);
    return { q: `<span class="emo">${e}</span> ${s.replace("___", '<span class="blank">___</span>')}`, say: `Which word fits? ${s}`, opts: shuffle([a, ...d]), ans: a, big: 1, why: s.replace("___", a), key: s };
  },
});

const CONF = { b: "dpq", d: "bpq", p: "qbd", q: "pgd", m: "nwu", n: "mhu", u: "nvw", w: "vmu", g: "qjy", i: "jlt", l: "it", h: "nk", e: "ca", a: "oe", o: "acu", f: "tl", t: "fl", c: "eo", v: "uwy", y: "vgj", j: "igy", k: "hx", r: "nh", s: "zc", x: "kz", z: "sx" };
const ABC = "abcdefghijklmnopqrstuvwxyz".split("");
topic(6, "english", {
  id: "case", title: "Big & Small Letters", icon: "🔡", blurb: "Match capital letters with small letters.",
  lesson: [
    { t: "Two ways to write", say: "Every letter has a big letter and a small letter. Big A and small a are partners.", html: `<div class="chips">${["Aa", "Bb", "Cc", "Dd", "Ee", "Ff", "Gg", "Hh"].map(p => chip(p, `big ${p[0]}, small ${p[1]}`, "xl")).join("")}</div>` },
    { t: "When to use big letters", say: "Use a big letter to start a name, and to start a sentence. Sam has a dog.", html: `<div class="sentence big-sentence"><b class="hl">S</b>am has a dog. <b class="hl">T</b>he dog is <b class="hl">R</b>ex.</div>` },
    { t: "Tricky twins", say: "Small b, d, p and q look alike. Look carefully! b is for ball, d is for dog, p is for pig, q is for queen.", html: `<div class="card-grid">${["b", "d", "p", "q"].map(x => { const it = L(x); return picCard(it[2], `<span class="twin">${x}</span> ${it[1]}`, `${x}. ${it[1]}`); }).join("")}</div>` },
  ],
  gen() {
    const x = pick(ABC);
    let pool = shuffle((CONF[x] || "").split(""));
    while (pool.length < 3) { const r = pick(ABC); if (r !== x && !pool.includes(r)) pool.push(r); }
    pool = pool.slice(0, 3);
    if (Math.random() < 0.5) return { q: `Find the small letter for <b>${x.toUpperCase()}</b>`, say: `Find the small letter for big ${x.toUpperCase()}`, vis: hw(x.toUpperCase(), "big"), opts: shuffle([x, ...pool]), ans: x, big: 1, why: `Big ${x.toUpperCase()} and small ${x} are partners.`, key: "u" + x };
    return { q: `Find the big letter for <b>${x}</b>`, say: `Find the big letter for small ${x}`, vis: hw(x, "big"), opts: shuffle([x, ...pool].map(c => c.toUpperCase())), ans: x.toUpperCase(), big: 1, why: `Small ${x} and big ${x.toUpperCase()} are partners.`, key: "l" + x };
  },
});

/* ====================== AGE 6 · MATH ====================== */
topic(6, "math", {
  id: "count", title: "Counting & What Comes Next", icon: "🔢", blurb: "Count things and know what comes next.",
  lesson: [
    { t: "Count one by one", say: "Touch each thing once and say a number. One, two, three, four, five. There are 5 apples!", html: `<div class="counted">${range(1, 5).map(i => `<span><span class="emo lg">🍎</span><b>${i}</b></span>`).join("")}</div>` },
    { t: "Ten frames", say: "A ten frame has 10 boxes. When every box is full, we have 10!", html: tenframe(10, "⭐") + note("2 rows of 5 = <b>10</b>") },
    { t: "Teen numbers", say: "Thirteen is 10 and 3 more. One full ten frame, plus 3.", html: tenframe(13, "⭐") + eq("10 + 3 = <b>13</b>") },
  ],
  gen() {
    if (Math.random() < 0.7) {
      const n = R(3, 20), t = pick(THINGS);
      return { q: `How many ${t[1]}?`, vis: tenframe(n, t[0]), opts: numU(n, [n + 1, n - 1, n + 2, n - 2, n + 10], 3, 1), ans: String(n), why: n > 10 ? `One full ten frame is 10, plus ${n - 10} more makes ${n}.` : `Count them one by one. There are ${n}.`, key: "c" + n };
    }
    const n = R(1, 19), after = Math.random() < 0.6, a = after ? n + 1 : n - 1;
    return { q: `What number comes ${after ? "after" : "before"} <b>${n}</b>?`, say: `What number comes ${after ? "after" : "before"} ${n}?`, vis: train(after ? [n, "?"] : ["?", n]), opts: numU(a, [a + 1, a - 1, n, a + 2], 3, 0), ans: String(a), big: 1, why: after ? `Count on: ${n}, ${a}.` : `Count back: ${n}, ${a}.`, key: "n" + n + after };
  },
});

topic(6, "math", {
  id: "add10", title: "Adding to 10", icon: "➕", blurb: "Put groups together to find how many.",
  lesson: [
    { t: "Adding means putting together", say: "2 apples and 3 more apples. Put them together and count: 5 apples! We write 2 plus 3 equals 5.", html: `<div class="eqrow">${grp(2, "🍎")}<span class="sym">+</span>${grp(3, "🍎")}<span class="sym">=</span>${grp(5, "🍎")}</div>` + eq("2 + 3 = <b>5</b>") },
    { t: "Count on", say: "Start at the bigger number and count on. Start at 6. Hop, 7. Hop, 8. So 6 plus 2 equals 8.", html: numberLine(0, 10, { hops: { from: 6, n: 2 } }) + eq("6 + 2 = <b>8</b>") },
    { t: "Make 10", say: "7 and 3 make 10. It fills the whole ten frame!", html: tenframe(10, "🔴", "🔵", 7) + eq("7 + 3 = <b>10</b>") },
  ],
  gen() {
    const s = R(2, 10), a = R(1, s - 1), b = s - a, t = pick(THINGS);
    const vis = `<div class="eqrow">${grp(a, t[0])}<span class="sym">+</span>${grp(b, t[0])}</div>`;
    if (Math.random() < 0.35) { const who = pick(KIDS); return { q: `${who} has ${a} ${pl(a, t)}. ${who} gets ${b} more. How many now?`, vis, opts: numU(s, [s + 1, s - 1, s + 2]), ans: String(s), big: 1, why: `${a} + ${b} = ${s}`, key: "w" + a + b }; }
    return { q: `What is ${a} + ${b}?`, vis: vis + eq(`${a} + ${b} = ${blank()}`), opts: numU(s, [s + 1, s - 1, s + 2]), ans: String(s), big: 1, why: `${a} and ${b} more makes ${s}.`, key: a + "+" + b };
  },
});

topic(6, "math", {
  id: "sub10", title: "Taking Away", icon: "➖", blurb: "Take some away and count what is left.",
  lesson: [
    { t: "Taking away", say: "There are 5 birds. 2 fly away. Count the birds that are left: 3! 5 minus 2 equals 3.", html: crossed(5, 2, "🐦") + eq("5 − 2 = <b>3</b>") },
    { t: "Count back", say: "Start at 8 and hop back 3. 7, 6, 5. So 8 minus 3 equals 5.", html: numberLine(0, 10, { hops: { from: 8, n: 3, dir: -1 } }) + eq("8 − 3 = <b>5</b>") },
    { t: "Nothing left", say: "If you take away all of them, nothing is left. 4 minus 4 equals 0.", html: crossed(4, 4, "🍪") + eq("4 − 4 = <b>0</b>") },
  ],
  gen() {
    const a = R(2, 10), b = R(1, a), d = a - b, t = pick(THINGS);
    if (Math.random() < 0.35) { const who = pick(KIDS); return { q: `${who} has ${a} ${pl(a, t)}. ${who} gives away ${b}. How many are left?`, vis: crossed(a, b, t[0]), opts: numU(d, [d + 1, d - 1, a, b]), ans: String(d), big: 1, why: `${a} − ${b} = ${d}`, key: "w" + a + b }; }
    return { q: `What is ${a} − ${b}?`, vis: crossed(a, b, t[0]) + eq(`${a} − ${b} = ${blank()}`), opts: numU(d, [d + 1, d - 1, a + b]), ans: String(d), big: 1, why: `${a} take away ${b} leaves ${d}.`, key: a + "-" + b };
  },
});

topic(6, "math", {
  id: "shapes", title: "Shapes", icon: "🔷", blurb: "Name shapes and count their sides.",
  lesson: [
    { t: "Shapes all around", say: "A cookie is a circle. A window can be a square. A slice of pizza is like a triangle. A door is a rectangle.", html: `<div class="shape-row">${[["circle", "🍪"], ["square", "🪟"], ["triangle", "🍕"], ["rectangle", "🚪"]].map(([n, e], i) => `<figure>${shape(n, SHAPE_COLS[i], 100)}<figcaption>${n} <span class="emo">${e}</span></figcaption></figure>`).join("")}</div>` },
    { t: "Sides and corners", say: "Count the straight sides. A triangle has 3 sides and 3 corners. A square has 4 sides, all the same length. A circle has no sides and no corners.", html: `<div class="shape-row">${[["triangle", "3 sides"], ["square", "4 sides"], ["circle", "0 sides"]].map(([n, s], i) => `<figure>${shape(n, SHAPE_COLS[i + 1], 100)}<figcaption>${n}<br><b>${s}</b></figcaption></figure>`).join("")}</div>` },
    { t: "More shapes", say: "A pentagon has 5 sides. A hexagon has 6 sides, like the cells in a beehive.", html: `<div class="shape-row">${[["pentagon", "5 sides"], ["hexagon", "6 sides 🐝"]].map(([n, s], i) => `<figure>${shape(n, SHAPE_COLS[i + 3], 110)}<figcaption>${n}<br><b>${s}</b></figcaption></figure>`).join("")}</div>` },
  ],
  gen() {
    const [n, sides] = pick(SHAPES), colr = pick(SHAPE_COLS);
    if (Math.random() < 0.6) return { q: "What shape is this?", vis: shape(n, colr, 130), opts: shuffle([n, ...shuffle(SHAPES.map(s => s[0]).filter(x => x !== n)).slice(0, 3)]), ans: n, big: 1, why: `It is a ${n}${sides ? ` with ${sides} sides` : ""}.`, key: "n" + n };
    return { q: `How many sides does a ${n} have?`, vis: shape(n, colr, 130), opts: uniq(sides, shuffle([0, 3, 4, 5, 6])), ans: String(sides), big: 1, why: `A ${n} has ${sides} ${sides === 1 ? "side" : "sides"}.`, key: "s" + n };
  },
});

topic(6, "math", {
  id: "compare", title: "More or Less", icon: "⚖️", blurb: "Compare numbers and groups.",
  lesson: [
    { t: "More and less", say: "5 strawberries is more than 2 strawberries. 2 is less than 5.", html: `<div class="cmp"><div>${grp(5, "🍓")}<b>5 — more</b></div><div>${grp(2, "🍓")}<b>2 — less</b></div></div>` },
    { t: "The number line", say: "On a number line, numbers get bigger as you go right. 8 is to the right of 3, so 8 is bigger.", html: numberLine(0, 10, { mark: 8 }) + eq("8 is bigger than 3") },
    { t: "Match them up", say: "Line up two groups. The group with some left over has more.", html: `<div class="match"><div>${grp(6, "🐶")}</div><div>${grp(4, "🦴")}</div></div>` + note("2 dogs have no bone, so there are <b>more dogs</b>.") },
  ],
  gen() {
    const k = R(0, 2);
    if (k === 0) {
      const s = new Set(); while (s.size < 4) s.add(R(0, 20)); const arr = [...s], big = Math.random() < 0.5, ans = big ? Math.max(...arr) : Math.min(...arr);
      return { q: `Which number is the <b>${big ? "biggest" : "smallest"}</b>?`, say: `Which number is the ${big ? "biggest" : "smallest"}?`, opts: shuffle(arr).map(String), ans: String(ans), big: 1, why: `${ans} is the ${big ? "biggest" : "smallest"} number.`, key: arr.join() };
    }
    if (k === 1) {
      const a = R(1, 9); let b = R(1, 9); while (b === a) b = R(1, 9);
      const [t1, t2] = shuffle(THINGS).slice(0, 2), l1 = `<span class="emo">${t1[0]}</span> ${cap(t1[1])}`, l2 = `<span class="emo">${t2[0]}</span> ${cap(t2[1])}`;
      const more = Math.random() < 0.6, ans = (more ? a > b : a < b) ? l1 : l2;
      return { q: `Which group has <b>${more ? "more" : "fewer"}</b>?`, say: `Which group has ${more ? "more" : "fewer"}?`, vis: `<div class="cmp"><div>${grp(a, t1[0])}</div><div>${grp(b, t2[0])}</div></div>`, opts: [l1, l2], ans, why: `There ${a === 1 ? `is 1 ${t1[1].replace(/(ie)?s$/, (m, ie) => ie ? "y" : "")}` : `are ${a} ${t1[1]}`} and ${b === 1 ? `1 ${t2[1].replace(/(ie)?s$/, (m, ie) => ie ? "y" : "")}` : `${b} ${t2[1]}`}.`, key: t1[1] + a + b };
    }
    const a = R(0, 20); let b = R(0, 20); while (b === a) b = R(0, 20);
    const less = Math.random() < 0.5, ans = less ? Math.min(a, b) : Math.max(a, b);
    return { q: `Which is <b>${less ? "less" : "more"}</b>: ${a} or ${b}?`, say: `Which is ${less ? "less" : "more"}: ${a} or ${b}?`, opts: [String(a), String(b)], ans: String(ans), big: 1, why: `${Math.min(a, b)} is less than ${Math.max(a, b)}.`, key: "p" + a + b };
  },
});

topic(6, "math", {
  id: "oclock", title: "Time: O'Clock", icon: "🕐", blurb: "Read the clock on the hour.",
  lesson: [
    { t: "Meet the clock", say: "A clock has a short hand and a long hand. The short orange hand tells the hour. The long blue hand tells the minutes.", html: row(clock(3, 0), `<div class="legend"><span><i style="background:#FF7A59"></i>short hand = hour</span><span><i style="background:#3D7BFF"></i>long hand = minutes</span></div>`) },
    { t: "O'clock", say: "When the long hand points straight up to 12, it is o'clock. The short hand points to 3, so it is 3 o'clock.", html: row(clock(3, 0), `<div class="big-time">3 o'clock<br><small>3:00</small></div>`) },
    { t: "Times in your day", say: "7 o'clock, time to wake up. 12 o'clock, time for lunch. 8 o'clock, time for bed.", html: `<div class="shape-row">${[[7, "wake up 🌅"], [12, "lunch 🥪"], [8, "bedtime 🛏️"]].map(([h, l]) => `<figure>${clock(h, 0, 120)}<figcaption><b>${h} o'clock</b><br>${l}</figcaption></figure>`).join("")}</div>` },
  ],
  gen() {
    const h = R(1, 12), others = shuffle(range(1, 12).filter(x => x !== h)).slice(0, 3);
    if (Math.random() < 0.65) return { q: "What time is it?", vis: clock(h, 0), opts: shuffle([h, ...others]).map(x => `${x} o'clock`), ans: `${h} o'clock`, big: 1, why: `The short hand points to ${h} and the long hand points to 12.`, key: "t" + h };
    return { q: `Which clock shows <b>${h} o'clock</b>?`, say: `Which clock shows ${h} o'clock?`, opts: shuffle([h, ...others]).map(x => clock(x, 0, 110)), ans: clock(h, 0, 110), sayAns: `${h} o'clock`, why: `At ${h} o'clock the short hand points to ${h}.`, key: "c" + h };
  },
});

/* ====================== AGE 7 · ENGLISH ====================== */
const DIGRAPHS = [["sh", "ship", "🚢"], ["sh", "shell", "🐚"], ["sh", "shoe", "👟"], ["sh", "sheep", "🐑"], ["sh", "fish", "🐟"], ["ch", "chair", "🪑"], ["ch", "cheese", "🧀"], ["ch", "chick", "🐤"], ["ch", "cherry", "🍒"], ["ch", "peach", "🍑"], ["th", "thumb", "👍"], ["th", "three", "3️⃣"], ["th", "tooth", "🦷"], ["th", "bath", "🛁"], ["wh", "whale", "🐳"], ["wh", "wheat", "🌾"], ["wh", "white", "⬜"]];
topic(7, "english", {
  id: "digraphs", title: "Letter Teams", icon: "🚢", blurb: "sh, ch, th and wh make one sound.",
  lesson: [
    { t: "Two letters, one sound", say: "Some letters team up to make one new sound. S and H together say shh, like in ship.", html: row(hw("sh", "big"), picCard("🚢", `<b class="hl">sh</b>ip`, "sh. ship")) },
    { t: "Meet the teams", say: "ch says ch, like cheese. th says th, like thumb. wh says w, like whale. Tap each one.", html: `<div class="card-grid">${[["sh", "🐑", "sheep"], ["ch", "🧀", "cheese"], ["th", "👍", "thumb"], ["wh", "🐳", "whale"]].map(([d, e, w]) => picCard(e, `<b class="hl">${d}</b>${w.slice(2)}`, `${d}, ${w}`)).join("")}</div>` },
    { t: "At the end too", say: "Letter teams can come at the end of a word. Fish, bath, peach.", html: `<div class="card-grid">${[["🐟", "fi", "sh"], ["🛁", "ba", "th"], ["🍑", "pea", "ch"]].map(([e, a, d]) => picCard(e, `${a}<b class="hl">${d}</b>`, a + d)).join("")}</div>` },
  ],
  gen() {
    const [d, w, e] = pick(DIGRAPHS), i = w.indexOf(d);
    const vb = i === 0 ? "starts" : i + 2 >= w.length ? "finishes" : "completes"; return { q: `Which letter team ${vb} the word?`, say: `Which letter team ${vb} the word ${w}?`, vis: col(bigEmo(e), hw(`${w.slice(0, i)}<span class="blank">__</span>${w.slice(i + 2)}`)), opts: shuffle(["sh", "ch", "th", "wh"]), ans: d, big: 1, why: `${cap(w)} is spelled ${w.slice(0, i)}${d.toUpperCase()}${w.slice(i + 2)}.`, key: w };
  },
});

const MAGIC = [["cap", "cape"], ["kit", "kite"], ["tub", "tube"], ["hop", "hope"], ["pin", "pine"], ["can", "cane"], ["not", "note"], ["cub", "cube"], ["man", "mane"], ["rob", "robe"], ["hat", "hate"], ["bit", "bite"], ["tap", "tape"], ["rid", "ride"]];
topic(7, "english", {
  id: "magice", title: "Magic E", icon: "✨", blurb: "A silent e makes the vowel say its name.",
  lesson: [
    { t: "The magic E", say: "When an E sits at the end of a word, we can't hear it. But it makes the vowel say its name. Cap becomes cape!", html: row(hw("cap"), arrow(), hw(`cap<b class="hl">e</b>`)) + note("The <b>a</b> changes from short <i>a</i> to long <i>A</i>.") },
    { t: "More magic", say: "Kit becomes kite. Tub becomes tube. Hop becomes hope. Tap each word.", html: `<div class="pairs">${[["kit", "kite"], ["tub", "tube"], ["hop", "hope"]].map(([a, b]) => `<div class="pair">${chip(a, a, "lg")}${arrow()}${chip(`${a}<b class="hl">e</b>`, b, "lg")}</div>`).join("")}</div>` },
    { t: "Short or long?", say: "A short vowel is quick, like in hop. A long vowel says its own name, like in hope.", html: table([["hop", "hope"], ["pin", "pine"], ["cub", "cube"]], ["Short vowel", "Long vowel"]) },
  ],
  gen() {
    const [s, l] = pick(MAGIC);
    if (Math.random() < 0.55) {
      const other = pick(MAGIC.filter(m => m[0] !== s))[1];
      return { q: `Add a magic E to <b>${s}</b>. What word do you get?`, say: `Add a magic E to ${s}. What word do you get?`, vis: hw(`${s} + <b class="hl">e</b>`), opts: uniq(l, [s, s[0] + s[1] + s[1] + s[2], other]), ans: l, big: 1, why: `${s} + e = ${l}. The vowel now says its name.`, key: "a" + s };
    }
    const shorts = shuffle(MAGIC.filter(m => m[0] !== s)).slice(0, 3).map(m => m[0]);
    return { q: "Which word has a <b>long</b> vowel sound?", say: "Which word has a long vowel sound?", opts: shuffle([l, ...shorts]), ans: l, big: 1, why: `${cap(l)} ends with a magic E, so the vowel is long.`, key: "b" + l };
  },
});

const NOUNS = ["dog", "ball", "teacher", "school", "apple", "car", "book", "bird", "house", "tree", "girl", "pencil", "farm", "cake"];
const VERBS = ["run", "jump", "eat", "swim", "sing", "read", "sleep", "throw", "climb", "draw", "kick", "dance", "clap", "write"];
const ADJS = ["happy", "big", "red", "soft", "tall", "funny", "cold", "slow"];
const NV_S = [["The dog runs fast.", "runs"], ["A bird sings.", "sings"], ["The girl jumps high.", "jumps"], ["My cat sleeps on the bed.", "sleeps"], ["The frog swims in the pond.", "swims"], ["Dad cooks dinner.", "cooks"], ["We clap our hands.", "clap"], ["The baby smiles.", "smiles"], ["Sam kicks the ball.", "kicks"], ["The horse eats hay.", "eats"]];
topic(7, "english", {
  id: "nounverb", title: "Nouns & Verbs", icon: "🏃", blurb: "Naming words and action words.",
  lesson: [
    { t: "Nouns name things", say: "A noun is a person, a place, or a thing. Girl, school, and ball are nouns.", html: `<div class="card-grid">${[["👧", "girl", "a person"], ["🏫", "school", "a place"], ["⚽", "ball", "a thing"]].map(([e, w, k]) => picCard(e, `<b class="noun">${w}</b><small>${k}</small>`, w)).join("")}</div>` },
    { t: "Verbs are actions", say: "A verb is an action word. It tells what someone does. Run, jump, eat.", html: `<div class="card-grid">${[["🏃", "run"], ["🦘", "jump"], ["😋", "eat"]].map(([e, w]) => picCard(e, `<b class="verb">${w}</b>`, w)).join("")}</div>` },
    { t: "Find them in a sentence", say: "The dog runs. Dog is the noun, it names the animal. Runs is the verb, it tells what the dog does.", html: `<div class="sentence big-sentence">The <b class="noun">dog</b> <b class="verb">runs</b>.</div><div class="legend"><span><i class="noun-sw"></i>noun</span><span><i class="verb-sw"></i>verb</span></div>` },
  ],
  gen() {
    const k = R(0, 2);
    if (k === 0) { const a = pick(NOUNS); return { q: "Which word is a <b>noun</b> (a person, place or thing)?", say: "Which word is a noun? A person, place or thing.", opts: shuffle([a, ...shuffle(VERBS).slice(0, 2), pick(ADJS)]), ans: a, big: 1, why: `${cap(a)} names a person, place or thing.`, key: "n" + a }; }
    if (k === 1) { const a = pick(VERBS); return { q: "Which word is a <b>verb</b> (an action)?", say: "Which word is a verb? An action word.", opts: shuffle([a, ...shuffle(NOUNS).slice(0, 2), pick(ADJS)]), ans: a, big: 1, why: `${cap(a)} is something you can do.`, key: "v" + a }; }
    const [s, v] = pick(NV_S);
    return { q: `Which word is the <b>verb</b>?<div class="sentence">${s}</div>`, say: `Which word is the verb? ${s}`, opts: sentOpts(s, v, ["table", "red", "happy"]), ans: v, big: 1, why: `${cap(v)} is the action in the sentence.`, key: s };
  },
});

const PLURALS = [["cat", "cats", "🐱"], ["dog", "dogs", "🐶"], ["box", "boxes", "📦"], ["bus", "buses", "🚌"], ["dish", "dishes", "🍽️"], ["fox", "foxes", "🦊"], ["ball", "balls", "⚽"], ["bench", "benches", "🪑"], ["brush", "brushes", "🖌️"], ["glass", "glasses", "🥛"], ["hat", "hats", "🎩"], ["peach", "peaches", "🍑"], ["book", "books", "📘"], ["watch", "watches", "⌚"]];
topic(7, "english", {
  id: "plurals", title: "More Than One", icon: "🐱", blurb: "Add s or es to make plurals.",
  lesson: [
    { t: "Just add s", say: "Plural means more than one. Most of the time we just add s. One cat, two cats.", html: row(col(bigEmo("🐱"), hw("cat")), arrow(), col(`<span class="emo xxl">🐱🐱</span>`, hw(`cat<b class="hl">s</b>`))) },
    { t: "Sometimes add es", say: "If a word ends in s, x, sh or ch, add es. One box, two boxes. One dish, two dishes.", html: table([["bus", `bus<b class="hl">es</b>`], ["box", `box<b class="hl">es</b>`], ["dish", `dish<b class="hl">es</b>`], ["peach", `peach<b class="hl">es</b>`]], ["One", "More than one"]) },
    { t: "Listen for the clue", say: "Say boxes. Box, es. You can hear the extra part at the end. That is your clue to add es.", html: `<div class="chips">${chip("box-es", "boxes", "lg")}${chip("dish-es", "dishes", "lg")}${chip("cats", "cats", "lg")}</div>` },
  ],
  gen() {
    const [b, p, e] = pick(PLURALS), es = p.endsWith("es");
    return { q: `One ${b}, two ___.`, say: `One ${b}, two what?`, vis: `<span class="emo xxl">${e}${e}</span>`, opts: uniq(p, [es ? b + "s" : b + "es", b, es ? b + "ies" : b + "ss"]), ans: p, big: 1, why: es ? `${cap(b)} ends in ${b.slice(-2).match(/sh|ch/) ? b.slice(-2) : b.slice(-1)}, so we add es: ${p}.` : `Just add s: ${p}.`, key: b };
  },
});

const OPP = [["hot", "cold", "🔥", "🧊"], ["big", "small", "🐘", "🐭"], ["up", "down", "⬆️", "⬇️"], ["happy", "sad", "😀", "😢"], ["day", "night", "☀️", "🌙"], ["fast", "slow", "🐇", "🐢"], ["open", "closed", "📖", "📕"], ["wet", "dry", "💧", "🏜️"], ["full", "empty", "🥛", "🫙"], ["loud", "quiet", "📢", "🤫"], ["tall", "short", "🦒", "🐧"], ["hard", "soft", "🧱", "🧸"], ["old", "new", "👴", "👶"], ["in", "out", "📥", "📤"]];
topic(7, "english", {
  id: "opposites", title: "Opposites", icon: "↔️", blurb: "Words that mean the opposite.",
  lesson: [
    { t: "What is an opposite?", say: "Opposites are words that mean completely different things. Hot and cold are opposites.", html: row(col(bigEmo("🔥"), hw("hot")), `<span class="sym">↔</span>`, col(bigEmo("🧊"), hw("cold"))) },
    { t: "More opposites", say: "Big and small. Fast and slow. Happy and sad. Tap each word.", html: `<div class="pairs">${OPP.slice(1, 6).filter((_, i) => i !== 1 && i !== 3).map(([a, b, e1, e2]) => `<div class="pair">${chip(`${e1} ${a}`, a, "lg")}<span class="sym">↔</span>${chip(`${e2} ${b}`, b, "lg")}</div>`).join("")}</div>` },
    { t: "Think of the other side", say: "To find an opposite, ask: what is the other side? The other side of day is night.", html: row(col(bigEmo("☀️"), hw("day")), `<span class="sym">↔</span>`, col(bigEmo("🌙"), hw("night"))) },
  ],
  gen() {
    const i = R(0, OPP.length - 1), [a, b, e1, e2] = OPP[i], flip = Math.random() < 0.3;
    const w = flip ? b : a, ans = flip ? a : b, e = flip ? e2 : e1;
    const others = shuffle(OPP.filter((_, j) => j !== i)).slice(0, 3).map(o => pick([o[0], o[1]]));
    return { q: `What is the opposite of <b>${w}</b>?`, say: `What is the opposite of ${w}?`, vis: col(bigEmo(e), hw(w)), opts: shuffle([ans, ...others]), ans, big: 1, why: `${cap(w)} and ${ans} are opposites.`, key: w };
  },
});

const PUNC = [["Where is my hat", "?"], ["I like red apples", "."], ["Watch out", "!"], ["What is your name", "?"], ["The sun is hot", "."], ["Wow, that is a huge cake", "!"], ["Can we go to the park", "?"], ["My dog has a spotted tail", "."], ["Help, the pot is boiling over", "!"], ["How old are you", "?"], ["We ate soup for lunch", "."], ["Hooray, we won", "!"], ["Do you like frogs", "?"], ["Birds build nests in trees", "."], ["Look, a shooting star", "!"], ["Why is the sky blue", "?"], ["My sister plays the drums", "."], ["Who ate my sandwich", "?"], ["Ouch, that hurts", "!"], ["The library opens at nine", "."]];
const PNAME = { ".": "period", "?": "question mark", "!": "exclamation mark" };
const pOpt = p => `<b class="punc">${p}</b><small>${PNAME[p]}</small>`;
topic(7, "english", {
  id: "punct", title: "Ending Marks", icon: "❓", blurb: "Periods, question marks and exclamation marks.",
  lesson: [
    { t: "Telling sentences", say: "A telling sentence tells you something. It ends with a period. I have a dog.", html: `<div class="sentence big-sentence">I have a dog<b class="hl">.</b></div>` + note("A <b>period</b> is a small dot.") },
    { t: "Asking sentences", say: "A question asks something. It ends with a question mark. Where is my dog?", html: `<div class="sentence big-sentence">Where is my dog<b class="hl">?</b></div>` + note("Questions often start with <b>who, what, where, when, why, how, can, do</b>.") },
    { t: "Strong feelings", say: "An exclamation mark shows a strong feeling, like surprise or excitement. Look out! We won!", html: `<div class="sentence big-sentence">Look out<b class="hl">!</b> We won<b class="hl">!</b></div>` },
  ],
  gen() {
    const [s, p] = pick(PUNC);
    return { q: `Which mark ends this sentence?<div class="sentence">${s}<span class="blank">_</span></div>`, say: `Which mark ends this sentence? ${s}`, opts: [".", "?", "!"].map(pOpt), ans: pOpt(p), sayAns: PNAME[p], why: p === "?" ? "It asks something, so it needs a question mark." : p === "!" ? "It shows a strong feeling, so it needs an exclamation mark." : "It tells something, so it needs a period.", key: s };
  },
});

/* ====================== AGE 7 · MATH ====================== */
topic(7, "math", {
  id: "place", title: "Tens and Ones", icon: "🧱", blurb: "Understand place value up to 99.",
  lesson: [
    { t: "Tens and ones", say: "A ten is a stick of 10 cubes. A one is a single cube.", html: row(col(blocks(1, 0), "<b>1 ten = 10</b>"), col(blocks(0, 1), "<b>1 one = 1</b>")) },
    { t: "Build a number", say: "34 is 3 tens and 4 ones.", html: row(blocks(3, 4), table([["3", "4"]], ["Tens", "Ones"])) + eq("30 + 4 = <b>34</b>") },
    { t: "What is each digit worth?", say: "In 52, the 5 is in the tens place, so it means 50. The 2 is in the ones place, so it means 2.", html: `<div class="digits"><span class="d-t">5</span><span class="d-o">2</span></div>` + eq(`<span class="d-t">50</span> + <span class="d-o">2</span> = 52`) },
  ],
  gen() {
    let n = R(11, 99), t = Math.floor(n / 10), o = n % 10;
    const k = R(0, 2);
    if (k === 0) return { q: "What number do the blocks show?", vis: blocks(t, o), opts: numU(n, [o * 10 + t, n + 10, n - 10, n + 1], 5, 1), ans: String(n), big: 1, why: `${t} tens and ${o} ones make ${n}.`, key: "b" + n };
    if (k === 1) { const askT = Math.random() < 0.5, a = askT ? t : o; return { q: `How many <b>${askT ? "tens" : "ones"}</b> are in ${n}?`, say: `How many ${askT ? "tens" : "ones"} are in ${n}?`, vis: `<div class="digits"><span class="d-t">${t}</span><span class="d-o">${o}</span></div>`, opts: uniq(a, [askT ? o : t, a + 1, a > 0 ? a - 1 : a + 2, n]), ans: String(a), big: 1, why: `${n} has ${t} tens and ${o} ones.`, key: "h" + n + askT }; }
    while (t === o) { n = R(11, 99); t = Math.floor(n / 10); o = n % 10; }
    return { q: `What is the value of the <b>${t}</b> in ${n}?`, say: `What is the value of the ${t} in ${n}?`, vis: `<div class="digits"><span class="d-t">${t}</span><span class="d-o">${o}</span></div>`, opts: uniq(t * 10, [t, t + 10, t * 10 + o, o * 10]), ans: String(t * 10), big: 1, why: `The ${t} is in the tens place, so it is worth ${t * 10}.`, key: "v" + n };
  },
});

topic(7, "math", {
  id: "add100", title: "Adding to 100", icon: "➕", blurb: "Add two-digit numbers, with carrying.",
  lesson: [
    { t: "Line up the digits", say: "Write the numbers on top of each other. Ones under ones, tens under tens. Add the ones first. 7 plus 5 equals 12.", html: stack(37, 25, "+") + note("Ones: 7 + 5 = <b>12</b>") },
    { t: "Carry the ten", say: "12 ones is 1 ten and 2 ones. Write the 2 in the ones place. Carry the 1 up to the tens.", html: stack(37, 25, "+", { carry: "1 ", result: " 2" }) },
    { t: "Add the tens", say: "Now add the tens. 1 plus 3 plus 2 equals 6 tens. So 37 plus 25 equals 62.", html: stack(37, 25, "+", { carry: "1 ", result: 62 }) + eq("37 + 25 = <b>62</b>") },
  ],
  gen() {
    const a = R(12, 80), b = R(10, 99 - a), s = a + b;
    const noCarry = (Math.floor(a / 10) + Math.floor(b / 10)) * 10 + (a % 10 + b % 10) % 10;
    return { q: `What is ${a} + ${b}?`, vis: stack(a, b, "+"), opts: numU(s, [noCarry, s + 10, s - 10, s + 1, s - 1], 4, 0), ans: String(s), big: 1, why: `Ones: ${a % 10} + ${b % 10} = ${a % 10 + b % 10}. Tens: ${Math.floor(a / 10)} + ${Math.floor(b / 10)}${a % 10 + b % 10 >= 10 ? " + 1 carried" : ""} = ${Math.floor(a / 10) + Math.floor(b / 10) + (a % 10 + b % 10 >= 10 ? 1 : 0)}. Answer: ${s}.`, key: a + "+" + b };
  },
});

topic(7, "math", {
  id: "sub100", title: "Subtracting to 100", icon: "➖", blurb: "Subtract two-digit numbers, with borrowing.",
  lesson: [
    { t: "Start with the ones", say: "52 minus 17. Start with the ones. 2 minus 7? 2 is too small!", html: stack(52, 17, "−") + note("Ones: 2 − 7 … not enough!") },
    { t: "Borrow a ten", say: "Borrow 1 ten from the 5 tens. Now there are 4 tens and 12 ones. 12 minus 7 equals 5.", html: stack(52, 17, "−", { carry: "4¹", result: " 5" }) + note("5 tens → 4 tens, 2 ones → 12 ones") },
    { t: "Subtract the tens", say: "Now the tens. 4 minus 1 equals 3. So 52 minus 17 equals 35.", html: stack(52, 17, "−", { carry: "4¹", result: 35 }) + eq("52 − 17 = <b>35</b>") },
  ],
  gen() {
    const a = R(30, 99), b = R(10, a - 5), d = a - b;
    const err = (Math.floor(a / 10) - Math.floor(b / 10)) * 10 + Math.abs(a % 10 - b % 10);
    return { q: `What is ${a} − ${b}?`, vis: stack(a, b, "−"), opts: numU(d, [err, d + 10, d - 10, d + 1, d - 1], 4, 0), ans: String(d), big: 1, why: a % 10 < b % 10 ? `Borrow a ten: ${a % 10 + 10} − ${b % 10} = ${(a % 10 + 10) - b % 10}. Then ${Math.floor(a / 10) - 1} − ${Math.floor(b / 10)} = ${Math.floor(a / 10) - 1 - Math.floor(b / 10)} tens. Answer: ${d}.` : `Ones: ${a % 10} − ${b % 10} = ${a % 10 - b % 10}. Tens: ${Math.floor(a / 10)} − ${Math.floor(b / 10)} = ${Math.floor(a / 10) - Math.floor(b / 10)}. Answer: ${d}.`, key: a + "-" + b };
  },
});

topic(7, "math", {
  id: "halfhour", title: "Time: Half Past", icon: "🕞", blurb: "Read times like 4:00 and 4:30.",
  lesson: [
    { t: "Half past", say: "When the long hand points down to 6, half of the hour is over. We call it half past. This clock shows half past 4.", html: row(clock(4, 30), `<div class="big-time">half past 4<br><small>4:30</small></div>`) },
    { t: "Watch the short hand", say: "At half past, the short hand is halfway between two numbers. At 4:30, it is between 4 and 5.", html: row(clock(4, 30), note("Short hand between <b>4</b> and <b>5</b> → the hour is still <b>4</b>.")) },
    { t: "Writing time", say: "3 o'clock is written 3:00. Half past 3 is written 3:30. There are 30 minutes in half an hour.", html: `<div class="shape-row"><figure>${clock(3, 0, 120)}<figcaption><b>3:00</b></figcaption></figure><figure>${clock(3, 30, 120)}<figcaption><b>3:30</b></figcaption></figure></div>` },
  ],
  gen() {
    const h = R(1, 12), m = pick([0, 30]), t = `${h}:${pad2(m)}`, nx = h % 12 + 1, pv = h === 1 ? 12 : h - 1;
    return { q: "What time does the clock show?", vis: clock(h, m), opts: uniq(t, m ? [`${h}:00`, `${nx}:30`, `6:${pad2((h * 5) % 60)}`] : [`${h}:30`, `${nx}:00`, `${pv}:00`]), ans: t, big: 1, why: m ? `The long hand is on 6, so it is half past. The short hand is just past ${h}. It is ${t}.` : `The long hand is on 12 and the short hand is on ${h}. It is ${t}.`, key: t };
  },
});

topic(7, "math", {
  id: "money", title: "Counting Coins", icon: "🪙", blurb: "Pennies, nickels, dimes and quarters.",
  lesson: [
    { t: "Meet the coins", say: "A penny is worth 1 cent. A nickel is 5 cents. A dime is 10 cents. A quarter is 25 cents.", html: coinRow(["p", "n", "d", "q"], true) },
    { t: "Count the biggest first", say: "Start with the coin worth the most, then count on. 25, 35, 40, 41. That is 41 cents!", html: coinRow(["q", "d", "n", "p"]) + train(["25¢", "35¢", "40¢", "41¢"]) },
    { t: "Size is not value", say: "A dime is smaller than a nickel, but a dime is worth more! Learn each coin's value.", html: row(col(coin("d"), "<b>dime</b> small, worth 10¢"), col(coin("n"), "<b>nickel</b> bigger, worth 5¢")) },
  ],
  gen() {
    if (Math.random() < 0.75) {
      let keys, tot;
      do { const n = R(2, 5); keys = Array.from({ length: n }, () => pick(["q", "d", "n", "p"])); tot = keys.reduce((s, k) => s + COINS[k].v, 0); } while (tot > 99);
      keys.sort((a, b) => COINS[b].v - COINS[a].v);
      return { q: "How much money is this?", vis: coinRow(keys), opts: numU(tot, [tot + 5, tot - 5, tot + 10, tot + 1, tot - 1], 6, 1).map(x => x + "¢"), ans: tot + "¢", big: 1, why: `Count on from the biggest: ${keys.reduce((a, k) => { a.push((a.length ? parseInt(a[a.length - 1]) : 0) + COINS[k].v + "¢"); return a; }, []).join(", ")}.`, key: keys.join("") };
    }
    const k = pick(["q", "d", "n", "p"]), c = COINS[k];
    const o = x => `<figure class="copt">${coin(x, false)}<figcaption>${COINS[x].n}</figcaption></figure>`;
    return { q: `Which coin is worth <b>${c.v}¢</b>?`, say: `Which coin is worth ${c.v} ${c.v === 1 ? "cent" : "cents"}?`, opts: shuffle(["q", "d", "n", "p"]).map(o), ans: o(k), why: `A ${c.n} is worth ${c.v} ${c.v === 1 ? "cent" : "cents"}.`, key: "w" + k };
  },
});

topic(7, "math", {
  id: "skip", title: "Skip Counting", icon: "🦘", blurb: "Count by 2s, 5s and 10s.",
  lesson: [
    { t: "Counting by 2s", say: "Socks come in pairs. Count by 2s: 2, 4, 6, 8, 10.", html: `<div class="counted">${range(1, 5).map(i => `<span><span class="emo lg">🧦🧦</span><b>${i * 2}</b></span>`).join("")}</div>` },
    { t: "Counting by 5s", say: "Each hand has 5 fingers. Count by 5s: 5, 10, 15, 20.", html: `<div class="counted">${range(1, 4).map(i => `<span><span class="emo lg">🖐️</span><b>${i * 5}</b></span>`).join("")}</div>` },
    { t: "Counting by 10s", say: "Each stick has 10 cubes. Count by 10s: 10, 20, 30, 40, 50.", html: row(blocks(5, 0)) + train([10, 20, 30, 40, 50]) },
  ],
  gen() {
    const step = pick([2, 5, 10]), start = step * R(0, 5), seq = range(1, 5).map(i => start + step * i), bi = R(1, 4), ans = seq[bi];
    return { q: `Count by <b>${step}s</b>. What number is missing?`, say: `Count by ${step}s. What number is missing?`, vis: train(seq.map((v, i) => i === bi ? "?" : v)), opts: numU(ans, [ans + 1, ans - 1, ans + step, ans - step, ans + 2], 3, 0), ans: String(ans), big: 1, why: `Count by ${step}s: ${seq.join(", ")}.`, key: seq.join() + bi };
  },
});

/* ====================== AGE 8 · ENGLISH ====================== */
const ADJ_S = [["The red ball bounced away.", "red"], ["A tiny mouse ran past.", "tiny"], ["We ate a delicious pie.", "delicious"], ["The tall giraffe ate leaves.", "tall"], ["My fluffy cat sleeps on the bed.", "fluffy"], ["It was a cold morning.", "cold"], ["The noisy crowd cheered.", "noisy"], ["She wore shiny shoes.", "shiny"], ["The old bridge creaked.", "old"], ["He found a smooth stone.", "smooth"]];
const ADJ_T = [["🍋", "a lemon", "sour", ["loud", "furry", "square"]], ["❄️", "snow", "cold", ["hot", "noisy", "hairy"]], ["☁️", "a cloud", "fluffy", ["sharp", "heavy", "sour"]], ["🔥", "fire", "hot", ["wet", "frozen", "quiet"]], ["🐢", "a turtle", "slow", ["speedy", "fluffy", "tall"]], ["🐘", "an elephant", "huge", ["tiny", "light", "shiny"]]];
topic(8, "english", {
  id: "adjectives", title: "Adjectives", icon: "🎨", blurb: "Words that describe nouns.",
  lesson: [
    { t: "Describing words", say: "An adjective describes a noun. It tells what kind, how many, or which one. In the red ball, red is the adjective.", html: `<div class="sentence big-sentence">the <b class="hl">red</b> <b class="noun">ball</b> <span class="emo">🔴</span></div>` + note("<b>red</b> tells what kind of ball") },
    { t: "Use your senses", say: "Adjectives can tell how things look, sound, feel, smell or taste. Shiny, loud, soft, sweet.", html: `<div class="card-grid">${[["✨", "shiny", "look"], ["📢", "loud", "sound"], ["🧸", "soft", "feel"], ["🍯", "sweet", "taste"]].map(([e, w, s]) => picCard(e, `<b class="hl">${w}</b><small>${s}</small>`, w)).join("")}</div>` },
    { t: "Find the adjective", say: "A tiny mouse ran past. Which word describes the mouse? Tiny!", html: `<div class="sentence big-sentence">A <b class="hl">tiny</b> <b class="noun">mouse</b> ran past. <span class="emo">🐭</span></div>` },
  ],
  gen() {
    if (Math.random() < 0.65) { const [s, a] = pick(ADJ_S); return { q: `Which word is the <b>adjective</b>?<div class="sentence">${s}</div>`, say: `Which word is the adjective? ${s}`, opts: sentOpts(s, a, ["jumped", "table", "quickly", "under"]), ans: a, big: 1, why: `${cap(a)} describes the noun.`, key: s }; }
    const [e, n, a, d] = pick(ADJ_T);
    return { q: `Which adjective best describes ${n}?`, vis: bigEmo(e), opts: shuffle([a, ...d]), ans: a, big: 1, why: `${cap(n)} is ${a}.`, key: n };
  },
});

const SYN = [["happy", "glad"], ["big", "large"], ["small", "tiny"], ["fast", "quick"], ["begin", "start"], ["shout", "yell"], ["smart", "clever"], ["scared", "afraid"], ["angry", "mad"], ["tired", "sleepy"], ["pretty", "beautiful"], ["jump", "leap"], ["easy", "simple"], ["close", "shut"], ["rich", "wealthy"], ["sick", "ill"]];
topic(8, "english", {
  id: "synonyms", title: "Synonyms", icon: "🤝", blurb: "Different words with the same meaning.",
  lesson: [
    { t: "Same meaning", say: "Synonyms are words that mean almost the same thing. Big and large are synonyms.", html: row(hw("big"), `<span class="sym">=</span>`, hw("large")) + row(bigEmo("🐘")) },
    { t: "Make your writing better", say: "Instead of saying happy again and again, try glad, cheerful, or joyful.", html: `<div class="chips">${["happy", "glad", "cheerful", "joyful"].map(w => chip(w, w, "lg")).join("")}</div>` },
    { t: "Synonym pairs", say: "Fast and quick. Shout and yell. Smart and clever. Each pair means the same thing.", html: table([["fast", "quick"], ["shout", "yell"], ["smart", "clever"], ["begin", "start"]], ["Word", "Synonym"]) },
  ],
  gen() {
    const i = R(0, SYN.length - 1), flip = Math.random() < 0.5, [a, b] = flip ? [SYN[i][1], SYN[i][0]] : SYN[i];
    const others = shuffle(SYN.filter((_, j) => j !== i)).slice(0, 3).map(p => pick(p));
    return { q: `Which word means the same as <b>${a}</b>?`, say: `Which word means the same as ${a}?`, vis: hw(a), opts: shuffle([b, ...others]), ans: b, big: 1, why: `${cap(a)} and ${b} are synonyms.`, key: a };
  },
});

const COMP = [["sun", "flower", "🌻"], ["rain", "bow", "🌈"], ["foot", "ball", "🏈"], ["cup", "cake", "🧁"], ["star", "fish", "⭐"], ["butter", "fly", "🦋"], ["snow", "man", "⛄"], ["pop", "corn", "🍿"], ["tooth", "brush", "🪥"], ["pan", "cake", "🥞"], ["gold", "fish", "🐠"], ["bed", "room", "🛏️"], ["back", "pack", "🎒"], ["water", "melon", "🍉"]];
const NOT_COMP = ["happy", "pencil", "orange", "turtle", "purple", "dinner", "yellow", "rabbit", "garden", "monkey"];
topic(8, "english", {
  id: "compound", title: "Compound Words", icon: "🧩", blurb: "Two small words make one new word.",
  lesson: [
    { t: "Two words make one", say: "A compound word is made from two smaller words. Sun plus flower makes sunflower!", html: row(hw("sun"), `<span class="sym">+</span>`, hw("flower"), `<span class="sym">=</span>`, col(bigEmo("🌻"), hw("sunflower"))) },
    { t: "More compound words", say: "Rain plus bow makes rainbow. Cup plus cake makes cupcake. Snow plus man makes snowman.", html: `<div class="card-grid">${[["🌈", "rain", "bow"], ["🧁", "cup", "cake"], ["⛄", "snow", "man"]].map(([e, a, b]) => picCard(e, `<b class="hl">${a}</b><b class="noun">${b}</b>`, a + b)).join("")}</div>` },
    { t: "Break it apart", say: "To read a long word, look for two small words inside it. Football is foot and ball.", html: row(hw(`<b class="hl">foot</b>|<b class="noun">ball</b>`), bigEmo("🏈")) },
  ],
  gen() {
    const [a, b, e] = pick(COMP), w = a + b;
    if (Math.random() < 0.6) { const others = shuffle(COMP.filter(c => c[0] + c[1] !== w)); return { q: `<b>${a}</b> + <b>${b}</b> = ?`, say: `${a} plus ${b} makes what word?`, vis: bigEmo(e), opts: uniq(w, [b + a, a + others[0][1], others[1][0] + b]), ans: w, big: 1, why: `${a} + ${b} = ${w}`, key: "j" + w }; }
    return { q: "Which word is a <b>compound word</b>?", say: "Which word is a compound word?", opts: shuffle([w, ...shuffle(NOT_COMP).slice(0, 3)]), ans: w, big: 1, why: `${cap(w)} is made of ${a} and ${b}.`, key: "p" + w };
  },
});

const PREF = [["un", "happy"], ["un", "kind"], ["un", "fair"], ["un", "safe"], ["un", "lock"], ["re", "do"], ["re", "read"], ["re", "build"], ["re", "play"], ["re", "fill"], ["pre", "heat"], ["pre", "view"], ["pre", "pay"], ["dis", "like"], ["dis", "agree"], ["dis", "obey"]];
const PMEAN = { un: b => `not ${b}`, dis: b => `not ${b}`, re: b => `${b} again`, pre: b => `${b} before` };
topic(8, "english", {
  id: "prefixes", title: "Prefixes", icon: "🔁", blurb: "un-, re-, pre- and dis- change a word.",
  lesson: [
    { t: "A prefix goes in front", say: "A prefix is a small word part added to the front of a word. It changes the meaning. Un plus happy makes unhappy, which means not happy.", html: row(hw(`<b class="hl">un</b>`), `<span class="sym">+</span>`, hw("happy"), `<span class="sym">=</span>`, hw(`<b class="hl">un</b>happy`)) + note("unhappy = <b>not</b> happy 😢") },
    { t: "What prefixes mean", say: "Un and dis mean not. Re means again. Pre means before.", html: table([["un-", "not", "unkind"], ["dis-", "not", "dislike"], ["re-", "again", "redo"], ["pre-", "before", "preheat"]], ["Prefix", "Means", "Example"]) },
    { t: "Use the prefix clue", say: "Replay means play again. Preheat means heat before. Disagree means not agree.", html: `<div class="chips">${["replay", "preheat", "disagree", "unlock"].map(w => chip(w, w, "lg")).join("")}</div>` },
  ],
  gen() {
    const [p, b] = pick(PREF), w = p + b, m = PMEAN[p](b);
    if (Math.random() < 0.6) return { q: `What does <b>${w}</b> mean?`, say: `What does ${w} mean?`, opts: uniq(m, shuffle([`not ${b}`, `${b} again`, `${b} before`, `very ${b}`])), ans: m, why: `${p}- means "${PMEAN[p]("").trim()}", so ${w} means ${m}.`, key: "m" + w };
    const target = p, other = p === "dis" ? "un" : p === "un" ? "dis" : "";
    return { q: `Which prefix makes <b>${b}</b> mean <b>${PMEAN[target](b)}</b>?`, say: `Which prefix makes ${b} mean ${PMEAN[target](b)}?`, opts: shuffle(["un", "re", "pre", "dis"].filter(x => x !== other)).map(x => x + "-"), ans: target + "-", big: 1, why: `${target}- means "${PMEAN[target]("").trim()}": ${target}${b}.`, key: "p" + w };
  },
});

const PAST = [["Yesterday I ___ to the park.", "went", ["goed", "goes", "going"]], ["Last night we ___ a movie.", "saw", ["seed", "sees", "seeing"]], ["This morning I ___ pancakes.", "ate", ["eated", "eats", "eating"]], ["Yesterday the dog ___ after the ball.", "ran", ["runned", "runs", "running"]], ["Last week she ___ a song at the show.", "sang", ["singed", "sings", "singing"]], ["Last summer we ___ in the lake.", "swam", ["swimmed", "swims", "swimming"]], ["Yesterday he ___ a picture of a horse.", "drew", ["drawed", "draws", "drawing"]], ["Last week I ___ my friend a letter.", "wrote", ["writed", "writes", "writing"]], ["Yesterday Dad ___ a cake.", "made", ["maked", "makes", "making"]], ["Yesterday the kids ___ tag.", "played", ["plaied", "plays", "playing"]], ["A minute ago the frog ___ into the pond.", "hopped", ["hoped", "hops", "hopping"]], ["Last night the baby ___ a lot.", "cried", ["cryed", "cries", "crying"]], ["Yesterday I ___ my bike to school.", "rode", ["rided", "rides", "riding"]], ["Last year we ___ a big snowman.", "built", ["builded", "builds", "building"]]];
topic(8, "english", {
  id: "past", title: "Past Tense Verbs", icon: "⏪", blurb: "Talk about things that already happened.",
  lesson: [
    { t: "Already happened", say: "Past tense verbs tell about things that already happened. Most verbs just add e d. Today I jump. Yesterday I jumped.", html: table([["jump", `jump<b class="hl">ed</b>`], ["play", `play<b class="hl">ed</b>`], ["walk", `walk<b class="hl">ed</b>`]], ["Today", "Yesterday"]) },
    { t: "Spelling tricks", say: "Some words change a little. Hop becomes hopped, we double the p. Cry becomes cried, the y changes to i.", html: table([["hop", `hop<b class="hl">ped</b>`, "double the last letter"], ["cry", `cr<b class="hl">ied</b>`, "y → i, add ed"]], ["Verb", "Past", "Rule"]) },
    { t: "Irregular verbs", say: "Some verbs change completely. Go becomes went. Eat becomes ate. See becomes saw. You have to learn these by heart.", html: `<div class="pairs">${[["go", "went"], ["eat", "ate"], ["see", "saw"], ["run", "ran"]].map(([a, b]) => `<div class="pair">${chip(a, a, "lg")}${arrow()}${chip(`<b class="hl">${b}</b>`, b, "lg")}</div>`).join("")}</div>` },
  ],
  gen() {
    const [s, a, d] = pick(PAST);
    return { q: `<div class="sentence">${s.replace("___", '<span class="blank">___</span>')}</div>`, say: `Which word fits? ${s}`, opts: shuffle([a, ...d]), ans: a, big: 1, why: s.replace("___", a), key: s };
  },
});

const PASS8 = [
  { p: "Max has a small brown puppy named Biscuit. Every morning, Max fills Biscuit's bowl with food. Then they walk to the park. Biscuit loves to chase the ducks, but he never catches them.", qs: [["What is the puppy's name?", "Biscuit", ["Max", "Brownie", "Duke"]], ["Where do Max and Biscuit walk?", "to the park", ["to school", "to the beach", "to the store"]], ["What does Biscuit like to chase?", "ducks", ["cats", "cars", "squirrels"]]] },
  { p: "Lena planted a sunflower seed in a pot. She watered it every day and put it in the sunny window. After two weeks, a tiny green sprout poked out of the soil. By summer, the sunflower was taller than Lena!", qs: [["What did Lena plant?", "a sunflower seed", ["a tomato", "a tree", "a rose"]], ["Where did she put the pot?", "in the sunny window", ["in the closet", "under the bed", "in the garage"]], ["What happened by summer?", "The sunflower was taller than Lena.", ["The sunflower died.", "Lena moved away.", "The pot broke."]]] },
  { p: "It was raining hard, so Omar could not play soccer outside. He felt grumpy. Then his sister had an idea. They built a blanket fort in the living room and read comics with a flashlight. Omar decided rainy days were not so bad.", qs: [["Why couldn't Omar play soccer?", "It was raining.", ["He was sick.", "It was night.", "His ball was lost."]], ["How did Omar feel at first?", "grumpy", ["excited", "sleepy", "scared"]], ["What did they build?", "a blanket fort", ["a snowman", "a sandcastle", "a robot"]]] },
  { p: "Grace wanted to build the tallest block tower in class. She stacked big blocks on the bottom and small blocks on the top. Each time the tower wobbled, she moved the blocks closer to the middle. When she finished, the tower reached the top of the bookshelf!", qs: [["What did Grace want to build?", "the tallest block tower", ["a sandcastle", "a birdhouse", "a paper plane"]], ["Where did she put the big blocks?", "on the bottom", ["on the top", "on the bookshelf", "in a box"]], ["What did she do when the tower wobbled?", "moved the blocks closer to the middle", ["knocked it down", "cried for help", "added more small blocks"]]] },
  { p: "Every fall, monarch butterflies fly south to Mexico. Some fly more than two thousand miles! They rest on trees during the cold winter. In spring, the butterflies begin their long trip back north.", qs: [["Where do monarch butterflies fly in the fall?", "to Mexico", ["to Canada", "to the moon", "to the ocean"]], ["Where do they rest in winter?", "on trees", ["in caves", "under water", "in houses"]], ["When do they fly back north?", "in spring", ["in fall", "at night", "in winter"]]] },
  { p: "Honeybees live together in a hive. The queen bee lays the eggs. Worker bees collect nectar from flowers and turn it into honey. Bees also help flowers grow by carrying pollen from one flower to another.", qs: [["Who lays the eggs?", "the queen bee", ["the worker bees", "the flowers", "the beekeeper"]], ["What do worker bees make from nectar?", "honey", ["milk", "juice", "bread"]], ["How do bees help flowers?", "They carry pollen.", ["They water them.", "They pick them.", "They eat the leaves."]]] },
];
topic(8, "english", {
  id: "reading8", title: "Reading Stories", icon: "📖", blurb: "Read short stories and answer questions.",
  lesson: [
    { t: "Read it all first", say: "Read the whole story once. Then read the question. Then look back in the story to find the answer.", html: `<ol class="steps"><li>📖 Read the story</li><li>❓ Read the question</li><li>🔍 Look back to find the answer</li></ol>` },
    { t: "Ask who, what, where", say: "Good readers ask: Who is in the story? What happens? Where does it happen?", html: passage(`<b class="who">Mia</b> <b class="what">found a lost kitten</b> <b class="where">in her backyard</b>. She gave it a bowl of milk.`) + `<div class="legend"><span><i class="who-sw"></i>who</span><span><i class="what-sw"></i>what</span><span><i class="where-sw"></i>where</span></div>` },
    { t: "Prove it", say: "The answer is often right there in the story. Find the sentence that proves your answer. Where did Mia find the kitten? In her backyard!", html: passage(`Mia found a lost kitten <mark>in her backyard</mark>. She gave it a bowl of milk.`) + note("❓ Where did Mia find the kitten? → <b>in her backyard</b>") },
  ],
  gen() {
    const i = R(0, PASS8.length - 1), P = PASS8[i], [q, a, d] = pick(P.qs);
    return { q, vis: passage(P.p), say: `${P.p} ${q}`, opts: shuffle([a, ...d]), ans: a, why: proofSentence(P.p, a), extra: 20, key: i + q };
  },
});

/* ====================== AGE 8 · MATH ====================== */
topic(8, "math", {
  id: "mult", title: "Multiplication", icon: "✖️", blurb: "Equal groups and arrays.",
  lesson: [
    { t: "Equal groups", say: "3 plates with 4 cookies on each. That is 3 groups of 4, which makes 12. We write 3 times 4 equals 12.", html: plates(3, 4) + eq("3 × 4 = <b>12</b>") },
    { t: "Arrays", say: "An array is things set out in rows and columns. 3 rows of 5 dots makes 15.", html: arrayDots(3, 5) + eq("3 × 5 = <b>15</b>") },
    { t: "Turn it around", say: "3 times 5 is the same as 5 times 3. Turn the array on its side, and you still have 15 dots!", html: row(arrayDots(3, 5, "#3D7BFF"), arrayDots(5, 3, "#1FAF6E")) + eq("3 × 5 = 5 × 3 = <b>15</b>") },
  ],
  gen() {
    const a = R(2, 10), b = R(2, 10), p = a * b;
    const opts = numU(p, [p + a, p - a, p + b, p - b, a + b], 4, 1);
    if (p <= 40 && Math.random() < 0.5) return { q: `How many dots? <b>${a} × ${b}</b>`, say: `${a} rows of ${b}. How many dots?`, vis: arrayDots(a, b), opts, ans: String(p), big: 1, why: `${a} rows of ${b} = ${p}.`, key: a + "x" + b };
    if (Math.random() < 0.3) { const t = pick(THINGS); return { q: `${a} bags each have ${b} ${pl(b, t)}. How many ${t[1]} in all?`, vis: eq(`${a} × ${b} = ${blank()}`), opts, ans: String(p), big: 1, why: `${a} groups of ${b} is ${p}.`, key: "w" + a + b }; }
    return { q: `What is ${a} × ${b}?`, vis: eq(`${a} × ${b} = ${blank()}`), opts, ans: String(p), big: 1, why: `${a} groups of ${b} is ${p}.`, key: a + "x" + b };
  },
});

topic(8, "math", {
  id: "div", title: "Division", icon: "➗", blurb: "Share things into equal groups.",
  lesson: [
    { t: "Sharing equally", say: "12 cookies shared equally by 3 friends. Each friend gets 4 cookies.", html: `<div class="grp wrap">${Array(12).fill("<span>🍪</span>").join("")}</div>` + arrow() + plates(3, 4) },
    { t: "The division sign", say: "We write this as 12 divided by 3 equals 4.", html: eq("12 ÷ 3 = <b>4</b>") + note("÷ means <b>share into equal groups</b>") },
    { t: "Use what you know", say: "Think of multiplication. 3 times what makes 12? 3 times 4 is 12, so 12 divided by 3 is 4.", html: eq("3 × <b>4</b> = 12") + eq("12 ÷ 3 = <b>4</b>") },
  ],
  gen() {
    const q = R(2, 10), k = R(2, 6), n = q * k, t = pick(THINGS);
    if (n <= 30 && Math.random() < 0.6) return { q: `Share ${n} ${t[1]} equally among ${k} friends. How many does each friend get?`, vis: `<div class="grp wrap">${Array(n).fill(`<span>${t[0]}</span>`).join("")}</div>${plates(k)}`, opts: numU(q, [q + 1, q - 1, k, q + 2], 3, 1), ans: String(q), big: 1, why: `${n} ÷ ${k} = ${q}, because ${k} × ${q} = ${n}.`, key: "s" + n + k };
    return { q: `What is ${n} ÷ ${k}?`, vis: eq(`${n} ÷ ${k} = ${blank()}`), opts: numU(q, [q + 1, q - 1, k, q + 2], 3, 1), ans: String(q), big: 1, why: `${k} × ${q} = ${n}, so ${n} ÷ ${k} = ${q}.`, key: n + "/" + k };
  },
});

const FNAME = { 2: ["half", "halves"], 3: ["third", "thirds"], 4: ["fourth", "fourths"], 5: ["fifth", "fifths"], 6: ["sixth", "sixths"], 8: ["eighth", "eighths"] };
const NUMW = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight"];
const fracWords = (k, d) => `${NUMW[k]} ${k === 1 ? FNAME[d][0] : FNAME[d][1]}`;
topic(8, "math", {
  id: "fractions", title: "Fractions", icon: "🍕", blurb: "Halves, thirds, fourths and more.",
  lesson: [
    { t: "Equal parts", say: "A fraction is part of a whole. First, the whole is cut into equal parts. This pizza has 4 equal parts.", html: row(pie(4, 0, 150, "#FF7A59"), `<span class="emo xxl">🍕</span>`) },
    { t: "Top and bottom", say: "The bottom number tells how many equal parts there are. The top number tells how many parts are shaded. 3 out of 4 parts are shaded, so it is three fourths.", html: row(pie(4, 3, 150, "#FF7A59"), `<div class="frac-explain">${frac(3, 4)}<div><b>3</b> shaded parts<br><b>4</b> equal parts</div></div>`) },
    { t: "Halves, thirds, fourths", say: "One half, one third, and one fourth. The more parts you cut, the smaller each part gets.", html: `<div class="shape-row">${[[2, "one half"], [3, "one third"], [4, "one fourth"]].map(([d, n]) => `<figure>${pie(d, 1, 100, "#3D7BFF")}<figcaption>${frac(1, d)}<br>${n}</figcaption></figure>`).join("")}</div>` },
  ],
  gen() {
    const d = pick([2, 3, 4, 6, 8]), k = R(1, d - 1);
    if (Math.random() < 0.6) {
      const vis = Math.random() < 0.5 ? pie(d, k, 160, pick(["#3D7BFF", "#FF7A59", "#1FAF6E"])) : bar(d, k);
      return { q: "What fraction is shaded?", vis, opts: uniq(frac(k, d), [d - k !== k ? frac(d - k, d) : null, frac(k, d + 1), frac(d, k), k + 1 < d ? frac(k + 1, d) : frac(k, d - 1 > k ? d - 1 : d + 2)]), ans: frac(k, d), big: 1, why: `${k} of the ${d} equal parts are shaded: ${fracWords(k, d)}.`, key: "s" + k + d };
    }
    const cands = [];
    for (const dd of [2, 3, 4, 6, 8]) for (let kk = 1; kk < dd; kk++) if (kk * d !== k * dd) cands.push([kk, dd]);
    const opts = [[k, d], ...shuffle(cands).slice(0, 3)].map(([a, b]) => pie(b, a, 96, "#9B5DE5"));
    return { q: `Which picture shows ${frac(k, d)}?`, say: `Which picture shows ${fracWords(k, d)}?`, opts: shuffle(opts), ans: pie(d, k, 96, "#9B5DE5"), sayAns: fracWords(k, d), why: `Look for ${d} equal parts with ${k} shaded.`, key: "p" + k + d };
  },
});

topic(8, "math", {
  id: "rounding", title: "Rounding", icon: "🎯", blurb: "Round to the nearest ten or hundred.",
  lesson: [
    { t: "Nearest ten", say: "Rounding means finding the closest ten. 43 is between 40 and 50. It is closer to 40, so 43 rounds to 40.", html: numberLine(40, 50, { labelEvery: 5, mark: 43 }) + eq("43 → <b>40</b>") },
    { t: "The 5 rule", say: "Look at the ones digit. If it is 5 or more, round up. If it is 4 or less, round down. 45 rounds up to 50.", html: numberLine(40, 50, { labelEvery: 5, mark: 45 }) + table([["0, 1, 2, 3, 4", "round down ⬇️"], ["5, 6, 7, 8, 9", "round up ⬆️"]], ["Ones digit", "What to do"]) },
    { t: "Nearest hundred", say: "For hundreds, look at the tens digit. 362 has a 6 in the tens place. 6 is 5 or more, so 362 rounds up to 400.", html: numberLine(300, 400, { step: 10, labelEvery: 50, mark: 362 }) + eq("362 → <b>400</b>") },
  ],
  gen() {
    if (Math.random() < 0.55) {
      let n = R(11, 99); while (n % 10 === 0) n = R(11, 99);
      const lo = n - n % 10, ans = n % 10 >= 5 ? lo + 10 : lo;
      return { q: `Round <b>${n}</b> to the nearest ten.`, say: `Round ${n} to the nearest ten.`, vis: numberLine(lo, lo + 10, { labelEvery: 5, mark: n }), opts: numU(ans, [ans === lo ? lo + 10 : lo, n, lo - 10 > 0 ? lo - 10 : lo + 20, ans + 1]), ans: String(ans), big: 1, why: n % 10 >= 5 ? `The ones digit is ${n % 10}. That is 5 or more, so round up to ${ans}.` : `The ones digit is ${n % 10}. That is less than 5, so round down to ${ans}.`, key: "t" + n };
    }
    let n = R(101, 989); while (n % 100 === 0 || n % 10 === 0) n = R(101, 989);
    const lo = n - n % 100, tens = Math.floor(n % 100 / 10), ans = tens >= 5 ? lo + 100 : lo;
    return { q: `Round <b>${n}</b> to the nearest hundred.`, say: `Round ${n} to the nearest hundred.`, vis: numberLine(lo, lo + 100, { step: 10, labelEvery: 50, mark: n }), opts: numU(ans, [ans === lo ? lo + 100 : lo, Math.round(n / 10) * 10, lo + 50], 100, 0), ans: String(ans), big: 1, why: tens >= 5 ? `The tens digit is ${tens}. That is 5 or more, so round up to ${ans}.` : `The tens digit is ${tens}. That is less than 5, so round down to ${ans}.`, key: "h" + n };
  },
});

topic(8, "math", {
  id: "perimeter", title: "Perimeter", icon: "📏", blurb: "Measure the distance around a shape.",
  lesson: [
    { t: "All the way around", say: "Perimeter is the distance all the way around the outside of a shape. Imagine an ant walking around the edge!", html: row(rectDims(5, 3, { unit: "cm", labels: false, fill: "#E3F8EE" }), `<span class="emo xxl">🐜</span>`) },
    { t: "Add all the sides", say: "This rectangle is 5 centimeters long and 3 centimeters wide. Add all 4 sides. 5 plus 3 plus 5 plus 3 equals 16 centimeters.", html: rectDims(5, 3, { unit: "cm", all: true }) + eq("5 + 3 + 5 + 3 = <b>16 cm</b>") },
    { t: "A shortcut", say: "A rectangle has two long sides and two short sides. Add the length and the width, then double it. 5 plus 3 is 8. 8 times 2 is 16.", html: eq("(5 + 3) × 2 = <b>16 cm</b>") + note("Opposite sides of a rectangle are the <b>same length</b>.") },
  ],
  gen() {
    const w = R(3, 10), h = R(2, 8), p = 2 * (w + h);
    const sq = Math.random() < 0.2;
    if (sq) { const s = R(2, 9); return { q: `A square has sides of ${s} cm. What is its perimeter?`, vis: rectDims(s, s, { unit: "cm" }), opts: numU(4 * s, [s * s, 2 * s, 3 * s, 4 * s + 2], 4, 1).map(x => x + " cm"), ans: 4 * s + " cm", big: 1, why: `A square has 4 equal sides: ${s} × 4 = ${4 * s} cm.`, key: "sq" + s }; }
    return { q: "What is the perimeter of this rectangle?", vis: rectDims(w, h, { unit: "cm" }), opts: numU(p, [w * h, w + h, 2 * w + h, p + 2], 4, 1).map(x => x + " cm"), ans: p + " cm", big: 1, why: `${w} + ${h} + ${w} + ${h} = ${p} cm.`, key: w + "x" + h };
  },
});

topic(8, "math", {
  id: "time5", title: "Time to 5 Minutes", icon: "⏰", blurb: "Read clocks like 2:25 and 7:40.",
  lesson: [
    { t: "Count by 5s", say: "The long hand counts minutes. Each number on the clock is 5 more minutes. 1 means 5, 2 means 10, 3 means 15, all the way to 12, which means 0.", html: clock(12, 0, 220, true) + note("Blue numbers show the <b>minutes</b>.") },
    { t: "Read the time", say: "The short hand is just past 2, so the hour is 2. The long hand is on 5. Count by fives: 5, 10, 15, 20, 25. It is 2:25.", html: row(clock(2, 25, 190, true), `<div class="big-time">2:25</div>`) },
    { t: "Quarter past and quarter to", say: "15 minutes after the hour is called quarter past. 45 minutes after is quarter to the next hour. 3:15 is quarter past 3. 3:45 is quarter to 4.", html: `<div class="shape-row"><figure>${clock(3, 15, 120)}<figcaption><b>3:15</b><br>quarter past 3</figcaption></figure><figure>${clock(3, 45, 120)}<figcaption><b>3:45</b><br>quarter to 4</figcaption></figure></div>` },
  ],
  gen() {
    const h = R(1, 12), m = 5 * R(0, 11), t = `${h}:${pad2(m)}`, mh = m / 5 === 0 ? 12 : m / 5;
    return { q: "What time does the clock show?", vis: clock(h, m), opts: uniq(t, [`${mh}:${pad2((h * 5) % 60)}`, `${h}:${pad2((m + 5) % 60)}`, `${h % 12 + 1}:${pad2(m)}`, `${h}:${pad2(m / 5)}`]), ans: t, big: 1, why: `The short hand is ${m >= 30 ? "past" : "near"} ${h}. The long hand is on ${mh}, and ${mh === 12 ? "12 means 0" : `${mh} × 5 = ${m}`} minutes. It is ${t}.`, key: t };
  },
});

/* ====================== AGE 9 · ENGLISH ====================== */
const HOMO = [["___ going to the zoo today.", "They're", ["Their", "There"]], ["Put the book over ___.", "there", ["their", "they're"]], ["The kids packed ___ lunches.", "their", ["there", "they're"]], ["I have ___ cats.", "two", ["to", "too"]], ["Can I come ___?", "too", ["to", "two"]], ["We walked ___ the store.", "to", ["too", "two"]], ["___ my best friend.", "You're", ["Your"]], ["Is this ___ hat?", "your", ["you're"]], ["The dog wagged ___ tail.", "its", ["it's"]], ["___ raining outside.", "It's", ["Its"]], ["Can you ___ the music?", "hear", ["here"]], ["Please sit over ___.", "here", ["hear"]], ["I will ___ a letter.", "write", ["right"]], ["Turn ___ at the corner.", "right", ["write"]], ["We saw a whale in the ___.", "sea", ["see"]], ["I want to ___ a new bike.", "buy", ["by", "bye"]], ["___ did you put my shoes?", "Where", ["Wear", "Were"]], ["I ___ my coat when it's cold.", "wear", ["where", "were"]]];
const HMEAN = { their: "belongs to them", there: "a place", "they're": "they are", to: "toward", too: "also, or very", two: "the number 2", your: "belongs to you", "you're": "you are", its: "belongs to it", "it's": "it is", hear: "listen with your ears", here: "this place", write: "put words on paper", right: "the opposite of left, or correct", sea: "the ocean", see: "look with your eyes", buy: "pay for something", by: "next to", where: "what place", wear: "put on clothes" };
topic(9, "english", {
  id: "homophones", title: "Homophones", icon: "👂", blurb: "their, there, they're and other sound-alikes.",
  lesson: [
    { t: "Sound alike, mean different", say: "Homophones sound the same but are spelled differently and mean different things. Their, there, and they're are homophones.", html: table([["their", "belongs to them", "their dog"], ["there", "a place", "over there"], ["they're", "they are", "they're here"]], ["Word", "Meaning", "Example"]) },
    { t: "To, too, two", say: "To means toward. Too means also, or very. Two is the number 2.", html: table([["to", "toward", "go to school"], ["too", "also / very", "me too! too hot"], ["two", "the number 2", "two cats"]], ["Word", "Meaning", "Example"]) },
    { t: "The apostrophe trick", say: "Try reading the long form. If it is or you are fits, use the word with the apostrophe. It's raining means it is raining.", html: table([["it's", "it is", "It's sunny."], ["its", "belongs to it", "The cat licked its paw."], ["you're", "you are", "You're kind."], ["your", "belongs to you", "your bag"]], ["Word", "Long form / meaning", "Example"]) },
  ],
  gen() {
    const [s, a, d] = pick(HOMO);
    return { q: `<div class="sentence">${s.replace("___", '<span class="blank">___</span>')}</div>`, say: `Which word fits? ${s.replace("___", "blank")}`, opts: shuffle([a, ...d]), ans: a, big: 1, why: `"${a}" means ${HMEAN[a.toLowerCase()]}.`, key: s };
  },
});

const SUFF = [["careful", "care", "ful", "full of care"], ["hopeful", "hope", "ful", "full of hope"], ["joyful", "joy", "ful", "full of joy"], ["fearless", "fear", "less", "without fear"], ["helpless", "help", "less", "without help"], ["endless", "end", "less", "without an end"], ["kindness", "kind", "ness", "being kind"], ["darkness", "dark", "ness", "being dark"], ["quickly", "quick", "ly", "in a quick way"], ["softly", "soft", "ly", "in a soft way"], ["painter", "paint", "er", "a person who paints"], ["teacher", "teach", "er", "a person who teaches"]];
const SMEAN = { ful: "full of", less: "without", ly: "in a ___ way", ness: "the state of being", er: "a person who" };
topic(9, "english", {
  id: "suffixes", title: "Suffixes", icon: "🔚", blurb: "-ful, -less, -ly, -ness and -er.",
  lesson: [
    { t: "A suffix goes at the end", say: "A suffix is a word part added to the end of a word. It changes the meaning. Care plus ful makes careful, which means full of care.", html: row(hw("care"), `<span class="sym">+</span>`, hw(`<b class="hl">ful</b>`), `<span class="sym">=</span>`, hw(`care<b class="hl">ful</b>`)) },
    { t: "What suffixes mean", say: "Ful means full of. Less means without. L y means in a certain way. Ness means the state of being. E r means a person who.", html: table([["-ful", "full of", "joyful"], ["-less", "without", "fearless"], ["-ly", "in a ___ way", "quickly"], ["-ness", "being", "kindness"], ["-er", "a person who", "teacher"]], ["Suffix", "Means", "Example"]) },
    { t: "Spelling changes", say: "Watch the spelling. Happy plus ness becomes happiness. The y changes to i.", html: row(hw("happy + ness"), arrow(), hw(`happ<b class="hl">i</b>ness`)) },
  ],
  gen() {
    const [w, b, s, m] = pick(SUFF);
    if (Math.random() < 0.6) { const others = shuffle(SUFF.filter(x => x[0] !== w && x[2] !== s)).slice(0, 3).map(x => x[3]); return { q: `What does <b>${w}</b> mean?`, say: `What does ${w} mean?`, opts: shuffle([m, ...others]), ans: m, why: `-${s} means "${SMEAN[s]}", so ${w} means ${m}.`, key: "m" + w }; }
    return { q: `Which suffix means <b>"${SMEAN[s]}"</b>?`, say: `Which suffix means ${SMEAN[s].replace("___", "certain")}?`, opts: shuffle(["ful", "less", "ly", "ness", "er"].filter(x => x !== s)).slice(0, 3).concat(s).map(x => "-" + x).sort(() => Math.random() - 0.5), ans: "-" + s, big: 1, why: `-${s} means "${SMEAN[s]}", like in ${w}.`, key: "s" + s };
  },
});

const FIG = { Simile: ["Her smile was as bright as the sun.", "He ran like the wind.", "The baby slept like a log.", "The snow was as white as milk.", "She is as busy as a bee."], Metaphor: ["My brother is a couch potato.", "The classroom was a zoo.", "Time is a thief.", "Her voice was music to my ears.", "The stars were diamonds in the sky."], Personification: ["The wind whispered through the trees.", "The sun smiled down on us.", "The leaves danced in the breeze.", "My alarm clock yelled at me.", "The old car coughed and groaned."], Hyperbole: ["I'm so hungry I could eat a horse.", "I've told you a million times!", "This backpack weighs a ton.", "I waited forever for the bus.", "My legs are so tired they could fall off."] };
const FIGWHY = { Simile: "It compares two things using like or as.", Metaphor: "It says one thing IS something else, without like or as.", Personification: "It gives human actions to something that is not human.", Hyperbole: "It is a huge exaggeration that is not meant to be true." };
topic(9, "english", {
  id: "figurative", title: "Figurative Language", icon: "🌈", blurb: "Similes, metaphors, personification and hyperbole.",
  lesson: [
    { t: "Similes", say: "A simile compares two things using the words like or as. He ran like the wind. Her smile was as bright as the sun.", html: `<div class="quote">He ran <b class="hl">like</b> the wind. 🌬️</div><div class="quote">Her smile was <b class="hl">as</b> bright <b class="hl">as</b> the sun. ☀️</div>` },
    { t: "Metaphors", say: "A metaphor says one thing is something else. The classroom was a zoo. It was not really a zoo. It was very noisy and wild!", html: `<div class="quote">The classroom <b class="hl">was a zoo</b>. 🐒</div>` + note("It means the classroom was noisy and wild.") },
    { t: "Personification and hyperbole", say: "Personification gives human actions to things. The wind whispered. Hyperbole is a huge exaggeration. I'm so hungry I could eat a horse!", html: `<div class="quote">The wind <b class="hl">whispered</b>. 🍃<small>personification</small></div><div class="quote">I could <b class="hl">eat a horse</b>! 🐴<small>hyperbole</small></div>` },
  ],
  gen() {
    const type = pick(Object.keys(FIG)), s = pick(FIG[type]);
    return { q: "What kind of figurative language is this?", say: `What kind of figurative language is this? ${s}`, vis: `<div class="quote">${s}</div>`, opts: shuffle(Object.keys(FIG)), ans: type, big: 1, why: FIGWHY[type], key: s };
  },
});

const ADV = [["The turtle moved slowly.", "slowly", "how"], ["She sang loudly at the concert.", "loudly", "how"], ["We will go to the park tomorrow.", "tomorrow", "when"], ["The kids played outside.", "outside", "where"], ["He quickly ate his lunch.", "quickly", "how"], ["The cat sleeps upstairs.", "upstairs", "where"], ["Yesterday we visited Grandma.", "Yesterday", "when"], ["Tom carefully carried the eggs.", "carefully", "how"], ["The baby giggled happily.", "happily", "how"], ["We arrived early.", "early", "when"], ["The puppy ran everywhere.", "everywhere", "where"], ["Please speak softly.", "softly", "how"]];
topic(9, "english", {
  id: "adverbs", title: "Adverbs", icon: "💨", blurb: "Words that tell how, when or where.",
  lesson: [
    { t: "Adverbs describe verbs", say: "An adverb tells more about a verb. She sang loudly. Loudly tells how she sang.", html: `<div class="sentence big-sentence">She <b class="verb">sang</b> <b class="hl">loudly</b>. 🎤</div>` + note("<b>loudly</b> tells <b>how</b> she sang") },
    { t: "How, when, where", say: "Adverbs answer the questions how, when and where. Quickly tells how. Tomorrow tells when. Outside tells where.", html: table([["How?", "quickly, softly, carefully"], ["When?", "tomorrow, early, yesterday"], ["Where?", "outside, upstairs, everywhere"]], ["Question", "Adverbs"]) },
    { t: "Look for -ly", say: "Many adverbs end in l y. Quick becomes quickly. Happy becomes happily.", html: `<div class="pairs">${[["quick", "quickly"], ["soft", "softly"], ["happy", "happily"]].map(([a, b]) => `<div class="pair">${chip(a, a, "lg")}${arrow()}${chip(b.replace(/ly$/, '<b class="hl">ly</b>'), b, "lg")}</div>`).join("")}</div>` },
  ],
  gen() {
    const [s, a, t] = pick(ADV);
    if (Math.random() < 0.6) return { q: `Which word is the <b>adverb</b>?<div class="sentence">${s}</div>`, say: `Which word is the adverb? ${s}`, opts: sentOpts(s, a, ["table", "garden", "jumped", "red"]), ans: a, big: 1, why: `${cap(a)} tells ${t} about the verb.`, key: "a" + s };
    return { q: `Does <b>${a.toLowerCase()}</b> tell how, when, or where?<div class="sentence">${hlWord(s, a)}</div>`, say: `In this sentence, does ${a} tell how, when, or where? ${s}`, opts: ["how", "when", "where"], ans: t, big: 1, why: `${cap(a)} tells ${t}.`, key: "t" + s };
  },
});

const CONTR = [["do not", "don't"], ["can not", "can't"], ["I am", "I'm"], ["it is", "it's"], ["they are", "they're"], ["we will", "we'll"], ["she is", "she's"], ["you have", "you've"], ["did not", "didn't"], ["would not", "wouldn't"], ["let us", "let's"], ["I will", "I'll"], ["is not", "isn't"], ["we are", "we're"], ["will not", "won't"]];
topic(9, "english", {
  id: "contractions", title: "Contractions", icon: "✂️", blurb: "Squeeze two words into one.",
  lesson: [
    { t: "Two words become one", say: "A contraction squeezes two words into one. Do not becomes don't. The apostrophe takes the place of the missing letter.", html: row(hw("do n<s class='gone-l'>o</s>t"), arrow(), hw(`don<b class="hl">'</b>t`)) + note("The <b>'</b> stands in for the missing <b>o</b>.") },
    { t: "Common contractions", say: "I am becomes I'm. It is becomes it's. They are becomes they're. We will becomes we'll.", html: table([["I am", "I'm"], ["it is", "it's"], ["they are", "they're"], ["we will", "we'll"], ["did not", "didn't"]], ["Two words", "Contraction"]) },
    { t: "A special one", say: "Will not becomes won't. It changes more than usual, so learn it by heart!", html: row(hw("will not"), arrow(), hw(`<b class="hl">won't</b>`)) },
  ],
  gen() {
    const [l, c] = pick(CONTR);
    const noApos = c.replace("'", ""), i = c.indexOf("'"), shifted = i > 1 ? c.slice(0, i - 1) + "'" + c[i - 1] + c.slice(i + 1) : c.slice(0, i) + c[i + 1] + "'" + c.slice(i + 2);
    if (Math.random() < 0.65) return { q: `What is the contraction for <b>${l}</b>?`, say: `What is the contraction for ${l}?`, opts: uniq(c, [shifted, noApos, pick(CONTR.filter(x => x[1] !== c))[1]]), ans: c, big: 1, why: `${l} → ${c}. The apostrophe replaces the missing letters.`, key: "c" + c };
    const others = shuffle(CONTR.filter(x => x[1] !== c)).slice(0, 3).map(x => x[0]);
    return { q: `What two words make <b>${c}</b>?`, say: `What two words make ${c}?`, opts: shuffle([l, ...others]), ans: l, big: 1, why: `${c} is short for ${l}.`, key: "w" + c };
  },
});

const PASS9 = [
  { p: "Octopuses are clever animals. They can twist open jars to get the food inside. Some octopuses in aquariums have even learned to sneak out of their tanks at night and return before morning. Scientists study octopuses to learn more about how their brains work.", qs: [["What is the main idea?", "Octopuses are clever animals.", ["Octopuses live in jars.", "Aquariums close at night.", "Scientists like the ocean."]], ["Why do you think the octopuses return before morning?", "So nobody notices they left.", ["They are afraid of the dark.", "They forgot the way.", "The tanks are warmer at night."]]] },
  { p: "Priya stared at the blank page. The art contest ended tomorrow, and she still had no idea what to draw. She looked out the window and saw her grandfather in the garden, his straw hat tipped low as he pulled weeds. Priya smiled and picked up her pencil.", qs: [["What will Priya most likely draw?", "her grandfather in the garden", ["a spaceship", "her school", "a blank page"]], ["How did Priya feel at the start?", "stuck and worried", ["proud and happy", "angry at her grandfather", "sleepy and bored"]]] },
  { p: "Long ago, sailors used the stars to find their way across the ocean. The North Star stays in almost the same spot in the sky all night. By finding it, sailors could tell which direction was north, even when there was no land in sight.", qs: [["What is the main idea?", "Sailors used stars to find their way.", ["Stars are very hot.", "The ocean is big and deep.", "Sailors liked to sleep outside."]], ["Why was the North Star useful to sailors?", "It stays in about the same place.", ["It is the brightest star.", "It only shines in summer.", "It moves to show the way."]]] },
  { p: "Jonah's hands shook as he stepped onto the stage. He looked out at the rows of parents and took a deep breath. Then he lifted his violin, closed his eyes, and began to play. When the last note ended, the whole room stood up and clapped.", qs: [["How did Jonah feel before he played?", "nervous", ["bored", "angry", "sleepy"]], ["How did the audience feel about his playing?", "They loved it.", ["They were bored.", "They wanted to leave.", "They could not hear it."]]] },
  { p: "Cactus plants grow in hot, dry deserts. Their thick stems store water for many months. Sharp spines protect them from thirsty animals. Some cactuses only bloom at night, when it is cooler.", qs: [["What is the main idea?", "Cactuses have ways to live in the desert.", ["Deserts are cold at night.", "Animals are always thirsty.", "Flowers only bloom in spring."]], ["Why might some cactuses bloom at night?", "It is cooler, so they lose less water.", ["They are afraid of the sun.", "Bees only fly at night.", "They are too sleepy in the day."]]] },
  { p: "The town library was going to close because it did not have enough money. The students at Oak Street School held a bake sale, a car wash and a book fair. Together they raised over two thousand dollars. The library stayed open, and the mayor thanked the students in a speech.", qs: [["What is this passage mostly about?", "Students worked together to save the library.", ["How to bake cookies.", "The mayor's favorite books.", "Why car washes are fun."]], ["Which word best describes the students?", "helpful", ["lazy", "selfish", "sleepy"]]] },
];
topic(9, "english", {
  id: "reading9", title: "Main Idea & Inference", icon: "🔍", blurb: "Find the big idea and read between the lines.",
  lesson: [
    { t: "The main idea", say: "The main idea is what the whole passage is mostly about. Ask yourself: if I had to tell a friend in one sentence, what would I say?", html: passage("Dolphins are very social. They live in groups called pods. They play together and even help injured pod members swim.") + note("Main idea: <b>Dolphins are social animals.</b>") },
    { t: "Details support it", say: "Details are the smaller facts that support the main idea. Living in pods and helping each other are details that show dolphins are social.", html: `<div class="idea-tree"><div class="idea-main">Dolphins are social</div><div class="idea-details"><span>live in pods</span><span>play together</span><span>help injured friends</span></div></div>` },
    { t: "Making an inference", say: "An inference is a smart guess. You use clues from the text plus what you already know. Sam grabbed his umbrella and boots. What can you infer? It is probably raining!", html: passage("Sam grabbed his umbrella and put on his boots before heading out.") + eq("clues + what I know = <b>inference</b>") + note("It is probably <b>raining</b> ☔") },
  ],
  gen() {
    const i = R(0, PASS9.length - 1), P = PASS9[i], [q, a, d] = pick(P.qs);
    return { q, vis: passage(P.p), say: `${P.p} ${q}`, opts: shuffle([a, ...d]), ans: a, why: q.includes("main") || q.includes("mostly") ? `"${a}" is what the whole passage is about, not just one detail.` : (pf => pf ? `The clues point to it: ${pf}` : `"${a}" fits all the clues in the passage.`)(proofSentence(P.p, a, true)), extra: 25, key: i + q };
  },
});

/* ====================== AGE 9 · MATH ====================== */
topic(9, "math", {
  id: "mult2", title: "Bigger Multiplication", icon: "✖️", blurb: "Multiply 2-digit numbers by 1-digit numbers.",
  lesson: [
    { t: "Break it apart", say: "To work out 23 times 4, break 23 into 20 and 3.", html: eq("23 = <span class='d-t'>20</span> + <span class='d-o'>3</span>") + areaModel(23, 4, false) },
    { t: "Multiply each part", say: "20 times 4 equals 80. 3 times 4 equals 12.", html: areaModel(23, 4, true) },
    { t: "Add the parts", say: "Add the two parts together. 80 plus 12 equals 92. So 23 times 4 equals 92.", html: eq("80 + 12 = <b>92</b>") + eq("23 × 4 = <b>92</b>") },
  ],
  gen() {
    let a = R(12, 99); while (a % 10 === 0) a = R(12, 99);
    const b = R(3, 9), p = a * b, tens = a - a % 10, ones = a % 10;
    return { q: `What is ${a} × ${b}?`, vis: areaModel(a, b, false), opts: numU(p, [tens * b + ones, p + b, p - 10, p + 10, tens * b], 6, 1), ans: String(p), big: 1, why: `${tens} × ${b} = ${tens * b} and ${ones} × ${b} = ${ones * b}. ${tens * b} + ${ones * b} = ${p}.`, key: a + "x" + b };
  },
});

topic(9, "math", {
  id: "divrem", title: "Division with Remainders", icon: "🎁", blurb: "What to do with the leftovers.",
  lesson: [
    { t: "Leftovers", say: "14 cookies go into bags of 4. You can fill 3 bags, and 2 cookies are left over. We write 14 divided by 4 equals 3 remainder 2.", html: plates(3, 4) + `<div class="left">left over: ${grp(2, "🍪")}</div>` + eq("14 ÷ 4 = <b>3 R 2</b>") },
    { t: "The remainder rule", say: "The remainder must always be smaller than the number you divide by. If it's bigger, you can fill another group!", html: note("Dividing by <b>4</b>? The remainder can only be <b>0, 1, 2 or 3</b>.") },
    { t: "Check your work", say: "To check, multiply and add the remainder. 3 times 4 is 12. 12 plus 2 is 14. It checks out!", html: eq("3 × 4 + 2 = <b>14</b> ✔") },
  ],
  gen() {
    const b = R(3, 9), q = R(2, 12), r = R(1, b - 1), n = b * q + r, ans = `${q} R ${r}`;
    const wrongR = r + 1 < b ? r + 1 : r - 1;
    const opts = uniq(ans, [`${q} R ${wrongR}`, `${q + 1} R ${r}`, q > 2 ? `${q - 1} R ${r + b}` : null, `${q} R 0`]);
    if (Math.random() < 0.4) return { q: `${n} stickers go onto pages that hold ${b} each. How many full pages, and how many left over?`, vis: eq(`${n} ÷ ${b} = ${blank()}`), opts, ans, big: 1, why: `${b} × ${q} = ${b * q}, and ${n} − ${b * q} = ${r} left over.`, key: "w" + n + b };
    return { q: `What is ${n} ÷ ${b}?`, vis: eq(`${n} ÷ ${b} = ${blank()}`), opts, ans, big: 1, why: `${b} × ${q} = ${b * q}, and ${n} − ${b * q} = ${r} left over.`, key: n + "/" + b };
  },
});

const gcd = (a, b) => b ? gcd(b, a % b) : a;
topic(9, "math", {
  id: "equivfrac", title: "Equivalent Fractions", icon: "🟰", blurb: "Different fractions, same amount.",
  lesson: [
    { t: "Same size, different names", say: "Look at these two bars. One half is shaded on the top. Two fourths are shaded on the bottom. They cover the same amount! One half equals two fourths.", html: bar(2, 1, 280, 40, "#9B5DE5") + bar(4, 2, 280, 40, "#1FAF6E") + eq(`${frac(1, 2)} = ${frac(2, 4)}`) },
    { t: "Multiply top and bottom", say: "To make an equivalent fraction, multiply the top and the bottom by the same number. 1 times 2 is 2. 2 times 2 is 4.", html: eq(`${frac(1, 2)} × ${frac(2, 2)} = ${frac(2, 4)}`) + note("Multiplying by 2 over 2 is like multiplying by 1.") },
    { t: "Simplify", say: "You can also divide the top and bottom by the same number. 6 eighths divided by 2 over 2 is 3 fourths.", html: eq(`${frac(6, 8)} ÷ ${frac(2, 2)} = ${frac(3, 4)}`) },
  ],
  gen() {
    const b = pick([2, 3, 4, 5]), a = R(1, b - 1), m = pick([2, 3, 4]), top = a * m, bot = b * m;
    if (Math.random() < 0.6) return { q: `Find the missing number: ${frac(a, b)} = ${frac("?", bot)}`, say: `${a} over ${b} equals what over ${bot}?`, vis: bar(b, a, 280, 40, "#9B5DE5") + bar(bot, 0, 280, 40), opts: numU(top, [a + m, top + 1, top - 1, bot - top, a], 3, 1), ans: String(top), big: 1, why: `Multiply top and bottom by ${m}: ${a} × ${m} = ${top}, ${b} × ${m} = ${bot}.`, key: "m" + a + b + m };
    const cands = [];
    for (let bb = 2; bb <= 12; bb++) for (let aa = 1; aa < bb; aa++) if (aa * b !== a * bb && gcd(aa, bb) === 1 || (aa * b !== a * bb && bb % 2 === 0)) cands.push([aa, bb]);
    return { q: `Which fraction is equal to ${frac(a, b)}?`, say: `Which fraction is equal to ${a} over ${b}?`, vis: bar(b, a, 280, 40, "#9B5DE5"), opts: uniq(frac(top, bot), shuffle(cands).slice(0, 6).map(([x, y]) => frac(x, y))), ans: frac(top, bot), big: 1, why: `${a} × ${m} = ${top} and ${b} × ${m} = ${bot}, so they are equal.`, key: "e" + a + b + m };
  },
});

topic(9, "math", {
  id: "decimals", title: "Decimals", icon: "🔟", blurb: "Tenths and hundredths.",
  lesson: [
    { t: "Tenths", say: "This bar is cut into 10 equal parts. 3 parts are shaded. That is 3 tenths, written as 0.3.", html: bar(10, 3, 300, 44, "#9B5DE5") + eq(`${frac(3, 10)} = <b>0.3</b>`) },
    { t: "Hundredths", say: "This square is cut into 100 small parts. 45 are shaded. That is 45 hundredths, written as 0.45.", html: row(decGrid(45), `<div class="big-time">0.45</div>`) + table([["0", ".", "4", "5"]], ["ones", "", "tenths", "hundredths"]) },
    { t: "Comparing decimals", say: "Which is bigger, 0.5 or 0.45? Write 0.5 as 0.50. 50 hundredths is more than 45 hundredths, so 0.5 is bigger!", html: row(col(decGrid(50), "<b>0.5 = 0.50</b>"), col(decGrid(45), "<b>0.45</b>")) },
  ],
  gen() {
    const t = R(0, 2);
    if (t === 0) { let k = R(1, 99); while (k % 10 === 0) k = R(1, 99); const ans = `0.${pad2(k)}`; return { q: "What decimal is shaded?", vis: decGrid(k), opts: uniq(ans, [`${Math.floor(k / 10)}.${k % 10}`, `0.${pad2(100 - k)}`, String(k), `0.${k % 10}${Math.floor(k / 10)}`]), ans, big: 1, why: `${k} out of 100 squares are shaded: ${k} hundredths = ${ans}.`, key: "g" + k }; }
    if (t === 1) { const k = R(1, 9), ans = `0.${k}`; return { q: "What decimal is shaded?", vis: bar(10, k, 300, 44, "#9B5DE5"), opts: uniq(ans, [`0.0${k}`, `${k}.0`, 10 - k !== k ? `0.${10 - k}` : `0.${k}${k}`, String(k)]), ans, big: 1, why: `${k} of 10 parts are shaded: ${k} tenths = ${ans}.`, key: "b" + k }; }
    const d = R(2, 9), e = R(1, 9), A = `0.${d}`, B = `0.${d - 1}${e}`, greater = Math.random() < 0.5;
    return { q: `Which is <b>${greater ? "greater" : "smaller"}</b>?`, say: `Which is ${greater ? "greater" : "smaller"}: ${A} or ${B}?`, opts: shuffle([A, B]), ans: greater ? A : B, big: 1, why: `${A} = 0.${d}0, which is ${d}0 hundredths. ${B} is ${d - 1}${e} hundredths. So ${A} is greater.`, key: A + B + greater };
  },
});

topic(9, "math", {
  id: "area", title: "Area", icon: "⬛", blurb: "Count the squares that cover a shape.",
  lesson: [
    { t: "Covering a shape", say: "Area is how much space a flat shape covers. We measure it by counting unit squares.", html: rectDims(4, 3, { grid: true, labels: false }) + note("Count the squares: <b>12</b>") },
    { t: "Rows times columns", say: "You don't have to count every square. This rectangle has 3 rows of 4 squares. 3 times 4 equals 12 square units.", html: rectDims(4, 3, { grid: true, unit: "units" }) + eq("4 × 3 = <b>12 square units</b>") },
    { t: "Area or perimeter?", say: "Area covers the inside. Perimeter goes around the outside. For this 4 by 3 rectangle, the area is 12 square units, and the perimeter is 14 units.", html: table([["Area", "inside ⬛", "4 × 3 = 12"], ["Perimeter", "around the edge 🐜", "4 + 3 + 4 + 3 = 14"]], ["", "Measures", "Example"]) },
  ],
  gen() {
    const w = R(2, 9), h = R(2, 7), a = w * h;
    if (Math.random() < 0.55) return { q: "What is the area of this rectangle?", vis: rectDims(w, h, { grid: true, unit: "" }), opts: numU(a, [2 * (w + h), w + h, a + w, a - h], 4, 1).map(x => x + " sq units"), ans: a + " sq units", why: `${w} × ${h} = ${a} square units.`, key: "g" + w + h };
    const L = R(3, 12), W = R(2, 9), A = L * W;
    return { q: `A garden is ${L} m long and ${W} m wide. What is its area?`, vis: `<span class="emo xxl">🌱</span>`, opts: numU(A, [2 * (L + W), L + W, A + L, A - W], 4, 1).map(x => x + " sq m"), ans: A + " sq m", why: `Area = length × width = ${L} × ${W} = ${A} square meters.`, key: "w" + L + W };
  },
});

const ANG = { acute: () => 5 * R(5, 15), right: () => 90, obtuse: () => 5 * R(21, 32), straight: () => 180 };
const ANGWHY = { acute: "An acute angle is smaller than a right angle.", right: "A right angle is a perfect square corner (90°).", obtuse: "An obtuse angle is bigger than a right angle, but not straight.", straight: "A straight angle is a straight line (180°)." };
topic(9, "math", {
  id: "angles", title: "Angles", icon: "📐", blurb: "Acute, right, obtuse and straight angles.",
  lesson: [
    { t: "What is an angle?", say: "An angle is made when two lines meet at a point. The point is called the vertex. The corner of a book is an angle.", html: row(angleSVG(55), `<span class="emo xxl">📘</span>`) + note("The dot where the lines meet is the <b>vertex</b>.") },
    { t: "Right angles", say: "A right angle is a square corner, like the corner of a piece of paper. It measures 90 degrees.", html: row(angleSVG(90)) + note("Look for the little square: it means <b>90°</b>.") },
    { t: "Smaller, bigger, straight", say: "An acute angle is smaller than a right angle. An obtuse angle is bigger than a right angle. A straight angle is a straight line.", html: `<div class="shape-row">${[[45, "acute", "less than 90°"], [130, "obtuse", "more than 90°"], [180, "straight", "180°"]].map(([d, n, s]) => `<figure>${angleSVG(d, 0.62)}<figcaption><b>${n}</b><br>${s}</figcaption></figure>`).join("")}</div>` },
  ],
  gen() {
    const type = pick(Object.keys(ANG)), deg = ANG[type]();
    if (Math.random() < 0.6) return { q: "What kind of angle is this?", vis: angleSVG(deg), opts: shuffle(Object.keys(ANG)), ans: type, big: 1, why: ANGWHY[type], key: type + deg };
    const opts = Object.keys(ANG).map(t => angleSVG(t === type ? deg : ANG[t](), 0.6));
    const ansSvg = opts[Object.keys(ANG).indexOf(type)];
    return { q: `Which one is ${/^[aeiou]/.test(type) ? "an" : "a"} <b>${type}</b> angle?`, say: `Which one is ${/^[aeiou]/.test(type) ? "an" : "a"} ${type} angle?`, opts: shuffle(opts), ans: ansSvg, sayAns: `the ${type} angle`, why: ANGWHY[type], key: "p" + type };
  },
});

topic(9, "math", {
  id: "factors", title: "Factors & Multiples", icon: "🔗", blurb: "Numbers that multiply and skip-count.",
  lesson: [
    { t: "Factors", say: "Factors are numbers that multiply together to make another number. 3 times 4 equals 12, so 3 and 4 are factors of 12.", html: arrayDots(3, 4) + eq("3 × 4 = 12") },
    { t: "All the factors of 12", say: "12 can be made as 1 times 12, 2 times 6, and 3 times 4. So the factors of 12 are 1, 2, 3, 4, 6 and 12.", html: table([["1 × 12"], ["2 × 6"], ["3 × 4"]], ["Ways to make 12"]) + train([1, 2, 3, 4, 6, 12]) },
    { t: "Multiples", say: "Multiples are what you get when you skip count. The multiples of 3 are 3, 6, 9, 12, 15, and so on.", html: numberLine(0, 15, { step: 1, labelEvery: 3, hops: { from: 0, n: 5, dir: 3 } }) + train([3, 6, 9, 12, 15, "…"]) },
  ],
  gen() {
    if (Math.random() < 0.5) {
      const n = pick([12, 16, 18, 20, 24, 28, 30, 36, 40, 42, 48]);
      const f = range(2, n - 1).filter(x => n % x === 0), nf = range(2, Math.min(n - 1, 15)).filter(x => n % x !== 0), a = pick(f);
      return { q: `Which number is a <b>factor</b> of ${n}?`, say: `Which number is a factor of ${n}?`, opts: shuffle([a, ...shuffle(nf).slice(0, 3)]).map(String), ans: String(a), big: 1, why: `${a} × ${n / a} = ${n}, so ${a} is a factor of ${n}.`, key: "f" + n + a };
    }
    const k = R(3, 9), a = k * R(3, 10);
    const bad = [a + 1, a - 1, a + 2, a - 2, a + k - 1].filter(x => x % k !== 0 && x > 0);
    return { q: `Which number is a <b>multiple</b> of ${k}?`, say: `Which number is a multiple of ${k}?`, opts: uniq(a, shuffle(bad)), ans: String(a), big: 1, why: `${k} × ${a / k} = ${a}.`, key: "m" + k + a };
  },
});

