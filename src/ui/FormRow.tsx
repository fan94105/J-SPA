import React from "react"
import styled from "styled-components"
import FormErrorMsg from "./FormErrorMsg"

const StyledFormRow = styled.div`
  position: relative;

  label {
    padding-block: 0;
    padding-inline: 1rem;
    background-color: transparent;
    border: 1px solid var(--color-grey-300);
    border-radius: var(--border-radius-sm);

    position: absolute;
    top: 1.4rem;
    left: 1rem;

    transition: all 0.3s;
  }

  input,
  textarea {
    width: 100%;
    border: 1px solid var(--color-grey-300);
    background-color: var(--color-grey-0);
    border-radius: var(--border-radius-sm);
    padding: 2rem 1.2rem 1rem;
    box-shadow: var(--shadow-sm);

    transition: all 0.3s;
  }

  textarea {
    resize: vertical;
  }

  input:focus + label,
  input:not(:placeholder-shown) + label,
  textarea:focus + label,
  textarea:not(:placeholder-shown) + label {
    top: -1.2rem;
    background-color: var(--color-grey-0);
    color: var(--color-brand-600);
  }

  input:focus + label,
  textarea:focus + label {
    border: 2px solid var(--color-brand-600);
  }

  input:not(:focus) + label,
  textarea:not(:focus) + label {
    color: var(--color-grey-400);
  }
`

const StyledFormErrorMsg = styled.div`
  margin-top: 0.5rem;
`

type FormRowProps = {
  label?: string
  children: React.ReactElement
  error?: string
}

function FormRow({ label, children, error }: FormRowProps) {
  return (
    <StyledFormRow>
      {children}
      {label && <label htmlFor="children.props.id">{label}</label>}
      {error && (
        <StyledFormErrorMsg>
          <FormErrorMsg>{error}</FormErrorMsg>
        </StyledFormErrorMsg>
      )}
    </StyledFormRow>
  )
}

export default FormRow
