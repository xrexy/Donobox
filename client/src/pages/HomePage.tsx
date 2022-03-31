import { createStyles, Group, Pagination, Stack, Text } from '@mantine/core';
import React, { useContext, useState } from 'react';

import { FundraiserCard } from '../components/FundraiserCard';
import { HeroText } from '../components/HeroText';
import { Shell } from '../components/Shell';
import { AppContext } from '../utils/AppContext';
import { useFetchUserFundraisersPaginated } from '../utils/hooks/fundraisers/user-fundraisers-paginated.hooks';

interface Props {}

const useStyles = createStyles((theme) => ({
  fundraisersTitle: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontWeight: 700,
    fontSize: 28,
  },
}));

export const HomePage: React.FC<Props> = () => {
  const [page, setPage] = useState(1);
  const { accessToken, user } = useContext(AppContext);
  const { data } = useFetchUserFundraisersPaginated(page - 1, accessToken);
  const { classes } = useStyles();
  return (
    <Shell>
      {user && data?.data ? (
        <>
          <Group position="center">
            <Stack>
              <Group
                align="baseline"
                style={{ justifyContent: 'space-between' }}
              >
                <Text className={classes.fundraisersTitle}>
                  Your fundraisers
                </Text>

                <Pagination
                  page={page}
                  position="center"
                  onChange={setPage}
                  total={data.data.pages}
                  siblings={2}
                  mt={20}
                />
              </Group>
              <Group>
                {data?.data?.data.map((fundraiser) => (
                  <FundraiserCard
                    key={fundraiser.fundraiserId}
                    fundraiser={fundraiser}
                  />
                ))}
              </Group>
            </Stack>
          </Group>
        </>
      ) : (
        <HeroText />
      )}
    </Shell>
  );
};
