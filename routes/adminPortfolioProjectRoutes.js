import express from 'express';
import { 
  createProject, 
  updateProject, 
  deleteProject 
} from '../controllers/portfolioProjectController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import requireRole from '../middleware/roleMiddleware.js';

const router = express.Router();

// Admin routes - all require authentication and admin role
router.post('/', authMiddleware, requireRole(['admin']), createProject);
router.put('/:id', authMiddleware, requireRole(['admin']), updateProject);
router.delete('/:id', authMiddleware, requireRole(['admin']), deleteProject);

export default router;
