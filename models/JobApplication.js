import mongoose from 'mongoose';

const jobApplicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: [true, 'Associated job ID is required']
  },
  jobTitle: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  location: {
    type: String,
    trim: true
  },
  qualification: {
    type: String,
    trim: true
  },
  experienceYears: {
    type: String,
    trim: true
  },
  currentSalary: {
    type: String,
    trim: true
  },
  expectedSalary: {
    type: String,
    trim: true
  },
  noticePeriod: {
    type: String,
    trim: true
  },
  skills: {
    type: [String],
    default: []
  },
  linkedinUrl: {
    type: String,
    trim: true
  },
  githubUrl: {
    type: String,
    trim: true
  },
  portfolioUrl: {
    type: String,
    trim: true
  },
  coverLetter: {
    type: String,
    trim: true
  },
  resumePath: {
    type: String,
    required: [true, 'Resume path or URL is required']
  },
  originalFileName: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['New', 'Under Review', 'Shortlisted', 'Interview', 'Selected', 'Rejected'],
    default: 'New'
  },
  internalNotes: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const JobApplication = mongoose.model('JobApplication', jobApplicationSchema);
export default JobApplication;
