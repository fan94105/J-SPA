import { MouseEventHandler, createContext, useContext, useState } from "react"
// import { createPortal } from "react-dom"
import { HiEllipsisVertical } from "react-icons/hi2"
import styled from "styled-components"
import { useOutsideClick } from "../hooks/useOutsideClick"

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  position: relative;
`

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  /* transform: translateX(0.8rem); */
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`

const StyledList = styled.ul<{ $position: { x: number; y: number } }>`
  position: absolute;
  z-index: 999;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.$position.x}px;
  top: ${(props) => props.$position.y}px;
`

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  & span {
    white-space: nowrap;
  }
`

type MenusContextTypes = {
  openId: string
  close: () => void
  open: React.Dispatch<React.SetStateAction<string>>
  position: { x: number; y: number }
  setPosition: (position: { x: number; y: number }) => void
}

const MenusContext = createContext<MenusContextTypes>(null!)

type MenusProps = {
  children: React.ReactNode
}

function Menus({ children }: MenusProps) {
  const [openId, setOpenId] = useState("")
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  })

  const close = () => setOpenId("")
  const open = setOpenId

  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  )
}

function useMenusContext() {
  const context = useContext(MenusContext)

  if (!context)
    throw new Error("MenusContext must be used within a MenusProvider")

  return context
}

type ToggleProps = {
  id: string
}

function Toggle({ id }: ToggleProps) {
  const { openId, close, open, setPosition } = useMenusContext()

  function handleClick(e: React.MouseEvent) {
    e.stopPropagation()

    const rect = (e.target as Element)
      .closest("button")!
      .getBoundingClientRect()
    setPosition({
      x: 0,
      y: rect.height + 2,
    })

    openId === "" || openId !== id ? open(id) : close()
  }

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  )
}

type ListProps = {
  id: string
  children: React.ReactNode
}

function List({ id, children }: ListProps) {
  const { openId, position, close } = useMenusContext()

  const ref = useOutsideClick(close, false)

  if (openId !== id) return null

  return (
    <StyledList $position={position} ref={ref}>
      {children}
    </StyledList>
  )
}

type ButtonProps = {
  children: React.ReactNode
  icon: React.ReactNode
  onClick?: () => void
}

function Button({ children, icon, onClick }: ButtonProps) {
  const { close } = useMenusContext()

  function handleClick() {
    onClick?.()
    close()
  }

  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  )
}

Menus.Menu = Menu
Menus.Toggle = Toggle
Menus.List = List
Menus.Button = Button

export default Menus
