import React from "react"
import Table from "../../ui/Table"
import { Option } from "../../types/global"
import Menus from "../../ui/Menus"
import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2"
import Modal from "../../ui/Modal"
import CreateEditOptionForm from "./CreateEditOptionForm"
import ConfirmDelete from "../../ui/ConfirmDelete"
import { useDeleteOption } from "./useDeleteOption"

type OptionRowProps = {
  option: Option
}

function OptionRow({ option }: OptionRowProps) {
  const { deleteOption, isDeletingOption } = useDeleteOption()

  return (
    <>
      <Table.Row key={option.id}>
        <div>{option.name}</div>
        <div>{option.price}</div>
        <div>{option.duration}</div>
        {/* <div>{option.description ? option.description : "-"}</div> */}
        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={String(option.id)} />
              <Menus.List id={String(option.id)}>
                <Modal.Open name="edit">
                  <Menus.Button icon={<HiOutlinePencilSquare />}>
                    修改
                  </Menus.Button>
                </Modal.Open>
                <Modal.Open name="delete">
                  <Menus.Button icon={<HiOutlineTrash />}>刪除</Menus.Button>
                </Modal.Open>
              </Menus.List>

              <Modal.Window name="edit">
                <CreateEditOptionForm optionToEdit={option} />
              </Modal.Window>

              <Modal.Window name="delete">
                <ConfirmDelete
                  resourceName={option.name!}
                  onConfirm={() => deleteOption(String(option.id))}
                  disabled={isDeletingOption}
                />
              </Modal.Window>
            </Menus.Menu>
          </Modal>
        </div>
      </Table.Row>
    </>
  )
}

export default OptionRow
