import styled from "styled-components"

import NonBusinessDateSelector from "../features/settings/NonBusinessDateSelector"
import BusinessTimeSelector from "../features/settings/BusinessTimeSelector"
import Heading from "../ui/Heading"

const StyledSettings = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  & h1 {
    text-align: center;
  }
`

function Settings() {
  return (
    <StyledSettings>
      <div>
        <Heading as="h1">營業設定</Heading>
      </div>

      <NonBusinessDateSelector />

      <BusinessTimeSelector />
    </StyledSettings>
  )
}

export default Settings
