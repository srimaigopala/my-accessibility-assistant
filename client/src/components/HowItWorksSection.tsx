import { Card, CardContent } from "@/components/ui/card";
import { Upload, Cpu, CheckCircle } from "lucide-react";

const steps = [
  {
    number: 1,
    icon: Upload,
    title: "Upload Your Content",
    description: "Paste text, upload a PDF or image, or use voice input to provide your content.",
  },
  {
    number: 2,
    icon: Cpu,
    title: "AI Processing",
    description: "Our AI automatically detects the content type and applies the appropriate accessibility tools.",
  },
  {
    number: 3,
    icon: CheckCircle,
    title: "Get Accessible Results",
    description: "Receive simplified text, summaries, image descriptions, or answers to your questions.",
  },
];

export default function HowItWorksSection() {
  return (
    <section 
      className="py-16 md:py-24"
      aria-labelledby="how-it-works-heading"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 
            id="how-it-works-heading"
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to make any content more accessible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <Card 
              key={step.number} 
              className="relative overflow-visible"
              data-testid={`card-step-${step.number}`}
            >
              <div 
                className="absolute -top-4 left-6 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg"
                aria-hidden="true"
              >
                {step.number}
              </div>
              <CardContent className="pt-10 pb-8">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-6 mx-auto">
                  <step.icon className="w-8 h-8 text-primary" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-center leading-relaxed">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
