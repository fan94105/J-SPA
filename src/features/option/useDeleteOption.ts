import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteOption as deleteOptionApi } from "../../services/apiOptions"

export function useDeleteOption() {
  const queryClient = useQueryClient()

  const { mutate: deleteOption, isPending: isDeletingOption } = useMutation({
    mutationFn: deleteOptionApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["options"],
      })
    },
    onError: (err) => {
      console.error(err.message)
    },
  })

  return { deleteOption, isDeletingOption }
}
