import { AppBar, Button, IconButton, Toolbar } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import { signOut } from '../../store/auth/auth.thunk'
import useAppDispatch from '../../hooks/useAppDispatch'

const menus = [
    {
        path: 'meals',
        title: 'Meals',
    },
    {
        path: 'orders',
        title: 'Orders',
    },
]
const AdminHeader = () => {
    const dispatch = useAppDispatch()

    const signOutNavigateHandler = () => {
        dispatch(signOut())
    }
    return (
        <AppBar>
            <Container>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    Menu
                </IconButton>
                <MenuContainer>
                    {menus.map((item) => (
                        <StyledNavLink key={item.path} to={item.path}>
                            {item.title}
                        </StyledNavLink>
                    ))}
                    <StyledButton
                        onClick={signOutNavigateHandler}
                        color="inherit"
                    >
                        Sign Out
                    </StyledButton>
                </MenuContainer>
            </Container>
        </AppBar>
    )
}

export default AdminHeader

const StyledButton = styled(Button)`
    font-weight: bold;
    color: #e7e7e7;
`
const StyledNavLink = styled(NavLink)`
    color: white;
    font-size: 20px;
    text-decoration: none;
`
const Container = styled(Toolbar)`
    display: flex;
    width: 1000px;
    align-items: center;
    justify-content: space-between;
    align-items: center;
    padding: 20px 50px;
`
const MenuContainer = styled('div')(() => ({
    width: '300px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
}))
