import { createSlice } from '@reduxjs/toolkit'
import { MealType } from '../../common/constants/types'
import { getAllOrder, getOrder } from './orders.thunk'

type OrdersState = {
    order: MealType[]
    allOrder: MealType[]
}

const initialState: OrdersState = {
    allOrder: [],
    order: [],
}
export const orderSlice = createSlice({
    initialState,
    name: 'order',
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllOrder.fulfilled, (state, { payload }) => {
            state.allOrder = payload
        })
        builder.addCase(getOrder.fulfilled, (state, { payload }) => {
            state.order = payload
        })
    },
})
