'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { FaArrowLeft, FaArrowRight, FaLightbulb, FaCheckCircle, FaPlay, FaPencilAlt, FaQuestionCircle } from 'react-icons/fa';
import { useState } from 'react';
import { useLevel } from '@/context/LevelContext';

interface Example {
  problem: string;
  solution: string;
  explanation: string;
}

interface Practice {
  question: string;
  options?: string[];
  correctAnswer: string;
  hint: string;
}

interface LessonContent {
  title: string;
  introduction: string;
  keyPoints: string[];
  notes: string[];
  procedure: string[];
  examples: Example[];
  practice: Practice[];
  additionalResources: {
    title: string;
    type: 'video' | 'worksheet' | 'game' | 'link';
    url: string;
  }[];
}

// Sample lesson content - This would eventually come from a database
const lessonContents: Record<string, Record<string, Record<string, LessonContent>>> = {
  'numbers-0-100': {
    'counting-objects-1-100': {
      '1': {
        title: 'Introduction to Counting',
        introduction: 'Welcome to your first lesson on counting! Today, we\'ll learn how to count objects one by one up to 10.',
        keyPoints: [
          'Count each object only once',
          'Point to each object as you count',
          'The last number you say is the total count'
        ],
        notes: [
          'Counting is the foundation of mathematics',
          'We use counting every day in real life',
          'Each number represents a quantity',
          'Numbers have a specific order'
        ],
        procedure: [
          'Start with the first object',
          'Point to it and say "one"',
          'Move to the next object',
          'Point to it and say "two"',
          'Continue until you\'ve counted all objects',
          'The last number you say is how many objects there are'
        ],
        examples: [
          {
            problem: 'Count these apples: 🍎 🍎 🍎',
            solution: '3 apples',
            explanation: 'Point to each apple and count: one, two, three. There are 3 apples in total.'
          },
          {
            problem: 'Count these stars: ⭐ ⭐ ⭐ ⭐',
            solution: '4 stars',
            explanation: 'Point to each star and count: one, two, three, four. There are 4 stars in total.'
          }
        ],
        practice: [
          {
            question: 'How many balls are there? ⚽ ⚽ ⚽',
            options: ['2', '3', '4', '5'],
            correctAnswer: '3',
            hint: 'Remember to point to each ball as you count'
          },
          {
            question: 'Count the hearts: ❤️ ❤️ ❤️ ❤️ ❤️',
            options: ['3', '4', '5', '6'],
            correctAnswer: '5',
            hint: 'Count each heart one by one'
          }
        ],
        additionalResources: [
          {
            title: 'Counting Song',
            type: 'video',
            url: 'https://www.youtube.com/watch?v=bGetqbqDVaA'
          },
          {
            title: 'Counting Practice Sheet',
            type: 'worksheet',
            url: '/resources/worksheets/counting-practice.pdf'
          },
          {
            title: 'Counting Game',
            type: 'game',
            url: 'https://www.education.com/game/number-counting/'
          }
        ]
      }
    }
  },
  '2d-and-3d-shapes': {
    'basic-2d-shapes': {
      '1': {
        title: 'Introduction to 2D Shapes',
        introduction: 'Welcome to our lesson on basic 2D shapes! Today, we\'ll learn about circles, squares, triangles, and rectangles.',
        keyPoints: [
          'A 2D shape is flat and has only length and width',
          'Each shape has its own special features',
          'We can find these shapes all around us',
          'Shapes can be different sizes but still be the same type'
        ],
        notes: [
          'A circle is perfectly round with no corners',
          'A square has 4 equal sides and 4 corners',
          'A triangle has 3 sides and 3 corners',
          'A rectangle has 4 sides and 4 corners (like a square, but not all sides are equal)'
        ],
        procedure: [
          'Look at the shape\'s outline',
          'Count how many sides it has',
          'Count how many corners it has',
          'Check if all sides are equal',
          'Compare it to shapes you know',
          'Name the shape based on its features'
        ],
        examples: [
          {
            problem: 'What shape is this? ⭕',
            solution: 'Circle',
            explanation: 'This is a circle because it is perfectly round and has no corners or sides.'
          },
          {
            problem: 'What shape is this? ⬛',
            solution: 'Square',
            explanation: 'This is a square because it has 4 equal sides and 4 corners.'
          }
        ],
        practice: [
          {
            question: 'How many corners does a triangle have? 📐',
            options: ['2', '3', '4', '5'],
            correctAnswer: '3',
            hint: 'Count the points where the sides meet'
          },
          {
            question: 'Which shape has no corners? ⭕ ⬛ 📐',
            options: ['Circle', 'Square', 'Triangle', 'Rectangle'],
            correctAnswer: 'Circle',
            hint: 'Look for the shape that is perfectly round'
          }
        ],
        additionalResources: [
          {
            title: '2D Shapes Song',
            type: 'video',
            url: 'https://www.youtube.com/watch?v=OEbRDtCAFdU'
          },
          {
            title: 'Shape Drawing Practice',
            type: 'game',
            url: '/games/shape-drawing'
          },
          {
            title: 'Shape Matching Game',
            type: 'game',
            url: '/games/shape-matching'
          }
        ]
      }
    },
    'properties-of-2d-shapes': {
      '1': {
        title: 'Understanding Sides and Corners',
        introduction: 'Let\'s explore the properties of 2D shapes! We\'ll learn about sides, corners (vertices), and how to describe shapes.',
        keyPoints: [
          'Sides are the straight lines that make up a shape',
          'Corners (vertices) are where two sides meet',
          'Different shapes have different numbers of sides and corners',
          'The number of sides equals the number of corners in most shapes'
        ],
        notes: [
          'A side is a straight line that forms part of the shape',
          'A corner (vertex) is where two sides meet at a point',
          'Regular shapes have equal sides and equal angles',
          'Some shapes have parallel sides (sides that never meet)'
        ],
        procedure: [
          'Start at any corner of the shape',
          'Follow the sides with your finger',
          'Count each side as you trace it',
          'Count each corner as you reach it',
          'Compare the number of sides and corners',
          'Check if the sides are equal in length'
        ],
        examples: [
          {
            problem: 'Count the sides and corners of this triangle: 📐',
            solution: '3 sides and 3 corners',
            explanation: 'Start at any corner and trace around. You\'ll find 3 straight sides and 3 corners where they meet.'
          },
          {
            problem: 'Are the sides of a square equal? ⬛',
            solution: 'Yes',
            explanation: 'A square has 4 sides that are all the same length. This is what makes it a square!'
          }
        ],
        practice: [
          {
            question: 'How many sides does a rectangle have? 📄',
            options: ['3', '4', '5', '6'],
            correctAnswer: '4',
            hint: 'Count the straight lines that make up the rectangle'
          },
          {
            question: 'Which shape has equal sides? ⬛ 📄',
            options: ['Rectangle', 'Square', 'Both', 'Neither'],
            correctAnswer: 'Square',
            hint: 'Think about which shape has all sides the same length'
          }
        ],
        additionalResources: [
          {
            title: 'Properties of Shapes Video',
            type: 'video',
            url: 'https://www.youtube.com/watch?v=24Uv8Cl5hvI'
          },
          {
            title: 'Side and Corner Counting',
            type: 'worksheet',
            url: '/resources/worksheets/shape-properties-practice.pdf'
          },
          {
            title: 'Shape Properties Game',
            type: 'game',
            url: 'https://www.splashlearn.com/geometry-games'
          }
        ]
      }
    }
  }
};

export default function LessonPage() {
  const params = useParams();
  const { selectedLevel } = useLevel();
  const [showAnswer, setShowAnswer] = useState<number | null>(null);
  const [showHint, setShowHint] = useState<number | null>(null);
  
  const topicSlug = params.topic as string;
  const subtopicSlug = params.subtopic as string;
  const lessonId = parseInt(params.lessonId as string);

  const lessonContent = lessonContents[topicSlug]?.[subtopicSlug]?.[lessonId.toString()];
  
  // Get total number of lessons for this subtopic
  const totalLessons = Object.keys(lessonContents[topicSlug]?.[subtopicSlug] || {}).length;
  
  // Calculate next and previous lesson IDs
  const nextLessonId = lessonId < totalLessons ? lessonId + 1 : null;
  const prevLessonId = lessonId > 1 ? lessonId - 1 : null;
  
  // Check if next/prev lessons exist
  const hasNextLesson = nextLessonId !== null && lessonContents[topicSlug]?.[subtopicSlug]?.[nextLessonId.toString()];
  const hasPrevLesson = prevLessonId !== null && lessonContents[topicSlug]?.[subtopicSlug]?.[prevLessonId.toString()];

  // Navigation handlers
  const handleNextLesson = () => {
    if (hasNextLesson) {
      window.location.href = `/chapters/${topicSlug}/${subtopicSlug}/lesson/${nextLessonId}`;
    }
  };

  const handlePrevLesson = () => {
    if (hasPrevLesson) {
      window.location.href = `/chapters/${topicSlug}/${subtopicSlug}/lesson/${prevLessonId}`;
    }
  };

  if (!lessonContent) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Lesson not found</h1>
          <Link href={`/chapters/${topicSlug}/${subtopicSlug}`} className="text-blue-500 hover:text-blue-600">
            Return to Subtopic
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
          href={`/chapters/${topicSlug}/${subtopicSlug}`}
          className="text-gray-600 hover:text-gray-800 flex items-center gap-2"
        >
          <FaArrowLeft /> Back to Lessons
        </Link>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Lesson Header */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{lessonContent.title}</h1>
          <p className="text-lg text-gray-700">{lessonContent.introduction}</p>
        </div>

        {/* Key Points */}
        <div className="bg-blue-50 rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-blue-800 mb-4 flex items-center gap-2">
            <FaLightbulb /> Key Points
          </h2>
          <ul className="space-y-2">
            {lessonContent.keyPoints.map((point, index) => (
              <li key={index} className="flex items-center gap-2 text-blue-700">
                <FaCheckCircle className="flex-shrink-0" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* Notes */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Notes</h2>
          <ul className="space-y-3">
            {lessonContent.notes.map((note, index) => (
              <li key={index} className="text-gray-700 flex items-start gap-2">
                <span className="font-bold text-purple-500">•</span>
                {note}
              </li>
            ))}
          </ul>
        </div>

        {/* Procedure */}
        <div className="bg-green-50 rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-green-800 mb-4">Step-by-Step Procedure</h2>
          <ol className="space-y-3">
            {lessonContent.procedure.map((step, index) => (
              <li key={index} className="flex items-start gap-3 text-green-700">
                <span className="font-bold">{index + 1}.</span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        {/* Examples */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Examples</h2>
          <div className="space-y-6">
            {lessonContent.examples.map((example, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4">
                <p className="font-semibold text-lg text-gray-800 mb-2">{example.problem}</p>
                <p className="text-blue-600 font-medium mb-2">Solution: {example.solution}</p>
                <p className="text-gray-600">{example.explanation}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Practice Questions */}
        <div className="bg-purple-50 rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-purple-800 mb-6">Practice Time!</h2>
          <div className="space-y-8">
            {lessonContent.practice.map((question, index) => (
              <div key={index} className="bg-white rounded-lg p-6">
                <p className="text-lg font-semibold text-gray-800 mb-4">{question.question}</p>
                
                {question.options && (
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {question.options.map((option, optIndex) => (
                      <button
                        key={optIndex}
                        className="p-2 border-2 rounded-lg hover:bg-purple-50 transition-colors"
                        onClick={() => setShowAnswer(index)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}

                <div className="flex gap-4">
                  <button
                    className="text-purple-600 hover:text-purple-700 flex items-center gap-2"
                    onClick={() => setShowAnswer(index)}
                  >
                    <FaCheckCircle /> Show Answer
                  </button>
                  <button
                    className="text-blue-600 hover:text-blue-700 flex items-center gap-2"
                    onClick={() => setShowHint(index)}
                  >
                    <FaLightbulb /> Need a Hint?
                  </button>
                </div>

                {showAnswer === index && (
                  <div className="mt-4 p-3 bg-green-50 rounded-lg text-green-700">
                    Correct Answer: {question.correctAnswer}
                  </div>
                )}

                {showHint === index && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg text-blue-700">
                    Hint: {question.hint}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Additional Resources */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional Resources</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {lessonContent.additionalResources.map((resource, index) => (
              <Link
                key={index}
                href={resource.url}
                className="flex items-center gap-3 p-4 rounded-lg border-2 hover:border-blue-500 transition-colors"
              >
                {resource.type === 'video' && <FaPlay className="text-red-500" />}
                {resource.type === 'worksheet' && <FaPencilAlt className="text-green-500" />}
                {resource.type === 'game' && <FaPlay className="text-purple-500" />}
                {resource.type === 'link' && <FaQuestionCircle className="text-blue-500" />}
                <span className="text-gray-700">{resource.title}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6">
          <button 
            className={`px-6 py-3 rounded-lg flex items-center gap-2 ${
              hasPrevLesson 
                ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
            onClick={handlePrevLesson}
            disabled={!hasPrevLesson}
          >
            <FaArrowLeft /> Previous Lesson
          </button>
          <button 
            className={`px-6 py-3 rounded-lg flex items-center gap-2 ${
              hasNextLesson 
                ? 'bg-blue-500 text-white hover:bg-blue-600' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            onClick={handleNextLesson}
            disabled={!hasNextLesson}
          >
            Next Lesson <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
} 