import { useState } from "react";
import { TempleScene } from "@/components/ar/TempleScene";

export default function ARScannerPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <TempleScene 
      isDarkMode={isDarkMode} 
      onToggleTheme={() => setIsDarkMode(!isDarkMode)} 
    />
  );
}
