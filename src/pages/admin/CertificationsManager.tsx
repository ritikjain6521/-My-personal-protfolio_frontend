import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCMS, Certification } from "@/contexts/CMSContext";
import AdminLayout from "@/components/admin/AdminLayout";
import { Plus, Pencil, Trash2, X, Check, Award, Search, ExternalLink } from "lucide-react";

const emptyCert = (): Omit<Certification, "id"> => ({
  title: "", issuer: "", date: "", credentialUrl: "", badge: "🏆",
});

const CertForm = ({
  initial, onSave, onCancel,
}: { initial: Omit<Certification, "id">; onSave: (c: Omit<Certification, "id">) => void; onCancel: () => void }) => {
  const [form, setForm] = useState(initial);
  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
      className="bg-white/[0.04] border border-amber-500/20 rounded-2xl p-6 mb-6">
      <h3 className="text-white font-semibold mb-5 flex items-center gap-2">
        <Award className="w-4 h-4 text-amber-400" />
        {initial.title ? "Edit Certification" : "New Certification"}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {[
          { k: "title", label: "Certificate Title *", placeholder: "Full Stack Web Development" },
          { k: "issuer", label: "Issuing Organization *", placeholder: "Udemy / Coursera / Google" },
          { k: "date", label: "Date", placeholder: "2024-01-15", type: "date" },
          { k: "credentialUrl", label: "Credential URL", placeholder: "https://..." },
          { k: "badge", label: "Badge Emoji", placeholder: "🏆" },
        ].map(({ k, label, placeholder, type }) => (
          <div key={k}>
            <label className="text-white/50 text-xs font-medium mb-1.5 block">{label}</label>
            <input type={type || "text"} value={(form as any)[k]} onChange={(e) => set(k as any, e.target.value)}
              placeholder={placeholder}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-amber-500/50 transition-all" />
          </div>
        ))}
      </div>
      <div className="flex gap-3">
        <button onClick={() => { if (form.title.trim() && form.issuer.trim()) onSave(form); }}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white text-sm font-medium rounded-xl transition-all shadow-lg shadow-amber-500/20">
          <Check className="w-4 h-4" /> Save Certification
        </button>
        <button onClick={onCancel}
          className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white text-sm font-medium rounded-xl transition-all border border-white/10">
          <X className="w-4 h-4" /> Cancel
        </button>
      </div>
    </motion.div>
  );
};

const CertificationsManager = () => {
  const { data, updateCertifications } = useCMS();
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filtered = data.certifications.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.issuer.toLowerCase().includes(search.toLowerCase())
  );

  const genId = () => Date.now().toString();
  const add = (form: Omit<Certification, "id">) => { updateCertifications([...data.certifications, { ...form, id: genId() }]); setAdding(false); };
  const edit = (id: string, form: Omit<Certification, "id">) => { updateCertifications(data.certifications.map((c) => (c.id === id ? { ...form, id } : c))); setEditingId(null); };
  const del = (id: string) => { if (confirm("Delete this certification?")) updateCertifications(data.certifications.filter((c) => c.id !== id)); };

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Certifications Manager</h1>
            <p className="text-white/40 text-sm">{data.certifications.length} certifications total</p>
          </div>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
            onClick={() => { setAdding(true); setEditingId(null); }}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white text-sm font-semibold rounded-xl shadow-lg shadow-amber-500/25 transition-all">
            <Plus className="w-4 h-4" /> Add Certification
          </motion.button>
        </div>

        <AnimatePresence>
          {adding && <CertForm initial={emptyCert()} onSave={add} onCancel={() => setAdding(false)} />}
        </AnimatePresence>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search certifications..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-amber-500/50 transition-all" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {filtered.map((cert, i) => (
              <motion.div key={cert.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }} transition={{ delay: i * 0.05 }} layout>
                {editingId === cert.id ? (
                  <CertForm initial={{ title: cert.title, issuer: cert.issuer, date: cert.date, credentialUrl: cert.credentialUrl, badge: cert.badge }}
                    onSave={(f) => edit(cert.id, f)} onCancel={() => setEditingId(null)} />
                ) : (
                  <div className="group bg-white/[0.03] border border-white/8 rounded-2xl p-5 hover:border-white/15 transition-all h-full">
                    <div className="text-3xl mb-3">{cert.badge || "🏆"}</div>
                    <h3 className="text-white font-semibold text-sm mb-1 leading-snug">{cert.title}</h3>
                    <p className="text-amber-400/80 text-xs font-medium mb-1">{cert.issuer}</p>
                    {cert.date && <p className="text-white/30 text-xs mb-3">{new Date(cert.date).toLocaleDateString("en-US", { year: "numeric", month: "long" })}</p>}
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity mt-auto">
                      {cert.credentialUrl && cert.credentialUrl !== "#" && (
                        <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer"
                          className="p-1.5 bg-white/5 hover:bg-amber-500/20 rounded-lg border border-white/10 hover:border-amber-500/30 text-white/40 hover:text-amber-400 transition-all">
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                      <button onClick={() => { setEditingId(cert.id); setAdding(false); }}
                        className="flex items-center gap-1 px-3 py-1.5 bg-white/5 hover:bg-amber-500/20 border border-white/10 hover:border-amber-500/30 text-white/60 hover:text-amber-400 text-xs rounded-lg transition-all">
                        <Pencil className="w-3 h-3" /> Edit
                      </button>
                      <button onClick={() => del(cert.id)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/30 text-white/60 hover:text-red-400 text-xs rounded-lg transition-all">
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
            <Award className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p>No certifications found. Add your first one!</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default CertificationsManager;
