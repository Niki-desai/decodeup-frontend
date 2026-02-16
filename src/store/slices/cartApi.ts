import { apiSlice } from '../apiSlice';

export const cartApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCart: builder.query<any, void>({
            query: () => '/cart',
            providesTags: ['Cart'],
        }),
        addToCart: builder.mutation<any, { productId: string; quantity: number }>({
            query: (body) => ({
                url: '/cart',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Cart'],
        }),
        removeFromCart: builder.mutation<any, string>({
            query: (id) => ({
                url: `/cart/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Cart'],
        }),
    }),
});

export const {
    useGetCartQuery,
    useAddToCartMutation,
    useRemoveFromCartMutation
} = cartApi;
