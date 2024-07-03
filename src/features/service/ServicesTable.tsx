import React from "react"
import Menus from "../../ui/Menus"
import Table from "../../ui/Table"
import { useServices } from "./useServices"
import Spinner from "../../ui/Spinner"
import ServiceRow from "./ServiceRow"

function ServicesTable() {
  const { services, isPendingServices } = useServices()

  if (isPendingServices) return <Spinner />

  return (
    <Menus>
      <Table columns="4fr 3fr 2fr 1fr">
        <Table.Header>
          <div>服務</div>
          <div>價格</div>
          <div>時長</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={services}
          render={(service) => (
            <ServiceRow key={service.id} service={service} />
          )}
        />
      </Table>
    </Menus>
  )
}

export default ServicesTable
