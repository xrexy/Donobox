import axios from 'axios';

export const BASE_URL = 'http://localhost:3001/api/v1';

export const apiClient = axios.create({
  baseURL: BASE_URL,
});

export const loginUser = (data: {
  email: string;
  password: string;
  rememberMe: boolean;
}) => apiClient.post('/auth/login', { ...data });

export const registerUser = (data: { email: string; password: string }) =>
  apiClient.post('/auth/register', { ...data });

export const registerFundraiser = (data: {
  content: string;
  title: string;
  accessToken: string;
}) =>
  apiClient.post(
    '/fundraisers/create',
    { ...data },
    {
      headers: {
        Authorization: `Bearer ${data.accessToken}`,
      },
    }
  );

export const updateFundraiser = (data: {
  content: string;
  title: string;
  fundraiserId: string;
  accessToken: string;
  goal: number;
}) =>
  apiClient.post(
    '/fundraisers/update',
    { ...data },
    {
      headers: {
        Authorization: `Bearer ${data.accessToken}`,
      },
    }
  );

export const getUser = (userId: string) =>
  apiClient.get<User | undefined>(`/users/${userId}`);

export const getFundraiser = (fundraiserId: string) =>
  apiClient.get<Fundraiser | undefined>(`/fundraisers/${fundraiserId}`);

export const deleteFundraiser = (data: {
  fundraiserId: string;
  accessToken: string;
}) =>
  apiClient.delete(`/fundraisers/delete/${data.fundraiserId}`, {
    headers: {
      Authorization: `Bearer ${data.accessToken}`,
    },
  });
