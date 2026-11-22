/* =====================================================================
   More Logical Thinking topics (v8)
   ===================================================================== */

/* ---------- helpers ---------- */
const shadowOpt = ([e, n]) => `<span class="emo shadow" title="the shadow of the ${n}">${e}</span>`;
function lineRow(items) { return `<div class="line-row">${items.map((e, i) => `<span class="lr-cell"><span class="emo">${e}</span><small>${i + 1}</small></span>`).join("")}</div>`; }
function board(n, cells, robot) {
  let h = `<div class="board" style="grid-template-columns:repeat(${n},1fr)">`;
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) { const k = r + "," + c; h += `<span class="bcell">${robot && robot[0] === r && robot[1] === c ? '<span class="emo">🤖</span>' : cells[k] ? `<span class="emo">${cells[k]}</span>` : ""}</span>`; }
  return h + "</div>";
}
const DIRS = { up: [-1, 0, "⬆️"], down: [1, 0, "⬇️"], left: [0, -1, "⬅️"], right: [0, 1, "➡️"] };
function codeBlock(lines) { return `<pre class="code-block">${lines.join("\n")}</pre>`; }
function marbles(counts) { return `<div class="bag"><div class="bag-in">${counts.map(([e, n]) => Array(n).fill(`<span class="emo">${e}</span>`).join("")).join("")}</div></div>`; }
function magicGrid(g, hide) { return `<div class="sudoku magic">${g.map((row, r) => row.map((v, c) => `<span class="${hide.some(h => h[0] === r && h[1] === c) ? (hide[0][0] === r && hide[0][1] === c ? "tgt" : "empty") : ""}">${hide[0][0] === r && hide[0][1] === c ? "?" : hide.some(h => h[0] === r && h[1] === c) ? "" : v}</span>`).join("")).join("")}</div>`; }

/* ====================== AGE 6 · LOGIC (more) ====================== */
const LR_POOL = ["🐶", "🐱", "🐰", "🐻", "🦊", "🐸", "🐵", "🐷", "🐮", "🦁"];
topic(6, "logic", {
  id: "leftright", title: "Left & Right", icon: "👈", blurb: "Find things by where they are in a line.",
  lesson: [
    { t: "Which hand is left?", say: "Hold up both hands with your fingers up. Your left hand makes the letter L! The left side is on that side.", html: row(`<span class="emo xxl">✋</span>`, `<div class="big-time">L</div>`) + note("Your <b>left</b> thumb and finger make an <b>L</b>.") },
    { t: "First and last", say: "In a line, the first one is on the left. The last one is on the right. The dog is first and the lion is last.", html: lineRow(["🐶", "🐱", "🐰", "🦁"]) + note("👈 first … last 👉") },
    { t: "Next to", say: "The cat is just to the right of the dog. The rabbit is just to the left of the lion.", html: lineRow(["🐶", "🐱", "🐰", "🦁"]) },
  ],
  gen() {
    const items = shuffle(LR_POOL).slice(0, R(4, 5)), k = R(0, 2);
    const o = e => `<span class="emo">${e}</span>`, others = x => shuffle(items.filter(i => i !== x)).slice(0, 3);
    if (k === 0) { const first = Math.random() < 0.5, ans = first ? items[0] : items[items.length - 1]; return { q: `Which one is <b>${first ? "first" : "last"}</b> in the line?`, say: `Which one is ${first ? "first" : "last"} in the line?`, vis: lineRow(items), opts: shuffle([ans, ...others(ans)]).map(o), ans: o(ans), sayAns: `the one on the ${first ? "left" : "right"} end`, why: first ? "The first one is on the left end." : "The last one is on the right end.", key: items.join() + first }; }
    const i = R(1, items.length - 2), left = Math.random() < 0.5, ans = left ? items[i - 1] : items[i + 1];
    return { q: `What is just to the <b>${left ? "left" : "right"}</b> of <span class="emo">${items[i]}</span>?`, say: `What is just to the ${left ? "left" : "right"} of the one in spot ${i + 1}?`, vis: lineRow(items), opts: shuffle([ans, ...others(ans)]).map(o), ans: o(ans), sayAns: `the one in spot ${left ? i : i + 2}`, why: `It is in spot ${left ? i : i + 2}, right next to spot ${i + 1} on the ${left ? "left" : "right"} side.`, key: items.join() + i + left };
  },
});

const SHADOWS = parseSet("🐘:elephant,🦒:giraffe,🐢:turtle,🐇:rabbit,🦋:butterfly,🐌:snail,🦀:crab,🐙:octopus,🐓:rooster,🦆:duck,🐈:cat,🐕:dog,🦕:dinosaur,🐿️:squirrel,🦩:flamingo,🐫:camel");
topic(6, "logic", {
  id: "shadows", title: "Shadow Match", icon: "🌑", blurb: "Match a picture to its shadow.",
  lesson: [
    { t: "Shadows keep the shape", say: "A shadow is dark, but it keeps the same shape. This is a giraffe, and this is its shadow. Look at the long neck!", html: row(bigEmo("🦒"), arrow(), `<span class="emo xxl shadow">🦒</span>`) },
    { t: "Look for special parts", say: "Find something special about the shape. An elephant has a trunk. A rabbit has long ears. A snail has a round shell.", html: `<div class="chips">${["🐘", "🐇", "🐌"].map(e => `<span class="emo xl shadow">${e}</span>`).join("")}</div>` },
    { t: "Try it", say: "Which shadow is the turtle? Look for the round shell and little legs.", html: row(bigEmo("🐢"), `<span class="emo xl shadow">🦀</span>`, `<span class="emo xl shadow">🐢</span>`) },
  ],
  gen() {
    const [t, ...rest] = shuffle(SHADOWS), others = rest.slice(0, 3);
    return { q: "Which shadow belongs to this picture?", vis: `<span class="emo" style="font-size:96px">${t[0]}</span>`, opts: shuffle([t, ...others]).map(shadowOpt), ans: shadowOpt(t), why: `The ${t[1]}'s shadow has the same shape.`, key: t[0] + others.map(x => x[0]).join() };
  },
});

const PAIRS = [["🔑", "🔒", "key", "lock"], ["🧦", "👟", "sock", "shoe"], ["🐝", "🍯", "bee", "honey"], ["☂️", "🌧️", "umbrella", "rain"], ["🪥", "🦷", "toothbrush", "tooth"], ["🥛", "🍪", "milk", "cookie"], ["⚽", "🥅", "ball", "goal"], ["✏️", "📄", "pencil", "paper"], ["🐶", "🦴", "dog", "bone"], ["🐟", "🌊", "fish", "water"], ["🍝", "🍴", "spaghetti", "fork"], ["🧤", "❄️", "gloves", "snow"], ["🎂", "🕯️", "cake", "candle"], ["🐰", "🥕", "rabbit", "carrot"], ["🛏️", "😴", "bed", "sleep"], ["🍞", "🧈", "bread", "butter"]];
topic(6, "logic", {
  id: "together", title: "Goes Together", icon: "🧦", blurb: "Find things that belong in a pair.",
  lesson: [
    { t: "Pairs belong together", say: "Some things go together. A key goes with a lock. A sock goes with a shoe.", html: row(`<span class="emo xl">🔑</span><span class="emo xl">🔒</span>`, `<span class="emo xl">🧦</span><span class="emo xl">👟</span>`) },
    { t: "Why do they go together?", say: "Ask: how are they used together? We use an umbrella in the rain. A bee makes honey.", html: row(`<span class="emo xl">☂️</span><span class="emo xl">🌧️</span>`, `<span class="emo xl">🐝</span><span class="emo xl">🍯</span>`) },
    { t: "Try it", say: "What goes with a toothbrush? Your teeth!", html: row(bigEmo("🪥"), arrow(), bigEmo("🦷")) },
  ],
  gen() {
    const i = R(0, PAIRS.length - 1), [a, b, an, bn] = PAIRS[i], flip = Math.random() < 0.3;
    const [x, xn, y, yn] = flip ? [b, bn, a, an] : [a, an, b, bn];
    const others = shuffle(PAIRS.filter((_, j) => j !== i)).slice(0, 3).map(p => flip ? [p[0], p[2]] : [p[1], p[3]]);
    return { q: `Which one goes with <span class="emo">${x}</span>?`, say: `Which one goes with the ${xn}?`, vis: `<span class="emo" style="font-size:88px">${x}</span>`, opts: shuffle([[y, yn], ...others]).map(eOpt), ans: eOpt([y, yn]), sayAns: `the ${yn}`, why: `A ${xn} goes with ${yn}.`, key: x };
  },
});

topic(6, "logic", {
  id: "growing", title: "Growing Patterns", icon: "🌱", blurb: "Patterns that get bigger each time.",
  lesson: [
    { t: "Patterns can grow", say: "Some patterns get bigger each time. 1 star, 2 stars, 3 stars. Next comes 4 stars!", html: `<div class="grow-row">${[1, 2, 3].map(n => grp(n, "⭐")).join("")}<span class="car q">?</span></div>` },
    { t: "Count the change", say: "Count how many more each time. Here it grows by 2: 2, 4, 6. Next is 8.", html: `<div class="grow-row">${[2, 4, 6].map(n => grp(n, "🍎")).join("")}<span class="car q">?</span></div>` },
    { t: "Towers", say: "Towers can grow too! 1 block, 2 blocks, 3 blocks. The next tower has 4 blocks.", html: `<div class="grow-row towers">${[1, 2, 3, 4].map(n => `<span class="tower">${Array(n).fill('<span class="emo">🟦</span>').join("")}</span>`).join("")}</div>` },
  ],
  gen() {
    const step = pick([1, 1, 2]), start = R(1, 3), e = pick(["⭐", "🍎", "🌼", "🐟", "🔴"]), seq = [0, 1, 2].map(i => start + i * step), ans = start + 3 * step;
    return { q: "How many come <b>next</b>?", say: "The pattern grows. How many come next?", vis: `<div class="grow-row">${seq.map(n => grp(n, e)).join("")}<span class="car q">?</span></div>`, opts: numU(ans, [ans + 1, ans - 1, seq[2], ans + step], 2, 1), ans: String(ans), big: 1, why: `It grows by ${step} each time: ${seq.join(", ")}, ${ans}.`, key: e + start + step };
  },
});

/* ====================== AGE 7 · LOGIC (more) ====================== */
const BOARD_ITEMS = ["🍎", "⭐", "🎈", "🍌", "🧁", "⚽", "🌼", "🍓"];
topic(7, "logic", {
  id: "robot", title: "Robot Paths", icon: "🤖", blurb: "Follow arrow codes to move a robot.",
  lesson: [
    { t: "Arrow code", say: "Robots follow code. Each arrow means move one square that way. Up, down, left or right.", html: `<div class="chips">${Object.values(DIRS).map(d => `<span class="emo xl">${d[2]}</span>`).join("")}</div>` },
    { t: "Follow the code", say: "The robot follows right, right, down. Move one square at a time with your finger. It lands on the star!", html: board(3, { "1,2": "⭐", "2,0": "🍎" }, [0, 0]) + `<div class="arrows">➡️ ➡️ ⬇️</div>` },
    { t: "Go slowly", say: "Touch each arrow as you move. If you lose your place, start again from the robot.", html: note("One arrow = <b>one square</b>") },
  ],
  gen() {
    const n = 4; let r, c, path, pos;
    for (let tries = 0; tries < 50; tries++) {
      r = R(0, n - 1); c = R(0, n - 1); path = []; pos = [r, c];
      const len = R(2, 4);
      for (let i = 0; i < len; i++) { const opts = Object.keys(DIRS).filter(d => { const nr = pos[0] + DIRS[d][0], nc = pos[1] + DIRS[d][1]; return nr >= 0 && nr < n && nc >= 0 && nc < n; }); const d = pick(opts); path.push(d); pos = [pos[0] + DIRS[d][0], pos[1] + DIRS[d][1]]; }
      if (pos[0] !== r || pos[1] !== c) break;
    }
    const items = shuffle(BOARD_ITEMS).slice(0, 4), cells = {}; cells[pos.join()] = items[0];
    const free = []; for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) { const k = i + "," + j; if (k !== pos.join() && !(i === r && j === c)) free.push(k); }
    shuffle(free).slice(0, 3).forEach((k, i) => cells[k] = items[i + 1]);
    const o = e => `<span class="emo">${e}</span>`;
    return { q: "Follow the arrows. Where does the robot land?", say: `Follow the arrows: ${path.join(", ")}. Where does the robot land?`, vis: board(n, cells, [r, c]) + `<div class="arrows">${path.map(d => DIRS[d][2]).join(" ")}</div>`, opts: shuffle(items).map(o), ans: o(items[0]), sayAns: "the picture where the robot stops", why: `Move one square for each arrow: ${path.join(", ")}.`, extra: 10, key: r + "" + c + path.join() };
  },
});

const ARROWS = [["⬆️", "up"], ["➡️", "right"], ["⬇️", "down"], ["⬅️", "left"]];
const TURNS = [[1, "a quarter turn to the right (clockwise)"], [-1, "a quarter turn to the left"], [2, "a half turn"], [3, "three quarter turns to the right"], [-2, "two quarter turns to the left"], [4, "a full turn"]];
topic(7, "logic", {
  id: "turns", title: "Turning Arrows", icon: "🔄", blurb: "Quarter turns and half turns.",
  lesson: [
    { t: "A quarter turn", say: "A quarter turn to the right moves the arrow like a clock hand. Up turns to right.", html: row(`<span class="emo xxl">⬆️</span>`, arrow(), `<span class="emo xxl">➡️</span>`) + note("↻ quarter turn right") },
    { t: "Turning left", say: "A quarter turn to the left goes the other way. Up turns to left.", html: row(`<span class="emo xxl">⬆️</span>`, arrow(), `<span class="emo xxl">⬅️</span>`) + note("↺ quarter turn left") },
    { t: "A half turn", say: "A half turn is two quarter turns. The arrow ends up pointing the opposite way. Up becomes down.", html: row(`<span class="emo xxl">⬆️</span>`, arrow(), `<span class="emo xxl">⬇️</span>`) },
  ],
  gen() {
    const s = R(0, 3), [k, words] = pick(TURNS), e = ARROWS[(s + k + 4) % 4], o = ([em, n]) => `<span class="emo" title="pointing ${n}">${em}</span>`;
    if (Math.random() < 0.3) { const e2 = ARROWS[(s - k + 8) % 4]; return { q: `After <b>${words}</b>, the arrow points <b>${ARROWS[s][1]}</b>. Where was it pointing <b>before</b>?`, say: `After ${words}, the arrow points ${ARROWS[s][1]}. Where was it pointing before?`, vis: `<span class="emo" style="font-size:96px">${ARROWS[s][0]}</span>`, opts: ARROWS.map(o), ans: o(e2), sayAns: e2[1], why: `Turn it back the other way: it was pointing ${e2[1]}.`, key: "b" + s + k }; }
    return { q: `The arrow points <b>${ARROWS[s][1]}</b>. It makes <b>${words}</b>. Where does it point now?`, say: `The arrow points ${ARROWS[s][1]}. It makes ${words}. Where does it point now?`, vis: `<span class="emo" style="font-size:96px">${ARROWS[s][0]}</span>`, opts: ARROWS.map(o), ans: o(e), sayAns: e[1], why: `${cap(ARROWS[s][1])} with ${words} is ${e[1]}.`, key: s + "" + k };
  },
});

const RIDDLES = [["I have four legs and I say woof.", "🐶", "dog"], ["I am yellow and monkeys love to eat me.", "🍌", "banana"], ["I shine in the sky during the day.", "☀️", "sun"], ["I have wings and I make honey.", "🐝", "bee"], ["You wear me on your feet.", "👟", "shoe"], ["I am cold and white and I fall in winter.", "❄️", "snow"], ["I have a trunk and big floppy ears.", "🐘", "elephant"], ["You use me to brush your teeth.", "🪥", "toothbrush"], ["I have hands but I can't clap. I tell the time.", "⏰", "clock"], ["I have pages but I'm not a tree. You read me.", "📖", "book"], ["Open me when it rains to stay dry.", "☂️", "umbrella"], ["I have a shell and I move very slowly.", "🐢", "turtle"], ["I have keys but I open no doors. You play music on me.", "🎹", "piano"], ["I hop, I have a pouch, and I live in Australia.", "🦘", "kangaroo"], ["I have two wheels and pedals.", "🚲", "bike"], ["I am full of holes and I help wash dishes.", "🧽", "sponge"], ["I have a long neck and eat leaves from tall trees.", "🦒", "giraffe"], ["I twinkle at night far up in the sky.", "⭐", "star"], ["I have stripes and I look like a horse.", "🦓", "zebra"], ["I am round and you kick me in a game.", "⚽", "soccer ball"], ["I am orange, I grow in the ground, and rabbits love me.", "🥕", "carrot"], ["I have eight arms and live in the sea.", "🐙", "octopus"], ["I hoot at night and have big round eyes.", "🦉", "owl"], ["I am cold and sweet, and I melt in the sun.", "🍦", "ice cream"], ["I fly through the sky and take people on trips.", "✈️", "airplane"], ["I have a mane and I am called the king of the jungle.", "🦁", "lion"]];
topic(7, "logic", {
  id: "riddles", title: "Picture Riddles", icon: "❓", blurb: "Use clues to guess the answer.",
  lesson: [
    { t: "Riddles give clues", say: "A riddle gives you clues. Listen to every clue. I have four legs and I say woof. What am I? A dog!", html: col(passage("I have four legs and I say woof."), bigEmo("🐶")) },
    { t: "Use every clue", say: "One clue may fit many things. Four legs could be a cat or a cow. But woof only fits a dog!", html: note("four legs → 🐶 🐱 🐮 · <b>woof</b> → 🐶") },
    { t: "Tricky riddles", say: "Some riddles are tricky. I have hands but I can't clap. A clock has hands!", html: col(passage("I have hands but I can't clap."), bigEmo("⏰")) },
  ],
  gen() {
    const i = R(0, RIDDLES.length - 1), [txt, e, n] = RIDDLES[i], others = shuffle(RIDDLES.filter((_, j) => j !== i)).slice(0, 3);
    return { q: `<div class="sentence">${txt}</div>What am I?`, say: `${txt} What am I?`, opts: shuffle([[e, n], ...others.map(r => [r[1], r[2]])]).map(eOpt), ans: eOpt([e, n]), sayAns: `a ${n}`, why: `It's a ${n}!`, key: txt };
  },
});

topic(7, "logic", {
  id: "truefalse", title: "True or False?", icon: "✅", blurb: "Check if a sentence is right.",
  lesson: [
    { t: "True means right", say: "A true sentence matches what you see. There are 3 apples. True!", html: grp(3, "🍎") + note("“There are 3 apples.” → <b>True ✔</b>") },
    { t: "False means not right", say: "A false sentence does not match. There are more bananas than apples? Count them. 2 bananas and 4 apples. False!", html: `<div class="cmp"><div>${grp(2, "🍌")}</div><div>${grp(4, "🍎")}</div></div>` + note("“More bananas than apples.” → <b>False ✘</b>") },
    { t: "Check every one", say: "All of these are animals? Dog, cat, frog. Yes, all of them. True! If even one isn't, it's false.", html: `<div class="chips"><span class="emo xl">🐶</span><span class="emo xl">🐱</span><span class="emo xl">🐸</span></div>` },
  ],
  gen() {
    const k = R(0, 2), TF = ["True ✔", "False ✘"];
    if (k === 0) { const [t1, t2] = shuffle(THINGS).slice(0, 2), a = R(1, 8); let b = R(1, 8); while (b === a) b = R(1, 8); const more = Math.random() < 0.5, truth = more ? a > b : a < b; return { q: `True or false? There are <b>${more ? "more" : "fewer"}</b> ${t1[1]} than ${t2[1]}.`, vis: `<div class="cmp"><div>${grp(a, t1[0])}</div><div>${grp(b, t2[0])}</div></div>`, opts: TF, ans: TF[truth ? 0 : 1], big: 1, why: `There ${a === 1 ? `is 1 ${t1[1].replace(/(ie)?s$/, (m, ie) => ie ? "y" : "")}` : `are ${a} ${t1[1]}`} and ${b === 1 ? `1 ${t2[1].replace(/(ie)?s$/, (m, ie) => ie ? "y" : "")}` : `${b} ${t2[1]}`}.`, key: "c" + t1[1] + a + b + more }; }
    if (k === 1) { const [ca, cb] = shuffle(LCAT_KEYS).slice(0, 2), all = Math.random() < 0.5, items = shuffle(LCATS[ca]).slice(0, all ? 4 : 3); if (!all) items.splice(R(0, 3), 0, pick(LCATS[cb])); return { q: `True or false? <b>All</b> of these are ${ca}.`, vis: `<div class="chips">${items.map(x => `<span class="emo xl">${x[0]}</span>`).join("")}</div>`, opts: TF, ans: TF[all ? 0 : 1], big: 1, why: all ? `Every one is from the ${ca} group.` : `One of them is not in the ${ca} group.`, key: "a" + items.map(x => x[0]).join() }; }
    const t = pick(THINGS), n = R(2, 9), said = Math.random() < 0.5 ? n : n + pick([-1, 1]);
    return { q: `True or false? There are <b>${said}</b> ${t[1]}.`, vis: grp(n, t[0]), opts: TF, ans: TF[said === n ? 0 : 1], big: 1, why: `Count them: there are ${n}.`, key: "n" + t[1] + n + said };
  },
});

/* ====================== AGE 8 · LOGIC (more) ====================== */
function machine(rows, rule) { return `<div class="machine"><div class="mach-box">⚙️ Rule: <b>${rule}</b></div>${table(rows.map(([a, b]) => [a, b]), ["In", "Out"])}</div>`; }
topic(8, "logic", {
  id: "machines", title: "Function Machines", icon: "⚙️", blurb: "Numbers go in, a rule changes them.",
  lesson: [
    { t: "A number machine", say: "A function machine follows one rule. If the rule is add 3, then 2 goes in and 5 comes out.", html: machine([[2, 5], [4, 7], [10, 13]], "+3") },
    { t: "Find the rule", say: "Look at what happens every time. 1 becomes 2, 3 becomes 6, 5 becomes 10. Each number doubles. The rule is times 2.", html: machine([[1, 2], [3, 6], [5, 10]], "?") + note("Check the rule on <b>every</b> row") },
    { t: "Use the rule", say: "Once you know the rule, use it on the new number. Times 2 on 7 gives 14.", html: machine([[1, 2], [3, 6], [7, "<b>14</b>"]], "×2") },
  ],
  gen() {
    const type = pick(["add", "sub", "mul"]), k = type === "mul" ? R(2, 5) : R(2, 9), f = x => type === "add" ? x + k : type === "sub" ? x - k : x * k, rule = (type === "add" ? "+" : type === "sub" ? "−" : "×") + k;
    const ins = shuffle(range(type === "sub" ? k + 1 : 1, type === "sub" ? k + 15 : 12)).slice(0, 4);
    const rows = ins.slice(0, 3).map(x => [x, f(x)]), last = ins[3], ans = f(last);
    if (Math.random() < 0.6) return { q: "What number comes <b>out</b>?", say: `Find the rule, then use it. ${last} goes in. What comes out?`, vis: machine([...rows, [last, "?"]], "?"), opts: numU(ans, [ans + 1, ans - 1, last + k, last * 2, ans + k], 4, 0), ans: String(ans), big: 1, why: `The rule is ${rule}: ${last} ${rule} = ${ans}.`, key: rule + ins.join() };
    const alts = [`+${k}`, `−${k}`, `×${k}`, `+${k + 1}`, `×${k + 1}`].filter(r => r !== rule);
    return { q: "What is the <b>rule</b>?", vis: machine(rows, "?"), opts: uniq(rule, shuffle(alts)), ans: rule, big: 1, why: `Every number goes ${rule}.`, key: "r" + rule + ins.join() };
  },
});

const NCLUES = [
  [n => n % 2 === 0, () => "I am even."], [n => n % 2 === 1, () => "I am odd."],
  [(n, m) => Math.floor(n / 10) === m.t, m => `My tens digit is ${m.t}.`],
  [(n, m) => (Math.floor(n / 10) + n % 10) === m.s, m => `My digits add up to ${m.s}.`],
  [n => n % 5 === 0, () => "I am a multiple of 5."], [n => n % 3 === 0, () => "I am in the 3 times table."],
  [(n, m) => n % 10 > m.o, m => `My ones digit is bigger than ${m.o}.`], [(n, m) => n % 10 < m.u, m => `My ones digit is smaller than ${m.u}.`],
];
topic(8, "logic", {
  id: "numdetective", title: "Number Detective", icon: "🔎", blurb: "Use clues to find the secret number.",
  lesson: [
    { t: "A secret number", say: "I'm thinking of a number between 10 and 20. It's even. Its digits add up to 5. Which number is it? 14!", html: passage("I am between 10 and 20.<br>I am even.<br>My digits add up to 5.") + eq("→ <b>14</b>") },
    { t: "Cross numbers out", say: "Write all the numbers that could fit. Then cross out any number that breaks a clue.", html: `<div class="nums-strike">${range(10, 20).map(n => `<span class="${n === 14 ? "keep" : "x"}">${n}</span>`).join("")}</div>` },
    { t: "Check every clue", say: "When one number is left, check it against every clue. 14 is between 10 and 20, it's even, and 1 plus 4 is 5. Yes!", html: note("✔ between 10 and 20 · ✔ even · ✔ 1 + 4 = 5") },
  ],
  gen() {
    for (let tries = 0; tries < 200; tries++) {
      const n = R(11, 59), lo = Math.max(10, n - R(2, 8)), hi = lo + 12, meta = { t: Math.floor(n / 10), s: Math.floor(n / 10) + n % 10, o: Math.max(0, n % 10 - R(1, 3)), u: Math.min(9, n % 10 + R(1, 3)) };
      if (n % 10 === 0 && meta.u === 0) continue;
      let cand = range(lo, hi); const used = [`I am between ${lo} and ${hi}.`];
      for (const [test, say] of shuffle(NCLUES)) { if (!test(n, meta)) continue; const next = cand.filter(x => test(x, meta)); if (next.length < cand.length) { cand = next; used.push(say(meta)); } if (cand.length === 1) break; }
      if (cand.length !== 1 || used.length > 4) continue;
      const wrong = shuffle(range(lo, hi).filter(x => x !== n)).slice(0, 3);
      return { q: "What is the secret number?", say: `${used.join(" ")} What is the secret number?`, vis: passage(used.join("<br>")), opts: shuffle([n, ...wrong]).map(String), ans: String(n), big: 1, why: `Only ${n} fits every clue.`, extra: 15, key: n + used.join() };
    }
    return { q: "What is the secret number? I am between 10 and 20. I am even. My digits add up to 5.", opts: ["12", "14", "16", "15"], ans: "14", big: 1, why: "Only 14 fits every clue.", key: "fallback" };
  },
});

const LINE_ANIMALS = parseSet("🐶:dog,🐱:cat,🐰:rabbit,🐸:frog,🐻:bear,🦊:fox");
topic(8, "logic", {
  id: "lineup", title: "Line-Up Puzzles", icon: "🧩", blurb: "Use clues to find who stands where.",
  lesson: [
    { t: "Three spots", say: "Three animals stand in a line: left, middle and right. Clues tell us who goes where.", html: `<div class="spots"><span>left</span><span>middle</span><span>right</span></div>` },
    { t: "Place the sure ones first", say: "Clue 1. The cat is on the left end. Put the cat there first! Clue 2. The dog is next to the cat. So the dog must be in the middle.", html: passage("1. The cat is on the left end.<br>2. The dog is next to the cat.") + lineRow(["🐱", "🐶", "❔"]) },
    { t: "Fill in the last one", say: "Only one spot is left, so the frog goes on the right.", html: lineRow(["🐱", "🐶", "🐸"]) },
  ],
  gen() {
    const perms = [[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]];
    for (let tries = 0; tries < 100; tries++) {
      const an = shuffle(LINE_ANIMALS).slice(0, 3), sol = pick(perms), posOf = (p, a) => p.indexOf(a);
      const P = [];
      for (let a = 0; a < 3; a++) {
        const pa = posOf(sol, a);
        if (pa === 0) P.push([p => posOf(p, a) === 0, `The ${an[a][1]} is on the left end.`]);
        if (pa === 2) P.push([p => posOf(p, a) === 2, `The ${an[a][1]} is on the right end.`]);
        if (pa !== 1) P.push([p => posOf(p, a) !== 1, `The ${an[a][1]} is not in the middle.`]);
        for (let b = 0; b < 3; b++) if (a !== b) {
          if (posOf(sol, a) < posOf(sol, b)) P.push([p => posOf(p, a) < posOf(p, b), `The ${an[a][1]} is somewhere to the left of the ${an[b][1]}.`]);
          if (Math.abs(posOf(sol, a) - posOf(sol, b)) === 1 && a < b) P.push([p => Math.abs(posOf(p, a) - posOf(p, b)) === 1, `The ${an[a][1]} is next to the ${an[b][1]}.`]);
        }
      }
      const clues = []; let cands = perms.slice();
      for (const [test, txt] of shuffle(P)) { const next = cands.filter(test); if (next.length < cands.length) { cands = next; clues.push(txt); } if (cands.length === 1) break; }
      if (cands.length !== 1 || clues.length < 2 || clues.length > 3) continue;
      const spot = R(0, 2), name = ["left end", "middle", "right end"][spot], ansA = an[sol[spot]];
      return { q: `Who is ${spot === 1 ? "in" : "on"} the <b>${name}</b>?`, say: `${clues.join(" ")} Who is ${spot === 1 ? "in" : "on"} the ${name}?`, vis: passage(clues.map((c, i) => `${i + 1}. ${c}`).join("<br>")) + `<div class="spots"><span>left</span><span>middle</span><span>right</span></div>`, opts: an.map(eOpt), ans: eOpt(ansA), sayAns: `the ${ansA[1]}`, why: `The line is: ${sol.map(i => an[i][1]).join(", ")}.`, extra: 20, key: sol.join() + an.map(x => x[0]).join() + spot };
    }
    return { q: "Who is in the <b>middle</b>?", say: "The cat is on the left end. The dog is next to the cat. Who is in the middle?", vis: passage("1. The cat is on the left end.<br>2. The dog is next to the cat."), opts: [["🐱", "cat"], ["🐶", "dog"], ["🐸", "frog"]].map(eOpt), ans: eOpt(["🐶", "dog"]), sayAns: "the dog", why: "The line is: cat, dog, frog.", key: "fallback" };
  },
});

const SYM = "AHIMOTUVWXY".split(""), NOSYM = "BCDEFGJKLNPQRSZ".split("");
topic(8, "logic", {
  id: "symmetry", title: "Mirror Symmetry", icon: "🪞", blurb: "Things that match on both sides.",
  lesson: [
    { t: "A mirror line", say: "Something is symmetric when one half is a mirror picture of the other half. Fold the letter A down the middle and both sides match!", html: `<div class="mirror"><span>A</span></div>` + note("The dashed line is the <b>mirror line</b>.") },
    { t: "Not symmetric", say: "The letter F does not match when you fold it. The left side and right side are different.", html: `<div class="mirror"><span>F</span></div>` },
    { t: "Symmetric things", say: "Butterflies, hearts and faces are symmetric too!", html: `<div class="chips"><span class="emo xl">🦋</span><span class="emo xl">❤️</span><span class="emo xl">🙂</span></div>` },
  ],
  gen() {
    const wantSym = Math.random() < 0.6, ans = wantSym ? pick(SYM) : pick(NOSYM), others = shuffle(wantSym ? NOSYM : SYM).slice(0, 3);
    return { q: wantSym ? "Which letter looks the <b>same</b> in a mirror (left and right sides match)?" : "Which letter's <b>left and right sides don't match</b>?", say: wantSym ? "Which letter looks the same in a mirror? Its left and right sides match." : "Which letter's left and right sides don't match?", opts: shuffle([ans, ...others]), ans, big: 1, why: wantSym ? `Draw a line straight down the middle of ${ans}: the left and right sides match.` : `Draw a line straight down the middle of ${ans}: the left and right sides don't match.`, key: ans + wantSym };
  },
});

/* ====================== AGE 9 · LOGIC (more) ====================== */
const MARBLE_COLS = [["🔴", "red"], ["🔵", "blue"], ["🟢", "green"], ["🟡", "yellow"], ["🟣", "purple"]];
const LIKELY = ["impossible", "unlikely", "likely", "certain"];
topic(9, "logic", {
  id: "chance", title: "Chance & Likely", icon: "🎲", blurb: "Impossible, unlikely, likely or certain?",
  lesson: [
    { t: "How likely is it?", say: "Some things are certain, like the sun rising tomorrow. Some are impossible, like a cat flying to the moon.", html: table([["certain", "will happen for sure ☀️"], ["likely", "will probably happen"], ["unlikely", "probably won't happen"], ["impossible", "can never happen 🐱🚀"]], ["Word", "Means"]) },
    { t: "Marbles in a bag", say: "This bag has 5 red marbles and 1 blue. If you pick one without looking, red is likely, and blue is unlikely.", html: marbles([["🔴", 5], ["🔵", 1]]) },
    { t: "Compare the amounts", say: "There are no green marbles, so picking green is impossible. The color with the most marbles is the most likely.", html: note("More marbles of a color → <b>more likely</b>") },
  ],
  gen() {
    const cols = shuffle(MARBLE_COLS).slice(0, 3), counts = (c1 => [R(4, 7), c1, R(0, c1 - 1)])(R(1, 3)), bag = cols.map((c, i) => [c[0], counts[i]]).filter(b => b[1] > 0), total = bag.reduce((s, b) => s + b[1], 0), vis = marbles(bag), k = R(0, 1);
    if (k === 0) { const most = Math.random() < 0.6, pickIdx = most ? 0 : counts.indexOf(Math.min(...counts.filter(c => c > 0))); const o = c => `<span class="emo" title="${c[1]}">${c[0]}</span>`; return { q: `Which color are you <b>${most ? "most" : "least"}</b> likely to pick?`, say: `Which color are you ${most ? "most" : "least"} likely to pick?`, vis, opts: cols.filter((_, i) => counts[i] > 0).map(o), ans: o(cols[pickIdx]), sayAns: cols[pickIdx][1], why: `There are ${counts[pickIdx]} ${cols[pickIdx][1]} out of ${total}.`, key: counts.join() + most + cols[0][0] }; }
    const word = c => c === 0 ? "impossible" : c === total ? "certain" : 2 * c > total ? "likely" : 2 * c < total ? "unlikely" : null;
    let bag2 = bag, tot2 = total;
    if (Math.random() < 0.15) { bag2 = [[cols[0][0], R(3, 6)]]; tot2 = bag2[0][1]; }
    const cnt = e => (bag2.find(b => b[0] === e) || [0, 0])[1];
    const choices = MARBLE_COLS.filter(c => { const n = cnt(c[0]); const w = n === 0 ? "impossible" : n === tot2 ? "certain" : 2 * n > tot2 ? "likely" : 2 * n < tot2 ? "unlikely" : null; return w; });
    const col = pick(choices), n = cnt(col[0]), w = n === 0 ? "impossible" : n === tot2 ? "certain" : 2 * n > tot2 ? "likely" : "unlikely";
    return { q: `You pick one marble without looking. Picking <b>${col[1]}</b> is…`, say: `You pick one marble without looking. Picking ${col[1]} is what?`, vis: marbles(bag2), opts: LIKELY, ans: w, big: 1, why: `${n} of the ${tot2} marbles are ${col[1]}.`, key: bag2.map(b => b[0] + b[1]).join() + col[0] };
  },
});

topic(9, "logic", {
  id: "loops", title: "Robot Loops", icon: "🔁", blurb: "Run code with repeat loops.",
  lesson: [
    { t: "Code runs in order", say: "Code runs one line at a time, from top to bottom. Start at 2. Add 3. Add 3. You end at 8.", html: codeBlock(["start at 2", "add 3", "add 3"]) + eq("2 → 5 → <b>8</b>") },
    { t: "Repeat loops", say: "A repeat loop saves writing. Repeat 4 times: add 3. That's the same as adding 3 four times, so we add 12.", html: codeBlock(["start at 0", "repeat 4 times:", "    add 3"]) + eq("0 + 3 + 3 + 3 + 3 = <b>12</b>") },
    { t: "After the loop", say: "Finish the loop first, then do the lines after it. Start at 1, repeat 3 times add 2, then subtract 4. 1 plus 6 is 7, minus 4 is 3.", html: codeBlock(["start at 1", "repeat 3 times:", "    add 2", "subtract 4"]) + eq("1 + 6 − 4 = <b>3</b>") },
  ],
  gen() {
    const s = R(0, 10), n = R(2, 5), a = R(2, 6), after = Math.random() < 0.5, b = after ? R(1, s + n * a) : 0, end = s + n * a - b;
    const lines = [`start at ${s}`, `repeat ${n} times:`, `    add ${a}`].concat(after ? [`subtract ${b}`] : []);
    return { q: "Run the code. What number do you end on?", say: `Start at ${s}. Repeat ${n} times, add ${a}.${after ? ` Then subtract ${b}.` : ""} What number do you end on?`, vis: codeBlock(lines), opts: numU(end, [s + a - b, end + a, end - a, s + n + a - b, end + b], 3, 0), ans: String(end), big: 1, why: `${s} + ${n} × ${a} = ${s + n * a}${after ? `, then − ${b} = ${end}` : ""}.`, extra: 10, key: lines.join() };
  },
});

const FRUITS3 = [["🍎", "apples", 2], ["🍍", "pineapples", 4], ["🍌", "bananas", 2], ["🍊", "oranges", 2], ["🍉", "watermelons", 5], ["🍇", "bunches of grapes", 2], ["🍓", "strawberries", 1], ["🥥", "coconuts", 3]];
/* one fruit from each size, biggest first, so 1 big fruit always balances several smaller ones */
function fruitTrio() { for (;;) { const t = shuffle(FRUITS3).slice(0, 3).sort((p, q) => q[2] - p[2]); if (t[0][2] > t[1][2] && t[1][2] > t[2][2]) return t; } }
const fruit1 = p => p.replace(/^bunches/, "bunch").replace(/ies$/, "y").replace(/s$/, "");
topic(9, "logic", {
  id: "balancemath", title: "Balance Puzzles", icon: "⚖️", blurb: "Swap things that weigh the same.",
  lesson: [
    { t: "Equal weights", say: "If a scale is balanced, both sides weigh the same. 1 pineapple balances 2 apples.", html: seesaw("🍍", "🍎🍎", "none") },
    { t: "Swap it", say: "If 1 pineapple equals 2 apples, then 2 pineapples equal 4 apples. Double both sides!", html: eq("1 🍍 = 2 🍎") + eq("2 🍍 = <b>4</b> 🍎") },
    { t: "Chain the facts", say: "1 pineapple equals 2 apples. 1 apple equals 3 strawberries. So 1 pineapple equals 2 times 3, which is 6 strawberries!", html: eq("🍍 = 🍎🍎") + eq("🍎 = 🍓🍓🍓") + eq("🍍 = <b>6</b> 🍓") },
  ],
  gen() {
    const [A, B, Cc] = fruitTrio(), x = R(2, 4), y = R(2, 4), m = R(1, 3);
    if (Math.random() < 0.5) { const ans = m * x; return { q: `1 ${A[0]} balances ${x} ${B[0]}. How many ${B[0]} balance <b>${m}</b> ${A[0]}?`, say: `1 ${fruit1(A[1])} balances ${x} ${B[1]}. How many ${B[1]} balance ${m} ${m === 1 ? fruit1(A[1]) : A[1]}?`, vis: eq(`1 ${A[0]} = ${x} ${B[0]}`), opts: numU(ans, [x + m, ans + 1, ans - 1, x], 2, 1), ans: String(ans), big: 1, why: `${m} × ${x} = ${ans}.`, key: A[0] + B[0] + x + m }; }
    const ans = x * y * m;
    return { q: `1 ${A[0]} = ${x} ${B[0]}, and 1 ${B[0]} = ${y} ${Cc[0]}. How many ${Cc[0]} equal <b>${m}</b> ${A[0]}?`, say: `1 ${fruit1(A[1])} equals ${x} ${B[1]}. 1 ${fruit1(B[1])} equals ${y} ${Cc[1]}. How many ${Cc[1]} equal ${m} ${m === 1 ? fruit1(A[1]) : A[1]}?`, vis: eq(`1 ${A[0]} = ${x} ${B[0]}`) + eq(`1 ${B[0]} = ${y} ${Cc[0]}`), opts: numU(ans, [x + y, x * y, ans + x, ans - y, (x + y) * m], 4, 1), ans: String(ans), big: 1, why: `1 ${A[0]} = ${x} × ${y} = ${x * y} ${Cc[0]}, so ${m} ${A[0]} = ${ans}.`, extra: 15, key: A[0] + B[0] + Cc[0] + x + y + m };
  },
});

const MAGIC_SQ = [[2, 7, 6], [9, 5, 1], [4, 3, 8]];
function magicVariant() {
  let g = MAGIC_SQ.map(r => r.slice());
  const rot = R(0, 3); for (let i = 0; i < rot; i++) g = g[0].map((_, c) => g.map(r => r[c]).reverse());
  if (Math.random() < 0.5) g = g.map(r => r.slice().reverse());
  const k = R(0, 5); return { g: g.map(r => r.map(v => v + k)), total: 15 + 3 * k };
}
topic(9, "logic", {
  id: "magicsq", title: "Magic Squares", icon: "✨", blurb: "Every row and column adds to the same total.",
  lesson: [
    { t: "A magic square", say: "In a magic square, every row and every column adds up to the same number. Here every line adds to 15!", html: magicGrid(MAGIC_SQ, [[-1, -1]]) + note("2 + 7 + 6 = 15 · 9 + 5 + 1 = 15 · 4 + 3 + 8 = 15") },
    { t: "Find a missing number", say: "If a row has 2 and 7, and the total is 15, then the missing number is 15 minus 9, which is 6.", html: magicGrid(MAGIC_SQ, [[0, 2]]) + eq("15 − (2 + 7) = <b>6</b>") },
    { t: "Pick a full line", say: "Choose a row or column with only one number missing. Add the numbers you have, then take that away from the total.", html: note("total − what you have = <b>missing</b>") },
  ],
  gen() {
    const { g, total } = magicVariant(), tr = R(0, 2), tc = R(0, 2), ans = g[tr][tc];
    const hide = [[tr, tc]]; if (Math.random() < 0.5) { const r2 = (tr + 1 + R(0, 1)) % 3, c2 = (tc + 1 + R(0, 1)) % 3; hide.push([r2, c2]); }
    return { q: `Every row and column adds up to <b>${total}</b>. What number goes in the <b>?</b> box?`, say: `Every row and column adds up to ${total}. What number goes in the question mark box?`, vis: magicGrid(g, hide), opts: numU(ans, [ans + 1, ans - 1, ans + 2, total - ans], 3, 0), ans: String(ans), big: 1, why: `The row adds to ${total}: ${total} − ${g[tr].filter((_, c) => c !== tc).join(" − ")} = ${ans}.`, extra: 15, key: g.flat().join() + tr + tc };
  },
});

/* tricks for the new topics */
Object.assign(TRICKS[6].logic, { leftright: "Hold up your left hand: your thumb and finger make an L for left.", shadows: "Look at the outline, like ears, a trunk, a long neck or a shell. The shadow keeps that shape.", together: "Ask: how would I use these two things together?", growing: "Count how many more there are each time. Add that much again." });
Object.assign(TRICKS[7].logic, { robot: "Put your finger on the robot and move one square for each arrow. Don't skip any!", turns: "Pretend you are the arrow. Turning right is the way a clock's hands go.", riddles: "Listen to every clue. The answer has to fit all of them, not just one.", truefalse: "Count or check everything carefully. If even one thing doesn't match, it's false." });
Object.assign(TRICKS[8].logic, { machines: "Look at what happens to the first number, then check that the same rule works for every row.", numdetective: "Write down every number that could fit, then cross out the ones that break a clue.", lineup: "Draw three boxes. Put in the sure clues first, like who is at an end.", symmetry: "Imagine folding the letter down the middle. If both halves land on each other, it's symmetric." });
Object.assign(TRICKS[9].logic, { chance: "More of a color means it's more likely. None means impossible. All of them means certain.", loops: "Work out the whole loop first: repeat 4 times add 3 is the same as adding 4 × 3.", balancemath: "Swap things that weigh the same, one step at a time, and multiply as you go.", magicsq: "Pick a line with only one number missing. The total take away what you have is the answer." });

