import React from "react"
import styled from "styled-components"

import Heading from "../../ui/Heading"
import Button from "../../ui/Button"
import { Link } from "react-router-dom"
import { Tables } from "../../supabase"
import { HiOutlineClock, HiOutlineCurrencyDollar } from "react-icons/hi2"

const StyledServiceBox = styled.div`
  margin: 0 1rem;
  border: 1px solid var(--color-grey-300);
  border-radius: 10px;
  overflow: hidden;
`

const StyledImage = styled.div`
  width: 100%;
  overflow: hidden;

  img {
    display: block;
    width: 100%;
    object-fit: cover;
    object-position: center;

    transition: transform 0.3s;

    &:hover {
      transform: scale(1.1);
    }
  }
`

const StyledInfo = styled.div`
  padding: 1rem;
  background-color: var(--color-grey-50);

  h3 {
    margin-bottom: 0.2rem;
  }

  p {
    margin-bottom: 1rem;
  }
`

const StyledRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 0.5rem;

  svg {
    color: var(--color-brand-600);
  }
`

const StyledBtnRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  button {
    flex: 1;
  }
`

type ServiceBoxProps = {
  service: Tables<"services">
}

function ServiceBox({ service }: ServiceBoxProps) {
  return (
    <StyledServiceBox>
      <StyledImage>
        <img src={service.image!} alt={service.name!} />
      </StyledImage>

      <StyledInfo>
        <Heading as="h3">{service.name}</Heading>

        <p>{service.description}</p>

        <StyledRow>
          <HiOutlineClock />
          {service.duration} 分鐘
        </StyledRow>

        <StyledRow>
          <HiOutlineCurrencyDollar />
          {service.discount
            ? `原價 ${service.regularPrice} 元 / 優惠價 ${
                service.regularPrice! - service.discount!
              } 元`
            : `${service.regularPrice!} 元`}
        </StyledRow>

        <StyledBtnRow>
          {/* <Button variation="secondary">
            <Link to={`services/${service.id}`}>查看詳情</Link>
          </Button> */}

          <Button
            onClick={() =>
              sessionStorage.setItem("serviceId", service.id.toString())
            }
          >
            <Link to="appointment">立即預約</Link>
          </Button>
        </StyledBtnRow>
      </StyledInfo>
    </StyledServiceBox>
  )
}

export default ServiceBox
