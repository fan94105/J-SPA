import { useLiff } from "react-liff"

type ProtectedRouteProps = {
  children: React.ReactNode
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isLoggedIn, liff } = useLiff()

  const redirectPath = sessionStorage.getItem("redirectPath") || ""

  if (!isLoggedIn)
    return (
      <button
        onClick={() =>
          liff.login({
            redirectUri: `${import.meta.env.VITE_APP_URL}${redirectPath}`,
          })
        }
      >
        登入
      </button>
    )

  if (isLoggedIn) return children
}

export default ProtectedRoute
