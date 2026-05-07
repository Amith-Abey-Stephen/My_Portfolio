import { motion } from "framer-motion";
import { Mail, Send, Linkedin, Github } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-32 relative flex items-center justify-center">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-primary/20 via-accent/10 to-violet-500/20 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto glass-panel p-10 md:p-16 rounded-3xl text-center border-white/20 shadow-2xl relative overflow-hidden"
        >
          {/* Shine effect */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-50" />

          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="text-primary font-mono text-sm mb-6 uppercase tracking-widest flex items-center justify-center gap-2 cursor-default group"
          >
            <span className="text-primary/70 group-hover:text-primary transition-colors">//</span> CONTACT
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6 flex flex-col gap-2">
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-white to-white/60">
              Let's Build Something
            </span>
            <span className="text-5xl md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-violet-500 pb-2">
              Extraordinary.
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-xl mx-auto">
            Currently exploring new opportunities and open for collaborations on innovative projects.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            <a
              href="mailto:hi@amithabey.dev"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all hover:scale-105 shadow-[0_0_20px_rgba(59,130,246,0.3)]"
              data-testid="link-email-contact"
            >
              <Send className="w-5 h-5" />
              Say Hello
            </a>
            
            <div className="flex gap-4">
              <a
                href="https://github.com/amithabey"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 rounded-full glass-panel flex items-center justify-center text-foreground hover:bg-white/10 hover:text-primary transition-all hover:scale-110"
                aria-label="GitHub Profile"
                data-testid="link-github"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://linkedin.com/in/amithabeystephen"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 rounded-full glass-panel flex items-center justify-center text-foreground hover:bg-white/10 hover:text-[#0A66C2] transition-all hover:scale-110"
                aria-label="LinkedIn Profile"
                data-testid="link-linkedin"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="mailto:hi@amithabey.dev"
                className="w-14 h-14 rounded-full glass-panel flex items-center justify-center text-foreground hover:bg-white/10 hover:text-emerald-500 transition-all hover:scale-110"
                aria-label="Email"
                data-testid="link-email-icon"
              >
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}