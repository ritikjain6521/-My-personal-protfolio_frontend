import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard,
  Wrench,
  FolderKanban,
  Award,
  BookOpen,
  User,
  LogOut,
  ExternalLink,
  ChevronRight,
  Shield,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const navItems = [
  { to: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/admin/skills", icon: Wrench, label: "Skills" },
  { to: "/admin/projects", icon: FolderKanban, label: "Projects" },
  { to: "/admin/certifications", icon: Award, label: "Certifications" },
  { to: "/admin/blogs", icon: BookOpen, label: "Blog Posts" },
  { to: "/admin/hero", icon: User, label: "Hero & About" },
];

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex font-sans">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 260 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative flex flex-col bg-[#0d0d18] border-r border-white/5 overflow-hidden shrink-0 z-20"
        style={{ minHeight: "100vh" }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-6 border-b border-white/5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shrink-0 shadow-lg shadow-violet-500/30">
            <Shield className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="overflow-hidden"
            >
              <p className="text-white font-bold text-sm leading-tight">Admin Panel</p>
              <p className="text-white/40 text-xs">Portfolio CMS</p>
            </motion.div>
          )}
        </div>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-8 w-6 h-6 rounded-full bg-[#1a1a2e] border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors z-30"
        >
          <ChevronRight
            className="w-3 h-3 transition-transform duration-300"
            style={{ transform: collapsed ? "rotate(0deg)" : "rotate(180deg)" }}
          />
        </button>

        {/* Nav */}
        <nav className="flex-1 py-6 px-2 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative ${
                  isActive
                    ? "bg-gradient-to-r from-violet-500/20 to-indigo-500/10 text-violet-400 border border-violet-500/20"
                    : "text-white/50 hover:text-white hover:bg-white/5"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-transparent rounded-xl"
                    />
                  )}
                  <item.icon className="w-5 h-5 shrink-0 relative z-10" />
                  {!collapsed && (
                    <span className="text-sm font-medium relative z-10 whitespace-nowrap">{item.label}</span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Bottom actions */}
        <div className="p-3 border-t border-white/5 space-y-1">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/40 hover:text-white hover:bg-white/5 transition-all text-sm"
          >
            <ExternalLink className="w-5 h-5 shrink-0" />
            {!collapsed && <span>View Site</span>}
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-400/70 hover:text-red-400 hover:bg-red-500/10 transition-all text-sm"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>

        {/* User info */}
        {!collapsed && user && (
          <div className="px-4 py-3 border-t border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="overflow-hidden">
                <p className="text-white text-xs font-medium truncate">{user.name}</p>
                <p className="text-white/40 text-xs truncate">{user.email}</p>
              </div>
            </div>
          </div>
        )}
      </motion.aside>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <main className="min-h-screen">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
