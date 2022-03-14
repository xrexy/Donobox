import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { SpotlightAction, SpotlightProvider } from '@mantine/spotlight';
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Search, Home, AccessPoint, Book } from 'tabler-icons-react';

import { HomePage } from './pages/HomePage';

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

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider theme={{ colorScheme, primaryColor: 'red' }}>
        <SpotlightProvider
          actions={actions}
          searchIcon={<Search size={18} />}
          searchPlaceholder="Search..."
          shortcut={['mod + k', '/']}
          nothingFoundMessage="Nothing found..."
        >
          <NotificationsProvider limit={5}>
            <Routes>
              <Route path="/" element={<HomePage />} />
            </Routes>
          </NotificationsProvider>
        </SpotlightProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
