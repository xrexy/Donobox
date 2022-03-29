import { AxiosResponse } from 'axios';
import { useContext } from 'react';
import { useQuery, UseQueryResult } from 'react-query';
import { apiClient } from '../../api';
import { AppContext } from '../../AppContext';

export const useFetchFundraiser = (
  page = -1,
  accessToken?: string
): UseQueryResult<AxiosResponse<FundraiserResponse | undefined>> => {
  const { user } = useContext(AppContext);
  return useQuery(
    ['fundraiserPage', page, accessToken],
    async () =>
      apiClient.get(
        `fundraisers/getAllUserFundraisers${
          page === -1 ? '' : `?page=${page}`
        }`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      ),
    {
      enabled: !!accessToken && !!user,
      retry: false,
    }
  );
};
