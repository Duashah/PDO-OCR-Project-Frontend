"use client";
import React, { useState, useEffect, useRef } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { ArrowRight } from 'lucide-react';

const OTPVerificationPage = () => {
  const [otp, setOTP] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const inputRefs = useRef([]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const userIdParam = urlParams.get('user_id');
    const emailParam = urlParams.get('email');
    if (userIdParam) setUserId(userIdParam);
    if (emailParam) {
      const maskedEmail = emailParam.replace(/(.{2})(.*)(@.*)/, '$1***$3');
      setUserEmail(maskedEmail);
    }
    
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOTP(prevOTP => {
      const newOTP = [...prevOTP];
      newOTP[index] = element.value;
      return newOTP;
    });

    // Move to next input if current field is filled
    if (element.value !== '' && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    switch (e.key) {
      case 'Backspace':
        e.preventDefault();
        setOTP(prevOTP => {
          const newOTP = [...prevOTP];
          newOTP[index] = '';
          return newOTP;
        });
        if (index > 0) {
          inputRefs.current[index - 1].focus();
        }
        break;
      case 'ArrowLeft':
        e.preventDefault();
        if (index > 0) {
          inputRefs.current[index - 1].focus();
        }
        break;
      case 'ArrowRight':
        e.preventDefault();
        if (index < 5) {
          inputRefs.current[index + 1].focus();
        }
        break;
      default:
        break;
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6).split('');
    const newOTP = [...otp];
    pastedData.forEach((value, index) => {
      if (index < 6 && !isNaN(value)) {
        newOTP[index] = value;
      }
    });
    setOTP(newOTP);
    const nextEmptyIndex = newOTP.findIndex(val => val === '');
    const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
    inputRefs.current[focusIndex].focus();
  };

  const handleSubmit = async () => {
    if (!userId) {
      toast.error('User ID is missing. Please try registering again.');
      return;
    }

    if (otp.some(digit => digit === '')) {
      toast.error('Please enter the complete verification code.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/auth/verify-otp/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          otp: otp.join(''),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Account verified successfully!');
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      } else {
        toast.error(data.error || 'Verification failed. Please try again.');
        setOTP(['', '', '', '', '', '']);
        inputRefs.current[0].focus();
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!userId) {
      toast.error('User ID is missing. Please try registering again.');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/auth/resend-otp/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('New verification code sent to your email.');
        setOTP(['', '', '', '', '', '']);
        inputRefs.current[0].focus();
      } else {
        toast.error(data.error || 'Failed to resend code. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
  };

  const inputClass = "w-12 h-12 text-center text-xl font-semibold rounded-md border border-gray-300 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 hover:border-gray-400 transition-all duration-200";
  const buttonClass = "w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Toaster />
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center space-y-2 mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Verification Code</h2>
          <p className="text-gray-500">
            We've sent a code to your email
          </p>
          {userEmail && (
            <p className="text-gray-900 font-medium">
              {userEmail}
            </p>
          )}
        </div>

        <div className="flex justify-between mb-8">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              pattern="\d{1}"
              maxLength="1"
              ref={el => inputRefs.current[index] = el}
              value={digit}
              onChange={e => handleChange(e.target, index)}
              onKeyDown={e => handleKeyDown(e, index)}
              onPaste={handlePaste}
              className={inputClass}
            />
          ))}
        </div>

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className={buttonClass}
        >
          {isLoading ? 'Verifying...' : (
            <>
              <span>Verify</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </button>

        <div className="mt-4 text-center text-sm">
          <span className="text-gray-600">Didn't receive the code? </span>
          <button 
            onClick={handleResendOTP}
            className="font-medium text-black hover:underline focus:outline-none"
          >
            Resend
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTPVerificationPage;