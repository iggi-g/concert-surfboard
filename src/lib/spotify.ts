const SPOTIFY_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
const SCOPES = ['user-top-read', 'user-read-private', 'user-read-email'];

export const loginUrl = `https://accounts.spotify.com/authorize?client_id=${SPOTIFY_CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPES.join(' '))}`;

export const getTopArtists = async (token: string) => {
  const response = await fetch('https://api.spotify.com/v1/me/top/artists', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.json();
};

export const findConcerts = async (location: string, artists: string[]) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/concerts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ location, artists })
  });
  return response.json();
};