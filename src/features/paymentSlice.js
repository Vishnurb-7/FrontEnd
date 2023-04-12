import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    amount: 0,
    estimateId: ""


}

const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        paymentChange: (state, action) => {
            state.amount = action.payload.amount
            state.estimateId = action.payload.estimateId



        }
    }
})

export default paymentSlice.reducer
export const { paymentChange } = paymentSlice.actions
export const amount = (state) => state.payment.amount
export const estimateId = (state) => state.payment.estimateId