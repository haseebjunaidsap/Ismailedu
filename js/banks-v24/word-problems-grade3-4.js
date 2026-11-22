/* =====================================================================
   v24 · More word problems, graphing and equations for ages 8 and 9
   Age 8: Story Problems, Line Plots, Letter Equations
   Age 9: Multi-Step Word Problems, Line Graphs & Grids, Solve for the Letter
   Every question keeps its numbers in q.v24 so wrong picks get a true reason.
   ===================================================================== */
const V24_who = () => pick(KIDS);
const V24_esc = t => String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const V24_mo = d => d > 0 ? "more" : "less";
/* options: the answer, the named mistakes, then near numbers */
function V24_opts(ans, mistakes, spread, min) {
  return numU(ans, mistakes.map(m => m[0]).filter(v => v !== ans && v >= (min || 0)), spread || 3, min || 0);
}
function V24_miss(mistakes) { const o = {}; mistakes.forEach(([v, why]) => { if (o[v] == null) o[v] = why; }); return o; }
/* generic but always-true reason for a number pick */
const V24_n = h => { const m = xPlain(h).replace(/,/g, "").match(/-?\d+(\.\d+)?/); return m ? +m[0] : null; };
/* value of the left side when the letter is v (plain data, so saved questions still work) */
function V24_f(x, v) {
  switch (x.fm) {
    case "L+a": return v + x.a; case "L-a": return v - x.a; case "a*L": return x.a * v; case "a/L": return v ? x.a / v : NaN;
    case "a*L+b": return x.a * v + x.b; case "a*L-b": return x.a * v - x.b; case "L/a+b": return v % x.a ? NaN : v / x.a + x.b;
  } return NaN;
}
function V24_numReason(q, picked) {
  const x = q.v24, p = V24_n(picked); if (!x || p == null || p === V24_n(q.ans)) return null;
  if (x.m && x.m[p] != null) return x.m[p];
  const a = V24_n(q.ans), d = p - a;
  return `${p} is ${Math.abs(d)} ${V24_mo(d)} than the right answer. Check each step again.`;
}

/* ---------------- pictures ---------------- */
function V24_linePlot(lo, hi, counts, unit, title) {
  const n = hi - lo, W = 340, x = v => 30 + (v - lo) * (280 / n), mx = Math.max(...Object.values(counts), 1), H = 70 + mx * 22;
  let s = `<svg class="vis-svg" viewBox="0 0 ${W} ${H + 48}" width="${W}" height="${H + 48}" role="img" aria-label="${V24_esc(title)} line plot">`;
  s += `<text x="${W / 2}" y="16" text-anchor="middle" font-size="14" font-weight="600" font-family="${FONT}" fill="${INK}">${V24_esc(title)}</text>`;
  s += `<line x1="20" y1="${H}" x2="${W - 20}" y2="${H}" stroke="${INK}" stroke-width="3"/>`;
  for (let v = lo; v <= hi; v++) {
    s += `<line x1="${x(v)}" y1="${H - 6}" x2="${x(v)}" y2="${H + 6}" stroke="${INK}" stroke-width="2"/><text x="${x(v)}" y="${H + 22}" text-anchor="middle" font-size="14" font-family="${FONT}" fill="${INK}">${v}</text>`;
    for (let k = 0; k < (counts[v] || 0); k++) s += `<text x="${x(v)}" y="${H - 14 - k * 22}" text-anchor="middle" font-size="20" font-weight="700" font-family="${FONT}" fill="#2F6FD6">✕</text>`;
  }
  s += `<text x="${W / 2}" y="${H + 40}" text-anchor="middle" font-size="12" font-family="${FONT}" fill="#5B6B8C">${V24_esc(unit)}</text></svg>`;
  return s;
}
function V24_lineGraph(labels, vals, title, yName, step) {
  const W = 340, H = 220, L = 40, B = 180, T = 30, top = Math.ceil(Math.max(...vals) / step) * step + step, bot = Math.max(0, Math.floor(Math.min(...vals) / step) * step - step);
  const y = v => B - (v - bot) / (top - bot) * (B - T), x = i => L + 20 + i * ((W - L - 40) / (labels.length - 1));
  let s = `<svg class="vis-svg v24-lg" data-l="${L}" data-b="${B}" viewBox="0 0 ${W} ${H + 20}" width="${W}" height="${H + 20}" role="img" aria-label="${V24_esc(title)} line graph">`;
  s += `<text x="${W / 2}" y="16" text-anchor="middle" font-size="14" font-weight="600" font-family="${FONT}" fill="${INK}">${V24_esc(title)}</text>`;
  for (let v = bot; v <= top; v += step) s += `<line x1="${L}" y1="${y(v)}" x2="${W - 10}" y2="${y(v)}" stroke="#D5E0F2"/><text x="${L - 6}" y="${y(v)}" text-anchor="end" dominant-baseline="central" font-size="11" font-family="${FONT}" fill="${INK}">${v}</text>`;
  s += `<line x1="${L}" y1="${B}" x2="${W - 10}" y2="${B}" stroke="${INK}" stroke-width="2"/><line x1="${L}" y1="${T - 6}" x2="${L}" y2="${B}" stroke="${INK}" stroke-width="2"/>`;
  s += `<polyline fill="none" stroke="#F26B3A" stroke-width="3" points="${vals.map((v, i) => `${x(i)},${y(v)}`).join(" ")}"/>`;
  vals.forEach((v, i) => { s += `<circle data-i="${i}" cx="${x(i)}" cy="${y(v)}" r="5" fill="#F26B3A" stroke="#fff" stroke-width="2"/><text x="${x(i)}" y="${B + 16}" text-anchor="middle" font-size="12" font-family="${FONT}" fill="${INK}">${V24_esc(labels[i])}</text>`; });
  s += `<text x="12" y="${(T + B) / 2}" transform="rotate(-90 12 ${(T + B) / 2})" text-anchor="middle" font-size="11" font-family="${FONT}" fill="#5B6B8C">${V24_esc(yName)}</text></svg>`;
  return s;
}
function V24_gridGeo(n) { const S = 36, O = 34, T = 34; return { S, W: O + n * S + 20, Hh: T + n * S + 30, X: v => O + v * S, Y: v => T + (n - v) * S }; }
function V24_grid(items, n) {
  n = n || 6; const g = V24_gridGeo(n), { W, Hh, X, Y } = g;
  let s = `<svg class="vis-svg v24-grid" data-n="${n}" viewBox="0 0 ${W} ${Hh}" width="${W}" height="${Hh}" role="img" aria-label="coordinate grid">`;
  for (let i = 0; i <= n; i++) {
    s += `<line x1="${X(i)}" y1="${Y(0)}" x2="${X(i)}" y2="${Y(n)}" stroke="${i ? "#D5E0F2" : INK}" stroke-width="${i ? 1 : 2.5}"/><line x1="${X(0)}" y1="${Y(i)}" x2="${X(n)}" y2="${Y(i)}" stroke="${i ? "#D5E0F2" : INK}" stroke-width="${i ? 1 : 2.5}"/>`;
    s += `<text x="${X(i)}" y="${Y(0) + 18}" text-anchor="middle" font-size="13" font-family="${FONT}" fill="${INK}">${i}</text>`;
    if (i) s += `<text x="${X(0) - 10}" y="${Y(i)}" text-anchor="end" dominant-baseline="central" font-size="13" font-family="${FONT}" fill="${INK}">${i}</text>`;
  }
  items.forEach(([e, a, b]) => { s += `<circle cx="${X(a)}" cy="${Y(b)}" r="4" fill="${INK}"/><text x="${X(a)}" y="${Y(b) - 6}" text-anchor="middle" font-size="22">${e}</text>`; });
  return s + `</svg>`;
}

/* =====================================================================
   AGE 8 · Story Problems (one and two steps, all four operations)
   ===================================================================== */
const V24_STORY8 = [
  () => { const w = V24_who(), g = R(3, 9), k = R(4, 9), t = g * k, s = R(3, t - 4), a = t - s;
    return { e: "🧁", q: `${w} baked ${g} trays of muffins with ${k} muffins on each tray. ${w} sold ${s} muffins. How many muffins are left?`, a, why: `${g} × ${k} = ${t} muffins, then ${t} − ${s} = ${a}.`,
      m: [[t, `${t} is all the muffins before any were sold. Take away the ${s} sold.`], [t + s, `${t + s} adds the sold muffins, but they are gone, so subtract.`], [g * k - g, `Find all the muffins first: ${g} × ${k} = ${t}.`]] }; },
  () => { const a1 = R(12, 48), d = R(5, 30), b = a1 + d;
    return { e: "📚", q: `Room 8 read ${a1} books in March and ${b} books in April. How many more books did they read in April?`, a: d, why: `"How many more" means compare: ${b} − ${a1} = ${d}.`,
      m: [[a1 + b, `${a1 + b} puts both months together. "How many more" means subtract: ${b} − ${a1}.`], [b, `${b} is just April's books. Compare it with March.`]] }; },
  () => { const w = V24_who(), k = R(3, 9), e = R(3, 9), t = k * e;
    return { e: "⭐", q: `${w} has ${t} stickers and shares them equally with ${k} friends. How many stickers does each friend get?`, a: e, why: `Share equally means divide: ${t} ÷ ${k} = ${e}, because ${k} × ${e} = ${t}.`,
      m: [[t - k, `${t - k} takes away ${k}, but sharing with ${k} friends means divide by ${k}.`], [t + k, `${t + k} adds, but sharing means divide: ${t} ÷ ${k}.`], [k, `${k} is the number of friends, not how many each gets.`]] }; },
  () => { const p = R(18, 45), o = R(3, 12), n = R(2, 12), a = p - o + n;
    return { e: "🚌", q: `${p} kids were on the bus. At the first stop, ${o} kids got off and ${n} kids got on. How many kids are on the bus now?`, a, why: `${p} − ${o} = ${p - o}, then ${p - o} + ${n} = ${a}.`,
      m: [[p - o, `${p - o} forgets the ${n} kids who got on.`], [p + o + n, `${p + o + n} adds the kids who got off. They left, so subtract them.`], [p - o - n, `${p - o - n} takes away the kids who got on. They joined, so add them.`]] }; },
  () => { const w = V24_who(), r = R(3, 9), c = R(4, 9), t = r * c, e = R(2, Math.min(15, t - 3)), a = t - e;
    return { e: "🥕", q: `${w} planted ${r} rows of carrots with ${c} carrots in each row. A rabbit ate ${e} carrots. How many carrots are left?`, a, why: `${r} × ${c} = ${t} carrots, then ${t} − ${e} = ${a}.`,
      m: [[t, `${t} is before the rabbit came. Take away the ${e} it ate.`], [r + c - e, `Rows of carrots means multiply: ${r} × ${c} = ${t}, not ${r} + ${c}.`], [t + e, `${t + e} adds the eaten carrots. They're gone, so subtract.`]] }; },
  () => { const w = V24_who(), c = pick([5, 10, 15, 20, 25]), k = R(2, 4), cost = c * k, a = 100 - cost;
    return { e: "✏️", q: `Pencils cost ${c}¢ each. ${w} buys ${k} pencils and pays with 1 dollar (100¢). How much change does ${w} get?`, a, unit: "¢", why: `${k} × ${c}¢ = ${cost}¢, then 100¢ − ${cost}¢ = ${a}¢.`,
      m: [[cost, `${cost}¢ is what the pencils cost. The change is what's left from 100¢.`], [100 - c, `100 − ${c} pays for only 1 pencil. ${w} buys ${k}.`]] }; },
  () => { const g = R(3, 8), k = R(4, 10), x = R(2, 9), a = g * k + x;
    return { e: "🖍️", q: `There are ${g} boxes with ${k} crayons in each box, and ${x} loose crayons. How many crayons are there in all?`, a, why: `${g} × ${k} = ${g * k}, then ${g * k} + ${x} = ${a}.`,
      m: [[g * k, `${g * k} forgets the ${x} loose crayons.`], [g + k + x, `Boxes with ${k} in each means multiply: ${g} × ${k}.`], [g * (k + x), `Only the boxes have ${k} each. Add the ${x} loose crayons once.`]] }; },
  () => { const k = pick([4, 5, 6, 7, 8]), v = R(3, 9), t = k * v;
    return { e: "🚐", q: `${t} students are going on a field trip. Each van holds ${k} students. How many vans are needed?`, a: v, why: `${t} ÷ ${k} = ${v}, because ${v} × ${k} = ${t}.`,
      m: [[t - k, `${t - k} takes away one van's worth. Divide to find how many vans: ${t} ÷ ${k}.`], [k, `${k} is how many fit in one van, not the number of vans.`]] }; },
  () => { const w = V24_who(), d = R(4, 9), n = R(3, 7), r = R(5, 40), p = d * n + r;
    return { e: "📖", q: `A book has ${p} pages. ${w} reads ${d} pages a day for ${n} days. How many pages are left to read?`, a: r, why: `${d} × ${n} = ${d * n} pages read, then ${p} − ${d * n} = ${r}.`,
      m: [[d * n, `${d * n} is the pages ${w} already read. Take that from ${p}.`], [p - d, `${p} − ${d} is only one day of reading. ${w} read for ${n} days.`]] }; },
  () => { const w = V24_who(), a1 = R(25, 60), b1 = R(25, 60), tot = a1 + b1, s = R(10, tot - 10), a = tot - s;
    return { e: "🍎", q: `${w} picked ${a1} apples in the morning and ${b1} apples in the afternoon. Then ${w} gave away ${s} apples. How many apples does ${w} have now?`, a, why: `${a1} + ${b1} = ${tot}, then ${tot} − ${s} = ${a}.`,
      m: [[tot, `${tot} is before giving any away. Subtract the ${s} given away.`], [tot + s, `${tot + s} adds the apples given away. They're gone, so subtract.`]] }; },
  () => { const k = R(3, 9), c = R(3, 9), t = k * c;
    return { e: "🐠", q: `A pet store has ${k} tanks. Each tank has ${c} fish. How many fish are there altogether?`, a: t, why: `Equal groups means multiply: ${k} × ${c} = ${t}.`,
      m: [[k + c, `${k + c} adds, but ${k} tanks with ${c} in each means ${k} × ${c}.`]] }; },
  () => { const w = V24_who(), b = R(120, 480), s = R(40, 300), a = b + s;
    return { e: "🪙", q: `${w} had ${b} coins in a jar. Grandma added ${s} more coins. How many coins are in the jar now?`, a, why: `${b} + ${s} = ${a}.`,
      m: [[b - s > 0 ? b - s : -1, `${b - s} takes away, but Grandma added coins.`]] }; },
];
topic(8, "math", {
  id: "wordstory", title: "Story Problems", icon: "📖", blurb: "One- and two-step stories with + − × ÷.",
  lesson: [
    { t: "Read and picture it", say: "Read the story slowly. Picture what is happening. What do you know? What do you need to find?", html: bigEmo("🧁") + note("<b>Know:</b> 4 trays, 6 muffins on each, 5 sold<br><b>Find:</b> muffins left") },
    { t: "Choose the operation", say: "Equal groups means multiply. Sharing equally means divide. Putting together means add. Taking away or comparing means subtract.", html: eq("groups → ×   sharing → ÷") + eq("together → +   take away → −") },
    { t: "Two steps", say: "Some stories need two steps. First 4 times 6 is 24 muffins. Then 24 minus 5 is 19 muffins left. Check that your answer makes sense!", html: eq("4 × 6 = 24") + eq("24 − 5 = <b>19</b>") },
  ],
  gen() {
    const s = pick(V24_STORY8)(), u = s.unit || "";
    const m = s.m.filter(x => x[0] >= 0);
    return { q: s.q, vis: bigEmo(s.e), opts: V24_opts(s.a, m, Math.max(3, Math.round(s.a / 8)), 0).map(o => o + u), ans: s.a + u, big: 1, why: s.why, key: "ws" + s.q.replace(/\D+/g, "-"), v24: { m: V24_miss(m) } };
  },
});
TRICK_ADD(8, "math", "wordstory", "Ask: What do I know? What do I need? Equal groups → ×, sharing → ÷, together → +, take away or compare → −. Two steps? Do one, then the other.");
whyRule(8, "math", "wordstory", V24_numReason);

/* =====================================================================
   AGE 8 · Line Plots
   ===================================================================== */
const V24_pl = (v, one, many) => `${v} ${v === 1 ? one : many}`;
const V24_LP = [
  ["Pencil lengths", "inches", "pencils", v => `are ${V24_pl(v, "inch", "inches")} long`, 2, 8, v => `are longer than ${V24_pl(v, "inch", "inches")}`],
  ["Ribbon lengths", "inches", "ribbons", v => `are ${V24_pl(v, "inch", "inches")} long`, 3, 9, v => `are longer than ${V24_pl(v, "inch", "inches")}`],
  ["Leaf lengths", "centimeters", "leaves", v => `are ${V24_pl(v, "centimeter", "centimeters")} long`, 4, 10, v => `are longer than ${V24_pl(v, "centimeter", "centimeters")}`],
  ["Books read this week", "books", "kids", v => `read ${V24_pl(v, "book", "books")}`, 0, 6, v => `read more than ${V24_pl(v, "book", "books")}`],
  ["Pets at home", "pets", "kids", v => `have ${V24_pl(v, "pet", "pets")}`, 0, 5, v => `have more than ${V24_pl(v, "pet", "pets")}`],
  ["Hours of sleep", "hours", "kids", v => `sleep ${V24_pl(v, "hour", "hours")}`, 7, 12, v => `sleep more than ${V24_pl(v, "hour", "hours")}`],
  ["Goals scored", "goals", "games", v => `had ${V24_pl(v, "goal", "goals")}`, 0, 6, v => `had more than ${V24_pl(v, "goal", "goals")}`],
  ["Shell lengths", "centimeters", "shells", v => `are ${V24_pl(v, "centimeter", "centimeters")} long`, 1, 7, v => `are longer than ${V24_pl(v, "centimeter", "centimeters")}`],
];
function V24_lpData(lo, hi) {
  for (;;) { const c = {}; for (let v = lo; v <= hi; v++) c[v] = R(0, 5); const vals = Object.values(c), mx = Math.max(...vals);
    if (vals.filter(x => x === mx).length === 1 && vals.reduce((a, b) => a + b, 0) >= 8) return c; }
}
topic(8, "math", {
  id: "lineplot", title: "Line Plots", icon: "📏", blurb: "Read X marks on a number line.",
  lesson: [
    { t: "What is a line plot?", say: "A line plot shows data on a number line. Each X stands for one thing. These X's show how long some pencils are.", html: V24_linePlot(3, 7, { 3: 1, 4: 3, 5: 2, 6: 1, 7: 0 }, "inches", "Pencil lengths") },
    { t: "Count the X's", say: "To find how many pencils are 4 inches long, count the X's above the 4. There are 3. The tallest stack is the most common length.", html: note("Above 4: ✕ ✕ ✕ → <b>3 pencils</b>") + note("Tallest stack = <b>most common</b>") },
    { t: "Add and compare", say: "Add all the X's to find how many in all. To find how many more, subtract one stack from another.", html: eq("1 + 3 + 2 + 1 = <b>7</b> in all") + eq("3 − 1 = <b>2</b> more") },
  ],
  gen() {
    const [title, unit, thing, desc, lo, hi, more] = pick(V24_LP), c = V24_lpData(lo, hi), vis = V24_linePlot(lo, hi, c, unit, title);
    const vs = Object.keys(c).map(Number), tot = vs.reduce((s, v) => s + c[v], 0), mx = vs.find(v => c[v] === Math.max(...vs.map(k => c[k])));
    const k = R(0, 4), key = "lp" + title + vs.map(v => c[v]).join("");
    if (k === 0) { const v = pick(vs.filter(x => c[x] > 0)), a = c[v];
      return { q: `How many ${thing} <b>${desc(v)}</b>?`, vis, opts: V24_opts(a, [[c[v - 1] ?? -1], [c[v + 1] ?? -1], [v]], 2, 0), ans: String(a), big: 1, why: `Count the X's above ${v}: there are ${a}.`, key: key + "a" + v, v24: { t: "lp", c, v, ask: "count", unit } }; }
    if (k === 1) { const others = shuffle(vs.filter(v => v !== mx)).slice(0, 3);
      return { q: `Which number has the <b>most</b> ${thing}?`, vis, opts: shuffle([mx, ...others].map(String)), ans: String(mx), big: 1, why: `The tallest stack of X's is above ${mx}, with ${c[mx]} X's.`, key: key + "m", v24: { t: "lp", c, ask: "most", unit } }; }
    if (k === 2) return { q: `How many ${thing} are shown <b>in all</b>?`, vis, opts: V24_opts(tot, [[vs.length], [c[mx]], [tot - 1], [tot + 1]], 3, 1), ans: String(tot), big: 1, why: `Add every stack: ${vs.map(v => c[v]).join(" + ")} = ${tot}.`, key: key + "t", v24: { t: "lp", c, ask: "total", tot } };
    if (k === 3) { let a, b, g = 0; do { [a, b] = shuffle(vs).slice(0, 2); g++; } while (g < 30 && c[a] <= c[b]);
      if (c[a] <= c[b]) { const v = pick(vs.filter(x => c[x] > 0)); return { q: `How many ${thing} <b>${desc(v)}</b>?`, vis, opts: V24_opts(c[v], [[v]], 2, 0), ans: String(c[v]), big: 1, why: `Count the X's above ${v}: there are ${c[v]}.`, key: key + "a" + v, v24: { t: "lp", c, v, ask: "count", unit } }; }
      const d = c[a] - c[b];
      return { q: `How many more ${thing} <b>${desc(a)}</b> than <b>${desc(b).replace(/^(are|read|have|sleep|had) /, "")}</b>?`, vis, opts: V24_opts(d, [[c[a] + c[b], `Add`], [c[a]], [Math.abs(a - b)]], 2, 0), ans: String(d), big: 1, why: `${c[a]} X's above ${a} and ${c[b]} above ${b}: ${c[a]} − ${c[b]} = ${d}.`, key: key + "d" + a + b, v24: { t: "lp", c, ask: "diff", a, b } }; }
    const v = pick(vs.slice(0, -1)), a = vs.filter(x => x > v).reduce((s, x) => s + c[x], 0);
    return { q: `How many ${thing} <b>${more(v)}</b>?`, vis, opts: V24_opts(a, [[a + c[v]], [vs.filter(x => x < v).reduce((s, x) => s + c[x], 0)], [tot]], 2, 0), ans: String(a), big: 1, why: `Add the X's to the right of ${v}: ${vs.filter(x => x > v).map(x => c[x]).join(" + ")} = ${a}.`, key: key + "g" + v, v24: { t: "lp", c, v, ask: "more", tot } };
  },
});
TRICK_ADD(8, "math", "lineplot", "Each X is one thing. Count the X's above a number. Tallest stack = most common. Add all stacks for the total.");
whyRule(8, "math", "lineplot", (q, picked) => {
  const x = q.v24; if (!x) return null; const p = xNum(picked); if (p == null) return null; const c = x.c;
  if (x.ask === "count") { if (p === x.v) return `${p} is the number under the stack. Count the X's above it.`; for (const k in c) if (+k !== x.v && c[k] === p) return `${p} is how many X's are above ${k}, not ${x.v}.`; return `Count again: there are ${c[x.v]} X's above ${x.v}.`; }
  if (x.ask === "most") return `${p} has ${c[p]} X${c[p] === 1 ? "" : "'s"}. Another stack is taller.`;
  if (x.ask === "total") return `Add every stack. ${p} is ${p > x.tot ? "too many" : "too few"}.`;
  if (x.ask === "diff") { if (p === c[x.a] + c[x.b]) return `${p} adds the two stacks. "How many more" means subtract.`; if (p === Math.abs(x.a - x.b)) return `${p} subtracts the numbers on the line. Subtract the X counts instead.`; if (p === c[x.a]) return `${p} is only the ${x.a} stack. Take away the ${x.b} stack.`; return `${c[x.a]} − ${c[x.b]} = ${c[x.a] - c[x.b]}, not ${p}.`; }
  if (x.ask === "more") { if (p === x.tot) return `${p} counts every X. Count only the ones right of ${x.v}.`; return `Add only the stacks to the right of ${x.v}, not ${x.v} itself.`; }
  return null;
});

/* =====================================================================
   AGE 8 · Letter Equations (a letter stands for the unknown)
   ===================================================================== */
const V24_L = ["n", "x", "a", "b", "m", "k", "y"];
topic(8, "math", {
  id: "equations", title: "Letter Equations", icon: "🔤", blurb: "Find the number a letter stands for.",
  lesson: [
    { t: "A letter is a mystery number", say: "In an equation, a letter can stand for a mystery number. In n plus 5 equals 12, n is the number we need to find.", html: eq("n + 5 = 12") + note("n = the mystery number") },
    { t: "Undo it", say: "To find n, undo the operation. n plus 5 is 12, so take 5 away from 12. n is 7. Check: 7 plus 5 is 12.", html: eq("12 − 5 = 7 → <b>n = 7</b>") + eq("Check: 7 + 5 = 12 ✔") },
    { t: "Multiply and divide too", say: "If 4 times n is 28, think: 4 times what is 28? 28 divided by 4 is 7, so n is 7.", html: eq("4 × n = 28") + eq("28 ÷ 4 = 7 → <b>n = 7</b>") },
  ],
  gen() {
    const L = pick(V24_L), k = R(0, 9);
    if (k <= 1) { const n = R(4, 60), a = R(3, 40), c = n + a;
      return { q: `What is <b>${L}</b>?`, say: `${L} plus ${a} equals ${c}. What is ${L}?`, vis: eq(`${L} + ${a} = ${c}`), opts: V24_opts(n, [[c + a, `${c + a} adds ${a} again. Undo + by subtracting: ${c} − ${a}.`], [c, `${c} is the total. ${L} is the part that goes with ${a}.`], [n + 10]], 3, 0), ans: String(n), big: 1, why: `${c} − ${a} = ${n}. Check: ${n} + ${a} = ${c}.`, key: "e+" + a + "=" + c, v24: { t: "eq", L, fm: "L+a", a, s: `${L} + ${a}`, c } }; }
    if (k <= 3) { const n = R(12, 80), a = R(3, n - 2), d = n - a;
      return { q: `What is <b>${L}</b>?`, say: `${L} minus ${a} equals ${d}. What is ${L}?`, vis: eq(`${L} − ${a} = ${d}`), opts: V24_opts(n, [[Math.abs(d - a), `Undo − by adding: ${d} + ${a}.`], [d, `${d} is what's left after taking ${a}. ${L} is bigger.`]], 3, 0), ans: String(n), big: 1, why: `${d} + ${a} = ${n}. Check: ${n} − ${a} = ${d}.`, key: "e-" + a + "=" + d, v24: { t: "eq", L, fm: "L-a", a, s: `${L} − ${a}`, c: d } }; }
    if (k <= 5) { const a = R(2, 10), n = R(2, 10), p = a * n;
      return { q: `What is <b>${L}</b>?`, say: `${a} times ${L} equals ${p}. What is ${L}?`, vis: eq(`${a} × ${L} = ${p}`), opts: V24_opts(n, [[p - a, `${p} − ${a} subtracts. Undo × by dividing: ${p} ÷ ${a}.`], [p + a], [a]], 2, 1), ans: String(n), big: 1, why: `${p} ÷ ${a} = ${n}, because ${a} × ${n} = ${p}.`, key: "ex" + a + "=" + p, v24: { t: "eq", L, fm: "a*L", a, s: `${a} × ${L}`, c: p } }; }
    if (k === 6) { const n = R(2, 10), q2 = R(2, 10), p = n * q2;
      return { q: `What is <b>${L}</b>?`, say: `${p} divided by ${L} equals ${q2}. What is ${L}?`, vis: eq(`${p} ÷ ${L} = ${q2}`), opts: V24_opts(n, [[p * q2, `${p} × ${q2} is far too big. Think: ${q2} × what = ${p}?`], [p - q2]], 2, 1), ans: String(n), big: 1, why: `${p} ÷ ${n} = ${q2}, because ${n} × ${q2} = ${p}.`, key: "ed" + p + "=" + q2, v24: { t: "eq", L, fm: "a/L", a: p, s: `${p} ÷ ${L}`, c: q2 } }; }
    if (k <= 8) {
      const w = V24_who(), st = R(0, 3);
      if (st === 0) { const a = R(3, 15), c = a + R(5, 30); return { q: `${w} had some marbles. ${w} got ${a} more and now has ${c}. Let <b>${L}</b> be the marbles ${w} had at first. Which equation matches?`, vis: bigEmo("🔵"), opts: shuffle([`${L} + ${a} = ${c}`, `${L} − ${a} = ${c}`, `${a} × ${L} = ${c}`, `${c} + ${a} = ${L}`]), ans: `${L} + ${a} = ${c}`, why: `Some marbles (${L}) plus ${a} more makes ${c}: ${L} + ${a} = ${c}.`, key: "es" + st + a + c, v24: { t: "story", op: "+" } }; }
      if (st === 1) { const g = R(3, 9), e = R(3, 9), p = g * e; return { q: `There are ${g} bags with the same number of apples in each. There are ${p} apples in all. Let <b>${L}</b> be the apples in each bag. Which equation matches?`, vis: bigEmo("🍎"), opts: shuffle([`${g} × ${L} = ${p}`, `${g} + ${L} = ${p}`, `${L} ÷ ${g} = ${p}`, `${p} × ${g} = ${L}`]), ans: `${g} × ${L} = ${p}`, why: `${g} equal bags of ${L} apples make ${p}: ${g} × ${L} = ${p}.`, key: "es" + st + g + p, v24: { t: "story", op: "×" } }; }
      if (st === 2) { const t = R(20, 60), a = R(4, t - 5); return { q: `${w} had ${t} stickers and gave some away. Now ${w} has ${t - a}. Let <b>${L}</b> be the stickers ${w} gave away. Which equation matches?`, vis: bigEmo("⭐"), opts: shuffle([`${t} − ${L} = ${t - a}`, `${t} + ${L} = ${t - a}`, `${L} − ${t} = ${t - a}`, `${t} × ${L} = ${t - a}`]), ans: `${t} − ${L} = ${t - a}`, why: `Start with ${t}, take away ${L}, and ${t - a} are left: ${t} − ${L} = ${t - a}.`, key: "es" + st + t + a, v24: { t: "story", op: "−" } }; }
      const g = R(2, 9), e = R(2, 9), p = g * e; return { q: `${p} cookies are shared equally on some plates. Each plate gets ${e} cookies. Let <b>${L}</b> be the number of plates. Which equation matches?`, vis: bigEmo("🍪"), opts: shuffle([`${p} ÷ ${L} = ${e}`, `${p} − ${L} = ${e}`, `${p} × ${L} = ${e}`, `${e} ÷ ${L} = ${p}`]), ans: `${p} ÷ ${L} = ${e}`, why: `${p} cookies shared onto ${L} plates gives ${e} each: ${p} ÷ ${L} = ${e}.`, key: "es" + st + p + e, v24: { t: "story", op: "÷" } };
    }
    /* true or false: both sides equal? */
    const a = R(2, 9), b = R(2, 9), p = a * b, add = R(1, Math.min(9, p - 1)), base = p - add, truth = Math.random() < 0.5;
    const add2 = truth ? add : Math.max(1, add + pick([1, 2, -1, -2]) || add + 1), rightVal = base + add2, right = `${base} + ${add2}`;
    return { q: `Is this equation <b>true</b> or <b>false</b>?`, say: `Is ${a} times ${b} equals ${base} plus ${add2} true or false?`, vis: eq(`${a} × ${b} = ${right}`), opts: ["True", "False"], ans: p === rightVal ? "True" : "False", why: `${a} × ${b} = ${p} and ${right} = ${rightVal}${p === rightVal ? ". Both sides are the same, so it's true." : `. ${p} is not ${rightVal}, so it's false.`}`, key: "etf" + a + b + right, v24: { t: "tf", l: p, r: rightVal, a, b, right } };
  },
});
TRICK_ADD(8, "math", "equations", "A letter is a mystery number. Undo it: + ↔ −, × ↔ ÷. Then put your number back in to check!");
whyRule(8, "math", "equations", (q, picked) => {
  const x = q.v24; if (!x) return null; const pp = xPlain(picked);
  if (x.t === "tf") return pp === "True" ? `${x.a} × ${x.b} = ${x.l}, but ${x.right} = ${x.r}. The two sides are different.` : `Both sides equal ${x.l}, so it is true.`;
  if (x.t === "story") {
    if (/ \+ /.test(pp) && x.op !== "+") return x.op === "×" ? "Equal bags means multiply, not add." : "Something was taken away, so it needs −, not +.";
    if (/ − /.test(pp) && x.op === "+") return "The story says more were added, so it needs +.";
    if (/ − /.test(pp) && x.op === "÷") return "Sharing equally means divide, not subtract.";
    if (/ × /.test(pp) && x.op !== "×") return "No equal groups are put together here, so it isn't ×.";
    if (/ ÷ /.test(pp) && x.op === "×") return "The total goes after the = sign. This equation has it in the wrong place.";
    return "The numbers are in the wrong places for this story.";
  }
  const p = xNum(picked); if (p == null || p === +q.ans) return null;
  const v = V24_f(x, p); if (!isFinite(v) || v !== Math.floor(v)) return `${x.s.replace(x.L, p)} isn't a whole number, so ${x.L} can't be ${p}.`;
  return `If ${x.L} were ${p}, then ${x.s.replace(x.L, p)} = ${v}, not ${x.c}.`;
});

/* =====================================================================
   AGE 9 · Multi-Step Word Problems
   ===================================================================== */
const V24_STORY9 = [
  () => { const b = R(4, 9), k = pick([12, 15, 20, 24, 25]), c = R(3, 6), g = R(4, 9), t = b * k, a = t - c * g; if (a <= 0) return null;
    return { e: "✏️", q: `A school buys ${b} boxes of pencils with ${k} pencils in each box. Each of ${c} classes gets ${g} pencils. How many pencils are left?`, a, why: `${b} × ${k} = ${t}. ${c} × ${g} = ${c * g}. ${t} − ${c * g} = ${a}.`,
      m: [[t, `${t} is all the pencils. Take away the ${c * g} given to the classes.`], [t - g, `${t} − ${g} gives pencils to only 1 class. There are ${c} classes.`], [t - c - g, `Each class gets ${g}, so ${c} × ${g} = ${c * g} pencils are given away.`]] }; },
  () => { const w = V24_who(), a1 = R(6, 25), m = R(3, 6), b = a1 * m, a = a1 + b;
    return { e: "🃏", q: `${w} has ${a1} cards. Jada has ${m} times as many cards as ${w}. How many cards do they have together?`, a, why: `Jada: ${m} × ${a1} = ${b}. Together: ${a1} + ${b} = ${a}.`,
      m: [[b, `${b} is only Jada's cards. Add ${w}'s ${a1} cards.`], [a1 + m, `"${m} times as many" means multiply: ${m} × ${a1} = ${b}.`]] }; },
  () => { const k = pick([4, 5, 6, 7, 8]), t = k * R(4, 9) + R(1, k - 1), q = Math.floor(t / k), a = q + 1;
    return { e: "🚗", q: `${t} people need rides to the game. Each car holds ${k} people. How many cars are needed so everyone gets a ride?`, a, why: `${t} ÷ ${k} = ${q} R${t % k}. The ${t % k} extra people need one more car, so ${a} cars.`,
      m: [[q, `${q} cars leave ${t % k} people with no ride. They need 1 more car.`], [t % k, `${t % k} is the remainder (people left over), not the number of cars.`]] }; },
  () => { const w = V24_who(), k = R(2, 4), p = R(3, 9), q = R(1, 5), cost = k * p + q, m = pick([20, 30, 40, 50].filter(x => x > cost)), a = m - cost;
    return { e: "📓", q: `${w} buys ${k} notebooks for $${p} each and a pen for $${q}. ${w} pays with $${m}. How much change does ${w} get?`, a, pre: "$", why: `${k} × $${p} = $${k * p}. $${k * p} + $${q} = $${cost}. $${m} − $${cost} = $${a}.`,
      m: [[cost, `$${cost} is the total cost. The change is what's left from $${m}.`], [m - p - q, `That pays for only 1 notebook. ${w} buys ${k}.`], [m - k * p, `Don't forget the $${q} pen.`]] }; },
  () => { const w = V24_who(), s = R(4, 9), wk = R(4, 12), h = R(5, 40), c = h + s * wk;
    return { e: "🚲", q: `${w} has $${h} and saves $${s} each week. How many weeks until ${w} has $${c} for a new bike?`, a: wk, why: `$${c} − $${h} = $${c - h} still needed. $${c - h} ÷ $${s} = ${wk} weeks.`,
      m: [[Math.floor(c / s), `That forgets the $${h} ${w} already has. Subtract it first.`], [c - h, `$${c - h} is the money still needed, not the number of weeks.`]] }; },
  () => { const r = R(12, 25), s = R(12, 30), f = R(40, r * s - 20), t = r * s, a = t - f;
    return { e: "🎭", q: `A theater has ${r} rows with ${s} seats in each row. ${f} seats are filled. How many seats are empty?`, a, why: `${r} × ${s} = ${t} seats. ${t} − ${f} = ${a} empty.`,
      m: [[t, `${t} is every seat. Take away the ${f} filled ones.`], [r + s, `Rows with ${s} seats each means multiply: ${r} × ${s}.`]] }; },
  () => { const w = V24_who(), k = pick([6, 8, 10, 12]), p = R(4, 9), f = R(3, 6), g = R(2, Math.floor(k * p / f) - 1), t = k * p, a = t - f * g; if (a <= 0) return null;
    return { e: "🌟", q: `Sticker packs have ${k} stickers each. ${w} buys ${p} packs and gives ${g} stickers to each of ${f} friends. How many stickers does ${w} keep?`, a, why: `${p} × ${k} = ${t}. ${f} × ${g} = ${f * g}. ${t} − ${f * g} = ${a}.`,
      m: [[t, `${t} is before giving any away.`], [t - g, `${t} − ${g} gives to only 1 friend. ${w} gives to ${f}.`]] }; },
  () => { const d = R(35, 95), n = R(3, 6), x = R(10, 60), a = d * n + x;
    return { e: "🚌", q: `A bus drives ${d} miles each day for ${n} days. Then it drives ${x} more miles. How many miles does it drive in all?`, a, unit: " miles", why: `${d} × ${n} = ${d * n}. ${d * n} + ${x} = ${a}.`,
      m: [[d * n, `${d * n} forgets the last ${x} miles.`], [d + n + x, `${d} miles each day for ${n} days means multiply: ${d} × ${n}.`]] }; },
  () => { const w = V24_who(), e = R(3, 8), g = R(4, 9), x = R(1, 9), t = e * g + x;
    return { e: "🍪", q: `${w} baked ${t} cookies. ${w} put ${e} cookies in each bag, made as many full bags as possible, and ate the rest. How many cookies did ${w} eat?`, a: x, why: `${t} ÷ ${e} = ${g} R${x}. ${g} full bags, and ${x} cookies were left to eat.`,
      m: [[g, `${g} is the number of full bags, not the cookies left over.`], [t - e, `That fills only 1 bag. ${w} filled ${g} bags.`]] }; },
  () => { const k = R(3, 6), p = R(12, 30), w2 = R(2, 4), a = k * p * w2;
    return { e: "📦", q: `A store gets ${k} boxes of juice each day. Each box has ${p} juice cups. How many juice cups does the store get in ${w2} days?`, a, why: `${k} × ${p} = ${k * p} cups a day. ${k * p} × ${w2} = ${a}.`,
      m: [[k * p, `${k * p} is only 1 day. Multiply by ${w2} days.`], [k * p + w2, `Each day brings ${k * p} cups, so multiply by ${w2}, don't add.`]] }; },
  () => { const w = V24_who(), m = R(2, 5), b = R(15, 60), a1 = b * m, a = a1 - b;
    return { e: "🐚", q: `Jada collected ${a1} shells. That is ${m} times as many as ${w} collected. How many more shells did Jada collect than ${w}?`, a, why: `${w}: ${a1} ÷ ${m} = ${b}. ${a1} − ${b} = ${a} more.`,
      m: [[b, `${b} is how many ${w} collected. "How many more" means subtract: ${a1} − ${b}.`], [a1 * m, `"${m} times as many" means Jada has more. Divide to find ${w}'s shells.`]] }; },
];
topic(9, "math", {
  id: "multistep", title: "Multi-Step Word Problems", icon: "🧩", blurb: "Plan the steps, then solve and check.",
  lesson: [
    { t: "Make a plan", say: "Big word problems have more than one step. Read the whole problem. Underline what you know and circle the question.", html: bigEmo("✏️") + note("<b>Know:</b> 6 boxes of 24 pencils, 4 classes get 30 each<br><b>Find:</b> pencils left") },
    { t: "One step at a time", say: "Step 1: 6 times 24 is 144 pencils. Step 2: 4 times 30 is 120 pencils given out. Step 3: 144 minus 120 is 24 left.", html: eq("6 × 24 = 144") + eq("4 × 30 = 120") + eq("144 − 120 = <b>24</b>") },
    { t: "Remainders and checking", say: "When you divide, think about the remainder. If 26 people ride in cars of 4, 6 cars leave 2 people behind, so you need 7 cars. Always ask: does my answer make sense?", html: eq("26 ÷ 4 = 6 R2") + note("2 people still need a ride → <b>7 cars</b>") },
  ],
  gen() {
    let s = null; while (!s) s = pick(V24_STORY9)();
    const pre = s.pre || "", u = s.unit || "", m = s.m.filter(x => x[0] >= 0);
    return { q: s.q, vis: bigEmo(s.e), opts: V24_opts(s.a, m, Math.max(3, Math.round(s.a / 10)), 0).map(o => pre + o + u), ans: pre + s.a + u, big: 1, why: s.why, key: "ms" + s.q.replace(/\D+/g, "-"), v24: { m: V24_miss(m) } };
  },
});
TRICK_ADD(9, "math", "multistep", "Plan first: What do I know? What's the question? Solve one step at a time, then ask: does my answer make sense?");
whyRule(9, "math", "multistep", V24_numReason);

/* =====================================================================
   AGE 9 · Line Graphs & Grids
   ===================================================================== */
const V24_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"], V24_DAYW = { Mon: "Monday", Tue: "Tuesday", Wed: "Wednesday", Thu: "Thursday", Fri: "Friday" };
const V24_LG = [
  ["Noon temperature", "°F", "degrees", V24_DAYS, 40, 80, 5],
  ["Plant height", " cm", "centimeters", ["Wk 1", "Wk 2", "Wk 3", "Wk 4", "Wk 5"], 2, 30, 2],
  ["Books sold", "", "books", V24_DAYS, 10, 60, 5],
  ["Puppy's weight", " lb", "pounds", ["Jan", "Feb", "Mar", "Apr", "May"], 4, 30, 2],
];
const V24_EMO = ["🍎", "⭐", "🐶", "🏠", "🌳", "🎈", "🚗", "🐱", "⚽", "🌸"];
const V24_EN = { "🍎": "apple", "⭐": "star", "🐶": "dog", "🏠": "house", "🌳": "tree", "🎈": "balloon", "🚗": "car", "🐱": "cat", "⚽": "ball", "🌸": "flower" };
function V24_lgData(lo, hi, step, n, grow) {
  for (;;) { const v = Array.from({ length: n }, () => lo + R(0, Math.floor((hi - lo) / step)) * step); if (grow) v.sort((x, y) => x - y);
    if (grow && new Set(v).size !== n) continue;
    const ups = v.slice(1).map((x, i) => x - v[i]), mxU = Math.max(...ups);
    if (new Set(v).size >= 4 && mxU > 0 && ups.filter(x => x === mxU).length === 1 && v.filter(x => x === Math.max(...v)).length === 1 && v.filter(x => x === Math.min(...v)).length === 1) return v; }
}
const V24_lab = l => V24_DAYW[l] || l.replace("Wk", "Week").replace("Jan", "January").replace("Feb", "February").replace("Mar", "March").replace("Apr", "April");
topic(9, "math", {
  id: "linegraph", title: "Line Graphs & Grids", icon: "📈", blurb: "Read line graphs and find points on a grid.",
  lesson: [
    { t: "Line graphs show change", say: "A line graph shows how something changes over time. Find the day at the bottom, go up to the dot, then look across to read the number.", html: V24_lineGraph(V24_DAYS, [50, 55, 65, 60, 70], "Noon temperature", "°F", 5) },
    { t: "Up, down, and how much", say: "When the line goes up, the number grew. To find how much it changed, subtract. From Tuesday to Wednesday it went from 55 to 65. That's 10 degrees warmer.", html: eq("65 − 55 = <b>10°</b> warmer") },
    { t: "Points on a grid", say: "A point on a grid has two numbers, like 3 comma 2. The first number tells how far to go across. The second tells how far to go up. Across first, then up!", html: V24_grid([["⭐", 3, 2]], 5) + eq("(3, 2) → 3 across, 2 up") },
  ],
  gen() {
    if (Math.random() < 0.55) {
      const [title, u, word, labs, lo, hi, step] = pick(V24_LG), v = V24_lgData(lo, hi, step, labs.length, /height|weight/i.test(title)), vis = V24_lineGraph(labs, v, title, word, step), key = "lg" + title + v.join(","), k = R(0, 3);
      const f = x => `${x}${u}`;
      if (k === 0) { const i = R(0, labs.length - 1);
        return { q: `What was the ${title.toLowerCase()} ${V24_DAYW[labs[i]] ? "on" : "in"} <b>${V24_lab(labs[i])}</b>?`, vis, opts: V24_opts(v[i], [[v[i - 1] ?? -1], [v[i + 1] ?? -1], [v[i] + step]], step, 0).map(f), ans: f(v[i]), big: 1, why: `Go up from ${V24_lab(labs[i])} to the dot, then across: ${v[i]}${u}.`, key: key + "r" + i, v24: { t: "lg", ask: "read", v, labs, i } }; }
      if (k === 1) { const big = Math.random() < 0.5, val = big ? Math.max(...v) : Math.min(...v), i = v.indexOf(val), others = shuffle(labs.filter((_, j) => j !== i)).slice(0, 3);
        return { q: `${/Wk/.test(labs[0]) ? "In which week" : /Jan/.test(labs[0]) ? "In which month" : "On which day"} was the ${title.toLowerCase()} the <b>${big ? "highest" : "lowest"}</b>?`, vis, opts: shuffle([labs[i], ...others]).map(V24_lab), ans: V24_lab(labs[i]), why: `The ${big ? "highest" : "lowest"} dot is at ${V24_lab(labs[i])}: ${v[i]}${u}.`, key: key + (big ? "h" : "l"), v24: { t: "lg", ask: big ? "high" : "low", v, labs } }; }
      if (k === 2) { const ups = v.slice(1).map((x, j) => x - v[j]), i = ups.indexOf(Math.max(...ups)), pairs = labs.slice(1).map((l, j) => `${V24_lab(labs[j])} to ${V24_lab(l)}`);
        return { q: `Between which two ${/Wk/.test(labs[0]) ? "weeks" : /Jan/.test(labs[0]) ? "months" : "days"} did it go <b>up the most</b>?`, vis, opts: shuffle([pairs[i], ...shuffle(pairs.filter((_, j) => j !== i)).slice(0, 3)]), ans: pairs[i], why: `The line is steepest from ${pairs[i]}: ${v[i + 1]} − ${v[i]} = ${ups[i]}${u}.`, key: key + "u", v24: { t: "lg", ask: "up", ups, pairs } }; }
      let i, j, g = 0; do { i = R(0, labs.length - 1); j = R(0, labs.length - 1); g++; } while (g < 40 && (i === j || v[i] === v[j]));
      if (v[i] < v[j]) [i, j] = [j, i]; const d = v[i] - v[j];
      const pr = V24_DAYW[labs[0]] ? "on" : "in";
      return { q: `How much ${/weight|height/i.test(title) ? "more" : "higher"} was the ${title.toLowerCase()} ${pr} <b>${V24_lab(labs[i])}</b> than ${pr} <b>${V24_lab(labs[j])}</b>?`, vis, opts: V24_opts(d, [[v[i] + v[j]], [v[i]], [d + step]], step, 1).map(f), ans: f(d), big: 1, why: `${v[i]} − ${v[j]} = ${d}${u}.`, key: key + "d" + i + j, v24: { t: "lg", ask: "diff", a: v[i], b: v[j], d, v, labs, ia: i, ib: j } };
    }
    /* coordinate grid */
    const n = 6, items = [], used = new Set();
    for (const e of shuffle(V24_EMO).slice(0, 4)) { let a, b; do { a = R(0, n); b = R(1, n); } while (used.has(a + "," + b) || used.has(b + "," + a) || a === b); used.add(a + "," + b); items.push([e, a, b]); }
    const vis = V24_grid(items, n), [e, a, b] = pick(items), key = "cg" + items.map(x => x.join("")).join("|");
    if (Math.random() < 0.5) {
      const wrong = [`(${b}, ${a})`, `(${a + 1}, ${b})`, `(${a}, ${b - 1})`, `(${a + 1}, ${b + 1})`].filter(x => !/-|\(7|, 7/.test(x) && x !== `(${a}, ${b})`);
      return { q: `What are the coordinates of the ${V24_EN[e]} ${e}?`, say: `What are the coordinates of the ${V24_EN[e]}?`, vis, opts: shuffle([`(${a}, ${b})`, ...[...new Set(wrong)].slice(0, 3)]), ans: `(${a}, ${b})`, why: `The ${V24_EN[e]} is ${a} across and ${b} up, so it is at (${a}, ${b}).`, key: key + "c" + e, v24: { t: "cg", ask: "coord", a, b, e } };
    }
    const others = items.filter(x => x[0] !== e).map(x => x[0]);
    return { q: `What is at point <b>(${a}, ${b})</b>?`, say: `What is at point ${a} comma ${b}?`, vis, opts: shuffle([e, ...others]).map(x => `<span class="emo" title="${V24_EN[x]}">${x}</span>`), ans: `<span class="emo" title="${V24_EN[e]}">${e}</span>`, why: `Go ${a} across, then ${b} up. You land on the ${V24_EN[e]}.`, key: key + "p" + a + b, v24: { t: "cg", ask: "what", a, b, items } };
  },
});
TRICK_ADD(9, "math", "linegraph", "Line graph: find the label at the bottom, go up to the dot, then look across. Grid points: across first, then up, like (across, up).");
whyRule(9, "math", "linegraph", (q, picked) => {
  const x = q.v24; if (!x) return null; const pp = xPlain(picked);
  if (x.t === "cg") {
    if (x.ask === "coord") { const m = pp.match(/\((\d+), (\d+)\)/); if (!m) return null; const [pa, pb] = [+m[1], +m[2]];
      if (pa === x.b && pb === x.a) return `(${pa}, ${pb}) swaps the numbers. Across comes first, then up.`;
      return `(${pa}, ${pb}) is ${pa} across and ${pb} up. The ${V24_EN[x.e]} is ${pa === x.a ? "" : `${x.a} across`}${pa !== x.a && pb !== x.b ? " and " : ""}${pb === x.b ? "" : `${x.b} up`}.`; }
    const it = (x.items || []).find(i => String(picked).includes(i[0])); if (!it) return null;
    if (it[1] === x.b && it[2] === x.a) return `The ${V24_EN[it[0]]} is at (${it[1]}, ${it[2]}). That swaps across and up.`;
    return `The ${V24_EN[it[0]]} is at (${it[1]}, ${it[2]}), not (${x.a}, ${x.b}).`;
  }
  if (x.ask === "read") { const p = V24_n(picked); if (p == null) return null; const j = x.v.indexOf(p); if (j >= 0 && j !== x.i) return `${p} is the dot for ${V24_lab(x.labs[j])}, not ${V24_lab(x.labs[x.i])}.`; return `Go straight up from ${V24_lab(x.labs[x.i])} to its dot, then look across. It's ${x.v[x.i]}, not ${p}.`; }
  if (x.ask === "high" || x.ask === "low") { const j = x.labs.map(V24_lab).indexOf(pp); if (j < 0) return null; return `${pp} is at ${x.v[j]}. Another dot is ${x.ask === "high" ? "higher" : "lower"}.`; }
  if (x.ask === "up") { const j = x.pairs.indexOf(pp); if (j < 0) return null; const u = x.ups[j]; return u <= 0 ? `From ${pp} the line goes ${u < 0 ? "down" : "flat"}, not up.` : `From ${pp} it went up ${u}, but another part went up more.`; }
  if (x.ask === "diff") { const p = V24_n(picked); if (p == null) return null; if (p === x.a + x.b) return `${p} adds the two numbers. "How much higher" means subtract.`; if (p === x.a) return `${p} is just one reading. Subtract the other: ${x.a} − ${x.b}.`; return `${x.a} − ${x.b} = ${x.d}, not ${p}.`; }
  return null;
});

/* =====================================================================
   AGE 9 · Solve for the Letter (two steps, and "times as many")
   ===================================================================== */
topic(9, "math", {
  id: "solveletter", title: "Solve for the Letter", icon: "🔍", blurb: "Two-step equations and \"times as many\".",
  lesson: [
    { t: "Two steps to undo", say: "In 3 times n plus 4 equals 19, two things happen to n: it is multiplied by 3, then 4 is added. To find n, undo them in reverse order.", html: eq("3 × n + 4 = 19") },
    { t: "Undo backward", say: "First undo the plus 4: 19 minus 4 is 15. Then undo the times 3: 15 divided by 3 is 5. So n is 5. Check: 3 times 5 plus 4 is 19.", html: eq("19 − 4 = 15") + eq("15 ÷ 3 = <b>5</b>") + eq("Check: 3 × 5 + 4 = 19 ✔") },
    { t: "Times as many", say: "If Max has 4 times as many shells as Ava, and Ava has 6, then Max has 4 times 6. We can write m equals 4 times 6. m is 24.", html: eq("m = 4 × 6") + eq("m = <b>24</b>") },
  ],
  gen() {
    const L = pick(V24_L), k = R(0, 9);
    if (k <= 2) { const a = R(2, 9), n = R(2, 12), b = R(1, 20), c = a * n + b;
      return { q: `What is <b>${L}</b>?`, say: `${a} times ${L} plus ${b} equals ${c}. What is ${L}?`, vis: eq(`${a} × ${L} + ${b} = ${c}`), opts: V24_opts(n, [[c - b, `${c - b} only undoes the + ${b}. Still divide by ${a}.`], [(c + b) % a === 0 ? (c + b) / a : -1, `Undo + ${b} by subtracting, not adding.`], [c % a === 0 ? c / a : -1, `Undo the + ${b} first, then divide.`]], 2, 1), ans: String(n), big: 1, why: `${c} − ${b} = ${c - b}, then ${c - b} ÷ ${a} = ${n}. Check: ${a} × ${n} + ${b} = ${c}.`, key: "s1" + a + b + c, v24: { t: "eq", L, fm: "a*L+b", a, b, s: `${a} × ${L} + ${b}`, c } }; }
    if (k <= 4) { const a = R(2, 9), n = R(3, 12), b = R(1, a * n - 1), c = a * n - b;
      return { q: `What is <b>${L}</b>?`, say: `${a} times ${L} minus ${b} equals ${c}. What is ${L}?`, vis: eq(`${a} × ${L} − ${b} = ${c}`), opts: V24_opts(n, [[c + b, `${c + b} only undoes the − ${b}. Still divide by ${a}.`], [(c - b) > 0 && (c - b) % a === 0 ? (c - b) / a : -1, `Undo − ${b} by adding, not subtracting.`]], 2, 1), ans: String(n), big: 1, why: `${c} + ${b} = ${c + b}, then ${c + b} ÷ ${a} = ${n}. Check: ${a} × ${n} − ${b} = ${c}.`, key: "s2" + a + b + c, v24: { t: "eq", L, fm: "a*L-b", a, b, s: `${a} × ${L} − ${b}`, c } }; }
    if (k === 5) { const d = R(2, 9), q2 = R(2, 12), n = d * q2, b = R(1, 20), c = q2 + b;
      return { q: `What is <b>${L}</b>?`, say: `${L} divided by ${d}, plus ${b}, equals ${c}. What is ${L}?`, vis: eq(`${L} ÷ ${d} + ${b} = ${c}`), opts: V24_opts(n, [[c - b, `${c - b} is ${L} ÷ ${d}. Multiply by ${d} to find ${L}.`], [(c + b) * d, `Undo + ${b} by subtracting, not adding.`], [c * d, `Undo the + ${b} first, then multiply.`]], d, 1), ans: String(n), big: 1, why: `${c} − ${b} = ${q2}, then ${q2} × ${d} = ${n}. Check: ${n} ÷ ${d} + ${b} = ${c}.`, key: "s3" + d + b + c, v24: { t: "eq", L, fm: "L/a+b", a: d, b, s: `${L} ÷ ${d} + ${b}`, c } }; }
    if (k === 6) { const a = R(2, 9), b = R(2, 9), p = a * b, x2 = R(2, p - 2), n = p - x2;
      return { q: `What is <b>${L}</b>?`, say: `${L} plus ${x2} equals ${a} times ${b}. What is ${L}?`, vis: eq(`${L} + ${x2} = ${a} × ${b}`), opts: V24_opts(n, [[p, `${p} is ${a} × ${b}. ${L} is what you add to ${x2} to get ${p}.`], [p + x2, `Undo + ${x2} by subtracting.`]], 2, 0), ans: String(n), big: 1, why: `${a} × ${b} = ${p}, then ${p} − ${x2} = ${n}.`, key: "s4" + a + b + x2, v24: { t: "eq", L, fm: "L+a", a: x2, s: `${L} + ${x2}`, c: p } }; }
    const w = V24_who(), m = R(2, 9), a = R(3, 12), L2 = pick(["m", "j", "t", "s"]);
    if (k <= 8) {
      return { q: `${w} has ${a} shells. Jada has ${m} times as many shells as ${w}. Which equation shows <b>${L2}</b>, the number of Jada's shells?`, vis: bigEmo("🐚"), opts: shuffle([`${L2} = ${m} × ${a}`, `${L2} = ${m} + ${a}`, `${a} = ${m} × ${L2}`, `${L2} = ${a} − ${m}`]), ans: `${L2} = ${m} × ${a}`, why: `"${m} times as many" means multiply: ${L2} = ${m} × ${a} = ${m * a}.`, key: "s5" + m + a + L2, v24: { t: "times", m, a } };
    }
    const b = a * m;
    return { q: `Jada has ${b} stickers. That is ${m} times as many as ${w} has. How many stickers does ${w} have?`, say: `Jada has ${b} stickers. That is ${m} times as many as ${w} has. How many stickers does ${w} have?`, vis: eq(`${m} × ${L2} = ${b}`), opts: V24_opts(a, [[b * m, `Jada has more, so ${w} has fewer than ${b}. Divide.`], [b - m, `"${m} times as many" means divide by ${m}, not subtract ${m}.`]], 2, 1), ans: String(a), big: 1, why: `${m} × ${L2} = ${b}, so ${L2} = ${b} ÷ ${m} = ${a}.`, key: "s6" + m + a, v24: { t: "eq", L: L2, fm: "a*L", a: m, s: `${m} × ${L2}`, c: b } };
  },
});
TRICK_ADD(9, "math", "solveletter", "Undo in reverse order: undo + or − first, then × or ÷. Put your answer back in to check. \"Times as many\" means multiply.");
whyRule(9, "math", "solveletter", (q, picked) => {
  const x = q.v24; if (!x) return null; const pp = xPlain(picked);
  if (x.t === "times") { if (/ \+ /.test(pp)) return `"Times as many" means multiply, not add.`; if (/ − /.test(pp)) return "Jada has more, and \"times as many\" means multiply, not subtract."; return `This says ${x.a} is ${x.m} times Jada's shells. It's the other way around.`; }
  const p = xNum(picked); if (p == null || p === +q.ans) return null;
  const v = V24_f(x, p); if (!isFinite(v) || v !== Math.floor(v)) return `${p} ÷ ${x.a} isn't a whole number, so ${x.L} can't be ${p}.`;
  return `If ${x.L} were ${p}, then ${x.s.replace(x.L, p)} = ${v}, not ${x.c}.`;
});


/* ===== v25: more questions for every topic ===== */
