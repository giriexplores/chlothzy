import React from 'react';

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <div className="h-6 w-6 animate-spin rounded-full border-t-2 border-b-2 border-white"></div>
    </div>
  );
}
