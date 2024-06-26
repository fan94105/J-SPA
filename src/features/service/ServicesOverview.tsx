import React from "react"
import styled, { css } from "styled-components"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Slider from "react-slick"

import ServiceBox from "./ServiceBox"
import Heading from "../../ui/Heading"
import { useServices } from "./useServices"
import Spinner from "../../ui/Spinner"
import { desktop } from "../../styles/device"

const StyledServicesOverview = styled.section`
  width: 80%;
  margin: 0 auto;
  padding: 6rem 0;

  ${desktop(css`
    width: 62.5%;
  `)}
`

const StyledHeader = styled.header`
  text-align: center;
  margin-bottom: 2rem;
`

const settings = {
  dots: true,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 4000,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  pauseOnFocus: true,
  arrows: false,
  centerMode: true,
  centerPadding: "50px",

  responsive: [
    {
      breakpoint: 1500,
      settings: {
        centerMode: true,
      },
    },
    {
      breakpoint: 768,
      settings: {
        centerMode: false,
      },
    },
  ],
}

function ServicesOverview() {
  const { services, isPendingServices } = useServices()

  return (
    <StyledServicesOverview>
      <StyledHeader>
        <Heading as="h2">服務項目</Heading>
      </StyledHeader>

      {isPendingServices && <Spinner />}

      {services && (
        <Slider {...settings}>
          {services.map((service) => (
            <ServiceBox key={service.id} service={service} />
          ))}
        </Slider>
      )}
    </StyledServicesOverview>
  )
}

export default ServicesOverview
