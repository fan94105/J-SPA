import { useQuery } from "@tanstack/react-query"
import { getOption } from "../../services/apiOptions"

export function useOption(id: number | null) {
  const { data: option, isPending: isPendingOption } = useQuery({
    queryKey: ["option", id],
    queryFn: () => {
      if (id) return getOption(id)

      return Promise.resolve(null)
    },
    retry: false,
    enabled: !!id,
  })

  return { option, isPendingOption }
}
