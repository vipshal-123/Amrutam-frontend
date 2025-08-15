import { ROLES } from '@/constants/enums'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ViewProfileModal from './ViewProfileModal'

const DoctorCard = ({ doctor, handleResendMail, loading1 }) => {
    const userData = useSelector((data) => data?.auth || {})
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <div className='bg-white p-4 rounded-lg shadow-md border border-gray-200 flex flex-col sm:flex-row items-start gap-4'>
            <img
                src={`https://placehold.co/80x80/E2E8F0/4A5568?text=${doctor.name.charAt(0)}`}
                alt={doctor.name}
                className='w-20 h-20 rounded-full object-cover'
            />
            <div className='flex-1'>
                <div className='flex justify-between'>
                    <h3 className='font-bold text-lg text-emerald-800'>{doctor.name}</h3>
                    <span className='capitalize text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full'>{doctor.status}</span>
                </div>

                <p className='text-sm text-gray-600'>{doctor?.specialization || ''}</p>
                <p className='text-sm text-gray-500 mt-1'>{doctor?.location || ''}</p>
                <div className='mt-3 flex items-center gap-3'>
                    {userData?.role === ROLES.USER && (
                        <Link to={'/book/' + doctor._id} className='px-3 py-1 text-sm bg-emerald-600 text-white rounded'>
                            Book
                        </Link>
                    )}
                    <button onClick={() => setIsModalOpen(true)} className='text-sm px-1 py-1 border rounded'>
                        View profile
                    </button>
                    {userData?.role === ROLES.ORG_ADMIN && !doctor?.isEmailVerified && (
                        <button
                            onClick={() => handleResendMail({ userId: doctor?._id, email: doctor?.email })}
                            className='text-sm px-1 py-1 border rounded'
                        >
                            {loading1 ? 'Loading...' : 'Resend mail'}
                        </button>
                    )}
                </div>
                <div className='mt-3 flex gap-2'>
                    {doctor?.mode?.map((m) => (
                        <span key={m} className='capitalize text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full'>
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
