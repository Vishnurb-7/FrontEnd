import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user: "",
    id: "",
    accessToken: "",
    refreshToken: "",

}

const userAuthSlice = createSlice({
    name: 'userAuth',
    initialState,
    reducers: {
        userAuthChange: (state, action) => {
          
            state.user = action.payload.user
            state.id = action.payload.id
            state.accessToken = action.payload.accessToken
            state.refreshToken = action.payload.refreshToken


        }
    }
})

export default userAuthSlice.reducer
export const { userAuthChange } = userAuthSlice.actions
export const userData2 = (state) => state.userLogin.user
export const currentUserId = (state) => state.userLogin.id
export const refreshToken2 = (state) => state.userLogin.refreshToken