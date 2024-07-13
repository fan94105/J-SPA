import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"

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
      toast.success("修改加選項目成功")

      queryClient.invalidateQueries({
        queryKey: ["options"],
      })
    },
    onError: (err) => {
      console.error(err.message)

      toast.error("修改加選項目失敗")
    },
  })

  return { editOption, isEditingOption }
}
