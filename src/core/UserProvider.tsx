import { checkUser } from '@/api/authenticationService';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface UserAttributes {
  [key: string]: string | number | undefined;
}

const UserContext = createContext<UserAttributes | object | null>(null);
interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<UserAttributes | object | null>(null);
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
    <UserContext.Provider value={user ?? {}}>
      {children}
    </UserContext.Provider>
  );
};
// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => useContext(UserContext);