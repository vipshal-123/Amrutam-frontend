import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { doctors } from '@/data/doctors'

const Reschedule = () => {
    const { apptId } = useParams()
    const doc = doctors[0]
    const [newSlot, setNewSlot] = useState(null)
    const [rescheduled, setRescheduled] = useState(false)
    const slots = ['2025-08-20T09:00:00', '2025-08-21T11:00:00', '2025-08-22T14:00:00']

    const handleConfirmReschedule = () => {
        if (newSlot) {
            setRescheduled(true)
        }
    }

    return (
        <div className='py-8 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen'>
            <div className='max-w-3xl mx-auto'>
                <h1 className='text-2xl sm:text-3xl font-bold mb-4 text-gray-800'>Reschedule Appointment</h1>
                <div className='bg-white p-4 sm:p-6 rounded-lg shadow-md'>
                    {rescheduled ? (
                        <div className='text-center p-6'>
                            <div className='mx-auto bg-green-100 rounded-full h-16 w-16 flex items-center justify-center'>
                                <svg className='h-8 w-8 text-green-600' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 13l4 4L19 7' />
                                </svg>
                            </div>
                            <h3 className='mt-4 text-xl font-semibold text-gray-800'>Appointment Rescheduled!</h3>
                            <p className='mt-2 text-sm text-gray-600'>
                                Your appointment with <strong>{doc.name}</strong> has been successfully moved to <br />
                                <strong>{new Date(newSlot).toLocaleString()}</strong>.
                            </p>
                            <button className='mt-6 px-4 py-2 bg-emerald-600 text-white rounded-md'>Back to Appointments</button>
                        </div>
                    ) : (
                        <>
                            <div className='space-y-2 text-sm sm:text-base'>
                                <div>
                                    <strong>Appointment ID:</strong> <span className='font-mono text-gray-600'>{apptId}</span>
                                </div>
                                <div>
                                    <strong>Doctor:</strong> <span className='text-gray-800'>{doc.name}</span>
                                </div>
                            </div>

                            <div className='mt-6'>
                                <h4 className='font-medium text-gray-800'>Choose a new slot</h4>
                                <div className='mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3'>
                                    {slots.map((s) => (
                                        <button
                                            onClick={() => setNewSlot(s)}
                                            key={s}
                                            className={`p-3 border rounded-md text-left transition-all duration-200 ${
                                                newSlot === s
                                                    ? 'bg-emerald-100 border-emerald-400 ring-2 ring-emerald-200'
                                                    : 'bg-white hover:bg-gray-50'
                                            }`}
                                        >
                                            <div className='font-semibold text-sm'>
                                                {new Date(s).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                                            </div>
                                            <div className='text-xs text-gray-600'>
                                                {new Date(s).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                        </button>
                                    ))}
                                </div>

                                <div className='mt-6 pt-4 border-t flex flex-col sm:flex-row items-center gap-3'>
                                    <button
                                        disabled={!newSlot}
                                        onClick={handleConfirmReschedule}
                                        className='w-full sm:w-auto px-4 py-2 bg-emerald-600 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-opacity'
                                    >
                                        Confirm Reschedule
                                    </button>
                                    <button className='w-full sm:w-auto px-3 py-2 border rounded-md text-sm hover:bg-gray-100'>Cancel</button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Reschedule
