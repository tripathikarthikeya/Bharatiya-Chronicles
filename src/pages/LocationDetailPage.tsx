import { useParams, Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { hiddenLocations } from "@/data/locations";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Users, Star, Navigation, Camera, BookOpen } from "lucide-react";

export default function LocationDetailPage() {
  const { id } = useParams();
  const location = hiddenLocations.find((l) => l.id === id);

  if (!location) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
          <h2 className="text-xl font-bold text-foreground mb-2">Location Not Found</h2>
          <p className="text-muted-foreground mb-4">This location doesn't exist.</p>
          <Link to="/marketplace">
            <Button>Back to Discoveries</Button>
          </Link>
        </div>
      </AppLayout>
    );
  }

  const nearbyProducts = products.slice(0, 3);

  const rarityStyles = {
    legendary: "bg-purple-500/20 text-purple-700 border-purple-300",
    rare: "bg-blue-500/20 text-blue-700 border-blue-300",
    uncommon: "bg-green-500/20 text-green-700 border-green-300",
    common: "bg-gray-500/20 text-gray-700 border-gray-300",
  };

  return (
    <AppLayout showHeader={false}>
      <div className="pb-6">
        {/* Hero Image */}
        <div className="relative aspect-video">
          <img
            src={location.image}
            alt={location.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <Link
            to="/marketplace"
            className="absolute top-4 left-4 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <Badge
            className={`absolute top-4 right-4 capitalize border ${rarityStyles[location.rarity]}`}
          >
            {location.rarity}
          </Badge>
          <div className="absolute bottom-4 left-4 right-4">
            <h1 className="text-2xl font-bold text-white mb-1">{location.name}</h1>
            <div className="flex items-center gap-2 text-white/80">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{location.state}</span>
            </div>
          </div>
        </div>

        <div className="px-4 py-6 space-y-6">
          {/* Points & Stats */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-heritage-gold/20 to-primary/10">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <span className="text-2xl font-bold text-heritage-gold">
                  +{location.points}
                </span>
                <span className="text-lg">✦</span>
              </div>
              <p className="text-xs text-muted-foreground">Discovery Points</p>
            </div>
            <div className="w-px h-10 bg-border" />
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <Users className="w-5 h-5 text-primary" />
                <span className="text-xl font-bold">{location.discoveredBy}</span>
              </div>
              <p className="text-xs text-muted-foreground">Explorers</p>
            </div>
            <div className="w-px h-10 bg-border" />
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <Star className="w-5 h-5 text-heritage-terracotta" />
                <span className="text-xl font-bold">{location.nearbyArtisans}</span>
              </div>
              <p className="text-xs text-muted-foreground">Artisans</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold text-foreground mb-2">About this place</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {location.description}
            </p>
          </div>

          {/* Highlights */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Highlights</h3>
            <div className="flex flex-wrap gap-2">
              {location.highlights.map((highlight, index) => (
                <Badge key={index} variant="secondary" className="rounded-full">
                  {highlight}
                </Badge>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="rounded-xl py-6">
              <Camera className="w-5 h-5 mr-2" />
              AR Explore
            </Button>
            <Button variant="outline" className="rounded-xl py-6">
              <BookOpen className="w-5 h-5 mr-2" />
              Audio Guide
            </Button>
          </div>

          {/* Nearby Artisans */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-foreground">Nearby Artisans</h3>
              <Link to="/marketplace" className="text-sm text-primary font-medium">
                View All
              </Link>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
              {nearbyProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="flex-shrink-0 w-36"
                >
                  <div className="rounded-xl overflow-hidden bg-card border border-border/50">
                    <div className="aspect-square">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-2">
                      <p className="text-xs font-medium text-foreground line-clamp-1">
                        {product.name}
                      </p>
                      <p className="text-xs text-primary font-semibold">
                        ₹{product.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Discover Button */}
          <Button size="lg" className="w-full rounded-xl heritage-button py-6">
            <Navigation className="w-5 h-5 mr-2" />
            Mark as Discovered (+{location.points} ✦)
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}
