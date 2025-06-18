// api/client.ts
import axios from 'axios';
import qs from 'qs';

const API_BASE_URL = 'https://extra-brooke-yeremiadio-46b2183e.koyeb.app/api';

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json', // default untuk non-auth
  },
});

client.interceptors.request.use((config) => {
  const isAuthEndpoint = config.url?.includes('/auth/local');

  // Jangan kirim Authorization header kalau ke endpoint login
  if (!isAuthEndpoint) {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  if (isAuthEndpoint) {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    if (config.data && typeof config.data === 'object') {
      config.data = qs.stringify(config.data);
    }
  }

  return config;
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
    }
    return Promise.reject(error);
  }
);

export default client;
