/* =====================================================================
   Question bank: extra math questions (tag MTH_)
   shapes, oclock, halfhour, solids, angles, fractions, numwords,
   equivfrac, perimeter, skip, evenodd, patterns
   ===================================================================== */
const MTH_hr = h => ((h - 1 + 120) % 12) + 1;
const MTH_gcd = (a, b) => b ? MTH_gcd(b, a % b) : a;
const MTH_emo = x => `<span class="emo">${x}</span>`;

/* ---------- 6 · Shapes ---------- */
const MTH_SHOBJ = [["🍪", "a cookie", "circle"], ["🪙", "a coin", "circle"], ["🛞", "a wheel", "circle"], ["🌕", "the full moon", "circle"], ["🎯", "a target", "circle"], ["🕐", "a clock face", "circle"],
  ["🍕", "a slice of pizza", "triangle"], ["⚠️", "this warning sign", "triangle"], ["⛺", "the front of a tent", "triangle"],
  ["🚪", "a door", "rectangle"], ["📱", "a phone", "rectangle"], ["💵", "a dollar bill", "rectangle"], ["✉️", "an envelope", "rectangle"],
  ["🪟", "this window", "square"], ["🐝", "a cell in a beehive", "hexagon"]];
addBank(6, "math", "shapes", 0.8, () => {
  const names = SHAPES.map(s => s[0]), sides = Object.fromEntries(SHAPES), k = R(0, 4);
  if (k === 0) {
    const [e, n, s] = pick(MTH_SHOBJ);
    return { q: `What shape is ${n}?`, vis: bigEmo(e), opts: shuffle([s, ...shuffle(names.filter(x => x !== s)).slice(0, 3)]), ans: s, big: 1, why: `${cap(n)} is shaped like a ${s}.`, key: "o" + n };
  }
  if (k === 1) {
    let a, b; do { [a, b] = shuffle(names).slice(0, 2); } while (sides[a] === sides[b]);
    const more = Math.random() < 0.5, ans = (more ? sides[a] > sides[b] : sides[a] < sides[b]) ? a : b;
    const sw = n => sides[n] ? `${sides[n]} sides` : "no sides";
    return { q: `Which has <b>${more ? "more" : "fewer"}</b> sides: a ${a} or a ${b}?`, say: `Which has ${more ? "more" : "fewer"} sides: a ${a} or a ${b}?`, vis: row(shape(a, "#FF7A59", 90), shape(b, "#1FAF6E", 90)), opts: [a, b], ans, big: 1, why: `A ${a} has ${sw(a)} and a ${b} has ${sw(b)}.`, key: "m" + (more ? 1 : 0) + [a, b].sort().join() };
  }
  if (k === 2) {
    const t = pick(names), other = pick(names.filter(x => x !== t && !(t === "square" && x === "rectangle") && !(t === "rectangle" && x === "square")));
    const cols = shuffle(SHAPE_COLS).slice(0, 4), opts = [shape(t, cols[0], 80), shape(t, cols[1], 80), shape(t, cols[2], 80), shape(other, cols[3], 80)];
    return { q: `Which one is <b>not</b> a ${t}?`, say: `Which one is not a ${t}?`, opts: shuffle(opts), ans: opts[3], sayAns: `the ${other}`, why: `That one is a ${other}. The others are all ${t}s.`, key: "x" + t + other };
  }
  if (k === 3) {
    const c = pick([["circle", "has no sides and no corners", "A circle is round, so it has no sides and no corners."], ["triangle", "has 3 sides", "A triangle has 3 sides and 3 corners."], ["pentagon", "has 5 sides", "A pentagon has 5 sides and 5 corners."], ["hexagon", "has 6 sides", "A hexagon has 6 sides and 6 corners."], ["square", "has 4 sides that are all the same length", "A square has 4 equal sides."]]);
    const opts = shuffle([c[0], ...shuffle(names.filter(x => x !== c[0] && !(c[0] === "square" && x === "rectangle"))).slice(0, 3)]);
    return { q: `Which shape ${c[1]}?`, opts, ans: c[0], big: 1, why: c[2], key: "w" + c[0] };
  }
  /* count the shapes in a row */
  const t = pick(["circle", "triangle", "square", "hexagon"]), n = R(1, 4), others = names.filter(x => x !== t && !(t === "square" && x === "rectangle"));
  const list = shuffle([...Array(n).fill(t), ...Array.from({ length: 6 - n }, () => pick(others))]);
  return { q: `How many <b>${t}s</b> do you see?`, say: `How many ${t}s do you see?`, vis: `<div class="shape-row">${list.map((s, i) => shape(s, SHAPE_COLS[i % 5], 58)).join("")}</div>`, opts: uniq(n, [n + 1, n - 1, n + 2, 6 - n], () => R(1, 6)), ans: String(n), big: 1, why: `Count only the ${t}s. There ${n === 1 ? "is 1" : `are ${n}`}.`, key: "c" + list.join() };
});

/* ---------- 6 · O'clock ---------- */
const MTH_HEVENTS = [["Lunch is at 12 o'clock", 12, "lunch time"], ["Ava wakes up at 7 o'clock", 7, "wake-up time"], ["School starts at 8 o'clock", 8, "school time"], ["Snack time is at 3 o'clock", 3, "snack time"], ["Dinner is at 6 o'clock", 6, "dinner time"], ["Leo goes to bed at 8 o'clock", 8, "bedtime"], ["The park trip is at 10 o'clock", 10, "park time"], ["Piano lesson is at 4 o'clock", 4, "piano time"], ["Story time is at 2 o'clock", 2, "story time"], ["Swim class is at 9 o'clock", 9, "swim time"]];
addBank(6, "math", "oclock", 0.8, () => {
  const h = R(1, 12), k = R(0, 5), oc = x => `${MTH_hr(x)} o'clock`;
  if (k <= 1) {
    const [d, w] = pick([[1, "1 hour later"], [2, "2 hours later"], [-1, "1 hour earlier"]]), a = MTH_hr(h + d);
    return { q: d > 0 ? `It is ${h} o'clock. What time will it be <b>${w}</b>?` : `It is ${h} o'clock. What time was it <b>${w}</b>?`, say: d > 0 ? `It is ${h} o'clock. What time will it be ${w}?` : `It is ${h} o'clock. What time was it ${w}?`, vis: clock(h, 0), opts: uniq(oc(a), [oc(h), oc(h + d + 1), oc(h + d - 1), oc(h - d), oc(h + 3), oc(h - 3)]), ans: oc(a), big: 1, why: d > 0 ? `Count ${d === 1 ? "1 hour" : "2 hours"} forward from ${h}: ${range(1, d).map(i => MTH_hr(h + i)).join(", ")}. It will be ${a} o'clock.` : `1 hour before ${h} o'clock, it was ${a} o'clock.`, key: "l" + d + "_" + h };
  }
  if (k === 2) {
    const others = shuffle(range(1, 12).filter(x => x !== h)).slice(0, 3);
    return { q: "What time is it? Pick the time written with numbers.", vis: clock(h, 0), opts: shuffle([h, ...others]).map(x => `${x}:00`), ans: `${h}:00`, big: 1, why: `The short hand points to ${h} and the long hand points to 12, so it is ${h}:00.`, key: "d" + h };
  }
  if (k === 3) {
    const opts = uniq(`${h}:00`, [`${MTH_hr(h + 1)}:00`, `${MTH_hr(h - 1)}:00`, `12:00`, `${MTH_hr(h + 2)}:00`]);
    return { q: `Which time is the same as <b>${h} o'clock</b>?`, say: `Which time is the same as ${h} o'clock?`, opts, ans: `${h}:00`, big: 1, why: `${h} o'clock is written ${h}:00.`, key: "s" + h };
  }
  if (k === 4) {
    if (Math.random() < 0.5) return { q: `At <b>${h} o'clock</b>, which number does the <b>short</b> hand point to?`, say: `At ${h} o'clock, which number does the short hand point to?`, vis: clock(h, 0), opts: uniq(h, [12, 6, MTH_hr(h + 1), MTH_hr(h - 1)].filter(x => x !== h)), ans: String(h), big: 1, why: `The short hand tells the hour. At ${h} o'clock it points to ${h}.`, key: "h" + h };
    return { q: `At <b>${h} o'clock</b>, which number does the <b>long</b> hand point to?`, say: `At ${h} o'clock, which number does the long hand point to?`, vis: clock(h, 0), opts: uniq(12, [h === 12 ? 6 : h, 6, 3, 9, 1]), ans: "12", big: 1, why: "At any o'clock time, the long hand points straight up to 12.", key: "g" + h };
  }
  const [s, eh, label] = pick(MTH_HEVENTS), others = shuffle(range(1, 12).filter(x => x !== eh)).slice(0, 3);
  return { q: `${s}. Which clock shows ${label}?`, opts: shuffle([eh, ...others]).map(x => clock(x, 0, 110)), ans: clock(eh, 0, 110), sayAns: `${eh} o'clock`, why: `At ${eh} o'clock the short hand points to ${eh} and the long hand points to 12.`, key: "e" + s };
});

/* ---------- 7 · Half past ---------- */
addBank(7, "math", "halfhour", 0.8, () => {
  const h = R(1, 12), m = pick([0, 30]), t = `${h}:${pad2(m)}`, nx = MTH_hr(h + 1), pv = MTH_hr(h - 1), k = R(0, 5);
  if (k === 0) {
    const a = m ? `${nx}:00` : `${h}:30`;
    return { q: `The clock shows ${t}. What time will it be <b>30 minutes later</b>?`, say: `The clock shows ${t}. What time will it be 30 minutes later?`, vis: clock(h, m), opts: uniq(a, m ? [`${h}:00`, `${nx}:30`, t] : [`${nx}:00`, `${nx}:30`, t]), ans: a, big: 1, why: m ? `30 minutes after half past ${h} is ${nx} o'clock, so it will be ${a}.` : `30 minutes after ${h} o'clock is half past ${h}, so it will be ${a}.`, key: "a" + t };
  }
  if (k === 1) {
    const a = `${nx}:${pad2(m)}`;
    return { q: `The clock shows ${t}. What time will it be <b>1 hour later</b>?`, say: `The clock shows ${t}. What time will it be 1 hour later?`, vis: clock(h, m), opts: uniq(a, [t, `${pv}:${pad2(m)}`, `${h}:${pad2(30 - m)}`, `${nx}:${pad2(30 - m)}`]), ans: a, big: 1, why: `1 hour later the hour goes from ${h} to ${nx}, and the minutes stay :${pad2(m)}. It will be ${a}.`, key: "b" + t };
  }
  if (k === 2) {
    const cand = m ? [[h, 0], [nx, 30], [pv, 30]] : [[h, 30], [nx, 0], [pv, 0]];
    const opts = [[h, m], ...cand].map(([x, y]) => clock(x, y, 110));
    return { q: `Which clock shows <b>${t}</b>?`, say: `Which clock shows ${t}?`, opts: shuffle(opts), ans: opts[0], sayAns: t, why: m ? `At ${t} the long hand points to 6 and the short hand is between ${h} and ${nx}.` : `At ${t} the long hand points to 12 and the short hand points to ${h}.`, key: "c" + t };
  }
  if (k === 3) {
    const a = m ? `half past ${h}` : `${h} o'clock`;
    return { q: `How do we say <b>${t}</b>?`, say: `How do we say ${t}?`, opts: uniq(a, m ? [`half past ${nx}`, `${h} o'clock`, `half past ${pv}`] : [`half past ${h}`, `${nx} o'clock`, `half past ${pv}`]), ans: a, big: 1, why: m ? `30 minutes after ${h} is half past ${h}, written ${t}.` : `${h} o'clock is written ${t}.`, key: "s" + t };
  }
  if (k === 4) {
    const w = m ? `half past ${h}` : `${h} o'clock`;
    return { q: `Which time means <b>${w}</b>?`, say: `Which time means ${w}?`, opts: uniq(t, m ? [`${nx}:30`, `${h}:00`, `${pv}:30`] : [`${h}:30`, `${nx}:00`, `${pv}:00`]), ans: t, big: 1, why: m ? `Half past means 30 minutes after the hour, so half past ${h} is ${t}.` : `${h} o'clock is written ${t}.`, key: "w" + t };
  }
  const a = `between ${h} and ${nx}`;
  return { q: `At <b>half past ${h}</b>, where does the short hand point?`, say: `At half past ${h}, where does the short hand point?`, vis: clock(h, 30), opts: shuffle([a, `between ${pv} and ${h}`, `right on the ${h}`, `right on the ${nx}`]), ans: a, big: 1, why: `At half past ${h}, the short hand has moved halfway from ${h} to ${nx}.`, key: "h" + h };
});

/* ---------- 7 · 3D shapes ---------- */
const MTH_SOBJ = {
  sphere: ["a basketball", "a globe", "an orange", "a marble", "a bubble", "a gumball", "a tennis ball", "a pearl", "a soccer ball", "a beach ball", "a bowling ball", "a snowball"],
  cube: ["a number cube", "an ice cube", "a sugar cube", "a square toy block"],
  cone: ["an ice cream cone", "a party hat", "a traffic cone"],
  cylinder: ["a soup can", "a candle", "a paper towel roll", "a drum", "a battery", "a glue stick", "a straw", "a stack of coins", "a log"],
  "rectangular prism": ["a cereal box", "a brick", "a shoebox", "a juice box", "a stick of butter", "a book", "an eraser", "a fish tank"],
};
const MTH_SFACTS = [["How many flat faces does a rectangular prism have?", "6", ["4", "8", "12"], "A rectangular prism, like a box, has 6 flat faces."], ["How many edges does a rectangular prism have?", "12", ["6", "8", "4"], "A box has 4 edges on top, 4 on the bottom and 4 going up the sides: 12."], ["How many vertices (corners) does a rectangular prism have?", "8", ["4", "6", "12"], "A box has 4 corners on top and 4 on the bottom: 8."], ["How many flat faces does a cone have?", "1", ["0", "2", "3"], "A cone has 1 flat circle on the bottom."], ["How many pointy vertices does a cone have?", "1", ["0", "2", "4"], "A cone has just 1 pointy tip."], ["How many vertices (corners) does a cylinder have?", "0", ["1", "2", "4"], "A cylinder has round edges, so it has no corners."], ["How many vertices (corners) does a sphere have?", "0", ["1", "2", "8"], "A sphere is round all over, so it has no corners."], ["What shape is each face of a cube?", "square", ["circle", "triangle", "hexagon"], "All 6 faces of a cube are squares."], ["What shape are the two flat faces of a cylinder?", "circle", ["square", "triangle", "hexagon"], "The top and bottom of a can are circles."], ["What shape is the flat face of a cone?", "circle", ["square", "triangle", "hexagon"], "A cone has one flat circle face, like the bottom of a party hat."], ["Which 3D shape has 1 flat face and 1 point?", "cone", ["cylinder", "sphere", "cube"], "A cone has one flat circle face and one pointy tip."], ["Which 3D shape has no flat faces?", "sphere", ["cube", "cylinder", "cone"], "A sphere is curved all over."], ["Which 3D shape has 6 square faces?", "cube", ["sphere", "cylinder", "cone"], "A cube is made of 6 squares, like a number cube."], ["Which 3D shape has 2 flat circle faces?", "cylinder", ["cone", "sphere", "cube"], "A cylinder has a circle on the top and a circle on the bottom."], ["Which 3D shape can roll but cannot stack?", "sphere", ["cube", "cylinder", "rectangular prism"], "A ball rolls in every direction, but you can't stack balls."], ["Which of these can NOT roll?", "cube", ["sphere", "cylinder"], "A cube has only flat faces, so it slides instead of rolling."], ["Which of these can NOT roll?", "rectangular prism", ["sphere", "cylinder"], "A box has only flat faces, so it slides instead of rolling."]];
addBank(7, "math", "solids", 0.75, () => {
  const names = Object.keys(MTH_SOBJ), k = R(0, 4);
  if (k === 0) { const [q, a, d, w] = pick(MTH_SFACTS); return { q, opts: shuffle([a, ...d]), ans: a, big: 1, why: w, key: "f" + q + a }; }
  const n = pick(names), o = pick(MTH_SOBJ[n]);
  if (k <= 2) return { q: `What 3D shape is ${o} shaped like?`, opts: shuffle([n, ...shuffle(names.filter(x => x !== n)).slice(0, 3)]), ans: n, big: 1, why: `${cap(o)} is shaped like a ${n}.`, key: "o" + o };
  const others = shuffle(names.filter(x => x !== n)).slice(0, 3).map(x => pick(MTH_SOBJ[x]));
  return { q: `Which one is shaped like a <b>${n}</b>?`, say: `Which one is shaped like a ${n}?`, opts: shuffle([o, ...others]), ans: o, big: 1, why: `${cap(o)} is shaped like a ${n}.`, key: "w" + o };
});

/* ---------- 9 · Angles ---------- */
const MTH_atype = d => d < 90 ? "acute" : d === 90 ? "right" : d < 180 ? "obtuse" : "straight";
const MTH_AFACTS = [["How many degrees are in a right angle?", "90°", ["45°", "100°", "180°"], "A right angle, a square corner, measures 90°."], ["How many degrees are in a straight angle?", "180°", ["90°", "100°", "360°"], "A straight angle is a straight line, which measures 180°."], ["Two right angles put together make what kind of angle?", "straight", ["acute", "obtuse", "right"], "90° + 90° = 180°, which is a straight angle."], ["How many right angles does a square have?", "4", ["1", "2", "3"], "Every corner of a square is a right angle, so it has 4."], ["How many right angles does a rectangle have?", "4", ["0", "2", "3"], "All 4 corners of a rectangle are right angles."], ["What kind of angle is the corner of a sheet of paper?", "right", ["acute", "obtuse", "straight"], "Paper has square corners, which are right angles."], ["What do we call an angle that is smaller than a right angle?", "acute", ["obtuse", "straight", "right"], "Acute angles are less than 90°."], ["What do we call an angle bigger than a right angle but less than a straight angle?", "obtuse", ["acute", "right", "straight"], "Obtuse angles are between 90° and 180°."], ["Half of a right angle is 45°. What kind of angle is that?", "acute", ["right", "obtuse", "straight"], "45° is less than 90°, so it is acute."], ["Which capital letter has a right angle?", "L", ["O", "S", "C"], "The two lines of an L meet in a square corner."], ["What is the point where the two sides of an angle meet called?", "vertex", ["edge", "face", "ray"], "The corner point of an angle is called the vertex."], ["Which angle is the biggest?", "straight", ["acute", "right", "obtuse"], "A straight angle is 180°, more than any acute, right or obtuse angle."]];
addBank(9, "math", "angles", 0.78, () => {
  const k = R(0, 4), types = ["acute", "right", "obtuse", "straight"];
  if (k <= 1) {
    const deg = pick([...range(1, 35).map(x => x * 5), 180]), ty = MTH_atype(deg);
    return { q: `An angle measures <b>${deg}°</b>. What kind of angle is it?`, say: `An angle measures ${deg} degrees. What kind of angle is it?`, opts: types.slice(), ans: ty, big: 1, why: ty === "acute" ? `${deg}° is less than 90°, so it is acute.` : ty === "right" ? "An angle of exactly 90° is a right angle." : ty === "obtuse" ? `${deg}° is more than 90° but less than 180°, so it is obtuse.` : "180° is a straight line, a straight angle.", key: "m" + deg };
  }
  if (k === 2) {
    const want = pick(["acute", "obtuse"]), a = want === "acute" ? 5 * R(1, 17) : 5 * R(19, 35);
    const others = want === "acute" ? [90, 5 * R(19, 35), 180] : [5 * R(1, 17), 90, 180];
    return { q: `Which angle measure is <b>${want}</b>?`, say: `Which angle measure is ${want}?`, opts: shuffle([a, ...others]).map(x => x + "°"), ans: a + "°", big: 1, why: want === "acute" ? `${a}° is less than 90°, so it is acute.` : `${a}° is between 90° and 180°, so it is obtuse.`, key: "w" + want + a };
  }
  if (k === 3) {
    const h = R(1, 11), deg = Math.min(h, 12 - h) * 30, ty = MTH_atype(deg);
    return { q: `What kind of angle do the clock hands make at <b>${h}:00</b>?`, say: `What kind of angle do the clock hands make at ${h} o'clock?`, vis: clock(h, 0), opts: types.slice(), ans: ty, big: 1, why: `Each number on a clock is 30° apart. At ${h}:00 the hands are ${Math.min(h, 12 - h)} ${Math.min(h, 12 - h) === 1 ? "number" : "numbers"} apart: ${deg}°, a${ty === "acute" || ty === "obtuse" ? "n" : ""} ${ty} angle.`, key: "c" + h };
  }
  const [q, a, d, w] = pick(MTH_AFACTS);
  return { q, opts: shuffle([a, ...d]), ans: a, big: 1, why: w, key: "f" + q };
});

/* ---------- 8 · Fractions ---------- */
const MTH_pn = (n, one, many) => `${n} ${n === 1 ? one : many}`;
const MTH_FOOD = { 2: "sandwich", 3: "pie", 4: "pizza", 6: "cake", 8: "pizza" };
addBank(8, "math", "fractions", 0.75, () => {
  const k = R(0, 4), dens = [2, 3, 4, 6, 8];
  if (k === 0) {
    const d = pick(dens), s = R(1, d - 1), u = d - s;
    const vis = Math.random() < 0.5 ? pie(d, s, 160, pick(["#3D7BFF", "#FF7A59", "#1FAF6E"])) : bar(d, s);
    return { q: "What fraction is <b>not</b> shaded?", say: "What fraction is not shaded?", vis, opts: uniq(frac(u, d), [u !== s ? frac(s, d) : null, frac(u, d + 1), frac(d, u), u + 1 < d ? frac(u + 1, d) : frac(u - 1 > 0 ? u - 1 : u, d + 2)]), ans: frac(u, d), big: 1, why: `${s} of the ${d} parts ${s === 1 ? "is" : "are"} shaded, so ${u} of the ${d} parts ${u === 1 ? "is" : "are"} not: ${fracWords(u, d)}.`, key: "u" + s + d };
  }
  if (k === 1) {
    const d = pick(dens), e = R(1, d - 1), left = Math.random() < 0.5, food = MTH_FOOD[d], who = KIDS[(e * 3 + d) % KIDS.length], top = left ? d - e : e;
    return { q: `${who} cuts a ${food} into ${d} equal pieces and eats ${e}. What fraction of the ${food} is ${left ? "<b>left</b>" : "<b>eaten</b>"}?`, say: `${who} cuts a ${food} into ${d} equal pieces and eats ${e}. What fraction of the ${food} is ${left ? "left" : "eaten"}?`, vis: pie(d, e, 140, "#FF7A59"), opts: uniq(frac(top, d), [frac(d - top !== top ? d - top : top + 1 < d ? top + 1 : top - 1, d), frac(top, d + 1), frac(d, top), frac(e, d - e > 0 ? d - e : d + 1)]), ans: frac(top, d), big: 1, why: left ? `${d} − ${e} = ${top}, so ${top} of the ${d} pieces ${top === 1 ? "is" : "are"} left: ${fracWords(top, d)}.` : `${e} of the ${d} equal pieces ${e === 1 ? "was" : "were"} eaten: ${fracWords(top, d)}.`, key: "w" + (left ? "l" : "e") + e + d };
  }
  if (k === 2) {
    const [a, b] = shuffle(dens).slice(0, 2), big = Math.random() < 0.5, ans = (big ? a < b : a > b) ? a : b;
    return { q: `Which fraction is <b>${big ? "bigger" : "smaller"}</b>?`, say: `Which fraction is ${big ? "bigger" : "smaller"}: one ${FNAME[a][0]} or one ${FNAME[b][0]}?`, vis: row(pie(a, 1, 100, "#9B5DE5"), pie(b, 1, 100, "#1FAF6E")), opts: [frac(1, a), frac(1, b)], ans: frac(1, ans), big: 1, why: `The fewer equal parts a whole is cut into, the bigger each part is. 1/${Math.min(a, b)} is bigger than 1/${Math.max(a, b)}.`, key: "n" + (big ? 1 : 0) + [a, b].sort().join() };
  }
  const d = pick([3, 4, 6, 8]); let a = R(1, d - 1), b = R(1, d - 1); while (b === a) b = R(1, d - 1);
  const big = Math.random() < 0.5, ans = (big ? a > b : a < b) ? a : b;
  return { q: `Which fraction is <b>${big ? "greater" : "less"}</b>?`, say: `Which fraction is ${big ? "greater" : "less"}: ${fracWords(a, d)} or ${fracWords(b, d)}?`, vis: bar(d, a, 280, 40, "#9B5DE5") + bar(d, b, 280, 40, "#1FAF6E"), opts: [frac(a, d), frac(b, d)], ans: frac(ans, d), big: 1, why: `Both are cut into ${FNAME[d][1]}. ${MTH_pn(Math.max(a, b), "part", "parts")} is more than ${MTH_pn(Math.min(a, b), "part", "parts")}, so ${Math.max(a, b)}/${d} is greater.`, key: "d" + (big ? 1 : 0) + [a, b].sort().join() + "/" + d };
});

/* ---------- 6 · Number words ---------- */
const MTH_MISS = { 1: ["oen", "wun", "onne"], 2: ["tuo", "twoo", "tou"], 3: ["thre", "thrie", "threy"], 4: ["fowr", "foure", "foar"], 5: ["fiv", "fyve", "fivv"], 6: ["sixe", "siks", "sicx"], 7: ["sevin", "sevan", "seben"], 8: ["eigt", "eihgt", "aight"], 9: ["nien", "nyne", "nin"], 10: ["tenn", "tne", "tehn"], 11: ["elevin", "eleben", "elevn"], 12: ["twelf", "twelv", "tweleve"], 13: ["thirten", "thurteen", "thirtean"], 14: ["forteen", "fourten", "fourtean"], 15: ["fiveteen", "fifeteen", "fiften"], 16: ["sixten", "sixtean", "sickteen"], 17: ["seventean", "sevinteen", "seventen"], 18: ["eightteen", "eiteen", "eighten"], 19: ["nineten", "ninteen", "ninetean"], 20: ["twenny", "tweny", "twentee"] };
addBank(6, "math", "numwords", 0.75, () => {
  const k = R(0, 4), W = NUMWORDS, near = n => [n + 1, n - 1, n + 2, n - 2, n + 10, n - 10].filter(x => x >= 0 && x <= 20).map(x => W[x]);
  if (k <= 1) {
    const after = Math.random() < 0.5, n = after ? R(0, 19) : R(1, 20), a = after ? n + 1 : n - 1;
    return { q: `What number comes <b>${after ? "after" : "before"}</b> ${W[n]}?`, say: `What number comes ${after ? "after" : "before"} ${W[n]}?`, vis: hw(W[n]), opts: uniq(W[a], [W[n], ...near(a)].filter(x => x)), ans: W[a], big: 1, why: `${cap(W[a])} (${a}) comes right ${after ? "after" : "before"} ${W[n]} (${n}).`, key: (after ? "a" : "b") + n };
  }
  if (k === 2) {
    const n = R(1, 20);
    return { q: `Which word for <b>${n}</b> is spelled right?`, say: `Which word for ${n} is spelled right?`, vis: eq(String(n)), opts: shuffle([W[n], ...MTH_MISS[n]]), ans: W[n], big: 1, why: `${n} is spelled ${W[n].split("").join("-")}.`, key: "s" + n };
  }
  if (k === 3) {
    const n = R(1, 10), t = THINGS[n % THINGS.length];
    return { q: `How many ${t[1]}? Pick the word.`, vis: grp(n, t[0]), opts: uniq(W[n], near(n)), ans: W[n], big: 1, why: `Count them: there ${n === 1 ? "is" : "are"} ${n}. ${n} is written ${W[n]}.`, key: "c" + n };
  }
  const a = R(1, 20); let b = R(Math.max(0, a - 6), Math.min(20, a + 6)); while (b === a) b = R(Math.max(0, a - 6), Math.min(20, a + 6));
  return { q: "Which number is <b>bigger</b>?", say: `Which number is bigger: ${W[a]} or ${W[b]}?`, opts: [W[a], W[b]], ans: W[Math.max(a, b)], big: 1, why: `${cap(W[Math.max(a, b)])} is ${Math.max(a, b)} and ${W[Math.min(a, b)]} is ${Math.min(a, b)}.`, key: "g" + a + "," + b };
});

/* ---------- 9 · Equivalent fractions ---------- */
const MTH_EQB = [];
for (let b = 2; b <= 6; b++) for (let a = 1; a < b; a++) if (MTH_gcd(a, b) === 1) MTH_EQB.push([a, b]);
addBank(9, "math", "equivfrac", 0.7, () => {
  const [a, b] = pick(MTH_EQB), m = pick([2, 3, 4]), top = a * m, bot = b * m, k = R(0, 3);
  const eqv = (x, y) => x * b === a * y;
  if (k === 0) {
    const cands = [[a + 1, b], [a, b + 1], [b - a, b], [a, bot], [top, b], [a + 1, b + 1], [top - 1, bot]].filter(([x, y]) => x > 0 && x < y && !eqv(x, y)).map(([x, y]) => frac(x, y));
    return { q: `Write ${frac(top, bot)} in <b>simplest form</b>.`, say: `Write ${top} over ${bot} in simplest form.`, vis: bar(bot, top, 280, 40, "#1FAF6E") + bar(b, a, 280, 40, "#9B5DE5"), opts: uniq(frac(a, b), cands), ans: frac(a, b), big: 1, why: `Divide the top and bottom by ${m}: ${top} ÷ ${m} = ${a} and ${bot} ÷ ${m} = ${b}.`, key: "s" + top + "/" + bot };
  }
  if (k === 1) {
    return { q: `Find the missing number: ${frac(a, b)} = ${frac(top, "?")}`, say: `${a} over ${b} equals ${top} over what?`, vis: bar(b, a, 280, 40, "#9B5DE5"), opts: numU(bot, [bot + 1, bot - 1, b + m, top + b, bot + b].filter(x => x > top), 3, top + 1), ans: String(bot), big: 1, why: `${a} × ${m} = ${top}, so multiply the bottom by ${m} too: ${b} × ${m} = ${bot}.`, key: "d" + a + b + m };
  }
  const yes = k === 2, x = yes ? top : (top + 1 < bot ? top + 1 : top - 1), y = bot;
  return { q: `Are ${frac(a, b)} and ${frac(x, y)} equivalent?`, say: `Are ${a} over ${b} and ${x} over ${y} equivalent?`, vis: bar(b, a, 280, 40, "#9B5DE5") + bar(y, x, 280, 40, "#1FAF6E"), opts: ["Yes", "No"], ans: yes ? "Yes" : "No", big: 1, why: yes ? `${a} × ${m} = ${top} and ${b} × ${m} = ${bot}, so they are the same amount.` : `${a} × ${m} = ${top}, not ${x}, so ${x}/${y} is a different amount.`, key: "q" + a + b + x + y };
});

/* ---------- 8 · Perimeter ---------- */
/* [emoji, object, edging, unit, unit word, min length, max length, min width] (width is always less than length) */
const MTH_POBJ = [["🌻", "garden bed", "fence", "m", "meters", 3, 8, 1], ["🏖️", "sandbox", "wood edging", "m", "meters", 2, 5, 1], ["🧶", "rug", "ribbon trim", "m", "meters", 2, 4, 1], ["🐑", "sheep pen", "fence", "m", "meters", 8, 20, 5], ["🖼️", "picture frame", "gold tape", "cm", "centimeters", 20, 40, 15], ["📒", "notebook cover", "ribbon", "cm", "centimeters", 18, 30, 12], ["🧺", "picnic blanket", "lace", "m", "meters", 2, 3, 1]];
function MTH_triSVG(a, b, c) {
  let s = svgOpen(240, 170, `triangle with sides ${a}, ${b} and ${c} cm`);
  s += `<polygon points="40,140 200,140 110,30" fill="#FFF3D6" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>`;
  const tx = (x, y, t, an = "middle") => `<text x="${x}" y="${y}" text-anchor="${an}" font-size="16" font-family="${FONT}" font-weight="600" fill="${INK}">${t}</text>`;
  return s + tx(120, 162, a + " cm") + tx(68, 80, b + " cm", "end") + tx(160, 80, c + " cm", "start") + "</svg>";
}
addBank(8, "math", "perimeter", 0.7, () => {
  const k = R(0, 3);
  if (k === 0) {
    let a, b, c; do { a = R(3, 12); b = R(3, 12); c = R(3, 12); } while (a + b <= c || a + c <= b || b + c <= a);
    const p = a + b + c;
    return { q: "What is the perimeter of this triangle?", vis: MTH_triSVG(a, b, c), opts: numU(p, [p + 2, p - 2, a + b, p + a], 4, 1).map(x => x + " cm"), ans: p + " cm", big: 1, why: `Add all 3 sides: ${a} + ${b} + ${c} = ${p} cm.`, key: "t" + a + "," + b + "," + c };
  }
  if (k === 1) {
    const [n, ns] = pick([["triangle", 3], ["pentagon", 5], ["hexagon", 6]]), s = R(2, 10), p = ns * s;
    return { q: `Every side of this ${n} is ${s} cm long. What is its perimeter?`, vis: shape(n, pick(SHAPE_COLS), 130), opts: numU(p, [s * (ns - 1), s * (ns + 1), s + ns, 4 * s].filter(x => x !== p), 4, 1).map(x => x + " cm"), ans: p + " cm", big: 1, why: `A ${n} has ${ns} sides: ${ns} × ${s} = ${p} cm.`, key: "r" + n + s };
  }
  if (k === 2) {
    const L = R(3, 12), W = R(2, Math.min(L, 9)), P = 2 * (L + W);
    return { q: `A rectangle has a perimeter of ${P} cm. It is ${L} cm long. How wide is it?`, vis: eq(`${L} + ${blank()} + ${L} + ${blank()} = ${P}`), opts: numU(W, [P - L, P / 2, P - 2 * L, W + 1, W - 1].filter(x => x !== W), 3, 1).map(x => x + " cm"), ans: W + " cm", big: 1, why: `The two long sides make ${L} + ${L} = ${2 * L} cm. ${P} − ${2 * L} = ${P - 2 * L}, and half of that is ${W} cm.`, key: "m" + P + "," + L };
  }
  const [e, thing, what, u, uw, l1, l2, w1] = pick(MTH_POBJ), L = R(l1, l2), W = R(w1, L - 1), P = 2 * (L + W);
  return { q: `A ${thing} is ${L} ${u} long and ${W} ${u} wide. How many ${uw} of ${what} are needed to go all the way around it?`, vis: bigEmo(e), opts: numU(P, [L * W, L + W, P + 2, 2 * L + W].filter(x => x !== P), 4, 1).map(x => x + " " + u), ans: P + " " + u, big: 1, why: `${L} + ${W} + ${L} + ${W} = ${P} ${u}.`, key: "w" + thing + L + "," + W };
});

/* ---------- 7 · Skip counting ---------- */
addBank(7, "math", "skip", 0.65, () => {
  const k = R(0, 3);
  if (k === 0) {
    const step = pick([2, 5, 10]), top = step * R(6, 12), seq = range(0, 4).map(i => top - step * i), bi = R(1, 4), ans = seq[bi];
    return { q: `Count <b>back</b> by <b>${step}s</b>. What number is missing?`, say: `Count back by ${step}s. What number is missing?`, vis: train(seq.map((v, i) => i === bi ? "?" : v)), opts: numU(ans, [ans + 1, ans - 1, ans + step, ans - step, ans + 2], 3, 0), ans: String(ans), big: 1, why: `Count back by ${step}s: ${seq.join(", ")}.`, key: "b" + seq.join() + bi };
  }
  if (k === 1) {
    const s = R(0, 4), seq = range(1, 5).map(i => 100 * (s + i)), bi = R(1, 4), ans = seq[bi];
    return { q: "Count by <b>100s</b>. What number is missing?", say: "Count by 100s. What number is missing?", vis: train(seq.map((v, i) => i === bi ? "?" : v)), opts: numU(ans, [ans + 10, ans - 10, ans + 100, ans - 100, ans + 1], 100, 0), ans: String(ans), big: 1, why: `Count by 100s: ${seq.join(", ")}.`, key: "h" + seq.join() + bi };
  }
  if (k === 2) {
    const step = pick([2, 5, 10]), s = R(6, 15), seq = range(1, 5).map(i => step * (s + i)), bi = R(1, 4), ans = seq[bi];
    return { q: `Count by <b>${step}s</b>. What number is missing?`, say: `Count by ${step}s. What number is missing?`, vis: train(seq.map((v, i) => i === bi ? "?" : v)), opts: numU(ans, [ans + 1, ans - 1, ans + step, ans - step, ans + 2], 3, 0), ans: String(ans), big: 1, why: `Count by ${step}s: ${seq.join(", ")}.`, key: seq.join() + bi };
  }
  const n = R(2, 10), [step, vis, q, why] = pick([
    [2, `<span class="grp">${Array.from({ length: n }, () => "<span>🧦🧦</span>").join("")}</span>`, `How many socks are in ${n} pairs? Count by 2s.`, "socks"],
    [5, grp(n, "🖐️"), `How many fingers are on ${n} hands? Count by 5s.`, "fingers"],
    [10, coinRow(Array(n).fill("d")), `How many cents are ${n} dimes? Count by 10s.`, "cents"]]);
  const ans = n * step;
  return { q, vis, opts: numU(ans, [ans + step, ans - step, ans + 1, n + step], 3, 1), ans: String(ans), big: 1, why: `Count by ${step}s ${n} times: ${range(1, n).map(i => i * step).join(", ")}. That is ${ans} ${why}.`, key: "w" + step + "_" + n };
});

/* ---------- 7 · Even and odd ---------- */
const MTH_PAIRT = ["socks", "shoes", "mittens", "kids", "ducks", "cookies", "crayons", "balloons", "chairs", "books"];
const MTH_PAIRE = ["🧦", "👟", "🧤", "🧒", "🦆", "🍪", "🖍️", "🎈", "🪑", "📚"];
addBank(7, "math", "evenodd", 0.6, () => {
  const k = R(0, 4);
  if (k === 0) {
    const n = R(41, 99), ev = n % 2 === 0;
    return { q: `Is <b>${n}</b> even or odd?`, say: `Is ${n} even or odd?`, vis: eq(String(n)), opts: ["even", "odd"], ans: ev ? "even" : "odd", big: 1, why: `${n} ends in ${n % 10}, so it is ${ev ? "even" : "odd"}.`, key: "a" + n };
  }
  if (k === 1) {
    const n = R(2, 20), who = KIDS[n % KIDS.length], th = MTH_PAIRT[n % MTH_PAIRT.length], ev = n % 2 === 0;
    return { q: `${who} has ${n} ${th}. Can they all go in pairs with none left over?`, vis: grp(n, MTH_PAIRE[n % MTH_PAIRE.length]), opts: ["Yes", "No"], ans: ev ? "Yes" : "No", big: 1, why: ev ? `${n} is even, so every one has a partner.` : `${n} is odd, so 1 is left without a partner.`, key: "p" + n };
  }
  if (k <= 3) {
    const n = R(1, 30), wantEven = k === 2, a = n + ((n % 2 === 0) === wantEven ? 2 : 1), w = wantEven ? "even" : "odd";
    return { q: `What is the next <b>${w}</b> number after ${n}?`, say: `What is the next ${w} number after ${n}?`, opts: numU(a, [n + 1, n + 2, n + 3, a + 2, n].filter(x => x !== a), 3, 0), ans: String(a), big: 1, why: `${n + 1}${a > n + 1 ? ` is ${wantEven ? "odd" : "even"}, but ${a}` : ""} is ${w}. ${w === "even" ? "Even" : "Odd"} numbers end in ${wantEven ? "0, 2, 4, 6 or 8" : "1, 3, 5, 7 or 9"}.`, key: (wantEven ? "e" : "o") + n };
  }
  const h = R(2, 10), n = 2 * h;
  return { q: `${n} is even. Which <b>double</b> makes ${n}?`, say: `${n} is even. Which double makes ${n}?`, vis: eq(String(n)), opts: shuffle([`${h} + ${h}`, `${h - 1} + ${h - 1}`, `${h + 1} + ${h + 1}`, `${h} + ${h + 1}`]), ans: `${h} + ${h}`, big: 1, why: `${h} + ${h} = ${n}. Every even number can be split into two equal groups.`, key: "d" + n };
});

/* ---------- 6 · Patterns ---------- */
const MTH_PSETS = [["🐸", "🐢", "🐠"], ["🌸", "🍀", "🌻"], ["🍓", "🥝", "🍋"], ["❤️", "💛", "💙"], ["🎈", "🎁", "🎂"], ["🦋", "🐞", "🐝"]];
const MTH_PTYPES = [[0, 1], [0, 0, 1], [0, 1, 1], [0, 1, 2], [0, 0, 1, 1]];
addBank(6, "math", "patterns", 0.6, () => {
  const allSets = PAT_SETS.concat(MTH_PSETS), extra = s => allSets.flat().filter(x => !s.includes(x));
  if (Math.random() < 0.45) {
    const set = pick(MTH_PSETS), type = pick(MTH_PTYPES), len = R(Math.max(5, type.length + 2), 8);
    const seq = Array.from({ length: len + 1 }, (_, i) => set[type[i % type.length]]), ans = seq[len];
    return { q: "What comes <b>next</b>?", say: "What comes next in the pattern?", vis: train([...seq.slice(0, len), "?"]), opts: uniq(ans, shuffle(set).concat(shuffle(extra(set)))).map(MTH_emo), ans: MTH_emo(ans), sayAns: "the next picture in the pattern", why: `The same group of ${type.length} pictures repeats over and over (${type.map(t => set[t]).join(" ")}). Keep the group going to find the next one.`, key: "n" + set[0] + type.join("") + len };
  }
  const set = pick(allSets), type = pick(MTH_PTYPES), len = Math.max(6, 2 * type.length), bi = R(1, len - 2);
  const seq = Array.from({ length: len }, (_, i) => set[type[i % type.length]]), ans = seq[bi];
  return { q: "Which picture is <b>missing</b>?", say: "Which picture is missing from the pattern?", vis: train(seq.map((v, i) => i === bi ? "?" : v)), opts: uniq(ans, shuffle(set).concat(shuffle(extra(set)))).map(MTH_emo), ans: MTH_emo(ans), sayAns: "the missing picture", why: `The group ${type.map(t => set[t]).join(" ")} repeats, so the missing picture is ${ans}.`, key: "g" + set[0] + type.join("") + bi };
});

