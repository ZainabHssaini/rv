
import { ArrowRight, Brain, Heart, Shield } from 'lucide-react';
import { useEffect, useRef } from 'react';

const Hero = () => {
  const floatingCirclesRef = useRef<HTMLDivElement>(null);
  
  // Create floating animation effect
  useEffect(() => {
    if (!floatingCirclesRef.current) return;
    
    const circles = floatingCirclesRef.current.querySelectorAll('.floating-circle');
    
    circles.forEach((circle) => {
      const element = circle as HTMLElement;
      
      // Set random starting positions
      element.style.left = `${Math.random() * 90}%`;
      element.style.top = `${Math.random() * 90}%`;
      
      // Set random animation durations between 15-25s
      const duration = 15 + Math.random() * 10;
      element.style.animationDuration = `${duration}s`;
      
      // Set random delays
      element.style.animationDelay = `${Math.random() * 5}s`;
    });
  }, []);

  return (
    <section className="pt-24 pb-16 md:py-32 relative overflow-hidden">
      {/* Relaxing floating background animations */}
      <div ref={floatingCirclesRef} className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, index) => (
          <div 
            key={index}
            className={`floating-circle absolute rounded-full animate-float opacity-30 blur-3xl`}
            style={{
              width: `${100 + Math.random() * 200}px`,
              height: `${100 + Math.random() * 200}px`,
              backgroundColor: index % 2 === 0 ? '#a3d4d6' : '#d2c4b5',
              animationDuration: `${15 + Math.random() * 10}s`,
              animationDirection: index % 2 === 0 ? 'alternate' : 'alternate-reverse'
            }}
          />
        ))}
      </div>

      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-reviva-mint/30 rounded-bl-full -z-10 blur-3xl animate-pulse-gentle"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/3 bg-reviva-beige/40 rounded-tr-full -z-10 blur-3xl animate-pulse-gentle" style={{ animationDelay: '2s' }}></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <div className="inline-block px-3 py-1 rounded-full bg-reviva-mint/30 text-reviva-deep-teal text-sm font-medium">
              Mental Health & Well-Being
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-reviva-purple leading-tight">
              Your Journey to <span className="text-reviva-teal">Mental Wellness</span> Starts Here
            </h1>
            <p className="text-lg md:text-xl text-reviva-charcoal/80 dark:text-white/80 max-w-2xl">
              Reviva offers AI-powered support, professional therapy, and a caring community to help you thrive mentally and emotionally.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="reviva-button animate-pulse-gentle">
                Get Started
              </button>
              <button className="px-6 py-3 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-reviva-mint/20 transition-colors border border-reviva-teal text-reviva-teal">
                Learn More <ArrowRight size={18} />
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-4 pt-8">
              <div className="flex flex-col items-center text-center p-4 glass-card dark:glass-card-dark rounded-xl animate-scale-in transform hover:scale-105 transition-transform">
                <div className="p-3 bg-reviva-mint/30 rounded-full mb-3">
                  <Heart className="text-reviva-teal" size={24} />
                </div>
                <h3 className="font-medium">Self-Care Tools</h3>
              </div>
              <div className="flex flex-col items-center text-center p-4 glass-card dark:glass-card-dark rounded-xl animate-scale-in delay-100 transform hover:scale-105 transition-transform">
                <div className="p-3 bg-reviva-mint/30 rounded-full mb-3">
                  <Brain className="text-reviva-teal" size={24} />
                </div>
                <h3 className="font-medium">AI Support</h3>
              </div>
              <div className="flex flex-col items-center text-center p-4 glass-card dark:glass-card-dark rounded-xl animate-scale-in delay-200 transform hover:scale-105 transition-transform">
                <div className="p-3 bg-reviva-mint/30 rounded-full mb-3">
                  <Shield className="text-reviva-teal" size={24} />
                </div>
                <h3 className="font-medium">Safe Space</h3>
              </div>
            </div>
          </div>
          
          <div className="relative animate-float">
            {/* Relaxing animated gradients */}
            <div className="absolute -inset-4 bg-gradient-to-r from-reviva-mint/20 to-reviva-beige/20 rounded-full blur-3xl animate-pulse-gentle"></div>
            <div className="absolute inset-8 -z-10 bg-gradient-to-br from-reviva-aqua/10 to-reviva-teal/10 rounded-full blur-2xl animate-pulse-gentle" style={{ animationDelay: '1.5s' }}></div>
            
            <div className="relative bg-gradient-to-r from-reviva-mint/80 to-reviva-teal/80 p-1 rounded-2xl shadow-xl transform transition-transform hover:scale-102 duration-700">
              <div className="bg-white dark:bg-reviva-charcoal rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=500&h=600&ixlib=rb-4.0.3"
                  alt="Mental wellness illustration"
                  className="w-full h-auto object-cover aspect-[4/3]"
                />
                <div className="p-4">
                  <h3 className="font-medium text-xl mb-2">Start your journey today</h3>
                  <p className="text-reviva-charcoal/80 dark:text-white/80 mb-4">
                    Join thousands who have improved their mental well-being with Reviva.
                  </p>
                  <div className="flex items-center space-x-2">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-8 h-8 rounded-full bg-reviva-mint flex items-center justify-center border-2 border-white animate-pulse-gentle" style={{ animationDelay: `${i * 0.5}s` }}>
                          <span className="text-xs font-medium text-reviva-teal">
                            {String.fromCharCode(64 + i)}
                          </span>
                        </div>
                      ))}
                    </div>
                    <span className="text-sm text-reviva-charcoal/80 dark:text-white/80">
                      +2,500 users this week
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-reviva-mint/40 rounded-full animate-float" style={{ animationDuration: '6s' }}></div>
            <div className="absolute -bottom-8 left-12 w-16 h-16 bg-reviva-beige/40 rounded-full animate-float" style={{ animationDuration: '8s', animationDelay: '1s' }}></div>
          </div>
        </div>
      </div>

      {/* Additional relaxing animations - Fixed style tag by using standard CSS syntax */}
      <style>
        {`
          @keyframes float-around {
            0% { transform: translate(0, 0); }
            25% { transform: translate(10px, -10px); }
            50% { transform: translate(-5px, -5px); }
            75% { transform: translate(-10px, 10px); }
            100% { transform: translate(0, 0); }
          }
          
          .floating-circle {
            animation: float-around 20s infinite ease-in-out;
          }
        `}
      </style>
    </section>
  );
};

export default Hero;
