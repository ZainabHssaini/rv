import React from 'react';
import { Star, Award, Gift } from 'lucide-react';
import { usePetGame } from '@/context/PetGameContext';

const iconMap = {
  Star: <Star className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />,
  Award: <Award className="h-6 w-6 text-purple-600 dark:text-purple-400" />,
  Gift: <Gift className="h-6 w-6 text-blue-600 dark:text-blue-400" />
};

const RewardsShop = () => {
  const { rewards, redeemReward, points } = usePetGame();

  return (
    <div className="text-center mt-12">
      <h2 className="text-2xl font-bold text-reviva-purple mb-4">
        Rewards Shop
      </h2>
      <p className="text-reviva-charcoal/80 dark:text-white/80 mb-8 max-w-2xl mx-auto">
        Earn points by taking care of your pet and completing daily mental health tasks
      </p>
      
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {rewards.map((reward, index) => (
          <div 
            key={reward.id}
            className="glass-card dark:glass-card-dark p-4 rounded-xl animate-scale-in hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px]"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              {iconMap[reward.icon as keyof typeof iconMap] || <Gift className="h-6 w-6 text-blue-600 dark:text-blue-400" />}
            </div>
            <h3 className="font-medium text-reviva-deep-teal">{reward.title}</h3>
            <p className="text-sm text-reviva-charcoal/80 dark:text-white/80 mb-3">
              {reward.description}
            </p>
            <div className="flex items-center justify-between">
              <span className="font-medium text-reviva-teal">{reward.points} points</span>
              <button 
                onClick={() => redeemReward(reward.id)}
                disabled={points < reward.points}
                className={`text-xs px-3 py-1.5 rounded-full transition-all duration-300 ${
                  points >= reward.points 
                    ? 'bg-reviva-teal text-white hover:bg-reviva-teal/90 hover:scale-105 active:scale-95' 
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700'
                }`}
              >
                Redeem
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RewardsShop;