import mongoose from 'mongoose';

const caseStudySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  slug: {
    type: String,
    required: [true, 'Slug is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  client: {
    type: String,
    trim: true
  },
  industry: {
    type: String,
    trim: true
  },
  summary: {
    type: String,
    required: [true, 'Summary is required'],
    trim: true
  },
  problem: {
    type: String,
    required: [true, 'Problem description is required']
  },
  solution: {
    type: String,
    required: [true, 'Solution description is required']
  },
  challenges: {
    type: [String],
    default: []
  },
  keyFeatures: {
    type: [String],
    default: []
  },
  developmentProcess: {
    type: [String],
    default: []
  },
  outcome: {
    type: String,
    required: [true, 'Outcome is required']
  },
  techStack: {
    type: [String],
    required: true
  },
  bannerImage: {
    type: String,
    trim: true
  },
  screenshots: {
    type: [String],
    default: []
  },
  liveUrl: {
    type: String,
    trim: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const CaseStudy = mongoose.model('CaseStudy', caseStudySchema);
export default CaseStudy;
