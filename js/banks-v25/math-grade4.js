/* =====================================================================
   Bank v25 MA9 (V25MA9_): more real-life word problems and new formats
   for every age-9 math topic. Every new question carries
   q.v25 = { r: { "option": "why that option is wrong" } }.
   ===================================================================== */
const V25MA9_FNW = { 2: ["half", "halves"], 3: ["third", "thirds"], 4: ["fourth", "fourths"], 5: ["fifth", "fifths"], 6: ["sixth", "sixths"], 7: ["seventh", "sevenths"], 8: ["eighth", "eighths"], 9: ["ninth", "ninths"], 10: ["tenth", "tenths"], 12: ["twelfth", "twelfths"] };
const V25MA9_fw = (n, d) => `${n} ${n === 1 ? V25MA9_FNW[d][0] : V25MA9_FNW[d][1]}`;
const V25MA9_say = s => String(s).replace(/(\d+) (<span class="frac">)/g, "$1 and $2").replace(/<span class="frac"><span>(\d+)<\/span><span>(\d+)<\/span><\/span>/g, (_, n, d) => V25MA9_FNW[+d] ? V25MA9_fw(+n, +d) : `${n} over ${d}`).replace(/°/g, " degrees").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
const V25MA9_pl = (n, one, many) => `${n} ${n === 1 ? one : (many || one + "s")}`;
/* answer + [value, reason] mistakes + filler → { opts, r } with a reason for every wrong option */
function V25MA9_O(ans, miss, fill, fmt, gen, min) {
  fmt = fmt || (x => String(x)); min = min == null ? 1 : min;
  const ok = v => v != null && (typeof v !== "number" || (isFinite(v) && v >= min));
  const A = fmt(ans), out = [A], r = {};
  for (const m of miss) {
    if (!m || out.length >= 4) continue;
    const [v, why] = m; if (!ok(v)) continue;
    const s = fmt(v); if (out.includes(s)) continue;
    out.push(s); r[s] = why || gen(v);
  }
  let g = 0;
  while (out.length < 4 && fill && g++ < 300) { const v = fill(); if (!ok(v)) continue; const s = fmt(v); if (out.includes(s)) continue; out.push(s); r[s] = gen(v); }
  return { opts: shuffle(out), r };
}
function V25MA9_rule(q, p) { const v = q && q.v25; if (!v || !v.r) return null; return v.r[p] || v.r[xPlain(p)] || null; }

/* ---------- mult2: new real-life stories, break-apart strategy ---------- */
const V25MA9_MUL = [
  { e: "🧁", t: (a, b) => `A bakery puts ${a} muffins on each tray. How many muffins are on ${b} trays?`, a: [12, 48], b: [3, 9] },
  { e: "🚆", t: (a, b) => `Each train car has ${a} seats. The train has ${b} cars. How many seats are on the train?`, a: [24, 72], b: [4, 9] },
  { e: "🕷️", t: a => `A spider has 8 legs. How many legs do ${a} spiders have?`, a: [12, 49], b: [8, 8] },
  { e: "📅", t: a => `A week has 7 days. How many days are in ${a} weeks?`, a: [11, 52], b: [7, 7] },
  { e: "🐙", t: a => `An octopus has 8 arms. How many arms do ${a} octopuses have?`, a: [11, 39], b: [8, 8] },
  { e: "🎡", t: (a, b) => `A Ferris wheel has ${a} cars. Each car holds ${b} riders. How many riders can it hold at once?`, a: [12, 36], b: [4, 6] },
  { e: "✉️", t: (a, b) => `One stamp costs ${a} cents. How many cents do ${b} stamps cost?`, a: [42, 78], b: [3, 9] },
  { e: "🏊", t: (a, b, w) => `A pool is ${a} meters long. ${w} swims ${b} lengths of the pool. How many meters does ${w} swim?`, al: [25, 30, 50], b: [3, 9] },
  { e: "🧊", t: (a, b) => `One ice cube tray makes ${a} ice cubes. How many ice cubes do ${b} trays make?`, a: [14, 24], b: [3, 9] },
  { e: "🚲", t: (a, b) => `A bike rack holds ${a} bikes. A school has ${b} bike racks. How many bikes can the racks hold?`, a: [12, 20], b: [3, 8] },
  { e: "🐝", t: (a, b) => `A bee visits ${a} flowers each hour. How many flowers does it visit in ${b} hours?`, a: [25, 95], b: [3, 8] },
  { e: "🎟️", t: (a, b) => `A ticket to the science museum costs $${a}. How much do ${b} tickets cost?`, a: [12, 28], b: [3, 9], m: "$" },
  { e: "🥚", t: (a, b) => `A farm packs eggs in trays of ${a}. How many eggs are in ${b} trays?`, al: [18, 30], b: [3, 9] },
  { e: "🎹", t: (a, b, w) => `${w} practices piano for ${a} minutes every day. How many minutes is that in ${b} days?`, a: [15, 45], b: [5, 7] },
  { e: "🌽", t: (a, b) => `A farmer plants ${b} rows of corn with ${a} stalks in each row. How many corn stalks are there?`, a: [24, 96], b: [3, 9] },
  { e: "🍊", t: (a, b) => `A truck carries ${b} crates of oranges. Each crate holds ${a} oranges. How many oranges are on the truck?`, a: [36, 88], b: [4, 9] },
  { e: "🦒", t: (a, b) => `A giraffe at the zoo eats ${a} pounds of leaves each day. How many pounds does it eat in ${b} days?`, a: [60, 75], b: [3, 7] },
];
addBank(9, "math", "mult2", 0.3, () => {
  const w = pick(KIDS);
  if (Math.random() < 0.7) {
    const i = R(0, V25MA9_MUL.length - 1), c = V25MA9_MUL[i], a = c.al ? pick(c.al) : R(c.a[0], c.a[1]), b = R(c.b[0], c.b[1]), p = a * b, t = a - a % 10, o = a % 10, m = c.m || "", F = x => m + x;
    const { opts, r } = V25MA9_O(p, [
      [a + b, `${F(a + b)} is ${a} + ${b}. Equal groups mean multiply.`],
      o ? [t * b + o, `${F(t * b + o)} multiplies only the ${t}. Multiply the ${o} by ${b} too.`] : null,
      [p - a, `${F(p - a)} is ${a} × ${b - 1}, but it should be ${a} × ${b}.`],
      [p + a, `${F(p + a)} is ${a} × ${b + 1}, but it should be ${a} × ${b}.`],
    ], () => p + R(-12, 12), F, v => `${a} × ${b} = ${p}, not ${v}.`);
    return { q: c.t(a, b, w), vis: bigEmo(c.e), opts, ans: F(p), big: 1, why: o ? `${t} × ${b} = ${t * b} and ${o} × ${b} = ${o * b}. ${t * b} + ${o * b} = ${p}.` : `${a} × ${b} = ${p}.`, key: `v25m${i}:${w}:${a}x${b}`, v25: { r } };
  }
  let a = R(13, 98); while (a % 10 === 0) a = R(13, 98);
  const b = R(3, 9), t = a - a % 10, o = a % 10, ans = `${t} × ${b} + ${o} × ${b}`;
  const W = shuffle([
    [`${t} × ${b} + ${o}`, `This forgets to multiply the ${o} by ${b}.`],
    [`${t} + ${o} × ${b}`, `This forgets to multiply the ${t} by ${b}.`],
    [`${t / 10} × ${b} + ${o} × ${b}`, `The ${t / 10} in ${a} is worth ${t}, so use ${t} × ${b}.`],
    [`${t} × ${b} − ${o} × ${b}`, `${a} is ${t} + ${o}, so add the parts. Don't subtract.`],
    [`${t} × ${o} + ${b}`, `This multiplies the parts of ${a} together. Each part needs × ${b}.`],
  ]).filter((x, j, arr) => x[0] !== ans && arr.findIndex(z => z[0] === x[0]) === j).slice(0, 3);
  const r = {}; W.forEach(([s, y]) => { r[s] = y; });
  return { q: `${w} breaks ${a} into tens and ones to find ${a} × ${b}. Which way works?`, vis: eq(`${a} × ${b} = ${blank()}`), opts: shuffle([ans, ...W.map(x => x[0])]), ans, big: 1, why: `${a} = ${t} + ${o}. Multiply each part by ${b}: ${t * b} + ${o * b} = ${a * b}.`, key: `v25bk${w}:${a}x${b}`, v25: { r } };
});
whyRule(9, "math", "mult2", V25MA9_rule);

/* ---------- divrem: new remainder stories (round up, full groups, leftovers, each), find the total ---------- */
const V25MA9_DIV = [
  { md: "up", e: "⛺", t: (n, b) => `${n} scouts are going camping. Each tent sleeps ${b} scouts. How many tents are needed so every scout has a spot?`, g: ["tent", "tents"], i: ["scout", "scouts"], bl: [3, 4, 6] },
  { md: "up", e: "🍽️", t: (n, b) => `${n} guests are coming to a party. Each table seats ${b} guests. How many tables are needed so everyone gets a seat?`, g: ["table", "tables"], i: ["guest", "guests"] },
  { md: "up", e: "🚐", t: (n, b) => `${n} players are riding to a game in vans. Each van holds ${b} players. How many vans are needed for everyone?`, g: ["van", "vans"], i: ["player", "players"] },
  { md: "up", e: "📦", t: (n, b) => `${n} jars of jam are being shipped. Each box fits ${b} jars. How many boxes are needed to ship every jar?`, g: ["box", "boxes"], i: ["jar", "jars"] },
  { md: "up", e: "🚜", t: (n, b) => `${n} kids are going on a hayride. Each wagon holds ${b} kids. How many wagons are needed so all the kids can go at once?`, g: ["wagon", "wagons"], i: ["kid", "kids"] },
  { md: "down", e: "🥚", t: (n, b) => `A farm has ${n} eggs. Each carton holds ${b} eggs. How many cartons can be filled all the way?`, g: ["carton", "cartons"], i: ["egg", "eggs"], bl: [6, 12] },
  { md: "down", e: "⚽", t: (n, b) => `${n} kids want to play. Each team needs exactly ${b} players. How many full teams can be made?`, g: ["team", "teams"], i: ["kid", "kids"], bl: [5, 6, 9] },
  { md: "down", e: "🍋", t: (n, b) => `Each pitcher of lemonade needs ${b} lemons. There are ${n} lemons. How many pitchers can be made?`, g: ["pitcher", "pitchers"], i: ["lemon", "lemons"] },
  { md: "down", e: "🧶", t: (n, b) => `Each scarf needs ${b} balls of yarn. Grandma has ${n} balls of yarn. How many scarves can she finish?`, g: ["scarf", "scarves"], i: ["ball of yarn", "balls of yarn"] },
  { md: "down", e: "🎁", t: (n, b) => `Each gift bag gets ${b} small toys. There are ${n} toys. How many gift bags can be filled?`, g: ["gift bag", "gift bags"], i: ["toy", "toys"] },
  { md: "left", e: "🍕", t: (n, b) => `${n} pizza slices are shared equally by ${b} friends, and no slice is cut. How many slices are left over?`, g: ["friend", "friends"], i: ["slice", "slices"], qm: "how many slices each friend gets" },
  { md: "left", e: "🌷", t: (n, b) => `A gardener plants ${n} tulip bulbs in rows of ${b}. How many bulbs are left over after the full rows?`, g: ["row", "rows"], i: ["bulb", "bulbs"], qm: "the number of full rows" },
  { md: "left", e: "🎈", t: (n, b) => `${n} balloons are tied into bunches of ${b}. How many balloons are left over?`, g: ["bunch", "bunches"], i: ["balloon", "balloons"], qm: "the number of bunches" },
  { md: "left", e: "🍇", t: (n, b) => `${n} grapes are shared equally on ${b} plates. How many grapes are left over?`, g: ["plate", "plates"], i: ["grape", "grapes"], qm: "how many grapes go on each plate" },
  { md: "each", e: "✏️", t: (n, b) => `${n} pencils are shared equally by ${b} students. How many whole pencils does each student get?`, g: ["student", "students"], i: ["pencil", "pencils"] },
  { md: "each", e: "🥕", t: (n, b) => `A farmer shares ${n} carrots equally among ${b} horses. How many carrots does each horse get?`, g: ["horse", "horses"], i: ["carrot", "carrots"] },
  { md: "each", e: "🍓", t: (n, b) => `${n} strawberries are split equally into ${b} bowls. How many strawberries go in each bowl?`, g: ["bowl", "bowls"], i: ["strawberry", "strawberries"] },
  { md: "each", e: "🖌️", t: (n, b) => `${n} paintbrushes are split equally among ${b} art tables. How many brushes does each table get?`, g: ["table", "tables"], i: ["brush", "brushes"] },
];
const V25MA9_DIVB = [
  ["🐚", (w, b, Q, r) => `${w} put shells into bags of ${b}. ${w} filled ${Q} bags and had ${r} left over. How many shells did ${w} have?`, "bags"],
  ["📷", (w, b, Q, r) => `${w} put photos in an album, ${b} on each page. ${w} filled ${Q} pages and had ${r} photos left over. How many photos were there?`, "pages"],
  ["🌱", (w, b, Q, r) => `${w} planted seeds, ${b} in each pot. ${w} filled ${Q} pots and had ${r} seeds left over. How many seeds were there?`, "pots"],
  ["🥫", (w, b, Q, r) => `A food drive packed cans in boxes of ${b}. They filled ${Q} boxes and had ${r} cans left over. How many cans were collected?`, "boxes"],
  ["📚", (w, b, Q, r) => `A librarian stacked books in piles of ${b}. There were ${Q} full piles and ${r} extra books. How many books were there?`, "piles"],
];
addBank(9, "math", "divrem", 0.3, () => {
  if (Math.random() < 0.75) {
    const ci = R(0, V25MA9_DIV.length - 1), c = V25MA9_DIV[ci], b = c.bl ? pick(c.bl) : R(3, 9), Q = R(2, 12), r = R(1, b - 1), n = b * Q + r;
    const [gs, gp] = c.g, [is, ip] = c.i, P = (x, s, p) => V25MA9_pl(x, s, p), md = c.md;
    const ans = md === "up" ? Q + 1 : md === "left" ? r : Q;
    const cands = md === "up" ? [Q, r, b, Q + 2] : md === "down" ? [Q + 1, r, b, Q - 1] : md === "left" ? [Q, b - r, r + 1, b] : [r, Q + 1, b, Q - 1];
    const gen = p => {
      if (md === "up") {
        if (p === r && p !== Q) return `${r} is the number of ${ip} left over, not the number of ${gp}.`;
        if (p === b) return `${b} is how many ${ip} each ${gs} holds, not how many ${gp}.`;
        if (p <= Q) return `${P(p, gs, gp)} ${p === 1 ? "holds" : "hold"} only ${p * b} ${ip}, not enough for all ${n}.`;
        return `${Q + 1} ${gp} already hold ${(Q + 1) * b} ${ip}, enough for all ${n}.`;
      }
      if (md === "down") {
        if (p === r) return `${r} is how many ${ip} are left over, not how many ${gp}.`;
        if (p === b) return `${b} is how many ${ip} each ${gs} needs, not how many ${gp}.`;
        if (p === Q + 1) return `The last ${gs} would have only ${P(r, is, ip)}, not a full ${b}.`;
        if (p > Q + 1) return `${p} full ${gp} would need ${p * b} ${ip}, but there are only ${n}.`;
        return `${P(p, gs, gp)} ${p === 1 ? "uses" : "use"} only ${p * b} ${ip}. The ${n - p * b} left can fill more.`;
      }
      if (md === "left") {
        if (p === Q) return `${Q} is ${c.qm}, not how many are left over.`;
        if (p >= b) return `${p} is ${b} or more, so another group of ${b} could still be made.`;
        return `${n} − ${p} = ${n - p}, and ${n - p} ÷ ${b} is not a whole number.`;
      }
      if (p === r) return `${r} is how many ${ip} are left over, not how many each gets.`;
      if (p === b) return `${b} is the number of ${gp}, not how many each gets.`;
      if (p > Q) return `${p} each would need ${p * b} ${ip}, but there are only ${n}.`;
      return `${p} each uses only ${p * b} ${ip}, and the ${n - p * b} left is enough to give more.`;
    };
    const { opts, r: rr } = V25MA9_O(ans, cands.map(x => [x, null]), () => ans + R(-3, 3), null, gen);
    const why = md === "up" ? `${n} ÷ ${b} = ${Q} R ${r}. ${Q} ${gp} hold ${Q * b}, so 1 more is needed for the last ${r}.` : md === "down" ? `${n} ÷ ${b} = ${Q} R ${r}. Only ${Q} ${gp} can be full. The ${r} left over aren't enough for another.` : md === "left" ? `${n} ÷ ${b} = ${Q} R ${r}. The remainder, ${r}, is what is left over.` : `${n} ÷ ${b} = ${Q} R ${r}. Each one gets ${Q}, and ${r} are left over.`;
    return { q: c.t(n, b), vis: bigEmo(c.e), opts, ans: String(ans), big: 1, why, key: `v25d${ci}:${n}/${b}`, v25: { r: rr } };
  }
  const ci = R(0, V25MA9_DIVB.length - 1), [e, f, gp] = V25MA9_DIVB[ci], w = pick(KIDS), b = R(3, 9), Q = R(3, 12), r = R(1, b - 1), N = Q * b + r;
  const { opts, r: rr } = V25MA9_O(N, [
    [Q * b, `${Q * b} counts only the ${Q} full ${gp}. Add the ${r} left over.`],
    [Q * b - r, `The ${r} left over must be added, not taken away.`],
    [Q + b + r, `${Q + b + r} adds all the numbers. Multiply ${Q} × ${b} first, then add ${r}.`],
    [(Q + 1) * b, `${(Q + 1) * b} would be ${Q + 1} full ${gp} with none left over.`],
  ], () => N + R(-5, 5), null, v => `${Q} × ${b} + ${r} = ${N}, not ${v}.`);
  return { q: f(w, b, Q, r), vis: bigEmo(e), opts, ans: String(N), big: 1, why: `${Q} × ${b} = ${Q * b}, and ${Q * b} + ${r} = ${N}.`, key: `v25dt${ci}:${w}:${b}:${Q}:${r}`, v25: { r: rr } };
});
whyRule(9, "math", "divrem", V25MA9_rule);

/* ---------- equivfrac: who did more (equal or not), measuring scoops and pieces ---------- */
const V25MA9_EQW = [
  ["🍕", F => `ate ${F} of a pizza`, "The pizzas are the same size.", "Who ate more pizza?"],
  ["🎀", F => `used ${F} of a roll of ribbon`, "The rolls are the same size.", "Who used more ribbon?"],
  ["📖", F => `read ${F} of a book`, "The books are the same length.", "Who read more?"],
  ["🏃", F => `ran ${F} of a mile`, "", "Who ran farther?"],
  ["🥤", F => `drank ${F} of a bottle of water`, "The bottles are the same size.", "Who drank more water?"],
  ["🧩", F => `finished ${F} of a puzzle`, "The puzzles are the same size.", "Who finished more?"],
  ["🌱", F => `planted ${F} of a garden bed`, "The garden beds are the same size.", "Who planted more?"],
  ["🍞", F => `ate ${F} of a loaf of bread`, "The loaves are the same size.", "Who ate more bread?"],
  ["🧶", F => `knitted ${F} of a scarf`, "The scarves are the same length.", "Who knitted more?"],
  ["🖍️", F => `colored ${F} of a picture`, "The pictures are the same size.", "Who colored more?"],
  ["🥧", F => `ate ${F} of a pie`, "The pies are the same size.", "Who ate more pie?"],
  ["🥾", F => `hiked ${F} of a mile`, "", "Who hiked farther?"],
  ["🍋", F => `drank ${F} of a pitcher of lemonade`, "The pitchers are the same size.", "Who drank more lemonade?"],
  ["⏱️", F => `practiced for ${F} of an hour`, "", "Who practiced longer?"],
  ["🏊", F => `swam ${F} of a mile`, "", "Who swam farther?"],
  ["🚲", F => `biked ${F} of a mile`, "", "Who biked farther?"],
];
const V25MA9_BM = [[2, 2], [2, 3], [2, 4], [2, 5], [2, 6], [3, 2], [3, 4], [4, 2], [4, 3], [5, 2], [6, 2]];
const V25MA9_SCOOP = [
  ["🥣", (w, A, B, ing) => `A recipe needs ${A} cup of ${ing}. ${w} only has a ${B} cup scoop. How many scoops does ${w} need?`, "scoops", "cup", [[1, 2, 2], [1, 2, 4], [1, 4, 2], [3, 4, 2]]],
  ["🥾", (w, A, B) => `A nature trail is ${A} of a mile long. It is split into equal parts, each ${B} of a mile long. How many parts are there?`, "parts", "mile"],
  ["🎀", (w, A, B) => `${w} needs ${A} of a meter of ribbon. The store sells pieces that are ${B} of a meter long. How many pieces does ${w} need?`, "pieces", "meter"],
  ["🎹", (w, A, B) => `${w}'s piano practice is ${A} of an hour. Each song takes ${B} of an hour. How many songs fit in the practice?`, "songs", "hour"],
  ["🏊", (w, A, B) => `${w} wants to swim ${A} of a mile. One length of the lake dock is ${B} of a mile. How many lengths should ${w} swim?`, "lengths", "mile"],
];
const V25MA9_ING = ["flour", "sugar", "milk", "oats", "rice", "water", "raisins", "yogurt", "cocoa powder"];
addBank(9, "math", "equivfrac", 0.3, () => {
  const [n1, n2] = shuffle(KIDS).slice(0, 2);
  if (Math.random() < 0.55) {
    const ci = R(0, V25MA9_EQW.length - 1), [e, vf, same, Qs] = V25MA9_EQW[ci], [b, m] = pick(V25MA9_BM), a = R(1, b - 1), y = b * m, equal = Math.random() < 0.3;
    let x = a * m; if (!equal) { const c = [x - 1, x + 1].filter(v => v >= 1 && v < y); x = pick(c); }
    const firstSimple = Math.random() < 0.5, nS = firstSimple ? n1 : n2, nB = firstSimple ? n2 : n1;
    const sent = s => `${firstSimple ? n1 : n2} ${s}`;
    const q = `${n1} ${vf(firstSimple ? frac(a, b) : frac(x, y))}. ${n2} ${vf(firstSimple ? frac(x, y) : frac(a, b))}.${same ? " " + same : ""} ${Qs}`;
    const SAME = "They did the same amount", A = `${a}/${b}`, X = `${x}/${y}`, AM = `${a * m}/${y}`;
    let ans; const r = {};
    if (equal) { ans = SAME; r[nS] = `${A} and ${X} are equal: ${a} × ${m} = ${x} and ${b} × ${m} = ${y}.`; r[nB] = r[nS]; }
    else {
      const bigger = x > a * m ? nB : nS, smaller = bigger === nB ? nS : nB, bigF = x > a * m ? X : A, smallF = x > a * m ? A : X;
      ans = bigger; r[smaller] = `${smaller}'s ${smallF} is less than ${bigger}'s ${bigF}, since ${A} = ${AM}.`; r[SAME] = `${A} equals ${AM}, not ${X}, so they are different amounts.`;
    }
    const why = equal ? `${A} = ${AM} (multiply the top and bottom by ${m}), so they did the same amount.` : `${A} = ${AM}. ${Math.max(x, a * m)}/${y} is more than ${Math.min(x, a * m)}/${y}, so ${ans} did more.`;
    void sent;
    return { q, say: V25MA9_say(q), vis: bigEmo(e), opts: [n1, n2, SAME], ans, big: 1, why, key: `v25ew${ci}:${n1}${n2}:${firstSimple ? 1 : 0}:${a}/${b}:${x}/${y}`, v25: { r } };
  }
  const ci = R(0, V25MA9_SCOOP.length - 1), [e, f, pw, un, fixed] = V25MA9_SCOOP[ci];
  let a, b, m; if (fixed) { [a, b, m] = pick(fixed); } else { [b, m] = pick(V25MA9_BM); a = R(1, b - 1); }
  const s = b * m, ans = a * m, ing = pick(V25MA9_ING), q = f(n1, frac(a, b), frac(1, s), ing);
  const { opts, r } = V25MA9_O(ans, [[a, null], [m, null], [s, null], [ans + 1, null], [ans - 1, null], [a + m, null]], () => R(1, s + 2), null, v => `${v} × 1/${s} ${un} = ${v}/${s} ${un}, not ${a}/${b}.`);
  return { q, say: V25MA9_say(q), vis: bar(b, a, 280, 40, "#9B5DE5") + bar(s, 0, 280, 40), opts, ans: String(ans), big: 1, why: `${a}/${b} = ${ans}/${s} (multiply the top and bottom by ${m}), so it takes ${ans} ${pw} of 1/${s}.`, key: `v25es${ci}:${n1}:${ing}:${a}/${b}:${s}`, v25: { r } };
});
whyRule(9, "math", "equivfrac", V25MA9_rule);

/* ---------- decimals: dimes & pennies as dollars, compare real measurements ---------- */
const V25MA9_COINW = [
  (w, c) => `${w} has ${c} in a coin purse.`, (w, c) => `${w} finds ${c} under the couch cushions.`, (w, c) => `${w} earns ${c} at a lemonade stand.`,
  (w, c) => `${w} has ${c} in a piggy bank.`, (w, c) => `${w} gets ${c} as change at the store.`, (w, c) => `${w} finds ${c} in a coat pocket.`,
  (w, c) => `${w} has saved ${c} in a jar.`, (w, c) => `${w} brings ${c} to the school bake sale.`, (w, c) => `${w} has ${c} in a backpack pocket.`,
  (w, c) => `Grandpa gives ${w} ${c}.`, (w, c) => `${w} wins ${c} at a school fair game.`, (w, c) => `${w} earns ${c} for feeding the neighbor's cat.`,
  (w, c) => `${w} finds ${c} in the car seat.`, (w, c) => `${w} keeps ${c} in a pencil case.`, (w, c) => `${w} gets ${c} back at the book sale.`,
];
const V25MA9_DCMP = [
  ["✈️", "paper airplane flew", "meters", "Whose paper airplane flew farther?"],
  ["🌻", "sunflower grew", "meters", "Whose sunflower grew more?"],
  ["🐸", "frog jumped", "meters", "Whose frog jumped farther?"],
  ["🥤", "water bottle holds", "liters", "Whose water bottle holds more?"],
  ["🎀", "ribbon is", "meters long", "Whose ribbon is longer?"],
  ["🚗", "toy car rolled", "meters", "Whose toy car rolled farther?"],
  ["🌧️", "rain gauge caught", "inches of rain", "Whose rain gauge caught more rain?"],
  ["🐶", "puppy weighs", "kilograms", "Whose puppy weighs more?"],
  ["🎃", "pumpkin weighs", "kilograms", "Whose pumpkin weighs more?"],
  ["🏰", "sandcastle is", "meters tall", "Whose sandcastle is taller?"],
  ["🐌", "snail crawled", "meters", "Whose snail crawled farther?"],
  ["🍉", "watermelon weighs", "kilograms", "Whose watermelon weighs more?"],
  ["🌽", "corn plant is", "meters tall", "Whose corn plant is taller?"],
  ["🎈", "balloon string is", "meters long", "Whose balloon string is longer?"],
  ["🐢", "turtle walked", "meters", "Whose turtle walked farther?"],
];
addBank(9, "math", "decimals", 0.3, () => {
  const [n1, n2] = shuffle(KIDS).slice(0, 2);
  if (Math.random() < 0.45) {
    const t = R(1, 9), p = R(1, 9), c = 10 * t + p, wi = R(0, V25MA9_COINW.length - 1), ans = `$0.${t}${p}`;
    const q = `${V25MA9_COINW[wi](n1, `${V25MA9_pl(t, "dime")} and ${V25MA9_pl(p, "penny", "pennies")}`)} How much money is that, written in dollars?`;
    const { opts, r } = V25MA9_O(ans, [
      p !== t ? [`$0.${p}${t}`, `$0.${p}${t} would be ${V25MA9_pl(p, "dime")} and ${V25MA9_pl(t, "penny", "pennies")}.`] : null,
      [`$${t}.${p}0`, `$${t}.${p}0 is more than ${t} dollar${t > 1 ? "s" : ""}, but these coins are less than $1.`],
      t + p < 10 ? [`$0.0${t + p}`, `$0.0${t + p} counts each dime as 1 cent, but a dime is 10 cents.`] : null,
      [`$0.${t}0`, `$0.${t}0 is just the ${t === 1 ? "dime" : "dimes"}. Add the ${V25MA9_pl(p, "penny", "pennies")} too.`],
      [`$0.${p}0`, `$0.${p}0 is ${p * 10} cents, but the coins make ${c} cents.`],
    ], null, x => x, null);
    return { q, vis: coinRow([...Array(t).fill("d"), ...Array(p).fill("p")]), opts, ans, big: 1, why: `${V25MA9_pl(t, "dime")} = ${10 * t} cents and ${V25MA9_pl(p, "penny", "pennies")} = ${V25MA9_pl(p, "cent")}. ${10 * t} + ${p} = ${c} cents = ${ans}.`, key: `v25dc${wi}:${n1}:${t}${p}`, v25: { r } };
  }
  const ci = R(0, V25MA9_DCMP.length - 1), [e, verb, unit, Qs] = V25MA9_DCMP[ci], w = R(0, 2), mode = pick(["trick", "trick", "more", "equal"]);
  const t = mode === "trick" ? R(2, 9) : R(1, 8), d = R(1, 9);
  const A = `${w}.${t}`, B = mode === "trick" ? `${w}.${t - 1}${d}` : mode === "more" ? `${w}.${t}${d}` : `${w}.${t}0`;
  const ah = w * 100 + t * 10, bh = mode === "trick" ? w * 100 + (t - 1) * 10 + d : mode === "more" ? w * 100 + t * 10 + d : ah;
  const aFirst = Math.random() < 0.5, nA = aFirst ? n1 : n2, nB = aFirst ? n2 : n1, A2 = `${w}.${t}0`;
  const q = `${n1}'s ${verb} ${aFirst ? A : B} ${unit}. ${n2}'s ${verb} ${aFirst ? B : A} ${unit}. ${Qs}`;
  const EQ = "They are equal", r = {}; let ans;
  if (ah === bh) { ans = EQ; r[nA] = `${A} and ${B} are equal: ${V25MA9_pl(t, "tenth")} is the same as ${t}0 hundredths.`; r[nB] = r[nA]; }
  else {
    const big = ah > bh ? nA : nB, small = big === nA ? nB : nA, bs = ah > bh ? A2 : B, ss = ah > bh ? B : A2;
    ans = big; r[small] = `Write both with two decimal places: ${ss} is less than ${bs}.`; r[EQ] = `${A} is the same as ${A2}, and ${B} is different, so they are not equal.`;
  }
  return { q, vis: bigEmo(e), opts: [n1, n2, EQ], ans, big: 1, why: ah === bh ? `${A} = ${A2}, so they are equal.` : `${A} = ${A2}. Compare ${A2} and ${B}: ${ah > bh ? A2 : B} is greater.`, key: `v25dm${ci}:${n1}${n2}:${aFirst ? 1 : 0}:${A}:${B}`, v25: { r } };
});
whyRule(9, "math", "decimals", V25MA9_rule);

/* ---------- area: real rooms, rugs and fields; two-part (L-shaped) areas ---------- */
const V25MA9_AREA = [
  ["🛁", (L, W) => `A bathroom floor is ${L} feet long and ${W} feet wide. Each tile covers 1 square foot. How many tiles cover the floor?`, [5, 9], [4, 8], "tiles", "tiles"],
  ["🧶", (L, W) => `A rug is ${L} feet long and ${W} feet wide. What is its area?`, [4, 9], [2, 6], "sq ft", "square feet"],
  ["🖼️", (L, W) => `A poster is ${L} inches wide and ${W} inches tall. What is its area?`, [11, 18], [6, 9], "sq in", "square inches"],
  ["🛏️", (L, W) => `A quilt is ${L} feet long and ${W} feet wide. How many square feet does it cover?`, [6, 8], [4, 7], "sq ft", "square feet"],
  ["♟️", L => `A square game board is ${L} inches on each side. What is its area?`, [8, 16], null, "sq in", "square inches"],
  ["🌿", (L, W) => `A lawn is ${L} yards long and ${W} yards wide. How many square yards of grass is that?`, [12, 25], [4, 9], "sq yd", "square yards"],
  ["📌", (L, W) => `A bulletin board is ${L} feet wide and ${W} feet tall. How many square feet of paper will cover it?`, [5, 9], [3, 4], "sq ft", "square feet"],
  ["🐕", (L, W) => `A dog run is ${L} meters long and ${W} meters wide. How much ground does it cover?`, [6, 15], [2, 5], "sq m", "square meters"],
  ["🏠", (L, W) => `A bedroom is ${L} feet long and ${W} feet wide. How many square feet of carpet cover the floor?`, [10, 14], [7, 9], "sq ft", "square feet"],
  ["🍫", (L, W) => `A chocolate bar is ${L} small squares long and ${W} squares wide. How many small squares does it have?`, [4, 8], [2, 5], "squares", "squares"],
  ["🌼", (L, W) => `A flower patch is ${L} meters long and ${W} meters wide. What is its area?`, [4, 12], [2, 6], "sq m", "square meters"],
  ["🏀", (L, W) => `A small play court is ${L} yards long and ${W} yards wide. What is its area?`, [10, 20], [5, 9], "sq yd", "square yards"],
  ["🎨", (L, W) => `A wall mural is ${L} feet long and ${W} feet tall. How many square feet will be painted?`, [10, 25], [4, 8], "sq ft", "square feet"],
  ["🐠", (L, W) => `The bottom of a fish tank is ${L} inches long and ${W} inches wide. What is the area of the bottom?`, [16, 30], [6, 9], "sq in", "square inches"],
  ["📝", L => `A square sticky note is ${L} inches on each side. What is its area?`, [3, 5], null, "sq in", "square inches"],
  ["🧺", (L, W) => `A picnic blanket is ${L} feet long and ${W} feet wide. How much ground does it cover?`, [5, 8], [4, 6], "sq ft", "square feet"],
];
const V25MA9_ACOMP = [["🏡", "A patio", "feet"], ["🛋️", "An L-shaped living room", "feet"], ["🎭", "A school stage", "feet"], ["🧸", "A play mat", "feet"], ["🌾", "A farm field", "yards"], ["🛹", "A skate park", "meters"], ["🌷", "A flower garden", "meters"], ["🏊", "A pool deck", "feet"]];
const V25MA9_SQ = { feet: ["sq ft", "square feet"], yards: ["sq yd", "square yards"], meters: ["sq m", "square meters"] };
addBank(9, "math", "area", 0.3, () => {
  if (Math.random() < 0.6) {
    const ci = R(0, V25MA9_AREA.length - 1), [e, f, lr, wr, us, ul] = V25MA9_AREA[ci], L = R(lr[0], lr[1]), W = wr ? R(wr[0], wr[1]) : L, A = L * W, F = x => `${x} ${us}`;
    const { opts, r } = V25MA9_O(A, [
      [2 * (L + W), `${2 * (L + W)} is the perimeter, the distance around the edge. Area covers the inside.`],
      [L + W, `${L + W} is ${L} + ${W}. For area, multiply: ${L} × ${W}.`],
      [A + L, `${A + L} would be ${L} × ${W + 1}, but it is ${W} wide.`],
      [A - L, `${A - L} would be ${L} × ${W - 1}, but it is ${W} wide.`],
    ], () => A + R(-10, 10), F, v => `${L} × ${W} = ${A}, not ${v}.`);
    return { q: f(L, W), vis: bigEmo(e), opts, ans: F(A), big: 1, why: `Area = length × width: ${L} × ${W} = ${A} ${ul}.`, key: `v25a${ci}:${L}x${W}`, v25: { r } };
  }
  const ci = R(0, V25MA9_ACOMP.length - 1), [e, thing, u] = V25MA9_ACOMP[ci];
  let a, b, c, d; do { a = R(3, 9); b = R(2, 7); c = R(2, 6); d = R(2, 5); } while (a * b === c * d);
  const ab = a * b, cd = c * d, T = ab + cd, [us, ul] = V25MA9_SQ[u], F = x => `${x} ${us}`;
  const { opts, r } = V25MA9_O(T, [
    [ab, `${ab} is just the first part. Add the other part, ${c} × ${d} = ${cd}.`],
    [cd, `${cd} is just the second part. Add the first part, ${a} × ${b} = ${ab}.`],
    [a + b + c + d, `${a + b + c + d} adds the side lengths. Multiply each part, then add.`],
    [(a + c) * (b + d), `${(a + c) * (b + d)} multiplies added sides. Find each part's area, then add.`],
  ], () => T + R(-6, 6), F, v => `${ab} + ${cd} = ${T}, not ${v}.`);
  const q = `${thing} is made of two rectangles. One part is ${a} ${u} by ${b} ${u}. The other part is ${c} ${u} by ${d} ${u}. What is the total area?`;
  return { q, vis: row(rectDims(a, b, { grid: true }), rectDims(c, d, { grid: true })), opts, ans: F(T), big: 1, why: `${a} × ${b} = ${ab} and ${c} × ${d} = ${cd}. ${ab} + ${cd} = ${T} ${ul}.`, key: `v25ac${ci}:${a}x${b}+${c}x${d}`, v25: { r } };
});
whyRule(9, "math", "area", V25MA9_rule);

/* ---------- angles: angles at the center of cut food, turns and directions, minute hand ---------- */
const V25MA9_SLICE = [
  ["🍕", n => `A round pizza is cut into ${n} equal slices.`, "slice", [4, 6, 8, 12]],
  ["🥧", n => `A pie is cut into ${n} equal slices.`, "slice", [3, 4, 5, 6, 8]],
  ["🎂", n => `A round cake is cut into ${n} equal pieces.`, "piece", [4, 6, 8, 10, 12]],
  ["🧀", n => `A wheel of cheese is cut into ${n} equal wedges.`, "wedge", [4, 6, 8]],
  ["🥞", n => `A pancake is cut into ${n} equal pieces.`, "piece", [2, 3, 4, 6]],
  ["🌼", n => `A round flower garden is split into ${n} equal beds.`, "bed", [3, 4, 5, 6, 8]],
  ["", n => `A game spinner has ${n} equal sections.`, "section", [3, 4, 5, 6, 8, 10]],
  ["☂️", n => `Seen from above, an open umbrella has ${n} equal panels.`, "panel", [6, 8]],
  ["🎡", n => `A Ferris wheel has ${n} equal spaces between its spokes.`, "space", [6, 8, 10, 12]],
  ["🍉", n => `A round slice of watermelon is cut into ${n} equal wedges.`, "wedge", [4, 6, 8]],
];
const V25MA9_DIRS = ["north", "east", "south", "west"];
const V25MA9_TURN = [0, 1, 2, 3, 4, 5];
const V25MA9_TURN2 = [["A robot", "The robot", "the robot"], ["A toy boat", "The boat", "the boat"], ["A weather vane arrow", "The arrow", "the arrow"], ["An ice skater", "The skater", "the skater"], ["A remote-control car", "The car", "the car"]];
const V25MA9_ACT = ["reading", "practicing violin", "building with blocks", "raking leaves", "working on a puzzle", "drawing", "jumping rope", "folding laundry", "baking bread", "writing a letter"];
addBank(9, "math", "angles", 0.3, () => {
  const w = pick(KIDS), k0 = R(0, 2);
  if (k0 === 0) {
    const ci = R(0, V25MA9_SLICE.length - 1), [e, f, s, ns] = V25MA9_SLICE[ci], n = pick(ns), u = 360 / n, k = n > 2 && Math.random() < 0.4 ? R(2, n - 1) : 1, ans = k * u, D = x => x + "°";
    const q = f(n) + (k === 1 ? ` What angle does one ${s} make at the center?` : ` What angle do ${k} ${s}s make together at the center?`);
    const { opts, r } = V25MA9_O(ans, [
      Number.isInteger(180 * k / n) ? [180 * k / n, `${D(180 * k / n)} uses 180°, but all the way around the center is 360°.`] : null,
      k > 1 ? [u, `${D(u)} is just one ${s}. There are ${k} of them.`] : null,
      [360 - ans, `${D(360 - ans)} is the rest of the circle, not the part asked about.`],
      [k * n, `${D(k * n)} is not right: ${n} equal ${s}s share 360°, so each is ${D(u)}.`],
    ], () => ans + 5 * R(-6, 6), D, v => `Each ${s} is 360° ÷ ${n} = ${D(u)}, so the answer is ${D(ans)}, not ${D(v)}.`);
    return { q, say: V25MA9_say(q), vis: e ? row(bigEmo(e), pie(n, k, 130, "#FF7A59")) : pie(n, k, 150, "#FF7A59"), opts, ans: D(ans), big: 1, why: `A full turn around the center is 360°. 360° ÷ ${n} = ${D(u)}${k > 1 ? `, and ${k} × ${D(u)} = ${D(ans)}` : ""}.`, key: `v25as${ci}:${n}:${k}`, v25: { r } };
  }
  if (k0 === 1) {
    const ti = R(0, V25MA9_TURN.length - 1), d0 = R(0, 3), deg = pick([90, 180, 270]), cw = Math.random() < 0.5, st = deg / 90, end = (d0 + (cw ? st : 4 - st)) % 4, dirW = cw ? "clockwise" : "counterclockwise";
    const sub = ti === 0 ? [w, w, w] : V25MA9_TURN2[ti - 1];
    const qq = `${sub[0]} is facing ${V25MA9_DIRS[d0]}. ${sub[1]} turns ${deg}° ${dirW}. Which way is ${ti === 0 ? w : sub[2]} facing now?`;
    const r = {};
    V25MA9_DIRS.forEach((p, i) => {
      if (i === end) return;
      const s = (i - d0 + 4) % 4, sd = cw ? s : (4 - s) % 4;
      r[p] = s === 0 ? `${cap(p)} is the starting direction. A ${deg}° turn changes the direction.` : `Turning ${sd * 90}° ${dirW} from ${V25MA9_DIRS[d0]} gets to ${p}, but this turn is ${deg}°.`;
    });
    return { q: qq, say: V25MA9_say(qq), vis: note("Clockwise order: north → east → south → west. Each step is 90°."), opts: V25MA9_DIRS.slice(), ans: V25MA9_DIRS[end], big: 1, why: `${deg}° is ${st} quarter turn${st > 1 ? "s" : ""}. ${cap(dirW)} from ${V25MA9_DIRS[d0]}, that ends at ${V25MA9_DIRS[end]}.`, key: `v25at${ti}:${w}:${d0}:${deg}:${cw ? 1 : 0}`, v25: { r } };
  }
  const ai = R(0, V25MA9_ACT.length - 1), pos = R(1, 11), m = pos * 5, ans = 30 * pos, D = x => x + "°", h = R(1, 11);
  const q = `${w} starts ${V25MA9_ACT[ai]} when the minute hand points to 12. ${w} stops ${m} minutes later, when it points to ${pos}. How many degrees did the minute hand turn?`;
  const { opts, r } = V25MA9_O(ans, [
    [m, `${D(m)} is the number of minutes. Each number on the clock is 30° apart.`],
    [360 - ans, `${D(360 - ans)} is the part of the circle the hand did not turn.`],
    [pos * 10, `${D(pos * 10)} counts 10° per number, but each number is 30° apart.`],
    [ans + 30, null], [ans - 30, null],
  ], () => 30 * R(1, 11), D, v => `Each number is 30° apart: ${pos} × 30° = ${D(ans)}, not ${D(v)}.`);
  return { q, say: V25MA9_say(q), vis: clock(h, m, 150), opts, ans: D(ans), big: 1, why: `A full turn is 360°, and the 12 numbers split it into 30° parts. ${pos} × 30° = ${D(ans)}.`, key: `v25am${ai}:${w}:${pos}:${h}`, v25: { r } };
});
whyRule(9, "math", "angles", V25MA9_rule);

/* ---------- factors: equal rows with none left over, full packs (multiples) ---------- */
const V25MA9_ARR = [
  ["🪑", n => `A teacher has ${n} desks to set up in equal rows.`, "desks"],
  ["🧁", n => `A baker wants to put ${n} cupcakes on a tray in equal rows.`, "cupcakes"],
  ["🌳", n => `A farmer is planting ${n} apple trees in equal rows.`, "trees"],
  ["🖼️", n => `An art teacher hangs ${n} paintings on a wall in equal rows.`, "paintings"],
  ["🥁", n => `A marching band has ${n} players lining up in equal rows.`, "players"],
  ["🌱", n => `A gardener plants ${n} seeds in equal rows.`, "seeds"],
  ["🍪", n => `A baker puts ${n} cookies on a baking sheet in equal rows.`, "cookies"],
  ["🚗", n => `A parking lot needs ${n} parking spaces in equal rows.`, "spaces"],
  ["🌷", n => `A park worker plants ${n} tulips in equal rows.`, "tulips"],
  ["⛺", n => `A campground sets up ${n} tents in equal rows.`, "tents"],
  ["🍎", n => `A store worker stacks ${n} apples in equal rows.`, "apples"],
  ["🥫", n => `A store worker lines up ${n} cans in equal rows.`, "cans"],
  ["✉️", n => `A collector puts ${n} stamps on an album page in equal rows.`, "stamps"],
  ["📷", n => `A class lays out ${n} photos in equal rows.`, "photos"],
  ["🎃", n => `A farm stand lines up ${n} pumpkins in equal rows.`, "pumpkins"],
];
const V25MA9_PACK = [
  ["🥤", "Juice boxes come in packs of 6.", 6, "juice boxes", "packs"],
  ["🔋", "Batteries come in packs of 4.", 4, "batteries", "packs"],
  ["🥚", "Eggs come in cartons of 12.", 12, "eggs", "cartons"],
  ["🍏", "Apples come in bags of 5.", 5, "apples", "bags"],
  ["🌭", "Hot dog buns come in packs of 8.", 8, "buns", "packs"],
  ["✏️", "Pencils come in boxes of 10.", 10, "pencils", "boxes"],
  ["🎾", "Tennis balls come in cans of 3.", 3, "tennis balls", "cans"],
  ["🖍️", "Crayons come in boxes of 9.", 9, "crayons", "boxes"],
  ["🍬", "Mints come in rolls of 7.", 7, "mints", "rolls"],
];
addBank(9, "math", "factors", 0.3, () => {
  const w = pick(KIDS);
  if (Math.random() < 0.55) {
    const ci = R(0, V25MA9_ARR.length - 1), [e, f, it] = V25MA9_ARR[ci], n = pick([12, 16, 18, 20, 24, 28, 30, 32, 36, 40, 42, 45, 48, 54, 56, 60, 64, 72]);
    const fs = range(2, n - 1).filter(x => n % x === 0 && x <= 12), nf = range(3, Math.min(n - 1, 15)).filter(x => n % x), not = Math.random() < 0.35;
    if (fs.length < 3 || nf.length < 3) return null;
    const ans = not ? pick(nf) : pick(fs), others = shuffle(not ? fs : nf).slice(0, 3), r = {};
    others.forEach(v => { r[String(v)] = not ? `${v} rows of ${n / v} ${it} use all ${n} with none left over.` : `${n} ÷ ${v} = ${Math.floor(n / v)} R ${n % v}, so the rows wouldn't be equal.`; });
    const q = f(n) + (not ? " Which number of rows would <b>not</b> come out even?" : " Which number of rows works with none left over?");
    return { q, say: V25MA9_say(q), vis: bigEmo(e), opts: shuffle([ans, ...others]).map(String), ans: String(ans), big: 1, why: not ? `${n} ÷ ${ans} = ${Math.floor(n / ans)} R ${n % ans}, so ${ans} rows would not come out even.` : `${ans} × ${n / ans} = ${n}, so ${ans} rows of ${n / ans} work.`, key: `v25fr${ci}:${n}:${ans}:${not ? 1 : 0}:${others.join()}`, v25: { r } };
  }
  const ci = R(0, V25MA9_PACK.length - 1), [e, txt, k, it, pk] = V25MA9_PACK[ci], g = R(3, 12), a = k * g;
  const { opts, r } = V25MA9_O(a, [a + 1, a - 1, a + 2, a - 2, a + k - 1, a - k + 1, a + Math.ceil(k / 2)].filter(v => v % k).map(v => [v, null]), () => { const v = a + R(-k, k); return v % k ? v : null; }, null, v => `${v} ÷ ${k} = ${Math.floor(v / k)} R ${v % k}, so ${v} ${it} can't fill only full ${pk}.`);
  const sh = shuffle(opts.slice());
  return { q: `${txt} ${w} buys only full ${pk}. Which could be the number of ${it} ${w} has?`, vis: bigEmo(e), opts: sh, ans: String(a), big: 1, why: `${k} × ${g} = ${a}, so ${g} full ${pk} make ${a} ${it}.`, key: `v25fp${ci}:${w}:${a}:${sh.slice().sort().join()}`, v25: { r } };
});
whyRule(9, "math", "factors", V25MA9_rule);

/* ---------- elapsed: two activities in a row, read a schedule ---------- */
const V25MA9_TWO = [
  ["📚", (w, S, a, b) => `${w} starts homework at ${S}. ${w} does math for ${a} minutes, then reading for ${b} minutes. What time does ${w} finish?`],
  ["🍪", (w, S, a, b) => `${w} starts making cookies at ${S}. Mixing the dough takes ${a} minutes. Baking takes ${b} minutes. What time are the cookies done?`],
  ["👕", (w, S, a, b) => `The washing machine starts at ${S}. Washing takes ${a} minutes. Drying takes ${b} minutes. What time is the laundry done?`],
  ["⚽", (w, S, a, b) => `Soccer warm-ups start at ${S} and take ${a} minutes. Then the game is played for ${b} minutes. What time does the game end?`],
  ["🚗", (w, S, a, b) => `${w}'s family leaves home at ${S}. They drive for ${a} minutes, then stop at a park for ${b} minutes. What time do they leave the park?`],
  ["🎹", (w, S, a, b) => `${w}'s piano lesson starts at ${S}. Scales take ${a} minutes and songs take ${b} minutes. What time does the lesson end?`],
  ["🧹", (w, S, a, b) => `${w} starts chores at ${S}. Cleaning the bedroom takes ${a} minutes. Walking the dog takes ${b} minutes. What time is ${w} done?`],
  ["🏊", (w, S, a, b) => `Swim lessons start at ${S}. Kids practice strokes for ${a} minutes, then have free swim for ${b} minutes. What time do lessons end?`],
  ["🎨", (w, S, a, b) => `Art club starts at ${S}. Painting takes ${a} minutes and cleanup takes ${b} minutes. What time does art club end?`],
  ["🌱", (w, S, a, b) => `${w} starts gardening at ${S}. Pulling weeds takes ${a} minutes. Watering takes ${b} minutes. What time does ${w} finish?`],
  ["🚌", (w, S, a, b) => `A class bus leaves school at ${S}. The ride to the museum takes ${a} minutes. The tour takes ${b} minutes. What time does the tour end?`],
  ["🎂", (w, S, a, b) => `${w}'s birthday party starts at ${S}. Games go on for ${a} minutes, then cake and gifts take ${b} minutes. What time does the party end?`],
  ["🔬", (w, S, a, b) => `The science fair opens at ${S}. Setting up takes ${a} minutes. Judging takes ${b} minutes. What time does judging end?`],
  ["🐶", (w, S, a, b) => `${w} takes the dog out at ${S}. The walk takes ${a} minutes and playing fetch takes ${b} minutes. What time do they get home?`],
  ["🥞", (w, S, a, b) => `${w} starts making pancakes at ${S}. Mixing the batter takes ${a} minutes. Cooking takes ${b} minutes. What time are the pancakes ready?`],
  ["🎬", (w, S, a, b) => `${w} starts a movie night at ${S}. Making popcorn takes ${a} minutes, and the show runs ${b} minutes. What time does the show end?`],
];
const V25MA9_SCHED = [
  ["Day camp", ["Swimming", "Crafts", "Lunch", "Hiking"]], ["Field trip", ["Bus ride", "Museum tour", "Picnic", "Gift shop"]],
  ["Weekend", ["Soccer", "Lunch", "Library", "Bike ride"]], ["Science day", ["Rocks", "Magnets", "Snack", "Plants"]],
  ["Farm visit", ["Hayride", "Milking cows", "Lunch", "Pumpkin patch"]], ["Art camp", ["Drawing", "Clay", "Snack", "Painting"]],
];
addBank(9, "math", "elapsed", 0.3, () => {
  const w = pick(KIDS);
  if (Math.random() < 0.6) {
    const ci = R(0, V25MA9_TWO.length - 1), [e, f] = V25MA9_TWO[ci], h = R(1, 11), m = 5 * R(0, 11), S = h * 60 + m, a = 5 * R(2, 8), b = 5 * R(3, 10), E = S + a + b, T = fmtTime;
    const off = v => { const g = ((v - E) % 720 + 720) % 720; return g > 360 ? g - 720 : g; };
    const { opts, r } = V25MA9_O(E, [
      [S + a, `${T(S + a)} adds only the ${a} minutes. Add the ${b} minutes too.`],
      [S + b, `${T(S + b)} adds only the ${b} minutes. Add the ${a} minutes too.`],
      [E + 60, `${T(E + 60)} is 1 hour too late. ${a} + ${b} = ${a + b} minutes in all.`],
      [E - 10, null], [E + 10, null],
    ], () => E + 5 * R(-6, 6), T, v => { const d = off(v); return `${T(S)} + ${a + b} minutes = ${T(E)}. ${T(v)} is ${Math.abs(d)} minutes too ${d > 0 ? "late" : "early"}.`; }, -100000);
    const q = f(w, T(S), a, b);
    return { q, vis: clock(h, m, 150), opts, ans: T(E), big: 1, why: `${T(S)} + ${a} minutes = ${T(S + a)}. Then + ${b} minutes = ${T(E)}.`, key: `v25e2${ci}:${w}:${S}:${a}:${b}`, v25: { r } };
  }
  const ci = R(0, V25MA9_SCHED.length - 1), [title, acts] = V25MA9_SCHED[ci], st = R(0, 1), names = acts.slice(st, st + 3);
  const durs = shuffle([20, 25, 30, 35, 40, 45, 50, 60, 75, 90]).slice(0, 3), S = R(10, 11) * 60 + 5 * R(0, 11), T = fmtTime;
  const starts = [S, S + durs[0], S + durs[0] + durs[1]], rows = names.map((nm, i) => [nm, T(starts[i]), T(starts[i] + durs[i])]), vis = table(rows, ["Activity", "Starts", "Ends"]);
  if (Math.random() < 0.5) {
    const i = R(0, 2), ans = durText(durs[i]), r = {}, opts = [ans];
    names.forEach((nm, j) => { if (j !== i) { const s = durText(durs[j]); if (!opts.includes(s)) { opts.push(s); r[s] = `${s} is how long ${nm} lasts, not ${names[i]}.`; } } });
    for (const d of shuffle([durs[i] + 10, durs[i] - 10, durs[i] + 15, durs[i] + 60])) { if (opts.length >= 4) break; const s = durText(d); if (d > 0 && !opts.includes(s)) { opts.push(s); r[s] = `From ${rows[i][1]} to ${rows[i][2]} is ${ans}, not ${s}.`; } }
    return { q: `Look at the ${title.toLowerCase()} schedule. How long does <b>${names[i]}</b> last?`, say: `Look at the ${title.toLowerCase()} schedule. How long does ${names[i]} last?`, vis, opts: shuffle(opts), ans, big: 1, why: `${names[i]} goes from ${rows[i][1]} to ${rows[i][2]}. That is ${ans}.`, key: `v25es${ci}:${st}:${S}:${durs.join()}:${i}`, v25: { r } };
  }
  const mx = durs.indexOf(Math.max(...durs)), r = {};
  names.forEach((nm, j) => { if (j !== mx) r[nm] = `${nm} lasts ${durText(durs[j])}, but ${names[mx]} lasts ${durText(durs[mx])}.`; });
  return { q: `Look at the ${title.toLowerCase()} schedule. Which activity lasts the <b>longest</b>?`, say: `Look at the ${title.toLowerCase()} schedule. Which activity lasts the longest?`, vis, opts: shuffle(names.slice()), ans: names[mx], big: 1, why: `${names.map((nm, j) => `${nm}: ${durText(durs[j])}`).join(". ")}. ${names[mx]} is the longest.`, key: `v25el${ci}:${st}:${S}:${durs.join()}`, v25: { r } };
});
whyRule(9, "math", "elapsed", V25MA9_rule);

/* ---------- bignums: digits in real data, compare towns, how many full thousands ---------- */
const V25MA9_BIGC = [
  ["🏙️", N => `A city has ${N} people.`], ["🏟️", N => `A ballpark sold ${N} tickets this season.`], ["🌲", N => `A forest has ${N} pine trees.`],
  ["🌽", N => `A farm grew ${N} ears of corn this year.`], ["🚂", N => `A train traveled ${N} miles this year.`], ["🦁", N => `A zoo had ${N} visitors this year.`],
  ["🍞", N => `A bakery sold ${N} loaves of bread this year.`], ["🐝", N => `A bee farm has ${N} honeybees.`], ["✈️", N => `An airport had ${N} travelers last month.`],
  ["🍲", N => `A food bank served ${N} meals this year.`], ["♻️", N => `A recycling center collected ${N} cans this year.`], ["🐟", N => `Scientists counted ${N} salmon swimming up a river.`],
  ["📚", N => `The schools in a town have ${N} library books.`], ["🎃", N => `A pumpkin farm sold ${N} pumpkins this fall.`], ["🥛", N => `A dairy farm sold ${N} gallons of milk this year.`],
];
const V25MA9_TOWNS = ["Maple Grove", "River Bend", "Oak Hill", "Pine Valley", "Cedar Falls", "Lake View", "Stony Creek", "Sunny Brook", "Fox Hollow", "Willow Park"];
const V25MA9_TCMP = [["people", "Which town has the most people?", "Which town has the fewest people?", "People"], ["library books", "Which town's library has the most books?", "Which town's library has the fewest books?", "Library books"], ["trees", "Which town planted the most trees?", "Which town planted the fewest trees?", "Trees planted"], ["cans", "Which town recycled the most cans?", "Which town recycled the fewest cans?", "Cans recycled"]];
const V25MA9_GRP = [
  ["🧢", (N, U) => `A school collected ${N} bottle caps. They pack them in boxes of ${U}. How many full boxes can they pack?`, "boxes"],
  ["🎟️", (N, U) => `A fair printed ${N} tickets on rolls of ${U}. How many full rolls are there?`, "rolls"],
  ["📄", (N, U) => `A print shop has ${N} sheets of paper in stacks of ${U}. How many full stacks are there?`, "stacks"],
  ["🍬", (N, U) => `A candy shop made ${N} mints and put them in bags of ${U}. How many full bags are there?`, "bags"],
  ["🌱", (N, U) => `A tree farm has ${N} seedlings in trays of ${U}. How many full trays are there?`, "trays"],
];
const V25MA9_UNW = { 10: "ten", 100: "hundred", 1000: "thousand", 10000: "ten thousand" };
addBank(9, "math", "bignums", 0.3, () => {
  const k = R(0, 2);
  if (k === 0) {
    let d; do { d = shuffle(range(0, 9)).slice(0, 6); } while (d[0] === 0);
    const N = +d.join(""), ci = R(0, V25MA9_BIGC.length - 1), [e, f] = V25MA9_BIGC[ci], p = R(0, 5), dig = d[5 - p], plOf = x => MA9V_PLACES[5 - d.indexOf(x)];
    const others = shuffle(d.filter(x => x !== dig)).slice(0, 3), r = {};
    others.forEach(x => { r[String(x)] = `${x} is in the ${plOf(x)} place, not the ${MA9V_PLACES[p]} place.`; });
    const q = `${f(fmtN(N))} Which digit is in the <b>${MA9V_PLACES[p]}</b> place?`;
    return { q, say: V25MA9_say(q), vis: row(bigEmo(e), eq(fmtN(N))), opts: shuffle([dig, ...others]).map(String), ans: String(dig), big: 1, why: `In ${fmtN(N)}, the ${MA9V_PLACES[p]} digit is ${dig}.`, key: `v25bd${ci}:${N}:${p}:${others.join()}`, v25: { r } };
  }
  if (k === 1) {
    const ci = R(0, V25MA9_TCMP.length - 1), [, qM, qL, head] = V25MA9_TCMP[ci], towns = shuffle(V25MA9_TOWNS).slice(0, 4), d1 = R(1, 9), vals = new Set();
    while (vals.size < 4) vals.add(d1 * 100000 + (Math.random() < 0.6 ? R(0, 1) : R(0, 9)) * 10000 + R(0, 9999));
    const v = [...vals], most = Math.random() < 0.5, A = most ? Math.max(...v) : Math.min(...v), ai = v.indexOf(A), r = {};
    towns.forEach((t, i) => { if (i !== ai) r[t] = `${t}'s ${fmtN(v[i])} is ${v[i] < A ? "less" : "more"} than ${towns[ai]}'s ${fmtN(A)}.`; });
    return { q: most ? qM : qL, vis: table(towns.map((t, i) => [t, fmtN(v[i])]), ["Town", head]), opts: shuffle(towns.slice()), ans: towns[ai], big: 1, why: `Compare from the left. ${towns[ai]}'s ${fmtN(A)} is the ${most ? "greatest" : "least"}.`, key: `v25bt${ci}:${towns.join()}:${v.join()}:${most ? 1 : 0}`, v25: { r } };
  }
  const ci = R(0, V25MA9_GRP.length - 1), [e, f, bx] = V25MA9_GRP[ci], U = pick([100, 1000]), N = U === 100 ? R(1001, 99999) : R(10001, 999999), ans = Math.floor(N / U), UW = V25MA9_UNW[U];
  const { opts, r } = V25MA9_O(ans, [
    ans >= 10 ? [ans % 10, `${ans % 10} is only the ${UW}s digit. ${fmtN(N)} has ${ans} ${UW}s in all.`] : null,
    [Math.floor(N / (U / 10)), `${fmtN(Math.floor(N / (U / 10)))} is how many ${V25MA9_UNW[U / 10]}s, not ${UW}s.`],
    Math.floor(N / (U * 10)) >= 1 ? [Math.floor(N / (U * 10)), `${Math.floor(N / (U * 10))} is how many ${V25MA9_UNW[U * 10]}s, not ${UW}s.`] : null,
    [ans + 1, `${ans + 1} full ${bx} would need ${fmtN((ans + 1) * U)}, more than ${fmtN(N)}.`],
  ], () => ans + R(-3, 3), fmtN, v => v > ans ? `${v} full ${bx} would need ${fmtN(v * U)}, more than ${fmtN(N)}.` : `${v} full ${bx} use only ${fmtN(v * U)}, and enough is left for more.`);
  return { q: f(fmtN(N), fmtN(U)), vis: bigEmo(e), opts, ans: fmtN(ans), big: 1, why: `${fmtN(N)} has ${ans} ${UW}s, so ${ans} full ${bx} of ${fmtN(U)}.`, key: `v25bg${ci}:${N}:${U}`, v25: { r } };
});
whyRule(9, "math", "bignums", V25MA9_rule);

/* ---------- numpatterns: growing tables, odd/even features of a rule ---------- */
const V25MA9_GROW = [
  ["💰", (w, S, K) => `${w} has $${S} in week 1 and saves $${K} more each week.`, "Week", x => "$" + x, (w, t) => `How much money will ${w} have in week ${t}?`],
  ["🌱", (w, S, K) => `A bean plant is ${S} cm tall in week 1 and grows ${K} cm each week.`, "Week", x => x + " cm", (w, t) => `How tall will the plant be in week ${t}?`],
  ["📖", (w, S, K) => `${w} has read ${S} pages by day 1 and reads ${K} more pages each day.`, "Day", x => x + " pages", (w, t) => `How many pages will ${w} have read by day ${t}?`],
  ["🧱", (w, S, K) => `A tower is ${S} blocks tall after step 1. Each step adds ${K} blocks.`, "Step", x => x + " blocks", (w, t) => `How many blocks tall will the tower be after step ${t}?`],
  ["🎟️", (w, S, K) => `A school has sold ${S} raffle tickets by day 1 and sells ${K} more each day.`, "Day", x => x + " tickets", (w, t) => `How many tickets will be sold by day ${t}?`],
  ["⏱️", (w, S, K) => `${w} practiced ${S} minutes in week 1 and adds ${K} minutes each week.`, "Week", x => x + " min", (w, t) => `How many minutes will ${w} practice in week ${t}?`],
  ["🌳", (w, S, K) => `A town has planted ${S} trees by year 1 and plants ${K} more each year.`, "Year", x => x + " trees", (w, t) => `How many trees will be planted by year ${t}?`],
  ["🚴", (w, S, K) => `${w} has biked ${S} miles by day 1 and bikes ${K} more miles each day.`, "Day", x => x + " miles", (w, t) => `How many miles will ${w} have biked by day ${t}?`],
  ["🍪", (w, S, K) => `A bakery has baked ${S} cookies by hour 1 and bakes ${K} more each hour.`, "Hour", x => x + " cookies", (w, t) => `How many cookies will be baked by hour ${t}?`],
  ["💧", (w, S, K) => `A rain barrel has ${S} gallons in week 1 and gains ${K} gallons each week.`, "Week", x => x + " gallons", (w, t) => `How many gallons will it have in week ${t}?`],
  ["📿", (w, S, K) => `${w} strings ${S} beads in round 1 and adds ${K} beads each round.`, "Round", x => x + " beads", (w, t) => `How many beads will be on the string after round ${t}?`],
  ["✉️", (w, S, K) => `${w} has ${S} stamps in month 1 and adds ${K} stamps each month.`, "Month", x => x + " stamps", (w, t) => `How many stamps will ${w} have in month ${t}?`],
  ["🐥", (w, S, K) => `A farm has ${S} chicks in week 1, and ${K} more hatch each week.`, "Week", x => x + " chicks", (w, t) => `How many chicks will the farm have in week ${t}?`],
  ["🥤", (w, S, K) => `A lemonade stand has sold ${S} cups by hour 1 and sells ${K} more cups each hour.`, "Hour", x => x + " cups", (w, t) => `How many cups will be sold by hour ${t}?`],
  ["🐜", (w, S, K) => `An ant colony has dug ${S} cm of tunnel by day 1 and digs ${K} cm more each day.`, "Day", x => x + " cm", (w, t) => `How long will the tunnel be by day ${t}?`],
];
const V25MA9_PAR = [
  ["🏠", (S, K) => `House numbers on Elm Street start at ${S} and go up by ${K}.`, "house numbers"],
  ["🎭", (S, K) => `Seats in a theater row start at number ${S} and go up by ${K}.`, "seat numbers"],
  ["🐸", (S, K) => `A frog starts on stone ${S} and jumps ahead ${K} stones each time.`, "stone numbers it lands on"],
  ["🔒", (S, K) => `Blue lockers start at locker ${S}, then every ${K} lockers after that.`, "blue locker numbers"],
  ["🚌", (S, K) => `A bus stops at mile ${S}, then every ${K} miles after that.`, "mile numbers where it stops"],
  ["👕", (S, K) => `Team jersey numbers start at ${S} and go up by ${K}.`, "jersey numbers"],
  ["📖", (S, K) => `A book has pictures on page ${S} and then every ${K} pages after that.`, "page numbers with pictures"],
  ["🌻", (S, K) => `A gardener plants sunflowers in row ${S} and then every ${K} rows after that.`, "row numbers with sunflowers"],
  ["🎟️", (S, K) => `Prize tickets start at number ${S} and go up by ${K}.`, "prize ticket numbers"],
];
addBank(9, "math", "numpatterns", 0.3, () => {
  const w = pick(KIDS);
  if (Math.random() < 0.6) {
    const ci = R(0, V25MA9_GROW.length - 1), [e, f, lab, F, qf] = V25MA9_GROW[ci], S = R(2, 30), K = R(2, 15), t = R(5, 8), val = i => S + (i - 1) * K, ans = val(t);
    const seqTxt = `${S}, ${S + K}, ${S + 2 * K}`;
    const { opts, r } = V25MA9_O(ans, [
      [ans - K, `${F(ans - K)} is ${lab.toLowerCase()} ${t - 1}, one step before ${lab.toLowerCase()} ${t}.`],
      [ans + K, `${F(ans + K)} is ${lab.toLowerCase()} ${t + 1}, one step past ${lab.toLowerCase()} ${t}.`],
      [t * K, `${F(t * K)} is just ${t} × ${K}. Start from ${S} in ${lab.toLowerCase()} 1.`],
      [S + t + K, `${F(S + t + K)} adds the numbers. The pattern adds ${K} for each step.`],
    ], () => ans + R(-6, 6), F, v => `The pattern goes ${seqTxt}, adding ${K} each time, so ${F(v)} is not ${lab.toLowerCase()} ${t}.`);
    const q = `${f(w, S, K)} ${qf(w, t)}`;
    return { q, vis: row(bigEmo(e), table(range(1, 4).map(i => [`${lab} ${i}`, F(val(i))]), [lab, "Amount"])), opts, ans: F(ans), big: 1, why: `Each ${lab.toLowerCase()} adds ${K}. ${lab} ${t} is ${t - 1} steps after ${lab.toLowerCase()} 1: ${S} + ${t - 1} × ${K} = ${ans}.`, key: `v25ng${ci}:${w}:${S}:${K}:${t}`, v25: { r } };
  }
  const ci = R(0, V25MA9_PAR.length - 1), [e, f, noun] = V25MA9_PAR[ci], S = R(1, 30), K = R(2, 9);
  const OD = "They are all odd.", EV = "They are all even.", SW = "They switch: odd, even, odd, even…";
  const ans = K % 2 ? SW : S % 2 ? OD : EV, truth = ans === SW ? "they switch between odd and even" : ans === OD ? "they are all odd" : "they are all even";
  const r = {}; [OD, EV, SW].forEach(o => { if (o !== ans) r[o] = `The numbers go ${S}, ${S + K}, ${S + 2 * K}, ${S + 3 * K}, so ${truth}.`; });
  const oe = x => x % 2 ? "odd" : "even";
  return { q: `${f(S, K)} What is true about all the ${noun}?`, vis: bigEmo(e), opts: [OD, EV, SW], ans, big: 1, why: `${S} is ${oe(S)}. Adding ${K}, an ${oe(K) === "odd" ? "odd" : "even"} number, ${K % 2 ? "switches between odd and even each time" : "keeps it " + oe(S)}.`.replace("an even", "an even").replace(", an even", ", an even"), key: `v25np${ci}:${S}:${K}`, v25: { r } };
});
whyRule(9, "math", "numpatterns", V25MA9_rule);

/* ---------- convert: kg/g, L/mL, cm/mm, km/m stories; how much longer or heavier ---------- */
const V25MA9_MET = [
  ["🍉", "A watermelon weighs", [2, 9], "kilograms", "grams", 1000, ""], ["🎒", "A backpack weighs", [2, 6], "kilograms", "grams", 1000, ""],
  ["🐶", "A puppy weighs", [3, 9], "kilograms", "grams", 1000, ""], ["🎃", "A pumpkin weighs", [4, 9], "kilograms", "grams", 1000, ""],
  ["🥔", "A bag of potatoes weighs", [2, 5], "kilograms", "grams", 1000, ""], ["🥤", "A big bottle of water holds", [2, 3], "liters", "milliliters", 1000, ""],
  ["🐠", "A small fish tank holds", [4, 9], "liters", "milliliters", 1000, ""], ["🥛", "A jug of milk holds", [2, 4], "liters", "milliliters", 1000, ""],
  ["🍲", "A pot of soup holds", [3, 8], "liters", "milliliters", 1000, ""], ["🐛", "A caterpillar is", [3, 9], "centimeters", "millimeters", 10, " long"],
  ["✏️", "A pencil is", [12, 19], "centimeters", "millimeters", 10, " long"], ["🔑", "A key is", [4, 8], "centimeters", "millimeters", 10, " long"],
  ["🚴", "A bike trail is", [2, 9], "kilometers", "meters", 1000, " long"], ["🏃", "A fun run is", [3, 5], "kilometers", "meters", 1000, " long"],
  ["🍎", "A bag of apples weighs", [2, 4], "kilograms", "grams", 1000, ""],
];
const V25MA9_ONE = { kilograms: "kilogram", liters: "liter", centimeters: "centimeter", kilometers: "kilometer", feet: "foot", yards: "yard", meters: "meter", hours: "hour", minutes: "minute", pounds: "pound" };
const V25MA9_DIFF = [
  ["🤸", (a, b, k, m) => `${a}'s jump rope is ${k} feet long. ${b}'s jump rope is ${m} inches long. How many inches longer is the longer rope?`, "feet", "inches", 12, [3, 8], "longer"],
  ["🎀", (a, b, k, m) => `${a}'s ribbon is ${k} meters long. ${b}'s ribbon is ${m} centimeters long. How many centimeters longer is the longer ribbon?`, "meters", "centimeters", 100, [1, 4], "longer"],
  ["🎬", (a, b, k, m) => `${a}'s movie is ${k} hours long. ${b}'s movie is ${m} minutes long. How many minutes longer is the longer movie?`, "hours", "minutes", 60, [1, 2], "longer"],
  ["🐶", (a, b, k, m) => `${a}'s puppy weighs ${k} kilograms. ${b}'s puppy weighs ${m} grams. How many grams heavier is the heavier puppy?`, "kilograms", "grams", 1000, [2, 6], "heavier"],
  ["🥛", (a, b, k, m) => `${a}'s jug holds ${k} liters. ${b}'s jug holds ${m} milliliters. How many milliliters more does the bigger jug hold?`, "liters", "milliliters", 1000, [2, 4], "more"],
  ["⏱️", (a, b, k, m) => `${a} held a plank for ${k} minutes. ${b} held a plank for ${m} seconds. How many seconds longer was the longer plank?`, "minutes", "seconds", 60, [1, 3], "longer"],
  ["🌳", (a, b, k, m) => `${a}'s kite string is ${k} yards long. ${b}'s kite string is ${m} feet long. How many feet longer is the longer string?`, "yards", "feet", 3, [5, 12], "longer"],
  ["🐱", (a, b, k, m) => `${a}'s cat weighs ${k} pounds. ${b}'s cat weighs ${m} ounces. How many ounces heavier is the heavier cat?`, "pounds", "ounces", 16, [5, 9], "heavier"],
  ["🥾", (a, b, k, m) => `${a} hiked ${k} kilometers. ${b} hiked ${m} meters. How many meters farther did the longer hike go?`, "kilometers", "meters", 1000, [2, 5], "longer"],
];
addBank(9, "math", "convert", 0.3, () => {
  const [n1, n2] = shuffle(KIDS).slice(0, 2);
  if (Math.random() < 0.6) {
    const ci = R(0, V25MA9_MET.length - 1), [e, subj, kr, big, small, n, tail] = V25MA9_MET[ci], k = R(kr[0], kr[1]), K = k * n, b1 = V25MA9_ONE[big], vis = row(bigEmo(e), note(`1 ${b1} = ${fmtN(n)} ${small}`));
    if (Math.random() < 0.55) {
      const { opts, r } = V25MA9_O(K, [
        n === 1000 ? [k * 100, `There are 1,000 ${small} in 1 ${b1}, not 100.`] : [k * 100, `There are 10 ${small} in 1 ${b1}, not 100.`],
        n === 1000 ? [k * 10, `There are 1,000 ${small} in 1 ${b1}, not 10.`] : [k * 1000, `There are 10 ${small} in 1 ${b1}, not 1,000.`],
        [k + n, `${fmtN(k + n)} adds. Each ${b1} is ${fmtN(n)} ${small}, so multiply.`],
        [K + n, `${fmtN(K + n)} would be ${k + 1} ${big}, not ${k}.`],
      ], null, fmtN, v => `${k} × ${fmtN(n)} = ${fmtN(K)}, not ${fmtN(v)}.`);
      return { q: `${subj} ${k} ${big}${tail}. How many ${small} is that?`, vis, opts, ans: fmtN(K), big: 1, why: `Bigger unit to smaller unit: multiply. ${k} × ${fmtN(n)} = ${fmtN(K)} ${small}.`, key: `v25cm${ci}:${k}`, v25: { r } };
    }
    const { opts, r } = V25MA9_O(k, [[K / 100 === k ? null : (Number.isInteger(K / 100) ? K / 100 : null), null], [k + 1, null], [k - 1, null], [k * 10, null], [k + 2, null]], () => R(1, 12), String, v => `${v} ${v === 1 ? b1 : big} would be ${fmtN(v * n)} ${small}, not ${fmtN(K)}.`);
    return { q: `${subj} ${fmtN(K)} ${small}${tail}. How many ${big} is that?`, vis, opts, ans: String(k), big: 1, why: `Smaller unit to bigger unit: divide. ${fmtN(K)} ÷ ${fmtN(n)} = ${k} ${big}.`, key: `v25cd${ci}:${k}`, v25: { r } };
  }
  const ci = R(0, V25MA9_DIFF.length - 1), [e, f, big, small, n, kr, adj] = V25MA9_DIFF[ci], k = R(kr[0], kr[1]), K = k * n, sp = Math.max(2, Math.floor(n / 2));
  let m = K + pick([-1, 1]) * R(1, sp); if (m <= 0 || m === K) m = K + R(1, sp);
  const ans = Math.abs(K - m), q = f(n1, n2, k, fmtN(m));
  const { opts, r } = V25MA9_O(ans, [
    [Math.abs(m - k), `${fmtN(Math.abs(m - k))} subtracts without changing ${k} ${big} into ${small} first.`],
    [K + m, `${fmtN(K + m)} adds them. To find how much ${adj}, subtract.`],
    [K, `${fmtN(K)} is just ${k} ${big} in ${small}. Now find the difference with ${fmtN(m)}.`],
    [m, `${fmtN(m)} is ${n2}'s amount, not the difference.`],
  ], () => ans + R(-5, 5), fmtN, v => `${k} ${big} = ${fmtN(K)} ${small}. The difference from ${fmtN(m)} is ${fmtN(ans)}, not ${fmtN(v)}.`);
  return { q, vis: row(bigEmo(e), note(`1 ${V25MA9_ONE[big]} = ${fmtN(n)} ${small}`)), opts, ans: fmtN(ans), big: 1, why: `${k} ${big} = ${k} × ${fmtN(n)} = ${fmtN(K)} ${small}. ${fmtN(Math.max(K, m))} − ${fmtN(Math.min(K, m))} = ${fmtN(ans)}.`, key: `v25cx${ci}:${n1}${n2}:${k}:${m}`, v25: { r } };
});
whyRule(9, "math", "convert", V25MA9_rule);

/* ---------- fracof: fraction of a group in real life, fraction of an hour/dollar/foot ---------- */
const V25MA9_FOF = [
  ["🚌", T => `A class has ${T} students.`, F => `${F} of them ride the bus to school.`, "How many students ride the bus?", "How many students do not ride the bus?"],
  ["🍅", T => `A garden has ${T} tomatoes.`, F => `${F} of them are ripe.`, "How many tomatoes are ripe?", "How many tomatoes are not ripe yet?"],
  ["📚", T => `A library shelf has ${T} books.`, F => `${F} of them are checked out.`, "How many books are checked out?", "How many books are still on the shelf?"],
  ["🏀", T => `A basketball team played ${T} games.`, F => `The team won ${F} of them.`, "How many games did the team win?", "How many games did the team not win?"],
  ["🎈", T => `There are ${T} balloons at a party.`, F => `${F} of them are red.`, "How many balloons are red?", "How many balloons are not red?"],
  ["🐔", T => `A farm has ${T} chickens.`, F => `${F} of them are brown.`, "How many chickens are brown?", "How many chickens are not brown?"],
  ["🌷", T => `A park worker planted ${T} tulips.`, F => `${F} of them have bloomed.`, "How many tulips have bloomed?", "How many tulips have not bloomed yet?"],
  ["🍪", T => `A tray has ${T} cookies.`, F => `${F} of them have sprinkles.`, "How many cookies have sprinkles?", "How many cookies have no sprinkles?"],
  ["🐟", T => `A pond has ${T} fish.`, F => `${F} of them are goldfish.`, "How many fish are goldfish?", "How many fish are not goldfish?"],
  ["🧦", T => `A drawer has ${T} socks.`, F => `${F} of them are striped.`, "How many socks are striped?", "How many socks are not striped?"],
  ["🎟️", T => `A school play has ${T} seats.`, F => `${F} of the seats are sold.`, "How many seats are sold?", "How many seats are still for sale?"],
  ["🍎", T => `An orchard worker picked ${T} apples.`, F => `${F} of them will go into pies.`, "How many apples will go into pies?", "How many apples will not go into pies?"],
  ["🖍️", T => `A box has ${T} crayons.`, F => `${F} of them are broken.`, "How many crayons are broken?", "How many crayons are not broken?"],
  ["🦋", T => `A butterfly garden has ${T} butterflies.`, F => `${F} of them are orange.`, "How many butterflies are orange?", "How many butterflies are not orange?"],
  ["🐕", T => `An animal shelter has ${T} dogs.`, F => `${F} of them are puppies.`, "How many dogs are puppies?", "How many dogs are not puppies?"],
  ["🚲", T => `${T} kids came to bike club.`, F => `${F} of them wore red helmets.`, "How many kids wore red helmets?", "How many kids did not wear red helmets?"],
];
const V25MA9_FU = [
  ["🎻", w => `${w} practiced violin for`, "of an hour", "minutes", 60], ["🚌", () => `The bus ride to the zoo took`, "of an hour", "minutes", 60],
  ["😴", w => `${w}'s baby brother napped for`, "of an hour", "minutes", 60], ["💵", w => `${w} spent`, "of a dollar", "cents", 100],
  ["🎀", w => `${w} cut a piece of ribbon`, "of a foot long", "inches", 12], ["📅", w => `${w}'s family traveled for`, "of a year", "months", 12],
  ["🐱", () => `A cat slept for`, "of a day", "hours", 24], ["🥚", w => `${w} used`, "of a dozen eggs", "eggs", 12],
  ["🌱", () => `A seedling grew`, "of a meter", "centimeters", 100], ["🧀", w => `${w} bought`, "of a pound of cheese", "ounces", 16],
  ["⛺", w => `${w} spent`, "of a week at camp", "days", 7],
];
addBank(9, "math", "fracof", 0.3, () => {
  const w = pick(KIDS);
  if (Math.random() < 0.6) {
    const ci = R(0, V25MA9_FOF.length - 1), [e, tf, ff, qP, qR] = V25MA9_FOF[ci], d = pick([2, 3, 4, 5, 6, 8, 10]), n = R(1, d - 1), g = R(2, 10), T = d * g, part = n * g, rest = T - part, rq = Math.random() < 0.45, ans = rq ? rest : part, FN = V25MA9_FNW[d][0];
    const miss = rq ? [[part, `${part} is the ${n}/${d} part. The question asks about the rest.`], [T, `${T} is all of them. Take away the ${n}/${d} part.`], [g, `${g} is just one ${FN} of ${T}.`]]
      : [[g, n > 1 ? `${g} is just one ${FN}. You need ${n} of those.` : null], [rest, `${rest} is the other part, ${d - n}/${d} of ${T}, not ${n}/${d}.`], [T, `${T} is all of them, not ${n}/${d} of them.`]];
    const { opts, r } = V25MA9_O(ans, miss, () => ans + R(-4, 4), null, v => rq ? `${T} − ${part} = ${rest}, not ${v}.` : `${T} ÷ ${d} = ${g}, and ${n} × ${g} = ${part}, not ${v}.`);
    const q = `${tf(T)} ${ff(frac(n, d))} ${rq ? qR : qP}`;
    return { q, say: V25MA9_say(q), vis: bigEmo(e), opts, ans: String(ans), big: 1, why: `${T} ÷ ${d} = ${g}, and ${n} × ${g} = ${part}.${rq ? ` ${T} − ${part} = ${rest}.` : ""}`, key: `v25fo${ci}:${n}/${d}:${T}:${rq ? 1 : 0}`, v25: { r } };
  }
  const ci = R(0, V25MA9_FU.length - 1), [e, pre, tail, small, tot] = V25MA9_FU[ci], ds = [2, 3, 4, 5, 6, 7, 8, 10, 12].filter(x => tot % x === 0 && x <= tot), d = pick(ds), n = R(1, d - 1), g = tot / d, ans = n * g;
  const { opts, r } = V25MA9_O(ans, [
    n > 1 ? [g, `${g} is just one ${V25MA9_FNW[d][0]}. You need ${n} of those.`] : null,
    [tot - ans, `${tot - ans} is the other ${d - n}/${d}, not ${n}/${d}.`],
    [tot, `${tot} is the whole thing, not ${n}/${d} of it.`],
    [n * d, `${n * d} multiplies the top and bottom. Divide ${tot} by ${d} first.`],
  ], () => ans + R(-5, 5), null, v => `${tot} ÷ ${d} = ${g}, and ${n} × ${g} = ${ans}, not ${v}.`);
  const q = `${pre(w)} ${frac(n, d)} ${tail}. How many ${small} is that?`;
  return { q, say: V25MA9_say(q), vis: row(bigEmo(e), note(`1 whole = ${tot} ${small}`)), opts, ans: String(ans), big: 1, why: `${tot} ÷ ${d} = ${g}, and ${n} × ${g} = ${ans} ${small}.`, key: `v25fu${ci}:${w}:${n}/${d}`, v25: { r } };
});
whyRule(9, "math", "fracof", V25MA9_rule);

/* ---------- mixednum: count pieces into wholes, mixed amounts back into pieces ---------- */
const V25MA9_MIXC = [
  { e: "🍕", d: [6, 8], p: "slices", a: (w, c, d, F) => `After a party, ${w} counts ${c} leftover pizza slices. Each pizza was cut into ${d} slices. How many pizzas is that?`, b: (w, M, d, F) => `${w} has ${M} pizzas left. Each pizza was cut into ${d} slices. How many slices is that?` },
  { e: "🏃", d: [2, 4, 8], p: "laps", a: (w, c, d, F) => `One lap around the track is ${F} of a mile. ${w} runs ${c} laps. How many miles is that?`, b: (w, M, d, F) => `${w} ran ${M} miles. One lap is ${F} of a mile. How many laps did ${w} run?` },
  { e: "🥣", d: [3, 4], p: "scoops", a: (w, c, d, F) => `${w} fills a bowl with ${c} scoops of flour. Each scoop is ${F} cup. How many cups is that?`, b: (w, M, d, F) => `A recipe needs ${M} cups of flour. ${w} uses a ${F} cup scoop. How many scoops does ${w} need?` },
  { e: "🍫", d: [6, 8, 10, 12], p: "pieces", a: (w, c, d, F) => `A chocolate bar has ${d} equal pieces. ${w} has ${c} pieces. How many bars is that?`, b: (w, M, d, F) => `${w} has ${M} chocolate bars. Each bar has ${d} pieces. How many pieces is that?` },
  { e: "🥪", d: [2], p: "halves", a: (w, c, d, F) => `Sandwiches are cut in half for a picnic. There are ${c} halves on a plate. How many sandwiches is that?`, b: (w, M, d, F) => `There are ${M} sandwiches on a plate, all cut in half. How many halves is that?` },
  { e: "🍊", d: [4, 6, 8], p: "wedges", a: (w, c, d, F) => `Each orange is cut into ${d} equal wedges. The team ate ${c} wedges. How many oranges is that?`, b: (w, M, d, F) => `The team ate ${M} oranges. Each orange was cut into ${d} wedges. How many wedges is that?` },
  { e: "🥧", d: [6, 8], p: "slices", a: (w, c, d, F) => `Each pie is cut into ${d} slices. ${w}'s family ate ${c} slices this week. How many pies is that?`, b: (w, M, d, F) => `${w}'s family ate ${M} pies. Each pie had ${d} slices. How many slices is that?` },
  { e: "🎂", d: [8, 10, 12], p: "pieces", a: (w, c, d, F) => `Each cake is cut into ${d} pieces. The class ate ${c} pieces. How many cakes is that?`, b: (w, M, d, F) => `The class ate ${M} cakes. Each cake had ${d} pieces. How many pieces is that?` },
  { e: "⏱️", d: [4], p: "quarter hours", a: (w, c, d, F) => `${w} read for ${c} quarter hours this week. How many hours is that?`, b: (w, M, d, F) => `${w} read for ${M} hours. How many quarter hours is that?` },
  { e: "🍞", d: [8, 10, 12], p: "slices", a: (w, c, d, F) => `A loaf of bread has ${d} slices. ${w}'s family used ${c} slices. How many loaves is that?`, b: (w, M, d, F) => `${w}'s family used ${M} loaves of bread. Each loaf has ${d} slices. How many slices is that?` },
  { e: "🥛", d: [3, 4, 5], p: "glasses", a: (w, c, d, F) => `Each glass holds ${F} of a liter of milk. ${w} pours ${c} glasses. How many liters is that?`, b: (w, M, d, F) => `A jug holds ${M} liters of milk. Each glass holds ${F} of a liter. How many glasses can be filled?` },
  { e: "🎀", d: [3, 4, 8], p: "pieces", a: (w, c, d, F) => `Each piece of ribbon is ${F} of a yard long. ${w} has ${c} pieces. How many yards is that?`, b: (w, M, d, F) => `${w} has ${M} yards of ribbon. ${w} cuts it into pieces ${F} of a yard long. How many pieces is that?` },
  { e: "🍉", d: [6, 8], p: "slices", a: (w, c, d, F) => `Each watermelon is cut into ${d} slices. The picnic guests ate ${c} slices. How many watermelons is that?`, b: (w, M, d, F) => `The picnic guests ate ${M} watermelons. Each was cut into ${d} slices. How many slices is that?` },
  { e: "🥚", d: [12], p: "eggs", a: (w, c, d, F) => `${w} has ${c} eggs. A full carton holds 12 eggs. How many cartons of eggs is that?`, b: (w, M, d, F) => `${w} has ${M} cartons of eggs. A full carton holds 12. How many eggs is that?` },
  { e: "🧀", d: [4, 6], p: "wedges", a: (w, c, d, F) => `Each wheel of cheese is cut into ${d} wedges. The shop sold ${c} wedges. How many wheels is that?`, b: (w, M, d, F) => `The shop sold ${M} wheels of cheese. Each was cut into ${d} wedges. How many wedges is that?` },
];
addBank(9, "math", "mixednum", 0.3, () => {
  const ci = R(0, V25MA9_MIXC.length - 1), c = V25MA9_MIXC[ci], d = pick(c.d), w0 = pick(KIDS), MX = (W, N) => `${W} ${frac(N, d)}`;
  let cnt = R(d + 1, 4 * d - 1); while (cnt % d === 0) cnt = R(d + 1, 4 * d - 1);
  const W = Math.floor(cnt / d), N = cnt % d, F = frac(1, d);
  if (Math.random() < 0.55) {
    const ans = MX(W, N), out = [ans], r = {};
    const add = (a, b, why) => { if (out.length >= 4 || a < 0 || b < 1 || b >= d) return; const s = a ? MX(a, b) : frac(b, d); if (out.includes(s)) return; out.push(s); r[s] = why || `${a ? `${a} ${b}/${d}` : `${b}/${d}`} would be ${a * d + b} ${c.p}, not ${cnt}.`; };
    add(W + 1, N); if (d - N !== N) add(W, d - N); if (W < d && N >= 1) add(N, W); add(W - 1, N); add(W, N + 1); add(W, N - 1); add(W + 1, N - 1);
    const q = c.a(w0, cnt, d, F);
    return { q, say: V25MA9_say(q), vis: bigEmo(c.e), opts: shuffle(out), ans, sayAns: `${W} and ${V25MA9_fw(N, d)}`, big: 1, why: `${cnt} ÷ ${d} = ${W} R ${N}. That is ${V25MA9_pl(W, "whole")} and ${N}/${d} more: ${W} ${N}/${d}.`, key: `v25xa${ci}:${w0}:${cnt}/${d}`, v25: { r } };
  }
  const M = MX(W, N), q = c.b(w0, M, d, F);
  const { opts, r } = V25MA9_O(cnt, [
    [W + N, `${W + N} adds ${W} + ${N}. Each whole is ${d} ${c.p}, so multiply first.`],
    [W * d, `${W * d} counts only the ${V25MA9_pl(W, "whole")}. Add the ${N} extra.`],
    [cnt + d, `${cnt + d} would be ${W + 1} ${N}/${d}, one whole too many.`],
    [W * N, `${W * N} multiplies ${W} × ${N}. Multiply ${W} × ${d}, then add ${N}.`],
  ], () => cnt + R(-3, 3), null, v => `${W} × ${d} + ${N} = ${cnt}, not ${v}.`);
  return { q, say: V25MA9_say(q), vis: bigEmo(c.e), opts, ans: String(cnt), big: 1, why: `${W} × ${d} = ${W * d}, plus ${N} more is ${cnt} ${c.p}.`, key: `v25xb${ci}:${w0}:${cnt}/${d}`, v25: { r } };
});
whyRule(9, "math", "mixednum", V25MA9_rule);

/* ---------- volume: real boxes, tanks and beds; two boxes together ---------- */
const V25MA9_VOL = [
  ["🏖️", "A sandbox is", "deep", "How many cubic feet of sand fill it?", [4, 8], [3, 6], [1, 2], "ft"],
  ["🐠", "A fish tank is", "tall", "How many cubic inches of water fill it?", [10, 12], [4, 6], [5, 8], "in"],
  ["🧸", "A toy chest is", "tall", "How many cubic feet of space are inside?", [3, 5], [2, 3], [2, 3], "ft"],
  ["🌼", "A raised garden bed is", "deep", "How many cubic feet of soil fill it?", [4, 8], [2, 4], [1, 2], "ft"],
  ["📦", "A shipping box is", "tall", "What is its volume in cubic inches?", [6, 12], [4, 6], [3, 6], "in"],
  ["🧊", "A freezer is", "tall", "How many cubic feet of space are inside?", [3, 5], [2, 3], [2, 4], "ft"],
  ["🗄️", "A drawer is", "deep", "What is its volume in cubic inches?", [10, 15], [6, 9], [3, 5], "in"],
  ["🚚", "The back of a moving truck is", "tall", "How many cubic feet of space are inside?", [10, 14], [6, 8], [6, 8], "ft"],
  ["🏊", "A kiddie pool shaped like a box is", "deep", "How many cubic feet of water fill it?", [5, 8], [4, 6], [1, 2], "ft"],
  ["🐦", "A birdhouse is", "tall", "What is its volume in cubic inches?", [5, 8], [4, 6], [6, 9], "in"],
  ["🎁", "A gift box is", "tall", "What is its volume in cubic inches?", [6, 10], [4, 6], [2, 4], "in"],
  ["🐹", "A hamster cage is", "tall", "How many cubic inches of space are inside?", [12, 16], [6, 8], [5, 6], "in"],
  ["🍞", "A bread pan is", "deep", "How many cubic inches of batter fill it?", [8, 9], [4, 5], [2, 3], "in"],
  ["🚪", "A closet is", "tall", "How many cubic feet of space are inside?", [4, 6], [2, 3], [7, 8], "ft"],
  ["🐕", "A dog crate is", "tall", "How many cubic feet of space are inside?", [2, 4], [2, 3], [2, 3], "ft"],
];
const V25MA9_LEN = { ft: ["foot", "feet"], in: ["inch", "inches"] };
const V25MA9_VOL2 = [["🌼", "Two raised garden beds are filled with soil.", "ft", "cubic feet of soil"], ["🏖️", "A playground has two sandboxes.", "ft", "cubic feet of sand"], ["🐠", "A pet store has two fish tanks.", "in", "cubic inches of water"], ["📦", "Two boxes are packed into a moving truck.", "ft", "cubic feet of space"], ["🧊", "A family has two coolers.", "in", "cubic inches of space"], ["🧸", "A bedroom has two toy chests.", "ft", "cubic feet of space"]];
addBank(9, "math", "volume", 0.3, () => {
  if (Math.random() < 0.6) {
    const ci = R(0, V25MA9_VOL.length - 1), [e, subj, hw, Qs, lr, wr, hr, u] = V25MA9_VOL[ci], L = R(lr[0], lr[1]), W = R(wr[0], wr[1]), H = R(hr[0], hr[1]), V = L * W * H, U = x => V25MA9_pl(x, ...V25MA9_LEN[u]), lw = L * W;
    const { opts, r } = V25MA9_O(V, [
      [L + W + H, `${L + W + H} adds the sides. Volume multiplies: ${L} × ${W} × ${H}.`],
      H > 1 ? [lw, `${lw} is just one layer, ${L} × ${W}. There are ${H} layers.`] : null,
      [lw * (H + 1), `${lw * (H + 1)} would be ${U(H + 1)} ${hw}, but it is ${U(H)} ${hw}.`],
      H > 1 ? [lw * (H - 1), `${lw * (H - 1)} would be ${U(H - 1)} ${hw}, but it is ${U(H)} ${hw}.`] : null,
      [V + 10, null],
    ], () => V + R(-12, 12), null, v => `${L} × ${W} × ${H} = ${V}, not ${v}.`);
    const q = `${subj} ${U(L)} long, ${U(W)} wide and ${U(H)} ${hw}. ${Qs}`;
    return { q, vis: bigEmo(e), opts, ans: String(V), big: 1, why: `Volume = length × width × height: ${L} × ${W} = ${lw}, and ${lw} × ${H} = ${V}.`, key: `v25v${ci}:${L}x${W}x${H}`, v25: { r } };
  }
  const ci = R(0, V25MA9_VOL2.length - 1), [e, intro, u, what] = V25MA9_VOL2[ci], U = x => V25MA9_pl(x, ...V25MA9_LEN[u]);
  const A = [R(2, 6), R(2, 4), R(1, 3)], B = [R(2, 6), R(2, 4), R(1, 3)], va = A[0] * A[1] * A[2], vb = B[0] * B[1] * B[2], T = va + vb;
  if (va === vb) return null;
  const { opts, r } = V25MA9_O(T, [
    [va, `${va} is only the first one. Add the second one's ${vb}.`],
    [vb, `${vb} is only the second one. Add the first one's ${va}.`],
    [A[0] + A[1] + A[2] + B[0] + B[1] + B[2], `That adds all the sides. Find each volume, then add.`],
    [va * vb > 999 ? null : va * vb, `${va * vb} multiplies the two volumes. To put them together, add.`],
  ], () => T + R(-6, 6), null, v => `${va} + ${vb} = ${T}, not ${v}.`);
  const q = `${intro} One is ${U(A[0])} by ${U(A[1])} by ${U(A[2])}. The other is ${U(B[0])} by ${U(B[1])} by ${U(B[2])}. How many ${what} do they hold in all?`;
  return { q, vis: row(cuboid(...A), cuboid(...B)), opts, ans: String(T), big: 1, why: `${A.join(" × ")} = ${va} and ${B.join(" × ")} = ${vb}. ${va} + ${vb} = ${T}.`, key: `v25v2${ci}:${A.join("")}:${B.join("")}`, v25: { r } };
});
whyRule(9, "math", "volume", V25MA9_rule);

/* ---------- addfrac: new add/subtract stories, what's left of a whole, adding mixed numbers ---------- */
const V25MA9_FST = [
  ["🌧️", "add", [4, 8, 10], (a, b, A, B) => `It rained ${A} of an inch on Monday and ${B} of an inch on Tuesday. How much rain fell in all?`],
  ["🥤", "add", [4, 6, 8], (a, b, A, B) => `${a} drank ${A} of a bottle of juice in the morning and ${B} of it at lunch. How much of the bottle did ${a} drink?`],
  ["🧩", "add", [5, 6, 8, 10], (a, b, A, B) => `${a} finished ${A} of a puzzle on Saturday and ${B} more on Sunday. How much of the puzzle is done?`],
  ["📖", "add", [5, 6, 8, 10, 12], (a, b, A, B) => `${a} read ${A} of a book before dinner and ${B} of it after dinner. How much of the book did ${a} read?`],
  ["🌱", "add", [4, 5, 6, 8], (a, b, A, B) => `${a} planted ${A} of the garden and ${b} planted ${B} of it. How much of the garden is planted?`],
  ["🏊", "add", [4, 5, 8, 10], (a, b, A, B) => `${a} swam ${A} of a mile, rested, then swam ${B} of a mile more. How far did ${a} swim?`],
  ["🎀", "add", [3, 4, 6, 8], (a, b, A, B) => `${a} used ${A} of a yard of ribbon for one gift and ${B} of a yard for another. How much ribbon did ${a} use?`],
  ["🧹", "add", [5, 6, 8, 10], (a, b, A, B) => `${a} cleaned ${A} of the classroom and ${b} cleaned ${B} of it. How much of the classroom is clean?`],
  ["🥛", "sub", [4, 6, 8, 10], (a, b, A, B) => `A carton is ${A} full of milk. ${a} pours out ${B} of the carton for cereal. How full is the carton now?`],
  ["🥧", "sub", [6, 8, 10, 12], (a, b, A, B) => `${A} of a pie is left. ${a} eats ${B} of the pie. How much of the pie is left now?`],
  ["🎨", "sub", [4, 5, 6, 8], (a, b, A, B) => `A paint can is ${A} full. ${a} uses ${B} of the can for a birdhouse. How full is the can now?`],
  ["🔋", "sub", [5, 8, 10], (a, b, A, B) => `A tablet battery is ${A} charged. A movie uses ${B} of the battery. How charged is the battery now?`],
  ["✂️", "sub", [4, 8, 10], (a, b, A, B) => `A rope is ${A} of a meter long. ${a} cuts off ${B} of a meter. How long is the rope now?`],
  ["⏱️", "sub", [4, 6, 12], (a, b, A, B) => `${a} has ${A} of an hour of free time. ${a} spends ${B} of an hour drawing. How much free time is left?`],
  ["⛽", "sub", [4, 8], (a, b, A, B) => `A car's gas tank is ${A} full. A trip uses ${B} of the tank. How full is the tank now?`],
];
const V25MA9_FLEFT = [
  ["🎨", A => `has painted ${A} of a fence.`, "What fraction of the fence is still left to paint?"],
  ["🖍️", A => `has colored ${A} of a poster.`, "What fraction of the poster is left to color?"],
  ["🧶", A => `has knitted ${A} of a blanket.`, "What fraction of the blanket is left to knit?"],
  ["🎂", A => `has frosted ${A} of a cake.`, "What fraction of the cake still needs frosting?"],
  ["✏️", A => `has finished ${A} of the homework.`, "What fraction of the homework is left?"],
  ["🌱", A => `has weeded ${A} of the garden.`, "What fraction of the garden is left to weed?"],
  ["🧩", A => `has done ${A} of a puzzle.`, "What fraction of the puzzle is left?"],
  ["🚶", A => `has walked ${A} of the way to school.`, "What fraction of the way is left?"],
  ["🚜", A => `has mowed ${A} of the lawn with Grandpa.`, "What fraction of the lawn is not mowed yet?"],
];
const V25MA9_FMIX = [
  ["🥾", (a, M1, M2) => `${a} hiked ${M1} miles in the morning and ${M2} miles in the afternoon. How far did ${a} hike in all?`],
  ["🎀", (a, M1, M2) => `${a} used ${M1} yards of ribbon on one gift and ${M2} yards on another. How much ribbon did ${a} use?`],
  ["🍞", (a, M1, M2) => `A baker used ${M1} cups of flour for bread and ${M2} cups for muffins. How much flour was used in all?`],
  ["🚴", (a, M1, M2) => `${a} biked ${M1} miles on Saturday and ${M2} miles on Sunday. How far did ${a} bike in all?`],
  ["🐕", (a, M1, M2) => `A puppy ate ${M1} cups of food on Monday and ${M2} cups on Tuesday. How much food did it eat in all?`],
  ["🌧️", (a, M1, M2) => `It rained ${M1} inches in April and ${M2} inches in May. How much rain fell in all?`],
];
addBank(9, "math", "addfrac", 0.3, () => {
  const [n1, n2] = shuffle(KIDS).slice(0, 2), k = R(0, 9), FN = d => V25MA9_FNW[d][1];
  if (k < 5) {
    const ci = R(0, V25MA9_FST.length - 1), [e, t, ds, f] = V25MA9_FST[ci], d = pick(ds);
    let a, b; if (t === "add") { a = R(1, d - 2); b = R(1, d - 1 - a); } else { a = R(2, d - 1); b = R(1, a - 1); }
    const s = t === "add" ? a + b : a - b, ans = frac(s, d), out = [ans], r = {};
    const add = (x, y, why) => { if (out.length >= 4 || x < 1 || y < 1 || x * d === s * y) return; const o = frac(x, y); if (out.includes(o)) return; out.push(o); r[o] = why; };
    if (t === "add") {
      add(a + b, 2 * d, `${a + b}/${2 * d} adds the bottoms too. The pieces are still ${FN(d)}, so keep ${d}.`);
      add(Math.abs(a - b), d, `${Math.abs(a - b)}/${d} is what you get by taking away, but this needs adding.`);
      [s + 1, s - 1, s + 2].forEach(x => add(x, d, `${a} + ${b} = ${s}, not ${x}, so it isn't ${x}/${d}.`));
    } else {
      add(a + b, d, `${a + b}/${d} adds them, but this needs taking away.`);
      add(b, d, `${b}/${d} is the part taken away, not the part left.`);
      add(s, 2 * d, `${s}/${2 * d} changes the bottom, but the pieces are still ${FN(d)}.`);
      [s + 1, s - 1, s + 2].forEach(x => add(x, d, `${a} − ${b} = ${s}, not ${x}, so it isn't ${x}/${d}.`));
    }
    const q = f(n1, n2, frac(a, d), frac(b, d));
    return { q, say: V25MA9_say(q), vis: bigEmo(e), opts: shuffle(out), ans, big: 1, why: `${t === "add" ? `Add the tops: ${a} + ${b}` : `Take away the tops: ${a} − ${b}`} = ${s}. The pieces are still ${FN(d)}, so the answer is ${s}/${d}.`, key: `v25fa${ci}:${n1}${n2}:${a}/${b}/${d}`, v25: { r } };
  }
  if (k < 8) {
    const ci = R(0, V25MA9_FLEFT.length - 1), [e, f, Qs] = V25MA9_FLEFT[ci], d = pick([3, 4, 5, 6, 8, 10, 12]), a = R(1, d - 1), m = d - a, ans = frac(m, d), out = [ans], r = {};
    const add = (x, y, why) => { if (out.length >= 4 || x < 1 || y < 1 || x * d === m * y) return; const o = frac(x, y); if (out.includes(o)) return; out.push(o); r[o] = why; };
    add(a, d, `${a}/${d} is the part already done, not the part left.`);
    add(m, 2 * d, `${m}/${2 * d} changes the bottom. The parts are still ${FN(d)}.`);
    [m + 1, m - 1, m + 2, m - 2].forEach(x => add(x, d, `${a}/${d} + ${x}/${d} = ${a + x}/${d}, which is not 1 whole (${d}/${d}).`));
    const q = `${n1} ${f(frac(a, d))} ${Qs}`;
    return { q, say: V25MA9_say(q), vis: row(bigEmo(e), bar(d, a, 260, 40, "#1FAF6E")), opts: shuffle(out), ans, big: 1, why: `One whole is ${d}/${d}. ${d} − ${a} = ${m}, so ${m}/${d} is left.`, key: `v25fl${ci}:${n1}:${a}/${d}`, v25: { r } };
  }
  const ci = R(0, V25MA9_FMIX.length - 1), [e, f] = V25MA9_FMIX[ci], d = pick([3, 4, 5, 6, 8, 10]), w1 = R(1, 3), w2 = R(1, 3), a = R(1, d - 2), b = R(1, d - 1 - a), W = w1 + w2, N = a + b;
  const MX = (x, y, z) => `${x} ${frac(y, z)}`, ans = MX(W, N, d), out = [ans], r = {};
  const add = (x, y, z, why) => { if (out.length >= 4 || y < 1 || y >= z) return; const o = MX(x, y, z); if (out.includes(o)) return; out.push(o); r[o] = why; };
  add(W, N, 2 * d, `${W} ${N}/${2 * d} adds the bottoms. The pieces are still ${FN(d)}, so keep ${d}.`);
  add(W + 1, N, d, `${w1} + ${w2} = ${W} wholes, not ${W + 1}.`);
  add(W - 1 > 0 ? W - 1 : W + 2, N, d, `${w1} + ${w2} = ${W} wholes, not ${W - 1 > 0 ? W - 1 : W + 2}.`);
  [N + 1, N - 1, Math.abs(a - b)].forEach(x => add(W, x, d, `${a}/${d} + ${b}/${d} = ${N}/${d}, not ${x}/${d}.`));
  const q = f(n1, MX(w1, a, d), MX(w2, b, d));
  return { q, say: V25MA9_say(q), vis: bigEmo(e), opts: shuffle(out), ans, sayAns: `${W} and ${V25MA9_fw(N, d)}`, big: 1, why: `Add the wholes: ${w1} + ${w2} = ${W}. Add the parts: ${a}/${d} + ${b}/${d} = ${N}/${d}. So ${W} ${N}/${d}.`, key: `v25fm${ci}:${n1}:${w1} ${a}+${w2} ${b}/${d}`, v25: { r } };
});
whyRule(9, "math", "addfrac", V25MA9_rule);

/* ---------- roundbig: estimate sums and differences, least/greatest number that rounds to a value ---------- */
const V25MA9_EST = [
  ["📚", "+", (A, B) => `A school library has ${A} storybooks and ${B} fact books. About how many books is that in all?`],
  ["🦁", "+", (A, B) => `A zoo had ${A} visitors on Saturday and ${B} visitors on Sunday. About how many visitors came in all?`],
  ["🍎", "+", (A, B) => `An orchard picked ${A} apples in September and ${B} apples in October. About how many apples is that in all?`],
  ["🏘️", "+", (A, B) => `One town has ${A} people and the town next to it has ${B} people. About how many people live in the two towns?`],
  ["🧁", "+", (A, B) => `A bakery sold ${A} muffins in May and ${B} muffins in June. About how many muffins did it sell?`],
  ["✈️", "+", (A, B) => `A pilot flew ${A} miles on one trip and ${B} miles on the next. About how many miles is that?`],
  ["♻️", "+", (A, B) => `A recycling drive collected ${A} cans and ${B} bottles. About how many items is that in all?`],
  ["🎟️", "+", (A, B) => `A fair sold ${A} ride tickets on Friday and ${B} on Saturday. About how many tickets is that?`],
  ["🏟️", "−", (A, B) => `A stadium has ${A} seats. ${B} seats are filled. About how many seats are empty?`],
  ["📖", "−", (A, B) => `A book fair had ${A} books. It sold ${B} of them. About how many books are left?`],
  ["💵", "−", (A, B) => `A school wants to raise $${A}. It has raised $${B} so far. About how much more does it need?`],
  ["⛰️", "−", (A, B) => `A mountain trail climbs ${A} feet. A hiker has climbed ${B} feet. About how many feet are left?`],
  ["🎭", "−", (A, B) => `A theater sold ${A} tickets last year and ${B} tickets this year. About how many more were sold last year?`],
  ["🌳", "−", (A, B) => `A park has ${A} trees. ${B} of them are oak trees. About how many trees are not oaks?`],
  ["🐦", "−", (A, B) => `Bird watchers counted ${A} birds in spring and ${B} birds in winter. About how many more birds were counted in spring?`],
];
const V25MA9_RT = [
  ["🎡", "A news report says about {T} people came to the fair.", "people"], ["🏟️", "A sign says about {T} fans watched the big game.", "fans"],
  ["📚", "A poster says the book fair sold about {T} books.", "books"], ["🥫", "The principal says the school collected about {T} cans.", "cans"],
  ["🏃", "A newspaper says about {T} runners finished the city race.", "runners"], ["🐦", "Bird watchers say they counted about {T} birds.", "birds"],
  ["🎃", "A farm says it sold about {T} pumpkins this fall.", "pumpkins"], ["🏛️", "A museum says about {T} visitors came last month.", "visitors"],
];
const V25MA9_rnd = (n, u) => Math.floor((n + u / 2) / u) * u;
addBank(9, "math", "roundbig", 0.3, () => {
  if (Math.random() < 0.6) {
    const ci = R(0, V25MA9_EST.length - 1), [e, op, f] = V25MA9_EST[ci], u = pick([100, 1000, 1000]), lo = u === 100 ? 150 : 1200, hi = u === 100 ? 2999 : 9800;
    let A, B, g = 0; do { A = R(lo, hi); B = R(lo, hi); if (op === "−" && A < B) [A, B] = [B, A]; g++; } while (g < 50 && (A % u === 0 || B % u === 0 || (op === "−" && V25MA9_rnd(A, u) - V25MA9_rnd(B, u) <= 0)));
    if (A % u === 0 || B % u === 0) return null;
    const rA = V25MA9_rnd(A, u), rB = V25MA9_rnd(B, u), oA = rA === Math.floor(A / u) * u ? rA + u : rA - u, oB = rB === Math.floor(B / u) * u ? rB + u : rB - u, P = V25MA9_UNW[u];
    const calc = (x, y) => op === "+" ? x + y : x - y, ans = calc(rA, rB), oU = u === 100 ? 1000 : 100;
    const { opts, r } = V25MA9_O(ans, [
      [calc(A, B), `${fmtN(calc(A, B))} is the exact answer. Round each number first, then ${op === "+" ? "add" : "subtract"}.`],
      [calc(oA, rB), `${fmtN(A)} rounds to ${fmtN(rA)}, not ${fmtN(oA)}.`],
      [calc(rA, oB), `${fmtN(B)} rounds to ${fmtN(rB)}, not ${fmtN(oB)}.`],
      [calc(V25MA9_rnd(A, oU), V25MA9_rnd(B, oU)), `That rounds to the nearest ${V25MA9_UNW[oU]}, not the nearest ${P}.`],
    ], () => ans + u * R(-2, 2), fmtN, v => `${fmtN(rA)} ${op} ${fmtN(rB)} = ${fmtN(ans)}, not ${fmtN(v)}.`);
    const money = /\$/.test(f(1, 1)), q = f(fmtN(A), fmtN(B));
    return { q, vis: row(bigEmo(e), note(`Round each number to the nearest <b>${P}</b>, then ${op === "+" ? "add" : "subtract"}.`)), opts: money ? opts.map(o => "$" + o) : opts, ans: (money ? "$" : "") + fmtN(ans), big: 1, why: `${fmtN(A)} rounds to ${fmtN(rA)} and ${fmtN(B)} rounds to ${fmtN(rB)}. ${fmtN(rA)} ${op} ${fmtN(rB)} = ${fmtN(ans)}.`, key: `v25re${ci}:${A}:${B}:${u}`, v25: { r: money ? Object.fromEntries(Object.entries(r).map(([k, v]) => ["$" + k, v])) : r } };
  }
  const ci = R(0, V25MA9_RT.length - 1), [e, txt, nn] = V25MA9_RT[ci], u = pick([100, 1000, 10000]), T = u * R(2, 9) * (u === 100 ? R(1, 9) : 1), least = Math.random() < 0.5, h = u / 2, P = V25MA9_UNW[u];
  const ans = least ? T - h : T + h - 1;
  const { opts, r } = V25MA9_O(ans, least ? [[T - h - 1, null], [T - u, null], [T - h + 1, null], [T, null]] : [[T + h, null], [T + u, null], [T + h - 2, null], [T, null]], null, fmtN,
    v => V25MA9_rnd(v, u) !== T ? `${fmtN(v)} rounds to ${fmtN(V25MA9_rnd(v, u))}, not ${fmtN(T)}.` : `${fmtN(v)} rounds to ${fmtN(T)}, but ${fmtN(ans)} is ${least ? "smaller" : "bigger"} and also rounds to ${fmtN(T)}.`);
  const q = `${txt.replace("{T}", fmtN(T))} The number was rounded to the nearest ${P}. What is the <b>${least ? "least" : "greatest"}</b> number of ${nn} it could be?`;
  return { q, say: V25MA9_say(q), vis: bigEmo(e), opts, ans: fmtN(ans), big: 1, why: least ? `Numbers from ${fmtN(T - h)} up round to ${fmtN(T)}. ${fmtN(T - h - 1)} would round down to ${fmtN(T - u)}.` : `Numbers up to ${fmtN(T + h - 1)} round to ${fmtN(T)}. ${fmtN(T + h)} would round up to ${fmtN(T + u)}.`, key: `v25rl${ci}:${T}:${u}:${least ? 1 : 0}`, v25: { r } };
});
whyRule(9, "math", "roundbig", V25MA9_rule);

/* ---------- multistep: new everyday stories, each with named mistakes ---------- */
const V25MA9_MS = [
  w => { const k = R(18, 28), ps = R(3, 6), t = R(3, 5), pa = R(7, 9), a = k * ps + t * pa; return { e: "🎟️", pre: "$", q: `${k} students and ${t} grown-ups go to a science museum. Student tickets cost $${ps} each and grown-up tickets cost $${pa} each. How much do all the tickets cost?`, a, why: `${k} × $${ps} = $${k * ps}. ${t} × $${pa} = $${t * pa}. $${k * ps} + $${t * pa} = $${a}.`, m: [[k * ps, `$${k * ps} is just the student tickets. Add the grown-ups' $${t * pa}.`], [(k + t) * ps, `That charges everyone the student price. Grown-up tickets cost $${pa}.`], [k * ps + pa, `That pays for only 1 grown-up. There are ${t}.`]] }; },
  w => { const c = R(12, 30), pc = R(2, 4), k = R(10, 25), a = c * pc + k; return { e: "🧁", pre: "$", q: `At a bake sale, ${w} sells ${c} cupcakes for $${pc} each and ${k} cookies for $1 each. How much money does ${w} make?`, a, why: `${c} × $${pc} = $${c * pc}. ${k} × $1 = $${k}. $${c * pc} + $${k} = $${a}.`, m: [[c * pc, `Don't forget the ${k} cookies at $1 each.`], [c + pc + k, `${c} cupcakes at $${pc} each means multiply: ${c} × ${pc}.`], [(c + k) * pc, `Cookies cost $1 each, not $${pc}.`]] }; },
  w => { const r = R(4, 9), p = R(12, 25), e = R(5, 30), a = r * p - e; return { e: "🥕", q: `A garden has ${r} rows with ${p} carrots in each row. Rabbits eat ${e} carrots. How many carrots are left?`, a, why: `${r} × ${p} = ${r * p}. ${r * p} − ${e} = ${a}.`, m: [[r * p, `${r * p} is before the rabbits ate any.`], [r * p + e, `The rabbits took carrots away, so subtract ${e}.`], [r + p - e, `${r} rows of ${p} means multiply: ${r} × ${p}.`]] }; },
  w => { const B = R(200, 600), s = R(3, 8), k = R(12, 25), L = R(20, 90), a = B + s * k - L; return { e: "📚", q: `A library has ${B} books. It gets ${s} new boxes with ${k} books in each box. Then ${L} books are checked out. How many books are on the shelves now?`, a, why: `${s} × ${k} = ${s * k}. ${B} + ${s * k} = ${B + s * k}. ${B + s * k} − ${L} = ${a}.`, m: [[B + s * k, `Don't forget the ${L} books that were checked out.`], [B + s + k - L, `${s} boxes of ${k} means multiply: ${s} × ${k}.`], [B + s * k + L, `Checked-out books leave the shelves, so subtract ${L}.`]] }; },
  w => { let n, e, t; do { n = R(9, 20); e = R(2, 3); t = n * e; } while (t % 8 === 0); const a = Math.ceil(t / 8), f = Math.floor(t / 8); return { e: "🍕", q: `${n} kids are at a party. Each kid eats ${e} slices of pizza. Each pizza has 8 slices. How many pizzas are needed?`, a, why: `${n} × ${e} = ${t} slices. ${t} ÷ 8 = ${f} R ${t % 8}, so ${a} pizzas are needed.`, m: [[f, `${f} pizzas give only ${f * 8} slices, but the kids need ${t}.`], [t, `${t} is the number of slices, not pizzas.`]] }; },
  w => { const G = 50 * R(6, 12), a1 = R(80, 200), a2 = R(60, 180), a = G - a1 - a2; if (a <= 0) return null; return { e: "💵", pre: "$", q: `A class wants to raise $${G} for a field trip. They raised $${a1} in week 1 and $${a2} in week 2. How much more do they need?`, a, why: `$${a1} + $${a2} = $${a1 + a2}. $${G} − $${a1 + a2} = $${a}.`, m: [[G - a1, `That takes away only week 1. Take away week 2 too.`], [a1 + a2, `$${a1 + a2} is what they raised, not what they still need.`], [G - a2, `That takes away only week 2. Take away week 1 too.`]] }; },
  w => { const L = R(2, 8), d = R(3, 5), a = 25 * L * d; return { e: "🏊", unit: " m", q: `A pool is 25 meters long. ${w} swims ${L} lengths every day for ${d} days. How many meters does ${w} swim?`, a, why: `25 × ${L} = ${25 * L} meters a day. ${25 * L} × ${d} = ${a}.`, m: [[25 * L, `That's only 1 day. Multiply by ${d} days.`], [L * d, `${L * d} is the number of lengths. Each length is 25 meters.`]] }; },
  w => { const b = R(3, 6), k = R(6, 10), u = R(5, 8), p = R(2, 3), a = b * k - u * p; if (a <= 0) return null; return { e: "🥧", q: `${w} buys ${b} bags of apples with ${k} apples in each bag. Each pie needs ${u} apples. ${w} bakes ${p} pies. How many apples are left?`, a, why: `${b} × ${k} = ${b * k} apples. ${p} × ${u} = ${u * p} used. ${b * k} − ${u * p} = ${a}.`, m: [[b * k, `${b * k} is all the apples before baking.`], [b * k - p, `Each pie uses ${u} apples, so ${p} pies use ${u * p}.`], [b * k - u, `That bakes only 1 pie. ${w} bakes ${p}.`]] }; },
  w => { const t = R(2, 6), f = R(1, 4), a = 7 * t + 3 * f; return { e: "🏈", unit: " points", q: `A football team scores ${t} touchdowns worth 7 points each and ${f} field goals worth 3 points each. How many points does the team score?`, a, why: `${t} × 7 = ${7 * t}. ${f} × 3 = ${3 * f}. ${7 * t} + ${3 * f} = ${a}.`, m: [[7 * t, `Add the field goals too: ${f} × 3 = ${3 * f}.`], [t + f, `${t + f} is the number of scores, not the points.`], [7 * (t + f), `Field goals are worth 3 points, not 7.`]] }; },
  w => { const t = R(3, 9), h = R(1, 5), a = 2 * t + 3 * h; return { e: "🏀", unit: " points", q: `In a game, ${w} makes ${t} two-point shots and ${h} three-point shots. How many points does ${w} score?`, a, why: `${t} × 2 = ${2 * t}. ${h} × 3 = ${3 * h}. ${2 * t} + ${3 * h} = ${a}.`, m: [[2 * (t + h), `Three-point shots are worth 3 points, not 2.`], [t + h, `${t + h} is the number of shots, not the points.`], [2 * t + h, `Each three-point shot is worth 3: ${h} × 3 = ${3 * h}.`]] }; },
  w => { const r = R(8, 20), d = R(3, 7), P = r * d + R(20, 120), a = P - r * d; return { e: "📖", unit: " pages", q: `A book has ${P} pages. ${w} reads ${r} pages a day for ${d} days. How many pages are left to read?`, a, why: `${r} × ${d} = ${r * d} pages read. ${P} − ${r * d} = ${a}.`, m: [[r * d, `${r * d} is how many pages ${w} read, not how many are left.`], [P - r, `That counts only 1 day of reading. ${w} read for ${d} days.`]] }; },
  w => { let e; do { e = R(5, 15); } while ((7 * e) % 12 === 0); const t = 7 * e, a = Math.floor(t / 12); return { e: "🥚", q: `A farm's hens lay ${e} eggs each day. After 7 days, the eggs are packed in cartons of 12. How many cartons can be filled all the way?`, a, why: `7 × ${e} = ${t} eggs. ${t} ÷ 12 = ${a} R ${t % 12}, so ${a} full cartons.`, m: [[a + 1, `The last carton would have only ${t % 12} eggs, so it isn't full.`], [t, `${t} is the number of eggs, not cartons.`], [e, `${e} is the eggs from just 1 day.`]] }; },
  w => { let n, c; do { n = R(5, 12); c = R(2, 3); } while ((n * c) % 8 === 0); const t = n * c, a = Math.ceil(t / 8); return { e: "🌱", q: `${w} has ${n} plants. Each plant needs ${c} cups of water. A watering can holds 8 cups. How many times does ${w} need to fill the can?`, a, why: `${n} × ${c} = ${t} cups. ${t} ÷ 8 = ${Math.floor(t / 8)} R ${t % 8}, so ${a} fills.`, m: [[Math.floor(t / 8), `${Math.floor(t / 8)} fills give only ${Math.floor(t / 8) * 8} cups, but the plants need ${t}.`], [t, `${t} is the number of cups, not fills.`]] }; },
  w => { const p = R(2, 6), c = R(4, 9), s = R(5, p * c - 2), a = p * c - s; return { e: "🧹", pre: "$", q: `${w} earns $${p} for each chore and does ${c} chores. Then ${w} spends $${s} on a book. How much money does ${w} have left?`, a, why: `${c} × $${p} = $${p * c}. $${p * c} − $${s} = $${a}.`, m: [[p * c, `Take away the $${s} spent on the book.`], [p + c - s, `${c} chores at $${p} each means multiply: ${c} × ${p}.`], [p * c + s, `Spending money means subtract $${s}, not add.`]] }; },
  w => { const r = R(4, 9), c = R(6, 12), j = R(3, 15), a = r * c + j; return { e: "🥁", unit: " players", q: `A marching band has ${r} rows with ${c} players in each row. Then ${j} more players join. How many players are in the band now?`, a, why: `${r} × ${c} = ${r * c}. ${r * c} + ${j} = ${a}.`, m: [[r * c, `Add the ${j} new players.`], [r + c + j, `${r} rows of ${c} means multiply: ${r} × ${c}.`]] }; },
  w => { let s, d; do { s = R(6, 15); d = R(3, 6); } while ((s * d) % 2); const a = s * d / 2; return { e: "🐚", q: `${w} collects ${s} shells each day for ${d} days. Then ${w} gives half of them to a cousin. How many shells does ${w} keep?`, a, why: `${s} × ${d} = ${s * d}. Half of ${s * d} is ${s * d} ÷ 2 = ${a}.`, m: [[s * d, `${s * d} is all the shells. ${w} gives half away.`], [s * d - 2, `Half means divide by 2, not take away 2.`]] }; },
  w => { const n = R(3, 6), t = R(8, 12), p = R(5, 9), a = n * t + p; return { e: "🎬", pre: "$", q: `${n} friends go to a movie. Tickets cost $${t} each, and they buy one big popcorn for $${p} to share. How much do they spend in all?`, a, why: `${n} × $${t} = $${n * t}. $${n * t} + $${p} = $${a}.`, m: [[n * t, `Add the $${p} popcorn.`], [n * (t + p), `They share one popcorn, so add $${p} only once.`]] }; },
];
addBank(9, "math", "multistep", 0.3, () => {
  const w = pick(KIDS), i = R(0, V25MA9_MS.length - 1), s = V25MA9_MS[i](w); if (!s) return null;
  const pre = s.pre || "", u = s.unit || "", F = x => pre + x + u;
  const { opts, r } = V25MA9_O(s.a, s.m, () => s.a + R(-Math.max(3, Math.round(s.a / 10)), Math.max(3, Math.round(s.a / 10))), F, v => `${F(v)} is ${Math.abs(v - s.a)} ${v > s.a ? "more" : "less"} than the right answer. Check each step again.`, 0);
  return { q: s.q, vis: bigEmo(s.e), opts, ans: F(s.a), big: 1, why: s.why, key: `v25ms${i}:` + s.q.replace(/\D+/g, "-"), v25: { r } };
});
whyRule(9, "math", "multistep", V25MA9_rule);

/* ---------- linegraph: new real-life graphs and questions; moving on a park map ---------- */
const V25MA9_LG = [
  ["Ice cream cones sold", "cones", V24_DAYS, 20, 90, 10, ""], ["Kids at the pool", "kids", V24_DAYS, 10, 60, 5, ""],
  ["Library visitors", "visitors", V24_DAYS, 30, 90, 10, ""], ["Birds at the feeder", "birds", V24_DAYS, 4, 24, 2, ""],
  ["Lemonade cups sold", "cups", V24_DAYS, 10, 50, 5, ""], ["Hot cocoa cups sold", "cups", ["Oct", "Nov", "Dec", "Jan", "Feb"], 20, 100, 10, ""],
  ["Rainfall", "inches", ["Mar", "Apr", "May", "Jun", "Jul"], 1, 9, 1, " inches"], ["Pages Nora read", "pages", V24_DAYS, 10, 50, 5, ""],
  ["Bikes in the bike rack", "bikes", V24_DAYS, 4, 20, 2, ""], ["Snow on the ground", "inches", ["Nov", "Dec", "Jan", "Feb", "Mar"], 2, 20, 2, " inches"],
];
const V25MA9_LAB = { Mon: "Monday", Tue: "Tuesday", Wed: "Wednesday", Thu: "Thursday", Fri: "Friday", Oct: "October", Nov: "November", Dec: "December", Jan: "January", Feb: "February", Mar: "March", Apr: "April", May: "May", Jun: "June", Jul: "July" };
const V25MA9_MAP = [["🏠", "house"], ["🌳", "tree"], ["⛲", "fountain"], ["🏫", "school"], ["🌻", "sunflower"], ["🦆", "duck"], ["🍦", "ice cream stand"], ["⚽", "soccer ball"], ["🚲", "bike"], ["🎪", "circus tent"]];
addBank(9, "math", "linegraph", 0.3, () => {
  if (Math.random() < 0.55) {
    const ci = R(0, V25MA9_LG.length - 1), [title, yN, labs, lo, hi, step, u] = V25MA9_LG[ci], L = x => V25MA9_LAB[x] || x, isDay = labs === V24_DAYS, unitW = isDay ? "day" : "month", F = x => x + u;
    let v, g = 0; do { v = labs.map(() => lo + R(0, Math.floor((hi - lo) / step)) * step); g++; } while (new Set(v).size < 5 && g < 200);
    if (new Set(v).size < 5) return null;
    const vis = V24_lineGraph(labs, v, title, yN, step), key = `v25lg${ci}:${v.join(",")}`, G = `Look at the ${title.charAt(0).toLowerCase() + title.slice(1)} graph. `;
    let k = R(0, 3);
    const drops = v.slice(1).map((x, j) => v[j] - x), mxD = Math.max(...drops);
    if (k === 2 && (mxD <= 0 || drops.filter(x => x === mxD).length > 1)) k = 0;
    if (k === 0) {
      const sorted = v.slice().sort((a, b) => a - b), X = sorted[R(0, 3)] + Math.floor(step / 2), above = labs.filter((_, j) => v[j] > X), ans = above.length;
      const r = {}, opts = [String(ans)];
      for (const c of shuffle([0, 1, 2, 3, 4, 5].filter(x => x !== ans)).slice(0, 3)) { opts.push(String(c)); r[String(c)] = `Exactly ${ans} ${ans === 1 ? "dot is" : "dots are"} above ${F(X)}: ${above.map(L).join(", ")}.`; }
      return { q: G + `${isDay ? "On" : "In"} how many ${unitW}s was it <b>more than ${F(X)}</b>?`, say: G + `${isDay ? "On" : "In"} how many ${unitW}s was it more than ${F(X)}?`, vis, opts: shuffle(opts), ans: String(ans), big: 1, why: `${above.map(x => `${L(x)} (${F(v[labs.indexOf(x)])})`).join(", ")} ${ans === 1 ? "is" : "are"} more than ${F(X)}. That is ${ans}.`, key: key + `:c${X}`, v25: { r } };
    }
    if (k === 1) {
      let i = R(0, 3), j = i + 1; if (Math.random() < 0.5) j = R(0, 4); if (j === i) j = (i + 2) % 5;
      const a = v[i], b = v[j], s = a + b;
      const { opts, r } = V25MA9_O(s, [[Math.abs(a - b), `${F(Math.abs(a - b))} is the difference. "Total" means add.`], [a, `${F(a)} is only ${L(labs[i])}. Add ${L(labs[j])} too.`], [b, `${F(b)} is only ${L(labs[j])}. Add ${L(labs[i])} too.`], [s + step, null]], () => s + step * R(-2, 2), F, x => `${a} + ${b} = ${s}, not ${x}.`);
      return { q: G + `What was the <b>total</b> for ${L(labs[i])} and ${L(labs[j])}?`, say: G + `What was the total for ${L(labs[i])} and ${L(labs[j])}?`, vis, opts, ans: F(s), big: 1, why: `${L(labs[i])}: ${F(a)}. ${L(labs[j])}: ${F(b)}. ${a} + ${b} = ${F(s)}.`, key: key + `:t${i}${j}`, v25: { r } };
    }
    if (k === 2) {
      const pairs = labs.slice(1).map((l, j) => `${L(labs[j])} to ${L(l)}`), i = drops.indexOf(mxD), r = {}, others = shuffle(pairs.filter((_, j) => j !== i)).slice(0, 3);
      others.forEach(p => { const j = pairs.indexOf(p), dd = drops[j]; r[p] = dd > 0 ? `From ${p} it went down ${F(dd)}, but another part went down more.` : dd < 0 ? `From ${p} the line goes up, not down.` : `From ${p} the line stays flat.`; });
      return { q: G + `Between which two ${unitW}s did it go <b>down the most</b>?`, say: G + `Between which two ${unitW}s did it go down the most?`, vis, opts: shuffle([pairs[i], ...others]), ans: pairs[i], big: 1, why: `From ${pairs[i]} the line drops the most: ${v[i]} − ${v[i + 1]} = ${F(mxD)}.`, key: key + ":d", v25: { r } };
    }
    const i = R(0, 4), X = v[i], r = {}, others = shuffle(labs.filter((_, j) => j !== i)).slice(0, 3);
    others.forEach(l => { r[L(l)] = `${L(l)} shows ${F(v[labs.indexOf(l)])}, not ${F(X)}.`; });
    return { q: G + `${isDay ? "On" : "In"} which ${unitW} was it exactly <b>${F(X)}</b>?`, say: G + `${isDay ? "On" : "In"} which ${unitW} was it exactly ${F(X)}?`, vis, opts: shuffle([L(labs[i]), ...others.map(L)]), ans: L(labs[i]), big: 1, why: `Find ${F(X)} on the side, look across to the dot, then down: ${L(labs[i])}.`, key: key + `:f${i}`, v25: { r } };
  }
  const n = 6, items = [], used = new Set();
  for (const pl of shuffle(V25MA9_MAP).slice(0, 5)) { let a, b; do { a = R(0, n); b = R(1, n); } while (used.has(a + "," + b)); used.add(a + "," + b); items.push([pl[0], a, b, pl[1]]); }
  const vis = V24_grid(items.map(x => x.slice(0, 3)), n), [S, T] = shuffle(items).slice(0, 2), dx = T[1] - S[1], dy = T[2] - S[2];
  const mv = [dx ? `${Math.abs(dx)} ${Math.abs(dx) === 1 ? "unit" : "units"} ${dx > 0 ? "right" : "left"}` : "", dy ? `${Math.abs(dy)} ${Math.abs(dy) === 1 ? "unit" : "units"} ${dy > 0 ? "up" : "down"}` : ""].filter(Boolean).join(" and ");
  const key = "v25gm" + items.map(x => x.slice(0, 3).join("")).join("|") + ":" + S[0] + T[0];
  if (Math.random() < 0.55) {
    const sp = x => `<span class="emo" title="${x[3]}">${x[0]}</span>`, others = items.filter(x => x !== S), r = {};
    others.forEach(x => { if (x !== T) r[sp(x)] = `The ${x[3]} is at (${x[1]}, ${x[2]}), but the moves end at (${T[1]}, ${T[2]}).`; });
    return { q: `On the park map, start at the ${S[3]} ${S[0]} at (${S[1]}, ${S[2]}). Go ${mv}. What do you reach?`, say: `On the park map, start at the ${S[3]}. Go ${mv}. What do you reach?`, vis, opts: shuffle(others.map(sp)), ans: sp(T), sayAns: `the ${T[3]}`, big: 1, why: `From (${S[1]}, ${S[2]}), go ${mv}. You land on (${T[1]}, ${T[2]}), where the ${T[3]} is.`, key: key + "w", v25: { r } };
  }
  const C = (a, b) => `(${a}, ${b})`, ans = C(T[1], T[2]), out = [ans], r = {};
  const add = (a, b, why) => { if (out.length >= 4 || a < 0 || b < 0 || a > n || b > n) return; const s = C(a, b); if (out.includes(s)) return; out.push(s); r[s] = why; };
  add(T[2], T[1], `${C(T[2], T[1])} swaps the numbers. Across comes first, then up.`);
  add(S[1], S[2], `${C(S[1], S[2])} is where you started, at the ${S[3]}.`);
  add(S[1] + dy, S[2] + dx, `That mixes up the moves: across and up got switched.`);
  add(S[1] - dx, S[2] - dy, `That moves the opposite way. Check right/left and up/down.`);
  let g = 0; while (out.length < 4 && g++ < 50) { const a = R(0, n), b = R(0, n); add(a, b, `Starting at ${C(S[1], S[2])} and going ${mv} ends at ${ans}, not ${C(a, b)}.`); }
  return { q: `On the park map, start at the ${S[3]} ${S[0]}. Go ${mv}. What are the coordinates of the place you reach?`, say: `On the park map, start at the ${S[3]}. Go ${mv}. What are the coordinates of the place you reach?`, vis, opts: shuffle(out), ans, big: 1, why: `The ${S[3]} is at ${C(S[1], S[2])}. Going ${mv} lands on ${ans}.`, key: key + "c", v25: { r } };
});
whyRule(9, "math", "linegraph", V25MA9_rule);

/* ---------- solveletter: two-step stories to solve, pick the equation for a story ---------- */
const V25MA9_EQS = [
  { e: "🃏", fm: "+", t: (w, a, b, c) => `${w} buys ${a} packs of cards with the same number in each pack. ${w} already had ${b} cards. Now ${w} has ${c} cards. How many cards are in each pack?` },
  { e: "🍪", fm: "+", t: (w, a, b, c) => `A baker fills ${a} trays with the same number of cookies and puts ${b} extra cookies in a jar. There are ${c} cookies in all. How many cookies are on each tray?` },
  { e: "🚐", fm: "+", t: (w, a, b, c) => `${a} vans each carry the same number of kids, and ${b} more kids ride in a car. ${c} kids go on the trip. How many kids are in each van?` },
  { e: "🎟️", fm: "+", m: "$", t: (w, a, b, c) => `${w} buys ${a} tickets that cost the same and a $${b} snack. ${w} spends $${c} in all. How much is each ticket?` },
  { e: "🌷", fm: "+", t: (w, a, b, c) => `A gardener plants ${a} rows of tulips with the same number in each row, plus ${b} tulips by the gate. That is ${c} tulips. How many tulips are in each row?` },
  { e: "🖍️", fm: "+", t: (w, a, b, c) => `${w} has ${a} boxes of markers with the same number in each box, plus ${b} loose markers. ${w} has ${c} markers. How many markers are in each box?` },
  { e: "🐟", fm: "+", t: (w, a, b, c) => `A pet store has ${a} tanks with the same number of fish, plus ${b} fish in a bowl. There are ${c} fish. How many fish are in each tank?` },
  { e: "💵", fm: "+", m: "$", t: (w, a, b, c) => `${w} saves the same amount each week for ${a} weeks, then gets $${b} as a gift. Now ${w} has $${c}. How much did ${w} save each week?` },
  { e: "🧁", fm: "-", t: (w, a, b, c) => `${w} bakes ${a} pans of muffins with the same number in each pan. ${b} muffins get eaten, and ${c} are left. How many muffins were in each pan?` },
  { e: "🎈", fm: "-", t: (w, a, b, c) => `${w} buys ${a} bags of balloons with the same number in each bag. ${b} balloons pop, and ${c} are left. How many balloons were in each bag?` },
  { e: "🥚", fm: "-", xl: [6, 12], t: (w, a, b, c) => `A cook has ${a} cartons of eggs with the same number in each carton. The cook uses ${b} eggs, and ${c} are left. How many eggs were in each carton?` },
  { e: "📚", fm: "-", t: (w, a, b, c) => `A teacher has ${a} boxes of books with the same number in each box. The teacher gives away ${b} books, and ${c} are left. How many books were in each box?` },
  { e: "🍓", fm: "-", t: (w, a, b, c) => `${w} picks ${a} baskets of strawberries with the same number in each basket. ${w} eats ${b} of them, and ${c} are left. How many were in each basket?` },
];
const V25MA9_EQM = [
  (w, a, b, c) => ({ q: `${w} had some stickers. ${w} got ${b} more and now has ${c}. Let <b>s</b> be the stickers ${w} had at first. Which equation shows this?`, ans: `s + ${b} = ${c}`, W: [[`s − ${b} = ${c}`, `− means ${b} were taken away, but ${w} got ${b} more.`], [`${b} × s = ${c}`, `× would mean ${b} equal groups, but ${w} just got ${b} more.`], [`s + ${c} = ${b}`, `This says the total is ${b}, but ${w} ends with ${c}.`]], why: `${w} started with s, added ${b}, and got ${c}: s + ${b} = ${c}. So s = ${c - b}.` }),
  (w, a, b, c) => ({ q: `${w} had some marbles. ${w} lost ${b} of them and has ${c} left. Let <b>m</b> be the marbles ${w} had at first. Which equation shows this?`, ans: `m − ${b} = ${c}`, W: [[`m + ${b} = ${c}`, `+ means ${b} were added, but ${w} lost ${b}.`], [`${b} − m = ${c}`, `This takes m away from ${b}, but the ${b} were taken from m.`], [`m × ${b} = ${c}`, `× means equal groups, but ${w} lost ${b} marbles.`]], why: `${w} started with m, lost ${b}, and has ${c}: m − ${b} = ${c}. So m = ${c + b}.` }),
  (w, a, b, c) => ({ q: `${a} bags each hold the same number of apples. There are ${a * b} apples in all. Let <b>g</b> be the apples in each bag. Which equation shows this?`, ans: `${a} × g = ${a * b}`, W: [[`${a} + g = ${a * b}`, `+ would mean ${a} more apples, but there are ${a} equal bags.`], [`g ÷ ${a} = ${a * b}`, `This says one bag split ${a} ways is ${a * b}, but ${a * b} is the total.`], [`${a} × ${a * b} = g`, `This makes g bigger than the total, but g is just one bag.`]], why: `${a} equal bags of g make ${a * b}: ${a} × g = ${a * b}. So g = ${b}.` }),
  (w, a, b, c) => ({ q: `${a * b} cookies are shared equally on ${a} plates. Let <b>k</b> be the cookies on each plate. Which equation shows this?`, ans: `${a * b} ÷ ${a} = k`, W: [[`${a * b} × ${a} = k`, `Sharing splits ${a * b} into ${a} equal parts, so divide.`], [`${a * b} − ${a} = k`, `Sharing equally means dividing, not taking away ${a}.`], [`${a} ÷ ${a * b} = k`, `This divides ${a} by ${a * b}. Divide the ${a * b} cookies by ${a}.`]], why: `${a * b} cookies split into ${a} equal groups: ${a * b} ÷ ${a} = k. So k = ${b}.` }),
  (w, a, b, c) => ({ q: `${w} buys ${a} packs of pencils with <b>p</b> pencils in each pack, plus ${b} single pencils. ${w} gets ${c} pencils. Which equation shows this?`, ans: `${a} × p + ${b} = ${c}`, W: [[`${a} + p + ${b} = ${c}`, `${a} packs of p means ${a} × p, not ${a} + p.`], [`${a} × p − ${b} = ${c}`, `− means ${b} were taken away, but ${w} bought ${b} more.`], [`${a} × ${b} + p = ${c}`, `This puts the ${b} single pencils into the packs. The packs hold p each.`]], why: `${a} packs of p is ${a} × p. Add the ${b} singles to get ${c}: ${a} × p + ${b} = ${c}.` }),
];
addBank(9, "math", "solveletter", 0.3, () => {
  const w = pick(KIDS);
  if (Math.random() < 0.6) {
    const ci = R(0, V25MA9_EQS.length - 1), c0 = V25MA9_EQS[ci], L = pick(["n", "x", "p", "k", "b"]), a = R(2, 9), x = c0.xl ? pick(c0.xl) : R(3, 12), m = c0.m || "", F = v => m + v;
    const plus = c0.fm === "+", b = plus ? R(1, 20) : R(1, a * x - 2), c = plus ? a * x + b : a * x - b;
    const miss = plus ? [[c - b, `${F(c - b)} is ${a} × ${L}. Divide by ${a} to find ${L}.`], [(c + b) % a === 0 ? (c + b) / a : null, `Undo + ${b} by subtracting, not adding.`], [c % a === 0 ? c / a : null, `Take away the ${b} first, then divide by ${a}.`]]
      : [[c + b, `${F(c + b)} is ${a} × ${L}. Divide by ${a} to find ${L}.`], [c - b > 0 && (c - b) % a === 0 ? (c - b) / a : null, `Undo − ${b} by adding, not subtracting.`], [c % a === 0 ? c / a : null, `Add back the ${b} first, then divide by ${a}.`]];
    const { opts, r } = V25MA9_O(x, miss, () => x + R(-3, 3), F, v => (!plus && a * v < b) ? `If ${L} were ${v}, then ${a} × ${v} = ${a * v}, which is less than ${b}, so that can't work.` : `If ${L} were ${v}, then ${a} × ${v} ${plus ? "+" : "−"} ${b} = ${plus ? a * v + b : a * v - b}, not ${c}.`);
    const q = c0.t(w, a, b, c);
    return { q, vis: row(bigEmo(c0.e), eq(`${a} × ${L} ${plus ? "+" : "−"} ${b} = ${c}`)), opts, ans: F(x), big: 1, why: plus ? `${c} − ${b} = ${c - b}, then ${c - b} ÷ ${a} = ${x}. Check: ${a} × ${x} + ${b} = ${c}.` : `${c} + ${b} = ${c + b}, then ${c + b} ÷ ${a} = ${x}. Check: ${a} × ${x} − ${b} = ${c}.`, key: `v25sl${ci}:${w}:${L}:${a}:${b}:${c}`, v25: { r } };
  }
  const ti = R(0, V25MA9_EQM.length - 1), a = R(2, 9), b = R(3, 12), c = ti === 4 ? a * R(3, 12) + b : ti === 1 ? R(3, 30) : b + R(5, 30);
  const o = V25MA9_EQM[ti](w, a, b, c), r = {};
  o.W.forEach(([s, y]) => { r[s] = y; });
  return { q: o.q, say: V25MA9_say(o.q), vis: bigEmo(["🌟", "🔵", "🍎", "🍪", "✏️"][ti]), opts: shuffle([o.ans, ...o.W.map(z => z[0])]), ans: o.ans, big: 1, why: o.why, key: `v25se${ti}:${w}:${a}:${b}:${c}`, v25: { r } };
});
whyRule(9, "math", "solveletter", V25MA9_rule);

