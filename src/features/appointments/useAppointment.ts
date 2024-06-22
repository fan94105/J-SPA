import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { getAppointment } from "../../services/apiAppointments"

export function useAppointment() {
  const { appointmentId } = useParams()

  const { data: appointment, isPending: isPendingAppointment } = useQuery({
    queryKey: ["appointment", appointmentId],
    queryFn: () => getAppointment(appointmentId!),
    retry: false,
  })

  return { appointment, isPendingAppointment }
}
