import express from 'express';
import { getCompanySettings, updateCompanySettingsAdmin } from '../controllers/companySettingController.js';
import protect from '../middleware/authMiddleware.js';
import authorize from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/', getCompanySettings);
router.put('/admin', protect, authorize('admin'), updateCompanySettingsAdmin);

export default router;
