import express from 'express';
import {
  getPublicJobs,
  getJobBySlug,
  getAllJobsAdmin,
  createJob,
  updateJob,
  deleteJob
} from '../controllers/jobController.js';
import protect from '../middleware/authMiddleware.js';
import authorize from '../middleware/roleMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getPublicJobs);
router.get('/:slug', getJobBySlug);

// Admin protected routes
router.get('/admin/all', protect, authorize('admin'), getAllJobsAdmin);
router.post('/admin', protect, authorize('admin'), createJob);
router.put('/admin/:id', protect, authorize('admin'), updateJob);
router.delete('/admin/:id', protect, authorize('admin'), deleteJob);

export default router;
