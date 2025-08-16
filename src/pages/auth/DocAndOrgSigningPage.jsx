import React, { useState } from 'react'
import { useFormik } from 'formik'
import { doctorSignin } from '@/services/auth/doctor.service'
import { useNavigate } from 'react-router-dom'
import { setLocal } from '@/utils/storage'
import { orgAdminSigninSendOtp } from '@/services/auth/organization.service'
import { fetchUserData } from '@/redux/slice/authSlice'
import { useDispatch } from 'react-redux'
import { openToast } from '@/redux/slice/toastSlice'

const DocAndOrgSigningPage = () => {
    const [activeTab, setActiveTab] = useState('doctor')
    const [loading, setLoading] = useState(false)
    const [loading1, setLoading1] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleDocSignin = async (payload) => {
        try {
            setLoading(true)
            const response = await doctorSignin(payload)
            if (response?.success) {
                setLocal('access_token', response?.accessToken)
                dispatch(fetchUserData())
                navigate('/doctor')
                dispatch(openToast({ message: response.message, type: 'success' }))
            } else {
                dispatch(openToast({ message: response.message || 'Something went wrong', type: 'error' }))
            }
        } catch (error) {
            console.error('error: ', error)
            dispatch(openToast({ message: 'Something went wrong', type: 'error' }))
        } finally {
            setLoading(false)
        }
    }

    const handleOrgAdminSendOtp = async (payload) => {
        try {
            setLoading1(true)
            const response = await orgAdminSigninSendOtp(payload)
            if (response.success) {
                setLocal('token', response?.token)
                navigate('/admin-verify-otp')
                dispatch(openToast({ message: response.message, type: 'success' }))
            } else {
                dispatch(openToast({ message: response.message || 'Something went wrong', type: 'error' }))
            }
        } catch (error) {
            console.error('error: ', error)
            dispatch(openToast({ message: 'Something went wrong', type: 'error' }))
        } finally {
            setLoading1(false)
        }
    }

    const doctorFormik = useFormik({
        initialValues: { email: '', password: '' },
        onSubmit: handleDocSignin,
    })

    const orgFormik = useFormik({
        initialValues: { email: '' },
        onSubmit: handleOrgAdminSendOtp,
    })

    return (
        <div className='flex justify-center items-center min-h-screen bg-gradient-to-br from-emerald-50 to-white px-4 pt-8'>
            <div className='bg-white rounded-2xl shadow-xl p-6 w-full max-w-md sm:max-w-lg lg:max-w-xl'>
                <div className='flex border-b mb-6 gap-x-2'>
                    <button
                        className={`flex-1 py-2 text-center whitespace-nowrap text-xs sm:text-sm md:text-base transition ${
                            activeTab === 'doctor'
                                ? 'border-b-2 border-emerald-500 text-emerald-600 font-semibold'
                                : 'text-gray-500 hover:text-emerald-500'
                        }`}
                        onClick={() => setActiveTab('doctor')}
                    >
                        Doctor Sign-In
                    </button>
                    <button
                        className={`flex-1 py-2 text-center whitespace-nowrap text-xs sm:text-sm md:text-base transition ${
                            activeTab === 'org'
                                ? 'border-b-2 border-emerald-500 text-emerald-600 font-semibold'
                                : 'text-gray-500 hover:text-emerald-500'
                        }`}
                        onClick={() => setActiveTab('org')}
                    >
                        Org Member Sign-In
                    </button>
                </div>

                {activeTab === 'doctor' && (
                    <form onSubmit={doctorFormik.handleSubmit} className='space-y-5'>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
                            <input
                                type='email'
                                name='email'
                                value={doctorFormik.values.email}
                                onChange={doctorFormik.handleChange}
                                onBlur={doctorFormik.handleBlur}
                                className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400'
                                placeholder='Enter your email'
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Password</label>
                            <input
                                type='password'
                                name='password'
                                value={doctorFormik.values.password}
                                onChange={doctorFormik.handleChange}
                                onBlur={doctorFormik.handleBlur}
                                className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400'
                                placeholder='Enter your password'
                            />
                        </div>

                        <button
                            type='submit'
                            disabled={loading}
                            className='w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-lg transition disabled:opacity-50'
                        >
                            {loading ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>
                )}

                {activeTab === 'org' && (
                    <form onSubmit={orgFormik.handleSubmit} className='space-y-5'>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
                            <input
                                type='email'
                                name='email'
                                value={orgFormik.values.email}
                                onChange={orgFormik.handleChange}
                                onBlur={orgFormik.handleBlur}
                                className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400'
                                placeholder='Enter your email'
                            />
                        </div>

                        <button
                            type='submit'
                            disabled={loading1}
                            className='w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-lg transition disabled:opacity-50'
                        >
                            {loading1 ? 'Sending OTP...' : 'Send OTP'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    )
}

export default DocAndOrgSigningPage
