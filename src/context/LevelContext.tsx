'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type LevelContextType = {
  selectedLevel: string;
  setSelectedLevel: (level: string) => void;
};

const LevelContext = createContext<LevelContextType | undefined>(undefined);

export function LevelProvider({ children }: { children: ReactNode }) {
  const [selectedLevel, setSelectedLevel] = useState<string>('');

  // Load the selected level from localStorage on mount
  useEffect(() => {
    const savedLevel = localStorage.getItem('selectedLevel');
    if (savedLevel) {
      setSelectedLevel(savedLevel);
    }
  }, []);

  // Save the selected level to localStorage whenever it changes
  const handleSetLevel = (level: string) => {
    setSelectedLevel(level);
    localStorage.setItem('selectedLevel', level);
  };

  return (
    <LevelContext.Provider value={{ selectedLevel, setSelectedLevel: handleSetLevel }}>
      {children}
    </LevelContext.Provider>
  );
}

export function useLevel() {
  const context = useContext(LevelContext);
  if (context === undefined) {
    throw new Error('useLevel must be used within a LevelProvider');
  }
  return context;
}