import JobApplication from '../models/JobApplication.js';
import Job from '../models/Job.js';
import path from 'path';
import fs from 'fs';

// Public: Submit Job Application
export const submitApplication = async (req, res, next) => {
  try {
    const { jobId, fullName, email, phone, location, qualification, experienceYears, currentSalary, expectedSalary, noticePeriod, skills, linkedinUrl, githubUrl, portfolioUrl, coverLetter } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Resume document (PDF/DOC/DOCX) is required' });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'The specified job opening was not found' });
    }

    const application = await JobApplication.create({
      jobId: job._id,
      jobTitle: job.title,
      fullName,
      email,
      phone,
      location: location || '',
      qualification: qualification || '',
      experienceYears: experienceYears || '',
      currentSalary: currentSalary || '',
      expectedSalary: expectedSalary || '',
      noticePeriod: noticePeriod || '',
      skills: Array.isArray(skills) ? skills : (skills ? skills.split(',').map(s => s.trim()).filter(Boolean) : []),
      linkedinUrl: linkedinUrl || '',
      githubUrl: githubUrl || '',
      portfolioUrl: portfolioUrl || '',
      coverLetter: coverLetter || '',
      resumePath: req.file.path,
      originalFileName: req.file.originalname,
      status: 'New'
    });

    res.status(201).json({
      message: 'Application submitted successfully. Our hiring team will review your profile and get in touch!',
      applicationId: application._id
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Get all applications
export const getApplicationsAdmin = async (req, res, next) => {
  try {
    const { jobId, status } = req.query;
    const filter = {};
    if (jobId) filter.jobId = jobId;
    if (status) filter.status = status;

    const applications = await JobApplication.find(filter).sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    next(error);
  }
};

// Admin: Get single application details
export const getApplicationByIdAdmin = async (req, res, next) => {
  try {
    const application = await JobApplication.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.json(application);
  } catch (error) {
    next(error);
  }
};

// Admin: Update status / notes
export const updateApplicationAdmin = async (req, res, next) => {
  try {
    const { status, internalNotes } = req.body;
    const application = await JobApplication.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    if (status) application.status = status;
    if (internalNotes !== undefined) application.internalNotes = internalNotes;

    await application.save();
    res.json(application);
  } catch (error) {
    next(error);
  }
};

// Admin: Securely download candidate resume
export const downloadResumeAdmin = async (req, res, next) => {
  try {
    const application = await JobApplication.findById(req.params.id);
    if (!application || !application.resumePath) {
      return res.status(404).json({ message: 'Resume file not found' });
    }

    if (!fs.existsSync(application.resumePath)) {
      return res.status(404).json({ message: 'File missing from server storage' });
    }

    res.download(application.resumePath, application.originalFileName || 'Resume.pdf');
  } catch (error) {
    next(error);
  }
};

// Admin: Delete application
export const deleteApplicationAdmin = async (req, res, next) => {
  try {
    const application = await JobApplication.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Delete file if exists
    if (application.resumePath && fs.existsSync(application.resumePath)) {
      fs.unlinkSync(application.resumePath);
    }

    await JobApplication.findByIdAndDelete(req.params.id);
    res.json({ message: 'Application deleted successfully' });
  } catch (error) {
    next(error);
  }
};
