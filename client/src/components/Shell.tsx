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
    navbar={<NavBar />}
  >
    {children}
  </AppShell>
);
