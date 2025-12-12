import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAccessibility } from "@/contexts/AccessibilityContext";
import { RotateCcw } from "lucide-react";

interface SettingsPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SettingsPanel({ open, onOpenChange }: SettingsPanelProps) {
  const { settings, updateSettings, resetSettings } = useAccessibility();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:w-96 overflow-y-auto" side="right">
        <SheetHeader className="mb-8">
          <SheetTitle className="text-2xl">Accessibility Settings</SheetTitle>
        </SheetHeader>

        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Visual Preferences</h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-4">
                <Label htmlFor="fontSize" className="text-base">
                  Font Size: {settings.fontSize}px
                </Label>
              </div>
              <Slider
                id="fontSize"
                min={12}
                max={24}
                step={1}
                value={[settings.fontSize]}
                onValueChange={([value]) => updateSettings({ fontSize: value })}
                className="h-2"
                aria-label="Adjust font size"
                data-testid="slider-font-size"
              />
            </div>

            <div className="flex items-center justify-between gap-4">
              <Label htmlFor="highContrast" className="text-base cursor-pointer">
                High Contrast Mode
              </Label>
              <Switch
                id="highContrast"
                checked={settings.highContrast}
                onCheckedChange={(checked) => updateSettings({ highContrast: checked })}
                aria-label="Toggle high contrast mode"
                data-testid="switch-high-contrast"
              />
            </div>

            <div className="flex items-center justify-between gap-4">
              <Label htmlFor="dyslexiaFont" className="text-base cursor-pointer">
                Dyslexia-Friendly Font
              </Label>
              <Switch
                id="dyslexiaFont"
                checked={settings.dyslexiaFont}
                onCheckedChange={(checked) => updateSettings({ dyslexiaFont: checked })}
                aria-label="Toggle dyslexia-friendly font"
                data-testid="switch-dyslexia-font"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Audio Preferences</h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-4">
                <Label htmlFor="voiceSpeed" className="text-base">
                  Voice Speed: {settings.voiceSpeed.toFixed(1)}x
                </Label>
              </div>
              <Slider
                id="voiceSpeed"
                min={0.5}
                max={2}
                step={0.1}
                value={[settings.voiceSpeed]}
                onValueChange={([value]) => updateSettings({ voiceSpeed: value })}
                className="h-2"
                aria-label="Adjust voice speed"
                data-testid="slider-voice-speed"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between gap-4">
                <Label htmlFor="voicePitch" className="text-base">
                  Voice Pitch: {settings.voicePitch.toFixed(1)}
                </Label>
              </div>
              <Slider
                id="voicePitch"
                min={0.5}
                max={2}
                step={0.1}
                value={[settings.voicePitch]}
                onValueChange={([value]) => updateSettings({ voicePitch: value })}
                className="h-2"
                aria-label="Adjust voice pitch"
                data-testid="slider-voice-pitch"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Reading Preferences</h3>
            
            <div className="space-y-3">
              <Label htmlFor="readingLevel" className="text-base">
                Preferred Reading Level
              </Label>
              <Select
                value={settings.readingLevel}
                onValueChange={(value: "grade3" | "grade6" | "adult") => 
                  updateSettings({ readingLevel: value })
                }
              >
                <SelectTrigger id="readingLevel" data-testid="select-reading-level">
                  <SelectValue placeholder="Select reading level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="grade3">Grade 3 (Simple)</SelectItem>
                  <SelectItem value="grade6">Grade 6 (Moderate)</SelectItem>
                  <SelectItem value="adult">Adult (Standard)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={resetSettings}
            data-testid="button-reset-settings"
          >
            <RotateCcw className="w-4 h-4 mr-2" aria-hidden="true" />
            Reset to Defaults
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
