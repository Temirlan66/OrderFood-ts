import { Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { UserRoles } from '../common/constants/types'
import AdminLayout from '../layout/admin'
import SignIn from '../layout/guest/SignIn'
import SignUp from '../layout/guest/SignUp'
import UserLayout from '../layout/user'
import UserMeals from '../layout/user/Meals'
import UserOrder from '../layout/user/Order'
import Meals from '../pages/admin/Meals.page'
import { RootState } from '../store/store'
import { ProtectedRoute } from './ProtectedRoute'
import OrderPage from '../pages/admin/Order.page'
const AppRoutes = () => {
    const role = useSelector((state: RootState) => state.auth.user.role)

    const isAllowed = (roles: UserRoles[]) => {
        return roles.includes(role)
    }

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <ProtectedRoute
                        isAllowed={isAllowed([UserRoles.GUEST, UserRoles.USER])}
                        fallBackPath="/admin/meals"
                        component={UserLayout}
                    />
                }
            >
                <Route
                    index
                    element={
                        <ProtectedRoute
                            isAllowed={isAllowed([
                                UserRoles.GUEST,
                                UserRoles.USER,
                            ])}
                            fallBackPath="/admin/meals"
                            component={UserMeals}
                        />
                    }
                />
                <Route
                    path="my-order"
                    element={
                        <ProtectedRoute
                            isAllowed={isAllowed([
                                UserRoles.USER,
                                UserRoles.GUEST,
                            ])}
                            fallBackPath="/admin/meals"
                            component={UserOrder}
                        />
                    }
                />
                <Route
                    path="signup"
                    element={
                        <ProtectedRoute
                            isAllowed={isAllowed([
                                UserRoles.GUEST,
                                UserRoles.USER,
                            ])}
                            fallBackPath={
                                role === UserRoles.ADMIN ? '/admin/meals' : '/'
                            }
                            component={SignUp}
                        />
                    }
                />
                <Route
                    path="signin"
                    element={
                        <ProtectedRoute
                            isAllowed={isAllowed([
                                UserRoles.GUEST,
                                UserRoles.USER,
                            ])}
                            fallBackPath={
                                role === UserRoles.ADMIN ? '/admin/meals' : '/'
                            }
                            component={SignIn}
                        />
                    }
                />
            </Route>
            <Route
                path="/admin"
                element={
                    <ProtectedRoute
                        isAllowed={isAllowed([UserRoles.ADMIN])}
                        fallBackPath="/"
                        component={AdminLayout}
                    />
                }
            >
                <Route
                    path="meals"
                    element={
                        <ProtectedRoute
                            isAllowed={isAllowed([UserRoles.ADMIN])}
                            fallBackPath="/"
                            component={Meals}
                        />
                    }
                />
                <Route
                    path="orders"
                    element={
                        <ProtectedRoute
                            isAllowed={isAllowed([UserRoles.ADMIN])}
                            fallBackPath="/"
                            component={OrderPage}
                        />
                    }
                />
            </Route>
            <Route
                path="*"
                element={<Typography>404 Page Not Found</Typography>}
            />
        </Routes>
    )
}

export default AppRoutes
