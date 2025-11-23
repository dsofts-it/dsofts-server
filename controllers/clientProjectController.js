import ClientProject from '../models/ClientProject.js';

// @desc    Create new client project
// @route   POST /api/client-projects
// @access  Private (User or Admin)
export const createClientProject = async (req, res) => {
  try {
    const {
      projectTitle,
      projectDescription,
      estimatedBudget,
      referencePortfolioProjectId
    } = req.body;

    // Validate required fields
    if (!projectTitle || !projectDescription) {
      return res.status(400).json({ 
        message: 'Please provide projectTitle and projectDescription' 
      });
    }

    // Create client project
    const clientProject = await ClientProject.create({
      userId: req.user.userId,
      projectTitle,
      projectDescription,
      estimatedBudget,
      referencePortfolioProjectId,
      status: 'new'
    });

    // Populate user info
    await clientProject.populate('userId', 'name email');
    
    if (referencePortfolioProjectId) {
      await clientProject.populate('referencePortfolioProjectId', 'title slug');
    }

    res.status(201).json(clientProject);
  } catch (error) {
    console.error('Create client project error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

// @desc    Get user's own client projects
// @route   GET /api/client-projects
// @access  Private (User or Admin)
export const getMyClientProjects = async (req, res) => {
  try {
    let query = {};

    // If user role, only show their projects
    // If admin role, show all (or you can customize this)
    if (req.user.role === 'user') {
      query.userId = req.user.userId;
    }
    // If admin, query remains empty to show all projects

    const projects = await ClientProject.find(query)
      .populate('userId', 'name email')
      .populate('referencePortfolioProjectId', 'title slug')
      .sort({ createdAt: -1 });

    res.status(200).json(projects);
  } catch (error) {
    console.error('Get my client projects error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

// @desc    Get single client project by ID
// @route   GET /api/client-projects/:id
// @access  Private (User or Admin)
export const getClientProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await ClientProject.findById(id)
      .populate('userId', 'name email')
      .populate('referencePortfolioProjectId', 'title slug');

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check authorization: user can only view their own projects
    if (req.user.role === 'user' && project.userId._id.toString() !== req.user.userId) {
      return res.status(403).json({ 
        message: 'Forbidden - You can only view your own projects' 
      });
    }

    res.status(200).json(project);
  } catch (error) {
    console.error('Get client project by ID error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};
