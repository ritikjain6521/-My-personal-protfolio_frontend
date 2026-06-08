import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCMS, Skill } from "@/contexts/CMSContext";
import AdminLayout from "@/components/admin/AdminLayout";
import { Plus, Pencil, Trash2, X, Check, Wrench, Search } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

const CATEGORIES = ["Languages", "Frontend", "Backend", "Database", "DevOps", "Design", "Tools", "Authentication"];
const COLORS = [
  { label: "Yellow", value: "from-yellow-400 to-yellow-600" },
  { label: "Blue", value: "from-blue-400 to-blue-600" },
  { label: "Green", value: "from-green-400 to-green-600" },
  { label: "Red", value: "from-red-400 to-red-600" },
  { label: "Purple", value: "from-purple-400 to-purple-600" },
  { label: "Cyan", value: "from-cyan-400 to-cyan-600" },
  { label: "Orange", value: "from-orange-400 to-orange-600" },
  { label: "Pink", value: "from-pink-400 to-pink-600" },
  { label: "Teal", value: "from-teal-400 to-teal-600" },
  { label: "Indigo", value: "from-indigo-400 to-indigo-600" },
  { label: "Slate", value: "from-slate-300 to-slate-500" },
  { label: "Amber", value: "from-amber-400 to-amber-600" },
];

const emptySkill = (): Omit<Skill, "id"> => ({
  name: "",
  category: "Frontend",
  color: "from-violet-400 to-violet-600",
  icon: "",
});

const SkillForm = ({
  initial,
  onSave,
  onCancel,
}: {
  initial: Omit<Skill, "id">;
  onSave: (s: Omit<Skill, "id">) => void;
  onCancel: () => void;
}) => {
  const [form, setForm] = useState(initial);
  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      className="bg-white/[0.04] border border-violet-500/20 rounded-2xl p-6 mb-6"
    >
      <h3 className="text-white font-semibold mb-5 flex items-center gap-2">
        <Wrench className="w-4 h-4 text-violet-400" />
        {initial.name ? "Edit Skill" : "New Skill"}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-white/50 text-xs font-medium mb-1.5 block">Skill Name *</label>
          <input
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="e.g. React.js"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-violet-500/50 transition-all"
          />
        </div>
        <div>
          <label className="text-white/50 text-xs font-medium mb-1.5 block">Category *</label>
          <select
            value={form.category}
            onChange={(e) => set("category", e.target.value)}
            className="w-full bg-[#0d0d18] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-violet-500/50 transition-all"
          >
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="text-white/50 text-xs font-medium mb-1.5 block">Color Theme</label>
          <select
            value={form.color}
            onChange={(e) => set("color", e.target.value)}
            className="w-full bg-[#0d0d18] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-violet-500/50 transition-all"
          >
            {COLORS.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
        </div>
        <div>
          <label className="text-white/50 text-xs font-medium mb-1.5 block">Emoji Icon (optional)</label>
          <input
            value={form.icon}
            onChange={(e) => set("icon", e.target.value)}
            placeholder="e.g. ☕ (leave blank for SVG icon)"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-violet-500/50 transition-all"
          />
        </div>
      </div>
      {/* Preview */}
      {form.name && (
        <div className="mb-5">
          <label className="text-white/50 text-xs font-medium mb-2 block">Preview</label>
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-br ${form.color} text-white text-sm font-medium`}>
            {form.icon && <span>{form.icon}</span>}
            {form.name}
            <span className="text-white/60 text-xs">· {form.category}</span>
          </div>
        </div>
      )}
      <div className="flex gap-3">
        <button
          onClick={() => { if (form.name.trim()) onSave(form); }}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-sm font-medium rounded-xl transition-all shadow-lg shadow-violet-500/20"
        >
          <Check className="w-4 h-4" /> Save Skill
        </button>
        <button
          onClick={onCancel}
          className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white text-sm font-medium rounded-xl transition-all border border-white/10"
        >
          <X className="w-4 h-4" /> Cancel
        </button>
      </div>
    </motion.div>
  );
};

const SkillsManager = () => {
  const { data, updateSkills } = useCMS();
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("All");

  const filtered = data.skills.filter(
    (s) =>
      (filterCat === "All" || s.category === filterCat) &&
      s.name.toLowerCase().includes(search.toLowerCase())
  );

  const categories = ["All", ...Array.from(new Set(data.skills.map((s) => s.category)))];

  const addSkill = (form: Omit<Skill, "id">) => {
    updateSkills([...data.skills, { ...form, id: uuidv4() }]);
    setAdding(false);
  };

  const editSkill = (id: string, form: Omit<Skill, "id">) => {
    updateSkills(data.skills.map((s) => (s.id === id ? { ...form, id } : s)));
    setEditingId(null);
  };

  const deleteSkill = (id: string) => {
    if (confirm("Delete this skill?")) updateSkills(data.skills.filter((s) => s.id !== id));
  };

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Skills Manager</h1>
            <p className="text-white/40 text-sm">{data.skills.length} skills total</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => { setAdding(true); setEditingId(null); }}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-violet-500/25 transition-all"
          >
            <Plus className="w-4 h-4" /> Add Skill
          </motion.button>
        </div>

        {/* Add form */}
        <AnimatePresence>
          {adding && (
            <SkillForm initial={emptySkill()} onSave={addSkill} onCancel={() => setAdding(false)} />
          )}
        </AnimatePresence>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search skills..."
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-violet-500/50 transition-all"
            />
          </div>
          <select
            value={filterCat}
            onChange={(e) => setFilterCat(e.target.value)}
            className="bg-[#0d0d18] border border-white/10 rounded-xl px-4 py-2.5 text-white/70 text-sm focus:outline-none focus:border-violet-500/50"
          >
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <AnimatePresence>
            {filtered.map((skill) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                layout
              >
                {editingId === skill.id ? (
                  <SkillForm
                    initial={{ name: skill.name, category: skill.category, color: skill.color, icon: skill.icon }}
                    onSave={(f) => editSkill(skill.id, f)}
                    onCancel={() => setEditingId(null)}
                  />
                ) : (
                  <div className="group relative bg-white/[0.03] border border-white/8 rounded-2xl p-4 hover:border-white/15 transition-all">
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-br ${skill.color} text-white text-xs font-semibold mb-3`}>
                      {skill.icon && <span>{skill.icon}</span>}
                      {skill.name}
                    </div>
                    <div className="text-white/40 text-xs mb-3">{skill.category}</div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => { setEditingId(skill.id); setAdding(false); }}
                        className="flex items-center gap-1 px-3 py-1.5 bg-white/5 hover:bg-violet-500/20 border border-white/10 hover:border-violet-500/30 text-white/60 hover:text-violet-400 text-xs rounded-lg transition-all"
                      >
                        <Pencil className="w-3 h-3" /> Edit
                      </button>
                      <button
                        onClick={() => deleteSkill(skill.id)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/30 text-white/60 hover:text-red-400 text-xs rounded-lg transition-all"
                      >
                        <Trash2 className="w-3 h-3" /> Delete
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-white/30">
            <Wrench className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p>No skills found. Add your first skill!</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default SkillsManager;
