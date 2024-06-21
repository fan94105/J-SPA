import React from "react"
import FormWrapper from "../../ui/FormWrapper"
import SelectableTime from "../../ui/SelectableTime"
import { UseFormRegister } from "react-hook-form"
import FormErrorMsg from "../../ui/FormErrorMsg"

type TimeFormProps = {
  register: UseFormRegister<IFormValues>
  error: string | undefined
}

function TimeForm({ register, error }: TimeFormProps) {
  return (
    <FormWrapper title="預約時間">
      <SelectableTime
        register={register}
        name="time"
        items={[
          "09:00",
          "09:30",
          "10:00",
          "10:30",
          "11:00",
          "11:30",
          "13:00",
          "13:30",
          "14:00",
          "14:30",
          "15:00",
          "15:30",
          "16:00",
          "16:30",
          "17:00",
          "17:30",
          "18:00",
          "18:30",
          "19:00",
          "19:30",
          "20:00",
        ]}
      />

      {error && <FormErrorMsg>{error}</FormErrorMsg>}
    </FormWrapper>
  )
}

export default TimeForm
