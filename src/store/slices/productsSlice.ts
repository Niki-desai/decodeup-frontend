import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { productApi } from '../../services/products';

// Product Type //
export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
}

// Products State //
interface ProductsState {
    items: Product[];
    loading: boolean;
    error: string | null;
}

const initialState: ProductsState = {
    items: [],
    loading: false,
    error: null,
};

// Async Thunk - Fetch Products //
export const fetchProducts = createAsyncThunk(
    'products/fetchAll',
    async () => {
        const response = await productApi.getAll();
        return response.data;
    }
);

// Products Slice //
const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch products';
            });
    },
});

export default productsSlice.reducer;
