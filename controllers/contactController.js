import ContactMessage from '../models/ContactMessage.js';

// @desc    Create new contact message
// @route   POST /api/contact
// @access  Public
export const createContactMessage = async (req, res) => {
  try {
    const { name, email, message, budget, timeline } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ 
        message: 'Please provide name, email, and message' 
      });
    }

    const contactMessage = await ContactMessage.create({
      name,
      email,
      message,
      budget,
      timeline
    });

    res.status(201).json({
      message: 'Contact message sent successfully',
      data: contactMessage
    });
  } catch (error) {
    console.error('Create contact message error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

// @desc    Get all contact messages (Admin only)
// @route   GET /api/admin/contact
// @access  Private/Admin
export const getAllContactMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    console.error('Get all contact messages error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

// @desc    Get single contact message (Admin only)
// @route   GET /api/admin/contact/:id
// @access  Private/Admin
export const getContactMessageById = async (req, res) => {
  try {
    const { id } = req.params;

    const message = await ContactMessage.findById(id);

    if (!message) {
      return res.status(404).json({ message: 'Contact message not found' });
    }

    res.status(200).json(message);
  } catch (error) {
    console.error('Get contact message error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

// @desc    Delete contact message (Admin only)
// @route   DELETE /api/admin/contact/:id
// @access  Private/Admin
export const deleteContactMessage = async (req, res) => {
  try {
    const { id } = req.params;

    const message = await ContactMessage.findById(id);

    if (!message) {
      return res.status(404).json({ message: 'Contact message not found' });
    }

    await ContactMessage.findByIdAndDelete(id);

    res.status(200).json({ message: 'Contact message deleted successfully' });
  } catch (error) {
    console.error('Delete contact message error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};
