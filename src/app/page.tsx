'use client'; // Marking the component as a client component

import { FaRocket, FaBook, FaPencilAlt, FaGamepad } from 'react-icons/fa';
import { BiSolidCalculator } from 'react-icons/bi';
import { IoMdTrophy } from 'react-icons/io';
import { useState } from 'react';
import { useLevel } from '@/context/LevelContext'; // Import the context

export default function Home() {
  const { selectedLevel, setSelectedLevel } = useLevel();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleSelectLevel = (level: string) => {
    setSelectedLevel(level);
    setDropdownOpen(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6 space-y-8">
      {/* Class Level Selection Dropdown */}
      <div className="text-center mt-4">
        <div className="relative inline-block">
          <button 
            onClick={toggleDropdown} 
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-full font-semibold hover:scale-105 transition-transform flex items-center gap-2 mx-auto"
          >
            {selectedLevel || 'Select Class Level'}
          </button>
          {isDropdownOpen && (
            <div className="absolute bg-gray-800 text-white shadow-lg rounded-lg mt-2">
              <ul className="p-2">
                {['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'JHS 1', 'JHS 2', 'JHS 3'].map((level, index) => (
                  <li 
                    key={index} 
                    className="py-2 px-4 hover:bg-purple-600 cursor-pointer transition-colors"
                    onClick={() => handleSelectLevel(level)}
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
        <p className="text-xl text-gray-800">Let's make learning mathematics fun and exciting!</p>
      </section>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <FaBook className="text-4xl text-purple-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Interactive Lessons</h3>
          <p className="text-gray-600">Engage with dynamic math content designed for your level</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <BiSolidCalculator className="text-4xl text-blue-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Practice Exercises</h3>
          <p className="text-gray-600">Strengthen your skills with targeted practice problems</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <FaGamepad className="text-4xl text-green-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Math Games</h3>
          <p className="text-gray-600">Learn while having fun with educational math games</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <FaPencilAlt className="text-4xl text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Quizzes</h3>
          <p className="text-gray-600">Test your knowledge with interactive quizzes</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <IoMdTrophy className="text-4xl text-red-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Achievements</h3>
          <p className="text-gray-600">Earn badges and track your progress</p>
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