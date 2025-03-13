import { useEffect, useState } from 'react';

const Welcome = () => {
  const [user, setUser] = useState<{ firstname: string; lastname: string } | null>(null);

  // Récupérer les informations de l'utilisateur depuis le localStorage
  useEffect(() => {
    const userData = localStorage.getItem('user');
    console.log('userData:', userData);

    if (userData) { // Vérifier que userData n'est ni null ni undefined
      try {
        const parsedUser = JSON.parse(userData); // Parser les données
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user data:', error);
        // Si les données ne sont pas valides, nettoyer le localStorage
        localStorage.removeItem('user');
      }
    }
  }, []);

  return (
    <div className="w-full py-12 bg-gradient-to-r from-reviva-teal to-reviva-mint text-white text-center mt-24">
      {/* Ajout de mt-16 pour une marge en haut */}
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold mb-4 animate-fade-in">
          Bienvenue, {user ? `${user.firstname} ${user.lastname}` : 'Cher Utilisateur'} !
        </h1>
        <p className="text-lg animate-fade-in delay-100">
          Nous sommes ravis de vous revoir. Explorez nos fonctionnalités pour améliorer votre bien-être.
        </p>
      </div>
    </div>
  );
};

export default Welcome;