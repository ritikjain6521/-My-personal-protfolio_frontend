import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCMS, BlogPost } from "@/contexts/CMSContext";
import AdminLayout from "@/components/admin/AdminLayout";
import { Plus, Pencil, Trash2, X, Check, BookOpen, Search, ExternalLink, Calendar, Clock } from "lucide-react";

const emptyPost = (): Omit<BlogPost, "id"> => ({
  title: "", excerpt: "", date: new Date().toISOString().split("T")[0],
  readTime: "5 min read", tags: [], url: "#", image: "",
});

const BlogForm = ({
  initial, onSave, onCancel,
}: { initial: Omit<BlogPost, "id">; onSave: (p: Omit<BlogPost, "id">) => void; onCancel: () => void }) => {
  const [form, setForm] = useState(initial);
  const [tagsInput, setTagsInput] = useState(initial.tags.join(", "));
  const set = (k: keyof typeof form, v: any) => setForm((f) => ({ ...f, [k]: v }));

  const handleSave = () => {
    if (!form.title.trim()) return;
    const tags = tagsInput.split(",").map((t) => t.trim()).filter(Boolean);
    onSave({ ...form, tags });
  };

  return (
    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
      className="bg-white/[0.04] border border-green-500/20 rounded-2xl p-6 mb-6">
      <h3 className="text-white font-semibold mb-5 flex items-center gap-2">
        <BookOpen className="w-4 h-4 text-green-400" />
        {initial.title ? "Edit Blog Post" : "New Blog Post"}
      </h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <label className="text-white/50 text-xs font-medium mb-1.5 block">Post Title *</label>
          <input value={form.title} onChange={(e) => set("title", e.target.value)}
            placeholder="My Awesome Blog Post"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-green-500/50 transition-all" />
        </div>
        <div>
          <label className="text-white/50 text-xs font-medium mb-1.5 block">Excerpt / Summary</label>
          <textarea value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} rows={3}
            placeholder="Brief description of what this post covers..."
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-green-500/50 transition-all resize-none" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="text-white/50 text-xs font-medium mb-1.5 block">Date</label>
            <input type="date" value={form.date} onChange={(e) => set("date", e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-green-500/50 transition-all" />
          </div>
          <div>
            <label className="text-white/50 text-xs font-medium mb-1.5 block">Read Time</label>
            <input value={form.readTime} onChange={(e) => set("readTime", e.target.value)}
              placeholder="5 min read"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-green-500/50 transition-all" />
          </div>
          <div>
            <label className="text-white/50 text-xs font-medium mb-1.5 block">Post URL</label>
            <input value={form.url} onChange={(e) => set("url", e.target.value)}
              placeholder="https://medium.com/..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-green-500/50 transition-all" />
          </div>
          <div>
            <label className="text-white/50 text-xs font-medium mb-1.5 block">Cover Image URL</label>
            <input value={form.image} onChange={(e) => set("image", e.target.value)}
              placeholder="/blog1.png or https://..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-green-500/50 transition-all" />
          </div>
        </div>
        <div>
          <label className="text-white/50 text-xs font-medium mb-1.5 block">Tags (comma-separated)</label>
          <input value={tagsInput} onChange={(e) => setTagsInput(e.target.value)}
            placeholder="React, JavaScript, Web Development"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-green-500/50 transition-all" />
        </div>
      </div>
      <div className="flex gap-3">
        <button onClick={handleSave}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white text-sm font-medium rounded-xl transition-all shadow-lg shadow-green-500/20">
          <Check className="w-4 h-4" /> Save Post
        </button>
        <button onClick={onCancel}
          className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white text-sm font-medium rounded-xl transition-all border border-white/10">
          <X className="w-4 h-4" /> Cancel
        </button>
      </div>
    </motion.div>
  );
};

const BlogManager = () => {
  const { data, updateBlogPosts } = useCMS();
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filtered = data.blogPosts.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase()) ||
    b.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
  );

  const genId = () => Date.now().toString();
  const add = (form: Omit<BlogPost, "id">) => { updateBlogPosts([...data.blogPosts, { ...form, id: genId() }]); setAdding(false); };
  const edit = (id: string, form: Omit<BlogPost, "id">) => { updateBlogPosts(data.blogPosts.map((b) => (b.id === id ? { ...form, id } : b))); setEditingId(null); };
  const del = (id: string) => { if (confirm("Delete this blog post?")) updateBlogPosts(data.blogPosts.filter((b) => b.id !== id)); };

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Blog Posts Manager</h1>
            <p className="text-white/40 text-sm">{data.blogPosts.length} posts total</p>
          </div>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
            onClick={() => { setAdding(true); setEditingId(null); }}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-green-500/25 transition-all">
            <Plus className="w-4 h-4" /> New Post
          </motion.button>
        </div>

        <AnimatePresence>
          {adding && <BlogForm initial={emptyPost()} onSave={add} onCancel={() => setAdding(false)} />}
        </AnimatePresence>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search posts or tags..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-green-500/50 transition-all" />
        </div>

        <div className="space-y-4">
          <AnimatePresence>
            {filtered.map((post, i) => (
              <motion.div key={post.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }} transition={{ delay: i * 0.05 }} layout>
                {editingId === post.id ? (
                  <BlogForm initial={{ title: post.title, excerpt: post.excerpt, date: post.date, readTime: post.readTime, tags: post.tags, url: post.url, image: post.image }}
                    onSave={(f) => edit(post.id, f)} onCancel={() => setEditingId(null)} />
                ) : (
                  <div className="group bg-white/[0.03] border border-white/8 rounded-2xl p-5 hover:border-white/15 transition-all">
                    <div className="flex items-start gap-4">
                      {post.image && (
                        <img src={post.image} alt={post.title}
                          className="w-20 h-14 object-cover rounded-lg border border-white/10 shrink-0 hidden sm:block" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="text-white font-semibold text-sm leading-snug line-clamp-2">{post.title}</h3>
                          <div className="flex gap-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                            {post.url && post.url !== "#" && (
                              <a href={post.url} target="_blank" rel="noopener noreferrer"
                                className="p-1.5 bg-white/5 hover:bg-green-500/20 rounded-lg border border-white/10 hover:border-green-500/30 text-white/40 hover:text-green-400 transition-all">
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            )}
                            <button onClick={() => { setEditingId(post.id); setAdding(false); }}
                              className="flex items-center gap-1 px-3 py-1.5 bg-white/5 hover:bg-green-500/20 border border-white/10 hover:border-green-500/30 text-white/60 hover:text-green-400 text-xs rounded-lg transition-all">
                              <Pencil className="w-3 h-3" /> Edit
                            </button>
                            <button onClick={() => del(post.id)}
                              className="flex items-center gap-1 px-3 py-1.5 bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/30 text-white/60 hover:text-red-400 text-xs rounded-lg transition-all">
                              <Trash2 className="w-3 h-3" /> Delete
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 mt-1.5 mb-2">
                          <span className="flex items-center gap-1 text-white/30 text-xs"><Calendar className="w-3 h-3" />{new Date(post.date).toLocaleDateString()}</span>
                          <span className="flex items-center gap-1 text-white/30 text-xs"><Clock className="w-3 h-3" />{post.readTime}</span>
                        </div>
                        <p className="text-white/40 text-xs line-clamp-1 mb-2">{post.excerpt}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {post.tags.map((t) => (
                            <span key={t} className="px-2 py-0.5 bg-green-500/10 border border-green-500/20 text-green-300 text-xs rounded-full">{t}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-white/30">
            <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p>No blog posts found. Write your first post!</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default BlogManager;
