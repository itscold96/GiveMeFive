import axios from 'axios';

export const getGoogleJWT = async (code: string | null) => {
  const { data } = await axios.post('https://oauth2.googleapis.com/token', {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    code,
    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    client_secret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI,
    grant_type: 'authorization_code',
  });
  return data;
};
