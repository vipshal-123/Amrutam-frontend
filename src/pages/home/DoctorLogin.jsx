import React from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'

const locales = { 'en-US': enUS }
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales })

const events = [
  { id:1, title: 'Available', start: new Date('2025-08-13T09:00:00'), end: new Date('2025-08-13T12:00:00') },
  { id:2, title: 'Available', start: new Date('2025-08-14T13:00:00'), end: new Date('2025-08-14T17:00:00') },
]

export default function DoctorLogin(){
  return (
    <div className='py-8'>
      <h1 className='text-2xl font-bold mb-4'>Doctor Calendar</h1>
      <div className='bg-white p-4 rounded shadow'>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor='start'
          endAccessor='end'
          style={{ height: 500 }}
        />
      </div>
    </div>
  )
}
