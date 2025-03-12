import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md ${
        isScrolled 
          ? 'bg-white/80 dark:bg-reviva-charcoal/80 shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-4">
            <img 
              src="/lovable-uploads/8d6035b5-8ccf-43b7-a612-84053242895a.png" 
              alt="Reviva Logo" 
              className="h-48 sm:h-56 md:h-64 w-auto transform hover:scale-110 transition-transform duration-500 animate-pulse-gentle" 
            />
          </Link>
          <span className="text-reviva-charcoal dark:text-white text-lg md:text-l italic ml-[-570px]">Find it all, find it here.</span>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/features/" className="text-reviva-charcoal dark:text-white hover:text-reviva-teal dark:hover:text-reviva-mint transition-colors">Features</Link>
            <Link to="/therapy" className="text-reviva-charcoal dark:text-white hover:text-reviva-teal dark:hover:text-reviva-mint transition-colors">Therapy</Link>
            <Link to="/pet-game" className="text-reviva-charcoal dark:text-white hover:text-reviva-teal dark:hover:text-reviva-mint transition-colors">Pet Care</Link>
            <Link to="/mood-tracker" className="text-reviva-charcoal dark:text-white hover:text-reviva-teal dark:hover:text-reviva-mint transition-colors">Mood Tracker</Link>
            <Link to="/chatbot" className="text-reviva-charcoal dark:text-white hover:text-reviva-teal dark:hover:text-reviva-mint transition-colors animate-pulse">AI Chatbot</Link>
            <Link to="/blogs-podcasts" className="text-reviva-charcoal dark:text-white hover:text-reviva-teal dark:hover:text-reviva-mint transition-colors">Blogs & Podcasts</Link>
            <button className="reviva-button">Sign In</button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-reviva-charcoal dark:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-card dark:glass-card-dark mt-2 mx-4 rounded-xl animate-slide-up">
          <div className="flex flex-col space-y-4 p-4">
            <Link to="/features" className="text-reviva-charcoal dark:text-white hover:text-reviva-teal dark:hover:text-reviva-mint transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Features</Link>
            <Link to="/therapy" className="text-reviva-charcoal dark:text-white hover:text-reviva-teal dark:hover:text-reviva-mint transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Therapy</Link>
            <Link to="/pet-game" className="text-reviva-charcoal dark:text-white hover:text-reviva-teal dark:hover:text-reviva-mint transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Pet Care</Link>
            <Link to="/mood-tracker" className="text-reviva-charcoal dark:text-white hover:text-reviva-teal dark:hover:text-reviva-mint transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Mood Tracker</Link>
            <Link to="/chatbot" className="text-reviva-charcoal dark:text-white hover:text-reviva-teal dark:hover:text-reviva-mint transition-colors" onClick={() => setIsMobileMenuOpen(false)}>AI Chatbot</Link>
            <Link to="/blogs-podcasts" className="text-reviva-charcoal dark:text-white hover:text-reviva-teal dark:hover:text-reviva-mint transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Blogs & Podcasts</Link>
            <button className="reviva-button">Sign In</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;