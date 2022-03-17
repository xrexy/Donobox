import { createContext } from 'react';

interface AppContextType {
  user?: User;
  updateUser: (user?: User) => void;
}

export const AppContext = createContext<AppContextType>({
  updateUser: () => {},
});
