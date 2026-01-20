import { Chapter, ChapterStatus } from "@/data/silkRouteGame";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Lock,
  PlayCircle,
  CheckCircle,
  MapPin,
  Sparkles,
  ChevronRight,
} from "lucide-react";

interface GameChapterSelectProps {
  chapters: Chapter[];
  currentChapter: number;
  onSelectChapter: (chapterId: number) => void;
  onClose: () => void;
}

export function GameChapterSelect({
  chapters,
  currentChapter,
  onSelectChapter,
  onClose,
}: GameChapterSelectProps) {
  const getStatusIcon = (status: ChapterStatus) => {
    switch (status) {
      case "locked":
        return <Lock className="w-5 h-5" />;
      case "available":
        return <PlayCircle className="w-5 h-5" />;
      case "in_progress":
        return <Sparkles className="w-5 h-5" />;
      case "completed":
        return <CheckCircle className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: ChapterStatus) => {
    switch (status) {
      case "locked":
        return "text-muted-foreground bg-muted";
      case "available":
        return "text-primary bg-primary/20";
      case "in_progress":
        return "text-heritage-gold bg-heritage-gold/20";
      case "completed":
        return "text-heritage-green bg-heritage-green/20";
    }
  };

  const canSelect = (status: ChapterStatus) => {
    return status !== "locked";
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm p-4 border-b border-border">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground">Chapters</h2>
            <p className="text-sm text-muted-foreground">
              The Lost Silk Route of Varanasi
            </p>
          </div>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>

      {/* Chapter List */}
      <div className="max-w-2xl mx-auto p-4 space-y-4">
        {chapters.map((chapter, index) => (
          <button
            key={chapter.id}
            onClick={() => canSelect(chapter.status) && onSelectChapter(chapter.id)}
            disabled={!canSelect(chapter.status)}
            className={`w-full text-left rounded-2xl overflow-hidden border transition-all duration-300 ${
              canSelect(chapter.status)
                ? "border-border hover:border-primary hover:shadow-lg cursor-pointer"
                : "border-border/50 opacity-60 cursor-not-allowed"
            } ${
              chapter.id === currentChapter
                ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                : ""
            }`}
          >
            {/* Chapter Header */}
            <div
              className={`p-4 ${
                chapter.status === "completed"
                  ? "bg-heritage-green/10"
                  : chapter.status === "in_progress"
                  ? "bg-heritage-gold/10"
                  : "bg-muted/30"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${getStatusColor(
                      chapter.status
                    )}`}
                  >
                    {getStatusIcon(chapter.status)}
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Chapter {chapter.id}
                    </p>
                    <h3 className="font-bold text-foreground">{chapter.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {chapter.subtitle}
                    </p>
                  </div>
                </div>
                {canSelect(chapter.status) && (
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                )}
              </div>
            </div>

            {/* Chapter Details */}
            <div className="p-4 bg-card space-y-3">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {chapter.description}
              </p>

              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {chapter.location}
                </div>
                <Badge variant="outline" className="text-[10px]">
                  {chapter.era}
                </Badge>
              </div>

              {/* Rewards Preview */}
              <div className="flex items-center gap-2 pt-2 border-t border-border">
                <span className="text-xs text-muted-foreground">Rewards:</span>
                <Badge
                  variant="secondary"
                  className="text-[10px] bg-heritage-gold/20 text-heritage-gold"
                >
                  +{chapter.rewards.points} pts
                </Badge>
                <Badge variant="secondary" className="text-[10px]">
                  {chapter.rewards.items.length} items
                </Badge>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
