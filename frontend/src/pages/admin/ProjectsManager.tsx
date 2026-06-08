import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCMS, Project } from "@/contexts/CMSContext";
import AdminLayout from "@/components/admin/AdminLayout";
import FileUpload from "@/components/admin/FileUpload";
import { Plus, Pencil, Trash2, X, Check, FolderKanban, Search, ExternalLink, Github } from "lucide-react";

const emptyProject = (): Omit<Project, "id"> => ({
  title: "",
  description: "",
  image: "",
  video: "",
  tech: [],
  liveUrl: "",
  githubUrl: "",
});

const ProjectForm = ({
  initial,
  onSave,
  onCancel,
}: {
  initial: Omit<Project, "id">;
  onSave: (p: Omit<Project, "id">) => void;
  onCancel: () => void;
}) => {
  const [form, setForm] = useState(initial);
  const [techInput, setTechInput] = useState(initial.tech.join(", "));

  const set = (k: keyof typeof form, v: any) => setForm((f) => ({ ...f, [k]: v }));

  const handleSave = () => {
    if (!form.title.trim()) return;
    const techs = techInput.split(",").map((t) => t.trim()).filter(Boolean);
    onSave({ ...form, tech: techs });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="bg-white/[0.04] border border-violet-500/20 rounded-2xl p-6 mb-6"
    >
      <h3 className="text-white font-semibold mb-5 flex items-center gap-2">
        <FolderKanban className="w-4 h-4 text-violet-400" />
        {initial.title ? "Edit Project" : "New Project"}
      </h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <label className="text-white/50 text-xs font-medium mb-1.5 block">Project Title *</label>
          <input value={form.title} onChange={(e) => set("title", e.target.value)}
            placeholder="My Awesome Project"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-violet-500/50 transition-all" />
        </div>
        <div>
          <label className="text-white/50 text-xs font-medium mb-1.5 block">Description *</label>
          <textarea value={form.description} onChange={(e) => set("description", e.target.value)}
            rows={3} placeholder="Describe your project..."
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-violet-500/50 transition-all resize-none" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <FileUpload
              label="Project Image URL"
              value={form.image}
              onChange={(url) => set("image", url)}
              accept="image/*"
              type="image"
            />
          </div>
          <div>
            <FileUpload
              label="Project Video URL (Optional)"
              value={form.video || ""}
              onChange={(url) => set("video", url)}
              accept="video/*"
              type="video"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-white/50 text-xs font-medium mb-1.5 block">Tech Stack (comma-separated)</label>
            <input value={techInput} onChange={(e) => setTechInput(e.target.value)}
              placeholder="React.js, Node.js, MongoDB"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-violet-500/50 transition-all" />
          </div>
          <div>
            <label className="text-white/50 text-xs font-medium mb-1.5 block">Live URL</label>
            <input value={form.liveUrl} onChange={(e) => set("liveUrl", e.target.value)}
              placeholder="https://my-project.vercel.app"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-violet-500/50 transition-all" />
          </div>
          <div>
            <label className="text-white/50 text-xs font-medium mb-1.5 block">GitHub URL</label>
            <input value={form.githubUrl} onChange={(e) => set("githubUrl", e.target.value)}
              placeholder="https://github.com/..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-violet-500/50 transition-all" />
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        <button onClick={handleSave}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-sm font-medium rounded-xl transition-all shadow-lg shadow-violet-500/20">
          <Check className="w-4 h-4" /> Save Project
        </button>
        <button onClick={onCancel}
          className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white text-sm font-medium rounded-xl transition-all border border-white/10">
          <X className="w-4 h-4" /> Cancel
        </button>
      </div>
    </motion.div>
  );
};

const ProjectsManager = () => {
  const { data, updateProjects } = useCMS();
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filtered = data.projects.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  const genId = () => Date.now().toString();

  const addProject = (form: Omit<Project, "id">) => {
    updateProjects([...data.projects, { ...form, id: genId() }]);
    setAdding(false);
  };

  const editProject = (id: string, form: Omit<Project, "id">) => {
    updateProjects(data.projects.map((p) => (p.id === id ? { ...form, id } : p)));
    setEditingId(null);
  };

  const deleteProject = (id: string) => {
    if (confirm("Delete this project?")) updateProjects(data.projects.filter((p) => p.id !== id));
  };

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Projects Manager</h1>
            <p className="text-white/40 text-sm">{data.projects.length} projects total</p>
          </div>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
            onClick={() => { setAdding(true); setEditingId(null); }}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-violet-500/25 transition-all">
            <Plus className="w-4 h-4" /> Add Project
          </motion.button>
        </div>

        <AnimatePresence>
          {adding && <ProjectForm initial={emptyProject()} onSave={addProject} onCancel={() => setAdding(false)} />}
        </AnimatePresence>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-violet-500/50 transition-all" />
        </div>

        <div className="space-y-4">
          <AnimatePresence>
            {filtered.map((project, index) => (
              <motion.div key={project.id}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }} transition={{ delay: index * 0.05 }} layout>
                {editingId === project.id ? (
                  <ProjectForm
                    initial={{ title: project.title, description: project.description, image: project.image, video: project.video, tech: project.tech, liveUrl: project.liveUrl, githubUrl: project.githubUrl }}
                    onSave={(f) => editProject(project.id, f)}
                    onCancel={() => setEditingId(null)} />
                ) : (
                  <div className="group bg-white/[0.03] border border-white/8 rounded-2xl p-5 hover:border-white/15 transition-all">
                    <div className="flex items-start gap-4">
                      {project.image && (
                        <img src={project.image} alt={project.title}
                          className="w-20 h-14 object-cover rounded-lg border border-white/10 shrink-0 hidden sm:block" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="text-white font-semibold text-sm leading-snug">{project.title}</h3>
                          <div className="flex gap-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                            {project.liveUrl && project.liveUrl !== "#" && (
                              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                                className="p-1.5 bg-white/5 hover:bg-blue-500/20 rounded-lg border border-white/10 hover:border-blue-500/30 text-white/40 hover:text-blue-400 transition-all">
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            )}
                            {project.githubUrl && (
                              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                                className="p-1.5 bg-white/5 hover:bg-white/15 rounded-lg border border-white/10 text-white/40 hover:text-white transition-all">
                                <Github className="w-3.5 h-3.5" />
                              </a>
                            )}
                            <button onClick={() => { setEditingId(project.id); setAdding(false); }}
                              className="flex items-center gap-1 px-3 py-1.5 bg-white/5 hover:bg-violet-500/20 border border-white/10 hover:border-violet-500/30 text-white/60 hover:text-violet-400 text-xs rounded-lg transition-all">
                              <Pencil className="w-3 h-3" /> Edit
                            </button>
                            <button onClick={() => deleteProject(project.id)}
                              className="flex items-center gap-1 px-3 py-1.5 bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/30 text-white/60 hover:text-red-400 text-xs rounded-lg transition-all">
                              <Trash2 className="w-3 h-3" /> Delete
                            </button>
                          </div>
                        </div>
                        <p className="text-white/40 text-xs mt-1 line-clamp-2">{project.description}</p>
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {project.tech.map((t) => (
                            <span key={t} className="px-2 py-0.5 bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs rounded-full">{t}</span>
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
            <FolderKanban className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p>No projects found. Add your first project!</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ProjectsManager;
