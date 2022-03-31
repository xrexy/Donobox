import {
  ActionIcon,
  Badge,
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
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bulb, Checkbox, Home, Plus, Search, User } from 'tabler-icons-react';

import { AppContext } from '../utils/AppContext';
import { useFetchUserFundraisers } from '../utils/hooks/fundraisers/user-fundraisers.hooks';
import { UserMenu } from './menus/UserMenu';
import { ThemeToggler } from './ThemeToggler';

const useStyles = createStyles((theme) => ({
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
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

const links: NavbarLink[] = [
  {
    icon: Home,
    label: 'Homepage',
    path: '/',
  },
  {
    icon: User,
    label: 'Profile',
    children: [<UserMenu />],
  },
  { icon: Bulb, label: 'Activity', notifications: 3 },
  { icon: Checkbox, label: 'Tasks', notifications: 4 },
];

export function NavBar() {
  const { classes } = useStyles();
  const spotlight = useSpotlight();
  const theme = useMantineTheme();
  const navigate = useNavigate();

  const { user, accessToken } = useContext(AppContext);
  const { data } = useFetchUserFundraisers(accessToken);

  const mainLinks = links.map((link) => (
    <UnstyledButton
      key={link.label}
      className={classes.mainLink}
      onClick={() => {
        if (link.path) navigate(link.path);
      }}
    >
      <div className={classes.mainLinkInner}>
        <link.icon size={20} className={classes.mainLinkIcon} />
        <span>{link.label}</span>
      </div>
      {link.children ? (
        <>{link.children?.map((ch) => ch)}</>
      ) : (
        <>
          {link.notifications && (
            <Badge size="sm" variant="filled" className={classes.mainLinkBadge}>
              {link.notifications}
            </Badge>
          )}
        </>
      )}
    </UnstyledButton>
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
        <TextInput
          placeholder="Search"
          size="xs"
          mt="xl"
          icon={<Search size={12} />}
          rightSectionWidth={70}
          rightSection={<Code className={classes.searchCode}>Ctrl + K</Code>}
          styles={{
            rightSection: { pointerEvents: 'none' },
            input: {
              border: `${
                theme.colorScheme === 'light'
                  ? `1px solid ${theme.colors.gray[2]}`
                  : 'none'
              }`,
            },
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
            <Tooltip
              label={`${user ? 'New fundraiser' : 'Login'}`}
              withArrow
              position="right"
              onClick={() =>
                navigate(`${user ? '/fundraisers/modify' : '/login'}`)
              }
            >
              <ActionIcon variant="default" size={18}>
                <Plus size={12} />
              </ActionIcon>
            </Tooltip>
          </Group>
          <div className={classes.collections}>
            {user ? (
              <>
                {data?.data?.map((fundraiser) => (
                  <a
                    href="/"
                    onClick={(event) => event.preventDefault()}
                    key={fundraiser.fundraiserId}
                    className={classes.collectionLink}
                  >
                    {fundraiser.title}
                  </a>
                ))}
              </>
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
