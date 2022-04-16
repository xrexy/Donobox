import React from 'react';
import {
  Center,
  RingProgress,
  ThemeIcon,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { Check } from 'tabler-icons-react';

interface Props {
  completed: number;
}

const PartialRingProgress: React.FC<Props> = ({ completed }) => (
  <RingProgress
    sections={[{ value: completed, color: 'red' }]}
    size={90}
    thickness={6}
    roundCaps
    label={
      <Text color="red" weight={700} align="center" size="xl">
        {completed}%
      </Text>
    }
  />
);

const CompleteRingProgress: React.FC<{}> = () => {
  const theme = useMantineTheme();

  return (
    <RingProgress
      sections={[{ value: 100, color: theme.colors.green[5] }]}
      size={90}
      thickness={6}
      label={
        <Center>
          <ThemeIcon color="teal" variant="light" radius="xl" size={45}>
            <Check size={20} />
          </ThemeIcon>
        </Center>
      }
    />
  );
};

export const FundraiserRingProgress = ({ completed }: Props) =>
  completed < 100 ? (
    <PartialRingProgress completed={completed} />
  ) : (
    <CompleteRingProgress />
  );
