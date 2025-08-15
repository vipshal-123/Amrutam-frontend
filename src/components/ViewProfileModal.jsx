import React from 'react'

const ViewProfileModal = ({ isOpen, onClose, doctor }) => {
    if (!isOpen) return null

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50' onClick={onClose}>
            <div className='bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative' onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className='absolute top-3 right-3 text-gray-500 hover:text-gray-800'>
                    ✕
                </button>

                <h2 className='text-2xl font-bold text-gray-800'>{doctor.name}</h2>
                <p className='text-gray-600'>{doctor.specialization}</p>

                <div className='mt-3'>
                    <p className='text-sm text-gray-500'>Experience</p>
                    <p className='font-medium text-gray-800'>{doctor.experience} years</p>
                </div>

                <div className='mt-3'>
                    <p className='text-sm text-gray-500'>Consultation Modes</p>
                    <div className='flex gap-2 mt-1'>
                        {doctor.mode.map((m, i) => (
                            <span key={i} className='px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm'>
                                {m}
                            </span>
                        ))}
                    </div>
                </div>

                <div className='mt-3'>
                    <p className='text-sm text-gray-500'>Bio</p>
                    <p className='text-gray-700 leading-relaxed'>{doctor.bio}</p>
                </div>
            </div>
        </div>
    )
}

export default ViewProfileModal
