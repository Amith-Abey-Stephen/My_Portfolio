import { motion } from "framer-motion";
import { Users, Calendar, Trophy, Presentation } from "lucide-react";

const stats = [
  { value: "50+", label: "Events Organized", icon: Calendar },
  { value: "500+", label: "Students Mentored", icon: Users },
  { value: "20+", label: "Hackathons Hosted", icon: Trophy },
  { value: "30+", label: "Workshops Led", icon: Presentation }
];

const achievements = [
  "Hacktoberfest Active Contributor & Mentor",
  "Organized International Technical Symposia",
  "Led comprehensive Full-Stack bootcamps",
  "Established institutional hardware/IoT labs"
];

export function Community() {
  return (
    <section id="community" className="py-24 relative overflow-hidden">
      {/* Background ambient glow specific to this section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:text-center"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">Building the Ecosystem</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-accent to-transparent rounded-full md:mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl md:mx-auto">
            Empowering the next generation of builders through active community leadership, 
            knowledge sharing, and immersive technical events.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-16">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-panel p-6 rounded-2xl flex flex-col items-center justify-center text-center group hover:border-primary/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {achievements.map((achievement, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-panel p-6 rounded-2xl flex items-center gap-4"
            >
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
              <p className="text-foreground font-medium">{achievement}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}