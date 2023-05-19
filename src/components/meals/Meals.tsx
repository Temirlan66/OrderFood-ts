import styled from '@emotion/styled'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import useAppDispatch from '../../hooks/useAppDispatch'
import { getAllMeals } from '../../store/meals/meals.thunk'
import { RootState } from '../../store/store'
import MealItem from './MealItem'

const Meals = () => {
    const dispatch = useAppDispatch()
    const items = useSelector((state: RootState) => state.meals.items)

    useEffect(() => {
        dispatch(getAllMeals())
    }, [dispatch])
    return (
        <Card>
            <StyledUl>
                {items.map((item) => (
                    <MealItem key={item._id} item={item} />
                ))}
            </StyledUl>
        </Card>
    )
}

const Card = styled('div')(() => ({
    background: '#d08c4e',
    borderRadius: ' 1rem',
    width: '64.9375rem',
    margin: ' 160px auto',
}))

const StyledUl = styled('ul')(() => ({
    listStyle: ' none',
    color: 'white',
    padding: '20px 40px',
}))
export default Meals
