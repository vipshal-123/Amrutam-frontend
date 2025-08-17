import React, { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import useFetchApi from '@/Hooks/useFetchApi'
import { bookingReleaseLock, bookingSendOtp, bookingVerify, singleDoctor } from '@/services/v1/user.service'
import isEmpty from 'is-empty'
import { getLocal, removeLocal, setLocal } from '@/utils/storage'
import moment from 'moment'
import Countdown from 'react-countdown'
import { useDispatch, useSelector } from 'react-redux'
import { openToast } from '@/redux/slice/toastSlice'

const SlotBooking = () => {
    const userData = useSelector((data) => data?.auth)
    const dispatch = useDispatch()
    const { id } = useParams()
    const memoId = useMemo(() => ({ id: id }), [id])
    const { items, setItems } = useFetchApi(singleDoctor, { requiresId: true, params: memoId })

    const doc = items
    const [locked, setLocked] = useState(null)
    const [selected, setSelected] = useState(null)
    const [otpOpen, setOtpOpen] = useState(false)
    const [otp, setOtp] = useState('')
    const [bookingConfirmed, setBookingConfirmed] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loading1, setLoading1] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const [isRelease, setIsRelease] = useState(true)

    const buttonName =
        !isRelease || (!isEmpty(selected?.lockedAt) && moment().diff(moment(selected?.lockedAt), 'minutes') < 10) ? 'Release' : 'Cancel'

    const handleLockSendOtp = async () => {
        setLoading(true)
        try {
            const payload = {
                email: userData?.email,
                availabilityId: selected?._id,
            }

            const response = await bookingSendOtp(payload)

            if (response.success) {
                setLoading(false)
                setOtpOpen(true)
                setIsRelease(false)
                setLocal('token', response.token)
                console.log(response.message)
                setItems((prev) => {
                    if (!prev || !prev.docAvailability) return prev

                    return {
                        ...prev,
                        docAvailability: prev.docAvailability.map((item) =>
                            item._id.toString() === response?._id?.toString()
                                ? {
                                      ...item,
                                      lockedAt: moment().toISOString(),
                                  }
                                : item,
                        ),
                    }
                })
                setLocked(null)
                dispatch(openToast({ message: response.message, type: 'success' }))
            } else {
                setLoading(false)
                dispatch(openToast({ message: response.message || 'Something went wrong', type: 'error' }))
            }
        } catch (error) {
            setLoading(false)
            console.error('error: ', error)
            dispatch(openToast({ message: 'Something went wrong', type: 'error' }))
        }
    }

    const handleConfirmBooking = async () => {
        try {
            setLoading2(true)
            const localToken = getLocal('token')
            const payload = {
                otp: otp,
                availabilityId: selected?._id,
                token: localToken,
                doctorId: id,
            }

            const response = await bookingVerify(payload)

            if (response.success) {
                setLoading2(false)
                removeLocal('token')
                setBookingConfirmed(true)
                setOtpOpen(false)
                setItems((prev) => {
                    if (!prev || !prev.docAvailability) return prev

                    return {
                        ...prev,
                        docAvailability: prev.docAvailability.map((item) =>
                            item._id.toString() === selected?._id?.toString()
                                ? {
                                      ...item,
                                      lockedAt: null,
                                      isLocked: true,
                                  }
                                : item,
                        ),
                    }
                })
                dispatch(openToast({ message: response.message, type: 'success' }))
            } else {
                setLoading2(false)
                dispatch(openToast({ message: response.message || 'Something went wrong', type: 'error' }))
            }
        } catch (error) {
            setLoading2(false)
            console.error('error: ', error)
            dispatch(openToast({ message: 'Something went wrong', type: 'error' }))
        }
    }

    const handleLock = (items) => {
        setLocked(items?._id)
        setSelected(items)
        const isTenMinLocked = (!isEmpty(items?.lockedAt) && moment().diff(moment(items?.lockedAt), 'minutes') < 10) || false

        if (isTenMinLocked) {
            setOtpOpen(true)
        } else {
            setOtpOpen(false)
        }
    }

    const handleReleaseLock = async (selected) => {
        const isTenMinLocked = (!isEmpty(selected?.lockedAt) && moment().diff(moment(selected?.lockedAt), 'minutes') < 10) || false

        if (!isTenMinLocked) {
            setLocked(null)
            return
        }
        setLoading1(true)

        try {
            setLoading(true)
            const localToken = getLocal('token')
            const payload = {
                token: localToken,
                availabilityId: selected?._id,
            }

            const response = await bookingReleaseLock(payload)

            if (response.success) {
                setLoading1(false)
                setLocked('null')
                setItems((prev) => {
                    if (!prev || !prev.docAvailability) return prev

                    return {
                        ...prev,
                        docAvailability: prev.docAvailability.map((item) =>
                            item._id.toString() === selected?._id?.toString()
                                ? {
                                      ...item,
                                      lockedAt: null,
                                  }
                                : item,
                        ),
                    }
                })
                setLocked(null)
                removeLocal('token')
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
        <div className='pt-16 sm:px-6 lg:px-8 bg-gray-50 min-h-screen'>
            <div className='flex flex-col lg:flex-row gap-6'>
                <div className='w-full lg:w-2/5 bg-white p-4 sm:p-6 rounded-lg shadow-md'>
                    <h2 className='text-xl font-semibold text-gray-800'>{doc.name}</h2>
                    <div className='text-sm text-gray-600'>{doc.specialization}</div>
                    <p className='mt-3 text-sm text-gray-700'>{doc.bio}</p>

                    <div className='mt-6'>
                        <h4 className='font-medium text-gray-800'>Available Slots</h4>

                        <div className='mt-3 max-h-64 overflow-y-auto pr-2'>
                            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2'>
                                {!isEmpty(items?.docAvailability) &&
                                    items?.docAvailability.map((s) => {
                                        const isLocked = locked === s._id
                                        const isTenMinLocked = (!isEmpty(s?.lockedAt) && moment().diff(moment(s?.lockedAt), 'minutes') < 10) || false
                                        const countdownEnd = moment(s?.lockedAt).add(10, 'minutes').toDate()

                                        return (
                                            <button
                                                key={s._id}
                                                onClick={() => handleLock(s)}
                                                disabled={s.isLocked}
                                                className={`text-left p-2 border rounded-md transition-colors duration-200 ${
                                                    isTenMinLocked || isLocked || s.isLocked
                                                        ? 'bg-emerald-100 border-emerald-300'
                                                        : 'bg-white hover:bg-gray-50'
                                                }`}
                                            >
                                                <div className='font-medium text-sm'>
                                                    {new Date(s.date).toLocaleDateString(undefined, {
                                                        weekday: 'short',
                                                        month: 'short',
                                                        day: 'numeric',
                                                    })}
                                                </div>
                                                <div className='flex items-center gap-2'>
                                                    <div className='text-xs'>
                                                        {new Date(s.start).toLocaleTimeString(undefined, {
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                        })}
                                                    </div>
                                                    {'-'}
                                                    <div className='text-xs'>
                                                        {new Date(s.end).toLocaleTimeString(undefined, {
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                        })}
                                                    </div>
                                                </div>

                                                {(isTenMinLocked || isLocked) && (
                                                    <div className='text-xs text-emerald-700 mt-1'>
                                                        <Countdown
                                                            key={s.lockedAt}
                                                            date={countdownEnd}
                                                            renderer={({ minutes, seconds, completed }) =>
                                                                completed ? (
                                                                    <span>10:00</span>
                                                                ) : (
                                                                    <span>
                                                                        {String(minutes || 10).padStart(2, '0')}:
                                                                        {String(seconds || 0).padStart(2, '0')}
                                                                    </span>
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                )}
                                            </button>
                                        )
                                    })}
                            </div>
                        </div>
                    </div>

                    {!isEmpty(locked) && (
                        <div className='mt-6 flex items-center gap-3'>
                            <button
                                disabled={loading}
                                onClick={() => handleLockSendOtp()}
                                className='px-4 py-2 rounded-md bg-emerald-600 text-white disabled:opacity-50 transition-opacity'
                            >
                                {loading ? 'Loading...' : 'Lock & Confirm'}
                            </button>
                            <button
                                disabled={loading1}
                                onClick={() => handleReleaseLock(selected)}
                                className='px-3 py-2 border rounded-md text-sm hover:bg-gray-100'
                            >
                                {loading1 ? 'Loading...' : buttonName}
                            </button>
                        </div>
                    )}
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
                            <strong>Slot:</strong> {locked ? new Date(selected?.start).toLocaleString() : '—'}
                        </div>
                        <div>
                            <strong>Mode:</strong> {doc?.mode?.join(', ')}
                        </div>
                    </div>

                    {otpOpen && (
                        <div className='mt-6 p-2 border rounded-md bg-gray-50'>
                            <div className='text-sm font-medium'>OTP sent to ******@gmail.com</div>
                            <p className='text-xs text-gray-500'>Please enter the OTP to confirm.</p>
                            <input
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder='Enter OTP'
                                className='mt-3 p-2 border rounded-md w-full sm:w-48'
                            />
                            <div className='mt-3'>
                                <button
                                    disabled={loading2}
                                    onClick={handleConfirmBooking}
                                    className='px-3 py-1 bg-emerald-600 text-white rounded-md text-sm'
                                >
                                    {loading2 ? 'Loading...' : 'Confirm Booking'}
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

export default SlotBooking
