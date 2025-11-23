import ClientProject from '../models/ClientProject.js';

// @desc    Get all client projects (Admin view)
// @route   GET /api/admin/client-projects
// @access  Private/Admin
export const getAllClientProjects = async (req, res) => {
  try {
    const { status } = req.query;

    // Build query
    let query = {};
    
    if (status) {
      const validStatuses = ['new', 'in_discussion', 'in_progress', 'deployed', 'cancelled'];
      if (validStatuses.includes(status)) {
        query.status = status;
      }
    }

    const projects = await ClientProject.find(query)
      .populate('userId', 'name email role')
      .populate('referencePortfolioProjectId', 'title slug')
      .sort({ createdAt: -1 });

    res.status(200).json(projects);
  } catch (error) {
    console.error('Get all client projects error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

// @desc    Get single client project (Admin view)
// @route   GET /api/admin/client-projects/:id
// @access  Private/Admin
export const getClientProjectAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await ClientProject.findById(id)
      .populate('userId', 'name email role createdAt')
      .populate('referencePortfolioProjectId', 'title slug thumbnailImageUrl');

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json(project);
  } catch (error) {
    console.error('Get client project admin error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

// @desc    Update client project (Admin only)
// @route   PUT /api/admin/client-projects/:id
// @access  Private/Admin
export const updateClientProjectAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, deploymentUrl, notesFromAdmin } = req.body;

    const project = await ClientProject.findById(id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Validate status if provided
    if (status) {
      const validStatuses = ['new', 'in_discussion', 'in_progress', 'deployed', 'cancelled'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ 
          message: `Invalid status. Must be one of: ${validStatuses.join(', ')}` 
        });
      }
      project.status = status;
    }

    // Update other fields if provided
    if (deploymentUrl !== undefined) {
      project.deploymentUrl = deploymentUrl;
    }

    if (notesFromAdmin !== undefined) {
      project.notesFromAdmin = notesFromAdmin;
    }

    project.updatedAt = Date.now();

    await project.save();

    // Populate and return updated project
    await project.populate('userId', 'name email');
    await project.populate('referencePortfolioProjectId', 'title slug');

    res.status(200).json(project);
  } catch (error) {
    console.error('Update client project admin error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};
