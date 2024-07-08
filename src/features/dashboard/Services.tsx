import React from "react"
import ServicesTable from "../service/ServicesTable"
import CreateEditServiceForm from "../service/CreateEditServiceForm"
import styled from "styled-components"
import Modal from "../../ui/Modal"
import Button from "../../ui/Button"
import Heading from "../../ui/Heading"

const StyledServices = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2rem;
`

const StyledHeader = styled.div`
  width: 100%;
  text-align: center;
`

function Services() {
  return (
    <StyledServices>
      <StyledHeader>
        <Heading as="h1">全部服務</Heading>
      </StyledHeader>

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
