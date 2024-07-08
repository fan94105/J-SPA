import React from "react"
import OptionsTable from "../option/OptionsTable"
import Modal from "../../ui/Modal"
import Button from "../../ui/Button"
import CreateEditOptionForm from "../option/CreateEditOptionForm"
import styled from "styled-components"
import Heading from "../../ui/Heading"

const StyledOptions = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2rem;
`

const StyledHeader = styled.div`
  width: 100%;
  text-align: center;
`

function Options() {
  return (
    <StyledOptions>
      <StyledHeader>
        <Heading as="h1">全部加選項目</Heading>
      </StyledHeader>

      <OptionsTable />

      <Modal>
        <Modal.Open name="create-option">
          <Button>新增加選項目</Button>
        </Modal.Open>

        <Modal.Window name="create-option">
          <CreateEditOptionForm />
        </Modal.Window>
      </Modal>
    </StyledOptions>
  )
}

export default Options
