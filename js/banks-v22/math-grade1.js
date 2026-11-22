/* =====================================================================
   v22 · Age 6 Math (tag MA6V_)
   New topics: tengroups (Groups of Ten, 1.NBT), equalparts (Halves and Fourths, 1.G)
   More questions for every existing age-6 math topic.
   Every new question carries q.x (new topics) or q.v22 (banks) so the
   wrong-answer rules below only speak about questions they understand.
   ===================================================================== */
const MA6V_tn = n => `${n} ten${n === 1 ? "" : "s"}`;
const MA6V_on = n => `${n} one${n === 1 ? "" : "s"}`;
const MA6V_to = p => p % 10 === 0 ? MA6V_tn(p / 10) : p < 10 ? MA6V_on(p) : `${MA6V_tn(Math.floor(p / 10))} and ${MA6V_on(p % 10)}`;
const MA6V_num = s => { const m = String(s == null ? "" : s).replace(/<[^>]+>/g, " ").trim().match(/^-?\d+$/); return m ? +m[0] : null; };
const MA6V_txt = s => String(s == null ? "" : s).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
/* numbers near ans, kept inside [lo, hi] */
const MA6V_nu = (ans, cands, lo, hi) => uniq(ans, cands.filter(c => c >= lo && c <= hi && c !== ans), () => { const v = ans + R(-3, 3); return v >= lo && v <= hi ? v : null; });
const MA6V_emo = x => `<span class="emo">${x}</span>`;
const MA6V_more = (d, many) => d > 0 ? (many ? "too many" : "more") : (many ? "too few" : "less");

/* ====================== NEW TOPIC 1 · Groups of Ten ====================== */
topic(6, "math", {
  id: "tengroups", title: "Groups of Ten", icon: "🔟", blurb: "Teen numbers, tens, and 10 more or 10 less.",
  lesson: [
    { t: "Make a ten", say: "Ten ones can be put together to make one ten. A stick of 10 cubes is called a ten.", html: row(col(blocks(0, 10), "<b>10 ones</b>"), arrow(), col(blocks(1, 0), "<b>1 ten</b>")) },
    { t: "Teen numbers", say: "A teen number is one ten and some more ones. 14 is 1 ten and 4 ones.", html: row(blocks(1, 4), eq("10 + 4 = <b>14</b>")) + table([["1", "4"]], ["Tens", "Ones"]) },
    { t: "10 more, 10 less", say: "To find 10 more, add one ten. 23 and 10 more is 33. Only the tens digit changes.", html: row(col(blocks(2, 3), "<b>23</b>"), arrow(), col(blocks(3, 3), "<b>33</b>")) + eq("23 + 10 = <b>33</b>") },
  ],
  gen() {
    const r = Math.random();
    if (r < 0.15) {
      const o = R(0, 9), n = 10 + o;
      return { q: `What number is <b>1 ten and ${MA6V_on(o)}</b>?`, say: `What number is 1 ten and ${MA6V_on(o)}?`, vis: blocks(1, o), opts: MA6V_nu(n, [o, o * 10 + 1, n + 1, n - 1, n + 10], 0, 99), ans: String(n), big: 1, why: `1 ten is 10, and ${o} more ones makes ${n}.`, key: "t" + o, x: { k: "teen", o, n } };
    }
    if (r < 0.27) {
      const n = R(11, 19), o = n - 10;
      return { q: `<b>${n}</b> is 1 ten and how many ones?`, say: `${n} is 1 ten and how many ones?`, vis: `<div class="digits"><span class="d-t">1</span><span class="d-o">${o}</span></div>`, opts: MA6V_nu(o, [o + 1, o - 1, 10, 1, o + 2], 0, 10), ans: String(o), big: 1, why: `${n} is 10 and ${o} more, so it has ${MA6V_on(o)}.`, key: "s" + n, x: { k: "split", o, n } };
    }
    if (r < 0.42) {
      const t = R(1, 9), N = t * 10;
      if (Math.random() < 0.5) return { q: `How many tens make <b>${N}</b>?`, say: `How many tens make ${N}?`, vis: eq(String(N)), opts: MA6V_nu(t, [t + 1, t - 1, 10, t + 2], 1, 10), ans: String(t), big: 1, why: `Count by tens: ${range(1, t).map(i => i * 10).join(", ")}. That is ${MA6V_tn(t)}.`, key: "h" + t, x: { k: "howtens", t, N } };
      return { q: `What number do <b>${MA6V_tn(t)}</b> make?`, say: `What number do ${MA6V_tn(t)} make?`, vis: blocks(t, 0), opts: MA6V_nu(N, [t, N + 10, N - 10, N + 1], 1, 100), ans: String(N), big: 1, why: `Count the tens by tens: ${range(1, t).map(i => i * 10).join(", ")}.`, key: "d" + t, x: { k: "decade", t, N } };
    }
    if (r < 0.75) {
      const more = Math.random() < 0.5, n = more ? R(10, 89) : R(11, 99), a = more ? n + 10 : n - 10, dir = more ? 1 : -1;
      const w = more ? "more" : "less";
      return { q: `What is <b>10 ${w}</b> than ${n}?`, say: `What is 10 ${w} than ${n}?`, vis: blocks(Math.floor(n / 10), n % 10), opts: MA6V_nu(a, [n + dir, n - 10 * dir, a + dir, a + 10 * dir], 0, 109), ans: String(a), big: 1, why: more ? `Add one ten: ${n} becomes ${a}. The ones digit stays ${n % 10}.` : `Take away one ten: ${n} becomes ${a}. The ones digit stays ${n % 10}.`, key: (more ? "m" : "l") + n, x: { k: "ten", n, a, more } };
    }
    const add = Math.random() < 0.5;
    if (add) {
      const a = R(1, 8), b = R(1, 9 - a), A = a * 10, B = b * 10, S = A + B;
      return { q: `What is ${A} + ${B}?`, vis: eq(`${A} + ${B} = ${blank()}`), opts: MA6V_nu(S, [S + 10, S - 10, a + b, A > B ? A - B : null, S + 1].filter(x => x != null), 1, 100), ans: String(S), big: 1, why: `${MA6V_tn(a)} and ${MA6V_tn(b)} make ${MA6V_tn(a + b)}, which is ${S}.`, key: "a" + A + "+" + B, x: { k: "addten", a, b, S, add: true } };
    }
    const a = R(2, 9), b = R(1, a - 1), A = a * 10, B = b * 10, D = A - B;
    return { q: `What is ${A} − ${B}?`, vis: eq(`${A} − ${B} = ${blank()}`), opts: MA6V_nu(D, [D + 10, D - 10, a - b, A + B, D + 1], 1, 180), ans: String(D), big: 1, why: `${MA6V_tn(a)} take away ${MA6V_tn(b)} leaves ${MA6V_tn(a - b)}, which is ${D}.`, key: "b" + A + "-" + B, x: { k: "addten", a, b, S: D, add: false } };
  },
});
TRICK_ADD(6, "math", "tengroups", "For 10 more, add 1 to the tens digit. For 10 less, take 1 from the tens digit. The ones digit stays the same.");

whyRule(6, "math", "tengroups", (q, picked) => {
  const x = q.x, p = MA6V_num(picked); if (!x || p == null || String(p) === String(q.ans)) return null;
  if (x.k === "teen") {
    if (p === x.o) return `${p} is only the ones. Don't forget the 1 ten.`;
    return `${p} is ${MA6V_to(p)}, not 1 ten and ${MA6V_on(x.o)}.`;
  }
  if (x.k === "split") return `1 ten and ${MA6V_on(p)} make ${10 + p}, not ${x.n}.`;
  if (x.k === "howtens") return `${MA6V_tn(p)} make ${p * 10}, not ${x.N}.`;
  if (x.k === "decade") {
    if (p === x.t) return `${p} counts the sticks, but each stick is worth 10.`;
    return `${p} is ${MA6V_to(p)}, but the picture shows ${MA6V_tn(x.t)}.`;
  }
  if (x.k === "ten") {
    const d = p - x.n, w = x.more ? "more" : "less", nw = x.more ? "less" : "more";
    if (d === 0) return `${p} is the same number. It needs to change by 10.`;
    if (Math.abs(d) === 1) return `${p} is only 1 ${d > 0 ? "more" : "less"} than ${x.n}. For 10 ${w}, the tens digit changes.`;
    if (d === (x.more ? -10 : 10)) return `${p} is 10 ${nw} than ${x.n}, not 10 ${w}.`;
    return `${p} is ${Math.abs(d)} ${d > 0 ? "more" : "less"} than ${x.n}, not 10 ${w}.`;
  }
  if (x.k === "addten") {
    if (p === (x.add ? x.a + x.b : x.a - x.b)) return `${p} counts the tens, but each ten is worth 10.`;
    if (x.add && p === Math.abs(x.a - x.b) * 10) return `${p} is what you get if you take away. This one needs adding.`;
    if (!x.add && p === (x.a + x.b) * 10) return `${p} is what you get if you add. This one needs taking away.`;
    const d = p - x.S;
    if (p % 10 === 0 && Math.abs(d) >= 10) return `${p} is ${MA6V_tn(p / 10)}. That is ${MA6V_tn(Math.abs(d) / 10)} ${MA6V_more(d, 1)}.`;
    return `${p} is ${Math.abs(d)} ${MA6V_more(d)} than the right answer. A number made of tens always ends in 0.`;
  }
  return null;
});

/* ====================== NEW TOPIC 2 · Halves and Fourths ====================== */
/* cut: [id, parts, equal?] */
const MA6V_CUTS = {
  circle: [["h2", 2, 1], ["q4", 4, 1], ["uv2", 2, 0], ["uq4", 4, 0]],
  square: [["v2", 2, 1], ["h2", 2, 1], ["d2", 2, 1], ["q4", 4, 1], ["s4", 4, 1], ["x4", 4, 1], ["uv2", 2, 0], ["uh2", 2, 0], ["uq4", 4, 0], ["us4", 4, 0]],
  rectangle: [["v2", 2, 1], ["h2", 2, 1], ["q4", 4, 1], ["s4", 4, 1], ["uv2", 2, 0], ["uh2", 2, 0], ["uq4", 4, 0], ["us4", 4, 0]],
};
const MA6V_cinfo = (sh, cut) => { const c = MA6V_CUTS[sh].find(x => x[0] === cut); return { n: c[1], eq: !!c[2] }; };
function MA6V_cutSVG(sh, cut, shade, colr, s = 120) {
  const inf = MA6V_cinfo(sh, cut), sh0 = shade && shade.length;
  const label = `${sh} cut into ${inf.n} parts${sh0 ? `, ${shade.length} part shaded` : ""}`;
  const fillOf = i => !sh0 ? colr : shade.includes(i) ? colr : "#FFFFFF";
  const st = `stroke="${INK}" stroke-width="3" stroke-linejoin="round"`;
  let t = svgOpen(s, s, label).replace("<svg ", `<svg data-eq="${inf.eq ? 1 : 0}" `);
  if (sh === "circle") {
    const c = s / 2, r = c - 8;
    if (cut === "h2") t += [`M${c},${c - r} A${r},${r} 0 0 0 ${c},${c + r} Z`, `M${c},${c - r} A${r},${r} 0 0 1 ${c},${c + r} Z`].map((d, i) => `<path d="${d}" fill="${fillOf(i)}" ${st}/>`).join("");
    else if (cut === "q4") t += [`M${c},${c} L${c},${c - r} A${r},${r} 0 0 1 ${c + r},${c} Z`, `M${c},${c} L${c + r},${c} A${r},${r} 0 0 1 ${c},${c + r} Z`, `M${c},${c} L${c},${c + r} A${r},${r} 0 0 1 ${c - r},${c} Z`, `M${c},${c} L${c - r},${c} A${r},${r} 0 0 1 ${c},${c - r} Z`].map((d, i) => `<path d="${d}" fill="${fillOf(i)}" ${st}/>`).join("");
    else {
      const o = 0.45 * r, h = f1(Math.sqrt(r * r - o * o));
      t += `<circle cx="${c}" cy="${c}" r="${r}" fill="${colr}"/>`;
      t += `<line x1="${f1(c - o)}" y1="${f1(c - h)}" x2="${f1(c - o)}" y2="${f1(c + h)}" ${st}/>`;
      if (cut === "uq4") t += `<line x1="${f1(c - h)}" y1="${f1(c - o)}" x2="${f1(c + h)}" y2="${f1(c - o)}" ${st}/>`;
    }
    return t + `<circle cx="${c}" cy="${c}" r="${r}" fill="none" stroke="${INK}" stroke-width="4"/></svg>`;
  }
  const x0 = sh === "square" ? 12 : 6, y0 = sh === "square" ? 12 : f1(s * 0.25), w = sh === "square" ? s - 24 : s - 12, h = sh === "square" ? s - 24 : f1(s * 0.5);
  const x1 = x0 + w, y1 = y0 + h, X = f => f1(x0 + f * w), Y = f => f1(y0 + f * h);
  const box = (a, b, c, d) => [[X(a), Y(b)], [X(c), Y(b)], [X(c), Y(d)], [X(a), Y(d)]];
  let P;
  if (cut === "v2") P = [box(0, 0, .5, 1), box(.5, 0, 1, 1)];
  else if (cut === "h2") P = [box(0, 0, 1, .5), box(0, .5, 1, 1)];
  else if (cut === "d2") P = [[[x0, y0], [x1, y0], [x1, y1]], [[x0, y0], [x1, y1], [x0, y1]]];
  else if (cut === "q4") P = [box(0, 0, .5, .5), box(.5, 0, 1, .5), box(.5, .5, 1, 1), box(0, .5, .5, 1)];
  else if (cut === "s4") P = [box(0, 0, .25, 1), box(.25, 0, .5, 1), box(.5, 0, .75, 1), box(.75, 0, 1, 1)];
  else if (cut === "x4") { const cx = X(.5), cy = Y(.5); P = [[[x0, y0], [x1, y0], [cx, cy]], [[x1, y0], [x1, y1], [cx, cy]], [[x1, y1], [x0, y1], [cx, cy]], [[x0, y1], [x0, y0], [cx, cy]]]; }
  else if (cut === "uv2") P = [box(0, 0, .28, 1), box(.28, 0, 1, 1)];
  else if (cut === "uh2") P = [box(0, 0, 1, .28), box(0, .28, 1, 1)];
  else if (cut === "uq4") P = [box(0, 0, .3, .3), box(.3, 0, 1, .3), box(.3, .3, 1, 1), box(0, .3, .3, 1)];
  else P = [box(0, 0, .15, 1), box(.15, 0, .4, 1), box(.4, 0, .7, 1), box(.7, 0, 1, 1)];
  t += P.map((pts, i) => `<polygon points="${pts.map(p => p.join(",")).join(" ")}" fill="${fillOf(i)}" ${st}/>`).join("");
  return t + `<rect x="${x0}" y="${y0}" width="${w}" height="${h}" fill="none" stroke="${INK}" stroke-width="4"/></svg>`;
}
const MA6V_FOOD = [["🍕", "pizza"], ["🥪", "sandwich"], ["🎂", "cake"], ["🥧", "pie"], ["🧇", "waffle"], ["🥞", "pancake"], ["🍪", "big cookie"], ["🍞", "slice of bread"]];
const MA6V_PNAME = ["a half", "a fourth", "the whole"];
const MA6V_fig = (svg, cap) => `<figure>${svg}<figcaption>${cap}</figcaption></figure>`;
topic(6, "math", {
  id: "equalparts", title: "Halves and Fourths", icon: "🍕", blurb: "Cut shapes into equal parts.",
  lesson: [
    { t: "Equal parts", say: "Equal parts are all the same size. The first square has equal parts. The second one does not.", html: `<div class="shape-row">${MA6V_fig(MA6V_cutSVG("square", "v2", [], "#FFC93C", 110), "✔ equal parts")}${MA6V_fig(MA6V_cutSVG("square", "uv2", [], "#FFC93C", 110), "✘ not equal")}</div>` },
    { t: "Halves", say: "Cut a shape into 2 equal parts. Each part is one half. Two halves make the whole shape.", html: `<div class="shape-row">${MA6V_fig(MA6V_cutSVG("circle", "h2", [0], "#FF7A59", 110), "<b>a half</b>")}${MA6V_fig(MA6V_cutSVG("rectangle", "v2", [1], "#3D7BFF", 110), "<b>a half</b>")}</div>` + note("2 halves = 1 whole") },
    { t: "Fourths", say: "Cut a shape into 4 equal parts. Each part is one fourth, also called a quarter. A fourth is smaller than a half.", html: `<div class="shape-row">${MA6V_fig(MA6V_cutSVG("circle", "q4", [0], "#1FAF6E", 110), "<b>a fourth</b>")}${MA6V_fig(MA6V_cutSVG("square", "q4", [2], "#9B5DE5", 110), "<b>a fourth</b>")}</div>` + note("4 fourths = 1 whole") },
  ],
  gen() {
    const r = Math.random(), sh = pick(["circle", "square", "rectangle"]), colr = pick(SHAPE_COLS), cuts = MA6V_CUTS[sh];
    if (r < 0.2) {
      const eqW = Math.random() < 0.5, [cut, n] = pick(cuts.filter(c => !!c[2] === eqW));
      return { q: "Is this shape cut into <b>equal</b> parts?", say: "Is this shape cut into equal parts?", vis: MA6V_cutSVG(sh, cut, [], colr, 140), opts: ["Yes", "No"], ans: eqW ? "Yes" : "No", big: 1, why: eqW ? `All ${n} parts are the same size, so they are equal.` : "One part is bigger than another, so the parts are not equal.", key: "e" + sh + cut, x: { k: "eq", eq: eqW, n } };
    }
    if (r < 0.33) {
      const [cut, n] = pick(cuts.filter(c => c[2]));
      return { q: "How many <b>equal parts</b> is this shape cut into?", say: "How many equal parts is this shape cut into?", vis: MA6V_cutSVG(sh, cut, [], colr, 140), opts: uniq(n, [2, 3, 4, 1]), ans: String(n), big: 1, why: `Count the parts: there are ${n}, and they are all the same size.`, key: "n" + sh + cut, x: { k: "count", n } };
    }
    if (r < 0.53) {
      const [cut, n] = pick(cuts.filter(c => c[2])), i = R(0, n - 1), a = n === 2 ? "a half" : "a fourth";
      return { q: "What is the <b>shaded</b> part called?", say: "This shape is cut into equal parts. What is the shaded part called?", vis: MA6V_cutSVG(sh, cut, [i], colr, 140), opts: [...MA6V_PNAME], ans: a, big: 1, why: `The shape has ${n} equal parts, and 1 is shaded, so it is ${a}.`, key: "c" + sh + cut + i, x: { k: "name", n } };
    }
    if (r < 0.68) {
      const want = Math.random() < 0.5 ? 2 : 4, ww = want === 2 ? "halves" : "fourths";
      const right = pick(cuts.filter(c => c[2] && c[1] === want)), unEq = shuffle(cuts.filter(c => !c[2] && c[1] === want)), other = shuffle(cuts.filter(c => c[2] && c[1] !== want));
      const chosen = [right, unEq[0], other[0]]; if (unEq[1]) chosen.push(unEq[1]); else if (other[1]) chosen.push(other[1]);
      const svgs = chosen.map(c => MA6V_cutSVG(sh, c[0], [], colr, 100));
      return { q: `Which ${sh} is cut into <b>${ww}</b>?`, say: `Which ${sh} is cut into ${ww}?`, opts: shuffle([...svgs]), ans: svgs[0], sayAns: `the ${sh} with ${want} equal parts`, why: `${cap(ww)} means ${want} equal parts, all the same size.`, key: "w" + want + sh + right[0], x: { k: "which", want, sh } };
    }
    if (r < 0.78) {
      const [e, o] = pick(MA6V_FOOD), [a, b] = shuffle(KIDS).slice(0, 2), big = Math.random() < 0.5;
      return { q: `${a} cuts a ${o} into halves. ${b} cuts the same size ${o} into fourths. Whose pieces are <b>${big ? "bigger" : "smaller"}</b>?`, say: `${a} cuts a ${o} into halves. ${b} cuts the same size ${o} into fourths. Whose pieces are ${big ? "bigger" : "smaller"}?`, vis: bigEmo(e), opts: shuffle([a, b]), ans: big ? a : b, big: 1, why: big ? `Halves are bigger than fourths, because the ${o} is cut into fewer parts.` : `Fourths are smaller than halves, because the ${o} is cut into more parts.`, key: "b" + a + b + o + big, x: { k: "bigger", half: a, four: b, o, big } };
    }
    if (r < 0.9) {
      const [e, o] = pick(MA6V_FOOD), a = pick(KIDS), f = Math.random() < 0.5 ? 1 : 3, n = f + 1, ans = n === 2 ? "a half" : "a fourth";
      return { q: `${a} shares a ${o} equally with ${f === 1 ? "1 friend" : "3 friends"}. What part does each person get?`, vis: bigEmo(e), opts: [...MA6V_PNAME], ans, big: 1, why: `${n} people share it, so the ${o} is cut into ${n} equal parts. Each gets ${ans}.`, key: "g" + a + o + f, x: { k: "share", n, o } };
    }
    const [e, o] = pick(MA6V_FOOD), n = Math.random() < 0.5 ? 2 : 4, w = n === 2 ? "halves" : "fourths";
    return { q: `How many <b>${w}</b> make one whole ${o}?`, say: `How many ${w} make one whole ${o}?`, vis: bigEmo(e), opts: ["1", "2", "3", "4"], ans: String(n), big: 1, why: `${cap(w)} means ${n} equal parts, so ${n} ${w} make the whole ${o}.`, key: "f" + n + o, x: { k: "make", n } };
  },
});
TRICK_ADD(6, "math", "equalparts", "Equal parts must be the same size. 2 equal parts are halves, and 4 equal parts are fourths.");

whyRule(6, "math", "equalparts", (q, picked) => {
  const x = q.x; if (!x || picked === q.ans) return null;
  const p = MA6V_txt(picked);
  if (x.k === "eq") return x.eq ? "These parts all match in size, and that is what equal means." : "Equal parts must all be the same size, and these are not.";
  if (x.k === "count") { const pn = +p; if (!(pn >= 0)) return null; return `${pn} is ${pn > x.n ? "too many" : "too few"}. Count each part once.`; }
  if (x.k === "name" || x.k === "share") {
    const who = x.k === "share";
    if (p === "the whole") return who ? `The whole is all of the ${x.o}, but it is shared, so each person gets a part.` : "The whole is the full shape, but only 1 part is shaded.";
    if (p === "a fourth") return who ? "A fourth is for 4 people sharing, but here only 2 people share." : "A fourth is 1 of 4 equal parts, but this shape has only 2 parts.";
    if (p === "a half") return who ? "A half is for 2 people sharing, but here 4 people share." : "A half is 1 of 2 equal parts, but this shape has 4 parts.";
    return null;
  }
  if (x.k === "which") {
    const m = String(picked).match(/cut into (\d) parts/), e = String(picked).match(/data-eq="([01])"/); if (!m || !e) return null;
    const n = +m[1], ww = x.want === 2 ? "halves" : "fourths";
    if (e[1] !== "1") return `Those parts are not the same size, so they are not ${ww}.`;
    if (n !== x.want) return `That ${x.sh} has ${n} equal parts, so those are ${n === 2 ? "halves" : "fourths"}.`;
    return null;
  }
  if (x.k === "bigger") {
    if (p === x.four) return `${p} cut the ${x.o} into 4 parts, and more parts means smaller parts.`;
    if (p === x.half) return `${p} cut the ${x.o} into just 2 parts, so each part is bigger.`;
    return null;
  }
  if (x.k === "make") {
    const pn = +p, half = x.n === 2;
    if (pn === 1) return `1 ${half ? "half" : "fourth"} is only one part of the whole.`;
    if (half && pn === 4) return "4 equal parts are fourths, not halves.";
    if (half && pn === 3) return "Halves means 2 equal parts, so 3 is too many.";
    if (!half && pn === 2) return "2 equal parts are halves, not fourths.";
    if (!half && pn === 3) return "3 fourths still leave 1 fourth missing from the whole.";
    return null;
  }
  return null;
});

/* ====================== PART B · more questions for existing topics ====================== */
const MA6V_rule = (id, fn) => whyRule(6, "math", id, (q, picked) => { if (!q.v22 || picked === q.ans) return null; return fn(q.v22, picked, MA6V_num(picked), MA6V_txt(picked)); });

/* ---------- count: numbers to 120 ---------- */
addBank(6, "math", "count", 0.35, () => {
  if (Math.random() < 0.55) {
    const after = Math.random() < 0.6, n = R(20, 119), a = after ? n + 1 : n - 1;
    return { q: `What number comes ${after ? "after" : "before"} <b>${n}</b>?`, say: `What number comes ${after ? "after" : "before"} ${n}?`, vis: train(after ? [n, "?"] : ["?", n]), opts: MA6V_nu(a, [a + 1, a - 1, n, a + 2, a + 10, a - 10], 0, 125), ans: String(a), big: 1, why: after ? `Count on: ${n}, ${a}.` : `Count back: ${n}, ${a}.`, key: "v" + n + after, v22: { k: "ab", n, a, after } };
  }
  const s = R(20, 116), bi = R(1, 2), seq = range(s, s + 3), ans = seq[bi];
  return { q: "Which number is <b>missing</b>?", say: "Count on. Which number is missing?", vis: train(seq.map((v, i) => i === bi ? "?" : v)), opts: MA6V_nu(ans, [ans + 1, ans - 1, ans + 10, ans - 10, ans + 2], 0, 125), ans: String(ans), big: 1, why: `Count on by ones: ${seq.join(", ")}.`, key: "g" + s + bi, v22: { k: "gap", seq, bi } };
});
MA6V_rule("count", (x, raw, p) => {
  if (p == null) return null;
  if (x.k === "ab") {
    const w = x.after ? "after" : "before";
    if (p === x.n) return `${p} is the number in the question, not the one ${w} it.`;
    if (x.after && p < x.n) return `${p} comes before ${x.n}, not after it.`;
    if (!x.after && p > x.n) return `${p} comes after ${x.n}, not before it.`;
    return `${p} is ${Math.abs(p - x.n)} ${p > x.n ? "more" : "less"} than ${x.n}. The number right ${w} is just 1 away.`;
  }
  if (x.k === "gap") {
    if (x.seq.includes(p)) return `${p} is already in the line, so it isn't the missing one.`;
    return `${p} doesn't fit between ${x.seq[x.bi - 1]} and ${x.seq[x.bi + 1]}.`;
  }
  return null;
});

/* ---------- add10: missing addend, pairs, how many more ---------- */
addBank(6, "math", "add10", 0.25, () => {
  const k = R(0, 2);
  if (k === 0) {
    const s = R(3, 10), a = R(1, s - 1), b = s - a;
    return { q: "What number makes this true?", say: `${a} plus what number equals ${s}?`, vis: eq(`${a} + ${blank()} = ${s}`), opts: MA6V_nu(b, [b + 1, b - 1, s, a, b + 2], 0, 10), ans: String(b), big: 1, why: `Count on from ${a} to ${s}: that is ${b} more. ${a} + ${b} = ${s}.`, key: "v" + a + "_" + s, v22: { k: "miss", a, s } };
  }
  if (k === 1) {
    const T = R(5, 10), x = R(1, T - 1), cands = [];
    for (let d of shuffle([-1, 1, -2, 2])) { const y = T + d - x; if (y >= 0 && y <= 10 && !cands.includes(`${x} + ${y}`)) cands.push(`${x} + ${y}`); }
    for (let i = 0; i < 6; i++) { const u = R(1, T - 1), d = pick([-1, 1, 2]), y = T + d - u; if (y >= 0 && y <= 10) cands.push(`${u} + ${y}`); }
    return { q: `Which one makes <b>${T}</b>?`, say: `Which one makes ${T}?`, vis: tenframe(T, "⭐"), opts: uniq(`${x} + ${T - x}`, shuffle(cands)), ans: `${x} + ${T - x}`, big: 1, why: `${x} + ${T - x} = ${T}.`, key: "p" + x + "_" + T, v22: { k: "pair", T } };
  }
  const s = R(3, 10), a = R(1, s - 1), b = s - a, t = pick(THINGS), who = pick(KIDS);
  return { q: `${who} has ${a} ${pl(a, t)}. ${who} wants ${s}. How many more does ${who} need?`, vis: grp(a, t[0]), opts: MA6V_nu(b, [b + 1, b - 1, s, a], 0, 10), ans: String(b), big: 1, why: `${a} + ${b} = ${s}, so ${who} needs ${b} more.`, key: "w" + a + "_" + s, v22: { k: "need", a, s, who } };
});
MA6V_rule("add10", (x, raw, p, t) => {
  if (x.k === "pair") { const m = t.match(/^(\d+) \+ (\d+)$/); return m ? `${m[1]} + ${m[2]} = ${+m[1] + +m[2]}, not ${x.T}.` : null; }
  if (p == null) return null;
  if (x.k === "need") {
    if (p === x.s && p !== x.s - x.a) return `${x.s} is how many ${x.who} wants in all, not how many more.`;
    if (p === x.a && p !== x.s - x.a) return `${x.a} is how many ${x.who} has now, not how many more.`;
  }
  return `${x.a} + ${p} = ${x.a + p}, not ${x.s}.`;
});

/* ---------- sub10: missing number, give away, how many fewer ---------- */
addBank(6, "math", "sub10", 0.25, () => {
  const k = R(0, 2), t = pick(THINGS), who = pick(KIDS);
  if (k === 0) {
    const a = R(2, 10), b = R(1, a), d = a - b;
    return { q: "What number makes this true?", say: `${a} minus what number equals ${d}?`, vis: eq(`${a} − ${blank()} = ${d}`), opts: MA6V_nu(b, [b + 1, b - 1, d, a], 0, a), ans: String(b), big: 1, why: `${a} − ${b} = ${d}. Count back from ${a} to ${d}: that is ${b} steps.`, key: "v" + a + "_" + d, v22: { k: "miss", a, d } };
  }
  if (k === 1) {
    const a = R(3, 10), b = R(1, a - 1), d = a - b;
    return { q: `${who} had ${a} ${t[1]}. ${who} gave some away. Now ${who} has ${d}. How many did ${who} give away?`, vis: crossed(a, b, t[0]), opts: MA6V_nu(b, [b + 1, b - 1, a, d], 0, 10), ans: String(b), big: 1, why: `${a} − ${b} = ${d}, so ${who} gave away ${b}.`, key: "g" + a + "_" + d, v22: { k: "gave", a, d, who } };
  }
  let a = R(2, 10), b = R(1, 9); while (b >= a) { a = R(2, 10); b = R(1, 9); }
  const [w1, w2] = shuffle(KIDS).slice(0, 2), D = a - b;
  return { q: `${w1} has ${a} ${t[1]}. ${w2} has ${b} ${pl(b, t)}. How many fewer does ${w2} have?`, vis: `<div class="cmp"><div>${grp(a, t[0])}</div><div>${grp(b, t[0])}</div></div>`, opts: MA6V_nu(D, [D + 1, D - 1, a + b, b, a], 0, 20), ans: String(D), big: 1, why: `${a} − ${b} = ${D}. ${w2} has ${D} fewer.`, key: "f" + a + "_" + b, v22: { k: "fewer", a, b, w1, w2 } };
});
MA6V_rule("sub10", (x, raw, p) => {
  if (p == null) return null;
  if (x.k === "miss") return p > x.a ? `${p} is more than ${x.a}, so you can't take it away.` : `${x.a} − ${p} = ${x.a - p}, not ${x.d}.`;
  if (x.k === "gave") {
    if (p === x.a) return `${x.a} is how many ${x.who} had at the start.`;
    if (p === x.d) return `${x.d} is how many ${x.who} has left, not how many went away.`;
    return p > x.a ? `${x.who} only had ${x.a}, so ${p} is too many.` : `${x.a} − ${p} = ${x.a - p}, not ${x.d}.`;
  }
  if (x.k === "fewer") {
    if (p === x.a + x.b) return `${p} is both groups added together. "How many fewer" means take away.`;
    if (p === x.a) return `${p} is how many ${x.w1} has, not how many fewer.`;
    if (p === x.b) return `${p} is how many ${x.w2} has, not how many fewer.`;
    const d = p - (x.a - x.b); return `${p} is ${Math.abs(d)} ${MA6V_more(d, 1)}. Match them up and count the extras.`;
  }
  return null;
});

/* ---------- shapes: what makes a shape, shape riddles ---------- */
const MA6V_ATTR = { circle: "It is round with no corners", triangle: "It has 3 sides", square: "It has 4 equal sides", pentagon: "It has 5 sides", hexagon: "It has 6 sides" };
const MA6V_RIDDLE = { circle: "a shape that is round, with no sides and no corners", triangle: "a shape with 3 sides and 3 corners", square: "a shape with 4 sides that are all the same length", rectangle: "a shape with 4 sides: 2 long sides and 2 short sides", pentagon: "a shape with 5 sides and 5 corners", hexagon: "a shape with 6 sides and 6 corners" };
const MA6V_SW = { circle: "no sides at all", triangle: "3 sides", square: "4 sides, all the same length", rectangle: "2 long sides and 2 short sides", pentagon: "5 sides", hexagon: "6 sides" };
addBank(6, "math", "shapes", 0.2, () => {
  if (Math.random() < 0.45) {
    const n = pick(Object.keys(MA6V_ATTR)), colr = pick(SHAPE_COLS), cn = SHAPE_COLNAME[colr];
    const others = shuffle(Object.keys(MA6V_ATTR).filter(s => s !== n)).slice(0, 1).map(s => MA6V_ATTR[s]);
    const opts = shuffle([MA6V_ATTR[n], `It is ${cn}`, pick(["It is big", "It is small"]), ...others]);
    return { q: `This is a ${n}. What makes it a ${n}?`, vis: shape(n, colr, 130), opts, ans: MA6V_ATTR[n], why: `${MA6V_ATTR[n]}. Color and size don't change a shape's name.`, key: "v22a" + n + colr, v22: { k: "attr", n } };
  }
  const n = pick(SHAPES.map(s => s[0])), who = pick(KIDS), names = SHAPES.map(s => s[0]).filter(x => x !== n && !(n === "square" && x === "rectangle") && !(n === "rectangle" && x === "square"));
  return { q: `${who} draws ${MA6V_RIDDLE[n]}. What shape is it?`, opts: shuffle([n, ...shuffle(names).slice(0, 3)]), ans: n, big: 1, why: `A ${n} has ${MA6V_SW[n]}.`, key: "v22r" + n + who, v22: { k: "riddle", n } };
});
MA6V_rule("shapes", (x, raw, p, t) => {
  if (x.k === "attr") {
    if (/^It is (orange|blue|green|purple|yellow)$/.test(t)) return `Color doesn't change a shape. A ${x.n} can be any color.`;
    if (/^It is (big|small)$/.test(t)) return `Size doesn't change a shape. A ${x.n} can be big or small.`;
    const o = Object.keys(MA6V_ATTR).find(s => MA6V_ATTR[s] === t); if (!o) return null;
    return `That is true for a ${o}, not a ${x.n}.`;
  }
  if (x.k === "riddle") { const s = t.toLowerCase(); if (!MA6V_SW[s]) return null; return `A ${s} has ${MA6V_SW[s]}, so it is a different shape.`; }
  return null;
});

/* ---------- compare: two-digit numbers (existing rule understands these) ---------- */
addBank(6, "math", "compare", 0.2, () => {
  if (Math.random() < 0.6) {
    const a = R(21, 99); let b = R(10, 99); while (b === a) b = R(10, 99);
    if (Math.random() < 0.4 && a % 10 !== Math.floor(a / 10) && a % 10) b = (a % 10) * 10 + Math.floor(a / 10);
    const less = Math.random() < 0.5, ans = less ? Math.min(a, b) : Math.max(a, b);
    return { q: `Which is <b>${less ? "less" : "more"}</b>: ${a} or ${b}?`, say: `Which is ${less ? "less" : "more"}: ${a} or ${b}?`, opts: [String(a), String(b)], ans: String(ans), big: 1, why: Math.floor(a / 10) !== Math.floor(b / 10) ? `Look at the tens first: ${Math.min(a, b)} has fewer tens than ${Math.max(a, b)}.` : `Same tens, so look at the ones: ${Math.min(a, b)} is less than ${Math.max(a, b)}.`, key: "v" + a + "_" + b + less };
  }
  const s = new Set(); while (s.size < 4) s.add(R(10, 99)); const arr = [...s], big = Math.random() < 0.5, ans = big ? Math.max(...arr) : Math.min(...arr);
  return { q: `Which number is the <b>${big ? "biggest" : "smallest"}</b>?`, say: `Which number is the ${big ? "biggest" : "smallest"}?`, opts: shuffle(arr).map(String), ans: String(ans), big: 1, why: `Compare the tens digits first. ${ans} is the ${big ? "biggest" : "smallest"}.`, key: "vb" + arr.join() };
});

/* ---------- oclock: digital clocks, hands in words, more events ---------- */
const MA6V_EV = [["Art class is at 1 o'clock", 1, "art time"], ["Soccer practice is at 5 o'clock", 5, "soccer time"], ["The library trip is at 11 o'clock", 11, "library time"], ["Bath time is at 7 o'clock", 7, "bath time"], ["Nora's party starts at 2 o'clock", 2, "party time"], ["Music class is at 9 o'clock", 9, "music time"], ["Recess is at 10 o'clock", 10, "recess"], ["Grandma visits at 4 o'clock", 4, "visit time"], ["The bus comes at 3 o'clock", 3, "bus time"], ["Breakfast is at 6 o'clock", 6, "breakfast time"], ["The puppet show is at 12 o'clock", 12, "show time"], ["Kai's dance class is at 8 o'clock", 8, "dance time"]];
addBank(6, "math", "oclock", 0.35, () => {
  const h = R(1, 12), others = shuffle(range(1, 12).filter(x => x !== h)).slice(0, 3), k = R(0, 3);
  if (k === 0) return { q: `Which clock shows <b>${h}:00</b>?`, say: `Which clock shows ${h}:00?`, opts: shuffle([h, ...others]).map(x => clock(x, 0, 110)), ans: clock(h, 0, 110), sayAns: `${h} o'clock`, why: `${h}:00 is ${h} o'clock: the short hand points to ${h} and the long hand to 12.`, key: "v22d" + h, v22: { k: "clk" } };
  if (k === 1) return { q: "This clock shows the time with numbers. What time is it?", vis: `<div class="big-time">${h}:00</div>`, opts: shuffle([h, ...others]).map(x => `${x} o'clock`), ans: `${h} o'clock`, big: 1, why: `${h}:00 is read as ${h} o'clock.`, key: "v22g" + h, v22: { k: "dig", h } };
  if (k === 2) return { q: `The long hand points to 12. The short hand points to ${h}. What time is it?`, opts: shuffle([h, ...others]).map(x => `${x} o'clock`), ans: `${h} o'clock`, big: 1, why: `The short hand tells the hour, so it is ${h} o'clock.`, key: "v22h" + h, v22: { k: "hands", h } };
  const [s, eh, label] = pick(MA6V_EV), oth = shuffle(range(1, 12).filter(x => x !== eh)).slice(0, 3);
  return { q: `${s}. Which clock shows ${label}?`, opts: shuffle([eh, ...oth]).map(x => clock(x, 0, 110)), ans: clock(eh, 0, 110), sayAns: `${eh} o'clock`, why: `At ${eh} o'clock the short hand points to ${eh} and the long hand points to 12.`, key: "v22e" + s, v22: { k: "clk" } };
});
MA6V_rule("oclock", (x, raw, p, t) => {
  const m = t.match(/^(\d+) o'clock$/); if (!m) return null;
  if (x.k === "dig") return `${t} would be written ${m[1]}:00, not ${x.h}:00.`;
  if (x.k === "hands") return `At ${t}, the short hand points to the ${m[1]}, not the ${x.h}.`;
  return null;
});

/* ---------- patterns: new picture sets (existing rule recomputes the pattern) ---------- */
const MA6V_PSETS = [["🍩", "🍉", "🍒"], ["🐙", "🐳", "🦀"], ["🌲", "🌵", "🌴"], ["🏀", "🎾", "🏈"], ["🎸", "🥁", "🎺"], ["☁️", "🌈", "❄️"], ["🦒", "🐘", "🦓"]];
const MA6V_PTYPES = [[0, 1], [0, 0, 1], [0, 1, 1], [0, 1, 2], [0, 0, 1, 1], [0, 1, 2, 1]];
addBank(6, "math", "patterns", 0.35, () => {
  const set = pick(MA6V_PSETS), type = pick(MA6V_PTYPES), len = Math.min(9, 2 * type.length + R(0, 2)), others = MA6V_PSETS.flat().filter(x => !set.includes(x));
  const seq = Array.from({ length: len + 1 }, (_, i) => set[type[i % type.length]]), ans = seq[len];
  return { q: "What comes <b>next</b>?", say: "What comes next in the pattern?", vis: train([...seq.slice(0, len), "?"]), opts: uniq(ans, shuffle(set.filter(x => type.includes(set.indexOf(x)))).concat(shuffle(others))).map(MA6V_emo), ans: MA6V_emo(ans), sayAns: "the next picture in the pattern", why: `The same group of ${type.length} pictures repeats (${type.map(i => set[i]).join(" ")}). Keep the group going to find the next one.`, key: "v" + set[0] + type.join("") + len };
});

/* ---------- doubles: doubles plus one, two equal groups, half of a double ---------- */
addBank(6, "math", "doubles", 0.35, () => {
  const k = R(0, 2), t = pick(THINGS);
  if (k === 0) {
    const n = R(1, 9), first = Math.random() < 0.5, x = first ? n : n + 1, y = first ? n + 1 : n, s = 2 * n + 1;
    return { q: `What is ${x} + ${y}?`, vis: eq(`${x} + ${y} = ${blank()}`) + note(`Hint: ${n} + ${n} = ${2 * n}`), opts: MA6V_nu(s, [2 * n, 2 * n + 2, s + 2, n + 1], 0, 25), ans: String(s), big: 1, why: `${n} + ${n} = ${2 * n}, and 1 more makes ${s}.`, key: "v" + x + "+" + y, v22: { k: "near", n, s } };
  }
  if (k === 1) {
    const n = R(1, 10), who = pick(KIDS);
    return { q: `${who} has 2 plates. Each plate has ${n} ${pl(n, t)}. How many ${t[1]} in all?`, vis: n <= 6 ? plates(2, n, t[0]) : eq(`${n} + ${n} = ${blank()}`), opts: MA6V_nu(2 * n, [2 * n + 1, 2 * n - 1, n, n + 2], 1, 25), ans: String(2 * n), big: 1, why: `2 plates of ${n} is a double: ${n} + ${n} = ${2 * n}.`, key: "p" + n + t[1], v22: { k: "plates", n } };
  }
  const n = R(1, 10);
  return { q: `What number plus itself makes <b>${2 * n}</b>?`, say: `What number plus itself makes ${2 * n}?`, vis: eq(`${blank()} + ${blank()} = ${2 * n}`), opts: MA6V_nu(n, [n + 1, n - 1, 2 * n, n + 2], 1, 20), ans: String(n), big: 1, why: `${n} + ${n} = ${2 * n}.`, key: "h" + n, v22: { k: "half", n } };
});
MA6V_rule("doubles", (x, raw, p) => {
  if (p == null) return null;
  if (x.k === "near") {
    if (p === 2 * x.n) return `${p} is ${x.n} + ${x.n}. One number is 1 bigger, so add 1 more.`;
    if (p === 2 * x.n + 2) return `${p} is ${x.n + 1} + ${x.n + 1}, which is 1 too many.`;
    const d = p - x.s; return `${p} is ${Math.abs(d)} ${MA6V_more(d, 1)}. Start with ${x.n} + ${x.n}, then add 1.`;
  }
  if (x.k === "plates") {
    if (p === x.n) return `${p} is just one plate. There are 2 plates.`;
    const d = p - 2 * x.n; return `${p} is ${Math.abs(d)} ${MA6V_more(d, 1)}. Add ${x.n} + ${x.n}.`;
  }
  if (x.k === "half") return `${p} + ${p} = ${2 * p}, not ${2 * x.n}.`;
  return null;
});

/* ---------- numwords: tens words and twenty-something ---------- */
const MA6V_TENW = ["", "ten", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety", "one hundred"];
const MA6V_word = n => n <= 20 ? NUMWORDS[n] : n % 10 === 0 ? MA6V_TENW[n / 10] : `${MA6V_TENW[Math.floor(n / 10)]}-${NUMWORDS[n % 10]}`;
const MA6V_val = w => { for (let n = 0; n <= 100; n++) if (MA6V_word(n) === w) return n; return null; };
const MA6V_TMISS = { 20: ["twendy", "twentey", "tweny"], 30: ["thirtey", "thurty", "thirdy"], 40: ["fourty", "fortey", "foorty"], 50: ["fivety", "fifdy", "fiftey"], 60: ["sixdy", "sixtey", "sicksty"], 70: ["sevendy", "seventey", "sevinty"], 80: ["eightty", "eighdy", "aighty"], 90: ["ninty", "ninedy", "ninetey"] };
addBank(6, "math", "numwords", 0.3, () => {
  const k = R(0, 4);
  if (k <= 3) {
    const n = k <= 1 ? 10 * R(2, 10) : R(21, 29), t = Math.floor(n / 10);
    const near = (k <= 1 ? [n + 10, n - 10, t < 10 ? 10 + t : null, t] : [n + 1, n - 1, n + 10, 10 * (n % 10) + 2, 12]).filter(v => v != null && v >= 0 && v <= 100 && v !== n);
    if (k % 2 === 0) return { q: `Which number is <b>${MA6V_word(n)}</b>?`, say: `Which number is ${MA6V_word(n)}?`, vis: hw(MA6V_word(n)), opts: uniq(n, shuffle(near)), ans: String(n), big: 1, why: `${cap(MA6V_word(n))} is ${n}.`, key: "va" + n, v22: { k: "num", n } };
    return { q: `Which word means <b>${n}</b>?`, say: `Which word means ${n}?`, vis: eq(String(n)), opts: uniq(MA6V_word(n), shuffle(near).map(MA6V_word)), ans: MA6V_word(n), big: 1, why: `${n} is written ${MA6V_word(n)}.`, key: "vb" + n, v22: { k: "word", n } };
  }
  const n = 10 * R(2, 9);
  return { q: `Which is the right way to spell <b>${n}</b>?`, say: `Which is the right way to spell ${n}?`, vis: eq(String(n)), opts: shuffle([MA6V_word(n), ...MA6V_TMISS[n]]), ans: MA6V_word(n), big: 1, why: `${n} is spelled ${MA6V_word(n).split("").join("-")}.`, key: "vs" + n, v22: { k: "spell", n } };
});
MA6V_rule("numwords", (x, raw, p, t) => {
  if (x.k === "num") { if (p == null) return null; return `${p} is ${xQ(MA6V_word(p))}, not ${xQ(MA6V_word(x.n))}.`; }
  if (x.k === "word") { const v = MA6V_val(t); if (v == null) return null; return `${xQ(t)} is ${v}, not ${x.n}.`; }
  if (x.k === "spell") {
    const c = MA6V_word(x.n);
    if (t === "fourty") return `"Forty" has no "u", even though "four" does.`;
    if (t.length === c.length - 1) for (let i = 0; i < c.length; i++) if (c.slice(0, i) + c.slice(i + 1) === t) return `${xQ(t)} is missing the letter “${c[i]}”.`;
    if (t.length === c.length + 1) for (let i = 0; i < t.length; i++) if (t.slice(0, i) + t.slice(i + 1) === c) return `${xQ(t)} has an extra letter “${t[i]}”.`;
    return `${xQ(t)} isn't how ${x.n} is spelled. It sounds close, but the letters are wrong.`;
  }
  return null;
});

/* ---------- bonds: wholes to 20, pick the pair ---------- */
addBank(6, "math", "bonds", 0.45, () => {
  const k = R(0, 2);
  if (k === 0) {
    const whole = R(11, 20), a = R(whole - 10, 10), b = whole - a;
    return { q: "What is the missing part?", say: `The whole is ${whole}. One part is ${a}. What is the other part?`, vis: bondSVG(whole, a, "?") + tenframe(whole, "🔵", "⚪", a), opts: MA6V_nu(b, [b + 1, b - 1, whole, a], 0, 20), ans: String(b), big: 1, why: `${a} and ${b} make ${whole}.`, key: "v22p" + whole + "_" + a, v22: { k: "part", a, whole } };
  }
  if (k === 1) {
    const a = R(1, 10), b = R(Math.max(1, 11 - a), 10), whole = a + b;
    return { q: "What is the whole?", say: `The parts are ${a} and ${b}. What is the whole?`, vis: bondSVG("?", a, b), opts: MA6V_nu(whole, [whole + 1, whole - 1, Math.abs(a - b), whole + 10], 0, 30), ans: String(whole), big: 1, why: `${a} + ${b} = ${whole}.`, key: "v22w" + a + "_" + b, v22: { k: "whole", a, b } };
  }
  const T = R(5, 10), x = R(0, T), cands = [];
  for (let i = 0; i < 10 && cands.length < 6; i++) { const u = R(0, T), y = T + pick([-1, 1, -2, 2]) - u; if (y >= 0 && !cands.includes(`${u} and ${y}`)) cands.push(`${u} and ${y}`); }
  return { q: `Which two parts make <b>${T}</b>?`, say: `Which two parts make ${T}?`, vis: bondSVG(T, "?", "?"), opts: uniq(`${x} and ${T - x}`, cands), ans: `${x} and ${T - x}`, big: 1, why: `${x} + ${T - x} = ${T}, so ${x} and ${T - x} are parts of ${T}.`, key: "v22t" + x + "_" + T, v22: { k: "pair", T } };
});
MA6V_rule("bonds", (x, raw, p, t) => {
  if (x.k === "pair") { const m = t.match(/^(\d+) and (\d+)$/); return m ? `${m[1]} and ${m[2]} make ${+m[1] + +m[2]}, not ${x.T}.` : null; }
  if (p == null) return null;
  if (x.k === "part") return p === x.whole ? `${p} is the whole, not the missing part.` : `${x.a} and ${p} make ${x.a + p}, not ${x.whole}.`;
  if (x.k === "whole") {
    if (p === Math.abs(x.a - x.b) && p !== x.a + x.b) return `${p} is the difference. The whole is both parts put together.`;
    const d = p - (x.a + x.b); return `${p} is ${Math.abs(d)} ${MA6V_more(d)} than ${x.a} + ${x.b}.`;
  }
  return null;
});

/* ---------- ordinal: last in line, right behind, order words ---------- */
addBank(6, "math", "ordinal", 0.2, () => {
  const k = R(0, 3), n = R(4, 6), items = shuffle(LR_POOL).slice(0, n), o = e => `<span class="emo">${e}</span>`;
  const line = `<div class="race"><span class="flag">🏁<small>front</small></span>${items.map(e => `<span><span class="emo xl">${e}</span></span>`).join("")}</div>`;
  if (k === 0) {
    const ops = shuffle([items[n - 1], ...shuffle(items.slice(0, n - 1)).slice(0, 3)]).map(o);
    return { q: "Who is <b>last</b> in line?", say: "The front of the line is by the flag. Who is last in line?", vis: line, opts: ops, ans: o(items[n - 1]), sayAns: "the one at the back of the line", why: `The last one is at the back, farthest from the flag. It is ${ORDW[n - 1]}.`, key: "v22l" + items.join(), v22: { k: "last", items } };
  }
  if (k === 1) {
    const i = R(0, n - 2), ops = shuffle([items[i + 1], ...shuffle(items.filter((_, j) => j !== i + 1)).slice(0, 3)]).map(o);
    return { q: `Who is right <b>behind</b> the ${ORD[i]} one in line?`, say: `Counting from the front, by the flag, who is right behind the ${ORDW[i]} one?`, vis: line, opts: ops, ans: o(items[i + 1]), sayAns: `the ${ORDW[i + 1]} one`, why: `Right behind the ${ORDW[i]} one is the ${ORDW[i + 1]} one.`, key: "v22b" + items.join() + i, v22: { k: "behind", items, i } };
  }
  const i = R(0, 5), others = shuffle(range(0, 5).filter(j => j !== i)).slice(0, 3);
  if (k === 2) return { q: `Which word means <b>${ORD[i]}</b>?`, say: `Which word goes with ${ORDW[i]}, written with a number?`, vis: eq(ORD[i]), opts: shuffle([i, ...others]).map(j => ORDW[j]), ans: ORDW[i], big: 1, why: `${ORD[i]} is read as ${ORDW[i]}.`, key: "v22w" + i, v22: { k: "word", i } };
  return { q: `How do you write <b>${ORDW[i]}</b> with a number?`, say: `How do you write ${ORDW[i]} with a number?`, vis: hw(ORDW[i]), opts: shuffle([i, ...others]).map(j => ORD[j]), ans: ORD[i], big: 1, why: `${cap(ORDW[i])} is written ${ORD[i]}.`, key: "v22n" + i, v22: { k: "num", i } };
});
MA6V_rule("ordinal", (x, raw, p, t) => {
  if (x.k === "last" || x.k === "behind") {
    const e = (String(raw).match(/<span class="emo">(.*?)<\/span>/) || [])[1], j = x.items.indexOf(e); if (j < 0) return null;
    if (x.k === "last") return `Counting from the flag, ${e} is ${ORDW[j]}. Someone is still behind it.`;
    if (j === x.i) return `${e} is the ${ORDW[x.i]} one itself, not the one behind it.`;
    if (j < x.i) return `${e} is ${ORDW[j]}, in front of the ${ORDW[x.i]} one, not behind it.`;
    return `${e} is ${ORDW[j]}, farther back than right behind.`;
  }
  if (x.k === "word") { const j = ORDW.indexOf(t); return j < 0 ? null : `${xQ(t)} is ${ORD[j]}, not ${ORD[x.i]}.`; }
  if (x.k === "num") { const j = ORD.indexOf(t); return j < 0 ? null : `${t} is ${ORDW[j]}, not ${ORDW[x.i]}.`; }
  return null;
});

/* ---------- tally: tally charts ---------- */
const MA6V_TCH = [["Favorite pet", [["🐶", "dogs"], ["🐱", "cats"], ["🐰", "rabbits"], ["🐟", "fish"]]], ["Favorite fruit", [["🍎", "apples"], ["🍌", "bananas"], ["🍇", "grapes"], ["🍓", "strawberries"]]], ["Favorite color", [["🔴", "red"], ["🔵", "blue"], ["🟢", "green"], ["🟣", "purple"]]], ["Favorite season", [["🌸", "spring"], ["☀️", "summer"], ["🍂", "fall"], ["❄️", "winter"]]], ["Favorite treat", [["🧁", "cupcakes"], ["🍪", "cookies"], ["🍦", "ice cream"], ["🍉", "watermelon"]]]];
const MA6V_td = n => { const b = Math.floor(n / 5), s = n % 5; return [b ? `${b} bundle${b > 1 ? "s" : ""} of 5` : "", s ? `${s} single stick${s > 1 ? "s" : ""}` : ""].filter(Boolean).join(" and "); };
addBank(6, "math", "tally", 0.35, () => {
  const [title, all] = pick(MA6V_TCH), cats = shuffle(all).slice(0, 3), cs = shuffle(range(1, 12)).slice(0, 3);
  const vis = note(`<b>${title}</b>`) + table(cats.map((c, i) => [`<span class="emo">${c[0]}</span> ${c[1]}`, tally(cs[i])]), [title.replace("Favorite ", "").replace(/^./, m => m.toUpperCase()), "Votes"]);
  const lab = c => `<span class="emo">${c[0]}</span> ${c[1]}`, k = R(0, 3), sig = cats.map((c, i) => c[1] + cs[i]).join();
  if (k === 0) {
    const i = R(0, 2), n = cs[i];
    return { q: `How many votes did <b>${cats[i][1]}</b> get?`, say: `Look at the tally chart. How many votes did ${cats[i][1]} get?`, vis, opts: MA6V_nu(n, [n + 1, n - 1, n + 5, n - 5], 1, 20), ans: String(n), big: 1, why: `${cap(cats[i][1])} has ${MA6V_td(n)}, which is ${n}.`, key: "v22c" + sig + i, v22: { k: "how", n, name: cats[i][1] } };
  }
  if (k <= 2) {
    const most = k === 1, best = most ? Math.max(...cs) : Math.min(...cs), bi = cs.indexOf(best);
    return { q: `Which got the <b>${most ? "most" : "fewest"}</b> votes?`, say: `Look at the tally chart. Which got the ${most ? "most" : "fewest"} votes?`, vis, opts: shuffle(cats.map(lab)), ans: lab(cats[bi]), why: `${cap(cats[bi][1])} got ${best} vote${best === 1 ? "" : "s"}. That is the ${most ? "most" : "fewest"}.`, key: "v22m" + sig + most, v22: { k: "most", most, cats, cs } };
  }
  let [i, j] = shuffle([0, 1, 2]).slice(0, 2); if (cs[i] < cs[j]) [i, j] = [j, i];
  const d = cs[i] - cs[j];
  return { q: `How many more votes did <b>${cats[i][1]}</b> get than <b>${cats[j][1]}</b>?`, say: `Look at the tally chart. How many more votes did ${cats[i][1]} get than ${cats[j][1]}?`, vis, opts: MA6V_nu(d, [d + 1, d - 1, cs[i] + cs[j], cs[i]], 0, 25), ans: String(d), big: 1, why: `${cs[i]} − ${cs[j]} = ${d}.`, key: "v22d" + sig + i + j, v22: { k: "diff", a: cs[i], b: cs[j], d } };
});
MA6V_rule("tally", (x, raw, p, t) => {
  if (x.k === "most") {
    const i = x.cats.findIndex(c => t === `${c[0]} ${c[1]}` || t === c[1] || t.endsWith(" " + c[1])); if (i < 0) return null;
    return `${cap(x.cats[i][1])} got ${x.cs[i]} vote${x.cs[i] === 1 ? "" : "s"}, but another one got ${x.most ? "more" : "fewer"}.`;
  }
  if (p == null) return null;
  if (x.k === "how") return `${p} would be ${MA6V_td(p)}, but ${x.name} has ${MA6V_td(x.n)}.`;
  if (x.k === "diff") {
    if (p === x.a + x.b) return `${p} is both added together. "How many more" means take away.`;
    if (p === x.a) return `${p} is all the votes for one of them, not how many more.`;
    const d = p - x.d; return `${p} is ${Math.abs(d)} ${MA6V_more(d, 1)}. Match the marks and count the extras.`;
  }
  return null;
});

/* ---------- cubes: longest/shortest of three, how much longer ---------- */
addBank(6, "math", "cubes", 0.25, () => {
  const o = x => `<span class="emo" title="${x[1]}">${x[0]}</span> ${x[1]}`;
  if (Math.random() < 0.5) {
    const th = shuffle(LONGTHINGS).slice(0, 3), ls = shuffle(range(2, 9)).slice(0, 3), longest = Math.random() < 0.5, best = longest ? Math.max(...ls) : Math.min(...ls), bi = ls.indexOf(best);
    return { q: `Which is the <b>${longest ? "longest" : "shortest"}</b>?`, say: `Which is the ${longest ? "longest" : "shortest"}?`, vis: `<div class="col-c">${th.map((x, i) => `<span>${x[0]} ${x[1]}</span>${cubeMeasure(ls[i], x[2])}`).join("")}</div>`, opts: th.map(o), ans: o(th[bi]), why: `The ${th[bi][1]} is ${best} cubes, the ${longest ? "most" : "fewest"} of the three.`, key: "v" + th.map((x, i) => x[1] + ls[i]).join() + longest, v22: { k: "three", longest, th: th.map(x => x[1]), ls } };
  }
  const [a, b] = shuffle(LONGTHINGS).slice(0, 2), la = R(3, 9), lb = R(2, la - 1), d = la - lb;
  return { q: `How many cubes longer is the ${a[1]} than the ${b[1]}?`, vis: `<div class="col-c"><span>${a[0]} ${a[1]}</span>${cubeMeasure(la, a[2])}<span>${b[0]} ${b[1]}</span>${cubeMeasure(lb, b[2])}</div>`, opts: MA6V_nu(d, [d + 1, d - 1, la, lb, la + lb], 1, 18), ans: String(d), big: 1, why: `${la} − ${lb} = ${d}. The ${a[1]} is ${d} cubes longer.`, key: "vd" + a[1] + la + b[1] + lb, v22: { k: "diff", a: a[1], b: b[1], la, lb, d } };
});
MA6V_rule("cubes", (x, raw, p, t) => {
  if (x.k === "three") {
    const nm = (String(raw).match(/title="([^"]+)"/) || [])[1], i = x.th.indexOf(nm); if (i < 0) return null;
    return `The ${nm} is ${x.ls[i]} cubes, but another one is ${x.longest ? "longer" : "shorter"}.`;
  }
  if (x.k === "diff" && p != null) {
    if (p === x.la + x.lb) return `${p} is both lengths added together. "How much longer" means take away.`;
    if (p === x.la) return `${p} is how long the ${x.a} is, not how much longer.`;
    if (p === x.lb) return `${p} is how long the ${x.b} is, not how much longer.`;
    const d = p - x.d; return `${p} is ${Math.abs(d)} ${MA6V_more(d, 1)}. Count only the extra cubes.`;
  }
  return null;
});

