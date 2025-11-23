import Service from '../models/Service.js';

// @desc    Get all services
// @route   GET /api/services
// @access  Public
export const getServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.status(200).json(services);
  } catch (error) {
    console.error('Get services error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

// @desc    Create new service (Admin only)
// @route   POST /api/admin/services
// @access  Private/Admin
export const createService = async (req, res) => {
  try {
    const { title, description, startingPrice, features, isPopular } = req.body;

    // Validate required fields
    if (!title || !description) {
      return res.status(400).json({ 
        message: 'Please provide title and description' 
      });
    }

    const service = await Service.create({
      title,
      description,
      startingPrice,
      features: features || [],
      isPopular: isPopular || false
    });

    res.status(201).json(service);
  } catch (error) {
    console.error('Create service error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

// @desc    Update service (Admin only)
// @route   PUT /api/admin/services/:id
// @access  Private/Admin
export const updateService = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Service.findById(id);

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    const updatedService = await Service.findByIdAndUpdate(
      id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedService);
  } catch (error) {
    console.error('Update service error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

// @desc    Delete service (Admin only)
// @route   DELETE /api/admin/services/:id
// @access  Private/Admin
export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Service.findById(id);

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    await Service.findByIdAndDelete(id);

    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Delete service error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};
