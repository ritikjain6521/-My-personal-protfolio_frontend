import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useCMS } from "@/contexts/CMSContext";
import AdminLayout from "@/components/admin/AdminLayout";
import { FileText, Printer, Code2, Layers, BarChart2, User, Mail, Phone, MapPin, Globe, Github, Linkedin } from "lucide-react";
import { toast } from "sonner";

const FORMAT_TYPES = [
  { id: "classic", label: "Classic IT", icon: Layers, desc: "Clean ATS-friendly. Most universally accepted." },
  { id: "technical", label: "Developer", icon: Code2, desc: "Skills & projects first. Great for dev roles." },
  { id: "twocol", label: "Two Column", icon: BarChart2, desc: "Modern side-by-side layout for senior roles." },
];

const printStyles = `
  @media print {
    body * { visibility: hidden !important; }
    #resume-preview, #resume-preview * { visibility: visible !important; }
    #resume-preview {
      position: fixed; left: 0; top: 0; width: 100%;
      background: white !important; color: black !important;
      padding: 0 !important; margin: 0 !important;
    }
    .no-print { display: none !important; }
    @page { margin: 0.5in; size: A4; }
  }
`;

// ─── Shared Styles ─────────────────────────────────────────────────────────────
const sectionTitle = (title: string, accent?: string) => (
  <div className="flex items-center gap-2 mb-3">
    <h2 style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: accent || "#1e3a5f", margin: 0 }}>{title}</h2>
    <div style={{ flex: 1, height: "1.5px", background: `linear-gradient(to right, ${accent || "#1e3a5f"}, transparent)` }} />
  </div>
);

const Tag = ({ text, bg, color }: { text: string; bg: string; color: string }) => (
  <span style={{ background: bg, color, fontSize: "9px", padding: "2px 8px", borderRadius: "20px", fontWeight: 600, whiteSpace: "nowrap" }}>{text}</span>
);

// ─── Classic / ATS Resume ─────────────────────────────────────────────────────
const ClassicResume = ({ data, s }: { data: any; s: any }) => {
  const exp = data.experience?.[0];
  const skillsByCategory = data.skills.reduce((acc: any, sk: any) => {
    if (!acc[sk.category]) acc[sk.category] = [];
    acc[sk.category].push(sk.name);
    return acc;
  }, {});

  return (
    <div style={{ fontFamily: "'Arial', 'Helvetica', sans-serif", color: "#1a1a1a", lineHeight: 1.5, fontSize: "11px" }}>
      {/* ── Header ── */}
      <div style={{ textAlign: "center", borderBottom: "2px solid #1e3a5f", paddingBottom: "14px", marginBottom: "14px" }}>
        <h1 style={{ fontSize: "26px", fontWeight: 800, letterSpacing: "0.04em", margin: 0, color: "#0d1b2a" }}>{data.hero.name?.toUpperCase()}</h1>
        <p style={{ fontSize: "13px", color: "#2563eb", fontWeight: 600, margin: "4px 0 8px" }}>{s.role || data.hero.tagline}</p>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "12px", fontSize: "10px", color: "#555" }}>
          {s.email && <span>✉ {s.email}</span>}
          {s.phone && <span>📱 {s.phone}</span>}
          {s.location && <span>📍 {s.location}</span>}
          {data.hero.githubUrl && <span>⌂ {data.hero.githubUrl}</span>}
          {data.hero.linkedinUrl && <span>in {data.hero.linkedinUrl}</span>}
          {s.portfolio && <span>🌐 {s.portfolio}</span>}
        </div>
      </div>

      {/* ── Summary ── */}
      <div style={{ marginBottom: "14px" }}>
        {sectionTitle("Professional Summary")}
        <p style={{ fontSize: "10.5px", color: "#333", margin: 0, lineHeight: 1.65 }}>{s.summary || data.hero.bio}</p>
      </div>

      {/* ── Experience ── */}
      {exp && (
        <div style={{ marginBottom: "14px" }}>
          {sectionTitle("Professional Experience")}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <p style={{ fontWeight: 700, fontSize: "12px", margin: 0, color: "#0d1b2a" }}>{exp.role}</p>
                <p style={{ color: "#2563eb", fontSize: "11px", fontWeight: 600, margin: "2px 0" }}>{exp.company} — {exp.location}</p>
              </div>
              <p style={{ fontSize: "10px", color: "#666", whiteSpace: "nowrap", marginTop: "2px" }}>
                {new Date(exp.startDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })} — {exp.current ? "Present" : exp.endDate}
              </p>
            </div>
            <p style={{ fontSize: "10px", color: "#555", margin: "6px 0 8px", lineHeight: 1.6 }}>{exp.description}</p>
            <ul style={{ margin: 0, paddingLeft: "14px" }}>
              {exp.projectGroups?.map((g: any) => (
                <li key={g.groupId} style={{ fontSize: "10.5px", color: "#333", marginBottom: "5px", lineHeight: 1.5 }}>
                  <strong>{g.groupName}:</strong> {g.description} <em style={{ color: "#666", fontSize: "9.5px" }}>({g.projects.map((p: any) => p.name).join(", ")})</em>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* ── Technical Skills ── */}
      <div style={{ marginBottom: "14px" }}>
        {sectionTitle("Technical Skills")}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 16px" }}>
          {Object.entries(skillsByCategory).map(([cat, skills]: any) => (
            <div key={cat} style={{ display: "flex", gap: "6px", alignItems: "flex-start", fontSize: "10.5px" }}>
              <span style={{ fontWeight: 700, minWidth: "90px", color: "#0d1b2a" }}>{cat}:</span>
              <span style={{ color: "#333" }}>{skills.join(", ")}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Projects ── */}
      {data.projects?.length > 0 && (
        <div style={{ marginBottom: "14px" }}>
          {sectionTitle("Key Projects")}
          {data.projects.slice(0, 3).map((p: any) => (
            <div key={p.id} style={{ marginBottom: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={{ fontWeight: 700, fontSize: "11px", color: "#0d1b2a" }}>{p.title}</span>
                <span style={{ fontSize: "9.5px", color: "#2563eb" }}>{p.tech.slice(0, 4).join(" · ")}</span>
              </div>
              <p style={{ fontSize: "10px", color: "#555", margin: "2px 0", lineHeight: 1.5 }}>{p.description.slice(0, 130)}...</p>
            </div>
          ))}
        </div>
      )}

      {/* ── Education ── */}
      {s.education && (
        <div style={{ marginBottom: "14px" }}>
          {sectionTitle("Education")}
          <p style={{ fontSize: "10.5px", margin: 0 }}>{s.education}</p>
        </div>
      )}

      {/* ── Certifications ── */}
      {data.certifications?.length > 0 && (
        <div>
          {sectionTitle("Certifications")}
          {data.certifications.map((c: any) => (
            <p key={c.id} style={{ fontSize: "10.5px", margin: "3px 0" }}>▸ <strong>{c.title}</strong> — {c.issuer}, {c.date}</p>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Developer / Technical Resume ────────────────────────────────────────────
const DeveloperResume = ({ data, s }: { data: any; s: any }) => {
  const exp = data.experience?.[0];
  const skillsByCategory = data.skills.reduce((acc: any, sk: any) => {
    if (!acc[sk.category]) acc[sk.category] = [];
    acc[sk.category].push(sk.name);
    return acc;
  }, {});

  return (
    <div style={{ fontFamily: "'Arial', 'Helvetica', sans-serif", color: "#1a1a1a", lineHeight: 1.5, fontSize: "11px" }}>
      {/* ── Header ── */}
      <div style={{ background: "#0d1b2a", color: "white", padding: "20px 24px", marginBottom: "16px", borderRadius: "4px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: 800, margin: 0, letterSpacing: "0.05em" }}>{data.hero.name}</h1>
        <p style={{ color: "#60a5fa", fontSize: "13px", fontWeight: 600, margin: "4px 0 10px" }}>{s.role || data.hero.tagline}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", fontSize: "10px", color: "#cbd5e1" }}>
          {s.email && <span>✉ {s.email}</span>}
          {s.phone && <span>📱 {s.phone}</span>}
          {s.location && <span>📍 {s.location}</span>}
          {data.hero.githubUrl && <span>⌂ {data.hero.githubUrl}</span>}
          {data.hero.linkedinUrl && <span>in {data.hero.linkedinUrl}</span>}
        </div>
      </div>

      {/* ── Technical Skills ── */}
      <div style={{ marginBottom: "14px", background: "#f8fafc", padding: "12px 16px", borderLeft: "3px solid #2563eb", borderRadius: "2px" }}>
        {sectionTitle("Technical Skills", "#2563eb")}
        {Object.entries(skillsByCategory).map(([cat, skills]: any) => (
          <div key={cat} style={{ display: "flex", gap: "8px", marginBottom: "4px", fontSize: "10.5px" }}>
            <span style={{ fontWeight: 700, minWidth: "100px", color: "#0d1b2a" }}>{cat}:</span>
            <span style={{ color: "#374151" }}>{skills.join(", ")}</span>
          </div>
        ))}
      </div>

      {/* ── Experience ── */}
      {exp && (
        <div style={{ marginBottom: "14px" }}>
          {sectionTitle("Work Experience", "#0d1b2a")}
          <div style={{ borderLeft: "2px solid #e5e7eb", paddingLeft: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontWeight: 700, fontSize: "12px" }}>{exp.role} @ {exp.company}</span>
              <span style={{ fontSize: "10px", color: "#6b7280" }}>
                {new Date(exp.startDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })} — {exp.current ? "Present" : exp.endDate}
              </span>
            </div>
            <p style={{ fontSize: "10px", color: "#6b7280", margin: "2px 0 8px" }}>{exp.location} · {exp.totalHours} Tracked</p>
            {exp.projectGroups?.map((g: any) => (
              <div key={g.groupId} style={{ marginBottom: "8px" }}>
                <p style={{ fontWeight: 600, fontSize: "10.5px", color: "#1e3a5f", margin: "0 0 4px" }}>{g.groupIcon} {g.groupName}</p>
                {g.projects.slice(0, 2).map((p: any) => (
                  <p key={p.projectId} style={{ fontSize: "10px", margin: "0 0 3px", paddingLeft: "10px", color: "#374151" }}>
                    ▸ <strong>{p.name}</strong> ({p.hours}) — {p.tech.join(", ")}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Projects ── */}
      {data.projects?.length > 0 && (
        <div style={{ marginBottom: "14px" }}>
          {sectionTitle("Projects", "#0d1b2a")}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
            {data.projects.slice(0, 4).map((p: any) => (
              <div key={p.id} style={{ border: "1px solid #e5e7eb", borderRadius: "4px", padding: "8px 10px" }}>
                <p style={{ fontWeight: 700, fontSize: "10.5px", margin: "0 0 3px", color: "#0d1b2a" }}>{p.title}</p>
                <p style={{ fontSize: "9.5px", color: "#6b7280", margin: "0 0 5px", lineHeight: 1.5 }}>{p.description.slice(0, 90)}...</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "3px" }}>
                  {p.tech.slice(0, 3).map((t: string) => (
                    <Tag key={t} text={t} bg="#dbeafe" color="#1e40af" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Education & Certs ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        {s.education && (
          <div>
            {sectionTitle("Education", "#0d1b2a")}
            <p style={{ fontSize: "10.5px", margin: 0 }}>{s.education}</p>
          </div>
        )}
        {data.certifications?.length > 0 && (
          <div>
            {sectionTitle("Certifications", "#0d1b2a")}
            {data.certifications.slice(0, 3).map((c: any) => (
              <p key={c.id} style={{ fontSize: "10px", margin: "2px 0" }}>▸ {c.title} — <em>{c.issuer}</em></p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Two Column Resume ────────────────────────────────────────────────────────
const TwoColumnResume = ({ data, s }: { data: any; s: any }) => {
  const exp = data.experience?.[0];
  const skillsByCategory = data.skills.reduce((acc: any, sk: any) => {
    if (!acc[sk.category]) acc[sk.category] = [];
    acc[sk.category].push(sk.name);
    return acc;
  }, {});

  return (
    <div style={{ fontFamily: "'Arial', 'Helvetica', sans-serif", color: "#1a1a1a", lineHeight: 1.5, fontSize: "10.5px", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px", borderBottom: "3px solid #2563eb", paddingBottom: "16px", marginBottom: "16px" }}>
        <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "#0d1b2a", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "22px", fontWeight: 800, flexShrink: 0 }}>
          {data.hero.name?.charAt(0)}
        </div>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: "22px", fontWeight: 800, margin: 0, color: "#0d1b2a" }}>{data.hero.name}</h1>
          <p style={{ color: "#2563eb", fontWeight: 600, fontSize: "12px", margin: "3px 0 6px" }}>{s.role || data.hero.tagline}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", fontSize: "9.5px", color: "#555" }}>
            {s.email && <span>✉ {s.email}</span>}
            {s.phone && <span>📱 {s.phone}</span>}
            {s.location && <span>📍 {s.location}</span>}
            {data.hero.githubUrl && <span>⌂ {data.hero.githubUrl}</span>}
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: "20px" }}>
        {/* Left Column */}
        <div>
          {/* Skills */}
          <div style={{ marginBottom: "14px" }}>
            {sectionTitle("Skills", "#2563eb")}
            {Object.entries(skillsByCategory).map(([cat, skills]: any) => (
              <div key={cat} style={{ marginBottom: "6px" }}>
                <p style={{ fontWeight: 700, fontSize: "9.5px", color: "#0d1b2a", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 4px" }}>{cat}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "3px" }}>
                  {skills.map((sk: string) => <Tag key={sk} text={sk} bg="#eff6ff" color="#1e40af" />)}
                </div>
              </div>
            ))}
          </div>

          {/* Education */}
          {s.education && (
            <div style={{ marginBottom: "14px" }}>
              {sectionTitle("Education", "#2563eb")}
              <p style={{ fontSize: "10px", margin: 0 }}>{s.education}</p>
            </div>
          )}

          {/* Certifications */}
          {data.certifications?.length > 0 && (
            <div>
              {sectionTitle("Certifications", "#2563eb")}
              {data.certifications.slice(0, 4).map((c: any) => (
                <div key={c.id} style={{ marginBottom: "6px" }}>
                  <p style={{ fontWeight: 600, fontSize: "10px", margin: 0 }}>{c.title}</p>
                  <p style={{ fontSize: "9.5px", color: "#6b7280", margin: 0 }}>{c.issuer} · {c.date}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column */}
        <div>
          {/* Summary */}
          <div style={{ marginBottom: "14px" }}>
            {sectionTitle("Summary", "#0d1b2a")}
            <p style={{ fontSize: "10.5px", color: "#374151", margin: 0, lineHeight: 1.65 }}>{s.summary || data.hero.bio}</p>
          </div>

          {/* Experience */}
          {exp && (
            <div style={{ marginBottom: "14px" }}>
              {sectionTitle("Experience", "#0d1b2a")}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <p style={{ fontWeight: 700, fontSize: "11.5px", margin: 0 }}>{exp.role}</p>
                  <p style={{ color: "#2563eb", fontWeight: 600, margin: "2px 0" }}>{exp.company}</p>
                </div>
                <p style={{ fontSize: "9.5px", color: "#6b7280", whiteSpace: "nowrap" }}>
                  {new Date(exp.startDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })} — {exp.current ? "Present" : exp.endDate}
                </p>
              </div>
              <ul style={{ margin: "8px 0", padding: "0 0 0 14px" }}>
                {exp.projectGroups?.map((g: any) => (
                  <li key={g.groupId} style={{ marginBottom: "5px", fontSize: "10.5px", color: "#333" }}>
                    <strong>{g.groupIcon} {g.groupName}:</strong> {g.description}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Projects */}
          {data.projects?.length > 0 && (
            <div>
              {sectionTitle("Projects", "#0d1b2a")}
              {data.projects.slice(0, 3).map((p: any) => (
                <div key={p.id} style={{ marginBottom: "8px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontWeight: 700, fontSize: "11px" }}>{p.title}</span>
                    <span style={{ fontSize: "9.5px", color: "#2563eb" }}>{p.liveUrl !== "#" ? p.liveUrl : p.githubUrl}</span>
                  </div>
                  <p style={{ fontSize: "10px", color: "#555", margin: "2px 0 4px", lineHeight: 1.5 }}>{p.description.slice(0, 110)}...</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "3px" }}>
                    {p.tech.slice(0, 4).map((t: string) => <Tag key={t} text={t} bg="#dbeafe" color="#1e40af" />)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Main Component ────────────────────────────────────────────────────────────
const ResumeMaker = () => {
  const { data } = useCMS();
  const [format, setFormat] = useState("classic");
  const [settings, setSettings] = useState({
    email: "ritikjain6224@gmail.com",
    phone: "+91 XXXXXXXXXX",
    location: "Rajasthan, India",
    portfolio: "https://portfoliowebproject.vercel.app",
    role: "Full Stack Developer | Web Automation Engineer",
    summary: "Motivated Full Stack Developer and Web Automation Specialist with 6+ months of hands-on internship experience at Futurecept. Proficient in MERN stack, WordPress development, TypeScript-based Apify actors, Python web scraping, and N8N automation workflows. Passionate about building scalable systems and automating complex data pipelines.",
    education: "B.Sc. / BCA | Rajasthan University (2022–2025)",
  });
  const previewRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
    toast.success("Opening print dialog — select 'Save as PDF'");
  };

  const setField = (k: string, v: string) => setSettings(s => ({ ...s, [k]: v }));
  const inputCls = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-violet-500/50 transition-all";
  const labelCls = "text-white/50 text-xs font-medium mb-1.5 block";

  return (
    <AdminLayout>
      <style>{printStyles}</style>
      <div className="p-4 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Resume Maker</h1>
            <p className="text-white/40 text-sm">Generate ATS-optimized professional IT resumes</p>
          </div>
          <motion.button
            onClick={handlePrint}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="no-print flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-violet-500/25"
          >
            <Printer className="w-4 h-4" /> Print / Download PDF
          </motion.button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[360px_1fr] gap-6">
          {/* Settings Panel */}
          <div className="no-print space-y-5">
            {/* Format Selector */}
            <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-5">
              <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4 text-violet-400" /> Choose Format
              </h2>
              <div className="flex flex-col gap-2">
                {FORMAT_TYPES.map(f => (
                  <button
                    key={f.id}
                    onClick={() => setFormat(f.id)}
                    className={`p-3 rounded-xl border text-left transition-all flex items-start gap-3 ${format === f.id ? "border-violet-500/50 bg-violet-500/10" : "border-white/10 bg-white/5 hover:border-white/20"}`}
                  >
                    <f.icon className={`w-4 h-4 mt-0.5 shrink-0 ${format === f.id ? "text-violet-400" : "text-white/40"}`} />
                    <div>
                      <p className={`text-sm font-semibold ${format === f.id ? "text-violet-300" : "text-white/60"}`}>{f.label}</p>
                      <p className="text-white/30 text-xs mt-0.5">{f.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Personal Info */}
            <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-5 space-y-3">
              <h2 className="text-white font-semibold mb-2 flex items-center gap-2">
                <User className="w-4 h-4 text-violet-400" /> Personal Info
              </h2>
              {[
                { label: "Email", key: "email", icon: Mail },
                { label: "Phone", key: "phone", icon: Phone },
                { label: "Location", key: "location", icon: MapPin },
                { label: "Portfolio URL", key: "portfolio", icon: Globe },
                { label: "Job Title / Role", key: "role", icon: Code2 },
                { label: "Education", key: "education", icon: Layers },
              ].map(({ label, key, icon: Icon }) => (
                <div key={key}>
                  <label className={labelCls}>{label}</label>
                  <input value={(settings as any)[key]} onChange={e => setField(key, e.target.value)} className={inputCls} placeholder={label} />
                </div>
              ))}
              <div>
                <label className={labelCls}>Professional Summary</label>
                <textarea
                  value={settings.summary}
                  onChange={e => setField("summary", e.target.value)}
                  rows={5}
                  className={`${inputCls} resize-none`}
                />
              </div>
            </div>

            {/* ATS Tip */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-4">
              <p className="text-blue-400 text-xs font-bold mb-1.5">💡 ATS Pro Tips</p>
              <ul className="text-blue-300/70 text-xs space-y-1 list-disc list-inside">
                <li>Use <strong>Print → Save as PDF</strong> in Chrome</li>
                <li>Set margins to <strong>Default</strong> for best results</li>
                <li>Avoid headers/footers when printing</li>
                <li>Classic format has the best ATS pass-through</li>
              </ul>
            </div>
          </div>

          {/* Resume Preview */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-auto" style={{ minHeight: "960px" }}>
            <div
              id="resume-preview"
              ref={previewRef}
              className="p-8 sm:p-10"
              style={{ minHeight: "960px", background: "white" }}
            >
              {format === "classic" && <ClassicResume data={data} s={settings} />}
              {format === "technical" && <DeveloperResume data={data} s={settings} />}
              {format === "twocol" && <TwoColumnResume data={data} s={settings} />}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ResumeMaker;
