import styled from "styled-components"
import { useNavigate } from "react-router-dom"

import Spinner from "../../ui/Spinner"
import Modal from "../../ui/Modal"
import Heading from "../../ui/Heading"
import Tag from "../../ui/Tag"
import ButtonText from "../../ui/ButtonText"
import Button from "../../ui/Button"
import AppointmentDataBox from "../appointments/AppointmentDataBox"

import { useAppointment } from "../appointments/useAppointment"
import { useServices } from "../service/useServices"
import { useOptions } from "../option/useOptions"
import Checkbox from "../../ui/Checkbox"
import { useEffect, useState } from "react"
import { useCheck } from "./useCheck"

const StyledDashboardAppointmentDetail = styled.section`
  margin: 0 auto;
  padding-bottom: 6rem;
`

const StyledHeader = styled.header`
  margin-bottom: 2rem;

  display: flex;
  align-items: center;
  justify-content: space-between;
`

const StyledHeadingGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`

const StyledBtnRow = styled.div`
  margin-top: 2rem;

  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`

const statusToTagName: Record<string, string> = {
  confirmed: "green",
  completed: "silver",
}

function CheckAppointment() {
  const [confirmPaid, setConfirmPaid] = useState(false)

  const navigate = useNavigate()

  const { appointment, isPendingAppointment } = useAppointment()
  const tagType = appointment?.status
    ? statusToTagName[appointment?.status]
    : "green"

  const { services, isPendingServices } = useServices()
  const { options, isPendingOptions } = useOptions()

  const service = services?.find(
    (service) => service.id === appointment?.serviceId
  )
  const option = options?.find((option) => option.id === appointment?.optionId)

  const { check, isChecking } = useCheck()

  const handleCheck = () => {
    if (!confirmPaid) return

    check({ id: String(appointment?.id) })
  }

  useEffect(() => {
    if (appointment?.status === "completed") navigate(-1)
  })

  if (isPendingAppointment || isPendingServices || isPendingOptions)
    return <Spinner />

  return (
    <Modal>
      <StyledDashboardAppointmentDetail>
        <StyledHeader>
          <StyledHeadingGroup>
            <Heading as="h1">預約 #{appointment?.id}</Heading>
            <Tag $type={tagType}>{appointment?.status}</Tag>
          </StyledHeadingGroup>

          <ButtonText onClick={() => navigate(-1)}>&larr; 返回</ButtonText>
        </StyledHeader>

        <AppointmentDataBox
          appointment={appointment!}
          service={service!}
          option={option}
        />

        <Box>
          <Checkbox
            checked={confirmPaid}
            onChange={() => setConfirmPaid((confirm) => !confirm)}
            disabled={appointment?.status === "completed"}
          >
            確認 {appointment?.displayName} 已支付費用 {appointment?.totalPrice}{" "}
            元
          </Checkbox>
        </Box>

        <StyledBtnRow>
          <Button onClick={handleCheck}>確認 #{appointment!.id} 完成</Button>
        </StyledBtnRow>
      </StyledDashboardAppointmentDetail>
    </Modal>
  )
}

export default CheckAppointment
