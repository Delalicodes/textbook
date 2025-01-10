'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type LevelContextType = {
  selectedLevel: string;
  setSelectedLevel: (level: string) => void;
};

const LevelContext = createContext<LevelContextType | undefined>(undefined);

export function LevelProvider({ children }: { children: ReactNode }) {
  const [selectedLevel, setSelectedLevel] = useState('');

  return (
    <LevelContext.Provider value={{ selectedLevel, setSelectedLevel }}>
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