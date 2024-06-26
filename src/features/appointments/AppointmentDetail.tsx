import React from "react"
import { useAppointment } from "./useAppointment"
import styled from "styled-components"
import Heading from "../../ui/Heading"
import moment from "moment"
import Spinner from "../../ui/Spinner"
import Button from "../../ui/Button"
import { useNavigate } from "react-router-dom"
import Modal from "../../ui/Modal"
import ConfirmDelete from "../../ui/ConfirmDelete"
import { useDeleteAppointment } from "./useDeleteAppointment"
import { useServices } from "../service/useServices"
import { useOptions } from "../option/useOptions"
import ButtonText from "../../ui/ButtonText"
import AppointmentDataBox from "./AppointmentDataBox"
import Tag from "../../ui/Tag"
import { Appointment } from "../../types/global"

const StyledAppointmentDetail = styled.section`
  width: 80%;
  margin: 0 auto;
  padding: 8rem 0 6rem;
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

function AppointmentDetail() {
  const navigate = useNavigate()

  const { services, isPendingServices } = useServices()
  const { options, isPendingOptions } = useOptions()

  const { appointment, isPendingAppointment } = useAppointment()
  const tagType = appointment?.status
    ? statusToTagName[appointment?.status]
    : "green"

  const service = services?.find(
    (service) => service.id === appointment?.serviceId
  )
  const option = options?.find((option) => option.id === appointment?.optionId)

  const { deleteAppointment, isDeletingAppointment } = useDeleteAppointment()

  const handleDeleteAppointment = () => {
    deleteAppointment(String(appointment?.id))

    navigate("/appointments")
  }

  if (isPendingAppointment || isPendingServices || isPendingOptions)
    return <Spinner />

  return (
    <Modal>
      <StyledAppointmentDetail>
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
          <Button
            $variation="secondary"
            onClick={() => navigate(`/appointments/edit/${appointment?.id}`)}
          >
            修改預約
          </Button>
          <Modal.Open name="delete">
            <Button $variation="danger">刪除預約</Button>
          </Modal.Open>
        </StyledBtnRow>
      </StyledAppointmentDetail>

      <Modal.Window name="delete">
        <ConfirmDelete
          resourceName="預約"
          onConfirm={handleDeleteAppointment}
          disabled={isDeletingAppointment}
        />
      </Modal.Window>
    </Modal>
  )
}

export default AppointmentDetail
