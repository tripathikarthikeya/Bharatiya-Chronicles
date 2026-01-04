import { Link, useLocation } from "react-router-dom";
import { Compass, ScanLine, ShoppingBag, Trophy, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Compass, label: "Explore", path: "/" },
  { icon: ScanLine, label: "AR Scanner", path: "/ar-scanner" },
  { icon: BookOpen, label: "Audiobook", path: "/audiobook" },
  { icon: ShoppingBag, label: "Marketplace", path: "/marketplace" },
  { icon: Trophy, label: "Leaderboard", path: "/leaderboard" },
];

export function BottomNavigation() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-border safe-area-pb">
      <div className="flex items-center justify-around py-2 px-2 max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-300",
                isActive
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <Icon
                className={cn(
                  "w-5 h-5 transition-transform duration-300",
                  isActive && "scale-110"
                )}
              />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
