import client from './client'
import type { LoginData, RegisterData, AuthResponse, User } from '../types/auth'

export const login = async (data: LoginData): Promise<AuthResponse> => {
  const response = await client.post('/auth/local', {
    identifier: data.identifier,
    password: data.password
  });
  return response.data;
};

export const register = async (data: RegisterData): Promise<void> => {
  await client.post('/api/auth/local/register', data)
}

export const logout = async (): Promise<void> => {
  await client.post('/logout')
}

export const getCurrentUser = async (): Promise<User> => {
  const response = await client.get('/current-user')
  return response.data
}