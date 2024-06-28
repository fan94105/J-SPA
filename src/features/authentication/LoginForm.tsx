import React from "react"
import FormRow from "../../ui/FormRow"
import Button from "../../ui/Button"
import styled, { css } from "styled-components"
import { desktop } from "../../styles/device"
import { SubmitHandler, useForm } from "react-hook-form"
import { AuthFormValues } from "../../types/global"
import { login } from "../../services/apiAuth"
import { useLogin } from "./useLogin"

const StyledForm = styled.form`
  width: 80%;
  padding: 2.4rem 0;
  margin: 0 auto;

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

function LoginForm() {
  const { login, isLogin } = useLogin()

  const { register, formState, handleSubmit } = useForm<AuthFormValues>({
    defaultValues: {
      email: "test@example.com",
      password: "000000",
    },
  })

  const { errors } = formState

  const onSubmit: SubmitHandler<AuthFormValues> = (data) => {
    console.log(data)

    login(data)
  }

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="電子郵件" error={errors.email?.message}>
        <input
          type="email"
          id="email"
          placeholder=""
          autoFocus
          disabled={isLogin}
          {...register("email", {
            required: "請輸入電子郵件",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "請輸入正確的電子郵件",
            },
          })}
        />
      </FormRow>

      <FormRow label="密碼" error={errors.password?.message}>
        <input
          type="password"
          id="password"
          placeholder=""
          disabled={isLogin}
          {...register("password", {
            required: "請輸入密碼",
          })}
        />
      </FormRow>

      <Button type="submit" disabled={isLogin}>
        登入
      </Button>
    </StyledForm>
  )
}

export default LoginForm
