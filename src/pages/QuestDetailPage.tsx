import { useParams, Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { trendingQuests, difficultyColors } from "@/data/quests";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Users, MapPin, Clock, CheckCircle, Play } from "lucide-react";

export default function QuestDetailPage() {
  const { id } = useParams();
  const quest = trendingQuests.find((q) => q.id === id);

  if (!quest) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
          <h2 className="text-xl font-bold text-foreground mb-2">Quest Not Found</h2>
          <p className="text-muted-foreground mb-4">This quest doesn't exist.</p>
          <Link to="/">
            <Button>Back to Explore</Button>
          </Link>
        </div>
      </AppLayout>
    );
  }

  const questSteps = [
    { title: "Learn the history", completed: false },
    { title: "Explore key locations", completed: false },
    { title: "Complete the challenge", completed: false },
    { title: "Share your discovery", completed: false },
  ];

  return (
    <AppLayout showHeader={false}>
      <div className="pb-24">
        {/* Hero */}
        <div className="relative aspect-video">
          <img
            src={quest.image}
            alt={quest.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <Link
            to="/"
            className="absolute top-4 left-4 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <Badge
            className={`absolute top-4 right-4 capitalize ${difficultyColors[quest.difficulty]}`}
          >
            {quest.difficulty}
          </Badge>
          <div className="absolute bottom-4 left-4 right-4">
            <h1 className="text-2xl font-bold text-white mb-1">{quest.title}</h1>
            <div className="flex items-center gap-3 text-white/80 text-sm">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {quest.subtitle}
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {quest.completedBy} completed
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 py-6 space-y-6">
          {/* Points Banner */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-heritage-gold/20 to-primary/10">
            <div>
              <p className="text-sm text-muted-foreground">Complete to earn</p>
              <div className="flex items-center gap-1">
                <span className="text-3xl font-bold text-heritage-gold">
                  +{quest.points}
                </span>
                <span className="text-xl">✦</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Estimated time</p>
              <div className="flex items-center gap-1 text-foreground">
                <Clock className="w-4 h-4" />
                <span className="font-medium">30-45 min</span>
              </div>
            </div>
          </div>

          {/* Quest Description */}
          <div>
            <h3 className="font-semibold text-foreground mb-2">About this Quest</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Embark on a journey to discover the secrets of {quest.subtitle}. 
              This quest will take you through ancient stories, hidden locations, 
              and introduce you to the artisans who keep these traditions alive.
            </p>
          </div>

          {/* Quest Steps */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Quest Steps</h3>
            <div className="space-y-3">
              {questSteps.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 p-3 rounded-xl border ${
                    step.completed
                      ? "bg-heritage-green/10 border-heritage-green/30"
                      : "bg-card border-border/50"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step.completed
                        ? "bg-heritage-green text-white"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step.completed ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <span className="text-sm font-medium">{index + 1}</span>
                    )}
                  </div>
                  <span
                    className={`flex-1 ${
                      step.completed ? "text-heritage-green" : "text-foreground"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Rewards */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Rewards</h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-card border border-border/50 text-center">
                <span className="text-2xl">✦</span>
                <p className="text-sm font-medium text-foreground mt-1">
                  {quest.points} Points
                </p>
              </div>
              <div className="p-3 rounded-xl bg-card border border-border/50 text-center">
                <span className="text-2xl">🏆</span>
                <p className="text-sm font-medium text-foreground mt-1">
                  Badge
                </p>
              </div>
              <div className="p-3 rounded-xl bg-card border border-border/50 text-center">
                <span className="text-2xl">📜</span>
                <p className="text-sm font-medium text-foreground mt-1">
                  Story
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Bottom */}
        <div className="fixed bottom-16 left-0 right-0 p-4 bg-background/95 backdrop-blur-lg border-t border-border">
          <Button size="lg" className="w-full rounded-xl heritage-button py-6">
            <Play className="w-5 h-5 mr-2" />
            Start Quest
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}
