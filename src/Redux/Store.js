import { configureStore } from '@reduxjs/toolkit'
import { sideBarSlice } from './Reducer/uiSlice'
import { authSlice } from './Reducer/authSlice'
import { api } from './Api/api'
import { miscSlice } from './Reducer/miscSlice'
import { chatSlice } from './Reducer/chatSlice'

export const store = configureStore({
    reducer: {
        ui : sideBarSlice.reducer,
        auth : authSlice.reducer,
        misc:miscSlice.reducer,
        [api.reducerPath] : api.reducer,
        chat:chatSlice.reducer,
    },
    middleware: (defaultMiddleware) =>[...defaultMiddleware(),api.middleware],
  })