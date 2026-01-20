import { Suspense, useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows, Html } from "@react-three/drei";
import { KailasaTemple3D, hotspots } from "./KailasaTemple3D";
import { TempleControls } from "./TempleControls";
import { TempleInfoPanel } from "./TempleInfoPanel";
import { Button } from "@/components/ui/button";
import { ArrowLeft, HelpCircle, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

function LoadingSpinner() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 border-4 border-heritage-gold/30 border-t-heritage-gold rounded-full animate-spin" />
        <p className="text-sm text-muted-foreground">Loading temple...</p>
      </div>
    </Html>
  );
}

interface TempleSceneProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export function TempleScene({ isDarkMode, onToggleTheme }: TempleSceneProps) {
  const navigate = useNavigate();
  const controlsRef = useRef<any>(null);
  
  const [viewMode, setViewMode] = useState<"full" | "sections" | "wireframe">("full");
  const [constructionStep, setConstructionStep] = useState(7);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);
  const [highlightedSection, setHighlightedSection] = useState<string | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true);

  const maxSteps = 7;

  // Auto-play construction animation
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setConstructionStep((prev) => {
        if (prev >= maxSteps) {
          setIsPlaying(false);
          return maxSteps;
        }
        return prev + 1;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePlayPause = () => {
    if (constructionStep >= maxSteps) {
      setConstructionStep(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  const handleHotspotClick = (hotspotId: string) => {
    setSelectedHotspot(hotspotId);
    setHighlightedSection(hotspotId);
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-background to-muted">
      {/* Back button */}
      <Button
        size="icon"
        variant="outline"
        className="absolute top-4 left-4 z-50 rounded-full bg-card/90 backdrop-blur-sm border-border shadow-lg h-10 w-10"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="h-5 w-5" />
      </Button>

      {/* Help button */}
      <Button
        size="icon"
        variant="outline"
        className="absolute top-4 right-16 z-50 rounded-full bg-card/90 backdrop-blur-sm border-border shadow-lg h-10 w-10"
        onClick={() => setShowOnboarding(true)}
      >
        <HelpCircle className="h-5 w-5" />
      </Button>

      {/* Title */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40 text-center pointer-events-none">
        <h1 className="text-lg md:text-xl font-bold text-foreground bg-card/80 backdrop-blur-sm px-4 py-2 rounded-xl border border-border shadow-lg">
          Kailasa Temple, Ellora
        </h1>
      </div>

      {/* 3D Canvas */}
      <Canvas shadows className="w-full h-full">
        <Suspense fallback={<LoadingSpinner />}>
          <PerspectiveCamera makeDefault position={[15, 12, 20]} fov={45} />
          <OrbitControls
            ref={controlsRef}
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={5}
            maxDistance={50}
            maxPolarAngle={Math.PI / 2 - 0.1}
            target={[0, 2, 3]}
          />

          {/* Lighting */}
          <ambientLight intensity={isDarkMode ? 0.3 : 0.5} />
          <directionalLight
            position={[10, 15, 10]}
            intensity={isDarkMode ? 0.8 : 1.2}
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-camera-far={50}
            shadow-camera-left={-20}
            shadow-camera-right={20}
            shadow-camera-top={20}
            shadow-camera-bottom={-20}
          />
          <pointLight position={[-10, 10, -10]} intensity={0.3} color="#ffeedd" />

          {/* Environment */}
          <Environment preset={isDarkMode ? "night" : "sunset"} />
          
          {/* Ground */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 3]} receiveShadow>
            <planeGeometry args={[100, 100]} />
            <meshStandardMaterial color={isDarkMode ? "#1a1612" : "#3d352c"} />
          </mesh>

          {/* Contact shadows for better grounding */}
          <ContactShadows
            position={[0, -0.99, 3]}
            opacity={0.5}
            scale={40}
            blur={2}
            far={10}
          />

          {/* Temple */}
          <KailasaTemple3D
            viewMode={viewMode}
            constructionStep={constructionStep}
            onHotspotClick={handleHotspotClick}
            highlightedSection={highlightedSection}
          />
        </Suspense>
      </Canvas>

      {/* Controls Overlay */}
      <TempleControls
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        constructionStep={constructionStep}
        maxSteps={maxSteps}
        onConstructionStepChange={setConstructionStep}
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        onReset={handleReset}
        isDarkMode={isDarkMode}
        onToggleTheme={onToggleTheme}
        highlightedSection={highlightedSection}
        onSectionChange={setHighlightedSection}
      />

      {/* Info Panel */}
      <TempleInfoPanel
        selectedHotspot={selectedHotspot}
        onClose={() => {
          setSelectedHotspot(null);
          setHighlightedSection(null);
        }}
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={() => setIsAudioPlaying(!isAudioPlaying)}
      />

      {/* Hotspot Legend */}
      <div className="absolute bottom-4 left-4 hidden md:block pointer-events-none">
        <div className="bg-card/90 backdrop-blur-sm rounded-xl p-3 border border-border shadow-lg">
          <h4 className="text-xs font-semibold text-muted-foreground mb-2">
            Click hotspots to learn more
          </h4>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-heritage-gold animate-pulse" />
            <span className="text-xs text-muted-foreground">Interactive point</span>
          </div>
        </div>
      </div>

      {/* Onboarding Modal */}
      {showOnboarding && (
        <div className="absolute inset-0 z-50 bg-background/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl border border-border shadow-2xl max-w-md w-full p-6 animate-scale-in">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-foreground">Explore Kailasa Temple</h2>
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full h-8 w-8"
                onClick={() => setShowOnboarding(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-heritage-gold/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-heritage-gold font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Rotate & Zoom</h4>
                  <p className="text-sm text-muted-foreground">
                    Drag to rotate, scroll/pinch to zoom, right-drag to pan
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-heritage-saffron/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-heritage-saffron font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Tap Hotspots</h4>
                  <p className="text-sm text-muted-foreground">
                    Click glowing orange spheres to learn about temple sections
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-heritage-blue/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-heritage-blue font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Construction Story</h4>
                  <p className="text-sm text-muted-foreground">
                    Use the timeline to see how the temple was carved step-by-step
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold">4</span>
                </div>
                <div>
                  <h4 className="font-medium text-foreground">View Modes</h4>
                  <p className="text-sm text-muted-foreground">
                    Switch between Full, Sections, and Structure views
                  </p>
                </div>
              </div>
            </div>

            <Button
              className="w-full mt-6 rounded-xl heritage-button"
              onClick={() => setShowOnboarding(false)}
            >
              Start Exploring
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
