import {
  Badge,
  Button,
  createStyles,
  Group,
  Paper,
  Progress,
  Text,
} from '@mantine/core';
import React from 'react';

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

  const isComplete = (fundraiser?.raised || 0) >= (fundraiser?.goal || 0);

  return (
    <Paper radius="md" withBorder className={classes.card}>
      <Text align="center" weight={700} style={{ lineHeight: 1 }}>
        {fundraiser?.title}
      </Text>
      <Text color="dimmed" align="center" size="sm">
        Posted by {fundraiser?.createdBy}
      </Text>

      <Group position="apart" mt="xs">
        <Text size="sm" color="dimmed">
          Goal: {fundraiser?.goal} BGN
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
        <Button size="xs">Donate</Button>
        {isComplete ? (
          <Badge size="sm" color="lime">
            Goal raised
          </Badge>
        ) : (
          <Badge size="sm">
            {fundraiser?.raised
              ? // eslint-disable-next-line no-unsafe-optional-chaining
                fundraiser?.goal - fundraiser?.raised
              : fundraiser?.goal}{' '}
            left
          </Badge>
        )}
      </Group>
    </Paper>
  );
};
