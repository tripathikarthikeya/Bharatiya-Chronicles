import { 
  Eye, 
  Layers, 
  Box, 
  Play, 
  Pause, 
  RotateCcw, 
  Sun, 
  Moon,
  ChevronLeft,
  ChevronRight,
  Home
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

type ViewMode = "full" | "sections" | "wireframe";

interface TempleControlsProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  constructionStep: number;
  maxSteps: number;
  onConstructionStepChange: (step: number) => void;
  isPlaying: boolean;
  onPlayPause: () => void;
  onReset: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  highlightedSection: string | null;
  onSectionChange: (section: string | null) => void;
}

const sections = [
  { id: null, label: "All Sections" },
  { id: "base", label: "Base Platform" },
  { id: "cliffs", label: "Rock Cliffs" },
  { id: "walls", label: "Courtyard Walls" },
  { id: "vimana", label: "Main Shrine" },
  { id: "mandapa", label: "Mandapa Hall" },
  { id: "nandi", label: "Nandi Pavilion" },
  { id: "gopuram", label: "Gateway" },
  { id: "elephants", label: "Elephants" },
];

const constructionLabels = [
  "Start",
  "1. Excavate Base",
  "2. Carve Walls",
  "3. Shape Main Shrine",
  "4. Create Mandapa",
  "5. Nandi Pavilion",
  "6. Gateway",
  "7. Complete Details"
];

export function TempleControls({
  viewMode,
  onViewModeChange,
  constructionStep,
  maxSteps,
  onConstructionStepChange,
  isPlaying,
  onPlayPause,
  onReset,
  isDarkMode,
  onToggleTheme,
  highlightedSection,
  onSectionChange,
}: TempleControlsProps) {
  return (
    <div className="absolute top-4 left-4 right-4 flex flex-col gap-3 pointer-events-none">
      {/* Top Bar */}
      <div className="flex items-center justify-between pointer-events-auto">
        {/* View Mode Toggle */}
        <div className="flex items-center gap-2 bg-card/90 backdrop-blur-sm rounded-xl p-1 border border-border shadow-lg">
          <Button
            size="sm"
            variant={viewMode === "full" ? "default" : "ghost"}
            className={`rounded-lg ${viewMode === "full" ? "bg-heritage-gold text-foreground" : ""}`}
            onClick={() => onViewModeChange("full")}
          >
            <Eye className="h-4 w-4 mr-1" />
            Full
          </Button>
          <Button
            size="sm"
            variant={viewMode === "sections" ? "default" : "ghost"}
            className={`rounded-lg ${viewMode === "sections" ? "bg-heritage-gold text-foreground" : ""}`}
            onClick={() => onViewModeChange("sections")}
          >
            <Layers className="h-4 w-4 mr-1" />
            Sections
          </Button>
          <Button
            size="sm"
            variant={viewMode === "wireframe" ? "default" : "ghost"}
            className={`rounded-lg ${viewMode === "wireframe" ? "bg-heritage-gold text-foreground" : ""}`}
            onClick={() => onViewModeChange("wireframe")}
          >
            <Box className="h-4 w-4 mr-1" />
            Structure
          </Button>
        </div>

        {/* Theme & Reset */}
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="outline"
            className="rounded-full bg-card/90 backdrop-blur-sm border-border shadow-lg h-9 w-9"
            onClick={onToggleTheme}
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Button
            size="icon"
            variant="outline"
            className="rounded-full bg-card/90 backdrop-blur-sm border-border shadow-lg h-9 w-9"
            onClick={onReset}
          >
            <Home className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Section Selector (only in sections mode) */}
      {viewMode === "sections" && (
        <div className="flex flex-wrap gap-2 pointer-events-auto">
          {sections.map((section) => (
            <Badge
              key={section.id || "all"}
              className={`cursor-pointer transition-all ${
                highlightedSection === section.id
                  ? "bg-heritage-gold text-foreground"
                  : "bg-card/90 text-muted-foreground hover:bg-muted"
              }`}
              onClick={() => onSectionChange(section.id)}
            >
              {section.label}
            </Badge>
          ))}
        </div>
      )}

      {/* Construction Timeline */}
      <div className="bg-card/90 backdrop-blur-sm rounded-xl p-4 border border-border shadow-lg pointer-events-auto">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h4 className="text-sm font-semibold text-foreground">Construction Story</h4>
            <p className="text-xs text-muted-foreground">{constructionLabels[constructionStep]}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 rounded-full"
              onClick={() => onConstructionStepChange(Math.max(0, constructionStep - 1))}
              disabled={constructionStep === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              className={`h-8 w-8 rounded-full ${isPlaying ? "bg-heritage-gold text-foreground" : ""}`}
              onClick={onPlayPause}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 rounded-full"
              onClick={() => onConstructionStepChange(Math.min(maxSteps, constructionStep + 1))}
              disabled={constructionStep === maxSteps}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 rounded-full"
              onClick={() => onConstructionStepChange(0)}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <Slider
          value={[constructionStep]}
          max={maxSteps}
          step={1}
          onValueChange={(value) => onConstructionStepChange(value[0])}
          className="w-full"
        />
        <div className="flex justify-between mt-2">
          {constructionLabels.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i <= constructionStep ? "bg-heritage-gold" : "bg-muted"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
