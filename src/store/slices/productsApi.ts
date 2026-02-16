import { apiSlice } from '../apiSlice';

export const productsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query<any[], void>({
            query: () => '/products',
            providesTags: ['Product'],
        }),
    }),
});

export const { useGetProductsQuery } = productsApi;
