import { useMutation, useQueryClient } from "@tanstack/react-query"
import { editService as editServiceApi } from "../../services/apiServices"
import { TablesUpdate } from "../../supabase"

export function useEditService() {
  const queryClient = useQueryClient()

  const { mutate: editService, isPending: isEditingService } = useMutation({
    mutationFn: ({
      newService,
      id,
    }: {
      newService: TablesUpdate<"services">
      id: number
    }) => editServiceApi(newService, id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["services"],
      })
    },
    onError: (err) => {
      console.error(err.message)
    },
  })

  return { editService, isEditingService }
}
