import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError, isAxiosError } from 'axios'
import { FormSchema } from '../../admin/pages/meals/MealModal'
import mealsService from '../../api/mealsService'
import { udpateData } from '../../common/constants/types'

export const getAllMeals = createAsyncThunk(
    'meals/getAll',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await mealsService.getAllMeals()
            return data.data
        } catch (e) {
            if (isAxiosError(e)) {
                const error = e as AxiosError<{
                    status: number
                    message: string
                }>
                return rejectWithValue(error.response?.data.message)
            }

            return rejectWithValue('Some thing went wrogn!')
        }
    }
)

export const AddMeals = createAsyncThunk(
    'meals/AddMeals',
    async (data: FormSchema, { rejectWithValue }) => {
        try {
            const responce = await mealsService.postAllMeals(data)
            return responce.data
        } catch (e) {
            if (isAxiosError(e)) {
                const error = e as AxiosError<{
                    status: number
                    message: string
                }>
                return rejectWithValue(error.response?.data.message)
            }

            return rejectWithValue('Some thing went wrogn!')
        }
    }
)

export const updateMeals = createAsyncThunk(
    'meals/udpateMeals',
    async ({ values, id }: udpateData, { rejectWithValue }) => {
        try {
            const { data } = await mealsService.udpateMeals(id, values)
            return data.data
        } catch (e) {
            if (isAxiosError(e)) {
                const error = e as AxiosError<{
                    status: number
                    message: string
                }>
                return rejectWithValue(error.response?.data.message)
            }

            return rejectWithValue('Some thing went wrogn!')
        }
    }
)

export const deleteMeals = createAsyncThunk(
    'meal/deleteMeal',
    async (id: string, { dispatch, rejectWithValue }) => {
        try {
            await mealsService.deleteMeals(id)
            return dispatch(getAllMeals())
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
