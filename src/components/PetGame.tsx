
import { useState } from 'react';
import { Heart, Fish, Coffee, Gift } from 'lucide-react';

const PetGame = () => {
  const [happiness, setHappiness] = useState(70);
  const [hunger, setHunger] = useState(60);
  const [energy, setEnergy] = useState(80);
  const [points, setPoints] = useState(120);
  
  const feed = () => {
    if (hunger < 100) {
      setHunger(prev => Math.min(prev + 20, 100));
      setHappiness(prev => Math.min(prev + 5, 100));
      setPoints(prev => prev + 5);
    }
  };
  
  const play = () => {
    if (energy > 20) {
      setHappiness(prev => Math.min(prev + 15, 100));
      setEnergy(prev => Math.max(prev - 10, 0));
      setHunger(prev => Math.max(prev - 5, 0));
      setPoints(prev => prev + 10);
    }
  };
  
  const rest = () => {
    setEnergy(prev => Math.min(prev + 30, 100));
    setPoints(prev => prev + 5);
  };

  return (
    <section id="pet-game" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-reviva-purple mb-4">
            Meet Your Virtual Companion
          </h2>
          <p className="text-lg text-reviva-charcoal/80 dark:text-white/80 max-w-3xl mx-auto">
            Care for your virtual pet while building healthy mental health habits and earning rewards.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="glass-card dark:glass-card-dark rounded-2xl p-6 animate-scale-in order-2 md:order-1">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-medium text-reviva-deep-teal">Pet Stats</h3>
              <div className="flex items-center">
                <Gift className="h-5 w-5 text-reviva-teal mr-1" />
                <span className="font-medium">{points} points</span>
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
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400&h=400&ixlib=rb-4.0.3"
                alt="Virtual Cat Pet" 
                className="rounded-2xl border-4 border-white dark:border-reviva-purple/20 shadow-lg animate-pulse-gentle"
              />
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white dark:bg-reviva-charcoal px-4 py-2 rounded-full shadow-lg">
                <p className="font-medium text-reviva-teal">Whiskers</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-reviva-charcoal/80 dark:text-white/80 mb-4">
            Earn points by taking care of your pet and complete daily mental health tasks
          </p>
          <button className="reviva-button animate-scale-in">
            Redeem Rewards
          </button>
        </div>
      </div>
    </section>
  );
};

export default PetGame;
