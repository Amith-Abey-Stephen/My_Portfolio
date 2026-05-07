import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, Code2, Cpu, Sparkles, FileText } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center pt-20 pb-20 overflow-hidden" id="hero">
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-start z-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">System Online</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-foreground leading-[1.1] tracking-tighter mb-6">
            AMITH ABEY
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-violet-400">
              STEPHEN
            </span>
          </h1>
          
          <h2 className="text-xl md:text-2xl font-medium text-foreground/80 mb-4">
            Full-Stack & IoT Developer • AI-Powered Tools • Community Leader
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-xl mb-10 leading-relaxed">
            Specializing in scalable SaaS platforms, AI-powered tools, and cloud-connected IoT solutions. Former CEO of Inovus Labs IEDC with a passion for blending software, hardware, and community technology.
          </p>
          
          <div className="flex flex-wrap items-center gap-4">
            <a 
              href="#projects" 
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all hover:gap-3 group"
              data-testid="link-view-projects"
            >
              View Projects
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a 
              href="#experience" 
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-foreground font-medium hover:bg-white/10 transition-all group"
              data-testid="link-explore-journey"
            >
              Explore Journey
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a 
              href="https://resume.amith.site" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-accent/10 border border-accent/20 text-accent font-medium hover:bg-accent hover:text-accent-foreground transition-all group"
              data-testid="link-resume-hero"
            >
              Resume
              <FileText className="w-4 h-4 transition-transform group-hover:scale-110" />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative lg:h-[600px] flex items-center justify-center hidden lg:flex"
        >
          {/* Decorative floating elements */}
          <motion.div 
            animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 right-10 glass-panel p-4 rounded-2xl flex items-center gap-4 w-64"
          >
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold">API Services</div>
              <div className="text-xs text-muted-foreground font-mono">Status: 200 OK</div>
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [15, -15, 15], rotate: [0, -3, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-20 left-0 glass-panel p-4 rounded-2xl flex items-center gap-4 w-56"
          >
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold">IoT Sensors</div>
              <div className="text-xs text-muted-foreground font-mono">Syncing...</div>
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-white/10 bg-gradient-to-b from-primary/10 to-transparent blur-sm flex items-center justify-center"
          >
            <div className="w-32 h-32 rounded-full bg-primary/20 blur-xl animate-pulse" />
            <Sparkles className="w-12 h-12 text-primary absolute" />
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}