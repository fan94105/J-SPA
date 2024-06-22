import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteAppointment as deleteAppointmentApi } from "../../services/apiAppointments"

export function useDeleteAppointment() {
  const queryClient = useQueryClient()

  const { mutate: deleteAppointment, isPending: isDeletingAppointment } =
    useMutation({
      mutationFn: deleteAppointmentApi,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["appointments"],
        })
      },
      onError: (err) => {
        console.error(err.message)
      },
    })

  return { deleteAppointment, isDeletingAppointment }
}
