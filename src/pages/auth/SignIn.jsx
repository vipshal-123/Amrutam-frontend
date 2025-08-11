import { Link } from 'react-router-dom'

const SignIn = () => {
    return (
        <div className='flex justify-center items-center min-h-screen bg-gray-50 px-4 py-8'>
            <div className='bg-white shadow-lg rounded-lg p-6 sm:p-8 w-full max-w-md'>
                <h2 className='text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800'>Sign In</h2>

                <form className='space-y-4'>
                    <div>
                        <label htmlFor='email' className='sr-only'>
                            Email
                        </label>
                        <input
                            id='email'
                            type='email'
                            placeholder='Email'
                            className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition'
                        />
                    </div>
                    <div>
                        <label htmlFor='password' className='sr-only'>
                            Password
                        </label>
                        <input
                            id='password'
                            type='password'
                            placeholder='Password'
                            className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition'
                        />
                    </div>
                    <button
                        type='submit'
                        className='w-full bg-emerald-600 text-white p-3 rounded-lg font-semibold hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors'
                    >
                        Sign In
                    </button>
                    <button
                        type='button'
                        className='w-full flex items-center justify-center gap-3 border border-gray-300 p-3 rounded-lg hover:bg-gray-50 transition-colors'
                    >
                        <img src='https://www.svgrepo.com/show/355037/google.svg' alt='Google' className='w-5 h-5' />
                        <span className='text-gray-700 font-medium'>Sign in with Google</span>
                    </button>
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
