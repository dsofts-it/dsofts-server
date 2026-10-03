import BlogPost from '../models/BlogPost.js';

export const getPublicBlogPosts = async (req, res, next) => {
  try {
    const posts = await BlogPost.find({ status: 'Published' }).sort({ publishedDate: -1 });
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

export const getBlogPostBySlug = async (req, res, next) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug, status: 'Published' });
    if (!post) return res.status(404).json({ message: 'Article not found' });
    res.json(post);
  } catch (error) {
    next(error);
  }
};

export const getAllBlogPostsAdmin = async (req, res, next) => {
  try {
    const posts = await BlogPost.find().sort({ publishedDate: -1 });
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

export const createBlogPostAdmin = async (req, res, next) => {
  try {
    const { title, featuredImage, excerpt, content, author, category, tags, readTime, status, seoTitle, seoDescription } = req.body;

    const baseSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    let slug = baseSlug;
    let count = 1;
    while (await BlogPost.findOne({ slug })) {
      slug = `${baseSlug}-${count++}`;
    }

    const post = await BlogPost.create({
      title,
      slug,
      featuredImage: featuredImage || '',
      excerpt,
      content,
      author: author || 'DSofts Engineering Team',
      category: category || 'Technology',
      tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map(t => t.trim()).filter(Boolean) : []),
      readTime: readTime || '5 min read',
      status: status || 'Published',
      seoTitle: seoTitle || title,
      seoDescription: seoDescription || excerpt
    });

    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

export const updateBlogPostAdmin = async (req, res, next) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Article not found' });

    const updates = req.body;
    if (updates.tags && !Array.isArray(updates.tags)) {
      updates.tags = updates.tags.split(',').map(t => t.trim()).filter(Boolean);
    }

    Object.assign(post, updates);
    await post.save();
    res.json(post);
  } catch (error) {
    next(error);
  }
};

export const deleteBlogPostAdmin = async (req, res, next) => {
  try {
    const post = await BlogPost.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: 'Article not found' });
    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    next(error);
  }
};
