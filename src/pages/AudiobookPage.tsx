import { useState, useRef, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { 
  BookOpen, Play, Pause, SkipBack, SkipForward, 
  Volume2, VolumeX, Heart, Share2, ChevronRight, 
  Mic, MessageCircle, Loader2 
} from "lucide-react";
import { aiCompanions } from "@/data/companions";
import { toast } from "sonner";

// Import assets
import mahabharataThumbnail from "@/assets/mahabharata-thumbnail.jpg";
import ramayanaThumbnail from "@/assets/ramayana-thumbnail.jpg";
import mahabharataAudio from "@/assets/audio/mahabharata-story.m4a";
import ramayanaAudio from "@/assets/audio/ramayana-story.m4a";

interface Audiobook {
  id: string;
  title: string;
  narrator: string;
  duration: string;
  chapters: number;
  image: string;
  category: string;
  description: string;
  sampleText: string;
  audioSrc?: string;
}

const audiobooks: Audiobook[] = [
  {
    id: "mahabharata",
    title: "The Mahabharata",
    narrator: "AI Arjun",
    duration: "3min 19sec",
    chapters: 18,
    image: mahabharataThumbnail,
    category: "Epic",
    description: "The great Indian epic of dharma, war, and wisdom.",
    sampleText: "In the ancient kingdom of Hastinapura, there lived two sets of cousins, the Pandavas and the Kauravas, whose rivalry would shape the destiny of the world. The Mahabharata tells the story of their struggle, a tale woven with threads of dharma, love, betrayal, and the eternal quest for righteousness.",
    audioSrc: ramayanaAudio,
  },
  {
    id: "ramayana",
    title: "The Ramayana",
    narrator: "AI Sabri",
    duration: "5min 20sec",
    chapters: 7,
    image: ramayanaThumbnail,
    category: "Epic",
    description: "The timeless tale of Lord Rama and Sita.",
    sampleText: "Long ago in the kingdom of Ayodhya, there lived a prince named Rama, the embodiment of virtue and righteousness. His story is one of love, sacrifice, and the triumph of good over evil. Join me as we journey through the forests of ancient India, following the path of this divine prince.",
    audioSrc: mahabharataAudio,
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
    sampleText: "The Panchatantra, meaning five treatises, is a collection of ancient Indian fables. Through tales of clever animals and wise birds, these stories teach us valuable lessons about friendship, wisdom, and the art of living. Let us begin with the tale of the lion and the rabbit.",
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
    sampleText: "In the magnificent court of Emperor Akbar, there sat a minister unlike any other. His name was Birbal, and his wit was as sharp as any sword. The stories of their clever exchanges have delighted generations. Today, we explore one such tale of wisdom and humor.",
  },
];

export default function AudiobookPage() {
  const [selectedBook, setSelectedBook] = useState<Audiobook | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState([0]);
  const [volume, setVolume] = useState([80]);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedCompanion, setSelectedCompanion] = useState(aiCompanions[0]);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUrlRef = useRef<string | null>(null);

  // Cleanup audio URL when component unmounts or book changes
  useEffect(() => {
    return () => {
      if (audioUrlRef.current) {
        URL.revokeObjectURL(audioUrlRef.current);
      }
    };
  }, [selectedBook]);

  // Handle volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume[0] / 100;
    }
  }, [volume, isMuted]);

  const generateAudio = async (text: string, voiceId: string) => {
    setIsLoading(true);
    
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/elevenlabs-tts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ text, voiceId }),
        }
      );

      if (!response.ok) {
        throw new Error(`TTS request failed: ${response.status}`);
      }

      const audioBlob = await response.blob();
      
      // Cleanup previous audio URL
      if (audioUrlRef.current) {
        URL.revokeObjectURL(audioUrlRef.current);
      }
      
      const audioUrl = URL.createObjectURL(audioBlob);
      audioUrlRef.current = audioUrl;
      
      // Create and configure audio element
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      
      audio.volume = isMuted ? 0 : volume[0] / 100;
      
      audio.addEventListener('loadedmetadata', () => {
        setDuration(audio.duration);
      });
      
      audio.addEventListener('timeupdate', () => {
        setCurrentTime(audio.currentTime);
        if (audio.duration > 0) {
          setProgress([(audio.currentTime / audio.duration) * 100]);
        }
      });
      
      audio.addEventListener('ended', () => {
        setIsPlaying(false);
        setProgress([0]);
        setCurrentTime(0);
      });
      
      await audio.play();
      setIsPlaying(true);
      toast.success(`${selectedCompanion.name} is now narrating`);
      
    } catch (error) {
      console.error('TTS Error:', error);
      toast.error('Failed to generate narration. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlayPause = () => {
    if (!selectedBook) return;
    
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    } else {
      // Check if book has a pre-recorded audio file
      if (selectedBook.audioSrc) {
        playPreRecordedAudio(selectedBook.audioSrc);
      } else {
        // Fall back to AI-generated audio
        generateAudio(selectedBook.sampleText, selectedCompanion.voiceId);
      }
    }
  };

  const playPreRecordedAudio = (audioSrc: string) => {
    setIsLoading(true);
    
    const audio = new Audio(audioSrc);
    audioRef.current = audio;
    
    audio.volume = isMuted ? 0 : volume[0] / 100;
    
    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration);
      setIsLoading(false);
    });
    
    audio.addEventListener('timeupdate', () => {
      setCurrentTime(audio.currentTime);
      if (audio.duration > 0) {
        setProgress([(audio.currentTime / audio.duration) * 100]);
      }
    });
    
    audio.addEventListener('ended', () => {
      setIsPlaying(false);
      setProgress([0]);
      setCurrentTime(0);
    });

    audio.addEventListener('canplaythrough', () => {
      audio.play();
      setIsPlaying(true);
      toast.success(`Playing ${selectedBook?.title}`);
    });

    audio.addEventListener('error', () => {
      setIsLoading(false);
      toast.error('Failed to load audio. Please try again.');
    });
  };

  const handleCompanionChange = (companion: typeof aiCompanions[0]) => {
    setSelectedCompanion(companion);
    // Stop current audio if playing
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
      setIsPlaying(false);
      setProgress([0]);
      setCurrentTime(0);
    }
    toast.info(`Switched to ${companion.name} as narrator`);
  };

  const handleProgressChange = (newProgress: number[]) => {
    if (audioRef.current && duration > 0) {
      const newTime = (newProgress[0] / 100) * duration;
      audioRef.current.currentTime = newTime;
      setProgress(newProgress);
      setCurrentTime(newTime);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSkip = (seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, Math.min(audioRef.current.currentTime + seconds, duration));
    }
  };

  if (selectedBook) {
    return (
      <AppLayout showHeader={false} showNavigation={false}>
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 flex flex-col">
          {/* Top Bar */}
          <div className="p-4 flex items-center justify-between">
            <button
              onClick={() => {
                if (audioRef.current) {
                  audioRef.current.pause();
                  audioRef.current = null;
                }
                setSelectedBook(null);
                setIsPlaying(false);
                setProgress([0]);
              }}
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
              {isLoading && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Loader2 className="w-12 h-12 text-white animate-spin" />
                </div>
              )}
            </div>

            <div className="mt-6 text-center">
              <Badge className="mb-2">{selectedBook.category}</Badge>
              <h1 className="text-2xl font-bold text-foreground">{selectedBook.title}</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Narrated by AI {selectedCompanion.name}
              </p>
            </div>
          </div>

          {/* Companion Selector */}
          <div className="px-4 py-4">
            <p className="text-xs text-muted-foreground mb-2 text-center">
              Choose AI Narrator Voice
            </p>
            <div className="flex justify-center gap-2">
              {aiCompanions.map((companion) => (
                <button
                  key={companion.id}
                  onClick={() => handleCompanionChange(companion)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-xl transition-all ${
                    selectedCompanion.id === companion.id
                      ? "bg-primary/20 ring-2 ring-primary"
                      : "bg-muted hover:bg-muted/80"
                  }`}
                  title={`${companion.name} - ${companion.specialty}`}
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
              onValueChange={handleProgressChange}
              max={100}
              step={0.1}
              className="w-full"
            />
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>{formatTime(currentTime)}</span>
              <span>Sample Narration</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="px-6 py-6">
            <div className="flex items-center justify-center gap-6">
              <button 
                onClick={() => handleSkip(-10)}
                className="p-3 rounded-full hover:bg-muted transition-colors"
              >
                <SkipBack className="w-6 h-6" />
              </button>
              <button
                onClick={handlePlayPause}
                disabled={isLoading}
                className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-heritage-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {isLoading ? (
                  <Loader2 className="w-8 h-8 text-primary-foreground animate-spin" />
                ) : isPlaying ? (
                  <Pause className="w-8 h-8 text-primary-foreground" />
                ) : (
                  <Play className="w-8 h-8 text-primary-foreground ml-1" />
                )}
              </button>
              <button 
                onClick={() => handleSkip(10)}
                className="p-3 rounded-full hover:bg-muted transition-colors"
              >
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
              onClick={() => {
                if (audioRef.current) {
                  audioRef.current.pause();
                  audioRef.current = null;
                }
                setSelectedBook(null);
                setIsPlaying(false);
                setProgress([0]);
              }}
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
              <h3 className="font-medium text-foreground">Real AI Narration</h3>
              <p className="text-sm text-muted-foreground">
                Each companion has a unique voice powered by ElevenLabs
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
