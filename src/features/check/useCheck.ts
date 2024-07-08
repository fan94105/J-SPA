import { useMutation, useQueryClient } from "@tanstack/react-query"
import { editAppointment } from "../../services/apiAppointments"
import { TablesUpdate } from "../../supabase"

export function useCheck() {
  const queryClient = useQueryClient()

  const { mutate: check, isPending: isChecking } = useMutation({
    mutationFn: ({
      id,
      newAppointment = {},
    }: {
      id: string
      newAppointment?: TablesUpdate<"appointments">
    }) => editAppointment({ ...newAppointment, status: "completed" }, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] })
    },
    onError: (err) => {
      console.error(err.message)
    },
  })

  return { check, isChecking }
}
