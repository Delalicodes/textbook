'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaArrowLeft, FaStar } from 'react-icons/fa';

interface Card {
  id: number;
  shape: string;
  name: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export default function ShapeMatchingGame() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matches, setMatches] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);

  const shapes = [
    { shape: '⭕', name: 'Circle' },
    { shape: '⬛', name: 'Square' },
    { shape: '📐', name: 'Triangle' },
    { shape: '📄', name: 'Rectangle' }
  ];

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    // Create pairs of cards
    const cardPairs = [...shapes, ...shapes].map((item, index) => ({
      id: index,
      shape: item.shape,
      name: item.name,
      isFlipped: false,
      isMatched: false
    }));

    // Shuffle the cards
    const shuffledCards = cardPairs.sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatches(0);
    setMoves(0);
  };

  const handleCardClick = (cardId: number) => {
    // Ignore if card is already flipped or matched
    if (cards[cardId].isFlipped || cards[cardId].isMatched) return;
    // Ignore if two cards are already flipped
    if (flippedCards.length === 2) return;

    // Flip the card
    const updatedCards = cards.map(card =>
      card.id === cardId ? { ...card, isFlipped: true } : card
    );
    setCards(updatedCards);
    
    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    // If two cards are flipped, check for a match
    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      const [firstCard, secondCard] = newFlippedCards;
      
      if (cards[firstCard].name === cards[secondCard].name) {
        // Match found
        setTimeout(() => {
          setCards(cards.map(card =>
            card.id === firstCard || card.id === secondCard
              ? { ...card, isMatched: true }
              : card
          ));
          setFlippedCards([]);
          setMatches(matches + 1);
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          setCards(cards.map(card =>
            card.id === firstCard || card.id === secondCard
              ? { ...card, isFlipped: false }
              : card
          ));
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

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

      <div className="max-w-4xl mx-auto">
        {/* Game Header */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Shape Matching Game</h1>
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <span className="text-gray-600">Moves: {moves}</span>
              <span className="text-gray-600">Matches: {matches}/{shapes.length}</span>
            </div>
            <button
              onClick={initializeGame}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              New Game
            </button>
          </div>
        </div>

        {/* Game Grid */}
        <div className="grid grid-cols-4 gap-4">
          {cards.map(card => (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`aspect-square rounded-xl text-4xl flex items-center justify-center transition-all transform ${
                card.isFlipped || card.isMatched
                  ? 'bg-white rotate-0'
                  : 'bg-blue-500 rotate-180'
              } ${
                card.isMatched ? 'bg-green-100' : ''
              }`}
              disabled={card.isMatched}
            >
              {(card.isFlipped || card.isMatched) && (
                <span className="transform rotate-0">{card.shape}</span>
              )}
            </button>
          ))}
        </div>

        {/* Win Message */}
        {matches === shapes.length && (
          <div className="mt-6 bg-green-100 text-green-700 p-4 rounded-xl flex items-center gap-2">
            <FaStar className="text-yellow-500" />
            Congratulations! You completed the game in {moves} moves!
          </div>
        )}
      </div>
    </div>
  );
} 