import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateSettings as updateSettingsApi } from "../../services/apiSettings"
import { TablesUpdate } from "../../supabase"

export function useUpdateSettings() {
  const queryClient = useQueryClient()

  const { mutate: updateSettings, isPending: isUpdatingSettings } = useMutation(
    {
      mutationFn: updateSettingsApi,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["settings"] })
      },
      onError: (err) => {
        console.error(err.message)
      },
    }
  )

  return { updateSettings, isUpdatingSettings }
}
