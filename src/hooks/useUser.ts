import { useEffect, useState } from 'react';

export const useUser = () => {
  const [user, setUser] = useState<{ name?: string; email?: string; hasCompletedProfile: boolean }>({
    hasCompletedProfile: false,
  });

  useEffect(() => {
    // Simulate loading user from local storage or backend
    const stored = localStorage.getItem('user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const saveUser = (data: any) => {
    localStorage.setItem('user', JSON.stringify(data));
    setUser(data);
  };

  return { user, saveUser };
};
