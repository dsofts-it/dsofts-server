import CompanySetting from '../models/CompanySetting.js';

export const getCompanySettings = async (req, res, next) => {
  try {
    let settings = await CompanySetting.findOne();
    if (!settings) {
      settings = await CompanySetting.create({});
    }
    res.json(settings);
  } catch (error) {
    next(error);
  }
};

export const updateCompanySettingsAdmin = async (req, res, next) => {
  try {
    let settings = await CompanySetting.findOne();
    if (!settings) {
      settings = await CompanySetting.create(req.body);
    } else {
      Object.assign(settings, req.body);
      settings.updatedAt = Date.now();
      await settings.save();
    }
    res.json(settings);
  } catch (error) {
    next(error);
  }
};
