import express from 'express';
import {
  submitApplication,
  getApplicationsAdmin,
  getApplicationByIdAdmin,
  updateApplicationAdmin,
  downloadResumeAdmin,
  deleteApplicationAdmin
} from '../controllers/jobApplicationController.js';
import uploadResume from '../middleware/uploadResume.js';
import protect from '../middleware/authMiddleware.js';
import authorize from '../middleware/roleMiddleware.js';

const router = express.Router();

// Public application submission with single resume upload
router.post('/apply', uploadResume.single('resume'), submitApplication);

// Protected Admin management routes
router.get('/admin', protect, authorize('admin'), getApplicationsAdmin);
router.get('/admin/:id', protect, authorize('admin'), getApplicationByIdAdmin);
router.put('/admin/:id', protect, authorize('admin'), updateApplicationAdmin);
router.get('/admin/:id/resume', protect, authorize('admin'), downloadResumeAdmin);
router.delete('/admin/:id', protect, authorize('admin'), deleteApplicationAdmin);

export default router;
