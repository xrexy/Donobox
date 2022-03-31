import { Pagination } from '@mantine/core';
import React, { useContext, useState } from 'react';
import { FundraiserCard } from '../components/FundraiserCard';
import { HeroText } from '../components/HeroText';
import { Shell } from '../components/Shell';
import { AppContext } from '../utils/AppContext';
import { useFetchUserFundraisersPaginated } from '../utils/hooks/fundraisers/user-fundraisers-paginated.hooks';

interface Props {}

export const HomePage: React.FC<Props> = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [page, setPage] = useState(1);
  const { accessToken, user } = useContext(AppContext);
  const { data } = useFetchUserFundraisersPaginated(page - 1, accessToken);
  return (
    <Shell>
      {user && data?.data ? (
        <>
          {data?.data?.data.map((fundraiser) => (
            <FundraiserCard
              key={fundraiser.fundraiserId}
              fundraiser={fundraiser}
            />
          ))}
          <Pagination
            page={page}
            onChange={setPage}
            total={data.data.pages}
            siblings={2}
          />
          ;
        </>
      ) : (
        <HeroText />
      )}
    </Shell>
  );
};
