/* =====================================================================
   Pip's Learning Park — curriculum
   Every topic has: id, title, icon, blurb, lesson slides, and gen()
   gen() returns one quiz question:
   { q, say?, vis?, opts:[...], ans, why, big?, extra?, key? }
   ===================================================================== */

/* ---------- small helpers ---------- */
const R = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
const pick = a => a[Math.floor(Math.random() * a.length)];
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const pad2 = n => String(n).padStart(2, "0");
const attr = s => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;");
const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);

/* answer + distractors → 4 unique shuffled strings */
function uniq(ans, cands, fill, max = 4) {
  const out = [String(ans)];
  for (const c of cands) {
    if (out.length >= max) break;
    if (c == null || c === "") continue;
    if (typeof c === "number" && (c < 0 || !isFinite(c))) continue;
    const s = String(c);
    if (!out.includes(s)) out.push(s);
  }
  let g = 0;
  while (out.length < max && fill && g++ < 80) { const c = fill(); if (c != null && !(typeof c === "number" && c < 0) && !out.includes(String(c))) out.push(String(c)); }
  return shuffle(out);
}
const numU = (ans, cands, spread = 3, min = 0) => uniq(ans, cands.filter(c => c >= min), () => { const v = ans + R(-spread, spread); return v >= min ? v : null; });

/* ---------- visual helpers (inline SVG / HTML) ---------- */
const INK = "#1D2B4F";
const FONT = "Fredoka, 'Trebuchet MS', sans-serif";
const svgOpen = (w, h, label, cls = "vis-svg") => `<svg class="${cls}" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${attr(label || "picture")}">`;
const f1 = n => Number(n.toFixed(1));

function chip(w, say, cls = "") { return `<button class="chip ${cls}" data-say="${attr(say || w)}">${w}</button>`; }
function picCard(e, wordHTML, say) { return `<button class="pic-card" data-say="${attr(say)}"><span class="emo xl">${e}</span><span class="pc-word">${wordHTML}</span></button>`; }
function hlFirst(w) { return `<b class="hl">${w[0]}</b>${w.slice(1)}`; }
function hw(text, cls = "") { return `<div class="hw ${cls}">${text}</div>`; }
function bigEmo(e) { return `<span class="emo xxl">${e}</span>`; }
function grp(n, e) { return `<span class="grp">${Array.from({ length: n }, () => `<span>${e}</span>`).join("")}</span>`; }
function crossed(a, b, e) { return `<span class="grp">${Array.from({ length: a }, (_, i) => `<span class="${i >= a - b ? "gone" : ""}">${e}</span>`).join("")}</span>`; }
function eq(s) { return `<div class="eq">${s}</div>`; }
function blank(s = "?") { return `<span class="blank">${s}</span>`; }
function train(cells) { return `<div class="train">${cells.map(c => `<span class="car${c === "?" ? " q" : ""}">${c}</span>`).join("")}</div>`; }
function frac(a, b) { return `<span class="frac"><span>${a}</span><span>${b}</span></span>`; }
/* Find the sentence in a passage that best proves an answer (most shared words). */
function proofSentence(p, ans, bare) {
  const sents = p.match(/[^.!?]+[.!?]+/g) || [p], stop = new Set(["the", "a", "an", "to", "of", "and", "in", "on", "it", "is", "was", "they", "he", "she", "his", "her", "their", "that", "with", "for", "at", "by"]);
  const words = String(ans).toLowerCase().replace(/[^a-z\s']/g, " ").split(/\s+/).filter(w => w.length > 2 && !stop.has(w));
  let best = null, score = 0;
  for (const s of sents) { const l = s.toLowerCase(); const sc = words.reduce((n, w) => n + (l.includes(w.replace(/s$/, "")) ? 1 : 0), 0); if (sc > score) { score = sc; best = s.trim(); } }
  if (!best) return bare ? null : "The answer is in the story.";
  return bare ? `"${best}"` : `The story says: "${best}"`;
}
function passage(p) { return `<div class="passage">${p}</div>`; }
function table(rows, head) { return `<div class="tbl-wrap"><table class="ltable">${head ? `<thead><tr>${head.map(h => `<th>${h}</th>`).join("")}</tr></thead>` : ""}<tbody>${rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`; }
function row(...items) { return `<div class="row-c">${items.join("")}</div>`; }
function col(...items) { return `<div class="col-c">${items.join("")}</div>`; }
function note(s) { return `<div class="tip">${s}</div>`; }
function arrow() { return `<span class="arrow">→</span>`; }

function tenframe(n, e, e2, split) {
  let h = '<div class="tf-wrap">';
  const frames = Math.max(1, Math.ceil(n / 10));
  for (let f = 0; f < frames; f++) {
    h += '<div class="tf">';
    for (let i = 0; i < 10; i++) { const k = f * 10 + i; h += `<span class="tf-c">${k < n ? (split != null && k >= split ? e2 : e) : ""}</span>`; }
    h += "</div>";
  }
  return h + "</div>";
}

function clock(h, m, s = 190, minuteLabels = false) {
  const c = s / 2, r = c - 8;
  let t = svgOpen(s, s, `clock showing ${h}:${pad2(m)}`, "vis-svg clock");
  t += `<circle cx="${c}" cy="${c}" r="${r}" fill="#FFFFFF" stroke="${INK}" stroke-width="${s > 150 ? 6 : 4}"/>`;
  for (let i = 0; i < 60; i++) {
    const a = (i * 6 - 90) * Math.PI / 180, big = i % 5 === 0;
    t += `<line x1="${f1(c + Math.cos(a) * (r - (big ? 9 : 5)))}" y1="${f1(c + Math.sin(a) * (r - (big ? 9 : 5)))}" x2="${f1(c + Math.cos(a) * (r - 2))}" y2="${f1(c + Math.sin(a) * (r - 2))}" stroke="${big ? INK : "#9AAACB"}" stroke-width="${big ? 2.5 : 1.2}"/>`;
  }
  for (let i = 1; i <= 12; i++) {
    const a = (i * 30 - 90) * Math.PI / 180;
    t += `<text x="${f1(c + Math.cos(a) * (r - 24))}" y="${f1(c + Math.sin(a) * (r - 24))}" text-anchor="middle" dominant-baseline="central" font-size="${f1(s * 0.095)}" font-family="${FONT}" font-weight="600" fill="${INK}">${i}</text>`;
    if (minuteLabels) t += `<text x="${f1(c + Math.cos(a) * (r - 44))}" y="${f1(c + Math.sin(a) * (r - 44))}" text-anchor="middle" dominant-baseline="central" font-size="${f1(s * 0.055)}" font-family="${FONT}" fill="#3D7BFF">${pad2((i * 5) % 60)}</text>`;
  }
  const ha = ((h % 12) + m / 60) * 30 - 90, ma = m * 6 - 90;
  const hand = (ang, len, w, colr) => { const a = ang * Math.PI / 180; return `<line x1="${c}" y1="${c}" x2="${f1(c + Math.cos(a) * len)}" y2="${f1(c + Math.sin(a) * len)}" stroke="${colr}" stroke-width="${w}" stroke-linecap="round"/>`; };
  t += hand(ma, r * 0.8, s > 150 ? 5 : 4, "#3D7BFF") + hand(ha, r * 0.5, s > 150 ? 9 : 7, "#FF7A59");
  t += `<circle cx="${c}" cy="${c}" r="${s > 150 ? 7 : 5}" fill="${INK}"/></svg>`;
  return t;
}

function pie(n, k, s = 150, colr = "#3D7BFF") {
  const c = s / 2, r = c - 6;
  let t = svgOpen(s, s, `circle cut into ${n} equal parts, ${k} shaded`);
  if (n === 1) t += `<circle cx="${c}" cy="${c}" r="${r}" fill="${k ? colr : "#fff"}" stroke="${INK}" stroke-width="3"/>`;
  else for (let i = 0; i < n; i++) {
    const a1 = (i / n) * 2 * Math.PI - Math.PI / 2, a2 = ((i + 1) / n) * 2 * Math.PI - Math.PI / 2;
    t += `<path d="M${c},${c} L${f1(c + r * Math.cos(a1))},${f1(c + r * Math.sin(a1))} A${r},${r} 0 ${1 / n > 0.5 ? 1 : 0} 1 ${f1(c + r * Math.cos(a2))},${f1(c + r * Math.sin(a2))} Z" fill="${i < k ? colr : "#fff"}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>`;
  }
  return t + "</svg>";
}

function bar(n, k, w = 280, h = 46, colr = "#3D7BFF") {
  let t = svgOpen(w + 6, h + 6, `bar cut into ${n} equal parts, ${k} shaded`);
  const pw = w / n;
  for (let i = 0; i < n; i++) t += `<rect x="${f1(3 + i * pw)}" y="3" width="${f1(pw)}" height="${h}" fill="${i < k ? colr : "#fff"}" stroke="${INK}" stroke-width="2.5"/>`;
  return t + "</svg>";
}

function blocks(tens, ones) {
  const u = 13, g = 9, H = 10 * u + 4;
  const rodsW = tens * (u + g);
  const onesCols = Math.ceil(ones / 5);
  const W = Math.max(rodsW + (ones ? onesCols * (u + 5) + 4 : 0), 30);
  let s = svgOpen(W, H, `${tens} tens and ${ones} ones`);
  for (let i = 0; i < tens; i++) { const x = 2 + i * (u + g); for (let j = 0; j < 10; j++) s += `<rect x="${x}" y="${2 + j * u}" width="${u}" height="${u}" fill="#3D7BFF" stroke="${INK}" stroke-width="1.2"/>`; }
  for (let i = 0; i < ones; i++) { const cc = Math.floor(i / 5), rr = i % 5; s += `<rect x="${rodsW + 4 + cc * (u + 5)}" y="${H - 2 - u - rr * (u + 3)}" width="${u}" height="${u}" fill="#FFC93C" stroke="${INK}" stroke-width="1.2"/>`; }
  return s + "</svg>";
}

function arrayDots(r, c, colr = "#FF7A59") {
  const sp = 26, W = c * sp + 8, H = r * sp + 8;
  let s = svgOpen(W, H, `${r} rows of ${c} dots`);
  for (let i = 0; i < r; i++) for (let j = 0; j < c; j++) s += `<circle cx="${4 + sp / 2 + j * sp}" cy="${4 + sp / 2 + i * sp}" r="9" fill="${colr}" stroke="${INK}" stroke-width="1.5"/>`;
  return s + "</svg>";
}

function numberLine(a, b, o = {}) {
  const W = 360, pad = o.pad || 22, hasHops = !!o.hops, yy = hasHops ? 68 : 42, H = yy + 34;
  const sx = v => pad + (v - a) / (b - a) * (W - 2 * pad);
  const step = o.step || 1, lab = o.labelEvery || step;
  let s = svgOpen(W, H, `number line from ${a} to ${b}`);
  s += `<line x1="${pad - 10}" y1="${yy}" x2="${W - pad + 10}" y2="${yy}" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`;
  for (let v = a; v <= b + 1e-9; v += step) {
    const x = f1(sx(v)), major = Math.round((v - a) / step) % Math.round(lab / step) === 0;
    s += `<line x1="${x}" y1="${yy - (major ? 9 : 5)}" x2="${x}" y2="${yy + (major ? 9 : 5)}" stroke="${INK}" stroke-width="2"/>`;
    if (major) s += `<text x="${x}" y="${yy + 26}" text-anchor="middle" font-size="${o.fs || 15}" font-family="${FONT}" font-weight="500" fill="${INK}">${o.fmt ? o.fmt(v) : v}</text>`;
  }
  if (hasHops) {
    const { from, n, dir = 1 } = o.hops, colr = dir > 0 ? "#1FAF6E" : "#E5484D";
    for (let i = 0; i < n; i++) {
      const x1 = sx(from + i * dir), x2 = sx(from + (i + 1) * dir), mx = (x1 + x2) / 2;
      s += `<path d="M${f1(x1)},${yy - 5} Q${f1(mx)},${yy - 44} ${f1(x2)},${yy - 5}" fill="none" stroke="${colr}" stroke-width="3" stroke-linecap="round"/><circle cx="${f1(x2)}" cy="${yy - 5}" r="4" fill="${colr}"/>`;
    }
    s += `<circle cx="${f1(sx(from))}" cy="${yy}" r="7" fill="#FFC93C" stroke="${INK}" stroke-width="2"/>`;
  }
  if (o.mark != null) {
    const x = f1(sx(o.mark));
    s += `<circle cx="${x}" cy="${yy}" r="8" fill="#FF7A59" stroke="#fff" stroke-width="2.5"/><text x="${x}" y="${yy - 16}" text-anchor="middle" font-size="17" font-weight="700" font-family="${FONT}" fill="#D9502F">${o.markLabel ?? o.mark}</text>`;
  }
  return s + "</svg>";
}

const SHAPES = [["circle", 0], ["triangle", 3], ["square", 4], ["rectangle", 4], ["pentagon", 5], ["hexagon", 6]];
const SHAPE_COLS = ["#FF7A59", "#3D7BFF", "#1FAF6E", "#9B5DE5", "#FFC93C"];
const SHAPE_COLNAME = { "#FF7A59": "orange", "#3D7BFF": "blue", "#1FAF6E": "green", "#9B5DE5": "purple", "#FFC93C": "yellow" };
function shape(name, colr = "#3D7BFF", s = 120) {
  const c = s / 2; let el;
  if (name === "circle") el = `<circle cx="${c}" cy="${c}" r="${c - 8}"/>`;
  else if (name === "square") { const m = f1(s * 0.14); el = `<rect x="${m}" y="${m}" width="${f1(s - 2 * m)}" height="${f1(s - 2 * m)}" rx="3"/>`; }
  else if (name === "rectangle") el = `<rect x="6" y="${s * 0.27}" width="${s - 12}" height="${s * 0.46}" rx="3"/>`;
  else {
    const n = { triangle: 3, pentagon: 5, hexagon: 6 }[name], rr = c - 8, dy = n === 3 ? rr * 0.22 : 0, pts = [];
    for (let i = 0; i < n; i++) { const a = -Math.PI / 2 + i * 2 * Math.PI / n; pts.push(f1(c + rr * Math.cos(a)) + "," + f1(c + dy + rr * Math.sin(a))); }
    el = `<polygon points="${pts.join(" ")}"/>`;
  }
  return `${svgOpen(s, s, `${SHAPE_COLNAME[colr] ? SHAPE_COLNAME[colr] + " " : ""}${name}`)}<g fill="${colr}" stroke="${INK}" stroke-width="4" stroke-linejoin="round">${el}</g></svg>`;
}

function rectDims(w, h, o = {}) {
  const u = Math.min(230 / w, 150 / h, 30), RW = w * u, RH = h * u, ox = 44, oy = 30;
  const W = RW + ox + 20, H = RH + oy + 20;
  let s = svgOpen(W, H, `rectangle ${w} by ${h}`);
  s += `<rect x="${ox}" y="${oy}" width="${f1(RW)}" height="${f1(RH)}" fill="${o.fill || "#E6EEFF"}" stroke="${INK}" stroke-width="3"/>`;
  if (o.grid) {
    for (let i = 1; i < w; i++) s += `<line x1="${f1(ox + i * u)}" y1="${oy}" x2="${f1(ox + i * u)}" y2="${f1(oy + RH)}" stroke="#7FA2E6" stroke-width="1.2"/>`;
    for (let j = 1; j < h; j++) s += `<line x1="${ox}" y1="${f1(oy + j * u)}" x2="${f1(ox + RW)}" y2="${f1(oy + j * u)}" stroke="#7FA2E6" stroke-width="1.2"/>`;
  }
  const unit = o.unit ? " " + o.unit : "";
  if (o.labels !== false) {
    s += `<text x="${f1(ox + RW / 2)}" y="${oy - 10}" text-anchor="middle" font-size="16" font-family="${FONT}" font-weight="600" fill="${INK}">${w}${unit}</text>`;
    s += `<text x="${ox - 8}" y="${f1(oy + RH / 2)}" text-anchor="end" dominant-baseline="central" font-size="16" font-family="${FONT}" font-weight="600" fill="${INK}">${h}${unit}</text>`;
    if (o.all) {
      s += `<text x="${f1(ox + RW / 2)}" y="${f1(oy + RH + 17)}" text-anchor="middle" font-size="16" font-family="${FONT}" font-weight="600" fill="${INK}">${w}${unit}</text>`;
    }
  }
  return s + "</svg>";
}

function angleSVG(deg, s = 1) {
  const W = 230, H = 140, vx = 115, vy = 118, L = 98;
  const a = deg * Math.PI / 180, x2 = vx + L * Math.cos(a), y2 = vy - L * Math.sin(a);
  let t = `<svg class="vis-svg" viewBox="0 0 ${W} ${H}" width="${W * s}" height="${H * s}" role="img" aria-label="an angle">`;
  if (deg === 90) t += `<path d="M${vx + 20},${vy} L${vx + 20},${vy - 20} L${vx},${vy - 20}" fill="none" stroke="#FF7A59" stroke-width="3"/>`;
  else { const r = 28, ex = vx + r * Math.cos(a), ey = vy - r * Math.sin(a); t += `<path d="M${vx + r},${vy} A${r},${r} 0 0 0 ${f1(ex)},${f1(ey)}" fill="none" stroke="#FF7A59" stroke-width="3"/>`; }
  t += `<line x1="${vx}" y1="${vy}" x2="${vx + L}" y2="${vy}" stroke="${INK}" stroke-width="4" stroke-linecap="round"/><line x1="${vx}" y1="${vy}" x2="${f1(x2)}" y2="${f1(y2)}" stroke="${INK}" stroke-width="4" stroke-linecap="round"/><circle cx="${vx}" cy="${vy}" r="5" fill="${INK}"/></svg>`;
  return t;
}

function decGrid(k) {
  const u = 15, W = 10 * u + 4;
  let s = svgOpen(W, W, `${k} out of 100 squares shaded`);
  for (let i = 0; i < 100; i++) { const cc = Math.floor(i / 10), rr = i % 10; s += `<rect x="${2 + cc * u}" y="${2 + rr * u}" width="${u}" height="${u}" fill="${i < k ? "#9B5DE5" : "#fff"}" stroke="#8A7BB5" stroke-width="1"/>`; }
  return s + `<rect x="2" y="2" width="${10 * u}" height="${10 * u}" fill="none" stroke="${INK}" stroke-width="2.5"/></svg>`;
}

function areaModel(a, b, show) {
  const tens = a - a % 10, ones = a % 10, W = 330, H = 130, bw = 270;
  const wo = Math.max(70, bw * ones / a), wt = bw - wo, x0 = 44, y0 = 32, bh = 80;
  let s = svgOpen(W, H, `area model for ${a} times ${b}`);
  s += `<rect x="${x0}" y="${y0}" width="${f1(wt)}" height="${bh}" fill="#E6EEFF" stroke="${INK}" stroke-width="3"/><rect x="${f1(x0 + wt)}" y="${y0}" width="${f1(wo)}" height="${bh}" fill="#FFF1C9" stroke="${INK}" stroke-width="3"/>`;
  const txt = (x, y, str, sz = 17, col = INK, wgt = 600) => `<text x="${f1(x)}" y="${f1(y)}" text-anchor="middle" dominant-baseline="central" font-size="${sz}" font-family="${FONT}" font-weight="${wgt}" fill="${col}">${str}</text>`;
  s += txt(x0 + wt / 2, y0 - 14, tens, 18, "#3D7BFF", 700) + txt(x0 + wt + wo / 2, y0 - 14, ones, 18, "#C98A00", 700) + txt(x0 - 18, y0 + bh / 2, b, 20, "#D9502F", 700);
  s += txt(x0 + wt / 2, y0 + bh / 2, show ? `${tens} × ${b} = ${tens * b}` : `${tens} × ${b}`, 16) + txt(x0 + wt + wo / 2, y0 + bh / 2, show ? `${ones * b}` : `${ones} × ${b}`, 16);
  return s + "</svg>";
}

function stack(a, b, op, o = {}) {
  const w = Math.max(String(a).length, String(b).length, o.result != null ? String(o.result).length : 0);
  const digits = n => String(n).padStart(w, " ").split("").map(d => `<td>${d.trim()}</td>`).join("");
  const carryRow = o.carry ? `<tr class="carry"><td></td>${String(o.carry).padStart(w, " ").split("").map(d => `<td>${d.trim()}</td>`).join("")}</tr>` : "";
  const res = o.result != null ? digits(o.result) : `<td colspan="${w}" class="qcell">?</td>`;
  return `<table class="stack" aria-label="${a} ${op} ${b}">${carryRow}<tr><td></td>${digits(a)}</tr><tr><td class="op">${op}</td>${digits(b)}</tr><tr class="sum"><td></td>${res}</tr></table>`;
}

const COINS = {
  q: { n: "quarter", v: 25, r: 34, f: "#D6DBE2", s: "#7B8596", t: "#3F4A5C" },
  n: { n: "nickel", v: 5, r: 28, f: "#C3C9D2", s: "#6E788A", t: "#3F4A5C" },
  p: { n: "penny", v: 1, r: 25, f: "#D69163", s: "#8E5530", t: "#5B3218" },
  d: { n: "dime", v: 10, r: 22, f: "#E6E9EE", s: "#8993A3", t: "#3F4A5C" },
};
function coin(k, label = true) {
  const c = COINS[k], S = c.r * 2 + 6, m = S / 2;
  return `<svg class="coin" viewBox="0 0 ${S} ${S}" width="${S}" height="${S}" role="img" aria-label="${c.n}"><circle cx="${m}" cy="${m}" r="${c.r}" fill="${c.f}" stroke="${c.s}" stroke-width="3.5"/><circle cx="${m}" cy="${m}" r="${c.r - 6}" fill="none" stroke="${c.s}" stroke-opacity=".6" stroke-width="1.5" stroke-dasharray="2.5 3"/>${label ? `<text x="${m}" y="${m}" text-anchor="middle" dominant-baseline="central" font-family="${FONT}" font-weight="700" font-size="${f1(c.r * 0.62)}" fill="${c.t}">${c.v}¢</text>` : ""}</svg>`;
}
function coinRow(keys, named, label = true) { return `<div class="coins">${keys.map(k => `<figure>${coin(k, label)}${named ? `<figcaption>${COINS[k].n}</figcaption>` : ""}</figure>`).join("")}</div>`; }

function plates(k, per = 0, e = "🍪") { return `<div class="plates">${Array.from({ length: k }, () => `<span class="plate">${per ? grp(per, e) : ""}</span>`).join("")}</div>`; }

/* sentence-based distractors */
const STOP = new Set(["the", "a", "an", "at", "to", "my", "his", "her", "our", "in", "on", "of", "we", "i", "it", "is", "was", "and", "he", "she", "will", "all"]);
function sentOpts(s, ans, fillers) {
  const ws = [...new Set(s.replace(/[.,!?"]/g, "").split(" ").filter(w => !STOP.has(w.toLowerCase())))].filter(w => w.toLowerCase() !== ans.toLowerCase());
  return uniq(ans, shuffle(ws).concat(shuffle(fillers)));
}
function hlWord(s, w, cls = "hl") { return s.replace(new RegExp(`\\b${w}\\b`), `<b class="${cls}">${w}</b>`); }

/* people & things for word problems */
const KIDS = ["Mia", "Leo", "Sam", "Ava", "Noah", "Zoe", "Omar", "Lily", "Ravi", "Emma", "Kai", "Nora"];
const THINGS = [["🍎", "apples", "apple"], ["⭐", "stars", "star"], ["🐞", "ladybugs", "ladybug"], ["🍓", "strawberries", "strawberry"], ["⚽", "balls", "ball"], ["🐟", "fish", "fish"], ["🌼", "flowers", "flower"], ["🧁", "cupcakes", "cupcake"], ["🦆", "ducks", "duck"], ["🍪", "cookies", "cookie"]];
const pl = (n, t) => n === 1 ? t[2] : t[1];


/* ---------- speech text: how Pip reads a question out loud ---------- */
/* fractions the way children say them: 3/4 → "3 fourths", 1/2 → "1 half", 2 1/2 → "2 and 1 half" */
const FRAC_W = { 2: ["half", "halves"], 3: ["third", "thirds"], 4: ["fourth", "fourths"], 5: ["fifth", "fifths"], 6: ["sixth", "sixths"], 7: ["seventh", "sevenths"], 8: ["eighth", "eighths"], 9: ["ninth", "ninths"], 10: ["tenth", "tenths"], 12: ["twelfth", "twelfths"] };
const fracWord = (n, d) => FRAC_W[d] ? `${n} ${+n === 1 ? FRAC_W[d][0] : FRAC_W[d][1]}` : `${n} over ${d}`;
function clean(t) {
  const bare = String(t).replace(/<\/?[a-zA-Z!][^>]*>/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">").trim();
  if (bare === "<") return "is less than"; if (bare === ">") return "is greater than"; if (bare === "=") return "equals"; if (bare === "+") return "plus";
  return String(t)
    .replace(/<span class="frac"><span>(.*?)<\/span><span>(.*?)<\/span><\/span>/g, " $1/$2 ")
    .replace(/<\/?[a-zA-Z!][^>]*>/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&nbsp;/g, " ")
    .replace(/(\d|\s)\s*<\s*(?=\d|\s)/g, "$1 is less than ").replace(/(\d|\s)\s*>\s*(?=\d|\s)/g, "$1 is greater than ").replace(/\s?≤\s?/g, " is less than or equal to ").replace(/\s?≥\s?/g, " is greater than or equal to ")
    .replace(/_{2,}/g, " blank ").replace(/×/g, " times ").replace(/÷/g, " divided by ").replace(/−/g, " minus ").replace(/=/g, " equals ").replace(/(^|[\s\d(])\s*\+\s*(?=[\d\sa-z(])/gi, "$1 plus ")
    .replace(/(\d)\s?°F\b/g, "$1 degrees").replace(/(\d)\s?°C\b/g, "$1 degrees").replace(/(\d)° (angle|turn)/g, "$1 degree $2").replace(/(\d)°/g, "$1 degrees").replace(/(\d) ?lbs?\b/g, "$1 pounds")
    .replace(/(\d)¢/g, "$1 cents").replace(/\b(\d+) (\d+)\/(\d+)\b/g, (m, w, n, d) => `${w} and ${fracWord(n, d)}`).replace(/\b(\d+)\/(\d+)\b/g, (m, n, d) => fracWord(n, d))
    .replace(/(\d) ?R ?(\d)/g, "$1 remainder $2").replace(/\bcm\b/g, "centimeters")
    .replace(/[\p{Extended_Pictographic}️⃣‍]/gu, "").replace(/&[a-z]+;/g, " ").replace(/\s+/g, " ").replace(/\s+([?.!,;:])/g, "$1").replace(/,([.?!])/g, "$1").replace(/,,+/g, ",").trim();
}
