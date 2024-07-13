import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"

import { deleteService as deleteServiceApi } from "../../services/apiServices"

export function useDeleteService() {
  const queryClient = useQueryClient()

  const { mutate: deleteService, isPending: isDeletingService } = useMutation({
    mutationFn: deleteServiceApi,
    onSuccess: () => {
      toast.success("刪除服務成功")

      queryClient.invalidateQueries({
        queryKey: ["services"],
      })
    },
    onError: (err) => {
      console.error(err.message)

      toast.error("刪除服務失敗")
    },
  })

  return { deleteService, isDeletingService }
}
