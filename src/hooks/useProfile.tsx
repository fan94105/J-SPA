import React, { useEffect } from "react"
import { Profile } from "../types/global"

function useProfile() {
  const profile: Profile = JSON.parse(
    sessionStorage.getItem("profile") as string
  )

  return { profile }
}

export default useProfile
