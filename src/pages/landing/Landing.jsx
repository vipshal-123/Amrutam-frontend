import { ROLES } from '@/constants/enums'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Landing = () => {
    const navigate = useNavigate()
    const userData = useSelector((data) => data?.auth || {})

    return (
        <>
            <div>
                <section className='bg-green-50 py-16 px-6 text-center'>
                    <h1 className='text-3xl md:text-5xl font-bold mb-4'>Your Ayurvedic Wellness Journey Starts Here</h1>
                    <p className='text-base md:text-lg text-gray-600 mb-6 max-w-2xl mx-auto'>
                        Discover expert doctors, book consultations, and take the first step towards holistic health.
                    </p>
                    <div className='flex items-center justify-center gap-2'>
                        {userData?.role === ROLES.USER && (
                            <button onClick={() => navigate('/home')} className='bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800'>
                                Find a Doctor
                            </button>
                        )}

                        {userData?.role === ROLES.ORG_ADMIN && (
                            <button
                                onClick={() => navigate('/manage-doctors')}
                                className='bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800'
                            >
                                Manage Doctor
                            </button>
                        )}

                        {userData?.role === ROLES.DOCTOR && (
                            <button onClick={() => navigate('/doctor')} className='bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800'>
                                Doctor Dashboard
                            </button>
                        )}

                        {!userData?.isAuth && (
                            <button
                                onClick={() => navigate('/create-org')}
                                className='bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800'
                            >
                                Create Organization
                            </button>
                        )}
                    </div>
                </section>

                <section className='py-12 px-6 max-w-6xl mx-auto'>
                    <h2 className='text-xl md:text-2xl font-bold mb-8 text-center'>Popular Specializations</h2>
                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6'>
                        {['Skin Care', 'Digestion', 'Mental Wellness', 'Pain Relief'].map((item) => (
                            <div key={item} className='bg-white shadow rounded-lg p-4 md:p-6 text-center hover:shadow-lg transition'>
                                <p className='font-semibold'>{item}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className='bg-gray-50 py-12 px-6'>
                    <h2 className='text-xl md:text-2xl font-bold mb-8 text-center'>What Our Patients Say</h2>
                    <div className='max-w-3xl mx-auto space-y-4 md:space-y-6'>
                        <blockquote className='p-4 md:p-6 bg-white rounded-lg shadow'>"Wonderful experience with Amrutam!"</blockquote>
                        <blockquote className='p-4 md:p-6 bg-white rounded-lg shadow'>"I feel healthier and more balanced."</blockquote>
                    </div>
                </section>
            </div>
            <footer className='bg-white border-t mt-auto'>
                <div className='container py-6 text-sm text-gray-600 px-4 md:px-6'>
                    © {new Date().getFullYear()} Amrutam — Ayurvedic consultations MVP
                </div>
            </footer>
        </>
    )
}

export default Landing
