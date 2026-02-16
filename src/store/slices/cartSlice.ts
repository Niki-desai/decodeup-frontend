import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { cartApi } from '../../services/cart';

// Cart Types //
interface CartItem {
    id: string;
    product: {
        id: string;
        name: string;
        price: number;
        image: string;
    };
    quantity: number;
}

interface CartState {
    items: CartItem[];
    totalItems: number;
    totalPrice: number;
    loading: boolean;
    error: string | null;
}

const initialState: CartState = {
    items: [],
    totalItems: 0,
    totalPrice: 0,
    loading: false,
    error: null,
};

// Async Thunk - Fetch Cart //
export const fetchCart = createAsyncThunk('cart/fetch', async () => {
    const response = await cartApi.get();
    return response.data;
});

// Async Thunk - Add to Cart //
export const addToCart = createAsyncThunk(
    'cart/add',
    async ({ productId, quantity }: { productId: string; quantity?: number }) => {
        await cartApi.add(productId, quantity);
        const response = await cartApi.get();
        return response.data;
    }
);

// Async Thunk - Remove from Cart //
export const removeFromCart = createAsyncThunk(
    'cart/remove',
    async (id: string) => {
        await cartApi.remove(id);
        const response = await cartApi.get();
        return response.data;
    }
);

// Cart Slice //
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Cart //
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.items;
                state.totalItems = action.payload.totalItems;
                state.totalPrice = action.payload.totalPrice;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch cart';
            })
            // Add to Cart //
            .addCase(addToCart.fulfilled, (state, action) => {
                state.items = action.payload.items;
                state.totalItems = action.payload.totalItems;
                state.totalPrice = action.payload.totalPrice;
            })
            // Remove from Cart //
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.items = action.payload.items;
                state.totalItems = action.payload.totalItems;
                state.totalPrice = action.payload.totalPrice;
            });
    },
});

export default cartSlice.reducer;
