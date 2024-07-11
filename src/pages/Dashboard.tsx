import styled, { css } from "styled-components"

import Heading from "../ui/Heading"
import DashboardLayout from "../features/dashboard/DashboardLayout"
import DashboardFilter from "../features/dashboard/DashboardFilter"

import { laptop } from "../styles/device"

const StyledRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;

  margin-bottom: 1.5rem;

  ${laptop(css`
    flex-direction: row;
    justify-content: space-between;
  `)}
`

function Dashboard() {
  return (
    <>
      <StyledRow>
        <Heading as="h1">總覽</Heading>

        <DashboardFilter />
      </StyledRow>

      <DashboardLayout />
    </>
  )
}

export default Dashboard
