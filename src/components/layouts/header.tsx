import Link from 'next/link';
import { FaBook, FaSearch, FaUser, FaBars } from 'react-icons/fa';
import { useState } from 'react';

// Create a type for the props
interface HeaderProps {
  onSidebarToggle?: () => void;
}

export default function Header({ onSidebarToggle }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-gradient-to-r from-teal-400 to-blue-500 shadow-lg z-50">
      <div className="h-full max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Mobile Menu Button */}
        <button 
          onClick={onSidebarToggle}
          className="md:hidden p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          aria-label="Toggle Sidebar"
        >
          <FaBars className="text-xl text-white" />
        </button>

        {/* Logo and Brand */}
        <Link 
          href="/" 
          className="flex items-center space-x-3"
          aria-label="Home"
        >
          <FaBook className="text-2xl text-yellow-300" />
          <span className="text-xl font-bold text-white">Class 6 Maths</span>
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search topics..."
              className="w-full px-4 py-2 pl-10 rounded-full border-2 border-yellow-200 focus:outline-none focus:border-yellow-300 bg-white/90"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400" />
          </div>
        </div>

        {/* User Profile */}
        <button className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors">
          <FaUser className="text-xl text-white" />
        </button>
      </div>
    </header>
  );
}