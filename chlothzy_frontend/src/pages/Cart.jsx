import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Trash2 } from 'lucide-react';
import {
  setCartCount,
  incrementCart,
  decrementCart,
} from '@/lib/redux/cartSlice';
import { getCart, addToCart, removeFromCart } from '@/services/cart.service';
import { toast } from 'react-toastify';

export default function Cart() {
  const dispatch = useDispatch();
  const [detailedItems, setDetailedItems] = useState([]);
  const SHIPPING_FEE = 10;
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // Fetch cart from server on mount
  useEffect(() => {
    if (!isAuthenticated) {
      toast.warning('Please log in to view your cart.');
      return;
    }

    async function load() {
      try {
        const items = await getCart(user._id);
        setDetailedItems(items.items);
        // Calculate total count and sync with cart slice
        const totalCount = items.items.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
        dispatch(setCartCount(totalCount));
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, [dispatch, user, isAuthenticated]);

  // Handler: qty change
  const handleQtyChange = async (productId, newQty, size) => {
    const oldItem = detailedItems.find(
      (i) => i.product._id === productId && i.size === size
    );
    const oldQty = oldItem?.quantity || 0;
    const delta = newQty - oldQty;
    if (delta === 0) return;

    try {
      await addToCart(productId, delta, size);

      // Update cart count in redux
      if (delta > 0) {
        dispatch(incrementCart(delta));
      } else {
        dispatch(decrementCart(Math.abs(delta)));
      }

      // Update local state
      setDetailedItems((cur) =>
        cur.map((it) =>
          it.product._id === productId && it.size === size
            ? { ...it, quantity: newQty }
            : it
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  // Handler: remove
  const handleRemove = async (productId, size) => {
    const itemToRemove = detailedItems.find(
      (i) => i.product._id === productId && i.size === size
    );

    try {
      await removeFromCart(productId, size);

      // Decrease cart count by the quantity of the removed item
      if (itemToRemove) {
        dispatch(decrementCart(itemToRemove.quantity));
      }

      // Update local state
      setDetailedItems((cur) =>
        cur.filter((it) => !(it.product._id === productId && it.size === size))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const subtotal = detailedItems.reduce(
    (sum, { quantity, product }) => sum + product.price * quantity,
    0
  );
  const total = subtotal + SHIPPING_FEE;

  return (
    <div className="mx-auto flex max-w-6xl flex-col px-4 py-8 lg:flex-row">
      {/* Left: Cart items */}
      <div className="flex-1">
        <h2 className="mb-6 text-2xl font-semibold text-gray-700">
          YOUR <span className="font-light">CART</span>
        </h2>

        {detailedItems.map(({ size, quantity, product }) => (
          <div key={`${product._id}-${size}`}>
            <div className="flex items-center space-x-4 py-6">
              <img
                src={product.image[0]}
                alt={product.title}
                className="h-24 w-24 rounded-md object-cover"
              />
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-800">
                  {product.title}
                </h3>
                <p className="text-gray-600">Rs.{product.price}</p>
                <span className="inline-block rounded border border-gray-300 px-2 py-1 text-sm text-gray-600">
                  {size}
                </span>
              </div>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) =>
                  handleQtyChange(product._id, Number(e.target.value), size)
                }
                className="w-16 rounded border border-gray-300 text-center"
              />
              <button
                onClick={() => handleRemove(product._id, size)}
                className="p-2 text-gray-500 hover:text-red-500"
              >
                <Trash2 size={20} />
              </button>
            </div>
            <hr className="border-gray-200" />
          </div>
        ))}
      </div>

      {/* Right: Totals */}
      <div className="mt-8 w-full lg:mt-0 lg:w-1/3 lg:pl-12">
        <h2 className="mb-6 text-2xl font-semibold text-gray-700">
          CART <span className="font-light">TOTALS</span>
        </h2>
        <div className="space-y-4 text-gray-700">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>Rs.{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping Fee</span>
            <span>Rs.{SHIPPING_FEE.toFixed(2)}</span>
          </div>
          <hr className="border-gray-200" />
          <div className="flex justify-between font-semibold text-gray-800">
            <span>Total</span>
            <span>Rs.{total.toFixed(2)}</span>
          </div>
        </div>
        <button
          className="mt-8 w-full bg-black py-3 tracking-wide text-white uppercase transition hover:opacity-90"
          onClick={() => {
            toast.warning('Feature Pending...');
          }}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
