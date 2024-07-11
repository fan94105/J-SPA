import styled, { css } from "styled-components"

import Spinner from "../../ui/Spinner"
import Heading from "../../ui/Heading"
import TodayItem from "./TodayItem"

import { useTodayConfirmed } from "./useTodayConfirmed"

import { desktopLg } from "../../styles/device"

const StyledTodayConfirmed = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-sm);

  padding: 3.2rem;

  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  ${desktopLg(css`
    grid-column: 1 / 3;
  `)}
`

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const TodayList = styled.ul`
  overflow: scroll;
  overflow-x: hidden;

  /* Removing scrollbars for webkit, firefox, and ms, respectively */
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`

const Empty = styled.div`
  height: 100%;
  color: var(--color-grey-500);
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
`

function TodayConfirmed() {
  const { todayConfirmed, isPendingTodayConfirmed } = useTodayConfirmed()

  return (
    <StyledTodayConfirmed>
      <StyledHeader>
        <Heading as="h2">今日預約</Heading>
      </StyledHeader>

      {!isPendingTodayConfirmed ? (
        todayConfirmed?.length ? (
          <TodayList>
            {todayConfirmed.map((confirmed) => (
              <TodayItem key={confirmed.id} confirmed={confirmed} />
            ))}
          </TodayList>
        ) : (
          <Empty>今天沒有任何預約...</Empty>
        )
      ) : (
        <Spinner />
      )}
    </StyledTodayConfirmed>
  )
}

export default TodayConfirmed
