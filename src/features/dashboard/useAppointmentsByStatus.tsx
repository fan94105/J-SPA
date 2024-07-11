import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router-dom"
import moment from "moment"

import { getConfirmedAppointmentsAfterDate } from "../../services/apiAppointments"

export function useAppointmentsByStatus(status: "confirmed" | "completed") {
  const [searchParams] = useSearchParams()

  const numDays = searchParams.get("last")
    ? Number(searchParams.get("last"))
    : 7

  const queryDate = moment().subtract(numDays, "days").format("YYYY-MM-DD")

  const { data, isPending } = useQuery({
    queryKey: [status, `last-${numDays}`],
    queryFn: () =>
      getConfirmedAppointmentsAfterDate({ status, date: queryDate }),
  })

  return { data, isPending }
}
