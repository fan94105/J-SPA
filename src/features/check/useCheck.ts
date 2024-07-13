import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"

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
    onSuccess: (data) => {
      toast.success(`預約 #${data.id} 已完成`)

      queryClient.invalidateQueries({ queryKey: ["appointments"] })
    },
    onError: (err) => {
      console.error(err.message)

      toast.error("發生錯誤，無法完成預約")
    },
  })

  return { check, isChecking }
}
