import { AxiosResponse } from 'axios';
import { useQuery, UseQueryResult } from 'react-query';
import { apiClient } from '../../api';

export const useFetchUser = (
  accessToken: string | undefined
): UseQueryResult<AxiosResponse<User | undefined>> =>
  useQuery(
    ['user', accessToken],
    async () =>
      apiClient.get('/auth/status', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    {
      enabled: !!accessToken,
      retry: false,
    }
  );
