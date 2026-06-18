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

        markMessagesSeen(state, action) {
            const { conversation, seenByUserId } = action.payload;

            state.messages = state.messages.map((message) => {
                const sameConversation = message.conversation?.toString?.() === conversation?.toString?.();
                const sentByMe = message.sender?.toString?.() === action.payload.currentUserId?.toString?.();

                if (!sameConversation || !sentByMe) return message;

                const alreadySeen = Array.isArray(message.seenBy)
                    && message.seenBy.some((id) => id?.toString?.() === seenByUserId?.toString?.());

                if (alreadySeen) return message;

                return {
                    ...message,
                    seenBy: [...(message.seenBy || []), seenByUserId],
                };
            });
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            api.endpoints.getMessage.matchFulfilled,
            (state, action) => {
                state.messages = action.payload.data;
            }
        )
    },
});

export const { addMessage, markMessagesSeen } = messagesSlice.actions;
export default messagesSlice.reducer;
