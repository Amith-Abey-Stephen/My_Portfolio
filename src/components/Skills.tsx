import { motion } from "framer-motion";
import { Layout, Server, Cpu, BrainCircuit, Database, TerminalSquare } from "lucide-react";

const skills = [
  {
    title: "Frontend Development",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    icon: Layout,
    color: "from-blue-500/20 to-transparent",
    iconColor: "text-blue-400"
  },
  {
    title: "Backend & APIs",
    items: ["Node.js", "Express", "REST APIs", "Firebase"],
    icon: Server,
    color: "from-cyan-500/20 to-transparent",
    iconColor: "text-cyan-400"
  },
  {
    title: "IoT & Embedded",
    items: ["ESP32", "Arduino", "Sensors", "MQTT"],
    icon: Cpu,
    color: "from-violet-500/20 to-transparent",
    iconColor: "text-violet-400"
  },
  {
    title: "AI & Automation",
    items: ["AI APIs", "Prompt Engineering", "Workflows", "Agents"],
    icon: BrainCircuit,
    color: "from-fuchsia-500/20 to-transparent",
    iconColor: "text-fuchsia-400"
  },
  {
    title: "Databases & Cloud",
    items: ["MongoDB", "PostgreSQL", "Firebase Cloud", "Hosting"],
    icon: Database,
    color: "from-emerald-500/20 to-transparent",
    iconColor: "text-emerald-400"
  },
  {
    title: "DevOps & Tools",
    items: ["Git", "Docker Basics", "CI/CD", "Linux"],
    icon: TerminalSquare,
    color: "from-orange-500/20 to-transparent",
    iconColor: "text-orange-400"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
} as const;

export function Skills() {
  return (
    <section id="skills" className="py-24 relative">
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
            <span className="text-primary/70 group-hover:text-primary transition-colors">//</span> CAPABILITIES
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">Capabilities</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-transparent rounded-full" />
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skills.map((skill, i) => {
            const Icon = skill.icon;
            
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className="glass-panel p-6 rounded-2xl relative overflow-hidden group"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${skill.color} rounded-bl-full opacity-50 group-hover:scale-110 transition-transform duration-700`} />
                
                <div className="relative z-10">
                  <Icon className={`w-8 h-8 mb-6 ${skill.iconColor}`} />
                  <h3 className="text-xl font-bold mb-4">{skill.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map(item => (
                      <span 
                        key={item}
                        className="px-3 py-1.5 text-sm rounded-md bg-white/5 border border-white/5 text-muted-foreground group-hover:text-foreground transition-colors"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}