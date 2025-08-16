import React, { useState, useEffect } from 'react'

const OtpInput = ({ length = 6, initialTimer = 120, onVerify, onResend, loading, loading1 }) => {
    const [otp, setOtp] = useState(Array(length).fill(''))
    const [resendTimer, setResendTimer] = useState(initialTimer)

    const handleChange = (value, index) => {
        if (/^\d*$/.test(value)) {
            const newOtp = [...otp]
            newOtp[index] = value
            setOtp(newOtp)

            if (value && index < length - 1) {
                document.getElementById(`otp-${index + 1}`).focus()
            }
        }
    }

    const handleVerify = () => {
        const otpValue = otp.join('')
        if (otpValue.length === length) {
            onVerify?.(otpValue)
        }
    }

    const handleResend = () => {
        setResendTimer(initialTimer)
        onResend?.()
    }

    useEffect(() => {
        if (resendTimer > 0) {
            const interval = setInterval(() => {
                setResendTimer((prev) => prev - 1)
            }, 1000)
            return () => clearInterval(interval)
        }
    }, [resendTimer])

    return (
        <div className='bg-white shadow rounded-lg p-6 sm:p-8 max-w-md w-full'>
            <h1 className='text-2xl font-bold text-center text-emerald-700 mb-2'>OTP Verification</h1>
            <p className='text-center text-gray-600 mb-6'>Please enter the {length}-digit code sent to your email.</p>

            <div className='flex justify-center gap-2 mb-6'>
                {otp.map((digit, idx) => (
                    <input
                        key={idx}
                        id={`otp-${idx}`}
                        type='text'
                        maxLength='1'
                        value={digit}
                        onChange={(e) => handleChange(e.target.value, idx)}
                        className='w-10 h-12 text-center border rounded text-lg focus:outline-none focus:ring-2 focus:ring-emerald-500'
                    />
                ))}
            </div>

            <button onClick={handleVerify} className='w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded transition'>
                {loading ? 'Loading...' : 'Verify OTP'}
            </button>

            <div className='text-center mt-4 text-sm'>
                {resendTimer > 0 ? (
                    <span className='text-gray-500'>Resend OTP in {resendTimer}s</span>
                ) : (
                    <button type='button' onClick={handleResend} className='text-emerald-600 hover:underline'>
                        {loading1 ? 'Loading...' : 'Resend OTP'}
                    </button>
                )}
            </div>
        </div>
    )
}

export default OtpInput
