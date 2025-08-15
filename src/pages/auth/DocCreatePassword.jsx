import PasswordForm from '@/components/PasswordForm'
import { openToast } from '@/redux/slice/toastSlice'
import { docCreatePassword } from '@/services/auth/organization.service'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'

const DocCreatePassword = () => {
    const [searchParams] = useSearchParams()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const token = searchParams.get('token')

    const handlePasswordSubmit = async (values) => {
        console.log('Password data:', values)
        try {
            setLoading(true)
            const payload = {
                token: token,
                password: values?.password,
            }

            const response = await docCreatePassword(payload)

            if (response.success) {
                setLoading(false)
                navigate('/administrative-signin')
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
        <div className='flex items-center justify-center min-h-screen bg-gray-50 p-4'>
            <PasswordForm title='Create Password' onSubmit={handlePasswordSubmit} loading={loading} />
        </div>
    )
}

export default DocCreatePassword
