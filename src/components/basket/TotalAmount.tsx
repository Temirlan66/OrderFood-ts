import styled from '@emotion/styled'
import { Button } from '@mui/material'

type Props = {
    price: number
    onClose: () => void
    onOrder: () => void
}
const TotalAmount = ({ price, onClose, onOrder }: Props) => {
    const orderButton =
        price > 0 ? <BtnStyled onClick={onOrder}>Order</BtnStyled> : null

    const fixedPrice = price.toFixed(2)

    return (
        <Container>
            <InfoContainer>
                <Label>Total amount</Label>
                <Price>${fixedPrice}</Price>
            </InfoContainer>

            <ActionButtonsContainer>
                <BtnStyled onClick={onClose}>close</BtnStyled>
                {orderButton}
            </ActionButtonsContainer>
        </Container>
    )
}
const Label = styled('p')(() => ({
    fontWeight: '700',
    fontSize: '20px',
    lineHeight: '30px',
    textAlign: 'center',
    margin: 0,
}))

const BtnStyled = styled(Button)(() => ({
    border: '1px solid #dd8029',
    color: ' #dd8029',
    '&:hover': {
        backgroundColor: '#ab6c31',
        color: 'white',
    },
}))

const Price = styled('p')(() => ({
    fontWeight: '600',
    fontSize: '22px',
    lineHeight: '33px',
    color: '#b4461a',
    margin: 0,
}))

const InfoContainer = styled('div')(() => ({
    display: 'flex',
    justifyContent: 'space-between',
}))

const ActionButtonsContainer = styled('div')(() => ({
    marginTop: '24px',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '1rem',
}))

const Container = styled('div')(() => ({
    margin: '30px 20px',
}))
export default TotalAmount
