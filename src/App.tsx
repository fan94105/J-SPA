import { BrowserRouter, Route, Routes } from "react-router-dom"

import AppLayout from "./ui/AppLayout"
import Home from "./pages/Home"
import Appointment from "./pages/Appointment"
import GlobalStyles from "./styles/GlobalStyles"
import NotFound from "./pages/NotFound"
import Appointments from "./pages/Appointments"
import AppointmentDetail from "./features/appointments/AppointmentDetail"
import EditAppointment from "./pages/EditAppointment"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import ProtectedRoute from "./ui/ProtectedRoute"

import VConsole from "vconsole"
import DashboardAppointments from "./pages/DashboardAppointments"
import DashboardLayout from "./ui/DashboardLayout"
import DashboardServices from "./pages/DashboardServices"
import DashboardOptions from "./pages/DashboardOptions"
import ServiceDetail from "./features/service/ServiceDetail"

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

              <Route path="appointments" element={<DashboardAppointments />} />

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
