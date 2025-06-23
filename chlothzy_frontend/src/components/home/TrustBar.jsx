import React from 'react';
import { BadgeCheck, ArrowLeftRight, Headset } from 'lucide-react';

export default function TrustBar() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-6">
        {/* Icons + text row */}
        <div className="mb-12 flex flex-col items-center justify-center space-y-8 sm:flex-row sm:space-y-0 sm:space-x-16">
          <div className="flex flex-col items-center text-center">
            <ArrowLeftRight className="mb-4 text-4xl text-gray-800" />
            <h4 className="text-lg font-semibold text-gray-800">
              Easy Exchange Policy
            </h4>
            <p className="mt-1 text-sm text-gray-500">
              We offer hassle free exchange policy
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <BadgeCheck className="mb-4 text-4xl text-gray-800" />
            <h4 className="text-lg font-semibold text-gray-800">
              7 Days Return Policy
            </h4>
            <p className="mt-1 text-sm text-gray-500">
              We provide 7 days free return policy
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Headset className="mb-4 text-4xl text-gray-800" />
            <h4 className="text-lg font-semibold text-gray-800">
              Best customer support
            </h4>
            <p className="mt-1 text-sm text-gray-500">
              we provide 24/7 customer support
            </p>
          </div>
        </div>

        {/* Subscription section */}
        <div className="w-full max-w-xl text-center">
          <p className="text-base font-semibold text-gray-800">
            Join the Chlothzy Style Community
          </p>
          <h3 className="mt-2 mb-2 text-2xl font-bold text-gray-900 sm:text-3xl">
            Subscribe now & get 20% off
          </h3>
          <p className="mb-6 text-gray-700">
            Chlothzy Fashion – Where Style Meets Confidence.
          </p>
          <form className="flex w-full">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow rounded-l-md border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-r-md bg-black px-6 py-3 font-semibold text-white transition hover:bg-gray-800"
            >
              SUBSCRIBE
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
