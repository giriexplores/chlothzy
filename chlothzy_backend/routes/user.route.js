import express from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  getMyProfile,
} from '../controllers/user.controller.js';
import {
  isAuthenticated,
} from '../middlewares/auth.middleware.js';


const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);
// Protected routes (any logged in user)
router.get('/me', isAuthenticated, getMyProfile);
router.get('/logout', isAuthenticated, logoutUser);


export default router;
