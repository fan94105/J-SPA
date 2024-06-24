import React from "react"
import FormWrapper from "../../ui/FormWrapper"
import SelectableTime from "../../ui/SelectableTime"
import { UseFormRegister, useForm, useFormState } from "react-hook-form"
import FormErrorMsg from "../../ui/FormErrorMsg"
import { FormValues } from "../../types/global"
import { useAppointments } from "./useAppointments"
import moment from "moment"
import Spinner from "../../ui/Spinner"
import { useServices } from "../service/useServices"
import { useOptions } from "../option/useOptions"
import { useParams } from "react-router-dom"

const times = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
]

type TimeFormProps = {
  register: UseFormRegister<FormValues>
  error: string | undefined
}

function TimeForm({ register, error }: TimeFormProps) {
  const { appointmentId } = useParams()

  const isEditSession = Boolean(appointmentId)

  const { appointments, isPendingAppointments } = useAppointments()

  const { services, isPendingServices } = useServices()

  const { options, isPendingOptions } = useOptions()

  const selectedServiceId = sessionStorage.getItem("serviceId")

  const selectedOptionObj = sessionStorage.getItem("option")
    ? JSON.parse(sessionStorage.getItem("option") as string)
    : null

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
    new Date(sessionStorage.getItem("date") as string)
  ).format("YYYY-MM-DD")

  if (isPendingAppointments || isPendingServices || isPendingOptions)
    return <Spinner />

  // 當日已有預約
  const filteredAppointments = !isEditSession
    ? appointments?.filter((appointment) => appointment.date === selectedDate)
    : appointments?.filter(
        (appointment) =>
          appointment.date === selectedDate &&
          appointment.id !== +appointmentId!
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

  return (
    <FormWrapper title="預約時間">
      <SelectableTime register={register} name="time" items={items} />

      {error && <FormErrorMsg>{error}</FormErrorMsg>}
    </FormWrapper>
  )
}

export default TimeForm
