import React from 'react';
import { Link } from 'react-router';

export default function Hero() {
  return (
    <section
      className="relative h-[70vh] bg-cover bg-center"
      style={{ backgroundImage: "url('/hero_img.png')" }}
    >
      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
        <div className="px-4 text-center text-white">
          <h1 className="mb-4 text-5xl font-bold">New Arrivals</h1>
          <Link
            to="/collection"
            className="mt-4 rounded bg-white px-6 py-3 font-semibold text-black transition hover:bg-gray-200"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
}
