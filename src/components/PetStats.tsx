import React from 'react';
import { Heart, Fish, Coffee, Gift, Crown, ThumbsUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePetGame } from '@/context/PetGameContext';

const PetStats = () => {
  const {
    petName,
    setPetName,
    happiness,
    hunger,
    energy,
    points,
    level,
    streak,
    feed,
    play,
    rest,
    levelUp
  } = usePetGame();

  return (
    <div className="glass-card dark:glass-card-dark rounded-2xl p-6 animate-scale-in order-2 md:order-1 transition-all duration-300">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-medium text-reviva-deep-teal">{petName}'s Stats</h3>
          <button 
            onClick={() => {
              const newName = prompt("Enter a new name for your pet", petName);
              if (newName) setPetName(newName);
            }}
            className="text-xs px-2 py-1 bg-reviva-mint/50 text-reviva-deep-teal rounded-full transition-all hover:bg-reviva-mint/70 hover:scale-105 active:scale-95"
          >
            Rename
          </button>
        </div>
        <div className="flex items-center">
          <Gift className="h-5 w-5 text-reviva-teal mr-1" />
          <span className="font-medium">{points} points</span>
        </div>
      </div>
      
      <div className="mb-4 p-3 bg-reviva-mint/20 dark:bg-reviva-teal/10 rounded-lg flex items-center justify-between">
        <div className="flex items-center">
          <div className="p-2 bg-reviva-mint/50 rounded-full mr-2">
            <Crown className="h-4 w-4 text-reviva-teal" />
          </div>
          <span>Level {level}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-40 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
            <div 
              className="bg-reviva-teal h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${(points / (level * 100)) * 100}%` }}
            ></div>
          </div>
          <button 
            onClick={levelUp}
            disabled={points < level * 100}
            className={cn(
              "text-xs px-2 py-1 rounded-full transition-all duration-300",
              points >= level * 100
                ? "bg-reviva-teal text-white hover:bg-reviva-teal/90 hover:scale-105 active:scale-95"
                : "bg-gray-200 text-gray-500 dark:bg-gray-700"
            )}
          >
            Level Up
          </button>
        </div>
      </div>
      
      <div className="mb-3 p-3 bg-reviva-mint/20 dark:bg-reviva-teal/10 rounded-lg flex items-center gap-2">
        <ThumbsUp className="h-4 w-4 text-reviva-teal" />
        <span className="text-sm">Daily Streak: {streak} days</span>
        <div className="flex items-center gap-1 ml-auto">
          {[1, 2, 3, 4, 5, 6, 7].map((day) => (
            <div 
              key={day}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                day <= streak 
                  ? "bg-reviva-teal" 
                  : "bg-gray-200 dark:bg-gray-700"
              )}
            ></div>
          ))}
        </div>
      </div>
      
      <div className="space-y-4 mb-6">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm flex items-center">
              <Heart className="h-4 w-4 text-pink-500 mr-1" /> Happiness
            </span>
            <span className="text-sm font-medium">{happiness}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
            <div 
              className="bg-pink-500 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${happiness}%` }}
            ></div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm flex items-center">
              <Fish className="h-4 w-4 text-orange-500 mr-1" /> Hunger
            </span>
            <span className="text-sm font-medium">{hunger}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
            <div 
              className="bg-orange-500 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${hunger}%` }}
            ></div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm flex items-center">
              <Coffee className="h-4 w-4 text-blue-500 mr-1" /> Energy
            </span>
            <span className="text-sm font-medium">{energy}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
            <div 
              className="bg-blue-500 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${energy}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-3">
        <button 
          onClick={feed}
          className={cn(
            "flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-300",
            hunger >= 100 
              ? "bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800" 
              : "bg-orange-100 text-orange-600 hover:bg-orange-200 hover:scale-105 active:scale-95 dark:bg-orange-900/30 dark:text-orange-300 dark:hover:bg-orange-900/50"
          )}
          disabled={hunger >= 100}
        >
          <Fish className="h-6 w-6 mb-1" />
          <span className="text-xs font-medium">Feed</span>
        </button>
        
        <button 
          onClick={play}
          className={cn(
            "flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-300",
            energy <= 20
              ? "bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800" 
              : "bg-pink-100 text-pink-600 hover:bg-pink-200 hover:scale-105 active:scale-95 dark:bg-pink-900/30 dark:text-pink-300 dark:hover:bg-pink-900/50"
          )}
          disabled={energy <= 20}
        >
          <Heart className="h-6 w-6 mb-1" />
          <span className="text-xs font-medium">Play</span>
        </button>
        
        <button 
          onClick={rest}
          className="flex flex-col items-center justify-center p-3 rounded-xl bg-blue-100 text-blue-600 hover:bg-blue-200 transition-all duration-300 hover:scale-105 active:scale-95 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50"
        >
          <Coffee className="h-6 w-6 mb-1" />
          <span className="text-xs font-medium">Rest</span>
        </button>
      </div>
    </div>
  );
};

export default PetStats;
