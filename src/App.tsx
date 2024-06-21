import { BrowserRouter, Route, Routes } from "react-router-dom"

import AppLayout from "./ui/AppLayout"
import Home from "./pages/Home"
import Service from "./pages/Service"
import Appointment from "./pages/Appointment"
import GlobalStyles from "./styles/GlobalStyles"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./ui/ProtectedRoute"
import Appointments from "./pages/Appointments"
import AppointmentDetail from "./features/appointments/AppointmentDetail"

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />

            <Route
              path="appointment"
              element={
                <ProtectedRoute>
                  <Appointment />
                </ProtectedRoute>
              }
            />

            <Route
              path="appointments"
              element={
                <ProtectedRoute>
                  <Appointments />
                </ProtectedRoute>
              }
            />

            <Route
              path="appointments/:appointmentId"
              element={
                <ProtectedRoute>
                  <AppointmentDetail />
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
