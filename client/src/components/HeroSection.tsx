import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, FileText, Image, Mic } from "lucide-react";

export default function HeroSection() {
  return (
    <section 
      className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center py-16 md:py-24"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-chart-2/5 pointer-events-none" aria-hidden="true" />
      
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-8">
          <Sparkles className="w-4 h-4" aria-hidden="true" />
          <span className="text-sm font-medium">AI-Powered Accessibility</span>
        </div>

        <h1 
          id="hero-heading"
          className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6 max-w-4xl mx-auto"
        >
          Making Digital Content{" "}
          <span className="text-primary">Accessible</span> for Everyone
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          Simplify text, summarize documents, interpret images, and navigate with voice assistance. 
          Powered by AI, designed for accessibility.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link href="/workspace">
            <Button size="lg" className="text-lg px-8 py-6" data-testid="button-hero-cta">
              Try the Assistant
              <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="text-lg px-8 py-6" data-testid="button-learn-more">
            Learn More
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3 p-4 rounded-lg bg-card border border-card-border">
            <FileText className="w-6 h-6 text-primary flex-shrink-0" aria-hidden="true" />
            <span className="font-medium">Text Simplification</span>
          </div>
          <div className="flex items-center justify-center gap-3 p-4 rounded-lg bg-card border border-card-border">
            <Image className="w-6 h-6 text-chart-2 flex-shrink-0" aria-hidden="true" />
            <span className="font-medium">Image Interpretation</span>
          </div>
          <div className="flex items-center justify-center gap-3 p-4 rounded-lg bg-card border border-card-border">
            <Mic className="w-6 h-6 text-chart-3 flex-shrink-0" aria-hidden="true" />
            <span className="font-medium">Voice Assistance</span>
          </div>
        </div>
      </div>
    </section>
  );
}
