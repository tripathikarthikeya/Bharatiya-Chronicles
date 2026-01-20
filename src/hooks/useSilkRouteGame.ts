import { useState, useCallback, useEffect } from "react";
import {
  chapters,
  inventoryItems,
  gameEndings,
  Chapter,
  InventoryItem,
  GameEnding,
  MoralAlignment,
  ChapterStatus,
  Dialogue,
  Puzzle,
} from "@/data/silkRouteGame";

export interface GameState {
  currentChapter: number;
  currentDialogueId: string | null;
  currentPuzzleId: string | null;
  currentLocation: string | null;
  points: number;
  moralPoints: {
    preserver: number;
    revealer: number;
    exploiter: number;
  };
  chapters: Chapter[];
  inventory: InventoryItem[];
  completedPuzzles: string[];
  discoveredLocations: string[];
  unlockedKnowledge: string[];
  currentEnding: GameEnding | null;
  gameCompleted: boolean;
}

const STORAGE_KEY = "silk_route_game_state";

const getInitialState = (): GameState => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      // Invalid saved state, return fresh
    }
  }

  return {
    currentChapter: 1,
    currentDialogueId: "boatman_intro",
    currentPuzzleId: null,
    currentLocation: "main_ghat",
    points: 0,
    moralPoints: {
      preserver: 0,
      revealer: 0,
      exploiter: 0,
    },
    chapters: chapters.map((ch) => ({
      ...ch,
      status: ch.id === 1 ? "available" : "locked",
    })),
    inventory: inventoryItems.map((item) => ({ ...item, acquired: false })),
    completedPuzzles: [],
    discoveredLocations: ["main_ghat"],
    unlockedKnowledge: [],
    currentEnding: null,
    gameCompleted: false,
  };
};

export function useSilkRouteGame() {
  const [gameState, setGameState] = useState<GameState>(getInitialState);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
  }, [gameState]);

  const getCurrentChapter = useCallback((): Chapter | undefined => {
    return gameState.chapters.find((ch) => ch.id === gameState.currentChapter);
  }, [gameState.chapters, gameState.currentChapter]);

  const getCurrentDialogue = useCallback((): Dialogue | undefined => {
    const chapter = getCurrentChapter();
    if (!chapter || !gameState.currentDialogueId) return undefined;
    return chapter.dialogues.find((d) => d.id === gameState.currentDialogueId);
  }, [getCurrentChapter, gameState.currentDialogueId]);

  const getCurrentPuzzle = useCallback((): Puzzle | undefined => {
    const chapter = getCurrentChapter();
    if (!chapter || !gameState.currentPuzzleId) return undefined;
    return chapter.puzzles.find((p) => p.id === gameState.currentPuzzleId);
  }, [getCurrentChapter, gameState.currentPuzzleId]);

  const addPoints = useCallback((amount: number) => {
    setGameState((prev) => ({
      ...prev,
      points: Math.max(0, prev.points + amount),
    }));
  }, []);

  const addMoralPoints = useCallback((alignment: MoralAlignment, amount: number) => {
    if (alignment === "neutral") return;
    setGameState((prev) => ({
      ...prev,
      moralPoints: {
        ...prev.moralPoints,
        [alignment]: prev.moralPoints[alignment] + amount,
      },
    }));
  }, []);

  const acquireItem = useCallback((itemId: string) => {
    setGameState((prev) => ({
      ...prev,
      inventory: prev.inventory.map((item) =>
        item.id === itemId ? { ...item, acquired: true } : item
      ),
    }));
  }, []);

  const discoverLocation = useCallback((locationId: string) => {
    setGameState((prev) => {
      if (prev.discoveredLocations.includes(locationId)) return prev;
      return {
        ...prev,
        discoveredLocations: [...prev.discoveredLocations, locationId],
      };
    });
  }, []);

  const unlockKnowledge = useCallback((knowledge: string) => {
    setGameState((prev) => {
      if (prev.unlockedKnowledge.includes(knowledge)) return prev;
      return {
        ...prev,
        unlockedKnowledge: [...prev.unlockedKnowledge, knowledge],
      };
    });
  }, []);

  const selectDialogueChoice = useCallback(
    (choiceId: string) => {
      const dialogue = getCurrentDialogue();
      if (!dialogue?.choices) return;

      const choice = dialogue.choices.find((c) => c.id === choiceId);
      if (!choice) return;

      // Apply effects
      if (choice.pointsChange) {
        addPoints(choice.pointsChange);
      }

      if (choice.moralImpact) {
        addMoralPoints(choice.moralImpact, Math.abs(choice.pointsChange || 10));
      }

      if (choice.itemGained) {
        acquireItem(choice.itemGained);
      }

      // Move to next dialogue
      if (choice.nextDialogueId) {
        setGameState((prev) => ({
          ...prev,
          currentDialogueId: choice.nextDialogueId!,
        }));
      }
    },
    [getCurrentDialogue, addPoints, addMoralPoints, acquireItem]
  );

  const advanceDialogue = useCallback(() => {
    const dialogue = getCurrentDialogue();
    if (!dialogue) return;

    if (dialogue.nextDialogueId) {
      setGameState((prev) => ({
        ...prev,
        currentDialogueId: dialogue.nextDialogueId!,
      }));
    } else if (dialogue.id.includes("complete")) {
      // Chapter complete, unlock next
      completeChapter();
    }
  }, [getCurrentDialogue]);

  const startPuzzle = useCallback((puzzleId: string) => {
    setGameState((prev) => ({
      ...prev,
      currentPuzzleId: puzzleId,
    }));
  }, []);

  const solvePuzzle = useCallback(
    (puzzleId: string, solution: string[]) => {
      const chapter = getCurrentChapter();
      if (!chapter) return false;

      const puzzle = chapter.puzzles.find((p) => p.id === puzzleId);
      if (!puzzle) return false;

      const isCorrect =
        JSON.stringify(solution) === JSON.stringify(puzzle.solution);

      if (isCorrect) {
        addPoints(puzzle.reward.points);
        if (puzzle.reward.item) {
          acquireItem(puzzle.reward.item);
        }
        if (puzzle.reward.knowledge) {
          unlockKnowledge(puzzle.reward.knowledge);
        }

        setGameState((prev) => ({
          ...prev,
          completedPuzzles: [...prev.completedPuzzles, puzzleId],
          currentPuzzleId: null,
        }));
      }

      return isCorrect;
    },
    [getCurrentChapter, addPoints, acquireItem, unlockKnowledge]
  );

  const closePuzzle = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      currentPuzzleId: null,
    }));
  }, []);

  const completeChapter = useCallback(() => {
    setGameState((prev) => {
      const nextChapterId = prev.currentChapter + 1;
      const updatedChapters = prev.chapters.map((ch) => {
        if (ch.id === prev.currentChapter) {
          return { ...ch, status: "completed" as ChapterStatus };
        }
        if (ch.id === nextChapterId) {
          return { ...ch, status: "available" as ChapterStatus };
        }
        return ch;
      });

      // Add chapter rewards
      const currentChapter = prev.chapters.find(
        (ch) => ch.id === prev.currentChapter
      );
      let newPoints = prev.points;
      let newKnowledge = [...prev.unlockedKnowledge];

      if (currentChapter) {
        newPoints += currentChapter.rewards.points;
        newKnowledge = [
          ...newKnowledge,
          ...currentChapter.rewards.knowledge.filter(
            (k) => !newKnowledge.includes(k)
          ),
        ];
      }

      return {
        ...prev,
        chapters: updatedChapters,
        points: newPoints,
        unlockedKnowledge: newKnowledge,
      };
    });
  }, []);

  const startChapter = useCallback((chapterId: number) => {
    const chapter = chapters.find((ch) => ch.id === chapterId);
    if (!chapter) return;

    const firstDialogue = chapter.dialogues[0]?.id || null;
    const firstLocation = chapter.locations[0]?.id || null;

    setGameState((prev) => ({
      ...prev,
      currentChapter: chapterId,
      currentDialogueId: firstDialogue,
      currentLocation: firstLocation,
      chapters: prev.chapters.map((ch) =>
        ch.id === chapterId
          ? { ...ch, status: "in_progress" as ChapterStatus }
          : ch
      ),
    }));
  }, []);

  const calculateEnding = useCallback((): GameEnding => {
    const { preserver, revealer, exploiter } = gameState.moralPoints;

    // Determine dominant alignment
    if (exploiter > preserver && exploiter > revealer) {
      return gameEndings.find((e) => e.id === "exploiter")!;
    }
    if (revealer > preserver && revealer > exploiter) {
      return gameEndings.find((e) => e.id === "revealer")!;
    }
    if (preserver > revealer && preserver > exploiter) {
      return gameEndings.find((e) => e.id === "preserver")!;
    }
    return gameEndings.find((e) => e.id === "neutral")!;
  }, [gameState.moralPoints]);

  const completeGame = useCallback(
    (endingType: MoralAlignment) => {
      const ending = gameEndings.find((e) => e.id === endingType);
      if (!ending) return;

      setGameState((prev) => ({
        ...prev,
        currentEnding: { ...ending, unlocked: true },
        gameCompleted: true,
      }));
    },
    []
  );

  const resetGame = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setGameState(getInitialState());
  }, []);

  const getInventoryByChapter = useCallback(
    (chapterId: number): InventoryItem[] => {
      return gameState.inventory.filter(
        (item) => item.chapter === chapterId && item.acquired
      );
    },
    [gameState.inventory]
  );

  const getAcquiredItems = useCallback((): InventoryItem[] => {
    return gameState.inventory.filter((item) => item.acquired);
  }, [gameState.inventory]);

  return {
    gameState,
    getCurrentChapter,
    getCurrentDialogue,
    getCurrentPuzzle,
    addPoints,
    acquireItem,
    discoverLocation,
    unlockKnowledge,
    selectDialogueChoice,
    advanceDialogue,
    startPuzzle,
    solvePuzzle,
    closePuzzle,
    completeChapter,
    startChapter,
    calculateEnding,
    completeGame,
    resetGame,
    getInventoryByChapter,
    getAcquiredItems,
  };
}
