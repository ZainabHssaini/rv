import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Welcome from '@/components/Welcome'; // Importer le composant Welcome
import FeaturesSection from '@/components/FeaturesSection';
import TherapistSection from '@/components/TherapistSection';
import MoodTracker from '@/components/MoodTracker';
import PetGame from '@/components/PetGame';
import Footer from '@/components/Footer';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // État pour vérifier si l'utilisateur est connecté

  // Vérifier si l'utilisateur est connecté au chargement de la page
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.hash && anchor.hash.startsWith('#') && anchor.href.includes(window.location.pathname)) {
        e.preventDefault();
        const targetElement = document.querySelector(anchor.hash);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.getBoundingClientRect().top + window.scrollY - 100,
            behavior: 'smooth'
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-reviva-charcoal overflow-x-hidden">
      <Navbar />
      {isLoggedIn ? <Welcome /> : <Hero />} {/* Afficher Welcome si connecté, sinon Hero */}
      <FeaturesSection />
      <TherapistSection />
      <MoodTracker />
      <PetGame />
      <Footer />
    </div>
  );
};

export default Index;