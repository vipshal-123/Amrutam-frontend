import PasswordForm from '@/components/PasswordForm'
import { fetchUserData } from '@/redux/slice/authSlice'
import { openToast } from '@/redux/slice/toastSlice'
import { createPassword } from '@/services/auth/user.service'
import { setLocal } from '@/utils/storage'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CreatePassword = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handlePasswordSubmit = async (values) => {
        console.log('Password data:', values)
        try {
            const payload = {
                password: values?.password,
            }

            const response = await createPassword(payload)

            if (response.success) {
                setLocal('access_token', response.accessToken)
                dispatch(fetchUserData())
                navigate('/home')
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
        <div className='flex items-center justify-center min-h-screen bg-gray-50 p-4'>
            <PasswordForm title='Create Password' onSubmit={handlePasswordSubmit} />
        </div>
    )
}

export default CreatePassword
