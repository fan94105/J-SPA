import { useQuery } from "@tanstack/react-query"
import { getAppointmentsByDate as getAppointmentsByDateApi } from "../../services/apiAppointments"

export function useAppointmentsByDate(date: string) {
  const {
    data: appointmentsByDate,
    isPending: isPendingAppointmentsByDate,
    error,
  } = useQuery({
    queryKey: ["appointments", date],
    queryFn: () => getAppointmentsByDateApi(date),
  })

  if (error) throw new Error(error.message)

  return { appointmentsByDate, isPendingAppointmentsByDate }
}
