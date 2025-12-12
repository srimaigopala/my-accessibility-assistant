import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

const commitments = [
  "WCAG 2.1 AA compliant design",
  "High contrast color options",
  "Keyboard navigable interface",
  "Screen reader optimized",
  "Dyslexia-friendly font option",
  "Adjustable text sizes",
  "Motion-reduced animations",
  "Voice input support",
];

export default function AccessibilityStatement() {
  return (
    <section 
      className="py-16 md:py-24 bg-primary/5"
      aria-labelledby="accessibility-heading"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1">
            <Badge className="mb-4">Our Commitment</Badge>
            <h2 
              id="accessibility-heading"
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              Accessibility First
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              We believe technology should be accessible to everyone. Our platform is designed 
              from the ground up with accessibility as a core principle, not an afterthought.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4" role="list">
              {commitments.map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" aria-hidden="true" />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex-1 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-chart-2 rounded-3xl opacity-20" aria-hidden="true" />
              <div className="absolute inset-4 bg-card rounded-2xl border border-card-border flex flex-col items-center justify-center p-6">
                <div className="text-6xl font-bold text-primary mb-2">AA</div>
                <div className="text-lg font-semibold text-center">WCAG 2.1</div>
                <div className="text-sm text-muted-foreground text-center mt-1">Conformance Level</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
