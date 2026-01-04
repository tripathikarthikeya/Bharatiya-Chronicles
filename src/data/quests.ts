import questHampi from "@/assets/quest-hampi.jpg";
import questVaranasi from "@/assets/quest-varanasi.jpg";

export interface Quest {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  difficulty: "easy" | "medium" | "hard" | "legendary";
  points: number;
  completedBy: number;
}

export const trendingQuests: Quest[] = [
  {
    id: "silk-route-varanasi",
    title: "The Lost Silk Route",
    subtitle: "Varanasi",
    image: questVaranasi,
    difficulty: "legendary",
    points: 500,
    completedBy: 234,
  },
  {
    id: "secrets-hampi",
    title: "Secrets of Hampi",
    subtitle: "Karnataka",
    image: questHampi,
    difficulty: "hard",
    points: 350,
    completedBy: 456,
  },
  {
    id: "temples-khajuraho",
    title: "Hidden Temples",
    subtitle: "Khajuraho",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400",
    difficulty: "medium",
    points: 250,
    completedBy: 789,
  },
  {
    id: "ajanta-mysteries",
    title: "Cave Mysteries",
    subtitle: "Ajanta",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400",
    difficulty: "hard",
    points: 400,
    completedBy: 321,
  },
  {
    id: "royal-jaipur",
    title: "Royal Legacy",
    subtitle: "Jaipur",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=400",
    difficulty: "easy",
    points: 150,
    completedBy: 1234,
  },
];

export const difficultyColors = {
  easy: "bg-green-500/20 text-green-700",
  medium: "bg-yellow-500/20 text-yellow-700",
  hard: "bg-orange-500/20 text-orange-700",
  legendary: "bg-purple-500/20 text-purple-700",
};
