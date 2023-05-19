import { Button, Grid, TextField, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { signIn } from '../../store/auth/auth.thunk'
import useAppDispatch from '../../hooks/useAppDispatch'

const schema = z.object({
    email: z.string().email('Email жаз'),
    password: z.string().min(6, 'Ай кокуй'),
})

type FormSchema = (typeof schema)['_output']

const SignIn = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [logInerror, setLogInError] = useState('')

    const { getValues, handleSubmit, register, formState } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onBlur',
        resolver: zodResolver(schema),
    })

    const submitHandler = (values: FormSchema) => {
        dispatch(signIn(values))
            .unwrap()
            .then(() => {
                navigate('/')
            })
            .catch((e: string) => setLogInError(e))
    }
    return (
        <MainGrid>
            <GridContainer>
                <form onSubmit={handleSubmit(submitHandler)}>
                    <FormGrid>
                        <TextField
                            error={!!formState.errors.email}
                            label="Email"
                            {...register('email')}
                        />
                        {formState.errors.email && (
                            <Error>{!!formState.errors.email}</Error>
                        )}
                        <TextField
                            error={!!formState.errors.password}
                            {...register('password')}
                            label="Password"
                        />
                        {/* <Typography
                            textAlign="center"
                            sx={{ color: (theme) => theme.palette.error.main }}
                        >
                            {error}
                        </Typography> */}

                        <Button type="submit">Sign In</Button>
                        <Link to="/signup">{`Don't have account`}</Link>
                    </FormGrid>
                </form>
            </GridContainer>
        </MainGrid>
    )
}

export default SignIn

const MainGrid = styled(Grid)(() => ({
    display: 'flex',
    justifyContent: 'center',
    marginTop: '200px',
}))

const GridContainer = styled(Grid)(() => ({
    background: '#938585',
    width: '500px',
    padding: '20px',

}))

const FormGrid = styled(Grid)(() => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
}))

const Error = styled(Typography)(() => ({
    color: 'red',
}))
