import React from "react"
import Heading from "../ui/Heading"
import LoginForm from "../features/authentication/LoginForm"
import styled from "styled-components"

const StyledLogin = styled.section`
  min-height: 100dvh;
  padding: 8rem 2rem 2rem;
  background-color: var(--color-grey-0);
  text-align: center;
`

function Login() {
  return (
    <StyledLogin>
      <Heading as="h2">管理員登入</Heading>

      <LoginForm />
    </StyledLogin>
  )
}

export default Login
