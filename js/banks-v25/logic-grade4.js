/* =====================================================================
   v25 · Age 9 Logic (tag V25LG9_)
   New formats for every age-9 logic topic. Every new question carries
   q.v25 = { kind, r } where r maps each wrong option to a short, true reason
   worked out when the question was made. The whyRule for each topic just
   reads that map and returns null for anything that isn't ours.
   ===================================================================== */

const V25LG9_P = [["Aria", "she"], ["Noah", "he"], ["Elena", "she"], ["Felix", "he"], ["Grace", "she"], ["Hugo", "he"], ["Isla", "she"], ["Jonah", "he"], ["Keira", "she"], ["Luca", "he"], ["Mira", "she"], ["Nico", "he"], ["Olive", "she"], ["Pablo", "he"], ["Ruby", "she"], ["Rhys", "he"], ["Sofia", "she"], ["Tariq", "he"], ["Uma", "she"], ["Victor", "he"], ["Wren", "she"], ["Yusuf", "he"], ["Zara", "she"], ["Arjun", "he"], ["Bella", "she"], ["Caleb", "he"], ["Dalia", "she"], ["Ezra", "he"]];
const V25LG9_N = V25LG9_P.map(p => p[0]);
const V25LG9_his = pr => pr === "she" ? "her" : "his";
const V25LG9_pl = (n, one, many) => `${n} ${n === 1 ? one : many}`;
const V25LG9_ABC = () => `<div class="abc-strip">${ALPHA.split("").map(l => `<span>${l}</span>`).join("")}</div>`;

/* attach the wrong-option reasons; why(o) gets each wrong option string */
function V25LG9_fin(q, kind, why, extra) {
  const r = {};
  q.opts.forEach(o => { if (o !== q.ans) { const t = why(o); if (t) r[o] = t; } });
  q.v25 = Object.assign({ kind, r }, extra || {});
  return q;
}
const V25LG9_RULE = (q, picked) => {
  const x = q && q.v25; if (!x || !x.r) return null;
  if (x.r[picked]) return x.r[picked];
  const p = xPlain(picked).trim();
  for (const k in x.r) if (xPlain(k).trim() === p) return x.r[k];
  return null;
};

/* ---------------------------------------------------------------------
   deduce: new clue shapes ("neither…nor", "the kid who… is not", "or"),
   and 4-kid puzzles. Every puzzle is checked by a solver to have exactly one answer.
   --------------------------------------------------------------------- */
const V25LG9_DC = [
  ["hat", [["🎩", "top hat"], ["👒", "sun hat"], ["👑", "crown"], ["🎓", "graduation cap"]]],
  ["toy vehicle", [["🚒", "fire truck"], ["🚜", "tractor"], ["🚁", "helicopter"], ["⛵", "sailboat"], ["🚀", "rocket"], ["🚌", "bus"]]],
  ["animal sticker", [["🦁", "lion"], ["🐘", "elephant"], ["🐯", "tiger"], ["🐧", "penguin"], ["🦊", "fox"], ["🐼", "panda"]]],
  ["flower", [["🌻", "sunflower"], ["🌹", "rose"], ["🌷", "tulip"], ["🌸", "cherry blossom"]]],
  ["treat", [["🍰", "cake"], ["🍩", "donut"], ["🍦", "ice cream cone"], ["🍭", "lollipop"], ["🍫", "chocolate bar"]]],
  ["bath toy", [["🐳", "whale"], ["🐬", "dolphin"], ["🦀", "crab"], ["🦆", "duck"], ["🐢", "turtle"]]],
  ["poster", [["🌈", "rainbow"], ["🌋", "volcano"], ["🏰", "castle"], ["🗽", "statue"], ["🎡", "Ferris wheel"]]],
];
function V25LG9_solve(n, allow) {
  const sols = [], used = [], cur = [];
  const go = k => { if (k === n) { sols.push(cur.slice()); return; } for (const i of allow[k]) if (!used[i]) { used[i] = 1; cur.push(i); go(k + 1); cur.pop(); used[i] = 0; } };
  go(0); return sols;
}
addBank(9, "logic", "deduce", 0.3, function () {
  const fmt = pick(["neither", "notkid", "four", "or"]), n = fmt === "four" ? 4 : 3;
  const [cat, items] = pick(V25LG9_DC.filter(c => c[1].length >= n)), K = shuffle(V25LG9_N).slice(0, n), I = shuffle(items).slice(0, n), nm = i => I[i][1];
  let clueTxt, cons, sol, why;
  /* cons: [clueNo, type, kidIndex, [itemIndexes]]; type "not" = kid did not pick those, "pos" = kid picked it, "or" = kid picked one of them */
  if (fmt === "neither") {
    clueTxt = [`Neither ${K[0]} nor ${K[1]} picked the ${nm(0)}.`, `${K[0]} did not pick the ${nm(1)}.`];
    cons = [[1, "not", 0, [0]], [1, "not", 1, [0]], [2, "not", 0, [1]]]; sol = [2, 1, 0];
    why = `Clue 1 means ${K[2]} picked the ${nm(0)}. Clue 2 leaves ${K[0]} the ${nm(2)}, so ${K[1]} has the ${nm(1)}.`;
  } else if (fmt === "notkid") {
    clueTxt = [`The kid who picked the ${nm(0)} is not ${K[0]}.`, `${K[1]} picked the ${nm(1)}.`];
    cons = [[1, "not", 0, [0]], [2, "pos", 1, [1]]]; sol = [2, 1, 0];
    why = `${K[1]} has the ${nm(1)}. ${K[0]} didn't pick the ${nm(0)}, so ${K[0]} has the ${nm(2)}, and ${K[2]} has the ${nm(0)}.`;
  } else if (fmt === "or") {
    clueTxt = [`${K[0]} picked the ${nm(0)} or the ${nm(1)}.`, `${K[1]} picked the ${nm(1)}.`];
    cons = [[1, "or", 0, [0, 1]], [2, "pos", 1, [1]]]; sol = [0, 1, 2];
    why = `${K[1]} has the ${nm(1)}, so ${K[0]} must have the ${nm(0)}. That leaves the ${nm(2)} for ${K[2]}.`;
  } else {
    clueTxt = [`${K[0]} picked the ${nm(0)}.`, `${K[1]} did not pick the ${nm(1)} or the ${nm(2)}.`, `${K[2]} did not pick the ${nm(1)}.`];
    cons = [[1, "pos", 0, [0]], [2, "not", 1, [1, 2]], [3, "not", 2, [1]]]; sol = [0, 3, 2, 1];
    why = `${K[0]} has the ${nm(0)}. ${K[1]} can only have the ${nm(3)}. ${K[2]} can't have the ${nm(1)}, so ${K[2]} has the ${nm(2)} and ${K[3]} has the ${nm(1)}.`;
  }
  const allow = range(0, n - 1).map(k => { let s = range(0, n - 1); for (const [, t, kk, its] of cons) if (kk === k) s = t === "not" ? s.filter(i => !its.includes(i)) : s.filter(i => its.includes(i)); return s; });
  const sols = V25LG9_solve(n, allow);
  if (sols.length !== 1 || sols[0].join() !== sol.join()) return null;
  const direct = (k, i) => {
    for (const [no, t, kk, its] of cons) {
      if (kk !== k) continue;
      if (t === "not" && its.includes(i)) return `Clue ${no} says ${K[k]} did not pick the ${nm(i)}.`;
      if (t === "pos" && its[0] !== i) return `Clue ${no} says ${K[k]} picked the ${nm(its[0])}, not the ${nm(i)}.`;
      if (t === "or" && !its.includes(i)) return `Clue ${no} says ${K[k]} picked the ${nm(its[0])} or the ${nm(its[1])}.`;
    }
    return null;
  };
  const listed = shuffle(range(0, n - 1)), introK = shuffle(K.slice());
  const itemList = listed.map(i => `the ${nm(i)}`), kidList = introK.slice(0, -1).join(", ") + " and " + introK[n - 1];
  const intro = `${kidList} each picked a different ${cat}: ${itemList.slice(0, -1).join(", ")} and ${itemList[n - 1]}.`;
  const vis = passage(`${listed.map(i => I[i][0]).join(" ")}<br>${intro}<br>${clueTxt.map((c, j) => `${j + 1}. ${c}`).join("<br>")}`);
  const sayClues = clueTxt.map((c, j) => `Clue ${j + 1}. ${c}`).join(" ");
  if (Math.random() < 0.5) {
    const ti = R(0, n - 1), owner = sol.indexOf(ti);
    const q = { q: `Who picked the <b>${nm(ti)}</b>?`, say: `${intro} ${sayClues} Who picked the ${nm(ti)}?`, vis, opts: shuffle(K.slice()), ans: K[owner], big: 1, why, extra: 25, key: "v25dw" + fmt + K.join() + I.map(x => x[1]).join() + ti };
    return V25LG9_fin(q, "deduce", o => { const k = K.indexOf(o); if (k < 0) return null; return direct(k, ti) || `${o} ends up with the ${nm(sol[k])}, so ${o} can't have the ${nm(ti)} too.`; });
  }
  const kk = R(0, n - 1), o = i => `<span class="emo" title="${nm(i)}">${I[i][0]}</span> ${nm(i)}`;
  const q = { q: `Which ${cat} did <b>${K[kk]}</b> pick?`, say: `${intro} ${sayClues} Which ${cat} did ${K[kk]} pick?`, vis, opts: listed.map(o), ans: o(sol[kk]), sayAns: `the ${nm(sol[kk])}`, why, extra: 25, key: "v25dp" + fmt + K.join() + I.map(x => x[1]).join() + kk };
  return V25LG9_fin(q, "deduce", op => { const i = listed.find(j => o(j) === op); if (i == null) return null; return direct(kk, i) || `The ${nm(i)} goes to ${K[sol.indexOf(i)]}, so ${K[kk]} can't have it.`; });
});
whyRule(9, "logic", "deduce", V25LG9_RULE);

/* ---------------------------------------------------------------------
   statements: "Only …" facts (4 ways each), and secret-number clues
   --------------------------------------------------------------------- */
const V25LG9_ONLY = [
  ["Only the kids in the blue group went on the boat ride.", "is in the blue group", "is not in the blue group", "went on the boat ride", "did not go on the boat ride", "Is {N} in the blue group?", "Did {N} go on the boat ride?"],
  ["Only kids who finished the puzzle got a gold star.", "finished the puzzle", "did not finish the puzzle", "got a gold star", "did not get a gold star", "Did {N} finish the puzzle?", "Did {N} get a gold star?"],
  ["Only people with a ticket got on the train.", "has a ticket", "does not have a ticket", "got on the train", "did not get on the train", "Does {N} have a ticket?", "Did {N} get on the train?"],
  ["Only the kids in Room 5 got a blue folder.", "is in Room 5", "is not in Room 5", "got a blue folder", "did not get a blue folder", "Is {N} in Room 5?", "Did {N} get a blue folder?"],
  ["Only kids who brought a permission slip went to the zoo.", "brought a permission slip", "did not bring a permission slip", "went to the zoo", "did not go to the zoo", "Did {N} bring a permission slip?", "Did {N} go to the zoo?"],
  ["Only the players on the red team wore red shirts.", "is on the red team", "is not on the red team", "wore a red shirt", "did not wear a red shirt", "Is {N} on the red team?", "Did {N} wear a red shirt?"],
  ["Only kids who are 8 or older joined the chess club.", "is 9 years old", "is 6 years old", "joined the chess club", "did not join the chess club", "Is {N} 8 or older?", "Did {N} join the chess club?"],
  ["Only the kids who planted seeds got a flower pot.", "planted seeds", "did not plant seeds", "got a flower pot", "did not get a flower pot", "Did {N} plant seeds?", "Did {N} get a flower pot?"],
  ["Only campers in Cabin 3 went on the night hike.", "is in Cabin 3", "is not in Cabin 3", "went on the night hike", "did not go on the night hike", "Is {N} in Cabin 3?", "Did {N} go on the night hike?"],
  ["Only kids who know how to swim jumped off the diving board.", "knows how to swim", "does not know how to swim", "jumped off the diving board", "did not jump off the diving board", "Does {N} know how to swim?", "Did {N} jump off the diving board?"],
  ["Only kids who read five books got a bookmark.", "read five books", "did not read five books", "got a bookmark", "did not get a bookmark", "Did {N} read five books?", "Did {N} get a bookmark?"],
  ["Only the kids who helped clean up got a sticker.", "helped clean up", "did not help clean up", "got a sticker", "did not get a sticker", "Did {N} help clean up?", "Did {N} get a sticker?"],
  ["Only members of the garden club painted the fence.", "is in the garden club", "is not in the garden club", "painted the fence", "did not paint the fence", "Is {N} in the garden club?", "Did {N} paint the fence?"],
  ["Only kids taller than the sign rode the roller coaster.", "is taller than the sign", "is not taller than the sign", "rode the roller coaster", "did not ride the roller coaster", "Is {N} taller than the sign?", "Did {N} ride the roller coaster?"],
  ["Only the band members stayed after school today.", "is in the band", "is not in the band", "stayed after school today", "did not stay after school today", "Is {N} in the band?", "Did {N} stay after school today?"],
  ["Only kids with a hall pass were in the hallway.", "has a hall pass", "does not have a hall pass", "was in the hallway", "was not in the hallway", "Does {N} have a hall pass?", "Was {N} in the hallway?"],
];
const V25LG9_Y = "Yes, for sure", V25LG9_No = "No, for sure", V25LG9_T = "We can't tell";
addBank(9, "logic", "statements", 0.3, function () {
  const opts = [V25LG9_Y, V25LG9_No, V25LG9_T];
  if (Math.random() < 0.55) {
    const it = pick(V25LG9_ONLY), [rule, pos, neg, did, didnt, qP, qD] = it, N = pick(V25LG9_N), f = s => s.replace("{N}", N), w = R(0, 3);
    /* Only P did Q  means  Q → P */
    const cases = [[did, qP, V25LG9_Y], [pos, qD, V25LG9_T], [neg, qD, V25LG9_No], [didnt, qP, V25LG9_T]];
    const [fact, qq, ans] = cases[w], facts = `${rule} ${N} ${fact}.`, qt = f(qq);
    const R4 = [
      { [V25LG9_No]: `${N} ${did}, and only those kids did that, so the answer is yes.`, [V25LG9_T]: `“Only” means nobody else did that, so ${N} must be one of them.` },
      { [V25LG9_Y]: `“Only” doesn't mean every one of them did it, so ${N} might not have.`, [V25LG9_No]: `${N} could be one of the kids who did it, so we can't say no.` },
      { [V25LG9_Y]: `Only those kids did that, and ${N} ${neg}, so the answer is no.`, [V25LG9_T]: `${N} ${neg}, so ${N} can't be one of the kids who did that.` },
      { [V25LG9_Y]: `${N} ${didnt}, so nothing proves ${N} is one of those kids.`, [V25LG9_No]: `Some of those kids may have skipped it too, so we can't say no.` },
    ][w];
    const q = { q: qt, say: `${facts} ${qt}`, vis: passage(facts), opts, ans, why: ans === V25LG9_Y ? `“Only” means no one else did it, so ${N} has to be one of them.` : ans === V25LG9_No ? `${N} ${neg}, and only those kids did it, so ${N} didn't.` : `The facts fit both ways, so we can't be sure.`, extra: 10, key: "v25o" + rule + w + N };
    return V25LG9_fin(q, "only", o => R4[o]);
  }
  /* secret-number clues: check every whole number from 0 to 300 that fits */
  for (let tries = 0; tries < 60; tries++) {
    const N = pick(V25LG9_N), a = R(5, 40), b = a + R(3, 12), shape = pick(["gt", "lt", "gtlt", "gtpar", "ltpar", "gtlt"]), par = pick(["even", "odd"]);
    const facts = [], tests = [];
    if (/gt/.test(shape)) { facts.push(`It is bigger than ${a}.`); tests.push(v => v > a); }
    if (/lt/.test(shape)) { const lim = shape === "lt" || shape === "ltpar" ? a : b; facts.push(`It is smaller than ${lim}.`); tests.push(v => v < lim); }
    if (/par/.test(shape)) { facts.push(`It is ${par}.`); tests.push(v => (v % 2 === 0) === (par === "even")); }
    const S = range(1, 300).filter(v => tests.every(t => t(v))); if (S.length < 1) continue;
    const want = pick([V25LG9_Y, V25LG9_No, V25LG9_T]), c = R(Math.max(1, a - 4), b + 4);
    const qs = [["bigger than " + c, v => v > c, `Is it bigger than ${c}?`], ["smaller than " + c, v => v < c, `Is it smaller than ${c}?`], ["even", v => v % 2 === 0, "Is it even?"], ["odd", v => v % 2 === 1, "Is it odd?"], [String(c), v => v === c, `Is it ${c}?`]];
    const [pred, ft, qq] = pick(qs), yes = S.filter(ft), no = S.filter(v => !ft(v));
    const ans = !no.length ? V25LG9_Y : !yes.length ? V25LG9_No : V25LG9_T;
    if (ans !== want) continue;
    const intro = `${N} is thinking of a whole number. ${facts.join(" ")}`;
    const isP = `is ${pred}`, notP = `is not ${pred}`;
    const exY = yes.length ? yes[Math.min(yes.length - 1, R(0, 3))] : null, exN = no.length ? no[Math.min(no.length - 1, R(0, 3))] : null;
    const why = ans === V25LG9_Y ? `Every number that fits the clues ${isP}.` : ans === V25LG9_No ? `No number that fits the clues ${isP}.` : `It could be ${exY}, which ${isP}, or ${exN}, which ${notP}.`;
    const q = { q: qq, say: `${intro} ${qq}`, vis: passage(intro), opts: [V25LG9_Y, V25LG9_No, V25LG9_T], ans, why, extra: 10, key: "v25n" + facts.join("") + qq };
    return V25LG9_fin(q, "num", o => {
      if (ans === V25LG9_Y) return o === V25LG9_No ? `Every number that fits the clues ${isP}, so the answer is yes.` : `Every number that fits the clues ${isP}, so we can be sure.`;
      if (ans === V25LG9_No) return o === V25LG9_Y ? `No number that fits the clues ${isP}, so the answer is no.` : `No number that fits the clues ${isP}, so we can be sure.`;
      return o === V25LG9_Y ? `It could be ${exN}, which fits the clues but ${notP}.` : `It could be ${exY}, which fits the clues and ${isP}.`;
    });
  }
  return null;
});
whyRule(9, "logic", "statements", V25LG9_RULE);

/* ---------------------------------------------------------------------
   letterseq: a missing letter in the middle, mirror pairs (AZ, BY…), zigzag jumps
   --------------------------------------------------------------------- */
const V25LG9_LI = c => ALPHA.indexOf(c);
const V25LG9_JMP = d => d === 0 ? "no jump at all" : `${Math.abs(d)} ${Math.abs(d) === 1 ? "letter" : "letters"} ${d > 0 ? "forward" : "back"}`;
addBank(9, "logic", "letterseq", 0.3, function () {
  const L = i => ALPHA[i], k = R(0, 2), fill = () => pick(ALPHA.split(""));
  if (k === 0) {
    const step = pick([2, 3, 4, -2, -3, -4]), s = step > 0 ? R(0, 25 - 4 * step) : R(-4 * step, 25), seq = range(0, 4).map(i => s + step * i), m = R(1, 3), ai = seq[m], ans = L(ai);
    const cands = [ai + 1, ai - 1, seq[m - 1] + (step > 0 ? 1 : -1), ai + 2 * Math.sign(step)].filter(i => i >= 0 && i <= 25 && i !== ai).map(L);
    const cars = seq.map((v, i) => i === m ? "?" : L(v));
    const q = { q: "Which letter is missing?", say: `Which letter is missing? ${cars.map(c => c === "?" ? "blank" : c).join(", ")}.`, vis: train(cars), opts: uniq(ans, cands, fill), ans, big: 1, why: `Each step ${step > 0 ? "moves forward" : "moves back"} ${Math.abs(step)} letters: ${seq.map(L).join(", ")}.`, key: "v25m" + cars.join("") };
    return V25LG9_fin(q, "miss", o => { const d = V25LG9_LI(o) - seq[m - 1]; return d === step ? null : `From ${L(seq[m - 1])} to ${o} is ${V25LG9_JMP(d)}, but each step is ${V25LG9_JMP(step)}.`; });
  }
  if (k === 1) {
    const st = pick([1, 1, 2]), i0 = R(0, Math.floor((25 - 6 * st - 1) / 2)), g = j => [i0 + j * st, 25 - i0 - j * st], pr = j => L(g(j)[0]) + L(g(j)[1]);
    const [a, b] = g(3), ans = pr(3), cands = [L(a) + L(b + 1), L(a + 1) + L(b), L(a) + L(b - 1), L(a - 1) + L(b), L(b) + L(a)].filter(c => c !== ans);
    const firsts = range(0, 2).map(j => L(g(j)[0])).join(", "), seconds = range(0, 2).map(j => L(g(j)[1])).join(", ");
    const q = { q: "What comes next?", say: `What comes next? ${range(0, 2).map(pr).join(", ")}, then what?`, vis: train([...range(0, 2).map(pr), "?"]), opts: uniq(ans, cands), ans, big: 1, why: `The first letters go forward (${firsts}, ${L(a)}) and the second letters go back (${seconds}, ${L(b)}).`, key: "v25p" + pr(0) + st };
    return V25LG9_fin(q, "mirror", o => {
      if (o === L(b) + L(a)) return `${o} has the two letters swapped. The first letter comes from the front of the alphabet.`;
      if (o[0] !== L(a)) return `The first letters go ${firsts}, so the next first letter is ${L(a)}, not ${o[0]}.`;
      if (o[1] !== L(b)) return `The second letters go ${seconds}, so the next second letter is ${L(b)}, not ${o[1]}.`;
      return null;
    });
  }
  const [a, b] = pick([[2, 1], [3, 1], [3, 2], [4, 2]]), len = pick([5, 6]), seq = [R(0, 6)];
  for (let i = 1; i <= len; i++) seq.push(seq[i - 1] + (i % 2 ? a : -b));
  if (seq.some(v => v > 25)) return null;
  const show = seq.slice(0, len), ai = seq[len], ans = L(ai), last = show[len - 1], nextUp = len % 2 === 1;
  const cands = [nextUp ? last - b : last + a, ai + 1, ai - 1, last].filter(i => i >= 0 && i <= 25 && i !== ai).map(L);
  const q = { q: "What letter comes next?", say: `What letter comes next? ${show.map(L).join(", ")}, then what?`, vis: train([...show.map(L), "?"]), opts: uniq(ans, cands, fill), ans, big: 1, why: `The jumps take turns: ${a} forward, then ${b} back. Next is ${nextUp ? `${a} forward` : `${b} back`}: ${ans}.`, key: "v25z" + show.map(L).join("") };
  return V25LG9_fin(q, "zig", o => { const d = V25LG9_LI(o) - last; return `From ${L(last)} to ${o} is ${V25LG9_JMP(d)}, but the next jump is ${nextUp ? `${a} forward` : `${b} back`}.`; });
});
whyRule(9, "logic", "letterseq", V25LG9_RULE);

/* ---------------------------------------------------------------------
   cipher: find the shift, use the same code on a new word, decode a 2-3 word message
   --------------------------------------------------------------------- */
const V25LG9_CW = ["PIG", "FOX", "BUS", "CUP", "WEB", "JAM", "NAP", "EGG", "ANT", "GIFT", "HAND", "KING", "LAKE", "MASK", "NOSE", "PEAR", "ROPE", "SAND", "TENT", "VASE", "WOLF", "PLUM", "DESK", "HORN", "QUIZ", "YARN", "ZERO"];
const V25LG9_MSG = ["GO HOME", "RUN FAST", "BIG DOG", "HOT SUN", "RED HAT", "SEE YOU", "MEET ME", "LOOK UP", "SIT DOWN", "BE KIND", "GOOD JOB", "HELP ME", "COME IN", "WAKE UP", "DIG HERE", "HIDE NOW", "JUMP HIGH", "READ MORE", "HAVE FUN", "BAKE A CAKE", "FIND THE KEY", "LOOK LEFT"];
const V25LG9_SH = (s, k) => s.split(" ").map(w => shift(w, k)).join(" ");
const V25LG9_DIFF = (from, to) => { if (from.length !== to.length) return null; const ds = []; for (let i = 0; i < from.length; i++) { if ((from[i] === " ") !== (to[i] === " ")) return null; if (from[i] !== " ") ds.push((V25LG9_LI(to[i]) - V25LG9_LI(from[i]) + 26) % 26); } return ds.every(x => x === ds[0]) ? ds[0] : null; };
const V25LG9_MV = d => d === 0 ? "doesn't move the letters at all" : d <= 13 ? `moves each letter ${d} forward` : `moves each letter ${26 - d} back`;
addBank(9, "logic", "cipher", 0.35, function () {
  const k = R(0, 2);
  if (k === 0) {
    const w = pick(V25LG9_CW), sh = R(1, 5), enc = shift(w, sh);
    const q = { q: `In a spy code, <b>${w}</b> is written as <b>${enc}</b>. How many letters forward does each letter move?`, say: `In a spy code, ${w.split("").join(" ")} is written as ${enc.split("").join(" ")}. How many letters forward does each letter move?`, vis: eq(`${w} → ${enc}`) + V25LG9_ABC(), opts: numU(sh, [sh + 1, sh - 1, sh + 2, sh - 2], 2, 1), ans: String(sh), big: 1, why: `${w.split("").map(c => `${c}→${shift(c, sh)}`).join(", ")}: every letter moves ${sh} forward.`, extra: 15, key: "v25f" + w + sh };
    return V25LG9_fin(q, "find", o => { const p = +o; return `Moving ${w[0]} forward ${p} gives ${shift(w[0], p)}, not ${enc[0]}.`; });
  }
  if (k === 1) {
    const [w1, w2] = shuffle(V25LG9_CW).slice(0, 2), sh = R(1, 4), e1 = shift(w1, sh), ans = shift(w2, sh);
    const cands = [shift(w2, sh + 1), shift(w2, -sh), sh > 1 ? shift(w2, sh - 1) : shift(w2, sh + 2), w2].filter(c => c !== ans);
    const q = { q: `In a spy code, <b>${w1}</b> is written <b>${e1}</b>. Using the same code, how is <b>${w2}</b> written?`, say: `In a spy code, ${w1.split("").join(" ")} is written ${e1.split("").join(" ")}. Using the same code, how is ${w2.split("").join(" ")} written?`, vis: eq(`${w1} → ${e1}`) + eq(`${w2} → ?`) + V25LG9_ABC(), opts: uniq(ans, cands), ans, big: 1, sayAns: ans.split("").join(" "), why: `${w1} → ${e1} moves each letter ${sh} forward, so ${w2} → ${ans}.`, extra: 20, key: "v25s" + w1 + w2 + sh };
    return V25LG9_fin(q, "same", o => { const d = V25LG9_DIFF(w2, o); return d == null ? null : `${o} ${V25LG9_MV(d)}, but this code moves each letter ${sh} forward.`; });
  }
  const msg = pick(V25LG9_MSG), sh = pick([1, 1, 2]), enc = V25LG9_SH(msg, sh), ans = msg;
  const cands = [enc, V25LG9_SH(enc, sh), V25LG9_SH(enc, -sh - 1)].filter(c => c !== ans);
  const q = { q: `Each letter in this secret message moved <b>${sh}</b> forward. What does it say?`, say: `Each letter in this secret message moved ${sh} forward. The message is ${enc.split("").map(c => c === " " ? "space" : c).join(" ")}. What does it say?`, vis: eq(enc) + V25LG9_ABC(), opts: uniq(ans, cands), ans, big: 1, why: `Move each letter back ${sh}: ${enc} → ${msg}.`, extra: 20, key: "v25g" + msg + sh };
  return V25LG9_fin(q, "msg", o => {
    if (o === enc) return `That is the secret message itself. Move each letter back ${sh} to read it.`;
    if (o === V25LG9_SH(enc, sh)) return `That moves each letter forward again. To decode, move each letter back ${sh}.`;
    if (o === V25LG9_SH(enc, -sh - 1)) return `That moves each letter back ${sh + 1}, but the code only moved them ${sh}.`;
    return null;
  });
});
whyRule(9, "logic", "cipher", V25LG9_RULE);

/* ---------------------------------------------------------------------
   sudoku: real 4×4 sudoku with 2×2 boxes; use the box (alone, or with the row/column)
   --------------------------------------------------------------------- */
function V25LG9_sud() {
  const base = [[1, 2, 3, 4], [3, 4, 1, 2], [2, 1, 4, 3], [4, 3, 2, 1]], sym = shuffle([1, 2, 3, 4]);
  const ord = () => { const o = []; shuffle([0, 1]).forEach(b => shuffle([0, 1]).forEach(i => o.push(b * 2 + i))); return o; };
  const rows = ord(), cols = ord();
  let g = rows.map(r => cols.map(c => sym[base[r][c] - 1]));
  if (Math.random() < 0.5) g = g[0].map((_, c) => g.map(r => r[c]));
  return g;
}
addBank(9, "logic", "sudoku", 0.3, function () {
  const g = V25LG9_sud(), tr = R(0, 3), tc = R(0, 3), ans = g[tr][tc], br = tr - tr % 2, bc = tc - tc % 2;
  const inBox = (r, c) => r - r % 2 === br && c - c % 2 === bc, shown = g.map(r => r.map(() => 0)), boxOnly = Math.random() < 0.5;
  if (boxOnly) {
    for (let r = br; r < br + 2; r++) for (let c = bc; c < bc + 2; c++) if (r !== tr || c !== tc) shown[r][c] = g[r][c];
  } else {
    const dr = tr === br ? br + 1 : br, dc = tc === bc ? bc + 1 : bc; shown[dr][dc] = g[dr][dc];
    for (const v of [1, 2, 3, 4].filter(v => v !== ans && v !== g[dr][dc])) {
      const spots = [];
      for (let c = 0; c < 4; c++) if (c !== tc && !inBox(tr, c) && g[tr][c] === v) spots.push([tr, c]);
      for (let r = 0; r < 4; r++) if (r !== tr && !inBox(r, tc) && g[r][tc] === v) spots.push([r, tc]);
      if (!spots.length) return null;
      const [r, c] = pick(spots); shown[r][c] = g[r][c];
    }
  }
  for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) if (r !== tr && c !== tc && !inBox(r, c) && Math.random() < 0.4) shown[r][c] = g[r][c];
  const rowV = shown[tr].filter((v, c) => v && c !== tc), colV = shown.map(r => r[tc]).filter((v, r) => v && r !== tr), boxV = [];
  for (let r = br; r < br + 2; r++) for (let c = bc; c < bc + 2; c++) if ((r !== tr || c !== tc) && shown[r][c]) boxV.push(shown[r][c]);
  const seen = new Set([...rowV, ...colV, ...boxV]);
  if (seen.size !== 3 || seen.has(ans)) return null;
  const parts = []; if (rowV.length) parts.push(`the row has ${rowV.join(" and ")}`); if (colV.length) parts.push(`the column has ${colV.join(" and ")}`); parts.push(`the 2×2 box has ${boxV.join(" and ")}`);
  const q = { q: "Each row, column <b>and</b> 2×2 box needs 1, 2, 3 and 4. Which number goes in the <b>?</b> box?", say: "Each row, each column, and each two by two box needs 1, 2, 3 and 4. Which number goes in the question mark box?", vis: sudoku(shown, [tr, tc]), opts: ["1", "2", "3", "4"], ans: String(ans), big: 1, why: boxOnly ? `The 2×2 box already has ${boxV.join(", ")}, so the missing number is ${ans}.` : `${cap(parts.join(", and "))}. The only number left is ${ans}.`, extra: 15, key: "v25" + shown.flat().join("") + tr + tc };
  return V25LG9_fin(q, "box", o => { const p = +o; return boxV.includes(p) ? `There is already a ${p} in this 2×2 box.` : rowV.includes(p) ? `There is already a ${p} in this row.` : colV.includes(p) ? `There is already a ${p} in this column.` : null; });
});
whyRule(9, "logic", "sudoku", V25LG9_RULE);

/* ---------------------------------------------------------------------
   chance: which bag gives a better chance; number cards "out of"
   --------------------------------------------------------------------- */
addBank(9, "logic", "chance", 0.3, function () {
  if (Math.random() < 0.5) {
    const [C1, C2] = shuffle(MARBLE_COLS).slice(0, 2), col = C1[1], type = pick(["tot", "cnt", "half", "same"]);
    let r1, t1, r2, t2;
    if (type === "tot") { t1 = t2 = R(4, 9); r1 = R(1, t1 - 1); do { r2 = R(1, t2 - 1); } while (r2 === r1); }
    else if (type === "cnt") { r1 = r2 = R(1, 4); t1 = R(r1 + 1, 10); do { t2 = R(r2 + 1, 10); } while (t2 === t1); }
    else if (type === "half") { t1 = R(3, 9); r1 = R(Math.floor(t1 / 2) + 1, t1 - 1); t2 = R(3, 10); r2 = R(1, Math.ceil(t2 / 2) - 1); if (Math.random() < 0.5) [r1, t1, r2, t2] = [r2, t2, r1, t1]; }
    else { r1 = R(1, 3); t1 = R(r1 + 1, 5); r2 = 2 * r1; t2 = 2 * t1; if (Math.random() < 0.5) [r1, t1, r2, t2] = [r2, t2, r1, t1]; }
    const cmp = r1 * t2 - r2 * t1, ans = cmp > 0 ? "Bag A" : cmp < 0 ? "Bag B" : "Same chance", best = cmp > 0 ? "A" : "B", worse = cmp > 0 ? "B" : "A";
    const bag = (lab, r, t) => `<div style="text-align:center"><b>Bag ${lab}</b>${marbles(shuffle([[C1[0], r], [C2[0], t - r]].filter(x => x[1] > 0)))}</div>`;
    const vis = `<div style="display:flex;gap:18px;justify-content:center;flex-wrap:wrap;align-items:flex-end">${bag("A", r1, t1)}${bag("B", r2, t2)}</div>`;
    const sh = (r, t) => `${r} out of ${t}`;
    const why = cmp === 0 ? `Bag A has ${sh(r1, t1)} ${col} and Bag B has ${sh(r2, t2)}. That's the same share.` : `Bag A has ${sh(r1, t1)} ${col}, and Bag B has ${sh(r2, t2)}. Bag ${best} has the bigger share.`;
    const q = { q: `You pick one marble without looking. Which bag gives a better chance of picking <b>${col}</b>?`, say: `Bag A has ${r1} ${col} out of ${t1} marbles. Bag B has ${r2} ${col} out of ${t2} marbles. You pick one marble without looking. Which bag gives a better chance of picking ${col}?`, vis, opts: ["Bag A", "Bag B", "Same chance"], ans, big: 1, why, key: "v25b" + [r1, t1, r2, t2].join() + col };
    const RB = r => r === 1 ? "is" : "are";
    return V25LG9_fin(q, "bags", o => {
      if (type === "same") return o === "Same chance" ? null : `The bigger bag has double of each color, so the share of ${col} is the same.`;
      if (type === "tot") return o === "Same chance" ? `Both bags have ${t1} marbles, but they have different numbers of ${col}.` : `Both bags have ${t1} marbles, and Bag ${best} has more ${col} ones.`;
      if (type === "cnt") return o === "Same chance" ? `Both have ${r1} ${col}, but one bag has more marbles mixed in.` : `Both bags have ${r1} ${col}, but Bag ${best} has fewer marbles in all.`;
      const [rw, tw] = worse === "A" ? [r1, t1] : [r2, t2], [rb, tb] = best === "A" ? [r1, t1] : [r2, t2];
      return o === "Same chance" ? `Bag ${best} is more than half ${col}, but Bag ${worse} is less than half.` : `Only ${rw} of Bag ${worse}'s ${tw} marbles ${RB(rw)} ${col}, less than half. Bag ${best} has ${rb} of ${tb}.`;
    });
  }
  const N = R(6, 12), evs = [["an even number", v => v % 2 === 0], ["an odd number", v => v % 2 === 1], ["a multiple of 3", v => v % 3 === 0]];
  const kk = R(2, N - 2); evs.push([`a number bigger than ${kk}`, v => v > kk], [`a number smaller than ${kk}`, v => v < kk], [`the number ${kk}`, v => v === kk]);
  if (N >= 10) evs.push(["a number with two digits", v => v >= 10]);
  const [ev, f] = pick(evs), hits = range(1, N).filter(f), a = hits.length;
  if (a < 1 || a >= N) return null;
  const s = (x, y) => `${x} out of ${y}`, ans = s(a, N);
  const q = { q: `Cards numbered 1 to ${N} are mixed up. You pick one without looking. What is the chance of picking <b>${ev}</b>?`, say: `Cards numbered 1 to ${N} are mixed up. You pick one without looking. What is the chance of picking ${ev}?`, vis: `<div class="chips">${range(1, N).map(v => `<span class="chip">${v}</span>`).join("")}</div>`, opts: uniq(ans, [N - a !== a ? s(N - a, N) : null, N - a !== N ? s(a, N - a) : null, s(a + 1, N), a > 1 ? s(a - 1, N) : null]), ans, why: `${a === 1 ? "Only 1 card works" : `${a} cards work`}${a <= 6 ? ` (${hits.join(", ")})` : ""}, out of ${N} cards in all.`, key: "v25c" + N + ev };
  return V25LG9_fin(q, "cards", o => {
    const m = o.match(/^(\d+) out of (\d+)$/); if (!m) return null; const x = +m[1], y = +m[2];
    if (y !== N) return y === N - a ? `${x} out of ${y} counts only ${y} of the cards. There are ${N} cards in all, so it's ${a} out of ${N}.` : `There are ${N} cards in all, not ${y}.`;
    if (x === N - a) return `${x} is how many cards don't work. ${a === 1 ? "Only 1 card works" : `${a} cards work`}.`;
    return `${a === 1 ? "Only 1 card works" : `${a} of the ${N} cards work`}${a <= 6 ? ` (${hits.join(", ")})` : ""}, not ${x}.`;
  });
});
whyRule(9, "logic", "chance", V25LG9_RULE);

/* ---------------------------------------------------------------------
   loops: loops inside loops, "which loop makes it?", a step after the loop
   --------------------------------------------------------------------- */
const V25LG9_ACT = [["clap", "claps"], ["beep", "beeps"], ["jump", "jumps"], ["stomp", "stomps"], ["wave", "waves"], ["spin", "spins"], ["blink", "blinks"], ["hop", "hops"]];
addBank(9, "logic", "loops", 0.35, function () {
  const k = R(0, 2);
  if (k === 0) {
    const a = R(2, 5), b = R(2, 4), [O, I] = shuffle(V25LG9_ACT).slice(0, 2), ask = pick(["in", "in", "out", "all"]);
    const lines = [`repeat ${a} times:`, `    ${O[0]}`, `    repeat ${b} times:`, `        ${I[0]}`];
    const ans = ask === "in" ? a * b : ask === "out" ? a : a + a * b, what = ask === "in" ? I[1] : ask === "out" ? O[1] : `${O[1]} and ${I[1]} in all`;
    const q = { q: ask === "all" ? `The robot runs this code. How many <b>${O[1]} and ${I[1]}</b> does it do in all?` : `The robot runs this code. How many <b>${what}</b> does it do?`, say: `Repeat ${a} times: ${O[0]}, then repeat ${b} times: ${I[0]}. How many ${ask === "all" ? `${O[1]} and ${I[1]} does the robot do in all` : `${what} does the robot do`}?`, vis: codeBlock(lines), opts: numU(ans, [a + b, a * b, a, b, a + a * b, a * b + b].filter(v => v !== ans), 2, 1), ans: String(ans), big: 1, why: ask === "in" ? `The inner loop ${I[0]}s ${b} times on each of the ${a} passes: ${a} × ${b} = ${ans}.` : ask === "out" ? `“${O[0]}” is in the outer loop only, so it happens once per pass: ${a} times.` : `${a} ${O[1]} and ${a} × ${b} = ${a * b} ${I[1]}: ${a} + ${a * b} = ${ans}.`, extra: 10, key: "v25n" + lines.join() + ask };
    return V25LG9_fin(q, "nest", o => {
      const p = +o;
      if (ask === "in") {
        if (p === a + b) return `${p} adds the loops. The inner loop runs ${b} times on every one of the ${a} passes.`;
        if (p === b) return `${p} is just one pass. The outer loop runs that ${a} times.`;
        if (p === a) return `${p} is the number of passes, but each pass does ${b} ${I[1]}.`;
        if (p === a + a * b) return `${p} counts the ${O[1]} too. Only count the ${I[1]}.`;
        return `Each of the ${a} passes does ${b} ${I[1]}: ${a} × ${b} = ${a * b}, not ${p}.`;
      }
      if (ask === "out") {
        if (p === a * b) return `${p} is the number of ${I[1]}. “${O[0]}” runs once on each of the ${a} passes.`;
        if (p === b) return `${b} is how many times the inner loop runs, not the outer loop.`;
        return `“${O[0]}” runs once on each pass, and there are ${a} passes, not ${p}.`;
      }
      if (p === a * b) return `${p} counts only the ${I[1]}. Add the ${a} ${O[1]} too.`;
      if (p === a + b) return `${p} counts one round of ${I[1]}, but they repeat on all ${a} passes.`;
      return `There are ${a} ${O[1]} and ${a * b} ${I[1]}, which makes ${ans}, not ${p}.`;
    });
  }
  if (k === 1) {
    const s = R(0, 10), n = R(2, 6), a = R(2, 7), T = s + n * a;
    const pool = shuffle([[n + 1, a], [n - 1, a], [n, a + 1], [n, a - 1], [a, n + 1], [n + 2, a - 1], [n - 1, a + 2]]).filter(([x, y]) => x >= 2 && y >= 2 && s + x * y !== T);
    const seenV = new Set([T]), wr = []; for (const c of pool) { const v = s + c[0] * c[1]; if (!seenV.has(v) && wr.length < 3) { seenV.add(v); wr.push(c); } }
    if (wr.length < 3) return null;
    const txt = ([x, y]) => `repeat ${x} times: add ${y}`, ans = txt([n, a]);
    const q = { q: `Each code starts at <b>${s}</b>. Which loop ends on <b>${T}</b>?`, say: `Each code starts at ${s}. Which loop ends on ${T}?`, vis: codeBlock([`start at ${s}`, "repeat ? times:", "    add ?"]), opts: shuffle([ans, ...wr.map(txt)]), ans, why: `${s} + ${n} × ${a} = ${s} + ${n * a} = ${T}.`, extra: 10, key: "v25w" + s + n + a + wr.flat().join() };
    return V25LG9_fin(q, "which", o => { const m = o.match(/repeat (\d+) times: add (\d+)/); if (!m) return null; const v = s + m[1] * m[2]; return `That loop ends on ${s} + ${m[1]} × ${m[2]} = ${v}, not ${T}.`; });
  }
  const s = R(1, 8), n = R(2, 4), a = R(2, 6), mid = s + n * a, op = pick(["double", "double", "half"]);
  if (op === "half" && mid % 2) return null;
  const end = op === "double" ? mid * 2 : mid / 2, lines = [`start at ${s}`, `repeat ${n} times:`, `    add ${a}`, op === "double" ? "double it" : "cut it in half"];
  const early = op === "double" ? s * 2 + n * a : s / 2 + n * a;
  const q = { q: "Run the code. What number do you end on?", say: `Start at ${s}. Repeat ${n} times: add ${a}. After the loop, ${op === "double" ? "double it" : "cut it in half"}. What number do you end on?`, vis: codeBlock(lines), opts: numU(end, [mid, Number.isInteger(early) ? early : null, op === "double" ? s + n * a * 2 : mid + 1, end + a, end - a].filter(v => v != null && v !== end), 3, 1), ans: String(end), big: 1, why: `The loop gives ${s} + ${n} × ${a} = ${mid}, then ${mid} ${op === "double" ? "× 2" : "÷ 2"} = ${end}.`, extra: 10, key: "v25a" + lines.join() };
  return V25LG9_fin(q, "after", o => {
    const p = +o;
    if (p === mid) return `${p} is where the loop ends. The last line still ${op === "double" ? "doubles it" : "cuts it in half"}.`;
    if (p === early) return `${p} does the last line first. It comes after the loop, so it runs last.`;
    if (op === "double" && p === s + n * a * 2) return `${p} doubles each “add ${a}”, but doubling happens once, after the loop.`;
    return `The loop ends on ${mid}, and ${mid} ${op === "double" ? "× 2" : "÷ 2"} = ${end}, not ${p}.`;
  });
});
whyRule(9, "logic", "loops", V25LG9_RULE);

/* ---------------------------------------------------------------------
   balancemath: take the same off both sides, which side is heavier, share then swap
   --------------------------------------------------------------------- */
const V25LG9_VG = [["🎃", "pumpkin", "pumpkins"], ["🍐", "pear", "pears"], ["🍑", "peach", "peaches"], ["🥕", "carrot", "carrots"], ["🌽", "ear of corn", "ears of corn"], ["🥔", "potato", "potatoes"], ["🍅", "tomato", "tomatoes"], ["🥒", "cucumber", "cucumbers"], ["🍆", "eggplant", "eggplants"], ["🥑", "avocado", "avocados"]];
const V25LG9_nm = (it, n) => `${n} ${n === 1 ? it[1] : it[2]}`;
addBank(9, "logic", "balancemath", 0.35, function () {
  const k = R(0, 2), [B, S, M] = shuffle(V25LG9_VG).slice(0, 3);
  if (k === 0) {
    const kk = R(2, 5), P = R(2, 3), a = R(1, 3), rep = (e, n) => Array(n).fill(e).join("");
    const left = rep(B[0], P) + rep(S[0], a), right = rep(B[0], P - 1) + rep(S[0], a + kk);
    const q = { q: `These two sides balance. How many ${S[0]} balance <b>1</b> ${B[0]}?`, say: `${V25LG9_nm(B, P)} and ${V25LG9_nm(S, a)} balance ${V25LG9_nm(B, P - 1)} and ${V25LG9_nm(S, a + kk)}. How many ${S[2]} balance 1 ${B[1]}?`, vis: eq(`${left} = ${right}`), opts: numU(kk, [a + kk, kk + 1, kk - 1, kk + a - 1, a].filter(v => v !== kk), 2, 1), ans: String(kk), big: 1, why: `Take ${V25LG9_nm(B, P - 1)} and ${V25LG9_nm(S, a)} off both sides. Then 1 ${B[1]} balances ${V25LG9_nm(S, kk)}.`, key: "v25c" + B[0] + S[0] + P + a + kk };
    return V25LG9_fin(q, "cancel", o => { const p = +o, L = P * p + a, Rr = (P - 1) * p + a + kk; return `If 1 ${B[1]} = ${V25LG9_nm(S, p)}, the sides would weigh ${L} and ${Rr} ${S[2]}.`; });
  }
  if (k === 1) {
    const x = R(2, 5), m = R(1, 3), n = Math.max(1, m * x + pick([-2, -1, 0, 1, 2])), lw = m * x;
    const oL = `${m} <span class="emo" title="${m === 1 ? B[1] : B[2]}">${B[0]}</span>`, oR = `${n} <span class="emo" title="${n === 1 ? S[1] : S[2]}">${S[0]}</span>`, oS = "They weigh the same";
    const ans = lw > n ? oL : lw < n ? oR : oS;
    const q = { q: `1 ${B[0]} balances ${x} ${S[0]}. Which is heavier: <b>${m} ${B[0]}</b> or <b>${n} ${S[0]}</b>?`, say: `1 ${B[1]} balances ${V25LG9_nm(S, x)}. Which is heavier: ${V25LG9_nm(B, m)} or ${V25LG9_nm(S, n)}?`, vis: eq(`1 ${B[0]} = ${x} ${S[0]}`), opts: [oL, oR, oS], ans, big: 1, why: `${V25LG9_nm(B, m)} weigh${m === 1 ? "s" : ""} the same as ${m} × ${x} = ${lw} ${S[2]}${lw === n ? `, the same as ${n}` : lw > n ? `, which is more than ${n}` : `, which is less than ${n}`}.`, key: "v25h" + B[0] + S[0] + x + m + n };
    return V25LG9_fin(q, "heavy", o => {
      const same = `${V25LG9_nm(B, m)} weigh${m === 1 ? "s" : ""} the same as ${lw} ${S[2]}`;
      if (o === oS) return `${same}, and ${lw} isn't ${n}.`;
      return lw === n ? `${same}, so neither side is heavier.` : `${same}, and ${lw} is ${lw > n ? "more" : "less"} than ${n}.`;
    });
  }
  const x = R(2, 3), per = R(2, 4), y = x * per, z = R(2, 4), ans = per * z;
  const q = { q: `${x} ${B[0]} balance ${y} ${M[0]}. 1 ${M[0]} balances ${z} ${S[0]}. How many ${S[0]} balance <b>1</b> ${B[0]}?`, say: `${V25LG9_nm(B, x)} balance ${V25LG9_nm(M, y)}. 1 ${M[1]} balances ${V25LG9_nm(S, z)}. How many ${S[2]} balance 1 ${B[1]}?`, vis: eq(`${x} ${B[0]} = ${y} ${M[0]}`) + eq(`1 ${M[0]} = ${z} ${S[0]}`), opts: numU(ans, [y * z, per, per + z, ans + z, ans - 1].filter(v => v !== ans), 3, 1), ans: String(ans), big: 1, why: `1 ${B[1]} = ${y} ÷ ${x} = ${per} ${M[2]}, and ${per} × ${z} = ${ans} ${S[2]}.`, extra: 10, key: "v25s" + B[0] + M[0] + S[0] + x + y + z };
  return V25LG9_fin(q, "share", o => {
    const p = +o;
    if (p === y * z) return `${p} ${S[2]} balance all ${x} ${B[2]}. Share it: ${y * z} ÷ ${x} = ${ans}.`;
    if (p === per) return `${p} is how many ${M[2]} balance 1 ${B[1]}. Now swap ${M[2]} for ${S[2]}.`;
    return `1 ${B[1]} = ${per} ${M[2]}, and ${per} × ${z} = ${ans} ${S[2]}, not ${p}.`;
  });
});
whyRule(9, "logic", "balancemath", V25LG9_RULE);

/* ---------------------------------------------------------------------
   magicsq: use the column when the row is blocked, two-step fills, find the total yourself
   --------------------------------------------------------------------- */
function V25LG9_mq() {
  const v = magicVariant(), base = v.g.map(r => r.map(n => n - (v.total - 15) / 3));
  const [m, k] = pick([[1, R(6, 15)], [2, R(4, 10)], [3, R(0, 5)]]);
  return { g: base.map(r => r.map(n => n * m + k)), total: 15 * m + 3 * k };
}
addBank(9, "logic", "magicsq", 0.35, function () {
  const { g, total } = V25LG9_mq(), kind = pick(["col", "two", "find"]), tr = R(0, 2), tc = R(0, 2), ans = g[tr][tc];
  const other = (i, j) => [0, 1, 2].filter(x => x !== i && x !== j);
  const colRest = [0, 1, 2].filter(r => r !== tr).map(r => g[r][tc]), rowRest = [0, 1, 2].filter(c => c !== tc).map(c => g[tr][c]);
  if (kind === "col") {
    const c2 = pick(other(tc)), hide = [[tr, tc], [tr, c2]];
    const q = { q: `Every row and column adds up to <b>${total}</b>. What number goes in the <b>?</b> box?`, say: `Every row and column adds up to ${total}. What number goes in the question mark box?`, vis: magicGrid(g, hide), opts: numU(ans, [ans + 1, ans - 1, total - colRest[0], ans + 2], 3, 0), ans: String(ans), big: 1, why: `Its row has another gap, so use its column: ${total} − ${colRest.join(" − ")} = ${ans}.`, extra: 15, key: "v25c" + g.flat().join() + tr + tc + c2 };
    return V25LG9_fin(q, "col", o => { const p = +o; return `With ${p}, the column would add up to ${colRest.join(" + ")} + ${p} = ${colRest[0] + colRest[1] + p}, not ${total}.`; });
  }
  if (kind === "two") {
    const c2 = pick(other(tc)), r2 = pick(other(tr)), hide = [[tr, tc], [tr, c2], [r2, tc]], xv = g[tr][c2], keep = g[tr][other(tc, c2)[0]];
    const q = { q: `Every row and column adds up to <b>${total}</b>. What number goes in the <b>?</b> box? (Fill in another box first.)`, say: `Every row and column adds up to ${total}. What number goes in the question mark box? Hint: fill in another box first.`, vis: magicGrid(g, hide), opts: numU(ans, [ans + 1, ans - 1, xv, total - keep], 3, 0), ans: String(ans), big: 1, why: `The empty box in the ? row is ${total} − ${[0, 1, 2].filter(r => r !== tr).map(r => g[r][c2]).join(" − ")} = ${xv}. Then ${total} − ${keep} − ${xv} = ${ans}.`, extra: 20, key: "v25t" + g.flat().join() + tr + tc + c2 + r2 };
    return V25LG9_fin(q, "two", o => { const p = +o; if (p === xv) return `${p} belongs in the other empty box of that row, not the ? box.`; return `The other gap in that row is ${xv}, and ${keep} + ${xv} + ${p} = ${keep + xv + p}, not ${total}.`; });
  }
  const r2 = pick(other(tr)), c2 = pick(other(tc)), hide = [[tr, tc], [r2, c2]], fullRow = other(tr, r2)[0];
  const q = { q: "Every row and column adds up to the same number. What number goes in the <b>?</b> box?", say: "Every row and column adds up to the same number. What number goes in the question mark box?", vis: magicGrid(g, hide), opts: numU(ans, [ans + 1, ans - 1, rowRest[0] + rowRest[1], ans + 3], 3, 0), ans: String(ans), big: 1, why: `A full row gives the total: ${g[fullRow].join(" + ")} = ${total}. Then ${total} − ${rowRest.join(" − ")} = ${ans}.`, extra: 20, key: "v25f" + g.flat().join() + tr + tc + r2 + c2 };
  return V25LG9_fin(q, "find", o => { const p = +o; return `A full row adds to ${total}. With ${p}, the ? row would make ${rowRest[0] + rowRest[1] + p}.`; });
});
whyRule(9, "logic", "magicsq", V25LG9_RULE);

/* ---------------------------------------------------------------------
   ages: sum and difference, sibling chains, a grown-up's age when a child was born
   --------------------------------------------------------------------- */
const V25LG9_GROWN = [["Mom", 24, 38], ["Dad", 25, 40], ["Aunt Lena", 20, 36], ["Uncle Raj", 21, 38], ["Grandma", 48, 62], ["Grandpa", 50, 64]];
addBank(9, "logic", "ages", 0.3, function () {
  const k = R(0, 2), [A, B, Cn] = shuffle(V25LG9_N).slice(0, 3);
  if (k === 0) {
    const a = R(3, 10), d = R(1, 6), S = 2 * a + d, askOld = Math.random() < 0.5, ans = askOld ? a + d : a, who = askOld ? B : A;
    const q = { q: `${A} and ${B} are ${S} years old in all. ${B} is ${d} ${d === 1 ? "year" : "years"} older than ${A}. How old is <b>${who}</b>?`, opts: numU(ans, askOld ? [a, S - d, ans + 1, ans - 1, S / 2 | 0] : [a + d, S - d, a + 1, a - 1, S / 2 | 0], 2, askOld ? d + 1 : 1).filter(Boolean), ans: String(ans), big: 1, why: `Take away the ${d} extra ${d === 1 ? "year" : "years"}: ${S} − ${d} = ${2 * a}, and half of that is ${a}. So ${A} is ${a} and ${B} is ${a + d}.`, key: "v25s" + A + B + S + d + askOld };
    return V25LG9_fin(q, "sumdiff", o => { const p = +o; if (askOld) { const y = p - d; return `If ${B} were ${p}, ${A} would be ${y}, and ${p} + ${y} = ${p + y}, not ${S}.`; } return `If ${A} were ${p}, ${B} would be ${p + d}, and ${p} + ${p + d} = ${2 * p + d}, not ${S}.`; });
  }
  if (k === 1) {
    const c = R(3, 8), d2 = R(1, 4), d1 = R(1, 5), b = c + d2, a = b + d1, up = Math.random() < 0.5;
    const facts = `${A} is ${d1} ${d1 === 1 ? "year" : "years"} older than ${B}. ${B} is ${d2} ${d2 === 1 ? "year" : "years"} older than ${Cn}.`;
    if (up) {
      const q = { q: `${facts} ${Cn} is ${c}. How old is <b>${A}</b>?`, opts: numU(a, [b, c + d1, d1 + d2, a + 1, a - 1].filter(v => v !== a), 2, 1), ans: String(a), big: 1, why: `${B} is ${c} + ${d2} = ${b}, so ${A} is ${b} + ${d1} = ${a}.`, key: "v25u" + A + B + Cn + c + d1 + d2 };
      return V25LG9_fin(q, "chain", o => { const p = +o; if (p === b) return `${p} is ${B}'s age. ${A} is ${d1} more than that.`; if (p === c + d1) return `${p} skips a step. Find ${B}'s age first: ${c} + ${d2} = ${b}.`; return `${B} is ${b}, so ${A} is ${b} + ${d1} = ${a}, not ${p}.`; });
    }
    const q = { q: `${facts} ${A} is ${a}. How old is <b>${Cn}</b>?`, opts: numU(c, [b, a - d2, a + d2, c + 1, c - 1].filter(v => v !== c), 2, 1), ans: String(c), big: 1, why: `${B} is ${a} − ${d1} = ${b}, so ${Cn} is ${b} − ${d2} = ${c}.`, key: "v25d" + A + B + Cn + a + d1 + d2 };
    return V25LG9_fin(q, "chain", o => { const p = +o; if (p === b) return `${p} is ${B}'s age. ${Cn} is ${d2} younger than ${B}.`; if (p === a - d2) return `${p} skips a step. Find ${B}'s age first: ${a} − ${d1} = ${b}.`; if (p > a) return `${Cn} is younger than ${A}, so ${Cn} can't be ${p}.`; return `${B} is ${b}, so ${Cn} is ${b} − ${d2} = ${c}, not ${p}.`; });
  }
  const [G, lo, hi] = pick(V25LG9_GROWN), P = R(lo, hi), kid = A, now = R(4, 11);
  if (Math.random() < 0.5) {
    const ans = P + now;
    const q = { q: `${G} was ${P} when ${kid} was born. ${kid} is ${now} now. How old is ${G} now?`, opts: numU(ans, [P, P - now, ans + 1, ans - 1, ans + 10].filter(v => v !== ans), 2, 1), ans: String(ans), big: 1, why: `${G} is always ${P} years older than ${kid}: ${now} + ${P} = ${ans}.`, key: "v25g" + G + kid + P + now };
    return V25LG9_fin(q, "grown", o => { const p = +o; if (p === P) return `${p} is how old ${G} was when ${kid} was born, not now.`; if (p === P - now) return `${G} gets older too. Add ${kid}'s ${now} years, don't take them away.`; return `${G} is always ${P} years older: ${now} + ${P} = ${ans}, not ${p}.`; });
  }
  const M = P + now;
  const q = { q: `${G} was ${P} when ${kid} was born. How old was ${kid} when ${G} was ${M}?`, opts: numU(now, [M, P, M + P > 100 ? now + 2 : now + 1, now - 1, now + 10].filter(v => v !== now), 2, 1), ans: String(now), big: 1, why: `${kid} is always ${P} years younger than ${G}: ${M} − ${P} = ${now}.`, key: "v25w" + G + kid + P + M };
  return V25LG9_fin(q, "grown", o => { const p = +o; if (p === P) return `${p} is ${G}'s age when ${kid} was born, not ${kid}'s age.`; if (p === M) return `${p} is ${G}'s age then. ${kid} is ${P} years younger.`; return `${kid} is ${P} years younger than ${G}: ${M} − ${P} = ${now}, not ${p}.`; });
});
whyRule(9, "logic", "ages", V25LG9_RULE);

/* ---------------------------------------------------------------------
   twostep: two lines taking turns, doubling jumps, a missing number in a +a −b pattern
   --------------------------------------------------------------------- */
addBank(9, "logic", "twostep", 0.35, function () {
  const k = R(0, 2);
  if (k === 0) {
    const u = R(2, 5), dn = R(1, 4), s1 = R(1, 10), s2 = R(30, 50), len = pick([6, 7]), seq = [];
    for (let i = 0; i <= len; i++) seq.push(i % 2 ? s2 - dn * ((i - 1) / 2) : s1 + u * (i / 2));
    const show = seq.slice(0, len), ans = seq[len], upTurn = len % 2 === 0, line = show.filter((_, i) => i % 2 === (upTurn ? 0 : 1)), prev = show[len - 1];
    const q = { q: "What number comes next?", vis: train([...show, "?"]), opts: numU(ans, [ans + 1, ans - 1, upTurn ? ans + u : ans - dn, upTurn ? prev - dn : prev + u].filter(v => v !== ans), 3, 0), ans: String(ans), big: 1, why: `Two patterns take turns: one goes up ${u} from ${s1}, the other goes down ${dn} from ${s2}. That line goes ${line.join(", ")}, then ${ans}.`, key: "v25i" + show.join() };
    return V25LG9_fin(q, "inter", o => `The numbers in every other spot go ${line.join(", ")}, so next is ${ans}, not ${o}.`);
  }
  if (k === 1) {
    const s = R(1, 9), j0 = R(1, 3), seq = [s]; for (let i = 0; i < 5; i++) seq.push(seq[i] + j0 * 2 ** i);
    const show = seq.slice(0, 5), ans = seq[5], prev = show[4], nj = j0 * 16;
    const q = { q: "What number comes next?", vis: train([...show, "?"]), opts: numU(ans, [prev + j0 * 8 + j0, prev + j0 * 8, prev * 2, ans + 1].filter(v => v !== ans), 4, 0), ans: String(ans), big: 1, why: `The jumps double each time: +${j0}, +${2 * j0}, +${4 * j0}, +${8 * j0}, so next is +${nj}: ${prev} + ${nj} = ${ans}.`, key: "v25d" + show.join() };
    return V25LG9_fin(q, "dbl", o => { const p = +o; return `From ${prev} to ${p} is +${p - prev}, but the jumps double, so the next jump is +${nj}.`; });
  }
  const a = R(3, 9), b = R(1, a - 1), s = R(1, 12), seq = [s]; for (let i = 0; i < 6; i++) seq.push(seq[i] + (i % 2 ? -b : a));
  const m = R(2, 5), ans = seq[m], prev = seq[m - 1], step = m % 2 ? a : -b, cars = seq.map((v, i) => i === m ? "?" : v);
  const q = { q: "Which number is missing?", say: `Which number is missing? ${cars.map(c => c === "?" ? "blank" : c).join(", ")}.`, vis: train(cars), opts: numU(ans, [prev + (step > 0 ? -b : a), ans + 1, ans - 1, prev].filter(v => v !== ans), 3, 0), ans: String(ans), big: 1, why: `The rule takes turns: +${a}, then −${b}. So ${prev} ${step > 0 ? "+" : "−"} ${Math.abs(step)} = ${ans}.`, key: "v25m" + cars.join() };
  return V25LG9_fin(q, "miss", o => { const p = +o, d = p - prev; return `From ${prev} to ${p} is ${d === 0 ? "no change" : d > 0 ? `+${d}` : `−${-d}`}, but that step should be ${step > 0 ? `+${a}` : `−${b}`}.`; });
});
whyRule(9, "logic", "twostep", V25LG9_RULE);

/* ---------------------------------------------------------------------
   combos: codes (repeats or no repeats), one pair not allowed, roads through a town
   --------------------------------------------------------------------- */
const V25LG9_CODES = [["A lock code", "digit", "digits", "the digits"], ["A secret club password", "letter", "letters", "the letters"], ["A flag with stripes", "stripe", "stripes", "the colors"], ["A bike lock", "dial", "dials", "the numbers"]];
const V25LG9_BAN = [["hats", "scarves", "You never wear the red hat with the pink scarf.", "outfits"], ["breads", "fillings", "The shop never puts jam on the rye bread.", "sandwiches"], ["kite shapes", "tail colors", "The diamond kite never gets a yellow tail.", "kites"], ["pizza crusts", "toppings", "The thin crust never gets pineapple.", "pizzas"], ["shirts", "shorts", "You never wear the striped shirt with the plaid shorts.", "outfits"], ["cone types", "flavors", "Mint never goes in the waffle cone.", "ice cream cones"], ["juice cups", "straws", "The tiny cup never gets the long straw.", "cup-and-straw sets"]];
const V25LG9_ROADS = [["the farm", "the bridge", "the town"], ["camp", "the lake", "the cave"], ["home", "the park", "the library"], ["the castle", "the forest", "the village"], ["school", "the pond", "the zoo"], ["the beach", "the lighthouse", "the harbor"]];
addBank(9, "logic", "combos", 0.3, function () {
  const k = R(0, 2);
  if (k === 0) {
    const [what, one, many, the] = pick(V25LG9_CODES), rep = Math.random() < 0.55;
    const n = R(2, 5), spots = rep && n <= 3 && Math.random() < 0.4 ? 3 : 2;
    const choices = what === "A secret club password" ? ALPHA.slice(0, n).split("") : what === "A flag with stripes" ? ["red", "blue", "green", "yellow", "white"].slice(0, n) : range(1, n).map(String);
    const list = choices.slice(0, -1).join(", ") + " or " + choices[n - 1];
    const ans = rep ? n ** spots : n * (n - 1), prodTxt = rep ? Array(spots).fill(n).join(" × ") : `${n} × ${n - 1}`;
    const q = { q: `${what} has <b>${spots} ${many}</b>. Each one can be ${list}. ${rep ? `${cap(the)} <b>can</b> repeat.` : `No two ${many} can be the same.`} How many different ${what === "A flag with stripes" ? "flags" : "codes"} are there?`, opts: numU(ans, [n + n, rep ? n * (n - 1) : n * n, n * spots, rep && spots === 3 ? n * n : ans + 1, ans - 1].filter(v => v !== ans), 2, 1), ans: String(ans), big: 1, why: rep ? `Each of the ${spots} ${many} has ${n} choices: ${prodTxt} = ${ans}.` : `The first ${one} has ${n} choices, and the second has the ${n - 1} ${n - 1 === 1 ? "that is" : "that are"} left: ${prodTxt} = ${ans}.`, key: "v25k" + what + n + spots + rep };
    return V25LG9_fin(q, "code", o => {
      const p = +o;
      if (rep && p === n * (n - 1)) return `${p} would be right if nothing could repeat, but here ${the} can repeat.`;
      if (!rep && p === n * n) return `${n} × ${n} counts codes with the same ${one} twice, which isn't allowed here.`;
      if (rep && spots === 3 && p === n * n) return `${p} only fills 2 ${many}. There are 3, so multiply by ${n} again.`;
      if (p === n + n || p === n * spots) return `${p} adds the choices, but each first choice goes with every second choice. Multiply.`;
      return `${prodTxt} = ${ans}, not ${p}.`;
    });
  }
  if (k === 1) {
    const [A, B, rule, T] = pick(V25LG9_BAN), a = R(2, 5), b = R(2, 5), ans = a * b - 1;
    const q = { q: `There are ${a} ${A} and ${b} ${B}. ${rule} How many different ${T} can be made?`, opts: numU(ans, [a * b, a + b, a + b - 1, a * b - 2, a * b + 1].filter(v => v !== ans), 2, 1), ans: String(ans), big: 1, why: `${a} × ${b} = ${a * b} pairs, but one pair is not allowed: ${a * b} − 1 = ${ans}.`, key: "v25b" + A + a + b };
    return V25LG9_fin(q, "ban", o => {
      const p = +o;
      if (p === a * b) return `${p} counts every pair, but one pair is not allowed: ${a * b} − 1 = ${ans}.`;
      if (p === a * b - 2) return `Only one pair is not allowed, so take away 1, not 2.`;
      if (p === a + b || p === a + b - 1) return `${p} adds the groups, but each of the ${A} goes with each of the ${B}. Multiply.`;
      return `${a} × ${b} = ${a * b}, take away the 1 pair not allowed: ${ans}, not ${p}.`;
    });
  }
  const [X, Y, Z] = pick(V25LG9_ROADS), a = R(2, 5), b = R(2, 5), ans = a * b;
  const q = { q: `There are ${a} roads from ${X} to ${Y}, and ${b} roads from ${Y} to ${Z}. How many different ways can you go from ${X} to ${Z}?`, opts: numU(ans, [a + b, ans + 1, ans - 1, a * b + a].filter(v => v !== ans), 2, 1), ans: String(ans), big: 1, why: `Each of the ${a} roads to ${Y} can be followed by any of the ${b} roads to ${Z}: ${a} × ${b} = ${ans}.`, key: "v25r" + X + a + b };
  return V25LG9_fin(q, "roads", o => { const p = +o; if (p === a + b) return `${p} adds the roads, but each first road can go with each second road. Multiply.`; return `Each of the ${a} roads goes with ${b} roads: ${a} × ${b} = ${ans}, not ${p}.`; });
});
whyRule(9, "logic", "combos", V25LG9_RULE);

/* ---------------------------------------------------------------------
   symbols: picture × itself, A + B + B, one picture is double the other
   --------------------------------------------------------------------- */
const V25LG9_SY = [["🐝", "🌼"], ["🍩", "🍪"], ["⚽", "🏀"], ["🎸", "🥁"], ["🌵", "🌴"], ["🐳", "🐙"], ["🍕", "🍔"], ["🚀", "🌎"], ["🦉", "🐞"], ["🎃", "👻"], ["🍓", "🍒"], ["🔔", "🎀"]];
addBank(9, "logic", "symbols", 0.35, function () {
  const [A, B] = pick(V25LG9_SY), k = R(0, 2), sp = s => `<span class="emo">${s}</span>`;
  if (k === 0) {
    const a = R(2, 9), b = R(1, 12), s = a + b;
    const q = { q: `What number is ${sp(B)}?`, say: `The first picture times itself makes ${a * a}. The first picture plus the second picture make ${s}. What number is the second picture?`, vis: eq(`${A} × ${A} = ${a * a}`) + eq(`${A} + ${B} = ${s}`), opts: numU(b, [a, s, a * a - s > 0 ? a * a - s : b + 2, b + 1, b - 1].filter(v => v !== b), 2, 0), ans: String(b), big: 1, why: `${a} × ${a} = ${a * a}, so ${A} = ${a}. Then ${B} = ${s} − ${a} = ${b}.`, extra: 15, key: "v25q" + A + a + b };
    return V25LG9_fin(q, "sq", o => { const p = +o; if (p === a) return `${p} is the number for ${A}, not ${B}.`; return `${A} is ${a}, because ${a} × ${a} = ${a * a}. Then ${a} + ${p} = ${a + p}, not ${s}.`; });
  }
  if (k === 1) {
    const a = R(1, 9), b = R(2, 9), s = a + b, t = a + 2 * b;
    const q = { q: `What number is ${sp(A)}?`, say: `The first picture plus the second picture make ${s}. The first picture plus two of the second picture make ${t}. What number is the first picture?`, vis: eq(`${A} + ${B} = ${s}`) + eq(`${A} + ${B} + ${B} = ${t}`), opts: numU(a, [b, s, t - s - 1 > 0 ? t - s - 1 : a + 2, a + 1, a - 1].filter(v => v !== a), 2, 0), ans: String(a), big: 1, why: `The second line has one more ${B}, and it is ${t} − ${s} = ${b} more. So ${B} = ${b} and ${A} = ${s} − ${b} = ${a}.`, extra: 15, key: "v25p" + A + a + b };
    return V25LG9_fin(q, "abb", o => {
      const p = +o;
      if (p === b) return `${p} is the number for ${B}, not ${A}.`;
      if (p > s) return `If ${A} were ${p}, ${A} + ${B} would already be more than ${s}.`;
      const bb = s - p; return `If ${A} were ${p}, ${B} would be ${bb}, and ${p} + ${bb} + ${bb} = ${p + 2 * bb}, not ${t}.`;
    });
  }
  const b = R(2, 9), a = 2 * b, s = 3 * b, askA = Math.random() < 0.5, ans = askA ? a : b, Q = askA ? A : B;
  const q = { q: `What number is ${sp(Q)}?`, say: `The first picture equals the second picture plus the second picture. The first picture plus the second picture make ${s}. What number is the ${askA ? "first" : "second"} picture?`, vis: eq(`${A} = ${B} + ${B}`) + eq(`${A} + ${B} = ${s}`), opts: numU(ans, (askA ? [b, a + 2, a - 2, s / 2 | 0, a + 1] : [a, b + 1, b - 1, s / 2 | 0, b + 2]).filter(v => v !== ans), 2, 1), ans: String(ans), big: 1, why: `${A} + ${B} is the same as 3 of ${B}, so ${B} = ${s} ÷ 3 = ${b} and ${A} = ${b} + ${b} = ${a}.`, extra: 15, key: "v25t" + A + b + askA };
  return V25LG9_fin(q, "dbl", o => {
    const p = +o;
    if (askA) {
      if (p === b) return `${p} is the number for ${B}. ${A} is double that.`;
      if (p % 2) return `${A} is ${B} + ${B}, so it must be an even number, and ${p} is odd.`;
      return `If ${A} were ${p}, ${B} would be ${p / 2}, and ${p} + ${p / 2} = ${p + p / 2}, not ${s}.`;
    }
    if (p === a) return `${p} is the number for ${A}, not ${B}.`;
    return `If ${B} were ${p}, ${A} would be ${2 * p}, and ${2 * p} + ${p} = ${3 * p}, not ${s}.`;
  });
});
whyRule(9, "logic", "symbols", V25LG9_RULE);

/* ---------------------------------------------------------------------
   backwards: halves in a story, an elevator ride, getting ready on time
   --------------------------------------------------------------------- */
const V25LG9_THINGS = ["trading cards", "bouncy balls", "erasers", "pencils", "toy cars", "ribbons", "buttons", "postcards", "marbles", "stickers"];
const V25LG9_READY = [["school", "get dressed and eat breakfast", "walk there"], ["the soccer game", "put on the uniform", "ride there"], ["the library", "finish lunch", "bike there"], ["a friend's party", "wrap the present", "ride there"], ["the bus stop", "brush teeth and pack a bag", "walk there"], ["swim class", "pack a swim bag", "ride there"], ["the museum trip", "make a packed lunch", "walk to school"], ["piano lessons", "practice the new song", "walk there"]];
const V25LG9_TM = m => `${Math.floor(m / 60)}:${String(m % 60).padStart(2, "0")}`;
const V25LG9_PT = s => { const m = String(s).match(/^(\d{1,2}):(\d\d)$/); return m ? +m[1] * 60 + +m[2] : null; };
addBank(9, "logic", "backwards", 0.35, function () {
  const k = R(0, 2), [N, pr] = pick(V25LG9_P), P = cap(pr);
  if (k === 0) {
    const th = pick(V25LG9_THINGS), order = pick(["half-then-get", "get-then-half", "half-then-give"]), a = R(2, 9);
    let s, end, story, steps, undo;
    if (order === "half-then-get") { s = 2 * R(4, 20); end = s / 2 + a; story = `gave away half of them, then got ${a} more`; steps = p => p % 2 ? null : [`half of ${p} is ${p / 2}`, `${p / 2} + ${a} = ${p / 2 + a}`, p / 2 + a]; undo = `${end} − ${a} = ${end - a}, then ${end - a} × 2 = ${s}`; }
    else if (order === "get-then-half") { s = R(4, 30); if ((s + a) % 2) s += 1; end = (s + a) / 2; story = `got ${a} more, then gave away half of them`; steps = p => (p + a) % 2 ? null : [`${p} + ${a} = ${p + a}`, `half of ${p + a} is ${(p + a) / 2}`, (p + a) / 2]; undo = `${end} × 2 = ${end * 2}, then ${end * 2} − ${a} = ${s}`; }
    else { s = 2 * R(5, 20); if (s / 2 - a < 1) return null; end = s / 2 - a; story = `gave away half of them, then gave away ${a} more`; steps = p => p % 2 || p / 2 - a < 0 ? null : [`half of ${p} is ${p / 2}`, `${p / 2} − ${a} = ${p / 2 - a}`, p / 2 - a]; undo = `${end} + ${a} = ${end + a}, then ${end + a} × 2 = ${s}`; }
    const fwdOnly = order === "get-then-half" ? end * 2 : (end - (order === "half-then-get" ? a : -a));
    const q = { q: `${N} had some ${th}. ${P} ${story}. Now ${pr} has <b>${end}</b>. How many did ${pr} have at the start?`, say: `${N} had some ${th}. ${P} ${story}. Now ${pr} has ${end}. How many did ${pr} have at the start?`, opts: numU(s, [fwdOnly, end * 2 + a, end * 2 - a, s + 2, s - 2].filter(v => v !== s && v > 0), 3, 1), ans: String(s), big: 1, why: `Undo the steps from the end: ${undo}.`, key: "v25h" + N + th + order + s + a };
    return V25LG9_fin(q, "half", o => {
      const p = +o, st = steps(p);
      if (!st) return order === "half-then-give" && p % 2 === 0 ? `Starting with ${p}, half is ${p / 2}, and you can't give away ${a} from that.` : `Starting with ${p}, the ${th} can't be split in half evenly${order === "get-then-half" ? ` after getting ${a} more` : ""}.`;
      return `Start with ${p}: ${st[0]}, then ${st[1]}. That's not ${end}.`;
    });
  }
  if (k === 1) {
    const s = R(1, 8), u1 = R(2, 6), d = R(1, s + u1 - 1), u2 = R(1, 5), F = s + u1 - d + u2;
    const q = { q: `An elevator went up ${u1} floors, then down ${d}, then up ${u2}. It stopped on floor <b>${F}</b>. Which floor did it start on?`, say: `An elevator went up ${u1} floors, then down ${d}, then up ${u2}. It stopped on floor ${F}. Which floor did it start on?`, opts: numU(s, [F + u1 - d + u2, F - u1 - u2, F - u1 + d, s + 1, s - 1].filter(v => v !== s && v >= 1), 2, 1), ans: String(s), big: 1, why: `Work backwards from ${F}: down ${u2} is ${F - u2}, up ${d} is ${F - u2 + d}, down ${u1} is ${s}.`, key: "v25e" + s + u1 + d + u2 };
    return V25LG9_fin(q, "lift", o => { const p = +o, a1 = p + u1, a2 = a1 - d, a3 = a2 + u2; if (a2 < 1) return `Starting on ${p}, going up ${u1} reaches ${a1}, and it can't go down ${d} from there.`; return `Starting on ${p}: up to ${a1}, down to ${a2}, up to ${a3}. That's not ${F}.`; });
  }
  const [place, act1, act2] = pick(V25LG9_READY), m1 = 5 * R(3, 8), m2 = 5 * R(2, 6), T = 5 * R(96, 140), start = T - m1 - m2;
  const ans = V25LG9_TM(start);
  const cands = [T - m2, T - m1, start + 5, start - 5, start + 10, T + m1 + m2].map(V25LG9_TM).filter(c => c !== ans);
  const q = { q: `${N} has to be at ${place} by <b>${V25LG9_TM(T)}</b>. ${P} needs ${m1} minutes to ${act1}, then ${m2} minutes to ${act2}. What is the latest time ${pr} can start?`, say: `${N} has to be at ${place} by ${V25LG9_TM(T)}. ${P} needs ${m1} minutes to ${act1}, then ${m2} minutes to ${act2}. What is the latest time ${pr} can start?`, opts: uniq(ans, cands), ans, big: 1, why: `${m1} + ${m2} = ${m1 + m2} minutes in all. Count back ${m1 + m2} minutes from ${V25LG9_TM(T)} to get ${ans}.`, key: "v25t" + place + T + m1 + m2 };
  return V25LG9_fin(q, "ready", o => {
    const p = V25LG9_PT(o); if (p == null) return null;
    if (p === T - m2) return `${o} only leaves time to ${act2}, not to ${act1} first.`;
    if (p === T - m1) return `${o} leaves time to ${act1}, but not to ${act2} after that.`;
    if (p > T) return `${o} is after ${V25LG9_TM(T)}, so ${pr} would already be late.`;
    const done = p + m1 + m2;
    return done > T ? `Starting at ${o}, ${pr} would arrive at ${V25LG9_TM(done)}, which is too late.` : `Starting at ${o} works, but ${pr} could start later and still be on time.`;
  });
});
whyRule(9, "logic", "backwards", V25LG9_RULE);

/* ---------------------------------------------------------------------
   parity: many numbers at once, a secret number's journey, "always or it depends?"
   --------------------------------------------------------------------- */
const V25LG9_PAR = n => n % 2 ? "odd" : "even";
const V25LG9_ALW = [
  ["the sum of two numbers in a row", n => [`${n} + ${n + 1}`, 2 * n + 1], "all", "One of them is odd and one is even, and odd + even is odd."],
  ["the product of two numbers in a row", n => [`${n} × ${n + 1}`, n * (n + 1)], "all", "One of two numbers in a row is always even, so the product is even."],
  ["the sum of three numbers in a row", n => [`${n} + ${n + 1} + ${n + 2}`, 3 * n + 3], "all", null],
  ["the product of three numbers in a row", n => [`${n} × ${n + 1} × ${n + 2}`, n * (n + 1) * (n + 2)], "all", "At least one of the three numbers is even, so the product is even."],
  ["a number added to itself", n => [`${n} + ${n}`, 2 * n], "all", "A number plus itself makes pairs, so it is always even."],
  ["a number times itself", n => [`${n} × ${n}`, n * n], "all", null],
  ["an odd number times itself", n => [`${n} × ${n}`, n * n], "odd", "Odd times odd is always odd, every time."],
  ["an even number plus 1", n => [`${n} + 1`, n + 1], "even", "Even numbers make pairs, and 1 more leaves one left over."],
  ["any number times 2, plus 1", n => [`${n} × 2 + 1`, 2 * n + 1], "all", "Times 2 makes it even, and adding 1 makes it odd."],
  ["any number times 3", n => [`${n} × 3`, 3 * n], "all", null],
  ["any number times 4", n => [`${n} × 4`, 4 * n], "all", "Times 4 is the same as doubling twice, so it is even."],
  ["an odd number minus 1", n => [`${n} − 1`, n - 1], "odd", "Taking the leftover 1 away from an odd number leaves only pairs."],
  ["the sum of four numbers in a row", n => [`${n} + ${n + 1} + ${n + 2} + ${n + 3}`, 4 * n + 6], "all", "Four numbers in a row have two odd numbers, and they pair up."],
  ["an odd number times 5", n => [`${n} × 5`, 5 * n], "odd", "Odd times odd is always odd, every time."],
  ["an even number times any number", n => [`${n} × ${n + 3}`, n * (n + 3)], "even", "One even number in a product makes the answer even."],
  ["any number plus 5", n => [`${n} + 5`, n + 5], "all", null],
  ["the sum of five numbers in a row", n => [`${n} + ${n + 1} + ${n + 2} + ${n + 3} + ${n + 4}`, 5 * n + 10], "all", null],
];
const V25LG9_OPS = [["doubles it", "×2", v => 2 * v], ["adds 3", "+3", v => v + 3], ["adds 4", "+4", v => v + 4], ["takes away 1", "−1", v => v - 1], ["multiplies it by 3", "×3", v => 3 * v], ["adds 7", "+7", v => v + 7], ["takes away 2", "−2", v => v - 2], ["multiplies it by 5", "×5", v => 5 * v]];
addBank(9, "logic", "parity", 0.35, function () {
  const k = R(0, 2);
  if (k === 0) {
    const mult = Math.random() < 0.35, no = R(mult ? 2 : 1, 7), ne = R(no === 1 ? 1 : 0, 4), ans = mult ? (ne ? "even" : "odd") : (no % 2 ? "odd" : "even");
    const parts = [V25LG9_pl(no, "odd number", "odd numbers")]; if (ne) parts.push(V25LG9_pl(ne, "even number", "even numbers"));
    const qt = mult ? `You multiply ${parts.join(" and ")} together. Is the answer odd or even?` : `You add ${parts.join(" and ")}. Is the total odd or even?`;
    const pairs = Math.floor(no / 2), pairTxt = pairs ? `${V25LG9_pl(pairs, "pair", "pairs")}` : "no pairs";
    const why = mult ? (ne ? "One even number in a product makes the whole answer even." : "Odd times odd is always odd, no matter how many.") : no === 1 ? "1 odd number can't make a pair, so 1 is left over. Even numbers don't change it." : `${V25LG9_pl(no, "odd number makes", "odd numbers make")} ${pairTxt}${no % 2 ? " with one left over" : " and nothing left over"}. Even numbers don't change it.`;
    const q = { q: qt, opts: ["odd", "even"], ans, big: 1, why, key: "v25c" + mult + no + ne };
    return V25LG9_fin(q, "count", () => mult ?  (ne ? `Just one even number makes a product even, and there ${ne === 1 ? "is one" : `are ${ne}`} here.` : "Every number here is odd, and odd times odd stays odd.") : no === 1 ? "1 odd number can't make a pair, so 1 is left over and the total is odd." : `${V25LG9_pl(no, "odd number makes", "odd numbers make")} ${pairTxt}${no % 2 ? ", with one left over, so it's odd" : ", with none left over, so it's even"}.`);
  }
  if (k === 1) {
    const [N] = pick(V25LG9_P), sp = pick(["odd", "even"]), ops = shuffle(V25LG9_OPS).slice(0, R(2, 3));
    let v = sp === "odd" ? 7 : 8; const trail = [sp]; for (const o of ops) { v = o[2](v); trail.push(V25LG9_PAR(v)); }
    const ans = trail[trail.length - 1], steps = ops.map(o => o[0]), joined = steps.length === 2 ? `${steps[0]}, then ${steps[1]}` : `${steps[0]}, then ${steps[1]}, then ${steps[2]}`;
    const path = ops.map((o, i) => `${o[1]} → ${trail[i + 1]}`).join(", ");
    const q = { q: `${N}'s secret number is <b>${sp}</b>. ${N} ${joined}. Is the answer odd or even?`, say: `${N}'s secret number is ${sp}. ${N} ${joined}. Is the answer odd or even?`, opts: ["odd", "even"], ans, big: 1, why: `Track it: ${sp}, ${path}.`, key: "v25j" + sp + ops.map(o => o[1]).join() };
    return V25LG9_fin(q, "trail", () => `Track it step by step: ${sp}, ${path}. It ends ${ans}.`);
  }
  const [desc, ex, dom, reason] = pick(V25LG9_ALW), pickN = () => { let n = R(2, 30); if (dom === "odd" && n % 2 === 0) n++; if (dom === "even" && n % 2) n++; return n; };
  const n1 = pickN(); let n2 = pickN(); if (n2 === n1) n2 = n1 + 2;
  const vals = [ex(n1), ex(n2)], always = reason !== null;
  const ansPar = always ? V25LG9_PAR(vals[0][1]) : null, ans = always ? `always ${ansPar}` : "it depends";
  let e1 = vals[0], e2 = null;
  if (!always) { const odd = range(2, 30).map(ex).find(v => v[1] % 2), even = range(2, 30).map(ex).find(v => v[1] % 2 === 0); e1 = odd; e2 = even; }
  const q = { q: `Is <b>${desc}</b> always odd, always even, or does it depend on the numbers?`, say: `Is ${desc} always odd, always even, or does it depend on the numbers?`, vis: eq(`${vals[0][0]} = ${vals[0][1]}`), opts: ["always odd", "always even", "it depends"], ans, big: 1, why: always ? reason : `It can go both ways: ${e1[0]} = ${e1[1]} is odd, but ${e2[0]} = ${e2[1]} is even.`, extra: 10, key: "v25a" + desc + n1 };
  return V25LG9_fin(q, "always", o => {
    if (!always) return o === "always odd" ? `Not always: ${e2[0]} = ${e2[1]}, which is even.` : `Not always: ${e1[0]} = ${e1[1]}, which is odd.`;
    return o === "it depends" ? `It never changes. ${reason}` : reason;
  });
});
whyRule(9, "logic", "parity", V25LG9_RULE);

