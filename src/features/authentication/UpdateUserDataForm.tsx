import styled, { css } from "styled-components"
import { SubmitHandler, useForm } from "react-hook-form"

import Button from "../../ui/Button"
import FormRow from "../../ui/FormRow"

import { desktop } from "../../styles/device"

import { UpdateUserDataFormValues } from "../../types/global"
import { useUser } from "./useUser"
import { FormEventHandler, useState } from "react"
import { useUpdateUser } from "./useUpdateUser"

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  & button {
    ${desktop(css`
      width: 50%;
      margin: 0 auto;
    `)}
  }
`

const StyledBtnRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1.2rem;
`

function UpdateUserDataForm() {
  const { user } = useUser()

  const { updateUser, isUpdatingUser } = useUpdateUser()

  const currentFullName = user?.user_metadata.fullName

  const [fullName, setFullName] = useState(currentFullName)

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    if (!fullName || fullName === currentFullName) return

    updateUser({ fullName })
  }

  const handleCancel = () => {
    setFullName(currentFullName)
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <FormRow label="電子郵件">
        <input
          type="email"
          id="email"
          placeholder=""
          value={user?.email}
          disabled
        />
      </FormRow>

      <FormRow label="名稱">
        <input
          type="text"
          id="fullName"
          placeholder=""
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          disabled={isUpdatingUser}
        />
      </FormRow>

      <StyledBtnRow>
        <Button
          $variation="secondary"
          type="reset"
          onClick={handleCancel}
          disabled={isUpdatingUser}
        >
          取消
        </Button>

        <Button $variation="primary" type="submit" disabled={isUpdatingUser}>
          修改名稱
        </Button>
      </StyledBtnRow>
    </StyledForm>
  )
}

export default UpdateUserDataForm
