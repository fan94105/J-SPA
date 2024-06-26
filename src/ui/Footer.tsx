import React from "react"
import styled from "styled-components"

const StyledFooter = styled.footer`
  width: 100%;
  background-color: var(--color-grey-100);
  padding: 1rem;
  font-size: 1rem;
  text-align: center;

  color: var(--color-grey-400);
`

function Footer() {
  return (
    <StyledFooter>
      Copyright &copy; 2024 J~SPA. All rights reserved.
    </StyledFooter>
  )
}

export default Footer
