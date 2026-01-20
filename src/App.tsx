import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import ExplorePage from "./pages/ExplorePage";
import MarketplacePage from "./pages/MarketplacePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import LocationDetailPage from "./pages/LocationDetailPage";
import CategoryPage from "./pages/CategoryPage";
import QuestDetailPage from "./pages/QuestDetailPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import ARScannerPage from "./pages/ARScannerPage";
import AudiobookPage from "./pages/AudiobookPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import SilkRouteGamePage from "./pages/SilkRouteGamePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Main Navigation */}
          <Route path="/" element={<ExplorePage />} />
          <Route path="/ar-scanner" element={<ARScannerPage />} />
          <Route path="/audiobook" element={<AudiobookPage />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />

          {/* Detail Pages */}
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/location/:id" element={<LocationDetailPage />} />
          <Route path="/category/:name" element={<CategoryPage />} />
          <Route path="/quest/:id" element={<QuestDetailPage />} />
          
          {/* Game Pages */}
          <Route path="/game/silk-route" element={<SilkRouteGamePage />} />

          {/* User Pages */}
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />

          {/* Placeholder routes for menu items */}
          <Route path="/discoveries" element={<ProfilePage />} />
          <Route path="/quests" element={<ExplorePage />} />
          <Route path="/purchases" element={<MarketplacePage />} />
          <Route path="/favorites" element={<MarketplacePage />} />
          <Route path="/reviews" element={<ProfilePage />} />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
