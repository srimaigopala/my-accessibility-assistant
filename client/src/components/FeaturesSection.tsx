import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Mic, Image, MessageSquare, Volume2, Settings } from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Text Simplification",
    description: "Transform complex text into easy-to-read content at Grade 3 or Grade 6 reading levels.",
    color: "text-primary",
  },
  {
    icon: Image,
    title: "Image Interpretation",
    description: "Extract text from images using OCR and generate descriptive alt-text for screen readers.",
    color: "text-chart-2",
  },
  {
    icon: MessageSquare,
    title: "Smart Summarization",
    description: "Get key points and concise summaries from long documents and articles.",
    color: "text-chart-3",
  },
  {
    icon: Mic,
    title: "Voice Input",
    description: "Speak your questions and commands using natural voice interaction.",
    color: "text-chart-4",
  },
  {
    icon: Volume2,
    title: "Read Aloud",
    description: "Listen to content with adjustable speech rate and pitch for comfortable listening.",
    color: "text-chart-5",
  },
  {
    icon: Settings,
    title: "Personalization",
    description: "Customize font sizes, contrast modes, and dyslexia-friendly options to suit your needs.",
    color: "text-primary",
  },
];

export default function FeaturesSection() {
  return (
    <section 
      className="py-16 md:py-24 bg-muted/30"
      aria-labelledby="features-heading"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 
            id="features-heading"
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Powerful Accessibility Features
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our AI-powered tools help make digital content accessible to everyone, 
            regardless of ability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="hover-elevate transition-shadow duration-300"
              data-testid={`card-feature-${index}`}
            >
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-2 ${feature.color}`}>
                  <feature.icon className="w-6 h-6" aria-hidden="true" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
