import mongoose from 'mongoose';
import dotenv from 'dotenv';
import CMSData from './models/CMSData.js';

dotenv.config();

const markdownContents = {
  "1": `
# From React.js to Next.js: Elevate Your Web Development Game

Transitioning from React to Next.js is a natural evolution for many web developers looking to build performant, SEO-friendly applications. React is fantastic for building interactive UIs, but it is fundamentally a client-side library. Next.js wraps React with a robust framework, offering features like Server-Side Rendering (SSR), Static Site Generation (SSG), and API routes out of the box.

## Why Move to Next.js?

1. **SEO Benefits**: Traditional React SPA (Single Page Applications) can struggle with SEO because the initial HTML is empty until JavaScript executes. Next.js pre-renders pages, making them instantly readable by search engine crawlers.
2. **Performance**: With automatic code splitting and optimized image loading, Next.js applications are incredibly fast.
3. **API Routes**: Instead of spinning up a separate Express server for small endpoints, you can build full-stack applications by adding functions inside the \`pages/api\` directory.

Moving to Next.js doesn't mean abandoning what you love about React; it just means adding superpowers to your development workflow.
`,
  "2": `
# How to start with React.js: A Simple Guide for Beginners

Starting with React can feel overwhelming, but at its core, it's just about building reusable UI components. 

## The Core Concepts

- **Components**: Think of components as custom HTML tags. A button, a navbar, or a whole page can be a component.
- **Props**: Short for properties, props allow you to pass data from a parent component to a child component.
- **State**: While props are passed down, state is managed internally by a component. When state changes, the component re-renders.

## Setting Up Your First Project

The easiest way to start is using Vite. Open your terminal and run:

\`\`\`bash
npm create vite@latest my-react-app -- --template react
cd my-react-app
npm install
npm run dev
\`\`\`

Start by modifying \`App.jsx\` and see your changes reflect instantly in the browser!
`,
  "3": `
# Discover HTMX: Revolutionizing Modern Web Development

For years, the trend in web development has been to move more logic to the client using massive JavaScript frameworks. HTMX is challenging this paradigm by bringing interactivity back to HTML.

HTMX allows you to access AJAX, CSS Transitions, WebSockets, and Server Sent Events directly in HTML, using attributes.

## How it works

Instead of writing a JavaScript \`fetch\` function to update a div when a button is clicked, you can simply write:

\`\`\`html
<button hx-post="/clicked" hx-swap="outerHTML">
  Click Me
</button>
\`\`\`

When clicked, HTMX sends a POST request to \`/clicked\` and replaces the button with the HTML returned by the server. This drastically reduces the JavaScript footprint of your application and shifts the state management back to the server where it belongs.
`,
  "4": `
# Mastering the MERN Stack: A Comprehensive Guide to Web Development

The MERN stack (MongoDB, Express.js, React.js, Node.js) remains one of the most popular tech stacks for building full-stack web applications. It allows developers to use a single language—JavaScript—across the entire application.

## Architectural Best Practices

1. **Separation of Concerns**: Keep your routes, controllers, and database models in separate files. This makes your backend much easier to maintain.
2. **Authentication**: Use JWT (JSON Web Tokens) for stateless authentication. Store tokens securely in HTTP-only cookies to prevent XSS attacks.
3. **State Management**: On the frontend, avoid over-engineering state. Context API is great for global state like user sessions, while local state (\`useState\`) is perfect for UI toggles.

Building a MERN app is highly rewarding because it gives you complete control over your application from the database to the pixels on the screen.
`,
  "5": `
# Building Advanced Python Scrapers: Google Maps, LinkedIn & Indeed

Web scraping is an essential skill for data engineers and automation specialists. While simple scrapers use \`BeautifulSoup\` to parse HTML, modern websites like LinkedIn and Google Maps require more advanced techniques due to dynamic loading and anti-bot measures.

## The Challenges

1. **Dynamic Content**: Many modern sites render content via JavaScript. For this, you need headless browsers like Playwright or Selenium instead of simple HTTP requests.
2. **Rate Limiting & IP Bans**: Platforms actively block IPs that make too many requests. 
3. **Structured Data Parsing**: Finding the exact JSON data buried in nested \`<script>\` tags or complex DOM structures.

## Solutions

When building a Google Maps lead scraper, I utilize **Playwright** with Python to scroll through listings and extract data asynchronously. To bypass IP bans, integrating rotating residential proxies is non-negotiable. Always remember to respect \`robots.txt\` and implement randomized delays to simulate human browsing patterns.
`,
  "6": `
# N8N Automation workflows & Apify Actors: Human-like Scraping

Automation is no longer just about scheduled cron jobs; it's about intelligent workflows that connect data sources dynamically. N8N is an incredible open-source node-based workflow automation tool.

## Creating an AI Agent Workflow

With N8N, you can create a workflow that triggers when a new email arrives, uses an OpenAI node to summarize the content, and then posts the summary to a Slack channel.

## Apify Actors & Human-like Scraping

For heavy data extraction, Apify provides a serverless platform for deploying web scrapers (Actors). To bypass sophisticated anti-bot systems like Cloudflare, your scraper must behave like a human:

- **Browser Fingerprinting**: Modify the navigator object and canvas fingerprints.
- **Mouse Movements**: Use Playwright to simulate curved, human-like mouse movements instead of teleporting the cursor.
- **Proxies**: Use Apify's proxy pools to rotate residential IPs on every request.

Combining Apify for extraction and N8N for processing gives you an enterprise-grade automation engine.
`
};

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB.");
    
    const doc = await CMSData.findOne({ singleton_id: 'portfolio_cms_data' });
    if (doc) {
      // Update each blog post with content
      const updatedBlogs = doc.blogPosts.map(blog => {
        return {
          ...blog.toObject(),
          content: markdownContents[blog.id] || "Content coming soon..."
        };
      });
      
      doc.blogPosts = updatedBlogs;
      await doc.save();
      console.log("Successfully seeded blog content to backend!");
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
