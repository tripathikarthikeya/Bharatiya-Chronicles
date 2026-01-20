import { useState } from "react";
import { Link } from "react-router-dom";
import { useSilkRouteGame } from "@/hooks/useSilkRouteGame";
import { GameDialogue } from "@/components/game/GameDialogue";
import { GamePuzzle } from "@/components/game/GamePuzzle";
import { GameInventory } from "@/components/game/GameInventory";
import { GameChapterSelect } from "@/components/game/GameChapterSelect";
import { GameEnding } from "@/components/game/GameEnding";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Package,
  Map,
  Sparkles,
  BookOpen,
  Volume2,
  Settings,
} from "lucide-react";

export default function SilkRouteGamePage() {
  const {
    gameState,
    getCurrentChapter,
    getCurrentDialogue,
    getCurrentPuzzle,
    selectDialogueChoice,
    advanceDialogue,
    solvePuzzle,
    closePuzzle,
    startChapter,
    completeGame,
    resetGame,
  } = useSilkRouteGame();

  const [showInventory, setShowInventory] = useState(false);
  const [showChapters, setShowChapters] = useState(false);

  const currentChapter = getCurrentChapter();
  const currentDialogue = getCurrentDialogue();
  const currentPuzzle = getCurrentPuzzle();

  // Check for ending triggers
  if (currentDialogue?.id.startsWith("ending_")) {
    const endingType = currentDialogue.id.replace("ending_", "") as "preserver" | "revealer" | "exploiter";
    if (!gameState.gameCompleted) {
      completeGame(endingType);
    }
  }

  // Show ending screen
  if (gameState.gameCompleted && gameState.currentEnding) {
    return (
      <GameEnding
        ending={gameState.currentEnding}
        totalPoints={gameState.points}
        onRestart={resetGame}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-between p-4">
          <Link to="/quest/silk-route-varanasi" className="p-2 -ml-2">
            <ArrowLeft className="w-5 h-5" />
          </Link>

          <div className="text-center">
            <p className="text-xs text-muted-foreground">Chapter {gameState.currentChapter}</p>
            <h1 className="text-sm font-bold text-foreground line-clamp-1">
              {currentChapter?.title || "The Lost Silk Route"}
            </h1>
          </div>

          <div className="flex items-center gap-1">
            <Badge className="bg-heritage-gold/20 text-heritage-gold border-0">
              <Sparkles className="w-3 h-3 mr-1" />
              {gameState.points}
            </Badge>
          </div>
        </div>
      </header>

      {/* Chapter Info Banner */}
      {currentChapter && (
        <div className="bg-gradient-to-r from-secondary/10 to-heritage-blue/10 px-4 py-3 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">{currentChapter.era}</p>
              <p className="text-sm font-medium text-foreground">{currentChapter.location}</p>
            </div>
            <Badge variant="outline" className="text-[10px]">
              🎵 {currentChapter.ambientSound.replace("_", " ")}
            </Badge>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 pb-24 overflow-y-auto">
        {currentDialogue && (
          <GameDialogue
            dialogue={currentDialogue}
            onChoiceSelect={selectDialogueChoice}
            onAdvance={advanceDialogue}
          />
        )}
      </main>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t border-border p-4">
        <div className="flex items-center justify-around max-w-md mx-auto">
          <button
            onClick={() => setShowInventory(true)}
            className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
          >
            <Package className="w-5 h-5" />
            <span className="text-[10px]">Inventory</span>
          </button>
          <button
            onClick={() => setShowChapters(true)}
            className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
          >
            <BookOpen className="w-5 h-5" />
            <span className="text-[10px]">Chapters</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
            <Map className="w-5 h-5" />
            <span className="text-[10px]">Map</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
            <Volume2 className="w-5 h-5" />
            <span className="text-[10px]">Audio</span>
          </button>
        </div>
      </div>

      {/* Modals */}
      {showInventory && (
        <GameInventory
          items={gameState.inventory}
          onClose={() => setShowInventory(false)}
        />
      )}

      {showChapters && (
        <GameChapterSelect
          chapters={gameState.chapters}
          currentChapter={gameState.currentChapter}
          onSelectChapter={(id) => {
            startChapter(id);
            setShowChapters(false);
          }}
          onClose={() => setShowChapters(false)}
        />
      )}

      {currentPuzzle && (
        <GamePuzzle
          puzzle={currentPuzzle}
          onSolve={solvePuzzle}
          onClose={closePuzzle}
        />
      )}
    </div>
  );
}
