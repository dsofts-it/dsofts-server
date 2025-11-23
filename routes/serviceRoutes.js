import express from 'express';
import { 
  getServices, 
  createService, 
  updateService, 
  deleteService 
} from '../controllers/serviceController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import requireRole from '../middleware/roleMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getServices);

// Admin routes
router.post('/', authMiddleware, requireRole(['admin']), createService);
router.put('/:id', authMiddleware, requireRole(['admin']), updateService);
router.delete('/:id', authMiddleware, requireRole(['admin']), deleteService);

export default router;
