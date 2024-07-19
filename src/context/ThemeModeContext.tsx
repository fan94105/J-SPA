import React, { createContext, useContext, useEffect } from "react"

import { useLocalStorageState } from "../hooks/useLocalStorageState"

type ThemeModeContextType = any

const ThemeModeContext = createContext<ThemeModeContextType>(null!)

type ThemeModeProviderProps = {
  children: React.ReactNode
}

function ThemeModeProvider({ children }: ThemeModeProviderProps) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, "isDarkMode")

  function toggleThemeMode() {
    setIsDarkMode((isDark: boolean) => !isDark)
  }

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark-mode")
      document.documentElement.classList.remove("light-mode")
    } else {
      document.documentElement.classList.remove("dark-mode")
      document.documentElement.classList.add("light-mode")
    }
  }, [isDarkMode])

  return (
    <ThemeModeContext.Provider value={{ isDarkMode, toggleThemeMode }}>
      {children}
    </ThemeModeContext.Provider>
  )
}

function useThemeMode() {
  const context = useContext(ThemeModeContext)

  if (!context)
    throw new Error("useThemeMode must be used within a ThemeModeProvider")

  return context
}

export { ThemeModeProvider, useThemeMode }
