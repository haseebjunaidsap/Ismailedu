/* =====================================================================
   Behavior topics (v11) — added to the "Manners & Behavior" subject
   ===================================================================== */

/* ============================== AGE 6 ============================== */
mannersTopic(6, {
  id: "directions", title: "Following Directions", icon: "👂", blurb: "Listen, remember, and do it the first time.", labels: "good",
  trick: "Stop what you're doing, look at the person, listen to the whole direction, then say “Okay!” and do it right away.",
  lesson: [
    L3("Stop, look, listen", "When a grown-up gives a direction, stop what you are doing, look at them, and listen to the whole thing.", pics(["✋", "Stop"], ["👀", "Look"], ["👂", "Listen"])),
    L3("Do it the first time", "Say “Okay!” and do it right away, the first time you're asked. No need to be reminded again and again!", `<div class="sentence big-sentence">“Okay, Mom!” 👍</div>`),
    L3("Two-step directions", "Some directions have two steps: Put on your shoes, then get your backpack. Remember both steps, in order.", train(["1️⃣ 👟 shoes", "2️⃣ 🎒 backpack"])),
  ],
  S: [
    ["Your teacher says, “Line up at the door.”", "Stop playing and line up.", ["Keep playing.", "Run to the door and push.", "Hide under the table."], "Doing it right away is following directions.", "🚪"],
    ["Mom says, “Please put your toys away.”", "Say “Okay!” and start cleaning up.", ["Pretend you didn't hear.", "Say “Later.” and keep playing.", "Throw the toys in the closet."], "Listening the first time is a great habit.", "🧸"],
    ["Dad says, “Brush your teeth, then put on pajamas.”", "Brush teeth first, then put on pajamas.", ["Only put on pajamas.", "Jump on the bed.", "Do neither."], "Remember both steps, in order.", "🪥"],
    ["Your teacher is giving directions, but you're drawing.", "Put your crayon down and listen.", ["Keep drawing.", "Talk to a friend.", "Hum loudly."], "Stopping to listen helps you hear everything.", "🖍️"],
    ["You didn't hear what the coach said.", "Ask, “Can you say that again, please?”", ["Guess and do anything.", "Do nothing.", "Copy whatever others do wrong."], "It's smart to ask when you're not sure.", "⚽"],
    ["The teacher says, “Walk in the hallway.”", "Walk calmly.", ["Run to be first.", "Skip and spin.", "Crawl."], "Walking keeps everyone safe.", "🏫"],
    ["Grandma says it's time to wash hands for dinner.", "Go wash your hands right away.", ["Say “Five more minutes!” ten times.", "Wipe them on your pants.", "Ignore her."], "Doing it the first time is respectful.", "🧼"],
    ["The fire drill bell rings at school.", "Stop, line up quietly, and follow your teacher.", ["Grab your toys first.", "Hide in the bathroom.", "Run outside alone."], "Following directions in drills keeps you safe.", "🔔"],
  ],
  J: [["Doing what you're asked the first time.", 0], ["Pretending not to hear.", 1], ["Asking “Can you say that again?”", 0], ["Doing only half of the job.", 1], ["Looking at the person who is talking.", 0], ["Arguing every time you're asked to do something.", 1], ["Saying “Okay!” and starting right away.", 0], ["Running when the teacher said walk.", 1], ["Remembering two steps in order.", 0], ["Waiting to be told five times.", 1]],
});

mannersTopic(6, {
  id: "patience", title: "Waiting Patiently", icon: "⏳", blurb: "What to do while you wait.", labels: "good",
  trick: "Waiting is easier with a plan: count, sing a song in your head, or look for colors around you.",
  lesson: [
    L3("Waiting is hard", "Waiting can feel hard, like when you want a snack or a turn. But everyone has to wait sometimes.", bigEmo("⏳")),
    L3("Waiting tricks", "While you wait, you can count, sing a song in your head, look for things that are red, or take slow breaths.", pics(["🔢", "Count"], ["🎵", "Hum a song"], ["🔴", "Spot colors"], ["🌬️", "Breathe"])),
    L3("Calm body, calm voice", "Patient waiting means a calm body and calm voice. No whining, pushing, or asking “Is it time yet?” again and again.", doDont(["Stand calmly", "Use a waiting trick"], ["Whine", "Push or poke", "Ask over and over"])),
  ],
  S: [
    ["You're waiting in a long line at the store.", "Stand calmly and play “I spy.”", ["Whine loudly.", "Run around the store.", "Lie on the floor."], "A waiting game makes time go faster.", "🛒"],
    ["Dinner will be ready in 10 minutes and you're hungry.", "Wait, or ask nicely if you can help.", ["Eat cookies from the jar.", "Cry until it's ready.", "Bang on the table."], "Patience and helping make waiting easier.", "🍲"],
    ["Your friend is talking to the teacher and you need help.", "Wait for your turn.", ["Interrupt right away.", "Pull the teacher's arm.", "Shout your question."], "Waiting your turn shows respect.", "🧑‍🏫"],
    ["The car ride to Grandma's is long.", "Read, sing, or play a car game.", ["Kick the seat.", "Ask “Are we there yet?” every minute.", "Scream."], "Having something to do helps you wait.", "🚗"],
    ["You want to open your birthday present right now, but it's tomorrow.", "Wait until tomorrow.", ["Sneak and open it.", "Shake it until it breaks.", "Cry all night."], "Waiting makes surprises more special.", "🎁"],
    ["Mom is on an important phone call.", "Play quietly until she's done.", ["Yell for her.", "Climb on her.", "Turn on loud music."], "Quiet waiting is kind.", "📱"],
    ["The cookies are baking and smell yummy.", "Wait until they cool.", ["Grab one from the hot oven.", "Open the oven over and over.", "Touch the hot tray."], "Waiting keeps you safe from burns.", "🍪"],
    ["You're waiting for the bus.", "Stand back from the road and wait calmly.", ["Play tag near the street.", "Run into the road to look.", "Push friends."], "Calm waiting keeps everyone safe.", "🚌"],
  ],
  J: [["Counting quietly while you wait.", 0], ["Whining “I want it NOW!”", 1], ["Playing a waiting game.", 0], ["Pushing to the front.", 1], ["Taking slow breaths.", 0], ["Asking “Is it time yet?” over and over.", 1], ["Reading a book in the waiting room.", 0], ["Opening presents early in secret.", 1], ["Waiting for your turn to talk.", 0], ["Throwing a fit because you have to wait.", 1]],
});

/* ============================== AGE 7 ============================== */
mannersTopic(7, {
  id: "selfcontrol", title: "Self-Control", icon: "🛑", blurb: "Stop and think before you act.", labels: "good",
  trick: "Be a traffic light: Red = stop. Yellow = think about your choices. Green = go with the best one.",
  lesson: [
    L3("Stop and think", "Self-control means you're the boss of your body. You stop and think before you act.", `<div class="tlight"><span class="r"></span><span class="y"></span><span class="g"></span></div><div class="legend"><span>🔴 Stop</span><span>🟡 Think</span><span>🟢 Go</span></div>`),
    L3("Hands to yourself", "Keep your hands, feet and things to yourself. Even when you're excited or upset.", doDont(["Keep hands in your lap", "Use words", "Take space if you need it"], ["Poke or push", "Grab", "Kick"])),
    L3("Wait before you blurt", "Self-control also means waiting to talk, waiting your turn, and not grabbing the first cookie.", bigEmo("🤐")),
  ],
  S: [
    ["You really want to shout out the answer in class.", "Raise your hand and wait.", ["Shout it out.", "Jump on your chair.", "Whisper it loudly to everyone."], "Waiting shows self-control.", "🙋"],
    ["Your friend has a cool new toy you want to touch.", "Ask, “Can I see it?”", ["Grab it.", "Snatch it and run.", "Push them to get it."], "Asking first is self-control.", "🧸"],
    ["Someone bumps you in line by accident.", "Take a breath and say “It's okay.”", ["Push them back.", "Yell at them.", "Kick them."], "Stopping to think stops a fight.", "🧍"],
    ["There's a plate of cookies and Mom said one each.", "Take just one.", ["Take three when nobody's looking.", "Lick them all.", "Hide some in your pocket."], "Following the rule when nobody's watching is self-control.", "🍪"],
    ["You feel super silly during quiet reading time.", "Take a deep breath and focus on your book.", ["Make funny noises.", "Tickle your neighbor.", "Run around the room."], "You can save the silliness for later.", "📖"],
    ["Your sister says something that makes you mad.", "Stop, breathe, then use your words.", ["Hit her.", "Break her toy.", "Scream at her."], "Stopping and breathing helps you choose your words.", "😠"],
    ["You're excited to go outside for recess.", "Walk to the door with your class.", ["Run and push to be first.", "Shove people.", "Climb over desks."], "Excited bodies still need to be safe.", "🏃"],
    ["A friend tells you a secret surprise for the teacher.", "Keep the surprise until the right time.", ["Blurt it out.", "Tell the teacher right away.", "Hint loudly."], "Holding in a happy surprise takes self-control.", "🎉"],
  ],
  J: [["Keeping your hands to yourself.", 0], ["Grabbing things without asking.", 1], ["Taking a breath before reacting.", 0], ["Hitting when you're upset.", 1], ["Waiting for your turn to talk.", 0], ["Blurting out answers all the time.", 1], ["Taking only your share.", 0], ["Eating the whole bag of candy at once.", 1], ["Walking calmly in line.", 0], ["Poking the person in front of you.", 1]],
});

mannersTopic(7, {
  id: "classroom", title: "Classroom Behavior", icon: "🏫", blurb: "How to be a great classmate and learner.", labels: "good",
  trick: "Be ready, be respectful, be safe: have your things, listen to the teacher, and keep your body safe.",
  lesson: [
    L3("Be ready", "A great learner is ready: pencil, book, and listening ears. Come to class on time.", pics(["✏️", "Supplies"], ["⏰", "On time"], ["👂", "Listening ears"])),
    L3("Be respectful", "Raise your hand, listen when others talk, and use kind words. Take care of school things.", pics(["🙋", "Raise hand"], ["👂", "Listen"], ["💬", "Kind words"], ["📚", "Care for books"])),
    L3("Be safe", "Walk inside, keep hands to yourself, and use scissors and supplies the right way.", doDont(["Walk", "Push in your chair", "Carry scissors point down"], ["Run in class", "Tip your chair", "Throw things"])),
  ],
  S: [
    ["You finish your work early.", "Check your work, then read quietly.", ["Talk to your friends loudly.", "Wander around the room.", "Distract others."], "Quiet work keeps others learning.", "📝"],
    ["Your classmate is presenting their project.", "Listen and clap at the end.", ["Talk to your neighbor.", "Make faces.", "Play with your pencil box."], "Being a good audience is respectful.", "🎤"],
    ["You need to sharpen your pencil while the teacher is talking.", "Wait until a good time, or use a backup pencil.", ["Sharpen it loudly right away.", "Throw it.", "Break it."], "Waiting for the right time is respectful.", "✏️"],
    ["You don't understand the directions.", "Raise your hand and ask.", ["Copy your neighbor.", "Give up.", "Do something else."], "Asking questions is how we learn.", "❓"],
    ["Group work time: your group is choosing a plan.", "Share your idea and listen to others.", ["Boss everyone.", "Refuse to help.", "Do it all yourself."], "Teamwork means everyone helps.", "👥"],
    ["You see a mess on the classroom floor.", "Help pick it up.", ["Step over it.", "Kick it.", "Say “Not mine!”"], "Good classmates help keep the room nice.", "🧹"],
    ["It's time to switch from art to math.", "Clean up and get your math things ready.", ["Keep painting.", "Complain loudly.", "Hide under your desk."], "Changing quickly helps the whole class.", "🎨"],
    ["A substitute teacher is in charge today.", "Follow the rules like you would with your teacher.", ["Act silly because it's a sub.", "Tell them wrong rules.", "Ignore them."], "Respect every teacher.", "🧑‍🏫"],
  ],
  J: [["Raising your hand to talk.", 0], ["Running in the classroom.", 1], ["Cleaning up your area.", 0], ["Throwing pencils.", 1], ["Listening to a classmate's presentation.", 0], ["Leaning back on two chair legs.", 1], ["Coming to class with your supplies.", 0], ["Writing on someone else's paper.", 1], ["Helping a classmate who is stuck.", 0], ["Talking while the teacher is talking.", 1]],
});

/* ============================== AGE 8 ============================== */
mannersTopic(8, {
  id: "choices", title: "Choices & Consequences", icon: "🔀", blurb: "Every choice leads to something.", labels: "good",
  trick: "Before you choose, ask: What could happen next? Is that what I want? If not, pick a different choice.",
  lesson: [
    L3("Choices lead somewhere", "Every choice has a consequence, what happens because of it. Good choices often lead to good results.", row(col(bigEmo("📚"), "study"), arrow(), col(bigEmo("😃"), "do well on test"))),
    L3("Think ahead", "Before you choose, think: what could happen next? Staying up late could make you tired tomorrow.", row(col(bigEmo("🌙"), "stay up late"), arrow(), col(bigEmo("😴"), "tired at school"))),
    L3("Make it right", "If you make a poor choice, own it, learn from it, and fix it if you can. Everyone makes mistakes.", `<ol class="steps"><li>Own it</li><li>Learn from it</li><li>Fix it</li></ol>`),
  ],
  S: [
    ["You have homework and want to play video games first.", "Do homework first, then play.", ["Play all night and skip homework.", "Copy a friend's homework.", "Tell the teacher the dog ate it."], "Homework first means you can relax later.", "🎮"],
    ["You left your bike out in the rain again.", "Put it away and remember next time.", ["Leave it again.", "Blame your brother.", "Say it doesn't matter."], "Learning from a consequence helps you choose better.", "🚲"],
    ["You're tempted to eat a whole bag of candy.", "Have a little and save the rest.", ["Eat it all now.", "Hide it and eat it at night.", "Eat it instead of dinner."], "Too much candy can give you a tummy ache.", "🍬"],
    ["You forgot your lunch because you rushed this morning.", "Pack your bag the night before from now on.", ["Take someone else's lunch.", "Blame your parents.", "Do the same thing tomorrow."], "Planning ahead avoids the same problem.", "🎒"],
    ["You didn't study and got a low score.", "Make a study plan for next time.", ["Say the test was unfair.", "Give up on the subject.", "Rip up the test."], "Learning from it is the smart choice.", "📝"],
    ["Your friend wants to skip practice to hang out.", "Go to practice, and hang out after.", ["Skip practice and lie to the coach.", "Skip every practice.", "Pretend to be sick."], "Keeping commitments matters.", "⚽"],
    ["You could stay up reading under the covers.", "Go to sleep and read more tomorrow.", ["Read until midnight.", "Play games on a tablet in bed.", "Sneak a flashlight every night."], "Sleep helps you feel good tomorrow.", "🌙"],
    ["You broke a rule at a friend's house.", "Tell the grown-up and say sorry.", ["Hide it.", "Blame your friend.", "Leave quickly."], "Owning it is how you make it right.", "🏠"],
  ],
  J: [["Doing homework before playing.", 0], ["Staying up very late on a school night.", 1], ["Putting your things away so you don't lose them.", 0], ["Skipping breakfast every day.", 1], ["Making a plan for a big project.", 0], ["Lying to avoid a consequence.", 1], ["Learning from a mistake.", 0], ["Repeating a mistake you know is wrong.", 1], ["Saving some of your allowance.", 0], ["Spending all your money on the first thing you see.", 1]],
});

mannersTopic(8, {
  id: "habits", title: "Healthy Habits", icon: "🌱", blurb: "Sleep, food, exercise and screen time.", labels: "good",
  trick: "A healthy day has: good sleep, colorful food, water, moving your body, and not too much screen time.",
  lesson: [
    L3("Habits are things you do every day", "A habit is something you do so often it becomes automatic, like brushing your teeth. Good habits help you grow strong.", bigEmo("🌱")),
    L3("Healthy building blocks", "Sleep about 10 hours, eat fruits and vegetables, drink water, and move your body for at least an hour each day.", pics(["😴", "Sleep"], ["🥦", "Healthy food"], ["💧", "Water"], ["🚴", "Move"])),
    L3("Screen balance", "Screens are fun, but too much can make you tired and grumpy. Take breaks and turn screens off an hour before bed.", doDont(["Play outside", "Read a book", "Screen breaks"], ["Screens all day", "Screens in bed", "Skip sleep for games"])),
  ],
  S: [
    ["You're thirsty after playing soccer.", "Drink water.", ["Drink three sodas.", "Ignore it.", "Eat candy instead."], "Water is best for your body.", "💧"],
    ["It's a sunny Saturday morning.", "Play outside for a while.", ["Watch TV all day.", "Stay in bed until dinner.", "Play games for 8 hours."], "Moving your body keeps you healthy.", "☀️"],
    ["It's bedtime but you want to keep playing.", "Go to bed so you get enough sleep.", ["Stay up until midnight.", "Play on a tablet under the covers.", "Drink soda to stay awake."], "Kids your age need lots of sleep.", "🛏️"],
    ["You're picking a snack.", "Choose fruit, veggies, or yogurt.", ["Eat a whole cake.", "Skip food and eat candy.", "Drink only energy drinks."], "Healthy snacks give lasting energy.", "🍎"],
    ["Your eyes feel tired from the tablet.", "Take a break and look far away.", ["Keep playing for hours.", "Move closer to the screen.", "Turn the brightness way up."], "Screen breaks rest your eyes.", "📱"],
    ["You wake up late and want to skip breakfast.", "Grab a quick healthy breakfast.", ["Skip it and eat candy at school.", "Eat nothing all morning.", "Drink soda."], "Breakfast fuels your brain for school.", "🥣"],
    ["You feel stressed about a test.", "Go for a walk or take deep breaths.", ["Eat junk food all night.", "Stay up worrying.", "Hide under the covers forever."], "Moving and breathing help with stress.", "🧘"],
    ["You played outside and are covered in dirt.", "Take a bath or shower.", ["Go straight to bed dirty.", "Wipe it on the couch.", "Ignore it for a week."], "Staying clean keeps germs away.", "🛁"],
  ],
  J: [["Getting a good night's sleep.", 0], ["Eating only candy for lunch.", 1], ["Drinking water every day.", 0], ["Playing video games all weekend without breaks.", 1], ["Riding your bike outside.", 0], ["Using a tablet in bed late at night.", 1], ["Eating fruits and vegetables.", 0], ["Skipping breakfast every day.", 1], ["Brushing your teeth twice a day.", 0], ["Drinking soda instead of water all day.", 1]],
});

/* ============================== AGE 9 ============================== */
mannersTopic(9, {
  id: "growth", title: "Growth Mindset", icon: "🧠", blurb: "Your brain grows when you try hard things.", labels: "good",
  trick: "Add the word “yet”: I can't do it… yet. Mistakes are how your brain grows.",
  lesson: [
    L3("Your brain can grow", "Your brain is like a muscle. When you practice hard things, it gets stronger!", row(bigEmo("🧠"), `<span class="sym">+</span>`, bigEmo("🏋️"))),
    L3("The power of yet", "Instead of saying “I can't do it,” say “I can't do it yet.” That tiny word means you're still learning.", table([["I can't do this.", "I can't do this <b>yet</b>."], ["I'm bad at math.", "I'm learning math."], ["I give up.", "I'll try a different way."]], ["Fixed mindset 😞", "Growth mindset 🌱"])),
    L3("Mistakes help you learn", "Mistakes show you what to practice. Every expert was once a beginner!", bigEmo("🌱")),
  ],
  S: [
    ["You can't ride your bike without training wheels yet.", "Keep practicing a little every day.", ["Say “I'll never learn.”", "Quit forever.", "Get mad at the bike."], "Practice helps your brain and body learn.", "🚲"],
    ["You got a low score on a spelling test.", "Look at which words you missed and practice them.", ["Say you're just bad at spelling.", "Hide the test.", "Blame the teacher."], "Mistakes show you what to practice.", "📝"],
    ["A math problem is really hard.", "Try a different strategy or ask for a hint.", ["Give up right away.", "Copy the answer.", "Say math is stupid."], "Trying new ways is a growth mindset.", "➗"],
    ["Your friend is better at drawing than you.", "Ask them for tips and keep practicing.", ["Stop drawing forever.", "Say their drawings are bad.", "Feel jealous and quit."], "Learning from others helps you grow.", "🎨"],
    ["You made a mistake while reading out loud.", "Fix it and keep going.", ["Stop reading and cry.", "Never read out loud again.", "Laugh at yourself meanly."], "Everyone makes mistakes. Keep going!", "📖"],
    ["Your coach gives you feedback on your kick.", "Say thanks and try what they suggested.", ["Get angry.", "Ignore it.", "Quit the team."], "Feedback helps you improve.", "⚽"],
    ["You're learning piano and it sounds bad at first.", "Practice a little each day.", ["Quit because it sounds bad.", "Say you have no talent.", "Bang the keys."], "Every expert started as a beginner.", "🎹"],
    ["You finally solved a puzzle after many tries.", "Feel proud of your hard work.", ["Say it was just luck.", "Think it doesn't count.", "Never try a puzzle again."], "Effort is something to be proud of.", "🧩"],
  ],
  J: [["Saying “I can't do it yet.”", 0], ["Saying “I'm just not smart.”", 1], ["Trying a new strategy.", 0], ["Giving up the first time it's hard.", 1], ["Learning from a mistake.", 0], ["Hiding your mistakes.", 1], ["Asking for feedback.", 0], ["Only doing easy things so you never fail.", 1], ["Practicing a little each day.", 0], ["Getting angry at feedback.", 1]],
});

mannersTopic(9, {
  id: "organized", title: "Getting Organized", icon: "🗂️", blurb: "Plan your time and keep track of your things.", labels: "good",
  trick: "Make a list, do the most important thing first, and give everything a home.",
  lesson: [
    L3("Make a list", "A to-do list helps you remember everything. Check things off as you finish them!", `<ol class="steps"><li>✅ Homework</li><li>✅ Pack backpack</li><li>⬜ Practice piano</li></ol>`),
    L3("First things first", "Do the most important things first. Homework, then fun. Big projects get broken into small steps.", train(["📚 homework", "🎒 pack bag", "🎮 play"])),
    L3("A home for everything", "Give your things a home, like a hook for your backpack or a folder for papers. Then you won't lose them.", pics(["🎒", "Backpack hook"], ["📁", "Homework folder"], ["👟", "Shoe spot"])),
  ],
  S: [
    ["You have a big project due in two weeks.", "Break it into small steps and do a little each day.", ["Wait until the night before.", "Forget about it.", "Ask a parent to do it."], "Small steps make big projects easy.", "📊"],
    ["You keep losing your homework papers.", "Use one folder just for homework.", ["Stuff them anywhere in your bag.", "Throw papers on the floor.", "Stop doing homework."], "A home for papers keeps them safe.", "📁"],
    ["It's school night and you have homework, chores, and want to play.", "Make a list: homework, chores, then play.", ["Play first, then forget the rest.", "Do none of it.", "Do everything at the same time."], "Doing important things first leaves time for fun.", "📝"],
    ["You can never find your shoes in the morning.", "Put them in the same spot every night.", ["Leave them wherever.", "Wear slippers to school.", "Blame your brother."], "A shoe spot saves time.", "👟"],
    ["Your desk is so messy you can't find a pencil.", "Take a few minutes to organize it.", ["Leave it messy forever.", "Borrow pencils every day.", "Push everything onto the floor."], "A tidy space helps you focus.", "🗃️"],
    ["You have a test on Friday.", "Study a little bit each night.", ["Study all night Thursday.", "Don't study.", "Hope for the best."], "Spreading out study time helps you remember.", "📅"],
    ["Your backpack is full of old papers and snacks.", "Clean it out once a week.", ["Never clean it.", "Add more stuff.", "Get a new backpack instead."], "Weekly clean-outs keep things organized.", "🎒"],
    ["You want to remember your friend's birthday.", "Write it on a calendar.", ["Hope you remember.", "Forget it.", "Ask them every day."], "Calendars help you remember important dates.", "🗓️"],
  ],
  J: [["Making a to-do list.", 0], ["Waiting until the last minute for a big project.", 1], ["Packing your backpack the night before.", 0], ["Leaving papers all over the floor.", 1], ["Using a calendar.", 0], ["Doing fun things first and forgetting homework.", 1], ["Giving your things a home.", 0], ["Never cleaning your backpack.", 1], ["Breaking a big task into small steps.", 0], ["Losing your library book every week.", 1]],
});

