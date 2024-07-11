import styled, { css } from "styled-components"

import Stats from "./Stats"
import Spinner from "../../ui/Spinner"
import TodayConfirmed from "../check/TodayConfirmed"

import { useAppointmentsByStatus } from "./useAppointmentsByStatus"
import { useRecentAppointments } from "./useRecentAppointments"

import ServiceChart from "./ServiceChart"

import { desktop, desktopLg } from "../../styles/device"

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-rows: auto 34rem 34rem;
  gap: 2rem;

  ${desktopLg(css`
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: auto 34rem;
  `)}
`

function DashboardLayout() {
  const { appointments, isPendingAppointments } = useRecentAppointments()

  const {
    data: confirmedAppointments,
    isPending: isPendingConfirmedAppointments,
  } = useAppointmentsByStatus("confirmed")

  const {
    data: completedAppointments,
    isPending: isPendingCompletedAppointments,
  } = useAppointmentsByStatus("completed")

  if (
    isPendingAppointments ||
    isPendingConfirmedAppointments ||
    isPendingCompletedAppointments
  )
    return <Spinner />

  return (
    <StyledDashboardLayout>
      <Stats appointments={appointments} />

      <TodayConfirmed />

      <ServiceChart appointments={appointments} />
    </StyledDashboardLayout>
  )
}

export default DashboardLayout
