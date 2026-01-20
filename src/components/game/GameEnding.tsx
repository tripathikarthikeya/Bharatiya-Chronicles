import { GameEnding as EndingType } from "@/data/silkRouteGame";
import { Button } from "@/components/ui/button";
import { Sparkles, RotateCcw, Home, Share2 } from "lucide-react";
import { Link } from "react-router-dom";

interface GameEndingProps {
  ending: EndingType;
  totalPoints: number;
  onRestart: () => void;
}

export function GameEnding({ ending, totalPoints, onRestart }: GameEndingProps) {
  const getEndingEmoji = () => {
    switch (ending.id) {
      case "preserver":
        return "🏛️";
      case "revealer":
        return "📜";
      case "exploiter":
        return "💰";
      default:
        return "🌍";
    }
  };

  const getEndingGradient = () => {
    switch (ending.id) {
      case "preserver":
        return "from-heritage-green/30 to-heritage-blue/20";
      case "revealer":
        return "from-heritage-blue/30 to-secondary/20";
      case "exploiter":
        return "from-heritage-maroon/30 to-destructive/20";
      default:
        return "from-muted to-muted/50";
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-background overflow-y-auto">
      {/* Hero Section */}
      <div
        className={`relative min-h-[50vh] flex items-center justify-center bg-gradient-to-b ${getEndingGradient()}`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,hsl(var(--background))_100%)]" />
        
        <div className="relative text-center px-6 py-12 animate-fade-in">
          <span className="text-6xl mb-6 block">{getEndingEmoji()}</span>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {ending.title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            {ending.description}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-lg mx-auto px-6 py-8 space-y-8 -mt-12 relative">
        {/* Stats Card */}
        <div className="bg-card rounded-3xl shadow-xl border border-border p-6">
          <div className="flex items-center justify-center gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-heritage-gold">{totalPoints}</p>
              <p className="text-xs text-muted-foreground">Total Points</p>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">5/5</p>
              <p className="text-xs text-muted-foreground">Chapters</p>
            </div>
          </div>
        </div>

        {/* Epilogue */}
        <div className="bg-muted/30 rounded-2xl p-6 border border-border">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-heritage-gold" />
            <h2 className="font-bold text-foreground">Epilogue</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
            {ending.epilogue}
          </p>
        </div>

        {/* Journey Reflection */}
        <div className="text-center py-4">
          <p className="text-sm text-muted-foreground italic">
            "History is not just what happened—it's what we choose to remember."
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            — The Lost Silk Route of Varanasi
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Button
            onClick={onRestart}
            variant="outline"
            className="w-full"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Play Again (Different Choices)
          </Button>
          
          <Link to="/" className="block">
            <Button className="w-full heritage-button">
              <Home className="w-4 h-4 mr-2" />
              Return to Explore
            </Button>
          </Link>
        </div>

        {/* Share */}
        <div className="text-center pt-4">
          <button className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
            <Share2 className="w-4 h-4" />
            Share your ending
          </button>
        </div>
      </div>
    </div>
  );
}
