import React, { useEffect } from "react"
import { useUser } from "../features/authentication/useUser"
import Spinner from "./Spinner"
import { useNavigate } from "react-router-dom"
import FullScreen from "./FullScreen"

type ProtectedRouteProps = {
  children: React.ReactNode
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate()

  const { isPendingUser, isAuthenticated } = useUser()

  useEffect(() => {
    if (!isPendingUser && !isAuthenticated) {
      navigate("/login")
    }
  }, [isPendingUser, isAuthenticated, navigate])

  if (isPendingUser)
    return (
      <FullScreen>
        <Spinner />
      </FullScreen>
    )

  if (isAuthenticated) return children
}

export default ProtectedRoute
