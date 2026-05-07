import { motion } from "framer-motion";
import { ExternalLink, Database, Cpu, Mail, FileText, Zap } from "lucide-react";

const projects = [
  {
    id: "inomail",
    title: "InoMail",
    description: "AI-powered bulk email platform featuring robust queue systems, AI-generated campaign content, advanced analytics, and multi-tenant workspaces.",
    stack: ["Next.js", "MongoDB", "BullMQ", "AI APIs"],
    status: "Featured",
    icon: Mail,
    size: "large"
  },
  {
    id: "mrdocgen",
    title: "Mr DocGen",
    description: "Intelligent report generation tool utilizing structured templates, AI-assisted documentation, and automated enterprise workflows.",
    stack: ["React", "Node.js", "AI", "PostgreSQL"],
    status: "Active",
    icon: FileText,
    size: "normal"
  },
  {
    id: "syncbatch",
    title: "SyncBatch",
    description: "Bulk contact synchronization platform bridging Excel/CSV to Google Contacts and VCF with intelligent duplicate handling.",
    stack: ["Next.js", "Google APIs", "MongoDB"],
    status: "Active",
    icon: Database,
    size: "normal"
  },
  {
    id: "airloo",
    title: "AirLoo",
    description: "IoT sanitation monitoring system with live dashboards, heatmaps, and hardware integration.",
    stack: ["ESP32", "Firebase", "React", "Hardware"],
    status: "IoT",
    icon: Zap,
    size: "normal"
  },
  {
    id: "firealert",
    title: "Smart Fire Alert",
    description: "Real-time IoT fire detection platform bridging smoke/flame sensors to remote control dashboards.",
    stack: ["ESP32", "Sensors", "MQTT", "Node.js"],
    status: "IoT",
    icon: Cpu,
    size: "normal"
  }
];

export function Projects() {
  return (
    <section id="projects" className="py-24 relative">
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
            <span className="text-primary/70 group-hover:text-primary transition-colors">//</span> PROJECTS
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">Featured Projects</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-accent to-transparent rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(250px,auto)]">
          {projects.map((project, i) => {
            const isLarge = project.size === "large";
            const Icon = project.icon;
            
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`group glass-panel rounded-2xl p-8 relative overflow-hidden flex flex-col justify-between hover:border-primary/50 transition-colors ${
                  isLarge ? "md:col-span-2 lg:col-span-2 row-span-2" : ""
                }`}
                data-testid={`project-${project.id}`}
              >
                {/* Top Border Gradient */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-violet-500 opacity-50 group-hover:opacity-100 transition-opacity" />
                
                {/* Background Glow on Hover */}
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-foreground">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex gap-3">
                      <span className="px-3 py-1 text-xs font-mono rounded-full bg-white/5 border border-white/10 text-muted-foreground uppercase tracking-wider">
                        {project.status}
                      </span>
                      <button className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-white hover:bg-white/10 transition-colors">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <h3 className={`${isLarge ? "text-3xl" : "text-xl"} font-bold mb-4 group-hover:text-primary transition-colors`}>
                    {project.title}
                  </h3>
                  
                  <p className={`text-muted-foreground mb-8 ${isLarge ? "text-lg max-w-xl" : "text-sm"}`}>
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 relative z-10 mt-auto">
                  {project.stack.map(tech => (
                    <span 
                      key={tech}
                      className="px-3 py-1 text-xs font-medium rounded-md bg-white/5 border border-white/10 text-foreground/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}