import styled from '@emotion/styled'
import { Button } from '@mui/material'

type Props = {
    title: string
    price: number
    amount: number
    decrementAmount: () => void
    incrementAmount: () => void
}
const BasketItem = ({
    title,
    price,
    amount,
    decrementAmount,
    incrementAmount,
}: Props) => {
    return (
        <Container>
            <Title>{title}</Title>
            <Content>
                <PriceAndAmountContainer>
                    <Price>${price}</Price>
                    <Amount>x{amount}</Amount>
                </PriceAndAmountContainer>
                <CounterContainer>
                    <BtnStyled onClick={decrementAmount}>-</BtnStyled>
                    <BtnStyled onClick={incrementAmount}>+</BtnStyled>
                </CounterContainer>
            </Content>
        </Container>
    )
}
const Container = styled('div')(() => ({
    padding: '24px 0',
    width: '100%',
    borderBottom: '1px solid #d6d6d6',
    '&:last-child': {
        border: 'none',
    },
}))

const BtnStyled = styled(Button)(() => ({
    border: '1px solid #dd8029',
    color: ' #dd8029',
    '&:hover': {
        backgroundColor: '#ab6c31',
        color: 'white',
    },
}))

const Content = styled('div')(() => ({
    width: '590px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
}))
const Title = styled('p')(() => ({
    margin: '0',
    fontWeight: '600',
    fontSize: '20px',
    lineHeight: ' 30px',
    textAlign: 'center',
}))

const Price = styled('p')(() => ({
    margin: '0',
    fontWeight: '600',
    fontSize: '18px',
    lineHeight: '27px',
    color: '#b4461a',
}))

const Amount = styled('span')(() => ({
    border: '1px solid #d6d6d6',
    borderRadius: ' 6px',
    fontWeight: '500',
    fontSize: '16px',
    linHeight: '24px',
    padding: '6px 14px',
    display: 'block',
}))

const PriceAndAmountContainer = styled('div')(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '153px',
}))

const CounterContainer = styled('div')(() => ({
    display: 'flex',
    gap: '14px',
}))

export default BasketItem
