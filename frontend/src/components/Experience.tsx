import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useCMS } from "@/contexts/CMSContext";
import { Briefcase, MapPin, Clock, ChevronDown, ExternalLink, Calendar, Zap } from "lucide-react";

import { Card } from "@/components/ui/card";

const colorMap: Record<string, { bg: string; border: string; text: string; badge: string; dot: string }> = {
  blue:   { bg: "hover:bg-blue-500/5",   border: "border-blue-500/20 hover:border-blue-500/40",   text: "text-blue-400",   badge: "bg-blue-500/10 text-blue-300 border border-blue-500/20",   dot: "bg-blue-500" },
  yellow: { bg: "hover:bg-yellow-500/5", border: "border-yellow-500/20 hover:border-yellow-500/40", text: "text-yellow-400", badge: "bg-yellow-500/10 text-yellow-300 border border-yellow-500/20", dot: "bg-yellow-500" },
  green:  { bg: "hover:bg-green-500/5",  border: "border-green-500/20 hover:border-green-500/40",  text: "text-green-400",  badge: "bg-green-500/10 text-green-300 border border-green-500/20",  dot: "bg-green-500"  },
  purple: { bg: "hover:bg-purple-500/5", border: "border-purple-500/20 hover:border-purple-500/40", text: "text-purple-400", badge: "bg-purple-500/10 text-purple-300 border border-purple-500/20", dot: "bg-purple-500" },
  orange: { bg: "hover:bg-orange-500/5", border: "border-orange-500/20 hover:border-orange-500/40", text: "text-orange-400", badge: "bg-orange-500/10 text-orange-300 border border-orange-500/20", dot: "bg-orange-500" },
};

const ProjectCard = ({ project, color }: { project: any; color: string }) => {
  const c = colorMap[color] || colorMap.blue;
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-xl p-5 border glass-effect ${c.border} hover:-translate-y-1 transition-all duration-300 shadow-lg`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h4 className="text-white font-semibold text-sm leading-snug flex-1">{project.name}</h4>
        <div className="flex items-center gap-1 shrink-0">
          <Clock className={`w-3 h-3 ${c.text}`} />
          <span className={`text-xs font-mono ${c.text}`}>{project.hours}</span>
        </div>
      </div>
      <p className="text-white/50 text-xs leading-relaxed mb-3">{project.description}</p>
      <div className="flex flex-wrap gap-1.5">
        {project.tech.map((t: string) => (
          <span key={t} className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${c.badge}`}>{t}</span>
        ))}
      </div>
      {project.url && (
        <a href={project.url} target="_blank" rel="noopener noreferrer"
          className={`mt-2 inline-flex items-center gap-1 text-xs ${c.text} hover:underline`}>
          <ExternalLink className="w-3 h-3" /> View Project
        </a>
      )}
    </motion.div>
  );
};

const ProjectGroup = ({ group, index }: { group: any; index: number }) => {
  const [open, setOpen] = useState(index === 0);
  const c = colorMap[group.color] || colorMap.blue;
  return (
    <motion.div
      layout
      className={`rounded-2xl border ${open ? c.border : 'border-white/5'} overflow-hidden glass-effect shadow-xl transition-all duration-300 ${c.bg}`}
    >
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between p-5 transition-all`}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{group.groupIcon}</span>
          <div className="text-left">
            <h3 className={`font-bold text-sm sm:text-base ${c.text}`}>{group.groupName}</h3>
            <p className="text-white/40 text-xs">{group.projects.length} projects</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`hidden sm:block text-xs px-2 py-1 rounded-full ${c.badge}`}>
            {group.projects.reduce((acc: number, p: any) => {
              const h = parseFloat(p.hours.replace(/h.*/, "")) || 0;
              return acc + h;
            }, 0).toFixed(0)}h tracked
          </span>
          <ChevronDown className={`w-5 h-5 ${c.text} transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-5 bg-black/10 border-t border-white/5 backdrop-blur-md">
              <p className="text-white/50 text-sm mb-4 leading-relaxed">{group.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                {group.projects.map((proj: any) => (
                  <ProjectCard key={proj.projectId} project={proj} color={group.color} />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { data } = useCMS();
  const experiences = data.experience || [];

  if (experiences.length === 0) return null;

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 relative overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-0 w-96 h-96 bg-violet-600 rounded-full blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-0 w-64 h-64 bg-indigo-600 rounded-full blur-3xl"
          animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            <Zap className="w-4 h-4" /> Professional Experience
          </motion.div>
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4">
            <span className="gradient-text">Internship</span> Journey
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            6+ months of hands-on experience building real-world projects across multiple domains
          </p>
        </motion.div>

        {/* Experience Cards */}
        {experiences.map((exp, expIdx) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: expIdx * 0.2 }}
            className="mb-12"
          >
            {/* Company Header Card */}
            <div className="relative bg-gradient-to-br from-violet-900/30 via-[#0d0d18] to-indigo-900/20 border border-violet-500/20 rounded-3xl p-6 sm:p-8 mb-6 overflow-hidden">
              {/* Decorative orb */}
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-violet-600/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/30 shrink-0">
                    <Briefcase className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">{exp.company}</h3>
                    <p className="text-violet-400 font-semibold text-sm sm:text-base">{exp.role}</p>
                    <div className="flex flex-wrap gap-3 mt-1">
                      <span className="flex items-center gap-1 text-white/40 text-xs">
                        <MapPin className="w-3 h-3" /> {exp.location}
                      </span>
                      <span className="flex items-center gap-1 text-white/40 text-xs">
                        <Calendar className="w-3 h-3" />
                        {new Date(exp.startDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                        {" — "}
                        {exp.current ? (
                          <span className="text-green-400 font-medium">Present</span>
                        ) : exp.endDate ? (
                          new Date(exp.endDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })
                        ) : "Present"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row sm:flex-col items-center sm:items-end gap-3">
                  {exp.current && (
                    <span className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-medium rounded-full">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      Currently Working
                    </span>
                  )}
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full">
                    <Clock className="w-3.5 h-3.5 text-violet-400" />
                    <span className="text-white/70 text-xs font-mono font-bold">{exp.totalHours}</span>
                    <span className="text-white/30 text-xs">logged</span>
                  </div>
                </div>
              </div>

              <p className="text-white/60 text-sm leading-relaxed mb-6">{exp.description}</p>

              {/* Stats bar */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {exp.projectGroups.map((g) => {
                  const c = colorMap[g.color] || colorMap.blue;
                  return (
                    <div key={g.groupId} className={`rounded-xl p-3 text-center ${c.bg} border ${c.border}`}>
                      <div className="text-lg mb-0.5">{g.groupIcon}</div>
                      <div className={`text-xs font-bold ${c.text}`}>{g.projects.length}</div>
                      <div className="text-white/40 text-[10px] leading-tight">{g.groupName.split(" ")[0]}</div>
                    </div>
                  );
                })}
              </div>

              {exp.companyUrl && (
                <a href={exp.companyUrl} target="_blank" rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-violet-400 hover:text-violet-300 text-sm transition-colors">
                  <ExternalLink className="w-3.5 h-3.5" /> Visit Company
                </a>
              )}
            </div>

            {/* Project Groups (Accordion) */}
            <div className="space-y-3">
              {exp.projectGroups.map((group, gi) => (
                <ProjectGroup key={group.groupId} group={group} index={gi} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
