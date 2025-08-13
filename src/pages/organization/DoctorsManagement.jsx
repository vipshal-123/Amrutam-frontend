import React, { useState } from 'react'
import DynamicForm from '@/components/DynamicForm'
import { doctors } from '@/data/doctors'
import DoctorCard from '@/components/DoctorCard'

const DoctorsManagement = () => {
    const [showModal, setShowModal] = useState(false)
    const [doctorList, setDoctorList] = useState(doctors)
    console.log('doctorList: ', doctorList);

    const doctorFields = [
        { name: 'email', label: 'E-mail', type: 'text', required: true },
        { name: 'name', label: 'Full Name', type: 'text', required: true },
        { name: 'specialization', label: 'Specialization', type: 'text', required: true },
        { name: 'experience', label: 'Experience (Years)', type: 'number', required: true },
        {
            name: 'mode',
            label: 'Mode',
            as: 'select',
            multiple: true,
            initialValue: [],
            options: [
                { value: 'online', label: 'Online' },
                { value: 'in_person', label: 'In Person' },
                { value: 'both', label: 'Both' },
            ]
        },
        { name: 'contact', label: 'Contact Number', type: 'text', required: true },
        { name: 'bio', label: 'Bio', as: 'textarea', rows: 4 },
    ]

    const handleAddDoctor = (values) => {
        console.log('values: ', values)
        const newDoctor = { id: Date.now(), ...values }
        setDoctorList((prev) => [...prev, newDoctor])
        setShowModal(false)
    }

    return (
        <div className='p-4'>
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6'>
                <h1 className='text-2xl font-bold'>Doctors Management</h1>
                <button onClick={() => setShowModal(true)} className='px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition'>
                    + Add Doctor
                </button>
            </div>

            {doctorList.length > 0 ? (
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {doctorList.map((doc) => (
                        <DoctorCard key={doc.id} doctor={doc} />
                    ))}
                </div>
            ) : (
                <p className='text-gray-500'>No doctors available. Add some!</p>
            )}

            {showModal && (
                <div className='fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50'>
                    <div className='bg-white rounded-lg shadow-lg w-full max-w-lg max-h-[80vh] flex flex-col relative'>
                        <div className='flex justify-between items-center p-4 border-b'>
                            <h2 className='text-xl font-semibold'>Add Doctor</h2>
                            <button onClick={() => setShowModal(false)} className='text-gray-500 hover:text-gray-700 text-xl'>
                                ✕
                            </button>
                        </div>
                        <div className='p-6 overflow-y-auto'>
                            <DynamicForm fields={doctorFields} onSubmit={handleAddDoctor} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default DoctorsManagement
