export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  artisan: {
    name: string;
    village: string;
    story: string;
    avatar: string;
  };
  category: string;
  region: string;
  isVerified: boolean;
  rating: number;
  reviews: number;
  artisanShare: number;
}

export const products: Product[] = [
  {
    id: "banarasi-saree-1",
    name: "Handwoven Banarasi Silk Saree",
    description: "Traditional Banarasi silk saree with intricate gold zari work, featuring ancient Mughal patterns.",
    price: 15999,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400",
    artisan: {
      name: "Ramesh Kumar",
      village: "Varanasi, Uttar Pradesh",
      story: "Third-generation weaver keeping the 400-year-old Banarasi tradition alive.",
      avatar: "👨‍🎨",
    },
    category: "Textiles",
    region: "Uttar Pradesh",
    isVerified: true,
    rating: 4.9,
    reviews: 234,
    artisanShare: 70,
  },
  {
    id: "madhubani-painting-1",
    name: "Madhubani Tree of Life",
    description: "Hand-painted Madhubani artwork on handmade paper depicting the sacred Tree of Life.",
    price: 4500,
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400",
    artisan: {
      name: "Sunita Devi",
      village: "Madhubani, Bihar",
      story: "Award-winning artist preserving the ancient Mithila art tradition.",
      avatar: "👩‍🎨",
    },
    category: "Art",
    region: "Bihar",
    isVerified: true,
    rating: 4.8,
    reviews: 156,
    artisanShare: 80,
  },
  {
    id: "brass-diya-1",
    name: "Brass Temple Diya Set",
    description: "Handcrafted brass diyas with traditional designs, perfect for puja and festivals.",
    price: 1299,
    image: "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=400",
    artisan: {
      name: "Mohammad Salim",
      village: "Moradabad, Uttar Pradesh",
      story: "Master craftsman from the 'Brass City' of India.",
      avatar: "👨‍🔧",
    },
    category: "Handicrafts",
    region: "Uttar Pradesh",
    isVerified: true,
    rating: 4.7,
    reviews: 89,
    artisanShare: 65,
  },
  {
    id: "kashmiri-shawl-1",
    name: "Pashmina Kashmiri Shawl",
    description: "Authentic Kashmiri Pashmina shawl with hand-embroidered paisley patterns.",
    price: 24999,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400",
    artisan: {
      name: "Ghulam Ahmed",
      village: "Srinagar, Kashmir",
      story: "Fifth-generation Pashmina weaver using traditional techniques.",
      avatar: "👨‍🎨",
    },
    category: "Textiles",
    region: "Kashmir",
    isVerified: true,
    rating: 5.0,
    reviews: 67,
    artisanShare: 75,
  },
  {
    id: "terracotta-horse-1",
    name: "Bankura Terracotta Horse",
    description: "Traditional Bankura horse figurine, symbol of Bengal's folk art heritage.",
    price: 2499,
    image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400",
    artisan: {
      name: "Kartik Pal",
      village: "Bankura, West Bengal",
      story: "Creating the iconic Bankura horses for over 30 years.",
      avatar: "👨‍🎨",
    },
    category: "Handicrafts",
    region: "West Bengal",
    isVerified: true,
    rating: 4.6,
    reviews: 112,
    artisanShare: 70,
  },
  {
    id: "blue-pottery-1",
    name: "Jaipur Blue Pottery Vase",
    description: "Handmade blue pottery vase with Persian-inspired floral motifs.",
    price: 1899,
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400",
    artisan: {
      name: "Laxman Singh",
      village: "Jaipur, Rajasthan",
      story: "Reviving the 14th-century Mongol art tradition in Rajasthan.",
      avatar: "👨‍🔧",
    },
    category: "Pottery",
    region: "Rajasthan",
    isVerified: true,
    rating: 4.8,
    reviews: 203,
    artisanShare: 68,
  },
];

export const productCategories = [
  "All",
  "Textiles",
  "Art",
  "Handicrafts",
  "Pottery",
  "Jewelry",
  "Spices",
];

export const regions = [
  "All Regions",
  "Uttar Pradesh",
  "Bihar",
  "Kashmir",
  "West Bengal",
  "Rajasthan",
  "Kerala",
  "Tamil Nadu",
  "Gujarat",
];
