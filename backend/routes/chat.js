import express from 'express';
import { GoogleGenAI } from '@google/genai';
import CMSData from '../models/CMSData.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    // Initialize Gemini client here to ensure dotenv has been loaded by server.js
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: 'GEMINI_API_KEY is not configured in the backend' });
    }

    // Fetch CMS data to provide context to the AI
    const cmsData = await CMSData.findOne({ singleton_id: 'portfolio_cms_data' });
    
    let contextString = "You are an AI assistant for a personal portfolio website. Your goal is to answer questions about the portfolio owner based on the provided context. Be helpful, professional, friendly, and concise. Do not make up information that is not in the context. If you don't know the answer, politely state that you don't have that information.\n\n";
    
    if (cmsData) {
      contextString += `--- PORTFOLIO CONTEXT ---\n`;
      if (cmsData.hero) {
        contextString += `Name/Headline: ${cmsData.hero.title}\n`;
        contextString += `Subtitle/Tagline: ${cmsData.hero.subtitle}\n`;
      }
      if (cmsData.about) {
        contextString += `About Me: ${cmsData.about.description}\n`;
      }
      if (cmsData.skills && cmsData.skills.categories) {
        contextString += `Skills:\n`;
        cmsData.skills.categories.forEach(cat => {
          contextString += `- ${cat.name}: ${cat.skills.join(', ')}\n`;
        });
      }
      if (cmsData.experience && cmsData.experience.length > 0) {
        contextString += `Experience:\n`;
        cmsData.experience.forEach(exp => {
          contextString += `- ${exp.role} at ${exp.company} (${exp.duration})\n`;
        });
      }
      if (cmsData.projects && cmsData.projects.length > 0) {
        contextString += `Projects:\n`;
        cmsData.projects.forEach(proj => {
          contextString += `- ${proj.title}: ${proj.description}\n`;
        });
      }
      contextString += `--------------------------\n`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: contextString,
      }
    });

    res.json({ reply: response.text });
  } catch (error) {
    console.error('AI Chat Error:', error);
    res.status(500).json({ error: 'Failed to process chat request' });
  }
});

export default router;
