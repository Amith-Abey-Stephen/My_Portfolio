import { motion } from "framer-motion";
import { Users, Code, Lightbulb, GraduationCap } from "lucide-react";

const aboutCards = [
  {
    title: "Community CEO",
    description: "Former CEO of Inovus Labs IEDC. Led innovation initiatives, organized international tech events, and scaled student ecosystems.",
    icon: Users,
    color: "text-blue-500",
    bg: "bg-blue-500/10"
  },
  {
    title: "Full-Stack Dev",
    description: "Building scalable SaaS and AI-powered platforms. Expert in React, Next.js, and modern backend architectures.",
    icon: Code,
    color: "text-cyan-500",
    bg: "bg-cyan-500/10"
  },
  {
    title: "IoT Innovator",
    description: "Architecting cloud-connected hardware solutions. Specializing in ESP32, real-time monitoring, and automation systems.",
    icon: Lightbulb,
    color: "text-violet-500",
    bg: "bg-violet-500/10"
  },
  {
    title: "Tech Mentor",
    description: "Dedicated to community growth. Mentored 30+ students in web dev bootcamps and led Google AI workshops.",
    icon: GraduationCap,
    color: "text-primary",
    bg: "bg-primary/10"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
} as const;

export function About() {
  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <motion.div 
            whileHover={{ x: 10 }}
            className="text-primary font-mono text-sm mb-4 uppercase tracking-widest flex items-center gap-2 cursor-default group"
          >
            <span className="text-primary/70 group-hover:text-primary transition-colors">//</span> ABOUT
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">About</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-transparent rounded-full" />
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {aboutCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -5 }}
                className="glass-panel p-8 rounded-2xl relative group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className={`w-12 h-12 rounded-xl ${card.bg} ${card.color} flex items-center justify-center mb-6`}>
                  <Icon className="w-6 h-6" />
                </div>
                
                <h3 className="text-xl font-bold mb-3">{card.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {card.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}