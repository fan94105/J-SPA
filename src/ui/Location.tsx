import React from "react"
import styled, { css } from "styled-components"
import Heading from "./Heading"
import { desktop } from "../styles/device"
import { FaInstagram, FaLine, FaSquareInstagram } from "react-icons/fa6"
import { FaFacebookSquare } from "react-icons/fa"

const StyledBackground = styled.div`
  background-color: var(--color-grey-0);
`

const StyledLocation = styled.section`
  width: 62.5%;
  margin: 0 auto;
  padding: 6rem 0 8rem;
`

const StyledHeader = styled.header`
  text-align: center;
  margin-bottom: 4rem;
`

const StyledContent = styled.div`
  ${desktop(css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    align-items: center;
  `)}
`

const StyledInfo = styled.div`
  margin-bottom: 2rem;

  ${desktop(css`
    margin-bottom: 0;
  `)}

  h3 {
    margin-bottom: 1rem;

    ${desktop(css`
      margin-bottom: 4rem;
    `)}
  }
`

const StyledInfoItem = styled.div`
  display: grid;
  gap: 0.5rem;
  margin-bottom: 2rem;
`

const StyledLinkGroup = styled.div`
  display: flex;
  gap: 1rem;

  a {
    display: inline-block;
    width: 3rem;
    height: 3rem;
  }

  svg {
    width: 100%;
    height: 100%;
  }
`

const StyledLine = styled.a`
  svg {
    color: #06c755;
  }
`

const StyledFacebook = styled.a`
  svg {
    color: #0165e1;
  }
`

const StyledInstagram = styled.a`
  /* 使用 linear-gradient 添加渐变色 */
  background: linear-gradient(
    45deg,
    #405de6,
    #5851db,
    #833ab4,
    #c13584,
    #e1306c,
    #fd1d1d,
    #f56040,
    #f77737,
    #fcaf45,
    #ffdc80
  );
  display: inline-block;
  border-radius: 5px;

  svg {
    fill: #fff;
  }
`

const StyledMap = styled.div``

function Location() {
  return (
    <StyledBackground>
      <StyledLocation>
        <StyledHeader>
          <Heading as="h2">服務地址</Heading>
        </StyledHeader>
        <StyledContent>
          <StyledInfo>
            <Heading as="h3">J~SPA 香氛舒壓工作坊</Heading>

            <StyledInfoItem>
              <p>營業時間 | 周一至周日 10:00 - 18:00</p>
              <p>地址 | 台中市后里區南村路333巷1-3號</p>
              <p>電話 | 0999-999-999</p>
            </StyledInfoItem>

            <StyledLinkGroup>
              <StyledLine href="#">
                <FaLine />
              </StyledLine>

              <StyledFacebook href="#">
                <FaFacebookSquare />
              </StyledFacebook>

              <StyledInstagram href="#">
                <FaInstagram />
              </StyledInstagram>
            </StyledLinkGroup>
          </StyledInfo>
          <StyledMap>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d909.1019716629687!2d120.71355790032118!3d24.297403683019095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1szh-TW!2stw!4v1718173930260!5m2!1szh-TW!2stw"
              width="100%"
              height="450"
              style={{ border: "0" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </StyledMap>
        </StyledContent>
      </StyledLocation>
    </StyledBackground>
  )
}

export default Location
