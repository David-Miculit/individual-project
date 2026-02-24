import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice'
import f1DataReducer from './f1DataSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        f1Data: f1DataReducer,
    }
})