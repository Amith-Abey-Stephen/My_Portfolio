import { useEffect, useRef, useState } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { Users, Calendar, Trophy, Globe } from "lucide-react";

function Counter({ value }: { value: string }) {
  const numericValue = parseInt(value.replace(/\D/g, ""));
  const suffix = value.replace(/\d/g, "");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  const spring = useSpring(0, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  const displayValue = useTransform(spring, (current) => Math.round(current));

  useEffect(() => {
    if (isInView) {
      spring.set(numericValue);
    }
  }, [isInView, numericValue, spring]);

  return (
    <span ref={ref}>
      <motion.span>{displayValue}</motion.span>
      {suffix}
    </span>
  );
}

const stats = [
  { value: "3+", label: "YEARS OF HACKTOBERFEST", icon: Calendar },
  { value: "6+", label: "COUNTRIES REACHED", icon: Globe },
  { value: "30+", label: "STUDENTS MENTORED", icon: Users },
  { value: "10+", label: "HACKATHONS ORGANIZED", icon: Trophy }
];

export function Community() {
  return (
    <section id="community" className="py-24 relative overflow-hidden">
      {/* Background ambient glow specific to this section */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              whileHover={{ x: 10 }}
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="text-primary font-mono text-sm mb-6 uppercase tracking-widest flex items-center gap-2 cursor-default group"
            >
              <span className="text-primary/70 group-hover:text-primary transition-colors">//</span> COMMUNITY LEADERSHIP
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-heading font-bold mb-6 leading-[1.1] tracking-tight">
              Empowering the next<br/>generation of builders.
            </h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-xl">
              As the CEO of INOVUS LABS IEDC, I led initiatives that transformed how
              students learn and build technology. Beyond writing code, true impact comes
              from creating environments where innovation thrives and sharing knowledge
              across borders.
            </p>
            
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm text-sm font-mono text-muted-foreground">
              <div className="w-2.5 h-2.5 rounded-full bg-primary" />
              Active in open source & community building
            </div>
          </motion.div>

          {/* Right Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="glass-panel p-8 rounded-2xl flex flex-col items-center justify-center text-center group border border-border/40 hover:border-primary/30 transition-all duration-300 bg-card/20 relative overflow-hidden"
                >
                  {/* Card Glow Effect */}
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon className="w-8 h-8 text-primary mb-6 relative z-10 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                  </motion.div>

                  <div className="text-4xl lg:text-5xl font-heading font-bold text-foreground mb-3 tracking-tight relative z-10">
                    <Counter value={stat.value} />
                  </div>
                  <div className="text-xs font-mono text-muted-foreground uppercase tracking-[0.2em] relative z-10">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}