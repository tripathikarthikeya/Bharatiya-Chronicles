// The Lost Silk Route of Varanasi - Story-Driven Exploration Game Data

export type ChapterStatus = "locked" | "available" | "in_progress" | "completed";
export type MoralAlignment = "preserver" | "revealer" | "exploiter" | "neutral";

export interface DialogueChoice {
  id: string;
  text: string;
  moralImpact?: MoralAlignment;
  pointsChange?: number;
  itemGained?: string;
  nextDialogueId?: string;
  unlocks?: string;
}

export interface Dialogue {
  id: string;
  speaker: string;
  speakerRole?: string;
  text: string;
  choices?: DialogueChoice[];
  nextDialogueId?: string;
}

export interface Puzzle {
  id: string;
  type: "symbol_match" | "sequence" | "cipher" | "pattern" | "trade_code";
  title: string;
  description: string;
  hint: string;
  solution: string[];
  options: string[];
  reward: {
    points: number;
    item?: string;
    knowledge?: string;
  };
}

export interface Location {
  id: string;
  name: string;
  description: string;
  atmosphere: string;
  discovered: boolean;
  items: string[];
  characters: string[];
  puzzleId?: string;
}

export interface Chapter {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  era: string;
  location: string;
  ambientSound: string;
  status: ChapterStatus;
  locations: Location[];
  dialogues: Dialogue[];
  puzzles: Puzzle[];
  objectives: string[];
  rewards: {
    points: number;
    items: string[];
    knowledge: string[];
  };
}

export interface InventoryItem {
  id: string;
  name: string;
  description: string;
  type: "trade_good" | "artifact" | "document" | "tool" | "currency";
  rarity: "common" | "uncommon" | "rare" | "legendary";
  acquired: boolean;
  chapter: number;
}

export interface GameEnding {
  id: MoralAlignment;
  title: string;
  description: string;
  epilogue: string;
  unlocked: boolean;
}

// ============= INVENTORY ITEMS =============
export const inventoryItems: InventoryItem[] = [
  {
    id: "silk_sample",
    name: "Ancient Silk Sample",
    description: "A fragment of 800-year-old silk with unusual weave patterns",
    type: "artifact",
    rarity: "rare",
    acquired: false,
    chapter: 1
  },
  {
    id: "trade_seal",
    name: "Merchant Guild Seal",
    description: "Bronze seal with Sanskrit inscriptions used by ancient traders",
    type: "tool",
    rarity: "uncommon",
    acquired: false,
    chapter: 1
  },
  {
    id: "spice_pouch",
    name: "Rare Spice Pouch",
    description: "Contains saffron, cardamom, and mysterious eastern spices",
    type: "trade_good",
    rarity: "common",
    acquired: false,
    chapter: 2
  },
  {
    id: "weaver_map",
    name: "Encoded Silk Map",
    description: "Trade routes woven into silk fabric using symbolic patterns",
    type: "document",
    rarity: "legendary",
    acquired: false,
    chapter: 2
  },
  {
    id: "persian_coin",
    name: "Persian Dinar",
    description: "Gold coin from the Samanid dynasty, proof of eastern trade",
    type: "currency",
    rarity: "rare",
    acquired: false,
    chapter: 3
  },
  {
    id: "cipher_key",
    name: "Merchant Cipher Key",
    description: "Bronze disc used to decode secret trade communications",
    type: "tool",
    rarity: "legendary",
    acquired: false,
    chapter: 3
  },
  {
    id: "caravan_journal",
    name: "Caravan Master's Journal",
    description: "Detailed log of the last known journey on the secret route",
    type: "document",
    rarity: "legendary",
    acquired: false,
    chapter: 4
  },
  {
    id: "chinese_scroll",
    name: "Chinese Trade Scroll",
    description: "Silk scroll documenting trade agreements in Tang script",
    type: "document",
    rarity: "rare",
    acquired: false,
    chapter: 4
  },
  {
    id: "final_ledger",
    name: "The Final Ledger",
    description: "Complete record of the lost Silk Route through Varanasi",
    type: "document",
    rarity: "legendary",
    acquired: false,
    chapter: 5
  }
];

// ============= GAME CHAPTERS =============
export const chapters: Chapter[] = [
  {
    id: 1,
    title: "The Whispering Ghats",
    subtitle: "Where Waters Hold Secrets",
    description: "As dawn breaks over the sacred Ganga, you notice strange markings on the ancient boats. These aren't mere decorations—they're trade symbols, whispering of routes long forgotten.",
    era: "12th Century CE",
    location: "Dashashwamedh Ghat",
    ambientSound: "river_bells",
    status: "available",
    locations: [
      {
        id: "main_ghat",
        name: "Dashashwamedh Ghat",
        description: "The most sacred ghat, where morning aarti fills the air with incense and chanting",
        atmosphere: "Peaceful yet mysterious, golden light reflects off temple spires",
        discovered: true,
        items: ["silk_sample"],
        characters: ["old_boatman", "temple_priest"]
      },
      {
        id: "boat_storage",
        name: "Ancient Boat Storage",
        description: "Hidden beneath wooden platforms, centuries-old boats bear forgotten symbols",
        atmosphere: "Musty, dark, with shafts of light revealing carved symbols",
        discovered: false,
        items: ["trade_seal"],
        characters: [],
        puzzleId: "boat_symbols"
      }
    ],
    dialogues: [
      {
        id: "boatman_intro",
        speaker: "Govind",
        speakerRole: "Old Boatman",
        text: "Ah, young one. You study these boats like my grandfather did. He spoke of merchants who came from lands where the sun rises red. They marked their boats with secret signs...",
        choices: [
          {
            id: "ask_more",
            text: "Tell me more about these merchants",
            nextDialogueId: "boatman_story"
          },
          {
            id: "ask_symbols",
            text: "What do these symbols mean?",
            nextDialogueId: "boatman_symbols"
          },
          {
            id: "offer_payment",
            text: "I'll pay well for this information",
            moralImpact: "exploiter",
            pointsChange: -10,
            nextDialogueId: "boatman_offended"
          }
        ]
      },
      {
        id: "boatman_story",
        speaker: "Govind",
        speakerRole: "Old Boatman",
        text: "The Silk Route didn't just go through the mountains, child. There was a river path—boats carrying silk through Kashi. The Turk invasions... they erased it from memory. But the ghats remember.",
        choices: [
          {
            id: "preserve_interest",
            text: "This knowledge should be protected",
            moralImpact: "preserver",
            pointsChange: 15,
            itemGained: "silk_sample",
            nextDialogueId: "boatman_trust"
          },
          {
            id: "share_interest",
            text: "The world deserves to know this history",
            moralImpact: "revealer",
            pointsChange: 10,
            nextDialogueId: "boatman_cautious"
          }
        ]
      },
      {
        id: "boatman_symbols",
        speaker: "Govind",
        speakerRole: "Old Boatman",
        text: "See here—the lotus with eight petals means safe harbor. The coiled serpent warns of tolls. And this one... a Sanskrit numeral hidden in Persian script. A merchant's code.",
        nextDialogueId: "boatman_story"
      },
      {
        id: "boatman_offended",
        speaker: "Govind",
        speakerRole: "Old Boatman",
        text: "Money? You think these secrets can be bought? My family has guarded this knowledge for generations. Perhaps you are not worthy of it after all...",
        choices: [
          {
            id: "apologize",
            text: "Forgive me, I meant no disrespect",
            pointsChange: 5,
            nextDialogueId: "boatman_story"
          }
        ]
      },
      {
        id: "boatman_trust",
        speaker: "Govind",
        speakerRole: "Old Boatman",
        text: "You understand. Here—take this silk fragment. My grandmother preserved it. The weave pattern... it's a map. Find the weavers in the old city. They hold the next piece.",
        nextDialogueId: "chapter_complete"
      },
      {
        id: "boatman_cautious",
        speaker: "Govind",
        speakerRole: "Old Boatman",
        text: "Revealing such things comes with responsibility. I will tell you what I know, but be careful who else you share this with. The old city weavers—they know more.",
        nextDialogueId: "chapter_complete"
      },
      {
        id: "chapter_complete",
        speaker: "Narrator",
        text: "You have uncovered the first clue. The boats of Varanasi once carried secrets of the Silk Route. Now, you must seek the weavers who encoded these routes into their fabric."
      }
    ],
    puzzles: [
      {
        id: "boat_symbols",
        type: "symbol_match",
        title: "Decipher the Boat Markings",
        description: "Match the ancient trade symbols to their meanings to unlock the hidden storage.",
        hint: "The lotus represents sanctuary, the serpent represents danger, the sun represents eastern origins",
        solution: ["lotus_sanctuary", "serpent_toll", "sun_eastern", "moon_western"],
        options: ["lotus_sanctuary", "lotus_death", "serpent_toll", "serpent_wisdom", "sun_eastern", "sun_divine", "moon_western", "moon_sacred"],
        reward: {
          points: 50,
          item: "trade_seal",
          knowledge: "Ancient merchants used universal symbols that transcended language barriers"
        }
      }
    ],
    objectives: [
      "Speak with the old boatman Govind",
      "Discover the meaning of the boat symbols",
      "Solve the symbol puzzle to access hidden storage",
      "Obtain the silk fragment and merchant seal"
    ],
    rewards: {
      points: 150,
      items: ["silk_sample", "trade_seal"],
      knowledge: ["The River Silk Route", "Merchant Symbol Language"]
    }
  },
  {
    id: 2,
    title: "The Weaver's Secret",
    subtitle: "Threads of Hidden History",
    description: "In the narrow lanes of the old city, master weavers create Banarasi silk using techniques unchanged for centuries. But their patterns hold more than beauty—they encode the routes of ancient traders.",
    era: "12th Century CE",
    location: "Old Varanasi Weaving District",
    ambientSound: "loom_clicks",
    status: "locked",
    locations: [
      {
        id: "weaver_home",
        name: "Master Weaver's Workshop",
        description: "A centuries-old haveli where silk looms click in hypnotic rhythm",
        atmosphere: "Warm lamplight, colorful threads, the smell of sandalwood",
        discovered: false,
        items: ["weaver_map"],
        characters: ["master_weaver", "weaver_daughter"]
      },
      {
        id: "pattern_archive",
        name: "Pattern Archive",
        description: "Secret room containing generations of encoded weaving patterns",
        atmosphere: "Dusty, ancient, illuminated by a single oil lamp",
        discovered: false,
        items: ["spice_pouch"],
        characters: [],
        puzzleId: "silk_pattern"
      }
    ],
    dialogues: [
      {
        id: "weaver_intro",
        speaker: "Masterji",
        speakerRole: "Master Weaver",
        text: "Another curious visitor? The boatman's family sent you, I see. Show me what you carry.",
        choices: [
          {
            id: "show_silk",
            text: "Show the silk fragment",
            nextDialogueId: "weaver_recognizes"
          },
          {
            id: "show_seal",
            text: "Show the merchant seal",
            nextDialogueId: "weaver_impressed"
          }
        ]
      },
      {
        id: "weaver_recognizes",
        speaker: "Masterji",
        speakerRole: "Master Weaver",
        text: "This weave... it uses the Shalimar pattern—named after gardens, but actually a map of the northern routes. My great-great-grandmother wove the original. We are the keepers of the thread-maps.",
        choices: [
          {
            id: "learn_technique",
            text: "Can you teach me to read these patterns?",
            moralImpact: "preserver",
            pointsChange: 20,
            nextDialogueId: "weaver_teaches"
          },
          {
            id: "want_original",
            text: "I need the original map",
            moralImpact: "exploiter",
            pointsChange: -15,
            nextDialogueId: "weaver_protective"
          }
        ]
      },
      {
        id: "weaver_impressed",
        speaker: "Masterji",
        speakerRole: "Master Weaver",
        text: "The Guild Seal! I thought these were all destroyed. You walk a dangerous path, young scholar. The underground bazaar merchants still use such seals. They would be... interested... in you.",
        nextDialogueId: "weaver_teaches"
      },
      {
        id: "weaver_teaches",
        speaker: "Masterji",
        speakerRole: "Master Weaver",
        text: "Look closely. Each thread intersection represents a junction. Gold threads are oases, silver threads are caravanserais. The border pattern—that shows dangers and tolls. My daughter will show you the archive.",
        choices: [
          {
            id: "thank_humbly",
            text: "This knowledge is precious. I'll honor it.",
            moralImpact: "preserver",
            pointsChange: 15,
            itemGained: "weaver_map",
            nextDialogueId: "archive_access"
          }
        ]
      },
      {
        id: "weaver_protective",
        speaker: "Masterji",
        speakerRole: "Master Weaver",
        text: "The original? It was burned when the invaders came—or so the world believes. Why should I trust you with what remains?",
        choices: [
          {
            id: "earn_trust",
            text: "Let me prove my intentions through actions",
            moralImpact: "neutral",
            pointsChange: 5,
            nextDialogueId: "weaver_teaches"
          }
        ]
      },
      {
        id: "archive_access",
        speaker: "Priya",
        speakerRole: "Weaver's Daughter",
        text: "The archive holds patterns from before the Sultanate. But they're encoded—father never taught me the cipher. Perhaps you can solve it? The underground bazaar... that's where the trail leads next.",
        nextDialogueId: "chapter2_complete"
      },
      {
        id: "chapter2_complete",
        speaker: "Narrator",
        text: "The weavers have guarded these secrets for generations, encoding trade routes into the very fabric of Banarasi silk. The underground bazaar awaits—a place that exists outside official history."
      }
    ],
    puzzles: [
      {
        id: "silk_pattern",
        type: "pattern",
        title: "Decode the Silk Map",
        description: "Identify the correct sequence of symbols that reveals the route to the Underground Bazaar.",
        hint: "Follow the gold thread from sunrise (east) to the lotus symbol, avoiding the serpent warnings",
        solution: ["sun_rise", "mountain_pass", "lotus_rest", "river_crossing", "moon_gate"],
        options: ["sun_rise", "sun_set", "mountain_pass", "mountain_danger", "lotus_rest", "lotus_death", "river_crossing", "river_flood", "moon_gate", "moon_trap"],
        reward: {
          points: 75,
          item: "spice_pouch",
          knowledge: "Silk patterns served as undetectable maps that passed through hostile territory"
        }
      }
    ],
    objectives: [
      "Find the Master Weaver's workshop",
      "Gain the weaver's trust by showing your artifacts",
      "Learn the secret of the silk thread-maps",
      "Decode the archive pattern to find the Underground Bazaar"
    ],
    rewards: {
      points: 200,
      items: ["weaver_map", "spice_pouch"],
      knowledge: ["Thread-Map Reading", "Banarasi Encoding Techniques"]
    }
  },
  {
    id: 3,
    title: "The Underground Bazaar",
    subtitle: "Beneath the Sacred City",
    description: "Beneath the temples and ghats lies a forgotten market where time flows differently. Here, traders from across the world once bartered in secret, away from taxes and tyrants.",
    era: "13th Century CE",
    location: "Underground Market Tunnels",
    ambientSound: "echoing_voices",
    status: "locked",
    locations: [
      {
        id: "tunnel_entrance",
        name: "Hidden Temple Passage",
        description: "Behind a crumbling Shiva temple, stairs descend into darkness",
        atmosphere: "Damp, ancient, torchlight flickering on carved walls",
        discovered: false,
        items: ["persian_coin"],
        characters: ["tunnel_guardian"]
      },
      {
        id: "main_bazaar",
        name: "The Forgotten Market",
        description: "A vast underground hall with stalls frozen in time",
        atmosphere: "Eerie silence, dust motes in lamplight, whispers of the past",
        discovered: false,
        items: ["cipher_key"],
        characters: ["ghost_merchant", "persian_trader"],
        puzzleId: "trade_cipher"
      }
    ],
    dialogues: [
      {
        id: "guardian_challenge",
        speaker: "Ratan",
        speakerRole: "Tunnel Guardian",
        text: "The seal. I see you carry it. But carrying and understanding are different things. What is the first rule of the Hidden Road?",
        choices: [
          {
            id: "answer_trust",
            text: "Trust is the only currency that never devalues",
            pointsChange: 25,
            nextDialogueId: "guardian_pleased"
          },
          {
            id: "answer_profit",
            text: "Profit above all else",
            moralImpact: "exploiter",
            pointsChange: -20,
            nextDialogueId: "guardian_disappointed"
          },
          {
            id: "answer_silence",
            text: "What is hidden should remain hidden",
            moralImpact: "preserver",
            pointsChange: 15,
            nextDialogueId: "guardian_nods"
          }
        ]
      },
      {
        id: "guardian_pleased",
        speaker: "Ratan",
        speakerRole: "Tunnel Guardian",
        text: "You have been taught well. The bazaar awaits. But know this—the Persian trader who still lingers there... he's been waiting seven hundred years for someone to settle his final account.",
        nextDialogueId: "enter_bazaar"
      },
      {
        id: "guardian_nods",
        speaker: "Ratan",
        speakerRole: "Tunnel Guardian",
        text: "A traditionalist. My ancestors would approve. Enter, but remember—some secrets are buried for good reason. The Persian trader will test you.",
        nextDialogueId: "enter_bazaar"
      },
      {
        id: "guardian_disappointed",
        speaker: "Ratan",
        speakerRole: "Tunnel Guardian",
        text: "Greed. The same greed that brought down the route. You may enter, but the spirits of honest traders will watch your every move.",
        nextDialogueId: "enter_bazaar"
      },
      {
        id: "enter_bazaar",
        speaker: "Narrator",
        text: "The underground bazaar opens before you—a marvel of ancient engineering. Stalls with faded silk, rusted scales, and scattered coins speak of prosperity interrupted. At the center, a translucent figure awaits."
      },
      {
        id: "persian_intro",
        speaker: "Abbas",
        speakerRole: "Spirit of Persian Trader",
        text: "A living soul at last! I am Abbas of Samarkand. My caravan reached Kashi in the year 1194, but we never left. The invasion trapped us, and my accounts... they remain unbalanced.",
        choices: [
          {
            id: "help_spirit",
            text: "How can I help you find peace?",
            moralImpact: "preserver",
            pointsChange: 20,
            nextDialogueId: "spirit_request"
          },
          {
            id: "demand_info",
            text: "First, tell me about the Silk Route",
            moralImpact: "exploiter",
            pointsChange: -10,
            nextDialogueId: "spirit_sad"
          }
        ]
      },
      {
        id: "spirit_request",
        speaker: "Abbas",
        speakerRole: "Spirit of Persian Trader",
        text: "My cipher key—it decodes all merchant communications. I hid it when the soldiers came. Find it, use the cipher to read the final ledger entry, and deliver my message to... to anyone who will listen. That we existed. That the route was real.",
        choices: [
          {
            id: "promise_help",
            text: "I promise to honor your memory",
            moralImpact: "revealer",
            pointsChange: 25,
            itemGained: "persian_coin",
            nextDialogueId: "spirit_reveals"
          }
        ]
      },
      {
        id: "spirit_sad",
        speaker: "Abbas",
        speakerRole: "Spirit of Persian Trader",
        text: "Even in death, humans seek only profit. Very well. The route ran from Chang'an through Samarkand, then south to Kashi before meeting the sea traders at Muziris. Now, will you hear my plea?",
        nextDialogueId: "spirit_request"
      },
      {
        id: "spirit_reveals",
        speaker: "Abbas",
        speakerRole: "Spirit of Persian Trader",
        text: "The cipher key is beneath the scales at my old stall—third row, seventh from the entrance. The final caravan... it vanished near the Vindhya passes. Find their traces, and you find the complete route.",
        nextDialogueId: "chapter3_complete"
      },
      {
        id: "chapter3_complete",
        speaker: "Narrator",
        text: "With the cipher key in hand, you can now decode ancient merchant communications. The trail leads to the Vindhya mountains—where a vanished caravan holds the key to the complete Silk Route map."
      }
    ],
    puzzles: [
      {
        id: "trade_cipher",
        type: "cipher",
        title: "Decode the Merchant Communication",
        description: "Use the cipher key to decode a trade message that reveals the next location.",
        hint: "Rotate the outer disc until the lotus aligns with the eastern symbol, then read the inner ring",
        solution: ["vindhya", "cave", "caravan", "scroll"],
        options: ["vindhya", "himalaya", "cave", "temple", "caravan", "merchant", "scroll", "map"],
        reward: {
          points: 100,
          item: "cipher_key",
          knowledge: "Merchant cipher systems predated modern cryptography by centuries"
        }
      }
    ],
    objectives: [
      "Find and enter the Underground Bazaar",
      "Answer the guardian's challenge correctly",
      "Help the Persian trader's spirit find peace",
      "Recover the cipher key and decode the message"
    ],
    rewards: {
      points: 250,
      items: ["persian_coin", "cipher_key"],
      knowledge: ["Underground Trade Networks", "Merchant Cryptography"]
    }
  },
  {
    id: 4,
    title: "The Vanished Caravan",
    subtitle: "Following Ghost Trails",
    description: "Armed with decoded messages, you follow the trail of a caravan that vanished in 1194 CE. In the Vindhya mountain caves, their fate—and their cargo of priceless trade documents—awaits discovery.",
    era: "13th Century CE",
    location: "Vindhya Mountain Caves",
    ambientSound: "wind_caves",
    status: "locked",
    locations: [
      {
        id: "cave_entrance",
        name: "Caravan Cave Entrance",
        description: "Natural cave formation with ancient torch holders and cart tracks worn into stone",
        atmosphere: "Windswept, wild, with distant echoes",
        discovered: false,
        items: ["caravan_journal"],
        characters: ["tribal_elder"]
      },
      {
        id: "hidden_chamber",
        name: "Merchant's Final Rest",
        description: "A sealed chamber containing preserved remains and trade goods",
        atmosphere: "Solemn, sacred, untouched for centuries",
        discovered: false,
        items: ["chinese_scroll"],
        characters: [],
        puzzleId: "caravan_sequence"
      }
    ],
    dialogues: [
      {
        id: "tribal_intro",
        speaker: "Bhagat",
        speakerRole: "Tribal Elder",
        text: "The city-dweller comes to our caves. Yes, we know of the merchants who never left. Our ancestors gave them shelter, then gave them burial when the soldiers found them. What do you seek?",
        choices: [
          {
            id: "respectful_ask",
            text: "I seek to honor their memory and complete their journey",
            moralImpact: "preserver",
            pointsChange: 25,
            nextDialogueId: "tribal_approves"
          },
          {
            id: "honest_ask",
            text: "I'm tracing the lost Silk Route through Varanasi",
            moralImpact: "revealer",
            pointsChange: 15,
            nextDialogueId: "tribal_considers"
          }
        ]
      },
      {
        id: "tribal_approves",
        speaker: "Bhagat",
        speakerRole: "Tribal Elder",
        text: "Honor. A rare word from those who seek treasure. The merchants shared their knowledge with us—medicine, astronomy, languages. We protected their secrets. Now, perhaps, it is time.",
        choices: [
          {
            id: "ask_guidance",
            text: "Will you guide me to their resting place?",
            pointsChange: 10,
            itemGained: "caravan_journal",
            nextDialogueId: "tribal_guides"
          }
        ]
      },
      {
        id: "tribal_considers",
        speaker: "Bhagat",
        speakerRole: "Tribal Elder",
        text: "The Silk Route... our ancestors called it the Thread of Stars. Merchants from the East, West, North, South—all met in Kashi. They taught us that knowledge has no boundaries.",
        nextDialogueId: "tribal_approves"
      },
      {
        id: "tribal_guides",
        speaker: "Bhagat",
        speakerRole: "Tribal Elder",
        text: "The journal of their caravan master—we kept it safe. The inner chamber is sealed with a sequence puzzle. Only those who understand the trade codes can enter. The traders' spirits will judge you.",
        nextDialogueId: "approach_chamber"
      },
      {
        id: "approach_chamber",
        speaker: "Narrator",
        text: "The journal reveals the last days of a caravan trapped between invaders and mountains. But it also contains detailed notes on every stop of the complete Silk Route through India. The sealed chamber holds the final proof."
      },
      {
        id: "chamber_opened",
        speaker: "Narrator",
        text: "Inside the chamber, time has stood still. Silk bales, spice containers, and Chinese porcelain surround the peaceful remains of merchants who chose death over surrender. In their hands: scrolls documenting centuries of peaceful trade."
      },
      {
        id: "chapter4_complete",
        speaker: "Narrator",
        text: "You now possess the complete record of the Silk Route through Varanasi. The Chinese scroll, combined with Persian documents and Indian records, creates an undeniable map of cultural exchange. But what will you do with this knowledge?"
      }
    ],
    puzzles: [
      {
        id: "caravan_sequence",
        type: "sequence",
        title: "Unlock the Sacred Chamber",
        description: "Arrange the trade route symbols in the correct sequence the caravan traveled.",
        hint: "The journey began where the sun rises and ended where the sacred rivers meet",
        solution: ["chang_an", "samarkand", "kabul", "indus", "kashi"],
        options: ["chang_an", "samarkand", "kabul", "indus", "kashi", "delhi", "patna", "rome"],
        reward: {
          points: 125,
          item: "chinese_scroll",
          knowledge: "The complete route spanned 5000 kilometers over 6 months"
        }
      }
    ],
    objectives: [
      "Journey to the Vindhya caves",
      "Earn the tribal elder's trust",
      "Obtain the Caravan Master's journal",
      "Solve the sequence puzzle and enter the chamber"
    ],
    rewards: {
      points: 300,
      items: ["caravan_journal", "chinese_scroll"],
      knowledge: ["Complete Route Geography", "Trade Caravan Operations"]
    }
  },
  {
    id: 5,
    title: "The Final Ledger",
    subtitle: "Legacy's Choice",
    description: "With all pieces in hand, you can now reconstruct the complete Silk Route map. But powerful forces have noticed your discoveries. The choice of what to do with this knowledge will echo through history.",
    era: "Present Day",
    location: "Varanasi Archaeological Institute",
    ambientSound: "modern_ambient",
    status: "locked",
    locations: [
      {
        id: "institute",
        name: "Archaeological Research Center",
        description: "Modern facility where ancient mysteries meet contemporary science",
        atmosphere: "Clinical yet respectful, artifacts in climate-controlled displays",
        discovered: false,
        items: ["final_ledger"],
        characters: ["archaeologist", "government_official", "private_collector"]
      }
    ],
    dialogues: [
      {
        id: "final_choice_intro",
        speaker: "Dr. Sharma",
        speakerRole: "Head Archaeologist",
        text: "What you've discovered... it rewrites history. A complete Silk Route through Varanasi, documented with undeniable evidence. Governments, collectors, academics—everyone wants this. But the choice is yours. What will you do?",
        choices: [
          {
            id: "choice_preserve",
            text: "Keep it secret. Some knowledge is too precious to share.",
            moralImpact: "preserver",
            pointsChange: 50,
            nextDialogueId: "ending_preserver"
          },
          {
            id: "choice_reveal",
            text: "Publish everything. The world deserves to know.",
            moralImpact: "revealer",
            pointsChange: 50,
            nextDialogueId: "ending_revealer"
          },
          {
            id: "choice_exploit",
            text: "Sell to the highest bidder. Knowledge is power, and power has a price.",
            moralImpact: "exploiter",
            pointsChange: -50,
            nextDialogueId: "ending_exploiter"
          }
        ]
      },
      {
        id: "ending_preserver",
        speaker: "Narrator",
        text: "ENDING: THE SACRED KEEPER\n\nYou choose to protect the secret, sharing it only with trusted guardians who will preserve it for future generations. The route remains hidden, its mystery intact—just as the ancient merchants intended."
      },
      {
        id: "ending_revealer",
        speaker: "Narrator",
        text: "ENDING: THE HISTORY CHANGER\n\nYour publication rocks the archaeological world. Textbooks are rewritten, lost trade routes are added to maps, and India's role in the Silk Road is finally recognized. The merchants' legacy lives on—in light, not shadow."
      },
      {
        id: "ending_exploiter",
        speaker: "Narrator",
        text: "ENDING: THE SHADOW MERCHANT\n\nYou sell the artifacts and knowledge to private collectors. Wealth flows, but the pieces scatter across the globe. The complete picture is lost again—perhaps forever. The spirits of Abbas and the caravan traders weep."
      }
    ],
    puzzles: [],
    objectives: [
      "Combine all collected artifacts and documents",
      "Reconstruct the complete Silk Route map",
      "Face the representatives of different interests",
      "Make the final decision about the route's fate"
    ],
    rewards: {
      points: 500,
      items: ["final_ledger"],
      knowledge: ["Complete Silk Route Map", "Legacy of Choice"]
    }
  }
];

// ============= GAME ENDINGS =============
export const gameEndings: GameEnding[] = [
  {
    id: "preserver",
    title: "The Sacred Keeper",
    description: "You chose to protect the ancient secrets, becoming a guardian of hidden knowledge.",
    epilogue: "Years later, you train a new generation of keepers. The Silk Route remains a whispered legend—but for those who know where to look, its magic endures. The spirits of ancient traders rest peacefully, their trust honored.",
    unlocked: false
  },
  {
    id: "revealer",
    title: "The History Changer",
    description: "You brought the lost Silk Route into the light, changing how the world understands history.",
    epilogue: "Museums display your discoveries. Documentaries tell the story. Students learn about the merchants who connected worlds. India's heritage shines brighter, and the forgotten traders are finally remembered.",
    unlocked: false
  },
  {
    id: "exploiter",
    title: "The Shadow Merchant",
    description: "You chose profit over preservation, scattering the knowledge to the winds of commerce.",
    epilogue: "Your wealth is vast but hollow. The artifacts, separated, lose their meaning. Future scholars piece together fragments, never knowing the complete truth. History remains incomplete—because of you.",
    unlocked: false
  },
  {
    id: "neutral",
    title: "The Wanderer",
    description: "Your journey was incomplete. The Silk Route's secrets remain partially hidden.",
    epilogue: "Some questions have no final answers. You leave Varanasi with more mysteries than when you arrived. Perhaps another seeker will complete the journey you began.",
    unlocked: false
  }
];
