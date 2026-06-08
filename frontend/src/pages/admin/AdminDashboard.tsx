import { motion } from "framer-motion";
import { useCMS } from "@/contexts/CMSContext";
import { useAuth } from "@/contexts/AuthContext";
import AdminLayout from "@/components/admin/AdminLayout";
import {
  Wrench,
  FolderKanban,
  Award,
  BookOpen,
  User,
  TrendingUp,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

const StatCard = ({
  icon: Icon,
  label,
  count,
  to,
  color,
  delay,
}: {
  icon: any;
  label: string;
  count: number;
  to: string;
  color: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ y: -4, scale: 1.02 }}
    className="group"
  >
    <Link to={to} className="block">
      <div className="relative bg-white/[0.03] border border-white/8 rounded-2xl p-6 hover:border-white/15 transition-all duration-300 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
        <div className="relative z-10">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color.replace("opacity-5", "opacity-100")} flex items-center justify-center mb-4 shadow-lg`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className="text-3xl font-bold text-white mb-1">{count}</div>
          <div className="text-white/50 text-sm font-medium">{label}</div>
          <div className="flex items-center gap-1 text-violet-400 text-xs mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
            Manage <ArrowRight className="w-3 h-3" />
          </div>
        </div>
      </div>
    </Link>
  </motion.div>
);

const AdminDashboard = () => {
  const { data } = useCMS();
  const { user } = useAuth();

  const stats = [
    { icon: Wrench, label: "Skills", count: data.skills.length, to: "/admin/skills", color: "from-violet-500/5 to-violet-600/10", delay: 0.1 },
    { icon: FolderKanban, label: "Projects", count: data.projects.length, to: "/admin/projects", color: "from-blue-500/5 to-blue-600/10", delay: 0.15 },
    { icon: Award, label: "Certifications", count: data.certifications.length, to: "/admin/certifications", color: "from-amber-500/5 to-amber-600/10", delay: 0.2 },
    { icon: BookOpen, label: "Blog Posts", count: data.blogPosts.length, to: "/admin/blogs", color: "from-green-500/5 to-green-600/10", delay: 0.25 },
  ];

  const quickActions = [
    { label: "Add Skill", to: "/admin/skills", icon: Wrench, color: "violet" },
    { label: "Add Project", to: "/admin/projects", icon: FolderKanban, color: "blue" },
    { label: "Add Certification", to: "/admin/certifications", icon: Award, color: "amber" },
    { label: "Add Blog Post", to: "/admin/blogs", icon: BookOpen, color: "green" },
    { label: "Edit Hero & About", to: "/admin/hero", icon: User, color: "pink" },
  ];

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-violet-400 text-sm font-medium">Welcome back</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-1">
            Hello, {user?.name?.split(" ")[0]} 👋
          </h1>
          <p className="text-white/40">Manage your portfolio content from here.</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-5">
            <TrendingUp className="w-4 h-4 text-white/40" />
            <h2 className="text-white/60 text-sm font-medium uppercase tracking-wider">Content Overview</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s) => (
              <StatCard key={s.label} {...s} />
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mb-10"
        >
          <div className="flex items-center gap-2 mb-5">
            <Sparkles className="w-4 h-4 text-white/40" />
            <h2 className="text-white/60 text-sm font-medium uppercase tracking-wider">Quick Actions</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {quickActions.map((action, i) => (
              <Link key={action.label} to={action.to}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-violet-500/30 rounded-xl text-white/70 hover:text-white text-sm font-medium transition-all cursor-pointer"
                >
                  <action.icon className="w-4 h-4" />
                  {action.label}
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Preview cards */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Projects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/[0.02] border border-white/8 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">Recent Projects</h3>
              <Link to="/admin/projects" className="text-violet-400 hover:text-violet-300 text-xs font-medium flex items-center gap-1">
                View all <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="space-y-3">
              {data.projects.slice(0, 3).map((p) => (
                <div key={p.id} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
                  <div className="w-2 h-2 rounded-full bg-violet-400 shrink-0" />
                  <span className="text-white/70 text-sm truncate">{p.title}</span>
                  <span className="ml-auto text-white/30 text-xs shrink-0">{p.tech.length} techs</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Blog Posts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/[0.02] border border-white/8 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">Recent Blog Posts</h3>
              <Link to="/admin/blogs" className="text-violet-400 hover:text-violet-300 text-xs font-medium flex items-center gap-1">
                View all <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="space-y-3">
              {data.blogPosts.slice(0, 3).map((b) => (
                <div key={b.id} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
                  <div className="w-2 h-2 rounded-full bg-green-400 shrink-0" />
                  <span className="text-white/70 text-sm truncate">{b.title}</span>
                  <span className="ml-auto text-white/30 text-xs shrink-0">{b.readTime}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
