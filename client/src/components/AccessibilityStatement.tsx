import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Shield } from "lucide-react";
import { motion } from "framer-motion";

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
      className="py-20 md:py-32 bg-gradient-to-br from-primary/5 via-primary/3 to-chart-2/5 relative overflow-hidden"
      aria-labelledby="accessibility-heading"
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            className="flex-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Badge variant="secondary" className="mb-4">
              <Shield className="w-3 h-3 mr-1" />
              Our Commitment
            </Badge>
            <h2 
              id="accessibility-heading"
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight"
            >
              Accessibility First
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10">
              We believe technology should be accessible to everyone. Our platform is designed 
              from the ground up with accessibility as a core principle, not an afterthought.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4" role="list">
              {commitments.map((item, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-center gap-3 p-3 rounded-lg bg-background/50 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" aria-hidden="true" />
                  <span className="text-foreground font-medium">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            className="flex-1 flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-chart-2 to-chart-3 rounded-3xl opacity-20 blur-xl" aria-hidden="true" />
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-chart-2 rounded-3xl opacity-10" aria-hidden="true" />
              <div className="absolute inset-4 bg-card rounded-2xl border border-card-border flex flex-col items-center justify-center p-8 shadow-2xl">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <div className="text-7xl font-bold bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent mb-2">AA</div>
                <div className="text-xl font-semibold text-center">WCAG 2.1</div>
                <div className="text-sm text-muted-foreground text-center mt-1">Conformance Level</div>
                <div className="mt-6 flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <div className="w-3 h-3 rounded-full bg-chart-2" />
                  <div className="w-3 h-3 rounded-full bg-chart-3" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
