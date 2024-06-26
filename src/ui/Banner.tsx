import React from "react"
import Heading from "./Heading"
import styled from "styled-components"
import banner from "../assets/images/banner.jpg"

const StyledBanner = styled.div`
  color: var(--color-grey-600);
  text-align: center;
  height: 100dvh;

  background-image: url(${banner});
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
