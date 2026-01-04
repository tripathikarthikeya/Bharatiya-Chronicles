import { Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Settings, ChevronRight, MapPin, Trophy, 
  BookOpen, ShoppingBag, Heart, Star, LogOut 
} from "lucide-react";

export default function ProfilePage() {
  const user = {
    name: "Explorer",
    level: "Heritage Sage",
    points: 2450,
    nextLevelPoints: 3000,
    discoveries: 23,
    quests: 8,
    purchases: 5,
    favorites: 12,
    rank: 127,
  };

  const achievements = [
    { icon: "🏛️", name: "Temple Explorer", count: 15 },
    { icon: "📖", name: "Story Collector", count: 8 },
    { icon: "🎨", name: "Art Patron", count: 5 },
    { icon: "🗺️", name: "Hidden Gems", count: 3 },
  ];

  const menuItems = [
    { icon: MapPin, label: "My Discoveries", count: user.discoveries, path: "/discoveries" },
    { icon: Trophy, label: "Completed Quests", count: user.quests, path: "/quests" },
    { icon: ShoppingBag, label: "My Purchases", count: user.purchases, path: "/purchases" },
    { icon: Heart, label: "Favorites", count: user.favorites, path: "/favorites" },
    { icon: Star, label: "Reviews & Ratings", count: 7, path: "/reviews" },
  ];

  const progressPercent = (user.points / user.nextLevelPoints) * 100;

  return (
    <AppLayout>
      <div className="px-4 py-4 space-y-6">
        {/* Profile Header */}
        <div className="text-center space-y-4">
          <div className="relative inline-block">
            <Avatar className="w-24 h-24 ring-4 ring-heritage-gold/30">
              <AvatarFallback className="bg-gradient-to-br from-primary to-heritage-maroon text-primary-foreground text-2xl font-bold">
                {user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-heritage-gold flex items-center justify-center shadow-lg">
              <span className="text-sm">✦</span>
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">{user.name}</h1>
            <Badge className="mt-1 bg-gradient-to-r from-heritage-gold/20 to-primary/20 text-heritage-maroon border-0">
              {user.level}
            </Badge>
          </div>
        </div>

        {/* Level Progress */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-heritage-gold/10 to-primary/5 border border-heritage-gold/20">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Level Progress</span>
            <span className="font-medium text-foreground">
              {user.points.toLocaleString()} / {user.nextLevelPoints.toLocaleString()} ✦
            </span>
          </div>
          <Progress value={progressPercent} className="h-2" />
          <p className="text-xs text-muted-foreground mt-2">
            {(user.nextLevelPoints - user.points).toLocaleString()} points to next level
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 rounded-xl bg-card border border-border/50 text-center">
            <p className="text-2xl font-bold text-primary">{user.discoveries}</p>
            <p className="text-xs text-muted-foreground">Discoveries</p>
          </div>
          <div className="p-3 rounded-xl bg-card border border-border/50 text-center">
            <p className="text-2xl font-bold text-heritage-gold">{user.quests}</p>
            <p className="text-xs text-muted-foreground">Quests</p>
          </div>
          <div className="p-3 rounded-xl bg-card border border-border/50 text-center">
            <p className="text-2xl font-bold text-heritage-green">#{user.rank}</p>
            <p className="text-xs text-muted-foreground">Rank</p>
          </div>
        </div>

        {/* Achievements */}
        <div>
          <h3 className="font-semibold text-foreground mb-3">Achievements</h3>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-20 p-3 rounded-xl bg-card border border-border/50 text-center"
              >
                <span className="text-2xl block mb-1">{achievement.icon}</span>
                <p className="text-[10px] text-muted-foreground leading-tight">
                  {achievement.name}
                </p>
                <p className="text-xs font-bold text-primary mt-1">{achievement.count}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Menu */}
        <div className="space-y-2">
          {menuItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <div className="flex items-center justify-between p-3 rounded-xl bg-card border border-border/50 hover:shadow-sm transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-medium text-foreground">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{item.count}</Badge>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Settings & Logout */}
        <div className="space-y-2 pt-4 border-t border-border">
          <Link to="/settings">
            <div className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-all">
              <div className="flex items-center gap-3">
                <Settings className="w-5 h-5 text-muted-foreground" />
                <span className="text-muted-foreground">Settings</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
          </Link>
          <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-destructive/10 transition-all">
            <div className="flex items-center gap-3">
              <LogOut className="w-5 h-5 text-destructive" />
              <span className="text-destructive">Log Out</span>
            </div>
          </button>
        </div>
      </div>
    </AppLayout>
  );
}
