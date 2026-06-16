import { createSlice } from "@reduxjs/toolkit";

const onlineUserSlice = createSlice({
    name: "userStatus",
    initialState: {
        users: []
    },

    reducers: {
        setOnlineUsers(state, action) {
            state.users = action.payload;
        },

        addOnlineUser(state, action) {
            const userId = action.payload;
            if (!state.users.includes(userId)) {
                state.users.push(userId);
            }
        },

        removeOnlineUser(state, action) {
            const userId = action.payload;
            state.users = state.users.filter(id => id !== userId);
        }
    }
});

export const { setOnlineUsers, addOnlineUser, removeOnlineUser } = onlineUserSlice.actions;
export default onlineUserSlice.reducer;