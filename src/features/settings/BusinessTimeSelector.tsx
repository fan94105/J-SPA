import styled from "styled-components"

import Heading from "../../ui/Heading"
import TimeSelector from "./TimeSelector"

const StyledBusinessTimeSelector = styled.div`
  padding-bottom: 2rem;
`

const StyledHeading = styled.div`
  margin-bottom: 1.2rem;
`

function BusinessTimeSelector() {
  return (
    <StyledBusinessTimeSelector>
      <StyledHeading>
        <Heading as="h2">營業時間</Heading>
      </StyledHeading>

      <TimeSelector />
    </StyledBusinessTimeSelector>
  )
}

export default BusinessTimeSelector
