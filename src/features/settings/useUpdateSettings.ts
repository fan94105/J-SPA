import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"

import { updateSettings as updateSettingsApi } from "../../services/apiSettings"

export function useUpdateSettings() {
  const queryClient = useQueryClient()

  const { mutate: updateSettings, isPending: isUpdatingSettings } = useMutation(
    {
      mutationFn: updateSettingsApi,
      onSuccess: () => {
        toast.success("更新設定成功")

        queryClient.invalidateQueries({ queryKey: ["settings"] })
      },
      onError: (err) => {
        console.error(err.message)

        toast.error("更新設定失敗")
      },
    }
  )

  return { updateSettings, isUpdatingSettings }
}
