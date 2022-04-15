import { Divider, Menu, Text, useMantineTheme } from '@mantine/core';
import React, { useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash, User, UserPlus } from 'tabler-icons-react';

import { AppContext } from '../../utils/AppContext';

export function UserMenu() {
  const { user, updateToken, updateUser } = useContext(AppContext);
  const theme = useMantineTheme();
  const navigate = useNavigate();

  const reactiveColor = useMemo(
    () => (theme.colorScheme === 'dark' ? theme.white : theme.colors.gray[6]),
    [theme.colorScheme, theme.colors.gray, theme.white]
  );

  return (
    <Menu>
      {user ? (
        <>
          <Menu.Item icon={<User size={14} color={reactiveColor} />} disabled>
            <div style={{ flex: 1 }}>
              <Text color={reactiveColor} size="sm" weight={500}>
                {user.email}
              </Text>

              <Text color={theme.colors[theme.primaryColor][6]} size="xs">
                {`${user.tokens.toFixed(2)} tokens`}
              </Text>
            </div>
          </Menu.Item>
          <Divider />

          <Menu.Label>Danger zone</Menu.Label>
          <Menu.Item
            color="red"
            icon={<Trash size={14} />}
            onClick={() => {
              updateUser();

              localStorage.removeItem('access_token');
              updateToken();
            }}
          >
            Logout
          </Menu.Item>
        </>
      ) : (
        <>
          <Menu.Item
            icon={<User size={14} />}
            onClick={() => navigate('/login')}
          >
            Login
          </Menu.Item>
          <Menu.Item
            icon={<UserPlus size={14} />}
            onClick={() => navigate('/register')}
          >
            Register
          </Menu.Item>
        </>
      )}
    </Menu>
  );
}
