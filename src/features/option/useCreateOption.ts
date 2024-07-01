import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createOption as createOptionApi } from "../../services/apiOptions"

export function useCreateOption() {
  const queryClient = useQueryClient()

  const { mutate: createOption, isPending: isCreatingOption } = useMutation({
    mutationFn: createOptionApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["options"],
      })
    },
    onError: (err) => {
      console.error(err.message)
    },
  })

  return { createOption, isCreatingOption }
}
