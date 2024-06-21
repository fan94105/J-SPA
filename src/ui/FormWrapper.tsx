import React from "react"
import styled from "styled-components"
import Heading from "./Heading"

const StyledFormWrapper = styled.div`
  display: grid;
  gap: 2rem;
`

type FormWrapperProps = {
  title: string
  children: React.ReactNode
}

function FormWrapper({ title, children }: FormWrapperProps) {
  return (
    <StyledFormWrapper>
      <Heading as="h2">{title}</Heading>
      {children}
    </StyledFormWrapper>
  )
}

export default FormWrapper
