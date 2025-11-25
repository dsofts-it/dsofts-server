import PortfolioProject from '../models/PortfolioProject.js';

// @desc    Get all portfolio projects (with filters)
// @route   GET /api/projects
// @access  Public
export const getProjects = async (req, res) => {
  try {
    const { featured, limit } = req.query;

    // Build query
    let query = {};
    
    if (featured === 'true') {
      query.isFeatured = true;
    } else if (featured === 'false') {
      query.isFeatured = false;
    }

    // Execute query
    let projectsQuery = PortfolioProject.find(query).sort({ createdAt: -1 });

    // Apply limit if provided
    if (limit) {
      const limitNum = parseInt(limit);
      if (!isNaN(limitNum) && limitNum > 0) {
        projectsQuery = projectsQuery.limit(limitNum);
      }
    }

    const projects = await projectsQuery;

    res.status(200).json(projects);
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

// @desc    Get single portfolio project by slug
// @route   GET /api/projects/:slug
// @access  Public
export const getProjectBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const project = await PortfolioProject.findOne({ slug });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json(project);
  } catch (error) {
    console.error('Get project by slug error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

// @desc    Create new portfolio project (Admin only)
// @route   POST /api/admin/projects
// @access  Private/Admin
export const createProject = async (req, res) => {
  try {
    const {
      title,
      slug,
      thumbnailImageUrl,
      bannerImageUrl,
      shortDescription,
      fullDescription,
      techStack,
      clientName,
      clientRating,
      websiteUrl,
      completedAt,
      isFeatured
    } = req.body;

    // Validate required fields
    if (!title || !slug || !shortDescription || !fullDescription || !techStack) {
      return res.status(400).json({ 
        message: 'Please provide title, slug, shortDescription, fullDescription, and techStack' 
      });
    }

    // Check if slug already exists
    const existingProject = await PortfolioProject.findOne({ slug });
    if (existingProject) {
      return res.status(400).json({ message: 'Project with this slug already exists' });
    }

    // Create project
    const project = await PortfolioProject.create({
      title,
      slug,
      thumbnailImageUrl,
      bannerImageUrl,
      shortDescription,
      fullDescription,
      techStack,
      clientName,
      clientRating,
      websiteUrl,
      completedAt,
      isFeatured: isFeatured || false
    });

    res.status(201).json(project);
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

// @desc    Update portfolio project (Admin only)
// @route   PUT /api/admin/projects/:id
// @access  Private/Admin
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await PortfolioProject.findById(id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Update project
    const updatedProject = await PortfolioProject.findByIdAndUpdate(
      id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedProject);
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

// @desc    Delete portfolio project (Admin only)
// @route   DELETE /api/admin/projects/:id
// @access  Private/Admin
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await PortfolioProject.findById(id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    await PortfolioProject.findByIdAndDelete(id);

    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};
