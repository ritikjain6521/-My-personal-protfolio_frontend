import React, { createContext, useContext, useState, useEffect } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface Skill {
  id: string;
  name: string;
  category: string;
  color: string;
  icon?: string; // emoji fallback
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tech: string[];
  liveUrl: string;
  githubUrl: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl: string;
  badge?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  url: string;
  image: string;
}

export interface HeroData {
  name: string;
  tagline: string;
  bio: string;
  resumeUrl: string;
  githubUrl: string;
  linkedinUrl: string;
}

export interface AboutData {
  title: string;
  description1: string;
  description2: string;
  stats: { label: string; value: string }[];
}

export interface CMSData {
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  blogPosts: BlogPost[];
  hero: HeroData;
  about: AboutData;
}

// ─── Default Data ─────────────────────────────────────────────────────────────

const defaultData: CMSData = {
  skills: [
    { id: "1", name: "JavaScript", category: "Languages", color: "from-yellow-400 to-yellow-600" },
    { id: "2", name: "TypeScript", category: "Languages", color: "from-blue-400 to-blue-600" },
    { id: "3", name: "Python", category: "Languages", color: "from-green-400 to-blue-500" },
    { id: "4", name: "Java", category: "Languages", color: "from-red-400 to-red-600", icon: "☕" },
    { id: "5", name: "React.js", category: "Frontend", color: "from-cyan-400 to-cyan-600" },
    { id: "6", name: "Next.js", category: "Frontend", color: "from-gray-400 to-gray-600" },
    { id: "7", name: "Tailwind CSS", category: "Frontend", color: "from-teal-400 to-teal-600" },
    { id: "8", name: "HTML5", category: "Frontend", color: "from-orange-400 to-orange-600" },
    { id: "9", name: "CSS3", category: "Frontend", color: "from-blue-400 to-purple-600" },
    { id: "10", name: "Node.js", category: "Backend", color: "from-green-400 to-green-600" },
    { id: "11", name: "Express.js", category: "Backend", color: "from-gray-400 to-gray-600" },
    { id: "12", name: "FastAPI", category: "Backend", color: "from-green-400 to-red-600" },
    { id: "13", name: "MongoDB", category: "Database", color: "from-green-400 to-green-700" },
    { id: "14", name: "PostgreSQL", category: "Database", color: "from-blue-400 to-blue-700" },
    { id: "15", name: "MySQL", category: "Database", color: "from-blue-200 to-blue-500" },
    { id: "16", name: "Redis", category: "Database", color: "from-pink-400 to-red-600" },
    { id: "17", name: "Docker", category: "DevOps", color: "from-blue-400 to-blue-600" },
    { id: "18", name: "Git", category: "DevOps", color: "from-red-400 to-red-600" },
    { id: "19", name: "GitHub", category: "DevOps", color: "from-slate-200 to-slate-400" },
    { id: "20", name: "Vercel", category: "DevOps", color: "from-gray-400 to-gray-600" },
    { id: "21", name: "Figma", category: "Design", color: "from-purple-400 to-purple-600" },
    { id: "22", name: "Postman", category: "Tools", color: "from-orange-400 to-orange-600" },
    { id: "23", name: "OpenAI", category: "Tools", color: "from-purple-400 to-purple-600" },
    { id: "24", name: "Stripe", category: "Tools", color: "from-indigo-400 to-indigo-600" },
  ],
  projects: [
    {
      id: "1",
      title: "ABH SHOP - Full Stack E-commerce Website",
      description: "ABH SHOP is a fully responsive and feature-rich e-commerce web application where users can browse products by category and price range, view detailed product listings, and add items to their cart. Includes user authentication, admin access, dynamic price filters, and mobile-first design.",
      image: "/project1.png",
      tech: ["React.js", "TypeScript", "Bootstrap CSS", "MongoDB", "Express.js"],
      liveUrl: "https://ritikjain6521-find-a-repository-eco-omega.vercel.app/",
      githubUrl: "https://github.com/ritikjain6521/e-commerce",
    },
    {
      id: "2",
      title: "PassOP - Password Manager",
      description: "PassOP is a sleek and simple web-based password manager that allows users to securely save and manage their login credentials. Features password visibility toggle, add/edit/delete saved entries, and a clean organized password table.",
      image: "/project7.png",
      tech: ["HTML5", "CSS3", "JavaScript", "React", "Node.js"],
      liveUrl: "https://mypasswordmanager.netlify.app/",
      githubUrl: "https://github.com/ritikjain6521/e-commerce",
    },
    {
      id: "3",
      title: "My Personal Portfolio",
      description: "A fully responsive and modern portfolio website built using the MERN Stack. Showcases personal projects, skills, resume, and includes a contact form with backend integration.",
      image: "/project8.png",
      tech: ["React.js", "HTML5", "Tailwind CSS", "JavaScript", "Node.js", "Express.js", "MongoDB"],
      liveUrl: "https://portfoliowebproject.vercel.app/",
      githubUrl: "https://github.com/ritikjain6521/Portfoliowebproject",
    },
    {
      id: "4",
      title: "Full Stack Music App",
      description: "A full-featured, responsive Music Streaming Website built using the MERN stack with PostgreSQL for robust relational data management. Users can browse, play, search music, and manage playlists.",
      image: "/project9.png",
      tech: ["React.js", "Javascript", "PostgreSQL", "Bootstrap CSS", "Node.js", "Express.js"],
      liveUrl: "https://siddha-sangeet.onrender.com",
      githubUrl: "https://github.com/ritikjain6521/myfirstproject",
    },
  ],
  certifications: [
    {
      id: "1",
      title: "Full Stack Web Development",
      issuer: "Udemy",
      date: "2024-01-15",
      credentialUrl: "#",
      badge: "🏆",
    },
    {
      id: "2",
      title: "React.js Advanced Concepts",
      issuer: "Coursera",
      date: "2024-03-20",
      credentialUrl: "#",
      badge: "⚛️",
    },
    {
      id: "3",
      title: "Node.js & Express Backend",
      issuer: "freeCodeCamp",
      date: "2024-05-10",
      credentialUrl: "#",
      badge: "🟢",
    },
  ],
  blogPosts: [
    {
      id: "1",
      title: "From React.js to Next.js: Elevate Your Web Development Game",
      excerpt: "Discover how transitioning from React.js to Next.js can supercharge your web development workflow with features like server-side rendering, API routes, and built-in performance optimization.",
      date: "2024-06-04",
      readTime: "6 min read",
      tags: ["React", "Next.js", "Web Development", "Full Stack"],
      url: "#",
      image: "/blog1.png",
    },
    {
      id: "2",
      title: "How to start with React.js: A Simple Guide for Beginners",
      excerpt: "A beginner-friendly guide to help you get started with React.js. Learn the core concepts, project setup, and how to build your first interactive UI components step by step.",
      date: "2024-06-07",
      readTime: "5 min read",
      tags: ["React", "Web Development", "Javascript"],
      url: "#",
      image: "/blog2.png",
    },
    {
      id: "3",
      title: "Discover HTMX: Revolutionizing Modern Web Development",
      excerpt: "Explore how HTMX is transforming modern web development by enabling dynamic, interactive user experiences using standard HTML without relying heavily on JavaScript frameworks.",
      date: "2024-06-22",
      readTime: "6 min read",
      tags: ["HTMX", "HTML5", "Frontend", "Web Development"],
      url: "#",
      image: "/blog3.png",
    },
  ],
  hero: {
    name: "Ritik Jain",
    tagline: "Full Stack Developer & Problem Solver",
    bio: "I build scalable, performant web applications with modern technologies. Passionate about clean code, great UX, and open source.",
    resumeUrl: "#",
    githubUrl: "https://github.com/ritikjain6521",
    linkedinUrl: "#",
  },
  about: {
    title: "Full Stack Developer & Problem Solver",
    description1: "I'm a full-stack developer with 1+ years of experience building end-to-end web applications through freelance projects, internships, and hands-on work. I specialize in creating responsive front-ends, scalable back-ends, and clean, maintainable code.",
    description2: "Passionate about solving real-world problems, I enjoy exploring new technologies, contributing to open source, and mentoring fellow developers. Fueled by curiosity (and coffee), I embrace every challenge as an opportunity to learn and grow.",
    stats: [
      { label: "Projects Completed", value: "5+" },
      { label: "Cups of Coffee", value: "1000+" },
      { label: "Happy Clients", value: "10+" },
      { label: "Years Experience", value: "1+" },
    ],
  },
};

// ─── Context ──────────────────────────────────────────────────────────────────

import { useAuth } from "./AuthContext";

interface CMSContextType {
  data: CMSData;
  updateSkills: (skills: Skill[]) => void;
  updateProjects: (projects: Project[]) => void;
  updateCertifications: (certs: Certification[]) => void;
  updateBlogPosts: (posts: BlogPost[]) => void;
  updateHero: (hero: HeroData) => void;
  updateAbout: (about: AboutData) => void;
  resetToDefaults: () => void;
}

const CMSContext = createContext<CMSContextType | null>(null);

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<CMSData>(defaultData);
  const { token } = useAuth();

  useEffect(() => {
    fetch('/api/cms')
      .then(res => res.json())
      .then(resData => {
        if (resData) {
          setData({ ...defaultData, ...resData });
        }
      })
      .catch(err => console.error("Error loading CMS data:", err));
  }, []);

  const updateSection = async (endpoint: string, payload: any, stateKey: keyof CMSData) => {
    // Optimistic update
    setData(prev => ({ ...prev, [stateKey]: payload }));
    
    if (!token) return;
    try {
      await fetch(`/api/cms/${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
    } catch (err) {
      console.error(`Failed to save ${stateKey}:`, err);
    }
  };

  const updateSkills = (skills: Skill[]) => updateSection('skills', skills, 'skills');
  const updateProjects = (projects: Project[]) => updateSection('projects', projects, 'projects');
  const updateCertifications = (certifications: Certification[]) => updateSection('certifications', certifications, 'certifications');
  const updateBlogPosts = (blogPosts: BlogPost[]) => updateSection('blogs', blogPosts, 'blogPosts');
  const updateHero = (hero: HeroData) => updateSection('hero', hero, 'hero');
  const updateAbout = (about: AboutData) => updateSection('about', about, 'about');
  
  const resetToDefaults = () => {
    setData(defaultData);
    // Ideally, make an API call to reset if needed
  };

  return (
    <CMSContext.Provider value={{ data, updateSkills, updateProjects, updateCertifications, updateBlogPosts, updateHero, updateAbout, resetToDefaults }}>
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const ctx = useContext(CMSContext);
  if (!ctx) throw new Error("useCMS must be used within CMSProvider");
  return ctx;
};

export { defaultData };
