import styled from '@emotion/styled'
import { Button, TextField } from '@mui/material'
import { ChangeEvent, FormEvent, useState } from 'react'
import useAppDispatch from '../../hooks/useAppDispatch'
import { addToBasket } from '../../store/basket/basket.thunk'

type Props = {
    id: string
    title: string
    price: number
}
const MealItemForm = ({ id, title, price }: Props) => {
    const dispatch = useAppDispatch()
    const [amount, setAmount] = useState(1)

    const amountChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setAmount(+e.target.value)
    }

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const basketItem = {
            id,
            price,
            title,
            amount,
        }

        dispatch(addToBasket(basketItem))
    }
    return (
        <form onSubmit={submitHandler}>
            <Container>
                <StyledLabel htmlFor={id}>Amount</StyledLabel>
                <StyledText
                    id={id}
                    type="number"
                    size="small"
                    value={amount}
                    onChange={amountChangeHandler}
                />
            </Container>
            <BtnStyled variant="contained" type="submit">
                Add
            </BtnStyled>
        </form>
    )
}
const StyledText = styled(TextField)(() => ({
    width: '3.75rem',
    height: '2rem',
    outline: 'none',
    borderRadius: '6px',
    fontWeight: '500',
    fontSize: '16px',
    color: '#e0e0e0',
}))

const BtnStyled = styled(Button)(() => ({
    background: '#dd8029',

    '&:hover': {
        backgroundColor: '#e0e0e0',
        color: '#dd8029',
    },
}))

const Container = styled('div')(() => ({
    marginBottom: '15px',
}))

const StyledLabel = styled('label')(() => ({
    fontWeight: '600',
    fontSize: '1.125rem',
    lineHeight: '1.6875rem',
    margin: '0 1.25rem 0 0',
}))
export default MealItemForm
