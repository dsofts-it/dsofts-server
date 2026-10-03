import express from 'express';
import {
  getPublicCaseStudies,
  getCaseStudyBySlug,
  createCaseStudyAdmin,
  updateCaseStudyAdmin,
  deleteCaseStudyAdmin
} from '../controllers/caseStudyController.js';
import protect from '../middleware/authMiddleware.js';
import authorize from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/', getPublicCaseStudies);
router.get('/:slug', getCaseStudyBySlug);

router.post('/admin', protect, authorize('admin'), createCaseStudyAdmin);
router.put('/admin/:id', protect, authorize('admin'), updateCaseStudyAdmin);
router.delete('/admin/:id', protect, authorize('admin'), deleteCaseStudyAdmin);

export default router;
