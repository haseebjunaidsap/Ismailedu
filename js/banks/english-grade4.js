/* =====================================================================
   Age 9 English: bigger question banks (tag EN9_)
   ===================================================================== */

/* ---------- Main Idea & Inference: new original passages ---------- */
const EN9_PASS = [
  { p: "Mateo's family moved to a new town in the middle of the school year. On his first day, he sat alone at lunch and stared at his tray. Then a girl named June waved him over to her table. She asked if he liked drawing comics, and soon they were sketching superheroes on their napkins. By the time the bell rang, Mateo was laughing.", qs: [
    ["How did Mateo feel at the start of lunch?", "lonely", ["excited", "angry", "silly"], "The story says he \"sat alone at lunch and stared at his tray.\""],
    ["What is this passage mostly about?", "Mateo makes a new friend at school.", ["June teaches a drawing class.", "Mateo's family buys a new car.", "The school lunch was cold."], "The whole story shows Mateo and June becoming friends at lunch."],
    ["What did Mateo and June do together?", "drew superheroes on napkins", ["played soccer at recess", "read a comic book", "traded their desserts"], "The story says \"they were sketching superheroes on their napkins.\""],
    ["How did Mateo feel at the end?", "happy", ["lonely", "worried", "bored"], "The story says \"By the time the bell rang, Mateo was laughing.\""]] },
  { p: "Honeybees work together in a hive. Some bees fly out to gather nectar from flowers. Other bees stay inside to clean the hive and feed the young bees. When a bee finds a good patch of flowers, it does a special dance to show the others where to go. Every bee has a job that helps the whole hive.", qs: [
    ["What is the main idea?", "Honeybees work together, and each has a job.", ["Bees like to dance at parties.", "Flowers make nectar in spring.", "Young bees are always hungry."], "The first and last sentences say bees \"work together\" and \"every bee has a job.\""],
    ["Why does a bee do a special dance?", "to show other bees where flowers are", ["to stay warm in the hive", "to scare away birds", "to wake up the other bees"], "The passage says it dances \"to show the others where to go.\""],
    ["What do some bees do inside the hive?", "clean the hive and feed young bees", ["make new flowers grow", "build nests in the grass", "sleep all day long"], "The passage says \"Other bees stay inside to clean the hive and feed the young bees.\""],
    ["Which word best describes a beehive?", "busy", ["empty", "lazy", "silent"], "The passage says \"Every bee has a job,\" so the hive is a busy place."]] },
  { p: "Grandma Lucia keeps a jar of buttons on her sewing table. Each button has a story. The shiny gold one came from her wedding dress. The tiny blue one fell off Dad's coat when he was a baby. Whenever Nina visits, she picks a button, and Grandma tells her the story behind it.", qs: [
    ["What is the main idea?", "Each of Grandma's buttons has a story.", ["Grandma likes to sew dresses.", "Dad lost his blue coat.", "Nina wants a new jar."], "The passage says \"Each button has a story,\" and the rest gives examples."],
    ["Where did the shiny gold button come from?", "Grandma's wedding dress", ["Dad's baby coat", "Nina's sweater", "a toy store"], "The passage says \"The shiny gold one came from her wedding dress.\""],
    ["What will Nina most likely do on her next visit?", "pick a button and hear its story", ["throw the buttons away", "sew a new coat", "paint the jar blue"], "The passage says \"Whenever Nina visits, she picks a button.\""],
    ["How does Grandma most likely feel about the buttons?", "They are special to her.", ["She thinks they are junk.", "She wants to sell them.", "She is tired of them."], "She keeps them and remembers a story for each one, so they are special."]] },
  { p: "Earthworms may seem small, but they are a big help to gardens. As they tunnel through the dirt, they make spaces for air and water to reach plant roots. Worms also eat dead leaves and turn them into rich soil. Gardeners are often happy to find lots of worms in their soil.", qs: [
    ["What is the main idea?", "Earthworms help gardens.", ["Worms are afraid of gardeners.", "Dead leaves are messy.", "Roots grow very deep."], "The first sentence says worms \"are a big help to gardens.\""],
    ["How do worm tunnels help plants?", "They let air and water reach roots.", ["They keep bugs away.", "They make plants grow flowers.", "They hold seeds in place."], "The passage says tunnels \"make spaces for air and water to reach plant roots.\""],
    ["What do worms turn dead leaves into?", "rich soil", ["new leaves", "clean water", "tiny seeds"], "The passage says worms \"turn them into rich soil.\""],
    ["Why are gardeners happy to find worms?", "Worms make the soil better for plants.", ["Worms are fun to keep as pets.", "Worms eat the garden plants.", "Worms scare the birds away."], "Worms help air, water and rich soil reach the plants, which is good for a garden."]] },
  { p: "The sky turned dark gray, and the wind began to howl. Ellie's dad pulled the lawn chairs into the garage. Ellie ran to close the windows while her little brother gathered flashlights from the kitchen drawer. Just as they finished, the first raindrops hit the roof.", qs: [
    ["What was the family getting ready for?", "a big storm", ["a birthday party", "a camping trip", "a sunny picnic"], "The clues are a \"dark gray\" sky, a howling wind and \"the first raindrops.\""],
    ["Why did Ellie's brother most likely gather flashlights?", "in case the power went out", ["to play a game of tag", "to read in bed", "to give them away"], "Big storms can knock out the power, so the flashlights would help."],
    ["What did Ellie's dad do?", "pulled the lawn chairs into the garage", ["closed all the windows", "gathered the flashlights", "made dinner for everyone"], "The passage says \"Ellie's dad pulled the lawn chairs into the garage.\""],
    ["Which word best describes the family?", "prepared", ["careless", "sleepy", "confused"], "Everyone got things ready \"just as\" the rain began, so they were prepared."]] },
  { p: "Kenji wanted to win the class plant-growing contest. He watered his bean plant every single day, sometimes twice. After a week, the leaves turned yellow and droopy. His teacher explained that too much water can hurt roots. Kenji began watering only when the soil felt dry, and soon new green leaves appeared.", qs: [
    ["Why did the leaves turn yellow?", "Kenji gave the plant too much water.", ["The plant needed more water.", "The plant got too cold.", "A bug ate the leaves."], "The teacher \"explained that too much water can hurt roots.\""],
    ["What lesson did Kenji learn?", "More is not always better.", ["Plants never need water.", "Contests are not fun.", "Beans grow best in the dark."], "Watering a lot hurt the plant. Watering less helped it, so more was not better."],
    ["What did Kenji change?", "He watered only when the soil was dry.", ["He moved the plant outside.", "He bought a brand-new plant.", "He stopped watering forever."], "The passage says \"Kenji began watering only when the soil felt dry.\""],
    ["How did Kenji's teacher help?", "The teacher explained what went wrong.", ["The teacher watered the plant.", "The teacher bought a new plant.", "The teacher gave Kenji a prize."], "The passage says \"His teacher explained that too much water can hurt roots.\""]] },
  { p: "The Arctic fox lives in one of the coldest places on Earth. In winter, its thick white fur keeps it warm and helps it blend in with the snow. In summer, its fur turns brown or gray to match the rocks and plants. Its short ears and legs help it lose less body heat.", qs: [
    ["What is the main idea?", "The Arctic fox's body helps it live in the cold.", ["Foxes like summer best.", "Snow is cold and white.", "Rocks can be brown or gray."], "Every sentence tells how the fox's fur, ears or legs help it in a cold place."],
    ["Why does the fox's fur turn brown in summer?", "to match the rocks and plants", ["because it gets dirty", "to stay cool in the sun", "because the fox gets old"], "The passage says its fur turns brown or gray \"to match the rocks and plants.\""],
    ["How do short ears help the Arctic fox?", "They help it lose less heat.", ["They help it hear better.", "They help it run faster.", "They help it dig holes."], "The passage says short ears and legs \"help it lose less body heat.\""],
    ["How does white fur help the fox in winter?", "It helps the fox hide in the snow.", ["It makes the fox easy to see.", "It keeps the fox cool.", "It helps the fox swim."], "The passage says white fur \"helps it blend in with the snow.\""]] },
  { p: "Aisha had been saving her allowance for months to buy a new art set. On the way to the store, she passed a sign at the animal shelter asking for money to buy food and blankets. Aisha stood there for a long moment. Then she walked inside and handed her savings to the volunteer at the desk.", qs: [
    ["What did Aisha decide to do?", "give her money to the shelter", ["buy the art set", "save her money longer", "adopt a puppy"], "The passage says she \"handed her savings to the volunteer.\""],
    ["Which word best describes Aisha?", "generous", ["selfish", "careless", "impatient"], "She gave away money she had saved for months to help animals."],
    ["Why did Aisha stand by the sign for a long moment?", "She was deciding what to do with her money.", ["She was lost.", "She was waiting for a bus.", "She was tired from walking."], "Right after standing there, she chose to give her savings away."],
    ["What had Aisha been saving for?", "a new art set", ["a new bike", "a pet puppy", "warm blankets"], "The passage says she was saving \"to buy a new art set.\""]] },
  { p: "Long before there were clocks, people used the sun to tell time. They placed a stick in the ground and watched its shadow. In the morning, the shadow was long and pointed one way. At noon, it was very short. In the afternoon, it grew long again in the other direction. This simple tool is called a sundial.", qs: [
    ["What is the main idea?", "People once used shadows to tell time.", ["Sticks grow in the ground.", "Noon is time for lunch.", "Clocks are very old."], "The passage explains how people used the sun and a shadow to tell time."],
    ["When was the shadow the shortest?", "at noon", ["in the morning", "in the afternoon", "at sunset"], "The passage says \"At noon, it was very short.\""],
    ["What is this tool called?", "a sundial", ["a compass", "a calendar", "a telescope"], "The passage says \"This simple tool is called a sundial.\""],
    ["Why would a sundial not work at night?", "There is no sun to make a shadow.", ["The stick falls over.", "It is too cold outside.", "The shadow gets too long."], "A sundial needs the sun to make a shadow, and the sun is down at night."]] },
  { p: "Every Saturday, Mr. Alvarez opens his bakery at six in the morning. By seven, a line of people stretches down the sidewalk. His cinnamon rolls are so popular that they are usually gone before nine. Some customers even set alarms just to get there early.", qs: [
    ["What is the main idea?", "Mr. Alvarez's bakery is very popular.", ["Cinnamon is a spice.", "Alarms are very loud.", "The sidewalk is long."], "The long line and rolls that sell out show the bakery is popular."],
    ["Why do some customers set alarms?", "to get cinnamon rolls before they run out", ["to open the bakery", "to catch the bus", "to get to school on time"], "The rolls \"are usually gone before nine,\" so people come early."],
    ["What time does the bakery open on Saturday?", "six in the morning", ["seven in the morning", "nine in the morning", "noon"], "The passage says he \"opens his bakery at six in the morning.\""],
    ["What can you infer about the cinnamon rolls?", "People think they are delicious.", ["They are too big to eat.", "They taste stale.", "Nobody wants them."], "People line up and set alarms for them, so they must love how they taste."]] },
  { p: "Zara was nervous about the swim test. She could float and kick, but she had never swum the whole length of the pool. Her coach said, \"Just keep going and don't look up until you touch the wall.\" Zara took a breath and pushed off. When her fingers bumped the tile, she popped up and heard her friends cheering.", qs: [
    ["How did Zara feel before the test?", "nervous", ["bored", "angry", "sleepy"], "The passage says \"Zara was nervous about the swim test.\""],
    ["What did the coach tell Zara?", "Keep going until you touch the wall.", ["Swim as slowly as you can.", "Stop halfway to rest.", "Look up at your friends."], "The coach said, \"Just keep going and don't look up until you touch the wall.\""],
    ["What happened at the end?", "Zara swam the whole length of the pool.", ["Zara quit the test.", "Zara forgot how to kick.", "The coach swam with her."], "Her fingers \"bumped the tile\" at the wall, so she made it all the way."],
    ["How did Zara's friends feel at the end?", "proud and excited", ["bored and sleepy", "upset and angry", "worried and scared"], "The passage says she \"heard her friends cheering.\""]] },
  { p: "Owls are excellent night hunters. Their huge eyes help them see in very dim light. Their ears are so sharp that they can hear a mouse moving under the snow. Special soft feathers let them fly almost silently, so their prey does not hear them coming.", qs: [
    ["What is the main idea?", "Owls have special features for hunting at night.", ["Mice live under the snow.", "Owls sleep all night.", "Feathers are soft."], "The first sentence says owls are \"excellent night hunters,\" and the rest explains why."],
    ["Why can owls fly almost silently?", "They have special soft feathers.", ["They fly very high.", "They only fly in winter.", "They flap very fast."], "The passage says \"Special soft feathers let them fly almost silently.\""],
    ["What can an owl hear under the snow?", "a mouse moving", ["a fish swimming", "a bird singing", "a frog croaking"], "The passage says they \"can hear a mouse moving under the snow.\""],
    ["What does the word dim most likely mean?", "not bright", ["very loud", "very cold", "very wet"], "Owls hunt at night, when the light is weak, so dim means not bright."]] },
  { p: "Ben and his sister Rosa built a lemonade stand. On the first day, they sold only three cups. Rosa noticed that people walking by were in a hurry and could not see their small sign. The next day they made a bigger, brighter sign and moved the stand closer to the park entrance. They sold forty cups.", qs: [
    ["Why did they sell so few cups the first day?", "People could not see the small sign.", ["The lemonade was too sour.", "It was raining all day.", "They ran out of cups."], "Rosa noticed people \"could not see their small sign.\""],
    ["What did Ben and Rosa change?", "a bigger sign and a better spot", ["a cheaper price", "a new lemonade flavor", "bigger cups"], "They \"made a bigger, brighter sign and moved the stand closer to the park entrance.\""],
    ["What is this passage mostly about?", "Ben and Rosa solved a problem with their stand.", ["Lemons are sour fruit.", "The park is very big.", "Rosa likes to draw signs."], "They had a problem, fixed it, and sold forty cups."],
    ["Which words best describe Rosa?", "a good problem solver", ["lazy and slow", "forgetful", "unkind to Ben"], "She figured out why few people stopped and helped fix it."]] },
  { p: "The giant sequoia trees of California are some of the largest living things on Earth. Some are more than two hundred feet tall and thousands of years old. Their thick bark protects them from fire and insects. After a forest fire, many sequoias are still standing, and the heat even helps their cones open and drop seeds.", qs: [
    ["What is the main idea?", "Giant sequoias are huge, old and tough trees.", ["Forest fires are very hot.", "California is a big state.", "Insects like to eat bark."], "The passage tells how big, old and fire-tough these trees are."],
    ["What protects sequoias from fire?", "their thick bark", ["their great height", "their tiny seeds", "their pine cones"], "The passage says \"Their thick bark protects them from fire and insects.\""],
    ["How can a fire help sequoias?", "The heat helps their cones drop seeds.", ["It makes the trees taller.", "It keeps insects in the bark.", "It turns the bark green."], "The passage says \"the heat even helps their cones open and drop seeds.\""],
    ["Which sentence is true about sequoias?", "Some are thousands of years old.", ["They are tiny bushes.", "They only grow in deserts.", "They live for just one year."], "The passage says some are \"thousands of years old.\""]] },
  { p: "When Leo's grandpa came to live with the family, Leo had to share his room. At first he grumbled about the extra bed and the snoring. But each night, Grandpa told stories about growing up on a farm, like the time a goat ate his hat. Soon Leo started going to bed early just to hear the next story.", qs: [
    ["How did Leo feel at first?", "annoyed", ["thrilled", "scared", "proud"], "The passage says \"At first he grumbled about the extra bed and the snoring.\""],
    ["Why did Leo start going to bed early?", "to hear Grandpa's next story", ["because he felt sick", "to get away from Grandpa", "because school started early"], "The passage says he went to bed early \"just to hear the next story.\""],
    ["How did Leo's feelings change?", "He went from grumpy to happy.", ["He went from happy to grumpy.", "He went from brave to scared.", "His feelings did not change."], "He grumbled at first, but soon he looked forward to bedtime."],
    ["What did the goat eat in Grandpa's story?", "Grandpa's hat", ["Leo's shoe", "the farm fence", "Grandpa's lunch"], "The passage mentions \"the time a goat ate his hat.\""]] },
  { p: "Sea turtles lay their eggs on sandy beaches. A mother turtle digs a hole with her flippers, lays her eggs, and covers them with sand. Then she returns to the ocean. About two months later, the baby turtles hatch and crawl toward the water, often at night when it is cooler and safer.", qs: [
    ["What is this passage mostly about?", "how baby sea turtles start their lives", ["why the ocean is salty", "how to build a sandcastle", "why turtles are slow on land"], "The passage tells how eggs are laid, hatch, and how babies reach the sea."],
    ["What does the mother turtle do after she covers the eggs?", "She returns to the ocean.", ["She stays to guard the eggs.", "She carries the eggs away.", "She sits on the eggs."], "The passage says \"Then she returns to the ocean.\""],
    ["How does the mother turtle dig the hole?", "with her flippers", ["with her shell", "with her mouth", "with a stick"], "The passage says she \"digs a hole with her flippers.\""],
    ["Why do baby turtles often crawl to the water at night?", "It is cooler and safer.", ["They are afraid of the sun.", "The water is warmer at night.", "Their mother calls them."], "The passage says \"often at night when it is cooler and safer.\""]] },
  { p: "Maya forgot her lines halfway through the class play. The stage went silent, and her face turned red. Then her friend Theo, who was playing the king, whispered the first few words. Maya nodded, took a breath and finished her speech. Afterward she gave Theo a big hug.", qs: [
    ["How did Maya feel when she forgot her lines?", "embarrassed", ["proud", "bored", "sleepy"], "The passage says \"her face turned red\" when the stage went silent."],
    ["How did Theo help Maya?", "He whispered the first few words.", ["He finished her speech for her.", "He turned off the lights.", "He told everyone to leave."], "The passage says Theo \"whispered the first few words.\""],
    ["Why did Maya hug Theo?", "to thank him for helping", ["because she was cold", "because he forgot his lines", "to say goodbye forever"], "Theo helped her remember, so the hug was a thank-you."],
    ["Who was Theo playing in the play?", "the king", ["a tree", "the queen", "a dragon"], "The passage says Theo \"was playing the king.\""]] },
  { p: "Hummingbirds are the only birds that can fly backward. Their wings beat so fast that they make a humming sound, which is how the birds got their name. Because flying uses so much energy, hummingbirds must eat often. They visit hundreds of flowers each day to drink sweet nectar.", qs: [
    ["How did hummingbirds get their name?", "Their wings make a humming sound.", ["They hum songs to their babies.", "They eat humming bugs.", "They were named after a person."], "The passage says their wings \"make a humming sound, which is how the birds got their name.\""],
    ["Why must hummingbirds eat often?", "Flying uses a lot of energy.", ["They have very big stomachs.", "Flowers close at night.", "They are always cold."], "The passage says \"Because flying uses so much energy, hummingbirds must eat often.\""],
    ["What do hummingbirds drink?", "sweet nectar from flowers", ["rainwater from leaves", "milk from their mothers", "juice from apples"], "The passage says they visit flowers \"to drink sweet nectar.\""],
    ["What can hummingbirds do that no other bird can?", "fly backward", ["fly very high", "swim underwater", "sing at night"], "The passage says they \"are the only birds that can fly backward.\""]] },
  { p: "The town of Pine Hollow had no place for kids to play. After school, children kicked balls in an empty lot full of weeds and rocks. A group of parents and kids went to a town meeting and asked for a park. They showed drawings of swings, slides and a soccer field. A year later, Pine Hollow opened its very first playground.", qs: [
    ["What is the main idea?", "People worked together to get a park.", ["Weeds grow in empty lots.", "Soccer is a fun sport.", "Town meetings are long."], "Parents and kids asked the town together, and a playground opened."],
    ["What was the problem in Pine Hollow?", "There was no place for kids to play.", ["The town had too many parks.", "The kids did not like soccer.", "The swings were broken."], "The first sentence says the town \"had no place for kids to play.\""],
    ["How did the group share their idea?", "They showed drawings at a town meeting.", ["They wrote a song about it.", "They built the park by themselves.", "They sent a letter to a newspaper."], "The passage says \"They showed drawings of swings, slides and a soccer field.\""],
    ["What was the empty lot like?", "full of weeds and rocks", ["clean and grassy", "covered with swings", "filled with water"], "The passage says it was \"an empty lot full of weeds and rocks.\""]] },
  { p: "Snowflakes form high in the clouds when tiny drops of water freeze onto bits of dust. As a snowflake falls, more water freezes onto it, building a six-sided pattern. Each snowflake takes its own path through the air, so no two grow in exactly the same way.", qs: [
    ["What is this passage mostly about?", "how snowflakes form", ["why snow is cold", "how to build a snowman", "where clouds come from"], "The passage explains each step of how a snowflake grows."],
    ["How many sides does a snowflake's pattern have?", "six", ["four", "five", "eight"], "The passage says snowflakes build \"a six-sided pattern.\""],
    ["Why do no two snowflakes grow the same way?", "Each one takes its own path through the air.", ["They are made of different dust.", "Some are colder than others.", "The wind cuts them apart."], "The passage says \"Each snowflake takes its own path through the air.\""],
    ["What does water freeze onto first?", "bits of dust", ["leaves on trees", "other raindrops", "the ground"], "The passage says water drops \"freeze onto bits of dust.\""]] },
  { p: "Diego's soccer team had lost every game that season. Before the last game, Coach Park said, \"Forget the score. Let's just pass the ball and have fun.\" The players laughed and cheered for each other all game long. They still lost, but on the bus ride home, everyone was singing.", qs: [
    ["What did Coach Park want the team to do?", "pass the ball and have fun", ["score ten goals", "stop playing soccer", "practice all night"], "The coach said, \"Let's just pass the ball and have fun.\""],
    ["How did the team feel at the end?", "happy", ["angry", "lonely", "scared"], "The passage says \"on the bus ride home, everyone was singing.\""],
    ["What lesson does this story teach?", "Having fun can matter more than winning.", ["You should always quit.", "Buses are fun to ride.", "Singing helps you score."], "They lost but were still happy because they had fun together."],
    ["Did the team win the last game?", "No, they lost.", ["Yes, by one goal.", "It was a tie.", "The game was canceled."], "The passage says \"They still lost.\""]] },
  { p: "Lighthouses were built to keep ships safe. Each one stands near rocks or a dangerous shore and shines a bright light at night. Every lighthouse flashes in its own pattern, so sailors can tell which one they are seeing. Today many ships use computers to find their way, but lighthouses still help on dark and foggy nights.", qs: [
    ["What is the main idea?", "Lighthouses help keep ships safe.", ["Sailors like bright lights.", "Rocks are dangerous.", "Computers are new."], "The first sentence says \"Lighthouses were built to keep ships safe.\""],
    ["Why does each lighthouse flash its own pattern?", "so sailors know which lighthouse it is", ["to look pretty at night", "to scare away fish", "because the bulbs are old"], "The passage says it flashes its own pattern \"so sailors can tell which one they are seeing.\""],
    ["Where are lighthouses built?", "near rocks or dangerous shores", ["in the middle of cities", "on top of ships", "deep in the forest"], "The passage says each one \"stands near rocks or a dangerous shore.\""],
    ["When are lighthouses still extra helpful today?", "on dark and foggy nights", ["on bright sunny days", "only in the summer", "when ships are docked"], "The passage says they \"still help on dark and foggy nights.\""]] },
  { p: "Ruby's little brother, Sam, was afraid of the dark. One night Ruby made a paper lantern and cut star shapes into its sides. When she put a small flashlight inside, tiny stars spread across the ceiling. Sam stared up and smiled. \"Can we leave it on until I fall asleep?\" he asked.", qs: [
    ["Why did Ruby make the lantern?", "to help Sam feel less afraid of the dark", ["to win an art contest", "to read a book in bed", "to wake Sam up"], "The first sentence says Sam \"was afraid of the dark,\" and the lantern made him smile."],
    ["What appeared on the ceiling?", "tiny stars", ["a bright moon", "colorful fish", "funny faces"], "The passage says \"tiny stars spread across the ceiling.\""],
    ["How did Sam feel when he saw the stars?", "calm and happy", ["scared and upset", "angry and grumpy", "bored and tired"], "The passage says \"Sam stared up and smiled.\""],
    ["Which word best describes Ruby?", "caring", ["selfish", "careless", "bossy"], "She made something special to help her brother feel safe."]] },
  { p: "Camels are well suited to life in the desert. They can go many days without drinking water. The hump on a camel's back stores fat, which its body can use for energy when food is hard to find. Long eyelashes and nostrils that can close help keep out blowing sand.", qs: [
    ["What is the main idea?", "Camels have body parts that help them in the desert.", ["Deserts are full of sand.", "Camels love to drink water.", "Eyelashes are long."], "The first sentence says camels \"are well suited to life in the desert.\""],
    ["What does a camel's hump store?", "fat", ["water", "sand", "food scraps"], "The passage says \"The hump on a camel's back stores fat.\""],
    ["How do camels keep out blowing sand?", "long eyelashes and nostrils that close", ["they hide in caves", "they bury their heads", "their hump blocks the sand"], "The passage says \"Long eyelashes and nostrils that can close help keep out blowing sand.\""],
    ["What can you infer about food in the desert?", "It can be hard to find.", ["It is easy to find.", "It grows everywhere.", "It falls from the sky."], "The passage says the hump helps \"when food is hard to find.\""]] },
];
addBank(9, "english", "reading9", 0.83, function () {
  const i = R(0, EN9_PASS.length - 1), P = EN9_PASS[i], [q, a, d, why] = pick(P.qs);
  return { q, vis: passage(P.p), say: `${P.p} ${q}`, opts: shuffle([a, ...d]), ans: a, why, extra: 25, key: "EN9r" + i + q };
});

/* ---------- Context Clues ---------- */
const EN9_CTX = [
  ["The baby was so drowsy that her eyes kept closing.", "drowsy", "sleepy", ["angry", "hungry", "noisy"]],
  ["The cheetah is so swift that it can outrun almost any animal.", "swift", "very fast", ["very slow", "very heavy", "very shy"]],
  ["The path was so narrow that we had to walk in a single line.", "narrow", "not wide", ["very long", "very muddy", "very bright"]],
  ["Jada was reluctant to jump into the cold lake, so she stood on the dock for a long time.", "reluctant", "not wanting to do something", ["very excited", "very good at it", "in a big hurry"]],
  ["The puppy was so filthy after rolling in the mud that it needed a bath.", "filthy", "very dirty", ["very small", "very sleepy", "very fast"]],
  ["The tiny seed will eventually grow into a tall tree, but it will take many years.", "eventually", "after a long time", ["right away", "never", "yesterday"]],
  ["The crowd was so immense that it filled the whole stadium.", "immense", "huge", ["quiet", "angry", "tiny"]],
  ["Grandpa is frugal; he saves his money and never buys things he doesn't need.", "frugal", "careful with money", ["very rich", "forgetful", "grumpy"]],
  ["The water in the pond was so murky that we could not see the fish.", "murky", "dark and cloudy", ["clear and clean", "very hot", "very cold"]],
  ["Owen was so anxious about the test that he couldn't sleep.", "anxious", "worried", ["bored", "proud", "silly"]],
  ["The rabbit was so nimble that it darted easily around every rock.", "nimble", "quick and light on its feet", ["slow and clumsy", "big and heavy", "sleepy and lazy"]],
  ["Liam was so ravenous after soccer practice that he ate three bowls of pasta.", "ravenous", "very hungry", ["very sleepy", "very cold", "very sad"]],
  ["The old map was so brittle that it cracked when we unfolded it.", "brittle", "dry and easy to crack", ["soft and stretchy", "wet and heavy", "shiny and new"]],
  ["Mom was delighted when we surprised her with breakfast in bed.", "delighted", "very pleased", ["upset", "confused", "sleepy"]],
  ["The weather was so frigid that we wore our heaviest coats and mittens.", "frigid", "very cold", ["very hot", "very windy", "very sunny"]],
  ["The garden was barren; nothing grew there at all.", "barren", "with no plants growing", ["full of flowers", "wet and muddy", "very noisy"]],
  ["My sister is so punctual that she has never been late to school.", "punctual", "on time", ["noisy", "forgetful", "sleepy"]],
  ["The squirrel tried to conceal its nuts by burying them under the leaves.", "conceal", "hide", ["eat", "count", "throw"]],
  ["The bridge was sturdy enough to hold a heavy truck.", "sturdy", "strong and solid", ["weak and shaky", "long and thin", "old and broken"]],
  ["The clown was so hilarious that everyone laughed until they cried.", "hilarious", "very funny", ["very sad", "very boring", "very scary"]],
  ["Our neighbor's dog is so docile that even toddlers can pet it.", "docile", "gentle and calm", ["wild and fierce", "loud and noisy", "fast and jumpy"]],
  ["The hikers reached the summit and could see the whole valley below.", "summit", "the top of a mountain", ["the bottom of a lake", "a dark cave", "a muddy river"]],
  ["After weeks without rain, the flowers began to wilt and droop.", "wilt", "become limp and droopy", ["grow taller", "bloom brightly", "turn greener"]],
  ["The singer's voice was so melodious that the whole room grew still to listen.", "melodious", "sweet-sounding", ["harsh and scratchy", "too quiet to hear", "out of breath"]],
  ["Please be considerate and keep your voice down in the library.", "considerate", "thinking of others", ["rude", "sleepy", "lost"]],
  ["Aunt Rosa gave a brief speech that lasted less than a minute.", "brief", "short", ["very long", "very loud", "very boring"]],
  ["The rocket will ascend into the sky after the countdown.", "ascend", "go up", ["go down", "stop", "turn around"]],
  ["The scuba diver began to descend toward the ocean floor.", "descend", "go down", ["go up", "swim away", "float on top"]],
  ["The magician wore a peculiar hat with a clock stuck on the front.", "peculiar", "strange or unusual", ["plain", "tiny", "broken"]],
  ["The thunder was so loud that it made our dog cower under the table.", "cower", "crouch down in fear", ["jump for joy", "fall asleep", "eat dinner"]],
  ["Lena was perplexed by the riddle and scratched her head.", "perplexed", "confused", ["delighted", "sleepy", "angry"]],
  ["The baker added an abundant amount of sprinkles, covering every inch of the cake.", "abundant", "plenty", ["very few", "none at all", "tiny"]],
  ["The fox was so cunning that it tricked the farmer's dog.", "cunning", "clever and sneaky", ["slow and silly", "kind and honest", "tired and weak"]],
  ["The shed was so dilapidated that its door was falling off.", "dilapidated", "old and falling apart", ["brand new", "freshly painted", "very tall"]],
  ["The lion let out a ferocious roar that shook the leaves.", "ferocious", "fierce and wild", ["gentle", "tiny", "sleepy"]],
  ["The mountain road was treacherous, with ice and sharp turns.", "treacherous", "dangerous", ["safe and easy", "straight", "sunny"]],
  ["The classroom was tranquil while everyone read silently.", "tranquil", "calm and quiet", ["loud and wild", "empty", "messy"]],
  ["Dad tried to persuade me to eat my broccoli by telling me it would make me strong.", "persuade", "convince", ["forget", "cook", "hide"]],
  ["The drive was tedious; we sat in traffic for hours with nothing to do.", "tedious", "long and boring", ["exciting", "short", "scary"]],
  ["The new student was hesitant to join the game, so she watched from the side first.", "hesitant", "unsure and slow to act", ["eager", "angry", "hungry"]],
  ["The fresh bread had a delicious aroma that filled the whole kitchen.", "aroma", "smell", ["color", "sound", "shape"]],
  ["We were fortunate that the rain stopped right before the picnic.", "fortunate", "lucky", ["sad", "late", "lost"]],
  ["The puppy was so exuberant that it jumped on everyone at the door.", "exuberant", "full of energy and excitement", ["tired and quiet", "sad and lonely", "sick and weak"]],
  ["The recipe said to combine the flour and sugar in one bowl.", "combine", "mix together", ["keep apart", "throw away", "freeze"]],
  ["Mr. Lee was so grateful for our help that he baked cookies for everyone.", "grateful", "thankful", ["angry", "jealous", "bored"]],
  ["The museum showed a replica of a dinosaur skeleton, not the real bones.", "replica", "a copy", ["the real thing", "a broken piece", "a living animal"]],
  ["The clue was so minuscule that the detective needed a magnifying glass to see it.", "minuscule", "very tiny", ["very large", "very bright", "very heavy"]],
  ["The puzzle was complex, with hundreds of pieces and no picture on the box.", "complex", "hard, with many parts", ["simple", "colorful", "broken"]],
  ["The glass was so transparent that you could see right through it.", "transparent", "clear enough to see through", ["very dark", "very thick", "full of cracks"]],
  ["The volunteers distributed blankets, handing one to each person.", "distributed", "handed out", ["collected", "washed", "bought"]],
  ["The baby bird was so frail that it could not stand up yet.", "frail", "weak", ["strong", "loud", "fast"]],
  ["The students were so boisterous at recess that the teacher could hear them from inside.", "boisterous", "noisy and lively", ["silent", "sleepy", "sad"]],
  ["My little cousin likes to mimic me, even copying the way I laugh.", "mimic", "copy", ["ignore", "teach", "hide from"]],
  ["The trail was so obscure that we almost walked right past it.", "obscure", "hard to see or find", ["easy to spot", "very wide", "freshly paved"]],
  ["Jamal is so diligent that he finishes every assignment early and checks his work twice.", "diligent", "hard-working", ["lazy", "careless", "late"]],
  ["The cat was content to nap in the warm sunshine all afternoon.", "content", "happy and satisfied", ["upset", "hungry", "scared"]],
  ["The twin puppies looked identical; even their owner had trouble telling them apart.", "identical", "exactly alike", ["very different", "very big", "very old"]],
  ["The chef will garnish the plate with a sprig of mint on top.", "garnish", "decorate food", ["wash dishes", "burn food", "throw away"]],
  ["The flood waters began to recede, and soon the streets were dry again.", "recede", "move back", ["rise higher", "freeze", "splash"]],
  ["Nora was envious of her friend's new bike and wished she had one too.", "envious", "jealous", ["proud", "sleepy", "helpful"]],
  ["The tired runner chose to persevere and finished the race.", "persevere", "keep going even when it's hard", ["give up", "fall asleep", "turn around"]],
  ["The rules were so rigid that no one was allowed to change even one.", "rigid", "strict and not able to change", ["silly", "easy", "fun"]],
  ["The palace was lavish, with gold walls and giant sparkling lights.", "lavish", "fancy and expensive", ["plain and simple", "small and dark", "old and broken"]],
  ["The fog was so dense that we couldn't see the house across the street.", "dense", "thick", ["thin", "warm", "pretty"]],
  ["The stubborn mule would not budge, even when the farmer pulled the rope.", "budge", "move a little", ["eat", "sleep", "cry"]],
  ["The puzzle pieces were scattered all over the floor.", "scattered", "spread out in many places", ["stacked in one pile", "glued together", "put away"]],
  ["The soup was bland, so Dad added salt and pepper.", "bland", "without much flavor", ["too spicy", "too hot", "too salty"]],
  ["The children were eager to open their presents and could hardly wait.", "eager", "excited and wanting to", ["afraid", "bored", "too tired"]],
  ["We had to abandon our sandcastle when the tide came in.", "abandon", "leave behind", ["build", "decorate", "measure"]],
  ["The bath water was tepid, not hot and not cold.", "tepid", "slightly warm", ["boiling hot", "freezing cold", "very deep"]],
  ["Kai is so absent-minded that he wore two different shoes to school.", "absent-minded", "forgetful", ["very neat", "very fast", "very tall"]],
  ["The cookies were so scrumptious that we ate every last one.", "scrumptious", "delicious", ["burned", "tiny", "too salty"]],
  ["The ground was so parched that it had big cracks in it.", "parched", "very dry", ["very wet", "very soft", "very green"]],
  ["The lost hikers were relieved when they spotted the trail sign.", "relieved", "glad a worry is over", ["nervous", "angry", "lonely"]],
  ["Our class will collaborate on the mural, with everyone painting one part.", "collaborate", "work together", ["work alone", "argue", "quit"]],
  ["The baby was so irritable without her nap that she cried at everything.", "irritable", "easily upset", ["cheerful", "quiet", "brave"]],
  ["The magician seemed to levitate, floating high above the stage.", "levitate", "float in the air", ["fall down", "run away", "disappear"]],
  ["The old oak tree was colossal, taller than any building in town.", "colossal", "gigantic", ["tiny", "young", "bare"]],
  ["Mrs. Diaz praised the class for their excellent behavior.", "praised", "said nice things about", ["scolded", "ignored", "forgot"]],
  ["The creek was so shallow that we could walk across it without getting our knees wet.", "shallow", "not deep", ["very deep", "very fast", "very cold"]],
  ["The library is a sanctuary for Mia, a quiet, safe place where she can relax.", "sanctuary", "a safe, peaceful place", ["a noisy crowd", "a scary room", "a busy store"]],
  ["The beeping from the truck was constant; it did not stop all day.", "constant", "never stopping", ["very quiet", "only once", "very short"]],
  ["Pablo is so courteous that he holds the door for everyone.", "courteous", "polite", ["rude", "sleepy", "shy"]],
  ["The puppy was clumsy and kept tripping over its own feet.", "clumsy", "not steady when moving", ["graceful", "quiet", "quick"]],
  ["It was a sweltering summer day, and everyone was sweating.", "sweltering", "very hot and sticky", ["cool and breezy", "cold and snowy", "dark and rainy"]],
];
addBank(9, "english", "context", 0.8, function () {
  const [s, w, m, d] = pick(EN9_CTX);
  return { q: `What does <b>${w}</b> mean?<div class="sentence">${hlWord(s, w)}</div>`, say: `What does ${w} mean? ${s}`, opts: shuffle([m, ...d]), ans: m, why: `The clues in the sentence show that ${w} means ${m}.`, key: "EN9" + w };
});

/* ---------- Idioms (two ways: meaning, and which idiom) ---------- */
const EN9_IDI = [
  ["Let's get the ball rolling.", "Let's get started.", ["Let's play a ball game.", "Let's roll down a hill.", "Let's take a break."]],
  ["Hang in there!", "Don't give up.", ["Hold on to a rope.", "Hang up your coat.", "Go take a nap."]],
  ["It's time to hit the hay.", "It's time to go to bed.", ["It's time to feed the horses.", "It's time to clean the barn.", "It's time to play outside."]],
  ["Let me sleep on it.", "Let me think about it overnight.", ["Let me take a nap on it.", "Let me lie down on the floor.", "Let me forget about it."]],
  ["Time to hit the road.", "Time to leave.", ["Time to fix the road.", "Time to play in the street.", "Time to stay home."]],
  ["Time flies when you're having fun.", "Time seems to pass quickly.", ["Clocks can fly.", "Time stops completely.", "Fun is very slow."]],
  ["That name rings a bell.", "That name sounds familiar.", ["That name is very loud.", "That name is a bell.", "That name is brand new to me."]],
  ["My sister and I see eye to eye.", "We agree.", ["We stare at each other.", "We have the same eyes.", "We argue a lot."]],
  ["Can you lend a hand?", "Can you help?", ["Can you give me your hand?", "Can you clap your hands?", "Can you wave goodbye?"]],
  ["Please keep an eye on my bike.", "Please watch my bike.", ["Please put your eye on it.", "Please paint my bike.", "Please ride my bike."]],
  ["Zip your lip!", "Stay quiet.", ["Close your jacket.", "Open your mouth.", "Talk louder."]],
  ["The idea came out of the blue.", "It came suddenly and unexpectedly.", ["It came from the sky.", "It was colored blue.", "It took years to think of."]],
  ["He has his head in the clouds.", "He is daydreaming.", ["He is very tall.", "He is flying a plane.", "He is paying close attention."]],
  ["Our coach is very down to earth.", "Our coach is sensible and easy to talk to.", ["Our coach likes to dig.", "Our coach is very short.", "Our coach is always bossy."]],
  ["Recess helps us let off steam.", "It helps us get rid of extra energy.", ["It helps us cook food.", "It helps us fix a train.", "It helps us stay still."]],
  ["She passed the test with flying colors.", "She did very well.", ["She painted the test.", "She threw her test in the air.", "She barely passed."]],
  ["Those plastic rings are a dime a dozen.", "They are very common and easy to find.", ["They cost exactly ten cents.", "They come in boxes of twelve.", "They are very rare."]],
  ["On my first day, I felt like a fish out of water.", "I felt out of place.", ["I felt thirsty.", "I felt like swimming.", "I felt right at home."]],
  ["Keep your fingers crossed!", "Hope for good luck.", ["Don't use your hands.", "Your fingers are tangled.", "Give up hope."]],
  ["The early bird catches the worm.", "People who start early do well.", ["Birds wake up hungry.", "Worms come out at night.", "It is best to sleep late."]],
  ["I'll clean my room when pigs fly.", "It will never happen.", ["It will happen soon.", "It will happen on the farm.", "It will happen every day."]],
  ["We have to walk on eggshells around him today.", "We must be careful not to upset him.", ["We must step on eggs.", "We must walk very fast.", "We can say anything we want."]],
  ["They stayed friends through thick and thin.", "They stayed friends in good times and bad.", ["They stayed friends while eating.", "They were only friends on sunny days.", "They were thick and thin."]],
  ["Looking for my lost sock was a wild goose chase.", "It was a pointless search.", ["I chased a goose.", "It was a fun race.", "I found it right away."]],
  ["This year I'm going to turn over a new leaf.", "I'm going to start acting better.", ["I'm going to rake the leaves.", "I'm going to read a new page.", "I'm going to keep my bad habits."]],
  ["Two heads are better than one.", "Working together helps.", ["Two hats are better.", "Monsters have two heads.", "It's better to work alone."]],
  ["Grandpa gets a kick out of my jokes.", "Grandpa really enjoys my jokes.", ["Grandpa kicks a ball.", "Grandpa gets hurt by my jokes.", "Grandpa dislikes my jokes."]],
  ["Don't judge a book by its cover.", "Don't judge something by how it looks.", ["Don't read old books.", "Only read books with nice covers.", "Covers tell you the whole story."]],
  ["I'm still on the fence about joining the club.", "I can't decide yet.", ["I'm sitting on a fence.", "I already joined.", "I'm painting a fence."]],
  ["Sit tight until I get back.", "Wait patiently.", ["Sit in a tiny chair.", "Squeeze into your seat.", "Leave right now."]],
  ["Dad got up on the wrong side of the bed.", "Dad is grumpy today.", ["Dad fell out of bed.", "Dad's bed is broken.", "Dad is very cheerful."]],
  ["Don't bite off more than you can chew.", "Don't take on more than you can handle.", ["Take smaller bites of food.", "Don't eat too fast.", "Always try to do everything."]],
  ["Making a sandwich isn't rocket science.", "It's not hard to understand.", ["It's about space travel.", "It's very difficult.", "It's a science project."]],
  ["I have butterflies in my stomach.", "I feel nervous.", ["I ate a butterfly.", "My stomach hurts from food.", "I feel calm and relaxed."]],
  ["Don't cry wolf.", "Don't call for help when you don't need it.", ["Don't be afraid of wolves.", "Don't howl at the moon.", "Don't cry when you're sad."]],
  ["A funny game can help break the ice.", "It can help people feel comfortable talking.", ["It can crack the ice on a pond.", "It can make a room cold.", "It can make people feel shy."]],
  ["In a nutshell, the movie was about friendship.", "In a few words, the movie was about friendship.", ["The movie was inside a nut.", "The movie was about squirrels.", "The movie was very long."]],
  ["Can I take a rain check?", "Can we do it another time?", ["Can I check if it's raining?", "Can I bring an umbrella?", "Can we do it right now?"]],
  ["Are you pulling my leg?", "Are you joking with me?", ["Are you tugging my foot?", "Are you helping me walk?", "Are you feeling sick?"]],
  ["The ball is in your court.", "It's your turn to decide.", ["You have the ball now.", "We are playing tennis.", "Someone else will decide."]],
  ["Don't cut corners on your homework.", "Don't do it the quick, sloppy way.", ["Don't use scissors on it.", "Don't fold the paper.", "Don't finish your homework."]],
  ["The party got out of hand.", "The party got out of control.", ["Someone dropped the party.", "The party ended early.", "The party was calm."]],
  ["Saving money is easier said than done.", "It's harder to do than to talk about.", ["It's easy to do.", "Talking is hard.", "It's done already."]],
  ["Actions speak louder than words.", "What you do matters more than what you say.", ["Actions make noise.", "Shouting is best.", "Words are always enough."]],
  ["Every cloud has a silver lining.", "Something good can come from something bad.", ["Clouds are made of silver.", "It will rain soon.", "Bad things are always bad."]],
  ["You'll get the hang of it.", "You'll learn how to do it.", ["You'll hang it on the wall.", "You'll hang upside down.", "You'll never learn it."]],
  ["The plan failed, so we're back to square one.", "We have to start over.", ["We have to draw a square.", "We are in first place.", "We are almost done."]],
  ["The new puppy is the apple of her eye.", "The puppy is very special to her.", ["The puppy eats apples.", "The puppy has red eyes.", "She does not like the puppy."]],
  ["Our teacher always goes the extra mile.", "She does more than she has to.", ["She runs an extra mile.", "She lives far away.", "She does as little as she can."]],
  ["Stop beating around the bush.", "Say what you mean directly.", ["Stop hitting the bushes.", "Stop gardening.", "Talk more slowly."]],
];
addBank(9, "english", "idioms", 0.82, function () {
  const i = R(0, EN9_IDI.length - 1), [s, m, d] = EN9_IDI[i];
  if (Math.random() < 0.5) return { q: "What does this idiom mean?", say: `What does this idiom mean? ${s}`, vis: `<div class="quote">${s}</div>`, opts: shuffle([m, ...d]), ans: m, why: `"${s}" means: ${m}`, key: "EN9a" + s };
  const others = shuffle(EN9_IDI.filter((_, j) => j !== i)).slice(0, 3).map(x => x[0]);
  return { q: `Which idiom means <b>"${m}"</b>?`, say: `Which idiom means: ${m}`, opts: shuffle([s, ...others]), ans: s, why: `"${s}" means: ${m}`, key: "EN9b" + s };
});

/* ---------- Linking Words ---------- */
const EN9_LWHY = { and: "And adds one more idea.", but: "But shows a contrast or surprise.", so: "So shows a result.", because: "Because gives a reason.", or: "Or gives a choice.", before: "Before shows what happens first.", after: "After shows what happens later.", when: "When tells the time something happens.", until: "Until shows when something stops.", if: "If shows that one thing depends on another.", although: "Although shows a surprise between two ideas.", while: "While shows two things happening at the same time." };
const EN9_LINK = [
  ["Tia was thirsty, ___ she drank a glass of water.", "so", ["or", "because", "if"]],
  ["We wore our coats ___ it was chilly outside.", "because", ["or", "so", "although"]],
  ["Max wanted to stay up late, ___ his mom said no.", "but", ["or", "if"]],
  ["Would you like a red balloon ___ a blue one?", "or", ["because", "so", "but"]],
  ["Put away your toys ___ you go outside.", "before", ["but", "although", "or"]],
  ["Wake me up ___ we get to Grandma's house.", "when", ["or", "but", "because"]],
  ["Ana likes to paint ___ draw.", "and", ["because", "so", "until"]],
  ["I will help you clean up ___ we finish the game.", "after", ["although", "but", "because"]],
  ["We can play outside ___ it stops raining.", "when", ["but", "or", "so"]],
  ["The ice cream melted ___ the day was so hot.", "because", ["or", "but", "until"]],
  ["Jayden studied all week, ___ he still felt nervous before the test.", "but", ["because", "or", "so"]],
  ["Do you want to read a book ___ play a game?", "or", ["because", "so", "until"]],
  ["The dog wagged its tail ___ it saw its owner.", "when", ["or", "but", "although"]],
  ["Mia practiced her piano piece every day, ___ she played it perfectly at the recital.", "so", ["or", "because", "if"]],
  ["We waited at the bus stop ___ the bus finally came.", "until", ["or", "so", "because"]],
  ["You can have dessert ___ you finish your dinner.", "if", ["but", "so", "although"]],
  ["The kitten was tiny, ___ it was very brave.", "but", ["so", "or", "because"]],
  ["Leo put on sunscreen ___ he went to the beach.", "before", ["or", "but", "until"]],
  ["Dad hummed a song ___ he cooked dinner.", "while", ["or", "so", "but"]],
  ["The lights went out, ___ we grabbed our flashlights.", "so", ["or", "because", "until"]],
  ["We packed apples, grapes ___ crackers for the trip.", "and", ["but", "so", "because"]],
  ["Sara missed the bus ___ she woke up late.", "because", ["or", "but", "so"]],
  ["___ it was raining, we still had fun at the zoo.", "Although", ["Because", "So", "Or"]],
  ["My brother is tall, ___ I am short.", "but", ["so", "because", "or"]],
  ["Please be quiet ___ the baby is sleeping.", "because", ["or", "but", "before"]],
  ["We can walk to school ___ ride our bikes.", "or", ["because", "so", "until"]],
  ["The plant grew tall ___ it got lots of sunlight.", "because", ["or", "but", "until"]],
  ["Nico was full, ___ he still ate a slice of pie.", "but", ["because", "so", "or"]],
  ["Brush your teeth ___ you go to bed.", "before", ["or", "but", "so"]],
  ["The movie was long, ___ we didn't get bored.", "but", ["because", "so", "or"]],
  ["It started to snow, ___ we built a snowman.", "so", ["or", "because", "until"]],
  ["Grandpa reads the newspaper ___ he drinks his coffee.", "while", ["or", "so", "because"]],
  ["We stayed at the park ___ the sun went down.", "until", ["or", "so", "because"]],
  ["Ella forgot her lunch, ___ her friend shared a sandwich.", "so", ["or", "because", "until"]],
  ["The water was cold, ___ we jumped in anyway.", "but", ["because", "so", "or"]],
  ["Would you rather have pancakes ___ waffles for breakfast?", "or", ["because", "so", "but"]],
  ["The puppy chewed my shoe ___ I left it on the floor.", "because", ["or", "but", "until"]],
  ["We cheered loudly ___ our team scored a goal.", "when", ["or", "but", "although"]],
  ["Lily ate breakfast ___ she went to school.", "before", ["or", "because", "but"]],
  ["The baby cried ___ she was hungry.", "because", ["or", "but", "so"]],
  ["I like soccer ___ basketball.", "and", ["because", "so", "until"]],
  ["Sam wanted to win, ___ he trained every day.", "so", ["or", "until", "although"]],
  ["The road was closed, ___ we took a different way.", "so", ["or", "because", "until"]],
  ["Put on your boots ___ you go out in the snow.", "before", ["or", "but", "so"]],
  ["The cat hid under the bed ___ it heard thunder.", "when", ["or", "but", "so"]],
  ["We can go to the beach ___ it is sunny tomorrow.", "if", ["but", "or", "so"]],
  ["The cookies smelled great, ___ they tasted even better.", "and", ["because", "or", "until"]],
  ["Jada was nervous, ___ she gave a great speech.", "but", ["because", "so", "or"]],
  ["We will eat dinner ___ Dad gets home.", "when", ["or", "but", "so"]],
  ["Turn off the lights ___ you leave the room.", "when", ["or", "but", "so"]],
  ["The library was quiet, ___ I could focus on my book.", "so", ["or", "until", "although"]],
  ["Is your birthday in June ___ July?", "or", ["because", "so", "but"]],
  ["The bread was stale ___ it was left out all night.", "because", ["or", "but", "until"]],
  ["Owen likes pizza, ___ his sister likes tacos.", "but", ["because", "so", "or"]],
  ["I always stretch ___ I run a race.", "before", ["or", "so", "although"]],
  ["The kids played tag ___ the bell rang.", "until", ["or", "because", "so"]],
  ["Mom read me a story ___ I fell asleep.", "until", ["or", "because", "if"]],
  ["She was tired, ___ she went to bed early.", "so", ["or", "because", "if"]],
  ["My bike has a flat tire, ___ I will walk to school.", "so", ["or", "because", "until"]],
  ["Keep your hands inside the car ___ it is moving.", "while", ["or", "so", "but"]],
  ["We will go sledding ___ it snows.", "if", ["but", "or", "so"]],
  ["The bird flew away ___ the cat came close.", "when", ["or", "but", "so"]],
  ["Liam lost his tooth, ___ he put it under his pillow.", "so", ["or", "because", "until"]],
  ["We bought milk, eggs ___ bread at the store.", "and", ["so", "because", "until"]],
  ["The sun came out ___ the storm ended.", "after", ["or", "but", "so"]],
  ["It was dark outside, ___ we turned on the porch light.", "so", ["or", "because", "if"]],
  ["Zoe smiled ___ she opened her present.", "when", ["or", "but", "although"]],
  ["The tree lost its leaves ___ it was fall.", "because", ["or", "but", "until"]],
  ["I could ride my bike ___ walk to the store.", "or", ["because", "so", "until"]],
  ["Ava is small, ___ she can lift heavy boxes.", "but", ["so", "because", "or"]],
  ["We looked for the lost cat ___ we found it under the porch.", "until", ["or", "because", "if"]],
  ["The game was canceled ___ of the storm.", "because", ["or", "but", "so"]],
  ["Jack washed the dishes, ___ Kim dried them.", "and", ["because", "or", "until"]],
  ["We ran inside ___ it started to hail.", "when", ["or", "but", "until"]],
  ["The room was messy, ___ we cleaned it up.", "so", ["or", "because", "if"]],
  ["Rosa raised her hand ___ she knew the answer.", "because", ["or", "until", "but"]],
  ["Should we take the stairs ___ the elevator?", "or", ["because", "so", "until"]],
  ["The music was loud, ___ I covered my ears.", "so", ["or", "because", "if"]],
  ["My grandma knits scarves ___ hats.", "and", ["because", "so", "until"]],
  ["Wait for the green light ___ you cross the street.", "before", ["or", "but", "so"]],
  ["The snowman melted ___ the sun came out.", "when", ["or", "but", "until"]],
  ["___ we got home, we took off our muddy shoes.", "When", ["Or", "But", "So"]],
  ["Noah was sleepy, ___ he kept reading his book.", "but", ["because", "so", "or"]],
  ["Close the gate ___ the dog doesn't get out.", "so", ["or", "but", "until"]],
  ["I like summer ___ I can swim every day.", "because", ["or", "but", "until"]],
];
addBank(9, "english", "linking", 0.8, function () {
  const [s, a, d] = pick(EN9_LINK);
  return { q: `<div class="sentence">${s.replace("___", '<span class="blank">___</span>')}</div>Which linking word fits best?`, say: `${s.replace("___", "blank")} Which linking word fits best?`, opts: shuffle([a, ...d]), ans: a, big: 1, why: `${EN9_LWHY[a.toLowerCase()]} ${s.replace("___", a)}`, key: "EN9" + s };
});

/* ---------- Adverbs (same two question styles as the topic) ---------- */
const EN9_ADV = [
  ["Maria quietly closed the door.", "quietly", "how"], ["The dog barked angrily at the squirrel.", "angrily", "how"], ["Jin carefully painted the fence.", "carefully", "how"],
  ["The children cheered loudly for their team.", "loudly", "how"], ["The rabbit hopped quickly across the yard.", "quickly", "how"], ["Grandma smiled warmly at us.", "warmly", "how"],
  ["The snail crawled slowly along the leaf.", "slowly", "how"], ["Ava answered the question correctly.", "correctly", "how"], ["The baby slept peacefully in her crib.", "peacefully", "how"],
  ["Ben neatly folded his clothes.", "neatly", "how"], ["The wind blew gently through the trees.", "gently", "how"], ["Kai bravely climbed the tall ladder.", "bravely", "how"],
  ["Lena politely asked for more juice.", "politely", "how"], ["The horse galloped swiftly across the field.", "swiftly", "how"], ["Ella waved excitedly at the parade.", "excitedly", "how"],
  ["Noah whispered secretly to his friend.", "secretly", "how"], ["Ruby read her book silently.", "silently", "how"], ["Our team played well.", "well", "how"],
  ["Aunt Lisa drove safely through the snow.", "safely", "how"], ["The chef chopped the carrots quickly.", "quickly", "how"],
  ["We will visit the museum tomorrow.", "tomorrow", "when"], ["Yesterday it snowed in our town.", "Yesterday", "when"], ["Omar finished his homework early.", "early", "when"],
  ["The guests arrived late for dinner.", "late", "when"], ["I will clean my room later.", "later", "when"], ["Today we are going to the beach.", "Today", "when"],
  ["Mia arrived early on Saturday.", "early", "when"], ["We finally reached the top of the hill.", "finally", "when"], ["My cousin is coming to visit soon.", "soon", "when"],
  ["Tonight we will watch the stars.", "Tonight", "when"], ["I saw a rainbow yesterday.", "yesterday", "when"], ["Call Grandpa today.", "today", "when"],
  ["The show starts tomorrow.", "tomorrow", "when"], ["Recently, our class planted a garden.", "Recently", "when"],
  ["The puppy waited outside.", "outside", "where"], ["Leave your muddy boots downstairs.", "downstairs", "where"], ["The balloon floated upward.", "upward", "where"],
  ["We looked everywhere for the keys.", "everywhere", "where"], ["The cat is hiding somewhere.", "somewhere", "where"], ["The kids ran inside.", "inside", "where"],
  ["A plane flew overhead.", "overhead", "where"], ["The bird flew away.", "away", "where"], ["Grandpa lives nearby.", "nearby", "where"],
  ["The dog raced ahead.", "ahead", "where"], ["We ate our picnic outdoors.", "outdoors", "where"], ["The fish swam downstream.", "downstream", "where"],
  ["The children waited downstairs.", "downstairs", "where"], ["The swimmers dove underwater.", "underwater", "where"],
];
addBank(9, "english", "adverbs", 0.8, function () {
  const [s, a, t] = pick(EN9_ADV);
  if (Math.random() < 0.5) return { q: `Which word is the <b>adverb</b>?<div class="sentence">${s}</div>`, say: `Which word is the adverb? ${s}`, opts: sentOpts(s, a, ["table", "garden", "jumped", "red"]), ans: a, big: 1, why: `${cap(a)} tells ${t} about the verb.`, key: "EN9a" + s };
  return { q: `Does <b>${a.toLowerCase()}</b> tell how, when, or where?<div class="sentence">${hlWord(s, a)}</div>`, say: `In this sentence, does ${a} tell how, when, or where? ${s}`, opts: ["how", "when", "where"], ans: t, big: 1, why: `${cap(a)} tells ${t}.`, key: "EN9t" + s };
});

/* ---------- Suffixes ---------- */
const EN9_SMEAN = { ful: "full of", less: "without", ly: "in a ___ way", ness: "the state of being", er: "a person who", able: "able to be", ment: "the act of" };
const EN9_SUFF = [
  ["playful", "play", "ful", "full of play"], ["powerful", "power", "ful", "full of power"], ["cheerful", "cheer", "ful", "full of cheer"], ["peaceful", "peace", "ful", "full of peace"],
  ["graceful", "grace", "ful", "full of grace"], ["truthful", "truth", "ful", "full of truth"], ["fearful", "fear", "ful", "full of fear"], ["skillful", "skill", "ful", "full of skill"],
  ["careless", "care", "less", "without care"], ["spotless", "spot", "less", "without a spot"], ["sleepless", "sleep", "less", "without sleep"], ["harmless", "harm", "less", "without harm"],
  ["cloudless", "cloud", "less", "without clouds"], ["toothless", "tooth", "less", "without teeth"], ["pointless", "point", "less", "without a point"],
  ["slowly", "slow", "ly", "in a slow way"], ["bravely", "brave", "ly", "in a brave way"], ["sadly", "sad", "ly", "in a sad way"], ["neatly", "neat", "ly", "in a neat way"],
  ["kindly", "kind", "ly", "in a kind way"], ["proudly", "proud", "ly", "in a proud way"], ["safely", "safe", "ly", "in a safe way"], ["wisely", "wise", "ly", "in a wise way"],
  ["happiness", "happy", "ness", "being happy"], ["goodness", "good", "ness", "being good"], ["fairness", "fair", "ness", "being fair"], ["illness", "ill", "ness", "being ill"],
  ["softness", "soft", "ness", "being soft"], ["weakness", "weak", "ness", "being weak"], ["brightness", "bright", "ness", "being bright"],
  ["baker", "bake", "er", "a person who bakes"], ["farmer", "farm", "er", "a person who farms"], ["dancer", "dance", "er", "a person who dances"], ["writer", "write", "er", "a person who writes"],
  ["helper", "help", "er", "a person who helps"], ["reader", "read", "er", "a person who reads"], ["swimmer", "swim", "er", "a person who swims"], ["builder", "build", "er", "a person who builds"],
  ["washable", "wash", "able", "able to be washed"], ["breakable", "break", "able", "able to be broken"], ["fixable", "fix", "able", "able to be fixed"],
  ["bendable", "bend", "able", "able to be bent"], ["readable", "read", "able", "able to be read"], ["wearable", "wear", "able", "able to be worn"],
  ["payment", "pay", "ment", "the act of paying"], ["movement", "move", "ment", "the act of moving"], ["improvement", "improve", "ment", "the act of improving"],
  ["announcement", "announce", "ment", "the act of announcing"], ["measurement", "measure", "ment", "the act of measuring"], ["agreement", "agree", "ment", "the act of agreeing"],
];
addBank(9, "english", "suffixes", 0.8, function () {
  const [w, b, s, m] = pick(EN9_SUFF), sm = EN9_SMEAN[s].replace("___", "certain");
  if (Math.random() < 0.5) {
    const others = shuffle(EN9_SUFF.filter(x => x[2] !== s)).slice(0, 3).map(x => x[3]);
    return { q: `What does <b>${w}</b> mean?`, say: `What does ${w} mean?`, opts: shuffle([m, ...others]), ans: m, why: `-${s} means "${sm}", so ${w} means ${m}.`, key: "EN9m" + w };
  }
  const opts = shuffle(Object.keys(EN9_SMEAN).filter(x => x !== s)).slice(0, 3).concat(s).map(x => "-" + x);
  return { q: `Which suffix turns <b>${b}</b> into a word that means <b>"${m}"</b>?`, say: `Which suffix turns ${b} into a word that means ${m}?`, opts: shuffle(opts), ans: "-" + s, big: 1, why: `${b} + -${s} makes ${w}, which means ${m}.`, key: "EN9s" + w };
});

/* ---------- Homophones ---------- */
const EN9_HOMO = [
  ["Mom picked a pretty ___ from the garden.", "flower", ["flour"], "a bloom on a plant"], ["We need ___ to bake the bread.", "flour", ["flower"], "a powder used for baking"],
  ["The ___ wore shiny armor.", "knight", ["night"], "a soldier in armor long ago"], ["The owl hunts at ___.", "night", ["knight"], "the dark time after evening"],
  ["The ___ is shining brightly today.", "sun", ["son"], "the star that lights our day"], ["Mr. Ross took his ___ fishing.", "son", ["sun"], "a boy child"],
  ["There are seven days in a ___.", "week", ["weak"], "seven days"], ["After being sick, I felt ___.", "weak", ["week"], "not strong"],
  ["Let's ___ at the library after school.", "meet", ["meat"], "come together"], ["The ___ is cooking on the grill.", "meat", ["meet"], "food that comes from animals"],
  ["Did we get any ___ today?", "mail", ["male"], "letters and packages"], ["A ___ lion has a big, shaggy mane.", "male", ["mail"], "a boy or man, or a boy animal"],
  ["The toys are on ___ for half price.", "sale", ["sail"], "selling at a lower price"], ["We will ___ the boat across the lake.", "sail", ["sale"], "travel on water in a boat"],
  ["We ___ our bikes to the park.", "rode", ["road"], "the past of ride"], ["The ___ to Grandma's house is bumpy.", "road", ["rode"], "a street"],
  ["The dog dug a ___ in the yard.", "hole", ["whole"], "an opening or empty space"], ["I ate the ___ sandwich by myself.", "whole", ["hole"], "all of it"],
  ["A spider has ___ legs.", "eight", ["ate"], "the number 8"], ["We ___ pancakes for breakfast.", "ate", ["eight"], "the past of eat"],
  ["Our team ___ the game!", "won", ["one"], "the past of win"], ["I have only ___ brother.", "one", ["won"], "the number 1"],
  ["She ___ all the words to the song.", "knows", ["nose"], "has it in her mind"], ["My ___ is stuffy from my cold.", "nose", ["knows"], "the part of your face you smell with"],
  ["The ___ flew high above the clouds.", "plane", ["plain"], "an airplane"], ["I like ___ toast with nothing on it.", "plain", ["plane"], "simple, with nothing added"],
  ["A ___ ran into the forest.", "deer", ["dear"], "a forest animal with hooves"], ["She began her letter with \"___ Grandma.\"", "Dear", ["Deer"], "loved, used to start a letter"],
  ["We saw a brown ___ at the zoo.", "bear", ["bare"], "a big furry animal"], ["The trees were ___ in winter.", "bare", ["bear"], "with nothing covering it"],
  ["Ava ___ the ball to me.", "threw", ["through"], "the past of throw"], ["We walked ___ the tunnel.", "through", ["threw"], "in one side and out the other"],
  ["May I have a ___ of cake?", "piece", ["peace"], "a part of something"], ["The library is a place of ___ and quiet.", "peace", ["piece"], "calm, with no fighting"],
  ["The movie lasted one ___.", "hour", ["our"], "sixty minutes"], ["This is ___ new house.", "our", ["hour"], "belongs to us"],
  ["The bird ___ back to its nest.", "flew", ["flu"], "the past of fly"], ["I stayed home sick with the ___.", "flu", ["flew"], "an illness"],
  ["It isn't polite to ___ at people.", "stare", ["stair"], "look for a long time"], ["I sat on the bottom ___.", "stair", ["stare"], "one step in a set of steps"],
  ["Grandma will ___ a button on my coat.", "sew", ["so"], "stitch with a needle and thread"], ["I was tired, ___ I took a nap.", "so", ["sew"], "for that reason"],
  ["I was ___ with nothing to do.", "bored", ["board"], "not interested"], ["The teacher wrote on the ___.", "board", ["bored"], "a flat surface to write on"],
  ["A dog has ___ legs.", "four", ["for"], "the number 4"], ["This gift is ___ you.", "for", ["four"], "meant to go to"],
  ["She brushed her long ___.", "hair", ["hare"], "what grows on your head"], ["The ___ hopped across the field.", "hare", ["hair"], "an animal like a big rabbit"],
  ["The cut on my knee will ___ soon.", "heal", ["heel"], "get better"], ["I have a blister on my ___.", "heel", ["heal"], "the back part of your foot"],
  ["Do you ___ the answer?", "know", ["no"], "have it in your mind"], ["There is ___ milk left.", "no", ["know"], "not any"],
  ["Tie a ___ in the rope.", "knot", ["not"], "a tied loop"], ["I am ___ hungry right now.", "not", ["knot"], "a word that makes something untrue"],
  ["Please ___ for the bus.", "wait", ["weight"], "stay until something happens"], ["The nurse checked my ___.", "weight", ["wait"], "how heavy something is"],
  ["___ coat is yours?", "Which", ["Witch"], "what one"], ["She dressed as a ___ for the costume party.", "witch", ["which"], "a magic character in stories"],
  ["The table is made of ___.", "wood", ["would"], "what trees are made of"], ["___ you like some juice?", "Would", ["Wood"], "a polite way to ask"],
  ["Leo ___ his shoes.", "tied", ["tide"], "the past of tie"], ["The ___ came in and covered the sand.", "tide", ["tied"], "the rising and falling of the sea"],
  ["We filled a ___ with sand.", "pail", ["pale"], "a bucket"], ["Her face looked ___ when she was sick.", "pale", ["pail"], "light in color"],
  ["The cat licked its ___.", "paws", ["pause"], "an animal's feet"], ["Let's ___ the movie for a snack.", "pause", ["paws"], "stop for a short time"],
  ["We will ___ lemonade at our stand.", "sell", ["cell"], "trade for money"], ["A ___ is a tiny part of a living thing.", "cell", ["sell"], "a tiny building block of life"],
  ["The dog likes to ___ its bones.", "bury", ["berry"], "hide in the ground"], ["I found a ripe ___ on the bush.", "berry", ["bury"], "a small juicy fruit"],
  ["Bring an umbrella in case of ___.", "rain", ["reign", "rein"], "water falling from clouds"], ["The queen's ___ lasted fifty years.", "reign", ["rain", "rein"], "the time a king or queen rules"],
  ["Yesterday I ___ a great book.", "read", ["red"], "the past of read"], ["Stop signs are ___.", "red", ["read"], "a color"],
  ["A penny is worth one ___.", "cent", ["scent", "sent"], "a penny"], ["The roses had a sweet ___.", "scent", ["cent", "sent"], "a smell"],
  ["Don't ___ water.", "waste", ["waist"], "use it up for no reason"], ["She tied a belt around her ___.", "waist", ["waste"], "the middle of your body"],
  ["I stubbed my ___ on the chair.", "toe", ["tow"], "a part of your foot"], ["The truck will ___ the broken car.", "tow", ["toe"], "pull behind"],
  ["The ___ is sunny today.", "weather", ["whether"], "what it's like outside"], ["I can't decide ___ to wear boots or sneakers.", "whether", ["weather"], "if"],
  ["You may ___ any book you like.", "choose", ["chews"], "pick"], ["The puppy ___ on its toy.", "chews", ["choose"], "bites again and again"],
  ["My puppy has ___ so big!", "grown", ["groan"], "the past of grow"], ["We heard Dad ___ when he saw the mess.", "groan", ["grown"], "make a low, unhappy sound"],
  ["The kite flew ___ in the sky.", "high", ["hi"], "far up"], ["Say ___ to your sister for me.", "hi", ["high"], "hello"],
  ["My legs are ___ from running.", "sore", ["soar"], "hurting a little"], ["Eagles ___ high above the mountains.", "soar", ["sore"], "fly high"],
  ["My ___ is my mom's sister.", "aunt", ["ant"], "a parent's sister"], ["An ___ carried a crumb.", "ant", ["aunt"], "a tiny insect"],
  ["___ coming to the party?", "Who's", ["Whose"], "who is"], ["___ backpack is this?", "Whose", ["Who's"], "belongs to which person"],
  ["The ___ fell off my wagon.", "wheel", ["we'll"], "a round part that rolls"], ["___ see you tomorrow.", "We'll", ["Wheel"], "we will"],
];
addBank(9, "english", "homophones", 0.79, function () {
  const [s, a, d, m] = pick(EN9_HOMO);
  return { q: `<div class="sentence">${s.replace("___", '<span class="blank">___</span>')}</div>`, say: `Which word fits? ${s.replace("___", "blank")}`, opts: shuffle([a, ...d]), ans: a, big: 1, why: `"${a}" means ${m}.`, key: "EN9" + s };
});

/* ---------- Prepositions ---------- */
const EN9_PREP = [
  ["The puppy slept beneath the table.", "beneath", ["puppy", "slept", "table"], "where"], ["A spider crawled up the wall.", "up", ["spider", "crawled", "wall"], "where"],
  ["We hiked along the river.", "along", ["hiked", "river", "happy"], "where"], ["The ball rolled down the hill.", "down", ["ball", "rolled", "hill"], "where"],
  ["The cat sat beside the fireplace.", "beside", ["cat", "sat", "fireplace"], "where"], ["Lily hid behind the curtain.", "behind", ["Lily", "hid", "curtain"], "where"],
  ["The plane flew above the clouds.", "above", ["plane", "flew", "clouds"], "where"], ["We swam near the dock.", "near", ["swam", "dock", "happy"], "where"],
  ["The frog jumped off the log.", "off", ["frog", "jumped", "log"], "where"], ["My house is across the street.", "across", ["house", "street", "is"], "where"],
  ["The keys are inside the drawer.", "inside", ["keys", "are", "drawer"], "where"], ["The squirrel ran onto the roof.", "onto", ["squirrel", "ran", "roof"], "where"],
  ["The children marched past the library.", "past", ["children", "marched", "library"], "where"], ["The boat sailed under the bridge.", "under", ["boat", "sailed", "bridge"], "where"],
  ["The farmer walked through the cornfield.", "through", ["farmer", "walked", "cornfield"], "where"], ["The cookies are on the plate.", "on", ["cookies", "are", "plate"], "where"],
  ["Zoe leaned her bag against the wall.", "against", ["Zoe", "bag", "wall"], "where"], ["The geese flew toward the lake.", "toward", ["geese", "flew", "lake"], "where"],
  ["A lamp stands by the couch.", "by", ["lamp", "stands", "couch"], "where"], ["The mouse ran around the barn.", "around", ["mouse", "ran", "barn"], "where"],
  ["The diver swam below the waves.", "below", ["diver", "swam", "waves"], "where"], ["Ethan stood among the tall trees.", "among", ["Ethan", "stood", "tall"], "where"],
  ["The rocket zoomed into space.", "into", ["rocket", "zoomed", "space"], "where"], ["The road goes over the mountain.", "over", ["road", "goes", "mountain"], "where"],
  ["The kite got stuck in the tree.", "in", ["kite", "stuck", "tree"], "where"], ["Pedro lives beyond the hills.", "beyond", ["Pedro", "lives", "hills"], "where"],
  ["The kitten slept under the blanket.", "under", ["kitten", "slept", "blanket"], "where"], ["A rainbow appeared over the lake.", "over", ["rainbow", "appeared", "lake"], "where"],
  ["The coins fell between the cushions.", "between", ["coins", "fell", "cushions"], "where"],
  ["We ate popcorn during the movie.", "during", ["ate", "popcorn", "movie"], "when"], ["I brush my teeth before bed.", "before", ["brush", "teeth", "bed"], "when"],
  ["The store closes at midnight.", "at", ["store", "closes", "midnight"], "when"], ["Grandpa naps after lunch.", "after", ["Grandpa", "naps", "lunch"], "when"],
  ["Mia read until bedtime.", "until", ["Mia", "read", "bedtime"], "when"], ["School starts in September.", "in", ["School", "starts", "September"], "when"],
  ["My birthday is on Friday.", "on", ["birthday", "is", "Friday"], "when"], ["The baby has been sleepy since noon.", "since", ["baby", "sleepy", "noon"], "when"],
  ["The leaves change color in autumn.", "in", ["leaves", "change", "color"], "when"], ["The birds sing at dawn.", "at", ["birds", "sing", "dawn"], "when"],
  ["The kids laughed throughout the show.", "throughout", ["kids", "laughed", "show"], "when"], ["Owen finished his book before lunch.", "before", ["Owen", "finished", "lunch"], "when"],
  ["Ava has piano lessons on Tuesdays.", "on", ["Ava", "piano", "lessons"], "when"], ["The fireworks start after sunset.", "after", ["fireworks", "start", "sunset"], "when"],
  ["We go camping in July.", "in", ["go", "camping", "July"], "when"], ["It rained during recess.", "during", ["rained", "recess", "happy"], "when"],
  ["The museum opens at nine.", "at", ["museum", "opens", "nine"], "when"], ["Kai practiced soccer until dark.", "until", ["Kai", "practiced", "soccer"], "when"],
  ["The flowers bloom in spring.", "in", ["flowers", "bloom", "spring"], "when"], ["Max walked his dog before breakfast.", "before", ["Max", "walked", "dog"], "when"],
];
addBank(9, "english", "prepositions", 0.78, function () {
  const [s, a, d, t] = pick(EN9_PREP);
  if (Math.random() < 0.5) return { q: `Which word is the <b>preposition</b>?<div class="sentence">${s}</div>`, say: `Which word is the preposition? ${s}`, opts: shuffle([a, ...d]), ans: a, big: 1, why: `${cap(a)} tells ${t} in this sentence.`, key: "EN9p" + s };
  return { q: `Does the preposition <b>${a}</b> tell where or when?<div class="sentence">${hlWord(s, a)}</div>`, say: `In this sentence, does the preposition ${a} tell where or when? ${s}`, opts: ["where", "when"], ans: t, big: 1, why: t === "where" ? `${cap(a)} tells where something is or goes.` : `${cap(a)} tells when something happens.`, key: "EN9w" + s };
});

/* ---------- Cause & Effect ---------- */
const EN9_CE = [
  ["Jamal left his bike out in the rain for weeks.", "Jamal's bike chain got rusty.", ["Jamal oiled his bike chain.", "Jamal bought a new helmet.", "Jamal kept his bike in the garage."], ["His bike got a new bell.", "His bike turned blue.", "His bike got faster."]],
  ["Priya planted seeds and watered them.", "Little green sprouts came up.", ["Priya forgot to plant anything.", "Priya painted her fence.", "Priya kept the seeds in a drawer."], ["The seeds turned into rocks.", "Priya's shoes got smaller.", "The garden disappeared."]],
  ["The power went out during the storm.", "The house got dark.", ["Dad turned on every lamp.", "The sun was shining brightly.", "Mom bought new light bulbs."], ["The lights got brighter.", "The TV turned on by itself.", "The house got sunnier."]],
  ["Noah forgot to set his alarm.", "Noah overslept.", ["Noah went to bed early.", "Noah's alarm rang loudly.", "Noah woke up before sunrise."], ["He woke up extra early.", "He won a prize.", "His alarm clock got louder."]],
  ["Ana ate a big lunch.", "Ana was not hungry at snack time.", ["Ana skipped lunch.", "Ana ran a long race.", "Ana forgot her lunch."], ["She was starving at snack time.", "She grew taller.", "She lost her backpack."]],
  ["The wind knocked over the trash can.", "Trash blew across the yard.", ["The trash can was tied down.", "Dad washed the car.", "It was a calm day."], ["The yard looked extra tidy.", "The trash can got heavier.", "The trash can turned green."]],
  ["Lucy practiced her spelling words every night.", "Lucy got every word right on the test.", ["Lucy never studied.", "Lucy lost her spelling list.", "Lucy was sick on test day."], ["She forgot all the words.", "She missed the test.", "She got a new pencil."]],
  ["The milk was left out of the fridge all day.", "The milk went sour.", ["The milk was kept cold.", "Someone bought fresh milk.", "The fridge was full."], ["The milk got colder.", "The milk turned into juice.", "The milk tasted sweeter."]],
  ["Carlos told a funny joke.", "Everyone laughed.", ["Carlos told a sad story.", "Everyone was asleep.", "Carlos stayed quiet."], ["Everyone started crying.", "The room got cold.", "Everyone went home."]],
  ["Mom added too much salt to the soup.", "The soup tasted very salty.", ["Mom forgot the salt.", "Mom added extra sugar.", "Mom added more water."], ["The soup tasted sweet.", "The soup turned purple.", "The soup had no flavor."]],
  ["It rained hard for days.", "The river flooded.", ["It was dry for weeks.", "The river froze.", "The sun shone all week."], ["The river dried up.", "The river froze solid.", "The fish left the river."]],
  ["Hana stayed up very late reading.", "Hana was sleepy at school the next day.", ["Hana went to bed early.", "Hana ate a big breakfast.", "Hana slept ten hours."], ["She had extra energy all day.", "She forgot how to read.", "She got a new book."]],
  ["The temperature dropped below freezing.", "Ice formed on the puddles.", ["The day was hot and sunny.", "It stopped raining.", "The puddles were painted."], ["The puddles started to boil.", "The puddles turned into grass.", "The puddles got warmer."]],
  ["Eli shared his crayons with a new classmate.", "Eli and the new classmate became friends.", ["Eli ignored the new classmate.", "Eli lost his crayons.", "Eli stayed home sick."], ["They never spoke again.", "The crayons melted.", "Eli got in trouble."]],
  ["Many people bought bread in the morning.", "The bakery ran out of bread.", ["Nobody came to the bakery.", "The baker made extra bread.", "The bakery was closed."], ["The bakery had extra bread.", "The bread got bigger.", "The baker took a nap."]],
  ["Zoe dropped her ice cream cone.", "Zoe looked sad.", ["Zoe finished her ice cream.", "Zoe held her cone tightly.", "Zoe got a second scoop."], ["She cheered with joy.", "The ice cream froze harder.", "She got two cones."]],
  ["The class worked quietly all morning.", "The teacher gave the class extra recess.", ["The class was very noisy.", "The class did not do their work.", "The class made a big mess."], ["The teacher took recess away.", "The class had to stay late.", "The classroom got messy."]],
  ["The tire ran over a nail.", "The tire went flat.", ["The tire was brand new.", "Dad pumped up the tire.", "The car was washed."], ["The tire got bigger.", "The car went faster.", "The tire turned shiny."]],
  ["Maya wore sunscreen at the beach.", "Maya did not get a sunburn.", ["Maya forgot her sunscreen.", "Maya stayed in the sun all day.", "Maya went swimming."], ["She got a bad sunburn.", "The sand turned cold.", "The beach closed."]],
  ["The baby heard a loud noise.", "The baby woke up and cried.", ["The room was silent.", "The baby was fed.", "The baby got a new toy."], ["She fell into a deeper sleep.", "She learned to walk.", "She got a new blanket."]],
  ["The team practiced passing every day.", "The team won the championship.", ["The team skipped practice.", "The team lost their ball.", "The coach was away all season."], ["They forgot how to pass.", "They lost every game.", "Their uniforms got lost."]],
  ["Tom left the freezer door open.", "The ice cubes melted.", ["Tom closed the freezer tight.", "Tom made more ice.", "It was snowing outside."], ["The ice cubes got bigger.", "The freezer got colder.", "The ice turned into rocks."]],
  ["A strong wind blew all night.", "Leaves covered the ground.", ["The air was perfectly still.", "It was a quiet night.", "The trees were watered."], ["The leaves grew back.", "The trees got taller.", "The ground stayed bare."]],
  ["Dad turned up the heat.", "The house got warm.", ["Dad opened all the windows in winter.", "Dad turned off the heater.", "It snowed outside."], ["The house got colder.", "The windows froze.", "Everyone put on coats."]],
  ["Grace saved her allowance for months.", "Grace had enough money for a new book.", ["Grace spent all her money right away.", "Grace lost her wallet.", "Grace never got an allowance."], ["She had no money left.", "She owed her brother money.", "Her piggy bank was empty."]],
  ["The dog rolled in the mud.", "The dog's fur got dirty.", ["The dog had a bath.", "The dog slept inside.", "The dog was brushed."], ["Its fur got cleaner.", "Its fur turned shiny white.", "It got a haircut."]],
  ["It was the hottest day of the summer.", "The pool was crowded.", ["It was cold and rainy.", "The pool was closed.", "It was snowing."], ["The pool was empty.", "The pool froze.", "Everyone wore winter coats."]],
  ["Rosa left her crayons in a hot car.", "The crayons melted.", ["The crayons were in a cool drawer.", "Rosa bought new crayons.", "It was a chilly day."], ["The crayons froze.", "The crayons got longer.", "The crayons got sharper."]],
  ["The class planted trees around the school.", "The playground had more shade.", ["The class cut down the bushes.", "The class painted the walls.", "The class built a new slide."], ["The playground got sunnier.", "The school got smaller.", "The trees turned into flowers."]],
  ["Jack did not wear gloves in the snow.", "Jack's hands got very cold.", ["Jack wore thick gloves.", "Jack stayed inside.", "Jack drank hot cocoa."], ["His hands stayed toasty warm.", "His gloves got wet.", "His hands turned green."]],
  ["The school bus broke down.", "The kids were late for school.", ["The bus came early.", "The kids woke up early.", "The bus got new tires."], ["The kids got to school early.", "The bus turned into a train.", "The kids got new backpacks."]],
  ["Amir said sorry to his sister.", "Amir's sister forgave him.", ["Amir teased his sister.", "Amir ignored his sister.", "Amir took his sister's toy."], ["She stayed angry forever.", "She lost her toy.", "She went to sleep."]],
  ["The sun shone all afternoon.", "The snowman melted.", ["It snowed all afternoon.", "The night was freezing.", "Kids added more snow."], ["The snowman got bigger.", "The snowman froze harder.", "The snowman grew a hat."]],
  ["The garden had no fence.", "Rabbits ate the lettuce.", ["The garden had a tall fence.", "The lettuce was in the fridge.", "There were no rabbits nearby."], ["The lettuce grew bigger.", "The rabbits built a fence.", "The garden was safe."]],
  ["Owen read the directions carefully.", "Owen built the model correctly.", ["Owen threw away the directions.", "Owen rushed through it.", "Owen lost some pieces."], ["He built it upside down.", "He lost all the pieces.", "He gave up quickly."]],
  ["Kayla let go of her balloon's string.", "The balloon floated up into the sky.", ["Kayla held the string tightly.", "Kayla tied the balloon to a chair.", "Kayla let the air out."], ["It sank to the ground.", "It turned into a kite.", "It got bigger."]],
  ["Our neighbor mowed the lawn.", "The grass was short.", ["Our neighbor forgot to mow.", "It rained all week.", "Our neighbor planted seeds."], ["The grass grew taller.", "The grass turned blue.", "The lawn mower got lost."]],
  ["Lena wore her raincoat.", "Lena stayed dry in the storm.", ["Lena forgot her raincoat.", "Lena jumped in puddles.", "Lena's umbrella broke."], ["She got soaking wet.", "The storm stopped.", "Her raincoat got lost."]],
  ["The cookies baked too long.", "The cookies got burned.", ["The cookies came out on time.", "The oven was off.", "The cookies were still dough."], ["They were soft and gooey.", "They stayed raw.", "They turned into cupcakes."]],
  ["Ming left the window open during the rain.", "The floor by the window got wet.", ["Ming closed every window.", "It was a dry, sunny day.", "Ming mopped the floor."], ["The floor stayed dry.", "The window got cleaner.", "The room got warmer."]],
  ["Pablo exercised every day.", "Pablo got stronger.", ["Pablo sat on the couch all day.", "Pablo stopped moving.", "Pablo slept late every day."], ["He got weaker.", "He got shorter.", "He forgot how to run."]],
  ["It was below freezing for weeks.", "People could skate on the frozen lake.", ["It was a hot summer.", "It rained for weeks.", "The lake was very warm."], ["People swam in the lake.", "The lake dried up.", "Boats sailed on the lake."]],
  ["Sara turned off the TV.", "The room got quiet.", ["Sara turned up the volume.", "Sara invited friends over.", "Sara turned on the music."], ["The room got louder.", "The TV got brighter.", "The lights went out."]],
  ["Ben's shoelace was untied.", "Ben tripped on the step.", ["Ben tied a double knot.", "Ben wore new socks.", "Ben walked slowly and carefully."], ["He ran faster.", "His shoe got shinier.", "He found a coin."]],
];
const EN9_lf = e => /^(The|A|Little|Trash|Ice|Leaves|Rabbits|Everyone|People)\b/.test(e) ? e.charAt(0).toLowerCase() + e.slice(1) : e;
addBank(9, "english", "causeeffect", 0.76, function () {
  const i = R(0, EN9_CE.length - 1), [c, e, wc, we] = EN9_CE[i];
  if (Math.random() < 0.5) return { q: `<div class="quote">${e}</div>What was the <b>cause</b>? (Why did it happen?)`, say: `${e} What was the cause? Why did it happen?`, opts: shuffle([c, ...wc]), ans: c, why: `${c.replace(/\.$/, "")}, and that is why ${EN9_lf(e)}`, key: "EN9c" + i };
  return { q: `<div class="quote">${c}</div>What was the <b>effect</b>? (What happened?)`, say: `${c} What was the effect? What happened?`, opts: shuffle([e, ...we]), ans: e, why: `${c.replace(/\.$/, "")}, so ${EN9_lf(e)}`, key: "EN9e" + i };
});

/* ---------- Contractions ---------- */
const EN9_CONTR = [["have not", "haven't"], ["has not", "hasn't"], ["are not", "aren't"], ["were not", "weren't"], ["was not", "wasn't"], ["could not", "couldn't"], ["should not", "shouldn't"], ["does not", "doesn't"], ["had not", "hadn't"], ["he will", "he'll"], ["she will", "she'll"], ["they will", "they'll"], ["you will", "you'll"], ["I have", "I've"], ["we have", "we've"], ["they have", "they've"], ["you are", "you're"]];
const EN9_CALL = EN9_CONTR.concat([["do not", "don't"], ["cannot", "can't"], ["I am", "I'm"], ["it is", "it's"], ["they are", "they're"], ["we will", "we'll"], ["she is", "she's"], ["you have", "you've"], ["did not", "didn't"], ["would not", "wouldn't"], ["let us", "let's"], ["I will", "I'll"], ["is not", "isn't"], ["we are", "we're"], ["will not", "won't"]]);
const EN9_CSENT = [
  ["<u>I am</u> ready for the trip.", "I'm"], ["<u>We are</u> going to the park.", "We're"], ["<u>They are</u> my best friends.", "They're"], ["<u>It is</u> time for lunch.", "It's"],
  ["Please <u>do not</u> touch the wet paint.", "don't"], ["I <u>cannot</u> find my other shoe.", "can't"], ["<u>She is</u> the fastest runner in class.", "She's"], ["<u>You have</u> grown so tall!", "You've"],
  ["He <u>did not</u> hear the bell.", "didn't"], ["The door <u>would not</u> open.", "wouldn't"], ["<u>Let us</u> play a game.", "Let's"], ["<u>I will</u> call you later.", "I'll"],
  ["The water <u>is not</u> cold.", "isn't"], ["<u>We will</u> bake cookies tomorrow.", "We'll"], ["The dog <u>will not</u> stop barking.", "won't"], ["We <u>have not</u> eaten dinner yet.", "haven't"],
  ["Sam <u>has not</u> finished his book.", "hasn't"], ["The cookies <u>are not</u> ready.", "aren't"], ["We <u>were not</u> home last night.", "weren't"], ["The movie <u>was not</u> scary.", "wasn't"],
  ["I <u>could not</u> reach the top shelf.", "couldn't"], ["You <u>should not</u> run near the pool.", "shouldn't"], ["My cat <u>does not</u> like baths.", "doesn't"], ["She <u>had not</u> seen snow before.", "hadn't"],
  ["<u>He will</u> be here soon.", "He'll"], ["<u>She will</u> love this gift.", "She'll"], ["<u>They will</u> meet us at noon.", "They'll"], ["<u>You will</u> need a coat today.", "You'll"],
  ["<u>I have</u> lost my pencil.", "I've"], ["<u>We have</u> finished our project.", "We've"], ["<u>They have</u> already left.", "They've"], ["<u>You are</u> a great helper.", "You're"],
  ["<u>I am</u> so happy to see you.", "I'm"], ["<u>It is</u> raining outside.", "It's"], ["Mom <u>did not</u> forget my lunch.", "didn't"], ["I <u>do not</u> like spinach.", "don't"],
  ["<u>We are</u> almost there!", "We're"], ["<u>They are</u> playing soccer.", "They're"], ["The baby <u>is not</u> sleepy.", "isn't"], ["<u>I will</u> help you carry that.", "I'll"],
  ["Lily <u>cannot</u> wait for summer.", "can't"], ["My brother <u>was not</u> at school today.", "wasn't"], ["The shop <u>will not</u> open until nine.", "won't"], ["We <u>could not</u> see the stars.", "couldn't"],
  ["Dad <u>does not</u> drink coffee.", "doesn't"], ["<u>You have</u> done a great job.", "You've"], ["The kids <u>were not</u> late.", "weren't"], ["<u>She is</u> reading a book.", "She's"],
  ["<u>Let us</u> go outside.", "Let's"], ["The plant <u>has not</u> grown much.", "hasn't"],
];
addBank(9, "english", "contractions", 0.74, function () {
  if (Math.random() < 0.6) {
    const [s, c] = pick(EN9_CSENT), long = s.match(/<u>(.*?)<\/u>/)[1], up = c[0] !== c[0].toLowerCase() || /^I'/.test(c);
    const fix = x => up ? cap(x) : (/^I'/.test(x) ? x : x.toLowerCase());
    const others = shuffle(EN9_CALL.map(x => x[1]).filter(x => x.toLowerCase() !== c.toLowerCase())).slice(0, 3).map(fix);
    return { q: `Which contraction can replace the underlined words?<div class="sentence">${s}</div>`, say: `Which contraction can replace ${long}? ${s.replace(/<\/?u>/g, "")}`, opts: shuffle([c, ...others]), ans: c, big: 1, why: `${long} → ${c}. The apostrophe replaces the missing letters.`, key: "EN9s" + s };
  }
  const [l, c] = pick(EN9_CONTR);
  const noApos = c.replace("'", ""), i = c.indexOf("'"), shifted = i > 1 ? c.slice(0, i - 1) + "'" + c[i - 1] + c.slice(i + 1) : c.slice(0, i) + c[i + 1] + "'" + c.slice(i + 2);
  if (Math.random() < 0.5) return { q: `What is the contraction for <b>${l}</b>?`, say: `What is the contraction for ${l}?`, opts: uniq(c, [shifted, noApos, pick(EN9_CONTR.filter(x => x[1] !== c))[1]]), ans: c, big: 1, why: `${l} → ${c}. The apostrophe replaces the missing letters.`, key: "EN9c" + c };
  const others = shuffle(EN9_CONTR.filter(x => x[1] !== c)).slice(0, 3).map(x => x[0]);
  return { q: `What two words make <b>${c}</b>?`, say: `What two words make ${c}?`, opts: shuffle([l, ...others]), ans: l, big: 1, why: `${c} is short for ${l}.`, key: "EN9w" + c };
});

/* ---------- Figurative Language: more sentences in the topic's own bank ---------- */
FIG.Simile.push("The pillow was as soft as a cloud.", "Dad snores like a bear.", "Her eyes sparkled like stars.", "The lake was as smooth as glass.", "He was as quiet as a mouse.",
  "The kids moved around like busy ants.", "My hands were as sticky as glue.", "The baby's cheeks were as red as apples.", "The road was as straight as an arrow.", "She swims like a fish.",
  "The hallway was as dark as night.", "The old dog was as gentle as a lamb.", "The water sparkled like diamonds.", "My little sister is as sweet as honey.", "The clouds looked like cotton balls.",
  "Grandpa's beard was as white as snow.", "The kitten's fur felt like silk.", "Her laugh sounded like a tinkling bell.", "The puppy wiggled like a worm.", "The stars twinkled like tiny lights.");
FIG.Metaphor.push("The playground was an oven in July.", "My bedroom is a jungle.", "The moon was a silver coin in the sky.", "My dad is a walking dictionary.", "The grass was a green carpet.",
  "Life is a roller coaster.", "The library is a treasure chest of stories.", "My baby brother is a little tornado.", "The clouds were fluffy cotton candy.", "Her smile was sunshine on a gloomy day.",
  "The highway was a parking lot.", "The calm lake was a mirror.", "Books are windows to the world.", "The night sky was a dark blanket.", "Grandma's kitchen is a bakery on holidays.",
  "The garden was a rainbow of flowers.", "That test was a mountain I had to climb.", "The fog was a gray curtain.", "My little sister is a chatterbox.", "The stadium was a sea of red shirts.");
FIG.Personification.push("The trees waved their arms in the storm.", "The stars winked at us.", "The rain drummed its fingers on the roof.", "The daisies stretched their arms toward the sun.", "The teapot sang on the stove.",
  "The old floor groaned when we stepped on it.", "The ocean waves kissed the shore.", "The sun peeked out from behind the clouds.", "The cookies called my name from the kitchen.", "The bright moon smiled at the sleepy town.",
  "The leaves whispered secrets to each other.", "The door complained with a loud creak.", "The clouds cried all afternoon.", "The sunflowers turned their faces to the sun.", "My bike begged me to ride it.",
  "The wind sang a lullaby through the pines.", "The old house sighed in the wind.", "The flowers waved hello to us.", "The tired car groaned up the hill.", "The kettle shouted when the water boiled.");
FIG.Hyperbole.push("I'm so tired I could sleep for a year.", "This bag weighs a million pounds.", "My brother is so loud they can hear him on the moon.", "I've walked a thousand miles today.", "It's so cold my breath could freeze into ice cubes.",
  "There were a zillion people at the fair.", "I'm so hungry I could eat a mountain of pancakes.", "This homework will take me a hundred years.", "That joke was so funny I laughed for a week.", "The line at the store was a mile long.",
  "It's so hot you could fry an egg on the sidewalk.", "My cat is bigger than a house!", "We ate enough pizza to feed a whole town.", "I've seen that movie a hundred times.", "My dog runs faster than a rocket.",
  "The music was so loud it shook the whole city.", "This is the longest day in the history of the universe.", "I'm so excited I could jump over the moon.", "My backpack weighs more than an elephant.", "I have a billion things to do today.");

/* ---------- Parts of Speech: more tagged sentences in the topic's own bank ---------- */
POS_S.push(["The|- clever|adjective fox|noun jumped|verb high|adverb."], ["Grandma|noun baked|verb delicious|adjective cookies|noun."], ["The|- little|adjective boy|noun laughed|verb loudly|adverb."],
  ["Our|- new|adjective neighbor|noun waved|verb cheerfully|adverb."], ["Huge|adjective waves|noun crashed|verb noisily|adverb."], ["The|- gentle|adjective horse|noun ate|verb carrots|noun."],
  ["The|- sleepy|adjective owl|noun blinked|verb slowly|adverb."], ["Lucas|noun wrote|verb a|- funny|adjective story|noun."], ["The|- cold|adjective wind|noun blew|verb fiercely|adverb."],
  ["Tiny|adjective ants|noun marched|verb quickly|adverb."], ["The|- proud|adjective artist|noun smiled|verb warmly|adverb."], ["The|- old|adjective clock|noun ticked|verb steadily|adverb."],
  ["Maya|noun carried|verb heavy|adjective books|noun."], ["The|- hungry|adjective cat|noun meowed|verb sadly|adverb."], ["Dad|noun cooked|verb spicy|adjective soup|noun."],
  ["The|- shiny|adjective car|noun stopped|verb suddenly|adverb."], ["The|- kind|adjective nurse|noun spoke|verb gently|adverb."], ["Kai|noun built|verb a|- tall|adjective tower|noun."],
  ["Bright|adjective fireflies|noun glowed|verb softly|adverb."], ["The|- curious|adjective puppy|noun sniffed|verb everywhere|adverb."]);

/* ---------- Word Roots ---------- */
const EN9_ROOTS = [
  ["dict", "say", ["dictionary", "predict", "contradict"], "a"], ["rupt", "break", ["erupt", "interrupt", "rupture"], "b"], ["struct", "build", ["construct", "structure", "instruct"], "c"],
  ["aud", "hear", ["audio", "audience", "audible"], "d"], ["vis", "see", ["vision", "visible", "invisible"], "e"], ["ped", "foot", ["pedal", "pedestrian", "centipede"], "f"],
  ["cent", "hundred", ["century", "percent", "centipede"], "g"], ["oct", "eight", ["octopus", "octagon"], "h"], ["uni", "one", ["unicycle", "unicorn", "uniform"], "i"],
  ["therm", "heat", ["thermometer", "thermal"], "j"], ["meter", "measure", ["thermometer", "kilometer", "perimeter"], "k"], ["photo", "light", ["photograph", "photocopy"], "L"],
  ["astro", "star", ["astronaut", "astronomy"], "L"], ["sol", "sun", ["solar", "solstice"], "L"], ["multi", "many", ["multiply", "multicolored"], "m"],
  ["ject", "throw", ["eject", "project", "reject"], "n"], ["sub", "under", ["submarine", "subway"], "o"], ["mar", "sea", ["marine", "mariner"], "p"],
  ["manu", "hand", ["manual", "manuscript"], "q"], ["vac", "empty", ["vacant", "vacuum", "vacation"], "r"], ["flex", "bend", ["flexible", "reflex"], "s"],
  ["mot", "move", ["motor", "motion"], "t"], ["dec", "ten", ["decade", "decimal"], "u"], ["cycl", "circle or wheel", ["bicycle", "cyclone", "recycle"], "v"],
];
addBank(9, "english", "roots", 0.65, function () {
  const i = R(0, EN9_ROOTS.length - 1), [r, m, ws, g] = EN9_ROOTS[i], w = pick(ws), others = shuffle(EN9_ROOTS.filter((x, j) => j !== i && x[3] !== g));
  if (Math.random() < 0.5) return { q: `The root <b>${r}</b> means…`, say: `The root ${r.split("").join(" ")}, like in ${w}, means what?`, vis: hw(w.replace(r, `<b class="hl">${r}</b>`)), opts: uniq(m, others.map(o => o[1])), ans: m, why: `${r} means ${m}, like in ${ws.join(", ")}.`, key: "EN9m" + r + w };
  const wrongs = shuffle(others.flatMap(o => o[2]).filter(x => !x.includes(r)));
  return { q: `Which word has the root meaning <b>${m}</b>?`, say: `Which word has the root meaning ${m}?`, opts: uniq(w, wrongs), ans: w, big: 1, why: `${w} has ${r}, which means ${m}.`, key: "EN9w" + r + w };
});

