import React from "react"
import styled from "styled-components"
import Heading from "./Heading"

const StyledLocation = styled.section`
  padding: 2rem;
  background-color: var(--color-grey-50);

  h3 {
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 0.5rem;
  }
`

const StyledHeader = styled.header`
  text-align: center;
  margin-bottom: 2rem;
`

function Location() {
  return (
    <StyledLocation>
      <StyledHeader>
        <Heading as="h2">服務地址</Heading>
      </StyledHeader>
      <Heading as="h3">J~SPA 香氛舒壓工作坊</Heading>
      <p>營業時間 | 周一至周日 10:00 - 18:00</p>
      <p>地址 | 台中市后里區南村路333巷1-3號</p>

      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d909.1019716629687!2d120.71355790032118!3d24.297403683019095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1szh-TW!2stw!4v1718173930260!5m2!1szh-TW!2stw"
        width="100%"
        height="450"
        style={{ border: "0" }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </StyledLocation>
  )
}

export default Location
