import { motion } from "framer-motion";
import { Users, Code, Lightbulb, GraduationCap } from "lucide-react";

const aboutCards = [
  {
    title: "Leadership",
    description: "Former CEO of INOVUS LABS IEDC. Scaled a student innovation lab, fostered tech ecosystems, and organized large-scale hackathons.",
    icon: Users,
    color: "text-blue-500",
    bg: "bg-blue-500/10"
  },
  {
    title: "Development",
    description: "Full-stack engineer crafting high-performance web applications using Next.js, Node.js, MongoDB, and modern cloud infrastructure.",
    icon: Code,
    color: "text-cyan-500",
    bg: "bg-cyan-500/10"
  },
  {
    title: "Innovation",
    description: "Bridging the gap between software and hardware. Building AI-powered systems and IoT solutions using ESP32 and real-time data.",
    icon: Lightbulb,
    color: "text-violet-500",
    bg: "bg-violet-500/10"
  },
  {
    title: "Mentorship",
    description: "Dedicated to technical education. Mentoring students, conducting workshops, and sharing knowledge as a Google Campus Ambassador.",
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
};

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