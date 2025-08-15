import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slice/authSlice'
import toastReducer from './slice/toastSlice'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'

const persistConfig = { key: 'root', storage }

const store = configureStore({
    reducer: {
        auth: persistReducer(persistConfig, authReducer),
        toast: toastReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export const persistor = persistStore(store)
export default store
