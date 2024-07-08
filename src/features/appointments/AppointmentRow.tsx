import { useNavigate } from "react-router-dom"
import { HiEye, HiOutlineCheckCircle, HiOutlineTrash } from "react-icons/hi2"

import Table from "../../ui/Table"
import Modal from "../../ui/Modal"
import Menus from "../../ui/Menus"
import ConfirmDelete from "../../ui/ConfirmDelete"

import { Appointment } from "../../types/global"
import { isToday } from "../../utils/helpers"

type AppointmentRowProps = {
  appointment: Appointment
}

function AppointmentRow({ appointment }: AppointmentRowProps) {
  const navigate = useNavigate()

  const date = isToday(appointment.date!)
    ? "今天"
    : appointment.date!.slice(5).replace("-", "/")
  const time = appointment.startTime!.slice(0, 5)

  return (
    <>
      <Table.Row>
        <div>{appointment.displayName}</div>
        <div>{date}</div>
        <div>{time}</div>
        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={String(appointment.id)} />
              <Menus.List id={String(appointment.id)}>
                <Menus.Button
                  icon={<HiEye />}
                  onClick={() => {
                    navigate(`${appointment.id}`)
                  }}
                >
                  詳情
                </Menus.Button>

                {appointment.status === "confirmed" && (
                  <Menus.Button
                    icon={<HiOutlineCheckCircle />}
                    onClick={() => {
                      navigate(`/dashboard/check/${appointment.id}`)
                    }}
                  >
                    完成
                  </Menus.Button>
                )}

                <Modal.Open name="delete">
                  <Menus.Button icon={<HiOutlineTrash />}>刪除</Menus.Button>
                </Modal.Open>
              </Menus.List>

              <Modal.Window name="delete">
                <ConfirmDelete
                  resourceName={`${appointment.displayName!} 的預約`}
                  onConfirm={() => {}}
                  disabled={false}
                />
              </Modal.Window>
            </Menus.Menu>
          </Modal>
        </div>
      </Table.Row>
    </>
  )
}

export default AppointmentRow
