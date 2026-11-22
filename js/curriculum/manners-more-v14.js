/* =====================================================================
   v14: two more Manners & Behavior topics per age
   ===================================================================== */
mannersTopic(6, {
  id: "careforthings", title: "Taking Care of Things", icon: "🧸", blurb: "Treat toys, books and school things gently.", labels: "good",
  trick: "Treat things the way you'd want your favorite toy treated: gently, and put back where it lives.",
  lesson: [
    L3("Things last longer with care", "When we take care of our things, they last a long time. Books stay nice, toys don't break, and crayons don't get lost.", pics(["📚", "Books"], ["🧸", "Toys"], ["🖍️", "Crayons"])),
    L3("Gentle hands", "Turn pages gently, put caps back on markers, and never throw or stomp on toys.", doDont(["Turn pages gently", "Put caps on markers", "Put toys back"], ["Throw toys", "Draw in books", "Leave things outside"])),
    L3("Other people's things", "Be extra careful with things that belong to other people or to school. Ask before you borrow, and give it back the same way.", bigEmo("🤲")),
  ],
  S: [
    ["You finish coloring with markers.", "Put the caps back on.", ["Leave them open to dry out.", "Throw them on the floor.", "Step on them."], "Caps keep markers from drying out.", "🖊️"],
    ["You're reading a library book.", "Turn the pages gently.", ["Rip a page out.", "Color in it.", "Leave it in the rain."], "Library books are for everyone to share.", "📚"],
    ["You're done playing with your bike.", "Put it away in the garage.", ["Leave it in the driveway.", "Throw it on the grass.", "Leave it in the rain."], "Putting it away keeps it safe.", "🚲"],
    ["Your friend lends you a toy.", "Play gently and give it back.", ["Break it.", "Keep it forever.", "Trade it away."], "Borrowed things should come back the same way.", "🧸"],
    ["Your shoes are muddy.", "Take them off at the door.", ["Walk all over the carpet.", "Wipe them on the couch.", "Kick mud on the wall."], "That keeps the house clean.", "👟"],
    ["You spill paint on the table.", "Wipe it up right away.", ["Leave it to dry.", "Spread it around.", "Hide it with paper."], "Cleaning spills quickly keeps things nice.", "🎨"],
    ["You want to play ball inside.", "Take it outside instead.", ["Throw it at the lamp.", "Kick it at the TV.", "Bounce it off the windows."], "Balls can break things inside.", "⚽"],
    ["A school crayon breaks.", "Tell the teacher and keep using the pieces.", ["Throw the box away.", "Snap all the others.", "Hide the pieces."], "Owning it and taking care is responsible.", "🖍️"],
  ],
  J: [["Putting toys back in the box.", 0], ["Drawing in a library book.", 1], ["Turning pages gently.", 0], ["Throwing your tablet when you're mad.", 1], ["Hanging up your backpack.", 0], ["Leaving your bike in the rain.", 1], ["Asking before borrowing.", 0], ["Stepping on someone's drawing.", 1], ["Wiping up a spill.", 0], ["Writing on the walls.", 1]],
});

mannersTopic(6, {
  id: "animals", title: "Kind to Animals", icon: "🐾", blurb: "How to treat pets and animals safely.", labels: "safe",
  trick: "Always ask the owner first, let the animal sniff your hand, and pet gently. If it growls, hisses or backs away, leave it alone.",
  lesson: [
    L3("Ask first", "Before you pet a dog or cat, always ask the owner: Can I pet your dog? Some animals are scared of new people.", `<div class="sentence big-sentence">“May I pet your dog?” 🐕</div>`),
    L3("Gentle petting", "Let the animal sniff your hand first. Pet gently on the back. Never pull tails or ears.", doDont(["Ask the owner", "Let it sniff your hand", "Pet gently"], ["Pull tails", "Hug tightly", "Bother sleeping or eating animals"])),
    L3("Stay away when…", "If an animal growls, hisses, shows its teeth, or backs away, it wants space. Walk away slowly and tell a grown-up.", note("Growling or hissing = <b>leave it alone</b> ✋")),
  ],
  S: [
    ["You see a dog you don't know at the park.", "Ask the owner, “May I pet your dog?”", ["Run up and hug it.", "Grab its tail.", "Chase it."], "Asking first keeps you and the dog safe.", "🐕"],
    ["A dog is growling and showing its teeth.", "Stay still, then slowly back away and tell a grown-up.", ["Pet it.", "Run and scream.", "Stare at it and yell."], "Growling means the dog wants space.", "🐕"],
    ["Your cat is eating its dinner.", "Leave it alone until it's done.", ["Pick it up.", "Pull its food away.", "Poke it."], "Animals don't like being bothered while eating.", "🐱"],
    ["You want to pet your friend's dog.", "Hold out your hand for it to sniff first.", ["Pet its face fast.", "Pull its ears.", "Sit on it."], "Sniffing helps the dog get to know you.", "✋"],
    ["Your fish tank looks dirty.", "Tell a grown-up so you can clean it together.", ["Pour soap in the tank.", "Ignore it.", "Take the fish out to play."], "Pets need clean homes.", "🐠"],
    ["You find a baby bird on the ground.", "Don't touch it, and tell a grown-up.", ["Pick it up and keep it.", "Feed it candy.", "Poke it."], "Grown-ups know how to help wild animals.", "🐦"],
    ["A squirrel comes close at the park.", "Watch it quietly from a distance.", ["Try to grab it.", "Throw rocks at it.", "Chase it."], "Wild animals should stay wild and safe.", "🐿️"],
    ["Your dog is sleeping.", "Let it sleep.", ["Jump on it.", "Yell in its ear.", "Pull its tail to wake it."], "Waking an animal suddenly can scare it.", "😴"],
  ],
  J: [["Asking before petting a dog.", 0], ["Pulling a cat's tail.", 1], ["Petting gently on the back.", 0], ["Hugging a dog you don't know.", 1], ["Backing away from a growling dog.", 0], ["Bothering an animal while it eats.", 1], ["Giving your pet fresh water.", 0], ["Chasing ducks at the pond.", 1], ["Watching wild animals from far away.", 0], ["Teasing a dog through a fence.", 1]],
});

mannersTopic(7, {
  id: "teamwork", title: "Teamwork", icon: "🤝", blurb: "Work together to do great things.", labels: "good",
  trick: "Good teammates share ideas, listen, take turns, and help each other. Together Everyone Achieves More: T.E.A.M.!",
  lesson: [
    L3("Better together", "Teamwork means working together toward one goal. When we help each other, we can do more than we could alone.", bigEmo("🤝") + note("<b>T</b>ogether <b>E</b>veryone <b>A</b>chieves <b>M</b>ore")),
    L3("Good teammates", "Good teammates share ideas, listen to others, take turns, and cheer each other on.", pics(["💡", "Share ideas"], ["👂", "Listen"], ["🔁", "Take turns"], ["📣", "Cheer"])),
    L3("Everyone has a job", "On a team, everyone can do a part. One person draws, one writes, one cuts. Then put it all together!", train(["✏️ draw", "📝 write", "✂️ cut", "🎉 done!"])),
  ],
  S: [
    ["Your group is building a block tower.", "Share the blocks and take turns adding them.", ["Build it all yourself.", "Knock it down.", "Hide the best blocks."], "Sharing jobs is teamwork.", "🧱"],
    ["A teammate has an idea different from yours.", "Listen, then talk about which idea to try.", ["Say their idea is dumb.", "Ignore them.", "Do your idea alone."], "Listening to every idea is good teamwork.", "💡"],
    ["Your team is losing the relay race.", "Keep cheering your teammates on.", ["Blame the slowest runner.", "Quit.", "Yell at your team."], "Encouraging each other keeps the team strong.", "🏃"],
    ["One teammate isn't sure what to do.", "Help explain their part.", ["Laugh at them.", "Tell them to go away.", "Do their part and brag."], "Helping teammates helps the whole team.", "🙋"],
    ["Your group has to clean up after a project.", "Everyone helps clean up.", ["Let others do it.", "Sneak away.", "Make a bigger mess."], "Teams share the work and the clean-up.", "🧹"],
    ["Your team wins the game.", "Thank your teammates and say good game to the others.", ["Say you did it all yourself.", "Tease the other team.", "Brag nonstop."], "Winning together means sharing the credit.", "🏆"],
    ["Two teammates want the same job.", "Take turns or find another job for one.", ["Fight over it.", "Quit the team.", "Tell the teacher they're mean."], "Fair solutions keep the team working.", "🔁"],
    ["Your partner is doing all the talking.", "Kindly ask, “Can I share my idea too?”", ["Give up.", "Shout over them.", "Stop helping."], "Everyone should get a turn to share.", "🗣️"],
  ],
  J: [["Sharing jobs in a group.", 0], ["Doing everything yourself and ignoring the group.", 1], ["Listening to a teammate's idea.", 0], ["Blaming a teammate for losing.", 1], ["Cheering for your team.", 0], ["Refusing to help clean up.", 1], ["Taking turns with the materials.", 0], ["Taking all the credit.", 1], ["Helping a teammate who is stuck.", 0], ["Bossing everyone around.", 1]],
});

mannersTopic(7, {
  id: "playground", title: "Playground Safety", icon: "🛝", blurb: "Play safe on slides, swings and climbers.", labels: "safe",
  trick: "Feet first down the slide, sit on swings, one at a time on the climber, and stay where a grown-up can see you.",
  lesson: [
    L3("Slides and swings", "Go down the slide feet first, sitting down, one at a time. On swings, sit down and hold on with both hands.", pics(["🛝", "Slide", "feet first"], ["🪢", "Swing", "sit and hold on"])),
    L3("Watch out for others", "Walk around swings, not in front of them. Wait until the slide is clear before you go down.", doDont(["Wait your turn", "Walk around swings", "Hold on tight"], ["Push on the slide", "Stand on swings", "Climb up the slide"])),
    L3("Stay where grown-ups can see", "Play where a grown-up can see you, and never leave the playground without asking.", bigEmo("👀")),
  ],
  S: [
    ["You want to go down the slide.", "Wait until it's clear, then go feet first.", ["Go headfirst while someone is at the bottom.", "Push the kid in front.", "Climb up the slide."], "Feet first and one at a time is safe.", "🛝"],
    ["Your friend is swinging high.", "Walk around the swing, far away.", ["Run right in front of it.", "Grab the swing chains.", "Stand behind it."], "Swings can hit you hard.", "🪢"],
    ["You want to swing.", "Sit down and hold on with both hands.", ["Stand on the seat.", "Swing on your belly while spinning.", "Let go at the top."], "Sitting and holding on keeps you safe.", "✊"],
    ["The monkey bars are crowded.", "Wait for your turn.", ["Climb over people.", "Push someone off.", "Hang from someone's legs."], "One at a time prevents falls.", "🧗"],
    ["You see broken glass on the playground.", "Stay away and tell a grown-up.", ["Pick it up.", "Kick it.", "Throw it."], "Broken glass can cut you.", "🔺"],
    ["The slide is very hot from the sun.", "Touch it carefully first, and wait if it's too hot.", ["Slide down in shorts anyway.", "Lie on it.", "Dare your friend to go."], "Hot metal can burn skin.", "☀️"],
    ["You want to go to the other side of the park.", "Ask a grown-up first.", ["Just go.", "Go with a stranger.", "Hide behind the trees."], "Grown-ups need to know where you are.", "🌳"],
    ["Someone is jumping off the top of the climber.", "Tell them it's not safe, and get a grown-up.", ["Jump too.", "Cheer them on.", "Push them."], "Jumping from high can cause injuries.", "⚠️"],
  ],
  J: [["Going down the slide feet first.", 0], ["Climbing up the slide while kids slide down.", 1], ["Sitting on the swing.", 0], ["Walking in front of moving swings.", 1], ["Waiting your turn on the ladder.", 0], ["Pushing someone on the climber.", 1], ["Playing where a grown-up can see you.", 0], ["Jumping off the top of the monkey bars.", 1], ["Telling a grown-up about broken equipment.", 0], ["Wearing a scarf that can get caught while climbing.", 1]],
});

mannersTopic(8, {
  id: "money", title: "Saving & Spending", icon: "🐷", blurb: "Make smart choices with money.", labels: "good",
  trick: "Save some, spend some, share some. Ask yourself: do I need it, or do I just want it?",
  lesson: [
    L3("Needs and wants", "A need is something you must have, like food or a coat. A want is something nice to have, like a new toy.", table([["🍎 food", "🎮 video game"], ["🧥 warm coat", "🧸 another stuffed animal"], ["🏠 a home", "🍭 candy"]], ["Needs", "Wants"])),
    L3("Save, spend, share", "A smart plan: save some money for later, spend some on things you want, and share some to help others.", pics(["🐷", "Save"], ["🛍️", "Spend"], ["💝", "Share"])),
    L3("Saving for a goal", "If a toy costs $20 and you save $5 a week, how long until you can buy it? 4 weeks! Saving takes patience.", train(["$5", "$10", "$15", "$20 🎉"])),
  ],
  S: [
    ["You get $10 for your birthday.", "Save some, spend some, and maybe share some.", ["Spend it all on candy right away.", "Lose it.", "Give it all to a stranger."], "A plan helps money go further.", "💵"],
    ["You want a game that costs $30, and you have $10.", "Save up until you have enough.", ["Take money from your parent's wallet.", "Cry until someone buys it.", "Give up forever."], "Saving for a goal takes patience.", "🎮"],
    ["At the store you see a toy you don't need.", "Think about whether you really want it.", ["Grab it and beg.", "Throw a tantrum.", "Hide it in the cart."], "Stopping to think helps you choose wisely.", "🧸"],
    ["Your friend wants you to spend all your money on gum.", "Say no thanks and stick to your plan.", ["Spend it all to fit in.", "Borrow money.", "Lie about having money."], "You get to make your own money choices.", "🍬"],
    ["You find a dollar on the classroom floor.", "Give it to the teacher.", ["Keep it.", "Spend it at lunch.", "Hide it in your shoe."], "It belongs to someone else.", "💲"],
    ["Your school is raising money for animals.", "Share a little of your savings if you can.", ["Laugh at the idea.", "Take money from the jar.", "Tell others not to give."], "Sharing helps others.", "🐶"],
    ["You want something but aren't sure it's worth it.", "Wait a day and decide tomorrow.", ["Buy it right now.", "Buy three.", "Spend your whole piggy bank."], "Waiting helps you make good choices.", "⏳"],
    ["You saved enough for your goal.", "Feel proud and buy what you planned.", ["Spend it on something random instead.", "Brag and show off.", "Hide it and forget."], "Reaching a goal is something to be proud of.", "🎉"],
  ],
  J: [["Saving part of your allowance.", 0], ["Spending all your money on the first thing you see.", 1], ["Knowing the difference between needs and wants.", 0], ["Taking money that isn't yours.", 1], ["Making a savings goal.", 0], ["Begging until someone buys it for you.", 1], ["Sharing some money with a good cause.", 0], ["Losing money because you don't keep track.", 1], ["Comparing prices before buying.", 0], ["Borrowing money and not paying it back.", 1]],
});

mannersTopic(8, {
  id: "askhelp", title: "Asking for Help", icon: "🙋", blurb: "Knowing when and how to ask.", labels: "good",
  trick: "Try first, then ask. Say what you tried and what you need: “I tried this, but I'm stuck on that. Can you help?”",
  lesson: [
    L3("Asking is smart", "Everyone needs help sometimes, even grown-ups! Asking for help is brave and smart, not silly.", bigEmo("🙋")),
    L3("Try, then ask", "First, try on your own. If you're still stuck, ask someone. Tell them what you tried and what you need.", `<div class="sentence big-sentence">“I tried adding, but I'm stuck. Can you help me?”</div>`),
    L3("Who can help?", "Teachers, parents, friends, librarians, and coaches can all help. In an emergency, find a trusted grown-up right away.", pics(["🧑‍🏫", "Teacher"], ["👪", "Parent"], ["👫", "Friend"], ["📚", "Librarian"])),
  ],
  S: [
    ["You've tried a math problem three times and are still stuck.", "Ask your teacher, and show what you tried.", ["Give up.", "Copy your neighbor.", "Rip up the paper."], "Asking after trying is the smart move.", "➗"],
    ["You can't find a book in the library.", "Ask the librarian.", ["Pull all the books off the shelves.", "Give up and leave.", "Cry under a table."], "Librarians love to help.", "📚"],
    ["A friend is being picked on and you don't know what to do.", "Ask a trusted grown-up for help.", ["Ignore it.", "Join in.", "Handle it with your fists."], "Some problems need a grown-up.", "🛡️"],
    ["You don't understand the directions.", "Raise your hand and ask.", ["Guess wildly.", "Do nothing.", "Do something else."], "Asking saves you from doing it wrong.", "❓"],
    ["You feel sick at school.", "Tell your teacher.", ["Keep it secret.", "Go home by yourself.", "Lie down in the hall."], "Grown-ups can help you feel better.", "🤒"],
    ["You're worried about something at home.", "Talk to a grown-up you trust.", ["Keep it bottled up.", "Pretend it's fine forever.", "Tell nobody."], "Talking helps with worries.", "😟"],
    ["You want help but someone is busy.", "Wait for a good moment and say, “Excuse me, can you help?”", ["Interrupt loudly.", "Pull their arm.", "Give up."], "Polite asking works best.", "⏳"],
    ["Someone helps you with your homework.", "Say thank you!", ["Say nothing.", "Say they did it wrong.", "Walk away."], "Thanking helpers is kind.", "💛"],
  ],
  J: [["Trying first, then asking for help.", 0], ["Never asking even when you're very stuck.", 1], ["Telling a grown-up when you feel unsafe.", 0], ["Copying instead of asking.", 1], ["Saying what you tried when you ask.", 0], ["Interrupting loudly to ask for help.", 1], ["Thanking someone who helped.", 0], ["Pretending you understand when you don't.", 1], ["Asking a librarian to find a book.", 0], ["Giving up the first time it's hard.", 1]],
});

mannersTopic(9, {
  id: "leadership", title: "Being a Leader", icon: "🦁", blurb: "Lead by example and help others shine.", labels: "good",
  trick: "Great leaders go first in doing the right thing, listen to everyone, and help others succeed.",
  lesson: [
    L3("What is a leader?", "A leader helps a group reach a goal. Leaders aren't bossy. They set a good example and help others do their best.", bigEmo("🦁")),
    L3("Leaders listen", "A good leader listens to everyone's ideas, makes fair choices, and gives everyone a job.", pics(["👂", "Listens"], ["⚖️", "Fair"], ["🤝", "Includes everyone"], ["💪", "Encourages"])),
    L3("Lead by example", "Leaders do the right thing even when nobody is watching, like cleaning up or including a new kid.", note("Do what you'd want others to do")),
  ],
  S: [
    ["You're the group leader and two kids disagree.", "Listen to both ideas and help the group choose.", ["Pick your best friend's idea.", "Ignore them both.", "Do it your way only."], "Leaders are fair.", "⚖️"],
    ["A new kid joins your team.", "Welcome them and explain how things work.", ["Ignore them.", "Give them the worst job.", "Make fun of them."], "Leaders include everyone.", "👋"],
    ["Your group made a mistake.", "Say “Let's fix it together,” and make a new plan.", ["Blame one person.", "Give up.", "Yell at the group."], "Leaders help the group learn and keep going.", "🔧"],
    ["You notice trash on the playground.", "Pick it up, even if no one is watching.", ["Leave it.", "Kick it.", "Wait for someone else."], "Leading by example matters.", "🗑️"],
    ["Someone in your group is quiet.", "Ask, “What do you think?”", ["Skip them.", "Talk over them.", "Tell them to be louder."], "Good leaders help everyone be heard.", "🗣️"],
    ["Your team finishes the project.", "Thank everyone for their part.", ["Take all the credit.", "Say you did the hard parts.", "Point out mistakes only."], "Leaders share the credit.", "🎉"],
    ["You're captain and your team is losing.", "Encourage everyone and keep trying.", ["Yell at teammates.", "Quit.", "Blame the referee."], "Leaders stay positive.", "⚽"],
    ["Friends want to do something unkind.", "Suggest a better idea.", ["Go along with it.", "Lead them to do it.", "Laugh and watch."], "Leaders guide others to good choices.", "💡"],
  ],
  J: [["Listening to every team member.", 0], ["Bossing people around.", 1], ["Giving everyone a job.", 0], ["Taking all the credit.", 1], ["Encouraging a teammate who is struggling.", 0], ["Blaming one person for a group mistake.", 1], ["Doing the right thing when nobody is watching.", 0], ["Only listening to your best friend.", 1], ["Thanking the team.", 0], ["Giving up when things get hard.", 1]],
});

mannersTopic(9, {
  id: "guest", title: "Guests & Hosts", icon: "🏡", blurb: "Manners when visiting and having friends over.", labels: "polite",
  trick: "Guest: follow their house rules, help clean up, and say thank you. Host: share, include, and let your guest choose first.",
  lesson: [
    L3("At someone's house", "When you visit, follow their family's rules, even if they're different from yours. Say hello to the grown-ups.", pics(["👋", "Say hello"], ["📜", "Follow their rules"], ["🧹", "Help clean up"], ["🙏", "Say thank you"])),
    L3("Being a good host", "When a friend visits you, share your toys, let your guest choose first, and make sure they feel welcome.", doDont(["Let your guest choose first", "Share your toys", "Include them"], ["Ignore your guest", "Only play your favorite game", "Leave them alone"])),
    L3("Saying goodbye", "Before you leave, help clean up and thank the grown-ups: Thank you for having me!", `<div class="sentence big-sentence">“Thank you for having me!” 🏡</div>`),
  ],
  S: [
    ["You arrive at your friend's house.", "Say hello to their parents.", ["Run straight to the toys.", "Ignore everyone.", "Ask for a snack first."], "Greeting the grown-ups is polite.", "👋"],
    ["Your friend's family takes shoes off inside.", "Take your shoes off too.", ["Keep them on.", "Say that's a weird rule.", "Walk on the couch."], "Follow your host's house rules.", "👟"],
    ["They serve a food you don't like.", "Say “No, thank you,” or try a small bite.", ["Say “Gross!”", "Spit it out.", "Ask for different food loudly."], "Polite words don't hurt feelings.", "🥦"],
    ["It's time to go home.", "Help clean up and say “Thank you for having me!”", ["Leave toys everywhere.", "Run out without a word.", "Hide so you can stay."], "Cleaning up and thanking is good manners.", "🧸"],
    ["A friend comes to your house to play.", "Let your friend choose the first game.", ["Only play your favorite.", "Play alone on your tablet.", "Tell them not to touch anything."], "Good hosts make guests feel welcome.", "🎲"],
    ["Your guest is quiet and looks unsure.", "Ask, “What do you like to play?”", ["Ignore them.", "Laugh at them.", "Leave the room."], "Including your guest is kind.", "🙂"],
    ["You need to use the bathroom at a friend's house.", "Ask, “Where is the bathroom, please?”", ["Wander into bedrooms.", "Open all the doors.", "Hold it all day."], "Asking politely is the right way.", "🚪"],
    ["You break something at a friend's house by accident.", "Tell the grown-up and say sorry.", ["Hide it.", "Blame your friend.", "Leave quickly."], "Being honest shows respect.", "🏺"],
  ],
  J: [["Saying “Thank you for having me.”", 0], ["Opening their fridge without asking.", 1], ["Following their house rules.", 0], ["Jumping on their furniture.", 1], ["Letting your guest choose first.", 0], ["Ignoring your guest to play video games alone.", 1], ["Helping clean up before you leave.", 0], ["Saying their food is gross.", 1], ["Greeting the grown-ups.", 0], ["Going into rooms without asking.", 1]],
});

