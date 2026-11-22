/* =====================================================================
   Logical Thinking (added in version 3)
   ===================================================================== */
for (const a of [6, 7, 8, 9]) C[a].logic = [];

/* ---------- data ---------- */
const parseSet = s => s.split(",").map(x => { const [e, n] = x.split(":"); return [e, n]; });
const LCATS = {
  fruits: parseSet("🍎:apple,🍌:banana,🍇:grapes,🍓:strawberry,🍐:pear,🍒:cherries,🍑:peach,🍍:pineapple"),
  "furry animals": parseSet("🐶:dog,🐱:cat,🐰:rabbit,🐻:bear,🦁:lion,🐯:tiger,🐹:hamster,🦊:fox"),
  vehicles: parseSet("🚗:car,🚌:bus,🚲:bike,🚂:train,✈️:plane,🚀:rocket,🚁:helicopter,⛵:boat"),
  clothes: parseSet("👕:shirt,👖:jeans,🧦:socks,🧢:cap,👗:dress,🧤:gloves,🧣:scarf,👟:shoe"),
  "sea animals": parseSet("🐟:fish,🐙:octopus,🦀:crab,🐳:whale,🐬:dolphin,🦈:shark,🐠:tropical fish,🦑:squid"),
  sweets: parseSet("🍩:donut,🍦:ice cream,🧁:cupcake,🍪:cookie,🍭:lollipop,🍫:chocolate,🎂:cake,🍬:candy"),
  "sports balls": parseSet("⚽:soccer ball,🏀:basketball,🏈:football,⚾:baseball,🎾:tennis ball,🏐:volleyball"),
  bugs: parseSet("🐝:bee,🐞:ladybug,🦋:butterfly,🐛:caterpillar,🐜:ant,🦗:cricket"),
  vegetables: parseSet("🥕:carrot,🥦:broccoli,🌽:corn,🥔:potato,🍆:eggplant,🥒:cucumber"),
  "music makers": parseSet("🎸:guitar,🥁:drum,🎺:trumpet,🎹:piano,🎻:violin,🪕:banjo"),
};
const LCAT_KEYS = Object.keys(LCATS);
const eOpt = ([e, n]) => `<span class="emo" title="${n}">${e}</span>`;
const COLNAME = { "#FF7A59": "orange", "#3D7BFF": "blue", "#1FAF6E": "green", "#9B5DE5": "purple", "#FFC93C": "yellow" };
const LSHAPES = ["circle", "triangle", "square", "hexagon"];
const shp = (n, c, s = 72) => shape(n, c, s);
const shpName = (n, c) => `the ${COLNAME[c]} ${n}`;

function seesaw(l, r, heavy, s = 1) {
  const W = 300, H = 150, tilt = heavy === "left" ? 14 : heavy === "right" ? -14 : 0;
  const a = tilt * Math.PI / 180, cx = 150, cy = 92, L = 118;
  const x1 = cx - L * Math.cos(a), y1 = cy + L * Math.sin(a), x2 = cx + L * Math.cos(a), y2 = cy - L * Math.sin(a);
  const ef = "'Apple Color Emoji','Segoe UI Emoji','Noto Color Emoji',sans-serif";
  return `<svg class="vis-svg" viewBox="0 0 ${W} ${H}" width="${W * s}" height="${H * s}" role="img" aria-label="balance scale"><polygon points="150,96 128,142 172,142" fill="#FFC93C" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/><line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}" stroke="${INK}" stroke-width="7" stroke-linecap="round"/><text x="${f1(x1 + 18)}" y="${f1(y1 - 10)}" text-anchor="middle" font-size="44" font-family="${ef}">${l}</text><text x="${f1(x2 - 18)}" y="${f1(y2 - 10)}" text-anchor="middle" font-size="44" font-family="${ef}">${r}</text></svg>`;
}

function venn(A, B, place) {
  const W = 340, H = 210, ef = "'Apple Color Emoji','Segoe UI Emoji','Noto Color Emoji',sans-serif";
  let s = svgOpen(W, H, `Venn diagram: ${A} and ${B}`);
  s += `<rect x="4" y="4" width="${W - 8}" height="${H - 8}" rx="14" fill="#FFFFFF" stroke="${INK}" stroke-width="2"/>`;
  s += `<circle cx="130" cy="112" r="78" fill="#FF7A59" fill-opacity=".22" stroke="#D6532F" stroke-width="3"/><circle cx="210" cy="112" r="78" fill="#3D7BFF" fill-opacity=".22" stroke="#2458CC" stroke-width="3"/>`;
  s += `<text x="100" y="24" text-anchor="middle" font-size="15" font-weight="700" font-family="${FONT}" fill="#D6532F">${A}</text><text x="240" y="24" text-anchor="middle" font-size="15" font-weight="700" font-family="${FONT}" fill="#2458CC">${B}</text>`;
  if (place) {
    const spots = { a: [[95, 95], [95, 140]], b: [[245, 95], [245, 140]], both: [[170, 100], [170, 145]], out: [[30, 190], [310, 190]] };
    for (const k in place) place[k].forEach((e, i) => { const p = spots[k][i]; if (p) s += `<text x="${p[0]}" y="${p[1]}" text-anchor="middle" dominant-baseline="central" font-size="${k === "out" ? 22 : 30}" font-family="${ef}">${e}</text>`; });
  }
  return s + "</svg>";
}

function grid2(cells) { return `<div class="lgrid g2">${cells.map(c => `<div class="lcell${c === "?" ? " q" : ""}">${c === "?" ? "?" : c}</div>`).join("")}</div>`; }
function sudoku(g, target) { return `<div class="sudoku">${g.map((row, r) => row.map((v, c) => `<span class="${r === target[0] && c === target[1] ? "tgt" : v ? "" : "empty"}${c === 1 ? " bR" : ""}${r === 1 ? " bB" : ""}">${r === target[0] && c === target[1] ? "?" : v || ""}</span>`).join("")).join("")}</div>`; }
function codeRow(pairs) { return `<div class="code-row">${pairs.map(([a, b]) => `<span><b>${a}</b><i>${b}</i></span>`).join("")}</div>`; }
const ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

/* ====================== AGE 6 · LOGIC ====================== */
topic(6, "logic", {
  id: "oddone", title: "Odd One Out", icon: "🕵️", blurb: "Spot the one that doesn't belong.",
  lesson: [
    { t: "Which one is different?", say: "Look at these. Apple, banana, grapes and a car. Three are fruits. The car is not a fruit! The car is the odd one out.", html: `<div class="chips">${["🍎", "🍌", "🍇"].map(e => `<span class="emo xl">${e}</span>`).join("")}<span class="emo xl odd-ring">🚗</span></div>` + note("3 fruits + 1 car → the <b>car</b> doesn't belong") },
    { t: "Ask: what is the same?", say: "First find what most of them share. Dog, cat and rabbit are animals. The shoe is not. So the shoe is the odd one out.", html: `<div class="chips">${["🐶", "🐱", "🐰"].map(e => `<span class="emo xl">${e}</span>`).join("")}<span class="emo xl odd-ring">👟</span></div>` },
    { t: "Try it!", say: "Which one does not belong? Bee, ladybug, butterfly, and a cookie. The cookie! The others are bugs. Tap each one to hear its name.", html: `<div class="card-grid">${[["🐝", "bee"], ["🐞", "ladybug"], ["🦋", "butterfly"], ["🍪", "cookie"]].map(([e, n]) => picCard(e, n, n)).join("")}</div>` },
  ],
  gen() {
    const [a, b] = shuffle(LCAT_KEYS).slice(0, 2), same = shuffle(LCATS[a]).slice(0, 3), odd = pick(LCATS[b]);
    return { q: "Which one does <b>not</b> belong?", say: "Which one does not belong?", opts: shuffle([...same, odd]).map(eOpt), ans: eOpt(odd), sayAns: `the ${odd[1]}`, why: `The others are all ${a}. The ${odd[1]} is not.`, key: odd[0] + same.join() };
  },
});

topic(6, "logic", {
  id: "groups", title: "Sorting Groups", icon: "🧺", blurb: "Put things where they belong.",
  lesson: [
    { t: "Things that go together", say: "We can sort things into groups. Fruits go in one basket. Toys go in another.", html: row(col(`<div class="basket">🍎🍌🍇</div>`, "<b>Fruits</b>"), col(`<div class="basket">🧸🪀🎲</div>`, "<b>Toys</b>"))},
    { t: "Where does it go?", say: "Where does the strawberry go? It is a fruit, so it goes in the fruit basket!", html: row(bigEmo("🍓"), arrow(), col(`<div class="basket">🍎🍌🍇🍓</div>`, "<b>Fruits</b>")) },
    { t: "Many ways to sort", say: "You can sort by what things are, by color, or by where they live. Fish, octopus and whale all live in the sea.", html: col(`<div class="basket sea">🐟🐙🐳</div>`, "<b>Live in the sea</b> 🌊") },
  ],
  gen() {
    const [a, ...rest] = shuffle(LCAT_KEYS), items = shuffle(LCATS[a]), shown = items.slice(0, 3), ans = items[3];
    const others = rest.slice(0, 3).map(k => pick(LCATS[k]));
    return { q: "Which one belongs in this group?", vis: `<div class="basket">${shown.map(x => x[0]).join("")}</div>`, opts: shuffle([ans, ...others]).map(eOpt), ans: eOpt(ans), sayAns: `the ${ans[1]}`, why: `The group is ${a}, and the ${ans[1]} ${/s$/.test(ans[1]) && !/ss$/.test(ans[1]) ? "are" : "is"} ${/s$/.test(ans[1]) && !/ss$/.test(ans[1]) ? "" : "one of the "}${a} too.`, key: a + ans[0] };
  },
});

topic(6, "logic", {
  id: "shapepat", title: "Shape Patterns", icon: "🔷", blurb: "Watch both the shape and the color.",
  lesson: [
    { t: "Shapes can make patterns", say: "Circle, square, circle, square. What comes next? A circle!", html: `<div class="shape-train">${["circle", "square", "circle", "square"].map(n => shp(n, "#3D7BFF", 56)).join("")}<span class="car q">?</span></div>` },
    { t: "Colors can change too", say: "Look at the colors. Orange, green, orange, green. The shape stays the same, but the color repeats.", html: `<div class="shape-train">${["#FF7A59", "#1FAF6E", "#FF7A59", "#1FAF6E"].map(c => shp("triangle", c, 56)).join("")}<span class="car q">?</span></div>` },
    { t: "Check both!", say: "Now both change. Blue circle, yellow square, blue circle, yellow square. Next is a blue circle.", html: `<div class="shape-train">${[["circle", "#3D7BFF"], ["square", "#FFC93C"], ["circle", "#3D7BFF"], ["square", "#FFC93C"]].map(([n, c]) => shp(n, c, 56)).join("")}${shp("circle", "#3D7BFF", 56)}</div>` },
  ],
  gen() {
    const cols = shuffle(Object.keys(COLNAME)), shapes = shuffle(LSHAPES), type = pick([[0, 1], [0, 0, 1], [0, 1, 1], [0, 1, 2]]);
    const mode = R(0, 2), unit = type.map(t => [mode === 1 ? shapes[0] : shapes[t], mode === 0 ? cols[0] : cols[t]]);
    const len = R(4, 6), seq = Array.from({ length: len + 1 }, (_, i) => unit[i % unit.length]), ans = seq[len];
    const cands = [[ans[0], cols[3]], [shapes[3], ans[1]], ...unit, [shapes[2], cols[2]]];
    const key = x => x[0] + x[1], seen = new Set([key(ans)]), opts = [ans];
    for (const c of cands) if (opts.length < 4 && !seen.has(key(c))) { seen.add(key(c)); opts.push(c); }
    return { q: "What comes <b>next</b>?", say: "What comes next in the pattern?", vis: `<div class="shape-train">${seq.slice(0, len).map(([n, c]) => shp(n, c, 50)).join("")}<span class="car q">?</span></div>`, opts: shuffle(opts).map(([n, c]) => shp(n, c, 70)), ans: shp(ans[0], ans[1], 70), sayAns: shpName(ans[0], ans[1]), why: `The pattern repeats: ${unit.map(([n, c]) => `${COLNAME[c]} ${n}`).join(", ")}.`, key: seq.map(key).join() };
  },
});

topic(6, "logic", {
  id: "match", title: "Same & Different", icon: "👀", blurb: "Find the exact match.",
  lesson: [
    { t: "Look closely", say: "Two things are the same only if everything matches. This blue circle matches this blue circle.", html: row(shp("circle", "#3D7BFF", 80), `<span class="sym">=</span>`, shp("circle", "#3D7BFF", 80)) },
    { t: "Almost the same?", say: "A green circle is the same shape, but a different color. A blue square is the same color, but a different shape. They do not match.", html: row(shp("circle", "#3D7BFF", 70), `<span class="sym">≠</span>`, shp("circle", "#1FAF6E", 70), shp("square", "#3D7BFF", 70)) },
    { t: "Check two things", say: "Check the shape. Then check the color. If both match, you found it!", html: `<ol class="steps"><li>✔ Same shape?</li><li>✔ Same color?</li><li>🎉 It's a match!</li></ol>` },
  ],
  gen() {
    const [c1, c2, c3] = shuffle(Object.keys(COLNAME)), [s1, s2, s3] = shuffle(LSHAPES);
    const target = [s1, c1], opts = [target, [s1, c2], [s2, c1], [s3, c3]];
    return { q: "Find the one that is <b>exactly the same</b>.", say: "Find the one that is exactly the same.", vis: shp(s1, c1, 110), opts: shuffle(opts).map(([n, c]) => shp(n, c, 70)), ans: shp(s1, c1, 70), sayAns: shpName(s1, c1), why: `It must be a ${COLNAME[c1]} ${s1}: the same shape and the same color.`, key: s1 + c1 + s2 + c2 };
  },
});

const SIZE_RANK = parseSet("🐜:ant,🐭:mouse,🐱:cat,🐶:dog,🐴:horse,🐘:elephant,🐳:whale");
topic(6, "logic", {
  id: "sizes", title: "Biggest & Smallest", icon: "📐", blurb: "Put things in order by size.",
  lesson: [
    { t: "Small to big", say: "We can put things in order from smallest to biggest. Small, medium, big.", html: `<div class="size-row">${[28, 48, 72].map(z => `<span class="emo" style="font-size:${z}px">🎈</span>`).join("")}</div>` + note("small → medium → <b>big</b>") },
    { t: "Real sizes", say: "An ant is tiny. A mouse is small. A cat is bigger. An elephant is very big!", html: train(["🐜", "🐭", "🐱", "🐘"]) + note("smallest → biggest") },
    { t: "Line them up", say: "To find the biggest, compare two at a time. Keep the bigger one, then compare it to the next.", html: row(`<span class="emo xl">🐱</span>`, `<span class="sym">&lt;</span>`, `<span class="emo xl">🐴</span>`, `<span class="sym">&lt;</span>`, `<span class="emo xl">🐳</span>`) },
  ],
  gen() {
    const big = Math.random() < 0.5;
    if (Math.random() < 0.5) {
      const e = pick(["🎈", "⭐", "🍎", "🌼", "🐟", "🚗"]), sizes = shuffle([26, 40, 56, 78]), ans = big ? 78 : 26;
      const o = z => `<span class="emo" style="font-size:${z}px" title="${z === 78 ? "the biggest one" : z === 26 ? "the smallest one" : "a middle one"}">${e}</span>`;
      return { q: `Which one is the <b>${big ? "biggest" : "smallest"}</b>?`, say: `Which one is the ${big ? "biggest" : "smallest"}?`, opts: sizes.map(o), ans: o(ans), why: `Compare them all. That one is the ${big ? "biggest" : "smallest"}.`, key: e + big };
    }
    const pickd = shuffle(SIZE_RANK.map((x, i) => [...x, i])).slice(0, 4), ans = pickd.reduce((m, x) => (big ? x[2] > m[2] : x[2] < m[2]) ? x : m);
    return { q: `Which animal is the <b>${big ? "biggest" : "smallest"}</b> in real life?`, say: `Which animal is the ${big ? "biggest" : "smallest"} in real life?`, opts: pickd.map(eOpt), ans: eOpt(ans), sayAns: `the ${ans[1]}`, why: `In real life, the ${ans[1]} is the ${big ? "biggest" : "smallest"} of these.`, key: pickd.map(x => x[0]).join() + big };
  },
});

/* ====================== AGE 7 · LOGIC ====================== */
const WORDSETS = { colors: ["red", "blue", "green", "yellow", "purple", "pink"], "days of the week": ["Monday", "Tuesday", "Friday", "Sunday", "Saturday"], "body parts": ["arm", "leg", "nose", "ear", "knee", "hand"], "farm animals": ["cow", "pig", "sheep", "goat", "horse", "hen"], "things in the sky": ["sun", "moon", "star", "cloud", "rainbow"], "kitchen things": ["spoon", "fork", "plate", "cup", "pan", "bowl"] };
const NUMSETS = [["even numbers", n => n % 2 === 0, 2, 30], ["odd numbers", n => n % 2 === 1, 1, 30], ["counting by 5s", n => n % 5 === 0, 5, 50], ["counting by 10s", n => n % 10 === 0, 10, 90]];
topic(7, "logic", {
  id: "oddword", title: "Odd One Out Pro", icon: "🔎", blurb: "Find the odd word or number.",
  lesson: [
    { t: "Words can be odd too", say: "Red, blue, green, dog. Red, blue and green are colors. Dog is not a color. Dog is the odd one out.", html: `<div class="chips">${["red", "blue", "green"].map(w => chip(w, w, "lg")).join("")}${chip("dog", "dog", "lg odd-chip")}</div>` },
    { t: "Numbers can be odd too", say: "2, 4, 6, 9. 2, 4 and 6 are even numbers. 9 is not even. So 9 is the odd one out.", html: train([2, 4, 6, 9]) + note("2, 4, 6 are even · <b>9</b> is odd") },
    { t: "Find the rule", say: "Always find the rule that most of them follow. 10, 20, 30, 35. The rule is counting by tens. 35 breaks the rule!", html: train([10, 20, 30, 35]) + note("Rule: counting by 10s → <b>35</b> is the odd one out") },
  ],
  gen() {
    if (Math.random() < 0.55) {
      const [a, b] = shuffle(Object.keys(WORDSETS)).slice(0, 2), same = shuffle(WORDSETS[a]).slice(0, 3), odd = pick(WORDSETS[b]);
      return { q: "Which word does <b>not</b> belong?", say: "Which word does not belong?", opts: shuffle([...same, odd]), ans: odd, big: 1, why: `${same.join(", ")} are all ${a}. ${cap(odd)} is not.`, key: odd + same.join() };
    }
    /* only one fair answer: no other number may stand out by being the only odd/even, one-digit, or multiple of 5 or 10 */
    const ODD_TESTS = [v => v % 2, v => v < 10, v => v % 5 === 0, v => v % 10 === 0];
    const fair = (all, odd) => ODD_TESTS.every(f => { const y = all.filter(f); return !(y.length === 1 && y[0] !== odd) && !(y.length === 3 && all.find(v => !f(v)) !== odd); });
    let name, fits, lo, hi, same, odd, g = 0;
    do { [name, fits, lo, hi] = pick(NUMSETS); const pool = range(lo, hi).filter(fits); same = shuffle(pool).slice(0, 3).sort((x, y) => x - y);
      do { odd = R(lo, hi); } while (fits(odd) || same.includes(odd)); g++; } while (g < 80 && !fair([...same, odd], odd));
    return { q: "Which number does <b>not</b> belong?", say: "Which number does not belong?", opts: shuffle([...same, odd]).map(String), ans: String(odd), big: 1, why: `${same.join(", ")} are ${name}. ${odd} is not.`, key: name + odd };
  },
});

const SEQS = [[["🌰", "plant a seed"], ["🌱", "a sprout grows"], ["🌿", "the plant gets bigger"], ["🌻", "a flower blooms"]], [["🥚", "an egg"], ["🐣", "the chick hatches"], ["🐥", "a baby chick"], ["🐔", "a grown hen"]], [["🐛", "a caterpillar"], ["🟫", "it makes a cocoon"], ["🦋", "a butterfly comes out"]], [["⏰", "wake up"], ["🪥", "brush your teeth"], ["🥣", "eat breakfast"], ["🎒", "go to school"]], [["🥣", "mix the batter"], ["🔥", "bake it in the oven"], ["🎂", "put on frosting"], ["🥳", "eat the cake"]], [["☁️", "clouds fill up"], ["🌧️", "it rains"], ["💧", "puddles form"], ["☀️", "the sun dries them up"]], [["🛁", "take a bath"], ["👕", "put on pajamas"], ["📖", "read a story"], ["😴", "go to sleep"]]];
const sOpt = ([e, t]) => `<span class="emo">${e}</span> ${t}`;
function afterOpts(S, i) { const o = S.filter((_, j) => j !== i); while (o.length < 3) { const x = pick(pick(SEQS.filter(q => q !== S))); if (!o.includes(x)) o.push(x); } return shuffle(o.slice(0, 4)).map(sOpt); }
topic(7, "logic", {
  id: "sequence", title: "First, Next, Last", icon: "🔢", blurb: "Put events in the right order.",
  lesson: [
    { t: "Things happen in order", say: "Some things always happen in order. First, plant a seed. Next, a sprout grows. Last, a flower blooms.", html: train(["🌰", "🌱", "🌻"]) + note("first → next → last") },
    { t: "Order words", say: "Order words help us tell the steps. First, next, then, last.", html: `<ol class="steps"><li>⏰ <b>First</b>, wake up</li><li>🪥 <b>Next</b>, brush your teeth</li><li>🥣 <b>Then</b>, eat breakfast</li><li>🎒 <b>Last</b>, go to school</li></ol>` },
    { t: "Does it make sense?", say: "Ask yourself: could this happen before that? You can't eat a cake before you bake it!", html: row(bigEmo("🥣"), arrow(), bigEmo("🔥"), arrow(), bigEmo("🎂")) },
  ],
  gen() {
    const S = pick(SEQS), k = R(0, 2);
    if (k === 0) return { q: "What happens <b>first</b>?", say: "What happens first?", vis: `<div class="chips">${shuffle(S).map(s => `<span class="emo xl">${s[0]}</span>`).join("")}</div>`, opts: shuffle(S.slice(0, 4)).map(sOpt), ans: sOpt(S[0]), sayAns: S[0][1], why: `The order is: ${S.map(s => s[1]).join(", then ")}.`, key: "f" + S[0][1] };
    if (k === 1) return { q: "What happens <b>last</b>?", say: "What happens last?", vis: `<div class="chips">${shuffle(S).map(s => `<span class="emo xl">${s[0]}</span>`).join("")}</div>`, opts: shuffle(S.slice(-4)).map(sOpt), ans: sOpt(S[S.length - 1]), sayAns: S[S.length - 1][1], why: `The order is: ${S.map(s => s[1]).join(", then ")}.`, key: "l" + S[0][1] };
    const i = R(0, S.length - 2);
    return { q: `What comes right <b>after</b>: ${sOpt(S[i])}?`, say: `What comes right after ${S[i][1]}?`, opts: afterOpts(S, i), ans: sOpt(S[i + 1]), sayAns: S[i + 1][1], why: `After ${S[i][1]}, ${S[i + 1][1]}.`, key: "a" + S[i][1] };
  },
});

const PANAL = [["🐱", "🐈", "cat", "kitten", "🐶", "puppy", ["kitten", "bone", "doghouse"]], ["🐦", "🪺", "bird", "nest", "🐝", "hive", ["honey", "flower", "nest"]], ["✋", "🧤", "hand", "glove", "🦶", "sock", ["shoe lace", "hat", "glove"]], ["☀️", "🌞", "sun", "day", "🌙", "night", ["star", "day", "cloud"]], ["🐟", "🌊", "fish", "swim", "🐦", "fly", ["swim", "sing", "nest"]], ["🐮", "🥛", "cow", "milk", "🐔", "egg", ["milk", "feather", "corn"]], ["✏️", "📝", "pencil", "write", "✂️", "cut", ["write", "paper", "draw"]], ["🌧️", "☂️", "rain", "umbrella", "☀️", "sunglasses", ["rain", "cloud", "coat"]], ["🥾", "🦶", "boot", "foot", "🧢", "head", ["hand", "foot", "neck"]], ["🐻", "🍯", "bear", "honey", "🐰", "carrot", ["honey", "grass", "hole"]]];
topic(7, "logic", {
  id: "panalogy", title: "Goes With", icon: "🔗", blurb: "Find pairs that go together the same way.",
  lesson: [
    { t: "Pairs that match", say: "Some things go together. A hand goes with a glove. A foot goes with a sock.", html: row(`<span class="emo xl">✋</span>`, arrow(), `<span class="emo xl">🧤</span>`) + row(`<span class="emo xl">🦶</span>`, arrow(), `<span class="emo xl">🧦</span>`) },
    { t: "Same kind of link", say: "Cat is to kitten as dog is to puppy. A kitten is a baby cat. A puppy is a baby dog. The link is the same: grown-up and baby.", html: `<div class="analogy"><span>cat</span><i>→</i><span>kitten</span><b>as</b><span>dog</span><i>→</i><span class="hl">puppy</span></div>` },
    { t: "Say the link out loud", say: "Make a sentence for the first pair. A bird lives in a nest. Then use the same sentence. A bee lives in a hive!", html: `<div class="analogy"><span>🐦 bird</span><i>→</i><span>🪺 nest</span><b>as</b><span>🐝 bee</span><i>→</i><span class="hl">hive</span></div>` + note("“lives in”") },
  ],
  gen() {
    const [e1, e2, a, b, e3, d, dis] = pick(PANAL);
    return { q: `Which one fits?<div class="analogy"><span>${a}</span><i>→</i><span>${b}</span><b>as</b><span>${PANAL_NAME[e3]}</span><i>→</i><span class="blank">?</span></div>`, say: `${a} goes with ${b}. So ${cleanEmoji(e3)} goes with what?`, vis: row(`<span class="emo xl">${e1}</span>`, `<span class="emo xl">${e2}</span>`, `<span class="sym">·</span>`, `<span class="emo xl">${e3}</span>`, `<span class="car q">?</span>`), opts: shuffle([d, ...dis.filter(x => x !== d)].slice(0, 4)), ans: d, big: 1, why: `${cap(a)} goes with ${b} the same way ${PANAL_NAME[e3]} goes with ${d}.`, key: a + d };
  },
});
const PANAL_NAME = { "🐶": "dog", "🐝": "bee", "🦶": "foot", "🌙": "moon", "🐦": "bird", "🐔": "hen", "✂️": "scissors", "🔒": "lock", "🧢": "cap", "🐰": "rabbit" };
function cleanEmoji(e) { return PANAL_NAME[e] || ""; }

const COMMON = [["can fly", ["🐦", "✈️", "🦋", "🚁", "🦅", "🎈"]], ["are red", ["🍎", "🍓", "🚒", "🌹", "🍒", "❤️"]], ["have wheels", ["🚗", "🚲", "🛒", "🚌", "🛴", "🚂"]], ["are cold", ["❄️", "🍦", "🧊", "⛄", "🐧"]], ["live in water", ["🐟", "🐙", "🐳", "🦀", "🐬", "🦈"]], ["are round", ["⚽", "🍊", "🌕", "🏀", "🍩", "🔴"]], ["are hot", ["🔥", "☀️", "☕", "🌶️", "🌋"]], ["make music", ["🎸", "🥁", "🎺", "🎹", "🎻"]], ["grow on plants", ["🍎", "🌽", "🍇", "🥕", "🌻", "🍅"]], ["can be worn", ["👕", "🧢", "👟", "🧣", "👓", "🧤"]]];
topic(7, "logic", {
  id: "common", title: "What's the Same?", icon: "🧠", blurb: "Find what things have in common.",
  lesson: [
    { t: "Look for the link", say: "Bird, plane and butterfly. What is the same about them? They can all fly!", html: `<div class="chips">${["🐦", "✈️", "🦋"].map(e => `<span class="emo xl">${e}</span>`).join("")}</div>` + note("They all <b>can fly</b>") },
    { t: "Not always the same kind", say: "An apple, a fire truck and a rose are very different things. But they are all red!", html: `<div class="chips">${["🍎", "🚒", "🌹"].map(e => `<span class="emo xl">${e}</span>`).join("")}</div>` + note("They are all <b>red</b>") },
    { t: "Check each one", say: "When you guess the link, check it with every picture. Does a car have wheels? Yes. A bike? Yes. A cart? Yes!", html: `<div class="chips">${["🚗 ✔", "🚲 ✔", "🛒 ✔"].map(e => `<span class="emo lg">${e}</span>`).join(" ")}</div>` },
  ],
  gen() {
    const i = R(0, COMMON.length - 1), [rule, items] = COMMON[i], shown = shuffle(items).slice(0, 3);
    const others = shuffle(COMMON.filter((c, j) => j !== i && !shown.some(e => c[1].includes(e)))).slice(0, 3).map(c => c[0]);
    return { q: "What do these have in common?", vis: `<div class="chips">${shown.map(e => `<span class="emo xl">${e}</span>`).join("")}</div>`, opts: shuffle([rule, ...others]).map(r => `They ${r}`), ans: `They ${rule}`, why: `All three ${rule}.`, key: rule + shown.join() };
  },
});

const WEIGHTS = parseSet("🪶:feather,🍓:strawberry,🍎:apple,📚:books,🍉:watermelon,🐶:dog,🐘:elephant");
topic(7, "logic", {
  id: "balance", title: "Balance Scales", icon: "⚖️", blurb: "Which side is heavier?",
  lesson: [
    { t: "The heavy side goes down", say: "A balance scale tips down on the heavier side. The watermelon side is down, so the watermelon is heavier than the apple.", html: seesaw("🍉", "🍎", "left") },
    { t: "The light side goes up", say: "The side that goes up is lighter. The feather is up, so the feather is lighter than the book.", html: seesaw("🪶", "📚", "right") },
    { t: "Level means equal", say: "If the scale is flat, both sides weigh the same.", html: seesaw("🍎", "🍎", "none") },
  ],
  gen() {
    const [a, b] = shuffle(WEIGHTS).slice(0, 2), ia = WEIGHTS.indexOf(a), ib = WEIGHTS.indexOf(b), heavyLeft = Math.random() < 0.5;
    const [L, Rr] = heavyLeft ? (ia > ib ? [a, b] : [b, a]) : (ia > ib ? [b, a] : [a, b]);
    const heavy = ia > ib ? a : b, light = heavy === a ? b : a, askHeavy = Math.random() < 0.6;
    const ans = askHeavy ? heavy : light;
    return { q: `Which is <b>${askHeavy ? "heavier" : "lighter"}</b>?`, say: `Look at the scale. Which is ${askHeavy ? "heavier" : "lighter"}?`, vis: seesaw(L[0], Rr[0], heavyLeft ? "left" : "right"), opts: [L, Rr].map(eOpt), ans: eOpt(ans), sayAns: `the ${ans[1]}`, why: `The ${heavy[1]} side goes down, so the ${heavy[1]} is heavier.`, key: L[0] + Rr[0] + askHeavy };
  },
});

/* ====================== AGE 8 · LOGIC ====================== */
const WANAL = [["hot", "cold", "up", "down", ["over", "high", "top"], "opposites"], ["puppy", "dog", "calf", "cow", ["horse", "milk", "farm"], "baby and grown-up"], ["author", "book", "painter", "painting", ["brush", "color", "museum"], "who makes what"], ["foot", "toe", "hand", "finger", ["arm", "glove", "wrist"], "part of"], ["scissors", "cut", "pen", "write", ["ink", "paper", "draw a line"], "what it is used for"], ["bird", "flock", "fish", "school", ["pond", "fin", "water"], "group name"], ["3", "6", "5", "10", ["8", "15", "6"], "double it"], ["day", "night", "summer", "winter", ["spring", "hot", "fall"], "opposites"], ["bee", "hive", "spider", "web", ["bug", "legs", "nest"], "where it lives"], ["small", "tiny", "big", "huge", ["little", "tall", "wide"], "stronger word"], ["glove", "hand", "hat", "head", ["foot", "coat", "hair"], "what it covers"], ["kitten", "cat", "chick", "hen", ["egg", "duck", "farm"], "baby and grown-up"], ["teacher", "school", "doctor", "hospital", ["nurse", "medicine", "sick"], "where they work"], ["10", "5", "20", "10", ["15", "40", "25"], "half of it"]];
topic(8, "logic", {
  id: "analogies", title: "Word Analogies", icon: "🔗", blurb: "A is to B as C is to …?",
  lesson: [
    { t: "What is an analogy?", say: "An analogy compares two pairs that are linked the same way. Hot is to cold as up is to down. Both pairs are opposites.", html: `<div class="analogy"><span>hot</span><i>:</i><span>cold</span><b>::</b><span>up</span><i>:</i><span class="hl">down</span></div>` + note("Read it as: hot is to cold <b>as</b> up is to down") },
    { t: "Find the link", say: "Make a sentence with the first pair. A puppy is a baby dog. Then use the same sentence for the second pair. A calf is a baby cow!", html: `<div class="analogy"><span>puppy</span><i>:</i><span>dog</span><b>::</b><span>calf</span><i>:</i><span class="hl">cow</span></div>` + note("Link: <b>baby → grown-up</b>") },
    { t: "Numbers too!", say: "3 is to 6 as 5 is to 10. The link is: double it.", html: `<div class="analogy"><span>3</span><i>:</i><span>6</span><b>::</b><span>5</span><i>:</i><span class="hl">10</span></div>` + note("Link: <b>× 2</b>") },
  ],
  gen() {
    const [a, b, c, d, dis, link] = pick(WANAL);
    return { q: `<div class="analogy"><span>${a}</span><i>:</i><span>${b}</span><b>::</b><span>${c}</span><i>:</i><span class="blank">?</span></div>`, say: `${a} is to ${b}, as ${c} is to what?`, opts: shuffle([d, ...dis]), ans: d, big: 1, why: `The link is "${link}": ${a} → ${b}, so ${c} → ${d}.`, key: a + c };
  },
});

const PEOPLE = ["Ana", "Ben", "Cara", "Dev", "Eli", "Fay", "Gus", "Hana"];
const COMPS = [["taller", "tallest", "shortest"], ["faster", "fastest", "slowest"], ["older", "oldest", "youngest"], ["heavier", "heaviest", "lightest"]];
topic(8, "logic", {
  id: "ordering", title: "Who's the Tallest?", icon: "🧍", blurb: "Use clues to put people in order.",
  lesson: [
    { t: "Read each clue", say: "Ana is taller than Ben. Ben is taller than Cara. Who is the tallest?", html: passage("Ana is taller than Ben.<br>Ben is taller than Cara.") },
    { t: "Draw it out", say: "Line them up from tallest to shortest. Ana is taller than Ben, and Ben is taller than Cara. So the order is Ana, Ben, Cara.", html: `<div class="people"><span style="height:120px">Ana</span><span style="height:95px">Ben</span><span style="height:70px">Cara</span></div>` },
    { t: "The answer", say: "Ana is the tallest. Cara is the shortest. Drawing a picture makes clues easy!", html: note("Tallest: <b>Ana</b> · Shortest: <b>Cara</b>") },
  ],
  gen() {
    const n = Math.random() < 0.5 ? 3 : 4, ppl = shuffle(PEOPLE).slice(0, n), [cmp, most, least] = pick(COMPS);
    const clues = shuffle(range(0, n - 2).map(i => `${ppl[i]} is ${cmp} than ${ppl[i + 1]}.`));
    const askMost = Math.random() < 0.5, ans = askMost ? ppl[0] : ppl[n - 1];
    return { q: `Who is the <b>${askMost ? most : least}</b>?`, say: `${clues.join(" ")} Who is the ${askMost ? most : least}?`, vis: passage(clues.join("<br>")), opts: shuffle(ppl), ans, big: 1, why: `In order: ${ppl.join(", then ")}. So ${ans} is the ${askMost ? most : least}.`, extra: 10, key: ppl.join() + cmp + askMost };
  },
});

const vennVP = x => /^(can|has|have|lives|live|is|are|makes|grows)\b/i.test(x) ? x.toLowerCase() : "is " + x.toLowerCase();
const VENNS = [["Red", "Fruit", { both: ["🍓", "🍎", "🍒"], a: ["🚒", "🌹", "❤️"], b: ["🍌", "🍐", "🍇"], out: ["🚙", "⚽", "🐸"] }], ["Can fly", "Has feathers", { both: ["🐦", "🦅", "🦉"], a: ["✈️", "🦋", "🐝"], b: ["🐧"], out: ["🐶", "🐟", "🚗"] }], ["Lives in water", "Is a mammal", { both: ["🐳", "🐬"], a: ["🐟", "🐙", "🦀"], b: ["🐶", "🐘", "🐮"], out: ["🐦", "🐍", "🐝"] }], ["Round", "Food", { both: ["🍊", "🍩", "🍪"], a: ["⚽", "🌕", "🏀"], b: ["🍌", "🥕", "🌭"], out: ["📘", "✏️", "🚗"] }]];
const VNAMES = { a: A => `Only in "${A}"`, b: (A, B) => `Only in "${B}"`, both: () => "In the middle (both)", out: () => "Outside both circles" };
topic(8, "logic", {
  id: "venn", title: "Venn Diagrams", icon: "⭕", blurb: "Sort things into overlapping circles.",
  lesson: [
    { t: "Two circles", say: "A Venn diagram has two circles. One circle is for red things. The other is for fruit.", html: venn("Red", "Fruit") },
    { t: "The middle is both", say: "A strawberry is red and it is a fruit, so it goes in the middle where the circles overlap. A fire truck is red but not a fruit. A banana is fruit but not red.", html: venn("Red", "Fruit", { a: ["🚒"], both: ["🍓"], b: ["🍌"] }) },
    { t: "Outside the circles", say: "A frog is not red and not a fruit. It goes outside both circles.", html: venn("Red", "Fruit", { a: ["🚒"], both: ["🍓"], b: ["🍌"], out: ["🐸"] }) },
  ],
  gen() {
    const [A, B, sets] = pick(VENNS), zone = pick(Object.keys(sets).filter(k => sets[k].length)), item = pick(sets[zone]);
    const opts = ["a", "b", "both", "out"].map(z => VNAMES[z](A, B));
    return { q: `Where does <span class="emo">${item}</span> go?`, say: "Where does this picture go in the Venn diagram?", vis: row(`<span class="emo" style="font-size:64px">${item}</span>`, venn(A, B)), opts, ans: VNAMES[zone](A, B), why: zone === "both" ? `It ${vennVP(A)} and it ${vennVP(B)}, so it goes in the middle.` : zone === "out" ? `It doesn't fit "${A}" or "${B}", so it goes outside the circles.` : zone === "a" ? `It fits "${A}" but not "${B}".` : `It fits "${B}" but not "${A}".`, key: A + item };
  },
});

const CODEWORDS = ["CAT", "DOG", "SUN", "BED", "HAT", "PIG", "BUS", "CUP", "FOX", "BEE", "EGG", "MAP", "JAM", "ANT", "OWL", "ICE", "ZOO", "KID", "RED", "TOY"];
const numCode = w => w.split("").map(c => ALPHA.indexOf(c) + 1).join("-");
topic(8, "logic", {
  id: "codes", title: "Secret Number Codes", icon: "🔐", blurb: "Crack codes where A = 1, B = 2 …",
  lesson: [
    { t: "Letters become numbers", say: "In this code, each letter has a number. A is 1, B is 2, C is 3, all the way to Z, which is 26.", html: codeRow(ALPHA.slice(0, 13).split("").map((c, i) => [c, i + 1])) + codeRow(ALPHA.slice(13).split("").map((c, i) => [c, i + 14])) },
    { t: "Crack a code", say: "What word is 3, 1, 20? 3 is C. 1 is A. 20 is T. The word is cat!", html: eq("3-1-20") + codeRow([[3, "C"], [1, "A"], [20, "T"]]) + eq("= <b>CAT</b> 🐱") },
    { t: "Make a code", say: "To write dog in code, find each letter's number. D is 4, O is 15, G is 7. Dog is 4, 15, 7.", html: eq("DOG = <b>4-15-7</b>") },
  ],
  gen() {
    const w = pick(CODEWORDS), others = shuffle(CODEWORDS.filter(x => x !== w)).slice(0, 3);
    const table = `<details class="code-help"><summary>Show the code chart</summary>${codeRow(ALPHA.slice(0, 13).split("").map((c, i) => [c, i + 1]))}${codeRow(ALPHA.slice(13).split("").map((c, i) => [c, i + 14]))}</details>`;
    if (Math.random() < 0.55) return { q: `Crack the code! A = 1, B = 2, C = 3 …`, say: `Crack the code. ${numCode(w).split("-").join(", ")}. What word is it?`, vis: eq(numCode(w)) + table, opts: shuffle([w, ...others]), ans: w, big: 1, why: `${numCode(w)} → ${w.split("").join(", ")} = ${w}.`, extra: 15, key: "d" + w };
    const near = w.split("").map((c, i) => i === 1 ? ALPHA[(ALPHA.indexOf(c) + 1) % 26] : c).join("");
    return { q: `What is <b>${w}</b> in code? (A = 1, B = 2 …)`, say: `What is ${w.split("").join(" ")} in code?`, vis: table, opts: uniq(numCode(w), [numCode(near), numCode(w.split("").reverse().join("")), numCode(others[0])]), ans: numCode(w), big: 1, sayAns: numCode(w).split("-").join(", "), why: `${w.split("").map(c => `${c} = ${ALPHA.indexOf(c) + 1}`).join(", ")}.`, extra: 15, key: "e" + w };
  },
});

topic(8, "logic", {
  id: "matrix", title: "Grid Puzzles", icon: "🔳", blurb: "Find the missing picture in the grid.",
  lesson: [
    { t: "Rows and columns", say: "In a grid puzzle, each row follows a rule. Here the top row is small circle, big circle. The bottom row is small square, big square.", html: grid2([shp("circle", "#3D7BFF", 40), shp("circle", "#3D7BFF", 76), shp("square", "#1FAF6E", 40), shp("square", "#1FAF6E", 76)]) },
    { t: "Spot what changes", say: "Going across, the size changes from small to big. Going down, the shape and color change.", html: note("→ across: <b>size</b> changes · ↓ down: <b>shape & color</b> change") },
    { t: "Fill the gap", say: "If the top row is orange triangle then purple triangle, and the bottom row starts with an orange hexagon, the missing piece is a purple hexagon.", html: grid2([shp("triangle", "#FF7A59", 60), shp("triangle", "#9B5DE5", 60), shp("hexagon", "#FF7A59", 60), "?"]) },
  ],
  gen() {
    const [s1, s2, s3] = shuffle(LSHAPES), [c1, c2, c3] = shuffle(Object.keys(COLNAME)), mode = R(0, 1);
    let cells, ans, wrong;
    if (mode === 0) { cells = [[s1, c1, 40], [s1, c1, 76], [s2, c2, 40]]; ans = [s2, c2, 76]; wrong = [[s2, c2, 40], [s1, c1, 76], [s2, c3, 76]]; }
    else { cells = [[s1, c1, 60], [s1, c2, 60], [s2, c1, 60]]; ans = [s2, c2, 60]; wrong = [[s2, c1, 60], [s1, c2, 60], [s3, c2, 60]]; }
    const sized = (x, svg) => x[2] === 60 ? svg : svg.replace(/aria-label="([^"]+)"/, `aria-label="${x[2] === 40 ? "small" : "big"} $1"`);
    const d = x => sized(x, shp(x[0], x[1], x[2])), o = x => sized(x, shp(x[0], x[1], x[2] === 40 ? 40 : x[2] === 76 ? 72 : 60));
    return { q: "Which piece is missing?", say: "Look at the grid. Which piece is missing?", vis: grid2([...cells.map(d), "?"]), opts: shuffle([ans, ...wrong]).map(o), ans: o(ans), sayAns: `the ${ans[2] === 76 ? "big " : ans[2] === 40 ? "small " : ""}${COLNAME[ans[1]]} ${ans[0]}`, why: mode === 0 ? "Across, small turns big. Down, the shape and color change." : "Across, the color changes. Down, the shape changes.", key: s1 + s2 + c1 + c2 + mode };
  },
});

/* ====================== AGE 9 · LOGIC ====================== */
const PETS = parseSet("🐶:dog,🐱:cat,🐟:fish,🐰:rabbit,🦜:parrot,🐢:turtle");
topic(9, "logic", {
  id: "deduce", title: "Detective Puzzles", icon: "🕵️", blurb: "Use clues to figure out who has what.",
  lesson: [
    { t: "Read all the clues", say: "Three kids each have one pet: a dog, a cat and a fish. Clue 1. Mia has the fish. Clue 2. Leo does not have the dog.", html: passage("🐶 🐱 🐟 · Mia, Leo, Sam<br>1. Mia has the fish.<br>2. Leo does not have the dog.") },
    { t: "Cross things out", say: "Mia has the fish, so nobody else does. Leo can't have the dog, and the fish is taken, so Leo has the cat.", html: table([["Mia", "✘", "✘", "✔"], ["Leo", "✘", "✔", "✘"], ["Sam", "?", "✘", "✘"]], ["", "🐶", "🐱", "🐟"]) },
    { t: "The last one", say: "Only the dog is left, so Sam has the dog! When you cross out what's impossible, the answer is what's left.", html: table([["Mia", "✘", "✘", "✔"], ["Leo", "✘", "✔", "✘"], ["Sam", "✔", "✘", "✘"]], ["", "🐶", "🐱", "🐟"]) },
  ],
  gen() {
    const kids = shuffle(KIDS).slice(0, 3), pets = shuffle(PETS).slice(0, 3);
    const clues = [`${kids[0]} has the ${pets[0][1]}.`, `${kids[1]} does not have the ${pets[2][1]}.`];
    const intro = `${kids.join(", ")} each have one pet: a ${pets.map(p => p[1]).join(", a ")}.`;
    const vis = passage(`${pets.map(p => p[0]).join(" ")}<br>${intro}<br>1. ${clues[0]}<br>2. ${clues[1]}`);
    if (Math.random() < 0.5) return { q: `Who has the <b>${pets[2][1]}</b>?`, say: `${intro} Clue 1: ${clues[0]} Clue 2: ${clues[1]} Who has the ${pets[2][1]}?`, vis, opts: shuffle(kids), ans: kids[2], big: 1, why: `${kids[0]} has the ${pets[0][1]}. ${kids[1]} can't have the ${pets[2][1]}, so ${kids[1]} has the ${pets[1][1]}. That leaves the ${pets[2][1]} for ${kids[2]}.`, extra: 25, key: kids.join() + pets.join() + "w" };
    return { q: `Which pet does <b>${kids[1]}</b> have?`, say: `${intro} Clue 1: ${clues[0]} Clue 2: ${clues[1]} Which pet does ${kids[1]} have?`, vis, opts: pets.map(eOpt).map((x, i) => x.replace("</span>", `</span> ${pets[i][1]}`)), ans: eOpt(pets[1]).replace("</span>", `</span> ${pets[1][1]}`), sayAns: `the ${pets[1][1]}`, why: `The ${pets[0][1]} belongs to ${kids[0]}, and ${kids[1]} doesn't have the ${pets[2][1]}. So ${kids[1]} has the ${pets[1][1]}.`, extra: 25, key: kids.join() + pets.join() + "p" };
  },
});

const STATEMENTS = [["All cats are animals. Tom is a cat.", "Is Tom an animal?", "Yes, for sure"], ["All birds have feathers. Pip has feathers.", "Must Pip be a bird?", "We can't tell"], ["No fish can walk. Goldie is a fish.", "Can Goldie walk?", "No, for sure"], ["If it rains, the grass gets wet. It is raining.", "Is the grass wet?", "Yes, for sure"], ["If it rains, the grass gets wet. The grass is wet.", "Did it rain?", "We can't tell"], ["All squares have 4 sides. This shape is a square.", "Does it have 4 sides?", "Yes, for sure"], ["Some dogs are brown. Rex is a dog.", "Is Rex brown?", "We can't tell"], ["No reptiles have fur. A snake is a reptile.", "Does a snake have fur?", "No, for sure"], ["Everyone in Room 4 plays chess. Maya is in Room 4.", "Does Maya play chess?", "Yes, for sure"], ["All the red apples are sweet. This apple is sweet.", "Must it be red?", "We can't tell"], ["If you drop an egg, it breaks. The egg did not break.", "Was it dropped?", "No, for sure"], ["Only birds lay these blue eggs. Something laid a blue egg.", "Was it a bird?", "Yes, for sure"]];
topic(9, "logic", {
  id: "statements", title: "Yes, No or Can't Tell", icon: "🤔", blurb: "Decide what must be true.",
  lesson: [
    { t: "All means every one", say: "All cats are animals. Tom is a cat. So Tom must be an animal. Yes, for sure!", html: passage("All cats are animals. Tom is a cat.") + note("Is Tom an animal? <b>Yes, for sure</b> ✔") },
    { t: "Be careful!", say: "All birds have feathers. Pip has feathers. Is Pip a bird? Maybe, but a feather pillow has feathers too! We can't tell for sure.", html: passage("All birds have feathers. Pip has feathers.") + note("Is Pip a bird? <b>We can't tell</b> 🤷") },
    { t: "No and some", say: "No fish can walk, so a fish never walks. Some dogs are brown means only a few, so we can't tell if one dog is brown.", html: table([["All", "every single one"], ["No", "not even one"], ["Some", "at least one, maybe not all"]], ["Word", "Means"]) },
  ],
  gen() {
    const [s, q, a] = pick(STATEMENTS);
    return { q, say: `${s} ${q}`, vis: passage(s), opts: ["Yes, for sure", "No, for sure", "We can't tell"], ans: a, why: a === "We can't tell" ? "The facts don't say enough to be sure either way." : a === "Yes, for sure" ? "The facts prove it must be true." : "The facts prove it can't be true.", extra: 10, key: s };
  },
});

topic(9, "logic", {
  id: "letterseq", title: "Letter Sequences", icon: "🔤", blurb: "Find the rule in letter patterns.",
  lesson: [
    { t: "Skip letters", say: "A, C, E, G. Each letter skips one. A skip B is C. C skip D is E. So next is I.", html: train(["A", "C", "E", "G", "?"]) + note("+2 each time → <b>I</b>") },
    { t: "Going backwards", say: "Z, Y, X, W. The letters go backwards through the alphabet. Next is V.", html: train(["Z", "Y", "X", "W", "?"]) },
    { t: "Use the alphabet line", say: "Write the alphabet and count the jumps. It makes letter patterns easy!", html: `<div class="abc-strip">${ALPHA.split("").map(l => `<span>${l}</span>`).join("")}</div>` },
  ],
  gen() {
    const step = pick([1, 2, 3, -1, -2]), start = step > 0 ? R(0, 25 - step * 5) : R(-step * 5, 25), seq = range(0, 5).map(i => ALPHA[start + step * i]), ans = seq[4];
    const cands = [ALPHA[start + step * 4 + (step > 0 ? 1 : -1)], ALPHA[start + step * 4 - (step > 0 ? 1 : -1)], ALPHA[start + step * 3 + 1], ALPHA[(start + 13) % 26]];
    return { q: "What letter comes next?", vis: train([...seq.slice(0, 4), "?"]), opts: uniq(ans, cands.filter(Boolean), () => pick(ALPHA.split(""))), ans, big: 1, why: `Each step ${step > 0 ? "moves forward" : "moves back"} ${Math.abs(step)} ${Math.abs(step) === 1 ? "letter" : "letters"}: ${seq.join(", ")}.`, key: seq.join("") };
  },
});

const SHIFTWORDS = ["CAT", "DOG", "SUN", "HAT", "FISH", "BIRD", "STAR", "MOON", "CAKE", "FROG", "BOOK", "TREE", "RAIN", "SHIP", "LION", "KITE"];
const shift = (w, k) => w.split("").map(c => ALPHA[(ALPHA.indexOf(c) + k + 26) % 26]).join("");
topic(9, "logic", {
  id: "cipher", title: "Spy Codes", icon: "🕶️", blurb: "Crack codes that shift letters.",
  lesson: [
    { t: "Shift by one", say: "Spies use shift codes. Move every letter one step forward. A becomes B, B becomes C. So CAT becomes DBU.", html: codeRow([["C", "D"], ["A", "B"], ["T", "U"]]) + eq("CAT → <b>DBU</b>") },
    { t: "Decode it", say: "To read a secret message, move each letter one step back. IBU. I back to H, B back to A, U back to T. The word is HAT!", html: codeRow([["I", "H"], ["B", "A"], ["U", "T"]]) + eq("IBU → <b>HAT</b> 🎩") },
    { t: "Wrap around", say: "What comes after Z? Go back to the start! Z shifted by one becomes A.", html: codeRow([["Y", "Z"], ["Z", "A"]]) },
  ],
  gen() {
    const w = pick(SHIFTWORDS), k = pick([1, 1, 2]), enc = shift(w, k), others = shuffle(SHIFTWORDS.filter(x => x !== w && x.length === w.length)).slice(0, 2);
    if (Math.random() < 0.6) return { q: `Secret code: each letter moved <b>${k}</b> forward. Decode <b>${enc}</b>!`, say: `Each letter moved ${k} forward. Decode ${enc.split("").join(" ")}.`, vis: eq(enc) + `<div class="abc-strip">${ALPHA.split("").map(l => `<span>${l}</span>`).join("")}</div>`, opts: uniq(w, [shift(w, 1 + k), enc, ...others]), ans: w, big: 1, why: `Move each letter back ${k}: ${enc} → ${w}.`, extra: 20, key: "d" + w + k };
    return { q: `Code <b>${w}</b> by moving each letter <b>${k}</b> forward.`, say: `Code ${w.split("").join(" ")} by moving each letter ${k} forward.`, vis: `<div class="abc-strip">${ALPHA.split("").map(l => `<span>${l}</span>`).join("")}</div>`, opts: uniq(enc, [shift(w, -k), shift(w, k + 1), shift(others[0] || w, k)]), ans: enc, big: 1, sayAns: enc.split("").join(" "), why: `${w.split("").map(c => `${c}→${shift(c, k)}`).join(", ")}.`, extra: 20, key: "e" + w + k };
  },
});

function latin4() {
  const base = [[1, 2, 3, 4], [3, 4, 1, 2], [2, 1, 4, 3], [4, 3, 2, 1]], sym = shuffle([1, 2, 3, 4]);
  const rows = shuffle([0, 1, 2, 3]), cols = shuffle([0, 1, 2, 3]);
  return rows.map(r => cols.map(c => sym[base[r][c] - 1]));
}
topic(9, "logic", {
  id: "sudoku", title: "Mini Sudoku", icon: "🔢", blurb: "Each row and column has 1, 2, 3 and 4.",
  lesson: [
    { t: "The one rule", say: "In mini sudoku, every row and every column has the numbers 1, 2, 3 and 4, exactly once. No repeats!", html: sudoku([[1, 2, 3, 4], [3, 4, 1, 2], [2, 1, 4, 3], [4, 3, 2, 1]], [-1, -1]) },
    { t: "Find what's missing", say: "Look at the row with the question mark. It already has 1, 3 and 4. The only number missing is 2!", html: sudoku([[1, 0, 3, 4], [3, 4, 1, 2], [0, 1, 4, 3], [4, 3, 2, 0]], [0, 1]) + note("Row has 1, 3, 4 → missing <b>2</b>") },
    { t: "Use the column too", say: "If the row doesn't give enough clues, check the column. Together they show which number fits.", html: note("Check the <b>row</b> → then the <b>column</b> → then the <b>2×2 box</b>") },
  ],
  gen() {
    const g = latin4(), tr = R(0, 3), tc = R(0, 3), ans = g[tr][tc], shown = g.map(r => r.slice());
    const useCol = Math.random() < 0.5;
    const blanks = shuffle(range(0, 15)).filter(i => { const r = Math.floor(i / 4), c = i % 4; return !(r === tr && c === tc) && (useCol ? c !== tc : r !== tr); }).slice(0, R(3, 6));
    blanks.forEach(i => shown[Math.floor(i / 4)][i % 4] = 0);
    return { q: "Which number goes in the <b>?</b> box?", say: "Every row and column needs 1, 2, 3 and 4. Which number goes in the question mark box?", vis: sudoku(shown, [tr, tc]), opts: ["1", "2", "3", "4"], ans: String(ans), big: 1, why: `The ${useCol ? "column" : "row"} already has the other three numbers, so the missing one is ${ans}.`, extra: 15, key: g.flat().join("") + tr + tc };
  },
});

