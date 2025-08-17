import { User, Calendar, Phone, Mail } from 'lucide-react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { getPatientList } from '@/services/v1/user.service'
import useFetchApi from '@/Hooks/useFetchApi'
import moment from 'moment'

export default function PatientList() {
    const { cursor, fetchData, hasMore, items: patients, loading } = useFetchApi(getPatientList, { requiresId: false })

    return (
        <div className='w-full pt-16'>
            <h2 className='text-xl font-semibold mb-4'>Patient List</h2>

            <InfiniteScroll
                dataLength={patients.length}
                next={() => fetchData(cursor)}
                hasMore={hasMore}
                loader={loading && <div className='p-2 text-center text-gray-500'>Loading...</div>}
                scrollThreshold='90%'
            >
                {patients.length > 0 ? (
                    <>
                        <div className='hidden md:block overflow-x-auto'>
                            <table className='w-full border-collapse bg-white shadow rounded-xl overflow-hidden'>
                                <thead>
                                    <tr className='bg-gray-100 text-left text-gray-600'>
                                        <th className='p-3'>Name</th>
                                        <th className='p-3'>Appointment Date</th>
                                        <th className='p-3'>Start Time</th>
                                        <th className='p-3'>End Time</th>
                                        <th className='p-3'>Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {patients.map((patient) => (
                                        <tr key={patient._id} className='border-t hover:bg-gray-50 transition'>
                                            <td className='p-3 font-medium'>{patient.name}</td>
                                            <td className='p-3'>{moment(patient.date).format('YYYY-MM-DD')}</td>
                                            <td className='p-3'>{moment(patient?.start).format('HH:mm A')}</td>
                                            <td className='p-3'>{moment(patient?.end).format('HH:mm A')}</td>
                                            <td className='p-3'>{patient.email}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className='grid gap-4 md:hidden mt-4'>
                            {patients.map((patient) => (
                                <div key={patient._id} className='bg-white shadow rounded-xl p-4 space-y-2'>
                                    <div className='flex items-center gap-2 font-semibold text-lg'>
                                        <User size={18} />
                                        {patient.name}
                                    </div>
                                    <div className='flex items-center gap-2 text-gray-600 text-sm'>
                                        <Calendar size={16} />
                                        Appointment: {moment(patient.date).format('YYYY-MM-DD')}
                                    </div>
                                    <div className='flex items-center gap-2 text-gray-600 text-sm'>
                                        Start Time: {moment(patient?.start).format('HH:mm A')}
                                    </div>

                                    <div className='text-sm text-gray-500'>End Time: {moment(patient?.end).format('HH:mm A')}</div>
                                    <div className='flex items-center gap-2 text-gray-600 text-sm'>
                                        <Mail size={16} />
                                        {patient.email}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <p className='text-gray-500 text-center'>No patients found.</p>
                )}
            </InfiniteScroll>
        </div>
    )
}
