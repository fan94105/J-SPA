import { useQuery } from "@tanstack/react-query"
import { getOptions } from "../../services/apiOptions"

export function useOptions() {
  const {
    data: options,
    isPending: isPendingOptions,
    error,
  } = useQuery({
    queryKey: ["options"],
    queryFn: getOptions,
  })

  return { options, isPendingOptions, error }
}
