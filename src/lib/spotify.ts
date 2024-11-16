const SPOTIFY_CLIENT_ID = 'your_client_id';
const REDIRECT_URI = 'http://localhost:5173/callback';
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