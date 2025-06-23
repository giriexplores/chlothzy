import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from '@/services/product.service';
import { incrementCart } from '@/lib/redux/cartSlice';
import { addToCart as apiAddToCart } from '@/services/cart.service';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { toast } from 'react-toastify';

const ProductPage = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(productId);
        setProduct(data.product);

        // default to first size if available
        if (data.product.sizes?.length) {
          setSelectedSize(data.product.sizes[0]);
        }
      } catch (err) {
        setError('Failed to fetch product details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.warning('Please log in to add items to your cart.');
      return;
    }
    if (!selectedSize) {
      toast.warning('Please select a size.');
      return;
    }
    try {
      // call backend to add item
      await apiAddToCart(productId, quantity, selectedSize);
      // update redux state - increment cart count
      dispatch(incrementCart(quantity));
      toast.success('Added to cart!');
    } catch (err) {
      console.error(err);
      toast.error('Could not add to cart. Try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center bg-gray-300 py-28">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center bg-gray-300 py-28">
        <p className="text-lg font-semibold text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Product Images */}
        <div className="flex flex-col items-center">
          <img
            src={product.image[0]}
            alt={product.title}
            className="h-96 w-full rounded-lg object-cover shadow-md"
          />
          <div className="mt-4 flex space-x-2">
            {product.image.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className="h-16 w-16 rounded-md border border-gray-300 object-cover"
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>
          <p className="mt-2 text-lg text-gray-600">{product.description}</p>
          <p className="mt-4 text-2xl font-semibold text-blue-600">
            ${product.price}
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Category: {product.category}
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Rating:{' '}
            {product.rating === -1 ? 'No ratings yet' : `${product.rating}/5`}
          </p>

          {/* Sizes */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Available Sizes:
            </h3>
            <div className="mt-2 flex space-x-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`rounded-md border px-4 py-2 text-gray-700 ${
                    selectedSize === size
                      ? 'border-blue-500 bg-blue-100'
                      : 'border-gray-300'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mt-4">
            <label className="mb-1 block text-gray-700">Quantity:</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-20 rounded border border-gray-300 px-2 py-1"
            />
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="mt-6 rounded-md bg-blue-500 px-6 py-3 text-white hover:bg-blue-600"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
