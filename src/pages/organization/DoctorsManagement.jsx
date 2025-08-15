import React, { useState } from 'react'
import DynamicForm from '@/components/DynamicForm'
import DoctorCard from '@/components/DoctorCard'
import useFetchApi from '@/Hooks/useFetchApi'
import { doctorList } from '@/services/v1/organization.service'
import isEmpty from 'is-empty'
import { addDoctor, addDoctorResendMail } from '@/services/auth/organization.service'
import InfiniteScroll from 'react-infinite-scroll-component'
import { doctorSpecialization } from '@/services/v1/user.service'
import { openToast } from '@/redux/slice/toastSlice'
import { useDispatch } from 'react-redux'

const DoctorsManagement = () => {
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)
    const [loading1, setLoading1] = useState(false)
    const { cursor, fetchData, hasMore, items, loading, setItems } = useFetchApi(doctorList, { requiresId: false })
    const data = useFetchApi(doctorSpecialization, { requiresId: false })

    const doctorFields = [
        { name: 'email', label: 'E-mail', type: 'text', required: true },
        { name: 'name', label: 'Full Name', type: 'text', required: true },
        {
            name: 'specialization',
            label: 'Specialization',
            as: 'infinite_select',
            multiple: true,
            initialValue: [],
            options: data.items.map((data) => ({ value: data._id, label: data?.title })),
        },
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
            ],
        },
        { name: 'contact', label: 'Contact Number', type: 'text', required: true },
        { name: 'bio', label: 'Bio', as: 'textarea', rows: 4 },
    ]

    const handleAddDoctor = async (values) => {
        console.log('values: ', values)
        setLoading1(true)
        try {
            const response = await addDoctor(values)

            if (response.success) {
                setLoading1(false)
                const newDoctor = { _id: response?._id, specialization: response?.specialization, status: 'pending', ...values }
                setItems((prev) => [...prev, newDoctor])
                setShowModal(false)
                dispatch(openToast({ message: response.message, type: 'success' }))
            } else {
                setLoading1(false)
                dispatch(openToast({ message: response.message || 'Something went wrong', type: 'error' }))
            }
        } catch (error) {
            setLoading1(false)
            console.error('error: ', error)
            dispatch(openToast({ message: 'Something went wrong', type: 'error' }))
        }
    }

    const handleResendMail = async (payload) => {
        try {
            setLoading1(true)
            const response = await addDoctorResendMail(payload)

            if (response.success) {
                setLoading1(false)
                dispatch(openToast({ message: response.message, type: 'success' }))
            } else {
                setLoading1(false)
                dispatch(openToast({ message: response.message || 'Something went wrong', type: 'error' }))
            }
        } catch (error) {
            setLoading1(false)
            console.error('error: ', error)
            dispatch(openToast({ message: 'Something went wrong', type: 'error' }))
        }
    }

    return (
        <div className='py-4'>
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6'>
                <h1 className='text-2xl font-bold'>Doctors Management</h1>
                <button onClick={() => setShowModal(true)} className='px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition'>
                    + Add Doctor
                </button>
            </div>
            <div
                id='scrollable'
                className='tw-h-[400px] tw-overflow-y-auto tw-p-2 tw-border tw-border-gray-200 tw-rounded-lg tw-relative'
                style={{ maxHeight: '400px', overflowY: 'auto' }}
            >
                <InfiniteScroll
                    dataLength={items.length}
                    next={() => fetchData(cursor)}
                    hasMore={hasMore}
                    loader={loading && <div className='tw-p-2 tw-text-center tw-text-gray-500'>Loading...</div>}
                    scrollableTarget='scrollable'
                    scrollThreshold='90%'
                >
                    {!isEmpty(items) ? (
                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                            {items.map((doc, index) => (
                                <DoctorCard key={index} doctor={doc} handleResendMail={handleResendMail} loading1={loading1} />
                            ))}
                        </div>
                    ) : (
                        <p className='text-gray-500'>No doctors available. Add some!</p>
                    )}
                </InfiniteScroll>
            </div>
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
                            <DynamicForm fields={doctorFields} onSubmit={handleAddDoctor} infiniteData={data} loading1={loading1} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default DoctorsManagement
