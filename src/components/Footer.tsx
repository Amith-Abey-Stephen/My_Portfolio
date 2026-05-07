import { Mail, Github, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-8 bg-background relative z-10">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col items-center md:items-start">
          <p className="text-sm font-medium text-foreground">
            Amith Abey Stephen
          </p>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} — Built with intention.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <a href="https://github.com/Amith-Abey-Stephen" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
            <Github className="w-4 h-4" />
            <span className="sr-only">GitHub</span>
          </a>
          <a href="https://linkedin.com/in/Amith-Abey-Stephen" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
            <Linkedin className="w-4 h-4" />
            <span className="sr-only">LinkedIn</span>
          </a>
          <a href="mailto:amithabey13@gmail.com" className="text-muted-foreground hover:text-foreground transition-colors">
            <Mail className="w-4 h-4" />
            <span className="sr-only">Email</span>
          </a>
          <a href="https://resume.amith.site" target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-muted-foreground hover:text-primary transition-colors border-l border-white/10 pl-4 ml-2">
            RESUME
          </a>
        </div>
      </div>
    </footer>
  );
}