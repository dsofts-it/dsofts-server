import CaseStudy from '../models/CaseStudy.js';

export const getPublicCaseStudies = async (req, res, next) => {
  try {
    const studies = await CaseStudy.find().sort({ createdAt: -1 });
    res.json(studies);
  } catch (error) {
    next(error);
  }
};

export const getCaseStudyBySlug = async (req, res, next) => {
  try {
    const study = await CaseStudy.findOne({ slug: req.params.slug });
    if (!study) return res.status(404).json({ message: 'Case study not found' });
    res.json(study);
  } catch (error) {
    next(error);
  }
};

export const createCaseStudyAdmin = async (req, res, next) => {
  try {
    const { title, client, industry, summary, problem, solution, challenges, keyFeatures, developmentProcess, outcome, techStack, bannerImage, screenshots, liveUrl, isFeatured } = req.body;
    
    const baseSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    let slug = baseSlug;
    let count = 1;
    while (await CaseStudy.findOne({ slug })) {
      slug = `${baseSlug}-${count++}`;
    }

    const study = await CaseStudy.create({
      title,
      slug,
      client,
      industry,
      summary,
      problem,
      solution,
      challenges: Array.isArray(challenges) ? challenges : (challenges ? challenges.split('\n').filter(Boolean) : []),
      keyFeatures: Array.isArray(keyFeatures) ? keyFeatures : (keyFeatures ? keyFeatures.split('\n').filter(Boolean) : []),
      developmentProcess: Array.isArray(developmentProcess) ? developmentProcess : (developmentProcess ? developmentProcess.split('\n').filter(Boolean) : []),
      outcome,
      techStack: Array.isArray(techStack) ? techStack : (techStack ? techStack.split(',').map(s => s.trim()).filter(Boolean) : []),
      bannerImage: bannerImage || '',
      screenshots: Array.isArray(screenshots) ? screenshots : [],
      liveUrl: liveUrl || '',
      isFeatured: !!isFeatured
    });

    res.status(201).json(study);
  } catch (error) {
    next(error);
  }
};

export const updateCaseStudyAdmin = async (req, res, next) => {
  try {
    const study = await CaseStudy.findById(req.params.id);
    if (!study) return res.status(404).json({ message: 'Case study not found' });

    const updates = req.body;
    if (updates.challenges && !Array.isArray(updates.challenges)) updates.challenges = updates.challenges.split('\n').filter(Boolean);
    if (updates.keyFeatures && !Array.isArray(updates.keyFeatures)) updates.keyFeatures = updates.keyFeatures.split('\n').filter(Boolean);
    if (updates.developmentProcess && !Array.isArray(updates.developmentProcess)) updates.developmentProcess = updates.developmentProcess.split('\n').filter(Boolean);
    if (updates.techStack && !Array.isArray(updates.techStack)) updates.techStack = updates.techStack.split(',').map(s => s.trim()).filter(Boolean);

    Object.assign(study, updates);
    await study.save();
    res.json(study);
  } catch (error) {
    next(error);
  }
};

export const deleteCaseStudyAdmin = async (req, res, next) => {
  try {
    const study = await CaseStudy.findByIdAndDelete(req.params.id);
    if (!study) return res.status(404).json({ message: 'Case study not found' });
    res.json({ message: 'Case study deleted' });
  } catch (error) {
    next(error);
  }
};
