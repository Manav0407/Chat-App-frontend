import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://chat-app-with-tracking-location.onrender.com" }),
  tagTypes: ["Chat", "User", "Message"],
  // http://localhost:4000
  endpoints: (builder) => ({

    myChat: builder.query({
      query: () => ({
        url: "/chat/my/chats",
        credentials: "include",
      }),
      providesTags: ["Chat"],
    }),

    searchUser: builder.query({
      query: (username) => ({
        url: `/user/search?username=${username}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["User"],
    }),

    sendRequest: builder.mutation({
      query: (data) => ({
        url: "/user/send/request",
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),

    getNotification: builder.query({
      query: () => ({
        url: "/user/notifications",
        credentials: "include",
      }),
      providesTags: ["User"],
      keepUnusedDataFor: 0,
    }),

    acceptRequest: builder.mutation({
      query: (data) => ({
        url: "/user/accept/request",
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Chat"],
    }),

    getChatDetails: builder.query({
      query: ({ chatId, populate = false }) => {
        let url = `/chat/${chatId}`;
        if (populate) url += `?populate=true`;
        return {
          url,
          credentials: "include",
        };
      },
      providesTags: ["Chat"],
    }),

    getMessages: builder.query({
      query: ({ chatId, page }) => ({
        url: `/chat/message/${chatId}?page=${page}`,
        credentials: "include",
      }),
      keepUnusedDataFor:0,
    }),
    
      sendAttachments: builder.mutation({
        query: (data) => ({
          url: "/chat/message",
          method: "POST",
          body: data,
          credentials: "include",
        }),
      }),
      myGroup: builder.query({
        query: () => ({
          url: "/chat/my/groups",
          credentials: "include",
        }),
        providesTags: ["Chat"],
      }),

      availableFriends: builder.query({
        query: (chatId) => {
          let url = `/user/friends`;
          if (chatId) url += `?chatId=${chatId}`;
          return {
            url,
            credentials: "include",
          };
        },
        providesTags: ["Chat"],
      }),

      createGroup: builder.mutation({
        query: ({name,members}) => ({
          url: "/chat/new",
          method: "POST",
          body: {name,members},
          credentials: "include",
        }),
        invalidatesTags: ["User"],
      }),

      removeMember: builder.mutation({
        query: ({chatId,userId}) => ({
          url: "/chat/remove/members",
          method: "PUT",
          body: {chatId,userId},
          credentials: "include",
        }),
        invalidatesTags: ["Chat"],
      }),

      addMember: builder.mutation({
        query: ({chatId,members}) => ({
          url: "/chat/add/members",
          method: "PUT",
          body: {chatId,members},
          credentials: "include",
        }),
        invalidatesTags: ["Chat"],
      }),

      deleteGroup: builder.mutation({
        query: (chatId) => ({
          url: `/chat/${chatId}`,
          method: "DELETE",
          credentials: "include",
        }),
        invalidatesTags: ["Chat"],
      }),

      leaveGroup: builder.mutation({
        query: (chatId) => ({
          url: `/chat/leave/${chatId}`,
          method: "DELETE",
          credentials: "include",
        }),
        invalidatesTags: ["Chat"],
      }),
      friendsLocation: builder.query({
        query: () => ({
          url: "/user/all/location",
          credentials: "include",
        }),
        providesTags: ["User"],
      }),
      
  
  }),


});

export const {
  useMyChatQuery,
  useLazySearchUserQuery,
  useSendRequestMutation,
  useGetNotificationQuery,
  useAcceptRequestMutation,
  useGetChatDetailsQuery,
  useGetMessagesQuery,
  useSendAttachmentsMutation,
  useMyGroupQuery,
  useAvailableFriendsQuery,
  useCreateGroupMutation,
  useRemoveMemberMutation,
  useAddMemberMutation,
  useDeleteGroupMutation,
  useLeaveGroupMutation,
  useFriendsLocationQuery,
} = api;
