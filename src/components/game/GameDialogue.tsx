import { useState, useEffect } from "react";
import { Dialogue, DialogueChoice } from "@/data/silkRouteGame";
import { Button } from "@/components/ui/button";
import { User, MessageCircle, Sparkles } from "lucide-react";

interface GameDialogueProps {
  dialogue: Dialogue;
  onChoiceSelect: (choiceId: string) => void;
  onAdvance: () => void;
}

export function GameDialogue({
  dialogue,
  onChoiceSelect,
  onAdvance,
}: GameDialogueProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  // Typewriter effect
  useEffect(() => {
    setDisplayedText("");
    setIsTyping(true);
    let index = 0;
    const text = dialogue.text;

    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, 20);

    return () => clearInterval(timer);
  }, [dialogue.text]);

  const handleSkipTyping = () => {
    setDisplayedText(dialogue.text);
    setIsTyping(false);
  };

  const isNarrator = dialogue.speaker === "Narrator";
  const isEnding = dialogue.text.startsWith("ENDING:");

  return (
    <div className="space-y-4">
      {/* Speaker Header */}
      <div className="flex items-center gap-3">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center ${
            isNarrator
              ? "bg-gradient-to-br from-heritage-gold/30 to-heritage-saffron/30"
              : "bg-gradient-to-br from-secondary/30 to-heritage-blue/30"
          }`}
        >
          {isNarrator ? (
            <Sparkles className="w-6 h-6 text-heritage-gold" />
          ) : (
            <User className="w-6 h-6 text-secondary" />
          )}
        </div>
        <div>
          <h3 className="font-bold text-foreground">{dialogue.speaker}</h3>
          {dialogue.speakerRole && (
            <p className="text-xs text-muted-foreground">
              {dialogue.speakerRole}
            </p>
          )}
        </div>
      </div>

      {/* Dialogue Text */}
      <div
        className={`relative p-4 rounded-2xl ${
          isEnding
            ? "bg-gradient-to-br from-heritage-gold/20 to-heritage-saffron/20 border-2 border-heritage-gold/50"
            : isNarrator
            ? "bg-muted/50 border border-border/50 italic"
            : "bg-card border border-border"
        }`}
        onClick={isTyping ? handleSkipTyping : undefined}
      >
        <p
          className={`text-foreground leading-relaxed whitespace-pre-line ${
            isEnding ? "font-semibold" : ""
          }`}
        >
          {displayedText}
          {isTyping && (
            <span className="inline-block w-2 h-4 bg-primary ml-1 animate-pulse" />
          )}
        </p>
        {isTyping && (
          <p className="text-xs text-muted-foreground mt-2">Tap to skip...</p>
        )}
      </div>

      {/* Choices or Continue Button */}
      {!isTyping && (
        <div className="space-y-2 animate-fade-in">
          {dialogue.choices && dialogue.choices.length > 0 ? (
            dialogue.choices.map((choice) => (
              <ChoiceButton
                key={choice.id}
                choice={choice}
                onClick={() => onChoiceSelect(choice.id)}
              />
            ))
          ) : (
            <Button
              onClick={onAdvance}
              className="w-full heritage-button"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Continue
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

interface ChoiceButtonProps {
  choice: DialogueChoice;
  onClick: () => void;
}

function ChoiceButton({ choice, onClick }: ChoiceButtonProps) {
  const getMoralIndicator = () => {
    if (!choice.moralImpact) return null;

    switch (choice.moralImpact) {
      case "preserver":
        return (
          <span className="text-xs px-2 py-0.5 rounded-full bg-heritage-green/20 text-heritage-green">
            ⬢ Preserve
          </span>
        );
      case "revealer":
        return (
          <span className="text-xs px-2 py-0.5 rounded-full bg-heritage-blue/20 text-heritage-blue">
            ◇ Reveal
          </span>
        );
      case "exploiter":
        return (
          <span className="text-xs px-2 py-0.5 rounded-full bg-heritage-maroon/20 text-heritage-maroon">
            △ Exploit
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <button
      onClick={onClick}
      className="w-full p-4 text-left rounded-xl border-2 border-border bg-card hover:border-primary hover:bg-primary/5 transition-all duration-300 group"
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-foreground group-hover:text-primary transition-colors">
          {choice.text}
        </p>
        {getMoralIndicator()}
      </div>
      {choice.pointsChange && (
        <p
          className={`text-xs mt-1 ${
            choice.pointsChange > 0 ? "text-heritage-green" : "text-heritage-maroon"
          }`}
        >
          {choice.pointsChange > 0 ? "+" : ""}
          {choice.pointsChange} points
        </p>
      )}
    </button>
  );
}
