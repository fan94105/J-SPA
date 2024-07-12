import { useState } from "react"
import styled from "styled-components"
import Select, {
  components,
  DropdownIndicatorProps,
  SingleValue,
} from "react-select"
import moment from "moment"
import { HiOutlineClock } from "react-icons/hi2"

import Spinner from "../../ui/Spinner"

import { useSettings } from "./useSettings"
import { useUpdateSettings } from "./useUpdateSettings"

const StyledIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  & svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-grey-500);
  }
`

const DropdownIndicator = (
  props: DropdownIndicatorProps<{ value: string; label: string }>
) => {
  return (
    <components.DropdownIndicator {...props}>
      <StyledIcon>
        <HiOutlineClock />
      </StyledIcon>
    </components.DropdownIndicator>
  )
}

const StyledError = styled.div`
  color: red;
  font-weight: 600;
  margin-bottom: 1rem;
`

const StyledTimeSelector = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`

const StyledSelect = styled.div``

const options = [
  { value: "09:00", label: "09:00" },
  { value: "09:30", label: "09:30" },
  { value: "10:00", label: "10:00" },
  { value: "10:30", label: "10:30" },
  { value: "11:00", label: "11:00" },
  { value: "11:30", label: "11:30" },
  { value: "12:00", label: "12:00" },
  { value: "12:30", label: "12:30" },
  { value: "13:00", label: "13:00" },
  { value: "13:30", label: "13:30" },
  { value: "14:00", label: "14:00" },
  { value: "14:30", label: "14:30" },
  { value: "15:00", label: "15:00" },
  { value: "15:30", label: "15:30" },
  { value: "16:00", label: "16:00" },
  { value: "16:30", label: "16:30" },
  { value: "17:00", label: "17:00" },
  { value: "17:30", label: "17:30" },
  { value: "18:00", label: "18:00" },
  { value: "18:30", label: "18:30" },
  { value: "19:00", label: "19:00" },
  { value: "19:30", label: "19:30" },
  { value: "20:00", label: "20:00" },
]

function TimeSelector() {
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const { settings, isPendingSettings } = useSettings()

  const { updateSettings, isUpdatingSettings } = useUpdateSettings()

  const defaultOpenTime = settings?.openTime!.slice(0, 5) || "10:00"
  const defaultCloseTime = settings?.closeTime!.slice(0, 5) || "20:00"

  const handleOpenTimeChange = (
    option: SingleValue<{ value: string; label: string }>
  ) => {
    const closeTime = moment(settings?.closeTime, "HH:mm")

    const openTime = moment(option?.value, "HH:mm")

    if (openTime.isSameOrAfter(closeTime)) {
      setErrorMsg("開始時間不可大於結束時間")

      return
    }

    updateSettings({ openTime: openTime.format("HH:mm") })

    setErrorMsg(null)
  }

  const handleCloseTimeChange = (
    option: SingleValue<{ value: string; label: string }>
  ) => {
    const openTime = moment(settings?.openTime, "HH:mm")

    const closeTime = moment(option?.value, "HH:mm")

    if (closeTime.isSameOrBefore(openTime)) {
      setErrorMsg("結束時間不可小於開始時間")

      return
    }

    updateSettings({ closeTime: closeTime.format("HH:mm") })

    setErrorMsg(null)
  }

  if (isPendingSettings) return <Spinner />

  return (
    <>
      {errorMsg && <StyledError>{errorMsg}</StyledError>}

      <StyledTimeSelector>
        <StyledSelect>
          <div>開使時間</div>
          <Select
            options={options}
            placeholder="開始時間"
            defaultValue={{ value: defaultOpenTime, label: defaultOpenTime }}
            isSearchable
            // @ts-ignore next line
            onChange={handleOpenTimeChange}
            components={{ DropdownIndicator }}
            isDisabled={isUpdatingSettings}
          />
        </StyledSelect>
        <StyledSelect>
          <div>結束時間</div>
          <Select
            options={options}
            placeholder="結束時間"
            defaultValue={{ value: defaultCloseTime, label: defaultCloseTime }}
            isSearchable
            // @ts-ignore next line
            onChange={handleCloseTimeChange}
            components={{ DropdownIndicator }}
            isDisabled={isUpdatingSettings}
          />
        </StyledSelect>
      </StyledTimeSelector>
    </>
  )
}

export default TimeSelector
