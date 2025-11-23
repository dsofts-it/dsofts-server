import mongoose from 'mongoose';

const clientProjectSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  referencePortfolioProjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PortfolioProject'
  },
  projectTitle: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true
  },
  projectDescription: {
    type: String,
    required: [true, 'Project description is required']
  },
  estimatedBudget: {
    type: Number,
    min: 0
  },
  status: {
    type: String,
    enum: ['new', 'in_discussion', 'in_progress', 'deployed', 'cancelled'],
    default: 'new'
  },
  deploymentUrl: {
    type: String,
    trim: true
  },
  notesFromAdmin: {
    type: String
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
clientProjectSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Update the updatedAt field before updating
clientProjectSchema.pre('findOneAndUpdate', function(next) {
  this.set({ updatedAt: Date.now() });
  next();
});

const ClientProject = mongoose.model('ClientProject', clientProjectSchema, 'client_projects');

export default ClientProject;
