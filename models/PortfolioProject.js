import mongoose from 'mongoose';

const portfolioProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true
  },
  slug: {
    type: String,
    required: [true, 'Slug is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  thumbnailImageUrl: {
    type: String,
    trim: true
  },
  bannerImageUrl: {
    type: String,
    trim: true
  },
  shortDescription: {
    type: String,
    required: [true, 'Short description is required'],
    trim: true
  },
  fullDescription: {
    type: String,
    required: [true, 'Full description is required']
  },
  techStack: {
    type: [String],
    required: [true, 'Tech stack is required'],
    validate: {
      validator: function(v) {
        return v && v.length > 0;
      },
      message: 'Tech stack must contain at least one technology'
    }
  },
  clientName: {
    type: String,
    trim: true
  },
  clientRating: {
    type: Number,
    min: 0,
    max: 5
  },
  websiteUrl: {
    type: String,
    trim: true
  },
  completedAt: {
    type: Date
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
portfolioProjectSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Update the updatedAt field before updating
portfolioProjectSchema.pre('findOneAndUpdate', function(next) {
  this.set({ updatedAt: Date.now() });
  next();
});

const PortfolioProject = mongoose.model('PortfolioProject', portfolioProjectSchema, 'portfolio_projects');

export default PortfolioProject;
