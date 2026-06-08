import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Share2, Tag } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useCMS, BlogPost as BlogPostType } from "@/contexts/CMSContext";

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data } = useCMS();
  const [post, setPost] = useState<BlogPostType | null>(null);
  
  useEffect(() => {
    if (id && data.blogPosts) {
      const found = data.blogPosts.find(p => p.id === id);
      if (found) {
        setPost(found);
      }
    }
  }, [id, data.blogPosts]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-white/50">Loading article...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background relative overflow-x-hidden pt-24 pb-20">
      {/* Dynamic Background */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-violet-900/20 to-transparent pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Navigation */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Articles
        </button>

        {/* Header */}
        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-4 text-sm text-white/50 mb-6">
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {post.date}</span>
            <span>•</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {post.readTime}</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">{post.title}</h1>
          
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags?.map(tag => (
              <span key={tag} className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70">
                <Tag className="w-3 h-3" /> {tag}
              </span>
            ))}
          </div>

          <div className="w-full h-64 md:h-96 rounded-3xl overflow-hidden relative border border-white/10">
            <img 
              src={post.image || "https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=1000&auto=format&fit=crop"} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </header>

        {/* Content */}
        <motion.article 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="prose prose-invert prose-lg max-w-none prose-headings:text-violet-100 prose-a:text-violet-400 hover:prose-a:text-violet-300 prose-img:rounded-2xl"
        >
          <ReactMarkdown>
            {post.content || post.excerpt || "No content available."}
          </ReactMarkdown>
        </motion.article>

        {/* Footer actions */}
        <div className="mt-16 pt-8 border-t border-white/10 flex justify-between items-center">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-white/50 hover:text-white transition-colors text-sm"
          >
            Back to Top
          </button>
          
          <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-colors text-sm">
            <Share2 className="w-4 h-4" /> Share Article
          </button>
        </div>
      </div>
    </main>
  );
};

export default BlogPost;
