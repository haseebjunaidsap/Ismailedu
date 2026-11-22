/* =====================================================================
   Why a wrong pick is wrong: Age 7 · Logic
   sequence, panalogy, common, balance, robot, turns, riddles, truefalse,
   ifthen, calendar, coords
   ===================================================================== */

const LG7W_bText = h => (String(h).match(/<b>(.*?)<\/b>/g) || []).map(x => xPlain(x));
const LG7W_title = h => { const m = String(h).match(/title="([^"]+)"/); return m ? m[1] : ""; };
const LG7W_emo = h => { const m = String(h).match(/<span class="emo[^"]*"[^>]*>(.*?)<\/span>/); return m ? m[1] : xStrip(h); };
const LG7W_art = n => (/^[aeiou]/i.test(n) ? "an " : "a ") + n;

/* ---------- sequence ---------- */
const LG7W_seqText = o => xPlain(o);
const LG7W_findSeq = txt => SEQS.find(S => S.some(s => s[1] === txt));
whyRule(7, "logic", "sequence", (q, picked) => {
  const p = LG7W_seqText(picked), qt = xPlain(q.say || q.q);
  let m;
  if (/happens first\?/.test(qt) || /happens last\?/.test(qt)) {
    const S = LG7W_findSeq(xPlain(q.ans)); if (!S) return null;
    const j = S.findIndex(s => s[1] === p); if (j < 0) return null;
    if (/first/.test(qt)) { if (j === 0) return null; return `${xQ(cap(p))} happens after ${xQ(S[j - 1][1])}, so it can't be first.`; }
    if (j === S.length - 1) return null;
    return `${xQ(cap(p))} happens before ${xQ(S[j + 1][1])}, so it can't be last.`;
  }
  if ((m = qt.match(/^What comes right after (.+)\?$/))) {
    const cur = m[1], S = LG7W_findSeq(cur); if (!S) return null;
    const i = S.findIndex(s => s[1] === cur), j = S.findIndex(s => s[1] === p);
    if (j < 0) return LG7W_findSeq(p) ? `${xQ(cap(p))} is part of different steps, not this one.` : null;
    if (j < i) return `${xQ(cap(p))} happens before ${xQ(cur)}, not after it.`;
    if (j > i + 1) return `${xQ(cap(p))} comes later, after ${xQ(S[j - 1][1])}.`;
    return null;
  }
  return null;
});

/* ---------- panalogy ---------- */
const LG7W_PANAL_DIS = {
  "kitten|bone": "A bone is something a dog chews, not a baby dog.",
  "kitten|doghouse": "A doghouse is where a dog lives, not a baby dog.",
  "nest|honey": "Bees make honey, but they don't live in it.",
  "nest|flower": "Bees visit flowers, but they don't live in them.",
  "glove|hat": "You wear a hat on your head, not on your foot.",
  "glove|shoe lace": "A shoe lace ties a shoe; it doesn't cover your foot.",
  "day|star": "A star is a thing in the sky, not a time like day or night.",
  "day|cloud": "A cloud is a thing in the sky, not a time like day or night.",
  "swim|sing": "Some birds sing, but the link is how it moves: fish swim.",
  "swim|nest": "A nest is a bird's home, not how a bird moves.",
  "milk|feather": "A hen has feathers, but the link is food it gives us, like milk.",
  "milk|corn": "Hens eat corn, but they don't make it for us.",
  "write|paper": "Paper is a thing; the link is what the tool does, like write.",
  "write|draw": "You draw with a pencil, not with scissors.",
  "foot|hand": "You wear a cap on your head, not on your hand.",
  "foot|neck": "You wear a cap on your head, not on your neck.",
  "honey|hole": "A hole is where a rabbit hides, not food it eats.",
  "wool|hive": "A hive is where a bee lives, not something it makes.",
  "wool|flower": "Bees visit flowers, but they don't make them.",
  "banana|tail": "A tail is part of a mouse, not food it eats.",
  "banana|hole": "A hole is where a mouse hides, not food it eats.",
  "road|wheel": "A wheel is part of a train, not the path it rides on.",
  "road|station": "A station is where a train stops, not the path it rides on.",
  "umbrella|cloud": "A cloud doesn't keep the bright sun out of your eyes.",
  "umbrella|snow": "Snow is weather, not something that keeps the sun out.",
  "pan|butter": "You spread butter on bread, but butter doesn't cook it.",
  "pan|plate": "A plate holds food, but it doesn't cook the bread.",
  "grass|tree": "Pandas climb trees, but they don't eat them.",
  "goal|court": "A court is where you play, not what you shoot the ball into.",
  "egg|flower": "Bees visit flowers, but they don't make them.",
  "egg|wing": "Wings are part of a bee, not something it makes.",
  "bone|yarn": "Cats play with yarn, but they don't eat it.",
  "foot|sock": "A sock goes on a foot; a glove doesn't go on a sock.",
  "foot|arm": "A glove covers your hand, not your arm.",
  "night|star": "A star is a thing in the sky, not a time like night or day.",
  "night|cloud": "A cloud is a thing in the sky, not a time like night or day.",
  "drawing|nail": "A hammer hits a nail, but a nail isn't what you make.",
  "drawing|wood": "Wood is what you build with, not the thing you make.",
};
whyRule(7, "logic", "panalogy", (q, picked) => {
  const m = String(q.q).match(/<span>(.*?)<\/span><i>→<\/i><span>(.*?)<\/span><b>as<\/b><span>(.*?)<\/span>/); if (!m) return null;
  const [, a, b, c] = m, p = xPlain(picked);
  if (/^LGA/.test(q.key || "")) {
    const G = LGA_PANAL.find(G => G.some(x => x[0] === a && x[1] === b) && G.some(x => x[0] === c && x[1] === q.ans)); if (!G) return null;
    if (p === b) return `${xQ(p)} goes with ${a}, not with ${c}.`;
    const x = G.find(x => x[1] === p); if (!x || x[0] === c) return null;
    return `${x[4]}, so it goes with ${x[0]}, not ${c}.`;
  }
  const row = PANAL.find(r => r[2] === a && r[3] === b); if (!row || row[5] === row[2] || row[5] === "lock") return null;
  if (p === b) return `${xQ(p)} goes with ${a}, not with ${c}.`;
  return LG7W_PANAL_DIS[b + "|" + p] || null;
});

/* ---------- common ---------- */
// [name, plural?, rule indexes that are (or could be) true for it]
// rules: 0 fly, 1 red, 2 wheels, 3 cold, 4 water, 5 round, 6 hot, 7 music, 8 plants, 9 wear
const LG7W_CM = {
  "🐦": ["bird", 0, [0, 7]], "✈️": ["plane", 0, [0, 2]], "🦋": ["butterfly", 0, [0]], "🚁": ["helicopter", 0, [0, 2]], "🦅": ["eagle", 0, [0]], "🎈": ["balloon", 0, [0, 1, 5, 6]],
  "🍎": ["apple", 0, [1, 5, 8]], "🍓": ["strawberry", 0, [1, 8]], "🚒": ["fire truck", 0, [1, 2]], "🌹": ["rose", 0, [1, 8, 9]], "🍒": ["cherries", 1, [1, 5, 8]], "❤️": ["heart", 0, [1]],
  "🚗": ["car", 0, [1, 2]], "🚲": ["bike", 0, [2]], "🛒": ["cart", 0, [2]], "🚌": ["bus", 0, [2]], "🛴": ["scooter", 0, [2]], "🚂": ["train", 0, [2, 6]],
  "❄️": ["snowflake", 0, [0, 3]], "🍦": ["ice cream", 0, [3]], "🧊": ["ice", 0, [3]], "⛄": ["snowman", 0, [3, 5]], "🐧": ["penguin", 0, [3, 4]],
  "🐟": ["fish", 0, [4]], "🐙": ["octopus", 0, [1, 4]], "🐳": ["whale", 0, [4, 7]], "🦀": ["crab", 0, [1, 4]], "🐬": ["dolphin", 0, [4]], "🦈": ["shark", 0, [4]],
  "⚽": ["soccer ball", 0, [5]], "🍊": ["orange", 0, [5, 8]], "🌕": ["moon", 0, [3, 5, 6]], "🏀": ["basketball", 0, [5]], "🍩": ["donut", 0, [5]], "🔴": ["red circle", 0, [1, 5]],
  "🔥": ["fire", 0, [1, 6]], "☀️": ["sun", 0, [5, 6]], "☕": ["coffee", 0, [6, 8]], "🌶️": ["pepper", 0, [1, 6, 8]], "🌋": ["volcano", 0, [1, 6]],
  "🎸": ["guitar", 0, [7]], "🥁": ["drum", 0, [1, 5, 7]], "🎺": ["trumpet", 0, [7]], "🎹": ["piano", 0, [7]], "🎻": ["violin", 0, [7]],
  "🌽": ["corn", 0, [8]], "🍇": ["grapes", 1, [5, 8]], "🥕": ["carrot", 0, [8]], "🌻": ["sunflower", 0, [5, 8]], "🍅": ["tomato", 0, [1, 5, 8]],
  "👕": ["shirt", 0, [1, 9]], "🧢": ["cap", 0, [1, 9]], "👟": ["shoe", 0, [1, 9]], "🧣": ["scarf", 0, [1, 9]], "👓": ["glasses", 1, [5, 9]], "🧤": ["gloves", 1, [9]],
};
// for "are cold" / "are hot", only clearly hot / clearly cold things count as counter-examples
const LG7W_NOTCOLD = ["🔥", "☀️", "☕", "🌶️", "🌋", "🚒", "🚂", "🎸", "🥁", "🎺", "🎹", "🎻", "⚽", "🏀", "🔴", "❤️", "🌻", "🌹", "🎈"];
const LG7W_NOTHOT = ["❄️", "🍦", "🧊", "⛄", "🎸", "🥁", "🎺", "🎹", "🎻", "⚽", "🏀", "🛒", "🛴", "🚲", "❤️"];
const LG7W_CM_RULES = COMMON.map(c => c[0]);
const LG7W_cmNeg = (i, nm, pl) => {
  const S = cap("the " + nm), be = pl ? "are" : "is", d = pl ? "do" : "does", h = pl ? "have" : "has";
  return [`${S} can't fly`, `${S} ${be} not red`, `${S} ${h} no wheels`, `${S} ${be} not cold`, `${S} ${d} not live in water`, `${S} ${be} not round`, `${S} ${be} not hot`, `${S} can't make music`, `${S} ${d} not grow on a plant`, `You can't wear the ${nm}`][i];
};
whyRule(7, "logic", "common", (q, picked) => {
  const r = xPlain(picked).replace(/^They /, ""), i = LG7W_CM_RULES.indexOf(r); if (i < 0) return null;
  const shown = [...String(q.vis || "").matchAll(/<span class="emo xl">(.*?)<\/span>/g)].map(x => x[1]);
  for (const e of shown) { const d = LG7W_CM[e]; if (i === 3 && !LG7W_NOTCOLD.includes(e)) continue; if (i === 6 && !LG7W_NOTHOT.includes(e)) continue; if (d && !d[2].includes(i)) return `${LG7W_cmNeg(i, d[0], d[1])}, so ${r === "can be worn" ? "you can't wear all three" : "not all three " + r}.`; }
  return null;
});

/* ---------- balance ---------- */
whyRule(7, "logic", "balance", (q, picked) => {
  const p = LG7W_title(picked), askHeavy = /heavier/.test(q.q); if (!p) return null;
  const names = q.opts.map(LG7W_title), other = names.find(n => n !== p); if (!other) return null;
  const m = String(q.why).match(/The (.+?) side goes (down|up)/); if (!m) return null;
  const heavy = m[2] === "down" ? m[1] : names.find(n => n !== m[1]);
  const be = /^(books|grapes)$/.test(p) ? "are" : "is";
  if (askHeavy && p !== heavy) return `The ${p} side goes up, so the ${p} ${be} lighter.`;
  if (!askHeavy && p === heavy) return `The ${p} side goes down, so the ${p} ${be} heavier.`;
  return null;
});

/* ---------- robot ---------- */
const LG7W_BN = { "🍎": "apple", "⭐": "star", "🎈": "balloon", "🍌": "banana", "🧁": "cupcake", "⚽": "soccer ball", "🌼": "flower", "🍓": "strawberry" };
whyRule(7, "logic", "robot", (q, picked) => {
  const m = xPlain(q.say || "").match(/Follow the arrows: (.+?)\. Where/); if (!m) return null;
  const path = m[1].split(", ").map(s => s.trim());
  const cells = String(q.vis).split('<span class="bcell">').slice(1).map(c => { const e = c.match(/<span class="emo">(.*?)<\/span>/); return e ? e[1] : ""; });
  if (cells.length !== 16) return null;
  const ri = cells.indexOf("🤖"), pe = LG7W_emo(picked), pi = cells.indexOf(pe); if (ri < 0 || pi < 0) return null;
  let r = Math.floor(ri / 4), c = ri % 4; const seen = [];
  for (const d of path) { if (!DIRS[d]) return null; r += DIRS[d][0]; c += DIRS[d][1]; seen.push(r * 4 + c); }
  const nm = LG7W_BN[pe] || "picture", pr = Math.floor(pi / 4), pc = pi % 4;
  if (pi === r * 4 + c) return null;
  if (seen.slice(0, -1).includes(pi)) return `The robot goes past the ${nm}, but it keeps moving and doesn't stop there.`;
  const dr = pr - r, dc = pc - c, bits = [];
  if (dr) bits.push(`${Math.abs(dr)} square${Math.abs(dr) > 1 ? "s" : ""} ${dr < 0 ? "up" : "down"}`);
  if (dc) bits.push(`${Math.abs(dc)} square${Math.abs(dc) > 1 ? "s" : ""} ${dc < 0 ? "left" : "right"}`);
  return `The ${nm} is ${bits.join(" and ")} from where the arrows end.`;
});

/* ---------- turns ---------- */
const LG7W_TURNK = { "a quarter turn to the right (clockwise)": 1, "a quarter turn to the right": 1, "a quarter turn to the left": -1, "a half turn": 2, "three quarter turns to the right": 3, "two quarter turns to the left": -2, "a full turn": 4 };
const LG7W_TNAME = d => ({ 1: "a quarter turn to the right", 2: "a half turn", 3: "a quarter turn to the left" })[((d % 4) + 4) % 4];
whyRule(7, "logic", "turns", (q, picked) => {
  const B = LG7W_bText(q.q), dirName = h => LG7W_title(h).replace(/^pointing /, "");
  const isD = n => LGA_DIAG.some(x => x[1] === n), list = n => (isD(n) ? LGA_DIAG : ARROWS).map(x => x[1]);
  const qt = xPlain(q.q).replace(/\s+([,?.])/g, "$1");
  if (/What turn did it make\?/.test(qt)) {
    const [s, e] = B, L = list(s), si = L.indexOf(s); if (si < 0) return null;
    const p = xPlain(picked), k = LG7W_TURNK[p]; if (k == null) return null;
    const to = L[(si + k + 8) % 4];
    if (k === 4) return `A full turn would bring it back to ${s}, not to ${e}.`;
    return `${cap(p)} from ${s} would point ${to}, not ${e}.`;
  }
  const pn = dirName(picked); if (!pn) return null;
  if (/Where was it pointing before\?/.test(qt)) {
    const [w, s] = B, k = LG7W_TURNK[w], L = list(s); if (k == null || L.indexOf(pn) < 0) return null;
    const after = L[(L.indexOf(pn) + k + 8) % 4];
    return `If it pointed ${pn} before, after ${w} it would point ${after}, not ${s}.`;
  }
  if (B.length === 3) { // two turns
    const [s, w1, w2] = B, L = list(s), si = L.indexOf(s), pi = L.indexOf(pn); if (si < 0 || pi < 0) return null;
    const d = pi - si;
    if (((d % 4) + 4) % 4 === 0) return `${cap(pn)} is where it started, and these two turns don't bring it back.`;
    return `Pointing ${pn} is ${LG7W_TNAME(d)} from ${s}, but these two turns add up to something else.`;
  }
  if (B.length === 2) {
    const [s, w] = B, L = list(s), si = L.indexOf(s), pi = L.indexOf(pn); if (si < 0 || pi < 0 || LG7W_TURNK[w] == null) return null;
    const d = pi - si;
    if (((d % 4) + 4) % 4 === 0) return `Pointing ${pn} again would need a full turn, not ${w}.`;
    const tn = LG7W_TNAME(d); if (tn === w) return null;
    return `Going from ${s} to ${pn} is ${tn}, not ${w}.`;
  }
  return null;
});

/* ---------- riddles ---------- */
// key clue for each answer, as a verb phrase; [phrase, names to skip because the clue might fit them too]
const LG7W_RK = {
  dog: ["say woof"], banana: ["be a yellow fruit"], sun: ["light up the daytime sky"], bee: ["make honey"], shoe: ["be something you wear on your feet"],
  snow: ["fall from the sky in winter"], elephant: ["have a trunk"], toothbrush: ["help you brush your teeth"], clock: ["tell the time"], book: ["have pages you read"],
  umbrella: ["keep you dry in the rain"], turtle: ["have a shell"], piano: ["have keys for playing music"], kangaroo: ["have a pouch"], bike: ["have pedals"],
  sponge: ["help wash dishes"], giraffe: ["have a long neck"], star: ["twinkle at night"], zebra: ["have black and white stripes"], "soccer ball": ["be a ball you kick"],
  carrot: ["be an orange vegetable"], octopus: ["have eight arms"], owl: ["hoot at night"], "ice cream": ["be a cold, sweet treat"], airplane: ["fly people on trips"],
  lion: ["be called the king of the jungle"],
  // bank: animals
  cow: ["say moo"], pig: ["say oink"], sheep: ["say baa"], duck: ["say quack"], panda: ["eat bamboo"], flamingo: ["be a pink bird"], camel: ["have a hump"],
  penguin: ["be a black and white bird that swims"], frog: ["say ribbit"], monkey: ["swing in trees"], mouse: ["squeak", ["bat", "hedgehog"]], spider: ["spin a web"],
  ladybug: ["be a red bug with black spots"], butterfly: ["grow from a caterpillar"], whale: ["spray water out of a blowhole", ["dolphin"]], rhino: ["have a horn on the nose"],
  bat: ["sleep upside down"], rooster: ["crow in the morning"], snail: ["leave a slimy trail"], crab: ["walk sideways"], snake: ["slither", ["snail"]],
  tiger: ["have orange fur with black stripes"], crocodile: ["have a long snout full of teeth", ["dolphin"]], squirrel: ["hide acorns"],
  bear: ["sleep all winter", ["hedgehog", "bat", "frog", "snake", "snail", "ladybug", "butterfly", "ant", "squirrel", "spider", "crocodile"]],
  fish: ["live in a fish bowl"], rabbit: ["have a fluffy cotton tail"], cat: ["purr", ["tiger"]], hedgehog: ["be covered in prickly spines"], ant: ["live in an anthill"],
  dolphin: ["jump out of the waves and click", ["whale", "fish"]], unicorn: ["be make-believe"],
  // bank: nature
  sunflower: ["turn to face the sun"], cactus: ["grow in the desert"], tree: ["have branches and lots of leaves"], moon: ["change from round to thin"],
  rainbow: ["have stripes of many colors"], cloud: ["be white and fluffy", ["snowman"]], fire: ["crackle in a campfire"], rain: ["make puddles", ["snowman", "cloud"]], snowman: ["have a carrot nose"],
  // bank: things
  kite: ["need wind to fly"], balloon: ["pop with a bang"], "teddy bear": ["be a toy you hug at bedtime"], basketball: ["go through a hoop"], "tennis ball": ["be a ball you hit with a racket"],
  guitar: ["have strings you strum"], drum: ["be played with sticks"], trumpet: ["go toot"], broom: ["sweep the floor"], scissors: ["have two blades"],
  pencil: ["have an eraser"], chair: ["be something you sit on", ["bed"]], bed: ["be where you sleep at night"], cap: ["keep the sun out of your eyes", ["glasses"]],
  gloves: ["go on your hands"], scarf: ["wrap around your neck"], glasses: ["help people see better", ["flashlight"]], phone: ["let you talk to people far away"],
  key: ["open locks"], castle: ["have tall towers"], flashlight: ["shine a bright light in the dark", ["candle", "phone"]], candle: ["have a flame"],
  letter: ["go in an envelope"], watch: ["go on your wrist"], soap: ["wash dirt off your hands"], present: ["have a bow on top"],
  // bank: vehicles
  "school bus": ["be big and yellow"], rocket: ["zoom up into space"], train: ["run on tracks"], helicopter: ["have spinning blades on top"], sailboat: ["have a sail"], "fire truck": ["carry firefighters"],
  // bank: food
  strawberry: ["have tiny seeds on the outside"], watermelon: ["be green outside and red inside"], grapes: ["grow in bunches"], lemon: ["be a sour yellow fruit"],
  popcorn: ["pop in a pan", ["corn"]], pizza: ["have cheese and sauce on top"], donut: ["have a hole in the middle"], cookie: ["have chocolate chips", ["cake", "donut"]],
  corn: ["have kernels on a cob"], broccoli: ["look like a tiny tree"], egg: ["come from a hen"], cake: ["have candles on top on your birthday"],
  honey: ["come from bees"], milk: ["come from cows", ["pizza"]], orange: ["have the same name as its color"], onion: ["make your eyes water", ["lemon"]],
};
const LG7W_subj = name => {
  const L = LGA_RIDDLES.find(r => r[2] === name);
  if (L) { const a = L[3]; return a === "pl" ? [cap(name), 1] : a === "" ? [cap(name), 0] : [cap(a + " " + name), 0]; }
  if (name === "sun") return ["The sun", 0];
  if (name === "snow" || name === "ice cream") return [cap(name), 0];
  return [cap(LG7W_art(name)), 0];
};
const LG7W_neg = (subj, pl, ph) => {
  let m;
  if ((m = ph.match(/^be (.*)$/))) return `${subj} ${pl ? "are" : "is"} not ${m[1]}`;
  if ((m = ph.match(/^can (.*)$/))) return `${subj} can't ${m[1]}`;
  return `${subj} ${pl ? "do" : "does"} not ${ph}`;
};
whyRule(7, "logic", "riddles", (q, picked) => {
  const ansName = LG7W_title(q.ans), p = LG7W_title(picked); if (!ansName || !p || p === ansName) return null;
  const K = LG7W_RK[ansName]; if (!K) return null;
  if (K[1] && K[1].includes(p)) return null;
  const [s, pl] = LG7W_subj(p);
  return LG7W_neg(s, pl, K[0]) + ".";
});

/* ---------- truefalse ---------- */
whyRule(7, "logic", "truefalse", (q, picked) => {
  const qt = xPlain(q.q), pT = /^True/.test(xPlain(picked)); let m;
  if ((m = qt.match(/There are (more|fewer) (.+?) than (.+?)\.$/))) {
    const w = String(q.why).match(/^There are (\d+) .+ and (\d+) .+\.$/); if (!w) return null;
    const a = +w[1], b = +w[2], [, mf, t1] = m;
    if (pT) return a < b ? `${a} is less than ${b}, so there are fewer ${t1}, not more.` : `${a} is more than ${b}, so there are more ${t1}, not fewer.`;
    return `${a} is ${a > b ? "more" : "less"} than ${b}, so the sentence is right.`;
  }
  if ((m = qt.match(/All of these are (.+?)\.$/))) {
    const ca = m[1], items = [...String(q.vis || "").matchAll(/<span class="emo xl">(.*?)<\/span>/g)].map(x => x[1]);
    const G = LCATS[ca]; if (!G) return null;
    if (pT) {
      const odd = items.find(e => !G.some(x => x[0] === e)); if (!odd) return null;
      const oc = LCAT_KEYS.find(k => LCATS[k].some(x => x[0] === odd)), on = LCATS[oc].find(x => x[0] === odd)[1];
      if ((ca === "animals" || ca === "furry animals") && (oc === "sea animals" || oc === "bugs")) return null;
      return `The ${on} is not one of the ${ca}, so not all of them are.`;
    }
    const ns = items.map(e => (G.find(x => x[0] === e) || [])[1]); if (ns.some(n => !n)) return null;
    return `The ${ns.slice(0, -1).join(", ")} and ${ns[ns.length - 1]} are all ${ca}, so it is true.`;
  }
  if ((m = qt.match(/There are (\d+) (.+?)\.$/))) {
    const w = String(q.why).match(/there are (\d+)\./); if (!w) return null;
    const said = +m[1], n = +w[1], t = m[2];
    if (pT) { if (said === n) return null; return `${said} is one too ${said > n ? "many" : "few"}; count the ${t} again.`; }
    if (said !== n) return null;
    return `There really are ${n} ${t}, so the sentence is right.`;
  }
  return null;
});

/* ---------- ifthen ---------- */
const LG7W_lcFirst = s => /^(The|We|It|It's|There|There's|Cars|Everyone|Recess|School)\b/.test(s) ? s[0].toLowerCase() + s.slice(1) : s;
const LG7W_shapeOf = h => {
  const f = String(h).match(/fill="(#[0-9A-Fa-f]{6})"/), col = f && COLNAME[f[1]]; if (!col) return null;
  let sh = null;
  if (/<circle/.test(h)) sh = "circle"; else if (/<rect/.test(h)) sh = "square";
  else { const pm = String(h).match(/<polygon points="([^"]+)"/); if (pm) { const n = pm[1].trim().split(/\s+/).length; sh = n === 3 ? "triangle" : n === 6 ? "hexagon" : null; } }
  return sh ? [sh, col] : null;
};
whyRule(7, "logic", "ifthen", (q, picked) => {
  const qt = xPlain(q.q);
  if (/^Use the rule/.test(qt)) {
    const m = xPlain(q.say || "").match(/^Rule: (.+?) Fact: (.+?) What happens\?$/); if (!m) return null;
    const p = xPlain(picked).replace(/\.$/, ""), rule = m[1].toLowerCase();
    if (rule.includes(p.toLowerCase())) return null;
    return `The rule never says ${LG7W_lcFirst(p)}.`;
  }
  const s = LG7W_shapeOf(picked); if (!s) return null;
  const [sh, col] = s, B = LG7W_bText(q.q), want = B[0], byShape = LSHAPES.includes(want), not = /does not go in the box/.test(qt);
  if (!want) return null;
  if (!not) {
    if (byShape) return sh === want ? null : `The ${col} ${sh} is not a ${want}, so it stays out.`;
    return col === want ? null : `The ${sh} is ${col}, not ${want}, so it stays out.`;
  }
  if (byShape) return sh === want ? `The ${col} ${sh} is a ${want}, so it does go in the box.` : null;
  return col === want ? `The ${sh} is ${want}, so it does go in the box.` : null;
});

/* ---------- calendar ---------- */
const LG7W_di = n => DAYS.indexOf(n);
const LG7W_days = n => `${n} day${n === 1 ? "" : "s"}`;
const LG7W_calRel = (p, ref, need) => { // need = signed offset from ref to the answer
  const pi = LG7W_di(p), ri = LG7W_di(ref); if (pi < 0 || ri < 0 || !need) return null;
  if (pi === ri) return `${p} is the day you start from; you need to count ${LG7W_days(Math.abs(need))} ${need > 0 ? "after" : "before"} it.`;
  const f = need > 0 ? (pi - ri + 7) % 7 : (ri - pi + 7) % 7;
  if (f >= 4) return `${p} comes ${7 - f === 1 ? "the day" : LG7W_days(7 - f)} ${need > 0 ? "before" : "after"} ${ref}, not ${need > 0 ? "after" : "before"} it.`;
  return `${p} is ${LG7W_days(f)} ${need > 0 ? "after" : "before"} ${ref}, not ${Math.abs(need)}.`;
};
whyRule(7, "logic", "calendar", (q, picked) => {
  const qt = xPlain(q.q).replace(/\s+([,?.])/g, "$1"), p = xPlain(picked); let m;
  if ((m = qt.match(/^How many days after (\w+) is the next (\w+)\?$/))) {
    const k = +p, t = LG7W_di(m[1]); if (!Number.isInteger(k) || t < 0) return null;
    const d = DAYS[(t + k) % 7];
    if (k === 0) return `0 days after ${m[1]} is still ${m[1]}, not ${m[2]}.`;
    return `${LG7W_days(k)} after ${m[1]} is ${d}, not ${m[2]}.`;
  }
  if (LG7W_di(p) < 0) return null;
  if ((m = qt.match(/^If today is (\w+), what day is tomorrow\?$/))) return LG7W_calRel(p, m[1], 1);
  if ((m = qt.match(/^If today is (\w+), what day was yesterday\?$/))) return LG7W_calRel(p, m[1], -1);
  if ((m = qt.match(/^If today is (\w+), what day will it be in (\d+) days\?$/))) return LG7W_calRel(p, m[1], +m[2]);
  if ((m = qt.match(/^If today is (\w+), what day was it (\d+) days ago\?$/))) return LG7W_calRel(p, m[1], -m[2]);
  if ((m = qt.match(/^If tomorrow is (\w+), what day is today\?$/))) return LG7W_calRel(p, m[1], -1);
  if ((m = qt.match(/^If yesterday was (\w+), what day is today\?$/))) return LG7W_calRel(p, m[1], 1);
  if ((m = qt.match(/^If yesterday was (\w+), what day is tomorrow\?$/))) return LG7W_calRel(p, m[1], 2);
  if ((m = qt.match(/^If tomorrow is (\w+), what day was yesterday\?$/))) return LG7W_calRel(p, m[1], -2);
  if ((m = qt.match(/^If today is (\w+), what day is the day after tomorrow\?$/))) return LG7W_calRel(p, m[1], 2);
  if ((m = qt.match(/^If today is (\w+), what day was the day before yesterday\?$/))) return LG7W_calRel(p, m[1], -2);
  if ((m = qt.match(/^What day comes between (\w+) and (\w+)\?$/))) {
    if (p === m[1] || p === m[2]) return `${p} is one of the two days named, not the day between them.`;
    return `${p} is not between ${m[1]} and ${m[2]} in the week.`;
  }
  return null;
});

/* ---------- coords ---------- */
const LG7W_GP = { "🍎": "apple", "⭐": "star", "🐶": "dog", "🚗": "car", "🌼": "flower", "🎈": "balloon", "🐟": "fish", "⚽": "soccer ball", "🍦": "ice cream", "🏠": "house", "🐱": "cat", "🌙": "moon" };
const LG7W_grid = vis => {
  const out = {}, body = String(vis).replace(/^<div class="cgrid"><span><\/span>(<b>[A-D]<\/b>)+/, "");
  let row = 0, col = 0;
  for (const t of body.matchAll(/<b>([1-4])<\/b>|<span>(?:<span class="emo">(.*?)<\/span>)?<\/span>/g)) {
    if (t[1]) { row = +t[1]; col = 0; continue; }
    if (!row) return null;
    out["ABCD"[col] + row] = t[2] || ""; col++;
  }
  return Object.keys(out).length === 16 ? out : null;
};
whyRule(7, "logic", "coords", (q, picked) => {
  const g = LG7W_grid(q.vis); if (!g) return null;
  const qt = String(q.q); let m;
  if ((m = qt.match(/What is at <b>([A-D][1-4])<\/b>/))) {
    const e = LG7W_emo(picked), at = Object.keys(g).find(k => g[k] === e); if (!at || at === m[1]) return null;
    return `The ${LG7W_GP[e] || "picture"} is at ${at}, not ${m[1]}.`;
  }
  if ((m = qt.match(/Where is <span class="emo">(.*?)<\/span>/))) {
    const sp = xPlain(picked); if (!(sp in g)) return null;
    const want = LG7W_GP[m[1]] || "picture", here = g[sp];
    if (here === m[1]) return null;
    if (!here) return `${sp} is an empty square; the ${want} isn't there.`;
    return `${sp} has the ${LG7W_GP[here] || "other picture"}, not the ${want}.`;
  }
  return null;
});

/* ---------- numriddles ---------- */
const LG7W_rel = (p, x) => p > x ? `${p} is ${p - x} more than ${x}` : p < x ? `${p} is ${x - p} less than ${x}` : `${p} is ${x} itself`;
whyRule(7, "logic", "numriddles", (q, picked) => {
  const t = xPlain(q.say || "").replace(/\s*Who am I\?$/, ""), p = +xPlain(picked); let m;
  if (!Number.isInteger(p) || String(p) !== xPlain(picked)) return null;
  if ((m = t.match(/^I am (\d+) more than (\d+)\.$/))) return `${LG7W_rel(p, +m[2])}, but the riddle says ${m[1]} more.`;
  if ((m = t.match(/^I am (\d+) less than (\d+)\.$/))) return `${LG7W_rel(p, +m[2])}, but the riddle says ${m[1]} less.`;
  if ((m = t.match(/^I am the number between (\d+) and (\d+)\.$/))) return p === +m[1] || p === +m[2] ? `${p} is one of the two end numbers, not the one between them.` : `${p} is not between ${m[1]} and ${m[2]}.`;
  if ((m = t.match(/^I am double (\d+)\.$/))) return p % 2 ? `${p} is odd, so it can't be double a whole number.` : `${p} is double ${p / 2}, not double ${m[1]}.`;
  if ((m = t.match(/^If you add 5 to me, you get (\d+)\.$/))) return `${p} + 5 is ${p + 5}, not ${m[1]}.`;
  if ((m = t.match(/^I come right before (\d+)\.$/))) { const y = +m[1]; return p >= y ? (p === y ? `${p} is ${y} itself, not the number before it.` : `${p} comes after ${y}, not before it.`) : `${p} is ${y - p} less than ${y}, not just 1 less.`; }
  if ((m = t.match(/^I am (odd|even) and between (\d+) and (\d+), but not (\d+)\.$/))) {
    const [, par, a, b, no] = m, pp = p % 2 ? "odd" : "even";
    if (pp !== par) return `${p} is ${pp}, but the riddle says ${par}.`;
    if (p <= +a || p >= +b) return `${p} is not between ${a} and ${b}.`;
    if (p === +no) return `The riddle says the number is not ${no}.`;
    return null;
  }
  return null;
});

