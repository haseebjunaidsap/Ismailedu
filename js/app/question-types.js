/* =====================================================================
   New kinds of questions (beyond multiple choice) and adaptive difficulty.
   kind: "type"  – type the number on a keypad
         "order" – tap the items in the right order
         "sort"  – put each item in the right group
         "multi" – tap ALL the right answers
         "count" – tap each picture to count it, then pick the number
   ===================================================================== */
const KIND_EXTRA = { type: 5, order: 12, sort: 15, multi: 10, count: 10 };
const LVL = { easy: ["🌱", "Easy"], normal: ["⭐", "Normal"], challenge: ["🔥", "Challenge"] };

/* ---------- generators ---------- */
const nf = n => n.toLocaleString("en-US");
function kOrder(o) { /* items given in the right order */
  const ids = o.items.map((_, i) => i);
  return { kind: "order", q: o.q, say: o.say || clean(o.q), items: o.items, lo: o.lo, hi: o.hi, ans: o.items.map(clean).join(" → "), sayAns: o.items.map(x => o.sayItem ? o.sayItem(x) : clean(x)).join(", then "), why: o.why, key: "o" + o.items.join("|"), _ord: ids };
}
function orderNums(lo, hi, n, fmt = String, dec) {
  const s = new Set(); let g = 0; while (s.size < n && g++ < 200) s.add(dec ? Math.round((lo + Math.random() * (hi - lo)) * dec) / dec : R(lo, hi));
  const a = [...s].sort((x, y) => x - y), up = Math.random() < 0.65, items = (up ? a : a.reverse()).map(fmt);
  return kOrder({ q: `Put the numbers in order, <b>${up ? "smallest to biggest" : "biggest to smallest"}</b>. Tap them in order.`, say: `Put the numbers in order, ${up ? "smallest to biggest" : "biggest to smallest"}. Tap them in order.`, items, lo: up ? "smallest" : "biggest", hi: up ? "biggest" : "smallest", why: up ? "Start with the smallest number, then the next biggest, and so on." : "Start with the biggest number, then the next smallest, and so on." });
}
const ORDER_WORDS = ["apple", "banana", "cat", "dog", "egg", "frog", "goat", "hat", "igloo", "jam", "kite", "lion", "moon", "nest", "owl", "pig", "queen", "rain", "sun", "tree", "umbrella", "van", "wagon", "yarn", "zebra", "bell", "bird", "boat", "bus", "cake", "car", "cow", "duck", "fish", "fox", "girl", "game", "horse", "house", "milk", "mouse", "pen", "pie", "rock", "rose", "seal", "ship", "sock", "star"];
function orderABC(n, sameFirst) {
  let w;
  if (sameFirst) { const groups = {}; ORDER_WORDS.forEach(x => (groups[x[0]] = groups[x[0]] || []).push(x)); const g = Object.values(groups).filter(a => a.length >= 3); w = shuffle(pick(g)).slice(0, Math.min(n, 3)); }
  else { const seen = new Set(); w = shuffle(ORDER_WORDS).filter(x => !seen.has(x[0]) && seen.add(x[0])).slice(0, n); }
  w.sort();
  return kOrder({ q: "Put the words in <b>ABC order</b>. Tap them in order.", items: w, lo: "A", hi: "Z", why: sameFirst ? "They all start with the same letter, so look at the second letter. If the second letters match too, look at the next letter." : "Look at the first letter of each word and follow the alphabet." });
}
const STEPS = {
  hands: ["Washing hands", [["💧", "Wet your hands"], ["🧼", "Add soap"], ["👐", "Scrub for 20 seconds"], ["🚿", "Rinse the soap off"], ["🧻", "Dry with a towel"]]],
  teeth: ["Brushing teeth", [["🪥", "Put toothpaste on the brush"], ["😁", "Brush all your teeth"], ["💦", "Spit out the toothpaste"], ["🥛", "Rinse your brush"]]],
  cross: ["Crossing the street", [["🛑", "Stop at the curb"], ["👀", "Look left, right, and left again"], ["👂", "Listen for cars"], ["🚶", "Walk across when it's clear"]]],
  calm: ["Calming down", [["✋", "Stop what you're doing"], ["🌬️", "Take a big slow breath"], ["🔢", "Count to five"], ["🗣️", "Talk about how you feel"]]],
  sdr: ["If your clothes catch fire", [["🛑", "Stop"], ["⬇️", "Drop to the ground"], ["🙈", "Cover your face"], ["🔄", "Roll over and over"]]],
  call911: ["Calling 911", [["😮‍💨", "Stay calm"], ["📞", "Call 911"], ["🗣️", "Say what happened"], ["🏠", "Tell your address"], ["☎️", "Stay on the phone"]]],
  conflict: ["Solving a conflict", [["😌", "Calm down first"], ["💬", "Say how you feel with an I-statement"], ["👂", "Listen to the other person"], ["🤝", "Find a fair fix together"]]],
};
function orderSteps(key) {
  const [name, steps] = STEPS[key];
  return kOrder({ q: `<b>${name}</b>: put the steps in order. Tap the first step first.`, say: `${name}. Put the steps in order. Tap the first step first.`, items: steps.map(([e, t]) => `<span class="emo">${e}</span> ${t}`), lo: "first", hi: "last", sayItem: x => clean(x), why: `The steps are: ${steps.map(s => s[1].toLowerCase()).join(", then ")}.` });
}
function orderSeq() {
  const S = pick(SEQS);
  return kOrder({ q: "Put these in order: what happens <b>first</b>, next, and <b>last</b>?", items: S.map(sOpt), lo: "first", hi: "last", why: `The order is: ${S.map(s => s[1]).join(", then ")}.` });
}
const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
function orderDays() { const i = R(0, 6), items = [0, 1, 2, 3].map(k => WEEKDAYS[(i + k) % 7]); return kOrder({ q: `Put the days in order, starting with <b>${items[0]}</b>.`, items, lo: "first", hi: "last", why: `The days go: ${items.join(", ")}.` }); }

function kSort(q, say, bins, items, why) { /* items: [html, binIndex] */
  return { kind: "sort", q, say, bins, items: items.map(x => x[0]), correct: items.map(x => x[1]), ans: bins.map((b, i) => `${clean(b)}: ${items.filter(x => x[1] === i).map(x => clean(x[0])).join(", ")}`).join(" · "), sayAns: bins.map((b, i) => `${clean(b)}: ${items.filter(x => x[1] === i).map(x => clean(x[0])).join(", ")}`).join(". "), why, key: "s" + items.map(x => x[0]).join("|") };
}
function sortBalanced(poolA, poolB, n) { const a = R(Math.max(1, Math.floor(n / 2) - 1), Math.ceil(n / 2) + 1), b = n - a; return shuffle([...shuffle(poolA).slice(0, a).map(x => [x, 0]), ...shuffle(poolB).slice(0, b).map(x => [x, 1])]); }
function sortEvenOdd(max) { const ev = range(1, max).filter(x => x % 2 === 0).map(String), od = range(1, max).filter(x => x % 2).map(String); return kSort("Sort the numbers: <b>even</b> or <b>odd</b>?", "Sort the numbers. Even, or odd?", ["Even", "Odd"], sortBalanced(ev, od, 6), "Even numbers end in 0, 2, 4, 6 or 8. Odd numbers end in 1, 3, 5, 7 or 9."); }
function sortNounVerb() { return kSort("Sort the words: <b>noun</b> or <b>verb</b>?", "Sort the words. Noun, or verb?", ["Noun (person, place or thing)", "Verb (action)"], sortBalanced(NOUNS, VERBS, 6), "Nouns name a person, place or thing. Verbs are things you can do."); }
function sortFactOpinion() { return kSort("Sort them: <b>fact</b> or <b>opinion</b>?", "Sort them. Fact, or opinion?", ["Fact 🔬", "Opinion 💭"], sortBalanced(FACTS, OPINIONS, 4), "Facts can be proven. Opinions are what someone thinks."); }
function sortCase() { const L = "abdefghmnqrt".split(""), up = shuffle(L).slice(0, 3).map(x => x.toUpperCase()), lo = shuffle(L).slice(0, 3); return kSort("Sort the letters: <b>capital</b> or <b>small</b>?", "Sort the letters. Capital letter, or small letter?", ["Capital (big)", "Small"], shuffle([...up.map(x => [x, 0]), ...lo.map(x => [x, 1])]), "Capital letters are the big ones we use to start names and sentences."); }
function sortCats() {
  const [a, b] = shuffle(LCAT_KEYS).slice(0, 2), it = x => `<span class="emo">${x[0]}</span> ${x[1]}`;
  return kSort(`Sort them into groups: <b>${a}</b> or <b>${b}</b>?`, `Sort them into groups. ${a}, or ${b}?`, [cap(a), cap(b)], sortBalanced(LCATS[a].map(it), LCATS[b].map(it), 6), `Each thing belongs with others like it.`);
}
function sortManners(t) {
  const J = t._J || []; if (!J.length || !t._labels) return null;
  const A = J.filter(j => j[1] === 0).map(j => j[0]), B = J.filter(j => j[1] === 1).map(j => j[0]);
  if (A.length < 2 || B.length < 2) return null;
  return kSort("Sort each one into the right group.", `Sort each one into the right group. ${t._labels.map(clean).join(", or ")}?`, t._labels.slice(), sortBalanced(A, B, 4), "Think about how each choice makes people feel, and whether it keeps everyone safe.");
}

function kMulti(q, say, opts, correctIdx, why) {
  return { kind: "multi", q, say, opts, correct: correctIdx, ans: correctIdx.map(i => opts[i]).join(", "), sayAns: correctIdx.map(i => clean(opts[i])).join(", and "), why, key: "m" + q + opts.join("|") };
}
function multiRhyme() {
  const fams = RHYMES.filter(f => f.length >= 3), fi = pick(fams), [t, ...rest] = shuffle(fi), yes = rest.slice(0, R(1, 2));
  const no = shuffle(RHYMES.filter(f => f !== fi).flat()).filter(w => !w[0].endsWith(t[0].slice(-2))).slice(0, 5 - yes.length);
  const opts = shuffle([...yes, ...no]), wl2 = ([w, e]) => e ? `<span class="emo">${e}</span> ${w}` : w;
  return kMulti(`Tap <b>all</b> the words that rhyme with <b>${t[0]}</b>, then tap Check.`, `Tap all the words that rhyme with ${t[0]}. Then tap check.`, opts.map(wl2), opts.map((o, i) => yes.includes(o) ? i : -1).filter(i => i >= 0), `${yes.map(w => cap(w[0])).join(" and ")} end with the same sound as ${t[0]}.`);
}
function multiFactors() {
  const n = pick([12, 16, 18, 20, 24, 30, 36]), f = range(1, 15).filter(x => n % x === 0), nf2 = range(2, 15).filter(x => n % x);
  const yes = shuffle(f).slice(0, R(2, 3)), opts = shuffle([...yes, ...shuffle(nf2).slice(0, 6 - yes.length)]).map(String);
  return kMulti(`Tap <b>all</b> the factors of <b>${n}</b>, then tap Check.`, `Tap all the factors of ${n}. Then tap check.`, opts, opts.map((o, i) => n % +o === 0 ? i : -1).filter(i => i >= 0), `A factor divides ${n} with nothing left over: ${f.filter(x => opts.includes(String(x))).map(x => `${x} × ${n / x}`).join(", ")}.`);
}
function multiSkip() {
  const k = pick([2, 5, 10]), top = k * 10, yes = shuffle(range(1, 10).map(x => x * k)).slice(0, R(2, 3));
  const no = shuffle(range(1, top).filter(x => x % k)).slice(0, 6 - yes.length), opts = shuffle([...yes, ...no]).map(String);
  return kMulti(`Tap <b>all</b> the numbers you say when you count by <b>${k}s</b>.`, `Tap all the numbers you say when you count by ${k}s. Then tap check.`, opts, opts.map((o, i) => +o % k === 0 ? i : -1).filter(i => i >= 0), `Counting by ${k}s: ${range(1, 6).map(x => x * k).join(", ")}…`);
}
function multiManners(t) {
  const J = t._J || []; if (!t._labels || !t._lk || !LBLQ[t._lk]) return null;
  const A = J.filter(j => j[1] === 0), B = J.filter(j => j[1] === 1); if (A.length < 2 || B.length < 3) return null;
  const yes = shuffle(A).slice(0, 2), opts = shuffle([...yes, ...shuffle(B).slice(0, 3)]);
  const qq = LBLQ[t._lk][0].replace(/^Which one is/, "Tap <b>all</b> the ones that are").replace(/^Which one should you/, "Tap <b>all</b> the ones you should").replace(/\?$/, ".");
  return kMulti(qq + " Then tap Check.", clean(qq) + " Then tap check.", opts.map(j => j[0]), opts.map((j, i) => yes.includes(j) ? i : -1).filter(i => i >= 0), (() => { const r = [...new Set(yes.map(j => j[2]).filter(Boolean))]; if (r.length >= 2) return r.slice(0, 2).join(" "); const L = LBLWHY[t._lk][0]; return yes.length > 1 ? L.replace(/^That's an? /, "Those are ").replace(/^That's /, "Those are ").replace(/choice\./, "choices.") : (r[0] || L); })());
}
function tapCount() {
  const n = R(4, 15), t = pick(THINGS);
  const cells = shuffle(range(0, 19)).slice(0, n).sort((a, b) => a - b);
  const vis = `<div class="tapcount" data-tc="${n}">${range(0, 19).map(i => cells.includes(i) ? `<button class="tc-item" data-tc-item aria-label="${t[2]}"><span class="emo">${t[0]}</span></button>` : `<span class="tc-gap"></span>`).join("")}</div><div class="tc-said" id="tc-said">Tap each ${t[2]} to count!</div>`;
  return { kind: "count", q: `Tap each ${t[2]} to count. How many ${t[1]}?`, say: `Tap each ${t[2]} to count it. How many ${t[1]} are there?`, vis, opts: numU(n, [n + 1, n - 1, n + 2, n - 2], 3, 1), ans: String(n), why: `Touch each one once as you count. There are ${n}.`, key: "tc" + n + t[2] + cells.join() };
}

/* ---------- attach kinds to topics ---------- */
function addKind(age, subj, id, p, fn) {
  const t = findTopicK(age, subj, id); if (!t) return;
  const g = t.gen;
  t.gen = function () { if (Math.random() < p) { try { const q = fn(t); if (q) return q; } catch (e) { console.error(e); } } return g.call(this); };
}
const findTopicK = (a, s, id) => (C[a] && C[a][s] || []).find(t => t.id === id);
addKind(6, "math", "count", 0.4, tapCount);
addKind(6, "math", "compare", 0.3, () => orderNums(0, 20, 3));
addKind(7, "math", "symbols", 0.3, () => orderNums(10, 99, 4));
addKind(7, "math", "evenodd", 0.35, () => sortEvenOdd(30));
addKind(7, "math", "skip", 0.3, multiSkip);
addKind(8, "math", "place1000", 0.3, () => orderNums(100, 999, 4));
addKind(9, "math", "bignums", 0.3, () => orderNums(10000, 99999, 4, nf));
addKind(9, "math", "decimals", 0.3, () => orderNums(0.05, 0.95, 4, String, 100));
addKind(9, "math", "factors", 0.35, multiFactors);
addKind(6, "english", "rhyme", 0.3, multiRhyme);
addKind(6, "english", "case", 0.3, sortCase);
addKind(6, "english", "abcnext", 0.25, () => { const i = R(0, 21), L = "abcdefghijklmnopqrstuvwxyz"; return kOrder({ q: "Put the letters in <b>ABC order</b>. Tap them in order.", items: shuffle([0, 1, 2, 3, 4].map(k => L[i + k])).slice(0, 4).sort(), lo: "A", hi: "Z", why: "Sing the ABC song to check the order." }); });
addKind(7, "english", "nounverb", 0.35, sortNounVerb);
addKind(8, "english", "abc", 0.4, () => orderABC(4, Math.random() < 0.3));
addKind(8, "english", "factopinion", 0.3, sortFactOpinion);
addKind(6, "logic", "groups", 0.35, sortCats);
addKind(6, "logic", "beforeafter", 0.3, orderSeq);
addKind(7, "logic", "sequence", 0.4, orderSeq);
addKind(7, "logic", "calendar", 0.25, orderDays);
addKind(6, "manners", "germs", 0.3, () => orderSteps(pick(["hands", "teeth"])));
addKind(6, "manners", "road", 0.25, () => orderSteps("cross"));
addKind(7, "manners", "calmdown", 0.25, () => orderSteps("calm"));
addKind(8, "manners", "fire", 0.25, () => orderSteps("sdr"));
addKind(8, "manners", "emergency", 0.25, () => orderSteps("call911"));
addKind(9, "manners", "conflict", 0.25, () => orderSteps("conflict"));
for (const a of [6, 7, 8, 9]) for (const t of C[a].manners) if (t._J) { addKind(a, "manners", t.id, 0.12, sortManners); addKind(a, "manners", t.id, 0.1, multiManners); }

/* ---------- type-the-answer (made from number questions) ---------- */
const TYPEABLE = new Set(["6-math-count", "6-math-add10", "6-math-sub10", "6-math-doubles", "6-math-bonds", "6-math-tally", "6-math-cubes", "7-math-add100", "7-math-sub100", "7-math-place", "7-math-missing", "7-math-add3", "7-math-pictograph", "7-math-skip", "8-math-mult", "8-math-div", "8-math-perimeter", "8-math-place1000", "8-math-wordprob", "8-math-missingfactor", "8-math-graphs", "9-math-mult2", "9-math-area", "9-math-fracof", "9-math-numpatterns", "9-math-convert", "9-math-volume", "8-logic-pyramids", "8-logic-machines", "7-logic-numriddles", "9-logic-balancemath", "9-logic-ages", "8-logic-venncount", "6-logic-numgrid"]);
function typeable(q, src) {
  if (!src || !TYPEABLE.has(`${src.age}-${src.subj}-${src.id}`)) return false;
  const a = clean(q.ans); if (!/^\d{1,6}(\.\d{1,2})?$/.test(a)) return false;
  if (!q.opts.every(o => /^\d{1,6}(\.\d{1,2})?$/.test(clean(o)))) return false;
  return !/\bwhich\b|closest|about|estimate|round|could|might|not\b/i.test(clean(q.q));
}

/* ---------- difficulty ---------- */
function levelFor(t) {
  const pr = curProfile(), d = pr && pr.diff || "auto";
  if (d !== "auto") return d;
  if (!t || t.special) return "normal";
  const s = P.stats[`${t.age}-${t.subj}-${t.id}`], h = s && s.h || [];
  if (!h.length) return "normal";
  const last = h.slice(-2), avg = last.reduce((a, b) => a + b, 0) / last.length;
  return avg >= 90 ? "challenge" : avg < 50 ? "easy" : "normal";
}
function effLevel() { return !Q ? "normal" : Q.boost ? "easy" : Q.up ? "challenge" : Q.level; }
function srcOf(q, t) { return q._src || (t && !t.special ? { age: t.age, subj: t.subj, id: t.id } : null); }
function srcTopic(q, t) { const s = srcOf(q, t); return s ? findTopic(s.age, s.subj, s.id) : null; }
function prepQ(q, t, lvl) {
  if (q._prep) return; q._prep = lvl;
  if ((!q.kind || q.kind === "count") && lvl === "easy" && q.opts.length >= 3) {
    const wrong = q.opts.filter(o => o !== q.ans); const drop = pick(wrong); q.opts = q.opts.filter(o => o !== drop); q._easy = 1;
  }
  if (!q.kind && lvl !== "easy" && typeable(q, srcOf(q, t)) && Math.random() < (lvl === "challenge" ? 0.6 : 0.2)) { q._orig = { opts: q.opts.slice(), ans: q.ans }; q.kind = "type"; q.ans = clean(q.ans); }
}
function levelSecs(secs, lvl, q) {
  if (!secs) return 0;
  secs += KIND_EXTRA[q.kind] || 0;
  return lvl === "easy" ? Math.round(secs * 1.4) : lvl === "challenge" ? Math.max(10, Math.round(secs * 0.8)) : secs;
}

/* ---------- rendering ---------- */
let KS = null; /* interaction state for the current non-multiple-choice question */
function kindHTML(q) {
  KS = { kind: q.kind, picks: [], sel: q.kind === "sort" ? q.items.map(() => null) : q.kind === "multi" ? q.opts.map(() => false) : null, val: "" };
  if (q.kind === "type") {
    const dot = /\./.test(q.ans);
    return `<div class="kp" role="group" aria-label="Type your answer">
      <div class="kp-show"><span id="kp-val" aria-live="polite"></span><span class="kp-caret" aria-hidden="true"></span></div>
      <div class="kp-keys">${["1", "2", "3", "4", "5", "6", "7", "8", "9", dot ? "." : "", "0", "⌫"].map(k => k ? `<button class="kp-k" data-kp="${k}" aria-label="${k === "⌫" ? "Delete" : k}">${k}</button>` : `<span></span>`).join("")}</div>
      <button class="btn btn-go kp-ok" data-kp="ok" id="k-check" disabled>✓ Check</button></div>`;
  }
  if (q.kind === "order") {
    KS.shuf = shuffle(q.items.map((_, i) => i));
    return `<div class="ord"><div class="ord-ends"><span>${q.lo || ""}</span><span>${q.hi || ""}</span></div>
      <div class="ord-slots" id="ord-slots">${q.items.map((_, i) => `<span class="ord-slot" data-slot="${i}"><i>${i + 1}</i></span>`).join("")}</div>
      <div class="ord-pool">${KS.shuf.map(i => `<div class="opt-wrap"><button class="ord-chip" data-ord="${i}">${q.items[i]}</button><button class="say-opt" data-sayitem="${i}" aria-label="Read it to me">🔊</button></div>`).join("")}</div>
      <div class="k-row"><button class="btn btn-sm" data-act="ord-undo">↩ Undo</button><button class="btn btn-go" data-act="k-check" id="k-check" disabled>✓ Check</button></div></div>`;
  }
  if (q.kind === "sort") {
    return `<div class="srt">${q.items.map((it, i) => `<div class="srt-item" id="srt${i}"><div class="srt-txt"><button class="say-opt in" data-sayitem="${i}" aria-label="Read it to me">🔊</button><span>${it}</span></div><div class="srt-bins">${q.bins.map((b, j) => `<button class="srt-bin b${j}" data-sort="${i}:${j}" aria-pressed="false">${b}</button>`).join("")}</div></div>`).join("")}
      <div class="k-row"><button class="btn btn-go" data-act="k-check" id="k-check" disabled>✓ Check</button></div></div>`;
  }
  if (q.kind === "multi") {
    return `<div class="opts multi n${q.opts.length}${optLen(q) > 22 ? " long" : ""}">${q.opts.map((o, k) => `<div class="opt-wrap"><button class="opt mopt" data-multi="${k}" aria-pressed="false"><span class="okey">☐</span><span class="oval">${o}</span></button><button class="say-opt" data-sayopt="${k}" aria-label="Read answer ${k + 1} to me">🔊</button></div>`).join("")}</div>
      <div class="k-row"><button class="btn btn-go" data-act="k-check" id="k-check" disabled>✓ Check</button></div>`;
  }
  return "";
}
function kindSpeakItem(q, i) { return clean(q.kind === "multi" ? q.opts[i] : q.items[i]); }
function kpPress(k) {
  if (!Q || Q.locked || Q.reading || !KS || KS.kind !== "type") return;
  const q = Q.qs[Q.i];
  if (k === "ok") { if (KS.val) kindCheck(); return; }
  if (k === "⌫" || k === "Backspace") KS.val = KS.val.slice(0, -1);
  else if (KS.val.length < 7 && !(k === "." && (KS.val.includes(".") || !/\./.test(q.ans)))) KS.val += k;
  $("kp-val").textContent = KS.val; $("k-check").disabled = !KS.val; sfx("pop");
}
function ordPick(i) {
  if (!Q || Q.locked || Q.reading || !KS || KS.picks.includes(i)) return;
  const q = Q.qs[Q.i]; KS.picks.push(i); sfx("pop"); speak(clean(q.items[i]), true);
  paintOrder(q);
}
function ordUndo() { if (!Q || Q.locked || !KS || !KS.picks.length) return; KS.picks.pop(); sfx("pop"); paintOrder(Q.qs[Q.i]); }
function paintOrder(q) {
  document.querySelectorAll(".ord-slot").forEach((s, k) => { const i = KS.picks[k]; s.innerHTML = i == null ? `<i>${k + 1}</i>` : `<i>${k + 1}</i><b>${q.items[i]}</b>`; s.classList.toggle("full", i != null); });
  document.querySelectorAll(".ord-chip").forEach(b => { const on = KS.picks.includes(+b.dataset.ord); b.disabled = on; b.classList.toggle("used", on); });
  $("k-check").disabled = KS.picks.length !== q.items.length;
}
function sortPick(i, j) {
  if (!Q || Q.locked || Q.reading || !KS) return;
  KS.sel[i] = j; sfx("pop");
  document.querySelectorAll(`#srt${i} .srt-bin`).forEach((b, k) => { b.setAttribute("aria-pressed", String(k === j)); b.classList.toggle("on", k === j); });
  $("k-check").disabled = KS.sel.some(x => x == null);
}
function multiToggle(k) {
  if (!Q || Q.locked || Q.reading || !KS) return;
  KS.sel[k] = !KS.sel[k]; sfx("pop");
  const b = document.querySelector(`[data-multi="${k}"]`); b.setAttribute("aria-pressed", String(KS.sel[k])); b.classList.toggle("on", KS.sel[k]); b.querySelector(".okey").textContent = KS.sel[k] ? "☑" : "☐";
  $("k-check").disabled = !KS.sel.some(Boolean);
}
function kindCheck() {
  if (!Q || Q.locked || Q.reading || !KS) return;
  const q = Q.qs[Q.i]; let ok = false, said = "";
  if (q.kind === "type") { ok = parseFloat(KS.val) === parseFloat(q.ans); said = KS.val; }
  else if (q.kind === "order") { ok = KS.picks.every((x, k) => x === k); said = KS.picks.map(i => clean(q.items[i])).join(", "); }
  else if (q.kind === "sort") { ok = KS.sel.every((x, i) => x === q.correct[i]); said = q.items.map((it, i) => `${clean(it)}: ${clean(q.bins[KS.sel[i]] || "?")}`).join("; "); }
  else if (q.kind === "multi") { ok = q.opts.every((_, i) => KS.sel[i] === q.correct.includes(i)); said = q.opts.filter((_, i) => KS.sel[i]).map(clean).join(", "); }
  Q.lastText = said;
  answer(null, { ok, el: $("k-check") });
}
function kindReveal(q, ok) {
  document.querySelectorAll(".kp-k,.kp-ok,.ord-chip,.srt-bin,.mopt,[data-act='ord-undo'],#k-check").forEach(b => b.disabled = true);
  if (q.kind === "type") { const s = document.querySelector(".kp-show"); if (s) { s.classList.add(ok ? "ok" : "no"); if (!ok) s.insertAdjacentHTML("beforeend", `<span class="kp-ans">${q.ans}</span>`); } }
  if (q.kind === "order" && KS) {
    document.querySelectorAll(".ord-slot").forEach((s, k) => { if (KS.picks[k] != null) s.classList.add(KS.picks[k] === k ? "ok" : "no"); });
    if (!ok) document.querySelector(".ord").insertAdjacentHTML("beforeend", `<div class="ord-right"><b>Right order:</b> ${q.items.map((x, k) => `<span>${k + 1}. ${x}</span>`).join("")}</div>`);
  }
  if (q.kind === "sort" && KS) q.items.forEach((_, i) => { const row = $("srt" + i); if (!row) return; row.classList.add(KS.sel[i] === q.correct[i] ? "ok" : "no"); row.querySelectorAll(".srt-bin")[q.correct[i]].classList.add("right"); });
  if (q.kind === "multi" && KS) document.querySelectorAll(".mopt").forEach((b, i) => { const want = q.correct.includes(i), got = KS.sel[i]; b.classList.add(want && got ? "correct" : want ? "missed" : got ? "wrong" : "dim"); });
}
/* tap-to-count pictures */
function tapCountItem(b) {
  const box = b.closest(".tapcount"); if (!box || b.classList.contains("counted")) { return; }
  const n = box.querySelectorAll(".tc-item.counted").length + 1;
  b.classList.add("counted"); b.insertAdjacentHTML("beforeend", `<b class="tc-n">${n}</b>`);
  const s = $("tc-said"); if (s) s.textContent = n === 1 ? "1…" : `${n}…`;
  sfx("pop"); speak(String(n), true);
  if (n === +box.dataset.tc && s) s.textContent = `${n}! Now pick the number.`;
}

