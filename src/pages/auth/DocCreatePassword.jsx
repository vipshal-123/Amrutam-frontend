import PasswordForm from '@/components/PasswordForm'
import { openToast } from '@/redux/slice/toastSlice'
import { docCreatePassword } from '@/services/auth/organization.service'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'

const DocCreatePassword = () => {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const token = searchParams.get('token')

    const handlePasswordSubmit = async (values) => {
        console.log('Password data:', values)
        try {
            const payload = {
                token: token,
                password: values?.password,
            }

            const response = await docCreatePassword(payload)

            if (response.success) {
                navigate('/administrative-signin')
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

export default DocCreatePassword
