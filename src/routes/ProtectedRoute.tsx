import React, { FunctionComponent } from 'react'
import { Navigate } from 'react-router-dom'
type Props = {
    component: FunctionComponent
    fallBackPath: string
    isAllowed: boolean
}
export const ProtectedRoute = ({
    component: Component,
    fallBackPath,
    isAllowed,
}: Props) => {
    if (!isAllowed) {
        return <Navigate to={fallBackPath} />
    }

    return <Component />
}
