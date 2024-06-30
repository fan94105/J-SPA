import { useQuery } from "@tanstack/react-query"
import { getAppointmentsByLineId } from "../../services/apiAppointments"

export function useUsersAppointments(lineId: string) {
  const {
    data: userAppointments,
    isPending: isPendingUserAppointments,
    error,
  } = useQuery({
    queryKey: ["appointments", lineId],
    queryFn: () => {
      if (lineId) return getAppointmentsByLineId(lineId)

      return Promise.resolve(null)
    },
    enabled: !!lineId,
  })

  return { userAppointments, isPendingUserAppointments, error }
}
