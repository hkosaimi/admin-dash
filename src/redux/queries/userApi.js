import { apiSlice } from "./apiSlice";

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (data) => ({
        url: "/api/users/auth",
        method: "POST",
        body: data,
      }),
    }),
    getUsers: builder.query({
      query: ({ pageNumber }) => ({
        url: "/api/users",
        params: {
          pageNumber,
        },
      }),
    }),
    getAddress: builder.query({
      query: (userId) => ({
        url: `/api/users/address/${userId}`,
      }),
    }),
    getUserDetails: builder.query({
      query: (userId) => ({
        url: `/api/users/${userId}`,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `/api/users/logout`,
        method: "POST",
      }),
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/api/users/${userId}`,
        method: "DELETE",
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `/api/users/${data.userId}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useGetAddressQuery,
  useGetUsersQuery,
  useGetUserDetailsQuery,
  useLogoutMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = userApi;
