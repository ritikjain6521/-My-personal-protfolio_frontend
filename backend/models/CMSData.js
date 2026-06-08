import mongoose from 'mongoose';

const cmsDataSchema = new mongoose.Schema({
  singleton_id: { type: String, default: "portfolio_cms_data", unique: true },
  
  hero: {
    name: { type: String, default: "Ritik Jain" },
    tagline: { type: String, default: "Full Stack Developer  & Freelancer" },
    bio: { type: String, default: "Turning coffee into code and ideas into reality. I build full-stack solutions with modern web tech, a love for learning, and a passion for digital innovation." },
    githubUrl: { type: String, default: "https://github.com/ritikjain6521" },
    linkedinUrl: { type: String, default: "www.linkedin.com/in/ritik-jain-77a090267/" },
    resumeUrl: { type: String, default: "" },
    image: { type: String, default: "" },
  },

  about: {
    title: { type: String, default: "Full Stack Developer & Problem Solver" },
    description1: { type: String, default: "I'm a full-stack developer with 1+ years of experience building end-to-end web applications through freelance projects, internships, and hands-on work. I specialize in creating responsive front-ends, scalable back-ends, and clean, maintainable code and completed my internship as a web devloper in Elvate Labs." },
    description2: { type: String, default: "Passionate about solving real-world problems, I enjoy exploring new technologies, contributing to open source, and mentoring fellow developers. Fueled by curiosity (and coffee), I embrace every challenge as an opportunity to learn and grow." },
    stats: [{
      label: String,
      value: String
    }]
  },

  skills: [{
    id: String,
    name: String,
    category: String,
    color: String,
    icon: String,
  }],

  projects: [{
    id: String,
    title: String,
    description: String,
    image: String,
    video: String,
    tech: [String],
    liveUrl: String,
    githubUrl: String,
  }],

  certifications: [{
    id: String,
    title: String,
    issuer: String,
    date: String,
    credentialUrl: String,
    badge: String,
    image: String,
  }],

  blogPosts: [{
    id: String,
    title: String,
    excerpt: String,
    content: String,
    date: String,
    readTime: String,
    tags: [String],
    url: String,
    image: String,
  }],

  experience: [{
    id: String,
    company: String,
    role: String,
    startDate: String,
    endDate: String,
    current: { type: Boolean, default: false },
    location: String,
    companyUrl: String,
    description: String,
    totalHours: String,
    projectGroups: [{
      groupId: String,
      groupName: String,
      groupIcon: String,
      color: String,
      description: String,
      projects: [{
        projectId: String,
        name: String,
        description: String,
        tech: [String],
        hours: String,
        url: String,
      }]
    }]
  }]
}, { timestamps: true });

export default mongoose.model('CMSData', cmsDataSchema);
