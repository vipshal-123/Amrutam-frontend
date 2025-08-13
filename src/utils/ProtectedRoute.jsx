import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import isEmpty from 'is-empty'

const ProtectedRoute = ({ allowedRoles }) => {
    const location = useLocation()
    const userAuth = useSelector((state) => state?.auth)

    if (userAuth?.loading) {
        return <div>Loading...</div>
    }

    if (isEmpty(userAuth) || !userAuth?.isAuth) {
        return <Navigate to='/' state={{ from: location.pathname }} replace />
    }

    if (!allowedRoles.includes(userAuth.role)) {
        return <Navigate to='/' replace />
    }

    return <Outlet />
}

export default ProtectedRoute
