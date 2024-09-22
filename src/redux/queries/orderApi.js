import { apiSlice } from "./apiSlice";

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => ({
        url: "/api/orders",
      }),
      keepUnusedDataFor: 5,
    }),
    getOrder: builder.query({
      query: (orderId) => ({
        url: `/api/orders/${orderId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    updateDeliver: builder.mutation({
      query: (data) => ({
        url: "/api/products/delivery",
        method: "PUT",
        body: data,
      }),
    }),
    getUserOrders: builder.query({
      query: (userId) => ({
        url: `/api/orders/user-orders/${userId}`,
      }),
    }),
    updateOrderToDeliverd: builder.mutation({
      query: (orderId) => ({
        url: `/api/orders/${orderId}/deliver`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetUserOrdersQuery,
  useGetOrderQuery,
  useUpdateDeliverMutation,
  useUpdateOrderToDeliverdMutation,
} = orderApi;
