import { motion } from "framer-motion";
import { ExternalLink, Database, Cpu, Mail, FileText, Zap, Globe } from "lucide-react";

const projects = [
  {
    id: "syncbatch",
    title: "SyncBatch",
    description: "Bulk contact synchronization platform converting Excel/CSV data into phone-ready contacts with Google Contacts integration.",
    stack: ["Next.js", "Google APIs", "VCF Export"],
    status: "Released",
    icon: Database,
    size: "large"
  },
  {
    id: "inomail",
    title: "InoMail",
    description: "AI-powered bulk email platform featuring robust queue systems, multi-tenant workspaces, analytics, and AI-assisted campaign generation.",
    stack: ["Next.js", "MongoDB", "BullMQ", "AI"],
    status: "WIP",
    icon: Mail,
    size: "normal"
  },
  {
    id: "mrdocgen",
    title: "Mr DocGen",
    description: "AI report generation tool with customizable templates, structured sections, and keyword-based content automation.",
    stack: ["React", "Node.js", "AI", "Automated Workflows"],
    status: "WIP",
    icon: FileText,
    size: "normal"
  },
  {
    id: "airloo",
    title: "AirLoo",
    description: "IoT sanitation monitoring system using ESP32 and Firebase for real-time analytics, usage heatmaps, and automated alerts.",
    stack: ["ESP32", "Firebase", "Real-time Dashboards"],
    status: "WIP",
    icon: Zap,
    size: "normal"
  },
  {
    id: "firealert",
    title: "Smart Fire Alert",
    description: "IoT fire detection system with real-time sensor alerts, smoke/flame detection, and remote dashboard monitoring.",
    stack: ["ESP32", "Sensors", "Emergency Workflows"],
    icon: Cpu,
    size: "normal"
  },
  {
    id: "irrigation",
    title: "Smart Irrigation",
    description: "Automated irrigation system with moisture sensors, NTP scheduling, and cloud-connected Vue.js dashboard.",
    stack: ["ESP32", "Firebase", "Vue.js"],
    icon: Globe,
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
                  <div className="flex justify-between items-center mb-6 gap-2 sm:gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-foreground flex-shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex gap-2 sm:gap-3 items-center">
                      <span className={`inline-flex items-center justify-center px-2.5 py-1 text-[0.65rem] sm:text-xs font-mono rounded-full border tracking-wider uppercase flex-shrink-0 ${
                        project.status === 'WIP'
                          ? 'bg-amber-500/10 border-amber-500/20 text-amber-500'
                          : project.status === 'Released'
                          ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'
                          : 'bg-white/5 border-white/10 text-muted-foreground'
                      }`}>
                        {project.status === 'WIP' ? 'Work In Progress' : project.status === 'Released' ? 'Released' : project.status}
                      </span>
                      <button aria-label={`Open ${project.title} in new tab`} className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-white hover:bg-white/10 transition-colors flex-shrink-0">
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

          {/* WIP / More Projects Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-panel rounded-2xl p-8 border-dashed border-2 border-white/10 flex flex-col items-center justify-center text-center group hover:border-primary/30 transition-all cursor-default"
          >
            <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Zap className="w-8 h-8 text-primary animate-pulse" />
            </div>
            <h3 className="text-xl font-bold mb-2">Something New?</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Several ambitious projects are currently in the workshop. Stay tuned for the next release.
            </p>
            <div className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono uppercase tracking-widest">
              Work In Progress
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}