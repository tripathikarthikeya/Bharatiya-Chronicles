import { cn } from "@/lib/utils";
import { aiCompanions, Companion } from "@/data/companions";

interface CompanionSelectorProps {
  selectedId: string;
  onSelect: (companion: Companion) => void;
}

export function CompanionSelector({ selectedId, onSelect }: CompanionSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Choose Your AI Companion</h3>
        <span className="text-xs text-muted-foreground">Tap to select</span>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {aiCompanions.map((companion) => {
          const isSelected = selectedId === companion.id;
          return (
            <button
              key={companion.id}
              onClick={() => onSelect(companion)}
              className={cn(
                "flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all duration-300",
                isSelected
                  ? "bg-primary/10 border-primary text-foreground shadow-heritage"
                  : "bg-card border-border/50 text-muted-foreground hover:border-primary/30 hover:bg-primary/5"
              )}
            >
              <span className="text-xl">{companion.avatar}</span>
              <div className="text-left">
                <p className="text-sm font-medium">{companion.name}</p>
                <p className="text-[10px] text-muted-foreground">{companion.specialty}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
