import React, { useState } from 'react'
import DoctorCard from '@/components/DoctorCard'
import { doctors } from '@/data/doctors'

const Discovery = () => {
    const [mode, setMode] = useState('any')
    const [special, setSpecial] = useState('all')

    const modes = ['any', 'online', 'in-person']
    const specializations = Array.from(new Set(doctors.map((d) => d.specialization)))

    const filtered = doctors.filter((d) => {
        if (mode !== 'any' && !d.mode.includes(mode)) return false
        if (special !== 'all' && d.specialization !== special) return false
        return true
    })

    return (
        <div className='py-8 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen'>
            <div className='flex flex-col sm:flex-row items-center justify-between mb-6 gap-4 sm:gap-0'>
                <h1 className='text-2xl md:text-3xl font-bold text-gray-800'>Find Ayurvedic Doctors</h1>
                <div className='text-sm text-gray-600'>Sort: Soonest availability</div>
            </div>

            <div className='bg-white p-4 rounded-lg shadow-md mb-6 flex flex-col md:flex-row gap-4 items-center'>
                <select className='border p-2 rounded-md w-full md:w-auto' value={special} onChange={(e) => setSpecial(e.target.value)}>
                    <option value='all'>All specializations</option>
                    {specializations.map((s) => (
                        <option key={s} value={s}>
                            {s}
                        </option>
                    ))}
                </select>

                <div className='flex flex-wrap gap-2 items-center justify-center'>
                    {modes.map((m) => (
                        <button
                            key={m}
                            onClick={() => setMode(m)}
                            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 ${
                                mode === m ? 'bg-emerald-600 text-white shadow' : 'bg-gray-100 hover:bg-gray-200 border border-gray-200'
                            }`}
                        >
                            {m.charAt(0).toUpperCase() + m.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            <div className='grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'>
                {filtered.length > 0 ? (
                    filtered.map((d) => <DoctorCard key={d.id} doctor={d} />)
                ) : (
                    <p className='text-center text-gray-500 col-span-full'>No doctors match the current filters.</p>
                )}
            </div>
        </div>
    )
}

export default Discovery
