import { useQuery } from "@tanstack/react-query"
import moment from "moment"
import { useSearchParams } from "react-router-dom"
import { getAppointmentsAfterDate } from "../../services/apiAppointments"

export function useRecentAppointments() {
  const [searchParams] = useSearchParams()

  const numDays = searchParams.get("last")
    ? Number(searchParams.get("last"))
    : 7

  const queryDate = moment().subtract(numDays, "days").format("YYYY-MM-DD")

  const { data: appointments, isPending: isPendingAppointments } = useQuery({
    queryKey: ["appointments", `last-${numDays}`],
    queryFn: () => getAppointmentsAfterDate(queryDate),
  })

  return { appointments, isPendingAppointments }
}
