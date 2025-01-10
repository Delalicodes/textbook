'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaArrowLeft, FaStar } from 'react-icons/fa';

// Define card types and interfaces
type ShapeType = {
  id: string;
  shape: string;
  name: string;
};

type CardType = {
  id: string;
  shapeId: string;
  shape: string;
  name: string;
  isFlipped: boolean;
  isMatched: boolean;
};

export default function ShapeMatchingGame() {
  // Available shapes for the game
  const shapes: ShapeType[] = [
    { id: '1', shape: '⭕', name: 'Circle' },
    { id: '2', shape: '⬛', name: 'Square' },
    { id: '3', shape: '📐', name: 'Triangle' },
    { id: '4', shape: '📄', name: 'Rectangle' }
  ];

  // Game state
  const [cards, setCards] = useState<CardType[]>([]);
  const [firstCard, setFirstCard] = useState<CardType | null>(null);
  const [secondCard, setSecondCard] = useState<CardType | null>(null);
  const [canFlip, setCanFlip] = useState(true);
  const [moves, setMoves] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);

  // Initialize game
  const initializeGame = () => {
    // Create pairs of cards
    const cardPairs = shapes.flatMap((shape) => [
      {
        id: `${shape.id}-1`,
        shapeId: shape.id,
        shape: shape.shape,
        name: shape.name,
        isFlipped: false,
        isMatched: false
      },
      {
        id: `${shape.id}-2`,
        shapeId: shape.id,
        shape: shape.shape,
        name: shape.name,
        isFlipped: false,
        isMatched: false
      }
    ]);

    // Shuffle cards
    const shuffledCards = [...cardPairs]
      .sort(() => Math.random() - 0.5);

    setCards(shuffledCards);
    setFirstCard(null);
    setSecondCard(null);
    setCanFlip(true);
    setMoves(0);
    setMatchedPairs(0);
  };

  // Start game on component mount
  useEffect(() => {
    initializeGame();
  }, []);

  // Handle card click
  const handleCardClick = (clickedCard: CardType) => {
    // Return if card can't be flipped
    if (!canFlip || clickedCard.isMatched || clickedCard.isFlipped) {
      return;
    }

    // Flip the card
    const newCards = cards.map(card =>
      card.id === clickedCard.id ? { ...card, isFlipped: true } : card
    );
    setCards(newCards);

    if (!firstCard) {
      // First card of the pair
      setFirstCard(clickedCard);
    } else if (!secondCard && firstCard.id !== clickedCard.id) {
      // Second card of the pair
      setSecondCard(clickedCard);
      setCanFlip(false);
      setMoves(prev => prev + 1);

      // Check for match
      if (firstCard.shapeId === clickedCard.shapeId) {
        // Match found
        setTimeout(() => {
          setCards(prevCards =>
            prevCards.map(card =>
              card.id === firstCard.id || card.id === clickedCard.id
                ? { ...card, isMatched: true }
                : card
            )
          );
          setMatchedPairs(prev => prev + 1);
          resetSelection();
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          setCards(prevCards =>
            prevCards.map(card =>
              card.id === firstCard.id || card.id === clickedCard.id
                ? { ...card, isFlipped: false }
                : card
            )
          );
          resetSelection();
        }, 1000);
      }
    }
  };

  // Reset card selection
  const resetSelection = () => {
    setFirstCard(null);
    setSecondCard(null);
    setCanFlip(true);
  };

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
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Shape Matching Game</h1>
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <span className="text-gray-600">Moves: {moves}</span>
              <span className="text-gray-600">
                Matches: {matchedPairs}/{shapes.length}
              </span>
            </div>
            <button
              onClick={initializeGame}
              className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
            >
              New Game
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {cards.map(card => (
            <div key={card.id} className="relative h-32">
              <button
                onClick={() => handleCardClick(card)}
                disabled={!canFlip || card.isMatched || card.isFlipped}
                className="w-full h-full"
              >
                <div
                  className={`
                    absolute w-full h-full
                    transition-all duration-500
                    transform-gpu preserve-3d
                    ${card.isFlipped || card.isMatched ? 'rotate-y-180' : ''}
                  `}
                >
                  {/* Front of card */}
                  <div
                    className={`
                      absolute w-full h-full
                      rounded-xl
                      flex items-center justify-center
                      bg-gradient-to-br from-purple-100 to-purple-200
                      border-2 border-purple-300
                      cursor-pointer
                      backface-hidden
                      ${!card.isMatched && !card.isFlipped && canFlip ? 'hover:scale-105' : ''}
                      transition-transform
                    `}
                  >
                    <span className="text-3xl">?</span>
                  </div>
                  
                  {/* Back of card */}
                  <div
                    className={`
                      absolute w-full h-full
                      rounded-xl
                      flex items-center justify-center
                      ${card.isMatched ? 'bg-green-50 border-green-200' : 'bg-white border-purple-200'}
                      border-2
                      cursor-pointer
                      backface-hidden
                      rotate-y-180
                    `}
                  >
                    <span className="text-4xl">{card.shape}</span>
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>

        {matchedPairs === shapes.length && (
          <div className="mt-6 bg-green-100 text-green-700 p-4 rounded-xl flex items-center gap-2 animate-bounce">
            <FaStar className="text-yellow-500" />
            <span className="font-semibold">
              Congratulations! You completed the game in {moves} moves!
            </span>
          </div>
        )}
      </div>

      <style jsx global>{`
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
} 