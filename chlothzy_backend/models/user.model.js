import mongoose from 'mongoose';

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

export const userModel = mongoose.model('User', userSchema);
