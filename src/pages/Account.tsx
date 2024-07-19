import styled, { css } from "styled-components"

import Heading from "../ui/Heading"
import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm"
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm"

import { desktop } from "../styles/device"

const StyledAccount = styled.div`
  & h1 {
    text-align: center;
  }
`

const StyledRow = styled.div`
  & h3 {
    margin-bottom: 1.6rem;
  }

  padding: 1.6rem 0;
  border-bottom: 1px solid var(--color-grey-300);

  ${desktop(css`
    & h3 {
      text-align: center;
    }
  `)}
`

function Account() {
  return (
    <StyledAccount>
      <Heading as="h1">帳號設定</Heading>

      <StyledRow>
        <Heading as="h3">修改資料</Heading>

        <UpdateUserDataForm />
      </StyledRow>

      <StyledRow>
        <Heading as="h3">修改密碼</Heading>

        <UpdatePasswordForm />
      </StyledRow>
    </StyledAccount>
  )
}

export default Account
