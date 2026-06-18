import { createSlice } from "@reduxjs/toolkit";

const unreadSlice = createSlice({
    name: "unread",

    initialState: {
        unreadCounts: {}
    },

    reducers: {
        setUnreadCount(state, action) {
            const { conversation, count } = action.payload;
            state.unreadCounts[conversation] = count;
        },

        incrementUnread(state, action) {
            const conversation = action.payload;
            state.unreadCounts[conversation] = (state.unreadCounts[conversation] || 0) + 1;
        },

        clearUnread(state, action) {
            const conversation = action.payload;
            state.unreadCounts[conversation] = 0;
        },
    }
});

export const { setUnreadCount, incrementUnread, clearUnread } = unreadSlice.actions;
export default unreadSlice.reducer;
