import { useState, useRef, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Camera, X, Info, Scan, MapPin, Volume2 } from "lucide-react";

interface ARLocation {
  id: string;
  name: string;
  type: string;
  description: string;
  points: number;
}

const sampleARLocations: ARLocation[] = [
  { id: "1", name: "Taj Mahal", type: "Monument", description: "A marble mausoleum built by Shah Jahan", points: 100 },
  { id: "2", name: "Qutub Minar", type: "Tower", description: "73-meter tall victory tower", points: 80 },
  { id: "3", name: "Hampi Ruins", type: "Ancient City", description: "UNESCO World Heritage Site in Karnataka", points: 150 },
];

export default function ARScannerPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [detectedLocation, setDetectedLocation] = useState<ARLocation | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setHasPermission(true);
        setIsScanning(true);
      }
    } catch (err) {
      console.error("Camera access denied:", err);
      setHasPermission(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsScanning(false);
    setDetectedLocation(null);
  };

  const simulateDetection = () => {
    const randomLocation = sampleARLocations[Math.floor(Math.random() * sampleARLocations.length)];
    setDetectedLocation(randomLocation);
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <AppLayout showHeader={!isScanning}>
      {!isScanning ? (
        <div className="px-4 py-6 space-y-6">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-heritage-gold/10">
              <Scan className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">AR Scanner</h1>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
              Point your camera at Indian monuments, artifacts, or heritage sites to discover their stories
            </p>
          </div>

          {/* Features */}
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border/50">
              <div className="w-10 h-10 rounded-full bg-heritage-saffron/20 flex items-center justify-center flex-shrink-0">
                <Camera className="w-5 h-5 text-heritage-saffron" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">Scan Monuments</h3>
                <p className="text-sm text-muted-foreground">
                  Point at temples, forts, or historical sites to learn their history
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border/50">
              <div className="w-10 h-10 rounded-full bg-heritage-blue/20 flex items-center justify-center flex-shrink-0">
                <Info className="w-5 h-5 text-heritage-blue" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">Discover Stories</h3>
                <p className="text-sm text-muted-foreground">
                  Get AI-powered narration about the history and significance
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border/50">
              <div className="w-10 h-10 rounded-full bg-heritage-gold/20 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-heritage-gold" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">Earn Points</h3>
                <p className="text-sm text-muted-foreground">
                  Scan new locations to earn Heritage Credits and climb the leaderboard
                </p>
              </div>
            </div>
          </div>

          {/* Camera Permission Status */}
          {hasPermission === false && (
            <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-center">
              <p className="text-sm text-destructive">
                Camera access was denied. Please enable camera permissions in your browser settings.
              </p>
            </div>
          )}

          {/* Start Button */}
          <Button
            size="lg"
            className="w-full rounded-xl heritage-button py-6"
            onClick={startCamera}
          >
            <Camera className="w-5 h-5 mr-2" />
            Start AR Scanner
          </Button>

          {/* Tips */}
          <div className="p-4 rounded-xl bg-muted/50">
            <h4 className="font-medium text-foreground mb-2">Tips for best results:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Ensure good lighting conditions</li>
              <li>• Point directly at the monument or artifact</li>
              <li>• Hold your device steady while scanning</li>
              <li>• Works with both live monuments and images</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="fixed inset-0 bg-black z-50">
          {/* Camera View */}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />

          {/* Overlay UI */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Scanning Frame */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 border-2 border-heritage-gold rounded-3xl relative">
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-heritage-gold rounded-tl-2xl" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-heritage-gold rounded-tr-2xl" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-heritage-gold rounded-bl-2xl" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-heritage-gold rounded-br-2xl" />
              </div>
            </div>

            {/* Scanning Animation */}
            {!detectedLocation && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-1 bg-heritage-gold/50 animate-pulse" />
              </div>
            )}
          </div>

          {/* Top Controls */}
          <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between pointer-events-auto">
            <button
              onClick={stopCamera}
              className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>
            <Badge className="bg-heritage-gold/90 text-foreground">
              <Scan className="w-3 h-3 mr-1" />
              Scanning...
            </Badge>
          </div>

          {/* Bottom Controls */}
          <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-auto">
            {detectedLocation ? (
              <div className="bg-background/95 backdrop-blur-lg rounded-2xl p-4 space-y-3 animate-fade-in">
                <div className="flex items-start justify-between">
                  <div>
                    <Badge className="mb-2">{detectedLocation.type}</Badge>
                    <h3 className="text-lg font-bold text-foreground">
                      {detectedLocation.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {detectedLocation.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 bg-heritage-gold/20 px-3 py-1 rounded-full">
                    <span className="text-sm font-bold text-heritage-gold">
                      +{detectedLocation.points}
                    </span>
                    <span className="text-xs">✦</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 rounded-xl">
                    <Volume2 className="w-4 h-4 mr-2" />
                    Audio Guide
                  </Button>
                  <Button className="flex-1 rounded-xl heritage-button">
                    Discover
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-white/80 text-sm mb-4">
                  Point at a monument or heritage site
                </p>
                <Button
                  onClick={simulateDetection}
                  className="rounded-xl bg-heritage-gold text-foreground hover:bg-heritage-gold/90"
                >
                  Simulate Detection
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </AppLayout>
  );
}
