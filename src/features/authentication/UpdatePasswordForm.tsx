import styled, { css } from "styled-components"

import FormRow from "../../ui/FormRow"
import Button from "../../ui/Button"

import { desktop } from "../../styles/device"
import { SubmitHandler, useForm } from "react-hook-form"
import { UpdatePasswordFormValues } from "../../types/global"
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

function UpdatePasswordForm() {
  const { updateUser, isUpdatingUser } = useUpdateUser()

  const { register, formState, handleSubmit, reset, getValues } =
    useForm<UpdatePasswordFormValues>()

  const { errors } = formState

  const onSubmit: SubmitHandler<UpdatePasswordFormValues> = ({ password }) => {
    updateUser(
      {
        password,
      },
      {
        onSuccess: () => reset(),
      }
    )
  }

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="新密碼" error={errors.password?.message}>
        <input
          type="password"
          id="password"
          placeholder=""
          {...register("password", {
            required: "請輸入密碼",
            minLength: {
              value: 6,
              message: "密碼至少 6 個字元",
            },
          })}
          disabled={isUpdatingUser}
        />
      </FormRow>

      <FormRow label="確認密碼" error={errors.passwordConfirm?.message}>
        <input
          type="password"
          id="passwordConfirm"
          placeholder=""
          {...register("passwordConfirm", {
            required: "請輸入確認密碼",
            minLength: {
              value: 6,
              message: "密碼至少 6 個字元",
            },
            validate: (value) =>
              value === getValues("password") || "密碼不相符",
          })}
          disabled={isUpdatingUser}
        />
      </FormRow>

      <StyledBtnRow>
        <Button
          $variation="secondary"
          type="reset"
          onClick={() => reset()}
          disabled={isUpdatingUser}
        >
          取消
        </Button>

        <Button $variation="primary" type="submit" disabled={isUpdatingUser}>
          修改密碼
        </Button>
      </StyledBtnRow>
    </StyledForm>
  )
}

export default UpdatePasswordForm
