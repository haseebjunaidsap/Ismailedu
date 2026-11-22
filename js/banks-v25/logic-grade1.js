/* =====================================================================
   v25 · Age 6 · Logical Thinking (tag V25LG6)
   New formats and fresh data for every age-6 logic topic.
   Every new question carries q.v25 so the why-rules below only speak for them.
   ===================================================================== */

/* ---------- shared helpers ---------- */
const V25LG6_ps = s => parseSet(s);
const V25LG6_e = (e, n) => `<span class="emo" title="${n}">${e}</span>`;
const V25LG6_T = h => (String(h).match(/title="([^"]+)"/) || [])[1] || null;
const V25LG6_PL = n => LG6V_PL(n);
const V25LG6_IS = n => V25LG6_PL(n) ? "are" : "is";
const V25LG6_A = n => LG6V_A(n);
const V25LG6_IT = n => V25LG6_PL(n) ? "they" : "it";
const V25LG6_and = a => a.length < 2 ? String(a[0]) : a.slice(0, -1).join(", ") + " and " + a[a.length - 1];
const V25LG6_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const V25LG6_COLS = Object.keys(COLNAME);
/* a shape picture whose aria-label also says big/small */
const V25LG6_sz = (n, c, big, s) => shp(n, c, s || (big ? 64 : 36)).replace('aria-label="', `aria-label="${big ? "big" : "small"} `);
const V25LG6_spl = s => s + "s";

/* =====================================================================
   1 · Odd One Out: "Three of these can fly…" and "same color"
   ===================================================================== */
const V25LG6_PROP = [
  { k: "fly", q: "Three of these can fly. Which one <b>cannot</b> fly?", has: V25LG6_ps("🐦:bird,🦋:butterfly,✈️:airplane,🐝:bee,🚁:helicopter,🦉:owl,🦅:eagle"), lacks: V25LG6_ps("🐷:pig,🚗:car,🐢:turtle,🐌:snail,🐮:cow,🐘:elephant,🚲:bike"), yes: ["can fly", "can fly"], no: ["cannot fly", "cannot fly"] },
  { k: "wheels", q: "Three of these have wheels. Which one does <b>not</b> have wheels?", has: V25LG6_ps("🚗:car,🚲:bike,🚌:bus,🛹:skateboard,🚜:tractor,🛴:scooter"), lacks: V25LG6_ps("⛵:sailboat,🐴:horse,🛷:sled,🛶:canoe,🐫:camel"), yes: ["has wheels", "have wheels"], no: ["does not have wheels", "do not have wheels"] },
  { k: "water", q: "Three of these live in the water. Which one does <b>not</b>?", has: V25LG6_ps("🐟:fish,🐳:whale,🐙:octopus,🦈:shark,🐬:dolphin,🦑:squid"), lacks: V25LG6_ps("🦁:lion,🐫:camel,🐿️:squirrel,🐒:monkey,🦒:giraffe"), yes: ["lives in the water", "live in the water"], no: ["does not live in the water", "do not live in the water"] },
  { k: "cold", q: "Three of these are cold. Which one is <b>not</b> cold?", has: V25LG6_ps("🧊:ice cube,⛄:snowman,🍦:ice cream,❄️:snowflake,🍧:shaved ice"), lacks: V25LG6_ps("🔥:fire,☀️:sun,☕:hot cocoa,🌋:volcano"), yes: ["is cold", "are cold"], no: ["is hot, not cold", "are hot, not cold"] },
  { k: "food", q: "Three of these are foods. Which one is <b>not</b> a food?", has: V25LG6_ps("🍞:bread,🧀:cheese,🥕:carrot,🍎:apple,🍪:cookie,🥨:pretzel"), lacks: V25LG6_ps("👟:shoe,🔑:key,✏️:pencil,🧦:socks,⚽:ball,🧸:teddy bear"), yes: ["is a food you can eat", "are food you can eat"], no: ["is not a food", "are not food"] },
  { k: "light", q: "Three of these give off light. Which one does <b>not</b>?", has: V25LG6_ps("☀️:sun,🔦:flashlight,🕯️:candle,💡:light bulb,🔥:fire"), lacks: V25LG6_ps("🧦:socks,🍞:bread,🐢:turtle,🎒:backpack,🥄:spoon"), yes: ["gives off light", "give off light"], no: ["does not give off light", "do not give off light"] },
  { k: "feet", q: "Three of these go on your feet. Which one does <b>not</b>?", has: V25LG6_ps("👟:sneaker,🧦:socks,👢:boot,🥾:hiking boot,👞:shoe"), lacks: V25LG6_ps("🧢:cap,🧤:gloves,👕:shirt,🧣:scarf,🎩:top hat"), yes: ["goes on your feet", "go on your feet"], no: ["does not go on your feet", "do not go on your feet"] },
];
const V25LG6_COLSET = {
  red: V25LG6_ps("🍓:strawberry,🍒:cherries,🚒:fire truck,❤️:heart,🌹:rose,🍎:apple"),
  yellow: V25LG6_ps("🍌:banana,🍋:lemon,🐥:chick,🧀:cheese,🚕:taxi,⭐:star"),
  green: V25LG6_ps("🐸:frog,🥦:broccoli,🥒:cucumber,🍏:green apple,🌵:cactus,🍀:clover"),
  orange: V25LG6_ps("🥕:carrot,🦊:fox,🏀:basketball,🐯:tiger"),
};
addBank(6, "logic", "oddone", 0.3, function () {
  if (Math.random() < 0.6) {
    const P = pick(V25LG6_PROP), same = shuffle(P.has).slice(0, 3), odd = pick(P.lacks), on = odd[1], pl = V25LG6_PL(on) ? 1 : 0;
    return { q: P.q, say: V25LG6_plain(P.q), opts: shuffle([...same, odd]).map(eOpt), ans: eOpt(odd), sayAns: `the ${on}`, why: `The ${on} ${P.no[pl]}. The others ${P.yes[1]}.`, key: "v25p" + P.k + odd[0] + same.map(x => x[0]).join(""), v25: { f: "prop", k: P.k, names: same.map(x => x[1]) } };
  }
  const [a, b] = shuffle(Object.keys(V25LG6_COLSET)), same = shuffle(V25LG6_COLSET[a]).slice(0, 3), odd = pick(V25LG6_COLSET[b]), on = odd[1];
  const col = {}; for (const x of same) col[x[1]] = a;
  return { q: "Three of these are the same color. Which one is a <b>different</b> color?", say: "Three of these are the same color. Which one is a different color?", opts: shuffle([...same, odd]).map(eOpt), ans: eOpt(odd), sayAns: `the ${on}`, why: `The others are all ${a}. The ${on} ${V25LG6_IS(on)} ${b}.`, key: "v25c" + odd[0] + same.map(x => x[0]).join(""), v25: { f: "color", col, c: a } };
});
/* say text without tags (xPlain is defined later, so strip tags here) */
function V25LG6_plain(h) { return String(h).replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim(); }
whyRule(6, "logic", "oddone", (q, picked) => {
  const x = q.v25; if (!x) return null;
  const pn = V25LG6_T(picked); if (!pn) return null;
  if (x.f === "prop") {
    const P = V25LG6_PROP.find(p => p.k === x.k); if (!P || !x.names.includes(pn)) return null;
    const pl = V25LG6_PL(pn);
    return `The ${pn} ${P.yes[pl ? 1 : 0]}, so ${pl ? "they belong" : "it belongs"} with the others.`;
  }
  if (x.f === "color") {
    if (!x.col[pn]) return null;
    return `The ${pn} ${V25LG6_IS(pn)} ${x.c}, just like two of the others.`;
  }
  return null;
});

/* =====================================================================
   2 · Sorting Groups: where animals live, and "how many are …?"
   ===================================================================== */
const V25LG6_HAB = [
  ["On a farm", "on a farm", V25LG6_ps("🐮:cow,🐷:pig,🐑:sheep,🐔:hen,🐐:goat,🐴:horse,🦃:turkey")],
  ["In the ocean", "in the ocean", V25LG6_ps("🐳:whale,🐙:octopus,🦈:shark,🐬:dolphin,🦑:squid,🐠:tropical fish")],
  ["In the jungle", "in the jungle", V25LG6_ps("🐒:monkey,🦜:parrot,🦍:gorilla,🐯:tiger")],
];
const V25LG6_CNT = { fruits: [LCATS.fruits, "fruits"], vehicles: [LCATS.vehicles, "vehicles"], clothes: [LCATS.clothes, "things you wear"], "sea animals": [LCATS["sea animals"], "sea animals"], bugs: [LCATS.bugs, "bugs"], "music makers": [LCATS["music makers"], "music makers"], "sports balls": [LCATS["sports balls"], "sports balls"] };
addBank(6, "logic", "groups", 0.3, function () {
  const m = R(0, 2);
  if (m === 0) {
    const h = R(0, 2), an = pick(V25LG6_HAB[h][2]), n = an[1], opts = V25LG6_HAB.map(x => x[0]);
    return { q: "Where does this animal live?", say: `Where does the ${n} live?`, vis: `<span class="emo" style="font-size:96px" title="${n}">${an[0]}</span>`, opts, ans: opts[h], big: 1, why: `${cap(V25LG6_A(n))} lives ${V25LG6_HAB[h][1]}.`, key: "v25h" + an[0], v25: { f: "where", n, h } };
  }
  if (m === 1) {
    const h = R(0, 2), ans = pick(V25LG6_HAB[h][2]), others = [0, 1, 2].filter(i => i !== h), o1 = shuffle(V25LG6_HAB[others[0]][2]), o2 = shuffle(V25LG6_HAB[others[1]][2]);
    const wrong = shuffle([o1[0], o2[0], pick([o1[1], o2[1]])]), home = {};
    for (const w of wrong) home[w[1]] = V25LG6_HAB.findIndex(x => x[2].includes(w));
    return { q: `Which animal lives <b>${V25LG6_HAB[h][1]}</b>?`, say: `Which animal lives ${V25LG6_HAB[h][1]}?`, opts: shuffle([ans, ...wrong]).map(eOpt), ans: eOpt(ans), sayAns: `the ${ans[1]}`, why: `${cap(V25LG6_A(ans[1]))} lives ${V25LG6_HAB[h][1]}.`, key: "v25w" + h + ans[0] + wrong.map(x => x[0]).join(""), v25: { f: "which", h, home } };
  }
  const [a, b] = shuffle(Object.keys(V25LG6_CNT)), na = R(2, 4), nb = R(2, 6 - na);
  const A = shuffle(V25LG6_CNT[a][0]).slice(0, na), B = shuffle(V25LG6_CNT[b][0]).slice(0, nb), all = shuffle([...A, ...B]);
  const la = V25LG6_CNT[a][1], lb = V25LG6_CNT[b][1];
  return { q: `How many of these are <b>${la}</b>?`, say: `How many of these are ${la}?`, vis: `<div class="basket">${all.map(x => x[0]).join("")}</div>`, opts: numU(na, [nb, na + 1, na - 1, all.length], 2, 1), ans: String(na), big: 1, why: `The ${la} are: ${V25LG6_and(A.map(x => x[1]))}. That makes ${na}.`, key: "v25n" + a + all.map(x => x[0]).join(""), v25: { f: "count", na, nb, la, lb, tot: all.length } };
});
whyRule(6, "logic", "groups", (q, picked) => {
  const x = q.v25; if (!x) return null;
  if (x.f === "where") {
    const i = V25LG6_HAB.findIndex(h => h[0] === xPlain(picked)); if (i < 0 || i === x.h) return null;
    return `${cap(V25LG6_A(x.n))} does not live ${V25LG6_HAB[i][1]}. It lives ${V25LG6_HAB[x.h][1]}.`;
  }
  if (x.f === "which") {
    const pn = V25LG6_T(picked), i = pn != null ? x.home[pn] : null; if (i == null || i < 0) return null;
    return `${cap(V25LG6_A(pn))} lives ${V25LG6_HAB[i][1]}, not ${V25LG6_HAB[x.h][1]}.`;
  }
  if (x.f === "count") {
    const p = xNum(picked); if (p == null || p === x.na) return null;
    if (p === x.nb) return `${p} is how many ${x.lb} there are. Count only the ${x.la}.`;
    if (p === x.tot) return `${p} is all the things in the basket. Count only the ${x.la}.`;
    if (p > x.na) return `${p} is too many. Some of those are ${x.lb}, not ${x.la}.`;
    return `${p} is too few. Look again for every one of the ${x.la}.`;
  }
  return null;
});

/* =====================================================================
   3 · Shape Patterns: big/small patterns, and "which spot breaks it?"
   ===================================================================== */
const V25LG6_parse = lab => { if (!lab) return null; const w = lab.split(" "); return { big: w[0] === "big", c: w[1], s: w[2] }; };
const V25LG6_lab = h => (String(h).match(/aria-label="([^"]+)"/) || [])[1] || null;
addBank(6, "logic", "shapepat", 0.3, function () {
  if (Math.random() < 0.5) {
    const cols = shuffle(V25LG6_COLS), shapes = shuffle(LSHAPES), type = pick([[1, 0], [0, 1], [1, 0, 0], [1, 1, 0], [0, 0, 1]]), mode = R(0, 1);
    const unit = type.map(t => [shapes[0], mode ? cols[t] : cols[0], t === 1]), L = unit.length, len = R(2 * L, 2 * L + 1);
    const seq = Array.from({ length: len }, (_, i) => unit[i % L]), ans = unit[len % L];
    const kf = x => x[0] + x[1] + x[2], cands = [[ans[0], ans[1], !ans[2]], [ans[0], cols[2], ans[2]], [shapes[1], ans[1], ans[2]], [shapes[2], cols[3], !ans[2]]];
    const opts = [ans], seen = new Set([kf(ans)]); for (const c of cands) if (opts.length < 4 && !seen.has(kf(c))) { seen.add(kf(c)); opts.push(c); }
    const o = x => V25LG6_sz(x[0], x[1], x[2], x[2] ? 70 : 38);
    const nm = x => `${x[2] ? "big" : "small"} ${COLNAME[x[1]]} ${x[0]}`;
    return { q: "What comes <b>next</b>? Watch the <b>size</b> too!", say: "What comes next? Watch the size too!", vis: `<div class="shape-train">${seq.map(x => V25LG6_sz(x[0], x[1], x[2], x[2] ? 56 : 30)).join("")}<span class="car q">?</span></div>`, opts: shuffle(opts).map(o), ans: o(ans), sayAns: `the ${nm(ans)}`, why: `The pattern repeats: ${unit.map(nm).join(", ")}.`, key: "v25s" + seq.map(kf).join(), v25: { f: "size", a: { big: ans[2], c: COLNAME[ans[1]], s: ans[0] } } };
  }
  /* one spot breaks the pattern */
  const U = []; for (const s of LSHAPES) for (const c of V25LG6_COLS) U.push([s, c]);
  const eqx = (a, b) => a[0] === b[0] && a[1] === b[1];
  const periodic = sq => { for (let p = 1; p * 2 <= sq.length; p++) if (sq.every((x, i) => eqx(x, sq[i % p]))) return true; return false; };
  for (let tries = 0; tries < 30; tries++) {
    const cols = shuffle(V25LG6_COLS), shapes = shuffle(LSHAPES), type = pick([[0, 1], [0, 1], [0, 0, 1], [0, 1, 1], [0, 1, 2]]), mode = R(0, 2);
    const unit = type.map(t => [mode === 1 ? shapes[0] : shapes[t], mode === 0 ? cols[0] : cols[t]]), L = unit.length, len = L === 2 ? R(6, 7) : 9;
    const good = Array.from({ length: len }, (_, i) => unit[i % L]), err = R(L, len - 1), exp = good[err];
    const bad = Math.random() < 0.5 ? [exp[0], pick(V25LG6_COLS.filter(c => c !== exp[1]))] : [pick(LSHAPES.filter(s => s !== exp[0])), exp[1]];
    const seq = good.slice(); seq[err] = bad;
    const fix = []; for (let j = 0; j < len; j++) if (U.some(u => !eqx(u, seq[j]) && periodic(seq.map((x, i) => i === j ? u : x)))) fix.push(j);
    if (fix.length !== 1 || fix[0] !== err) continue;
    const spots = [err, ...shuffle(range(0, len - 1).filter(j => j !== err)).slice(0, 3)].sort((a, b) => a - b).map(j => "Spot " + (j + 1));
    const nm = x => `${COLNAME[x[1]]} ${x[0]}`;
    const vis = `<div class="line-row">${seq.map((x, i) => `<span class="lr-cell">${shp(x[0], x[1], 38)}<small>${i + 1}</small></span>`).join("")}</div>`;
    return { q: "One shape breaks the pattern. Which <b>spot</b> is it in?", say: "One shape breaks the pattern. Which spot is it in?", vis, opts: spots, ans: "Spot " + (err + 1), big: 1, why: `The pattern repeats ${unit.map(nm).join(", ")}. Spot ${err + 1} should be the ${nm(exp)}, not the ${nm(bad)}.`, key: "v25b" + seq.map(x => x[0] + x[1]).join() , v25: { f: "break", names: seq.map(nm), err } };
  }
  return null;
});
whyRule(6, "logic", "shapepat", (q, picked) => {
  const x = q.v25; if (!x) return null;
  if (x.f === "break") {
    const m = xPlain(picked).match(/^Spot (\d+)$/); if (!m) return null;
    const j = +m[1] - 1; if (j === x.err || !x.names[j]) return null;
    return `Spot ${j + 1} has the ${x.names[j]}, and that fits the pattern.`;
  }
  if (x.f === "size") {
    const p = V25LG6_parse(V25LG6_lab(picked)), a = x.a; if (!p) return null;
    const bad = [];
    if (p.s !== a.s) bad.push(`a ${a.s}, not a ${p.s}`);
    if (p.c !== a.c) bad.push(`${a.c}, not ${p.c}`);
    if (p.big !== a.big) bad.push(`${a.big ? "big" : "small"}, not ${p.big ? "big" : "small"}`);
    if (!bad.length) return null;
    return `Look again: the next one should be ${bad.join(", and ")}.`;
  }
  return null;
});

/* =====================================================================
   4 · Same & Different: matching pairs, and "how many match?"
   ===================================================================== */
addBank(6, "logic", "match", 0.3, function () {
  if (Math.random() < 0.5) {
    const s = pick(LSHAPES), c = pick(V25LG6_COLS), kf = p => p.map(x => x.join("")).join("|");
    const pairs = [[[s, c], [s, c]]], seen = new Set([kf(pairs[0])]), info = [];
    let g = 0;
    while (pairs.length < 4 && g++ < 60) {
      const t = pairs.length === 1 ? "color" : pairs.length === 2 ? "shape" : pick(["color", "shape"]);
      const s1 = pick(LSHAPES), c1 = pick(V25LG6_COLS);
      const p2 = t === "color" ? [s1, pick(V25LG6_COLS.filter(x => x !== c1))] : [pick(LSHAPES.filter(x => x !== s1)), c1];
      const pr = shuffle([[s1, c1], p2]); if (seen.has(kf(pr))) continue; seen.add(kf(pr)); pairs.push(pr);
    }
    const o = pr => `<span class="row-c" style="gap:6px">${shp(pr[0][0], pr[0][1], 52)}${shp(pr[1][0], pr[1][1], 52)}</span>`, map = {};
    for (const pr of pairs) map[o(pr)] = pr.map(([a, b]) => [a, COLNAME[b]]);
    return { q: "Which pair is <b>exactly the same</b>?", say: "Which pair is exactly the same? Check the shape and the color.", opts: shuffle(pairs).map(o), ans: o(pairs[0]), sayAns: `the two ${COLNAME[c]} ${s}s`, why: `Both are ${COLNAME[c]} ${s}s: the same shape and the same color.`, key: "v25p" + pairs.map(kf).join(), v25: { f: "pair", map } };
  }
  const s = pick(LSHAPES), c = pick(V25LG6_COLS), n = R(1, 3), k1 = R(1, 2), k2 = R(1, 2), rest = 6 - n - k1 - k2;
  const items = [];
  for (let i = 0; i < n; i++) items.push([s, c]);
  for (let i = 0; i < k1; i++) items.push([s, pick(V25LG6_COLS.filter(x => x !== c))]);
  for (let i = 0; i < k2; i++) items.push([pick(LSHAPES.filter(x => x !== s)), c]);
  for (let i = 0; i < rest; i++) items.push([pick(LSHAPES.filter(x => x !== s)), pick(V25LG6_COLS.filter(x => x !== c))]);
  const row6 = shuffle(items), ss = n + k1, cc = n + k2;
  const vis = row(`<span class="lr-cell">${shp(s, c, 46)}<small>match this</small></span>`) + `<div class="shape-train">${row6.map(([a, b]) => shp(a, b, 46)).join("")}</div>`;
  return { q: "How many shapes in the row are <b>exactly the same</b> as the one in the box?", say: `How many shapes in the row are exactly the same as the ${COLNAME[c]} ${s} in the box?`, vis, opts: numU(n, [ss, cc, n + 1, n - 1], 2, 1), ans: String(n), big: 1, why: `Only ${n} ${n === 1 ? "is a" : "are"} ${COLNAME[c]} ${n === 1 ? s : s + "s"}: the same shape AND the same color.`, key: "v25n" + s + c + row6.map(x => x.join("")).join(), v25: { f: "count", n, ss, cc, s, c: COLNAME[c] } };
});
whyRule(6, "logic", "match", (q, picked) => {
  const x = q.v25; if (!x) return null;
  if (x.f === "pair") {
    const p = x.map[picked]; if (!p) return null;
    const [[s1, c1], [s2, c2]] = p, bad = [];
    if (s1 !== s2) bad.push(`one is a ${s1} and one is a ${s2}`);
    if (c1 !== c2) bad.push(`one is ${c1} and one is ${c2}`);
    if (!bad.length) return null;
    return `These two do not match: ${bad.join(", and ")}.`;
  }
  if (x.f === "count") {
    const p = xNum(picked); if (p == null || p === x.n) return null;
    if (p === x.ss) return `${p} shapes are ${x.s}s, but not all of them are ${x.c}.`;
    if (p === x.cc) return `${p} shapes are ${x.c}, but not all of them are ${x.s}s.`;
    if (p > x.n) return `${p} is too many. A match must have the same shape and the same color.`;
    return `${p} is too few. Look again for every ${x.c} ${x.s} in the row.`;
  }
  return null;
});

/* =====================================================================
   5 · Biggest & Smallest: middle size in real life, and block towers
   ===================================================================== */
const V25LG6_SZT = [V25LG6_ps("🐌:snail,🔑:key,🍓:strawberry"), V25LG6_ps("👟:shoe,🍍:pineapple,🐇:rabbit"), V25LG6_ps("🧒:child,🚲:bike"), V25LG6_ps("🚗:car,🐄:cow"), V25LG6_ps("🏠:house,🌳:tree"), V25LG6_ps("⛰️:mountain")];
const V25LG6_BLK = ["🟦", "🟥", "🟩", "🟨", "🟧"];
addBank(6, "logic", "sizes", 0.3, function () {
  const m = R(0, 2);
  if (m < 2) {
    const k = m === 0 ? 3 : R(3, 4), tiers = shuffle(range(0, V25LG6_SZT.length - 1)).slice(0, k).sort((a, b) => a - b), it = tiers.map(t => [...pick(V25LG6_SZT[t]), t]);
    const tier = Object.fromEntries(it.map(x => [x[1], x[2]])), names = it.map(x => x[1]);
    if (m === 0) {
      const ans = it[1];
      return { q: "Put them in order from smallest to biggest in real life. Which one is in the <b>middle</b>?", say: `Think about the ${names[0]}, the ${names[1]} and the ${names[2]} in real life. In order from smallest to biggest, which one is in the middle?`, opts: shuffle(it).map(eOpt), ans: eOpt(ans), sayAns: `the ${ans[1]}`, why: `From smallest to biggest: ${V25LG6_A(names[0])}, ${V25LG6_A(names[1])}, then ${V25LG6_A(names[2])}.`, key: "v25m" + it.map(x => x[0]).join(""), v25: { f: "mid", order: names } };
    }
    const big = Math.random() < 0.5, ans = big ? it[k - 1] : it[0], w = big ? "biggest" : "smallest";
    return { q: `Which one is the <b>${w}</b> in real life?`, say: `Which one is the ${w} in real life?`, opts: shuffle(it).map(eOpt), ans: eOpt(ans), sayAns: `the ${ans[1]}`, why: `In real life, ${V25LG6_A(ans[1])} is ${big ? "bigger" : "smaller"} than all the others here.`, key: "v25r" + it.map(x => x[0]).join("") + big, v25: { f: "real", big, tier, a: ans[1] } };
  }
  const k = R(3, 4), hs = shuffle(range(2, 7)).slice(0, k), b = pick(V25LG6_BLK), tall = Math.random() < 0.5, ansH = tall ? Math.max(...hs) : Math.min(...hs);
  const o = h => `<span class="tower" title="a tower of ${h} blocks">${Array(h).fill(`<span class="emo">${b}</span>`).join("")}</span>`;
  return { q: `Which tower is the <b>${tall ? "tallest" : "shortest"}</b>?`, say: `Which tower is the ${tall ? "tallest" : "shortest"}?`, opts: hs.map(o), ans: o(ansH), sayAns: `the tower of ${ansH} blocks`, why: `That tower has ${ansH} blocks. ${tall ? "No other tower has that many." : "Every other tower has more."}`, key: "v25t" + b + hs.join(), v25: { f: "tower", tall, ansH } };
});
whyRule(6, "logic", "sizes", (q, picked) => {
  const x = q.v25; if (!x) return null;
  if (x.f === "tower") {
    const m = (V25LG6_T(picked) || "").match(/tower of (\d+) blocks/); if (!m) return null;
    const h = +m[1]; if (h === x.ansH) return null;
    return x.tall ? `That tower has ${h} blocks, but one tower has ${x.ansH} blocks.` : `That tower has ${h} blocks, but one tower has only ${x.ansH} blocks.`;
  }
  const pn = V25LG6_T(picked); if (!pn) return null;
  if (x.f === "mid") {
    const j = x.order.indexOf(pn); if (j < 0 || j === 1) return null;
    return j === 0 ? `In real life, ${V25LG6_A(pn)} is the smallest of the three, not the middle.` : `In real life, ${V25LG6_A(pn)} is the biggest of the three, not the middle.`;
  }
  if (x.f === "real") {
    if (x.tier[pn] == null || pn === x.a) return null;
    return `In real life, ${V25LG6_A(pn)} is ${x.big ? "smaller" : "bigger"} than ${V25LG6_A(x.a)}.`;
  }
  return null;
});

/* =====================================================================
   6 · Left & Right: counting to one side, and left/right word clues
   ===================================================================== */
addBank(6, "logic", "leftright", 0.3, function () {
  if (Math.random() < 0.5) {
    const n = R(5, 6), items = shuffle(LR_POOL).slice(0, n), i = R(1, n - 2), x = items[i], xn = LG6V_LRN[x], left = Math.random() < 0.5;
    const ans = left ? i : n - 1 - i, other = left ? n - 1 - i : i, w = left ? "left" : "right";
    const why = left ? `The ${xn} is in spot ${i + 1}, so ${i + 1} − 1 = ${ans} ${ans === 1 ? "animal is" : "animals are"} to its left.` : `The ${xn} is in spot ${i + 1} of ${n}, so ${n} − ${i + 1} = ${ans} ${ans === 1 ? "animal is" : "animals are"} to its right.`;
    return { q: `How many animals are to the <b>${w}</b> of ${LG6V_emo(x)}?`, say: `How many animals are to the ${w} of the ${xn}?`, vis: lineRow(items), opts: numU(ans, [other, ans + 1, ans - 1, n - 1], 2, 0), ans: String(ans), big: 1, why, key: "v25c" + items.join("") + i + w, v25: { f: "count", ans, other, w, xn, all: n - 1 } };
  }
  const kids = shuffle(KIDS).slice(0, 3), k = R(0, 2), clue = (a, b) => Math.random() < 0.5 ? `${a} is to the left of ${b}.` : `${b} is to the right of ${a}.`;
  const clues = shuffle([clue(kids[0], kids[1]), clue(kids[1], kids[2])]), pos = ["on the left end", "in the middle", "on the right end"];
  return { q: `Three friends stand in a line.${passage(clues.join(" "))}Who is <b>${pos[k]}</b>?`, say: `Three friends stand in a line. ${clues.join(" ")} Who is ${pos[k]}?`, opts: shuffle(kids.slice()), ans: kids[k], big: 1, why: `From left to right, the line is ${kids[0]}, ${kids[1]}, ${kids[2]}.`, key: "v25k" + clues.join("") + k, v25: { f: "kids", kids, k } };
});
whyRule(6, "logic", "leftright", (q, picked) => {
  const x = q.v25; if (!x) return null;
  if (x.f === "kids") {
    const j = x.kids.indexOf(xPlain(picked)); if (j < 0 || j === x.k) return null;
    const pos = ["on the left end", "in the middle", "on the right end"];
    return `${x.kids[j]} is ${pos[j]}, not ${pos[x.k]}. The line is ${x.kids.join(", ")}.`;
  }
  if (x.f === "count") {
    const p = xNum(picked); if (p == null || p === x.ans) return null;
    const ow = x.w === "left" ? "right" : "left";
    if (p === x.other) return `${p} ${p === 1 ? "animal is" : "animals are"} on the ${ow} side. Count the ${x.w} side.`;
    if (p === x.all) return `${p} is every other animal. Count only the ones on the ${x.w}.`;
    if (p === x.ans + 1) return `${p} counts the ${x.xn} too. Do not count the ${x.xn} itself.`;
    return p > x.ans ? `${p} is too many. Count only the animals on the ${x.w} of the ${x.xn}.` : `${p} is too few. Count every animal on the ${x.w} of the ${x.xn}.`;
  }
  return null;
});

/* =====================================================================
   7 · Shadow Match: new pictures, and "which one has no shadow here?"
   ===================================================================== */
const V25LG6_SH = V25LG6_ps("🦌:deer,🦔:hedgehog,🦎:lizard,🦂:scorpion,🦈:shark,🕷️:spider,🦅:eagle,🦃:turkey,🐐:goat,🍌:banana,🍍:pineapple,🍒:cherries,🔦:flashlight,⏰:alarm clock,🔔:bell,🚜:tractor,🛴:scooter,⛄:snowman,👑:crown,👓:glasses,🥄:spoon,🔧:wrench,💡:light bulb,🔍:magnifying glass,🏰:castle,🌲:pine tree,🌷:tulip,🐞:ladybug");
const V25LG6_SIM = [["spoon", "magnifying glass"], ["deer", "goat"], ["bell", "light bulb"], ["eagle", "turkey"], ["lizard", "scorpion"], ["pine tree", "tulip"]];
const V25LG6_shOK = set => !V25LG6_SIM.some(([a, b]) => set.some(x => x[1] === a) && set.some(x => x[1] === b));
const V25LG6_pick4 = () => { let s; do { s = shuffle(V25LG6_SH).slice(0, 4); } while (!V25LG6_shOK(s)); return s; };
addBank(6, "logic", "shadows", 0.3, function () {
  const m = R(0, 2), [t, ...others] = V25LG6_pick4();
  if (m === 0) return { q: "Which shadow belongs to this picture?", vis: `<span class="emo" style="font-size:96px" title="${t[1]}">${t[0]}</span>`, opts: shuffle([t, ...others]).map(shadowOpt), ans: shadowOpt(t), sayAns: `the shadow of the ${t[1]}`, why: `The ${t[1]}'s shadow has the same shape.`, key: "v25a" + t[0] + others.map(x => x[0]).join(""), v25: { f: "toShadow", t: t[1] } };
  if (m === 1) return { q: "Which picture made this shadow?", vis: `<span class="emo shadow" style="font-size:96px">${t[0]}</span>`, opts: shuffle([t, ...others]).map(eOpt), ans: eOpt(t), sayAns: `the ${t[1]}`, why: `The shadow has the same shape as the ${t[1]}.`, key: "v25b" + t[0] + others.map(x => x[0]).join(""), v25: { f: "fromShadow", t: t[1] } };
  const shown = shuffle(others);
  return { q: "Three of these pictures have a shadow in the row. Which one has <b>no</b> shadow here?", say: "Look at the row of shadows. Which picture has no shadow here?", vis: `<div class="chips">${shown.map(x => `<span class="emo shadow" style="font-size:64px">${x[0]}</span>`).join("")}</div>`, opts: shuffle([t, ...others]).map(eOpt), ans: eOpt(t), sayAns: `the ${t[1]}`, why: `The row has shadows of the ${V25LG6_and(shown.map(x => x[1]))}, but not the ${t[1]}.`, key: "v25c" + t[0] + shown.map(x => x[0]).join(""), v25: { f: "noShadow", t: t[1], shown: shown.map(x => x[1]) } };
});
whyRule(6, "logic", "shadows", (q, picked) => {
  const x = q.v25; if (!x) return null;
  const pt = V25LG6_T(picked); if (!pt) return null;
  if (x.f === "toShadow") {
    const m = pt.match(/^the shadow of the (.+)$/); if (!m || m[1] === x.t) return null;
    return `That shadow has the shape of ${V25LG6_A(m[1])}, not ${V25LG6_A(x.t)}.`;
  }
  if (x.f === "fromShadow") {
    if (pt === x.t) return null;
    return `${cap(V25LG6_A(pt))} has a different shape. This shadow is shaped like ${V25LG6_A(x.t)}.`;
  }
  if (x.f === "noShadow") {
    if (!x.shown.includes(pt)) return null;
    return `The ${pt}${V25LG6_PL(pt) ? "'" : "'s"} shadow is in the row, so ${V25LG6_PL(pt) ? "they have" : "it has"} a shadow here.`;
  }
  return null;
});

/* =====================================================================
   8 · Goes Together: new pairs, and "which pair goes together?"
   ===================================================================== */
// [a, b, aName, bName, tags]; pairs that share a tag are never mixed (they could go together)
const V25LG6_PAIRS = [["🧯", "🔥", "fire extinguisher", "fire", "help"], ["🏹", "🎯", "bow and arrow", "target", "castle sport"], ["🐓", "🌅", "rooster", "sunrise", ""], ["🥾", "⛰️", "hiking boot", "mountain", "outdoor"], ["🔧", "🔩", "wrench", "nut and bolt", "tool"], ["👑", "🏰", "crown", "castle", "castle"], ["🎒", "📚", "backpack", "books", "school outdoor"], ["✂️", "📄", "scissors", "paper", "school tool"], ["🚑", "🏥", "ambulance", "hospital", "help"], ["🥥", "🌴", "coconut", "palm tree", "beach plant"], ["🧭", "🗺️", "compass", "map", "outdoor"], ["🤿", "🐠", "diving mask", "tropical fish", "water beach"], ["🐛", "🍃", "caterpillar", "leaf", "plant"], ["🥪", "🧺", "sandwich", "picnic basket", "food school outdoor"], ["🏈", "🏟️", "football", "stadium", "sport food"], ["🧊", "🥤", "ice", "cold drink", "food"], ["🐳", "🌊", "whale", "ocean", "water beach"]];
const V25LG6_tagX = (p, r) => p[4] && r[4] && p[4].split(" ").some(t => r[4].split(" ").includes(t));
const V25LG6_go = n => V25LG6_PL(n) ? "go" : "goes";
const V25LG6_free = (P, n) => { for (let g = 0; g < 80; g++) { const s = shuffle(V25LG6_PAIRS.filter(p => p !== P)).slice(0, n), all = [P, ...s]; if (all.every((a, i) => all.every((b, j) => i === j || !V25LG6_tagX(a, b)))) return s; } return null; };
addBank(6, "logic", "together", 0.3, function () {
  const P = pick(V25LG6_PAIRS), [a, b, an, bn] = P;
  if (Math.random() < 0.5) {
    const flip = Math.random() < 0.5, [x, xn, y, yn] = flip ? [b, bn, a, an] : [a, an, b, bn];
    const oth = V25LG6_free(P, 3); if (!oth) return null;
    const others = oth.map(p => flip ? [p[0], p[2], p[3]] : [p[1], p[3], p[2]]), partner = Object.fromEntries(others.map(o => [o[1], o[2]]));
    return { q: `Which one goes with ${LG6V_emo(x)}?`, say: `Which one goes with the ${xn}?`, vis: `<span class="emo" style="font-size:88px">${x}</span>`, opts: shuffle([[y, yn], ...others.map(o => [o[0], o[1]])]).map(eOpt), ans: eOpt([y, yn]), sayAns: `the ${yn}`, why: `The ${xn} ${V25LG6_go(xn)} with the ${yn}.`, key: "v25o" + x + others.map(o => o[0]).join(""), v25: { f: "one", xn, partner } };
  }
  const oth = V25LG6_free(P, 3); if (!oth) return null;
  const [p1, p2, p3] = oth, crosses = [[p1, p2], [p2, p3], [p3, p1]];
  const o = (e1, e2, n1, n2) => `<span class="emo" title="the ${n1} and the ${n2}">${e1}${e2}</span>`, map = {};
  const wrong = crosses.map(([u, v]) => { const h = o(u[0], v[1], u[2], v[3]); map[h] = [u[2], v[3], u[3]]; return h; });
  return { q: "Which <b>pair</b> goes together?", say: "Which pair goes together?", opts: shuffle([o(a, b, an, bn), ...wrong]), ans: o(a, b, an, bn), sayAns: `the ${an} and the ${bn}`, why: `The ${an} ${V25LG6_go(an)} with the ${bn}.`, key: "v25p" + a + oth.map(p => p[0]).join(""), v25: { f: "pair", map } };
});
whyRule(6, "logic", "together", (q, picked) => {
  const x = q.v25; if (!x) return null;
  if (x.f === "pair") {
    const p = x.map[picked]; if (!p) return null;
    return `The ${p[0]} ${V25LG6_go(p[0])} with the ${p[2]}, not with the ${p[1]}.`;
  }
  if (x.f === "one") {
    const pn = V25LG6_T(picked), pt = pn && x.partner[pn]; if (!pt) return null;
    return `The ${pn} ${V25LG6_go(pn)} with the ${pt}, not with the ${x.xn}.`;
  }
  return null;
});

/* =====================================================================
   9 · Growing Patterns: little stories, and growing picture trains
   ===================================================================== */
const V25LG6_GS = [["reads", "read", "page", "pages"], ["plants", "plant", "flower", "flowers"], ["picks", "pick", "apple", "apples"], ["finds", "find", "shell", "shells"], ["draws", "draw", "star", "stars"], ["bakes", "bake", "cookie", "cookies"], ["sees", "see", "bird", "birds"], ["paints", "paint", "picture", "pictures"], ["scores", "score", "goal", "goals"], ["folds", "fold", "paper airplane", "paper airplanes"], ["collects", "collect", "leaf", "leaves"], ["does", "do", "jumping jack", "jumping jacks"], ["blows", "blow", "bubble", "bubbles"], ["stacks", "stack", "block", "blocks"], ["writes", "write", "word", "words"], ["waters", "water", "plant", "plants"]];
const V25LG6_GP = [["🚂", "🚃", "engine", "train car", "train cars"], ["🐔", "🐣", "hen", "chick", "chicks"], ["🌼", "🐝", "flower", "bee", "bees"], ["🐶", "🦴", "dog", "bone", "bones"], ["🌳", "🍎", "tree", "apple", "apples"], ["☁️", "💧", "cloud", "raindrop", "raindrops"]];
addBank(6, "logic", "growing", 0.3, function () {
  if (Math.random() < 0.6) {
    const [vs, vb, sg, pl] = pick(V25LG6_GS), who = pick(KIDS), d0 = R(0, 3), step = pick([1, 1, 2, 2, 3]), s = R(1, 4), seq = [0, 1, 2].map(i => s + i * step), ans = s + 3 * step;
    const sents = seq.map((n, i) => `On ${V25LG6_DAYS[d0 + i]}, ${who} ${vs} ${n} ${n === 1 ? sg : pl}.`), day = V25LG6_DAYS[d0 + 3];
    return { q: `${passage(sents.join(" "))}If the pattern keeps going, how many ${pl} will ${who} ${vb} on <b>${day}</b>?`, say: `${sents.join(" ")} If the pattern keeps going, how many ${pl} will ${who} ${vb} on ${day}?`, opts: numU(ans, [seq[2], ans + 1, ans - 1, ans + step], 2, 1), ans: String(ans), big: 1, why: `It grows by ${step} each day: ${seq.join(", ")}, then ${seq[2]} + ${step} = ${ans}.`, key: "v25s" + vs + s + step + d0, v25: { f: "story", last: seq[2], step, ans, day: V25LG6_DAYS[d0 + 2] } };
  }
  const [A, B, an, bs, bp] = pick(V25LG6_GP), s = R(1, 3), terms = [s, s + 1, s + 2], ans = s + 3;
  const str = (na, nb) => A.repeat(na) + B.repeat(nb), map = {};
  const o = (na, nb) => { const h = `<span class="emo" title="${na} ${na === 1 ? an : an + "s"} and ${nb} ${nb === 1 ? bs : bp}">${str(na, nb)}</span>`; map[h] = [na, nb]; return h; };
  const cand = [[1, ans], [1, s + 2], [1, ans + 1], [2, ans], [1, ans + 2]], opts = cand.slice(0, 4).map(([x, y]) => o(x, y));
  const box = t => `<span style="font-family:var(--emoji);font-size:26px;padding:4px 8px;border:2px solid var(--line);border-radius:12px;background:#fff">${t}</span>`;
  return { q: "The pattern grows. What comes <b>next</b>?", say: `The pattern grows. Each time there is 1 more ${bs}. What comes next?`, vis: `<div class="grow-row">${terms.map(n => box(str(1, n))).join("")}<span class="car q">?</span></div>`, opts: shuffle(opts), ans: o(1, ans), sayAns: `1 ${an} and ${ans} ${bp}`, why: `Each step adds 1 more ${bs}: ${terms.join(", ")}, then ${ans}.`, key: "v25g" + A + s, v25: { f: "pic", map, ans, last: s + 2, an, bp } };
});
whyRule(6, "logic", "growing", (q, picked) => {
  const x = q.v25; if (!x) return null;
  if (x.f === "story") {
    const p = xNum(picked); if (p == null || p === x.ans) return null;
    if (p === x.last) return `${p} is the same as on ${x.day}. The number grows by ${x.step} each day.`;
    if (p > x.ans) return `${p} is too many. ${x.last} + ${x.step} = ${x.ans}.`;
    return `${p} is too few. ${x.last} + ${x.step} = ${x.ans}.`;
  }
  if (x.f === "pic") {
    const p = x.map[picked]; if (!p) return null;
    if (p[0] !== 1) return `That one has ${p[0]} ${x.an}s, but each step has only 1 ${x.an}.`;
    if (p[1] === x.last) return `That has ${p[1]} ${x.bp}, the same as the last step. The pattern must grow.`;
    if (p[1] > x.ans) return `That has ${p[1]} ${x.bp}. The pattern adds just 1 each time, so ${x.last} + 1 = ${x.ans}.`;
    return null;
  }
  return null;
});

/* =====================================================================
   10 · Before & After: everyday steps in order
   ===================================================================== */
const V25LG6_SEQ = [
  ["you wake up", "you eat breakfast", "you go to school"],
  ["you put on your socks", "you put on your shoes", "you tie your shoelaces"],
  ["you dig a hole", "you put in the seed", "you cover it with dirt"],
  ["you get in the bath", "you wash with soap", "you dry off with a towel"],
  ["you mix the batter", "you bake the cake", "you eat a slice"],
  ["you blow up the balloon", "you tie a knot in it", "you play with the balloon"],
  ["you peel the banana", "you eat the banana", "you throw away the peel"],
  ["you brush your teeth", "you get into bed", "you fall asleep"],
  ["you write a letter", "you put it in an envelope", "you mail the letter"],
  ["you wash the dishes", "you dry the dishes", "you put the dishes away"],
  ["you open the box", "you take out the toy", "you play with the toy"],
  ["you climb up the ladder", "you sit at the top of the slide", "you slide down"],
  ["you pour the juice", "you drink the juice", "you wash the cup"],
  ["you put on your helmet", "you ride your bike", "you take off your helmet"],
  ["you roll a big snowball", "you put a smaller snowball on top", "you add a carrot nose"],
  ["the caterpillar eats leaves", "the caterpillar makes a chrysalis", "a butterfly comes out"],
  ["you put bread in the toaster", "the toast pops up", "you spread butter on the toast"],
  ["you fill the watering can", "you water the plants", "the plants grow"],
];
const V25LG6_PAIR2 = [["you see the lightning", "you hear the thunder"], ["you wash your hands", "you eat your snack"], ["the tooth gets wiggly", "the tooth falls out"], ["you unwrap the present", "you play with the new toy"], ["you put toothpaste on the brush", "you brush your teeth"], ["you put on your swimsuit", "you jump in the pool"], ["you turn on the light", "the room gets bright"], ["the dog rolls in the mud", "the dog gets a bath"], ["you plant a seed", "a sprout comes up"], ["the ice cream melts", "there is a sticky puddle"], ["you scrape your knee", "you put on a bandage"], ["the sun sets", "the stars come out"], ["you fill the bathtub", "you take a bath"]];
const V25LG6_POS = ["first", "in the middle", "last"];
addBank(6, "logic", "beforeafter", 0.3, function () {
  if (Math.random() < 0.7) {
    const S = pick(V25LG6_SEQ), k = R(0, 2), opts = shuffle(S.map(cap));
    const qq = k === 0 ? "What happens <b>first</b>?" : k === 1 ? "What happens in the <b>middle</b>?" : "What happens <b>last</b>?";
    return { q: `Think about the order. ${qq}`, say: `Think about the order. ${V25LG6_plain(qq)}`, opts, ans: cap(S[k]), big: 1, why: `First ${S[0]}, then ${S[1]}, and last ${S[2]}.`, key: "v25q" + S[0] + k, v25: { f: "seq", steps: S.map(cap), k } };
  }
  const [a, b] = pick(V25LG6_PAIR2), first = Math.random() < 0.5;
  return { q: `Which happens <b>${first ? "first" : "second"}</b>?`, say: `Which happens ${first ? "first" : "second"}?`, opts: shuffle([cap(a), cap(b)]), ans: cap(first ? a : b), big: 1, why: `First ${a}. Then ${b}.`, key: "v25p" + a + first, v25: { f: "two", a, b, first } };
});
whyRule(6, "logic", "beforeafter", (q, picked) => {
  const x = q.v25; if (!x) return null;
  const t = xPlain(picked);
  if (x.f === "seq") {
    const j = x.steps.indexOf(t); if (j < 0 || j === x.k) return null;
    return `That step happens ${V25LG6_POS[j]}, not ${V25LG6_POS[x.k]}. ${j < x.k ? "Something else still comes after it." : "Something else comes before it."}`;
  }
  if (x.f === "two") {
    if (x.first && t === cap(x.b)) return `That happens second. First, ${x.a}.`;
    if (!x.first && t === cap(x.a)) return `That happens first. After that, ${x.b}.`;
    return null;
  }
  return null;
});

/* =====================================================================
   11 · Number Grid: a 3-by-3 piece of the grid, and a column strip
   ===================================================================== */
const V25LG6_nopts = (n, c) => uniq(n, c.filter(v => v >= 1 && v <= 100), () => { const v = n + R(-3, 3); return v >= 1 && v <= 100 ? v : null; });
const V25LG6_cell = v => v === "?" ? `<span class="tgt">?</span>` : v === "" ? `<span class="empty"></span>` : `<span>${v}</span>`;
addBank(6, "logic", "numgrid", 0.3, function () {
  if (Math.random() < 0.6) {
    const r0 = R(0, 7), c0 = R(0, 7), val = (r, c) => 10 * (r0 + r) + c0 + c + 1;
    const cells = []; for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) cells.push([r, c]);
    const t = pick(cells), nbs = cells.filter(x => Math.abs(x[0] - t[0]) + Math.abs(x[1] - t[1]) === 1), nb = pick(nbs);
    const show = [nb, ...shuffle(cells.filter(x => x !== t && x !== nb)).slice(0, R(1, 2))], n = val(t[0], t[1]);
    const shownVals = show.map(([r, c]) => val(r, c));
    const grid = cells.map(([r, c]) => r === t[0] && c === t[1] ? "?" : show.some(s => s[0] === r && s[1] === c) ? val(r, c) : "");
    const v = val(nb[0], nb[1]);
    const why = nb[0] < t[0] ? `${v} is just above it. Going down one row adds 10: ${v} + 10 = ${n}.` : nb[0] > t[0] ? `${v} is just below it. Going up one row takes away 10: ${v} − 10 = ${n}.` : nb[1] < t[1] ? `${v} is just to the left. Going right one spot adds 1: ${v} + 1 = ${n}.` : `${v} is just to the right. Going left one spot takes away 1: ${v} − 1 = ${n}.`;
    return { q: "This is a piece of the number grid. What number goes in the <b>?</b> spot?", say: "This is a piece of the number grid. What number goes in the yellow spot?", vis: `<div class="sudoku magic">${grid.map(V25LG6_cell).join("")}</div>` + note("→ 1 more · ↓ 10 more"), opts: V25LG6_nopts(n, [n + 1, n - 1, n + 10, n - 10, n + 11]), ans: String(n), big: 1, why, key: "v25w" + grid.join(","), v25: { f: "win", n, shown: shownVals } };
  }
  const c = R(1, 10), k0 = R(0, 5), vals = range(0, 4).map(i => 10 * (k0 + i) + c), h = R(0, 4), n = vals[h];
  const nb = h > 0 ? vals[h - 1] : vals[h + 1], why = h > 0 ? `Going down a column, each number is 10 more: ${nb} + 10 = ${n}.` : `Going up a column, each number is 10 less: ${nb} − 10 = ${n}.`;
  return { q: "These numbers go down one column of the number grid. What number is missing?", say: "These numbers go down one column of the number grid. What number is missing?", vis: `<div class="sudoku" style="grid-template-columns:72px">${vals.map((v, i) => V25LG6_cell(i === h ? "?" : v)).join("")}</div>`, opts: V25LG6_nopts(n, [n + 1, n - 1, n + 10, n - 10]), ans: String(n), big: 1, why, key: "v25c" + vals.join(",") + h, v25: { f: "col", n, shown: vals.filter((_, i) => i !== h) } };
});
whyRule(6, "logic", "numgrid", (q, picked) => {
  const x = q.v25; if (!x) return null;
  const p = xNum(picked); if (p == null || p === x.n) return null;
  if (x.shown.includes(p)) return `You can already see ${p}, so it is not the missing number.`;
  const d = p - x.n;
  if (x.f === "col") {
    if (Math.abs(d) === 1) return `${p} is ${d > 0 ? "1 more" : "1 less"}. Going down a column, numbers change by 10, not 1.`;
    return `${p} is ${Math.abs(d)} ${d > 0 ? "more" : "less"} than the missing number. Each step down adds 10.`;
  }
  if (d === 1 && x.n % 10 !== 0) return `${p} is 1 more. It would go just to the right of the ? spot.`;
  if (d === -1 && x.n % 10 !== 1) return `${p} is 1 less. It would go just to the left of the ? spot.`;
  if (d === 10) return `${p} is 10 more. It would go just below the ? spot.`;
  if (d === -10) return `${p} is 10 less. It would go just above the ? spot.`;
  return `${p} is ${Math.abs(d)} ${d > 0 ? "more" : "less"} than the number in the ? spot.`;
});

/* =====================================================================
   12 · Spot the Difference: how many changed, what changed, shape rows
   ===================================================================== */
const V25LG6_SD = V25LG6_ps("🍉:watermelon,🍋:lemon,🍒:cherries,🐢:turtle,🦋:butterfly,🐝:bee,🎁:present,🔔:bell,🚀:rocket,🎸:guitar,🌵:cactus,🍄:mushroom,🐙:octopus,🦉:owl,🧸:teddy bear,🍩:donut,🥕:carrot,🐧:penguin");
addBank(6, "logic", "spotdiff", 0.3, function () {
  const m = R(0, 2);
  if (m === 0) {
    const n = 5, pool = shuffle(V25LG6_SD), top = pool.slice(0, n), c = R(1, 3), idx = shuffle(range(0, n - 1)).slice(0, c).sort((a, b) => a - b), bottom = top.slice();
    idx.forEach((i, j) => { bottom[i] = pool[n + j]; });
    const spots = idx.map(i => i + 1);
    return { q: "How many spots are <b>different</b> in the bottom row?", say: "Look at both rows. How many spots are different in the bottom row?", vis: `<div class="diff-rows">${lineRow(top.map(x => x[0]))}${lineRow(bottom.map(x => x[0]))}</div>`, opts: ["1", "2", "3", "4"], ans: String(c), big: 1, why: c === 1 ? `Only spot ${spots[0]} changed.` : `Spots ${V25LG6_and(spots)} changed. That makes ${c}.`, key: "v25n" + top.map(x => x[0]).join("") + idx.join("") + bottom.map(x => x[0]).join(""), v25: { f: "count", c, spots } };
  }
  if (m === 1) {
    const s = pick(LSHAPES), c = pick(V25LG6_COLS), big = Math.random() < 0.5, what = R(0, 2);
    const B = [s, c, big]; if (what === 0) B[1] = pick(V25LG6_COLS.filter(x => x !== c)); else if (what === 1) B[0] = pick(LSHAPES.filter(x => x !== s)); else B[2] = !big;
    const opts = ["The color", "The shape", "The size"];
    const whyT = what === 0 ? `The shape and size match, but one is ${COLNAME[c]} and one is ${COLNAME[B[1]]}.` : what === 1 ? `The color and size match, but one is a ${s} and one is a ${B[0]}.` : `The shape and color match, but one is big and one is small.`;
    return { q: "These two are almost the same. What is <b>different</b>?", say: "These two are almost the same. What is different?", vis: row(V25LG6_sz(s, c, big, big ? 96 : 50), V25LG6_sz(B[0], B[1], B[2], B[2] ? 96 : 50)), opts, ans: opts[what], big: 1, why: whyT, key: "v25a" + s + c + big + B.join(), v25: { f: "attr", s, c: COLNAME[c], big, what } };
  }
  const top = Array.from({ length: 4 }, () => [pick(LSHAPES), pick(V25LG6_COLS)]), i = R(0, 3), bottom = top.map(x => x.slice());
  if (Math.random() < 0.5) bottom[i][1] = pick(V25LG6_COLS.filter(x => x !== top[i][1])); else bottom[i][0] = pick(LSHAPES.filter(x => x !== top[i][0]));
  const rw = r => `<div class="line-row">${r.map((x, j) => `<span class="lr-cell">${shp(x[0], x[1], 44)}<small>${j + 1}</small></span>`).join("")}</div>`;
  const nm = x => `${COLNAME[x[1]]} ${x[0]}`;
  return { q: "Which spot is <b>different</b> in the bottom row?", say: "Look at both rows of shapes. Which spot is different in the bottom row?", vis: `<div class="diff-rows">${rw(top)}${rw(bottom)}</div>`, opts: range(1, 4).map(x => "Spot " + x), ans: "Spot " + (i + 1), big: 1, why: `In spot ${i + 1}, the ${nm(top[i])} changed to ${V25LG6_A(nm(bottom[i]))}.`, key: "v25s" + top.map(x => x.join("")).join() + i + bottom[i].join(""), v25: { f: "shapes", names: top.map(nm), i } };
});
whyRule(6, "logic", "spotdiff", (q, picked) => {
  const x = q.v25; if (!x) return null;
  const t = xPlain(picked);
  if (x.f === "count") {
    const p = xNum(picked); if (p == null || p === x.c) return null;
    const list = x.spots.length === 1 ? `spot ${x.spots[0]}` : `spots ${V25LG6_and(x.spots)}`;
    return p < x.c ? `${p} is too few. Look again: ${list} changed.` : `${p} is too many. Only ${list} changed.`;
  }
  if (x.f === "attr") {
    const k = ["The color", "The shape", "The size"].indexOf(t); if (k < 0 || k === x.what) return null;
    if (k === 0) return `Both shapes are ${x.c}, so the color is the same.`;
    if (k === 1) return `Both shapes are ${x.s}s, so the shape is the same.`;
    return `Both shapes are ${x.big ? "big" : "small"}, so the size is the same.`;
  }
  if (x.f === "shapes") {
    const m = t.match(/^Spot (\d+)$/); if (!m) return null;
    const j = +m[1] - 1; if (j === x.i || !x.names[j]) return null;
    return `In spot ${j + 1}, both rows have the same ${x.names[j]}.`;
  }
  return null;
});

/* =====================================================================
   13 · Two Rules at Once: kind of thing AND color
   ===================================================================== */
const V25LG6_TR = {
  fruit: { one: "a fruit", word: "fruit", yes: { red: V25LG6_ps("🍎:apple,🍓:strawberry,🍒:cherries"), yellow: V25LG6_ps("🍌:banana,🍋:lemon"), green: V25LG6_ps("🍏:green apple,🍐:pear"), orange: V25LG6_ps("🍊:orange") }, no: { red: V25LG6_ps("🚒:fire truck,❤️:heart,🌹:rose"), yellow: V25LG6_ps("🐥:chick,🚕:taxi,⭐:star"), green: V25LG6_ps("🐸:frog,🌵:cactus,🥦:broccoli"), orange: V25LG6_ps("🦊:fox,🏀:basketball,🥕:carrot") } },
  animal: { one: "an animal", word: "animal", yes: { red: V25LG6_ps("🐞:ladybug,🦞:lobster"), yellow: V25LG6_ps("🐥:chick,🐤:baby chick"), green: V25LG6_ps("🐸:frog,🐢:turtle,🦎:lizard,🐊:crocodile"), orange: V25LG6_ps("🦊:fox,🐯:tiger") }, no: { red: V25LG6_ps("🍎:apple,🚒:fire truck,❤️:heart,🍓:strawberry"), yellow: V25LG6_ps("🍌:banana,🚕:taxi,⭐:star,🍋:lemon"), green: V25LG6_ps("🥦:broccoli,🌵:cactus,🍏:green apple,🥒:cucumber"), orange: V25LG6_ps("🥕:carrot,🏀:basketball,🧡:orange heart") } },
};
addBank(6, "logic", "tworules", 0.3, function () {
  const kind = pick(Object.keys(V25LG6_TR)), D = V25LG6_TR[kind], [c1, c2] = shuffle(Object.keys(D.yes));
  const ans = pick(D.yes[c1]), o1 = pick(D.yes[c2]), o2 = pick(D.no[c1]), o3 = pick(D.no[c2]), info = {};
  info[o1[1]] = [1, c2]; info[o2[1]] = [0, c1]; info[o3[1]] = [0, c2];
  return { q: `Find the <b>${D.word}</b> that is <b>${c1}</b>.`, say: `Find the ${D.word} that is ${c1}.`, opts: shuffle([ans, o1, o2, o3]).map(eOpt), ans: eOpt(ans), sayAns: `the ${ans[1]}`, why: `The ${ans[1]} ${V25LG6_IS(ans[1])} ${V25LG6_PL(ans[1]) ? D.word + "s" : D.one}, and ${V25LG6_IT(ans[1])} ${V25LG6_IS(ans[1])} ${c1}: both rules!`, key: "v25t" + kind + ans[0] + o1[0] + o2[0] + o3[0], v25: { f: "kind", kind, c: c1, info } };
});
whyRule(6, "logic", "tworules", (q, picked) => {
  const x = q.v25; if (!x) return null;
  const pn = V25LG6_T(picked), inf = pn && x.info[pn]; if (!inf) return null;
  const D = V25LG6_TR[x.kind], pl = V25LG6_PL(pn), is = pl ? "are" : "is", it = pl ? "they" : "it", kw = pl ? D.word + "s" : D.one;
  if (inf[0]) return `The ${pn} ${is} ${kw}, but ${it} ${is} ${inf[1]}, not ${x.c}.`;
  if (inf[1] === x.c) return `The ${pn} ${is} ${x.c}, but ${it} ${is} not ${kw}.`;
  return `The ${pn} ${is} not ${kw}, and ${it} ${is} ${inf[1]}, not ${x.c}.`;
});

/* =====================================================================
   14 · Above & Below: stacking clues, and counting above/below
   ===================================================================== */
const V25LG6_STK = [
  { set: V25LG6_ps("📕:red book,📗:green book,📘:blue book,📙:orange book"), on: "is on top of", under: "is under", intro: "Three books are in a stack.", ask: "Which book" },
  { set: V25LG6_ps("🐶:dog,🐱:cat,🐭:mouse,🐸:frog,🐰:rabbit"), on: "stands on top of", under: "is under", intro: "Three animals make a tall stack.", ask: "Which animal" },
];
const V25LG6_TW = V25LG6_ps("🐞:ladybug,🍓:strawberry,🎁:present,🐌:snail,🍪:cookie,🥕:carrot,🐝:bee,🍋:lemon,🎀:bow,🔔:bell,🍉:watermelon,🦉:owl,🐙:octopus,🌻:sunflower,🍩:donut");
const V25LG6_UPOS = ["at the top", "in the middle", "at the bottom"];
addBank(6, "logic", "updown", 0.3, function () {
  if (Math.random() < 0.5) {
    const S = pick(V25LG6_STK), sh = shuffle(S.set), st = sh.slice(0, 3), extra = sh[3], k = R(0, 2);
    const clue = (a, b) => Math.random() < 0.5 ? `The ${a[1]} ${S.on} the ${b[1]}.` : `The ${b[1]} ${S.under} the ${a[1]}.`;
    const clues = shuffle([clue(st[0], st[1]), clue(st[1], st[2])]);
    return { q: `${S.intro}${passage(clues.join(" "))}${S.ask} is <b>${V25LG6_UPOS[k]}</b>?`, say: `${S.intro} ${clues.join(" ")} ${S.ask} is ${V25LG6_UPOS[k]}?`, opts: shuffle([...st, extra]).map(eOpt), ans: eOpt(st[k]), sayAns: `the ${st[k][1]}`, why: `From top to bottom, the stack is: the ${st[0][1]}, the ${st[1][1]}, then the ${st[2][1]}.`, key: "v25k" + clues.join("") + k, v25: { f: "stack", names: st.map(x => x[1]), k } };
  }
  const n = R(4, 5), items = shuffle(V25LG6_TW).slice(0, n), i = R(1, n - 2), x = items[i], above = Math.random() < 0.5, w = above ? "above" : "below";
  const ans = above ? i : n - 1 - i, other = above ? n - 1 - i : i;
  return { q: `How many things are <b>${w}</b> ${LG6V_emo(x[0])}?`, say: `Look at the tower. How many things are ${w} the ${x[1]}?`, vis: LG6V_tower(items), opts: numU(ans, [other, ans + 1, ans - 1, n - 1], 2, 0), ans: String(ans), big: 1, why: `${ans === 1 ? "Only 1 thing is" : ans + " things are"} ${w} the ${x[1]}: ${V25LG6_and((above ? items.slice(0, i) : items.slice(i + 1)).map(y => "the " + y[1]))}.`, key: "v25c" + items.map(y => y[0]).join("") + i + w, v25: { f: "count", ans, other, w, xn: x[1], all: n - 1 } };
});
whyRule(6, "logic", "updown", (q, picked) => {
  const x = q.v25; if (!x) return null;
  if (x.f === "stack") {
    const pn = V25LG6_T(picked); if (!pn) return null;
    const j = x.names.indexOf(pn); if (j === x.k) return null;
    if (j < 0) return `There is no ${pn} in this stack. Use only the clues.`;
    return `The ${pn} ${V25LG6_IS(pn)} ${V25LG6_UPOS[j]}, not ${V25LG6_UPOS[x.k]}.`;
  }
  if (x.f === "count") {
    const p = xNum(picked); if (p == null || p === x.ans) return null;
    const ow = x.w === "above" ? "below" : "above";
    if (p === x.other) return `${p} ${p === 1 ? "thing is" : "things are"} ${ow} the ${x.xn}. Count the ones ${x.w} it.`;
    if (p === x.all) return `${p} is every other thing in the tower. Count only the ones ${x.w} the ${x.xn}.`;
    if (p === x.ans + 1) return `${p} counts the ${x.xn} too. Do not count the ${x.xn} itself.`;
    return p > x.ans ? `${p} is too many. Count only the things ${x.w} the ${x.xn}.` : `${p} is too few. Count every thing ${x.w} the ${x.xn}.`;
  }
  return null;
});

/* =====================================================================
   15 · Picture Grid: numbers, letters, hearts and faces; which row breaks the rule?
   ===================================================================== */
const V25LG6_PGS = [
  { k: "num", text: 1, set: [["1", "1"], ["2", "2"], ["3", "3"]], a: v => `a ${v}` },
  { k: "abc", text: 1, set: [["A", "A"], ["B", "B"], ["C", "C"]], a: v => `${v === "A" ? "an" : "a"} ${v}` },
  { k: "heart", text: 0, set: V25LG6_ps("❤️:red heart,💛:yellow heart,💙:blue heart,💚:green heart,💜:purple heart"), a: v => `a ${v}` },
  { k: "face", text: 0, set: V25LG6_ps("🐼:panda,🐨:koala,🐯:tiger,🦁:lion,🐵:monkey"), a: v => `a ${v}` },
];
const V25LG6_pgc = (S, e) => S.text ? `<span>${e}</span>` : `<span style="font-family:var(--emoji);font-size:34px">${e}</span>`;
const V25LG6_pgrid = (S, g, hide, t) => `<div class="sudoku magic">${g.map((rw, r) => rw.map((e, c) => t && r === t[0] && c === t[1] ? `<span class="tgt">?</span>` : hide.some(h => h[0] === r && h[1] === c) ? `<span class="empty"></span>` : V25LG6_pgc(S, e)).join("")).join("")}</div>`;
addBank(6, "logic", "picgrid", 0.3, function () {
  const S = pick(V25LG6_PGS), sym = S.text ? S.set.slice() : shuffle(S.set).slice(0, 4), set = S.text ? sym : sym.slice(0, 3), L = LG6V_latin(), g = L.map(rw => rw.map(i => set[i][0]));
  const nm = Object.fromEntries(sym.map(x => [x[0], x[1]])), o = x => S.text ? x[0] : eOpt(x);
  if (Math.random() < 0.6) {
    const t = [R(0, 2), R(0, 2)], ans = set[L[t[0]][t[1]]];
    let hide = [];
    const cells = []; for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) if (r !== t[0] || c !== t[1]) cells.push([r, c]);
    for (let tries = 0; tries < 40; tries++) {
      const h = shuffle(cells).slice(0, R(3, 5)), hid = (r, c) => h.some(x => x[0] === r && x[1] === c), seen = new Set();
      for (let i = 0; i < 3; i++) { if (i !== t[1] && !hid(t[0], i)) seen.add(g[t[0]][i]); if (i !== t[0] && !hid(i, t[1])) seen.add(g[i][t[1]]); }
      if (seen.size === 2) { hide = h; break; }
    }
    const hid = (r, c) => hide.some(x => x[0] === r && x[1] === c);
    const rowSeen = [0, 1, 2].filter(i => i !== t[1] && !hid(t[0], i)).map(i => nm[g[t[0]][i]]);
    const colSeen = [0, 1, 2].filter(i => i !== t[0] && !hid(i, t[1])).map(i => nm[g[i][t[1]]]);
    const others = set.filter(x => x !== ans).map(x => S.a(x[1]));
    return { q: "Each row and each column has one of each. What goes in the <b>?</b> spot?", say: "Every row and every column has one of each. What goes in the yellow spot?", vis: V25LG6_pgrid(S, g, hide, t), opts: shuffle(sym).map(o), ans: o(ans), sayAns: S.a(ans[1]), why: `That row and column already have ${others[0]} and ${others[1]}, so ${S.a(ans[1])} goes here.`, key: "v25g" + g.flat().join("") + t.join("") + hide.map(x => x.join("")).join("."), v25: { f: "fill", k: S.k, row: rowSeen, col: colSeen, all: set.map(x => x[1]) } };
  }
  /* break one cell: its row and its column now have a repeat */
  const r = R(0, 2), c = R(0, 2), old = L[r][c], nw = pick([0, 1, 2].filter(v => v !== old)), bg = g.map(rw => rw.slice()); bg[r][c] = set[nw][0];
  const byRow = Math.random() < 0.5, RN = ["Top row", "Middle row", "Bottom row"], CN = ["Left column", "Middle column", "Right column"], opts = byRow ? RN : CN;
  const lines = [0, 1, 2].map(i => (byRow ? bg[i] : bg.map(rw => rw[i])).map(e => nm[e]));
  const dup = set[nw][1];
  return { q: `Each row and each column should have one of each. Which <b>${byRow ? "row" : "column"}</b> breaks the rule?`, say: `Each row and each column should have one of each. Which ${byRow ? "row" : "column"} breaks the rule?`, vis: V25LG6_pgrid(S, bg, [], null), opts, ans: opts[byRow ? r : c], big: 1, why: `The ${opts[byRow ? r : c].toLowerCase()} has two ${dup}s. Each one should be there only once.`, key: "v25x" + bg.flat().join("") + byRow, v25: { f: "break", k: S.k, byRow, bad: byRow ? r : c, lines } };
});
whyRule(6, "logic", "picgrid", (q, picked) => {
  const x = q.v25; if (!x) return null;
  const S = V25LG6_PGS.find(s => s.k === x.k); if (!S) return null;
  if (x.f === "fill") {
    const pn = S.text ? xPlain(picked) : V25LG6_T(picked); if (!pn) return null;
    if (!x.all.includes(pn)) return `There is no ${pn} anywhere in this grid. Use only what you see.`;
    if (x.row.includes(pn)) return `There is already ${S.a(pn)} in this row.`;
    if (x.col.includes(pn)) return `There is already ${S.a(pn)} in this column.`;
    return null;
  }
  if (x.f === "break") {
    const names = x.byRow ? ["Top row", "Middle row", "Bottom row"] : ["Left column", "Middle column", "Right column"];
    const j = names.indexOf(xPlain(picked)); if (j < 0 || j === x.bad) return null;
    return `The ${names[j].toLowerCase()} has ${V25LG6_and(x.lines[j].map(S.a))}: one of each.`;
  }
  return null;
});

