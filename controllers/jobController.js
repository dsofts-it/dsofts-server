import Job from '../models/Job.js';

// Public: Get all published jobs
export const getPublicJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find({ status: 'Published' }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    next(error);
  }
};

// Public: Get single job by slug
export const getJobBySlug = async (req, res, next) => {
  try {
    const job = await Job.findOne({ slug: req.params.slug, status: 'Published' });
    if (!job) {
      return res.status(404).json({ message: 'Job opening not found' });
    }
    res.json(job);
  } catch (error) {
    next(error);
  }
};

// Admin: Get all jobs (including Drafts and Closed)
export const getAllJobsAdmin = async (req, res, next) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    next(error);
  }
};

// Admin: Create job
export const createJob = async (req, res, next) => {
  try {
    const { title, department, location, workType, experience, salary, description, responsibilities, requirements, skills, benefits, deadline, status } = req.body;
    
    // Generate slug
    const baseSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    let slug = baseSlug;
    let count = 1;
    while (await Job.findOne({ slug })) {
      slug = `${baseSlug}-${count++}`;
    }

    const job = await Job.create({
      title,
      slug,
      department,
      location,
      workType,
      experience,
      salary,
      description,
      responsibilities: Array.isArray(responsibilities) ? responsibilities : (responsibilities ? responsibilities.split('\n').filter(Boolean) : []),
      requirements: Array.isArray(requirements) ? requirements : (requirements ? requirements.split('\n').filter(Boolean) : []),
      skills: Array.isArray(skills) ? skills : (skills ? skills.split(',').map(s => s.trim()).filter(Boolean) : []),
      benefits: Array.isArray(benefits) ? benefits : (benefits ? benefits.split('\n').filter(Boolean) : []),
      deadline: deadline || null,
      status: status || 'Published'
    });

    res.status(201).json(job);
  } catch (error) {
    next(error);
  }
};

// Admin: Update job
export const updateJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    const fieldsToUpdate = req.body;
    if (fieldsToUpdate.responsibilities && !Array.isArray(fieldsToUpdate.responsibilities)) {
      fieldsToUpdate.responsibilities = fieldsToUpdate.responsibilities.split('\n').filter(Boolean);
    }
    if (fieldsToUpdate.requirements && !Array.isArray(fieldsToUpdate.requirements)) {
      fieldsToUpdate.requirements = fieldsToUpdate.requirements.split('\n').filter(Boolean);
    }
    if (fieldsToUpdate.skills && !Array.isArray(fieldsToUpdate.skills)) {
      fieldsToUpdate.skills = fieldsToUpdate.skills.split(',').map(s => s.trim()).filter(Boolean);
    }
    if (fieldsToUpdate.benefits && !Array.isArray(fieldsToUpdate.benefits)) {
      fieldsToUpdate.benefits = fieldsToUpdate.benefits.split('\n').filter(Boolean);
    }

    Object.assign(job, fieldsToUpdate);
    job.updatedAt = Date.now();

    await job.save();
    res.json(job);
  } catch (error) {
    next(error);
  }
};

// Admin: Delete job
export const deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json({ message: 'Job removed successfully' });
  } catch (error) {
    next(error);
  }
};
