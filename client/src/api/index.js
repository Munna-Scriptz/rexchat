import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Mutex } from 'async-mutex';

const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: "include"
})


const baseQueryWithReauth = async (args, api, options) => {
    let result = await baseQuery(args, api, options);

    if (result?.error?.status === 401) {
        await mutex.runExclusive(async () => {
            const refreshResult = await baseQuery({
                url: "/auth/refreshAccessToken",
                method: "POST",
            }, api, options);

            if (!refreshResult?.data) {
                api.dispatch(api.util.resetApiState());
                await baseQuery({ url: "/auth/logout", method: "POST" }, api, options);
                throw new Error("Refresh failed");
            }
        });

        // Retry original request after refresh
        result = await baseQuery(args, api, options);
    }

    return result;
};

export const api = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ["auth", "conversation"],

    endpoints: (build) => ({
        // ════════════════════ User and auth ════════════════════
        getProfile: build.query({
            query: () => "/auth/profile",
            providesTags: ["auth"],
        }),

        getUsers: build.query({
            query: () => "/auth/users",
        }),

        updateProfile: build.mutation({
            query: (data) => ({
                url: "/auth/updateProfile",
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["auth"],
        }),

        checkUser: build.query({
            query: (username) => `/auth/check-user/${username}`
        }),

        resetPassword: build.mutation({
            query: (data) => ({
                url: "/auth/reset-password",
                method: "POST",
                body: data,
            }),
        }),

        signup: build.mutation({
            query: (data) => ({
                url: "/auth/signup",
                method: "POST",
                body: data,
            }),
        }),

        signin: build.mutation({
            query: (data) => ({
                url: "/auth/signin",
                method: "POST",
                body: data,
            }),
        }),

        signout: build.mutation({
            query: () => ({
                url: "/auth/signout",
                method: "POST",
            }),
            invalidatesTags: ["auth"],
        }),


        // ════════════════════ Conversation ════════════════════
        getConvoList: build.query({
            query: () => "/conv/list",
            providesTags: ["conversation"],
        }),

        getConvoSingle: build.query({
            query: (convId) => `/conv/single/${convId}`,
        }),

        createPrivateConv: build.mutation({
            query: (data) => ({
                url: "/conv/private",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["conversation"],
        }),


        // ════════════════════ Chat ════════════════════
        sendMessage: build.mutation({
            query: (data) => ({
                url: "/message/send",
                method: "POST",
                body: data,
            }),
        }),
        
        getMessage: build.query({
            query: (convId) => `/message/${convId}`,
        }),

        markAsSeen: build.mutation({
            query: (convId) => ({
                url: `/message/seen/${convId}`,
                method: "PATCH",
            }),
        }),

    }),

})


export const {
    useGetProfileQuery,
    useGetUsersQuery,
    useUpdateProfileMutation,
    useLazyCheckUserQuery,
    useResetPasswordMutation,
    useSignupMutation,
    useSigninMutation,
    useSignoutMutation,

    useGetConvoListQuery,
    useGetConvoSingleQuery,
    useCreatePrivateConvMutation,
    
    useGetMessageQuery,
    useSendMessageMutation,
    useMarkAsSeenMutation
} = api
