import mongoose from 'mongoose';
import dotenv from 'dotenv';
import CMSData from './models/CMSData.js';

dotenv.config();

const blogsToSeed = [
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
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB.");
    
    // Find the singleton doc
    const doc = await CMSData.findOne({ singleton_id: 'portfolio_cms_data' });
    if (doc) {
      doc.blogPosts = blogsToSeed;
      await doc.save();
      console.log("Successfully seeded blogs to backend!");
    } else {
      console.log("No CMS document found yet.");
    }
    process.exit(0);
  } catch (error) {
    console.error("Error seeding:", error);
    process.exit(1);
  }
}

seed();
