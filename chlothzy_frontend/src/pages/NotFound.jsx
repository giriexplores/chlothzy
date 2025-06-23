import { Ghost } from 'lucide-react';
import { Link } from 'react-router';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center px-4 my-24">
      <div className="text-center animate-fadeIn">
        <Ghost className="w-20 h-20 mx-auto animate-bounce" />
        <h1 className="mt-4 text-5xl font-bold">404</h1>
        <p className="text-lg mt-2 text-gray-800">Oops! Page not found.</p>
        <Link
          to="/"
          className="inline-block mt-6 px-6 py-2 border transition rounded"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
