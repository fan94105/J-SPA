import { useQuery } from "@tanstack/react-query"
import { getService } from "../../services/apiServices"

export function useService(id: string) {
  const { data: service, isPending: isPendingService } = useQuery({
    queryKey: ["service", id],
    queryFn: () => getService(id),
  })

  return { service, isPendingService }
}
