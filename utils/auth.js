const User = require("../models/user");

// Middleware to check if user is authenticated
const requireAuth = (req, res, next) => {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  next();
};

// Middleware to check if user is admin
const requireAdmin = async (req, res, next) => {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  
  try {
    const user = await User.findById(req.session.userId);
    if (!user || user.role !== 'Admin') {
      return res.redirect('/login');
    }
    req.user = user;
    next();
  } catch (error) {
    console.error('Auth error:', error);
    return res.redirect('/login');
  }
};

// Middleware to check if user 
const requireUser = async (req, res, next) => {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  
  try {
    const user = await User.findById(req.session.userId);
    if (!user || user.role !== 'User') {
      return res.redirect('/login');
    }
    req.user = user;
    next();
  } catch (error) {
    console.error('Auth error:', error);
    return res.redirect('/login');
  }
};

// Middleware to set user data for all authenticated routes
const setUserData = async (req, res, next) => {
  if (req.session.userId) {
    try {
      const user = await User.findById(req.session.userId);
      if (user) {
        req.user = user;
        res.locals.user = user;
      }
    } catch (error) {
      console.error('Error setting user data:', error);
    }
  }
  next();
};

module.exports = {
  requireAuth,
  requireAdmin,
  requireUser,
  setUserData
}; 