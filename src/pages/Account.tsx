import styled from "styled-components"

import Heading from "../ui/Heading"
import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm"
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm"

const StyledRow = styled.div`
  & h3 {
    margin-bottom: 1.6rem;
  }

  padding: 1.6rem 0;
  border-bottom: 1px solid var(--color-grey-300);
`

function Account() {
  return (
    <>
      <Heading as="h1">帳號設定</Heading>

      <StyledRow>
        <Heading as="h3">修改資料</Heading>

        <UpdateUserDataForm />
      </StyledRow>

      <StyledRow>
        <Heading as="h3">修改密碼</Heading>

        <UpdatePasswordForm />
      </StyledRow>
    </>
  )
}

export default Account
