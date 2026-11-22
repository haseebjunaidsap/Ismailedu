/* =====================================================================
   Manners & Safety (v10)
   Each topic mixes two question kinds:
   S = scenarios  [situation, best choice, [3 other choices], why, emoji]
   J = judge it   [statement, index into labels, why]
   Safety advice follows common US guidance (call 911 in an emergency).
   ===================================================================== */
for (const a of [6, 7, 8, 9]) C[a].manners = [];
const MANNER_TRICKS = { 6: {}, 7: {}, 8: {}, 9: {} };
const LBL = {
  kind: ["Kind 💛", "Unkind 💔"], safe: ["Safe ✅", "Unsafe ⛔"], polite: ["Polite 😊", "Rude 😠"],
  good: ["Good choice 👍", "Not a good choice 👎"], tell: ["Tell a grown-up 🗣️", "Okay to keep 🤐"], call: ["Call 911 🚨", "Don't call 911 ❌"],
  share: ["Okay to share 👍", "Keep it private 🔒"], fact: ["True ✔", "False ✘"],
};
const LBLQ = {
  kind: ["Which one is <b>kind</b>?", "Which one is <b>unkind</b>?"], safe: ["Which one is <b>safe</b>?", "Which one is <b>unsafe</b>?"],
  polite: ["Which one is <b>polite</b>?", "Which one is <b>rude</b>?"], good: ["Which one is a <b>good choice</b>?", "Which one is <b>not</b> a good choice?"],
  tell: ["Which one should you <b>tell a grown-up</b> about?", "Which one is a happy surprise that's <b>okay to keep</b>?"],
  call: ["Which one is a reason to <b>call 911</b>?", "Which one is <b>not</b> a reason to call 911?"],
  share: ["Which one is <b>okay to share</b> online?", "Which one should you <b>keep private</b>?"],
};
const LBLWHY = {
  kind: ["That's a kind thing to do.", "That's unkind. It could hurt someone's feelings."], safe: ["That's the safe choice.", "That's unsafe. It could hurt you or someone else."],
  polite: ["That's polite.", "That's rude, so it's better not to do it."], good: ["That's a good choice.", "That's not a good choice."],
  tell: ["That's something to tell a trusted grown-up about.", "That's a happy surprise, so it's okay to keep."],
  call: ["That's a real emergency, so call 911.", "That's not an emergency, so don't call 911."],
  share: ["That's fine to share.", "That's private information. Keep it private."],
};
function mannersTopic(age, o) {
  MANNER_TRICKS[age][o.id] = o.trick;
  const lk = o.labels || "good", labels = LBL[lk], S = o.S || [], J = o.J || [];
  const jq = o.jq || (lk === "good" ? "Is this a good choice?" : `Is this ${labels.map(l => clean(l).toLowerCase()).join(" or ")}?`);
  topic(age, "manners", {
    id: o.id, title: o.title, icon: o.icon, blurb: o.blurb, lesson: o.lesson,
    _J: J, _S: S, _labels: labels, _lk: lk,
    gen() {
      const r = Math.random();
      if (r < 0.25) {
        const want = Math.random() < 0.6 ? 0 : 1, yes = J.filter(j => j[1] === want), no = J.filter(j => j[1] !== want);
        if (yes.length >= 1 && no.length >= 3) {
          const pickd = pick(yes), others = shuffle(no).slice(0, 3);
          return { q: LBLQ[lk][want], vis: "", opts: shuffle([pickd, ...others].map(j => j[0])), ans: pickd[0], why: pickd[2] || LBLWHY[lk][want], key: "w" + want + pickd[0] };
        }
      }
      if (r < 0.62 && J.length) {
        const [st, li, why] = pick(J);
        return { q: jq, say: `${clean(jq)} ${st}`, vis: `<div class="quote scene-q">${st}</div>`, opts: labels.slice(), ans: labels[li], big: 1, why: why || LBLWHY[lk][li], key: "j" + st };
      }
      const [sit, right, wrong, why, e, nots] = pick(S), whyNot = {};
      if (nots) wrong.forEach((w, i) => { if (nots[i]) whyNot[w] = nots[i]; });
      return { q: o.sq || "What is the <b>best</b> thing to do?", say: `${sit} ${clean(o.sq || "What is the best thing to do?")}`, vis: `${e ? `<span class="emo xxl">${e}</span>` : ""}<div class="passage scene">${sit}</div>`, opts: shuffle([right, ...wrong]), ans: right, why, whyNot, key: "s" + sit };
    },
  });
}
const L3 = (t, say, html) => ({ t, say, html });
const pics = (...items) => `<div class="card-grid">${items.map(([e, w, s]) => picCard(e, `<b>${w}</b>${s ? `<small>${s}</small>` : ""}`, s ? `${w}. ${s}` : w)).join("")}</div>`;
const doDont = (dos, donts) => `<div class="dodont"><div class="do"><b>✅ Do</b>${dos.map(x => `<span>${x}</span>`).join("")}</div><div class="dont"><b>⛔ Don't</b>${donts.map(x => `<span>${x}</span>`).join("")}</div></div>`;

/* ============================== AGE 6 ============================== */
mannersTopic(6, {
  id: "magicwords", title: "Magic Words", icon: "🪄", blurb: "Please, thank you, sorry and excuse me.", labels: "polite",
  trick: "Ask yourself: am I asking, getting, bumping, or making a mistake? Then pick please, thank you, excuse me, or sorry.",
  lesson: [
    L3("Words that make people smile", "Magic words make people feel good. Please, thank you, sorry, and excuse me. Tap each one!", pics(["🙏", "Please", "when you ask"], ["💝", "Thank you", "when you get something"], ["😔", "Sorry", "when you make a mistake"], ["🙋", "Excuse me", "to get past or get attention"])),
    L3("Please and thank you", "When you want something, say please. When someone helps you or gives you something, say thank you.", `<div class="sentence big-sentence">“Can I have some milk, <b class="hl">please</b>?” 🥛</div><div class="sentence big-sentence">“<b class="hl">Thank you</b>, Mom!” 💛</div>`),
    L3("Sorry and excuse me", "If you bump someone, say excuse me or sorry. If you hurt someone's feelings, say sorry and mean it.", `<div class="sentence big-sentence">“<b class="hl">Excuse me</b>, can I get by?” 🚶</div><div class="sentence big-sentence">“<b class="hl">I'm sorry</b> I knocked over your tower.” 🧱</div>`),
  ],
  S: [
    ["You want a cookie from the jar.", "Can I have a cookie, please?", ["Give me a cookie!", "Grab one without asking.", "Cookie! Now!"], "We say please when we ask for something.", "🍪"],
    ["Grandma gives you a birthday present.", "Say “Thank you, Grandma!”", ["Rip it open and walk away.", "Say “Is that all?”", "Say nothing."], "We say thank you when someone gives us something.", "🎁"],
    ["You bump into someone in the hallway.", "Say “Excuse me” or “Sorry.”", ["Keep running.", "Say “Move!”", "Laugh at them."], "Excuse me or sorry shows you care.", "🚶"],
    ["You need to walk past two grown-ups who are talking.", "Say “Excuse me” and walk by.", ["Push between them.", "Shout “Move!”", "Pull their sleeves."], "Excuse me is a polite way to get past.", "🧍"],
    ["You knock over your friend's block tower by accident.", "Say “I'm sorry” and help rebuild it.", ["Say “It was ugly anyway.”", "Run away.", "Blame someone else."], "Saying sorry and helping fix it is kind.", "🧱"],
    ["Your teacher hands you a new pencil.", "Say “Thank you.”", ["Say “I wanted blue.”", "Grab it.", "Say nothing."], "Thank you shows you are grateful.", "✏️"],
    ["You want a turn on the swing.", "Ask, “Can I have a turn, please?”", ["Pull your friend off.", "Yell “My turn!”", "Cry until they get off."], "Asking nicely with please is the polite way.", "🛝"],
    ["You burp at the dinner table.", "Say “Excuse me.”", ["Laugh and burp again.", "Say nothing and giggle.", "Blame the dog."], "We say excuse me after a burp.", "🍽️"],
    ["A friend holds the door open for you.", "Say “Thank you!”", ["Walk past without a word.", "Close the door on them.", "Say “Finally.”"], "Thank you for kind help.", "🚪"],
    ["You want to pass the salt but it's far away.", "Say “Could you please pass the salt?”", ["Reach across everyone's plate.", "Shout “Salt!”", "Stand on your chair."], "Ask nicely instead of reaching across.", "🧂"],
    ["You stepped on someone's foot in line.", "Say “I'm sorry! Are you okay?”", ["Say “Watch your feet!”", "Pretend you didn't.", "Step on it again."], "Saying sorry shows you care about others.", "🦶"],
  ],
  J: [["“May I please have a turn?”", 0], ["“Give it to me now!”", 1], ["“Thank you for sharing!”", 0], ["“Move, I'm walking here!”", 1], ["“Excuse me, may I get by?”", 0], ["“I'm sorry I bumped you.”", 0], ["Grabbing a toy without asking.", 1], ["Saying “Yuck!” to food someone made you.", 1, "It can hurt the cook's feelings. Try “No, thank you.”"], ["“No, thank you.”", 0], ["Saying nothing when someone gives you a gift.", 1, "We say thank you when we get a gift."], ["“Good morning!”", 0], ["Interrupting by yelling “Hey!” over and over.", 1]],
});

mannersTopic(6, {
  id: "sharing", title: "Sharing & Turns", icon: "🧸", blurb: "Share, take turns, and wait nicely.", labels: "kind",
  trick: "Think: how would I feel if I were the other kid? Sharing and taking turns means everyone gets to play.",
  lesson: [
    L3("Sharing is caring", "When we share, everyone gets to have fun. You can share toys, snacks, and crayons.", row(bigEmo("🧸"), `<span class="sym">+</span>`, `<span class="emo xxl">👧👦</span>`, `<span class="sym">=</span>`, bigEmo("😊"))),
    L3("Taking turns", "Taking turns means I go, then you go. Wait for your turn. Use a timer, or count to 20!", train(["🧒 my turn", "👧 your turn", "🧒 my turn"])),
    L3("Asking nicely", "If someone has something you want, ask: can I have a turn when you're done? Then wait.", `<div class="sentence big-sentence">“Can I have a turn <b class="hl">when you're done</b>?” 🙂</div>`),
  ],
  S: [
    ["Your friend wants to play with your truck.", "Let them have a turn, or play together.", ["Hide the truck.", "Say “It's MINE forever!”", "Break it so nobody can have it."], "Sharing or playing together is kind.", "🚚"],
    ["You have 6 crackers and your friend has none.", "Offer to share some.", ["Eat them all fast.", "Show off your crackers.", "Throw them away."], "Sharing snacks is a kind thing to do.", "🍘"],
    ["Someone is using the red crayon you want.", "Wait or ask, “Can I use it when you're done?”", ["Grab it out of their hand.", "Cry loudly.", "Break their crayon."], "Asking and waiting is the kind way.", "🖍️"],
    ["It's your friend's turn on the slide.", "Wait patiently in line.", ["Push to the front.", "Climb up the slide the wrong way.", "Shout “Hurry up!”"], "Waiting for your turn is fair.", "🛝"],
    ["Two kids want the same book.", "Read it together or take turns.", ["Tug it until it rips.", "Tell the teacher the other kid is mean.", "Sit on the book."], "Sharing or taking turns is fair for both.", "📖"],
    ["A new kid has nobody to play with.", "Invite them to play with you.", ["Ignore them.", "Laugh at them.", "Tell others not to play with them."], "Including others is kind.", "🧒"],
    ["You've had a long turn on the computer game.", "Let the next person have a turn.", ["Keep playing and pretend you didn't hear.", "Say “Five more hours!”", "Turn it off so nobody can play."], "Taking turns means giving others a chance too.", "🎮"],
    ["Your little brother wants to help build your puzzle.", "Give him some pieces to place.", ["Yell “Go away!”", "Hide the puzzle.", "Mess up his part."], "Letting him help is kind.", "🧩"],
    ["There is one swing and three kids.", "Take turns, maybe counting to 20 each.", ["Stay on all recess.", "Push someone off.", "Cry until everyone leaves."], "Counting turns makes it fair.", "🛝"],
    ["Your friend lets you use their markers.", "Say thank you and give them back.", ["Keep them.", "Leave the caps off.", "Lose them on purpose."], "Taking care of shared things is kind.", "🖊️"],
  ],
  J: [["Letting a friend have a turn.", 0], ["Grabbing a toy someone else is using.", 1], ["Saying “You can play with us!”", 0], ["Hiding toys so nobody else can use them.", 1], ["Sharing your snack with a friend.", 0], ["Cutting in line.", 1], ["Waiting patiently for your turn.", 0], ["Telling a kid they can't play with you.", 1], ["Giving back something you borrowed.", 0], ["Taking the biggest piece without asking.", 1], ["Playing a game together.", 0], ["Laughing when someone loses their turn.", 1]],
});

mannersTopic(6, {
  id: "table", title: "Table Manners", icon: "🍽️", blurb: "How to eat nicely at the table.", labels: "polite",
  trick: "At the table: sit nicely, chew with your mouth closed, ask instead of reaching, and say thank you to the cook.",
  lesson: [
    L3("Get ready to eat", "Wash your hands before you eat. Sit on your chair and put your napkin on your lap.", pics(["🧼", "Wash hands"], ["🪑", "Sit down"], ["🧻", "Napkin on lap"])),
    L3("While you eat", "Chew with your mouth closed. Don't talk with food in your mouth. Use your fork and spoon.", doDont(["Chew with mouth closed", "Use a fork and spoon", "Ask for things to be passed"], ["Talk with food in your mouth", "Reach across people", "Play with your food"])),
    L3("When you're done", "Say thank you for the meal. Ask, may I please be excused? Help clear your plate.", `<div class="sentence big-sentence">“<b class="hl">Thank you</b> for dinner! May I please be excused?” 🍽️</div>`),
  ],
  S: [
    ["You want the bread, but it's on the other side of the table.", "Ask, “Please pass the bread.”", ["Climb over to get it.", "Reach across everyone.", "Throw a napkin to get attention."], "Asking someone to pass it is polite.", "🍞"],
    ["Your mouth is full and you want to say something.", "Finish chewing, then talk.", ["Talk with food in your mouth.", "Open your mouth to show the food.", "Spit it out to talk."], "Chewing first keeps things neat and polite.", "😋"],
    ["You don't like the food on your plate.", "Say, “No, thank you,” or try a small bite.", ["Say “Yuck, gross!”", "Throw it on the floor.", "Feed it to the dog."], "No, thank you is a kind way to say it.", "🥦"],
    ["You finish eating before everyone else.", "Ask, “May I please be excused?”", ["Run off without asking.", "Bang your spoon on the plate.", "Start playing under the table."], "Asking to be excused is polite.", "🪑"],
    ["Dinner is ready and your hands are dirty.", "Wash your hands first.", ["Wipe them on your shirt.", "Eat anyway.", "Lick your fingers clean."], "Clean hands keep germs away from your food.", "🧼"],
    ["You spill your juice.", "Say “Oops, sorry!” and help clean it up.", ["Hide the spill with a napkin and walk away.", "Blame your sister.", "Splash in it."], "Owning a spill and helping clean is polite.", "🧃"],
    ["Mom made a special dinner.", "Say “Thank you for making dinner!”", ["Say “Is this all?”", "Eat in silence and leave.", "Say “I wanted pizza.”"], "Thanking the cook is kind.", "🍲"],
    ["You need to sneeze at the table.", "Turn away and sneeze into your elbow.", ["Sneeze on the food.", "Sneeze into your hand and grab the bread.", "Hold your nose and squeal."], "Elbow sneezes keep germs off the food.", "🤧"],
    ["Someone is talking at dinner.", "Listen and wait for your turn to talk.", ["Talk louder than them.", "Sing to drown them out.", "Make silly noises."], "Taking turns talking is polite.", "🗣️"],
    ["You get food on your face.", "Wipe it with your napkin.", ["Wipe it on your sleeve.", "Lick your whole face.", "Wipe it on the tablecloth."], "That's what napkins are for!", "🧻"],
  ],
  J: [["Chewing with your mouth closed.", 0], ["Talking with your mouth full.", 1], ["Using a napkin.", 0], ["Reaching across someone's plate.", 1], ["Saying “No, thank you.”", 0], ["Burping loudly on purpose.", 1], ["Saying “Please pass the peas.”", 0], ["Playing with your phone at dinner.", 1], ["Saying thank you to the cook.", 0], ["Standing on your chair.", 1], ["Waiting until everyone has food before starting.", 0], ["Saying “Ew, this is disgusting!”", 1]],
});

mannersTopic(6, {
  id: "homesafety", title: "Safe or Unsafe?", icon: "🏠", blurb: "Spot what is safe at home.", labels: "safe",
  trick: "If it's hot, sharp, a medicine, a cleaner, or up high, stop and ask a grown-up first.",
  lesson: [
    L3("Some things can hurt", "Some things at home can hurt us. Hot stoves, sharp knives, and medicine are for grown-ups.", pics(["🔥", "Hot stove", "grown-ups only"], ["🔪", "Sharp knife", "grown-ups only"], ["💊", "Medicine", "only from a grown-up"])),
    L3("Stop and ask", "If something might be hot, sharp, or yucky, stop and ask a grown-up before you touch it.", `<div class="stop-ask"><span class="emo xxl">✋</span><b>STOP</b><span>and ask a grown-up</span></div>`),
    L3("Medicine is not candy", "Some medicines look like candy, but they are not. Only take medicine from a trusted grown-up like your parent or doctor.", row(`<span class="emo xl">💊</span>`, `<span class="sym">≠</span>`, `<span class="emo xl">🍬</span>`)),
  ],
  S: [
    ["You find some pills on the table that look like candy.", "Leave them and tell a grown-up.", ["Eat one to see if it's candy.", "Share them with your friends.", "Put them in your pocket."], "Only take medicine from a trusted grown-up.", "💊"],
    ["The stove is on and a pot is bubbling.", "Stay back and let a grown-up handle it.", ["Touch the pot to see if it's hot.", "Climb up to look inside.", "Stir it by yourself."], "Stoves and hot pots can burn you.", "🍳"],
    ["You see a bottle of cleaner under the sink.", "Don't touch it and tell a grown-up.", ["Drink it, it might be juice.", "Spray it around.", "Smell it up close."], "Cleaners are poison and can make you very sick.", "🧴"],
    ["You want a toy from a high shelf.", "Ask a grown-up to get it.", ["Climb the shelves.", "Stack chairs and climb.", "Pull the shelf down."], "Climbing can make you fall and get hurt.", "📚"],
    ["You find a sharp knife on the counter.", "Leave it and tell a grown-up.", ["Play with it.", "Use it to open a box.", "Carry it around."], "Knives are sharp and for grown-ups.", "🔪"],
    ["You see matches or a lighter.", "Don't touch them and tell a grown-up.", ["Try to light one.", "Hide them in your room.", "Show your friends how they work."], "Matches and lighters can start fires.", "🔥"],
    ["Your toy is stuck in the toaster.", "Ask a grown-up to unplug it and help.", ["Poke it with a fork.", "Turn the toaster on.", "Shake the toaster."], "Never put metal in a toaster. It can shock you.", "🍞"],
    ["There are wet, slippery floors.", "Walk slowly or wait until it's dry.", ["Run and slide on it.", "Jump in the water.", "Push your brother on it."], "Wet floors can make you slip and fall.", "💧"],
    ["You see an electrical outlet.", "Don't put anything in it.", ["Stick a key in it.", "Poke it with a hairpin.", "Lick it."], "Outlets have electricity that can hurt you.", "🔌"],
    ["You feel sick and want medicine.", "Tell a grown-up you don't feel well.", ["Find medicine and take it yourself.", "Take a lot so you feel better faster.", "Ask a friend for their medicine."], "A trusted grown-up knows the right medicine and amount.", "🤒"],
  ],
  J: [["Asking a grown-up for help reaching the top shelf.", 0], ["Touching a hot stove.", 1], ["Washing your hands before eating.", 0], ["Taking medicine you found by yourself.", 1], ["Playing with matches.", 1], ["Walking carefully down the stairs.", 0], ["Running with scissors.", 1], ["Wearing a helmet on your bike.", 0], ["Drinking from a bottle under the sink.", 1], ["Putting toys away so nobody trips.", 0], ["Climbing on the kitchen counter.", 1], ["Telling a grown-up about a broken glass.", 0]],
});

const FEELS = [["😀", "happy"], ["😢", "sad"], ["😠", "angry"], ["😨", "scared"], ["😲", "surprised"], ["😴", "tired"], ["😳", "embarrassed"], ["🥰", "loved"], ["😟", "worried"], ["🤩", "excited"]];
mannersTopic(6, {
  id: "feelings", title: "Naming Feelings", icon: "😊", blurb: "Notice how you and others feel.", labels: "good",
  trick: "Look at the eyes and the mouth. Then think: how would I feel if that happened to me?",
  lesson: [
    L3("Everyone has feelings", "Everyone has feelings: happy, sad, angry, scared and more. All feelings are okay!", `<div class="card-grid">${FEELS.slice(0, 4).map(([e, n]) => picCard(e, n, n)).join("")}</div>`),
    L3("Faces give clues", "Look at a face. Tears mean sad. A big smile means happy. A frown and tight eyebrows can mean angry.", `<div class="card-grid">${FEELS.slice(4, 8).map(([e, n]) => picCard(e, n, n)).join("")}</div>`),
    L3("Say how you feel", "Use words to say how you feel: I feel sad because my ice cream fell. Talking about feelings helps.", `<div class="sentence big-sentence">“I feel <b class="hl">sad</b> because my ice cream fell.” 🍦</div>`),
  ],
  sq: "How might they <b>feel</b>?",
  S: [
    ["Your friend's ice cream fell on the ground.", "sad", ["excited", "proud", "sleepy"], "Losing a treat would make most people sad.", "🍦"],
    ["Someone knocked down Maya's tower on purpose.", "angry", ["happy", "sleepy", "loved"], "It's natural to feel angry when someone wrecks your work.", "🧱"],
    ["Leo hears a loud thunderstorm at night.", "scared", ["happy", "proud", "silly"], "Loud storms can feel scary.", "⛈️"],
    ["It's Ava's birthday party today!", "excited", ["sad", "scared", "angry"], "Birthdays usually feel exciting.", "🎂"],
    ["Sam stayed up very late.", "tired", ["excited", "angry", "surprised"], "Staying up late makes you tired.", "🌙"],
    ["Grandma gives Kai a big hug.", "loved", ["angry", "scared", "bored"], "Hugs from family can make us feel loved.", "🤗"],
    ["A friend jumps out and says “Boo!” at a party.", "surprised", ["sleepy", "bored", "sad"], "Something unexpected makes us surprised.", "🎉"],
    ["Mia's dog is sick and has to go to the vet.", "worried", ["excited", "silly", "proud"], "We feel worried when someone we love isn't well.", "🐶"],
    ["Omar fell in front of the whole class.", "embarrassed", ["proud", "excited", "loved"], "Lots of people feel embarrassed when that happens.", "😳"],
    ["Zoe finally learned to ride her bike!", "proud", ["sad", "scared", "tired"], "Doing something hard makes you proud.", "🚲"],
  ],
  J: [["Telling a grown-up “I feel sad.”", 0], ["Hitting someone when you're angry.", 1, "Use words or take deep breaths instead."], ["Taking deep breaths when you're upset.", 0], ["Laughing at a friend who is crying.", 1], ["Asking a sad friend, “Are you okay?”", 0], ["Hiding all your feelings forever.", 1, "It helps to talk about feelings with someone you trust."], ["Hugging your teddy when you're scared.", 0], ["Throwing toys when you're mad.", 1]],
});

mannersTopic(6, {
  id: "germs", title: "Clean & Healthy", icon: "🧼", blurb: "Wash hands, cover coughs, stay healthy.", labels: "good",
  trick: "Germs are tiny and invisible. Wash hands with soap for 20 seconds, the time it takes to sing Happy Birthday twice.",
  lesson: [
    L3("Germs are tiny", "Germs are so tiny you can't see them, but they can make you sick. Washing with soap gets rid of them!", row(`<span class="emo xxl">🦠</span>`, arrow(), `<span class="emo xxl">🧼</span>`, arrow(), `<span class="emo xxl">✨</span>`)),
    L3("Wash your hands", "Wash with soap and water for 20 seconds. Sing Happy Birthday two times! Wash before eating and after the bathroom.", `<ol class="steps"><li>💧 Wet your hands</li><li>🧼 Add soap and scrub 20 seconds</li><li>🚿 Rinse</li><li>🧻 Dry</li></ol>`),
    L3("Cover coughs and sneezes", "Cough or sneeze into your elbow, not your hands. Then germs don't spread to things you touch.", row(`<span class="emo xxl">🤧</span>`, arrow(), `<span class="emo xxl">💪</span>`) + note("Sneeze into your <b>elbow</b>")),
  ],
  S: [
    ["You just used the bathroom.", "Wash your hands with soap.", ["Skip washing, they look clean.", "Wipe them on your pants.", "Just shake them dry."], "Washing with soap removes germs.", "🚽"],
    ["You feel a sneeze coming.", "Sneeze into your elbow.", ["Sneeze on your friend.", "Sneeze into your hands and keep playing.", "Sneeze on the snack table."], "Your elbow stops germs from spreading.", "🤧"],
    ["It's time for lunch.", "Wash your hands first.", ["Eat right after playing in the dirt.", "Lick your hands clean.", "Share a fork with someone who is sick."], "Clean hands keep germs out of your mouth.", "🥪"],
    ["Your friend wants to share your water bottle.", "Offer them a cup instead.", ["Let them drink from your bottle.", "Spit in it first.", "Throw it."], "Sharing bottles can share germs.", "🥤"],
    ["You have a runny nose.", "Use a tissue, then throw it away and wash your hands.", ["Wipe it on your sleeve.", "Use your hand and touch toys.", "Leave the tissue on the table."], "Tissues catch germs, then they go in the trash.", "🤧"],
    ["It's bedtime.", "Brush your teeth for two minutes.", ["Skip brushing.", "Eat candy in bed.", "Brush for one second."], "Brushing keeps teeth healthy.", "🪥"],
    ["You played outside in the mud.", "Wash up when you come in.", ["Go straight to the couch.", "Eat a snack right away.", "Rub mud on the walls."], "Washing keeps dirt and germs off.", "🥾"],
    ["You feel sick with a fever.", "Tell a grown-up and rest at home.", ["Go to a friend's party.", "Hug everyone at school.", "Keep it a secret."], "Resting helps you get better and keeps others healthy.", "🤒"],
    ["You petted a dog at the park.", "Wash your hands before eating.", ["Lick your fingers.", "Eat your sandwich right away.", "Wipe hands on your face."], "Animals can carry germs too.", "🐕"],
    ["You want to stay healthy and strong.", "Eat fruits and veggies, drink water, and sleep well.", ["Eat only candy.", "Stay up all night.", "Drink only soda."], "Healthy food, water and sleep help your body.", "🥕"],
  ],
  J: [["Washing hands for 20 seconds.", 0], ["Sneezing on your friend.", 1], ["Coughing into your elbow.", 0], ["Sharing a toothbrush.", 1], ["Throwing used tissues in the trash.", 0], ["Picking your nose and touching toys.", 1], ["Taking a bath.", 0], ["Eating with dirty hands.", 1], ["Drinking water when you're thirsty.", 0], ["Never brushing your teeth.", 1]],
});

mannersTopic(6, {
  id: "goodfriend", title: "Being a Good Friend", icon: "🤝", blurb: "Be kind, include others, and help.", labels: "kind",
  trick: "A good friend includes, helps, listens, and says sorry. Ask: would this make my friend smile?",
  lesson: [
    L3("What good friends do", "Good friends are kind. They share, help, listen, and include others.", pics(["🤝", "Share"], ["🙋", "Help"], ["👂", "Listen"], ["👫", "Include"])),
    L3("Include others", "If someone is alone, invite them to play. Everyone likes to feel welcome.", `<div class="sentence big-sentence">“Do you want to play with us?” 🙂</div>`),
    L3("Fixing mistakes", "Friends sometimes make mistakes. Say sorry, and forgive your friends when they say sorry too.", `<div class="sentence big-sentence">“I'm sorry.” → “It's okay. Let's play!” 💛</div>`),
  ],
  S: [
    ["Your friend fell and scraped their knee.", "Ask if they're okay and get a grown-up.", ["Laugh at them.", "Keep playing.", "Tell everyone they fell."], "Helping a hurt friend is kind.", "🩹"],
    ["Someone is sitting alone at lunch.", "Invite them to sit with you.", ["Point and whisper.", "Ignore them.", "Take their seat."], "Including people is what good friends do.", "🍱"],
    ["Your friend shows you a drawing.", "Say something nice about it.", ["Say “That's ugly.”", "Scribble on it.", "Ignore them."], "Kind words make people feel good.", "🎨"],
    ["Your friend is telling you a story.", "Look at them and listen.", ["Walk away.", "Talk over them.", "Cover your ears."], "Listening shows you care.", "👂"],
    ["You and your friend want to play different games.", "Take turns choosing the game.", ["Only play your game.", "Go home angry.", "Say “I'm not your friend anymore.”"], "Taking turns choosing is fair.", "🎲"],
    ["Your friend says sorry for being bossy.", "Say “It's okay” and keep playing.", ["Stay mad forever.", "Tell them you hate them.", "Make them say sorry ten times."], "Forgiving is part of friendship.", "💛"],
    ["Your friend drops all their crayons.", "Help pick them up.", ["Step on them.", "Laugh.", "Take some for yourself."], "Helping is kind.", "🖍️"],
    ["A friend is sad because they lost a game.", "Say “Good game! Want to play again?”", ["Say “Ha ha, you lost!”", "Brag about winning.", "Do a silly winning dance at them."], "Being kind after a game is good sportsmanship.", "🏆"],
    ["Your friend is new and doesn't know the rules.", "Explain the rules nicely.", ["Tell them they can't play.", "Change the rules so they lose.", "Laugh at their mistakes."], "Helping new players learn is kind.", "⚽"],
    ["You want to play with someone new.", "Smile and say “Hi, want to play?”", ["Grab their toy.", "Push them.", "Stare without talking."], "A smile and kind words help make friends.", "👋"],
  ],
  J: [["Inviting someone to play.", 0], ["Telling a secret to make fun of someone.", 1], ["Helping a friend clean up.", 0], ["Saying “You can't play with us.”", 1], ["Cheering for your friend.", 0], ["Calling someone a mean name.", 1], ["Sharing your toys.", 0], ["Pushing in line.", 1], ["Saying “Good job!”", 0], ["Leaving a friend out on purpose.", 1]],
});

mannersTopic(6, {
  id: "road", title: "Road Safety", icon: "🚦", blurb: "Cross streets and ride safely.", labels: "safe",
  trick: "Stop, look left, look right, look left again, and hold a grown-up's hand. Red means stop, green means go.",
  lesson: [
    L3("Stop, look, listen", "Before crossing a street, stop at the curb. Look left, right, and left again. Listen for cars. Hold a grown-up's hand.", `<div class="chips"><span class="chip lg">🛑 Stop</span><span class="chip lg">👀 Look left, right, left</span><span class="chip lg">👂 Listen</span><span class="chip lg">🤝 Hold hands</span></div>`),
    L3("Traffic lights", "Red means stop. Yellow means slow down. Green means go, but still look first! Use crosswalks.", `<div class="tlight"><span class="r"></span><span class="y"></span><span class="g"></span></div><div class="legend"><span>🔴 stop</span><span>🟡 slow</span><span>🟢 go (look first!)</span></div>`),
    L3("Buckle up and helmets on", "Always wear your seatbelt in the car. Wear a helmet when you ride a bike or scooter.", pics(["💺", "Seatbelt", "every ride"], ["⛑️", "Helmet", "bikes and scooters"])),
  ],
  S: [
    ["Your ball rolls into the street.", "Stop and ask a grown-up to get it.", ["Run after it.", "Jump into the street.", "Kick it further."], "Never run into the street. Cars may not see you.", "⚽"],
    ["You want to cross the street.", "Hold a grown-up's hand and look both ways.", ["Run across fast.", "Cross between parked cars.", "Close your eyes and go."], "Holding hands and looking keeps you safe.", "🚸"],
    ["You get in the car.", "Buckle your seatbelt.", ["Stand up on the seat.", "Sit without a seatbelt.", "Sit in the trunk."], "Seatbelts keep you safe if the car stops fast.", "🚗"],
    ["You want to ride your bike.", "Put on your helmet first.", ["Ride without a helmet.", "Wear the helmet on your knee.", "Ride in the middle of the road."], "Helmets protect your head.", "🚲"],
    ["The traffic light is red.", "Stop and wait.", ["Run across.", "Dance in the crosswalk.", "Go because no cars are there."], "Red means stop.", "🚦"],
    ["The walk sign is on.", "Look both ways, then walk across.", ["Run without looking.", "Stop in the middle of the road.", "Walk backward."], "Even on walk, check that cars have stopped.", "🚶"],
    ["You're walking in a parking lot.", "Hold a grown-up's hand and stay close.", ["Run between cars.", "Hide behind a car.", "Play tag."], "Drivers backing up may not see small kids.", "🅿️"],
    ["You're getting off the school bus.", "Walk where the driver can see you.", ["Run behind the bus.", "Crawl under the bus for a dropped toy.", "Play near the wheels."], "Bus drivers can't see right behind or under the bus.", "🚌"],
    ["It's getting dark and you're walking with Dad.", "Wear something bright or carry a light.", ["Wear all black and hide.", "Walk in the road.", "Run ahead alone."], "Bright clothes help drivers see you.", "🔦"],
    ["You want to play.", "Play in the yard or park, not the street.", ["Play tag in the road.", "Draw with chalk in the middle of the street.", "Ride your scooter around cars."], "Streets are for cars, not playing.", "🏞️"],
  ],
  J: [["Wearing a seatbelt.", 0], ["Running into the street.", 1], ["Holding a grown-up's hand to cross.", 0], ["Riding a bike without a helmet.", 1], ["Crossing at the crosswalk.", 0], ["Playing in a parking lot.", 1], ["Looking left, right, and left again.", 0], ["Crossing when the light is red.", 1], ["Sitting in your car seat.", 0], ["Standing up in a moving car.", 1]],
});

/* ============================== AGE 7 ============================== */
mannersTopic(7, {
  id: "kindunkind", title: "Kind or Unkind?", icon: "💛", blurb: "Choose kind words and actions.", labels: "kind",
  trick: "Before you speak, think: is it true, is it helpful, is it kind?",
  lesson: [
    L3("Kind words", "Kind words make people feel good. Good job! Can I help? Want to play? Thank you!", `<div class="chips">${["Good job! 👏", "Can I help? 🙋", "Want to play? 🎲", "You can do it! 💪"].map(w => chip(w, w, "lg")).join("")}</div>`),
    L3("Unkind words hurt", "Unkind words can hurt feelings, even as a joke. Name-calling and teasing are unkind.", doDont(["Cheer others on", "Use names nicely"], ["Call names", "Tease or laugh at someone"])),
    L3("Think before you speak", "Before you say something, ask: is it true? Is it helpful? Is it kind?", `<ol class="steps"><li>✔ Is it true?</li><li>✔ Is it helpful?</li><li>✔ Is it kind?</li></ol>`),
  ],
  S: [
    ["A classmate gets a wrong answer.", "Say “That's okay, you'll get it next time!”", ["Laugh loudly.", "Say “That's so dumb.”", "Tell everyone."], "Encouraging words are kind.", "📝"],
    ["Your friend got a new haircut you don't love.", "Say something kind, like “You look happy!”", ["Say “That looks awful.”", "Laugh at it.", "Make a mean joke."], "You can always find something kind to say.", "💇"],
    ["Someone trips and drops their tray.", "Help them pick it up.", ["Clap and cheer.", "Take a video.", "Walk away laughing."], "Helping is kind.", "🍱"],
    ["A kid speaks a different language.", "Smile and try to include them.", ["Make fun of how they talk.", "Ignore them.", "Copy their accent to tease."], "Everyone deserves kindness.", "🌍"],
    ["Your sister is sad.", "Ask, “Do you want a hug?”", ["Say “Stop being a baby.”", "Laugh.", "Tell her to go away."], "Comforting someone is kind.", "🤗"],
    ["Your friend wins the race and you don't.", "Say “Great race!”", ["Say they cheated.", "Stop being their friend.", "Pout and refuse to talk."], "Being happy for others is kind.", "🏃"],
    ["You hear kids teasing someone.", "Tell them to stop or get a grown-up.", ["Join in.", "Laugh along.", "Film it."], "Standing up for others is kind and brave.", "🛑"],
    ["Your teacher looks tired carrying books.", "Offer to help carry them.", ["Ignore her.", "Add more books to the pile.", "Run past."], "Offering help is kind.", "📚"],
  ],
  J: [["Saying “Great job!”", 0], ["Calling someone a mean name.", 1], ["Holding the door for someone.", 0], ["Laughing when someone falls.", 1], ["Helping a friend tie their shoe.", 0], ["Spreading a mean rumor.", 1], ["Writing a thank-you note.", 0], ["Making fun of someone's clothes.", 1], ["Sharing your crayons.", 0], ["Rolling your eyes at a friend's idea.", 1], ["Saying “You can sit with us.”", 0], ["Telling someone they're not invited, just to hurt them.", 1], ["Giving a compliment.", 0], ["Copying someone to tease them.", 1]],
});

mannersTopic(7, {
  id: "listening", title: "Listening & Talking", icon: "👂", blurb: "Wait your turn to talk and really listen.", labels: "polite",
  trick: "Whole-body listening: eyes look, ears listen, mouth quiet, body calm. Wait for a pause before you talk.",
  lesson: [
    L3("Whole-body listening", "Good listeners use their whole body. Eyes look at the speaker. Ears listen. Mouth is quiet. Body is calm.", pics(["👀", "Eyes look"], ["👂", "Ears listen"], ["🤐", "Mouth quiet"], ["🧘", "Body calm"])),
    L3("Don't interrupt", "Interrupting means talking while someone else is talking. Wait for a pause, or say excuse me and wait.", `<div class="sentence big-sentence">“<b class="hl">Excuse me</b>, Mom…” then wait. ✋</div>`),
    L3("Raise your hand", "In class, raise your hand and wait to be called on. That way everyone gets a turn.", bigEmo("🙋")),
  ],
  S: [
    ["Your teacher is talking and you have a question.", "Raise your hand and wait.", ["Shout out your question.", "Talk to your neighbor instead.", "Walk to the teacher's desk."], "Raising your hand gives everyone a fair turn.", "🙋"],
    ["Mom is on the phone and you want a snack.", "Wait, or say “Excuse me” quietly and wait.", ["Yell “MOM!” over and over.", "Pull the phone away.", "Climb the counter yourself."], "Waiting patiently is polite.", "📱"],
    ["Your friend is telling a story.", "Listen until they finish.", ["Start telling your own story.", "Yawn loudly.", "Walk away."], "Letting friends finish shows respect.", "🗣️"],
    ["Two grown-ups are talking and you need help.", "Stand nearby and say “Excuse me” when there's a pause.", ["Push between them.", "Tug their clothes nonstop.", "Scream."], "Wait for a pause, then politely speak.", "🧍"],
    ["The class is listening to a speaker.", "Sit quietly and look at the speaker.", ["Whisper jokes.", "Play with your shoes.", "Make noises."], "Good listeners give the speaker attention.", "🎤"],
    ["You disagree with your friend's idea.", "Listen first, then share your idea kindly.", ["Say “That's stupid.”", "Talk over them.", "Cover your ears."], "Listening first, then sharing kindly, is respectful.", "💡"],
    ["Someone asks you a question.", "Look at them and answer.", ["Ignore them.", "Keep watching TV.", "Answer with a rude face."], "Answering politely shows respect.", "❓"],
    ["Grandpa is telling a long story.", "Listen and ask a question at the end.", ["Say “This is boring.”", "Leave the room.", "Turn up the TV."], "Showing interest makes people feel valued.", "👴"],
  ],
  J: [["Raising your hand to speak.", 0], ["Interrupting someone who is talking.", 1], ["Looking at the person talking.", 0], ["Talking during a movie at the theater.", 1], ["Saying “Excuse me” and waiting.", 0], ["Yelling to get attention.", 1], ["Nodding to show you're listening.", 0], ["Rolling your eyes while someone talks.", 1], ["Asking a question about their story.", 0], ["Playing a game while someone talks to you.", 1], ["Waiting for a pause to talk.", 0], ["Finishing other people's sentences for them.", 1]],
});

mannersTopic(7, {
  id: "calmdown", title: "Calm-Down Tools", icon: "🧘", blurb: "What to do with big angry or upset feelings.", labels: "good",
  trick: "Stop, breathe, and count to 10. Then use your words or ask for help.",
  lesson: [
    L3("Big feelings are okay", "Everyone gets angry or upset sometimes. Feelings are okay. Hurting people or things is not okay.", row(`<span class="emo xxl">😠</span>`, `<span class="sym">→</span>`, `<span class="emo xxl">🧘</span>`)),
    L3("Calm-down tools", "Try a calm-down tool: take 5 deep breaths, count to 10, squeeze a pillow, or take a short break.", pics(["🌬️", "Deep breaths", "smell the flower, blow the candle"], ["🔢", "Count to 10"], ["🧸", "Squeeze a pillow"], ["🚶", "Take a break"])),
    L3("Then use your words", "When you're calmer, say how you feel: I feel angry because… Then you can solve the problem.", `<div class="sentence big-sentence">“I feel <b class="hl">angry</b> because you took my ball.”</div>`),
  ],
  S: [
    ["Your brother knocked over your Lego tower and you feel mad.", "Take deep breaths, then tell him how you feel.", ["Knock over his things.", "Hit him.", "Scream and throw blocks."], "Calm down first, then use words.", "🧱"],
    ["You lost a board game and feel upset.", "Take a breath and say “Good game.”", ["Flip the board.", "Say the winner cheated.", "Cry and quit forever."], "Calming down helps you be a good sport.", "🎲"],
    ["You can't figure out your homework and feel frustrated.", "Take a break, then ask for help.", ["Rip up the paper.", "Throw your pencil.", "Give up forever."], "A short break and help can solve it.", "📝"],
    ["Someone said something mean and you feel angry.", "Walk away and tell a grown-up.", ["Say something meaner.", "Push them.", "Kick a wall."], "Walking away and telling a grown-up is safe.", "😠"],
    ["Your heart is beating fast because you're upset.", "Breathe in slowly through your nose, out through your mouth.", ["Run around screaming.", "Hold your breath.", "Bang your head."], "Slow breaths calm your body.", "🌬️"],
    ["You have to stop playing and go to bed.", "Say “Okay” and maybe ask for five more minutes nicely.", ["Throw a tantrum.", "Hide.", "Slam the door."], "Asking nicely works better than a tantrum.", "🛏️"],
    ["You feel super angry at your friend.", "Count to 10 slowly before you talk.", ["Yell right away.", "Break their toy.", "Say you hate them."], "Counting gives your brain time to calm down.", "🔢"],
    ["You're upset and want to be alone for a bit.", "Go to a calm corner and hug a pillow.", ["Lock yourself outside.", "Run away from home.", "Hit your pillow at someone."], "A calm spot helps your body relax.", "🛋️"],
  ],
  J: [["Taking 5 deep breaths.", 0], ["Throwing toys when angry.", 1], ["Counting to 10.", 0], ["Hitting someone who made you mad.", 1], ["Saying “I need a break.”", 0], ["Screaming mean words.", 1], ["Squeezing a stress ball.", 0], ["Slamming doors.", 1], ["Talking to a grown-up about your feelings.", 0], ["Breaking something on purpose.", 1], ["Drawing a picture of how you feel.", 0], ["Saying “I hate you!”", 1]],
});

mannersTopic(7, {
  id: "strangers", title: "Stranger Safety", icon: "🚸", blurb: "Know who to trust and what to do.", labels: "safe",
  trick: "Never go anywhere with someone without asking your grown-up first. If you feel unsure: say no, get away, tell a grown-up.",
  lesson: [
    L3("Safe grown-ups", "Safe grown-ups are people your family trusts, like parents, teachers, and family friends you know well.", pics(["👪", "Family"], ["🧑‍🏫", "Teacher"], ["👮", "Police officer"])),
    L3("Check first", "Never go anywhere or take anything from someone without checking with your grown-up first. Even if they say they know your mom!", `<div class="stop-ask"><span class="emo xxl">✋</span><b>CHECK FIRST</b><span>with your grown-up</span></div>`),
    L3("No, Go, Tell", "If someone makes you feel scared or unsure: say No! loudly, Go away fast, and Tell a trusted grown-up.", `<div class="chips"><span class="chip xl">🙅 NO!</span><span class="chip xl">🏃 GO!</span><span class="chip xl">🗣️ TELL!</span></div>`),
  ],
  S: [
    ["A person you don't know offers you candy to come to their car.", "Say “No!”, get away, and tell a grown-up.", ["Take the candy and go.", "Get in the car to say thank you.", "Ask for two candies."], "Never go with someone without checking first.", "🍬"],
    ["Someone you don't know says, “Your mom sent me to pick you up.”", "Don't go. Check with your teacher or parent first.", ["Go with them.", "Ask what car they have, then go.", "Go if they seem nice."], "Always check with your grown-up first, even if they know your name.", "🚗"],
    ["You get lost in a store.", "Ask a store worker or a mom with kids for help.", ["Go out to the parking lot.", "Leave with someone who offers a ride.", "Hide in a corner."], "Store workers and parents with kids are good helpers.", "🛒"],
    ["A stranger asks you to help find their lost puppy.", "Say “No,” and go tell your grown-up.", ["Go help them look.", "Walk to their house.", "Get in their car to search."], "Grown-ups should ask other grown-ups for help, not kids.", "🐶"],
    ["Someone online you don't know asks where you live.", "Don't answer, and tell a grown-up.", ["Tell them your address.", "Send a photo of your house.", "Tell them your school."], "Never share where you live with people you don't know.", "💻"],
    ["You're playing outside and want to go to a friend's house.", "Ask your grown-up first.", ["Just go.", "Leave a note and go.", "Go and come back before dinner."], "Your grown-up always needs to know where you are.", "🏡"],
    ["Someone grabs your arm and you feel scared.", "Yell “NO! This is not my dad!”, pull away, and run to a safe place.", ["Stay quiet.", "Go with them.", "Wait to see what happens."], "Yelling and running gets help fast.", "📢"],
    ["A stranger at the park says hi.", "You can say hi back, but stay near your grown-up.", ["Walk away with them.", "Tell them your name and address.", "Leave the park with them."], "Saying hi is fine. Going with them is not.", "👋"],
  ],
  J: [["Going somewhere only after asking your grown-up.", 0], ["Getting into a car with someone you don't know.", 1], ["Using a family password with someone picking you up.", 0, "A secret family password helps you know they really were sent."], ["Taking a gift from a stranger without asking.", 1], ["Telling a grown-up when someone makes you feel uncomfortable.", 0], ["Telling someone online where you live.", 1], ["Staying close to your grown-up in crowds.", 0], ["Walking home a different way without telling anyone.", 1], ["Knowing your parent's phone number by heart.", 0], ["Opening the door to someone when you're home alone.", 1]],
});

mannersTopic(7, {
  id: "sorry", title: "Saying Sorry", icon: "🙏", blurb: "How to make a real apology.", labels: "good",
  trick: "A real sorry has three parts: say what you did, say sorry, and say how you'll fix it.",
  lesson: [
    L3("A real apology", "Saying sorry means you know you made a mistake and you want to fix it.", bigEmo("🙏")),
    L3("Three parts", "A good apology has three parts. 1. Say what you did. 2. Say sorry. 3. Say how you'll make it better.", `<ol class="steps"><li>“I took your pencil.”</li><li>“I'm sorry.”</li><li>“Here it is. I'll ask next time.”</li></ol>`),
    L3("Mean it", "A grumpy “Sorry!” with a mad face doesn't count. Look at them and say it like you mean it.", doDont(["Look at them", "Use a kind voice", "Fix it if you can"], ["Say “Sorry, but…”", "Roll your eyes", "Blame them"])),
  ],
  S: [
    ["You broke your friend's crayon.", "“I'm sorry I broke your crayon. You can use mine.”", ["“Sorry, it was cheap anyway.”", "“It's not my fault.”", "Say nothing and hide it."], "Say what you did, say sorry, and fix it.", "🖍️"],
    ["You said something mean to your sister.", "“I'm sorry I called you a name. That wasn't kind.”", ["“Sorry you're so sensitive.”", "“SORRY!” in a mad voice.", "“You started it.”"], "A real apology owns what you did.", "👧"],
    ["You forgot to return a library book.", "Tell the librarian you're sorry and return it soon.", ["Hide the book forever.", "Blame your dog.", "Pretend you never borrowed it."], "Owning mistakes builds trust.", "📚"],
    ["You bumped someone and they dropped their snack.", "Say sorry and help clean up.", ["Laugh and walk away.", "Say “Watch where you're going.”", "Eat their snack."], "Helping fix it shows you mean your sorry.", "🍿"],
    ["Your friend says sorry for hurting your feelings.", "Say “Thank you for saying sorry. It's okay.”", ["Say “I'll never forgive you.”", "Make them beg.", "Laugh at them."], "Accepting an apology helps the friendship.", "💛"],
    ["You yelled at your mom when you were tired.", "Later, say “I'm sorry I yelled. I was tired.”", ["Never mention it.", "Yell again.", "Say “You made me do it.”"], "It's never too late to say sorry.", "👩"],
    ["You cut in line by mistake.", "Say “Oops, sorry!” and go to the back.", ["Stay there and ignore them.", "Push the next person.", "Argue about it."], "Sorry plus fixing it is a real apology.", "🧍"],
    ["You stepped on a classmate's art project.", "Say sorry and offer to help remake it.", ["Say it was already bad.", "Walk away.", "Blame the wind."], "Offering help makes the apology real.", "🎨"],
  ],
  J: [["“I'm sorry I took your toy. Here it is.”", 0], ["“Sorry, but you deserved it.”", 1], ["Looking at the person when you apologize.", 0], ["Saying sorry with an eye roll.", 1], ["Offering to fix what you broke.", 0], ["Blaming someone else for your mistake.", 1], ["Forgiving a friend who says sorry.", 0], ["“I'm sorry you're upset” but not changing anything.", 1], ["Saying what you did wrong.", 0], ["Pretending it didn't happen.", 1]],
});

mannersTopic(7, {
  id: "goodsport", title: "Being a Good Sport", icon: "🏅", blurb: "Play fair when you win or lose.", labels: "good",
  trick: "Win or lose, say “Good game!” Play by the rules, and have fun.",
  lesson: [
    L3("Play fair", "Good sports play by the rules, take turns, and don't cheat.", pics(["📜", "Follow rules"], ["🔁", "Take turns"], ["🤝", "Play fair"])),
    L3("When you win", "When you win, smile and say good game. Don't brag or tease.", `<div class="sentence big-sentence">“Good game! That was fun!” 🏆</div>`),
    L3("When you lose", "Losing can feel bad, and that's okay. Take a breath, say good game, and try again next time.", `<div class="sentence big-sentence">“Good game! Let's play again!” 🙂</div>`),
  ],
  S: [
    ["You win a race at recess.", "Say “Good race!” to the others.", ["Brag all day.", "Laugh at the slowest kid.", "Do a mean victory dance."], "Winning kindly is good sportsmanship.", "🏃"],
    ["You lose a board game.", "Say “Good game,” and maybe ask to play again.", ["Throw the pieces.", "Say “This game is dumb.”", "Accuse them of cheating."], "Losing calmly is what good sports do.", "🎲"],
    ["You could peek at the cards to win.", "Don't peek. Play fair.", ["Peek when nobody is looking.", "Peek a little.", "Peek and lie about it."], "Cheating isn't fair to others.", "🃏"],
    ["A teammate misses the goal.", "Say “Nice try! You'll get it next time.”", ["Yell at them.", "Say they ruined it.", "Refuse to pass to them again."], "Encouraging teammates is kind.", "⚽"],
    ["The referee makes a call you don't like.", "Accept it and keep playing.", ["Scream at the referee.", "Quit the game.", "Kick the ball away."], "Respecting the referee is part of being a good sport.", "🦓"],
    ["Your little cousin is learning a game.", "Be patient and help them.", ["Beat them badly and laugh.", "Say they're too little.", "Change the rules to win."], "Helping new players is kind.", "🧒"],
    ["The other team scores.", "Keep trying your best.", ["Give up.", "Stomp off.", "Say mean things."], "Good sports keep trying.", "🥅"],
    ["The game is over.", "Shake hands or high-five the other team.", ["Walk away grumbling.", "Ignore them.", "Make fun of them."], "A handshake shows respect.", "🤝"],
  ],
  J: [["Saying “Good game!”", 0], ["Cheating to win.", 1], ["Following the rules.", 0], ["Bragging about winning.", 1], ["Cheering for teammates.", 0], ["Quitting when you start losing.", 1], ["Shaking hands after a game.", 0], ["Yelling at the referee.", 1], ["Taking turns fairly.", 0], ["Saying the other team cheated just because you lost.", 1]],
});

mannersTopic(7, {
  id: "helping", title: "Helping at Home", icon: "🏡", blurb: "Do your part and be responsible.", labels: "good",
  trick: "If you made the mess, clean the mess. If you see a job, ask, “Can I help?”",
  lesson: [
    L3("Everyone helps", "A family is a team. Everyone helps out, even kids!", pics(["🧸", "Put toys away"], ["🛏️", "Make your bed"], ["🍽️", "Set the table"], ["🐕", "Feed the pet"])),
    L3("Clean up your mess", "If you take something out, put it back. If you make a mess, clean it up.", doDont(["Put toys back", "Wipe spills", "Hang up your coat"], ["Leave messes for others", "Hide messes", "Say “Not my job!”"])),
    L3("Ask how to help", "Look around. If someone is busy, ask, “Can I help?” Helping makes everyone happy.", `<div class="sentence big-sentence">“Can I help?” 🙋</div>`),
  ],
  S: [
    ["You finish playing with your blocks.", "Put them back in their box.", ["Leave them on the floor.", "Kick them under the couch.", "Wait for Mom to do it."], "Putting things away is your job.", "🧱"],
    ["Dad is carrying lots of grocery bags.", "Ask if you can carry one.", ["Keep watching TV.", "Ask for a treat from the bag.", "Run off to play."], "Offering help makes the work easier.", "🛍️"],
    ["You spill cereal on the floor.", "Clean it up.", ["Leave it for the dog.", "Walk away.", "Step on it."], "Cleaning your own mess is responsible.", "🥣"],
    ["Your pet's water bowl is empty.", "Fill it or tell a grown-up.", ["Ignore it.", "Give them soda.", "Wait until tomorrow."], "Pets depend on us to take care of them.", "🐱"],
    ["It's time to set the table.", "Put out plates, forks, and napkins.", ["Hide in your room.", "Say “I'm too tired.”", "Throw the forks on the table."], "Helping with meals is part of the team.", "🍽️"],
    ["Your coat is on the floor.", "Hang it up.", ["Leave it there.", "Kick it into the corner.", "Throw it on the couch."], "Hanging up your things keeps the home neat.", "🧥"],
    ["Mom asks you to clean your room.", "Say “Okay” and start cleaning.", ["Shove everything under the bed.", "Ignore her.", "Argue for an hour."], "Doing chores without fussing is responsible.", "🧹"],
    ["Your little brother can't reach his cup.", "Hand it to him.", ["Move it higher.", "Laugh at him.", "Drink it yourself."], "Helping family members is kind.", "🥤"],
  ],
  J: [["Making your bed.", 0], ["Leaving wet towels on the floor.", 1], ["Feeding the pet.", 0], ["Saying “That's not my job!”", 1], ["Putting dirty clothes in the hamper.", 0], ["Hiding a mess so nobody sees.", 1], ["Helping put away groceries.", 0], ["Leaving toys on the stairs.", 1, "Toys on stairs can make someone trip."], ["Asking “Can I help?”", 0], ["Watching TV while others clean up your mess.", 1]],
});

mannersTopic(7, {
  id: "watersun", title: "Water & Sun Safety", icon: "🏊", blurb: "Stay safe at the pool, beach and outside.", labels: "safe",
  trick: "Water: only swim with a grown-up watching. Sun: slip on a shirt, slop on sunscreen, slap on a hat, and drink water.",
  lesson: [
    L3("Swim with a grown-up", "Only swim when a grown-up is watching. Wear a life jacket if you're still learning.", pics(["👀", "Grown-up watching"], ["🦺", "Life jacket"], ["🚶", "Walk, don't run"])),
    L3("Pool rules", "Walk, don't run, near the pool. Jump in feet first, only in the deep end if you can swim.", doDont(["Walk near the pool", "Swim with a buddy", "Listen to the lifeguard"], ["Run on wet tiles", "Push people in", "Swim alone"])),
    L3("Sun safety", "The sun can burn your skin. Wear sunscreen, a hat, and sunglasses. Drink lots of water on hot days.", pics(["🧴", "Sunscreen"], ["👒", "Hat"], ["🕶️", "Sunglasses"], ["💧", "Water"])),
  ],
  S: [
    ["You want to swim but no grown-up is watching.", "Wait until a grown-up can watch.", ["Jump in anyway.", "Swim in the deep end alone.", "Ask a younger kid to watch."], "A grown-up must always watch swimmers.", "🏊"],
    ["You're at the pool and it's wet everywhere.", "Walk carefully.", ["Run to the slide.", "Race your friend around the edge.", "Slide on your belly."], "Wet tiles are slippery.", "💧"],
    ["You're going on a boat.", "Wear a life jacket.", ["Skip it, you can swim.", "Sit on the edge.", "Lean way over."], "Life jackets keep you floating.", "⛵"],
    ["It's a hot sunny day at the park.", "Wear sunscreen and a hat, and drink water.", ["Stay in the sun all day without water.", "Wear no sunscreen.", "Drink only soda."], "Sun protection and water keep you healthy.", "☀️"],
    ["Your friend is struggling in the water.", "Yell for a grown-up or lifeguard right away.", ["Jump in to save them.", "Laugh.", "Swim away."], "Get a grown-up fast. Jumping in can put you in danger too.", "🆘"],
    ["You see thin ice on a pond.", "Stay off the ice.", ["Walk on it.", "Jump on it.", "Slide across it."], "Thin ice can break.", "🧊"],
    ["You feel very hot and dizzy outside.", "Go into the shade, drink water, and tell a grown-up.", ["Keep running.", "Ignore it.", "Lie down in the sun."], "Those are signs of getting too hot.", "🥵"],
    ["Thunder rumbles while you're swimming.", "Get out of the water and go inside.", ["Keep swimming.", "Hide under a tree.", "Float on your back."], "When thunder roars, go indoors.", "⛈️"],
  ],
  J: [["Swimming with a grown-up watching.", 0], ["Running by the pool.", 1], ["Wearing sunscreen.", 0], ["Swimming alone.", 1], ["Wearing a life jacket on a boat.", 0], ["Pushing someone into the pool.", 1], ["Drinking water on a hot day.", 0], ["Diving into shallow water.", 1], ["Getting out of the pool when there's thunder.", 0], ["Walking on a frozen pond.", 1]],
});

/* ============================== AGE 8 ============================== */
mannersTopic(8, {
  id: "outabout", title: "Manners Out & About", icon: "🏛️", blurb: "Library, restaurant, store and movie manners.", labels: "polite",
  trick: "Think about the people around you. Use an inside voice, wait your turn, and leave places as clean as you found them.",
  lesson: [
    L3("Different places, different manners", "Every place has its own manners. Libraries are quiet. Restaurants are calm. Movies need silence.", pics(["📚", "Library", "quiet voice"], ["🍝", "Restaurant", "stay seated"], ["🎬", "Movie", "no talking"], ["🛒", "Store", "walk, don't run"])),
    L3("Think about others", "Manners show you care about the people around you. A loud voice can bother people trying to read, eat, or watch.", doDont(["Use an inside voice", "Wait in line", "Say please and thank you to workers"], ["Run inside", "Cut in line", "Leave trash behind"])),
    L3("Leave it better", "Put things back where they belong and clean up after yourself, like the librarian's books or your restaurant napkin.", bigEmo("🧹")),
  ],
  S: [
    ["You're at the library and see your friend across the room.", "Walk over and whisper.", ["Shout their name.", "Run across the room.", "Throw a paper ball."], "Libraries need quiet voices.", "📚"],
    ["A waiter brings your food at a restaurant.", "Say “Thank you.”", ["Say nothing.", "Say “Finally.”", "Complain loudly."], "Workers deserve thanks too.", "🍝"],
    ["The movie starts and you want to tell your friend something.", "Wait until after the movie.", ["Talk through the movie.", "Use your phone's bright screen.", "Kick the seat in front."], "Talking ruins the movie for others.", "🎬"],
    ["There's a long line at the store.", "Wait your turn.", ["Cut to the front.", "Complain loudly.", "Push your cart into people."], "Waiting your turn is fair.", "🛒"],
    ["You're on a bus and an older person gets on with no seat.", "Offer them your seat.", ["Pretend to sleep.", "Put your bag on the seat.", "Stare at them."], "Offering your seat is respectful.", "🚌"],
    ["You finish a book at the library.", "Return it to the cart or the librarian.", ["Leave it on the floor.", "Shove it anywhere.", "Take it home without checking out."], "Returning things helps everyone find them.", "📖"],
    ["You're at a restaurant and feel bored.", "Draw or talk quietly at the table.", ["Run around the tables.", "Crawl under the table.", "Bang your utensils."], "Staying seated keeps everyone safe and calm.", "🍽️"],
    ["You drop a wrapper at the park.", "Pick it up and throw it away.", ["Leave it.", "Kick it into the bushes.", "Say it's someone else's."], "Keep public places clean for everyone.", "🗑️"],
    ["Someone holds the store door open for you.", "Say “Thank you.”", ["Walk through silently.", "Let it slam on the next person.", "Run past."], "Thanking people is polite.", "🚪"],
  ],
  J: [["Whispering in the library.", 0], ["Running in a restaurant.", 1], ["Saying thank you to a cashier.", 0], ["Talking loudly in a movie.", 1], ["Holding the door for the next person.", 0], ["Leaving trash on the table at the food court.", 1], ["Offering your seat to an older person.", 0], ["Playing loud videos on a bus without headphones.", 1], ["Waiting in line patiently.", 0], ["Touching everything in a store.", 1]],
});

mannersTopic(8, {
  id: "greetings", title: "Greetings & Phone Manners", icon: "📞", blurb: "Meeting people, video calls and phone calls.", labels: "polite",
  trick: "Look, smile, say hello and your name. On the phone: say hello, who you are, and take a message if needed.",
  lesson: [
    L3("Meeting someone new", "When you meet someone, look at them, smile, and say hello. You can shake hands and say your name.", `<div class="sentence big-sentence">“Hi, I'm Mia. Nice to meet you!” 🤝</div>`),
    L3("Answering the phone", "Say hello. If it's for someone else, say “Just a moment, please,” and get them. Or take a message.", `<ol class="steps"><li>“Hello?”</li><li>“May I ask who's calling?”</li><li>“Just a moment, please.”</li></ol>`),
    L3("Video calls", "On a video call, look at the screen, wait your turn to talk, and mute yourself if there's noise.", pics(["👀", "Look at screen"], ["🔇", "Mute when noisy"], ["✋", "Wait your turn"])),
  ],
  S: [
    ["Your mom introduces you to her friend.", "Look at them, smile, and say “Hi, nice to meet you.”", ["Hide behind your mom.", "Ignore them.", "Say “Who are you?” rudely."], "A friendly greeting is polite.", "👋"],
    ["The phone rings and it's for your dad.", "Say “Just a moment, please,” and get him.", ["Hang up.", "Yell “DAD!” into the phone.", "Say he's not here when he is."], "Polite phone manners help the caller.", "📞"],
    ["Grandma is on a video call.", "Look at the screen and talk with her.", ["Play a game while she talks.", "Walk away with the tablet.", "Make silly faces the whole time."], "Paying attention shows you care.", "👵"],
    ["Your dad can't come to the phone.", "Say “He can't come to the phone. Can I take a message?”", ["Hang up.", "Say “He doesn't want to talk.”", "Put the phone down and forget."], "Taking a message is helpful and polite.", "📝"],
    ["Your class has a video lesson and your dog is barking.", "Mute your microphone.", ["Let it bark.", "Bark back.", "Turn up the volume."], "Muting stops noise from bothering others.", "🔇"],
    ["You walk into a room where your neighbor is visiting.", "Say “Hi, Mrs. Lee!”", ["Walk past without a word.", "Make a face.", "Go hide."], "Greeting people makes them feel welcome.", "🏠"],
    ["A friend's parent says goodbye at the door.", "Say “Thank you for having me!”", ["Run out without a word.", "Say “Bye” without looking.", "Slam the door."], "Thanking the host is polite.", "🚪"],
    ["Someone you don't know calls and asks if you're home alone.", "Don't say you're alone. Say your parent can't come to the phone.", ["Say “Yes, I'm alone.”", "Tell them your address.", "Tell them when your parents come home."], "Never tell a caller you're home alone. It's a safety rule.", "☎️"],
  ],
  J: [["Saying “Nice to meet you.”", 0], ["Looking at your phone while someone talks to you.", 1], ["Answering the phone with “Hello?”", 0], ["Hanging up on someone.", 1], ["Muting yourself on a noisy video call.", 0], ["Shouting across the room to say hi.", 1], ["Saying goodbye before you leave.", 0], ["Walking away in the middle of a call.", 1], ["Taking a message for your parent.", 0], ["Ignoring a grown-up who says hello.", 1]],
});

mannersTopic(8, {
  id: "upstander", title: "Bullying & Upstanders", icon: "🦸", blurb: "What to do if you see or face bullying.", labels: "good",
  trick: "Bullying is mean on purpose, again and again. Be an upstander: don't join in, help the person, and tell a trusted grown-up.",
  lesson: [
    L3("What is bullying?", "Bullying is when someone is mean to another person on purpose, again and again. It can be hitting, name-calling, or leaving someone out.", pics(["👊", "Hurting"], ["🗯️", "Mean words"], ["🚫", "Leaving out"], ["📱", "Mean messages"])),
    L3("Be an upstander", "A bystander just watches. An upstander helps! Don't laugh along. Be a friend to the person. Tell a grown-up.", doDont(["Tell a trusted grown-up", "Be kind to the person", "Say “Stop, that's not okay.”"], ["Laugh along", "Join in", "Share mean messages"])),
    L3("Telling is not tattling", "Tattling is trying to get someone in trouble. Telling is trying to get someone out of trouble. Always tell about bullying.", table([["Telling 👍", "to keep someone safe"], ["Tattling 👎", "to get someone in trouble"]], ["", "Why"])),
  ],
  S: [
    ["You see kids calling someone mean names every day.", "Tell a teacher and be kind to that kid.", ["Laugh with them.", "Do nothing.", "Call the kid names too."], "Upstanders help and tell a trusted grown-up.", "🗯️"],
    ["Someone is being mean to you at recess.", "Say “Stop!”, walk away, and tell a grown-up.", ["Hit them back.", "Keep it secret forever.", "Be mean to someone else."], "Speaking up and telling a grown-up keeps you safe.", "🛑"],
    ["A group chat is making fun of a classmate.", "Don't join in, and show a grown-up.", ["Add a funny mean comment.", "Share it with more friends.", "Delete it and forget it."], "Telling a grown-up helps stop online bullying.", "📱"],
    ["A kid is always left out at lunch.", "Invite them to sit with you.", ["Save the seat for someone else.", "Whisper about them.", "Ignore them."], "Including someone is a powerful way to help.", "🍱"],
    ["Someone pushes another kid off the swing on purpose.", "Get a playground teacher right away.", ["Cheer.", "Take a video.", "Walk away."], "Getting help fast keeps everyone safe.", "🛝"],
    ["Your friend says, “Don't tell anyone they're picking on me.”", "Tell a trusted grown-up anyway, because your friend needs help.", ["Keep the secret.", "Tell the bully.", "Post about it online."], "Safety is more important than keeping a secret.", "🤫"],
    ["You were mean to someone and now feel bad.", "Say sorry and be kind from now on.", ["Pretend it didn't happen.", "Blame them.", "Keep doing it."], "Everyone can change and make things right.", "🙏"],
    ["A kid is teased for how they look.", "Say “That's not cool. Leave them alone.”", ["Laugh.", "Agree with the teasers.", "Look away."], "Standing up kindly can stop bullying.", "🦸"],
  ],
  J: [["Telling a teacher about bullying.", 0], ["Laughing when someone is teased.", 1], ["Sitting with someone who is alone.", 0], ["Sharing a mean picture of someone.", 1], ["Saying “Stop, that's not okay.”", 0], ["Leaving someone out on purpose every day.", 1], ["Asking a hurt kid, “Are you okay?”", 0], ["Keeping bullying a secret.", 1], ["Walking away from a bully and getting help.", 0], ["Hitting someone back.", 1]],
});

mannersTopic(8, {
  id: "online", title: "Online Safety", icon: "💻", blurb: "Be safe and smart on tablets and computers.", labels: "share",
  jq: "Is this okay to share online, or should you keep it private?",
  trick: "Keep it private: your full name, address, school, phone number, passwords and photos. When something online feels wrong, stop and tell a grown-up.",
  lesson: [
    L3("Private information", "Some information is private. Never share your full name, address, school, phone number, or passwords online.", pics(["🏠", "Address"], ["🏫", "School"], ["📞", "Phone"], ["🔑", "Passwords"])),
    L3("People online", "People online aren't always who they say they are. Only chat with people you know in real life, and only with your grown-up's okay.", note("A “kid” online might not really be a kid.")),
    L3("If something feels wrong", "If you see something scary or mean, or someone asks for private things, stop. Close it and tell a grown-up. You won't be in trouble.", `<div class="stop-ask"><span class="emo xxl">✋</span><b>STOP & TELL</b><span>a trusted grown-up</span></div>`),
  ],
  S: [
    ["A game player you don't know asks for your address.", "Don't answer, and tell a grown-up.", ["Tell them.", "Give your school name instead.", "Send a photo of your house."], "Never share where you live online.", "🎮"],
    ["A pop-up says you won a free tablet. Click here!", "Don't click, and tell a grown-up.", ["Click it fast.", "Type your parents' card number.", "Give your email."], "Pop-up prizes are usually tricks.", "🎁"],
    ["You see a video that makes you feel scared.", "Close it and tell a grown-up.", ["Keep watching.", "Share it with friends.", "Keep it secret."], "Grown-ups can help you feel safe.", "😨"],
    ["Your friend asks for your game password.", "Keep it secret. Only your parents should know it.", ["Share it, they're your friend.", "Post it in the chat.", "Write it on your hand at school."], "Passwords stay private, even from friends.", "🔑"],
    ["Someone online says, “Don't tell your parents we talk.”", "Tell your parents right away.", ["Keep the secret.", "Send them a photo.", "Agree to meet them."], "Safe people don't ask kids to keep secrets from parents.", "🤫"],
    ["You want to download a new game.", "Ask your grown-up first.", ["Download anything that looks fun.", "Use your parent's password without asking.", "Click all the ads."], "Grown-ups help check that games are safe.", "📲"],
    ["Someone posts a mean comment about you.", "Don't reply. Show a grown-up.", ["Write something meaner.", "Delete everything and hide.", "Share it everywhere."], "A grown-up can help block and report.", "💬"],
    ["A new online friend wants to meet in person.", "Say no and tell your parents.", ["Go meet them alone.", "Meet them at the park secretly.", "Give them your address."], "Never meet online people without your parents.", "📍"],
  ],
  J: [["Your favorite color", 0], ["Your home address", 1], ["Your password", 1], ["Your favorite animal", 0], ["Your phone number", 1], ["The name of your school", 1], ["A drawing of a dragon", 0], ["Your full name and birthday", 1], ["Your favorite book", 0], ["A photo of you in your school uniform", 1], ["Your opinion of a movie", 0], ["When you're home alone", 1]],
});

mannersTopic(8, {
  id: "emergency", title: "Emergencies & 911", icon: "🚑", blurb: "Know when and how to get help fast.", labels: "call",
  jq: "Should you call 911?",
  trick: "911 is for big emergencies: fire, someone badly hurt, or danger right now. Stay calm, say your address, and don't hang up until they tell you.",
  lesson: [
    L3("What is an emergency?", "An emergency is when someone is badly hurt, very sick, there's a fire, or someone is in danger right now.", pics(["🔥", "Fire"], ["🚑", "Badly hurt"], ["😵", "Won't wake up"], ["🚨", "Danger now"])),
    L3("Calling 911", "In the United States, call 911. Stay calm. Tell them your name, your address, and what happened. Don't hang up until they tell you to.", `<ol class="steps"><li>📞 Dial 9-1-1</li><li>🏠 Say your address</li><li>🗣️ Say what happened</li><li>👂 Listen and stay on the line</li></ol>`),
    L3("Not an emergency", "A lost toy or a small scrape is not an emergency. Never call 911 as a joke, because real people might need help.", note("Know your <b>address</b> and a parent's <b>phone number</b> by heart.")),
  ],
  S: [
    ["Grandpa falls and won't wake up.", "Call 911 right away.", ["Wait until he wakes up.", "Call your friend.", "Watch TV."], "Someone who won't wake up needs help fast.", "😵"],
    ["You see smoke coming from your kitchen.", "Get out of the house, then call 911.", ["Hide under the bed.", "Try to put it out yourself.", "Go back for your toys."], "Get out first, then call for help.", "🔥"],
    ["The 911 operator asks where you are.", "Say your full address.", ["Hang up.", "Say “At home.”", "Say “I don't know” and hang up."], "Your address tells helpers where to go.", "🏠"],
    ["You dialed 911 by accident.", "Stay on the line and say it was an accident.", ["Hang up and hide.", "Pretend there's an emergency.", "Call again for fun."], "Explaining saves helpers from worrying.", "📞"],
    ["Your little sister cut her finger a tiny bit.", "Tell a grown-up and get a bandage.", ["Call 911.", "Ignore her.", "Call the fire department."], "A small cut isn't a 911 emergency.", "🩹"],
    ["Mom is having trouble breathing and can't talk.", "Call 911.", ["Wait and see.", "Text a friend.", "Make her a sandwich."], "Trouble breathing is a real emergency.", "🫁"],
    ["You're lost at the mall.", "Find a store worker or security guard.", ["Call 911 from a stranger's phone.", "Leave the mall.", "Cry and hide."], "Being lost is scary, but store helpers can find your family.", "🛍️"],
    ["The operator is asking you questions.", "Stay calm and answer, and follow what they say.", ["Hang up quickly.", "Scream and drop the phone.", "Talk about something else."], "Operators help you step by step.", "🎧"],
  ],
  J: [["Your house is on fire.", 0], ["You lost your favorite toy.", 1], ["Someone is badly hurt and bleeding a lot.", 0], ["You want to play a prank.", 1], ["A grown-up fell and won't wake up.", 0], ["Your brother took your snack.", 1], ["Someone is breaking into your house.", 0], ["You have a small scrape on your knee.", 1], ["Someone can't breathe.", 0], ["The internet stopped working.", 1]],
});

mannersTopic(8, {
  id: "fire", title: "Fire Safety", icon: "🧯", blurb: "Smoke alarms, escape plans, stop-drop-roll.", labels: "safe",
  trick: "Get out, stay out, call for help. Crawl low under smoke. If clothes catch fire: stop, drop, and roll.",
  lesson: [
    L3("Smoke alarms", "A smoke alarm beeps loudly when it smells smoke. If you hear it, get out of the house fast!", row(`<span class="emo xxl">🚨</span>`, arrow(), `<span class="emo xxl">🏃</span>`)),
    L3("Get low and go", "Smoke rises up. Crawl low under smoke to get out. Feel doors before opening. If a door is hot, use another way out.", `<ol class="steps"><li>🐾 Crawl low under smoke</li><li>✋ Feel the door</li><li>🚪 Hot? Use another exit</li><li>🌳 Go to your meeting spot</li></ol>`),
    L3("Stop, drop, and roll", "If your clothes catch fire: stop, drop to the ground, cover your face, and roll back and forth.", `<div class="chips"><span class="chip xl">🛑 Stop</span><span class="chip xl">⬇️ Drop</span><span class="chip xl">🔄 Roll</span></div>`),
  ],
  S: [
    ["The smoke alarm goes off at night.", "Get out of the house and go to your meeting spot.", ["Hide under your bed.", "Hide in the closet.", "Stay and look for the fire."], "Get out fast, and never hide.", "🚨"],
    ["Your clothes catch fire.", "Stop, drop, and roll.", ["Run fast.", "Wave your arms.", "Jump up and down."], "Running makes fire bigger. Rolling puts it out.", "🔥"],
    ["There's smoke in the hallway.", "Crawl low under the smoke.", ["Walk tall.", "Hold your breath and run.", "Open all the windows first."], "The cleanest air is near the floor.", "🐾"],
    ["You're escaping and the door feels hot.", "Don't open it. Use another way out.", ["Open it fast.", "Kick it.", "Wait there."], "A hot door means fire is on the other side.", "🚪"],
    ["You're outside but your toy is still inside.", "Stay out. Never go back inside.", ["Run back to get it.", "Send the dog.", "Go back if it's quick."], "Get out and stay out.", "🧸"],
    ["You find matches on the floor.", "Give them to a grown-up.", ["Light one to see.", "Hide them.", "Play with them outside."], "Matches are tools for grown-ups only.", "🔥"],
    ["Your family is making a fire escape plan.", "Learn two ways out of each room and your meeting spot.", ["Say it's boring.", "Only learn one way.", "Skip it."], "Practicing a plan helps you stay calm.", "🗺️"],
    ["A pan on the stove catches fire.", "Get away and tell a grown-up right away.", ["Throw water on it.", "Carry it outside.", "Blow on it."], "Never put water on a grease fire.", "🍳"],
  ],
  J: [["Having a family meeting spot outside.", 0], ["Hiding in a closet during a fire.", 1], ["Crawling low under smoke.", 0], ["Going back inside for a toy.", 1], ["Testing smoke alarms with a grown-up.", 0], ["Playing with a lighter.", 1], ["Feeling a door before opening it.", 0], ["Running if your clothes are on fire.", 1], ["Practicing a fire drill.", 0], ["Putting a blanket over a space heater.", 1]],
});

mannersTopic(8, {
  id: "differences", title: "Respecting Differences", icon: "🌍", blurb: "Everyone is different, and that's great.", labels: "kind",
  trick: "Different isn't wrong. Be curious and kind: ask nicely, listen, and include everyone.",
  lesson: [
    L3("Everyone is different", "People look different, speak different languages, eat different foods, and celebrate different holidays. That makes the world interesting!", `<div class="chips">${["🧑🏻", "🧑🏽", "🧑🏿", "👩‍🦽", "👨‍🦯", "🧕", "👳"].map(e => `<span class="emo xl">${e}</span>`).join("")}</div>`),
    L3("Same on the inside", "Even when we're different, we all have feelings. We all want friends and kindness.", bigEmo("💛")),
    L3("Be curious, not rude", "It's okay to be curious. Ask kind questions, like “What holiday do you celebrate?” Never laugh at differences.", doDont(["Ask kind questions", "Try new foods", "Include everyone"], ["Laugh at differences", "Say “That's weird”", "Leave people out"])),
  ],
  S: [
    ["A new classmate brings a lunch you've never seen.", "Say “That looks interesting! What is it?”", ["Say “Ew, that smells weird.”", "Laugh with friends.", "Move seats away."], "Being curious and kind makes people feel welcome.", "🍱"],
    ["A kid in a wheelchair wants to play.", "Find a game you can play together.", ["Say they can't play.", "Stare at them.", "Walk away."], "Including everyone is kind.", "👩‍🦽"],
    ["Someone speaks with an accent.", "Listen and be friendly.", ["Copy their accent to tease.", "Say “Talk normal.”", "Laugh."], "Accents just mean they speak more than one way.", "🗣️"],
    ["A friend celebrates a holiday you don't know.", "Ask them about it.", ["Say “That's not a real holiday.”", "Make fun of it.", "Ignore it."], "Asking shows respect and interest.", "🪔"],
    ["A classmate wears glasses for the first time.", "Say something kind, like “Cool glasses!”", ["Call them “four eyes.”", "Laugh.", "Grab their glasses."], "Kind words help people feel confident.", "👓"],
    ["Someone believes something different than you.", "Listen respectfully, even if you disagree.", ["Tell them they're stupid.", "Yell at them.", "Stop being their friend."], "You can disagree and still be kind.", "💬"],
    ["A kid learns in a different way and needs more time.", "Be patient and helpful.", ["Call them slow.", "Rush them.", "Laugh at mistakes."], "Everyone learns in their own way.", "📘"],
    ["Your friend's family looks different from yours.", "Know that families come in many kinds.", ["Say their family is wrong.", "Ask rude questions to tease.", "Tell others it's weird."], "All kinds of families are families.", "👨‍👩‍👧"],
  ],
  J: [["Asking a new friend about their culture.", 0], ["Making fun of how someone talks.", 1], ["Trying a new food a friend shares.", 0], ["Saying “You can't play because you're different.”", 1], ["Learning to say hello in another language.", 0], ["Staring and pointing at someone.", 1], ["Including a kid who uses a wheelchair.", 0], ["Laughing at someone's clothes.", 1], ["Respecting different holidays.", 0], ["Calling someone a name because of how they look.", 1]],
});

mannersTopic(8, {
  id: "secrets", title: "Surprises vs. Secrets", icon: "🤫", blurb: "Which secrets to keep and which to tell.", labels: "tell",
  jq: "Should you tell a grown-up, or is this okay to keep?",
  trick: "A surprise is happy and ends soon, like a birthday gift. A secret that makes you feel worried, scared, or unsafe should always be told to a trusted grown-up.",
  lesson: [
    L3("Surprises are fun", "A surprise is something happy that everyone will find out about soon, like a birthday present or a party.", row(bigEmo("🎁"), bigEmo("🎉")) + note("Surprises are <b>okay to keep</b>.")),
    L3("Some secrets need telling", "If a secret makes you feel worried, scared, or confused, or someone says “Don't tell anyone,” tell a trusted grown-up. You will not be in trouble.", `<div class="stop-ask"><span class="emo xxl">🗣️</span><b>TELL</b><span>a trusted grown-up</span></div>`),
    L3("Your trusted grown-ups", "Think of five grown-ups you trust, like a parent, grandparent, teacher, or school counselor. You can always tell them anything.", `<div class="hand-five">${["👩 Mom", "👨 Dad", "👵 Grandma", "🧑‍🏫 Teacher", "🧑‍⚕️ Counselor"].map(x => `<span>${x}</span>`).join("")}</div>`),
  ],
  S: [
    ["Dad is planning a surprise party for Mom.", "Keep it a happy surprise.", ["Tell Mom right away.", "Tell everyone at school.", "Get upset about it."], "Surprises are happy and end soon.", "🎉"],
    ["An older kid says, “If you tell anyone what I did, you'll be in trouble.”", "Tell a trusted grown-up.", ["Keep it secret forever.", "Do what they say.", "Feel bad alone."], "Being told to keep secrets from grown-ups is a sign to tell.", "😟"],
    ["Someone gives you a gift and says, “Don't tell your parents.”", "Tell your parents.", ["Hide the gift.", "Keep the secret.", "Ask for more gifts."], "Safe people don't ask kids to hide things from parents.", "🎁"],
    ["Your friend tells you they're being hurt at home.", "Tell a trusted grown-up, like a teacher or counselor.", ["Keep it secret.", "Tell other kids.", "Try to fix it yourself."], "A grown-up can get your friend help.", "🧑‍🏫"],
    ["You're making a card for Grandma's birthday.", "Keep it a surprise until her birthday.", ["Show her right away.", "Tell her it's a secret forever.", "Throw it away."], "That's a fun surprise!", "💌"],
    ["Someone touches you in a way that feels wrong and says it's a secret.", "Say no, get away, and tell a trusted grown-up. It's never your fault.", ["Keep the secret.", "Think it's your fault.", "Say nothing ever."], "Your body belongs to you. Always tell.", "🛑"],
    ["A secret is making your tummy feel worried.", "Talk to a grown-up you trust.", ["Keep worrying alone.", "Pretend it's fine.", "Tell nobody ever."], "Worried feelings are a sign to tell.", "😣"],
    ["Your sister is hiding her brother's present until his party.", "Help keep the surprise.", ["Tell him where it is.", "Unwrap it.", "Tell your teacher."], "Gift surprises are okay to keep.", "🎂"],
  ],
  J: [["A birthday present for Dad", 1], ["Someone says “Don't tell your parents we talked.”", 0], ["A surprise party for your teacher", 1], ["A friend is being hurt", 0], ["Someone asked you to keep a touching secret", 0, "Always tell. Your body belongs to you, and it's never your fault."], ["What you're giving Mom for Mother's Day", 1], ["An older kid is making you scared", 0], ["A secret that makes you feel sick inside", 0], ["A fun scavenger hunt you're planning for your brother", 1], ["Someone online asked you to send a photo", 0]],
});

/* ============================== AGE 9 ============================== */
mannersTopic(9, {
  id: "bigfeelings", title: "Handling Big Feelings", icon: "🌊", blurb: "Frustration, disappointment, worry and more.", labels: "good",
  trick: "Name it to tame it: say the feeling, pick a coping tool, then make a plan.",
  lesson: [
    L3("Name it to tame it", "When you name your feeling, your brain starts to calm down. Say, I feel frustrated, or I feel disappointed.", `<div class="chips">${["frustrated 😤", "disappointed 😞", "nervous 😬", "jealous 😒", "overwhelmed 😵"].map(w => chip(w, w.split(" ")[0], "lg")).join("")}</div>`),
    L3("Coping tools", "Pick a coping tool that helps you: deep breathing, a walk, drawing, talking to someone, or writing in a journal.", pics(["🌬️", "Breathe"], ["🚶", "Walk"], ["✏️", "Write or draw"], ["🗣️", "Talk it out"])),
    L3("Make a plan", "After you calm down, make a plan. Feeling nervous about a test? Plan to practice a little each day.", `<ol class="steps"><li>Name it</li><li>Calm it</li><li>Plan it</li></ol>`),
  ],
  S: [
    ["You worked hard on a project, but you didn't win the prize.", "Feel disappointed, then remember what you learned.", ["Say the winner cheated.", "Rip up your project.", "Quit forever."], "Disappointment is normal. Learning is the real win.", "🏆"],
    ["You feel nervous before a spelling test.", "Take deep breaths and remember you practiced.", ["Pretend to be sick.", "Panic and give up.", "Copy someone's answers."], "Breathing and confidence help with nerves.", "📝"],
    ["Your friend gets a new bike and you feel jealous.", "Notice the feeling, then say “Cool bike!”", ["Say their bike is ugly.", "Ignore them.", "Wreck the bike."], "You can feel jealous and still be kind.", "🚲"],
    ["You have too much homework and feel overwhelmed.", "Break it into small parts and do one at a time.", ["Do nothing.", "Cry and give up.", "Rip it up."], "Small steps make big jobs easier.", "📚"],
    ["You keep missing the basketball hoop and feel frustrated.", "Take a break, then try again with a new plan.", ["Throw the ball at someone.", "Quit the team.", "Kick the hoop."], "Breaks and practice beat frustration.", "🏀"],
    ["Your best friend is playing with someone else today.", "Remember friends can have more than one friend, and play with others too.", ["Never talk to them again.", "Say mean things about the new kid.", "Sulk all day."], "Friendships can grow, not shrink.", "👫"],
    ["You feel sad and don't know why.", "Talk to a grown-up you trust.", ["Keep it inside forever.", "Be mean to others.", "Hide in your room for days."], "Talking helps, even when you don't know why you feel that way.", "😔"],
    ["You made a mistake in front of the class.", "Laugh it off or say “Oops,” and keep going.", ["Run out of class.", "Never raise your hand again.", "Blame someone else."], "Everyone makes mistakes. That's how we learn.", "🙈"],
  ],
  J: [["Writing about your feelings in a journal.", 0], ["Taking out anger on a younger sibling.", 1], ["Saying “I feel frustrated” out loud.", 0], ["Bottling up feelings until you explode.", 1], ["Going for a walk to calm down.", 0], ["Breaking things when you're upset.", 1], ["Making a plan for something that worries you.", 0], ["Saying you don't care when you really do.", 1], ["Asking a friend if they want to talk.", 0], ["Ignoring a friend who is clearly upset.", 1]],
});

mannersTopic(9, {
  id: "conflict", title: "Solving Conflicts", icon: "🕊️", blurb: "Use I-statements and find a fair solution.", labels: "good",
  trick: "Calm down, use an I-statement (I feel… when… I need…), listen to the other side, then find a solution you both agree on.",
  lesson: [
    L3("Calm first", "When you disagree, calm down first. It's hard to solve a problem when you're very upset.", bigEmo("🧘")),
    L3("I-statements", "Use an I-statement instead of blaming. Say: I feel upset when you take my things. I need you to ask first.", `<div class="sentence big-sentence">“I feel <b class="hl">upset</b> when <b class="hl">you take my pencil</b>. I need <b class="hl">you to ask first</b>.”</div>` + note("Not: “You always ruin everything!”")),
    L3("Find a win-win", "Listen to the other person, then find a fair solution: take turns, share, compromise, or ask a grown-up.", pics(["🔁", "Take turns"], ["🤝", "Share"], ["⚖️", "Compromise"], ["🧑‍🏫", "Ask for help"])),
  ],
  S: [
    ["You and your friend both want to be team captain.", "Take turns being captain each game.", ["Argue until recess ends.", "Quit the game.", "Push them out of the way."], "Taking turns is a fair win-win.", "⚽"],
    ["Your sister keeps taking your stuff.", "Say “I feel frustrated when you take my things. Please ask first.”", ["Say “You're the worst!”", "Take her stuff to get even.", "Hide all her things."], "I-statements explain your feelings without blaming.", "🎒"],
    ["You and a friend disagree on which movie to watch.", "Compromise: one now, the other next time.", ["Refuse to watch anything.", "Grab the remote.", "Say their choice is stupid."], "A compromise means both people give a little.", "🎬"],
    ["Your partner on a project isn't doing their share.", "Talk calmly about splitting the jobs, and ask the teacher if needed.", ["Do it all and complain.", "Tell everyone they're lazy.", "Do nothing too."], "Calm talking and help from a grown-up can solve it.", "📊"],
    ["A friend says you were unfair in a game.", "Listen to their side before answering.", ["Say “No I wasn't!” and walk away.", "Yell at them.", "Laugh."], "Listening is the first step to solving it.", "👂"],
    ["Two friends are arguing and ask you to pick a side.", "Help them listen to each other instead.", ["Pick your favorite friend.", "Spread what they said.", "Make it worse."], "Helping them talk is better than taking sides.", "🕊️"],
    ["You're very angry at your friend right now.", "Take a break and talk when you're calm.", ["Say something mean right away.", "Text something rude.", "Hit something."], "Calm first, then talk.", "😤"],
    ["You can't solve a problem with a classmate on your own.", "Ask a teacher to help you both talk it out.", ["Fight about it.", "Hold a grudge forever.", "Get your friends to gang up."], "Asking for help is a smart choice.", "🧑‍🏫"],
  ],
  J: [["“I feel left out when you don't save me a seat.”", 0], ["“You're so annoying!”", 1], ["Listening to the other side.", 0], ["Name-calling during an argument.", 1], ["Agreeing to take turns.", 0], ["Giving someone the silent treatment for days.", 1], ["Asking a grown-up to help you talk it out.", 0], ["Getting friends to gang up on someone.", 1], ["Taking a break to calm down.", 0], ["Bringing up old problems to win the argument.", 1]],
});

mannersTopic(9, {
  id: "peerpressure", title: "Saying No to Pressure", icon: "✋", blurb: "Make your own good choices.", labels: "good",
  trick: "If it's unsafe, unkind, or against the rules, say no with a strong voice, suggest something else, or walk away.",
  lesson: [
    L3("What is peer pressure?", "Peer pressure is when friends try to get you to do something. It can be good, like trying a new sport. Or bad, like breaking rules.", table([["Good pressure 👍", "Join the reading club!"], ["Bad pressure 👎", "Let's take candy without paying."]], ["", "Example"])),
    L3("Ways to say no", "You can say: No thanks. That's not my thing. Or: I don't want to get in trouble. Or suggest something better.", `<div class="chips">${["“No thanks.” 🙅", "“Not my thing.” 🤷", "“Let's do something else.” 🎲", "“I'm out.” 🚶"].map(w => `<span class="chip lg">${w}</span>`).join("")}</div>`),
    L3("Real friends respect you", "A real friend won't keep pushing after you say no. You can always walk away and tell a grown-up.", bigEmo("🤝")),
  ],
  S: [
    ["Friends dare you to climb onto the school roof.", "Say “No way, that's dangerous,” and suggest another game.", ["Do it to look cool.", "Climb halfway.", "Dare someone else instead."], "Saying no to dangerous dares is smart.", "🏫"],
    ["A friend wants you to copy their homework answers.", "Say “No thanks, I'll do my own.”", ["Copy it.", "Copy just a little.", "Sell the answers."], "Doing your own work is honest.", "📝"],
    ["Kids are making fun of someone and want you to join.", "Say “That's not cool,” and walk away.", ["Join in so you fit in.", "Laugh quietly.", "Film it."], "You can choose kindness even when others don't.", "🗯️"],
    ["A friend says, “Let's take candy from the store without paying.”", "Say no and leave.", ["Take just one.", "Be the lookout.", "Take it and pay later."], "Taking without paying is stealing.", "🍬"],
    ["Someone offers you a vape or cigarette.", "Say “No” and tell a trusted grown-up.", ["Try it once.", "Keep it secret.", "Take it for later."], "These are harmful to your body.", "🚭"],
    ["Your friends want to watch a scary movie your parents said no to.", "Say “My parents said no. Let's watch something else.”", ["Watch it secretly.", "Lie to your parents.", "Watch and pretend you didn't."], "Following family rules builds trust.", "🎬"],
    ["A friend keeps pushing after you said no.", "Walk away and hang out with other friends.", ["Give in.", "Argue for an hour.", "Do it to make them stop."], "Real friends respect your no.", "🚶"],
    ["Your team is going to the library to study.", "Go along, it's a good kind of pressure!", ["Refuse just because.", "Make fun of them.", "Hide."], "Some peer pressure is positive.", "📚"],
  ],
  J: [["Saying “No thanks” to a dangerous dare.", 0], ["Doing something wrong to fit in.", 1], ["Walking away from a bad situation.", 0], ["Lying to your parents because friends said to.", 1], ["Joining friends in a fun, safe activity.", 0], ["Being mean to someone so others like you.", 1], ["Suggesting a better idea.", 0], ["Keeping a dangerous plan secret.", 1], ["Telling a grown-up when you feel pressured.", 0], ["Copying answers because everyone else is.", 1]],
});

mannersTopic(9, {
  id: "honesty", title: "Honesty & Responsibility", icon: "⚖️", blurb: "Tell the truth and own your choices.", labels: "good",
  trick: "Tell the truth, even when it's hard. Own your mistakes, fix what you can, and keep your promises.",
  lesson: [
    L3("Honesty builds trust", "When you tell the truth, people trust you. Trust is like glass: easy to break, hard to fix.", bigEmo("🪟")),
    L3("Own your mistakes", "Being responsible means saying, “I did it,” and helping fix it. Everyone makes mistakes!", `<div class="sentence big-sentence">“I broke the vase. I'm sorry. How can I help fix it?” 🏺</div>`),
    L3("Keep your word", "Responsible people keep their promises, finish their jobs, and take care of their things.", pics(["🤞", "Keep promises"], ["✅", "Finish jobs"], ["🎒", "Care for your things"])),
  ],
  S: [
    ["You broke a dish while your parents were out.", "Tell them what happened and say sorry.", ["Hide the pieces.", "Blame the cat.", "Say nothing and hope they don't notice."], "Telling the truth builds trust.", "🍽️"],
    ["The cashier gave you too much change.", "Give the extra money back.", ["Keep it quietly.", "Spend it on candy.", "Brag to friends."], "Honesty means returning what isn't yours.", "💵"],
    ["You forgot to do your homework.", "Tell your teacher the truth and make a plan to finish it.", ["Say your dog ate it.", "Copy a friend's.", "Pretend you're sick."], "Owning it and fixing it is responsible.", "📓"],
    ["You promised to help your friend after school, but something fun comes up.", "Keep your promise, or talk to your friend honestly first.", ["Just don't show up.", "Lie about being sick.", "Ignore their messages."], "Keeping your word shows you're reliable.", "🤞"],
    ["You find a wallet on the playground.", "Give it to a teacher or the office.", ["Keep the money.", "Throw it away.", "Hide it in your desk."], "Returning lost things is honest.", "👛"],
    ["You won a game but you know you broke a rule.", "Admit it and replay fairly.", ["Keep the win.", "Hope nobody noticed.", "Blame the rules."], "Honesty matters more than winning.", "🎲"],
    ["Your library book is damaged because you left it in the rain.", "Tell the librarian and offer to help replace it.", ["Return it and run.", "Hide it forever.", "Say it was already wet."], "Taking responsibility shows maturity.", "📚"],
    ["Your friend asks if you like their gift, but you don't love it.", "Thank them for thinking of you.", ["Say “It's ugly.”", "Throw it away in front of them.", "Ignore them."], "You can be honest and kind: thank them for the thought.", "🎁"],
  ],
  J: [["Admitting you made a mistake.", 0], ["Blaming your sibling for something you did.", 1], ["Returning extra change.", 0], ["Copying someone's work and saying it's yours.", 1], ["Keeping a promise.", 0], ["Lying to get out of chores.", 1], ["Telling a teacher you found a lost phone.", 0], ["Breaking something and hiding it.", 1], ["Finishing your chores without being reminded.", 0], ["Saying you did your homework when you didn't.", 1]],
});

mannersTopic(9, {
  id: "digital", title: "Digital Citizenship", icon: "🌐", blurb: "Be kind, safe and smart online.", labels: "good",
  trick: "Before you post: T.H.I.N.K. Is it True, Helpful, Inspiring, Necessary, Kind? And never share private info.",
  lesson: [
    L3("Think before you post", "Things online can last forever and spread fast. Before you post, THINK: is it true, helpful, inspiring, necessary, and kind?", `<div class="think">${["T True", "H Helpful", "I Inspiring", "N Necessary", "K Kind"].map(w => `<span><b>${w[0]}</b>${w.slice(1)}</span>`).join("")}</div>`),
    L3("Strong passwords", "Use strong passwords and never share them, except with your parents. A strong password is long and hard to guess.", table([["dog123", "weak 👎"], ["PurpleTiger!Jumps42", "strong 💪"]], ["Password", "Strength"])),
    L3("Screen balance", "Too much screen time isn't healthy. Take breaks, play outside, and stop screens before bed.", pics(["⏰", "Set a timer"], ["🌳", "Play outside"], ["🛏️", "No screens before bed"])),
  ],
  S: [
    ["You want to post a funny photo of your friend.", "Ask your friend first if it's okay.", ["Post it without asking.", "Post it with a mean caption.", "Send it to the whole class."], "Always ask before posting someone's photo.", "📸"],
    ["You're creating a password.", "Use a long, hard-to-guess password.", ["Use your name.", "Use 12345.", "Use your birthday."], "Strong passwords keep your accounts safe.", "🔐"],
    ["You read something online that seems unbelievable.", "Check it with a trusted source or grown-up.", ["Share it right away.", "Believe everything you read.", "Send it to everyone."], "Not everything online is true.", "🔍"],
    ["Someone sends you a mean message.", "Don't reply. Save it, block them, and tell a grown-up.", ["Reply with something meaner.", "Share it with everyone.", "Keep it secret."], "Grown-ups can help you report and block.", "💬"],
    ["You've been playing a game for two hours.", "Take a break and do something active.", ["Play all night.", "Skip dinner to keep playing.", "Hide the tablet in bed."], "Screen breaks keep your body and brain healthy.", "🎮"],
    ["A website asks for your full name and address to enter a contest.", "Ask a parent before typing anything.", ["Type it all in.", "Use your friend's info.", "Enter your parent's card."], "Grown-ups help decide what's safe to share.", "📝"],
    ["You see classmates leaving mean comments on someone's post.", "Post something kind, or tell a grown-up.", ["Add a mean comment.", "Like the mean comments.", "Screenshot and share."], "Being an upstander works online too.", "🦸"],
    ["You want to use a picture you found online for a school project.", "Check if you're allowed to use it, and say where it came from.", ["Say you drew it.", "Copy it and hide the source.", "Take anything you want."], "Giving credit is honest.", "🖼️"],
  ],
  J: [["Asking before posting a friend's photo.", 0], ["Sharing your password with a classmate.", 1], ["Checking facts before sharing.", 0], ["Posting a mean comment.", 1], ["Taking screen breaks.", 0], ["Pretending to be someone else online to trick people.", 1], ["Telling a grown-up about a scary message.", 0], ["Clicking every pop-up ad.", 1], ["Giving credit for pictures you use.", 0], ["Using a phone in bed late at night.", 1]],
});

mannersTopic(9, {
  id: "bodysafety", title: "My Body, My Safety", icon: "🛡️", blurb: "Body boundaries and trusted grown-ups.", labels: "good",
  trick: "Your body belongs to you. If something feels wrong: say no, get away, and tell a trusted grown-up. It is never your fault.",
  lesson: [
    L3("Your body belongs to you", "Your body belongs to you. You can say no to hugs or touches you don't want, even from people you know.", `<div class="sentence big-sentence">“No thanks, can we high-five instead?” ✋</div>`),
    L3("Private parts", "Private parts are the parts covered by a swimsuit. Nobody should touch them or ask you to touch theirs, except for health reasons with a parent there, like at the doctor.", note("Covered by a swimsuit = <b>private</b> 🩱")),
    L3("Say no, get away, tell", "If anyone makes you feel uncomfortable: say no, get away, and tell a trusted grown-up. Keep telling until someone helps. It's never your fault.", `<div class="chips"><span class="chip xl">🙅 No</span><span class="chip xl">🏃 Go</span><span class="chip xl">🗣️ Tell</span></div>`),
  ],
  S: [
    ["A relative wants a hug, but you don't feel like it.", "Say “No thanks,” and offer a high-five or wave.", ["Hug even though you don't want to.", "Run and hide.", "Get angry."], "You get to choose how you greet people.", "🤗"],
    ["Someone asks you to keep a secret about touching.", "Say no, get away, and tell a trusted grown-up.", ["Keep the secret.", "Think it's your fault.", "Wait and see."], "Touching secrets should always be told. It's never your fault.", "🛑"],
    ["You told a grown-up something important, but they didn't help.", "Keep telling other trusted grown-ups until someone helps.", ["Give up.", "Never tell anyone again.", "Think it doesn't matter."], "Keep telling until someone helps you.", "🗣️"],
    ["Your friend wrestles too rough and you want to stop.", "Say “Stop, I don't like that,” in a strong voice.", ["Keep going even though it hurts.", "Hit them hard.", "Say nothing."], "Clear words help others respect your body.", "✋"],
    ["Someone shows you pictures that make you uncomfortable.", "Leave and tell a trusted grown-up.", ["Keep looking.", "Show your friends.", "Keep it secret."], "Telling a grown-up keeps you safe.", "📵"],
    ["A friend says, “Stop tickling me!”", "Stop right away.", ["Keep tickling.", "Tickle harder.", "Laugh and keep going."], "When someone says stop, we stop.", "🫵"],
    ["You feel confused about something a grown-up did.", "Talk to a parent, teacher or counselor about it.", ["Hide the feeling.", "Pretend it didn't happen.", "Tell nobody."], "Confused feelings are a sign to talk to someone you trust.", "😕"],
    ["The doctor needs to check you while your parent is there.", "That's okay. Doctors check for health reasons with a parent there.", ["Run away.", "Scream.", "Keep it a secret."], "Doctor visits with a parent are okay.", "🧑‍⚕️"],
  ],
  J: [["Saying “No thanks” to a hug you don't want.", 0], ["Keeping a secret about touching.", 1, "Always tell a trusted grown-up. It is never your fault."], ["Telling a trusted grown-up when something feels wrong.", 0], ["Ignoring someone who says “Stop.”", 1], ["Choosing a high-five instead of a hug.", 0], ["Thinking it's your fault if someone touches you wrongly.", 1, "It is never a kid's fault."], ["Knowing five trusted grown-ups.", 0], ["Giving up if the first grown-up doesn't help.", 1], ["Respecting a friend's personal space.", 0], ["Tickling someone after they say stop.", 1]],
});

mannersTopic(9, {
  id: "empathy", title: "Empathy", icon: "💞", blurb: "Understand how others feel.", labels: "kind",
  trick: "Walk in their shoes: How would I feel if this happened to me? What would help me? Then do that.",
  lesson: [
    L3("What is empathy?", "Empathy means understanding how someone else feels, like walking in their shoes.", row(`<span class="emo xxl">👟</span>`, `<span class="sym">→</span>`, `<span class="emo xxl">💞</span>`)),
    L3("Notice the clues", "Look for clues: faces, voices, and what happened. A friend with their head down after a game might feel sad.", pics(["😞", "Face"], ["🗣️", "Voice"], ["📖", "What happened"])),
    L3("Show you care", "Ask, “Are you okay?” Listen without fixing. Do something kind, like sitting with them.", `<div class="sentence big-sentence">“That sounds hard. I'm here for you.” 💛</div>`),
  ],
  S: [
    ["Your friend's pet died.", "Say “I'm so sorry. Do you want to talk about it?”", ["Say “It was just a pet.”", "Change the subject to your new toy.", "Laugh."], "Showing you care helps a grieving friend.", "🐾"],
    ["A classmate is nervous about reading out loud.", "Smile and say “You can do it!”", ["Laugh when they mess up.", "Groan loudly.", "Whisper jokes."], "Encouragement helps nervous people feel safer.", "📖"],
    ["Your friend didn't make the team but you did.", "Be kind and don't brag.", ["Show off your jersey.", "Say “Too bad for you.”", "Ignore them."], "Thinking about their feelings is empathy.", "🎽"],
    ["A new student looks lost on the first day.", "Show them around and introduce yourself.", ["Walk past.", "Laugh at them.", "Tell them they're in the wrong place and leave."], "Remember how it feels to be new.", "🏫"],
    ["Your little brother is scared of the dark.", "Leave a night-light on and tell him you're nearby.", ["Tell him he's a baby.", "Turn off all the lights.", "Scare him more."], "Taking fears seriously is caring.", "🌙"],
    ["Your friend is upset and just wants to vent.", "Listen without interrupting.", ["Tell them they're overreacting.", "Talk about yourself.", "Play on your phone."], "Sometimes people just need to be heard.", "👂"],
    ["Someone's family can't afford the class trip.", "Be kind and don't make a big deal of it.", ["Ask why in front of everyone.", "Tease them.", "Brag about your trip."], "Respecting others' situations is empathy.", "🚌"],
    ["Mom looks really tired after work.", "Offer to help with dinner or give her a hug.", ["Ask for a ride right away.", "Complain about dinner.", "Make a big mess."], "Noticing and helping shows empathy.", "👩"],
  ],
  J: [["Asking a sad friend, “Are you okay?”", 0], ["Saying “Get over it.”", 1], ["Listening without interrupting.", 0], ["Laughing at someone who is hurt.", 1], ["Imagining how someone else feels.", 0], ["Bragging when a friend lost.", 1], ["Sitting with someone who is lonely.", 0], ["Changing the subject when a friend shares bad news.", 1], ["Making a card for a sick classmate.", 0], ["Ignoring a friend who is crying.", 1]],
});

mannersTopic(9, {
  id: "respect", title: "Gratitude & Respect", icon: "🙏", blurb: "Show thanks and respect to others.", labels: "polite",
  trick: "Notice what others do for you and say thank you. Treat people, things, and places the way you'd want yours treated.",
  lesson: [
    L3("Gratitude", "Gratitude means noticing the good things and the people who help you, and saying thank you.", `<div class="sentence big-sentence">“Thank you for driving me to practice!” 🚗</div>`),
    L3("Showing respect", "Respect means treating people kindly, listening to them, and taking care of their things and our shared spaces.", pics(["👂", "Listen"], ["🤝", "Be kind"], ["🧹", "Care for spaces"], ["📏", "Follow rules"])),
    L3("Thank-you notes", "A thank-you note says what they did and how it made you feel. Dear Grandma, thank you for the book. I loved the dragon part!", passage("Dear Grandma,<br>Thank you for the dragon book! I read it in two days and loved the ending.<br>Love, Kai")),
  ],
  S: [
    ["Your aunt sends you a birthday gift.", "Write or call to say thank you.", ["Say nothing.", "Complain it's the wrong color.", "Ask for money instead."], "Thank-you notes show gratitude.", "💌"],
    ["Your coach stays late to help you practice.", "Say “Thanks for helping me, Coach!”", ["Leave without a word.", "Complain about practice.", "Roll your eyes."], "Thanking people for their time shows respect.", "⚽"],
    ["An older neighbor is talking to you.", "Listen politely and answer kindly.", ["Walk away mid-sentence.", "Look at your phone.", "Say “Whatever.”"], "Respecting elders is good manners.", "👵"],
    ["You borrow your friend's book.", "Take good care of it and return it.", ["Write in it.", "Lose it.", "Keep it forever."], "Respecting others' things builds trust.", "📘"],
    ["The school custodian is cleaning the hallway.", "Say “Thank you for keeping our school clean!”", ["Drop trash on the floor.", "Walk through the wet floor on purpose.", "Ignore them."], "Every helper deserves respect and thanks.", "🧹"],
    ["Your teacher is giving instructions.", "Listen and follow them.", ["Talk to your friends.", "Do the opposite.", "Make jokes."], "Listening shows respect.", "🧑‍🏫"],
    ["At dinner, you don't love the meal.", "Say “Thank you for making dinner.”", ["Say “This is gross.”", "Refuse to sit at the table.", "Feed it to the dog."], "Thanking the cook shows gratitude.", "🍲"],
    ["You're visiting a friend's house with different rules.", "Follow their family's rules.", ["Do what you do at home.", "Say their rules are dumb.", "Ignore the grown-ups."], "Respecting other homes' rules is polite.", "🏡"],
  ],
  J: [["Writing a thank-you note.", 0], ["Ignoring someone who says hello.", 1], ["Taking care of borrowed things.", 0], ["Talking back rudely to a teacher.", 1], ["Thanking the bus driver.", 0], ["Leaving a mess at a friend's house.", 1], ["Listening when an elder speaks.", 0], ["Saying “That's a dumb gift.”", 1], ["Holding the door for someone carrying bags.", 0], ["Writing on school desks.", 1]],
});

/* hook manners tricks into the shared trick table */
for (const a of [6, 7, 8, 9]) TRICKS[a].manners = MANNER_TRICKS[a];

