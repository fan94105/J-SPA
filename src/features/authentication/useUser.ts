import { useQuery } from "@tanstack/react-query"
import { getCurrentUser } from "../../services/apiAuth"

export function useUser() {
  const { data: user, isPending: isPendingUser } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  })

  const isAuthenticated = user?.role === "authenticated"

  console.log("isAuthenticated", isAuthenticated)

  return {
    user,
    isPendingUser,
    isAuthenticated,
  }
}
