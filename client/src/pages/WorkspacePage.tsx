import { useState } from "react";
import Header from "@/components/Header";
import Workspace from "@/components/Workspace";
import SettingsPanel from "@/components/SettingsPanel";

export default function WorkspacePage() {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-background">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg"
      >
        Skip to main content
      </a>
      
      <Header onSettingsClick={() => setSettingsOpen(true)} />
      
      <main 
        id="main-content" 
        className="flex-1 overflow-auto bg-muted/30"
      >
        <Workspace />
      </main>
      
      <SettingsPanel open={settingsOpen} onOpenChange={setSettingsOpen} />
    </div>
  );
}
