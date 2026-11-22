/* =====================================================================
   v40: two new subjects — Science 🔬 and Social Studies 🌎 — for ages 6–9.
   Topics follow US grade 1–4 standards (NGSS for science, C3 framework for
   social studies). Every question has a reason for each wrong answer (whyNot).
   ===================================================================== */
for (const a of [6, 7, 8, 9]) { C[a].science = []; C[a].social = []; TRICKS[a].science = {}; TRICKS[a].social = {}; }
const V40_E = (e, n) => e ? `<span class="emo" title="${n}">${e}</span>` : "";
const V40_O = (e, n) => e ? `${V40_E(e, n)} ${n}` : n;
const V40_an = w => (/^[aeiou]/i.test(w) && !/^(uni|use|eu|one)/i.test(w) ? "an " : "a ") + w;
const V40_list = a => a.length <= 2 ? a.join(" and ") : `${a.slice(0, -1).join(", ")}, and ${a[a.length - 1]}`;
const V40_Q = o => Object.assign({ v40: { xo: "reveal" } }, o);

/* ---- builder: sort things into groups ----
   items: [name, emoji, groupKey]; groups: {key: [singular phrase, plural phrase]} */
function V40_sort(items, groups, kid) {
  const keys = Object.keys(groups), g = pick(keys), others = items.filter(x => x[2] !== g), ins = items.filter(x => x[2] === g);
  const lab = x => V40_O(x[1], cap(x[0])), whyNot = {};
  const fmt = keys.length === 2 && Math.random() < 0.3 ? "ask" : Math.random() < 0.6 ? "is" : "not";
  if (fmt === "ask") {
    const it = pick(items), opts = keys.map(k => cap(groups[k][2] || groups[k][0].replace(/^(a|an|the) /, "")));
    const ans = cap(groups[it[2]][2] || groups[it[2]][0].replace(/^(a|an|the) /, ""));
    opts.forEach(o => { if (o !== ans) whyNot[o] = `${cap(it[0])}: that's ${groups[it[2]][0]}.`; });
    return V40_Q({ q: `${V40_E(it[1], it[0])} <b>${cap(it[0])}</b>: is it <b>${keys.map(k => (groups[k][2] || groups[k][0]).toLowerCase()).join("</b> or <b>")}</b>?`, opts, ans, why: `${cap(it[0])}: that's ${groups[it[2]][0]}.`, whyNot, key: `${kid}A${it[0]}` });
  }
  if (fmt === "is") {
    const one = pick(ins), three = shuffle(others).slice(0, 3);
    three.forEach(x => { whyNot[lab(x)] = `${cap(x[0])}: that's ${groups[x[2]][0]}, not ${groups[g][0]}.`; });
    return V40_Q({ q: `Which one is <b>${groups[g][0]}</b>?`, opts: shuffle([one, ...three]).map(lab), ans: lab(one), why: `${cap(one[0])}: that's ${groups[g][0]}.`, whyNot, key: `${kid}I${one[0]}${three.map(x => x[0])}` });
  }
  if (!others.length || ins.length < 3 || /\bnon|^not\b/.test(groups[g][0])) return V40_sort(items, groups, kid); /* no double negatives */
  const odd = pick(others), three = shuffle(ins).slice(0, 3);
  three.forEach(x => { whyNot[lab(x)] = `${cap(x[0])}: that IS ${groups[g][0]}. Look for the one that is not.`; });
  return V40_Q({ q: `Which one is <b>NOT</b> ${groups[g][0]}?`, opts: shuffle([odd, ...three]).map(lab), ans: lab(odd), why: `${cap(odd[0])}: that's ${groups[odd[2]][0]}. The others are ${groups[g][1]}.`, whyNot, key: `${kid}N${odd[0]}${three.map(x => x[0])}` });
}
/* ---- builder: match pairs ----
   pairs: [a, aEmoji, b, bEmoji]; ask: {ab: a => question asking for b, ba: b => question asking for a} */
function V40_match(pairs, ask, kid) {
  const p = pick(pairs), rev = ask.ba && Math.random() < 0.4, seen = new Set([rev ? p[0] : p[2]]), pool = [];
  /* wrong options: never another right answer, never the same option twice */
  for (const x of shuffle(pairs.filter(x => x !== p && x[2] !== p[2] && x[0] !== p[0]))) { const v = rev ? x[0] : x[2]; if (!seen.has(v)) { seen.add(v); pool.push(x); } if (pool.length === 3) break; }
  const L = (e, n) => V40_O(e, n), whyNot = {};
  if (!rev) {
    const opts = [L(p[3], p[2]), ...pool.map(x => L(x[3], x[2]))];
    pool.forEach(x => { whyNot[L(x[3], x[2])] = ask.whyB ? ask.whyB(x) : `${cap(x[2])} goes with ${x[0]}, not ${p[0]}.`; });
    return V40_Q({ q: ask.ab(p), vis: p[1] ? `<div class="v27-show sm">${V40_E(p[1], p[0])}</div>` : undefined, opts: shuffle(opts), ans: L(p[3], p[2]), why: ask.why ? ask.why(p) : `${cap(p[0])} goes with ${p[2]}.`, whyNot, key: `${kid}M${p[0]}|${pool.map(x => x[2])}` });
  }
  const opts = [L(p[1], p[0]), ...pool.map(x => L(x[1], x[0]))];
  pool.forEach(x => { whyNot[L(x[1], x[0])] = ask.whyA ? ask.whyA(x) : `${cap(x[0])} goes with ${x[2]}, not ${p[2]}.`; });
  return V40_Q({ q: ask.ba(p), vis: p[3] ? `<div class="v27-show sm">${V40_E(p[3], p[2])}</div>` : undefined, opts: shuffle(opts), ans: L(p[1], p[0]), why: ask.why ? ask.why(p) : `${cap(p[0])} goes with ${p[2]}.`, whyNot, key: `${kid}R${p[2]}|${pool.map(x => x[0])}` });
}
/* ---- builder: put steps in order ----  seqs: [title, [[step, emoji], ...], cyclic?] */
const V40_ORDW = ["first", "second", "third", "fourth", "fifth", "sixth"];
function V40_order(seqs, kid) {
  const [title, st, cyc] = pick(seqs), n = st.length, lab = x => V40_O(x[1], cap(x[0])), whyNot = {};
  const m = pick(["after", "before", "first"]);
  let i, q, ans, j = -1;
  if (m === "first") { i = 0; q = `In ${title}, what comes <b>FIRST</b>?`; }
  else if (m === "after") { j = R(0, cyc ? n - 1 : n - 2); i = (j + 1) % n; q = `In ${title}, what comes right <b>AFTER</b> ${V40_O(st[j][1], st[j][0])}?`; }
  else { j = R(cyc ? 0 : 1, n - 1); i = (j - 1 + n) % n; q = `In ${title}, what comes right <b>BEFORE</b> ${V40_O(st[j][1], st[j][0])}?`; }
  ans = lab(st[i]);
  const others = shuffle(st.filter((_, k) => k !== i && k !== j)).slice(0, 3);
  others.forEach(x => { whyNot[lab(x)] = `${cap(x[0])} is step ${st.indexOf(x) + 1}. The order is ${st.map(y => y[0]).join(" → ")}.`; });
  return V40_Q({ q, opts: shuffle([st[i], ...others]).map(lab), ans, why: `The order is ${st.map(y => y[0]).join(" → ")}${cyc ? ", and then it starts again" : ""}.`, whyNot, key: `${kid}O${title}${m}${i}` });
}
/* ---- builder: fact questions ----  bank: [q, ans, [w1,w2,w3], why, emoji?, [r1,r2,r3]?] */
function V40_fact(bank, kid) {
  const [q, ans, wr, why, e, rs] = pick(bank), whyNot = {};
  wr.forEach((w, i) => { whyNot[w] = rs && rs[i] ? rs[i] : `Not quite. ${why}`; });
  return V40_Q({ q, vis: e ? `<div class="v27-show sm">${e}</div>` : undefined, opts: shuffle([ans, ...wr]), ans, why, whyNot, key: `${kid}F${q}` });
}
/* ---- topic helper ---- */
function V40_topic(age, subj, o) {
  TRICKS[age][subj][o.id] = o.trick;
  const mix = o.mix, tot = mix.reduce((s, x) => s + x[1], 0);
  topic(age, subj, {
    id: o.id, title: o.title, icon: o.icon, blurb: o.blurb, std: o.std, stdName: o.stdName,
    lesson: [L3(`${o.icon} ${o.title}`, o.intro, o.introHtml || `<div class="v27-show">${o.icon}</div>`), L3("👀 Look and learn", o.learn, pics(...o.pics)), L3("💡 Pip's tip", o.trick, `<div class="v27-show sm">🦉💡</div>`)],
    gen: () => { let r = Math.random() * tot; for (const [f, w] of mix) { r -= w; if (r <= 0) return f(); } return mix[0][0](); },
  });
}
