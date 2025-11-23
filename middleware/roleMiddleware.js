const requireRole = (allowedRoles) => {
  return (req, res, next) => {
    try {
      // Check if user exists (should be set by authMiddleware)
      if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized - User not authenticated' });
      }

      // Check if user's role is in the allowed roles array
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ 
          message: 'Forbidden - You do not have permission to access this resource' 
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({ message: 'Server error in role validation' });
    }
  };
};

export default requireRole;
