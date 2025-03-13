
import { createContext, useState, ReactNode } from 'react';

interface PetGameContextType {
  petName: string;
  setPetName: (name: string) => void;
  happiness: number;
  setHappiness: (value: number | ((prev: number) => number)) => void;
  hunger: number;
  setHunger: (value: number | ((prev: number) => number)) => void;
  energy: number;
  setEnergy: (value: number | ((prev: number) => number)) => void;
  points: number;
  setPoints: (value: number | ((prev: number) => number)) => void;
  level: number;
  setLevel: (value: number | ((prev: number) => number)) => void;
  streak: number;
  setStreak: (value: number | ((prev: number) => number)) => void;
}

const defaultContextValue: PetGameContextType = {
  petName: "Whiskers",
  setPetName: () => {},
  happiness: 70,
  setHappiness: () => {},
  hunger: 60,
  setHunger: () => {},
  energy: 80, 
  setEnergy: () => {},
  points: 120,
  setPoints: () => {},
  level: 1,
  setLevel: () => {},
  streak: 3,
  setStreak: () => {},
};

export const PetGameContext = createContext<PetGameContextType>(defaultContextValue);

interface PetGameProviderProps {
  children: ReactNode;
}

export const PetGameProvider = ({ children }: PetGameProviderProps) => {
  const [petName, setPetName] = useState("Whiskers");
  const [happiness, setHappiness] = useState(70);
  const [hunger, setHunger] = useState(60);
  const [energy, setEnergy] = useState(80);
  const [points, setPoints] = useState(120);
  const [level, setLevel] = useState(1);
  const [streak, setStreak] = useState(3);

  return (
    <PetGameContext.Provider
      value={{
        petName,
        setPetName,
        happiness,
        setHappiness,
        hunger, 
        setHunger,
        energy,
        setEnergy,
        points,
        setPoints,
        level, 
        setLevel,
        streak,
        setStreak,
      }}
    >
      {children}
    </PetGameContext.Provider>
  );
};
