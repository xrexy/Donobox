import { AxiosResponse } from 'axios';
import { useContext } from 'react';
import { useQuery, UseQueryResult } from 'react-query';
import { apiClient } from '../../api';
import { AppContext } from '../../AppContext';

export const useFetchUserFundraisers = (
  accessToken?: string
): UseQueryResult<AxiosResponse<Fundraiser[] | undefined>> => {
  const { user } = useContext(AppContext);
  return useQuery(
    ['userFundraisers', accessToken],
    async () =>
      apiClient.get('fundraisers/getAllUserFundraisers', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    {
      enabled: !!accessToken && !!user,
      retry: false,
    }
  );
};
