'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useLevel } from '@/context/LevelContext';

// This would eventually come from a database or API
const lessonContent = {
  'numbers-0-100': {
    'counting-numbers-1-20': {
      1: {
        title: 'Counting objects one by one',
        content: [
          {
            type: 'text',
            content: 'Let\'s learn how to count objects one by one up to 20!'
          },
          {
            type: 'instruction',
            content: 'Count along with each group of objects below:'
          },
          {
            type: 'example',
            content: 'Count these apples: 🍎 🍎 🍎 🍎 🍎 (five apples)'
          },
          {
            type: 'practice',
            content: 'Now try counting these stars: ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ (six stars)'
          }
        ],
        exercises: [
          {
            question: 'How many balls can you count? ⚽ ⚽ ⚽ ⚽',
            answer: '4',
            hint: 'Count each ball one by one'
          }
        ]
      }
      // Add more lessons here
    }
  }
};

export default function LessonPage() {
  const params = useParams();
  const { selectedLevel } = useLevel();
  
  const topicSlug = params.topic as string;
  const subtopicSlug = params.subtopic as string;
  const lessonNumber = parseInt(params.lesson as string);

  const lesson = lessonContent[topicSlug]?.[subtopicSlug]?.[lessonNumber];

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Lesson not found</h1>
          <Link href="/chapters" className="text-blue-500 hover:text-blue-600">
            Return to Chapters
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Navigation */}
      <div className="mb-8">
        <Link 
          href={`/chapters/${topicSlug}`}
          className="text-gray-600 hover:text-gray-800 flex items-center gap-2"
        >
          <FaArrowLeft /> Back to Topic
        </Link>
      </div>

      {/* Lesson Content */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">{lesson.title}</h1>
          
          <div className="space-y-6">
            {lesson.content.map((section, index) => {
              switch (section.type) {
                case 'text':
                  return (
                    <p key={index} className="text-gray-700 text-lg">
                      {section.content}
                    </p>
                  );
                case 'instruction':
                  return (
                    <div key={index} className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-blue-700 font-medium">
                        {section.content}
                      </p>
                    </div>
                  );
                case 'example':
                  return (
                    <div key={index} className="bg-green-50 p-4 rounded-lg">
                      <p className="text-green-700">
                        {section.content}
                      </p>
                    </div>
                  );
                case 'practice':
                  return (
                    <div key={index} className="bg-purple-50 p-4 rounded-lg">
                      <p className="text-purple-700">
                        {section.content}
                      </p>
                    </div>
                  );
                default:
                  return null;
              }
            })}
          </div>

          {/* Exercises */}
          <div className="mt-8 pt-8 border-t">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Practice Time!</h2>
            <div className="space-y-6">
              {lesson.exercises.map((exercise, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-lg text-gray-800 mb-4">{exercise.question}</p>
                  <div className="flex gap-4">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                      Show Answer
                    </button>
                    <button className="text-blue-500 hover:text-blue-600">
                      Need a hint?
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 flex items-center gap-2">
            <FaArrowLeft /> Previous Lesson
          </button>
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 flex items-center gap-2">
            Next Lesson <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
} 