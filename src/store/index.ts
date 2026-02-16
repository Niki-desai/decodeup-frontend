import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import productsReducer from './slices/productsSlice';
import cartReducer from './slices/cartSlice';
import authReducer from './slices/authSlice';
import { apiSlice } from './apiSlice';

// Combine Reducers //
const rootReducer = combineReducers({
    products: productsReducer,
    cart: cartReducer,
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
});

// Persist Config for Cart and Auth //
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart', 'auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Redux Store //
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(apiSlice.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
