import React, { useState, useEffect } from 'react';
import ProductCard from '@/components/common/ProductCard';
import FilterSidebar from '@/components/collections/FilterSidebar';
import { getAllProducts } from '@/services/product.service';
import { ChevronDown } from 'lucide-react';
import LoadingSpinner from '@/components/common/LoadingSpinner';

export default function Collection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        console.log('Fetched products:', data); // Debugging line
        setProducts(data.products);
      } catch (err) {
        setError('Failed to fetch products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className='py-24 bg-gray-300 flex items-center justify-center'>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-lg font-semibold text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto px-4 py-8 md:max-w-7xl">
      {/* Mobile Filter Toggle */}
      <div className="mb-4 md:hidden">
        <button
          onClick={() => setShowMobileFilters((v) => !v)}
          className="mb-4 flex cursor-pointer items-center gap-2 border-none text-xl outline-none hover:text-gray-500"
        >
          Filter
          {showMobileFilters ? (
            <ChevronDown />
          ) : (
            <ChevronDown className="rotate-270" />
          )}
        </button>

        {showMobileFilters && (
          <FilterSidebar
            categories={['Men', 'Women', 'Kids']}
            types={['Topwear', 'Bottomwear', 'Winterwear']}
          />
        )}
      </div>

      <div className="md:flex">
        {/* Desktop Sidebar (always visible) */}
        <div className="hidden md:mr-6 md:block md:w-64">
          <FilterSidebar
            categories={['Men', 'Women', 'Kids']}
            types={['Topwear', 'Bottomwear', 'Winterwear']}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">ALL COLLECTIONS</h2>
            <select className="border border-gray-300 py-2">
              <option value="relevant">Relevant</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
