import { useMutation, useQueryClient } from "@tanstack/react-query"
import { editOption as editOptionApi } from "../../services/apiOptions"
import { TablesUpdate } from "../../supabase"

export function useEditOption() {
  const queryClient = useQueryClient()

  const { mutate: editOption, isPending: isEditingOption } = useMutation({
    mutationFn: ({
      newOption,
      id,
    }: {
      newOption: TablesUpdate<"options">
      id: number
    }) => editOptionApi(newOption, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["options"],
      })
    },
    onError: (err) => {
      console.error(err.message)
    },
  })

  return { editOption, isEditingOption }
}
