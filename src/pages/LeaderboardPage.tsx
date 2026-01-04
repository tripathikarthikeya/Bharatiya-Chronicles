import { AppLayout } from "@/components/layout/AppLayout";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Medal, Crown, TrendingUp } from "lucide-react";

interface LeaderboardEntry {
  rank: number;
  name: string;
  avatar?: string;
  level: string;
  points: number;
  discoveries: number;
  badge: "gold" | "silver" | "bronze" | null;
}

const weeklyLeaderboard: LeaderboardEntry[] = [
  { rank: 1, name: "Priya Sharma", level: "Heritage Master", points: 12450, discoveries: 156, badge: "gold" },
  { rank: 2, name: "Arjun Patel", level: "Heritage Sage", points: 11230, discoveries: 142, badge: "silver" },
  { rank: 3, name: "Meera Krishnan", level: "Heritage Sage", points: 10890, discoveries: 138, badge: "bronze" },
  { rank: 4, name: "Rahul Verma", level: "Explorer", points: 9560, discoveries: 121, badge: null },
  { rank: 5, name: "Ananya Das", level: "Explorer", points: 8920, discoveries: 115, badge: null },
  { rank: 6, name: "Vikram Singh", level: "Wanderer", points: 7840, discoveries: 98, badge: null },
  { rank: 7, name: "Kavitha Nair", level: "Wanderer", points: 7120, discoveries: 89, badge: null },
  { rank: 8, name: "Amit Joshi", level: "Seeker", points: 6540, discoveries: 82, badge: null },
];

const allTimeLeaderboard: LeaderboardEntry[] = [
  { rank: 1, name: "Priya Sharma", level: "Heritage Master", points: 125670, discoveries: 1560, badge: "gold" },
  { rank: 2, name: "Arjun Patel", level: "Heritage Sage", points: 112340, discoveries: 1420, badge: "silver" },
  { rank: 3, name: "Rajesh Kumar", level: "Heritage Sage", points: 98760, discoveries: 1234, badge: "bronze" },
  { rank: 4, name: "Meera Krishnan", level: "Heritage Sage", points: 89450, discoveries: 1123, badge: null },
  { rank: 5, name: "Deepak Gupta", level: "Explorer", points: 78920, discoveries: 987, badge: null },
];

const badgeIcons = {
  gold: <Crown className="w-5 h-5 text-heritage-gold" />,
  silver: <Medal className="w-5 h-5 text-gray-400" />,
  bronze: <Medal className="w-5 h-5 text-heritage-terracotta" />,
};

function LeaderboardList({ entries }: { entries: LeaderboardEntry[] }) {
  return (
    <div className="space-y-3">
      {/* Top 3 Podium */}
      <div className="flex items-end justify-center gap-2 py-6">
        {/* Second Place */}
        <div className="flex flex-col items-center">
          <Avatar className="w-14 h-14 ring-2 ring-gray-400">
            <AvatarFallback className="bg-gradient-to-br from-gray-400 to-gray-500 text-white">
              {entries[1]?.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="mt-2 w-16 h-20 bg-gradient-to-t from-gray-400/30 to-gray-400/10 rounded-t-lg flex items-center justify-center">
            <span className="text-2xl font-bold text-gray-500">2</span>
          </div>
        </div>
        
        {/* First Place */}
        <div className="flex flex-col items-center -mb-4">
          <Crown className="w-8 h-8 text-heritage-gold mb-1" />
          <Avatar className="w-18 h-18 ring-4 ring-heritage-gold">
            <AvatarFallback className="bg-gradient-to-br from-heritage-gold to-heritage-saffron text-white text-xl">
              {entries[0]?.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="mt-2 w-20 h-28 bg-gradient-to-t from-heritage-gold/30 to-heritage-gold/10 rounded-t-lg flex items-center justify-center">
            <span className="text-3xl font-bold text-heritage-gold">1</span>
          </div>
        </div>
        
        {/* Third Place */}
        <div className="flex flex-col items-center">
          <Avatar className="w-14 h-14 ring-2 ring-heritage-terracotta">
            <AvatarFallback className="bg-gradient-to-br from-heritage-terracotta to-orange-600 text-white">
              {entries[2]?.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="mt-2 w-16 h-16 bg-gradient-to-t from-heritage-terracotta/30 to-heritage-terracotta/10 rounded-t-lg flex items-center justify-center">
            <span className="text-2xl font-bold text-heritage-terracotta">3</span>
          </div>
        </div>
      </div>

      {/* List */}
      <div className="space-y-2">
        {entries.map((entry) => (
          <div
            key={entry.rank}
            className={`flex items-center gap-3 p-3 rounded-xl ${
              entry.rank <= 3
                ? "bg-gradient-to-r from-heritage-gold/10 to-transparent border border-heritage-gold/20"
                : "bg-card border border-border/50"
            }`}
          >
            {/* Rank */}
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
              {entry.badge ? (
                badgeIcons[entry.badge]
              ) : (
                <span className="text-sm font-bold text-muted-foreground">
                  {entry.rank}
                </span>
              )}
            </div>

            {/* Avatar */}
            <Avatar className="w-10 h-10">
              <AvatarImage src={entry.avatar} />
              <AvatarFallback className="bg-primary/20 text-primary">
                {entry.name.charAt(0)}
              </AvatarFallback>
            </Avatar>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground truncate">{entry.name}</p>
              <Badge variant="secondary" className="text-[10px]">
                {entry.level}
              </Badge>
            </div>

            {/* Points */}
            <div className="text-right">
              <div className="flex items-center gap-1">
                <span className="font-bold text-heritage-gold">
                  {entry.points.toLocaleString()}
                </span>
                <span className="text-sm">✦</span>
              </div>
              <p className="text-xs text-muted-foreground">
                {entry.discoveries} discoveries
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LeaderboardPage() {
  return (
    <AppLayout>
      <div className="px-4 py-4 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-heritage-gold/20 to-primary/10">
            <Trophy className="w-8 h-8 text-heritage-gold" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Leaderboard</h1>
          <p className="text-sm text-muted-foreground">
            Top heritage explorers of India
          </p>
        </div>

        {/* Your Rank */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-primary/10 to-heritage-gold/10 border border-primary/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Your Current Rank</p>
              <p className="text-xl font-bold text-foreground">#127</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1">
                <span className="text-lg font-bold text-heritage-gold">2,450</span>
                <span className="text-sm">✦</span>
              </div>
              <p className="text-xs text-muted-foreground">23 discoveries</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="weekly" className="w-full">
          <TabsList className="w-full bg-muted/50 p-1 rounded-xl">
            <TabsTrigger
              value="weekly"
              className="flex-1 rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm"
            >
              This Week
            </TabsTrigger>
            <TabsTrigger
              value="alltime"
              className="flex-1 rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm"
            >
              All Time
            </TabsTrigger>
          </TabsList>

          <TabsContent value="weekly" className="mt-4">
            <LeaderboardList entries={weeklyLeaderboard} />
          </TabsContent>

          <TabsContent value="alltime" className="mt-4">
            <LeaderboardList entries={allTimeLeaderboard} />
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
