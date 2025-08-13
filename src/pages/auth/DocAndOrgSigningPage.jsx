import React, { useState } from 'react'
import { useFormik } from 'formik'
import { doctorSignin } from '@/services/auth/doctor.service'
import { useNavigate } from 'react-router-dom'
import { setLocal } from '@/utils/storage'
import { orgAdminSigninSendOtp } from '@/services/auth/organization.service'

const DocAndOrgSigningPage = () => {
    const [activeTab, setActiveTab] = useState('doctor')
    const navigate = useNavigate()

    const handleDocSignin = async (payload) => {
        console.log('payload: ', payload)
        try {
            const response = await doctorSignin(payload)

            if (response?.success) {
                navigate('/doctor')
                setLocal('access_token', response?.accessToken)
            }
        } catch (error) {
            console.error('error: ', error)
        }
    }

    const handleOrgAdminSendOtp = async (payload) => {
        try {
            const response = await orgAdminSigninSendOtp(payload)

            if (response.success) {
                setLocal('token', response?.token)
                navigate('/admin-verify-otp')
            }
        } catch (error) {
            console.error('error: ', error)
        }
    }

    const doctorFormik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: handleDocSignin,
    })

    const orgFormik = useFormik({
        initialValues: {
            email: '',
        },
        onSubmit: handleOrgAdminSendOtp,
    })

    return (
        <div className='flex justify-center items-center min-h-screen bg-gray-100 px-4'>
            <div className='bg-white rounded-xl shadow-lg p-6 w-full max-w-md'>
                <div className='flex border-b mb-4'>
                    <button
                        className={`flex-1 py-2 text-center ${
                            activeTab === 'doctor' ? 'border-b-2 border-emerald-500 text-emerald-600 font-semibold' : 'text-gray-500'
                        }`}
                        onClick={() => setActiveTab('doctor')}
                    >
                        Doctor Sign-In
                    </button>
                    <button
                        className={`flex-1 py-2 text-center ${
                            activeTab === 'org' ? 'border-b-2 border-emerald-500 text-emerald-600 font-semibold' : 'text-gray-500'
                        }`}
                        onClick={() => setActiveTab('org')}
                    >
                        Org Member Sign-In
                    </button>
                </div>

                {activeTab === 'doctor' && (
                    <form onSubmit={doctorFormik.handleSubmit} className='space-y-4'>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
                            <input
                                type='email'
                                name='email'
                                value={doctorFormik.values.email}
                                onChange={doctorFormik.handleChange}
                                onBlur={doctorFormik.handleBlur}
                                className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400'
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
                            />
                        </div>

                        <button type='submit' className='w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-lg'>
                            Sign In
                        </button>
                    </form>
                )}

                {activeTab === 'org' && (
                    <form onSubmit={orgFormik.handleSubmit} className='space-y-4'>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
                            <input
                                type='email'
                                name='email'
                                value={orgFormik.values.email}
                                onChange={orgFormik.handleChange}
                                onBlur={orgFormik.handleBlur}
                                className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400'
                            />
                        </div>

                        <button type='submit' className='w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-lg'>
                            Send OTP
                        </button>
                    </form>
                )}
            </div>
        </div>
    )
}

export default DocAndOrgSigningPage
