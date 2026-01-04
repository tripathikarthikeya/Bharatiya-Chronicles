export interface Companion {
  id: string;
  name: string;
  avatar: string;
  specialty: string;
  description: string;
  voiceId: string; // ElevenLabs voice ID
}

export const aiCompanions: Companion[] = [
  {
    id: "arjun",
    name: "Arjun",
    avatar: "🏹",
    specialty: "Warrior's Wisdom",
    description: "Expert in Mahabharata lore and martial traditions",
    voiceId: "JBFqnCBsd6RMkjVDRZzb", // George - warm, authoritative
  },
  {
    id: "sabri",
    name: "Sabri",
    avatar: "🙏",
    specialty: "Devotion & Faith",
    description: "Guide to spiritual sites and religious history",
    voiceId: "onwK4e9ZLuTAKqWW03F9", // Daniel - calm, soothing
  },
  {
    id: "meera",
    name: "Meera",
    avatar: "🎵",
    specialty: "Arts & Poetry",
    description: "Knowledge of music, dance, and artistic heritage",
    voiceId: "pFZP5JQG7iQjIQuC4Bku", // Lily - melodic, expressive
  },
  {
    id: "eklavya",
    name: "Eklavya",
    avatar: "🎯",
    specialty: "Hidden Gems",
    description: "Discovers under-recognized places and stories",
    voiceId: "TX3LPaxmHKxFdv7VOQHJ", // Liam - adventurous, engaging
  },
];
