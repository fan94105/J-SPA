import styled from "styled-components"

import NonBusinessDateSelector from "../features/settings/NonBusinessDateSelector"
import BusinessTimeSelector from "../features/settings/BusinessTimeSelector"
import Heading from "../ui/Heading"

const StyledSettings = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

function Settings() {
  return (
    <StyledSettings>
      <div>
        <Heading as="h1">設定</Heading>
      </div>

      <NonBusinessDateSelector />

      <BusinessTimeSelector />
    </StyledSettings>
  )
}

export default Settings
