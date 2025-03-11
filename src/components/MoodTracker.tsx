
import { useState } from 'react';
import { Calendar, Info } from 'lucide-react';

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);

  const moods = [
    { emoji: "😔", label: "Sad", color: "bg-blue-100 dark:bg-blue-900/30" },
    { emoji: "😟", label: "Worried", color: "bg-purple-100 dark:bg-purple-900/30" },
    { emoji: "😐", label: "Neutral", color: "bg-gray-100 dark:bg-gray-800/30" },
    { emoji: "🙂", label: "Good", color: "bg-green-100 dark:bg-green-900/30" },
    { emoji: "😄", label: "Great", color: "bg-yellow-100 dark:bg-yellow-900/30" },
  ];

  const handleMoodSelect = (index: number) => {
    setSelectedMood(index);
  };

  return (
    <section id="mood-tracker" className="py-20 bg-gradient-to-b from-reviva-mint/20 to-transparent dark:from-reviva-purple/10 dark:to-transparent">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-reviva-purple mb-4">
              Track Your Mood Journey
            </h2>
            <p className="text-lg text-reviva-charcoal/80 dark:text-white/80 max-w-3xl mx-auto">
              Regular check-ins help you understand your emotional patterns and progress over time.
            </p>
          </div>

          <div className="glass-card dark:glass-card-dark rounded-2xl p-6 md:p-8 shadow-lg animate-scale-in">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-reviva-teal mr-2" />
                <h3 className="text-xl font-medium">Today's Check-in</h3>
              </div>
              <button className="text-reviva-teal hover:text-reviva-deep-teal transition-colors">
                <Info className="h-5 w-5" />
              </button>
            </div>

            <p className="mb-6 text-reviva-charcoal/80 dark:text-white/80">
              How are you feeling today?
            </p>

            <div className="grid grid-cols-5 gap-2 mb-8">
              {moods.map((mood, index) => (
                <button
                  key={index}
                  className={`${mood.color} rounded-xl p-4 flex flex-col items-center transition-all ${
                    selectedMood === index 
                      ? 'ring-2 ring-reviva-teal scale-105' 
                      : 'hover:scale-105'
                  }`}
                  onClick={() => handleMoodSelect(index)}
                >
                  <span className="text-3xl mb-2">{mood.emoji}</span>
                  <span className="text-sm font-medium">{mood.label}</span>
                </button>
              ))}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-reviva-charcoal/80 dark:text-white/80">
                What's contributing to your mood? (Optional)
              </label>
              <textarea 
                className="reviva-input w-full h-24"
                placeholder="Share your thoughts..."
              ></textarea>
            </div>

            <div className="flex justify-end">
              <button 
                className={`reviva-button ${!selectedMood ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={selectedMood === null}
              >
                Save Check-in
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MoodTracker;
