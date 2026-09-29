export type FxType =
  | "beam"
  | "lightning"
  | "shield"
  | "smash"
  | "arrows"
  | "electric"
  | "web"
  | "portal"
  | "claws"
  | "shrink"
  | "hex"
  | "missiles"
  | "dive"
  | "snap";

export type EmblemId =
  | "ironman"
  | "cap"
  | "thor"
  | "hulk"
  | "widow"
  | "hawkeye"
  | "marvel"
  | "spidey"
  | "strange"
  | "panther"
  | "antman"
  | "wanda"
  | "rocket"
  | "nebula"
  | "warmachine"
  | "falcon"
  | "wasp"
  | "thanos";

export interface Hero {
  slug: string;
  name: string;
  alias: string;
  actor: string;
  emblem: EmblemId;
  color: string;
  accent: string;
  tagline: string;
  quote: string;
  bio: string;
  endgameRole: string;
  moments: string[];
  stats: { strength: number; speed: number; intelligence: number; combat: number; energy: number };
  signature: { name: string; description: string; fx: FxType; damage: number };
}

export const heroes: Hero[] = [
  {
    slug: "iron-man",
    name: "Iron Man",
    alias: "Tony Stark",
    actor: "Robert Downey Jr.",
    emblem: "ironman",
    color: "#ff3b30",
    accent: "#ffd60a",
    tagline: "Genius. Billionaire. Hero. Father.",
    quote: "I am Iron Man.",
    bio: "After being stranded in space and losing to Thanos, Tony builds a quiet life with Pepper and his daughter Morgan. When Scott brings the quantum realm theory, Tony cracks time travel in one night — and returns for one final fight.",
    endgameRole: "Solves time travel, builds the Nano Gauntlet, and makes the final snap that ends Thanos forever.",
    moments: [
      "Cracks the time-travel GPS using a Möbius strip model",
      "Meets his father Howard at Camp Lehigh, 1970",
      "Battles Thanos alongside Cap and Thor",
      "Steals the Infinity Stones and snaps: \"I am Iron Man\"",
    ],
    stats: { strength: 78, speed: 85, intelligence: 100, combat: 82, energy: 92 },
    signature: {
      name: "Unibeam + Repulsor Barrage",
      description: "The arc reactor charges to full output and fires a concentrated unibeam backed by twin palm repulsors.",
      fx: "beam",
      damage: 1400,
    },
  },
  {
    slug: "captain-america",
    name: "Captain America",
    alias: "Steve Rogers",
    actor: "Chris Evans",
    emblem: "cap",
    color: "#2563eb",
    accent: "#ef4444",
    tagline: "The first Avenger. The last to give up.",
    quote: "Avengers... assemble.",
    bio: "Steve leads a support group for survivors, but never stops believing the snap can be undone. He leads the Time Heist, fights his 2012 self, and proves worthy of Mjolnir.",
    endgameRole: "Leads the Time Heist, wields Mjolnir, rallies every hero with \"Avengers, assemble\", and returns the stones.",
    moments: [
      "\"Hail Hydra\" in the 2012 elevator",
      "Fights his 2012 self: \"I can do this all day\"",
      "Lifts Mjolnir and strikes Thanos with lightning",
      "Returns the stones and finally gets his dance with Peggy",
    ],
    stats: { strength: 80, speed: 72, intelligence: 78, combat: 98, energy: 55 },
    signature: {
      name: "Vibranium Shield Ricochet",
      description: "A perfectly angled shield throw that bounces off the target and returns straight to his arm.",
      fx: "shield",
      damage: 1100,
    },
  },
  {
    slug: "thor",
    name: "Thor",
    alias: "God of Thunder",
    actor: "Chris Hemsworth",
    emblem: "thor",
    color: "#38bdf8",
    accent: "#e0f2fe",
    tagline: "Still worthy.",
    quote: "I'm still worthy!",
    bio: "Haunted by failing to stop the snap, Thor retreats to New Asgard. A visit to 2013 Asgard and a talk with his mother Frigga restores his heart — and Mjolnir answers his call once again.",
    endgameRole: "Retrieves the Reality Stone from Asgard 2013 and fights Thanos with Stormbreaker and Mjolnir together.",
    moments: [
      "Beheads Thanos in the garden in the opening minutes",
      "Frigga reminds him: be who you are",
      "Summons Mjolnir: \"I'm still worthy!\"",
      "Dual-wields Stormbreaker and Mjolnir in the final battle",
    ],
    stats: { strength: 96, speed: 82, intelligence: 60, combat: 90, energy: 98 },
    signature: {
      name: "Bifrost Thunderstrike",
      description: "Calls down the storm and channels it through Stormbreaker and Mjolnir in a single lightning barrage.",
      fx: "lightning",
      damage: 1800,
    },
  },
  {
    slug: "hulk",
    name: "Smart Hulk",
    alias: "Bruce Banner",
    actor: "Mark Ruffalo",
    emblem: "hulk",
    color: "#22c55e",
    accent: "#a855f7",
    tagline: "Brains and brawn. Finally at peace.",
    quote: "Best of both worlds.",
    bio: "Bruce spends 18 months merging his intellect with the Hulk's body. In the end he wears the Nano Gauntlet and survives the snap that brings back half the universe.",
    endgameRole: "Snaps everyone back to life, taking the full force of the stones — his arm is permanently scarred.",
    moments: [
      "Takes selfies and helps fans as Smart Hulk",
      "Meets the Ancient One in 2012 New York",
      "Snaps back half of all life",
      "Holds the collapsing compound roof to save his friends",
    ],
    stats: { strength: 100, speed: 60, intelligence: 96, combat: 76, energy: 80 },
    signature: {
      name: "Gamma Thunderclap",
      description: "A ground-shattering smash that sends a gamma shockwave rippling through the battlefield.",
      fx: "smash",
      damage: 1600,
    },
  },
  {
    slug: "black-widow",
    name: "Black Widow",
    alias: "Natasha Romanoff",
    actor: "Scarlett Johansson",
    emblem: "widow",
    color: "#ef4444",
    accent: "#111827",
    tagline: "The heart of the Avengers.",
    quote: "Whatever it takes.",
    bio: "For five years Natasha keeps the remaining Avengers together from the compound. On Vormir she makes the ultimate choice so the team can win.",
    endgameRole: "Sacrifices herself on Vormir so Clint can take the Soul Stone.",
    moments: [
      "Coordinates the remaining Avengers across the galaxy",
      "Finds Clint in Tokyo and brings him home",
      "Races Clint to the edge on Vormir",
      "\"Let me go. It's okay.\"",
    ],
    stats: { strength: 55, speed: 80, intelligence: 88, combat: 96, energy: 40 },
    signature: {
      name: "Widow's Bite",
      description: "Acrobatic strike followed by a crackling burst of electrified batons.",
      fx: "electric",
      damage: 900,
    },
  },
  {
    slug: "hawkeye",
    name: "Hawkeye",
    alias: "Clint Barton / Ronin",
    actor: "Jeremy Renner",
    emblem: "hawkeye",
    color: "#a855f7",
    accent: "#f59e0b",
    tagline: "Never misses.",
    quote: "I don't need help.",
    bio: "Losing his family to the snap turns Clint into Ronin. The team brings him back, and he becomes the first human to travel through time.",
    endgameRole: "Receives the Soul Stone on Vormir and runs the Nano Gauntlet through the final battle.",
    moments: [
      "First human test of time travel",
      "Watches Natasha fall on Vormir",
      "Hands the gauntlet off in the tunnels",
      "Hears his family again at the farm",
    ],
    stats: { strength: 50, speed: 70, intelligence: 72, combat: 92, energy: 35 },
    signature: {
      name: "Trick-Arrow Volley",
      description: "Five arrows in under two seconds, each tipped with a different explosive payload.",
      fx: "arrows",
      damage: 950,
    },
  },
  {
    slug: "captain-marvel",
    name: "Captain Marvel",
    alias: "Carol Danvers",
    actor: "Brie Larson",
    emblem: "marvel",
    color: "#f59e0b",
    accent: "#3b82f6",
    tagline: "Higher. Further. Faster.",
    quote: "Don't worry.",
    bio: "Carol rescues Tony and Nebula from deep space, then protects the rest of the universe for five years before returning for the final battle.",
    endgameRole: "Destroys Thanos' warship Sanctuary II single-handedly and headbutts the Mad Titan.",
    moments: [
      "Carries the Benatar home through space",
      "Tanks a direct hit from the Power Stone",
      "Destroys Sanctuary II in seconds",
      "Headbutts Thanos without flinching",
    ],
    stats: { strength: 94, speed: 96, intelligence: 70, combat: 85, energy: 100 },
    signature: {
      name: "Binary Photon Blast",
      description: "Goes full Binary and fires a cosmic photon beam that rips through warships.",
      fx: "beam",
      damage: 1900,
    },
  },
  {
    slug: "spider-man",
    name: "Spider-Man",
    alias: "Peter Parker",
    actor: "Tom Holland",
    emblem: "spidey",
    color: "#dc2626",
    accent: "#1d4ed8",
    tagline: "Your friendly neighborhood hero.",
    quote: "Hey! Mr. Stark...",
    bio: "Returned by the Blip, Peter joins the final battle and finally gets his hug from Tony.",
    endgameRole: "Carries the Nano Gauntlet through the battlefield using Instant Kill mode and help from every hero.",
    moments: [
      "Returns through Strange's portals",
      "Hugs Tony on the battlefield",
      "Activates Instant Kill mode",
      "Carries the gauntlet with help from Mjolnir and Pegasus",
    ],
    stats: { strength: 72, speed: 90, intelligence: 85, combat: 78, energy: 45 },
    signature: {
      name: "Web-Net Swing Kick",
      description: "Web shooters fire a web net to pin the target, then he closes the gap with a swinging kick.",
      fx: "web",
      damage: 1000,
    },
  },
  {
    slug: "doctor-strange",
    name: "Doctor Strange",
    alias: "Stephen Strange",
    actor: "Benedict Cumberbatch",
    emblem: "strange",
    color: "#f97316",
    accent: "#14b8a6",
    tagline: "One in 14,000,605.",
    quote: "Is this the one?",
    bio: "Strange saw the one future where they win. He returns with the Masters of the Mystic Arts and opens portals across the universe.",
    endgameRole: "Opens the portals that bring every army to the final battle and holds back the flood of Dam water.",
    moments: [
      "The first golden portals open",
      "Holds back the flooding river",
      "Raises one finger: this is the one",
      "Guards the battlefield with the Sorcerers",
    ],
    stats: { strength: 45, speed: 60, intelligence: 95, combat: 70, energy: 97 },
    signature: {
      name: "Crimson Bands of Cyttorak",
      description: "Spell rings open around the enemy and bind it in spinning sigils of mystic energy.",
      fx: "portal",
      damage: 1300,
    },
  },
  {
    slug: "black-panther",
    name: "Black Panther",
    alias: "T'Challa",
    actor: "Chadwick Boseman",
    emblem: "panther",
    color: "#8b5cf6",
    accent: "#c4b5fd",
    tagline: "Wakanda forever.",
    quote: "Wakanda forever!",
    bio: "T'Challa returns leading the armies of Wakanda through Strange's portals and joins the race to keep the gauntlet away from Thanos.",
    endgameRole: "Leads Wakanda's army and carries the gauntlet through the battlefield.",
    moments: [
      "Arrives first through the portals with Shuri and Okoye",
      "Wakanda's army charges into battle",
      "Runs with the gauntlet",
      "Attends Tony's funeral",
    ],
    stats: { strength: 75, speed: 88, intelligence: 88, combat: 94, energy: 70 },
    signature: {
      name: "Kinetic Claw Release",
      description: "Stores every hit in the vibranium suit and releases it through a triple claw slash.",
      fx: "claws",
      damage: 1200,
    },
  },
  {
    slug: "ant-man",
    name: "Ant-Man",
    alias: "Scott Lang",
    actor: "Paul Rudd",
    emblem: "antman",
    color: "#ef4444",
    accent: "#94a3b8",
    tagline: "The man who made time travel possible.",
    quote: "I'm gonna go see if my daughter is alive.",
    bio: "Trapped in the quantum realm for five hours (five years outside), Scott escapes by chance and brings the idea that makes the Time Heist possible.",
    endgameRole: "Brings the quantum realm idea and turns giant to save the heroes from the collapsed compound.",
    moments: [
      "Escapes the quantum realm thanks to a rat",
      "Turns into a baby, then an old man",
      "Takes out Tony's arc reactor in 2012",
      "Goes Giant-Man to rescue the team",
    ],
    stats: { strength: 70, speed: 65, intelligence: 75, combat: 70, energy: 60 },
    signature: {
      name: "Quantum Giant Stomp",
      description: "Shrinks down to sneak past defenses, then grows to giant size right on the enemy's head.",
      fx: "shrink",
      damage: 1250,
    },
  },
  {
    slug: "scarlet-witch",
    name: "Scarlet Witch",
    alias: "Wanda Maximoff",
    actor: "Elizabeth Olsen",
    emblem: "wanda",
    color: "#e11d48",
    accent: "#fda4af",
    tagline: "You took everything from me.",
    quote: "You took everything from me.",
    bio: "Returned by the Blip, Wanda goes straight for Thanos — the one who killed Vision.",
    endgameRole: "Nearly tears Thanos apart until he orders the ship to fire on his own army.",
    moments: [
      "Arrives through the portals",
      "Confronts Thanos alone",
      "Tears his armor apart with chaos magic",
      "Forces Thanos to order the bombardment",
    ],
    stats: { strength: 50, speed: 70, intelligence: 75, combat: 70, energy: 99 },
    signature: {
      name: "Chaos Hex Crush",
      description: "Crimson hex tendrils wrap the target, lift it off the ground and crush its armor.",
      fx: "hex",
      damage: 1700,
    },
  },
  {
    slug: "rocket",
    name: "Rocket",
    alias: "89P13",
    actor: "Bradley Cooper",
    emblem: "rocket",
    color: "#f97316",
    accent: "#78716c",
    tagline: "Don't call him a raccoon.",
    quote: "Ain't no thing like me, except me.",
    bio: "Rocket loses Groot but stays with the Avengers, joining Thor to steal the Reality Stone on 2013 Asgard.",
    endgameRole: "Extracts the Aether from Jane Foster in 2013 and fights with the Guardians in the final battle.",
    moments: [
      "Pilots the Benatar with Nebula",
      "Extracts the Reality Stone",
      "Reunites with Groot",
      "Fights side by side with the Guardians",
    ],
    stats: { strength: 30, speed: 80, intelligence: 90, combat: 85, energy: 65 },
    signature: {
      name: "Heavy Ordnance Barrage",
      description: "Unloads every gun he's carrying in one burst of homing missiles.",
      fx: "missiles",
      damage: 1150,
    },
  },
  {
    slug: "nebula",
    name: "Nebula",
    alias: "Daughter of Thanos",
    actor: "Karen Gillan",
    emblem: "nebula",
    color: "#3b82f6",
    accent: "#a1a1aa",
    tagline: "From villain to Avenger.",
    quote: "I'm going with you.",
    bio: "Nebula survives with Tony in space and becomes an essential member of the team — even when her past self turns against her.",
    endgameRole: "Holds the key to finding Thanos, stops her past self in the final act.",
    moments: [
      "Plays paper football with Tony",
      "Travels to Morag in 2014",
      "Her memories leak to past Thanos",
      "Stops her own past self",
    ],
    stats: { strength: 68, speed: 75, intelligence: 78, combat: 90, energy: 50 },
    signature: {
      name: "Cybernetic Strike",
      description: "Cyber-enhanced blades and a merciless combo strike from her cybernetic arm.",
      fx: "claws",
      damage: 1000,
    },
  },
  {
    slug: "war-machine",
    name: "War Machine",
    alias: "James Rhodes",
    actor: "Don Cheadle",
    emblem: "warmachine",
    color: "#9ca3af",
    accent: "#f97316",
    tagline: "Heavy firepower on standby.",
    quote: "I'm gonna fly into space.",
    bio: "Rhodey never leaves Tony's side. He travels to 2014 Morag and fights through the final battle in the heaviest armor Stark ever built.",
    endgameRole: "Retrieves the Power Stone with Nebula and fights against Thanos' army.",
    moments: [
      "Travels to 2014 Morag",
      "Grabs the Power Stone",
      "Saves Rocket and Hulk in the collapse",
      "Stands beside Tony at the end",
    ],
    stats: { strength: 80, speed: 75, intelligence: 70, combat: 82, energy: 85 },
    signature: {
      name: "Shoulder Missile Swarm",
      description: "The shoulder pods open and release a swarm of smart missiles.",
      fx: "missiles",
      damage: 1300,
    },
  },
  {
    slug: "falcon",
    name: "Falcon",
    alias: "Sam Wilson",
    actor: "Anthony Mackie",
    emblem: "falcon",
    color: "#ef4444",
    accent: "#e5e7eb",
    tagline: "On your left.",
    quote: "On your left.",
    bio: "Sam returns from the snap with the famous \"On your left\" and later receives the shield from an older Steve.",
    endgameRole: "Leads the first wave through the portals and inherits Captain America's shield.",
    moments: [
      "\"On your left\" through the portal",
      "Flies Spider-Man and the gauntlet",
      "Fights alongside Bucky",
      "Receives the shield",
    ],
    stats: { strength: 60, speed: 92, intelligence: 70, combat: 82, energy: 40 },
    signature: {
      name: "Aerial Dive Bomb",
      description: "Climbs high, folds the wings and dives in at full speed for a crushing strike.",
      fx: "dive",
      damage: 1050,
    },
  },
  {
    slug: "wasp",
    name: "Wasp",
    alias: "Hope van Dyne",
    actor: "Evangeline Lilly",
    emblem: "wasp",
    color: "#facc15",
    accent: "#1f2937",
    tagline: "Small wings. Big sting.",
    quote: "Let's go.",
    bio: "Hope returns in the final battle, fighting alongside Scott and helping rescue the gauntlet from Thanos' army.",
    endgameRole: "Flies into combat alongside Ant-Man during the final battle.",
    moments: [
      "Returns through the portals",
      "Fights alongside Scott",
      "Dives into the Chitauri swarm",
      "Watches the sun set at Tony's lake house",
    ],
    stats: { strength: 55, speed: 88, intelligence: 80, combat: 85, energy: 60 },
    signature: {
      name: "Bio-Blast Sting",
      description: "Rapid bursts of sting blasts fired while shrinking and dodging between hits.",
      fx: "electric",
      damage: 950,
    },
  },
];

export const thanos: Hero = {
  slug: "thanos",
  name: "Thanos",
  alias: "The Mad Titan",
  actor: "Josh Brolin",
  emblem: "thanos",
  color: "#7c3aed",
  accent: "#facc15",
  tagline: "I am inevitable.",
  quote: "I am inevitable.",
  bio: "Past Thanos learns of the Avengers' plan through Nebula's memories and travels to 2023 with his entire army to take the stones again.",
  endgameRole: "The final villain — defeated by Tony's snap.",
  moments: [
    "Destroys the stones in his garden",
    "Past Thanos travels to 2023",
    "Breaks Captain America's shield",
    "Snaps — nothing happens",
  ],
  stats: { strength: 100, speed: 70, intelligence: 90, combat: 95, energy: 100 },
  signature: { name: "The Snap", description: "Six stones. One snap.", fx: "snap", damage: 9999 },
};

export const getHero = (slug: string) => heroes.find((h) => h.slug === slug);
