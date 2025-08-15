import CustomCalendar from '@/components/CustomCalendar'
import useFetchApi from '@/Hooks/useFetchApi'
import { openToast } from '@/redux/slice/toastSlice'
import { doctorAvailability, getDoctorAvailability, updateDoctorAvailability } from '@/services/v1/organization.service'
import { transformApiDataToEvents } from '@/utils/reuseableFunctions'
import isEmpty from 'is-empty'
import moment from 'moment'
import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'

const DoctorLogin = () => {
    const dispatch = useDispatch()
    const [events, setEvents] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedSlots, setSelectedSlots] = useState([])
    const [editingEvent, setEditingEvent] = useState(null)
    const [currentDate, setCurrentDate] = useState(moment().toDate())
    const [timeSlots, setTimeSlots] = useState([{ start: '09:00', end: '17:00', patientCount: 10 }])
    const { items } = useFetchApi(getDoctorAvailability, { requiresId: false })
    const formattedEvents = transformApiDataToEvents(items)
    const [loading, setLoading] = useState(false)
    const isEventAdded = useRef(true)

    if (isEventAdded?.current && !isEmpty(formattedEvents)) {
        setEvents(formattedEvents)
        isEventAdded.current = false
    }
    console.log('events: ', events)

    const formatDate = (date) => {
        if (!isEmpty(date)) return date.toISOString().split('T')[0]
    }

    const addTimeSlot = () => {
        setTimeSlots([...timeSlots, { start: '09:00', end: '10:00', patientCount: 5 }])
    }

    const removeTimeSlot = (index) => {
        const newTimeSlots = timeSlots.filter((_, i) => i !== index)
        setTimeSlots(newTimeSlots)
    }

    const handleTimeSlotChange = (index, field, value) => {
        const newTimeSlots = [...timeSlots]
        newTimeSlots[index][field] = value
        setTimeSlots(newTimeSlots)
    }

    const handleSelectSlot = (slotInfo) => {
        setEditingEvent(null)
        setSelectedSlots(slotInfo.slots)
        setTimeSlots([{ start: '09:00', end: '17:00', patientCount: 10 }])
        setIsModalOpen(true)
    }

    const handleSelectEvent = (event) => {
        setEditingEvent(event)
        const eventDay = formatDate(event.start)
        const eventsForDay = events
            .filter((e) => formatDate(e.start) === eventDay)
            .sort((a, b) => moment(a.start).toDate() - moment(b.start).toDate())

        setTimeSlots(
            eventsForDay.map((e) => ({
                start: moment(e.start).format('HH:mm'),
                end: moment(e.end).format('HH:mm'),
                patientCount: e.patientCount || 0,
            })),
        )

        setIsModalOpen(true)
    }

    const handleSave = async () => {
        setLoading(true)
        if (editingEvent) {
            const eventDay = formatDate(editingEvent.start)
            const otherEvents = events.filter((e) => formatDate(e.start) !== eventDay)

            const newEventsForDay = timeSlots.map((slot) => {
                const [startHour, startMinute] = slot.start.split(':')
                const [endHour, endMinute] = slot.end.split(':')
                const newStartDate = moment(editingEvent.start).toDate()
                newStartDate.setHours(startHour, startMinute, 0, 0)
                const newEndDate = moment(editingEvent.start).toDate()
                newEndDate.setHours(endHour, endMinute, 0, 0)
                if (newEndDate > newStartDate) {
                    return {
                        id: Math.random(),
                        title: 'Available',
                        start: newStartDate,
                        end: newEndDate,
                        // patientCount: parseInt(slot.patientCount, 10) || 0,
                    }
                }
                return {}
            })

            try {
                const payload = {
                    date: moment(editingEvent.start).toDate(),
                    event: newEventsForDay,
                }
                const response = await updateDoctorAvailability(payload)

                if (response.success) {
                    setLoading(false)
                    setEvents([...otherEvents, ...newEventsForDay])
                    console.log(response.message)
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
        } else {
            const newEvents = []
            selectedSlots.forEach((date) => {
                timeSlots.forEach((slot) => {
                    const [startHour, startMinute] = slot.start.split(':')
                    const [endHour, endMinute] = slot.end.split(':')
                    const newStartDate = moment(date).toDate()
                    newStartDate.setHours(startHour, startMinute, 0, 0)
                    const newEndDate = moment(date).toDate()
                    newEndDate.setHours(endHour, endMinute, 0, 0)
                    if (newEndDate > newStartDate) {
                        newEvents.push({
                            id: Math.random(),
                            title: 'Available',
                            start: newStartDate,
                            end: newEndDate,
                            // patientCount: parseInt(slot.patientCount, 10) || 1,
                        })
                    }
                })
            })

            try {
                if (!isEmpty(newEvents)) {
                    const payload = {
                        date: moment(newEvents[0].start).toDate(),
                        event: newEvents,
                    }
                    const response = await doctorAvailability(payload)

                    if (response.success) {
                        setLoading(false)
                        setEvents((prevEvents) => [...prevEvents, ...newEvents])
                        console.log(response.message)
                        dispatch(openToast({ message: response.message, type: 'success' }))
                    } else {
                        setLoading(false)
                        dispatch(openToast({ message: response.message || 'Something went wrong', type: 'error' }))
                    }
                }
            } catch (error) {
                console.error('error: ', error)
                dispatch(openToast({ message: 'Something went wrong', type: 'error' }))
            }
        }
        closeModal()
    }

    const handleDelete = () => {
        if (editingEvent) {
            const eventDay = formatDate(editingEvent.start)
            const remainingEvents = events.filter((e) => formatDate(e.start) !== eventDay)
            setEvents(remainingEvents)
            closeModal()
        }
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setSelectedSlots([])
        setEditingEvent(null)
        setTimeSlots([{ start: '09:00', end: '17:00', patientCount: 10 }])
    }

    const buttonText = editingEvent ? 'Update' : 'Save'

    return (
        <div className='py-8 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen'>
            <div className='max-w-6xl mx-auto'>
                <h1 className='text-2xl sm:text-3xl font-bold mb-4 text-gray-800'>Doctor Calendar</h1>
                <p className='text-sm text-gray-600 mb-4'>
                    Click any date to edit or delete all slots for that day. Drag on empty slots to add new availability.
                </p>
                <div className='bg-white p-4 rounded-lg shadow-md'>
                    <CustomCalendar
                        events={events}
                        onSelectSlot={handleSelectSlot}
                        onSelectEvent={handleSelectEvent}
                        currentDate={currentDate}
                        setCurrentDate={setCurrentDate}
                    />
                </div>
            </div>

            {isModalOpen && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4'>
                    <div className='bg-white rounded-lg shadow-xl p-6 w-full max-w-lg'>
                        {' '}
                        <h3 className='text-xl font-semibold mb-4 text-gray-800'>{editingEvent ? 'Edit Availability' : 'Mark Availability'}</h3>
                        <p className='text-sm text-gray-600 mb-4'>
                            For date(s):{' '}
                            <strong>
                                {editingEvent
                                    ? editingEvent.start.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                                    : `${
                                          selectedSlots.length > 0
                                              ? selectedSlots[0].toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                                              : ''
                                      }${
                                          selectedSlots.length > 1
                                              ? ` to ${selectedSlots[selectedSlots.length - 1].toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}`
                                              : ''
                                      }`}
                            </strong>
                        </p>
                        <div className='space-y-3 max-h-60 overflow-y-auto pr-2'>
                            {timeSlots.map((slot, index) => (
                                <div key={index} className='grid grid-cols-1 md:grid-cols-4 items-center gap-2'>
                                    <input
                                        type='time'
                                        value={slot.start}
                                        onChange={(e) => handleTimeSlotChange(index, 'start', e.target.value)}
                                        className='w-full p-2 border rounded-md'
                                    />
                                    <span className='text-center'>to</span>
                                    <input
                                        type='time'
                                        value={slot.end}
                                        onChange={(e) => handleTimeSlotChange(index, 'end', e.target.value)}
                                        className='w-full p-2 border rounded-md'
                                    />
                                    <div className='flex items-center gap-2'>
                                        {/* <input
                                            type='number'
                                            placeholder='Count'
                                            value={slot.patientCount}
                                            onChange={(e) => handleTimeSlotChange(index, 'patientCount', e.target.value)}
                                            className='w-full p-2 border rounded-md'
                                        /> */}
                                        <button onClick={() => removeTimeSlot(index)} className='p-2 text-red-500 hover:bg-red-100 rounded-full'>
                                            <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
                                                <path
                                                    fillRule='evenodd'
                                                    d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
                                                    clipRule='evenodd'
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button onClick={addTimeSlot} className='mt-3 text-sm text-emerald-600 font-semibold hover:text-emerald-800'>
                            + Add another time slot
                        </button>
                        <div className='mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-3'>
                            {editingEvent && (
                                <button
                                    onClick={handleDelete}
                                    className='w-full sm:w-auto px-4 py-2 bg-red-600 text-white rounded-md font-semibold hover:bg-red-700 mr-auto'
                                >
                                    Delete All For This Day
                                </button>
                            )}
                            <button onClick={closeModal} className='w-full sm:w-auto px-4 py-2 border rounded-md font-medium'>
                                Cancel
                            </button>
                            <button onClick={handleSave} className='w-full sm:w-auto px-4 py-2 bg-emerald-600 text-white rounded-md font-semibold'>
                                {loading ? 'Loading...' : buttonText}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default DoctorLogin
