import { AxiosResponse } from 'axios';
import { useContext } from 'react';
import { useQuery, UseQueryResult } from 'react-query';
import { apiClient } from '../../api';
import { AppContext } from '../../AppContext';

export const useFetchUser = (
  accessToken?: string
): UseQueryResult<AxiosResponse<User | undefined>> => {
  const { user } = useContext(AppContext);
  return useQuery(
    ['user', accessToken],
    () =>
      apiClient.get('/auth/status', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    {
      enabled: !!accessToken && !user,
      retry: false,
    }
  );
};
