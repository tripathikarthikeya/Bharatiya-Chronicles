export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
  image: string;
}

export const categories: Category[] = [
  {
    id: "temples",
    name: "Temples",
    icon: "🛕",
    description: "Sacred temples and architectural marvels",
    color: "from-orange-500 to-red-600",
    image: "https://images.unsplash.com/photo-1564804955454-55cc4051a8c6?w=400",
  },
  {
    id: "gods",
    name: "Gods",
    icon: "🙏",
    description: "Stories of Hindu, Buddhist, and Jain deities",
    color: "from-blue-500 to-purple-600",
    image: "https://images.unsplash.com/photo-1567591370504-80d5e5d6e5cc?w=400",
  },
  {
    id: "saints",
    name: "Saints",
    icon: "🙇",
    description: "Spiritual leaders and philosophers",
    color: "from-amber-500 to-orange-600",
    image: "https://images.unsplash.com/photo-1609619385002-f40f1df9b5a4?w=400",
  },
  {
    id: "dance",
    name: "Local Dance",
    icon: "💃",
    description: "Classical and folk dance traditions",
    color: "from-pink-500 to-rose-600",
    image: "https://images.unsplash.com/photo-1535712376064-78798e876934?w=400",
  },
  {
    id: "festivals",
    name: "Festivals",
    icon: "🎆",
    description: "Vibrant celebrations across India",
    color: "from-yellow-500 to-amber-600",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400",
  },
  {
    id: "shopping",
    name: "Shopping",
    icon: "🛍️",
    description: "Artisan markets and heritage crafts",
    color: "from-emerald-500 to-teal-600",
    image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400",
  },
  {
    id: "food",
    name: "Food",
    icon: "🍛",
    description: "Regional cuisines and street food",
    color: "from-red-500 to-orange-600",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400",
  },
  {
    id: "nature",
    name: "Nature",
    icon: "🏔️",
    description: "National parks and landscapes",
    color: "from-green-500 to-emerald-600",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
  },
];
