import React from "react"
import { HiOutlineExclamationCircle } from "react-icons/hi2"
import styled from "styled-components"

const StyledFormErrorMsg = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;

  svg {
    width: 2.4rem;
    height: 2.4rem;
    color: red;
  }

  p {
    color: red;
  }
`

type FormErrorMsgProps = {
  children: React.ReactNode
}

function FormErrorMsg({ children }: FormErrorMsgProps) {
  return (
    <StyledFormErrorMsg>
      <HiOutlineExclamationCircle />

      <p>{children}</p>
    </StyledFormErrorMsg>
  )
}

export default FormErrorMsg
