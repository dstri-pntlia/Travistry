// hooks/useAuth.ts
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, logout } from '../store/authSlice';
import client from '../api/client';
import { setLocalStorageItem, removeLocalStorageItem } from '../utils/storage';
// import type { User } from '../types/auth';

const useAuth = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const user = useSelector((state: any) => state.auth.user);

  const login = async (identifier: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const formBody = new URLSearchParams({ identifier, password });

      const response = await client.post('/auth/local', formBody.toString(), {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      const { jwt, user } = response.data;

      setLocalStorageItem('token', jwt);
      setLocalStorageItem('user', user);
      dispatch(loginSuccess({ user, token: jwt }));

      return true;
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Login failed');
      return false;
    } finally {
      setLoading(false);
    }
  };



  const register = async (username: string, email: string, password: string) => {
  setLoading(true);
  setError(null);

  try {
    const formBody = new URLSearchParams({
      username,
      email,
      password
    });

    const response = await client.post('/auth/local/Register', formBody.toString(), {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    console.log("Registrasi sukses!", response.data);
    return response.data;

  } catch (err: any) {
    console.error("Registrasi gagal!", err.response?.data);
    setError(err.response?.data?.error?.message || 'Registration failed');
    return false;

  } finally {
    setLoading(false);
  }
};



  const logoutUser = () => {
    removeLocalStorageItem('token');
    removeLocalStorageItem('user');
    dispatch(logout());
  };

  return { user, login, register, logout: logoutUser, error, loading };
};

export default useAuth;