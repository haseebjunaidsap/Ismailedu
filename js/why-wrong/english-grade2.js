/* =====================================================================
   Why a wrong pick is wrong: Age 7 English (digraphs, magice, nounverb, plurals,
   punct, blends, vteams, syllables, sentences, bossyr, ing, silent).
   ===================================================================== */
const EN7W_word = q => { const m = xPlain(q.say || "").match(/the word ([A-Za-z]+)\?/); return m ? m[1] : null; };
const EN7W_b = (q, re) => { const m = (q.q || "").match(re); return m ? m[1] : null; };
const EN7W_suffix = q => { const m = String(q.vis || "").match(/class="blank">_+<\/span>([a-z]*)/); return m ? m[1] : null; };
const EN7W_VOW = "aeiou";
const EN7W_isV = c => EN7W_VOW.includes(c);

/* ---------------- Letter teams (digraphs) ---------------- */
const EN7W_DSND = { sh: "sh", ch: "ch", th: "th", wh: "w" };
const EN7W_DREF = { sh: "ship", ch: "cheese", th: "thumb", wh: "whale" };
whyRule(7, "english", "digraphs", (q, picked) => {
  const p = xPlain(picked).trim(), qt = q.q || "";
  if (/^Which letter team/.test(qt)) {
    const w = EN7W_word(q), t = q.ans;
    if (!w || !EN7W_DSND[p] || !EN7W_DSND[t] || !w.includes(t)) return null;
    return `${p} makes the ${EN7W_DSND[p]} sound, as in “${EN7W_DREF[p]}”, but “${w}” has the ${EN7W_DSND[t]} sound.`;
  }
  const t = EN7W_b(q, /has the <b>(sh|ch|th|wh)<\/b> sound/);
  if (t) {
    const has = ["sh", "ch", "th", "wh"].filter(d => p.includes(d));
    if (!has.length || has.includes(t) || (t === "wh" && p.includes("w"))) return null;
    if (has.length > 1) return `“${p}” has ${has.join(" and ")}, but not the ${t} sound of “${EN7W_DREF[t]}”.`;
    return `“${p}” has the ${EN7W_DSND[has[0]]} sound${has[0] === "wh" ? " (wh)" : ""}, not the ${t} sound of “${EN7W_DREF[t]}”.`;
  }
  return null;
});

/* ---------------- Magic E ---------------- */
const EN7W_magic = () => [...MAGIC, ...(typeof EN7_MAGIC !== "undefined" ? EN7_MAGIC : [])];
whyRule(7, "english", "magice", (q, picked) => {
  const p = xPlain(picked).trim(), all = EN7W_magic(), qt = q.q || "";
  const shortOf = l => (all.find(m => m[1] === l) || [])[0], longOf = s => (all.find(m => m[0] === s) || [])[1];
  let s = EN7W_b(q, /Add a magic E to <b>([a-z]+)<\/b>/);
  if (s) {
    if (p === s) return `“${s}” is the same word with no e added.`;
    if (p === s + s.slice(-1)) return `“${p}” doubles the ${s.slice(-1)} instead of adding an e.`;
    if (s.length === 3 && p === s[0] + s[1] + s[1] + s[2]) return `“${p}” doubles the ${s[1]} instead of adding an e.`;
    const o = shortOf(p);
    if (o && o !== s) return `“${p}” comes from “${o}” + e, not “${s}” + e.`;
    return null;
  }
  const l = EN7W_b(q, /Take the magic E off <b>([a-z]+)<\/b>/);
  if (l) {
    s = shortOf(l);
    if (p === l) return `“${l}” still has the magic E on the end.`;
    if (s && p === s + s.slice(-1)) return `“${p}” adds an extra ${s.slice(-1)}; just take off the e.`;
    const o = longOf(p);
    if (o && o !== l) return `“${p}” comes from taking the e off “${o}”, not “${l}”.`;
    return null;
  }
  if (/has a <b>long<\/b> vowel/.test(qt)) {
    if (!longOf(p)) return null;
    const v = [...p].reverse().find(EN7W_isV);
    return v ? `“${p}” has a short ${v} sound, and it has no magic E at the end.` : null;
  }
  return null;
});

/* ---------------- Nouns & verbs ---------------- */
const EN7W_PERSON = new Set(["teacher", "girl", "baby", "sister", "brother", "grandma", "Grandma", "farmer", "boy", "Dad", "Sam", "clown", "chef"]);
const EN7W_PLACE = new Set(["school", "farm", "kitchen", "ocean", "mountain", "river", "city", "zoo", "beach", "library", "island", "lake", "house", "castle", "pond"]);
const EN7W_ANIMAL = new Set(["dog", "bird", "lion", "tiger", "rabbit", "kitten", "puppy", "giraffe", "cat", "frog", "horse", "owl", "bee", "duck", "mouse", "whale", "pig", "bear"]);
const EN7W_kind = w => EN7W_PERSON.has(w) ? "a person" : EN7W_PLACE.has(w) ? "a place" : EN7W_ANIMAL.has(w) ? "an animal" : "a thing";
const EN7W_ADV = new Set(["high", "loudly", "softly", "quickly"]);
whyRule(7, "english", "nounverb", (q, picked) => {
  const p = xPlain(picked).trim(), qt = q.q || "";
  const nouns = new Set([...NOUNS, ...(typeof EN7_NOUNS !== "undefined" ? EN7_NOUNS : [])]);
  const verbs = new Set([...VERBS, ...(typeof EN7_VERBS !== "undefined" ? EN7_VERBS : []), ...(typeof EN7_PUREV !== "undefined" ? EN7_PUREV : [])]);
  const adjs = new Set([...ADJS, ...(typeof EN7_ADJS !== "undefined" ? EN7_ADJS : [])]);
  const sm = qt.match(/<div class="sentence">(.*?)<\/div>/);
  if (sm) {
    const s = sm[1], ws = s.replace(/[.,!?"]/g, "").split(" "), wantVerb = /the <b>verb<\/b>/.test(qt);
    const row = [...NV_S.map(x => [x[0], null, x[1]]), ...(typeof EN7_NVS !== "undefined" ? EN7_NVS : [])].find(x => x[0] === s);
    if (!row) return null;
    if (!ws.includes(p)) return `“${p}” isn't one of the words in this sentence.`;
    const verb = row[2], i = ws.indexOf(p);
    const isAdv = EN7W_ADV.has(p) || (p === "fast" && ws[i - 1] === verb);
    if (p === verb) return wantVerb ? null : `“${p}” is the action, a verb; it doesn't name anyone or anything.`;
    if (isAdv) return wantVerb ? `“${p}” tells more about the action; it isn't the action word.` : `“${p}” tells more about the action; it doesn't name anything.`;
    const isAdj = adjs.has(p) || ["tiny", "little", "silly", "sleepy", "busy", "tired", "noisy", "small", "yellow", "old", "gray", "bright", "playful", "fast", "quiet", "proud", "cute", "hungry", "fluffy", "shiny", "cold", "happy", "big", "red"].includes(p);
    if (isAdj && ws[i + 1] && i + 1 < ws.length) return wantVerb ? `“${p}” tells what the ${ws[i + 1]} is like; it isn't an action.` : `“${p}” is a describing word; it tells what something is like.`;
    if (wantVerb && (nouns.has(p) || EN7W_kind(p) !== "a thing" || ["bed", "dinner", "hands", "ball", "hay", "wind", "robot", "bus", "clock", "sun"].includes(p))) return `“${p}” is a noun; it names ${EN7W_kind(p)}, not an action.`;
    return null;
  }
  if (/a <b>noun<\/b>/.test(qt)) {
    if (verbs.has(p)) return `“${p}” is an action, something you do, not a person, place or thing.`;
    if (adjs.has(p)) return `“${p}” is a describing word; it tells what something is like.`;
    return null;
  }
  if (/a <b>verb<\/b>/.test(qt)) {
    if (nouns.has(p)) return `“${p}” names ${EN7W_kind(p)}; it isn't an action you can do.`;
    if (adjs.has(p)) return `“${p}” is a describing word, not an action.`;
    return null;
  }
  return null;
});

/* ---------------- Plurals ---------------- */
const EN7W_end = b => (b.match(/(sh|ch|s|x)$/) || [])[0];
whyRule(7, "english", "plurals", (q, picked) => {
  const p = xPlain(picked).trim(), qt = q.q || "";
  let b = (qt.match(/^One ([a-z]+), two ___\./) || [])[1];
  if (b) {
    const end = EN7W_end(b), es = q.ans === b + "es";
    if (p === b) return `“${b}” means just one, but there are two.`;
    if (es && p === b + "s") return `Words that end in ${end}, like “${b}”, need es, not just s.`;
    if (!es && p === b + "es" && !end) return `“${b}” doesn't end in s, x, sh or ch, so es isn't needed.`;
    if (p === b + "ies") return `“${b}” doesn't end in y, so it doesn't change to ies.`;
    if (!es && p === b + "ss") return `“${p}” has one s too many.`;
    return null;
  }
  b = EN7W_b(q, /more than one <b>([a-z]+)<\/b>\?/);
  if (b && /add <b>s<\/b> or <b>es<\/b>/.test(qt)) {
    const end = EN7W_end(b);
    if (p === "s" && end && q.ans === "es") return `Words that end in ${end}, like “${b}”, need es, not just s.`;
    if (p === "es" && !end && q.ans === "s") return `“${b}” doesn't end in s, x, sh or ch, so es isn't needed.`;
    return null;
  }
  if (/means <b>more than one<\/b>/.test(qt)) {
    const sing = new Set([...PLURALS.map(x => x[0]), ...(typeof EN7_PLUR !== "undefined" ? EN7_PLUR.map(x => x[0]) : [])]);
    if (sing.has(p)) return `“${p}” means just one ${p}.`;
    return null;
  }
  return null;
});

/* ---------------- Ending marks ---------------- */
whyRule(7, "english", "punct", (q, picked) => {
  const sm = (q.q || "").match(/<div class="sentence">(.*?)<span/), pm = String(picked).match(/class="punc">([.?!])</), am = String(q.ans).match(/class="punc">([.?!])</);
  if (!sm || !pm || !am) return null;
  const s = sm[1], p = pm[1], a = am[1], first = s.split(" ")[0], pre = s.includes(",") ? s.split(",")[0] : null;
  if (a === "?") return p === "." ? `It starts with “${first}”, so it asks something; a period is for telling.` : `It starts with “${first}”, so it's asking something, not showing a big feeling.`;
  if (a === ".") return p === "?" ? `“${s}” tells something; it doesn't ask anything.` : `“${s}” just tells something, with no big feeling like wow or ouch.`;
  if (a === "!") {
    if (p === ".") return pre ? `“${pre}” shows a big feeling, so a calm period doesn't fit.` : `“${s}” is said with strong feeling, so a period is too calm.`;
    return `“${s}” isn't asking anything; it shows a strong feeling.`;
  }
  return null;
});

/* ---------------- Blends ---------------- */
const EN7W_blendOf = () => { const m = {}; BLENDS.forEach(x => m[x[1]] = x[0]); if (typeof EN7_BLW !== "undefined") EN7_BLW.forEach(x => m[x[1]] = x[0]); return m; };
whyRule(7, "english", "blends", (q, picked) => {
  const p = xPlain(picked).trim(), qt = q.q || "";
  if (/^Which blend starts the word/.test(qt)) {
    const w = EN7W_word(q), b = q.ans;
    if (!w || !w.startsWith(b) || p.length !== 2 || p === b) return null;
    if (p[0] === b[0]) return `The ${p[0]} is right, but “${w}” has ${b[1]} next, not ${p[1]}.`;
    if (p[1] === b[1]) return `The ${p[1]} is right, but “${w}” starts with ${b[0]}, not ${p[0]}.`;
    return `“${w}” starts with ${b[0]} and ${b[1]}, not ${p[0]} and ${p[1]}.`;
  }
  const ref = EN7W_b(q, /same blend as <b>([a-z]+)<\/b>/);
  if (ref) {
    const m = EN7W_blendOf(), pb = m[p], b = m[ref];
    if (!pb || !b || pb === b || !p.startsWith(pb) || !ref.startsWith(b)) return null;
    return `“${p}” starts with ${pb}, but “${ref}” starts with ${b}.`;
  }
  return null;
});

/* ---------------- Vowel teams ---------------- */
const EN7W_VS = { ai: "a", ay: "a", ee: "e", oa: "o", igh: "i" };
whyRule(7, "english", "vteams", (q, picked) => {
  const p = xPlain(picked).trim(), qt = q.q || "";
  if (/^Which vowel team/.test(qt)) {
    const w = EN7W_word(q), t = q.ans, suf = EN7W_suffix(q);
    if (!w || !EN7W_VS[p] || !EN7W_VS[t] || !w.includes(t)) return null;
    if (EN7W_VS[p] === EN7W_VS[t]) {
      if (p === "ay" && suf) return `ay makes the same long a sound, but ay usually goes at the end of a word, not the middle.`;
      if (p === "ai" && suf === "") return `ai makes the same long a sound, but ai doesn't usually come at the end of a word.`;
      return `${p} makes the same long a sound, but “${w}” isn't spelled with ${p}.`;
    }
    return `${p} makes the long ${EN7W_VS[p]} sound, but “${w}” has the long ${EN7W_VS[t]} sound.`;
  }
  const ref = EN7W_b(q, /same vowel sound as <b>([a-z]+)<\/b>/);
  if (ref) {
    const m = {}; VTEAMS.forEach(x => m[x[0]] = x[1]); if (typeof EN7_VT !== "undefined") EN7_VT.forEach(x => m[x[0] + x[1] + x[2]] = x[1]);
    const pt = m[p], rt = { rain: "ai", bee: "ee", boat: "oa", night: "igh" }[ref];
    if (!pt || !rt || EN7W_VS[pt] === EN7W_VS[rt]) return null;
    return `“${p}” has the long ${EN7W_VS[pt]} sound, not the long ${EN7W_VS[rt]} sound of “${ref}”.`;
  }
  return null;
});

/* ---------------- Syllables ---------------- */
whyRule(7, "english", "syllables", (q, picked) => {
  const p = xPlain(picked).trim(), qt = q.q || "";
  const m = {}; SYLL.forEach(x => m[x[0]] = x[1]); if (typeof EN7_SYL !== "undefined") EN7_SYL.forEach(x => m[x[0]] = x[1]);
  const w = EN7W_b(q, /How many syllables \(claps\) are in <b>([A-Za-z]+)<\/b>/);
  if (w) {
    const sp = m[w], k = +p; if (!sp || !(k >= 1)) return null;
    const n = sp.split("-").length; if (k === n) return null;
    return `${k} ${k === 1 ? "clap is" : "claps are"} too ${k > n ? "many" : "few"}; “${w}” has ${n === 1 ? "just one beat" : n + " beats"}.`;
  }
  if (/^Which word has <b>\d<\/b> syllable/.test(qt)) {
    const sp = m[p]; if (!sp) return null;
    const n = sp.split("-").length;
    return n === 1 ? `“${p}” has just 1 clap.` : `“${p}” has ${n} claps: ${sp}.`;
  }
  return null;
});

/* ---------------- Sentence or not ---------------- */
/* complete sentences: "who|do" */
const EN7W_OK = { "The dog barked at the mailman.": "The dog|barked", "We ate pizza for lunch.": "We|ate", "My sister likes to paint.": "My sister|likes", "The sun is shining.": "The sun|is shining", "Birds fly south in winter.": "Birds|fly", "I lost my red mitten.": "I|lost", "The baby is sleeping.": "The baby|is sleeping", "Dad fixed my bike.": "Dad|fixed", "The frog jumped into the pond.": "The frog|jumped", "Our class went to the zoo.": "Our class|went", "She reads every night.": "She|reads", "The cookies smell yummy.": "The cookies|smell",
  "The cat sat on the mat.": "The cat|sat", "Leo kicked the ball.": "Leo|kicked", "My mom drives a blue car.": "My mom|drives", "The bees buzzed around the flowers.": "The bees|buzzed", "We built a sandcastle.": "We|built", "Grandpa grows tomatoes.": "Grandpa|grows", "The bus stopped at the corner.": "The bus|stopped", "Mia painted a rainbow.": "Mia|painted", "The puppy chewed my sock.": "The puppy|chewed", "I can tie my shoes.": "I|can tie", "The rain fell all night.": "The rain|fell", "Our teacher read us a story.": "Our teacher|read", "The kitten chased a string.": "The kitten|chased", "Ravi plays the piano.": "Ravi|plays", "The leaves are falling.": "The leaves|are falling", "My brother likes trucks.": "My brother|likes", "The ducks swam across the pond.": "The ducks|swam", "We sang a happy song.": "We|sang", "The moon is bright tonight.": "The moon|is bright", "Zoe found a shiny rock.": "Zoe|found", "The farmer feeds the pigs.": "The farmer|feeds", "A snail moves slowly.": "A snail|moves", "I drank a glass of milk.": "I|drank", "The children played tag.": "The children|played", "Noah rode his scooter.": "Noah|rode", "The baby giggled.": "The baby|giggled", "Lily wrote a letter to her aunt.": "Lily|wrote", "The wind blew my hat away.": "The wind|blew", "We planted a tree.": "We|planted", "The owl hoots at night.": "The owl|hoots", "My dad made pancakes.": "My dad|made", "The fish swim in the tank.": "The fish|swim", "Emma hugged her puppy.": "Emma|hugged", "The train is very long.": "The train|is very long", "Kai jumped into the pool.": "Kai|jumped" };
/* fragments: d = no do, w = no who, b = neither, c = starts with a joining word */
const EN7W_NO = { "The big brown dog.": "d", "Ran to the park.": "w", "In the morning.": "b", "My best friend and I.": "d", "Under the table.": "b", "Jumped very high.": "w", "A tall green tree.": "d", "After school today.": "b", "Because it was cold.": "c", "The happy little puppy.": "d", "Swimming in the lake.": "w", "With my grandma.": "b",
  "The little red wagon.": "d", "Ran down the hill.": "w", "On top of the box.": "b", "My grandma and grandpa.": "d", "Ate all the cookies.": "w", "Next to the door.": "b", "A big yellow bus.": "d", "Before lunch.": "b", "Because I was tired.": "c", "The fluffy white cat.": "d", "Splashing in the puddles.": "w", "With a big smile.": "b", "Played outside all day.": "w", "Behind the couch.": "b", "Three tiny ducks.": "d", "When the bell rang.": "c", "The shiny new bike.": "d", "Laughing at the clown.": "w", "Over the rainbow.": "b", "My friend Omar.": "d", "Climbed up the tree.": "w", "At the beach.": "b", "If it rains.": "c", "The tall glass of milk.": "d", "Sang a funny song.": "w", "Up the stairs.": "b", "Two happy puppies.": "d", "Barking at the cat.": "w", "After dinner.": "b", "Under my bed.": "b" };
const EN7W_frag = s => {
  const t = EN7W_NO[s], body = s.replace(/\.$/, ""), first = body.split(" ")[0];
  if (t === "d") return `“${body}” names who or what, but never says what they do.`;
  if (t === "w") return `“${first}” is the do part, but it never says who did it.`;
  if (t === "b") return `“${body}” has no who and no do in it.`;
  if (t === "c") return `It starts with “${first}”, so the thought isn't finished.`;
  return null;
};
whyRule(7, "english", "sentences", (q, picked) => {
  const p = xPlain(picked).trim(), qt = q.q || "";
  if (/^Is this a <b>complete sentence<\/b>/.test(qt)) {
    const s = xPlain(q.vis || "").trim();
    if (/^Yes/.test(p) && EN7W_NO[s]) return EN7W_frag(s);
    if (/^No/.test(p) && EN7W_OK[s]) { const [who, d] = EN7W_OK[s].split("|"); return `“${who}” is the who and “${d}” is the do, so nothing is missing.`; }
    return null;
  }
  if (/^Which one is a <b>complete sentence<\/b>/.test(qt)) return EN7W_NO[p] ? EN7W_frag(p) : null;
  return null;
});

/* ---------------- Bossy R ---------------- */
const EN7W_RS = { ar: "ar", or: "or", er: "er", ir: "er", ur: "er" }, EN7W_RREF = { ar: "car", or: "corn", er: "her", ir: "bird", ur: "nurse" };
whyRule(7, "english", "bossyr", (q, picked) => {
  const p = xPlain(picked).trim(), qt = q.q || "";
  if (/^Which Bossy R team/.test(qt)) {
    const w = EN7W_word(q), t = q.ans;
    if (!w || !EN7W_RS[p] || !EN7W_RS[t] || !w.includes(t) || p === t) return null;
    if (EN7W_RS[p] === EN7W_RS[t]) return `${p} makes the same “er” sound, but that isn't how “${w}” is spelled.`;
    return `${p} says “${EN7W_RS[p]}” as in ${EN7W_RREF[p]}, but “${w}” has the “${EN7W_RS[t]}” sound.`;
  }
  const t = EN7W_b(q, /(?:the|spelled with) <b>(ar|or|er|ir|ur)<\/b>/);
  if (t) {
    const m = {}; RCON.forEach(x => m[x[0]] = x[1]); if (typeof EN7_BOSSY !== "undefined") EN7_BOSSY.forEach(x => m[x[0] + x[1] + x[2]] = x[1]);
    const pt = m[p]; if (!pt || pt === t || p.includes(t)) return null;
    if (/spelled with/.test(qt)) return `“${p}” is spelled with ${pt}, not ${t}.`;
    return `“${p}” has ${pt}, which says “${EN7W_RS[pt]}”, not “${t}”.`;
  }
  return null;
});

/* ---------------- Adding -ing ---------------- */
const EN7W_noDouble = b => {
  const L = b.slice(-1);
  if (/[wxy]$/.test(b)) return `We don't double a ${L} at the end before -ing.`;
  if (!EN7W_isV(b.slice(-2, -1)) && !EN7W_isV(L)) return `“${b}” already ends in two consonants, ${b.slice(-2)}, so nothing doubles.`;
  if (!EN7W_isV(L) && EN7W_isV(b.slice(-2, -1)) && EN7W_isV(b.slice(-3, -2))) return `“${b}” has two vowels together, ${b.slice(-3, -1)}, so the ${L} doesn't double.`;
  return null;
};
whyRule(7, "english", "ing", (q, picked) => {
  const p = xPlain(picked).trim(), qt = q.q || "", b = EN7W_b(q, /to <b>([a-z]+)<\/b>/), ans = xPlain(q.ans);
  if (!b) return null;
  const L = b.slice(-1);
  if (/^What do we do to/.test(qt)) {
    const r = (q.vis || "").match(/→ ([a-z]+)/), ing = r ? r[1] : null; if (!ing) return null;
    const kind = ing === b + "ing" ? "add" : ing === b + L + "ing" ? "dbl" : (L === "e" && ing === b.slice(0, -1) + "ing") ? "drop" : null;
    if (!kind) return null;
    if (p === "Drop the silent e" && L !== "e") return `“${b}” doesn't end in an e, so there's no e to drop.`;
    if (p === "Double the last letter") return kind === "add" ? EN7W_noDouble(b) : kind === "drop" ? `“${b}” ends in a silent e, not a single consonant to double.` : null;
    if (p === "Just add -ing") return kind === "dbl" ? `Just adding -ing gives “${b}ing”, but ${b} has one vowel and one last consonant.` : kind === "drop" ? `Just adding -ing gives “${b}ing”, which keeps the silent e.` : null;
    return null;
  }
  if (!/^Add <b>-ing<\/b>/.test(qt)) return null;
  const kind = ans === b + "ing" ? "add" : ans === b + L + "ing" ? "dbl" : (L === "e" && ans === b.slice(0, -1) + "ing") ? "drop" : null;
  if (!kind) return null;
  if (p === b + "ing") return kind === "dbl" ? `“${p}” needs a second ${L}; ${b} has one vowel and one last consonant.` : kind === "drop" ? `“${p}” keeps the silent e; it has to go before -ing.` : null;
  if (p === b + "eing") return kind === "drop" ? `“${p}” has an extra e; the e should go, not grow.` : `“${p}” sticks an extra e onto ${b}.`;
  if (kind === "add" && p === b + L + "ing") { const r = EN7W_noDouble(b); return r ? `“${p}” has an extra ${L}. ` + r : null; }
  if (kind === "dbl" && p === b + L + L + "ing") return `“${p}” has three ${L}s; two is enough.`;
  if (kind === "drop" && p === b.slice(0, -1) + b.slice(-2, -1) + "ing") return `“${p}” doubles the ${b.slice(-2, -1)}; just drop the e.`;
  if (p === b.slice(0, -1) + "ing" && kind !== "drop") return `“${p}” is missing the ${L} from ${b}.`;
  return null;
});

/* ---------------- Silent letters ---------------- */
/* letters you DO hear, but only as part of a team (say that instead of "you can hear it") */
const EN7W_TEAMED = { "thumb|t": "The t and h team up to make the th sound in “thumb”.", "thumb|h": "The t and h team up to make the th sound in “thumb”.", "knock|c": "The c and k team up to make the k sound at the end of “knock”.", "hour|o": "The o and u team up to make the ow sound you hear in “hour”.", "hour|u": "The o and u team up to make the ow sound you hear in “hour”.", "gnaw|a": "The a and w team up to make the aw sound you hear in “gnaw”.", "autumn|a": "The a and u team up to make the aw sound you hear in “autumn”.", "wrong|n": "The n and g team up to make the ng sound you hear in “wrong”.", "wrinkle|n": "The n makes the ng sound you hear in “wrinkle”.", "wrong|g": "The n and g team up to make the ng sound you hear in “wrong”.", "know|w": "The w teams up with the o to make the long o sound in “know”.", "known|w": "The w teams up with the o to make the long o sound in “known”.", "wreath|t": "The t and h team up to make the th sound in “wreath”.", "wreath|h": "The t and h team up to make the th sound in “wreath”." };
/* letters that are silent too, or too tricky to call */
const EN7W_SKIP = new Set(["whistle|h", "wreath|a", "gnaw|w", "chalk|c", "chalk|h"]);
whyRule(7, "english", "silent", (q, picked) => {
  const p = xPlain(picked).trim(), qt = q.q || "";
  let w = EN7W_b(q, /Which letter is <b>silent<\/b> in <b>([a-z]+)<\/b>/);
  if (w) {
    if (p.length !== 1 || !w.includes(p) || p === q.ans) return null;
    const k = w + "|" + p;
    if (EN7W_SKIP.has(k)) return null;
    if (EN7W_TEAMED[k]) return EN7W_TEAMED[k];
    return `You can hear the ${p} in “${w}”, so it isn't silent.`;
  }
  const l = EN7W_b(q, /has a <b>silent ([a-z])<\/b>/);
  if (l) {
    const heard = typeof EN7_SILD !== "undefined" && EN7_SILD[l] || [];
    return heard.includes(p) ? `You can hear the ${l} in “${p}”, so it isn't silent.` : null;
  }
  w = EN7W_b(q, /Say <b>([a-z]+)<\/b> out loud/);
  if (w && typeof EN7_START !== "undefined") {
    const st = EN7_START[w.slice(0, 2)]; if (!st) return null;
    const [, sil, , ex2] = st;
    return p === `/${sil}/ like ${ex2}` ? `“${w}” doesn't start like “${ex2}”; you don't say the ${sil}.` : null;
  }
  return null;
});

