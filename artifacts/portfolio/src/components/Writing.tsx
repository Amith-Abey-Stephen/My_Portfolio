import { motion } from "framer-motion";
import { BookOpen, Clock, ArrowUpRight } from "lucide-react";

const articles = [
  {
    title: "Building IoT at Scale",
    excerpt: "Architecting reliable connections between ESP32 arrays, Firebase Realtime Database, and modern React dashboards.",
    category: "Hardware",
    readTime: "5 min read"
  },
  {
    title: "AI-Powered Email Infrastructure",
    excerpt: "Designing multi-tenant queue systems with BullMQ and AI content generation for scalable marketing platforms.",
    category: "Architecture",
    readTime: "8 min read"
  },
  {
    title: "From Idea to Innovation Lab",
    excerpt: "Lessons learned while building and scaling INOVUS LABS IEDC into a premier student innovation ecosystem.",
    category: "Leadership",
    readTime: "6 min read"
  },
  {
    title: "Modern Full-Stack Patterns",
    excerpt: "Production-ready architectures using Next.js, MongoDB, and modern state management techniques.",
    category: "Engineering",
    readTime: "7 min read"
  }
];

export function Writing() {
  return (
    <section id="writing" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">Thoughts & Insights</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-violet-500 to-transparent rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {articles.map((article, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-panel p-8 rounded-2xl group cursor-pointer hover:border-violet-500/30 transition-all hover:-translate-y-1"
            >
              <div className="flex justify-between items-start mb-6">
                <span className="px-3 py-1 text-xs font-mono rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20">
                  {article.category}
                </span>
                <div className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
                  <Clock className="w-3 h-3" />
                  {article.readTime}
                </div>
              </div>
              
              <h3 className="text-2xl font-bold mb-3 group-hover:text-violet-400 transition-colors">
                {article.title}
              </h3>
              
              <p className="text-muted-foreground mb-6 line-clamp-2">
                {article.excerpt}
              </p>
              
              <div className="flex items-center text-sm font-medium text-foreground group-hover:text-violet-400 transition-colors">
                Read Article
                <ArrowUpRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}