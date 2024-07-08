import { useNavigate } from "react-router-dom"
import styled from "styled-components"

import Spinner from "../../ui/Spinner"
import Modal from "../../ui/Modal"
import Heading from "../../ui/Heading"
import Tag from "../../ui/Tag"
import ButtonText from "../../ui/ButtonText"
import Button from "../../ui/Button"
import ConfirmDelete from "../../ui/ConfirmDelete"
import AppointmentDataBox from "../appointments/AppointmentDataBox"

import { useAppointment } from "../appointments/useAppointment"
import { useServices } from "../service/useServices"
import { useOptions } from "../option/useOptions"
import { useDeleteAppointment } from "../appointments/useDeleteAppointment"

const StyledDashboardAppointmentDetail = styled.section`
  margin: 0 auto;
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

const statusToTagName: Record<string, string> = {
  confirmed: "green",
  completed: "silver",
}

function Detail() {
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

  const { deleteAppointment, isDeletingAppointment } = useDeleteAppointment()

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

        <StyledBtnRow>
          {appointment?.status === "confirmed" && (
            <Button
              onClick={() => navigate(`/dashboard/check/${appointment?.id}`)}
            >
              完成
            </Button>
          )}

          <Modal.Open name="delete">
            <Button $variation="danger">刪除預約</Button>
          </Modal.Open>
        </StyledBtnRow>
      </StyledDashboardAppointmentDetail>

      <Modal.Window name="delete">
        <ConfirmDelete
          resourceName={`${appointment?.displayName} 的預約`}
          onConfirm={() => {
            deleteAppointment(String(appointment?.id))
          }}
          disabled={isDeletingAppointment}
        />
      </Modal.Window>
    </Modal>
  )
}

export default Detail
