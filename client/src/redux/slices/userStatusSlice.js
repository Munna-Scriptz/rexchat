import { createSlice } from "@reduxjs/toolkit";

const userStatusSlice = createSlice({
    name: "user",
    initialState: {
        userId: null,
        status: "offline"
    },

    reducers: {
        addUserId(state, action) {
            state.userId = action.payload
        },
        addStatus(state, action) {
            state.status = action.payload
        },
    }
});

export const { addUserId, addStatus } = userStatusSlice.actions;
export default userStatusSlice.reducer;