/* =====================================================================
   v22 · Logic, age 6 (tag LG6V)
   New topics: updown (Above & Below), picgrid (Picture Grid)
   More questions for every age-6 logic topic.
   Every new question carries q.v22 so the why-rules below only speak for them.
   ===================================================================== */

/* ---------- shared helpers ---------- */
const LG6V_PL = n => /^(dice|fries|cherries|grapes|books|socks|jeans|gloves|eyes|apples|oranges|bricks|pancakes|clouds|scissors|sunglasses|dishes|stars)$/.test(n) || (/s$/.test(n) && !/(glass|bus|dress|octopus|cactus|hibiscus|grass|compass|class)$/.test(n));
const LG6V_IS = n => LG6V_PL(n) ? "are" : "is";
const LG6V_A = n => LG6V_PL(n) ? n : (/^[aeiou]/.test(n) ? "an " : "a ") + n;
/* data from bank_logicA.js (copied or guarded so this file also works on its own) */
const LG6V_has = f => { try { return f(); } catch (e) { return null; } };
const LG6V_LGA_BA = LG6V_has(() => LGA_BA) || [], LG6V_LGA_CH = LG6V_has(() => LGA_CHAINS) || [], LG6V_LGA_SH = LG6V_has(() => LGA_SHADOWS) || [];
const LG6V_CATS = {
  birds: parseSet("🐦:bird,🦆:duck,🦉:owl,🦅:eagle,🦜:parrot,🐧:penguin,🦩:flamingo,🐓:rooster"),
  flowers: parseSet("🌹:rose,🌻:sunflower,🌷:tulip,🌼:daisy,🌸:blossom,🌺:hibiscus"),
  weather: parseSet("🌧️:rain,❄️:snow,⛈️:storm,🌈:rainbow,☁️:cloud"),
  tools: parseSet("🔨:hammer,🔧:wrench,🪚:saw,🪛:screwdriver,⛏️:pickax"),
  drinks: parseSet("🥛:milk,🧃:juice box,☕:hot cocoa,🍵:tea,🥤:cup with a straw"),
  "school things": parseSet("✏️:pencil,🖍️:crayon,📎:paper clip,📚:books,🎒:backpack"),
  "body parts": parseSet("👀:eyes,👂:ear,👃:nose,👄:mouth,✋:hand,🦶:foot"),
  toys: parseSet("🧸:teddy bear,🪀:yo-yo,🪁:kite,🎲:dice,🧩:puzzle piece"),
  buildings: parseSet("🏠:house,🏫:school,🏥:hospital,🏰:castle,🏢:office building,🏪:store"),
  "things in space": parseSet("🌙:moon,⭐:star,🪐:planet,☄️:comet"),
};
const LG6V_SIZE_TIERS = [parseSet("🐜:ant,🐞:ladybug,🐝:bee"), parseSet("🐭:mouse,🍎:apple,🐸:frog"), parseSet("🐱:cat,🐰:rabbit,🐔:chicken"), parseSet("🐴:horse,🐮:cow,🐻:bear"), parseSet("🐘:elephant,🦒:giraffe"), parseSet("🐳:whale,✈️:airplane")];
const LG6V_SIZE_ALL = LG6V_SIZE_TIERS.flatMap((t, i) => t.map(x => [...x, i]));
const LG6V_GROW = ["⭐", "🍎", "🌼", "🐟", "🔴", "🍓", "🐞", "🎈", "🍪", "🦆", "🧁", "🌸", "⚽"];

/* ====================== NEW TOPIC 1 · Above & Below ====================== */
const LG6V_UD = parseSet("🧸:teddy bear,⚽:ball,📚:books,🪀:yo-yo,🚗:toy car,🎲:dice,🧩:puzzle piece,🪁:kite,🎈:balloon,🍎:apple,🌵:cactus,🧁:cupcake,🐢:turtle,🦆:duck,🎩:hat,🌼:flower");
const LG6V_tower = items => `<div class="ud-tower" style="display:inline-flex;flex-direction:column;align-items:center;gap:6px">${items.map(([e, n]) => `<span class="lr-cell"><span class="emo" title="${n}">${e}</span></span>`).join("")}</div>`;
const LG6V_SHELF = ["top", "middle", "bottom"];
const LG6V_shelves = sh => `<div class="ud-shelves" style="display:inline-flex;flex-direction:column;gap:6px;background:#FFF8EC;padding:8px 10px;border-radius:12px;border:3px solid #B07A3C">${sh.map(items => `<div style="display:flex;justify-content:center;gap:18px;min-width:170px;min-height:58px;align-items:flex-end;border-bottom:7px solid #B07A3C;padding:2px 10px">${items.map(([e, n]) => `<span class="emo" title="${n}" style="font-size:42px">${e}</span>`).join("")}</div>`).join("")}</div>`;
const LG6V_emo = e => `<span class="emo">${e}</span>`;

topic(6, "logic", {
  id: "updown", title: "Above & Below", icon: "🗼", blurb: "Top, bottom, above, below and between.",
  lesson: [
    { t: "Top and bottom", say: "Look at this tower. The ball is at the top. The teddy bear is at the bottom.", html: LG6V_tower([["⚽", "ball"], ["📚", "books"], ["🧸", "teddy bear"]]) + note("⬆️ top … bottom ⬇️") },
    { t: "Above and below", say: "The kite is just above the books. The yo-yo is just below the books. The books are between them.", html: LG6V_tower([["🪁", "kite"], ["📚", "books"], ["🪀", "yo-yo"]]) + note("<b>above</b> = higher up · <b>below</b> = lower down") },
    { t: "Shelves", say: "A shelf can have a top, a middle and a bottom. The cupcake is on the top shelf. The duck is on the bottom shelf.", html: LG6V_shelves([[["🧁", "cupcake"]], [["🎲", "dice"]], [["🦆", "duck"]]]) },
  ],
  gen() {
    const m = R(0, 5);
    if (m <= 3) {
      const k = m === 0 ? R(4, 5) : 5, items = shuffle(LG6V_UD).slice(0, k), names = items.map(x => x[1]), vis = LG6V_tower(items);
      const oth = (ex, n = 3) => shuffle(items.filter(x => !ex.includes(x))).slice(0, n);
      if (m === 0) {
        const top = Math.random() < 0.5, ans = top ? items[0] : items[k - 1], w = top ? "top" : "bottom";
        return { q: `Which one is at the <b>${w}</b>?`, say: `Look at the tower. Which one is at the ${w}?`, vis, opts: shuffle([ans, ...oth([ans])]).map(eOpt), ans: eOpt(ans), sayAns: `the ${ans[1]}`, why: `The ${ans[1]} ${LG6V_IS(ans[1])} at the very ${w} of the tower.`, key: "LG6Vt" + items.map(x => x[0]).join("") + w, v22: { f: "end", top, names } };
      }
      if (m === 1 || m === 2) {
        const above = m === 1, i = above ? R(1, k - 1) : R(0, k - 2), x = items[i], ans = items[above ? i - 1 : i + 1], w = above ? "above" : "below";
        return { q: `What is just <b>${w}</b> ${LG6V_emo(x[0])}?`, say: `What is just ${w} the ${x[1]}?`, vis, opts: shuffle([ans, ...oth([ans, x])]).map(eOpt), ans: eOpt(ans), sayAns: `the ${ans[1]}`, why: `The ${ans[1]} ${LG6V_IS(ans[1])} right ${w} the ${x[1]}, with nothing in between.`, key: "LG6Va" + items.map(x => x[0]).join("") + i + w, v22: { f: "near", above, i, names } };
      }
      const i = R(1, k - 2), a = items[i - 1], b = items[i + 1], ans = items[i];
      return { q: `What is <b>between</b> ${LG6V_emo(a[0])} and ${LG6V_emo(b[0])}?`, say: `What is between the ${a[1]} and the ${b[1]}?`, vis, opts: shuffle([ans, ...oth([ans, a, b])]).map(eOpt), ans: eOpt(ans), sayAns: `the ${ans[1]}`, why: `The ${ans[1]} ${LG6V_IS(ans[1])} below the ${a[1]} and above the ${b[1]}.`, key: "LG6Vb" + items.map(x => x[0]).join("") + i, v22: { f: "between", i, names } };
    }
    const six = shuffle(LG6V_UD).slice(0, 6), sh = [six.slice(0, 2), six.slice(2, 4), six.slice(4, 6)], vis = LG6V_shelves(sh);
    const shelfOf = n => sh.findIndex(s => s.some(x => x[1] === n)), shelfNames = sh.map(s => s.map(x => x[1]));
    if (m === 4) {
      const s = R(0, 2), x = pick(sh[s]), opts = LG6V_SHELF.map(w => cap(w) + " shelf");
      return { q: `Which shelf is ${LG6V_emo(x[0])} on?`, say: `Which shelf is the ${x[1]} on?`, vis, opts, ans: opts[s], big: 1, why: `The ${x[1]} ${LG6V_IS(x[1])} on the ${LG6V_SHELF[s]} shelf.`, key: "LG6Vs" + six.map(x => x[0]).join("") + x[0], v22: { f: "whichshelf", x: x[1], shelfNames } };
    }
    const s = R(0, 2), ans = pick(sh[s]), others = shuffle(six.filter(x => shelfOf(x[1]) !== s)).slice(0, 3);
    return { q: `Which one is on the <b>${LG6V_SHELF[s]}</b> shelf?`, say: `Which one is on the ${LG6V_SHELF[s]} shelf?`, vis, opts: shuffle([ans, ...others]).map(eOpt), ans: eOpt(ans), sayAns: `the ${ans[1]}`, why: `The ${ans[1]} ${LG6V_IS(ans[1])} on the ${LG6V_SHELF[s]} shelf.`, key: "LG6Vo" + six.map(x => x[0]).join("") + ans[0], v22: { f: "onshelf", s, shelfNames } };
  },
});
TRICK_ADD(6, "logic", "updown", "Put your finger on the thing. Move up one for just above, or down one for just below.");

whyRule(6, "logic", "updown", (q, picked) => {
  const x = q.v22; if (!x) return null;
  const pn = (String(picked).match(/title="([^"]+)"/) || [])[1];
  if (x.f === "whichshelf") {
    const w = xPlain(picked).toLowerCase().replace(" shelf", ""), s = LG6V_SHELF.indexOf(w); if (s < 0) return null;
    const [a, b] = x.shelfNames[s];
    return `The ${x.x} ${LG6V_IS(x.x)} not on the ${w} shelf. That shelf has the ${a} and the ${b}.`;
  }
  if (!pn) return null;
  if (x.f === "onshelf") {
    const s = x.shelfNames.findIndex(sn => sn.includes(pn)); if (s < 0 || s === x.s) return null;
    return `The ${pn} ${LG6V_IS(pn)} on the ${LG6V_SHELF[s]} shelf, not the ${LG6V_SHELF[x.s]} shelf.`;
  }
  const j = x.names.indexOf(pn), k = x.names.length; if (j < 0) return null;
  if (x.f === "end") {
    if (x.top) return j === k - 1 ? `The ${pn} ${LG6V_IS(pn)} at the bottom, not the top.` : `The ${pn} ${LG6V_IS(pn)} not at the top. There ${j === 1 ? "is 1 thing" : `are ${j} things`} above ${LG6V_PL(pn) ? "them" : "it"}.`;
    const b = k - 1 - j;
    return j === 0 ? `The ${pn} ${LG6V_IS(pn)} at the top, not the bottom.` : `The ${pn} ${LG6V_IS(pn)} not at the bottom. There ${b === 1 ? "is 1 thing" : `are ${b} things`} below ${LG6V_PL(pn) ? "them" : "it"}.`;
  }
  if (x.f === "near") {
    const i = x.i, xn = x.names[i];
    if (x.above) return j > i ? `The ${pn} ${LG6V_IS(pn)} below the ${xn}, not above it.` : `The ${pn} ${LG6V_IS(pn)} higher up, but not right next to the ${xn}.`;
    return j < i ? `The ${pn} ${LG6V_IS(pn)} above the ${xn}, not below it.` : `The ${pn} ${LG6V_IS(pn)} lower down, but not right next to the ${xn}.`;
  }
  if (x.f === "between") {
    const a = x.names[x.i - 1], b = x.names[x.i + 1];
    if (j < x.i - 1) return `The ${pn} ${LG6V_IS(pn)} above the ${a}, so ${LG6V_PL(pn) ? "they are" : "it is"} not between.`;
    if (j > x.i + 1) return `The ${pn} ${LG6V_IS(pn)} below the ${b}, so ${LG6V_PL(pn) ? "they are" : "it is"} not between.`;
  }
  return null;
});

/* ====================== NEW TOPIC 2 · Picture Grid ====================== */
const LG6V_PG = parseSet("🍎:apple,🍌:banana,🍇:grapes,🍓:strawberry,🐶:dog,🐱:cat,🐰:rabbit,🐸:frog,⭐:star,🌙:moon,☀️:sun,🚗:car,🚲:bike,🎈:balloon,🌼:flower,🐟:fish,🍪:cookie,⚽:ball");
const LG6V_cell = e => `<span style="font-family:var(--emoji);font-size:34px">${e}</span>`;
/* g: 3x3 of emoji, hide: list of [r,c] blanks, t: [r,c] target (shown as ?) */
const LG6V_pgrid = (g, hide, t) => `<div class="sudoku magic">${g.map((rw, r) => rw.map((e, c) => r === t[0] && c === t[1] ? `<span class="tgt">?</span>` : hide.some(h => h[0] === r && h[1] === c) ? `<span class="empty"></span>` : LG6V_cell(e)).join("")).join("")}</div>`;
function LG6V_latin() {
  const base = [[0, 1, 2], [1, 2, 0], [2, 0, 1]], rp = shuffle([0, 1, 2]), cp = shuffle([0, 1, 2]);
  return rp.map(r => cp.map(c => base[r][c]));
}
topic(6, "logic", {
  id: "picgrid", title: "Picture Grid", icon: "🧩", blurb: "Each row and column has one of each picture.",
  lesson: [
    { t: "One of each", say: "In a picture grid, every row going across has one of each picture. This row has an apple, a banana and grapes.", html: LG6V_pgrid([["🍎", "🍌", "🍇"], ["🍌", "🍇", "🍎"], ["🍇", "🍎", "🍌"]], [[1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]], [-1, -1]) },
    { t: "Columns too", say: "Every column going down has one of each picture too. No picture is in a row or a column two times.", html: LG6V_pgrid([["🍎", "🍌", "🍇"], ["🍌", "🍇", "🍎"], ["🍇", "🍎", "🍌"]], [], [-1, -1]) + note("Across ➡️ one of each · Down ⬇️ one of each") },
    { t: "Find the missing one", say: "Look at the row and the column of the question mark. The banana and the grapes are already there. So the apple goes in the spot!", html: LG6V_pgrid([["🍎", "🍌", "🍇"], ["🍌", "🍇", "🍎"], ["🍇", "🍎", "🍌"]], [], [0, 0]) + note("Which picture is <b>not</b> there yet?") },
  ],
  gen() {
    const L = LG6V_latin(), sym = shuffle(LG6V_PG).slice(0, 4), set = sym.slice(0, 3), g = L.map(rw => rw.map(i => set[i][0]));
    const t = [R(0, 2), R(0, 2)], ans = set[L[t[0]][t[1]]];
    const easy = Math.random() < 0.35;
    let hide = [];
    if (!easy) {
      const cells = []; for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) if (r !== t[0] || c !== t[1]) cells.push([r, c]);
      for (let tries = 0; tries < 40; tries++) {
        const h = shuffle(cells).slice(0, R(2, 4)), hid = (r, c) => h.some(x => x[0] === r && x[1] === c);
        const seen = new Set(); for (let i = 0; i < 3; i++) { if (!hid(t[0], i) && i !== t[1]) seen.add(g[t[0]][i]); if (!hid(i, t[1]) && i !== t[0]) seen.add(g[i][t[1]]); }
        if (seen.size === 2) { hide = h; break; }
      }
      if (!hide.length) hide = [];
    }
    const hid = (r, c) => hide.some(x => x[0] === r && x[1] === c);
    const rowSeen = [0, 1, 2].filter(i => i !== t[1] && !hid(t[0], i)).map(i => g[t[0]][i]);
    const colSeen = [0, 1, 2].filter(i => i !== t[0] && !hid(i, t[1])).map(i => g[i][t[1]]);
    const others = set.filter(x => x !== ans), opts = (easy ? sym : set).slice(), nm = Object.fromEntries(sym.map(x => [x[0], x[1]]));
    const vis = LG6V_pgrid(g, hide, t);
    return { q: "Each row and each column has one of each picture. What goes in the <b>?</b> spot?", say: "Every row and every column has one of each picture. Which picture goes in the yellow spot?", vis, opts: shuffle(opts).map(eOpt), ans: eOpt(ans), sayAns: `the ${ans[1]}`, why: `That row and column already have the ${others[0][1]} and the ${others[1][1]}, so the ${ans[1]} ${LG6V_PL(ans[1]) ? "go" : "goes"} here.`, key: "LG6Vg" + g.flat().join("") + t.join("") + hide.map(x => x.join("")).join("."), v22: { row: rowSeen.map(e => nm[e]), col: colSeen.map(e => nm[e]), all: set.map(x => x[1]) } };
  },
});
TRICK_ADD(6, "logic", "picgrid", "Look across the row and down the column. The picture that isn't there yet goes in the spot.");

whyRule(6, "logic", "picgrid", (q, picked) => {
  const x = q.v22; if (!x) return null;
  const pn = (String(picked).match(/title="([^"]+)"/) || [])[1]; if (!pn) return null;
  if (!x.all.includes(pn)) return `There ${LG6V_PL(pn) ? "are no" : "is no"} ${pn} anywhere in this grid. Use only the pictures you see.`;
  if (x.row.includes(pn)) return LG6V_PL(pn) ? `There are already ${pn} in this row.` : `There is already ${LG6V_A(pn)} in this row.`;
  if (x.col.includes(pn)) return LG6V_PL(pn) ? `There are already ${pn} in this column.` : `There is already ${LG6V_A(pn)} in this column.`;
  return null;
});

/* ====================== MORE QUESTIONS FOR OLD TOPICS ====================== */

/* ---------- Before & After: which comes first / after? ---------- */
const LG6V_BA_SKIP = new Set(["egg|chick", "hen|egg", "letter|mailbox", "ice|water", "water|ice", "new moon|full moon"]);
const LG6V_BAP = [...BEFOREAFTER.map(p => [p[0], p[1], p[2], p[3], `The ${p[2]} becomes the ${p[3]}.`]), ...LG6V_LGA_BA.map(p => [p[0], p[1], p[2], p[3], p[5]])].filter(p => !LG6V_BA_SKIP.has(p[2] + "|" + p[3]));
const LG6V_CH = LG6V_LGA_CH.filter(c => c[0][1] !== "egg" && c[0][1] !== "new moon");
addBank(6, "logic", "beforeafter", 0.45, function () {
  const o = (e, n) => `<span class="emo" title="${n}">${e}</span>`;
  if (Math.random() < 0.72 || !LG6V_CH.length) {
    const [a, b, an, bn, why] = pick(LG6V_BAP), first = Math.random() < 0.5, [x, y] = [an, bn].sort();
    const w = first ? "first" : "after";
    return { q: `Which comes <b>${first ? "first" : "after"}</b>?`, say: `Which comes ${w}, the ${x} or the ${y}?`, opts: shuffle([o(a, an), o(b, bn)]), ans: first ? o(a, an) : o(b, bn), sayAns: `the ${first ? an : bn}`, why, key: "LG6Vp" + a + b + w, v22: { f: "pair", first, an, bn } };
  }
  const C3 = pick(LG6V_CH), k = R(0, 2), nm = C3.slice(0, 3).map(x => x[1]), w = ["first", "in the middle", "last"][k], sorted = nm.slice().sort();
  return { q: `Think about the order. Which comes <b>${w}</b>?`, say: `The ${sorted[0]}, the ${sorted[1]} and the ${sorted[2]}. Which comes ${w}?`, opts: shuffle(C3.slice(0, 3)).map(x => o(x[0], x[1])), ans: o(C3[k][0], C3[k][1]), sayAns: `the ${C3[k][1]}`, why: `First the ${nm[0]}, then the ${nm[1]}, then the ${nm[2]}.`, key: "LG6Vc" + C3[0][0] + k, v22: { f: "chain", k, nm } };
});
whyRule(6, "logic", "beforeafter", (q, picked) => {
  const x = q.v22; if (!x) return null;
  const pn = (String(picked).match(/title="([^"]+)"/) || [])[1]; if (!pn) return null;
  const c = n => LG6V_PL(n) ? "come" : "comes";
  if (x.f === "pair") {
    if (x.first && pn === x.bn) return `The ${x.bn} ${c(x.bn)} after the ${x.an}, not first.`;
    if (!x.first && pn === x.an) return `The ${x.an} ${c(x.an)} before the ${x.bn}, not after.`;
    return null;
  }
  const j = x.nm.indexOf(pn); if (j < 0 || j === x.k) return null;
  const pos = ["first", "in the middle", "last"];
  return `The ${pn} ${c(pn)} ${pos[j]}, not ${pos[x.k]}.`;
});

/* ---------- Sorting Groups: more groups ---------- */
const LG6V_GR = { birds: ["a bird", "birds"], flowers: ["a flower", "flowers"], weather: ["weather", "weather"], tools: ["a tool", "tools"], drinks: ["a drink", "drinks"], "school things": ["something for school", "things for school"], "body parts": ["a body part", "body parts"], toys: ["a toy", "toys"], buildings: ["a building", "buildings"], "things in space": ["something in space", "things in space"] };
const LG6V_GR_BAD = new Set(["toys|school things", "school things|toys", "weather|things in space", "things in space|weather"]);
addBank(6, "logic", "groups", 0.3, function () {
  const keys = shuffle(Object.keys(LG6V_GR)), a = keys[0], rest = keys.slice(1).filter(k => !LG6V_GR_BAD.has(a + "|" + k)).slice(0, 3);
  const items = shuffle(LG6V_CATS[a]), shown = items.slice(0, 3), ans = items[3], others = rest.map(k => [pick(LG6V_CATS[k]), k]);
  const n = ans[1], one = LG6V_GR[a][LG6V_PL(n) ? 1 : 0];
  return { q: "Which one belongs in this group?", vis: `<div class="basket">${shown.map(x => x[0]).join("")}</div>`, opts: shuffle([ans, ...others.map(x => x[0])]).map(eOpt), ans: eOpt(ans), sayAns: `the ${n}`, why: `The ${n} ${LG6V_IS(n)} ${one}, just like the others.`, key: "LG6V" + a + ans[0] + shown.map(x => x[0]).join(""), v22: { g: a, cat: Object.fromEntries(others.map(([it, k]) => [it[1], k])) } };
});
whyRule(6, "logic", "groups", (q, picked) => {
  const x = q.v22; if (!x) return null;
  const pn = (String(picked).match(/title="([^"]+)"/) || [])[1], k = pn && x.cat[pn]; if (!k) return null;
  const pl = LG6V_PL(pn), g = LG6V_GR[x.g][1];
  return `The ${pn} ${pl ? "are" : "is"} ${LG6V_GR[k][pl ? 1 : 0]}, but this group is all ${g}.`;
});

/* ---------- Growing Patterns: shrinking patterns ---------- */
addBank(6, "logic", "growing", 0.3, function () {
  const step = pick([1, 1, 2]), start = step === 1 ? R(5, 9) : R(7, 9), e = pick(LG6V_GROW), seq = [0, 1, 2].map(i => start - i * step), ans = start - 3 * step;
  return { q: "The pattern gets <b>smaller</b>. How many come next?", say: "The pattern gets smaller. How many come next?", vis: `<div class="grow-row">${seq.map(n => grp(n, e)).join("")}<span class="car q">?</span></div>`, opts: numU(ans, [ans + 1, ans - 1, seq[2], ans + step + 1], 2, 1), ans: String(ans), big: 1, why: `It goes down by ${step} each time: ${seq.join(", ")}, ${ans}.`, key: "LG6Vs" + e + start + step, v22: { step, last: seq[2], ans } };
});
whyRule(6, "logic", "growing", (q, picked) => {
  const x = q.v22; if (!x) return null;
  const p = +xPlain(picked); if (!isFinite(p) || p === x.ans) return null;
  if (p === x.last) return `${p} is the same as the last group, but this pattern gets smaller each time.`;
  if (p > x.last) return `${p} is more than the last group, but this pattern gets smaller.`;
  if (p > x.ans) return `${p} is only ${x.last - p} less than ${x.last}. This pattern goes down by ${x.step} each time.`;
  return `${p} is too small. Take away just ${x.step} from ${x.last}.`;
});

/* ---------- Left & Right: spots in the line ---------- */
const LG6V_LRN = { "🐶": "dog", "🐱": "cat", "🐰": "rabbit", "🐻": "bear", "🦊": "fox", "🐸": "frog", "🐵": "monkey", "🐷": "pig", "🐮": "cow", "🦁": "lion" };
addBank(6, "logic", "leftright", 0.3, function () {
  const items = shuffle(LR_POOL).slice(0, R(4, 5)), n = items.length, i = R(0, n - 1), x = items[i], o = e => eOpt([e, LG6V_LRN[e]]);
  if (Math.random() < 0.5) {
    const opts = shuffle([x, ...shuffle(items.filter(e => e !== x)).slice(0, 3)]).map(o);
    return { q: `Which animal is in <b>spot ${i + 1}</b>?`, say: `Which animal is in spot ${i + 1}?`, vis: lineRow(items), opts, ans: o(x), sayAns: `the ${LG6V_LRN[x]}`, why: `Count from the left: the ${LG6V_LRN[x]} is in spot ${i + 1}.`, key: "LG6Vn" + items.join("") + i, v22: { f: "inspot", items } };
  }
  const spots = shuffle([i, ...shuffle(range(0, n - 1).filter(j => j !== i)).slice(0, 3)]).sort((a, b) => a - b).map(j => "Spot " + (j + 1));
  return { q: `Which spot is ${LG6V_emo(x)} in?`, say: `Which spot is the ${LG6V_LRN[x]} in?`, vis: lineRow(items), opts: spots, ans: "Spot " + (i + 1), big: 1, why: `${i === 0 ? `The ${LG6V_LRN[x]} is first from the left, in spot 1.` : `Count from the left: ${Array.from({ length: i + 1 }, (_, j) => j + 1).join(", ")}. The ${LG6V_LRN[x]} is in spot ${i + 1}.`}`, key: "LG6Vw" + items.join("") + i, v22: { f: "whichspot", items, x } };
});
whyRule(6, "logic", "leftright", (q, picked) => {
  const x = q.v22; if (!x) return null;
  if (x.f === "whichspot") {
    const m = xPlain(picked).match(/Spot (\d+)/); if (!m) return null;
    const e = x.items[+m[1] - 1]; if (!e || e === x.x) return null;
    return `Spot ${m[1]} has the ${LG6V_LRN[e]}, not the ${LG6V_LRN[x.x]}.`;
  }
  const pn = (String(picked).match(/title="([^"]+)"/) || [])[1], j = x.items.findIndex(e => LG6V_LRN[e] === pn); if (j < 0) return null;
  return `The ${pn} is in spot ${j + 1}. Count again from the left.`;
});

/* ---------- Same & Different: matching picture pairs ---------- */
const LG6V_MP = parseSet("🐶:dog,🐱:cat,🐰:rabbit,🐸:frog,🍎:apple,🍌:banana,⭐:star,🌙:moon,🚗:car,⚽:ball,🌼:flower,🐟:fish,🎈:balloon,🧁:cupcake");
const LG6V_mpo = (a, b) => `<span class="emo" title="the ${a[1]} and the ${b[1]}">${a[0]}${b[0]}</span>`;
addBank(6, "logic", "match", 0.4, function () {
  const [A, B, C, D] = shuffle(LG6V_MP);
  const opts = [[A, B], [B, A], [A, C], [D, B]], map = {};
  for (const [p, r] of opts) map[LG6V_mpo(p, r)] = [p[1], r[1]];
  return { q: "Find the one that is <b>exactly the same</b>.", say: "Find the one that is exactly the same, in the same order.", vis: `<span class="emo" style="font-size:80px">${A[0]}${B[0]}</span>`, opts: shuffle(opts).map(([p, r]) => LG6V_mpo(p, r)), ans: LG6V_mpo(A, B), sayAns: `the ${A[1]}, then the ${B[1]}`, why: `It has the ${A[1]} first and the ${B[1]} second, just like the picture.`, key: "LG6V" + A[0] + B[0], v22: { map, t: [A[1], B[1]] } };
});
whyRule(6, "logic", "match", (q, picked) => {
  const x = q.v22; if (!x) return null;
  const p = x.map[picked]; if (!p) return null;
  const [a, b] = x.t;
  if (p[0] === b && p[1] === a) return `It has the same two pictures, but in the other order.`;
  if (p[0] === a && p[1] !== b) return `The second picture is ${LG6V_A(p[1])}, not ${LG6V_A(b)}.`;
  if (p[1] === b && p[0] !== a) return `The first picture is ${LG6V_A(p[0])}, not ${LG6V_A(a)}.`;
  return null;
});

/* ---------- Number Grid: bigger numbers ---------- */
addBank(6, "logic", "numgrid", 0.45, function () {
  const start = pick([51, 61, 71, 81]), hide = R(0, 19), n = start + hide;
  const why = hide % 10 === 0 ? (hide >= 10 ? `It's 10 more than the number above it: ${n - 10} + 10 = ${n}.` : `It's 1 less than the number after it: ${n + 1} − 1 = ${n}.`) : `It's 1 more than the number before it: ${n - 1} + 1 = ${n}.`;
  return { q: "What number is hiding?", vis: numGrid(start, [hide]), opts: numU(n, [n + 1, n - 1, n + 10, n - 10], 2, 1), ans: String(n), big: 1, why, key: "LG6V" + start + "-" + hide, v22: { start, n } };
});
whyRule(6, "logic", "numgrid", (q, picked) => {
  const x = q.v22; if (!x) return null;
  const p = +xPlain(picked); if (!isFinite(p) || p === x.n) return null;
  if (p >= x.start && p <= x.start + 19) return `You can already see ${p} in the grid, so it is not the hiding number.`;
  const d = p - x.n;
  if (d === 1) return `${p} is 1 more. It would come just after the hiding spot.`;
  if (d === -1) return `${p} is 1 less. It would come just before the hiding spot.`;
  if (d === 10) return `${p} is 10 more. It would be one row lower.`;
  if (d === -10) return `${p} is 10 less. It would be one row higher.`;
  return `${p} is ${Math.abs(d)} ${d > 0 ? "more" : "less"} than the hiding number.`;
});

/* ---------- Odd One Out: "Which one is not a ___?" ---------- */
const LG6V_OC = {
  fruits: [LCATS.fruits, "a fruit", "fruits"], "furry animals": [LCATS["furry animals"], "a furry animal", "furry animals"], vehicles: [LCATS.vehicles, "a vehicle", "vehicles"], clothes: [LCATS.clothes, "something you wear", "things you wear"], "sea animals": [LCATS["sea animals"], "a sea animal", "sea animals"], sweets: [LCATS.sweets, "a sweet treat", "sweet treats"], "sports balls": [LCATS["sports balls"], "a sports ball", "sports balls"], bugs: [LCATS.bugs, "a bug", "bugs"], vegetables: [LCATS.vegetables, "a vegetable", "vegetables"], "music makers": [LCATS["music makers"], "a music maker", "music makers"],
  birds: [LG6V_CATS.birds, "a bird", "birds"], flowers: [LG6V_CATS.flowers, "a flower", "flowers"], tools: [LG6V_CATS.tools, "a tool", "tools"], drinks: [LG6V_CATS.drinks, "a drink", "drinks"], "body parts": [LG6V_CATS["body parts"], "a body part", "body parts"], toys: [LG6V_CATS.toys, "a toy", "toys"], buildings: [LG6V_CATS.buildings, "a building", "buildings"],
};
const LG6V_OC_BAD = [["sea animals", "birds"], ["sweets", "drinks"], ["toys", "sports balls"], ["toys", "music makers"], ["toys", "vehicles"], ["fruits", "sweets"], ["fruits", "vegetables"], ["vegetables", "flowers"], ["furry animals", "sea animals"]];
const LG6V_ocOK = (a, b) => !LG6V_OC_BAD.some(([x, y]) => (x === a && y === b) || (x === b && y === a));
addBank(6, "logic", "oddone", 0.5, function () {
  const keys = shuffle(Object.keys(LG6V_OC)), a = keys[0], b = keys.slice(1).find(k => LG6V_ocOK(a, k));
  const [set, one] = LG6V_OC[a], same = shuffle(set).slice(0, 3), odd = pick(LG6V_OC[b][0]), on = odd[1];
  return { q: `Which one is <b>not</b> ${one}?`, say: `Which one is not ${one}?`, opts: shuffle([...same, odd]).map(eOpt), ans: eOpt(odd), sayAns: `the ${on}`, why: `The ${on} ${LG6V_IS(on)} ${LG6V_OC[b][LG6V_PL(on) ? 2 : 1]}, not ${one}.`, key: "LG6V" + a + odd[0], v22: { a, names: same.map(x => x[1]) } };
});
whyRule(6, "logic", "oddone", (q, picked) => {
  const x = q.v22; if (!x) return null;
  const pn = (String(picked).match(/title="([^"]+)"/) || [])[1]; if (!pn || !x.names.includes(pn)) return null;
  const pl = LG6V_PL(pn);
  return `The ${pn} ${pl ? "are" : "is"} ${LG6V_OC[x.a][pl ? 2 : 1]}, so ${pl ? "they belong" : "it belongs"}.`;
});

/* ---------- Shadow Match: two shadows in a row ---------- */
const LG6V_SH = (() => { const seen = new Set(), out = []; for (const x of [...SHADOWS, ...LG6V_LGA_SH]) if (!seen.has(x[0])) { seen.add(x[0]); out.push(x); } return out; })();
const LG6V_sho = (a, b) => `<span title="the shadows of the ${a[1]} and the ${b[1]}"><span class="emo shadow">${a[0]}</span><span class="emo shadow">${b[0]}</span></span>`;
addBank(6, "logic", "shadows", 0.4, function () {
  const [A, B, C, D] = shuffle(LG6V_SH), opts = [[A, B], [B, A], [A, C], [D, B]], map = {};
  for (const [p, r] of opts) map[LG6V_sho(p, r)] = [p[1], r[1]];
  return { q: "Which shadows match these two pictures?", say: "Which shadows match these two pictures, in the same order?", vis: `<span class="emo" style="font-size:80px">${A[0]}${B[0]}</span>`, opts: shuffle(opts).map(([p, r]) => LG6V_sho(p, r)), ans: LG6V_sho(A, B), sayAns: `the ${A[1]} shadow, then the ${B[1]} shadow`, why: `The first shadow is shaped like the ${A[1]}, and the second like the ${B[1]}.`, key: "LG6V" + A[0] + B[0], v22: { map, t: [A[1], B[1]] } };
});
whyRule(6, "logic", "shadows", (q, picked) => {
  const x = q.v22; if (!x) return null;
  const p = x.map[picked]; if (!p) return null;
  const [a, b] = x.t;
  if (p[0] === b && p[1] === a) return `Those are the right shadows, but in the other order.`;
  if (p[0] === a && p[1] !== b) return `The second shadow is shaped like ${LG6V_A(p[1])}, not ${LG6V_A(b)}.`;
  if (p[1] === b && p[0] !== a) return `The first shadow is shaped like ${LG6V_A(p[0])}, not ${LG6V_A(a)}.`;
  return null;
});

/* ---------- Shape Patterns: what is missing in the middle? ---------- */
addBank(6, "logic", "shapepat", 0.25, function () {
  const cols = shuffle(Object.keys(COLNAME)), shapes = shuffle(LSHAPES), type = pick([[0, 1], [0, 0, 1], [0, 1, 1], [0, 1, 2]]);
  const mode = R(0, 2), unit = type.map(t => [mode === 1 ? shapes[0] : shapes[t], mode === 0 ? cols[0] : cols[t]]);
  const len = R(5, 7), seq = Array.from({ length: len }, (_, i) => unit[i % unit.length]), h = R(1, len - 2), ans = seq[h];
  const cands = [[ans[0], cols[3]], [shapes[3], ans[1]], ...unit, [shapes[2], cols[2]]];
  const kf = x => x[0] + x[1], seen = new Set([kf(ans)]), opts = [ans];
  for (const c of cands) if (opts.length < 4 && !seen.has(kf(c))) { seen.add(kf(c)); opts.push(c); }
  const map = {}; for (const [n, c] of opts) map[shp(n, c, 70)] = [n, COLNAME[c]];
  const inPat = seq.filter((_, i) => i !== h).map(([n, c]) => n + "|" + COLNAME[c]);
  return { q: "What is <b>missing</b> from the pattern?", say: "One shape is missing from the pattern. Which shape goes in the empty spot?", vis: `<div class="shape-train">${seq.map(([n, c], i) => i === h ? `<span class="car q">?</span>` : shp(n, c, 50)).join("")}</div>`, opts: shuffle(opts).map(([n, c]) => shp(n, c, 70)), ans: shp(ans[0], ans[1], 70), sayAns: shpName(ans[0], ans[1]), why: `The pattern repeats: ${unit.map(([n, c]) => `${COLNAME[c]} ${n}`).join(", ")}.`, key: "LG6Vm" + seq.map(kf).join() + h, v22: { map, a: [ans[0], COLNAME[ans[1]]], inPat } };
});
whyRule(6, "logic", "shapepat", (q, picked) => {
  const x = q.v22; if (!x) return null;
  const p = x.map[picked]; if (!p) return null;
  const [an, ac] = x.a, [pn, pc] = p; if (pn === an && pc === ac) return null;
  if (pn === an) return `The shape is right, but the color is wrong. The missing one is not ${pc}.`;
  if (pc === ac) return `The color is right, but the shape is wrong. The missing one is not a ${pn}.`;
  if (x.inPat.includes(pn + "|" + pc)) return `The ${pc} ${pn} is in the pattern, but it does not go in this spot.`;
  return `There is no ${pc} ${pn} anywhere in this pattern.`;
});

/* ---------- Biggest & Smallest: three at once ---------- */
addBank(6, "logic", "sizes", 0.35, function () {
  const tiers = shuffle(range(0, LG6V_SIZE_TIERS.length - 1)).slice(0, 3), three = tiers.map(t => [...pick(LG6V_SIZE_TIERS[t]), t]).sort((a, b) => LG6V_SIZE_ALL.findIndex(x => x[1] === a[1]) - LG6V_SIZE_ALL.findIndex(x => x[1] === b[1]));
  const big = Math.random() < 0.5, ans = three.reduce((m, x) => (big ? x[2] > m[2] : x[2] < m[2]) ? x : m), w = big ? "biggest" : "smallest";
  const tier = Object.fromEntries(three.map(x => [x[1], x[2]]));
  return { q: `Which is the <b>${w}</b> in real life?`, say: `Which is the ${w} in real life: the ${three[0][1]}, the ${three[1][1]}, or the ${three[2][1]}?`, opts: shuffle(three).map(eOpt), ans: eOpt(ans), sayAns: `the ${ans[1]}`, why: `In real life, ${LG6V_A(ans[1])} is ${big ? "bigger" : "smaller"} than the other two.`, key: "LG6V" + three.map(x => x[0]).join("") + big, v22: { big, tier, a: ans[1] } };
});
whyRule(6, "logic", "sizes", (q, picked) => {
  const x = q.v22; if (!x) return null;
  const pn = (String(picked).match(/title="([^"]+)"/) || [])[1]; if (!pn || x.tier[pn] == null || pn === x.a) return null;
  return `In real life, ${LG6V_A(pn)} is ${x.big ? "smaller" : "bigger"} than ${LG6V_A(x.a)}.`;
});

/* ---------- Spot the Difference: which picture is new / gone? ---------- */
const LG6V_SD = parseSet("🐶:dog,🐱:cat,🐰:rabbit,🐻:bear,🦊:fox,🐸:frog,🐵:monkey,🐷:pig,🐮:cow,🦁:lion,🍎:apple,🍌:banana,🍇:grapes,⚽:ball,🚗:car,⭐:star,🌼:flower,🎈:balloon,🐟:fish,🧁:cupcake");
addBank(6, "logic", "spotdiff", 0.3, function () {
  const n = R(4, 5), pool = shuffle(LG6V_SD), top = pool.slice(0, n), i = R(0, n - 1), swap = pool[n], bottom = top.slice(); bottom[i] = swap;
  const vis = `<div class="diff-rows">${lineRow(top.map(x => x[0]))}${lineRow(bottom.map(x => x[0]))}</div>`, both = top.filter((_, j) => j !== i);
  if (Math.random() < 0.5) {
    return { q: "Which picture is <b>new</b> in the bottom row?", say: "Look at both rows. Which picture is new in the bottom row?", vis, opts: shuffle([swap, ...shuffle(both).slice(0, 3)]).map(eOpt), ans: eOpt(swap), sayAns: `the ${swap[1]}`, why: `In spot ${i + 1}, the ${top[i][1]} changed to the ${swap[1]}.`, key: "LG6Vn" + top.map(x => x[0]).join("") + i + swap[0], v22: { both: both.map(x => x[1]) } };
  }
  return { q: "Which picture is <b>gone</b> from the bottom row?", say: "Look at both rows. Which picture from the top row is gone from the bottom row?", vis, opts: shuffle([top[i], ...shuffle(both).slice(0, 3)]).map(eOpt), ans: eOpt(top[i]), sayAns: `the ${top[i][1]}`, why: `In spot ${i + 1}, the ${top[i][1]} was swapped for the ${swap[1]}.`, key: "LG6Vg" + top.map(x => x[0]).join("") + i + swap[0], v22: { both: both.map(x => x[1]), gone: 1 } };
});
whyRule(6, "logic", "spotdiff", (q, picked) => {
  const x = q.v22; if (!x) return null;
  const pn = (String(picked).match(/title="([^"]+)"/) || [])[1]; if (!pn || !x.both.includes(pn)) return null;
  return x.gone ? `The ${pn} ${LG6V_IS(pn)} still in the bottom row, so ${LG6V_PL(pn) ? "they are" : "it is"} not gone.` : `The ${pn} ${LG6V_IS(pn)} in both rows, so ${LG6V_PL(pn) ? "they are" : "it is"} not new.`;
});

/* ---------- Goes Together: more pairs ---------- */
// [a, b, aName, bName, tags]; pairs that share a tag never appear as each other's wrong answers.
const LG6V_PAIRS = [["🐦", "🪺", "bird", "nest", ""], ["🥣", "🥄", "bowl", "spoon", "kitchen"], ["🐑", "🧶", "sheep", "yarn", "farm"], ["🧑‍🌾", "🚜", "farmer", "tractor", "farm"], ["🧑‍🍳", "🍳", "chef", "frying pan", "kitchen"], ["🧑‍✈️", "✈️", "pilot", "airplane", ""], ["👮", "🚓", "police officer", "police car", ""], ["🧑‍🔬", "🔬", "scientist", "microscope", ""], ["📖", "🔖", "book", "bookmark", ""], ["🧽", "🍽️", "sponge", "dishes", "kitchen wash"], ["🦉", "🌙", "owl", "moon", "sky"], ["🔭", "⭐", "telescope", "stars", "sky"], ["🛷", "❄️", "sled", "snow", "snow"], ["🍼", "👶", "bottle", "baby", "milk"], ["🥽", "🏊", "goggles", "swimmer", "water snow"], ["🐄", "🥛", "cow", "milk", "farm milk"], ["🎣", "🐟", "fishing rod", "fish", "water"], ["🪣", "🏖️", "bucket", "beach", "water"], ["🚿", "🧴", "shower", "shampoo", "wash"], ["🎈", "🎉", "balloon", "party", ""], ["🧑‍💻", "💻", "coder", "laptop", ""], ["🧑‍🎨", "🖼️", "artist", "painting", ""]];
const LG6V_tagX = (p, r) => p[4] && r[4] && p[4].split(" ").some(t => r[4].split(" ").includes(t));
addBank(6, "logic", "together", 0.3, function () {
  const P = pick(LG6V_PAIRS), [a, b, an, bn] = P, flip = Math.random() < 0.5;
  const [x, xn, y, yn] = flip ? [b, bn, a, an] : [a, an, b, bn];
  const others = shuffle(LG6V_PAIRS.filter(p => p !== P && !LG6V_tagX(p, P))).slice(0, 3).map(p => flip ? [p[0], p[2], p[3]] : [p[1], p[3], p[2]]);
  const partner = Object.fromEntries(others.map(o => [o[1], o[2]]));
  return { q: `Which one goes with ${LG6V_emo(x)}?`, say: `Which one goes with the ${xn}?`, vis: `<span class="emo" style="font-size:88px">${x}</span>`, opts: shuffle([[y, yn], ...others.map(o => [o[0], o[1]])]).map(eOpt), ans: eOpt([y, yn]), sayAns: `the ${yn}`, why: `The ${xn} ${LG6V_PL(xn) ? "go" : "goes"} with the ${yn}.`, key: "LG6V" + x + flip, v22: { xn, partner } };
});
whyRule(6, "logic", "together", (q, picked) => {
  const x = q.v22; if (!x) return null;
  const pn = (String(picked).match(/title="([^"]+)"/) || [])[1], pt = pn && x.partner[pn]; if (!pt) return null;
  return `The ${pn} ${LG6V_PL(pn) ? "go" : "goes"} with the ${pt}, not with the ${x.xn}.`;
});

/* ---------- Two Rules at Once: "a ___ that is not ___" ---------- */
addBank(6, "logic", "tworules", 0.3, function () {
  const [c1, c2] = shuffle(Object.keys(COLNAME)), [s1, s2] = shuffle(LSHAPES), opts = [[s1, c2], [s1, c1], [s2, c2], [s2, c1]], map = {};
  for (const [s, c] of opts) map[shp(s, c, 64)] = [s, COLNAME[c]];
  return { q: `Find the <b>${s1}</b> that is <b>not ${COLNAME[c1]}</b>.`, say: `Find the ${s1} that is not ${COLNAME[c1]}.`, opts: shuffle(opts).map(([s, c]) => shp(s, c, 64)), ans: shp(s1, c2, 64), sayAns: `the ${COLNAME[c2]} ${s1}`, why: `It is a ${s1}, and it is ${COLNAME[c2]}, not ${COLNAME[c1]}.`, key: "LG6Vn" + s1 + c1 + s2 + c2, v22: { map, s: s1, c: COLNAME[c1] } };
});
whyRule(6, "logic", "tworules", (q, picked) => {
  const x = q.v22; if (!x) return null;
  const p = x.map[picked]; if (!p) return null;
  const [s, c] = p;
  if (s === x.s && c === x.c) return `It is a ${s}, but it is ${c}. This one must not be ${x.c}.`;
  if (s !== x.s && c === x.c) return `It is a ${s}, not a ${x.s}, and it is ${c} too.`;
  if (s !== x.s) return `It is not ${x.c}, but it is a ${s}, not a ${x.s}.`;
  return null;
});

