import { AxiosResponse } from 'axios';
import { useContext } from 'react';
import { useQuery, UseQueryResult } from 'react-query';
import { apiClient } from '../../api';
import { AppContext } from '../../AppContext';

export const useFetchUserFundraisersInfinite = (
  page?: number,
  accessToken?: string
): UseQueryResult<AxiosResponse<Fundraiser[] | undefined>> => {
  const { user } = useContext(AppContext);
  return useQuery(
    ['userFundraisersInfinite', page, accessToken],
    () =>
      apiClient.get(
        `fundraisers/for-user/infinite${page ? '' : `?page=${page}`}`,
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
