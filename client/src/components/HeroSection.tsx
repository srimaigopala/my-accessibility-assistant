import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, FileText, Image, Mic, Zap } from "lucide-react";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export default function HeroSection() {
  return (
    <section 
      className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center py-20 md:py-32 overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" aria-hidden="true" />
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-chart-2/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
      
      <motion.div 
        className="max-w-7xl mx-auto px-6 text-center relative z-10"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.div 
          variants={fadeInUp}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 text-primary mb-8 border border-primary/20"
        >
          <Zap className="w-4 h-4" aria-hidden="true" />
          <span className="text-sm font-semibold tracking-wide">AI-Powered Accessibility Tools</span>
        </motion.div>

        <motion.h1 
          variants={fadeInUp}
          id="hero-heading"
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-8 max-w-5xl mx-auto tracking-tight"
        >
          Making Digital Content{" "}
          <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
            Accessible
          </span>{" "}
          for Everyone
        </motion.h1>

        <motion.p 
          variants={fadeInUp}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Simplify complex text, summarize documents, interpret images, and navigate with voice assistance. 
          Powered by AI, designed with accessibility at its core.
        </motion.p>

        <motion.div 
          variants={fadeInUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <Link href="/workspace">
            <Button size="lg" className="text-lg px-8 py-6 shadow-lg shadow-primary/25" data-testid="button-hero-cta">
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="text-lg px-8 py-6" data-testid="button-learn-more">
            Watch Demo
          </Button>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto"
        >
          {[
            { icon: FileText, label: "Text Simplification", color: "text-primary", bg: "bg-primary/10" },
            { icon: Image, label: "Image Interpretation", color: "text-chart-2", bg: "bg-chart-2/10" },
            { icon: Mic, label: "Voice Assistance", color: "text-chart-3", bg: "bg-chart-3/10" },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              className="flex items-center justify-center gap-3 p-5 rounded-xl bg-card/80 backdrop-blur-sm border border-card-border hover-elevate transition-all duration-300"
            >
              <div className={`w-10 h-10 rounded-lg ${item.bg} flex items-center justify-center`}>
                <item.icon className={`w-5 h-5 ${item.color}`} aria-hidden="true" />
              </div>
              <span className="font-semibold">{item.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
