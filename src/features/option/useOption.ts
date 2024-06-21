import { useQuery } from "@tanstack/react-query"
import { getOption } from "../../services/apiOptions"

export function useOption(id: string) {
  const { data: option, isPending: isPendingOption } = useQuery({
    queryKey: ["option", id],
    queryFn: () => getOption(id),
  })

  return { option, isPendingOption }
}
