/* =====================================================================
   v25 · Age 6 Math (tag V25MA6_)
   Real-life word problems and new contexts for every age-6 math topic.
   Every new question carries q.v25 = {...}; the wrong-answer rules below
   read only q.v25 and return null for every other question.
   ===================================================================== */
const V25MA6_N = (n, s, p) => `${n} ${n === 1 ? s : (p || s + "s")}`;
const V25MA6_V = (n, s, p) => n === 1 ? s : p;
const V25MA6_num = s => { const m = String(s == null ? "" : s).replace(/<[^>]+>/g, " ").trim().match(/^-?\d+$/); return m ? +m[0] : null; };
const V25MA6_txt = s => String(s == null ? "" : s).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
const V25MA6_nu = (ans, cands, lo, hi) => uniq(ans, cands.filter(c => c != null && c >= lo && c <= hi && c !== ans), () => { const v = ans + R(-3, 3); return v >= lo && v <= hi ? v : null; });
const V25MA6_rule = (id, fn) => whyRule(6, "math", id, (q, picked) => { if (!q.v25 || picked === q.ans) return null; return fn(q.v25, picked, V25MA6_num(picked), V25MA6_txt(picked)); });
const V25MA6_off = (p, a) => `${p} is ${Math.abs(p - a)} too ${p > a ? "many" : "few"}`;
const V25MA6_two = () => shuffle(KIDS).slice(0, 2);
const V25MA6_hr = h => ((h - 1 + 120) % 12) + 1;
const V25MA6_ORD = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th"];
const V25MA6_ORDW = ["first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth"];

/* ---------- count: numbers in real life, counting a scene ---------- */
const V25MA6_SEQ = [
  [1, 5, 119, (n, w) => `${w} is reading a long book and just finished page ${n}. What page comes next?`],
  [1, 5, 119, (n, w, w2) => `At the show, ${w} sits in seat ${n}. ${w2} sits in the seat with the next number. What is ${w2}'s seat number?`],
  [-1, 1, 18, n => `The class counts down to launch a toy rocket: ${n + 2}, ${n + 1}, ${n}… What number do they say next?`, n => train([n + 2, n + 1, n, "?"])],
  [1, 1, 30, n => `Today is May ${n}. What will the date be tomorrow?`],
  [-1, 2, 31, n => `Today is October ${n}. What was the date yesterday?`],
  [1, 10, 99, (n, w) => `At the store, a sign says "Now serving ${n}." ${w} has the next ticket. What number is on ${w}'s ticket?`],
  [-1, 2, 30, n => `An elevator is on floor ${n}. It goes down 1 floor. What floor is it on now?`],
  [1, 1, 29, n => `An elevator is on floor ${n}. It goes up 1 floor. What floor is it on now?`],
  [1, 10, 119, (n, w) => `Runners in a race get numbers in order. The last runner to sign up got number ${n}. ${w} signs up next. What number does ${w} get?`],
  [-1, 11, 120, (n, w, w2) => `The lockers in the hall are in number order. ${w}'s locker is number ${n}. ${w2}'s locker is the one just before it. What is ${w2}'s locker number?`],
  [1, 5, 119, (n, w) => `${w} counts jumps on a jump rope: ${n - 1}, ${n}… What number does ${w} say on the next jump?`, n => train([n - 1, n, "?"])],
  [-1, 2, 20, (n, w) => `The stairs at school have numbers painted on them. ${w} stands on step ${n} and walks down 1 step. What step is ${w} on now?`],
  [1, 20, 119, n => `The library gives new books numbers in order. The newest book is number ${n}. What number will the next new book get?`],
  [1, 5, 119, (n, w) => `In a game, ${w} has ${n} points. ${w} scores 1 more point. How many points does ${w} have now?`],
  [-1, 2, 40, n => `Bus stops are numbered in order: 1, 2, 3 and so on. The bus is now at stop ${n}. What stop was the bus at just before this one?`],
  [1, 20, 119, (n, w) => `${w} hands out raffle tickets in order. The last ticket was number ${n}. What number is on the next ticket?`],
  [-1, 2, 119, (n, w) => `${w} is on page ${n} of a book and turns back 1 page to look at a picture. What page is ${w} on now?`],
];
const V25MA6_SCENE = [["🥚", "egg", "eggs", "in the basket"], ["🐟", "fish", "fish", "in the pond"], ["🦆", "duck", "ducks", "on the lake"], ["🐝", "bee", "bees", "by the hive"], ["🎈", "balloon", "balloons", "at the party"], ["🌷", "tulip", "tulips", "in the garden"], ["🚗", "car", "cars", "in the parking lot"], ["🍩", "donut", "donuts", "on the tray"], ["🐑", "sheep", "sheep", "in the field"], ["🐜", "ant", "ants", "on the picnic blanket"], ["🐚", "shell", "shells", "on the beach"], ["🍋", "lemon", "lemons", "on the tree"], ["🥕", "carrot", "carrots", "in the garden bed"], ["🐸", "frog", "frogs", "by the pond"], ["🌻", "sunflower", "sunflowers", "by the fence"], ["🐢", "turtle", "turtles", "on the rock"]];
addBank(6, "math", "count", 0.3, () => {
  if (Math.random() < 0.6) {
    const i = R(0, V25MA6_SEQ.length - 1), [d, lo, hi, f, vf] = V25MA6_SEQ[i], n = R(lo, hi), a = n + d, [w, w2] = V25MA6_two();
    return { q: f(n, w, w2), vis: vf ? vf(n) : train(d > 0 ? [n, "?"] : ["?", n]), opts: V25MA6_nu(a, [n, a + d, n - d, a + 10, a - 10, a + 2], 0, 121), ans: String(a), big: 1, why: d > 0 ? `Count on by 1: ${n}, ${a}.` : `Count back by 1: ${n}, ${a}.`, key: "v25s" + i + "_" + n + w + w2, v25: { k: "seq", n, a, d } };
  }
  const i = R(0, V25MA6_SCENE.length - 1), [e, s, p, place] = V25MA6_SCENE[i], n = R(4, 15), w = pick(KIDS);
  return { q: `${w} counts the ${p} ${place}. How many ${p} are there?`, vis: n > 10 ? col(grp(10, e), grp(n - 10, e)) : grp(n, e), opts: V25MA6_nu(n, [n + 1, n - 1, n + 2, n - 2], 1, 20), ans: String(n), big: 1, why: n > 10 ? `The top row has 10. Count on ${n - 10} more: 10 + ${n - 10} = ${n}.` : `Touch each ${s} once and count. There are ${n}.`, key: "v25c" + i + "_" + n + w, v25: { k: "scene", n, s } };
});
V25MA6_rule("count", (x, raw, p) => {
  if (p == null) return null;
  if (x.k === "seq") {
    const w = x.d > 0 ? "after" : "before";
    if (p === x.n) return `${p} is the number in the story. You need the number right ${w} it.`;
    if ((p > x.n) !== (x.d > 0)) return `${p} comes ${p > x.n ? "after" : "before"} ${x.n}, but you need the number ${w} it.`;
    return `${p} is ${Math.abs(p - x.n)} away from ${x.n}. The number right ${w} is just 1 away.`;
  }
  if (x.k === "scene") return `${V25MA6_off(p, x.n)}. There are ${x.n}, so touch each ${x.s} once as you count.`;
  return null;
});

/* ---------- add10: real-life put-together stories, matching number sentences ---------- */

const V25MA6_ADD = [
  ["🚗", "🚙", (a, b) => [`${V25MA6_N(a, "red car")} and ${V25MA6_N(b, "blue car")} are parked outside.`, "How many cars are there in all?"]],
  ["🍎", "🍎", (a, b, w) => [`${w} picks ${V25MA6_N(a, "apple")} from one tree and ${V25MA6_N(b, "apple")} from another tree.`, `How many apples does ${w} pick in all?`]],
  [null, null, (a, b) => [`${V25MA6_N(a, "kid")} ${V25MA6_V(a, "is", "are")} on the swings and ${V25MA6_N(b, "kid")} ${V25MA6_V(b, "is", "are")} on the slide.`, "How many kids are playing?"]],
  ["🐟", "🐟", (a, b, w) => [`${w} has ${V25MA6_N(a, "goldfish", "goldfish")} in one bowl and ${V25MA6_N(b, "goldfish", "goldfish")} in another bowl.`, `How many goldfish does ${w} have?`]],
  [null, null, (a, b) => [`On the bus, ${V25MA6_N(a, "kid")} ${V25MA6_V(a, "sits", "sit")} in the front and ${V25MA6_N(b, "kid")} ${V25MA6_V(b, "sits", "sit")} in the back.`, "How many kids are on the bus?"]],
  ["📘", "📘", (a, b, w) => [`${w} puts ${V25MA6_N(a, "book")} on the top shelf and ${V25MA6_N(b, "book")} on the bottom shelf.`, "How many books are on the shelves?"]],
  ["🦆", "🦆", (a, b) => [`${V25MA6_N(a, "duck")} ${V25MA6_V(a, "is", "are")} swimming in the pond. Then ${V25MA6_N(b, "more duck")} ${V25MA6_V(b, "flies", "fly")} in.`, "How many ducks are in the pond now?"]],
  ["🍇", "🍇", (a, b, w) => [`At snack time, ${w} eats ${V25MA6_N(a, "grape")}. Then ${w} eats ${V25MA6_N(b, "more grape")}.`, `How many grapes does ${w} eat?`]],
  ["🐚", "🐚", (a, b, w) => [`${w} finds ${V25MA6_N(a, "shell")} in the morning and ${V25MA6_N(b, "shell")} in the afternoon.`, `How many shells does ${w} find?`]],
  ["🥞", "🥞", (a, b) => [`A plate has ${V25MA6_N(a, "pancake")}. The cook adds ${V25MA6_N(b, "more pancake")}.`, "How many pancakes are on the plate now?"]],
  [null, null, (a, b) => [`The class garden has ${V25MA6_N(a, "tomato plant")} and ${V25MA6_N(b, "pepper plant")}.`, "How many plants are in the garden?"]],
  ["🐦", "🐦", (a, b) => [`${V25MA6_N(a, "bird")} ${V25MA6_V(a, "sits", "sit")} on a fence. ${V25MA6_N(b, "more bird")} ${V25MA6_V(b, "lands", "land")} next to ${V25MA6_V(a, "it", "them")}.`, "How many birds are on the fence now?"]],
  ["⭐", "❤️", (a, b, w) => [`${w} draws ${V25MA6_N(a, "star")} and ${V25MA6_N(b, "heart")} on a card.`, `How many pictures does ${w} draw?`]],
  ["🧸", "🚚", (a, b) => [`The toy box has ${V25MA6_N(a, "teddy bear")} and ${V25MA6_N(b, "toy truck")}.`, "How many toys are in the box?"]],
  ["🧁", "🧁", (a, b) => [`The bakery sells ${V25MA6_N(a, "cupcake")} in the morning and ${V25MA6_N(b, "cupcake")} in the afternoon.`, "How many cupcakes does it sell?"]],
  ["🖍️", "🖍️", (a, b, w) => [`${w} has ${V25MA6_N(a, "red crayon")} and ${V25MA6_N(b, "yellow crayon")}.`, `How many crayons does ${w} have?`]],
  ["🐶", "🐶", (a, b) => [`${V25MA6_N(a, "dog")} ${V25MA6_V(a, "plays", "play")} at the dog park. ${V25MA6_N(b, "more dog")} ${V25MA6_V(b, "comes", "come")} through the gate.`, "How many dogs are at the park now?"]],
  ["🌼", "🌼", (a, b, w) => [`${w} plants ${V25MA6_N(a, "flower")} by the door and ${V25MA6_N(b, "flower")} by the gate.`, `How many flowers does ${w} plant?`]],
  ["⚽", "🏀", (a, b) => [`The gym bin holds ${V25MA6_N(a, "soccer ball")} and ${V25MA6_N(b, "basketball")}.`, "How many balls are in the bin?"]],
  ["🐞", "🐞", (a, b, w) => [`${w} sees ${V25MA6_N(a, "ladybug")} on a leaf and ${V25MA6_N(b, "ladybug")} on a flower.`, `How many ladybugs does ${w} see?`]],
];
addBank(6, "math", "add10", 0.3, () => {
  const i = R(0, V25MA6_ADD.length - 1), [e1, e2, f] = V25MA6_ADD[i], s = R(2, 10), a = R(1, s - 1), b = s - a, w = pick(KIDS), [setup, ask] = f(a, b, w);
  if (Math.random() < 0.65) {
    return { q: `${setup} ${ask}`, vis: e1 ? `<div class="eqrow">${grp(a, e1)}<span class="sym">+</span>${grp(b, e2)}</div>` : undefined, opts: V25MA6_nu(s, [s + 1, s - 1, a, b, a !== b ? Math.abs(a - b) : null, s + 2], 0, 12), ans: String(s), big: 1, why: `Put the groups together: ${a} + ${b} = ${s}.`, key: "v25a" + i + "_" + a + "_" + b + w, v25: { k: "story", a, b, s } };
  }
  const ans = `${a} + ${b} = ${s}`, big = Math.max(a, b), sm = Math.min(a, b);
  const opts = shuffle([ans, `${big} − ${sm} = ${big - sm}`, `${a} + ${b + 1} = ${s + 1}`, a > 1 ? `${a - 1} + ${b} = ${s - 1}` : `${a + 2} + ${b} = ${s + 2}`]);
  return { q: `${setup} Which number sentence matches the story?`, opts, ans, big: 1, why: `The story puts ${a} and ${b} together: ${a} + ${b} = ${s}.`, key: "v25m" + i + "_" + a + "_" + b + w, v25: { k: "sent", a, b, s } };
});
V25MA6_rule("add10", (x, raw, p, t) => {
  if (x.k === "story") {
    if (p == null) return null;
    if (p === x.a) return `${p} is only the first group. Add the ${x.b} too: ${x.a} + ${x.b} = ${x.s}.`;
    if (p === x.b) return `${p} is only the second group. Add the ${x.a} too: ${x.a} + ${x.b} = ${x.s}.`;
    if (p === Math.abs(x.a - x.b)) return `${p} is what you get by taking away. Putting groups together means adding.`;
    return `${x.a} + ${x.b} = ${x.s}, so ${V25MA6_off(p, x.s)}.`;
  }
  if (x.k === "sent") {
    const m = t.match(/^(\d+) ([+−]) (\d+) = (\d+)$/); if (!m) return null;
    if (m[2] === "−") return "The story puts groups together, so it needs adding, not taking away.";
    return `The story has ${x.a} and ${x.b}, not ${m[1]} and ${m[3]}.`;
  }
  return null;
});

/* ---------- sub10: real-life take-away stories, matching number sentences ---------- */
const V25MA6_SUB = [
  ["🎈", (a, b) => [`${V25MA6_N(a, "balloon")} ${V25MA6_V(a, "is", "are")} tied to a chair. ${b} ${V25MA6_V(b, "pops", "pop")}.`, "How many balloons are left?"]],
  ["🍪", (a, b, w) => [`${w} has ${V25MA6_N(a, "cookie")} in a lunch box. ${w} eats ${b}.`, "How many cookies are left?"]],
  ["🐸", (a, b) => [`${V25MA6_N(a, "frog")} ${V25MA6_V(a, "sits", "sit")} on a log. ${b} ${V25MA6_V(b, "hops", "hop")} into the pond.`, "How many frogs are still on the log?"]],
  [null, (a, b) => [`The bus has ${V25MA6_N(a, "kid")} on it. At the first stop, ${b} ${V25MA6_V(b, "gets", "get")} off.`, "How many kids are still on the bus?"]],
  [null, (a, b, w) => [`${w} blows ${V25MA6_N(a, "bubble")}. ${b} ${V25MA6_V(b, "pops", "pop")}.`, "How many bubbles are still floating?"]],
  ["🍃", (a, b) => [`A small plant has ${V25MA6_N(a, "leaf", "leaves")}. The wind blows ${b} away.`, "How many leaves are still on the plant?"]],
  ["🖍️", (a, b, w) => [`${w} has ${V25MA6_N(a, "crayon")}. ${w} lends ${b} to a friend.`, `How many crayons does ${w} have now?`]],
  ["🥚", (a, b, w) => [`A carton has ${V25MA6_N(a, "egg")}. ${w} uses ${b} to bake a cake.`, "How many eggs are left in the carton?"]],
  ["🐦", (a, b) => [`${V25MA6_N(a, "bird")} ${V25MA6_V(a, "is", "are")} at the feeder. ${b} ${V25MA6_V(b, "flies", "fly")} away.`, "How many birds are still at the feeder?"]],
  [null, (a, b) => [`The toy shop has ${V25MA6_N(a, "kite")}. It sells ${b} today.`, "How many kites are left?"]],
  [null, (a, b, w) => [`${w} plants ${V25MA6_N(a, "seed")}. ${b} ${V25MA6_V(b, "does", "do")} not sprout.`, "How many seeds sprout?"]],
  ["⭐", (a, b, w) => [`${w} has ${V25MA6_N(a, "star sticker")}. ${w} puts ${b} on a card for a friend.`, "How many star stickers are left?"]],
  ["🍓", (a, b, w) => [`A plate has ${V25MA6_N(a, "strawberry", "strawberries")}. ${w} eats ${b}.`, "How many strawberries are left on the plate?"]],
  ["🦆", (a, b) => [`${V25MA6_N(a, "duck")} ${V25MA6_V(a, "is", "are")} in the pond. ${b} ${V25MA6_V(b, "waddles", "waddle")} out onto the grass.`, "How many ducks are still in the pond?"]],
  ["🚗", (a, b) => [`${V25MA6_N(a, "car")} ${V25MA6_V(a, "is", "are")} in the parking lot. ${b} ${V25MA6_V(b, "drives", "drive")} away.`, "How many cars are still parked?"]],
  [null, (a, b, w) => [`${w} has ${V25MA6_N(a, "marble")}. ${w} loses ${b} under the couch.`, `How many marbles does ${w} still have?`]],
  ["✏️", (a, b, w) => [`A pack has ${V25MA6_N(a, "pencil")}. ${w} gives ${b} to classmates.`, "How many pencils are left in the pack?"]],
  ["🐟", (a, b) => [`${V25MA6_N(a, "fish", "fish")} ${V25MA6_V(a, "swims", "swim")} near a rock. ${b} ${V25MA6_V(b, "swims", "swim")} away.`, "How many fish are still near the rock?"]],
];
addBank(6, "math", "sub10", 0.3, () => {
  const i = R(0, V25MA6_SUB.length - 1), [e, f] = V25MA6_SUB[i], a = R(2, 10), b = R(1, a), d = a - b, w = pick(KIDS), [setup, ask] = f(a, b, w);
  if (Math.random() < 0.65) {
    return { q: `${setup} ${ask}`, vis: e ? crossed(a, b, e) : undefined, opts: V25MA6_nu(d, [d + 1, d - 1, a, b, a + b], 0, 20), ans: String(d), big: 1, why: `Start with ${a} and take away ${b}: ${a} − ${b} = ${d}.`, key: "v25a" + i + "_" + a + "_" + b + w, v25: { k: "story", a, b, d } };
  }
  const ans = `${a} − ${b} = ${d}`;
  const alts = shuffle([[a, b + 1], [a, b - 1], [a + 1, b], [a - 1, b], [a, b + 2], [a + 2, b]].filter(([x, y]) => y >= 1 && x >= y && x <= 12 && !(x === a && (y === b || y === d)))).slice(0, 2);
  const opts = shuffle([ans, `${a} + ${b} = ${a + b}`, ...alts.map(([x, y]) => `${x} − ${y} = ${x - y}`)]);
  return { q: `${setup} Which number sentence matches the story?`, opts, ans, big: 1, why: `The story starts with ${a} and takes away ${b}: ${a} − ${b} = ${d}.`, key: "v25m" + i + "_" + a + "_" + b + w, v25: { k: "sent", a, b, d } };
});
V25MA6_rule("sub10", (x, raw, p, t) => {
  if (x.k === "story") {
    if (p == null) return null;
    if (p === x.a) return `${p} is the number at the start. Take away ${x.b}: ${x.a} − ${x.b} = ${x.d}.`;
    if (p === x.b) return `${p} is the number taken away. Find what is left: ${x.a} − ${x.b} = ${x.d}.`;
    if (p === x.a + x.b) return `${p} is ${x.a} + ${x.b}. This story takes some away, so subtract.`;
    return `${x.a} − ${x.b} = ${x.d}, so ${V25MA6_off(p, x.d)}.`;
  }
  if (x.k === "sent") {
    const m = t.match(/^(\d+) ([+−]) (\d+) = (\d+)$/); if (!m) return null;
    if (m[2] === "+") return "The story takes some away, so it needs minus, not plus.";
    return `The story starts with ${x.a} and takes away ${x.b}, not ${m[1]} and ${m[3]}.`;
  }
  return null;
});

/* ---------- shapes: tracing real objects, building shapes with straws ---------- */
const V25MA6_SDESC = { circle: "is round with no sides", triangle: "has 3 sides", square: "has 4 sides that are all the same length", rectangle: "has 2 long sides and 2 short sides", pentagon: "has 5 sides", hexagon: "has 6 sides" };
const V25MA6_TRACE = [
  ["🥫", "the bottom of a can", "circle", 1], ["🍽️", "a dinner plate", "circle", 1], ["🥞", "a pancake", "circle", 1], ["🥁", "the top of a drum", "circle", 1], [null, "the lid of a jar", "circle", 1], ["☕", "the bottom of a mug", "circle", 1],
  ["🎲", "one face of a number cube", "square", 1], [null, "a sticky note", "square", 1], [null, "one face of an alphabet block", "square", 1],
  ["📕", "the cover of a book", "rectangle", 1], ["🍫", "a chocolate bar", "rectangle", 1], ["🃏", "a playing card", "rectangle", 1], ["📏", "a ruler", "rectangle", 1], ["📄", "a sheet of paper", "rectangle", 1], [null, "the front of a cereal box", "rectangle", 1],
  ["⛵", "the sail on a toy boat", "triangle", 0], ["🚩", "a pennant flag", "triangle", 0], [null, "half of a square sandwich cut from corner to corner", "triangle", 0], [null, "a yield sign on the road", "triangle", 0],
  ["⚾", "home plate on a baseball field", "pentagon", 0],
];
const V25MA6_SNAMES = ["circle", "triangle", "square", "rectangle", "pentagon", "hexagon"];
const V25MA6_SSIDES = { triangle: 3, square: 4, pentagon: 5, hexagon: 6 };
const V25MA6_BYSIDES = { 3: "triangle", 4: "square", 5: "pentagon", 6: "hexagon" };
addBank(6, "math", "shapes", 0.3, () => {
  const r = Math.random(), w = pick(KIDS);
  if (r < 0.45) {
    const i = R(0, V25MA6_TRACE.length - 1), [e, obj, s, tr] = V25MA6_TRACE[i];
    const others = shuffle(V25MA6_SNAMES.filter(x => x !== s && !(s === "square" && x === "rectangle") && !(s === "rectangle" && x === "square"))).slice(0, 3);
    const q = tr ? `${w} traces around ${obj} on paper. What shape does ${w} draw?` : `${w} looks at ${obj}. Which shape does it look like?`;
    return { q, vis: e ? bigEmo(e) : undefined, opts: shuffle([s, ...others]), ans: s, big: 1, why: `${cap(obj)} is shaped like a ${s}. A ${s} ${V25MA6_SDESC[s]}.`, key: "v25t" + i + w, v25: { k: "trace", s, obj } };
  }
  const names = Object.keys(V25MA6_SSIDES);
  if (r < 0.65) {
    const s = pick(names), n = V25MA6_SSIDES[s];
    return { q: `${w} makes a ${s} with straws. Each side is 1 straw. How many straws does ${w} use?`, vis: shape(s, pick(SHAPE_COLS), 120), opts: V25MA6_nu(n, [n + 1, n - 1, n + 2], 1, 12), ans: String(n), big: 1, why: `A ${s} has ${n} sides, so ${w} needs ${n} straws.`, key: "v25o" + s + w, v25: { k: "one", s, n } };
  }
  if (r < 0.85) {
    const s1 = pick(names), s2 = pick(names), x = V25MA6_SSIDES[s1], y = V25MA6_SSIDES[s2], t = x + y;
    const what = s1 === s2 ? `2 ${s1}s` : `a ${s1} and a ${s2}`;
    return { q: `${w} makes ${what} with straws. Each side is 1 straw. How many straws does ${w} use in all?`, vis: row(shape(s1, "#FF7A59", 90), shape(s2, "#3D7BFF", 90)), opts: V25MA6_nu(t, [t + 1, t - 1, x, y, t + 2], 1, 14), ans: String(t), big: 1, why: `${cap(s1 === s2 ? `each ${s1}` : `the ${s1}`)} needs ${x} and ${s1 === s2 ? "the other" : `the ${s2}`} needs ${y}: ${x} + ${y} = ${t}.`, key: "v25w" + s1 + s2 + w, v25: { k: "two", s1, s2, x, y, t } };
  }
  const n = R(3, 6), s = V25MA6_BYSIDES[n], others = shuffle(["circle", ...names.filter(x => x !== s)]).slice(0, 3);
  return { q: `${w} has ${n} straws that are all the same length. ${w} uses all of them, 1 straw for each side, to make one shape. Which shape does ${w} make?`, opts: shuffle([s, ...others]), ans: s, big: 1, why: `${n} straws make ${n} equal sides, and a shape with ${n} sides is a ${s}.`, key: "v25h" + n + w, v25: { k: "has", n, s } };
});
V25MA6_rule("shapes", (x, raw, p, t) => {
  const pn = t.toLowerCase();
  if (x.k === "trace") { if (!V25MA6_SDESC[pn]) return null; return `A ${pn} ${V25MA6_SDESC[pn]}, but ${x.obj} ${V25MA6_SDESC[x.s]}.`; }
  if (x.k === "has") {
    if (pn === "circle") return "A circle is round with no straight sides, so straws can't make it.";
    const k = V25MA6_SSIDES[pn]; if (!k) return null;
    return `A ${pn} has ${k} sides, so it needs ${k} straws, not ${x.n}.`;
  }
  if (p == null) return null;
  if (x.k === "one") return V25MA6_BYSIDES[p] ? `${p} straws would make a ${V25MA6_BYSIDES[p]}, not a ${x.s}.` : `A ${x.s} has ${x.n} sides, so it needs ${x.n} straws, not ${p}.`;
  if (x.k === "two") {
    if (x.s1 === x.s2 && p === x.x) return `${p} straws make only one ${x.s1}. There are 2 of them.`;
    if (p === x.x) return `${p} straws is only the ${x.s1}. Add the ${x.y} straws for the ${x.s2}.`;
    if (p === x.y) return `${p} straws is only the ${x.s2}. Add the ${x.x} straws for the ${x.s1}.`;
    return `${x.x} + ${x.y} = ${x.t}, so ${V25MA6_off(p, x.t)}.`;
  }
  return null;
});

/* ---------- compare: who has more, two-digit team totals, matching up ---------- */
const V25MA6_CITEMS = [["sticker", "stickers"], ["marble", "marbles"], ["shell", "shells"], ["toy car", "toy cars"], ["book", "books"], ["crayon", "crayons"], ["rock", "rocks"], ["button", "buttons"], ["bead", "beads"], ["stamp", "stamps"], ["leaf", "leaves"], ["acorn", "acorns"], ["pinecone", "pinecones"], ["trading card", "trading cards"], ["block", "blocks"], ["ribbon", "ribbons"], ["feather", "feathers"]];
const V25MA6_TEAMS = [
  ["the Red team", "the Blue team", (l, x) => `${cap(l)} scored ${x} points`, "Which team scored more points?", "Which team scored fewer points?"],
  ["Room 4", "Room 7", (l, x) => `${l} collected ${x} cans for the food drive`, "Which class collected more cans?", "Which class collected fewer cans?"],
  ["Saturday", "Sunday", (l, x) => `On ${l}, the farm stand sold ${x} pumpkins`, "On which day did the farm stand sell more pumpkins?", "On which day did the farm stand sell fewer pumpkins?"],
  ["the morning bus", "the afternoon bus", (l, x) => `${cap(l)} carried ${x} kids`, "Which bus carried more kids?", "Which bus carried fewer kids?"],
  ["the art club", "the chess club", (l, x) => `${cap(l)} has ${x} members`, "Which club has more members?", "Which club has fewer members?"],
  ["Monday", "Tuesday", (l, x) => `On ${l}, the library lent ${x} books`, "On which day did the library lend more books?", "On which day did the library lend fewer books?"],
  ["the pond", "the lake", (l, x) => `There are ${x} ducks at ${l}`, "Which place has more ducks?", "Which place has fewer ducks?"],
  ["the first grade", "the second grade", (l, x) => `${cap(l)} read ${x} books this month`, "Which grade read more books?", "Which grade read fewer books?"],
  ["the green garden", "the yellow garden", (l, x) => `${cap(l)} grew ${x} carrots`, "Which garden grew more carrots?", "Which garden grew fewer carrots?"],
  ["the bake sale", "the lemonade stand", (l, x) => `${cap(l)} had ${x} visitors`, "Which one had more visitors?", "Which one had fewer visitors?"],
];
const V25MA6_MATCH = [
  ["cup", "cups", "plate", "plates", (a, b, w) => `${w} sets the table with ${V25MA6_N(a, "cup")} and ${V25MA6_N(b, "plate")}. How many more plates does ${w} need so every cup has a plate?`],
  ["kid", "kids", "chair", "chairs", (a, b) => `${V25MA6_N(a, "kid")} come to a party. There ${V25MA6_V(b, "is", "are")} ${V25MA6_N(b, "chair")}. How many more chairs are needed so every kid has a chair?`],
  ["dog", "dogs", "bone", "bones", (a, b, w) => `${V25MA6_N(a, "dog")} live at the shelter. ${w} has ${V25MA6_N(b, "bone")}. How many more bones does ${w} need so each dog gets one?`],
  ["bike", "bikes", "helmet", "helmets", (a, b) => `The club has ${V25MA6_N(a, "bike")} and ${V25MA6_N(b, "helmet")}. How many more helmets are needed so every bike has a helmet?`],
  ["flower", "flowers", "vase", "vases", (a, b, w) => `${w} picks ${V25MA6_N(a, "flower")} and has ${V25MA6_N(b, "vase")}. One flower goes in each vase. How many more vases does ${w} need?`],
  ["kid", "kids", "paintbrush", "paintbrushes", (a, b) => `${V25MA6_N(a, "kid")} sit at the art table. There ${V25MA6_V(b, "is", "are")} ${V25MA6_N(b, "paintbrush", "paintbrushes")}. How many more paintbrushes are needed so every kid gets one?`],
  ["letter", "letters", "stamp", "stamps", (a, b, w) => `${w} writes ${V25MA6_N(a, "letter")} and has ${V25MA6_N(b, "stamp")}. Each letter needs 1 stamp. How many more stamps does ${w} need?`],
  ["kid", "kids", "juice box", "juice boxes", (a, b) => `${V25MA6_N(a, "kid")} are on the team. The coach has ${V25MA6_N(b, "juice box", "juice boxes")}. How many more juice boxes are needed so every kid gets one?`],
  ["horse", "horses", "apple", "apples", (a, b, w) => `${V25MA6_N(a, "horse")} live on the farm. ${w} brings ${V25MA6_N(b, "apple")}. How many more apples does ${w} need so each horse gets one?`],
];
addBank(6, "math", "compare", 0.3, () => {
  const r = Math.random();
  if (r < 0.4) {
    const [w1, w2] = V25MA6_two(), it = pick(V25MA6_CITEMS), more = Math.random() < 0.5, a = R(1, 20); let b = Math.random() < 0.15 ? a : R(1, 20);
    const same = a === b, word = more ? "more" : "fewer", ans = same ? "They have the same" : ((more ? a > b : a < b) ? w1 : w2);
    const why = same ? `They both have ${a}, so neither one has ${word}.` : `${a > b ? w1 : w2} has ${Math.max(a, b)} and ${a > b ? w2 : w1} has ${Math.min(a, b)}. ${Math.max(a, b)} is more than ${Math.min(a, b)}, so ${ans} has ${word}.`;
    return { q: `${w1} has ${V25MA6_N(a, it[0], it[1])}. ${w2} has ${V25MA6_N(b, it[0], it[1])}. Who has ${word} ${it[1]}?`, opts: [w1, w2, "They have the same"], ans, big: 1, why, key: "v25h" + w1 + w2 + it[0] + a + "_" + b + more, v25: { k: "who", w1, w2, a, b, more } };
  }
  if (r < 0.7) {
    const i = R(0, V25MA6_TEAMS.length - 1), [l1, l2, f, qm, qf] = V25MA6_TEAMS[i];
    let x = R(10, 99), y = R(10, 99); while (y === x) y = R(10, 99);
    if (Math.random() < 0.35 && x % 10 && x % 10 !== Math.floor(x / 10)) y = (x % 10) * 10 + Math.floor(x / 10);
    const more = Math.random() < 0.55, ans = (more ? x > y : x < y) ? l1 : l2;
    const why = Math.floor(x / 10) !== Math.floor(y / 10) ? `Look at the tens first: ${Math.max(x, y)} has more tens than ${Math.min(x, y)}.` : `The tens are the same, so look at the ones: ${Math.max(x, y)} is more than ${Math.min(x, y)}.`;
    return { q: `${f(l1, x)}. ${f(l2, y)}. ${more ? qm : qf}`, opts: [cap(l1), cap(l2)], ans: cap(ans), big: 1, why, key: "v25t" + i + "_" + x + "_" + y + more, v25: { k: "team", l1: cap(l1), l2: cap(l2), x, y, more } };
  }
  const i = R(0, V25MA6_MATCH.length - 1), [s1, p1, s2, p2, f] = V25MA6_MATCH[i], a = R(3, 10), b = R(1, a - 1), d = a - b, w = pick(KIDS);
  return { q: f(a, b, w), opts: V25MA6_nu(d, [d + 1, d - 1, a, b, a + b], 0, 20), ans: String(d), big: 1, why: `Each of the ${a} ${p1} needs ${/^[aeiou]/.test(s2) ? "an" : "a"} ${s2}. ${a} − ${b} = ${d}, so ${d} more ${V25MA6_V(d, s2, p2)} ${V25MA6_V(d, "is", "are")} needed.`, key: "v25m" + i + "_" + a + "_" + b + w, v25: { k: "match", a, b, d, p1, p2 } };
});
V25MA6_rule("compare", (x, raw, p, t) => {
  if (x.k === "who") {
    const word = x.more ? "more" : "fewer";
    if (t === "They have the same") return `${x.a} and ${x.b} are not the same, so one of them has ${word}.`;
    if (x.a === x.b) return `They both have ${x.a}, so ${t} does not have ${word}.`;
    const mine = t === x.w1 ? x.a : t === x.w2 ? x.b : null; if (mine == null) return null;
    const other = mine === x.a ? x.b : x.a;
    return `${t} has ${mine}, and ${mine} is ${mine < other ? "less" : "more"} than ${other}.`;
  }
  if (x.k === "team") {
    const mine = t === x.l1 ? x.x : t === x.l2 ? x.y : null; if (mine == null) return null;
    const other = mine === x.x ? x.y : x.x;
    return `${mine} is ${mine < other ? "less" : "more"} than ${other}, so that is not the one with ${x.more ? "more" : "fewer"}.`;
  }
  if (x.k === "match" && p != null) {
    if (p === x.a) return `${p} is how many ${x.p1} there are, not how many more ${x.p2} are needed.`;
    if (p === x.b) return `${p} is how many ${x.p2} there are now, not how many more are needed.`;
    if (p === x.a + x.b) return `${p} is both numbers added. Find the difference: ${x.a} − ${x.b} = ${x.d}.`;
    return `${x.b} + ${p} = ${x.b + p}, not ${x.a}.`;
  }
  return null;
});

/* ---------- oclock: how long things last, hours until, who is earlier ---------- */
const V25MA6_LAST = [["The movie", 3], ["The birthday party", 3], ["The field trip", 3], ["The swim lesson", 1], ["The art class", 2], ["The bake sale", 3], ["The puppet show", 1], ["The school concert", 2], ["The picnic", 3], ["The museum visit", 2], ["The craft fair", 3], ["The parade", 2], ["The soccer camp", 3], ["Family game night", 2], ["The music lesson", 1], ["The library story time", 1]];
const V25MA6_UNTIL = [["The bike ride", "the bike ride"], ["Swim class", "swim class"], ["Grandpa's visit", "Grandpa's visit"], ["The party", "the party"], ["The baseball game", "the baseball game"], ["The soccer game", "the soccer game"], ["Music class", "music class"], ["The library trip", "the library trip"], ["Art club", "art club"], ["The puppet show", "the puppet show"], ["The magic show", "the magic show"], ["The pool trip", "the pool trip"]];
const V25MA6_PLACES = ["the park", "the pool", "the library", "the zoo", "the beach", "the museum", "the playground", "the farm", "the skating rink", "the fair", "the garden", "the bakery"];
addBank(6, "math", "oclock", 0.3, () => {
  const r = Math.random(), oc = x => `${x} o'clock`;
  if (r < 0.4) {
    const i = R(0, V25MA6_LAST.length - 1), [ev, mx] = V25MA6_LAST[i], d = R(1, mx), h = R(1, 12 - d), e = h + d;
    const cands = [h, V25MA6_hr(e + 1), e - 1 !== h ? e - 1 : null, V25MA6_hr(e + 2)].filter(v => v != null && v !== e);
    return { q: `${ev} starts at ${h} o'clock. It lasts ${V25MA6_N(d, "hour")}. What time does it end?`, vis: clock(h, 0), opts: uniq(e, cands).map(v => oc(v)), ans: oc(e), big: 1, why: `Count ${V25MA6_N(d, "hour")} forward from ${h}: ${range(1, d).map(k => h + k).join(", ")}. It ends at ${e} o'clock.`, key: "v25l" + i + "_" + h + "_" + d, v25: { k: "last", h, d, e } };
  }
  if (r < 0.7) {
    const i = R(0, V25MA6_UNTIL.length - 1), [E, ev] = V25MA6_UNTIL[i], h = R(1, 11), e = R(h + 1, Math.min(12, h + 5)), d = e - h;
    return { q: `It is ${h} o'clock. ${E} is at ${e} o'clock. How many hours until ${ev}?`, vis: clock(h, 0), opts: V25MA6_nu(d, [d + 1, d - 1, e, h, d + 2], 1, 12), ans: String(d), big: 1, why: `Count the hours from ${h} to ${e}: ${range(h + 1, e).join(", ")}. That is ${V25MA6_N(d, "hour")}, because ${h} + ${d} = ${e}.`, key: "v25u" + i + "_" + h + "_" + e, v25: { k: "until", h, e, d } };
  }
  const [w1, w2] = V25MA6_two(), pl = pick(V25MA6_PLACES), a = R(1, 5); let b = R(1, 5); while (b === a) b = R(1, 5);
  const first = Math.random() < 0.6, ans = (first ? a < b : a > b) ? w1 : w2;
  return { q: `This afternoon, ${w1} gets to ${pl} at ${a} o'clock. ${w2} gets there at ${b} o'clock. Who gets there ${first ? "first" : "later"}?`, opts: [w1, w2], ans, big: 1, why: `${Math.min(a, b)} o'clock comes before ${Math.max(a, b)} o'clock, so ${ans} gets there ${first ? "first" : "later"}.`, key: "v25f" + w1 + w2 + pl + a + b + first, v25: { k: "first", w1, w2, a, b, first } };
});
V25MA6_rule("oclock", (x, raw, p, t) => {
  if (x.k === "last") {
    const m = t.match(/^(\d+) o'clock$/); if (!m) return null; const v = +m[1];
    if (v === x.h) return `${v} o'clock is when it starts, not when it ends.`;
    const f = ((v - x.h) % 12 + 12) % 12;
    return `${v} o'clock is ${V25MA6_N(f, "hour")} after ${x.h} o'clock, but it lasts ${V25MA6_N(x.d, "hour")}.`;
  }
  if (x.k === "until") {
    if (p == null) return null;
    if (p === x.e && p !== x.d) return `${p} o'clock is when it happens, not how many hours away it is.`;
    if (p === x.h && p !== x.d) return `${p} o'clock is the time now. Count the hours from ${x.h} to ${x.e}.`;
    return `${V25MA6_N(p, "hour")} after ${x.h} o'clock is ${V25MA6_hr(x.h + p)} o'clock, not ${x.e} o'clock.`;
  }
  if (x.k === "first") {
    const mine = t === x.w1 ? x.a : t === x.w2 ? x.b : null; if (mine == null) return null; const other = mine === x.a ? x.b : x.a;
    return `${t} gets there at ${mine} o'clock, which is ${mine < other ? "earlier" : "later"} than ${other} o'clock.`;
  }
  return null;
});

/* ---------- patterns: word and action patterns, skip-counting in real life ---------- */
const V25MA6_WPAT = [
  [w => `${w} makes up a dance:`, ["clap", "stomp", "jump", "spin", "snap"]],
  [w => `${w} strings beads on a necklace:`, ["red", "blue", "yellow", "green", "white"]],
  [w => `${w} paints the boards of a fence:`, ["red", "white", "blue", "green"]],
  [w => `${w} sings a song that goes:`, ["la", "dee", "dum", "doo"]],
  [() => "The class plays an animal sound game:", ["moo", "quack", "baa", "oink"]],
  [w => `${w} lines up snacks on a plate:`, ["apple", "cracker", "grape", "cheese"]],
  [() => "Shirts hang on the clothesline:", ["striped", "dotted", "plain", "checked"]],
  [w => `${w} puts stickers in a row:`, ["star", "heart", "moon", "smiley"]],
  [w => `${w} plays the drum:`, ["boom", "tap", "tick"]],
  [() => "The lights on a string go:", ["red", "green", "gold", "blue"]],
  [w => `${w} builds a tower, from the bottom up:`, ["big block", "small block", "long block"]],
  [w => `On the playground, ${w} goes:`, ["hop", "skip", "jump", "run"]],
  [() => "The tiles on the kitchen floor go:", ["black", "white", "gray"]],
  [w => `${w} cuts paper shapes for a banner:`, ["triangle", "square", "circle"]],
  [() => "The paper leaves on the classroom wall go:", ["red", "orange", "yellow", "brown"]],
  [w => `${w} taps out a beat:`, ["knee", "clap", "shoulder", "head"]],
];
const V25MA6_WTYPES = [[0, 1], [0, 0, 1], [0, 1, 1], [0, 1, 2], [0, 0, 1, 1], [0, 1, 2, 1]];
const V25MA6_SKIP = [
  [2, "Each kid has 2 eyes. Count the eyes by 2s:"], [2, "Each pair of shoes has 2 shoes. Count the shoes by 2s:"], [2, "Each bike has 2 wheels. Count the wheels by 2s:"], [2, "Each duck has 2 feet. Count the feet by 2s:"], [2, "Socks come in pairs. Count the socks by 2s:"],
  [5, "Each hand has 5 fingers. Count the fingers by 5s:"], [5, "Each star sticker has 5 points. Count the points by 5s:"], [5, "Each flower has 5 petals. Count the petals by 5s:"], [5, "Each pack has 5 juice boxes. Count the juice boxes by 5s:"],
  [10, "Each kid has 10 toes. Count the toes by 10s:"], [10, "Each box holds 10 crayons. Count the crayons by 10s:"], [10, "Each bag has 10 marbles. Count the marbles by 10s:"], [10, "Each stack has 10 cups. Count the cups by 10s:"],
];
addBank(6, "math", "patterns", 0.3, () => {
  if (Math.random() < 0.6) {
    const i = R(0, V25MA6_WPAT.length - 1), [intro, pool] = V25MA6_WPAT[i], type = pick(V25MA6_WTYPES), w = pick(KIDS);
    const P = type.length, k = Math.max(...type) + 1, words = shuffle(pool), len = Math.min(9, Math.max(2 * P, R(5, 8)));
    const seq = Array.from({ length: len + 1 }, (_, j) => words[type[j % P]]), ans = seq[len], unit = type.map(t => words[t]);
    const opts = uniq(ans, words.slice(0, k).concat(words.slice(k)));
    return { q: `${intro(w)} ${seq.slice(0, len).join(", ")}, … What comes next?`, opts, ans, big: 1, why: `The part that repeats is "${unit.join(", ")}". Keep it going and the next one is ${ans}.`, key: "v25w" + i + type.join("") + len + words.slice(0, k).join() + w, v25: { k: "word", seq: seq.slice(0, len), unit, ans } };
  }
  const i = R(0, V25MA6_SKIP.length - 1), [st, ctx] = V25MA6_SKIP[i], L = R(3, 5), s0 = R(1, st === 10 ? 7 : st === 5 ? 6 : 8), seq = range(0, L - 1).map(j => (s0 + j) * st), last = seq[L - 1], ans = last + st;
  const alt = st === 2 ? 5 : 2;
  return { q: `${ctx} ${seq.join(", ")}, … What number comes next?`, vis: train([...seq, "?"]), opts: V25MA6_nu(ans, [last + 1, last + alt, ans + st, ans - 1, ans + 1], 1, 130), ans: String(ans), big: 1, why: `Each jump adds ${st}: ${last} + ${st} = ${ans}.`, key: "v25k" + i + "_" + s0 + "_" + L, v25: { k: "skip", st, last, ans } };
});
V25MA6_rule("patterns", (x, raw, p, t) => {
  if (x.k === "word") {
    if (!x.seq.includes(t)) return `${xQ(t)} is not in this pattern at all.`;
    const P = x.unit.length, len = x.seq.length, rr = len % P;
    if (rr === 0) return `The part "${x.unit.join(", ")}" just ended, so it starts again with ${x.ans}, not ${t}.`;
    return `The part "${x.unit.join(", ")}" started again with ${x.seq.slice(len - rr).join(", ")}, so ${x.ans} comes next, not ${t}.`;
  }
  if (x.k === "skip" && p != null) {
    if (p === x.last + 1) return `${p} counts by 1s, but here each jump is ${x.st}.`;
    if (p === x.last) return `${p} is the last number shown. Jump ${x.st} more.`;
    if (p > x.last) return `${x.last} + ${p - x.last} = ${p}, but each jump is ${x.st}.`;
    return `${p} is smaller than ${x.last}, but counting by ${x.st}s goes up.`;
  }
  return null;
});

/* ---------- doubles: doubles in real life, sharing a double ---------- */
const V25MA6_DBL = [
  ["🐟", 1, 10, (n, w, w2) => [`${w} has ${V25MA6_N(n, "fish", "fish")}. ${w2} has the same number of fish.`, "How many fish do they have together?"]],
  ["🐞", 1, 6, n => [`A ladybug has ${V25MA6_N(n, "spot")} on each wing.`, "How many spots are on both wings?"]],
  ["🎲", 1, 6, (n, w) => [`${w} rolls two number cubes. Both land on ${n}.`, "What is the total?"]],
  [null, 1, 10, n => [`A double-decker bus has ${V25MA6_N(n, "kid")} upstairs and ${V25MA6_N(n, "kid")} downstairs.`, "How many kids are on the bus?"]],
  [null, 1, 10, (n, w) => [`${w} builds two towers. Each tower has ${V25MA6_N(n, "block")}.`, `How many blocks does ${w} use?`]],
  ["🥚", 1, 6, n => [`An egg carton has 2 rows. Each row has ${V25MA6_N(n, "egg")}.`, "How many eggs are in the carton?"]],
  [null, 1, 9, (n, w, w2) => [`Twins ${w} and ${w2} each have a birthday cake with ${V25MA6_N(n, "candle")}.`, "How many candles are there in all?"]],
  ["🚗", 1, 10, (n, w, w2) => [`${w} has ${V25MA6_N(n, "toy car")}. ${w2} brings the same number of toy cars.`, "How many toy cars are there now?"]],
  ["🐠", 1, 10, n => [`The pet store has 2 fish tanks. Each tank has ${V25MA6_N(n, "fish", "fish")}.`, "How many fish are in both tanks?"]],
  [null, 1, 10, (n, w) => [`${w} jumps rope ${V25MA6_N(n, "time")} on Monday and ${V25MA6_N(n, "time")} on Tuesday.`, `How many times does ${w} jump in all?`]],
  ["🦆", 1, 6, (n, w) => [`${w} puts ${V25MA6_N(n, "rubber duck")} in front of a mirror. The mirror shows the same number of ducks.`, `Counting the real ducks and the ducks in the mirror, how many ducks does ${w} see?`]],
  ["🍇", 1, 10, (n, w) => [`${w} holds ${V25MA6_N(n, "grape")} in each hand.`, `How many grapes does ${w} hold?`]],
  [null, 2, 4, n => [`A van has 2 rows of seats. Each row has ${V25MA6_N(n, "seat")}.`, "How many seats are in the 2 rows?"]],
  ["🌸", 1, 8, (n, w) => [`${w} draws ${V25MA6_N(n, "flower")} on the front of a card and the same number on the back.`, `How many flowers does ${w} draw?`]],
  ["🍪", 1, 10, (n, w) => [`${w} bakes 2 trays of cookies. Each tray has ${V25MA6_N(n, "cookie")}.`, "How many cookies are there in all?"]],
  ["🧦", 1, 10, (n, w) => [`${w} has ${V25MA6_N(n, "red sock")} and the same number of blue socks.`, `How many socks does ${w} have?`]],
  [null, 1, 9, (n, w) => [`${w} reads ${V25MA6_N(n, "page")} before lunch and ${V25MA6_N(n, "page")} after lunch.`, `How many pages does ${w} read?`]],
];
const V25MA6_SHARE = [["🍪", "cookie", "cookies"], [null, "cracker", "crackers"], ["⭐", "sticker", "stickers"], [null, "marble", "marbles"], ["🍇", "grape", "grapes"], ["🖍️", "crayon", "crayons"], [null, "block", "blocks"], ["🍓", "strawberry", "strawberries"], [null, "pretzel", "pretzels"], ["🚗", "toy car", "toy cars"], [null, "bead", "beads"], ["🍎", "apple slice", "apple slices"]];
addBank(6, "math", "doubles", 0.3, () => {
  const [w, w2] = V25MA6_two();
  if (Math.random() < 0.65) {
    const i = R(0, V25MA6_DBL.length - 1), [e, lo, hi, f] = V25MA6_DBL[i], n = R(lo, hi), [setup, ask] = f(n, w, w2);
    return { q: `${setup} ${ask}`, vis: e && n <= 6 ? `<div class="eqrow">${grp(n, e)}<span class="sym">+</span>${grp(n, e)}</div>` : undefined, opts: V25MA6_nu(2 * n, [2 * n + 1, 2 * n - 1, n, 2 * n + 2, n + 2], 0, 22), ans: String(2 * n), big: 1, why: `It is a double: ${n} + ${n} = ${2 * n}.`, key: "v25d" + i + "_" + n + w + w2, v25: { k: "dbl", n } };
  }
  const i = R(0, V25MA6_SHARE.length - 1), [e, s, p] = V25MA6_SHARE[i], n = R(1, 10);
  return { q: `${w} and ${w2} share ${V25MA6_N(2 * n, s, p)} equally. How many does each kid get?`, vis: e && n <= 6 ? grp(2 * n, e) : undefined, opts: V25MA6_nu(n, [n + 1, n - 1, 2 * n, n + 2], 0, 20), ans: String(n), big: 1, why: `${n} + ${n} = ${2 * n}, so each kid gets ${n}.`, key: "v25s" + i + "_" + n + w + w2, v25: { k: "half", n } };
});
V25MA6_rule("doubles", (x, raw, p) => {
  if (p == null) return null;
  if (x.k === "dbl") {
    if (p === x.n) return `${p} is just one group. A double is two groups: ${x.n} + ${x.n} = ${2 * x.n}.`;
    return `${x.n} + ${x.n} = ${2 * x.n}, so ${V25MA6_off(p, 2 * x.n)}.`;
  }
  if (x.k === "half") {
    if (p === 2 * x.n) return `${p} is all of them. Two kids share, so each gets half.`;
    return `${p} + ${p} = ${2 * p}, not ${2 * x.n}.`;
  }
  return null;
});

/* ---------- numwords: reading number words on signs and labels, writing the word ---------- */
const V25MA6_SIGN = [
  [1, 20, w => `The bus sign says "Route ${w}."`, "What is the bus number?"],
  [1, 20, w => `The door says "Room ${w}."`, "What is the room number?"],
  [2, 20, w => `A sign at the zoo says "${cap(w)} penguins live here."`, "How many penguins live there?"],
  [2, 6, w => `The recipe says "Add ${w} eggs."`, "How many eggs go in?"],
  [2, 20, w => `Grandma's note says "I will visit in ${w} days."`, "In how many days will Grandma visit?"],
  [3, 12, w => `The game box says "For ages ${w} and up."`, "What is the youngest age for this game?"],
  [2, 20, w => `The jar label says "${cap(w)} buttons."`, "How many buttons are in the jar?"],
  [0, 20, w => `The scoreboard says "Home team: ${w}."`, "How many points does the home team have?"],
  [1, 20, w => `The top of the page says "Chapter ${cap(w)}."`, "What is the chapter number?"],
  [2, 20, w => `A poster says "${cap(w)} days until summer!"`, "How many days are left until summer?"],
  [1, 20, (w, k) => `${k}'s ticket says "Seat ${w}."`, "What is the seat number?"],
  [8, 20, w => `The crayon box says "${cap(w)} crayons."`, "How many crayons are in the box?"],
  [2, 10, w => `The plant tag says "Water every ${w} days."`, "Every how many days should the plant get water?"],
  [2, 20, w => `A note on the fridge says "Buy ${w} apples."`, "How many apples are on the list?"],
  [2, 12, w => `The cupcake box says "${cap(w)} cupcakes inside."`, "How many cupcakes are in the box?"],
  [2, 20, w => `A trail sign says "Lake: ${w} miles."`, "How many miles away is the lake?"],
];
addBank(6, "math", "numwords", 0.3, () => {
  const k = pick(KIDS);
  if (Math.random() < 0.55) {
    const i = R(0, V25MA6_SIGN.length - 1), [lo, hi, f, ask] = V25MA6_SIGN[i], n = R(lo, hi);
    return { q: `${f(NUMWORDS[n], k)} ${ask}`, opts: V25MA6_nu(n, [n + 1, n - 1, n + 10, n - 10, n + 2], 0, 30), ans: String(n), big: 1, why: `${cap(NUMWORDS[n])} means ${n}.`, key: "v25g" + i + "_" + n + k, v25: { k: "sign", n } };
  }
  const i = R(0, V25MA6_SCENE.length - 1), [e, s, p, place] = V25MA6_SCENE[i], n = R(1, 20), noun = n === 1 ? s : p;
  const near = [n + 1, n - 1, n + 10, n - 10, n + 2].filter(v => v >= 0 && v <= 20).map(v => NUMWORDS[v]);
  return { q: `${k} counts ${n} ${noun} ${place} and writes: "I counted ___ ${noun}." Which word goes in the blank?`, say: `${k} counts ${n} ${noun} ${place} and writes: I counted blank ${noun}. Which word goes in the blank?`, vis: hw(`I counted ___ ${noun}.`), opts: uniq(NUMWORDS[n], shuffle(near)), ans: NUMWORDS[n], big: 1, why: `${n} is written ${NUMWORDS[n]}.`, key: "v25b" + i + "_" + n + k, v25: { k: "blank", n, who: k } };
});
V25MA6_rule("numwords", (x, raw, p, t) => {
  if (x.k === "sign") { if (p == null || p > 100) return null; return `${p} is written ${xQ(MA6V_word(p))}, not ${xQ(NUMWORDS[x.n])}.`; }
  if (x.k === "blank") { const v = NUMWORDS.indexOf(t.toLowerCase()); if (v < 0) return null; return `${xQ(t)} means ${v}, but ${x.who} counted ${x.n}.`; }
  return null;
});

/* ---------- bonds: hidden-part stories, splitting into two groups ---------- */
const V25MA6_HIDE = [
  [(W, a) => [`There are ${V25MA6_N(W, "kid")} in the class. ${a} ${V25MA6_V(a, "is", "are")} inside. The rest are outside.`, "How many kids are outside?"]],
  [(W, a, w) => [`${w} has ${V25MA6_N(W, "crayon")}. ${a} ${V25MA6_V(a, "is", "are")} in the box. The rest are on the table.`, "How many crayons are on the table?"]],
  [(W, a) => [`A bag has ${V25MA6_N(W, "apple")}. ${a} ${V25MA6_V(a, "is", "are")} red. The rest are green.`, "How many apples are green?"]],
  [(W, a, w) => [`${w} bakes ${V25MA6_N(W, "cookie")}. ${a} ${V25MA6_V(a, "is", "are")} on a plate. The rest are in a jar.`, "How many cookies are in the jar?"]],
  [(W, a) => [`There are ${V25MA6_N(W, "dog")} at the park. ${a} ${V25MA6_V(a, "is", "are")} running. The rest are sleeping.`, "How many dogs are sleeping?"]],
  [(W, a, w) => [`${w} has ${V25MA6_N(W, "book")}. ${a} ${V25MA6_V(a, "is", "are")} on the shelf. The rest are in ${w}'s backpack.`, "How many books are in the backpack?"]],
  [(W, a) => [`A tank has ${V25MA6_N(W, "fish", "fish")}. ${a} ${V25MA6_V(a, "is", "are")} swimming in the open. The rest are hiding behind a rock.`, "How many fish are hiding?"]],
  [(W, a) => [`There are ${V25MA6_N(W, "bird")} in the yard. ${a} ${V25MA6_V(a, "is", "are")} on the roof. The rest are in a tree.`, "How many birds are in the tree?"]],
  [(W, a, w) => [`${w} has ${V25MA6_N(W, "stuffed animal")}. ${a} ${V25MA6_V(a, "is", "are")} on the bed. The rest are on a shelf.`, "How many stuffed animals are on the shelf?"]],
  [(W, a, w) => [`${w} holds ${V25MA6_N(W, "marble")}. ${a} ${V25MA6_V(a, "is", "are")} in ${w}'s left hand. The rest are in the right hand.`, "How many marbles are in the right hand?"]],
  [(W, a) => [`There are ${V25MA6_N(W, "cupcake")} on a tray. ${a} ${V25MA6_V(a, "has", "have")} sprinkles. The rest have no sprinkles.`, "How many cupcakes have no sprinkles?"]],
  [(W, a, w) => [`${w} has ${V25MA6_N(W, "balloon")}. ${a} ${V25MA6_V(a, "is", "are")} red. The rest are yellow.`, "How many balloons are yellow?"]],
  [(W, a) => [`There are ${V25MA6_N(W, "kid")} at the playground. ${a} ${V25MA6_V(a, "is", "are")} on the swings. The rest are on the slide.`, "How many kids are on the slide?"]],
  [(W, a) => [`The garage has ${V25MA6_N(W, "bike")}. ${a} ${V25MA6_V(a, "is", "are")} blue. The rest are green.`, "How many bikes are green?"]],
  [(W, a, w) => [`${w} has ${V25MA6_N(W, "sock")} in the laundry basket. ${a} ${V25MA6_V(a, "is", "are")} white. The rest are striped.`, "How many socks are striped?"]],
  [(W, a) => [`A toy train has ${V25MA6_N(W, "car")}. ${a} ${V25MA6_V(a, "is", "are")} red. The rest are blue.`, "How many train cars are blue?"]],
];
const V25MA6_SPLIT = [["cookie", "cookies", "plate", "plates", "onto", "on"], ["apple", "apples", "basket", "baskets", "into", "in"], ["fish", "fish", "bowl", "bowls", "into", "in"], ["book", "books", "shelf", "shelves", "onto", "on"], ["flower", "flowers", "vase", "vases", "into", "in"], ["toy car", "toy cars", "box", "boxes", "into", "in"], ["sticker", "stickers", "page", "pages", "onto", "on"], ["marble", "marbles", "cup", "cups", "into", "in"], ["shell", "shells", "bucket", "buckets", "into", "in"], ["sock", "socks", "drawer", "drawers", "into", "in"]];
addBank(6, "math", "bonds", 0.3, () => {
  const w = pick(KIDS);
  if (Math.random() < 0.65) {
    const i = R(0, V25MA6_HIDE.length - 1), W = R(5, 15), a = R(1, W - 2), b = W - a, [setup, ask] = V25MA6_HIDE[i][0](W, a, w);
    return { q: `${setup} ${ask}`, vis: bondSVG(W, a, "?"), opts: V25MA6_nu(b, [b + 1, b - 1, W, a, W + a], 0, 30), ans: String(b), big: 1, why: `The whole is ${W} and one part is ${a}. ${W} − ${a} = ${b}, because ${a} + ${b} = ${W}.`, key: "v25p" + i + "_" + W + "_" + a + w, v25: { k: "hide", W, a, b } };
  }
  const i = R(0, V25MA6_SPLIT.length - 1), [s, p, c, cs, into, inn] = V25MA6_SPLIT[i], W = R(5, 12), x = R(1, W - 1), cands = [];
  for (let g = 0; g < 20 && cands.length < 6; g++) { const u = R(1, W), y = W + pick([-1, 1, -2, 2]) - u; if (y >= 1 && !cands.includes(`${u} and ${y}`)) cands.push(`${u} and ${y}`); }
  return { q: `${w} puts all ${W} ${p} ${into} 2 ${cs}. How many could be ${inn} each ${c}?`, vis: bondSVG(W, "?", "?"), opts: uniq(`${x} and ${W - x}`, cands), ans: `${x} and ${W - x}`, big: 1, why: `${x} + ${W - x} = ${W}, so ${x} and ${W - x} use all ${W} ${p}.`, key: "v25s" + i + "_" + W + "_" + x + w, v25: { k: "split", W } };
});
V25MA6_rule("bonds", (x, raw, p, t) => {
  if (x.k === "split") { const m = t.match(/^(\d+) and (\d+)$/); return m ? `${m[1]} and ${m[2]} make ${+m[1] + +m[2]}, not ${x.W}.` : null; }
  if (x.k === "hide" && p != null) {
    if (p === x.W) return `${p} is all of them. Take away the ${x.a}: ${x.W} − ${x.a} = ${x.b}.`;
    if (p === x.a) return `${p} is the part we already know. The other part is ${x.b}, since ${x.a} + ${x.b} = ${x.W}.`;
    if (p === x.W + x.a) return `${p} is ${x.W} + ${x.a}. One part is missing from the whole, so take away.`;
    return `${x.a} and ${p} make ${x.a + p}, not ${x.W}.`;
  }
  return null;
});

/* ---------- ordinal: race results, kids in front or behind, days and months ---------- */
const V25MA6_RACE = [["In the sack race", "finished"], ["In the swim race", "finished"], ["In the bike race", "finished"], ["In the egg-and-spoon race", "finished"], ["In the hopping race", "finished"], ["In the crab-walk race", "finished"], ["In the running race", "finished"], ["At the slide", "went"], ["At the drinking fountain", "went"], ["At the art easel", "went"], ["In show-and-tell", "went"], ["At the pitching game", "went"]];
const V25MA6_LINES = ["the lunch line", "the line for the slide", "the line at the bus stop", "the line for the drinking fountain", "the line to see the puppet show", "the line at the library desk", "the line for face painting"];
const V25MA6_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], V25MA6_MONTHS = ["January", "February", "March", "April", "May", "June"];
addBank(6, "math", "ordinal", 0.3, () => {
  const r = Math.random();
  if (r < 0.4) {
    const ci = R(0, V25MA6_RACE.length - 1), [intro, vb] = V25MA6_RACE[ci], n = R(3, 5), names = shuffle(KIDS).slice(0, n), order = shuffle(range(0, n - 1));
    const story = `${intro}, ${order.map(j => `${names[j]} ${vb} ${V25MA6_ORDW[j]}`).join(". ")}.`, i = R(0, n - 1);
    if (Math.random() < 0.5) return { q: `${story} Who ${vb} ${V25MA6_ORDW[i]}?`, opts: shuffle([names[i], ...shuffle(names.filter((_, j) => j !== i)).slice(0, 3)]), ans: names[i], big: 1, why: `The story says ${names[i]} ${vb} ${V25MA6_ORDW[i]}.`, key: "v25r" + ci + names.join() + order.join("") + i + "w", v25: { k: "race", names, vb, i, ask: "who" } };
    const pl = range(0, n - 1).map(j => V25MA6_ORDW[j]);
    return { q: `${story} In what place did ${names[i]} ${vb === "went" ? "go" : "finish"}?`, opts: shuffle([pl[i], ...shuffle(pl.filter((_, j) => j !== i)).slice(0, 3)]), ans: pl[i], big: 1, why: `The story says ${names[i]} ${vb} ${V25MA6_ORDW[i]}.`, key: "v25r" + ci + names.join() + order.join("") + i + "p", v25: { k: "race", names, vb, i, ask: "place" } };
  }
  if (r < 0.75) {
    const ln = pick(V25MA6_LINES), w = pick(KIDS);
    if (Math.random() < 0.55) {
      const i = R(1, 9);
      return { q: `${w} is ${V25MA6_ORD[i]} in ${ln}. How many kids are in front of ${w}?`, say: `${w} is ${V25MA6_ORDW[i]} in ${ln}. How many kids are in front of ${w}?`, vis: eq(V25MA6_ORD[i]), opts: V25MA6_nu(i, [i + 1, i - 1, i + 2], 0, 11), ans: String(i), big: 1, why: `Being ${V25MA6_ORDW[i]} means ${V25MA6_N(i, "kid")} ${V25MA6_V(i, "is", "are")} in front: ${V25MA6_ORDW.slice(0, i).join(", ")}.`, key: "v25f" + ln + i + w, v25: { k: "front", i, w } };
    }
    const n = R(4, 10), i = R(0, n - 2), b = n - 1 - i;
    return { q: `There are ${n} kids in ${ln}. ${w} is ${V25MA6_ORD[i]}. How many kids are behind ${w}?`, say: `There are ${n} kids in ${ln}. ${w} is ${V25MA6_ORDW[i]}. How many kids are behind ${w}?`, opts: V25MA6_nu(b, [b + 1, b - 1, i, i + 1, n], 0, 11), ans: String(b), big: 1, why: i === 0 ? `${w} is first, so nobody is in front. ${n} − 1 = ${b} ${b === 1 ? "kid is" : "kids are"} behind.` : `${i + 1} kids are ${w} and the ${i === 1 ? "kid" : "kids"} in front. ${n} − ${i + 1} = ${b} ${b === 1 ? "kid is" : "kids are"} behind.`, key: "v25b" + ln + n + i + w, v25: { k: "behind", n, i, w } };
  }
  const months = Math.random() < 0.4, list = months ? V25MA6_MONTHS : V25MA6_DAYS, i = R(0, list.length - 1);
  const intro = months ? "The year starts with January, February, March, April, May and June." : "The school days are Monday, Tuesday, Wednesday, Thursday and Friday.";
  const what = months ? "month of the year" : "school day";
  if (Math.random() < 0.5) return { q: `${intro} Which is the ${V25MA6_ORDW[i]} ${what}?`, opts: shuffle([list[i], ...shuffle(list.filter((_, j) => j !== i)).slice(0, 3)]), ans: list[i], big: 1, why: `Count from the start: ${list.slice(0, i + 1).join(", ")}. ${list[i]} is ${V25MA6_ORDW[i]}.`, key: "v25c" + months + i + "a", v25: { k: "cal", list, i, ask: "name" } };
  const pl = list.map((_, j) => V25MA6_ORDW[j]);
  return { q: `${intro} Which ${what} is ${list[i]}?`, opts: shuffle([pl[i], ...shuffle(pl.filter((_, j) => j !== i)).slice(0, 3)]), ans: pl[i], big: 1, why: `Count from the start: ${list.slice(0, i + 1).join(", ")}. ${list[i]} is ${V25MA6_ORDW[i]}.`, key: "v25c" + months + i + "b", v25: { k: "cal", list, i, ask: "place" } };
});
V25MA6_rule("ordinal", (x, raw, p, t) => {
  if (x.k === "race") {
    if (x.ask === "who") { const j = x.names.indexOf(t); return j < 0 ? null : `${t} ${x.vb} ${V25MA6_ORDW[j]}, not ${V25MA6_ORDW[x.i]}.`; }
    const j = V25MA6_ORDW.indexOf(t); if (j < 0 || j >= x.names.length) return null;
    return `The one who ${x.vb} ${t} was ${x.names[j]}, not ${x.names[x.i]}.`;
  }
  if (x.k === "cal") {
    if (x.ask === "name") { const j = x.list.indexOf(t); return j < 0 ? null : `${t} is the ${V25MA6_ORDW[j]} one, not the ${V25MA6_ORDW[x.i]}.`; }
    const j = V25MA6_ORDW.indexOf(t); if (j < 0 || j >= x.list.length) return null;
    return `The ${t} one is ${x.list[j]}, not ${x.list[x.i]}.`;
  }
  if (p == null) return null;
  if (x.k === "front") {
    if (p === x.i + 1) return `${p} counts ${x.w} too. Only count the kids in front.`;
    if (p >= 0 && p <= 9) return `With ${V25MA6_N(p, "kid")} in front, ${x.w} would be ${V25MA6_ORDW[p]}, not ${V25MA6_ORDW[x.i]}.`;
    return null;
  }
  if (x.k === "behind") {
    if (p === x.n) return `${p} is everyone in line. Only count the kids behind ${x.w}.`;
    if (p > x.n) return `There are only ${x.n} kids in the whole line.`;
    if (p === x.n - x.i) return `${p} counts ${x.w} too. Only count the kids behind.`;
    const pos = x.n - 1 - p; if (pos < 0 || pos > 9) return null;
    return `With ${V25MA6_N(p, "kid")} behind, ${x.w} would be ${V25MA6_ORDW[pos]}, not ${V25MA6_ORDW[x.i]}.`;
  }
  return null;
});

/* ---------- tally: adding marks, two-day tally charts, finishing a bundle ---------- */
const V25MA6_TC = [["bird", "birds", "each bird that visits the feeder"], ["car", "cars", "each car that drives by"], ["bark", "barks", "each time the dog barks"], ["lap", "laps", "each lap around the track"], ["book", "books", "each book read this month"], ["butterfly", "butterflies", "each butterfly in the garden"], ["basket", "baskets", "each basket made at practice"], ["bus", "buses", "each bus that passes the school"], ["frog", "frogs", "each frog that hops by"], ["sunny day", "sunny days", "each sunny day this month"], ["squirrel", "squirrels", "each squirrel in the park"], ["boat", "boats", "each boat that sails past the dock"], ["airplane", "airplanes", "each airplane that flies over"], ["rainy day", "rainy days", "each rainy day this month"], ["dog", "dogs", "each dog that walks by"]];
addBank(6, "math", "tally", 0.3, () => {
  const i = R(0, V25MA6_TC.length - 1), [s, p, frag] = V25MA6_TC[i], w = pick(KIDS), r = Math.random();
  if (r < 0.35) {
    const n = R(2, 15), k = R(1, Math.min(4, 20 - n)), t = n + k;
    return { q: `${w} makes a tally mark for ${frag}. Here are the marks so far. Then ${w} adds ${V25MA6_N(k, "more mark")}. How many ${p} does the tally show now?`, vis: tally(n), opts: V25MA6_nu(t, [n, k, t + 1, t - 1, t + 5], 1, 25), ans: String(t), big: 1, why: `The marks show ${n}. ${n} + ${k} = ${t}.`, key: "v25a" + i + "_" + n + "_" + k + w, v25: { k: "add", n, add: k, t } };
  }
  if (r < 0.7) {
    let j = i; while (/day/.test(V25MA6_TC[j][0])) j = R(0, V25MA6_TC.length - 1);
    const p2 = V25MA6_TC[j][1], a = R(1, 10), b = R(1, Math.min(10, 20 - a)), t = a + b;
    return { q: `${w} counted ${p2} on Monday and on Tuesday and made this tally chart. How many ${p2} did ${w} count in all?`, vis: table([["Monday", tally(a)], ["Tuesday", tally(b)]], ["Day", cap(p2)]), opts: V25MA6_nu(t, [a, b, t + 1, t - 1, t + 5], 1, 25), ans: String(t), big: 1, why: `Monday has ${a} and Tuesday has ${b}. ${a} + ${b} = ${t}.`, key: "v25b" + j + "_" + a + "_" + b + w, v25: { k: "two", a, b, t } };
  }
  let n = R(1, 19); while (n % 5 === 0) n = R(1, 19);
  const m = n % 5, ans = 5 - m;
  return { q: `${w} is making a tally mark for ${frag}. How many more marks does ${w} need to finish the next bundle of 5?`, vis: tally(n), opts: uniq(ans, shuffle([1, 2, 3, 4, 5])), ans: String(ans), big: 1, why: `There ${V25MA6_V(m, "is", "are")} ${V25MA6_N(m, "single stick")}. ${m} + ${ans} = 5 makes a full bundle.`, key: "v25c" + i + "_" + n + w, v25: { k: "bundle", m, n } };
});
V25MA6_rule("tally", (x, raw, p) => {
  if (p == null) return null;
  if (x.k === "add") {
    if (p === x.n) return `${p} is what the marks showed before the ${V25MA6_N(x.add, "new mark")}.`;
    if (p === x.add) return `${p} is only the new ${V25MA6_V(p, "mark", "marks")}. Add them to the ${x.n} marks already there.`;
    return `${x.n} + ${x.add} = ${x.t}, not ${p}.`;
  }
  if (x.k === "two") {
    if (p === x.a && p !== x.b) return `${p} is only Monday. Add both days: ${x.a} + ${x.b} = ${x.t}.`;
    if (p === x.b && p !== x.a) return `${p} is only Tuesday. Add both days: ${x.a} + ${x.b} = ${x.t}.`;
    if (p === x.a) return `${p} is only one day. Add both days: ${x.a} + ${x.b} = ${x.t}.`;
    return `${x.a} + ${x.b} = ${x.t}, not ${p}.`;
  }
  if (x.k === "bundle") return `${x.m} + ${p} = ${x.m + p}, but a full bundle has 5.`;
  return null;
});

/* ---------- cubes: other units, how much longer, bigger units need fewer ---------- */
const V25MA6_SUNITS = [["paper clip", "paper clips"], ["cube", "cubes"], ["eraser", "erasers"], ["button", "buttons"]];
const V25MA6_BUNITS = [["footstep", "footsteps"], ["hand span", "hand spans"], ["craft stick", "craft sticks"], ["shoe", "shoes"]];
const V25MA6_SOBJ = ["book", "shoe", "lunch box", "pencil case", "spoon", "toy truck", "ribbon", "notebook", "toy train", "water bottle"];
const V25MA6_BOBJ = ["rug", "table", "bench", "desk", "mat", "bookshelf", "couch", "garden bed", "hallway", "sandbox"];
const V25MA6_SIZE = [["big blocks", "small cubes"], ["a grown-up's footsteps", "a kid's footsteps"], ["long craft sticks", "short paper clips"], ["big hand spans", "small hand spans"], ["long ribbons", "short crayons"], ["jumbo paper clips", "tiny paper clips"]];
addBank(6, "math", "cubes", 0.3, () => {
  const r = Math.random(), [w, w2] = V25MA6_two();
  if (r < 0.4) {
    const small = Math.random() < 0.5, [u1, up] = pick(small ? V25MA6_SUNITS : V25MA6_BUNITS), [o1, o2] = shuffle(small ? V25MA6_SOBJ : V25MA6_BOBJ).slice(0, 2);
    const a = small ? R(3, 12) : R(4, 15), b = R(2, a - 1), d = a - b, longer = Math.random() < 0.5;
    const ask = longer ? `How many ${up} longer is the ${o1}?` : `How many ${up} shorter is the ${o2}?`;
    return { q: `${w} measures with ${up}. The ${o1} is ${V25MA6_N(a, u1, up)} long. The ${o2} is ${V25MA6_N(b, u1, up)} long. ${ask}`, opts: V25MA6_nu(d, [d + 1, d - 1, a, b, a + b], 0, 30), ans: String(d), big: 1, why: `Take the shorter length from the longer one: ${a} − ${b} = ${d}.`, key: "v25d" + u1 + o1 + o2 + a + "_" + b + longer + w, v25: { k: "diff", a, b, d, o1, o2 } };
  }
  if (r < 0.7) {
    const [u1, up] = pick(V25MA6_SUNITS), obj = pick(V25MA6_SOBJ), a = R(4, 12), d = R(1, 3), longer = Math.random() < 0.5, ans = longer ? a + d : a - d;
    return { q: `${w}'s ${obj} is ${V25MA6_N(a, u1, up)} long. ${w2}'s ${obj} is ${V25MA6_N(d, u1, up)} ${longer ? "longer" : "shorter"}. How many ${up} long is ${w2}'s ${obj}?`, opts: V25MA6_nu(ans, [a, d, longer ? a - d : a + d, ans + 1, ans - 1], 1, 20), ans: String(ans), big: 1, why: longer ? `Longer means add: ${a} + ${d} = ${ans}.` : `Shorter means take away: ${a} − ${d} = ${ans}.`, key: "v25b" + u1 + obj + a + "_" + d + longer + w + w2, v25: { k: "rel", a, d, longer, ans, w, w2, obj } };
  }
  const [big, small] = pick(V25MA6_SIZE), obj = pick(V25MA6_BOBJ), more = Math.random() < 0.5;
  return { q: `${w} measures the ${obj} with ${big}. ${w2} measures the same ${obj} with ${small}. Who needs ${more ? "more" : "fewer"} of them?`, opts: [w, w2], ans: more ? w2 : w, big: 1, why: more ? `${w2}'s units are smaller, and smaller units cover less, so ${w2} needs more of them.` : `${w}'s units are bigger, and bigger units cover more, so ${w} needs fewer of them.`, key: "v25s" + big + obj + more + w + w2, v25: { k: "size", w, w2, more } };
});
V25MA6_rule("cubes", (x, raw, p, t) => {
  if (x.k === "size") {
    if (t === x.w) return `${t} uses bigger units. Bigger units cover more, so ${t} needs fewer of them.`;
    if (t === x.w2) return `${t} uses smaller units. Smaller units cover less, so ${t} needs more of them.`;
    return null;
  }
  if (p == null) return null;
  if (x.k === "diff") {
    if (p === x.a) return `${p} is how long the ${x.o1} is, not the difference.`;
    if (p === x.b) return `${p} is how long the ${x.o2} is, not the difference.`;
    if (p === x.a + x.b) return `${p} is both lengths added. Find the difference: ${x.a} − ${x.b} = ${x.d}.`;
    return `${x.a} − ${x.b} = ${x.d}, not ${p}.`;
  }
  if (x.k === "rel") {
    if (p === x.a) return `${p} is ${x.w}'s ${x.obj}. ${x.w2}'s is ${x.d} ${x.longer ? "longer" : "shorter"}.`;
    if (p === x.d) return `${p} is how much ${x.longer ? "longer" : "shorter"} it is, not how long it is.`;
    if (p === (x.longer ? x.a - x.d : x.a + x.d)) return `${p} would be ${x.d} ${x.longer ? "shorter" : "longer"}, but the story says ${x.longer ? "longer" : "shorter"}.`;
    return `${x.a} ${x.longer ? "+" : "−"} ${x.d} = ${x.ans}, not ${p}.`;
  }
  return null;
});

/* ---------- tengroups: packs of ten, packing into tens, 10 more or less in stories ---------- */
const V25MA6_PACK = [["box", "boxes", "crayon", "crayons"], ["pack", "packs", "pencil", "pencils"], ["bag", "bags", "marble", "marbles"], ["stack", "stacks", "cup", "cups"], ["tray", "trays", "cupcake", "cupcakes"], ["string", "strings", "bead", "beads"], ["bundle", "bundles", "stick", "sticks"], ["sheet", "sheets", "sticker", "stickers"], ["row", "rows", "chair", "chairs"], ["jar", "jars", "button", "buttons"], ["case", "cases", "juice box", "juice boxes"]];
const V25MA6_TEN = [
  [1, (n, w) => `${w} is on page ${n} of a long book. ${w} reads 10 more pages. What page is ${w} on now?`],
  [1, (n, w) => `${w} has ${n} points in a game and wins 10 more points. How many points does ${w} have now?`],
  [1, (n, w) => `${w} has ${n} stickers and gets a sheet of 10 more. How many stickers does ${w} have now?`],
  [1, n => `A train has ${n} people on it. 10 more people get on. How many people are on the train now?`],
  [1, (n, w) => `${w} has saved ${n} pennies in a jar and adds 10 more. How many pennies are in the jar now?`],
  [-1, (n, w) => `${w} has ${n} beads and uses 10 of them for a bracelet. How many beads are left?`],
  [-1, n => `A farm stand has ${n} apples and sells a bag of 10. How many apples are left?`],
  [-1, n => `There are ${n} cars in the parking lot. 10 cars drive away. How many cars are still there?`],
  [-1, (n, w) => `${w}'s class made ${n} paper cranes and gave 10 to the library. How many cranes does the class have now?`],
  [-1, n => `A shelf holds ${n} books. The teacher takes 10 books to the classroom. How many books are still on the shelf?`],
];
addBank(6, "math", "tengroups", 0.3, () => {
  const r = Math.random(), w = pick(KIDS);
  if (r < 0.4) {
    const i = R(0, V25MA6_PACK.length - 1), [c, cs, s, p] = V25MA6_PACK[i], t = R(1, 9), o = R(0, 9), n = 10 * t + o;
    const loose = o === 0 ? `no loose ${p}` : `${V25MA6_N(o, "loose " + s, "loose " + p)}`;
    return { q: `${w} has ${V25MA6_N(t, c, cs)} of 10 ${p} and ${loose}. How many ${p} does ${w} have?`, vis: blocks(t, o), opts: V25MA6_nu(n, [t + o, o ? o * 10 + t : null, o ? t * 10 : null, n + 10, n - 10, n + 1], 0, 120), ans: String(n), big: 1, why: `${V25MA6_N(t, c, cs)} of 10 make ${t * 10}. ${t * 10} + ${o} = ${n}.`, key: "v25p" + i + "_" + t + "_" + o + w, v25: { k: "pack", t, o, n, c, cs, p } };
  }
  if (r < 0.65) {
    const i = R(0, V25MA6_PACK.length - 1), [c, cs, s, p] = V25MA6_PACK[i], n = R(11, 99), t = Math.floor(n / 10), o = n % 10, full = Math.random() < 0.6;
    if (full) return { q: `${w} has ${n} ${p} and puts them in ${cs} of 10. How many full ${cs} can ${w} make?`, opts: V25MA6_nu(t, [o, t + 1, t - 1, n], 0, 99), ans: String(t), big: 1, why: `${n} is ${t} tens and ${o} ones, so ${w} can fill ${V25MA6_N(t, c, cs)}.`, key: "v25f" + i + "_" + n + w, v25: { k: "full", n, t, o, c, cs, p } };
    return { q: `${w} has ${n} ${p} and puts them in ${cs} of 10. How many ${p} are left over after filling all the full ${cs}?`, opts: V25MA6_nu(o, [t, o + 1, o - 1, 10], 0, 10), ans: String(o), big: 1, why: `${n} is ${t} tens and ${o} ones. ${t * 10} + ${o} = ${n}, so ${o} ${V25MA6_V(o, "is", "are")} left over.`, key: "v25l" + i + "_" + n + w, v25: { k: "left", n, t, o, cs } };
  }
  const i = R(0, V25MA6_TEN.length - 1), [d, f] = V25MA6_TEN[i], n = d > 0 ? R(10, 89) : R(20, 99), a = n + 10 * d;
  return { q: f(n, w), vis: blocks(Math.floor(n / 10), n % 10), opts: V25MA6_nu(a, [n + d, n - 10 * d, a + d, n], 0, 110), ans: String(a), big: 1, why: d > 0 ? `10 more changes only the tens digit: ${n} + 10 = ${a}.` : `10 less changes only the tens digit: ${n} − 10 = ${a}.`, key: "v25t" + i + "_" + n + w, v25: { k: "ten", n, a, d } };
});
V25MA6_rule("tengroups", (x, raw, p) => {
  if (p == null) return null;
  if (x.k === "pack") {
    if (p === x.t + x.o) return `${p} adds the digits. Each ${x.c} holds 10, so ${V25MA6_N(x.t, x.c, x.cs)} make ${x.t * 10}.`;
    if (x.o && p === x.o * 10 + x.t) return `${p} mixes up the tens and ones. ${V25MA6_N(x.t, x.c, x.cs)} of 10 make ${x.t} tens.`;
    if (x.o && p === x.t * 10) return `${p} counts only the ${x.cs}. Add the ${x.o} loose ${x.p} too.`;
    if (p === x.n + 10 || p === x.n - 10) return `${p} would need ${V25MA6_N(x.t + (p > x.n ? 1 : -1), x.c, x.cs)} of 10, not ${x.t}.`;
    return `${x.t * 10} + ${x.o} = ${x.n}, not ${p}.`;
  }
  if (x.k === "full") {
    if (p === x.o && p !== x.t) return `${p} is the leftover ${x.p}, not the number of full ${x.cs}.`;
    if (p * 10 > x.n) return `${V25MA6_N(p, x.c, x.cs)} of 10 would need ${p * 10} ${x.p}, but there are only ${x.n}.`;
    return `${V25MA6_N(p, x.c, x.cs)} of 10 ${V25MA6_V(p, "holds", "hold")} only ${p * 10}. There are enough for ${x.t}.`;
  }
  if (x.k === "left") {
    if (p === x.t && p !== x.o) return `${p} is the number of full ${x.cs}, not the leftovers.`;
    if (p >= 10) return `${p} is enough to fill another one of the ${x.cs}, so it can't be the leftovers.`;
    return `${x.t * 10} + ${p} = ${x.t * 10 + p}, not ${x.n}.`;
  }
  if (x.k === "ten") {
    if (p === x.n) return `${p} is the number at the start. It changes by 10.`;
    if (Math.abs(p - x.n) === 1) return `${p} is only 1 ${p > x.n ? "more" : "less"} than ${x.n}. The tens digit should change.`;
    if (p === x.n - 10 * x.d) return `${p} is 10 ${x.d > 0 ? "less" : "more"}, but this story ${x.d > 0 ? "adds" : "takes away"} 10.`;
    return `${p} is ${Math.abs(p - x.n)} ${p > x.n ? "more" : "less"} than ${x.n}, not 10 ${x.d > 0 ? "more" : "less"}.`;
  }
  return null;
});

/* ---------- equalparts: pieces left, fair cuts, who gets more ---------- */
const V25MA6_EFOOD = [["🍕", "pizza"], ["🥧", "pie"], ["🎂", "cake"], ["🥪", "sandwich"], ["🧇", "waffle"], ["🥞", "pancake"], ["🍫", "chocolate bar"], ["🍪", "big cookie"], [null, "tortilla"], [null, "brownie"], [null, "granola bar"], [null, "quesadilla"]];
const V25MA6_list = a => a.length === 1 ? a[0] : a.length === 2 ? `${a[0]} and ${a[1]}` : `${a.slice(0, -1).join(", ")} and ${a[a.length - 1]}`;
addBank(6, "math", "equalparts", 0.3, () => {
  const r = Math.random(), fi = R(0, V25MA6_EFOOD.length - 1), [e, f] = V25MA6_EFOOD[fi], an = /^[aeiou]/.test(f) ? "an" : "a";
  if (r < 0.35) {
    const four = Math.random() < 0.75, m = four ? 4 : 2, k = four ? R(1, 3) : 1, names = shuffle(KIDS).slice(0, k + 1), w = names[0], eaters = names.slice(1), left = m - k;
    const pw = four ? "fourth" : "half", pws = four ? "fourths" : "halves";
    const eat = k === 1 ? `${eaters[0]} eats 1 ${pw}.` : `${V25MA6_list(eaters)} each eat 1 ${pw}.`;
    return { q: `${w} cuts ${an} ${f} into ${pws}. ${eat} How many ${pws} are left?`, vis: e ? bigEmo(e) : undefined, opts: uniq(left, four ? [0, 1, 2, 3, 4] : [0, 1, 2]), ans: String(left), big: 1, why: `${cap(pws)} means ${m} equal pieces. ${V25MA6_N(k, "piece")} ${V25MA6_V(k, "is", "are")} eaten: ${m} − ${k} = ${left}.`, key: "v25l" + fi + four + k + names.join(), v25: { k: "left", m, eaten: k, left, f, pws } };
  }
  if (r < 0.7) {
    const w = pick(KIDS), n = pick([2, 3, 4]), same = Math.random() < 0.6, askM = pick([2, 4]), ask = askM === 2 ? "halves" : "fourths", yes = same && n === askM;
    const how = same ? (n === 2 ? "2 pieces that are the same size" : `${n} pieces that are all the same size`) : (n === 2 ? "2 pieces, but one piece is bigger than the other" : `${n} pieces, but some pieces are bigger than others`);
    const why = yes ? `${cap(ask)} means ${askM} equal pieces, and that is what ${w} made.` : !same ? (n === askM ? `${cap(ask)} must all be the same size, and these pieces are not.` : `${cap(ask)} means ${askM} equal pieces, but ${w} made ${n} pieces that are not the same size.`) : `${cap(ask)} means ${askM} equal pieces, but ${w} made ${n}.`;
    return { q: `${w} cuts ${an} ${f} into ${how}. Are the pieces ${ask}?`, vis: e ? bigEmo(e) : undefined, opts: ["Yes", "No"], ans: yes ? "Yes" : "No", big: 1, why, key: "v25y" + fi + n + same + askM + w, v25: { k: "fair", n, same, askM, ask, w } };
  }
  const [w1, w2] = V25MA6_two(), a = pick(["half", "fourth"]), b = pick(["half", "fourth"]), same = a === b;
  const second = same ? (a === "half" ? "the other half" : "another fourth") : `one ${b}`;
  const ans = same ? "They get the same" : a === "half" ? w1 : w2;
  return { q: `${w1} gets one ${a} of ${an} ${f}. ${w2} gets ${second} of the same ${f}. Who gets more?`, vis: e ? bigEmo(e) : undefined, opts: [w1, w2, "They get the same"], ans, big: 1, why: same ? `Both pieces are ${a === "half" ? "halves" : "fourths"} of the same ${f}, so they are the same size.` : `A half is bigger than a fourth of the same ${f}, so ${ans} gets more.`, key: "v25m" + fi + a + b + w1 + w2, v25: { k: "more", w1, w2, a, b, f } };
});
V25MA6_rule("equalparts", (x, raw, p, t) => {
  if (x.k === "left") {
    if (p == null) return null;
    if (p === x.m) return `${p} ${x.pws} is the whole ${x.f}, before anyone ate.`;
    if (p === x.eaten) return `${p} is how many pieces were eaten, not how many are left.`;
    return `${x.m} − ${x.eaten} = ${x.left}, not ${p}.`;
  }
  if (x.k === "fair") {
    if (t === "Yes") return !x.same ? `${cap(x.ask)} must all be the same size, and these pieces are not.` : `${cap(x.ask)} means ${x.askM} equal pieces, but ${x.w} made ${x.n}.`;
    if (t === "No") return `The ${x.n} pieces are ${x.n === 2 ? "both" : "all"} the same size, so they are ${x.ask}.`;
    return null;
  }
  if (x.k === "more") {
    if (t === "They get the same") return `A half is bigger than a fourth of the same ${x.f}, so they don't get the same.`;
    if (x.a === x.b) return `Both pieces are ${x.a === "half" ? "halves" : "fourths"} of the same ${x.f}, so ${t} does not get more.`;
    const mine = t === x.w1 ? x.a : t === x.w2 ? x.b : null; if (!mine) return null;
    return mine === "fourth" ? `${t} gets a fourth, and a fourth is smaller than a half.` : null;
  }
  return null;
});

