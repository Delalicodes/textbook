'use client';

import { FaBook, FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';
import { useLevel } from '@/context/LevelContext';

type ChapterList = {
  [key: string]: string[];
};

export default function Chapter() {
  const { selectedLevel } = useLevel();

  // Define chapters based on levels with GES curriculum
  const chapters: ChapterList = {
    'Class 1': [
      'Chapter 1: Numbers (0-100)',
      'Chapter 2: Addition and Subtraction within 100',
      'Chapter 3: Length, Mass and Capacity',
      'Chapter 4: 2D and 3D Shapes',
      'Chapter 5: Money (Ghana Cedi)',
      'Chapter 6: Time and Calendar',
      'Chapter 7: Data (Picture Graphs)',
      'Chapter 8: Patterns and Relationships'
    ],
    'Class 2': ['Chapter 1: Introduction', 'Chapter 2: Basic Shapes'],
    'Class 3': ['Chapter 1: Introduction', 'Chapter 2: Basic Algebra', 'Chapter 3: Geometry'],
    'Class 4': ['Chapter 1: Introduction', 'Chapter 2: Basic Algebra', 'Chapter 3: Geometry', 'Chapter 4: Advanced Topics'],
    'Class 5': ['Chapter 1: Introduction', 'Chapter 2: Basic Algebra', 'Chapter 3: Geometry', 'Chapter 4: Advanced Topics', 'Chapter 5: Statistics'],
    'Class 6': ['Chapter 1: Introduction', 'Chapter 2: Basic Algebra', 'Chapter 3: Geometry', 'Chapter 4: Advanced Topics', 'Chapter 5: Statistics', 'Chapter 6: Probability'],
    'JHS 1': ['Chapter 1: Introduction', 'Chapter 2: Algebra', 'Chapter 3: Geometry', 'Chapter 4: Advanced Topics'],
    'JHS 2': ['Chapter 1: Introduction', 'Chapter 2: Algebra', 'Chapter 3: Geometry', 'Chapter 4: Advanced Topics'],
    'JHS 3': ['Chapter 1: Introduction', 'Chapter 2: Algebra', 'Chapter 3: Geometry', 'Chapter 4: Advanced Topics']
  };

  if (!selectedLevel) {
    return (
      <div className="bg-gray-100 min-h-screen p-6 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Please Select a Class Level</h1>
          <Link href="/" className="text-blue-500 hover:text-blue-600">
            Go to Home Page
          </Link>
        </div>
      </div>
    );
  }

  const currentChapters = chapters[selectedLevel] || [];

  return (
    <div className="bg-gray-100 min-h-screen p-6 space-y-8">
      {/* Current Class Level */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-purple-600">
          Current Class: <span className="text-gray-800">{selectedLevel}</span>
        </h2>
      </div>

      {/* Hero Section */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-purple-600">Chapters</h1>
        <p className="text-xl text-gray-800">Explore our chapters to enhance your learning!</p>
      </section>

      {/* Chapters List */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        {currentChapters.map((chapter: string, index: number) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-semibold text-gray-900">{chapter}</h2>
            <p className="text-gray-700 mt-2">
              {getChapterDescription(chapter)}
            </p>
            <Link href={`/chapters/${chapter.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="text-blue-500 flex items-center mt-4 hover:text-blue-600">
              Read More <FaArrowRight className="ml-2" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

function getChapterDescription(chapter: string): string {
  const descriptions: { [key: string]: string } = {
    'Chapter 1: Numbers (0-100)': 'Learn to count, read, and write numbers from 0 to 100.',
    'Chapter 2: Addition and Subtraction within 100': 'Master basic addition and subtraction operations.',
    'Chapter 3: Length, Mass and Capacity': 'Understand basic measurements in everyday life.',
    'Chapter 4: 2D and 3D Shapes': 'Explore basic geometric shapes and their properties.',
    'Chapter 5: Money (Ghana Cedi)': 'Learn about Ghanaian currency and basic money calculations.',
    'Chapter 6: Time and Calendar': 'Understand time, days, weeks, and months.',
    'Chapter 7: Data (Picture Graphs)': 'Introduction to basic data representation.',
    'Chapter 8: Patterns and Relationships': 'Discover patterns in numbers and shapes.'
  };
  return descriptions[chapter] || 'Explore this chapter to learn more.';
}