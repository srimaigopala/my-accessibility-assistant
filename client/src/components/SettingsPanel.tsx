import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useAccessibility } from "@/contexts/AccessibilityContext";
import { RotateCcw, Eye, Volume2, BookOpen, Accessibility, Pause } from "lucide-react";

interface SettingsPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SettingsPanel({ open, onOpenChange }: SettingsPanelProps) {
  const { settings, updateSettings, resetSettings, announce } = useAccessibility();

  const handleSettingChange = (settingName: string, value: boolean | number | string) => {
    if (typeof value === "boolean") {
      announce(`${settingName} ${value ? "enabled" : "disabled"}`);
    } else {
      announce(`${settingName} set to ${value}`);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:w-[400px] overflow-y-auto" side="right">
        <SheetHeader className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Accessibility className="w-5 h-5 text-primary" />
            </div>
            <div>
              <SheetTitle className="text-xl">Accessibility Settings</SheetTitle>
              <SheetDescription className="text-sm">Customize your experience</SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="space-y-8">
          <div className="space-y-5 p-4 bg-muted/30 rounded-xl">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-primary" />
              <h3 className="font-semibold">Visual Preferences</h3>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <Label htmlFor="fontSize" className="text-sm">
                    Font Size
                  </Label>
                  <Badge variant="secondary" className="text-xs">{settings.fontSize}px</Badge>
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

              <div className="flex items-center justify-between gap-4 p-3 bg-background rounded-lg">
                <Label htmlFor="highContrast" className="text-sm cursor-pointer">
                  High Contrast Mode
                </Label>
                <Switch
                  id="highContrast"
                  checked={settings.highContrast}
                  onCheckedChange={(checked) => {
                    updateSettings({ highContrast: checked });
                    handleSettingChange("High contrast mode", checked);
                  }}
                  aria-label="Toggle high contrast mode"
                  data-testid="switch-high-contrast"
                />
              </div>

              <div className="flex items-center justify-between gap-4 p-3 bg-background rounded-lg">
                <Label htmlFor="dyslexiaFont" className="text-sm cursor-pointer">
                  Dyslexia-Friendly Font
                </Label>
                <Switch
                  id="dyslexiaFont"
                  checked={settings.dyslexiaFont}
                  onCheckedChange={(checked) => {
                    updateSettings({ dyslexiaFont: checked });
                    handleSettingChange("Dyslexia-friendly font", checked);
                  }}
                  aria-label="Toggle dyslexia-friendly font"
                  data-testid="switch-dyslexia-font"
                />
              </div>

              <div className="flex items-center justify-between gap-4 p-3 bg-background rounded-lg">
                <Label htmlFor="reducedMotion" className="text-sm cursor-pointer">
                  Reduce Motion
                </Label>
                <Switch
                  id="reducedMotion"
                  checked={settings.reducedMotion}
                  onCheckedChange={(checked) => {
                    updateSettings({ reducedMotion: checked });
                    handleSettingChange("Reduced motion", checked);
                  }}
                  aria-label="Toggle reduced motion"
                  data-testid="switch-reduced-motion"
                />
              </div>
            </div>
          </div>

          <div className="space-y-5 p-4 bg-muted/30 rounded-xl">
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-chart-3" />
              <h3 className="font-semibold">Audio Preferences</h3>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <Label htmlFor="voiceSpeed" className="text-sm">
                    Voice Speed
                  </Label>
                  <Badge variant="secondary" className="text-xs">{settings.voiceSpeed.toFixed(1)}x</Badge>
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
                  <Label htmlFor="voicePitch" className="text-sm">
                    Voice Pitch
                  </Label>
                  <Badge variant="secondary" className="text-xs">{settings.voicePitch.toFixed(1)}</Badge>
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
          </div>

          <div className="space-y-5 p-4 bg-muted/30 rounded-xl">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-chart-4" />
              <h3 className="font-semibold">Reading Preferences</h3>
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="readingLevel" className="text-sm">
                Preferred Reading Level
              </Label>
              <Select
                value={settings.readingLevel}
                onValueChange={(value: "grade3" | "grade6" | "adult") => 
                  updateSettings({ readingLevel: value })
                }
              >
                <SelectTrigger id="readingLevel" data-testid="select-reading-level" className="bg-background">
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
