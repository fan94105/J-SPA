import { createContext, useContext, useEffect, useState } from "react"
import liff from "@line/liff"
import { Profile } from "../types/global"

type LiffContextType = {
  liff: typeof liff
}

const LiffContext = createContext<LiffContextType | undefined>(undefined)

type LiffContextProviderProps = {
  children: React.ReactNode
}

export function LiffContextProvider({ children }: LiffContextProviderProps) {
  const [initedLiff, setInitedLiff] = useState<typeof liff>()
  const [status, setStatus] = useState("uninitialized")

  useEffect(() => {
    if (status === "inited") return

    liff
      .init({
        liffId: import.meta.env.VITE_LIFF_ID,
        // withLoginOnExternalBrowser: true,
      })
      .then(() => {
        setInitedLiff(liff)
        setStatus("inited")

        if (!liff.isInClient()) {
          const redirectUri = window.location.href
          if (!liff.isLoggedIn()) {
            liff.login({
              redirectUri,
            })
          }
        }
      })
  }, [])

  return (
    <LiffContext.Provider value={{ liff: initedLiff! }}>
      {children}
    </LiffContext.Provider>
  )
}

export function useLiff() {
  const [profile, setProfile] = useState<Profile | undefined>()

  const context = useContext(LiffContext)
  if (!context) throw new Error("useLiff must be used within a LiffProvider")

  const { liff } = context

  if (!liff) {
    return {
      isInitialized: false,
      isLoggedIn: false,
    }
  }

  if (liff.isLoggedIn() && !profile) {
    liff
      .getProfile()
      .then((profile) => {
        setProfile(profile)
      })
      .catch((e) => {
        console.error(e)
      })
  }

  return {
    liff,
    isInitialized: true,
    isLoggedIn: liff.isLoggedIn(),
    profile,
    login: () => liff.login(),
    logout: () => liff.logout(),
  }
}
