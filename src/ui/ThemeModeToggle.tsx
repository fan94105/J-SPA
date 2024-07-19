import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2"

import ButtonIcon from "./ButtonIcon"

import { useThemeMode } from "../context/ThemeModeContext"

function ThemeModeToggle() {
  const { isDarkMode, toggleThemeMode } = useThemeMode()

  return (
    <>
      <ButtonIcon onClick={toggleThemeMode}>
        {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
      </ButtonIcon>
    </>
  )
}

export default ThemeModeToggle
