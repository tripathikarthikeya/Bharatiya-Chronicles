import { Link } from "react-router-dom";
import { trendingQuests, difficultyColors } from "@/data/quests";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";

export function TrendingQuests() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-foreground">Trending Quests</h3>
        <Link to="/quests" className="text-sm text-primary font-medium">
          View All
        </Link>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
        {trendingQuests.map((quest) => (
          <Link
            key={quest.id}
            to={`/quest/${quest.id}`}
            className="flex-shrink-0 w-44 group"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[3/4] shadow-lg">
              <img
                src={quest.image}
                alt={quest.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Difficulty Badge */}
              <Badge
                className={`absolute top-3 left-3 text-[10px] capitalize ${difficultyColors[quest.difficulty]}`}
              >
                {quest.difficulty}
              </Badge>

              {/* Points */}
              <div className="absolute top-3 right-3 flex items-center gap-1 bg-heritage-gold/90 text-foreground px-2 py-0.5 rounded-full">
                <span className="text-[10px] font-bold">+{quest.points}</span>
                <span className="text-[10px]">✦</span>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <h4 className="text-white font-semibold text-sm leading-tight mb-0.5">
                  {quest.title}
                </h4>
                <p className="text-white/70 text-xs">{quest.subtitle}</p>
                <div className="flex items-center gap-1 mt-2 text-white/60">
                  <Users className="w-3 h-3" />
                  <span className="text-[10px]">{quest.completedBy} explorers</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
