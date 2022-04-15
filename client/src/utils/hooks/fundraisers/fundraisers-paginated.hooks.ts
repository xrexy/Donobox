import { AxiosResponse } from 'axios';
import { useContext } from 'react';
import { useQuery, UseQueryResult } from 'react-query';
import { apiClient } from '../../api';
import { AppContext } from '../../AppContext';

export const useFetchAllFundraisersPaginated = (
  page?: number,
  accessToken?: string
): UseQueryResult<AxiosResponse<FundraiserResponse | undefined>> => {
  const { user } = useContext(AppContext);
  return useQuery(
    ['globalFundraisersPaginated', page, accessToken],
    () =>
      apiClient.get(
        `fundraisers/for-all/paginated${page ? '' : `?page=${page}`}`,
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
