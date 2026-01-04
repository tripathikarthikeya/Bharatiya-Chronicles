import { Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, Bell, Moon, Globe, Lock, HelpCircle, 
  Info, MessageCircle, ChevronRight 
} from "lucide-react";

export default function SettingsPage() {
  return (
    <AppLayout showHeader={false}>
      <div className="pb-6">
        {/* Header */}
        <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border/50 px-4 py-4">
          <div className="flex items-center gap-3">
            <Link
              to="/profile"
              className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-lg font-bold text-foreground">Settings</h1>
          </div>
        </div>

        <div className="px-4 py-6 space-y-6">
          {/* Notifications */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Notifications
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 rounded-xl bg-card border border-border/50">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-muted-foreground" />
                  <span className="text-foreground">Push Notifications</span>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-card border border-border/50">
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 text-muted-foreground" />
                  <span className="text-foreground">Quest Updates</span>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>

          {/* Appearance */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Appearance
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 rounded-xl bg-card border border-border/50">
                <div className="flex items-center gap-3">
                  <Moon className="w-5 h-5 text-muted-foreground" />
                  <span className="text-foreground">Dark Mode</span>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-card border border-border/50">
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-muted-foreground" />
                  <span className="text-foreground">Language</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">English</span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>
            </div>
          </div>

          {/* Privacy */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Privacy & Security
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 rounded-xl bg-card border border-border/50">
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-muted-foreground" />
                  <span className="text-foreground">Change Password</span>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Support
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 rounded-xl bg-card border border-border/50">
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-muted-foreground" />
                  <span className="text-foreground">Help Center</span>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-card border border-border/50">
                <div className="flex items-center gap-3">
                  <Info className="w-5 h-5 text-muted-foreground" />
                  <span className="text-foreground">About</span>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
          </div>

          {/* App Version */}
          <div className="text-center pt-6">
            <p className="text-sm text-muted-foreground">Bharatiya Chronicles</p>
            <p className="text-xs text-muted-foreground">Version 1.0.0</p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
