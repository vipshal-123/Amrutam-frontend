import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const PasswordForm = ({ title = 'Create Password', onSubmit }) => {
    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .min(8, 'Password must be at least 8 characters')
                .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
                .matches(/[a-z]/, 'Must contain at least one lowercase letter')
                .matches(/[0-9]/, 'Must contain at least one number')
                .matches(/[@$!%*?&]/, 'Must contain at least one special character')
                .required('Password is required'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Confirm password is required'),
        }),
        onSubmit: (values, { resetForm }) => {
            if (onSubmit) onSubmit(values)
            resetForm()
        },
    })

    return (
        <div className='w-full max-w-md bg-white shadow-lg rounded-xl p-6'>
            <h2 className='text-2xl font-bold text-center mb-6'>{title}</h2>

            <form onSubmit={formik.handleSubmit} className='space-y-5'>
                <div>
                    <label className='block text-sm font-medium text-gray-700'>New Password</label>
                    <input
                        type='password'
                        name='password'
                        placeholder='Enter new password'
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`mt-1 block w-full p-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 ${
                            formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'
                        }`}
                    />
                    {formik.touched.password && formik.errors.password && <p className='text-red-500 text-sm mt-1'>{formik.errors.password}</p>}
                </div>

                <div>
                    <label className='block text-sm font-medium text-gray-700'>Confirm Password</label>
                    <input
                        type='password'
                        name='confirmPassword'
                        placeholder='Re-enter password'
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`mt-1 block w-full p-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 ${
                            formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                        }`}
                    />
                    {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                        <p className='text-red-500 text-sm mt-1'>{formik.errors.confirmPassword}</p>
                    )}
                </div>

                <button type='submit' className='w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded-lg font-medium transition'>
                    {title.includes('Update') ? 'Update Password' : 'Set Password'}
                </button>
            </form>
        </div>
    )
}

export default PasswordForm
