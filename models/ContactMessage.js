import mongoose from 'mongoose';

const contactMessageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
  },
  message: {
    type: String,
    required: [true, 'Message is required']
  },
  phone: {
    type: String,
    trim: true
  },
  company: {
    type: String,
    trim: true
  },
  service: {
    type: String,
    trim: true
  },
  budget: {
    type: String,
    trim: true
  },
  timeline: {
    type: String,
    trim: true
  },
  targetEmail: {
    type: String,
    default: 'dsofts.itservices@gmail.com'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const ContactMessage = mongoose.model('ContactMessage', contactMessageSchema, 'contact_messages');

export default ContactMessage;
