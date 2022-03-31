import { Badge, createStyles, Group, Paper, Text } from '@mantine/core';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  fundraiser: Fundraiser;
}

const useStyles = createStyles((theme) => ({
  root: {
    padding: theme.spacing.xl * 1.5,
  },

  value: {
    fontSize: 20,
    fontWeight: 700,
    lineHeight: 1,
  },

  icon: {
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[3]
        : theme.colors.gray[4],

    '&:hover': {
      color: 'red',
    },
  },

  title: {
    fontWeight: 700,
    textTransform: 'uppercase',

    '&:hover': {
      cursor: 'pointer',
      color: 'white',
    },
  },

  badge: {
    '&:hover': {
      cursor: 'pointer',
      opacity: 0.8,
    },
  },
}));

export const FundraiserCard: React.FC<Props> = ({ fundraiser }) => {
  const { classes } = useStyles();
  const navigate = useNavigate();

  return (
    <Paper
      withBorder
      p="md"
      radius="md"
      key={fundraiser.title}
      style={{ width: 340 }}
    >
      <Group position="apart">
        <Text
          size="xs"
          color="dimmed"
          className={classes.title}
          onClick={() => navigate(`/fundraisers/${fundraiser.fundraiserId}`)}
        >
          {fundraiser.title}
        </Text>

        <Group spacing={7}>
          <Badge
            size="sm"
            color="red"
            variant="gradient"
            gradient={{ from: 'orange', to: 'red', deg: 20 }}
            className={classes.badge}
          >
            Delete
          </Badge>
          <Badge
            size="sm"
            color="cyan"
            variant="gradient"
            gradient={{ from: 'cyan', to: 'teal', deg: 20 }}
            className={classes.badge}
          >
            Edit
          </Badge>
        </Group>
      </Group>

      <Text mt={20} className={classes.value}>
        ${fundraiser.raised || 0}
      </Text>

      <Text size="xs" color="dimmed" mt={7}>
        Posted on {fundraiser.createdOn || '... who knows'}
      </Text>
    </Paper>
  );
};
