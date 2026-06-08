import mongoose from 'mongoose';
import dotenv from 'dotenv';
import CMSData from './models/CMSData.js';

dotenv.config();

const projectsToSeed = [
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
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB.");
    
    // Find the singleton doc
    const doc = await CMSData.findOne({ singleton_id: 'portfolio_cms_data' });
    if (doc) {
      doc.projects = projectsToSeed;
      await doc.save();
      console.log("Successfully seeded projects to backend!");
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
