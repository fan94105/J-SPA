import { useMutation, useQueryClient } from "@tanstack/react-query"
import { editAppointment as editAppointmentApi } from "../../services/apiAppointments"
import { TablesUpdate } from "../../supabase"

type EditAppointmentParams = {
  newAppointment: TablesUpdate<"appointments">
  id: string
}

export function useEditAppointment() {
  const queryClient = useQueryClient()

  const { mutate: editAppointment, isPending: isEditingAppointment } =
    useMutation({
      mutationFn: ({ newAppointment, id }: EditAppointmentParams) =>
        editAppointmentApi(newAppointment, id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["appointments"] })
      },
      onError: (err) => {
        console.error(err.message)
      },
    })

  return { editAppointment, isEditingAppointment }
}
