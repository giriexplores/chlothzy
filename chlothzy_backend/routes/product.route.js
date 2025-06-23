import express from 'express';
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from '../controllers/product.controller.js';
import {
  isAuthenticated,
  authorizeRoles,
} from '../middlewares/auth.middleware.js';
import upload from '../middlewares/multer.middleware.js';

const router = express.Router();

router.post(
  '/create',
  isAuthenticated,
  authorizeRoles('admin'),
  upload.single('image'),
  createProduct
);
router.put(
  '/update/:id',
  isAuthenticated,
  authorizeRoles('admin'),
  upload.single('image'),
  updateProduct
);
router.get('/', getAllProducts);
router.get('/:productId', getProductById); 
router.delete(
  '/delete/:id',
  isAuthenticated,
  authorizeRoles('admin'),
  deleteProduct
);

export default router;
