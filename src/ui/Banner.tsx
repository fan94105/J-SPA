import React from "react"
import Heading from "./Heading"
import styled from "styled-components"

const StyledBanner = styled.div`
  color: var(--color-grey-0);
  text-align: center;
  height: 100dvh;

  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)),
    url("https://images.unsplash.com/photo-1639162906614-0603b0ae95fd?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

function Banner() {
  return (
    <StyledBanner>
      <Heading as="h1">J~SPA</Heading>

      <div>一些描述...</div>
    </StyledBanner>
  )
}

export default Banner
