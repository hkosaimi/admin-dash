import { apiSlice } from "./apiSlice";

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: "/api/products",
      }),
    }),
    getProductById: builder.query({
      query: (productId) => ({
        url: `/api/products/product/${productId}`,
      }),
    }),
    getProductsByCategory: builder.query({
      query: (category) => ({
        url: `/api/products/category/${category}`,
      }),
    }),
    updateStock: builder.mutation({
      query: (orderItems) => ({
        url: "/api/products/update-stock",
        method: "POST",
        body: orderItems,
      }),
    }),
    getDeliveryStatus: builder.query({
      query: () => ({
        url: `/api/products/delivery`,
      }),
    }),
    updateDiscount: builder.mutation({
      query: (data) => ({
        url: `/api/products/discount`,
        method: "PUT",
        body: data,
      }),
    }),
    getDiscountStatus: builder.query({
      query: () => ({
        url: `/api/products/discount`,
      }),
    }),
    createProduct: builder.mutation({
      query: (data) => ({
        url: "/api/products",
        method: "POST",
        body: data,
      }),
    }),
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: "/api/upload",
        method: "POST",
        body: data,
      }),
    }),
    createProduct: builder.mutation({
      query: (data) => ({
        url: `/api/products`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `/api/products/${productId}`,
        method: "DELETE",
      }),
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `/api/products/${data._id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),
    getLatestProducts: builder.query({
      query: () => ({
        url: "/api/products/latest",
      }),
    }),
    createCategory: builder.mutation({
      query: (category) => ({
        url: "/api/products/create-category",
        method: "POST",
        body: category,
      }),
    }),
    getCategories: builder.query({
      query: () => ({
        url: "/api/products/category",
      }),
    }),
    deleteCategory: builder.mutation({
      query: (category) => ({
        url: "/api/products/category",
        method: "DELETE",
        body: category,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetProductsByCategoryQuery,
  useUpdateStockMutation,
  useGetDeliveryStatusQuery,
  useUpdateDiscountMutation,
  useGetDiscountStatusQuery,
  useUploadProductImageMutation,
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useGetLatestProductsQuery,
  useCreateCategoryMutation,
  useGetCategoriesQuery,
  useDeleteCategoryMutation,
} = productApi;
