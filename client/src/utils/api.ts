import axios from 'axios';

export const BASE_URL = 'http://localhost:3001/api/v1';

export const apiClient = axios.create({
  baseURL: BASE_URL,
});

interface LoginData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export const loginUser = async (data: LoginData) =>
  apiClient.post('/auth/login', { ...data });
