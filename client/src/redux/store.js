import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { api } from '../api'
import messagesSlice from "./slices/messagesSlice"
import onlineUserSlice from "./slices/onlineUserSlice"
import unreadSlice from "./slices/unreadSlice"

export const store = configureStore({
    reducer: {
        messages: messagesSlice,
        onlineUsers: onlineUserSlice,
        unread: unreadSlice,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
})

setupListeners(store.dispatch)