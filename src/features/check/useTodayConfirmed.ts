import { useQuery } from "@tanstack/react-query"
import { getTodayConfirmedAppointments } from "../../services/apiAppointments"

export function useTodayConfirmed() {
  const { data: todayConfirmed, isPending: isPendingTodayConfirmed } = useQuery(
    {
      queryKey: ["today-confirmed"],
      queryFn: getTodayConfirmedAppointments,
    }
  )

  return { todayConfirmed, isPendingTodayConfirmed }
}
