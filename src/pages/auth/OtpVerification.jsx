import OtpInput from '@/components/OtpInput'
import { openToast } from '@/redux/slice/toastSlice'
import { resendOtp, verifyOtp } from '@/services/auth/user.service'
import { getLocal, removeLocal } from '@/utils/storage'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const OtpVerification = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [loading1, setLoading1] = useState(false)

    const handleVerifyOtp = async (otp) => {
        console.log('Entered OTP:', otp)
        try {
            setLoading(true)
            const localToken = getLocal('token')

            const payload = {
                otp: otp,
                token: localToken,
            }

            const response = await verifyOtp(payload)
            if (response.success) {
                setLoading(false)
                removeLocal('token')
                navigate('/create-password')
                dispatch(openToast({ message: response.message, type: 'success' }))
            } else {
                setLoading(false)
                dispatch(openToast({ message: response.message || 'Something went wrong', type: 'error' }))
            }
        } catch (error) {
            setLoading(false)
            console.error('error: ', error)
            dispatch(openToast({ message: 'Something went wrong', type: 'error' }))
        }
    }

    const handleResendOtp = async () => {
        console.log('Resend OTP triggered')
        try {
            setLoading1(true)
            const localToken = getLocal('token')

            const payload = {
                token: localToken,
            }

            const response = await resendOtp(payload)
            if (response.success) {
                setLoading1(false)
                dispatch(openToast({ message: response.message, type: 'success' }))
            } else {
                setLoading1(false)
                dispatch(openToast({ message: response.message || 'Something went wrong', type: 'error' }))
            }
        } catch (error) {
            setLoading1(false)
            console.error('error: ', error)
            dispatch(openToast({ message: 'Something went wrong', type: 'error' }))
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-50 px-4'>
            <OtpInput length={6} initialTimer={120} onVerify={handleVerifyOtp} onResend={handleResendOtp} loading={loading} loading1={loading1} />
        </div>
    )
}

export default OtpVerification
