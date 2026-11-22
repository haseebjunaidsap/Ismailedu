/* =====================================================================
   v38: three more topics for focus, listening and slowing down (ages 6–9),
   in Manners & Behavior, right after "Stop, Listen & Think".
     eagleeyes    🦅 Eagle Eyes      — focus & concentration (find, count, hunt)
     listenfollow 👂 Listen & Follow — listening and following directions
     slowsteady   🐢 Slow & Steady   — patience, careful checking, calm habits
   Uses the v27/v28 flags (wait, listen, calm, confirm, v27.tip) plus
     q.turtle  a turtle "look time" bar instead of the traffic light
   ===================================================================== */
const V38_rowsCols = age => age <= 6 ? [3, 4] : age === 7 ? [4, 5] : [5, 6];
const V38_grid = (cells, cols, opt) => {
  const rows = []; for (let i = 0; i < cells.length; i += cols) rows.push(cells.slice(i, i + cols));
  return `<div class="v38-grid${opt && opt.txt ? " txt" : ""}" style="--c:${cols}">${rows.map((r, i) => `<span class="v38-rl">${i + 1}</span>${r.map(c => `<span class="v38-c">${c}</span>`).join("")}`).join("")}</div>`;
};
const V38_SIM = [["🍎", "red apple", "🍏", "green apple"], ["🚗", "red car", "🚕", "taxi"], ["🐟", "fish", "🐠", "striped fish"], ["⭐", "star", "🌟", "shining star"], ["🌲", "pine tree", "🌳", "round tree"], ["🍪", "cookie", "🍩", "donut"], ["💙", "blue heart", "💚", "green heart"], ["🐶", "dog face", "🐱", "cat face"], ["🌕", "full moon", "🌝", "moon with a face"]];

/* ---------- Eagle Eyes (focus) ---------- */
function V38_oddRow(age) {
  const [Rr, Cc] = V38_rowsCols(age), s = pick(V38_SIM), flip = Math.random() < 0.5;
  const A = flip ? [s[2], s[3]] : [s[0], s[1]], B = flip ? [s[0], s[1]] : [s[2], s[3]];
  const pos = R(0, Rr * Cc - 1), cells = Array(Rr * Cc).fill(V27_E(A[0], A[1])); cells[pos] = V27_E(B[0], B[1]);
  const row = Math.floor(pos / Cc) + 1, spot = pos % Cc + 1;
  const both = age >= 9;
  let opts, ans; const whyNot = {};
  if (!both) {
    ans = `Row ${row}`; opts = range(1, Rr).map(r => `Row ${r}`);
    if (opts.length > 4) opts = shuffle([ans, ...shuffle(opts.filter(o => o !== ans)).slice(0, 3)]).sort();
    opts.forEach(o => { if (o !== ans) whyNot[o] = `${o} has only ${A[1]}s. Look slowly, one row at a time.`; });
  } else {
    ans = `Row ${row}, spot ${spot}`;
    const c = [[row, spot === Cc ? spot - 1 : spot + 1], [row === Rr ? row - 1 : row + 1, spot], [row === 1 ? row + 1 : row - 1, spot === 1 ? spot + 1 : spot - 1]];
    opts = shuffle([ans, ...c.map(([r, k]) => `Row ${r}, spot ${k}`)].filter((x, i, a) => a.indexOf(x) === i));
    opts.forEach(o => { if (o !== ans) whyNot[o] = `${o.replace("Row", "row").replace(/^r/, "R")} is ${V27_an(A[1])}. Count the spots from the left.`; });
  }
  return V27_q(age, {
    q: `🦅 One picture is different. <b>Where is the ${B[1]}?</b>`, say: `Look closely. One picture is different. Where is the ${B[1]}?${both ? " Say the row, then count the spots from the left." : ""}`,
    vis: V38_grid(cells, Cc), opts, ans, why: `The ${B[1]} is in row ${row}${both ? `, spot ${spot} from the left` : ""}. All the others are ${A[1]}s.`, whyNot,
    key: `v38E${s[0]}${pos}${Rr}${Cc}${flip}`, big: 0, v27: { f: "eodd", tip: "🔎 Look at one row at a time." },
  });
}
function V38_countHidden(age) {
  const [Rr, Cc] = V38_rowsCols(age), s = pick(V38_SIM), flip = Math.random() < 0.5;
  const A = flip ? [s[2], s[3]] : [s[0], s[1]], B = flip ? [s[0], s[1]] : [s[2], s[3]];
  const N = Rr * Cc, k = R(2, age <= 6 ? 4 : age === 7 ? 6 : 8);
  const cells = shuffle([...Array(k).fill(V27_E(B[0], B[1])), ...Array(N - k).fill(V27_E(A[0], A[1]))]);
  const ans = String(k), opts = numU(k, [k + 1, k - 1, N - k, k + 2], 2, 1), whyNot = {};
  opts.forEach(o => { if (o === ans) return; whyNot[o] = +o === N - k ? `${o} is how many ${A[1]}s there are. Count only the ${B[1]}s.` : `Count again, slowly, one row at a time. Touch each ${B[1]} as you count.`; });
  return V27_q(age, {
    q: `🦅 Count carefully. <b>How many ${B[1]}s ${V27_E(B[0], B[1])} can you find?</b>`, say: `Count carefully. How many ${B[1]}s can you find? Go one row at a time.`,
    vis: V38_grid(cells, Cc), opts, ans, why: `There ${k === 1 ? "is" : "are"} ${k} ${B[1]}s hiding among the ${A[1]}s.`, whyNot, key: `v38C${cells.join("")}`, big: 0, v27: { f: "ecount", tip: "👆 Point to each one as you count." },
  });
}
function V38_letters(age) {
  const tgt = pick(["b", "d", "p", "q"]), len = age <= 7 ? 12 : age === 8 ? 16 : 20, k = R(3, age <= 7 ? 5 : 7);
  const others = ["b", "d", "p", "q"].filter(x => x !== tgt);
  const line = shuffle([...Array(k).fill(tgt), ...Array(len - k).fill(0).map(() => pick(others))]);
  const ans = String(k), opts = numU(k, [k + 1, k - 1, k + 2, line.filter(x => x === ({ b: "d", d: "b", p: "q", q: "p" })[tgt]).length], 2, 1), whyNot = {};
  opts.forEach(o => { if (o !== ans) whyNot[o] = `Count again slowly. Some letters look like “${tgt}” but face the other way.`; });
  return V27_q(age, {
    q: `🦅 Eagle eyes! <b>How many times do you see the letter “${tgt}”?</b>`, say: `Eagle eyes! How many times do you see the letter ${tgt}? Careful, some letters look alike.`,
    vis: `<div class="v38-letters">${line.map(x => `<span>${x}</span>`).join("")}</div>`, opts, ans, why: `The letter “${tgt}” shows up ${k} times. Letters like ${V27_list(others.map(x => `“${x}”`))} look alike, so we look slowly.`, whyNot,
    key: `v38L${line.join("")}`, big: 0, v27: { f: "eletters", tip: "🔎 Look at which way each letter faces." },
  });
}
function V38_numberHunt(age) {
  const [Rr, Cc] = V38_rowsCols(age);
  let tgt, pool;
  if (age <= 6) { tgt = R(1, 9); pool = range(1, 9).filter(x => x !== tgt); }
  else { tgt = R(12, 98); while (tgt % 10 === 0 || Math.floor(tgt / 10) === tgt % 10) tgt = R(12, 98); const rev = (tgt % 10) * 10 + Math.floor(tgt / 10); pool = [rev, tgt + 1, tgt - 1, tgt + 10, tgt - 10, ...range(11, 99)].filter(x => x !== tgt && x > 9 && x < 100); }
  const N = Rr * Cc, cells = []; for (let i = 0; i < N; i++) cells.push(i < 4 && age > 6 ? pool[i] : pick(pool));
  const pos = R(0, N - 1); const sh = shuffle(cells); sh[pos] = tgt;
  const row = Math.floor(pos / Cc) + 1, ans = `Row ${row}`;
  let opts = range(1, Rr).map(r => `Row ${r}`); if (opts.length > 4) opts = shuffle([ans, ...shuffle(opts.filter(o => o !== ans)).slice(0, 3)]).sort();
  const whyNot = {}; opts.forEach(o => { if (o === ans) return; const r = +o.slice(4); const row_ = sh.slice((r - 1) * Cc, r * Cc); const near = row_.find(x => String(x).split("").sort().join("") === String(tgt).split("").sort().join("")); whyNot[o] = near != null && near !== tgt ? `${o} has ${near}, which looks like ${tgt} but isn't. Look again.` : `${tgt} is not in ${o.toLowerCase()}. Check each number.`; });
  return V27_q(age, {
    q: `🦅 Number hunt! <b>Which row has the number ${tgt}?</b>`, say: `Number hunt! Which row has the number ${tgt}? Look at every number carefully.`,
    vis: V38_grid(sh.map(String), Cc, { txt: 1 }), opts, ans, why: `${tgt} is in row ${row}.${age > 6 ? ` Watch out for ${(tgt % 10) * 10 + Math.floor(tgt / 10)}: it has the same digits in a different order.` : ""}`, whyNot,
    key: `v38H${sh.join(",")}`, big: 0, v27: { f: "ehunt", tip: "🔎 Read each number, digit by digit." },
  });
}

/* ---------- Listen & Follow (listening) ---------- */
const V38_ACTS = [["🧼", "wash your hands"], ["👟", "put on your shoes"], ["🧥", "get your coat"], ["🪥", "brush your teeth"], ["🐱", "feed the cat"], ["📖", "open your book"], ["✏️", "sharpen your pencil"], ["🎒", "pack your backpack"], ["🧸", "put away your toys"], ["🥛", "drink your milk"], ["🛏️", "make your bed"], ["🧦", "put on your socks"]];
const V38_ACTS_SAFE = V38_ACTS.filter(a => a[0] !== "🪥");
function V38_order(age) {
  const acts = shuffle(V38_ACTS_SAFE.slice()), three = age >= 8 && Math.random() < 0.6;
  const label = a => `${V27_E(a[0], a[1])} ${cap(a[1])}`;
  let spoken, order;
  if (!three) {
    const [A, B] = acts, m = pick(["before", "after", "butfirst", "then"]);
    if (m === "before") { spoken = `Before you ${A[1]}, ${B[1]}.`; order = [B, A]; }
    else if (m === "after") { spoken = `After you ${A[1]}, ${B[1]}.`; order = [A, B]; }
    else if (m === "butfirst") { spoken = `${cap(A[1])}, but first, ${B[1]}.`; order = [B, A]; }
    else { spoken = `${cap(A[1])}, and then ${B[1]}.`; order = [A, B]; }
  } else {
    const [A, B, Cx] = acts, m = pick(["a", "b"]);
    if (m === "a") { spoken = `${cap(A[1])}. But before that, ${B[1]}. When you're done, ${Cx[1]}.`; order = [B, A, Cx]; }
    else { spoken = `After you ${A[1]}, ${B[1]}. But the very first thing to do is ${Cx[1]}.`; order = [Cx, A, B]; }
  }
  const askLast = order.length === 3 && Math.random() < 0.4, tgt = askLast ? order[order.length - 1] : order[0];
  const ask = askLast ? "What do you do LAST?" : "What do you do FIRST?";
  const extra = acts.slice(order.length, order.length + (4 - order.length));
  const opts = shuffle([...order, ...extra]).map(label), whyNot = {};
  order.forEach((a, i) => { if (a !== tgt) whyNot[label(a)] = `Pip said it, but you do that ${V27_ORD[i]}. Listen for words like before, after and first.`; });
  extra.forEach(a => { whyNot[label(a)] = `Pip didn't say to ${a[1]}.`; });
  return V27_q(age, {
    q: `👂 ${spoken} <b>${ask}</b>`, say: `Listen to the whole direction before you answer. ${spoken} ${ask.replace(/FIRST|LAST/, w => w.toLowerCase())}`, listen: 1,
    vis: `<div class="v27-ear">👂</div>`, opts, ans: label(tgt), why: `The order is: ${order.map(a => a[1]).join(", then ")}.`, whyNot,
    key: `v38O${spoken}${ask}`, v27: { f: "lorder", tip: "👂 Listen for: before, after, first, then." },
  });
}
function V38_moves(age) {
  const n = age <= 7 ? 3 : 4, k = age <= 6 ? 2 : age === 7 ? pick([2, 3]) : age === 8 ? 3 : pick([3, 4]);
  const pics = shuffle(V27_ITEMS.slice()).slice(0, n * n);
  for (let tries = 0; tries < 100; tries++) {
    let r = R(0, n - 1), c = R(0, n - 1); const start = [r, c], path = [[r, c]], steps = [];
    let ok = true;
    for (let i = 0; i < k; i++) {
      const dirs = [["right", 0, 1], ["left", 0, -1], ["down", 1, 0], ["up", -1, 0]].filter(([, dr, dc]) => r + dr >= 0 && r + dr < n && c + dc >= 0 && c + dc < n);
      const [w, dr, dc] = pick(dirs); const amt = age >= 8 && Math.random() < 0.4 && r + 2 * dr >= 0 && r + 2 * dr < n && c + 2 * dc >= 0 && c + 2 * dc < n ? 2 : 1;
      r += dr * amt; c += dc * amt; steps.push(`Go ${amt === 1 ? "one square" : "two squares"} ${w}.`); path.push([r, c]);
    }
    if (r === start[0] && c === start[1]) ok = false;
    if (!ok) continue;
    const at = ([y, x]) => pics[y * n + x], end = at([r, c]), s0 = at(start);
    const spoken = `Start on the ${s0[1]}. ${steps.join(" ")}`;
    const label = x => V27_O(x[0], x[1]), whyNot = {}, cand = [];
    const add = (pc, why) => { if (pc !== end && !cand.includes(pc) && cand.length < 3) { cand.push(pc); whyNot[label(pc)] = why; } };
    if (path.length > 2) add(at(path[path.length - 2]), "That's where you are before the last move. Do every step.");
    add(at(path[1]), "That's where you are after only the first move.");
    add(s0, "That's where you started. Now follow the moves.");
    [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([dy, dx]) => { const y = r + dy, x = c + dx; if (y >= 0 && y < n && x >= 0 && x < n) add(at([y, x]), "That's one square away. Check each move again."); });
    const vis = `<div class="v38-board" style="--c:${n}">${pics.map(x => `<span>${V27_E(x[0], x[1])}</span>`).join("")}</div>`;
    return V27_q(age, {
      q: `👂 ${spoken} <b>Where are you now?</b>`, say: `Listen to all the moves. Use your finger on the picture. ${spoken} Where are you now?`, listen: 1, vis,
      opts: shuffle([end, ...cand].map(label)), ans: label(end), why: `${spoken} You end on the ${end[1]}.`, whyNot, key: `v38M${spoken}${pics.map(x => x[1]).join()}`, big: 0, v27: { f: "lmoves", tip: "👆 Move your finger one step at a time." },
    });
  }
  return V38_order(age);
}
const V38_SNDS = [["👏", "clap"], ["👣", "stomp"], ["🥁", "drum"], ["🔔", "ding"]];
function V38_pattern(age) {
  const units = age <= 6 ? [["A", "B"], ["A", "A", "B"]] : age === 7 ? [["A", "A", "B"], ["A", "B", "B"], ["A", "B", "C"]] : [["A", "A", "B", "B"], ["A", "B", "C"], ["A", "A", "B", "C"], ["A", "B", "A", "C"]];
  const u = pick(units), snd = shuffle(V38_SNDS.slice()), map = { A: snd[0], B: snd[1], C: snd[2] };
  const reps = u.length <= 2 ? 3 : 2, seq = []; for (let i = 0; i < reps; i++) seq.push(...u);
  const cut = R(1, u.length - 1), shown = seq.concat(u.slice(0, cut)), next = map[u[cut]];
  const spoken = shown.map(x => map[x][1]).join(", ") + "…";
  const label = x => V27_O(x[0], x[1]), used = [...new Set(u)].map(x => map[x]);
  const opts = shuffle([...used, ...snd.filter(x => !used.includes(x))].slice(0, Math.min(4, used.length + 1))).map(label), whyNot = {};
  opts.forEach(o => { if (o !== label(next)) whyNot[o] = `The pattern repeats: ${u.map(x => map[x][1]).join(", ")}. Listen again and say it with Pip.`; });
  return V27_q(age, {
    q: `👂 Sound pattern: ${spoken} <b>What comes next?</b>`, say: `Listen to the sound pattern. ${spoken} What comes next?`, listen: 1, vis: `<div class="v27-ear">👂🎵</div>`,
    opts, ans: label(next), why: `The pattern goes ${u.map(x => map[x][1]).join(", ")}, again and again, so next is ${next[1]}.`, whyNot, key: `v38P${spoken}`, v27: { f: "lpattern", tip: "🎵 Say the pattern quietly with Pip." },
  });
}
const V38_ANIMALS = [["🐶", "dog"], ["🐱", "cat"], ["🐭", "mouse"], ["🐰", "bunny"], ["🐴", "horse"], ["🐷", "pig"], ["🐮", "cow"], ["🦆", "duck"]];
const V38_COLS2 = ["brown", "white", "gray", "black", "spotted", "tiny", "fluffy", "sleepy"];
function V38_detail(age) {
  const n = age <= 6 ? 2 : age <= 7 ? 3 : 4, an = shuffle(V38_ANIMALS.slice()).slice(0, n), ad = shuffle(V38_COLS2.slice()).slice(0, n);
  const i = R(0, n - 1), ask = pick(["word", "animal"]);
  const spoken = `On the farm, Pip saw ${V27_list(an.map((a, j) => `${V27_an(ad[j])} ${a[1]}`))}.`;
  let q, ans, opts; const whyNot = {};
  if (ask === "word") {
    q = `What word did Pip use for the ${an[i][1]}?`; ans = cap(ad[i]);
    opts = shuffle([ad[i], ...shuffle(V38_COLS2.filter(x => x !== ad[i])).slice(0, 3)]).map(cap);
    opts.forEach(o => { if (o !== ans) { const j = ad.indexOf(o.toLowerCase()); whyNot[o] = j >= 0 ? `Pip said “${o.toLowerCase()}” for the ${an[j][1]}, not the ${an[i][1]}.` : `Pip didn't say “${o.toLowerCase()}”.`; } });
  } else {
    q = `Which animal was ${ad[i]}?`; ans = V27_O(an[i][0], an[i][1]);
    const more = shuffle(V38_ANIMALS.filter(x => !an.includes(x))).slice(0, Math.max(0, 4 - n));
    opts = shuffle([...an, ...more]).slice(0, 4); if (!opts.includes(an[i])) opts[0] = an[i]; opts = shuffle(opts).map(x => V27_O(x[0], x[1]));
    opts.forEach(o => { if (o !== ans) { const j = an.findIndex(x => V27_O(x[0], x[1]) === o); whyNot[o] = j >= 0 ? `Pip said the ${an[j][1]} was ${ad[j]}.` : `Pip didn't see a ${xPlain(o)}.`; } });
  }
  return V27_q(age, {
    q: `👂 ${spoken} <b>${q}</b>`, say: `Listen for the little words. ${spoken} ${q}`, listen: 1, vis: `<div class="v27-ear">👂🐾</div>`,
    opts, ans, why: `Pip said ${V27_an(ad[i])} ${an[i][1]}.`, whyNot, key: `v38D${spoken}${q}`, v27: { f: "ldetail", tip: "👂 Make a picture in your mind for each animal." },
  });
}

/* ---------- Slow & Steady (patience, careful checking, calm habits) ---------- */
function V38_exact(age) {
  const useWord = age >= 7 && Math.random() < 0.45;
  let tgt, alts;
  if (useWord) {
    const w = pick(age <= 7 ? ["garden", "rabbit", "pencil", "basket", "rocket", "window", "ladder", "kitten"] : ["umbrella", "elephant", "sandwich", "birthday", "dinosaur", "mountain", "triangle", "computer"]);
    const sw = (s, i) => s.slice(0, i) + s[i + 1] + s[i] + s.slice(i + 2);
    const set = new Set([w]); alts = [];
    for (let g = 0; g < 50 && alts.length < 3; g++) { const i = R(1, w.length - 2), v = Math.random() < 0.6 ? sw(w, i) : w.slice(0, i) + w.slice(i + 1, i + 2) + w.slice(i + 1); if (!set.has(v)) { set.add(v); alts.push(v); } }
    tgt = w;
  } else {
    const len = age <= 6 ? 3 : age === 7 ? 4 : age === 8 ? 5 : 6;
    const d = []; while (d.length < len) { const x = R(1, 9); if (d[d.length - 1] !== x) d.push(x); }
    tgt = d.join(" "); const set = new Set([tgt]); alts = [];
    for (let g = 0; g < 50 && alts.length < 3; g++) { const e = d.slice(), i = R(0, len - 2); if (Math.random() < 0.6) [e[i], e[i + 1]] = [e[i + 1], e[i]]; else e[R(0, len - 1)] = R(1, 9); const v = e.join(" "); if (!set.has(v)) { set.add(v); alts.push(v); } }
  }
  const W = s => `<span class="v38-nobr">${esc(s)}</span>`; /* never split a word across lines */
  const whyNot = {}; alts.forEach(a => { const ta = useWord ? tgt.split("") : tgt.split(" "), aa = useWord ? a.split("") : a.split(" "); const j = ta.findIndex((x, k) => x !== aa[k]); whyNot[W(a)] = j < 0 || j >= aa.length ? `Look again, letter by letter.` : `Look at spot ${j + 1}: it has “${aa[j]}”, but it should be “${ta[j]}”.`; });
  return V27_q(age, {
    q: `🐢 Slow and steady. <b>Which one is EXACTLY the same?</b>`, say: `Slow and steady. Which one is exactly the same as the one in the box? Check every ${useWord ? "letter" : "number"}.`,
    vis: `<div class="v38-copy">${esc(tgt)}</div>`, opts: shuffle([tgt, ...alts]).map(W), ans: W(tgt), why: `“${tgt}” matches the box exactly, ${useWord ? "letter" : "number"} by ${useWord ? "letter" : "number"}.`, whyNot,
    key: `v38X${tgt}|${alts.join("|")}`, turtle: 1, wait: age <= 6 ? 3 : 4, v27: { f: "sexact", tip: "🐢 Check one spot at a time, left to right." },
  });
}
function V38_typo(age) {
  const sets = age <= 7 ? [["house", "hosue"], ["mouse", "muose"], ["water", "wtaer"], ["happy", "hpapy"], ["apple", "aplpe"], ["green", "gerne"], ["table", "tabel"], ["sister", "sitser"]]
    : [["friend", "freind"], ["because", "becuase"], ["school", "shcool"], ["animal", "anmial"], ["people", "poeple"], ["family", "famliy"], ["morning", "mornign"], ["pretty", "prtety"]];
  const [good, bad] = pick(sets), fill = shuffle(sets.filter(s => s[0] !== good).map(s => s[0])).slice(0, 3);
  const opts = shuffle([bad, ...fill]), whyNot = {}; fill.forEach(w => { whyNot[w] = `“${w}” is spelled the right way. Read each word slowly.`; });
  return V27_q(age, {
    q: `🐢 Read slowly. <b>Which word is spelled wrong?</b>`, say: "Read slowly. Which word is spelled wrong? Look at every letter.",
    vis: `<div class="v27-show sm">🐢📖</div>`, opts, ans: bad, why: `“${bad}” has mixed-up letters. It should be “${good}”.`, whyNot, key: `v38T${bad}${fill.join()}`, turtle: 1, wait: 3, v27: { f: "styp", tip: "🐢 Say each word slowly in your head." },
  });
}
const V38_HABITS = {
  young: [
    ["You have a whole page of work and you want to finish fast.", "Do one problem at a time and check it.", ["Scribble answers to be done.", "Skip the hard ones.", "Give up."], "Little steps get big jobs done the right way.", "📄", ["Fast but wrong means doing it again.", "Hard ones help you learn.", "You can do it, one step at a time."]],
    ["The TV is on while you try to read.", "Ask to turn it off or move to a quiet spot.", ["Read louder than the TV.", "Watch TV and read at the same time.", "Stop reading."], "A quiet spot helps your brain focus.", "📺", ["That's hard and noisy.", "Your brain can't focus on both.", "You can read in a quiet place."]],
    ["Your body feels wiggly in your chair.", "Take 3 slow breaths, then try again.", ["Run around the room.", "Bother your neighbor.", "Leave without asking."], "Slow breaths help a wiggly body feel calm.", "🌬️", ["That makes it harder to come back.", "That stops them from working.", "Ask first, then take a short break."]],
    ["You don't like waiting for your turn on the slide.", "Count slowly to 10 while you wait.", ["Push to the front.", "Climb up the slide.", "Yell “Hurry up!”"], "Counting helps the wait feel shorter.", "⏳", ["Pushing isn't safe or fair.", "Climbing up the slide is unsafe.", "Yelling doesn't make it faster."]],
    ["You made a mistake in your drawing.", "Take a breath and fix it slowly.", ["Rip up the paper.", "Say “I'm bad at this!”", "Throw your crayons."], "Mistakes can be fixed with calm hands.", "🖍️", ["Then all your work is gone.", "Everyone makes mistakes.", "That can break them or hurt someone."]],
    ["The teacher is still talking, but you want to start.", "Wait until she finishes, then start.", ["Start now and guess the rest.", "Talk to your friend.", "Close your eyes."], "Hearing all the directions helps you do it right.", "👩‍🏫", ["You might miss an important step.", "Then you can't hear her.", "Then you can't see what she shows."]],
    ["You feel bored doing your reading.", "Read one page, then take a quick stretch.", ["Stop reading for the day.", "Flip pages without reading.", "Read the last page only."], "Small goals with tiny breaks keep you going.", "📚", ["You won't finish the book.", "That's not really reading.", "You'd miss the story."]],
    ["You want to build a tall block tower fast.", "Put each block on slowly and carefully.", ["Stack them as fast as you can.", "Throw blocks on top.", "Build it on a wobbly pillow."], "Slow and careful towers stand tall.", "🧱", ["Fast stacking makes towers fall.", "They'll crash.", "It needs a flat, steady place."]],
  ],
  old: [
    ["You have three homework pages and feel overwhelmed.", "Make a list, do one page, then check it off.", ["Do a little of each page at once.", "Do none of them.", "Copy a friend's answers."], "Breaking big jobs into small steps makes them doable.", "✅", ["Jumping around makes it confusing.", "It won't get done.", "That's not honest, and you don't learn."]],
    ["You finished a math sheet in two minutes.", "Go back and check every answer slowly.", ["Hand it in right away.", "Start drawing on it.", "Tell everyone you're done first."], "Checking catches silly mistakes.", "🔍", ["Fast isn't always right.", "That's not checking.", "Being first isn't the goal."]],
    ["A game is hard and you keep losing.", "Take a short break, then try a new plan.", ["Throw the controller.", "Quit and never play again.", "Blame the game."], "Calm breaks help your brain find new ideas.", "🎮", ["That could break it.", "You can get better with practice.", "Blaming doesn't help you improve."]],
    ["Your thoughts jump to other things while you read.", "Put your finger under each line as you read.", ["Read faster to finish.", "Skip to the pictures.", "Read with music very loud."], "A finger guide helps your eyes and brain stay on track.", "👉", ["Faster makes you miss more.", "Pictures don't tell everything.", "Loud music makes focusing harder."]],
    ["The teacher gives 4 directions at once.", "Repeat them in your head, or write them down.", ["Do just the first one.", "Do them in any order.", "Wait for a friend to do it."], "Repeating directions helps you remember them all.", "📝", ["You'd miss three steps.", "Order can matter.", "It's your job to try."]],
    ["You want to quit your piano practice after 2 minutes.", "Set a timer for 10 minutes and keep going.", ["Stop now.", "Bang the keys.", "Only play the easy song."], "A timer gives your practice a clear finish line.", "⏲️", ["You won't improve.", "That's not practicing.", "The hard parts help you grow."]],
    ["You get a new puzzle with 100 pieces.", "Start with the edges, then sort by color.", ["Dump it and push pieces together.", "Do it in five minutes.", "Hide the hard pieces."], "A step-by-step plan makes big puzzles easier.", "🧩", ["Forcing pieces can bend them.", "Rushing makes it harder.", "You need every piece."]],
    ["You're excited and want to tell your friend something while she's talking.", "Wait for her to finish, then share.", ["Interrupt right away.", "Talk louder than her.", "Walk away."], "Waiting your turn shows you're listening.", "💬", ["That cuts her off.", "That isn't kind.", "That's not listening."]],
  ],
};
function V38_habit(age) {
  const [sit, best, wrong, why, e, nots] = pick(V38_HABITS[age <= 7 ? "young" : "old"]);
  const whyNot = {}; wrong.forEach((w, i) => { whyNot[w] = nots[i]; });
  return V27_q(age, {
    q: "What is the <b>best</b> thing to do?", say: `${sit} What is the best thing to do?`, vis: `<span class="emo xxl">${e}</span><div class="passage scene">${sit}</div>`,
    opts: shuffle([best, ...wrong]), ans: best, why, whyNot, key: `v38B${sit}`, big: 0, turtle: 1, wait: 3, v27: { f: "shabit", xo: "manners", tip: "🐢 Think about what would really help." },
  });
}

/* ---------- topic setup ---------- */
const V38_MIX = {
  eagleeyes: [[V38_oddRow, 3], [V38_countHidden, 3], [V38_letters, 2], [V38_numberHunt, 2]],
  listenfollow: [[V38_order, 3], [V38_moves, 3], [V38_pattern, 2], [V38_detail, 2.5]],
  slowsteady: [[V38_exact, 3], [V38_typo, 2], [V38_habit, 3]],
};
const V38_TOPICS = [
  ["eagleeyes", "Eagle Eyes", "🦅", "Find, count and hunt. Look slowly and carefully.", "Eagle eyes look slowly: one row at a time, point as you count, and check before you tap.",
    age => [
      L3("🦅 Eagle eyes look slowly", "An eagle looks very carefully before it swoops. You can too! Look at one row at a time, from left to right.", `<div class="v38-grid" style="--c:4"><span class="v38-rl">1</span><span class="v38-c">🍎</span><span class="v38-c">🍎</span><span class="v38-c">🍎</span><span class="v38-c">🍎</span><span class="v38-rl">2</span><span class="v38-c">🍎</span><span class="v38-c">🍏</span><span class="v38-c">🍎</span><span class="v38-c">🍎</span></div>`),
      L3("👆 Point as you count", "When you count, touch each thing with your finger. Then nothing gets counted twice, and nothing gets missed.", pics(["👆", "Point", "touch each one"], ["🔢", "Count", "say the numbers"], ["✅", "Check", "count again"])),
      L3("🔎 Look-alikes are tricky", "Some things look almost the same, like b and d, or 47 and 74. Look at every part before you decide.", `<div class="v38-letters"><span>b</span><span>d</span><span>p</span><span>q</span></div><div class="sentence big-sentence">47 ≠ 74</div>`),
    ]],
  ["listenfollow", "Listen & Follow", "👂", "Hear the whole direction, then follow every step.", "Listen to the whole direction. Words like before, after and first tell you the order. Picture each step as Pip says it.",
    age => [
      L3("👂 Listen to the WHOLE direction", "Don't start until Pip is done! The most important part might come at the end.", `<div class="sentence big-sentence">“Get your coat, <b class="hl">but first</b>, put on your shoes.”</div>`),
      L3("⏱️ Order words", "Before, after, first, and then tell you what to do first. “Before you eat, wash your hands” means wash first!", pics(["1️⃣", "First", "do it first"], ["⬅️", "Before", "do this one first"], ["➡️", "After", "do it next"])),
      L3("🧠 Picture it", "Make a little movie in your mind for each step. Use your finger to follow moves on a picture.", pics(["🎬", "Movie", "see each step"], ["👆", "Finger", "follow the moves"], ["🔊", "Again", "tap to hear it again"])),
    ]],
  ["slowsteady", "Slow & Steady", "🐢", "Take your time, check carefully, and learn calm habits.", "Slow and steady wins: wait for the turtle, check one spot at a time, and break big jobs into small steps.",
    age => [
      L3("🐢 Slow and steady wins", "Remember the turtle and the rabbit? The rabbit rushed and lost. The turtle went slow and steady, and won!", `<div class="v38-turtle demo"><span class="v38-track"><i class="v38-shell">🐢</i></span><span class="v27-lt">Look closely…</span></div>`),
      L3("🔍 Check one spot at a time", "To check if two things are the same, look at the first letter or number, then the next, then the next.", `<div class="v38-copy">3 8 1 9</div><div class="sentence big-sentence">3 ✔ 8 ✔ 1 ✔ 9 ✔</div>`),
      L3("🧰 Calm habits", "When you want to rush: breathe slowly, do one step at a time, and check your work. Small steps make big jobs easy.", pics(["🌬️", "Breathe", "3 slow breaths"], ["1️⃣", "One step", "then the next"], ["✅", "Check", "before you finish"])),
    ]],
];
for (const age of [6, 7, 8, 9]) {
  for (const [id, title, icon, blurb, trick, lesson] of V38_TOPICS) {
    MANNER_TRICKS[age][id] = trick;
    const mix = V38_MIX[id], tot = mix.reduce((s, x) => s + x[1], 0);
    topic(age, "manners", {
      id, title, icon, blurb, lesson: lesson(age),
      gen: () => {
        let r = Math.random() * tot, fn = mix[0][0];
        for (const [f, w] of mix) { r -= w; if (r <= 0) { fn = f; break; } }
        const q = fn(age);
        if (!q.peek && Math.random() < (age <= 6 ? 0.25 : 0.4)) q.confirm = 1;
        return q;
      },
    });
  }
  /* order: Stop, Listen & Think, then these three, then the rest */
  const arr = C[age].manners;
  ["slowsteady", "listenfollow", "eagleeyes"].forEach(id => { const i = arr.findIndex(t => t.id === id); if (i >= 0) arr.splice(1, 0, arr.splice(i, 1)[0]); });
}

