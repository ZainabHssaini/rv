
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, ChevronLeft, ChevronRight, Clock, Award, BarChart2, CheckCircle } from 'lucide-react';

type Mood = 'great' | 'good' | 'okay' | 'down' | 'bad';
type MoodEntry = {
  date: string;
  mood: Mood;
  note: string;
  timeOfDay: string;
};

const moodToValue: Record<Mood, number> = {
  great: 5,
  good: 4,
  okay: 3,
  down: 2,
  bad: 1,
};

const moodEmojis: Record<Mood, string> = {
  great: '😄',
  good: '🙂',
  okay: '😐',
  down: '😔',
  bad: '😞',
};

const MoodTrackerPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [moodNote, setMoodNote] = useState('');
  const [timeOfDay, setTimeOfDay] = useState('morning');
  const [recentEntries, setRecentEntries] = useState<MoodEntry[]>([
    { date: '2023-10-01', mood: 'okay', note: 'Feeling a bit stressed about work', timeOfDay: 'evening' },
    { date: '2023-10-02', mood: 'good', note: 'Had a nice walk outside today', timeOfDay: 'afternoon' },
    { date: '2023-10-03', mood: 'great', note: 'Completed a big project, feeling accomplished!', timeOfDay: 'evening' },
    { date: '2023-10-04', mood: 'down', note: 'Didn\'t sleep well, feeling tired', timeOfDay: 'morning' },
    { date: '2023-10-05', mood: 'good', note: 'Caught up with an old friend', timeOfDay: 'afternoon' },
    { date: '2023-10-06', mood: 'okay', note: 'Normal day, nothing special', timeOfDay: 'evening' },
    { date: '2023-10-07', mood: 'great', note: 'Weekend! Relaxing day at home', timeOfDay: 'morning' },
  ]);
  
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };
  
  const formattedDate = formatDate(currentDate);
  
  const todayEntry = recentEntries.find(entry => entry.date === formattedDate);
  
  const displayDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
  
  const handleSubmitMood = () => {
    if (!selectedMood) return;
    
    const newEntry: MoodEntry = {
      date: formattedDate,
      mood: selectedMood,
      note: moodNote,
      timeOfDay: timeOfDay,
    };
    
    const entryIndex = recentEntries.findIndex(entry => entry.date === formattedDate);
    
    if (entryIndex >= 0) {
      const updatedEntries = [...recentEntries];
      updatedEntries[entryIndex] = newEntry;
      setRecentEntries(updatedEntries);
    } else {
      setRecentEntries([...recentEntries, newEntry]);
    }
    
    setSelectedMood(null);
    setMoodNote('');
    
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };
  
  const chartData = recentEntries
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map(entry => ({
      date: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: moodToValue[entry.mood],
      mood: entry.mood,
    }));
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const mood = payload[0].payload.mood;
      return (
        <div className="glass-card dark:glass-card-dark p-2 text-sm">
          <p className="mb-1 font-medium">{label}</p>
          <p className="text-lg">{moodEmojis[mood as Mood]} {mood}</p>
        </div>
      );
    }
    return null;
  };
  
  const streak = 7;
  
  return (
    <div className="min-h-screen bg-white dark:bg-reviva-charcoal">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center p-2 bg-reviva-mint/30 rounded-full mb-4">
              <BarChart2 className="h-6 w-6 text-reviva-teal" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-reviva-purple mb-4">
              Mood Tracker
            </h1>
            <p className="text-lg text-reviva-charcoal/80 dark:text-white/80 max-w-3xl mx-auto">
              Track your emotional well-being over time to gain insights into patterns and triggers.
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="glass-card dark:glass-card-dark rounded-2xl p-6 animate-scale-in order-2 md:order-1">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-medium text-reviva-deep-teal">Today's Check-in</h2>
                <div className="flex items-center bg-reviva-mint/30 dark:bg-reviva-teal/10 px-2 py-1 rounded-lg">
                  <Calendar className="h-4 w-4 text-reviva-teal mr-1" />
                  <span className="text-sm">{displayDate}</span>
                </div>
              </div>
              
              {todayEntry ? (
                <div className="text-center p-4 bg-reviva-mint/20 dark:bg-reviva-teal/10 rounded-xl mb-6">
                  <div className="text-5xl mb-2">{moodEmojis[todayEntry.mood]}</div>
                  <h3 className="text-lg font-medium text-reviva-deep-teal capitalize mb-1">
                    {todayEntry.mood}
                  </h3>
                  <div className="flex items-center justify-center text-sm text-reviva-charcoal/70 dark:text-white/70 mb-3">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{todayEntry.timeOfDay}</span>
                  </div>
                  <p className="text-reviva-charcoal/80 dark:text-white/80 italic">
                    "{todayEntry.note}"
                  </p>
                  <button
                    onClick={() => {
                      setSelectedMood(todayEntry.mood);
                      setMoodNote(todayEntry.note);
                      setTimeOfDay(todayEntry.timeOfDay);
                    }}
                    className="mt-4 text-sm px-3 py-1 bg-reviva-teal text-white rounded-lg"
                  >
                    Edit Entry
                  </button>
                </div>
              ) : (
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-2">How are you feeling today?</h3>
                  <div className="grid grid-cols-5 gap-2 mb-4">
                    {(['great', 'good', 'okay', 'down', 'bad'] as Mood[]).map((mood) => (
                      <button
                        key={mood}
                        onClick={() => setSelectedMood(mood)}
                        className={`p-3 rounded-lg flex flex-col items-center transition-colors ${
                          selectedMood === mood
                            ? 'bg-reviva-teal text-white'
                            : 'bg-gray-100 dark:bg-reviva-purple/10 hover:bg-reviva-mint/50'
                        }`}
                      >
                        <span className="text-2xl mb-1">{moodEmojis[mood]}</span>
                        <span className="text-xs capitalize">{mood}</span>
                      </button>
                    ))}
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-sm font-medium mb-2">Time of day</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {['morning', 'afternoon', 'evening'].map((time) => (
                        <button
                          key={time}
                          onClick={() => setTimeOfDay(time)}
                          className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                            timeOfDay === time
                              ? 'bg-reviva-teal text-white'
                              : 'bg-gray-100 dark:bg-reviva-purple/10 hover:bg-reviva-mint/50'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-sm font-medium mb-2">Add a note (optional)</h3>
                    <textarea
                      value={moodNote}
                      onChange={(e) => setMoodNote(e.target.value)}
                      placeholder="What's on your mind today?"
                      className="w-full p-3 rounded-lg bg-gray-100 dark:bg-reviva-purple/10 focus:outline-none focus:ring-2 focus:ring-reviva-teal min-h-[100px]"
                    />
                  </div>
                  
                  <button
                    onClick={handleSubmitMood}
                    disabled={!selectedMood}
                    className={`w-full py-3 rounded-lg font-medium ${
                      selectedMood
                        ? 'bg-reviva-teal text-white'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-800'
                    }`}
                  >
                    Save Entry
                  </button>
                </div>
              )}
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">Mood Streak</h3>
                  <div className="flex items-center">
                    <Award className="h-5 w-5 text-yellow-500 mr-1" />
                    <span className="font-medium">{streak} days</span>
                  </div>
                </div>
                
                <div className="p-3 bg-reviva-mint/20 dark:bg-reviva-teal/10 rounded-lg">
                  <p className="text-sm text-reviva-charcoal/80 dark:text-white/80">
                    You've logged your mood for {streak} consecutive days! Keep up the good work to build self-awareness.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="glass-card dark:glass-card-dark rounded-2xl p-6 animate-scale-in order-1 md:order-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-medium text-reviva-deep-teal">Mood Insights</h2>
                <div className="text-sm text-reviva-charcoal/70 dark:text-white/70">
                  Last 7 days
                </div>
              </div>
              
              <div className="h-64 mb-8">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={chartData}
                    margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#eaeaea" />
                    <XAxis dataKey="date" />
                    <YAxis 
                      domain={[1, 5]} 
                      ticks={[1, 2, 3, 4, 5]} 
                      tickFormatter={(value) => {
                        const moods = ['', 'bad', 'down', 'okay', 'good', 'great'];
                        return moods[value];
                      }} 
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#1d858d" 
                      strokeWidth={3}
                      dot={{ r: 6, fill: "#1d858d", strokeWidth: 2, stroke: "#fff" }}
                      activeDot={{ r: 8, fill: "#1d858d", strokeWidth: 2, stroke: "#fff" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium mb-2">Recent Entries</h3>
                <div className="max-h-64 overflow-y-auto pr-2">
                  {recentEntries
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .slice(0, 5)
                    .map((entry, idx) => (
                      <div 
                        key={idx}
                        className="flex items-start p-3 border-b border-gray-200 dark:border-gray-700 last:border-0"
                      >
                        <div className="flex-shrink-0 mr-3 text-2xl">
                          {moodEmojis[entry.mood]}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium capitalize">{entry.mood}</h4>
                            <div className="text-xs text-reviva-charcoal/70 dark:text-white/70">
                              {new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </div>
                          </div>
                          <p className="text-sm text-reviva-charcoal/80 dark:text-white/80">
                            {entry.note}
                          </p>
                          <div className="text-xs text-reviva-charcoal/70 dark:text-white/70 mt-1">
                            <Clock className="h-3 w-3 inline mr-1" />
                            <span>{entry.timeOfDay}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-reviva-purple mb-6 text-center">
              Mood Patterns & Insights
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="glass-card dark:glass-card-dark p-5 rounded-xl animate-scale-in">
                <h3 className="font-medium text-reviva-deep-teal mb-3">Most Common Mood</h3>
                <div className="text-center p-3 bg-reviva-mint/20 dark:bg-reviva-teal/10 rounded-lg">
                  <div className="text-4xl mb-2">🙂</div>
                  <p className="font-medium">Good</p>
                  <p className="text-sm text-reviva-charcoal/70 dark:text-white/70">
                    43% of entries
                  </p>
                </div>
              </div>
              
              <div className="glass-card dark:glass-card-dark p-5 rounded-xl animate-scale-in delay-100">
                <h3 className="font-medium text-reviva-deep-teal mb-3">Best Time of Day</h3>
                <div className="text-center p-3 bg-reviva-mint/20 dark:bg-reviva-teal/10 rounded-lg">
                  <div className="text-4xl mb-2">🌇</div>
                  <p className="font-medium">Evening</p>
                  <p className="text-sm text-reviva-charcoal/70 dark:text-white/70">
                    Highest average mood
                  </p>
                </div>
              </div>
              
              <div className="glass-card dark:glass-card-dark p-5 rounded-xl animate-scale-in delay-200">
                <h3 className="font-medium text-reviva-deep-teal mb-3">Weekly Trend</h3>
                <div className="text-center p-3 bg-reviva-mint/20 dark:bg-reviva-teal/10 rounded-lg">
                  <div className="text-4xl mb-2">📈</div>
                  <p className="font-medium">Improving</p>
                  <p className="text-sm text-reviva-charcoal/70 dark:text-white/70">
                    +12% from last week
                  </p>
                </div>
              </div>
            </div>
            
            <div className="glass-card dark:glass-card-dark p-6 rounded-xl animate-scale-in">
              <h3 className="font-medium text-reviva-deep-teal mb-4">Recommendations Based on Your Mood</h3>
              
              <div className="space-y-3">
                <div className="flex items-start p-3 bg-reviva-mint/20 dark:bg-reviva-teal/10 rounded-lg">
                  <div className="flex-shrink-0 p-2 bg-white dark:bg-reviva-charcoal rounded-full mr-3">
                    <span className="text-xl">🧘</span>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Mindfulness Practice</h4>
                    <p className="text-sm text-reviva-charcoal/80 dark:text-white/80">
                      Try a 5-minute guided meditation when you're feeling down or stressed.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start p-3 bg-reviva-mint/20 dark:bg-reviva-teal/10 rounded-lg">
                  <div className="flex-shrink-0 p-2 bg-white dark:bg-reviva-charcoal rounded-full mr-3">
                    <span className="text-xl">🚶</span>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Regular Exercise</h4>
                    <p className="text-sm text-reviva-charcoal/80 dark:text-white/80">
                      Your mood tends to improve after physical activity. Consider a daily walk.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start p-3 bg-reviva-mint/20 dark:bg-reviva-teal/10 rounded-lg">
                  <div className="flex-shrink-0 p-2 bg-white dark:bg-reviva-charcoal rounded-full mr-3">
                    <span className="text-xl">🌙</span>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Sleep Quality</h4>
                    <p className="text-sm text-reviva-charcoal/80 dark:text-white/80">
                      Your mood is often lower when you report poor sleep. Try establishing a consistent sleep routine.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {showSuccessMessage && (
        <div className="fixed bottom-4 right-4 p-4 bg-green-100 text-green-800 rounded-lg shadow-md flex items-center">
          <CheckCircle className="h-5 w-5 mr-2" />
          <span>Mood successfully recorded!</span>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default MoodTrackerPage;
