import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    accessToken: "",
    refreshToken: "",
    adminName: "",
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authChange: (state, action) => {
            state.accessToken = action.payload.accessToken
            state.refreshToken = action.payload.refreshToken
            state.adminName = action.payload.adminName
        }
    }
})

export default authSlice.reducer
export const { authChange } = authSlice.actions
export const currentToken = (state) => state.auth.accessToken
export const refreshToken = (state) => state.auth.refreshToken