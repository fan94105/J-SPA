import { BrowserRouter, Route, Routes } from "react-router-dom"
import VConsole from "vconsole"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { Toaster } from "react-hot-toast"

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
import Settings from "./pages/Settings"
import Users from "./pages/Users"
import AppointmentDetail from "./features/appointments/AppointmentDetail"
import ServiceDetail from "./features/service/ServiceDetail"

import { LiffContextProvider } from "./context/LiffContext"

import GlobalStyles from "./styles/GlobalStyles"
import Account from "./pages/Account"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
})

function App() {
  const vConsole = new VConsole()

  // close vConsole
  vConsole.destroy()
  return (
    <>
      <LiffContextProvider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />

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

                  <Route
                    path="check/:appointmentId"
                    element={<DashboardCheck />}
                  />

                  <Route
                    path="appointments"
                    element={<DashboardAppointments />}
                  />

                  <Route
                    path="appointments/:appointmentId"
                    element={<DashboardAppointmentDetail />}
                  />

                  <Route path="services" element={<DashboardServices />} />

                  <Route
                    path="services/:serviceId"
                    element={<ServiceDetail />}
                  />

                  <Route path="options" element={<DashboardOptions />} />

                  <Route path="settings" element={<Settings />} />

                  <Route path="users" element={<Users />} />

                  <Route path="account" element={<Account />} />
                </Route>

                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>

          <Toaster
            position="top-center"
            gutter={12}
            containerStyle={{ margin: "8px" }}
            toastOptions={{
              success: {
                duration: 3000,
              },
              error: {
                duration: 5000,
              },
              style: {
                fontSize: "16px",
                maxWidth: "500px",
                padding: "16px 24px",
                backgroundColor: "var(--color-grey-0)",
                color: "var(--color-grey-700)",
              },
            }}
          />
        </QueryClientProvider>
      </LiffContextProvider>
    </>
  )
}

export default App
