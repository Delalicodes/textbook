'use client'; // Marking the component as a client component

import { FaRocket, FaBook, FaPencilAlt, FaGamepad } from 'react-icons/fa';
import { BiSolidCalculator } from 'react-icons/bi';
import { IoMdTrophy } from 'react-icons/io';
import { useState } from 'react';

export default function Home() {
  const [selectedLevel, setSelectedLevel] = useState('Select Class Level'); // State for selected class level
  const [isDropdownOpen, setDropdownOpen] = useState(false); // State for dropdown visibility

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen); // Toggle dropdown visibility
  };

  const handleSelectLevel = (level: string) => {
    setSelectedLevel(level); // Set the selected class level
    setDropdownOpen(false); // Close the dropdown after selection
  };

  return (
    <div className="space-y-8">
      {/* Class Level Selection Dropdown */}
      <div className="text-center mt-4">
        <div className="relative inline-block">
          <button 
            onClick={toggleDropdown} 
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-full font-semibold hover:scale-105 transition-transform flex items-center gap-2 mx-auto"
          >
            {selectedLevel}
          </button>
          {isDropdownOpen && ( // Conditional rendering of dropdown
            <div className="absolute bg-gray-800 text-white shadow-lg rounded-lg mt-2">
              <ul className="p-2">
                {['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'JHS 1', 'JHS 2', 'JHS 3'].map((level, index) => (
                  <li 
                    key={index} 
                    className="py-2 px-4 hover:bg-purple-600 cursor-pointer transition-colors"
                    onClick={() => handleSelectLevel(level)} // Handle level selection
                  >
                    {level}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Hero Section */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-purple-600">Welcome to Math Adventure!</h1>
        <p className="text-xl text-gray-600">Let's make learning mathematics fun and exciting!</p>
      </section>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <FaBook className="text-3xl text-blue-500" />
            <h2 className="text-xl font-semibold">Interactive Lessons</h2>
          </div>
          <p className="text-gray-600">Engage with our interactive math lessons designed just for you!</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <BiSolidCalculator className="text-3xl text-green-500" />
            <h2 className="text-xl font-semibold">Practice Problems</h2>
          </div>
          <p className="text-gray-600">Strengthen your skills with our practice problems!</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <FaGamepad className="text-3xl text-purple-500" />
            <h2 className="text-xl font-semibold">Math Games</h2>
          </div>
          <p className="text-gray-600">Learn while having fun with our educational games!</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <IoMdTrophy className="text-3xl text-yellow-500" />
            <h2 className="text-xl font-semibold">Track Progress</h2>
          </div>
          <p className="text-gray-600">Watch your mathematics skills grow day by day!</p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-12">
        <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-full font-semibold hover:scale-105 transition-transform flex items-center gap-2 mx-auto">
          <FaRocket className="text-xl" />
          Start Learning Now
        </button>
      </div>
    </div>
  );
}