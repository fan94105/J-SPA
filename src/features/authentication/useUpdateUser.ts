import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"

import { updateCurrentUser as updateCurrentUserApi } from "../../services/apiAuth"

export function useUpdateUser() {
  const queryClient = useQueryClient()

  const { mutate: updateUser, isPending: isUpdatingUser } = useMutation({
    mutationFn: updateCurrentUserApi,
    onSuccess: ({ user }) => {
      toast.success("更新使用者資訊成功")

      queryClient.setQueryData(["user"], user)
    },
    onError: (err) => {
      console.error(err.message)

      toast.error("更新使用者資訊失敗")
    },
  })

  return { updateUser, isUpdatingUser }
}
