export interface Chapter {
  id: string;
  act: "I" | "II" | "III";
  title: string;
  time: string;
  place: string;
  color: string;
  summary: string;
  beats: string[];
  heroes: string[];
  quote?: string;
}

export const acts = [
  { id: "I", name: "The Aftermath", color: "#ef4444", line: "They lost. Now they have to live with it." },
  { id: "II", name: "The Time Heist", color: "#38bdf8", line: "Six stones. Three eras. One shot." },
  { id: "III", name: "The Endgame", color: "#f59e0b", line: "Whatever it takes." },
] as const;

export const chapters: Chapter[] = [
  {
    id: "adrift",
    act: "I",
    title: "Adrift in Space",
    time: "2018",
    place: "Benatar, deep space",
    color: "#64748b",
    summary:
      "Tony Stark and Nebula drift through space with no fuel and no food. Tony records a farewell message to Pepper — until Captain Marvel arrives and carries the ship home.",
    beats: ["22 days without fuel", "Paper-football games with Nebula", "Captain Marvel brings them home"],
    heroes: ["iron-man", "nebula", "captain-marvel"],
    quote: "Part of the journey is the end.",
  },
  {
    id: "garden",
    act: "I",
    title: "The Garden",
    time: "2018",
    place: "The Garden planet",
    color: "#22c55e",
    summary:
      "The Avengers track Thanos to a quiet planet. The stones are gone — he destroyed them. Thor strikes him down, but nothing can be undone.",
    beats: ["Thanos used the stones to destroy the stones", "Thor goes for the head", "There is no going back"],
    heroes: ["thor", "captain-america", "captain-marvel", "black-widow"],
    quote: "I used the stones to destroy the stones.",
  },
  {
    id: "five-years",
    act: "I",
    title: "Five Years Later",
    time: "2023",
    place: "Earth",
    color: "#94a3b8",
    summary:
      "Half the world is gone. Steve runs a support group, Natasha holds the team together, Tony has a daughter, Thor has lost himself in New Asgard, and Clint roams the world as Ronin.",
    beats: ["Empty cities and grief", "Morgan Stark is born", "Ronin hunts criminals"],
    heroes: ["captain-america", "black-widow", "iron-man", "thor", "hawkeye"],
  },
  {
    id: "quantum",
    act: "I",
    title: "The Quantum Realm",
    time: "2023",
    place: "Avengers Compound",
    color: "#ef4444",
    summary:
      "A rat steps on a van's controls and Scott Lang returns from the quantum realm. For him only five hours passed. He has an idea: time travel.",
    beats: ["Scott returns", "Tony solves it with a Möbius strip", "Bruce becomes Smart Hulk"],
    heroes: ["ant-man", "iron-man", "hulk"],
    quote: "What if we could go back in time?",
  },
  {
    id: "new-york",
    act: "II",
    title: "New York, 2012",
    time: "2012",
    place: "Stark Tower & Sanctum",
    color: "#2563eb",
    summary:
      "Three stones in one city. Steve bluffs his way through the elevator, fights his past self, Bruce gets the Time Stone from the Ancient One — but Loki escapes with the Tesseract.",
    beats: ["\"Hail Hydra\"", "America's Ass", "The Tesseract is lost"],
    heroes: ["captain-america", "iron-man", "ant-man", "hulk"],
    quote: "I can do this all day.",
  },
  {
    id: "asgard",
    act: "II",
    title: "Asgard, 2013",
    time: "2013",
    place: "Asgard",
    color: "#facc15",
    summary:
      "Thor meets his mother Frigga one last time while Rocket extracts the Aether from Jane Foster. Thor leaves with the Reality Stone — and Mjolnir.",
    beats: ["Rocket extracts the Aether", "Frigga's advice", "\"I'm still worthy!\""],
    heroes: ["thor", "rocket"],
  },
  {
    id: "morag",
    act: "II",
    title: "Morag, 2014",
    time: "2014",
    place: "Morag",
    color: "#a855f7",
    summary:
      "Rhodey and Nebula grab the Power Stone before Peter Quill. But Nebula's cybernetic memories sync with her past self — and past Thanos learns everything.",
    beats: ["Peter Quill dances to \"Come and Get Your Love\"", "Power Stone secured", "Past Thanos learns the plan"],
    heroes: ["war-machine", "nebula"],
  },
  {
    id: "vormir",
    act: "II",
    title: "Vormir",
    time: "2014",
    place: "Vormir",
    color: "#f97316",
    summary:
      "The Soul Stone demands a soul. Natasha and Clint fight to sacrifice themselves for each other. Natasha lets go.",
    beats: ["Red Skull guards the stone", "A race to the edge", "\"Let me go.\""],
    heroes: ["black-widow", "hawkeye"],
    quote: "Whatever it takes.",
  },
  {
    id: "lehigh",
    act: "II",
    title: "Camp Lehigh, 1970",
    time: "1970",
    place: "New Jersey",
    color: "#14b8a6",
    summary:
      "Tony and Steve travel back to 1970 to recover the Tesseract and more Pym Particles. Tony talks with his father Howard. Steve sees Peggy through a window.",
    beats: ["Tony meets Howard", "Tesseract recovered", "Peggy through the glass"],
    heroes: ["iron-man", "captain-america"],
  },
  {
    id: "blip",
    act: "III",
    title: "The Snap Back",
    time: "2023",
    place: "Avengers Compound",
    color: "#22c55e",
    summary:
      "The Nano Gauntlet is ready. Bruce puts it on and snaps — everyone who vanished returns. Birds sing, Clint's phone rings… and past Thanos opens fire on the compound.",
    beats: ["The Nano Gauntlet", "Bruce snaps", "The compound is destroyed"],
    heroes: ["hulk", "hawkeye", "iron-man"],
  },
  {
    id: "trinity",
    act: "III",
    title: "The Big Three",
    time: "2023",
    place: "Ruins of the compound",
    color: "#7c3aed",
    summary:
      "Iron Man, Captain America and Thor face Thanos together. Steve lifts Mjolnir. Thanos breaks the shield — but Steve stands up again, alone.",
    beats: ["Cap lifts Mjolnir", "The shield breaks", "Cap stands alone"],
    heroes: ["iron-man", "captain-america", "thor"],
    quote: "I knew it!",
  },
  {
    id: "assemble",
    act: "III",
    title: "Avengers Assemble",
    time: "2023",
    place: "Battlefield",
    color: "#f59e0b",
    summary:
      "\"On your left.\" Golden portals open. Wakanda, Asgard, the Sorcerers, Ravagers and every returned hero arrive. The largest battle in history begins.",
    beats: ["\"On your left.\"", "Portals open across the world", "\"Avengers... assemble.\""],
    heroes: ["falcon", "black-panther", "doctor-strange", "spider-man", "scarlet-witch", "wasp"],
    quote: "Avengers... assemble.",
  },
  {
    id: "inevitable",
    act: "III",
    title: "I Am Iron Man",
    time: "2023",
    place: "Battlefield",
    color: "#ff3b30",
    summary:
      "Thanos takes the gauntlet and snaps — nothing. Tony has the stones. He looks at Thanos and snaps. Thanos and his army turn to dust.",
    beats: ["\"I am inevitable.\"", "Nothing happens", "\"I am Iron Man.\""],
    heroes: ["iron-man"],
    quote: "I am Iron Man.",
  },
  {
    id: "farewell",
    act: "III",
    title: "Farewell",
    time: "2023",
    place: "Tony's lake house",
    color: "#e5e7eb",
    summary:
      "The heroes say goodbye to Tony. Thor names Valkyrie king of New Asgard. Steve returns the stones — and chooses to live his life. An old man hands Sam the shield.",
    beats: ["\"I love you 3000\"", "Returning the stones", "Sam gets the shield"],
    heroes: ["captain-america", "falcon", "thor"],
    quote: "I love you 3000.",
  },
];

export const stones = [
  { id: "space", name: "Space Stone", color: "#3b82f6", era: "Camp Lehigh, 1970", keeper: "Iron Man & Captain America", power: "Controls space — teleports anyone, anywhere." },
  { id: "mind", name: "Mind Stone", color: "#facc15", era: "New York, 2012", keeper: "Captain America", power: "Controls minds and unlocks consciousness." },
  { id: "reality", name: "Reality Stone", color: "#ef4444", era: "Asgard, 2013", keeper: "Thor & Rocket", power: "Bends reality itself." },
  { id: "power", name: "Power Stone", color: "#a855f7", era: "Morag, 2014", keeper: "War Machine & Nebula", power: "Raw, overwhelming energy that can destroy planets." },
  { id: "time", name: "Time Stone", color: "#22c55e", era: "New York, 2012", keeper: "Hulk", power: "Controls the flow of time." },
  { id: "soul", name: "Soul Stone", color: "#f97316", era: "Vormir, 2014", keeper: "Hawkeye", power: "Demands a soul for a soul." },
] as const;
