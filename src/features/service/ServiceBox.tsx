import { Link } from "react-router-dom"
import styled, { css } from "styled-components"
import { HiOutlineClock, HiOutlineCurrencyDollar } from "react-icons/hi2"
import { Tables } from "../../supabase"

import Heading from "../../ui/Heading"
import Button from "../../ui/Button"

import { desktop, laptop } from "../../styles/device"

const StyledServiceBox = styled.div`
  margin: 0 2rem;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-300);
  border-radius: 10px;
  overflow: hidden;

  ${desktop(css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  `)}
`

const StyledImage = styled.div`
  max-height: 30rem;
  overflow: hidden;

  ${desktop(css`
    max-height: unset;
  `)}

  img {
    height: 100%;
    display: block;
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

  ${laptop(css`
    padding: 2rem;

    display: flex;
    flex-direction: column;
  `)}

  h3 {
    margin-bottom: 0.2rem;

    ${laptop(css`
      margin-bottom: 1rem;
    `)}
  }

  p {
    margin-bottom: 1rem;

    ${laptop(css`
      margin-bottom: 2rem;
    `)}
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

  ${laptop(css`
    margin-top: auto;
  `)}

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
          {service.regularPrice} 元
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
