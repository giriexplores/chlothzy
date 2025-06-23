import { userModel } from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const registerUser = async (req, res) => {
  const { fullName, email, password, role } = req.body;
  if (!fullName || !email || !password) {
    return res.status(400).json({
      error:
        'Please provide all required fields: fullName, email, and password',
    });
  }

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        error:
          'User with this email already exists. Please use a different email.',
      });
    }
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await userModel.create({
      fullName,
      email,
      password: hashedPassword,
      role: role || 'user',
    });

    if (!createdUser) {
      return res.status(500).json({
        error: 'User registration failed. Please try again.',
      });
    }

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
    });

  } catch (err) {
    console.error('Error during user registration:', err);
    res.status(500).json({ error: err.message });
  }
};

// Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({
        error: 'Please provide both email and password',
      });
    }
  
    const user = await userModel.findOne({ email }).select('+password');
  
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User is not registered',
      });
    }
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
  
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid password',
      });
    }
    
    // generate JWT token
    const payload = {
      email: user.email,
      id: user._id,
      role: user.role,
    };
  
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES,
    });
  
    user.password = 'removed due to security issues.';
  
    // create cookie and send response
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: true,
    };
    res.cookie('token', token, options).status(200).json({
      success: true,
      token,
      user,
      message: 'Logged in successfully',
    });
  } catch (error) {
    console.error('Error during user login:', error);
    res.status(500).json({ error: 'Unable to login, server error' });
  }
};

//Logout User
export const logoutUser = (req, res) => {
  try {
    const options = {
      httpOnly: true,
      secure: true,
    };
    return res.status(200).clearCookie('token', options).json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    return res.status(501).json({
      success: false,
      message: 'Unable to logout',
      error: error.message,
    });
  }
};

// Get My Profile
export const getMyProfile = async (req, res) => {
  const user = await userModel.findById(req.user.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.status(200).json({ success: true, user });
};
