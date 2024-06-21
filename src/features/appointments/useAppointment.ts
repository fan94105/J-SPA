import { useQuery } from "@tanstack/react-query"
import { useParams, useSearchParams } from "react-router-dom"
import { getAppointment } from "../../services/apiAppointments"

export function useAppointment() {
  const { appointmentId } = useParams()

  const [searchParams] = useSearchParams()

  const editAppointmentId = searchParams.get("editId")

  const id = appointmentId || editAppointmentId

  if (!id) return {}

  const { data: appointment, isPending: isPendingAppointment } = useQuery({
    queryKey: ["appointment", id],
    queryFn: () => getAppointment(id!),
    retry: false,
  })

  return { appointment, isPendingAppointment }
}
