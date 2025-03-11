
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Heart, Fish, Coffee, Gift, Star, Award, Crown, ThumbsUp, Check, ChevronUp, XCircle } from 'lucide-react';

const PetGamePage = () => {
  const [petName, setPetName] = useState("Whiskers");
  const [happiness, setHappiness] = useState(70);
  const [hunger, setHunger] = useState(60);
  const [energy, setEnergy] = useState(80);
  const [points, setPoints] = useState(120);
  const [level, setLevel] = useState(1);
  const [streak, setStreak] = useState(3);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [animation, setAnimation] = useState("");
  
  // Randomize pet image positions
  const [petPosition, setPetPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setPetPosition({
          x: Math.floor(Math.random() * 40) - 20,
          y: Math.floor(Math.random() * 20) - 10,
        });
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  const feed = () => {
    if (hunger < 100) {
      setHunger(prev => Math.min(prev + 20, 100));
      setHappiness(prev => Math.min(prev + 5, 100));
      setPoints(prev => prev + 5);
      setAnimation("eating");
      setToastMessage("+5 points for feeding your pet!");
      setShowToast(true);
      
      setTimeout(() => {
        setAnimation("");
        setShowToast(false);
      }, 3000);
    }
  };
  
  const play = () => {
    if (energy > 20) {
      setHappiness(prev => Math.min(prev + 15, 100));
      setEnergy(prev => Math.max(prev - 10, 0));
      setHunger(prev => Math.max(prev - 5, 0));
      setPoints(prev => prev + 10);
      setAnimation("playing");
      setToastMessage("+10 points for playing with your pet!");
      setShowToast(true);
      
      setTimeout(() => {
        setAnimation("");
        setShowToast(false);
      }, 3000);
    }
  };
  
  const rest = () => {
    setEnergy(prev => Math.min(prev + 30, 100));
    setPoints(prev => prev + 5);
    setAnimation("sleeping");
    setToastMessage("+5 points for letting your pet rest!");
    setShowToast(true);
    
    setTimeout(() => {
      setAnimation("");
      setShowToast(false);
    }, 3000);
  };
  
  const levelUp = () => {
    if (points >= level * 100) {
      setPoints(prev => prev - level * 100);
      setLevel(prev => prev + 1);
      setShowLevelUp(true);
      
      setTimeout(() => {
        setShowLevelUp(false);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-reviva-charcoal">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center p-2 bg-reviva-mint/30 rounded-full mb-4">
              <Heart className="h-6 w-6 text-reviva-teal" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-reviva-purple mb-4">
              My Lovely Cat
            </h1>
            <p className="text-lg text-reviva-charcoal/80 dark:text-white/80 max-w-3xl mx-auto">
              Care for your virtual pet while building healthy mental health habits and earning rewards.
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
            <div className="glass-card dark:glass-card-dark rounded-2xl p-6 animate-scale-in order-2 md:order-1">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-medium text-reviva-deep-teal">{petName}'s Stats</h3>
                  <button 
                    onClick={() => {
                      const newName = prompt("Enter a new name for your pet", petName);
                      if (newName) setPetName(newName);
                    }}
                    className="text-xs px-2 py-1 bg-reviva-mint/50 text-reviva-deep-teal rounded-full"
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
                  <div className="w-40 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div 
                      className="bg-reviva-teal h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${(points / (level * 100)) * 100}%` }}
                    ></div>
                  </div>
                  <button 
                    onClick={levelUp}
                    disabled={points < level * 100}
                    className={`text-xs px-2 py-1 rounded-full ${
                      points >= level * 100
                        ? 'bg-reviva-teal text-white'
                        : 'bg-gray-200 text-gray-500 dark:bg-gray-700'
                    }`}
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
                      className={`w-3 h-3 rounded-full ${
                        day <= streak 
                          ? 'bg-reviva-teal' 
                          : 'bg-gray-200 dark:bg-gray-700'
                      }`}
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
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
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
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
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
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
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
                  className={`flex flex-col items-center justify-center p-3 rounded-xl transition-colors
                            ${hunger >= 100 
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800' 
                            : 'bg-orange-100 text-orange-600 hover:bg-orange-200 dark:bg-orange-900/30 dark:text-orange-300'}`}
                  disabled={hunger >= 100}
                >
                  <Fish className="h-6 w-6 mb-1" />
                  <span className="text-xs font-medium">Feed</span>
                </button>
                
                <button 
                  onClick={play}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl transition-colors
                            ${energy <= 20
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800' 
                            : 'bg-pink-100 text-pink-600 hover:bg-pink-200 dark:bg-pink-900/30 dark:text-pink-300'}`}
                  disabled={energy <= 20}
                >
                  <Heart className="h-6 w-6 mb-1" />
                  <span className="text-xs font-medium">Play</span>
                </button>
                
                <button 
                  onClick={rest}
                  className="flex flex-col items-center justify-center p-3 rounded-xl bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors dark:bg-blue-900/30 dark:text-blue-300"
                >
                  <Coffee className="h-6 w-6 mb-1" />
                  <span className="text-xs font-medium">Rest</span>
                </button>
              </div>
            </div>
            
            <div className="relative animate-float order-1 md:order-2">
              <div className="absolute inset-0 bg-gradient-to-r from-reviva-mint/30 to-reviva-beige/30 rounded-full blur-3xl"></div>
              <div 
                className="relative transition-all duration-300"
                style={{ 
                  transform: `translate(${petPosition.x}px, ${petPosition.y}px)`,
                }}
              >
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1582562124811-c09040d0a901"
                    alt="Virtual Cat Pet" 
                    className={`rounded-2xl border-4 border-white dark:border-reviva-purple/20 shadow-lg w-full max-w-md mx-auto
                              ${animation === "playing" && "animate-bounce"} 
                              ${animation === "eating" && "animate-pulse"} 
                              ${animation === "sleeping" && "opacity-70"}`}
                  />
                  
                  {animation === "eating" && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="text-4xl animate-scale-in">🍣</div>
                    </div>
                  )}
                  
                  {animation === "sleeping" && (
                    <div className="absolute top-1/3 right-1/4">
                      <div className="text-4xl animate-float">💤</div>
                    </div>
                  )}
                  
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white dark:bg-reviva-charcoal px-4 py-2 rounded-full shadow-lg">
                    <p className="font-medium text-reviva-teal flex items-center">
                      {petName}
                      <span className="ml-2 bg-reviva-mint/50 text-reviva-deep-teal text-xs px-2 py-0.5 rounded-full">
                        Lvl {level}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-reviva-purple mb-6 text-center">
              Daily Mental Health Challenges
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="glass-card dark:glass-card-dark p-4 rounded-xl animate-scale-in">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                    <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-reviva-deep-teal">5-Minute Meditation</h3>
                    <p className="text-sm text-reviva-charcoal/80 dark:text-white/80 mb-2">
                      Practice mindfulness for just 5 minutes today
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-reviva-teal">+15 points</span>
                      <button className="text-xs px-2 py-1 bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 rounded-full">
                        Completed
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="glass-card dark:glass-card-dark p-4 rounded-xl animate-scale-in delay-100">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-reviva-mint/30 rounded-full">
                    <XCircle className="h-5 w-5 text-reviva-teal" />
                  </div>
                  <div>
                    <h3 className="font-medium text-reviva-deep-teal">Gratitude Journal</h3>
                    <p className="text-sm text-reviva-charcoal/80 dark:text-white/80 mb-2">
                      Write down 3 things you're grateful for
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-reviva-teal">+20 points</span>
                      <button className="text-xs px-2 py-1 bg-reviva-mint/30 text-reviva-deep-teal rounded-full hover:bg-reviva-mint/50 transition-colors">
                        Complete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="glass-card dark:glass-card-dark p-4 rounded-xl animate-scale-in delay-200">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-reviva-mint/30 rounded-full">
                    <XCircle className="h-5 w-5 text-reviva-teal" />
                  </div>
                  <div>
                    <h3 className="font-medium text-reviva-deep-teal">Deep Breathing</h3>
                    <p className="text-sm text-reviva-charcoal/80 dark:text-white/80 mb-2">
                      Practice deep breathing for 2 minutes
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-reviva-teal">+10 points</span>
                      <button className="text-xs px-2 py-1 bg-reviva-mint/30 text-reviva-deep-teal rounded-full hover:bg-reviva-mint/50 transition-colors">
                        Complete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="glass-card dark:glass-card-dark p-4 rounded-xl animate-scale-in delay-300">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-reviva-mint/30 rounded-full">
                    <XCircle className="h-5 w-5 text-reviva-teal" />
                  </div>
                  <div>
                    <h3 className="font-medium text-reviva-deep-teal">Mood Check-in</h3>
                    <p className="text-sm text-reviva-charcoal/80 dark:text-white/80 mb-2">
                      Track your mood in the mood tracker
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-reviva-teal">+15 points</span>
                      <button className="text-xs px-2 py-1 bg-reviva-mint/30 text-reviva-deep-teal rounded-full hover:bg-reviva-mint/50 transition-colors">
                        Complete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <h2 className="text-2xl font-bold text-reviva-purple mb-4">
              Rewards Shop
            </h2>
            <p className="text-reviva-charcoal/80 dark:text-white/80 mb-8 max-w-2xl mx-auto">
              Earn points by taking care of your pet and completing daily mental health tasks
            </p>
            
            <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="glass-card dark:glass-card-dark p-4 rounded-xl animate-scale-in">
                <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Star className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <h3 className="font-medium text-reviva-deep-teal">10% Therapy Discount</h3>
                <p className="text-sm text-reviva-charcoal/80 dark:text-white/80 mb-3">
                  Get 10% off your next therapy session
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-reviva-teal">200 points</span>
                  <button className="text-xs px-3 py-1.5 bg-reviva-teal text-white rounded-full">
                    Redeem
                  </button>
                </div>
              </div>
              
              <div className="glass-card dark:glass-card-dark p-4 rounded-xl animate-scale-in delay-100">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Award className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-medium text-reviva-deep-teal">Premium Cat Costume</h3>
                <p className="text-sm text-reviva-charcoal/80 dark:text-white/80 mb-3">
                  Unlock a special costume for your pet
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-reviva-teal">150 points</span>
                  <button className="text-xs px-3 py-1.5 bg-reviva-teal text-white rounded-full">
                    Redeem
                  </button>
                </div>
              </div>
              
              <div className="glass-card dark:glass-card-dark p-4 rounded-xl animate-scale-in delay-200">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Gift className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-medium text-reviva-deep-teal">Free Guided Meditation</h3>
                <p className="text-sm text-reviva-charcoal/80 dark:text-white/80 mb-3">
                  Unlock a premium guided meditation
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-reviva-teal">100 points</span>
                  <button className="text-xs px-3 py-1.5 bg-reviva-teal text-white rounded-full">
                    Redeem
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Toast notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-white dark:bg-reviva-charcoal shadow-lg rounded-lg p-4 animate-slide-up">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            <p className="font-medium">{toastMessage}</p>
          </div>
        </div>
      )}
      
      {/* Level up notification */}
      {showLevelUp && (
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
      )}
      
      <Footer />
    </div>
  );
};

export default PetGamePage;
