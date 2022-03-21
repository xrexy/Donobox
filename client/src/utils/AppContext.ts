import { createContext } from 'react';

interface AppContextType {
  user?: User;
  updateUser: (user?: User) => void;

  accessToken?: string;
  updateToken: (token?: string) => void;
}

export const AppContext = createContext<AppContextType>({
  updateUser: () => {},
  updateToken: () => {},
});
