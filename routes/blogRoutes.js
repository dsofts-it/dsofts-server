import express from 'express';
import {
  getPublicBlogPosts,
  getBlogPostBySlug,
  getAllBlogPostsAdmin,
  createBlogPostAdmin,
  updateBlogPostAdmin,
  deleteBlogPostAdmin
} from '../controllers/blogController.js';
import protect from '../middleware/authMiddleware.js';
import authorize from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/', getPublicBlogPosts);
router.get('/:slug', getBlogPostBySlug);

router.get('/admin/all', protect, authorize('admin'), getAllBlogPostsAdmin);
router.post('/admin', protect, authorize('admin'), createBlogPostAdmin);
router.put('/admin/:id', protect, authorize('admin'), updateBlogPostAdmin);
router.delete('/admin/:id', protect, authorize('admin'), deleteBlogPostAdmin);

export default router;
