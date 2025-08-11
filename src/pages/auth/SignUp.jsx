import { Link } from 'react-router-dom'

const SignUp = () => {
    return (
        <div className='flex justify-center items-center min-h-screen bg-gray-50 px-4 py-8'>
            <div className='bg-white shadow-lg rounded-lg p-6 sm:p-8 w-full max-w-md'>
                <h2 className='text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800'>Create an Account</h2>
                <form className='space-y-4'>
                    <div>
                        <label htmlFor='name' className='sr-only'>
                            Name
                        </label>
                        <input
                            id='name'
                            type='text'
                            placeholder='Name'
                            className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition'
                        />
                    </div>
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
                    <div>
                        <label htmlFor='confirm-password' className='sr-only'>
                            Confirm Password
                        </label>
                        <input
                            id='confirm-password'
                            type='password'
                            placeholder='Confirm Password'
                            className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition'
                        />
                    </div>
                    <button
                        type='submit'
                        className='w-full bg-emerald-600 text-white p-3 rounded-lg font-semibold hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors'
                    >
                        Sign Up
                    </button>
                    <button
                        type='button'
                        className='w-full flex items-center justify-center gap-3 border border-gray-300 p-3 rounded-lg hover:bg-gray-50 transition-colors'
                    >
                        <img src='https://www.svgrepo.com/show/355037/google.svg' alt='Google' className='w-5 h-5' />
                        <span className='text-gray-700 font-medium'>Sign up with Google</span>
                    </button>
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
