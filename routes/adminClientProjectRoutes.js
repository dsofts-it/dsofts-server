import express from 'express';
import { 
  getAllClientProjects, 
  getClientProjectAdmin, 
  updateClientProjectAdmin 
} from '../controllers/adminClientProjectController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import requireRole from '../middleware/roleMiddleware.js';

const router = express.Router();

// Admin routes - all require authentication and admin role
router.get('/', authMiddleware, requireRole(['admin']), getAllClientProjects);
router.get('/:id', authMiddleware, requireRole(['admin']), getClientProjectAdmin);
router.put('/:id', authMiddleware, requireRole(['admin']), updateClientProjectAdmin);

export default router;
