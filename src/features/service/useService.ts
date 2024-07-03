import { useQuery } from "@tanstack/react-query"
import { getService } from "../../services/apiServices"

export function useService(id: number) {
  const { data: service, isPending: isPendingService } = useQuery({
    queryKey: ["services", id],
    queryFn: () => getService(id),
  })

  return { service, isPendingService }
}
