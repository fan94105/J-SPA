import { BrowserRouter, Route, Routes } from "react-router-dom"
import VConsole from "vconsole"

import AppLayout from "./ui/AppLayout"
import ProtectedRoute from "./ui/ProtectedRoute"
import DashboardLayout from "./ui/DashboardLayout"
import Home from "./pages/Home"
import Appointment from "./pages/Appointment"
import NotFound from "./pages/NotFound"
import Appointments from "./pages/Appointments"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import EditAppointment from "./pages/EditAppointment"
import DashboardAppointments from "./pages/DashboardAppointments"
import DashboardServices from "./pages/DashboardServices"
import DashboardOptions from "./pages/DashboardOptions"
import DashboardCheck from "./pages/DashboardCheck"
import DashboardAppointmentDetail from "./pages/DashboardAppointmentDetail"
import AppointmentDetail from "./features/appointments/AppointmentDetail"
import ServiceDetail from "./features/service/ServiceDetail"

import GlobalStyles from "./styles/GlobalStyles"

function App() {
  const vConsole = new VConsole()

  // close vConsole
  vConsole.destroy()

  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />

            <Route path="appointment" element={<Appointment />} />

            <Route path="appointments" element={<Appointments />} />

            <Route
              path="appointments/:appointmentId"
              element={<AppointmentDetail />}
            />

            <Route
              path="appointments/edit/:appointmentId"
              element={<EditAppointment />}
            />

            <Route path="login" element={<Login />} />

            <Route
              path="dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />

              <Route path="check/:appointmentId" element={<DashboardCheck />} />

              <Route path="appointments" element={<DashboardAppointments />} />

              <Route
                path="appointments/:appointmentId"
                element={<DashboardAppointmentDetail />}
              />

              <Route path="services" element={<DashboardServices />} />

              <Route path="services/:serviceId" element={<ServiceDetail />} />

              <Route path="options" element={<DashboardOptions />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
