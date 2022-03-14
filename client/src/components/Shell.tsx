import { AppShell } from '@mantine/core';
import React from 'react';
import { NavBar } from './NavBar';

interface Props {}

export const Shell: React.FC<Props> = ({ children }) => (
  <AppShell
    styles={(theme) => ({
      main: {
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[8]
            : theme.colors.gray[0],
      },
    })}
    navbar={
      <NavBar
        user={{
          image:
            'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80',
          name: 'Harriette Spoonlicker',
          tokens: 124.68,
        }}
      />
    }
  >
    {children}
  </AppShell>
);
