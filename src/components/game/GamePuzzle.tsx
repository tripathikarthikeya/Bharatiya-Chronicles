import { useState } from "react";
import { Puzzle } from "@/data/silkRouteGame";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  X,
  HelpCircle,
  Check,
  RotateCcw,
  Sparkles,
  AlertCircle,
} from "lucide-react";

interface GamePuzzleProps {
  puzzle: Puzzle;
  onSolve: (puzzleId: string, solution: string[]) => boolean;
  onClose: () => void;
}

export function GamePuzzle({ puzzle, onSolve, onClose }: GamePuzzleProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(
    null
  );

  const handleOptionClick = (option: string) => {
    if (feedback) return;

    setSelectedOptions((prev) => {
      if (prev.includes(option)) {
        return prev.filter((o) => o !== option);
      }
      if (prev.length < puzzle.solution.length) {
        return [...prev, option];
      }
      return prev;
    });
  };

  const handleSubmit = () => {
    const isCorrect = onSolve(puzzle.id, selectedOptions);
    setFeedback(isCorrect ? "correct" : "incorrect");

    if (isCorrect) {
      setTimeout(() => {
        onClose();
      }, 2000);
    }
  };

  const handleReset = () => {
    setSelectedOptions([]);
    setFeedback(null);
  };

  const formatOptionLabel = (option: string): string => {
    return option
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const getPuzzleTypeIcon = () => {
    switch (puzzle.type) {
      case "symbol_match":
        return "🔣";
      case "sequence":
        return "📍";
      case "cipher":
        return "🔐";
      case "pattern":
        return "🧩";
      case "trade_code":
        return "📜";
      default:
        return "❓";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/95 backdrop-blur-md">
      <div className="w-full max-w-md bg-card rounded-3xl shadow-2xl border border-border overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="relative p-6 bg-gradient-to-r from-secondary/20 to-heritage-blue/20">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-background/50 hover:bg-background transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <span className="text-3xl">{getPuzzleTypeIcon()}</span>
            <div>
              <h2 className="text-xl font-bold text-foreground">
                {puzzle.title}
              </h2>
              <Badge variant="secondary" className="mt-1">
                {puzzle.type.replace("_", " ")}
              </Badge>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <p className="text-muted-foreground">{puzzle.description}</p>

          {/* Hint */}
          <div>
            <button
              onClick={() => setShowHint(!showHint)}
              className="flex items-center gap-2 text-sm text-primary hover:underline"
            >
              <HelpCircle className="w-4 h-4" />
              {showHint ? "Hide Hint" : "Show Hint"}
            </button>
            {showHint && (
              <p className="mt-2 p-3 bg-heritage-gold/10 rounded-lg text-sm text-foreground border border-heritage-gold/30 animate-fade-in">
                💡 {puzzle.hint}
              </p>
            )}
          </div>

          {/* Selected Sequence */}
          <div>
            <p className="text-sm font-medium text-foreground mb-2">
              Your Selection ({selectedOptions.length}/{puzzle.solution.length}):
            </p>
            <div className="flex flex-wrap gap-2 min-h-[40px] p-3 bg-muted/30 rounded-xl border border-border">
              {selectedOptions.length === 0 ? (
                <p className="text-muted-foreground text-sm">
                  Select options below...
                </p>
              ) : (
                selectedOptions.map((option, index) => (
                  <Badge
                    key={index}
                    variant="default"
                    className="bg-primary/80 cursor-pointer hover:bg-destructive transition-colors"
                    onClick={() => handleOptionClick(option)}
                  >
                    {index + 1}. {formatOptionLabel(option)} ×
                  </Badge>
                ))
              )}
            </div>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-2 gap-2">
            {puzzle.options.map((option) => {
              const isSelected = selectedOptions.includes(option);
              return (
                <button
                  key={option}
                  onClick={() => handleOptionClick(option)}
                  disabled={feedback !== null}
                  className={`p-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isSelected
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted hover:bg-muted/80 text-foreground"
                  } ${feedback ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {formatOptionLabel(option)}
                </button>
              );
            })}
          </div>

          {/* Feedback */}
          {feedback && (
            <div
              className={`p-4 rounded-xl flex items-center gap-3 animate-fade-in ${
                feedback === "correct"
                  ? "bg-heritage-green/20 border border-heritage-green/50"
                  : "bg-destructive/20 border border-destructive/50"
              }`}
            >
              {feedback === "correct" ? (
                <>
                  <Sparkles className="w-6 h-6 text-heritage-green" />
                  <div>
                    <p className="font-bold text-heritage-green">Correct!</p>
                    <p className="text-sm text-foreground">
                      +{puzzle.reward.points} points
                      {puzzle.reward.item && ` • ${puzzle.reward.item} acquired`}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <AlertCircle className="w-6 h-6 text-destructive" />
                  <div>
                    <p className="font-bold text-destructive">Incorrect</p>
                    <p className="text-sm text-foreground">
                      Try again with a different sequence
                    </p>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleReset}
              className="flex-1"
              disabled={feedback === "correct"}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button
              onClick={handleSubmit}
              className="flex-1 heritage-button"
              disabled={
                selectedOptions.length !== puzzle.solution.length ||
                feedback === "correct"
              }
            >
              <Check className="w-4 h-4 mr-2" />
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
