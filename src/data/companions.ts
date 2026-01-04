export interface Companion {
  id: string;
  name: string;
  avatar: string;
  specialty: string;
  description: string;
}

export const aiCompanions: Companion[] = [
  {
    id: "arjun",
    name: "Arjun",
    avatar: "🏹",
    specialty: "Warrior's Wisdom",
    description: "Expert in Mahabharata lore and martial traditions",
  },
  {
    id: "sabri",
    name: "Sabri",
    avatar: "🙏",
    specialty: "Devotion & Faith",
    description: "Guide to spiritual sites and religious history",
  },
  {
    id: "meera",
    name: "Meera",
    avatar: "🎵",
    specialty: "Arts & Poetry",
    description: "Knowledge of music, dance, and artistic heritage",
  },
  {
    id: "eklavya",
    name: "Eklavya",
    avatar: "🎯",
    specialty: "Hidden Gems",
    description: "Discovers under-recognized places and stories",
  },
];
