import api from './api';

// Cart API //
export const cartApi = {
    // Get cart //
    get: () => api.get('/cart'),

    // Add to cart //
    add: (productId: string, quantity: number = 1) =>
        api.post('/cart', { productId, quantity }),

    // Remove from cart //
    remove: (id: string) => api.delete(`/cart/${id}`),
};
