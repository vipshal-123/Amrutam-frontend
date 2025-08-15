import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { googleAuthenticate, signup } from '@/services/auth/user.service'
import { setLocal } from '@/utils/storage'
import { useDispatch } from 'react-redux'
import { openToast } from '@/redux/slice/toastSlice'
import { fetchUserData } from '@/redux/slice/authSlice'
import { GoogleLogin } from '@react-oauth/google'

const SignUp = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSubmit = async (payload) => {
        try {
            const response = await signup(payload)

            if (response.success) {
                setLocal('token', response.token)
                navigate('/verify-otp')
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
            name: '',
            email: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
        }),
        onSubmit: handleSubmit,
    })

    return (
        <div className='flex justify-center items-center min-h-screen bg-gray-50 px-4 py-8'>
            <div className='bg-white shadow-lg rounded-lg p-6 sm:p-8 w-full max-w-md'>
                <h2 className='text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800'>Create an Account</h2>

                <form className='space-y-4' onSubmit={formik.handleSubmit}>
                    <div>
                        <label htmlFor='name' className='sr-only'>
                            Name
                        </label>
                        <input
                            id='name'
                            name='name'
                            type='text'
                            placeholder='Name'
                            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition ${
                                formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-gray-300'
                            }`}
                            {...formik.getFieldProps('name')}
                        />
                        {formik.touched.name && formik.errors.name && <p className='text-red-500 text-sm mt-1'>{formik.errors.name}</p>}
                    </div>

                    <div>
                        <label htmlFor='email' className='sr-only'>
                            Email
                        </label>
                        <input
                            id='email'
                            name='email'
                            type='email'
                            placeholder='Email'
                            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition ${
                                formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'
                            }`}
                            {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email && <p className='text-red-500 text-sm mt-1'>{formik.errors.email}</p>}
                    </div>

                    <button
                        type='submit'
                        className='w-full bg-emerald-600 text-white p-3 rounded-lg font-semibold hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors'
                    >
                        Sign Up
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
                    Already have an account?{' '}
                    <Link to='/signin' className='font-medium text-emerald-600 hover:underline'>
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default SignUp
