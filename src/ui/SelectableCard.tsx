import { UseFormRegister } from "react-hook-form"
import styled from "styled-components"

import Spinner from "./Spinner"
import { useServices } from "../features/service/useServices"
import { setSessionFormData } from "../utils/helpers"

import { FormValues } from "../types/global"

const StyledSelectableCard = styled.div``

const StyledCardList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
  gap: 2rem;
`

const StyledLabel = styled.label`
  min-height: 20rem;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(10rem, 100%), 1fr));
  align-items: center;
  gap: 1rem;
  padding: 1rem;
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

const StyledImg = styled.div`
  img {
    display: block;
    width: 100%;
    object-fit: cover;
    object-position: center;

    border-radius: var(--border-radius-sm);
  }
`

const StyledInfo = styled.div`
  h3 {
    margin-bottom: 0.4rem;
  }

  p {
    color: var(--color-grey-600);
    margin-bottom: 0.4rem;
  }
`

const StyledPrice = styled.p`
  text-align: end;
`

type SelectableCardProps = {
  name: keyof FormValues
  register: UseFormRegister<FormValues>
}

function SelectableCard({ name, register }: SelectableCardProps) {
  const { services, isPendingServices } = useServices()

  if (isPendingServices) return <Spinner />

  return (
    <StyledSelectableCard>
      <StyledCardList>
        {services?.map((service) => (
          <div key={service.id}>
            <StyledInput
              {...register(name, {
                required: "請選擇一項服務",
                onChange: (e) => {
                  setSessionFormData({ serviceId: e.target.value })
                },
              })}
              type="radio"
              id={String(service.id)}
              value={String(service.id)}
            />
            <StyledLabel htmlFor={String(service.id)}>
              <StyledImg>
                <img src={service.image!} alt={service.name!} />
              </StyledImg>

              <StyledInfo>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
                <StyledPrice>
                  <span>{service.regularPrice! - service.discount!}</span> 元
                </StyledPrice>
              </StyledInfo>
            </StyledLabel>
          </div>
        ))}
      </StyledCardList>
    </StyledSelectableCard>
  )
}

export default SelectableCard
