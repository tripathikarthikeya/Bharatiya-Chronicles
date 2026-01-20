import { InventoryItem } from "@/data/silkRouteGame";
import { Badge } from "@/components/ui/badge";
import { X, Package, Scroll, Coins, Wrench, Sparkles } from "lucide-react";

interface GameInventoryProps {
  items: InventoryItem[];
  onClose: () => void;
}

export function GameInventory({ items, onClose }: GameInventoryProps) {
  const acquiredItems = items.filter((item) => item.acquired);

  const getTypeIcon = (type: InventoryItem["type"]) => {
    switch (type) {
      case "trade_good":
        return <Package className="w-5 h-5" />;
      case "document":
        return <Scroll className="w-5 h-5" />;
      case "currency":
        return <Coins className="w-5 h-5" />;
      case "tool":
        return <Wrench className="w-5 h-5" />;
      case "artifact":
        return <Sparkles className="w-5 h-5" />;
      default:
        return <Package className="w-5 h-5" />;
    }
  };

  const getRarityColor = (rarity: InventoryItem["rarity"]) => {
    switch (rarity) {
      case "common":
        return "bg-muted text-muted-foreground";
      case "uncommon":
        return "bg-heritage-green/20 text-heritage-green";
      case "rare":
        return "bg-heritage-blue/20 text-heritage-blue";
      case "legendary":
        return "bg-heritage-gold/20 text-heritage-gold";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/95 backdrop-blur-md">
      <div className="w-full max-w-md bg-card rounded-3xl shadow-2xl border border-border overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="relative p-6 bg-gradient-to-r from-heritage-gold/20 to-heritage-saffron/20">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-background/50 hover:bg-background transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-heritage-gold/30 flex items-center justify-center">
              <Package className="w-6 h-6 text-heritage-gold" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Inventory</h2>
              <p className="text-sm text-muted-foreground">
                {acquiredItems.length} items collected
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {acquiredItems.length === 0 ? (
            <div className="text-center py-8">
              <Package className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
              <p className="text-muted-foreground">No items collected yet</p>
              <p className="text-sm text-muted-foreground mt-1">
                Explore and make choices to find artifacts
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {acquiredItems.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-muted/30 border border-border hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${getRarityColor(
                        item.rarity
                      )}`}
                    >
                      {getTypeIcon(item.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-foreground">
                          {item.name}
                        </h3>
                        <Badge
                          variant="secondary"
                          className={`text-[10px] capitalize ${getRarityColor(
                            item.rarity
                          )}`}
                        >
                          {item.rarity}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {item.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Chapter {item.chapter} • {item.type.replace("_", " ")}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
