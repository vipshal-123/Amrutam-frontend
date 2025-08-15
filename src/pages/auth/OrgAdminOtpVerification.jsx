import OtpInput from '@/components/OtpInput'
import { fetchUserData } from '@/redux/slice/authSlice'
import { openToast } from '@/redux/slice/toastSlice'
import { orgAdminSigninVerifyOtp, orgResendOtp } from '@/services/auth/organization.service'
import { getLocal, removeLocal, setLocal } from '@/utils/storage'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const OrgAdminOtpVerification = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleVerifyOtp = async (otp) => {
        console.log('Entered OTP:', otp)
        try {
            const localToken = getLocal('token')

            const payload = {
                otp: otp,
                token: localToken,
            }

            const response = await orgAdminSigninVerifyOtp(payload)
            if (response.success) {
                dispatch(fetchUserData())
                removeLocal('token')
                setLocal('access_token', response?.accessToken || '')
                navigate('/manage-doctors')
                dispatch(openToast({ message: response.message, type: 'success' }))
            } else {
                dispatch(openToast({ message: response.message || 'Something went wrong', type: 'error' }))
            }
        } catch (error) {
            console.error('error: ', error)
            dispatch(openToast({ message: 'Something went wrong', type: 'error' }))
        }
    }

    const handleResendOtp = async () => {
        console.log('Resend OTP triggered')
        try {
            const localToken = getLocal('token')

            const payload = {
                token: localToken,
            }

            const response = await orgResendOtp(payload)

            if (response.success) {
                dispatch(openToast({ message: response.message, type: 'success' }))
            } else {
                dispatch(openToast({ message: response.message || 'Something went wrong', type: 'error' }))
            }
        } catch (error) {
            console.error('error: ', error)
            dispatch(openToast({ message: 'Something went wrong', type: 'error' }))
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-50 px-4'>
            <OtpInput length={6} initialTimer={30} onVerify={handleVerifyOtp} onResend={handleResendOtp} />
        </div>
    )
}

export default OrgAdminOtpVerification
