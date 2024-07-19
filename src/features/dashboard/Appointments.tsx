import styled, { css } from "styled-components"

import Heading from "../../ui/Heading"
import AppointmentTable from "../appointments/AppointmentTable"
import AppointmentTableOperations from "../appointments/AppointmentTableOperations"

import { laptop } from "../../styles/device"

const StyledRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  margin-bottom: 1.5rem;
  text-align: center;

  ${laptop(css`
    flex-direction: row;
    justify-content: space-between;
  `)}
`

function Appointments() {
  return (
    <>
      <StyledRow>
        <Heading as="h1">全部預約</Heading>

        <AppointmentTableOperations />
      </StyledRow>

      <AppointmentTable />
    </>
  )
}

export default Appointments
