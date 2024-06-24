import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { getAppointment } from "../../services/apiAppointments"

export function useAppointment() {
  const { appointmentId } = useParams()

  const id = appointmentId || ""

  const { data: appointment, isPending: isPendingAppointment } = useQuery({
    queryKey: ["appointment", id],
    queryFn: () => {
      if (id) return getAppointment(id!)

      return Promise.resolve(null)
    },
    retry: false,
    enabled: !!id,
  })

  return { appointment, isPendingAppointment }
}
