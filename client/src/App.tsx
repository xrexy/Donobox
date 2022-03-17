import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { SpotlightAction, SpotlightProvider } from '@mantine/spotlight';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AccessPoint, Book, Home, Search } from 'tabler-icons-react';

import Compose from './components/Compose';
import { HomePage } from './pages/HomePage';
import { AppContext } from './utils/AppContext';
import { useFetchUser } from './utils/config/hooks/user/user.hooks';

const actions: SpotlightAction[] = [
  {
    title: 'Home',
    description: 'Get to home page',
    onTrigger: () => console.log('Home'),
    icon: <Home size={18} />,
  },
  {
    title: 'Dashboard',
    description: 'Get full information about current system status',
    onTrigger: () => console.log('Dashboard'),
    icon: <AccessPoint size={18} />,
  },
  {
    title: 'Documentation',
    description: 'Visit documentation to lean more about all features',
    onTrigger: () => console.log('Documentation'),
    icon: <Book size={18} />,
  },
];

function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  const [_user, setUser] = useState<User>();
  const { data: user } = useFetchUser();

  const updateUser = () => setUser(user);

  useEffect(() => {
    if (!user) return;
    updateUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Compose
      components={[
        {
          component: ColorSchemeProvider,
          options: {
            colorScheme,
            toggleColorScheme,
          },
        },
        {
          component: MantineProvider,
          options: {
            theme: {
              colorScheme,
              primaryColor: 'red',
            },
          },
        },
        {
          component: SpotlightProvider,
          options: {
            actions,
            searchIcon: <Search size={18} />,
            searchPlaceholder: 'Search...',
            shortcut: ['mod + k', '/'],
            nothingFoundMessage: 'Nothing found...',
          },
        },
        {
          component: NotificationsProvider,
          options: {
            limit: 5,
          },
        },
        {
          component: AppContext.Provider,
          options: {
            value: { user: _user, updateUser },
          },
        },
      ]}
    >
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Compose>
  );
}

export default App;
