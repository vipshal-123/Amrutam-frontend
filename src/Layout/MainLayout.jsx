import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Menu, X, LogOut } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { removeLocal } from '@/utils/storage'
import { fetchUserData } from '@/redux/slice/authSlice'
import { ROLES } from '@/constants/enums'

const MainLayout = ({ children }) => {
    const navigate = useNavigate()
    const [menuOpen, setMenuOpen] = useState(false)
    const dispatch = useDispatch()
    const headerRef = useRef(null)
    const userData = useSelector((data) => data?.auth || {})

    const handleLogout = () => {
        setMenuOpen(false)
        removeLocal('access_token')
        navigate('/')
        dispatch(fetchUserData())
    }

    const handleSignin = () => {
        navigate('/signin')
        setMenuOpen(false)
    }

    return (
        <div className='min-h-screen flex flex-col'>
            <header ref={headerRef} className='bg-white shadow fixed top-0 left-0 right-0 z-50'>
                <div className='container flex items-center justify-between py-4 px-4 md:px-6'>
                    <Link to='/' className='text-2xl font-bold text-emerald-700'>
                        Amrutam
                    </Link>
                    <nav className='hidden md:flex gap-4 items-center'>
                        {userData?.role === ROLES.USER && (
                            <>
                                <Link to='/home' className='text-sm hover:text-emerald-700'>
                                    Doctors
                                </Link>
                                <Link to='/dashboard' className='text-sm hover:text-emerald-700'>
                                    Appointments
                                </Link>
                            </>
                        )}

                        {!userData?.isAuth && (
                            <>
                                <Link to='/administrative-signin' className='text-sm hover:text-emerald-700'>
                                    Doctor Login
                                </Link>
                                <button
                                    onClick={() => navigate('/signin')}
                                    className='flex items-center gap-2 bg-emerald-600 text-white px-3 py-1 rounded hover:bg-emerald-700'
                                >
                                    <User size={16} /> Sign in
                                </button>
                            </>
                        )}

                        {userData?.role === ROLES.DOCTOR && (
                            <nav className='space-y-2'>
                                <div className='flex gap-3'>
                                    <Link
                                        to='/patient-list'
                                        className='block text-base font-medium text-gray-700 hover:text-emerald-700 transition'
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        Patient List
                                    </Link>

                                    <Link
                                        to='/doctor'
                                        className='block text-base font-medium text-gray-700 hover:text-emerald-700 transition'
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        Calendar
                                    </Link>
                                </div>
                            </nav>
                        )}

                        {userData?.isAuth && (
                            <button
                                onClick={() => handleLogout()}
                                className='flex items-center gap-2 bg-emerald-600 text-white px-3 py-1 rounded hover:bg-emerald-700'
                            >
                                <LogOut size={16} /> Logout
                            </button>
                        )}
                    </nav>
                    <button className='md:hidden text-emerald-700' onClick={() => setMenuOpen(!menuOpen)} aria-label='Toggle Menu'>
                        {menuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
                {menuOpen && (
                    <div className='md:hidden bg-white border-t shadow-md rounded-b-2xl px-4 py-6 space-y-4 animate-slideDown'>
                        {userData?.role === ROLES.USER && (
                            <nav className='space-y-2'>
                                <Link
                                    to='/home'
                                    className='block text-base font-medium text-gray-700 hover:text-emerald-700 transition'
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Doctors
                                </Link>
                                <Link
                                    to='/dashboard'
                                    className='block text-base font-medium text-gray-700 hover:text-emerald-700 transition'
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Appointments
                                </Link>
                            </nav>
                        )}

                        {userData?.role === ROLES.DOCTOR && (
                            <nav className='space-y-2'>
                                <Link
                                    to='/patient-list'
                                    className='block text-base font-medium text-gray-700 hover:text-emerald-700 transition'
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Patient List
                                </Link>

                                <Link
                                    to='/doctor'
                                    className='block text-base font-medium text-gray-700 hover:text-emerald-700 transition'
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Calendar
                                </Link>
                            </nav>
                        )}

                        {!userData?.isAuth && (
                            <div className='space-y-3'>
                                <Link
                                    to='/administrative-signin'
                                    className='block text-base font-medium text-gray-700 hover:text-emerald-700 transition'
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Doctor Login
                                </Link>
                                <button
                                    className='w-full flex items-center justify-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-xl shadow hover:bg-emerald-700 transition'
                                    onClick={handleSignin}
                                >
                                    <User size={18} /> Sign in
                                </button>
                            </div>
                        )}

                        {userData?.isAuth && (
                            <button
                                onClick={handleLogout}
                                className='w-full flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-2 rounded-xl shadow hover:bg-red-600 transition'
                            >
                                <LogOut size={18} /> Logout
                            </button>
                        )}
                    </div>
                )}
            </header>
            <main className='flex-1 container px-4 md:px-6'>{children}</main>
        </div>
    )
}
export default MainLayout
