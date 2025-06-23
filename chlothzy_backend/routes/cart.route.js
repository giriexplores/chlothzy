import express from "express";
import {
  getCart,
  addToCart,
  removeFromCart,
} from "../controllers/cart.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", isAuthenticated, getCart);
router.post("/", isAuthenticated, addToCart);
router.delete("/:productId", isAuthenticated, removeFromCart);

export default router;
