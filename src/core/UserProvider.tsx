import { checkUser } from '@/api/authenticationService';
import { logout } from '@/redux/reducers/authslice';
import { User } from '@/types/models/models';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useDispatch } from 'react-redux';

const UserContext = createContext<User | null>(null);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    (async () => {
      try {
        const fetchedUser = await checkUser();
        setUser(fetchedUser.data);
      } catch (error) {
        setUser(null);
        dispatch(logout());
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