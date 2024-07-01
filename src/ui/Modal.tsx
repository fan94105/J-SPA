import React, { cloneElement, createContext, useContext, useState } from "react"
import { createPortal } from "react-dom"
import { HiXMark } from "react-icons/hi2"
import styled from "styled-components"
import { useOutsideClick } from "../hooks/useOutsideClick"

type ModalContextType = {
  openName: string
  open: React.Dispatch<React.SetStateAction<string>>
  close: () => void
}

const ModalContext = createContext<ModalContextType>(null!)

type ModalProps = {
  children: React.ReactNode
}

function Modal({ children }: ModalProps) {
  const [openName, setOpenName] = useState("")

  const open = setOpenName
  const close = () => setOpenName("")

  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalContext.Provider>
  )
}

function useModalContext() {
  const context = useContext(ModalContext)

  if (!context)
    throw new Error("ModalContext must be used within a ModalProvider")

  return context
}

type OpenProps = {
  name: string
  children: React.ReactElement
}

function Open({ name, children }: OpenProps) {
  const { open } = useModalContext()

  return cloneElement(children, { onClick: () => open(name) })
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`

const StyledModal = styled.div`
  width: 80%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`

type WindowProps = {
  name: string
  children: React.ReactElement
}

function Window({ name, children }: WindowProps) {
  const { openName, close } = useModalContext()

  const ref = useOutsideClick(close)

  if (name !== openName) return null

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close}>
          <HiXMark />
        </Button>

        <>{cloneElement(children, { onCloseModal: close })}</>
      </StyledModal>
    </Overlay>,
    document.body
  )
}

Modal.Open = Open
Modal.Window = Window

export default Modal
