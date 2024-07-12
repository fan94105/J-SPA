import { useEffect, useState } from "react"
import styled from "styled-components"
import Calendar from "react-calendar"
import { Value } from "react-calendar/dist/cjs/shared/types"
import "react-calendar/dist/Calendar.css"
import moment from "moment"
import throttle from "lodash-es/throttle"

import Heading from "../../ui/Heading"
import { useSettings } from "./useSettings"
import Spinner from "../../ui/Spinner"

import { useUpdateSettings } from "./useUpdateSettings"

const StyledNonBusinessDateSelector = styled.div`
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--color-grey-300);
`

const StyledHeading = styled.div`
  margin-bottom: 1.2rem;
`

function NonBusinessDateSelector() {
  const { settings, isPendingSettings } = useSettings()

  const [selectedDates, setSelectedDates] = useState<string[]>()

  const { updateSettings, isUpdatingSettings } = useUpdateSettings()

  const handleClickDate = throttle((value: Value) => {
    if (isUpdatingSettings) return

    const selectDate = moment(value as Date).format("YYYY-MM-DD")

    const isAlreadySelected = selectedDates?.some((date) =>
      moment(date).isSame(moment(selectDate), "day")
    )

    if (isAlreadySelected) {
      setSelectedDates(
        selectedDates?.filter(
          (date) => !moment(date).isSame(moment(selectDate), "day")
        )
      )
    } else {
      setSelectedDates([...selectedDates!, selectDate])
    }
  }, 500)

  const tileClassName = ({ date }: { date: Date }) => {
    const dateString = moment(date).format("YYYY-MM-DD")

    return selectedDates?.includes(dateString) ? "selected" : null
  }

  useEffect(() => {
    if (!selectedDates) return

    // 只有今天之後的日期才可以存入 database
    updateSettings({
      nonBusinessDates: selectedDates.filter((date) =>
        moment(date).isSameOrAfter(moment(), "day")
      ),
    })
  }, [selectedDates])

  useEffect(() => {
    if (!isPendingSettings && settings?.nonBusinessDates)
      setSelectedDates(settings?.nonBusinessDates)
  }, [settings?.nonBusinessDates, isPendingSettings])

  if (isPendingSettings) return <Spinner />

  return (
    <StyledNonBusinessDateSelector>
      <StyledHeading>
        <Heading as="h2">選擇不營業的日期</Heading>
      </StyledHeading>

      <Calendar
        value={""}
        onClickDay={handleClickDate}
        selectRange={false}
        tileClassName={tileClassName}
        minDate={new Date()}
        formatDay={(_, date) => moment(date).format("DD")}
      />
    </StyledNonBusinessDateSelector>
  )
}

export default NonBusinessDateSelector
