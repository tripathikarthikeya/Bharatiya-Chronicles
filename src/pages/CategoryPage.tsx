import { useParams, Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { categories } from "@/data/categories";
import { trendingQuests } from "@/data/quests";
import { hiddenLocations } from "@/data/locations";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Users } from "lucide-react";

export default function CategoryPage() {
  const { name } = useParams();
  const category = categories.find((c) => c.id === name);

  if (!category) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
          <h2 className="text-xl font-bold text-foreground mb-2">Category Not Found</h2>
          <p className="text-muted-foreground mb-4">This category doesn't exist.</p>
          <Link to="/">
            <Button>Back to Explore</Button>
          </Link>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout showHeader={false}>
      <div className="pb-6">
        {/* Hero */}
        <div className="relative h-48">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <Link
            to="/"
            className="absolute top-4 left-4 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
            <div>
              <span className="text-4xl mb-2 block">{category.icon}</span>
              <h1 className="text-2xl font-bold text-white">{category.name}</h1>
              <p className="text-white/70 text-sm mt-1">{category.description}</p>
            </div>
          </div>
        </div>

        <div className="px-4 py-6 space-y-6">
          {/* Related Quests */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Popular Quests</h3>
            <div className="space-y-3">
              {trendingQuests.slice(0, 3).map((quest) => (
                <Link key={quest.id} to={`/quest/${quest.id}`}>
                  <div className="flex gap-3 p-3 rounded-xl bg-card border border-border/50 hover:shadow-heritage transition-all">
                    <img
                      src={quest.image}
                      alt={quest.title}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">{quest.title}</h4>
                      <p className="text-sm text-muted-foreground">{quest.subtitle}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-heritage-gold font-medium">
                          +{quest.points} ✦
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {quest.completedBy} explorers
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Related Locations */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Discover Places</h3>
            <div className="grid grid-cols-2 gap-3">
              {hiddenLocations.slice(0, 4).map((location) => (
                <Link key={location.id} to={`/location/${location.id}`}>
                  <div className="rounded-xl overflow-hidden bg-card border border-border/50 hover:shadow-heritage transition-all">
                    <div className="aspect-video relative">
                      <img
                        src={location.image}
                        alt={location.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-2 left-2 right-2">
                        <p className="text-white text-sm font-medium truncate">
                          {location.name}
                        </p>
                        <div className="flex items-center gap-1 text-white/70 text-xs">
                          <MapPin className="w-3 h-3" />
                          {location.state}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
