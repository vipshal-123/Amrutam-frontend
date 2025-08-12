import OtpInput from '@/components/OtpInput'
import { createOrgVerifyOtp, orgResendOtp } from '@/services/auth/organization.service'
import { getLocal, removeLocal, setLocal } from '@/utils/storage'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const OrgOtpVerify = () => {
    const navigate = useNavigate()
    const handleVerifyOtp = async (otp) => {
        console.log('Entered OTP:', otp)
        try {
            const localData = JSON.parse(getLocal('orgData'))
            const localToken = getLocal('token')

            const payload = {
                ...localData,
                token: localToken,
                otp: otp,
            }

            const response = await createOrgVerifyOtp(payload)

            if (response.success) {
                removeLocal('orgData')
                removeLocal('token')
                setLocal('access_token', response?.accessToken || '')
                navigate('/home')
            }
        } catch (error) {
            console.error('error: ', error)
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
                console.log(response.message)
            }
        } catch (error) {
            console.error('error: ', error)
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-50 px-4'>
            <OtpInput length={6} initialTimer={30} onVerify={handleVerifyOtp} onResend={handleResendOtp} />
        </div>
    )
}

export default OrgOtpVerify
