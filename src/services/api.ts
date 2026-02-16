import axios from 'axios';
import { store } from '../store';
import { logout } from '../store/slices/authSlice';

// API Client //
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor //
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor //
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
            // Auto logout on unauthorized or forbidden errors //
            store.dispatch(logout());
        }
        const message = error.response?.data?.message || 'Something went wrong';
        console.error('API Error:', message);
        return Promise.reject(error);
    }
);

export default api;
