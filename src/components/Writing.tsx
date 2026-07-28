import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, ArrowUpRight, Loader2, ArrowRight } from "lucide-react";

interface GhostPost {
  title: string;
  excerpt: string;
  published_at: string;
  url: string;
  feature_image: string | null;
}

export function Writing() {
  const [posts, setPosts] = useState<GhostPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const key = import.meta.env.VITE_GHOST_API_KEY;
        if (!key) {
          console.error("Ghost API key is missing. Please add VITE_GHOST_API_KEY to your .env file.");
          setLoading(false);
          return;
        }

        const url = `https://blog.inovuslabs.org/ghost/api/content/posts/?key=${key}&filter=authors:amith&fields=title,excerpt,published_at,url,feature_image&limit=4`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch posts");
        const data = await res.json();
        setPosts(data.posts || []);
      } catch (err) {
        console.error("Error fetching Ghost posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <section id="writing" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <motion.div 
              whileHover={{ x: 10 }}
              className="text-primary font-mono text-sm mb-4 uppercase tracking-widest flex items-center gap-2 cursor-default group"
            >
              <span className="text-primary/70 group-hover:text-primary transition-colors">//</span> WRITING
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">Thoughts & Insights.</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-violet-500 to-transparent rounded-full" />
          </div>

          <motion.a
            href="https://blog.inovuslabs.org"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ x: 5 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all text-sm font-medium group"
          >
            View Full Blog
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-violet-500/50" />
          </div>
        ) : posts.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {posts.map((post, i) => (
              <motion.a
                key={i}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-panel p-8 rounded-2xl group cursor-pointer hover:border-violet-500/30 transition-all hover:-translate-y-1 block"
              >
                <div className="flex justify-between items-start mb-6">
                  <span className="px-3 py-1 text-xs font-mono rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20">
                    Article
                  </span>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
                    <Clock className="w-3 h-3" />
                    {formatDate(post.published_at)}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold mb-3 group-hover:text-violet-400 transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-muted-foreground mb-6 line-clamp-2">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center text-sm font-medium text-foreground group-hover:text-violet-400 transition-colors">
                  Read Article
                  <ArrowUpRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all" />
                </div>
              </motion.a>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-10">
            <p>No articles found or please add the VITE_GHOST_API_KEY to your .env</p>
          </div>
        )}
      </div>
    </section>
  );
}