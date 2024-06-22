import { createContext, useContext, useEffect, useState } from "react"
import { useLiff } from "react-liff"
import { Profile } from "../types/global"

type ProfileContextType = {
  profile: Profile | null
}

const ProfileContext = createContext<ProfileContextType>(null!)

type ProtectedRouteProps = {
  children: React.ReactNode
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [profile, setProfile] = useState<Profile | null>(null)

  const { isLoggedIn, liff } = useLiff()

  const redirectPath = sessionStorage.getItem("redirectPath") || ""

  useEffect(() => {
    if (!isLoggedIn) {
      liff.login({
        redirectUri: `${import.meta.env.VITE_APP_URL}${redirectPath}`,
      })
    } else {
      liff
        .getProfile()
        .then((profile) => {
          setProfile(profile)
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }, [isLoggedIn])

  if (isLoggedIn)
    return (
      <ProfileContext.Provider value={{ profile }}>
        {children}
      </ProfileContext.Provider>
    )
}

function useProfile() {
  const context = useContext(ProfileContext)

  if (!context)
    throw new Error("useProfile must be used within a ProfileProvider")

  return context
}

export { ProtectedRoute, useProfile }
