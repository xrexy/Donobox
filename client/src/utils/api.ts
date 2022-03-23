import axios from 'axios';

export const BASE_URL = 'http://localhost:3001/api/v1';

export const apiClient = axios.create({
  baseURL: BASE_URL,
});

export const loginUser = async (data: {
  email: string;
  password: string;
  rememberMe: boolean;
}) => apiClient.post('/auth/login', { ...data });

export const registerUser = async (data: { email: string; password: string }) =>
  apiClient.post('/auth/register', { ...data });

export const registerFundraiser = async (data: {
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
