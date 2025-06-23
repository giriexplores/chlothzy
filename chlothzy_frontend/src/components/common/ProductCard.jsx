import React from 'react';
import { Link } from 'react-router';

export default function ProductCard({ product }) {
  return (
    <Link to={`/product/${product._id}`} className="overflow-hidden rounded-lg bg-white shadow transition hover:shadow-md">
      <img
        src={product.image}
        alt={product.title}
        className="h-64 w-full object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold">{product.title}</h3>
        <p className="mt-2 text-gray-600">₹{product.price}</p>
      </div>
    </Link>
  );
}
