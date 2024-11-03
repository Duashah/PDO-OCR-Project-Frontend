"use client";
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast, Toaster } from 'react-hot-toast';

const schema = z.object({
  email: z.string().email('Invalid email address'),
  otp: z.string().optional(), // Add OTP to the schema for later use
});

const ResetPasswordPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data) => {
    console.log('Reset password requested for:', data.email);
    try {
      const response = await fetch('http://127.0.0.1:8000/auth/forgot-password/', { // Set the endpoint to your reset password API
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: data.email, 
          otp: data.otp, // Include OTP if available
          new_password: data.newPassword // Send the new password to the API
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to reset password');
      }

      const responseData = await response.json();
      toast.success(responseData.message || 'Password reset successful!', {
        duration: 5000,
      });
    } catch (error) {
      toast.error(error.message || 'An error occurred. Please try again.');
    }
  };
  const inputClass = "mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 hover:border-gray-400 transition-all duration-200 ease-in-out appearance-none";
  const buttonClass = "w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200";

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Toaster />
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Reset Password</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register('email')}
              className={`${inputClass} ${errors.email ? 'border-red-500' : ''}`}
              placeholder="your.email@example.com"
            />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
              OTP (if applicable)
            </label>
            <input
              id="otp"
              type="text"
              {...register('otp')}
              className={`${inputClass} ${errors.otp ? 'border-red-500' : ''}`}
              placeholder="Enter your OTP"
            />
            {errors.otp && <p className="mt-1 text-xs text-red-500">{errors.otp.message}</p>}
          </div>
          <div className="pt-4">
            <button
              type="submit"
              className={buttonClass}
            >
              Send Reset Link
            </button>
          </div>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Remember your password?{' '}
          <a href="/" className="font-medium text-black hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
