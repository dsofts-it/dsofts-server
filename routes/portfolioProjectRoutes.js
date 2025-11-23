import express from 'express';
import { getProjects, getProjectBySlug } from '../controllers/portfolioProjectController.js';

const router = express.Router();

// Public routes
router.get('/', getProjects);
router.get('/:slug', getProjectBySlug);

export default router;
