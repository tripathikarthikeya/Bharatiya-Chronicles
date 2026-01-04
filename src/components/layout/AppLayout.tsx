import { ReactNode } from "react";
import { Header } from "./Header";
import { BottomNavigation } from "./BottomNavigation";

interface AppLayoutProps {
  children: ReactNode;
  showHeader?: boolean;
  showNavigation?: boolean;
}

export function AppLayout({
  children,
  showHeader = true,
  showNavigation = true,
}: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {showHeader && <Header />}
      <main className="flex-1 pb-20 overflow-auto">{children}</main>
      {showNavigation && <BottomNavigation />}
    </div>
  );
}
