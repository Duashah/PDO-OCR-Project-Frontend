"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search, Bell, ChevronDown, Database, Link as LinkIcon, X } from 'lucide-react';
import Image from 'next/image';
import logo from "@/assets/images/logo.png";
import user from "@/assets/images/user.png";
import daimond from "@/assets/images/daimond.png";

const AppBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDBConnection = () => {
    // Navigate to DB connection page
    window.location.href = '/dashboard/db';
  };

  const handleCopyLink = () => {
    // Copy current URL to clipboard
    navigator.clipboard.writeText(window.location.href);
    // You might want to show a tooltip or notification here
  };

  const handleSaveSettings = () => {
    // Save settings logic here
    setIsProfileDropdownOpen(false);
  };

  return (
    <nav className="flex items-center justify-between px-5 py-4 bg-white shadow-sm">
      <div className="flex items-center space-x-2">
        <Link href="/" className="mr-2">
          <ArrowLeft className="h-5 w-5 text-gray-600" />
        </Link>
        <div className="flex items-center">
          <Image src={logo.src} width={100} height={50} alt="Logo" />
        </div>
        <div className="relative">
          <button 
            className="flex items-center text-sm font-semibold text-gray-700"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            Review
            <ChevronDown className="h-4 w-4 ml-1 text-gray-500" />
          </button>
          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-1 w-32 bg-white shadow-lg rounded-md py-1">
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Option 1</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Option 2</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Option 3</a>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <button aria-label="Search">
          <Search className="size-[19px] text-gray-600" />
        </button>
        <Image src={daimond.src} width={18} height={18} alt="Diamond" />
        <button aria-label="Notifications">
          <Bell className="size-[19px] text-gray-600" />
        </button>
        <div className="relative mt-1" ref={dropdownRef}>
          <button 
            aria-label="User profile" 
            className="size-[25px] rounded-full bg-gray-200 overflow-hidden"
            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
          >
            <img src={user.src} alt="User avatar" className="w-full h-full object-cover" />
          </button>
          {isProfileDropdownOpen && (
            <div className="absolute top-full z-10 right-0 mt-2 w-64 bg-white shadow-lg rounded-md py-2 px-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-blue-500">Alex Lee</h3>
                <button onClick={() => setIsProfileDropdownOpen(false)} className="text-gray-500">
                  <X size={18} />
                </button>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Time Zone</label>
                <select className="w-full border border-gray-300 rounded-md py-1 px-2 text-sm">
                  <option>UTC-8</option>
                  {/* Add more time zone options as needed */}
                </select>
              </div>
              <h4 className="font-medium mb-2">Settings</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">DB Connection</span>
                  <button onClick={handleDBConnection}>
                    <Database size={18} className="text-gray-400" />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Batch Frequency</span>
                  <button onClick={handleCopyLink}>
                    <LinkIcon size={18} className="text-gray-400" />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Auto Confirmation</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-500"></div>
                  </label>
                </div>
              </div>
              <div className="flex space-x-2 mt-4 mb-2">
                <button onClick={handleSaveSettings} className="bg-blue-500 w-full text-white rounded-md py-2 px-4 text-sm font-medium">
                  Save Settings
                </button>
                <button onClick={() => setIsProfileDropdownOpen(false)} className="w-auto px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">   

                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default AppBar;