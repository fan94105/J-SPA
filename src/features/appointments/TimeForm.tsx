import moment from "moment"
import { UseFormRegister } from "react-hook-form"
import { useParams } from "react-router-dom"

import FormWrapper from "../../ui/FormWrapper"
import SelectableTime from "../../ui/SelectableTime"
import FormErrorMsg from "../../ui/FormErrorMsg"
import Spinner from "../../ui/Spinner"

import { useServices } from "../service/useServices"
import { useOptions } from "../option/useOptions"
import { useAppointmentsByDate } from "./useAppointmentsByDate"
import { useSettings } from "../settings/useSettings"
import { getSessionFormData } from "../../utils/helpers"

import { FormValues } from "../../types/global"

// const times = [
//   "09:00",
//   "09:30",
//   "10:00",
//   "10:30",
//   "11:00",
//   "11:30",
//   "13:00",
//   "13:30",
//   "14:00",
//   "14:30",
//   "15:00",
//   "15:30",
//   "16:00",
//   "16:30",
//   "17:00",
//   "17:30",
//   "18:00",
//   "18:30",
//   "19:00",
//   "19:30",
//   "20:00",
// ]

function generateTimes(start: string, end: string, step: number = 30) {
  const times = []
  let currentTime = moment(start, "HH:mm")
  const endTime = moment(end, "HH:mm")

  while (currentTime.isSameOrBefore(endTime)) {
    times.push(currentTime.format("HH:mm"))

    currentTime = currentTime.add(step, "minutes")
  }

  return times
}

type TimeFormProps = {
  register: UseFormRegister<FormValues>
  error: string | undefined
}

function TimeForm({ register, error }: TimeFormProps) {
  const { settings, isPendingSettings } = useSettings()

  const times = generateTimes(
    settings?.openTime?.slice(0, 5)!,
    settings?.closeTime?.slice(0, 5)!
  )

  const { appointmentId } = useParams()

  const isEditSession = Boolean(appointmentId)

  const { services, isPendingServices } = useServices()

  const { options, isPendingOptions } = useOptions()

  const formData = getSessionFormData()

  const selectedServiceId = formData.serviceId

  const selectedOptionObj = formData.option ? formData.option : null

  const selectedService = services?.find(
    (service) => service.id === +selectedServiceId!
  )

  const selectedOption = selectedOptionObj
    ? options?.find((option) => option.id === +selectedOptionObj.value)
    : null

  const appointmentDuration = selectedOption
    ? selectedService?.duration! + selectedOption?.duration!
    : selectedService?.duration!

  const selectedDate = moment(
    new Date(getSessionFormData().date as string)
  ).format("YYYY-MM-DD")

  const { appointmentsByDate, isPendingAppointmentsByDate } =
    useAppointmentsByDate(selectedDate)

  // 當日已有預約
  const filteredAppointments = !isEditSession
    ? appointmentsByDate
    : appointmentsByDate?.filter(
        (appointment) => appointment.id !== +appointmentId!
      )

  const items = !filteredAppointments?.length
    ? times
    : times.filter((time) => {
        const start = moment(time, "HH:mm")

        const end = moment(start).add(appointmentDuration, "minutes")

        const overlaps = filteredAppointments.some((appointment) => {
          const appointmentStart = moment(appointment.startTime, "HH:mm")
          const appointmentEnd = moment(appointmentStart).add(
            appointment.duration,
            "minutes"
          )

          return (
            (start.isSameOrAfter(appointmentStart) &&
              start.isBefore(appointmentEnd)) ||
            (end.isSameOrAfter(appointmentStart) &&
              end.isSameOrBefore(appointmentEnd)) ||
            (start.isBefore(appointmentStart) && end.isAfter(appointmentEnd))
          )
        })

        return !overlaps
      })

  if (
    isPendingAppointmentsByDate ||
    isPendingServices ||
    isPendingOptions ||
    isPendingSettings
  )
    return <Spinner />

  return (
    <FormWrapper title="預約時間">
      <SelectableTime register={register} name="time" items={items} />

      {error && <FormErrorMsg>{error}</FormErrorMsg>}
    </FormWrapper>
  )
}

export default TimeForm
