import express from 'express';
import { 
  createContactMessage, 
  getAllContactMessages, 
  getContactMessageById, 
  deleteContactMessage 
} from '../controllers/contactController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import requireRole from '../middleware/roleMiddleware.js';

const router = express.Router();

// Public routes
router.post('/', createContactMessage);

// Admin routes
router.get('/', authMiddleware, requireRole(['admin']), getAllContactMessages);
router.get('/:id', authMiddleware, requireRole(['admin']), getContactMessageById);
router.delete('/:id', authMiddleware, requireRole(['admin']), deleteContactMessage);

export default router;
