'use client'; // Marking the component as a client component

import { FaBook, FaArrowRight, FaLightbulb } from 'react-icons/fa'; // Importing a new icon
import Link from 'next/link';

export default function Chapter() {
  return (
    <div className="bg-gray-100 min-h-screen p-6 space-y-8 font-poppins"> {/* Light gray background and kid-friendly font */}
      {/* Hero Section */}
      <section className="text-center space-y-4">
        <FaLightbulb className="text-6xl text-purple-600 mx-auto" /> {/* Meaningful icon */}
        <p className="text-xl text-gray-800">Explore our chapters to enhance your learning!</p>
      </section>

      {/* Chapters List */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        {['Chapter 1: Introduction', 'Chapter 2: Basic Algebra', 'Chapter 3: Geometry', 'Chapter 4: Advanced Topics'].map((chapter, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-semibold text-gray-900">{chapter}</h2>
            <p className="text-gray-700">Learn more about {chapter.toLowerCase()}.</p>
            <Link href={`/chapters/${chapter.toLowerCase().replace(/ /g, '-')}`} className="text-blue-500 flex items-center mt-2">
              Read More <FaArrowRight className="ml-1" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}