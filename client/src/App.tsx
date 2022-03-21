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
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { AppContext } from './utils/AppContext';
import { useFetchUser } from './utils/hooks/user/user.hooks';

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

const defaultTheme: ColorScheme = 'dark';

function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    (localStorage.getItem('theme') as ColorScheme) || defaultTheme
  );
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  const [user, setUser] = useState<User>();
  const { data } = useFetchUser();

  const [accessToken, setAccessToken] = useState<string>();

  const updateUser = () => setUser(data?.data);
  const updateToken = (token?: string) =>
    setAccessToken(token || localStorage.getItem('access_token') || '');

  useEffect(() => {
    if (!localStorage.getItem('theme')) {
      localStorage.setItem('theme', defaultTheme);
    }

    updateToken();
  }, []);

  useEffect(() => {
    if (!data?.data) return;

    updateUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.data]);

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
            value: { user, updateUser, accessToken, updateToken },
          },
        },
      ]}
    >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Compose>
  );
}

export default App;
