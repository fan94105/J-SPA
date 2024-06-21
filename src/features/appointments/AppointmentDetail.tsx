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

const StyledAppointmentDetail = styled.section`
  height: 100dvh;
  padding: 2rem;
  background-color: var(--color-grey-0);
`

const StyledHeader = styled.header`
  text-align: center;
  margin-bottom: 2rem;
`

const StyledBox = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-md);
  padding: 2rem;
  box-shadow: var(--shadow-sm);
  margin-bottom: 2rem;
`

const StyledRow = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: 0.8rem;
  margin-bottom: 1.6rem;
`

const StyledBtnRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`

function AppointmentDetail() {
  const navigate = useNavigate()

  const { appointment, isPendingAppointment } = useAppointment()

  const { deleteAppointment, isDeletingAppointment } = useDeleteAppointment()

  const handleDeleteAppointment = () => {
    deleteAppointment(String(appointment?.id))

    navigate("/appointments")
  }

  if (isPendingAppointment) return <Spinner />

  return (
    <Modal>
      <StyledAppointmentDetail>
        <StyledHeader>
          <Heading as="h1">預約詳情</Heading>
        </StyledHeader>

        <StyledBox>
          <StyledRow>
            <div>日期</div>
            <div>
              {moment(appointment?.date).format("YYYY-MM-DD dddd HH:mm")}
            </div>
          </StyledRow>

          <StyledRow>
            <div>項目</div>
            {appointment?.options ? (
              <div>
                {appointment?.services?.name} + {appointment?.options?.name}
              </div>
            ) : (
              <div>{appointment?.services?.name}</div>
            )}
          </StyledRow>

          <StyledRow>
            <div>時長</div>
            {appointment?.options ? (
              <div>
                {+appointment?.services?.duration! +
                  +appointment?.options?.duration!}{" "}
                分鐘
              </div>
            ) : (
              <div>{appointment?.services?.duration} 分鐘</div>
            )}
          </StyledRow>

          {appointment?.observations && (
            <StyledRow>
              <div>備註</div>
              <div>{appointment?.observations}</div>
            </StyledRow>
          )}

          <StyledRow>
            <div>價格</div>
            {appointment?.options ? (
              <div>
                {+appointment?.services?.regularPrice! -
                  +appointment?.services?.discount! +
                  +appointment?.options?.price!}{" "}
                元
              </div>
            ) : (
              <div>
                {+appointment?.services?.regularPrice! -
                  +appointment?.services?.discount!}{" "}
                元
              </div>
            )}
          </StyledRow>
        </StyledBox>

        <StyledBtnRow>
          <Button
            $variation="secondary"
            onClick={() => navigate(`/appointment?editId=${appointment?.id}`)}
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
