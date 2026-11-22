/* =====================================================================
   v25_ma8.js — Age 8 (grade 3) Math. Tag V25MA8_
   New real-life contexts and formats for every age-8 math topic.
   Every new question carries q.v25 = { m: { option: reason } }: the reason
   for each wrong option is worked out when the question is made.
   ===================================================================== */
const V25MA8_N = ["Jada", "Mateo", "Priya", "Theo", "Amara", "Hugo", "Lena", "Kofi", "Rosa", "Eli", "Maya", "Tariq", "June", "Felix", "Ines", "Sora"];
const V25MA8_who = () => pick(V25MA8_N);
const V25MA8_two = () => { const a = pick(V25MA8_N); let b; do { b = pick(V25MA8_N); } while (b === a); return [a, b]; };
const V25MA8_pl = (n, one, many) => `${n} ${n === 1 ? one : (many || one + "s")}`;
const V25MA8_mo = d => d > 0 ? "more" : "less";
const V25MA8_r10 = n => Math.round(n / 10) * 10;
const V25MA8_r100 = n => Math.round(n / 100) * 100;
const V25MA8_$ = c => "$" + (c / 100).toFixed(2);
const V25MA8_c = c => c >= 100 ? V25MA8_$(c) : `${c} ${c === 1 ? "cent" : "cents"}`;
const V25MA8_an = w => /^[aeiou]/i.test(w) ? `an ${w}` : `a ${w}`;
const V25MA8_list = a => a.length === 1 ? a[0] : a.length === 2 ? `${a[0]} and ${a[1]}` : a.slice(0, -1).join(", ") + " and " + a[a.length - 1];
const V25MA8_fw = (k, d) => fracWords(k, d);
/* times as minutes after 12:00 (12-hour clock) */
const V25MA8_tm = t => { t = ((t % 720) + 720) % 720; return `${Math.floor(t / 60) || 12}:${pad2(t % 60)}`; };
const V25MA8_dt = (a, b) => (((b - a) % 720) + 720) % 720;

/* options + a reason for every wrong option */
function V25MA8_opts(ans, cands, fill, max = 4, keep = false) {
  const opts = [String(ans)], m = {};
  for (const c of cands) { if (opts.length >= max) break; if (!c || c[0] == null) continue; const s = String(c[0]); if (opts.includes(s)) continue; opts.push(s); m[s] = c[1]; }
  let g = 0;
  while (opts.length < max && fill && g++ < 100) { const c = fill(); if (!c || c[0] == null) continue; const s = String(c[0]); if (opts.includes(s)) continue; opts.push(s); m[s] = c[1]; }
  return { opts: keep ? opts : shuffle(opts), m };
}
function V25MA8_num(ans, cands, fb, o = {}) {
  const fmt = o.fmt || (v => String(v)), min = o.min == null ? 0 : o.min, step = o.step || 1, sp = o.sp || 3;
  const ok = v => typeof v === "number" && Number.isInteger(v) && v >= min && v !== ans && (o.max == null || v <= o.max);
  const C = cands.filter(c => c && ok(c[0])).map(c => [fmt(c[0]), c[1] || fb(c[0])]);
  return V25MA8_opts(fmt(ans), C, () => { const v = ans + step * R(-sp, sp); return ok(v) ? [fmt(v), fb(v)] : null; });
}
function V25MA8_Q(q, vis, ans, o, why, key, extra) {
  return Object.assign({ q, vis, opts: o.opts, ans: String(ans), big: 1, why, key: "v25" + key, v25: { m: o.m } }, extra || {});
}
function V25MA8_why(q, picked) {
  const x = q.v25; if (!x || !x.m || picked === q.ans) return null;
  if (x.m[picked]) return x.m[picked];
  const p = xPlain(picked); for (const k in x.m) if (xPlain(k) === p) return x.m[k];
  return null;
}
const V25MA8_W = 0.3;

/* ======================= Multiplication ======================= */
const V25MA8_MUL = [
  ["🏢", (a, b) => `An apartment building has ${a} floors. Each floor has ${b} windows. How many windows are there in all?`, "floor", "floors", 2, 10],
  ["🧊", (a, b) => `An ice cube tray has ${a} rows with ${b} cubes in each row. How many ice cubes does it make?`, "row", "rows", 2, 6],
  ["🌷", (a, b, w) => `${w} plants ${a} rows of tulips with ${b} tulips in each row. How many tulips does ${w} plant?`, "row", "rows", 3, 10],
  ["🚗", (a, b) => `A parking lot has ${a} rows with ${b} cars in each row. How many cars are parked there?`, "row", "rows", 4, 10],
  ["🍞", (a, b) => `A baker fills ${a} pans with ${b} rolls in each pan. How many rolls is that?`, "pan", "pans", 4, 9],
  ["🏀", (a, b) => `The gym has ${a} racks. Each rack holds ${b} balls. How many balls can the racks hold?`, "rack", "racks", 3, 9],
  ["🛶", (a, b) => `${a} canoes go down the river with ${b} campers in each canoe. How many campers are in the canoes?`, "canoe", "canoes", 2, 3],
  ["📦", (a, b) => `A truck carries ${a} boxes. Each box has ${b} books. How many books are on the truck?`, "box", "boxes", 4, 10],
  ["🎹", (a, b, w) => `${w} practices piano for ${b} minutes each day. How many minutes is that in ${a} days?`, "day", "days", 5, 10],
  ["🍇", (a, b) => `Each snack cup has ${b} grapes. How many grapes are in ${a} snack cups?`, "cup", "cups", 5, 10],
  ["🎈", (a, b) => `There are ${a} party tables. Each table gets ${b} balloons. How many balloons are needed?`, "table", "tables", 2, 6],
  ["🍕", (a, b) => `The class orders ${a} pizzas. Each pizza is cut into ${b} slices. How many slices are there?`, "pizza", "pizzas", 6, 8, [6, 8]],
  ["🏊", (a, b) => `The pool has ${a} lanes with ${b} swimmers in each lane. How many swimmers are in the pool?`, "lane", "lanes", 2, 4],
  ["🎨", (a, b) => `The art room has ${a} tables. Each table has ${b} paintbrushes. How many paintbrushes are there?`, "table", "tables", 3, 9],
  ["📚", (a, b) => `A bookshelf has ${a} shelves with ${b} books on each shelf. How many books are on the bookshelf?`, "shelf", "shelves", 5, 10],
  ["🍓", (a, b, w) => `${w} fills ${a} baskets with ${b} strawberries in each basket. How many strawberries is that?`, "basket", "baskets", 4, 10],
  ["🧤", (a) => `${a} kids each wear 2 mittens. How many mittens are they wearing in all?`, "kid", "kids", 2, 2],
  ["⛺", (a, b) => `At camp, ${a} tents each sleep ${b} kids. How many kids can sleep in the tents?`, "tent", "tents", 2, 6],
];
const V25MA8_MULC = [["🔵", "bag", "bags", "marbles"], ["🃏", "pack", "packs", "cards"], ["🌟", "sheet", "sheets", "stickers"], ["🍪", "box", "boxes", "cookies"], ["🐚", "bucket", "buckets", "shells"], ["✏️", "case", "cases", "pencils"], ["🌸", "vase", "vases", "flowers"]];
addBank(8, "math", "mult", V25MA8_W, () => {
  if (Math.random() < 0.65) {
    const [e, f, g1, gN, lo, hi, set] = pick(V25MA8_MUL), w = V25MA8_who(), a = R(3, 9), b = set ? pick(set) : R(lo, hi), p = a * b;
    const o = V25MA8_num(p, [
      [a + b, `${a + b} adds ${a} + ${b}. ${a} ${gN} with ${b} each means ${a} × ${b}.`],
      [(a - 1) * b, `${(a - 1) * b} is only ${V25MA8_pl(a - 1, g1, gN)} of ${b}. There are ${a} ${gN}.`],
      [(a + 1) * b, `${(a + 1) * b} would be ${a + 1} ${gN} of ${b}, one too many.`],
      [a * (b + 1), `${a * (b + 1)} would mean ${b + 1} for each ${g1}, not ${b}.`],
    ], v => `${a} × ${b} = ${p}, not ${v}.`, { min: 1 });
    return V25MA8_Q(f(a, b, w), bigEmo(e), p, o, `${a} ${gN} with ${b} in each: ${a} × ${b} = ${p}.`, "mu" + e + a + "x" + b);
  }
  const [e, g1, gN, things] = pick(V25MA8_MULC), [A, B] = V25MA8_two(), fewer = Math.random() < 0.4;
  let a, b, c, d;
  if (Math.random() < 0.25) {
    const pairs = []; for (let x = 2; x <= 9; x++) for (let y = 2; y <= 9; y++) for (let z = 2; z <= 9; z++) for (let t = 2; t <= 9; t++) if (x * y === z * t && !(x === z && y === t)) pairs.push([x, y, z, t]);
    [a, b, c, d] = pick(pairs);
  } else { do { a = R(2, 9); b = R(2, 9); c = R(2, 9); d = R(2, 9); } while (a * b === c * d); }
  const pa = a * b, pb = c * d, SAME = "They have the same";
  const ans = pa === pb ? SAME : (fewer ? (pa < pb ? A : B) : (pa > pb ? A : B));
  const m = {};
  for (const [X, px, Y, py] of [[A, pa, B, pb], [B, pb, A, pa]]) if (X !== ans) m[X] = pa === pb ? `${X} has ${px} ${things}, and ${Y} has ${py} too, so neither has ${fewer ? "fewer" : "more"}.` : `${X} has ${px} ${things}, which is ${px < py ? "fewer" : "more"} than ${Y}'s ${py}.`;
  if (ans !== SAME) m[SAME] = `They are not the same: ${A} has ${pa} ${things} and ${B} has ${pb}.`;
  const why = `${A}: ${a} × ${b} = ${pa}. ${B}: ${c} × ${d} = ${pb}.` + (pa === pb ? " Both are the same!" : ` ${ans} has ${fewer ? "fewer" : "more"}.`);
  return V25MA8_Q(`${A} has ${V25MA8_pl(a, g1, gN)} with ${b} ${things} in each. ${B} has ${V25MA8_pl(c, g1, gN)} with ${d} ${things} in each. Who has <b>${fewer ? "fewer" : "more"}</b> ${things}?`, bigEmo(e), ans, { opts: shuffle([A, B, SAME]), m }, why, "mc" + e + [A, a, b, B, c, d, fewer].join("|"), { say: `${A} has ${V25MA8_pl(a, g1, gN)} with ${b} ${things} in each. ${B} has ${V25MA8_pl(c, g1, gN)} with ${d} ${things} in each. Who has ${fewer ? "fewer" : "more"} ${things}?` });
});

/* ======================= Division ======================= */
const V25MA8_DIV = [
  ["🍌", (n, k) => `The zookeeper shares ${n} bananas equally among ${k} monkeys. How many bananas does each monkey get?`],
  ["🌮", (n, k) => `${n} tacos are put equally on ${k} plates. How many tacos are on each plate?`],
  ["📸", (n, k, w) => `${w} puts ${n} photos in an album, with ${k} photos on each page. How many pages does ${w} fill?`],
  ["🍋", (n, k) => `A farm stand puts ${n} lemons into bags of ${k}. How many bags does it fill?`],
  ["🚗", (n) => `A bin of toy cars has ${n} wheels in all. Each car has 4 wheels. How many toy cars are in the bin?`, 4],
  ["🐞", (n) => `Some ladybugs have ${n} legs in all. Each ladybug has 6 legs. How many ladybugs are there?`, 6],
  ["📅", (n, k, w) => `${w}'s family goes on a trip for ${n} days. How many weeks is that?`, 7],
  ["🏀", (n, k) => `${n} players split into ${k} equal teams. How many players are on each team?`],
  ["🌻", (n, k, w) => `${w} plants ${n} seeds equally in ${k} pots. How many seeds go in each pot?`],
  ["🧃", (n, k) => `The class has ${n} juice boxes. They come in packs of ${k}. How many packs are there?`],
  ["🎀", (n, k, w) => `${w} cuts a ${n}-foot ribbon into ${k} equal pieces. How many feet long is each piece?`],
  ["🎨", (n, k) => `The art teacher puts ${n} paint jars equally on ${k} tables. How many jars go on each table?`],
  ["🚌", (n, k) => `${n} students ride to the museum in ${k} buses. Each bus has the same number of students. How many students ride in each bus?`],
  ["🥚", (n) => `A farmer collects ${n} eggs. Each small carton holds 6 eggs. How many cartons can the farmer fill?`, 6],
  ["🐴", (n) => `A stable has ${n} horseshoes. Each horse needs 4 horseshoes. How many horses can get a full set?`, 4],
  ["🧦", (n, k, w) => `${w} finds ${n} socks in the laundry, and they all make pairs. How many pairs of socks are there?`, 2],
  ["🍒", (n, k) => `${n} cherries are shared equally in ${k} lunch boxes. How many cherries go in each lunch box?`],
];
const V25MA8_PRICE = [["🧁", "cupcakes", "cupcake"], ["🎟️", "tickets", "ticket"], ["📓", "notebooks", "notebook"], ["🎈", "balloons", "balloon"], ["🌱", "plants", "plant"], ["🧸", "toy bears", "toy bear"], ["🖌️", "paintbrushes", "paintbrush"], ["🍦", "ice cream cones", "ice cream cone"], ["🧦", "pairs of socks", "pair of socks"], ["🏓", "paddles", "paddle"]];
addBank(8, "math", "div", V25MA8_W, () => {
  const w = V25MA8_who();
  if (Math.random() < 0.7) {
    const [e, f, kf] = pick(V25MA8_DIV), k = kf || R(2, 9), q = R(2, 10), n = k * q;
    const o = V25MA8_num(q, [
      [n - k, `${n - k} just subtracts ${k} from ${n}. This story needs ${n} ÷ ${k}.`],
      [k, `${k} is the number you divide by. ${n} ÷ ${k} = ${q}.`],
    ], v => `${k} × ${v} = ${k * v}, not ${n}.`, { min: 1 });
    return V25MA8_Q(f(n, k, w), bigEmo(e), q, o, `${n} ÷ ${k} = ${q}, because ${k} × ${q} = ${n}.`, "dv" + e + n + "/" + k);
  }
  const [e, many, one] = pick(V25MA8_PRICE), c = R(2, 9), p = R(2, 9), t = c * p, F = v => "$" + v;
  const o = V25MA8_num(p, [
    [t - c, `$${t - c} subtracts ${c}. Sharing the cost means $${t} ÷ ${c}.`],
    [c, `${c} is how many ${many} there are, not the price of one.`],
  ], v => `${c} × $${v} = $${c * v}, not $${t}.`, { min: 1, fmt: F });
  return V25MA8_Q(`${c} ${many} cost $${t} in all. Each one costs the same. How much does one ${one} cost?`, bigEmo(e), F(p), o, `$${t} ÷ ${c} = $${p}, because ${c} × $${p} = $${t}.`, "dp" + e + t + "/" + c);
});

/* ======================= Fractions ======================= */
const V25MA8_FSET = [
  ["👓", d => `There are ${d} kids at the lunch table.`, "kids", ["wears glasses", "wear glasses"], ["wear glasses", "do not wear glasses"]],
  ["🐱", (d, w) => `${w}'s street has ${d} pets.`, "pets", ["is a cat", "are cats"], ["are cats", "are not cats"]],
  ["🖍️", d => `A box has ${d} crayons.`, "crayons", ["is broken", "are broken"], ["are broken", "are not broken"]],
  ["🍪", d => `A plate has ${d} cookies.`, "cookies", ["has sprinkles", "have sprinkles"], ["have sprinkles", "do not have sprinkles"]],
  ["🚗", d => `There are ${d} cars in the lot.`, "cars", ["is blue", "are blue"], ["are blue", "are not blue"]],
  ["🧦", (d, w) => `${w} has ${d} socks in a drawer.`, "socks", ["has stripes", "have stripes"], ["have stripes", "do not have stripes"]],
  ["🥚", d => `A carton has ${d} eggs.`, "eggs", ["is cracked", "are cracked"], ["are cracked", "are not cracked"]],
  ["🎈", d => `${d} balloons are tied to a chair.`, "balloons", ["has popped", "have popped"], ["have popped", "have not popped"]],
  ["📚", (d, w) => `${w} has ${d} books on a desk.`, "books", ["is from the library", "are from the library"], ["are from the library", "are not from the library"]],
  ["🌷", d => `A vase has ${d} flowers.`, "flowers", ["is red", "are red"], ["are red", "are not red"]],
  ["🍏", d => `A bowl has ${d} apples.`, "apples", ["is green", "are green"], ["are green", "are not green"]],
  ["🐟", d => `A tank has ${d} fish.`, "fish", ["has stripes", "have stripes"], ["have stripes", "do not have stripes"]],
  ["🚲", d => `${d} kids ride bikes to the park.`, "kids", ["wears a red helmet", "wear red helmets"], ["wear red helmets", "do not wear red helmets"]],
  ["🧁", d => `A tray has ${d} cupcakes.`, "cupcakes", ["has pink frosting", "have pink frosting"], ["have pink frosting", "do not have pink frosting"]],
  ["🐚", (d, w) => `${w} found ${d} shells at the beach.`, "shells", ["is white", "are white"], ["are white", "are not white"]],
  ["🐦", d => `${d} birds sit on a fence.`, "birds", ["is a robin", "are robins"], ["are robins", "are not robins"]],
  ["🕯️", d => `A birthday cake has ${d} candles.`, "candles", ["is lit", "are lit"], ["are lit", "are not lit"]],
];
const V25MA8_FLEFT = [
  ["🥪", "a sandwich", "sandwich", "pieces", (w, k) => `${w} eats ${k} of the pieces.`, "eaten", [3, 4]],
  ["🍫", "a chocolate bar", "chocolate bar", "pieces", (w, k) => `${w} shares ${k} of the pieces with friends.`, "shared", [4, 6, 8]],
  ["🥧", "a pie", "pie", "slices", (w, k) => `The family eats ${k} of the slices.`, "eaten", [4, 6, 8]],
  ["🍊", "an orange", "orange", "sections", (w, k) => `${w} eats ${k} of the sections.`, "eaten", [6, 8]],
  ["🎀", "a ribbon", "ribbon", "pieces", (w, k) => `${w} uses ${k} of the pieces for a craft.`, "used", [3, 4, 6]],
  ["🍰", "a cake", "cake", "slices", (w, k) => `The guests eat ${k} of the slices.`, "eaten", [6, 8]],
  ["🥖", "a loaf of bread", "loaf", "slices", (w, k) => `${w} uses ${k} of the slices for toast.`, "used", [6, 8]],
  ["🍉", "a watermelon", "watermelon", "slices", (w, k) => `The team eats ${k} of the slices.`, "eaten", [6, 8]],
  ["🧀", "a block of cheese", "block of cheese", "pieces", (w, k) => `${w} puts ${k} of the pieces on crackers.`, "used", [4, 6]],
];
const V25MA8_eqv = (a, b, c, d) => a * d === b * c;
addBank(8, "math", "fractions", V25MA8_W, () => {
  const w = V25MA8_who();
  if (Math.random() < 0.6) {
    const [e, intro, things, [v1, vN], [qy, qn]] = pick(V25MA8_FSET), d = pick([3, 4, 5, 6, 8]), k = R(1, d - 1), not = Math.random() < 0.35, t = not ? d - k : k;
    const ask = not ? qn : qy, other = not ? qy : qn;
    const cands = [];
    if (!V25MA8_eqv(d - t, d, t, d)) cands.push([frac(d - t, d), `${d - t}/${d} counts the ${things} that ${other}.`]);
    cands.push([frac(t, d - t), `${t}/${d - t} compares the two groups. The bottom should be all ${d} ${things}.`]);
    cands.push([frac(d, t), `${d}/${t} has the numbers flipped. The bottom is all ${d} ${things}.`]);
    cands.push([frac(t, d + 1), `There are ${d} ${things} in all, not ${d + 1}, so the bottom is ${d}.`]);
    const o = V25MA8_opts(frac(t, d), cands);
    const sent = `${intro(d, w)} ${k} of them ${k === 1 ? v1 : vN}.`;
    return V25MA8_Q(`${sent} What fraction of the ${things} ${not ? `<b>${ask}</b>` : ask}?`, bigEmo(e), frac(t, d), o, `The bottom is all ${d} ${things}. The top counts the ones that ${ask}: ${t}. So it is ${t}/${d}.`, "fs" + e + d + k + not, { say: `${sent} What fraction of the ${things} ${ask}?` });
  }
  const [e, obj, short, parts, act, past, ds] = pick(V25MA8_FLEFT), d = pick(ds), k = R(1, d - 1), L = d - k;
  const cands = [[frac(k, d), `${k}/${d} is the part that was ${past}, not the part left.`]];
  if (k !== L) cands.push([frac(L, k), `${L}/${k} compares the parts left to the parts ${past}. The bottom should be ${d}.`]);
  cands.push([frac(d, L), `${d}/${L} has the numbers flipped. The bottom is all ${d} ${parts}.`]);
  const o = V25MA8_opts(frac(L, d), cands, () => { const n = R(1, d - 1); return n === L ? null : [frac(n, d), `${n}/${d} would mean ${V25MA8_pl(n, parts.replace(/s$/, ""), parts)} left, but ${L} ${L === 1 ? "is" : "are"} left.`]; });
  const s1 = `${w} cuts ${obj} into ${d} equal ${parts}. ${act(w, k)}`;
  return V25MA8_Q(`${s1} What fraction of the ${short} is <b>left</b>?`, row(bigEmo(e), pie(d, L, 120, "#FFC93C")), frac(L, d), o, `${d} − ${k} = ${L} ${L === 1 ? parts.replace(/s$/, "") : parts} left out of ${d}, so ${L}/${d} is left.`, "fl" + e + d + k, { say: `${s1} What fraction of the ${short} is left?` });
});

/* ======================= Rounding ======================= */
const V25MA8_RND = [
  ["🌉", n => `A bridge is ${n} feet long.`], ["🎢", n => `A roller coaster track is ${n} meters long.`], ["🚶", (n, w) => `${w} walked ${n} steps to the park.`],
  ["⛰️", n => `A hiking trail climbs ${n} feet.`], ["🏀", n => `The team scored ${n} points this season.`], ["🍎", n => `The orchard picked ${n} apples today.`],
  ["📖", (n, w) => `${w}'s book has ${n} pages.`], ["🎟️", n => `The museum sold ${n} tickets on Saturday.`], ["🐜", n => `An ant hill has ${n} ants.`],
  ["🥫", n => `The class collected ${n} cans for the food drive.`], ["🚂", n => `The train travels ${n} miles.`], ["🎈", n => `A party store has ${n} balloons.`],
  ["🐑", n => `A farm has ${n} sheep.`], ["💧", n => `A water tank holds ${n} gallons.`], ["🌻", n => `A field has ${n} sunflowers.`], ["✈️", n => `A plane flew ${n} miles.`], ["🧱", n => `A wall has ${n} bricks.`],
];
const V25MA8_RABOUT = [["🎉", "people came to the parade"], ["🎪", "people visited the fair"], ["📚", "books were sold at the book sale"], ["🏃", "runners ran in the fun run"], ["🎃", "pumpkins grew at the pumpkin patch"], ["🥫", "cans were collected for the food drive"]];
const V25MA8_RJAR = [["🔵", "marbles"], ["🍪", "cookies"], ["🍬", "jellybeans"], ["🔘", "buttons"], ["🐚", "shells"], ["⭐", "star stickers"]];
addBank(8, "math", "rounding", V25MA8_W, () => {
  const k = Math.random();
  if (k < 0.5) {
    const [e, f] = pick(V25MA8_RND), hund = Math.random() < 0.5, nm = V25MA8_who(); let n;
    do { n = R(101, 989); } while (n % 10 === 0 || (!hund && n % 10 === 5) || (hund && n % 100 === 50));
    const U = hund ? 100 : 10, unit = hund ? "hundred" : "ten", rr = hund ? V25MA8_r100 : V25MA8_r10, ans = rr(n), lo = n - n % U, other = ans === lo ? lo + U : lo;
    const close = v => `${n} is closer to ${ans} than to ${v}.`;
    const cands = [[other, close(other)], [n, `${n} is the exact number. Rounding changes it to a nearby ${unit}.`]];
    if (hund) cands.push([V25MA8_r10(n), `${V25MA8_r10(n)} is ${n} rounded to the nearest ten, not hundred.`]);
    else cands.push([V25MA8_r100(n), `${V25MA8_r100(n)} is ${n} rounded to the nearest hundred, not ten.`]);
    const o = V25MA8_num(ans, cands, v => close(v), { step: U, sp: 2, min: U });
    const d = hund ? Math.floor(n / 10) % 10 : n % 10;
    return V25MA8_Q(`${f(n, nm)} What is ${n} rounded to the nearest <b>${unit}</b>?`, bigEmo(e), ans, o, `The ${hund ? "tens" : "ones"} digit is ${d}. That is ${d >= 5 ? "5 or more, so round up" : "less than 5, so round down"} to ${ans}.`, "ro" + e + n + unit, { say: `${f(n, nm)} What is ${n} rounded to the nearest ${unit}?` });
  }
  if (k < 0.75) {
    const [e, ph] = pick(V25MA8_RABOUT), H = 100 * R(3, 8); let a; do { a = R(H - 49, H + 49); } while (a === H);
    const rs = v => `${v} rounds to ${V25MA8_r100(v)}, not ${H}.`;
    const o = V25MA8_opts(a, [R(H + 51, H + 85), R(H - 85, H - 51), R(H + 110, H + 160), R(H - 160, H - 110)].map(v => [v, rs(v)]).slice(0, 3));
    return V25MA8_Q(`About ${H} ${ph}, rounded to the nearest hundred. Which could be the <b>exact</b> number?`, bigEmo(e), a, o, `${a} is between ${H - 50} and ${H + 49}, so it rounds to ${H}.`, "ra" + e + H + "_" + a);
  }
  const [e, things] = pick(V25MA8_RJAR), T = 10 * R(3, 98), most = Math.random() < 0.5, ans = most ? T + 4 : T - 5;
  const rs = v => V25MA8_r10(v) !== T ? `${v} rounds to ${V25MA8_r10(v)}, not ${T}.` : `${v} rounds to ${T}, but ${ans} is ${most ? "more" : "fewer"} and also rounds to ${T}.`;
  const C = most ? [T + 5, T + 9, T, T - 5, T + 1] : [T - 6, T, T - 1, T - 9, T + 4];
  const o = V25MA8_opts(ans, shuffle(C).map(v => [v, rs(v)]));
  return V25MA8_Q(`A jar label says it holds about ${T} ${things}, rounded to the nearest ten. What is the <b>${most ? "most" : "fewest"}</b> ${things} that could be in the jar?`, bigEmo(e), ans, o, most ? `${T + 4} rounds down to ${T}, but ${T + 5} would round up to ${T + 10}.` : `${T - 5} rounds up to ${T}, but ${T - 6} would round down to ${T - 10}.`, "rj" + e + T + most, { say: `A jar label says it holds about ${T} ${things}, rounded to the nearest ten. What is the ${most ? "most" : "fewest"} ${things} that could be in the jar?` });
});

/* ======================= Perimeter ======================= */
const V25MA8_PER = [
  ["🖼️", "picture", (L, W, w) => `${w} glues ribbon around the edge of a picture that is ${L} inches long and ${W} inches wide. How much ribbon does ${w} need?`, "in", 6, 12],
  ["🐕", "dog yard", (L, W) => `A dog yard is a rectangle ${L} meters long and ${W} meters wide. How much fence goes all the way around it?`, "m", 6, 15],
  ["📌", "bulletin board", (L, W) => `A bulletin board is ${L} feet long and ${W} feet wide. How much border goes around its edge?`, "ft", 4, 9],
  ["🚪", "door", (L, W, w) => `${w} hangs lights around a door that is ${L} feet tall and ${W} feet wide. How long is the string of lights?`, "ft", 7, 8, 3, 4],
  ["🏖️", "sandbox", (L, W) => `A sandbox is ${L} feet long and ${W} feet wide. A wood border goes all the way around it. How long is the border?`, "ft", 5, 10],
  ["🧶", "rug", (L, W, w) => `${w} sews trim around a rug that is ${L} feet long and ${W} feet wide. How much trim is needed?`, "ft", 4, 9],
  ["🥕", "vegetable garden", (L, W) => `A vegetable garden is ${L} meters long and ${W} meters wide. A fence goes around it. How long is the fence?`, "m", 5, 12],
  ["💌", "card", (L, W, w) => `${w} glues lace around the edge of a card that is ${L} inches long and ${W} inches wide. How much lace does ${w} use?`, "in", 5, 9],
  ["📘", "book cover", (L, W, w) => `${w} puts tape around the edge of a book cover. The cover is ${L} inches long and ${W} inches wide. How much tape is needed?`, "in", 8, 12],
  ["🏊", "pool", (L, W) => `A pool is ${L} meters long and ${W} meters wide. A rope goes all the way around its edge. How long is the rope?`, "m", 10, 25],
  ["🌼", "flower bed", (L, W) => `A flower bed is ${L} feet long and ${W} feet wide. Stones line its whole edge. How long is the line of stones?`, "ft", 6, 12],
  ["🧺", "picnic blanket", (L, W, w) => `${w} sews a border around a picnic blanket that is ${L} feet long and ${W} feet wide. How long is the border?`, "ft", 5, 8],
  ["🏫", "playground", (L, W, w) => `A playground is ${L} meters long and ${W} meters wide. ${w} walks once around its edge. How far does ${w} walk?`, "m", 20, 50],
  ["🗺️", "map", (L, W, w) => `${w} puts tape around the edge of a map that is ${L} inches long and ${W} inches wide. How much tape does ${w} use?`, "in", 10, 20],
  ["🐔", "chicken yard", (L, W) => `A chicken yard is ${L} meters long and ${W} meters wide. How much fence goes all the way around it?`, "m", 5, 12],
  ["🧩", "puzzle", (L, W, w) => `${w}'s finished puzzle is ${L} inches long and ${W} inches wide. ${w} puts a frame around it. How long is the frame all the way around?`, "in", 12, 24],
];
addBank(8, "math", "perimeter", V25MA8_W, () => {
  const [e, noun, f, u, lo, hi, wlo, whi] = pick(V25MA8_PER), w = V25MA8_who();
  const L = R(lo, hi), W = wlo ? R(wlo, whi) : R(Math.max(2, Math.ceil(lo / 2)), L - 1), P = 2 * (L + W), U = v => `${v} ${u}`;
  if (W >= L) return null;
  if (Math.random() < 0.6) {
    const o = V25MA8_num(P, [
      [L * W, `${L * W} ${u} is ${L} × ${W}, the space inside. Perimeter adds the 4 sides.`],
      [L + W, `${L + W} ${u} adds only two sides. A rectangle has 4 sides.`],
      [2 * L + W, `${2 * L + W} ${u} leaves out one ${W} ${u} side.`],
      [L + 2 * W, `${L + 2 * W} ${u} leaves out one ${L} ${u} side.`],
    ], v => `${L} + ${W} + ${L} + ${W} = ${P}, not ${v}.`, { min: 1, fmt: U });
    return V25MA8_Q(f(L, W, w), bigEmo(e), U(P), o, `Add all 4 sides: ${L} + ${W} + ${L} + ${W} = ${P} ${u}.`, "pe" + e + L + "x" + W);
  }
  const o = V25MA8_num(W, [
    [P - L, `${P - L} ${u} takes away only one long side. Take away both: ${P} − ${L} − ${L}.`],
    [P / 2, `${P / 2} ${u} is half the perimeter: one long side plus one short side.`],
    [P - 2 * L, `${P - 2 * L} ${u} is both short sides together. Each one is half of that.`],
  ], v => `A ${L} by ${v} rectangle has a perimeter of ${2 * (L + v)} ${u}, not ${P} ${u}.`, { min: 1, fmt: U });
  return V25MA8_Q(`A rectangle-shaped ${noun} has a perimeter of ${P} ${u}. It is ${L} ${u} long. How <b>wide</b> is it?`, row(bigEmo(e), rectDims(L, W, { unit: u, labels: false, fill: "#E3F8EE" })), U(W), o, `The two long sides are ${L} + ${L} = ${2 * L}. ${P} − ${2 * L} = ${P - 2 * L}, and ${P - 2 * L} ÷ 2 = ${W} ${u}.`, "pw" + e + P + "_" + L, { say: `A rectangle-shaped ${noun} has a perimeter of ${P} ${u}. It is ${L} ${u} long. How wide is it?` });
});

/* ======================= Time to 5 minutes ======================= */
const V25MA8_ACT = [["⚽", "Soccer practice"], ["🎹", w => `${w}'s piano lesson`], ["🎨", "Art class"], ["📚", "Library time"], ["🏊", w => `${w}'s swim lesson`], ["🥪", "Lunch"], ["🎭", "The school play"], ["🔬", "Science club"],
  ["🥋", w => `${w}'s karate class`], ["🎵", "Music class"], ["📖", "Story time"], ["🏀", "Basketball practice"], ["🎤", "Choir practice"], ["🧩", "Puzzle club"], ["🐶", w => `${w}'s walk with the dog`], ["🌳", "Recess"], ["🚌", "The bus ride to the museum"]];
const V25MA8_EVT = [["🚌", "The school bus comes at", "get to the bus stop"], ["🎬", "The movie starts at", "get to the theater"], ["⚽", "The soccer game starts at", "get to the field"], ["🚂", "The train leaves at", "get to the station"], ["🎂", "The birthday party starts at", "get to the party"], ["📚", "The library opens at", "get to the library"]];
addBank(8, "math", "time5", V25MA8_W, () => {
  const w = V25MA8_who(), k = Math.random();
  if (k < 0.7) {
    const [e, s] = pick(V25MA8_ACT), S = typeof s === "function" ? s(w) : s, t1 = 60 * R(1, 11) + 5 * R(0, 11), d = 5 * R(2, 11), t2 = t1 + d, T1 = V25MA8_tm(t1), T2 = V25MA8_tm(t2), cross = (t1 % 60) + d >= 60;
    if (k < 0.35) {
      const naive = Math.abs((t2 % 60) - (t1 % 60)), F = v => `${v} minutes`;
      const o = V25MA8_num(d, [cross && naive !== d ? [naive, `${naive} minutes just subtracts the minute numbers. Count on from ${T1} to ${T2}.`] : null, [d + 5], [d - 5], [d + 10]],
        v => `From ${T1}, ${v} minutes later is ${V25MA8_tm(t1 + v)}, not ${T2}.`, { min: 5, step: 5, fmt: F });
      return V25MA8_Q(`${S} starts at ${T1} and ends at ${T2}. How many minutes long is it?`, bigEmo(e), F(d), o, `Count on by 5s from ${T1} to ${T2}. That is ${d} minutes.`, "te" + e + T1 + T2);
    }
    const rs = v => { const x = V25MA8_dt(t1, v); return x > 360 ? `${V25MA8_tm(v)} is earlier than ${T1}. When the minutes pass 60, go to the next hour.` : `${V25MA8_tm(v)} is ${x} minutes after ${T1}, not ${d}.`; };
    const C = [cross ? t2 - 60 : null, t1 + 60 !== t2 ? t1 + 60 : null, t2 + 5, t2 - 5, t2 + 10].filter(v => v != null && v !== t2 && v !== t1).map(v => [V25MA8_tm(v), rs(v)]);
    const o = V25MA8_opts(T2, C);
    return V25MA8_Q(`${S} starts at ${T1} and lasts ${d} minutes. What time does it end?`, bigEmo(e), T2, o, `Count on ${d} minutes from ${T1}. It ends at ${T2}.`, "tl" + e + T1 + "+" + d);
  }
  const [e, ev, go] = pick(V25MA8_EVT), t2 = 60 * R(1, 11) + 5 * R(0, 11), d = 5 * R(1, 6), t1 = t2 - d, T1 = V25MA8_tm(t1), T2 = V25MA8_tm(t2);
  const rs = v => { const x = V25MA8_dt(v, t2); return x > 360 || x === 0 ? `${V25MA8_tm(v)} is after ${T2}, so ${w} would be late.` : `${V25MA8_tm(v)} is ${x} minutes before ${T2}, not ${d}.`; };
  const cross = (t2 % 60) < d;
  const C = [t2 + d, cross ? t1 + 60 : null, t1 + 5 !== t2 ? t1 + 5 : null, t1 - 5, t1 - 10].filter(v => v != null && v !== t1 && v !== t2).map(v => [V25MA8_tm(v), rs(v)]);
  const o = V25MA8_opts(T1, C);
  return V25MA8_Q(`${ev} ${T2}. ${w} wants to ${go} ${d} minutes early. What time should ${w} get there?`, bigEmo(e), T1, o, `Count back ${d} minutes from ${T2}. ${w} should get there at ${T1}.`, "tb" + e + T2 + "-" + d);
});

/* ======================= Place value to 1,000 ======================= */
const V25MA8_PV = [
  ["✏️", "pencils", ["box", "boxes"], ["pack", "packs"], "single pencils"], ["🌟", "stickers", ["sheet", "sheets"], ["strip", "strips"], "single stickers"],
  ["📎", "paper clips", ["tub", "tubs"], ["chain", "chains"], "loose paper clips"], ["🍭", "lollipops", ["bag", "bags"], ["pack", "packs"], "single lollipops"],
  ["🎟️", "tickets", ["roll", "rolls"], ["strip", "strips"], "single tickets"], ["🎈", "balloons", ["bag", "bags"], ["pack", "packs"], "single balloons"],
  ["🟦", "cubes", ["flat", "flats"], ["rod", "rods"], "single cubes"], ["🌱", "seeds", ["bag", "bags"], ["packet", "packets"], "loose seeds"],
  ["🥤", "straws", ["box", "boxes"], ["bundle", "bundles"], "single straws"], ["✉️", "envelopes", ["box", "boxes"], ["pack", "packs"], "single envelopes"],
  ["🖍️", "crayons", ["tub", "tubs"], ["box", "boxes"], "single crayons"], ["🔘", "buttons", ["bag", "bags"], ["card", "cards"], "loose buttons"],
  ["🎲", "dice", ["tub", "tubs"], ["cup", "cups"], "single dice"], ["📄", "sheets of paper", ["stack", "stacks"], ["pile", "piles"], "single sheets"],
  ["🥄", "plastic spoons", ["box", "boxes"], ["pack", "packs"], "single spoons"],
];
addBank(8, "math", "place1000", V25MA8_W, () => {
  const [e, things, C1, C2, single] = pick(V25MA8_PV), w = V25MA8_who(), where = pick(["The art room has", "A store has", `${w} has`, "The school closet has"]);
  if (Math.random() < 0.6) {
    const regroup = Math.random() < 0.3; let h, t, o;
    if (regroup) { h = R(1, 7); t = R(10, 19); o = R(1, 9); }
    else { h = R(1, 9); t = R(0, 9); o = R(0, 9); if (t === 0 && o === 0) o = R(2, 9); }
    if (o === 1) o = 2;
    const n = 100 * h + 10 * t + o; if (n > 999) return null;
    const parts = [`${V25MA8_pl(h, C1[0], C1[1])} of 100 ${things}`];
    if (t) parts.push(`${V25MA8_pl(t, C2[0], C2[1])} of 10`); if (o) parts.push(`${o} ${single}`);
    if (Math.random() < 0.4) parts.reverse();
    const cands = [];
    if (regroup) cands.push([100 * h + 10 * (t - 10) + o, `${100 * h + 10 * (t - 10) + o} forgets that ${t} ${C2[1]} of 10 make 1 hundred and ${t - 10} ${t - 10 === 1 ? "ten" : "tens"}.`]);
    if (t !== o) cands.push([100 * h + 10 * o + t, t < 10 ? `${100 * h + 10 * o + t} mixes up the tens and the ones.` : null]);
    if (t === 0) cands.push([10 * h + o, `${10 * h + o} leaves out the empty tens place. Write a 0 for no tens.`]);
    if (o === 0 && t < 10) cands.push([10 * h + t, `${10 * h + t} leaves out the empty ones place. Write a 0 for no ones.`]);
    cands.push([h + t + o, `${h + t + o} just counts the ${C1[1]}, ${C2[1]} and singles. Each ${C1[0]} holds 100.`]);
    const fb = v => `${V25MA8_pl(h, "hundred")}, ${V25MA8_pl(t, "ten")} and ${V25MA8_pl(o, "one")} make ${n}, not ${v}.`;
    const op = V25MA8_num(n, cands.filter(c => c[1]), fb, { min: 1, step: pick([1, 10]), sp: 2, max: 999 });
    return V25MA8_Q(`${where} ${V25MA8_list(parts)}. How many ${things} is that in all?`, bigEmo(e), n, op, regroup ? `${t} tens is 1 hundred and ${t - 10} tens. ${h * 100} + ${t * 10} + ${o} = ${n}.` : `${h * 100} + ${t * 10} + ${o} = ${n}.`, "pv" + e + h + "_" + t + "_" + o + parts[0].slice(0, 2));
  }
  const N = 10 * R(11, 99), ans = N / 10, h = Math.floor(N / 100), td = ans % 10;
  const cands = [[td, `${td} counts only the tens digit. The ${h} ${h === 1 ? "hundred holds" : "hundreds hold"} ${h * 10} more tens.`], [h, `${h} is the hundreds digit, but each hundred is 10 tens.`], [N, `${N} is the number of ${things}, not the number of ${C2[1]}.`]];
  const op = V25MA8_num(ans, cands, v => `${V25MA8_pl(v, C2[0], C2[1])} of 10 hold ${10 * v} ${things}, not ${N}.`, { min: 1 });
  return V25MA8_Q(`${w} has ${N} ${things}. How many ${C2[1]} of 10 can ${w} make?`, bigEmo(e), ans, op, `${N} is ${ans} tens, so ${w} can make ${ans} ${C2[1]} of 10.`, "pt" + e + N);
});

/* ======================= Bar graphs (scaled) ======================= */
const V25MA8_GD = [
  ["Lunch choices", ["🍕", "🌮", "🥗", "🍝"], ["pizza", "tacos", "salad", "pasta"], "votes", (a, b) => `How many fewer votes did ${a} get than ${b}?`, v => `Which lunch got ${v} votes?`],
  ["Instruments we play", ["🥁", "🎸", "🎹", "🎺"], ["drums", "guitar", "piano", "trumpet"], "kids", (a, b) => `How many fewer kids play the ${a} than the ${b}?`, v => `Which instrument do ${v} kids play?`],
  ["Bugs in the garden", ["🐞", "🐝", "🦋", "🐜"], ["ladybugs", "bees", "butterflies", "ants"], "bugs", (a, b) => `How many fewer ${a} than ${b} were counted?`, v => `Which bug was counted ${v} times?`],
  ["Rides at the fair", ["🎠", "🎡", "🎢", "🚂"], ["carousel", "Ferris wheel", "roller coaster", "train"], "rides", (a, b) => `How many fewer rides did the ${a} give than the ${b}?`, v => `Which ride gave ${v} rides?`],
  ["How we get to school", ["🚌", "🚲", "🚗", "🚶"], ["bus", "bike", "car", "foot"], "kids", (a, b) => `How many fewer kids come by ${a} than by ${b}?`, v => `Which way do ${v} kids get to school?`],
  ["Fruit sold at the stand", ["🍑", "🍐", "🍒", "🍋"], ["peaches", "pears", "cherries", "lemons"], "pieces of fruit", (a, b) => `How many fewer ${a} than ${b} were sold?`, v => `Which fruit had ${v} sold?`],
  ["Library books checked out", ["🦖", "🚀", "🐶", "🏰"], ["dinosaur books", "space books", "animal books", "castle books"], "books", (a, b) => `How many fewer ${a} than ${b} were checked out?`, v => `Which kind of book was checked out ${v} times?`],
  ["Pets at the vet", ["🐶", "🐱", "🐰", "🐹"], ["dogs", "cats", "rabbits", "hamsters"], "pets", (a, b) => `How many fewer ${a} than ${b} came to the vet?`, v => `Which kind of pet made ${v} visits?`],
  ["Favorite sea animal", ["🐬", "🦈", "🐢", "🐙"], ["dolphin", "shark", "turtle", "octopus"], "votes", (a, b) => `How many fewer votes did the ${a} get than the ${b}?`, v => `Which sea animal got ${v} votes?`],
  ["Vegetables picked", ["🥕", "🌽", "🥒", "🍅"], ["carrots", "ears of corn", "cucumbers", "tomatoes"], "vegetables", (a, b) => `How many fewer ${a} than ${b} were picked?`, v => `Which vegetable was picked ${v} times?`],
  ["Toys donated", ["🧸", "🚂", "🧩", "⚽"], ["teddy bears", "toy trains", "puzzles", "balls"], "toys", (a, b) => `How many fewer ${a} than ${b} were donated?`, v => `Which kind of toy had ${v} donated?`],
  ["Bake sale treats sold", ["🍪", "🧁", "🍩", "🥧"], ["cookies", "cupcakes", "donuts", "pies"], "treats", (a, b) => `How many fewer ${a} than ${b} were sold?`, v => `Which treat had ${v} sold?`],
  ["Juice choices", ["🍎", "🍊", "🍇", "🍓"], ["apple", "orange", "grape", "strawberry"], "votes", (a, b) => `How many fewer votes did ${a} juice get than ${b} juice?`, v => `Which juice got ${v} votes?`],
  ["Art supplies in the closet", ["🖍️", "✏️", "🖌️", "📏"], ["crayons", "pencils", "paintbrushes", "rulers"], "art supplies", (a, b) => `How many fewer ${a} than ${b} are in the closet?`, v => `The closet has ${v} of which art supply?`],
  ["Animals on the farm", ["🐄", "🐖", "🐑", "🐓"], ["cows", "pigs", "sheep", "chickens"], "animals", (a, b) => `How many fewer ${a} than ${b} live on the farm?`, v => `The farm has ${v} of which animal?`],
  ["Flowers in the garden", ["🌹", "🌻", "🌷", "🌼"], ["roses", "sunflowers", "tulips", "daisies"], "flowers", (a, b) => `How many fewer ${a} than ${b} are in the garden?`, v => `The garden has ${v} of which flower?`],
];
addBank(8, "math", "graphs", V25MA8_W, () => {
  const gi = R(0, V25MA8_GD.length - 1), [title, es, names, noun, fewerQ, whichQ] = V25MA8_GD[gi], sc = pick([2, 5, 10]), vals = shuffle(range(1, 10)).slice(0, 4).map(v => v * sc), vis = MA8V_graph(title, es, vals, sc), f = R(0, 2), key = gi + "|" + sc + "|" + vals.join();
  if (f === 0) {
    const T = vals.reduce((a, b) => a + b, 0), cands = vals.map((v, i) => [T - v, `${T - v} leaves out the ${names[i]} bar. Add all 4 bars.`]);
    const o = V25MA8_num(T, shuffle(cands).slice(0, 3), v => `The bars add up to ${vals.join(" + ")} = ${T}, not ${v}.`, { min: 1, step: sc });
    return V25MA8_Q(`How many ${noun} does the graph show <b>in all</b>?`, vis, T, o, `Add all 4 bars: ${vals.join(" + ")} = ${T}.`, "gt" + key, { say: `How many ${noun} does the graph show in all?` });
  }
  if (f === 1) {
    let a = R(0, 3), b = R(0, 3); while (b === a) b = R(0, 3); if (vals[a] > vals[b]) [a, b] = [b, a];
    const A = vals[a], B = vals[b], d = B - A;
    const o = V25MA8_num(d, [[A + B, `${A + B} adds the two bars. "How many fewer" means subtract.`], [B, `${B} is just the ${names[b]} bar. Take away the ${names[a]} bar.`], [A, `${A} is just the ${names[a]} bar. Subtract it from the ${names[b]} bar.`]],
      v => `${B} − ${A} = ${d}, not ${v}.`, { min: 1, step: sc });
    return V25MA8_Q(fewerQ(names[a], names[b]), vis, d, o, `The ${names[b]} bar is ${B} and the ${names[a]} bar is ${A}. ${B} − ${A} = ${d}.`, "gf" + key + a + b);
  }
  const i = R(0, 3), v = vals[i], m = {};
  names.forEach((n, j) => { if (j !== i) m[n] = `The ${n} bar stops at ${vals[j]}, not ${v}.`; });
  return V25MA8_Q(whichQ(v), vis, names[i], { opts: names.slice(), m }, `The ${names[i]} bar stops at ${v}. Each line counts by ${sc}.`, "gw" + key + i);
});

/* ======================= Word problems (two steps) ======================= */
const V25MA8_WP = [
  () => { const w = V25MA8_who(), a = R(3, 9), b = R(2, 8), p = R(2, 5), t = (a + b) * p;
    return { e: "🍋", q: `${w} sold ${a} cups of lemonade on Saturday and ${b} cups on Sunday. Each cup costs $${p}. How much money did ${w} make?`, a: t, pre: "$", why: `${a} + ${b} = ${a + b} cups, then ${a + b} × $${p} = $${t}.`,
      m: [[a * p + b, `That multiplies only Saturday's cups by $${p}. Add all the cups first: ${a} + ${b}.`], [a + b, `${a + b} is the number of cups. Each cup costs $${p}, so multiply.`], [a + b + p, `That adds the price. Each cup costs $${p}, so multiply.`]] }; },
  () => { const t = R(3, 8), f = R(3, 9), n = R(4, 15), a = t * f + n;
    return { e: "🐠", q: `An aquarium has ${t} tanks with ${f} fish in each tank. Then ${n} new fish arrive. How many fish are there now?`, a, why: `${t} × ${f} = ${t * f} fish, then ${t * f} + ${n} = ${a}.`,
      m: [[t * f, `${t * f} forgets the ${n} new fish.`], [t + f + n, `${t} tanks with ${f} in each means ${t} × ${f}, not ${t} + ${f}.`], [t * (f + n), `The ${n} new fish arrive once, not in every tank.`]] }; },
  () => { const w = V25MA8_who(), g = R(3, 9), k = R(3, 8), x = R(2, 9), a = g * k + x;
    return { e: "🎉", q: `${w} makes ${g} party bags with ${k} toys in each bag. ${w} has ${x} toys left over. How many toys did ${w} start with?`, a, why: `${g} × ${k} = ${g * k} toys in bags, then ${g * k} + ${x} = ${a}.`,
      m: [[g * k, `${g * k} is only the toys in the bags. Add the ${x} left over.`], [g * k - x, `The ${x} extra toys were left over, so add them, don't subtract.`], [g + k + x, `${g} bags with ${k} in each means ${g} × ${k}.`]] }; },
  () => { const w = V25MA8_who(), k = R(3, 8), bags = R(3, 9), tot = k * bags, a1 = R(2, tot - 2), b1 = tot - a1;
    return { e: "🍅", q: `${w} picks ${a1} tomatoes and ${b1} peppers. ${w} puts them all into bags of ${k}. How many bags does ${w} fill?`, a: bags, why: `${a1} + ${b1} = ${tot}, then ${tot} ÷ ${k} = ${bags}.`,
      m: [[tot, `${tot} is all the vegetables. Now put them in bags of ${k}.`], [tot - k, `${tot - k} only takes away one bag. Divide ${tot} by ${k}.`]] }; },
  () => { const a1 = R(20, 60), d = R(5, 25), b1 = a1 + d, t = a1 + b1;
    return { e: "♻️", q: `Room 3 collected ${a1} cans. Room 4 collected ${d} more cans than Room 3. How many cans did both rooms collect?`, a: t, why: `Room 4: ${a1} + ${d} = ${b1}. Both: ${a1} + ${b1} = ${t}.`,
      m: [[b1, `${b1} is only Room 4. Add Room 3's ${a1} cans too.`], [a1 + d, `${a1 + d} is only Room 4. Add Room 3's ${a1} cans too.`], [2 * a1 - d, `Room 4 collected more, so add the ${d}, don't subtract.`]] }; },
  () => { const [A, B] = V25MA8_two(), g1 = R(40, 95), g2 = R(40, 95), s = g1 + g2, c = R(50, s - 5), d = s - c;
    return { e: "🎳", q: `${A} bowled ${g1} points in the first game and ${g2} points in the second game. ${B} bowled ${c} points in all. How many more points did ${A} score?`, a: d, why: `${A}: ${g1} + ${g2} = ${s}. Then ${s} − ${c} = ${d} more.`,
      m: [[s, `${s} is ${A}'s total. Compare it with ${B}'s ${c}.`], [s + c, `${s + c} adds both players. "How many more" means subtract.`], [Math.abs(g1 - c) === d ? -1 : Math.abs(g1 - c), `That uses only ${A}'s first game. Add both games first.`]] }; },
  () => { const k = pick([5, 6, 7, 8]), v = R(3, 8), tot = k * v, t = R(2, Math.min(6, tot - 5)), s = tot - t;
    return { e: "🚐", q: `${s} students and ${t} teachers go on a field trip. Each van holds ${k} people. How many vans are needed?`, a: v, why: `${s} + ${t} = ${tot} people, then ${tot} ÷ ${k} = ${v} vans.`,
      m: [[s % k === 0 ? s / k : -1, `That forgets the ${t} teachers. They ride in the vans too.`], [tot, `${tot} is the number of people, not vans.`], [v + 1, `${v + 1} vans hold ${(v + 1) * k} people, but only ${tot} are going.`]] }; },
  () => { const w = V25MA8_who(), k = R(2, 6), p = R(2, 8), x = R(3, 20), L = k * p + x;
    return { e: "🧶", q: `${w} has ${L} feet of yarn. ${w} cuts ${k} pieces that are each ${p} feet long. How many feet of yarn are left?`, a: x, why: `${k} × ${p} = ${k * p} feet used, then ${L} − ${k * p} = ${x}.`,
      m: [[k * p, `${k * p} feet is the yarn used. Take it away from ${L}.`], [L - p, `${L - p} only takes away one piece. ${w} cut ${k} pieces.`], [L - k - p, `${k} pieces of ${p} feet means ${k} × ${p}, not ${k} + ${p}.`]] }; },
  () => { const w = V25MA8_who(), a1 = R(6, 30), t = 3 * a1;
    return { e: "📖", q: `${w} reads ${a1} pages on Monday. On Tuesday, ${w} reads twice as many pages. How many pages did ${w} read on both days?`, a: t, why: `Tuesday: ${a1} × 2 = ${2 * a1}. Both days: ${a1} + ${2 * a1} = ${t}.`,
      m: [[2 * a1, `${2 * a1} is only Tuesday. Add Monday's ${a1} pages too.`], [a1 + 2, `"Twice as many" means ${a1} × 2, not ${a1} + 2.`], [2 * a1 + 2, `"Twice as many" means ${a1} × 2 on Tuesday, then add Monday.`]] }; },
  () => { const c = R(2, 9), h = R(2, 9), t = 4 * c + 2 * h;
    return { e: "🐄", q: `A farm has ${c} cows and ${h} chickens. Each cow has 4 legs and each chicken has 2 legs. How many legs are there in all?`, a: t, why: `${c} × 4 = ${4 * c} and ${h} × 2 = ${2 * h}. ${4 * c} + ${2 * h} = ${t}.`,
      m: [[4 * (c + h), `${4 * (c + h)} gives every animal 4 legs. Chickens have 2.`], [2 * (c + h), `${2 * (c + h)} gives every animal 2 legs. Cows have 4.`], [c + h, `${c + h} counts the animals, not their legs.`]] }; },
  () => { const w = V25MA8_who(), p = R(2, 5), r = R(2, 6), x = R(1, 9), t = p * r + x;
    return { e: "🎡", q: `Each ride at the fair costs ${p} tickets. ${w} has ${t} tickets and goes on ${r} rides. How many tickets does ${w} have left?`, a: x, why: `${r} × ${p} = ${p * r} tickets used, then ${t} − ${p * r} = ${x}.`,
      m: [[t - r, `${t - r} takes 1 ticket per ride. Each ride costs ${p}.`], [p * r, `${p * r} is the tickets used. Take them away from ${t}.`], [t - p, `${t - p} pays for only 1 ride. ${w} went on ${r}.`]] }; },
  () => { const w = V25MA8_who(), s = R(3, 8), k = R(2, 4), tot = s * k, e = R(1, tot - 2), a = tot - e;
    return { e: "🥪", q: `${w} makes ${s} sandwiches and cuts each one into ${k} pieces. The family eats ${e} pieces. How many pieces are left?`, a, why: `${s} × ${k} = ${tot} pieces, then ${tot} − ${e} = ${a}.`,
      m: [[tot, `${tot} is all the pieces. Take away the ${e} eaten.`], [s + k - e, `${s} sandwiches cut into ${k} means ${s} × ${k}, not ${s} + ${k}.`]] }; },
  () => { const [A, B] = V25MA8_two(), l = R(3, 9), d = R(3, 7), t = l * d, m = R(5, t - 2), a = t - m;
    return { e: "🏊", q: `${A} swims ${l} laps every day for ${d} days. ${B} swims ${m} laps in all. How many more laps did ${A} swim?`, a, why: `${A}: ${l} × ${d} = ${t} laps. Then ${t} − ${m} = ${a} more.`,
      m: [[t, `${t} is ${A}'s total. Compare it with ${B}'s ${m}.`], [t + m, `${t + m} adds both swimmers. "How many more" means subtract.`], [l + d, `${l} laps for ${d} days means ${l} × ${d}.`]] }; },
  () => { const a1 = R(25, 70), d = R(4, a1 - 10), b1 = a1 - d, t = a1 + b1;
    return { e: "🧁", q: `The bake sale sold ${a1} muffins in the morning. In the afternoon it sold ${d} fewer muffins than in the morning. How many muffins did it sell in all?`, a: t, why: `Afternoon: ${a1} − ${d} = ${b1}. In all: ${a1} + ${b1} = ${t}.`,
      m: [[b1, `${b1} is only the afternoon. Add the morning's ${a1} too.`], [2 * a1 + d, `The afternoon sold fewer, so subtract the ${d}, don't add.`], [a1 + d, `"${d} fewer" means ${a1} − ${d} for the afternoon.`]] }; },
  () => { const w = V25MA8_who(), m = R(2, 9), d = R(3, 7), g = m * d + R(3, 30), a = g - m * d;
    return { e: "🚲", q: `${w} bikes ${m} miles a day for ${d} days. ${w}'s goal is ${g} miles. How many more miles does ${w} need to reach the goal?`, a, why: `${m} × ${d} = ${m * d} miles so far, then ${g} − ${m * d} = ${a}.`,
      m: [[m * d, `${m * d} is how far ${w} has biked. Subtract it from ${g}.`], [g - m - d, `${m} miles for ${d} days means ${m} × ${d}, not ${m} + ${d}.`], [g - m, `${g - m} counts only one day of biking.`]] }; },
  () => { const w = V25MA8_who(), p = 10 * R(18, 30), a1 = R(20, 80), b1 = R(20, 80), a = p - a1 - b1;
    return { e: "🧩", q: `A puzzle has ${p} pieces. ${w} puts in ${a1} pieces on Friday and ${b1} pieces on Saturday. How many pieces are left to put in?`, a, why: `${a1} + ${b1} = ${a1 + b1} pieces done, then ${p} − ${a1 + b1} = ${a}.`,
      m: [[p - a1, `${p - a1} forgets Saturday's ${b1} pieces.`], [p - b1, `${p - b1} forgets Friday's ${a1} pieces.`], [a1 + b1, `${a1 + b1} is the pieces done. Take them away from ${p}.`]] }; },
];
function V25MA8_story(list, tag) {
  const s = pick(list)(), pre = s.pre || "", F = v => pre + v;
  const o = V25MA8_num(s.a, s.m.filter(x => x[0] >= 0), v => `${F(v)} is ${Math.abs(v - s.a)} ${v > s.a ? "too many" : "too few"}. Check each step again.`.replace(/too many/, pre ? "too much" : "too many").replace(/too few/, pre ? "too little" : "too few"), { fmt: F, min: 0, sp: Math.max(3, Math.round(s.a / 8)) });
  for (const k in o.m) o.m[k] = o.m[k].replace(/^That /, `${k} `);
  return V25MA8_Q(s.q, bigEmo(s.e), F(s.a), o, s.why, tag + s.q.replace(/\D+/g, "-") + s.e);
}
addBank(8, "math", "wordprob", V25MA8_W, () => V25MA8_story(V25MA8_WP, "wp"));

/* ======================= Comparing fractions ======================= */
const V25MA8_CF = [
  ["🏃", F => `ran ${F} of a mile`, "Who ran farther?", "Who ran a shorter distance?", ""],
  ["💧", F => `drank ${F} of a bottle of water`, "Who drank more water?", "Who drank less water?", "The bottles are the same size."],
  ["🎨", F => `painted ${F} of a fence`, "Who painted more?", "Who painted less?", "The fences are the same size."],
  ["📖", F => `read ${F} of the same book`, "Who read more of the book?", "Who read less of the book?", ""],
  ["🥪", F => `ate ${F} of a sandwich`, "Who ate more?", "Who ate less?", "The sandwiches are the same size."],
  ["🔵", F => `filled ${F} of a jar with beads`, "Who filled more of a jar?", "Who filled less of a jar?", "The jars are the same size."],
  ["🌲", F => `hiked ${F} of the same trail`, "Who hiked farther?", "Who hiked a shorter distance?", ""],
  ["🖍️", F => `colored ${F} of a poster`, "Who colored more?", "Who colored less?", "The posters are the same size."],
  ["🧶", F => `knitted ${F} of a scarf`, "Who knitted more?", "Who knitted less?", "The scarves are the same size."],
  ["🥛", F => `drank ${F} of a glass of milk`, "Who drank more milk?", "Who drank less milk?", "The glasses are the same size."],
  ["🌱", F => `watered ${F} of a garden`, "Who watered more?", "Who watered less?", "The gardens are the same size."],
  ["🏊", F => `swam ${F} of the pool's length`, "Who swam farther?", "Who swam a shorter distance?", ""],
  ["🚲", F => `biked ${F} of a mile`, "Who biked farther?", "Who biked a shorter distance?", ""],
  ["🧩", F => `finished ${F} of a puzzle`, "Who finished more?", "Who finished less?", "The puzzles are the same size."],
  ["🧹", F => `swept ${F} of a room`, "Who swept more?", "Who swept less?", "The rooms are the same size."],
  ["🍫", F => `ate ${F} of a chocolate bar`, "Who ate more chocolate?", "Who ate less chocolate?", "The bars are the same size."],
];
const V25MA8_HALF = [["🍕", "a pizza", "ate"], ["🥧", "a pie", "ate"], ["🌲", "a trail", "hiked"], ["📖", "a book", "read"], ["🖍️", "a coloring page", "colored"], ["🧩", "a puzzle", "finished"], ["🏃", "a race", "ran"], ["🎂", "a cake", "frosted"]];
addBank(8, "math", "comparefrac", V25MA8_W, () => {
  if (Math.random() < 0.6) {
    const [e, act, qm, ql, same] = pick(V25MA8_CF), [A, B] = V25MA8_two(), more = Math.random() < 0.55; let a, b, c, d;
    const sameDen = Math.random() < 0.5;
    if (sameDen) { b = d = pick([3, 4, 5, 6, 8]); a = R(1, b - 1); do { c = R(1, b - 1); } while (c === a); }
    else { a = c = R(1, 3); const ds = [2, 3, 4, 5, 6, 8].filter(x => x > a); b = pick(ds); do { d = pick(ds); } while (d === b); }
    const aBig = a * d > c * b, ans = (more ? aBig : !aBig) ? A : B, SAME = "The same amount";
    const fx = (n, k) => `${n}/${k}`, m = {};
    for (const [X, xn, xd, Y, yn, yd] of [[A, a, b, B, c, d], [B, c, d, A, a, b]]) {
      if (X === ans) continue;
      const less = xn * yd < yn * xd;
      m[X] = sameDen ? `${X}'s ${fx(xn, xd)} is ${less ? "less" : "more"} than ${Y}'s ${fx(yn, yd)}: same-size parts, but ${less ? "fewer" : "more"} of them.`
        : `${X}'s ${fx(xn, xd)} is ${less ? "less" : "more"} than ${Y}'s ${fx(yn, yd)}: ${xd} parts make ${less ? "smaller" : "bigger"} pieces than ${yd} parts.`;
    }
    m[SAME] = `${fx(a, b)} and ${fx(c, d)} are not the same amount, so one of them did ${more ? "more" : "less"}.`;
    const s1 = `${A} ${act(frac(a, b))}. ${B} ${act(frac(c, d))}.${same ? " " + same : ""}`, s1say = `${A} ${act(V25MA8_fw(a, b))}. ${B} ${act(V25MA8_fw(c, d))}.${same ? " " + same : ""}`;
    const big = aBig ? [A, a, b] : [B, c, d], sml = aBig ? [B, c, d] : [A, a, b];
    const why = (sameDen ? `Both are cut into ${b} equal parts, and ${big[1]} parts is more than ${sml[1]}.` : `Both have ${V25MA8_pl(a, "part")}, but cutting into ${big[2]} parts makes bigger pieces than cutting into ${sml[2]}.`) + ` So ${big[0]} did more and ${sml[0]} did less.`;
    return V25MA8_Q(`${s1} <b>${more ? qm : ql}</b>`, bigEmo(e), ans, { opts: [A, B, SAME], m }, why, "cf" + e + [A, a, b, B, c, d, more].join("|"), { say: `${s1say} ${more ? qm : ql}` });
  }
  const [e, obj, verb] = pick(V25MA8_HALF), w = V25MA8_who(), d = pick([3, 4, 6, 8]), k = R(1, d - 1), O = ["more than half", "less than half", "exactly half"];
  const ans = 2 * k > d ? O[0] : 2 * k < d ? O[1] : O[2], hp = d % 2 ? `${(d - 1) / 2} and a half` : String(d / 2), F = `${k}/${d}`;
  const m = {};
  if (ans !== O[0]) m[O[0]] = ans === O[2] ? `${F} is exactly half, because ${k} is half of ${d}.` : `${F} is less than half: half of ${d} parts is ${hp} parts, and ${k} is fewer.`;
  if (ans !== O[1]) m[O[1]] = ans === O[2] ? `${F} is exactly half, because ${k} is half of ${d}.` : `${F} is more than half: half of ${d} parts is ${hp} parts, and ${k} is more.`;
  if (ans !== O[2]) m[O[2]] = `Exactly half of ${d} parts is ${hp} parts, not ${k}.`;
  const why = ans === O[2] ? `Half of ${d} parts is ${hp} parts, and ${w} did ${k}. That is exactly half.` : `Half of ${d} parts is ${hp} parts. ${k} is ${ans === O[0] ? "more" : "fewer"}, so it is ${ans}.`;
  return V25MA8_Q(`${w} ${verb} ${frac(k, d)} of ${obj}. Is that more than half, less than half, or exactly half?`, col(bar(d, k, 280, 36, "#3D7BFF"), bar(2, 1, 280, 36, "#FF7A59")), ans, { opts: O.slice(), m }, why, "ch" + e + k + "/" + d + w, { say: `${w} ${verb} ${V25MA8_fw(k, d)} of ${obj}. Is that more than half, less than half, or exactly half?` });
});

/* ======================= Dollars & cents ======================= */
const V25MA8_BUY = [["🔦", "flashlight", 475], ["🕶️", "pair of sunglasses", 650], ["🎒", "backpack", 895], ["🐠", "goldfish", 235], ["🔭", "toy telescope", 980], ["🌵", "small cactus", 385], ["🔔", "bike bell", 420], ["🎺", "toy trumpet", 715],
  ["⛵", "toy sailboat", 560], ["🧤", "pair of gloves", 590], ["🎲", "board game", 875], ["📓", "sketchbook", 345], ["🔍", "magnifying glass", 290], ["🏓", "ping-pong paddle", 440], ["🥁", "toy drum", 765], ["🌂", "umbrella", 825], ["🎧", "pair of headphones", 950]];
const V25MA8_BANK = [["🐷", w => `${w}'s piggy bank has`], ["👛", w => `${w}'s coin purse has`], ["👖", w => `${w}'s pocket has`], ["✉️", w => `${w}'s lunch money envelope has`]];
addBank(8, "math", "dollars", V25MA8_W, () => {
  const w = V25MA8_who(), k = Math.random();
  if (k < 0.35) {
    const [e, f] = pick(V25MA8_BANK); let b, q, dm, n, p;
    do { b = R(0, 3); q = R(0, 3); dm = R(0, 4); n = R(0, 3); p = R(0, 4); } while ([q, dm, n, p].filter(x => x).length < 2 || 100 * b + 25 * q + 10 * dm + 5 * n + p < 50);
    const t = 100 * b + 25 * q + 10 * dm + 5 * n + p, parts = [];
    if (b) parts.push(V25MA8_pl(b, "one-dollar bill")); if (q) parts.push(V25MA8_pl(q, "quarter")); if (dm) parts.push(V25MA8_pl(dm, "dime")); if (n) parts.push(V25MA8_pl(n, "nickel")); if (p) parts.push(V25MA8_pl(p, "penny", "pennies"));
    const cands = [];
    if (q) cands.push([t - 15 * q, `${V25MA8_$(t - 15 * q)} counts each quarter as 10 cents. A quarter is 25 cents.`]);
    if (n) cands.push([t + 5 * n, `${V25MA8_$(t + 5 * n)} counts each nickel as 10 cents. A nickel is 5 cents.`]);
    if (dm) cands.push([t - 5 * dm, `${V25MA8_$(t - 5 * dm)} counts each dime as 5 cents. A dime is 10 cents.`]);
    if (b) cands.push([t - 100 * b, `${V25MA8_$(t - 100 * b)} leaves out the ${b === 1 ? "dollar bill" : b + " dollar bills"}.`]);
    const o = V25MA8_num(t, shuffle(cands), v => `${V25MA8_$(v)} is ${V25MA8_c(Math.abs(v - t))} too ${v > t ? "much" : "little"}. Count the money again.`, { fmt: V25MA8_$, step: 5, sp: 3, min: 1 });
    const why = [b ? `${b} dollar${b > 1 ? "s" : ""}` : null, q ? `${q} × 25¢ = ${25 * q}¢` : null, dm ? `${dm} × 10¢ = ${10 * dm}¢` : null, n ? `${n} × 5¢ = ${5 * n}¢` : null, p ? `${p}¢` : null].filter(Boolean).join(", ");
    return V25MA8_Q(`${f(w)} ${V25MA8_list(parts)}. How much money is that?`, bigEmo(e), V25MA8_$(t), o, `${why}. In all: ${V25MA8_$(t)}.`, "dc" + e + [b, q, dm, n, p].join("_"));
  }
  if (k < 0.7) {
    const [e, item, price] = pick(V25MA8_BUY), have = 5 * R(10, price / 5 - 4), need = price - have;
    const naive = (Math.floor(price / 100) - Math.floor(have / 100)) * 100 + Math.abs(price % 100 - have % 100);
    const cands = [[have, `${V25MA8_$(have)} is what ${w} already has, not what ${w} still needs.`]];
    if (have % 100 > price % 100 && naive !== need) cands.push([naive, `${V25MA8_$(naive)} takes the smaller cents from the bigger. Trade 1 dollar for 100 cents first.`]);
    const o = V25MA8_num(need, cands, v => `${V25MA8_$(have)} + ${V25MA8_$(v)} = ${V25MA8_$(have + v)}, not ${V25MA8_$(price)}.`, { fmt: V25MA8_$, step: 5, sp: 4, min: 5 });
    return V25MA8_Q(`${w} has ${V25MA8_$(have)}. ${w} wants ${V25MA8_an(item)} that costs ${V25MA8_$(price)}. How much more money does ${w} need?`, bigEmo(e), V25MA8_$(need), o, `${V25MA8_$(price)} − ${V25MA8_$(have)} = ${V25MA8_$(need)}. Check: ${V25MA8_$(have)} + ${V25MA8_$(need)} = ${V25MA8_$(price)}.`, "dn" + e + have);
  }
  let x, y; do { [x, y] = shuffle(V25MA8_BUY).slice(0, 2); } while (x[2] + y[2] >= 2000);
  const pay = x[2] + y[2] < 1000 ? 1000 : 2000, t = x[2] + y[2], ch = pay - t;
  const o = V25MA8_num(ch, [[t, `${V25MA8_$(t)} is what the two things cost, not the change.`], [pay - x[2], `${V25MA8_$(pay - x[2])} forgets to pay for the ${y[1]}.`], [pay - y[2], `${V25MA8_$(pay - y[2])} forgets to pay for the ${x[1]}.`]],
    v => `${V25MA8_$(t)} + ${V25MA8_$(v)} = ${V25MA8_$(t + v)}, not ${V25MA8_$(pay)}.`, { fmt: V25MA8_$, step: 5, sp: 4, min: 5 });
  return V25MA8_Q(`${w} buys ${V25MA8_an(x[1])} for ${V25MA8_$(x[2])} and ${V25MA8_an(y[1])} for ${V25MA8_$(y[2])}. ${w} pays with a $${pay / 100} bill. How much change does ${w} get?`, row(bigEmo(x[0]), bigEmo(y[0])), V25MA8_$(ch), o, `${V25MA8_$(x[2])} + ${V25MA8_$(y[2])} = ${V25MA8_$(t)}, then ${V25MA8_$(pay)} − ${V25MA8_$(t)} = ${V25MA8_$(ch)}.`, "dg" + x[1] + y[1]);
});

/* ======================= Missing factors ======================= */
const V25MA8_ROWS = [["🪑", "chairs", "for the school show"], ["🧁", "cupcakes", "on a big tray"], ["📷", "photos", "on a wall"], ["🌱", "plants", "in the garden"], ["🌟", "stickers", "on a chart"], ["🥫", "cans", "on a shelf"],
  ["🍪", "cookies", "on a baking sheet"], ["🥁", "band members", "for the parade"], ["🚗", "toy cars", "on the rug"], ["📚", "books", "on a display table"], ["🍎", "apples", "in a crate"], ["🌳", "trees", "in an orchard"],
  ["🖼️", "paintings", "on the art wall"], ["🎃", "pumpkins", "at the farm stand"], ["💺", "seats", "in a small theater"], ["🧸", "stuffed animals", "on a shelf"]];
addBank(8, "math", "missingfactor", V25MA8_W, () => {
  const w = V25MA8_who();
  if (Math.random() < 0.6) {
    const [e, things, place] = pick(V25MA8_ROWS); let r, c; do { r = R(2, 9); c = R(2, 9); } while (r === c);
    const N = r * c, S = (a, b) => `${a} rows of ${b}`;
    const C = shuffle([[r, c + 1], [r, c - 1], [r + 1, c], [r - 1, c], [r + 1, c - 1], [r - 1, c + 1], [r + 2, c - 1]]).filter(([a, b]) => a >= 2 && b >= 2 && a <= 10 && b <= 10 && a * b !== N).map(([a, b]) => [S(a, b), `${a} rows of ${b} makes ${a * b} ${things}, not ${N}.`]);
    const o = V25MA8_opts(S(r, c), C);
    return V25MA8_Q(`${w} wants to set up ${N} ${things} ${place} in equal rows. Which way works?`, bigEmo(e), S(r, c), o, `${r} × ${c} = ${N}, so ${r} rows of ${c} uses all ${N} ${things}.`, "mr" + e + N + "_" + r);
  }
  const a = R(2, 10), b = R(2, 9), p = a * b, right = Math.random() < 0.4, claim = right ? a : (a + pick([1, -1]) >= 1 ? a + pick([1, -1]) : a + 1);
  const Y = "Yes", No = v => `No, it is ${v}`, ans = right ? Y : No(a), m = {};
  if (!right) m[Y] = `${claim} × ${b} = ${claim * b}, not ${p}, so ${w} is not right.`;
  const nos = [a, a + 1, a - 1, a + 2, a - 2].filter(v => v >= 1 && v !== claim && !(right && v === a));
  const opts = [ans]; if (!right) opts.push(Y);
  for (const v of nos) { if (opts.length >= 4) break; const s = No(v); if (opts.includes(s)) continue; opts.push(s); m[s] = v === a ? null : `${v} × ${b} = ${v * b}, not ${p}.`; }
  if (right) for (const s of opts) if (s !== ans) { const v = +s.match(/\d+$/)[0]; m[s] = `${w} is right: ${a} × ${b} = ${p}. And ${v} × ${b} = ${v * b}, not ${p}.`; }
  return V25MA8_Q(`${w} says the missing number is <b>${claim}</b>. Is ${w} right?`, eq(`${blank()} × ${b} = ${p}`), ans, { opts: shuffle(opts), m }, `${p} ÷ ${b} = ${a}, because ${a} × ${b} = ${p}.${right ? ` ${w} is right!` : ""}`, "mk" + a + "x" + b + "c" + claim, { say: `${w} says the missing number in blank times ${b} equals ${p} is ${claim}. Is ${w} right?` });
});

/* ======================= Estimating ======================= */
const V25MA8_EST$ = [["🎸", "guitar"], ["🛴", "scooter"], ["🎒", "backpack"], ["⛺", "tent"], ["👟", "pair of sneakers"], ["🧸", "giant teddy bear"], ["🔭", "telescope"], ["📷", "camera"], ["⌚", "watch"], ["🎨", "art kit"],
  ["🧳", "suitcase"], ["🎹", "toy keyboard"], ["🏀", "basketball hoop"], ["🛷", "sled"], ["🎧", "pair of headphones"], ["👢", "pair of rain boots"], ["📻", "radio"]];
const V25MA8_EST3 = [
  ["+", "🦁", (a, b) => `The zoo had ${a} visitors on Saturday and ${b} visitors on Sunday.`, "visitors came in all"],
  ["+", "🚙", (a, b, w) => `${w}'s family drove ${a} miles on Monday and ${b} miles on Tuesday.`, "miles did they drive in all"],
  ["+", "🥫", (a, b) => `Room 2 collected ${a} cans and Room 5 collected ${b} cans.`, "cans did they collect in all"],
  ["+", "👣", (a, b, w) => `${w} walked ${a} steps in the morning and ${b} steps in the afternoon.`, "steps did ${w} walk in all"],
  ["−", "📚", (a, b) => `The library had ${a} books. It gave away ${b} old books.`, "books are left"],
  ["−", "🎟️", (a, b) => `A theater has ${a} seats. ${b} seats are filled.`, "seats are empty"],
  ["−", "🌽", (a, b) => `A farm grew ${a} ears of corn. It sold ${b} ears.`, "ears of corn are left"],
  ["−", "🏃", (a, b) => `A race is ${a} meters long. A runner has run ${b} meters.`, "meters are left to run"],
];
addBank(8, "math", "estimate", V25MA8_W, () => {
  const w = V25MA8_who();
  if (Math.random() < 0.55) {
    let x, y; do { [x, y] = shuffle(V25MA8_EST$).slice(0, 2); } while (x === y);
    let a, b; do { a = R(21, 98); b = R(21, 98); } while ([a, b].some(v => v % 10 === 5 || v % 10 === 0));
    const ra = V25MA8_r10(a), rb = V25MA8_r10(b), est = ra + rb, F = v => "$" + v;
    const o = V25MA8_num(est, [[a + b, `$${a + b} is the exact total. Round each price first, then add.`], [Math.floor(a / 10) * 10 + Math.floor(b / 10) * 10, null], [est + 10], [est - 10]],
      v => `$${a} rounds to $${ra} and $${b} rounds to $${rb}. $${ra} + $${rb} = $${est}, not $${v}.`, { fmt: F, step: 10, sp: 2, min: 10 });
    for (const k in o.m) if (!o.m[k]) o.m[k] = `$${a} rounds to $${ra} and $${b} rounds to $${rb}, so the estimate is $${est}.`;
    return V25MA8_Q(`${w} buys ${V25MA8_an(x[1])} for $${a} and ${V25MA8_an(y[1])} for $${b}. Round each price to the nearest ten dollars. About how much does ${w} spend?`, row(bigEmo(x[0]), bigEmo(y[0])), F(est), o, `$${a} rounds to $${ra} and $${b} rounds to $${rb}. $${ra} + $${rb} = $${est}.`, "e$" + x[1] + a + y[1] + b);
  }
  const [op, e, f, tail] = pick(V25MA8_EST3); let a, b;
  do { a = R(120, 880); b = R(110, 860); if (op === "−" && b > a) [a, b] = [b, a]; } while (Math.floor(a / 10) % 10 === 5 || Math.floor(b / 10) % 10 === 5 || (op === "+" && a + b > 999) || (op === "−" && V25MA8_r100(a) - V25MA8_r100(b) < 100) || V25MA8_r100(a) === a || V25MA8_r100(b) === b);
  const ra = V25MA8_r100(a), rb = V25MA8_r100(b), est = op === "+" ? ra + rb : ra - rb, ex = op === "+" ? a + b : a - b;
  const o = V25MA8_num(est, [[ex, `${ex} is the exact answer. Round each number to the nearest hundred first.`], [op === "+" ? ra - rb : ra + rb, `${op === "+" ? ra - rb : ra + rb} ${op === "+" ? "subtracts" : "adds"}, but this story needs ${op === "+" ? "adding" : "subtracting"}.`], [est + 100], [est - 100]],
    v => `${a} rounds to ${ra} and ${b} rounds to ${rb}. ${ra} ${op} ${rb} = ${est}, not ${v}.`, { step: 100, sp: 2, min: 100 });
  return V25MA8_Q(`${f(a, b, w)} About how many ${tail.replace("${w}", w)}? Round each number to the nearest hundred.`, bigEmo(e), est, o, `${a} rounds to ${ra} and ${b} rounds to ${rb}. ${ra} ${op} ${rb} = ${est}.`, "e3" + e + a + op + b);
});

/* ======================= Add & subtract to 1,000 ======================= */
const V25MA8_AS = [
  ["+", "🏟️", (w, a, b) => `A stadium had ${a} fans in the top seats and ${b} fans in the bottom seats. How many fans were there in all?`],
  ["+", "👣", (w, a, b) => `${w} walked ${a} steps before lunch and ${b} steps after lunch. How many steps is that in all?`],
  ["+", "🥫", (w, a, b) => `Room 12 collected ${a} cans for the food drive. Room 14 collected ${b} cans. How many cans did they collect together?`],
  ["+", "🐦", (w, a, b) => `Bird watchers counted ${a} birds in the morning and ${b} birds in the afternoon. How many birds did they count in all?`],
  ["+", "📸", (w, a, b) => `${w}'s family took ${a} photos at the beach and ${b} photos at the park. How many photos did they take in all?`],
  ["+", "🎃", (w, a, b) => `A farm grew ${a} orange pumpkins and ${b} white pumpkins. How many pumpkins did it grow?`],
  ["+", "🚙", (w, a, b) => `A family drove ${a} miles on Saturday and ${b} miles on Sunday. How many miles did they drive in all?`],
  ["+", "🌸", (w, a, b) => `A park planted ${a} tulips in the spring and ${b} daisies in the summer. How many flowers did it plant?`],
  ["−", "🍿", (w, a, b) => `A movie theater made ${a} bags of popcorn. It sold ${b} bags. How many bags are left?`],
  ["−", "🧱", (w, a, b) => `${w} has ${a} building bricks. ${w} uses ${b} bricks to build a castle. How many bricks are not used?`],
  ["−", "🍬", (w, a, b) => `A candy jar had ${a} jellybeans. ${b} jellybeans were eaten at the party. How many jellybeans are left?`],
  ["−", "🏃", (w, a, b) => `A fun run is ${a} meters long. ${w} has run ${b} meters. How many meters are left?`],
  ["−", "🦋", (w, a, b) => `A garden had ${a} butterflies in July and ${b} butterflies in June. How many more butterflies were there in July?`],
  ["−", "🎤", (w, a, b) => `The school choir sang for ${a} people on Friday and ${b} people on Thursday. How many more people came on Friday?`],
  ["−", "📮", (w, a, b) => `The post office had ${a} letters. It delivered ${b} of them. How many letters are still waiting?`],
  ["−", "🏫", (w, a, b) => `A school has ${a} students. ${b} students ride the bus. How many students do not ride the bus?`],
];
const V25MA8_AS3 = [["♻️", (w, a, b, c) => `${w}'s class recycled ${a} bottles in March, ${b} in April and ${c} in May. How many bottles is that in all?`], ["📖", (w, a, b, c) => `${w} read ${a} pages in June, ${b} in July and ${c} in August. How many pages is that in all?`],
  ["🍎", (w, a, b, c) => `An orchard picked ${a} apples on Monday, ${b} on Tuesday and ${c} on Wednesday. How many apples is that in all?`], ["🐟", (w, a, b, c) => `A fish farm has ${a} fish in one pond, ${b} in another and ${c} in a third. How many fish in all?`]];
addBank(8, "math", "add1000", V25MA8_W, () => {
  const w = V25MA8_who(), re = Math.random() < 0.75;
  if (Math.random() < 0.75) {
    const [op, e, f] = pick(V25MA8_AS);
    if (op === "+") {
      const [a, b] = MA8V_addPair(re), s = a + b, nc = MA8V_noCarry(a, b);
      const o = V25MA8_num(s, [[nc, `${nc} forgets to regroup. When a place adds to 10 or more, carry 1 to the next place.`], [Math.abs(a - b), `${Math.abs(a - b)} subtracts, but this story puts two groups together.`], [s + 10], [s - 100]],
        v => `${a} + ${b} = ${s}. ${v} is ${Math.abs(v - s)} ${V25MA8_mo(v - s)}.`, { step: 10, sp: 2, min: 1 });
      return V25MA8_Q(f(w, a, b), bigEmo(e), s, o, `${a} + ${b} = ${s}. Check: ${s} − ${b} = ${a}.`, "as" + e + a + "+" + b);
    }
    const [a, b] = MA8V_subPair(re), d = a - b, nb = MA8V_noBorrow(a, b);
    const o = V25MA8_num(d, [[nb, `${nb} takes the smaller digit from the bigger one. Trade from the next place instead.`], [a + b, `${a + b} adds, but this story needs subtracting.`], [d + 10], [d + 100]],
      v => `${a} − ${b} = ${d}. Check: ${v} + ${b} = ${v + b}, not ${a}.`, { step: 10, sp: 2, min: 1 });
    return V25MA8_Q(f(w, a, b), bigEmo(e), d, o, `${a} − ${b} = ${d}. Check: ${d} + ${b} = ${a}.`, "as" + e + a + "-" + b);
  }
  const [e, f] = pick(V25MA8_AS3); let a, b, c; do { a = R(100, 450); b = R(25, 350); c = R(15, 300); } while (a + b + c > 999);
  const s = a + b + c;
  const o = V25MA8_num(s, [[a + b, `${a + b} forgets the last number, ${c}. Add all three.`], [b + c, `${b + c} forgets the first number, ${a}. Add all three.`], [s - 10], [s + 100]],
    v => `${a} + ${b} = ${a + b}, then ${a + b} + ${c} = ${s}, not ${v}.`, { step: 10, sp: 2, min: 1 });
  return V25MA8_Q(f(w, a, b, c), bigEmo(e), s, o, `${a} + ${b} = ${a + b}, then ${a + b} + ${c} = ${s}.`, "a3" + e + a + "+" + b + "+" + c);
});

/* ======================= Fractions on a number line ======================= */
const V25MA8_FL = [
  ["🌲", w => `${w} walks on a trail that is 1 mile long.`, w => w, "mile"], ["🐞", () => "A ladybug crawls along a ruler from 0 to 1 inch.", () => "the ladybug", "inch"],
  ["🚲", w => `${w} bikes along a path that is 1 mile long.`, w => w, "mile"], ["🏊", w => `${w} swims one lap of the pool.`, w => w, "lap"],
  ["🐌", () => "A snail slides along a board that is 1 meter long.", () => "the snail", "meter"], ["🚂", () => "A toy train runs on a track that is 1 yard long.", () => "the train", "yard"],
  ["🏃", w => `${w} runs a race that is 1 mile long.`, w => w, "mile"], ["🐿️", () => "A squirrel runs along a fence that is 1 yard long.", () => "the squirrel", "yard"],
  ["🐛", () => "A caterpillar crawls along a stick that is 1 foot long.", () => "the caterpillar", "foot"], ["🚶", w => `${w} walks to school, which is 1 mile away.`, w => w, "mile"],
  ["🐢", () => "A turtle walks along a path that is 1 meter long.", () => "the turtle", "meter"], ["🐸", () => "A frog hops along a log that is 1 meter long.", () => "the frog", "meter"],
  ["🛶", w => `${w} paddles across a lake that is 1 mile wide.`, w => w, "mile"], ["🐜", () => "An ant walks along a ruler that is 1 foot long.", () => "the ant", "foot"],
  ["🦆", () => "A duck swims across a pond that is 1 mile wide.", () => "the duck", "mile"], ["🐕", w => `${w} walks the dog around a block that is 1 mile long.`, w => w, "mile"],
];
addBank(8, "math", "fracline", V25MA8_W, () => {
  const [e, intro, subj, unit] = pick(V25MA8_FL), w = V25MA8_who(), S = subj(w), d = pick([3, 4, 6, 8]), k = R(1, d - 1), left = Math.random() < 0.4, ans = left ? d - k : k;
  const U = (n, dd) => `${frac(n, dd)} ${unit}`, P = (n, dd) => `${n}/${dd}`;
  const cands = [];
  if (left) cands.push([U(k, d), `${P(k, d)} is how far ${S} has already gone, not how far is left.`]);
  else if (d - k !== k) cands.push([U(d - k, d), `${P(d - k, d)} is how far is left to go, not how far ${S} has gone.`]);
  cands.push([U(ans, d + 1), `${P(ans, d + 1)} counts the tick marks. There are ${d} equal spaces, so the bottom is ${d}.`]);
  if (ans > 1) cands.push([U(d, ans), `${P(d, ans)} has the numbers flipped. The bottom is the ${d} equal parts.`]);
  cands.push([U(ans + 1, d), `${P(ans + 1, d)} is one jump too far. Count ${ans} ${ans === 1 ? "jump" : "jumps"}.`]);
  if (ans > 1) cands.push([U(ans - 1, d), `${P(ans - 1, d)} is one jump short. Count ${ans} jumps.`]);
  const o = V25MA8_opts(U(ans, d), cands);
  const s1 = `${intro(w)} The line shows the way from 0 to 1, cut into ${d} equal parts. The dot shows where ${S} is now.`;
  const qq = left ? `How much farther does ${S} have to go to reach the end?` : `How far has ${S} gone?`;
  const why = left ? `The dot is ${k} of ${d} jumps from 0. ${d} − ${k} = ${d - k} ${d - k === 1 ? "jump is" : "jumps are"} left, so ${d - k}/${d} ${unit}.` : `Count the jumps from 0 to the dot: ${k} of ${d} equal parts, so ${k}/${d} ${unit}.`;
  return V25MA8_Q(`${s1} ${cap(qq)}`, row(bigEmo(e), MA8V_line(d, 1, { dot: k })), U(ans, d), o, why, "fl" + e + d + k + left);
});

/* ======================= Story problems ======================= */
const V25MA8_ST = [
  () => { const p = R(12, 60), n = R(3, 15), a = p + n;
    return { e: "🐧", q: `The zoo has ${p} penguins. Then ${n} baby penguins hatch. How many penguins are at the zoo now?`, a, why: `More penguins means add: ${p} + ${n} = ${a}.`,
      m: [[p - n, `${p - n} takes away, but new penguins were added.`], [p, `${p} is before the babies hatched. Add the ${n} babies.`]] }; },
  () => { const k = R(3, 9), d = R(3, 9), a = k * d;
    return { e: "🐘", q: `A baby elephant drinks ${k} buckets of water each day. How many buckets does it drink in ${d} days?`, a, why: `${k} buckets each day for ${d} days: ${k} × ${d} = ${a}.`,
      m: [[k + d, `${k + d} adds, but ${k} buckets for each of ${d} days means ${k} × ${d}.`], [a - k, `${a - k} is only ${d - 1} days. Count all ${d} days.`]] }; },
  () => { const w = V25MA8_who(), k = R(2, 8), e = R(2, 6), n = k * e;
    return { e: "🍉", q: `${w} cuts a watermelon into ${n} slices and shares them equally among ${k} kids. How many slices does each kid get?`, a: e, why: `Sharing equally means divide: ${n} ÷ ${k} = ${e}.`,
      m: [[n - k, `${n - k} takes away ${k}. Sharing among ${k} kids means ${n} ÷ ${k}.`], [k, `${k} is the number of kids, not the slices each one gets.`]] }; },
  () => { const b = R(4, 20), d = R(3, 15), a1 = b + d;
    return { e: "🎻", q: `The school orchestra has ${a1} violins and ${b} cellos. How many more violins than cellos are there?`, a: d, why: `"How many more" means compare: ${a1} − ${b} = ${d}.`,
      m: [[a1 + b, `${a1 + b} adds them. "How many more" means subtract.`], [a1, `${a1} is just the violins. Take away the ${b} cellos.`]] }; },
  () => { const w = V25MA8_who(), k = R(2, 6), each = R(3, 9), rest = k * each, ate = R(2, 12), n = rest + ate;
    return { e: "🧺", q: `${w} picked ${n} berries. ${w} ate ${ate} and put the rest equally into ${k} bowls. How many berries are in each bowl?`, a: each, why: `${n} − ${ate} = ${rest}, then ${rest} ÷ ${k} = ${each}.`,
      m: [[rest, `${rest} is all the berries left. Now share them into ${k} bowls.`], [n % k === 0 ? n / k : -1, `That forgets that ${w} ate ${ate} berries first.`]] }; },
  () => { const w = V25MA8_who(), g = R(2, 6), f = R(2, 6), x = R(3, 25), n = g * f + x;
    return { e: "🃏", q: `${w} has ${n} trading cards. ${w} gives ${g} cards to each of ${f} friends. How many cards does ${w} have left?`, a: x, why: `${g} × ${f} = ${g * f} cards given away, then ${n} − ${g * f} = ${x}.`,
      m: [[n - g - f, `${g} cards to each of ${f} friends means ${g} × ${f}, not ${g} + ${f}.`], [n - g, `${n - g} gives cards to only 1 friend. There are ${f}.`], [g * f, `${g * f} is the cards given away. Take them from ${n}.`]] }; },
  () => { const a1 = R(5, 14), b = R(4, 13), a = a1 + b;
    return { e: "🌧️", q: `It rained on ${a1} days in April and ${b} days in May. How many rainy days were there in both months?`, a, why: `Put them together: ${a1} + ${b} = ${a}.`,
      m: [[Math.abs(a1 - b), `${Math.abs(a1 - b)} subtracts, but "both months" means add.`], [a1, `${a1} is only April. Add May's ${b} days.`]] }; },
  () => { const r = R(2, 9), k = R(3, 9), a = r * k;
    return { e: "🚀", q: `A rocket club launches ${r} rockets each week. How many rockets does it launch in ${k} weeks?`, a, why: `${r} rockets each week for ${k} weeks: ${r} × ${k} = ${a}.`,
      m: [[r + k, `${r + k} adds, but ${r} each week for ${k} weeks means ${r} × ${k}.`], [a + r, `${a + r} is ${k + 1} weeks. Count only ${k}.`]] }; },
  () => { const k = R(2, 5), g = R(3, 9), n = k * g;
    return { e: "🎤", q: `${n} kids sign up for the talent show. They perform in groups of ${k}. How many groups are there?`, a: g, why: `Groups of ${k} means divide: ${n} ÷ ${k} = ${g}.`,
      m: [[n - k, `${n - k} takes away one group. Divide to find how many groups.`], [k, `${k} is how many kids are in each group, not the number of groups.`]] }; },
  () => { const w = V25MA8_who(), d = R(3, 12), x = R(2, 9), a = d + x;
    return { e: "🐶", q: `${w} walks ${d} dogs in the morning. In the afternoon, ${w} walks ${x} more dogs than in the morning. How many dogs does ${w} walk in the afternoon?`, a, why: `"${x} more than ${d}" means ${d} + ${x} = ${a}.`,
      m: [[d - x >= 0 ? d - x : -1, `"More" means add the ${x}, not take it away.`], [d + a, `${d + a} adds the morning dogs too. The question asks only about the afternoon.`]] }; },
  () => { const n = R(40, 95), s = R(12, n - 8), a = n - s;
    return { e: "🥯", q: `A bakery made ${n} bagels and sold ${s} of them. How many bagels are left?`, a, why: `Take away the sold bagels: ${n} − ${s} = ${a}.`,
      m: [[n + s, `${n + s} adds the sold bagels. They are gone, so subtract.`], [s, `${s} is the bagels sold, not the bagels left.`]] }; },
  () => { const w = V25MA8_who(), m0 = R(3, 20), e = R(2, 5), c = R(2, 6), a = m0 + e * c;
    return { e: "🧹", q: `${w} has $${m0}. ${w} earns $${e} for each chore and does ${c} chores. How much money does ${w} have now?`, a, pre: "$", why: `${c} × $${e} = $${e * c} earned, then $${m0} + $${e * c} = $${a}.`,
      m: [[m0 + e + c, `${c} chores at $${e} each means ${c} × $${e}, not ${c} + ${e}.`], [e * c, `$${e * c} is only the money earned. Add the $${m0} ${w} had.`], [m0 + e, `$${m0 + e} pays for only 1 chore. ${w} did ${c}.`]] }; },
  () => { const r = R(3, 8), t = R(3, 9), tot = r * t, c = R(2, tot - 3), a = tot - c;
    return { e: "🌳", q: `An orchard has ${r} rows of trees with ${t} trees in each row. ${c} of the trees are apple trees. The rest are pear trees. How many pear trees are there?`, a, why: `${r} × ${t} = ${tot} trees, then ${tot} − ${c} = ${a} pear trees.`,
      m: [[tot, `${tot} is all the trees. Take away the ${c} apple trees.`], [r + t - c >= 0 ? r + t - c : -1, `${r} rows of ${t} means ${r} × ${t}, not ${r} + ${t}.`]] }; },
  () => { const k = R(2, 8), e = R(2, 7), n = k * e;
    return { e: "🐣", q: `A farmer has ${n} chicks and ${k} pens. She puts the same number of chicks in each pen. How many chicks go in each pen?`, a: e, why: `${n} ÷ ${k} = ${e}, because ${k} × ${e} = ${n}.`,
      m: [[n - k, `${n - k} takes away ${k}. Putting chicks equally in ${k} pens means divide.`], [k, `${k} is the number of pens, not the chicks in each.`]] }; },
  () => { const w = V25MA8_who(), g = R(3, 9), r = R(2, 6), a = g * r;
    return { e: "🎁", q: `${w} wraps ${g} gifts. Each gift needs ${r} feet of ribbon. How many feet of ribbon does ${w} need?`, a, why: `${r} feet for each of ${g} gifts: ${g} × ${r} = ${a}.`,
      m: [[g + r, `${g + r} adds, but ${r} feet for each of ${g} gifts means ${g} × ${r}.`], [a - r, `${a - r} is only ${g - 1} gifts. Count all ${g}.`]] }; },
  () => { const w = V25MA8_who(), b = R(6, 25), x = R(3, 15), n = b + x;
    return { e: "🧁", q: `${n} kids are coming to the party. ${w} has ${b} cupcakes. How many more cupcakes does ${w} need so each kid gets one?`, a: x, why: `Find the difference: ${n} − ${b} = ${x}.`,
      m: [[n + b, `${n + b} adds. Find how many more: ${n} − ${b}.`], [n, `${n} is the number of kids. ${w} already has ${b} cupcakes.`]] }; },
];
addBank(8, "math", "wordstory", V25MA8_W, () => V25MA8_story(V25MA8_ST, "st"));

/* ======================= Line plots ======================= */
const V25MA8_LP = [
  ["Bean plant heights", ["inch", "inches"], "bean plants", 3, 8, v => `are shorter than ${v}`, v => `are ${v} tall or taller`, "How many inches taller is the tallest bean plant than the shortest one?"],
  ["Siblings in each family", ["sibling", "siblings"], "kids", 0, 4, v => `have fewer than ${v}`, v => `have ${v} or more`, "How many more siblings does the kid with the most have than the kid with the fewest?"],
  ["Teeth lost this year", ["tooth", "teeth"], "kids", 0, 5, v => `lost fewer than ${v}`, v => `lost ${v} or more`, "How many more teeth did the kid who lost the most lose than the kid who lost the fewest?"],
  ["Minutes to walk to school", ["minute", "minutes"], "kids", 5, 10, v => `walk fewer than ${v}`, v => `walk ${v} or more`, "How many minutes longer is the longest walk than the shortest walk?"],
  ["Letters in our first names", ["letter", "letters"], "kids", 3, 8, v => `have fewer than ${v} in their names`, v => `have ${v} or more in their names`, "How many more letters does the longest name have than the shortest name?"],
  ["Apples picked", ["apple", "apples"], "kids", 2, 7, v => `picked fewer than ${v}`, v => `picked ${v} or more`, "How many more apples did the top picker pick than the kid who picked the fewest?"],
  ["Laps swum", ["lap", "laps"], "swimmers", 1, 6, v => `swam fewer than ${v}`, v => `swam ${v} or more`, "How many more laps did the top swimmer swim than the swimmer with the fewest?"],
  ["Baskets made", ["basket", "baskets"], "players", 0, 6, v => `made fewer than ${v}`, v => `made ${v} or more`, "How many more baskets did the top player make than the player with the fewest?"],
  ["Worm lengths", ["centimeter", "centimeters"], "worms", 3, 8, v => `are shorter than ${v}`, v => `are ${v} long or longer`, "How many centimeters longer is the longest worm than the shortest worm?"],
  ["Pumpkin weights", ["pound", "pounds"], "pumpkins", 4, 9, v => `weigh less than ${v}`, v => `weigh ${v} or more`, "How many pounds heavier is the heaviest pumpkin than the lightest one?"],
  ["Glasses of water today", ["glass", "glasses"], "kids", 2, 7, v => `drank fewer than ${v}`, v => `drank ${v} or more`, "How many more glasses did the kid who drank the most have than the kid who drank the fewest?"],
  ["Stars earned this week", ["star", "stars"], "kids", 0, 5, v => `earned fewer than ${v}`, v => `earned ${v} or more`, "How many more stars did the top kid earn than the kid with the fewest?"],
  ["Fish caught on each trip", ["fish", "fish"], "fishing trips", 0, 5, v => `caught fewer than ${v}`, v => `caught ${v} or more`, "How many more fish were caught on the best trip than on the trip with the fewest?"],
  ["Feather lengths", ["inch", "inches"], "feathers", 2, 7, v => `are shorter than ${v}`, v => `are ${v} long or longer`, "How many inches longer is the longest feather than the shortest one?"],
  ["Rocks found on a hike", ["rock", "rocks"], "kids", 1, 6, v => `found fewer than ${v}`, v => `found ${v} or more`, "How many more rocks did the top finder find than the kid who found the fewest?"],
  ["Books in each backpack", ["book", "books"], "backpacks", 0, 5, v => `have fewer than ${v}`, v => `have ${v} or more`, "How many more books are in the fullest backpack than in the one with the fewest?"],
];
addBank(8, "math", "lineplot", V25MA8_W, () => {
  const [title, [u1, uN], thing, lo, hi, lessF, atF, rangeQ] = pick(V25MA8_LP);
  let c, vs, tot, has;
  do { c = {}; for (let v = lo; v <= hi; v++) c[v] = R(0, 4); vs = Object.keys(c).map(Number); tot = vs.reduce((s, v) => s + c[v], 0); has = vs.filter(v => c[v] > 0); } while (tot < 8 || has.length < 3);
  const V25ADD = arr => arr.length === 1 ? `there ${arr[0] === 1 ? "is" : "are"} ${arr[0]}` : `${arr.join(" + ")} = ${arr.reduce((a, b) => a + b, 0)}`;
  const vis = V24_linePlot(lo, hi, c, uN, title), key = title + vs.map(v => c[v]).join(""), sum = f => vs.filter(f).reduce((s, v) => s + c[v], 0), U = v => `${v} ${v === 1 ? u1 : uN}`, X = n => `${n} X${n === 1 ? "" : "'s"}`;
  const f = R(0, 2);
  if (f === 0) {
    const v = R(Math.max(lo + 1, 2), hi), ans = sum(x => x < v);
    const o = V25MA8_num(ans, [[sum(x => x <= v), `${sum(x => x <= v)} also counts the ${thing} at ${v}. "Fewer than ${v}" leaves ${v} out.`], [sum(x => x > v), `${sum(x => x > v)} counts the X's to the right of ${v}. Count the left side.`], [tot, `${tot} counts every X. Count only the X's left of ${v}.`]],
      p => `The X's left of ${v} add up to ${ans}, not ${p}.`, { min: 0, sp: 2 });
    return V25MA8_Q(`How many ${thing} <b>${lessF(U(v))}</b>?`, vis, ans, o, `Add the X's left of ${v}: ${V25ADD(vs.filter(x => x < v).map(x => c[x]))}.`, "lf" + key + v, { say: `How many ${thing} ${lessF(U(v))}?` });
  }
  if (f === 1) {
    const v = R(lo + 1, hi), ans = sum(x => x >= v);
    const o = V25MA8_num(ans, [[sum(x => x > v), `${sum(x => x > v)} leaves out the ${thing} at ${v}. "Or more" includes ${v}.`], [sum(x => x < v), `${sum(x => x < v)} counts the X's left of ${v}. Count ${v} and the right side.`], [tot, `${tot} counts every X. Count only from ${v} to the right.`]],
      p => `The X's at ${v} and to its right add up to ${ans}, not ${p}.`, { min: 0, sp: 2 });
    return V25MA8_Q(`How many ${thing} <b>${atF(U(v))}</b>?`, vis, ans, o, `Add the X's at ${v} and to the right: ${V25ADD(vs.filter(x => x >= v).map(x => c[x]))}.`, "la" + key + v, { say: `How many ${thing} ${atF(U(v))}?` });
  }
  const mx = Math.max(...has), mn = Math.min(...has), ans = mx - mn, cmx = c[mx], cmn = c[mn];
  const cands = [];
  if (hi - lo !== ans) cands.push([hi - lo, `${hi - lo} uses the ends of the number line. Use the greatest and least numbers that have X's.`]);
  if (cmx !== cmn) cands.push([Math.abs(cmx - cmn), `${Math.abs(cmx - cmn)} subtracts how many X's there are. Subtract the numbers under the X's.`]);
  cands.push([mx, `${mx} is the greatest number with an X. Subtract the least one, ${mn}.`]);
  cands.push([mx + mn, `${mx + mn} adds ${mx} and ${mn}. To find how many more, subtract.`]);
  const o = V25MA8_num(ans, cands, p => `The greatest is ${mx} and the least is ${mn}: ${mx} − ${mn} = ${ans}, not ${p}.`, { min: 0, sp: 2 });
  return V25MA8_Q(rangeQ, vis, ans, o, `The X's go from ${mn} to ${mx}. ${mx} − ${mn} = ${ans}.`, "lr" + key);
});

/* ======================= Letter equations ======================= */
const V25MA8_EQ = [
  ["+", "🐚", "s", (w, x, c) => `${w} had some shells. ${w} found ${x} more and now has ${c}. Let <b>s</b> be the shells ${w} had at first.`],
  ["−", "🎈", "b", (w, x, c) => `${w} had some balloons. ${x} floated away, and now ${w} has ${c}. Let <b>b</b> be the balloons ${w} had at first.`],
  ["×", "🍪", "c", (w, x, c) => `${w} put the same number of cookies on ${x} plates. There are ${c} cookies in all. Let <b>c</b> be the cookies on each plate.`],
  ["÷", "🛶", "b", (w, x, c) => `${x} campers ride in boats with the same number in each boat. ${c} campers ride in each boat. Let <b>b</b> be the number of boats.`],
  ["+", "📖", "p", (w, x, c) => `${w} read some pages on Monday and ${x} pages on Tuesday. That is ${c} pages in all. Let <b>p</b> be the pages read on Monday.`],
  ["-?", "🍓", "e", (w, x, c) => `A basket had ${x} strawberries. Some were eaten, and ${c} are left. Let <b>e</b> be the strawberries eaten.`],
  ["×", "🚗", "c", (w, x, c) => `Some toy cars have ${c} wheels in all. Each car has ${x} wheels. Let <b>c</b> be the number of cars.`, [4]],
  ["÷", "🎁", "k", (w, x, c) => `${x} toys are shared equally among some kids. Each kid gets ${c} toys. Let <b>k</b> be the number of kids.`],
  ["+", "🐟", "f", (w, x, c) => `A tank had some fish. ${x} more fish were added, and now there are ${c}. Let <b>f</b> be the fish at first.`],
  ["−", "🍎", "a", (w, x, c) => `${w} picked some apples, gave ${x} to friends, and has ${c} left. Let <b>a</b> be the apples ${w} picked.`],
  ["×", "🌷", "t", (w, x, c) => `A garden has ${x} rows with the same number of tulips in each row. There are ${c} tulips. Let <b>t</b> be the tulips in each row.`],
  ["÷", "📦", "b", (w, x, c) => `${x} books are packed into boxes with ${c} books in each box. Let <b>b</b> be the number of boxes.`],
  ["+", "🧩", "p", (w, x, c) => `${w} has put in some puzzle pieces. ${x} pieces are still left, and the puzzle has ${c} pieces. Let <b>p</b> be the pieces put in.`],
  ["-?", "🎟️", "u", (w, x, c) => `${w} had ${x} tickets and used some at the fair. Now ${w} has ${c} left. Let <b>u</b> be the tickets used.`],
  ["×", "🐞", "n", (w, x, c) => `Some ladybugs have ${c} legs in all. Each ladybug has ${x} legs. Let <b>n</b> be the number of ladybugs.`, [6]],
  ["+", "🐦", "b", (w, x, c) => `Some birds sat on a wire. ${x} more birds landed, and now there are ${c}. Let <b>b</b> be the birds at first.`],
];
function V25MA8_eqv2(t, v) { /* value of the left side when the letter is v */
  if (t.op === "+") return v + t.x; if (t.op === "−") return v - t.x; if (t.op === "-?") return t.x - v;
  if (t.op === "×") return t.x * v; if (t.op === "÷") return v > 0 && t.x % v === 0 ? t.x / v : null; return null;
}
addBank(8, "math", "equations", V25MA8_W, () => {
  const w = V25MA8_who();
  if (Math.random() < 0.7) {
    const [op, e, L, f, fixed] = pick(V25MA8_EQ); let x, c, ans, s;
    if (op === "+") { ans = R(5, 60); x = R(3, 40); c = ans + x; s = `${L} + ${x} = ${c}`; }
    else if (op === "−") { c = R(5, 50); x = R(3, 30); ans = c + x; s = `${L} − ${x} = ${c}`; }
    else if (op === "-?") { ans = R(3, 30); c = R(4, 40); x = ans + c; s = `${x} − ${L} = ${c}`; }
    else if (op === "×") { x = fixed ? fixed[0] : R(2, 9); ans = R(2, 10); c = x * ans; s = `${x} × ${L} = ${c}`; }
    else { ans = R(2, 9); c = R(2, 9); x = ans * c; s = `${x} ÷ ${L} = ${c}`; }
    const T = { op, x }, sub = v => s.split(" = ")[0].replace(L, v);
    const fb = v => { const r = V25MA8_eqv2(T, v); return r == null ? `${sub(v)} doesn't make a whole number, so ${L} can't be ${v}.` : `If ${L} were ${v}, then ${sub(v)} = ${r}, not ${c}.`; };
    const cands = op === "+" ? [[c + x, `${c + x} adds ${x} again. Undo + by subtracting: ${c} − ${x}.`], [c, `${c} is the total. ${L} is the part that goes with ${x}.`]]
      : op === "−" ? [[c - x >= 0 ? c - x : -1, `${c - x} subtracts again. Undo − by adding: ${c} + ${x}.`], [c, `${c} is what was left. ${L} is the amount at the start, which is bigger.`]]
      : op === "-?" ? [[x + c, `${x + c} adds. ${L} is what was taken away: ${x} − ${c}.`], [c, `${c} is what was left, not what was taken away.`]]
      : op === "×" ? [[c - x, `${c - x} subtracts. Undo × by dividing: ${c} ÷ ${x}.`], [c, `${c} is the total. Divide it by ${x}.`]]
      : [[x - c, `${x - c} subtracts. Think: ${c} × what = ${x}?`], [c, `${c} is how many in each one, not ${L}.`]];
    const o = V25MA8_num(ans, cands.map(([v, r]) => [v, r]), fb, { min: 1, sp: 3 });
    const why = op === "+" ? `${c} − ${x} = ${ans}. Check: ${ans} + ${x} = ${c}.` : op === "−" ? `${c} + ${x} = ${ans}. Check: ${ans} − ${x} = ${c}.` : op === "-?" ? `${x} − ${c} = ${ans}. Check: ${x} − ${ans} = ${c}.` : op === "×" ? `${c} ÷ ${x} = ${ans}, because ${x} × ${ans} = ${c}.` : `${x} ÷ ${ans} = ${c}, because ${ans} × ${c} = ${x}.`;
    const story = f(w, x, c);
    return V25MA8_Q(`${story} What is <b>${L}</b>?`, row(bigEmo(e), eq(s)), ans, o, why, "eq" + e + s, { say: `${story.replace(/<[^>]+>/g, "")} ${s.replace("×", "times").replace("÷", "divided by").replace("−", "minus").replace("+", "plus").replace("=", "equals")}. What is ${L}?` });
  }
  const a = R(2, 5), n = R(2, 9), b = R(1, 9), plus = Math.random() < 0.6, c = plus ? a * n + b : a * n - b;
  if (c <= 0) return null;
  const s = `${a} × n ${plus ? "+" : "−"} ${b} = ${c}`, mid = plus ? c - b : c + b, sub = v => `${a} × ${v} ${plus ? "+" : "−"} ${b}`, val = v => plus ? a * v + b : a * v - b;
  const cands = [[mid, `${mid} is ${a} × n. Now divide by ${a} to find n.`]];
  const wrongMid = plus ? c + b : c - b; if (wrongMid > 0 && wrongMid % a === 0) cands.push([wrongMid / a, `${wrongMid / a} comes from ${plus ? "adding" : "subtracting"} ${b} instead of undoing it. ${plus ? "Subtract" : "Add"} ${b} first.`]);
  if (c % a === 0) cands.push([c / a, `${c / a} divides first. Undo the ${plus ? "+" : "−"} ${b} before you divide.`]);
  const o = V25MA8_num(n, cands, v => `If n were ${v}, then ${sub(v)} = ${val(v)}, not ${c}.`, { min: 1, sp: 2 });
  const story = `${w} thinks of a mystery number n. ${w} multiplies it by ${a}, then ${plus ? "adds" : "subtracts"} ${b}. The answer is ${c}.`;
  return V25MA8_Q(`${story} What is <b>n</b>?`, eq(s), n, o, `${plus ? `${c} − ${b}` : `${c} + ${b}`} = ${mid}, then ${mid} ÷ ${a} = ${n}. Check: ${sub(n)} = ${c}.`, "e2" + s, { say: `${story} What is n?` });
});

/* ---------- wrong-answer reasons for every topic above ---------- */
for (const id of ["mult", "div", "fractions", "rounding", "perimeter", "time5", "place1000", "graphs", "wordprob", "comparefrac", "dollars", "missingfactor", "estimate", "add1000", "fracline", "wordstory", "lineplot", "equations"]) whyRule(8, "math", id, V25MA8_why);

