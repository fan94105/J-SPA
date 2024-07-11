import styled, { css } from "styled-components"
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineCheckCircle,
} from "react-icons/hi2"

import Stat from "./Stat"

import { desktop, desktopLg } from "../../styles/device"

import { Appointment } from "../../types/global"

const StyledStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(250px, 100%), 1fr));
  gap: 2rem;

  ${desktop(css`
    grid-column: 1 / -1;
  `)}
`

type StatsProps = {
  appointments: Appointment[] | undefined
}

function Stats({ appointments }: StatsProps) {
  const numAppointments = appointments?.length || 0

  const sales =
    `$${appointments?.reduce((acc, cur) => acc + cur.totalPrice!, 0)}` || `$0`

  return (
    <StyledStats>
      <Stat
        title="總預約數"
        value={numAppointments}
        color="blue"
        icon={<HiOutlineBriefcase />}
      />

      <Stat
        title="總營業額"
        value={sales}
        color="green"
        icon={<HiOutlineBanknotes />}
      />
    </StyledStats>
  )
}

export default Stats
