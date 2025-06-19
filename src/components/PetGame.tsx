import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const PetGame = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Fonction pour gérer la navigation
  const handlePlayClick = () => {
    navigate('/pet-game');
    window.scrollTo(0, 0); // Scroll vers le haut après la navigation
  };

  // Alternative: Scroll vers le haut au montage du composant
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section id="pet-game" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-reviva-purple mb-4">
            Meet Your Virtual Companion
          </h2>
          <p className="text-lg text-reviva-charcoal/80 dark:text-white/80 max-w-3xl mx-auto">
            Care for your virtual pet while building healthy mental health habits and earning rewards.
          </p>
        </div>

        <div className="max-w-md mx-auto flex flex-col items-center">
          <div className="relative mb-8 w-full">
            <div className="absolute inset-0 bg-gradient-to-r from-reviva-mint/30 to-reviva-beige/30 rounded-full blur-3xl"></div>
            <div className="relative">
              <img 
                src="/image/virtual-cat.jpg"
                alt="Virtual Cat Pet" 
                className="rounded-2xl border-4 border-white dark:border-reviva-purple/20 shadow-lg w-full mx-auto"
                loading="lazy"
              />
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-reviva-charcoal/80 dark:text-white/80 mb-4">
              Earn points by taking care of your pet and complete daily mental health tasks
            </p>
            <button 
              onClick={handlePlayClick}
              className="reviva-button hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Let's Play!
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PetGame;