import PasswordForm from '@/components/PasswordForm'
import { createPassword } from '@/services/auth/user.service'
import { useNavigate } from 'react-router-dom'

const CreatePassword = () => {
    const navigate = useNavigate()

    const handlePasswordSubmit = async (values) => {
        console.log('Password data:', values)
        try {
            const payload = {
                password: values?.password,
            }

            const response = await createPassword(payload)

            if (response.success) {
                navigate('/home')
            }
        } catch (error) {
            console.error('error: ', error)
        }
    }

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-50 p-4'>
            <PasswordForm title='Create Password' onSubmit={handlePasswordSubmit} />
        </div>
    )
}

export default CreatePassword
