import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Link } from 'react-router';

const Me = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="flex items-center justify-center bg-gray-100 py-24">
        <p className="text-lg text-gray-700">
          Please <Link to="/login" className='text-blue-500 underline' >Login</Link> to view your profile.
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center bg-gray-100 py-24">
      <div className="w-80 rounded-lg bg-white p-6 text-center shadow-md">
        <img
          src={user.image || '/default-avatar.png'}
          alt="User Avatar"
          className="mx-auto mb-4 h-24 w-24 rounded-full"
        />
        <h2 className="mb-2 text-xl font-semibold text-gray-800">
          {user.fullName}
        </h2>
        <p className="mb-4 text-gray-600">{user.email}</p>
        <button
          onClick={() => navigate('/collection')}
          className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Go Shopping
        </button>
      </div>
    </div>
  );
};

export default Me;
