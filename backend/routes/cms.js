import express from 'express';
import jwt from 'jsonwebtoken';
import CMSData from '../models/CMSData.js';

const router = express.Router();

// Middleware to verify JWT token
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET || 'supersecretportfoliojwtkey_1234');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// GET full CMS Data
router.get('/', async (req, res) => {
  try {
    let data = await CMSData.findOne({ singleton_id: 'portfolio_cms_data' });
    
    // If no data exists, create default
    if (!data) {
      data = new CMSData();
      await data.save();
    }
    
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update Hero
router.put('/hero', authMiddleware, async (req, res) => {
  try {
    const data = await CMSData.findOneAndUpdate(
      { singleton_id: 'portfolio_cms_data' },
      { $set: { hero: req.body } },
      { new: true, upsert: true }
    );
    res.json(data.hero);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update About
router.put('/about', authMiddleware, async (req, res) => {
  try {
    const data = await CMSData.findOneAndUpdate(
      { singleton_id: 'portfolio_cms_data' },
      { $set: { about: req.body } },
      { new: true, upsert: true }
    );
    res.json(data.about);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update Skills
router.put('/skills', authMiddleware, async (req, res) => {
  try {
    const data = await CMSData.findOneAndUpdate(
      { singleton_id: 'portfolio_cms_data' },
      { $set: { skills: req.body } },
      { new: true, upsert: true }
    );
    res.json(data.skills);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update Projects
router.put('/projects', authMiddleware, async (req, res) => {
  try {
    const data = await CMSData.findOneAndUpdate(
      { singleton_id: 'portfolio_cms_data' },
      { $set: { projects: req.body } },
      { new: true, upsert: true }
    );
    res.json(data.projects);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update Certifications
router.put('/certifications', authMiddleware, async (req, res) => {
  try {
    const data = await CMSData.findOneAndUpdate(
      { singleton_id: 'portfolio_cms_data' },
      { $set: { certifications: req.body } },
      { new: true, upsert: true }
    );
    res.json(data.certifications);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update Blogs
router.put('/blogs', authMiddleware, async (req, res) => {
  try {
    const data = await CMSData.findOneAndUpdate(
      { singleton_id: 'portfolio_cms_data' },
      { $set: { blogPosts: req.body } },
      { new: true, upsert: true }
    );
    res.json(data.blogPosts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update Experience
router.put('/experience', authMiddleware, async (req, res) => {
  try {
    const data = await CMSData.findOneAndUpdate(
      { singleton_id: 'portfolio_cms_data' },
      { $set: { experience: req.body } },
      { new: true, upsert: true }
    );
    res.json(data.experience);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
