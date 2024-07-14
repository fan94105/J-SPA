import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

import { getCurrentUser, login as loginApi } from "../../services/apiAuth"

import { AuthFormValues } from "../../types/global"
import supabase from "../../services/supabase"

export function useLogin() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { mutate: login, isPending: isLogin } = useMutation({
    mutationFn: ({ email, password }: AuthFormValues) =>
      loginApi({ email, password }),
    onSuccess: async () => {
      const user = await getCurrentUser()

      toast.success(`歡迎回來 ${user?.user_metadata.fullName}`)

      queryClient.setQueryData(["user"], user)

      navigate("/dashboard")
    },
    onError: (err) => {
      console.error(err.message)

      toast.error("電子郵件或密碼錯誤")
    },
  })

  return { login, isLogin }
}
