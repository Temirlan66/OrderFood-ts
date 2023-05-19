import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Grid, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { UserRoles } from '../../common/constants/types'
import useAppDispatch from '../../hooks/useAppDispatch'
import * as z from 'zod'
import { signUp } from '../../store/auth/auth.thunk'
import styled from '@emotion/styled'

const SignUp = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [error, setError] = useState('')

    const schema = z
        .object({
            name: z.string().nonempty(),
            email: z.string().email(),
            password: z.string().min(4),
            confirm: z.string(),
            role: z.string(),
        })
        .refine((data) => data.password === data.confirm, {
            message: "Passwords don't match",
            path: ['confirm'],
        })

    type FormSchema = (typeof schema)['_output']
    const { register, handleSubmit, formState } = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirm: '',
            role: UserRoles.ADMIN,
        },
        mode: 'onBlur',
        resolver: zodResolver(schema),
    })

    const submitHandler = (values: FormSchema) => {
        dispatch(signUp(values))
            .unwrap()
            .then(() => navigate('/'))
            .catch((e) => setError(e.response.data.message))
    }
    return (
        <MainGrid>
            <GridContainer>
                <form onSubmit={handleSubmit(submitHandler)}>
                    <FormGrid>
                        <TextField
                            error={!!formState.errors.name}
                            {...register('name')}
                            label="Name"
                        />
                        {formState.errors.name && (
                            <Error>{formState.errors.name.message}</Error>
                        )}
                        <TextField
                            error={!!formState.errors.email}
                            {...register('email')}
                            label="Email"
                        />
                        {formState.errors.name && (
                            <Error>{formState.errors.email?.message}</Error>
                        )}
                        <TextField
                            error={!!formState.errors.password}
                            {...register('password')}
                            label="Password"
                        />
                        {formState.errors.email && (
                            <Error>{formState.errors.password?.message}</Error>
                        )}
                        <TextField
                            error={!!formState.errors.confirm}
                            {...register('confirm')}
                            label="Confirm Password"
                        />
                        {formState.errors.email && (
                            <Error>{formState.errors.confirm?.message}</Error>
                        )}
                        <Button type="submit">Sign up</Button>
                        <Link to="/signin">Have an account</Link>
                    </FormGrid>
                </form>
            </GridContainer>
        </MainGrid>
    )
}

const MainGrid = styled(Grid)(() => ({
    display: 'flex',
    justifyContent: 'center',
    marginTop: '200px',
}))

const GridContainer = styled(Grid)(() => ({
    width: '500px',
    padding: '20px',
}))

const FormGrid = styled(Grid)(() => ({
    display: 'grid',
    gap: '20px',
}))

const Error = styled(Typography)(() => ({
    color: '#f00',
}))
export default SignUp
