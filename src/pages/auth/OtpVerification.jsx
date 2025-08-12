import OtpInput from '@/components/OtpInput'
import React from 'react'

const OtpVerification = () => {
    const handleVerifyOtp = (otp) => {
        console.log('Entered OTP:', otp)
        // Call API here
    }

    const handleResendOtp = () => {
        console.log('Resend OTP triggered')
        // Call API here
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-50 px-4'>
            <OtpInput length={6} initialTimer={30} onVerify={handleVerifyOtp} onResend={handleResendOtp} />
        </div>
    )
}

export default OtpVerification
