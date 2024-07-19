import styled from "styled-components"
import Button from "./Button"
import Heading from "./Heading"

const StyledConfirmDelete = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`

type ConfirmDeleteProps = {
  resourceName: string
  onConfirm: () => void
  disabled: boolean
  onCloseModal?: () => void
}

function ConfirmDelete({
  resourceName,
  onConfirm,
  disabled,
  onCloseModal,
}: ConfirmDeleteProps) {
  return (
    <StyledConfirmDelete>
      <Heading as="h3">刪除 {resourceName}</Heading>
      <p>確定要刪除這個 {resourceName} 嗎? 刪除後將無法復原喔!</p>

      <div>
        <Button
          $variation="secondary"
          disabled={disabled}
          onClick={onCloseModal}
        >
          取消
        </Button>
        <Button $variation="danger" disabled={disabled} onClick={onConfirm}>
          確定刪除
        </Button>
      </div>
    </StyledConfirmDelete>
  )
}

export default ConfirmDelete
