import React, { useEffect, useState } from "react"
import { useAppointments } from "./useAppointments"
import Spinner from "../../ui/Spinner"
import styled from "styled-components"
import Heading from "../../ui/Heading"
import { Link } from "react-router-dom"
import AppointmentItem from "./AppointmentItem"
import Menus from "../../ui/Menus"
import { Profile } from "../../types/global"
import { useLiff } from "react-liff"
import { useProfile } from "../../ui/ProtectedRoute"

const StyledUserAppointment = styled.section`
  height: 100dvh;
  padding: 2rem;
  background-color: var(--color-grey-0);
`

const StyledHeader = styled.header`
  text-align: center;
  margin-bottom: 2rem;
`

const StyledEmpty = styled.div`
  text-align: center;

  p {
    margin-bottom: 1rem;
  }

  a {
    color: var(--color-brand-600);
    text-decoration: underline;

    &:hover {
      color: var(--color-brand-700);
    }
  }
`

const StyledList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
  gap: 2rem;
  align-content: start;
`

function UserAppointments() {
  const { profile } = useProfile()

  const { appointments, isPendingAppointments } = useAppointments()

  const userAppointments = appointments?.filter(
    (appointment) => appointment.lineId === profile?.userId
  )

  if (isPendingAppointments) return <Spinner />

  return (
    <StyledUserAppointment>
      <StyledHeader>
        <Heading as="h1">我的預約</Heading>
      </StyledHeader>

      {!userAppointments?.length && (
        <StyledEmpty>
          <p>目前沒有預約...</p>

          <Link to="/appointment">前往預約</Link>
        </StyledEmpty>
      )}

      <Menus>
        <StyledList>
          {userAppointments?.map((appointment) => (
            <li key={appointment.id}>
              <AppointmentItem appointment={appointment} />
            </li>
          ))}
        </StyledList>
      </Menus>
    </StyledUserAppointment>
  )
}

export default UserAppointments
