import ProductModel from "../models/product.model.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";

export const createProduct = async (req, res, next) => {
  const { title, price, description, size } = req.body;

  if (!title || !price || !description || !size) {
    return res.status(400).json({
      error:
        "Please provide all required fields: title, price, description, and size",
    });
  }

  if (!req.file) {
    return res.status(400).json({ error: "Image is required." });
  }

  try {
    const imageFile = await uploadToCloudinary(req.file.path);

    const products = await ProductModel.create({
      title,
      description,
      size: size.split(",").map((s) => s.trim()),
      price,
      image: imageFile,
    });

    res.status(201).json({
      message: "Products created successfully",
      products,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const updateFields = {};

    if (req.body.title) updateFields.title = req.body.title;
    if (req.body.price) updateFields.price = req.body.price;

    // If a new image file is uploaded
    if (req.file) {
      const imageFile = await uploadToCloudinary(req.file.path);
      updateFields.image = imageFile;
    }

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true },
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product updated successfully",
      products: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await ProductModel.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.find();
    if (products && products.length === 0) {
      return res.status(404).json({ message: "Products not found" });
    }

    res.status(200).json({
      message: "Products fetched successfully",
      products,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await ProductModel.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product fetched successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
