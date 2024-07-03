import React from "react"
import OptionsTable from "../option/OptionsTable"
import Modal from "../../ui/Modal"
import Button from "../../ui/Button"
import CreateEditOptionForm from "../option/CreateEditOptionForm"
import styled from "styled-components"

const StyledOptions = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2rem;
`

function Options() {
  return (
    <StyledOptions>
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
