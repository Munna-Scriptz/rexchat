import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { api } from '../api'
import messagesSlice from "./slices/messagesSlice"
import userStatusSlice from "./slices/userStatusSlice"

export const store = configureStore({
    reducer: {
        messages: messagesSlice,
        user: userStatusSlice,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
})

setupListeners(store.dispatch)