import React from 'react'
import { Button, ButtonProps } from '@mui/material'
import { styled } from '@mui/material/styles'
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore'

type Props = ButtonProps & {
    count: number
}

const BasketButton = ({ count, ...restProps }: Props) => {
    return (
        <StyledButton {...restProps}>
            <LocalGroceryStoreIcon />
            <StyledTitle>Your Cart</StyledTitle>
            <StyledCount id="counter">{count}</StyledCount>
        </StyledButton>
    )
}
export default BasketButton
const StyledButton = styled(Button)(() => ({
    backgroundColor: '#c87b34',
    borderRadius: '30px',
    padding: '12px 32px',
    fontWeight: '600',
    color: 'white',
    lineHeight: '24px',
    fontSize: '16px',
    border: 'none',
    display: 'flex',
    alignItems: 'center',

    '&:hover': {
        backgroundColor: '#e9760a',
    },

    '&.bump': {
        animation: 'bump 300ms ease-out',
    },

    ' @keyframes bump': {
        ' 0%': {
            transform: 'scale(1)',
        },
        '10%': {
            transform: 'scale(0.9)',
        },
        '30%': {
            transform: 'scale(1.1)',
        },
        '50%': {
            transform: 'scale(1.15)',
        },
        '100%': {
            transform: 'scale(1)',
        },
    },
}))

const StyledTitle = styled('span')(() => ({
    margin: '',
}))

const StyledCount = styled('span')(() => ({
    backgroundColor: '#8a2b06',
    borderRadius: '30px',
    fontWeight: '700',
    color: 'white',
    fontSize: '20px',
    lineHeight: '27px',
    padding: '4px 20px',
}))
