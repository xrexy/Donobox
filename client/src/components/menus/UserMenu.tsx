import { Divider, Menu, Text, useMantineTheme } from '@mantine/core';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash, User, UserPlus } from 'tabler-icons-react';

import { AppContext } from '../../utils/AppContext';

export function UserMenu() {
  const { user } = useContext(AppContext);
  const theme = useMantineTheme();
  const navigate = useNavigate();
  return (
    <Menu>
      {user ? (
        <>
          <Menu.Item icon={<User size={14} color={theme.white} />} disabled>
            <div style={{ flex: 1 }}>
              <Text color={theme.white} size="sm" weight={500}>
                {user.email}
              </Text>

              <Text color={theme.colors[theme.primaryColor][6]} size="xs">
                {`${user.tokens.toFixed(2)} tokens`}
              </Text>
            </div>
          </Menu.Item>
          <Divider />

          <Menu.Label>Danger zone</Menu.Label>
          <Menu.Item color="red" icon={<Trash size={14} />}>
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
            onClick={() => navigate('/login')}
          >
            Register
          </Menu.Item>
        </>
      )}
    </Menu>
  );
}
