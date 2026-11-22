/* =====================================================================
   Story Time: read-along stories (2 per age) with comprehension quizzes.
   Every story here is original. Each page has a picture and text; each
   story has 5 questions. The first option listed is the right answer
   (options are shuffled when the quiz starts).
   ===================================================================== */
const READ_STORIES = [
  {
    id: "lost-mitten", age: 6, title: "Max and the Lost Mitten", icon: "🧤", blurb: "A cold day, a red mitten, and a helpful friend.",
    pages: [
      { e: "❄️🧒", text: "It was a cold day. Max put on his hat and his red mittens." },
      { e: "⛄", text: "Max went out to play in the snow. He made a big snowman." },
      { e: "😢🖐️", text: "Then Max looked at his hand. One red mitten was gone!" },
      { e: "🐶🧤", text: "His dog, Sam, ran to the snowman. Sam had the red mitten in his mouth." },
      { e: "🤗", text: "Max gave Sam a big hug. \"Thank you, Sam!\" said Max." },
    ],
    qs: [
      ["What color were Max's mittens?", ["Red", "Blue", "Green", "Yellow"], "Max put on his hat and his red mittens."],
      ["What did Max make in the snow?", ["A snowman", "A snow fort", "A snow angel", "A sled"], "He made a big snowman."],
      ["What was the problem?", ["One mitten was gone", "His hat blew away", "The snowman fell down", "Sam ran away"], "One red mitten was gone!"],
      ["Who found the mitten?", ["Sam the dog", "Max's mom", "A cat", "The snowman"], "Sam had the red mitten in his mouth."],
      ["How did Max feel at the end?", ["Happy and thankful", "Sad", "Angry", "Scared"], "Max gave Sam a big hug and said thank you."],
    ],
  },
  {
    id: "garden", age: 6, title: "Lily's Little Garden", icon: "🌻", blurb: "A tiny seed, some water, and a lot of waiting.",
    pages: [
      { e: "👧🌰", text: "Lily had a little seed. She put it in a pot of dirt." },
      { e: "💧", text: "Every day, Lily gave the seed some water." },
      { e: "☀️", text: "She put the pot in the sun. The sun helps plants grow." },
      { e: "🌱", text: "One day, Lily saw a tiny green sprout!" },
      { e: "🌻😊", text: "The sprout grew and grew. Soon it was a big yellow sunflower." },
    ],
    qs: [
      ["What did Lily put in the pot?", ["A seed", "A rock", "A bug", "A toy"], "Lily had a little seed. She put it in a pot of dirt."],
      ["What did Lily give the seed every day?", ["Water", "Milk", "Candy", "Juice"], "Every day, Lily gave the seed some water."],
      ["Why did she put the pot in the sun?", ["The sun helps plants grow", "To keep it cold", "To hide it", "So it would melt"], "The sun helps plants grow."],
      ["What came up first?", ["A tiny green sprout", "A big flower", "An apple", "A tree"], "One day, Lily saw a tiny green sprout!"],
      ["What did the seed become?", ["A sunflower", "A rose", "A carrot", "A pumpkin"], "Soon it was a big yellow sunflower."],
    ],
  },
  {
    id: "brave-bird", age: 7, title: "Pip Learns to Fly", icon: "🦉", blurb: "A small owl is scared to leave the nest.",
    pages: [
      { e: "🪺🦉", text: "Pip was a little owl who lived in a nest high in an oak tree. All of his sisters could fly, but Pip was scared." },
      { e: "😟", text: "\"What if I fall?\" Pip asked his mom. \"Everyone is scared at first,\" Mom said softly. \"Start with one small hop.\"" },
      { e: "🌿", text: "Pip hopped to a low branch. He flapped his wings and held on tight. It was not so bad!" },
      { e: "🍃🦉", text: "The next day, he hopped and flapped again. This time he floated down to a bush, like a leaf in the wind." },
      { e: "🌙✨", text: "By the end of the week, Pip flew all the way around the tree. \"I did it!\" he hooted at the moon." },
    ],
    qs: [
      ["Where did Pip live?", ["In a nest in an oak tree", "In a cave", "In a barn", "Under a bridge"], "Pip lived in a nest high in an oak tree."],
      ["Why didn't Pip fly at first?", ["He was scared", "He was sleeping", "His wing was hurt", "It was raining"], "All of his sisters could fly, but Pip was scared."],
      ["What did Mom tell Pip to do?", ["Start with one small hop", "Jump off the top", "Wait until next year", "Ask his sisters to carry him"], "Start with one small hop."],
      ["What happened the next day?", ["He floated down to a bush", "He fell in a pond", "He gave up", "He flew to the moon"], "This time he floated down to a bush."],
      ["What is the lesson of the story?", ["Small steps help you do hard things", "Never try new things", "Owls don't need to fly", "Only big birds can fly"], "Pip practiced a little each day until he could fly."],
    ],
  },
  {
    id: "lemonade", age: 7, title: "The Lemonade Stand", icon: "🍋", blurb: "Two friends, one stand, and a hot summer day.",
    pages: [
      { e: "☀️🍋", text: "It was a hot summer day. Ana and Ben wanted to buy a new soccer ball, so they made a lemonade stand." },
      { e: "🥤", text: "They squeezed lemons, added water and a little sugar, and stirred. Each cup cost 25 cents." },
      { e: "😕", text: "At first, nobody came. \"Our sign is too small,\" said Ben. So they made a big, bright sign." },
      { e: "🚶‍♀️🚶", text: "Soon people lined up! A mail carrier bought two cups. A dad and his kids bought four." },
      { e: "⚽🎉", text: "At the end of the day, they counted their coins. They had enough for the soccer ball, and they shared it with the whole street." },
    ],
    qs: [
      ["Why did Ana and Ben make a lemonade stand?", ["To buy a soccer ball", "To buy candy", "To help a dog", "Because they were bored"], "Ana and Ben wanted to buy a new soccer ball."],
      ["How much did one cup cost?", ["25 cents", "5 cents", "1 dollar", "50 cents"], "Each cup cost 25 cents."],
      ["What was the problem at first?", ["Nobody came", "They ran out of lemons", "It started to rain", "The table broke"], "At first, nobody came."],
      ["How did they fix the problem?", ["They made a big, bright sign", "They gave lemonade away", "They moved to the park", "They went home"], "So they made a big, bright sign."],
      ["What did they do with the soccer ball?", ["Shared it with the whole street", "Kept it in a box", "Sold it", "Gave it to the mail carrier"], "They shared it with the whole street."],
    ],
  },
  {
    id: "science-fair", age: 8, title: "The Science Fair Surprise", icon: "🔬", blurb: "Maya's volcano doesn't go as planned.",
    pages: [
      { e: "🌋📋", text: "Maya had worked for two weeks on her science fair project: a volcano made of clay. She planned to make it erupt with baking soda and vinegar." },
      { e: "😬", text: "On the morning of the fair, Maya tested it one more time. Nothing happened! The \"lava\" just sat there, flat and fizzless." },
      { e: "🤔", text: "Instead of giving up, Maya thought like a scientist. She checked each step. The baking soda box was old and had gotten wet." },
      { e: "🏃‍♀️🛒", text: "Her dad drove her to the store for a fresh box. They got back just ten minutes before the judges arrived." },
      { e: "🌋🏅", text: "When the judges came, the volcano bubbled over with red foam. Maya explained what went wrong and how she fixed it. The judges gave her a ribbon for the best problem solving." },
    ],
    qs: [
      ["What was Maya's project?", ["A clay volcano", "A paper rocket", "A plant experiment", "A robot"], "Her project was a volcano made of clay."],
      ["What went wrong on the morning of the fair?", ["The volcano wouldn't erupt", "The volcano broke", "Maya was late", "The judges didn't come"], "Nothing happened! The lava just sat there."],
      ["Why didn't the volcano work?", ["The baking soda was old and wet", "There was too much vinegar", "The clay was too soft", "It was too cold outside"], "The baking soda box was old and had gotten wet."],
      ["What does \"thought like a scientist\" mean in this story?", ["She checked each step to find the problem", "She wore a lab coat", "She asked a robot", "She guessed the answer"], "She checked each step."],
      ["Why did Maya win a ribbon?", ["For the best problem solving", "For the biggest volcano", "For being first", "For the prettiest colors"], "The judges gave her a ribbon for the best problem solving."],
    ],
  },
  {
    id: "new-kid", age: 8, title: "The New Kid", icon: "🎒", blurb: "Leo starts at a new school where he doesn't know anyone.",
    pages: [
      { e: "🏫🎒", text: "Leo's family moved to a new town in the middle of the school year. On his first day, his stomach felt full of butterflies." },
      { e: "🍎🪑", text: "At lunch, Leo sat alone at the end of a long table. He pretended to be very interested in his apple." },
      { e: "👋", text: "A girl named Priya walked over. \"Do you like drawing?\" she asked, pointing to the dragon on his notebook. Leo nodded." },
      { e: "✏️🐉", text: "Priya invited Leo to the art club after school. They spent the whole hour drawing dragons with wings as wide as buses." },
      { e: "🤝🌟", text: "A month later, a new girl sat alone at lunch. Leo remembered how that felt. He walked over and asked, \"Do you like drawing?\"" },
    ],
    qs: [
      ["Why was Leo at a new school?", ["His family moved to a new town", "His old school closed", "He skipped a grade", "He wanted to join art club"], "Leo's family moved to a new town."],
      ["What does \"his stomach felt full of butterflies\" mean?", ["He felt nervous", "He was hungry", "He ate bugs", "He felt sick from lunch"], "Butterflies in your stomach is a saying that means you feel nervous."],
      ["How did Priya start talking to Leo?", ["She asked about his dragon drawing", "She asked to borrow a pencil", "She told a joke", "She sat on his chair"], "Do you like drawing? she asked, pointing to the dragon on his notebook."],
      ["Where did Priya invite Leo?", ["To art club", "To soccer practice", "To her birthday party", "To the library"], "Priya invited Leo to the art club after school."],
      ["What did Leo do at the end?", ["He welcomed a new girl the same way", "He sat alone again", "He moved away", "He quit art club"], "He walked over and asked, Do you like drawing?"],
    ],
  },
  {
    id: "honeybees", age: 9, title: "The Secret Life of Honeybees", icon: "🐝", blurb: "A true-to-life look at how a beehive works.",
    pages: [
      { e: "🐝🏠", text: "A honeybee hive can hold tens of thousands of bees, yet it runs like a tiny, well-organized city. Every bee has a job, and the jobs change as the bee gets older." },
      { e: "👑", text: "The queen is the only bee that lays eggs. She can lay more than a thousand eggs in a single day during summer. The other female bees, called workers, take care of everything else." },
      { e: "🧹🍼", text: "Young workers clean the hive and feed the baby bees, called larvae. Older workers become foragers, flying out to collect nectar and pollen from flowers." },
      { e: "💃🌸", text: "When a forager finds a great patch of flowers, she returns and performs a \"waggle dance.\" The direction and length of the dance tell the other bees where to fly and how far to go." },
      { e: "🍯🌍", text: "Bees turn nectar into honey to eat during winter. As they travel from flower to flower, they also carry pollen, which helps plants make fruit and seeds. Many of the foods people eat depend on bees." },
    ],
    qs: [
      ["What is the main idea of this text?", ["A hive is organized, and every bee has a job", "Bees are dangerous insects", "Honey is the best food", "Queens do all the work"], "It runs like a tiny, well-organized city. Every bee has a job."],
      ["What is the queen's job?", ["Laying eggs", "Making honey", "Guarding the door", "Dancing"], "The queen is the only bee that lays eggs."],
      ["What do young worker bees do?", ["Clean the hive and feed larvae", "Fly out to find flowers", "Lay eggs", "Build new hives far away"], "Young workers clean the hive and feed the baby bees."],
      ["Why does a forager do the waggle dance?", ["To tell other bees where the flowers are", "To scare away birds", "To keep warm", "To wake up the queen"], "The dance tells the other bees where to fly and how far to go."],
      ["Why are bees important to people?", ["They help plants make fruit and seeds", "They keep houses clean", "They eat harmful bugs", "They make wax crayons"], "Pollen helps plants make fruit and seeds. Many foods depend on bees."],
    ],
  },
  {
    id: "map-mystery", age: 9, title: "The Map in the Attic", icon: "🗺️", blurb: "Twins find an old map and follow the clues.",
    pages: [
      { e: "🏚️📦", text: "On a rainy Saturday, twins Omar and Zara were exploring their grandmother's dusty attic. Under a stack of old books, Zara found a folded map drawn in faded ink." },
      { e: "🗺️✖️", text: "The map showed their grandmother's backyard. There was a big oak tree, a stone well, and a red X next to a note: \"Twenty steps east of the well, where the morning sun first lands.\"" },
      { e: "🧭☀️", text: "The next morning, they woke up early. Omar used the compass on his watch to face east, and Zara counted twenty steps. The first sunlight was landing on a flat gray stone." },
      { e: "🪨📦", text: "Under the stone they found a small metal box. Inside were a few marbles, a photo of a girl with a gap-toothed grin, and a note that said, \"My treasures, 1962.\"" },
      { e: "👵💛", text: "They ran inside to show their grandmother. Her eyes went wide, and then she laughed. \"I buried that when I was nine years old!\" she said. \"I'd forgotten all about it.\"" },
    ],
    qs: [
      ["Where did the twins find the map?", ["Under old books in the attic", "In the stone well", "In a library", "Inside the oak tree"], "Under a stack of old books, Zara found a folded map."],
      ["Why did the twins wake up early?", ["The clue mentioned where the morning sun first lands", "They had school", "Their grandmother called them", "It was too noisy"], "The note said: where the morning sun first lands."],
      ["Which tool helped Omar find east?", ["A compass", "A ruler", "A flashlight", "A shovel"], "Omar used the compass on his watch to face east."],
      ["Who was the girl in the photo? (Use clues!)", ["Their grandmother as a child", "Zara", "A famous explorer", "The twins' teacher"], "Grandma said, I buried that when I was nine years old."],
      ["How did Grandma feel when she saw the box?", ["Surprised and happy", "Angry", "Bored", "Scared"], "Her eyes went wide, and then she laughed."],
    ],
  },
];
function storyTopic(st) {
  return {
    special: "story", story: st, age: st.age, subj: "english", id: "story-" + st.id, title: st.title, icon: st.icon, lesson: st.pages.map(p => ({ say: p.text })),
    preset: shuffle(st.qs).map(([q, opts, why]) => ({ q, say: q, opts: shuffle(opts), ans: opts[0], why: `The story says: “${why}”`, key: q })),
  };
}

