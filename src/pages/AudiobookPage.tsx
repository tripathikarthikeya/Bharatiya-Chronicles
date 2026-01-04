import { useState, useRef } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { 
  BookOpen, Play, Pause, SkipBack, SkipForward, 
  Volume2, VolumeX, Heart, Share2, ChevronRight, 
  Mic, MessageCircle 
} from "lucide-react";
import { aiCompanions } from "@/data/companions";

interface Audiobook {
  id: string;
  title: string;
  narrator: string;
  duration: string;
  chapters: number;
  image: string;
  category: string;
  description: string;
}

const audiobooks: Audiobook[] = [
  {
    id: "mahabharata",
    title: "The Mahabharata",
    narrator: "AI Arjun",
    duration: "12h 45m",
    chapters: 18,
    image: "https://images.unsplash.com/photo-1567591370504-80d5e5d6e5cc?w=400",
    category: "Epic",
    description: "The great Indian epic of dharma, war, and wisdom.",
  },
  {
    id: "ramayana",
    title: "The Ramayana",
    narrator: "AI Sabri",
    duration: "8h 30m",
    chapters: 7,
    image: "https://images.unsplash.com/photo-1609619385002-f40f1df9b5a4?w=400",
    category: "Epic",
    description: "The timeless tale of Lord Rama and Sita.",
  },
  {
    id: "panchatantra",
    title: "Panchatantra Tales",
    narrator: "AI Meera",
    duration: "4h 15m",
    chapters: 5,
    image: "https://images.unsplash.com/photo-1535712376064-78798e876934?w=400",
    category: "Fables",
    description: "Ancient collection of animal fables and moral stories.",
  },
  {
    id: "akbar-birbal",
    title: "Akbar & Birbal Stories",
    narrator: "AI Eklavya",
    duration: "3h 20m",
    chapters: 12,
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400",
    category: "Folklore",
    description: "Witty tales from the Mughal court.",
  },
];

export default function AudiobookPage() {
  const [selectedBook, setSelectedBook] = useState<Audiobook | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState([25]);
  const [volume, setVolume] = useState([80]);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedCompanion, setSelectedCompanion] = useState(aiCompanions[0]);

  if (selectedBook) {
    return (
      <AppLayout showHeader={false} showNavigation={false}>
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 flex flex-col">
          {/* Top Bar */}
          <div className="p-4 flex items-center justify-between">
            <button
              onClick={() => setSelectedBook(null)}
              className="text-sm text-muted-foreground"
            >
              ← Back
            </button>
            <div className="flex gap-2">
              <button className="p-2 rounded-full hover:bg-muted">
                <Heart className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-full hover:bg-muted">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Album Art */}
          <div className="flex-1 flex flex-col items-center justify-center px-8 py-6">
            <div className="relative w-64 h-64 rounded-2xl overflow-hidden shadow-heritage-lg">
              <img
                src={selectedBook.image}
                alt={selectedBook.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            <div className="mt-6 text-center">
              <Badge className="mb-2">{selectedBook.category}</Badge>
              <h1 className="text-2xl font-bold text-foreground">{selectedBook.title}</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Narrated by {selectedBook.narrator}
              </p>
            </div>
          </div>

          {/* Companion Selector */}
          <div className="px-4 py-4">
            <p className="text-xs text-muted-foreground mb-2 text-center">
              Listening with AI Companion
            </p>
            <div className="flex justify-center gap-2">
              {aiCompanions.map((companion) => (
                <button
                  key={companion.id}
                  onClick={() => setSelectedCompanion(companion)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-xl transition-all ${
                    selectedCompanion.id === companion.id
                      ? "bg-primary/20 ring-2 ring-primary"
                      : "bg-muted hover:bg-muted/80"
                  }`}
                >
                  {companion.avatar}
                </button>
              ))}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="px-6 py-4">
            <Slider
              value={progress}
              onValueChange={setProgress}
              max={100}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>12:45</span>
              <span>Chapter 3 of {selectedBook.chapters}</span>
              <span>48:30</span>
            </div>
          </div>

          {/* Controls */}
          <div className="px-6 py-6">
            <div className="flex items-center justify-center gap-6">
              <button className="p-3 rounded-full hover:bg-muted transition-colors">
                <SkipBack className="w-6 h-6" />
              </button>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-heritage-lg hover:bg-primary/90 transition-colors"
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8 text-primary-foreground" />
                ) : (
                  <Play className="w-8 h-8 text-primary-foreground ml-1" />
                )}
              </button>
              <button className="p-3 rounded-full hover:bg-muted transition-colors">
                <SkipForward className="w-6 h-6" />
              </button>
            </div>

            {/* Volume & Ask AI */}
            <div className="flex items-center justify-between mt-6 gap-4">
              <div className="flex items-center gap-2 flex-1">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 rounded-full hover:bg-muted"
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <Volume2 className="w-5 h-5" />
                  )}
                </button>
                <Slider
                  value={isMuted ? [0] : volume}
                  onValueChange={setVolume}
                  max={100}
                  step={1}
                  className="w-24"
                />
              </div>
              <Button variant="outline" size="sm" className="rounded-full">
                <MessageCircle className="w-4 h-4 mr-2" />
                Ask {selectedCompanion.name}
              </Button>
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="p-4 border-t border-border bg-background">
            <Button
              variant="ghost"
              className="w-full justify-between"
              onClick={() => setSelectedBook(null)}
            >
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                View All Chapters
              </span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="px-4 py-4 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">Audio Stories</h1>
          <p className="text-sm text-muted-foreground">
            AI-narrated tales from India's rich heritage
          </p>
        </div>

        {/* AI Companion Info */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-primary/10 to-heritage-gold/10 border border-primary/20">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-2xl">
              <Mic className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-foreground">Interactive AI Narration</h3>
              <p className="text-sm text-muted-foreground">
                Ask questions and explore stories with your AI companion
              </p>
            </div>
          </div>
        </div>

        {/* Featured */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3">Featured</h3>
          <button
            onClick={() => setSelectedBook(audiobooks[0])}
            className="w-full"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[2/1]">
              <img
                src={audiobooks[0].image}
                alt={audiobooks[0].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
              <div className="absolute inset-0 p-4 flex flex-col justify-end">
                <Badge className="w-fit mb-2">{audiobooks[0].category}</Badge>
                <h3 className="text-xl font-bold text-white">{audiobooks[0].title}</h3>
                <p className="text-white/70 text-sm mt-1">{audiobooks[0].description}</p>
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center gap-1 text-white/80 text-sm">
                    <BookOpen className="w-4 h-4" />
                    {audiobooks[0].chapters} chapters
                  </div>
                  <div className="text-white/80 text-sm">{audiobooks[0].duration}</div>
                </div>
              </div>
              <div className="absolute top-4 right-4">
                <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center">
                  <Play className="w-6 h-6 text-primary-foreground ml-0.5" />
                </div>
              </div>
            </div>
          </button>
        </div>

        {/* All Audiobooks */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3">Library</h3>
          <div className="space-y-3">
            {audiobooks.map((book) => (
              <button
                key={book.id}
                onClick={() => setSelectedBook(book)}
                className="w-full text-left"
              >
                <div className="flex gap-3 p-3 rounded-xl bg-card border border-border/50 hover:shadow-heritage transition-all">
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Badge variant="secondary" className="text-[10px] mb-1">
                      {book.category}
                    </Badge>
                    <h4 className="font-medium text-foreground truncate">{book.title}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {book.narrator} • {book.duration}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Play className="w-4 h-4 text-primary ml-0.5" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
