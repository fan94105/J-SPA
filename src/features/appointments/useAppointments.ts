import { useQuery } from "@tanstack/react-query"
import { getAppointments } from "../../services/apiAppointments"

export function useAppointments() {
  const {
    data: appointments,
    isPending: isPendingAppointments,
    error,
  } = useQuery({
    queryKey: ["appointments"],
    queryFn: getAppointments,
  })

  return { appointments, isPendingAppointments, error }
}
