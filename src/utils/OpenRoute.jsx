import { ROLES } from '@/constants/enums'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const OpenRoute = () => {
    const userAuth = useSelector((state) => state.auth)

    let navigateTo = '/'

    if (userAuth.role === ROLES.ORG_ADMIN) {
        navigateTo = '/manage-doctors'
    }

    if (userAuth?.role === ROLES.USER) {
        navigateTo = '/home'
    }

    if (userAuth?.role === ROLES.DOCTOR) {
        navigateTo = '/doctor'
    }

    if (userAuth?.isAuth) {
        return <Navigate to={navigateTo} replace />
    }

    return <Outlet />
}

export default OpenRoute
