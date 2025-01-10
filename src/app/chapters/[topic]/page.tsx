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

// Helper function to create URL-friendly slugs
function createSlug(text: string): string {
  return text.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
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
  },
  'length-mass-and-capacity': {
    title: 'Length, Mass and Capacity',
    color: 'yellow',
    subtopics: [
      {
        title: 'Non-standard units of measurement',
        description: 'Learn to measure using everyday objects',
        icon: FaBook
      },
      {
        title: 'Comparing lengths',
        description: 'Understanding longer and shorter',
        icon: FaBook
      },
      {
        title: 'Measuring with informal units',
        description: 'Use informal units to measure objects',
        icon: FaBook
      },
      {
        title: 'Comparing mass',
        description: 'Understanding heavier and lighter',
        icon: FaBook
      },
      {
        title: 'Comparing capacity',
        description: 'Understanding more and less in containers',
        icon: FaBook
      },
      {
        title: 'Basic measuring tools',
        description: 'Introduction to rulers and scales',
        icon: FaBook
      }
    ]
  },
  '2d-and-3d-shapes': {
    title: '2D and 3D Shapes',
    color: 'pink',
    subtopics: [
      {
        title: 'Basic 2D shapes',
        description: 'Learn about circles, squares, and triangles',
        icon: FaBook
      },
      {
        title: 'Properties of 2D shapes',
        description: 'Understand sides and corners',
        icon: FaBook
      },
      {
        title: 'Basic 3D shapes',
        description: 'Explore cubes and spheres',
        icon: FaBook
      },
      {
        title: 'Shapes in everyday objects',
        description: 'Find shapes in the world around us',
        icon: FaBook
      },
      {
        title: 'Drawing simple shapes',
        description: 'Practice drawing basic shapes',
        icon: FaBook
      },
      {
        title: 'Pattern making with shapes',
        description: 'Create patterns using different shapes',
        icon: FaBook
      }
    ]
  },
  'money-ghana-cedi': {
    title: 'Money (Ghana Cedi)',
    color: 'yellow',
    subtopics: [
      {
        title: 'Identifying coins and notes',
        description: 'Learn to recognize Ghanaian currency',
        icon: FaBook
      },
      {
        title: 'Value of different denominations',
        description: 'Understand the value of money',
        icon: FaBook
      },
      {
        title: 'Simple money calculations',
        description: 'Basic addition and subtraction with money',
        icon: FaBook
      },
      {
        title: 'Shopping problems',
        description: 'Solve real-world money problems',
        icon: FaBook
      },
      {
        title: 'Making amounts with coins',
        description: 'Different ways to make the same amount',
        icon: FaBook
      },
      {
        title: 'Money word problems',
        description: 'Practice solving money situations',
        icon: FaBook
      }
    ]
  },
  'time-and-calendar': {
    title: 'Time and Calendar',
    color: 'indigo',
    subtopics: [
      {
        title: 'Days of the week',
        description: 'Learn the seven days of the week',
        icon: FaBook
      },
      {
        title: 'Months of the year',
        description: 'Learn the twelve months',
        icon: FaBook
      },
      {
        title: 'Reading time',
        description: 'Tell time to the hour',
        icon: FaBook
      },
      {
        title: 'Sequencing daily events',
        description: 'Order events in time',
        icon: FaBook
      },
      {
        title: 'Today, yesterday, tomorrow',
        description: 'Understand basic time concepts',
        icon: FaBook
      },
      {
        title: 'Duration of activities',
        description: 'Compare how long things take',
        icon: FaBook
      }
    ]
  },
  'data-picture-graphs': {
    title: 'Data (Picture Graphs)',
    color: 'red',
    subtopics: [
      {
        title: 'Collecting simple data',
        description: 'Learn to gather information',
        icon: FaBook
      },
      {
        title: 'Making picture graphs',
        description: 'Create simple visual representations',
        icon: FaBook
      },
      {
        title: 'Reading picture graphs',
        description: 'Understand information from graphs',
        icon: FaBook
      },
      {
        title: 'Answering questions from graphs',
        description: 'Use graphs to answer questions',
        icon: FaBook
      },
      {
        title: 'Sorting and grouping',
        description: 'Organize information',
        icon: FaBook
      },
      {
        title: 'Simple data interpretation',
        description: 'Make sense of data',
        icon: FaBook
      }
    ]
  },
  'patterns-and-relationships': {
    title: 'Patterns and Relationships',
    color: 'orange',
    subtopics: [
      {
        title: 'Number patterns',
        description: 'Find patterns in numbers',
        icon: FaBook
      },
      {
        title: 'Shape patterns',
        description: 'Recognize and create shape patterns',
        icon: FaBook
      },
      {
        title: 'Color patterns',
        description: 'Work with repeating colors',
        icon: FaBook
      },
      {
        title: 'Creating patterns',
        description: 'Make your own patterns',
        icon: FaBook
      },
      {
        title: 'Extending patterns',
        description: 'Continue existing patterns',
        icon: FaBook
      },
      {
        title: 'Finding missing elements',
        description: 'Complete incomplete patterns',
        icon: FaBook
      }
    ]
  }
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
          const subtopicSlug = createSlug(subtopic.title);
          // Debug logging
          console.log('Subtopic:', {
            title: subtopic.title,
            generatedSlug: subtopicSlug,
            fullURL: `/chapters/${topicSlug}/${subtopicSlug}`
          });
          
          return (
            <div key={index} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <Link 
                href={`/chapters/${topicSlug}/${subtopicSlug}`}
                className="block p-6 h-full"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Icon className={`text-2xl text-${topic.color}-500`} />
                  <h2 className="text-xl font-semibold text-gray-900">
                    {subtopic.title}
                  </h2>
                </div>
                <div className="flex items-center gap-2 text-gray-600 mb-3">
                  <span className={`w-2 h-2 rounded-full bg-${topic.color}-500`}></span>
                  <p>{subtopic.description}</p>
                </div>
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