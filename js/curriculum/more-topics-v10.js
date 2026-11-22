/* =====================================================================
   More topics for Reading & English, Math and Logic (v10)
   ===================================================================== */
const TRICK_ADD = (age, subj, id, txt) => { TRICKS[age][subj][id] = txt; };

/* ====================== ENGLISH ====================== */
const FAMS = { at: ["cat", "hat", "bat", "mat", "rat", "sat"], an: ["can", "fan", "man", "pan", "van", "ran"], op: ["hop", "mop", "top", "pop", "stop"], ig: ["big", "dig", "pig", "wig", "fig"], ug: ["bug", "hug", "mug", "rug", "jug"], et: ["jet", "net", "pet", "wet", "vet"], in: ["bin", "fin", "pin", "win", "tin"] };
const FAM_PIC = { cat: "🐱", hat: "🎩", bat: "🦇", fan: "🪭", man: "👨", pan: "🍳", van: "🚐", mop: "🧹", top: "🔝", pig: "🐷", wig: "💇", bug: "🐛", hug: "🤗", mug: "☕", jet: "🛩️", net: "🥅", pet: "🐶", vet: "🧑‍⚕️", pin: "📌", bin: "🗑️", fin: "🦈" };
topic(6, "english", {
  id: "wordfam", title: "Word Families", icon: "🏠", blurb: "Words that end the same way, like cat and hat.",
  lesson: [
    { t: "Word families", say: "A word family is a group of words with the same ending. Cat, hat and bat are all in the A T family.", html: `<div class="fam-house"><div class="roof">-at</div><div class="chips">${["cat", "hat", "bat", "mat"].map(w => chip(`${w[0]}<b class="hl">at</b>`, w, "lg")).join("")}</div></div>` },
    { t: "Change the first letter", say: "Keep the ending and change the first letter to make a new word. P, I, G is pig. Change P to B and you get big!", html: row(hw(`<b class="noun">p</b>ig`), arrow(), hw(`<b class="noun">b</b>ig`), arrow(), hw(`<b class="noun">w</b>ig`)) },
    { t: "More families", say: "Here are more families: an, op, ug, and et. Tap a word to hear it.", html: `<div class="chips">${["fan", "mop", "bug", "jet", "pin"].map(w => chip(`${w[0]}<b class="hl">${w.slice(1)}</b>`, w, "lg")).join("")}</div>` },
  ],
  gen() {
    const fams = Object.keys(FAMS), f = pick(fams), w = pick(FAMS[f]);
    if (Math.random() < 0.5) {
      const others = shuffle(fams.filter(x => x !== f)).slice(0, 3).map(x => pick(FAMS[x]));
      return { q: `Which word is in the <b>-${f}</b> family?`, say: `Which word is in the ${f.split("").join(" ")} family?`, vis: `<div class="fam-house"><div class="roof">-${f}</div></div>`, opts: shuffle([w, ...others]), ans: w, big: 1, why: `${cap(w)} ends with ${f}, just like the rest of the ${f} family.`, key: "a" + f + w };
    }
    const pic = FAM_PIC[w];
    return { q: "Which family does this word belong to?", say: `Which family does ${w} belong to?`, vis: col(pic ? bigEmo(pic) : "", hw(w)), opts: shuffle([f, ...shuffle(fams.filter(x => x !== f)).slice(0, 3)]).map(x => "-" + x), ans: "-" + f, big: 1, why: `${cap(w)} ends with ${f}.`, key: "b" + w };
  },
});
TRICK_ADD(6, "english", "wordfam", "Cover the first letter with your finger. The part left over is the family name.");

const ACTIONS = [["🏃", "run"], ["🏊", "swim"], ["😴", "sleep"], ["😋", "eat"], ["📖", "read"], ["✍️", "write"], ["🎤", "sing"], ["💃", "dance"], ["🚴", "ride"], ["🧗", "climb"], ["👏", "clap"], ["🎨", "paint"], ["⚽", "kick"], ["🧹", "sweep"], ["👋", "wave"], ["🛹", "skate"], ["🤸", "flip"], ["🍳", "cook"]];
const THINGWORDS = ["ball", "tree", "cat", "book", "car", "cup", "hat", "bed", "sun", "door", "apple", "chair"];
topic(6, "english", {
  id: "actionwords", title: "Action Words", icon: "🏃", blurb: "Words that tell what someone does.",
  lesson: [
    { t: "Words you can do", say: "Some words tell what you do. Run, jump, swim, and sing are action words. Can you do them?", html: pics2(ACTIONS.slice(0, 4)) },
    { t: "Act it out", say: "Try it! Stand up and clap. Wave your hand. Pretend to swim. Those are all action words.", html: pics2([["👏", "clap"], ["👋", "wave"], ["🏊", "swim"]]) },
    { t: "Action or thing?", say: "Ball is a thing. Kick is an action. You can kick a ball! Ask yourself: can I do it?", html: row(col(bigEmo("⚽"), hw("ball")), col(bigEmo("🦵"), hw(`<b class="verb">kick</b>`))) + note("Can I <b>do</b> it? Then it's an action word.") },
  ],
  gen() {
    const a = pick(ACTIONS);
    if (Math.random() < 0.55) return { q: "What is the action?", say: "What action does this picture show?", vis: `<span class="emo" style="font-size:96px">${a[0]}</span>`, opts: shuffle([a[1], ...shuffle(ACTIONS.filter(x => x !== a)).slice(0, 3).map(x => x[1])]), ans: a[1], big: 1, why: `The picture shows the action word “${a[1]}.”`, key: "p" + a[1] };
    return { q: "Which word is an <b>action</b> you can do?", say: "Which word is an action you can do?", opts: shuffle([a[1], ...shuffle(THINGWORDS).slice(0, 3)]), ans: a[1], big: 1, why: `You can ${a[1]}! The other words name things.`, key: "w" + a[1] };
  },
});
TRICK_ADD(6, "english", "actionwords", "Put “I can” in front of the word. If “I can run” makes sense, it's an action word.");
function pics2(list) { return `<div class="card-grid">${list.map(([e, w]) => picCard(e, w, w)).join("")}</div>`; }

const SENT_OK = ["The dog barked at the mailman.", "We ate pizza for lunch.", "My sister likes to paint.", "The sun is shining.", "Birds fly south in winter.", "I lost my red mitten.", "The baby is sleeping.", "Dad fixed my bike.", "The frog jumped into the pond.", "Our class went to the zoo.", "She reads every night.", "The cookies smell yummy."];
const SENT_NO = ["The big brown dog.", "Ran to the park.", "In the morning.", "My best friend and I.", "Under the table.", "Jumped very high.", "A tall green tree.", "After school today.", "Because it was cold.", "The happy little puppy.", "Swimming in the lake.", "With my grandma."];
topic(7, "english", {
  id: "sentences", title: "Sentence or Not?", icon: "📝", blurb: "A complete sentence has a who and a do.",
  lesson: [
    { t: "Who + what they do", say: "A complete sentence tells who or what, and what they do. The dog barks. Dog is the who, barks is the do!", html: `<div class="sentence big-sentence"><b class="noun">The dog</b> <b class="verb">barks</b>.</div><div class="legend"><span><i class="noun-sw"></i>who</span><span><i class="verb-sw"></i>what they do</span></div>` },
    { t: "Missing parts", say: "The big brown dog. That's not a sentence! What did the dog do? Ran to the park. Who ran? Each one is missing a part.", html: table([["The big brown dog.", "missing the <b class='verb'>do</b>"], ["Ran to the park.", "missing the <b class='noun'>who</b>"]], ["Not a sentence", "Why"]) },
    { t: "Capital and period", say: "A sentence starts with a capital letter and ends with a period, question mark, or exclamation mark.", html: `<div class="sentence big-sentence"><b class="hl">T</b>he cat naps<b class="hl">.</b></div>` },
  ],
  gen() {
    if (Math.random() < 0.55) {
      const ok = Math.random() < 0.5, s = ok ? pick(SENT_OK) : pick(SENT_NO);
      return { q: "Is this a <b>complete sentence</b>?", say: `Is this a complete sentence? ${s}`, vis: `<div class="quote">${s}</div>`, opts: ["Yes, it is ✔", "No, a part is missing ✘"], ans: ok ? "Yes, it is ✔" : "No, a part is missing ✘", big: 1, why: ok ? "It tells who and what they do." : "It's missing a who or a what-they-do part.", key: "a" + s };
    }
    const s = pick(SENT_OK), others = shuffle(SENT_NO).slice(0, 3);
    return { q: "Which one is a <b>complete sentence</b>?", opts: shuffle([s, ...others]), ans: s, why: `"${s}" tells who and what they do.`, key: "b" + s + others.join() };
  },
});
TRICK_ADD(7, "english", "sentences", "Ask two questions: Who? and Did what? If the words answer both, it's a complete sentence.");

const RCON = [["car", "ar", "🚗"], ["star", "ar", "⭐"], ["jar", "ar", "🫙"], ["farm", "ar", "🚜"], ["shark", "ar", "🦈"], ["barn", "ar", "🏚️"], ["corn", "or", "🌽"], ["fork", "or", "🍴"], ["horse", "or", "🐴"], ["storm", "or", "⛈️"], ["horn", "or", "📯"], ["bird", "ir", "🐦"], ["girl", "ir", "👧"], ["shirt", "ir", "👕"], ["nurse", "ur", "🧑‍⚕️"], ["turtle", "ur", "🐢"], ["purse", "ur", "👛"], ["fern", "er", "🌿"], ["tiger", "er", "🐯"], ["letter", "er", "✉️"], ["park", "ar", "🏞️"], ["thorn", "or", "🌹"]];
topic(7, "english", {
  id: "bossyr", title: "Bossy R", icon: "🤠", blurb: "ar, or, er, ir and ur.",
  lesson: [
    { t: "R is bossy!", say: "When R comes after a vowel, it bosses the vowel and changes its sound. A plus R says ar, like car.", html: row(hw(`c<b class="hl">ar</b>`, "big"), bigEmo("🚗")) },
    { t: "ar and or", say: "A R says ar, like star and farm. O R says or, like corn and fork.", html: `<div class="card-grid">${[["⭐", "st", "ar", ""], ["🚜", "f", "ar", "m"], ["🌽", "c", "or", "n"], ["🍴", "f", "or", "k"]].map(([e, a, t, c]) => picCard(e, `${a}<b class="hl">${t}</b>${c}`, a + t + c)).join("")}</div>` },
    { t: "er, ir, ur sound the same", say: "E R, I R, and U R all say er! Her, bird, nurse. You just have to learn which spelling each word uses.", html: `<div class="card-grid">${[["🐯", "tig", "er", ""], ["🐦", "b", "ir", "d"], ["🐢", "t", "ur", "tle"]].map(([e, a, t, c]) => picCard(e, `${a}<b class="hl">${t}</b>${c}`, a + t + c)).join("")}</div>` },
  ],
  gen() {
    const [w, t, e] = pick(RCON), i = w.indexOf(t);
    return { q: "Which Bossy R team completes the word?", say: `Which bossy R team completes the word ${w}?`, vis: col(bigEmo(e), hw(`${w.slice(0, i)}<span class="blank">__</span>${w.slice(i + 2)}`)), opts: shuffle([t, ...shuffle(["ar", "or", "er", "ir", "ur"].filter(x => x !== t)).slice(0, 3)]), ans: t, big: 1, why: `${cap(w)} is spelled with ${t}: ${w.slice(0, i)}${t.toUpperCase()}${w.slice(i + 2)}.`, key: w };
  },
});
TRICK_ADD(7, "english", "bossyr", "ar sounds like a pirate (arr!), or sounds like “oar”. er, ir and ur all sound the same, so picture how the word looks.");

const CMPADJ = [["tall", "taller", "tallest", "🦒", "giraffe", "dog"], ["fast", "faster", "fastest", "🐆", "cheetah", "turtle"], ["big", "bigger", "biggest", "🐘", "elephant", "mouse"], ["small", "smaller", "smallest", "🐜", "ant", "cat"], ["slow", "slower", "slowest", "🐌", "snail", "rabbit"], ["long", "longer", "longest", "🐍", "snake", "worm"], ["heavy", "heavier", "heaviest", "🐳", "whale", "fish"], ["happy", "happier", "happiest", "😄", "boy who won", "boy who lost"], ["hot", "hotter", "hottest", "☀️", "sun", "fire"], ["cold", "colder", "coldest", "🧊", "ice", "water"], ["good", "better", "best", "🏆", "winner", "runner-up"], ["funny", "funnier", "funniest", "🤡", "clown", "teacher"]];
topic(8, "english", {
  id: "comparing", title: "-er and -est", icon: "📶", blurb: "Compare with tall, taller, tallest.",
  lesson: [
    { t: "Comparing two", say: "Add e R to compare two things. A giraffe is taller than a dog.", html: `<div class="sentence big-sentence">A giraffe is tall<b class="hl">er</b> than a dog. 🦒🐶</div>` },
    { t: "Comparing three or more", say: "Add e S T to compare three or more. The giraffe is the tallest animal in the zoo.", html: `<div class="size-row"><span class="emo" style="font-size:30px">🐶</span><span class="emo" style="font-size:48px">🐴</span><span class="emo" style="font-size:72px">🦒</span></div>` + table([["tall", "tall<b class='hl'>er</b>", "tall<b class='hl'>est</b>"]], ["one", "two", "three or more"]) },
    { t: "Spelling changes", say: "Some words change. Big becomes bigger, with a double G. Happy becomes happier, Y changes to I. Good becomes better and best!", html: table([["big", "bigger", "biggest"], ["happy", "happier", "happiest"], ["good", "better", "best"]], ["word", "-er", "-est"]) },
  ],
  gen() {
    const [b, er, est, e, a1, a2] = pick(CMPADJ), two = Math.random() < 0.5;
    const s = two ? `The ${a1} is ___ than the ${a2}.` : `The ${a1} is the ___ of them all.`, ans = two ? er : est;
    const wrongs = [b, two ? est : er, b === "good" ? "gooder" : `more ${b}`];
    return { q: `<span class="emo">${e}</span> ${s.replace("___", '<span class="blank">___</span>')}`, say: `${s.replace("___", "blank")} Which word fits?`, opts: uniq(ans, wrongs), ans, big: 1, why: two ? `"Than" compares two things, so use ${er}.` : `"Of them all" compares three or more, so use ${est}.`, key: b + two };
  },
});
TRICK_ADD(8, "english", "comparing", "If you see “than”, you're comparing two: use -er. If you see “the …est of all”, it's three or more.");

const FACTS = ["Dogs have four legs.", "The sun is a star.", "Water freezes when it gets very cold.", "There are seven days in a week.", "Fish live in water.", "Bees make honey.", "A triangle has three sides.", "Plants need sunlight to grow.", "Snow is cold.", "Spiders have eight legs.", "The moon goes around the Earth.", "Cows give milk."];
const OPINIONS = ["Dogs are the best pets.", "Pizza is the yummiest food.", "Summer is the most fun season.", "Math is easy.", "Blue is the prettiest color.", "Cats are cuter than rabbits.", "Rainy days are boring.", "Soccer is the best sport.", "Broccoli tastes gross.", "Our school has the nicest playground.", "Reading is more fun than TV.", "Spiders are scary."];
topic(8, "english", {
  id: "factopinion", title: "Fact or Opinion?", icon: "🔍", blurb: "Can it be proven, or is it what someone thinks?",
  lesson: [
    { t: "Facts can be proven", say: "A fact is true, and you can prove it. Dogs have four legs. You can count them!", html: `<div class="quote">Dogs have four legs. 🐶</div>` + note("✔ You can <b>check</b> it. It's a <b>fact</b>.") },
    { t: "Opinions are what people think", say: "An opinion is what someone thinks or feels. Dogs are the best pets. Some people like cats better!", html: `<div class="quote">Dogs are the best pets.</div>` + note("💭 People can <b>disagree</b>. It's an <b>opinion</b>.") },
    { t: "Clue words", say: "Opinion words often show feelings: best, worst, yummy, boring, pretty, scary, fun.", html: `<div class="chips">${["best", "worst", "yummy", "boring", "pretty", "fun", "scary"].map(w => `<span class="chip lg">${w}</span>`).join("")}</div>` },
  ],
  gen() {
    if (Math.random() < 0.65) {
      const f = Math.random() < 0.5, s = f ? pick(FACTS) : pick(OPINIONS);
      return { q: "Is this a fact or an opinion?", say: `Is this a fact or an opinion? ${s}`, vis: `<div class="quote">${s}</div>`, opts: ["Fact 🔬", "Opinion 💭"], ans: f ? "Fact 🔬" : "Opinion 💭", big: 1, why: f ? "You can check it and prove it's true." : "It's what someone thinks. Others might disagree.", key: "a" + s };
    }
    const wantFact = Math.random() < 0.5, a = wantFact ? pick(FACTS) : pick(OPINIONS), others = shuffle(wantFact ? OPINIONS : FACTS).slice(0, 3);
    return { q: `Which one is ${wantFact ? "a <b>fact</b>" : "an <b>opinion</b>"}?`, opts: shuffle([a, ...others]), ans: a, why: wantFact ? `"${a}" can be proven.` : `"${a}" is what someone thinks.`, key: "b" + a + others.join() };
  },
});
TRICK_ADD(8, "english", "factopinion", "Ask: could I prove it with a book, a ruler, or my eyes? Yes means fact. If people could disagree, it's an opinion.");

const lc1 = x => /^(The|A|An|It|He|She|They|We|His|Her|My|Our|Their|School|Snow|Our)\b/.test(x) ? x.charAt(0).toLowerCase() + x.slice(1) : x;
const CAUSES = [["It rained all day.", "The soccer game was canceled."], ["Mia forgot her umbrella.", "She got wet."], ["The ice cream sat in the sun.", "It melted."], ["Leo practiced every day.", "He won the spelling bee."], ["The puppy chewed the shoe.", "The shoe had holes in it."], ["The alarm didn't ring.", "Sam was late for school."], ["Ava watered her plant.", "The plant grew tall."], ["The glass fell off the table.", "It broke into pieces."], ["The wind blew hard.", "The kite flew high."], ["Omar ate too much candy.", "His tummy hurt."], ["It snowed a lot.", "School was closed."], ["The baby was tired.", "She took a long nap."], ["We forgot to close the gate.", "The dog ran out."], ["Kai studied his math facts.", "He did well on the test."]];
topic(9, "english", {
  id: "causeeffect", title: "Cause & Effect", icon: "💥", blurb: "Why something happened, and what happened.",
  lesson: [
    { t: "Why and what", say: "A cause is why something happens. An effect is what happens. It rained, so the game was canceled.", html: row(col(bigEmo("🌧️"), "<b>Cause</b><br>It rained."), arrow(), col(bigEmo("🚫⚽"), "<b>Effect</b><br>The game was canceled.")) },
    { t: "Clue words", say: "Clue words help you find cause and effect: because, so, since, and as a result.", html: `<div class="sentence big-sentence">The ice cream melted <b class="hl">because</b> it was hot.</div>` + note("Words after <b>because</b> are the cause.") },
    { t: "Ask why", say: "To find the cause, ask: why did it happen? To find the effect, ask: what happened?", html: table([["Why did it happen?", "cause"], ["What happened?", "effect"]], ["Ask", "You find the"]) },
  ],
  gen() {
    const i = R(0, CAUSES.length - 1), [c, e] = CAUSES[i], askCause = Math.random() < 0.5, others = shuffle(CAUSES.filter((_, j) => j !== i)).slice(0, 3);
    if (askCause) return { q: `<div class="quote">${e}</div>What was the <b>cause</b>? (Why did it happen?)`, say: `${e} What was the cause? Why did it happen?`, opts: shuffle([c, ...others.map(o => o[0])]), ans: c, why: `It happened because ${lc1(c).replace(/\.$/, "")}.`, key: "c" + i };
    return { q: `<div class="quote">${c}</div>What was the <b>effect</b>? (What happened?)`, say: `${c} What was the effect? What happened?`, opts: shuffle([e, ...others.map(o => o[1])]), ans: e, why: `${c.replace(/\.$/, "")}, so ${lc1(e)}`, key: "e" + i };
  },
});
TRICK_ADD(9, "english", "causeeffect", "Put “because” between them: “The game was canceled because it rained.” The part after “because” is the cause.");

const POS_S = [["The|- happy|adjective puppy|noun ran|verb quickly|adverb."], ["A|- tall|adjective girl|noun sang|verb loudly|adverb."], ["My|- old|adjective car|noun moved|verb slowly|adverb."], ["The|- tiny|adjective bird|noun flew|verb away|adverb."], ["Hungry|adjective bears|noun eat|verb berries|noun."], ["The|- brave|adjective firefighter|noun climbed|verb carefully|adverb."], ["Our|- teacher|noun spoke|verb softly|adverb."], ["Bright|adjective stars|noun shine|verb brightly|adverb."], ["The|- shy|adjective cat|noun hid|verb quietly|adverb."], ["Fluffy|adjective clouds|noun drifted|verb gently|adverb."], ["The|- busy|adjective bees|noun buzzed|verb happily|adverb."], ["Sam|noun kicked|verb the|- red|adjective ball|noun hard|adverb."]];
const POS_NAMES = ["noun", "verb", "adjective", "adverb"];
topic(9, "english", {
  id: "partsofspeech", title: "Parts of Speech", icon: "🧩", blurb: "Noun, verb, adjective or adverb?",
  lesson: [
    { t: "Four word jobs", say: "Every word has a job. Nouns name things. Verbs show action. Adjectives describe nouns. Adverbs describe verbs.", html: table([["noun", "names a person, place or thing", "puppy"], ["verb", "shows action", "ran"], ["adjective", "describes a noun", "happy"], ["adverb", "describes a verb", "quickly"]], ["Part", "Job", "Example"]) },
    { t: "See them in a sentence", say: "The happy puppy ran quickly. Puppy is the noun. Happy describes it. Ran is the verb. Quickly tells how it ran.", html: `<div class="sentence big-sentence">The <b class="hl">happy</b> <b class="noun">puppy</b> <b class="verb">ran</b> <b class="adv">quickly</b>.</div>` },
    { t: "Ask questions", say: "Ask: Is it a thing? Noun. Can you do it? Verb. Does it describe a thing? Adjective. Does it tell how, when, or where? Adverb.", html: `<ol class="steps"><li>Thing? → noun</li><li>Action? → verb</li><li>Describes a thing? → adjective</li><li>How / when / where? → adverb</li></ol>` },
  ],
  gen() {
    const toks = pick(POS_S)[0].split(" ").map(t => { const [w, p] = t.split("|"); return [w, p.replace(/\.$/, "")]; });
    const cands = toks.map((t, i) => [t, i]).filter(([t]) => POS_NAMES.includes(t[1])), [[w, p], idx] = pick(cands);
    const plain = toks.map(t => t[0]).join(" ") + ".", html = toks.map((t, i) => i === idx ? `<b class="hl">${t[0]}</b>` : t[0]).join(" ") + ".";
    const jobs = { noun: "names a person, place or thing", verb: "shows the action", adjective: "describes a noun", adverb: "tells how, when or where" };
    return { q: `What part of speech is <b>${w}</b>?<div class="sentence">${html}</div>`, say: `In the sentence: ${plain} What part of speech is ${w}?`, opts: POS_NAMES.slice(), ans: p, big: 1, why: `${cap(w)} ${jobs[p]}, so it's ${p === "adjective" || p === "adverb" ? "an" : "a"} ${p}.`, key: plain + w };
  },
});
TRICK_ADD(9, "english", "partsofspeech", "Thing = noun. Action = verb. Describes a thing = adjective. Tells how, when or where about an action = adverb, and many end in -ly.");

/* ====================== MATH ====================== */
topic(6, "math", {
  id: "bonds", title: "Number Bonds", icon: "🔗", blurb: "Two parts that make a whole.",
  lesson: [
    { t: "Parts and whole", say: "A number bond shows two parts that make a whole. 3 and 2 make 5.", html: bondSVG(5, 3, 2) },
    { t: "Ways to make 10", say: "There are many ways to make 10. 9 and 1. 8 and 2. 7 and 3. 6 and 4. 5 and 5.", html: table(range(1, 5).map(a => [`${10 - a} + ${a}`, "10"]), ["Parts", "Whole"]) },
    { t: "Find the missing part", say: "If the whole is 7 and one part is 4, the other part is 3. Count up from 4 to 7!", html: bondSVG(7, 4, "?") },
  ],
  gen() {
    const whole = Math.random() < 0.5 ? 10 : R(4, 10), a = R(0, whole), b = whole - a, k = R(0, 1);
    if (k === 0) return { q: "What is the missing part?", say: `The whole is ${whole}. One part is ${a}. What is the other part?`, vis: bondSVG(whole, a, "?") + tenframe(whole, "🔵", "⚪", a), opts: numU(b, [b + 1, b - 1, whole, a], 2, 0), ans: String(b), big: 1, why: `${a} and ${b} make ${whole}.`, key: "p" + whole + a };
    return { q: "What is the whole?", say: `The parts are ${a} and ${b}. What is the whole?`, vis: bondSVG("?", a, b), opts: numU(whole, [whole + 1, whole - 1, Math.abs(a - b)], 2, 0), ans: String(whole), big: 1, why: `${a} + ${b} = ${whole}.`, key: "w" + a + b };
  },
});
function bondSVG(w, a, b) {
  const t = (x, y, v, c) => `<circle cx="${x}" cy="${y}" r="30" fill="${c}" stroke="${INK}" stroke-width="3"/><text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="central" font-size="26" font-weight="700" font-family="${FONT}" fill="${INK}">${v}</text>`;
  return `${svgOpen(220, 160, "number bond")}<line x1="110" y1="45" x2="55" y2="118" stroke="${INK}" stroke-width="3"/><line x1="110" y1="45" x2="165" y2="118" stroke="${INK}" stroke-width="3"/>${t(110, 40, w, "#FFE58A")}${t(55, 120, a, "#E1EBFF")}${t(165, 120, b, "#FFE8E0")}</svg>`;
}
TRICK_ADD(6, "math", "bonds", "Hold up the whole on your fingers, then fold down one part. The fingers left standing are the other part.");

const ORD = ["1st", "2nd", "3rd", "4th", "5th", "6th"], ORDW = ["first", "second", "third", "fourth", "fifth", "sixth"];
topic(6, "math", {
  id: "ordinal", title: "First, Second, Third", icon: "🥇", blurb: "Numbers that tell the order.",
  lesson: [
    { t: "Order words", say: "Order numbers tell who is first, second, third, and so on. The first one is at the front of the line.", html: `<div class="race"><span class="flag">🏁<small>front</small></span>${["🐢", "🐇", "🐌", "🦊"].map((e, i) => `<span><span class="emo xl">${e}</span><b>${ORD[i]}</b></span>`).join("")}</div>` },
    { t: "Say them", say: "1st is first, 2nd is second, 3rd is third, 4th is fourth, 5th is fifth.", html: `<div class="chips">${ORD.slice(0, 5).map((o, i) => chip(`${o} ${ORDW[i]}`, ORDW[i], "lg")).join("")}</div>` },
    { t: "Start at the front", say: "Always count from the front of the line, where it starts. Here the front is next to the flag.", html: note("Count from the <b>front</b> 🏁") },
  ],
  gen() {
    const n = R(4, 6), items = shuffle(LR_POOL).slice(0, n), i = R(0, n - 1), o = e => `<span class="emo">${e}</span>`;
    const line = `<div class="race"><span class="flag">🏁<small>front</small></span>${items.map(e => `<span><span class="emo xl">${e}</span></span>`).join("")}</div>`;
    if (Math.random() < 0.5) return { q: `Who is <b>${ORD[i]}</b> in line?`, say: `Counting from the front, by the flag, who is ${ORDW[i]}?`, vis: line, opts: shuffle([items[i], ...shuffle(items.filter((_, j) => j !== i)).slice(0, 3)]).map(o), ans: o(items[i]), sayAns: `the ${ORDW[i]} one from the front`, why: `Count from the front by the flag: ${ORDW.slice(0, i + 1).join(", ")}.`, key: "w" + items.join() + i };
    return { q: `What place is <span class="emo">${items[i]}</span> in?`, say: "Counting from the front, by the flag, what place is this animal in?", vis: line, opts: shuffle([i, ...shuffle(range(0, n - 1).filter(j => j !== i)).slice(0, 3)]).map(j => ORD[j]), ans: ORD[i], big: 1, why: `Counting from the front, it is ${ORDW[i]}.`, key: "p" + items.join() + i };
  },
});
TRICK_ADD(6, "math", "ordinal", "Point at the front of the line and count: first, second, third… stop when you reach the one you want.");

topic(7, "math", {
  id: "symbols", title: "Greater, Less, Equal", icon: "🐊", blurb: "Use > < and = to compare.",
  lesson: [
    { t: "The hungry alligator", say: "The alligator mouth always opens toward the bigger number, because it wants to eat more! 8 is greater than 3.", html: eq(`8 <span class="gator">&gt;</span> 3`) + note("The mouth opens to the <b>bigger</b> number 🐊") },
    { t: "Less than", say: "3 is less than 8. The mouth still opens toward the 8.", html: eq(`3 <span class="gator">&lt;</span> 8`) },
    { t: "Equal", say: "If both numbers are the same, use the equal sign. 5 equals 5.", html: eq("5 = 5") + table([[">", "greater than"], ["<", "less than"], ["=", "equal to"]], ["Sign", "Means"]) },
  ],
  gen() {
    const a = R(0, 99), b = Math.random() < 0.15 ? a : R(0, 99), sign = a > b ? ">" : a < b ? "<" : "=";
    if (Math.random() < 0.35) { const tn = R(1, 9) * 10, x = tn + R(0, 9); let y = tn + R(0, 9); while (y === x) y = tn + R(0, 9); const s2 = x > y ? ">" : "<"; return { q: `Which sign goes in the box? <div class="eq">${x} ${blank("?")} ${y}</div>`, say: `${x}, blank, ${y}. Which sign goes in the box?`, opts: [">", "<", "="], ans: s2, big: 1, why: `Same tens, so compare the ones: ${Math.max(x, y)} is bigger.`, key: "t" + x + "," + y }; }
    return { q: `Which sign goes in the box? <div class="eq">${a} ${blank("?")} ${b}</div>`, say: `${a}, blank, ${b}. Which sign goes in the box?`, opts: [">", "<", "="], ans: sign, big: 1, why: sign === "=" ? "Both numbers are the same." : `${Math.max(a, b)} is bigger, so the mouth opens toward ${Math.max(a, b)}.`, key: a + "," + b };
  },
});
TRICK_ADD(7, "math", "symbols", "Compare the tens first. If the tens match, compare the ones. The open mouth faces the bigger number.");

const SOLIDS = { sphere: ["⚽", "🏀", "🌍", "🍊", "🔮", "🎱"], cube: ["🎲", "🧊", "🎁"], cone: ["🍦", "🥳", "📢"], cylinder: ["🥫", "🕯️", "🧻", "🔋", "🥁"], "rectangular prism": ["📦", "🧱", "📕", "🧈"] };
const SOLID_FACTS = [["How many flat faces does a cube have?", "6", ["4", "8", "12"], "A cube has 6 square faces, like a number cube."], ["How many corners (vertices) does a cube have?", "8", ["4", "6", "12"], "A cube has 4 corners on top and 4 on the bottom."], ["How many edges does a cube have?", "12", ["6", "8", "10"], "4 on top, 4 on the bottom, and 4 going up the sides."], ["How many flat faces does a sphere have?", "0", ["1", "2", "6"], "A sphere is round all over, with no flat faces."], ["How many flat faces does a cylinder have?", "2", ["0", "1", "4"], "A cylinder has a flat circle on the top and bottom."], ["Which solid can roll and stack?", "cylinder", ["cube", "sphere", "rectangular prism"], "A cylinder rolls on its side and stacks on its flat ends."]];
topic(7, "math", {
  id: "solids", title: "3D Shapes", icon: "🧊", blurb: "Spheres, cubes, cones and cylinders.",
  lesson: [
    { t: "Solid shapes", say: "3D shapes are solid, not flat. A ball is a sphere. A number cube is a cube. An ice cream cone is a cone. A can is a cylinder.", html: pics2([["⚽", "sphere"], ["🎲", "cube"], ["🍦", "cone"], ["🥫", "cylinder"], ["📦", "rectangular prism"]]) },
    { t: "Faces, edges, corners", say: "Flat sides are called faces. Where two faces meet is an edge. A pointy corner is a vertex. A cube has 6 faces.", html: row(`<span class="emo" style="font-size:96px">🎲</span>`, table([["faces", "6"], ["edges", "12"], ["corners", "8"]], ["cube", ""])) },
    { t: "Roll, stack, or slide?", say: "Spheres roll. Cubes stack and slide. Cylinders can roll and stack!", html: table([["sphere ⚽", "✔", "✘"], ["cube 🎲", "✘", "✔"], ["cylinder 🥫", "✔", "✔"]], ["shape", "rolls", "stacks"]) },
  ],
  gen() {
    if (Math.random() < 0.25) { const [q, a, d, w] = pick(SOLID_FACTS); return { q, opts: shuffle([a, ...d]), ans: a, big: 1, why: w, key: q }; }
    const names = Object.keys(SOLIDS), n = pick(names), e = pick(SOLIDS[n]);
    return { q: "What 3D shape is this?", vis: `<span class="emo" style="font-size:96px">${e}</span>`, opts: shuffle([n, ...shuffle(names.filter(x => x !== n)).slice(0, 3)]), ans: n, big: 1, why: `It's shaped like a ${n}.`, key: e };
  },
});
TRICK_ADD(7, "math", "solids", "Imagine holding it. Round all over = sphere. Dice = cube. Ice cream cone = cone. Can = cylinder. Box = rectangular prism.");

topic(8, "math", {
  id: "comparefrac", title: "Comparing Fractions", icon: "⚖️", blurb: "Which fraction is bigger?",
  lesson: [
    { t: "Same bottom number", say: "When the bottom numbers are the same, the pieces are the same size. More pieces is bigger! 3 eighths is more than 1 eighth.", html: bar(8, 3, 280, 40, "#3D7BFF") + bar(8, 1, 280, 40, "#3D7BFF") + eq(`${frac(3, 8)} &gt; ${frac(1, 8)}`) },
    { t: "Same top number", say: "When the top numbers are the same, look at the size of the pieces. A half is bigger than a fourth, because fewer pieces means bigger pieces.", html: bar(2, 1, 280, 40, "#FF7A59") + bar(4, 1, 280, 40, "#FF7A59") + eq(`${frac(1, 2)} &gt; ${frac(1, 4)}`) },
    { t: "Think pizza", say: "Would you rather have 1 slice of a pizza cut into 2, or 1 slice of a pizza cut into 8? The one cut into 2 has bigger slices!", html: row(pie(2, 1, 110, "#FF7A59"), pie(8, 1, 110, "#FF7A59")) },
  ],
  gen() {
    const sameDen = Math.random() < 0.5; let a, b, c, d;
    if (sameDen) { b = d = pick([3, 4, 5, 6, 8]); a = R(1, b - 1); c = R(1, b - 1); }
    else { a = c = R(1, 3); b = pick([2, 3, 4, 5, 6, 8].filter(x => x > a)); d = pick([2, 3, 4, 5, 6, 8].filter(x => x > a && x !== b)); }
    const v1 = a / b, v2 = c / d, sign = v1 > v2 ? ">" : v1 < v2 ? "<" : "=";
    return { q: `Which sign goes in the box? <div class="eq">${frac(a, b)} ${blank("?")} ${frac(c, d)}</div>`, say: `${a} over ${b}, blank, ${c} over ${d}. Which sign goes in the box?`, vis: bar(b, a, 280, 36, "#3D7BFF") + bar(d, c, 280, 36, "#FF7A59"), opts: [">", "<", "="], ans: sign, big: 1, why: sign === "=" ? "They are the same amount." : sameDen ? `Same size pieces, so ${Math.max(a, c)} pieces is more.` : `Same number of shaded pieces, but cutting into ${Math.min(b, d)} equal parts makes bigger pieces.`, key: [a, b, c, d].join() };
  },
});
TRICK_ADD(8, "math", "comparefrac", "Same bottom: bigger top wins. Same top: smaller bottom wins, because the pieces are bigger.");

const SHOP = [["🍎", "apple", 45], ["🧃", "juice box", 120], ["🍪", "cookie", 75], ["🖍️", "crayons", 250], ["📒", "notebook", 185], ["🍌", "banana", 35], ["🧸", "teddy bear", 399], ["🎈", "balloon", 60], ["🍫", "chocolate", 95], ["⚽", "ball", 325]];
const $f = c => "$" + (c / 100).toFixed(2);
const aN = w => /s$/.test(w) && !/ss$/.test(w) ? `some ${w}` : /^[aeiou]/i.test(w) ? `an ${w}` : `a ${w}`;
topic(8, "math", {
  id: "dollars", title: "Dollars & Cents", icon: "💵", blurb: "Add prices and make change.",
  lesson: [
    { t: "Dollars and cents", say: "100 cents make 1 dollar. We write money with a dollar sign and a dot: $1.25 is one dollar and twenty-five cents.", html: eq("$1.25") + note("1 dollar = <b>100 cents</b>") },
    { t: "Adding prices", say: "To add prices, line up the dots. $1.20 plus $0.45 is $1.65.", html: stack("1.20", "0.45", "+", { result: "1.65" }) },
    { t: "Making change", say: "If something costs $3.25 and you pay $5.00, count up to find your change: $3.25 to $4.00 is 75 cents, then 1 more dollar. Your change is $1.75.", html: train(["$3.25", "+75¢", "$4.00", "+$1", "$5.00"]) + eq("change = <b>$1.75</b>") },
  ],
  gen() {
    const [x, y] = shuffle(SHOP).slice(0, 2);
    if (Math.random() < 0.5) { const t = x[2] + y[2]; return { q: `You buy ${aN(x[1])} ${x[0]} for <b>${$f(x[2])}</b> and ${aN(y[1])} ${y[0]} for <b>${$f(y[2])}</b>. What is the total?`, say: `You buy ${aN(x[1])} for ${$f(x[2])} and ${aN(y[1])} for ${$f(y[2])}. What is the total?`, opts: uniq($f(t), [$f(t + 10), $f(t - 10), $f(t + 100), $f(Math.abs(x[2] - y[2]))]), ans: $f(t), big: 1, why: `${$f(x[2])} + ${$f(y[2])} = ${$f(t)}.`, key: "t" + x[1] + y[1] }; }
    const pay = x[2] < 100 ? 100 : x[2] < 500 ? 500 : 1000, ch = pay - x[2];
    return { q: `${x[0]} costs <b>${$f(x[2])}</b>. You pay <b>${$f(pay)}</b>. How much change do you get?`, say: `A ${x[1]} costs ${$f(x[2])}. You pay ${$f(pay)}. How much change do you get?`, opts: uniq($f(ch), [$f(ch + 10), $f(ch - 10 > 0 ? ch - 10 : ch + 20), $f(ch + 100), $f(x[2])]), ans: $f(ch), big: 1, why: `${$f(pay)} − ${$f(x[2])} = ${$f(ch)}.`, key: "c" + x[1] };
  },
});
TRICK_ADD(8, "math", "dollars", "For change, count up from the price to the next whole dollar, then on to the money you paid.");

const SING = { feet: "foot", inches: "inch", dozen: "dozen" };
const unit1 = u => SING[u] || u.replace(/s$/, "");
const CONV = [["feet", "inches", 12], ["yards", "feet", 3], ["meters", "centimeters", 100], ["hours", "minutes", 60], ["minutes", "seconds", 60], ["days", "hours", 24], ["weeks", "days", 7], ["pounds", "ounces", 16], ["gallons", "quarts", 4], ["kilometers", "meters", 1000], ["years", "months", 12], ["dozen", "eggs", 12]];
topic(9, "math", {
  id: "convert", title: "Unit Conversions", icon: "📐", blurb: "Feet to inches, hours to minutes and more.",
  lesson: [
    { t: "Big units and small units", say: "Some units are bigger than others. 1 foot is the same as 12 inches. 1 hour is the same as 60 minutes.", html: table(CONV.slice(0, 6).map(([a, b, n]) => [`1 ${unit1(a)}`, `${n} ${b}`]), ["Big unit", "Equals"]) },
    { t: "Big to small: multiply", say: "To change big units to small units, multiply. 3 feet is 3 times 12, which is 36 inches.", html: eq("3 ft = 3 × 12 = <b>36 in</b>") },
    { t: "Small to big: divide", say: "To change small units to big units, divide. 120 minutes divided by 60 is 2 hours.", html: eq("120 min ÷ 60 = <b>2 hours</b>") },
  ],
  gen() {
    const [big, small, n] = pick(CONV), k = R(2, n >= 100 ? 5 : 9);
    if (Math.random() < 0.6) return { q: `<b>${k} ${big}</b> = how many ${small}?`, say: `${k} ${big} equals how many ${small}?`, vis: note(`1 ${unit1(big)} = ${n} ${small}`), opts: numU(k * n, [k + n, k * n + n, k * n - n, k * 10], n, 1), ans: String(k * n), big: 1, why: `Multiply: ${k} × ${n} = ${k * n} ${small}.`, key: "m" + big + k };
    return { q: `<b>${k * n} ${small}</b> = how many ${big}?`, say: `${k * n} ${small} equals how many ${big}?`, vis: note(`1 ${unit1(big)} = ${n} ${small}`), opts: numU(k, [k + 1, k - 1, k * 2, n], 2, 1), ans: String(k), big: 1, why: `Divide: ${k * n} ÷ ${n} = ${k} ${big}.`, key: "d" + big + k };
  },
});
TRICK_ADD(9, "math", "convert", "Going to a smaller unit? You'll need more of them, so multiply. Going to a bigger unit? You'll need fewer, so divide.");

topic(9, "math", {
  id: "fracof", title: "Fractions of a Number", icon: "🍰", blurb: "Find 1/3 of 12 and 2/3 of 12.",
  lesson: [
    { t: "One part", say: "To find one third of 12, share 12 into 3 equal groups. Each group has 4. So one third of 12 is 4.", html: plates(3, 4, "🍪") + eq(`${frac(1, 3)} of 12 = <b>4</b>`) },
    { t: "More than one part", say: "Two thirds of 12 means two of those groups. 4 plus 4 is 8.", html: plates(3, 4, "🍪") + eq(`${frac(2, 3)} of 12 = 2 × 4 = <b>8</b>`) },
    { t: "Divide, then multiply", say: "Divide by the bottom number, then multiply by the top number. Three fourths of 20: 20 divided by 4 is 5, times 3 is 15.", html: eq(`${frac(3, 4)} of 20 → 20 ÷ 4 = 5 → 5 × 3 = <b>15</b>`) },
  ],
  gen() {
    const d = pick([2, 3, 4, 5, 6, 8, 10]), n = R(1, d - 1), g = R(2, 8), total = d * g, ans = n * g;
    return { q: `What is ${frac(n, d)} of <b>${total}</b>?`, say: `What is ${n} over ${d} of ${total}?`, vis: total <= 30 ? plates(d, g, pick(["🍪", "🍓", "⭐", "🐟"])) : "", opts: numU(ans, [g, total - ans, ans + g, total / n | 0], 3, 1), ans: String(ans), big: 1, why: `${total} ÷ ${d} = ${g}, and ${g} × ${n} = ${ans}.`, key: n + "/" + d + total };
  },
});
TRICK_ADD(9, "math", "fracof", "Bottom number: divide. Top number: multiply. Divide first so the numbers stay small.");

/* ====================== LOGIC ====================== */
/* pairs in the same group could make a wrong choice look right (a sprout can grow into a tree), so they never appear together */
const BA_GROUP = { sprout: "plant", seed: "plant", ice: "water", rain: "water", snowman: "water", egg: "grow", caterpillar: "grow", baby: "grow", bread: "food", milk: "food", apples: "food", corn: "food", potato: "food" };
const BEFOREAFTER = [["🥚", "🐣", "egg", "chick"], ["🌱", "🌻", "sprout", "flower"], ["🐛", "🦋", "caterpillar", "butterfly"], ["🧊", "💧", "ice", "water"], ["🌧️", "🌈", "rain", "rainbow"], ["🍞", "🥪", "bread", "sandwich"], ["🌰", "🌳", "seed", "tree"], ["🥛", "🧀", "milk", "cheese"], ["🍋", "🍋‍🟩", "", ""], ["🍎", "🥧", "apples", "pie"], ["⛄", "💦", "snowman", "puddle"], ["🎈", "💥", "balloon", "pop"], ["🌽", "🍿", "corn", "popcorn"], ["🐸", "🐸", "", ""], ["👶", "🧒", "baby", "child"], ["🌑", "🌕", "new moon", "full moon"], ["🥔", "🍟", "potato", "fries"]].filter(x => x[2]);
topic(6, "logic", {
  id: "beforeafter", title: "Before & After", icon: "⏩", blurb: "What happens next? What came first?",
  lesson: [
    { t: "Things change", say: "Some things change over time. An egg cracks and a chick comes out!", html: row(bigEmo("🥚"), arrow(), bigEmo("🐣")) },
    { t: "What comes next?", say: "A seed grows into a tree. A caterpillar turns into a butterfly. Ice melts into water.", html: `<div class="pairs">${[["🌰", "🌳"], ["🐛", "🦋"], ["🧊", "💧"]].map(([a, b]) => `<div class="pair"><span class="emo xl">${a}</span>${arrow()}<span class="emo xl">${b}</span></div>`).join("")}</div>` },
    { t: "What came first?", say: "If you see popcorn, what was it before? Corn! Think backward.", html: row(`<span class="car q">?</span>`, arrow(), bigEmo("🍿")) + note("Before: <b>corn</b> 🌽") },
  ],
  gen() {
    const i = R(0, BEFOREAFTER.length - 1), [a, b, an, bn] = BEFOREAFTER[i], g = BA_GROUP[an], others = shuffle(BEFOREAFTER.filter((x, j) => j !== i && x[0] !== a && x[1] !== b && (!g || BA_GROUP[x[2]] !== g))).slice(0, 3), next = Math.random() < 0.55;
    const o = (e, n) => `<span class="emo" title="${n}">${e}</span>`;
    if (next) return { q: "What happens <b>next</b>?", say: `What happens next to the ${an}?`, vis: row(`<span class="emo" style="font-size:80px">${a}</span>`, arrow(), `<span class="car q">?</span>`), opts: shuffle([o(b, bn), ...others.map(x => o(x[1], x[3]))]), ans: o(b, bn), sayAns: `the ${bn}`, why: `The ${an} becomes the ${bn}.`, key: "n" + i };
    return { q: "What came <b>before</b>?", say: `What came before the ${bn}?`, vis: row(`<span class="car q">?</span>`, arrow(), `<span class="emo" style="font-size:80px">${b}</span>`), opts: shuffle([o(a, an), ...others.map(x => o(x[0], x[2]))]), ans: o(a, an), sayAns: `the ${an}`, why: `The ${bn} came from the ${an}.`, key: "b" + i };
  },
});
TRICK_ADD(6, "logic", "beforeafter", "Tell it like a little story: first there was…, then it became…");

topic(6, "logic", {
  id: "numgrid", title: "Number Grid", icon: "🔢", blurb: "Find the missing number in a grid.",
  lesson: [
    { t: "A number grid", say: "A number grid puts numbers in rows. Going right, each number is 1 more.", html: numGrid(1, [-1]) },
    { t: "Going down", say: "Going down one row, each number is 10 more. Under 3 is 13.", html: numGrid(1, [12]) + note("Down one row = <b>10 more</b>") },
    { t: "Use the neighbors", say: "To find a missing number, look at its neighbors. Left is 1 less. Right is 1 more. Above is 10 less.", html: note("← 1 less · → 1 more · ↑ 10 less · ↓ 10 more") },
  ],
  gen() {
    const start = pick([1, 11, 21, 31, 41]), hide = R(0, 19), n = start + hide;
    return { q: "What number is hiding?", vis: numGrid(start, [hide]), opts: numU(n, [n + 1, n - 1, n + 10, n - 10], 2, 1), ans: String(n), big: 1, why: `It's 1 more than the number before it: ${n - 1} + 1 = ${n}.`, key: start + "-" + hide };
  },
});
function numGrid(start, hide) {
  let h = '<div class="ngrid">';
  for (let i = 0; i < 20; i++) h += hide.includes(i) ? '<span class="q">?</span>' : `<span>${start + i}</span>`;
  return h + "</div>";
}
TRICK_ADD(6, "logic", "numgrid", "Look left: add 1. Look up: add 10. Use whichever neighbor you can see.");

const IFRULES = [["If it rains, we play inside.", "It is raining.", "We play inside.", ["We go swimming.", "We play outside.", "We go to sleep."]], ["If the light is green, cars go.", "The light is green.", "Cars go.", ["Cars stop.", "Cars fly.", "Cars honk forever."]], ["If you're cold, put on a coat.", "Mia is cold.", "Mia puts on a coat.", ["Mia eats ice cream.", "Mia takes off her shoes.", "Mia goes swimming."]], ["If the dog barks, someone is at the door.", "The dog is barking.", "Someone is at the door.", ["The dog is asleep.", "It's bedtime.", "The cat is hungry."]], ["If you finish your chores, you can play.", "Leo finished his chores.", "Leo can play.", ["Leo has more chores.", "Leo must go to bed.", "Leo can't play."]], ["If it's Saturday, there's no school.", "Today is Saturday.", "There's no school.", ["There is school.", "It's a holiday party.", "It's Monday."]], ["If the plant gets water, it grows.", "We watered the plant.", "The plant grows.", ["The plant shrinks.", "The plant dances.", "The plant turns blue."]], ["If the bell rings, recess is over.", "The bell rang.", "Recess is over.", ["Recess is starting.", "It's lunchtime.", "School is closed."]]];
topic(7, "logic", {
  id: "ifthen", title: "If-Then Rules", icon: "➡️", blurb: "Use rules to figure out what happens.",
  lesson: [
    { t: "If this, then that", say: "An if-then rule tells what happens. If it rains, then we play inside.", html: `<div class="ifthen"><span><b>IF</b> it rains 🌧️</span>${arrow()}<span><b>THEN</b> we play inside 🏠</span></div>` },
    { t: "Use the rule", say: "If the rule is true, and the if part happens, then the then part happens too. It is raining. So, we play inside!", html: passage("Rule: If it rains, we play inside.<br>Fact: It is raining.") + note("So: <b>we play inside</b>.") },
    { t: "Shape rules", say: "Rules can be about shapes too. If a shape is blue, put it in the box. Find all the blue shapes!", html: row(shp("circle", "#3D7BFF", 56), shp("square", "#FF7A59", 56), shp("triangle", "#3D7BFF", 56)) + note("Blue → <b>box</b>") },
  ],
  gen() {
    if (Math.random() < 0.5) { const [r, f, a, d] = pick(IFRULES); return { q: "Use the rule. What happens?", say: `Rule: ${r} Fact: ${f} What happens?`, vis: passage(`<b>Rule:</b> ${r}<br><b>Fact:</b> ${f}`), opts: shuffle([a, ...d]), ans: a, why: `The rule says so: ${r}`, key: r }; }
    const cols = shuffle(Object.keys(COLNAME)), target = cols[0], tShape = pick(LSHAPES), byShape = Math.random() < 0.5;
    const right = byShape ? [tShape, pick(cols)] : [pick(LSHAPES), target];
    const wrong = []; while (wrong.length < 3) { const s = [pick(LSHAPES), pick(cols)]; if ((byShape ? s[0] !== tShape : s[1] !== target) && !wrong.some(w => w[0] === s[0] && w[1] === s[1])) wrong.push(s); }
    const rule = byShape ? `If it is a <b>${tShape}</b>, it goes in the box.` : `If it is <b>${COLNAME[target]}</b>, it goes in the box.`;
    return { q: `${rule} Which one goes in the box?`, say: `${clean(rule)} Which one goes in the box?`, opts: shuffle([right, ...wrong]).map(([n, c]) => shp(n, c, 64)), ans: shp(right[0], right[1], 64), sayAns: shpName(right[0], right[1]), why: byShape ? `Only the ${tShape} follows the rule.` : `Only the ${COLNAME[target]} one follows the rule.`, key: rule + right.join() };
  },
});
TRICK_ADD(7, "logic", "ifthen", "Check the IF part first. If it's true, the THEN part has to happen.");

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
topic(7, "logic", {
  id: "calendar", title: "Days of the Week", icon: "📅", blurb: "Yesterday, today and tomorrow puzzles.",
  lesson: [
    { t: "Seven days", say: "There are 7 days in a week: Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday. Then it starts again!", html: `<div class="week">${DAYS.map(d => `<span>${d.slice(0, 3)}</span>`).join("")}</div>` },
    { t: "Yesterday and tomorrow", say: "If today is Wednesday, yesterday was Tuesday and tomorrow is Thursday.", html: `<div class="week">${DAYS.map((d, i) => `<span class="${i === 3 ? "today" : i === 2 || i === 4 ? "near" : ""}">${d.slice(0, 3)}</span>`).join("")}</div>` + note("Tue ← <b>Wed</b> → Thu") },
    { t: "Counting days", say: "To find the day in 3 days, count forward 3. Wednesday: Thursday, Friday, Saturday. After Saturday comes Sunday again.", html: train(["Wed", "+1 Thu", "+2 Fri", "+3 Sat"]) },
  ],
  gen() {
    const t = R(0, 6), k = R(0, 3);
    if (k === 0) { const a = DAYS[(t + 1) % 7]; return { q: `If today is <b>${DAYS[t]}</b>, what day is <b>tomorrow</b>?`, opts: uniq(a, shuffle(DAYS.filter(d => d !== a))), ans: a, big: 1, why: `The day after ${DAYS[t]} is ${a}.`, key: "t" + t }; }
    if (k === 1) { const a = DAYS[(t + 6) % 7]; return { q: `If today is <b>${DAYS[t]}</b>, what day was <b>yesterday</b>?`, opts: uniq(a, shuffle(DAYS.filter(d => d !== a))), ans: a, big: 1, why: `The day before ${DAYS[t]} is ${a}.`, key: "y" + t }; }
    const n = R(2, 6), back = k === 3, a = DAYS[(t + (back ? -n : n) + 14) % 7];
    return { q: `If today is <b>${DAYS[t]}</b>, what day ${back ? `was it <b>${n} days ago</b>` : `will it be <b>in ${n} days</b>`}?`, vis: `<div class="week">${DAYS.map((d, i) => `<span class="${i === t ? "today" : ""}">${d.slice(0, 3)}</span>`).join("")}</div>`, opts: uniq(a, [DAYS[(t + (back ? -n + 1 : n - 1) + 14) % 7], DAYS[(t + (back ? -n - 1 : n + 1) + 14) % 7], ...shuffle(DAYS)]), ans: a, big: 1, why: `Count ${back ? "back" : "forward"} ${n} days from ${DAYS[t]}: ${a}.`, key: (back ? "b" : "f") + t + n };
  },
});
TRICK_ADD(7, "logic", "calendar", "Say the days like a song and count on your fingers. After Saturday, go back to Sunday.");

function pyramid(rows, hideR, hideC) { return `<div class="pyr">${rows.map((r, ri) => `<div class="pyr-row">${r.map((v, ci) => `<span class="${ri === hideR && ci === hideC ? "q" : ""}">${ri === hideR && ci === hideC ? "?" : v}</span>`).join("")}</div>`).join("")}</div>`; }
topic(8, "logic", {
  id: "pyramids", title: "Number Pyramids", icon: "🔺", blurb: "Each block is the sum of the two below.",
  lesson: [
    { t: "Building up", say: "In a number pyramid, each block is the sum of the two blocks under it. 3 plus 5 makes 8.", html: pyramid([[8], [3, 5]], -1, -1) },
    { t: "Bigger pyramids", say: "Add the bottom pairs to make the middle row. Then add the middle pair to make the top.", html: pyramid([[12], [5, 7], [2, 3, 4]], -1, -1) },
    { t: "Missing blocks", say: "If a bottom block is missing, subtract. The top is 12, one block under it is 5, so the other is 7.", html: pyramid([[12], [5, "?"]], -1, -1) + eq("12 − 5 = <b>7</b>") },
  ],
  gen() {
    const b = [R(1, 9), R(1, 9), R(1, 9)], m = [b[0] + b[1], b[1] + b[2]], t = m[0] + m[1], rows = [[t], m, b];
    const cells = [[0, 0], [1, 0], [1, 1], [2, 0], [2, 1], [2, 2]], [hr, hc] = pick(cells), ans = rows[hr][hc];
    const why = hr === 0 ? `${m[0]} + ${m[1]} = ${t}.` : hr === 1 ? `${b[hc]} + ${b[hc + 1]} = ${ans}.` : hc === 1 ? `${m[0]} − ${b[0]} = ${ans}.` : hc === 0 ? `${m[0]} − ${b[1]} = ${ans}.` : `${m[1]} − ${b[1]} = ${ans}.`;
    return { q: "Each block is the sum of the two blocks below it. What is the missing number?", say: "Each block is the sum of the two blocks below it. What is the missing number?", vis: pyramid(rows, hr, hc), opts: numU(ans, [ans + 1, ans - 1, ans + 2, ans + 10], 3, 0), ans: String(ans), big: 1, why, key: b.join() + hr + hc };
  },
});
TRICK_ADD(8, "logic", "pyramids", "Going up? Add the two below. Going down? Subtract the block you know from the block above.");

const COMPASS = { north: [-1, 0], south: [1, 0], east: [0, 1], west: [0, -1] };
topic(8, "logic", {
  id: "compass", title: "Map Directions", icon: "🧭", blurb: "North, south, east and west on a map.",
  lesson: [
    { t: "The compass rose", say: "On a map, north is up, south is down, east is right, and west is left.", html: `<div class="compass"><span class="n">N</span><span class="w">W</span><span class="c">🧭</span><span class="e">E</span><span class="s">S</span></div>` + note("Never Eat Soggy Waffles: N, E, S, W going clockwise") },
    { t: "Moving on a map", say: "Start at the house. Go 2 squares east, then 1 square north. Move one square at a time.", html: board(4, { "3,0": "🏠", "2,2": "🌳" }, null) + note("🏠 → 2 east → 1 north → 🌳") },
    { t: "Check your moves", say: "Touch the map and move your finger. East is right, west is left. North is up, south is down.", html: note("⬆ N · ➡ E · ⬇ S · ⬅ W") },
  ],
  gen() {
    const n = 4, things = shuffle(["🌳", "🏫", "🏪", "⛲", "🏥", "🎡", "🐄", "🏰"]);
    for (let tries = 0; tries < 60; tries++) {
      const r = R(0, n - 1), c = R(0, n - 1), steps = []; let p = [r, c];
      for (let i = 0; i < 2; i++) { const d = pick(Object.keys(COMPASS)), k = R(1, 2), np = [p[0] + COMPASS[d][0] * k, p[1] + COMPASS[d][1] * k]; if (np[0] < 0 || np[0] >= n || np[1] < 0 || np[1] >= n) continue; steps.push([d, k]); p = np; }
      if (!steps.length || (p[0] === r && p[1] === c)) continue;
      const cells = { [r + "," + c]: "🏠", [p.join()]: things[0] }, free = [];
      for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) if (!cells[i + "," + j]) free.push(i + "," + j);
      shuffle(free).slice(0, 3).forEach((k, i) => cells[k] = things[i + 1]);
      const txt = steps.map(([d, k]) => `${k} ${k === 1 ? "square" : "squares"} ${d}`).join(", then "), o = e => `<span class="emo">${e}</span>`;
      return { q: `Start at 🏠. Go <b>${txt}</b>. Where are you?`, say: `Start at the house. Go ${txt}. Where are you?`, vis: board(n, cells, null) + `<div class="compass mini"><span class="n">N</span><span class="w">W</span><span class="c">🧭</span><span class="e">E</span><span class="s">S</span></div>`, opts: shuffle(things.slice(0, 4)).map(o), ans: o(things[0]), sayAns: "the place where you stop", why: `North is up, south is down, east is right, west is left. ${cap(txt)} from the house.`, extra: 10, key: r + "" + c + txt };
    }
    return { q: "Start at 🏠. Go <b>1 square east</b>. Where are you?", vis: board(4, { "0,0": "🏠", "0,1": "🌳", "1,0": "🏫" }, null), opts: ["🌳", "🏫", "🏪"].map(e => `<span class="emo">${e}</span>`), ans: '<span class="emo">🌳</span>', sayAns: "the tree", why: "East is to the right.", key: "fallback" };
  },
});
TRICK_ADD(8, "logic", "compass", "Never Eat Soggy Waffles: North at the top, then East, South, West going around like a clock.");

topic(9, "logic", {
  id: "ages", title: "Age Puzzles", icon: "🎂", blurb: "Older, younger, and years from now.",
  lesson: [
    { t: "Older and younger", say: "Mia is 7. Leo is 3 years older. So Leo is 7 plus 3, which is 10.", html: eq("Leo = 7 + 3 = <b>10</b>") },
    { t: "Years from now", say: "Everyone gets older by the same amount. In 4 years, Mia will be 11 and Leo will be 14. The difference stays 3!", html: table([["now", "7", "10"], ["in 4 years", "11", "14"]], ["", "Mia", "Leo"]) },
    { t: "Twice as old", say: "If Dad is twice as old as Sam, and Sam is 9, Dad is 9 times 2, which is 18. Wait, that's a young dad! Check if answers make sense.", html: eq("2 × 9 = <b>18</b>") },
  ],
  gen() {
    const [p1, p2] = shuffle(KIDS).slice(0, 2), a = R(4, 10), d = R(2, 6), k = R(0, 3);
    if (k === 0) { const older = Math.random() < 0.5 || a - d < 1, ans = older ? a + d : a - d; return { q: `${p1} is ${a}. ${p2} is ${d} years ${older ? "older" : "younger"}. How old is ${p2}?`, opts: numU(ans, [older ? a - d : a + d, ans + 1, ans - 1, a], 2, 1), ans: String(ans), big: 1, why: `${a} ${older ? "+" : "−"} ${d} = ${ans}.`, key: "a" + a + d + older }; }
    if (k === 1) { const y = R(2, 8); return { q: `${p1} is ${a} now. How old will ${p1} be in ${y} years?`, opts: numU(a + y, [a + y + 1, a - y > 0 ? a - y : a + y + 2, a * y], 2, 1), ans: String(a + y), big: 1, why: `${a} + ${y} = ${a + y}.`, key: "b" + a + y }; }
    if (k === 2) { const m = R(2, 3), ans = a * m; return { q: `${p2} is ${a}. ${p2}'s big cousin is ${m === 2 ? "twice" : "three times"} as old. How old is the cousin?`, opts: numU(ans, [a + m, ans + a, ans - 1], 3, 1), ans: String(ans), big: 1, why: `${a} × ${m} = ${ans}.`, key: "c" + a + m }; }
    const b = a + d, y = R(2, 6);
    return { q: `${p1} is ${a} and ${p2} is ${b}. In ${y} years, how many years older will ${p2} be than ${p1}?`, opts: numU(d, [d + y, y, d + 1, d - 1], 2, 1), ans: String(d), big: 1, why: `They both get ${y} years older, so the difference stays ${b} − ${a} = ${d}.`, key: "d" + a + b + y };
  },
});
TRICK_ADD(9, "logic", "ages", "Draw a little table: now and later. Everyone ages the same number of years, so the difference between two people never changes.");

topic(9, "logic", {
  id: "twostep", title: "Two-Step Patterns", icon: "🪜", blurb: "Patterns with two rules at once.",
  lesson: [
    { t: "Two rules", say: "Some patterns use two steps. Times 2, then add 1. 1, 3, 7, 15. Each number is doubled, plus 1.", html: train([1, 3, 7, 15, "?"]) + eq("×2 then +1 → <b>31</b>") },
    { t: "Taking turns", say: "Some patterns switch rules. Add 3, subtract 1, add 3, subtract 1. 2, 5, 4, 7, 6, 9.", html: train([2, 5, 4, 7, 6, 9]) + note("+3, −1, +3, −1…") },
    { t: "Add the two before", say: "In a famous pattern, each number is the sum of the two before it. 1, 1, 2, 3, 5, 8, 13.", html: train([1, 1, 2, 3, 5, 8, "?"]) + eq("5 + 8 = <b>13</b>") },
  ],
  gen() {
    const k = R(0, 2); let seq, rule;
    if (k === 0) { const m = pick([2, 3]), p = pick([1, 2, -1]), s = R(1, 4); seq = [s]; for (let i = 0; i < 5; i++) seq.push(seq[i] * m + p); rule = `×${m} then ${p > 0 ? "+" : "−"}${Math.abs(p)}`; }
    else if (k === 1) { const a = R(2, 6), b = R(1, a - 1), s = R(1, 10); seq = [s]; for (let i = 0; i < 6; i++) seq.push(seq[i] + (i % 2 ? -b : a)); rule = `+${a}, −${b}, taking turns`; }
    else { const x = R(1, 4), y = R(1, 5); seq = [x, y]; for (let i = 0; i < 5; i++) seq.push(seq[i] + seq[i + 1]); rule = "add the two numbers before"; }
    const show = seq.slice(0, seq.length - 1), ans = seq[seq.length - 1], prev = show[show.length - 1];
    return { q: "What number comes next?", vis: train([...show, "?"]), opts: numU(ans, [ans + 1, ans - 1, prev + (prev - show[show.length - 2]), ans + 2], 4, 0), ans: String(ans), big: 1, why: `The rule is ${rule}.`, key: seq.join() };
  },
});
TRICK_ADD(9, "logic", "twostep", "Write the jumps between numbers. If the jumps change, look for a pattern in the jumps themselves.");

