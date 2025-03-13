import React from 'react';
import { Crown } from 'lucide-react';
import { usePetGame } from '@/context/PetGameContext';

const LevelUpModal = () => {
  const { showLevelUp, setShowLevelUp, petName, level } = usePetGame();

  if (!showLevelUp) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-reviva-charcoal rounded-xl p-8 shadow-2xl animate-scale-in max-w-md text-center">
        <div className="p-4 bg-yellow-100 dark:bg-yellow-900/30 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
          <Crown className="h-10 w-10 text-yellow-600 dark:text-yellow-400" />
        </div>
        <h2 className="text-2xl font-bold text-reviva-purple mb-2">Level Up!</h2>
        <p className="text-lg font-medium text-reviva-teal mb-1">
          {petName} is now level {level}!
        </p>
        <p className="text-reviva-charcoal/80 dark:text-white/80 mb-6">
          Congratulations on reaching the next level!
        </p>
        <button 
          onClick={() => setShowLevelUp(false)}
          className="reviva-button"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default LevelUpModal;
