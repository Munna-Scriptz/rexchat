import { createSlice } from "@reduxjs/toolkit";
import { api } from "../../api";

const messagesSlice = createSlice({
    name: "messages",
    initialState: {
        messages: []
    },

    reducers: {
        addMessage(state, action) {
            state.messages.push(action.payload)
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            api.endpoints.getMessage.matchFulfilled,
            (state, action) => {
                state.messages = action.payload;
            },
        )
    },
});

export const { addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;