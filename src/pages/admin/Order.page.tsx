import { Grid } from '@mui/material'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Column, MealType } from '../../common/constants/types'
import AppTable from '../../components/UI/Table'
import useAppDispatch from '../../hooks/useAppDispatch'
import { getAllOrder } from '../../store/orders/orders.thunk'
import { RootState } from '../../store/store'

const OrderPage = () => {
    const dispatch = useAppDispatch()
    const items = useSelector((state: RootState) => state.order.allOrder)

    useEffect(() => {
        dispatch(getAllOrder())
    }, [dispatch])

    const columns: Column<MealType>[] = [
        {
            header: '№',
            key: '_id',
            index: true,
        },
        {
            header: 'Name',
            key: 'name',
            render: (meal: MealType) => <Grid>{meal.user.name}</Grid>,
        },

        {
            header: 'Meals',
            key: 'meals',
            render: (meal: MealType) => (
                <Grid>
                    {meal.items.map((item) => (
                        <p key={item._id}>{item.title}</p>
                    ))}
                </Grid>
            ),
        },
        {
            header: 'Price',
            key: 'Price',
        },
    ]

    return (
        <div>
            <AppTable
                columns={columns}
                rows={items}
                getUniqueId={(val) => val._id}
            />
        </div>
    )
}

export default OrderPage
