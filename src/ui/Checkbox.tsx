import styled from "styled-components"

const StyledCheckbox = styled.div`
  display: flex;
  gap: 1.6rem;
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  padding: 1rem 1.2rem;
  box-shadow: var(--shadow-sm);

  & input[type="checkbox"] {
    height: 2.4rem;
    width: 2.4rem;
    outline-offset: 2px;
    transform-origin: 0;
    accent-color: var(--color-brand-600);
  }

  & input[type="checkbox"]:disabled {
    accent-color: var(--color-brand-600);
  }

  & label {
    flex: 1;

    display: flex;
    align-items: center;
    gap: 0.8rem;
  }
`

type CheckboxProps = {
  checked?: boolean
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
  id?: string
  children?: React.ReactNode
}

function Checkbox({
  checked,
  onChange,
  disabled = false,
  id,
  children,
}: CheckboxProps) {
  return (
    <StyledCheckbox>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <label htmlFor={!disabled ? id : ""}>{children}</label>
    </StyledCheckbox>
  )
}

export default Checkbox
