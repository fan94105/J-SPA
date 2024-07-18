import styled from "styled-components"

import Heading from "./Heading"
import banner from "../assets/images/banner.jpg"

const StyledBanner = styled.div`
  color: #4b5563;
  text-align: center;
  height: 100dvh;

  background-image: url(${banner});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  display: flex;
  justify-content: center;
  align-items: center;

  gap: 1rem;
`

const StyledContainer = styled.div`
  transform: translateY(-5rem);

  & h1 {
    margin-bottom: 1.6rem;
  }

  & div {
    max-width: 40rem;

    font-size: 1.8rem;
    line-height: 1.5;
  }
`

function Banner() {
  return (
    <StyledBanner>
      <StyledContainer>
        <Heading as="h1">J~SPA</Heading>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
          dolorum repellendus necessitatibus sit, consequuntur deserunt voluptas
          doloribus nesciunt quae commodi. Ipsam saepe veniam reiciendis velit
          vero nobis necessitatibus ut nam....
        </div>
      </StyledContainer>
    </StyledBanner>
  )
}

export default Banner
