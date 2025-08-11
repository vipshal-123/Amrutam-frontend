import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { doctors } from '@/data/doctors'

const Booking = () => {
    const { id } = useParams()
    const doc = doctors.find((d) => d.id === id) || doctors[0]
    const slots = ['2025-08-13T10:00:00', '2025-08-13T10:30:00', '2025-08-13T11:00:00', '2025-08-14T14:00:00', '2025-08-15T09:30:00']
    const [locked, setLocked] = useState(null)
    const [otpOpen, setOtpOpen] = useState(false)
    const [otp, setOtp] = useState('')
    const [bookingConfirmed, setBookingConfirmed] = useState(false)

    const handleConfirmBooking = () => {
        setBookingConfirmed(true)
        setOtpOpen(false)
    }

    return (
        <div className='py-8 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen'>
            <div className='flex flex-col lg:flex-row gap-6'>
                <div className='w-full lg:w-2/5 bg-white p-4 sm:p-6 rounded-lg shadow-md'>
                    <h2 className='text-xl font-semibold text-gray-800'>{doc.name}</h2>
                    <div className='text-sm text-gray-600'>{doc.specialization}</div>
                    <p className='mt-3 text-sm text-gray-700'>{doc.bio}</p>

                    <div className='mt-6'>
                        <h4 className='font-medium text-gray-800'>Available Slots</h4>
                        <div className='mt-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2'>
                            {slots.map((s) => {
                                const isLocked = locked === s
                                return (
                                    <button
                                        key={s}
                                        onClick={() => setLocked(s)}
                                        className={`text-left p-2 border rounded-md transition-colors duration-200 ${
                                            isLocked ? 'bg-emerald-100 border-emerald-300' : 'bg-white hover:bg-gray-50'
                                        }`}
                                    >
                                        <div className='font-medium text-sm'>
                                            {new Date(s).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                                        </div>
                                        <div className='text-xs'>
                                            {new Date(s).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                        {isLocked && <div className='text-xs text-emerald-700 mt-1'>Locked — 5:00</div>}
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    <div className='mt-6 flex items-center gap-3'>
                        <button
                            disabled={!locked}
                            onClick={() => setOtpOpen(true)}
                            className='px-4 py-2 rounded-md bg-emerald-600 text-white disabled:opacity-50 transition-opacity'
                        >
                            Lock & Confirm
                        </button>
                        <button onClick={() => setLocked(null)} className='px-3 py-2 border rounded-md text-sm hover:bg-gray-100'>
                            Release
                        </button>
                    </div>
                </div>

                <div className='flex-1 bg-white p-4 sm:p-6 rounded-lg shadow-md'>
                    <h3 className='font-semibold text-lg text-gray-800'>Booking summary</h3>

                    {bookingConfirmed && (
                        <div className='mt-4 p-3 border-l-4 border-green-500 bg-green-50 text-green-800 rounded-md'>
                            <p className='font-bold'>Booking Confirmed!</p>
                            <p className='text-sm'>An email confirmation has been sent to you.</p>
                        </div>
                    )}

                    <div className='mt-4 space-y-3 text-sm text-gray-700'>
                        <div>
                            <strong>Doctor:</strong> {doc.name}
                        </div>
                        <div>
                            <strong>Slot:</strong> {locked ? new Date(locked).toLocaleString() : '—'}
                        </div>
                        <div>
                            <strong>Mode:</strong> {doc.mode.join(', ')}
                        </div>
                    </div>

                    {otpOpen && (
                        <div className='mt-6 p-4 border rounded-md bg-gray-50'>
                            <div className='text-sm font-medium'>Mock OTP sent to +91 ******1234</div>
                            <p className='text-xs text-gray-500'>Please enter the OTP to confirm.</p>
                            <input
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder='Enter OTP'
                                className='mt-3 p-2 border rounded-md w-full sm:w-48'
                            />
                            <div className='mt-3'>
                                <button onClick={handleConfirmBooking} className='px-3 py-1 bg-emerald-600 text-white rounded-md text-sm'>
                                    Confirm Booking
                                </button>
                                <button onClick={() => setOtpOpen(false)} className='ml-2 px-3 py-1 border rounded-md text-sm'>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Booking
