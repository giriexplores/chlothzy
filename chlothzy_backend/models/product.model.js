import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: [String],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: -1, // -1 indicates no rating
      min: -1, // Allow -1 as a valid rating
      max: 5,
    },
    sizes: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Product', ProductSchema);
