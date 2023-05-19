import styled from '@emotion/styled'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import useAppDispatch from '../../hooks/useAppDispatch'
import { getOrder } from '../../store/orders/orders.thunk'
import { RootState } from '../../store/store'

const Order = () => {
    const dispatch = useAppDispatch()
    const items = useSelector((state: RootState) => state.order.order)

    useEffect(() => {
        dispatch(getOrder())
    }, [dispatch])

    return (
        <Container>
            {items.map((item) => (
                <div
                    key={item._id}
                    style={{ background: '#fff', color: '#222' }}
                >
                    <h4> {item.createdAt}</h4>
                    {item.items.map((meal) => (
                        <MealContainer key={meal._id}>
                            <p>{meal.title}</p>
                            <p>${meal.price}</p>
                            <span>x{meal.amount}</span>
                        </MealContainer>
                    ))}
                </div>
            ))}
        </Container>
    )
}

export default Order

const Container = styled('div')(() => ({
    display: 'grid',
    gap: '50px',
    color: '#fff',
    width: '50%',
    margin: '190px auto',
}))

const MealContainer = styled('div')(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderBottom: '1px solid #222',
    padding: '20px',
}))
