import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { doctors } from '@/data/doctors'

const sampleAppts = [
  { id: 'a1', doctor: doctors[0], datetime: '2025-08-15T10:00:00', status: 'Booked' },
  { id: 'a2', doctor: doctors[1], datetime: '2025-07-20T09:00:00', status: 'Completed' },
  { id: 'a3', doctor: doctors[2], datetime: '2025-08-18T09:00:00', status: 'Cancelled' },
]

export default function Dashboard(){
  const [tab, setTab] = useState('upcoming')
  const [statusFilter, setStatusFilter] = useState('All')

  const list = sampleAppts.filter(a=>{
    if(tab==='upcoming') return new Date(a.datetime) >= new Date()
    return new Date(a.datetime) < new Date()
  }).filter(a=> statusFilter==='All' ? true : a.status === statusFilter)

  return (
    <div className='py-8'>
      <div className='flex items-center justify-between mb-6'>
        <h1 className='text-2xl font-bold'>My Appointments</h1>
        <div className='flex gap-2'>
          <button onClick={()=>setTab('upcoming')} className={`px-3 py-1 rounded ${tab==='upcoming' ? 'bg-emerald-600 text-white' : 'border'}`}>Upcoming</button>
          <button onClick={()=>setTab('past')} className={`px-3 py-1 rounded ${tab==='past' ? 'bg-emerald-600 text-white' : 'border'}`}>Past</button>
        </div>
      </div>

      <div className='mb-4 flex items-center gap-4'>
        <select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)} className='border p-2 rounded'>
          <option>All</option>
          <option>Booked</option>
          <option>Completed</option>
          <option>Cancelled</option>
        </select>
      </div>

      <div className='space-y-3'>
        {list.map(a=>(
          <div key={a.id} className='bg-white p-4 rounded shadow flex items-center justify-between'>
            <div>
              <div className='font-semibold'>{a.doctor.name} <span className='text-sm text-gray-600'>• {a.doctor.specialization}</span></div>
              <div className='text-sm text-gray-600'>{new Date(a.datetime).toLocaleString()}</div>
            </div>
            <div className='flex items-center gap-3'>
              <div className='text-sm px-3 py-1 rounded border'>{a.status}</div>
              {a.status === 'Booked' && (
                <>
                  <Link to={'/reschedule/' + a.id} className='px-3 py-1 border rounded'>Reschedule</Link>
                  <button className='px-3 py-1 border rounded'>Cancel</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
