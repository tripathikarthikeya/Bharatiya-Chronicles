export interface Location {
  id: string;
  name: string;
  state: string;
  description: string;
  image: string;
  rarity: "common" | "uncommon" | "rare" | "legendary";
  points: number;
  discoveredBy: number;
  highlights: string[];
  nearbyArtisans: number;
}

export const hiddenLocations: Location[] = [
  {
    id: "chettinad",
    name: "Chettinad",
    state: "Tamil Nadu",
    description: "A forgotten land of magnificent mansions, unique cuisine, and Chettiar merchant heritage.",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400",
    rarity: "rare",
    points: 300,
    discoveredBy: 456,
    highlights: ["Palatial mansions", "Athangudi tiles", "Spicy cuisine", "Antique collections"],
    nearbyArtisans: 23,
  },
  {
    id: "majuli",
    name: "Majuli Island",
    state: "Assam",
    description: "World's largest river island and center of Vaishnavite culture and satras.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
    rarity: "legendary",
    points: 500,
    discoveredBy: 189,
    highlights: ["Satras (monasteries)", "Mask making", "Boat life", "Sunset views"],
    nearbyArtisans: 15,
  },
  {
    id: "mandu",
    name: "Mandu",
    state: "Madhya Pradesh",
    description: "Romantic ruins of a medieval Afghan kingdom perched on the Vindhyas.",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400",
    rarity: "rare",
    points: 350,
    discoveredBy: 567,
    highlights: ["Jahaz Mahal", "Hindola Mahal", "Rewa Kund", "Baz Bahadur Palace"],
    nearbyArtisans: 8,
  },
  {
    id: "orchha",
    name: "Orchha",
    state: "Madhya Pradesh",
    description: "Medieval Bundela Rajput kingdom frozen in time along the Betwa River.",
    image: "https://images.unsplash.com/photo-1590766940554-634dbfb1ac46?w=400",
    rarity: "uncommon",
    points: 200,
    discoveredBy: 892,
    highlights: ["Jahangir Mahal", "Ram Raja Temple", "Cenotaphs", "River views"],
    nearbyArtisans: 12,
  },
  {
    id: "ziro-valley",
    name: "Ziro Valley",
    state: "Arunachal Pradesh",
    description: "UNESCO World Heritage tentative site, home to the Apatani tribe.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
    rarity: "legendary",
    points: 450,
    discoveredBy: 234,
    highlights: ["Apatani culture", "Rice terraces", "Music festival", "Bamboo groves"],
    nearbyArtisans: 18,
  },
  {
    id: "dholavira",
    name: "Dholavira",
    state: "Gujarat",
    description: "Ancient Harappan city revealing 5000-year-old urban planning genius.",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400",
    rarity: "legendary",
    points: 400,
    discoveredBy: 345,
    highlights: ["Harappan ruins", "Water reservoirs", "Signboard", "Geometric city"],
    nearbyArtisans: 5,
  },
];

export const rarityColors = {
  common: "bg-gray-500/20 text-gray-700 border-gray-300",
  uncommon: "bg-green-500/20 text-green-700 border-green-300",
  rare: "bg-blue-500/20 text-blue-700 border-blue-300",
  legendary: "bg-purple-500/20 text-purple-700 border-purple-300",
};

export const rarityPoints = {
  common: 100,
  uncommon: 200,
  rare: 300,
  legendary: 500,
};
