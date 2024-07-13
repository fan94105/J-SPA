import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"

import { signup as signupApi } from "./apiAuth"

export function useSignup() {
  const { mutate: signup, isPending: isSigningup } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      toast.success("註冊成功")
    },
    onError: (err) => {
      console.error(err.message)

      toast.error("註冊失敗")
    },
  })

  return { signup, isSigningup }
}
