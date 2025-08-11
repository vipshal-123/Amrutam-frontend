import MainLayout from '@/Layout/MainLayout'
import { Routes, Route } from 'react-router-dom'
import Landing from '@/pages/landing/Landing'
import SignIn from '@/pages/auth/SignIn'
import SignUp from '@/pages/auth/SignUp'
import Discovery from '@/pages/home/DoctorDiscovery'
import Booking from '@/pages/home/SlotBooking'
import Dashboard from '@/pages/dashboard/AppointmentDashboard'
import Reschedule from '@/pages/home/Reschedule'
import DoctorLogin from '@/pages/home/DoctorLogin'

const App = () => {
    return (
        <>
            <MainLayout>
                <Routes>
                    <Route path='/' element={<Landing />} />
                    <Route path='/signin' element={<SignIn />} />
                    <Route path='/signup' element={<SignUp />} />
                    <Route path='/home' element={<Discovery />} />
                    <Route path='/book/:id' element={<Booking />} />
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/reschedule/:apptId' element={<Reschedule />} />
                    <Route path='/doctor' element={<DoctorLogin />} />
                </Routes>
            </MainLayout>
        </>
    )
}

export default App
