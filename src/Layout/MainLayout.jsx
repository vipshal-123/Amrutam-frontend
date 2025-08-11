import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Menu, X } from 'lucide-react'

const MainLayout = ({ children }) => {
    const navigate = useNavigate()
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <div className='min-h-screen flex flex-col'>
            <header className='bg-white shadow fixed top-0 left-0 right-0 z-50'>
                <div className='container flex items-center justify-between py-4 px-4 md:px-6'>
                    <Link to='/' className='text-2xl font-bold text-emerald-700'>
                        Amrutam
                    </Link>
                    <nav className='hidden md:flex gap-4 items-center'>
                        <Link to='/home' className='text-sm hover:text-emerald-700'>
                            Doctors
                        </Link>
                        <Link to='/dashboard' className='text-sm hover:text-emerald-700'>
                            Appointments
                        </Link>
                        <Link to='/doctor' className='text-sm hover:text-emerald-700'>
                            Doctor Login
                        </Link>
                        <button onClick={() => navigate('/signin')} className='flex items-center gap-2 bg-emerald-600 text-white px-3 py-1 rounded hover:bg-emerald-700'>
                            <User size={16} /> Sign in
                        </button>
                    </nav>
                    <button className='md:hidden text-emerald-700' onClick={() => setMenuOpen(!menuOpen)} aria-label='Toggle Menu'>
                        {menuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
                {menuOpen && (
                    <div className='md:hidden px-4 pb-4 space-y-3 border-t bg-white'>
                        <Link to='/' className='block text-sm hover:text-emerald-700' onClick={() => setMenuOpen(false)}>
                            Doctors
                        </Link>
                        <Link to='/dashboard' className='block text-sm hover:text-emerald-700' onClick={() => setMenuOpen(false)}>
                            Appointments
                        </Link>
                        <Link to='/doctor' className='block text-sm hover:text-emerald-700' onClick={() => setMenuOpen(false)}>
                            Doctor Login
                        </Link>
                        <button
                            className='flex items-center gap-2 bg-emerald-600 text-white px-3 py-1 rounded hover:bg-emerald-700 w-full'
                            onClick={() => setMenuOpen(false)}
                        >
                            <User size={16} /> Sign in
                        </button>
                    </div>
                )}
            </header>
            <main className='flex-1 container px-4 md:px-6 pt-20'>{children}</main>
            <footer className='bg-white border-t mt-auto'>
                <div className='container py-6 text-sm text-gray-600 px-4 md:px-6'>
                    © {new Date().getFullYear()} Amrutam — Ayurvedic consultations UI MVP
                </div>
            </footer>
        </div>
    )
}
export default MainLayout
