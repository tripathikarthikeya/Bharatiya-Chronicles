import { X, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HotspotInfo {
  id: string;
  title: string;
  description: string;
  historicalFact: string;
  architecturalNote: string;
  culturalSignificance: string;
}

const hotspotDetails: Record<string, HotspotInfo> = {
  vimana: {
    id: "vimana",
    title: "Main Shrine (Vimana)",
    description: "The towering main shrine dedicated to Lord Shiva, standing at 32 meters tall. It houses the sacred Shiva Lingam.",
    historicalFact: "Carved from a single rock, removing an estimated 200,000 tonnes of stone over 18 years (757-775 CE) during King Krishna I's reign.",
    architecturalNote: "Features a pyramidal superstructure with intricate carvings depicting scenes from Hindu epics and divine figures.",
    culturalSignificance: "Represents Mount Kailash, the celestial abode of Lord Shiva, brought to earth through master craftsmanship."
  },
  mandapa: {
    id: "mandapa",
    title: "Mandapa (Assembly Hall)",
    description: "The main assembly hall with 16 ornate pillars, used for religious gatherings and ceremonies.",
    historicalFact: "The pillars feature unique carvings, no two being exactly alike, showcasing the artisans' creativity.",
    architecturalNote: "The flat ceiling is carved to appear as if made of wooden beams, an architectural illusion in stone.",
    culturalSignificance: "Served as the space where devotees gathered for darshan and religious discourses."
  },
  nandi: {
    id: "nandi",
    title: "Nandi Pavilion",
    description: "A separate shrine housing Nandi, the sacred bull and devoted vehicle of Lord Shiva.",
    historicalFact: "The Nandi statue faces the main shrine, symbolizing eternal devotion and vigilance.",
    architecturalNote: "The pavilion stands on its own platform, connected to the main temple by a bridge carved from rock.",
    culturalSignificance: "Nandi represents dharma (righteousness) and is worshipped before approaching the main deity."
  },
  gopuram: {
    id: "gopuram",
    title: "Gateway (Gopuram)",
    description: "The ornate entrance gateway marking the transition from the mundane world to sacred space.",
    historicalFact: "Originally had wooden doors, now lost to time, that would be opened for special ceremonies.",
    architecturalNote: "Two-storey structure with detailed carvings of river goddesses Ganga and Yamuna.",
    culturalSignificance: "Crossing the gopuram threshold symbolizes spiritual purification before entering the temple."
  },
  elephants: {
    id: "elephants",
    title: "Elephant Sculptures",
    description: "Life-sized elephant sculptures carved at the base, appearing to support the temple structure.",
    historicalFact: "There are rows of elephants and lions carved along the base, totaling over 100 figures.",
    architecturalNote: "Each elephant is uniquely carved with different poses and ornamentations.",
    culturalSignificance: "Elephants symbolize strength, wisdom, and royal power in Hindu iconography."
  },
  courtyard: {
    id: "courtyard",
    title: "Courtyard",
    description: "The vast open space surrounding the main temple, carved 100 feet down into the rock.",
    historicalFact: "The courtyard walls feature elaborate galleries with carved panels depicting Ramayana and Mahabharata.",
    architecturalNote: "The entire complex covers about 60,000 sq ft, carved from top to bottom, unlike typical construction.",
    culturalSignificance: "The open courtyard allows circumambulation (pradakshina), a key Hindu ritual practice."
  }
};

interface TempleInfoPanelProps {
  selectedHotspot: string | null;
  onClose: () => void;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
}

export function TempleInfoPanel({ 
  selectedHotspot, 
  onClose, 
  isAudioPlaying, 
  onToggleAudio 
}: TempleInfoPanelProps) {
  if (!selectedHotspot || !hotspotDetails[selectedHotspot]) return null;

  const info = hotspotDetails[selectedHotspot];

  return (
    <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-card/95 backdrop-blur-lg rounded-2xl border border-border shadow-2xl animate-fade-in overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-heritage-gold/20 to-heritage-saffron/10 border-b border-border">
        <div className="flex items-start justify-between">
          <div>
            <Badge className="mb-2 bg-heritage-gold/20 text-heritage-gold border-heritage-gold/30">
              Architecture
            </Badge>
            <h3 className="text-lg font-bold text-foreground">{info.title}</h3>
          </div>
          <div className="flex gap-2">
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 rounded-full"
              onClick={onToggleAudio}
            >
              {isAudioPlaying ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 rounded-full"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4 max-h-[40vh] overflow-y-auto">
        <p className="text-sm text-foreground">{info.description}</p>

        <div className="space-y-3">
          <div className="p-3 rounded-xl bg-heritage-saffron/10 border border-heritage-saffron/20">
            <h4 className="text-xs font-semibold text-heritage-saffron uppercase tracking-wider mb-1">
              Historical Fact
            </h4>
            <p className="text-sm text-muted-foreground">{info.historicalFact}</p>
          </div>

          <div className="p-3 rounded-xl bg-heritage-blue/10 border border-heritage-blue/20">
            <h4 className="text-xs font-semibold text-heritage-blue uppercase tracking-wider mb-1">
              Architectural Note
            </h4>
            <p className="text-sm text-muted-foreground">{info.architecturalNote}</p>
          </div>

          <div className="p-3 rounded-xl bg-heritage-gold/10 border border-heritage-gold/20">
            <h4 className="text-xs font-semibold text-heritage-gold uppercase tracking-wider mb-1">
              Cultural Significance
            </h4>
            <p className="text-sm text-muted-foreground">{info.culturalSignificance}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export { hotspotDetails };
