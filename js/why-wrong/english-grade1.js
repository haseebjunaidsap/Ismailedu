/* =====================================================================
   Why a wrong pick is wrong: Age 6 · English (EN6W_)
   ===================================================================== */
const EN6W_title = h => { const m = String(h).match(/title="([^"]+)"/); return m ? m[1] : ""; };
const EN6W_emo = h => xStrip(h).trim();
const EN6W_BAD = new Set(["sex", "sux", "fux", "hag"]);
const EN6W_art = w => (/^[aeiou]/i.test(w) ? "an " : "a ") + w;

/* ---------- Letter Sounds ---------- */
whyRule(6, "english", "sounds", (q, picked) => {
  if (/start with\?$/.test(q.say || "") && /^What letter/.test(q.q)) {
    const m = q.say.match(/^What letter does (.+) start with\?$/); if (!m) return null;
    const w = m[1], p = xPlain(picked);
    if (!/^[a-z]$/.test(p) || w[0] === p) return null;
    return `${xQ(cap(w))} starts with ${w[0].toUpperCase()}, not ${p.toUpperCase()}.`;
  }
  const m = String(q.q).match(/^Which picture starts with <b>([A-Z])<\/b>\?$/);
  if (m) {
    const w = EN6W_title(picked); if (!w) return null;
    const X = m[1];
    if (w[0].toUpperCase() === X) return null;
    return `${xQ(cap(w))} starts with ${w[0].toUpperCase()}, not ${X}.`;
  }
  return null;
});

/* ---------- Short Vowels ---------- */
whyRule(6, "english", "vowels", (q, picked) => {
  const p = xPlain(picked);
  if (q.q === "Which vowel is missing?") {
    const m = (q.say || "").match(/missing in (\w+)\?$/); if (!m) return null;
    const w = m[1];
    if (!/^[aeiou]$/.test(p) || p === w[1] || w.length !== 3 || EN6W_BAD.has(w[0] + p + w[2])) return null;
    return `With ${p}, it would spell ${xQ(w[0] + p + w[2])}, not ${xQ(w)}.`;
  }
  if (q.q === "Which word matches the picture?") {
    const a = q.ans;
    if (p.length !== 3 || a.length !== 3 || p === a || !/[aeiou]/.test(p[1]) || EN6W_BAD.has(p)) return null;
    return `${xQ(cap(p))} has the short ${p[1]} sound, but this picture needs ${a[1]}.`;
  }
  const m = String(q.q).match(/^Which word has the short <b>([aeiou])<\/b> sound/);
  if (m) {
    const v = m[1];
    if (p.length !== 3 || !/[aeiou]/.test(p[1]) || p[1] === v) return null;
    return `${xQ(cap(p))} has the short ${p[1]} sound, not the short ${v} sound.`;
  }
  return null;
});

/* ---------- Sight Words ---------- */
whyRule(6, "english", "sight", (q, picked) => {
  const p = xPlain(picked);
  if (/^Find the word: /.test(q.say || "")) {
    const w = q.say.replace(/^Find the word: /, "");
    if (!p || p === w) return null;
    return `That word is ${xQ(p)}, but the word you heard was ${xQ(w)}.`;
  }
  const m = (q.say || "").match(/^Which word fits\? (.+)$/); if (!m) return null;
  const s = m[1];
  const row = SIGHT_S.find(r => r[0] === s && r[1] === q.ans && r[2].includes(p));
  if (!row) return null;
  const filled = s.replace("___", p).replace(/"([^"]*)"/g, "‘$1’");
  return `${xQ(filled)} does not sound right.`;
});

/* ---------- Big & Small Letters ---------- */
whyRule(6, "english", "case", (q, picked) => {
  const p = xPlain(picked), Q = String(q.q);
  let m = Q.match(/^Find the small letter for <b>([A-Z])<\/b>$/);
  if (m) {
    if (!/^[a-z]$/.test(p) || p === m[1].toLowerCase()) return null;
    return `Small ${p} goes with big ${p.toUpperCase()}, not big ${m[1]}.`;
  }
  m = Q.match(/^Find the big letter for <b>([a-z])<\/b>$/);
  if (m) {
    if (!/^[A-Z]$/.test(p) || p === m[1].toUpperCase()) return null;
    return `Big ${p} goes with small ${p.toLowerCase()}, not small ${m[1]}.`;
  }
  if (/^Which pair is a big letter/.test(Q)) {
    if (p.length !== 2 || p[0].toLowerCase() === p[1]) return null;
    return `Small ${p[1]} is not the partner of big ${p[0]}. Its partner is big ${p[1].toUpperCase()}.`;
  }
  if (Q === "Is this a big letter or a small letter?") {
    const ch = xPlain(q.vis); if (ch.length !== 1) return null;
    const isBig = ch !== ch.toLowerCase();
    if (p === "big letter" && !isBig) return `This ${ch} is small. Big ${ch.toUpperCase()} looks different.`;
    if (p === "small letter" && isBig) return `This ${ch} is big. Small ${ch.toLowerCase()} looks different.`;
    return null;
  }
  if (Q === "Which sentence is written the right way?") {
    if (p === q.ans) return null;
    const ws = p.split(" "), aw = String(q.ans).split(" ");
    if (ws.length !== aw.length) return null;
    if (/^[a-z]/.test(ws[0]) && ws[0] === aw[0].toLowerCase()) return `${aw[0]} is a name, so it needs a big ${aw[0][0]}.`;
    const last = ws[ws.length - 1].replace(/[.!?]$/, ""), alast = aw[aw.length - 1].replace(/[.!?]$/, "");
    if (ws[0] === aw[0] && last !== alast && last.toLowerCase() === alast) return `${xQ(alast)} is not a name, so it should start with a small ${alast[0]}.`;
    return null;
  }
  return null;
});

/* ---------- Ending Sounds ---------- */
whyRule(6, "english", "endsound", (q, picked) => {
  const m = (q.say || "").match(/^What sound does (.+) end with\?$/); if (!m) return null;
  const w = m[1], last = w.slice(-1), p = xPlain(picked);
  if (!/^[a-z]$/.test(p) || p === last) return null;
  if (last === "x" && (p === "s" || p === "k")) return null; /* x sounds like k-s */
  return `${xQ(cap(w))} ends with ${last}, not ${p}.`;
});

/* ---------- Color Words ---------- */
const EN6W_CEX = { red: "a strawberry is red", orange: "an orange is orange", yellow: "a lemon is yellow", green: "grass is green", blue: "the sky is blue", purple: "an eggplant is purple", brown: "mud is brown", black: "the night sky is black", white: "snow is white" };
whyRule(6, "english", "colors", (q, picked) => {
  const Q = String(q.q);
  if (Q === "What color is this?") {
    const p = xPlain(picked);
    if (!EN6W_CEX[p] || p === q.ans) return null;
    return `This is not ${p}; ${EN6W_CEX[p]}.`;
  }
  let m = Q.match(/^Find the color <b>(\w+)<\/b>$/);
  if (m) {
    const t = EN6W_title(picked);
    if (!t || t === m[1]) return null;
    return `That one is ${t}, not ${m[1]}.`;
  }
  m = Q.match(/^What color (is|are) (.+)\?$/);
  if (m) {
    const p = xPlain(picked); if (!p || p === q.ans) return null;
    const n = m[2].replace(/^(a|an) /, "");
    return `Look at the picture: the ${n} ${m[1]} not ${p}.`;
  }
  m = Q.match(/^Which one is <b>(\w+)<\/b>\?$/);
  if (m) {
    const e = EN6W_emo(picked), t = (typeof EN6_CTHINGS !== "undefined" ? EN6_CTHINGS : []).find(x => x[0] === e);
    if (!t || t[2] === m[1]) return null;
    if (t[0] === "🥥" && m[1] === "white") return null;
    const name = t[1].replace(/^(a|an) /, "");
    return `${t[3] ? "These" : "This"} ${name} ${t[3] ? "are" : "is"} ${t[2]}, so ${t[3] ? "they are" : "it is"} not the ${m[1]} one.`;
  }
  return null;
});

/* ---------- Picture Sentences ---------- */
whyRule(6, "english", "picsent", (q, picked) => {
  const m = (q.say || "").match(/^(.+) Which picture matches\?$/); if (!m) return null;
  const s = m[1].toLowerCase(), name = EN6W_title(picked);
  if (!name || picked === q.ans) return null;
  const toks = name.toLowerCase().split(/\s+/);
  for (const t of toks) { const stem = t.length > 4 ? t.slice(0, 4) : t.replace(/s$/, ""); if (s.includes(stem)) return null; }
  return `The sentence never says ${xQ(name)}, so that picture does not match.`;
});

/* ---------- Word Families ---------- */
const EN6W_fam = w => Object.keys(FAMS).filter(f => w.endsWith(f)).sort((a, b) => b.length - a.length)[0];
whyRule(6, "english", "wordfam", (q, picked) => {
  const p = xPlain(picked);
  let m = String(q.q).match(/^Which word is in the <b>-(\w+)<\/b> family\?$/);
  if (m) {
    const f = m[1]; if (!p || p.endsWith(f)) return null;
    const pf = EN6W_fam(p);
    return pf ? `${xQ(cap(p))} ends with ${pf}, not ${f}.` : `${xQ(cap(p))} does not end with ${f}.`;
  }
  m = (q.say || "").match(/^Which family does (\w+) belong to\?$/);
  if (m) {
    const w = m[1], x = p.replace(/^-/, ""), f = String(q.ans).replace(/^-/, "");
    if (!x || w.endsWith(x) || !w.endsWith(f)) return null;
    return `${xQ(cap(w))} ends with ${f}, not ${x}.`;
  }
  return null;
});

/* ---------- Action Words ---------- */
const EN6W_RISKY = { "🛹": ["ride"], "📖": ["look"], "👀": ["read"], "🤸": ["dance", "jump"], "💃": ["flip"], "🧑‍🏫": ["read", "write"], "⛷️": ["ride"], "🚴": ["skate"] };
const EN6W_ADJ = new Set(["red", "green", "big", "funny", "tall", "happy", "blue", "old", "pretty", "little", "busy", "silly", "brown", "cold", "hot"]);
whyRule(6, "english", "actionwords", (q, picked) => {
  const p = xPlain(picked);
  if (q.q === "What is the action?") {
    const e = EN6W_emo(q.vis);
    if (!p || p === q.ans || (EN6W_RISKY[e] || []).includes(p)) return null;
    return `This picture does not show ${xQ(p)}.`;
  }
  if (/^Which word is an <b>action<\/b>/.test(q.q)) {
    if (!THINGWORDS.includes(p)) return null;
    return `${cap(EN6W_art(p))} is a thing. It is not something you do.`;
  }
  const m = (q.say || "").match(/^(.+) Which word is the action\?$/);
  if (m) {
    if (!p || p === q.ans || !m[1].includes(p)) return null;
    if (/^[A-Z]/.test(p)) return `${p} is a person, not a doing word.`;
    if (EN6W_ADJ.has(p)) return `${xQ(cap(p))} tells what kind, not what someone does.`;
    return `In this sentence, ${xQ(p)} is not the doing word.`;
  }
  return null;
});

/* ---------- Question Words ---------- */
const EN6W_KIND = w => { const r = QWORDS.find(x => x[0] === w); return r ? r[1] : null; };
whyRule(6, "english", "qwords", (q, picked) => {
  const p = xPlain(picked), pk = EN6W_KIND(p), ak = EN6W_KIND(q.ans);
  if (!pk || !ak || p === q.ans) return null;
  let m = (q.say || "").match(/^The answer is (.+)\. Which question word fits\?$/);
  if (m) {
    const it = QW_ITEMS.find(x => x[0] === m[1] && x[1] === q.ans); if (!it) return null;
    return `${p} asks about ${pk}, but ${xQ(m[1])} is ${ak}.`;
  }
  m = (q.say || "").match(/^Which word starts this question\? Blank (.+)$/);
  if (m) {
    const row = QWORDS.find(x => x[0] === q.ans); if (!row) return null;
    const ex = row.slice(2).find(e => e[1] === q.ans + m[1]); if (!ex) return null;
    return `${p} asks about ${pk}, but the answer, ${xQ(ex[2])}, is ${ak}.`;
  }
  return null;
});

/* ---------- ABC Neighbors ---------- */
whyRule(6, "english", "abcnext", (q, picked) => {
  const p = xPlain(picked), P = p.toUpperCase(), pi = ALPHA.indexOf(P);
  if (p.length !== 1 || pi < 0 || p === q.ans) return null;
  const Q = String(q.q);
  let m = Q.match(/^Which letter comes <b>(after|before)<\/b> <b>([A-Za-z])<\/b>\?$/);
  if (m) {
    const dir = m[1], X = m[2], xi = ALPHA.indexOf(X.toUpperCase()), d = pi - xi;
    if (d === 0) return `That is ${X} itself. We need the letter ${dir} it.`;
    if (dir === "after" && d < 0) return `${p} comes before ${X}, not after.`;
    if (dir === "before" && d > 0) return `${p} comes after ${X}, not before.`;
    if (Math.abs(d) === 2) return `${p} is two steps ${dir} ${X}, so it skips a letter.`;
    if (Math.abs(d) > 2) return `${p} is not right next to ${X} in the ABC.`;
    return null;
  }
  m = Q.match(/^Which letter comes <b>between<\/b> <b>([A-Za-z])<\/b> and <b>([A-Za-z])<\/b>\?$/);
  if (m) {
    const a = m[1], b = m[2], ai = ALPHA.indexOf(a.toUpperCase()), bi = ALPHA.indexOf(b.toUpperCase());
    if (pi === ai || pi === bi) return `${p} is one of the two letters on the ends, not the one in the middle.`;
    if (pi > bi) return `${p} comes after ${b}, so it is not between ${a} and ${b}.`;
    if (pi < ai) return `${p} comes before ${a}, so it is not between ${a} and ${b}.`;
    return null;
  }
  return null;
});

