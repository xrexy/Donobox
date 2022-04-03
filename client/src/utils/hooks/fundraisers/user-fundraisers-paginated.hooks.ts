import { AxiosResponse } from 'axios';
import { useContext } from 'react';
import { useQuery, UseQueryResult } from 'react-query';
import { apiClient } from '../../api';
import { AppContext } from '../../AppContext';

export const useFetchUserFundraisersPaginated = (
  page = -1,
  accessToken?: string
): UseQueryResult<AxiosResponse<FundraiserResponse | undefined>> => {
  const { user } = useContext(AppContext);
  return useQuery(
    ['userFundraisersPaginated', page, accessToken],
    () =>
      apiClient.get(
        `fundraisers/for-user/paginated${
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
