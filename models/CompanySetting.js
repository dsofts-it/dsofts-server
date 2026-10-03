import mongoose from 'mongoose';

const companySettingSchema = new mongoose.Schema({
  companyName: {
    type: String,
    default: 'DSofts IT Services'
  },
  tagline: {
    type: String,
    default: 'Building Digital Products That Move Businesses Forward.'
  },
  heroDescription: {
    type: String,
    default: 'Web applications, mobile apps, custom software and digital solutions built for growing businesses.'
  },
  primaryEmail: {
    type: String,
    default: 'dsofts.itservices@gmail.com'
  },
  supportEmail: {
    type: String,
    default: 'dsofts.itservices@gmail.com'
  },
  careersEmail: {
    type: String,
    default: 'dsofts.itservices@gmail.com'
  },
  phone: {
    type: String,
    default: ''
  },
  address: {
    type: String,
    default: 'Pune, Maharashtra, India'
  },
  aboutSummary: {
    type: String,
    default: 'DSofts IT Services is a modern technology consulting and product engineering firm dedicated to engineering high-performance digital solutions.'
  },
  mission: {
    type: String,
    default: 'To empower ambitious businesses with scalable, secure, and intuitive digital solutions.'
  },
  vision: {
    type: String,
    default: 'To become a trusted global product development partner known for technical excellence.'
  },
  socialLinks: {
    linkedin: { type: String, default: 'https://www.linkedin.com/company/dsofts-it-services' },
    facebook: { type: String, default: 'https://facebook.com/dsoftsitservices' },
    twitter: { type: String, default: 'https://x.com/dsoftsOfficial' },
    instagram: { type: String, default: 'https://instagram.com/dsofts.in' }
  },
  stats: {
    projectsDelivered: { type: Number, default: 50 },
    happyClients: { type: Number, default: 35 },
    teamSize: { type: Number, default: 15 },
    clientRetentionRate: { type: String, default: '98%' }
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const CompanySetting = mongoose.model('CompanySetting', companySettingSchema);
export default CompanySetting;
