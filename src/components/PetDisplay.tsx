import React from 'react';
import { usePetGame } from '@/context/PetGameContext';

const PetDisplay = () => {
  const { petName, level, animation, petPosition } = usePetGame();

  return (
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
            className={`rounded-2xl border-4 border-white dark:border-reviva-purple/20 shadow-lg w-full max-w-md mx-auto transition-all duration-300
                      ${animation === "playing" ? "animate-bounce" : ""} 
                      ${animation === "eating" ? "animate-pulse" : ""} 
                      ${animation === "sleeping" ? "opacity-70" : ""}`}
            loading="lazy"
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
          
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white dark:bg-reviva-charcoal px-4 py-2 rounded-full shadow-lg transition-all duration-300 hover:scale-105">
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
  );
};

export default PetDisplay;
