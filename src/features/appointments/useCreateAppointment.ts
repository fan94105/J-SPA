import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAppointment as createAppointmentApi } from "../../services/apiAppointments"

export function useCreateAppointment() {
  const queryClient = useQueryClient()

  const { mutate: createAppointment, isPending: isCreatingAppointment } =
    useMutation({
      mutationFn: createAppointmentApi,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["appointments"] })
      },
      onError: (err) => {
        console.error(err.message)
      },
    })

  return { createAppointment, isCreatingAppointment }
}
