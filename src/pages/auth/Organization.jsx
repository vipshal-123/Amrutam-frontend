import React, { useState } from 'react'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { createOrgSendOtp } from '@/services/auth/organization.service'
import { setLocal } from '@/utils/storage'
import { openToast } from '@/redux/slice/toastSlice'
import { useDispatch } from 'react-redux'

const initialValues = {
    name: '',
    type: '',
    address: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
    contactPerson: '',
    phone: '',
    email: '',
    description: '',
}

const Organization = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)

    const types = ['Hospital', 'Clinic', 'Wellness Center', 'Other']

    const handleSubmit = async (values) => {
        try {
            setLoading(true)
            console.log('Form Data:', values)
            const payload = {
                email: values.email,
                name: values.name,
            }
            const response = await createOrgSendOtp(payload)

            if (response.success) {
                setLoading(false)
                setLocal('orgData', JSON.stringify(values))
                setLocal('token', response?.token || '')
                navigate('/create-org/verify-otp')
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

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: handleSubmit,
    })

    return (
        <div className='pt-16 sm:px-6 lg:px-8'>
            <h1 className='text-2xl font-bold mb-6 space-y-6 max-w-3xl mx-auto'>Create Organization</h1>

            <form onSubmit={formik.handleSubmit} className='bg-white p-6 rounded shadow space-y-6 max-w-3xl mx-auto'>
                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>Organization Name</label>
                    <input
                        type='text'
                        name='name'
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        className='w-full border rounded p-2'
                        placeholder='e.g., Amrutam Wellness Hospital'
                    />
                </div>

                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>Organization Type</label>
                    <select name='type' onChange={formik.handleChange} value={formik.values.type} className='w-full border rounded p-2'>
                        <option value=''>Select Type</option>
                        {types.map((t) => (
                            <option key={t} value={t.toLowerCase().replace(' ', '_')}>
                                {t}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>Address</label>
                    <textarea
                        rows='3'
                        name='address'
                        onChange={formik.handleChange}
                        value={formik.values.address}
                        className='w-full border rounded p-2'
                        placeholder='Street, area, etc.'
                    ></textarea>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>City</label>
                        <input
                            type='text'
                            name='city'
                            onChange={formik.handleChange}
                            value={formik.values.city}
                            className='w-full border rounded p-2'
                        />
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>State</label>
                        <input
                            type='text'
                            name='state'
                            onChange={formik.handleChange}
                            value={formik.values.state}
                            className='w-full border rounded p-2'
                        />
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Country</label>
                        <input
                            type='text'
                            name='country'
                            onChange={formik.handleChange}
                            value={formik.values.country}
                            className='w-full border rounded p-2'
                        />
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Pincode</label>
                        <input
                            type='text'
                            name='pincode'
                            onChange={formik.handleChange}
                            value={formik.values.pincode}
                            className='w-full border rounded p-2'
                        />
                    </div>
                </div>

                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>Contact Person Name</label>
                    <input
                        type='text'
                        name='contactPerson'
                        onChange={formik.handleChange}
                        value={formik.values.contactPerson}
                        className='w-full border rounded p-2'
                    />
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Contact Phone</label>
                        <input
                            type='tel'
                            name='phone'
                            onChange={formik.handleChange}
                            value={formik.values.phone}
                            className='w-full border rounded p-2'
                            placeholder='+91 9876543210'
                        />
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Contact Email</label>
                        <input
                            type='email'
                            name='email'
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            className='w-full border rounded p-2'
                            placeholder='contact@organization.com'
                        />
                    </div>
                </div>

                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>Description</label>
                    <textarea
                        rows='4'
                        name='description'
                        onChange={formik.handleChange}
                        value={formik.values.description}
                        className='w-full border rounded p-2'
                        placeholder='Brief about your hospital or clinic...'
                    ></textarea>
                </div>

                <div className='flex justify-end'>
                    <button disabled={loading} type='submit' className='bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded transition'>
                        {loading ? 'Loading...' : 'Create Organization'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Organization
