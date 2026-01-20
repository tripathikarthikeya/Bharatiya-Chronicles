import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { SearchBar } from "@/components/explore/SearchBar";
import { CompanionSelector } from "@/components/explore/CompanionSelector";
import { TrendingQuests } from "@/components/explore/TrendingQuests";
import { CategoryGrid } from "@/components/explore/CategoryGrid";
import { aiCompanions, Companion } from "@/data/companions";

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCompanion, setSelectedCompanion] = useState<Companion>(aiCompanions[0]);

  return (
    <AppLayout>
      <div className="px-4 py-4 space-y-6">
        {/* Hero Section */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">
            Namaste, Explorer! 🙏
          </h1>
          <p className="text-sm text-muted-foreground">
            Discover the hidden treasures of India's rich heritage
          </p>
        </div>

        {/* Search */}
        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        {/* AI Companion Selector */}
        <CompanionSelector
          selectedId={selectedCompanion.id}
          onSelect={setSelectedCompanion}
        />

        {/* Continue Quests */}
        <TrendingQuests />

        {/* Category Grid */}
        <CategoryGrid />

        {/* Featured Location Banner */}
        <div className="relative rounded-2xl overflow-hidden h-40 shadow-heritage-lg">
          <img
            src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800"
            alt="Featured Location"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          <div className="absolute inset-0 p-4 flex flex-col justify-end">
            <span className="text-xs text-heritage-gold font-medium mb-1">
              ✦ Featured Discovery
            </span>
            <h3 className="text-white font-bold text-lg">Khajuraho Temples</h3>
            <p className="text-white/70 text-xs mt-1">
              UNESCO World Heritage • Madhya Pradesh
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
