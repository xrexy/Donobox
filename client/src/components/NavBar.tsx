import {
  ActionIcon,
  Avatar,
  Badge,
  Button,
  Code,
  createStyles,
  Group,
  Navbar,
  Text,
  TextInput,
  Tooltip,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import { useSpotlight } from '@mantine/spotlight';
import React, { useState } from 'react';
import {
  Bulb,
  Checkbox,
  ChevronRight,
  Plus,
  Search,
  User,
} from 'tabler-icons-react';
import { useFetchUser } from '../utils/config/hooks/user/user.hooks';
import { LoginModal } from './modals/LoginModal';
import { RegisterModal } from './modals/RegisterModal';

import { ThemeToggler } from './ThemeToggler';

const useStyles = createStyles((theme) => ({
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  user: {
    display: 'block',
    width: '100%',
    padding: theme.spacing.md,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[8]
          : theme.colors.gray[0],
    },
  },

  userControl: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    width: '100%',
    padding: theme.spacing.md,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
  },

  section: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    marginBottom: theme.spacing.md,

    '&:not(:last-of-type)': {
      borderBottom: `1px solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[4]
          : theme.colors.gray[3]
      }`,
    },
  },

  searchCode: {
    fontWeight: 700,
    fontSize: 10,
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    border: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[2]
    }`,
  },

  mainLinks: {
    paddingLeft: theme.spacing.md - theme.spacing.xs,
    paddingRight: theme.spacing.md - theme.spacing.xs,
    paddingBottom: theme.spacing.md,
  },

  mainLink: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    fontSize: theme.fontSizes.xs,
    padding: `8px ${theme.spacing.xs}px`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },

  mainLinkInner: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  },

  mainLinkIcon: {
    marginRight: theme.spacing.sm,
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
  },

  mainLinkBadge: {
    padding: 0,
    width: 20,
    height: 20,
    pointerEvents: 'none',
  },

  collections: {
    paddingLeft: theme.spacing.md - 6,
    paddingRight: theme.spacing.md - 6,
    paddingBottom: theme.spacing.md,
  },

  collectionsHeader: {
    paddingLeft: theme.spacing.md + 2,
    paddingRight: theme.spacing.md,
    marginBottom: 5,
  },

  collectionLink: {
    display: 'block',
    padding: `8px ${theme.spacing.xs}px`,
    textDecoration: 'none',
    borderRadius: theme.radius.sm,
    fontSize: theme.fontSizes.xs,
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    lineHeight: 1,
    fontWeight: 500,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },

  footer: {
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    paddingTop: theme.spacing.md,
  },

  control: {
    '@media (max-width: 520px)': {
      height: 42,
      fontSize: theme.fontSizes.md,

      '&:not(:first-of-type)': {
        marginTop: theme.spacing.md,
        marginLeft: 0,
      },
    },
  },
}));

const links = [
  { icon: Bulb, label: 'Activity', notifications: 3 },
  { icon: Checkbox, label: 'Tasks', notifications: 4 },
  { icon: User, label: 'Contacts' },
];

const collections = [
  { emoji: '👍', label: 'Sales' },
  { emoji: '🚚', label: 'Deliveries' },
  { emoji: '💸', label: 'Discounts' },
  { emoji: '💰', label: 'Profits' },
  { emoji: '✨', label: 'Reports' },
  { emoji: '🛒', label: 'Orders' },
  { emoji: '📅', label: 'Events' },
  { emoji: '🙈', label: 'Debts' },
  { emoji: '💁‍♀️', label: 'Customers' },
];

interface Props {
  user: {
    image: string;
    name: string;
    tokens: number;
  };
}

export function NavBar({ user }: Props) {
  const { classes } = useStyles();
  const spotlight = useSpotlight();
  const theme = useMantineTheme();
  const { data, isSuccess } = useFetchUser(localStorage.getItem('token'));

  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
  const [registerModalIsOpen, setRegisterModalIsOpen] = useState(false);

  const mainLinks = links.map((link) => (
    <UnstyledButton key={link.label} className={classes.mainLink}>
      <div className={classes.mainLinkInner}>
        <link.icon size={20} className={classes.mainLinkIcon} />
        <span>{link.label}</span>
      </div>
      {link.notifications && (
        <Badge size="sm" variant="filled" className={classes.mainLinkBadge}>
          {link.notifications}
        </Badge>
      )}
    </UnstyledButton>
  ));

  const collectionLinks = collections.map((collection) => (
    <a
      href="/"
      onClick={(event) => event.preventDefault()}
      key={collection.label}
      className={classes.collectionLink}
    >
      <span style={{ marginRight: 9, fontSize: 16 }}>{collection.emoji}</span>{' '}
      {collection.label}
    </a>
  ));

  return (
    <Navbar
      width={{ sm: 300 }}
      pl="md"
      pr="md"
      pb="md"
      className={classes.navbar}
    >
      <div>
        <Navbar.Section className={classes.section}>
          {isSuccess && data ? (
            <UnstyledButton className={classes.user}>
              <Group>
                <Avatar src={user.image} radius="xl" />

                <div style={{ flex: 1 }}>
                  <Text size="sm" weight={500}>
                    {user.name}
                  </Text>

                  <Text color={theme.colors[theme.primaryColor][8]} size="xs">
                    {`${user.tokens} tokens`}
                  </Text>
                </div>

                <ChevronRight size={14} />
              </Group>
            </UnstyledButton>
          ) : (
            <Group className={classes.userControl}>
              <LoginModal
                modalProps={{
                  opened: loginModalIsOpen,
                  onClose: () => setLoginModalIsOpen(false),
                }}
                dispatchers={{
                  toEnable: setRegisterModalIsOpen,
                  toDisable: setLoginModalIsOpen,
                }}
              />
              <Button
                className={classes.control}
                size="md"
                onClick={() => setLoginModalIsOpen(true)}
              >
                Login
              </Button>

              <RegisterModal
                modalProps={{
                  opened: registerModalIsOpen,
                  onClose: () => setRegisterModalIsOpen(false),
                }}
                dispatchers={{
                  toEnable: setLoginModalIsOpen,
                  toDisable: setRegisterModalIsOpen,
                }}
              />
              <Button
                className={classes.control}
                size="md"
                onClick={() => setRegisterModalIsOpen(true)}
              >
                Register
              </Button>
            </Group>
          )}
        </Navbar.Section>

        <TextInput
          placeholder="Search"
          size="xs"
          icon={<Search size={12} />}
          rightSectionWidth={70}
          rightSection={<Code className={classes.searchCode}>Ctrl + K</Code>}
          styles={{
            rightSection: { pointerEvents: 'none' },
            input: { border: 'none' },
          }}
          onClick={() => spotlight.openSpotlight()}
          mb="sm"
          readOnly
        />

        <Navbar.Section className={classes.section}>
          <div className={classes.mainLinks}>{mainLinks}</div>
        </Navbar.Section>

        <Navbar.Section className={classes.section}>
          <Group className={classes.collectionsHeader} position="apart">
            <Text size="xs" weight={500} color="dimmed">
              My charities
            </Text>
            <Tooltip label="New fundraiser" withArrow position="right">
              <ActionIcon variant="default" size={18}>
                <Plus size={12} />
              </ActionIcon>
            </Tooltip>
          </Group>
          <div className={classes.collections}>
            {isSuccess && data ? (
              { collectionLinks }
            ) : (
              <a
                href="/"
                onClick={(event) => event.preventDefault()}
                key="no__user"
                className={classes.collectionLink}
              >
                <span style={{ marginRight: 9, fontSize: 16 }}>😅</span> Please
                login to continue
              </a>
            )}
          </div>
        </Navbar.Section>
      </div>
      <Navbar.Section className={classes.footer}>
        <ThemeToggler />
      </Navbar.Section>
    </Navbar>
  );
}
