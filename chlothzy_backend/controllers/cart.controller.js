import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

// Get cart for a user
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate(
      "items.product",
    );
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

// Add product to cart
export const addToCart = async (req, res) => {
  const { productId, size, quantity } = req.body;
  const userId = req.user._id;
  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Create new cart
      cart = new Cart({
        userId,
        items: [{ product: productId, quantity, size }],
      });
    } else {
      // Update existing cart
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId && item.size === size,
      );
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity, size });
      }
    }

    await cart.save();
    const updatedCart = await cart.populate("items.product");
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

// Remove an item from the cart
export const removeFromCart = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId,
    );
    await cart.save();
    const updatedCart = await cart.populate("items.product");
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};
