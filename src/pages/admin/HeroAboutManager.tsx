import { useState } from "react";
import { motion } from "framer-motion";
import { useCMS } from "@/contexts/CMSContext";
import AdminLayout from "@/components/admin/AdminLayout";
import { User, Check, Save, RefreshCw, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

const HeroAboutManager = () => {
  const { data, updateHero, updateAbout, resetToDefaults } = useCMS();
  const [hero, setHero] = useState({ ...data.hero });
  const [about, setAbout] = useState({ ...data.about, stats: [...data.about.stats] });
  const [saved, setSaved] = useState(false);

  const setHeroField = (k: keyof typeof hero, v: string) => setHero((h) => ({ ...h, [k]: v }));
  const setAboutField = (k: "title" | "description1" | "description2", v: string) => setAbout((a) => ({ ...a, [k]: v }));
  const setStatField = (i: number, k: "label" | "value", v: string) =>
    setAbout((a) => ({ ...a, stats: a.stats.map((s, idx) => (idx === i ? { ...s, [k]: v } : s)) }));
  const addStat = () => setAbout((a) => ({ ...a, stats: [...a.stats, { label: "New Stat", value: "0+" }] }));
  const removeStat = (i: number) => setAbout((a) => ({ ...a, stats: a.stats.filter((_, idx) => idx !== i) }));

  const handleSave = () => {
    updateHero(hero);
    updateAbout(about);
    setSaved(true);
    toast.success("Content saved successfully!");
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    if (confirm("Reset all CMS data to defaults? This cannot be undone.")) {
      resetToDefaults();
      toast.success("Reset to defaults!");
    }
  };

  const inputCls = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-violet-500/50 transition-all";
  const labelCls = "text-white/50 text-xs font-medium mb-1.5 block";

  return (
    <AdminLayout>
      <div className="p-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Hero & About Manager</h1>
            <p className="text-white/40 text-sm">Edit your hero section and about page content</p>
          </div>
          <div className="flex gap-3">
            <motion.button
              onClick={handleReset}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/30 text-white/50 hover:text-red-400 text-sm rounded-xl transition-all"
            >
              <RefreshCw className="w-4 h-4" /> Reset All
            </motion.button>
            <motion.button
              onClick={handleSave}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className={`flex items-center gap-2 px-5 py-2.5 text-white text-sm font-semibold rounded-xl shadow-lg transition-all ${
                saved
                  ? "bg-gradient-to-r from-green-600 to-emerald-600 shadow-green-500/25"
                  : "bg-gradient-to-r from-violet-600 to-indigo-600 shadow-violet-500/25 hover:from-violet-500 hover:to-indigo-500"
              }`}
            >
              {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              {saved ? "Saved!" : "Save Changes"}
            </motion.button>
          </div>
        </div>

        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/[0.03] border border-white/8 rounded-2xl p-6 mb-6"
        >
          <h2 className="text-white font-semibold mb-5 flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
              <User className="w-3.5 h-3.5 text-white" />
            </div>
            Hero Section
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Your Name</label>
              <input value={hero.name} onChange={(e) => setHeroField("name", e.target.value)}
                placeholder="Ritik Jain" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Tagline / Role</label>
              <input value={hero.tagline} onChange={(e) => setHeroField("tagline", e.target.value)}
                placeholder="Full Stack Developer & Problem Solver" className={inputCls} />
            </div>
            <div className="sm:col-span-2">
              <label className={labelCls}>Bio / Short Description</label>
              <textarea value={hero.bio} onChange={(e) => setHeroField("bio", e.target.value)} rows={3}
                placeholder="I build scalable, performant web applications..."
                className={`${inputCls} resize-none`} />
            </div>
            <div>
              <label className={labelCls}>GitHub Profile URL</label>
              <input value={hero.githubUrl} onChange={(e) => setHeroField("githubUrl", e.target.value)}
                placeholder="https://github.com/username" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>LinkedIn Profile URL</label>
              <input value={hero.linkedinUrl} onChange={(e) => setHeroField("linkedinUrl", e.target.value)}
                placeholder="https://linkedin.com/in/username" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Resume / CV URL</label>
              <input value={hero.resumeUrl} onChange={(e) => setHeroField("resumeUrl", e.target.value)}
                placeholder="https://drive.google.com/..." className={inputCls} />
            </div>
          </div>
        </motion.section>

        {/* About Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/[0.03] border border-white/8 rounded-2xl p-6 mb-6"
        >
          <h2 className="text-white font-semibold mb-5 flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
              <User className="w-3.5 h-3.5 text-white" />
            </div>
            About Section
          </h2>
          <div className="space-y-4">
            <div>
              <label className={labelCls}>Section Title / Role Heading</label>
              <input value={about.title} onChange={(e) => setAboutField("title", e.target.value)}
                placeholder="Full Stack Developer & Problem Solver" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>First Paragraph</label>
              <textarea value={about.description1} onChange={(e) => setAboutField("description1", e.target.value)} rows={4}
                placeholder="I'm a full-stack developer with 1+ years of experience..."
                className={`${inputCls} resize-none`} />
            </div>
            <div>
              <label className={labelCls}>Second Paragraph</label>
              <textarea value={about.description2} onChange={(e) => setAboutField("description2", e.target.value)} rows={4}
                placeholder="Passionate about solving real-world problems..."
                className={`${inputCls} resize-none`} />
            </div>
          </div>
        </motion.section>

        {/* Stats */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/[0.03] border border-white/8 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-white font-semibold flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                <span className="text-white text-xs font-bold">#</span>
              </div>
              About Stats
            </h2>
            <button onClick={addStat}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-green-500/10 border border-white/10 hover:border-green-500/30 text-white/60 hover:text-green-400 text-xs rounded-lg transition-all">
              <Plus className="w-3 h-3" /> Add Stat
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {about.stats.map((stat, i) => (
              <motion.div key={i} layout
                className="flex items-center gap-3 bg-white/5 border border-white/8 rounded-xl p-3">
                <div className="flex-1 grid grid-cols-2 gap-2">
                  <input value={stat.value} onChange={(e) => setStatField(i, "value", e.target.value)}
                    placeholder="10+"
                    className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-white text-sm text-center font-bold focus:outline-none focus:border-violet-500/50 transition-all" />
                  <input value={stat.label} onChange={(e) => setStatField(i, "label", e.target.value)}
                    placeholder="Projects Done"
                    className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-white/70 text-xs focus:outline-none focus:border-violet-500/50 transition-all" />
                </div>
                <button onClick={() => removeStat(i)}
                  className="p-1.5 text-white/30 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            ))}
          </div>

          {/* Preview */}
          <div className="mt-6 pt-5 border-t border-white/5">
            <p className="text-white/30 text-xs mb-3 uppercase tracking-wider">Stats Preview</p>
            <div className="flex flex-wrap gap-3">
              {about.stats.map((s, i) => (
                <div key={i} className="bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2 text-center min-w-[100px]">
                  <div className="text-violet-400 font-bold text-lg">{s.value}</div>
                  <div className="text-white/40 text-xs">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Save button bottom */}
        <div className="flex justify-end mt-6">
          <motion.button onClick={handleSave} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            className={`flex items-center gap-2 px-6 py-3 text-white text-sm font-semibold rounded-xl shadow-lg transition-all ${
              saved ? "bg-gradient-to-r from-green-600 to-emerald-600" : "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500"
            }`}>
            {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {saved ? "All Saved!" : "Save All Changes"}
          </motion.button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default HeroAboutManager;
