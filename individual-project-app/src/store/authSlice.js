import { createSlice } from "@reduxjs/toolkit";
import {getState, saveState} from "../scripts/storage"

const persistedAuth = getState('f1Auth', { isAdmin: false, error: null})

const authSlice = createSlice({
    name: 'auth',
    initialState: persistedAuth,
    reducers: {
        login: (state, action) => {
            const { username, password } = action.payload
            if(username==='admin' && password==='admin123') {
                state.isAdmin = true
                state.error = null
                saveState('f1Auth', {isAdmin:true})
            } else {
                state.error('Invalid credentials')
            }
        },
        logout: (state) => {
            state.isAdmin = false
            state.error = null
            saveState('f1Auth', {isAdmin:false})
        }
    }
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer