/* =====================================================================
   v28: more "Stop, Listen & Think": slow looking, remembering, careful
   checking and pondering. New flags (plain data, JSON-safe):
     q.peek     the pictures in .v28-peek are covered when the light turns green
     q.confirm  the child must "lock in" an answer (Are you sure?) before it counts
     q.v27.tip  a think-tip shown under the traffic light
   ===================================================================== */
const V28_TIPS = {
  list: "🤔 Picture each thing Pip said.", says: "🤔 Did Pip say the magic words?", color: "🎨 Look at the color, not the word.",
  opp: "🔄 Think: what is the opposite?", group: "🔎 Find the little word: NOT or IS.", count: "👆 Point and count slowly.",
  num: "🔎 Find the little word: NOT, SMALLEST, SECOND…", trick: "🕵️ What is the question really asking?", story: "📖 Think: who, where, when, what?",
  ifthen: "🤔 Is it true? Then which picture?", strat: "🤔 Which choice is the wisest?", peek: "📸 Take a picture with your eyes!",
  change: "🔍 Compare the rows, one by one.", steps: "🧮 Do one step at a time.", check: "✔️ Check it yourself first.",
  silly: "📖 Read slowly. Does every word make sense?", riddle: "🧩 Check every clue, one by one.",
};

/* I. look, remember, then the pictures hide (patience + memory) */
function V28_peek(age) {
  const n = age <= 6 ? 3 : age === 7 ? 4 : age === 8 ? 5 : 6;
  const pool = shuffle(V27_ITEMS.slice()), shown = pool.slice(0, n), not = pool.slice(n, n + 3);
  const label = x => V27_O(x[0], x[1]);
  const m = pick(age <= 6 ? ["in", "notin"] : age === 7 ? ["in", "notin", "first"] : ["notin", "first", "last", "middle", "in"]);
  let ask, tgt, why, opts; const whyNot = {};
  if (m === "in") { tgt = pick(shown); ask = "Which one WAS in the box?"; opts = shuffle([tgt, ...not]).map(label); not.forEach(x => { whyNot[label(x)] = `There was no ${x[1]} in the box.`; }); }
  else if (m === "notin") { tgt = not[0]; ask = "Which one was NOT in the box?"; opts = shuffle([tgt, ...shuffle(shown).slice(0, 3)]).map(label); shown.forEach(x => { whyNot[label(x)] = `The ${x[1]} WAS in the box.`; }); }
  else {
    const idx = m === "first" ? 0 : m === "last" ? n - 1 : (n - 1) / 2;
    if (!Number.isInteger(idx)) return V28_peek(age);
    tgt = shown[idx]; ask = `Which picture was ${m === "middle" ? "in the MIDDLE" : m === "first" ? "FIRST (on the left)" : "LAST (on the right)"}?`;
    const others = shuffle(shown.filter(x => x !== tgt)).slice(0, 3); opts = shuffle([tgt, ...others]).map(label);
    others.forEach(x => { whyNot[label(x)] = `The ${x[1]} was in spot ${shown.indexOf(x) + 1}, not spot ${idx + 1}.`; });
  }
  why = `The box had: ${V27_list(shown.map(x => x[1]))}.${m === "notin" ? ` There was no ${tgt[1]}.` : ""}`;
  const vis = `<div class="v28-peek"><div class="v28-peek-in">${shown.map(x => `<span class="v28-card"><b>${V27_E(x[0], x[1])}</b><i>❓</i></span>`).join("")}</div><small class="v28-peek-note">Look carefully! The pictures hide when the light turns green.</small></div>`;
  return V27_q(age, {
    q: `📸 Look at the box and remember it. <b>${ask}</b>`, say: `Look at the pictures in the box and remember them. They will hide soon! ${ask}`, vis, opts, ans: label(tgt), why, whyNot,
    peek: 1, wait: Math.max(3, V27_wait(age) + (age <= 6 ? 2 : 1)), key: `v28P${m}${shown.map(x => x[1]).join()}`, v27: { f: "peek", tip: V28_TIPS.peek },
  });
}

/* J. what changed? two rows, one thing swapped (slow, careful looking) */
function V28_change(age) {
  const n = age <= 6 ? 3 : age === 7 ? 4 : age === 8 ? 5 : 6;
  const pool = shuffle(V27_ITEMS.slice()), row1 = pool.slice(0, n), newIt = pool[n], pos = R(0, n - 1);
  const row2 = row1.slice(); const oldIt = row2[pos]; row2[pos] = newIt;
  const label = x => V27_O(x[0], x[1]);
  const askNew = Math.random() < 0.6;
  const tgt = askNew ? newIt : oldIt;
  const others = shuffle(row1.filter(x => x !== oldIt)).slice(0, 3);
  const opts = shuffle([tgt, ...others]).map(label), whyNot = {};
  others.forEach(x => { whyNot[label(x)] = `The ${x[1]} is in both rows, in the same spot.`; });
  const rowH = (r, lab) => `<div class="v28-rowlab">${lab}</div><div class="v27-row v28-cmp">${r.map(x => V27_E(x[0], x[1])).join("")}</div>`;
  const ask = askNew ? "Which picture is NEW in row 2?" : "Which picture from row 1 is MISSING in row 2?";
  return V27_q(age, {
    q: `🔍 Look slowly at both rows. <b>${ask}</b>`, say: `Look slowly at both rows. ${ask}`, vis: rowH(row1, "Row 1") + rowH(row2, "Row 2"),
    opts, ans: label(tgt), why: `In spot ${pos + 1}, the ${oldIt[1]} changed to ${V27_an(newIt[1])}.`, whyNot, key: `v28C${askNew ? "n" : "m"}${row1.map(x => x[1]).join()}${pos}${newIt[1]}`, v27: { f: "change", tip: V28_TIPS.change },
  });
}

/* K. listen to the steps, keep the number in your head */
function V28_steps(age) {
  const k = age <= 6 ? 2 : age === 7 ? 2 : age === 8 ? 3 : pick([3, 4]);
  const cap0 = age <= 6 ? 10 : age === 7 ? 20 : age === 8 ? 50 : 100;
  let v = R(age <= 6 ? 2 : 3, age <= 6 ? 6 : Math.round(cap0 / 3)); const start = v;
  const steps = [], vals = [v];
  for (let i = 0; i < k; i++) {
    const kinds = ["add", "sub"]; if (age >= 9 && v <= 25 && !steps.some(s => s[0] === "dbl")) kinds.push("dbl");
    const kd = pick(kinds);
    if (kd === "add") { const a = R(1, Math.max(1, Math.min(age <= 6 ? 4 : 9, cap0 - v))); if (v + a > cap0) { i--; continue; } steps.push(["add", a]); v += a; }
    else if (kd === "sub") { if (v <= 1) { i--; continue; } const a = R(1, Math.min(v - 1, age <= 6 ? 4 : 9)); steps.push(["sub", a]); v -= a; }
    else { steps.push(["dbl", 2]); v *= 2; }
    vals.push(v);
  }
  const say1 = s => s[0] === "add" ? `Add ${s[1]}.` : s[0] === "sub" ? `Take away ${s[1]}.` : "Double it.";
  const spoken = `Start with ${start}. ${steps.map(say1).join(" ")}`;
  const ans = String(v), whyNot = {}, cand = new Set();
  const add = (x, r) => { if (x >= 0 && String(x) !== ans && !cand.has(x) && cand.size < 3) { cand.add(x); whyNot[String(x)] = r; } };
  add(vals[vals.length - 2], `That's the number before the last step. Don't forget: ${say1(steps[steps.length - 1]).toLowerCase()}`);
  add(vals[1], `That's after only the first step. Keep going!`);
  add(start, `That's the starting number. Now do the steps.`);
  add(v + 1, `Just 1 off. Do each step again slowly.`); add(v - 1, `Just 1 off. Do each step again slowly.`); add(v + 2, `Do each step again slowly.`);
  const opts = shuffle([ans, ...[...cand].map(String)]);
  const listen = age >= 7;
  const work = vals.map((x, i) => i === 0 ? `${x}` : steps[i - 1][0] === "add" ? `+ ${steps[i - 1][1]} = ${x}` : steps[i - 1][0] === "sub" ? `− ${steps[i - 1][1]} = ${x}` : `× 2 = ${x}`).join(" → ");
  return V27_q(age, {
    q: `${listen ? "👂 " : ""}${spoken} <b>What number do you have now?</b>`, say: `Listen to each step and keep the number in your head. ${spoken} What number do you have now?`, listen: listen ? 1 : 0,
    vis: listen ? `<div class="v27-ear">👂🧮</div>` : `<div class="v27-show sm">🧮</div>`, opts, ans, why: `${work}. You have ${v}.`, whyNot, key: `v28S${spoken}`, v27: { f: "steps", tip: V28_TIPS.steps },
  });
}

/* L. check Pip's work (slow down and verify) */
function V28_checkOpts(right, truth, said, unit) {
  const YES = "Yes, Pip is right", no = x => `No, ${unit === "it" ? "it is" : "there are"} ${x}`;
  const alt = [truth + 1, truth - 1, truth + 2, truth - 2, truth + 10].filter(x => x >= 0 && x !== truth && x !== said);
  const opts = right ? [YES, no(alt[0]), no(alt[1]), no(alt[2])] : [YES, no(truth), no(alt[0]), no(alt[1])];
  return { opts: shuffle(opts), ans: right ? YES : no(truth), YES };
}
function V28_check(age) {
  const right = Math.random() < 0.45;
  if (Math.random() < 0.5) {
    const e = pick([["⭐", "star"], ["🍎", "apple"], ["🐟", "fish"], ["🎈", "balloon"], ["🐞", "ladybug"]]);
    const n = R(age <= 6 ? 4 : 7, age <= 6 ? 9 : age === 7 ? 13 : 16), said = right ? n : n + pick([-1, 1]);
    const { opts, ans, YES } = V28_checkOpts(right, n, said, "there"), whyNot = {};
    const pl = e[1] === "fish" ? "fish" : e[1] + "s";
    opts.forEach(o => { if (o === ans) return; whyNot[o] = o === YES ? `Count again slowly: there are ${n}, not ${said}.` : `Count them one by one: there are ${n}.`; });
    return V27_q(age, {
      q: `✔️ Pip counted the ${pl} and said, “There are ${said}.” <b>Is Pip right?</b> Count slowly to check.`, say: `Pip counted the ${pl} and said, there are ${said}. Is Pip right? Count slowly to check.`,
      vis: `<div class="v27-row">${Array(n).fill(V27_E(e[0], e[1])).join("")}</div>`, opts, ans, why: `There are ${n} ${pl}, so Pip ${right ? "is right" : `is not right: he said ${said}`}.`, whyNot, key: `v28K${e[1]}${n}${said}`, v27: { f: "check", tip: V28_TIPS.check },
    });
  }
  const hi = age <= 6 ? 10 : age === 7 ? 20 : 100, op = age <= 6 ? "+" : pick(["+", "−"]);
  let a = R(1, hi - 1), b = R(1, hi - 1);
  if (op === "+" && age <= 7) { a = R(1, hi - 2); b = R(1, hi - a); }
  if (op === "−" && b > a) [a, b] = [b, a];
  const real = op === "+" ? a + b : a - b, said = right ? real : real + pick([-1, 1, 10, -10].filter(d => real + d >= 0 && (age >= 8 || Math.abs(d) === 1)));
  const { opts, ans, YES } = V28_checkOpts(right, real, said, "it"), whyNot = {};
  opts.forEach(o => { if (o === ans) return; whyNot[o] = o === YES ? `Check it: ${a} ${op} ${b} = ${real}, not ${said}.` : `Check it: ${a} ${op} ${b} = ${real}.`; });
  return V27_q(age, {
    q: `✔️ Pip says <b>${a} ${op} ${b} = ${said}</b>. Is Pip right? Work it out yourself first.`, say: `Pip says ${a} ${op === "+" ? "plus" : "minus"} ${b} equals ${said}. Is Pip right? Work it out yourself first.`,
    vis: `<div class="v27-show sm">🦉✔️</div>`, opts, ans, why: `${a} ${op} ${b} = ${real}, so Pip ${right ? "is right" : `is not right: he said ${said}`}.`, whyNot, key: `v28M${a}${op}${b}${said}`, v27: { f: "check", tip: V28_TIPS.check },
  });
}

/* M. read slowly: which word does not make sense? */
const V28_SILLY = [
  ["The dog drank water from its", "bowl", "shoe", ["dog", "drank", "water"]],
  ["We wear warm mittens on our", "hands", "ears", ["wear", "warm", "mittens"]],
  ["Mom put the milk in the", "fridge", "bathtub", ["Mom", "put", "milk"]],
  ["The bird built a nest in the", "tree", "toaster", ["bird", "built", "nest"]],
  ["I brush my teeth every day with a", "toothbrush", "fork", ["brush", "teeth", "day"]],
  ["The happy farmer milked the", "cow", "chicken", ["happy", "farmer", "milked"]],
  ["We read funny books at the", "library", "car wash", ["read", "funny", "books"]],
  ["The little fish swam in the", "pond", "sky", ["little", "fish", "swam"]],
  ["Dad cut the bread with a", "knife", "spoon", ["Dad", "cut", "bread"]],
  ["At night we sleep cozy in our", "beds", "shoes", ["night", "sleep", "cozy"]],
  ["The baker baked a yummy", "cake", "rock", ["baker", "baked", "yummy"]],
  ["I wear my boots when it", "rains", "sings", ["wear", "boots", "when"]],
  ["The cat chased the little", "mouse", "mountain", ["cat", "chased", "little"]],
  ["We cooled off in the swimming", "pool", "oven", ["cooled", "off", "swimming"]],
  ["Grandpa planted seeds in the", "garden", "freezer", ["Grandpa", "planted", "seeds"]],
  ["The tall pilot flew the", "airplane", "sandwich", ["tall", "pilot", "flew"]],
  ["Ice cream melts when it is", "hot", "cold", ["Ice", "cream", "melts"]],
  ["You need a key to open the", "lock", "banana", ["need", "key", "open"]],
  ["On a sunny day, my shadow follows me down the", "street", "cloud", ["sunny", "shadow", "follows"]],
  ["We dig in the soft sand at the", "beach", "moon", ["dig", "soft", "sand"]],
];
function V28_silly(age) {
  const [stem, good, bad, others] = pick(V28_SILLY);
  const sent = `${stem} ${bad}.`;
  const opts = shuffle([bad, ...others.slice(0, 3)]), whyNot = {};
  others.slice(0, 3).forEach(w => { whyNot[w] = `“${w}” makes sense in this sentence. Read it again slowly.`; });
  return V27_q(age, {
    q: `📖 Read slowly: “${sent}” <b>Which word does NOT make sense?</b>`, say: `Read it slowly. ${sent} Which word does not make sense?`,
    vis: `<div class="passage scene v28-sent">“${sent}”</div>`, opts, ans: bad, why: `It should say “${stem} ${good}.” “${cap(bad)}” is the silly word.`, whyNot, key: `v28W${sent}`, big: 0, v27: { f: "silly", tip: V28_TIPS.silly },
  });
}

/* N. ponder: a number riddle with several clues */
function V28_riddle(age) {
  const hi = age <= 6 ? 10 : age === 7 ? 20 : 50;
  const C = [
    [n => n % 2 === 0, "It is even.", n => `${n} is not even.`], [n => n % 2 === 1, "It is odd.", n => `${n} is not odd.`],
  ];
  for (let tries = 0; tries < 200; tries++) {
    const ans = R(2, hi - 1), lo = R(Math.max(0, ans - (age <= 6 ? 4 : 8)), ans - 1), up = R(ans + 1, Math.min(hi, ans + (age <= 6 ? 4 : 8)));
    const clues = [[n => n > lo, `It is bigger than ${lo}.`, n => `${n} is not bigger than ${lo}.`], [n => n < up, `It is smaller than ${up}.`, n => `${n} is not smaller than ${up}.`], ans % 2 ? C[1] : C[0]];
    if (age >= 8 && ans >= 10) clues.push(ans % 10 === Math.floor(ans / 10) + 1 ? [n => n % 10 === Math.floor(n / 10) + 1, "Its ones digit is 1 more than its tens digit.", n => `${n}: the ones digit is not 1 more than the tens digit.`] : [n => n % 5 !== 0, "It is not a number you say when counting by 5s.", n => `${n} is a counting-by-5s number.`]);
    if (up - lo < 4) continue;
    const fits = range(0, hi).filter(n => clues.every(c => c[0](n)));
    if (fits.length !== 1) continue;
    /* every clue must matter: drop any one and more than one number fits */
    if (clues.some((_, i) => range(0, hi).filter(n => clues.every((c, j) => j === i || c[0](n))).length < 2)) continue;
    const near = shuffle(range(Math.max(0, lo - 1), Math.min(hi, up + 1)).filter(n => n !== ans)).slice(0, 3);
    if (near.length < 3) continue;
    const whyNot = {}; near.forEach(n => { const bad = clues.find(c => !c[0](n)); whyNot[String(n)] = bad ? bad[2](n) : "Check every clue."; });
    const cl = clues.map(c => c[1]);
    return V27_q(age, {
      q: `🧩 I'm thinking of a number. ${cl.join(" ")} <b>What is my number?</b>`, say: `I'm thinking of a number. Listen to every clue. ${cl.join(" ")} What is my number?`,
      vis: `<div class="v28-clues">${cl.map((c, i) => `<span>🔎 ${i + 1}. ${c}</span>`).join("")}</div>`, opts: shuffle([ans, ...near].map(String)), ans: String(ans),
      why: `${ans} fits every clue: ${cl.map(c => c.replace(/^It is /, "").replace(/^Its /, "its ").replace(/\.$/, "")).join(", ")}.`, whyNot, key: `v28R${cl.join("")}`, big: 0, v27: { f: "riddle", tip: V28_TIPS.riddle },
    });
  }
  return V28_change(age);
}

/* the mix: older formats stay, new ones join; tips for every question; some need "lock it in" */
V27_MIX[6].push([V28_peek, 2], [V28_change, 1.5], [V28_check, 1], [V28_steps, 1], [V28_riddle, 0.7]);
V27_MIX[7].push([V28_peek, 2], [V28_change, 1.5], [V28_check, 1.5], [V28_steps, 1.5], [V28_silly, 1], [V28_riddle, 1]);
V27_MIX[8].push([V28_peek, 2], [V28_change, 1.2], [V28_check, 1.5], [V28_steps, 2], [V28_silly, 1.2], [V28_riddle, 1.5]);
V27_MIX[9].push([V28_peek, 2], [V28_change, 1.2], [V28_check, 1.5], [V28_steps, 2], [V28_silly, 1.2], [V28_riddle, 1.5]);
const V28_CONFIRM = { 6: 0.3, 7: 0.4, 8: 0.5, 9: 0.5 };
for (const age of [6, 7, 8, 9]) {
  const t = C[age].manners.find(x => x.id === "stopthink");
  t.gen = () => {
    const q = V27_gen(age);
    if (!q.v27.tip) q.v27.tip = V28_TIPS[q.v27.f] || "🤔 Read every choice before you pick.";
    if (!q.peek && Math.random() < V28_CONFIRM[age]) q.confirm = 1;
    return q;
  };
  t.lesson = t.lesson.concat([
    L3("🔒 Ponder: are you sure?", "Sometimes Pip asks, are you sure? Look at your answer one more time. If you're sure, lock it in. If not, think again. Changing your mind after thinking is smart!",
      `<div class="v28-confirm demo"><span>🤔 Are you sure?</span><b class="btn btn-go btn-sm">🔒 Yes, lock it in</b><b class="btn btn-sm">🔄 Let me think again</b></div>`),
    L3("🌬️ Breathe and slow down", "When you feel like rushing, take a slow breath in, and a slow breath out. A calm body helps your brain think. Pip will take breathing breaks with you.",
      `<div class="v28-bubble demo" aria-hidden="true"></div><div class="sentence big-sentence">Breathe in… 2… 3… and out… 2… 3…</div>`),
  ]);
  MANNER_TRICKS[age].stopthink = "Stop: wait for green. Listen: hear every word. Think: look for NOT, ONLY and FIRST, check every choice, and lock in your answer only when you're sure.";
}

