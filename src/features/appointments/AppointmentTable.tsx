import Spinner from "../../ui/Spinner"
import Menus from "../../ui/Menus"
import Table from "../../ui/Table"
import AppointmentRow from "./AppointmentRow"

import { useAppointments } from "./useAppointments"
import Pagination from "../../ui/Pagination"

function AppointmentTable() {
  const { appointments, count, isPendingAppointments } = useAppointments()

  if (isPendingAppointments) return <Spinner />

  return (
    <Menus>
      <Table columns="3fr 2fr 2fr 1fr">
        <Table.Header>
          <div>姓名</div>
          <div>日期</div>
          <div>時間</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={appointments}
          render={(appointment) => (
            <AppointmentRow key={appointment.id} appointment={appointment} />
          )}
        />

        <Table.Footer>
          <Pagination count={count || 0} />
        </Table.Footer>
      </Table>
    </Menus>
  )
}

export default AppointmentTable
