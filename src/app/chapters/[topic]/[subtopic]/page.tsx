'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { FaArrowLeft, FaBook, FaPlay, FaCheckCircle } from 'react-icons/fa';
import { useLevel } from '@/context/LevelContext';

interface Lesson {
  title: string;
  description: string;
  duration: string;
  objectives: string[];
}

// Helper function to create URL-friendly slugs
function createSlug(text: string): string {
  return text.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Initial lessons data
const lessonsData = {
  'numbers-0-100': {
    'counting-objects-1-100': {
      title: 'Counting objects 1-100',
      color: 'blue',
      description: 'Learn to count and identify quantities up to 100 using real-world objects',
      lessons: [
        {
          title: 'Introduction to Counting',
          description: 'Learn the basics of counting objects one by one',
          duration: '15 mins',
          objectives: [
            'Count objects from 1 to 10',
            'Match numbers to quantities',
            'Write numbers 1-10'
          ]
        },
        {
          title: 'Counting to Twenty',
          description: 'Practice counting objects up to 20',
          duration: '20 mins',
          objectives: [
            'Count objects from 11 to 20',
            'Group objects in tens',
            'Write numbers 11-20'
          ]
        }
      ]
    },
    'reading-and-writing-numerals': {
      title: 'Reading and Writing Numerals',
      color: 'blue',
      description: 'Practice writing numbers and recognizing their written form',
      lessons: [
        {
          title: 'Writing Numbers 1-10',
          description: 'Learn to write single-digit numbers correctly',
          duration: '15 mins',
          objectives: [
            'Recognize number symbols 1-10',
            'Practice writing numbers 1-10',
            'Match number symbols to quantities'
          ]
        }
      ]
    },
    'number-names-in-words': {
      title: 'Number Names in Words',
      color: 'blue',
      description: 'Learn how to write and read number names in words',
      lessons: [
        {
          title: 'Number Names 1-10',
          description: 'Learn to write and read basic number names',
          duration: '20 mins',
          objectives: [
            'Read number names one to ten',
            'Write number names one to ten',
            'Match number names to symbols'
          ]
        }
      ]
    },
    'place-values-tens-and-ones': {
      title: 'Place Values (Tens and Ones)',
      color: 'blue',
      description: 'Understand the concept of tens and ones in two-digit numbers',
      lessons: [
        {
          title: 'Understanding Ones',
          description: 'Learn about single digit numbers and ones place',
          duration: '15 mins',
          objectives: [
            'Identify numbers in ones place',
            'Count single objects',
            'Write single-digit numbers'
          ]
        }
      ]
    },
    'comparing-numbers-using-greater-than-less-than-equal': {
      title: 'Comparing Numbers',
      color: 'blue',
      description: 'Learn to compare numbers using greater than, less than, and equal to symbols',
      lessons: [
        {
          title: 'Equal To (=)',
          description: 'Learn when numbers are the same',
          duration: '15 mins',
          objectives: [
            'Understand equal quantities',
            'Use the equals sign correctly',
            'Match equal numbers'
          ]
        }
      ]
    },
    'ordering-numbers': {
      title: 'Ordering Numbers',
      color: 'blue',
      description: 'Practice arranging numbers in ascending and descending order',
      lessons: [
        {
          title: 'Counting Up (Ascending)',
          description: 'Learn to arrange numbers from smallest to largest',
          duration: '20 mins',
          objectives: [
            'Order numbers 1-20',
            'Fill in missing numbers',
            'Create number sequences'
          ]
        }
      ]
    },
    'skip-counting-by-2s-5s-10s': {
      title: 'Skip Counting',
      color: 'blue',
      description: 'Learn patterns in counting by twos, fives, and tens',
      lessons: [
        {
          title: 'Counting by 2s',
          description: 'Learn to count even numbers',
          duration: '20 mins',
          objectives: [
            'Count by 2s to 20',
            'Identify even numbers',
            'Complete number patterns'
          ]
        }
      ]
    }
  },
  'addition-and-subtraction-within-100': {
    'adding-numbers-up-to-100': {
      title: 'Adding Numbers up to 100',
      color: 'green',
      description: 'Learn strategies for adding single and double-digit numbers',
      lessons: [
        {
          title: 'Adding Single Digits',
          description: 'Basic addition with numbers 1-9',
          duration: '15 mins',
          objectives: [
            'Add numbers up to 9',
            'Use counting on strategy',
            'Practice number bonds'
          ]
        }
      ]
    }
  },
  'length-mass-and-capacity': {
    'non-standard-units-of-measurement': {
      title: 'Non-standard Units of Measurement',
      color: 'yellow',
      description: 'Learn to measure using everyday objects',
      lessons: [
        {
          title: 'Measuring with Objects',
          description: 'Use everyday items to measure length',
          duration: '20 mins',
          objectives: [
            'Measure with paper clips',
            'Compare lengths using hand spans',
            'Record measurements'
          ]
        }
      ]
    }
  },
  '2d-and-3d-shapes': {
    'basic-2d-shapes': {
      title: 'Basic 2D Shapes',
      color: 'pink',
      description: 'Learn about circles, squares, and triangles',
      lessons: [
        {
          title: 'Introduction to Shapes',
          description: 'Identify basic 2D shapes',
          duration: '15 mins',
          objectives: [
            'Recognize circles',
            'Identify squares',
            'Spot triangles'
          ]
        }
      ]
    },
    'properties-of-2d-shapes': {
      title: 'Properties of 2D Shapes',
      color: 'pink',
      description: 'Understand sides and corners',
      lessons: [
        {
          title: 'Understanding Sides',
          description: 'Learn about sides in different shapes',
          duration: '20 mins',
          objectives: [
            'Count sides in shapes',
            'Compare sides of different shapes',
            'Draw shapes with specific numbers of sides'
          ]
        },
        {
          title: 'Understanding Corners',
          description: 'Learn about corners (vertices) in shapes',
          duration: '20 mins',
          objectives: [
            'Identify corners in shapes',
            'Count corners in different shapes',
            'Compare corners of different shapes'
          ]
        }
      ]
    },
    'basic-3d-shapes': {
      title: 'Basic 3D Shapes',
      color: 'pink',
      description: 'Explore cubes and spheres',
      lessons: [
        {
          title: 'Introduction to 3D Shapes',
          description: 'Learn about basic three-dimensional shapes',
          duration: '20 mins',
          objectives: [
            'Identify cubes and spheres',
            'Understand 3D vs 2D shapes',
            'Recognize real-world 3D shapes'
          ]
        },
        {
          title: 'Properties of 3D Shapes',
          description: 'Learn about faces, edges, and vertices',
          duration: '20 mins',
          objectives: [
            'Count faces on 3D shapes',
            'Identify edges and vertices',
            'Compare different 3D shapes'
          ]
        }
      ]
    },
    'shapes-in-everyday-objects': {
      title: 'Shapes in Everyday Objects',
      color: 'pink',
      description: 'Find shapes in the world around us',
      lessons: [
        {
          title: 'Finding 2D Shapes',
          description: 'Identify shapes in everyday objects',
          duration: '15 mins',
          objectives: [
            'Spot shapes in the classroom',
            'Find shapes at home',
            'Draw objects using shapes'
          ]
        },
        {
          title: 'Finding 3D Shapes',
          description: 'Recognize 3D shapes in real life',
          duration: '15 mins',
          objectives: [
            'Identify 3D shapes in objects',
            'Sort objects by shape',
            'Describe objects using shape names'
          ]
        }
      ]
    },
    'drawing-simple-shapes': {
      title: 'Drawing Simple Shapes',
      color: 'pink',
      description: 'Practice drawing basic shapes',
      lessons: [
        {
          title: 'Drawing 2D Shapes',
          description: 'Learn techniques for drawing shapes',
          duration: '20 mins',
          objectives: [
            'Draw circles and squares',
            'Draw triangles and rectangles',
            'Create compound shapes'
          ]
        },
        {
          title: 'Drawing 3D Shapes',
          description: 'Introduction to drawing 3D shapes',
          duration: '20 mins',
          objectives: [
            'Draw simple cubes',
            'Sketch spheres',
            'Add depth to shapes'
          ]
        }
      ]
    },
    'pattern-making-with-shapes': {
      title: 'Pattern Making with Shapes',
      color: 'pink',
      description: 'Create patterns using different shapes',
      lessons: [
        {
          title: 'Simple Shape Patterns',
          description: 'Create and continue shape patterns',
          duration: '15 mins',
          objectives: [
            'Create repeating patterns',
            'Continue shape sequences',
            'Identify pattern rules'
          ]
        },
        {
          title: 'Complex Shape Patterns',
          description: 'Work with multiple shapes in patterns',
          duration: '20 mins',
          objectives: [
            'Mix different shapes in patterns',
            'Create growing patterns',
            'Design your own patterns'
          ]
        }
      ]
    }
  },
  'money-ghana-cedi': {
    'identifying-coins-and-notes': {
      title: 'Identifying Coins and Notes',
      color: 'yellow',
      description: 'Learn to recognize Ghanaian currency',
      lessons: [
        {
          title: 'Ghanaian Coins',
          description: 'Learn about different coins',
          duration: '20 mins',
          objectives: [
            'Identify coin denominations',
            'Compare coin values',
            'Count with coins'
          ]
        }
      ]
    }
  },
  'time-and-calendar': {
    'days-of-the-week': {
      title: 'Days of the Week',
      color: 'indigo',
      description: 'Learn the seven days of the week',
      lessons: [
        {
          title: 'Learning the Days',
          description: 'Memorize days in order',
          duration: '15 mins',
          objectives: [
            'Name the days in order',
            'Identify today and tomorrow',
            'Understand week sequence'
          ]
        }
      ]
    }
  },
  'data-picture-graphs': {
    'collecting-simple-data': {
      title: 'Collecting Simple Data',
      color: 'red',
      description: 'Learn to gather information',
      lessons: [
        {
          title: 'Gathering Data',
          description: 'Learn how to collect information',
          duration: '20 mins',
          objectives: [
            'Count objects',
            'Record numbers',
            'Sort items'
          ]
        }
      ]
    },
    'making-picture-graphs': {
      title: 'Making Picture Graphs',
      color: 'red',
      description: 'Create simple visual representations',
      lessons: [
        {
          title: 'Creating Simple Graphs',
          description: 'Learn to make basic picture graphs',
          duration: '20 mins',
          objectives: [
            'Draw picture graphs',
            'Label your graphs',
            'Represent data visually'
          ]
        }
      ]
    },
    'reading-picture-graphs': {
      title: 'Reading Picture Graphs',
      color: 'red',
      description: 'Understand information from graphs',
      lessons: [
        {
          title: 'Understanding Graphs',
          description: 'Learn to read and understand picture graphs',
          duration: '15 mins',
          objectives: [
            'Identify graph elements',
            'Count pictures in graphs',
            'Understand graph keys'
          ]
        }
      ]
    },
    'answering-questions-from-graphs': {
      title: 'Answering Questions from Graphs',
      color: 'red',
      description: 'Use graphs to answer questions',
      lessons: [
        {
          title: 'Graph Questions',
          description: 'Practice answering questions using graphs',
          duration: '20 mins',
          objectives: [
            'Find information in graphs',
            'Compare data points',
            'Answer graph questions'
          ]
        }
      ]
    },
    'sorting-and-grouping': {
      title: 'Sorting and Grouping',
      color: 'red',
      description: 'Organize information',
      lessons: [
        {
          title: 'Organizing Data',
          description: 'Learn to sort and group items',
          duration: '15 mins',
          objectives: [
            'Sort by categories',
            'Group similar items',
            'Create data groups'
          ]
        }
      ]
    },
    'simple-data-interpretation': {
      title: 'Simple Data Interpretation',
      color: 'red',
      description: 'Make sense of data',
      lessons: [
        {
          title: 'Understanding Data',
          description: 'Learn to interpret simple data',
          duration: '20 mins',
          objectives: [
            'Find patterns in data',
            'Draw conclusions',
            'Explain findings'
          ]
        }
      ]
    }
  },
  'patterns-and-relationships': {
    'number-patterns': {
      title: 'Number Patterns',
      color: 'orange',
      description: 'Find patterns in numbers',
      lessons: [
        {
          title: 'Simple Number Sequences',
          description: 'Learn to recognize number patterns',
          duration: '15 mins',
          objectives: [
            'Count by ones',
            'Find missing numbers',
            'Continue patterns'
          ]
        }
      ]
    }
  }
};

const subtopicLessons = lessonsData;

export default function SubtopicPage() {
  const params = useParams();
  const { selectedLevel } = useLevel();
  
  const topicSlug = params.topic as string;
  const subtopicSlug = params.subtopic as string;
  
  // Debug logging
  console.log('URL Params:', { topicSlug, subtopicSlug });
  console.log('Available topics:', Object.keys(subtopicLessons));
  console.log('Available subtopics:', Object.keys(subtopicLessons[topicSlug] || {}));
  
  // Try to find the subtopic with case-insensitive matching
  const availableSubtopics = Object.keys(subtopicLessons[topicSlug] || {});
  const matchingSubtopic = availableSubtopics.find(
    key => key.toLowerCase() === subtopicSlug.toLowerCase()
  );
  
  const subtopic = matchingSubtopic ? subtopicLessons[topicSlug]?.[matchingSubtopic] : null;

  if (!subtopic) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Subtopic not found</h1>
          <div className="text-gray-600 mb-4 space-y-2">
            <p>Debug info:</p>
            <p>Topic: {topicSlug}</p>
            <p>Subtopic: {subtopicSlug}</p>
            <p>Available subtopics: {Object.keys(subtopicLessons[topicSlug] || {}).join(', ')}</p>
          </div>
          <Link href={`/chapters/${topicSlug}`} className="text-blue-500 hover:text-blue-600">
            Return to Topic
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

      {/* Subtopic Header */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h1 className={`text-3xl font-bold text-${subtopic.color}-600 mb-4`}>{subtopic.title}</h1>
        <p className="text-gray-600">
          {subtopic.description}
        </p>
      </div>

      {/* Lessons List */}
      <div className="max-w-4xl mx-auto space-y-4">
        {subtopic.lessons.map((lesson, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <Link 
              href={`/chapters/${topicSlug}/${subtopicSlug}/lesson/${index + 1}`}
              className="block p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full bg-${subtopic.color}-100 flex items-center justify-center`}>
                    <span className={`text-${subtopic.color}-600 text-xl font-bold`}>{index + 1}</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{lesson.title}</h2>
                    <p className="text-gray-600">{lesson.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-gray-500">{lesson.duration}</span>
                  <FaPlay className={`text-${subtopic.color}-500`} />
                </div>
              </div>
              <div className="mt-4 pl-16">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Learning Objectives:</h3>
                <ul className="space-y-1">
                  {lesson.objectives.map((objective, objIndex) => (
                    <li key={objIndex} className="flex items-center gap-2 text-gray-600">
                      <FaCheckCircle className="text-green-500 text-sm" />
                      {objective}
                    </li>
                  ))}
                </ul>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
} 