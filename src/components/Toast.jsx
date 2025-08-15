import React, { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useSelector, useDispatch } from 'react-redux'
import { closeToast } from '@/redux/slice/toastSlice'

const Toast = () => {
    const { message, type } = useSelector((state) => state.toast)
    const dispatch = useDispatch()

    useEffect(() => {
        if (message) {
            toast[type](message, {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            })
            dispatch(closeToast())
        }
    }, [message, type, dispatch])

    return <ToastContainer />
}

export default Toast
