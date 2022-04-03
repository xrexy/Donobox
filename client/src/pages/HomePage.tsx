import { createStyles, Group, Pagination, Stack, Text } from '@mantine/core';
import React, { useContext, useState } from 'react';
import { MoodConfuzed } from 'tabler-icons-react';

import { FundraiserCard } from '../components/FundraiserCard';
import { HeroText } from '../components/HeroText';
import { Shell } from '../components/Shell';
import { AppContext } from '../utils/AppContext';
import { useFetchUserFundraisersInfinite } from '../utils/hooks/fundraisers/user-fundraisers-infinite.hooks';
import { useFetchUserFundraisersPaginated } from '../utils/hooks/fundraisers/user-fundraisers-paginated.hooks';

interface Props {}

const useStyles = createStyles((theme) => ({
  fundraisersTitle: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontWeight: 700,
    fontSize: 28,
  },

  emptyFundraisersGroup: {
    color: theme.colorScheme === 'dark' ? theme.colors.gray[7] : theme.black,
  },
}));

const emptyQuotes = [
  'Wow... Such empty',
  'Well... This is awkward',
  'No fundraisers found',
];

export const HomePage: React.FC<Props> = () => {
  const [paginationPage, setPaginationPage] = useState(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [infinitePage, setInfinitePage] = useState(1);
  const { accessToken, user } = useContext(AppContext);
  const { data: paginatedData } = useFetchUserFundraisersPaginated(
    paginationPage - 1,
    accessToken
  );
  const { data: infiniteData } = useFetchUserFundraisersInfinite(
    infinitePage - 1,
    accessToken
  );
  const { classes } = useStyles();
  return (
    <Shell>
      {user && paginatedData?.data ? (
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

                {paginatedData.data.data && paginatedData.data.pages > 1 && (
                  <Pagination
                    page={paginationPage}
                    position="center"
                    onChange={setPaginationPage}
                    total={paginatedData.data.pages}
                    siblings={2}
                    mt={20}
                  />
                )}
              </Group>
              <Group
                style={{
                  flexDirection: `${
                    paginatedData.data.data ? 'row' : 'column'
                  }`,
                }}
              >
                {paginatedData.data.data ? (
                  <>
                    {paginatedData?.data?.data.map((fundraiser) => (
                      <FundraiserCard
                        key={fundraiser.fundraiserId}
                        fundraiser={fundraiser}
                      />
                    ))}
                  </>
                ) : (
                  <Stack
                    align="center"
                    justify="center"
                    className={classes.emptyFundraisersGroup}
                  >
                    <MoodConfuzed size={69} />
                    <Text>
                      {
                        emptyQuotes[
                          Math.floor(Math.random() * emptyQuotes.length)
                        ]
                      }
                    </Text>
                  </Stack>
                )}
              </Group>
            </Stack>
          </Group>
          {infiniteData?.data && (
            <>
              {infiniteData.data.map((fundraiser) => (
                <h1>{fundraiser.title}</h1>
              ))}
            </>
          )}
        </>
      ) : (
        <HeroText />
      )}
    </Shell>
  );
};
