import mongoose from 'mongoose';

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Article title is required'],
    trim: true
  },
  slug: {
    type: String,
    required: [true, 'Slug is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  featuredImage: {
    type: String,
    trim: true
  },
  excerpt: {
    type: String,
    required: [true, 'Excerpt is required'],
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  author: {
    type: String,
    default: 'DSofts Team',
    trim: true
  },
  category: {
    type: String,
    default: 'Technology',
    trim: true
  },
  tags: {
    type: [String],
    default: []
  },
  readTime: {
    type: String,
    default: '5 min read'
  },
  status: {
    type: String,
    enum: ['Draft', 'Published'],
    default: 'Published'
  },
  publishedDate: {
    type: Date,
    default: Date.now
  },
  seoTitle: {
    type: String,
    trim: true
  },
  seoDescription: {
    type: String,
    trim: true
  }
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);
export default BlogPost;
