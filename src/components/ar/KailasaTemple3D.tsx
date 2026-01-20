import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface KailasaTemple3DProps {
  viewMode: "full" | "sections" | "wireframe";
  constructionStep: number;
  onHotspotClick: (hotspot: string) => void;
  highlightedSection: string | null;
}

// Hotspot positions for different temple elements
const hotspots = [
  { id: "vimana", position: [0, 4.5, 0] as [number, number, number], label: "Main Shrine (Vimana)" },
  { id: "mandapa", position: [0, 1.5, 3] as [number, number, number], label: "Mandapa (Hall)" },
  { id: "nandi", position: [0, 0.8, 6] as [number, number, number], label: "Nandi Pavilion" },
  { id: "gopuram", position: [0, 2.5, 9] as [number, number, number], label: "Gateway (Gopuram)" },
  { id: "elephants", position: [4, 0.5, 0] as [number, number, number], label: "Elephant Sculptures" },
  { id: "courtyard", position: [-4, 0.3, 3] as [number, number, number], label: "Courtyard" },
];

function Hotspot({ 
  position, 
  onClick, 
  isHighlighted 
}: { 
  position: [number, number, number]; 
  onClick: () => void; 
  isHighlighted: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[0.3, 16, 16]} />
      <meshStandardMaterial
        color={isHighlighted ? "#f59e0b" : hovered ? "#fbbf24" : "#d97706"}
        emissive={isHighlighted || hovered ? "#f59e0b" : "#000000"}
        emissiveIntensity={isHighlighted ? 0.5 : hovered ? 0.3 : 0}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}

// Base platform of the temple
function BasePlatform({ visible, wireframe }: { visible: boolean; wireframe: boolean }) {
  if (!visible) return null;
  return (
    <mesh position={[0, -0.5, 3]} receiveShadow>
      <boxGeometry args={[14, 1, 16]} />
      <meshStandardMaterial color="#8b7355" wireframe={wireframe} />
    </mesh>
  );
}

// Courtyard walls
function CourtyardWalls({ visible, wireframe }: { visible: boolean; wireframe: boolean }) {
  if (!visible) return null;
  return (
    <group>
      {/* Left wall */}
      <mesh position={[-6.5, 1.5, 3]} castShadow>
        <boxGeometry args={[1, 4, 16]} />
        <meshStandardMaterial color="#a0846c" wireframe={wireframe} />
      </mesh>
      {/* Right wall */}
      <mesh position={[6.5, 1.5, 3]} castShadow>
        <boxGeometry args={[1, 4, 16]} />
        <meshStandardMaterial color="#a0846c" wireframe={wireframe} />
      </mesh>
      {/* Back wall */}
      <mesh position={[0, 1.5, -4.5]} castShadow>
        <boxGeometry args={[14, 4, 1]} />
        <meshStandardMaterial color="#a0846c" wireframe={wireframe} />
      </mesh>
    </group>
  );
}

// Main shrine (Vimana)
function MainShrine({ visible, wireframe }: { visible: boolean; wireframe: boolean }) {
  if (!visible) return null;
  return (
    <group position={[0, 0, 0]}>
      {/* Base of shrine */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[4, 1, 4]} />
        <meshStandardMaterial color="#c9a86c" wireframe={wireframe} />
      </mesh>
      {/* Middle section */}
      <mesh position={[0, 1.5, 0]} castShadow>
        <boxGeometry args={[3.5, 2, 3.5]} />
        <meshStandardMaterial color="#d4b483" wireframe={wireframe} />
      </mesh>
      {/* Upper section */}
      <mesh position={[0, 3, 0]} castShadow>
        <boxGeometry args={[3, 1, 3]} />
        <meshStandardMaterial color="#dfc08f" wireframe={wireframe} />
      </mesh>
      {/* Tower tiers */}
      {[0, 0.6, 1.2, 1.8].map((y, i) => (
        <mesh key={i} position={[0, 3.8 + y, 0]} castShadow>
          <boxGeometry args={[2.5 - i * 0.4, 0.5, 2.5 - i * 0.4]} />
          <meshStandardMaterial color="#e8cc9c" wireframe={wireframe} />
        </mesh>
      ))}
      {/* Dome/Finial */}
      <mesh position={[0, 6.5, 0]} castShadow>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial color="#f5d99a" wireframe={wireframe} />
      </mesh>
    </group>
  );
}

// Mandapa (Assembly Hall)
function Mandapa({ visible, wireframe }: { visible: boolean; wireframe: boolean }) {
  if (!visible) return null;
  return (
    <group position={[0, 0, 3]}>
      {/* Platform */}
      <mesh position={[0, 0.25, 0]} castShadow>
        <boxGeometry args={[5, 0.5, 4]} />
        <meshStandardMaterial color="#c9a86c" wireframe={wireframe} />
      </mesh>
      {/* Pillars */}
      {[
        [-1.8, 1.5, -1.5], [1.8, 1.5, -1.5],
        [-1.8, 1.5, 1.5], [1.8, 1.5, 1.5],
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} castShadow>
          <cylinderGeometry args={[0.2, 0.25, 2.5, 8]} />
          <meshStandardMaterial color="#d4b483" wireframe={wireframe} />
        </mesh>
      ))}
      {/* Roof */}
      <mesh position={[0, 3, 0]} castShadow>
        <boxGeometry args={[5.5, 0.5, 4.5]} />
        <meshStandardMaterial color="#dfc08f" wireframe={wireframe} />
      </mesh>
      {/* Decorative roof */}
      <mesh position={[0, 3.5, 0]} castShadow>
        <boxGeometry args={[4, 0.4, 3.5]} />
        <meshStandardMaterial color="#e8cc9c" wireframe={wireframe} />
      </mesh>
    </group>
  );
}

// Nandi Pavilion
function NandiPavilion({ visible, wireframe }: { visible: boolean; wireframe: boolean }) {
  if (!visible) return null;
  return (
    <group position={[0, 0, 6]}>
      {/* Platform */}
      <mesh position={[0, 0.15, 0]} castShadow>
        <boxGeometry args={[3, 0.3, 3]} />
        <meshStandardMaterial color="#c9a86c" wireframe={wireframe} />
      </mesh>
      {/* Four corner pillars */}
      {[
        [-1, 0.9, -1], [1, 0.9, -1],
        [-1, 0.9, 1], [1, 0.9, 1],
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} castShadow>
          <cylinderGeometry args={[0.15, 0.18, 1.5, 8]} />
          <meshStandardMaterial color="#d4b483" wireframe={wireframe} />
        </mesh>
      ))}
      {/* Roof */}
      <mesh position={[0, 1.8, 0]} castShadow>
        <boxGeometry args={[3.2, 0.3, 3.2]} />
        <meshStandardMaterial color="#dfc08f" wireframe={wireframe} />
      </mesh>
      {/* Nandi (Bull) simplified */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <boxGeometry args={[0.8, 0.6, 1.2]} />
        <meshStandardMaterial color="#4a4a4a" wireframe={wireframe} />
      </mesh>
    </group>
  );
}

// Gateway (Gopuram)
function Gateway({ visible, wireframe }: { visible: boolean; wireframe: boolean }) {
  if (!visible) return null;
  return (
    <group position={[0, 0, 9]}>
      {/* Left pillar */}
      <mesh position={[-1.5, 1.5, 0]} castShadow>
        <boxGeometry args={[1, 3, 1]} />
        <meshStandardMaterial color="#a0846c" wireframe={wireframe} />
      </mesh>
      {/* Right pillar */}
      <mesh position={[1.5, 1.5, 0]} castShadow>
        <boxGeometry args={[1, 3, 1]} />
        <meshStandardMaterial color="#a0846c" wireframe={wireframe} />
      </mesh>
      {/* Top beam */}
      <mesh position={[0, 3.25, 0]} castShadow>
        <boxGeometry args={[4, 0.5, 1.2]} />
        <meshStandardMaterial color="#c9a86c" wireframe={wireframe} />
      </mesh>
      {/* Decorative top */}
      <mesh position={[0, 4, 0]} castShadow>
        <boxGeometry args={[3, 1, 0.8]} />
        <meshStandardMaterial color="#d4b483" wireframe={wireframe} />
      </mesh>
    </group>
  );
}

// Elephant sculptures
function ElephantSculptures({ visible, wireframe }: { visible: boolean; wireframe: boolean }) {
  if (!visible) return null;
  return (
    <group>
      {/* Multiple elephant bases along the sides */}
      {[-5, -3, 3, 5].map((x, i) => (
        <group key={i}>
          {/* Left side elephants */}
          <mesh position={[x, 0.4, -2]} castShadow>
            <boxGeometry args={[0.8, 0.8, 1.2]} />
            <meshStandardMaterial color="#6b5b4f" wireframe={wireframe} />
          </mesh>
          {/* Right side if applicable */}
          {i < 2 && (
            <mesh position={[x, 0.4, 8]} castShadow>
              <boxGeometry args={[0.8, 0.8, 1.2]} />
              <meshStandardMaterial color="#6b5b4f" wireframe={wireframe} />
            </mesh>
          )}
        </group>
      ))}
    </group>
  );
}

// Rock cliff surrounding
function RockCliffs({ visible, wireframe }: { visible: boolean; wireframe: boolean }) {
  if (!visible) return null;
  return (
    <group>
      {/* Background cliff */}
      <mesh position={[0, 2, -7]} receiveShadow>
        <boxGeometry args={[20, 8, 2]} />
        <meshStandardMaterial color="#5c4a3d" wireframe={wireframe} />
      </mesh>
      {/* Left cliff */}
      <mesh position={[-9, 2, 3]} receiveShadow>
        <boxGeometry args={[2, 8, 20]} />
        <meshStandardMaterial color="#5c4a3d" wireframe={wireframe} />
      </mesh>
      {/* Right cliff */}
      <mesh position={[9, 2, 3]} receiveShadow>
        <boxGeometry args={[2, 8, 20]} />
        <meshStandardMaterial color="#5c4a3d" wireframe={wireframe} />
      </mesh>
    </group>
  );
}

export function KailasaTemple3D({ 
  viewMode, 
  constructionStep, 
  onHotspotClick,
  highlightedSection 
}: KailasaTemple3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const wireframe = viewMode === "wireframe";
  
  // Construction steps visibility
  const showBase = constructionStep >= 1;
  const showCliffs = constructionStep >= 1;
  const showWalls = constructionStep >= 2;
  const showShrine = constructionStep >= 3;
  const showMandapa = constructionStep >= 4;
  const showNandi = constructionStep >= 5;
  const showGateway = constructionStep >= 6;
  const showElephants = constructionStep >= 7;
  const showHotspots = viewMode !== "wireframe" && constructionStep >= 7;

  // Section view logic
  const sectionFilter = (section: string) => {
    if (viewMode !== "sections") return true;
    if (!highlightedSection) return true;
    return section === highlightedSection;
  };

  return (
    <group ref={groupRef}>
      {/* Temple components */}
      {sectionFilter("base") && <BasePlatform visible={showBase} wireframe={wireframe} />}
      {sectionFilter("cliffs") && <RockCliffs visible={showCliffs} wireframe={wireframe} />}
      {sectionFilter("walls") && <CourtyardWalls visible={showWalls} wireframe={wireframe} />}
      {sectionFilter("vimana") && <MainShrine visible={showShrine} wireframe={wireframe} />}
      {sectionFilter("mandapa") && <Mandapa visible={showMandapa} wireframe={wireframe} />}
      {sectionFilter("nandi") && <NandiPavilion visible={showNandi} wireframe={wireframe} />}
      {sectionFilter("gopuram") && <Gateway visible={showGateway} wireframe={wireframe} />}
      {sectionFilter("elephants") && <ElephantSculptures visible={showElephants} wireframe={wireframe} />}

      {/* Interactive hotspots */}
      {showHotspots && hotspots.map((hotspot) => (
        <Hotspot
          key={hotspot.id}
          position={hotspot.position}
          onClick={() => onHotspotClick(hotspot.id)}
          isHighlighted={highlightedSection === hotspot.id}
        />
      ))}
    </group>
  );
}

export { hotspots };
