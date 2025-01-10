'use client';

import { FaBook, FaArrowRight, FaRegClock, FaCoins, FaShapes, FaRuler, FaChartBar, FaPuzzlePiece } from 'react-icons/fa';
import { IoMdCalculator } from 'react-icons/io';
import { BsCalendarDate } from 'react-icons/bs';
import Link from 'next/link';
import { useLevel } from '@/context/LevelContext';

type ChapterList = {
  [key: string]: {
    title: string;
    icon: any;
    topics: string[];
    iconColor: string;
  }[];
};

export default function Chapter() {
  const { selectedLevel } = useLevel();

  // Define chapters based on levels with GES curriculum
  const chapters: ChapterList = {
    'Class 1': [
      {
        title: 'Numbers (0-100)',
        icon: IoMdCalculator,
        iconColor: 'text-blue-500',
        topics: [
          'Counting objects 1-100',
          'Reading and writing numerals',
          'Number names in words',
          'Place values (tens and ones)',
          'Comparing numbers using >, <, =',
          'Ordering numbers',
          'Skip counting by 2s, 5s, 10s'
        ]
      },
      {
        title: 'Addition and Subtraction within 100',
        icon: IoMdCalculator,
        iconColor: 'text-green-500',
        topics: [
          'Adding numbers up to 100',
          'Subtracting numbers within 100',
          'Number bonds up to 20',
          'Mental math strategies',
          'Word problems',
          'Addition and subtraction facts'
        ]
      },
      {
        title: 'Length, Mass and Capacity',
        icon: FaRuler,
        iconColor: 'text-yellow-500',
        topics: [
          'Non-standard units of measurement',
          'Comparing lengths (longer/shorter)',
          'Measuring with informal units',
          'Comparing mass (heavier/lighter)',
          'Comparing capacity (more/less)',
          'Basic measuring tools'
        ]
      },
      {
        title: '2D and 3D Shapes',
        icon: FaShapes,
        iconColor: 'text-pink-500',
        topics: [
          'Basic 2D shapes (circle, square, triangle)',
          'Properties of 2D shapes',
          'Basic 3D shapes (cube, sphere)',
          'Shapes in everyday objects',
          'Drawing simple shapes',
          'Pattern making with shapes'
        ]
      },
      {
        title: 'Money (Ghana Cedi)',
        icon: FaCoins,
        iconColor: 'text-yellow-600',
        topics: [
          'Identifying coins and notes',
          'Value of different denominations',
          'Simple money calculations',
          'Shopping problems',
          'Making amounts with coins',
          'Money word problems'
        ]
      },
      {
        title: 'Time and Calendar',
        icon: FaRegClock,
        iconColor: 'text-indigo-500',
        topics: [
          'Days of the week',
          'Months of the year',
          'Reading time (oclock)',
          'Sequencing daily events',
          'Today, yesterday, tomorrow',
          'Duration of activities'
        ]
      },
      {
        title: 'Data (Picture Graphs)',
        icon: FaChartBar,
        iconColor: 'text-red-500',
        topics: [
          'Collecting simple data',
          'Making picture graphs',
          'Reading picture graphs',
          'Answering questions from graphs',
          'Sorting and grouping',
          'Simple data interpretation'
        ]
      },
      {
        title: 'Patterns and Relationships',
        icon: FaPuzzlePiece,
        iconColor: 'text-orange-500',
        topics: [
          'Number patterns',
          'Shape patterns',
          'Color patterns',
          'Creating patterns',
          'Extending patterns',
          'Finding missing elements'
        ]
      }
    ],
    'Class 2': [{title: 'Introduction', icon: FaBook, iconColor: 'text-gray-500', topics: []}],
    'Class 3': [{title: 'Introduction', icon: FaBook, iconColor: 'text-gray-500', topics: []}],
    'Class 4': [{title: 'Introduction', icon: FaBook, iconColor: 'text-gray-500', topics: []}],
    'Class 5': [{title: 'Introduction', icon: FaBook, iconColor: 'text-gray-500', topics: []}],
    'Class 6': [{title: 'Introduction', icon: FaBook, iconColor: 'text-gray-500', topics: []}],
    'JHS 1': [{title: 'Introduction', icon: FaBook, iconColor: 'text-gray-500', topics: []}],
    'JHS 2': [{title: 'Introduction', icon: FaBook, iconColor: 'text-gray-500', topics: []}],
    'JHS 3': [{title: 'Introduction', icon: FaBook, iconColor: 'text-gray-500', topics: []}]
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
        {currentChapters.map((chapter, index) => {
          const Icon = chapter.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <Icon className={`text-3xl ${chapter.iconColor}`} />
                <h2 className="text-xl font-semibold text-gray-900">Chapter {index + 1}: {chapter.title}</h2>
              </div>
              <ul className="space-y-2 mb-4">
                {chapter.topics.map((topic, topicIndex) => (
                  <li key={topicIndex} className="text-gray-700 flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full bg-opacity-80 ${chapter.iconColor.replace('text-', 'bg-')}`}></span>
                    {topic}
                  </li>
                ))}
              </ul>
              <Link 
                href={`/chapters/${chapter.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} 
                className={`flex items-center mt-4 hover:opacity-80 ${chapter.iconColor}`}
              >
                Start Learning <FaArrowRight className="ml-2" />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}