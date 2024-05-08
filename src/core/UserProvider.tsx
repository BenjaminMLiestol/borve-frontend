import { checkUser } from '@/api/authenticationService';
import { User } from '@/types/models/models';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';



const UserContext = createContext<User | null>(null);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    (async () => {
      try {
        const fetchedUser = await checkUser();
        setUser(fetchedUser.data);
      } catch (error) {
        console.error('Failed to fetch user attributes:', error);
        setUser({});
      }
    })();
  }, []);
  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
};
// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => useContext(UserContext);