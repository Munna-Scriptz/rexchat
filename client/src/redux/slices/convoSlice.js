import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    messages: null,
    isAuthenticated: false,
};

const convoSlice = createSlice({
    name: "auth",
    initialState,

    reducers: {
        setUser(state, action) {
            state.user = action.payload;
            state.isAuthenticated = true;
        },

        clearUser(state) {
            state.user = null;
            state.isAuthenticated = false;
        },
    },
});

export const { setUser, clearUser } = convoSlice.actions;
export default convoSlice.reducer;