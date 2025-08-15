import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { googleAuthenticate, signin } from '@/services/auth/user.service'
import { setLocal } from '@/utils/storage'
import { fetchUserData } from '@/redux/slice/authSlice'
import { useDispatch } from 'react-redux'
import { GoogleLogin } from '@react-oauth/google'
import { openToast } from '@/redux/slice/toastSlice'

const SignIn = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogin = async (payload) => {
        try {
            const response = await signin(payload)

            if (response.success) {
                dispatch(fetchUserData())
                setLocal('access_token', response.accessToken)
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

    const handleContinueWithGoogle = async (token) => {
        try {
            const payload = {
                token: token,
            }

            const response = await googleAuthenticate(payload)
            if (response?.success) {
                if (response?.mode === 'CREATE_PASSWORD') {
                    navigate('/create-password')
                } else {
                    dispatch(fetchUserData())
                    setLocal('access_token', response.accessToken)
                    navigate('/home')
                }
                dispatch(openToast({ message: response.message, type: 'success' }))
            } else {
                dispatch(openToast({ message: response.message || 'Something went wrong', type: 'error' }))
            }
        } catch (error) {
            console.error('error: ', error)
            dispatch(openToast({ message: 'Something went wrong', type: 'error' }))
        }
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string().required('Password is required'),
        }),
        onSubmit: handleLogin,
    })

    return (
        <div className='flex justify-center items-center min-h-screen bg-gray-50 px-4 py-8'>
            <div className='bg-white shadow-lg rounded-lg p-6 sm:p-8 w-full max-w-md'>
                <h2 className='text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800'>Sign In</h2>

                <form className='space-y-4' onSubmit={formik.handleSubmit}>
                    <div>
                        <label htmlFor='email' className='sr-only'>
                            Email
                        </label>
                        <input
                            id='email'
                            name='email'
                            type='email'
                            placeholder='Email'
                            className={`w-full p-3 border ${
                                formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'
                            } rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition`}
                            {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email && <p className='text-sm text-red-500 mt-1'>{formik.errors.email}</p>}
                    </div>
                    <div>
                        <label htmlFor='password' className='sr-only'>
                            Password
                        </label>
                        <input
                            id='password'
                            name='password'
                            type='password'
                            placeholder='Password'
                            className={`w-full p-3 border ${
                                formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'
                            } rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition`}
                            {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password && formik.errors.password && <p className='text-sm text-red-500 mt-1'>{formik.errors.password}</p>}
                    </div>
                    <button
                        type='submit'
                        className='w-full bg-emerald-600 text-white p-3 rounded-lg font-semibold hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors'
                    >
                        Sign In
                    </button>
                    <div style={{ width: '100%' }}>
                        <GoogleLogin
                            onSuccess={(credentialResponse) => handleContinueWithGoogle(credentialResponse?.credential)}
                            onError={() => {
                                console.log('Login Failed')
                            }}
                        />
                    </div>
                </form>
                <p className='text-center text-sm mt-6 text-gray-600'>
                    Don't have an account?{' '}
                    <Link to='/signup' className='font-medium text-emerald-600 hover:underline'>
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default SignIn
