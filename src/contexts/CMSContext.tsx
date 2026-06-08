import React, { createContext, useContext, useState, useEffect } from "react";
import { API_BASE } from "@/lib/api";

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
  video?: string;
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
  image?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
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
  image?: string;
}

export interface AboutData {
  title: string;
  description1: string;
  description2: string;
  stats: { label: string; value: string }[];
}

export interface ExperienceProject {
  projectId: string;
  name: string;
  description: string;
  tech: string[];
  hours: string;
  url: string;
}

export interface ProjectGroup {
  groupId: string;
  groupName: string;
  groupIcon: string;
  color: string;
  description: string;
  projects: ExperienceProject[];
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  current: boolean;
  location: string;
  companyUrl: string;
  description: string;
  totalHours: string;
  projectGroups: ProjectGroup[];
}

export interface CMSData {
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  blogPosts: BlogPost[];
  hero: HeroData;
  about: AboutData;
  experience: Experience[];
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
    {
      id: "5",
      title: "Real-Time Chat Application",
      description: "A full-stack real-time chat application featuring instant messaging, online user presence, typing indicators, and individual or group chat functionalities using WebSockets.",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop",
      tech: ["React.js", "Node.js", "Express.js", "Socket.io", "MongoDB", "Tailwind CSS"],
      liveUrl: "#",
      githubUrl: "https://github.com/ritikjain6521",
    },
    {
      id: "6",
      title: "Task Manager Pro",
      description: "A comprehensive project and task management dashboard designed to help teams organize workflows, assign tasks, track progress with Kanban boards, and meet deadlines effectively.",
      image: "https://images.unsplash.com/photo-1611224885990-ab7363d1f2a9?q=80&w=1000&auto=format&fit=crop",
      tech: ["Next.js", "TypeScript", "Redux Toolkit", "Node.js", "MongoDB", "Prisma"],
      liveUrl: "#",
      githubUrl: "https://github.com/ritikjain6521",
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
    {
      id: "4",
      title: "Mastering the MERN Stack: A Comprehensive Guide to Web Development",
      excerpt: "Dive deep into modern MERN stack development. Learn how to architect scalable applications, integrate robust authentication, and deploy production-ready web apps efficiently.",
      date: "2024-08-12",
      readTime: "8 min read",
      tags: ["MERN", "React", "Node.js", "MongoDB"],
      url: "#",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: "5",
      title: "Building Advanced Python Scrapers: Google Maps, LinkedIn & Indeed",
      excerpt: "Learn how to build powerful Python scrapers for extracting structured leads and job postings from platforms like Google Maps, Indeed, and LinkedIn while handling rate limits.",
      date: "2024-09-05",
      readTime: "10 min read",
      tags: ["Python", "Web Scraping", "Data Extraction", "Automation"],
      url: "#",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: "6",
      title: "N8N Automation workflows & Apify Actors: Human-like Scraping",
      excerpt: "Explore how to create AI agents and automation workflows using N8N, and build Apify Actors with Cheerio and Playwright to simulate human-like behavior and bypass IP blocks using residential proxies.",
      date: "2024-10-18",
      readTime: "12 min read",
      tags: ["N8N", "Apify", "Playwright", "Proxies", "Automation"],
      url: "#",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop",
    },
  ],
  hero: {
    name: "Ritik Jain",
    tagline: "Full Stack Developer & Problem Solver",
    bio: "I build scalable, performant web applications with modern technologies. Passionate about clean code, great UX, and open source.",
    resumeUrl: "#",
    githubUrl: "https://github.com/ritikjain6521",
    linkedinUrl: "#",
    image: "",
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
  experience: [
    {
      id: "1",
      company: "Futurecept",
      role: "Web Developer Intern",
      startDate: "2024-12-01",
      endDate: "",
      current: true,
      location: "Remote",
      companyUrl: "https://futurecept.com",
      description: "Working as a Web Developer Intern at Futurecept for 6+ months. Contributed to a wide variety of projects including WordPress development, TypeScript-based Apify actors, Python scrapers, N8N automation workflows, and a full CRM platform.",
      totalHours: "5864h+",
      projectGroups: [
        {
          groupId: "g1",
          groupName: "WordPress Projects",
          groupIcon: "🟦",
          color: "blue",
          description: "Developed and customized WordPress themes and managed client site changes for multiple international clients.",
          projects: [
            { projectId: "p1", name: "SKT Blog Theme Development", description: "Custom theme development for SKT Blog platform including custom post types, widgets, and responsive layouts.", tech: ["WordPress", "PHP", "CSS", "JavaScript"], hours: "40h+", url: "" },
            { projectId: "p2", name: "Kirkwood Mountain Getaway", description: "Full Jira-tracked client change requests including UI updates, plugin configuration, and content management.", tech: ["WordPress", "PHP", "Jira"], hours: "107h 07m", url: "" },
            { projectId: "p3", name: "The Return Stays", description: "Client-requested UI/UX changes, booking system adjustments, and mobile responsiveness improvements.", tech: ["WordPress", "Elementor", "CSS"], hours: "78h 52m", url: "" },
            { projectId: "p4", name: "Arkstone Website", description: "Comprehensive client changes including custom page layouts, plugin integrations, and performance optimization.", tech: ["WordPress", "PHP", "Elementor"], hours: "116h 52m", url: "" },
            { projectId: "p5", name: "Fabian Website", description: "WordPress website development with custom design, responsive layouts, and client-specific features.", tech: ["WordPress", "CSS", "JavaScript"], hours: "32h 33m", url: "" },
            { projectId: "p6", name: "Dunne Real Estate", description: "Real estate website with property listings, contact forms, and agent profile management.", tech: ["WordPress", "PHP", "CSS"], hours: "28h 00m", url: "" },
            { projectId: "p7", name: "Hyperstaff", description: "Staff management platform with custom WordPress development, job listings, and application tracking.", tech: ["WordPress", "PHP", "JavaScript"], hours: "127h 51m", url: "" },
          ]
        },
        {
          groupId: "g2",
          groupName: "Apify Actors (TypeScript)",
          groupIcon: "⚡",
          color: "yellow",
          description: "Built high-performance web scraping actors using TypeScript on the Apify platform for data extraction from major platforms.",
          projects: [
            { projectId: "p8", name: "Google Maps Scraper", description: "Extracts business listings, reviews, contact info, and coordinates from Google Maps at scale.", tech: ["TypeScript", "Apify", "Puppeteer", "Node.js"], hours: "100h+", url: "" },
            { projectId: "p9", name: "Indeed Job Scraper", description: "Scrapes job listings, company details, salary data, and application links from Indeed.", tech: ["TypeScript", "Apify", "Cheerio", "Node.js"], hours: "80h+", url: "" },
            { projectId: "p10", name: "LinkedIn Scraper", description: "Extracts professional profiles, company pages, and job postings from LinkedIn.", tech: ["TypeScript", "Apify", "Playwright", "Node.js"], hours: "187h+", url: "" },
          ]
        },
        {
          groupId: "g3",
          groupName: "Python Scrapers",
          groupIcon: "🐍",
          color: "green",
          description: "Developed production-grade Python scrapers for extracting structured data from multiple platforms.",
          projects: [
            { projectId: "p11", name: "LinkedIn Python Scraper", description: "Python-based scraper for LinkedIn profiles, company pages, and job listings with proxy rotation.", tech: ["Python", "Selenium", "BeautifulSoup", "Requests"], hours: "150h+", url: "" },
            { projectId: "p12", name: "Indeed Python Scraper", description: "Automated data extraction from Indeed job listings with pagination and structured JSON output.", tech: ["Python", "Scrapy", "Requests", "Pandas"], hours: "100h+", url: "" },
            { projectId: "p13", name: "Yellow Pages Scraper", description: "Business directory scraper extracting names, addresses, phone numbers, and categories.", tech: ["Python", "BeautifulSoup", "Requests"], hours: "80h+", url: "" },
            { projectId: "p14", name: "Google Search Engine Scraper", description: "Custom Google SERP scraper for keyword ranking, featured snippets, and organic result extraction.", tech: ["Python", "Selenium", "Requests", "JSON"], hours: "499h+", url: "" },
          ]
        },
        {
          groupId: "g4",
          groupName: "N8N Automation Workflows",
          groupIcon: "⚙️",
          color: "purple",
          description: "Built automated workflows using N8N for LinkedIn outreach, email verification, and content generation pipelines.",
          projects: [
            { projectId: "p15", name: "LinkedIn Automation Content Research", description: "Automated LinkedIn content research and post scheduling workflow for lead generation.", tech: ["N8N", "LinkedIn API", "OpenAI"], hours: "0h 05m", url: "" },
            { projectId: "p16", name: "Email Verifier", description: "Automated email verification pipeline integrating SMTP checks, DNS lookup, and bounce rate detection.", tech: ["N8N", "SMTP", "DNS", "JavaScript"], hours: "22h 01m", url: "" },
          ]
        },
        {
          groupId: "g5",
          groupName: "CRM & Active Projects",
          groupIcon: "📊",
          color: "orange",
          description: "Currently working on the CRM360 blog generation platform and graphic design workflows using Canva integration.",
          projects: [
            { projectId: "p17", name: "CRM360 Blog Generation Project", description: "AI-powered blog content generation system integrated with a CRM platform, automating content pipelines and publishing workflows.", tech: ["Node.js", "OpenAI", "MongoDB", "N8N", "Canva API"], hours: "230h 56m", url: "" },
            { projectId: "p18", name: "HelioX Website", description: "Full website development and deployment for HelioX client.", tech: ["WordPress", "JavaScript", "CSS"], hours: "21h 26m", url: "" },
            { projectId: "p19", name: "John & Samuel STR Website", description: "Short-term rental website development with booking system integration.", tech: ["WordPress", "PHP", "CSS"], hours: "30h 44m", url: "" },
          ]
        },
      ]
    }
  ],
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
  updateExperience: (exp: Experience[]) => void;
  resetToDefaults: () => void;
}

const CMSContext = createContext<CMSContextType | null>(null);

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<CMSData>(defaultData);
  const { token } = useAuth();

  useEffect(() => {
    fetch(`${API_BASE}/api/cms`)
      .then(res => res.json())
      .then(resData => {
        if (resData) {
          // Smart merge: only use backend value if it's a non-empty array / non-null object
          const merged: CMSData = { ...defaultData };
          (Object.keys(resData) as (keyof CMSData)[]).forEach((key) => {
            const val = resData[key];
            if (Array.isArray(val) && val.length > 0) {
              (merged as any)[key] = val;
            } else if (!Array.isArray(val) && val !== null && typeof val === 'object' && Object.keys(val).length > 0) {
              (merged as any)[key] = val;
            } else if (typeof val === 'string' && val.length > 0) {
              (merged as any)[key] = val;
            }
          });
          setData(merged);
        }
      })
      .catch(err => console.error("Error loading CMS data:", err));
  }, []);

  const updateSection = async (endpoint: string, payload: any, stateKey: keyof CMSData) => {
    // Optimistic update
    setData(prev => ({ ...prev, [stateKey]: payload }));
    
    if (!token) return;
    try {
      await fetch(`${API_BASE}/api/cms/${endpoint}`, {
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
  const updateExperience = (experience: Experience[]) => updateSection('experience', experience, 'experience');
  
  const resetToDefaults = () => {
    setData(defaultData);
    // Ideally, make an API call to reset if needed
  };

  return (
    <CMSContext.Provider value={{ data, updateSkills, updateProjects, updateCertifications, updateBlogPosts, updateHero, updateAbout, updateExperience, resetToDefaults }}>
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
