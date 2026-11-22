/* =====================================================================
   Why a wrong answer is wrong: age 6 logic topics.
   groups, shapepat, match, sizes, leftright, shadows, together,
   beforeafter, spotdiff, tworules
   ===================================================================== */

/* ---------- helpers ---------- */
const LG6W_EMO = h => { const m = String(h).match(/<span class="emo[^"]*"[^>]*>([\s\S]*?)<\/span>/); return m ? m[1].trim() : xStrip(h).trim(); };
const LG6W_EMOS = h => [...String(h).matchAll(/<span class="emo[^"]*"[^>]*>([\s\S]*?)<\/span>/g)].map(m => m[1].trim());
const LG6W_LABEL = h => { const m = String(h).match(/aria-label="([^"]+)"/); return m ? m[1] : null; };
const LG6W_LABELS = h => [...String(h).matchAll(/aria-label="([^"]+)"/g)].map(m => m[1]);
const LG6W_TITLE = h => { const m = String(h).match(/title="([^"]+)"/); return m ? m[1] : null; };
const LG6W_SHAPES = ["circle", "triangle", "square", "hexagon", "rectangle", "pentagon"];
const LG6W_COLS = ["orange", "blue", "green", "purple", "yellow"];
/* "big orange circle" -> { size, col, shape } */
const LG6W_PARSE = s => { if (!s) return null; const w = s.split(" "), shape = w.find(x => LG6W_SHAPES.includes(x)), col = w.find(x => LG6W_COLS.includes(x)), size = w.find(x => x === "big" || x === "small"); return shape && col ? { size, col, shape } : null; };
const LG6W_PLURAL = n => /s$/.test(n) && !/(glass|bus|dress|octopus|cactus|hibiscus|grass|compass)$/.test(n) || n === "sunglasses";
const LG6W_ART = n => LG6W_PLURAL(n) || /^(scissors|honey|milk|rain|snow|water|ice|bamboo|cheese|popcorn|tea|wind|sleep|paper|butter|bread|yarn|wood|paint|corn|juice|wheat|batter)$/.test(n) ? n : (/^[aeiou]/.test(n) ? "an " : "a ") + n;
const LG6W_THE = n => n === "sleep" ? "sleep" : "the " + n;

/* ---------- Sorting Groups ---------- */
const LG6W_ONE = { fruits: "a fruit", animals: "an animal", "furry animals": "a furry animal", vehicles: "a vehicle", clothes: "something you wear", "sea animals": "a sea animal", sweets: "a sweet treat", "sports balls": "a sports ball", bugs: "a bug", vegetables: "a vegetable", "music makers": "a music maker" };
const LG6W_CAT = e => LCAT_KEYS.find(k => LCATS[k].some(x => x[0] === e));
whyRule(6, "logic", "groups", (q, picked) => {
  if (!/belongs in this group/i.test(q.q)) return null;
  const shown = [...String(q.vis || "").replace(/<[^>]+>/g, "").matchAll(/\p{Extended_Pictographic}️?/gu)].map(m => m[0]);
  const cats = new Set(shown.map(LG6W_CAT)); if (cats.size !== 1) return null;
  const g = [...cats][0], e = LG6W_EMO(picked), pc = LG6W_CAT(e), name = LG6W_TITLE(picked);
  if (!g || !pc || !name || pc === g) return null;
  /* bugs and sea animals are animals too: never contrast them with a plain or furry animals group */
  if (/animals$/.test(g) && /animals$|^bugs$/.test(pc)) { if (g === "animals" || pc === "animals") return null; }
  return `The ${name} ${LG6W_PLURAL(name) ? "are" : "is"} ${LG6W_ONE[pc]}, but this group is all ${g}.`;
});

/* ---------- Shape Patterns ---------- */
whyRule(6, "logic", "shapepat", (q, picked) => {
  const p = LG6W_PARSE(LG6W_LABEL(picked)), a = LG6W_PARSE(LG6W_LABEL(q.ans)); if (!p || !a) return null;
  const train = LG6W_LABELS(q.vis).map(LG6W_PARSE).filter(Boolean); if (!train.length) return null;
  if (p.shape === a.shape && p.col !== a.col) return `The shape is right, but the color is wrong. The next one is not ${p.col}.`;
  if (p.col === a.col && p.shape !== a.shape) return `The color is right, but the shape is wrong. The next one is not a ${p.shape}.`;
  if (train.some(t => t.shape === p.shape && t.col === p.col)) return `The ${p.col} ${p.shape} is in the pattern, but it does not come next.`;
  return `There is no ${p.col} ${p.shape} anywhere in this pattern.`;
});

/* ---------- Same & Different ---------- */
whyRule(6, "logic", "match", (q, picked) => {
  const p = LG6W_PARSE(LG6W_LABEL(picked)), t = LG6W_PARSE(LG6W_LABEL(q.vis)); if (!p || !t) return null;
  if (p.shape === t.shape && p.col !== t.col) return `It is a ${p.shape}, but it is ${p.col}, not ${t.col}.`;
  if (p.col === t.col && p.shape !== t.shape) return `It is ${p.col}, but it is a ${p.shape}, not a ${t.shape}.`;
  if (p.col !== t.col && p.shape !== t.shape) return `It is ${LG6W_ART(p.col + " " + p.shape)}, so the shape and the color are both different.`;
  return null;
});

/* ---------- Biggest & Smallest ---------- */
whyRule(6, "logic", "sizes", (q, picked) => {
  const ql = xPlain(q.q).toLowerCase(), wantBig = /\b(biggest|bigger)\b/.test(ql), wantSmall = /\b(smallest|smaller)\b/.test(ql);
  if (wantBig === wantSmall) return null;
  /* same picture, different sizes */
  const pz = String(picked).match(/font-size:(\d+)px/), az = String(q.ans).match(/font-size:(\d+)px/);
  if (pz && az) {
    const zs = q.opts.map(o => +(String(o).match(/font-size:(\d+)px/) || [0, 0])[1]), z = +pz[1], mx = Math.max(...zs), mn = Math.min(...zs);
    if (wantBig) return z === mn ? "That is the smallest one, not the biggest." : "That one is a middle size. Another one is bigger.";
    return z === mx ? "That is the biggest one, not the smallest." : "That one is a middle size. Another one is smaller.";
  }
  /* real-life sizes */
  if (!/real life/.test(ql)) return null;
  const pn = LG6W_TITLE(picked), an = LG6W_TITLE(q.ans); if (!pn || !an) return null;
  let rp, ra;
  if (q.opts.length > 2) { const i = SIZE_RANK.findIndex(x => x[1] === pn), j = SIZE_RANK.findIndex(x => x[1] === an); if (i < 0 || j < 0) return null; rp = i; ra = j; }
  else { const i = LGA_SIZE_ALL.find(x => x[1] === pn), j = LGA_SIZE_ALL.find(x => x[1] === an); if (!i || !j) return null; rp = i[2]; ra = j[2]; }
  if (rp === ra) return null;
  if (wantBig && rp < ra) return `In real life, ${LG6W_ART(pn)} is smaller than ${LG6W_ART(an)}.`;
  if (wantSmall && rp > ra) return `In real life, ${LG6W_ART(pn)} is bigger than ${LG6W_ART(an)}.`;
  return null;
});

/* ---------- Left & Right ---------- */
whyRule(6, "logic", "leftright", (q, picked) => {
  const items = LG6W_EMOS(q.vis), e = LG6W_EMO(picked), j = items.indexOf(e); if (j < 0 || items.length < 3) return null;
  const qt = xPlain(q.q).toLowerCase();
  if (/\bfirst\b/.test(qt)) return j === items.length - 1 ? "That one is last, on the right end. First is on the left end." : `That one is in spot ${j + 1}, not on the left end.`;
  if (/\blast\b/.test(qt)) return j === 0 ? "That one is first, on the left end. Last is on the right end." : `That one is in spot ${j + 1}, not on the right end.`;
  const m = String(q.q).match(/just to the <b>(left|right)<\/b> of <span class="emo">([\s\S]*?)<\/span>/); if (!m) return null;
  const left = m[1] === "left", i = items.indexOf(m[2].trim()); if (i < 0) return null;
  if (j === i) return "That is the same one from the question. Look at the one next to it.";
  if (j === (left ? i + 1 : i - 1)) return `That one is next to it on the ${left ? "right" : "left"} side, not the ${left ? "left" : "right"}.`;
  return `That one is in spot ${j + 1}, not right next to spot ${i + 1}.`;
});

/* ---------- Shadow Match ---------- */
const LG6W_SHNAME = e => { const x = SHADOWS.find(s => s[0] === e) || LGA_SHADOWS.find(s => s[0] === e); return x ? x[1] : null; };
whyRule(6, "logic", "shadows", (q, picked) => {
  const t = LG6W_SHNAME(LG6W_EMO(q.vis)); if (!t) return null;
  if (/class="emo shadow"/.test(picked)) {
    const pt = LG6W_TITLE(picked), m = pt && pt.match(/^the shadow of the (.+)$/); if (!m || m[1] === t) return null;
    return `That shadow has the shape of ${LG6W_ART(m[1])}, not ${LG6W_ART(t)}.`;
  }
  const pn = LG6W_TITLE(picked); if (!pn || pn === t) return null;
  return `${cap(LG6W_ART(pn))} has a different shape. This shadow is shaped like ${LG6W_ART(t)}.`;
});

/* ---------- Goes Together ---------- */
whyRule(6, "logic", "together", (q, picked) => {
  const x = LG6W_EMO(q.vis), y = LG6W_EMO(q.ans), pe = LG6W_EMO(picked), pn = LG6W_TITLE(picked); if (!pn) return null;
  for (const L of [PAIRS, LGA_PAIRS]) {
    const hit = L.find(p => (p[0] === x && p[1] === y) || (p[1] === x && p[0] === y)); if (!hit) continue;
    const flip = hit[1] === x, xn = flip ? hit[3] : hit[2];
    const own = L.filter(p => (flip ? p[0] : p[1]) === pe && (flip ? p[2] : p[3]) === pn);
    if (own.length !== 1) return null;
    const partner = flip ? own[0][3] : own[0][2];
    return `${cap(LG6W_THE(pn))} ${LG6W_PLURAL(pn) ? "go" : "goes"} with ${LG6W_THE(partner)}, not with ${LG6W_THE(xn)}.`;
  }
  return null;
});

/* ---------- Before & After ---------- */
/* pairs where "X does not become Y" could be argued (melting, growing, egg sandwiches...): stay quiet */
const LG6W_BA_BLOCK = new Set(["seed|flower", "sprout|tree", "snowman|water", "ice|puddle", "egg|sandwich", "rain|water", "rain|puddle", "snow|rain", "snow|water", "apple tree|fall leaf", "cherry blossom|fall leaf", "seed|sprout", "seed|tree", "tree|wood", "milk|cheese", "clouds|rainbow", "clouds|snowman", "clouds|snow", "water|puddle", "baby|grown-up", "chick|hen", "egg|hen", "wheat|sandwich", "cow|cheese", "sheep|scarf", "yarn|scarf", "sheep|socks", "snow|puddle", "tree|chair", "bricks|house", "wood|house", "sprout|flower", "bean|tree", "bean|flower"]);
const LG6W_BA_OK = (x, y) => !LG6W_BA_BLOCK.has(x + "|" + y);
whyRule(6, "logic", "beforeafter", (q, picked) => {
  const qt = xPlain(q.q).toLowerCase(), shown = LG6W_EMOS(q.vis), pe = LG6W_EMO(picked), pn = LG6W_TITLE(picked), ae = LG6W_EMO(q.ans);
  if (!pn) return null;
  const pl = LG6W_PLURAL, does = n => pl(n) ? "do" : "does", gw = n => `The ${n} ${pl(n) ? "go" : "goes"} with`;
  /* three-step chains: talk about the two pictures the child can see */
  if (shown.length === 2) {
    const k = /\bfirst\b/.test(qt) ? 0 : /\bmiddle\b/.test(qt) ? 1 : /\blast\b/.test(qt) ? 2 : -1; if (k < 0) return null;
    const mine = LGA_CHAINS.find(c => c[k][0] === ae && c.slice(0, 3).filter((_, i) => i !== k).every((s, i) => s[0] === shown[i])); if (!mine) return null;
    const own = LGA_CHAINS.filter(c => c !== mine && c[k][0] === pe && c[k][1] === pn); if (own.length !== 1) return null;
    const c = own[0], n0 = mine[0][1], n1 = mine[1][1], n2 = mine[2][1];
    if (k === 0) { if (!LG6W_BA_OK(pn, n1) || !LG6W_BA_OK(pn, n2)) return null; return `The ${pn} ${does(pn)} not turn into the ${n1}. ${gw(pn)} the ${c[1][1]}.`; }
    if (k === 2) { if (!LG6W_BA_OK(n1, pn) || !LG6W_BA_OK(n0, pn)) return null; return `The ${n1} ${does(n1)} not turn into the ${pn}. ${gw(pn)} the ${c[1][1]}.`; }
    if (!LG6W_BA_OK(n0, pn) || !LG6W_BA_OK(pn, n2)) return null;
    return `The ${pn} ${does(pn)} not fit between the ${n0} and the ${n2}. ${pl(pn) ? "They go" : "It goes"} with the ${c[0][1]}.`;
  }
  if (shown.length !== 1) return null;
  const s = shown[0], next = /\bnext\b/.test(qt);
  for (const L of [BEFOREAFTER, LGA_BA]) {
    const hit = L.find(p => next ? (p[0] === s && p[1] === ae) : (p[1] === s && p[0] === ae)); if (!hit) continue;
    const own = L.filter(p => next ? (p[1] === pe && p[3] === pn) : (p[0] === pe && p[2] === pn)); if (own.length !== 1) return null;
    const o = own[0];
    if (next) { const an = hit[2]; if (!LG6W_BA_OK(an, pn)) return null; return `The ${an} ${does(an)} not turn into the ${pn}. ${gw(pn)} the ${o[2]}.`; }
    const bn = hit[3]; if (!LG6W_BA_OK(pn, bn)) return null;
    return `The ${pn} ${does(pn)} not turn into the ${bn}. ${gw(pn)} the ${o[3]}.`;
  }
  return null;
});

/* ---------- Spot the Difference ---------- */
whyRule(6, "logic", "spotdiff", (q, picked) => {
  const m = xPlain(picked).match(/^Spot (\d+)$/); if (!m) return null;
  const rows = String(q.vis).split(/<div class="line-row">/).slice(1).map(LG6W_EMOS); if (rows.length !== 2) return null;
  const j = +m[1] - 1; if (!rows[0][j] || rows[0][j] !== rows[1][j]) return null;
  return `In spot ${j + 1}, both rows have the same picture. Nothing changed there.`;
});

/* ---------- Two Rules at Once ---------- */
whyRule(6, "logic", "tworules", (q, picked) => {
  const want = LG6W_PARSE(xPlain(q.q).toLowerCase().replace(/[^a-z ]/g, " ").replace(/\s+/g, " ")), p = LG6W_PARSE(LG6W_LABEL(picked));
  if (!want || !p) return null;
  const bad = [];
  if (want.size && p.size && want.size !== p.size) bad.push(`it is ${p.size}, not ${want.size}`);
  if (p.col !== want.col) bad.push(`it is ${p.col}, not ${want.col}`);
  if (p.shape !== want.shape) bad.push(`it is a ${p.shape}, not a ${want.shape}`);
  if (!bad.length) return null;
  return bad.length === 1 ? `This one breaks a rule: ${bad[0]}.` : `This one breaks two rules: ${bad.join(", and ")}.`;
});

