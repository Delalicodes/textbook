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

const subtopicLessons: Record<string, Record<string, {
  title: string;
  color: string;
  description: string;
  lessons: Lesson[];
}>> = {
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
        },
        {
          title: 'Counting to Fifty',
          description: 'Learn to count larger groups of objects',
          duration: '25 mins',
          objectives: [
            'Count objects from 21 to 50',
            'Group objects in tens and ones',
            'Skip counting by tens'
          ]
        },
        {
          title: 'Counting to 100',
          description: 'Master counting objects up to 100',
          duration: '30 mins',
          objectives: [
            'Count objects from 51 to 100',
            'Group objects in tens and ones',
            'Complete number sequences'
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
        },
        {
          title: 'Writing Numbers 11-20',
          description: 'Master writing teen numbers',
          duration: '20 mins',
          objectives: [
            'Understand teen numbers',
            'Write numbers 11-20',
            'Read numbers in sequence'
          ]
        },
        {
          title: 'Writing Two-digit Numbers',
          description: 'Learn to write numbers up to 100',
          duration: '25 mins',
          objectives: [
            'Write numbers 21-100',
            'Understand place value',
            'Read two-digit numbers'
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
        },
        {
          title: 'Teen Numbers in Words',
          description: 'Master writing and reading teen numbers',
          duration: '25 mins',
          objectives: [
            'Read teen number names',
            'Write teen number names',
            'Understand number patterns'
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
        },
        {
          title: 'Understanding Tens',
          description: 'Learn about groups of ten and the tens place',
          duration: '20 mins',
          objectives: [
            'Group objects into tens',
            'Count by tens',
            'Identify numbers in tens place'
          ]
        },
        {
          title: 'Combining Tens and Ones',
          description: 'Learn how tens and ones make two-digit numbers',
          duration: '25 mins',
          objectives: [
            'Break numbers into tens and ones',
            'Build numbers using tens and ones',
            'Write two-digit numbers'
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
        },
        {
          title: 'Greater Than (>)',
          description: 'Learn to identify when one number is bigger',
          duration: '20 mins',
          objectives: [
            'Compare quantities',
            'Use the greater than symbol',
            'Order numbers from biggest to smallest'
          ]
        },
        {
          title: 'Less Than (<)',
          description: 'Learn to identify when one number is smaller',
          duration: '20 mins',
          objectives: [
            'Compare quantities',
            'Use the less than symbol',
            'Order numbers from smallest to biggest'
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
        },
        {
          title: 'Counting Down (Descending)',
          description: 'Learn to arrange numbers from largest to smallest',
          duration: '20 mins',
          objectives: [
            'Order numbers 20-1',
            'Count backwards',
            'Complete descending sequences'
          ]
        },
        {
          title: 'Mixed Number Ordering',
          description: 'Practice ordering numbers in different ways',
          duration: '25 mins',
          objectives: [
            'Order random number sets',
            'Find numbers in between',
            'Create number patterns'
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
        },
        {
          title: 'Counting by 5s',
          description: 'Learn to count by fives',
          duration: '20 mins',
          objectives: [
            'Count by 5s to 50',
            'Group objects in fives',
            'Recognize patterns in 5s'
          ]
        },
        {
          title: 'Counting by 10s',
          description: 'Learn to count by tens to 100',
          duration: '20 mins',
          objectives: [
            'Count by 10s to 100',
            'Group objects in tens',
            'Complete sequences of 10s'
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
          description: 'Learn basic addition facts',
          duration: '20 mins',
          objectives: [
            'Add numbers up to 10',
            'Use counting on strategy',
            'Practice number bonds'
          ]
        },
        {
          title: 'Adding with Tens',
          description: 'Learn to add multiples of 10',
          duration: '25 mins',
          objectives: [
            'Add tens numbers (10, 20, 30...)',
            'Use place value to add',
            'Solve word problems with tens'
          ]
        },
        {
          title: 'Two-digit Addition',
          description: 'Master adding larger numbers',
          duration: '30 mins',
          objectives: [
            'Add two-digit numbers',
            'Use regrouping when needed',
            'Solve real-world addition problems'
          ]
        }
      ]
    },
    'subtracting-numbers-within-100': {
      title: 'Subtracting Numbers within 100',
      color: 'green',
      description: 'Master different methods of subtraction',
      lessons: [
        {
          title: 'Basic Subtraction',
          description: 'Learn to take away small numbers',
          duration: '20 mins',
          objectives: [
            'Subtract numbers within 10',
            'Use counting back strategy',
            'Practice basic facts'
          ]
        },
        {
          title: 'Subtracting Tens',
          description: 'Learn to subtract multiples of 10',
          duration: '25 mins',
          objectives: [
            'Subtract tens numbers',
            'Use place value to subtract',
            'Solve word problems'
          ]
        },
        {
          title: 'Two-digit Subtraction',
          description: 'Master subtracting larger numbers',
          duration: '30 mins',
          objectives: [
            'Subtract two-digit numbers',
            'Use regrouping when needed',
            'Solve real-world problems'
          ]
        }
      ]
    },
    'number-bonds-up-to-20': {
      title: 'Number Bonds up to 20',
      color: 'green',
      description: 'Understand number relationships and fact families',
      lessons: [
        {
          title: 'Number Bonds to 10',
          description: 'Learn pairs of numbers that make 10',
          duration: '20 mins',
          objectives: [
            'Find pairs that make 10',
            'Use ten frames',
            'Practice quick recall'
          ]
        },
        {
          title: 'Number Bonds to 20',
          description: 'Learn pairs of numbers that make 20',
          duration: '25 mins',
          objectives: [
            'Find pairs that make 20',
            'Use doubles and near doubles',
            'Solve missing number problems'
          ]
        }
      ]
    },
    'mental-math-strategies': {
      title: 'Mental Math Strategies',
      color: 'green',
      description: 'Learn quick ways to add and subtract in your head',
      lessons: [
        {
          title: 'Doubles and Near Doubles',
          description: 'Learn to use doubles to add quickly',
          duration: '20 mins',
          objectives: [
            'Know doubles up to 10+10',
            'Use doubles to add near numbers',
            'Practice mental math'
          ]
        },
        {
          title: 'Making 10',
          description: 'Use making 10 to add numbers',
          duration: '20 mins',
          objectives: [
            'Bridge through 10',
            'Break numbers to make 10',
            'Add three numbers'
          ]
        }
      ]
    },
    'word-problems': {
      title: 'Word Problems',
      color: 'green',
      description: 'Solve real-world addition and subtraction problems',
      lessons: [
        {
          title: 'Addition Stories',
          description: 'Solve problems about combining groups',
          duration: '25 mins',
          objectives: [
            'Read and understand problems',
            'Choose the right operation',
            'Show working out'
          ]
        },
        {
          title: 'Subtraction Stories',
          description: 'Solve problems about taking away',
          duration: '25 mins',
          objectives: [
            'Understand subtraction situations',
            'Choose the right method',
            'Explain solutions'
          ]
        }
      ]
    },
    'addition-and-subtraction-facts': {
      title: 'Addition and Subtraction Facts',
      color: 'green',
      description: 'Practice basic math facts for quick recall',
      lessons: [
        {
          title: 'Addition Facts to 20',
          description: 'Master basic addition facts',
          duration: '20 mins',
          objectives: [
            'Learn addition facts',
            'Practice quick recall',
            'Use fact families'
          ]
        },
        {
          title: 'Subtraction Facts to 20',
          description: 'Master basic subtraction facts',
          duration: '20 mins',
          objectives: [
            'Learn subtraction facts',
            'Connect to addition',
            'Practice fact families'
          ]
        }
      ]
    }
  }
};

export default function SubtopicPage() {
  const params = useParams();
  const { selectedLevel } = useLevel();
  
  const topicSlug = params.topic as string;
  const subtopicSlug = params.subtopic as string;
  
  console.log('Looking for:', { topicSlug, subtopicSlug }); // Debug log
  
  const subtopic = subtopicLessons[topicSlug]?.[subtopicSlug];

  if (!subtopic) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Subtopic not found</h1>
          <p className="text-gray-600 mb-4">Looking for: {subtopicSlug}</p>
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