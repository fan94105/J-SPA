import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"

import { deleteOption as deleteOptionApi } from "../../services/apiOptions"

export function useDeleteOption() {
  const queryClient = useQueryClient()

  const { mutate: deleteOption, isPending: isDeletingOption } = useMutation({
    mutationFn: deleteOptionApi,
    onSuccess: () => {
      toast.success("刪除加選項目成功")

      queryClient.invalidateQueries({
        queryKey: ["options"],
      })
    },
    onError: (err) => {
      console.error(err.message)

      toast.error("刪除加選項目失敗")
    },
  })

  return { deleteOption, isDeletingOption }
}
