import {
  Badge,
  createStyles,
  Group,
  Paper,
  Progress,
  Text,
} from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { getUser } from '../../utils/api';

const useStylesGoalStatus = createStyles((theme) => ({
  card: {
    position: 'relative',
    overflow: 'hidden',
    padding: theme.spacing.xl,
  },
}));

interface Props {
  fundraiser: Fundraiser | undefined;
  goalCompleted: number;
}

export const GoalStatus: React.FC<Props> = ({ fundraiser, goalCompleted }) => {
  const { classes } = useStylesGoalStatus();
  const [postedBy, setPostedBy] = useState<User>();

  useEffect(() => {
    if (!fundraiser?.createdBy) return;
    getUser(fundraiser?.createdBy).then((res) => setPostedBy(res.data));
  }, [fundraiser?.createdBy]);

  const isComplete = (fundraiser?.raised || 0) >= (fundraiser?.goal || 0);

  return (
    <Paper radius="md" withBorder className={classes.card}>
      <Text align="center" weight={700} style={{ lineHeight: 1 }}>
        {fundraiser?.title}
      </Text>
      <Text color="dimmed" align="center" size="sm">
        Posted by {postedBy?.email}
      </Text>

      <Group position="apart" mt="xs">
        <Text size="sm" color="dimmed">
          Progress
        </Text>
        <Text size="sm" color="dimmed">
          {Math.min(100, goalCompleted)}%
        </Text>
      </Group>

      <Progress
        value={goalCompleted}
        mt={5}
        color={isComplete ? 'lime' : 'red'}
      />

      <Group position="apart" mt="md">
        <Text size="sm">Goal: {fundraiser?.goal}</Text>
        {isComplete ? (
          <Badge size="sm" color="lime">
            Goal raised!
          </Badge>
        ) : (
          <Badge size="sm">
            {fundraiser?.goal && fundraiser?.raised
              ? // eslint-disable-next-line no-unsafe-optional-chaining
                fundraiser?.goal - fundraiser?.raised
              : 0}{' '}
            left
          </Badge>
        )}
      </Group>
    </Paper>
  );
};
