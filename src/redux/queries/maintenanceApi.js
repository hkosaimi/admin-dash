import { apiSlice } from "./apiSlice";

export const maintenanceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateStoreStatus: builder.mutation({
      query: (data) => ({
        url: "/api/update-store-status",
        method: "PUT",
        body: data,
      }),
    }),
    getStoreStatus: builder.query({
      query: () => ({
        url: "/api/update-store-status",
      }),
    }),
  }),
});

export const { useUpdateStoreStatusMutation, useGetStoreStatusQuery } = maintenanceApi;
