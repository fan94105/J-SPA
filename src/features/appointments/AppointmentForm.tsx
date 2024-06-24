import { useEffect } from "react"
import Heading from "../../ui/Heading"
import styled from "styled-components"
import Button from "../../ui/Button"
import useMultistepForm from "../../hooks/useMultistepForm"
import DateForm from "./DateForm"
import UserForm from "./UserForm"
import ServiceForm from "./ServiceForm"
import TimeForm from "./TimeForm"
import { SubmitHandler, useForm } from "react-hook-form"
import moment, { duration } from "moment"
import { useCreateAppointment } from "./useCreateAppointment"
import { useNavigate } from "react-router-dom"
import { Appointment, FormValues } from "../../types/global"
import { useEditAppointment } from "./useEditAppointment"
import { useOptions } from "../option/useOptions"
import { useServices } from "../service/useServices"
import { useProfile } from "../../ui/ProtectedRoute"

const StyledAppointmentForm = styled.section`
  height: 100%;
  padding: 2rem;
`

const StyledHeader = styled.header`
  text-align: center;
  margin-bottom: 2rem;
`

const StyledFormContainer = styled.div`
  position: relative;
  background-color: var(--color-grey-50);
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);
  padding: 2rem;
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const StyledCounter = styled.div`
  position: absolute;
  top: 2rem;
  right: 2rem;
`

const StyledBtnContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`

type AppointmentFormProps = {
  appointmentToEdit?: Appointment | {}
}

function AppointmentForm({ appointmentToEdit = {} }: AppointmentFormProps) {
  const navigate = useNavigate()

  const { profile } = useProfile()

  const { createAppointment, isCreatingAppointment } = useCreateAppointment()

  const { editAppointment, isEditingAppointment } = useEditAppointment()

  const { services, isPendingServices } = useServices()

  const { options, isPendingOptions } = useOptions()

  const {
    id: editId,
    displayName,
    phone,
    observations,
    date,
    startTime,
    serviceId,
    optionId,
  } = appointmentToEdit as Appointment

  const isEditSession = Boolean(editId)

  const isWorking =
    isCreatingAppointment ||
    isEditingAppointment ||
    isPendingServices ||
    isPendingOptions

  if (isEditSession) {
    const defaultOption = options?.find((option) => option.id === optionId)

    if (defaultOption)
      sessionStorage.setItem(
        "option",
        JSON.stringify({
          value: String(defaultOption?.id),
          label: `${defaultOption?.name} (${defaultOption?.duration}) 分鐘 ${defaultOption?.price} 元`,
        })
      )

    sessionStorage.setItem("displayName", displayName!)
    sessionStorage.setItem("phone", phone!)
    sessionStorage.setItem("observations", observations || "")
    sessionStorage.setItem("serviceId", String(serviceId!))
    sessionStorage.setItem("date", String(date))
    sessionStorage.setItem("time", startTime?.slice(0, 5)!)
  }

  let defaultValues = {
    displayName: profile?.displayName || "",
    phone: sessionStorage.getItem("phone") || "",
    observations: sessionStorage.getItem("observations") || null,
    serviceId: sessionStorage.getItem("serviceId") || "",
    option: JSON.parse(sessionStorage.getItem("option") as string) || undefined,
    date: sessionStorage.getItem("date")
      ? new Date(sessionStorage.getItem("date") as string)
      : undefined,
    time: sessionStorage.getItem("time") || "",
  }

  const { handleSubmit, register, control, formState, reset } =
    useForm<FormValues>()
  const { errors } = formState

  const { currentStepIndex, step, steps, isFirstStep, isLastStep, next, back } =
    useMultistepForm([
      <ServiceForm
        register={register}
        control={control}
        error={errors?.serviceId?.message}
      />,
      <DateForm control={control} error={errors?.date?.message} />,
      <TimeForm register={register} error={errors?.time?.message} />,
      <UserForm register={register} errors={errors} />,
    ])

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (!isLastStep) {
      return next()
    }

    const service = services?.find((service) => service.id === +data.serviceId)

    const option = data.option
      ? options?.find((option) => option.id === +data.option?.value!)
      : null

    const newAppointment = {
      lineId: profile?.userId,
      displayName: data.displayName,
      phone: data.phone,
      observations: data.observations,
      serviceId: +data.serviceId,
      optionId: option ? option?.id : null,
      date: moment(data.date).format("YYYY-MM-DD"),
      startTime: `${data.time}:00`,
      endTime: moment(data.time, "HH:mm")
        .add(service?.duration, "minutes")
        .format("HH:mm:00"),
      duration: option
        ? service?.duration! + option?.duration!
        : service?.duration,
      servicePrice: service?.regularPrice! - service?.discount!,
      optionPrice: option?.price || 0,
      totalPrice:
        service?.regularPrice! -
        service?.discount! +
        (data.option ? option?.price! : 0),
      status: "confirmed",
    }

    console.log(newAppointment)

    if (!isEditSession)
      createAppointment(newAppointment, {
        onSuccess: () => {
          reset()

          sessionStorage.clear()

          navigate("/appointments")
        },
      })

    if (isEditSession)
      editAppointment(
        { newAppointment, id: String(editId) },
        {
          onSuccess: () => {
            reset()

            sessionStorage.clear()

            navigate("/appointments")
          },
        }
      )
  }

  useEffect(() => {
    reset(defaultValues)
  }, [editId, profile])

  return (
    <StyledAppointmentForm>
      <StyledHeader>
        <Heading as="h1">{isEditSession ? "修改預約" : "預約服務"}</Heading>
      </StyledHeader>

      <StyledFormContainer>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <StyledCounter>
            {currentStepIndex + 1} / {steps.length}
          </StyledCounter>
          {step}
          <StyledBtnContainer>
            {isEditSession && (
              <Button
                type="button"
                $variation="secondary"
                onClick={() => navigate("/appointments")}
              >
                取消
              </Button>
            )}

            {!isFirstStep && (
              <Button type="button" $variation="secondary" onClick={back}>
                上一步
              </Button>
            )}

            <Button
              type="submit"
              disabled={isWorking}
              // disabled={
              //   isWorking || (currentStepIndex === 2 && !getValues().time)
              // }
            >
              {!isLastStep ? "下一步" : isEditSession ? "確認修改" : "確認預約"}
            </Button>
          </StyledBtnContainer>
        </StyledForm>
      </StyledFormContainer>
    </StyledAppointmentForm>
  )
}

export default AppointmentForm
