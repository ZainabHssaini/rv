// src/services/authService.ts
let accessToken: string | null = null;
let tokenExpiration: number | null = null;

export const getAccessToken = async (): Promise<string> => {
  // Si le token existe et n'est pas expiré, on le retourne
  if (accessToken && tokenExpiration && Date.now() < tokenExpiration) {
    return accessToken;
  }

  // Sinon, on demande un nouveau token
  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body:"grant_type=client_credentials&client_id=b2ffe5a150684d04ad7fcd3018bf1d34&client_secret=02ee3ec57eac45daa78a1ad8008ad43c",
    });

    if (!response.ok) {
      throw new Error('Échec de la récupération du token');
    }

    const data = await response.json();
    accessToken = data.access_token;
    // On suppose que le token expire dans 1 heure (3600 secondes)
    tokenExpiration = Date.now() + (data.expires_in || 3600) * 1000;
    
    return accessToken;
  } catch (error) {
    console.error('Erreur lors de la récupération du token:', error);
    throw error;
  }
};