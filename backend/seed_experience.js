import mongoose from 'mongoose';
import dotenv from 'dotenv';
import CMSData from './models/CMSData.js';

dotenv.config();

const experienceData = [
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
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB.");
    
    const doc = await CMSData.findOne({ singleton_id: 'portfolio_cms_data' });
    if (doc) {
      doc.experience = experienceData;
      await doc.save();
      console.log("✅ Successfully seeded experience data to backend!");
    } else {
      // Create new doc with experience
      await CMSData.create({
        singleton_id: 'portfolio_cms_data',
        experience: experienceData
      });
      console.log("✅ Created new CMS doc with experience data!");
    }
    process.exit(0);
  } catch (error) {
    console.error("Error seeding:", error);
    process.exit(1);
  }
}

seed();
