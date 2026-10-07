import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    if (!tokenString) {
      return null;
    }

    try {
      const tokenData = JSON.parse(tokenString);

      if (typeof tokenData !== 'object' || tokenData === null) {
        return tokenString;
      }

      if (Date.now() > tokenData.expiry) {
        localStorage.removeItem('token');
        return null;
      }

      return tokenData.value;
    } catch (e) {
      // If parsing fails (e.g. plain string token), fallback to raw string
      return tokenString;
    }
  };

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    const ttlInMs = 6 * 60 * 60 * 1000;
    const tokenData = {
      value: userToken,
      expiry: Date.now() + ttlInMs
    };

    localStorage.setItem('token', JSON.stringify(tokenData));
    setToken(userToken);
  };

  return {
    setToken: saveToken,
    token
  };
}
