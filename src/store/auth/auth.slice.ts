import { createSlice } from '@reduxjs/toolkit'
import { STOREAGE_KEYS } from '../../common/constants'
import { UserRoles } from '../../common/constants/types'
import { signIn, signOut, signUp } from './auth.thunk'

interface AuthState {
    isAuthorized: boolean
    token: string
    user: {
        role: UserRoles
        name: string
        email: string
    }
}

const getInitialState = () => {
    const json = localStorage.getItem(STOREAGE_KEYS.AUTH)
    if (json) {
        const userData = JSON.parse(json) as Omit<AuthState, 'isAuthorized'>
        return {
            isAuthorized: true,
            token: userData.token,
            user: {
                name: userData.user.name,
                email: userData.user.email,
                role: userData.user.role,
            },
        }
    }
    return {
        isAuthorized: false,
        token: '',
        user: {
            email: '',
            name: '',
            role: UserRoles.GUEST,
        },
    }
}
const initialState: AuthState = getInitialState()

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(signIn.fulfilled, (state, action) => {
            state.isAuthorized = true
            state.token = action.payload.token
            state.user = {
                email: action.payload.user.email,
                role: action.payload.user.role,
                name: action.payload.user.name,
            }
        })
        builder.addCase(signUp.fulfilled, (state, action) => {
            state.isAuthorized = true
            state.token = action.payload.token
            state.user = {
                email: action.payload.user.email,
                role: action.payload.user.role,
                name: action.payload.user.name,
            }
        })

        builder.addCase(signOut.fulfilled, (state) => {
            state.isAuthorized = false
            state.token = ''
            state.user = {
                email: '',
                role: UserRoles.GUEST,
                name: '',
            }
        })
    },
})

export const authActions = authSlice.actions

export default authSlice
