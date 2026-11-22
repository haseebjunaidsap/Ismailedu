/* =====================================================================
   More topics (added in version 2)
   ===================================================================== */

/* ---------- extra visual helpers ---------- */
function ruler(start, end, max = 15, colr = "#FF7A59") {
  const u = 22, pad = 16, W = max * u + pad * 2, H = 108, ry = 58;
  let s = svgOpen(W, H, `ruler, object from ${start} to ${end} centimeters`);
  s += `<rect x="${pad + start * u}" y="18" width="${(end - start) * u - 10}" height="24" rx="4" fill="${colr}" stroke="${INK}" stroke-width="2"/><polygon points="${pad + end * u - 10},18 ${pad + end * u},30 ${pad + end * u - 10},42" fill="#FFE3C4" stroke="${INK}" stroke-width="2"/>`;
  s += `<rect x="${pad - 8}" y="${ry}" width="${max * u + 16}" height="44" rx="5" fill="#FFE58A" stroke="${INK}" stroke-width="2"/>`;
  for (let i = 0; i <= max; i++) {
    const x = pad + i * u;
    s += `<line x1="${x}" y1="${ry}" x2="${x}" y2="${ry + 16}" stroke="${INK}" stroke-width="2"/><text x="${x}" y="${ry + 32}" text-anchor="middle" font-size="12" font-family="${FONT}" font-weight="600" fill="${INK}">${i}</text>`;
    if (i < max) s += `<line x1="${x + u / 2}" y1="${ry}" x2="${x + u / 2}" y2="${ry + 9}" stroke="${INK}" stroke-width="1.2"/>`;
  }
  return s + `<text x="${W - pad}" y="${ry + 42}" text-anchor="end" font-size="10" font-family="${FONT}" fill="${INK}">cm</text></svg>`;
}

function barGraph(items, max = 10, title = "") {
  const W = 340, H = 250, left = 36, bottom = 200, top = 30, bw = 44, gap = (W - left - 10 - items.length * bw) / items.length;
  const y = v => bottom - (v / max) * (bottom - top);
  let s = svgOpen(W, H, title || "bar graph");
  for (let v = 0; v <= max; v += 2) s += `<line x1="${left}" y1="${f1(y(v))}" x2="${W - 8}" y2="${f1(y(v))}" stroke="#D5E0F2" stroke-width="1"/><text x="${left - 8}" y="${f1(y(v))}" text-anchor="end" dominant-baseline="central" font-size="12" font-family="${FONT}" fill="${INK}">${v}</text>`;
  const cols = ["#FF7A59", "#3D7BFF", "#1FAF6E", "#9B5DE5"];
  items.forEach(([e, v], i) => {
    const x = left + gap / 2 + i * (bw + gap);
    s += `<rect x="${f1(x)}" y="${f1(y(v))}" width="${bw}" height="${f1(bottom - y(v))}" rx="4" fill="${cols[i % 4]}"/>`;
    s += `<text x="${f1(x + bw / 2)}" y="${bottom + 26}" text-anchor="middle" font-size="24" font-family="${"'Apple Color Emoji','Segoe UI Emoji','Noto Color Emoji',sans-serif"}">${e}</text>`;
  });
  s += `<line x1="${left}" y1="${bottom}" x2="${W - 8}" y2="${bottom}" stroke="${INK}" stroke-width="2.5"/><line x1="${left}" y1="${top - 8}" x2="${left}" y2="${bottom}" stroke="${INK}" stroke-width="2.5"/>`;
  if (title) s += `<text x="${W / 2}" y="16" text-anchor="middle" font-size="14" font-weight="600" font-family="${FONT}" fill="${INK}">${title}</text>`;
  return s + "</svg>";
}

function pairDots(n) {
  const cols = Math.ceil(n / 2);
  return `<div class="pdots">${Array.from({ length: cols }, (_, c) => `<span class="pcol${c * 2 + 1 === n ? " lone" : ""}"><i></i>${c * 2 + 1 < n ? "<i></i>" : ""}</span>`).join("")}</div>`;
}

function scene(pos, e = "⚽") {
  if (pos === "between") return `<div class="scene row"><span class="emo xl">📦</span><span class="emo xl">${e}</span><span class="emo xl">📦</span></div>`;
  return `<div class="scene pos-${pos.replace(" ", "-")}"><span class="emo xl box">📦</span><span class="emo xl thing">${e}</span></div>`;
}

const NUMWORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty"];
const fmtN = n => n.toLocaleString("en-US");
const fmtTime = mins => { mins = ((mins % 720) + 720) % 720; const h = Math.floor(mins / 60) || 12; return `${h}:${pad2(mins % 60)}`; };

/* ====================== AGE 6 · ENGLISH (more) ====================== */
const ENDW = [["cat", "🐱"], ["dog", "🐶"], ["sun", "☀️"], ["bus", "🚌"], ["bed", "🛏️"], ["cup", "☕"], ["hen", "🐔"], ["fox", "🦊"], ["web", "🕸️"], ["pig", "🐷"], ["box", "📦"], ["hat", "🎩"], ["bug", "🐛"], ["jam", "🍓"], ["van", "🚐"], ["log", "🪵"], ["car", "🚗"], ["bell", "🔔"], ["leaf", "🍃"], ["drum", "🥁"]];
topic(6, "english", {
  id: "endsound", title: "Ending Sounds", icon: "🔚", blurb: "Listen for the last sound in a word.",
  lesson: [
    { t: "The last sound", say: "Words have a sound at the end too! Say cat slowly. C, a, T. The last sound is t.", html: row(bigEmo("🐱"), `<div class="sound-boxes"><span class="sb">c</span><span class="sb">a</span><span class="sb on">t</span></div>`) },
    { t: "Stretch the word", say: "Stretch the word like a rubber band. Sun. Sss, uh, nnn. It ends with n.", html: row(bigEmo("☀️"), hw(`su<b class="hl">n</b>`, "big")) + note("Say it slowly and listen to the <b>end</b>.") },
    { t: "Tap and listen", say: "Tap each picture and listen to the last sound.", html: `<div class="card-grid">${[["🐶", "dog"], ["🚌", "bus"], ["☕", "cup"], ["🦊", "fox"], ["🔔", "bell"], ["🥁", "drum"]].map(([e, w]) => picCard(e, `${w.slice(0, -1)}<b class="hl">${w.slice(-1)}</b>`, `${w}. ends with ${w.slice(-1)}`)).join("")}</div>` },
  ],
  gen() {
    const [w, e] = pick(ENDW), last = w.slice(-1);
    const pool = shuffle("bdgklmnpstx".split("").filter(x => x !== last)).slice(0, 3);
    return { q: "What sound does this word <b>end</b> with?", say: `What sound does ${w} end with?`, vis: col(bigEmo(e), hw(`${w.slice(0, -1)}<span class="blank">?</span>`)), opts: shuffle([last, ...pool]), ans: last, big: 1, why: `${cap(w)} ends with the ${last} sound.`, key: w };
  },
});

const COLORS = [["red", "🔴"], ["blue", "🔵"], ["green", "🟢"], ["yellow", "🟡"], ["orange", "🟠"], ["purple", "🟣"], ["brown", "🟤"], ["black", "⚫"], ["white", "⚪"]];
const COLOR_THINGS = [["🍌", "a banana", "yellow"], ["🍓", "a strawberry", "red"], ["🐸", "a frog", "green"], ["🥕", "a carrot", "orange"], ["🍇", "grapes", "purple"], ["🐻", "a bear", "brown"], ["❄️", "snow", "white"], ["🌽", "corn", "yellow"], ["🥦", "broccoli", "green"]];
const cOpt = ([w, e]) => `<span class="emo" title="${w}">${e}</span>`;
topic(6, "english", {
  id: "colors", title: "Color Words", icon: "🌈", blurb: "Read the words for colors.",
  lesson: [
    { t: "Colors have names", say: "Every color has a word. Tap each color to hear its name.", html: `<div class="card-grid">${COLORS.slice(0, 6).map(([w, e]) => picCard(e, w, w)).join("")}</div>` },
    { t: "More colors", say: "Brown, black and white are colors too!", html: `<div class="card-grid">${COLORS.slice(6).map(([w, e]) => picCard(e, w, w)).join("")}</div>` },
    { t: "Colors in sentences", say: "Read these. The banana is yellow. The frog is green.", html: `<div class="sentence big-sentence">The banana is <b style="color:#C79A00">yellow</b>. 🍌</div><div class="sentence big-sentence">The frog is <b style="color:#1FAF6E">green</b>. 🐸</div>` },
  ],
  gen() {
    const k = R(0, 2);
    if (k === 0) { const c = pick(COLORS); return { q: "What color is this?", vis: `<span class="emo" style="font-size:96px">${c[1]}</span>`, opts: shuffle([c[0], ...shuffle(COLORS.filter(x => x !== c)).slice(0, 3).map(x => x[0])]), ans: c[0], big: 1, why: `That color is ${c[0]}.`, key: "a" + c[0] }; }
    if (k === 1) { const c = pick(COLORS); return { q: `Find the color <b>${c[0]}</b>`, say: `Find the color ${c[0]}`, vis: hw(c[0]), opts: shuffle([c, ...shuffle(COLORS.filter(x => x !== c)).slice(0, 3)]).map(cOpt), ans: cOpt(c), why: `This is ${c[0]}.`, key: "b" + c[0] }; }
    const [e, n, c] = pick(COLOR_THINGS);
    const pl = /s$/.test(n) && !/(grass|glass)$/.test(n); return { q: `What color ${pl ? "are" : "is"} ${n}?`, vis: bigEmo(e), opts: shuffle([c, ...shuffle(COLORS.map(x => x[0]).filter(x => x !== c)).slice(0, 3)]), ans: c, big: 1, why: `${cap(n)} ${pl ? "are" : "is"} ${c}.`, key: "c" + n };
  },
});

const PICSENT = [["The dog runs.", "🐕", "dog"], ["The sun is hot.", "☀️", "sun"], ["I see a big fish.", "🐟", "fish"], ["The bird can fly.", "🐦", "bird"], ["A frog can hop.", "🐸", "frog"], ["I like cake.", "🎂", "cake"], ["The bus is yellow.", "🚌", "bus"], ["The car is fast.", "🏎️", "car"], ["I see the moon.", "🌙", "moon"], ["The baby is sad.", "😢", "sad face"], ["A bee is on a flower.", "🐝", "bee"], ["Mom has a hat.", "👒", "hat"], ["The cat is asleep.", "😴", "sleepy face"], ["I can kick the ball.", "⚽", "ball"], ["The tree is big.", "🌳", "tree"], ["It is a red apple.", "🍎", "apple"]];
const psOpt = ([, e, n]) => `<span class="emo" title="${n}">${e}</span>`;
topic(6, "english", {
  id: "picsent", title: "Picture Sentences", icon: "🖼️", blurb: "Read a sentence and find the picture.",
  lesson: [
    { t: "Read, then picture it", say: "When you read a sentence, make a picture in your head. The dog runs. Can you see a dog running?", html: col(`<div class="sentence big-sentence">The dog runs.</div>`, `<span class="emo xxl">🐕💨</span>`) },
    { t: "Find the key word", say: "Look for the naming word. In the sun is hot, the naming word is sun. That tells you the picture!", html: col(`<div class="sentence big-sentence">The <b class="hl">sun</b> is hot.</div>`, bigEmo("☀️")) },
    { t: "Try it", say: "Tap each sentence to hear it. Then look at its picture.", html: `<div class="pairs">${PICSENT.slice(2, 5).map(([s, e]) => `<div class="pair">${chip(s, s, "lg")}<span class="emo xl">${e}</span></div>`).join("")}</div>` },
  ],
  gen() {
    const it = pick(PICSENT), others = shuffle(PICSENT.filter(x => x !== it && x[1] !== it[1] && x[2] !== it[2] && !it[0].toLowerCase().includes(x[2].split(" ")[0]) && !x[0].toLowerCase().includes(it[2].split(" ")[0]))).slice(0, 3);
    return { q: `<div class="sentence big-sentence">${it[0]}</div>Which picture matches?`, say: `${it[0]} Which picture matches?`, opts: shuffle([it, ...others]).map(psOpt), ans: psOpt(it), why: `"${it[0]}" is about the ${it[2]}.`, key: it[0] };
  },
});

/* ====================== AGE 6 · MATH (more) ====================== */
const PAT_SETS = [["🔴", "🔵", "🟡"], ["⭐", "🌙", "☀️"], ["🍎", "🍌", "🍇"], ["🐶", "🐱", "🐭"], ["🟢", "🟣", "🟠"], ["🚗", "🚌", "🚲"]];
const PAT_TYPES = [[0, 1], [0, 0, 1], [0, 1, 1], [0, 1, 2]];
topic(6, "math", {
  id: "patterns", title: "Patterns", icon: "🔁", blurb: "Find what comes next.",
  lesson: [
    { t: "What is a pattern?", say: "A pattern repeats again and again. Red, blue, red, blue, red, blue. What comes next? Red!", html: train(["🔴", "🔵", "🔴", "🔵", "🔴", "🔵", "?"]) + note("Say it out loud: red, blue, red, blue…") },
    { t: "Find the part that repeats", say: "Star, star, moon. Star, star, moon. The part that repeats is star, star, moon.", html: `<div class="train"><span class="car">⭐</span><span class="car">⭐</span><span class="car">🌙</span></div><div class="train"><span class="car">⭐</span><span class="car">⭐</span><span class="car">🌙</span></div>` },
    { t: "Three in a row", say: "Some patterns have three things. Apple, banana, grapes. Apple, banana, grapes.", html: train(["🍎", "🍌", "🍇", "🍎", "🍌", "🍇"]) },
  ],
  gen() {
    const set = pick(PAT_SETS), type = pick(PAT_TYPES), len = R(5, 8);
    const seq = Array.from({ length: len + 1 }, (_, i) => set[type[i % type.length]]), ans = seq[len];
    const extra = PAT_SETS.flat().filter(x => !set.includes(x));
    return { q: "What comes <b>next</b>?", say: "What comes next in the pattern?", vis: train([...seq.slice(0, len), "?"]), opts: uniq(ans, shuffle(set).concat(shuffle(extra))).map(x => `<span class="emo">${x}</span>`), ans: `<span class="emo">${ans}</span>`, sayAns: "the next picture in the pattern", why: `The same group of ${type.length} pictures repeats over and over (${type.map(t => set[t]).join(" ")}). Keep the group going to find the next one.`, key: set[0] + type.join("") + len };
  },
});

topic(6, "math", {
  id: "doubles", title: "Doubles", icon: "👯", blurb: "Add a number to itself: 3 + 3.",
  lesson: [
    { t: "Doubles are twins", say: "A double is when you add a number to itself. 3 plus 3 is a double. It makes 6!", html: `<div class="eqrow">${grp(3, "🐞")}<span class="sym">+</span>${grp(3, "🐞")}</div>` + eq("3 + 3 = <b>6</b>") },
    { t: "Doubles all around", say: "A spider has 4 legs on each side. 4 plus 4 equals 8. Your hands have 5 fingers each. 5 plus 5 equals 10.", html: row(col(`<span class="emo xxl">🕷️</span>`, eq("4 + 4 = <b>8</b>")), col(`<span class="emo xxl">🙌</span>`, eq("5 + 5 = <b>10</b>"))) },
    { t: "Learn them by heart", say: "1 plus 1 is 2. 2 plus 2 is 4. 3 plus 3 is 6. 4 plus 4 is 8. 5 plus 5 is 10.", html: table(range(1, 5).map(n => [`${n} + ${n}`, `<b>${n * 2}</b>`]), ["Double", "Makes"]) },
  ],
  gen() {
    const n = R(1, 10), t = pick(THINGS);
    return { q: Math.random() < 0.5 ? `What is ${n} + ${n}?` : `What is double ${n}?`, vis: n <= 6 ? `<div class="eqrow">${grp(n, t[0])}<span class="sym">+</span>${grp(n, t[0])}</div>` : eq(`${n} + ${n} = ${blank()}`), opts: numU(2 * n, [2 * n + 1, 2 * n - 1, n + 1, 2 * n + 2], 3, 0), ans: String(2 * n), big: 1, why: `${n} + ${n} = ${2 * n}`, key: "d" + n };
  },
});

topic(6, "math", {
  id: "numwords", title: "Number Words", icon: "🔡", blurb: "Read words like seven and twelve.",
  lesson: [
    { t: "Numbers have words", say: "We can write a number with digits, like 3. Or with a word, like three.", html: row(`<div class="big-time">3</div>`, `<span class="sym">=</span>`, hw("three"), tenframe(3, "🍎")) },
    { t: "One to ten", say: "Tap each word to hear it.", html: `<div class="chips">${range(1, 10).map(n => chip(`${n} ${NUMWORDS[n]}`, NUMWORDS[n], "lg")).join("")}</div>` },
    { t: "Eleven to twenty", say: "Teen numbers end with teen. Thirteen, fourteen, fifteen.", html: `<div class="chips">${range(11, 20).map(n => chip(`${n} ${NUMWORDS[n]}`, NUMWORDS[n])).join("")}</div>` },
  ],
  gen() {
    const n = R(0, 20), near = [n + 1, n - 1, n + 2, n - 2, n + 10, n - 10].filter(x => x >= 0 && x <= 20);
    if (Math.random() < 0.5) return { q: `Which number is <b>${NUMWORDS[n]}</b>?`, say: `Which number is ${NUMWORDS[n]}?`, vis: hw(NUMWORDS[n]), opts: uniq(n, shuffle(near)), ans: String(n), big: 1, why: `${cap(NUMWORDS[n])} is ${n}.`, key: "a" + n };
    return { q: `Which word means <b>${n}</b>?`, say: `Which word means ${n}?`, vis: n <= 20 && n > 0 ? tenframe(n, "⭐") : eq(String(n)), opts: uniq(NUMWORDS[n], shuffle(near).map(x => NUMWORDS[x])), ans: NUMWORDS[n], big: 1, why: `${n} is written ${NUMWORDS[n]}.`, key: "b" + n };
  },
});

/* ====================== AGE 7 · ENGLISH (more) ====================== */
const BLENDS = [["bl", "blocks", "🧱"], ["fl", "flag", "🚩"], ["fr", "frog", "🐸"], ["tr", "tree", "🌳"], ["st", "star", "⭐"], ["sn", "snake", "🐍"], ["cr", "crab", "🦀"], ["dr", "drum", "🥁"], ["gl", "globe", "🌍"], ["pl", "plane", "✈️"], ["gr", "grapes", "🍇"], ["cl", "clock", "🕰️"], ["sl", "sled", "🛷"], ["sp", "spoon", "🥄"], ["sw", "swan", "🦢"], ["br", "bread", "🍞"], ["tr", "train", "🚂"], ["sn", "snail", "🐌"]];
topic(7, "english", {
  id: "blends", title: "Blends", icon: "🌀", blurb: "Two sounds squished together: fr, st, bl.",
  lesson: [
    { t: "Blend the sounds", say: "In a blend, you can hear both letters. F, r, fr. Fr, og. Frog!", html: row(`<div class="sound-boxes"><span class="sb on">f</span><span class="sb on">r</span><span class="sb">o</span><span class="sb">g</span></div>`, bigEmo("🐸")) },
    { t: "Meet some blends", say: "Tap each picture. Listen to the two sounds at the start.", html: `<div class="card-grid">${BLENDS.slice(3, 9).map(([b, w, e]) => picCard(e, `<b class="hl">${b}</b>${w.slice(2)}`, `${b}. ${w}`)).join("")}</div>` },
    { t: "Blend or team?", say: "In a blend like s t, you hear both letters. In a team like s h, you hear one new sound.", html: table([[`<b class="hl">st</b>ar`, "s + t (two sounds)"], [`<b class="hl">sh</b>ip`, "sh (one sound)"]], ["Word", "Sounds"]) },
  ],
  gen() {
    const [b, w, e] = pick(BLENDS), pool = shuffle([...new Set(BLENDS.map(x => x[0]))].filter(x => x !== b)).slice(0, 3);
    return { q: "Which blend starts the word?", say: `Which blend starts the word ${w}?`, vis: col(bigEmo(e), hw(`<span class="blank">__</span>${w.slice(2)}`)), opts: shuffle([b, ...pool]), ans: b, big: 1, why: `${cap(w)} starts with ${b}: ${b}-${w.slice(2)}.`, key: w };
  },
});

const VTEAMS = [["rain", "ai", "🌧️"], ["snail", "ai", "🐌"], ["train", "ai", "🚂"], ["paint", "ai", "🎨"], ["bee", "ee", "🐝"], ["tree", "ee", "🌳"], ["sheep", "ee", "🐑"], ["feet", "ee", "🦶"], ["boat", "oa", "⛵"], ["goat", "oa", "🐐"], ["coat", "oa", "🧥"], ["soap", "oa", "🧼"], ["night", "igh", "🌃"], ["light", "igh", "💡"], ["play", "ay", "🛝"], ["hay", "ay", "🌾"]];
topic(7, "english", {
  id: "vteams", title: "Vowel Teams", icon: "🚣", blurb: "ai, ee, oa, ay and igh.",
  lesson: [
    { t: "Two vowels go walking", say: "When two vowels go walking, the first one does the talking. In boat, the o says its name. Oh!", html: row(hw(`b<b class="hl">oa</b>t`, "big"), bigEmo("⛵")) + note("<b>o</b> talks, <b>a</b> is quiet") },
    { t: "Meet the teams", say: "a i says ay, like rain. e e says ee, like bee. o a says oh, like goat. i g h says eye, like night.", html: `<div class="card-grid">${[["🌧️", "r", "ai", "n"], ["🐝", "b", "ee", ""], ["🐐", "g", "oa", "t"], ["🌃", "n", "igh", "t"]].map(([e, a, t, c]) => picCard(e, `${a}<b class="hl">${t}</b>${c}`, a + t + c)).join("")}</div>` },
    { t: "ay at the end", say: "The team a y usually comes at the end of a word. Play, day, hay.", html: `<div class="chips">${["play", "day", "hay", "say"].map(w => chip(w.replace("ay", '<b class="hl">ay</b>'), w, "lg")).join("")}</div>` },
  ],
  gen() {
    const [w, t, e] = pick(VTEAMS), i = w.indexOf(t);
    const vb = i === 0 ? "starts" : i + t.length >= w.length ? "finishes" : "completes"; return { q: `Which vowel team ${vb} the word?`, say: `Which vowel team ${vb} the word ${w}?`, vis: col(bigEmo(e), hw(`${w.slice(0, i)}<span class="blank">__</span>${w.slice(i + t.length)}`)), opts: shuffle([t, ...shuffle(["ai", "ee", "oa", "igh", "ay"].filter(x => x !== t)).slice(0, 3)]), ans: t, big: 1, why: `${cap(w)} is spelled with ${t}.`, key: w };
  },
});

const SYLL = [["cat", "cat", "🐱"], ["sun", "sun", "☀️"], ["dog", "dog", "🐶"], ["apple", "ap-ple", "🍎"], ["rabbit", "rab-bit", "🐰"], ["pencil", "pen-cil", "✏️"], ["monkey", "mon-key", "🐒"], ["tiger", "ti-ger", "🐯"], ["pizza", "piz-za", "🍕"], ["butterfly", "but-ter-fly", "🦋"], ["banana", "ba-na-na", "🍌"], ["dinosaur", "di-no-saur", "🦕"], ["elephant", "el-e-phant", "🐘"], ["computer", "com-pu-ter", "💻"], ["caterpillar", "cat-er-pil-lar", "🐛"], ["watermelon", "wa-ter-mel-on", "🍉"], ["helicopter", "hel-i-cop-ter", "🚁"], ["frog", "frog", "🐸"]];
topic(7, "english", {
  id: "syllables", title: "Clap the Syllables", icon: "👏", blurb: "Count the beats in a word.",
  lesson: [
    { t: "Words have beats", say: "Syllables are the beats in a word. Clap as you say it. Ba, na, na. Three claps! Banana has 3 syllables.", html: col(bigEmo("🍌"), `<div class="claps"><span>ba</span><span>na</span><span>na</span></div>`) + note("👏 👏 👏 = 3 syllables") },
    { t: "Short and long words", say: "Cat has 1 clap. Rab, bit has 2. But, ter, fly has 3.", html: table([["🐱 cat", "👏", "1"], ["🐰 rab-bit", "👏 👏", "2"], ["🦋 but-ter-fly", "👏 👏 👏", "3"]], ["Word", "Claps", "Syllables"]) },
    { t: "Chin trick", say: "Put your hand under your chin and say the word. Each time your chin drops, that's one syllable!", html: row(`<span class="emo xxl">🤚</span>`, hw("wa-ter-mel-on")) + note("4 chin drops = 4 syllables 🍉") },
  ],
  gen() {
    const [w, sp, e] = pick(SYLL), n = sp.split("-").length;
    return { q: `How many syllables (claps) are in <b>${w}</b>?`, say: `How many syllables are in ${w}? Clap it out!`, vis: col(bigEmo(e), hw(w), `<button class="btn btn-sm btn-sun" data-say="${sp.split("-").join(", ")}">👏 Hear the claps</button>`), opts: ["1", "2", "3", "4"], ans: String(n), big: 1, why: `${sp}: ${n} ${n === 1 ? "clap" : "claps"}.`, key: w };
  },
});

/* ====================== AGE 7 · MATH (more) ====================== */
topic(7, "math", {
  id: "evenodd", title: "Even & Odd", icon: "🎲", blurb: "Can everything have a partner?",
  lesson: [
    { t: "Make pairs", say: "Put things in pairs. If every one has a partner, the number is even. 6 is even!", html: pairDots(6) + eq("6 is <b>even</b>") },
    { t: "One left over", say: "If one is left without a partner, the number is odd. 7 is odd.", html: pairDots(7) + eq("7 is <b>odd</b>") },
    { t: "Look at the last digit", say: "Even numbers end in 0, 2, 4, 6 or 8. Odd numbers end in 1, 3, 5, 7 or 9. So 24 is even and 37 is odd.", html: table([["0, 2, 4, 6, 8", "even", "24"], ["1, 3, 5, 7, 9", "odd", "37"]], ["Last digit", "", "Example"]) },
  ],
  gen() {
    const n = R(1, 40), ev = n % 2 === 0;
    if (Math.random() < 0.6) return { q: `Is <b>${n}</b> even or odd?`, say: `Is ${n} even or odd?`, vis: n <= 20 ? pairDots(n) : eq(String(n)), opts: ["even", "odd"], ans: ev ? "even" : "odd", big: 1, why: n <= 20 ? (ev ? "Every dot has a partner." : "One dot has no partner.") : `${n} ends in ${n % 10}, so it is ${ev ? "even" : "odd"}.`, key: "a" + n };
    const wantEven = Math.random() < 0.5, nums = new Set(); let a;
    do { a = R(1, 50); } while ((a % 2 === 0) !== wantEven);
    while (nums.size < 3) { const b = R(1, 50); if ((b % 2 === 0) !== wantEven) nums.add(b); }
    return { q: `Which number is <b>${wantEven ? "even" : "odd"}</b>?`, say: `Which number is ${wantEven ? "even" : "odd"}?`, opts: shuffle([a, ...nums]).map(String), ans: String(a), big: 1, why: `${a} ends in ${a % 10}, so it is ${wantEven ? "even" : "odd"}.`, key: "b" + a };
  },
});

topic(7, "math", {
  id: "missing", title: "Missing Numbers", icon: "❓", blurb: "Find the number hiding in the math.",
  lesson: [
    { t: "Something is hiding", say: "3 plus what equals 8? Start at 3 and count up to 8. 4, 5, 6, 7, 8. That's 5 hops. The missing number is 5!", html: eq(`3 + ${blank()} = 8`) + numberLine(0, 10, { hops: { from: 3, n: 5 } }) },
    { t: "Use a fact family", say: "3, 5 and 8 are a fact family. 3 plus 5 is 8. 5 plus 3 is 8. 8 minus 5 is 3. 8 minus 3 is 5.", html: `<div class="chips">${["3 + 5 = 8", "5 + 3 = 8", "8 − 5 = 3", "8 − 3 = 5"].map(s => `<span class="chip lg">${s}</span>`).join("")}</div>` },
    { t: "Subtract to find it", say: "What plus 6 equals 14? Take away: 14 minus 6 is 8. So 8 plus 6 equals 14.", html: eq(`${blank()} + 6 = 14`) + eq("14 − 6 = <b>8</b>") },
  ],
  gen() {
    const c = R(6, 20), a = R(1, c - 1), b = c - a, k = R(0, 2);
    if (k === 0) return { q: `What number is missing?`, say: `${a} plus what equals ${c}?`, vis: eq(`${a} + ${blank()} = ${c}`), opts: numU(b, [b + 1, b - 1, c, a], 3, 0), ans: String(b), big: 1, why: `${c} − ${a} = ${b}, so ${a} + ${b} = ${c}.`, key: "a" + a + c };
    if (k === 1) return { q: `What number is missing?`, say: `What plus ${b} equals ${c}?`, vis: eq(`${blank()} + ${b} = ${c}`), opts: numU(a, [a + 1, a - 1, c, b], 3, 0), ans: String(a), big: 1, why: `${c} − ${b} = ${a}, so ${a} + ${b} = ${c}.`, key: "b" + b + c };
    return { q: `What number is missing?`, say: `${c} minus what equals ${a}?`, vis: eq(`${c} − ${blank()} = ${a}`), opts: numU(b, [b + 1, b - 1, c + a, a], 3, 0), ans: String(b), big: 1, why: `${c} − ${b} = ${a}.`, key: "c" + a + c };
  },
});

const MEASURE = [["✏️", "pencil", "#FFC93C"], ["🖍️", "crayon", "#FF7A59"], ["🥕", "carrot", "#FF9A3C"], ["🐛", "caterpillar", "#1FAF6E"], ["🪥", "toothbrush", "#3D7BFF"], ["🥖", "bread", "#D69163"]];
topic(7, "math", {
  id: "measure", title: "Measuring Length", icon: "📏", blurb: "Use a ruler to measure in centimeters.",
  lesson: [
    { t: "Start at zero", say: "Line up one end of the object with the 0 on the ruler. Then look where the other end stops. This pencil stops at 6. It is 6 centimeters long.", html: ruler(0, 6) + eq("<b>6 cm</b>") },
    { t: "Centimeters", say: "A centimeter is about as wide as your little finger. We write it as c m.", html: row(`<span class="emo xxl">🤙</span>`, note("1 cm ≈ the width of your little finger")) },
    { t: "Not starting at zero?", say: "If the object starts at 2 and ends at 9, count the spaces between. 9 minus 2 equals 7 centimeters.", html: ruler(2, 9, 15, "#3D7BFF") + eq("9 − 2 = <b>7 cm</b>") },
  ],
  gen() {
    const [e, n, colr] = pick(MEASURE), len = R(2, 12), start = Math.random() < 0.3 ? R(1, 15 - len) : 0, end = start + len;
    return { q: `How long is the ${n}? <span class="emo">${e}</span>`, say: `How long is the ${n}?`, vis: ruler(start, end, 15, colr), opts: numU(len, [end, len + 1, len - 1, start ? start : len + 2], 2, 1).map(x => x + " cm"), ans: len + " cm", big: 1, why: start ? `It goes from ${start} to ${end}. ${end} − ${start} = ${len} cm.` : `It starts at 0 and ends at ${len}, so it is ${len} cm.`, key: n + start + end };
  },
});

/* ====================== AGE 8 · ENGLISH (more) ====================== */
const ABCW = ["apple", "banana", "cherry", "dog", "elephant", "frog", "garden", "house", "igloo", "jungle", "kite", "lemon", "monkey", "nest", "orange", "pizza", "queen", "rabbit", "snake", "tiger", "umbrella", "violin", "window", "yellow", "zebra"];
const ABC_SAME = [["ball", "bear", "bike", "boat", "bus"], ["cake", "cat", "cloud", "cup", "cow"], ["sand", "ship", "snow", "star", "sun"], ["tent", "tiger", "toy", "train", "tree"], ["map", "milk", "moon", "mouse", "music"], ["pan", "pet", "pig", "pond", "pup"]];
topic(8, "english", {
  id: "abc", title: "ABC Order", icon: "🔠", blurb: "Put words in alphabetical order.",
  lesson: [
    { t: "Look at the first letter", say: "To put words in ABC order, look at the first letter. Apple starts with a, dog with d, zebra with z. So the order is apple, dog, zebra.", html: `<div class="chips">${["🍎 apple", "🐶 dog", "🦓 zebra"].map(w => chip(w.replace(/(\s)(\w)/, '$1<b class="hl">$2</b>'), w.split(" ")[1], "lg")).join(arrow())}</div>` },
    { t: "Same first letter?", say: "If the first letters match, look at the second letter. Bear and bus both start with b. E comes before u, so bear comes first.", html: `<div class="chips">${chip('b<b class="hl">e</b>ar', "bear", "lg")}${arrow()}${chip('b<b class="hl">u</b>s', "bus", "lg")}</div>` },
    { t: "Sing it!", say: "Use the alphabet song to help. A, B, C, D, E, F, G. Letters near the start come first.", html: `<div class="abc-strip">${ABC.map(l => `<span>${l}</span>`).join("")}</div>` },
  ],
  gen() {
    const same = Math.random() < 0.45, words = same ? shuffle(pick(ABC_SAME)).slice(0, 4) : shuffle(ABCW).slice(0, 4), first = Math.random() < 0.7;
    const sorted = [...words].sort(), ans = first ? sorted[0] : sorted[3];
    return { q: `Which word comes <b>${first ? "first" : "last"}</b> in ABC order?`, say: `Which word comes ${first ? "first" : "last"} in A B C order?`, opts: words, ans, big: 1, why: `In ABC order: ${sorted.join(", ")}.`, key: words.join() };
  },
});

const PRON = [["<u>Sam</u> likes pizza.", "He", ["She", "They", "It"]], ["<u>Mia</u> rides a bike.", "She", ["He", "It", "We"]], ["<u>The dog</u> barked loudly.", "It", ["He", "They", "We"]], ["<u>Tom and I</u> played chess.", "We", ["They", "He", "Us"]], ["Give the ball to <u>Lily</u>.", "her", ["she", "him", "them"]], ["I saw <u>the boys</u> at the park.", "them", ["they", "him", "us"]], ["<u>The books</u> are heavy.", "They", ["It", "He", "We"]], ["Dad called <u>my sister and me</u>.", "us", ["we", "them", "they"]], ["<u>My grandma</u> bakes bread.", "She", ["He", "It", "They"]], ["<u>The kids</u> ran outside.", "They", ["We", "It", "Them"]], ["Please help <u>Ben</u>.", "him", ["he", "her", "they"]], ["<u>The car</u> is red.", "It", ["She", "They", "He"]]];
topic(8, "english", {
  id: "pronouns", title: "Pronouns", icon: "🙋", blurb: "he, she, it, we, they and more.",
  lesson: [
    { t: "Words that stand in", say: "A pronoun takes the place of a noun. Instead of saying Sam again and again, we say he. Sam is tall. He plays basketball.", html: `<div class="sentence big-sentence"><b class="noun">Sam</b> is tall. <b class="hl">He</b> plays basketball. 🏀</div>` },
    { t: "Pick the right one", say: "Use he for a boy, she for a girl, it for a thing or animal, we for you and me, and they for a group.", html: table([["👦 a boy", "he / him"], ["👧 a girl", "she / her"], ["🐶 a thing or animal", "it"], ["🙋 me and others", "we / us"], ["👨‍👩‍👧 a group", "they / them"]], ["Talking about", "Pronoun"]) },
    { t: "Start or end?", say: "At the start of a sentence, use he, she, we, they. After an action, use him, her, us, them. She threw the ball to him.", html: `<div class="sentence big-sentence"><b class="hl">She</b> threw the ball to <b class="hl">him</b>.</div>` },
  ],
  gen() {
    const [s, a, d] = pick(PRON);
    return { q: `Which pronoun can replace the <u>underlined</u> words?<div class="sentence">${s}</div>`, say: `Which pronoun can replace the underlined words? ${s.replace(/<[^>]+>/g, "")}`, opts: shuffle([a, ...d]), ans: a, big: 1, why: s.replace(/<u>.*?<\/u>/, `<b>${a}</b>`), key: s };
  },
});

const CAPS = [["My friend sam is funny.", "sam"], ["We went to texas last year.", "texas"], ["Her birthday is in june.", "june"], ["On monday we have art.", "monday"], ["Can you and i play?", "i"], ["My dog rex loves bones.", "rex"], ["Our trip to canada was fun.", "canada"], ["We eat turkey on thanksgiving.", "thanksgiving"], ["Grandpa lives in chicago.", "chicago"], ["We have music on friday.", "friday"], ["Have you met emma?", "emma"], ["It snowed a lot in january.", "january"]];
topic(8, "english", {
  id: "capitals", title: "Capital Letters", icon: "🅰️", blurb: "Names, places, days and months.",
  lesson: [
    { t: "Special names get capitals", say: "Names of people, pets, places, days and months start with a capital letter. Sam, Texas, Monday, June.", html: `<div class="chips">${["👦 Sam", "🗺️ Texas", "📅 Monday", "☀️ June", "🐶 Rex"].map(w => chip(w.replace(/ (\w)/, ' <b class="hl">$1</b>'), w.split(" ")[1], "lg")).join("")}</div>` },
    { t: "The word I", say: "The word I, when you talk about yourself, is always a capital letter. Can you and I play?", html: `<div class="sentence big-sentence">Can you and <b class="hl">I</b> play?</div>` },
    { t: "Start of a sentence", say: "Every sentence starts with a capital letter too. We went to the park.", html: `<div class="sentence big-sentence"><b class="hl">W</b>e went to the park.</div>` },
  ],
  gen() {
    const [s, a] = pick(CAPS);
    const words = [...new Set(s.replace(/[.,!?]/g, "").split(" ").filter(w => w !== a && w === w.toLowerCase() && w.length > 1))];
    return { q: `Which word needs a <b>capital letter</b>?<div class="sentence">${s}</div>`, say: `Which word needs a capital letter? ${s}`, opts: uniq(a, shuffle(words)), ans: a, big: 1, why: `${a === "i" ? "I is always a capital" : `${cap(a)} is a special name`}: ${s.replace(new RegExp(`\\b${a}\\b`), a === "i" ? "I" : cap(a))}`, key: s };
  },
});

/* ====================== AGE 8 · MATH (more) ====================== */
topic(8, "math", {
  id: "place1000", title: "Place Value to 1,000", icon: "🏛️", blurb: "Hundreds, tens and ones.",
  lesson: [
    { t: "Hundreds", say: "10 tens make 1 hundred. In 345, the 3 is in the hundreds place. It means 300.", html: `<div class="digits"><span class="d-h">3</span><span class="d-t">4</span><span class="d-o">5</span></div>` + table([["3", "4", "5"]], ["Hundreds", "Tens", "Ones"]) },
    { t: "Expanded form", say: "We can stretch a number out. 345 is 300 plus 40 plus 5.", html: eq(`<span class="d-h">300</span> + <span class="d-t">40</span> + <span class="d-o">5</span> = 345`) },
    { t: "Zeros hold a place", say: "In 507 there are no tens. The zero holds the tens place. 507 is 500 plus 7.", html: `<div class="digits"><span class="d-h">5</span><span class="d-t">0</span><span class="d-o">7</span></div>` + eq("500 + 7 = 507") },
  ],
  gen() {
    let n, h, t, o;
    do { n = R(101, 999); h = Math.floor(n / 100); t = Math.floor(n / 10) % 10; o = n % 10; } while (new Set([h, t, o]).size < 3 || t === 0 || o === 0);
    const k = R(0, 2);
    if (k === 0) { const which = pick(["h", "t", "o"]), d = { h, t, o }[which], v = { h: h * 100, t: t * 10, o }[which]; return { q: `What is the value of the <b>${d}</b> in ${n}?`, say: `What is the value of the ${d} in ${n}?`, vis: `<div class="digits"><span class="d-h">${h}</span><span class="d-t">${t}</span><span class="d-o">${o}</span></div>`, opts: uniq(v, [d, d * 10, d * 100]), ans: String(v), big: 1, why: `The ${d} is in the ${{ h: "hundreds", t: "tens", o: "ones" }[which]} place, so it is worth ${v}.`, key: "v" + n + which }; }
    if (k === 1) return { q: `${h * 100} + ${t * 10} + ${o} = ?`, vis: "", opts: numU(n, [h * 100 + o * 10 + t, o * 100 + t * 10 + h, h + t + o, n + 10], 10, 1), ans: String(n), big: 1, why: `${h} hundred${h === 1 ? "" : "s"}, ${t} ten${t === 1 ? "" : "s"} and ${o} one${o === 1 ? "" : "s"} make ${n}.`, key: "e" + n };
    return { q: `How many <b>hundreds</b> are in ${n}?`, say: `How many hundreds are in ${n}?`, vis: eq(String(n)), opts: uniq(h, [t, o, h + 1, h * 100]), ans: String(h), big: 1, why: `${n} has ${h} hundreds.`, key: "h" + n };
  },
});

const GRAPHS = [["Favorite fruit", ["🍎", "🍌", "🍇", "🍓"], ["apple", "banana", "grapes", "strawberry"]], ["Favorite pet", ["🐶", "🐱", "🐟", "🐰"], ["dog", "cat", "fish", "bunny"]], ["Favorite sport", ["⚽", "🏀", "⚾", "🎾"], ["soccer", "basketball", "baseball", "tennis"]], ["Weather this month", ["☀️", "🌧️", "☁️", "❄️"], ["sunny", "rainy", "cloudy", "snowy"]]];
topic(8, "math", {
  id: "graphs", title: "Bar Graphs", icon: "📊", blurb: "Read and compare data.",
  lesson: [
    { t: "Reading a bar graph", say: "A bar graph uses bars to show how many. Look at the top of each bar, then across to the numbers on the side. 8 kids chose apples.", html: barGraph([["🍎", 8], ["🍌", 5], ["🍇", 3], ["🍓", 6]], 10, "Favorite fruit") },
    { t: "Most and least", say: "The tallest bar is the most. The shortest bar is the least. Apple is the most popular. Grapes is the least.", html: note("Tallest bar = <b>most</b> 🍎 · Shortest bar = <b>least</b> 🍇") },
    { t: "How many more?", say: "How many more kids chose apples than bananas? Subtract. 8 minus 5 equals 3 more.", html: eq("8 − 5 = <b>3</b>") },
  ],
  gen() {
    const [title, es, names] = pick(GRAPHS), vals = [];
    while (vals.length < 4) { const v = R(1, 10); if (!vals.includes(v)) vals.push(v); }
    const items = es.map((e, i) => [e, vals[i]]), vis = barGraph(items, 10, title), k = R(0, 2);
    const eo = i => `<span class="emo" title="${names[i]}">${es[i]}</span>`;
    if (k === 0) { const i = R(0, 3); return { q: `How many chose <b>${names[i]}</b>?`, vis, opts: numU(vals[i], [vals[i] + 1, vals[i] - 1, ...vals], 2, 0), ans: String(vals[i]), big: 1, why: `The ${names[i]} bar goes up to ${vals[i]}.`, key: title + vals.join() + i }; }
    if (k === 1) { const most = Math.random() < 0.6, i = vals.indexOf(most ? Math.max(...vals) : Math.min(...vals)); return { q: `Which was chosen the <b>${most ? "most" : "least"}</b>?`, say: `Which was chosen the ${most ? "most" : "least"}?`, vis, opts: [0, 1, 2, 3].map(eo), ans: eo(i), why: `The ${names[i]} bar is the ${most ? "tallest" : "shortest"}.`, key: title + vals.join() + most }; }
    let a = R(0, 3), b = R(0, 3); while (b === a) b = R(0, 3); if (vals[a] < vals[b]) [a, b] = [b, a];
    const d = vals[a] - vals[b];
    return { q: `How many more chose <b>${names[a]}</b> than <b>${names[b]}</b>?`, say: `How many more chose ${names[a]} than ${names[b]}?`, vis, opts: numU(d, [vals[a] + vals[b], d + 1, d - 1, vals[a]], 2, 0), ans: String(d), big: 1, why: `${vals[a]} − ${vals[b]} = ${d}`, key: title + vals.join() + a + b };
  },
});

topic(8, "math", {
  id: "wordprob", title: "Word Problems", icon: "🧠", blurb: "Read a story and solve it in steps.",
  lesson: [
    { t: "Read and picture it", say: "Read the story. Picture what is happening. Mia had 12 stickers. She got 5 more. Then she gave away 4. How many does she have now?", html: passage("Mia had <b>12</b> stickers. She got <b>5</b> more. Then she gave away <b>4</b>. How many does she have now? ⭐") },
    { t: "Find the clue words", say: "Clue words tell you what to do. More means add. Gave away means subtract.", html: table([["more, in all, total", "add +"], ["left, gave away, fewer", "subtract −"], ["each, groups of, rows of", "multiply ×"], ["share, equally, split", "divide ÷"]], ["Clue words", "Do this"]) },
    { t: "Solve step by step", say: "Step 1. 12 plus 5 equals 17. Step 2. 17 minus 4 equals 13. Mia has 13 stickers.", html: eq("12 + 5 = 17") + eq("17 − 4 = <b>13</b>") },
  ],
  gen() {
    const who = pick(KIDS), k = R(0, 4);
    if (k === 0) { const a = R(8, 30), b = R(2, 15), c = R(2, a + b - 1), ans = a + b - c; return { q: `${who} had ${a} stickers. ${who} got ${b} more, then gave away ${c}. How many stickers now?`, vis: `<span class="emo xxl">⭐</span>`, opts: numU(ans, [a + b + c, a + b, a - c, ans + 1], 3, 0), ans: String(ans), big: 1, why: `${a} + ${b} = ${a + b}, then ${a + b} − ${c} = ${ans}.`, key: "a" + a + b + c }; }
    if (k === 1) { const r = R(3, 9), c = R(3, 9), ans = r * c; return { q: `There are ${r} rows of chairs with ${c} chairs in each row. How many chairs in all?`, vis: `<span class="emo xxl">🪑</span>`, opts: numU(ans, [r + c, ans + r, ans - c, ans + 1], 4, 1), ans: String(ans), big: 1, why: `${r} × ${c} = ${ans}.`, key: "b" + r + c }; }
    if (k === 2) { const f = R(2, 4), e = R(1, 3), s = pick([8, 10, 12, 16]), ans = s - f * e; if (ans < 0) return this.gen(); return { q: `A pizza has ${s} slices. ${f} friends each eat ${e} ${e === 1 ? "slice" : "slices"}. How many slices are left?`, vis: `<span class="emo xxl">🍕</span>`, opts: numU(ans, [s - f - e, f * e, s - f, ans + 2], 2, 0), ans: String(ans), big: 1, why: `${f} × ${e} = ${f * e} eaten. ${s} − ${f * e} = ${ans} left.`, key: "c" + f + e + s }; }
    if (k === 3) { const p = R(3, 12), d = R(2, 7), ans = p * d; return { q: `${who} reads ${p} pages every day for ${d} days. How many pages is that?`, vis: `<span class="emo xxl">📚</span>`, opts: numU(ans, [p + d, ans + p, ans - d, ans + 10], 4, 1), ans: String(ans), big: 1, why: `${p} × ${d} = ${ans}.`, key: "d" + p + d }; }
    const b = R(3, 8), bx = R(2, 9), n = b * bx;
    return { q: `A box holds ${b} crayons. How many boxes do you need for ${n} crayons?`, vis: `<span class="emo xxl">🖍️</span>`, opts: numU(bx, [bx + 1, bx - 1, n - b, b], 2, 1), ans: String(bx), big: 1, why: `${n} ÷ ${b} = ${bx}.`, key: "e" + n + b };
  },
});

/* ====================== AGE 9 · ENGLISH (more) ====================== */
const CTX = [["The enormous whale was bigger than our whole boat.", "enormous", "very big"], ["After running the race, Ali was exhausted and fell asleep.", "exhausted", "very tired"], ["The fragile vase broke the moment it touched the floor.", "fragile", "easy to break"], ["Mia was famished, so she ate two sandwiches.", "famished", "very hungry"], ["The ancient castle was built a thousand years ago.", "ancient", "very old"], ["The timid puppy hid behind the couch when guests came.", "timid", "shy and nervous"], ["The sound was so faint that we could barely hear it.", "faint", "very quiet"], ["The desert is arid; it hardly ever rains there.", "arid", "very dry"], ["He was furious when his brother broke his favorite toy.", "furious", "very angry"], ["The soup was scalding, so we waited for it to cool.", "scalding", "very hot"], ["The directions were vague, so we got lost.", "vague", "not clear"], ["She was elated when she won first prize.", "elated", "very happy"], ["The room was so cluttered we couldn't find the floor.", "cluttered", "messy and full of things"], ["The hikers were cautious near the edge of the cliff.", "cautious", "careful"]];
topic(9, "english", {
  id: "context", title: "Context Clues", icon: "🕵️", blurb: "Figure out new words like a detective.",
  lesson: [
    { t: "Be a word detective", say: "When you meet a word you don't know, look at the words around it. They are clues!", html: passage(`The <b class="hl">enormous</b> whale was bigger than our whole boat.`) + note("Clue: <b>bigger than our whole boat</b> → enormous means <b>very big</b> 🐳") },
    { t: "Look for reasons", say: "Clues can tell you why something happened. Ali was exhausted and fell asleep. Falling asleep is a clue that exhausted means very tired.", html: passage(`After the race, Ali was <b class="hl">exhausted</b> and <u>fell asleep</u>.`) },
    { t: "Check your guess", say: "Put your meaning back into the sentence. If it makes sense, you cracked the case!", html: passage(`After the race, Ali was <b class="hl">very tired</b> and fell asleep. ✔`) },
  ],
  gen() {
    const [s, w, m] = pick(CTX), others = shuffle(CTX.filter(c => c[1] !== w).map(c => c[2]));
    return { q: `What does <b>${w}</b> mean?<div class="sentence">${hlWord(s, w)}</div>`, say: `What does ${w} mean? ${s}`, opts: uniq(m, others), ans: m, why: `The clues in the sentence show that ${w} means ${m}.`, key: w };
  },
});

const IDIOMS = [["It's raining cats and dogs.", "It's raining very hard."], ["Break a leg!", "Good luck!"], ["That test was a piece of cake.", "It was very easy."], ["I'm feeling under the weather.", "I feel sick."], ["Hold your horses!", "Wait and be patient."], ["Don't let the cat out of the bag.", "Don't tell the secret."], ["She's on cloud nine.", "She is very happy."], ["That bike costs an arm and a leg.", "It is very expensive."], ["Time to hit the books.", "Time to study."], ["We see each other once in a blue moon.", "Very rarely."], ["You hit the nail on the head.", "You got it exactly right."], ["I'm all ears.", "I'm listening carefully."]];
topic(9, "english", {
  id: "idioms", title: "Idioms", icon: "💬", blurb: "Sayings that don't mean what they say.",
  lesson: [
    { t: "Silly sayings", say: "An idiom is a saying that means something different from its words. It's raining cats and dogs does not mean animals are falling! It means it's raining very hard.", html: col(`<div class="quote">It's raining cats and dogs! 🐱🐶🌧️</div>`, note("Means: <b>It's raining very hard.</b>")) },
    { t: "Good luck on stage", say: "Actors say break a leg to wish each other good luck. Nobody wants a broken leg!", html: `<div class="quote">Break a leg! 🎭</div>` + note("Means: <b>Good luck!</b>") },
    { t: "Easy peasy", say: "If a test was a piece of cake, it was very easy.", html: `<div class="quote">That test was a piece of cake. 🍰</div>` + note("Means: <b>It was very easy.</b>") },
  ],
  gen() {
    const [s, m] = pick(IDIOMS), others = shuffle(IDIOMS.filter(i => i[0] !== s).map(i => i[1]));
    return { q: "What does this idiom mean?", say: `What does this idiom mean? ${s}`, vis: `<div class="quote">${s}</div>`, opts: uniq(m, others), ans: m, why: `"${s}" means: ${m}`, key: s };
  },
});

const POS = ["above", "below", "next to", "between"];
const PREP_S = [["The cat hid under the bed.", "under"], ["We walked across the bridge.", "across"], ["The bird sat on the fence.", "on"], ["Put the milk in the fridge.", "in"], ["The kite flew over the trees.", "over"], ["She sat between her two friends.", "between"], ["The dog ran around the yard.", "around"], ["We played games after school.", "after"], ["The shoes are behind the door.", "behind"], ["He jumped into the pool.", "into"], ["The frog hopped toward the pond.", "toward"], ["We hiked through the forest.", "through"]];
topic(9, "english", {
  id: "prepositions", title: "Prepositions", icon: "📦", blurb: "Words that tell where or when.",
  lesson: [
    { t: "Where is it?", say: "A preposition tells where something is. The ball is above the box. Now the ball is below the box.", html: row(col(scene("above"), "<b>above</b>"), col(scene("below"), "<b>below</b>")) },
    { t: "More places", say: "The ball is next to the box. Now the ball is between the boxes.", html: row(col(scene("next to"), "<b>next to</b>"), col(scene("between"), "<b>between</b>")) },
    { t: "In sentences", say: "Prepositions also show when, like after school. Find them in a sentence. The cat hid under the bed.", html: `<div class="sentence big-sentence">The cat hid <b class="hl">under</b> the bed. 🐱🛏️</div><div class="sentence big-sentence">We played <b class="hl">after</b> school.</div>` },
  ],
  gen() {
    if (Math.random() < 0.4) { const p = pick(POS), e = pick(["⚽", "🐱", "🎈", "🍎"]); return { q: "Where is it?", vis: scene(p, e), opts: shuffle(POS.map(x => `${x} ${x === "between" ? "the boxes" : "the box"}`)), ans: `${p} ${p === "between" ? "the boxes" : "the box"}`, why: `It is ${p} ${p === "between" ? "the boxes" : "the box"}.`, key: "s" + p + e }; }
    const [s, a] = pick(PREP_S);
    return { q: `Which word is the <b>preposition</b>?<div class="sentence">${s}</div>`, say: `Which word is the preposition? ${s}`, opts: sentOpts(s, a, ["happy", "jumped", "table"]), ans: a, big: 1, why: `${cap(a)} tells where or when.`, key: s };
  },
});

/* ====================== AGE 9 · MATH (more) ====================== */
const DURS = [15, 20, 30, 40, 45, 60, 75, 90, 105, 120, 135, 150];
const durText = m => { const h = Math.floor(m / 60), r = m % 60; return [h ? `${h} hour${h > 1 ? "s" : ""}` : "", r ? `${r} minutes` : ""].filter(Boolean).join(" "); };
topic(9, "math", {
  id: "elapsed", title: "Elapsed Time", icon: "⏳", blurb: "How much time passes, and when things end.",
  lesson: [
    { t: "Time passing", say: "Elapsed time is how much time passes from start to end. A movie starts at 2:00 and ends at 3:30. 1 hour and 30 minutes passed.", html: `<div class="shape-row"><figure>${clock(2, 0, 120)}<figcaption>start <b>2:00</b></figcaption></figure><figure>${clock(3, 30, 120)}<figcaption>end <b>3:30</b></figcaption></figure></div>` },
    { t: "Jump the hours first", say: "Start at 2:15. Add 1 hour to get 3:15. Then add 30 minutes to get 3:45.", html: train(["2:15", "+1 hr", "3:15", "+30 min", "3:45"]) },
    { t: "Crossing the hour", say: "At 4:50, add 20 minutes. 10 minutes takes you to 5:00. 10 more makes 5:10.", html: train(["4:50", "+10", "5:00", "+10", "5:10"]) },
  ],
  gen() {
    const h = R(1, 10), m = 5 * R(0, 11), start = h * 60 + m, d = pick(DURS), end = start + d;
    if (Math.random() < 0.65) {
      const ev = pick(["A movie", "Soccer practice", "A party", "A road trip", "Swim class"]);
      return { q: `${ev} starts at <b>${fmtTime(start)}</b> and lasts <b>${durText(d)}</b>. What time does it end?`, say: `${ev} starts at ${fmtTime(start)} and lasts ${durText(d)}. What time does it end?`, vis: clock(h, m, 150), opts: uniq(fmtTime(end), [fmtTime(end + 15), fmtTime(end - 15), fmtTime(start + Math.floor(d / 60) * 60), fmtTime(end + 60)]), ans: fmtTime(end), big: 1, why: `${fmtTime(start)} + ${durText(d)} = ${fmtTime(end)}.`, key: "e" + start + d };
    }
    const opts = uniq(durText(d), shuffle(DURS.filter(x => x !== d)).map(durText));
    return { q: `School art starts at <b>${fmtTime(start)}</b> and ends at <b>${fmtTime(end)}</b>. How long is it?`, say: `Art starts at ${fmtTime(start)} and ends at ${fmtTime(end)}. How long is it?`, vis: `<div class="shape-row"><figure>${clock(h, m, 110)}<figcaption>start</figcaption></figure><figure>${clock(Math.floor(end / 60) % 12 || 12, end % 60, 110)}<figcaption>end</figcaption></figure></div>`, opts, ans: durText(d), why: `From ${fmtTime(start)} to ${fmtTime(end)} is ${durText(d)}.`, key: "d" + start + d };
  },
});

const PLACES = ["ones", "tens", "hundreds", "thousands", "ten thousands", "hundred thousands"];
topic(9, "math", {
  id: "bignums", title: "Big Numbers", icon: "🏔️", blurb: "Place value up to 999,999.",
  lesson: [
    { t: "Commas help", say: "Big numbers use commas to group digits in threes. 472,315 is four hundred seventy two thousand, three hundred fifteen.", html: `<div class="digits big-num"><span class="d-h">4</span><span class="d-t">7</span><span class="d-o">2</span><span class="comma">,</span><span class="d-h">3</span><span class="d-t">1</span><span class="d-o">5</span></div>` },
    { t: "Place value chart", say: "Each place is 10 times bigger than the one to its right. Ones, tens, hundreds, thousands, ten thousands, hundred thousands.", html: table([["4", "7", "2", "3", "1", "5"]], ["100,000s", "10,000s", "1,000s", "100s", "10s", "1s"]) },
    { t: "Value of a digit", say: "In 472,315, the 7 is in the ten thousands place. It is worth 70,000.", html: eq("7 → <b>70,000</b>") },
  ],
  gen() {
    if (Math.random() < 0.6) {
      let n, p, d;
      do { n = R(100000, 999999); p = R(2, 5); d = Math.floor(n / 10 ** p) % 10; } while (d === 0 || String(n).split("").filter(x => +x === d).length > 1);
      const v = d * 10 ** p;
      return { q: `What is the value of the <b>${d}</b> in ${fmtN(n)}?`, say: `What is the value of the ${d} in ${fmtN(n)}?`, vis: eq(fmtN(n)), opts: uniq(fmtN(v), [fmtN(v / 10), fmtN(v * 10 <= 900000 ? v * 10 : v / 100), fmtN(d), fmtN(v / 100)]), ans: fmtN(v), big: 1, why: `The ${d} is in the ${PLACES[p]} place, so it is worth ${fmtN(v)}.`, key: "v" + n + p };
    }
    const base = R(100, 998) * 1000, nums = new Set();
    while (nums.size < 4) nums.add(base + R(0, 999) + (Math.random() < 0.5 ? R(0, 1) * 10000 : 0));
    const arr = [...nums], big = Math.random() < 0.5, ans = big ? Math.max(...arr) : Math.min(...arr);
    return { q: `Which number is the <b>${big ? "greatest" : "least"}</b>?`, say: `Which number is the ${big ? "greatest" : "least"}?`, opts: shuffle(arr).map(fmtN), ans: fmtN(ans), big: 1, why: "Compare from the left. The first place where the digits differ decides.", key: arr.join() };
  },
});

topic(9, "math", {
  id: "numpatterns", title: "Number Patterns", icon: "🧩", blurb: "Find the rule and keep it going.",
  lesson: [
    { t: "Find the rule", say: "Look at how the numbers change. 3, 7, 11, 15. Each number is 4 more. The rule is add 4.", html: train([3, 7, 11, 15]) + eq("rule: <b>+4</b>") },
    { t: "Going down", say: "Patterns can go down too. 50, 44, 38, 32. The rule is subtract 6.", html: train([50, 44, 38, 32]) + eq("rule: <b>−6</b>") },
    { t: "Doubling", say: "Some patterns multiply. 2, 4, 8, 16. Each number doubles. The rule is times 2.", html: train([2, 4, 8, 16]) + eq("rule: <b>×2</b>") },
  ],
  gen() {
    const t = pick(["add", "add", "sub", "mul"]); let seq, rule;
    if (t === "add") { const k = R(3, 15), s = R(1, 40); seq = range(0, 5).map(i => s + i * k); rule = `+${k}`; }
    else if (t === "sub") { const k = R(3, 12), s = R(60, 120); seq = range(0, 5).map(i => s - i * k); rule = `−${k}`; }
    else { const k = pick([2, 3]), s = R(1, 5); seq = range(0, 5).map(i => s * k ** i); rule = `×${k}`; }
    const k = parseInt(rule.slice(1));
    if (Math.random() < 0.6) { const ans = seq[5]; return { q: "What number comes next?", vis: train([...seq.slice(0, 5), "?"]), opts: numU(ans, [ans + 1, ans - 1, seq[4] + (seq[1] - seq[0]) + 2, ans + 10], 5, 0), ans: String(ans), big: 1, why: `The rule is ${rule}: ${seq[4]} ${rule} = ${ans}.`, key: seq.join() }; }
    return { q: "What is the rule?", vis: train(seq.slice(0, 5)), opts: uniq(rule, [`+${k + 1}`, `−${k}`, `+${k}`, `×${k}`, `+${k - 1}`]), ans: rule, big: 1, why: `Each step goes ${rule}.`, key: "r" + seq.join() };
  },
});

