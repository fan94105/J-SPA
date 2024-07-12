import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import { Control, Controller } from "react-hook-form"
import moment from "moment"

import FormWrapper from "../../ui/FormWrapper"
import FormErrorMsg from "../../ui/FormErrorMsg"

import { setSessionFormData } from "../../utils/helpers"

import { FormValues } from "../../types/global"
import { useSettings } from "../settings/useSettings"
import Spinner from "../../ui/Spinner"

/*
   Disable dates
*/
const blockout = [
  new Date("2024-06-20"),
  new Date("2024-06-25"),
  new Date("2024-06-26"),
].map((date) => date.toISOString().split("T")[0]) // 將日期轉換為 'yyyy-mm-dd' 格式

type DateFormProps = {
  control: Control<FormValues>
  error: string | undefined
}

function DateForm({ control, error }: DateFormProps) {
  const { settings, isPendingSettings } = useSettings()

  if (isPendingSettings) return <Spinner />

  return (
    <FormWrapper title="預約日期">
      <Controller
        control={control}
        name="date"
        render={({ field: { ref, onChange, ...field } }) => (
          <Calendar
            {...field}
            inputRef={ref}
            value={field.value}
            onChange={(e) => {
              onChange(moment(e as Date).toLocaleString())

              setSessionFormData({
                date: moment(e as Date).format("YYYY-MM-DD"),
              })
            }}
            minDate={new Date()}
            formatDay={(_, date) => moment(date).format("DD")}
            tileDisabled={({ date }) => {
              const dateString = moment(date).format("YYYY-MM-DD")
              if (settings?.nonBusinessDates!.includes(dateString)) {
                return true
              }

              // if (date.getDay() === 0) {
              //   return true
              // }

              return false
            }}
          />
        )}
        rules={{
          required: "請選擇預約日期",
        }}
      />

      {error && <FormErrorMsg>{error}</FormErrorMsg>}
    </FormWrapper>
  )
}

export default DateForm
