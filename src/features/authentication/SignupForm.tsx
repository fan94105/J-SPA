import styled, { css } from "styled-components"
import { SubmitHandler, useForm } from "react-hook-form"

import FormRow from "../../ui/FormRow"
import Button from "../../ui/Button"

import { useSignup } from "../../services/useSignup"

import { desktop } from "../../styles/device"

import { SignupFormValues } from "../../types/global"

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`

const StyledBtnRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1.2rem;

  ${desktop(css`
    width: 50%;
    margin: 0 auto;
  `)}
`

function SignupForm() {
  const { register, formState, handleSubmit, getValues, reset } =
    useForm<SignupFormValues>()

  const { errors } = formState

  const { signup, isSigningup } = useSignup()

  const onSubmit: SubmitHandler<SignupFormValues> = ({
    fullName,
    email,
    password,
  }) => {
    signup(
      { fullName, email, password },
      {
        onSuccess: () => reset(),
      }
    )
  }

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="名稱" error={errors.fullName?.message}>
        <input
          type="text"
          id="fullName"
          placeholder=""
          {...register("fullName", {
            required: "請輸入名稱",
          })}
          disabled={isSigningup}
        />
      </FormRow>

      <FormRow label="電子郵件" error={errors.email?.message}>
        <input
          type="email"
          id="email"
          placeholder=""
          {...register("email", {
            required: "請輸入電子郵件",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "請輸入正確的電子郵件",
            },
          })}
          disabled={isSigningup}
        />
      </FormRow>

      <FormRow label="密碼" error={errors.password?.message}>
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
          disabled={isSigningup}
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
          disabled={isSigningup}
        />
      </FormRow>

      <StyledBtnRow>
        <Button
          $variation="secondary"
          type="reset"
          disabled={isSigningup}
          onClick={() => reset()}
        >
          取消
        </Button>

        <Button $variation="primary" type="submit" disabled={isSigningup}>
          註冊
        </Button>
      </StyledBtnRow>
    </StyledForm>
  )
}

export default SignupForm
