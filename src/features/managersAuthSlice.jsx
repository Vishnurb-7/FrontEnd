import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    managers: "",
    accessToken: "",
    refreshToken: "",
    managerId: ""

}

const managersAuthSlice = createSlice({
    name: 'usreAuth',
    initialState,
    reducers: {
        managersAuthChange: (state, action) => {
            state.managers = action.payload.managers
            state.managerId = action.payload.managerId
            state.accessToken = action.payload.accessToken
            state.refreshToken = action.payload.refreshToken


        }
    }
})

export default managersAuthSlice.reducer
export const { managersAuthChange } = managersAuthSlice.actions
export const managersData = (state) => state.managersLogin.managers
export const managersId = (state) => state.managersLogin.managerId
export const managersRefreshToken = (state) => state.managersLogin.refreshToken