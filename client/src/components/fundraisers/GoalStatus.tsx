import { Badge, Button, Group, Progress, Text } from '@mantine/core';
import React, { useMemo } from 'react';

interface Props {
  fundraiser: Fundraiser | undefined;
  goalCompleted: number;
}

export const GoalStatus: React.FC<Props> = ({ fundraiser, goalCompleted }) => {
  const isComplete = useMemo(
    () => (fundraiser?.raised || 0) >= (fundraiser?.goal || 0),
    [fundraiser?.goal, fundraiser?.raised]
  );

  return (
    <>
      {/* Gonna be wrapped with Paper in 'ViewFundraiser' */}
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
    </>
  );
};
