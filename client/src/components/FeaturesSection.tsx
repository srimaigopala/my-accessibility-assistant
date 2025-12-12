import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Mic, Image, MessageSquare, Volume2, Settings } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: FileText,
    title: "Text Simplification",
    description: "Transform complex text into easy-to-read content at Grade 3 or Grade 6 reading levels.",
    color: "text-primary",
    bg: "bg-primary/10",
    tag: "Popular",
  },
  {
    icon: Image,
    title: "Image Interpretation",
    description: "Extract text from images using OCR and generate descriptive alt-text for screen readers.",
    color: "text-chart-2",
    bg: "bg-chart-2/10",
    tag: null,
  },
  {
    icon: MessageSquare,
    title: "Smart Summarization",
    description: "Get key points and concise summaries from long documents and articles.",
    color: "text-chart-3",
    bg: "bg-chart-3/10",
    tag: null,
  },
  {
    icon: Mic,
    title: "Voice Input",
    description: "Speak your questions and commands using natural voice interaction.",
    color: "text-chart-4",
    bg: "bg-chart-4/10",
    tag: null,
  },
  {
    icon: Volume2,
    title: "Read Aloud",
    description: "Listen to content with adjustable speech rate and pitch for comfortable listening.",
    color: "text-chart-5",
    bg: "bg-chart-5/10",
    tag: null,
  },
  {
    icon: Settings,
    title: "Personalization",
    description: "Customize font sizes, contrast modes, and dyslexia-friendly options to suit your needs.",
    color: "text-primary",
    bg: "bg-primary/10",
    tag: "New",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function FeaturesSection() {
  return (
    <section 
      className="py-20 md:py-32 bg-muted/30"
      aria-labelledby="features-heading"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Badge variant="secondary" className="mb-4">Features</Badge>
          <h2 
            id="features-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight"
          >
            Powerful Accessibility Features
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Our AI-powered tools help make digital content accessible to everyone, 
            regardless of ability.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card 
                className="h-full hover-elevate transition-all duration-300 group"
                data-testid={`card-feature-${index}`}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-xl ${feature.bg} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                      <feature.icon className={`w-7 h-7 ${feature.color}`} aria-hidden="true" />
                    </div>
                    {feature.tag && (
                      <Badge variant="secondary" className="text-xs">{feature.tag}</Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
