import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Journey", href: "#experience" },
  { name: "Capabilities", href: "#skills" },
  { name: "Ecosystem", href: "#community" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 50],
    ["rgba(11, 15, 25, 0)", "rgba(11, 15, 25, 0.8)"]
  );
  const borderColor = useTransform(
    scrollY,
    [0, 50],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.1)"]
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      style={{ backgroundColor, borderColor }}
      className={`fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md transition-all duration-300 ${
        isScrolled ? "py-4 shadow-lg" : "py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a 
          href="#" 
          className="text-xl font-heading font-bold text-foreground tracking-tight"
          data-testid="link-home"
        >
          AMITH<span className="text-primary">.SITE</span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              data-testid={`link-${link.name.toLowerCase()}`}
            >
              {link.name}
            </a>
          ))}
          <a
            href="https://resume.amith.site"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            data-testid="link-resume"
          >
            Resume
          </a>
          <a
            href="#contact"
            className="text-sm font-medium px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            data-testid="link-contact"
          >
            Let's Talk
          </a>
        </nav>
      </div>
    </motion.header>
  );
}