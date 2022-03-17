import { useQuery, UseQueryResult } from 'react-query';
import { apiClient } from '../../../api';

export const useFetchUser = (
  token = localStorage.getItem('access_token')
): UseQueryResult<User | undefined> =>
  useQuery(
    'user',
    async () =>
      // eslint-disable-next-line @typescript-eslint/return-await
      await apiClient.get('/auth/status', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    {
      enabled: !!token,
      retry: false,
    },
  );
