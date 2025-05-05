import { getAccessToken } from './authService';

export interface Podcast {
    id: string,
    imageURL : string,
    title: string,
    episode: number,
    duration: string,
    progress: number,
    currentTime: string,
    host: string
    timeAdded: string,
}

export const fetchPodcasts = async (): Promise<any> => {
  try {
    const token = await getAccessToken();
    const response = await fetch('https://api.spotify.com/v1/playlists/77AOjGgwOTmcDiH15lARCh/tracks', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.status === 401) {
      // Token peut être invalide, on réessaie une fois
      const newToken = await getAccessToken();
      const retryResponse = await fetch('https://api.spotify.com/v1/playlists/77AOjGgwOTmcDiH15lARCh/tracks', {
        headers: {
          'Authorization': `Bearer ${newToken}`,
        },
      });
      return retryResponse.json();
    }

    if (!response.ok) throw new Error('Erreur serveur');

    

    return response.json();
  } catch (error) {
    console.error('Erreur:', error);
    throw error;
  }
};