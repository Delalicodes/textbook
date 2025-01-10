'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaArrowLeft, FaCheck, FaTimes, FaLock } from 'react-icons/fa';

type ContentType = 'introduction' | 'example' | 'practice';

interface ContentItem {
  type: ContentType;
  text: string;
  objects?: string[];
  question?: string;
  answer?: number;
}

interface LessonSection {
  id: number;
  title: string;
  content: ContentItem[];
}

export default function CountingObjectsLesson() {
  const [currentSection, setCurrentSection] = useState(1);
  const [userAnswer, setUserAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [completedSections, setCompletedSections] = useState<number[]>([]);

  const lessonSections: LessonSection[] = [
    {
      id: 1,
      title: "Let's Learn to Count!",
      content: [
        {
          type: 'introduction',
          text: 'Today we will learn how to count objects from 1 to 10. Counting is like giving each object a special number name in order.'
        },
        {
          type: 'example',
          objects: ['🍎', '🍎', '🍎'],
          text: 'Here are 3 apples. Let\'s count them together: one, two, three!'
        },
        {
          type: 'practice',
          objects: ['🌟', '🌟', '🌟', '🌟'],
          text: 'Practice counting stars',
          question: 'Now you try! How many stars do you see?',
          answer: 4
        }
      ]
    },
    {
      id: 2,
      title: "Counting to 10",
      content: [
        {
          type: 'introduction',
          text: 'Now let\'s practice counting up to 10 objects.'
        },
        {
          type: 'example',
          objects: ['🎈', '🎈', '🎈', '🎈', '🎈'],
          text: 'Here are 5 balloons. Count them: one, two, three, four, five!'
        },
        {
          type: 'practice',
          objects: ['🐱', '🐱', '🐱', '🐱', '🐱', '🐱'],
          text: 'Practice counting cats',
          question: 'Your turn! How many cats do you see?',
          answer: 6
        }
      ]
    },
    {
      id: 3,
      title: "Let's Count Different Objects",
      content: [
        {
          type: 'introduction',
          text: 'We can count any kind of object. The number stays the same no matter what we\'re counting!'
        },
        {
          type: 'example',
          objects: ['🌺', '🌺', '🌺', '🌺', '🌺', '🌺', '🌺'],
          text: 'Count these flowers: one, two, three, four, five, six, seven!'
        },
        {
          type: 'practice',
          objects: ['🎁', '🎁', '🎁', '🎁', '🎁', '🎁', '🎁', '🎁'],
          text: 'Practice counting presents',
          question: 'How many presents are there?',
          answer: 8
        }
      ]
    }
  ];

  const currentSectionData = lessonSections[currentSection - 1];

  const handleAnswerCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const practiceItem = currentSectionData.content.find(item => item.type === 'practice');
    if (practiceItem?.answer !== undefined) {
      const isAnswerCorrect = parseInt(userAnswer) === practiceItem.answer;
      setIsCorrect(isAnswerCorrect);
      setShowFeedback(true);

      if (isAnswerCorrect && !completedSections.includes(currentSection)) {
        setCompletedSections([...completedSections, currentSection]);
      }
    }
  };

  const canMoveToNextSection = () => {
    return completedSections.includes(currentSection) || currentSection === 1;
  };

  const handleNextSection = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentSection < lessonSections.length && canMoveToNextSection()) {
      setCurrentSection(prev => prev + 1);
      setUserAnswer('');
      setShowFeedback(false);
    }
  };

  const handlePreviousSection = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentSection > 1) {
      setCurrentSection(prev => prev - 1);
      setUserAnswer('');
      setShowFeedback(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mb-8">
        <Link 
          href="/chapters/numbers-0-100"
          className="text-gray-600 hover:text-gray-800 flex items-center gap-2"
        >
          <FaArrowLeft /> Back to Numbers (0-100)
        </Link>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-md p-8 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Counting Objects</h1>
          
          <div className="flex gap-2 mb-8">
            {lessonSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setCurrentSection(section.id)}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentSection === section.id
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {section.id}
              </button>
            ))}
          </div>

          <div className="space-y-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {currentSectionData.title}
            </h2>

            {currentSectionData.content.map((item, index) => {
              switch (item.type) {
                case 'introduction':
                  return (
                    <div key={index} className="text-gray-700 text-lg">
                      {item.text}
                    </div>
                  );
                case 'example':
                  return (
                    <div key={index} className="bg-blue-50 p-6 rounded-lg">
                      <div className="text-4xl mb-4 flex gap-2">
                        {item.objects?.map((obj, i) => (
                          <span key={i} className="animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}>
                            {obj}
                          </span>
                        ))}
                      </div>
                      <p className="text-blue-700">{item.text}</p>
                    </div>
                  );
                case 'practice':
                  return (
                    <div key={index} className="bg-purple-50 p-6 rounded-lg">
                      <div className="text-4xl mb-4 flex gap-2">
                        {item.objects?.map((obj, i) => (
                          <span key={i} className="animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}>
                            {obj}
                          </span>
                        ))}
                      </div>
                      <p className="text-purple-700 mb-4">{item.question}</p>
                      <form onSubmit={handleAnswerCheck} className="space-y-4">
                        <div className="flex gap-4">
                          <input
                            type="number"
                            value={userAnswer}
                            onChange={(e) => setUserAnswer(e.target.value)}
                            className="w-24 p-2 border-2 border-purple-200 rounded-lg focus:border-purple-500 focus:outline-none"
                            placeholder="?"
                            min="0"
                            max="20"
                          />
                          <button 
                            type="submit"
                            className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600"
                          >
                            Check Answer
                          </button>
                        </div>
                        {showFeedback && (
                          <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
                            <div className="flex items-center gap-2">
                              {isCorrect ? (
                                <>
                                  <FaCheck className="text-green-500" />
                                  <span className="text-green-700">Correct! Well done!</span>
                                </>
                              ) : (
                                <>
                                  <FaTimes className="text-red-500" />
                                  <span className="text-red-700">Try again! Count each object one by one.</span>
                                </>
                              )}
                            </div>
                          </div>
                        )}
                      </form>
                    </div>
                  );
                default:
                  return null;
              }
            })}
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={handlePreviousSection}
            disabled={currentSection === 1}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              currentSection === 1
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-purple-500 text-white hover:bg-purple-600'
            }`}
          >
            <FaArrowLeft /> Previous Lesson
          </button>
          <button
            onClick={handleNextSection}
            disabled={currentSection === lessonSections.length || !canMoveToNextSection()}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              currentSection === lessonSections.length || !canMoveToNextSection()
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-purple-500 text-white hover:bg-purple-600'
            }`}
          >
            {!canMoveToNextSection() ? <FaLock className="mr-2" /> : null}
            Next Lesson <FaArrowLeft className="rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
} 