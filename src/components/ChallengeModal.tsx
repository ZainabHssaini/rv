import React, { useState, useEffect, useRef } from 'react';
import { X, CheckCircle, AlarmClock, PenLine, Wind, SmilePlus } from 'lucide-react';
import { usePetGame } from '@/context/PetGameContext';
import { cn } from '@/lib/utils';

const TimerCircle = ({ progress }: { progress: number }) => (
  <div className="w-40 h-40 relative mx-auto mb-4">
    <svg className="w-full h-full" viewBox="0 0 100 100">
      {/* Background circle */}
      <circle 
        cx="50" 
        cy="50" 
        r="45" 
        fill="none" 
        stroke="#E2E8F0" 
        strokeWidth="5"
      />
      {/* Progress circle */}
      <circle 
        cx="50" 
        cy="50" 
        r="45"
        fill="none"
        stroke="#38B2AC"
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray={`${Math.PI * 2 * 45}`}
        strokeDashoffset={`${Math.PI * 2 * 45 * (1 - progress)}`}
        transform="rotate(-90 50 50)"
        className="transition-all duration-300"
      />
    </svg>
    <div className="absolute inset-0 flex items-center justify-center">
      <span className="text-3xl font-semibold text-reviva-deep-teal">{Math.ceil((1 - progress) * 100)}%</span>
    </div>
  </div>
);

const GratitudeJournal = ({ onComplete }: { onComplete: () => void }) => {
  const [entries, setEntries] = useState<string[]>(["", "", ""]);
  const [isComplete, setIsComplete] = useState(false);

  const handleChange = (index: number, value: string) => {
    const newEntries = [...entries];
    newEntries[index] = value;
    setEntries(newEntries);
    
    // Check if all entries have content
    setIsComplete(newEntries.every(entry => entry.trim().length > 0));
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <PenLine className="w-12 h-12 text-reviva-teal mx-auto mb-2" />
        <p className="text-reviva-deep-teal">Write down 3 things you're grateful for today</p>
      </div>
      
      {entries.map((entry, index) => (
        <div key={index} className="relative">
          <input
            type="text"
            placeholder={`I'm grateful for...`}
            value={entry}
            onChange={(e) => handleChange(index, e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-reviva-teal focus:border-transparent transition-all"
          />
          <div className="absolute left-0 top-0 h-full w-1 bg-reviva-teal rounded-l-lg opacity-40"></div>
        </div>
      ))}
      
      <button
        onClick={onComplete}
        disabled={!isComplete}
        className={cn(
          "w-full py-3 rounded-lg mt-4 transition-all duration-300 font-medium",
          isComplete
            ? "bg-reviva-teal text-white hover:bg-reviva-teal/90"
            : "bg-gray-200 text-gray-500 cursor-not-allowed"
        )}
      >
        Complete
      </button>
    </div>
  );
};

const MoodTracker = ({ onComplete }: { onComplete: () => void }) => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [note, setNote] = useState("");
  
  const moods = [
    { emoji: "😢", label: "Sad" },
    { emoji: "😐", label: "Okay" },
    { emoji: "🙂", label: "Good" },
    { emoji: "😄", label: "Happy" },
    { emoji: "🤩", label: "Amazing" }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <SmilePlus className="w-12 h-12 text-reviva-teal mx-auto mb-2" />
        <p className="text-reviva-deep-teal">How are you feeling today?</p>
      </div>
      
      <div className="flex justify-between items-center">
        {moods.map((mood, index) => (
          <button
            key={index}
            onClick={() => setSelectedMood(index)}
            className={cn(
              "flex flex-col items-center p-3 rounded-lg transition-all duration-300",
              selectedMood === index 
                ? "bg-reviva-mint/50 scale-110 shadow-md" 
                : "hover:bg-reviva-mint/20 hover:scale-105"
            )}
          >
            <span className="text-2xl mb-1">{mood.emoji}</span>
            <span className="text-xs">{mood.label}</span>
          </button>
        ))}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-reviva-deep-teal mb-2">Anything else you want to note?</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Optional: Write any thoughts here..."
          className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-reviva-teal focus:border-transparent transition-all h-24 resize-none"
        />
      </div>
      
      <button
        onClick={onComplete}
        disabled={selectedMood === null}
        className={cn(
          "w-full py-3 rounded-lg transition-all duration-300 font-medium",
          selectedMood !== null
            ? "bg-reviva-teal text-white hover:bg-reviva-teal/90"
            : "bg-gray-200 text-gray-500 cursor-not-allowed"
        )}
      >
        Complete
      </button>
    </div>
  );
};

const TimerChallenge = ({ 
  duration, 
  onComplete,
  icon
}: { 
  duration: number, 
  onComplete: () => void,
  icon: React.ReactNode
}) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isActive, setIsActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const startTimer = () => {
    setIsActive(true);
    
    intervalRef.current = window.setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          setIsActive(false);
          onComplete();
          return 0;
        }
        return prev - 1;
      });
      
      setProgress(prev => prev + 1/duration);
    }, 1000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="text-center">
      <div className="mb-6">
        <div className="w-16 h-16 mx-auto mb-2 flex items-center justify-center text-reviva-teal">
          {icon}
        </div>
        <p className="text-reviva-deep-teal">Take a moment to focus</p>
      </div>
      
      <TimerCircle progress={progress} />
      
      <div className="text-3xl font-bold text-reviva-deep-teal mb-8">
        {formatTime(timeLeft)}
      </div>
      
      {!isActive ? (
        <button
          onClick={startTimer}
          className="px-8 py-3 bg-reviva-teal text-white rounded-full hover:bg-reviva-teal/90 transition-all duration-300 font-medium hover:scale-105 active:scale-95"
        >
          Start
        </button>
      ) : (
        <p className="text-reviva-teal animate-pulse">
          Just breathe and focus...
        </p>
      )}
    </div>
  );
};

const ChallengeModal = () => {
  const { 
    activeChallenge, 
    setActiveChallenge, 
    completeChallenge,
    challengeCompleted,
    setChallengeCompleted
  } = usePetGame();

  if (!activeChallenge) return null;

  const handleComplete = () => {
    setChallengeCompleted(true);
    
    // Add a small delay before completing the challenge
    setTimeout(() => {
      completeChallenge(activeChallenge.id);
      
      // Close modal after another brief delay
      setTimeout(() => {
        setActiveChallenge(null);
        setChallengeCompleted(false);
      }, 1500);
    }, 500);
  };

  const renderChallengeContent = () => {
    if (challengeCompleted) {
      return (
        <div className="flex flex-col items-center justify-center py-10 animate-scale-in">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-reviva-deep-teal mb-2">Challenge Completed!</h3>
          <p className="text-reviva-charcoal/80 dark:text-white/80 mb-3">
            You earned {activeChallenge.points} points
          </p>
        </div>
      );
    }

    switch (activeChallenge.type) {
      case 'meditation':
        return (
          <TimerChallenge 
            duration={activeChallenge.duration || 120} 
            onComplete={handleComplete}
            icon={<AlarmClock className="w-full h-full" />}
          />
        );
      case 'breathing':
        return (
          <TimerChallenge 
            duration={activeChallenge.duration || 120} 
            onComplete={handleComplete}
            icon={<Wind className="w-full h-full" />}
          />
        );
      case 'gratitude':
        return <GratitudeJournal onComplete={handleComplete} />;
      case 'mood':
        return <MoodTracker onComplete={handleComplete} />;
      default:
        return (
          <div className="text-center p-6">
            <p className="text-reviva-deep-teal">Challenge content not available</p>
            <button
              onClick={handleComplete}
              className="px-6 py-2 bg-reviva-teal text-white rounded-full mt-4"
            >
              Complete Anyway
            </button>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white dark:bg-reviva-charcoal max-w-md w-full rounded-2xl p-6 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-reviva-deep-teal">{activeChallenge.title}</h3>
          <button 
            onClick={() => {
              if (!challengeCompleted) {
                setActiveChallenge(null);
              }
            }}
            disabled={challengeCompleted}
            className={cn(
              "p-2 rounded-full transition-all duration-300", 
              !challengeCompleted 
                ? "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800" 
                : "text-gray-300 cursor-not-allowed"
            )}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="mt-4">
          {renderChallengeContent()}
        </div>
      </div>
    </div>
  );
};

export default ChallengeModal;
