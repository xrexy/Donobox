import { useQuery } from 'react-query';
import { apiClient } from '../../../api';

export const useFetchUser = (token: string | null) =>
  useQuery(
    'user',
    async () =>
      // eslint-disable-next-line @typescript-eslint/return-await
      await apiClient.get('/auth/status', {
        headers: {
          Authorization: `Bearer ${token || ''}`,
        },
      }),
    {
      enabled: !token,
    }
  );
