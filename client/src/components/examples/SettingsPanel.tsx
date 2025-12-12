import { useState } from "react";
import SettingsPanel from "../SettingsPanel";
import { AccessibilityProvider } from "@/contexts/AccessibilityContext";
import { Button } from "@/components/ui/button";

export default function SettingsPanelExample() {
  const [open, setOpen] = useState(true);

  return (
    <AccessibilityProvider>
      <div className="p-4">
        <Button onClick={() => setOpen(true)}>Open Settings</Button>
        <SettingsPanel open={open} onOpenChange={setOpen} />
      </div>
    </AccessibilityProvider>
  );
}
