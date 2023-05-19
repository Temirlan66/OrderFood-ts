import { Button, Grid, styled } from '@mui/material'

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import BasketButton from '../../components/user/BasketButton'
import useAppDispatch from '../../hooks/useAppDispatch'
import { signOut } from '../../store/auth/auth.thunk'
import { RootState } from '../../store/store'
type Props = {
    onShowBasket: () => void
}
export const Header = ({ onShowBasket }: Props) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const isAuthorized = useSelector(
        (state: RootState) => state.auth.isAuthorized
    )
    const items = useSelector((state: RootState) => state.basket.items)
    const [animationClass, setAnimationClass] = useState<string>('')

    const signOutHandler = () => {
        dispatch(signOut())
    }

    const signInHandler = () => {
        navigate('/signin')
    }
    const calculateTotalAmount = () => {
        const sum = items.reduce((s, item) => {
            return s + item.amount
        }, 0)
        return sum
    }

    useEffect(() => {
        setAnimationClass('bump')

        const id = setTimeout(() => {
            setAnimationClass('')
        }, 300)

        return () => {
            clearTimeout(id)
        }
    }, [items])

    const goToOrderPageHandler = () => {
        return navigate('my-order')
    }
    return (
        <Container>
            <Link style={{ textDecoration: 'none' }} to="/">
                <Logo>ReactMeals</Logo>
            </Link>

            <Grid sx={{ display: 'flex' }}>
                <BasketButton
                    onClick={onShowBasket}
                    className={animationClass}
                    count={calculateTotalAmount()}
                />

                <BtnStyled onClick={goToOrderPageHandler} color="error">
                    My Orders
                </BtnStyled>

                {isAuthorized ? (
                    <BtnStyled onClick={signOutHandler}>Sign Out</BtnStyled>
                ) : (
                    <BtnStyled onClick={signInHandler}>Sign In</BtnStyled>
                )}
            </Grid>
        </Container>
    )
}
const Container = styled('header')(() => ({
    display: 'flex',
    flexDirection: 'row',
    position: 'fixed',
    zIndex: '1',
    top: '0',
    height: '101px',
    backgroundColor: '#d08c4e',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '1200px',
    paddingLeft: '120px',
    paddingRight: '120px',
}))

const BtnStyled = styled(Button)(() => ({
    color: '#ffffff',
    marginLeft: '10px',
    borderRadius: '10px',
}))
const Logo = styled('p')(() => ({
    fontWeight: '600',
    fontSize: ' 38px',
    lineHeight: '57px',
    color: '#ffffff',
    margin: '0',
}))
