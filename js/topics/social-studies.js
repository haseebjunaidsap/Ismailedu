/* =================== SOCIAL STUDIES · AGE 6 (Grade 1) =================== */
{
  const HELP = [["firefighter", "👩‍🚒", "puts out fires and keeps people safe", "🔥"], ["doctor", "👩‍⚕️", "helps sick people get better", ""], ["teacher", "👩‍🏫", "helps children learn", "📚"], ["mail carrier", "", "brings letters and packages", "📬"], ["police officer", "👮", "keeps the community safe and helps people", ""], ["farmer", "👩‍🌾", "grows food and raises animals", "🌽"], ["baker", "", "bakes bread and treats", "🍞"], ["librarian", "", "helps people find books", "📚"], ["veterinarian", "", "takes care of sick animals", "🐶"], ["dentist", "", "keeps teeth healthy", "🦷"], ["bus driver", "", "drives people safely to school and work", "🚌"]];
  V40_topic(6, "social", { id: "helpers", title: "Community Helpers", icon: "👩‍🚒", blurb: "The people who help our community.", std: "C3 D2.Civ", stdName: "C3 Civics D2.Civ.1–2: people and roles in the community",
    intro: "A community is a place where people live, work and play. Community helpers have jobs that help everyone.", learn: "Firefighters fight fires, doctors help sick people, and farmers grow our food.", pics: [["👩‍🚒", "Firefighter", "fires"], ["👩‍⚕️", "Doctor", "health"], ["👩‍🌾", "Farmer", "food"], ["👮", "Police officer", "safety"]],
    trick: "Think about where you'd see the helper and what tools they use.",
    mix: [[() => V40_match(HELP, { ab: p => `What does a <b>${p[0]}</b> do?`, ba: p => `Who <b>${p[2]}</b>?`, why: p => `A ${p[0]} ${p[2]}.`, whyB: x => `That's the job of a ${x[0]}.`, whyA: x => `A ${x[0]} ${x[2]}.` }, "c6h"), 1]] });

  const NW = [["food", "🍎", "n"], ["water", "💧", "n"], ["a home", "🏠", "n"], ["warm clothes", "🧥", "n"], ["medicine when sick", "", "n"], ["a video game", "🎮", "w"], ["candy", "🍬", "w"], ["a new toy", "🧸", "w"], ["a bike", "🚲", "w"], ["a balloon", "🎈", "w"], ["a trip to the zoo", "", "w"], ["a skateboard", "", "w"]];
  const NWG = { n: ["a need (something we must have to live)", "needs", "Need"], w: ["a want (nice to have, but we can live without it)", "wants", "Want"] };
  V40_topic(6, "social", { id: "needswants", title: "Needs & Wants", icon: "🛒", blurb: "What we need to live, and what we would like.", std: "C3 D2.Eco", stdName: "C3 Economics D2.Eco.1–2: choices, needs and wants",
    intro: "Needs are things we must have to live: food, water, clothes and a home. Wants are things we'd like but can live without.", learn: "Food is a need. A video game is a want.", pics: [["🍎", "Food", "need"], ["🏠", "Home", "need"], ["🎮", "Game", "want"], ["🍬", "Candy", "want"]],
    trick: "Ask: Could I stay alive and healthy without it? If yes, it's a want.",
    mix: [[() => V40_sort(NW, NWG, "c6n"), 1]] });

  const MAPF = [
    ["What is a map?", "A drawing of a place from above", ["A photo of a person", "A kind of book about animals", "A list of words"], "A map shows a place as if you were looking down like a bird.", "🗺️", ["Photos of people aren't maps.", "Animal books aren't maps.", "A map shows places, not just words."]],
    ["On a map, what color usually means water?", "Blue", ["Red", "Black", "Orange"], "Mapmakers color water blue: lakes, rivers and oceans.", "🌊", ["Red is often used for roads or borders.", "Black is often used for words and lines.", "Orange is not used for water."]],
    ["What does a map key (legend) tell you?", "What the symbols on the map mean", ["What time it is", "Who drew the map", "How to spell words"], "The map key explains the little pictures, or symbols, on a map.", "🔑", ["Maps don't tell time.", "The mapmaker's name isn't the key.", "The key is about symbols, not spelling."]],
    ["What is a globe?", "A round model of the Earth", ["A flat map of a town", "A kind of ball game", "A light bulb"], "A globe is shaped like a ball, just like Earth.", "🌍", ["A globe is round, not flat.", "A globe is a model of Earth, not a game.", "A globe is a model, not a light."]],
    ["On a map, a tiny tree picture most likely stands for…", "a park or forest", ["a school", "a lake", "a road"], "Map symbols are little pictures. Trees often mean a park or forest.", "🌳", ["A school symbol is usually a building or flag.", "Lakes are shown in blue.", "Roads are lines."]],
    ["Which is the biggest?", "Country", ["State", "City", "Neighborhood"], "A neighborhood is in a city, a city is in a state, and a state is in a country.", "🇺🇸", ["A state is part of a country.", "A city is part of a state.", "A neighborhood is part of a city."]],
  ];
  MAPF.push(

  ["On a map, roads are usually shown as…", "lines", ["blue circles", "tiny trees", "stars"], "Roads are drawn as lines that connect places.", "🛣️", ["Blue shapes usually mean water.", "Tiny trees often mean a park.", "Stars often mark capitals."]],
  ["On a state map, a star often shows…", "the capital city", ["a forest", "a lake", "a school bus"], "Mapmakers often use a star to show the capital.", "⭐", ["Forests are often shown with trees.", "Lakes are shown in blue.", "School buses aren't on state maps."]],
  ["Which is the smallest place?", "Your bedroom", ["Your town", "Your state", "Your country"], "Your bedroom is inside your home, which is in your town, state and country.", "🛏️", ["Your town has many homes in it.", "Your state has many towns.", "Your country has many states."]],
  ["Most of Earth is covered by…", "water", ["sand", "ice cream", "roads"], "About three-quarters of Earth's surface is water.", "🌊", ["Deserts cover only part of the land.", "Ice cream isn't part of Earth's surface.", "Roads cover only a tiny part."]],
  ["What would help you find your way around a big zoo?", "A map of the zoo", ["A cookbook", "A calendar", "A clock"], "A map shows where things are.", "🗺️", ["A cookbook shows recipes.", "A calendar shows days.", "A clock shows time."]],
  ["A map of your classroom drawn from above would show…", "the desks and rug as shapes", ["only the ceiling", "what's for lunch", "the weather"], "Maps show where things are, as seen from above.", "🏫", ["From above you'd see the floor, not the ceiling.", "Maps don't show lunch.", "Classroom maps don't show weather."]],
  ["What is the name of our country?", "The United States of America", ["Canada", "Mexico", "Brazil"], "Our country is the United States of America.", "🇺🇸", ["Canada is our neighbor to the north.", "Mexico is our neighbor to the south.", "Brazil is in South America."]],
  );
  V40_topic(6, "social", { id: "mapbasics", title: "Map Basics", icon: "🗺️", blurb: "Maps, globes, symbols and keys.", std: "C3 D2.Geo", stdName: "C3 Geography D2.Geo.1–3: maps and globes",
    intro: "A map is a drawing of a place from above. A globe is a round model of Earth. Maps use symbols, and the map key tells what they mean.", learn: "Blue means water, tiny trees can mean a park, and lines are roads.", pics: [["🗺️", "Map", "flat drawing"], ["🌍", "Globe", "round model"], ["🔑", "Map key", "explains symbols"], ["🌊", "Blue", "water"]],
    trick: "Use the map key! It tells you what each little picture means.",
    mix: [[() => V40_fact(MAPF, "c6m"), 1]] });

  const THEN = [["candle", "🕯️", "light bulb", "💡"], ["horse and wagon", "🐴", "car", "🚗"], ["letter by mail", "✉️", "email or text", "📱"], ["washboard", "", "washing machine", ""], ["old phone with a cord", "☎️", "cell phone", "📱"], ["chalk slate", "", "tablet", ""], ["ice box", "🧊", "refrigerator", ""], ["oil lamp", "", "flashlight", "🔦"], ["record player", "", "music on a phone", "🎧"]];
  V40_topic(6, "social", { id: "thennow", title: "Then & Now", icon: "⏳", blurb: "How life long ago is different from today.", std: "C3 D2.His", stdName: "C3 History D2.His.2: change and continuity over time",
    intro: "Long ago, people lived differently. Many things we use today are new versions of old things.", learn: "Long ago, people used candles for light. Now we use light bulbs.", pics: [["🕯️", "Candle", "then"], ["💡", "Light bulb", "now"], ["🐴", "Horse and wagon", "then"], ["🚗", "Car", "now"]],
    trick: "Ask: Does it need electricity or a screen? Then it's probably from now.",
    mix: [[() => V40_match(THEN, { ab: p => `Long ago, people used this: <b>${p[0]}</b>. What do many people use <b>now</b>?`, ba: p => `Today we use this: <b>${p[2]}</b>. What did people use <b>long ago</b>?`, why: p => `Long ago: ${p[0]}. Now: ${p[2]}.`, whyB: x => `The ${x[2]} took the place of the ${x[0]}.`, whyA: x => `Long ago, the ${x[0]} did the job of today's ${x[2]}.` }, "c6t"), 1]] });

  const USF = [
    ["How many stars are on the United States flag?", "50", ["13", "10", "100"], "There are 50 stars, one for each state.", "🇺🇸", ["13 is the number of stripes.", "There are more than 10 states.", "There are 50 states, not 100."]],
    ["What do the 13 stripes on the U.S. flag stand for?", "The first 13 colonies", ["13 presidents", "13 big cities", "13 holidays"], "The stripes stand for the 13 colonies that became the first states.", "🇺🇸", ["The stripes aren't for presidents.", "They aren't for cities.", "They aren't for holidays."]],
    ["Which bird is a symbol of the United States?", "The bald eagle", ["The robin", "The parrot", "The penguin"], "The bald eagle is the national bird. It stands for strength and freedom.", "🦅", ["The robin is common, but it isn't the national bird.", "Parrots aren't a U.S. symbol.", "Penguins don't live in the wild in the U.S."]],
    ["Where does the President of the United States live and work?", "The White House", ["The Statue of Liberty", "The Liberty Bell", "Mount Rushmore"], "The President lives and works in the White House in Washington, D.C.", "🏛️", ["The Statue of Liberty is in New York Harbor.", "The Liberty Bell is in Philadelphia.", "Mount Rushmore is a carving in South Dakota."]],
    ["The Statue of Liberty stands for…", "freedom", ["sports", "food", "weather"], "The Statue of Liberty welcomes people and stands for freedom.", "🗽", ["It isn't about sports.", "It isn't about food.", "It isn't about weather."]],
    ["On which holiday do Americans celebrate the country's birthday?", "Independence Day (July 4th)", ["Thanksgiving", "Valentine's Day", "Labor Day"], "On July 4, 1776, the Declaration of Independence was adopted.", "🎆", ["Thanksgiving is about giving thanks.", "Valentine's Day is about love and friendship.", "Labor Day honors workers."]],
  ];
  USF.push(

  ["What do we say to show respect for the flag?", "The Pledge of Allegiance", ["Happy Birthday", "The ABC song", "A riddle"], "The Pledge of Allegiance is a promise to be loyal to our country.", "🇺🇸", ["Happy Birthday is for birthdays.", "The ABC song helps us learn letters.", "A riddle is a puzzle."]],
  ["What is the national anthem of the United States?", "The Star-Spangled Banner", ["Twinkle, Twinkle, Little Star", "Row, Row, Row Your Boat", "The Wheels on the Bus"], "The national anthem is “The Star-Spangled Banner.”", "🎵", ["That's a bedtime song.", "That's a fun round song.", "That's a children's song."]],
  ["What colors are on the U.S. flag?", "Red, white and blue", ["Green and yellow", "Purple and orange", "Black and pink"], "The flag is red, white and blue.", "🇺🇸", ["Those aren't the flag's colors.", "Those aren't the flag's colors.", "Those aren't the flag's colors."]],
  ["The Liberty Bell is a symbol of…", "freedom", ["breakfast", "sports", "the weather"], "The Liberty Bell stands for freedom.", "🔔", ["It isn't about food.", "It isn't about sports.", "It isn't about weather."]],
  ["Mount Rushmore shows the faces of…", "four presidents", ["four astronauts", "four animals", "four teachers"], "Mount Rushmore has the faces of four U.S. presidents carved in stone.", "⛰️", ["They are presidents, not astronauts.", "They are people, not animals.", "They are presidents, not teachers."]],
  ["Which holiday in November is about being thankful?", "Thanksgiving", ["Independence Day", "Halloween", "New Year's Day"], "On Thanksgiving, many families share a meal and give thanks.", "🦃", ["Independence Day is July 4th.", "Halloween is October 31st.", "New Year's Day is January 1st."]],
  ["What is the President's job?", "To lead the country", ["To deliver the mail", "To teach first grade", "To fix cars"], "The President leads the United States.", "🏛️", ["Mail carriers deliver mail.", "Teachers teach classes.", "Mechanics fix cars."]],
  );
  V40_topic(6, "social", { id: "symbols", title: "American Symbols", icon: "🇺🇸", blurb: "The flag, the bald eagle and other symbols.", std: "C3 D2.Civ", stdName: "C3 Civics D2.Civ.2 / D2.His: national symbols",
    intro: "Symbols are pictures or objects that stand for something. The United States has symbols like the flag, the bald eagle and the Statue of Liberty.", learn: "The flag has 50 stars (one per state) and 13 stripes (the first 13 colonies).", pics: [["🇺🇸", "Flag", "50 stars, 13 stripes"], ["🦅", "Bald eagle", "national bird"], ["🗽", "Statue of Liberty", "freedom"], ["🏛️", "White House", "the President"]],
    trick: "Stars = states, stripes = the first colonies.",
    mix: [[() => V40_fact(USF, "c6s"), 1]] });
}

/* =================== SOCIAL STUDIES · AGE 7 (Grade 2) =================== */
{
  /* computed: a small map with directions */
  const PLACES = [["school", "🏫"], ["park", "🌳"], ["library", "📚"], ["store", "🏪"], ["house", "🏠"], ["hospital", "🏥"], ["post office", "🏤"], ["fire station", "🚒"]];
  function dirMap(age) {
    for (let t = 0; t < 50; t++) {
      const n = 3, cells = shuffle(PLACES.slice()).slice(0, 5), pos = shuffle(range(0, 8)).slice(0, 5);
      const a = R(0, 4), b = R(0, 4); if (a === b) continue;
      const [ar, ac] = [Math.floor(pos[a] / 3), pos[a] % 3], [br, bc] = [Math.floor(pos[b] / 3), pos[b] % 3];
      let d = null; if (ar === br) d = bc > ac ? "east" : "west"; else if (ac === bc) d = br > ar ? "south" : "north"; if (!d) continue;
      const grid = Array(9).fill(""); cells.forEach((c, i) => { grid[pos[i]] = `<span class="emo" title="${c[0]}">${c[1]}</span><small>${c[0]}</small>`; });
      const vis = `<div class="v40-map"><div class="v40-compass">N<br><b>W ✛ E</b><br>S</div><div class="v40-grid">${grid.map(g => `<span>${g}</span>`).join("")}</div></div>`;
      const opts = ["North", "South", "East", "West"], ans = cap(d), whyNot = {};
      const opp = { north: "south", south: "north", east: "west", west: "east" };
      opts.forEach(o => { if (o === ans) return; whyNot[o] = o.toLowerCase() === opp[d] ? `That's backwards. Start at the ${cells[a][0]} and look toward the ${cells[b][0]}.` : `The ${cells[b][0]} is in the same ${d === "east" || d === "west" ? "row" : "column"}, so it's ${d === "east" || d === "west" ? "east or west" : "north or south"}.`; });
      return V40_Q({ q: `Look at the map. The <b>${cells[b][0]}</b> is which direction from the <b>${cells[a][0]}</b>?`, vis, opts, ans, why: `Start at the ${cells[a][0]} and move toward the ${cells[b][0]}: that's ${d}. North is up, south is down, east is right, west is left.`, whyNot, key: `c7d${pos}${a}${b}`, big: 0 });
    }
  }
  const DIRF = [
    ["On most maps, which direction is at the top?", "North", ["South", "East", "West"], "Most maps put north at the top. The compass rose shows it.", "🧭", ["South is usually at the bottom.", "East is usually on the right.", "West is usually on the left."]],
    ["The sun rises in the…", "east", ["west", "north", "south"], "The sun rises in the east and sets in the west.", "🌅", ["The sun sets in the west.", "The sun never rises in the north.", "The sun never rises in the south."]],
    ["What does a compass rose show?", "Directions: north, south, east, west", ["The time", "The weather", "How far apart places are"], "A compass rose shows directions on a map.", "🧭", ["Clocks show time.", "Weather maps use other symbols.", "The map scale shows distance."]],
  ];
  V40_topic(7, "social", { id: "directions", title: "Maps & Directions", icon: "🧭", blurb: "North, south, east and west on a map.", std: "C3 D2.Geo", stdName: "C3 Geography D2.Geo.1–3: map skills and cardinal directions",
    intro: "The four cardinal directions are north, south, east and west. On most maps, north is up, south is down, east is right, and west is left.", learn: "A compass rose on the map shows the directions.", pics: [["⬆️", "North", "up"], ["⬇️", "South", "down"], ["➡️", "East", "right"], ["⬅️", "West", "left"]],
    trick: "Never Eat Soggy Waffles: North, East, South, West, going clockwise.",
    mix: [[() => dirMap(7), 3], [() => V40_fact(DIRF, "c7df"), 1]] });

  const GS = [["a loaf of bread", "🍞", "g"], ["a pair of shoes", "👟", "g"], ["a toy truck", "🚚", "g"], ["a box of crayons", "🖍️", "g"], ["a bicycle", "🚲", "g"], ["apples", "🍎", "g"], ["a haircut", "💇", "s"], ["a doctor's checkup", "🩺", "s"], ["a bus ride", "🚌", "s"], ["fixing a car", "🔧", "s"], ["teaching a class", "👩‍🏫", "s"], ["delivering mail", "📬", "s"]].filter(x => x[1] !== "🩺");
  const GSG = { g: ["a good (a thing you can buy and hold)", "goods", "Good"], s: ["a service (work someone does for you)", "services", "Service"] };
  const EC = [
    ["A farmer grows corn and sells it. The farmer is a…", "producer", ["consumer", "customer", "renter"], "Producers make or grow goods, or provide services.", "👩‍🌾", ["Consumers buy and use goods.", "Customers are buyers, like consumers.", "Renting isn't what the farmer is doing."]],
    ["You buy an apple at the store. You are a…", "consumer", ["producer", "farmer", "baker"], "A consumer buys and uses goods and services.", "🍎", ["A producer grows or makes the apple.", "You didn't grow the apple.", "You didn't bake anything."]],
    ["Trading a sticker for your friend's pencil is called…", "bartering", ["saving", "borrowing", "spending"], "Bartering means trading goods without using money.", "🔄", ["Saving means keeping money for later.", "Borrowing means you give it back.", "Spending uses money."]],
    ["Why do people save money in a bank or piggy bank?", "To buy something later", ["To throw it away", "To make it disappear", "Because money is a toy"], "Saving means keeping money now to buy something later.", "🐷", ["Saving keeps money; it doesn't throw it away.", "Saved money stays there.", "Money is for buying things we need and want."]],
  ];
  V40_topic(7, "social", { id: "goods", title: "Goods, Services & Money", icon: "🏪", blurb: "Producers, consumers, trading and saving.", std: "C3 D2.Eco", stdName: "C3 Economics D2.Eco.1–3: goods, services, producers and consumers",
    intro: "Goods are things you can buy and hold. Services are work people do for you. Producers make goods and services; consumers buy and use them.", learn: "Bread is a good. A haircut is a service.", pics: [["🍞", "Bread", "a good"], ["💇", "Haircut", "a service"], ["👩‍🌾", "Farmer", "producer"], ["🛒", "Shopper", "consumer"]],
    trick: "Can you hold it in your hands? It's a good. Is someone doing work for you? It's a service.",
    mix: [[() => V40_sort(GS, GSG, "c7g"), 2.5], [() => V40_fact(EC, "c7e"), 1.5]] });

  const COM = [["tall buildings close together", "🏙️", "u"], ["subways and lots of traffic", "🚇", "u"], ["apartments and busy sidewalks", "", "u"], ["houses with yards and nearby shopping centers", "🏘️", "su"], ["quiet streets near a big city", "", "su"], ["farms and lots of open land", "🚜", "r"], ["houses far apart, with fields between them", "", "r"], ["barns, cows and long country roads", "🐄", "r"]];
  const CG = { u: ["urban (a city)", "city places", "Urban"], su: ["suburban (near a city)", "suburbs", "Suburban"], r: ["rural (the countryside)", "country places", "Rural"] };
  V40_topic(7, "social", { id: "communities", title: "City, Suburb & Country", icon: "🏙️", blurb: "Urban, suburban and rural communities.", std: "C3 D2.Geo", stdName: "C3 Geography D2.Geo.4–6: human and physical characteristics of places",
    intro: "Communities can be urban (cities), suburban (near cities), or rural (the countryside).", learn: "Cities have tall buildings and many people. Suburbs have houses with yards. Rural areas have farms and open land.", pics: [["🏙️", "Urban", "city"], ["🏘️", "Suburban", "near a city"], ["🚜", "Rural", "countryside"]],
    trick: "Lots of people and tall buildings = urban. Farms and fields = rural. In between = suburban.",
    mix: [[() => V40_sort(COM, CG, "c7c"), 1]] });

  const CIT = [
    ["Which shows being a good citizen?", "Picking up litter at the park", ["Writing on walls", "Breaking the rules", "Being unkind to neighbors"], "Good citizens care for their community and the people in it.", "🧹", ["That damages the community.", "Rules keep everyone safe and fair.", "Good citizens are kind."]],
    ["Your class votes on a game. 12 kids pick tag and 8 pick soccer. What happens?", "The class plays tag", ["The class plays soccer", "Nobody plays", "The teacher picks a third game"], "In a vote, the choice with the most votes wins. 12 is more than 8.", "🗳️", ["Soccer got fewer votes: 8 is less than 12.", "The vote decided a game.", "The vote already chose."]],
    ["Who makes the rules in your classroom?", "The teacher (often with the class)", ["The janitor", "A visitor", "The mail carrier"], "Teachers make classroom rules, often with help from students.", "👩‍🏫", ["The janitor keeps the school clean.", "Visitors don't make class rules.", "Mail carriers deliver mail."]],
    ["Why do we have laws?", "To keep people safe and treat everyone fairly", ["To make life boring", "So only adults can have fun", "To make people sad"], "Laws help people live together safely and fairly.", "⚖️", ["Laws aren't meant to be boring.", "Laws protect everyone, kids too.", "Laws are meant to help people."]],
    ["A responsibility is…", "something you should do", ["something you get for free", "a kind of toy", "a holiday"], "Responsibilities are duties, like following rules and helping others.", "✅", ["A right is something you have; a responsibility is something you do.", "Responsibilities aren't toys.", "Responsibilities aren't holidays."]],
    ["When adults vote in an election, they choose…", "leaders and laws", ["their favorite color", "what to eat for lunch", "the weather"], "Voting lets citizens choose leaders and decide on some laws.", "🗳️", ["Elections aren't about favorite colors.", "Elections don't choose lunch.", "No one can vote on the weather."]],
  ];
  CIT.push(

  ["Which is a right that people in the United States have?", "Freedom of speech", ["Taking things without paying", "Breaking traffic laws", "Driving without a license"], "Freedom of speech means you can share your ideas.", "🗣️", ["Taking things without paying is stealing.", "Laws keep roads safe.", "Drivers need a license."]],
  ["You find a wallet on the playground. What should a good citizen do?", "Give it to a teacher or another grown-up", ["Keep it", "Throw it away", "Hide it"], "Returning lost things is honest and helps the owner.", "👛", ["It belongs to someone else.", "The owner needs it back.", "Hiding it keeps it from its owner."]],
  ["Why do we follow the rules of a game?", "So it's fair and fun for everyone", ["So one person always wins", "So the game is boring", "So no one can play"], "Rules make games fair.", "🎲", ["Rules are about fairness, not one winner.", "Rules help games stay fun.", "Rules help everyone play."]],
  ["Who can vote in U.S. elections?", "Citizens who are 18 or older", ["People of any age", "Only children", "Only teachers"], "U.S. citizens can vote when they turn 18.", "🗳️", ["You have to be at least 18.", "Children can't vote in elections yet.", "Many grown-ups vote, not only teachers."]],
  ["What is a community?", "A place where people live, work and play together", ["A kind of food", "A single house", "A type of animal"], "Communities can be towns, cities or neighborhoods.", "🏘️", ["Food isn't a community.", "A community has many homes and people.", "A community is made of people."]],
  ["Helping at a food drive without being paid is called…", "volunteering", ["voting", "paying taxes", "bartering"], "Volunteers give their time to help others.", "🥫", ["Voting is choosing leaders.", "Taxes are money paid to the government.", "Bartering is trading."]],
  ["A law that says to stop at red lights helps…", "keep people safe", ["make cars faster", "make streets louder", "save paint"], "Traffic laws prevent crashes.", "🚦", ["Stopping slows cars down.", "It isn't about noise.", "It isn't about paint."]],
  ["Which is a responsibility of a student?", "Doing your best work", ["Eating everyone's snacks", "Talking during tests", "Skipping class"], "Students are responsible for learning and doing their part.", "📚", ["Snacks belong to their owners.", "Tests need quiet.", "Students should come to class."]],
  );
  V40_topic(7, "social", { id: "citizens", title: "Good Citizens", icon: "🗳️", blurb: "Rules, laws, voting, rights and responsibilities.", std: "C3 D2.Civ", stdName: "C3 Civics D2.Civ.7–12: civic virtues, rules and laws",
    intro: "A citizen is a member of a community or country. Good citizens follow rules, help others, and take care of their community.", learn: "We vote to make fair group choices: the choice with the most votes wins.", pics: [["🗳️", "Vote", "make choices"], ["⚖️", "Laws", "keep us safe"], ["🧹", "Help", "clean up"], ["🤝", "Respect", "be kind"]],
    trick: "Ask: Does this help the whole community and treat people fairly?",
    mix: [[() => V40_fact(CIT, "c7ct"), 1]] });

  const CEL = [
    ["Which celebration is a Hindu “festival of lights” that many families in India celebrate with oil lamps called diyas?", "Diwali", ["Thanksgiving", "Lunar New Year", "Kwanzaa"], "Diwali is the Hindu festival of lights. Families light diyas and share sweets.", "🪔".replace("🪔", "✨"), ["Thanksgiving is an American holiday about giving thanks.", "Lunar New Year celebrates the new year on the lunar calendar.", "Kwanzaa celebrates African American culture."]],
    ["Which celebration lasts eight nights and uses a menorah?", "Hanukkah", ["Diwali", "Thanksgiving", "Día de los Muertos"], "Jewish families light a menorah during the eight nights of Hanukkah.", "🕎", ["Diwali uses diyas (oil lamps).", "Thanksgiving is one day in November.", "Día de los Muertos remembers loved ones who have died."]],
    ["Which holiday, celebrated by Muslims, comes at the end of the month of Ramadan?", "Eid al-Fitr", ["Hanukkah", "Diwali", "Kwanzaa"], "Eid al-Fitr is a happy holiday with prayers, family meals and gifts after Ramadan.", "🌙", ["Hanukkah is a Jewish holiday.", "Diwali is a Hindu festival.", "Kwanzaa celebrates African American culture."]],
    ["Which celebration often has dragon dances and red envelopes?", "Lunar New Year", ["Eid al-Fitr", "Hanukkah", "Independence Day"], "Many people in China and other Asian countries celebrate Lunar New Year with dragon dances and red envelopes.", "🐉", ["Eid al-Fitr comes at the end of Ramadan.", "Hanukkah uses a menorah.", "Independence Day has fireworks on July 4th."]],
    ["Which Mexican celebration honors family members who have died, with bright flowers and ofrendas?", "Día de los Muertos", ["Lunar New Year", "Diwali", "Thanksgiving"], "On Día de los Muertos, families remember loved ones with marigolds, photos and favorite foods.", "🌼", ["Lunar New Year celebrates a new year.", "Diwali is the Hindu festival of lights.", "Thanksgiving is about giving thanks."]],
    ["Which week-long celebration honors African American culture and uses a kinara with seven candles?", "Kwanzaa", ["Hanukkah", "Eid al-Fitr", "Lunar New Year"], "Kwanzaa lasts seven days, with one candle for each of its seven principles.", "🕯️", ["Hanukkah lasts eight nights and uses a menorah.", "Eid al-Fitr comes after Ramadan.", "Lunar New Year starts the new year."]],
    ["What do many families share on Thanksgiving?", "A big meal and giving thanks", ["Red envelopes", "A kinara", "Diyas"], "On Thanksgiving, families in the U.S. often share a meal and say what they're thankful for.", "🦃", ["Red envelopes are for Lunar New Year.", "A kinara is used for Kwanzaa.", "Diyas are lit for Diwali."]],
    ["People around the world have different traditions. What's a respectful way to learn about them?", "Ask kind questions and listen", ["Laugh at what's different", "Say yours is the only right way", "Ignore other people"], "Learning about other cultures with kindness and curiosity helps us all get along.", "🌍", ["Laughing at differences can hurt feelings.", "Many traditions can all be special.", "Listening helps us learn."]],
  ];
  CEL.push(

  ["Many people welcome the New Year on January 1 with…", "fireworks and countdowns", ["a menorah", "a kinara", "diyas"], "On New Year's Eve, many people count down to midnight.", "🎆", ["A menorah is used for Hanukkah.", "A kinara is used for Kwanzaa.", "Diyas are lit for Diwali."]],
  ["The foods, music, clothes and holidays a group of people share are called their…", "culture", ["weather", "geography", "gravity"], "Culture is the way of life a group of people shares.", "🌍", ["Weather is about the sky outside.", "Geography is about land and places.", "Gravity is a force."]],
  ["People in different places may dress differently because of…", "the weather and their traditions", ["magic", "their pets", "the moon"], "Clothes fit the weather and the traditions of a place.", "🧥", ["Clothes aren't chosen by magic.", "Pets don't decide clothes.", "The moon doesn't decide clothes."]],
  ["Which holiday do many Christians celebrate on December 25?", "Christmas", ["Diwali", "Eid al-Fitr", "Kwanzaa"], "Many Christians celebrate Christmas on December 25.", "🎄", ["Diwali is a Hindu festival in the fall.", "Eid al-Fitr comes at the end of Ramadan.", "Kwanzaa starts on December 26."]],
  ["During Ramadan, many Muslims…", "fast from sunrise to sunset", ["eat only candy", "light a menorah", "hang red envelopes"], "During Ramadan, many Muslims don't eat or drink during daylight, then share meals in the evening.", "🌙", ["Fasting means not eating during the day.", "A menorah is for Hanukkah.", "Red envelopes are for Lunar New Year."]],
  );
  V40_topic(7, "social", { id: "cultures", title: "Celebrations Around the World", icon: "🎉", blurb: "Holidays and traditions of many cultures.", std: "C3 D2.His", stdName: "C3 History / Geography: culture and traditions",
    intro: "People around the world celebrate special days in many ways, with food, lights, music and family.", learn: "Diwali has oil lamps, Hanukkah has a menorah, Lunar New Year has dragon dances, and Eid al-Fitr comes after Ramadan.", pics: [["✨", "Diwali", "festival of lights"], ["🕎", "Hanukkah", "menorah"], ["🐉", "Lunar New Year", "dragon dances"], ["🌙", "Eid al-Fitr", "after Ramadan"]],
    trick: "Look for the special object in the clue: menorah, diyas, red envelopes, or a kinara.",
    mix: [[() => V40_fact(CEL, "c7cu"), 1]] });
}

/* =================== SOCIAL STUDIES · AGE 8 (Grade 3) =================== */
{
  const CONT = [["Egypt", "", "Africa", ""], ["Kenya", "", "Africa", ""], ["Brazil", "", "South America", ""], ["Argentina", "", "South America", ""], ["China", "", "Asia", ""], ["India", "", "Asia", ""], ["Japan", "", "Asia", ""], ["France", "", "Europe", ""], ["Italy", "", "Europe", ""], ["Canada", "", "North America", ""], ["Mexico", "", "North America", ""], ["the United States", "", "North America", ""]];
  const CF = [
    ["How many continents are there?", "7", ["5", "10", "3"], "The seven continents are Africa, Antarctica, Asia, Australia, Europe, North America and South America.", "🌍", ["There are 5 oceans, but 7 continents.", "There are fewer than 10.", "There are more than 3."]],
    ["Which is the largest ocean?", "The Pacific Ocean", ["The Atlantic Ocean", "The Indian Ocean", "The Arctic Ocean"], "The Pacific is the biggest and deepest ocean.", "🌊", ["The Atlantic is second biggest.", "The Indian Ocean is third.", "The Arctic is the smallest."]],
    ["Which continent is the coldest, covered in ice?", "Antarctica", ["Africa", "Australia", "South America"], "Antarctica is at the South Pole and is covered in thick ice.", "🧊", ["Much of Africa is hot.", "Australia is mostly warm.", "Much of South America is warm."]],
    ["Which continent is also a country?", "Australia", ["Asia", "Africa", "Europe"], "Australia is both a country and a continent.", "🦘", ["Asia has many countries.", "Africa has many countries.", "Europe has many countries."]],
    ["Which ocean is between the United States and Europe?", "The Atlantic Ocean", ["The Pacific Ocean", "The Indian Ocean", "The Southern Ocean"], "The Atlantic Ocean lies between the Americas and Europe and Africa.", "🌊", ["The Pacific is west of the United States.", "The Indian Ocean is near Africa, Asia and Australia.", "The Southern Ocean surrounds Antarctica."]],
    ["What is the biggest continent?", "Asia", ["Europe", "Australia", "Antarctica"], "Asia is the largest continent and has the most people.", "🌏", ["Europe is much smaller.", "Australia is the smallest continent.", "Antarctica is big, but smaller than Asia."]],
  ];
  V40_topic(8, "social", { id: "continents", title: "Continents & Oceans", icon: "🌍", blurb: "The 7 continents, the 5 oceans and countries.", std: "C3 D2.Geo", stdName: "C3 Geography D2.Geo.2–3: world geography",
    intro: "Earth has 7 continents and 5 oceans. Countries are on continents. The United States is in North America.", learn: "The continents: Africa, Antarctica, Asia, Australia, Europe, North America and South America.", pics: [["🌎", "The Americas", "North and South"], ["🌍", "Europe & Africa", ""], ["🌏", "Asia & Australia", ""], ["🧊", "Antarctica", "coldest"]],
    trick: "Picture a globe: the Americas on one side, Europe and Africa in the middle, Asia and Australia on the other side.",
    mix: [[() => V40_match(CONT, { ab: p => `On which continent is <b>${p[0]}</b>?`, why: p => `${cap(p[0])} is in ${p[2]}.`, whyB: x => `${x[2]} is home to countries like ${x[0]}, but not this one.` }, "c8c"), 2], [() => V40_fact(CF, "c8cf"), 2]] });

  const LEAD = [["mayor", "", "leads a city or town", "🏙️"], ["governor", "", "leads a state", "🗺️"], ["President", "", "leads the whole country", "🇺🇸"]];
  const GOV = [
    ["Who leads a state?", "The governor", ["The mayor", "The President", "The principal"], "Each state has a governor.", "🏛️", ["A mayor leads a city or town.", "The President leads the whole country.", "A principal leads a school."]],
    ["What do taxes help pay for?", "Roads, schools, parks and firefighters", ["Only toys for adults", "Private vacations", "Video games"], "Taxes are money people pay to the government for things everyone uses.", "🛣️", ["Taxes pay for things everyone shares.", "Taxes aren't for private trips.", "Taxes don't buy video games for people."]],
    ["Where does the national government meet?", "Washington, D.C.", ["New York City", "Los Angeles", "Chicago"], "Washington, D.C., is the capital of the United States.", "🏛️", ["New York City is the biggest city, but not the capital.", "Los Angeles is a big city in California.", "Chicago is a big city in Illinois."]],
    ["Laws for the whole country are made by…", "Congress", ["the mayor", "a teacher", "the city zoo"], "Congress writes the national laws.", "📜", ["A mayor helps lead a city.", "Teachers make class rules, not national laws.", "Zoos don't make laws."]],
    ["People choose their leaders by…", "voting in elections", ["drawing names from a hat", "running a race", "flipping a coin"], "In a democracy, citizens vote to choose leaders.", "🗳️", ["Leaders aren't picked from a hat.", "Races don't choose leaders.", "Coins don't choose leaders."]],
  ];
  V40_topic(8, "social", { id: "government", title: "Government & Leaders", icon: "🏛️", blurb: "Local, state and national government.", std: "C3 D2.Civ", stdName: "C3 Civics D2.Civ.1–6: government at different levels",
    intro: "Government makes laws and provides services. There are three levels: local (city or town), state, and national (the whole country).", learn: "A mayor leads a city, a governor leads a state, and the President leads the country.", pics: [["🏙️", "Mayor", "city"], ["🗺️", "Governor", "state"], ["🇺🇸", "President", "country"], ["🗳️", "Voting", "choose leaders"]],
    trick: "City → mayor, state → governor, country → President.",
    mix: [[() => V40_match(LEAD, { ab: p => `What does the <b>${p[0]}</b> do?`, ba: p => `Who <b>${p[2]}</b>?`, why: p => `The ${p[0]} ${p[2]}.`, whyB: x => `The ${x[0]} ${x[2]}.`, whyA: x => `The ${x[0]} ${x[2]}.` }, "c8l"), 1.5], [() => V40_fact(GOV, "c8g"), 2]] });

  /* computed: grid map coordinates */
  function gridMap() {
    const cols = ["A", "B", "C", "D"], rows = 4, pl = shuffle(PLACES8.slice()).slice(0, 5), cells = shuffle(range(0, 15)).slice(0, 5);
    const i = R(0, 4), r = Math.floor(cells[i] / 4), c = cells[i] % 4, ans = `${cols[c]}${r + 1}`;
    const grid = Array(16).fill(""); pl.forEach((p, k) => { grid[cells[k]] = `<span class="emo" title="${p[0]}">${p[1]}</span>`; });
    const wrong = [`${r + 1}${cols[c]}`.length === 2 ? `${cols[r] || "A"}${c + 1}` : "", `${cols[c]}${((r + 1) % 4) + 1}`, `${cols[(c + 1) % 4]}${r + 1}`, `${cols[(c + 3) % 4]}${r + 1}`].filter((x, k, a) => x && x !== ans && a.indexOf(x) === k).slice(0, 3);
    const whyNot = {}; wrong.forEach(w => { whyNot[w] = w[0] === cols[c] ? `The column is right, but count the rows again: the ${pl[i][0]} is in row ${r + 1}.` : w.slice(1) === String(r + 1) ? `The row is right, but look at the letter above the ${pl[i][0]}: it's ${cols[c]}.` : `Letters go across the top and numbers go down the side. Find the letter first, then the number.`; });
    const vis = `<div class="v40-gridmap"><span></span>${cols.map(x => `<b>${x}</b>`).join("")}${range(1, rows).map(rr => `<b>${rr}</b>${range(0, 3).map(cc => `<span>${grid[(rr - 1) * 4 + cc]}</span>`).join("")}`).join("")}</div>`;
    return V40_Q({ q: `Which square is the <b>${pl[i][0]}</b> in?`, vis, opts: shuffle([ans, ...wrong]), ans, why: `The ${pl[i][0]} is under column ${cols[c]} and across from row ${r + 1}: ${ans}.`, whyNot, key: `c8m${cells}${i}`, big: 0 });
  }
  const PLACES8 = [["school", "🏫"], ["park", "🌳"], ["library", "📚"], ["store", "🏪"], ["museum", "🏛️"], ["hospital", "🏥"], ["zoo", "🦁"], ["pool", "🏊"]];
  const SCALE = [
    ["A map scale says 1 inch = 10 miles. Two towns are 3 inches apart on the map. How far apart are they really?", "30 miles", ["3 miles", "13 miles", "10 miles"], "Each inch is 10 miles, so 3 inches = 3 × 10 = 30 miles.", "📏", ["3 is the inches on the map, not the miles.", "13 adds 3 + 10; you need 3 × 10.", "10 miles is only 1 inch."]],
    ["A map scale says 1 inch = 5 miles. The lake is 4 inches away on the map. How many miles is that?", "20 miles", ["9 miles", "4 miles", "5 miles"], "4 inches × 5 miles = 20 miles.", "📏", ["9 adds 4 + 5; multiply instead.", "4 is the inches on the map.", "5 miles is only 1 inch."]],
    ["What is the equator?", "An imaginary line around the middle of Earth", ["A real rope around Earth", "A mountain", "A river in Africa"], "The equator is an imaginary line halfway between the North and South Poles.", "🌍", ["You can't see or touch the equator.", "It isn't a mountain.", "It isn't a river."]],
  ];
  V40_topic(8, "social", { id: "mapskills", title: "Map Grids & Scales", icon: "📍", blurb: "Find places with grid squares and measure with a map scale.", std: "C3 D2.Geo", stdName: "C3 Geography D2.Geo.1: using maps and grids",
    intro: "Many maps have a grid: letters across the top and numbers down the side. A map scale tells how far apart places really are.", learn: "To find B3, go across to column B, then down to row 3.", pics: [["🔤", "Letters", "across the top"], ["🔢", "Numbers", "down the side"], ["📍", "B3", "column B, row 3"], ["📏", "Scale", "real distance"]],
    trick: "Letter first, then number: go across, then down.",
    mix: [[() => gridMap(), 3], [() => V40_fact(SCALE, "c8sc"), 1]] });

  const ECO = [
    ["There are only 3 cookies and 5 kids want one. This is an example of…", "scarcity", ["a surplus", "a tax", "a vote"], "Scarcity means there isn't enough for everyone who wants it.", "🍪", ["A surplus means there's extra.", "Taxes are money paid to the government.", "A vote is a way to decide."]],
    ["Maya has $5. She chooses a book instead of a toy. The toy is her…", "opportunity cost", ["income", "profit", "tax"], "Opportunity cost is the thing you give up when you make a choice.", "📖", ["Income is money you earn.", "Profit is money left after costs.", "A tax is paid to the government."]],
    ["Money you earn from a job is called…", "income", ["a loan", "a budget", "a gift"], "Income is money earned by working.", "💵", ["A loan has to be paid back.", "A budget is a plan for money.", "A gift isn't earned by working."]],
    ["A plan for how to spend and save money is a…", "budget", ["receipt", "coin", "bank"], "A budget helps you plan spending and saving.", "📝", ["A receipt shows what you already bought.", "A coin is money.", "A bank keeps money safe."]],
  ];
  function saveQ() {
    const nm = pick(KIDS), w = R(2, 6), price = w * R(2, 5) + R(0, 1) * w, per = R(2, 6), weeks = Math.ceil(price / per);
    const ans = String(weeks), opts = numU(weeks, [weeks - 1, weeks + 1, price - per, price], 2, 1), whyNot = {};
    opts.forEach(o => { if (o === ans) return; const v = +o; whyNot[o] = v === weeks - 1 ? `After ${v} weeks, ${nm} has $${v * per}, which is less than $${price}.` : v * per >= price ? `${nm} would already have enough before week ${v}.` : `After ${v} weeks, ${nm} has $${v * per}. Keep counting by ${per}s.`; });
    return V40_Q({ q: `${nm} saves <b>$${per} each week</b> to buy a game that costs <b>$${price}</b>. How many weeks until ${nm} has enough?`, opts, ans, why: `Count by ${per}s: ${range(1, weeks).map(k => "$" + k * per).join(", ")}. After ${weeks} weeks, ${nm} has enough.`, whyNot, key: `c8sv${nm}${per}${price}`, vis: `<div class="v27-show sm">🐷💵</div>` });
  }
  V40_topic(8, "social", { id: "economics", title: "Money Choices", icon: "💵", blurb: "Scarcity, choices, income, budgets and saving.", std: "C3 D2.Eco", stdName: "C3 Economics D2.Eco.1–3: scarcity, choices and saving",
    intro: "We can't have everything we want, so we make choices. A budget is a plan for spending and saving money.", learn: "When you choose one thing, what you give up is the opportunity cost.", pics: [["🍪", "Scarcity", "not enough"], ["⚖️", "Choice", "pick one"], ["💵", "Income", "money earned"], ["🐷", "Saving", "for later"]],
    trick: "Count up by the amount you save each week until you reach the price.",
    mix: [[() => V40_fact(ECO, "c8e"), 2], [() => saveQ(), 2]] });

  const USG = [
    ["What is the capital of the United States?", "Washington, D.C.", ["New York City", "Philadelphia", "Boston"], "Washington, D.C., is where the national government meets.", "🏛️", ["New York City is the biggest city, not the capital.", "Philadelphia was an early capital, but not today.", "Boston is the capital of Massachusetts."]],
    ["How many states are in the United States?", "50", ["13", "48", "100"], "There are 50 states. Alaska and Hawaii were the last two to join, in 1959.", "🇺🇸", ["13 were the first colonies.", "There were 48 before Alaska and Hawaii joined.", "There are 50, not 100."]],
    ["Which country is north of the United States?", "Canada", ["Mexico", "Brazil", "Cuba"], "Canada is the large country to the north.", "🧭", ["Mexico is to the south.", "Brazil is in South America.", "Cuba is an island to the south."]],
    ["Which country is south of the United States?", "Mexico", ["Canada", "England", "Japan"], "Mexico shares a border with the southern United States.", "🧭", ["Canada is to the north.", "England is across the Atlantic Ocean.", "Japan is across the Pacific Ocean."]],
    ["Which ocean is on the west coast of the United States?", "The Pacific Ocean", ["The Atlantic Ocean", "The Arctic Ocean", "The Indian Ocean"], "The Pacific Ocean touches California, Oregon and Washington.", "🌊", ["The Atlantic is on the east coast.", "The Arctic is far north, near Alaska.", "The Indian Ocean is far away."]],
    ["Which state is made up of islands in the Pacific Ocean?", "Hawaii", ["Alaska", "Texas", "Florida"], "Hawaii is a chain of islands in the Pacific.", "🏝️", ["Alaska is mostly a big piece of land in the far north.", "Texas is on the mainland.", "Florida is a peninsula on the mainland."]],
    ["What are the Great Lakes?", "Five big lakes between the U.S. and Canada", ["Five oceans", "Five rivers in Texas", "Five mountains"], "The five Great Lakes are Superior, Michigan, Huron, Erie and Ontario.", "🏞️", ["Lakes are smaller than oceans.", "They aren't rivers, and they're in the north.", "They are lakes, not mountains."]],
  ];
  USG.push(

  ["Which is the largest state by area?", "Alaska", ["Texas", "California", "Rhode Island"], "Alaska is by far the biggest state.", "🏔️", ["Texas is second biggest.", "California is third biggest.", "Rhode Island is the smallest."]],
  ["Which is the smallest state by area?", "Rhode Island", ["Alaska", "Texas", "Florida"], "Rhode Island is the smallest state.", "📏", ["Alaska is the largest.", "Texas is very large.", "Florida is much bigger."]],
  ["Which long river flows south through the middle of the United States?", "The Mississippi River", ["The Nile River", "The Amazon River", "The Thames River"], "The Mississippi flows from Minnesota all the way to the south.", "🏞️", ["The Nile is in Africa.", "The Amazon is in South America.", "The Thames is in England."]],
  ["Which mountains are in the eastern United States?", "The Appalachian Mountains", ["The Rocky Mountains", "The Andes", "The Alps"], "The Appalachians run through many eastern states.", "⛰️", ["The Rockies are in the West.", "The Andes are in South America.", "The Alps are in Europe."]],
  ["Which state is a peninsula, with water on three sides?", "Florida", ["Kansas", "Colorado", "Ohio"], "Florida sticks out into the water, with ocean on three sides.", "🏖️", ["Kansas has no ocean coast.", "Colorado has no ocean coast.", "Ohio has no ocean coast."]],
  );
  V40_topic(8, "social", { id: "usgeo", title: "U.S. Geography", icon: "🗺️", blurb: "States, neighbors, oceans and the capital.", std: "C3 D2.Geo", stdName: "C3 Geography D2.Geo.2–5: places and regions of the United States",
    intro: "The United States has 50 states. Canada is to the north and Mexico is to the south. The capital is Washington, D.C.", learn: "The Atlantic Ocean is on the east coast and the Pacific Ocean is on the west coast.", pics: [["🇺🇸", "50 states", ""], ["🏛️", "Washington, D.C.", "capital"], ["🧭", "Canada", "north"], ["🌊", "Two oceans", "east and west"]],
    trick: "Picture the map: Canada on top, Mexico on the bottom, Atlantic on the right, Pacific on the left.",
    mix: [[() => V40_fact(USG, "c8u"), 1]] });
}

/* =================== SOCIAL STUDIES · AGE 9 (Grade 4) =================== */
{
  const REG = [["Florida", "", "the Southeast", ""], ["Georgia", "", "the Southeast", ""], ["New York", "", "the Northeast", ""], ["Maine", "", "the Northeast", ""], ["Ohio", "", "the Midwest", ""], ["Illinois", "", "the Midwest", ""], ["Arizona", "", "the Southwest", ""], ["New Mexico", "", "the Southwest", ""], ["California", "", "the West", ""], ["Oregon", "", "the West", ""]];
  const RF = [
    ["Which region is known for deserts, canyons and hot, dry weather?", "The Southwest", ["The Northeast", "The Midwest", "The Southeast"], "The Southwest has deserts and canyons, like the Grand Canyon in Arizona.", "🏜️", ["The Northeast has cold winters and old cities.", "The Midwest has flat farmland.", "The Southeast is warm and humid with beaches."]],
    ["Which region has lots of flat farmland and is called America's “breadbasket”?", "The Midwest", ["The Southwest", "The Northeast", "The West"], "The Midwest grows a lot of corn and wheat.", "🌽", ["The Southwest is mostly dry.", "The Northeast has more cities and hills.", "The West has mountains and coast."]],
    ["Which mountains run through the western United States?", "The Rocky Mountains", ["The Appalachian Mountains", "The Alps", "The Himalayas"], "The Rocky Mountains stretch through many western states.", "⛰️", ["The Appalachians are in the east.", "The Alps are in Europe.", "The Himalayas are in Asia."]],
  ];
  V40_topic(9, "social", { id: "regions", title: "U.S. Regions", icon: "🧭", blurb: "Northeast, Southeast, Midwest, Southwest and West.", std: "C3 D2.Geo", stdName: "C3 Geography D2.Geo.4–8: regions of the United States",
    intro: "The United States is often split into five regions: the Northeast, Southeast, Midwest, Southwest and West. Each has its own land, climate and resources.", learn: "Florida is in the Southeast, Ohio in the Midwest, Arizona in the Southwest, and California in the West.", pics: [["🗽", "Northeast", "New York"], ["🌴", "Southeast", "Florida"], ["🌽", "Midwest", "farms"], ["🏜️", "Southwest", "deserts"], ["🏔️", "West", "mountains"]],
    trick: "Picture the map: top right = Northeast, bottom right = Southeast, middle = Midwest, bottom left = Southwest, far left = West.",
    mix: [[() => V40_match(REG, { ab: p => `Which region is <b>${p[0]}</b> in?`, why: p => `${p[0]} is in ${p[2]}.`, whyB: x => `${cap(x[2])} has states like ${x[0]}, but not this one.` }, "c9r"), 2.5], [() => V40_fact(RF, "c9rf"), 1.5]] });

  const BR = [["legislative branch", "", "makes the laws (Congress)", "📜"], ["executive branch", "", "carries out the laws (the President)", "🇺🇸"], ["judicial branch", "", "decides what laws mean (the courts)", "⚖️"]];
  const BF = [
    ["Why does the government have three branches?", "So no one branch has too much power", ["So there are more holidays", "To make laws harder to read", "So the President can do anything"], "Checks and balances let each branch limit the others.", "⚖️", ["Branches aren't about holidays.", "That isn't the reason.", "Checks and balances stop that."]],
    ["What is the U.S. Constitution?", "The plan for the government and the highest law", ["A kind of money", "A famous ship", "A state flag"], "The Constitution sets up the government and protects people's rights.", "📜", ["It isn't money.", "It isn't a ship.", "It isn't a flag."]],
    ["What are the first ten amendments to the Constitution called?", "The Bill of Rights", ["The Declaration of Independence", "The Pledge of Allegiance", "The national anthem"], "The Bill of Rights protects freedoms like speech and religion.", "📜", ["The Declaration came in 1776, before the Constitution.", "The Pledge is a promise of loyalty.", "The anthem is a song."]],
    ["Who leads the executive branch?", "The President", ["The Chief Justice", "The Speaker of the House", "The governor"], "The President is the head of the executive branch.", "🇺🇸", ["The Chief Justice leads the Supreme Court.", "The Speaker leads the House in Congress.", "A governor leads a state."]],
    ["Congress has two parts. They are the Senate and the…", "House of Representatives", ["Supreme Court", "White House", "Cabinet"], "Congress = the Senate + the House of Representatives.", "🏛️", ["The Supreme Court is the judicial branch.", "The White House is where the President works.", "The Cabinet advises the President."]],
  ];
  V40_topic(9, "social", { id: "branches", title: "Three Branches", icon: "⚖️", blurb: "Legislative, executive and judicial.", std: "C3 D2.Civ", stdName: "C3 Civics D2.Civ.3–5: the U.S. Constitution and branches of government",
    intro: "The U.S. government has three branches. Congress makes laws, the President carries them out, and the courts decide what laws mean.", learn: "Checks and balances keep any one branch from getting too much power.", pics: [["📜", "Legislative", "makes laws"], ["🇺🇸", "Executive", "carries out laws"], ["⚖️", "Judicial", "explains laws"]],
    trick: "Make, carry out, explain: legislative, executive, judicial.",
    mix: [[() => V40_match(BR, { ab: p => `What does the <b>${p[0]}</b> do?`, ba: p => `Which branch <b>${p[2]}</b>?`, why: p => `The ${p[0]} ${p[2]}.`, whyB: x => `The ${x[0]} ${x[2]}.`, whyA: x => `The ${x[0]} ${x[2]}.` }, "c9b"), 2], [() => V40_fact(BF, "c9bf"), 2]] });

  const HIST = [
    ["Who lived in North America before European explorers arrived?", "Many Native American nations", ["No one at all", "Only explorers from Spain", "The first U.S. presidents"], "Native American nations lived across North America for thousands of years, each with its own culture.", "🏕️", ["Many Native nations lived here for thousands of years.", "Explorers came much later.", "Presidents came much later."]],
    ["Native nations of the Great Plains often lived in tipis. Why were tipis useful?", "They could be packed up to follow the buffalo", ["They were made of bricks", "They floated on water", "They had electricity"], "Plains nations moved to follow buffalo herds, so portable tipis made sense.", "🏕️", ["Tipis were made of poles and hides, not bricks.", "Tipis weren't boats.", "There was no electricity long ago."]],
    ["The Pueblo peoples of the Southwest built homes from…", "adobe (sun-dried clay bricks)", ["snow blocks", "palm leaves", "steel"], "Adobe stays cool in the hot desert.", "🏜️", ["Snow blocks are for very cold places.", "Palm leaves are used in tropical places.", "Steel wasn't used long ago."]],
    ["In what year was the Declaration of Independence signed?", "1776", ["1492", "1620", "1865"], "The Declaration of Independence was adopted on July 4, 1776.", "📜", ["1492 is when Columbus sailed.", "1620 is when the Mayflower arrived.", "1865 is when the Civil War ended."]],
    ["Who was the first President of the United States?", "George Washington", ["Abraham Lincoln", "Thomas Jefferson", "Benjamin Franklin"], "George Washington became the first President in 1789.", "🇺🇸", ["Lincoln was the 16th President.", "Jefferson was the 3rd President.", "Franklin was never President."]],
    ["The Pilgrims sailed to America in 1620 on a ship called the…", "Mayflower", ["Titanic", "Santa María", "Liberty Bell"], "The Mayflower brought the Pilgrims to Plymouth.", "⛵", ["The Titanic sailed in 1912.", "The Santa María was Columbus's ship.", "The Liberty Bell is a bell, not a ship."]],
    ["How many colonies joined together to become the United States?", "13", ["50", "7", "3"], "The 13 colonies declared independence from Great Britain.", "🇺🇸", ["There are 50 states today.", "There were more than 7.", "There were more than 3."]],
  ];
  HIST.push(

  ["Native nations of the Northeast, like the Haudenosaunee, lived in long wooden houses called…", "longhouses", ["igloos", "skyscrapers", "castles"], "Longhouses were long homes shared by several families.", "🏠", ["Igloos are snow houses from the far north.", "Skyscrapers are modern buildings.", "Castles were built in Europe."]],
  ["Whose ships reached the Americas in 1492?", "Christopher Columbus's", ["George Washington's", "Neil Armstrong's", "Abraham Lincoln's"], "Columbus sailed from Spain and reached the Caribbean in 1492.", "⛵", ["Washington lived in the 1700s.", "Armstrong walked on the moon in 1969.", "Lincoln lived in the 1800s."]],
  ["Who wrote most of the Declaration of Independence?", "Thomas Jefferson", ["George Washington", "Abraham Lincoln", "Benjamin Franklin"], "Thomas Jefferson wrote the first draft in 1776.", "📜", ["Washington led the army.", "Lincoln lived much later.", "Franklin helped edit it, but Jefferson wrote most of it."]],
  ["The colonists fought the American Revolution to…", "be free from British rule", ["join Spain", "stop farming", "move to Canada"], "The colonists wanted to govern themselves.", "🇺🇸", ["They wanted independence, not to join Spain.", "Farming wasn't the reason.", "They wanted their own country."]],
  ["Native people helped the Pilgrims learn how to…", "grow corn", ["fly kites", "drive cars", "use computers"], "Native people, like Tisquantum (Squanto) of the Wampanoag region, showed the Pilgrims how to grow corn.", "🌽", ["Kites weren't the lesson.", "There were no cars then.", "There were no computers then."]],
  ["Benjamin Franklin is famous for experiments with…", "electricity", ["airplanes", "telephones", "rockets"], "Franklin's famous kite experiment showed lightning is electricity.", "⚡", ["Airplanes came in 1903.", "Telephones came in the 1870s.", "Rockets came much later."]],
  );
  V40_topic(9, "social", { id: "earlyamerica", title: "Early America", icon: "🏕️", blurb: "Native nations, colonies and a new country.", std: "C3 D2.His", stdName: "C3 History D2.His.1–3: early American history",
    intro: "Native American nations lived across North America for thousands of years. Later, colonists came from Europe, and in 1776 the 13 colonies declared independence.", learn: "Homes fit the land: tipis on the Plains, adobe pueblos in the Southwest, and longhouses in the Northeast.", pics: [["🏕️", "Tipi", "Plains nations"], ["🏜️", "Adobe", "Pueblo peoples"], ["⛵", "Mayflower", "1620"], ["📜", "Declaration", "1776"]],
    trick: "Put events on a timeline: Native nations first, then explorers, colonies, and independence in 1776.",
    mix: [[() => V40_fact(HIST, "c9h"), 1]] });

  /* computed: timelines */
  const EV = [[1492, "Columbus sails to the Americas"], [1620, "The Mayflower arrives"], [1776, "The Declaration of Independence"], [1789, "Washington becomes President"], [1803, "The Louisiana Purchase"], [1865, "The Civil War ends"], [1903, "The first airplane flight"], [1969, "People walk on the moon"]];
  function timeline() {
    const m = pick(["between", "first", "order"]);
    if (m === "between") {
      const [a, b] = shuffle(EV.slice()).slice(0, 2).sort((x, y) => x[0] - y[0]), d = b[0] - a[0];
      const opts = numU(d, [d + 10, d - 10, d + 100, a[0] + b[0] > 4000 ? d + 1 : d - 1].filter(x => x > 0), 2, 1), ans = String(d), whyNot = {};
      opts.forEach(o => { if (o !== ans) whyNot[o] = `Subtract the years: ${b[0]} − ${a[0]} = ${d}.`; });
      return V40_Q({ q: `How many years passed between <b>${a[1]}</b> (${a[0]}) and <b>${b[1]}</b> (${b[0]})?`, vis: `<div class="v40-tl"><span>${a[0]}</span><i></i><span>${b[0]}</span></div>`, opts, ans, why: `${b[0]} − ${a[0]} = ${d} years.`, whyNot, key: `c9t${a[0]}${b[0]}` });
    }
    const four = shuffle(EV.slice()).slice(0, 4), sorted = four.slice().sort((x, y) => x[0] - y[0]);
    const ask = m === "first" ? "happened FIRST" : "happened LAST", tgt = m === "first" ? sorted[0] : sorted[3], whyNot = {};
    four.forEach(e => { if (e !== tgt) whyNot[e[1]] = `That was in ${e[0]}. ${m === "first" ? `${tgt[0]} is earlier.` : `${tgt[0]} is later.`}`; });
    return V40_Q({ q: `Which event happened <b>${m === "first" ? "FIRST" : "LAST"}</b>? <small>(Use the years.)</small>`, say: `Which event happened ${m === "first" ? "first" : "last"}? Use the years.`, vis: `<div class="v40-evs">${four.map(e => `<span><b>${e[0]}</b> ${e[1]}</span>`).join("")}</div>`, opts: shuffle(four.map(e => e[1])), ans: tgt[1], why: `“${tgt[1]}” was in ${tgt[0]}, the ${m === "first" ? "earliest" : "latest"} year.`, whyNot, key: `c9to${four.map(e => e[0])}${m}` });
  }
  const SRC = [
    ["A diary written by a soldier in 1776 is a…", "primary source", ["secondary source", "map key", "fiction story"], "A primary source was made by someone who was there.", "📔", ["A secondary source is written later by someone who wasn't there.", "A map key explains map symbols.", "A real diary isn't fiction."]],
    ["A textbook chapter about the Revolution written last year is a…", "secondary source", ["primary source", "diary", "photograph from 1776"], "Secondary sources are written later, about events the author didn't see.", "📘", ["A primary source comes from someone who was there.", "A diary is usually a primary source.", "There were no photographs in 1776."]],
  ];
  V40_topic(9, "social", { id: "timelines", title: "Timelines & Sources", icon: "📜", blurb: "Order events, count years and use sources.", std: "C3 D2.His", stdName: "C3 History D2.His.1, D2.His.9–10: chronology and sources",
    intro: "A timeline shows events in order. To find how many years apart two events are, subtract the earlier year from the later year.", learn: "A primary source comes from someone who was there, like a diary. A secondary source is written later.", pics: [["📅", "Timeline", "events in order"], ["➖", "Subtract", "later − earlier"], ["📔", "Diary", "primary source"], ["📘", "Textbook", "secondary source"]],
    trick: "Smaller year = earlier. Bigger year = later. Subtract to find the years between.",
    mix: [[() => timeline(), 3], [() => V40_fact(SRC, "c9s"), 1]] });

  function budget() {
    const nm = pick(KIDS), items = shuffle([["a book", R(4, 9)], ["a snack", R(2, 4)], ["a movie ticket", R(8, 12)], ["art supplies", R(5, 10)], ["a gift for a friend", R(6, 11)]]).slice(0, 2), spent = items[0][1] + items[1][1], inc = (Math.ceil((spent + 3) / 5) + R(0, 4)) * 5, left = inc - spent;
    const ans = "$" + left, opts = [ans, "$" + (inc + spent), "$" + spent, "$" + (left + 1)].filter((x, i, a) => a.indexOf(x) === i), whyNot = {};
    opts.forEach(o => { if (o === ans) return; const v = +o.slice(1); whyNot[o] = v === spent ? `$${spent} is how much ${nm} spent. Subtract it from $${inc}.` : v === inc + spent ? `Spending takes money away, so subtract instead of adding.` : `Check the math: $${inc} − $${items[0][1]} − $${items[1][1]} = $${left}.`; });
    return V40_Q({ q: `${nm} earns <b>$${inc}</b>. ${nm} spends <b>$${items[0][1]}</b> on ${items[0][0]} and <b>$${items[1][1]}</b> on ${items[1][0]}. How much is left to save?`, opts: shuffle(opts), ans, why: `$${items[0][1]} + $${items[1][1]} = $${spent} spent. $${inc} − $${spent} = $${left} left to save.`, whyNot, key: `c9b${inc}${items.map(x => x[1])}`, vis: `<div class="v27-show sm">💵📝</div>` });
  }
  const BUD = [
    ["When demand for a toy goes up but there are only a few, the price usually…", "goes up", ["goes down", "becomes free", "never changes"], "When many people want something scarce, sellers can charge more.", "📈", ["Prices usually drop when there's a lot and few want it.", "Sellers still charge for it.", "Prices change with supply and demand."]],
    ["A business that makes goods to sell is a…", "producer", ["consumer", "voter", "tourist"], "Producers make goods or provide services.", "🏭", ["Consumers buy goods.", "Voting is about government.", "Tourists visit places."]],
    ["Countries trade so they can…", "get things they can't easily make themselves", ["stop making anything", "keep everything secret", "make money disappear"], "Trade lets countries share what they make best.", "🚢", ["Trading countries still make goods.", "Trade means sharing goods.", "Trade doesn't make money disappear."]],
  ];
  V40_topic(9, "social", { id: "budget", title: "Budgets & Trade", icon: "💰", blurb: "Income, spending, saving, supply and demand.", std: "C3 D2.Eco", stdName: "C3 Economics D2.Eco.1–3, D2.Eco.14: budgets, markets and trade",
    intro: "A budget compares income (money coming in) with expenses (money going out). What's left can be saved.", learn: "Prices often go up when many people want something and there isn't much of it.", pics: [["💵", "Income", "money in"], ["🧾", "Expenses", "money out"], ["🐷", "Savings", "what's left"], ["🚢", "Trade", "sharing goods"]],
    trick: "Add up what you spend, then subtract it from what you earn.",
    mix: [[() => budget(), 2.5], [() => V40_fact(BUD, "c9bd"), 1.5]] });
}
