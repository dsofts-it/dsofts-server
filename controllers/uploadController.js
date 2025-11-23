import cloudinary from '../config/cloudinary.js';
import { Readable } from 'stream';

/**
 * Upload image to Cloudinary
 * @param {Buffer} fileBuffer - The file buffer from multer
 * @param {String} folder - Cloudinary folder name (e.g., 'portfolio', 'services')
 * @param {String} filename - Original filename
 * @returns {Promise<Object>} - Cloudinary upload result with secure_url
 */
export const uploadToCloudinary = (fileBuffer, folder = 'dsofts', filename) => {
  return new Promise((resolve, reject) => {
    // Create a readable stream from the buffer
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folder,
        resource_type: 'image',
        public_id: filename ? filename.split('.')[0] : undefined,
        transformation: [{ quality: 'auto', fetch_format: 'auto' }],
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      },
    );

    // Convert buffer to stream and pipe to cloudinary
    const bufferStream = Readable.from(fileBuffer);
    bufferStream.pipe(uploadStream);
  });
};

/**
 * Delete image from Cloudinary
 * @param {String} publicId - The public ID of the image to delete
 * @returns {Promise<Object>} - Cloudinary deletion result
 */
export const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    throw new Error(`Failed to delete image: ${error.message}`);
  }
};

/**
 * Upload single image endpoint
 * @route POST /api/upload/image
 * @access Private/Admin
 */
export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { folder } = req.body;
    const folderName = folder || 'dsofts';

    // Upload to Cloudinary
    const result = await uploadToCloudinary(
      req.file.buffer,
      folderName,
      req.file.originalname,
    );

    res.status(200).json({
      message: 'Image uploaded successfully',
      url: result.secure_url,
      publicId: result.public_id,
      format: result.format,
      width: result.width,
      height: result.height,
    });
  } catch (error) {
    console.error('Upload image error:', error);
    res.status(500).json({
      message: error.message || 'Failed to upload image',
    });
  }
};

/**
 * Upload multiple images endpoint
 * @route POST /api/upload/images
 * @access Private/Admin
 */
export const uploadMultipleImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    const { folder } = req.body;
    const folderName = folder || 'dsofts';

    // Upload all images to Cloudinary
    const uploadPromises = req.files.map((file) =>
      uploadToCloudinary(file.buffer, folderName, file.originalname),
    );

    const results = await Promise.all(uploadPromises);

    const uploadedImages = results.map((result) => ({
      url: result.secure_url,
      publicId: result.public_id,
      format: result.format,
      width: result.width,
      height: result.height,
    }));

    res.status(200).json({
      message: 'Images uploaded successfully',
      images: uploadedImages,
      count: uploadedImages.length,
    });
  } catch (error) {
    console.error('Upload multiple images error:', error);
    res.status(500).json({
      message: error.message || 'Failed to upload images',
    });
  }
};

/**
 * Delete image endpoint
 * @route DELETE /api/upload/image
 * @access Private/Admin
 */
export const deleteImage = async (req, res) => {
  try {
    const { publicId } = req.body;

    if (!publicId) {
      return res.status(400).json({ message: 'Public ID is required' });
    }

    const result = await deleteFromCloudinary(publicId);

    if (result.result === 'ok') {
      res.status(200).json({
        message: 'Image deleted successfully',
        publicId,
      });
    } else {
      res.status(404).json({
        message: 'Image not found or already deleted',
      });
    }
  } catch (error) {
    console.error('Delete image error:', error);
    res.status(500).json({
      message: error.message || 'Failed to delete image',
    });
  }
};
