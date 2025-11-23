import express from 'express';
import {
  uploadImage,
  uploadMultipleImages,
  deleteImage,
} from '../controllers/uploadController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import roleMiddleware from '../middleware/roleMiddleware.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// All upload routes require authentication and admin role
router.use(authMiddleware);
router.use(roleMiddleware(['admin']));

// @route   POST /api/upload/image
// @desc    Upload single image to Cloudinary
// @access  Private/Admin
router.post('/image', upload.single('image'), uploadImage);

// @route   POST /api/upload/images
// @desc    Upload multiple images to Cloudinary
// @access  Private/Admin
router.post('/images', upload.array('images', 10), uploadMultipleImages);

// @route   DELETE /api/upload/image
// @desc    Delete image from Cloudinary
// @access  Private/Admin
router.delete('/image', deleteImage);

export default router;
