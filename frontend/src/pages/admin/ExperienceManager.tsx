import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCMS, Experience, ProjectGroup, ExperienceProject } from "@/contexts/CMSContext";
import AdminLayout from "@/components/admin/AdminLayout";
import { Briefcase, Plus, Trash2, X, Check, ChevronDown, Pencil, Clock } from "lucide-react";
import { toast } from "sonner";

const genId = () => Date.now().toString() + Math.random().toString(36).slice(2);

const colorOptions = [
  { value: "blue", label: "Blue" },
  { value: "yellow", label: "Yellow" },
  { value: "green", label: "Green" },
  { value: "purple", label: "Purple" },
  { value: "orange", label: "Orange" },
];

const inputCls = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-violet-500/50 transition-all";
const labelCls = "text-white/50 text-xs font-medium mb-1.5 block";
const colorBadgeMap: Record<string, string> = {
  blue: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  yellow: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  green: "bg-green-500/20 text-green-300 border-green-500/30",
  purple: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  orange: "bg-orange-500/20 text-orange-300 border-orange-500/30",
};

// ─── Project Form ─────────────────────────────────────────────────────────────
const ProjectForm = ({ initial, onSave, onCancel }: {
  initial: ExperienceProject;
  onSave: (p: ExperienceProject) => void;
  onCancel: () => void;
}) => {
  const [form, setForm] = useState(initial);
  const [techInput, setTechInput] = useState(initial.tech.join(", "));
  const set = (k: keyof ExperienceProject, v: string) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div><label className={labelCls}>Project Name *</label><input value={form.name} onChange={e => set("name", e.target.value)} placeholder="Project name" className={inputCls} /></div>
        <div><label className={labelCls}>Hours Tracked</label><input value={form.hours} onChange={e => set("hours", e.target.value)} placeholder="e.g. 107h 07m" className={inputCls} /></div>
        <div className="sm:col-span-2"><label className={labelCls}>Description</label><textarea value={form.description} onChange={e => set("description", e.target.value)} rows={2} placeholder="What you built..." className={`${inputCls} resize-none`} /></div>
        <div><label className={labelCls}>Tech Stack (comma-separated)</label><input value={techInput} onChange={e => setTechInput(e.target.value)} placeholder="React, Node.js, MongoDB" className={inputCls} /></div>
        <div><label className={labelCls}>URL (optional)</label><input value={form.url} onChange={e => set("url", e.target.value)} placeholder="https://..." className={inputCls} /></div>
      </div>
      <div className="flex gap-2">
        <button onClick={() => { if (form.name.trim()) onSave({ ...form, tech: techInput.split(",").map(t => t.trim()).filter(Boolean) }); }}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-medium rounded-xl">
          <Check className="w-4 h-4" /> Save
        </button>
        <button onClick={onCancel} className="px-4 py-2 bg-white/5 border border-white/10 text-white/60 hover:text-white text-sm rounded-xl"><X className="w-4 h-4" /></button>
      </div>
    </div>
  );
};

// ─── Project Group Section ────────────────────────────────────────────────────
const GroupSection = ({ group, onUpdate, onDelete }: {
  group: ProjectGroup;
  onUpdate: (g: ProjectGroup) => void;
  onDelete: () => void;
}) => {
  const [open, setOpen] = useState(false);
  const [addingProject, setAddingProject] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const c = colorBadgeMap[group.color] || colorBadgeMap.blue;

  const updateGroup = (key: keyof ProjectGroup, value: any) => onUpdate({ ...group, [key]: value });

  const addProject = (p: ExperienceProject) => {
    onUpdate({ ...group, projects: [...group.projects, { ...p, projectId: genId() }] });
    setAddingProject(false);
  };
  const editProject = (p: ExperienceProject) => {
    onUpdate({ ...group, projects: group.projects.map(pp => pp.projectId === p.projectId ? p : pp) });
    setEditingProjectId(null);
  };
  const deleteProject = (id: string) => {
    if (confirm("Delete this project?")) onUpdate({ ...group, projects: group.projects.filter(p => p.projectId !== id) });
  };

  return (
    <div className={`rounded-2xl border ${c} overflow-hidden mb-3`}>
      <div className="flex items-center justify-between p-4 bg-white/[0.02] cursor-pointer" onClick={() => setOpen(!open)}>
        <div className="flex items-center gap-3">
          <input value={group.groupIcon} onChange={e => updateGroup("groupIcon", e.target.value)} onClick={e => e.stopPropagation()}
            className="w-10 text-xl bg-transparent border-0 outline-none text-center" placeholder="🟦" />
          <div>
            <input value={group.groupName} onChange={e => updateGroup("groupName", e.target.value)} onClick={e => e.stopPropagation()}
              className="bg-transparent border-0 outline-none text-white font-semibold text-sm w-48" placeholder="Group Name" />
            <p className="text-white/30 text-xs">{group.projects.length} projects</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <select value={group.color} onChange={e => updateGroup("color", e.target.value)} onClick={e => e.stopPropagation()}
            className="bg-white/10 border border-white/10 text-white text-xs rounded-lg px-2 py-1">
            {colorOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <button onClick={e => { e.stopPropagation(); onDelete(); }} className="p-1.5 text-white/30 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"><Trash2 className="w-4 h-4" /></button>
          <ChevronDown className={`w-5 h-5 text-white/50 transition-transform ${open ? "rotate-180" : ""}`} />
        </div>
      </div>

      {open && (
        <div className="p-4 border-t border-white/5 space-y-3">
          <div><label className={labelCls}>Group Description</label><textarea value={group.description} onChange={e => updateGroup("description", e.target.value)} rows={2} className={`${inputCls} resize-none`} /></div>
          <div className="space-y-2">
            {group.projects.map(proj => (
              editingProjectId === proj.projectId ? (
                <ProjectForm key={proj.projectId} initial={proj} onSave={editProject} onCancel={() => setEditingProjectId(null)} />
              ) : (
                <div key={proj.projectId} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{proj.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Clock className="w-3 h-3 text-white/30" />
                      <span className="text-white/30 text-xs font-mono">{proj.hours}</span>
                    </div>
                  </div>
                  <button onClick={() => setEditingProjectId(proj.projectId)} className="p-1.5 text-white/30 hover:text-violet-400 rounded-lg"><Pencil className="w-3.5 h-3.5" /></button>
                  <button onClick={() => deleteProject(proj.projectId)} className="p-1.5 text-white/30 hover:text-red-400 rounded-lg"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              )
            ))}
          </div>
          {addingProject ? (
            <ProjectForm initial={{ projectId: "", name: "", description: "", tech: [], hours: "", url: "" }}
              onSave={addProject} onCancel={() => setAddingProject(false)} />
          ) : (
            <button onClick={() => setAddingProject(true)}
              className="w-full flex items-center gap-2 justify-center py-2 border border-dashed border-white/20 hover:border-violet-500/50 text-white/40 hover:text-violet-400 text-sm rounded-xl transition-all">
              <Plus className="w-4 h-4" /> Add Project
            </button>
          )}
        </div>
      )}
    </div>
  );
};

// ─── Main Component ────────────────────────────────────────────────────────────
const ExperienceManager = () => {
  const { data, updateExperience } = useCMS();
  const [saved, setSaved] = useState(false);
  const experiences = data.experience || [];

  const handleSave = () => {
    updateExperience(experiences);
    setSaved(true);
    toast.success("Experience saved successfully!");
    setTimeout(() => setSaved(false), 2000);
  };

  const updateExp = (updated: Experience) => {
    updateExperience(experiences.map(e => e.id === updated.id ? updated : e));
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: genId(), company: "New Company", role: "Your Role", startDate: "", endDate: "",
      current: true, location: "Remote", companyUrl: "", description: "", totalHours: "0h", projectGroups: []
    };
    updateExperience([...experiences, newExp]);
  };

  const deleteExperience = (id: string) => {
    if (confirm("Delete this experience?")) updateExperience(experiences.filter(e => e.id !== id));
  };

  return (
    <AdminLayout>
      <div className="p-4 sm:p-8 max-w-5xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Experience Manager</h1>
            <p className="text-white/40 text-sm">Manage your internship and work experience</p>
          </div>
          <div className="flex gap-3">
            <button onClick={addExperience}
              className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm rounded-xl transition-all">
              <Plus className="w-4 h-4" /> Add Company
            </button>
            <motion.button onClick={handleSave} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              className={`flex items-center gap-2 px-5 py-2.5 text-white text-sm font-semibold rounded-xl shadow-lg transition-all ${saved ? "bg-gradient-to-r from-green-600 to-emerald-600" : "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500"}`}>
              {saved ? <Check className="w-4 h-4" /> : <Briefcase className="w-4 h-4" />}
              {saved ? "Saved!" : "Save Changes"}
            </motion.button>
          </div>
        </div>

        {experiences.length === 0 && (
          <div className="text-center py-16 text-white/30">
            <Briefcase className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>No experience entries yet. Add your first internship!</p>
          </div>
        )}

        {experiences.map((exp) => (
          <motion.div key={exp.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="bg-white/[0.03] border border-white/8 rounded-2xl p-5 sm:p-6 mb-6">
            {/* Company Header */}
            <div className="flex items-start justify-between gap-3 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shrink-0">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <div>
                  <input value={exp.company} onChange={e => updateExp({ ...exp, company: e.target.value })}
                    className="bg-transparent border-0 outline-0 text-white font-bold text-lg w-full" placeholder="Company Name" />
                  <input value={exp.role} onChange={e => updateExp({ ...exp, role: e.target.value })}
                    className="bg-transparent border-0 outline-0 text-violet-400 text-sm w-full" placeholder="Your Role" />
                </div>
              </div>
              <button onClick={() => deleteExperience(exp.id)} className="p-2 text-white/30 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div><label className={labelCls}>Start Date</label><input type="date" value={exp.startDate} onChange={e => updateExp({ ...exp, startDate: e.target.value })} className={inputCls} /></div>
              <div><label className={labelCls}>End Date (leave blank if current)</label><input type="date" value={exp.endDate} onChange={e => updateExp({ ...exp, endDate: e.target.value })} className={inputCls} /></div>
              <div><label className={labelCls}>Location</label><input value={exp.location} onChange={e => updateExp({ ...exp, location: e.target.value })} placeholder="Remote / City, Country" className={inputCls} /></div>
              <div><label className={labelCls}>Company URL</label><input value={exp.companyUrl} onChange={e => updateExp({ ...exp, companyUrl: e.target.value })} placeholder="https://company.com" className={inputCls} /></div>
              <div><label className={labelCls}>Total Hours (Desklog)</label><input value={exp.totalHours} onChange={e => updateExp({ ...exp, totalHours: e.target.value })} placeholder="5864h+" className={inputCls} /></div>
              <div className="flex items-center gap-3 pt-5">
                <input type="checkbox" id={`current-${exp.id}`} checked={exp.current} onChange={e => updateExp({ ...exp, current: e.target.checked })}
                  className="w-4 h-4 accent-violet-500" />
                <label htmlFor={`current-${exp.id}`} className="text-white/60 text-sm">Currently working here</label>
              </div>
              <div className="sm:col-span-2"><label className={labelCls}>Description</label><textarea value={exp.description} onChange={e => updateExp({ ...exp, description: e.target.value })} rows={3} className={`${inputCls} resize-none`} /></div>
            </div>

            {/* Project Groups */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-3">
                <label className="text-white/50 text-xs font-semibold uppercase tracking-wider">Project Groups</label>
                <button onClick={() => updateExp({ ...exp, projectGroups: [...exp.projectGroups, { groupId: genId(), groupName: "New Group", groupIcon: "📁", color: "blue", description: "", projects: [] }] })}
                  className="flex items-center gap-1 px-3 py-1.5 bg-white/5 hover:bg-violet-500/10 border border-white/10 hover:border-violet-500/30 text-white/60 hover:text-violet-400 text-xs rounded-lg transition-all">
                  <Plus className="w-3 h-3" /> Add Group
                </button>
              </div>
              {exp.projectGroups.map(group => (
                <GroupSection key={group.groupId} group={group}
                  onUpdate={g => updateExp({ ...exp, projectGroups: exp.projectGroups.map(gg => gg.groupId === g.groupId ? g : gg) })}
                  onDelete={() => { if (confirm("Delete group?")) updateExp({ ...exp, projectGroups: exp.projectGroups.filter(g => g.groupId !== group.groupId) }); }}
                />
              ))}
            </div>
          </motion.div>
        ))}

        {/* Bottom save */}
        {experiences.length > 0 && (
          <div className="flex justify-end mt-4">
            <motion.button onClick={handleSave} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              className={`flex items-center gap-2 px-6 py-3 text-white text-sm font-semibold rounded-xl shadow-lg transition-all ${saved ? "bg-gradient-to-r from-green-600 to-emerald-600" : "bg-gradient-to-r from-violet-600 to-indigo-600"}`}>
              {saved ? <><Check className="w-4 h-4" /> All Saved!</> : <><Briefcase className="w-4 h-4" /> Save All Changes</>}
            </motion.button>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ExperienceManager;
