import styled from "styled-components"
import Heading from "../../ui/Heading"

import AppointmentTable from "../appointments/AppointmentTable"
import AppointmentTableOperations from "../appointments/AppointmentTableOperations"

const StyledRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  margin-bottom: 1.5rem;
  text-align: center;
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
