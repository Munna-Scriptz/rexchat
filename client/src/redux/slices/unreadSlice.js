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

        setAllUnread(state, action) {
            state.unreadCounts = action.payload;
        }
    }
});

export const { setUnreadCount, incrementUnread, clearUnread, setAllUnread } = unreadSlice.actions;
export default unreadSlice.reducer;