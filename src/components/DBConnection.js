"use client"
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const schema = z.object({
  systemId: z.string().min(1, 'System ID is required'),
  userName: z.string().min(1, 'User Name is required'),
  password: z.string().min(1, 'Password is required'),
  ipAddress: z.string().min(1, 'IP Address is required'),
  portNumber: z.string().min(1, 'Port Number must be a valid number'),
  serviceName: z.string().min(1, 'Service Name is required'),
});

const DBConnectionForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      systemId: 'sys_001',
      userName: 'admin',
      ipAddress: '192.168.1.1',
      portNumber: '1521',
      serviceName: 'ORCL',
    }
  });
  const [showPassword, setShowPassword] = useState(false);
  const [initiateConnection, setInitiateConnection] = useState(true);
  const router = useRouter();
  const onSubmit = async (data) => {
    console.log('DB Connection submitted:', data);
    try {
      const response = await fetch('http://127.0.0.1:8000/db-connection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          system_id: data.systemId,
          username: data.userName,
          password: data.password,
          ip_address: data.ipAddress,
          port: parseInt(data.portNumber, 10), // Ensure port is an integer
          service_name: data.serviceName,
        }),
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        console.error('Error response from server:', errorResponse); // Log the error details
        throw new Error(errorResponse.detail || 'Failed to create database connection');
      }
  
      const result = await response.json();
      toast.success(result.message);
      router.push('/dashboard');
    } catch (error) {
      toast.error(error.message);
    }
  };
  

  const inputClass = "mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 hover:border-gray-400 transition-all duration-200 ease-in-out appearance-none";
  const buttonClass = "w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200";

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Toaster />
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-1 text-gray-800">DB Connection</h2>
        <p className="text-sm text-gray-600 mb-6">We ship within 2 working days</p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="systemId" className="block text-sm font-medium text-gray-700 mb-1">
              System ID
            </label>
            <input
              id="systemId"
              {...register('systemId')}
              className={`${inputClass} ${errors.systemId ? 'border-red-500' : ''}`}
            />
            {errors.systemId && <p className="mt-1 text-xs text-red-500">{errors.systemId.message}</p>}
          </div>
          <div>
            <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">
              User Name
            </label>
            <input
              id="userName"
              {...register('userName')}
              className={`${inputClass} ${errors.userName ? 'border-red-500' : ''}`}
            />
            {errors.userName && <p className="mt-1 text-xs text-red-500">{errors.userName.message}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register('password')}
                className={`${inputClass} ${errors.password ? 'border-red-500' : ''}`}
                placeholder="********"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
          </div>
          <div>
            <label htmlFor="ipAddress" className="block text-sm font-medium text-gray-700 mb-1">
              IP Address
            </label>
            <input
              id="ipAddress"
              {...register('ipAddress')}
              className={`${inputClass} ${errors.ipAddress ? 'border-red-500' : ''}`}
            />
            {errors.ipAddress && <p className="mt-1 text-xs text-red-500">{errors.ipAddress.message}</p>}
          </div>
          <div>
            <label htmlFor="portNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Port Number
            </label>
            <input
              id="portNumber"
              {...register('portNumber')}
              className={`${inputClass} ${errors.portNumber ? 'border-red-500' : ''}`}
            />
            {errors.portNumber && <p className="mt-1 text-xs text-red-500">{errors.portNumber.message}</p>}
          </div>
          <div>
            <label htmlFor="serviceName" className="block text-sm font-medium text-gray-700 mb-1">
              Service Name
            </label>
            <input
              id="serviceName"
              {...register('serviceName')}
              className={`${inputClass} ${errors.serviceName ? 'border-red-500' : ''}`}
            />
            {errors.serviceName && <p className="mt-1 text-xs text-red-500">{errors.serviceName.message}</p>}
          </div>
          <div className="flex items-center">
            <input
              id="initiateConnection"
              type="checkbox"
              checked={initiateConnection}
              onChange={() => setInitiateConnection(!initiateConnection)}
              className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
            />
            <label htmlFor="initiateConnection" className="ml-2 block text-sm text-gray-900">
              Initiate connection
            </label>
          </div>
          <button type="submit" className={buttonClass}>
            Connect
          </button>
        </form>
      </div>
    </div>
  );
};

export default DBConnectionForm;
