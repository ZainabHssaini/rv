import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Brain, Heart, Shield } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const userProfileImage = user?.photoURL || "/default-avatar.png";

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/signin');
    toast({
      title: "Vous êtes déconnecté",
      description: "A la prochaine fois...",
    });
  };

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
      <div className="container mx-auto px-4 md:px-6 lg:px-8"> {/* Réduit le padding horizontal */}
        <div className="flex items-center justify-between">
          {/* Logo et slogan décalés vers la gauche */}
          <a href="/" className="flex items-center -ml-2 md:-ml-4"> {/* Ajout de marges négatives */}
            <div className="relative">
              <img 
                src="/reviva/8d6035b5-8ccf-43b7-a612-84053242895a.png" 
                alt="Reviva Logo" 
                className="h-14 md:h-12 w-auto transform hover:scale-110 transition-transform duration-500" 
              />
              <div className="absolute -inset-1 -z-10 border-2 border-reviva-teal/30 rounded-t-3xl opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            <div className="flex flex-col ml-2 md:ml-3"> {/* Réduit le margin-left */}
              <span className="text-reviva-charcoal dark:text-white text-xs italic">
                صحّتك النفسية تهمنا
              </span>
              <span className="text-reviva-charcoal dark:text-white text-xs italic">
                <span>🇲🇦</span>
                Moroccan Initiative
              </span>
            </div>
          </a>

          <div className="hidden md:flex items-center space-x-6"> {/* Réduit l'espace entre les liens */}
            <a href="/features" className="text-reviva-charcoal dark:text-white hover:text-reviva-teal dark:hover:text-reviva-mint transition-colors relative group">
              Features
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-reviva-teal group-hover:w-full transition-all duration-300 rounded-full"></span>
            </a>
            <a href="/therapy" className="text-reviva-charcoal dark:text-white hover:text-reviva-teal dark:hover:text-reviva-mint transition-colors relative group">
              Therapy
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-reviva-teal group-hover:w-full transition-all duration-300 rounded-full"></span>
            </a>
            <a href="/pet-game" className="text-reviva-charcoal dark:text-white hover:text-reviva-teal dark:hover:text-reviva-mint transition-colors relative group">
              Pet Care
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-reviva-teal group-hover:w-full transition-all duration-300 rounded-full"></span>
            </a>
            <a href="/mood-tracker" className="text-reviva-charcoal dark:text-white hover:text-reviva-teal dark:hover:text-reviva-mint transition-colors relative group">
              Mood Tracker
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-reviva-teal group-hover:w-full transition-all duration-300 rounded-full"></span>
            </a>
            <a href="/blogs-podcasts" className="text-reviva-charcoal dark:text-white hover:text-reviva-teal dark:hover:text-reviva-mint transition-colors relative group">
              Blogs & Podcasts
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-reviva-teal group-hover:w-full transition-all duration-300 rounded-full"></span>
            </a>
            <Link to="/parents" className="text-reviva-charcoal dark:text-white hover:text-reviva-teal dark:hover:text-reviva-mint transition-colors relative group">
              Espace Parents
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-reviva-teal group-hover:w-full transition-all duration-300 rounded-full"></span>
            </Link>
            <a href="/sol" className="text-reviva-charcoal dark:text-white hover:text-reviva-teal dark:hover:text-reviva-mint transition-colors relative group">
              Reviva Solutions
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-reviva-teal group-hover:w-full transition-all duration-300 rounded-full"></span>
            </a>

            <div className="flex items-center gap-4"> {/* Réduit l'espace entre les éléments */}
              {isLoggedIn ? (
                <div className="flex items-center gap-3"> {/* Réduit l'espace */}
                  <button
                    onClick={handleSignOut}
                    className="px-4 py-1.5 rounded-full bg-gradient-to-r from-reviva-teal to-reviva-mint text-white font-medium text-sm
                              hover:bg-white hover:text-reviva-teal transition-colors border border-white shadow hover:shadow-md"
                  >
                    Sign Out
                  </button>
                  <img
                    src={
                      user?.photoURL
                        ? user.photoURL
                        : user?.gender === "female"
                        ? "/female avatar.jpg"
                        : "/male avatar.png"
                    }
                    alt="User Profile"
                    className="h-9 w-9 rounded-full border-2 border-reviva-teal object-cover"
                  />
                </div>
              ) : (
                <Link 
                  to="/signin" 
                  className="px-4 py-1.5 rounded-full bg-gradient-to-r from-reviva-teal to-reviva-mint text-white font-medium text-sm
                            hover:bg-white hover:text-reviva-teal transition-colors border border-white shadow hover:shadow-md"
                >
                  Sign In
                </Link>
              )}
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
          <div className="container mx-auto px-4">
            <div className="flex flex-col space-y-4 py-4 relative">
              <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-reviva-mint via-reviva-teal to-reviva-mint opacity-30"></div>
              
              <Link to="/features" className="text-reviva-charcoal dark:text-white hover:text-reviva-teal dark:hover:text-reviva-mint transition-colors pl-4" onClick={() => setIsMobileMenuOpen(false)}>Features</Link>
              <Link to="/therapy" className="text-reviva-charcoal dark:text-white hover:text-reviva-teal dark:hover:text-reviva-mint transition-colors pl-4" onClick={() => setIsMobileMenuOpen(false)}>Therapy</Link>
              <Link to="/pet-game" className="text-reviva-charcoal dark:text-white hover:text-reviva-teal dark:hover:text-reviva-mint transition-colors pl-4" onClick={() => setIsMobileMenuOpen(false)}>Pet Care</Link>
              <Link to="/mood-tracker" className="text-reviva-charcoal dark:text-white hover:text-reviva-teal dark:hover:text-reviva-mint transition-colors pl-4" onClick={() => setIsMobileMenuOpen(false)}>Mood Tracker</Link>
              <Link to="/chatbot" className="text-reviva-charcoal dark:text-white hover:text-reviva-teal dark:hover:text-reviva-mint transition-colors pl-4" onClick={() => setIsMobileMenuOpen(false)}>AI Chatbot</Link>
              <Link to="/blogs-podcasts" className="text-reviva-charcoal dark:text-white hover:text-reviva-teal dark:hover:text-reviva-mint transition-colors pl-4" onClick={() => setIsMobileMenuOpen(false)}>Blogs & Podcasts</Link>
              
              {isLoggedIn ? (
                <button
                  onClick={handleSignOut}
                  className="mx-4 mt-2 py-2.5 rounded-full bg-gradient-to-r from-reviva-teal to-reviva-mint text-white font-medium text-sm"
                >
                  Sign Out
                </button>
              ) : (
                <Link
                  to="/signin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mx-4 mt-2 py-2.5 text-center rounded-full bg-gradient-to-r from-reviva-teal to-reviva-mint text-white font-medium text-sm"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;