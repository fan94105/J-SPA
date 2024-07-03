import React from "react"
import ServicesTable from "../service/ServicesTable"
import CreateEditServiceForm from "../service/CreateEditServiceForm"
import styled from "styled-components"
import Modal from "../../ui/Modal"
import Button from "../../ui/Button"

const StyledServices = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2rem;
`

function Services() {
  return (
    <StyledServices>
      <ServicesTable />

      <Modal>
        <Modal.Open name="create-service">
          <Button>新增服務項目</Button>
        </Modal.Open>

        <Modal.Window name="create-service">
          <CreateEditServiceForm />
        </Modal.Window>
      </Modal>
    </StyledServices>
  )
}

export default Services
