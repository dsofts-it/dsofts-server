import express from 'express';
import { 
  createClientProject, 
  getMyClientProjects, 
  getClientProjectById 
} from '../controllers/clientProjectController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import requireRole from '../middleware/roleMiddleware.js';

const router = express.Router();

// User routes - require authentication
router.post('/', authMiddleware, requireRole(['user', 'admin']), createClientProject);
router.get('/', authMiddleware, requireRole(['user', 'admin']), getMyClientProjects);
router.get('/:id', authMiddleware, requireRole(['user', 'admin']), getClientProjectById);

export default router;
