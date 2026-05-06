import { motion } from "framer-motion";

const timeline = [
  {
    role: "CEO",
    organization: "INOVUS LABS IEDC",
    description: "Led a student innovation lab, scaling community engagement, organizing hackathons, and fostering an ecosystem of builders.",
    year: "Recent"
  },
  {
    role: "Leader & Contributor",
    organization: "µLearn Foundation",
    description: "Spearheaded learning initiatives, mentored peers, and organized technical workshops for the community.",
    year: "Past"
  },
  {
    role: "Product & Tech",
    organization: "Foodo.AI",
    description: "Contributed to product development and technical architecture for an AI-driven startup initiative.",
    year: "Past"
  },
  {
    role: "Campus Ambassador",
    organization: "Google",
    description: "Evangelized Google technologies, organized campus events, and bridged the gap between students and industry tools.",
    year: "Past"
  },
  {
    role: "Developer",
    organization: "Zidio Development",
    description: "Engineered robust software solutions and collaborated on cross-functional development tasks.",
    year: "Past"
  },
  {
    role: "Innovator",
    organization: "The Nexus Project",
    description: "Contributed to foundational innovation initiatives shaping technical ecosystems.",
    year: "Past"
  }
];

export function Experience() {
  return (
    <section id="experience" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:text-center"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">Journey Through Innovation</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-violet-500 to-transparent rounded-full md:mx-auto" />
        </motion.div>

        <div className="max-w-3xl mx-auto relative">
          {/* Vertical Line */}
          <div className="absolute top-0 bottom-0 left-[20px] md:left-1/2 md:-ml-[1px] w-[2px] bg-white/10" />

          {timeline.map((item, index) => {
            const isEven = index % 2 === 0;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isEven ? -50 : 50, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={`relative flex items-center justify-between mb-12 md:mb-24 ${
                  isEven ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-[20px] md:left-1/2 w-4 h-4 rounded-full bg-background border-2 border-primary -translate-x-[7px] md:-translate-x-1/2 z-10 shadow-[0_0_15px_rgba(59,130,246,0.6)]" />

                {/* Desktop Empty Space for alternating layout */}
                <div className="hidden md:block w-[45%]" />

                {/* Content Card */}
                <div className="w-full md:w-[45%] pl-12 md:pl-0">
                  <div className={`glass-panel p-6 rounded-2xl relative group hover:border-primary/30 transition-colors ${
                    isEven ? "md:text-right" : "md:text-left"
                  }`}>
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
                    
                    <span className="text-xs font-mono text-primary mb-2 block">{item.year}</span>
                    <h3 className="text-xl font-bold text-foreground mb-1">{item.role}</h3>
                    <h4 className="text-sm font-medium text-accent mb-4">{item.organization}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}