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
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
