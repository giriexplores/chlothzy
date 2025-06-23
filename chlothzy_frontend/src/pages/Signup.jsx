import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { registerUser } from '@/services/auth.service';
import LoadingSpinner from '@/components/common/LoadingSpinner';

export default function Signup() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await registerUser(data);
      toast.success('Registration successful!');
      navigate('/login');
      console.log('Registration response:', response);
    } catch (err) {
      toast.error('Registration failed. Please try again.');
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-28 flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md">
        <h2 className="mb-8 text-center font-serif text-3xl text-gray-900">
          Sign Up —
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Full Name"
              {...register('fullName', {
                required: 'Full Name is required',
              })}
              className={`w-full border px-4 py-3 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-black focus:outline-none ${
                errors.fullName ? 'border-red-500' : 'border-gray-400'
              } rounded-none`}
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
            )}
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              autoComplete="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Invalid email address',
                },
              })}
              className={`w-full border px-4 py-3 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-black focus:outline-none ${
                errors.email ? 'border-red-500' : 'border-gray-400'
              } rounded-none`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              autoComplete="password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
              className={`w-full border px-4 py-3 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-black focus:outline-none ${
                errors.password ? 'border-red-500' : 'border-gray-400'
              } rounded-none`}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex justify-between text-sm">
            <Link
              to=""
              onClick={() => toast.warning('Feature Pending...')}
              className="text-gray-700 hover:underline"
            >
              Forgot your password?
            </Link>
            <Link to="/login" className="text-gray-700 hover:underline">
              Login Here
            </Link>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-black py-3 font-medium text-white transition ${
                loading ? 'cursor-not-allowed opacity-60' : 'hover:bg-gray-800'
              }`}
            >
              {loading ? <LoadingSpinner /> : 'Sign Up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
