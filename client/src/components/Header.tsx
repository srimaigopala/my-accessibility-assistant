import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTheme } from "@/contexts/ThemeContext";
import { Accessibility, Menu, Moon, Sun, X } from "lucide-react";

interface HeaderProps {
  onSettingsClick?: () => void;
}

export default function Header({ onSettingsClick }: HeaderProps) {
  const [location] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/workspace", label: "Workspace" },
  ];

  return (
    <header 
      className="sticky top-0 z-50 w-full backdrop-blur-sm bg-background/90 border-b border-border"
      role="banner"
    >
      <nav 
        className="max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between gap-4"
        aria-label="Main navigation"
      >
        <Link href="/" className="flex items-center gap-2" aria-label="GenAI Accessibility Assistant Home">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-primary-foreground">
            <Accessibility className="w-6 h-6" aria-hidden="true" />
          </div>
          <span className="text-xl font-bold hidden sm:block">AccessAI</span>
        </Link>

        <div className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <Button
                variant={location === link.href ? "secondary" : "ghost"}
                className="text-base font-medium"
                data-testid={`nav-${link.label.toLowerCase()}`}
              >
                {link.label}
              </Button>
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="ghost"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            data-testid="button-theme-toggle"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Moon className="w-5 h-5" aria-hidden="true" />
            )}
          </Button>

          {onSettingsClick && (
            <Button
              size="icon"
              variant="ghost"
              onClick={onSettingsClick}
              aria-label="Open accessibility settings"
              data-testid="button-settings"
              className="hidden md:flex"
            >
              <Accessibility className="w-5 h-5" aria-hidden="true" />
            </Button>
          )}

          <Link href="/workspace" className="hidden md:block">
            <Button data-testid="button-try-assistant">
              Try Assistant
            </Button>
          </Link>

          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button size="icon" variant="ghost" aria-label="Open menu" data-testid="button-mobile-menu">
                <Menu className="w-5 h-5" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-80">
              <div className="flex flex-col gap-6 pt-6">
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold">Menu</span>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
                <nav className="flex flex-col gap-2" aria-label="Mobile navigation">
                  {navLinks.map((link) => (
                    <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)}>
                      <Button
                        variant={location === link.href ? "secondary" : "ghost"}
                        className="w-full justify-start text-lg"
                      >
                        {link.label}
                      </Button>
                    </Link>
                  ))}
                  {onSettingsClick && (
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-lg"
                      onClick={() => {
                        onSettingsClick();
                        setMobileMenuOpen(false);
                      }}
                    >
                      <Accessibility className="w-5 h-5 mr-2" />
                      Accessibility Settings
                    </Button>
                  )}
                </nav>
                <Link href="/workspace" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full" size="lg">
                    Try Assistant
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
