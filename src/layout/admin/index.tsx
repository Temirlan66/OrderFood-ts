import { Grid } from '@mui/material'
import { Outlet } from 'react-router-dom'
import AdminHeader from './Header'
const AdminLayout = () => {
    return (
        <>
            <AdminHeader />
            <Grid sx={{ marginTop: '120px' }}>
                <Outlet />
            </Grid>
        </>
    )
}

export default AdminLayout
