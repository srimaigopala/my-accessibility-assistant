import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

interface AccessibilitySettings {
  fontSize: number;
  highContrast: boolean;
  dyslexiaFont: boolean;
  reducedMotion: boolean;
  voiceSpeed: number;
  voicePitch: number;
  readingLevel: "grade3" | "grade6" | "adult";
}

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  updateSettings: (updates: Partial<AccessibilitySettings>) => void;
  resetSettings: () => void;
  announce: (message: string, priority?: "polite" | "assertive") => void;
}

const defaultSettings: AccessibilitySettings = {
  fontSize: 16,
  highContrast: false,
  dyslexiaFont: false,
  reducedMotion: false,
  voiceSpeed: 1,
  voicePitch: 1,
  readingLevel: "adult",
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("accessibility-settings");
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (saved) {
        try {
          return { ...defaultSettings, reducedMotion: prefersReducedMotion, ...JSON.parse(saved) };
        } catch {
          return { ...defaultSettings, reducedMotion: prefersReducedMotion };
        }
      }
      return { ...defaultSettings, reducedMotion: prefersReducedMotion };
    }
    return defaultSettings;
  });

  const [announcement, setAnnouncement] = useState<{ message: string; priority: "polite" | "assertive" } | null>(null);

  useEffect(() => {
    localStorage.setItem("accessibility-settings", JSON.stringify(settings));
    const root = document.documentElement;
    
    root.style.fontSize = `${settings.fontSize}px`;
    
    if (settings.highContrast) {
      root.classList.add("high-contrast");
    } else {
      root.classList.remove("high-contrast");
    }
    
    if (settings.dyslexiaFont) {
      root.classList.add("dyslexia-font");
    } else {
      root.classList.remove("dyslexia-font");
    }

    if (settings.reducedMotion) {
      root.classList.add("reduce-motion");
    } else {
      root.classList.remove("reduce-motion");
    }
  }, [settings]);

  const updateSettings = (updates: Partial<AccessibilitySettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  const announce = useCallback((message: string, priority: "polite" | "assertive" = "polite") => {
    setAnnouncement({ message, priority });
    setTimeout(() => setAnnouncement(null), 1000);
  }, []);

  return (
    <AccessibilityContext.Provider value={{ settings, updateSettings, resetSettings, announce }}>
      {children}
      {announcement && (
        <div
          role="status"
          aria-live={announcement.priority}
          aria-atomic="true"
          className="sr-only"
        >
          {announcement.message}
        </div>
      )}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error("useAccessibility must be used within an AccessibilityProvider");
  }
  return context;
}
