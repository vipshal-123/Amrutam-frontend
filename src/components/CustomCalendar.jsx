const CustomCalendar = ({ events, onSelectSlot, onSelectEvent, currentDate, setCurrentDate }) => {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    const daysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
    const firstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay()

    const handlePrevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
    const handleNextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
    const handleToday = () => setCurrentDate(new Date())

    const getEventsForDate = (date) => {
        return events.filter((event) => {
            const eventDate = new Date(event.start)
            return (
                eventDate.getDate() === date &&
                eventDate.getMonth() === currentDate.getMonth() &&
                eventDate.getFullYear() === currentDate.getFullYear()
            )
        })
    }

    const handleDateClick = (day) => {
        const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
        const dayEvents = getEventsForDate(day)

        if (dayEvents.length > 0) {
            onSelectEvent(dayEvents[0])
        } else {
            onSelectSlot({ slots: [clickedDate] })
        }
    }

    const renderCalendar = () => {
        const daysCount = daysInMonth(currentDate)
        const firstDay = firstDayOfMonth(currentDate)
        const days = []

        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className='p-2'></div>)
        }

        for (let day = 1; day <= daysCount; day++) {
            const dayEvents = getEventsForDate(day)
            const isToday =
                new Date().getDate() === day &&
                new Date().getMonth() === currentDate.getMonth() &&
                new Date().getFullYear() === currentDate.getFullYear()

            days.push(
                <div
                    key={day}
                    className={`p-2 border border-gray-200 cursor-pointer hover:bg-gray-50 min-h-[70px] sm:min-h-[90px] 
                        ${isToday ? 'bg-blue-50 border-blue-300' : ''}`}
                    onClick={() => handleDateClick(day)}
                >
                    <div className={`font-medium text-xs sm:text-sm ${isToday ? 'text-blue-600' : 'text-gray-900'}`}>{day}</div>
                    <div className='mt-1 space-y-1'>
                        {dayEvents.map((event) => (
                            <div
                                key={event.id}
                                className='text-[10px] sm:text-xs bg-green-100 text-green-800 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded truncate'
                                onClick={(e) => {
                                    e.stopPropagation()
                                    onSelectEvent(event)
                                }}
                            >
                                {new Date(event.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -{' '}
                                {new Date(event.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                        ))}
                    </div>
                </div>,
            )
        }

        return days
    }

    return (
        <div className='bg-white rounded-lg shadow-md overflow-x-auto'>
            <div className='flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 p-1 sm:p-4 rounded-t-lg border-b'>
                <div className='flex items-center gap-2'>
                    <button
                        type='button'
                        onClick={handlePrevMonth}
                        className='px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-100'
                    >
                        Back
                    </button>
                    <button
                        type='button'
                        onClick={handleToday}
                        className='px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-100'
                    >
                        Today
                    </button>
                    <button
                        type='button'
                        onClick={handleNextMonth}
                        className='px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-100'
                    >
                        Next
                    </button>
                </div>
                <div className='text-lg sm:text-xl font-bold text-gray-800 text-center sm:text-right'>
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </div>
            </div>

            <div className='grid grid-cols-7 min-w-[600px] bg-gray-50 border-b'>
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className='p-2 text-center font-medium text-gray-600 text-xs sm:text-sm'>
                        {day}
                    </div>
                ))}
            </div>

            <div className='grid grid-cols-7 min-w-[600px]'>{renderCalendar()}</div>
        </div>
    )
}

export default CustomCalendar
