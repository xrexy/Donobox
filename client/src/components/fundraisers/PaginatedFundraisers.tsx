import { createStyles, Group, GroupProps, Pagination, Stack, Text } from '@mantine/core';
import { AxiosResponse } from 'axios';
import React, { useContext, useState } from 'react';
import { UseQueryResult } from 'react-query';
import { MoodConfuzed } from 'tabler-icons-react';
import { AppContext } from '../../utils/AppContext';
import { FundraiserCard } from './FundraiserCard';

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

interface Props {
  fetch: (
    page?: number,
    accessToken?: string | undefined
  ) => UseQueryResult<
    AxiosResponse<FundraiserResponse | undefined, any>,
    unknown
  >;
  title: string;
}

export const PaginatedFundraisers: React.FC<Props & GroupProps> = ({ fetch, title, pt }) => {
  const { classes } = useStyles();
  const [paginationPage, setPaginationPage] = useState(1);
  const { accessToken } = useContext(AppContext);

  const { data: paginatedData } = fetch(paginationPage - 1, accessToken);

  return (
    <Group position="center" pt={pt}>
      <Stack>
        <Group align="baseline" style={{ justifyContent: 'space-between' }}>
          <Text className={classes.fundraisersTitle}>{title}</Text>

          {paginatedData?.data?.data && paginatedData.data.pages > 1 && (
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
            flexDirection: `${paginatedData?.data?.data ? 'row' : 'column'}`,
          }}
        >
          {paginatedData?.data?.data ? (
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
                {emptyQuotes[Math.floor(Math.random() * emptyQuotes.length)]}
              </Text>
            </Stack>
          )}
        </Group>
      </Stack>
    </Group>
  );
};
