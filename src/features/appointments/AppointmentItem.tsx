import { Appointment } from "../../types/global"
import styled from "styled-components"
import {
  HiEye,
  HiOutlineBookmark,
  HiOutlineCalendarDays,
  HiOutlineCurrencyDollar,
  HiOutlinePencilSquare,
  HiOutlineSparkles,
  HiOutlineTrash,
} from "react-icons/hi2"

import moment from "moment"
import "moment/dist/locale/zh-tw"
import Menus from "../../ui/Menus"
import { useDeleteAppointment } from "./useDeleteAppointment"
import Modal from "../../ui/Modal"
import ConfirmDelete from "../../ui/ConfirmDelete"
import { useNavigate } from "react-router-dom"
import { useService } from "../service/useService"
import { useOption } from "../option/useOption"

const StyledAppointmentItem = styled.div`
  padding: 1rem;
  background-color: var(--color-grey-50);
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);

  display: grid;
  gap: 0.8rem;

  position: relative;
`

const StyledBtn = styled.div`
  position: absolute;
  top: 0.8rem;
  right: 0.8rem;
`

const StyledRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;

  svg {
    width: 2.4rem;
    height: 2.4rem;

    color: var(--color-grey-500);
  }

  div {
    border-left: 1px solid var(--color-grey-300);
    padding-left: 0.8rem;
    flex: 1;
  }
`

const StyledDate = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-grey-800);
`

const StyledServiceName = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-800);
`

const StyledPrice = styled.div`
  font-weight: 600;
`

type AppointmentItemProps = {
  appointment: Appointment
}

function AppointmentItem({ appointment }: AppointmentItemProps) {
  const navigate = useNavigate()

  const { id: appointmentId, date, serviceId, optionId } = appointment

  const { service, isPendingService } = useService(String(serviceId))

  const { option, isPendingOption } = useOption(String(optionId))

  const { deleteAppointment, isDeletingAppointment } = useDeleteAppointment()

  const handleChackDetail = () => {
    navigate(`/appointments/${appointmentId}`)
  }

  const handleEditAppointment = () => {
    navigate(`/appointments/${appointmentId}/edit`)
  }

  const handleDeleteAppointment = () => {
    deleteAppointment(String(appointmentId))
  }

  return (
    <Modal>
      <StyledAppointmentItem>
        <StyledBtn>
          <Menus.Menu>
            <Menus.Toggle id={String(appointmentId)} />
            <Menus.List id={String(appointmentId)}>
              <Menus.Button icon={<HiEye />} onClick={handleChackDetail}>
                詳情
              </Menus.Button>
              <Menus.Button
                icon={<HiOutlinePencilSquare />}
                onClick={handleEditAppointment}
              >
                修改
              </Menus.Button>
              <Modal.Open name="delete">
                <Menus.Button icon={<HiOutlineTrash />}>刪除</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="預約"
                onConfirm={handleDeleteAppointment}
                disabled={isDeletingAppointment}
              />
            </Modal.Window>
          </Menus.Menu>
        </StyledBtn>
        <StyledRow>
          <HiOutlineCalendarDays />
          <StyledDate>
            {moment(date).format("YYYY/MM/DD dddd HH:mm")}
          </StyledDate>
        </StyledRow>
        <StyledRow>
          <HiOutlineBookmark />
          <StyledServiceName>{service?.name}</StyledServiceName>
        </StyledRow>
        <StyledRow>
          <HiOutlineSparkles />
          <div>{optionId ? option?.name : "-"}</div>
        </StyledRow>
        <StyledRow>
          <HiOutlineCurrencyDollar />
          <StyledPrice>{appointment.totalPrice} 元</StyledPrice>
        </StyledRow>
      </StyledAppointmentItem>
    </Modal>
  )
}

export default AppointmentItem
