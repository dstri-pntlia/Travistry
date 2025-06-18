import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { User, AuthResponse } from '../types/auth'
import { setLocalStorageItem, removeLocalStorageItem, getLocalStorageItem } from '../utils/storage'

interface AuthState {
  user: User | null
  token: string | null
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  user: getLocalStorageItem<User>('user'),
  token: getLocalStorageItem<string>('token'),
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true
      state.error = null
    },
    loginSuccess(state, action: PayloadAction<AuthResponse>) {
      state.loading = false
      state.user = action.payload.user
      state.token = action.payload.token
      setLocalStorageItem('user', action.payload.user)
      setLocalStorageItem('token', action.payload.token)
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false
      state.error = action.payload
    },
    logout(state) {
      state.user = null
      state.token = null
      removeLocalStorageItem('user')
      removeLocalStorageItem('token')
    },
    clearError(state) {
      state.error = null
    },
  },
})

export const { loginStart, loginSuccess, loginFailure, logout, clearError } = authSlice.actions

export default authSlice.reducer