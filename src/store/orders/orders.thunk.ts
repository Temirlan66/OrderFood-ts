import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError, isAxiosError } from 'axios'
import ordersService from '../../api/ordersService'
import { getBasket } from '../basket/basket.thunk'

export const getAllOrder = createAsyncThunk(
    'order/getAllOrder',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await ordersService.getAllOrder()
            return data.data
        } catch (e) {
            if (isAxiosError(e)) {
                const error = e as AxiosError<{
                    status: number
                    message: string
                }>
                return rejectWithValue(error.response?.data.message)
            }
            return rejectWithValue('Something went wrong')
        }
    }
)

export const getOrder = createAsyncThunk(
    'order/getOrder',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await ordersService.getOrder()
            return data.data
        } catch (e) {
            if (isAxiosError(e)) {
                const error = e as AxiosError<{
                    status: number
                    message: string
                }>
                return rejectWithValue(error.response?.data.message)
            }
            return rejectWithValue('Something went wrong')
        }
    }
)

export const postOrder = createAsyncThunk(
    'order/postOrder',
    async (
        totalPrice: { totalPrice: number },
        { rejectWithValue, dispatch }
    ) => {
        try {
            await ordersService.postOrder(totalPrice)
            dispatch(getBasket())
        } catch (e) {
            if (isAxiosError(e)) {
                const error = e as AxiosError<{
                    status: number
                    message: string
                }>
                return rejectWithValue(error.response?.data.message)
            }
            return rejectWithValue('Something went wrong')
        }
    }
)
