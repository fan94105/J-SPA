import React, { useState } from "react"
import styled from "styled-components"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import FormWrapper from "../../ui/FormWrapper"
import { Control, Controller } from "react-hook-form"
import FormErrorMsg from "../../ui/FormErrorMsg"
import moment from "moment"
import { FormValues } from "../../types/global"

const StyledCalendarContainer = styled.div`
  .react-calendar {
    width: 100%;
    max-width: 60rem;
    padding: 0.8rem;
    margin: 0 auto;
    border: 1px solid var(--color-grey-300);
    border-radius: var(--border-radius-sm);
    box-shadow: var(--shadow-sm);
  }

  .react-calendar__navigation button:disabled {
    background: none;
    color: var(--color-grey-400);
  }

  .react-calendar__month-view__weekdays {
    margin-bottom: 1rem;
  }

  .react-calendar__month-view__days {
    display: grid !important;
    grid-template-columns: 14.2% 14.2% 14.2% 14.2% 14.2% 14.2% 14.2%;
  }

  .react-calendar__tile {
    border: 1px solid var(--color-grey-300);
    border-radius: var(--border-radius-sm);
    box-shadow: var(--shadow-sm);
    margin-bottom: 0.6rem;

    &--now {
      /* background: var(--color-brand-100); */
      background: transparent;
      color: var(--color-brand-600);
    }

    &--active {
      background: var(--color-brand-600);
      color: var(--color-grey-0);
    }
  }
`

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
  return (
    <FormWrapper title="預約日期">
      <StyledCalendarContainer>
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
                sessionStorage.setItem(
                  "date",
                  JSON.stringify(moment(e as Date).toLocaleString())
                )
              }}
              minDate={new Date()}
              formatDay={(_, date) =>
                date.toLocaleString("en-US", { day: "2-digit" })
              }
              tileDisabled={({ date }) => {
                const dateString = date.toISOString().split("T")[0]
                if (blockout.includes(dateString)) {
                  return true
                }
                if (date.getDay() === 0) {
                  return true
                }
                return false
              }}
            />
          )}
          rules={{
            required: "請選擇預約日期",
          }}
        />
      </StyledCalendarContainer>

      {error && <FormErrorMsg>{error}</FormErrorMsg>}
    </FormWrapper>
  )
}

export default DateForm
