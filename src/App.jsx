import MainLayout from '@/Layout/MainLayout'
import { Routes, Route } from 'react-router-dom'
import Landing from './pages/landing/Landing'
import SignIn from './pages/auth/SignIn'
import SignUp from './pages/auth/SignUp'
import Discovery from './pages/home/DoctorDiscovery'
import Dashboard from './pages/dashboard/AppointmentDashboard'
import Reschedule from './pages/home/Reschedule'
import CreateOrganization from './pages/organization/Organization'
import OtpVerification from './pages/auth/OtpVerification'
import OrgOtpVerify from './pages/organization/OrgOtpVerify'
import DoctorsManagement from './pages/organization/DoctorsManagement'
import DocCreatePassword from './pages/auth/DocCreatePassword'
import DocAndOrgSigningPage from './pages/auth/DocAndOrgSigningPage'
import OrgAdminOtpVerification from './pages/auth/OrgAdminOtpVerification'
import CreatePassword from './pages/auth/CreatePassword'
import { ROLES } from './constants/enums'
import ProtectedRoute from './utils/ProtectedRoute'
import OpenRoute from './utils/OpenRoute'
import SlotBooking from './pages/home/SlotBooking'
import PatientList from './pages/home/PatientList'
import DoctorCalendar from './pages/home/DoctorCalendar'

const App = () => {
    return (
        <>
            <MainLayout>
                <Routes>
                    <Route path='/' element={<Landing />} />

                    <Route element={<OpenRoute />}>
                        <Route path='/signin' element={<SignIn />} />
                        <Route path='/signup' element={<SignUp />} />
                        <Route path='/create-org' element={<CreateOrganization />} />
                        <Route path='/create-org/verify-otp' element={<OrgOtpVerify />} />
                        <Route path='/doc-create-password' element={<DocCreatePassword />} />
                        <Route path='/administrative-signin' element={<DocAndOrgSigningPage />} />
                        <Route path='/admin-verify-otp' element={<OrgAdminOtpVerification />} />
                        <Route path='/verify-otp' element={<OtpVerification />} />
                        <Route path='/create-password' element={<CreatePassword />} />
                    </Route>

                    <Route element={<ProtectedRoute allowedRoles={[ROLES.USER]} />}>
                        <Route path='/home' element={<Discovery />} />
                        <Route path='/book/:id' element={<SlotBooking />} />
                        <Route path='/dashboard' element={<Dashboard />} />
                        <Route path='/reschedule/:apptId/:docId/:time' element={<Reschedule />} />
                    </Route>

                    <Route element={<ProtectedRoute allowedRoles={[ROLES.DOCTOR]} />}>
                        <Route path='/doctor' element={<DoctorCalendar />} />
                        <Route path='/patient-list' element={<PatientList />} />
                    </Route>

                    <Route element={<ProtectedRoute allowedRoles={ROLES.ORG_ADMIN} />}>
                        <Route path='/manage-doctors' element={<DoctorsManagement />} />
                    </Route>
                </Routes>
            </MainLayout>
        </>
    )
}

export default App
