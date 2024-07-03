import React from "react"
import { HiEye, HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2"

import Table from "../../ui/Table"
import Modal from "../../ui/Modal"
import Menus from "../../ui/Menus"
import ConfirmDelete from "../../ui/ConfirmDelete"
import CreateEditServiceForm from "./CreateEditServiceForm"

import { useDeleteService } from "./useDeleteService"

import { Service } from "../../types/global"
import { useNavigate } from "react-router-dom"

type ServiceRowProps = {
  service: Service
}

function ServiceRow({ service }: ServiceRowProps) {
  const navigate = useNavigate()

  const { deleteService, isDeletingService } = useDeleteService()

  const totalPrice = service.discount
    ? service.regularPrice! - service.discount
    : service.regularPrice

  return (
    <>
      <Table.Row>
        <div>{service.name}</div>
        <div>{totalPrice}</div>
        <div>{service.duration}</div>

        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={String(service.id)} />
              <Menus.List id={String(service.id)}>
                <Menus.Button
                  icon={<HiEye />}
                  onClick={() => {
                    navigate(`${service.id}`)
                  }}
                >
                  詳情
                </Menus.Button>

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
                <CreateEditServiceForm serviceToEdit={service} />
              </Modal.Window>

              <Modal.Window name="delete">
                <ConfirmDelete
                  resourceName={service.name!}
                  onConfirm={() => deleteService(service.id)}
                  disabled={isDeletingService}
                />
              </Modal.Window>
            </Menus.Menu>
          </Modal>
        </div>
      </Table.Row>
    </>
  )
}

export default ServiceRow
