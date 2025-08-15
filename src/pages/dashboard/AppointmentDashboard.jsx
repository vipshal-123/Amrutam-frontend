import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import useFetchApi from '@/Hooks/useFetchApi'
import { bookings, cancelBooking } from '@/services/v1/user.service'
import isEmpty from 'is-empty'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useDispatch } from 'react-redux'
import { openToast } from '@/redux/slice/toastSlice'

const Dashboard = () => {
    const dispatch = useDispatch()
    const [tab, setTab] = useState('upcoming')
    const [statusFilter, setStatusFilter] = useState('All')
    const [showCancelConfirm, setShowCancelConfirm] = useState(false)
    const [id, setId] = useState('')
    const [loading1, setLoading1] = useState(false)

    const filter = statusFilter === 'Cancelled' ? 'cancel' : statusFilter === 'Booked' ? 'book' : ''
    const timeFilter = tab === 'past' ? 'past' : ''
    const isId = isEmpty(filter) ? false : true

    const param = useMemo(() => ({ type: filter, timeline: timeFilter }), [filter, timeFilter])

    const { cursor, fetchData, hasMore, items, loading, setItems } = useFetchApi(bookings, { requiresId: isId, params: param })

    const handleShowCancel = (id) => {
        setShowCancelConfirm(true)
        setId(id)
    }

    const handleCancelConfirmed = async () => {
        if (isEmpty(id)) {
            return
        }
        setLoading1(true)
        try {
            const payload = {
                slotId: id,
            }

            const response = await cancelBooking(payload)

            if (response.success) {
                setItems((prev) => {
                    return prev.map((data) =>
                        data?._id === id
                            ? {
                                  ...data,
                                  status: 'cancelled',
                              }
                            : data,
                    )
                })
                setLoading1(false)
                setShowCancelConfirm(false)
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
        <div className='py-8'>
            <div className='flex items-center justify-between mb-6'>
                <h1 className='text-2xl font-bold'>My Appointments</h1>
                <div className='flex gap-2'>
                    <button
                        onClick={() => setTab('upcoming')}
                        className={`px-3 py-1 rounded ${tab === 'upcoming' ? 'bg-emerald-600 text-white' : 'border'}`}
                    >
                        Upcoming
                    </button>
                    <button onClick={() => setTab('past')} className={`px-3 py-1 rounded ${tab === 'past' ? 'bg-emerald-600 text-white' : 'border'}`}>
                        Past
                    </button>
                </div>
            </div>

            <div className='mb-4 flex items-center gap-4'>
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className='border p-2 rounded'>
                    <option>All</option>
                    <option>Booked</option>
                    <option>Cancelled</option>
                </select>
            </div>

            <div
                id='scrollableDashboard'
                className='tw-h-[600px] tw-overflow-y-auto tw-p-2 tw-border tw-border-gray-200 tw-rounded-lg'
                style={{ minHeight: '600px', maxHeight: '600px', overflowY: 'auto' }}
            >
                <InfiniteScroll
                    dataLength={items.length}
                    next={() => fetchData(cursor)}
                    hasMore={hasMore}
                    loader={loading && <div className='tw-p-2 tw-text-center tw-text-gray-500'>Loading...</div>}
                    scrollableTarget='scrollableDashboard'
                    scrollThreshold='90%'
                >
                    {!isEmpty(items) ? (
                        <div className='space-y-3'>
                            {items.map((a) => (
                                <div key={a._id} className='bg-white p-4 rounded shadow flex items-center justify-between'>
                                    <div>
                                        <div className='font-semibold'>
                                            {a.name} <span className='text-sm text-gray-600'>• {a.specialization}</span>
                                        </div>
                                        <div className='text-sm text-gray-600'>{new Date(a.start).toLocaleString()}</div>
                                    </div>
                                    <div className='flex items-center gap-3'>
                                        <div className='text-sm px-3 capitalize py-1 rounded border'>{a.status}</div>
                                        {a.status === 'booked' && (
                                            <>
                                                <Link to={'/reschedule/' + a._id + '/' + a.doctorId} className='px-3 py-1 border rounded'>
                                                    Reschedule
                                                </Link>
                                                <button onClick={() => handleShowCancel(a._id)} className='px-3 py-1 border rounded'>
                                                    Cancel
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className='text-gray-500'>No appointments found.</p>
                    )}
                </InfiniteScroll>
            </div>

            {showCancelConfirm && (
                <div className='fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50'>
                    <div className='bg-white rounded-lg shadow-lg max-w-sm w-full p-6'>
                        <h3 className='text-lg font-semibold text-gray-800'>Cancel Appointment?</h3>
                        <p className='mt-2 text-sm text-gray-600'>Are you sure you want to cancel this appointment?</p>
                        <div className='mt-4 flex justify-end gap-3'>
                            <button
                                onClick={() => setShowCancelConfirm(false)}
                                className='px-4 py-2 text-sm bg-gray-100 rounded-md hover:bg-gray-200'
                            >
                                No, Keep it
                            </button>
                            <button onClick={handleCancelConfirmed} className='px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700'>
                                {loading1 ? 'Loading...' : 'Yes, Cancel'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Dashboard
