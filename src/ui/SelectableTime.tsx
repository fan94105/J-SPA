import React from "react"
import { UseFormRegister } from "react-hook-form"
import styled from "styled-components"
import { FormValues } from "../types/global"

const StyledSelectableTime = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(50px, 100%), 1fr));
  gap: 2rem;
`

const StyledTimeCard = styled.div`
  text-align: center;
`

const StyledLabel = styled.label`
  display: block;
  padding-block: 1rem;
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  cursor: pointer;

  transition: all 0.3s;
`

const StyledInput = styled.input`
  display: none;

  &:checked + ${StyledLabel} {
    border: 1px solid var(--color-brand-600);
    box-shadow: var(--shadow-md);

    background-color: var(--color-brand-50);
  }
`

const StyledMsg = styled.div`
  text-align: center;
`

type SelectableTimeProps = {
  name: keyof FormValues
  items: string[] | []
  register: UseFormRegister<FormValues>
}

function SelectableTime({ name, items, register }: SelectableTimeProps) {
  if (items.length === 0)
    return (
      <>
        <StyledMsg>無可預約時段，請選擇其他日期。</StyledMsg>
        <input
          type="hidden"
          {...register(name, { required: "上一步選擇其他日期" })}
        />
      </>
    )

  return (
    <StyledSelectableTime>
      {items.map((time) => (
        <StyledTimeCard key={time}>
          <StyledInput
            {...register(name, { required: "請選擇預約時段" })}
            onChange={(e) => {
              register(name).onChange(e)
              sessionStorage.setItem(name, e.target.value)
            }}
            type="radio"
            id={time}
            value={time}
          />
          <StyledLabel htmlFor={time}>{time}</StyledLabel>
        </StyledTimeCard>
      ))}
    </StyledSelectableTime>
  )
}

export default SelectableTime
