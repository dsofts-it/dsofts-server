import express from 'express';
import {
  getPublicTestimonials,
  getAllTestimonialsAdmin,
  createTestimonialAdmin,
  updateTestimonialAdmin,
  deleteTestimonialAdmin
} from '../controllers/testimonialController.js';
import protect from '../middleware/authMiddleware.js';
import authorize from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/', getPublicTestimonials);
router.get('/admin/all', protect, authorize('admin'), getAllTestimonialsAdmin);
router.post('/admin', protect, authorize('admin'), createTestimonialAdmin);
router.put('/admin/:id', protect, authorize('admin'), updateTestimonialAdmin);
router.delete('/admin/:id', protect, authorize('admin'), deleteTestimonialAdmin);

export default router;
