import Testimonial from '../models/Testimonial.js';

export const getPublicTestimonials = async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find({ isFeatured: true }).sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    next(error);
  }
};

export const getAllTestimonialsAdmin = async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    next(error);
  }
};

export const createTestimonialAdmin = async (req, res, next) => {
  try {
    const { clientName, role, company, avatarUrl, content, rating, isFeatured } = req.body;
    const testimonial = await Testimonial.create({
      clientName,
      role,
      company,
      avatarUrl: avatarUrl || '',
      content,
      rating: rating || 5,
      isFeatured: isFeatured !== undefined ? isFeatured : true
    });
    res.status(201).json(testimonial);
  } catch (error) {
    next(error);
  }
};

export const updateTestimonialAdmin = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!testimonial) return res.status(404).json({ message: 'Testimonial not found' });
    res.json(testimonial);
  } catch (error) {
    next(error);
  }
};

export const deleteTestimonialAdmin = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) return res.status(404).json({ message: 'Testimonial not found' });
    res.json({ message: 'Testimonial deleted' });
  } catch (error) {
    next(error);
  }
};
