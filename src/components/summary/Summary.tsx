import styled from '@emotion/styled'
import { memo } from 'react'
import SummaryInfoCard from './SummaryInfoCard'
import BackgroundImg from '../../assets/images /1.jpeg'
const Summary = () => {
    return (
        <Container>
            <StyledImg src={BackgroundImg} />
            <SummaryInfoCard />
        </Container>
    )
}

export default memo(Summary)

const Container = styled('div')(() => ({
    margin: 0,
    height: '27.5625rem',
}))
const StyledImg = styled('img')(() => ({
    height: '100%',
    width: '100%',
}))
