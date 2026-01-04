import { Link } from "react-router-dom";
import { Bell, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  userName?: string;
  userLevel?: string;
  credits?: number;
  avatarUrl?: string;
}

export function Header({
  userName = "Explorer",
  userLevel = "Heritage Sage",
  credits = 2450,
  avatarUrl,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="flex items-center justify-between px-4 py-3">
        {/* User Profile */}
        <Link to="/profile" className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="w-11 h-11 ring-2 ring-primary/20">
              <AvatarImage src={avatarUrl} alt={userName} />
              <AvatarFallback className="bg-gradient-to-br from-primary to-heritage-maroon text-primary-foreground font-semibold">
                {userName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-heritage-gold flex items-center justify-center">
              <span className="text-[8px] font-bold text-foreground">✦</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-foreground">{userName}</span>
            <Badge 
              variant="secondary" 
              className="text-[10px] px-2 py-0 h-4 bg-gradient-to-r from-heritage-gold/20 to-primary/20 text-heritage-maroon border-0"
            >
              {userLevel}
            </Badge>
          </div>
        </Link>

        {/* Credits & Actions */}
        <div className="flex items-center gap-3">
          {/* Heritage Credits */}
          <div className="flex items-center gap-1.5 bg-gradient-to-r from-heritage-gold/20 to-heritage-saffron/20 px-3 py-1.5 rounded-full">
            <span className="text-heritage-gold text-sm">✦</span>
            <span className="text-sm font-semibold text-foreground">{credits.toLocaleString()}</span>
          </div>

          {/* Notifications */}
          <button className="relative p-2 rounded-full hover:bg-muted transition-colors">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
          </button>

          {/* Settings */}
          <Link to="/settings" className="p-2 rounded-full hover:bg-muted transition-colors">
            <Settings className="w-5 h-5 text-muted-foreground" />
          </Link>
        </div>
      </div>
    </header>
  );
}
