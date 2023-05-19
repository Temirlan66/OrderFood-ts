import { Grid } from '@mui/material'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Basket from '../../components/basket/Basket'
import { Header } from './Header'

const UserLayout = () => {
    const [isBasketVisible, setBasketVisible] = useState(false)

    const showBasketHandler = () => {
        setBasketVisible((prevState) => !prevState)
    }
    return (
        <>
            <Header onShowBasket={showBasketHandler} />
            <Basket open={isBasketVisible} onClose={showBasketHandler} />
            <Grid sx={{ marginTop: '101px' }}>
                <Outlet />
            </Grid>
        </>
    )
}

export default UserLayout
