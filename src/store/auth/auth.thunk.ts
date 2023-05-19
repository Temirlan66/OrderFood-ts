import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError, isAxiosError } from 'axios'
import authService from '../../api/authService'
import { STOREAGE_KEYS } from '../../common/constants'
import { SignUpUser } from '../../common/constants/types'

export const signOut = createAsyncThunk('auth/signOut', async () => {
    return localStorage.removeItem(STOREAGE_KEYS.AUTH)
})
type SignInPayload = {
    email: string
    password: string
}
export const signIn = createAsyncThunk(
    'auth/signIn',
    async (payload: SignInPayload, { rejectWithValue }) => {
        try {
            const { data } = await authService.signInRequest(payload)

            localStorage.setItem(STOREAGE_KEYS.AUTH, JSON.stringify(data.data))

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

export const signUp = createAsyncThunk(
    'auth/signUp',
    async (values: SignUpUser, { rejectWithValue }) => {
        try {
            const { data } = await authService.signUpRequest(values)
            localStorage.setItem(STOREAGE_KEYS.AUTH, JSON.stringify(data.data))
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
