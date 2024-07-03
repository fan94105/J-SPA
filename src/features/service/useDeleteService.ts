import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteService as deleteServiceApi } from "../../services/apiServices"

export function useDeleteService() {
  const queryClient = useQueryClient()

  const { mutate: deleteService, isPending: isDeletingService } = useMutation({
    mutationFn: deleteServiceApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["services"],
      })
    },
    onError: (err) => {
      console.error(err.message)
    },
  })

  return { deleteService, isDeletingService }
}
