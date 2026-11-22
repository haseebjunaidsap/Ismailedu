/* =====================================================================
   v14: two more topics per subject per age (English, Math, Logic)
   ===================================================================== */

/* ====================== ENGLISH ====================== */
const QWORDS = [["Who", "a person", ["👩‍🏫", "Who teaches your class?", "my teacher"], ["🧑‍🚒", "Who puts out fires?", "a firefighter"]], ["What", "a thing", ["🍎", "What is red and crunchy?", "an apple"], ["🐶", "What says woof?", "a dog"]], ["Where", "a place", ["🏫", "Where do you learn?", "at school"], ["🛏️", "Where do you sleep?", "in bed"]], ["When", "a time", ["🌙", "When do you go to sleep?", "at night"], ["🎂", "When do you get cake?", "on your birthday"]]];
const QW_ITEMS = [["the park", "Where"], ["at lunchtime", "When"], ["Grandma", "Who"], ["a ball", "What"], ["in the kitchen", "Where"], ["in the morning", "When"], ["the doctor", "Who"], ["a sandwich", "What"], ["at the beach", "Where"], ["after school", "When"], ["my brother", "Who"], ["a book", "What"], ["under the bed", "Where"], ["on Saturday", "When"], ["the bus driver", "Who"], ["a kite", "What"]];
topic(6, "english", {
  id: "qwords", title: "Question Words", icon: "❓", blurb: "Who, what, where and when.",
  lesson: [
    { t: "Asking questions", say: "We use question words to ask about things. Who asks about a person. What asks about a thing.", html: table([["Who?", "a person 🧑"], ["What?", "a thing 📦"], ["Where?", "a place 🏠"], ["When?", "a time ⏰"]], ["Word", "Asks about"]) },
    { t: "Where and when", say: "Where asks about a place, like the park. When asks about a time, like after lunch.", html: row(col(bigEmo("🏞️"), "<b>Where?</b> at the park"), col(bigEmo("🕐"), "<b>When?</b> after lunch")) },
    { t: "Match the answer", say: "If the answer is a person, the question uses who. Who is at the door? Grandma!", html: `<div class="sentence big-sentence"><b class="hl">Who</b> is at the door? 👵 Grandma!</div>` },
  ],
  gen() {
    if (Math.random() < 0.6) { const [ans, w] = pick(QW_ITEMS); return { q: `The answer is “<b>${ans}</b>.” Which question word fits?`, say: `The answer is ${ans}. Which question word fits?`, opts: ["Who", "What", "Where", "When"], ans: w, big: 1, why: `“${cap(ans)}” is ${QWORDS.find(x => x[0] === w)[1]}, so the question starts with ${w}.`, key: "a" + ans }; }
    const [w, , ...exs] = pick(QWORDS), [e, q, a] = pick(exs);
    return { q: `<span class="emo">${e}</span> ${q.replace(w, '<span class="blank">___</span>')}`, say: `Which word starts this question? Blank ${q.slice(w.length)}`, opts: ["Who", "What", "Where", "When"], ans: w, big: 1, why: `The answer is ${a}, so we ask ${w}.`, key: "b" + q };
  },
});
TRICK_ADD(6, "english", "qwords", "Think about the answer. A person means Who. A thing means What. A place means Where. A time means When.");

topic(6, "english", {
  id: "abcnext", title: "ABC Neighbors", icon: "🔤", blurb: "Which letter comes before or after?",
  lesson: [
    { t: "The alphabet line", say: "The alphabet goes in order from A to Z. Every letter has neighbors on each side.", html: `<div class="abc-strip">${ALPHA.split("").map(l => `<span>${l}</span>`).join("")}</div>` },
    { t: "After", say: "To find what comes after, say the letter and keep going. A, B. B comes after A!", html: train(["A", "B", "C", "?"]) + note("After <b>C</b> comes <b>D</b>") },
    { t: "Before", say: "To find what comes before, look one step back. Before F is E.", html: train(["?", "F", "G"]) + note("Before <b>F</b> comes <b>E</b>") },
  ],
  gen() {
    const i = R(1, 24), after = Math.random() < 0.5, low = Math.random() < 0.4, L = c => low ? c.toLowerCase() : c, ans = L(ALPHA[after ? i + 1 : i - 1]);
    const cands = [ALPHA[i], ALPHA[after ? i - 1 : i + 1], ALPHA[after ? i + 2 : i - 2], ALPHA[(i + 7) % 26], ALPHA[(i + 11) % 26]].filter(Boolean).map(L);
    return { q: `Which letter comes <b>${after ? "after" : "before"}</b> <b>${L(ALPHA[i])}</b>?`, say: `Which letter comes ${after ? "after" : "before"} ${ALPHA[i]}?`, vis: train(after ? [L(ALPHA[i - 1]), L(ALPHA[i]), "?"] : ["?", L(ALPHA[i]), L(ALPHA[i + 1])]), opts: uniq(ans, cands), ans, big: 1, why: `${after ? `${L(ALPHA[i])}, then ${ans}` : `${ans}, then ${L(ALPHA[i])}`}. Sing the alphabet song to check!`, key: i + "" + after + low };
  },
});
TRICK_ADD(6, "english", "abcnext", "Sing the alphabet song slowly and stop at the letter. The next letter you sing comes after it.");

const INGW = [["jump", "jumping"], ["play", "playing"], ["read", "reading"], ["sing", "singing"], ["eat", "eating"], ["run", "running"], ["swim", "swimming"], ["sit", "sitting"], ["hop", "hopping"], ["make", "making"], ["ride", "riding"], ["bake", "baking"], ["dance", "dancing"], ["write", "writing"], ["cut", "cutting"], ["clap", "clapping"]];
topic(7, "english", {
  id: "ing", title: "Adding -ing", icon: "🏃", blurb: "Jump → jumping, run → running, make → making.",
  lesson: [
    { t: "Just add -ing", say: "Add i n g to show something is happening now. Jump becomes jumping. Play becomes playing.", html: table([["jump", "jump<b class='hl'>ing</b>"], ["play", "play<b class='hl'>ing</b>"], ["read", "read<b class='hl'>ing</b>"]], ["word", "-ing"]) },
    { t: "Double the last letter", say: "Short words with one vowel and one last consonant double it. Run becomes running, swim becomes swimming.", html: table([["run", "ru<b class='hl'>nn</b>ing"], ["swim", "swi<b class='hl'>mm</b>ing"], ["hop", "ho<b class='hl'>pp</b>ing"]], ["word", "-ing"]) },
    { t: "Drop the silent e", say: "If a word ends in a silent e, drop the e first. Make becomes making. Ride becomes riding.", html: table([["make", "mak<b class='hl'>ing</b>"], ["ride", "rid<b class='hl'>ing</b>"], ["dance", "danc<b class='hl'>ing</b>"]], ["word", "-ing"]) },
  ],
  gen() {
    const [b, ing] = pick(INGW), e = b.endsWith("e");
    const wrong = [b + "ing", b.endsWith("e") ? b + "ing" : b + b.slice(-1) + "ing", b.replace(/e$/, "") + "ing", b + "eing", b.slice(0, -1) + "ing"].filter(x => x !== ing);
    return { q: `Add <b>-ing</b> to <b>${b}</b>.`, say: `Add i n g to ${b}. Which spelling is right?`, vis: hw(`${b} + ing`), opts: uniq(ing, shuffle(wrong)), ans: ing, big: 1, why: e ? `Drop the silent e, then add ing: ${ing}.` : ing.length === b.length + 4 ? `Double the last letter, then add ing: ${ing}.` : `Just add ing: ${ing}.`, key: b };
  },
});
TRICK_ADD(7, "english", "ing", "Ends in a silent e? Drop it. Short word like run or hop? Double the last letter. Otherwise, just add -ing.");

const SILENT = [["knife", "k", "🔪"], ["knee", "k", "🦵"], ["knot", "k", "🪢"], ["knock", "k", "🚪"], ["write", "w", "✍️"], ["wrist", "w", "⌚"], ["wrap", "w", "🎁"], ["wren", "w", "🐦"], ["lamb", "b", "🐑"], ["thumb", "b", "👍"], ["comb", "b", "🪮"], ["climb", "b", "🧗"], ["ghost", "h", "👻"], ["hour", "h", "⏰"], ["castle", "t", "🏰"], ["whistle", "t", "📯"], ["sign", "g", "🪧"], ["gnome", "g", "🧙"]];
topic(7, "english", {
  id: "silent", title: "Silent Letters", icon: "🤫", blurb: "Letters you see but don't hear.",
  lesson: [
    { t: "Shhh! Silent letters", say: "Some letters are silent. You write them, but you don't say them. In knife, the k is silent. We say nife.", html: row(bigEmo("🔪"), hw(`<span class="silent-l">k</span>nife`, "big")) },
    { t: "Common silent letters", say: "K N, like knee. W R, like write. M B, like lamb.", html: table([["kn", "knee 🦵", "k is silent"], ["wr", "write ✍️", "w is silent"], ["mb", "lamb 🐑", "b is silent"]], ["Team", "Example", "Silent"]) },
    { t: "More sneaky ones", say: "The h in ghost and hour is silent. The t in castle is silent too!", html: `<div class="chips">${["g<span class='silent-l'>h</span>ost", "<span class='silent-l'>h</span>our", "cas<span class='silent-l'>t</span>le"].map((w, i) => chip(w, ["ghost", "hour", "castle"][i], "lg")).join("")}</div>` },
  ],
  gen() {
    const [w, l, e] = pick(SILENT), letters = [...new Set(w.split(""))].filter(c => c !== l && !(c === "e" && /e$/.test(w)) && !(/gh/.test(w) && /[gh]/.test(c)) && !(c === "k" && /^kn/.test(w)) && !(c === "w" && /^wr/.test(w)) && !(c === "b" && /mb$/.test(w)));
    return { q: `Which letter is <b>silent</b> in <b>${w}</b>?`, say: `Which letter is silent in ${w}?`, vis: col(bigEmo(e), hw(w)), opts: uniq(l, shuffle(letters)), ans: l, big: 1, why: `In ${w}, you don't hear the ${l}.`, key: w };
  },
});
TRICK_ADD(7, "english", "silent", "Say the word slowly and point to each letter. The letter your mouth skips is the silent one.");

const POSS = [["The dog has a bone.", "dog", "The dog's bone"], ["Mia has a kite.", "Mia", "Mia's kite"], ["The cat has a toy.", "cat", "The cat's toy"], ["Leo has a bike.", "Leo", "Leo's bike"], ["The teacher has a desk.", "teacher", "The teacher's desk"], ["My mom has a car.", "mom", "My mom's car"], ["The bird has a nest.", "bird", "The bird's nest"], ["Sam has a hat.", "Sam", "Sam's hat"], ["The baby has a rattle.", "baby", "The baby's rattle"], ["Ava has a puppy.", "Ava", "Ava's puppy"], ["The farmer has a tractor.", "farmer", "The farmer's tractor"], ["Grandpa has a garden.", "Grandpa", "Grandpa's garden"]];
topic(8, "english", {
  id: "possessive", title: "Possessives ('s)", icon: "🏷️", blurb: "Show who owns something.",
  lesson: [
    { t: "Who does it belong to?", say: "To show that something belongs to someone, add an apostrophe and s. The dog's bone means the bone that belongs to the dog.", html: row(bigEmo("🐶"), `<span class="sym">+</span>`, bigEmo("🦴")) + `<div class="sentence big-sentence">the dog<b class="hl">'s</b> bone</div>` },
    { t: "Plural or possessive?", say: "Dogs with no apostrophe means more than one dog. Dog's with an apostrophe means something belongs to the dog.", html: table([["dogs", "more than one dog 🐶🐶"], ["dog's", "belongs to one dog 🐶🦴"]], ["Word", "Means"]) },
    { t: "Names too", say: "Names get apostrophe s too. Mia's kite. Leo's bike.", html: `<div class="chips">${chip("Mia<b class='hl'>'s</b> kite 🪁", "Mia's kite", "lg")}${chip("Leo<b class='hl'>'s</b> bike 🚲", "Leo's bike", "lg")}</div>` },
  ],
  gen() {
    const [s, n, a] = pick(POSS), thing = a.split(" ").pop(), pre = a.slice(0, a.indexOf(n));
    if (Math.random() < 0.6) return { q: `<div class="sentence">${s}</div>Which shows it belongs to ${n === cap(n) ? n : "the " + n}?`, say: `${s} Which one shows who it belongs to?`, opts: uniq(a, [`${pre}${n}s ${thing}`, `${pre}${n}s' ${thing}`, `${pre}${n} ${thing}s`]), ans: a, why: `Add apostrophe s to ${n}: ${a}.`, key: "a" + s };
    const plural = Math.random() < 0.5 && n !== cap(n), pl = /[^aeiou]y$/.test(n) ? n.slice(0, -1) + "ies" : /(s|x|z|ch|sh)$/.test(n) ? n + "es" : n + "s", who = n === cap(n) ? n : "the " + n;
    return { q: `Which word means <b>${plural ? "more than one " + n : "belongs to " + who}</b>?`, say: `Which word means ${plural ? "more than one " + n : "belongs to " + who}?`, opts: [pl, n + "'s"], ans: plural ? pl : n + "'s", big: 1, why: plural ? "No apostrophe: just more than one." : "The apostrophe s shows it belongs to them.", key: "b" + n + plural };
  },
});
TRICK_ADD(8, "english", "possessive", "Ask: does something belong to them? If yes, add 's. If there are just more of them, add s with no apostrophe.");

const STORIES = [{ p: "On a snowy morning, Penguin Pete waddled across the icy beach. He wanted to find a shiny shell for his friend Polly. He searched and searched until he finally found a sparkly blue one.", chars: "Penguin Pete", setting: "an icy beach on a snowy morning", problem: "He wanted to find a shiny shell.", wrongC: ["Polly", "a seal", "a fisherman"], wrongS: ["a hot desert", "a busy city", "a school classroom"], wrongP: ["He was lost in a forest.", "His boat sank.", "He forgot his lunch."] },
  { p: "At the school science fair, Ruby set up her volcano. When she poured in the vinegar, nothing happened! Ruby checked her notes, added more baking soda, and the volcano finally bubbled over.", chars: "Ruby", setting: "the school science fair", problem: "Her volcano wouldn't erupt.", wrongC: ["the judge", "a volcano", "her teacher"], wrongS: ["a real mountain", "the beach", "a dark cave"], wrongP: ["She lost her backpack.", "It started to rain.", "Her friend was late."] },
  { p: "Deep in the jungle, a little monkey named Coco couldn't reach the bananas at the top of the tree. She asked her friend Ellie the elephant for help. Ellie lifted Coco up with her trunk.", chars: "Coco the monkey", setting: "deep in the jungle", problem: "She couldn't reach the bananas.", wrongC: ["a tiger", "a parrot", "a zookeeper"], wrongS: ["under the sea", "a snowy mountain", "a farm"], wrongP: ["She was too sleepy.", "The tree fell down.", "It was too hot."] },
  { p: "In the small town library, Max found a book with a secret map inside. The map showed a hidden room behind the bookshelves. Max and the librarian searched until they found a tiny door.", chars: "Max", setting: "the small town library", problem: "He wanted to find the hidden room on the map.", wrongC: ["a pirate", "a dragon", "his dog"], wrongS: ["a pirate ship", "the moon", "a playground"], wrongP: ["The library was closed.", "He lost his library card.", "He couldn't read."] }];
topic(8, "english", {
  id: "storyparts", title: "Story Elements", icon: "📚", blurb: "Characters, setting and problem.",
  lesson: [
    { t: "Characters", say: "Characters are the people or animals in a story. The main character is the one the story is mostly about.", html: pics2([["🧒", "people"], ["🐻", "animals"], ["🤖", "even robots!"]]) },
    { t: "Setting", say: "The setting is where and when the story happens. It could be a jungle at night or a school in the morning.", html: row(col(bigEmo("🌴"), "<b>where</b>"), col(bigEmo("🌙"), "<b>when</b>")) },
    { t: "Problem and solution", say: "Most stories have a problem, something that goes wrong. The solution is how it gets fixed.", html: row(col(bigEmo("😟"), "<b>problem</b>"), arrow(), col(bigEmo("😃"), "<b>solution</b>")) },
  ],
  gen() {
    const i = R(0, STORIES.length - 1), S = STORIES[i], k = R(0, 2);
    const [q, a, w] = k === 0 ? ["Who is the <b>main character</b>?", S.chars, S.wrongC] : k === 1 ? ["What is the <b>setting</b>?", S.setting, S.wrongS] : ["What is the <b>problem</b>?", S.problem, S.wrongP];
    return { q, say: `${S.p} ${clean(q)}`, vis: passage(S.p), opts: shuffle([a, ...w]), ans: a, why: k === 0 ? "The story is mostly about this character." : k === 1 ? "That's where the story happens." : "That's what goes wrong before it gets fixed.", extra: 20, key: i + "-" + k };
  },
});
TRICK_ADD(8, "english", "storyparts", "Ask three questions: Who is it about? Where and when is it? What goes wrong?");

const ROOTS = [["tele", "far", ["telephone", "television", "telescope"]], ["port", "carry", ["portable", "transport", "airport"]], ["phon", "sound", ["phone", "microphone", "symphony"]], ["graph", "write or draw", ["autograph", "paragraph", "photograph"]], ["aqua", "water", ["aquarium", "aquatic"]], ["bio", "life", ["biology", "biography"]], ["geo", "earth", ["geography", "geology"]], ["micro", "small", ["microscope", "microphone"]], ["scope", "look at", ["telescope", "microscope", "periscope"]], ["tri", "three", ["triangle", "tricycle", "tripod"]], ["bi", "two", ["bicycle", "binoculars"]], ["auto", "self", ["autograph", "automatic"]]];
topic(9, "english", {
  id: "roots", title: "Word Roots", icon: "🌳", blurb: "Greek and Latin word parts like tele and port.",
  lesson: [
    { t: "Word roots", say: "Many English words are built from old Greek and Latin parts called roots. Tele means far. Phone means sound. A telephone carries sound from far away!", html: row(hw(`<b class="hl">tele</b>`), `<span class="sym">+</span>`, hw(`<b class="noun">phone</b>`)) + note("far + sound = <b>telephone</b> ☎️") },
    { t: "More roots", say: "Port means carry. Graph means write. Tri means three. Aqua means water.", html: table(ROOTS.slice(0, 6).map(([r, m, w]) => [r, m, w[0]]), ["Root", "Means", "Example"]) },
    { t: "Crack new words", say: "If you know the roots, you can figure out new words. A tricycle has three wheels. An aquarium holds water.", html: `<div class="chips">${["🚲 bicycle", "🔭 telescope", "🐠 aquarium", "🔺 triangle"].map(w => `<span class="chip lg">${w}</span>`).join("")}</div>` },
  ],
  gen() {
    const i = R(0, ROOTS.length - 1), [r, m, ws] = ROOTS[i], w = pick(ws), others = shuffle(ROOTS.filter((_, j) => j !== i));
    if (Math.random() < 0.55) return { q: `The root <b>${r}</b> means…`, say: `The root ${r.split("").join(" ")}, like in ${w}, means what?`, vis: hw(w.replace(r, `<b class="hl">${r}</b>`)), opts: uniq(m, others.map(o => o[1])), ans: m, why: `${r} means ${m}, like in ${ws.join(", ")}.`, key: "m" + r + w };
    const wrongs = others.flatMap(o => o[2]).filter(x => !x.includes(r));
    return { q: `Which word has the root meaning <b>${m}</b>?`, say: `Which word has the root meaning ${m}?`, opts: uniq(w, shuffle(wrongs)), ans: w, big: 1, why: `${w} has ${r}, which means ${m}.`, key: "w" + r + w };
  },
});
TRICK_ADD(9, "english", "roots", "Look for a part you know inside the long word, like tele, tri or port. Its meaning is a big clue.");

/* words that would also make sense in a sentence, so they are never offered as wrong choices */
const LINK_ALSO_FITS = [["I was hungry", ["and"]], ["Mia studied hard", ["and"]], ["The dog barked", ["when", "and"]], ["We stayed inside", ["when"]], ["Leo is fast", ["and"]], ["The road was icy", ["and"]], ["I brushed my teeth", ["and", "when"]], ["We'll go to the park", ["before", "and"]], ["I felt tired", ["when", "so"]], ["I wanted to play outside", ["and"]]];
const LINKS = [["I wanted to play outside, ___ it was raining.", "but", "Use but for a surprise or opposite."], ["I was hungry, ___ I made a sandwich.", "so", "Use so for what happened as a result."], ["We stayed inside ___ it was cold.", "because", "Use because to give a reason."], ["I like apples ___ bananas.", "and", "Use and to add things together."], ["Mia studied hard, ___ she passed the test.", "so", "So shows the result."], ["The dog barked ___ it heard a noise.", "because", "Because gives the reason."], ["Leo is fast, ___ Sam is faster.", "but", "But shows a contrast."], ["We packed sandwiches ___ juice.", "and", "And joins two things."], ["You can have juice ___ milk.", "or", "Or gives a choice."], ["The road was icy, ___ we drove slowly.", "so", "So shows the result."], ["I brushed my teeth ___ I went to bed.", "before", "Before shows which came first."], ["We'll go to the park ___ the rain stops.", "when", "When tells the time something will happen."], ["Do you want pizza ___ pasta?", "or", "Or gives a choice."], ["I felt tired ___ I stayed up late.", "because", "Because gives the reason."]];
topic(9, "english", {
  id: "linking", title: "Linking Words", icon: "🔗", blurb: "and, but, so, because, or.",
  lesson: [
    { t: "Words that join ideas", say: "Linking words join two ideas into one sentence. And, but, so, because, and or.", html: table([["and", "adds", "cats and dogs"], ["but", "opposite", "small but strong"], ["so", "result", "tired, so I slept"], ["because", "reason", "I slept because I was tired"], ["or", "choice", "milk or juice"]], ["Word", "Job", "Example"]) },
    { t: "So or because?", say: "So tells the result. Because tells the reason. It rained, so we stayed in. We stayed in because it rained.", html: `<div class="sentence big-sentence">It rained, <b class="hl">so</b> we stayed in.</div><div class="sentence big-sentence">We stayed in <b class="hl">because</b> it rained.</div>` },
    { t: "Pick the best link", say: "Read both parts. Do they add, show an opposite, give a result, a reason, or a choice? That tells you which word to use.", html: note("add → <b>and</b> · opposite → <b>but</b> · result → <b>so</b> · reason → <b>because</b> · choice → <b>or</b>") },
  ],
  gen() {
    const [s, a, why] = pick(LINKS), skip = LINK_ALSO_FITS.find(([p]) => s.startsWith(p)), pool = ["and", "but", "so", "because", "or", "before", "when"].filter(x => x !== a && !(skip && skip[1].includes(x)));
    return { q: `<div class="sentence">${s.replace("___", '<span class="blank">___</span>')}</div>Which linking word fits best?`, say: `${s.replace("___", "blank")} Which linking word fits best?`, opts: uniq(a, shuffle(pool)), ans: a, big: 1, why: `${why} ${s.replace("___", a)}`, key: s };
  },
});
TRICK_ADD(9, "english", "linking", "Try each word out loud in the sentence. The one that makes the two ideas fit together sensibly is the right link.");

/* ====================== MATH ====================== */
const tally = n => `<span class="tally">${Array.from({ length: Math.floor(n / 5) }, () => '<span class="t5">||||</span>').join("")}${n % 5 ? `<span class="t1">${"|".repeat(n % 5)}</span>` : ""}</span>`;
topic(6, "math", {
  id: "tally", title: "Tally Marks", icon: "📝", blurb: "Count with sticks in groups of five.",
  lesson: [
    { t: "One stick each", say: "A tally mark is a quick stick you draw to count. One stick for each thing.", html: row(tally(3), arrow(), eq("3")) },
    { t: "Bundle of five", say: "When you get to five, draw a line across the first four. That makes a bundle of five!", html: row(tally(5), arrow(), eq("5")) },
    { t: "Count by fives", say: "Count the bundles by fives, then count on the extra sticks. 5, 10, 11, 12. That's 12!", html: row(tally(12), arrow(), eq("12")) },
  ],
  gen() {
    const n = R(1, 20), t = pick(THINGS);
    if (Math.random() < 0.6) return { q: "How many do the tally marks show?", vis: tally(n), opts: numU(n, [n + 1, n - 1, n + 5, n - 5], 2, 1), ans: String(n), big: 1, why: n >= 5 ? `${Math.floor(n / 5)} bundle${n >= 10 ? "s" : ""} of 5 is ${Math.floor(n / 5) * 5}, plus ${n % 5} more is ${n}.` : `Count each stick: ${n}.`, key: "c" + n };
    const others = shuffle([n + 1, n - 1, n + 5, n - 5].filter(x => x > 0 && x <= 25)).slice(0, 3);
    return { q: `Which tally shows <b>${n}</b> ${t[1]}?`, say: `Which tally marks show ${n}?`, vis: grp(Math.min(n, 12), t[0]) + (n > 12 ? `<small>…and ${n - 12} more</small>` : ""), opts: shuffle([n, ...others]).map(x => `<span class="tally-opt" aria-label="${x} tally marks">${tally(x)}</span>`), ans: `<span class="tally-opt" aria-label="${n} tally marks">${tally(n)}</span>`, sayAns: `${n} tally marks`, why: `${n} is ${Math.floor(n / 5)} bundle${n >= 10 ? "s" : ""} of five and ${n % 5} more.`, key: "p" + n + t[1] };
  },
});
TRICK_ADD(6, "math", "tally", "Count each bundle as 5: 5, 10, 15. Then count on the single sticks.");

const LONGTHINGS = [["✏️", "pencil", "#FFC93C"], ["🥕", "carrot", "#FF9A3C"], ["🐛", "caterpillar", "#1FAF6E"], ["🥖", "bread", "#D69163"], ["🖍️", "crayon", "#FF7A59"], ["🦎", "lizard", "#1FAF6E"]];
function cubeMeasure(n, colr) { return `<div class="cube-measure"><div class="cm-thing" style="width:${n * 34}px;background:${colr}"></div><div class="cm-cubes">${Array.from({ length: n }, () => "<span></span>").join("")}</div></div>`; }
topic(6, "math", {
  id: "cubes", title: "Measure with Cubes", icon: "🧊", blurb: "How many cubes long is it?",
  lesson: [
    { t: "Line up cubes", say: "We can measure how long something is by lining up cubes. Put them end to end, with no gaps!", html: cubeMeasure(5, "#FFC93C") + note("This pencil is <b>5 cubes</b> long ✏️") },
    { t: "No gaps, no overlaps", say: "Start at the very end of the object. Don't leave gaps between cubes, and don't stack them on top of each other.", html: note("✔ End to end · ✘ No gaps · ✘ No overlaps") },
    { t: "Compare lengths", say: "The thing with more cubes is longer. A carrot that is 7 cubes is longer than a crayon that is 4 cubes.", html: cubeMeasure(7, "#FF9A3C") + cubeMeasure(4, "#FF7A59") },
  ],
  gen() {
    if (Math.random() < 0.65) { const [e, n, colr] = pick(LONGTHINGS), len = R(2, 9); return { q: `How many cubes long is the ${n}? <span class="emo">${e}</span>`, say: `How many cubes long is the ${n}?`, vis: cubeMeasure(len, colr), opts: numU(len, [len + 1, len - 1, len + 2], 2, 1), ans: String(len), big: 1, why: `Count the cubes under it: ${len}.`, key: n + len }; }
    const [a, b] = shuffle(LONGTHINGS).slice(0, 2), la = R(2, 9); let lb = R(2, 9); while (lb === la) lb = R(2, 9);
    const longer = Math.random() < 0.5, ans = (longer ? la > lb : la < lb) ? a : b, o = x => `<span class="emo" title="${x[1]}">${x[0]}</span> ${x[1]}`;
    return { q: `Which is <b>${longer ? "longer" : "shorter"}</b>?`, say: `Which is ${longer ? "longer" : "shorter"}?`, vis: `<div class="col-c"><span>${a[0]} ${a[1]}</span>${cubeMeasure(la, a[2])}<span>${b[0]} ${b[1]}</span>${cubeMeasure(lb, b[2])}</div>`, opts: [o(a), o(b)], ans: o(ans), why: `The ${a[1]} is ${la} cubes and the ${b[1]} is ${lb} cubes.`, key: a[1] + la + b[1] + lb + longer };
  },
});
TRICK_ADD(6, "math", "cubes", "Touch each cube as you count, from one end of the object to the other.");

topic(7, "math", {
  id: "add3", title: "Adding Three Numbers", icon: "➕", blurb: "Add three numbers by finding a ten.",
  lesson: [
    { t: "Two at a time", say: "To add three numbers, add two first, then add the third. 2 plus 3 is 5. 5 plus 4 is 9.", html: eq("2 + 3 + 4") + eq("5 + 4 = <b>9</b>") },
    { t: "Look for a ten", say: "Look for two numbers that make 10. In 7 plus 5 plus 3, 7 and 3 make 10. Then 10 plus 5 is 15!", html: eq(`<span class="d-t">7</span> + 5 + <span class="d-t">3</span>`) + eq("10 + 5 = <b>15</b>") },
    { t: "Order doesn't matter", say: "You can add numbers in any order and get the same answer. Pick the easiest order!", html: eq("4 + 6 + 2 = 6 + 4 + 2 = <b>12</b>") },
  ],
  gen() {
    let a = R(1, 9), b = R(1, 9), c = R(1, 9);
    if (Math.random() < 0.5) { a = R(1, 9); c = 10 - a; b = R(1, 9); }
    const s = a + b + c, nums = shuffle([a, b, c]), pair = a + c === 10 ? `${a} + ${c} = 10, then 10 + ${b} = ${s}.` : `${nums[0]} + ${nums[1]} = ${nums[0] + nums[1]}, then + ${nums[2]} = ${s}.`;
    return { q: `What is ${nums.join(" + ")}?`, vis: eq(`${nums.join(" + ")} = ${blank()}`), opts: numU(s, [s + 1, s - 1, s + 10, nums[0] + nums[1]], 3, 1), ans: String(s), big: 1, why: pair, key: nums.join("+") };
  },
});
TRICK_ADD(7, "math", "add3", "Hunt for two numbers that make 10, like 7 and 3 or 6 and 4. Add those first.");

const PICTO = [["Books read", "📘", ["Mia", "Leo", "Ava", "Sam"]], ["Apples picked", "🍎", ["Mon", "Tue", "Wed", "Thu"]], ["Goals scored", "⚽", ["Red", "Blue", "Green", "Gold"]], ["Fish caught", "🐟", ["Dad", "Mom", "Kai", "Zoe"]]];
function pictograph(title, e, rows, key) { return `<div class="picto"><div class="picto-title">${title}</div>${rows.map(([n, v]) => `<div class="picto-row"><b>${n}</b><span>${Array(v / key).fill(`<span class="emo">${e}</span>`).join("")}</span></div>`).join("")}<div class="picto-key"><span class="emo">${e}</span> = ${key}</div></div>`; }
topic(7, "math", {
  id: "pictograph", title: "Picture Graphs", icon: "📈", blurb: "Read graphs where each picture means a number.",
  lesson: [
    { t: "Pictures stand for numbers", say: "A picture graph uses pictures to show how many. Count the pictures in each row.", html: pictograph("Books read", "📘", [["Mia", 3], ["Leo", 5]], 1) },
    { t: "Read the key", say: "The key tells what each picture is worth. If one apple means 2 apples, then 3 pictures means 6 apples!", html: pictograph("Apples picked", "🍎", [["Mon", 6], ["Tue", 4]], 2) + note("Each 🍎 = <b>2</b>, so Mon = 3 × 2 = <b>6</b>") },
    { t: "Compare rows", say: "You can compare rows. Which has the most? How many more?", html: note("Longest row = <b>most</b>") },
  ],
  gen() {
    const [title, e, names] = pick(PICTO), key = pick([1, 2, 2, 5]), vals = names.map(() => key * R(1, 6)), rows = names.map((n, i) => [n, vals[i]]), vis = pictograph(title, e, rows, key), k = R(0, 2);
    if (k === 0) { const i = R(0, 3); return { q: `How many for <b>${names[i]}</b>?`, vis, opts: numU(vals[i], [vals[i] / key, vals[i] + key, vals[i] - key], key, 0), ans: String(vals[i]), big: 1, why: `${vals[i] / key} pictures × ${key} = ${vals[i]}.`, key: title + vals.join() + i }; }
    if (k === 1) { const mx = Math.max(...vals); if (vals.filter(v => v === mx).length > 1) return this.gen(); return { q: "Which row has the <b>most</b>?", vis, opts: names.slice(), ans: names[vals.indexOf(mx)], big: 1, why: `${names[vals.indexOf(mx)]} has the longest row: ${mx}.`, key: "m" + title + vals.join() }; }
    let a = R(0, 3), b = R(0, 3); while (b === a || vals[a] === vals[b]) { a = R(0, 3); b = R(0, 3); if (new Set(vals).size === 1) break; } if (vals[a] < vals[b]) [a, b] = [b, a]; const d = vals[a] - vals[b];
    return { q: `How many more for <b>${names[a]}</b> than <b>${names[b]}</b>?`, vis, opts: numU(d, [d / key | 0 || d + 1, d + key, vals[a]], key, 0), ans: String(d), big: 1, why: `${vals[a]} − ${vals[b]} = ${d}.`, key: "d" + title + vals.join() + a + b };
  },
});
TRICK_ADD(7, "math", "pictograph", "Always check the key first. Count the pictures, then multiply by what one picture is worth.");

topic(8, "math", {
  id: "missingfactor", title: "Missing Factors", icon: "🔍", blurb: "Solve ? × 4 = 24.",
  lesson: [
    { t: "Something's missing", say: "What times 4 equals 24? Think of your 4 times table: 4, 8, 12, 16, 20, 24. That's 6 jumps! So the missing number is 6.", html: eq(`${blank()} × 4 = 24`) + train([4, 8, 12, 16, 20, 24]) },
    { t: "Use division", say: "You can also divide. 24 divided by 4 equals 6.", html: eq("24 ÷ 4 = <b>6</b>") },
    { t: "Check it", say: "Always check by multiplying: 6 times 4 equals 24. Yes!", html: eq("6 × 4 = 24 ✔") },
  ],
  gen() {
    const a = R(2, 10), b = R(2, 10), p = a * b, left = Math.random() < 0.5;
    return { q: `What number is missing?`, say: left ? `What times ${b} equals ${p}?` : `${a} times what equals ${p}?`, vis: eq(left ? `${blank()} × ${b} = ${p}` : `${a} × ${blank()} = ${p}`), opts: numU(left ? a : b, [(left ? a : b) + 1, (left ? a : b) - 1, p - (left ? b : a), left ? b : a], 2, 1), ans: String(left ? a : b), big: 1, why: `${p} ÷ ${left ? b : a} = ${left ? a : b}, because ${a} × ${b} = ${p}.`, key: a + "x" + b + left };
  },
});
TRICK_ADD(8, "math", "missingfactor", "Skip count by the number you know until you reach the total. The number of jumps is the answer.");

topic(8, "math", {
  id: "estimate", title: "Estimating", icon: "🎯", blurb: "Round first to get a close answer fast.",
  lesson: [
    { t: "Close enough", say: "Estimating means finding an answer that's close, not exact. It's a quick way to check your work.", html: bigEmo("🎯") },
    { t: "Round, then add", say: "To estimate 48 plus 31, round each number to the nearest ten. 50 plus 30 is 80. So the answer is about 80.", html: eq("48 + 31") + eq("50 + 30 = <b>about 80</b>") },
    { t: "Does it make sense?", say: "If you add and get 790 for 48 plus 31, your estimate of 80 tells you something went wrong!", html: note("The real answer 79 is close to the estimate 80 ✔") },
  ],
  gen() {
    const r = x => Math.round(x / 10) * 10, op = Math.random() < 0.6 ? "+" : "−";
    let a = R(12, 89), b = R(11, 69); if (op === "−" && b > a) [a, b] = [b, a];
    while (a % 10 === 5 || b % 10 === 5) { a = R(12, 89); b = R(11, a - 1); }
    const est = op === "+" ? r(a) + r(b) : r(a) - r(b);
    return { q: `Round to the nearest ten to <b>estimate</b>: ${a} ${op} ${b}`, say: `Round to the nearest ten to estimate ${a} ${op === "+" ? "plus" : "minus"} ${b}.`, vis: eq(`${a} ${op} ${b} ≈ ${blank()}`), opts: numU(est, [est + 10, est - 10, op === "+" ? a + b : a - b, est + 20], 10, 0), ans: String(est), big: 1, why: `${a} rounds to ${r(a)} and ${b} rounds to ${r(b)}. ${r(a)} ${op} ${r(b)} = ${est}.`, key: a + op + b };
  },
});
TRICK_ADD(8, "math", "estimate", "Round each number first (ones digit 5 or more rounds up), then add or subtract the round numbers.");

topic(9, "math", {
  id: "mixednum", title: "Mixed Numbers", icon: "🥧", blurb: "Wholes and parts, like 1 ½.",
  lesson: [
    { t: "Wholes plus a part", say: "A mixed number has a whole number and a fraction. One and a half means one whole pie and half of another.", html: row(pie(2, 2, 90, "#FF7A59"), pie(2, 1, 90, "#FF7A59")) + eq(`1 ${frac(1, 2)}`) },
    { t: "Improper fractions", say: "Three halves is the same as one and a half. When the top is bigger than the bottom, the fraction is more than one whole.", html: eq(`${frac(3, 2)} = 1 ${frac(1, 2)}`) },
    { t: "Changing them", say: "To change 7 fourths: 4 fourths make 1 whole. 7 take away 4 leaves 3. So 7 fourths is 1 and 3 fourths.", html: eq(`${frac(7, 4)} → 7 ÷ 4 = 1 R 3 → 1 ${frac(3, 4)}`) },
  ],
  gen() {
    const d = pick([2, 3, 4, 5, 6, 8]), w = R(1, 3), n = R(1, d - 1), top = w * d + n, mixed = `${w} ${frac(n, d)}`, imp = frac(top, d);
    if (Math.random() < 0.5) return { q: `Write ${imp} as a mixed number.`, say: `Write ${top} over ${d} as a mixed number.`, vis: row(...Array.from({ length: w }, () => pie(d, d, 70, "#9B5DE5")), pie(d, n, 70, "#9B5DE5")), opts: uniq(mixed, [`${w + 1} ${frac(n, d)}`, `${w} ${frac(d - n === n ? n + 1 : d - n, d)}`, `${n} ${frac(w, d)}`]), ans: mixed, sayAns: `${w} and ${n} over ${d}`, big: 1, why: `${top} ÷ ${d} = ${w} remainder ${n}, so it's ${w} and ${n} over ${d}.`, key: "a" + top + d };
    return { q: `Write ${mixed} as an improper fraction.`, say: `Write ${w} and ${n} over ${d} as an improper fraction.`, vis: row(...Array.from({ length: w }, () => pie(d, d, 70, "#3D7BFF")), pie(d, n, 70, "#3D7BFF")), opts: uniq(imp, [frac(w + n, d), frac(w * n + d, d), frac(top + 1, d)]), ans: imp, sayAns: `${top} over ${d}`, big: 1, why: `${w} × ${d} = ${w * d}, plus ${n} is ${top}. So it's ${top} over ${d}.`, key: "b" + w + n + d };
  },
});
TRICK_ADD(9, "math", "mixednum", "Mixed to improper: multiply the whole by the bottom, then add the top. Improper to mixed: divide the top by the bottom.");

function cuboid(l, w, h) {
  const u = Math.min(22, 150 / Math.max(l + w * 0.5, h + w * 0.5)), dx = u * 0.5, dy = u * 0.4, W = l * u + w * dx + 40, H = h * u + w * dy + 30, ox = 20, oy = 10 + w * dy;
  let s = svgOpen(W, H, `box ${l} by ${w} by ${h} cubes`);
  for (let z = 0; z < h; z++) for (let x = 0; x < l; x++) s += `<rect x="${f1(ox + x * u)}" y="${f1(oy + (h - 1 - z) * u)}" width="${f1(u)}" height="${f1(u)}" fill="#7FA2FF" stroke="${INK}" stroke-width="1.2"/>`;
  for (let y = 0; y < w; y++) for (let x = 0; x < l; x++) { const px = ox + x * u + (y + 1) * dx, py = oy - (y + 1) * dy; s += `<polygon points="${f1(px - dx)},${f1(py + dy)} ${f1(px - dx + u)},${f1(py + dy)} ${f1(px + u)},${f1(py)} ${f1(px)},${f1(py)}" fill="#B9CCFF" stroke="${INK}" stroke-width="1.2"/>`; }
  for (let z = 0; z < h; z++) for (let y = 0; y < w; y++) { const px = ox + l * u + y * dx, py = oy + (h - 1 - z) * u - y * dy; s += `<polygon points="${f1(px)},${f1(py)} ${f1(px + dx)},${f1(py - dy)} ${f1(px + dx)},${f1(py - dy + u)} ${f1(px)},${f1(py + u)}" fill="#4F7FE8" stroke="${INK}" stroke-width="1.2"/>`; }
  return s + "</svg>";
}
topic(9, "math", {
  id: "volume", title: "Volume", icon: "📦", blurb: "How many cubes fill a box?",
  lesson: [
    { t: "Filling space", say: "Volume is how much space something takes up. We measure it by counting cubes that fill it.", html: cuboid(3, 2, 2) + note("This box is made of <b>12 cubes</b>") },
    { t: "Layers", say: "Count one layer, then multiply by the number of layers. One layer is 3 by 2, which is 6. There are 2 layers, so 6 times 2 is 12.", html: eq("3 × 2 = 6 per layer") + eq("6 × 2 layers = <b>12</b>") },
    { t: "Length × width × height", say: "The quick way: volume equals length times width times height.", html: eq("V = l × w × h") },
  ],
  gen() {
    const l = R(2, 5), w = R(1, 4), h = R(1, 4), v = l * w * h;
    if (Math.random() < 0.6) return { q: "How many cubes make this box? (volume)", vis: cuboid(l, w, h) + note(`${l} long, ${w} wide, ${h} tall`), opts: numU(v, [l + w + h, l * w, v + l, v - w], 3, 1), ans: String(v), big: 1, why: `${l} × ${w} × ${h} = ${v} cubes.`, key: "a" + l + w + h };
    const L = R(2, 9), W2 = R(2, 6), H2 = R(2, 5), V = L * W2 * H2;
    return { q: `A box is ${L} cm long, ${W2} cm wide and ${H2} cm tall. What is its volume?`, vis: `<span class="emo xxl">📦</span>`, opts: numU(V, [L + W2 + H2, L * W2, V + H2, 2 * (L * W2 + W2 * H2 + L * H2)], 4, 1).map(x => x + " cubic cm"), ans: V + " cubic cm", why: `${L} × ${W2} × ${H2} = ${V} cubic centimeters.`, key: "b" + L + W2 + H2 };
  },
});
TRICK_ADD(9, "math", "volume", "Find how many cubes are in one layer (length × width), then multiply by how many layers tall it is.");

/* ====================== LOGIC ====================== */
topic(6, "logic", {
  id: "spotdiff", title: "Spot the Difference", icon: "🔍", blurb: "Find what changed between two rows.",
  lesson: [
    { t: "Look carefully", say: "Two rows look almost the same, but one thing is different. Look at each spot, one at a time.", html: `<div class="diff-rows">${lineRow(["🍎", "🍌", "🍇", "🍓"])}${lineRow(["🍎", "🍌", "🍒", "🍓"])}</div>` + note("Spot 3 changed: 🍇 → 🍒") },
    { t: "Go left to right", say: "Start at the left. Check the first picture in both rows. Then the second. Keep going until you find the change.", html: note("1 ✔ 2 ✔ 3 ✘ found it!") },
    { t: "Colors count too", say: "Sometimes it's the same shape in a different color. Look closely!", html: row(shp("circle", "#3D7BFF", 50), shp("circle", "#3D7BFF", 50), shp("square", "#FF7A59", 50)) + row(shp("circle", "#3D7BFF", 50), shp("circle", "#1FAF6E", 50), shp("square", "#FF7A59", 50)) },
  ],
  gen() {
    const n = 4, pool = shuffle(LR_POOL.concat(["🍎", "🍌", "🍇", "⚽", "🚗", "⭐", "🌼"])), top = pool.slice(0, n), i = R(0, n - 1), swap = pool[n], bottom = top.slice(); bottom[i] = swap;
    return { q: "Which spot is <b>different</b> in the bottom row?", say: "Look at both rows. Which spot is different in the bottom row?", vis: `<div class="diff-rows">${lineRow(top)}${lineRow(bottom)}</div>`, opts: range(1, n).map(x => "Spot " + x), ans: "Spot " + (i + 1), big: 1, why: `In spot ${i + 1}, the picture changed.`, key: top.join() + i + swap };
  },
});
TRICK_ADD(6, "logic", "spotdiff", "Put one finger on the top row and one on the bottom row. Move both fingers together, spot by spot.");

topic(6, "logic", {
  id: "tworules", title: "Two Rules at Once", icon: "🎯", blurb: "Find the one that is big AND blue.",
  lesson: [
    { t: "One rule", say: "Find the blue one. That's one rule: color.", html: row(shp("circle", "#3D7BFF", 60), shp("circle", "#FF7A59", 60), shp("square", "#1FAF6E", 60)) },
    { t: "Two rules", say: "Now find the one that is a square AND blue. It has to follow both rules!", html: row(shp("square", "#FF7A59", 60), shp("circle", "#3D7BFF", 60), shp("square", "#3D7BFF", 60)) + note("square ✔ + blue ✔ = <b>match</b>") },
    { t: "Check both", say: "Check the first rule. Cross out what doesn't fit. Then check the second rule.", html: note("Rule 1 ✔ → Rule 2 ✔ → found it!") },
  ],
  gen() {
    const cols = shuffle(Object.keys(COLNAME)), [c1, c2] = cols, [s1, s2] = shuffle(LSHAPES), big = Math.random() < 0.5;
    const useSize = Math.random() < 0.5, sz = b => b ? 80 : 44;
    if (useSize) { const ans = [s1, c1, big], opts = [ans, [s1, c1, !big], [s1, c2, big], [s2, c1, big]]; const o = ([s, c, b]) => shp(s, c, sz(b)).replace('aria-label="', `aria-label="${b ? "big" : "small"} `); return { q: `Find the one that is <b>${big ? "big" : "small"}</b> AND <b>${COLNAME[c1]}</b> AND a <b>${s1}</b>.`, say: `Find the one that is ${big ? "big" : "small"}, ${COLNAME[c1]}, and a ${s1}.`, opts: shuffle(opts).map(o), ans: o(ans), sayAns: `the ${big ? "big" : "small"} ${COLNAME[c1]} ${s1}`, why: "Only one shape follows all the rules.", key: "z" + s1 + c1 + big }; }
    const ans = [s1, c1], opts = [ans, [s1, c2], [s2, c1], [s2, c2]];
    return { q: `Find the one that is a <b>${s1}</b> AND <b>${COLNAME[c1]}</b>.`, say: `Find the one that is a ${s1} and ${COLNAME[c1]}.`, opts: shuffle(opts).map(([s, c]) => shp(s, c, 64)), ans: shp(s1, c1, 64), sayAns: `the ${COLNAME[c1]} ${s1}`, why: `It's a ${s1} and it's ${COLNAME[c1]}: both rules!`, key: "t" + s1 + c1 + s2 + c2 };
  },
});
TRICK_ADD(6, "logic", "tworules", "Use one rule to cross some out, then use the next rule on what's left.");

const NUMRIDDLE = [n => [`I am 2 more than ${n - 2}.`, n], n => [`I am 3 less than ${n + 3}.`, n], n => [`I am the number between ${n - 1} and ${n + 1}.`, n], n => [`I am double ${n / 2}.`, n], n => [`I am 10 more than ${n - 10}.`, n], n => [`If you add 5 to me, you get ${n + 5}.`, n], n => [`I come right before ${n + 1}.`, n], n => [`I am ${n % 2 ? "odd" : "even"} and between ${n - 2} and ${n + 1}, but not ${n - 1}.`, n]];
topic(7, "logic", {
  id: "numriddles", title: "Number Riddles", icon: "🤔", blurb: "Who am I? Solve the number clue.",
  lesson: [
    { t: "Number riddles", say: "A number riddle gives a clue about a secret number. I am 2 more than 5. Who am I? 7!", html: passage("I am 2 more than 5. Who am I?") + eq("5 + 2 = <b>7</b>") },
    { t: "Clue words", say: "More means add. Less means subtract. Double means add it to itself. Between means in the middle.", html: table([["more", "+"], ["less", "−"], ["double", "× 2"], ["between", "in the middle"]], ["Clue", "Do this"]) },
    { t: "Check your answer", say: "Put your number back into the riddle. Is 7 really 2 more than 5? Yes!", html: note("Always check ✔") },
  ],
  gen() {
    let f, n, t;
    for (let i = 0; i < 20; i++) { f = R(0, NUMRIDDLE.length - 1); n = R(12, 40); if (f === 3 && n % 2) continue; if (f === 4 && n < 11) continue; [t] = NUMRIDDLE[f](n); break; }
    return { q: `<div class="sentence">${t}</div>Who am I?`, say: `${t} Who am I?`, opts: numU(n, [n + 1, n - 1, n + 2, n - 2], 3, 0), ans: String(n), big: 1, why: `${n} fits the clue. Check it: ${t.replace("I am", `${n} is`).replace("If you add 5 to me", `If you add 5 to ${n}`).replace("I come", `${n} comes`)}`, key: f + "-" + n };
  },
});
TRICK_ADD(7, "logic", "numriddles", "Turn the riddle into a math problem: “2 more than 5” means 5 + 2.");

const GRIDPICS = ["🍎", "⭐", "🐶", "🚗", "🌼", "🎈", "🐟", "⚽", "🍦", "🏠", "🐱", "🌙"];
function coordGrid(cells) { const cols = "ABCD"; let h = '<div class="cgrid"><span></span>' + cols.split("").map(c => `<b>${c}</b>`).join(""); for (let r = 1; r <= 4; r++) { h += `<b>${r}</b>`; for (let c = 0; c < 4; c++) h += `<span>${cells[cols[c] + r] ? `<span class="emo">${cells[cols[c] + r]}</span>` : ""}</span>`; } return h + "</div>"; }
topic(7, "logic", {
  id: "coords", title: "Grid Spots", icon: "🗺️", blurb: "Find things like B3 on a grid.",
  lesson: [
    { t: "Letters and numbers", say: "A grid has letters across the top and numbers down the side. Every square has a name, like B3.", html: coordGrid({ B3: "⭐" }) + note("⭐ is at <b>B3</b>") },
    { t: "Letter first", say: "To find B3, go across to B first, then down to 3. Letter first, then number!", html: note("Across to <b>B</b> → down to <b>3</b>") },
    { t: "Name the spot", say: "To name a spot, look up to find its letter, then look left to find its number.", html: coordGrid({ D2: "🐶" }) + note("🐶 is at <b>D2</b>") },
  ],
  gen() {
    const cols = "ABCD", spots = shuffle(cols.split("").flatMap(c => [1, 2, 3, 4].map(r => c + r))).slice(0, 4), pics = shuffle(GRIDPICS).slice(0, 4), cells = {};
    spots.forEach((s, i) => cells[s] = pics[i]);
    const i = R(0, 3), o = e => `<span class="emo">${e}</span>`;
    if (Math.random() < 0.5) return { q: `What is at <b>${spots[i]}</b>?`, say: `What is at ${spots[i].split("").join(" ")}?`, vis: coordGrid(cells), opts: shuffle(pics).map(o), ans: o(pics[i]), sayAns: `the picture at ${spots[i]}`, why: `Go across to ${spots[i][0]}, then down to ${spots[i][1]}.`, key: "a" + spots.join() + i };
    const near = [spots[i][1] + spots[i][0], cols[(cols.indexOf(spots[i][0]) + 1) % 4] + spots[i][1], spots[i][0] + ((+spots[i][1]) % 4 + 1)];
    return { q: `Where is <span class="emo">${pics[i]}</span>?`, say: "Where is this picture on the grid?", vis: coordGrid(cells), opts: uniq(spots[i], near.filter(x => /^[A-D][1-4]$/.test(x)), () => pick(cols.split("")) + R(1, 4)), ans: spots[i], big: 1, why: `It's in column ${spots[i][0]}, row ${spots[i][1]}.`, key: "b" + spots.join() + i };
  },
});
TRICK_ADD(7, "logic", "coords", "Letter first, then number. Slide your finger along the top to the letter, then down to the number.");

function vennCount(A, B, a, both, b) { return venn(A, B).replace("</svg>", `<text x="85" y="118" text-anchor="middle" font-size="30" font-weight="700" font-family="${FONT}" fill="${INK}">${a}</text><text x="170" y="118" text-anchor="middle" font-size="30" font-weight="700" font-family="${FONT}" fill="${INK}">${both}</text><text x="255" y="118" text-anchor="middle" font-size="30" font-weight="700" font-family="${FONT}" fill="${INK}">${b}</text></svg>`); }
/* "Plays soccer" → "play soccer" (for "How many kids play soccer?") */
const kidsDo = lab => { const l = String(lab).toLowerCase(); return l.replace(/^has\b/, "have").replace(/^is\b/, "are").replace(/^(\w+?)(ch|sh|ss|x|o)es\b/, "$1$2").replace(/^(\w+[^s])s\b/, "$1"); };
const VPAIRS = [["Likes cats", "Likes dogs"], ["Plays soccer", "Plays piano"], ["Has a sister", "Has a brother"], ["Likes pizza", "Likes tacos"], ["Can swim", "Can ride a bike"]];
topic(8, "logic", {
  id: "venncount", title: "Venn Counting", icon: "🔢", blurb: "Count what's in one circle, both, or in total.",
  lesson: [
    { t: "Numbers in a Venn", say: "This Venn diagram shows a class. 5 kids like only cats. 4 kids like only dogs. 3 kids like both!", html: vennCount("Likes cats", "Likes dogs", 5, 3, 4) },
    { t: "Total in a circle", say: "How many like cats in all? Add the cats-only part and the middle. 5 plus 3 is 8.", html: eq("5 + 3 = <b>8</b> like cats") },
    { t: "Total of everyone", say: "How many kids in all? Add all three parts: 5 plus 3 plus 4 is 12.", html: eq("5 + 3 + 4 = <b>12</b>") },
  ],
  gen() {
    const [A, B] = pick(VPAIRS), a = R(1, 9), both = R(1, 6), b = R(1, 9), k = R(0, 3), vis = vennCount(A, B, a, both, b);
    const Q4 = [[`How many kids <b>${kidsDo(A)}</b> in all?`, a + both, `${a} + ${both} = ${a + both}.`], [`How many kids <b>${kidsDo(B)}</b> in all?`, b + both, `${b} + ${both} = ${b + both}.`], ["How many kids are in the diagram altogether?", a + b + both, `${a} + ${both} + ${b} = ${a + both + b}.`], [`How many kids do <b>both</b>?`, both, "The middle part is both."]][k];
    return { q: Q4[0], vis, opts: numU(Q4[1], [a, b, both, a + b, Q4[1] + 1].filter(x => x !== Q4[1]), 3, 0), ans: String(Q4[1]), big: 1, why: Q4[2], key: A + a + both + b + k };
  },
});
TRICK_ADD(8, "logic", "venncount", "The middle counts for both circles. For one whole circle, add its outside part and the middle.");

topic(8, "logic", {
  id: "whichop", title: "Missing Operation", icon: "➕", blurb: "Is it +, −, × or ÷?",
  lesson: [
    { t: "Which sign?", say: "Sometimes the sign is missing! 3, blank, 4 equals 12. Which sign works? 3 times 4 is 12. It's times!", html: eq(`3 ${blank("?")} 4 = 12`) + eq("3 × 4 = 12 ✔") },
    { t: "Try each one", say: "Try plus, minus, times, and divided by. Only one gives the right answer.", html: table([["3 + 4", "7 ✘"], ["3 − 4", "can't ✘"], ["3 × 4", "12 ✔"]], ["Try", "Result"]) },
    { t: "Look at the size", say: "If the answer is much bigger, try times. If it's smaller, try minus or divided by.", html: note("Bigger → + or × · Smaller → − or ÷") },
  ],
  gen() {
    const ops = ["+", "−", "×", "÷"], op = pick(ops); let a, b, c;
    if (op === "+") { a = R(2, 20); b = R(2, 20); c = a + b; } else if (op === "−") { a = R(10, 30); b = R(2, a - 1); c = a - b; } else if (op === "×") { a = R(2, 9); b = R(3, 9); c = a * b; } else { b = R(2, 9); c = R(2, 9); a = b * c; }
    const f = { "+": a + b, "−": a - b, "×": a * b, "÷": a / b };
    if (ops.filter(o => f[o] === c).length > 1) return this.gen();
    return { q: "Which sign makes this true?", say: `${a}, blank, ${b}, equals ${c}. Which sign makes this true?`, vis: eq(`${a} ${blank("?")} ${b} = ${c}`), opts: ops.slice(), ans: op, big: 1, why: `${a} ${op} ${b} = ${c}.`, key: a + op + b };
  },
});
TRICK_ADD(8, "logic", "whichop", "Is the answer bigger or smaller than the first number? That cuts your choices in half. Then test the two that are left.");

const OUTFIT = [["shirts", "👕"], ["pants", "👖"], ["hats", "🧢"], ["ice cream flavors", "🍦"], ["cones", "🍦"], ["sandwiches", "🥪"], ["drinks", "🧃"], ["toppings", "🍓"]];
topic(9, "logic", {
  id: "combos", title: "Combinations", icon: "👕", blurb: "How many different outfits can you make?",
  lesson: [
    { t: "Make every pair", say: "You have 3 shirts and 2 pants. How many outfits? Each shirt can go with each pair of pants.", html: table([["👕 red", "👖 blue", "👖 black"], ["👕 green", "👖 blue", "👖 black"], ["👕 yellow", "👖 blue", "👖 black"]], ["Shirt", "Outfit 1", "Outfit 2"]) },
    { t: "Multiply!", say: "3 shirts times 2 pants is 6 outfits. Multiply the choices together!", html: eq("3 × 2 = <b>6</b> outfits") },
    { t: "Three choices", say: "Add 2 hats and you get 3 times 2 times 2, which is 12 outfits!", html: eq("3 × 2 × 2 = <b>12</b>") },
  ],
  gen() {
    if (Math.random() < 0.65) { const a = R(2, 5), b = R(2, 5), ans = a * b; return { q: `You have <b>${a} shirts</b> 👕 and <b>${b} pants</b> 👖. How many different outfits can you make?`, opts: numU(ans, [a + b, ans + 1, ans - 1, a * b + a], 2, 1), ans: String(ans), big: 1, why: `Each of the ${a} shirts goes with each of the ${b} pants: ${a} × ${b} = ${ans}.`, key: "o" + a + b }; }
    const a = R(2, 4), b = R(2, 4), c = R(2, 3), ans = a * b * c;
    return { q: `A sandwich shop has <b>${a} breads</b>, <b>${b} fillings</b>, and <b>${c} sauces</b>. How many different sandwiches can you make with one of each?`, opts: numU(ans, [a + b + c, a * b, ans + a, a * b + c], 3, 1), ans: String(ans), big: 1, why: `${a} × ${b} × ${c} = ${ans}.`, key: "s" + a + b + c };
  },
});
TRICK_ADD(9, "logic", "combos", "For “one of each” choices, multiply how many choices there are in each group.");

const SYMS = [["🍎", "🍌", "🍇"], ["⭐", "🌙", "☀️"], ["🐶", "🐱", "🐭"], ["🔺", "🟦", "🟢"], ["🚗", "🚌", "🚲"]];
topic(9, "logic", {
  id: "symbols", title: "Picture Equations", icon: "🍎", blurb: "Each picture stands for a number.",
  lesson: [
    { t: "Pictures are numbers", say: "In these puzzles, each picture stands for a number. If apple plus apple equals 10, then one apple is 5!", html: eq("🍎 + 🍎 = 10") + eq("🍎 = <b>5</b>") },
    { t: "Use what you know", say: "Now apple plus banana equals 8. The apple is 5, so the banana is 8 minus 5, which is 3.", html: eq("🍎 + 🍌 = 8") + eq("5 + 🍌 = 8 → 🍌 = <b>3</b>") },
    { t: "Solve one at a time", say: "Find the easiest line first, the one with only one kind of picture. Then use it to solve the next line.", html: note("Easy line first → then the next") },
  ],
  gen() {
    const [A, B, Cc] = pick(SYMS), a = R(2, 9), b = R(1, 9), c = R(1, 9), k = R(0, 1);
    if (k === 0) return { q: "What number is <span class=\"emo\">" + B + "</span>?", say: `Two of the first picture make ${2 * a}. The first picture plus the second picture make ${a + b}. What number is the second picture?`, vis: eq(`${A} + ${A} = ${2 * a}`) + eq(`${A} + ${B} = ${a + b}`), opts: numU(b, [a, a + b, b + 1, 2 * a - b > 0 ? 2 * a - b : b + 2], 2, 0), ans: String(b), big: 1, why: `${A} = ${2 * a} ÷ 2 = ${a}, so ${B} = ${a + b} − ${a} = ${b}.`, key: "a" + A + a + b };
    return { q: "What number is <span class=\"emo\">" + Cc + "</span>?", say: `Three of the first picture make ${3 * a}. The first plus the second make ${a + b}. The second plus the third make ${b + c}. What is the third picture?`, vis: eq(`${A} + ${A} + ${A} = ${3 * a}`) + eq(`${A} + ${B} = ${a + b}`) + eq(`${B} + ${Cc} = ${b + c}`), opts: numU(c, [b, a, c + 1, b + c], 2, 0), ans: String(c), big: 1, why: `${A} = ${a}, ${B} = ${b}, so ${Cc} = ${b + c} − ${b} = ${c}.`, extra: 15, key: "b" + A + a + b + c };
  },
});
TRICK_ADD(9, "logic", "symbols", "Start with the line that has only one kind of picture. Once you know it, swap its number into the next line.");

/* more variety for the newest banks */
INGW.push(["sleep", "sleeping"], ["help", "helping"], ["dig", "digging"], ["shop", "shopping"], ["smile", "smiling"], ["skate", "skating"], ["throw", "throwing"], ["bat", "batting"]);
SILENT.push(["know", "k", "🧠"], ["wrong", "w", "❌"], ["listen", "t", "👂"], ["half", "l", "🌗"], ["wreath", "w", "💐"], ["knight", "k", "🛡️"]);
LINKS.push(["I wanted a cookie, ___ there were none left.", "but", "But shows a surprise."], ["The puppy was tired, ___ it took a nap.", "so", "So shows the result."], ["Take your coat ___ it might snow.", "because", "Because gives the reason."], ["We can play tag ___ hide-and-seek.", "or", "Or gives a choice."], ["Wash your hands ___ you eat.", "before", "Before shows which comes first."], ["Call me ___ you get home.", "when", "When tells the time."], ["She likes painting ___ drawing.", "and", "And joins two things."], ["The test was hard, ___ I did my best.", "but", "But shows a contrast."]);
STORIES.push({ p: "During a thunderstorm at the farm, Farmer Lucy noticed the barn door was open. The goats were getting wet and scared! She ran outside, led them back in, and shut the door tight.", chars: "Farmer Lucy", setting: "a farm during a thunderstorm", problem: "The barn door was open and the goats were getting wet.", wrongC: ["the goats", "a cow", "the mail carrier"], wrongS: ["a city apartment", "outer space", "a sunny beach"], wrongP: ["She lost her hat.", "The tractor was broken.", "The chickens were hungry."] },
  { p: "On the first day of camp, Jamal felt shy because he didn't know anyone. At the campfire, a girl named Rosa asked him to help roast marshmallows. By the end of the night, they were laughing together.", chars: "Jamal", setting: "summer camp at night", problem: "He felt shy and didn't know anyone.", wrongC: ["the camp counselor", "a bear", "his mom"], wrongS: ["his school", "a castle", "a restaurant"], wrongP: ["The fire went out.", "It started to snow.", "He lost his shoes."] },
  { p: "In the rocket ship high above Earth, Captain Zara saw a warning light flash. The ship was low on fuel! She found a space station nearby, docked carefully, and filled up the tank.", chars: "Captain Zara", setting: "a rocket ship in space", problem: "The ship was low on fuel.", wrongC: ["an alien", "a robot dog", "the space station"], wrongS: ["a submarine", "a forest", "a library"], wrongP: ["She was hungry.", "Her helmet was too big.", "She missed her friends."] });

