import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import articlesReducer from './articlesSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    articles: articlesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch