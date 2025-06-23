import { userModel } from "../models/user.model.js";
import { generateToken } from "../utils/jwtToken.js";


export const registerUser = async (req, res) => {
  const { fullName, email, password, role } = req.body;
  if (!fullName || !email || !password) {
    return res.status(400).json({
      error: "Please provide all required fields: fullName, email, and password",
    });
  }

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        error: "User with this email already exists. Please use a different email.",
      });
    }
    const createdUser = await userModel.create({
      fullName,
      email,
      password,
      role: role || "user",
    });

    if (!createdUser) {
      return res.status(500).json({
        error: "User registration failed. Please try again.",
      });
    }
    
    generateToken(createdUser, "User Registered Successfully", 201, res);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: "Please provide both email and password",
    });
  }

  const user = await userModel.findOne({ email }).select("+password");

  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({
      error: "Invalid email or password",
    });
  }

  generateToken(user, "User Logged In Successfully", 200, res);
};

//Logout User
export const logoutUser = (req, res) => {
  res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    })
    .status(200)
    .json({
      success: true,
      message: "User Logged Out Successfully!",
    });
};

// Get My Profile
export const getMyProfile = async (req, res) => {
  const user = await userModel.findById(req.user.id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.status(200).json({ success: true, user });
};
