import { Link } from "wouter";
import { Sparkles, Mail, Github, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-card/50 border-t border-card-border" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-6 group">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-chart-2 text-primary-foreground shadow-lg shadow-primary/20">
                <Sparkles className="w-5 h-5" aria-hidden="true" />
              </div>
              <span className="text-xl font-bold tracking-tight">AccessAI</span>
            </Link>
            <p className="text-muted-foreground max-w-md mb-8 leading-relaxed text-base">
              Making digital content accessible for everyone through AI-powered 
              text simplification, summarization, and image interpretation.
            </p>
            <div className="flex gap-2">
              <Button size="icon" variant="secondary" aria-label="Email us" data-testid="button-email">
                <Mail className="w-5 h-5" />
              </Button>
              <Button size="icon" variant="secondary" aria-label="Visit our GitHub" data-testid="button-github">
                <Github className="w-5 h-5" />
              </Button>
              <Button size="icon" variant="secondary" aria-label="Follow us on Twitter" data-testid="button-twitter">
                <Twitter className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-3" role="list">
              <li>
                <Link href="/workspace" className="text-muted-foreground hover:text-foreground transition-colors">
                  Workspace
                </Link>
              </li>
              <li>
                <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
                  How It Works
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-3" role="list">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Accessibility Statement
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-card-border mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} GenAI Accessibility Assistant. All rights reserved.</p>
          <p className="text-muted-foreground/70">Built with accessibility in mind</p>
        </div>
      </div>
    </footer>
  );
}
