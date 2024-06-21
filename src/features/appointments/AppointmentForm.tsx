import { useEffect, useState } from "react"
import Heading from "../../ui/Heading"
import styled from "styled-components"
import Button from "../../ui/Button"
import useMultistepForm from "../../hooks/useMultistepForm"
import DateForm from "./DateForm"
import UserForm from "./UserForm"
import ServiceForm from "./ServiceForm"
import TimeForm from "./TimeForm"
import { SubmitHandler, useForm } from "react-hook-form"
import moment from "moment"
import { useCreateAppointment } from "./useCreateAppointment"
import { useNavigate, useSearchParams } from "react-router-dom"
import { FormValues, Profile } from "../../types/global"
import { useEditAppointment } from "./useEditAppointment"
import { useAppointment } from "./useAppointment"
import { useOption } from "../option/useOption"
import { useService } from "../service/useService"
import { useOptions } from "../option/useOptions"
import { useServices } from "../service/useServices"
import { useLiff } from "react-liff"

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

function AppointmentForm() {
  const [profile, setProfile] = useState<Profile | null>(null)

  const navigate = useNavigate()

  const { liff } = useLiff()

  const [searchParams] = useSearchParams()

  const { appointment } = useAppointment()

  const { services, isPendingServices } = useServices()

  const { options, isPendingOptions } = useOptions()

  // const { createAppointment, isCreatingAppointment } = useCreateAppointment()

  // const { editAppointment, isEditingAppointment } = useEditAppointment()

  const appointmentId = searchParams.get("editId")

  const isEditSession = !!appointmentId

  const isWorking =
    // isCreatingAppointment ||
    // isEditingAppointment ||
    isPendingServices || isPendingOptions

  if (appointment) {
    const defaultOption = options?.find(
      (option) => option.id === appointment.optionId
    )

    sessionStorage.setItem("displayName", appointment?.displayName!)
    sessionStorage.setItem("phone", appointment?.phone!)
    sessionStorage.setItem("observations", appointment?.observations || "")
    sessionStorage.setItem("serviceId", String(appointment?.serviceId!))
    sessionStorage.setItem(
      "option",
      JSON.stringify({
        value: String(defaultOption?.id),
        label: `${defaultOption?.name} (${defaultOption?.duration}) 分鐘 ${defaultOption?.price} 元`,
      })
    )
    sessionStorage.setItem("date", String(appointment?.date))
    sessionStorage.setItem("time", appointment?.startTime?.slice(0, 5)!)
  }

  let defaultValues = {
    displayName: profile?.displayName || "",
    phone: sessionStorage.getItem("phone") || "",
    observations: sessionStorage.getItem("observations") || null,
    serviceId: sessionStorage.getItem("serviceId") || "",
    option: JSON.parse(sessionStorage.getItem("option") as string) || undefined,
    date: new Date(sessionStorage.getItem("date") as string) || undefined,
    time: sessionStorage.getItem("time") || "",
  }

  const { handleSubmit, register, control, formState, reset } =
    useForm<FormValues>()
  const { errors } = formState

  const {
    currentStepIndex,
    step,
    steps,
    isFirstStep,
    isLastStep,
    goTo,
    next,
    back,
  } = useMultistepForm([
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
      sessionStorage.setItem("currentStep", String(currentStepIndex + 1))

      return next()
    }

    const service = services?.find((service) => service.id === +data.serviceId)

    const newAppointment = {
      lineId: profile?.userId,
      displayName: data.displayName,
      phone: data.phone,
      observations: data.observations,
      serviceId: +data.serviceId,
      optionId: data.option ? +data.option?.value! : null,
      date: moment(data.date).format("YYYY-MM-DD"),
      startTime: `${data.time}:00`,
      endTime: moment(data.time, "HH:mm")
        .add(service?.duration, "minutes")
        .format("HH:mm:00"),
    }

    console.log(newAppointment)

    // if (!isEditSession)
    //   createAppointment(newAppointment, {
    //     onSuccess: () => {
    //       reset()

    //       sessionStorage.clear()

    //       navigate(`/user/${profile?.userId}/appointments`)
    //     },
    //   })

    // if (isEditSession)
    //   editAppointment(
    //     { newAppointment, id: appointmentId },
    //     {
    //       onSuccess: () => {
    //         reset()

    //         sessionStorage.clear()

    //         navigate(`/user/${profile?.userId}/appointments`)
    //       },
    //     }
    //   )
  }

  const handlePrevStep = () => {
    sessionStorage.setItem("currentStep", String(currentStepIndex - 1))

    return back()
  }

  useEffect(() => {
    const currentStep = +sessionStorage.getItem("currentStep")!
    goTo(currentStep || 0)
  }, [])

  // Edit form
  useEffect(() => {
    reset(defaultValues)
  }, [appointment, profile])

  useEffect(() => {
    ;(async () => {
      const profile = await liff.getProfile()

      setProfile(profile)
    })()
  }, [liff])

  useEffect(() => {
    if (searchParams.get("editId")) {
      reset(defaultValues)
      sessionStorage.clear()
    }
  }, [location.pathname])

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
            {!isFirstStep && (
              <Button
                type="button"
                $variation="secondary"
                onClick={handlePrevStep}
              >
                上一步
              </Button>
            )}

            <Button type="submit" disabled={isWorking}>
              {!isLastStep ? "下一步" : isEditSession ? "確認修改" : "確認預約"}
            </Button>
          </StyledBtnContainer>
        </StyledForm>
      </StyledFormContainer>
    </StyledAppointmentForm>
  )
}

export default AppointmentForm
