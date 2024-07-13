import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"

import { createService as createServiceApi } from "../../services/apiServices"

export function useCreateService() {
  const queryClient = useQueryClient()

  const { mutate: createService, isPending: isCreatingService } = useMutation({
    mutationFn: createServiceApi,
    onSuccess: () => {
      toast.success("新增服務成功")

      queryClient.invalidateQueries({
        queryKey: ["services"],
      })
    },
    onError: (err) => {
      console.error(err.message)

      toast.error("新增服務失敗")
    },
  })

  return { createService, isCreatingService }
}
