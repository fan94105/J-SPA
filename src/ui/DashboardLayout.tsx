import React from "react"
import { Outlet } from "react-router-dom"
import styled from "styled-components"

const StyledDashboardLayout = styled.div`
  width: 80%;
  height: 100dvh;
  padding-top: 8rem;
  margin: 0 auto;
`

function DashboardLayout() {
  return (
    <StyledDashboardLayout>
      <Outlet />
    </StyledDashboardLayout>
  )
}

export default DashboardLayout
