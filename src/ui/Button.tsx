import React from "react"
import styled, { css } from "styled-components"

const variations = {
  primary: css`
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);

    &:hover {
      background-color: var(--color-brand-700);
    }
  `,
  secondary: css`
    color: var(--color-grey-600);
    background: var(--color-grey-0);
    border: 1px solid var(--color-grey-200);

    &:hover {
      background-color: var(--color-grey-50);
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);

    &:hover {
      background-color: var(--color-red-800);
    }
  `,
}

const Button = styled.button<{
  $variation?: "primary" | "secondary" | "danger"
}>`
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-grey-300);
  border-radius: 5px;
  background-color: var(--color-grey-50);
  box-shadow: var(--shadow-sm);
  cursor: pointer;

  ${(props) =>
    props.$variation ? variations[props.$variation] : variations.primary}
`

export default Button
