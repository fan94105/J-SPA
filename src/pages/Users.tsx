import styled from "styled-components"

import Heading from "../ui/Heading"
import SignupForm from "../features/authentication/SignupForm"

const StyledUsers = styled.div`
  & h1 {
    text-align: center;
    margin-bottom: 1.6rem;
  }
`

function Users() {
  return (
    <StyledUsers>
      <Heading as="h1">新增管理員</Heading>

      <SignupForm />
    </StyledUsers>
  )
}

export default Users
