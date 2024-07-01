import React from "react"
import { useOptions } from "./useOptions"
import Spinner from "../../ui/Spinner"
import Menus from "../../ui/Menus"
import Table from "../../ui/Table"
import OptionRow from "./OptionRow"

function OptionsTable() {
  const { options, isPendingOptions } = useOptions()

  if (isPendingOptions) return <Spinner />

  return (
    <Menus>
      <Table columns="4fr 2fr 2fr 1fr">
        <Table.Header>
          <div>項目</div>
          <div>價格</div>
          <div>時長</div>
          {/* <div>描述</div> */}
          <div></div>
        </Table.Header>

        <Table.Body
          data={options}
          render={(option) => <OptionRow key={option.id} option={option} />}
        />
      </Table>
    </Menus>
  )
}

export default OptionsTable
