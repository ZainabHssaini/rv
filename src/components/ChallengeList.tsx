import React from 'react';
import { Check, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePetGame } from '@/context/PetGameContext';

const ChallengeList = () => {
  const { challenges, setActiveChallenge } = usePetGame();

  const handleChallengeClick = (challengeId: string) => {
    const challenge = challenges.find(c => c.id === challengeId);
    if (challenge && !challenge.completed) {
      setActiveChallenge(challenge);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-reviva-purple mb-6 text-center">
        Daily Mental Health Challenges
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {challenges.map((challenge, index) => (
          <div 
            key={challenge.id}
            className={cn(
              "glass-card dark:glass-card-dark p-4 rounded-xl animate-scale-in transition-all duration-300 hover:shadow-md",
              index === 1 && "delay-100",
              index === 2 && "delay-200",
              index === 3 && "delay-300",
              !challenge.completed && "hover:translate-y-[-2px] cursor-pointer"
            )}
            onClick={() => handleChallengeClick(challenge.id)}
          >
            <div className="flex items-start gap-3">
              <div className={cn(
                "p-2 rounded-full",
                challenge.completed 
                  ? "bg-green-100 dark:bg-green-900/30" 
                  : "bg-reviva-mint/30"
              )}>
                {challenge.completed ? (
                  <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                ) : (
                  <XCircle className="h-5 w-5 text-reviva-teal" />
                )}
              </div>
              <div>
                <h3 className="font-medium text-reviva-deep-teal">{challenge.title}</h3>
                <p className="text-sm text-reviva-charcoal/80 dark:text-white/80 mb-2">
                  {challenge.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-reviva-teal">+{challenge.points} points</span>
                  <button 
                    className={cn(
                      "text-xs px-2 py-1 rounded-full transition-all duration-300",
                      challenge.completed
                        ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-reviva-mint/30 text-reviva-deep-teal hover:bg-reviva-mint/50"
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!challenge.completed) {
                        handleChallengeClick(challenge.id);
                      }
                    }}
                  >
                    {challenge.completed ? "Completed" : "Complete"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChallengeList;
