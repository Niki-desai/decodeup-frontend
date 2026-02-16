import api from './api';

// Product API //
export const productApi = {
    // Get all products //
    getAll: () => api.get('/products'),
};
