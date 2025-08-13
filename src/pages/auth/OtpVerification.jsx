import OtpInput from '@/components/OtpInput'
import { resendOtp, verifyOtp } from '@/services/auth/user.service'
import { getLocal, removeLocal } from '@/utils/storage'
import { useNavigate } from 'react-router-dom'

const OtpVerification = () => {
    const navigate = useNavigate()

    const handleVerifyOtp = async (otp) => {
        console.log('Entered OTP:', otp)
        try {
            const localToken = getLocal('token')

            const payload = {
                otp: otp,
                token: localToken,
            }

            const response = await verifyOtp(payload)
            if (response.success) {
                removeLocal('token')
                navigate('/create-password')
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

            const response = await resendOtp(payload)
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

export default OtpVerification
