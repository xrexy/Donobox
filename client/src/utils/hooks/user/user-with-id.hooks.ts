import { AxiosResponse } from 'axios';
import { useQuery, UseQueryResult } from 'react-query';

import { apiClient } from '../../api';

export const useFetchUserById = (
  userId: string
): UseQueryResult<AxiosResponse<User | undefined>> => useQuery(
    'user-with-id',
    () => apiClient.get(`/users/${userId}`),
    {
      retry: false,
    }
  );
