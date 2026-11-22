/* =====================================================================
   v25 · Age 7 Math (tag V25MA7_)
   New real-life word problems and formats for every age-7 math topic.
   Every new question carries q.v25 = { wn: { option: reason } , ... };
   the wrong-answer rule reads only q.v25 and returns null for other questions.
   ===================================================================== */
const V25MA7_NAMES = ["Ana", "Ben", "Jada", "Luis", "Mei", "Theo", "Priya", "Owen", "Rosa", "Eli", "Hana", "Malik", "Ivy", "Diego", "Nina", "Sami"];
const V25MA7_nm = () => pick(V25MA7_NAMES);
const V25MA7_nms = k => shuffle(V25MA7_NAMES).slice(0, k);
const V25MA7_s = (n, one, many) => `${n} ${n === 1 ? one : many}`;
const V25MA7_mo = (v, a) => v > a ? "more" : "less";
const V25MA7_an = w => (/^[aeiou]/i.test(w) ? "an " : "a ") + w;
/* numeric options: ans + [[value, reason], ...] in priority order, filled with fb(value) reasons */
function V25MA7_num(ans, cands, fb, o = {}) {
  const f = o.f || (v => String(v)), min = o.min == null ? 0 : o.min, max = o.max == null ? Infinity : o.max, n = o.n || 4;
  const out = [f(ans)], wn = {};
  for (const [v, r] of cands) {
    if (out.length >= n) break;
    if (v == null || !Number.isInteger(v) || v === ans || v < min || v > max) continue;
    const s = f(v); if (out.includes(s)) continue; out.push(s); wn[s] = r;
  }
  const gen = o.gen || (() => ans + (Math.random() < 0.5 ? -1 : 1) * R(1, o.sp || 3));
  let g = 0;
  while (out.length < n && g++ < 200) {
    const v = gen(); if (!Number.isInteger(v) || v === ans || v < min || v > max) continue;
    const s = f(v); if (out.includes(s)) continue; out.push(s); wn[s] = fb(v);
  }
  return { opts: shuffle(out), wn };
}
/* text options: ans + [[option, reason], ...] */
function V25MA7_txt(ans, cands, n = 4) {
  const out = [ans], wn = {};
  for (const [s, r] of cands) { if (out.length >= n) break; if (!s || out.includes(s)) continue; out.push(s); wn[s] = r; }
  return { opts: shuffle(out), wn };
}
const V25MA7_to = (t, o) => `${V25MA7_s(t, "ten", "tens")} and ${V25MA7_s(o, "one", "ones")}`;
const V25MA7_rule = (q, p) => { const x = q && q.v25; if (!x || !x.wn) return null; return x.wn[p] || x.wn[xPlain(p)] || null; };

/* ---------------- Tens and Ones: packs of 10 ---------------- */
const V25MA7_PACKS = [["pencils", "pencil", "box", "boxes"], ["crayons", "crayon", "box", "boxes"], ["straws", "straw", "bundle", "bundles"], ["craft sticks", "craft stick", "bundle", "bundles"], ["stickers", "sticker", "sheet", "sheets"], ["stamps", "stamp", "sheet", "sheets"], ["beads", "bead", "string", "strings"], ["markers", "marker", "pack", "packs"], ["juice boxes", "juice box", "pack", "packs"], ["tickets", "ticket", "strip", "strips"], ["buttons", "button", "card", "cards"], ["balloons", "balloon", "bag", "bags"], ["trading cards", "trading card", "pack", "packs"], ["paper cups", "paper cup", "stack", "stacks"], ["glow sticks", "glow stick", "tube", "tubes"], ["toy cars", "toy car", "case", "cases"]];
addBank(7, "math", "place", 0.3, () => {
  const [it, i1, p1, pp] = pick(V25MA7_PACKS), who = V25MA7_nm(), k = R(0, 3), pk = n => V25MA7_s(n, p1, pp);
  if (k <= 1) {
    const t = k === 0 ? R(1, 9) : R(1, 7), o = k === 0 ? R(1, 9) : R(11, 19), n = 10 * t + o;
    const loose = V25MA7_s(o, "loose " + i1, "loose " + it);
    const cands = k === 0 ? [
      [o * 10 + t, `${o * 10 + t} is ${V25MA7_to(o, t)}. The tens and ones got switched.`],
      [t + o, `${t + o} counts each ${p1} as 1, but each ${p1} holds 10.`],
      [t * 10, `${t * 10} is only the ${pp}. Add the ${loose} too.`],
      [n + 10, `${n + 10} would need ${pk(t + 1)}, but ${who} has ${pk(t)}.`]]
      : [[n - 10, `${n - 10} forgets that ${o} loose ${it} make 1 more ten.`],
        [t + o, `${t + o} counts each ${p1} as 1, but each ${p1} holds 10.`],
        [t * 10, `${t * 10} is only the ${pp}. Add the ${o} loose ${it} too.`],
        [n + 10, `${n + 10} is 10 more than ${t * 10} + ${o}.`]];
    const { opts, wn } = V25MA7_num(n, cands, v => `${v} is ${Math.abs(v - n)} ${V25MA7_mo(v, n)} than ${t * 10} + ${o}.`, { min: 1 });
    const why = k === 0 ? `${pk(t)} of 10 make${t === 1 ? "s" : ""} ${t * 10}. ${t * 10} + ${o} = ${n}.` : `${o} loose ${it} are ${V25MA7_to(1, o - 10)}. ${t * 10} + ${o} = ${n}.`;
    return { q: `${who} has ${pk(t)} of 10 ${it} and ${loose}. How many ${it} does ${who} have?`, opts, ans: String(n), big: 1, why, key: "v25pb" + k + it + t + "_" + o, v25: { f: "build", wn } };
  }
  if (k === 2) {
    const n = R(11, 99), t = Math.floor(n / 10), o = n % 10;
    const { opts, wn } = V25MA7_num(t, [
      [o, `${o} is the ones digit: the ${it} left over, not full ${pp}.`],
      [t + 1, `${pk(t + 1)} would need ${(t + 1) * 10} ${it}, but there are only ${n}.`],
      [n, `${n} is all the ${it}, not the number of ${pp}.`],
      [t - 1, `${pk(t - 1)} ${t - 1 === 1 ? "holds" : "hold"} only ${(t - 1) * 10}. ${who} can fill one more.`]],
      v => `${n} has ${V25MA7_s(t, "ten", "tens")}, so ${who} can't fill ${pk(v)}.`, { min: 1 });
    return { q: `${who} has ${n} ${it}. ${cap(pp)} hold 10 each. How many full ${pp} can ${who} fill?`, opts, ans: String(t), big: 1, why: `${n} is ${V25MA7_to(t, o)}, so ${who} can fill ${pk(t)}.`, key: "v25pf" + it + n, v25: { f: "full", wn } };
  }
  let n; do { n = R(11, 99); } while (n % 10 === 0);
  const t = Math.floor(n / 10), o = n % 10;
  const { opts, wn } = V25MA7_num(o, [
    [t, `${t} is the number of full ${pp}, not the ${it} left over.`],
    [10, `10 left over would fill another ${p1}.`],
    [n, `${n} is all the ${it}. Only the ones are left over.`]],
    v => `${n} is ${V25MA7_to(t, o)}, so ${o} ${o === 1 ? "is" : "are"} left, not ${v}.`, { min: 0 });
  return { q: `${who} has ${n} ${it} and puts them in ${pp} of 10. How many ${it} are left over?`, opts, ans: String(o), big: 1, why: `${n} is ${V25MA7_to(t, o)}. The ${o} ${o === 1 ? "one is" : "ones are"} left over.`, key: "v25pl" + it + n, v25: { f: "left", wn } };
});
whyRule(7, "math", "place", V25MA7_rule);

/* ---------------- Adding to 100: new word problems ---------------- */
const V25MA7_JOIN = [
  (a, b) => `A farm stand sold ${a} ears of corn in the morning and ${b} in the afternoon. How many ears of corn did it sell?`,
  (a, b) => `The school library got ${a} new books in May and ${b} new books in June. How many new books did it get?`,
  (a, b, n) => `${n} read for ${a} minutes on Monday and ${b} minutes on Tuesday. How many minutes did ${n} read?`,
  (a, b) => `Our class collected ${a} cans for the food drive. The class next door collected ${b} cans. How many cans in all?`,
  (a, b, n) => `${n} took ${a} steps to the mailbox, then ${b} more steps to the park. How many steps in all?`,
  (a, b) => `A bakery made ${a} blueberry muffins and ${b} banana muffins. How many muffins did it make?`,
  (a, b, n) => `At the fair, ${n} won ${a} tickets at one game and ${b} tickets at another. How many tickets did ${n} win?`,
  (a, b) => `There are ${a} kids in the gym and ${b} kids on the playground. How many kids is that?`,
  (a, b) => `A garden has ${a} red tulips and ${b} yellow tulips. How many tulips are there?`,
  (a, b, n) => `${n} scored ${a} points in the first game and ${b} points in the second game. How many points in all?`,
  (a, b) => `A pet store has ${a} goldfish in one tank and ${b} goldfish in another tank. How many goldfish is that?`,
  (a, b) => `The art room has ${a} paintbrushes in one jar and ${b} paintbrushes in another jar. How many paintbrushes are there in all?`,
  (a, b) => `A train has ${a} people in the first car and ${b} people in the second car. How many people are on the train?`,
  (a, b, n) => `${n} made ${a} paper snowflakes and a friend made ${b}. How many snowflakes did they make?`,
  (a, b) => `The lemonade stand sold ${a} cups on Saturday and ${b} cups on Sunday. How many cups were sold?`,
  (a, b) => `A choir has ${a} singers in the front row and ${b} singers in the back row. How many singers?`];
const V25MA7_THINGS = ["acorns", "pinecones", "ribbons", "postcards", "bottle caps", "rocks", "pom-poms", "comic books", "feathers", "puzzle pieces", "paper cranes", "toy dinosaurs", "jelly beans", "gold stars", "bookmarks", "seashells"];
addBank(7, "math", "add100", 0.3, () => {
  const more = Math.random() < 0.35, [n1, n2] = V25MA7_nms(2);
  const a = R(12, 80), b = more ? R(5, Math.min(40, 99 - a)) : R(10, 99 - a), s = a + b;
  const slip = (Math.floor(a / 10) + Math.floor(b / 10)) * 10 + (a % 10 + b % 10) % 10;
  const cands = [
    [slip, `${slip} forgets to carry the ten from ${a % 10} + ${b % 10} = ${a % 10 + b % 10}.`],
    [s + 10, `${s + 10} is 10 more than ${a} + ${b}. Check the tens.`],
    [s - 10, `${s - 10} is 10 less than ${a} + ${b}. Check the tens.`]];
  let q, key, why = `Put them together: ${a} + ${b} = ${s}.`;
  if (more) {
    const th = pick(V25MA7_THINGS);
    cands.unshift([b, `${b} is how many more ${n2} has, not ${n2}'s total.`], [Math.abs(a - b), `${Math.abs(a - b)} subtracts, but "${b} more than" means add ${b}.`]);
    q = `${n1} has ${a} ${th}. ${n2} has ${b} more ${th} than ${n1}. How many ${th} does ${n2} have?`;
    why = `${b} more than ${a} means add: ${a} + ${b} = ${s}.`;
    key = "v25am" + th + n1 + n2 + a + "+" + b;
  } else {
    const i = R(0, V25MA7_JOIN.length - 1);
    cands.push([a, `${a} is just the first part. Add the ${b} too.`]);
    q = V25MA7_JOIN[i](a, b, n1); key = "v25aj" + i + n1 + a + "+" + b;
  }
  const { opts, wn } = V25MA7_num(s, cands, v => `${v} is ${Math.abs(v - s)} ${V25MA7_mo(v, s)} than ${a} + ${b}.`, { min: 1 });
  return { q, opts, ans: String(s), big: 1, why, key, v25: { f: "add", a, b, wn } };
});
whyRule(7, "math", "add100", V25MA7_rule);

/* ---------------- Subtracting to 100: take away, compare, how many more ---------------- */
const V25MA7_TAKE = [
  (a, b) => `A bakery made ${a} bagels. It sold ${b} of them. How many bagels are left?`,
  (a, b) => `There were ${a} balloons at the party. ${b} floated away. How many balloons are left?`,
  (a, b, n) => `${n} had ${a} stickers and used ${b} on a poster. How many stickers are left?`,
  (a, b, n) => `A tree had ${a} apples. ${n} picked ${b} of them. How many apples are still on the tree?`,
  (a, b) => `The parking lot had ${a} cars. ${b} cars drove away. How many cars are still there?`,
  (a, b) => `A jar had ${a} jelly beans. The class ate ${b}. How many jelly beans are left?`,
  (a, b, n) => `A puzzle has ${a} pieces. ${n} has put in ${b}. How many pieces are left to put in?`,
  (a, b) => `${a} people were at the pool. ${b} people went home. How many people are still at the pool?`,
  (a, b) => `A roll had ${a} raffle tickets. ${b} tickets were given out. How many tickets are left?`,
  (a, b) => `A farmer had ${a} eggs. ${b} eggs were sold at the market. How many eggs are left?`,
  (a, b, n) => `${n} has ${a} cents and spends ${b} cents. How many cents are left?`,
  (a, b) => `A plane has ${a} seats. ${b} people have sat down. How many seats are still empty?`,
  (a, b, n) => `A bag had ${a} pretzels. ${n}'s family ate ${b}. How many pretzels are left?`,
  (a, b, n) => `A cart had ${a} library books. ${n} put ${b} back on the shelves. How many are still on the cart?`,
  (a, b) => `A box holds ${a} crayons. ${b} crayons are in it now. How many more crayons fit?`,
  (a, b) => `A song has ${a} words. The class has learned ${b} words. How many words are left to learn?`];
const V25MA7_CMP = [["picked", "pick", "strawberries"], ["read", "read", "pages"], ["scored", "score", "points"], ["folded", "fold", "paper cranes"], ["found", "find", "acorns"], ["sold", "sell", "raffle tickets"], ["planted", "plant", "seeds"], ["painted", "paint", "rocks"], ["jumped rope", "jump rope", "times"]];
addBank(7, "math", "sub100", 0.3, () => {
  const a = R(30, 99), b = R(10, a - 5), d = a - b, [n1, n2] = V25MA7_nms(2), cmp = Math.random() < 0.35;
  const slip = (Math.floor(a / 10) - Math.floor(b / 10)) * 10 + Math.abs(a % 10 - b % 10);
  const cands = [[slip, `${slip} does ${b % 10} − ${a % 10} in the ones. Borrow a ten first.`]];
  let q, key;
  if (cmp) {
    const [v, base, u] = pick(V25MA7_CMP);
    q = u === "times" ? `${n1} jumped rope ${a} times. ${n2} jumped rope ${b} times. How many more times did ${n1} jump?`
      : `${n1} ${v} ${a} ${u}. ${n2} ${v} ${b} ${u}. How many more ${u} did ${n1} ${base}?`;
    cands.push([a + b, `${a + b} adds them. To find how many more, subtract.`], [a, `${a} is ${n1}'s whole amount, not how many more.`], [b, `${b} is ${n2}'s amount, not how many more.`]);
    key = "v25sc" + u + n1 + n2 + a + "-" + b;
  } else {
    const i = R(0, V25MA7_TAKE.length - 1);
    q = V25MA7_TAKE[i](a, b, n1);
    cands.push([a + b, `${a + b} adds the numbers. This story needs ${a} − ${b}.`], [a, `${a} is the whole amount. Subtract the ${b}.`]);
    key = "v25st" + i + n1 + a + "-" + b;
  }
  cands.push([d + 10, `${d + 10} is 10 more than ${a} − ${b}. Check the tens.`], [d - 10, `${d - 10} is 10 less than ${a} − ${b}. Check the tens.`]);
  const { opts, wn } = V25MA7_num(d, cands, v => `${v} is ${Math.abs(v - d)} ${V25MA7_mo(v, d)} than ${a} − ${b}.`, { min: 0 });
  const why = a % 10 < b % 10 ? `${a} − ${b} = ${d}. Borrow a ten: ${a % 10 + 10} − ${b % 10} = ${a % 10 + 10 - b % 10} ones.` : `${a} − ${b} = ${d}.`;
  return { q, opts, ans: String(d), big: 1, why, key, v25: { f: "sub", a, b, wn } };
});
whyRule(7, "math", "sub100", V25MA7_rule);

/* ---------------- Half past: how long, when does it end / start ---------------- */
const V25MA7_ACTS = ["Soccer practice", "The piano lesson", "Story time at the library", "Swim class", "Art class", "The puppet show", "Karate class", "The baking class", "Dance class", "The school play", "Music class", "Gymnastics", "The bike parade", "The family picnic", "The science show", "Chess club"];
const V25MA7_HRS = [8, 9, 10, 11, 1, 2, 3, 4, 5];
const V25MA7_t = m => { m = ((m % 720) + 720) % 720; return `${Math.floor(m / 60) || 12}:${pad2(m % 60)}`; };
const V25MA7_dur = m => { const h = Math.floor(m / 60), r = m % 60; return [h ? `${h} hour${h > 1 ? "s" : ""}` : "", r ? `${r} minutes` : ""].filter(Boolean).join(" and ") || "0 minutes"; };
addBank(7, "math", "halfhour", 0.3, () => {
  const act = pick(V25MA7_ACTS), h = pick(V25MA7_HRS), mm = pick([0, 30]), s = (h % 12) * 60 + mm, d = pick([30, 30, 60, 60, 90, 120]), e = s + d, k = R(0, 2);
  const T = V25MA7_t, D = V25MA7_dur;
  if (k === 0) {
    const ans = T(e), cands = [];
    for (const v of [s, s + d + (d === 30 ? 30 : -30), s - d, s + d + 60, s + d + 30, s + d - 60]) {
      const p = T(v), diff = ((v - s) % 720 + 720) % 720;
      if (p === ans) continue;
      cands.push([p, diff === 0 ? `${p} is when it starts, not when it ends.` : diff > 360 ? `${p} is before ${T(s)}, but it ends after it starts.` : `${p} is ${D(diff)} after ${T(s)}, not ${D(d)}.`]);
    }
    const { opts, wn } = V25MA7_txt(ans, cands);
    const why = d === 30 ? `30 minutes after ${T(s)} is ${ans}.` : d === 60 ? `1 hour after ${T(s)}, the hour goes up by 1: ${ans}.` : d === 90 ? `1 hour after ${T(s)} is ${T(s + 60)}. 30 more minutes is ${ans}.` : `1 hour after ${T(s)} is ${T(s + 60)}. 1 more hour is ${ans}.`;
    return { q: `${act} starts at ${T(s)}. It lasts ${D(d)}. What time does it end?`, vis: clock(h, mm), opts, ans, big: 1, why, key: "v25he" + act + s + "_" + d, v25: { f: "end", wn } };
  }
  if (k === 1) {
    const ans = D(d), cands = [30, 60, 90, 120].filter(x => x !== d).map(x => [D(x), `${D(x)} after ${T(s)} would be ${T(s + x)}, not ${T(e)}.`]);
    const { opts, wn } = V25MA7_txt(ans, cands);
    return { q: `${act} starts at ${T(s)} and ends at ${T(e)}. How long does it last?`, opts, ans, why: d === 30 ? `From ${T(s)} to ${T(e)} the long hand goes halfway around: 30 minutes.` : `From ${T(s)} to ${T(s + 60)} is 1 hour. ${d === 60 ? "So it lasts 1 hour." : d === 90 ? `${T(s + 60)} to ${T(e)} is 30 more minutes.` : `${T(s + 60)} to ${T(e)} is 1 more hour.`}`, key: "v25hd" + act + s + "_" + d, v25: { f: "dur", wn } };
  }
  const ans = T(s), cands = [];
  for (const v of [e, s + 30, s - 30, e + d, s - 60, s + 60]) {
    const p = T(v), back = ((e - v) % 720 + 720) % 720;
    if (p === ans) continue;
    cands.push([p, back === 0 ? `${p} is when it ended, not when it started.` : back > 360 ? `${p} is after ${T(e)}, but it started before it ended.` : `${p} is ${D(back)} before ${T(e)}, not ${D(d)}.`]);
  }
  const { opts, wn } = V25MA7_txt(ans, cands);
  const eh = Math.floor((e % 720) / 60) || 12;
  return { q: `${act} ended at ${T(e)}. It lasted ${D(d)}. What time did it start?`, vis: clock(eh, e % 60), opts, ans, big: 1, why: `Count back ${D(d)} from ${T(e)}: it started at ${ans}.`, key: "v25hs" + act + s + "_" + d, v25: { f: "start", wn } };
});
whyRule(7, "math", "halfhour", V25MA7_rule);

/* ---------------- Counting coins: change, two things, enough money? ---------------- */
const V25MA7_SHOP = ["an apple", "a pencil", "an eraser", "a sticker", "a balloon", "a bookmark", "a banana", "a bouncy ball", "a toy whistle", "a postcard", "a small notebook", "a ruler", "a hair clip", "a lollipop", "a yo-yo", "a granola bar"];
const V25MA7_COIN = { q: ["quarter", "quarters", 25], d: ["dime", "dimes", 10], n: ["nickel", "nickels", 5] };
const V25MA7_c = v => v + "¢";
addBank(7, "math", "money", 0.3, () => {
  const who = V25MA7_nm(), k = R(0, 2);
  if (k === 0) {
    const [pay, pd, pv] = pick([[50, "2 quarters", "make"], [75, "3 quarters", "make"], [100, "a one-dollar bill", "is"]]), item = pick(V25MA7_SHOP), p = 5 * R(1, pay / 5 - 1), c = pay - p;
    const { opts, wn } = V25MA7_num(c, [
      [p, `${p}¢ is the price. The change is what ${who} gets back.`],
      [pay, `${pay}¢ is what ${who} paid, not the change.`],
      [c + 10, `${c + 10}¢ is 10¢ more than ${pay}¢ − ${p}¢.`], [c - 10, `${c - 10}¢ is 10¢ less than ${pay}¢ − ${p}¢.`]],
      v => `${v}¢ is ${Math.abs(v - c)}¢ ${V25MA7_mo(v, c)} than ${pay}¢ − ${p}¢.`, { f: V25MA7_c, min: 1, max: 100, gen: () => c + pick([-5, 5, -15, 15]) });
    return { q: `${who} buys ${item} for ${p}¢ and pays with ${pd}. How much change does ${who} get?`, opts, ans: c + "¢", big: 1, why: `${cap(pd)} ${pv} ${pay}¢. ${pay} − ${p} = ${c}, so the change is ${c}¢.`, key: "v25mc" + who + item + p + "_" + pay, v25: { f: "change", wn } };
  }
  if (k === 1) {
    const [i1, i2] = shuffle(V25MA7_SHOP).slice(0, 2), p1 = R(11, 60), p2 = R(10, Math.min(60, 99 - p1)), s = p1 + p2;
    const slip = (Math.floor(p1 / 10) + Math.floor(p2 / 10)) * 10 + (p1 % 10 + p2 % 10) % 10;
    const { opts, wn } = V25MA7_num(s, [
      [slip, `${slip}¢ forgets to carry the ten from ${p1 % 10} + ${p2 % 10}.`],
      [p1, `${p1}¢ is just the price of ${i1}. Add the price of ${i2} too.`],
      [s + 10, `${s + 10}¢ is 10¢ more than ${p1}¢ + ${p2}¢.`], [s - 10, `${s - 10}¢ is 10¢ less than ${p1}¢ + ${p2}¢.`]],
      v => `${v}¢ is ${Math.abs(v - s)}¢ ${V25MA7_mo(v, s)} than ${p1}¢ + ${p2}¢.`, { f: V25MA7_c, min: 1 });
    return { q: `${who} buys ${i1} for ${p1}¢ and ${i2} for ${p2}¢. How much does ${who} spend in all?`, opts, ans: s + "¢", big: 1, why: `${p1} + ${p2} = ${s}, so ${who} spends ${s}¢.`, key: "v25ms" + who + i1 + i2 + p1 + "_" + p2, v25: { f: "sum", wn } };
  }
  let cnt, t;
  do { cnt = { q: R(0, 3), d: R(0, 4), n: R(0, 3) }; t = cnt.q * 25 + cnt.d * 10 + cnt.n * 5; } while (t < 20 || t > 95 || Object.values(cnt).filter(Boolean).length < 2);
  const parts = ["q", "d", "n"].filter(c => cnt[c]).map(c => V25MA7_s(cnt[c], V25MA7_COIN[c][0], V25MA7_COIN[c][1]));
  const desc = parts.length === 2 ? parts.join(" and ") : `${parts[0]}, ${parts[1]} and ${parts[2]}`;
  const p = Math.max(5, t + pick([-15, -10, -5, 0, 5, 10, 15])), item = pick(V25MA7_SHOP), ok = t >= p;
  const rel = t === p ? "exactly" : t > p ? "more than" : "less than";
  const wn = ok ? { No: `${desc} make ${t}¢, which is ${rel} ${p}¢.` } : { Yes: `${desc} make only ${t}¢, which is less than ${p}¢.` };
  return { q: `${who} has ${desc}. ${cap(item)} costs ${p}¢. Does ${who} have enough money?`, opts: ["Yes", "No"], ans: ok ? "Yes" : "No", big: 1, why: `${cap(desc)} make ${t}¢. ${t}¢ is ${rel} ${p}¢, so ${ok ? "yes, it is enough" : "no, it is not enough"}.`, key: "v25me" + who + desc + item + p, v25: { f: "enough", wn } };
});
whyRule(7, "math", "money", V25MA7_rule);

/* ---------------- Skip counting: real-life groups, next three numbers ---------------- */
const V25MA7_SK = [["bikes", "bike", 2, "wheels", "has"], ["owls", "owl", 2, "eyes", "has"], ["bunnies", "bunny", 2, "ears", "has"], ["birds", "bird", 2, "wings", "has"], ["ducks", "duck", 2, "feet", "has"], ["pairs of boots", "pair", 2, "boots", "has"], ["starfish", "starfish", 5, "arms", "has"], ["flowers", "flower", 5, "petals", "has"], ["tally groups", "tally group", 5, "tally marks", "has"], ["nickels", "nickel", 5, "cents", "is worth"], ["boxes of markers", "box", 5, "markers", "holds"], ["kids", "kid", 10, "toes", "has"], ["crayon boxes", "box", 10, "crayons", "holds"], ["bowling sets", "set", 10, "pins", "has"], ["full ten-frames", "ten-frame", 10, "dots", "has"], ["bags of apples", "bag", 10, "apples", "holds"]];
addBank(7, "math", "skip", 0.3, () => {
  if (Math.random() < 0.6) {
    const [gp, gs, st, part, verb] = pick(V25MA7_SK), n = R(2, st === 10 ? 9 : 10), ans = n * st, who = V25MA7_nm();
    const { opts, wn } = V25MA7_num(ans, [
      [ans + st, `${ans + st} counts ${n + 1} ${gp}, but there are only ${n}.`],
      [ans - st, `${ans - st} counts only ${V25MA7_s(n - 1, gs, gp)}. Count all ${n} ${gp}.`],
      [n + st, `${n + st} is ${n} + ${st}. Count by ${st}s ${n} times.`]],
      v => `${v} is not a number you say when counting by ${st}s.`, { min: 1, gen: () => ans + (Math.random() < 0.5 ? -1 : 1) * R(1, st - 1) });
    return { q: `${who} sees ${n} ${gp}. Each ${gs} ${verb} ${st} ${part}. Count by ${st}s. How many ${part} in all?`, opts, ans: String(ans), big: 1, why: `Count by ${st}s ${n} times: ${range(1, n).map(i => i * st).join(", ")}. That is ${ans} ${part}.`, key: "v25kg" + gp + n + who, v25: { f: "grp", wn } };
  }
  const st = pick([2, 5, 10, 10, 100]), a = st === 2 ? 2 * R(1, 40) : st === 5 ? 5 * R(1, 15) : st === 10 ? R(1, 60) : 100 * R(1, 3);
  const L = v => v.join(", "), x = j => a + j * st, ans = L([x(3), x(4), x(5)]), o = st === 100 ? 10 : st === 10 ? pick([2, 5]) : st === 5 ? pick([2, 10]) : pick([5, 10]);
  const top = x(2), cands = [
    [L([top + 1, top + 2, top + 3]), `That counts by 1s, not by ${st}s.`],
    [L([top + o, top + 2 * o, top + 3 * o]), `That counts by ${o}s, not by ${st}s.`],
    [L([x(4), x(5), x(6)]), `That skips ${x(3)}, the very next number.`]];
  if (a - st >= 0) cands.push([L([x(1), x(0), x(-1)]), "That counts back, but these numbers are going up."]);
  const { opts, wn } = V25MA7_txt(ans, shuffle(cands));
  return { q: `Count by ${st}s: ${a}, ${x(1)}, ${x(2)} … What are the next three numbers?`, say: `Count by ${st}s: ${a}, ${x(1)}, ${x(2)}. What are the next three numbers?`, opts, ans, why: `Add ${st} each time: ${x(2)} + ${st} = ${x(3)}, then ${x(4)}, then ${x(5)}.`, key: "v25kn" + st + "_" + a, v25: { f: "next", wn } };
});
whyRule(7, "math", "skip", V25MA7_rule);

/* ---------------- Even & Odd: numbers around us, totals, sharing with a friend ---------------- */
const V25MA7_NUMCTX = ["house number", "soccer jersey number", "locker number", "classroom number", "bus number", "seat number at the show", "apartment number", "raffle ticket number", "mailbox number", "race number", "cubby number", "parking spot number", "library shelf number", "team number", "bike lock number"];
const V25MA7_TWO = [["red blocks", "blue blocks", "blocks"], ["cats", "dogs", "pets"], ["apples", "pears", "pieces of fruit"], ["girls", "boys", "kids"], ["red cars", "blue cars", "cars"], ["daisies", "roses", "flowers"], ["big shells", "small shells", "shells"], ["chocolate cookies", "sugar cookies", "cookies"], ["green beads", "yellow beads", "beads"], ["ducks", "geese", "birds"], ["storybooks", "comic books", "books"], ["round buttons", "square buttons", "buttons"], ["toy trucks", "toy trains", "toys"], ["white socks", "striped socks", "socks"], ["lemons", "limes", "pieces of fruit"]];
const V25MA7_SHAREF = [["grapes", "grape"], ["crackers", "cracker"], ["strawberries", "strawberry"], ["cherries", "cherry"], ["pretzels", "pretzel"], ["carrot sticks", "carrot stick"], ["blueberries", "blueberry"], ["cookies", "cookie"], ["orange slices", "orange slice"], ["apple slices", "apple slice"], ["raisins", "raisin"], ["mini muffins", "mini muffin"], ["pancakes", "pancake"], ["stickers", "sticker"], ["marbles", "marble"], ["crayons", "crayon"]];
addBank(7, "math", "evenodd", 0.3, () => {
  const k = R(0, 2), who = V25MA7_nm(), P = n => n % 2 === 0 ? "even" : "odd";
  if (k === 0) {
    const ctx = pick(V25MA7_NUMCTX), n = R(10, 99), ev = n % 2 === 0, d = n % 10;
    const wn = { [ev ? "odd" : "even"]: `${n} ends in ${d}, and numbers ending in ${d} are ${P(n)}.` };
    return { q: `${who}'s ${ctx} is <b>${n}</b>. Is ${n} an even or an odd number?`, say: `${who}'s ${ctx} is ${n}. Is ${n} an even or an odd number?`, opts: ["even", "odd"], ans: P(n), big: 1, why: `${n} ends in ${d}, so it is ${P(n)}.`, key: "v25ec" + ctx + n + who, v25: { f: "ctx", wn } };
  }
  if (k === 1) {
    const [t1, t2, all] = pick(V25MA7_TWO), a = R(1, 12), b = R(1, 12), s = a + b;
    const wn = { [s % 2 ? "even" : "odd"]: `${a} + ${b} = ${s}, and ${s} is ${P(s)}.` };
    return { q: `${who} has ${a} ${t1} and ${b} ${t2}. Is the total number of ${all} even or odd?`, opts: ["even", "odd"], ans: P(s), big: 1, why: s < 10 ? `${a} + ${b} = ${s}, and ${s} is ${P(s)}.` : `${a} + ${b} = ${s}. ${s} ends in ${s % 10}, so it is ${P(s)}.`, key: "v25es" + t1 + a + "+" + b + who, v25: { f: "sum", wn } };
  }
  const [fp, fs] = pick(V25MA7_SHAREF), n = R(5, 30), [n1, n2] = V25MA7_nms(2), ev = n % 2 === 0;
  const wn = ev ? { No: `${n} is even, so each friend gets ${n / 2} with none left over.` } : { Yes: `${n} is odd, so 1 ${fs} would be left over.` };
  return { q: `${n1} and ${n2} want to share ${n} ${fp} equally, with none left over. Can they do it?`, opts: ["Yes", "No"], ans: ev ? "Yes" : "No", big: 1, why: ev ? `${n} is even: ${n / 2} + ${n / 2} = ${n}, so each friend gets ${n / 2}.` : `${n} is odd. They can each get ${(n - 1) / 2}, but 1 ${fs} is left over.`, key: "v25eh" + fp + n + n1 + n2, v25: { f: "share", wn } };
});
whyRule(7, "math", "evenodd", V25MA7_rule);

/* ---------------- Missing Numbers: story problems with an unknown ---------------- */
const V25MA7_GOT = [["marbles", "found"], ["stickers", "got"], ["shells", "picked up"], ["stamps", "bought"], ["baseball cards", "traded for"], ["beads", "got"], ["acorns", "found"], ["crayons", "got"], ["feathers", "found"], ["bookmarks", "made"], ["paper stars", "folded"], ["rocks", "found"], ["toy cars", "got"], ["coins", "saved"], ["postcards", "got"]];
const V25MA7_JOINED = [["ducks", "in the pond", "swam over"], ["kids", "on the playground", "ran over"], ["birds", "at the feeder", "flew in"], ["cars", "in the parking lot", "drove in"], ["people", "on the bus", "got on"], ["frogs", "on the log", "hopped on"], ["fish", "by the rock", "swam over"], ["bees", "on the flowers", "buzzed over"], ["sheep", "in the field", "walked in"], ["shoppers", "in the store", "came in"], ["butterflies", "in the garden", "flew in"], ["squirrels", "in the tree", "climbed up"], ["players", "on the field", "ran out"], ["ants", "on the hill", "marched up"], ["campers", "at the campfire", "sat down"]];
const V25MA7_NEED = [["points", "to win the game", "has"], ["pages", "to finish the book", "has read"], ["beads", "for a necklace", "has"], ["stamps", "to fill the stamp book", "has"], ["blocks", "to finish the tower", "has stacked"], ["cans", "for the food drive", "has collected"], ["stickers", "to fill the chart", "has"], ["seeds", "to fill the garden", "has planted"], ["tickets", "for the big prize", "has"], ["paper cranes", "for the class project", "has folded"], ["shells", "to fill the jar", "has"], ["leaves", "for the art project", "has"], ["puzzle pieces", "to finish the puzzle", "has put in"], ["minutes of reading", "this week", "has done"], ["cookies", "for the bake sale", "has baked"]];
addBank(7, "math", "missing", 0.3, () => {
  const k = R(0, 2), who = V25MA7_nm();
  if (k === 0) {
    const [th, verb] = pick(V25MA7_GOT), b = R(3, 30), a = R(5, 60), c = a + b;
    const { opts, wn } = V25MA7_num(a, [
      [c + b, `${c + b} adds ${b} again. Take the ${b} away instead.`],
      [c, `${c} is how many ${who} has now, not at first.`],
      [b, `${b} is how many ${who} ${verb}, not how many at first.`],
      [a + 10, `${a + 10} + ${b} = ${a + 10 + b}, not ${c}.`]],
      v => `${v} + ${b} = ${v + b}, not ${c}.`, { min: 1 });
    return { q: `${who} had some ${th}. Then ${who} ${verb} ${b} more. Now ${who} has ${c}. How many ${th} did ${who} have at first?`, vis: eq(`${blank()} + ${b} = ${c}`), opts, ans: String(a), big: 1, why: `${c} − ${b} = ${a}, so ${who} had ${a} at first. Check: ${a} + ${b} = ${c}.`, key: "v25ia" + th + who + a + "+" + b, v25: { f: "start", wn } };
  }
  if (k === 1) {
    const [g, place, verb] = pick(V25MA7_JOINED), a = R(5, 50), b = R(3, 40), c = a + b;
    const { opts, wn } = V25MA7_num(b, [
      [c + a, `${c + a} adds the numbers. Subtract to find how many ${verb}.`],
      [c, `${c} is how many ${g} there are now, not how many ${verb}.`],
      [a, `${a} is how many ${g} were there at the start.`],
      [b + 10, `${a} + ${b + 10} = ${a + b + 10}, not ${c}.`]],
      v => `${a} + ${v} = ${a + v}, not ${c}.`, { min: 1 });
    return { q: `There were ${a} ${g} ${place}. Some more ${verb}. Now there are ${c}. How many ${g} ${verb}?`, vis: eq(`${a} + ${blank()} = ${c}`), opts, ans: String(b), big: 1, why: `${c} − ${a} = ${b}. Check: ${a} + ${b} = ${c}.`, key: "v25ib" + g + a + "+" + b, v25: { f: "change", wn } };
  }
  const [th, goal, hv] = pick(V25MA7_NEED), c = R(20, 99), a = R(5, c - 2), b = c - a;
  const { opts, wn } = V25MA7_num(b, [
    [c + a, `${c + a} adds the numbers. Subtract what ${who} already has.`],
    [c, `${c} is how many ${who} needs in all, not how many more.`],
    [a, `${a} is the part ${who} already has, not how many more.`],
    [b + 10, `${a} + ${b + 10} = ${a + b + 10}, which is too many.`], [b - 10, `${a} + ${b - 10} = ${a + b - 10}, which is not enough.`]],
    v => `${a} + ${v} = ${a + v}, not ${c}.`, { min: 1 });
  const need = th === "minutes of reading" ? `${c} minutes of reading this week` : `${c} ${th} ${goal}`, has = th === "minutes of reading" ? `${hv} ${a} minutes` : `${hv} ${a} so far`;
  return { q: `${who} needs ${need}. ${who} ${has}. How many more ${th === "minutes of reading" ? "minutes" : th} does ${who} need?`, vis: eq(`${a} + ${blank()} = ${c}`), opts, ans: String(b), big: 1, why: `${c} − ${a} = ${b}. Check: ${a} + ${b} = ${c}.`, key: "v25in" + th + who + a + "+" + b, v25: { f: "need", wn } };
});
whyRule(7, "math", "missing", V25MA7_rule);

/* ---------------- Measuring Length: estimate, cut off, grow ---------------- */
const V25MA7_EST = [["a paper clip", "long", 3, "cm"], ["a crayon", "long", 9, "cm"], ["a grape", "long", 2, "cm"], ["a house key", "long", 6, "cm"], ["a spoon", "long", 15, "cm"], ["an eraser", "long", 5, "cm"], ["a ladybug", "long", 1, "cm"], ["a kid's shoe", "long", 20, "cm"], ["a postage stamp", "long", 3, "cm"], ["a school ruler", "long", 30, "cm"], ["a door", "tall", 2, "m"], ["a bed", "long", 2, "m"], ["a car", "long", 4, "m"], ["a school bus", "long", 12, "m"], ["a giraffe", "tall", 5, "m"], ["a swimming pool", "long", 25, "m"], ["a classroom", "long", 10, "m"], ["a soccer goal", "wide", 7, "m"]];
const V25MA7_CUT = ["ribbon", "strip of tape", "paper chain", "piece of string", "party streamer", "strip of fabric", "piece of yarn", "strip of paper", "piece of rope", "roll of paper"];
const V25MA7_GROW = [["sunflower", "grew"], ["bean plant", "grew"], ["tomato plant", "grew"], ["corn plant", "grew"], ["pea vine", "grew"], ["block tower", "got"], ["snow pile", "got"], ["stack of books", "got"]];
addBank(7, "math", "measure", 0.3, () => {
  const k = R(0, 2), who = V25MA7_nm();
  if (k === 0) {
    const [obj, adj, v, u] = pick(V25MA7_EST), ans = `about ${v} ${u}`, opp = { long: "shorter", tall: "shorter", wide: "narrower" }[adj], big = { long: "longer", tall: "taller", wide: "wider" }[adj];
    const cands = u === "cm" ? [[`about ${v * 10} cm`, `${cap(obj)} is much ${opp} than ${v * 10} cm.`], [`about ${v} m`, `${cap(obj)} is much ${opp} than ${v} m. A meter is 100 cm.`]]
      : [[`about ${v} cm`, `${cap(obj)} is much ${big} than ${v} cm. That is tiny!`], [`about ${v * 10} m`, `${cap(obj)} is much ${opp} than ${v * 10} m.`]];
    const { opts, wn } = V25MA7_txt(ans, cands, 3);
    return { q: `About how ${adj} is <b>${obj}</b>?`, say: `About how ${adj} is ${obj}?`, opts, ans, big: 1, why: u === "cm" ? `${cap(obj)} is small, about ${v} centimeters ${adj}.` : `${cap(obj)} is big, about ${v} meters ${adj}. A meter is 100 centimeters.`, key: "v25le" + obj, v25: { f: "est", wn } };
  }
  if (k === 1) {
    const r = pick(V25MA7_CUT), x = R(20, 99), y = R(5, x - 5), d = x - y;
    const { opts, wn } = V25MA7_num(d, [
      [x + y, `${x + y} cm adds. Cutting a piece off makes it shorter, so subtract.`],
      [y, `${y} cm is the piece cut off, not the piece left.`],
      [x, `${x} cm is the whole ${r} before cutting.`],
      [d + 10, `${d + 10} cm is 10 cm more than ${x} − ${y}.`]],
      v => `${v} cm is ${Math.abs(v - d)} cm ${V25MA7_mo(v, d)} than ${x} − ${y}.`, { f: v => v + " cm", min: 1 });
    return { q: `A ${r} is ${x} cm long. ${who} cuts off ${y} cm. How long is the piece that is left?`, opts, ans: d + " cm", big: 1, why: `Take away the part cut off: ${x} − ${y} = ${d} cm.`, key: "v25lc" + r + who + x + "-" + y, v25: { f: "cut", wn } };
  }
  const [thing, verb] = pick(V25MA7_GROW), x = R(10, 70), y = R(5, Math.min(29, 99 - x)), s = x + y;
  const { opts, wn } = V25MA7_num(s, [
    [Math.abs(x - y), `${Math.abs(x - y)} cm subtracts, but it got taller, so add.`],
    [x, `${x} cm is how tall it was before.`],
    [s + 10, `${s + 10} cm is 10 cm more than ${x} + ${y}.`], [s - 10, `${s - 10} cm is 10 cm less than ${x} + ${y}.`]],
    v => `${v} cm is ${Math.abs(v - s)} cm ${V25MA7_mo(v, s)} than ${x} + ${y}.`, { f: v => v + " cm", min: 1 });
  return { q: `${who}'s ${thing} was ${x} cm tall. It ${verb} ${y} cm taller. How tall is it now?`, opts, ans: s + " cm", big: 1, why: `Taller means add: ${x} + ${y} = ${s} cm.`, key: "v25lg" + thing + who + x + "+" + y, v25: { f: "grow", wn } };
});
whyRule(7, "math", "measure", V25MA7_rule);

/* ---------------- Greater, Less, Equal: true sentences, tens-and-ones, pick a number ---------------- */
const V25MA7_REL = (a, b) => a > b ? "greater than" : a < b ? "less than" : "equal to";
addBank(7, "math", "symbols", 0.3, () => {
  const k = R(0, 2);
  if (k === 0) {
    const [n1, n2] = V25MA7_nms(2), th = pick(V25MA7_THINGS), a = R(10, 99), b = Math.random() < 0.15 ? a : R(10, 99);
    const sg = a > b ? ">" : a < b ? "<" : "=", ans = `${a} ${sg} ${b}`, cands = [];
    for (const g of [">", "<", "="]) {
      if (g === sg) continue; const s = `${a} ${g} ${b}`;
      cands.push([s, g === "=" ? `= means the same, but ${a} and ${b} are different.` : a === b ? `${s} is false, because the two numbers are equal.` : `${s} says ${a} is ${g === ">" ? "greater" : "less"}, but ${a} is ${V25MA7_REL(a, b)} ${b}.`]);
    }
    const { opts, wn } = V25MA7_txt(ans, cands);
    const why = a === b ? `Both have ${a}, so ${a} = ${b}.` : Math.floor(a / 10) !== Math.floor(b / 10) ? `Compare the tens: ${a} is ${V25MA7_REL(a, b)} ${b}, so ${ans}.` : `Same tens, so compare the ones: ${a} is ${V25MA7_REL(a, b)} ${b}, so ${ans}.`;
    return { q: `${n1} has ${a} ${th}. ${n2} has ${b} ${th}. Which is true?`, opts, ans, big: 1, why, key: "v25yt" + th + n1 + n2 + a + "," + b, v25: { f: "true", wn } };
  }
  if (k === 1) {
    const t = R(1, 9), o = R(0, 9), n = 10 * t + o;
    let m = n + pick([-10, -1, 1, 10, 0, 0, o * 10 + t - n, R(-20, 20)]); if (m < 10 || m > 99) m = n;
    const sg = n > m ? ">" : n < m ? "<" : "=", lab = `${V25MA7_s(t, "ten", "tens")} ${V25MA7_s(o, "one", "ones")}`, wn = {};
    for (const g of [">", "<", "="]) if (g !== sg) wn[g] = `${lab} is ${n}, and ${n} is ${V25MA7_REL(n, m)} ${m}.`;
    return { q: "Which sign goes in the box?", vis: eq(`${lab} ${blank("?")} ${m}`), say: `${lab}, blank, ${m}. Which sign goes in the box?`, opts: [">", "<", "="], ans: sg, big: 1, why: `${lab} is ${n}. ${n} is ${V25MA7_REL(n, m)} ${m}, so the sign is ${sg}.`, key: "v25yp" + n + "," + m, v25: { f: "pv", wn } };
  }
  const gt = Math.random() < 0.5, a = R(20, 89), ans = gt ? a - R(1, 9) : a + R(1, 9), sym = gt ? "&gt;" : "&lt;", sw = gt ? ">" : "<";
  const bad = gt ? [a, a + R(1, 5), a + 10, a + R(6, 9)] : [a, a - R(1, 5), a - 10, a - R(6, 9)];
  const cands = bad.map(v => [v, v === a ? `${a} ${sw} ${a} is false, because the two numbers are equal.` : `${a} ${sw} ${v} is false, because ${v} is ${V25MA7_REL(v, a)} ${a}.`]);
  const { opts, wn } = V25MA7_num(ans, cands, () => null, { min: 0 });
  return { q: "Which number makes this true?", vis: eq(`${a} ${sym} ${blank()}`), say: `${a} is ${gt ? "greater" : "less"} than what? Which number makes this true?`, opts, ans: String(ans), big: 1, why: `${ans} is ${gt ? "less" : "greater"} than ${a}, so ${a} ${sw} ${ans} is true.`, key: "v25yn" + sw + a + "_" + ans, v25: { f: "pick", wn } };
});
whyRule(7, "math", "symbols", V25MA7_rule);

/* ---------------- 3D Shapes: riddles, roll or stack, counting faces ---------------- */
const V25MA7_SFACT = { sphere: "A sphere is round all over, with no flat faces, so it can't stack.", cube: "A cube has 6 square faces and 8 corners.", cone: "A cone has 1 circle face and 1 pointy tip.", cylinder: "A cylinder has 2 circle faces and no corners.", "rectangular prism": "A rectangular prism has 6 faces, and some are long rectangles." };
const V25MA7_RIDDLE = [["I am round all over. I have no flat faces and no corners.", "sphere"], ["I can roll in every direction, but I can't stack.", "sphere"], ["I am shaped like a ball, and I have no edges.", "sphere"],
  ["I have 6 flat faces, and every one is a square.", "cube"], ["I have 8 corners and 12 edges. All my faces are squares.", "cube"], ["I am a box with every edge the same length.", "cube"],
  ["I have 1 flat face shaped like a circle and 1 pointy tip.", "cone"], ["I roll around in a circle, and I have one pointy tip.", "cone"], ["I have 1 circle face and a curved side that comes to a point.", "cone"],
  ["I have 2 flat faces shaped like circles.", "cylinder"], ["I can roll and I can stack. I have no corners.", "cylinder"], ["I have 2 circle faces and a curved side, like a can.", "cylinder"],
  ["I have 6 flat faces. Some are rectangles that are not squares.", "rectangular prism"], ["I have 8 corners and 12 edges, and I am longer than I am tall, like a brick.", "rectangular prism"], ["I have 6 faces, and some are long rectangles, like a tissue box.", "rectangular prism"]];
const V25MA7_SOBJ = [["a cherry", "sphere"], ["a blueberry", "sphere"], ["a meatball", "sphere"], ["a ball of yarn", "sphere"], ["a pea", "sphere"], ["a hockey puck", "cylinder"], ["a round oatmeal box", "cylinder"], ["a pencil cup", "cylinder"], ["a can of tennis balls", "cylinder"], ["a jar of paint", "cylinder"], ["a tissue box", "rectangular prism"], ["a lunch box", "rectangular prism"], ["a domino", "rectangular prism"], ["a refrigerator", "rectangular prism"], ["a puzzle cube", "cube"], ["a paper snow cone cup", "cone"], ["a funnel", "cone"]];
const V25MA7_SCOUNT = [["number cubes", "number cube", "flat faces", 6], ["number cubes", "number cube", "corners", 8], ["number cubes", "number cube", "edges", 12], ["soup cans", "soup can", "flat faces", 2], ["cereal boxes", "cereal box", "flat faces", 6], ["cereal boxes", "cereal box", "corners", 8], ["drums", "drum", "flat faces", 2], ["ice cubes", "ice cube", "flat faces", 6]];
const V25MA7_SN = ["sphere", "cube", "cone", "cylinder", "rectangular prism"];
addBank(7, "math", "solids", 0.3, () => {
  const k = R(0, 3), who = V25MA7_nm();
  const shapeOpts = ans => { const pool = V25MA7_SN.filter(n => n !== ans && !(ans === "cube" && n === "rectangular prism")); return V25MA7_txt(ans, shuffle(pool).map(n => [n, V25MA7_SFACT[n]])); };
  if (k === 0) {
    const i = R(0, V25MA7_RIDDLE.length - 1), [r, ans] = V25MA7_RIDDLE[i], { opts, wn } = shapeOpts(ans);
    return { q: `Riddle: "${r}" What shape am I?`, opts, ans, big: 1, why: `${V25MA7_SFACT[ans]} It fits every clue.`, key: "v25or" + i, v25: { f: "riddle", wn } };
  }
  if (k === 1) {
    const i = R(0, V25MA7_SOBJ.length - 1), [o, ans] = V25MA7_SOBJ[i], { opts, wn } = shapeOpts(ans);
    return { q: `What 3D shape is <b>${o}</b> most like?`, say: `What 3D shape is ${o} most like?`, opts, ans, big: 1, why: `${cap(o)} is shaped like ${V25MA7_an(ans)}. ${V25MA7_SFACT[ans]}`, key: "v25oo" + o, v25: { f: "obj", wn } };
  }
  if (k === 2) {
    const roll = Math.random() < 0.5;
    if (roll) {
      const ans = pick(["sphere", "cylinder"]), ctx = pick(["roll down a ramp", "roll across the floor", "roll to a friend", "roll down a hill of sand"]);
      const { opts, wn } = V25MA7_txt(ans, [["cube", "A cube has flat faces and corners, so it slides instead of rolling."], ["rectangular prism", "A rectangular prism has flat faces and corners, so it won't roll."]], 3);
      return { q: `${who} wants a shape that will <b>${ctx}</b>. Which shape should ${who} pick?`, say: `${who} wants a shape that will ${ctx}. Which shape should ${who} pick?`, opts, ans, big: 1, why: ans === "sphere" ? "A sphere is round all over, so it rolls." : "A cylinder has a curved side, so it rolls.", key: "v25ol" + ans + ctx + who, v25: { f: "roll", wn } };
    }
    const ans = pick(["cube", "rectangular prism", "cylinder"]), ctx = pick(["will stack into a tall tower", "will stack in a neat pile", "can be stacked to make a wall", "will stack on a shelf"]);
    const { opts, wn } = V25MA7_txt(ans, [["sphere", "A sphere is round all over, so things roll off it."], ["cone", "A cone has a pointy top, so nothing stacks on it."]], 3);
    return { q: `${who} wants shapes that <b>${ctx}</b>. Which shape should ${who} pick?`, say: `${who} wants shapes that ${ctx}. Which shape should ${who} pick?`, opts, ans, big: 1, why: ans === "cylinder" ? "A cylinder has flat circle faces on the top and bottom, so it stacks." : `${cap(V25MA7_an(ans))} has flat faces, so it stacks.`, key: "v25ot" + ans + ctx + who, v25: { f: "stack", wn } };
  }
  const [op, os, feat, f] = pick(V25MA7_SCOUNT), n = R(2, f >= 8 ? 3 : 5), ans = n * f, rep = Array(n).fill(f).join(" + ");
  const { opts, wn } = V25MA7_num(ans, [
    [f, `${f} is the ${feat} on just one ${os}. There are ${n}.`],
    [n, `${n} is the number of ${op}. Each one has ${f} ${feat}.`],
    [ans + f, `${ans + f} would be ${n + 1} ${op}, but there are ${n}.`],
    [n + f, `${n + f} is ${n} + ${f}. Add ${f} for each ${os}.`]],
    v => `${rep} is not ${v}.`, { min: 1 });
  return { q: `${who} has ${n} ${op}. Each ${os} has ${V25MA7_s(f, feat.replace(/s$/, ""), feat).replace(/^\d+ /, f + " ")}. How many ${feat} in all?`, opts, ans: String(ans), big: 1, why: `Add ${f} for each ${os}: ${rep} = ${ans}.`, key: "v25oc" + op + feat + n + who, v25: { f: "count", wn } };
});
whyRule(7, "math", "solids", V25MA7_rule);

/* ---------------- Adding Three Numbers: real-life scenes, find the ten ---------------- */
const V25MA7_SCENE = [["zoo", "monkeys", "zebras", "parrots", "animals"], ["pond", "frogs", "turtles", "ducks", "animals"], ["farm", "cows", "pigs", "goats", "animals"], ["garden", "roses", "daisies", "tulips", "flowers"], ["toy shelf", "dolls", "robots", "teddy bears", "toys"], ["fruit stand", "apples", "pears", "plums", "pieces of fruit"], ["beach", "red pails", "blue pails", "green pails", "pails"], ["parking lot", "cars", "vans", "trucks", "vehicles"], ["bakery", "muffins", "bagels", "rolls", "baked treats"], ["bookshelf", "storybooks", "comic books", "picture books", "books"], ["bird feeder", "robins", "blue jays", "sparrows", "birds"], ["aquarium", "goldfish", "clownfish", "angelfish", "fish"], ["art table", "crayons", "markers", "colored pencils", "things to draw with"], ["pet show", "dogs", "cats", "rabbits", "pets"], ["bike rack", "red bikes", "blue bikes", "green bikes", "bikes"], ["music room", "drums", "bells", "shakers", "instruments"]];
addBank(7, "math", "add3", 0.3, () => {
  const who = V25MA7_nm();
  if (Math.random() < 0.7) {
    const [pl, c1, c2, c3, all] = pick(V25MA7_SCENE);
    let a = R(2, 9), b = R(2, 9), c = R(2, 9);
    if (Math.random() < 0.3) { a = R(10, 20); b = R(10, 20); c = R(2, 15); } else if (Math.random() < 0.5) { c = 10 - a; if (c < 1) c = R(2, 9); }
    const s = a + b + c;
    const { opts, wn } = V25MA7_num(s, [
      [a + b, `${a + b} adds only the ${c1} and ${c2}. Add the ${c} ${c3} too.`],
      [s + 10, `${s + 10} is 10 more than ${a} + ${b} + ${c}.`], [s >= 20 ? s - 10 : null, `${s - 10} is 10 less than ${a} + ${b} + ${c}.`]],
      v => `${v} is ${Math.abs(v - s)} ${V25MA7_mo(v, s)} than ${a} + ${b} + ${c}.`, { min: 1 });
    const why = a + c === 10 ? `${a} + ${c} = 10, then 10 + ${b} = ${s}.` : `${a} + ${b} = ${a + b}, then ${a + b} + ${c} = ${s}.`;
    return { q: `At the ${pl}, ${who} counted ${a} ${c1}, ${b} ${c2} and ${c} ${c3}. How many ${all} did ${who} count in all?`, opts, ans: String(s), big: 1, why, key: "v25tw" + pl + who + a + "+" + b + "+" + c, v25: { f: "sum", wn } };
  }
  let a; do { a = R(1, 9); } while (a === 5);
  let b; do { b = R(1, 9); } while (b === a || b === 10 - a);
  const nums = shuffle([a, 10 - a, b]), ord = (x, y) => nums.indexOf(x) < nums.indexOf(y) ? [x, y] : [y, x], P = ([x, y]) => `${x} and ${y}`, W = ([x, y]) => [P([x, y]), `${x} + ${y} = ${x + y}, not 10.`];
  const ans = P(ord(a, 10 - a)), { opts, wn } = V25MA7_txt(ans, [W(ord(a, b)), W(ord(10 - a, b))], 3);
  return { q: `${who} wants to add ${nums.join(" + ")} by making a ten first. Which two numbers make 10?`, opts, ans, big: 1, why: `${ord(a, 10 - a).join(" + ")} = 10. Then 10 + ${b} = ${10 + b}.`, key: "v25tt" + nums.join("+") + who, v25: { f: "ten", wn } };
});
whyRule(7, "math", "add3", V25MA7_rule);

/* ---------------- Picture Graphs: find the row, how many pictures to draw ---------------- */
const V25MA7_PG = [["Ice cream cones sold", "🍦", "day", ["Mon", "Tue", "Wed", "Thu"]], ["Rainy days", "☔", "month", ["March", "April", "May", "June"]], ["Books borrowed", "📚", "room", ["Room 1", "Room 2", "Room 3", "Room 4"]], ["Bikes in the rack", "🚲", "day", ["Mon", "Tue", "Wed", "Thu"]], ["Birds at the feeder", "🐦", "day", ["Sun", "Mon", "Tue", "Wed"]], ["Pumpkins grown", "🎃", "farm", ["Farm A", "Farm B", "Farm C", "Farm D"]], ["Snowmen built", "⛄", "kid", ["Ana", "Ben", "Mei", "Luis"]], ["Cookies baked", "🍪", "kid", ["Jada", "Owen", "Rosa", "Theo"]], ["Trees planted", "🌳", "grade", ["Grade 1", "Grade 2", "Grade 3", "Grade 4"]], ["Flowers picked", "🌸", "kid", ["Priya", "Eli", "Hana", "Malik"]], ["Medals won", "🏅", "team", ["Red team", "Blue team", "Green team", "Gold team"]], ["Letters mailed", "✉️", "day", ["Mon", "Tue", "Wed", "Thu"]], ["Pies sold", "🥧", "day", ["Fri", "Sat", "Sun", "Mon"]], ["Butterflies seen", "🦋", "kid", ["Ivy", "Diego", "Nina", "Sami"]], ["Goals scored", "⚽", "team", ["Tigers", "Bears", "Hawks", "Sharks"]], ["Strawberries picked", "🍓", "row", ["Row 1", "Row 2", "Row 3", "Row 4"]]];
const V25MA7_PGR = [["🍪", "cookies", "baked"], ["🌳", "trees", "planted"], ["📚", "books", "read"], ["🎃", "pumpkins", "grew"], ["🐦", "birds", "saw"], ["🌸", "flowers", "picked"], ["🏅", "medals", "won"], ["✉️", "letters", "mailed"], ["🦋", "butterflies", "saw"], ["🥧", "pies", "sold"], ["🍦", "ice cream cones", "sold"], ["⚽", "goals", "scored"], ["🐟", "fish", "caught"], ["🍓", "strawberries", "picked"], ["🍎", "apples", "picked"], ["⭐", "stars", "earned"]];
addBank(7, "math", "pictograph", 0.3, () => {
  if (Math.random() < 0.5) {
    const [title, e, rw, names] = pick(V25MA7_PG), key = pick([1, 2, 2, 5, 10]), cnt = names.map(() => R(1, 6)), vals = cnt.map(c => c * key);
    const uniqI = range(0, 3).filter(i => vals.filter(v => v === vals[i]).length === 1); if (!uniqI.length) return null;
    const i = pick(uniqI), v = vals[i], ans = names[i], wn = {};
    names.forEach((n, j) => { if (j === i) return; wn[n] = key > 1 && cnt[j] === v ? `${n} has ${cnt[j]} pictures, but each one means ${key}, so ${vals[j]}.` : `${n} has ${vals[j]}, not ${v}.`; });
    return { q: `Which ${rw} has <b>${v}</b>?`, say: `Look at the key. Which ${rw} has ${v}?`, vis: pictograph(title, e, names.map((n, j) => [n, vals[j]]), key), opts: names.slice(), ans, big: 1, why: `${ans} has ${cnt[i]} ${cnt[i] === 1 ? "picture" : "pictures"}${key > 1 ? `, and ${Array(cnt[i]).fill(key).join(" + ")} = ${v}` : ""}.`, key: "v25gw" + title + key + vals.join() + i, v25: { f: "which", wn } };
  }
  const [e, unit, verb] = pick(V25MA7_PGR), key = pick([2, 5, 10]), c = R(2, 7), v = c * key, who = V25MA7_nm();
  const { opts, wn } = V25MA7_num(c, [
    [v, `${v} pictures would mean ${v * key} ${unit}, because each one means ${key}.`],
    [c + 1, `${V25MA7_s(c + 1, "picture", "pictures")} would mean ${(c + 1) * key} ${unit}, not ${v}.`],
    [c - 1, `${V25MA7_s(c - 1, "picture", "pictures")} would mean ${(c - 1) * key} ${unit}, not ${v}.`],
    [key, `${key} is what one picture means, not how many pictures.`]],
    x => `${V25MA7_s(x, "picture", "pictures")} would mean ${x * key} ${unit}, not ${v}.`, { min: 1 });
  return { q: `On a picture graph, each <span class="emo">${e}</span> means ${key} ${unit}. ${who} ${verb} ${v} ${unit}. How many <span class="emo">${e}</span> go in ${who}'s row?`, say: `On a picture graph, each picture means ${key} ${unit}. ${who} ${verb} ${v} ${unit}. How many pictures go in ${who}'s row?`, vis: note(`Key: <span class="emo">${e}</span> = ${key} ${unit}`), opts, ans: String(c), big: 1, why: `Count by ${key}s to ${v}: ${range(1, c).map(j => j * key).join(", ")}. That is ${c} pictures.`, key: "v25gd" + unit + key + c + who, v25: { f: "draw", wn } };
});
whyRule(7, "math", "pictograph", V25MA7_rule);

/* ---------------- Rows and Columns: arrays in real life ---------------- */
const V25MA7_ARR = [["🧁", "muffins", "muffin", "in a muffin pan"], ["🥚", "eggs", "egg", "in a carton"], ["🌽", "corn plants", "corn plant", "in a garden"], ["🧊", "ice cubes", "ice cube", "in a tray"], ["🚗", "cars", "car", "in a parking lot"], ["🍪", "cookies", "cookie", "on a baking sheet"], ["🎃", "pumpkins", "pumpkin", "in a pumpkin patch"], ["🍓", "strawberries", "strawberry", "in a box"], ["⭐", "stickers", "sticker", "on a sticker sheet"], ["🍩", "donuts", "donut", "in a bakery box"], ["🌳", "trees", "tree", "in an orchard"], ["🥫", "cans", "can", "on a store shelf"], ["🍋", "lemons", "lemon", "in a crate"], ["🍅", "tomato plants", "tomato plant", "in a garden bed"], ["🧸", "teddy bears", "teddy bear", "on a toy shelf"], ["🌻", "sunflowers", "sunflower", "in a field"]];
addBank(7, "math", "arrays", 0.3, () => {
  const [e, tp, ts, ctx] = pick(V25MA7_ARR), r = R(2, 5), c = R(2, 5), n = r * c, who = V25MA7_nm(), k = R(0, 2), rep = (v, m) => Array(m).fill(v).join(" + ");
  if (k === 0) {
    const { opts, wn } = V25MA7_num(n, [
      [r + c, `${r + c} is ${r} + ${c}. Add ${c} once for each of the ${r} rows.`],
      [n + c, `${n + c} would be ${r + 1} rows of ${c}, but there are ${r} rows.`],
      [n - c, `${n - c} would be ${V25MA7_s(r - 1, "row", "rows")} of ${c}, but there are ${r} rows.`]],
      v => `${rep(c, r)} is not ${v}.`, { min: 1 });
    return { q: `The ${tp} ${ctx} are in ${r} rows. Each row has ${c}. How many ${tp} are there?`, vis: MA7V_grid(r, c, e), opts, ans: String(n), big: 1, why: `${r} rows of ${c}: ${rep(c, r)} = ${n}.`, key: "v25rt" + tp + r + "x" + c, v25: { f: "tot", wn } };
  }
  if (k === 1) {
    const { opts, wn } = V25MA7_num(r, [
      [c, `${c} is how many go in each row, not the number of rows.`],
      [r + 1, `${r + 1} rows of ${c} would be ${(r + 1) * c}, not ${n}.`],
      [r - 1, `${V25MA7_s(r - 1, "row", "rows")} of ${c} would be ${(r - 1) * c}, not ${n}.`],
      [n, `${n} is all the ${tp}, not the number of rows.`]],
      v => `${V25MA7_s(v, "row", "rows")} of ${c} would be ${v * c}, not ${n}.`, { min: 1 });
    return { q: `${who} puts ${n} ${tp} ${ctx} in rows of ${c}. How many rows does ${who} make?`, opts, ans: String(r), big: 1, why: `Count by ${c}s to ${n}: ${range(1, r).map(j => j * c).join(", ")}. That is ${r} rows.`, key: "v25rr" + tp + who + n + "/" + c, v25: { f: "rows", wn } };
  }
  const m = (r + 1) * c;
  const { opts, wn } = V25MA7_num(m, [
    [n, `${n} is how many before the new row was added.`],
    [n + 1, `${n + 1} adds just 1, but a whole row of ${c} was added.`],
    [m + c, `${m + c} would be ${r + 2} rows of ${c}, but only 1 row was added.`]],
    v => `${r + 1} rows of ${c} is not ${v}.`, { min: 1 });
  return { q: `There are ${r} rows of ${c} ${tp} ${ctx}. ${who} adds 1 more row of ${c}. How many ${tp} are there now?`, vis: MA7V_grid(r, c, e), opts, ans: String(m), big: 1, why: `Now there are ${r + 1} rows of ${c}: ${rep(c, r + 1)} = ${m}.`, key: "v25ra" + tp + who + r + "x" + c, v25: { f: "add", wn } };
});
whyRule(7, "math", "arrays", V25MA7_rule);

/* ---------------- Equal Shares: fair or not, pieces left, who gets more ---------------- */
const V25MA7_OBJ = ["pizza", "quesadilla", "sandwich", "pie", "brownie", "pancake", "waffle", "tortilla", "flatbread", "pan of lasagna", "sheet cake", "apple", "melon", "loaf of bread", "granola bar", "sheet of paper", "piece of felt", "garden bed"];
const V25MA7_FOOD = V25MA7_OBJ.slice(0, 15);
const V25MA7_W = { 2: ["half", "halves"], 3: ["third", "thirds"], 4: ["fourth", "fourths"] };
addBank(7, "math", "shares", 0.3, () => {
  const k = R(0, 2), who = V25MA7_nm();
  if (k === 0) {
    const obj = pick(V25MA7_OBJ), n = R(2, 4), same = Math.random() < 0.6, m = Math.random() < 0.6 ? n : pick([2, 3, 4].filter(x => x !== n)), ok = same && m === n;
    const wn = ok ? { No: `There are ${n} pieces and they are all the same size, so each is one ${V25MA7_W[n][0]}.` }
      : { Yes: !same ? `The pieces are not the same size, so they are not ${V25MA7_W[m][1]}.` : `One ${V25MA7_W[m][0]} needs ${m} equal pieces, but there are ${n}.` };
    const desc = same ? `${n} pieces that are all the same size` : `${n} pieces that are <b>not</b> the same size`;
    return { q: `${who} cuts ${V25MA7_an(obj)} into ${desc}. Is each piece <b>one ${V25MA7_W[m][0]}</b>?`, say: `${who} cuts ${V25MA7_an(obj)} into ${desc.replace(/<\/?b>/g, "")}. Is each piece one ${V25MA7_W[m][0]}?`, opts: ["Yes", "No"], ans: ok ? "Yes" : "No", big: 1, why: ok ? `${n} equal pieces are ${V25MA7_W[n][1]}, so each piece is one ${V25MA7_W[n][0]}.` : !same ? `${cap(V25MA7_W[m][1])} must be equal pieces, and these are not the same size.` : `${n} equal pieces are ${V25MA7_W[n][1]}, not ${V25MA7_W[m][1]}.`, key: "v25qf" + obj + n + same + m + who, v25: { f: "fair", wn } };
  }
  if (k === 1) {
    const obj = pick(V25MA7_FOOD), n = R(2, 4), j = R(1, n - 1), left = n - j, pc = x => V25MA7_s(x, "piece", "pieces");
    const wn = {};
    ["1", "2", "3", "4"].forEach(o => { const v = +o; if (v === left) return; wn[o] = v === n ? `${n} is all the pieces, but ${pc(j)} ${j === 1 ? "was" : "were"} eaten.` : v === j ? `${pc(j)} ${j === 1 ? "was" : "were"} eaten. Count the pieces left instead.` : `${n} − ${j} = ${left}, not ${v}.`; });
    return { q: `${cap(V25MA7_an(obj))} is cut into ${V25MA7_W[n][1]}. ${who}'s family eats ${pc(j)}. How many ${V25MA7_W[n][1]} are left?`, opts: ["1", "2", "3", "4"], ans: String(left), big: 1, why: `${cap(V25MA7_W[n][1])} means ${n} equal pieces. ${n} − ${j} = ${left}.`, key: "v25ql" + obj + n + j + who, v25: { f: "left", wn } };
  }
  const obj = pick(V25MA7_OBJ), [n1, n2] = V25MA7_nms(2);
  let a = R(2, 4), b = R(2, 4); while (b === a) b = R(2, 4);
  const ans = a < b ? n1 : n2, other = a < b ? n2 : n1, small = Math.max(a, b), same = "They get the same";
  const wn = { [other]: `One ${V25MA7_W[small][0]} is smaller, because it is 1 of ${small} equal pieces.`, [same]: `One ${V25MA7_W[a][0]} and one ${V25MA7_W[b][0]} are different sizes.` };
  return { q: `${n1} gets one ${V25MA7_W[a][0]} of ${V25MA7_an(obj)}. ${n2} gets one ${V25MA7_W[b][0]} of the same size ${obj}. Who gets more?`, opts: [n1, n2, same], ans, big: 1, why: `One ${V25MA7_W[Math.min(a, b)][0]} is bigger than one ${V25MA7_W[small][0]}. Fewer equal pieces means bigger pieces.`, key: "v25qm" + obj + a + b + n1 + n2, v25: { f: "more", wn } };
});
whyRule(7, "math", "shares", V25MA7_rule);

