import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createService as createServiceApi } from "../../services/apiServices"

export function useCreateService() {
  const queryClient = useQueryClient()

  const { mutate: createService, isPending: isCreatingService } = useMutation({
    mutationFn: createServiceApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["services"],
      })
    },
    onError: (err) => {
      console.error(err.message)
    },
  })

  return { createService, isCreatingService }
}
