import React from "react"
import FormRow from "../../ui/FormRow"
import FormWrapper from "../../ui/FormWrapper"
import { FieldErrors, UseFormRegister } from "react-hook-form"
import { FormValues } from "../../types/global"

type UserFormProps = {
  register: UseFormRegister<FormValues>
  errors: FieldErrors<FormValues>
}

function UserForm({ register, errors }: UserFormProps) {
  return (
    <FormWrapper title="聯絡資訊">
      <FormRow label="姓名" error={errors.displayName?.message}>
        <input
          {...register("displayName", {
            required: "請輸入姓名",
            onChange: (e) => {
              sessionStorage.setItem("displayName", e.target.value)
            },
          })}
          type="text"
          id="displayName"
          placeholder=""
        />
      </FormRow>
      <FormRow label="手機號碼" error={errors.phone?.message}>
        <input
          {...register("phone", {
            required: "請輸入手機號碼",
            pattern: {
              value: /^09\d{8}$/,
              message: "請輸入正確的手機號碼，範例：0912345678",
            },
            onChange: (e) => {
              sessionStorage.setItem("phone", e.target.value)
            },
          })}
          type="telphone"
          id="phone"
          placeholder=""
        />
      </FormRow>
      <FormRow label="備註">
        <textarea
          {...register("observations")}
          onChange={(e) => {
            register("observations").onChange(e)
            sessionStorage.setItem("observations", e.target.value)
          }}
          id="observations"
          rows={1}
          placeholder=""
        />
      </FormRow>
    </FormWrapper>
  )
}

export default UserForm
