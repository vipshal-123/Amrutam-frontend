import OtpInput from '@/components/OtpInput'
import { openToast } from '@/redux/slice/toastSlice'
import { createOrgVerifyOtp, orgResendOtp } from '@/services/auth/organization.service'
import { getLocal, removeLocal, setLocal } from '@/utils/storage'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const OrgOtpVerify = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)

    const handleVerifyOtp = async (otp) => {
        console.log('Entered OTP:', otp)
        try {
            setLoading(true)
            const localData = JSON.parse(getLocal('orgData')) || {}
            const localToken = getLocal('token')

            const payload = {
                ...localData,
                token: localToken,
                otp: otp,
            }

            const response = await createOrgVerifyOtp(payload)

            if (response.success) {
                setLoading(false)
                removeLocal('orgData')
                removeLocal('token')
                setLocal('access_token', response?.accessToken || '')
                navigate('/manage-doctors')
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
        setLoading(true)
        console.log('Resend OTP triggered')
        try {
            const localToken = getLocal('token')

            const payload = {
                token: localToken,
            }

            const response = await orgResendOtp(payload)

            if (response.success) {
                setLoading(false)
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

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-50 px-4'>
            <OtpInput length={6} initialTimer={30} onVerify={handleVerifyOtp} onResend={handleResendOtp} loading={loading} />
        </div>
    )
}

export default OrgOtpVerify
