import mongoose from "mongoose";

const CartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  size:{
    type: String,
    enum: ['S', 'M', 'L', 'XL', 'XXL'],
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
    min: 1,
  },
});

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    items: [CartItemSchema],
  },
  { timestamps: true },
);

export default mongoose.model("Cart", CartSchema);
