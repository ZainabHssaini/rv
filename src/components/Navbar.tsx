import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md w-full ${
        isScrolled 
          ? 'bg-white/90 dark:bg-reviva-charcoal/90 shadow-md py-4' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 md:px-8 lg:px-12">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center">
            <div className="relative">
              <img 
                src="/reviva/8d6035b5-8ccf-43b7-a612-84053242895a.png" 
                alt="Reviva Logo" 
                className="h-14 md:h-12 w-auto transform hover:scale-110 transition-transform duration-500" 
              />
              <div className="absolute -inset-1 -z-10 border-2 border-reviva-teal/30 rounded-t-3xl opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            <div className="flex flex-col ml-3">
              <span className="text-reviva-charcoal dark:text-white text-xs italic">
                صحّتك النفسية تهمنا
              </span>
            </div>
          </a>

          <div className="hidden md:flex items-center space-x-8">
            <a href="/features" className="text-reviva-charcoal dark:text-white hover:text-reviva-teal dark:hover:text-reviva-mint transition-colors relative group">
              Features
            </a>
            <a href="/therapy" className="text-reviva-charcoal dark:text-white hover:text-reviva-teal dark:hover:text-reviva-mint transition-colors relative group">
              Therapy
            </a>
            <a href="/pet-game" className="text-reviva-charcoal dark:text-white hover:text-reviva-teal dark:hover:text-reviva-mint transition-colors relative group">
              Pet Care
            </a>
            <a href="/mood-tracker" className="text-reviva-charcoal dark:text-white hover:text-reviva-teal dark:hover:text-reviva-mint transition-colors relative group">
              Mood Tracker
            </a>
            <a href="/chatbot" className="text-reviva-charcoal dark:text-white hover:text-reviva-teal dark:hover:text-reviva-mint transition-colors relative group">
              AI Chatbot
            </a>
            <a href="/blogs-podcasts" className="text-reviva-charcoal dark:text-white hover:text-reviva-teal dark:hover:text-reviva-mint transition-colors relative group">
              Blogs & Podcasts
            </a>
            <div className="flex items-center gap-8">
              <a 
                href="/signin" 
                className="ml-auto px-5 py-2 rounded-full bg-gradient-to-r from-reviva-teal to-reviva-mint text-white font-medium 
                          text-reviva-charcoal hover:text-reviva-teal
                          hover:bg-white transition-colors border border-reviva-white shadow-lg hover:shadow-xl"
              >
                Sign In
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-reviva-charcoal dark:text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-reviva-charcoal/95 mt-0 border-t border-reviva-teal/20 animate-fade-in">
          <div className="container mx-auto px-6">
            <div className="flex flex-col space-y-4 py-4 relative">
              <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-reviva-mint via-reviva-teal to-reviva-mint opacity-30"></div>
              
              <a href="/features" className="text-reviva-charcoal dark:text-white hover:text-reviva-teal dark:hover:text-reviva-mint transition-colors pl-4" onClick={() => setIsMobileMenuOpen(false)}>Features</a>
              <a href="/therapy" className="text-reviva-charcoal dark:text-white hover:text-reviva-teal dark:hover:text-reviva-mint transition-colors pl-4" onClick={() => setIsMobileMenuOpen(false)}>Therapy</a>
              <a href="/pet-game" className="text-reviva-charcoal dark:text-white hover:text-reviva-teal dark:hover:text-reviva-mint transition-colors pl-4" onClick={() => setIsMobileMenuOpen(false)}>Pet Care</a>
              <a href="/mood-tracker" className="text-reviva-charcoal dark:text-white hover:text-reviva-teal dark:hover:text-reviva-mint transition-colors pl-4" onClick={() => setIsMobileMenuOpen(false)}>Mood Tracker</a>
              <a href="/chatbot" className="text-reviva-charcoal dark:text-white hover:text-reviva-teal dark:hover:text-reviva-mint transition-colors pl-4" onClick={() => setIsMobileMenuOpen(false)}>AI Chatbot</a>
              <a href="/blogs-podcasts" className="text-reviva-charcoal dark:text-white hover:text-reviva-teal dark:hover:text-reviva-mint transition-colors pl-4" onClick={() => setIsMobileMenuOpen(false)}>Blogs & Podcasts</a>
              
              <button 
                className="mx-4 mt-2 py-3 rounded-full bg-gradient-to-r from-reviva-teal to-reviva-mint text-white font-medium"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  window.location.href = "/signin";
                }}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
