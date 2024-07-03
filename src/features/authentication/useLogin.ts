import { useMutation, useQueryClient } from "@tanstack/react-query"
import { login as loginApi } from "../../services/apiAuth"
import { AuthFormValues } from "../../types/global"
import { useNavigate } from "react-router-dom"

export function useLogin() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { mutate: login, isPending: isLogin } = useMutation({
    mutationFn: ({ email, password }: AuthFormValues) =>
      loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user)
      navigate("/dashboard")
    },
    onError: (err) => {
      console.error(err.message)
    },
  })

  return { login, isLogin }
}
