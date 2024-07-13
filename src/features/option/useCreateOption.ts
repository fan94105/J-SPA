import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"

import { createOption as createOptionApi } from "../../services/apiOptions"

export function useCreateOption() {
  const queryClient = useQueryClient()

  const { mutate: createOption, isPending: isCreatingOption } = useMutation({
    mutationFn: createOptionApi,
    onSuccess: () => {
      toast.success("新增加選項目成功")

      queryClient.invalidateQueries({
        queryKey: ["options"],
      })
    },
    onError: (err) => {
      console.error(err.message)

      toast.error("新增加選項目失敗")
    },
  })

  return { createOption, isCreatingOption }
}
