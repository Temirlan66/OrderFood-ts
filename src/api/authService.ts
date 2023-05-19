import { SignInUser, SignUpUser, UserRoles } from '../common/constants/types'
import { mainApi } from './intances'

type SignInResponse = {
    data: {
        token: string
        user: {
            role: UserRoles
            email: string
            name: string
        }
    }
}
const signInRequest = (data: SignInUser) => {
    return mainApi.post<SignInResponse>('auth/login', data)
}

const signUpRequest = (data: SignUpUser) => {
    return mainApi.post<SignInResponse>('auth/register', data)
}

export default { signInRequest, signUpRequest }
