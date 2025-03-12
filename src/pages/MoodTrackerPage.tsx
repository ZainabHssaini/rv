import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, Clock, Award, BarChart2 } from 'lucide-react';

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
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [moodNote, setMoodNote] = useState<string>('');
  const [timeOfDay, setTimeOfDay] = useState<string>('morning');
  const [recentEntries, setRecentEntries] = useState<MoodEntry[]>([
    { date: '2023-10-01', mood: 'okay', note: 'Feeling a bit stressed about work', timeOfDay: 'evening' },
    { date: '2023-10-02', mood: 'good', note: 'Had a nice walk outside today', timeOfDay: 'afternoon' },
    { date: '2023-10-03', mood: 'great', note: 'Completed a big project, feeling accomplished!', timeOfDay: 'evening' },
  ]);

  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);

  const formatDate = (date: Date) => date.toISOString().split('T')[0];
  const formattedDate = formatDate(currentDate);

  const todayEntry = recentEntries.find(entry => entry.date === formattedDate);

  const handleSubmitMood = () => {
    if (!selectedMood) return;

    const newEntry: MoodEntry = { date: formattedDate, mood: selectedMood, note: moodNote, timeOfDay };
    
    setRecentEntries(prevEntries => {
      const entryIndex = prevEntries.findIndex(entry => entry.date === formattedDate);
      if (entryIndex >= 0) {
        const updatedEntries = [...prevEntries];
        updatedEntries[entryIndex] = newEntry;
        return updatedEntries;
      }
      return [...prevEntries, newEntry];
    });

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

  const CustomTooltip: React.FC<{ active?: boolean; payload?: any[]; label?: string }> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const mood = payload[0].payload.mood as Mood;
      return (
        <div className="glass-card p-2 text-sm">
          <p className="mb-1 font-medium">{label}</p>
          <p className="text-lg">{moodEmojis[mood]} {mood}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-reviva-charcoal">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-2 bg-reviva-mint/30 rounded-full mb-4">
              <BarChart2 className="h-6 w-6 text-reviva-teal" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-reviva-purple mb-4">Mood Tracker</h1>
            <p className="text-lg text-reviva-charcoal/80">Track your emotional well-being over time.</p>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="p-6">
              <h2 className="text-xl font-medium text-reviva-deep-teal">Today's Check-in</h2>
              {todayEntry ? (
                <div className="p-4 bg-reviva-mint/20 rounded-xl">
                  <div className="text-5xl mb-2">{moodEmojis[todayEntry.mood]}</div>
                  <h3 className="text-lg font-medium capitalize">{todayEntry.mood}</h3>
                  <button onClick={() => { setSelectedMood(todayEntry.mood); setMoodNote(todayEntry.note); setTimeOfDay(todayEntry.timeOfDay); }} className="mt-4 px-3 py-1 bg-reviva-teal text-white rounded-lg">Edit Entry</button>
                </div>
              ) : (
                <div>
                  <h3 className="text-sm font-medium mb-2">How are you feeling today?</h3>
                  <div className="grid grid-cols-5 gap-2 mb-4">
                    {(['great', 'good', 'okay', 'down', 'bad'] as Mood[]).map((mood) => (
                      <button key={mood} onClick={() => setSelectedMood(mood)} className={`p-3 rounded-lg flex flex-col items-center ${selectedMood === mood ? 'bg-reviva-teal text-white' : 'bg-gray-100'}`}>
                        <span className="text-2xl">{moodEmojis[mood]}</span>
                        <span className="text-xs capitalize">{mood}</span>
                      </button>
                    ))}
                  </div>
                  <button onClick={handleSubmitMood} disabled={!selectedMood} className="w-full py-3 bg-reviva-teal text-white rounded-lg">Save Entry</button>
                </div>
              )}
            </div>

            <div className="p-6">
              <h2 className="text-xl font-medium">Mood Insights</h2>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[1, 5]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="value" stroke="#1d858d" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MoodTrackerPage;
