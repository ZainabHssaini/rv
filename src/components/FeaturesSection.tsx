import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MentalHealthImage {
  src: string;
  alt: string;
  caption: string;
  description: string;
}

const mentalHealthImages: MentalHealthImage[] = [
  {
    src: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    alt: "Woman meditating in nature",
    caption: "Find Your Inner Peace",
    description: "Discover mindfulness techniques to calm your mind and reduce stress."
  },
  {
    src: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    alt: "Therapist and client smiling",
    caption: "Professional Support",
    description: "Connect with compassionate therapists who truly care about your wellbeing."
  },
  {
    src: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    alt: "Group of friends supporting each other",
    caption: "Community Connection",
    description: "You're not alone - join others on similar journeys of healing."
  },
  {
    src: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    alt: "Person journaling with plants",
    caption: "Holistic Wellness",
    description: "Nourish your mind, body and soul with balanced self-care practices."
  },
  {
    src: "image/femme-faisant-du-yoga-sur-le-toit-d-un-gratte-ciel-dans-la-grande-ville.jpg",
    alt: "Person doing yoga at sunrise",
    caption: "Renew Each Day",
    description: "Start fresh with morning rituals that set a positive tone for your day."
  }
];

const FeaturesSection = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

  const nextSlide = (): void => {
    setCurrentSlide((prev) => (prev === mentalHealthImages.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = (): void => {
    setCurrentSlide((prev) => (prev === 0 ? mentalHealthImages.length - 1 : prev - 1));
  };

  const goToSlide = (index: number): void => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        nextSlide();
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [currentSlide, isAutoPlaying]);

  return (
    <section id="features" className="relative py-20 bg-gradient-to-b from-transparent to-reviva-mint/20 dark:to-reviva-purple/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-reviva-purple mb-4">
            Healing Through Compassion
          </h2>
          <p className="text-lg text-reviva-charcoal/80 dark:text-white/80 max-w-3xl mx-auto">
            Your mental health journey deserves beautiful moments of care and understanding.
          </p>
        </div>

        <div 
          className="relative h-[500px] w-full overflow-hidden rounded-2xl shadow-xl"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Slides */}
          <div 
            className="flex transition-transform duration-700 ease-in-out h-full"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {mentalHealthImages.map((image, index) => (
              <div key={index} className="w-full flex-shrink-0 relative h-full">
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="w-full h-full object-cover brightness-90"
                  loading={index === 0 ? "eager" : "lazy"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end">
                  <div className="p-8 text-white max-w-2xl mx-auto text-center">
                    <h3 className="text-3xl font-bold mb-2">{image.caption}</h3>
                    <p className="text-lg opacity-90">{image.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation arrows */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full transition-all"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full transition-all"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Dots indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
            {mentalHealthImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-3 w-3 rounded-full transition-all ${currentSlide === index ? 'bg-white w-6' : 'bg-white/50'}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;