'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { FaArrowLeft, FaBook, FaPlay } from 'react-icons/fa';
import { useLevel } from '@/context/LevelContext';

interface SubTopic {
  title: string;
  description: string;
  icon: any;
}

// Define the subtopics data structure
const topicSubtopics: Record<string, {
  title: string;
  color: string;
  subtopics: SubTopic[];
}> = {
  'numbers-0-100': {
    title: 'Numbers (0-100)',
    color: 'blue',
    subtopics: [
      {
        title: 'Counting objects 1-100',
        description: 'Learn to count and identify quantities up to 100 using real-world objects',
        icon: FaBook
      },
      {
        title: 'Reading and writing numerals',
        description: 'Practice writing numbers and recognizing their written form',
        icon: FaBook
      },
      {
        title: 'Number names in words',
        description: 'Learn how to write and read number names in words',
        icon: FaBook
      },
      {
        title: 'Place values (tens and ones)',
        description: 'Understand the concept of tens and ones in two-digit numbers',
        icon: FaBook
      },
      {
        title: 'Comparing numbers using >, <, =',
        description: 'Learn to compare numbers using greater than, less than, and equal to symbols',
        icon: FaBook
      },
      {
        title: 'Ordering numbers',
        description: 'Practice arranging numbers in ascending and descending order',
        icon: FaBook
      },
      {
        title: 'Skip counting by 2s, 5s, 10s',
        description: 'Learn patterns in counting by twos, fives, and tens',
        icon: FaBook
      }
    ]
  },
  'addition-and-subtraction-within-100': {
    title: 'Addition and Subtraction within 100',
    color: 'green',
    subtopics: [
      {
        title: 'Adding numbers up to 100',
        description: 'Learn strategies for adding single and double-digit numbers',
        icon: FaBook
      },
      {
        title: 'Subtracting numbers within 100',
        description: 'Master different methods of subtraction',
        icon: FaBook
      },
      {
        title: 'Number bonds up to 20',
        description: 'Understand number relationships and fact families',
        icon: FaBook
      },
      {
        title: 'Mental math strategies',
        description: 'Learn quick ways to add and subtract in your head',
        icon: FaBook
      },
      {
        title: 'Word problems',
        description: 'Solve real-world addition and subtraction problems',
        icon: FaBook
      },
      {
        title: 'Addition and subtraction facts',
        description: 'Practice basic math facts for quick recall',
        icon: FaBook
      }
    ]
  }
  // Add more topics as needed
};

export default function TopicPage() {
  const params = useParams();
  const { selectedLevel } = useLevel();
  const topicSlug = params.topic as string;
  const topic = topicSubtopics[topicSlug];

  if (!topic) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Topic not found</h1>
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
          href="/chapters" 
          className="text-gray-600 hover:text-gray-800 flex items-center gap-2"
        >
          <FaArrowLeft /> Back to Chapters
        </Link>
      </div>

      {/* Topic Header */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h1 className={`text-3xl font-bold text-${topic.color}-600 mb-4`}>{topic.title}</h1>
        <p className="text-gray-600">
          Select a subtopic to start learning
        </p>
      </div>

      {/* Subtopics Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topic.subtopics.map((subtopic, index) => {
          const Icon = subtopic.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <Link 
                href={`/chapters/${topicSlug}/${subtopic.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                className="block p-6 h-full"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Icon className={`text-2xl text-${topic.color}-500`} />
                  <h2 className="text-xl font-semibold text-gray-900">
                    {subtopic.title}
                  </h2>
                </div>
                <p className="text-gray-600">
                  {subtopic.description}
                </p>
                <div className={`mt-4 text-${topic.color}-500 flex items-center gap-2`}>
                  <span>Start Learning</span>
                  <FaPlay className="text-sm" />
                </div>
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  );
} 