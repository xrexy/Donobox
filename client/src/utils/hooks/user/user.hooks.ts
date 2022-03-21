import { AxiosResponse } from 'axios';
import { useContext } from 'react';
import { useQuery, UseQueryResult } from 'react-query';
import { apiClient } from '../../api';
import { AppContext } from '../../AppContext';

export const useFetchUser = (): UseQueryResult<
  AxiosResponse<User | undefined>
> => {
  const { accessToken, updateToken } = useContext(AppContext);
  return useQuery(
    ['user', accessToken],
    async () => {
      let token = accessToken;
      if (!accessToken) {
        token = localStorage.getItem('access_token') || '';
        updateToken(token);
      }

      return apiClient.get('/auth/status', {
        headers: {
          Authorization: `Bearer ${accessToken || token}`,
        },
      });
    },
    {
      retry: false,
    }
  );
};
