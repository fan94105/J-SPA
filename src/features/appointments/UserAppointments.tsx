import styled from "styled-components"
import { Link } from "react-router-dom"

import Spinner from "../../ui/Spinner"
import Heading from "../../ui/Heading"
import Menus from "../../ui/Menus"
import FullScreen from "../../ui/FullScreen"

import AppointmentItem from "./AppointmentItem"

import { useLiff } from "../../context/LiffContext"
import { useUsersAppointments } from "./useUsersAppointments"

const StyledUserAppointment = styled.section`
  width: 80%;
  margin: 0 auto;
  height: 100%;
  padding: 8rem 0 2rem;
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
  const { profile } = useLiff()

  const { userAppointments, isPendingUserAppointments } = useUsersAppointments(
    profile?.userId!
  )

  const sortedUserAppointments = userAppointments?.sort((a, b) => {
    // 首先按照 date 进行升序排序
    if (a.date! < b.date!) return -1
    if (a.date! > b.date!) return 1

    // 如果 date 相同，则按照 startTime 进行升序排序
    if (a.startTime! < b.startTime!) return -1
    if (a.startTime! > b.startTime!) return 1

    return 0 // 如果 startTime 也相同，则顺序不变
  })

  if (isPendingUserAppointments)
    return (
      <FullScreen>
        <Spinner />
      </FullScreen>
    )

  return (
    <StyledUserAppointment>
      <StyledHeader>
        <Heading as="h1">我的預約</Heading>
      </StyledHeader>

      {sortedUserAppointments?.length === 0 && (
        <StyledEmpty>
          <p>目前沒有預約...</p>

          <Link to="/appointment">前往預約</Link>
        </StyledEmpty>
      )}

      <Menus>
        <StyledList>
          {sortedUserAppointments?.map((appointment) => (
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
