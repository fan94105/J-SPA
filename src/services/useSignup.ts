import { useMutation } from "@tanstack/react-query"

import { signup as signupApi } from "./apiAuth"

export function useSignup() {
  const { mutate: signup, isPending: isSigningup } = useMutation({
    mutationFn: signupApi,
    onError: (err) => {
      console.error(err.message)
    },
  })

  return { signup, isSigningup }
}
