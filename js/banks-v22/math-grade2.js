/* =====================================================================
   v22 · Age 7 Math (tag MA7V_)
   Part A: two new topics: arrays (Rows and Columns), shares (Equal Shares)
   Part B: more questions for every existing age-7 math topic.
   New questions carry q.v22 = {...}; the wrong-answer rules below read it
   and return null for every other question.
   ===================================================================== */
const MA7V_dur = m => { const h = Math.floor(m / 60), r = m % 60; return [h ? `${h} hour${h > 1 ? "s" : ""}` : "", r ? `${r} minutes` : ""].filter(Boolean).join(" and ") || "0 minutes"; };
const MA7V_hr = h => ((h - 1 + 120) % 12) + 1;
const MA7V_mins = s => { const m = String(s).replace(/<[^>]+>/g, "").trim().match(/^(\d{1,2}):(\d{2})$/); return m ? (+m[1] % 12) * 60 + +m[2] : null; };
const MA7V_int = s => { const m = String(s).replace(/<[^>]+>/g, "").trim().match(/^-?\d+/); return m ? +m[0] : null; };
const MA7V_more = (p, a) => p > a ? "more" : "less";
const MA7V_names = n => shuffle(KIDS).slice(0, n);
const MA7V_list = a => a.length === 2 ? `${a[0]} and ${a[1]}` : `${a.slice(0, -1).join(", ")} and ${a[a.length - 1]}`;

/* =================== NEW TOPIC 1 · Rows and Columns (arrays) =================== */
function MA7V_grid(r, c, e) {
  return `<div class="ma7v-grid" role="img" aria-label="${r} rows of ${c}" style="display:inline-grid;grid-template-columns:repeat(${c},auto);gap:6px;justify-content:center;margin:0 auto">${Array.from({ length: r * c }, () => `<span class="emo" style="font-size:30px;line-height:1">${e}</span>`).join("")}</div>`;
}
const MA7V_AITEMS = [["🪑", "chairs"], ["🌷", "tulips"], ["🧁", "cupcakes"], ["🍪", "cookies"], ["🥕", "carrots"], ["⭐", "stars"], ["🍎", "apples"], ["🚗", "toy cars"], ["🥚", "eggs"], ["🌻", "sunflowers"]];
const MA7V_ACOL = ["#FF7A59", "#3D7BFF", "#1FAF6E", "#FFC93C"];
const MA7V_rep = (v, k) => Array(k).fill(v).join(" + ");
topic(7, "math", {
  id: "arrays", title: "Rows and Columns", icon: "🔲", blurb: "Count arrays by adding equal rows.",
  lesson: [
    { t: "Rows and columns", say: "An array is things lined up in rows and columns. Rows go across. Columns go up and down.", html: arrayDots(3, 4) + note("<b>3 rows</b> go across ➡️ · <b>4 columns</b> go up and down ⬇️") },
    { t: "Add the rows", say: "Each row has 4 dots, and there are 3 rows. 4 plus 4 plus 4 equals 12.", html: arrayDots(3, 4, "#3D7BFF") + eq("4 + 4 + 4 = <b>12</b>") },
    { t: "Arrays all around", say: "Egg cartons and chairs in a classroom are arrays. Count one row, then add it again for each row!", html: MA7V_grid(2, 6, "🥚") + eq("6 + 6 = <b>12</b>") },
  ],
  gen() {
    const r = R(2, 5), c = R(2, 5), n = r * c, k = R(0, 5), colr = pick(MA7V_ACOL);
    const nOpts = () => numU(n, [n + c, n - c, n + 1, n - 1, r + c], 3, 1);
    const addWhy = `${r} rows of ${c}: ${MA7V_rep(c, r)} = ${n}.`;
    if (k === 0) return { q: "How many dots are in this array?", vis: arrayDots(r, c, colr), opts: nOpts(), ans: String(n), big: 1, why: addWhy, key: "t" + r + c, v22: { f: "tot", r, c, w: "dots" } };
    if (k === 1) {
      const [e, w] = pick(MA7V_AITEMS);
      return { q: `There are ${r} rows of ${w}. Each row has ${c}. How many ${w} in all?`, vis: MA7V_grid(r, c, e), opts: nOpts(), ans: String(n), big: 1, why: addWhy, key: "w" + w + r + c, v22: { f: "tot", r, c, w } };
    }
    if (k === 2) {
      const cols = Math.random() < 0.5, a = cols ? c : r;
      return { q: `How many <b>${cols ? "columns" : "rows"}</b> does this array have?`, say: `How many ${cols ? "columns" : "rows"} does this array have?`, vis: arrayDots(r, c, colr), opts: numU(a, [cols ? r : c, a + 1, a - 1], 2, 1), ans: String(a), big: 1, why: cols ? `Columns go up and down. There are ${c} of them.` : `Rows go across. There are ${r} of them.`, key: (cols ? "c" : "r") + r + c, v22: { f: cols ? "cols" : "rows", r, c } };
    }
    if (k === 3) {
      const ans = MA7V_rep(c, r), cands = [MA7V_rep(c, r + 1), r > 2 ? MA7V_rep(c, r - 1) : MA7V_rep(c + 1, r), MA7V_rep(c + 1, r), c > 2 ? MA7V_rep(c - 1, r) : MA7V_rep(c, r + 2), `${r} + ${c}`].filter(x => x !== ans && x !== MA7V_rep(r, c));
      return { q: "Which addition adds up the <b>rows</b>?", say: "Which addition adds up the rows of this array?", vis: arrayDots(r, c, colr), opts: uniq(ans, cands), ans, big: 1, why: `Each of the ${r} rows has ${c}, so add ${c} ${r} times: ${ans} = ${n}.`, key: "a" + r + c, v22: { f: "add", r, c } };
    }
    if (k === 4) {
      const cand = [[c, r], [r, c + 1], [r + 1, c], [r - 1, c], [r, c - 1]].filter(([x, y]) => x >= 1 && y >= 1 && !(x === r && y === c));
      const opts = [[r, c], ...shuffle(cand).filter((v, i, a) => a.findIndex(w => w[0] === v[0] && w[1] === v[1]) === i).slice(0, 3)].map(([x, y]) => arrayDots(x, y, colr));
      return { q: `Which array shows <b>${r} rows of ${c}</b>?`, say: `Which array shows ${r} rows of ${c}?`, opts: shuffle(opts), ans: opts[0], sayAns: `${r} rows of ${c}`, why: `It has ${r} rows going across, with ${c} dots in each row.`, key: "p" + r + c, v22: { f: "pick", r, c } };
    }
    const [e, w] = pick(MA7V_AITEMS);
    return { q: `How many ${w} are in each <b>row</b>?`, say: `How many ${w} are in each row?`, vis: MA7V_grid(r, c, e), opts: numU(c, [r, c + 1, c - 1, n], 2, 1), ans: String(c), big: 1, why: `Each row going across has ${c} ${w}.`, key: "e" + w + r + c, v22: { f: "each", r, c, w } };
  },
});
TRICK_ADD(7, "math", "arrays", "Count how many are in one row, then add that number once for every row.");
whyRule(7, "math", "arrays", (q, picked) => {
  const x = q.v22; if (!x) return null;
  const { r, c } = x, n = r * c;
  if (x.f === "pick") {
    const m = String(picked).match(/aria-label="(\d+) rows of (\d+) dots"/); if (!m) return null;
    const pr = +m[1], pc = +m[2]; if (pr === r && pc === c) return null;
    if (pr === c && pc === r) return `That array has ${pr} rows of ${pc}. It is turned the other way.`;
    if (pr !== r) return `That array has ${pr === 1 ? "only 1 row" : pr + " rows"}, not ${r}.`;
    return `That array's rows have ${pc} dots each, not ${c}.`;
  }
  if (x.f === "add") {
    const p = xPlain(picked), parts = p.split(" + ").map(Number); if (parts.some(isNaN)) return null;
    const same = parts.every(v => v === parts[0]);
    if (parts.length === 2 && !same) return `${p} adds the number of rows to one row. Add ${c} once for each row.`;
    if (!same) return null;
    if (parts[0] !== c) return `Each row has ${c} dots, but ${p} adds ${parts[0]} each time.`;
    if (parts.length !== r) return `${p} adds ${parts.length} rows of ${c}, but this array has ${r} rows.`;
    return null;
  }
  const p = MA7V_int(picked); if (p == null) return null;
  if (x.f === "rows" || x.f === "cols") {
    const want = x.f === "rows" ? r : c; if (p === want) return null;
    if (x.f === "rows" && p === c) return `${p} is how many are in each row. Rows go across, and there are ${r}.`;
    if (x.f === "cols" && p === r) return `${p} is the number of rows. Columns go up and down, and there are ${c}.`;
    return x.f === "rows" ? `Count the lines going across: there are ${r} rows, not ${p}.` : `Count the lines going up and down: there are ${c} columns, not ${p}.`;
  }
  if (x.f === "each") {
    if (p === c) return null;
    if (p === r) return `${p} is the number of rows. Count across one row instead.`;
    if (p === n) return `${p} is all the ${x.w}. Just count one row.`;
    return `Each row going across has ${c} ${x.w}, not ${p}.`;
  }
  if (x.f === "tot") {
    if (p === n) return null;
    if (p === r + c && r + c !== n) return `${p} is ${r} + ${c}. You need to add ${c} for each of the ${r} rows.`;
    if (p === n + c) return `${p} would be ${r + 1} rows of ${c}, but there are only ${r} rows.`;
    if (p === n - c) return `${p} would be ${r - 1 === 1 ? "just 1 row" : r - 1 + " rows"} of ${c}, but there are ${r} rows.`;
    return `${MA7V_rep(c, r)} is not ${p}. It is ${Math.abs(p - n)} ${MA7V_more(n, p)}.`;
  }
  return null;
});

/* =================== NEW TOPIC 2 · Equal Shares (halves, thirds, fourths) =================== */
const MA7V_FILL = "#FFC93C";
const MA7V_lab = (shape, n, eqs, k) => `${shape} cut into ${n} ${eqs ? "equal shares" : "shares that are not equal"}${k ? `, ${k} shaded` : ""}`;
function MA7V_rect(parts, orient = "v", shade = [], colr = MA7V_FILL) {
  const W = orient === "v" ? 210 : 170, H = orient === "v" ? 120 : 150, tot = parts.reduce((a, b) => a + b, 0), eqs = parts.every(p => p === parts[0]);
  let s = svgOpen(W + 6, H + 6, MA7V_lab("rectangle", parts.length, eqs, shade.length)), at = 0;
  parts.forEach((p, i) => {
    const len = p / tot * (orient === "v" ? W : H), f = shade.includes(i) ? colr : "#FFFFFF";
    s += orient === "v" ? `<rect x="${f1(3 + at)}" y="3" width="${f1(len)}" height="${H}" fill="${f}" stroke="${INK}" stroke-width="3"/>` : `<rect x="3" y="${f1(3 + at)}" width="${W}" height="${f1(len)}" fill="${f}" stroke="${INK}" stroke-width="3"/>`;
    at += len;
  });
  return s + "</svg>";
}
function MA7V_circ(angles, shade = [], colr = MA7V_FILL, S = 150) {
  const c = S / 2, r = c - 6, eqs = angles.every(a => a === angles[0]);
  let s = svgOpen(S, S, MA7V_lab("circle", angles.length, eqs, shade.length)), at = -90;
  angles.forEach((a, i) => {
    const a1 = at * Math.PI / 180, a2 = (at + a) * Math.PI / 180;
    s += `<path d="M${c},${c} L${f1(c + r * Math.cos(a1))},${f1(c + r * Math.sin(a1))} A${r},${r} 0 ${a > 180 ? 1 : 0} 1 ${f1(c + r * Math.cos(a2))},${f1(c + r * Math.sin(a2))} Z" fill="${shade.includes(i) ? colr : "#FFFFFF"}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>`;
    at += a;
  });
  return s + "</svg>";
}
function MA7V_sq(kind, shade = [], colr = MA7V_FILL) {
  const S = 140, o = 3, e = o + S, m = o + S / 2, n = kind === "diag2" ? 2 : 4;
  const polys = kind === "grid" ? [[[o, o], [m, o], [m, m], [o, m]], [[m, o], [e, o], [e, m], [m, m]], [[o, m], [m, m], [m, e], [o, e]], [[m, m], [e, m], [e, e], [m, e]]]
    : kind === "diag2" ? [[[o, o], [e, o], [e, e]], [[o, o], [e, e], [o, e]]]
      : [[[o, o], [e, o], [m, m]], [[e, o], [e, e], [m, m]], [[e, e], [o, e], [m, m]], [[o, e], [o, o], [m, m]]];
  let s = svgOpen(S + 6, S + 6, MA7V_lab("square", n, true, shade.length));
  polys.forEach((p, i) => { s += `<polygon points="${p.map(v => v.join(",")).join(" ")}" fill="${shade.includes(i) ? colr : "#FFFFFF"}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>`; });
  return s + "</svg>";
}
const MA7V_eqA = n => Array(n).fill(360 / n);
const MA7V_UNEQ_R = { 2: [[1, 2], [1, 3], [2, 3], [1, 4]], 3: [[1, 1, 2], [1, 2, 1], [2, 1, 1], [1, 2, 3], [1, 1, 3]], 4: [[1, 1, 1, 2], [1, 2, 1, 2], [2, 1, 1, 1], [1, 1, 2, 3], [1, 2, 2, 1]] };
const MA7V_UNEQ_C = { 2: [[90, 270], [120, 240]], 3: [[90, 90, 180], [60, 120, 180], [60, 60, 240]], 4: [[60, 120, 60, 120], [45, 45, 90, 180]] };
const MA7V_WORD = { 2: ["half", "halves"], 3: ["third", "thirds"], 4: ["fourth", "fourths"] };
const MA7V_NUM = { half: 2, halves: 2, third: 3, thirds: 3, fourth: 4, fourths: 4 };
const MA7V_FOODS = ["pizza", "sandwich", "pancake", "cake", "pie", "tortilla", "waffle", "pan of cornbread", "granola bar", "melon"];
const MA7V_FOODP = { sandwich: "sandwiches", "pan of cornbread": "pans of cornbread" };
/* an equal shape with n shares: [kind, n, svg-builder(shade)] */
function MA7V_equalShape(n) {
  const opts = [["rv", s => MA7V_rect(Array(n).fill(1), "v", s)], ["rh", s => MA7V_rect(Array(n).fill(1), "h", s)], ["c", s => MA7V_circ(MA7V_eqA(n), s)]];
  if (n === 4) opts.push(["g", s => MA7V_sq("grid", s)], ["d4", s => MA7V_sq("diag4", s)]);
  if (n === 2) opts.push(["d2", s => MA7V_sq("diag2", s)]);
  return pick(opts);
}
function MA7V_unequalShape(n) {
  const opts = [];
  MA7V_UNEQ_R[n].forEach((p, i) => { opts.push(["urv" + i, s => MA7V_rect(p, "v", s)], ["urh" + i, s => MA7V_rect(p, "h", s)]); });
  MA7V_UNEQ_C[n].forEach((a, i) => opts.push(["uc" + i, s => MA7V_circ(a, s)]));
  return pick(opts);
}
topic(7, "math", {
  id: "shares", title: "Equal Shares", icon: "🍕", blurb: "Halves, thirds and fourths of a shape.",
  lesson: [
    { t: "Equal shares", say: "Equal shares are pieces that are all the same size. The first sandwich is cut into 2 equal shares. The second one is not fair!", html: `<div class="shape-row"><figure>${MA7V_rect([1, 1], "v", [], MA7V_FILL)}<figcaption>✔ <b>equal</b> shares</figcaption></figure><figure>${MA7V_rect([1, 3], "v")}<figcaption>✘ <b>not equal</b></figcaption></figure></div>` },
    { t: "Halves, thirds, fourths", say: "2 equal shares are called halves. 3 equal shares are thirds. 4 equal shares are fourths.", html: `<div class="shape-row">${[2, 3, 4].map(n => `<figure>${MA7V_circ(MA7V_eqA(n), [0], MA7V_FILL, 110)}<figcaption><b>${MA7V_WORD[n][1]}</b><br>one ${MA7V_WORD[n][0]} shaded</figcaption></figure>`).join("")}</div>` },
    { t: "More shares, smaller pieces", say: "The more equal shares you cut, the smaller each piece gets. One half of a pizza is bigger than one fourth of the same pizza.", html: row(MA7V_circ(MA7V_eqA(2), [0], "#FF7A59", 120), MA7V_circ(MA7V_eqA(4), [0], "#FF7A59", 120)) + eq("one half is bigger than one fourth") },
  ],
  gen() {
    const k = R(0, 6), n = R(2, 4);
    if (k === 0) {
      const isEq = Math.random() < 0.45, [kind, mk] = isEq ? MA7V_equalShape(n) : MA7V_unequalShape(n);
      return { q: "Is this shape cut into <b>equal shares</b>?", say: "Is this shape cut into equal shares?", vis: mk([]), opts: ["Yes", "No"], ans: isEq ? "Yes" : "No", big: 1, why: isEq ? `${n === 2 ? "Both" : "All " + n} shares are the same size, so they are equal shares.` : "Some shares are bigger than others, so they are not equal shares.", key: "y" + kind + n, v22: { f: "yn", n, eq: isEq } };
    }
    if (k === 1) {
      const [kind, mk] = MA7V_equalShape(n), i = R(0, n - 1), ans = "one " + MA7V_WORD[n][0];
      return { q: "The shape is cut into equal shares. What part is <b>shaded</b>?", say: "The shape is cut into equal shares. What part is shaded?", vis: mk([i]), opts: ["one half", "one third", "one fourth"], ans, big: 1, why: `There are ${n} equal shares and 1 is shaded, so it is ${ans}.`, key: "s" + kind + n + i, v22: { f: "part", n } };
    }
    if (k === 2) {
      const [kind, mk] = MA7V_equalShape(n), ans = MA7V_WORD[n][1];
      return { q: "What do we call these equal shares?", vis: mk([]), opts: ["halves", "thirds", "fourths"], ans, big: 1, why: `${n} equal shares are called ${ans}.`, key: "n" + kind + n, v22: { f: "part", n } };
    }
    if (k === 3) {
      const kinds = ["rv", "rh", "c"], kd = pick(kinds), mkE = m => kd === "c" ? MA7V_circ(MA7V_eqA(m)) : MA7V_rect(Array(m).fill(1), kd === "rv" ? "v" : "h");
      const uList = kd === "c" ? MA7V_UNEQ_C[n] : MA7V_UNEQ_R[n], ui = R(0, uList.length - 1), un = kd === "c" ? MA7V_circ(uList[ui]) : MA7V_rect(uList[ui], kd === "rv" ? "v" : "h");
      const opts = [mkE(n), ...[2, 3, 4].filter(m => m !== n).map(mkE), un];
      return { q: `Which shape is cut into <b>${MA7V_WORD[n][1]}</b>?`, say: `Which shape is cut into ${MA7V_WORD[n][1]}?`, opts: shuffle(opts), ans: opts[0], sayAns: `the one with ${n} equal shares`, why: `${cap(MA7V_WORD[n][1])} means ${n} equal shares, all the same size.`, key: "w" + n + kd + ui, v22: { f: "pick", n } };
    }
    if (k === 4) {
      const who = pick(KIDS), food = pick(MA7V_FOODS), ans = "one " + MA7V_WORD[n][0];
      return { q: `${who} cuts a ${food} into ${n} equal pieces. What is each piece called?`, opts: ["one half", "one third", "one fourth"], ans, big: 1, why: `${n} equal pieces are ${MA7V_WORD[n][1]}, so each piece is ${ans}.`, key: "c" + who + food + n, v22: { f: "word", n, how: "cut" } };
    }
    if (k === 5) {
      const ppl = MA7V_names(n), food = pick(MA7V_FOODS), ans = "one " + MA7V_WORD[n][0];
      return { q: `${MA7V_list(ppl)} share a ${food} equally. How much does each one get?`, opts: ["one half", "one third", "one fourth"], ans, big: 1, why: `${n} people sharing equally means ${n} equal shares, so each gets ${ans}.`, key: "f" + ppl.join() + food, v22: { f: "word", n, how: "share" } };
    }
    if (Math.random() < 0.35) {
      const ans = String(n);
      return { q: `How many <b>${MA7V_WORD[n][1]}</b> make one whole?`, say: `How many ${MA7V_WORD[n][1]} make one whole?`, vis: MA7V_circ(MA7V_eqA(n), range(0, n - 1)), opts: ["1", "2", "3", "4"], ans, big: 1, why: `One whole cut into ${MA7V_WORD[n][1]} has ${n} equal pieces.`, key: "h" + n, v22: { f: "whole", n } };
    }
    let a = R(2, 4), b = R(2, 4); while (b === a) b = R(2, 4);
    const food = pick(MA7V_FOODS), oa = `the one cut into ${MA7V_WORD[a][1]}`, ob = `the one cut into ${MA7V_WORD[b][1]}`, same = "they are the same size", big = a < b ? oa : ob;
    return { q: `Two ${MA7V_FOODP[food] || food + "s"} are the same size. One is cut into ${MA7V_WORD[a][1]}. One is cut into ${MA7V_WORD[b][1]}. Which has <b>bigger</b> pieces?`, opts: [oa, ob, same], ans: big, why: `${cap(MA7V_WORD[Math.min(a, b)][1])} are bigger, because fewer equal pieces means each piece is bigger.`, key: "b" + food + a + b, v22: { f: "cmp", a, b } };
  },
});
TRICK_ADD(7, "math", "shares", "First check that every piece is the same size. Then count them: 2 is halves, 3 is thirds, 4 is fourths.");
whyRule(7, "math", "shares", (q, picked) => {
  const x = q.v22; if (!x) return null;
  const p = xPlain(picked), n = x.n;
  if (x.f === "yn") {
    if (p === "Yes" && !x.eq) return "Some of the shares are bigger than others, so they aren't equal.";
    if (p === "No" && x.eq) return `${n === 2 ? "Both" : "All " + n} shares are the same size, so they are equal.`;
    return null;
  }
  if (x.f === "pick") {
    const m = String(picked).match(/aria-label="\w+ cut into (\d+) (equal shares|shares that are not equal)"/); if (!m) return null;
    const k = +m[1];
    if (m[2] !== "equal shares") return `That shape has ${k} pieces, but they are not all the same size.`;
    return k === n ? null : `That shape is cut into ${MA7V_WORD[k][1]}: ${k} equal shares, not ${n}.`;
  }
  if (x.f === "part" || x.f === "word") {
    const w = p.replace(/^one /, ""), k = MA7V_NUM[w]; if (!k || k === n) return null;
    const unit = /^one /.test(p) ? `One ${w} is 1 of ${k} equal shares` : `${cap(w)} means ${k} equal shares`;
    if (x.f === "word" && x.how === "share") return `${cap(p)} would be for ${k} people, but ${n} people share it here.`;
    if (x.f === "word") return `${unit}, but this is cut into ${n} pieces.`;
    return `${unit}, but this shape has ${n} equal shares.`;
  }
  if (x.f === "whole") {
    const k = MA7V_int(picked); if (k == null || k === n) return null;
    return k < n ? `${k} ${k === 1 ? MA7V_WORD[n][0] : MA7V_WORD[n][1]} is less than one whole. A whole has ${n}.` : `${k} ${MA7V_WORD[n][1]} is more than one whole. A whole has ${n}.`;
  }
  if (x.f === "cmp") {
    if (p === "they are the same size") return `${x.a} equal pieces and ${x.b} equal pieces of the same size can't be the same size.`;
    const m = p.match(/cut into (\w+)$/); if (!m) return null; const k = MA7V_NUM[m[1]]; if (k === Math.min(x.a, x.b)) return null;
    return `${cap(m[1])} are smaller, because that one is cut into more pieces.`;
  }
  return null;
});

/* =================== PART B · more questions for existing topics =================== */

/* ---------- Tens and Ones ---------- */
addBank(7, "math", "place", 0.35, () => {
  const k = R(0, 3);
  if (k <= 1) {
    let n = R(10, 99), t = Math.floor(n / 10), o = n % 10;
    if (k === 1) while (o === 0) { n = R(10, 99); t = Math.floor(n / 10); o = n % 10; }
    const txt = k === 0 ? `${t} tens and ${o} ones` : `${o} ${o === 1 ? "one" : "ones"} and ${t} ${t === 1 ? "ten" : "tens"}`;
    return { q: `What number is <b>${txt}</b>?`, say: `What number is ${txt}?`, opts: numU(n, [o * 10 + t, t + o, t * 10, n + 1, n - 1], 5, 1), ans: String(n), big: 1, why: `${t} tens is ${t * 10}, and ${o} more ${o === 1 ? "one makes" : "ones make"} ${n}.`, key: "pt" + k + n, v22: { f: "build", n, t, o } };
  }
  if (k === 2) {
    let n, t, o; do { n = R(12, 98); t = Math.floor(n / 10); o = n % 10; } while (o === 0 || o === t);
    const ans = `${t * 10} + ${o}`;
    return { q: `Which is the same as <b>${n}</b>?`, say: `Which is the same as ${n}?`, vis: `<div class="digits"><span class="d-t">${t}</span><span class="d-o">${o}</span></div>`, opts: uniq(ans, [`${t} + ${o}`, `${o * 10} + ${t}`, `${t * 10} + ${o * 10}`]), ans, big: 1, why: `${n} is ${t} tens and ${o} ones: ${t * 10} + ${o}.`, key: "px" + n, v22: { f: "exp", n } };
  }
  const more = Math.random() < 0.5, n = more ? R(10, 89) : R(20, 99), a = more ? n + 10 : n - 10;
  return { q: `What is <b>10 ${more ? "more" : "less"}</b> than ${n}?`, say: `What is 10 ${more ? "more" : "less"} than ${n}?`, vis: blocks(Math.floor(n / 10), n % 10), opts: numU(a, [more ? n - 10 : n + 10, more ? n + 1 : n - 1, n, a + 1], 2, 0), ans: String(a), big: 1, why: `10 ${more ? "more" : "less"} means one ${more ? "more" : "less"} ten: ${n} ${more ? "+" : "−"} 10 = ${a}.`, key: "p10" + more + n, v22: { f: "ten", n, more } };
});
whyRule(7, "math", "place", (q, picked) => {
  const x = q.v22; if (!x) return null;
  if (x.f === "exp") {
    const m = xPlain(picked).match(/^(\d+) \+ (\d+)$/); if (!m) return null; const s = +m[1] + +m[2]; if (s === x.n) return null;
    return `${m[1]} + ${m[2]} = ${s}, not ${x.n}.`;
  }
  const p = MA7V_int(picked); if (p == null) return null;
  if (x.f === "build") {
    if (p === x.n) return null;
    if (p === x.o * 10 + x.t) return `${p} has the digits switched: it is ${x.o} tens and ${x.t} ones.`;
    if (p === x.t + x.o) return `${p} is ${x.t} + ${x.o}. Each ten is worth 10, not 1.`;
    if (p === x.t * 10) return `${p} is just the tens. Don't forget the ${x.o} ones.`;
    return `${p} is ${Math.floor(p / 10)} tens and ${p % 10} ones.`;
  }
  if (x.f === "ten") {
    const a = x.more ? x.n + 10 : x.n - 10; if (p === a) return null;
    if (p === x.n) return `${p} is the number we started with. It needs to change by 10.`;
    if (Math.abs(p - x.n) === 10) return `${p} is 10 ${x.more ? "less" : "more"} than ${x.n}, not 10 ${x.more ? "more" : "less"}.`;
    return `${p} is ${Math.abs(p - x.n)} ${MA7V_more(p, x.n)} than ${x.n}, not 10 ${x.more ? "more" : "less"}.`;
  }
  return null;
});

/* ---------- Adding / subtracting to 100: word problems ---------- */
const MA7V_STUFF = ["stickers", "marbles", "beads", "shells", "crayons", "cards", "stamps", "blocks", "buttons", "leaves"];
function MA7V_numRule(x, p) {
  const { a, b, ans } = x; if (p === ans) return null;
  const d = Math.abs(p - ans), sym = x.op === "+" ? "+" : "−";
  if (x.slip != null && p === x.slip && x.slip !== ans) return x.op === "+" ? `${p} forgets to carry the ten when the ones add up to more than 9.` : `${p} takes the small ones digit from the big one. You need to borrow a ten first.`;
  if (x.op === "-" && p === a) return `${p} is how many there were at the start. Take away the ${b}.`;
  if (d === 10) return `${p} is 10 ${MA7V_more(p, ans)} than ${a} ${sym} ${b}. Check the tens again.`;
  if (d === 1) return `${p} is 1 ${MA7V_more(p, ans)} than ${a} ${sym} ${b}. Check the ones again.`;
  return `${p} is ${d} ${MA7V_more(p, ans)} than ${a} ${sym} ${b}.`;
}
addBank(7, "math", "add100", 0.3, () => {
  const a = R(12, 80), b = R(10, 99 - a), s = a + b, th = pick(MA7V_STUFF), [n1, n2] = MA7V_names(2), k = R(0, 2);
  const slip = (Math.floor(a / 10) + Math.floor(b / 10)) * 10 + (a % 10 + b % 10) % 10;
  const q = k === 0 ? `${n1} has ${a} ${th}. ${n1} gets ${b} more. How many ${th} does ${n1} have now?`
    : k === 1 ? `${n1} has ${a} ${th} and ${n2} has ${b} ${th}. How many ${th} do they have in all?`
      : `${a} kids ride the first bus and ${b} kids ride the second bus. How many kids ride in all?`;
  return { q, opts: numU(s, [slip, s + 10, s - 10, s + 1, s - 1], 4, 0), ans: String(s), big: 1, why: `Put them together: ${a} + ${b} = ${s}.`, key: "w" + k + n1 + th + a + "+" + b, v22: { f: "num", op: "+", a, b, ans: s, slip } };
});
whyRule(7, "math", "add100", (q, picked) => { const p = MA7V_int(picked); return q.v22 && p != null ? MA7V_numRule(q.v22, p) : null; });
addBank(7, "math", "sub100", 0.3, () => {
  const a = R(30, 99), b = R(10, a - 5), d = a - b, th = pick(MA7V_STUFF), n1 = pick(KIDS), k = R(0, 2);
  const slip = (Math.floor(a / 10) - Math.floor(b / 10)) * 10 + Math.abs(a % 10 - b % 10);
  const q = k === 0 ? `${n1} has ${a} ${th}. ${n1} gives away ${b} of them. How many ${th} are left?`
    : k === 1 ? `There are ${a} birds on a fence. ${b} birds fly away. How many birds are still on the fence?`
      : `A book has ${a} pages. ${n1} has read ${b} pages. How many pages are left to read?`;
  return { q, opts: numU(d, [slip, d + 10, d - 10, d + 1, d - 1], 4, 0), ans: String(d), big: 1, why: `Take away: ${a} − ${b} = ${d}.`, key: "w" + k + n1 + th + a + "-" + b, v22: { f: "num", op: "-", a, b, ans: d, slip } };
});
whyRule(7, "math", "sub100", (q, picked) => { const p = MA7V_int(picked); return q.v22 && p != null ? MA7V_numRule(q.v22, p) : null; });

/* ---------- Half past: before, and reading the hands ---------- */
addBank(7, "math", "halfhour", 0.35, () => {
  const h = R(1, 12), m = pick([0, 30]), t = `${h}:${pad2(m)}`, nx = MA7V_hr(h + 1), pv = MA7V_hr(h - 1), k = R(0, 3);
  if (k === 0) {
    const a = m ? `${h}:00` : `${pv}:30`;
    return { q: `The clock shows ${t}. What time was it <b>30 minutes before</b>?`, say: `The clock shows ${t}. What time was it 30 minutes before?`, vis: clock(h, m), opts: uniq(a, m ? [`${nx}:00`, `${pv}:30`, t] : [`${h}:30`, `${pv}:00`, t]), ans: a, big: 1, why: m ? `30 minutes before half past ${h} is ${h} o'clock, so it was ${a}.` : `30 minutes before ${h} o'clock is half past ${pv}, so it was ${a}.`, key: "vb" + t, v22: { f: "before", t, d: 30 } };
  }
  if (k === 1) {
    const a = `${pv}:${pad2(m)}`;
    return { q: `The clock shows ${t}. What time was it <b>1 hour before</b>?`, say: `The clock shows ${t}. What time was it 1 hour before?`, vis: clock(h, m), opts: uniq(a, [`${nx}:${pad2(m)}`, `${h}:${pad2(30 - m)}`, t]), ans: a, big: 1, why: `1 hour before, the hour goes back from ${h} to ${pv}, and the minutes stay :${pad2(m)}. It was ${a}.`, key: "vh" + t, v22: { f: "before", t, d: 60 } };
  }
  if (k === 2) {
    const a = `${h}:30`;
    return { q: `The long hand points to <b>6</b>. The short hand is between <b>${h}</b> and <b>${nx}</b>. What time is it?`, say: `The long hand points to 6. The short hand is between ${h} and ${nx}. What time is it?`, opts: uniq(a, [`${nx}:30`, `${h}:00`, `${pv}:30`]), ans: a, big: 1, why: `Long hand on 6 means half past. The short hand has just passed ${h}, so it is ${a}.`, key: "vs" + h, v22: { f: "hands", h, m: 30 } };
  }
  const a = `${h}:00`;
  return { q: `The long hand points to <b>12</b>. The short hand points to <b>${h}</b>. What time is it?`, say: `The long hand points to 12. The short hand points to ${h}. What time is it?`, opts: uniq(a, [`${h}:30`, `${pv}:00`, `${nx}:00`]), ans: a, big: 1, why: `Long hand on 12 means o'clock, and the short hand shows the hour: ${a}.`, key: "vo" + h, v22: { f: "hands", h, m: 0 } };
});
whyRule(7, "math", "halfhour", (q, picked) => {
  const x = q.v22; if (!x) return null;
  const p = xPlain(picked), pm = MA7V_mins(p); if (pm == null) return null;
  if (x.f === "before") {
    const s = MA7V_mins(x.t), back = ((s - pm) % 720 + 720) % 720; if (back === x.d) return null;
    if (back === 0) return `${p} is the time on the clock now, not earlier.`;
    if (back > 360) return `${p} is ${MA7V_dur(720 - back)} after ${x.t}, not before it.`;
    return `${p} is ${MA7V_dur(back)} before ${x.t}, not ${x.d === 30 ? "30 minutes" : "1 hour"}.`;
  }
  if (x.f === "hands") {
    const ph = Math.floor(pm / 60) || 12, pmin = pm % 60; if (ph === x.h && pmin === x.m) return null;
    if (pmin !== x.m) return pmin === 30 ? `At ${p} the long hand points to 6, not 12.` : `At ${p} the long hand points to 12, not 6.`;
    return x.m === 30 ? `At ${p} the short hand is between ${ph} and ${MA7V_hr(ph + 1)}, not between ${x.h} and ${MA7V_hr(x.h + 1)}.` : `At ${p} the short hand points to ${ph}, not ${x.h}.`;
  }
  return null;
});

/* ---------- Counting coins ---------- */
const MA7V_CN = { q: ["quarter", "quarters", 25], d: ["dime", "dimes", 10], n: ["nickel", "nickels", 5], p: ["penny", "pennies", 1] };
const MA7V_cstr = (c, k) => `${k} ${k === 1 ? MA7V_CN[c][0] : MA7V_CN[c][1]}`;
const MA7V_SETS = [["d", "p"], ["n", "p"], ["d", "n"], ["q", "p"], ["q", "n"], ["q", "d"]];
const MA7V_combo = () => { const [c1, c2] = pick(MA7V_SETS), k1 = R(1, c1 === "q" ? 2 : 4), k2 = R(1, c2 === "q" ? 2 : 4); return { c1, c2, k1, k2, v: k1 * MA7V_CN[c1][2] + k2 * MA7V_CN[c2][2] }; };
const MA7V_cpick = cb => `${MA7V_cstr(cb.c1, cb.k1)} and ${MA7V_cstr(cb.c2, cb.k2)}`;
addBank(7, "math", "money", 0.4, () => {
  const k = R(0, 2);
  if (k === 0) {
    const c = pick(["n", "d", "d", "n", "q"]), n = c === "q" ? R(2, 3) : R(2, 9), v = n * MA7V_CN[c][2];
    return { q: `How many cents are <b>${MA7V_cstr(c, n)}</b>?`, say: `How many cents are ${MA7V_cstr(c, n)}?`, vis: coinRow(Array(n).fill(c)), opts: numU(v, [n, v + MA7V_CN[c][2], v - MA7V_CN[c][2], v + 1], 5, 1).map(x => x + "¢"), ans: v + "¢", big: 1, why: `Count by ${MA7V_CN[c][2]}s ${n} times: ${range(1, n).map(i => i * MA7V_CN[c][2]).join(", ")}. That is ${v}¢.`, key: "mc" + c + n, v22: { f: "same", c, n, v } };
  }
  if (k === 1) {
    let cb; do { cb = MA7V_combo(); } while (cb.v > 99);
    const who = pick(KIDS), cnt = cb.k1 + cb.k2;
    return { q: `${who} has ${MA7V_cpick(cb)}. How much money does ${who} have?`, opts: numU(cb.v, [cnt, cb.v + MA7V_CN[cb.c2][2], cb.v - MA7V_CN[cb.c2][2], cb.v + 5, cb.v - 1], 5, 1).map(x => x + "¢"), ans: cb.v + "¢", big: 1, why: `${MA7V_cstr(cb.c1, cb.k1)} is ${cb.k1 * MA7V_CN[cb.c1][2]}¢ and ${MA7V_cstr(cb.c2, cb.k2)} is ${cb.k2 * MA7V_CN[cb.c2][2]}¢. Together that is ${cb.v}¢.`, key: "mw" + who + MA7V_cpick(cb), v22: { f: "has", v: cb.v, cnt } };
  }
  let cb; do { cb = MA7V_combo(); } while (cb.v > 99);
  const ds = [], seen = new Set([cb.v]); let g = 0;
  while (ds.length < 3 && g++ < 200) { const d = MA7V_combo(); if (d.v <= 99 && !seen.has(d.v)) { seen.add(d.v); ds.push(d); } }
  const ans = MA7V_cpick(cb);
  return { q: `Which coins make <b>${cb.v}¢</b>?`, say: `Which coins make ${cb.v} cents?`, opts: shuffle([ans, ...ds.map(MA7V_cpick)]), ans, why: `${MA7V_cstr(cb.c1, cb.k1)} is ${cb.k1 * MA7V_CN[cb.c1][2]}¢ and ${MA7V_cstr(cb.c2, cb.k2)} is ${cb.k2 * MA7V_CN[cb.c2][2]}¢: ${cb.v}¢ in all.`, key: "mm" + ans, v22: { f: "make", v: cb.v } };
});
whyRule(7, "math", "money", (q, picked) => {
  const x = q.v22; if (!x) return null;
  if (x.f === "make") {
    const m = xPlain(picked).match(/^(\d+) (\w+) and (\d+) (\w+)$/); if (!m) return null;
    const val = w => { for (const v of Object.values(MA7V_CN)) if (v[0] === w || v[1] === w) return v[2]; return null; };
    const a = val(m[2]), b = val(m[4]); if (a == null || b == null) return null; const t = +m[1] * a + +m[3] * b; if (t === x.v) return null;
    return `${xPlain(picked)} make ${t}¢, not ${x.v}¢.`;
  }
  const p = MA7V_int(picked); if (p == null || p === x.v) return null;
  if (x.f === "same") {
    if (p === x.n) return `${p}¢ just counts the coins. Each ${MA7V_CN[x.c][0]} is worth ${MA7V_CN[x.c][2]}¢.`;
    return `${p}¢ is ${Math.abs(p - x.v)}¢ ${MA7V_more(p, x.v)} than ${MA7V_cstr(x.c, x.n)} are worth.`;
  }
  if (x.f === "has") {
    if (p === x.cnt) return `${p}¢ just counts the coins. Add up what each coin is worth.`;
    return `${p}¢ is ${Math.abs(p - x.v)}¢ ${MA7V_more(p, x.v)} than those coins are worth.`;
  }
  return null;
});

/* ---------- Skip counting ---------- */
addBank(7, "math", "skip", 0.35, () => {
  if (Math.random() < 0.65) {
    let s; do { s = R(1, 59); } while (s % 10 === 0);
    const seq = range(0, 4).map(i => s + 10 * i), bi = R(1, 4), ans = seq[bi];
    return { q: `Count by <b>10s</b> starting at ${s}. What number is missing?`, say: `Count by 10s starting at ${s}. What number is missing?`, vis: train(seq.map((v, i) => i === bi ? "?" : v)), opts: numU(ans, [ans + 1, ans - 1, ans + 10, ans - 10, s + bi], 3, 0), ans: String(ans), big: 1, why: `Counting by 10s, only the tens change: ${seq.join(", ")}.`, key: "k10" + s + bi, v22: { f: "ten", s, ans } };
  }
  const step = pick([5, 10]), ans = step * R(1, step === 5 ? 20 : 10), cands = new Set();
  let g = 0; while (cands.size < 3 && g++ < 100) { const v = ans + R(-9, 9); if (v > 0 && v % step !== 0 && (step === 10 ? v % 5 !== 0 : true)) cands.add(v); }
  return { q: `Which number do you say when you count by <b>${step}s</b>?`, say: `Which number do you say when you count by ${step}s?`, opts: shuffle([ans, ...cands]).map(String), ans: String(ans), big: 1, why: step === 5 ? `Counting by 5s, every number ends in 0 or 5, like ${ans}.` : `Counting by 10s, every number ends in 0, like ${ans}.`, key: "ks" + step + ans, v22: { f: "say", step } };
});
whyRule(7, "math", "skip", (q, picked) => {
  const x = q.v22; if (!x) return null;
  const p = MA7V_int(picked); if (p == null) return null;
  if (x.f === "say") return p % x.step === 0 ? null : `${p} ends in ${p % 10}, so you skip it when you count by ${x.step}s.`;
  if (x.f === "ten") {
    if (p === x.ans) return null;
    if (p % 10 !== x.s % 10) return `Counting by 10s from ${x.s}, every number ends in ${x.s % 10}, but ${p} ends in ${p % 10}.`;
    const j = Math.abs(p - x.ans) / 10;
    return `${p} is ${j} ${j === 1 ? "jump" : "jumps"} of 10 too ${p > x.ans ? "far" : "early"} for that spot.`;
  }
  return null;
});

/* ---------- Even & odd ---------- */
const MA7V_EOT = [["🐞", "ladybugs"], ["🍓", "strawberries"], ["⭐", "stars"], ["🐟", "fish"], ["🌼", "flowers"], ["🍩", "donuts"], ["🐣", "chicks"], ["🎈", "balloons"]];
addBank(7, "math", "evenodd", 0.35, () => {
  if (Math.random() < 0.6) {
    const n = R(3, 20), [e, w] = pick(MA7V_EOT), ev = n % 2 === 0;
    return { q: `Count the ${w}. Is there an <b>even</b> or an <b>odd</b> number?`, say: `Count the ${w}. Is there an even or an odd number?`, vis: grp(n, e), opts: ["even", "odd"], ans: ev ? "even" : "odd", big: 1, why: ev ? `There are ${n}. They make ${n / 2} pairs with none left over, so ${n} is even.` : `There are ${n}. When you make pairs, 1 is left over, so ${n} is odd.`, key: "eg" + w + n, v22: { f: "grp", n, w } };
  }
  const n = R(21, 60), left = n % 2;
  return { q: `${n} kids line up in pairs. How many kids are left without a partner?`, opts: ["0", "1", "2"], ans: String(left), big: 1, why: left ? `${n} is odd: it ends in ${n % 10}, so 1 kid is left over.` : `${n} is even: it ends in ${n % 10}, so every kid has a partner.`, key: "el" + n, v22: { f: "left", n } };
});
whyRule(7, "math", "evenodd", (q, picked) => {
  const x = q.v22; if (!x) return null;
  const p = xPlain(picked), n = x.n, ev = n % 2 === 0;
  if (x.f === "grp") {
    if (p === "even" && !ev) return `Pair up the ${n} ${x.w}: 1 is left without a partner, so it isn't even.`;
    if (p === "odd" && ev) return `The ${n} ${x.w} make ${n / 2} pairs with none left over, so it isn't odd.`;
    return null;
  }
  if (x.f === "left") {
    if (p === "2") return "If 2 kids were left over, they could make one more pair.";
    if (p === "0" && !ev) return `${n} ends in ${n % 10}, so it is odd and 1 kid has no partner.`;
    if (p === "1" && ev) return `${n} ends in ${n % 10}, so it is even and every kid has a partner.`;
  }
  return null;
});

/* ---------- Missing numbers ---------- */
addBank(7, "math", "missing", 0.35, () => {
  if (Math.random() < 0.55) {
    const a = R(20, 70), b = R(2, 29), c = a + b;
    return { q: "What number is missing?", say: `${a} plus what equals ${c}?`, vis: eq(`${a} + ${blank()} = ${c}`), opts: numU(b, [b + 1, b - 1, b + 10, b - 10, c], 3, 0), ans: String(b), big: 1, why: `${c} − ${a} = ${b}, so ${a} + ${b} = ${c}.`, key: "ma" + a + c, v22: { f: "add", a, c } };
  }
  const b = R(2, 9), d = R(1, 11), a = b + d;
  return { q: "What number is missing?", say: `What minus ${b} equals ${d}?`, vis: eq(`${blank()} − ${b} = ${d}`), opts: numU(a, [Math.abs(d - b), a + 1, a - 1, d, b], 3, 0), ans: String(a), big: 1, why: `Add back: ${d} + ${b} = ${a}, so ${a} − ${b} = ${d}.`, key: "ms" + b + d, v22: { f: "sub", b, d } };
});
whyRule(7, "math", "missing", (q, picked) => {
  const x = q.v22; if (!x) return null;
  const p = MA7V_int(picked); if (p == null) return null;
  if (x.f === "add") return x.a + p === x.c ? null : `${x.a} + ${p} = ${x.a + p}, not ${x.c}.`;
  if (x.f === "sub") { if (p - x.b === x.d) return null; return p < x.b ? `${p} is less than ${x.b}, so ${p} − ${x.b} can't make ${x.d}.` : `${p} − ${x.b} = ${p - x.b}, not ${x.d}.`; }
  return null;
});

/* ---------- Measuring length ---------- */
const MA7V_ROPES = ["ribbon", "string", "piece of yarn", "jump rope", "paper strip"];
const MA7V_UNIT = [["a crayon", "centimeters"], ["an eraser", "centimeters"], ["a paper clip", "centimeters"], ["a spoon", "centimeters"], ["a leaf", "centimeters"], ["a toothbrush", "centimeters"], ["a book", "centimeters"], ["a cupcake", "centimeters"], ["a ladybug", "centimeters"], ["a key", "centimeters"],
  ["a school hallway", "meters"], ["a soccer field", "meters"], ["a swimming pool", "meters"], ["a school bus", "meters"], ["a playground", "meters"], ["a basketball court", "meters"], ["a classroom", "meters"], ["a long train", "meters"], ["a running track", "meters"], ["a big whale", "meters"]];
addBank(7, "math", "measure", 0.3, () => {
  const k = R(0, 4);
  if (k <= 1) {
    const [A, B] = shuffle(MEASURE).slice(0, 2), x = R(5, 20), y = R(2, x - 1), d = x - y;
    return { q: `The ${A[1]} is ${x} cm long. The ${B[1]} is ${y} cm long. How much longer is the ${A[1]}?`, vis: row(bigEmo(A[0]), bigEmo(B[0])), opts: numU(d, [x + y, x, d + 1, d - 1], 2, 1).map(v => v + " cm"), ans: d + " cm", big: 1, why: `Compare by taking away: ${x} − ${y} = ${d} cm.`, key: "ld" + A[1] + B[1] + x + "," + y, v22: { f: "diff", a: A[1], b: B[1], x, y } };
  }
  if (k <= 3) {
    const r = pick(MA7V_ROPES), x = R(5, 45), y = R(5, 45), s = x + y;
    return { q: `One ${r} is ${x} cm long. Another ${r} is ${y} cm long. If you lay them end to end, how long are they together?`, opts: numU(s, [Math.abs(x - y), s + 10, s - 10, s + 1], 3, 1).map(v => v + " cm"), ans: s + " cm", big: 1, why: `End to end means add: ${x} + ${y} = ${s} cm.`, key: "ls" + r + x + "," + y, v22: { f: "sum", x, y } };
  }
  const [obj, u] = pick(MA7V_UNIT);
  return { q: `Would you measure the length of <b>${obj}</b> in centimeters or meters?`, say: `Would you measure the length of ${obj} in centimeters or meters?`, opts: ["centimeters", "meters"], ans: u, big: 1, why: u === "meters" ? `${cap(obj)} is very long, so meters work best. A meter is 100 centimeters.` : `${cap(obj)} is small, so centimeters work best.`, key: "lu" + obj, v22: { f: "unit", obj, u } };
});
whyRule(7, "math", "measure", (q, picked) => {
  const x = q.v22; if (!x) return null;
  if (x.f === "unit") {
    const p = xPlain(picked); if (p === x.u) return null;
    return p === "meters" ? `A meter is 100 centimeters, much longer than ${x.obj}.` : `${cap(x.obj)} is so long that you would need a huge number of centimeters.`;
  }
  const p = MA7V_int(picked); if (p == null) return null;
  if (x.f === "diff") {
    const d = x.x - x.y; if (p === d) return null;
    if (p === x.x + x.y) return `${p} cm adds the two lengths. To find how much longer, take away.`;
    if (p === x.x) return `${p} cm is the whole ${x.a}. Take away the ${x.b}'s ${x.y} cm.`;
    return `${x.x} − ${x.y} is not ${p}. It is ${Math.abs(p - d)} ${MA7V_more(d, p)}.`;
  }
  if (x.f === "sum") {
    const s = x.x + x.y; if (p === s) return null;
    if (p === Math.abs(x.x - x.y)) return `${p} cm is how much longer one is. End to end means add the lengths.`;
    return `${x.x} + ${x.y} is not ${p}. It is ${Math.abs(p - s)} ${MA7V_more(s, p)}.`;
  }
  return null;
});

/* ---------- Greater, less, equal ---------- */
addBank(7, "math", "symbols", 0.3, () => {
  if (Math.random() < 0.55) {
    const a = R(100, 999); let b;
    const r = Math.random(); b = r < 0.1 ? a : r < 0.55 ? Math.floor(a / 100) * 100 + R(0, 99) : R(100, 999);
    const sign = a > b ? ">" : a < b ? "<" : "=";
    return { q: `Which sign goes in the box? <div class="eq">${a} ${blank("?")} ${b}</div>`, say: `${a}, blank, ${b}. Which sign goes in the box?`, opts: [">", "<", "="], ans: sign, big: 1, why: sign === "=" ? "Both numbers are the same." : Math.floor(a / 100) !== Math.floor(b / 100) ? `Compare the hundreds first: ${Math.max(a, b)} has more hundreds.` : `Same hundreds, so look at the tens and ones: ${Math.max(a, b)} is bigger.`, key: "h" + a + "," + b, v22: { f: "cmp", l: a, r: b, lt: String(a) } };
  }
  const a = R(10, 60), b = R(1, 30), s = a + b, c = Math.random() < 0.3 ? s : s + pick([-10, -2, -1, 1, 2, 10]);
  const sign = s > c ? ">" : s < c ? "<" : "=";
  return { q: `Which sign goes in the box? <div class="eq">${a} + ${b} ${blank("?")} ${c}</div>`, say: `${a} plus ${b}, blank, ${c}. Which sign goes in the box?`, opts: [">", "<", "="], ans: sign, big: 1, why: `${a} + ${b} = ${s}. ${sign === "=" ? `${s} is the same as ${c}` : `${s} is ${sign === ">" ? "greater" : "less"} than ${c}`}.`, key: "s" + a + "+" + b + "," + c, v22: { f: "cmp", l: s, r: c, lt: `${a} + ${b}` } };
});
whyRule(7, "math", "symbols", (q, picked) => {
  const x = q.v22; if (!x) return null;
  const p = xPlain(picked), { l, r, lt } = x, pre = lt === String(l) ? "" : `${lt} is ${l}, so `;
  if (p === "=") return l === r ? null : `${cap(pre)}= means both sides are the same, but ${l} and ${r} are different.`;
  if (p === ">") return l > r ? null : l === r ? `${cap(pre)}> would mean the left side is bigger, but both sides are the same.` : `${cap(pre)}> would mean ${l} is greater, but ${l} is less than ${r}.`;
  if (p === "<") return l < r ? null : l === r ? `${cap(pre)}< would mean the left side is smaller, but both sides are the same.` : `${cap(pre)}< would mean ${l} is less, but ${l} is greater than ${r}.`;
  return null;
});

/* ---------- 3D shapes: which one does not belong ---------- */
const MA7V_SOBJ = {
  sphere: ["a basketball", "a globe", "an orange", "a marble", "a gumball", "a snowball"],
  cube: ["a number cube", "an ice cube", "a sugar cube", "a square toy block"],
  cone: ["an ice cream cone", "a party hat", "a traffic cone"],
  cylinder: ["a soup can", "a candle", "a paper towel roll", "a drum", "a glue stick"],
  "rectangular prism": ["a cereal box", "a brick", "a shoebox", "a juice box", "a book"],
};
const MA7V_solidOf = o => Object.keys(MA7V_SOBJ).find(n => MA7V_SOBJ[n].includes(o));
addBank(7, "math", "solids", 0.45, () => {
  const names = Object.keys(MA7V_SOBJ), n = pick(names), other = pick(names.filter(x => x !== n)), odd = pick(MA7V_SOBJ[other]);
  const same = shuffle(MA7V_SOBJ[n]).slice(0, 3);
  return { q: `Three of these are shaped like a <b>${n}</b>. Which one is <b>not</b>?`, say: `Three of these are shaped like a ${n}. Which one is not?`, opts: shuffle([odd, ...same]), ans: odd, big: 1, why: `${cap(odd)} is shaped like ${/^[aeiou]/.test(other) ? "an" : "a"} ${other}, not a ${n}.`, key: "n" + n + "|" + odd, v22: { f: "odd", n } };
});
whyRule(7, "math", "solids", (q, picked) => {
  const x = q.v22; if (!x) return null;
  const p = xPlain(picked), s = MA7V_solidOf(p); if (!s || s !== x.n) return null;
  return `${cap(p)} is shaped like a ${x.n}, just like the other two.`;
});

/* ---------- Adding three (or more) numbers ---------- */
const MA7V_PICKS = [["apples", "picked"], ["shells", "found"], ["pictures", "drew"], ["laps", "ran"], ["books", "read"], ["cookies", "baked"], ["seeds", "planted"]];
addBank(7, "math", "add3", 0.35, () => {
  if (Math.random() < 0.5) {
    const a = R(10, 35), b = R(10, 30), c = R(10, Math.min(30, 95 - a - b)), s = a + b + c;
    return { q: `What is ${a} + ${b} + ${c}?`, vis: eq(`${a} + ${b} + ${c} = ${blank()}`), opts: numU(s, [a + b, s + 10, s - 10, s + 1, s - 1], 3, 1), ans: String(s), big: 1, why: `${a} + ${b} = ${a + b}, then ${a + b} + ${c} = ${s}.`, key: "v" + a + "+" + b + "+" + c, v22: { f: "sum", nums: [a, b, c], s } };
  }
  const ppl = MA7V_names(3), [w, verb] = pick(MA7V_PICKS), v = [R(2, 9), R(2, 9), R(2, 9)], s = v[0] + v[1] + v[2];
  return { q: `${ppl[0]} ${verb} ${v[0]} ${w}, ${ppl[1]} ${verb} ${v[1]}, and ${ppl[2]} ${verb} ${v[2]}. How many ${w} in all?`, opts: numU(s, [v[0] + v[1], s + 1, s - 1, s + 10], 3, 1), ans: String(s), big: 1, why: `${v[0]} + ${v[1]} + ${v[2]} = ${s}.`, key: "w" + ppl.join() + w + v.join(), v22: { f: "sum", nums: v, s } };
});
whyRule(7, "math", "add3", (q, picked) => {
  const x = q.v22; if (!x) return null;
  const p = MA7V_int(picked), [a, b, c] = x.nums; if (p == null || p === x.s) return null;
  if (p === a + b) return `${p} only adds ${a} and ${b}. Add the ${c} too.`;
  if (Math.abs(p - x.s) === 10) return `${p} is 10 ${MA7V_more(p, x.s)} than ${a} + ${b} + ${c}. Check the tens.`;
  return `${p} is ${Math.abs(p - x.s)} ${MA7V_more(p, x.s)} than ${a} + ${b} + ${c}.`;
});

/* ---------- Picture graphs ---------- */
const MA7V_PICTO = [["Shells found", "🐚", ["Ana", "Ben", "Ivy", "Max"]], ["Kites flown", "🪁", ["Sat", "Sun", "Mon", "Tue"]], ["Cups of lemonade sold", "🍋", ["Jo", "Raj", "Eli", "Kim"]], ["Stars earned", "⭐", ["Class A", "Class B", "Class C", "Class D"]], ["Carrots grown", "🥕", ["Row 1", "Row 2", "Row 3", "Row 4"]], ["Pets in class", "🐾", ["Dogs", "Cats", "Fish", "Birds"]]];
addBank(7, "math", "pictograph", 0.45, () => {
  const [title, e, names] = pick(MA7V_PICTO), key = pick([1, 2, 2, 5, 10]), cnt = names.map(() => R(1, 6)), vals = cnt.map(c => c * key), vis = pictograph(title, e, names.map((n, i) => [n, vals[i]]), key), k = R(0, 3);
  const data = { key, names, cnt, vals };
  if (k === 0) {
    let a = R(0, 3), b = R(0, 3); while (b === a) b = R(0, 3); if (a > b) [a, b] = [b, a]; const s = vals[a] + vals[b];
    return { q: `How many in all for <b>${names[a]}</b> and <b>${names[b]}</b>?`, say: `How many in all for ${names[a]} and ${names[b]}?`, vis, opts: numU(s, [cnt[a] + cnt[b], s + key, s - key, vals[a]], key, 1), ans: String(s), big: 1, why: `${names[a]} has ${vals[a]} and ${names[b]} has ${vals[b]}: ${vals[a]} + ${vals[b]} = ${s}.`, key: "va" + title + key + vals.join() + a + b, v22: { f: "pair", ...data, a, b, ans: s } };
  }
  if (k === 1) {
    let a = R(0, 3), b = R(0, 3), g = 0; while ((b === a || vals[a] === vals[b]) && g++ < 50) { a = R(0, 3); b = R(0, 3); }
    if (b === a || vals[a] === vals[b]) return null;
    if (vals[a] > vals[b]) [a, b] = [b, a]; const d = vals[b] - vals[a];
    return { q: `How many <b>fewer</b> for <b>${names[a]}</b> than <b>${names[b]}</b>?`, say: `How many fewer for ${names[a]} than ${names[b]}?`, vis, opts: numU(d, [cnt[b] - cnt[a], d + key, vals[b], vals[a]], key, 1), ans: String(d), big: 1, why: `${names[b]} has ${vals[b]} and ${names[a]} has ${vals[a]}: ${vals[b]} − ${vals[a]} = ${d}.`, key: "vf" + title + key + vals.join() + a + b, v22: { f: "fewer", ...data, a, b, ans: d } };
  }
  if (k === 2) {
    const mn = Math.min(...vals); if (vals.filter(v => v === mn).length > 1) return null;
    return { q: "Which row has the <b>fewest</b>?", vis, opts: names.slice(), ans: names[vals.indexOf(mn)], big: 1, why: `${names[vals.indexOf(mn)]} has the shortest row: ${mn}.`, key: "vm" + title + key + vals.join(), v22: { f: "fewest", ...data } };
  }
  const s = vals.reduce((x, y) => x + y, 0), c = cnt.reduce((x, y) => x + y, 0);
  return { q: "How many in all for the whole graph?", vis, opts: numU(s, [c, s + key, s - key, s - vals[3]], key, 1), ans: String(s), big: 1, why: `${vals.join(" + ")} = ${s}.`, key: "vt" + title + key + vals.join(), v22: { f: "all", ...data, ans: s } };
});
whyRule(7, "math", "pictograph", (q, picked) => {
  const x = q.v22; if (!x) return null;
  const { key, names, cnt, vals } = x;
  if (x.f === "fewest") {
    const i = names.indexOf(xPlain(picked)), mn = Math.min(...vals); if (i < 0 || vals[i] === mn) return null;
    return `${names[i]} has ${vals[i]}, which is more than the smallest row.`;
  }
  const p = MA7V_int(picked); if (p == null || p === x.ans) return null;
  if (x.f === "pair") {
    const { a, b } = x;
    if (key > 1 && p === cnt[a] + cnt[b]) return `${p} is how many pictures there are, but each picture stands for ${key}.`;
    if (p === vals[a]) return `${p} is only ${names[a]}'s row. Add ${names[b]}'s ${vals[b]} too.`;
    return `${names[a]} has ${vals[a]} and ${names[b]} has ${vals[b]}, and ${vals[a]} + ${vals[b]} isn't ${p}.`;
  }
  if (x.f === "fewer") {
    const { a, b } = x;
    if (key > 1 && p === cnt[b] - cnt[a]) return `${p} is how many fewer pictures, but each picture stands for ${key}.`;
    if (p === vals[b]) return `${p} is all of ${names[b]}'s row. Take away ${names[a]}'s ${vals[a]}.`;
    if (p === vals[a]) return `${p} is all of ${names[a]}'s row, not how many fewer.`;
    return `${names[b]} has ${vals[b]} and ${names[a]} has ${vals[a]}, and ${vals[b]} − ${vals[a]} isn't ${p}.`;
  }
  if (x.f === "all") {
    const c = cnt.reduce((s, v) => s + v, 0);
    if (key > 1 && p === c) return `${p} is how many pictures there are, but each picture stands for ${key}.`;
    if (p === x.ans - vals[3]) return `${p} leaves out ${names[3]}'s row of ${vals[3]}.`;
    return `${p} is ${Math.abs(p - x.ans)} ${MA7V_more(p, x.ans)} than all the rows added up.`;
  }
  return null;
});

