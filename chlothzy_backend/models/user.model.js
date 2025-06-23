import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full Name required'],
    minlength: [4, 'Full Name must contain at least 2 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email required'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must contain at least 8 characters'],
    select: false, //--for getting user password
  },
  role: {
    type: String,
    required: [true, 'Role is required'],
    enum: ['user', 'admin'],
    default: 'user',
  },
  image: {
    type: String,
    default: `https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png`,
  },
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); //--

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate JWT
userSchema.methods.generateJsonWebToken = function () {
  const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
  return token;
};

export const userModel = mongoose.model('User', userSchema);
