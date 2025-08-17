import React, { useMemo, useState } from 'react'
import DoctorCard from '@/components/DoctorCard'
import useFetchApi from '@/Hooks/useFetchApi'
import { doctorList, doctorSpecialization } from '@/services/v1/user.service'
import InfiniteScroll from 'react-infinite-scroll-component'
import InfiniteSelect from '@/components/InfiniteSelect'
import isEmpty from 'is-empty'

const Discovery = () => {
    const [mode, setMode] = useState('any')
    const modes = ['any', 'online', 'in-person']
    const [specialization, setSpecialization] = useState('')

    const filteredMode = mode === 'any' ? '' : mode === 'in-person' ? 'in_person' : mode
    const param = useMemo(() => ({ specFilter: specialization, type: filteredMode }), [specialization, filteredMode])
    const isId = isEmpty(param) ? false : true

    const { cursor, fetchData, hasMore, items, loading } = useFetchApi(doctorList, { requiresId: isId, params: param })
    const data = useFetchApi(doctorSpecialization, { requiresId: false })

    const handleChange = (value) => {
        console.log('value: ', value)
        setSpecialization(value)
    }

    return (
        <div className='pt-16 sm:px-6 lg:px-8 bg-gray-50 min-h-screen'>
            <div className='flex flex-col sm:flex-row justify-between mb-6 gap-4 sm:gap-0'>
                <h1 className='text-xl md:text-3xl font-bold text-gray-800'>Find Ayurvedic Doctors</h1>
            </div>

            <div className='bg-white p-4 rounded-lg shadow-md mb-6 flex flex-col md:flex-row gap-4 items-center'>
                <InfiniteSelect
                    onChange={handleChange}
                    cursor={data.cursor}
                    fetchMore={data.fetchData}
                    hasMore={data.hasMore}
                    options={data.items.map((data) => ({ value: data._id, label: data?.title }))}
                    value={specialization}
                />

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

            <InfiniteScroll
                dataLength={items.length}
                next={() => fetchData(cursor)}
                hasMore={hasMore}
                loader={loading && <div className='tw-p-2 tw-text-center tw-text-gray-500'>Loading...</div>}
                scrollThreshold='90%'
            >
                <div className='grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                    {!isEmpty(items) ? (
                        items.map((d, index) => <DoctorCard key={index} doctor={d} handleResendMail={null} />)
                    ) : (
                        <p className='text-center text-gray-500 col-span-full'>No doctors match the current filters.</p>
                    )}
                </div>
            </InfiniteScroll>
        </div>
    )
}

export default Discovery
