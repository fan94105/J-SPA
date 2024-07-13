import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"

import { editService as editServiceApi } from "../../services/apiServices"

import { TablesUpdate } from "../../supabase"

export function useEditService() {
  const queryClient = useQueryClient()

  const { mutate: editService, isPending: isEditingService } = useMutation({
    mutationFn: ({
      newService,
      id,
    }: {
      newService: TablesUpdate<"services">
      id: number
    }) => editServiceApi(newService, id),
    onSuccess: () => {
      toast.success("修改服務成功")

      queryClient.invalidateQueries({
        queryKey: ["services"],
      })
    },
    onError: (err) => {
      console.error(err.message)

      toast.error("修改服務失敗")
    },
  })

  return { editService, isEditingService }
}
