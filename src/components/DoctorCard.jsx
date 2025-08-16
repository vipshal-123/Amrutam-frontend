import { ROLES } from '@/constants/enums'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ViewProfileModal from './ViewProfileModal'

const DoctorCard = ({ doctor, handleResendMail, loading1 }) => {
    const userData = useSelector((data) => data?.auth || {})
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <div className='bg-white p-3 rounded-lg shadow-md border border-gray-200'>
            <div className='flex items-center gap-3'>
                <img
                    src={`https://placehold.co/60x60/E2E8F0/4A5568?text=${doctor.name.charAt(0)}`}
                    alt={doctor.name}
                    className='w-12 h-12 rounded-full object-cover'
                />

                <div className='flex-1 flex justify-between items-center'>
                    <h3 className='font-bold text-base text-emerald-800 truncate'>{doctor.name}</h3>
                    <span className='capitalize text-[10px] sm:text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full whitespace-nowrap ml-2'>
                        {doctor.status}
                    </span>
                </div>
            </div>

            <div className='mt-2 ml-14 sm:ml-0 md:ml-14'>
                <p className='text-sm text-gray-600'>{doctor?.specialization || ''}</p>
                <p className='text-sm text-gray-500'>{doctor?.location || ''}</p>

                <div className='mt-2 flex flex-wrap items-center gap-2'>
                    {userData?.role === ROLES.USER && (
                        <Link to={'/book/' + doctor._id} className='px-3 py-1 text-xs sm:text-sm bg-emerald-600 text-white rounded'>
                            Book
                        </Link>
                    )}
                    <button onClick={() => setIsModalOpen(true)} className='text-xs sm:text-sm px-2 py-1 border rounded'>
                        View profile
                    </button>
                    {userData?.role === ROLES.ORG_ADMIN && !doctor?.isEmailVerified && (
                        <button
                            onClick={() => handleResendMail({ userId: doctor?._id, email: doctor?.email })}
                            className='text-xs sm:text-sm px-2 py-1 border rounded'
                        >
                            {loading1 ? 'Loading...' : 'Resend mail'}
                        </button>
                    )}
                </div>

                <div className='mt-2 flex flex-wrap gap-2'>
                    {doctor?.mode?.map((m) => (
                        <span key={m} className='capitalize text-[10px] sm:text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full'>
                            {m}
                        </span>
                    ))}
                </div>

                <ViewProfileModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} doctor={doctor} />
            </div>
        </div>
    )
}

export default DoctorCard
