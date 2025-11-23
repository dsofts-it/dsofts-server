import multer from 'multer';
import path from 'path';

// Configure multer to use memory storage (files will be stored in memory as Buffer objects)
const storage = multer.memoryStorage();

// File filter to accept only images
const fileFilter = (req, file, cb) => {
  // Allowed file extensions
  const allowedExtensions = /jpeg|jpg|png|gif|webp/;
  const extname = allowedExtensions.test(
    path.extname(file.originalname).toLowerCase(),
  );
  const mimetype = allowedExtensions.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed (jpeg, jpg, png, gif, webp)'));
  }
};

// Multer upload configuration
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max file size
  },
  fileFilter: fileFilter,
});

export default upload;
