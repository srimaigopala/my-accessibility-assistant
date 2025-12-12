import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, Cpu, CheckCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    number: 1,
    icon: Upload,
    title: "Upload Your Content",
    description: "Paste text, upload a PDF or image, or use voice input to provide your content.",
    gradient: "from-primary/20 to-primary/5",
  },
  {
    number: 2,
    icon: Cpu,
    title: "AI Processing",
    description: "Our AI automatically detects the content type and applies the appropriate accessibility tools.",
    gradient: "from-chart-2/20 to-chart-2/5",
  },
  {
    number: 3,
    icon: CheckCircle,
    title: "Get Accessible Results",
    description: "Receive simplified text, summaries, image descriptions, or answers to your questions.",
    gradient: "from-chart-3/20 to-chart-3/5",
  },
];

export default function HowItWorksSection() {
  return (
    <section 
      className="py-20 md:py-32 relative overflow-hidden"
      aria-labelledby="how-it-works-heading"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-transparent pointer-events-none" aria-hidden="true" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Badge variant="secondary" className="mb-4">Simple Process</Badge>
          <h2 
            id="how-it-works-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight"
          >
            How It Works
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Three simple steps to make any content more accessible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4">
          {steps.map((step, index) => (
            <motion.div 
              key={step.number}
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              {index < steps.length - 1 && (
                <div className="hidden md:flex absolute top-1/2 -right-2 z-10 transform -translate-y-1/2">
                  <div className="w-4 h-4 rounded-full bg-muted flex items-center justify-center">
                    <ArrowRight className="w-3 h-3 text-muted-foreground" />
                  </div>
                </div>
              )}
              
              <Card 
                className="h-full border-0 shadow-none bg-gradient-to-b from-card to-transparent"
                data-testid={`card-step-${step.number}`}
              >
                <CardContent className="pt-8 pb-8 text-center">
                  <div className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center mb-6 mx-auto`}>
                    <step.icon className="w-9 h-9 text-foreground" aria-hidden="true" />
                    <div 
                      className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shadow-lg"
                      aria-hidden="true"
                    >
                      {step.number}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
