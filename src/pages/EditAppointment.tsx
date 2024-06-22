import React from "react"
import AppointmentForm from "../features/appointments/AppointmentForm"
import { useAppointment } from "../features/appointments/useAppointment"
import Spinner from "../ui/Spinner"

function EditAppointment() {
  const { appointment, isPendingAppointment } = useAppointment()

  if (isPendingAppointment) return <Spinner />

  return (
    <>
      <AppointmentForm appointmentToEdit={appointment} />
    </>
  )
}

export default EditAppointment
