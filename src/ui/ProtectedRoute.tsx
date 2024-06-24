import { createContext, useContext, useEffect, useState } from "react"
import { useLiff } from "react-liff"
import { Profile } from "../types/global"
import { useAppointment } from "../features/appointments/useAppointment"
import styled from "styled-components"
import Button from "./Button"
import { NavLink } from "react-router-dom"

const StyledContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledUnauthorized = styled.div`
  display: grid;
  justify-items: center;
  gap: 1rem;
`

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

  const { appointment } = useAppointment()
  console.log(appointment)

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

  if (isLoggedIn) {
    if (appointment && appointment?.lineId !== profile?.userId) {
      return (
        <StyledContainer>
          <StyledUnauthorized>
            <div>權限不足，無法查看</div>

            <Button>
              <NavLink to="/">回首頁</NavLink>
            </Button>
          </StyledUnauthorized>
        </StyledContainer>
      )
    }

    return (
      <ProfileContext.Provider value={{ profile }}>
        {children}
      </ProfileContext.Provider>
    )
  }
}

function useProfile() {
  const context = useContext(ProfileContext)

  if (!context)
    throw new Error("useProfile must be used within a ProfileProvider")

  return context
}

export { ProtectedRoute, useProfile }
