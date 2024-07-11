import styled from "styled-components"
import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import moment from "moment"

import Heading from "../../ui/Heading"
import Button from "../../ui/Button"
import DateForm from "./DateForm"
import UserForm from "./UserForm"
import ServiceForm from "./ServiceForm"
import TimeForm from "./TimeForm"

import {
  clearSessionFormData,
  getSessionFormData,
  setSessionFormData,
} from "../../utils/helpers"
import { useLiff } from "../../context/LiffContext"
import { useServices } from "../service/useServices"
import { useOptions } from "../option/useOptions"
import { useCreateAppointment } from "./useCreateAppointment"
import { useEditAppointment } from "./useEditAppointment"
import useMultistepForm from "../../hooks/useMultistepForm"

import { Appointment, FormValues } from "../../types/global"
import { useEffect } from "react"

const StyledAppointmentForm = styled.section`
  width: 80%;
  margin: 0 auto;
  height: 100%;
  padding: 8rem 0 2rem;
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

  const { profile } = useLiff()

  const { createAppointment, isCreatingAppointment } = useCreateAppointment()

  const { editAppointment, isEditingAppointment } = useEditAppointment()

  const { services, isPendingServices } = useServices()

  const { options, isPendingOptions } = useOptions()

  const { id: editId } = appointmentToEdit as Appointment

  const isEditSession = Boolean(editId)

  const isWorking =
    isCreatingAppointment ||
    isEditingAppointment ||
    isPendingServices ||
    isPendingOptions

  const formData = getSessionFormData()

  const defaultValues: FormValues = {
    displayName: formData?.displayName || profile?.displayName || "",
    phone: formData?.phone || "",
    observations: formData?.observations || null,
    serviceId: formData?.serviceId || "",
    option: formData?.option || null,
    date: (formData?.date && new Date(formData?.date)) || undefined,
    time: formData?.time || "",
  }

  const { handleSubmit, register, control, formState, reset } =
    useForm<FormValues>({
      defaultValues,
    })
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

    if (!isEditSession)
      createAppointment(newAppointment, {
        onSuccess: () => {
          reset()

          clearSessionFormData()

          navigate("/appointments")
        },
      })

    if (isEditSession)
      editAppointment(
        { newAppointment, id: String(editId) },
        {
          onSuccess: () => {
            reset()

            clearSessionFormData()

            navigate("/appointments")
          },
        }
      )
  }

  useEffect(() => {
    if (!isEditSession) {
      setSessionFormData({ displayName: profile?.displayName })

      reset(defaultValues)
    }
  }, [profile])

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
                取消修改
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
