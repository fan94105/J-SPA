import { Link } from "react-router-dom"
import styled, { css } from "styled-components"

import Button from "../../ui/Button"

import { useService } from "../service/useService"
import { useOption } from "../option/useOption"

import { Appointment } from "../../types/global"
import Spinner from "../../ui/Spinner"
import { tablet } from "../../styles/device"

const StyledTodayItem = styled.li`
  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  ${tablet(css`
    display: grid;
    grid-template-columns: 5fr 3.5fr 3fr 1.2fr 1.5fr;
    align-items: center;
    gap: 1rem;
  `)}

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`

const StyledService = styled.div`
  font-size: 1.6rem;
  font-weight: 500;
`

const StyledOption = styled.div`
  color: var(--color-grey-500);
  font-weight: 500;
`

const Guest = styled.div`
  font-weight: 500;
`

const StyledTime = styled.div`
  font-weight: 500;
`

type TodayItemProps = {
  confirmed: Appointment
}

function TodayItem({ confirmed }: TodayItemProps) {
  const { service, isPendingService } = useService(confirmed.serviceId!)

  const { option } = useOption(confirmed.optionId!)

  if (isPendingService) return <Spinner />

  return (
    <StyledTodayItem>
      <StyledService>{service?.name}</StyledService>

      <StyledOption>{option?.name || "-"}</StyledOption>

      <Guest>{confirmed.displayName}</Guest>

      <StyledTime>{confirmed.startTime!.slice(0, 5)}</StyledTime>

      <Button $variation="primary" as={Link} to={`check/${confirmed.id}`}>
        完成
      </Button>
    </StyledTodayItem>
  )
}

export default TodayItem
