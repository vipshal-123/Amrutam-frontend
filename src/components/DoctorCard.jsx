import { ROLES } from '@/constants/enums'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ViewProfileModal from './ViewProfileModal'

const DoctorCard = ({ doctor, handleResendMail, loading1 }) => {
    const userData = useSelector((data) => data?.auth || {})
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <div className='bg-white p-4 flex items-center gap-5 rounded-lg shadow-md border border-gray-200'>
            <div className='flex justify-center mb-3'>
                <img
                    src={`https://placehold.co/80x80/E2E8F0/4A5568?text=${doctor.name.charAt(0)}`}
                    alt={doctor.name}
                    className='w-16 h-16 rounded-full object-cover'
                />
            </div>

            <div className='text-center sm:text-left'>
                <div className='flex items-center gap-2 mb-1'>
                    <h3 className='font-bold text-base text-emerald-800 truncate'>{doctor.name}</h3>
                    <span className='capitalize text-[10px] sm:text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full whitespace-nowrap'>
                        {doctor.status}
                    </span>
                </div>

                <p className='text-sm flex justify-start text-gray-600'>{doctor?.specialization || ''}</p>

                <div className='mt-3 flex flex-wrap sm:justify-start gap-2'>
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

                <div className='mt-3 flex flex-wrap sm:justify-start gap-2'>
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
