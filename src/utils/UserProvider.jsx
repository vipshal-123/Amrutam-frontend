import { fetchUserData } from '@/redux/slice/authSlice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const UserProvider = ({ children }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchUserData())
    }, [dispatch])

    return <>{children}</>
}

export default UserProvider
