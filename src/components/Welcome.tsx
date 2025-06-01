import { useEffect, useState } from 'react';

const Welcome = () => {
  const [user, setUser] = useState<{ firstname: string; lastname: string } | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    console.log('userData:', userData);

    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-reviva-teal to-reviva-mint flex items-center justify-center text-white px-4">
      <div className="max-w-2xl text-center p-8 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl animate-fade-in">
        <h1 className="text-5xl font-extrabold mb-6 drop-shadow-lg">
          👋 Bienvenue, <span className="text-yellow-200">{user ? `${user.firstname}` : 'Cher Utilisateur'}</span> !
        </h1>
        <p className="text-xl mb-8 font-light">
          Nous sommes ravis de vous accueillir. Explorez les fonctionnalités pour améliorer votre bien-être 🌿
        </p>
        <button className="bg-white text-reviva-teal font-semibold px-6 py-3 rounded-full shadow-md hover:scale-105 transition transform duration-300">
          Commencer l’exploration
        </button>
      </div>
    </div>
  );
};

export default Welcome;
