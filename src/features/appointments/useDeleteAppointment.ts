import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteAppointment as deleteAppointmentApi } from "../../services/apiAppointments"
import useProfile from "../../hooks/useProfile"

export function useDeleteAppointment() {
  const queryClient = useQueryClient()

  const { profile } = useProfile()

  const { mutate: deleteAppointment, isPending: isDeletingAppointment } =
    useMutation({
      mutationFn: deleteAppointmentApi,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [
            "appointments",
            { field: "lineId", value: profile?.userId },
          ],
        })
      },
      onError: (err) => {
        console.error(err.message)
      },
    })

  return { deleteAppointment, isDeletingAppointment }
}
