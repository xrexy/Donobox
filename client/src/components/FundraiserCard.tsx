import { Card, Text, useMantineTheme } from '@mantine/core';
import React from 'react';

import { useFetchUserById } from '../utils/hooks/user/user-with-id.hooks';

interface Props {
  fundraiser: Fundraiser;
}

export const FundraiserCard: React.FC<Props> = ({ fundraiser }) => {
  const theme = useMantineTheme();
  const { data } = useFetchUserById(fundraiser.createdBy);
  return (
    <Card withBorder shadow="sm" style={{ width: 340 }} p="lg" mb="sm">
      <Text
        size="lg"
        weight={500}
        style={{ fontFamily: `Greycliff CF, ${theme.fontFamily}` }}
      >
        {fundraiser.title}
      </Text>

      <Text size="xs" weight={700} color="dimmed">
        Posted by {data?.data?.email}
      </Text>
    </Card>
  );
};
