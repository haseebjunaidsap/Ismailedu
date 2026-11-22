/* =====================================================================
   v22 · Age 9 English (tag EN9V_)
   Part A: two new topics: Point of View (RL.4.6) and Fragments & Run-ons (L.4.1f)
   Part B: more questions for every age-9 English topic, each tagged q.v22 so
           the wrong-answer rules below only speak about their own questions.
   ===================================================================== */
const EN9V_noDot = s => String(s).replace(/[.!?]+$/, "");
const EN9V_low = s => String(s).toLowerCase();
const EN9V_has = (text, w, ci) => new RegExp(`(^|[^A-Za-z'])${w}([^A-Za-z']|$)`, ci ? "i" : "").test(text);

/* =====================================================================
   PART A · NEW TOPIC 1: Point of View
   ===================================================================== */
/* {N} = who starts sentence 1, {S}/{s} = subject pronoun (capital / lower), {P} = possessive, {O} = object */
const EN9V_POVT = [
  ["{N} grabbed {P} backpack and ran to the bus stop.", "{S} got there just as the doors opened."],
  ["{N} opened the old box in the attic.", "Inside, {s} found {P} grandpa's baseball cards."],
  ["{N} planted tomato seeds in a paper cup.", "Every morning, {s} checked to see if they had sprouted."],
  ["{N} tripped on the last step and dropped {P} tray.", "Luckily, a friend helped {O} pick everything up."],
  ["{N} practiced the drum part all week.", "At the concert, {s} played every beat perfectly."],
  ["{N} found a lost kitten under the porch.", "{S} wrapped it in a towel and gave it some water."],
  ["{N} waited by the window for the mail.", "When the package finally came, {s} tore it open with a grin."],
  ["{N} climbed to the top of the hill.", "From there, {s} could see the whole town."],
  ["{N} forgot {P} lunch at home.", "A classmate shared half a sandwich with {O}."],
  ["{N} built a fort out of couch cushions.", "Then {s} crawled inside with a flashlight and a book."],
  ["{N} studied the spelling list every night.", "On Friday, {s} got a perfect score."],
  ["{N} heard a strange noise in the kitchen.", "{S} tiptoed in and found the dog chewing a sock."],
  ["{N} wrote a long letter to {P} cousin.", "{S} drew a picture of the beach at the bottom."],
  ["{N} lost {P} first tooth at lunch.", "{S} wrapped it in a napkin to keep it safe."],
  ["{N} tried to catch a falling leaf.", "It danced away from {O} three times before {s} grabbed it."],
  ["{N} painted a picture of the sunset.", "{S} used orange, pink and purple paint."],
  ["{N} helped Grandma bake bread.", "{S} kneaded the dough until {P} arms were tired."],
  ["{N} looked everywhere for {P} missing shoe.", "At last, {s} found it under the bed."],
  ["{N} watched the storm from the porch.", "Lightning lit up the sky, and {s} counted to ten."],
  ["{N} sold lemonade on a hot afternoon.", "By evening, {s} had earned six dollars."],
  ["{N} slipped on the ice and landed on {P} back.", "{S} laughed and made a snow angel."],
  ["{N} fed the ducks at the pond.", "The ducks quacked and followed {O} along the shore."],
  ["{N} learned to ride a bike without training wheels.", "{S} wobbled at first, but soon {s} was zooming along."],
  ["{N} got a library card on Saturday.", "{S} checked out five books about sharks."],
];
const EN9V_GIRLS = ["Maya", "Priya", "Zoe", "Ana", "Grace", "Leila", "Hana", "Rosa"], EN9V_BOYS = ["Omar", "Leo", "Ben", "Jamal", "Kai", "Diego", "Sam", "Noah"];
const EN9V_WHO = {
  first: { N: "I", S: "I", s: "I", P: "my", O: "me" },
  she: { S: "She", s: "she", P: "her", O: "her" },
  he: { S: "He", s: "he", P: "his", O: "him" },
  you: { N: "You", S: "You", s: "you", P: "your", O: "you" },
  they: { N: "They", S: "They", s: "they", P: "their", O: "them" },
};
const EN9V_fill = (t, w) => t.replace(/\{(\w)\}/g, (_, k) => w[k]);
const EN9V_FIRSTW = ["I", "my", "me"], EN9V_THIRDW = ["he", "she", "his", "her", "him"], EN9V_FIRSTD = ["I", "my", "me", "we", "our"];
const EN9V_presentWords = (text, list) => list.filter(w => EN9V_has(text, w, w !== "I"));

topic(9, "english", {
  id: "pov", title: "Point of View", icon: "🎙️", blurb: "Who is telling the story: first or third person?",
  lesson: [
    { t: "First person", say: "Point of view tells who is telling the story. In first person, a character in the story tells it, using words like I, me and my.", html: passage(`<b class="hl">I</b> grabbed <b class="hl">my</b> coat and ran outside to play.`) + note("<b>I</b> and <b>my</b> → the storyteller is <b>in</b> the story: <b>first person</b> 🙋") },
    { t: "Third person", say: "In third person, a narrator outside the story tells about the characters. The narrator uses their names and words like he, she and they.", html: passage(`<b class="hl">Maya</b> grabbed <b class="hl">her</b> coat, and <b class="hl">she</b> ran outside to play.`) + note("<b>Maya</b>, <b>her</b>, <b>she</b> → the storyteller is <b>outside</b> the story: <b>third person</b> 📖") },
    { t: "Hunt for clue words", say: "Look for clue words. I, me, my, we and our mean first person. He, she, his, her, him and they mean third person.", html: table([["first person", "I, me, my, we, our", "I lost my hat."], ["third person", "he, she, his, her, him, they", "She lost her hat."]], ["Point of view", "Clue words", "Example"]) },
  ],
  gen() {
    const ti = R(0, EN9V_POVT.length - 1), T = EN9V_POVT[ti], k = Math.random(), first = Math.random() < 0.45;
    const girl = Math.random() < 0.5, name = pick(girl ? EN9V_GIRLS : EN9V_BOYS), third = Object.assign({ N: name }, girl ? EN9V_WHO.she : EN9V_WHO.he);
    if (k < 0.4) {
      const w = first ? EN9V_WHO.first : third, text = T.map(x => EN9V_fill(x, w)).join(" ");
      const fw = EN9V_presentWords(text, EN9V_FIRSTW), tw = EN9V_presentWords(text, EN9V_THIRDW);
      const why = first ? `The narrator uses ${fw.map(x => `“${x}”`).join(" and ")}, so a character in the story is telling it.` : `The narrator tells about ${name} using ${tw.map(x => `“${x}”`).join(" and ")}, so it is third person.`;
      return { q: "Is this passage told in first person or third person?", say: `${text} Is this passage told in first person or third person?`, vis: passage(text), opts: ["first person", "third person"], ans: first ? "first person" : "third person", big: 1, why, key: "EN9Va" + ti + (first ? "I" : name), v22: { f: "povA", first, fw, tw, name } };
    }
    if (k < 0.72) {
      const w = first ? EN9V_WHO.first : third, text = T.map(x => EN9V_fill(x, w)).join(" ");
      const pres = EN9V_presentWords(text, first ? EN9V_FIRSTW : EN9V_THIRDW), a = pick(pres);
      const pool = (first ? EN9V_THIRDW : EN9V_FIRSTD).filter(x => !EN9V_has(text, x, x !== "I"));
      const opts = shuffle([a, ...shuffle(pool).slice(0, 3)]), pv = first ? "first" : "third";
      return { q: `Which word in the passage shows it is told in <b>${pv} person</b>?`, say: `${text} Which word in the passage shows it is told in ${pv} person?`, vis: passage(text), opts, ans: a, big: 1, why: first ? `“${a}” is a first-person word: the storyteller is talking about themselves.` : `“${a}” is a third-person word: the narrator is telling about ${name}.`, key: "EN9Vb" + ti + name + a + pv, v22: { f: "povB", text } };
    }
    const s1 = T[0], from = EN9V_fill(s1, third), a = EN9V_fill(s1, EN9V_WHO.first);
    const pr = Object.assign({ N: girl ? "She" : "He" }, girl ? EN9V_WHO.she : EN9V_WHO.he), o3 = EN9V_fill(s1, pr), oy = EN9V_fill(s1, EN9V_WHO.you), ot = EN9V_fill(s1, EN9V_WHO.they);
    const tag = {}; tag[o3] = ["third", girl ? "She" : "He"]; tag[oy] = ["you"]; tag[ot] = ["they"];
    return { q: "Which sentence retells this in <b>first person</b>, as if you were the one doing it?", say: `${from} Which sentence retells this in first person, as if you were the one doing it?`, vis: `<div class="quote">${from}</div>`, opts: shuffle([a, o3, oy, ot]), ans: a, why: `First person uses “I” for the person telling it: ${a}`, key: "EN9Vc" + ti + name, v22: { f: "povC", tag } };
  },
});
TRICK_ADD(9, "english", "pov", "Hunt for “I”, “me” or “my” in the telling. If the storyteller says I, it's first person. If it's all names, he, she and they, it's third person.");
whyRule(9, "english", "pov", (q, picked) => {
  const v = q.v22; if (!v) return null;
  const p = xPlain(picked);
  if (v.f === "povA") {
    if (p === q.ans) return null;
    if (v.first && v.fw.length) return `The storyteller says “${v.fw[0]}”, so they are in the story; that makes it first person.`;
    if (!v.first && v.tw.length) return `There's no “I” or “my” here; the narrator tells about ${v.name} using “${v.tw[0]}”.`;
    return null;
  }
  if (v.f === "povB") { if (p === q.ans || EN9V_has(v.text, p, p !== "I")) return null; return `${xQ(p)} doesn't appear anywhere in this passage.`; }
  if (v.f === "povC") {
    const t = v.tag[picked]; if (!t) return null;
    if (t[0] === "third") return `It still uses “${t[1]}”, so it's still third person, told from outside.`;
    if (t[0] === "you") return "It uses “you”, which talks to the reader; that is second person, not first.";
    return "It uses “they”, so it's still third person, about other people.";
  }
  return null;
});

/* =====================================================================
   PART A · NEW TOPIC 2: Fragments & Run-ons
   ===================================================================== */
/* [subject, predicate (past tense, never a command), a short sentence that follows it] */
const EN9V_SP = [
  ["The tall giraffe", "nibbled leaves from the treetop", "It stretched its long neck."],
  ["My little brother", "built a tower of blocks", "Then he knocked it down."],
  ["The noisy crowd", "cheered for the runners", "Everyone clapped and waved."],
  ["A tiny gray mouse", "scurried under the stove", "It was looking for crumbs."],
  ["Our science teacher", "showed us a real fossil", "It was millions of years old."],
  ["The yellow school bus", "stopped at the corner", "The kids climbed aboard."],
  ["Grandpa", "fixed the squeaky door", "Now it opens quietly."],
  ["The hungry pelican", "scooped up a fish", "Then it flew away."],
  ["Three red balloons", "floated over the trees", "They drifted out of sight."],
  ["The new student", "sat next to Ava at lunch", "They talked about their pets."],
  ["A strong wind", "rattled the windows all night", "I could hardly sleep."],
  ["The baby", "giggled at the puppet show", "She clapped her tiny hands."],
  ["Our soccer team", "won the last game", "The players hugged each other."],
  ["The old wooden bridge", "creaked under our feet", "We crossed it slowly."],
  ["Malik", "painted a picture of the ocean", "He used five shades of blue."],
  ["The striped cat", "napped in the sunlight", "It purred softly."],
  ["Two busy squirrels", "buried acorns in the yard", "They will dig them up later."],
  ["The library", "closed early on Friday", "The workers went home at noon."],
  ["My best friend", "lent me her markers", "I gave them back the next day."],
  ["The bright full moon", "lit up the whole field", "We could see our shadows."],
  ["Aunt Lucia", "drove us to the museum", "We saw dinosaur bones there."],
  ["The muddy puppy", "shook water all over the porch", "Dad grabbed a towel."],
  ["A flock of geese", "flew south for the winter", "They honked as they flew."],
  ["Our class", "planted sunflowers by the fence", "The flowers grew very tall."],
  ["Mr. Brooks", "read us a funny story", "Everyone laughed at the ending."],
  ["The pancakes", "sizzled on the griddle", "They smelled delicious."],
  ["Lena", "found a shiny shell on the beach", "She put it in her pocket."],
  ["The fire truck", "raced down the street", "Its siren was very loud."],
  ["The neighbor's dog", "barked at the mail truck", "The driver waved hello."],
  ["A spotted ladybug", "landed on my finger", "It had seven black spots."],
];
const EN9V_STARTERS = ["Because", "When", "After", "Although"];
const EN9V_lcS = s => /^(The|A|Our|My|Two|Three)\b/.test(s) ? s.charAt(0).toLowerCase() + s.slice(1) : s;
const EN9V_lcF = f => /^(I|Dad)\b/.test(f) ? f : f.charAt(0).toLowerCase() + f.slice(1);
const EN9V_FR = {
  complete: (i) => `${EN9V_SP[i][0]} ${EN9V_SP[i][1]}.`,
  follow: (i) => EN9V_SP[i][2],
  fragS: (i) => `${EN9V_SP[i][0]}.`,
  fragP: (i) => `${cap(EN9V_SP[i][1])}.`,
  dep: (i, st) => `${st} ${EN9V_lcS(EN9V_SP[i][0])} ${EN9V_SP[i][1]}.`,
  runon: (i) => `${EN9V_SP[i][0]} ${EN9V_SP[i][1]} ${EN9V_lcF(EN9V_SP[i][2])}`,
};
const EN9V_FRKIND = { complete: "complete sentence", follow: "complete sentence", fragS: "fragment", fragP: "fragment", dep: "fragment", runon: "run-on" };
const EN9V_fragOK = i => EN9V_SP[i][0].split(" ").length >= 2;
/* why an option of this type is not a complete sentence */
const EN9V_notWhole = (t, st) => t === "fragS" ? "It names who or what, but it has no verb telling what happened."
  : t === "fragP" ? "It tells what happened, but it never says who or what did it."
  : t === "dep" ? `It starts with “${st}”, so the thought is left unfinished.`
  : t === "runon" ? "It is two sentences jammed together with no period between them." : null;

topic(9, "english", {
  id: "fragments", title: "Fragments & Run-ons", icon: "🚧", blurb: "Fix sentences that are missing parts or run together.",
  lesson: [
    { t: "A complete sentence", say: "A complete sentence has a subject, who or what it is about, and a verb that tells what happened. Together they make a complete thought.", html: `<div class="sentence big-sentence"><b class="noun">The tall giraffe</b> <b class="verb">nibbled</b> leaves. 🦒</div>` + note("<b>subject</b> (who or what) + <b>verb</b> (what happened) = complete sentence") },
    { t: "Fragments", say: "A fragment is only a piece of a sentence. It may be missing a subject or a verb, or it may leave the thought unfinished.", html: `<div class="quote">The tall giraffe. <small>no verb</small></div><div class="quote">Nibbled leaves. <small>no subject</small></div><div class="quote">Because it was hungry. <small>unfinished thought</small></div>` },
    { t: "Run-ons", say: "A run-on jams two sentences together with no stop between them. Fix it with a period and a capital letter.", html: `<div class="quote">The giraffe nibbled leaves it stretched its neck. ❌</div>` + row(arrow()) + `<div class="quote">The giraffe nibbled leaves<b class="hl">.</b> <b class="hl">I</b>t stretched its neck. ✔</div>` },
  ],
  gen() {
    const n = EN9V_SP.length, i = R(0, n - 1), k = Math.random(), st = pick(EN9V_STARTERS);
    if (k < 0.4) {
      const types = ["complete", "follow", "fragP", "dep", "runon"].concat(EN9V_fragOK(i) ? ["fragS"] : []), t = pick(types), s = EN9V_FR[t](i, st), a = EN9V_FRKIND[t];
      const why = a === "complete sentence" ? "It has a subject and a verb, and it shows one complete thought." : t === "runon" ? "It is two complete thoughts run together with no period between them." : EN9V_notWhole(t, st);
      return { q: "Is this a complete sentence, a fragment, or a run-on?", say: `${s} Is this a complete sentence, a fragment, or a run-on?`, vis: `<div class="quote">${s}</div>`, opts: ["complete sentence", "fragment", "run-on"], ans: a, big: 1, why, key: "EN9Vfa" + t + i + (t === "dep" ? st : ""), v22: { f: "frA", t, st, subj: EN9V_SP[i][0] } };
    }
    if (k < 0.62) {
      const [j, m, l] = shuffle(range(0, n - 1).filter(x => x !== i)).slice(0, 3), tc = pick(["complete", "follow"]), a = EN9V_FR[tc](i);
      const t1 = EN9V_fragOK(j) && Math.random() < 0.5 ? "fragS" : "dep", o1 = EN9V_FR[t1](j, st), o2 = EN9V_FR.fragP(m), o3 = EN9V_FR.runon(l);
      const tag = {}; tag[o1] = t1; tag[o2] = "fragP"; tag[o3] = "runon";
      return { q: "Which one is a <b>complete sentence</b>?", say: "Which one is a complete sentence?", opts: shuffle([a, o1, o2, o3]), ans: a, why: `“${EN9V_noDot(a)}” has a subject and a verb, and it shows a complete thought.`, key: "EN9Vfb" + tc + i, v22: { f: "frB", tag, st } };
    }
    if (k < 0.8) {
      const missS = !EN9V_fragOK(i) || Math.random() < 0.5, s = missS ? EN9V_FR.fragP(i) : EN9V_FR.fragS(i), a = missS ? "a subject (who or what)" : "a verb (what happened)";
      return { q: "This is a fragment. What is it missing?", say: `${s} This is a fragment. What is it missing?`, vis: `<div class="quote">${s}</div>`, opts: ["a subject (who or what)", "a verb (what happened)"], ans: a, big: 1, why: missS ? `It never says who or what ${EN9V_SP[i][1].split(" ")[0]} it, so it needs a subject.` : `It names ${EN9V_lcS(EN9V_SP[i][0])} but never says what happened, so it needs a verb.`, key: "EN9Vfc" + (missS ? "s" : "v") + i, v22: { f: "frC", missS, subj: EN9V_SP[i][0], verb: EN9V_SP[i][1].split(" ")[0] } };
    }
    const [S, P, F] = EN9V_SP[i], ro = EN9V_FR.runon(i), a = `${S} ${P}. ${F}`;
    const oc = `${S} ${P}, ${EN9V_lcF(F)}`, oe = `${S} ${P} ${EN9V_lcF(F).replace(/\.$/, "!")}`, ol = `${S} ${P}. ${F.charAt(0).toLowerCase() + F.slice(1)}`;
    const tag = {}; tag[oc] = "comma"; tag[oe] = "mark"; tag[ol] = "lower";
    return { q: "Which is the best way to fix this <b>run-on</b>?", say: `${ro} Which is the best way to fix this run-on?`, vis: `<div class="quote">${ro}</div>`, opts: shuffle([a, oc, oe, ol]), ans: a, why: "A period ends the first thought, and a capital letter starts the second one.", key: "EN9Vfd" + i, v22: { f: "frD", tag } };
  },
});
TRICK_ADD(9, "english", "fragments", "Ask two questions: Who or what? What happened? If one answer is missing, it's a fragment. If you get two full answers with no period between, it's a run-on.");
whyRule(9, "english", "fragments", (q, picked) => {
  const v = q.v22; if (!v) return null;
  const p = xPlain(picked);
  if (v.f === "frA") {
    if (p === q.ans) return null;
    const kind = EN9V_FRKIND[v.t];
    if (p === "complete sentence") return EN9V_notWhole(v.t, v.st);
    if (p === "fragment") return kind === "run-on" ? "Nothing is missing; it has two complete thoughts that run together." : "It has a subject and a verb, and the thought is complete.";
    if (p === "run-on") return kind === "fragment" ? "A run-on has two complete thoughts, but this doesn't have even one." : "It has only one complete thought, so nothing runs together.";
    return null;
  }
  if (v.f === "frB") { const t = v.tag[picked]; return t ? EN9V_notWhole(t, v.st) : null; }
  if (v.f === "frC") {
    if (p === q.ans) return null;
    return v.missS ? `It already has a verb, “${v.verb}”; what's missing is who or what did it.` : `It already has a subject, ${xQ(v.subj)}; what's missing is the verb.`;
  }
  if (v.f === "frD") {
    const t = v.tag[picked];
    if (t === "comma") return "A comma alone can't join two complete sentences.";
    if (t === "mark") return "Changing the end mark doesn't help; the two thoughts still run together.";
    if (t === "lower") return "The second sentence needs a capital letter at the start.";
    return null;
  }
  return null;
});

/* =====================================================================
   PART B · more questions for the existing age-9 English topics
   ===================================================================== */
const EN9V_JOBTXT = {
  noun: w => `“${w}” is a noun; it names a person, place, or thing.`,
  name: w => `“${w}” is a name, so it is a noun.`,
  verb: w => `“${w}” is a verb; it shows the action.`,
  being: w => `“${w}” is a verb, a being word.`,
  adjective: w => `“${w}” is an adjective; it describes a noun.`,
};

/* ---------- Adverbs: [sentence, adverb, how/when/where, [[other word, job] ×3]] ---------- */
const EN9V_ADV = [
  ["The kitten purred softly.", "softly", "how", [["kitten", "noun"], ["purred", "verb"]]],
  ["Grandpa carefully fixed the broken chair.", "carefully", "how", [["Grandpa", "name"], ["fixed", "verb"], ["chair", "noun"]]],
  ["The children played happily in the snow.", "happily", "how", [["children", "noun"], ["played", "verb"], ["snow", "noun"]]],
  ["Lucas answered the phone politely.", "politely", "how", [["Lucas", "name"], ["answered", "verb"], ["phone", "noun"]]],
  ["The firefighters worked bravely.", "bravely", "how", [["firefighters", "noun"], ["worked", "verb"]]],
  ["The waves crashed loudly on the rocks.", "loudly", "how", [["waves", "noun"], ["crashed", "verb"], ["rocks", "noun"]]],
  ["The leaf drifted slowly to the ground.", "slowly", "how", [["leaf", "noun"], ["drifted", "verb"], ["ground", "noun"]]],
  ["We will plant the seeds tomorrow.", "tomorrow", "when", [["plant", "verb"], ["seeds", "noun"]]],
  ["Nadia left early.", "early", "when", [["Nadia", "name"], ["left", "verb"]]],
  ["The mail came late.", "late", "when", [["mail", "noun"], ["came", "verb"]]],
  ["Yesterday our class visited a farm.", "Yesterday", "when", [["class", "noun"], ["visited", "verb"], ["farm", "noun"]]],
  ["I will finish my book soon.", "soon", "when", [["finish", "verb"], ["book", "noun"]]],
  ["The baby is sleeping now.", "now", "when", [["baby", "noun"], ["sleeping", "verb"]]],
  ["Tonight the moon looks huge.", "Tonight", "when", [["moon", "noun"], ["looks", "verb"], ["huge", "adjective"]]],
  ["The puppy followed us everywhere.", "everywhere", "where", [["puppy", "noun"], ["followed", "verb"]]],
  ["The kids raced outside.", "outside", "where", [["kids", "noun"], ["raced", "verb"]]],
  ["Please hang your coat here.", "here", "where", [["hang", "verb"], ["coat", "noun"]]],
  ["The rocket shot upward.", "upward", "where", [["rocket", "noun"], ["shot", "verb"]]],
  ["Mom looked downstairs for her keys.", "downstairs", "where", [["Mom", "name"], ["looked", "verb"], ["keys", "noun"]]],
  ["The robin built its nest nearby.", "nearby", "where", [["robin", "noun"], ["built", "verb"], ["nest", "noun"]]],
  ["The cat stayed indoors.", "indoors", "where", [["cat", "noun"], ["stayed", "verb"]]],
];
const EN9V_ADVFILL = [["table", "noun"], ["garden", "noun"], ["jumped", "verb"], ["red", "adjective"]];
const EN9V_TELL = { how: "the way something is done", when: "a time", where: "a place" };
addBank(9, "english", "adverbs", 0.26, function () {
  const [s, a, t, others] = pick(EN9V_ADV);
  if (Math.random() < 0.5) {
    const pool = shuffle(others).concat(shuffle(EN9V_ADVFILL)).slice(0, 3), jobs = {}; pool.forEach(([w, j]) => { jobs[w] = j; });
    return { q: `Which word is the <b>adverb</b>?<div class="sentence">${s}</div>`, say: `Which word is the adverb? ${s}`, opts: shuffle([a, ...pool.map(x => x[0])]), ans: a, big: 1, why: `${cap(a)} tells ${t} about the verb.`, key: "EN9Va" + s, v22: { f: "advW", jobs } };
  }
  return { q: `Does <b>${a.toLowerCase()}</b> tell how, when, or where?<div class="sentence">${hlWord(s, a)}</div>`, say: `In this sentence, does ${a} tell how, when, or where? ${s}`, opts: ["how", "when", "where"], ans: t, big: 1, why: `${cap(a)} tells ${t}.`, key: "EN9Vt" + s, v22: { f: "advT", a: a.toLowerCase(), t } };
});
whyRule(9, "english", "adverbs", (q, picked) => {
  const v = q.v22; if (!v) return null;
  const p = xPlain(picked);
  if (v.f === "advW") return v.jobs[p] ? EN9V_JOBTXT[v.jobs[p]](p) : null;
  if (v.f === "advT" && EN9V_TELL[p] && p !== v.t) return `“${v.a}” tells ${EN9V_TELL[v.t]}, not ${EN9V_TELL[p]}.`;
  return null;
});

/* ---------- Cause & Effect: [cause, effect, wrong causes, wrong effects] ---------- */
const EN9V_CE = [
  ["Jonah left his sandwich on the picnic blanket and walked away.", "Ants crawled all over the sandwich.", ["Jonah wrapped his sandwich tightly.", "Jonah ate his sandwich right away.", "Jonah kept his sandwich in his lunch box."], ["The sandwich grew bigger.", "The sandwich turned into a pie.", "The blanket got cleaner."]],
  ["A big storm knocked down the old tree.", "Branches blocked the road.", ["The weather was calm and sunny.", "A gardener planted a new tree.", "Workers swept the road clean."], ["The old tree grew new leaves.", "The road got wider.", "The tree stood taller than before."]],
  ["Lila practiced her lines every night.", "Lila remembered all her lines in the play.", ["Lila lost her script.", "Lila never looked at her lines.", "Lila was home sick all week."], ["Lila forgot every line.", "Lila's costume ripped.", "Lila missed the play."]],
  ["The puppy chewed a hole in the garden hose.", "Water sprayed all over the yard.", ["The hose was rolled up in the shed.", "The water was turned off.", "Dad bought a new hose."], ["The hose got longer.", "The yard got drier.", "The hose turned green."]],
  ["Ravi wore stiff new shoes on a long hike.", "Ravi got a blister on his heel.", ["Ravi stayed home on the couch.", "Ravi soaked his feet in warm water.", "Ravi rode in the car."], ["Ravi's shoes turned red.", "Ravi grew an inch taller.", "Ravi's hat blew away."]],
  ["Someone left the hamster's cage door open.", "The hamster got out and hid under a desk.", ["The cage door was locked.", "The hamster was asleep in its bed.", "The teacher fed the hamster."], ["The cage got cleaner.", "The hamster's water bottle filled up.", "The class got a second hamster."]],
  ["Abby added too much water to the pancake batter.", "The pancakes came out thin and runny.", ["Abby measured everything carefully.", "Abby used a new frying pan.", "Abby added extra flour."], ["The pancakes were thick and fluffy.", "The pancakes turned purple.", "The pancakes tasted like pizza."]],
  ["The street lights went out all over town.", "The streets were very dark that night.", ["The sun was shining at noon.", "Workers put in brighter bulbs.", "The moon was full and bright."], ["The streets got brighter.", "The cars went faster.", "The traffic lights turned green."]],
  ["Kofi kept his library book a month too long.", "Kofi had to pay a small late fee.", ["Kofi returned the book early.", "Kofi read the book twice.", "Kofi bought his own copy."], ["Kofi got a free book.", "The library gave him a prize.", "The book got longer."]],
  ["Sofia spilled juice on her homework.", "Some of the words got smudged.", ["Sofia kept her juice far away.", "Sofia drank only water.", "Sofia kept her homework in a folder."], ["Her homework looked neater.", "Her pencil got sharper.", "Her juice turned into milk."]],
  ["The wind blew Ethan's hat off his head.", "Ethan chased his hat down the sidewalk.", ["Ethan tied his hat on tightly.", "The air was perfectly still.", "Ethan left his hat at home."], ["Ethan's hat got bigger.", "Ethan's hair got shorter.", "The sidewalk got cleaner."]],
  ["Grandma knitted Nora a warm scarf.", "Nora's neck stayed warm on the cold walk.", ["Nora forgot her coat.", "Nora lost her scarf.", "Grandma took the scarf back."], ["Nora's neck froze on the walk.", "The walk got shorter.", "Nora's mittens got lost."]],
  ["The baker forgot to set a timer.", "The bread baked too long and burned.", ["The baker set two timers.", "The baker checked the oven often.", "The oven was turned off."], ["The bread came out perfect.", "The bread stayed raw.", "The bread turned blue."]],
  ["Amara studied the map before the trip.", "Amara knew which way to go.", ["Amara lost the map.", "Amara left the map at home.", "Amara never looked at the map."], ["Amara got lost right away.", "The map got bigger.", "Amara forgot where she lived."]],
  ["Our neighbor's car battery died.", "The car would not start.", ["Our neighbor put in a new battery.", "Our neighbor washed the car.", "The car's tank was full of gas."], ["The car went extra fast.", "The car's horn got louder.", "The car turned into a truck."]],
  ["Hugo shared his umbrella with Mae.", "Mae stayed dry in the rain.", ["Hugo kept his umbrella closed.", "Mae left her raincoat at school.", "Hugo forgot his umbrella."], ["Mae got soaking wet.", "The rain stopped.", "Hugo's umbrella turned into a kite."]],
];
const EN9V_lcE = e => /^(The|A|Ants|Branches|Water|Some|Her|His|Its)\b/.test(e) ? e.charAt(0).toLowerCase() + e.slice(1) : e;
addBank(9, "english", "causeeffect", 0.21, function () {
  const i = R(0, EN9V_CE.length - 1), [c, e, wc, we] = EN9V_CE[i];
  if (Math.random() < 0.5) return { q: `<div class="quote">${e}</div>What was the <b>cause</b>? (Why did it happen?)`, say: `${e} What was the cause? Why did it happen?`, opts: shuffle([c, ...wc]), ans: c, why: `${EN9V_noDot(c)}, and that is why ${EN9V_lcE(e)}`, key: "EN9Vc" + i, v22: { f: "ceC", shown: e, wrong: wc } };
  return { q: `<div class="quote">${c}</div>What was the <b>effect</b>? (What happened?)`, say: `${c} What was the effect? What happened?`, opts: shuffle([e, ...we]), ans: e, why: `${EN9V_noDot(c)}, so ${EN9V_lcE(e)}`, key: "EN9Ve" + i, v22: { f: "ceE", shown: c, wrong: we } };
});
whyRule(9, "english", "causeeffect", (q, picked) => {
  const v = q.v22; if (!v) return null;
  const p = xPlain(picked); if (!v.wrong.includes(p)) return null;
  return v.f === "ceC" ? `${xQ(EN9V_noDot(p))} would not cause that.` : `${xQ(EN9V_noDot(v.shown))} would not make that happen.`;
});

/* ---------- Context Clues: [sentence, word, meaning, wrong meanings, clue in the sentence] ---------- */
const EN9V_CTX = [
  ["After the storm, my sneakers were so soggy that water squished out with every step.", "soggy", "very wet", ["very clean", "very tight", "brand new"], "water squished out with every step"],
  ["Ana took a quick glance at the clock and went right back to her book.", "glance", "a quick look", ["a long nap", "a loud shout", "a big hug"], "went right back to her book"],
  ["The sky was so gloomy that we turned on the lights at noon.", "gloomy", "dark and gray", ["bright and sunny", "warm and clear", "pink and gold"], "turned on the lights at noon"],
  ["The penguin dove off the ice and took a plunge into the water.", "plunge", "a sudden dive", ["a slow walk", "a long sleep", "a small snack"], "dove off the ice"],
  ["Kenji had to sprint to catch the bus before it pulled away.", "sprint", "run very fast", ["walk slowly", "sit still", "sing loudly"], "before it pulled away"],
  ["The cabin was cozy, with a crackling fire and soft blankets.", "cozy", "warm and comfortable", ["cold and empty", "loud and crowded", "dark and scary"], "a crackling fire and soft blankets"],
  ["The loud pop of the balloon startled the baby, and she began to cry.", "startled", "suddenly surprised or scared", ["made sleepy", "made calm", "made happy"], "she began to cry"],
  ["After the long hike, the weary campers dropped into their sleeping bags.", "weary", "very tired", ["full of energy", "very excited", "wide awake"], "dropped into their sleeping bags"],
  ["Leo got caught in the downpour without an umbrella and came home drenched.", "drenched", "soaking wet", ["warm and dry", "very dusty", "very sleepy"], "without an umbrella"],
  ["The turtle felt sluggish in the cold water and barely moved.", "sluggish", "slow-moving", ["very fast", "very jumpy", "full of energy"], "barely moved"],
  ["The fans were jubilant when their team won, cheering and dancing in the stands.", "jubilant", "full of joy", ["sad and quiet", "bored", "worried"], "cheering and dancing in the stands"],
  ["The sick kitten was so feeble that it could not climb onto the couch.", "feeble", "very weak", ["very strong", "very playful", "very big"], "could not climb onto the couch"],
  ["Mr. Ortiz gave the class a stern look, and the room went silent at once.", "stern", "serious and strict", ["silly and playful", "sleepy", "confused"], "the room went silent at once"],
  ["The painting was so vivid that the red flowers seemed to glow.", "vivid", "bright and strong in color", ["pale and faded", "dull and gray", "blurry"], "the red flowers seemed to glow"],
  ["The fragrant roses filled the whole room with a sweet smell.", "fragrant", "sweet-smelling", ["stinky", "thorny", "wilted"], "a sweet smell"],
  ["Our new classroom is so spacious that all the desks fit with room to spare.", "spacious", "roomy and large", ["tiny and crowded", "dark", "noisy"], "with room to spare"],
  ["The tent was so cramped that our elbows bumped every time we moved.", "cramped", "too small and tight", ["roomy", "bright", "clean"], "our elbows bumped every time we moved"],
  ["The river was so rapid that it carried the leaf away in seconds.", "rapid", "very fast", ["very slow", "very still", "frozen solid"], "carried the leaf away in seconds"],
  ["Mom saved her money for months to purchase a new bike.", "purchase", "buy", ["break", "paint", "sell"], "saved her money for months"],
  ["The train will depart at noon, so be on board before then.", "depart", "leave", ["arrive", "break down", "be painted"], "be on board before then"],
  ["Please discard your trash in the bin by the door.", "discard", "throw away", ["keep", "count", "wash"], "in the bin"],
  ["The doctor will inspect the cut closely to make sure it is healing.", "inspect", "look at carefully", ["ignore", "hide", "forget about"], "closely to make sure it is healing"],
  ["Ty used a needle and thread to mend the hole in his sock.", "mend", "fix", ["make bigger", "throw away", "wash"], "used a needle and thread"],
  ["The bashful boy hid behind his mom when he met new people.", "bashful", "shy", ["bossy", "brave", "noisy"], "hid behind his mom"],
  ["Our generous neighbor gave every child on the street a free popsicle.", "generous", "happy to give and share", ["selfish", "grumpy", "forgetful"], "a free popsicle"],
  ["Don't dawdle, or we'll miss the start of the movie!", "dawdle", "move too slowly", ["hurry", "laugh", "shout"], "or we'll miss the start"],
  ["The hungry wolf pups devoured their meal in seconds.", "devoured", "ate quickly and hungrily", ["refused to eat", "slowly sniffed", "left behind"], "hungry"],
  ["Jada began to tremble on the stage, her knees shaking with fear.", "tremble", "shake", ["smile", "sing", "relax"], "her knees shaking with fear"],
  ["The old ladder was wobbly, so Dad held it steady while I climbed.", "wobbly", "shaky and unsteady", ["strong and still", "brand new", "very short"], "Dad held it steady"],
  ["Fresh water was scarce on the island, so every drop was saved.", "scarce", "hard to find", ["easy to find", "very salty", "very cold"], "every drop was saved"],
  ["Leah's apology was sincere; she really meant every word.", "sincere", "honest and real", ["fake", "loud", "short"], "she really meant every word"],
  ["When the bus doors started to close, Malik made a frantic dash to get on.", "frantic", "wild with hurry and worry", ["calm and slow", "lazy", "sleepy"], "the bus doors started to close"],
  ["A sudden gust of wind blew Mia's papers across the playground.", "gust", "a quick, strong rush of air", ["a tiny raindrop", "a quiet sound", "a ray of sun"], "blew Mia's papers across the playground"],
  ["Ben pondered the riddle for a long time before he answered.", "pondered", "thought carefully about", ["forgot", "shouted", "tore up"], "for a long time before he answered"],
  ["The plump tomatoes were so round and juicy that they almost burst.", "plump", "round and full", ["thin and dry", "hard and flat", "tiny"], "round and juicy"],
  ["The basement was damp, and the walls felt cool and a little wet.", "damp", "slightly wet", ["bone dry", "very hot", "brightly lit"], "a little wet"],
  ["The greedy gull grabbed every cracker and wouldn't leave any for the others.", "greedy", "wanting more than your share", ["kind and sharing", "afraid", "sleepy"], "wouldn't leave any for the others"],
  ["Zoe was gleeful when she found a whole dollar in her coat pocket.", "gleeful", "very happy", ["upset", "grumpy", "scared"], "found a whole dollar"],
  ["The hasty painter rushed so much that he dripped paint everywhere.", "hasty", "too quick and careless", ["slow and careful", "tidy", "quiet"], "rushed so much"],
  ["The lifeguard will assist any swimmer who needs help.", "assist", "help", ["ignore", "race", "splash"], "who needs help"],
];
addBank(9, "english", "context", 0.27, function () {
  const [s, w, m, d, clue] = pick(EN9V_CTX);
  return { q: `What does <b>${w}</b> mean?<div class="sentence">${hlWord(s, w)}</div>`, say: `What does ${w} mean? ${s}`, opts: shuffle([m, ...d]), ans: m, why: `The clue “${clue}” shows that ${w} means ${m}.`, key: "EN9V" + w, v22: { f: "ctx", w, d, clue } };
});
whyRule(9, "english", "context", (q, picked) => {
  const v = q.v22; if (!v) return null;
  const p = xPlain(picked); if (!v.d.includes(p)) return null;
  return `If ${v.w} meant “${p}”, the clue “${v.clue}” wouldn't make sense.`;
});

/* ---------- Contractions: underlined words in a sentence ---------- */
/* cat: what follows the words, so every wrong choice makes a sentence that can't work:
   be = noun/adjective/-ing, D = a plain verb, H = a past participle, sbe/sbase = subject contractions */
const EN9V_CSENT = [
  ["<u>There is</u> a frog in the pond.", "There's", "sbe"], ["<u>What is</u> your favorite color?", "What's", "sbe"], ["<u>That is</u> a great idea!", "That's", "sbe"],
  ["<u>He is</u> the tallest kid in our class.", "He's", "sbe"], ["<u>Who is</u> knocking at the door?", "Who's", "sbe"], ["<u>You are</u> the best big sister!", "You're", "sbe"],
  ["<u>I am</u> learning to play the drums.", "I'm", "sbe"], ["<u>I would</u> like a glass of water, please.", "I'd", "sbase"], ["<u>You would</u> love this book.", "You'd", "sbase"],
  ["<u>They would</u> rather play inside today.", "They'd", "sbase"], ["<u>We would</u> be happy to help.", "We'd", "sbase"], ["<u>She would</u> like to join the club.", "She'd", "sbase"],
  ["<u>He would</u> never forget his first puppy.", "He'd", "sbase"], ["<u>We will</u> plant tulips in the fall.", "We'll", "sbase"], ["<u>They will</u> sing at the concert.", "They'll", "sbase"],
  ["<u>She will</u> bring the snacks.", "She'll", "sbase"], ["<u>We have</u> already eaten lunch.", "We've", "sbase"], ["<u>Let us</u> read one more chapter.", "Let's", "sbase"],
  ["The bus <u>is not</u> here yet.", "isn't", "be"], ["My sneakers <u>are not</u> muddy anymore.", "aren't", "be"], ["The puzzle <u>was not</u> easy.", "wasn't", "be"],
  ["The lights <u>were not</u> on.", "weren't", "be"], ["Grandpa <u>does not</u> like loud music.", "doesn't", "D"], ["The kids <u>did not</u> hear the thunder.", "didn't", "D"],
  ["I <u>could not</u> find my library card.", "couldn't", "D"], ["You <u>should not</u> skip breakfast.", "shouldn't", "D"], ["The window <u>would not</u> close all the way.", "wouldn't", "D"],
  ["My dog <u>will not</u> sit still for a photo.", "won't", "D"], ["Tara <u>cannot</u> reach the top shelf.", "can't", "D"], ["You <u>must not</u> touch the hot stove.", "mustn't", "D"],
  ["I <u>have not</u> seen that movie.", "haven't", "H"], ["The baby <u>has not</u> had her nap.", "hasn't", "H"],
];
const EN9V_CLONG = { "i'll": "I will", "we'll": "we will", "they'll": "they will", "you'll": "you will", "she'll": "she will", "he'll": "he will", "i'm": "I am", "we're": "we are", "they're": "they are", "you're": "you are", "isn't": "is not", "aren't": "are not", "wasn't": "was not", "weren't": "were not", "don't": "do not", "doesn't": "does not", "didn't": "did not", "can't": "cannot", "couldn't": "could not", "won't": "will not", "wouldn't": "would not", "shouldn't": "should not", "mustn't": "must not", "haven't": "have not", "hasn't": "has not", "hadn't": "had not", "there's": "there is", "what's": "what is", "that's": "that is", "he's": "he is", "who's": "who is", "i'd": "I would", "you'd": "you would", "they'd": "they would", "we'd": "we would", "she'd": "she would", "he'd": "he would", "let's": "let us", "we've": "we have" };
const EN9V_CPOOL = { sbe: ["I'll", "We'll", "They'll", "You'll", "She'll", "He'll"], sbase: ["I'm", "We're", "They're", "You're"], be: ["don't", "doesn't", "didn't", "can't", "couldn't", "won't", "shouldn't", "haven't", "hasn't"], D: ["isn't", "aren't", "wasn't", "weren't", "haven't", "hasn't", "hadn't"], H: ["don't", "doesn't", "didn't", "can't", "won't", "isn't", "wasn't"] };
const EN9V_subj = c => c.split("'")[0].toLowerCase();
addBank(9, "english", "contractions", 0.22, function () {
  const [s, c, cat] = pick(EN9V_CSENT), long = s.match(/<u>(.*?)<\/u>/)[1];
  const pool = EN9V_CPOOL[cat].filter(x => x !== c && (cat[0] !== "s" || EN9V_subj(x) !== EN9V_subj(c)));
  return { q: `Which contraction can replace the underlined words?<div class="sentence">${s}</div>`, say: `Which contraction can replace ${long}? ${s.replace(/<\/?u>/g, "")}`, opts: shuffle([c, ...shuffle(pool).slice(0, 3)]), ans: c, big: 1, why: `${long} → ${c}. The apostrophe replaces the missing letters.`, key: "EN9V" + s, v22: { f: "con", long } };
});
whyRule(9, "english", "contractions", (q, picked) => {
  const v = q.v22; if (!v) return null;
  const p = xPlain(picked), l = EN9V_CLONG[p.toLowerCase()];
  if (!l || EN9V_low(l) === EN9V_low(v.long)) return null;
  return `“${p}” is short for “${l}”, not “${v.long}”.`;
});

/* ---------- Figurative Language: more sentences in the topic's own bank (read at call time) ---------- */
FIG.Simile.push("The puppy's ears were as soft as velvet.", "My brother eats like a hungry lion.", "The ice was as slippery as a wet fish.", "The tired runner was as slow as a snail.",
  "The moon glowed like a lantern in the sky.", "The kittens tumbled like socks in a dryer.", "The fresh snow sparkled like sugar.", "The kids buzzed around the room like bees.");
FIG.Metaphor.push("My backyard is a jungle in the summer.", "My cousin is a night owl.", "The bathtub was an ocean for my toy boats.", "Grandpa's garden is a candy store for bees.",
  "The test was a breeze.", "Dad's car is an icebox in winter.", "The hallway was a river of students.", "The crowded bus was a sardine can this morning.");
FIG.Personification.push("The rusty gate screamed when we opened it.", "The moon kept watch over the sleeping city.", "The tired old chair sighed when Grandpa sat down.", "The computer refused to turn on.",
  "The raindrops raced each other down the window.", "The sun yawned and slipped behind the hills.", "The waves tickled my toes.", "My pencil danced across the page.");
FIG.Hyperbole.push("My little brother takes a year to tie his shoes.", "My dad is the strongest man in the universe.", "This pencil is older than the dinosaurs.", "I've told you a thousand times to knock.",
  "We walked about a million steps at the zoo.", "That suitcase weighs more than a car.", "My little sister has a billion stuffed animals.", "I'm so thirsty I could drink a whole lake.");

/* ---------- Parts of Speech: more tagged sentences in the topic's own bank (read at call time) ---------- */
POS_S.push(["The|- playful|adjective kitten|noun chased|verb yarn|noun."], ["Leo|noun painted|verb a|- colorful|adjective mural|noun."], ["The|- noisy|adjective crowd|noun cheered|verb wildly|adverb."],
  ["Tall|adjective sunflowers|noun swayed|verb gently|adverb."], ["The|- busy|adjective chef|noun stirred|verb soup|noun."], ["Rosa|noun whispered|verb softly|adverb to|- her|- friend|noun."],
  ["The|- brave|adjective sailor|noun steered|verb carefully|adverb."], ["The|- small|adjective boat|noun drifted|verb slowly|adverb."], ["Wet|adjective dogs|noun shook|verb happily|adverb."],
  ["Our|- class|noun planted|verb tiny|adjective seeds|noun."]);

/* ---------- Homophones: [sentence, answer, [sound-alikes], meaning] ---------- */
const EN9V_HOMO = [
  ["I ate a juicy ___ for a snack.", "pear", ["pair"], "a sweet fruit"], ["I need a new ___ of socks.", "pair", ["pear"], "two things that go together"],
  ["The wind ___ my hat away.", "blew", ["blue"], "the past of blow"], ["The sky is bright ___ today.", "blue", ["blew"], "a color"],
  ["My puppy chased its own ___.", "tail", ["tale"], "the part at the back end of an animal"], ["Grandpa told us a funny ___ about a dragon.", "tale", ["tail"], "a story"],
  ["Squeeze the ___ to stop your bike.", "brake", ["break"], "the part that stops a wheel"], ["Be careful not to ___ the glass.", "break", ["brake"], "crack or smash"],
  ["We read the poem ___ to the class.", "aloud", ["allowed"], "out loud"], ["Dogs are not ___ in the store.", "allowed", ["aloud"], "let someone do something"],
  ["Mia ___ the bus by one minute.", "missed", ["mist"], "the past of miss"], ["A gray ___ hung over the lake.", "mist", ["missed"], "a light fog"],
  ["I have ___ that movie before.", "seen", ["scene"], "the past of see, used with have"], ["The last ___ of the play was the funniest.", "scene", ["seen"], "a part of a play or movie"],
  ["The nurse will ___ the baby on the scale.", "weigh", ["way"], "find out how heavy something is"], ["Which ___ is the library?", "way", ["weigh"], "a direction or path"],
  ["Please ___ the ball to me.", "roll", ["role"], "push so it turns over and over"], ["Kim got the main ___ in the play.", "role", ["roll"], "a part someone plays"],
  ["The old door will ___ when you open it.", "creak", ["creek"], "make a squeaky sound"], ["We waded across the shallow ___.", "creek", ["creak"], "a small stream"],
  ["The bus ___ is two dollars.", "fare", ["fair"], "the money paid for a ride"], ["We rode the Ferris wheel at the county ___.", "fair", ["fare"], "a big outdoor event with rides"],
  ["Mom will ___ some cheese for the tacos.", "grate", ["great"], "shred into tiny pieces"], ["You did a ___ job on your project!", "great", ["grate"], "very good"],
  ["Morning ___ sparkled on the grass.", "dew", ["due", "do"], "tiny drops of water"], ["Our library books are ___ on Friday.", "due", ["dew", "do"], "expected by a certain time"],
  ["Leo's voice was ___ after cheering all day.", "hoarse", ["horse"], "rough and scratchy"], ["The ___ galloped across the field.", "horse", ["hoarse"], "a big animal you can ride"],
  ["We will ___ a birdhouse this weekend.", "build", ["billed"], "make something by putting parts together"],
];
const EN9V_HMEAN = { pear: "a sweet fruit", pair: "two things that go together", blew: "the past of blow", blue: "a color", tail: "the back end of an animal", tale: "a story", brake: "the part that stops a wheel", break: "crack or smash", aloud: "out loud", allowed: "let someone do something", missed: "the past of miss", mist: "a light fog", seen: "the past of see", scene: "a part of a play or movie", weigh: "find out how heavy something is", way: "a direction or path", roll: "turn over and over", role: "a part someone plays", creak: "a squeaky sound", creek: "a small stream", fare: "the money paid for a ride", fair: "an event with rides, or treating people equally", grate: "shred into tiny pieces", great: "very good", dew: "tiny drops of water", due: "expected by a certain time", do: "carry out an action", hoarse: "rough and scratchy", horse: "a big animal you can ride", build: "make something", billed: "sent a bill" };
addBank(9, "english", "homophones", 0.19, function () {
  const [s, a, d, m] = pick(EN9V_HOMO);
  return { q: `<div class="sentence">${s.replace("___", '<span class="blank">___</span>')}</div>`, say: `Which word fits? ${s.replace("___", "blank")}`, opts: shuffle([a, ...d]), ans: a, big: 1, why: `"${a}" means ${m}.`, key: "EN9V" + s, v22: { f: "homo" } };
});
whyRule(9, "english", "homophones", (q, picked) => {
  const v = q.v22; if (!v) return null;
  const p = xPlain(picked), m = EN9V_HMEAN[p.toLowerCase()];
  if (!m || p === q.ans) return null;
  return `${xQ(p)} sounds the same, but it means ${m}, which doesn't fit here.`;
});

/* ---------- Idioms: [saying, meaning, [[wrong meaning, literal word or "opp"] ×3]] ---------- */
const EN9V_IDI = [
  ["Don't spill the beans about the surprise party.", "Don't give away the secret.", [["Don't drop beans on the floor.", "beans"], ["Don't eat all the beans.", "beans"], ["Tell everyone about it.", "opp"]]],
  ["Ella has a green thumb.", "Ella is good at growing plants.", [["Ella painted her thumb green.", "thumb"], ["Ella hurt her thumb.", "thumb"], ["Ella's plants always die.", "opp"]]],
  ["We're all in the same boat.", "We all have the same problem.", [["We are all sailing together.", "boat"], ["We all bought a boat.", "boat"], ["Only one of us has a problem.", "opp"]]],
  ["Let's call it a day.", "Let's stop working for now.", [["Let's give the day a name.", "call"], ["Let's phone the day.", "call"], ["Let's keep working all night.", "opp"]]],
  ["Keep your chin up!", "Stay cheerful and don't give up.", [["Lift your head toward the sky.", "chin"], ["Don't touch your chin.", "chin"], ["Feel sad and give up.", "opp"]]],
  ["Max got cold feet before the race.", "Max got nervous and wanted to back out.", [["Max's toes were freezing.", "cold feet"], ["Max forgot his socks.", "feet"], ["Max felt brave and ready.", "opp"]]],
  ["You're barking up the wrong tree.", "You're blaming the wrong person.", [["You're a dog under a tree.", "barking"], ["You're climbing the wrong tree.", "tree"], ["You've picked the right person.", "opp"]]],
  ["I'm still learning the ropes at my new school.", "I'm still learning how things work.", [["I'm learning to tie knots.", "ropes"], ["I'm learning to jump rope.", "ropes"], ["I already know everything here.", "opp"]]],
  ["Dad said we'll play it by ear.", "We'll decide as we go.", [["We'll play music by listening.", "play"], ["We'll hold the game near our ears.", "ear"], ["We'll make a careful plan now.", "opp"]]],
  ["Don't cry over spilled milk.", "Don't get upset about what can't be fixed.", [["Don't spill your milk.", "milk"], ["Clean up the milk right away.", "spilled milk"], ["Stay upset about it forever.", "opp"]]],
  ["Grandma has a sweet tooth.", "Grandma loves sweet foods.", [["Grandma's tooth tastes like candy.", "sweet tooth"], ["Grandma has only one tooth.", "tooth"], ["Grandma never eats sweets.", "opp"]]],
  ["That was the last straw!", "I can't take any more!", [["That was my last drinking straw.", "straw"], ["There is no more hay.", "straw"], ["I can take lots more.", "opp"]]],
  ["Losing the game was a blessing in disguise.", "It seemed bad but turned out to be good.", [["The game wore a costume.", "disguise"], ["Someone hid behind a mask.", "disguise"], ["It was bad in every way.", "opp"]]],
  ["The new kid was cool as a cucumber.", "The new kid was very calm.", [["The new kid was cold and green.", "cucumber"], ["The new kid ate a cucumber.", "cucumber"], ["The new kid was very nervous.", "opp"]]],
  ["Our new coach hit the ground running.", "Our coach started working hard right away.", [["Our coach fell while jogging.", "ground"], ["Our coach ran on the grass.", "running"], ["Our coach was slow to get started.", "opp"]]],
];
const EN9V_meanLc = m => /^(I\b|I'm|Ella|Max|Grandma|Our|We)\b/.test(m) ? EN9V_noDot(m) : m.charAt(0).toLowerCase() + EN9V_noDot(m).slice(1);
addBank(9, "english", "idioms", 0.2, function () {
  const i = R(0, EN9V_IDI.length - 1), [s, m, d] = EN9V_IDI[i];
  if (Math.random() < 0.5) {
    const r = {}; d.forEach(([t, w]) => { r[t] = w; });
    return { q: "What does this idiom mean?", say: `What does this idiom mean? ${s}`, vis: `<div class="quote">${s}</div>`, opts: shuffle([m, ...d.map(x => x[0])]), ans: m, why: `"${s}" means: ${m}`, key: "EN9Va" + s, v22: { f: "idA", r } };
  }
  const others = shuffle(EN9V_IDI.filter((_, j) => j !== i)).slice(0, 3).map(x => x[0]);
  return { q: `Which idiom means <b>"${m}"</b>?`, say: `Which idiom means: ${m}`, opts: shuffle([s, ...others]), ans: s, why: `"${s}" means: ${m}`, key: "EN9Vb" + s, v22: { f: "idB" } };
});
whyRule(9, "english", "idioms", (q, picked) => {
  const v = q.v22; if (!v) return null;
  const p = xPlain(picked);
  if (v.f === "idA") { const w = v.r[p]; if (!w) return null; return w === "opp" ? "That is the opposite of what this saying means." : `That takes “${w}” literally, but an idiom's words don't mean exactly what they say.`; }
  if (v.f === "idB") { const o = EN9V_IDI.find(x => x[0] === p); if (!o || p === q.ans) return null; return `“${EN9V_noDot(o[0])}” means ${EN9V_meanLc(o[1])}.`; }
  return null;
});

/* ---------- Linking Words: [sentence, answer, wrong words] ---------- */
const EN9V_LINK = [
  ["Jen put on her helmet ___ she rode her bike.", "before", ["or", "but", "although"]], ["The baby giggled ___ the puppy licked her toes.", "when", ["or", "but", "although"]],
  ["I wanted to go swimming, ___ the pool was closed.", "but", ["so", "or", "because"]], ["The music was too loud, ___ we turned it down.", "so", ["or", "because", "until"]],
  ["Would you like soup ___ salad with your lunch?", "or", ["because", "so", "until"]], ["Kim fed the fish ___ watered the plants.", "and", ["because", "so", "until"]],
  ["We wore sunglasses ___ the sun was so bright.", "because", ["or", "but", "until"]], ["The cat stretched ___ it woke up from its nap.", "after", ["or", "but", "although"]],
  ["Keep stirring the soup ___ it starts to bubble.", "until", ["or", "because", "but"]], ["You can play outside ___ you finish your chores.", "after", ["but", "or", "although"]],
  ["___ it was cold, Dev still wore shorts.", "Although", ["Because", "So", "Or"]], ["Mom listened to music ___ she painted the fence.", "while", ["or", "so", "but"]],
  ["The phone battery died, ___ I couldn't call Grandpa.", "so", ["or", "because", "until"]], ["We can take the bus ___ walk to the museum.", "or", ["because", "so", "until"]],
  ["Theo forgot his coat, ___ he was cold at recess.", "so", ["or", "because", "until"]], ["The library was closed ___ it was a holiday.", "because", ["or", "but", "until"]],
  ["I finished my homework, ___ I still had time to read.", "and", ["because", "or", "until"]], ["The tomatoes will turn red ___ they get enough sun.", "if", ["but", "or", "so"]],
  ["Wash your hands ___ you eat dinner.", "before", ["or", "but", "so"]], ["The puppy was small, ___ it had a big bark.", "but", ["so", "or", "because"]],
  ["We sang songs ___ we waited for the bus.", "while", ["or", "so", "but"]], ["Ella studied the map ___ she would not get lost.", "so", ["or", "but", "until"]],
  ["Nina felt proud ___ she finished the puzzle.", "when", ["or", "but", "although"]], ["The kids stayed in the pool ___ the lifeguard blew the whistle.", "until", ["or", "because", "so"]],
  ["I will bring a jacket ___ it gets chilly tonight.", "if", ["but", "or", "so"]], ["Sam likes to draw dragons ___ castles.", "and", ["because", "so", "until"]],
  ["The bread smelled great, ___ it was too hot to eat yet.", "but", ["so", "or", "because"]], ["Aria hugged her grandma ___ she got off the plane.", "when", ["or", "but", "although"]],
  ["The field was muddy, ___ the game went on anyway.", "but", ["so", "or", "because"]], ["Turn off the water ___ you brush your teeth.", "while", ["or", "so", "but"]],
  ["Do you want to sit by the window ___ by the door?", "or", ["because", "so", "until"]], ["The leaves fell off the trees ___ winter came.", "before", ["or", "but", "so"]],
  ["Jake was hungry ___ he skipped breakfast.", "because", ["or", "until", "so"]], ["We clapped ___ the band finished the song.", "when", ["or", "but", "although"]],
  ["The car was dirty, ___ we washed it.", "so", ["or", "because", "until"]], ["You may have an apple ___ a pear.", "or", ["because", "so", "until"]],
  ["The baby slept ___ we drove home.", "while", ["or", "so", "but"]], ["Lucy waited by the door ___ her friend arrived.", "until", ["or", "because", "so"]],
];
const EN9V_LJOB = { and: "adding one more idea", but: "showing a contrast or surprise", so: "showing a result", because: "giving a reason", or: "giving a choice", before: "showing what comes first", after: "showing what comes later", when: "telling the time something happens", until: "showing when something stops", if: "showing that one thing depends on another", although: "showing a surprise", while: "showing two things at the same time" };
const EN9V_LWHY = { and: "And adds one more idea.", but: "But shows a contrast or surprise.", so: "So shows a result.", because: "Because gives a reason.", or: "Or gives a choice.", before: "Before shows what happens first.", after: "After shows what happens later.", when: "When tells the time something happens.", until: "Until shows when something stops.", if: "If shows that one thing depends on another.", although: "Although shows a surprise between two ideas.", while: "While shows two things happening at the same time." };
addBank(9, "english", "linking", 0.26, function () {
  const [s, a, d] = pick(EN9V_LINK);
  return { q: `<div class="sentence">${s.replace("___", '<span class="blank">___</span>')}</div>Which linking word fits best?`, say: `${s.replace("___", "blank")} Which linking word fits best?`, opts: shuffle([a, ...d]), ans: a, big: 1, why: `${EN9V_LWHY[a.toLowerCase()]} ${s.replace("___", a)}`, key: "EN9V" + s, v22: { f: "link", d } };
});
whyRule(9, "english", "linking", (q, picked) => {
  const v = q.v22; if (!v) return null;
  const p = xPlain(picked), j = EN9V_LJOB[p.toLowerCase()];
  if (!j || !v.d.includes(p)) return null;
  return `${xQ(p)} is for ${j}, and that's not how these two ideas connect.`;
});

/* ---------- Prepositions: [sentence, preposition, [[other word, job] ×3], where/when] ---------- */
const EN9V_PREP = [
  ["The ducks swam across the pond.", "across", [["ducks", "noun"], ["swam", "verb"], ["pond", "noun"]], "where"],
  ["Nia found her shoe under the couch.", "under", [["Nia", "name"], ["found", "verb"], ["shoe", "noun"]], "where"],
  ["The bees buzzed around the flowers.", "around", [["bees", "noun"], ["buzzed", "verb"], ["flowers", "noun"]], "where"],
  ["The twins stood behind their mom.", "behind", [["twins", "noun"], ["stood", "verb"], ["mom", "noun"]], "where"],
  ["An owl perched above the door.", "above", [["owl", "noun"], ["perched", "verb"], ["door", "noun"]], "where"],
  ["The train rushed through the tunnel.", "through", [["train", "noun"], ["rushed", "verb"], ["tunnel", "noun"]], "where"],
  ["Dad parked the car near the gate.", "near", [["Dad", "name"], ["parked", "verb"], ["gate", "noun"]], "where"],
  ["The puppy slept beside its owner.", "beside", [["puppy", "noun"], ["slept", "verb"], ["owner", "noun"]], "where"],
  ["The cat leaped onto the counter.", "onto", [["cat", "noun"], ["leaped", "verb"], ["counter", "noun"]], "where"],
  ["We read stories after dinner.", "after", [["read", "verb"], ["stories", "noun"], ["dinner", "noun"]], "when"],
  ["The bakery opens before sunrise.", "before", [["bakery", "noun"], ["opens", "verb"], ["sunrise", "noun"]], "when"],
  ["Liam stayed awake during the storm.", "during", [["Liam", "name"], ["stayed", "verb"], ["storm", "noun"]], "when"],
  ["The pool is closed until June.", "until", [["pool", "noun"], ["is", "being"], ["June", "noun"]], "when"],
  ["Our family eats pancakes on Sundays.", "on", [["family", "noun"], ["eats", "verb"], ["pancakes", "noun"]], "when"],
  ["The owls hoot at night.", "at", [["owls", "noun"], ["hoot", "verb"], ["night", "noun"]], "when"],
  ["Ari has played piano since kindergarten.", "since", [["Ari", "name"], ["played", "verb"], ["piano", "noun"]], "when"],
];
addBank(9, "english", "prepositions", 0.2, function () {
  const [s, a, d, t] = pick(EN9V_PREP);
  if (Math.random() < 0.5) { const jobs = {}; d.forEach(([w, j]) => { jobs[w] = j; }); return { q: `Which word is the <b>preposition</b>?<div class="sentence">${s}</div>`, say: `Which word is the preposition? ${s}`, opts: shuffle([a, ...d.map(x => x[0])]), ans: a, big: 1, why: `${cap(a)} tells ${t} in this sentence.`, key: "EN9Vp" + s, v22: { f: "prW", jobs } }; }
  const ph = a + s.slice(s.indexOf(" " + a + " ") + a.length + 1).replace(/[.!?]$/, "");
  return { q: `Does the preposition <b>${a}</b> tell where or when?<div class="sentence">${hlWord(s, a)}</div>`, say: `In this sentence, does the preposition ${a} tell where or when? ${s}`, opts: ["where", "when"], ans: t, big: 1, why: t === "where" ? `${cap(a)} tells where something is or goes.` : `${cap(a)} tells when something happens.`, key: "EN9Vw" + s, v22: { f: "prT", ph, t } };
});
whyRule(9, "english", "prepositions", (q, picked) => {
  const v = q.v22; if (!v) return null;
  const p = xPlain(picked);
  if (v.f === "prW") return v.jobs[p] ? EN9V_JOBTXT[v.jobs[p]](p) : null;
  if (v.f === "prT" && (p === "where" || p === "when") && p !== v.t) return v.t === "where" ? `“${v.ph}” is about a place, not a time.` : `“${v.ph}” is about a time, not a place.`;
  return null;
});

/* ---------- Main Idea & Inference: new original passages, each wrong choice with a checked reason ---------- */
const EN9V_PASS = [
  { p: "Every fall, monarch butterflies fly south to Mexico. Some travel more than two thousand miles. They cannot make the whole trip on stored fat alone, so they stop to drink nectar from flowers along the way. When they arrive, millions of monarchs rest together on the branches of fir trees, covering them like orange blankets.", qs: [
    ["What is this passage mostly about?", "the long trip monarch butterflies make", [["how to grow flowers", "The passage never explains how to grow flowers."], ["why fir trees are green", "The passage never says why fir trees are green."], ["what butterflies like to eat best", "Nectar is one small detail; the passage is about the long trip."]], "The passage follows the monarchs from the start of their trip to where they rest."],
    ["Why do monarchs stop at flowers on the way?", "to drink nectar", [["to lay their eggs", "The passage never says they lay eggs on the trip."], ["to hide from the rain", "The passage never mentions rain."], ["to sleep for the winter", "They rest on fir trees when they arrive, not at the flowers."]], "The passage says they \"stop to drink nectar from flowers along the way.\""],
    ["Where do the monarchs rest when they arrive?", "on the branches of fir trees", [["inside flowers", "Flowers are where they drink on the way, not where they rest."], ["on sandy beaches", "The passage never mentions beaches."], ["under rocks", "The passage never mentions rocks."]], "The passage says they \"rest together on the branches of fir trees.\""],
    ["What does the passage compare the resting monarchs to?", "orange blankets", [["green leaves", "The passage says \"like orange blankets,\" not leaves."], ["falling snow", "The passage never mentions snow."], ["a flock of birds", "The passage never mentions birds."]], "The passage says the monarchs cover the trees \"like orange blankets.\""]] },
  { p: "Tomas wanted to give his mom a birthday present, but he had only two dollars. He thought for a while. Then he gathered colored paper, glue and markers. All afternoon he worked at the kitchen table, folding and gluing. When his mom came home, Tomas handed her a bouquet of paper flowers. She held it up to the light and smiled so wide that her eyes crinkled.", qs: [
    ["What was Tomas's problem?", "He didn't have much money for a present.", [["He forgot his mom's birthday.", "He was planning a present, so he remembered her birthday."], ["He lost his markers.", "He gathered markers to use, so they weren't lost."], ["His mom was not coming home.", "His mom came home at the end of the story."]], "The passage says \"he had only two dollars.\""],
    ["What did Tomas make?", "a bouquet of paper flowers", [["a birthday cake", "The passage never mentions a cake."], ["a card with a poem", "The passage never mentions a card or a poem."], ["a clay vase", "He used paper, glue and markers, not clay."]], "The passage says \"Tomas handed her a bouquet of paper flowers.\""],
    ["How did Mom feel about the present?", "She loved it.", [["She was disappointed.", "She smiled so wide her eyes crinkled, so she wasn't disappointed."], ["She was confused by it.", "Her huge smile shows she understood and liked it."], ["She wanted to return it.", "Her huge smile shows she wanted to keep it."]], "She \"smiled so wide that her eyes crinkled.\""],
    ["Which word best describes Tomas?", "creative", [["lazy", "He worked all afternoon, so he wasn't lazy."], ["careless", "He folded and glued all afternoon, which takes care."], ["selfish", "He spent his afternoon making a gift for his mom."]], "With only two dollars, he made a gift out of paper, glue and markers."]] },
  { p: "A desert can be hot or cold. What makes a place a desert is how little rain or snow it gets. Most deserts get less than ten inches of rain a year. The largest desert in the world is actually Antarctica! It is covered in ice, but very little new snow falls there each year.", qs: [
    ["What is the main idea?", "A desert is a place that gets very little rain or snow.", [["Deserts are always hot and sandy.", "The first sentence says \"A desert can be hot or cold.\""], ["Antarctica is covered in ice.", "That is one detail; the passage is about what makes a desert."], ["Snow is fun to play in.", "The passage never talks about playing in snow."]], "The passage says \"What makes a place a desert is how little rain or snow it gets.\""],
    ["What makes a place a desert?", "how little rain or snow it gets", [["how hot it is", "The passage says deserts can be hot or cold, so heat isn't what counts."], ["how much sand it has", "The passage never says sand makes a desert."], ["how many animals live there", "The passage never mentions animals."]], "The passage says \"What makes a place a desert is how little rain or snow it gets.\""],
    ["Which is the largest desert in the world?", "Antarctica", [["the Sahara", "The passage never mentions the Sahara; it names Antarctica."], ["the Pacific Ocean", "An ocean is not a desert; the passage names Antarctica."], ["a rain forest", "A rain forest gets lots of rain, so it can't be a desert."]], "The passage says \"The largest desert in the world is actually Antarctica!\""],
    ["Why is Antarctica a desert even though it is covered in ice?", "Very little new snow falls there.", [["It is very hot there.", "It is covered in ice, so it isn't hot."], ["It has lots of sand.", "The passage says it is covered in ice, not sand."], ["It snows there every day.", "The passage says very little new snow falls there."]], "The passage says \"very little new snow falls there each year.\""]] },
  { p: "On Saturday, Imani and her dad went to the farmers market. Imani carried the shopping list and checked off each item. They bought everything on the list: peaches, green beans and a jar of honey. At the last stand, Imani spotted fresh strawberries, which were not on the list. Dad looked at the list, then at Imani's hopeful face, and laughed. \"I guess we can add one more thing,\" he said.", qs: [
    ["What was Imani's job at the market?", "carrying the list and checking off items", [["paying for the food", "The passage never says Imani paid for anything."], ["picking peaches from trees", "They bought peaches at the market; nobody picked them."], ["selling honey at a stand", "They bought the honey; Imani didn't sell anything."]], "The passage says \"Imani carried the shopping list and checked off each item.\""],
    ["What will Dad most likely do next?", "buy the strawberries", [["go home without strawberries", "Dad said \"we can add one more thing,\" so he will buy them."], ["give back the peaches", "Dad is adding something, not giving anything back."], ["throw away the list", "Dad is happy to add to the list, not get rid of it."]], "Dad laughed and said, \"I guess we can add one more thing.\""],
    ["How did Imani feel when she saw the strawberries?", "hopeful", [["angry", "The passage describes her \"hopeful face,\" not an angry one."], ["bored", "The passage describes her \"hopeful face,\" not a bored one."], ["scared", "The passage describes her \"hopeful face,\" not a scared one."]], "The passage says Dad looked at \"Imani's hopeful face.\""],
    ["Which item was NOT on the shopping list?", "strawberries", [["peaches", "Peaches were on the list; they bought everything on it."], ["green beans", "Green beans were on the list; they bought everything on it."], ["honey", "Honey was on the list; they bought everything on it."]], "The passage says the strawberries \"were not on the list.\""]] },
  { p: "Bats are not blind, but many of them find food in the dark by using sound. A bat makes high squeaks and then listens for the echoes that bounce back. The echoes tell the bat how far away an insect is and which way it is flying. This is called echolocation. Some bats can catch hundreds of insects in a single hour.", qs: [
    ["What is the main idea?", "Many bats use sound to find food in the dark.", [["Bats are blind.", "The first sentence says \"Bats are not blind.\""], ["Echoes are very loud.", "The passage never says echoes are loud."], ["Bats sleep all day.", "The passage never talks about when bats sleep."]], "The first sentence says many bats \"find food in the dark by using sound.\""],
    ["What is echolocation?", "finding things by listening to echoes", [["seeing in the dark with big eyes", "The passage says bats use sound, not their eyes, for this."], ["flying in a straight line", "The passage never says that; echolocation is about sound."], ["sleeping upside down", "The passage never mentions sleeping upside down."]], "A bat squeaks and \"listens for the echoes that bounce back. This is called echolocation.\""],
    ["What do the echoes tell a bat?", "how far away an insect is", [["what time it is", "The passage never says echoes tell the time."], ["where its cave is", "The passage never mentions a cave."], ["when the sun will rise", "The passage never mentions the sun."]], "The passage says \"The echoes tell the bat how far away an insect is.\""],
    ["What does a bat do first to find an insect?", "It makes high squeaks.", [["It listens for echoes.", "It listens for echoes after it squeaks, not first."], ["It catches the insect.", "Catching comes last, after squeaking and listening."], ["It flaps its wings loudly.", "The passage says it makes squeaks, not loud flapping."]], "The passage says \"A bat makes high squeaks and then listens for the echoes.\""]] },
  { p: "Wren had never been to the ocean. When the car rounded the last curve, she pressed her nose to the window. The water stretched all the way to the sky, sparkling silver and blue. Wren didn't say a word. She just kept staring, as if she were afraid it might disappear if she looked away.", qs: [
    ["How did Wren feel when she saw the ocean?", "amazed", [["bored", "She pressed her nose to the window and kept staring, so she wasn't bored."], ["angry", "Pressing her nose to the window shows wonder, not anger."], ["sleepy", "She kept staring out the window, so she was wide awake."]], "She \"pressed her nose to the window\" and \"just kept staring.\""],
    ["Why didn't Wren say a word?", "She was too amazed to talk.", [["She was angry at her family.", "Nothing in the passage shows Wren was upset with anyone."], ["She was asleep.", "She was staring out the window, so she was awake."], ["She had a sore throat.", "The passage never mentions a sore throat."]], "She \"just kept staring,\" as if she didn't want to look away."],
    ["Had Wren seen the ocean before?", "No, this was her first time.", [["Yes, she sees it every day.", "The first sentence says \"Wren had never been to the ocean.\""], ["Yes, but only in winter.", "The first sentence says \"Wren had never been to the ocean.\""], ["Yes, she lives next to it.", "The first sentence says \"Wren had never been to the ocean.\""]], "The first sentence says \"Wren had never been to the ocean.\""],
    ["What did the water look like?", "sparkling silver and blue", [["dark and stormy", "The passage says the water was \"sparkling silver and blue.\""], ["muddy brown", "The passage says the water was \"sparkling silver and blue.\""], ["green and still", "The passage says the water was \"sparkling silver and blue.\""]], "The passage says the water was \"sparkling silver and blue.\""]] },
  { p: "Long ago, people wrote with feathers called quills. A writer dipped the sharp tip of a quill into ink, wrote a few words, and then dipped it again. Quills wore down quickly, so writers had to trim the tips with a small knife. That small knife became known as a penknife, a name people still use today.", qs: [
    ["What is this passage mostly about?", "how people wrote with quills long ago", [["how birds grow feathers", "The passage never explains how birds grow feathers."], ["why ink is black", "The passage never says what color ink is."], ["how to make paper", "The passage never mentions making paper."]], "Every sentence tells something about writing with quills."],
    ["Why did writers trim the tips of their quills?", "The quills wore down quickly.", [["to make the feathers prettier", "The passage says they trimmed because quills \"wore down quickly.\""], ["to make the ink dry faster", "The passage says they trimmed because quills \"wore down quickly.\""], ["because their knives were new", "The passage says they trimmed because quills \"wore down quickly.\""]], "The passage says \"Quills wore down quickly, so writers had to trim the tips.\""],
    ["Where does the name penknife come from?", "the knife used to trim quills", [["a knife shaped like a pen", "It was named for trimming quills, not for its shape."], ["a pen with a knife inside", "The passage says it was a small knife for trimming quill tips."], ["the name of a famous writer", "The passage never mentions a writer's name."]], "The passage says \"That small knife became known as a penknife.\""],
    ["What did a writer do right after dipping the quill in ink?", "wrote a few words", [["trimmed the tip", "Trimming was only needed when quills wore down; after dipping, they wrote."], ["washed the quill", "The passage never mentions washing the quill."], ["picked a new feather", "The passage never mentions picking new feathers."]], "The passage says a writer \"dipped the sharp tip of a quill into ink, wrote a few words.\""]] },
];
addBank(9, "english", "reading9", 0.2, function () {
  const i = R(0, EN9V_PASS.length - 1), P = EN9V_PASS[i], [q, a, d, why] = pick(P.qs), r = {};
  d.forEach(([t, rs]) => { r[t] = rs; });
  return { q, vis: passage(P.p), say: `${P.p} ${q}`, opts: shuffle([a, ...d.map(x => x[0])]), ans: a, why, extra: 25, key: "EN9Vr" + i + q, v22: { f: "read", r } };
});
whyRule(9, "english", "reading9", (q, picked) => {
  const v = q.v22; if (!v) return null;
  return v.r[xPlain(picked)] || v.r[picked] || null;
});

/* ---------- Word Roots: [root, meaning, words] ---------- */
const EN9V_ROOTS = [
  ["spect", "look", ["inspect", "spectator", "spectacles"]], ["tract", "pull", ["tractor", "attract", "subtract"]], ["loc", "place", ["location", "local", "locate"]],
  ["pop", "people", ["population", "popular"]], ["voc", "voice or call", ["vocal", "vocabulary"]], ["pend", "hang", ["pendant", "pendulum", "suspend"]],
  ["dent", "tooth", ["dentist", "dental"]], ["nov", "new", ["novel", "renovate", "novice"]], ["kilo", "thousand", ["kilogram", "kilometer"]],
];
addBank(9, "english", "roots", 0.2, function () {
  const i = R(0, EN9V_ROOTS.length - 1), [r, m, ws] = EN9V_ROOTS[i], w = pick(ws), others = shuffle(EN9V_ROOTS.filter((_, j) => j !== i));
  if (Math.random() < 0.5) return { q: `The root <b>${r}</b> means…`, say: `The root ${r.split("").join(" ")}, like in ${w}, means what?`, vis: hw(w.replace(r, `<b class="hl">${r}</b>`)), opts: shuffle([m, ...others.slice(0, 3).map(o => o[1])]), ans: m, why: `${r} means ${m}, like in ${ws.join(", ")}.`, key: "EN9Vm" + r + w, v22: { f: "rtM", r } };
  const wrongs = shuffle(others.flatMap(o => o[2]).filter(x => !x.includes(r))).slice(0, 3);
  return { q: `Which word has the root meaning <b>${m}</b>?`, say: `Which word has the root meaning ${m}?`, opts: shuffle([w, ...wrongs]), ans: w, big: 1, why: `${w} has ${r}, which means ${m}.`, key: "EN9Vw" + r + w, v22: { f: "rtW", r, m } };
});
whyRule(9, "english", "roots", (q, picked) => {
  const v = q.v22; if (!v) return null;
  const p = xPlain(picked);
  if (v.f === "rtM") { const o = EN9V_ROOTS.find(x => x[1] === p); if (!o || o[0] === v.r) return null; return `“${p}” is what ${o[0]} means, like in ${o[2][0]}.`; }
  if (v.f === "rtW") { const o = EN9V_ROOTS.find(x => x[2].includes(p)); if (!o || o[0] === v.r || p.includes(v.r)) return null; return `“${p}” has ${o[0]}, which means ${o[1]}, not ${v.m}.`; }
  return null;
});

/* ---------- Suffixes: [word, base, suffix, meaning] ---------- */
const EN9V_SM = { ful: "full of", less: "without", ly: "in a certain way", ness: "the state of being", er: "a person who", able: "able to be", ment: "the act of" };
const EN9V_SUFF = [
  ["thankful", "thank", "ful", "full of thanks"], ["colorful", "color", "ful", "full of color"], ["restful", "rest", "ful", "full of rest"], ["wonderful", "wonder", "ful", "full of wonder"],
  ["colorless", "color", "less", "without color"], ["breathless", "breath", "less", "without breath"], ["useless", "use", "less", "without use"], ["painless", "pain", "less", "without pain"],
  ["loudly", "loud", "ly", "in a loud way"], ["gladly", "glad", "ly", "in a glad way"], ["calmly", "calm", "ly", "in a calm way"], ["warmly", "warm", "ly", "in a warm way"],
  ["sadness", "sad", "ness", "being sad"], ["thickness", "thick", "ness", "being thick"], ["freshness", "fresh", "ness", "being fresh"], ["emptiness", "empty", "ness", "being empty"],
  ["singer", "sing", "er", "a person who sings"], ["player", "play", "er", "a person who plays"], ["driver", "drive", "er", "a person who drives"], ["runner", "run", "er", "a person who runs"],
  ["lovable", "love", "able", "able to be loved"], ["movable", "move", "able", "able to be moved"], ["foldable", "fold", "able", "able to be folded"], ["stretchable", "stretch", "able", "able to be stretched"],
  ["placement", "place", "ment", "the act of placing"], ["shipment", "ship", "ment", "the act of shipping"], ["enjoyment", "enjoy", "ment", "the act of enjoying"],
];
addBank(9, "english", "suffixes", 0.3, function () {
  const [w, b, s, m] = pick(EN9V_SUFF);
  if (Math.random() < 0.5) {
    const others = shuffle(EN9V_SUFF.filter(x => x[2] !== s)).filter((x, i, a) => a.findIndex(y => y[2] === x[2]) === i).slice(0, 3).map(x => x[3]);
    return { q: `What does <b>${w}</b> mean?`, say: `What does ${w} mean?`, opts: shuffle([m, ...others]), ans: m, why: `-${s} means "${EN9V_SM[s]}", so ${w} means ${m}.`, key: "EN9Vm" + w, v22: { f: "sfM", w, s } };
  }
  const opts = shuffle(Object.keys(EN9V_SM).filter(x => x !== s)).slice(0, 3).concat(s).map(x => "-" + x);
  return { q: `Which suffix turns <b>${b}</b> into a word that means <b>"${m}"</b>?`, say: `Which suffix turns ${b} into a word that means ${m}?`, opts: shuffle(opts), ans: "-" + s, big: 1, why: `${b} + -${s} makes ${w}, which means ${m}.`, key: "EN9Vs" + w, v22: { f: "sfS", m } };
});
whyRule(9, "english", "suffixes", (q, picked) => {
  const v = q.v22; if (!v) return null;
  const p = xPlain(picked);
  if (v.f === "sfM") { const hit = EN9V_SUFF.find(x => x[3] === p); if (!hit || hit[2] === v.s) return null; return `${cap(p)} would be ${hit[0]}, with -${hit[2]}; ${v.w} ends in -${v.s}.`; }
  if (v.f === "sfS") { const ps = p.replace(/^-/, ""); if (!EN9V_SM[ps] || "-" + ps === q.ans) return null; return `-${ps} means "${EN9V_SM[ps]}", which doesn't match "${v.m}".`; }
  return null;
});

