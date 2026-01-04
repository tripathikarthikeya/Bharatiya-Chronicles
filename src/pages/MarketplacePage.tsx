import { useState } from "react";
import { Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { SearchBar } from "@/components/explore/SearchBar";
import { products, productCategories, regions } from "@/data/products";
import { hiddenLocations } from "@/data/locations";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShieldCheck, Star, MapPin, Users, Sparkles } from "lucide-react";

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedRegion, setSelectedRegion] = useState("All Regions");

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesRegion = selectedRegion === "All Regions" || product.region === selectedRegion;
    return matchesSearch && matchesCategory && matchesRegion;
  });

  return (
    <AppLayout>
      <div className="px-4 py-4 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">Marketplace</h1>
          <p className="text-sm text-muted-foreground">
            Support artisans. Preserve heritage. Own authenticity.
          </p>
        </div>

        {/* Search */}
        <SearchBar
          placeholder="Search products or artisans..."
          value={searchQuery}
          onChange={setSearchQuery}
        />

        {/* Tabs */}
        <Tabs defaultValue="products" className="w-full">
          <TabsList className="w-full bg-muted/50 p-1 rounded-xl">
            <TabsTrigger
              value="products"
              className="flex-1 rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm"
            >
              Products
            </TabsTrigger>
            <TabsTrigger
              value="discoveries"
              className="flex-1 rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm"
            >
              Discover Places
            </TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products" className="mt-4 space-y-4">
            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
              {productCategories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="flex-shrink-0 rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Region Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
              {regions.slice(0, 5).map((region) => (
                <Button
                  key={region}
                  variant={selectedRegion === region ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedRegion(region)}
                  className="flex-shrink-0 text-xs"
                >
                  {region}
                </Button>
              ))}
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 gap-3">
              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="group"
                >
                  <div className="rounded-2xl overflow-hidden bg-card border border-border/50 shadow-sm hover:shadow-heritage transition-all duration-300">
                    <div className="relative aspect-square">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {product.isVerified && (
                        <div className="absolute top-2 right-2 flex items-center gap-1 bg-heritage-green/90 text-white px-2 py-0.5 rounded-full">
                          <ShieldCheck className="w-3 h-3" />
                          <span className="text-[10px] font-medium">Verified</span>
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <h4 className="font-medium text-sm text-foreground line-clamp-2 leading-tight mb-1">
                        {product.name}
                      </h4>
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="w-3 h-3 fill-heritage-gold text-heritage-gold" />
                        <span className="text-xs text-muted-foreground">
                          {product.rating} ({product.reviews})
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-primary">
                          ₹{product.price.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-heritage-green font-medium">
                          {product.artisanShare}% to artisan
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </TabsContent>

          {/* Discoveries Tab */}
          <TabsContent value="discoveries" className="mt-4 space-y-4">
            <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-heritage-gold/20 to-primary/10 rounded-xl">
              <Sparkles className="w-5 h-5 text-heritage-gold" />
              <p className="text-sm text-foreground">
                Discover hidden gems and earn <strong>Heritage Points</strong>!
              </p>
            </div>

            <div className="space-y-3">
              {hiddenLocations.map((location) => (
                <Link
                  key={location.id}
                  to={`/location/${location.id}`}
                  className="block"
                >
                  <div className="flex gap-3 p-3 rounded-2xl bg-card border border-border/50 hover:shadow-heritage transition-all duration-300">
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={location.image}
                        alt={location.name}
                        className="w-full h-full object-cover"
                      />
                      <Badge
                        className={`absolute top-1 left-1 text-[8px] capitalize border ${
                          location.rarity === "legendary"
                            ? "bg-purple-500/20 text-purple-700 border-purple-300"
                            : location.rarity === "rare"
                            ? "bg-blue-500/20 text-blue-700 border-blue-300"
                            : "bg-green-500/20 text-green-700 border-green-300"
                        }`}
                      >
                        {location.rarity}
                      </Badge>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-semibold text-foreground">{location.name}</h4>
                        <div className="flex items-center gap-1 bg-heritage-gold/20 px-2 py-0.5 rounded-full flex-shrink-0">
                          <span className="text-xs font-bold text-heritage-gold">
                            +{location.points}
                          </span>
                          <span className="text-[10px]">✦</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                        <MapPin className="w-3 h-3" />
                        {location.state}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {location.description}
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Users className="w-3 h-3" />
                          {location.discoveredBy} discovered
                        </div>
                        <div className="text-xs text-heritage-terracotta">
                          {location.nearbyArtisans} artisans nearby
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
