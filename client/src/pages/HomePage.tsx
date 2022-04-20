import React, { useContext } from 'react';

import { PaginatedFundraisers } from '../components/fundraisers/PaginatedFundraisers';
import { HeroText } from '../components/HeroText';
import { Shell } from '../components/Shell';
import { AppContext } from '../utils/AppContext';
import { useFetchAllFundraisersPaginated } from '../utils/hooks/fundraisers/fundraisers-paginated.hooks';
import { useFetchUserFundraisersPaginated } from '../utils/hooks/fundraisers/user-fundraisers-paginated.hooks';

interface Props {}

export const HomePage: React.FC<Props> = () => {
  const { user } = useContext(AppContext);
  return (
    <Shell>
      {user ? (
        <>
          <PaginatedFundraisers
            title="Your Fundraisers"
            fetch={useFetchUserFundraisersPaginated}
          />
          <PaginatedFundraisers
            title="Recent Fundraisers"
            fetch={useFetchAllFundraisersPaginated}
            pt="md"
          />
        </>
      ) : (
        <HeroText />
      )}
    </Shell>
  );
};
