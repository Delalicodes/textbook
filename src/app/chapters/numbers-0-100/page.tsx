'use client';

import React from 'react';
import Link from 'next/link';
import { FaArrowLeft, FaBook, FaCalculator } from 'react-icons/fa';

interface LessonType {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  path: string;
}

export default function NumbersChapterPage() {
  const lessons: LessonType[] = [
    {
      id: 'counting-objects',
      title: 'Counting Objects (1-100)',
      description: 'Learn to count different objects and understand quantity.',
      icon: <FaCalculator className="text-blue-500 text-2xl" />,
      path: '/chapters/numbers-0-100/counting-objects'
    },
    {
      id: 'reading-writing-numerals',
      title: 'Reading and Writing Numerals',
      description: 'Practice reading and writing numbers from 1 to 100.',
      icon: <FaBook className="text-green-500 text-2xl" />,
      path: '/chapters/numbers-0-100/reading-writing-numerals'
    }
    // More lessons will be added here
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mb-8">
        <Link 
          href="/chapters"
          className="text-gray-600 hover:text-gray-800 flex items-center gap-2"
        >
          <FaArrowLeft /> Back to Chapters
        </Link>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-md p-8 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Numbers (0-100)</h1>
          <p className="text-gray-600">
            In this chapter, we'll learn about numbers from 0 to 100. We'll practice counting objects,
            reading and writing numbers, and understanding their values.
          </p>
        </div>

        <div className="grid gap-6">
          {lessons.map((lesson) => (
            <Link key={lesson.id} href={lesson.path}>
              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    {lesson.icon}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">{lesson.title}</h2>
                    <p className="text-gray-600">{lesson.description}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Chapter Progress */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Chapter Progress</h2>
          <div className="bg-gray-100 rounded-full h-4">
            <div 
              className="bg-purple-500 h-full rounded-full transition-all"
              style={{ width: '0%' }}
            ></div>
          </div>
          <p className="text-gray-600 mt-2">0% Complete</p>
        </div>
      </div>
    </div>
  );
} 